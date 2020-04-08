import {ActivationType} from "../../enums/ActivationType";
import {MinPooling1DLayer} from "./MinPooling1DLayer";

export class GlobalMinPooling1D extends MinPooling1DLayer {
    constructor(outputSize: number, options: { activationType?: ActivationType } = {}) {
        super(1, options);
    }
}
