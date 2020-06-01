import {Network} from "./architecture/Network";
import {EvolveOptions} from "./interfaces/EvolveOptions";
import {ALL_ACTIVATIONS} from "./methods/Activation";
import {
    AddConnectionMutation,
    AddGateMutation,
    AddNodeMutation,
    FEEDFORWARD_MUTATIONS,
    Mutation
} from "./methods/Mutation";
import {FitnessProportionateSelection, Selection} from "./methods/Selection";
import {getOrDefault, pickRandom} from "./methods/Utils";

/**
 * Runs the NEAT algorithm on group of neural networks.
 *
 * @constructs Neat
 */
export class NEAT {
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
    private readonly populationSize: number;
    /**
     * Elitism of every evolution loop. [Elitism in genetic algorithms.](https://www.researchgate.net/post/What_is_meant_by_the_term_Elitism_in_the_Genetic_Algorithm)
     */
    private readonly elitism: number;
    /**
     * Number of genomes inserted the original network template (Network(input,output)) per evolution.
     */
    private readonly provenance: number;
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
    private readonly activations: ((x: number, derivative: boolean) => number)[];

    /**
     * Constructs a NEAT object.
     *
     * @param options
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
        this.elitism = getOrDefault(options.elitism, 2);
        this.provenance = getOrDefault(options.provenance, 0);
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

        for (let i: number = 0; i < this.populationSize; i++) {
            this.population.push(this.template.copy());
        }
    }

    /**
     * Filter genomes from population
     *
     * @param pickGenome Pick a network from the population which gets adjusted or removed
     * @param adjustGenome Adjust the picked network
     */
    public filterGenome(pickGenome: (genome: Network) => boolean, adjustGenome: ((genome: Network) => Network) | undefined): Network[] {
        return this.population
            .filter(genome => pickGenome(genome))
            .map(genome => {
                return adjustGenome ? adjustGenome(genome) : this.template.copy();
            });
    }

    /**
     * Mutate a network with a random mutation from the allowed array.
     *
     * @param network The network which will be mutated.
     */
    public mutateRandom(network: Network): void {
        const allowed: Mutation[] = this.mutations.filter(method => {
            return (
                method.constructor.name !== AddNodeMutation.constructor.name || network.nodes.length < this.maxNodes ||
                method.constructor.name !== AddConnectionMutation.constructor.name || network.connections.length < this.maxConnections ||
                method.constructor.name !== AddGateMutation.constructor.name || network.gates.length < this.maxGates
            );
        });
        network.mutate(pickRandom(allowed), {allowedActivations: this.activations});
    }

    /**
     * Evaluates, selects, breeds and mutates population
     *
     * @param {function} [pickGenome] A custom selection function to pick out unwanted genomes. Accepts a network as a parameter and returns true for selection.
     * @param {function} [adjustGenome=self.template] Accepts a network, modifies it, and returns it. Used to modify unwanted genomes returned by `pickGenome` and reincorporate them into the population. If left unset, unwanted genomes will be replaced with the template Network. Will only run when pickGenome is defined.
     *
     * @returns {Network} Fittest network
     */
    public async evolve(pickGenome?: ((genome: Network) => boolean) | undefined, adjustGenome?: ((genome: Network) => Network) | undefined): Promise<Network> {
        // Check if evolve is possible
        if (this.elitism + this.provenance > this.populationSize) {
            throw new Error("Can`t evolve! Elitism + provenance exceeds population size!");
        }

        // Check population for evaluation
        if (this.population[this.population.length - 1].score === undefined) {
            await this.evaluate();
        }

        if (pickGenome) {
            this.population = this.filterGenome(pickGenome, adjustGenome);
        }

        // Sort in order of fitness (fittest first)
        this.sort();

        // Elitism, assumes population is sorted by fitness
        const elitists: Network[] = [];
        for (let i: number = 0; i < this.elitism; i++) {
            elitists.push(this.population[i]);
        }

        // Provenance
        const newPopulation: Network[] = Array(this.provenance).fill(this.template.copy());

        // Breed the next individuals
        for (let i: number = 0; i < this.populationSize - this.elitism - this.provenance; i++) {
            newPopulation.push(this.getOffspring());
        }

        // Replace the old population with the new population
        this.population = newPopulation;

        // Mutate the new population
        this.mutate();

        // Add the elitists
        this.population.push(...elitists);

        // evaluate the population
        await this.evaluate();

        // Check & adjust genomes as needed
        if (pickGenome) {
            this.population = this.filterGenome(pickGenome, adjustGenome);
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

    /**
     * Selects two genomes from the population with `getParent()`, and returns the offspring from those parents. NOTE: Population MUST be sorted
     *
     * @returns {Network} Child network
     */
    public getOffspring(): Network {
        this.sort();
        const parent1: Network | null = this.selection.select(this.population);
        const parent2: Network | null = this.selection.select(this.population);

        if (parent1 === null || parent2 === null) {
            throw new ReferenceError("Should not be null!");
        }

        return Network.crossOver(parent1, parent2, this.equal);
    }

    /**
     * Mutates the given (or current) population
     *
     * @param {Mutation} [method] A mutation method to mutate the population with. When not specified will pick a random mutation from the set allowed mutations.
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
     */
    public sort(): void {
        this.population.sort((a: Network, b: Network) => {
            return a.score === undefined || b.score === undefined ? 0 : b.score - a.score;
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
        let score: number = 0;
        this.population
            .map(genome => genome.score)
            .forEach(val => score += val ?? 0);
        return score / this.population.length;
    }
}
