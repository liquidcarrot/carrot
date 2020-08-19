import { ActivationType, Identitiy } from "activations";
import { ConnectionType, NodeType } from "../../..";
import { Node } from "../../Node";
import { Layer } from "../Layer";

/**
 * Output layer
 */
export class OutputLayer extends Layer {
  constructor(
    outputSize: number,
    options: {
      /**
       * The activation type for the output nodes of this layer.
       */
      activation?: ActivationType;
    } = {}
  ) {
    super(outputSize);

    const activation: ActivationType = options.activation ?? Identitiy;
    for (let i = 0; i < outputSize; i++) {
      this.inputNodes.add(
        new Node(NodeType.OUTPUT).setActivationType(activation)
      );
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
