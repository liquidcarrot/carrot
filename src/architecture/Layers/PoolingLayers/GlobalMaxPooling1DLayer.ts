import {ActivationType} from "activations/build/src";
import {MaxPooling1DLayer} from "./MaxPooling1DLayer";

/**
 * Global maximum pooling layer 1D
 */
export class GlobalMaxPooling1DLayer extends MaxPooling1DLayer {
    constructor(outputSize: number, options: {
        /**
         * The activation type for the output nodes of this layer.
         */
        activation?: ActivationType
    } = {}) {
        super(1, options);
    }
}
