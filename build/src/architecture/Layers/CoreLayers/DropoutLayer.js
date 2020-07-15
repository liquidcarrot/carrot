"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropoutLayer = void 0;
const src_1 = require("activations/build/src");
const ConnectionType_1 = require("../../../enums/ConnectionType");
const DropoutNode_1 = require("../../Nodes/DropoutNode");
const Layer_1 = require("../Layer");
/**
 * Dropout layer
 */
class DropoutLayer extends Layer_1.Layer {
    constructor(outputSize, options = {}) {
        var _a, _b;
        super(outputSize);
        const activation = (_a = options.activation) !== null && _a !== void 0 ? _a : src_1.Identitiy;
        const probability = (_b = options.probability) !== null && _b !== void 0 ? _b : 0.1;
        for (let i = 0; i < outputSize; i++) {
            this.inputNodes.add(new DropoutNode_1.DropoutNode(probability).setActivationType(activation));
        }
        this.outputNodes = this.inputNodes;
        this.nodes.push(...Array.from(this.inputNodes));
    }
    /**
     * Gets the default connection type for a incoming connection to this layer.
     *
     * @returns the default incoming connection
     */
    getDefaultIncomingConnectionType() {
        return ConnectionType_1.ConnectionType.ONE_TO_ONE;
    }
    /**
     * Checks if a given connection type is allowed on this layer.
     *
     * @param type the type to check
     *
     * @return Is this connection type allowed?
     */
    connectionTypeisAllowed(type) {
        return type === ConnectionType_1.ConnectionType.ONE_TO_ONE;
    }
}
exports.DropoutLayer = DropoutLayer;
