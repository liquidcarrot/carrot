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
exports.DropoutNode = void 0;
var Utils_1 = require("../../utils/Utils");
var ConstantNode_1 = require("./ConstantNode");
/**
 * Dropout node
 */
var DropoutNode = /** @class */ (function (_super) {
    __extends(DropoutNode, _super);
    function DropoutNode(probability) {
        var _this = _super.call(this) || this;
        _this.probability = probability;
        _this.droppedOut = false;
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
    DropoutNode.prototype.activate = function () {
        var _this = this;
        if (this.incoming.size !== 1) {
            throw new RangeError("Dropout node should have exactly one incoming connection!");
        }
        var incomingConnection = Array.from(this.incoming)[0];
        // https://stats.stackexchange.com/a/219240
        if (Utils_1.randDouble(0, 1) < this.probability) {
            // DROPOUT
            this.droppedOut = true;
            this.state = 0;
        }
        else {
            this.droppedOut = false;
            this.state = incomingConnection.from.activation * incomingConnection.weight * incomingConnection.gain;
            this.state *= 1 / (1 - this.probability);
        }
        this.activation = this.squash(this.state, false) * this.mask;
        // Adjust gain
        this.gated.forEach(function (conn) { return conn.gain = _this.activation; });
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
    DropoutNode.prototype.propagate = function (target, options) {
        if (options === void 0) { options = {}; }
        options.momentum = Utils_1.getOrDefault(options.momentum, 0);
        options.rate = Utils_1.getOrDefault(options.rate, 0.3);
        options.update = Utils_1.getOrDefault(options.update, true);
        var connectionsStates = Array.from(this.outgoing).map(function (conn) { return conn.to.errorResponsibility * conn.weight * conn.gain; });
        this.errorResponsibility = this.errorProjected = Utils_1.sum(connectionsStates) / (1 - this.probability);
        if (this.incoming.size !== 1) {
            throw new RangeError("Dropout node should have exactly one incoming connection!");
        }
        var connection = Array.from(this.incoming)[0];
        // calculate gradient
        if (!this.droppedOut) {
            var gradient_1 = this.errorProjected * connection.eligibility;
            connection.xTrace.forEach(function (value, key) {
                gradient_1 += key.errorResponsibility * value;
            });
            if (options.update) {
                connection.deltaWeightsTotal += options.rate * gradient_1 * this.mask + options.momentum * connection.deltaWeightsPrevious;
                connection.weight += connection.deltaWeightsTotal;
                connection.deltaWeightsPrevious = connection.deltaWeightsTotal;
                connection.deltaWeightsTotal = 0;
            }
        }
    };
    /**
     * Create a constant node from json object.
     *
     * @param json the json object representing the node
     *
     * @returns the created node
     */
    DropoutNode.prototype.fromJSON = function (json) {
        _super.prototype.fromJSON.call(this, json);
        this.probability = json.probability;
        return this;
    };
    /**
     * Convert this node into a json object.
     *
     * @returns the json object representing this node
     */
    DropoutNode.prototype.toJSON = function () {
        return Object.assign(_super.prototype.toJSON.call(this), {
            probability: this.probability
        });
    };
    return DropoutNode;
}(ConstantNode_1.ConstantNode));
exports.DropoutNode = DropoutNode;
