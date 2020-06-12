"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoiseNodeType = exports.PoolNodeType = exports.NodeType = void 0;
/**
 * The type of node.
 */
var NodeType;
(function (NodeType) {
    /**
     * Node is an input node.
     */
    NodeType[NodeType["INPUT"] = 0] = "INPUT";
    /**
     * Node is a hidden node.
     */
    NodeType[NodeType["HIDDEN"] = 1] = "HIDDEN";
    /**
     * Node is a output node.
     */
    NodeType[NodeType["OUTPUT"] = 2] = "OUTPUT";
})(NodeType = exports.NodeType || (exports.NodeType = {}));
/**
 * The type of pool node.
 */
var PoolNodeType;
(function (PoolNodeType) {
    /**
     * Maximum pooling node.
     */
    PoolNodeType[PoolNodeType["MAX_POOLING"] = 0] = "MAX_POOLING";
    /**
     * Average pooling node.
     */
    PoolNodeType[PoolNodeType["AVG_POOLING"] = 1] = "AVG_POOLING";
    /**
     * Minimum pooling node.
     */
    PoolNodeType[PoolNodeType["MIN_POOLING"] = 2] = "MIN_POOLING";
})(PoolNodeType = exports.PoolNodeType || (exports.PoolNodeType = {}));
/**
 * The type of noise node.
 */
var NoiseNodeType;
(function (NoiseNodeType) {
    /**
     * Gaussian noise node
     */
    NoiseNodeType[NoiseNodeType["GAUSSIAN_NOISE"] = 0] = "GAUSSIAN_NOISE";
})(NoiseNodeType = exports.NoiseNodeType || (exports.NoiseNodeType = {}));
