"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layer = void 0;
var ConnectionType_1 = require("../../enums/ConnectionType");
var GatingType_1 = require("../../enums/GatingType");
/**
 * Parent class for layers.
 */
var Layer = /** @class */ (function () {
    function Layer(outputSize) {
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
    Layer.connect = function (from, to, connectionType, weight) {
        if (connectionType === void 0) { connectionType = ConnectionType_1.ConnectionType.ALL_TO_ALL; }
        if (weight === void 0) { weight = 1; }
        if (connectionType === ConnectionType_1.ConnectionType.NO_CONNECTION) {
            throw new ReferenceError("Cannot connect with 'NO_CONNECTION' connection type");
        }
        var fromNodes = Array.from(from instanceof Layer ? from.outputNodes : from);
        var toNodes = Array.from(to instanceof Layer ? to.inputNodes : to);
        if (toNodes.length === 0) {
            throw new ReferenceError("Target from has no input nodes!");
        }
        if (fromNodes.length === 0) {
            throw new ReferenceError("This from has no output nodes!");
        }
        var connections = [];
        if (connectionType === ConnectionType_1.ConnectionType.ALL_TO_ALL) {
            fromNodes.forEach(function (fromNode) {
                toNodes.forEach(function (toNode) {
                    connections.push(fromNode.connect(toNode, weight)); // connect every "from node" to every "to node"
                });
            });
        }
        else if (connectionType === ConnectionType_1.ConnectionType.ONE_TO_ONE) {
            if (fromNodes.length !== toNodes.length) {
                throw new RangeError("Can't connect one to one! Number of output nodes from are unequal number of incoming nodes from next layer!");
            }
            for (var i = 0; i < fromNodes.length; i++) {
                connections.push(fromNodes[i].connect(toNodes[i], weight)); // connect every nodes with same indices
            }
        }
        else if (connectionType === ConnectionType_1.ConnectionType.POOLING) {
            // connect the same amount of input nodes to every output node
            // every input node has only one connection available
            var ratio_1 = toNodes.length / fromNodes.length;
            connections.push.apply(connections, fromNodes.map(function (node, index) { return node.connect(toNodes[Math.floor(index * ratio_1)], weight); }));
        }
        return connections;
    };
    /**
     * Gate nodes and connections.
     *
     * @param nodes the nodes which function as gateNodes
     * @param connections the connections which will be gated
     * @param gateType The type of gating
     *
     * @returns all gated connections
     */
    Layer.gate = function (nodes, connections, gateType) {
        var gatedConnections = [];
        switch (gateType) {
            case GatingType_1.GatingType.INPUT: { // gate incoming connections
                var toNodes = Array.from(new Set(connections.map(function (conn) { return conn.to; })));
                var _loop_1 = function (i) {
                    var node = toNodes[i];
                    var gateNode = nodes[i % nodes.length];
                    node.incoming
                        .forEach(function (conn) {
                        if (connections.includes(conn)) {
                            gateNode.addGate(conn);
                            gatedConnections.push(conn);
                        }
                    });
                };
                for (var i = 0; i < toNodes.length; i++) {
                    _loop_1(i);
                }
                break;
            }
            case GatingType_1.GatingType.SELF: { // gate self connections
                var fromNodes = Array.from(new Set(connections.map(function (conn) { return conn.from; })));
                for (var i = 0; i < fromNodes.length; i++) {
                    if (connections.includes(fromNodes[i].selfConnection)) {
                        nodes[i % nodes.length].addGate(fromNodes[i].selfConnection);
                        gatedConnections.push(fromNodes[i].selfConnection);
                    }
                }
                break;
            }
            case GatingType_1.GatingType.OUTPUT: { // gate outgoing connections
                var fromNodes = Array.from(new Set(connections.map(function (conn) { return conn.from; })));
                var _loop_2 = function (i) {
                    var node = fromNodes[i];
                    var gateNode = nodes[i % nodes.length];
                    node.outgoing
                        .forEach(function (conn) {
                        if (connections.includes(conn)) {
                            gateNode.addGate(conn);
                            gatedConnections.push(conn);
                        }
                    });
                };
                for (var i = 0; i < fromNodes.length; i++) {
                    _loop_2(i);
                }
                break;
            }
        }
        return gatedConnections;
    };
    return Layer;
}());
exports.Layer = Layer;
