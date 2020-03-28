import {EvolveOptions, Network} from "./architecture/Network";
import {getOrDefault, pickRandom} from "./methods/Utils";
import {Loss, MSELoss} from "./methods/Loss";
import {PowerSelection, Selection, TournamentSelection} from "./methods/Selection";
import {
    AddConnectionMutation,
    AddGateMutation,
    AddNodeMutation,
    FEEDFORWARD_MUTATIONS,
    Mutation
} from "./methods/Mutation";

export class NEAT {
    public generation: number;
    private readonly input: number;
    private readonly output: number;
    private readonly equal: boolean;
    private readonly clear: boolean;
    private readonly populationSize: number;
    private growth: number;
    private loss: Loss;
    private amount: number;
    private readonly elitism: number;
    private readonly provenance: number;
    private mutationRate: number;
    private readonly mutationAmount: number;
    private readonly fitnessPopulation: boolean;
    private readonly fitnessFunction: (inputs: number[][], outputs: number[][], population: Network[] | Network) => Promise<void>;
    private selection: Selection;
    private readonly mutations: Mutation[];
    private readonly template: Network;
    private readonly maxNodes: number;
    private readonly maxConnections: number;
    private readonly maxGates: number;
    private population: Network[];
    private readonly inputs: number[][];
    private readonly outputs: number[][];

    constructor(inputs: number[][], outputs: number[][], options: EvolveOptions) {
        this.inputs = inputs;
        this.outputs = outputs;

        this.generation = getOrDefault(options.generation, 0);
        this.input = getOrDefault(options.input, 1);
        this.output = getOrDefault(options.output, 1);
        this.equal = getOrDefault(options.equal, true);
        this.clear = getOrDefault(options.clear, false);
        this.populationSize = getOrDefault(options.populationSize, 50);
        this.growth = getOrDefault(options.growth, 0.0001);
        this.loss = getOrDefault(options.loss, new MSELoss());
        this.amount = getOrDefault(options.amount, 1);
        this.elitism = getOrDefault(options.elitism, 1);
        this.provenance = getOrDefault(options.provenance, 0);
        this.mutationRate = getOrDefault(options.mutationRate, 0.4);
        this.mutationAmount = getOrDefault(options.mutationAmount, 1);
        this.fitnessPopulation = getOrDefault(options.fitnessPopulation, false);
        this.fitnessFunction = options.fitnessFunction;
        this.selection = getOrDefault(options.selection, new PowerSelection());
        this.mutations = getOrDefault(options.mutations, FEEDFORWARD_MUTATIONS);
        this.template = getOrDefault(options.template, new Network(this.input, this.output));
        this.maxNodes = getOrDefault(options.maxNodes, Infinity);
        this.maxConnections = getOrDefault(options.maxConnections, Infinity);
        this.maxGates = getOrDefault(options.maxGates, Infinity);
        this.population = [];

        this.createInitialPopulation();
    }

    public filterGenome(population: Network[], template: Network, pickGenome: (genome: Network) => boolean, adjustGenome: ((genome: Network) => Network) | undefined): Network[] {
        const filtered = [...population]; // avoid mutations

        if (adjustGenome) {
            filtered
                .filter(genome => pickGenome(genome))
                .forEach((genome, index) => filtered[index] = adjustGenome(filtered[index]));
        } else {
            filtered
                .filter(genome => pickGenome(genome))
                .forEach((genome, index) => filtered[index] = template.copy());
        }

        return filtered;
    }

    public mutateRandom(genome: Network, possible: Mutation[] = this.mutations) {
        const maxNodes: number = this.maxNodes;
        const maxConnections: number = this.maxConnections;
        const maxGates: number = this.maxGates;
        possible = possible.filter(function (method) {
            return (
                method.constructor.name !== AddNodeMutation.constructor.name || genome.nodes.length < maxNodes ||
                method.constructor.name !== AddConnectionMutation.constructor.name || genome.connections.length < maxConnections ||
                method.constructor.name !== AddGateMutation.constructor.name || genome.gates.length < maxGates
            );
        });

        genome.mutate(pickRandom(possible));
    }

    public async evolve(pickGenome: ((genome: Network) => boolean) | undefined, adjustGenome: ((genome: Network) => Network) | undefined): Promise<Network> {
        // Check if evolve is possible
        if (this.elitism + this.provenance > this.populationSize) {
            throw new Error("Can`t evolve! Elitism + provenance exceeds population size!");
        }

        // Check population for evaluation
        if (this.population[this.population.length - 1].score === undefined) {
            await this.evaluate(this.inputs, this.outputs);
        }

        if (pickGenome) {
            this.population = this.filterGenome(this.population, this.template, pickGenome, adjustGenome);
        }

        // Sort in order of fitness (fittest first)
        this.sort();

        // Elitism, assumes population is sorted by fitness
        const elitists: Network[] = [];
        for (let i: number = 0; i < this.elitism; i++) {
            elitists.push(this.population[i]);
        }

        // Provenance
        const newPopulation = Array(this.provenance).fill(this.template.copy());

        // Breed the next individuals
        for (let i = 0; i < this.populationSize - this.elitism - this.provenance; i++) {
            newPopulation.push(this.getOffspring());
        }

        // Replace the old population with the new population
        this.population = newPopulation;

        // Mutate the new population
        this.mutate(undefined);

        // Add the elitists
        this.population.push(...elitists);

        // evaluate the population
        await this.evaluate(this.inputs, this.outputs);

        // Check & adjust genomes as needed
        if (pickGenome) {
            this.population = this.filterGenome(this.population, this.template, pickGenome, adjustGenome);
        }

        // Sort in order of fitness (fittest first)
        this.sort();

        const fittest: Network = this.population[0].copy();
        fittest.score = this.population[0].score;

        // Reset the scores
        this.population.forEach(genome => genome.score = undefined);

        this.generation++;

        return fittest;
    }

    public getParent(): Network | null {
        // TODO: Move to Selection.ts
        if (this.selection.constructor.name === `POWER`) {
            if (this.population[0].score !== undefined && this.population[1].score !== undefined && this.population[0].score < this.population[1].score) {
                this.sort();
            }

            return this.population[Math.floor(Math.pow(Math.random(), (this.selection as PowerSelection).power) * this.population.length)];
        } else if (this.selection.constructor.name === `FITNESS_PROPORTIONATE`) {
            let totalFitness = 0;
            let minimalFitness = 0;
            this.population
                .map(genome => genome.score)
                .forEach(score => {
                    minimalFitness = score !== undefined && score < minimalFitness ? score : minimalFitness;
                    totalFitness += score ?? 0;
                });

            minimalFitness = Math.abs(minimalFitness);
            totalFitness += minimalFitness * this.population.length;

            const random = Math.random() * totalFitness;
            let value = 0;

            for (const genome of this.population) {
                value += (genome.score ?? 0) + minimalFitness;
                if (random < value) {
                    return genome;
                }
            }

            return pickRandom(this.population);
        } else if (this.selection.constructor.name === `TOURNAMENT`) {
            if ((this.selection as TournamentSelection).size > this.populationSize) {
                throw new Error(`Your tournament size should be lower than the population size, please change methods.selection.TOURNAMENT.size`);
            }

            // Create a tournament
            const individuals = [];
            for (let i = 0; i < (this.selection as TournamentSelection).size; i++) {
                const random = this.population[Math.floor(Math.random() * this.population.length)];
                individuals.push(random);
            }

            // Sort the tournament individuals by score
            individuals.sort(function (a, b) {
                return b.score === undefined || a.score === undefined ? 0 : b.score - a.score;
            });

            // Select an individual
            for (let i = 0; i < (this.selection as TournamentSelection).size; i++) {
                if (Math.random() < (this.selection as TournamentSelection).probability || i === (this.selection as TournamentSelection).size - 1) {
                    return individuals[i];
                }
            }
        } else {
            throw new TypeError(this.selection.constructor.name + " is no valid selection method !");
        }
        return null;
    }

    public getOffspring(): Network {
        const parent1 = this.getParent();
        const parent2 = this.getParent();

        if (parent1 === null || parent2 === null) {
            throw new Error("Should not be null!");
        }

        return Network.crossOver(parent1, parent2, this.equal);
    }

    public mutate(method: Mutation | undefined): void {
        if (method) {
            // Elitist genomes should not be included
            this.population
                .filter(() => Math.random() <= this.mutationRate)
                .forEach(genome => {
                    for (let i: number = 0; i < this.mutationAmount; i++) {
                        genome.mutate(method);
                    }
                });
        } else {
            // Elitist genomes should not be included
            this.population
                .filter(() => Math.random() <= this.mutationRate)
                .forEach(genome => {
                    for (let i: number = 0; i < this.mutationAmount; i++) {
                        this.mutateRandom(genome, this.mutations);
                    }
                });
        }
    }

    public async evaluate(inputs: number[][], outputs: number[][]) {
        if (this.fitnessPopulation) {
            if (this.clear) {
                this.population.forEach(genome => genome.clear());
            }
            await this.fitnessFunction(inputs, outputs, this.population);
        } else {
            for (const genome of this.population) {
                if (this.clear) {
                    genome.clear();
                }
                await this.fitnessFunction(inputs, outputs, genome);
            }
        }

        // Sort the population in order of fitness
        this.sort();

        return this.population[0];
    }

    public sort(): void {
        this.population.sort(function (a: Network, b: Network) {
            return a.score === undefined || b.score === undefined ? 0 : b.score - a.score;
        });
    }

    public getFittest(): Network {
        if (this.population[this.population.length - 1].score === undefined) {
            this.evaluate(this.inputs, this.outputs);
        }
        this.sort();

        return this.population[0];
    }

    public getAverage(): number {
        if (this.population[this.population.length - 1].score === undefined) {
            this.evaluate(this.inputs, this.outputs);
        }
        let score = 0;
        this.population
            .map(genome => genome.score)
            .forEach(val => score += val ?? 0);
        return score / this.population.length;
    }

    private createInitialPopulation(): void {
        for (let i: number = 0; i < this.populationSize; i++) {
            this.population.push(this.template.copy());
        }
    }
}
