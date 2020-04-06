import {Layer} from "./Layer";
import {Node, NodeType} from "../Node";
import {ConnectionType} from "../Architect";

export class OutputLayer extends Layer {
    constructor(outputSize: number) {
        super(outputSize);

        for (let i: number = 0; i < outputSize; i++) {
            const node: Node = new Node(NodeType.OUTPUT);
            this.nodes.push(node);
            this.inputNodes.add(node);
        }
    }

    public connect(targetLayer: Layer, connectionType: ConnectionType): void {
        throw new ReferenceError("Could not connect an OutputLayer!");
    }
}
