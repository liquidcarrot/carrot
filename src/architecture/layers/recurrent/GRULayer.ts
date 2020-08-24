import { ActivationType, Logistic, TANH } from "activations";
import { Connection } from "../../Connection";
import { Node } from "../../Node";
import { Layer } from "../Layer";
import { NodeType } from "../../../enums/NodeType";
import { ConnectionType } from "../../../enums/ConnectionType";
import { GatingType } from "../../../enums/GatingType";

/**
 * GRU layer
 */
export class GRULayer extends Layer {
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
    const updateGate: Node[] = [];
    const inverseUpdateGate: Node[] = [];
    const resetGate: Node[] = [];
    const memoryCell: Node[] = [];
    const previousOutput: Node[] = [];

    for (let i = 0; i < outputSize; i++) {
      this.inputNodes.add(new Node(NodeType.HIDDEN));
      updateGate.push(new Node(NodeType.HIDDEN).setBias(1));
      inverseUpdateGate.push(new Node(NodeType.HIDDEN).setBias(0).setActivationType(Logistic));
      resetGate.push(new Node(NodeType.HIDDEN).setBias(0));
      memoryCell.push(new Node(NodeType.HIDDEN).setActivationType(TANH));
      previousOutput.push(new Node(NodeType.HIDDEN).setBias(0).setActivationType(Logistic));
      this.outputNodes.add(new Node(NodeType.HIDDEN));
    }

    this.connections.push(...Layer.connect(this.inputNodes, updateGate, ConnectionType.ALL_TO_ALL));
    this.connections.push(...Layer.connect(this.inputNodes, resetGate, ConnectionType.ALL_TO_ALL));
    this.connections.push(...Layer.connect(this.inputNodes, memoryCell, ConnectionType.ALL_TO_ALL));

    this.connections.push(...Layer.connect(previousOutput, updateGate, ConnectionType.ALL_TO_ALL));

    this.connections.push(...Layer.connect(updateGate, inverseUpdateGate, ConnectionType.ONE_TO_ONE, 1));

    this.connections.push(...Layer.connect(previousOutput, resetGate, ConnectionType.ALL_TO_ALL));

    const reset: Connection[] = Layer.connect(previousOutput, memoryCell, ConnectionType.ALL_TO_ALL);
    this.connections.push(...reset);
    this.gates.push(...Layer.gate(resetGate, reset, GatingType.OUTPUT));

    const update: Connection[] = Layer.connect(previousOutput, this.outputNodes, ConnectionType.ALL_TO_ALL);
    const inverseUpdate: Connection[] = Layer.connect(memoryCell, this.outputNodes, ConnectionType.ALL_TO_ALL);
    this.connections.push(...update);
    this.connections.push(...inverseUpdate);

    this.gates.push(...Layer.gate(updateGate, update, GatingType.OUTPUT));
    this.gates.push(...Layer.gate(inverseUpdateGate, inverseUpdate, GatingType.OUTPUT));

    this.connections.push(...Layer.connect(this.outputNodes, previousOutput, ConnectionType.ONE_TO_ONE, 1));

    this.nodes.push(...Array.from(this.inputNodes));
    this.nodes.push(...updateGate);
    this.nodes.push(...inverseUpdateGate);
    this.nodes.push(...resetGate);
    this.nodes.push(...memoryCell);
    this.nodes.push(...Array.from(this.outputNodes));
    this.nodes.push(...previousOutput);

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
