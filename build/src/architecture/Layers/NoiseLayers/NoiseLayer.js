"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoiseLayer = void 0;
const src_1 = require("activations/build/src");
const ConnectionType_1 = require("../../../enums/ConnectionType");
const NodeType_1 = require("../../../enums/NodeType");
const NoiseNode_1 = require("../../Nodes/NoiseNode");
const Layer_1 = require("../Layer");
/**
 * Noise layer
 */
class NoiseLayer extends Layer_1.Layer {
    constructor(outputSize, options = {}) {
        var _a;
        super(outputSize);
        const activation = (_a = options.activation) !== null && _a !== void 0 ? _a : src_1.Identitiy;
        for (let i = 0; i < outputSize; i++) {
            this.inputNodes.add(new NoiseNode_1.NoiseNode({
                noiseType: NodeType_1.NoiseNodeType.GAUSSIAN_NOISE,
                gaussian: options
            }).setActivationType(activation));
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
exports.NoiseLayer = NoiseLayer;
