import { Network } from "..";

export abstract class Population {
  protected readonly populationSize: number;
  protected networks: Iterable<Network>;
  private generation: number;

  protected constructor(
    populationSize: number,
    option: {
      template: Network | undefined;
      inputSize: number;
      outputSize: number;
    }
  ) {
    this.populationSize = populationSize;

    // Create Networks
    this.networks = this.createNetworks(option);

    // Initialize variables
    this.generation = 0;
  }

  public evolve() {
    this.selection();
    this.crossover();
    this.mutation();
    this.fitnessEvaluation();
    this.generation++;
  }

  protected abstract selection(): void;

  protected abstract crossover(): void;

  protected abstract mutation(): void;

  protected abstract fitnessEvaluation(): void;

  protected abstract createNetworks(option: {
    template: Network | undefined;
    inputSize: number;
    outputSize: number;
  }): Iterable<Network>;
}
