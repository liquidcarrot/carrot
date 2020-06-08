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
exports.MinPooling1DLayer = void 0;
var src_1 = require("activations/build/src");
var NodeType_1 = require("../../../enums/NodeType");
var PoolNode_1 = require("../../Nodes/PoolNode");
var PoolingLayer_1 = require("./PoolingLayer");
/**
 * Minimum pooling layer 1D
 */
var MinPooling1DLayer = /** @class */ (function (_super) {
    __extends(MinPooling1DLayer, _super);
    function MinPooling1DLayer(outputSize, options) {
        var _a;
        if (options === void 0) { options = {}; }
        var _b;
        var _this = _super.call(this, outputSize) || this;
        var activationType = (_b = options.activation) !== null && _b !== void 0 ? _b : src_1.Identitiy;
        for (var i = 0; i < outputSize; i++) {
            _this.inputNodes.add(new PoolNode_1.PoolNode(NodeType_1.PoolNodeType.MIN_POOLING).setActivationType(activationType));
        }
        _this.outputNodes = _this.inputNodes;
        (_a = _this.nodes).push.apply(_a, Array.from(_this.inputNodes));
        return _this;
    }
    return MinPooling1DLayer;
}(PoolingLayer_1.PoolingLayer));
exports.MinPooling1DLayer = MinPooling1DLayer;
