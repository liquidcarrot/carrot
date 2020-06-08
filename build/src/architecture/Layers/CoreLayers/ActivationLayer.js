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
exports.ActivationLayer = void 0;
var src_1 = require("activations/build/src");
var ConnectionType_1 = require("../../../enums/ConnectionType");
var ActivationNode_1 = require("../../Nodes/ActivationNode");
var Layer_1 = require("../Layer");
/**
 * Activation layer
 */
var ActivationLayer = /** @class */ (function (_super) {
    __extends(ActivationLayer, _super);
    function ActivationLayer(outputSize, options) {
        var _a;
        if (options === void 0) { options = {}; }
        var _b;
        var _this = _super.call(this, outputSize) || this;
        var activation = (_b = options.activation) !== null && _b !== void 0 ? _b : src_1.Logistic;
        for (var i = 0; i < outputSize; i++) {
            _this.inputNodes.add(new ActivationNode_1.ActivationNode().setActivationType(activation));
        }
        _this.outputNodes = _this.inputNodes;
        (_a = _this.nodes).push.apply(_a, Array.from(_this.inputNodes));
        return _this;
    }
    /**
     * Checks if a given connection type is allowed on this layer.
     *
     * @param type the type to check
     *
     * @return Is this connection type allowed?
     */
    ActivationLayer.prototype.connectionTypeisAllowed = function (type) {
        return type === ConnectionType_1.ConnectionType.ONE_TO_ONE;
    };
    /**
     * Gets the default connection type for a incoming connection to this layer.
     *
     * @returns the default incoming connection
     */
    ActivationLayer.prototype.getDefaultIncomingConnectionType = function () {
        return ConnectionType_1.ConnectionType.ONE_TO_ONE;
    };
    return ActivationLayer;
}(Layer_1.Layer));
exports.ActivationLayer = ActivationLayer;
