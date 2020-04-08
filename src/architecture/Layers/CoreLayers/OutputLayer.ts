import {Layer} from "../Layer";
import {Node} from "../../Node";
import {NodeType} from "../../../enums/NodeType";
import {ActivationType} from "../../../enums/ActivationType";

export class OutputLayer extends Layer {
    constructor(outputSize: number, options: { activationType?: ActivationType } = {}) {
        super(outputSize);

        const activation: ActivationType = options.activationType ?? ActivationType.IdentityActivation;
        for (let i: number = 0; i < outputSize; i++) {
            this.inputNodes.add(new Node(NodeType.OUTPUT).setSquash(activation));
        }
        this.nodes.push(...Array.from(this.inputNodes));
    }

    public connect(): void {
        throw new ReferenceError("Could not connect an OutputLayer!");
    }
}
