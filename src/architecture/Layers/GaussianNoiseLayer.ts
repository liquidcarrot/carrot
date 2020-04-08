import {Layer} from "../Layer";
import {ActivationType} from "../../enums/ActivationType";
import {ConnectionType} from "../../enums/ConnectionType";
import {GaussianNoiseNode} from "../Nodes/GaussianNoiseNode";

export class GaussianNoiseLayer extends Layer {
    constructor(outputSize: number, options: { activationType?: ActivationType, mean?: number, deviation?: number } = {}) {
        super(outputSize);

        const activation: ActivationType = options.activationType ?? ActivationType.IdentityActivation;

        for (let i: number = 0; i < outputSize; i++) {
            this.inputNodes.add(new GaussianNoiseNode(options).setSquash(activation));
        }

        this.outputNodes = this.inputNodes;
        this.nodes.push(...Array.from(this.inputNodes));
    }

    public getDefaultIncomingConnection(): ConnectionType {
        return ConnectionType.ONE_TO_ONE;
    }
}
