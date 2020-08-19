import { ActivationType, ALL_ACTIVATIONS } from "activations";
import {
  FEEDFORWARD_MUTATIONS,
  FitnessProportionateSelection,
  Mutation,
  Network,
  Selection,
} from "..";
import { lossType, MSELoss } from "../methods/Loss";
import { TrainOptions } from "./TrainOptions";

/**
 * Options used to evolve network
 */
export class EvolveOptions {
  /**
   * Maximum amount of episodes without improvement before removing a species
   */
  public maxStagnation: number;
  /**
   * How big could the distance be between a network and the represent of a species?
   */
  public speciesDistanceThreshold = 4;
  public c1 = 1;
  public c2 = 1;
  public c3 = 1;
  public survivors = 0.8;
  /**
   * Specify the amount of threads to use.
   */
  public threads: number;
  /**
   * The input size of the network.
   */
  public input: number;
  /**
   * The output size of the network.
   */
  public output: number;
  /**
   * A set of input values and ideal output values to evaluate a genome's fitness with. Must be included to use `NEAT.evaluate` without passing a dataset.
   */
  public dataset?: {
    /**
     * The input values
     */
    input: number[];
    /**
     * The target output values
     */
    output: number[];
  }[];
  /**
   * Num of generations already done.
   */
  public generation: number;
  /**
   * Train options used for training in between two evolution steps
   */
  public training?: TrainOptions;
  /**
   * A template network to create the population from.
   */
  public template: Network;
  /**
   * Sets allowed [mutation methods](Mutation) for evolution, a random mutation method will be chosen from the array when mutation occurs. Optional, but default methods are non-recurrent.
   */
  public mutations: Mutation[];
  /**
   * Sets allowed activations for evolution, a random activation method will be chosen from the array when activation mutation occurs.
   */
  public activations: ActivationType[];
  /**
   * [Selection method](selection) for evolution (e.g. methods.Selection.FITNESSPROPORTIONATE).
   */
  public selection: Selection;
  /**
   * Sets the mutation rate. If set to 0.3, 30% of the new population will be mutated.
   */
  public mutationRate: number;
  /**
   * If mutation occurs (randomNumber < mutationRate), sets amount of times a mutation method will be applied to the network.
   */
  public mutationAmount: number;
  /**
   * Elitism of every evolution loop. [Elitism in genetic algorithms.](https://www.researchgate.net/post/WhatismeantbythetermElitismintheGeneticAlgorithm)
   */
  public elitism: number;
  /**
   * Population size of each generation.
   */
  public populationSize: number;
  /**
   * A fitness function to evaluate the networks. Takes a `genome`, i.e. a [network](Network), and a `dataset` and sets the genome's score property
   *
   * @param population The population which needs to be evaluated
   * @param dataset The dataset to test the networks.
   */
  public fitnessFunction?: (
    population: Network[],
    dataset?: {
      /**
       * The input values
       */
      input: number[];
      /**
       * The target output values
       */
      output: number[];
    }[]
  ) => Promise<void>;
  /**
   * Specify the loss function for the evolution, this tells a genome in the population how well it's performing. Default: methods.loss.MSE (recommended).
   */
  public loss: lossType;
  /**
   * Maximum nodes for a potential network
   */
  public maxNodes: number;
  /**
   * Maximum connections for a potential network
   */
  public maxConnections: number;
  /**
   * Maximum gates for a potential network
   */
  public maxGates: number;
  /**
   * If set to true when [Network.crossOver](Network.crossOver) runs it will assume both genomes are equally fit.
   */
  public equal: boolean;
  /**
   * If set to n, outputs training status every n iterations. Setting `log` to 1 will log the status every iteration
   */
  public log: number;
  /**
   * You can schedule tasks to happen every n iterations. Paired with `options.schedule.function`
   */
  public schedule?: {
    /**
     * You can schedule tasks to happen every n iterations. Paired with `options.schedule.function`
     */
    iterations: number;
    /**
     * A function to run every n iterations as set by `options.schedule.iterations`. Passed as an object with a "function" property that contains the function to run.
     *
     * @param fitness the fitness value of the best genome
     * @param error the current network error
     * @param iteration the current iteration count
     */
    function: (fitness: number, error: number, iteration: number) => undefined;
  };
  /**
   * If set to true, will clear the network after every activation. This is useful for evolving recurrent networks, more importantly for time series prediction.
   */
  public clear: boolean;
  /**
   * Set the maximum amount of iterations/generations for the algorithm to run.
   */
  public iterations: number;
  /**
   * Set the target error. The algorithm will stop once this target error has been reached.
   */
  public error: number;

  constructor() {
    this.input = 1;
    this.output = 1;
    this.generation = 0;
    this.elitism = 1;
    this.equal = true;
    this.clear = false;
    this.populationSize = 50;
    this.mutationRate = 0.6;
    this.mutationAmount = 5;

    this.selection = new FitnessProportionateSelection();
    this.loss = MSELoss;
    this.mutations = FEEDFORWARD_MUTATIONS;
    this.activations = Object.values(ALL_ACTIVATIONS);
    this.template = new Network(this.input, this.output);
    this.maxNodes = Infinity;
    this.maxConnections = Infinity;
    this.maxGates = Infinity;
    this.threads = 4;
    this.log = -1;
    this.iterations = 1000;
    this.error = 0.05;
    this.maxStagnation = 3;
  }
}
