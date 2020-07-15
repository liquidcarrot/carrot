"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RNNLayer = void 0;
const src_1 = require("activations/build/src");
const ConnectionType_1 = require("../../../enums/ConnectionType");
const NodeType_1 = require("../../../enums/NodeType");
const Node_1 = require("../../Node");
const Layer_1 = require("../Layer");
/**
 * RNN layer
 */
class RNNLayer extends Layer_1.Layer {
    constructor(outputSize, options = {}) {
        var _a;
        super(outputSize);
        for (let i = 0; i < outputSize; i++) {
            this.inputNodes.add(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setActivationType((_a = options.activation) !== null && _a !== void 0 ? _a : src_1.Logistic));
        }
        this.outputNodes = this.inputNodes;
        this.nodes.push(...Array.from(this.inputNodes));
        // Adding self connections
        this.connections.push(...Layer_1.Layer.connect(this.nodes, this.nodes, ConnectionType_1.ConnectionType.ONE_TO_ONE));
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
exports.RNNLayer = RNNLayer;
