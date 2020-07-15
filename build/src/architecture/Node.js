"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const src_1 = require("activations/build/src");
const NodeType_1 = require("../enums/NodeType");
const Mutation_1 = require("../methods/Mutation");
const Utils_1 = require("../utils/Utils");
const Connection_1 = require("./Connection");
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
class Node {
    constructor(type = NodeType_1.NodeType.HIDDEN) {
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
     *
     * @returns itself
     */
    fromJSON(json) {
        var _a, _b, _c, _d;
        this.bias = (_a = json.bias) !== null && _a !== void 0 ? _a : Utils_1.randDouble(-1, 1);
        this.type = json.type;
        this.squash = (_b = json.squash) !== null && _b !== void 0 ? _b : src_1.Logistic;
        this.mask = (_c = json.mask) !== null && _c !== void 0 ? _c : 1;
        this.index = (_d = json.index) !== null && _d !== void 0 ? _d : NaN;
        return this;
    }
    /**
     * Clears this node's state information - _i.e. resets node and its connections to "factory settings"_
     *
     * `node.clear()` is useful for predicting time series.
     */
    clear() {
        this.incoming.forEach(connection => {
            connection.eligibility = 0;
            connection.xTrace.clear();
        });
        this.gated.forEach(conn => conn.gain = 0);
        this.errorResponsibility = this.errorProjected = this.errorGated = 0;
        this.old = this.state = this.activation = 0;
    }
    /**
     * Mutates the node's bias
     *
     * @param method The method is needed for the min and max value of the node's bias otherwise a range of [-1,1] is chosen
     */
    mutateBias(method = new Mutation_1.ModBiasMutation()) {
        this.bias += Utils_1.randDouble(method.min, method.max); // add a random value in range [min,max)
    }
    /**
     * Mutates the node's activation function
     */
    mutateActivation(allowedActivations = Object.values(src_1.ALL_ACTIVATIONS)) {
        // pick a random activation from allowed activations except the current activation
        const possible = allowedActivations.filter(activation => activation !== this.squash);
        if (possible.length > 0) {
            this.squash = Utils_1.pickRandom(possible);
        }
    }
    /**
     * Checks if the given node(s) are have outgoing connections to this node
     *
     * @param node Checks if `node(s)` have outgoing connections into this node
     *
     * @return Returns true, if every node(s) has an outgoing connection into this node
     */
    isProjectedBy(node) {
        if (node === this) { // self connection
            return this.selfConnection.weight !== 0; // is projected, if weight of self connection is unequal 0
        }
        else {
            return Array.from(this.incoming).map(conn => conn.from).includes(node); // check every incoming connection for node
        }
    }
    /**
     * Checks if this node has an outgoing connection(s) into the given node(s)
     *
     * @param node Checks if this node has outgoing connection(s) into `node(s)`
     *
     * @returns Returns true, if this node has an outgoing connection into every node(s)
     */
    isProjectingTo(node) {
        if (node === this) { // self connection
            return this.selfConnection.weight !== 0; // is projected, if weight of self connection is unequal 0
        }
        else {
            return Array.from(this.outgoing).map(conn => conn.to).includes(node); // check every outgoing connection for node
        }
    }
    /**
     * This node gates (influences) the given connection
     *
     * @param connection Connection to be gated (influenced) by a neuron
     */
    addGate(connection) {
        this.gated.add(connection);
        connection.gateNode = this;
    }
    /**
     * Stops this node from gating (manipulating) the given connection(s)
     *
     * @param connection Connections to remove gate - _i.e. remove this node from_
     */
    removeGate(connection) {
        this.gated.delete(connection);
        connection.gateNode = null;
        connection.gain = 1;
    }
    /**
     * Connects this node to the given node(s)
     *
     * @param target Node(s) to project connection(s) to
     * @param weight Initial connection(s) [weight](https://en.wikipedia.org/wiki/Synaptic_weight)
     * @param twoSided If `true` connect nodes to each other
     */
    connect(target, weight = 1, twoSided = false) {
        if (target === this) { // self connection
            this.selfConnection.weight = weight;
            return this.selfConnection;
        }
        else if (this.isProjectingTo(target)) {
            throw new ReferenceError("Their is already a connection!"); // already connected
        }
        else {
            const connection = new Connection_1.Connection(this, target, weight); // create new connection
            // add it to the arrays
            this.outgoing.add(connection);
            target.incoming.add(connection);
            if (twoSided) {
                target.connect(this); // connect in the other direction
            }
            return connection;
        }
    }
    /**
     * Disconnects this node from the given node(s)
     *
     * @param node Node(s) to remove connection(s) to
     * @param twoSided=false If `true` disconnects nodes from each other (i.e. both sides)
     */
    disconnect(node, twoSided = false) {
        if (node === this) { // self connection
            this.selfConnection.weight = 0; // set weight to 0
            return this.selfConnection;
        }
        const connections = Array.from(this.outgoing).filter(conn => conn.to === node);
        if (connections.length === 0) {
            throw new Error("No Connection found");
        }
        const connection = connections[0];
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
     *
     * @see [Regularization Neataptic](https://wagenaartje.github.io/neataptic/docs/methods/regularization/)
     * @see [What is backpropagation | YouTube](https://www.youtube.com/watch?v=Ilg3gGewQ5U)
     */
    propagate(target, options = {}) {
        var _a, _b, _c;
        options.momentum = (_a = options.momentum) !== null && _a !== void 0 ? _a : 0;
        options.rate = (_b = options.rate) !== null && _b !== void 0 ? _b : 0.3;
        options.update = (_c = options.update) !== null && _c !== void 0 ? _c : true;
        if (target !== undefined && Number.isFinite(target)) {
            this.errorResponsibility = this.errorProjected = target - this.activation;
        }
        else {
            this.errorProjected = 0;
            this.outgoing.forEach(connection => {
                this.errorProjected += connection.to.errorResponsibility * connection.weight * connection.gain;
            });
            this.errorProjected *= this.derivativeState;
            this.errorGated = 0;
            this.gated.forEach(connection => {
                let influence;
                if (connection.to.selfConnection.gateNode === this) { // self connection is gated with this node
                    influence = connection.to.old + connection.weight * connection.from.activation;
                }
                else {
                    influence = connection.weight * connection.from.activation;
                }
                this.errorGated += connection.to.errorResponsibility * influence;
            });
            this.errorGated *= this.derivativeState;
            this.errorResponsibility = this.errorProjected + this.errorGated;
        }
        this.incoming.forEach(connection => {
            var _a, _b;
            // calculate gradient
            let gradient = this.errorProjected * connection.eligibility;
            connection.xTrace.forEach((value, key) => gradient += key.errorResponsibility * value);
            connection.deltaWeightsTotal += ((_a = options.rate) !== null && _a !== void 0 ? _a : 0.3) * gradient * this.mask;
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
    }
    /**
     * Actives the node.
     *
     * When a neuron activates, it computes its state from all its input connections and 'squashes' it using its activation function, and returns the output (activation).
     *
     * You can also provide the activation (a float between 0 and 1) as a parameter, which is useful for neurons in the input layer.
     *
     * @param [input] Environment signal (i.e. optional numerical value passed to the network as input)  - _should only be passed in input neurons_
     * @param [trace] Controls whether traces are created when activation happens (a trace is meta information left behind for different uses, e.g. backpropagation).
     *
     * @returns A neuron's ['Squashed'](https://medium.com/the-theory-of-everything/understanding-activation-functions-in-neural-networks-9491262884e0) output value
     */
    activate(input, trace = true) {
        if (input !== undefined) {
            return this.activation = input;
        }
        else if (this.isInputNode()) {
            throw new ReferenceError("There is no input given to an input node!");
        }
        if (trace) {
            this.old = this.state;
            this.state = this.selfConnection.gain * this.selfConnection.weight * this.state + this.bias;
            this.incoming.forEach(conn => {
                this.state += conn.from.activation * conn.weight * conn.gain;
            });
            this.activation = this.squash(this.state, false) * this.mask;
            this.derivativeState = this.squash(this.state, true);
            // store traces
            const nodes = [];
            const influences = [];
            // Adjust 'gain' (to gated connections) & Build traces
            this.gated.forEach(connection => {
                connection.gain = this.activation;
                // Build traces
                const index = nodes.indexOf(connection.to);
                if (index > -1) { // Node & influence exist
                    influences[index] += connection.weight * connection.from.activation;
                }
                else { // Add node & corresponding influence
                    nodes.push(connection.to);
                    if (connection.to.selfConnection.gateNode === this) {
                        influences.push(connection.weight * connection.from.activation + connection.to.old);
                    }
                    else {
                        influences.push(connection.weight * connection.from.activation);
                    }
                }
            });
            // Forwarding 'xTrace' (to incoming connections)
            this.incoming.forEach(connection => {
                var _a;
                connection.eligibility = this.selfConnection.gain * this.selfConnection.weight * connection.eligibility + connection.from.activation * connection.gain;
                for (let i = 0; i < nodes.length; i++) {
                    const node = nodes[i];
                    const influence = influences[i];
                    if (connection.xTrace.has(node)) {
                        connection.xTrace.set(node, node.selfConnection.gain * node.selfConnection.weight * ((_a = connection.xTrace.get(node)) !== null && _a !== void 0 ? _a : 0) + this.derivativeState * connection.eligibility * influence);
                    }
                    else {
                        connection.xTrace.set(node, this.derivativeState * connection.eligibility * influence);
                    }
                }
            });
            return this.activation;
        }
        else {
            if (this.isInputNode())
                return this.activation = 0;
            this.state = this.selfConnection.gain * this.selfConnection.weight * this.state + this.bias;
            this.incoming.forEach(connection => this.state += connection.from.activation * connection.weight * connection.gain);
            this.activation = this.squash(this.state, false);
            // Adjust gain
            this.gated.forEach(connection => connection.gain = this.activation);
            return this.activation;
        }
    }
    /**
     * Converts the node to a json object that can later be converted back
     *
     * @returns A node representing json object
     */
    toJSON() {
        return {
            bias: this.bias,
            type: this.type,
            squash: this.squash,
            mask: this.mask,
            index: this.index
        };
    }
    /**
     * Is this a input Node?
     */
    isInputNode() {
        return this.type === NodeType_1.NodeType.INPUT;
    }
    /**
     * Is this a hidden Node?
     */
    isHiddenNode() {
        return this.type === NodeType_1.NodeType.HIDDEN;
    }
    /**
     * Is this a output Node?
     */
    isOutputNode() {
        return this.type === NodeType_1.NodeType.OUTPUT;
    }
    /**
     * Set bias.
     *
     * @param bias the new bias value
     */
    setBias(bias) {
        this.bias = bias;
        return this;
    }
    /**
     * Set activation type
     *
     * @param activation the new activation type
     */
    setActivationType(activation) {
        this.squash = activation;
        return this;
    }
}
exports.Node = Node;
