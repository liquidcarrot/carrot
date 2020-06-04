import {PoolNodeType} from "../../../enums/NodeType";
import {activationType, IdentityActivation} from "../../../methods/Activation";
import {PoolNode} from "../../Nodes/PoolNode";
import {PoolingLayer} from "./PoolingLayer";

/**
 * Minimum pooling layer 1D
 */
export class MinPooling1DLayer extends PoolingLayer {
    constructor(outputSize: number, options: {
        /**
         * The activation type for the output nodes of this layer.
         */
        activation?: activationType
    } = {}) {
        super(outputSize);

        const activationType: activationType = options.activation ?? IdentityActivation;

        for (let i: number = 0; i < outputSize; i++) {
            this.inputNodes.add(new PoolNode(PoolNodeType.MIN_POOLING).setActivationType(activationType));
        }

        this.outputNodes = this.inputNodes;
        this.nodes.push(...Array.from(this.inputNodes));
    }
}
