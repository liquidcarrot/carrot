import {ActivationType} from "../../../enums/ActivationType";
import {ConnectionType} from "../../../enums/ConnectionType";
import {NodeType} from "../../../enums/NodeType";
import {Node} from "../../Node";
import {Layer} from "../Layer";

export class RNNLayer extends Layer {
    constructor(outputSize: number, options: { activationType?: ActivationType } = {}) {
        super(outputSize);

        const activation: ActivationType = options.activationType ?? ActivationType.LogisticActivation;

        for (let i: number = 0; i < outputSize; i++) {
            this.inputNodes.add(new Node(NodeType.HIDDEN).setSquash(activation));
        }

        this.outputNodes = this.inputNodes;
        this.nodes.push(...Array.from(this.inputNodes));

        // Adding self connections
        this.connections.push(...Layer.connect(this.outputNodes, this.inputNodes, ConnectionType.ONE_TO_ONE));
    }

    public connectionTypeisAllowed(type: ConnectionType): boolean {
        return true;
    }

    public getDefaultIncomingConnectionType(): ConnectionType {
        return ConnectionType.ALL_TO_ALL;
    }
}
