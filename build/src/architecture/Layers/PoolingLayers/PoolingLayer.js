"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolingLayer = void 0;
const ConnectionType_1 = require("../../../enums/ConnectionType");
const Layer_1 = require("../Layer");
/**
 * Parent class for all pooling layers
 */
class PoolingLayer extends Layer_1.Layer {
    constructor(outputSize) {
        super(outputSize);
    }
    /**
     * Gets the default connection type for a incoming connection to this layer.
     *
     * @returns the default incoming connection
     */
    getDefaultIncomingConnectionType() {
        return ConnectionType_1.ConnectionType.POOLING;
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
}
exports.PoolingLayer = PoolingLayer;
