import {Connection} from "../Connection";
import {Node} from "../Node";
import {ConnectionType, GatingType} from "../Architect";
import {anyMatch} from "../../methods/Utils";

export abstract class Layer {
    public outputSize: number;
    public inputNodes: Set<Node>;
    public outputNodes: Set<Node>;
    public nodes: Node[];
    public connections: Connection[];
    public gates: Connection[];


    protected constructor(outputSize: number) {
        this.outputSize = outputSize;
        this.nodes = [];
        this.inputNodes = new Set<Node>();
        this.outputNodes = new Set<Node>();
        this.connections = [];
        this.gates = [];
    }

    public static connect(from: Layer | Set<Node> | Node[], to: Layer | Set<Node> | Node[], connectionType: ConnectionType = ConnectionType.ALL_TO_ALL, weight: number = 1): Connection[] {
        // TODO: beautify
        const fromNodes: Node[] = from instanceof Layer ? Array.from(from.outputNodes) : Array.from(from);
        const toNodes: Node[] = to instanceof Layer ? Array.from(to.inputNodes) : Array.from(to);

        if (toNodes.length === 0) {
            throw new ReferenceError("Target from has no input nodes!");
        }
        if (fromNodes.length === 0) {
            throw new ReferenceError("This from has no output nodes!");
        }

        const connections: Connection[] = [];
        if (connectionType === ConnectionType.ALL_TO_ALL) {
            fromNodes.forEach(fromNode => {
                toNodes.forEach(toNode => {
                    connections.push(fromNode.connect(toNode, weight));
                });
            });
        } else if (connectionType === ConnectionType.ONE_TO_ONE) {
            if (fromNodes.length !== toNodes.length) {
                throw new RangeError("Can't connect! Number of input nodes is inequal to number of output nodes!");
            }
            for (let i: number = 0; i < fromNodes.length; i++) {
                connections.push(fromNodes[i].connect(toNodes[i], weight));
            }
        }
        return connections;
    }

    public static gate(nodes: Node[], connections: Connection[], gateType: GatingType): Connection[] {
        const fromNodes: Node[] = [];
        const toNodes: Node[] = [];

        for (const connection of connections) {
            if (!anyMatch(fromNodes, connection.from)) {
                fromNodes.push(connection.from);
            }
            if (!anyMatch(toNodes, connection.to)) {
                toNodes.push(connection.to);
            }
        }

        const gatedConnections: Connection[] = [];

        switch (gateType) {
            case GatingType.INPUT:
                for (let i: number = 0; i < toNodes.length; i++) {
                    const node: Node = toNodes[i];
                    const gateNode: Node = nodes[i % nodes.length];

                    node.incoming
                        .filter(conn => anyMatch(connections, conn))
                        .forEach(conn => {
                            gateNode.addGate(conn);
                            gatedConnections.push(conn);
                        });
                }
                break;
            case GatingType.SELF:
                for (let i: number = 0; i < fromNodes.length; i++) {
                    if (anyMatch(connections, fromNodes[i].selfConnection)) {
                        nodes[i % nodes.length].addGate(fromNodes[i].selfConnection);
                        gatedConnections.push(fromNodes[i].selfConnection);
                    }
                }
                break;
            case GatingType.OUTPUT:
                for (let i: number = 0; i < fromNodes.length; i++) {
                    const node: Node = fromNodes[i];
                    const gateNode: Node = nodes[i % nodes.length];

                    node.outgoing
                        .filter(conn => anyMatch(connections, conn))
                        .forEach(conn => {
                            gateNode.addGate(conn);
                            gatedConnections.push(conn);
                        });
                }
                break;
        }

        return gatedConnections;
    }
}
