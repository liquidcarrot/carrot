import {Layer} from "./Layer";
import {Node, NodeType} from "../Node";
import {Activation, ActivationType} from "../../methods/Activation";

// TODO: actually implement it
export class DenseLayer extends Layer {
    constructor(outputSize: number, options: { activationType?: ActivationType } = {}) {
        super(outputSize);

        for (let i: number = 0; i < outputSize; i++) {
            const node: Node = new Node(NodeType.HIDDEN);
            node.squash = Activation.getActivation(options.activationType ?? ActivationType.LogisticActivation);
            this.nodes.push(node);
            this.inputNodes.add(node);
            this.outputNodes.add(node);
        }
    }
}
