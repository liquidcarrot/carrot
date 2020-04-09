import {Layer} from "../Layer";
import {ActivationType} from "../../../enums/ActivationType";
import {ConnectionType} from "../../../enums/ConnectionType";
import {NoiseNode} from "../../Nodes/NoiseNode";
import {NoiseNodeType} from "../../../enums/NodeType";

export class NoiseLayer extends Layer {
    constructor(outputSize: number, options: { activationType?: ActivationType, mean?: number, deviation?: number } = {}) {
        super(outputSize);

        const activation: ActivationType = options.activationType ?? ActivationType.IdentityActivation;

        for (let i: number = 0; i < outputSize; i++) {
            this.inputNodes.add(new NoiseNode({
                noiseType: NoiseNodeType.GAUSSIAN_NOISE,
                gaussian: options
            }).setSquash(activation));
        }

        this.outputNodes = this.inputNodes;
        this.nodes.push(...Array.from(this.inputNodes));
    }

    public getDefaultIncomingConnection(): ConnectionType {
        return ConnectionType.ONE_TO_ONE;
    }
}
