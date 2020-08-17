import { Network } from "..";
import { Population } from "./Population";

class InstinctPopulation extends Population {
  constructor(
    populationSize: number,
    option: {
      template: Network | undefined;
      inputSize: number;
      outputSize: number;
    }
  ) {
    super(populationSize, option);
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
    return [];
  }
}
