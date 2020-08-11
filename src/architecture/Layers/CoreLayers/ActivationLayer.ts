import {ActivationType, Logistic} from 'activations/build/src';
import {ConnectionType} from '../../../enums/ConnectionType';
import {ActivationNode} from '../../Nodes/ActivationNode';
import {Layer} from '../Layer';

/**
 * Activation layer
 */
export class ActivationLayer extends Layer {
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

    const activation: ActivationType = options.activation ?? Logistic;

    for (let i = 0; i < outputSize; i++) {
      this.inputNodes.add(new ActivationNode().setActivationType(activation));
    }

    this.outputNodes = this.inputNodes;
    this.nodes.push(...Array.from(this.inputNodes));
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

  /**
   * Gets the default connection type for a incoming connection to this layer.
   *
   * @returns the default incoming connection
   */
  public getDefaultIncomingConnectionType(): ConnectionType {
    return ConnectionType.ONE_TO_ONE;
  }
}
