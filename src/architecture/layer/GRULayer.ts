import {Layer} from "./Layer";
import {Activation, ActivationType} from "../../methods/Activation";
import {Node, NodeType} from "../Node";
import {ConnectionType, GatingType} from "../Architect";
import {Connection} from "../Connection";

export class GRULayer extends Layer {
    constructor(outputSize: number, options: { activationType?: ActivationType } = {}) {
        super(outputSize);
        const updateGate: Node[] = [];
        const inverseUpdateGate: Node[] = [];
        const resetGate: Node[] = [];
        const memoryCell: Node[] = [];
        const previousOutput: Node[] = [];

        for (let i: number = 0; i < outputSize; i++) {
            this.inputNodes.add(new Node(NodeType.HIDDEN));
            updateGate.push(new Node(NodeType.HIDDEN).setBias(1));
            inverseUpdateGate.push(new Node(NodeType.HIDDEN).setBias(0).setSquash(ActivationType.InverseActivation));
            resetGate.push(new Node(NodeType.HIDDEN).setBias(0));
            memoryCell.push(new Node(NodeType.HIDDEN).setSquash(ActivationType.TanhActivation));
            previousOutput.push(new Node(NodeType.HIDDEN).setBias(0).setSquash(ActivationType.IdentityActivation));
            this.outputNodes.add(new Node(NodeType.HIDDEN));
        }

        this.connections.push(...Layer.connect(this.inputNodes, updateGate, ConnectionType.ALL_TO_ALL));
        this.connections.push(...Layer.connect(this.inputNodes, resetGate, ConnectionType.ALL_TO_ALL));
        this.connections.push(...Layer.connect(this.inputNodes, memoryCell, ConnectionType.ALL_TO_ALL));

        this.connections.push(...Layer.connect(previousOutput, updateGate, ConnectionType.ALL_TO_ALL));

        this.connections.push(...Layer.connect(updateGate, inverseUpdateGate, ConnectionType.ONE_TO_ONE, 1));

        this.connections.push(...Layer.connect(previousOutput, resetGate, ConnectionType.ALL_TO_ALL));

        const reset: Connection[] = Layer.connect(previousOutput, memoryCell, ConnectionType.ALL_TO_ALL);
        this.connections.push(...reset);
        this.gates.push(...Layer.gate(resetGate, reset, GatingType.OUTPUT));

        const update: Connection[] = Layer.connect(previousOutput, this.outputNodes, ConnectionType.ALL_TO_ALL);
        const inverseUpdate: Connection[] = Layer.connect(memoryCell, this.outputNodes, ConnectionType.ALL_TO_ALL);
        this.connections.push(...update);
        this.connections.push(...inverseUpdate);


        this.gates.push(...Layer.gate(updateGate, update, GatingType.OUTPUT));
        this.gates.push(...Layer.gate(inverseUpdateGate, inverseUpdate, GatingType.OUTPUT));

        this.connections.push(...Layer.connect(this.outputNodes, previousOutput, ConnectionType.ONE_TO_ONE, 1));

        this.nodes.push(...Array.from(this.inputNodes));
        this.nodes.push(...updateGate);
        this.nodes.push(...inverseUpdateGate);
        this.nodes.push(...resetGate);
        this.nodes.push(...memoryCell);
        this.nodes.push(...Array.from(this.outputNodes));
        this.nodes.push(...previousOutput);

        const activation: Activation = Activation.getActivation(options.activationType ?? ActivationType.LogisticActivation);
        this.outputNodes.forEach(node => node.squash = activation);
    }
}
