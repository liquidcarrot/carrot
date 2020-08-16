/**
 * The type of node.
 */
export enum NodeType {
    /**
     * Node is an input node.
     */
    INPUT,
    /**
     * Node is a hidden node.
     */
    HIDDEN,
    /**
     * Node is a output node.
     */
    OUTPUT,
}

/**
 * The type of pool node.
 */
export enum PoolNodeType {
    /**
     * Maximum pooling node.
     */
    MAX_POOLING,
    /**
     * Average pooling node.
     */
    AVG_POOLING,
    /**
     * Minimum pooling node.
     */
    MIN_POOLING,
}

/**
 * The type of noise node.
 */
export enum NoiseNodeType {
    /**
     * Gaussian noise node
     */
    GAUSSIAN_NOISE,
}
