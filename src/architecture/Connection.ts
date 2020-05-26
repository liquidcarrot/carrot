import {ConnectionJSON} from "../interfaces/ConnectionJSON";
import {Node} from "./Node";

/**
 * A connection instance describes the connection between two nodes.
 */
export class Connection {
    /**
     * eligibility
     */
    public eligibility: number;
    /**
     * Used for gating, gets multiplied with weight
     */
    public gain: number;
    /**
     * Weight of the connection
     */
    public weight: number;
    /**
     * Connection origin node (neuron)
     */
    public from: Node;
    /**
     * Connection destination node (neuron)
     */
    public to: Node;
    /**
     * xTraceNodes
     */
    public xTraceNodes: Node[];
    /**
     * xTraceValues
     */
    public xTraceValues: number[];
    /**
     * The node gating this connection
     */
    public gateNode: Node | null;
    /**
     * Tracks [momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html) - _for [batch training](https://www.quora.com/What-is-the-difference-between-batch-online-and-mini-batch-training-in-neural-networks-Which-one-should-I-use-for-a-small-to-medium-sized-dataset-for-prediction-purposes)_
     */
    public deltaWeightsTotal: number;
    /**
     * Tracks [momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html)
     */
    public deltaWeightsPrevious: number;

    constructor(from: Node, to: Node, weight?: number, gateNode?: Node) {
        this.from = from;
        this.to = to;
        this.weight = weight ?? 0;
        this.gain = 1;
        this.eligibility = 0;
        this.deltaWeightsPrevious = 0;
        this.deltaWeightsTotal = 0;
        this.xTraceNodes = [];
        this.xTraceValues = [];

        if (gateNode) {
            this.gateNode = gateNode;
            gateNode.addGate(this);
        } else {
            this.gateNode = null;
        }
    }

    /**
     * Returns an innovation ID
     *
     * @see {@link https://en.wikipedia.org/wiki/Pairing_function (Cantor pairing function)|Pairing function (Cantor pairing function)}
     *
     * @param a - A [natural number](https://en.wikipedia.org/wiki/Natural_number), which is an integer greater than or equal to zero
     * @param b - A [natural number](https://en.wikipedia.org/wiki/Natural_number), which is an integer greater than or equal to zero
     *
     * @return An Integer that uniquely represents a pair of Integers
     */
    public static innovationID(a: number, b: number): number {
        return 1 / 2 * (a + b) * (a + b + 1) + b;
    }

    /**
     * Returns the connection as a JSON
     *
     * @return Connection as a JSON
     */
    public toJSON(): ConnectionJSON {
        return {
            fromIndex: this.from.index,
            toIndex: this.to.index,
            gateNodeIndex: this.gateNode === null ? null : this.gateNode.index,
            weight: this.weight
        };
    }
}
