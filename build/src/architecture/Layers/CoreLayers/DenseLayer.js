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
exports.DenseLayer = void 0;
var ConnectionType_1 = require("../../../enums/ConnectionType");
var NodeType_1 = require("../../../enums/NodeType");
var Activation_1 = require("../../../methods/Activation");
var Node_1 = require("../../Node");
var Layer_1 = require("../Layer");
/**
 * Dense layer
 */
var DenseLayer = /** @class */ (function (_super) {
    __extends(DenseLayer, _super);
    function DenseLayer(outputSize, options) {
        var _a;
        if (options === void 0) { options = {}; }
        var _b;
        var _this = _super.call(this, outputSize) || this;
        var activation = (_b = options.activationType) !== null && _b !== void 0 ? _b : Activation_1.LogisticActivation;
        for (var i = 0; i < outputSize; i++) {
            _this.inputNodes.add(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setActivationType(activation));
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
    DenseLayer.prototype.connectionTypeisAllowed = function (type) {
        return true;
    };
    /**
     * Gets the default connection type for a incoming connection to this layer.
     *
     * @returns the default incoming connection
     */
    DenseLayer.prototype.getDefaultIncomingConnectionType = function () {
        return ConnectionType_1.ConnectionType.ALL_TO_ALL;
    };
    return DenseLayer;
}(Layer_1.Layer));
exports.DenseLayer = DenseLayer;
