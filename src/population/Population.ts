import { lossType } from "../methods/Loss";
import { datasetType, fitnessFunction } from "../enums/types";
import { ActivationType } from "activations/build/src";
import { Network } from "../architecture/Network";
import { EvolveOptions } from "../interfaces/EvolveOptions";
import { Selection } from "../methods/Selection";
import { Mutation } from "../methods/Mutation";
import { pickRandom } from "../utils/Utils";

export abstract class Population {
  protected readonly populationSize: number;
  public networks: Network[];
  protected generation: number;

  protected constructor(
    populationSize: number,
    options: {
      template?: Network | undefined;
      inputSize?: number;
      outputSize?: number;
    }
  ) {
    // Initialize variables
    this.generation = 0;
    this.populationSize = populationSize;

    // Create Networks
    this.networks = this.createNetworks(options.template, options.inputSize, options.outputSize);
  }

  /**
   * Evolves the network to reach a lower error on a dataset using the [NEAT algorithm](http://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf)
   * @param options the evolve options {@linkcode EvolveOptions}
   */
  public evolve(options: EvolveOptions): Network {
    this.calculateScores(options.fitnessFunction, options.dataset, options.loss);
    while (this.generation < options.iterations) {
      this.sortNetworks();
      this.networks = this.breed(options.selection, options.elitism);
      this.mutate(options.mutations, options.mutationRate, options.mutationAmount, {
        elitists: options.elitism,
        maxNodes: options.maxNodes,
        maxConnections: options.maxConnections,
        maxGates: options.maxGates,
        activations: options.activations,
      });
      this.calculateScores(options.fitnessFunction, options.dataset, options.loss);

      this.generation++;
      if (options.log && options.log % this.generation === 0) this.log();
    }

    const best = this.getBest();
    this.networks.forEach((network) => (network.score = undefined));
    return best;
  }

  /**
   * Returns the best network.
   */
  public getBest(): Network {
    this.sortNetworks(); // sort the array descending
    return this.networks[0]; // return the first one
  }

  /**
   * Returns a random network of this population
   */
  public getRandom(): Network {
    return pickRandom(this.networks);
  }

  /**
   * Sort networks in descending order
   * @protected
   */
  protected sortNetworks(): void {
    this.networks = this.networks.sort((a: Network, b: Network) => {
      if (!a.score || !b.score) throw new ReferenceError("Scores not set before sorting network array!");
      else return b.score - a.score;
    });
  }

  /**
   * Breeding the new population
   * @param selection [Selection method](selection) for evolution (e.g. methods.Selection.FITNESSPROPORTIONATE).
   * @param elitism Elitism of every evolution loop. [Elitism in genetic algorithms.](https://www.researchgate.net/post/WhatismeantbythetermElitismintheGeneticAlgorithm)
   * @protected
   */
  protected abstract breed(selection: Selection, elitism: number): Network[];

  /**
   * Mutate the population.
   * @param mutations Sets allowed [mutation methods](Mutation) for evolution, a random mutation method will be chosen from the array when mutation occurs. Optional, but default methods are non-recurrent.
   * @param mutationRate Sets the mutation rate. If set to 0.3, 30% of the new population will be mutated.
   * @param mutationAmount If mutation occurs (randomNumber < mutationRate), sets amount of times a mutation method will be applied to the network.
   * @param options more options relevant for the mutation functions
   * @protected
   */
  protected abstract mutate(
    mutations: Mutation[],
    mutationRate: number,
    mutationAmount: number,
    options: {
      elitists: number;
      maxNodes: number;
      maxConnections: number;
      maxGates: number;
      activations: ActivationType[];
    }
  ): void;

  /**
   * Create networks to initialize this population
   * @param template the template which gets copied for the whole population if provided
   * @param inputSize if no template is given creating new networks with this input size
   * @param outputSize if no template is given creating new networks with this output size
   * @protected
   */
  protected createNetworks(template?: Network, inputSize?: number, outputSize?: number): Network[] {
    const networks = [];
    for (let i = 0; i < this.populationSize; i++) {
      if (template) networks.push(template.deepCopy());
      else if (inputSize && outputSize) networks.push(new Network(inputSize, outputSize, false));
      else throw new Error("You must provide either a template network or input and output size!");
    }
    return networks;
  }

  /**
   * Logging after one epoch.
   * @protected
   */
  protected log(): void {
    console.log("Generation: " + this.generation + "; Error: " + this.getBest().score);
  }

  /**
   * Calculate scores of every network in population.
   *
   * There are 3 ways here:
   * 1. User provides his own fitness function which accepts a network array and dataset (if defined)
   * 2. User provides a dataset
   * 3. User sets the scores of all networks on it's own
   *
   * @param fitnessFunction the fitness function provided by the user
   * @param dataset the dataset provided by the user
   * @param loss the loss function
   * @protected
   */
  protected calculateScores(fitnessFunction?: fitnessFunction, dataset?: datasetType, loss?: lossType): void {
    if (fitnessFunction) {
      fitnessFunction(this.networks, dataset);
    } else if (dataset) {
      for (const network of this.networks) {
        network.score = -network.test(dataset, loss);
      }
    } else {
      let hasScores: boolean = true;
      this.networks.forEach((network) => {
        if (!network.score) hasScores = false;
      });
      if (!hasScores)
        throw new Error("If network scores aren't set, you have to specify a fitness function or a dataset!");
    }
  }
}
