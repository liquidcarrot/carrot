"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputLayer = void 0;
const ConnectionType_1 = require("../../../enums/ConnectionType");
const NodeType_1 = require("../../../enums/NodeType");
const Node_1 = require("../../Node");
const Layer_1 = require("../Layer");
const NoiseLayer_1 = require("../NoiseLayers/NoiseLayer");
/**
 * Input layer
 */
class InputLayer extends Layer_1.Layer {
    constructor(outputSize, options = {}) {
        super(outputSize);
        for (let i = 0; i < outputSize; i++) {
            const node = new Node_1.Node(NodeType_1.NodeType.INPUT);
            this.nodes.push(node);
        }
        if (options.noise) {
            const noiseLayer = new NoiseLayer_1.NoiseLayer(options.noise);
            noiseLayer.outputNodes.forEach(node => this.outputNodes.add(node));
            this.connections.push(...Layer_1.Layer.connect(this.nodes, noiseLayer, noiseLayer.getDefaultIncomingConnectionType()));
        }
        else {
            this.nodes.forEach(node => this.outputNodes.add(node));
        }
    }
    /**
     * Gets the default connection type for a incoming connection to this layer.
     *
     * @returns the default incoming connection
     */
    getDefaultIncomingConnectionType() {
        return ConnectionType_1.ConnectionType.NO_CONNECTION;
    }
    /**
     * Checks if a given connection type is allowed on this layer.
     *
     * @param type the type to check
     *
     * @return Is this connection type allowed?
     */
    connectionTypeisAllowed(type) {
        return type === ConnectionType_1.ConnectionType.NO_CONNECTION;
    }
}
exports.InputLayer = InputLayer;
