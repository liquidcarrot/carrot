import {Layer} from "./Layer";
import {Activation, ActivationType, IdentityActivation} from "../../methods/Activation";
import {Node, NodeType} from "../Node";
import {ConnectionType} from "../Architect";

export class MemoryLayer extends Layer {
    constructor(outputSize: number, options: { memorySize?: number, activationType?: ActivationType } = {}) {
        super(outputSize);

        for (let i: number = 0; i < outputSize; i++) {
            this.inputNodes.add(new Node(NodeType.HIDDEN));
        }

        let prevNodes: Node[] = Array.from(this.inputNodes);
        const nodes: Node[] = [];
        for (let i: number = 0; i < (options.memorySize ?? 1); i++) {
            const block: Node[] = [];
            for (let j: number = 0; j < outputSize; j++) {
                const node: Node = new Node(NodeType.HIDDEN);
                node.squash = new IdentityActivation();
                node.bias = 0;
                block.push(node);
            }

            this.connections.push(...Layer.connect(prevNodes, block, ConnectionType.ONE_TO_ONE));
            nodes.push(...block);
            prevNodes = block;
        }

        this.nodes.push(...Array.from(this.inputNodes));
        this.nodes.push(...(nodes.reverse()));
        prevNodes.forEach(node => this.outputNodes.add(node));

        const activation: Activation = Activation.getActivation(options.activationType ?? ActivationType.LogisticActivation);
        this.outputNodes.forEach(node => node.squash = activation);
    }
}
