import {ActivationType} from 'activations/build/src';
import {AvgPooling1DLayer} from './AvgPooling1DLayer';

/**
 * Global average pooling layer 1D
 */
export class GlobalAvgPooling1DLayer extends AvgPooling1DLayer {
  constructor(
    outputSize: number,
    options: {
      /**
       * The activation type for the output nodes of this layer.
       */
      activation?: ActivationType;
    } = {}
  ) {
    super(1, options);
  }
}
