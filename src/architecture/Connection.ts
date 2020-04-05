import {Node} from "./Node";

/**
 * A connection instance describes the connection between two nodes. If you're looking for connections between [Groups](Group) please see [Connection Methods](connection)
 *
 * @param from Connection origin node (neuron)
 * @param to Connection destination node (neuron)
 * @param weight=random Weight of the connection
 * @param gateNode Node which gates this connection
 *
 * @prop {Node} from Connection origin node (neuron)
 * @prop {Node} to Connection destination node (neuron)
 * @prop {number} weight=random Weight of the connection
 * @prop {number} gain=1 Used for gating, gets multiplied with weight
 * @prop {Node} gateNode=null The node gating this connection
 * @prop {number} eligibility=0
 * @prop {Node[]} xTraceNodes
 * @prop {number[]} xTraceValues
 * @prop {number[]} delta_weights
 * @prop {number} deltaWeightsPrevious=0 Tracks [momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html)
 * @prop {number} deltaWeightsTotal=0 Tracks [momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html) - _for [batch training](https://www.quora.com/What-is-the-difference-between-batch-online-and-mini-batch-training-in-neural-networks-Which-one-should-I-use-for-a-small-to-medium-sized-dataset-for-prediction-purposes)_
 *
 * @see {@link connection|Connection Methods}
 * @see {@link Node|Node}
 */
export class Connection {
    public eligibility: number;
    public gain: number;
    public weight: number;
    public from: Node;
    public to: Node;
    public xTraceNodes: Node[];
    public xTraceValues: number[];
    public gateNode: Node | null;
    public deltaWeightsTotal: number;
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

export interface ConnectionJSON {
    weight: number;
    fromIndex: number;
    toIndex: number;
    gateNodeIndex: number | null;
}
