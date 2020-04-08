import {PoolNode} from "../../Nodes/PoolNode";
import {PoolingType} from "../../../enums/PoolingType";
import {PoolingLayer} from "./PoolingLayer";
import {ActivationType} from "../../../enums/ActivationType";

export class MinPooling1DLayer extends PoolingLayer {
    constructor(outputSize: number, options: { activationType?: ActivationType } = {}) {
        super(outputSize);

        const activationType: ActivationType = options.activationType ?? ActivationType.IdentityActivation;

        for (let i: number = 0; i < outputSize; i++) {
            this.inputNodes.add(new PoolNode(PoolingType.MIN_POOLING).setSquash(activationType));
        }

        this.outputNodes = this.inputNodes;
        this.nodes.push(...Array.from(this.inputNodes));
    }
}
