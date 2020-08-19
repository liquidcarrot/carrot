import { ActivationType, Logistic, TANH } from "activations";
import { ConnectionType, GatingType, NodeType } from "../../..";
import { Connection } from "../../Connection";
import { Node } from "../../Node";
import { Layer } from "../Layer";

/**
 * LSTM layer
 */
export class LSTMLayer extends Layer {
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

    const inputGate: Node[] = [];
    const forgetGate: Node[] = [];
    const memoryCell: Node[] = [];
    const outputGate: Node[] = [];

    for (let i = 0; i < outputSize; i++) {
      this.inputNodes.add(new Node(NodeType.HIDDEN));
      inputGate.push(new Node(NodeType.HIDDEN).setBias(1));
      forgetGate.push(
        new Node(NodeType.HIDDEN).setBias(1).setActivationType(Logistic)
      );
      memoryCell.push(new Node(NodeType.HIDDEN));
      outputGate.push(new Node(NodeType.HIDDEN).setBias(1));
      this.outputNodes.add(new Node(NodeType.HIDDEN));
    }

    this.connections.push(
      ...Layer.connect(memoryCell, inputGate, ConnectionType.ALL_TO_ALL)
    );
    this.connections.push(
      ...Layer.connect(memoryCell, forgetGate, ConnectionType.ALL_TO_ALL)
    );
    this.connections.push(
      ...Layer.connect(memoryCell, outputGate, ConnectionType.ALL_TO_ALL)
    );
    const forgetGateConnections: Connection[] = Layer.connect(
      memoryCell,
      memoryCell,
      ConnectionType.ONE_TO_ONE
    );
    const outputGateConnections: Connection[] = Layer.connect(
      memoryCell,
      this.outputNodes,
      ConnectionType.ALL_TO_ALL
    );
    this.connections.push(...forgetGateConnections);
    this.connections.push(...outputGateConnections);

    this.connections.push(
      ...Layer.connect(this.inputNodes, memoryCell, ConnectionType.ALL_TO_ALL)
    );
    this.connections.push(
      ...Layer.connect(this.inputNodes, outputGate, ConnectionType.ALL_TO_ALL)
    );
    this.connections.push(
      ...Layer.connect(this.inputNodes, forgetGate, ConnectionType.ALL_TO_ALL)
    );
    const inputGateConnections: Connection[] = Layer.connect(
      this.inputNodes,
      inputGate,
      ConnectionType.ALL_TO_ALL
    );
    this.connections.push(...inputGateConnections);

    this.gates.push(
      ...Layer.gate(forgetGate, forgetGateConnections, GatingType.SELF)
    );
    this.gates.push(
      ...Layer.gate(outputGate, outputGateConnections, GatingType.OUTPUT)
    );
    this.gates.push(
      ...Layer.gate(inputGate, inputGateConnections, GatingType.INPUT)
    );

    this.nodes.push(...Array.from(this.inputNodes));
    this.nodes.push(...inputGate);
    this.nodes.push(...forgetGate);
    this.nodes.push(...memoryCell);
    this.nodes.push(...outputGate);
    this.nodes.push(...Array.from(this.outputNodes));

    this.outputNodes.forEach(
      (node) => (node.squash = options.activation ?? TANH)
    );
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
