import {Layer} from "./Layer";
import {Node, NodeType} from "../Node";

export class DenseLayer extends Layer {
    constructor(inputSize: number, outputSize: number) {
        super(inputSize, outputSize);


        for (let i: number = 0; i < inputSize; i++) {
            this.nodes.push(new Node(NodeType.INPUT));
        }
        for (let i: number = 0; i < outputSize; i++) {
            this.nodes.push(new Node(NodeType.INPUT));
        }

        this.nodes
            .filter(node => node.isInputNode())
            .forEach(inputNode => {
                this.nodes
                    .filter(node => node.isOutputNode())
                    .forEach(outputNode => {
                        this.connections.push(inputNode.connect(outputNode, 1));
                    });
            });
    }
}
