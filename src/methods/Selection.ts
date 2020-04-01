import {Network} from "..";
import {pickRandom, randDouble} from "./Utils";

export abstract class Selection {
    public abstract select(population: Network[]): Network;
}

export class FitnessProportionateSelection extends Selection {
    public select(population: Network[]): Network {
        let totalFitness: number = 0;
        let minimalFitness: number = 0;
        for (const genome of population) {
            const score: number | undefined = genome.score;
            minimalFitness = score !== undefined && score < minimalFitness ? score : minimalFitness;
            totalFitness += score ?? 0;
        }

        minimalFitness = Math.abs(minimalFitness);
        totalFitness += minimalFitness * population.length;

        const random: number = randDouble(0, totalFitness);
        let value: number = 0;

        for (const genome of population) {
            value += (genome.score ?? 0) + minimalFitness;
            if (random < value) {
                return genome;
            }
        }

        return pickRandom(population);
    }
}

export class PowerSelection extends Selection {
    public power: number;

    constructor(power: number = 4) {
        super();
        this.power = power;
    }

    public select(population: Network[]): Network {
        return population[Math.floor(Math.pow(Math.random(), this.power) * population.length)];
    }
}

export class TournamentSelection extends Selection {
    public size: number;
    public probability: number;

    constructor(size: number = 5, probability: number = 0.5) {
        super();
        this.size = size;
        this.probability = probability;
    }

    public select(population: Network[]): Network {
        if (this.size > population.length) {
            throw new Error(`Your tournament size should be lower than the population size, please change methods.selection.TOURNAMENT.size`);
        }

        // Create a tournament
        const individuals: Network[] = [];
        for (let i: number = 0; i < this.size; i++) {
            individuals.push(pickRandom(population));
        }

        // Sort the tournament individuals by score
        individuals.sort((a: Network, b: Network) => {
            return b.score === undefined || a.score === undefined ? 0 : b.score - a.score;
        });

        // Select an individual
        for (let i: number = 0; i < this.size; i++) {
            if (Math.random() < this.probability || i === this.size - 1) {
                return individuals[i];
            }
        }
        return pickRandom(population);
    }
}
