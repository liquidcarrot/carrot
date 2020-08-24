import { Connection } from "../Connection";
import { Node } from "../Node";
import { ConnectionType } from "../../enums/ConnectionType";
import { GatingType } from "../../enums/GatingType";

/**
 * Parent class for layers.
 */
export abstract class Layer {
  /**
   * The output size of the layer.
   */
  public readonly outputSize: number;
  /**
   * The nodes which gets connected to the previous layer.
   */
  public readonly inputNodes: Set<Node>;
  /**
   * The nodes which gets connected to the next layer.
   */
  public outputNodes: Set<Node>;
  /**
   * All nodes in this layer.
   */
  public readonly nodes: Node[];
  /**
   * All connections in this layer.
   */
  public readonly connections: Connection[];
  /**
   * All gates in this layer.
   */
  public readonly gates: Connection[];

  protected constructor(outputSize: number) {
    this.outputSize = outputSize;
    this.nodes = [];
    this.inputNodes = new Set<Node>();
    this.outputNodes = new Set<Node>();
    this.connections = [];
    this.gates = [];
  }

  /**
   * Connect two layers or sets of nodes.
   *
   * @param from origin nodes / Layer
   * @param to destination nodes / Layer
   * @param connectionType The type of connection
   * @param weight the initial weights for all new connections
   *
   * @returns all created connections
   */
  public static connect(
    from: Layer | Set<Node> | Node[],
    to: Layer | Set<Node> | Node[],
    connectionType: ConnectionType = ConnectionType.ALL_TO_ALL,
    weight: number = 1
  ): Connection[] {
    if (connectionType === ConnectionType.NO_CONNECTION) {
      throw new ReferenceError("Cannot connect with 'NO_CONNECTION' connection type");
    }

    const fromNodes: Node[] = Array.from(from instanceof Layer ? from.outputNodes : from);
    const toNodes: Node[] = Array.from(to instanceof Layer ? to.inputNodes : to);

    if (toNodes.length === 0) {
      throw new ReferenceError("Target from has no input nodes!");
    }
    if (fromNodes.length === 0) {
      throw new ReferenceError("This from has no output nodes!");
    }

    const connections: Connection[] = [];
    if (connectionType === ConnectionType.ALL_TO_ALL) {
      fromNodes.forEach((fromNode) => {
        toNodes.forEach((toNode) => {
          connections.push(fromNode.connect(toNode, weight)); // connect every "from node" to every "to node"
        });
      });
    } else if (connectionType === ConnectionType.ONE_TO_ONE) {
      if (fromNodes.length !== toNodes.length) {
        throw new RangeError(
          "Can't connect one to one! Number of output nodes from are unequal number of incoming nodes from next layer!"
        );
      }
      for (let i = 0; i < fromNodes.length; i++) {
        connections.push(fromNodes[i].connect(toNodes[i], weight)); // connect every nodes with same indices
      }
    } else if (connectionType === ConnectionType.POOLING) {
      // connect the same amount of input nodes to every output node
      // every input node has only one connection available
      const ratio: number = toNodes.length / fromNodes.length;
      connections.push(...fromNodes.map((node, index) => node.connect(toNodes[Math.floor(index * ratio)], weight)));
    }
    return connections;
  }

  /**
   * Gate nodes and connections.
   *
   * @param nodes the nodes which function as gateNodes
   * @param connections the connections which will be gated
   * @param gateType The type of gating
   *
   * @returns all gated connections
   */
  public static gate(nodes: Node[], connections: Connection[], gateType: GatingType): Connection[] {
    const gatedConnections: Connection[] = [];
    switch (gateType) {
      case GatingType.INPUT: {
        // gate incoming connections
        const toNodes: Node[] = Array.from(new Set(connections.map((conn) => conn.to)));

        for (let i = 0; i < toNodes.length; i++) {
          const node: Node = toNodes[i];
          const gateNode: Node = nodes[i % nodes.length];

          node.incoming.forEach((conn) => {
            if (connections.includes(conn)) {
              gateNode.addGate(conn);
              gatedConnections.push(conn);
            }
          });
        }
        break;
      }
      case GatingType.SELF: {
        // gate self connections
        const fromNodes: Node[] = Array.from(new Set(connections.map((conn) => conn.from)));

        for (let i = 0; i < fromNodes.length; i++) {
          if (connections.includes(fromNodes[i].selfConnection)) {
            nodes[i % nodes.length].addGate(fromNodes[i].selfConnection);
            gatedConnections.push(fromNodes[i].selfConnection);
          }
        }
        break;
      }
      case GatingType.OUTPUT: {
        // gate outgoing connections
        const fromNodes: Node[] = Array.from(new Set(connections.map((conn) => conn.from)));
        for (let i = 0; i < fromNodes.length; i++) {
          const node: Node = fromNodes[i];
          const gateNode: Node = nodes[i % nodes.length];

          node.outgoing.forEach((conn) => {
            if (connections.includes(conn)) {
              gateNode.addGate(conn);
              gatedConnections.push(conn);
            }
          });
        }
        break;
      }
    }

    return gatedConnections;
  }

  /**
   * Gets the default connection type for a incoming connection to this layer.
   *
   * @returns the default incoming connection
   */
  public abstract getDefaultIncomingConnectionType(): ConnectionType;

  /**
   * Checks if a given connection type is allowed on this layer.
   *
   * @param type the type to check
   *
   * @return Is this connection type allowed?
   */
  public abstract connectionTypeisAllowed(type: ConnectionType): boolean;
}
