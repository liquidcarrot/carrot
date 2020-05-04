import {PoolNode} from "../../Nodes/PoolNode";
import {PoolNodeType} from "../../../enums/NodeType";
import {PoolingLayer} from "./PoolingLayer";
import {ActivationType} from "../../../enums/ActivationType";

export class MaxPooling1DLayer extends PoolingLayer {
    constructor(outputSize: number, options: { activationType?: ActivationType } = {}) {
        super(outputSize);

        const activationType: ActivationType = options.activationType ?? ActivationType.IdentityActivation;

        for (let i: number = 0; i < outputSize; i++) {
            this.inputNodes.add(new PoolNode(PoolNodeType.MAX_POOLING).setSquash(activationType));
        }

        this.outputNodes = this.inputNodes;
        this.nodes.push(...Array.from(this.inputNodes));
    }
}
