"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxPooling1DLayer = void 0;
const src_1 = require("activations/build/src");
const NodeType_1 = require("../../../enums/NodeType");
const PoolNode_1 = require("../../Nodes/PoolNode");
const PoolingLayer_1 = require("./PoolingLayer");
/**
 * Maximum pooling layer 1D
 */
class MaxPooling1DLayer extends PoolingLayer_1.PoolingLayer {
    constructor(outputSize, options = {}) {
        var _a;
        super(outputSize);
        const activationType = (_a = options.activation) !== null && _a !== void 0 ? _a : src_1.Identitiy;
        for (let i = 0; i < outputSize; i++) {
            this.inputNodes.add(new PoolNode_1.PoolNode(NodeType_1.PoolNodeType.MAX_POOLING).setActivationType(activationType));
        }
        this.outputNodes = this.inputNodes;
        this.nodes.push(...Array.from(this.inputNodes));
    }
}
exports.MaxPooling1DLayer = MaxPooling1DLayer;
