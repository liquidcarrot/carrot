import {anyMatch, pickRandom, randDouble, remove} from "../methods/Utils";
import {Activation, ALL_ACTIVATIONS, LOGISTIC} from "../methods/activation";
import {Connection} from "./connection";

export enum NodeType {
    INPUT, HIDDEN, OUTPUT
}

export class Node {
    private bias: number;
    private squash: Activation;
    private activation: number;
    private state: number;
    private old: number;
    private mask: number;
    private deltaBiasPrevious: number;
    private deltaBiasTotal: number;
    private deltaBias: number[];
    private errorResponsibility: number;
    private errorProjected: number;
    private errorGated: number;
    private incoming: Connection[];
    private outgoing: Connection[];
    private gated: Connection[];
    private selfConnection: Connection;
    private derivative: number;
    private type: NodeType;


    constructor(type: NodeType = NodeType.HIDDEN) {
        this.type = type;
        this.bias = randDouble(-1, 1);
        this.squash = new LOGISTIC();
        this.activation = 0;
        this.state = 0;
        this.old = 0;
        this.mask = 1;
        this.deltaBiasPrevious = 0;
        this.deltaBiasTotal = 0;
        this.deltaBias = [];
        this.incoming = [];
        this.outgoing = [];
        this.gated = [];
        this.selfConnection = new Connection(this, this, 0);
        this.errorResponsibility = 0;
        this.errorProjected = 0;
        this.errorGated = 0;
        this.derivative = 0;
    }

    static fromJSON(json: JSON) {
        const node: Node = new Node();

        Object.assign(node, {...json}, {
            squash: Activation.getActivation(json.squash)
        });

        return node;
    }

    clear(): void {
        for (let index: number = 0; index < this.incoming.length; index++) {
            const connection: Connection = this.incoming[index];

            connection.elegibility = 0;
            connection.xtraceNodes = []
            connection.xtraceValues = [];
        }

        for (let index: number = 0; index < this.gated.length; index++) {
            const connection: Connection = this.gated[index];
            connection.gain = 0;
        }

        this.errorResponsibility = this.errorProjected = this.errorGated = 0;
        this.old = this.state = this.activation = 0;
    }

    mutate(method: Mutation): void {
        switch (method) {
            case methods.mutation.MOD_ACTIVATION:
                this.squash = pickRandom(ALL_ACTIVATIONS);
                break;
            case methods.mutation.MOD_BIAS:
                this.bias += randDouble(method.min, method.max);
                break;
        }
    }

    isProjectedBy(node: Node): Boolean {
        if (node === this) {
            // self connection
            return this.selfConnection.weight !== 0;
        } else {
            // check if any incoming connection has node as from node
            return anyMatch(this.incoming.map(conn => conn.from), node);
        }
    }

    isProjectingTo(node: Node): Boolean {
        if (node === this) {
            // self connection
            return this.selfConnection.weight !== 0;
        } else {
            // check if any outgoing connection has node as to node
            return anyMatch(this.outgoing.map(conn => conn.to), node);
        }
    }

    addGate(connection: Connection): void {
        this.gated.push(connection);
        connection.gateNode = this;
    }

    removeGate(connection: Connection): void {
        remove(this.gated, connection);
        connection.gateNode = null;
        connection.gain = 1;
    }

    connect(node: Node, weight: number = 0, twoSided: Boolean = false): Connection {
        if (node === this) {
            this.selfConnection.weight = weight || 1;
            return this.selfConnection;
        } else if (this.isProjectingTo(node)) {
            throw new ReferenceError("Node is already projecting to 'target'");
        } else {
            const connection: Connection = new Connection(this, node, weight);

            this.outgoing.push(connection);
            node.incoming.push(connection);

            if (twoSided) {
                node.connect(this);
            }
            return connection;
        }
    }

    disconnect(node: Node, twoSided: Boolean = false) {
        // Return early if this-connection, will need to update this to return previous value of this connection for NEAT
        if (node === this) {
            this.selfConnection.weight = 0 // zero should not be the default this-connection negation, potential for confusion
            return this.selfConnection     // What value are we deriving from having the this-connection on the prototype-chain?
        }

        // Could this be more efficient by maintaining a set and reducing lookup complexity to O(1)?
        this.outgoing
            .filter(conn => conn.to === node)
            .forEach(connection => {
                remove(this.outgoing, connection);
                remove(connection.to.incoming, connection);

                if (connection.gateNode != undefined) {
                    connection.gateNode.removeGate(connection);
                }
                if (twoSided) {
                    node.disconnect(this);
                }

                return connection;
            });
    }

    propagate(target: number, momentum: number, rate: number, update: Boolean): Object {
        if (target != null && Number.isFinite(target)) {
            this.errorResponsibility = this.errorProjected = target - this.activation;
        } else {
            // Projected Error Responsibility (from outgoing connections)
            this.errorProjected = 0;
            for (let i = 0; i < this.outgoing.length; i++) {
                const connection: Connection = this.outgoing[i];
                this.errorProjected += connection.to.errorResponsibility * connection.weight * connection.gain;
            }
            this.errorProjected *= this.derivative || 1;

            // Gated Error Responsibility (from gated connections)
            this.errorGated = 0;
            for (let i = 0; i < this.gated.length; i++) {
                const connection: Connection = this.gated[i];
                const node: Node = connection.to;
                let influence: number;
                if (node.selfConnection.gateNode === this) {
                    influence = node.old + connection.weight * connection.from.activation;
                } else {
                    influence = connection.weight * connection.from.activation;
                }

                this.errorGated += node.errorResponsibility * influence;
            }
            this.errorGated *= this.derivative || 1;

            // Error Responsibility
            this.errorResponsibility = this.errorProjected + this.errorGated;
        }

        // Adjust Incoming Connections
        for (let i = 0; i < this.incoming.length; i++) {
            const connection: Connection = this.incoming[i];
            let gradient: number = this.errorProjected * connection.elegibility;
            for (let j = 0; j < connection.xtraceNodes.length; j++) {
                const node: Node = connection.xtraceNodes[j];
                gradient += node.errorResponsibility * connection.xtraceValues[j];
            }

            // Adjust Weight ()
            connection.deltaWeightsTotal += rate * gradient * this.mask;
            if (update) {
                connection.deltaWeightsTotal += momentum * connection.deltaWeightsPrevious;
                connection.weight += connection.deltaWeightsTotal;
                connection.deltaWeightsPrevious = connection.deltaWeightsTotal;
                connection.deltaWeightsTotal = 0;
            }
        }

        // Adjust Bias
        this.deltaBiasTotal += rate * this.errorResponsibility;
        if (update) {
            this.deltaBiasTotal += momentum * this.deltaBiasPrevious;
            this.bias += this.deltaBiasTotal;
            this.deltaBiasPrevious = this.deltaBiasTotal;
            this.deltaBiasTotal = 0;
        }

        return {
            responsibility: this.errorResponsibility,
            projected: this.errorProjected,
            gated: this.errorGated,
        }
    }

    activate(input: number, trace: Boolean): number {
        if (input != undefined && Number.isFinite(input)) {
            return this.activation = input;
        }

        if (trace) {
            this.old = this.state;

            this.state = this.selfConnection.gain * this.selfConnection.weight * this.state + this.bias;

            // Activate (from incoming connections)
            this.incoming.forEach(conn => {
                this.state += conn.from.activation * conn.weight * conn.gain;
            });

            this.activation = this.squash.calc(this.state, false) * this.mask // Squash Activation
            this.derivative = this.squash.calc(this.state, true)

            // Stores traces
            const nodes: Node[] = [];
            const influences: number[] = [];

            // Adjust 'gain' (to gated connections) & Build traces
            this.gated.forEach(connection => {
                connection.gain = this.activation

                // Build traces
                const index: number = nodes.indexOf(connection.to);
                if (index > -1) { // Node & influence exist
                    influences[index] += connection.weight * connection.from.activation;
                } else { // Add node & corresponding influence
                    nodes.push(connection.to);
                    if (connection.to.selfConnection.gateNode === this) {
                        influences.push(connection.weight * connection.from.activation + connection.to.old);
                    } else {
                        influences.push(connection.weight * connection.from.activation);
                    }
                }
            });

            // Forwarding 'xtrace' (to incoming connections)
            for (let i = 0; i < this.incoming.length; i++) {
                const connection = this.incoming[i];

                // Trace Elegibility
                connection.elegibility = this.selfConnection.gain * this.selfConnection.weight * connection.elegibility + connection.from.activation * connection.gain;

                for (let j = 0; j < nodes.length; j++) {
                    const [node, influence] = [nodes[j], influences[j]];

                    const index = connection.xtraceNodes.indexOf(node);

                    if (index > -1) connection.xtraceValues[index] = node.selfConnection.gain * node.selfConnection.weight * connection.xtraceValues[index] + this.derivative * connection.elegibility * influence;
                    else {
                        connection.xtraceNodes.push(node);
                        connection.xtraceValues.push(this.derivative * connection.elegibility * influence);
                    }
                }
            }

            return this.activation;
        } else {
            if (this.type === NodeType.INPUT) return this.activation = 0

            this.state = this.selfConnection.gain * this.selfConnection.weight * this.state + this.bias;

            // Activate (from incoming connections)
            for (let i = 0; i < this.incoming.length; i++) {
                const conn = this.incoming[i];
                this.state += conn.from.activation * conn.weight * conn.gain;
            }

            this.activation = this.squash.calc(this.state, false) // Squash Activation

            // Adjust 'gain' (to gated connections)
            for (let i = 0; i < this.gated.length; i++) {
                this.gated[i].gain = this.activation
            }

            return this.activation;
        }
    }

    toJSON(): Object {
        return {
            bias: this.bias,
            type: this.type,
            squash: this.squash.constructor.name,
            mask: this.mask
        };
    }
}
