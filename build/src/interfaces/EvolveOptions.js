"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvolveOptions = void 0;
const src_1 = require("activations/build/src");
const os_1 = __importDefault(require("os"));
const Network_1 = require("../architecture/Network");
const Loss_1 = require("../methods/Loss");
const Mutation_1 = require("../methods/Mutation");
const Selection_1 = require("../methods/Selection");
/**
 * Options used to evolve network
 */
class EvolveOptions {
    constructor() {
        /**
         * How big could the distance be between a network and the represent of a species?
         */
        this._speciesDistanceThreshold = 4;
        this._c1 = 1;
        this._c2 = 1;
        this._c3 = 1;
        this._survivors = 0.8;
        this._input = 1;
        this._output = 1;
        this._generation = 0;
        this._elitism = 1;
        this._equal = true;
        this._clear = false;
        this._populationSize = 50;
        this._mutationRate = 0.6;
        this._mutationAmount = 5;
        this._selection = new Selection_1.FitnessProportionateSelection();
        this._loss = Loss_1.MSELoss;
        this._mutations = Mutation_1.FEEDFORWARD_MUTATIONS;
        this._activations = Object.values(src_1.ALL_ACTIVATIONS);
        this._template = new Network_1.Network(this._input, this._output);
        this._maxNodes = Infinity;
        this._maxConnections = Infinity;
        this._maxGates = Infinity;
        this._threads = os_1.default.cpus().length;
        this._log = -1;
        this._iterations = 1000;
        this._error = 0.05;
    }
    /**
     * Getter
     */
    get speciesDistanceThreshold() {
        return this._speciesDistanceThreshold;
    }
    /**
     * Setter
     */
    set speciesDistanceThreshold(value) {
        this._speciesDistanceThreshold = value;
    }
    /**
     * Getter
     */
    get c1() {
        return this._c1;
    }
    /**
     * Setter
     */
    set c1(value) {
        this._c1 = value;
    }
    /**
     * Getter
     */
    get c2() {
        return this._c2;
    }
    /**
     * Setter
     */
    set c2(value) {
        this._c2 = value;
    }
    /**
     * Getter
     */
    get c3() {
        return this._c3;
    }
    /**
     * Setter
     */
    set c3(value) {
        this._c3 = value;
    }
    /**
     * Getter
     */
    get survivors() {
        return this._survivors;
    }
    /**
     * Setter
     */
    set survivors(value) {
        this._survivors = value;
    }
    /**
     * Getter
     */
    get threads() {
        return this._threads;
    }
    /**
     * Setter
     */
    set threads(value) {
        this._threads = value;
    }
    /**
     * Getter
     */
    get input() {
        return this._input;
    }
    /**
     * Setter
     */
    set input(value) {
        this._input = value;
    }
    /**
     * Getter
     */
    get output() {
        return this._output;
    }
    /**
     * Setter
     */
    set output(value) {
        this._output = value;
    }
    /**
     * Getter
     */
    get dataset() {
        return this._dataset;
    }
    /**
     * Setter
     */
    set dataset(value) {
        this._dataset = value;
    }
    /**
     * Getter
     */
    get generation() {
        return this._generation;
    }
    /**
     * Setter
     */
    set generation(value) {
        this._generation = value;
    }
    /**
     * Getter
     */
    get training() {
        return this._training;
    }
    /**
     * Setter
     */
    set training(value) {
        this._training = value;
    }
    /**
     * Getter
     */
    get template() {
        return this._template;
    }
    /**
     * Setter
     */
    set template(value) {
        this._template = value;
    }
    /**
     * Getter
     */
    get mutations() {
        return this._mutations;
    }
    /**
     * Setter
     */
    set mutations(value) {
        this._mutations = value;
    }
    /**
     * Getter
     */
    get activations() {
        return this._activations;
    }
    /**
     * Setter
     */
    set activations(value) {
        this._activations = value;
    }
    /**
     * Getter
     */
    get selection() {
        return this._selection;
    }
    /**
     * Setter
     */
    set selection(value) {
        this._selection = value;
    }
    /**
     * Getter
     */
    get mutationRate() {
        return this._mutationRate;
    }
    /**
     * Setter
     */
    set mutationRate(value) {
        this._mutationRate = value;
    }
    /**
     * Getter
     */
    get mutationAmount() {
        return this._mutationAmount;
    }
    /**
     * Setter
     */
    set mutationAmount(value) {
        this._mutationAmount = value;
    }
    /**
     * Getter
     */
    get elitism() {
        return this._elitism;
    }
    /**
     * Setter
     */
    set elitism(value) {
        this._elitism = value;
    }
    /**
     * Getter
     */
    get populationSize() {
        return this._populationSize;
    }
    /**
     * Setter
     */
    set populationSize(value) {
        this._populationSize = value;
    }
    /**
     * Getter
     */
    get fitnessFunction() {
        return this._fitnessFunction;
    }
    /**
     * Setter
     */
    set fitnessFunction(value) {
        this._fitnessFunction = value;
    }
    /**
     * Getter
     */
    get loss() {
        return this._loss;
    }
    /**
     * Setter
     */
    set loss(value) {
        this._loss = value;
    }
    /**
     * Getter
     */
    get maxNodes() {
        return this._maxNodes;
    }
    /**
     * Setter
     */
    set maxNodes(value) {
        this._maxNodes = value;
    }
    /**
     * Getter
     */
    get maxConnections() {
        return this._maxConnections;
    }
    /**
     * Setter
     */
    set maxConnections(value) {
        this._maxConnections = value;
    }
    /**
     * Getter
     */
    get maxGates() {
        return this._maxGates;
    }
    /**
     * Setter
     */
    set maxGates(value) {
        this._maxGates = value;
    }
    /**
     * Getter
     */
    get equal() {
        return this._equal;
    }
    /**
     * Setter
     */
    set equal(value) {
        this._equal = value;
    }
    /**
     * Getter
     */
    get log() {
        return this._log;
    }
    /**
     * Setter
     */
    set log(value) {
        this._log = value;
    }
    /**
     * Getter
     */
    get schedule() {
        return this._schedule;
    }
    /**
     * Setter
     */
    set schedule(value) {
        this._schedule = value;
    }
    /**
     * Getter
     */
    get clear() {
        return this._clear;
    }
    /**
     * Setter
     */
    set clear(value) {
        this._clear = value;
    }
    /**
     * Getter
     */
    get iterations() {
        return this._iterations;
    }
    /**
     * Setter
     */
    set iterations(value) {
        this._iterations = value;
    }
    /**
     * Getter
     */
    get error() {
        return this._error;
    }
    /**
     * Setter
     */
    set error(value) {
        this._error = value;
    }
}
exports.EvolveOptions = EvolveOptions;
