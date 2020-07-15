"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layer = void 0;
const ConnectionType_1 = require("../../enums/ConnectionType");
const GatingType_1 = require("../../enums/GatingType");
/**
 * Parent class for layers.
 */
class Layer {
    constructor(outputSize) {
        this.outputSize = outputSize;
        this.nodes = [];
        this.inputNodes = new Set();
        this.outputNodes = new Set();
        this.connections = [];
        this.gates = [];
    }
    /**
     * Connect two Layers or sets of Nodes.
     *
     * @param from origin Nodes / Layer
     * @param to destination Nodes / Layer
     * @param connectionType The type of connection
     * @param weight the initial weights for all new connections
     *
     * @returns all created connections
     */
    static connect(from, to, connectionType = ConnectionType_1.ConnectionType.ALL_TO_ALL, weight = 1) {
        if (connectionType === ConnectionType_1.ConnectionType.NO_CONNECTION) {
            throw new ReferenceError("Cannot connect with 'NO_CONNECTION' connection type");
        }
        const fromNodes = Array.from(from instanceof Layer ? from.outputNodes : from);
        const toNodes = Array.from(to instanceof Layer ? to.inputNodes : to);
        if (toNodes.length === 0) {
            throw new ReferenceError("Target from has no input nodes!");
        }
        if (fromNodes.length === 0) {
            throw new ReferenceError("This from has no output nodes!");
        }
        const connections = [];
        if (connectionType === ConnectionType_1.ConnectionType.ALL_TO_ALL) {
            fromNodes.forEach(fromNode => {
                toNodes.forEach(toNode => {
                    connections.push(fromNode.connect(toNode, weight)); // connect every "from node" to every "to node"
                });
            });
        }
        else if (connectionType === ConnectionType_1.ConnectionType.ONE_TO_ONE) {
            if (fromNodes.length !== toNodes.length) {
                throw new RangeError("Can't connect one to one! Number of output nodes from are unequal number of incoming nodes from next layer!");
            }
            for (let i = 0; i < fromNodes.length; i++) {
                connections.push(fromNodes[i].connect(toNodes[i], weight)); // connect every nodes with same indices
            }
        }
        else if (connectionType === ConnectionType_1.ConnectionType.POOLING) {
            // connect the same amount of input nodes to every output node
            // every input node has only one connection available
            const ratio = toNodes.length / fromNodes.length;
            connections.push(...fromNodes.map((node, index) => node.connect(toNodes[Math.floor(index * ratio)], weight)));
        }
        return connections;
    }
    /**
     * Gate nodes and connections.
     *
     * @param nodes the nodes which function as gateNodes
     * @param connections the connections which will be gated
     * @param gateType The type of gating
     *
     * @returns all gated connections
     */
    static gate(nodes, connections, gateType) {
        const gatedConnections = [];
        switch (gateType) {
            case GatingType_1.GatingType.INPUT: { // gate incoming connections
                const toNodes = Array.from(new Set(connections.map(conn => conn.to)));
                for (let i = 0; i < toNodes.length; i++) {
                    const node = toNodes[i];
                    const gateNode = nodes[i % nodes.length];
                    node.incoming
                        .forEach(conn => {
                        if (connections.includes(conn)) {
                            gateNode.addGate(conn);
                            gatedConnections.push(conn);
                        }
                    });
                }
                break;
            }
            case GatingType_1.GatingType.SELF: { // gate self connections
                const fromNodes = Array.from(new Set(connections.map(conn => conn.from)));
                for (let i = 0; i < fromNodes.length; i++) {
                    if (connections.includes(fromNodes[i].selfConnection)) {
                        nodes[i % nodes.length].addGate(fromNodes[i].selfConnection);
                        gatedConnections.push(fromNodes[i].selfConnection);
                    }
                }
                break;
            }
            case GatingType_1.GatingType.OUTPUT: { // gate outgoing connections
                const fromNodes = Array.from(new Set(connections.map(conn => conn.from)));
                for (let i = 0; i < fromNodes.length; i++) {
                    const node = fromNodes[i];
                    const gateNode = nodes[i % nodes.length];
                    node.outgoing
                        .forEach(conn => {
                        if (connections.includes(conn)) {
                            gateNode.addGate(conn);
                            gatedConnections.push(conn);
                        }
                    });
                }
                break;
            }
        }
        return gatedConnections;
    }
}
exports.Layer = Layer;
