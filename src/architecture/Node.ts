import {ActivationType, ALL_ACTIVATIONS, Logistic} from "activations/build/src";
import {NodeType} from "../enums/NodeType";
import {NodeJSON} from "../interfaces/NodeJSON";
import {ModBiasMutation} from "../methods/Mutation";
import {getOrDefault, pickRandom, randDouble} from "../utils/Utils";
import {Connection} from "./Connection";

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
export class Node {
    /**
     * The type of this node.
     */
    public type: NodeType;
    /**
     * Used for dropout. This is either 0 (ignored) or 1 (included) during training and is used to avoid [overfit](https://www.kdnuggets.com/2015/04/preventing-overfitting-neural-networks.html).
     */
    public mask: number;
    /**
     * Incoming connections to this node
     */
    public incoming: Set<Connection>;
    /**
     * Outgoing connections from this node
     */
    public outgoing: Set<Connection>;
    /**
     * Connections this node gates
     */
    public gated: Set<Connection>;
    /**
     * A self connection
     */
    public selfConnection: Connection;
    /**
     * Neuron's bias [here](https://becominghuman.ai/what-is-an-artificial-neuron-8b2e421ce42e)
     */
    public bias: number;
    /**
     * [Activation function](https://medium.com/the-theory-of-everything/understanding-activation-functions-in-neural-networks-9491262884e0)
     */
    public squash: ActivationType;
    /**
     * index
     */
    public index: number;
    /**
     * derivative state
     */
    public derivativeState: number;
    /**
     * delta bias previous
     */
    public deltaBiasPrevious: number;
    /**
     * delta bias total
     */
    public deltaBiasTotal: number;
    /**
     * Output value
     */
    public activation: number;
    /**
     * state
     */
    public state: number;
    /**
     * old state
     */
    public old: number;
    /**
     * error responsibility
     */
    public errorResponsibility: number;
    /**
     * error projected
     */
    public errorProjected: number;
    /**
     * error gated
     */
    public errorGated: number;

    constructor(type: NodeType = NodeType.HIDDEN) {
        this.type = type;
        this.bias = randDouble(-1, 1);
        this.squash = Logistic;
        this.activation = 0;
        this.derivativeState = 1;
        this.state = 0;
        this.old = 0;
        this.mask = 1;
        this.deltaBiasPrevious = 0;
        this.deltaBiasTotal = 0;
        this.incoming = new Set<Connection>();
        this.outgoing = new Set<Connection>();
        this.gated = new Set<Connection>();
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
     * @returns itself
     */
    public fromJSON(json: NodeJSON): Node {
        this.bias = json.bias ?? randDouble(-1, 1);
        this.type = json.type as NodeType;
        this.squash = json.squash ?? Logistic;
        this.mask = json.mask ?? 1;
        this.index = json.index ?? NaN;
        return this;
    }

    /**
     * Clears this node's state information - _i.e. resets node and its connections to "factory settings"_
     *
     * `node.clear()` is useful for predicting time series.
     */
    public clear(): void {
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
    public mutateBias(method: ModBiasMutation = new ModBiasMutation()): void {
        this.bias += randDouble(method.min, method.max); // add a random value in range [min,max)
    }

    /**
     * Mutates the node's activation function
     */
    public mutateActivation(allowedActivations: ActivationType[] = Object.values(ALL_ACTIVATIONS)): void {
        // pick a random activation from allowed activations except the current activation
        const possible: ActivationType[] = allowedActivations.filter(activation => activation !== this.squash);
        if (possible.length > 0) {
            this.squash = pickRandom(possible);
        }
    }

    /**
     * Checks if the given node(s) are have outgoing connections to this node
     *
     * @param node Checks if `node(s)` have outgoing connections into this node
     *
     * @return Returns true, if every node(s) has an outgoing connection into this node
     */
    public isProjectedBy(node: Node): boolean {
        if (node === this) { // self connection
            return this.selfConnection.weight !== 0; // is projected, if weight of self connection is unequal 0
        } else {
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
    public isProjectingTo(node: Node): boolean {
        if (node === this) { // self connection
            return this.selfConnection.weight !== 0; // is projected, if weight of self connection is unequal 0
        } else {
            return Array.from(this.outgoing).map(conn => conn.to).includes(node); // check every outgoing connection for node
        }
    }

    /**
     * This node gates (influences) the given connection
     *
     * @param connection Connection to be gated (influenced) by a neuron
     */
    public addGate(connection: Connection): void {
        this.gated.add(connection);
        connection.gateNode = this;
    }

    /**
     * Stops this node from gating (manipulating) the given connection(s)
     *
     * @param connection Connections to remove gate - _i.e. remove this node from_
     */
    public removeGate(connection: Connection): void {
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
    public connect(target: Node, weight: number = 1, twoSided: boolean = false): Connection {
        if (target === this) { // self connection
            this.selfConnection.weight = weight;
            return this.selfConnection;
        } else if (this.isProjectingTo(target)) {
            throw new ReferenceError("Their is already a connection!"); // already connected
        } else {
            const connection: Connection = new Connection(this, target, weight); // create new connection

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
    public disconnect(node: Node, twoSided: boolean = false): Connection {
        if (node === this) { // self connection
            this.selfConnection.weight = 0; // set weight to 0
            return this.selfConnection;
        }

        const connections: Connection[] = Array.from(this.outgoing).filter(conn => conn.to === node);

        if (connections.length === 0) {
            throw new Error("No Connection found");
        }
        const connection: Connection = connections[0];

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
    public propagate(target?: number, options: {
        /**
         * [Momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html) adds a fraction of the previous weight update to the current one.
         */
        momentum?: number,
        /**
         * [Learning rate](https://towardsdatascience.com/understanding-learning-rates-and-how-it-improves-performance-in-deep-learning-d0d4059c1c10)
         */
        rate?: number,
        /**
         * When set to false weights won't update, but when set to true after being false the last propagation will include the delta weights of the first "update:false" propagations too.
         */
        update?: boolean
    } = {}): void {
        options.momentum = getOrDefault(options.momentum, 0);
        options.rate = getOrDefault(options.rate, 0.3);
        options.update = getOrDefault(options.update, true);

        if (target !== undefined && Number.isFinite(target)) {
            this.errorResponsibility = this.errorProjected = target - this.activation;
        } else {
            this.errorProjected = 0;
            this.outgoing.forEach(connection => {
                this.errorProjected += connection.to.errorResponsibility * connection.weight * connection.gain;
            });
            this.errorProjected *= this.derivativeState;


            this.errorGated = 0;
            this.gated.forEach(connection => {
                let influence: number;
                if (connection.to.selfConnection.gateNode === this) { // self connection is gated with this node
                    influence = connection.to.old + connection.weight * connection.from.activation;
                } else {
                    influence = connection.weight * connection.from.activation;
                }

                this.errorGated += connection.to.errorResponsibility * influence;
            });
            this.errorGated *= this.derivativeState;


            this.errorResponsibility = this.errorProjected + this.errorGated;
        }


        this.incoming.forEach(connection => {
            // calculate gradient
            let gradient: number = this.errorProjected * connection.eligibility;
            connection.xTrace.forEach((value, key) => gradient += key.errorResponsibility * value);


            connection.deltaWeightsTotal += (options.rate ?? 0.3) * gradient * this.mask;
            if (options.update) {
                connection.deltaWeightsTotal += (options.momentum ?? 0) * connection.deltaWeightsPrevious;
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
    public activate(input?: number, trace: boolean = true): number {
        if (input !== undefined) {
            return this.activation = input;
        } else if (this.isInputNode()) {
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
            this.incoming.forEach(connection => {
                connection.eligibility = this.selfConnection.gain * this.selfConnection.weight * connection.eligibility + connection.from.activation * connection.gain;

                for (let i: number = 0; i < nodes.length; i++) {
                    const node: Node = nodes[i];
                    const influence: number = influences[i];

                    if (connection.xTrace.has(node)) {
                        connection.xTrace.set(node, node.selfConnection.gain * node.selfConnection.weight * (connection.xTrace.get(node) ?? 0) + this.derivativeState * connection.eligibility * influence);
                    } else {
                        connection.xTrace.set(node, this.derivativeState * connection.eligibility * influence);
                    }
                }
            });

            return this.activation;
        } else {
            if (this.isInputNode()) return this.activation = 0;

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
    public toJSON(): NodeJSON {
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
    public isInputNode(): boolean {
        return this.type === NodeType.INPUT;
    }

    /**
     * Is this a hidden Node?
     */
    public isHiddenNode(): boolean {
        return this.type === NodeType.HIDDEN;
    }

    /**
     * Is this a output Node?
     */
    public isOutputNode(): boolean {
        return this.type === NodeType.OUTPUT;
    }

    /**
     * Set bias.
     *
     * @param bias the new bias value
     */
    public setBias(bias: number): Node {
        this.bias = bias;
        return this;
    }

    /**
     * Set activation type
     *
     * @param activation the new activation type
     */
    public setActivationType(activation: ActivationType): Node {
        this.squash = activation;
        return this;
    }
}
