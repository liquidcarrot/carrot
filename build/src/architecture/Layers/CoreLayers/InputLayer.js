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
exports.InputLayer = void 0;
var ConnectionType_1 = require("../../../enums/ConnectionType");
var NodeType_1 = require("../../../enums/NodeType");
var Node_1 = require("../../Node");
var Layer_1 = require("../Layer");
var NoiseLayer_1 = require("../NoiseLayers/NoiseLayer");
/**
 * Input layer
 */
var InputLayer = /** @class */ (function (_super) {
    __extends(InputLayer, _super);
    function InputLayer(outputSize, options) {
        var _a;
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, outputSize) || this;
        for (var i = 0; i < outputSize; i++) {
            var node = new Node_1.Node(NodeType_1.NodeType.INPUT);
            _this.nodes.push(node);
        }
        if (options.noise) {
            var noiseLayer = new NoiseLayer_1.NoiseLayer(options.noise);
            noiseLayer.outputNodes.forEach(function (node) { return _this.outputNodes.add(node); });
            (_a = _this.connections).push.apply(_a, Layer_1.Layer.connect(_this.nodes, noiseLayer, noiseLayer.getDefaultIncomingConnectionType()));
        }
        else {
            _this.nodes.forEach(function (node) { return _this.outputNodes.add(node); });
        }
        return _this;
    }
    /**
     * Gets the default connection type for a incoming connection to this layer.
     *
     * @returns the default incoming connection
     */
    InputLayer.prototype.getDefaultIncomingConnectionType = function () {
        return ConnectionType_1.ConnectionType.NO_CONNECTION;
    };
    /**
     * Checks if a given connection type is allowed on this layer.
     *
     * @param type the type to check
     *
     * @return Is this connection type allowed?
     */
    InputLayer.prototype.connectionTypeisAllowed = function (type) {
        return type === ConnectionType_1.ConnectionType.NO_CONNECTION;
    };
    return InputLayer;
}(Layer_1.Layer));
exports.InputLayer = InputLayer;
