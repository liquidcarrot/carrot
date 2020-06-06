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
exports.HopfieldLayer = void 0;
var ConnectionType_1 = require("../../../enums/ConnectionType");
var NodeType_1 = require("../../../enums/NodeType");
var Activation_1 = require("../../../methods/Activation");
var Node_1 = require("../../Node");
var Layer_1 = require("../Layer");
/**
 * Hopfield layer
 */
var HopfieldLayer = /** @class */ (function (_super) {
    __extends(HopfieldLayer, _super);
    function HopfieldLayer(outputSize) {
        var _a, _b, _c, _d;
        var _this = _super.call(this, outputSize) || this;
        for (var i = 0; i < outputSize; i++) {
            _this.inputNodes.add(new Node_1.Node(NodeType_1.NodeType.HIDDEN));
            _this.outputNodes.add(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setActivationType(Activation_1.StepActivation));
        }
        (_a = _this.connections).push.apply(_a, Layer_1.Layer.connect(_this.inputNodes, _this.outputNodes, ConnectionType_1.ConnectionType.ALL_TO_ALL));
        (_b = _this.connections).push.apply(_b, Layer_1.Layer.connect(_this.outputNodes, _this.inputNodes, ConnectionType_1.ConnectionType.ALL_TO_ALL));
        (_c = _this.nodes).push.apply(_c, Array.from(_this.inputNodes));
        (_d = _this.nodes).push.apply(_d, Array.from(_this.outputNodes));
        return _this;
    }
    /**
     * Checks if a given connection type is allowed on this layer.
     *
     * @param type the type to check
     *
     * @return Is this connection type allowed?
     */
    HopfieldLayer.prototype.connectionTypeisAllowed = function (type) {
        return true;
    };
    /**
     * Gets the default connection type for a incoming connection to this layer.
     *
     * @returns the default incoming connection
     */
    HopfieldLayer.prototype.getDefaultIncomingConnectionType = function () {
        return ConnectionType_1.ConnectionType.ALL_TO_ALL;
    };
    return HopfieldLayer;
}(Layer_1.Layer));
exports.HopfieldLayer = HopfieldLayer;
