"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryLayer = void 0;
const src_1 = require("activations/build/src");
const ConnectionType_1 = require("../../../enums/ConnectionType");
const NodeType_1 = require("../../../enums/NodeType");
const Node_1 = require("../../Node");
const Layer_1 = require("../Layer");
/**
 * Memory layer
 */
class MemoryLayer extends Layer_1.Layer {
    constructor(outputSize, options = {}) {
        var _a;
        super(outputSize);
        for (let i = 0; i < outputSize; i++) {
            this.inputNodes.add(new Node_1.Node(NodeType_1.NodeType.HIDDEN));
        }
        let prevNodes = Array.from(this.inputNodes);
        const nodes = [];
        for (let i = 0; i < ((_a = options.memorySize) !== null && _a !== void 0 ? _a : 1); i++) {
            const block = [];
            for (let j = 0; j < outputSize; j++) {
                const node = new Node_1.Node(NodeType_1.NodeType.HIDDEN);
                node.squash = src_1.Identitiy;
                node.bias = 0;
                block.push(node);
            }
            this.connections.push(...Layer_1.Layer.connect(prevNodes, block, ConnectionType_1.ConnectionType.ONE_TO_ONE));
            nodes.push(...block);
            prevNodes = block;
        }
        this.nodes.push(...Array.from(this.inputNodes));
        this.nodes.push(...(nodes.reverse()));
        prevNodes.forEach(node => this.outputNodes.add(node));
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
exports.MemoryLayer = MemoryLayer;
