import {activationType} from "../../../methods/Activation";
import {MinPooling1DLayer} from "./MinPooling1DLayer";

/**
 * Global minimum pooling layer 1D
 */
export class GlobalMinPooling1DLayer extends MinPooling1DLayer {
    constructor(outputSize: number, options: {
        /**
         * The activation type for the output nodes of this layer.
         */
        activation?: activationType
    } = {}) {
        super(1, options);
    }
}
