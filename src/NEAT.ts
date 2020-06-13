import {ActivationType} from "activations";
import {ALL_ACTIVATIONS} from "activations/build/src";
import {Network} from "./architecture/Network";
import {Species} from "./architecture/Species";
import {EvolveOptions} from "./interfaces/EvolveOptions";
import {
    AddConnectionMutation,
    AddGateMutation,
    AddNodeMutation,
    FEEDFORWARD_MUTATIONS,
    Mutation
} from "./methods/Mutation";
import {FitnessProportionateSelection, Selection} from "./methods/Selection";
import {getOrDefault, pickRandom} from "./utils/Utils";

/**
 * Runs the NEAT algorithm on group of neural networks.
 *
 * @constructs Neat
 */
export class NEAT {
    /**
     * How big could the distance be between two networks in a species
     */
    public static SPECIES_DISTANCE_THRESHOLD: number = 3;
    public static C1: number = 1;
    public static C2: number = 1;
    public static C3: number = 1;
    public static SURVIVORS: number = 0.8;
    /**
     * A count of the generations
     */
    public generation: number;
    /**
     * The input size of `template` networks.
     */
    private readonly input: number;
    /**
     * The output size of `template` networks.
     */
    private readonly output: number;
    /**
     * When true [crossover](Network.crossOver) parent genomes are assumed to be equally fit and offspring are built with a random amount of neurons within the range of parents' number of neurons. Set to false to select the "fittest" parent as the neuron amount template.
     */
    private readonly equal: boolean;
    /**
     * Clear the context of the population's nodes, basically reverting them to 'new' neurons. Useful for predicting time series with LSTM's.
     */
    private readonly clear: boolean;
    /**
     * Population size of each generation.
     */
    private populationSize: number;
    /**
     * Sets the mutation rate. If set to 0.3, 30% of the new population will be mutated. Default is 0.4.
     */
    private readonly mutationRate: number;
    /**
     * If mutation occurs (randomNumber < mutationRate), sets amount of times a mutation method will be applied to the network.
     */
    private readonly mutationAmount: number;
    /**
     * A fitness function to evaluate the networks. Takes a `dataset` and a `genome` i.e. a network or a `population` i.e. an array of networks and sets the genome `.score` property
     */
    private readonly fitnessFunction: ((population: Network[], dataset?: {
        /**
         * Set with all input values.
         */
        input: number[];
        /**
         * Set with all output values.
         */
        output: number[]
    }[]) => Promise<void>);
    /**
     * Selection for evolution (e.g. Selection.FITNESS_PROPORTIONATE)
     */
    private readonly selection: Selection;
    /**
     * Sets allowed mutations for evolution, a random mutation method will be chosen from the array when mutation occurs. Optional, but default methods are non-recurrent.
     */
    private readonly mutations: Mutation[];
    /**
     * Network to start evolution from.
     */
    private readonly template: Network;
    /**
     * Maximum nodes for a potential network.
     */
    private readonly maxNodes: number;
    /**
     * Maximum connections for a potential network.
     */
    private readonly maxConnections: number;
    /**
     * Maximum gates for a potential network.
     */
    private readonly maxGates: number;
    /**
     * population The current population for the neat instance. Accessible through `neat.population`.
     */
    private population: Network[];
    /**
     * species
     */
    private species: Set<Species>;
    /**
     * A set of input values and ideal output values to evaluate a genome's fitness with. Must be included to use `NEAT.evaluate` without passing a dataset.
     */
    private readonly dataset?: {
        /**
         * Set with all input values.
         */
        input: number[];
        /**
         * Set with all output values.
         */
        output: number[]
    }[];
    /**
     * Sets allowed activations for evolution, a random activation method will be chosen from the array when activation mutation occurs.
     */
    private readonly activations: ActivationType[];

    /**
     * Constructs a NEAT object.
     *
     * @param options
     * @time O(n)
     */
    constructor(options: EvolveOptions) {
        if (!options.fitnessFunction) {
            throw new ReferenceError("No fitness function given!");
        }

        this.dataset = options.dataset;
        if (options.dataset && options.dataset.length > 0) {
            this.input = options.dataset[0].input.length;
            this.output = options.dataset[0].output.length;
        } else {
            this.input = getOrDefault(options.input, 0);
            this.output = getOrDefault(options.output, 0);
        }

        this.generation = getOrDefault(options.generation, 0);
        this.equal = getOrDefault(options.equal, true);
        this.clear = getOrDefault(options.clear, false);
        this.populationSize = getOrDefault(options.populationSize, 50);
        this.mutationRate = getOrDefault(options.mutationRate, 0.6);
        this.mutationAmount = getOrDefault(options.mutationAmount, 5);
        this.fitnessFunction = options.fitnessFunction;

        this.selection = getOrDefault(options.selection, new FitnessProportionateSelection());
        this.mutations = getOrDefault(options.mutations, FEEDFORWARD_MUTATIONS);
        this.activations = getOrDefault(options.activations, Object.values(ALL_ACTIVATIONS));
        this.template = getOrDefault(options.template, new Network(this.input, this.output));
        this.maxNodes = getOrDefault(options.maxNodes, Infinity);
        this.maxConnections = getOrDefault(options.maxConnections, Infinity);
        this.maxGates = getOrDefault(options.maxGates, Infinity);
        this.population = [];
        this.species = new Set<Species>();

        for (let i: number = 0; i < this.populationSize; i++) {
            this.population.push(this.template.copy());
        }
    }

    /**
     * Mutate a network with a random mutation from the allowed array.
     *
     * @param network The network which will be mutated.
     * @time O(n&sup3;)
     */
    public mutateRandom(network: Network): void {
        const allowed: Mutation[] = this.mutations.filter(method => {
            return (
                method.constructor.name !== AddNodeMutation.constructor.name || network.nodes.length < this.maxNodes ||
                method.constructor.name !== AddConnectionMutation.constructor.name || network.connections.size < this.maxConnections ||
                method.constructor.name !== AddGateMutation.constructor.name || network.gates.size < this.maxGates
            );
        });
        network.mutate(pickRandom(allowed), {allowedActivations: this.activations});
    }

    /**
     * Evaluates, selects, breeds and mutates population
     *
     * @time O(time for fitness function + n * time for adjust genome + n&sup5;)
     * @returns {Network} Fittest network
     */
    public async evolve(): Promise<Network> {
        this.genSpecies();
        if (this.population[this.population.length - 1].score === undefined) {
            await this.evaluate();
        }
        this.species.forEach(species => species.evaluateScore());
        this.sort();

        this.kill(1 - NEAT.SURVIVORS);
        this.removeExtinctSpecies();
        this.reproduce();
        this.mutate();

        // evaluate the population
        await this.evaluate();

        // Sort in order of fitness (fittest first)
        this.sort();

        const fittest: Network = this.population[0].copy();
        fittest.score = this.population[0].score;

        // Reset the scores
        this.population.forEach(genome => genome.score = undefined);

        this.generation++;

        return fittest;
    }

    /**
     * Mutates the given (or current) population
     *
     * @param {Mutation} [method] A mutation method to mutate the population with. When not specified will pick a random mutation from the set allowed mutations.
     * @time O(n&sup5;)
     */
    public mutate(method?: Mutation | undefined): void {
        // Elitist genomes should not be included
        this.population
            .filter(() => Math.random() <= this.mutationRate)
            .forEach(genome => {
                for (let i: number = 0; i < this.mutationAmount; i++) {
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
     * @time O(n&sup3; + time for fitness function)
     * @return {Network} Fittest Network
     */
    public async evaluate(): Promise<Network> {
        if (this.clear) {
            this.population.forEach(genome => genome.clear());
        }
        await this.fitnessFunction(this.population, this.dataset);

        // Sort the population in order of fitness
        this.sort();

        return this.population[0];
    }

    /**
     * Sorts the population by score (descending)
     * @time O(n)
     * @todo implement a quicksort algorithm in utils
     */
    public sort(): void {
        this.population.sort((a: Network, b: Network) => {
            return a.score === undefined || b.score === undefined ? 0 : b.score - a.score;
        });
    }

    /**
     * Returns the fittest genome of the current population
     *
     * @time O(n + time for fitness function)
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
     * @time O(n + time for fitness function)
     * @returns {number} Average fitness of the current population
     */
    public async getAverage(): Promise<number> {
        if (this.population[this.population.length - 1].score === undefined) {
            await this.evaluate();
        }
        let score: number = 0;
        this.population
            .map(genome => genome.score)
            .forEach(val => score += val ?? 0);
        return score / this.population.length;
    }

    /**
     * Replace the whole population with the new genomes
     * @param genomes the genomes which replace the population
     * @time O(1)
     */
    public replacePopulation(genomes: Network[]): void {
        this.population = genomes;
        this.populationSize = genomes.length;
    }

    /**
     * Reporduce the population, by replacing the killed networks
     * @param killedNetworks
     * @private
     */
    private reproduce(): void {
        const speciesArr: Species[] = Array.from(this.species);
        for (let i: number = 0; i < this.population.length; i++) {
            if (this.population[i].species === null) {
                const selectedSpecies: Species = this.selection.select(speciesArr);
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
            if (species.size() <= 1) {
                species.members.forEach(member => member.species = null);
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
        this.population.filter(genome => genome.species === null).forEach(genome => {
            let found: boolean = false;
            for (const species of Array.from(this.species)) {
                if (species.put(genome)) {
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
