import {ModBiasMutation} from "../methods/Mutation";
import {Activation, ActivationType, ALL_ACTIVATIONS, LogisticActivation} from "../methods/Activation";
import {Connection} from "./Connection";
import {anyMatch, getOrDefault, pickRandom, randDouble, removeFromArray} from "../methods/Utils";

/**
 * Creates a new neuron/node
 *
 * Neurons are the basic unit of the neural network. They can be connected together, or used to gate connections between other neurons. A Neuron can perform basically 4 operations: form connections, gate connections, activate and [propagate](https://www.youtube.com/watch?v=Ilg3gGewQ5U).
 *
 * For more information check:
 * - [here](https://becominghuman.ai/what-is-an-artificial-neuron-8b2e421ce42e)
 * - [here](https://en.wikipedia.org/wiki/Artificial_neuron)
 * - [here](https://wagenaartje.github.io/neataptic/docs/architecture/node/)
 * - [here](https://github.com/cazala/synaptic/wiki/Neural-Networks-101)
 * - [here](https://keras.io/backend/#bias_add)
 *
 * @param type defines the type of node
 *
 * @prop {number} bias Neuron's bias [here](https://becominghuman.ai/what-is-an-artificial-neuron-8b2e421ce42e)
 * @prop {activation} squash [Activation function](https://medium.com/the-theory-of-everything/understanding-activation-functions-in-neural-networks-9491262884e0)
 * @prop {string} type
 * @prop {number} activation Output value
 * @prop {number} state
 * @prop {number} old
 * @prop {number} mask=1 Used for dropout. This is either 0 (ignored) or 1 (included) during training and is used to avoid [overfit](https://www.kdnuggets.com/2015/04/preventing-overfitting-neural-networks.html).
 * @prop {number} previousDeltaBias
 * @prop {number} totalDeltaBias
 * @prop {Array<Connection>} incoming Incoming connections to this node
 * @prop {Array<Connection>} outgoing Outgoing connections from this node
 * @prop {Array<Connection>} gated Connections this node gates
 * @prop {Connection} connections_self A self-connection
 * @prop {number} error.responsibility
 * @prop {number} error.projected
 * @prop {number} error.gated
 *
 * @example
 * let { Node } = require("@liquid-carrot/carrot");
 *
 * let node = new Node();
 */
export class Node {
    public type: NodeType;
    public mask: number;
    public incoming: Connection[];
    public outgoing: Connection[];
    public gated: Connection[];
    public selfConnection: Connection;
    public bias: number;
    public squash: Activation;
    public index: number;
    public derivative: number | undefined;
    public deltaBiasPrevious: number;
    public deltaBiasTotal: number;
    public activation: number;
    public state: number;
    public old: number;
    public errorResponsibility: number;
    public errorProjected: number;
    public errorGated: number;

    constructor(type: NodeType = NodeType.HIDDEN) {
        this.type = type;
        this.bias = randDouble(-1, 1);
        this.squash = new LogisticActivation();
        this.activation = 0;
        this.state = 0;
        this.old = 0;
        this.mask = 1;
        this.deltaBiasPrevious = 0;
        this.deltaBiasTotal = 0;
        this.incoming = [];
        this.outgoing = [];
        this.gated = [];
        this.selfConnection = new Connection(this, this, 0);
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
     * @returns A reconstructed node
     *
     * @example <caption>From Node.toJSON()</caption>
     * const { Node } = require("@liquid-carrot/carrot");
     *
     * let otherNode = new Node();
     * let json = otherNode.toJSON();
     * let node = Node.fromJSON(json);
     *
     * console.log(node);
     */
    public static fromJSON(json: NodeJSON): Node {
        const node: Node = new Node();
        node.bias = json.bias;
        node.type = json.type as NodeType;
        node.squash = Activation.getActivation(json.squash);
        node.mask = json.mask;
        node.index = json.index;

        return node;
    }

    /**
     * Clears this node's state information - _i.e. resets node and its connections to "factory settings"_
     *
     * `node.clear()` is useful for predicting time series.
     *
     * @example
     * const { Node } = require("@liquid-carrot/carrot");
     *
     * let node = new Node();
     *
     * node.activate([1, 0]);
     * node.propagate([1]);
     *
     * console.log(node); // Node has state information (e.g. `node.derivative`)
     *
     * node.clear(); // Factory resets node
     *
     * console.log(node); // Node has no state information
     */
    public clear(): void {
        for (const connection of this.incoming) {
            connection.eligibility = 0;
            connection.xTraceNodes = [];
            connection.xTraceValues = [];
        }

        for (const connection of this.gated) {
            connection.gain = 0;
        }

        this.errorResponsibility = this.errorProjected = this.errorGated = 0;
        this.old = this.state = this.activation = 0;
    }

    /**
     * Mutates the node's bias
     *
     * @param method The method is needed for the min and max value of the node's bias otherwise a range of [-1,1] is chosen
     *
     * @example
     * const { Node } = require("@liquid-carrot/carrot");
     *
     * let node = new Node();
     *
     * console.log(node);
     *
     * node.mutateBias(); // Changes node's bias
     */
    public mutateBias(method: ModBiasMutation = new ModBiasMutation()): void {
        this.bias += randDouble(method.min, method.max); // add a random value in range [min,max)
    }

    /**
     * Mutates the node's activation function
     *
     * @example
     * const { Node } = require("@liquid-carrot/carrot");
     *
     * let node = new Node();
     *
     * console.log(node);
     *
     * node.mutateBias(); // Changes node's activation function
     */
    public mutateActivation(allowedActivations: ActivationType[] = ALL_ACTIVATIONS): void {
        // pick a random activation from allowed activations except the current activation
        const possible: ActivationType[] = allowedActivations.filter(activation => activation !== this.squash.type);
        if (possible.length > 0) {
            const newActivationType: ActivationType = pickRandom(possible);
            this.squash = Activation.getActivation(newActivationType);
        }
    }

    /**
     * Checks if the given node(s) are have outgoing connections to this node
     *
     * @param node Checks if `node(s)` have outgoing connections into this node
     *
     * @return Returns true, if every node(s) has an outgoing connection into this node
     *
     * @example <caption>Check one <code>node</code></caption>
     * const { Node } = require("@liquid-carrot/carrot");
     *
     * let otherNode = new Node();
     * let node = new Node();
     * otherNode.connect(node);
     *
     * console.log(node.isProjectedBy(otherNode)); // true
     *
     * @example <caption>Check many <code>nodes</code></caption>
     * const { Node } = require("@liquid-carrot/carrot");
     *
     * let otherNodes = Array.from({ length: 5 }, () => new Node());
     * let node = new Node();
     *
     * otherNodes.forEach(otherNode => otherNode.connect(node));
     *
     * console.log(node.isProjectedBy(otherNodes)); // true
     */
    public isProjectedBy(node: Node): boolean {
        if (node === this) { // self connection
            return this.selfConnection.weight !== 0; // is projected, if weight of self connection is unequal 0
        } else {
            return anyMatch(this.incoming.map(conn => conn.from), node); // check every incoming connection for node
        }
    }

    /**
     * Checks if this node has an outgoing connection(s) into the given node(s)
     *
     * @param node Checks if this node has outgoing connection(s) into `node(s)`
     *
     * @returns Returns true, if this node has an outgoing connection into every node(s)
     *
     * @example <caption>Check one <code>node</code></caption>
     * const { Node } = require("@liquid-carrot/carrot");
     *
     * let otherNode = new Node();
     * let node = new Node();
     * node.connect(otherNode);
     *
     * console.log(node.isProjectingTo(otherNode)); // true
     *
     * @example <caption>Check many <code>nodes</code></caption>
     * const { Node } = require("@liquid-carrot/carrot");
     *
     * let otherNodes = Array.from({ length: 5 }, () => new Node());
     * let node = new Node();
     *
     * otherNodes.forEach(otherNode => node.connect(otherNode));
     *
     * console.log(node.isProjectingTo(otherNodes)); // true
     */
    public isProjectingTo(node: Node): boolean {
        if (node === this) { // self connection
            return this.selfConnection.weight !== 0; // is projected, if weight of self connection is unequal 0
        } else {
            return anyMatch(this.outgoing.map(conn => conn.to), node); // check every outgoing connection for node
        }
    }

    /**
     * This node gates (influences) the given connection
     *
     * @param connection Connection to be gated (influenced) by a neuron
     *
     * @example <caption>Gate one <code>connection</code></caption>
     * const { Node } = require("@liquid-carrot/carrot");
     *
     * let input = new Node();
     * let output = new Node();
     * let connection = input.connect(output);
     *
     * let node = new Node();
     *
     * console.log(connection.gateNode === node); // false
     *
     * node.gate(connection); // Node now gates (manipulates) `connection`
     *
     * console.log(connection.gateNode === node); // true
     */
    public addGate(connection: Connection): void {
        this.gated.push(connection);
        connection.gateNode = this;
    }

    /**
     * Stops this node from gating (manipulating) the given connection(s)
     *
     * @param  connection Connections to ungate - _i.e. remove this node from_
     *
     * @example <caption>Ungate one <code>connection</code></caption>
     * const { Node } = require("@liquid-carrot/carrot");
     *
     * let input = new Node();
     * let output = new Node();
     * let connection = input.connect(output);
     *
     * let node = new Node();
     *
     * console.log(connection.gateNode === node); // false
     *
     * node.addGate(connection); // Node now gates (manipulates) `connection`
     *
     * console.log(connection.gateNode === node); // true
     *
     * node.removeGate(connection); // Node is removed from `connection`
     *
     * console.log(connection.gateNode === node); // false
     */
    public removeGate(connection: Connection): void {
        removeFromArray(this.gated, connection);
        connection.gateNode = null;
        connection.gain = 1;
    }

    /**
     * Connects this node to the given node(s)
     *
     * @param target Node(s) to project connection(s) to
     * @param weight Initial connection(s) [weight](https://en.wikipedia.org/wiki/Synaptic_weight)
     * @param twoSided If `true` connect nodes to each other
     *
     * @example <caption>Connecting node (neuron) to another node (neuron)</caption>
     * const { Node } = require("@liquid-carrot/carrot");
     *
     * let node = new Node();
     * let otherNode = new Node();
     *
     * let connection = node.connect(otherNode); // Both nodes now share a connection
     *
     * console.log(connection); // Connection { from: [Object object], to: [Object object], ...}
     *
     *
     * @example <caption>Connecting a node (neuron) to itself</caption>
     * const { Node } = require("@liquid-carrot/carrot");
     *
     * let node = new Node();
     *
     * let connection = node.connect(node); // Node is connected to itself.
     *
     * console.log(connection); // Connection { from: [Object object], to: [Object object], ...}
     */
    public connect(target: Node, weight: number = 1, twoSided: boolean = false): Connection {
        if (target === this) { // self connection
            this.selfConnection.weight = weight;
            return this.selfConnection;
        } else if (this.isProjectingTo(target)) {
            throw new ReferenceError(); // already connected
        } else {
            const connection: Connection = new Connection(this, target, weight); // create new connection

            // add it to the arrays
            this.outgoing.push(connection);
            target.incoming.push(connection);

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
     *
     * @example <caption>Disconnect from one <code>node</code></caption>
     * const { Node } = require("@liquid-carrot/carrot");
     *
     * let node = new Node();
     * let other = new Node();
     *
     * node.connect(other); // `node` now connected to `other`
     *
     * console.log(node.incoming.length); // 0
     * console.log(node.outgoing.length); // 1
     *
     * node.disconnect(other); // `node` is now disconnected from `other`
     *
     * console.log(node.incoming.length); // 0
     * console.log(node.outgoing.length); // 0
     *
     * @example <caption>Connect to one <code>node</code> - <em>two-sided</em></caption>
     * const { Node } = require("@liquid-carrot/carrot");
     *
     * let node = new Node();
     * let other = new Node();
     *
     * // `node` & `other` are now connected to each other
     * node.connect(other, true);
     *
     * console.log(node.incoming.length); // 1
     * console.log(node.outgoing.length); // 1
     *
     * // `node` & `other` are now disconnected from each other
     * node.disconnect(other, true);
     *
     * console.log(node.incoming.length); // 0
     * console.log(node.outgoing.length); // 0
     */
    public disconnect(node: Node, twoSided: boolean = false): Connection {
        if (node === this) { // self connection
            this.selfConnection.weight = 0; // set weight to 0
            return this.selfConnection;
        }

        const connections: Connection[] = this.outgoing.filter(conn => conn.to === node);

        if (connections.length === 0) {
            throw new Error("No Connection found");
        }
        const connection: Connection = connections[0];

        // remove it from the arrays
        removeFromArray(this.outgoing, connection);
        removeFromArray(connection.to.incoming, connection);

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
     * @param [options.rate=0.3] [Learning rate](https://towardsdatascience.com/understanding-learning-rates-and-how-it-improves-performance-in-deep-learning-d0d4059c1c10)
     * @param [options.momentum=0] [Momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html) adds a fraction of the previous weight update to the current one.
     * @param [options.update=true] When set to false weights won't update, but when set to true after being false the last propagation will include the deltaweights of the first "update:false" propagations too.
     *
     * @example
     * let { Node } = require("@liquid-carrot/carrot");
     *
     * let A = new Node();
     * let B = new Node('output');
     * A.connect(B);
     *
     * let learningRate = .3;
     * let momentum = 0;
     *
     * for(let i = 0; i < 20000; i++)
     * {
     *   // when A activates 1
     *   A.activate(1);
     *
     *   // train B to activate 0
     *   B.activate();
     *   B.propagate(learningRate, momentum, true, 0);
     * }
     *
     * // test it
     * A.activate(1);
     * B.activate(); // 0.006540565760853365
     *
     * @see [Regularization Neataptic](https://wagenaartje.github.io/neataptic/docs/methods/regularization/)
     * @see [What is backpropagation | YouTube](https://www.youtube.com/watch?v=Ilg3gGewQ5U)
     */
    public propagate(target: number | undefined, options: { momentum?: number, rate?: number, update?: boolean }): { responsibility: number, projected: number, gated: number } {
        options.momentum = getOrDefault(options.momentum, 0);
        options.rate = getOrDefault(options.rate, 0.3);
        options.update = getOrDefault(options.update, true);

        if (target !== undefined && Number.isFinite(target)) {
            this.errorResponsibility = this.errorProjected = target - this.activation;
        } else {
            this.errorProjected = 0;
            for (const connection of this.outgoing) {
                this.errorProjected += connection.to.errorResponsibility * connection.weight * connection.gain;
            }
            this.errorProjected *= this.derivative ?? 1;


            this.errorGated = 0;
            for (const connection of this.gated) { // for all connections gated by this node
                let influence: number;
                if (connection.to.selfConnection.gateNode === this) { // self connection is gated with this node
                    influence = connection.to.old + connection.weight * connection.from.activation;
                } else {
                    influence = connection.weight * connection.from.activation;
                }

                this.errorGated += connection.to.errorResponsibility * influence;
            }
            this.errorGated *= this.derivative ?? 1;


            this.errorResponsibility = this.errorProjected + this.errorGated;
        }


        for (const connection of this.incoming) {
            // calculate gradient
            let gradient: number = this.errorProjected * connection.eligibility;
            for (let j: number = 0; j < connection.xTraceNodes.length; j++) {
                const node: Node = connection.xTraceNodes[j];
                gradient += node.errorResponsibility * connection.xTraceValues[j];
            }


            connection.deltaWeightsTotal += options.rate * gradient * this.mask;
            if (options.update) {
                connection.deltaWeightsTotal += options.momentum * connection.deltaWeightsPrevious;
                connection.weight += connection.deltaWeightsTotal;
                connection.deltaWeightsPrevious = connection.deltaWeightsTotal;
                connection.deltaWeightsTotal = 0;
            }
        }


        this.deltaBiasTotal += options.rate * this.errorResponsibility;
        if (options.update) {
            this.deltaBiasTotal += options.momentum * this.deltaBiasPrevious;
            this.bias += this.deltaBiasTotal;
            this.deltaBiasPrevious = this.deltaBiasTotal;
            this.deltaBiasTotal = 0;
        }

        return {
            responsibility: this.errorResponsibility,
            projected: this.errorProjected,
            gated: this.errorGated,
        };
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
     *
     * @example
     * let { Node } = require("@liquid-carrot/carrot");
     *
     * let A = new Node();
     * let B = new Node();
     *
     * A.connect(B);
     * A.activate(0.5); // 0.5
     * B.activate(); // 0.3244554645
     */
    public activate(input: number | null = null, trace: boolean = true): number {
        if (input !== null && Number.isFinite(input)) {
            return this.activation = input;
        }

        if (trace) {
            this.old = this.state;

            this.state = this.selfConnection.gain * this.selfConnection.weight * this.state + this.bias;


            this.incoming.forEach(conn => {
                this.state += conn.from.activation * conn.weight * conn.gain;
            });

            this.activation = this.squash.calc(this.state, false) * this.mask;
            this.derivative = this.squash.calc(this.state, true);


            // store traces
            const nodes: Node[] = [];
            const influences: number[] = [];

            // Adjust 'gain' (to gated connections) & Build traces
            this.gated.forEach(connection => {
                connection.gain = this.activation;

                // Build traces
                const index: number = nodes.indexOf(connection.to);
                if (index > -1) { // Node & influence exist
                    influences[index] += connection.weight * connection.from.activation;
                } else { // Add node & corresponding influence
                    nodes.push(connection.to);
                    if (connection.to.selfConnection.gateNode === this) {
                        influences.push(connection.weight * connection.from.activation + connection.to.old);
                    } else {
                        influences.push(connection.weight * connection.from.activation);
                    }
                }
            });

            // Forwarding 'xTrace' (to incoming connections)
            for (const connection of this.incoming) {
                connection.eligibility = this.selfConnection.gain * this.selfConnection.weight * connection.eligibility + connection.from.activation * connection.gain;

                for (let i: number = 0; i < nodes.length; i++) {
                    const node: Node = nodes[i];
                    const influence: number = influences[i];

                    const index: number = connection.xTraceNodes.indexOf(node);

                    if (index > -1) {
                        connection.xTraceValues[index] = node.selfConnection.gain * node.selfConnection.weight * connection.xTraceValues[index] + this.derivative * connection.eligibility * influence;
                    } else {
                        connection.xTraceNodes.push(node);
                        connection.xTraceValues.push(this.derivative * connection.eligibility * influence);
                    }
                }
            }

            return this.activation;
        } else {
            if (this.isInputNode()) return this.activation = 0;

            this.state = this.selfConnection.gain * this.selfConnection.weight * this.state + this.bias;


            for (const connection of this.incoming) {
                this.state += connection.from.activation * connection.weight * connection.gain;
            }

            this.activation = this.squash.calc(this.state, false);

            // Adjust gain
            for (const connection of this.gated) {
                connection.gain = this.activation;
            }

            return this.activation;
        }
    }

    /**
     * Converts the node to a json object that can later be converted back
     *
     * @returns A node representing json object
     *
     * @example
     * const { Node } = require("@liquid-carrot/carrot");
     *
     * let node = new Node();
     *
     * console.log(node.toJSON());
     */
    public toJSON(): NodeJSON {
        return {
            bias: this.bias,
            type: this.type,
            squash: this.squash.type,
            mask: this.mask,
            index: this.index
        };
    }

    public isInputNode(): boolean {
        return this.type === NodeType.INPUT;
    }

    public isHiddenNode(): boolean {
        return this.type === NodeType.HIDDEN;
    }

    public isOutputNode(): boolean {
        return this.type === NodeType.OUTPUT;
    }
}

export interface NodeJSON {
    bias: number;
    type: number;
    squash: ActivationType;
    mask: number;
    index: number;
}

export enum NodeType {
    INPUT, HIDDEN, OUTPUT
}
