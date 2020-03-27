import {Connection} from "./Connection";
import {Node, NodeType} from "./Node";
import {anyMatch, pickRandom, remove} from "../methods/Utils";
import {MOD_ACTIVATION, Mutation, SUB_NODE, SWAP_NODES} from "../methods/Mutation";

export class Network {
    inputSize: number;
    outputSize: number;
    nodes: Node[];
    connections: Connection[];
    gates: Connection[];

    constructor(inputSize: number, outputSize: number) {
        this.inputSize = inputSize;
        this.outputSize = outputSize;

        this.nodes = [];
        this.connections = [];
        this.gates = [];

        for (let i = 0; i < inputSize; i++) {
            this.nodes.push(new Node(NodeType.INPUT));
        }
        for (let i = 0; i < outputSize; i++) {
            this.nodes.push(new Node(NodeType.OUTPUT));
        }

        for (let i = 0; i < this.inputSize; i++) {
            for (let j = this.inputSize; j < this.outputSize + this.inputSize; j++) {
                const weight: number = (Math.random() - 0.5) * this.inputSize * Math.sqrt(2 / this.inputSize);
                this.connect(this.nodes[i], this.nodes[j], weight);
            }
        }
    }

    connect(from: Node, to: Node, weight: number = 0): Connection {
        let connection: Connection = from.connect(to, weight);
        this.connections.push(connection);

        return connection;
    }

    activate(input: number[], dropout_rate: number = 0, trace: Boolean = true) {
        let inputNodeIndex: number = 0;
        for (let i = 0; i < this.nodes.length; i++) {
            if (inputNodeIndex === this.inputSize) {
                break;
            }
            const node: Node = this.nodes[i];
            if (node.type != NodeType.INPUT) {
                continue;
            }

            node.activate(input[inputNodeIndex++], trace);
        }
        if (inputNodeIndex !== input.length) {
            throw Error(`There are ${inputNodeIndex} input nodes, but ${input.length} inputs were passed`);
        }


        this.nodes
            .filter(node => node.type == NodeType.HIDDEN)
            .forEach(node => {
                if (dropout_rate) {
                    node.mask = Math.random() >= dropout_rate ? 1 : 0;
                }

                node.activate(undefined, trace);
            });

        const output: number[] = [];
        for (let i = 0; i < this.nodes.length; i++) {
            if (output.length === this.outputSize) {
                break;
            }
            const node = this.nodes[i];
            if (node.type != NodeType.OUTPUT) {
                continue;
            }

            output.push(node.activate(undefined, trace));
        }

        if (output.length !== this.outputSize) {
            throw Error(`There are ${this.outputSize} output nodes, but ${output.length} outputs were passed`);
        }

        return output;
    }

    propagate(rate: number, momentum: number, update: Boolean, target: number[]): void {
        if (target.length !== this.outputSize) {
            throw new Error(`Output target length should match network output length`);
        }

        let targetIndex: number = 0;

        for (let i = 0; targetIndex < this.outputSize; i++) {
            if (this.nodes[i].type == NodeType.OUTPUT) {
                this.nodes[i].propagate(target[targetIndex++], momentum, rate, update);
            }
        }

        for (let i = this.nodes.length - 1; i >= 0; i--) {
            if (this.nodes[i].type == NodeType.HIDDEN) {
                this.nodes[i].propagate(undefined, rate, momentum, update);
            }
        }

        this.nodes
            .filter(node => node.type == NodeType.INPUT)
            .forEach(node => {
                node.propagate(undefined, rate, momentum, update);
            });
    }

    clear(): void {
        this.nodes.forEach(node => node.clear());
    }

    disconnect(from: Node, to: Node): Connection {
        this.connections
            .filter(conn => conn.from === from)
            .filter(conn => conn.to === to)
            .forEach(conn => {
                if (conn.gateNode !== null) {
                    this.removeGate(conn);
                }
                remove(this.connections, conn);
            });

        return from.disconnect(to);
    }

    addGate(node: Node, connection: Connection): void {
        if (this.nodes.indexOf(node) === -1) {
            throw new ReferenceError(`This node is not part of the network!`);
        } else if (connection.gateNode != null) {
            return;
        }
        node.addGate(connection);
        this.gates.push(connection);
    }

    removeGate(connection: Connection): void {
        if (!anyMatch(this.gates, connection)) {
            throw new Error(`This connection is not gated!`);
        }
        remove(this.gates, connection)
        if (connection.gateNode != null) {
            connection.gateNode.removeGate(connection);
        }
    }

    removeNode(node: Node, keepGates: Boolean = new SUB_NODE().keepGates): void {
        if (!anyMatch(this.nodes, node)) {
            throw new ReferenceError(`This node does not exist in the network!`);
        }

        this.disconnect(node, node);

        const inputs: Node[] = [];
        const gates: Node[] = [];
        const outputs: Node[] = [];

        for (let i: number = node.incoming.length - 1; i >= 0; i--) {
            let connection: Connection = node.incoming[i];
            if (keepGates && connection.gateNode !== null && connection.gateNode !== node) {
                gates.push(connection.gateNode);
            }
            inputs.push(connection.from);
            this.disconnect(connection.from, node);
        }

        for (let i: number = node.outgoing.length - 1; i >= 0; i--) {
            let connection: Connection = node.incoming[i];
            if (keepGates && connection.gateNode !== null && connection.gateNode !== node) {
                gates.push(connection.gateNode);
            }
            outputs.push(connection.to);
            this.disconnect(node, connection.to);
        }

        const connections: Connection[] = [];
        inputs.forEach(input => {
            outputs.forEach(output => {
                if (!input.isProjectingTo(output)) {
                    connections.push(this.connect(input, output));
                }
            });
        });

        while (gates.length > 0 && connections.length > 0) {
            const gate: Node | undefined = gates.shift();
            if (gate === undefined) {
                continue;
            }

            const connection: Connection = pickRandom(connections);
            this.addGate(gate, connection);
            remove(connections, connection)
        }

        for (let i: number = node.gated.length - 1; i >= 0; i--) {
            this.removeGate(node.gated[i]);
        }

        remove(this.nodes, node);
    }

    possible(method: Mutation): any {
        let candidates: any = [];
        switch (method.constructor.name) {
            case "SUB_NODE":
                return this.nodes.filter(node => node.type == NodeType.HIDDEN);
            case "ADD_CONN":
                for (let i = 0; i < this.nodes.length - this.outputSize; i++) {
                    const from: Node = this.nodes[i]
                    for (let j = Math.max(i + 1, this.inputSize); j < this.nodes.length; j++) {
                        const to: Node = this.nodes[j]
                        if (!from.isProjectingTo(to)) {
                            candidates.push([from, to])
                        }
                    }
                }
                return candidates.length ? candidates : false;
            case "SUB_CONN":
                return this.connections.filter(conn => conn.from.outgoing.length > 1 && conn.to.incoming.length > 1 && this.nodes.indexOf(conn.to) > this.nodes.indexOf(conn.from));
            case "MOD_ACTIVATION":
                if ((<MOD_ACTIVATION>method).mutateOutput) {
                    return this.nodes.filter(node => node.type != NodeType.INPUT);
                } else {
                    return this.nodes.filter(node => node.type == NodeType.HIDDEN);
                }
            case "ADD_SELF_CONN":
                return this.nodes
                    .filter(node => node.type != NodeType.INPUT)
                    .filter(node => node.selfConnection.weight == 0);
            case "SUB_SELF_CONN":
                return this.connections.filter(conn => conn.from == conn.to);
            case "ADD_GATE":
                return this.connections.filter(conn => conn.gateNode === null);
            case "SUB_GATE":
                return this.gates.length > 0 ? [] : false
            case "ADD_BACK_CONN":
                for (let i = this.inputSize; i < this.nodes.length; i++) {
                    const from = this.nodes[i]
                    for (let j = this.inputSize; j < i; j++) {
                        const to = this.nodes[j]
                        if (!from.isProjectingTo(to)) {
                            candidates.push([from, to])
                        }
                    }
                }

                return candidates.length ? candidates : false

            case "SUB_BACK_CONN":
                return this.connections.filter(conn => conn.from.outgoing.length > 1 && conn.to.incoming.length > 1 && this.nodes.indexOf(conn.from) > this.nodes.indexOf(conn.to));
            case "SWAP_NODES": {
                // break out early if there aren't enough nodes to swap
                if ((<SWAP_NODES>method).mutateOutput && this.nodes.length - this.inputSize < 3
                    || this.nodes.length - this.inputSize - this.outputSize < 3) {
                    return false;
                }

                if ((<SWAP_NODES>method).mutateOutput) {
                    return this.nodes.filter(node => node.type != NodeType.INPUT);
                } else {
                    return this.nodes.filter(node => node.type == NodeType.HIDDEN);
                }
            }
        }
    }
}
