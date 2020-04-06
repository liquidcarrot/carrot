import {ActivationType} from "../../methods/Activation";
import {DenseLayer} from "./DenseLayer";

export class HopfieldLayer extends DenseLayer {
    constructor(outputSize: number) {
        super(outputSize, {activationType: ActivationType.StepActivation});
    }
}
