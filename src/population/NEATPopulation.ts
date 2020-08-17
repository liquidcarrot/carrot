import { Network, Species } from "..";
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

  protected fitnessEvaluation(): void {}

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
    return new Map<number, number>();
  }

  private createConnIDsFromTemplate(template: Network): Map<number, number> {
    return new Map<number, number>();
  }
}
