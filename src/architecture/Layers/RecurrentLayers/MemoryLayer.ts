import {ActivationType} from "../../../enums/ActivationType";
import {ConnectionType} from "../../../enums/ConnectionType";
import {NodeType} from "../../../enums/NodeType";
import {Activation, IdentityActivation} from "../../../methods/Activation";
import {Node} from "../../Node";
import {Layer} from "../Layer";

/**
 * Memory layer
 */
export class MemoryLayer extends Layer {
    constructor(outputSize: number, options: {
        /**
         * The activation type for the output nodes of this layer.
         */
        activationType?: ActivationType,
        /**
         * The size of the memory.
         */
        memorySize?: number
    } = {}) {
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
