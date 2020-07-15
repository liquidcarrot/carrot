"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HopfieldLayer = void 0;
const src_1 = require("activations/build/src");
const ConnectionType_1 = require("../../../enums/ConnectionType");
const NodeType_1 = require("../../../enums/NodeType");
const Node_1 = require("../../Node");
const Layer_1 = require("../Layer");
/**
 * Hopfield layer
 */
class HopfieldLayer extends Layer_1.Layer {
    constructor(outputSize) {
        super(outputSize);
        for (let i = 0; i < outputSize; i++) {
            this.inputNodes.add(new Node_1.Node(NodeType_1.NodeType.HIDDEN));
            this.outputNodes.add(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setActivationType(src_1.BinaryStep));
        }
        this.connections.push(...Layer_1.Layer.connect(this.inputNodes, this.outputNodes, ConnectionType_1.ConnectionType.ALL_TO_ALL));
        this.connections.push(...Layer_1.Layer.connect(this.outputNodes, this.inputNodes, ConnectionType_1.ConnectionType.ALL_TO_ALL));
        this.nodes.push(...Array.from(this.inputNodes));
        this.nodes.push(...Array.from(this.outputNodes));
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
exports.HopfieldLayer = HopfieldLayer;
