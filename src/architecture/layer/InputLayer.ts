import {Layer} from "./Layer";
import {Node, NodeType} from "../Node";

export class InputLayer extends Layer {
    public constructor(outputSize: number) {
        super(outputSize);

        for (let i: number = 0; i < outputSize; i++) {
            const node: Node = new Node(NodeType.INPUT);
            this.nodes.push(node);
            this.outputNodes.add(node);
        }
    }
}
