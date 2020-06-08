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
exports.RNNLayer = void 0;
var src_1 = require("activations/build/src");
var ConnectionType_1 = require("../../../enums/ConnectionType");
var NodeType_1 = require("../../../enums/NodeType");
var Node_1 = require("../../Node");
var Layer_1 = require("../Layer");
/**
 * RNN layer
 */
var RNNLayer = /** @class */ (function (_super) {
    __extends(RNNLayer, _super);
    function RNNLayer(outputSize, options) {
        var _a, _b;
        if (options === void 0) { options = {}; }
        var _c;
        var _this = _super.call(this, outputSize) || this;
        for (var i = 0; i < outputSize; i++) {
            _this.inputNodes.add(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setActivationType((_c = options.activation) !== null && _c !== void 0 ? _c : src_1.Logistic));
        }
        _this.outputNodes = _this.inputNodes;
        (_a = _this.nodes).push.apply(_a, Array.from(_this.inputNodes));
        // Adding self connections
        (_b = _this.connections).push.apply(_b, Layer_1.Layer.connect(_this.nodes, _this.nodes, ConnectionType_1.ConnectionType.ONE_TO_ONE));
        return _this;
    }
    /**
     * Checks if a given connection type is allowed on this layer.
     *
     * @param type the type to check
     *
     * @return Is this connection type allowed?
     */
    RNNLayer.prototype.connectionTypeisAllowed = function (type) {
        return true;
    };
    /**
     * Gets the default connection type for a incoming connection to this layer.
     *
     * @returns the default incoming connection
     */
    RNNLayer.prototype.getDefaultIncomingConnectionType = function () {
        return ConnectionType_1.ConnectionType.ALL_TO_ALL;
    };
    return RNNLayer;
}(Layer_1.Layer));
exports.RNNLayer = RNNLayer;
