import {DropoutNodeJSON} from "../../interfaces/NodeJSON";
import {getOrDefault, randDouble, sum} from "../../methods/Utils";
import {Connection} from "../Connection";
import {ConstantNode} from "./ConstantNode";

/**
 * Dropout node
 */
export class DropoutNode extends ConstantNode {
    /**
     * Dropout probability
     */
    private probability: number;
    /**
     * Is dropped out at last activation?
     */
    private droppedOut: boolean;

    constructor(probability: number) {
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
    public activate(): number {
        if (this.incoming.length !== 1) {
            throw new RangeError("Dropout node should have exactly one incoming connection!");
        }
        const incomingConnection: Connection = this.incoming[0];

        // https://stats.stackexchange.com/a/219240
        if (randDouble(0, 1) < this.probability) {
            // DROPOUT
            this.droppedOut = true;
            this.state = 0;
        } else {
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

        const connectionsStates: number[] = this.outgoing.map(conn => conn.to.errorResponsibility * conn.weight * conn.gain);
        this.errorResponsibility = this.errorProjected = sum(connectionsStates) / (1 - this.probability);

        if (this.incoming.length !== 1) {
            throw new RangeError("Dropout node should have exactly one incoming connection!");
        }
        const incomingConnection: Connection = this.incoming[0];

        // calculate gradient
        if (!this.droppedOut) {
            let gradient: number = this.errorProjected * incomingConnection.eligibility;
            for (let i: number = 0; i < incomingConnection.xTraceNodes.length; i++) {
                gradient += incomingConnection.xTraceNodes[i].errorResponsibility * incomingConnection.xTraceValues[i];
            }

            if (options.update) {
                incomingConnection.deltaWeightsTotal += options.rate * gradient * this.mask + options.momentum * incomingConnection.deltaWeightsPrevious;
                incomingConnection.weight += incomingConnection.deltaWeightsTotal;
                incomingConnection.deltaWeightsPrevious = incomingConnection.deltaWeightsTotal;
                incomingConnection.deltaWeightsTotal = 0;
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
    public fromJSON(json: DropoutNodeJSON): DropoutNode {
        super.fromJSON(json);
        this.probability = json.probability;
        return this;
    }

    /**
     * Convert this node into a json object.
     *
     * @returns the json object representing this node
     */
    public toJSON(): DropoutNodeJSON {
        return Object.assign(super.toJSON(), {
            probability: this.probability
        });
    }
}
