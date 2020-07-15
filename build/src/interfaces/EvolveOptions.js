"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvolveOptions = void 0;
var src_1 = require("activations/build/src");
var os_1 = __importDefault(require("os"));
var Network_1 = require("../architecture/Network");
var Loss_1 = require("../methods/Loss");
var Mutation_1 = require("../methods/Mutation");
var Selection_1 = require("../methods/Selection");
/**
 * Options used to evolve network
 */
var EvolveOptions = /** @class */ (function () {
    function EvolveOptions() {
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
    Object.defineProperty(EvolveOptions.prototype, "speciesDistanceThreshold", {
        /**
         * Getter
         */
        get: function () {
            return this._speciesDistanceThreshold;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._speciesDistanceThreshold = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvolveOptions.prototype, "c1", {
        /**
         * Getter
         */
        get: function () {
            return this._c1;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._c1 = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvolveOptions.prototype, "c2", {
        /**
         * Getter
         */
        get: function () {
            return this._c2;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._c2 = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvolveOptions.prototype, "c3", {
        /**
         * Getter
         */
        get: function () {
            return this._c3;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._c3 = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvolveOptions.prototype, "survivors", {
        /**
         * Getter
         */
        get: function () {
            return this._survivors;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._survivors = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvolveOptions.prototype, "threads", {
        /**
         * Getter
         */
        get: function () {
            return this._threads;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._threads = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvolveOptions.prototype, "input", {
        /**
         * Getter
         */
        get: function () {
            return this._input;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._input = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvolveOptions.prototype, "output", {
        /**
         * Getter
         */
        get: function () {
            return this._output;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._output = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvolveOptions.prototype, "dataset", {
        /**
         * Getter
         */
        get: function () {
            return this._dataset;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._dataset = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvolveOptions.prototype, "generation", {
        /**
         * Getter
         */
        get: function () {
            return this._generation;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._generation = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvolveOptions.prototype, "training", {
        /**
         * Getter
         */
        get: function () {
            return this._training;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._training = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvolveOptions.prototype, "template", {
        /**
         * Getter
         */
        get: function () {
            return this._template;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._template = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvolveOptions.prototype, "mutations", {
        /**
         * Getter
         */
        get: function () {
            return this._mutations;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._mutations = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvolveOptions.prototype, "activations", {
        /**
         * Getter
         */
        get: function () {
            return this._activations;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._activations = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvolveOptions.prototype, "selection", {
        /**
         * Getter
         */
        get: function () {
            return this._selection;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._selection = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvolveOptions.prototype, "mutationRate", {
        /**
         * Getter
         */
        get: function () {
            return this._mutationRate;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._mutationRate = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvolveOptions.prototype, "mutationAmount", {
        /**
         * Getter
         */
        get: function () {
            return this._mutationAmount;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._mutationAmount = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvolveOptions.prototype, "elitism", {
        /**
         * Getter
         */
        get: function () {
            return this._elitism;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._elitism = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvolveOptions.prototype, "populationSize", {
        /**
         * Getter
         */
        get: function () {
            return this._populationSize;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._populationSize = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvolveOptions.prototype, "fitnessFunction", {
        /**
         * Getter
         */
        get: function () {
            return this._fitnessFunction;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._fitnessFunction = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvolveOptions.prototype, "loss", {
        /**
         * Getter
         */
        get: function () {
            return this._loss;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._loss = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvolveOptions.prototype, "maxNodes", {
        /**
         * Getter
         */
        get: function () {
            return this._maxNodes;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._maxNodes = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvolveOptions.prototype, "maxConnections", {
        /**
         * Getter
         */
        get: function () {
            return this._maxConnections;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._maxConnections = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvolveOptions.prototype, "maxGates", {
        /**
         * Getter
         */
        get: function () {
            return this._maxGates;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._maxGates = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvolveOptions.prototype, "equal", {
        /**
         * Getter
         */
        get: function () {
            return this._equal;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._equal = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvolveOptions.prototype, "log", {
        /**
         * Getter
         */
        get: function () {
            return this._log;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._log = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvolveOptions.prototype, "schedule", {
        /**
         * Getter
         */
        get: function () {
            return this._schedule;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._schedule = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvolveOptions.prototype, "clear", {
        /**
         * Getter
         */
        get: function () {
            return this._clear;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._clear = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvolveOptions.prototype, "iterations", {
        /**
         * Getter
         */
        get: function () {
            return this._iterations;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._iterations = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvolveOptions.prototype, "error", {
        /**
         * Getter
         */
        get: function () {
            return this._error;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._error = value;
        },
        enumerable: false,
        configurable: true
    });
    return EvolveOptions;
}());
exports.EvolveOptions = EvolveOptions;
