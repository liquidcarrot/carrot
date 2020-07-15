"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GRULayer = void 0;
const src_1 = require("activations/build/src");
const ConnectionType_1 = require("../../../enums/ConnectionType");
const GatingType_1 = require("../../../enums/GatingType");
const NodeType_1 = require("../../../enums/NodeType");
const Node_1 = require("../../Node");
const Layer_1 = require("../Layer");
/**
 * GRU layer
 */
class GRULayer extends Layer_1.Layer {
    constructor(outputSize, options = {}) {
        super(outputSize);
        const updateGate = [];
        const inverseUpdateGate = [];
        const resetGate = [];
        const memoryCell = [];
        const previousOutput = [];
        for (let i = 0; i < outputSize; i++) {
            this.inputNodes.add(new Node_1.Node(NodeType_1.NodeType.HIDDEN));
            updateGate.push(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setBias(1));
            inverseUpdateGate.push(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setBias(0).setActivationType(src_1.Logistic));
            resetGate.push(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setBias(0));
            memoryCell.push(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setActivationType(src_1.TANH));
            previousOutput.push(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setBias(0).setActivationType(src_1.Logistic));
            this.outputNodes.add(new Node_1.Node(NodeType_1.NodeType.HIDDEN));
        }
        this.connections.push(...Layer_1.Layer.connect(this.inputNodes, updateGate, ConnectionType_1.ConnectionType.ALL_TO_ALL));
        this.connections.push(...Layer_1.Layer.connect(this.inputNodes, resetGate, ConnectionType_1.ConnectionType.ALL_TO_ALL));
        this.connections.push(...Layer_1.Layer.connect(this.inputNodes, memoryCell, ConnectionType_1.ConnectionType.ALL_TO_ALL));
        this.connections.push(...Layer_1.Layer.connect(previousOutput, updateGate, ConnectionType_1.ConnectionType.ALL_TO_ALL));
        this.connections.push(...Layer_1.Layer.connect(updateGate, inverseUpdateGate, ConnectionType_1.ConnectionType.ONE_TO_ONE, 1));
        this.connections.push(...Layer_1.Layer.connect(previousOutput, resetGate, ConnectionType_1.ConnectionType.ALL_TO_ALL));
        const reset = Layer_1.Layer.connect(previousOutput, memoryCell, ConnectionType_1.ConnectionType.ALL_TO_ALL);
        this.connections.push(...reset);
        this.gates.push(...Layer_1.Layer.gate(resetGate, reset, GatingType_1.GatingType.OUTPUT));
        const update = Layer_1.Layer.connect(previousOutput, this.outputNodes, ConnectionType_1.ConnectionType.ALL_TO_ALL);
        const inverseUpdate = Layer_1.Layer.connect(memoryCell, this.outputNodes, ConnectionType_1.ConnectionType.ALL_TO_ALL);
        this.connections.push(...update);
        this.connections.push(...inverseUpdate);
        this.gates.push(...Layer_1.Layer.gate(updateGate, update, GatingType_1.GatingType.OUTPUT));
        this.gates.push(...Layer_1.Layer.gate(inverseUpdateGate, inverseUpdate, GatingType_1.GatingType.OUTPUT));
        this.connections.push(...Layer_1.Layer.connect(this.outputNodes, previousOutput, ConnectionType_1.ConnectionType.ONE_TO_ONE, 1));
        this.nodes.push(...Array.from(this.inputNodes));
        this.nodes.push(...updateGate);
        this.nodes.push(...inverseUpdateGate);
        this.nodes.push(...resetGate);
        this.nodes.push(...memoryCell);
        this.nodes.push(...Array.from(this.outputNodes));
        this.nodes.push(...previousOutput);
        this.outputNodes.forEach(node => { var _a; return node.squash = (_a = options.activation) !== null && _a !== void 0 ? _a : src_1.Logistic; });
    }
    /**
     * Checks if a given connection type is allowed on this layer.
     *
     * @param type the type to check
     *
     * @return Is this connection type allowed?
     */
    connectionTypeisAllowed(type) {
        return true;
    }
    /**
     * Gets the default connection type for a incoming connection to this layer.
     *
     * @returns the default incoming connection
     */
    getDefaultIncomingConnectionType() {
        return ConnectionType_1.ConnectionType.ALL_TO_ALL;
    }
}
exports.GRULayer = GRULayer;
