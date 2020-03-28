import {Layer} from "./Layer";
import {Node, NodeType} from "../Node";

export class DenseLayer extends Layer {
    constructor(inputSize: number, outputSize: number) {
        super(inputSize, outputSize);


        for (let i = 0; i < inputSize; i++) {
            this.nodes.push(new Node(NodeType.INPUT));
        }
        for (let i = 0; i < outputSize; i++) {
            this.nodes.push(new Node(NodeType.INPUT));
        }

        this.nodes
            .filter(node => node.type === NodeType.INPUT)
            .forEach(inputNode => {
                this.nodes
                    .filter(node => node.type === NodeType.OUTPUT)
                    .forEach(outputNode => {
                        this.connections.push(inputNode.connect(outputNode, 1));
                    });
            });
    }
}
