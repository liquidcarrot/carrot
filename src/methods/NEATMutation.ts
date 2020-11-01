import { Mutation } from "./Mutation";
import { Network } from "../architecture/Network";
import { ActivationType } from "activations";
import { generateGaussian, pickRandom, randDouble } from "../utils/Utils";
import { Node } from "../architecture/Node";
import { NodeType } from "../enums/NodeType";
import { NEATPopulation } from "../population/NEATPopulation";

export class AddNodeMutation extends Mutation {
  /**
   * Mutates a given network.
   *
   * @param network the network to mutate
   * @param options you can set the max amount of nodes, connections and gates
   */
  public mutate(
    network: Network,
    options?: { maxNodes?: number; maxConnections?: number; maxGates?: number; allowedActivations?: ActivationType[] }
  ): void {
    const addingNodeToBackwardConnection = true; // TODO
    const connections = addingNodeToBackwardConnection
      ? Array.from(network.connections).filter((conn) => conn.from !== conn.to)
      : Array.from(network.connections).filter((conn) => conn.from.index < conn.to.index);

    if (connections.length === 0) return;

    // pick random connection
    const randomConnection = pickRandom(connections);

    // get from and to node
    const node1 = randomConnection.from;
    const node2 = randomConnection.to;

    // create new node and set id by pairing the from and to ids
    const newNode = new Node(NodeType.HIDDEN);
    NEATPopulation.addNode(node1.id, node2.id, newNode);

    // create new connections
    const connection1 = network.connect(node1, newNode, 1);
    const connection2 = network.connect(newNode, node2, randomConnection.weight);
    NEATPopulation.addConnection(node1.id, newNode.id, connection1);
    NEATPopulation.addConnection(newNode.id, node2.id, connection2);
  }
}

export class AddConnectionMutation extends Mutation {
  /**
   * Mutates a given network.
   *
   * @param network the network to mutate
   * @param options you can set the max amount of nodes, connections and gates
   */
  public mutate(
    network: Network,
    options?: { maxNodes?: number; maxConnections?: number; maxGates?: number; allowedActivations?: ActivationType[] }
  ): void {
    const possible: Node[][] = [];

    network.nodes.forEach((from) => {
      network.nodes.forEach((to) => {
        // no connection allowed from output to input
        if (from.type === NodeType.OUTPUT && to.type === NodeType.INPUT) return;
        // filter out already existing connections
        if (!from.isProjectingTo(to)) possible.push([from, to]);
      });
    });

    const nodes = pickRandom(possible);
    if (nodes.length === 0) return;

    // get nodes
    const node1 = nodes[0];
    const node2 = nodes[1];

    // create new connection
    const newConnection = network.connect(node1, node2, randDouble(-1, 1));
    NEATPopulation.addConnection(node1.id, node2.id, newConnection);
  }
}

export class ModWeightMutation extends Mutation {
  /**
   * Mutates a given network.
   *
   * @param network the network to mutate
   * @param options you can set the max amount of nodes, connections and gates
   */
  public mutate(
    network: Network,
    options?: { maxNodes?: number; maxConnections?: number; maxGates?: number; allowedActivations?: ActivationType[] }
  ): void {
    const randomConnection = pickRandom(network.connections);
    if (Math.random() < 0.1) {
      randomConnection.weight = randDouble(-1, 1);
    } else {
      randomConnection.weight += generateGaussian(0, 1 / 25);
      if (randomConnection.weight > 1) randomConnection.weight = 1;
      if (randomConnection.weight < -1) randomConnection.weight = -1;
    }
  }
}

export class ModBiasMutation extends Mutation {
  /**
   * Mutates a given network.
   *
   * @param network the network to mutate
   * @param options you can set the max amount of nodes, connections and gates
   */
  public mutate(
    network: Network,
    options?: { maxNodes?: number; maxConnections?: number; maxGates?: number; allowedActivations?: ActivationType[] }
  ): void {
    const randomNode = pickRandom(network.nodes);
    if (Math.random() < 0.1) {
      randomNode.bias = randDouble(-1, 1);
    } else {
      randomNode.bias += generateGaussian(0, 1 / 25);
      if (randomNode.bias > 1) randomNode.bias = 1;
      if (randomNode.bias < -1) randomNode.bias = -1;
    }
  }
}
