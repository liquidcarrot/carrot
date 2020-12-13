import { ConnectionJSON } from "../interfaces/ConnectionJSON";
import { pairing } from "../utils/Utils";
import { Node } from "./Node";

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
  /**
   * Connection id for NEAT
   */
  public id: number;
  public enabled: boolean;

  constructor(from: Node, to: Node, weight?: number, gateNode?: Node) {
    this.from = from;
    this.to = to;
    this.id = -1;
    this.weight = weight ?? 0;
    this.gain = 1;
    this.eligibility = 0;
    this.deltaWeightsPrevious = 0;
    this.deltaWeightsTotal = 0;
    this.xTrace = new Map<Node, number>();
    this.enabled = true;

    if (gateNode) {
      this.gateNode = gateNode;
      gateNode.addGate(this);
    } else this.gateNode = null;
  }

  /**
   * Convert a json object to a connection
   *
   * @param json A connection represented as a JSON object
   * @param nodes the nodes in the network used to crate the connection
   * @returns the created connection
   */
  public static fromJSON(json: ConnectionJSON, nodes: Node[]) {
    nodes = nodes.map((node) => node.clone()); // Deep copy all nodes to avoid reference errors

    const connection: Connection = nodes[json.fromIndex].connect(nodes[json.toIndex], json.weight);

    connection.id = json.id;
    connection.eligibility = json.eligibility;
    connection.gain = json.gain;
    connection.enabled = json.enabled;
    connection.deltaWeightsPrevious = json.deltaWeightsPrevious;
    connection.deltaWeightsTotal = json.deltaWeightsTotal;
    connection.gateNode = json.gateNodeIndex >= 0 ? nodes[json.gateNodeIndex] : null;

    json.xTrace?.forEach((xTraceValue: number, xTraceNodeIndex: number) => {
      connection.xTrace.set(nodes[xTraceNodeIndex], xTraceValue);
    });
    return connection;
  }

  /**
   * Returns the connection as a JSON
   *
   * @return Connection as a JSON
   */
  public toJSON(nodes: Node[]): ConnectionJSON {
    let xTracesTransformed: Map<number, number> | null;
    if (this.xTrace.size > 0) {
      xTracesTransformed = new Map<number, number>();
      this.xTrace.forEach((value, key) => {
        xTracesTransformed?.set(key.id, value);
      });
    } else {
      xTracesTransformed = null;
    }

    // Search for the nodes in the array and get all indices for recreating the connection
    let fromIndex = -1;
    let toIndex = -1;
    let gateNodeIndex = -1;
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === this.from.id) fromIndex = i;
      if (nodes[i].id === this.to.id) toIndex = i;
      if (this.gateNode && nodes[i].id === this.gateNode.id) gateNodeIndex = i;
    }

    if (fromIndex < 0 || toIndex < 0) throw new ReferenceError("There should be a from node and a to node!");

    return {
      id: this.id,
      fromIndex: fromIndex,
      toIndex: toIndex,
      eligibility: this.eligibility,
      gain: this.gain,
      enabled: this.enabled,
      deltaWeightsPrevious: this.deltaWeightsPrevious,
      deltaWeightsTotal: this.deltaWeightsTotal,
      gateNodeIndex: gateNodeIndex,
      weight: this.weight,
      xTrace: xTracesTransformed,
    };
  }

  /**
   * Get the innovation ID for this connection
   */
  public getInnovationID(): number {
    return pairing(this.from.id, this.to.id);
  }

  /**
   * Clones this connection.
   */
  public clone(nodes: Node[]): Connection {
    return Connection.fromJSON(this.toJSON(nodes), nodes);
  }

  /**
   * Disables a connection
   */
  public disable(): void {
    this.enabled = false;
  }
}
