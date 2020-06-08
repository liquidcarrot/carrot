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
exports.MemoryLayer = void 0;
var src_1 = require("activations/build/src");
var ConnectionType_1 = require("../../../enums/ConnectionType");
var NodeType_1 = require("../../../enums/NodeType");
var Node_1 = require("../../Node");
var Layer_1 = require("../Layer");
/**
 * Memory layer
 */
var MemoryLayer = /** @class */ (function (_super) {
    __extends(MemoryLayer, _super);
    function MemoryLayer(outputSize, options) {
        var _a, _b, _c;
        if (options === void 0) { options = {}; }
        var _d;
        var _this = _super.call(this, outputSize) || this;
        for (var i = 0; i < outputSize; i++) {
            _this.inputNodes.add(new Node_1.Node(NodeType_1.NodeType.HIDDEN));
        }
        var prevNodes = Array.from(_this.inputNodes);
        var nodes = [];
        for (var i = 0; i < ((_d = options.memorySize) !== null && _d !== void 0 ? _d : 1); i++) {
            var block = [];
            for (var j = 0; j < outputSize; j++) {
                var node = new Node_1.Node(NodeType_1.NodeType.HIDDEN);
                node.squash = src_1.Identitiy;
                node.bias = 0;
                block.push(node);
            }
            (_a = _this.connections).push.apply(_a, Layer_1.Layer.connect(prevNodes, block, ConnectionType_1.ConnectionType.ONE_TO_ONE));
            nodes.push.apply(nodes, block);
            prevNodes = block;
        }
        (_b = _this.nodes).push.apply(_b, Array.from(_this.inputNodes));
        (_c = _this.nodes).push.apply(_c, (nodes.reverse()));
        prevNodes.forEach(function (node) { return _this.outputNodes.add(node); });
        _this.outputNodes.forEach(function (node) { var _a; return node.squash = (_a = options.activation) !== null && _a !== void 0 ? _a : src_1.Logistic; });
        return _this;
    }
    /**
     * Checks if a given connection type is allowed on this layer.
     *
     * @param type the type to check
     *
     * @return Is this connection type allowed?
     */
    MemoryLayer.prototype.connectionTypeisAllowed = function (type) {
        return true;
    };
    /**
     * Gets the default connection type for a incoming connection to this layer.
     *
     * @returns the default incoming connection
     */
    MemoryLayer.prototype.getDefaultIncomingConnectionType = function () {
        return ConnectionType_1.ConnectionType.ALL_TO_ALL;
    };
    return MemoryLayer;
}(Layer_1.Layer));
exports.MemoryLayer = MemoryLayer;
