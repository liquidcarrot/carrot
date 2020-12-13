/**
 * An interface for representing a connection with an json object
 */

export interface ConnectionJSON {
  readonly id: number;
  /**
   * The connection weight
   */
  readonly eligibility: number;
  readonly gain: number;
  readonly weight: number;
  readonly enabled: boolean;
  readonly deltaWeightsTotal: number;
  readonly deltaWeightsPrevious: number;
  /**
   * The id of the origin node
   */
  readonly fromIndex: number;
  /**
   * The id of the destination node
   */
  readonly toIndex: number;
  /**
   * The id of the gate node, if connection is gated
   */
  readonly gateNodeIndex: number;
  /**
   * The xTrace values
   */
  readonly xTrace: Map<number, number> | null;
}
