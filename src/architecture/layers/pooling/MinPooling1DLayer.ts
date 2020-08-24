import { ActivationType, Identitiy } from "activations";
import { PoolingLayer } from "./PoolingLayer";
import { PoolNodeType } from "../../../enums/NodeType";
import { PoolNode } from "../../nodes/PoolNode";

/**
 * Minimum pooling layer 1D
 */
export class MinPooling1DLayer extends PoolingLayer {
  constructor(
    outputSize: number,
    options: {
      /**
       * The activation type for the output nodes of this layer.
       */
      activation?: ActivationType;
    } = {}
  ) {
    super(outputSize);

    const activationType: ActivationType = options.activation ?? Identitiy;

    for (let i = 0; i < outputSize; i++) {
      this.inputNodes.add(new PoolNode(PoolNodeType.MIN_POOLING).setActivationType(activationType));
    }

    this.outputNodes = this.inputNodes;
    this.nodes.push(...Array.from(this.inputNodes));
  }
}
