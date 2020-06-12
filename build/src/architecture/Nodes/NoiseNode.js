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
exports.NoiseNode = void 0;
var NodeType_1 = require("../../enums/NodeType");
var Utils_1 = require("../../utils/Utils");
var ConstantNode_1 = require("./ConstantNode");
/**
 * Noise node
 */
var NoiseNode = /** @class */ (function (_super) {
    __extends(NoiseNode, _super);
    function NoiseNode(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this.noiseType = Utils_1.getOrDefault(options.noiseType, NodeType_1.NoiseNodeType.GAUSSIAN_NOISE);
        _this.options = options;
        return _this;
    }
    /**
     * Actives the node.
     *
     * When a neuron activates, it computes its state from all its input connections and 'squashes' it using its activation function, and returns the output (activation).
     *
     * You can also provide the activation (a float between 0 and 1) as a parameter, which is useful for neurons in the input layer.
     *
     * @returns A neuron's output value
     */
    NoiseNode.prototype.activate = function () {
        var _a, _b, _c, _d;
        this.old = this.state;
        var incomingStates = Array.from(this.incoming).map(function (conn) { return conn.from.activation * conn.weight * conn.gain; });
        switch (this.noiseType) {
            case NodeType_1.NoiseNodeType.GAUSSIAN_NOISE:
                this.state = Utils_1.avg(incomingStates) + Utils_1.generateGaussian((_b = (_a = this.options.gaussian) === null || _a === void 0 ? void 0 : _a.mean) !== null && _b !== void 0 ? _b : 0, (_d = (_c = this.options.gaussian) === null || _c === void 0 ? void 0 : _c.deviation) !== null && _d !== void 0 ? _d : 2);
                break;
            default:
                throw new ReferenceError("Cannot activate this noise type!");
        }
        this.activation = this.squash(this.state, false) * this.mask;
        this.derivativeState = this.squash(this.state, true);
        return this.activation;
    };
    /**
     * Backpropagate the error (a.k.a. learn).
     *
     * After an activation, you can teach the node what should have been the correct output (a.k.a. train). This is done by backpropagating. [Momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html) adds a fraction of the previous weight update to the current one. When the gradient keeps pointing in the same direction, this will increase the size of the steps taken towards the minimum.
     *
     * If you combine a high learning rate with a lot of momentum, you will rush past the minimum (of the error function) with huge steps. It is therefore often necessary to reduce the global learning rate µ when using a lot of momentum (m close to 1).
     *
     * @param target The target value (i.e. "the value the network SHOULD have given")
     * @param options More options for propagation
     */
    NoiseNode.prototype.propagate = function (target, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        options.momentum = Utils_1.getOrDefault(options.momentum, 0);
        options.rate = Utils_1.getOrDefault(options.rate, 0.3);
        options.update = Utils_1.getOrDefault(options.update, true);
        var connectionsStates = Array.from(this.outgoing).map(function (conn) { return conn.to.errorResponsibility * conn.weight * conn.gain; });
        this.errorResponsibility = this.errorProjected = Utils_1.sum(connectionsStates) * this.derivativeState;
        this.incoming.forEach(function (connection) {
            var _a, _b;
            // calculate gradient
            var gradient = _this.errorProjected * connection.eligibility;
            connection.xTrace.forEach(function (value, key) {
                gradient += key.errorResponsibility * value;
            });
            connection.deltaWeightsTotal += ((_a = options.rate) !== null && _a !== void 0 ? _a : 0.3) * gradient * _this.mask;
            if (options.update) {
                connection.deltaWeightsTotal += ((_b = options.momentum) !== null && _b !== void 0 ? _b : 0) * connection.deltaWeightsPrevious;
                connection.weight += connection.deltaWeightsTotal;
                connection.deltaWeightsPrevious = connection.deltaWeightsTotal;
                connection.deltaWeightsTotal = 0;
            }
        });
    };
    return NoiseNode;
}(ConstantNode_1.ConstantNode));
exports.NoiseNode = NoiseNode;
