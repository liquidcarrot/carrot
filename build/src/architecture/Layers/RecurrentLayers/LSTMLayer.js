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
exports.LSTMLayer = void 0;
var src_1 = require("activations/build/src");
var ConnectionType_1 = require("../../../enums/ConnectionType");
var GatingType_1 = require("../../../enums/GatingType");
var NodeType_1 = require("../../../enums/NodeType");
var Node_1 = require("../../Node");
var Layer_1 = require("../Layer");
/**
 * LSTM layer
 */
var LSTMLayer = /** @class */ (function (_super) {
    __extends(LSTMLayer, _super);
    function LSTMLayer(outputSize, options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, outputSize) || this;
        var inputGate = [];
        var forgetGate = [];
        var memoryCell = [];
        var outputGate = [];
        for (var i = 0; i < outputSize; i++) {
            _this.inputNodes.add(new Node_1.Node(NodeType_1.NodeType.HIDDEN));
            inputGate.push(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setBias(1));
            forgetGate.push(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setBias(1).setActivationType(src_1.Logistic));
            memoryCell.push(new Node_1.Node(NodeType_1.NodeType.HIDDEN));
            outputGate.push(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setBias(1));
            _this.outputNodes.add(new Node_1.Node(NodeType_1.NodeType.HIDDEN));
        }
        (_a = _this.connections).push.apply(_a, Layer_1.Layer.connect(memoryCell, inputGate, ConnectionType_1.ConnectionType.ALL_TO_ALL));
        (_b = _this.connections).push.apply(_b, Layer_1.Layer.connect(memoryCell, forgetGate, ConnectionType_1.ConnectionType.ALL_TO_ALL));
        (_c = _this.connections).push.apply(_c, Layer_1.Layer.connect(memoryCell, outputGate, ConnectionType_1.ConnectionType.ALL_TO_ALL));
        var forgetGateConnections = Layer_1.Layer.connect(memoryCell, memoryCell, ConnectionType_1.ConnectionType.ONE_TO_ONE);
        var outputGateConnections = Layer_1.Layer.connect(memoryCell, _this.outputNodes, ConnectionType_1.ConnectionType.ALL_TO_ALL);
        (_d = _this.connections).push.apply(_d, forgetGateConnections);
        (_e = _this.connections).push.apply(_e, outputGateConnections);
        (_f = _this.connections).push.apply(_f, Layer_1.Layer.connect(_this.inputNodes, memoryCell, ConnectionType_1.ConnectionType.ALL_TO_ALL));
        (_g = _this.connections).push.apply(_g, Layer_1.Layer.connect(_this.inputNodes, outputGate, ConnectionType_1.ConnectionType.ALL_TO_ALL));
        (_h = _this.connections).push.apply(_h, Layer_1.Layer.connect(_this.inputNodes, forgetGate, ConnectionType_1.ConnectionType.ALL_TO_ALL));
        var inputGateConnections = Layer_1.Layer.connect(_this.inputNodes, inputGate, ConnectionType_1.ConnectionType.ALL_TO_ALL);
        (_j = _this.connections).push.apply(_j, inputGateConnections);
        (_k = _this.gates).push.apply(_k, Layer_1.Layer.gate(forgetGate, forgetGateConnections, GatingType_1.GatingType.SELF));
        (_l = _this.gates).push.apply(_l, Layer_1.Layer.gate(outputGate, outputGateConnections, GatingType_1.GatingType.OUTPUT));
        (_m = _this.gates).push.apply(_m, Layer_1.Layer.gate(inputGate, inputGateConnections, GatingType_1.GatingType.INPUT));
        (_o = _this.nodes).push.apply(_o, Array.from(_this.inputNodes));
        (_p = _this.nodes).push.apply(_p, inputGate);
        (_q = _this.nodes).push.apply(_q, forgetGate);
        (_r = _this.nodes).push.apply(_r, memoryCell);
        (_s = _this.nodes).push.apply(_s, outputGate);
        (_t = _this.nodes).push.apply(_t, Array.from(_this.outputNodes));
        _this.outputNodes.forEach(function (node) { var _a; return node.squash = (_a = options.activation) !== null && _a !== void 0 ? _a : src_1.TANH; });
        return _this;
    }
    /**
     * Checks if a given connection type is allowed on this layer.
     *
     * @param type the type to check
     *
     * @return Is this connection type allowed?
     */
    LSTMLayer.prototype.connectionTypeisAllowed = function (type) {
        return true;
    };
    /**
     * Gets the default connection type for a incoming connection to this layer.
     *
     * @returns the default incoming connection
     */
    LSTMLayer.prototype.getDefaultIncomingConnectionType = function () {
        return ConnectionType_1.ConnectionType.ALL_TO_ALL;
    };
    return LSTMLayer;
}(Layer_1.Layer));
exports.LSTMLayer = LSTMLayer;
