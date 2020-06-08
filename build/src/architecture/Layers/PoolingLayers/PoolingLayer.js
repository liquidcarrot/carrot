"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolingLayer = void 0;
var ConnectionType_1 = require("../../../enums/ConnectionType");
var Layer_1 = require("../Layer");
/**
 * Parent class for all pooling layers
 */
var PoolingLayer = /** @class */ (function (_super) {
    __extends(PoolingLayer, _super);
    function PoolingLayer(outputSize) {
        return _super.call(this, outputSize) || this;
    }
    /**
     * Gets the default connection type for a incoming connection to this layer.
     *
     * @returns the default incoming connection
     */
    PoolingLayer.prototype.getDefaultIncomingConnectionType = function () {
        return ConnectionType_1.ConnectionType.POOLING;
    };
    /**
     * Checks if a given connection type is allowed on this layer.
     *
     * @param type the type to check
     *
     * @return Is this connection type allowed?
     */
    PoolingLayer.prototype.connectionTypeisAllowed = function (type) {
        return true;
    };
    return PoolingLayer;
}(Layer_1.Layer));
exports.PoolingLayer = PoolingLayer;
