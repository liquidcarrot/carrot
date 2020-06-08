import {ActivationType, Identitiy} from "activations/build/src";
import {ConnectionType} from "../../../enums/ConnectionType";
import {DropoutNode} from "../../Nodes/DropoutNode";
import {Layer} from "../Layer";

/**
 * Dropout layer
 */
export class DropoutLayer extends Layer {
    constructor(outputSize: number, options: {
        /**
         * The activation type for the output nodes of this layer.
         */
        activation?: ActivationType,
        /**
         * The dropout probability
         */
        probability?: number
    } = {}) {
        super(outputSize);

        const activation: ActivationType = options.activation ?? Identitiy;
        const probability: number = options.probability ?? 0.1;

        for (let i: number = 0; i < outputSize; i++) {
            this.inputNodes.add(new DropoutNode(probability).setActivationType(activation));
        }

        this.outputNodes = this.inputNodes;
        this.nodes.push(...Array.from(this.inputNodes));
    }

    /**
     * Gets the default connection type for a incoming connection to this layer.
     *
     * @returns the default incoming connection
     */
    public getDefaultIncomingConnectionType(): ConnectionType {
        return ConnectionType.ONE_TO_ONE;
    }

    /**
     * Checks if a given connection type is allowed on this layer.
     *
     * @param type the type to check
     *
     * @return Is this connection type allowed?
     */
    public connectionTypeisAllowed(type: ConnectionType): boolean {
        return type === ConnectionType.ONE_TO_ONE;
    }
}
