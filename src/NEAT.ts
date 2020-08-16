import * as TimSort from 'timsort';
import {Network} from './architecture/Network';
import {Species} from './architecture/Species';
import {EvolveOptions} from './interfaces/EvolveOptions';
import {AddConnectionMutation, AddGateMutation, AddNodeMutation, Mutation,} from './methods/Mutation';
import {pickRandom} from './utils/Utils';

/**
 * Runs the NEAT algorithm on group of neural networks.
 *
 * @constructs Neat
 */
export class NEAT {
    /**
     * population The current population for the neat instance. Accessible through `neat.population`.
     */
    private population: Network[];

    /**
     * Species
     */
    private readonly species: Set<Species>;

    /**
     * Constructs a NEAT object.
     *
     * @param options
     */
    constructor(options: EvolveOptions) {
        if (!options.fitnessFunction) {
            throw new ReferenceError('No fitness function given!');
        }
        this._options = options;
        this.population = [];
        this.species = new Set<Species>();

        for (let i = 0; i < this.options.populationSize; i++) {
            this.population.push(this.options.template.copy());
        }
    }

    /**
     * Class holding all options for the Evolution process
     */
    private _options: EvolveOptions;

    /**
     * Getter
     */
    public get options(): EvolveOptions {
        return this._options;
    }

    /**
     * Setter
     */
    public set options(value: EvolveOptions) {
        this._options = value;
    }

    /**
     * Mutate a network with a random mutation from the allowed array.
     *
     * @param network The network which will be mutated.
     */
    public mutateRandom(network: Network): void {
        const allowed: Mutation[] = this.options.mutations.filter(method => {
            return (
                method.constructor.name !== AddNodeMutation.constructor.name ||
                network.nodes.length < this.options.maxNodes ||
                method.constructor.name !== AddConnectionMutation.constructor.name ||
                network.connections.size < this.options.maxConnections ||
                method.constructor.name !== AddGateMutation.constructor.name ||
                network.gates.size < this.options.maxGates
            );
        });
        network.mutate(pickRandom(allowed), {
            allowedActivations: this.options.activations,
        });
    }

    /**
     * Evaluates, selects, breeds and mutates population
     *
     * @returns {Network} Fittest network
     */
    public async evolve(): Promise<Network> {
        this.genSpecies();

        await this.evaluate();
        this.sort();
        this.species.forEach(species => species.evaluateScore());

        this.kill(1 - this.options.survivors);
        this.removeExtinctSpecies();
        this.reproduce();

        // const elitists: Network[] = this.population.splice(0, this.options.elitism);
        this.mutate();
        // this.population.splice(0, 0, ...elitists);

        if (this.options.training) {
            for (const genome of this.population) {
                genome.train(this.options.training);
            }
        }

        // evaluate the population
        await this.evaluate();

        // Sort in order of fitness (fittest first)
        this.sort();

        const fittest: Network = this.population[0].copy();
        fittest.score = this.population[0].score;

        if (
            this.options.log > 0 &&
            this.options.generation % this.options.log === 0
        ) {
            console.log('\n---------------------------');
            console.log(
                'Generation: ' +
                this.options.generation +
                '; Species: ' +
                this.species.size +
                '; Score: ' +
                this.population[0].score
            );
            for (const species of this.species) {
                species.print();
            }
        }

        // Reset the scores
        this.population.forEach(genome => (genome.score = undefined));

        this.options.generation++;

        return fittest;
    }

    /**
     * Mutates the given (or current) population
     *
     * @param {Mutation} [method] A mutation method to mutate the population with. When not specified will pick a random mutation from the set allowed mutations.
     */
    public mutate(method?: Mutation | undefined): void {
        // Elitist genomes should not be included
        this.population
            .filter(() => Math.random() <= this.options.mutationRate)
            .forEach(genome => {
                for (let i = 0; i < this.options.mutationAmount; i++) {
                    if (method) {
                        genome.mutate(method);
                    } else {
                        this.mutateRandom(genome);
                    }
                }
            });
    }

    /**
     * Evaluates the current population, basically sets their `.score` property
     *
     * @return {Network} Fittest Network
     */
    public async evaluate(): Promise<Network> {
        if (this.options.clear) {
            this.population.forEach(genome => genome.clear());
        }
        await this.options.fitnessFunction?.(this.population, this.options.dataset);

        // Sort the population in order of fitness
        this.sort();

        return this.population[0];
    }

    /**
     * Sorts the population by score (descending)
     * @todo implement a quicksort algorithm in utils
     */
    public sort(): void {
        TimSort.sort(this.population, (a: Network, b: Network) => {
            return a.score === undefined || b.score === undefined
                ? 0
                : b.score - a.score;
        });
    }

    /**
     * Returns the fittest genome of the current population
     *
     * @returns {Network} Current population's fittest genome
     */
    public async getFittest(): Promise<Network> {
        if (this.population[this.population.length - 1].score === undefined) {
            await this.evaluate();
        }
        this.sort();

        return this.population[0];
    }

    /**
     * Returns the average fitness of the current population
     *
     * @returns {number} Average fitness of the current population
     */
    public async getAverage(): Promise<number> {
        if (this.population[this.population.length - 1].score === undefined) {
            await this.evaluate();
        }
        let score = 0;
        this.population
            .map(genome => genome.score)
            .forEach(val => (score += val ?? 0));
        return score / this.population.length;
    }

    /**
     * Replace the whole population with the new genomes
     * @param genomes the genomes which replace the population
     */
    public replacePopulation(genomes: Network[]): void {
        this.population = genomes;
        this.options.populationSize = genomes.length;
    }

    /**
     * Reproduce the population, by replacing the killed networks
     * @private
     */
    private reproduce(): void {
        const speciesArr: Species[] = Array.from(this.species);
        if (speciesArr.length === 0) {
            return;
        }
        for (let i = 0; i < this.population.length; i++) {
            if (this.population[i].species === null) {
                const selectedSpecies: Species = this.options.selection.select(
                    speciesArr
                );
                this.population[i] = selectedSpecies.breed();
                selectedSpecies.forcePut(this.population[i]);
            }
        }
    }

    /**
     * Remove empty species
     * @private
     */
    private removeExtinctSpecies(): void {
        for (const species of Array.from(this.species)) {
            if (
                species.size() <= 1 ||
                species.stagnation > this.options.maxStagnation
            ) {
                species.members.forEach(member => (member.species = null));
                this.species.delete(species);
            }
        }
    }

    /**
     * Kill bad networks
     * @param killRate
     * @private
     */
    private kill(killRate: number): void {
        this.species.forEach(species => species.kill(killRate));
    }

    /**
     * Generate species
     * @private
     */
    private genSpecies(): void {
        this.species.forEach(species => species.reset());
        this.population
            .filter(genome => genome.species === null)
            .forEach(genome => {
                let found = false;
                for (const species of Array.from(this.species)) {
                    if (
                        species.put(
                            genome,
                            this.options.c1,
                            this.options.c2,
                            this.options.c3,
                            this.options.speciesDistanceThreshold
                        )
                    ) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    this.species.add(new Species(genome));
                }
            });
    }
}
