"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
var src_1 = require("activations/build/src");
var NodeType_1 = require("../enums/NodeType");
var Mutation_1 = require("../methods/Mutation");
var Utils_1 = require("../utils/Utils");
var Connection_1 = require("./Connection");
/**
 * Creates a new neuron/node
 *
 * Neurons are the basic unit of the neural network. They can be connected together, or used to gate connections between other neurons. A Neuron can perform basically 4 operations: form connections, gate connections, activate and [propagate](https://www.youtube.com/watch?v=Ilg3gGewQ5U).
 *
 * For more information check:
 * - [BecomingHuman](https://becominghuman.ai/what-is-an-artificial-neuron-8b2e421ce42e)
 * - [Wikipedia](https://en.wikipedia.org/wiki/Artificial_neuron)
 * - [Neataptic](https://wagenaartje.github.io/neataptic/docs/architecture/node/)
 * - [Synaptic](https://github.com/cazala/synaptic/wiki/Neural-Networks-101)
 * - [Keras](https://keras.io/backend/#bias_add)
 */
var Node = /** @class */ (function () {
    function Node(type) {
        if (type === void 0) { type = NodeType_1.NodeType.HIDDEN; }
        this.type = type;
        this.bias = Utils_1.randDouble(-1, 1);
        this.squash = src_1.Logistic;
        this.activation = 0;
        this.derivativeState = 1;
        this.state = 0;
        this.old = 0;
        this.mask = 1;
        this.deltaBiasPrevious = 0;
        this.deltaBiasTotal = 0;
        this.incoming = new Set();
        this.outgoing = new Set();
        this.gated = new Set();
        this.selfConnection = new Connection_1.Connection(this, this, 0);
        this.errorResponsibility = 0;
        this.errorProjected = 0;
        this.errorGated = 0;
        this.index = NaN;
    }
    /**
     * Convert a json object to a node
     *
     * @param json A node represented as a JSON object
     * @time O(1)
     *
     * @returns itself
     */
    Node.prototype.fromJSON = function (json) {
        var _a, _b, _c, _d;
        this.bias = (_a = json.bias) !== null && _a !== void 0 ? _a : Utils_1.randDouble(-1, 1);
        this.type = json.type;
        this.squash = (_b = json.squash) !== null && _b !== void 0 ? _b : src_1.Logistic;
        this.mask = (_c = json.mask) !== null && _c !== void 0 ? _c : 1;
        this.index = (_d = json.index) !== null && _d !== void 0 ? _d : NaN;
        return this;
    };
    /**
     * Clears this node's state information - _i.e. resets node and its connections to "factory settings"_
     *
     * `node.clear()` is useful for predicting time series.
     * @time O(n&sup2;)
     */
    Node.prototype.clear = function () {
        this.incoming.forEach(function (connection) {
            connection.eligibility = 0;
            connection.xTrace.clear();
        });
        this.gated.forEach(function (conn) { return conn.gain = 0; });
        this.errorResponsibility = this.errorProjected = this.errorGated = 0;
        this.old = this.state = this.activation = 0;
    };
    /**
     * Mutates the node's bias
     *
     * @param method The method is needed for the min and max value of the node's bias otherwise a range of [-1,1] is chosen
     * @time O(1)
     */
    Node.prototype.mutateBias = function (method) {
        if (method === void 0) { method = new Mutation_1.ModBiasMutation(); }
        this.bias += Utils_1.randDouble(method.min, method.max); // add a random value in range [min,max)
    };
    /**
     * Mutates the node's activation function
     * @time O(n)
     */
    Node.prototype.mutateActivation = function (allowedActivations) {
        var _this = this;
        if (allowedActivations === void 0) { allowedActivations = Object.values(src_1.ALL_ACTIVATIONS); }
        // pick a random activation from allowed activations except the current activation
        var possible = allowedActivations.filter(function (activation) { return activation !== _this.squash; });
        if (possible.length > 0) {
            this.squash = Utils_1.pickRandom(possible);
        }
    };
    /**
     * Checks if the given node(s) are have outgoing connections to this node
     *
     * @param node Checks if `node(s)` have outgoing connections into this node
     * @time O(n)
     *
     * @return Returns true, if every node(s) has an outgoing connection into this node
     */
    Node.prototype.isProjectedBy = function (node) {
        if (node === this) { // self connection
            return this.selfConnection.weight !== 0; // is projected, if weight of self connection is unequal 0
        }
        else {
            return Array.from(this.incoming).map(function (conn) { return conn.from; }).includes(node); // check every incoming connection for node
        }
    };
    /**
     * Checks if this node has an outgoing connection(s) into the given node(s)
     *
     * @param node Checks if this node has outgoing connection(s) into `node(s)`
     * @time O(n)
     *
     * @returns Returns true, if this node has an outgoing connection into every node(s)
     */
    Node.prototype.isProjectingTo = function (node) {
        if (node === this) { // self connection
            return this.selfConnection.weight !== 0; // is projected, if weight of self connection is unequal 0
        }
        else {
            return Array.from(this.outgoing).map(function (conn) { return conn.to; }).includes(node); // check every outgoing connection for node
        }
    };
    /**
     * This node gates (influences) the given connection
     *
     * @param connection Connection to be gated (influenced) by a neuron
     * @time O(1)
     */
    Node.prototype.addGate = function (connection) {
        this.gated.add(connection);
        connection.gateNode = this;
    };
    /**
     * Stops this node from gating (manipulating) the given connection(s)
     *
     * @param connection Connections to remove gate - _i.e. remove this node from_
     * @time O(1)
     */
    Node.prototype.removeGate = function (connection) {
        this.gated.delete(connection);
        connection.gateNode = null;
        connection.gain = 1;
    };
    /**
     * Connects this node to the given node(s)
     *
     * @param target Node(s) to project connection(s) to
     * @param weight Initial connection(s) [weight](https://en.wikipedia.org/wiki/Synaptic_weight)
     * @param twoSided If `true` connect nodes to each other
     * @time O(n)
     */
    Node.prototype.connect = function (target, weight, twoSided) {
        if (weight === void 0) { weight = 1; }
        if (twoSided === void 0) { twoSided = false; }
        if (target === this) { // self connection
            this.selfConnection.weight = weight;
            return this.selfConnection;
        }
        else if (this.isProjectingTo(target)) {
            throw new ReferenceError("Their is already a connection!"); // already connected
        }
        else {
            var connection = new Connection_1.Connection(this, target, weight); // create new connection
            // add it to the arrays
            this.outgoing.add(connection);
            target.incoming.add(connection);
            if (twoSided) {
                target.connect(this); // connect in the other direction
            }
            return connection;
        }
    };
    /**
     * Disconnects this node from the given node(s)
     *
     * @param node Node(s) to remove connection(s) to
     * @param twoSided=false If `true` disconnects nodes from each other (i.e. both sides)
     * @time O(n)
     */
    Node.prototype.disconnect = function (node, twoSided) {
        if (twoSided === void 0) { twoSided = false; }
        if (node === this) { // self connection
            this.selfConnection.weight = 0; // set weight to 0
            return this.selfConnection;
        }
        var connections = Array.from(this.outgoing).filter(function (conn) { return conn.to === node; });
        if (connections.length === 0) {
            throw new Error("No Connection found");
        }
        var connection = connections[0];
        // remove it from the arrays
        this.outgoing.delete(connection);
        connection.to.incoming.delete(connection);
        if (connection.gateNode !== undefined && connection.gateNode != null) {
            connection.gateNode.removeGate(connection); // if connection is gated -> remove gate
        }
        if (twoSided) {
            node.disconnect(this); // disconnect the other direction
        }
        return connection;
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
     * @time O(n&sup2;)
     *
     * @see [Regularization Neataptic](https://wagenaartje.github.io/neataptic/docs/methods/regularization/)
     * @see [What is backpropagation | YouTube](https://www.youtube.com/watch?v=Ilg3gGewQ5U)
     */
    Node.prototype.propagate = function (target, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        options.momentum = Utils_1.getOrDefault(options.momentum, 0);
        options.rate = Utils_1.getOrDefault(options.rate, 0.3);
        options.update = Utils_1.getOrDefault(options.update, true);
        if (target !== undefined && Number.isFinite(target)) {
            this.errorResponsibility = this.errorProjected = target - this.activation;
        }
        else {
            this.errorProjected = 0;
            this.outgoing.forEach(function (connection) {
                _this.errorProjected += connection.to.errorResponsibility * connection.weight * connection.gain;
            });
            this.errorProjected *= this.derivativeState;
            this.errorGated = 0;
            this.gated.forEach(function (connection) {
                var influence;
                if (connection.to.selfConnection.gateNode === _this) { // self connection is gated with this node
                    influence = connection.to.old + connection.weight * connection.from.activation;
                }
                else {
                    influence = connection.weight * connection.from.activation;
                }
                _this.errorGated += connection.to.errorResponsibility * influence;
            });
            this.errorGated *= this.derivativeState;
            this.errorResponsibility = this.errorProjected + this.errorGated;
        }
        this.incoming.forEach(function (connection) {
            var _a, _b;
            // calculate gradient
            var gradient = _this.errorProjected * connection.eligibility;
            connection.xTrace.forEach(function (value, key) { return gradient += key.errorResponsibility * value; });
            connection.deltaWeightsTotal += ((_a = options.rate) !== null && _a !== void 0 ? _a : 0.3) * gradient * _this.mask;
            if (options.update) {
                connection.deltaWeightsTotal += ((_b = options.momentum) !== null && _b !== void 0 ? _b : 0) * connection.deltaWeightsPrevious;
                connection.weight += connection.deltaWeightsTotal;
                connection.deltaWeightsPrevious = connection.deltaWeightsTotal;
                connection.deltaWeightsTotal = 0;
            }
        });
        this.deltaBiasTotal += options.rate * this.errorResponsibility;
        if (options.update) {
            this.deltaBiasTotal += options.momentum * this.deltaBiasPrevious;
            this.bias += this.deltaBiasTotal;
            this.deltaBiasPrevious = this.deltaBiasTotal;
            this.deltaBiasTotal = 0;
        }
    };
    /**
     * Actives the node.
     *
     * When a neuron activates, it computes its state from all its input connections and 'squashes' it using its activation function, and returns the output (activation).
     *
     * You can also provide the activation (a float between 0 and 1) as a parameter, which is useful for neurons in the input layer.
     *
     * @param [input] Environment signal (i.e. optional numerical value passed to the network as input)  - _should only be passed in input neurons_
     * @param [trace] Controls whether traces are created when activation happens (a trace is meta information left behind for different uses, e.g. backpropagation).
     * @time O(n&sup2;)
     *
     * @returns A neuron's ['Squashed'](https://medium.com/the-theory-of-everything/understanding-activation-functions-in-neural-networks-9491262884e0) output value
     */
    Node.prototype.activate = function (input, trace) {
        var _this = this;
        if (trace === void 0) { trace = true; }
        if (input !== undefined) {
            return this.activation = input;
        }
        else if (this.isInputNode()) {
            throw new ReferenceError("There is no input given to an input node!");
        }
        if (trace) {
            this.old = this.state;
            this.state = this.selfConnection.gain * this.selfConnection.weight * this.state + this.bias;
            this.incoming.forEach(function (conn) {
                _this.state += conn.from.activation * conn.weight * conn.gain;
            });
            this.activation = this.squash(this.state, false) * this.mask;
            this.derivativeState = this.squash(this.state, true);
            // store traces
            var nodes_1 = [];
            var influences_1 = [];
            // Adjust 'gain' (to gated connections) & Build traces
            this.gated.forEach(function (connection) {
                connection.gain = _this.activation;
                // Build traces
                var index = nodes_1.indexOf(connection.to);
                if (index > -1) { // Node & influence exist
                    influences_1[index] += connection.weight * connection.from.activation;
                }
                else { // Add node & corresponding influence
                    nodes_1.push(connection.to);
                    if (connection.to.selfConnection.gateNode === _this) {
                        influences_1.push(connection.weight * connection.from.activation + connection.to.old);
                    }
                    else {
                        influences_1.push(connection.weight * connection.from.activation);
                    }
                }
            });
            // Forwarding 'xTrace' (to incoming connections)
            this.incoming.forEach(function (connection) {
                var _a;
                connection.eligibility = _this.selfConnection.gain * _this.selfConnection.weight * connection.eligibility + connection.from.activation * connection.gain;
                for (var i = 0; i < nodes_1.length; i++) {
                    var node = nodes_1[i];
                    var influence = influences_1[i];
                    if (connection.xTrace.has(node)) {
                        connection.xTrace.set(node, node.selfConnection.gain * node.selfConnection.weight * ((_a = connection.xTrace.get(node)) !== null && _a !== void 0 ? _a : 0) + _this.derivativeState * connection.eligibility * influence);
                    }
                    else {
                        connection.xTrace.set(node, _this.derivativeState * connection.eligibility * influence);
                    }
                }
            });
            return this.activation;
        }
        else {
            if (this.isInputNode())
                return this.activation = 0;
            this.state = this.selfConnection.gain * this.selfConnection.weight * this.state + this.bias;
            this.incoming.forEach(function (connection) { return _this.state += connection.from.activation * connection.weight * connection.gain; });
            this.activation = this.squash(this.state, false);
            // Adjust gain
            this.gated.forEach(function (connection) { return connection.gain = _this.activation; });
            return this.activation;
        }
    };
    /**
     * Converts the node to a json object that can later be converted back
     *
     * @time O(1)
     * @returns A node representing json object
     */
    Node.prototype.toJSON = function () {
        return {
            bias: this.bias,
            type: this.type,
            squash: this.squash,
            mask: this.mask,
            index: this.index
        };
    };
    /**
     * Is this a input Node?
     * @time O(1)
     */
    Node.prototype.isInputNode = function () {
        return this.type === NodeType_1.NodeType.INPUT;
    };
    /**
     * Is this a hidden Node?
     * @time O(1)
     */
    Node.prototype.isHiddenNode = function () {
        return this.type === NodeType_1.NodeType.HIDDEN;
    };
    /**
     * Is this a output Node?
     * @time O(1)
     */
    Node.prototype.isOutputNode = function () {
        return this.type === NodeType_1.NodeType.OUTPUT;
    };
    /**
     * Set bias.
     *
     * @param bias the new bias value
     * @time O(1)
     */
    Node.prototype.setBias = function (bias) {
        this.bias = bias;
        return this;
    };
    /**
     * Set activation type
     *
     * @param activation the new activation type
     * @time O(1)
     */
    Node.prototype.setActivationType = function (activation) {
        this.squash = activation;
        return this;
    };
    return Node;
}());
exports.Node = Node;
