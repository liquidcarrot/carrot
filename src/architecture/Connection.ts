import {ConnectionJSON} from '..';
import {pairing} from '../utils/Utils';
import {Node} from './Node';

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
  public readonly from: Node;
  /**
   * Connection destination node (neuron)
   */
  public readonly to: Node;

  /**
   * X Trace
   */
  public xTrace: Map<Node, number>;

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
    this.xTrace = new Map<Node, number>();

    if (gateNode) {
      this.gateNode = gateNode;
      gateNode.addGate(this);
    } else {
      this.gateNode = null;
    }
  }

  /**
   * Returns the connection as a JSON
   *
   * @return Connection as a JSON
   */
  public toJSON(): ConnectionJSON {
    let xTracesTransformed: Map<number, number> | null;
    if (this.xTrace.size > 0) {
      xTracesTransformed = new Map<number, number>();
      this.xTrace.forEach((value, key) => {
        xTracesTransformed?.set(key.index, value);
      });
    } else {
      xTracesTransformed = null;
    }
    return {
      fromIndex: this.from.index,
      toIndex: this.to.index,
      gateNodeIndex: this.gateNode === null ? null : this.gateNode.index,
      weight: this.weight,
      xTraces: xTracesTransformed,
    };
  }

  /**
   * Get the innovation ID for this connection
   */
  public getInnovationID(): number {
    return pairing(this.from.index, this.to.index);
  }
}
