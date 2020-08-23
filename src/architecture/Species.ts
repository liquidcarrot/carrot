import { NEATPopulation, pickRandom, Selection } from "..";
import { Network } from "./Network";

/**
 * A class holding a species
 */
export class Species {
  /**
   * The representative network of this species
   * @private
   */
  public representative: Network;

  /**
   * The member networks in this species
   * @private
   */
  public readonly members: Set<Network>;
  /**
   * The score of this species
   * @private
   */
  public score: number;
  public highScore: number;

  public stagnation: number;
  public bestNetwork: Network;
  private avgScore: number;

  constructor(representative: Network) {
    this.representative = representative;

    this.members = new Set<Network>();
    this.members.add(representative);
    this.highScore = -Infinity;
    this.score = 0;
    this.avgScore = 0;
    this.stagnation = 0;
    this.bestNetwork = representative.deepCopy();
  }

  /**
   * Returns whether a genome is compatible with the species or not
   *
   * @param {Network} network An array of genomes to determine compatibility with (currently assumes two)
   * @return {boolean} Whether a genome is compatible with the species
   */
  public isCompatible(network: Network): boolean {
    return (
      network.distance(this.representative, NEATPopulation.c1, NEATPopulation.c2, NEATPopulation.c3) <
      NEATPopulation.distanceThreshold
    );
  }

  /**
   * Puts a network to the species without checking the distance
   * @param network
   */
  public put(network: Network): void {
    this.members.add(network);
  }

  /**
   * Update the score of this species and updating the best network.
   */
  public updateScore(representativeIsBest: boolean = true): void {
    this.fitnessSharing();
    this.score = this.sumScores();

    // Get the score of the best member
    let max: number = -Infinity;
    let bestNetwork: Network = this.representative;
    this.members.forEach((network) => {
      if (network.score && network.score > max) {
        max = network.score;
        bestNetwork = network;
      }
    });

    // check if the high score changed
    if (max > this.highScore) {
      // new high score -> save best network and reset stagnation
      this.highScore = max;
      this.bestNetwork = bestNetwork.deepCopy();
      this.stagnation = 0;

      this.representative = representativeIsBest ? bestNetwork : pickRandom(this.members);
    } else {
      // if not increase stagnation value
      this.stagnation++;
    }
  }

  /**
   * Add all network scores up and return
   */
  public sumScores(): number {
    let score = 0; // reset score
    this.members.forEach((network) => {
      // add score up
      if (network.score) score += network.score;
      else throw new ReferenceError("Network needs score for fitness evaluation!");
    });
    return score;
  }

  /**
   * Add all adjusted network scores up and return.
   */
  public getSumAdjustedScores(): number {
    let sum: number = 0;
    this.members.forEach((network) => {
      if (network.score) sum += network.adjustedFitness;
      else throw new ReferenceError("Network needs score for fitness evaluation!");
    });
    return sum;
  }

  /**
   * Add all adjusted network scores up and divide by the member size.
   */
  public getAvgAdjustedScore(): number {
    return this.getSumAdjustedScores() / this.members.size;
  }

  /**
   * Reset this object
   */
  public reset(): void {
    this.representative = pickRandom(this.members);
    this.members.clear();
    this.members.add(this.representative);
    this.score = 0;
  }

  /**
   * Kill a specific percentage of networks
   * @param percentage the kill rate
   * @param representativeIsBest is representative always the best member?
   */
  public cull(percentage: number = 0.5, representativeIsBest: boolean = true): void {
    const arr: Network[] = this.sortedMembersArray(); // descending

    const amount: number = Math.floor(percentage * this.members.size);
    for (let i: number = amount; i < arr.length; i++) {
      this.members.delete(arr[i]);
    }

    if (!representativeIsBest) this.representative = pickRandom(this.members);
  }

  /**
   * Create offspring
   */
  public breed(selection: Selection): Network {
    const sortedMembers = this.sortedMembersArray();
    return Network.crossover(selection.select(sortedMembers), selection.select(sortedMembers));
  }

  /**
   * The size of this species
   */
  public size(): number {
    return this.members.size;
  }

  /**
   * Returning a string representation of this species.
   */
  public toString(): string {
    return "Species={Members: " + this.members.size + "; Score: " + this.score + "}";
  }

  /**
   * Returns a sorted array representation of the members field
   */
  public sortedMembersArray(): Network[] {
    return Array.from(this.members).sort((a: Network, b: Network) => {
      if (a.score && b.score) return b.score - a.score;
      else if (a.score) return -1;
      else if (b.score) return 1;
      else return 0;
    });
  }

  /**
   * Dividing the fitness value of each individual by the size of the species and save the adjusted fitness.
   */
  public fitnessSharing(): void {
    this.members.forEach((network) => {
      if (network.score) network.adjustedFitness = network.score / this.members.size;
      else throw new ReferenceError("Network needs score for fitness sharing!");
    });
  }
}
