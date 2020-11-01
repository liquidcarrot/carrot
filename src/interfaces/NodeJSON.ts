/**
 * An interface for representing a node with an json object
 */
import { PoolNodeType } from "../enums/NodeType";

export interface NodeJSON {
  /**
   * The bias value of the node
   */
  readonly bias: number;
  /**
   * The type of this node
   */
  readonly type: number;
  /**
   * The activation type of this node
   */
  readonly squash: string;
  /**
   * The mask value of this node
   */
  readonly mask: number;
  /**
   * The index of this node
   */
  readonly index: number;
  readonly id: number;
  readonly errorResponsibility: number;
  readonly errorProjected: number;
  readonly errorGated: number;
  readonly deltaBiasPrevious: number;
  readonly deltaBiasTotal: number;
  readonly derivativeState: number;
  readonly state: number;
  readonly prevState: number;
  readonly activation: number;
}

/**
 * An interface for representing a pool node with an json object
 */
export interface PoolNodeJSON extends NodeJSON {
  /**
   * The poolType of this pooling node
   */
  readonly poolType: PoolNodeType;
}

/**
 * An interface for representing a dropout node with an json object
 */
export interface DropoutNodeJSON extends NodeJSON {
  /**
   * The dropout probability of this dropout node
   */
  readonly probability: number;
}
