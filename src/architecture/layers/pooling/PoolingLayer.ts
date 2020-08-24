import { Layer } from "../Layer";
import { ConnectionType } from "../../../enums/ConnectionType";

/**
 * Parent class for all pooling layers
 */
export abstract class PoolingLayer extends Layer {
  protected constructor(outputSize: number) {
    super(outputSize);
  }

  /**
   * Gets the default connection type for a incoming connection to this layer.
   *
   * @returns the default incoming connection
   */
  public getDefaultIncomingConnectionType(): ConnectionType {
    return ConnectionType.POOLING;
  }

  /**
   * Checks if a given connection type is allowed on this layer.
   *
   * @return Is this connection type allowed?
   */
  public connectionTypeisAllowed(): boolean {
    return true;
  }
}
