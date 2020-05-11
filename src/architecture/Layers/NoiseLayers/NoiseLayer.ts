import {ActivationType} from "../../../enums/ActivationType";
import {ConnectionType} from "../../../enums/ConnectionType";
import {NoiseNodeType} from "../../../enums/NodeType";
import {NoiseNode} from "../../Nodes/NoiseNode";
import {Layer} from "../Layer";

export class NoiseLayer extends Layer {
    constructor(outputSize: number, options: { activationType?: ActivationType, mean?: number, deviation?: number } = {}) {
        super(outputSize);

        const activation: ActivationType = options.activationType ?? ActivationType.IdentityActivation;

        for (let i: number = 0; i < outputSize; i++) {
            this.inputNodes.add(new NoiseNode({
                noiseType: NoiseNodeType.GAUSSIAN_NOISE,
                gaussian: options
            }).setActivationType(activation));
        }

        this.outputNodes = this.inputNodes;
        this.nodes.push(...Array.from(this.inputNodes));
    }

    public getDefaultIncomingConnectionType(): ConnectionType {
        return ConnectionType.ONE_TO_ONE;
    }

    public connectionTypeisAllowed(type: ConnectionType): boolean {
        return type === ConnectionType.ONE_TO_ONE;
    }
}
