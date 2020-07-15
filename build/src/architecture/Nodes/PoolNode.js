"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolNode = void 0;
const NodeType_1 = require("../../enums/NodeType");
const Utils_1 = require("../../utils/Utils");
const ConstantNode_1 = require("./ConstantNode");
/**
 * Pool node
 */
class PoolNode extends ConstantNode_1.ConstantNode {
    constructor(poolingType = NodeType_1.PoolNodeType.MAX_POOLING) {
        super();
        this.poolingType = poolingType;
        this.receivingNode = null;
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
        this.poolingType = json.poolType;
        return this;
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
        const connections = Array.from(this.incoming);
        const incomingStates = connections.map(conn => conn.from.activation * conn.weight * conn.gain);
        if (this.poolingType === NodeType_1.PoolNodeType.MAX_POOLING) {
            const index = Utils_1.maxValueIndex(incomingStates);
            this.receivingNode = connections[index].from;
            this.state = incomingStates[index];
        }
        else if (this.poolingType === NodeType_1.PoolNodeType.AVG_POOLING) {
            this.state = Utils_1.avg(incomingStates);
        }
        else if (this.poolingType === NodeType_1.PoolNodeType.MIN_POOLING) {
            const index = Utils_1.minValueIndex(incomingStates);
            this.receivingNode = connections[index].from;
            this.state = incomingStates[index];
        }
        else {
            throw new ReferenceError("No valid pooling type! Type: " + this.poolingType);
        }
        this.activation = this.squash(this.state, false) * this.mask;
        if (this.poolingType === NodeType_1.PoolNodeType.AVG_POOLING) {
            this.derivativeState = this.squash(this.state, true);
        }
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
        this.errorResponsibility = this.errorProjected = Utils_1.sum(connectionsStates) * this.derivativeState;
        if (this.poolingType === NodeType_1.PoolNodeType.AVG_POOLING) {
            this.incoming.forEach(connection => {
                var _a, _b;
                // calculate gradient
                let gradient = this.errorProjected * connection.eligibility;
                connection.xTrace.forEach((value, key) => {
                    gradient += key.errorResponsibility * value;
                });
                connection.deltaWeightsTotal += ((_a = options.rate) !== null && _a !== void 0 ? _a : 0.3) * gradient * this.mask;
                if (options.update) {
                    connection.deltaWeightsTotal += ((_b = options.momentum) !== null && _b !== void 0 ? _b : 0) * connection.deltaWeightsPrevious;
                    connection.weight += connection.deltaWeightsTotal;
                    connection.deltaWeightsPrevious = connection.deltaWeightsTotal;
                    connection.deltaWeightsTotal = 0;
                }
            });
        }
        else {
            // TODO: don't think that this is correct
            // Passing only the connections that were used for getting the min or max
            this.incoming.forEach(conn => {
                conn.weight = this.receivingNode === conn.from ? 1 : 0;
                conn.gain = this.receivingNode === conn.from ? 1 : 0;
            });
        }
    }
    /**
     * Convert this node into a json object.
     *
     * @returns the json object representing this node
     */
    toJSON() {
        return Object.assign(super.toJSON(), {
            poolType: this.poolingType
        });
    }
}
exports.PoolNode = PoolNode;
