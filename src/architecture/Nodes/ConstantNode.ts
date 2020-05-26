import {ActivationType} from "../../enums/ActivationType";
import {NodeType} from "../../enums/NodeType";
import {NodeJSON} from "../../interfaces/NodeJSON";
import {Activation} from "../../methods/Activation";
import {Node} from "../Node";

/**
 * Constant node
 */
export abstract class ConstantNode extends Node {

    protected constructor() {
        super(NodeType.HIDDEN);
        this.bias = 1;
    }

    /**
     * Create a constant node from json object.
     *
     * @param json the json object representing the node
     *
     * @returns the created node
     */
    public fromJSON(json: NodeJSON): Node {
        this.index = json.index ?? -1;
        this.squash = Activation.getActivation(json.squash ?? ActivationType.IdentityActivation);
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
    public abstract activate(): number;

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
    public abstract propagate(target?: number, options?: {
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
    }): void;

    /**
     * Convert this node into a json object.
     *
     * @returns the json object representing this node
     */
    public toJSON(): NodeJSON {
        return {index: this.index, squash: this.squash.type};
    }

    /**
     * Bias mutations aren't allowed for a constant node.
     */
    public mutateBias(): void {
        throw new ReferenceError("Cannot mutate a pool node!");
    }

    /**
     * Activation mutations aren't allowed for a constant node.
     */
    public mutateActivation(): void {
        throw new ReferenceError("Cannot mutate a pool node!");
    }

    /**
     * Constant nodes can't gate a connection.
     */
    public addGate(): void {
        throw new ReferenceError("A pool node can't gate a connection!");
    }

    /**
     * Constant nodes can't gate a connection.
     */
    public removeGate(): void {
        throw new ReferenceError("A pool node can't gate a connection!");
    }

    /**
     * Can't set the bias of a constant node.
     */
    public setBias(): Node {
        throw new ReferenceError("Cannot set the bias of a pool node!");
    }
}
