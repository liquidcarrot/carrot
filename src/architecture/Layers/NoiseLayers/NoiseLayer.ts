import {ConnectionType} from "../../../enums/ConnectionType";
import {NoiseNodeType} from "../../../enums/NodeType";
import {IdentityActivation} from "../../../methods/Activation";
import {NoiseNode} from "../../Nodes/NoiseNode";
import {Layer} from "../Layer";

/**
 * Noise layer
 */
export class NoiseLayer extends Layer {
    constructor(outputSize: number, options: {
        /**
         * The activation type for the output nodes of this layer.
         */
        activation?: ((x: number, derivative: boolean) => number),
        /**
         * The mean value for gaussian noise
         */
        mean?: number,
        /**
         * The standard deviation for gaussian noise
         */
        deviation?: number
    } = {}) {
        super(outputSize);

        const activation: ((x: number, derivative: boolean) => number) = options.activation ?? IdentityActivation;

        for (let i: number = 0; i < outputSize; i++) {
            this.inputNodes.add(new NoiseNode({
                noiseType: NoiseNodeType.GAUSSIAN_NOISE,
                gaussian: options
            }).setActivationType(activation));
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