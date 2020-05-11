import {ActivationType} from "../../../enums/ActivationType";
import {AvgPooling1DLayer} from "./AvgPooling1DLayer";

/**
 * Global average pooling layer 1D
 */
export class GlobalAvgPooling1DLayer extends AvgPooling1DLayer {
    constructor(outputSize: number, options: {
        /**
         * The activation type for the output nodes of this layer.
         */
        activationType?: ActivationType
    } = {}) {
        super(1, options);
    }
}
