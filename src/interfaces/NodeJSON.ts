import {PoolNodeType} from "../enums/NodeType";

/**
 * An interface for representing a node with an json object
 */
export interface NodeJSON {
    /**
     * The bias value of the node
     */
    bias?: number;
    /**
     * The type of this node
     */
    type?: number;
    /**
     * The activation type of this node
     */
    squash?: ((x: number, derivative: boolean) => number);
    /**
     * The mask value of this node
     */
    mask?: number;
    /**
     * The index of this node
     */
    index?: number;
}

/**
 * An interface for representing a pool node with an json object
 */
export interface PoolNodeJSON extends NodeJSON {
    /**
     * The poolType of this pooling node
     */
    poolType: PoolNodeType;
}

/**
 * An interface for representing a dropout node with an json object
 */
export interface DropoutNodeJSON extends NodeJSON {
    /**
     * The dropout probability of this dropout node
     */
    probability: number;
}
