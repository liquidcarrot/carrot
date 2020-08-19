import { Network, Species } from "..";
import { pairing } from "../utils/Utils";
import { Population } from "./Population";

export class NEATPopulation extends Population {
  public static nodeCounter: number;
  public static connCounter: number;
  public static nodeIDs: Map<number, number>;
  public static connIDs: Map<number, number>;
  private species: Species[];

  constructor(
    populationSize: number,
    option: {
      template: Network | undefined;
      inputSize: number;
      outputSize: number;
    }
  ) {
    super(populationSize, option);

    this.species = [];
  }

  protected crossover(): void {}

  protected async fitnessEvaluation(): Promise<void> {}

  protected mutation(): void {}

  protected selection(): void {}

  protected createNetworks(option: {
    template: Network | undefined;
    inputSize: number;
    outputSize: number;
  }): Iterable<Network> {
    if (option.template) {
      NEATPopulation.nodeIDs = this.createNodeIDsFromTemplate(option.template);
      NEATPopulation.connIDs = this.createConnIDsFromTemplate(option.template);
    }
    let networks: Set<Network> = new Set<Network>();
    for (let i = 0; i < this.populationSize; i++) {
      if (option.template) networks.add(option.template.deepCopy());
      else networks.add(new Network(option.inputSize, option.outputSize));
    }
    return networks;
  }

  private createNodeIDsFromTemplate(template: Network): Map<number, number> {
    const nodeIDs = new Map<number, number>();
    template.nodes
      .filter((node) => node.isInputNode())
      .forEach((node) => {
        nodeIDs.set(NEATPopulation.nodeCounter, NEATPopulation.nodeCounter);
        node.id = NEATPopulation.nodeCounter;
        NEATPopulation.nodeCounter++;
      });
    template.nodes
      .filter((node) => node.isOutputNode())
      .forEach((node) => {
        nodeIDs.set(NEATPopulation.nodeCounter, NEATPopulation.nodeCounter);
        node.id = NEATPopulation.nodeCounter;
        NEATPopulation.nodeCounter++;
      });
    template.nodes
      .filter((node) => node.isHiddenNode())
      .forEach((node) => {
        nodeIDs.set(NEATPopulation.nodeCounter, NEATPopulation.nodeCounter);
        node.id = NEATPopulation.nodeCounter;
        NEATPopulation.nodeCounter++;
      });
    return nodeIDs;
  }

  private createConnIDsFromTemplate(template: Network): Map<number, number> {
    if (NEATPopulation.nodeCounter === 0)
      throw new ReferenceError("Can't create connection ids without node ids");

    const connIDs = new Map<number, number>();
    template.connections.forEach((connection) => {
      connIDs.set(
        pairing(connection.from.id, connection.to.id),
        NEATPopulation.connCounter
      );
      connection.id = NEATPopulation.connCounter;
      NEATPopulation.connCounter++;
    });
    return connIDs;
  }
}
