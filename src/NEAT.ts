import {Network} from "./architecture/Network";
import {ActivationType} from "./enums/ActivationType";
import {EvolveOptions} from "./interfaces/EvolveOptions";
import {ALL_ACTIVATIONS} from "./methods/Activation";
import {
    AddConnectionMutation,
    AddGateMutation,
    AddNodeMutation,
    ALL_MUTATIONS,
    FEEDFORWARD_MUTATIONS,
    Mutation
} from "./methods/Mutation";
import {FitnessProportionateSelection, Selection} from "./methods/Selection";
import {getOrDefault, pickRandom} from "./methods/Utils";

/**
 * Runs the NEAT algorithm on group of neural networks.
 *
 * @constructs Neat
 *
 * @private
 *
 * @param {Array<{input:number[],output:number[]}>} [dataset] A set of input values and ideal output values to evaluate a genome's fitness with. Must be included to use `NEAT.evaluate` without passing a dataset
 * @param {EvolveOptions} options - Configuration options
 * @param {number} input - The input size of `template` networks.
 * @param {number} output - The output size of `template` networks.
 * @param {boolean} [options.equal=false] When true [crossover](Network.crossOver) parent genomes are assumed to be equally fit and offspring are built with a random amount of neurons within the range of parents' number of neurons. Set to false to select the "fittest" parent as the neuron amount template.
 * @param {number} [options.clear=false] Clear the context of the population's nodes, basically reverting them to 'new' neurons. Useful for predicting timeseries with LSTM's.
 * @param {number} [options.populationSize=50] Population size of each generation.
 * @param {number} [options.growth=0.0001] Set the penalty for large networks. Penalty calculation: penalty = (genome.nodes.length + genome.connectoins.length + genome.gates.length) * growth; This penalty will get added on top of the error. Your growth should be a very small number.
 * @param {Loss} [options.loss=new MSELoss()]  Specify the cost function for the evolution, this tells a genome in the population how well it's performing. Default: methods.new MSELoss() (recommended).
 * @param {number} [options.amount=1] Set the amount of times to test the trainingset on a genome each generation. Useful for timeseries. Do not use for regular feedfoward problems.
 * @param {number} [options.elitism=1] Elitism of every evolution loop. [Elitism in genetic algortihtms.](https://www.researchgate.net/post/What_is_meant_by_the_term_Elitism_in_the_Genetic_Algorithm)
 * @param {number} [options.provenance=0] Number of genomes inserted the original network template (Network(input,output)) per evolution.
 * @param {number} [options.mutationRate=0.4] Sets the mutation rate. If set to 0.3, 30% of the new population will be mutated. Default is 0.4.
 * @param {number} [options.mutationAmount=1] If mutation occurs (randomNumber < mutationRate), sets amount of times a mutation method will be applied to the network.
 * @param {boolean} [options.fitnessPopulation=false] Flag to return the fitness of a population of genomes. Set this to false to evaluate each genome inidividually.
 * @param {((dataset: { input: number[]; output: number[] }[], population: Network[]) => Promise<void>)} [options.fitness] - A fitness function to evaluate the networks. Takes a `dataset` and a `genome` i.e. a [network](Network) or a `population` i.e. an array of networks and sets the genome `.score` property
 * @param {string} [options.selection=FITNESS_PROPORTIONATE] [Selection method](selection) for evolution (e.g. Selection.FITNESS_PROPORTIONATE).
 * @param {Array} [options.crossover] Sets allowed crossover methods for evolution.
 * @param {Network} [options.network=false] Network to start evolution from
 * @param {number} [options.maxNodes=Infinity] Maximum nodes for a potential network
 * @param {number} [options.maxConnections=Infinity] Maximum connections for a potential network
 * @param {number} [options.maxGates=Infinity] Maximum gates for a potential network
 * @param {Mutation[]} [options.mutation] Sets allowed [mutation methods](mutation) for evolution, a random mutation method will be chosen from the array when mutation occurs. Optional, but default methods are non-recurrent
 *
 * @prop {number} generation A count of the generations
 * @prop {Network[]} population The current population for the neat instance. Accessible through `neat.population`
 *
 * @example
 * let { Neat } = require("@liquid-carrot/carrot");
 *
 * let neat = new Neat(dataset, {
 *   elitism: 10,
 *   clear: true,
 *   populationSize: 1000
 * });
 */
export class NEAT {
    public generation: number;
    private readonly input: number;
    private readonly output: number;
    private readonly equal: boolean;
    private readonly clear: boolean;
    private readonly populationSize: number;
    private readonly elitism: number;
    private readonly provenance: number;
    private readonly mutationRate: number;
    private readonly mutationAmount: number;
    private readonly fitnessFunction: ((dataset: { input: number[]; output: number[] }[], population: Network[]) => Promise<void>);
    private readonly selection: Selection;
    private readonly mutations: Mutation[];
    private readonly template: Network;
    private readonly maxNodes: number;
    private readonly maxConnections: number;
    private readonly maxGates: number;
    private population: Network[];
    private readonly dataset: { input: number[]; output: number[] }[];
    private readonly activations: ActivationType[];

    constructor(dataset: { input: number[], output: number[] }[] = [], options: EvolveOptions = {}) {
        if (!options.fitnessFunction) {
            throw new ReferenceError("No fitness function given!");
        }

        this.dataset = dataset;
        this.input = dataset.length > 0 ? dataset[0].input.length : 0;
        this.output = dataset.length > 0 ? dataset[0].output.length : 0;

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
        this.activations = getOrDefault(options.activations, ALL_ACTIVATIONS);
        this.template = getOrDefault(options.template, new Network(this.input, this.output));
        this.maxNodes = getOrDefault(options.maxNodes, Infinity);
        this.maxConnections = getOrDefault(options.maxConnections, Infinity);
        this.maxGates = getOrDefault(options.maxGates, Infinity);
        this.population = [];

        this.createInitialPopulation();
    }

    public filterGenome(population: Network[], template: Network, pickGenome: (genome: Network) => boolean, adjustGenome: ((genome: Network) => Network) | undefined): Network[] {
        const filtered: Network[] = [...population]; // avoid mutations

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

    public mutateRandom(genome: Network, possible: Mutation[] = ALL_MUTATIONS): void {
        const maxNodes: number = this.maxNodes;
        const maxConnections: number = this.maxConnections;
        const maxGates: number = this.maxGates;
        possible = possible.filter(method => {
            return (
                method.constructor.name !== AddNodeMutation.constructor.name || genome.nodes.length < maxNodes ||
                method.constructor.name !== AddConnectionMutation.constructor.name || genome.connections.length < maxConnections ||
                method.constructor.name !== AddGateMutation.constructor.name || genome.gates.length < maxGates
            );
        });

        genome.mutate(pickRandom(possible), {allowedActivations: this.activations});
    }

    /**
     * Evaluates, selects, breeds and mutates population
     *
     * @param {function} [pickGenome] A custom selection function to pick out unwanted genomes. Accepts a network as a parameter and returns true for selection.
     * @param {function} [adjustGenome=self.template] Accepts a network, modifies it, and returns it. Used to modify unwanted genomes returned by `pickGenome` and reincorporate them into the population. If left unset, unwanted genomes will be replaced with the template Network. Will only run when pickGenome is defined.
     *
     * @returns {Network} Fittest network
     *
     * @example
     * let neat = new Neat(dataset, {
     *  elitism: 10,
     *  clear: true,
     *  populationSize: 1000
     * });
     *
     * let filter = function(genome) {
     *  // Remove genomes with more than 100 nodes
     *  return genome.nodes.length > 100 ? true : false
     * }
     *
     * let adjust = function(genome) {
     *  // clear the nodes
     *  return genome.clear()
     * }
     *
     * neat.evolve(evolveSet, filter, adjust).then(function(fittest) {
     *  console.log(fittest)
     * })
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

    /**
     * Evaluates the current population, basically sets their `.score` property
     *
     * @return {Network} Fittest Network
     */
    public async evaluate(): Promise<Network> {
        if (this.clear) {
            this.population.forEach(genome => genome.clear());
        }
        await this.fitnessFunction(this.dataset, this.population);

        // Sort the population in order of fitness
        this.sort();

        return this.population[0];
    }

    /**
     * Sorts the population by score
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

    /**
     * Create the initial pool of genomes
     */
    private createInitialPopulation(): void {
        for (let i: number = 0; i < this.populationSize; i++) {
            this.population.push(this.template.copy());
        }
    }
}
