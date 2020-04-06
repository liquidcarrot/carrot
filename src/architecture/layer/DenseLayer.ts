import {Layer} from "./Layer";
import {Node, NodeType} from "../Node";
import {Activation, ActivationType} from "../../methods/Activation";

export class DenseLayer extends Layer {
    constructor(outputSize: number, options: { activationType?: ActivationType } = {}) {
        super(outputSize);

        const activation: Activation = Activation.getActivation(options.activationType ?? ActivationType.LogisticActivation);

        for (let i: number = 0; i < outputSize; i++) {
            const node: Node = new Node(NodeType.HIDDEN);
            node.squash = activation;
            this.nodes.push(node);
            this.inputNodes.add(node);
            this.outputNodes.add(node);
        }
    }
}
