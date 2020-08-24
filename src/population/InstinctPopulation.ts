import { Population } from "./Population";
import { ActivationType } from "activations/build/src";
import { randDouble } from "../utils/Utils";
import { Network } from "../architecture/Network";
import { Selection } from "../methods/Selection";
import { Mutation } from "../methods/Mutation";

export class InstinctPopulation extends Population {
  constructor(
    populationSize: number,
    options: {
      template?: Network | undefined;
      inputSize?: number;
      outputSize?: number;
    }
  ) {
    super(populationSize, options);
  }

  /**
   * Breeding the new population
   * @param selection [Selection method](selection) for evolution (e.g. methods.Selection.FITNESSPROPORTIONATE).
   * @param elitism Elitism of every evolution loop. [Elitism in genetic algorithms.](https://www.researchgate.net/post/WhatismeantbythetermElitismintheGeneticAlgorithm)
   * @protected
   */
  protected breed(selection: Selection, elitism: number): Network[] {
    if (elitism > this.populationSize) throw new RangeError("Can`t evolve! Elitism exceeds population size!");

    // create new population
    const newPopulation: Network[] = [];
    // add elitists
    for (let i = 0; i < elitism; i++) newPopulation.push(this.networks[i]);
    // add offsprings
    while (newPopulation.length < this.populationSize) newPopulation.push(this.getOffspring(selection));

    return newPopulation;
  }

  /**
   * Mutate the population.
   * @param mutations Sets allowed [mutation methods](Mutation) for evolution, a random mutation method will be chosen from the array when mutation occurs. Optional, but default methods are non-recurrent.
   * @param mutationRate Sets the mutation rate. If set to 0.3, 30% of the new population will be mutated.
   * @param mutationAmount If mutation occurs (randomNumber < mutationRate), sets amount of times a mutation method will be applied to the network.
   * @param options more options relevant for the mutation functions
   * @protected
   */
  protected mutate(
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
  ): void {
    // iterate over all networks except elitists
    for (let i = options.elitists; i < this.networks.length; i++) {
      // randomly decide whether to mutate or not
      if (randDouble() <= mutationRate) {
        // run mutations
        for (let j = 0; j < mutationAmount; j++) this.networks[i].mutateRandom(mutations, options);
      }
    }
  }

  /**
   * Create the offspring by selecting two parent and crossover them
   * @param selection the selection method used to select the parents
   * @private
   */
  private getOffspring(selection: Selection): Network {
    const parent1 = selection.select(this.networks);
    const parent2 = selection.select(this.networks);
    return Network.crossover(parent1, parent2);
  }
}
