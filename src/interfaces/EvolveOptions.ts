import {ActivationType} from "activations/build/src";
import {Network} from "../architecture/Network";
import {lossType} from "../methods/Loss";
import {Mutation} from "../methods/Mutation";
import {Selection} from "../methods/Selection";
import {TrainOptions} from "./TrainOptions";

/**
 * Options used to evolve network
 */
export interface EvolveOptions {
    /**
     * Specify the amount of threads to use. Default value is the amount of cores in your CPU.
     */
    threads?: number;
    /**
     * The input size of the network.
     */
    input?: number;
    /**
     * The output size of the network.
     */
    output?: number;
    /**
     * A data of input values and ideal output values to train the network with.
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
     * training while evolving by passing in options
     */
    training?: TrainOptions;
    /**
     * A template network to create the population from.
     */
    template?: Network;
    /**
     * Sets allowed [mutation methods](Mutation) for evolution, a random mutation method will be chosen from the array when mutation occurs. Optional, but default methods are non-recurrent.
     */
    mutations?: Mutation[];
    /**
     * Sets allowed [activation methods](Activation) for evolution, a random activation method will be chosen from the array when mutation occurs.
     */
    activations?: ActivationType[];
    /**
     * [Selection method](selection) for evolution (e.g. methods.Selection.FITNESS_PROPORTIONATE).
     */
    selection?: Selection;
    /**
     * Sets the mutation rate. If set to 0.3, 30% of the new population will be mutated.
     */
    mutationRate?: number;
    /**
     * If mutation occurs (randomNumber < mutationRate), sets amount of times a mutation method will be applied to the network.
     */
    mutationAmount?: number;
    /**
     * Elitism of every evolution loop. [Elitism in genetic algorithms.](https://www.researchgate.net/post/What_is_meant_by_the_term_Elitism_in_the_Genetic_Algorithm)
     */
    elitism?: number;
    /**
     * Population size of each generation.
     */
    populationSize?: number;
    /**
     * A fitness function to evaluate the networks. Takes a `genome`, i.e. a [network](Network), and a `dataset` and sets the genome's score property
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
     * Set the penalty for large networks. Penalty calculation: penalty = (genome.nodes.length + genome.connections.length + genome.gates.length) * growth; This penalty will get added on top of the error. Your growth should be a very small number.
     */
    growth?: number;
    /**
     * Specify the loss function for the evolution, this tells a genome in the population how well it's performing. Default: methods.loss.MSE (recommended).
     */
    loss?: lossType;
    /**
     * Maximum nodes for a potential network
     */
    maxNodes?: number;
    /**
     * Maximum connections for a potential network
     */
    maxConnections?: number;
    /**
     * Maximum gates for a potential network
     */
    maxGates?: number;
    /**
     * If set to true when [Network.crossOver](Network.crossOver) runs it will assume both genomes are equally fit.
     */
    equal?: boolean;
    /**
     * If set to n, outputs training status every n iterations. Setting `log` to 1 will log the status every iteration
     */
    log?: number;
    /**
     * You can schedule tasks to happen every n iterations. Paired with `options.schedule.function`
     */
    schedule?: {
        /**
         * You can schedule tasks to happen every n iterations. Paired with `options.schedule.function`
         */
        iterations: number,
        /**
         * A function to run every n iterations as set by `options.schedule.iterations`. Passed as an object with a "function" property that contains the function to run.
         *
         * @param fitness the fitness value of the best genome
         * @param error the current network error
         * @param iteration the current iteration count
         */
        function: (fitness: number, error: number, iteration: number) => undefined
    };
    /**
     * If set to true, will clear the network after every activation. This is useful for evolving recurrent networks, more importantly for time series prediction.
     */
    clear?: boolean;
    /**
     * Set the maximum amount of iterations/generations for the algorithm to run.
     */
    iterations?: number;
    /**
     * Set the target error. The algorithm will stop once this target error has been reached.
     */
    error?: number;
}
