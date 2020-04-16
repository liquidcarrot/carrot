import {ActivationType} from "../../../enums/ActivationType";
import {ConnectionType} from "../../../enums/ConnectionType";
import {NodeType} from "../../../enums/NodeType";
import {Node} from "../../Node";
import {Layer} from "../Layer";

export class HopfieldLayer extends Layer {
    constructor(outputSize: number) {
        super(outputSize);

        for(let i :number= 0; i < outputSize;i++){
            this.inputNodes.add(new Node(NodeType.HIDDEN));
            this.outputNodes.add(new Node(NodeType.HIDDEN).setSquash(ActivationType.StepActivation));
        }

        this.connections.push(...Layer.connect(this.inputNodes,this.outputNodes,ConnectionType.ALL_TO_ALL));
        this.connections.push(...Layer.connect(this.outputNodes,this.inputNodes,ConnectionType.ALL_TO_ALL));

        this.nodes.push(...Array.from(this.inputNodes));
        this.nodes.push(...Array.from(this.outputNodes));
    }

    public connectionTypeisAllowed(type: ConnectionType): boolean {
        return true;
    }

    public getDefaultIncomingConnectionType(): ConnectionType {
        return ConnectionType.ALL_TO_ALL;
    }
}
