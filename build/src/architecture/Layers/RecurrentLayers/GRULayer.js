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
exports.GRULayer = void 0;
var src_1 = require("activations/build/src");
var ConnectionType_1 = require("../../../enums/ConnectionType");
var GatingType_1 = require("../../../enums/GatingType");
var NodeType_1 = require("../../../enums/NodeType");
var Node_1 = require("../../Node");
var Layer_1 = require("../Layer");
/**
 * GRU layer
 */
var GRULayer = /** @class */ (function (_super) {
    __extends(GRULayer, _super);
    function GRULayer(outputSize, options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, outputSize) || this;
        var updateGate = [];
        var inverseUpdateGate = [];
        var resetGate = [];
        var memoryCell = [];
        var previousOutput = [];
        for (var i = 0; i < outputSize; i++) {
            _this.inputNodes.add(new Node_1.Node(NodeType_1.NodeType.HIDDEN));
            updateGate.push(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setBias(1));
            inverseUpdateGate.push(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setBias(0).setActivationType(src_1.Logistic));
            resetGate.push(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setBias(0));
            memoryCell.push(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setActivationType(src_1.TANH));
            previousOutput.push(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setBias(0).setActivationType(src_1.Logistic));
            _this.outputNodes.add(new Node_1.Node(NodeType_1.NodeType.HIDDEN));
        }
        (_a = _this.connections).push.apply(_a, Layer_1.Layer.connect(_this.inputNodes, updateGate, ConnectionType_1.ConnectionType.ALL_TO_ALL));
        (_b = _this.connections).push.apply(_b, Layer_1.Layer.connect(_this.inputNodes, resetGate, ConnectionType_1.ConnectionType.ALL_TO_ALL));
        (_c = _this.connections).push.apply(_c, Layer_1.Layer.connect(_this.inputNodes, memoryCell, ConnectionType_1.ConnectionType.ALL_TO_ALL));
        (_d = _this.connections).push.apply(_d, Layer_1.Layer.connect(previousOutput, updateGate, ConnectionType_1.ConnectionType.ALL_TO_ALL));
        (_e = _this.connections).push.apply(_e, Layer_1.Layer.connect(updateGate, inverseUpdateGate, ConnectionType_1.ConnectionType.ONE_TO_ONE, 1));
        (_f = _this.connections).push.apply(_f, Layer_1.Layer.connect(previousOutput, resetGate, ConnectionType_1.ConnectionType.ALL_TO_ALL));
        var reset = Layer_1.Layer.connect(previousOutput, memoryCell, ConnectionType_1.ConnectionType.ALL_TO_ALL);
        (_g = _this.connections).push.apply(_g, reset);
        (_h = _this.gates).push.apply(_h, Layer_1.Layer.gate(resetGate, reset, GatingType_1.GatingType.OUTPUT));
        var update = Layer_1.Layer.connect(previousOutput, _this.outputNodes, ConnectionType_1.ConnectionType.ALL_TO_ALL);
        var inverseUpdate = Layer_1.Layer.connect(memoryCell, _this.outputNodes, ConnectionType_1.ConnectionType.ALL_TO_ALL);
        (_j = _this.connections).push.apply(_j, update);
        (_k = _this.connections).push.apply(_k, inverseUpdate);
        (_l = _this.gates).push.apply(_l, Layer_1.Layer.gate(updateGate, update, GatingType_1.GatingType.OUTPUT));
        (_m = _this.gates).push.apply(_m, Layer_1.Layer.gate(inverseUpdateGate, inverseUpdate, GatingType_1.GatingType.OUTPUT));
        (_o = _this.connections).push.apply(_o, Layer_1.Layer.connect(_this.outputNodes, previousOutput, ConnectionType_1.ConnectionType.ONE_TO_ONE, 1));
        (_p = _this.nodes).push.apply(_p, Array.from(_this.inputNodes));
        (_q = _this.nodes).push.apply(_q, updateGate);
        (_r = _this.nodes).push.apply(_r, inverseUpdateGate);
        (_s = _this.nodes).push.apply(_s, resetGate);
        (_t = _this.nodes).push.apply(_t, memoryCell);
        (_u = _this.nodes).push.apply(_u, Array.from(_this.outputNodes));
        (_v = _this.nodes).push.apply(_v, previousOutput);
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
    GRULayer.prototype.connectionTypeisAllowed = function (type) {
        return true;
    };
    /**
     * Gets the default connection type for a incoming connection to this layer.
     *
     * @returns the default incoming connection
     */
    GRULayer.prototype.getDefaultIncomingConnectionType = function () {
        return ConnectionType_1.ConnectionType.ALL_TO_ALL;
    };
    return GRULayer;
}(Layer_1.Layer));
exports.GRULayer = GRULayer;
