import { pairing } from "../utils/Utils";
import { Population } from "./Population";
import { ActivationType } from "activations";
import { Network } from "../architecture/Network";
import { Species } from "../architecture/Species";
import { Selection } from "../methods/Selection";
import { Mutation } from "../methods/Mutation";
import { AddConnectionMutation, AddNodeMutation, ModBiasMutation, ModWeightMutation } from "../methods/NEATMutation";
import { Connection } from "../architecture/Connection";
import { Node } from "../architecture/Node";

export class NEATPopulation extends Population {
  public static nodeCounter: number = -1;
  public static connCounter: number = -1;
  public static nodeIDs: Map<number, number>;
  public static connIDs: Map<number, number>;
  public static excessCoefficient: number;
  public static weightDiffCoefficient: number;
  public static distanceThreshold: number;
  private static survivorRate: number;
  private static speciesStagnationLimit: number;
  private static populationStagnationLimit: number;
  private species: Species[];
  private stagnation: number;
  private highScore: number;

  constructor(
    populationSize: number,
    options: {
      template?: Network | undefined;
      inputSize?: number;
      outputSize?: number;
      excessCoefficient?: number;
      weightDiffCoefficient?: number;
      survivorRate?: number;
      speciesDistanceThreshold?: number;
      speciesStagnationLimit?: number;
      populationStagnationLimit?: number;
    }
  ) {
    super(populationSize, options);
    this.stagnation = 0;
    this.species = [];
    this.highScore = -Infinity;
    NEATPopulation.excessCoefficient = options.excessCoefficient ?? 1;
    NEATPopulation.weightDiffCoefficient = options.weightDiffCoefficient ?? 1;
    NEATPopulation.survivorRate = options.survivorRate ?? 0.5;
    NEATPopulation.distanceThreshold = options.speciesDistanceThreshold ?? 2;
    NEATPopulation.speciesStagnationLimit = options.speciesStagnationLimit ?? 15;
    NEATPopulation.populationStagnationLimit = options.populationStagnationLimit ?? 15;
  }

  /**
   * Add a connection
   * @param node1ID
   * @param node2ID
   * @param newConnection
   */
  public static addConnection(node1ID: number, node2ID: number, newConnection: Connection): void {
    const cantorPair = pairing(node1ID, node2ID);
    if (NEATPopulation.connIDs.has(cantorPair)) {
      newConnection.id = NEATPopulation.connIDs.get(cantorPair) ?? -1;
    } else {
      NEATPopulation.connCounter++;
      NEATPopulation.connIDs.set(cantorPair, NEATPopulation.connCounter);
      newConnection.id = NEATPopulation.connCounter;
    }
  }

  /**
   * Add a node
   * @param node1ID
   * @param node2ID
   * @param newNode
   */
  public static addNode(node1ID: number, node2ID: number, newNode: Node): void {
    const cantorPair = pairing(node1ID, node2ID);
    if (NEATPopulation.nodeIDs.has(cantorPair)) {
      newNode.id = NEATPopulation.nodeIDs.get(cantorPair) ?? -1;
    } else {
      NEATPopulation.nodeCounter++;
      NEATPopulation.nodeIDs.set(cantorPair, NEATPopulation.nodeCounter);
      newNode.id = NEATPopulation.nodeCounter;
    }
  }

  /**
   * Breeding the new population
   * @param selection [Selection method](selection) for evolution (e.g. methods.Selection.FITNESSPROPORTIONATE).
   * @param elitism Elitism of every evolution loop. [Elitism in genetic algorithms.](https://www.researchgate.net/post/WhatismeantbythetermElitismintheGeneticAlgorithm)
   * @protected
   */
  protected breed(selection: Selection, elitism: number): Network[] {
    this.speciate(); // create species
    this.calculateScores(); // calculate scores for every network
    this.species.forEach((species: Species) => species.updateScore()); // update scores of all species
    this.sortSpecies(); // sort the species array by score

    // check for stagnation
    if (this.species[0].highScore > this.highScore) {
      // new high score
      this.stagnation = 0;
      this.highScore = this.species[0].highScore;
    } else {
      // increase stagnation counter
      this.stagnation++;
      if (this.stagnation > NEATPopulation.populationStagnationLimit) {
        this.killStalePopulation();
      }
    }

    // remove a percentage of networks from each species
    this.cullSpecies(1 - NEATPopulation.survivorRate);
    // remove species that stagnate
    this.killStaleSpecies();
    // remove species that aren't able to breed children
    this.killBadSpecies();
    // reproduce the population by breeding new children
    return this.reproduce(selection);
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
    this.networks.forEach((network) => {
      if (Math.random() <= 0.7) {
        new AddNodeMutation().mutate(network);
      }
      if (Math.random() <= 0.4) {
        new AddConnectionMutation().mutate(network);
      }
      if (Math.random() <= 0.4 && network.connections.size > 0) {
        new ModWeightMutation().mutate(network);
      }
      if (Math.random() <= 0.4) {
        new ModBiasMutation().mutate(network);
      }
    });

    // copy the best networks over
    this.species.forEach((species) => species.put(species.bestNetwork));
  }

  /**
   * Create networks to initialize this population
   * @param template the template which gets copied for the whole population if provided
   * @param inputSize if no template is given creating new networks with this input size
   * @param outputSize if no template is given creating new networks with this output size
   * @protected
   */
  protected createNetworks(template?: Network, inputSize?: number, outputSize?: number): Network[] {
    if (template) {
      NEATPopulation.nodeIDs = this.createNodeIDsFromTemplate(template);
      NEATPopulation.connIDs = this.createConnIDsFromTemplate(template);
    }
    const networks = [];
    for (let i = 0; i < this.populationSize; i++) {
      if (template) networks.push(template.deepCopy());
      else if (inputSize && outputSize) networks.push(new Network(inputSize, outputSize, true));
      else throw new Error("You must provide either a template network or input and output size!");
    }
    networks.forEach((network) => {
      for (let i = 0; i < network.nodes.length; i++) {
        network.nodes[i].id = i;
      }
    });
    NEATPopulation.nodeIDs = this.createNodeIDsFromTemplate(networks[0]);
    NEATPopulation.connIDs = this.createConnIDsFromTemplate(networks[0]);

    return networks;
  }

  /**
   * Logging after one epoch.
   * @protected
   */
  protected log(): void {
    console.log("----------------------------");
    console.log("Generation: " + this.generation);
    console.log("Error: " + this.getBest().score);
    console.log("Num of species: " + this.species.length);
    for (const species of this.species) {
      console.log(species.toString());
    }
  }

  /**
   * Kills species that continue to stagnate
   * @private
   */
  private killStaleSpecies(): void {
    this.species = this.species.filter((species) => species.stagnation < NEATPopulation.speciesStagnationLimit);
  }

  /**
   * Sort species by their highest scoring network
   * @private
   */
  private sortSpecies(): void {
    this.species = this.species.sort((a: Species, b: Species) => {
      if (a.highScore && b.highScore) return b.highScore - a.highScore;
      else if (a.highScore) return -1;
      else if (b.highScore) return 1;
      else return 0;
    });
  }

  private createNodeIDsFromTemplate(template: Network): Map<number, number> {
    const nodeIDs = new Map<number, number>();
    template.nodes
      .filter((node) => node.isInputNode())
      .forEach((node) => {
        NEATPopulation.nodeCounter++;
        nodeIDs.set(NEATPopulation.nodeCounter, NEATPopulation.nodeCounter);
        node.id = NEATPopulation.nodeCounter;
      });
    template.nodes
      .filter((node) => node.isOutputNode())
      .forEach((node) => {
        NEATPopulation.nodeCounter++;
        nodeIDs.set(NEATPopulation.nodeCounter, NEATPopulation.nodeCounter);
        node.id = NEATPopulation.nodeCounter;
      });
    template.nodes
      .filter((node) => node.isHiddenNode())
      .forEach((node) => {
        NEATPopulation.nodeCounter++;
        nodeIDs.set(NEATPopulation.nodeCounter, NEATPopulation.nodeCounter);
        node.id = NEATPopulation.nodeCounter;
      });
    return nodeIDs;
  }

  private createConnIDsFromTemplate(template: Network): Map<number, number> {
    if (NEATPopulation.nodeCounter === 0) throw new ReferenceError("Can't create connection ids without node ids");

    const connIDs = new Map<number, number>();
    template.connections.forEach((connection) => {
      NEATPopulation.connCounter++;
      connIDs.set(pairing(connection.from.id, connection.to.id), NEATPopulation.connCounter);
      connection.id = NEATPopulation.connCounter;
    });
    return connIDs;
  }

  /**
   * Create species.
   * Put networks with a specific distance into the same species
   * @private
   */
  private speciate(): void {
    this.species.forEach((species) => species.reset());
    this.networks.forEach((genome) => {
      let found = false;
      for (const species of this.species) {
        if (species.isCompatible(genome)) {
          species.put(genome);
          found = true;
          break;
        }
      }
      if (!found) {
        this.species.push(new Species(genome));
      }
    });
  }

  /**
   * Removing a percentage of bad networks from each species
   * @param killRate the percentage of kills in each species
   * @private
   */
  private cullSpecies(killRate: number): void {
    this.species.forEach((species) => {
      species.cull(killRate);
      species.fitnessSharing();
    });
  }

  /**
   * Remove bad performing species
   * @private
   */
  private killBadSpecies(): void {
    const averageSum = this.sumOfAvgAdjustedFitnessScores();
    this.species = this.species.filter(
      (species) => (species.getAvgAdjustedScore() / averageSum) * this.populationSize >= 1
    );
  }

  /**
   * Sum up the average adjusted scores from all species.
   * @private
   */
  private sumOfAvgAdjustedFitnessScores(): number {
    let sum: number = 0;
    for (const species of this.species) {
      sum += species.getAvgAdjustedScore();
    }
    return sum;
  }

  /**
   * Reproduce the population
   * 1. Add the champion to the new population if species size is greater than or equal 5
   * 2. Calculate number of children breed by each species
   * 3. Breed children
   * 4. Fill up the population
   * 5. Overwrite old population
   * @private
   */
  private reproduce(selection: Selection): Network[] {
    if (this.species.length === 0) {
      throw new RangeError("Species length should never be 0!");
    }

    const averageSum = this.sumOfAvgAdjustedFitnessScores();
    const newPopulation: Network[] = [];
    for (const species of this.species) {
      // calculate the number of children from this species
      const avgAdjustedScore = species.getAvgAdjustedScore();
      const numChildren: number = Math.floor((avgAdjustedScore / averageSum) * this.populationSize - 1);
      // breed new children and add them to the new population
      for (let i = 0; i < numChildren; i++) {
        newPopulation.push(species.breed(selection));
      }
    }
    // fill up the population leave one free for the champions
    while (newPopulation.length < this.populationSize - 1) {
      newPopulation.push(this.species[0].breed(selection));
    }
    // reset species
    this.species = [];
    return newPopulation;
  }

  /**
   * If the population stagnates kill all, but the 2 best species
   * @private
   */
  private killStalePopulation(): void {
    if (this.species.length <= 2) return;
    else this.species = this.species.slice(0, 2 - this.species.length);
  }
}
