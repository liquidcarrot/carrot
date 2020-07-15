"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LSTMLayer = void 0;
const src_1 = require("activations/build/src");
const ConnectionType_1 = require("../../../enums/ConnectionType");
const GatingType_1 = require("../../../enums/GatingType");
const NodeType_1 = require("../../../enums/NodeType");
const Node_1 = require("../../Node");
const Layer_1 = require("../Layer");
/**
 * LSTM layer
 */
class LSTMLayer extends Layer_1.Layer {
    constructor(outputSize, options = {}) {
        super(outputSize);
        const inputGate = [];
        const forgetGate = [];
        const memoryCell = [];
        const outputGate = [];
        for (let i = 0; i < outputSize; i++) {
            this.inputNodes.add(new Node_1.Node(NodeType_1.NodeType.HIDDEN));
            inputGate.push(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setBias(1));
            forgetGate.push(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setBias(1).setActivationType(src_1.Logistic));
            memoryCell.push(new Node_1.Node(NodeType_1.NodeType.HIDDEN));
            outputGate.push(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setBias(1));
            this.outputNodes.add(new Node_1.Node(NodeType_1.NodeType.HIDDEN));
        }
        this.connections.push(...Layer_1.Layer.connect(memoryCell, inputGate, ConnectionType_1.ConnectionType.ALL_TO_ALL));
        this.connections.push(...Layer_1.Layer.connect(memoryCell, forgetGate, ConnectionType_1.ConnectionType.ALL_TO_ALL));
        this.connections.push(...Layer_1.Layer.connect(memoryCell, outputGate, ConnectionType_1.ConnectionType.ALL_TO_ALL));
        const forgetGateConnections = Layer_1.Layer.connect(memoryCell, memoryCell, ConnectionType_1.ConnectionType.ONE_TO_ONE);
        const outputGateConnections = Layer_1.Layer.connect(memoryCell, this.outputNodes, ConnectionType_1.ConnectionType.ALL_TO_ALL);
        this.connections.push(...forgetGateConnections);
        this.connections.push(...outputGateConnections);
        this.connections.push(...Layer_1.Layer.connect(this.inputNodes, memoryCell, ConnectionType_1.ConnectionType.ALL_TO_ALL));
        this.connections.push(...Layer_1.Layer.connect(this.inputNodes, outputGate, ConnectionType_1.ConnectionType.ALL_TO_ALL));
        this.connections.push(...Layer_1.Layer.connect(this.inputNodes, forgetGate, ConnectionType_1.ConnectionType.ALL_TO_ALL));
        const inputGateConnections = Layer_1.Layer.connect(this.inputNodes, inputGate, ConnectionType_1.ConnectionType.ALL_TO_ALL);
        this.connections.push(...inputGateConnections);
        this.gates.push(...Layer_1.Layer.gate(forgetGate, forgetGateConnections, GatingType_1.GatingType.SELF));
        this.gates.push(...Layer_1.Layer.gate(outputGate, outputGateConnections, GatingType_1.GatingType.OUTPUT));
        this.gates.push(...Layer_1.Layer.gate(inputGate, inputGateConnections, GatingType_1.GatingType.INPUT));
        this.nodes.push(...Array.from(this.inputNodes));
        this.nodes.push(...inputGate);
        this.nodes.push(...forgetGate);
        this.nodes.push(...memoryCell);
        this.nodes.push(...outputGate);
        this.nodes.push(...Array.from(this.outputNodes));
        this.outputNodes.forEach(node => { var _a; return node.squash = (_a = options.activation) !== null && _a !== void 0 ? _a : src_1.TANH; });
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
exports.LSTMLayer = LSTMLayer;
