import { ConnectionType, NodeType, NoiseLayer } from "../../..";
import { Node } from "../../Node";
import { Layer } from "../Layer";

/**
 * Input layer
 */
export class InputLayer extends Layer {
  public constructor(
    outputSize: number,
    options: {
      /**
       * The noise type
       */
      noise: boolean;
    } = { noise: false }
  ) {
    super(outputSize);

    for (let i = 0; i < outputSize; i++) {
      const node: Node = new Node(NodeType.INPUT);
      this.nodes.push(node);
    }

    if (options.noise) {
      const noiseLayer: NoiseLayer = new NoiseLayer(outputSize);
      noiseLayer.outputNodes.forEach((node) => this.outputNodes.add(node));
      this.connections.push(...Layer.connect(this.nodes, noiseLayer, noiseLayer.getDefaultIncomingConnectionType()));
    } else {
      this.nodes.forEach((node) => this.outputNodes.add(node));
    }
  }

  /**
   * Gets the default connection type for a incoming connection to this layer.
   *
   * @returns the default incoming connection
   */
  public getDefaultIncomingConnectionType(): ConnectionType {
    return ConnectionType.NO_CONNECTION;
  }

  /**
   * Checks if a given connection type is allowed on this layer.
   *
   * @param type the type to check
   *
   * @return Is this connection type allowed?
   */
  public connectionTypeisAllowed(type: ConnectionType): boolean {
    return type === ConnectionType.NO_CONNECTION;
  }
}
