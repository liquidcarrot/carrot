import {ActivationType} from "activations/build/src";
import {PoolNodeType} from "../enums/NodeType";

/**
 * An interface for representing a node with an json object
 */
export interface NodeJSON {
    /**
     * The bias value of the node
     */
    readonly bias?: number;
    /**
     * The type of this node
     */
    readonly type?: number;
    /**
     * The activation type of this node
     */
    readonly squash?: ActivationType;
    /**
     * The mask value of this node
     */
    readonly mask?: number;
    /**
     * The index of this node
     */
    readonly index?: number;
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
