import {NEAT} from "../NEAT";
import {pickRandom} from "../utils/Utils";
import {Network} from "./Network";

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
     * The score of this species
     * @private
     */
    public score: number;
    /**
     * The member networks in this species
     * @private
     */
    private readonly members: Set<Network>;

    constructor(represent: Network) {
        this.representative = represent;

        this.members = new Set<Network>();
        this.members.add(represent);

        this.score = 0;
    }

    /**
     * Puts a network to the species, after checking the distance
     * @param network
     */
    public put(network: Network): boolean {
        if (network.distance(this.representative) < NEAT.SPECIES_THRESHOLD) {
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
        this.members.add(network);
    }

    /**
     * Calculate the score of this species
     */
    public evaluateScore(): void {
        let sum: number = 0;
        this.members.forEach(network => sum += network.score ?? 0);
        this.score = sum / this.members.size;
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
     * Kill a specific percantage of networks
     * @param percentage
     */
    public kill(percentage: number): Network[] {
        const arr: Network[] = Array.from(this.members);
        arr.sort((a: Network, b: Network) => {
            return a.score === undefined || b.score === undefined ? 0 : a.score - b.score;
        });

        const killedGenomes: Network[] = [];
        for (let i: number = 0; i < percentage * this.members.size; i++) {
            killedGenomes.push(arr[i]);
        }
        killedGenomes.forEach(genome => this.members.delete(genome));
        return killedGenomes;
    }

    /**
     * Create offspring
     */
    public breed(): Network {
        return Network.crossOver(pickRandom(this.members), pickRandom(this.members));
    }

    /**
     * The size of this species
     */
    public size(): number {
        return this.members.size;
    }
}
