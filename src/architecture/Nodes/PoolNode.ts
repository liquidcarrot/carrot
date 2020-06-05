import {PoolNodeType} from "../../enums/NodeType";
import {PoolNodeJSON} from "../../interfaces/NodeJSON";
import {avg, getOrDefault, maxValueIndex, minValueIndex, sum} from "../../utils/Utils";
import {Connection} from "../Connection";
import {Node} from "../Node";
import {ConstantNode} from "./ConstantNode";

/**
 * Pool node
 */
export class PoolNode extends ConstantNode {
    /**
     * The type of pooling
     */
    private poolingType: PoolNodeType;
    /**
     * The used input neuron
     */
    private receivingNode: Node | null;

    constructor(poolingType: PoolNodeType = PoolNodeType.MAX_POOLING) {
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
    public fromJSON(json: PoolNodeJSON): PoolNode {
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
    public activate(): number {
        const connections: Connection[] = Array.from(this.incoming);
        const incomingStates: number[] = connections.map(conn => conn.from.activation * conn.weight * conn.gain);

        if (this.poolingType === PoolNodeType.MAX_POOLING) {
            const index: number = maxValueIndex(incomingStates);
            this.receivingNode = connections[index].from;
            this.state = incomingStates[index];
        } else if (this.poolingType === PoolNodeType.AVG_POOLING) {
            this.state = avg(incomingStates);
        } else if (this.poolingType === PoolNodeType.MIN_POOLING) {
            const index: number = minValueIndex(incomingStates);
            this.receivingNode = connections[index].from;
            this.state = incomingStates[index];
        } else {
            throw new ReferenceError("No valid pooling type! Type: " + this.poolingType);
        }

        this.activation = this.squash(this.state, false) * this.mask;
        if (this.poolingType === PoolNodeType.AVG_POOLING) {
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

        const connectionsStates: number[] = Array.from(this.outgoing).map(conn => conn.to.errorResponsibility * conn.weight * conn.gain);
        this.errorResponsibility = this.errorProjected = sum(connectionsStates) * this.derivativeState;
        if (this.poolingType === PoolNodeType.AVG_POOLING) {
            this.incoming.forEach(connection => {
                // calculate gradient
                let gradient: number = this.errorProjected * connection.eligibility;
                connection.xTrace.forEach((value, key) => {
                    gradient += key.errorResponsibility * value;
                });

                connection.deltaWeightsTotal += (options.rate ?? 0.3) * gradient * this.mask;
                if (options.update) {
                    connection.deltaWeightsTotal += (options.momentum ?? 0) * connection.deltaWeightsPrevious;
                    connection.weight += connection.deltaWeightsTotal;
                    connection.deltaWeightsPrevious = connection.deltaWeightsTotal;
                    connection.deltaWeightsTotal = 0;
                }
            });
        } else {
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
    public toJSON(): PoolNodeJSON {
        return Object.assign(super.toJSON(), {
            poolType: this.poolingType
        });
    }
}
