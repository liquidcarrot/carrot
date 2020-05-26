import {ActivationType} from "../../../enums/ActivationType";
import {ConnectionType} from "../../../enums/ConnectionType";
import {ActivationNode} from "../../Nodes/ActivationNode";
import {Layer} from "../Layer";

export class ActivationLayer extends Layer {

    constructor(outputSize: number, options: { activationType?: ActivationType } = {}) {
        super(outputSize);

        const activation: ActivationType = options.activationType ?? ActivationType.LogisticActivation;

        for (let i: number = 0; i < outputSize; i++) {
            this.inputNodes.add(new ActivationNode().setSquash(activation));
        }

        this.outputNodes = this.inputNodes;
        this.nodes.push(...Array.from(this.inputNodes));
    }

    public connectionTypeisAllowed(type: ConnectionType): boolean {
        return type === ConnectionType.ONE_TO_ONE;
    }

    public getDefaultIncomingConnectionType(): ConnectionType {
        return ConnectionType.ONE_TO_ONE;
    }

}
