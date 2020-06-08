import {BinaryStep} from "activations/build/src";
import {ConnectionType} from "../../../enums/ConnectionType";
import {NodeType} from "../../../enums/NodeType";
import {Node} from "../../Node";
import {Layer} from "../Layer";

/**
 * Hopfield layer
 */
export class HopfieldLayer extends Layer {
    constructor(outputSize: number) {
        super(outputSize);

        for (let i: number = 0; i < outputSize; i++) {
            this.inputNodes.add(new Node(NodeType.HIDDEN));
            this.outputNodes.add(new Node(NodeType.HIDDEN).setActivationType(BinaryStep));
        }

        this.connections.push(...Layer.connect(this.inputNodes, this.outputNodes, ConnectionType.ALL_TO_ALL));
        this.connections.push(...Layer.connect(this.outputNodes, this.inputNodes, ConnectionType.ALL_TO_ALL));

        this.nodes.push(...Array.from(this.inputNodes));
        this.nodes.push(...Array.from(this.outputNodes));
    }

    /**
     * Checks if a given connection type is allowed on this layer.
     *
     * @param type the type to check
     *
     * @return Is this connection type allowed?
     */
    public connectionTypeisAllowed(type: ConnectionType): boolean {
        return true;
    }

    /**
     * Gets the default connection type for a incoming connection to this layer.
     *
     * @returns the default incoming connection
     */
    public getDefaultIncomingConnectionType(): ConnectionType {
        return ConnectionType.ALL_TO_ALL;
    }
}
