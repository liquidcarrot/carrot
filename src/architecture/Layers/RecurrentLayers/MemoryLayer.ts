import { ActivationType, Identitiy, Logistic } from "activations";
import { ConnectionType, NodeType } from "../../..";
import { Node } from "../../Node";
import { Layer } from "../Layer";

/**
 * Memory layer
 */
export class MemoryLayer extends Layer {
  constructor(
    outputSize: number,
    options: {
      /**
       * The activation type for the output nodes of this layer.
       */
      activation?: ActivationType;
      /**
       * The size of the memory.
       */
      memorySize?: number;
    } = {}
  ) {
    super(outputSize);

    for (let i = 0; i < outputSize; i++) {
      this.inputNodes.add(new Node(NodeType.HIDDEN));
    }

    let prevNodes: Node[] = Array.from(this.inputNodes);
    const nodes: Node[] = [];
    for (let i = 0; i < (options.memorySize ?? 1); i++) {
      const block: Node[] = [];
      for (let j = 0; j < outputSize; j++) {
        const node: Node = new Node(NodeType.HIDDEN);
        node.squash = Identitiy;
        node.bias = 0;
        block.push(node);
      }

      this.connections.push(...Layer.connect(prevNodes, block, ConnectionType.ONE_TO_ONE));
      nodes.push(...block);
      prevNodes = block;
    }

    this.nodes.push(...Array.from(this.inputNodes));
    this.nodes.push(...nodes.reverse());
    prevNodes.forEach((node) => this.outputNodes.add(node));

    this.outputNodes.forEach((node) => (node.squash = options.activation ?? Logistic));
  }

  /**
   * Checks if a given connection type is allowed on this layer.
   *
   * @return Is this connection type allowed?
   */
  public connectionTypeisAllowed(): boolean {
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
