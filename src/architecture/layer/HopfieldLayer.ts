import {DenseLayer} from "./DenseLayer";
import {ActivationType} from "../../enums/ActivationType";

export class HopfieldLayer extends DenseLayer {
    constructor(outputSize: number) {
        super(outputSize, {activationType: ActivationType.StepActivation});
    }
}
