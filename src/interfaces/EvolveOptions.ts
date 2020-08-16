import {ActivationType, ALL_ACTIVATIONS} from 'activations/build/src';
import os from 'os';
import {Network} from '../architecture/Network';
import {lossType, MSELoss} from '../methods/Loss';
import {FEEDFORWARD_MUTATIONS, Mutation} from '../methods/Mutation';
import {FitnessProportionateSelection, Selection} from '../methods/Selection';
import {TrainOptions} from './TrainOptions';

/**
 * Options used to evolve network
 */
export class EvolveOptions {
    constructor() {
        this._input = 1;
        this._output = 1;
        this._generation = 0;
        this._elitism = 1;
        this._equal = true;
        this._clear = false;
        this._populationSize = 50;
        this._mutationRate = 0.6;
        this._mutationAmount = 5;

        this._selection = new FitnessProportionateSelection();
        this._loss = MSELoss;
        this._mutations = FEEDFORWARD_MUTATIONS;
        this._activations = Object.values(ALL_ACTIVATIONS);
        this._template = new Network(this._input, this._output);
        this._maxNodes = Infinity;
        this._maxConnections = Infinity;
        this._maxGates = Infinity;
        this._threads = os.cpus().length;
        this._log = -1;
        this._iterations = 1000;
        this._error = 0.05;
        this._maxStagnation = 3;
    }

    /**
     * Maximum amount of episodes without improvement before removing a species
     */
    private _maxStagnation: number;
    /**
     * Getter
     */
    public get maxStagnation(): number {
        return this._maxStagnation;
    }

    /**
     * Setter
     * @param value
     */
    public set maxStagnation(value: number) {
        this._maxStagnation = value;
    }

    /**
     * How big could the distance be between a network and the represent of a species?
     */
    private _speciesDistanceThreshold = 4;

    /**
     * Getter
     */
    public get speciesDistanceThreshold(): number {
        return this._speciesDistanceThreshold;
    }

    /**
     * Setter
     */
    public set speciesDistanceThreshold(value: number) {
        this._speciesDistanceThreshold = value;
    }

    private _c1 = 1;

    /**
     * Getter
     */
    public get c1(): number {
        return this._c1;
    }

    /**
     * Setter
     */
    public set c1(value: number) {
        this._c1 = value;
    }

    private _c2 = 1;

    /**
     * Getter
     */
    public get c2(): number {
        return this._c2;
    }

    /**
     * Setter
     */
    public set c2(value: number) {
        this._c2 = value;
    }

    private _c3 = 1;

    /**
     * Getter
     */
    public get c3(): number {
        return this._c3;
    }

    /**
     * Setter
     */
    public set c3(value: number) {
        this._c3 = value;
    }

    private _survivors = 0.8;

    /**
     * Getter
     */
    public get survivors(): number {
        return this._survivors;
    }

    /**
     * Setter
     */
    public set survivors(value: number) {
        this._survivors = value;
    }

    /**
     * Specify the amount of threads to use. Default value is the amount of cores in your CPU.
     */
    private _threads: number;

    /**
     * Getter
     */
    public get threads(): number {
        return this._threads;
    }

    /**
     * Setter
     */
    public set threads(value: number) {
        this._threads = value;
    }

    /**
     * The input size of the network.
     */
    private _input: number;

    /**
     * Getter
     */
    public get input(): number {
        return this._input;
    }

    /**
     * Setter
     */
    public set input(value: number) {
        this._input = value;
    }

    /**
     * The output size of the network.
     */
    private _output: number;

    /**
     * Getter
     */
    public get output(): number {
        return this._output;
    }

    /**
     * Setter
     */
    public set output(value: number) {
        this._output = value;
    }

    /**
     * A set of input values and ideal output values to evaluate a genome's fitness with. Must be included to use `NEAT.evaluate` without passing a dataset.
     */
    private _dataset?: {
        /**
         * The input values
         */
        input: number[];
        /**
         * The target output values
         */
        output: number[];
    }[];

    /**
     * Getter
     */
    public get dataset():
        | {
        /**
         * The input values
         */
        input: number[];
        /**
         * The target output values
         */
        output: number[];
    }[]
        | undefined {
        return this._dataset;
    }

    /**
     * Setter
     */
    public set dataset(
        value:
            | {
            /**
             * The input values
             */
            input: number[];
            /**
             * The target output values
             */
            output: number[];
        }[]
            | undefined
    ) {
        this._dataset = value;
    }

    /**
     * Num of generations already done.
     */
    private _generation: number;

    /**
     * Getter
     */
    public get generation(): number {
        return this._generation;
    }

    /**
     * Setter
     */
    public set generation(value: number) {
        this._generation = value;
    }

    /**
     * Train options used for training in between two evolution steps
     */
    private _training?: TrainOptions;

    /**
     * Getter
     */
    public get training(): TrainOptions | undefined {
        return this._training;
    }

    /**
     * Setter
     */
    public set training(value: TrainOptions | undefined) {
        this._training = value;
    }

    /**
     * A template network to create the population from.
     */
    private _template: Network;

    /**
     * Getter
     */
    public get template(): Network {
        return this._template;
    }

    /**
     * Setter
     */
    public set template(value: Network) {
        this._template = value;
    }

    /**
     * Sets allowed [mutation methods](Mutation) for evolution, a random mutation method will be chosen from the array when mutation occurs. Optional, but default methods are non-recurrent.
     */
    private _mutations: Mutation[];

    /**
     * Getter
     */
    public get mutations(): Mutation[] {
        return this._mutations;
    }

    /**
     * Setter
     */
    public set mutations(value: Mutation[]) {
        this._mutations = value;
    }

    /**
     * Sets allowed activations for evolution, a random activation method will be chosen from the array when activation mutation occurs.
     */
    private _activations: ActivationType[];

    /**
     * Getter
     */
    public get activations(): ActivationType[] {
        return this._activations;
    }

    /**
     * Setter
     */
    public set activations(value: ActivationType[]) {
        this._activations = value;
    }

    /**
     * [Selection method](selection) for evolution (e.g. methods.Selection.FITNESS_PROPORTIONATE).
     */
    private _selection: Selection;

    /**
     * Getter
     */
    public get selection(): Selection {
        return this._selection;
    }

    /**
     * Setter
     */
    public set selection(value: Selection) {
        this._selection = value;
    }

    /**
     * Sets the mutation rate. If set to 0.3, 30% of the new population will be mutated.
     */
    private _mutationRate: number;

    /**
     * Getter
     */
    public get mutationRate(): number {
        return this._mutationRate;
    }

    /**
     * Setter
     */
    public set mutationRate(value: number) {
        this._mutationRate = value;
    }

    /**
     * If mutation occurs (randomNumber < mutationRate), sets amount of times a mutation method will be applied to the network.
     */
    private _mutationAmount: number;

    /**
     * Getter
     */
    public get mutationAmount(): number {
        return this._mutationAmount;
    }

    /**
     * Setter
     */
    public set mutationAmount(value: number) {
        this._mutationAmount = value;
    }

    /**
     * Elitism of every evolution loop. [Elitism in genetic algorithms.](https://www.researchgate.net/post/What_is_meant_by_the_term_Elitism_in_the_Genetic_Algorithm)
     */
    private _elitism: number;

    /**
     * Getter
     */
    public get elitism(): number {
        return this._elitism;
    }

    /**
     * Setter
     */
    public set elitism(value: number) {
        this._elitism = value;
    }

    /**
     * Population size of each generation.
     */
    private _populationSize: number;

    /**
     * Getter
     */
    public get populationSize(): number {
        return this._populationSize;
    }

    /**
     * Setter
     */
    public set populationSize(value: number) {
        this._populationSize = value;
    }

    /**
     * A fitness function to evaluate the networks. Takes a `genome`, i.e. a [network](Network), and a `dataset` and sets the genome's score property
     *
     * @param population The population which needs to be evaluated
     * @param dataset The dataset to test the networks.
     */
    private _fitnessFunction?: (
        population: Network[],
        dataset?: {
            /**
             * The input values
             */
            input: number[];
            /**
             * The target output values
             */
            output: number[];
        }[]
    ) => Promise<void>;

    /**
     * Getter
     */
    public get fitnessFunction():
        | ((
        population: Network[],
        dataset?: {
            /**
             * The input values
             */
            input: number[];
            /**
             * The target output values
             */
            output: number[];
        }[]
    ) => Promise<void>)
        | undefined {
        return this._fitnessFunction;
    }

    /**
     * Setter
     */
    public set fitnessFunction(
        value:
            | ((
            population: Network[],
            dataset?: {
                /**
                 * The input values
                 */
                input: number[];
                /**
                 * The target output values
                 */
                output: number[];
            }[]
        ) => Promise<void>)
            | undefined
    ) {
        this._fitnessFunction = value;
    }

    /**
     * Specify the loss function for the evolution, this tells a genome in the population how well it's performing. Default: methods.loss.MSE (recommended).
     */
    private _loss: lossType;

    /**
     * Getter
     */
    public get loss(): lossType {
        return this._loss;
    }

    /**
     * Setter
     */
    public set loss(value: lossType) {
        this._loss = value;
    }

    /**
     * Maximum nodes for a potential network
     */
    private _maxNodes: number;

    /**
     * Getter
     */
    public get maxNodes(): number {
        return this._maxNodes;
    }

    /**
     * Setter
     */
    public set maxNodes(value: number) {
        this._maxNodes = value;
    }

    /**
     * Maximum connections for a potential network
     */
    private _maxConnections: number;

    /**
     * Getter
     */
    public get maxConnections(): number {
        return this._maxConnections;
    }

    /**
     * Setter
     */
    public set maxConnections(value: number) {
        this._maxConnections = value;
    }

    /**
     * Maximum gates for a potential network
     */
    private _maxGates: number;

    /**
     * Getter
     */
    public get maxGates(): number {
        return this._maxGates;
    }

    /**
     * Setter
     */
    public set maxGates(value: number) {
        this._maxGates = value;
    }

    /**
     * If set to true when [Network.crossOver](Network.crossOver) runs it will assume both genomes are equally fit.
     */
    private _equal: boolean;

    /**
     * Getter
     */
    public get equal(): boolean {
        return this._equal;
    }

    /**
     * Setter
     */
    public set equal(value: boolean) {
        this._equal = value;
    }

    /**
     * If set to n, outputs training status every n iterations. Setting `log` to 1 will log the status every iteration
     */
    private _log: number;

    /**
     * Getter
     */
    public get log(): number {
        return this._log;
    }

    /**
     * Setter
     */
    public set log(value: number) {
        this._log = value;
    }

    /**
     * You can schedule tasks to happen every n iterations. Paired with `options.schedule.function`
     */
    private _schedule?: {
        /**
         * You can schedule tasks to happen every n iterations. Paired with `options.schedule.function`
         */
        iterations: number;
        /**
         * A function to run every n iterations as set by `options.schedule.iterations`. Passed as an object with a "function" property that contains the function to run.
         *
         * @param fitness the fitness value of the best genome
         * @param error the current network error
         * @param iteration the current iteration count
         */
        function: (fitness: number, error: number, iteration: number) => undefined;
    };

    /**
     * Getter
     */
    public get schedule():
        | {
        /**
         * You can schedule tasks to happen every n iterations. Paired with `options.schedule.function`
         */
        iterations: number;
        /**
         * A function to run every n iterations as set by `options.schedule.iterations`. Passed as an object with a "function" property that contains the function to run.
         *
         * @param fitness the fitness value of the best genome
         * @param error the current network error
         * @param iteration the current iteration count
         */
        function: (
            fitness: number,
            error: number,
            iteration: number
        ) => undefined;
    }
        | undefined {
        return this._schedule;
    }

    /**
     * Setter
     */
    public set schedule(
        value:
            | {
            /**
             * You can schedule tasks to happen every n iterations. Paired with `options.schedule.function`
             */
            iterations: number;
            /**
             * A function to run every n iterations as set by `options.schedule.iterations`. Passed as an object with a "function" property that contains the function to run.
             *
             * @param fitness the fitness value of the best genome
             * @param error the current network error
             * @param iteration the current iteration count
             */
            function: (
                fitness: number,
                error: number,
                iteration: number
            ) => undefined;
        }
            | undefined
    ) {
        this._schedule = value;
    }

    /**
     * If set to true, will clear the network after every activation. This is useful for evolving recurrent networks, more importantly for time series prediction.
     */
    private _clear: boolean;

    /**
     * Getter
     */
    public get clear(): boolean {
        return this._clear;
    }

    /**
     * Setter
     */
    public set clear(value: boolean) {
        this._clear = value;
    }

    /**
     * Set the maximum amount of iterations/generations for the algorithm to run.
     */
    private _iterations: number;

    /**
     * Getter
     */
    public get iterations(): number {
        return this._iterations;
    }

    /**
     * Setter
     */
    public set iterations(value: number) {
        this._iterations = value;
    }

    /**
     * Set the target error. The algorithm will stop once this target error has been reached.
     */
    private _error: number;

    /**
     * Getter
     */
    public get error(): number {
        return this._error;
    }

    /**
     * Setter
     */
    public set error(value: number) {
        this._error = value;
    }
}
