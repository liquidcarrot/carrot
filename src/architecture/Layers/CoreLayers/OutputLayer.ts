import {ConnectionType} from "../../../enums/ConnectionType";
import {NodeType} from "../../../enums/NodeType";
import {activationType, IdentityActivation} from "../../../methods/Activation";
import {Node} from "../../Node";
import {Layer} from "../Layer";

/**
 * Output layer
 */
export class OutputLayer extends Layer {
    constructor(outputSize: number, options: {
        /**
         * The activation type for the output nodes of this layer.
         */
        activation?: activationType
    } = {}) {
        super(outputSize);

        const activation: activationType = options.activation ?? IdentityActivation;
        for (let i: number = 0; i < outputSize; i++) {
            this.inputNodes.add(new Node(NodeType.OUTPUT).setActivationType(activation));
        }
        this.nodes.push(...Array.from(this.inputNodes));
    }

    /**
     * A outgoing connection is not allowed for an output layer!
     */
    public connect(): void {
        throw new ReferenceError("Could not connect an OutputLayer!");
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
