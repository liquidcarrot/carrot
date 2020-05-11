import {Network} from "../architecture/Network";
import {ActivationType} from "../enums/ActivationType";
import {Loss} from "../methods/Loss";
import {Mutation} from "../methods/Mutation";
import {Selection} from "../methods/Selection";

/**
 * Options for evolving a network.
 */
export interface EvolveOptions {
    /**
     * The input size of the network.
     */
    input?: number;
    /**
     * The output size of the network.
     */
    output?: number;
    /**
     * The dataset to train on.
     */
    dataset?: {
        /**
         * The input values
         */
        input: number[],
        /**
         * The target output values
         */
        output: number[]
    }[];
    /**
     * Num of generations already done.
     */
    generation?: number;
    /**
     * A template network to create the population from.
     */
    template?: Network;
    /**
     * All allowed mutation methods.
     */
    mutations?: Mutation[];
    /**
     * All allowed activation methods.
     */
    activations?: ActivationType[];
    /**
     * The Selection method to use.
     */
    selection?: Selection;
    /**
     * The probability to mutate a genome.
     */
    mutationRate?: number;
    /**
     * The amount of mutations done to a genome.
     */
    mutationAmount?: number;
    /**
     * The number of template networks added to each new population.
     */
    provenance?: number;
    /**
     * The number of elitists, which won't be deleted or mutated.
     */
    elitism?: number;
    /**
     * The number of genomes in a population.
     */
    populationSize?: number;
    /**
     * The function which evaluates a population.
     *
     * @param population The population which needs to be evaluated
     * @param dataset The dataset to test the networks.
     */
    fitnessFunction?: (population: Network[], dataset?: {
        /**
         * The input values
         */
        input: number[],
        /**
         * The target output values
         */
        output: number[]
    }[]) => Promise<void>;
    /**
     * The penalty of creating bigger networks.
     */
    growth?: number;
    /**
     * The function to calculate the loss value.
     */
    loss?: Loss;
    /**
     * The maximum allowed nodes.
     */
    maxNodes?: number;
    /**
     * The maximum allowed connections.
     */
    maxConnections?: number;
    /**
     * The maximum allowed gates.
     */
    maxGates?: number;
    /**
     * Handle two networks as equally fit at crossover.
     */
    equal?: boolean;
    /**
     * log = 10 -> logging every 10th iteration
     * log = 0 -> logging never
     */
    log?: number;
    /**
     * A function which runs after every schedule.iterations
     */
    schedule?: {
        /**
         * After every amount of "iterations" the function runs.
         */
        iterations: number,
        /**
         * The function to run.
         *
         * @param fitness the fitness value of the best genome
         * @param error the current network error
         * @param iteration the current iteration count
         */
        function: (fitness: number, error: number, iteration: number) => undefined
    };
    /**
     * Clear all node states at the end of each iteration
     */
    clear?: boolean;
    /**
     * The number of iterations to train.
     */
    iterations?: number;
    /**
     * The target error value
     */
    error?: number;
}
