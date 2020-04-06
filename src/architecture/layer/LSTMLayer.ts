import {Layer} from "./Layer";
import {Activation, ActivationType} from "../../methods/Activation";
import {Node, NodeType} from "../Node";
import {ConnectionType, GatingType} from "../Architect";
import {Connection} from "../Connection";

// TODO BUG FIX
// Maybe consider using memory layers inside the LSTM Layer
export class LSTMLayer extends Layer {

    constructor(outputSize: number, options: { activationType?: ActivationType } = {}) {
        super(outputSize);


        const inputGate: Node[] = [];
        const forgetGate: Node[] = [];
        const memoryCell: Node[] = [];
        const outputGate: Node[] = [];

        for (let i: number = 0; i < outputSize; i++) {
            this.inputNodes.add(new Node(NodeType.HIDDEN));
            inputGate.push(new Node(NodeType.HIDDEN));
            forgetGate.push(new Node(NodeType.HIDDEN));
            memoryCell.push(new Node(NodeType.HIDDEN));
            outputGate.push(new Node(NodeType.HIDDEN));
            this.outputNodes.add(new Node(NodeType.HIDDEN));
        }

        inputGate.forEach(node => node.bias = 1);
        forgetGate.forEach(node => node.bias = 1);
        outputGate.forEach(node => node.bias = 1);

        this.connections.push(...Layer.connect(memoryCell, inputGate, ConnectionType.ALL_TO_ALL));
        this.connections.push(...Layer.connect(memoryCell, forgetGate, ConnectionType.ALL_TO_ALL));
        this.connections.push(...Layer.connect(memoryCell, outputGate, ConnectionType.ALL_TO_ALL));
        const forgetGateConnections: Connection[] = Layer.connect(memoryCell, memoryCell, ConnectionType.ONE_TO_ONE);
        const outputGateConnections: Connection[] = Layer.connect(memoryCell, this.outputNodes, ConnectionType.ALL_TO_ALL);
        this.connections.push(...forgetGateConnections);
        this.connections.push(...outputGateConnections);

        this.connections.push(...Layer.connect(this.inputNodes, memoryCell, ConnectionType.ALL_TO_ALL));
        this.connections.push(...Layer.connect(this.inputNodes, outputGate, ConnectionType.ALL_TO_ALL));
        this.connections.push(...Layer.connect(this.inputNodes, forgetGate, ConnectionType.ALL_TO_ALL));
        const inputGateConnections: Connection[] = Layer.connect(this.inputNodes, inputGate, ConnectionType.ALL_TO_ALL);
        this.connections.push(...inputGateConnections);

        this.gates.push(...Layer.gate(forgetGate, forgetGateConnections, GatingType.SELF));
        this.gates.push(...Layer.gate(outputGate, outputGateConnections, GatingType.OUTPUT));
        this.gates.push(...Layer.gate(inputGate, inputGateConnections, GatingType.INPUT));

        this.nodes.push(...Array.from(this.inputNodes));
        this.nodes.push(...inputGate);
        this.nodes.push(...forgetGate);
        this.nodes.push(...memoryCell);
        this.nodes.push(...outputGate);
        this.nodes.push(...Array.from(this.outputNodes));


        const activation: Activation = Activation.getActivation(options.activationType ?? ActivationType.LogisticActivation);
        this.outputNodes.forEach(node => node.squash = activation);
    }
}
