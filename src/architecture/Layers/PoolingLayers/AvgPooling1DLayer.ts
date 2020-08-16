import {ActivationType, Identitiy} from 'activations';
import {PoolNode, PoolNodeType} from '../../..';
import {PoolingLayer} from './PoolingLayer';

/**
 * Average pooling layer 1D
 */
export class AvgPooling1DLayer extends PoolingLayer {
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
      this.inputNodes.add(
        new PoolNode(PoolNodeType.AVG_POOLING).setActivationType(activationType)
      );
    }

    this.outputNodes = this.inputNodes;
    this.nodes.push(...Array.from(this.inputNodes));
  }
}
