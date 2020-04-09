import {ActivationType} from "../../../enums/ActivationType";
import {AvgPooling1DLayer} from "./AvgPooling1DLayer";

export class GlobalAvgPooling1DLayer extends AvgPooling1DLayer {
    constructor(outputSize: number, options: { activationType?: ActivationType } = {}) {
        super(1, options);
    }
}
