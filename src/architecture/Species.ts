import * as TimSort from 'timsort';
import {maxValueIndex, pickRandom} from '..';
import {Network} from './Network';

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
   * The last score of this species.
   * Used for stagnation checking.
   * @private
   */
  private lastScore: number;

  constructor(representative: Network) {
    this.representative = representative;
    this.representative.species = this;

    this.members = new Set<Network>();
    this.members.add(representative);

    this._score = 0;
    this.lastScore = 0;
    this._stagnation = 0;
  }

  /**
   * The score of this species
   * @private
   */
  private _score: number;

  /**
   * Getter
   */
  get score(): number {
    return this._score;
  }

  /**
   * Indicates how man episodes without improvements.
   * @private
   */
  private _stagnation: number;

  /**
   * Getter
   */
  get stagnation(): number {
    return this._stagnation;
  }

  /**
   * Puts a network to the species, after checking the distance
   * @param network
   * @param c1
   * @param c2
   * @param c3
   * @param distanceThreshold
   */
  public put(
    network: Network,
    c1: number,
    c2: number,
    c3: number,
    distanceThreshold: number
  ): boolean {
    if (network.distance(this.representative, c1, c2, c3) < distanceThreshold) {
      this.forcePut(network);
      return true;
    } else {
      return false;
    }
  }

  /**
   * Puts a network to the species without checking the distance
   * @param network
   */
  public forcePut(network: Network): void {
    if (network === undefined) {
      return;
    }
    this.members.add(network);
    network.species = this;
  }

  /**
   * Calculate the score of this species
   */
  public evaluateScore(): void {
    let sum = 0;
    this.members.forEach(network => (sum += network.score ?? 0));
    const score: number = sum / this.members.size;
    if (this.lastScore < score) {
      this._stagnation++;
    } else {
      this._stagnation = 0;
    }
    this._score = score;
  }

  /**
   * Reset this object
   */
  public reset(): void {
    this.representative = pickRandom(this.members);
    this.members.forEach(genome => (genome.species = null));
    this.members.clear();
    this.members.add(this.representative);
    this.representative.species = this;
    this.lastScore = this.score;
    this._score = 0;
  }

  /**
   * Kill a specific percentage of networks
   * @param percentage
   */
  public kill(percentage: number): void {
    const arr: Network[] = Array.from(this.members);
    TimSort.sort(arr, (a: Network, b: Network) => {
      return a.score === undefined || b.score === undefined
        ? 0
        : a.score - b.score;
    });

    const amount: number = Math.floor(percentage * this.members.size);
    for (let i = 0; i < amount; i++) {
      this.members.delete(arr[i]);
      arr[i].species = null;
    }
  }

  /**
   * Create offspring
   */
  public breed(): Network {
    return Network.crossOver(
      pickRandom(this.members),
      pickRandom(this.members)
    );
  }

  /**
   * The size of this species
   */
  public size(): number {
    return this.members.size;
  }

  /**
   * Returns the best genome from this species
   */
  public getBest(): Network {
    const networks: Network[] = Array.from(this.members);
    return networks[
      maxValueIndex(networks.map(genome => genome.score ?? -Infinity))
    ];
  }

  /**
   * to string
   */
  public print(): void {
    console.log(
      'Species={Members: ' +
        this.members.size +
        '; Score: ' +
        this._score +
        '; Stagnation: ' +
        this.stagnation +
        '}'
    );
  }
}
