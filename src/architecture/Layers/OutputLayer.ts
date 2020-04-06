import {Layer} from "../Layer";
import {Node} from "../Node";
import {NodeType} from "../../enums/NodeType";

export class OutputLayer extends Layer {
    constructor(outputSize: number) {
        super(outputSize);

        for (let i: number = 0; i < outputSize; i++) {
            const node: Node = new Node(NodeType.OUTPUT);
            this.nodes.push(node);
            this.inputNodes.add(node);
        }
    }

    public connect(): void {
        throw new ReferenceError("Could not connect an OutputLayer!");
    }
}
