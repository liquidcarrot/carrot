"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropoutNode = void 0;
const Utils_1 = require("../../utils/Utils");
const ConstantNode_1 = require("./ConstantNode");
/**
 * Dropout node
 */
class DropoutNode extends ConstantNode_1.ConstantNode {
    constructor(probability) {
        super();
        this.probability = probability;
        this.droppedOut = false;
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
    activate() {
        if (this.incoming.size !== 1) {
            throw new RangeError("Dropout node should have exactly one incoming connection!");
        }
        const incomingConnection = Array.from(this.incoming)[0];
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
        this.gated.forEach(conn => conn.gain = this.activation);
        return this.activation;
    }
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
    propagate(target, options = {}) {
        var _a, _b, _c;
        options.momentum = (_a = options.momentum) !== null && _a !== void 0 ? _a : 0;
        options.rate = (_b = options.rate) !== null && _b !== void 0 ? _b : 0.3;
        options.update = (_c = options.update) !== null && _c !== void 0 ? _c : true;
        const connectionsStates = Array.from(this.outgoing).map(conn => conn.to.errorResponsibility * conn.weight * conn.gain);
        this.errorResponsibility = this.errorProjected = Utils_1.sum(connectionsStates) / (1 - this.probability);
        if (this.incoming.size !== 1) {
            throw new RangeError("Dropout node should have exactly one incoming connection!");
        }
        const connection = Array.from(this.incoming)[0];
        // calculate gradient
        if (!this.droppedOut) {
            let gradient = this.errorProjected * connection.eligibility;
            connection.xTrace.forEach((value, key) => {
                gradient += key.errorResponsibility * value;
            });
            if (options.update) {
                connection.deltaWeightsTotal += options.rate * gradient * this.mask + options.momentum * connection.deltaWeightsPrevious;
                connection.weight += connection.deltaWeightsTotal;
                connection.deltaWeightsPrevious = connection.deltaWeightsTotal;
                connection.deltaWeightsTotal = 0;
            }
        }
    }
    /**
     * Create a constant node from json object.
     *
     * @param json the json object representing the node
     *
     * @returns the created node
     */
    fromJSON(json) {
        super.fromJSON(json);
        this.probability = json.probability;
        return this;
    }
    /**
     * Convert this node into a json object.
     *
     * @returns the json object representing this node
     */
    toJSON() {
        return Object.assign(super.toJSON(), {
            probability: this.probability
        });
    }
}
exports.DropoutNode = DropoutNode;
