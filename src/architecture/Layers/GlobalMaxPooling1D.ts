import {ActivationType} from "../../enums/ActivationType";
import {MaxPooling1DLayer} from "./MaxPooling1DLayer";

export class GlobalMaxPooling1D extends MaxPooling1DLayer {
    constructor(outputSize: number, options: { activationType?: ActivationType } = {}) {
        super(1, options);
    }
}
