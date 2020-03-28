import {ModBiasMutation} from "../methods/Mutation";
import {Activation, ActivationType, ALL_ACTIVATIONS, LogisticActivation} from "../methods/Activation";
import {Connection} from "./Connection";
import {anyMatch, pickRandom, randDouble, remove} from "../methods/Utils";

export enum NodeType {
    INPUT, HIDDEN, OUTPUT
}

export class Node {
    public type: NodeType;
    public mask: number;
    public incoming: Connection[];
    public outgoing: Connection[];
    public gated: Connection[];
    public selfConnection: Connection;
    public bias: number;
    public squash: Activation;
    public index: number;
    public derivative: number | undefined;
    public deltaBiasPrevious: number;
    public deltaBiasTotal: number;
    public activation: number;
    public state: number;
    public old: number;
    public errorResponsibility: number;
    public errorProjected: number;
    public errorGated: number;

    constructor(type: NodeType = NodeType.HIDDEN) {
        this.type = type;
        this.bias = randDouble(-1, 1);
        this.squash = new LogisticActivation();
        this.activation = 0;
        this.state = 0;
        this.old = 0;
        this.mask = 1;
        this.deltaBiasPrevious = 0;
        this.deltaBiasTotal = 0;
        this.incoming = [];
        this.outgoing = [];
        this.gated = [];
        this.selfConnection = new Connection(this, this, 0);
        this.errorResponsibility = 0;
        this.errorProjected = 0;
        this.errorGated = 0;
        this.index = NaN;
    }

    public static fromJSON(json: NodeJSON): Node {
        const node: Node = new Node();
        node.bias = json.bias;
        node.type = (json.type as NodeType);
        node.squash = Activation.getActivation(json.squash);
        node.mask = json.mask;
        node.index = json.index;

        return node;
    }

    public clear(): void {
        for (const connection of this.incoming) {
            connection.eligibility = 0;
            connection.xTraceNodes = [];
            connection.xTraceValues = [];
        }

        for (const connection of this.gated) {
            connection.gain = 0;
        }

        this.errorResponsibility = this.errorProjected = this.errorGated = 0;
        this.old = this.state = this.activation = 0;
    }

    public mutateBias(method: ModBiasMutation): void {
        this.bias += randDouble(method.min, method.max);
    }

    public mutateActivation(): void {
        let newActivationType: ActivationType;
        do {
            newActivationType = pickRandom(ALL_ACTIVATIONS);
        } while (newActivationType === this.squash.type);
        this.squash = Activation.getActivation(newActivationType);
    }

    public isProjectedBy(node: Node): boolean {
        if (node === this) {
            return this.selfConnection.weight !== 0;
        } else {
            return anyMatch(this.incoming.map(conn => conn.from), node);
        }
    }

    public isProjectingTo(node: Node): boolean {
        if (node === this) {
            return this.selfConnection.weight !== 0;
        } else {
            return anyMatch(this.outgoing.map(conn => conn.to), node);
        }
    }

    public addGate(connection: Connection): void {
        this.gated.push(connection);
        connection.gateNode = this;
    }

    public removeGate(connection: Connection): void {
        remove(this.gated, connection);
        connection.gateNode = null;
        connection.gain = 1;
    }

    public connect(target: Node, weight: number = 0, twoSided: boolean = false): Connection {
        if (target === this) {
            this.selfConnection.weight = weight || 1;
            return this.selfConnection;
        } else if (this.isProjectingTo(target)) {
            throw new ReferenceError();
        } else {
            const connection: Connection = new Connection(this, target, weight);

            this.outgoing.push(connection);
            target.incoming.push(connection);

            if (twoSided) {
                target.connect(this);
            }
            return connection;
        }
    }

    public disconnect(node: Node, twoSided: boolean = false): Connection {
        if (node === this) {
            this.selfConnection.weight = 0;
            return this.selfConnection;
        }

        for (const connection of this.outgoing) {
            if (connection.to !== node) {
                continue;
            }
            remove(this.outgoing, connection);
            remove(connection.to.incoming, connection);

            if (connection.gateNode !== undefined && connection.gateNode != null) {
                connection.gateNode.removeGate(connection);
            }
            if (twoSided) {
                node.disconnect(this);
            }

            return connection;
        }
        throw new Error("No connection found!");
    }

    public propagate(target: number | undefined, momentum: number, rate: number, update: boolean): { responsibility: number, projected: number, gated: number } {
        // TODO: check for errors
        if (target !== undefined && Number.isFinite(target)) {
            this.errorResponsibility = this.errorProjected = target - this.activation;
        } else {

            this.errorProjected = 0;
            for (const connection of this.outgoing) {
                this.errorProjected += connection.to.errorResponsibility * connection.weight * connection.gain;
            }
            this.errorProjected *= this.derivative || 1;


            this.errorGated = 0;
            for (const connection of this.gated) {
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


            this.errorResponsibility = this.errorProjected + this.errorGated;
        }


        for (const connection of this.incoming) {
            let gradient: number = this.errorProjected * connection.eligibility;
            for (let j: number = 0; j < connection.xTraceNodes.length; j++) {
                const node: Node = connection.xTraceNodes[j];
                gradient += node.errorResponsibility * connection.xTraceValues[j];
            }


            connection.deltaWeightsTotal += rate * gradient * this.mask;
            if (update) {
                connection.deltaWeightsTotal += momentum * connection.deltaWeightsPrevious;
                connection.weight += connection.deltaWeightsTotal;
                connection.deltaWeightsPrevious = connection.deltaWeightsTotal;
                connection.deltaWeightsTotal = 0;
            }
        }


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
        };
    }

    public activate(input: number | null = null, trace: boolean = true): number {
        // TODO: check for errors
        if (input !== null && Number.isFinite(input)) {
            return this.activation = input;
        }

        if (trace) {
            this.old = this.state;

            this.state = this.selfConnection.gain * this.selfConnection.weight * this.state + this.bias;


            this.incoming.forEach(conn => {
                this.state += conn.from.activation * conn.weight * conn.gain;
            });

            this.activation = this.squash.calc(this.state, false) * this.mask;
            this.derivative = this.squash.calc(this.state, true);


            const nodes: Node[] = [];
            const influences: number[] = [];


            this.gated.forEach(connection => {
                connection.gain = this.activation;


                const index: number = nodes.indexOf(connection.to);
                if (index > -1) {
                    influences[index] += connection.weight * connection.from.activation;
                } else {
                    nodes.push(connection.to);
                    if (connection.to.selfConnection.gateNode === this) {
                        influences.push(connection.weight * connection.from.activation + connection.to.old);
                    } else {
                        influences.push(connection.weight * connection.from.activation);
                    }
                }
            });


            for (const connection of this.incoming) {
                connection.eligibility = this.selfConnection.gain * this.selfConnection.weight * connection.eligibility + connection.from.activation * connection.gain;

                for (let i: number = 0; i < nodes.length; i++) {
                    const node: Node = nodes[i];
                    const influence: number = influences[i];

                    const index: number = connection.xTraceNodes.indexOf(node);

                    if (index > -1) connection.xTraceValues[index] = node.selfConnection.gain * node.selfConnection.weight * connection.xTraceValues[index] + this.derivative * connection.eligibility * influence;
                    else {
                        connection.xTraceNodes.push(node);
                        connection.xTraceValues.push(this.derivative * connection.eligibility * influence);
                    }
                }
            }

            return this.activation;
        } else {
            if (this.type === NodeType.INPUT) return this.activation = 0;

            this.state = this.selfConnection.gain * this.selfConnection.weight * this.state + this.bias;


            for (const connection of this.incoming) {
                this.state += connection.from.activation * connection.weight * connection.gain;
            }

            this.activation = this.squash.calc(this.state, false);


            for (const connection of this.gated) {
                connection.gain = this.activation;
            }

            return this.activation;
        }
    }

    public toJSON(): NodeJSON {
        return {
            bias: this.bias,
            type: this.type,
            squash: this.squash.type,
            mask: this.mask,
            index: this.index
        };
    }
}

export interface NodeJSON {
    bias: number;
    type: number;
    squash: ActivationType;
    mask: number;
    index: number;
}
