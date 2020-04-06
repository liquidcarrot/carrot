import {Layer} from "./Layer";
import {Node, NodeType} from "../Node";
import {ActivationType} from "../../methods/Activation";

export class DenseLayer extends Layer {
    constructor(outputSize: number, options: { activationType?: ActivationType } = {}) {
        super(outputSize);

        const activation: ActivationType = options.activationType ?? ActivationType.LogisticActivation;

        for (let i: number = 0; i < outputSize; i++) {
            const node: Node = new Node(NodeType.HIDDEN).setSquash(activation);
            this.nodes.push(node);
            this.inputNodes.add(node);
            this.outputNodes.add(node);
        }
    }
}
