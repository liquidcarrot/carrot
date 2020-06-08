"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NEAT = void 0;
var Network_1 = require("./architecture/Network");
var Activation_1 = require("./methods/Activation");
var Mutation_1 = require("./methods/Mutation");
var Selection_1 = require("./methods/Selection");
var Utils_1 = require("./utils/Utils");
/**
 * Runs the NEAT algorithm on group of neural networks.
 *
 * @constructs Neat
 */
var NEAT = /** @class */ (function () {
    /**
     * Constructs a NEAT object.
     *
     * @param options
     * @time O(n)
     */
    function NEAT(options) {
        if (!options.fitnessFunction) {
            throw new ReferenceError("No fitness function given!");
        }
        this.dataset = options.dataset;
        if (options.dataset && options.dataset.length > 0) {
            this.input = options.dataset[0].input.length;
            this.output = options.dataset[0].output.length;
        }
        else {
            this.input = Utils_1.getOrDefault(options.input, 0);
            this.output = Utils_1.getOrDefault(options.output, 0);
        }
        this.generation = Utils_1.getOrDefault(options.generation, 0);
        this.equal = Utils_1.getOrDefault(options.equal, true);
        this.clear = Utils_1.getOrDefault(options.clear, false);
        this.populationSize = Utils_1.getOrDefault(options.populationSize, 50);
        this.elitism = Utils_1.getOrDefault(options.elitism, 2);
        this.provenance = Utils_1.getOrDefault(options.provenance, 0);
        this.mutationRate = Utils_1.getOrDefault(options.mutationRate, 0.6);
        this.mutationAmount = Utils_1.getOrDefault(options.mutationAmount, 5);
        this.fitnessFunction = options.fitnessFunction;
        this.selection = Utils_1.getOrDefault(options.selection, new Selection_1.FitnessProportionateSelection());
        this.mutations = Utils_1.getOrDefault(options.mutations, Mutation_1.FEEDFORWARD_MUTATIONS);
        this.activations = Utils_1.getOrDefault(options.activations, Object.values(Activation_1.ALL_ACTIVATIONS));
        this.template = Utils_1.getOrDefault(options.template, new Network_1.Network(this.input, this.output));
        this.maxNodes = Utils_1.getOrDefault(options.maxNodes, Infinity);
        this.maxConnections = Utils_1.getOrDefault(options.maxConnections, Infinity);
        this.maxGates = Utils_1.getOrDefault(options.maxGates, Infinity);
        this.population = [];
        for (var i = 0; i < this.populationSize; i++) {
            this.population.push(this.template.copy());
        }
    }
    /**
     * Filter genomes from population
     *
     * @param pickGenome Pick a network from the population which gets adjusted or removed
     * @param adjustGenome Adjust the picked network
     * @time O(n * time for adjust genome)
     */
    NEAT.prototype.filterGenome = function (pickGenome, adjustGenome) {
        var _this = this;
        return this.population
            .filter(function (genome) { return pickGenome(genome); })
            .map(function (genome) {
            return adjustGenome ? adjustGenome(genome) : _this.template.copy();
        });
    };
    /**
     * Mutate a network with a random mutation from the allowed array.
     *
     * @param network The network which will be mutated.
     * @time O(n&sup3;)
     */
    NEAT.prototype.mutateRandom = function (network) {
        var _this = this;
        var allowed = this.mutations.filter(function (method) {
            return (method.constructor.name !== Mutation_1.AddNodeMutation.constructor.name || network.nodes.length < _this.maxNodes ||
                method.constructor.name !== Mutation_1.AddConnectionMutation.constructor.name || network.connections.size < _this.maxConnections ||
                method.constructor.name !== Mutation_1.AddGateMutation.constructor.name || network.gates.size < _this.maxGates);
        });
        network.mutate(Utils_1.pickRandom(allowed), { allowedActivations: this.activations });
    };
    /**
     * Evaluates, selects, breeds and mutates population
     *
     * @param {function} [pickGenome] A custom selection function to pick out unwanted genomes. Accepts a network as a parameter and returns true for selection.
     * @param {function} [adjustGenome=self.template] Accepts a network, modifies it, and returns it. Used to modify unwanted genomes returned by `pickGenome` and reincorporate them into the population. If left unset, unwanted genomes will be replaced with the template Network. Will only run when pickGenome is defined.
     *
     * @time O(time for fitness function + n * time for adjust genome + n&sup5;)
     * @returns {Network} Fittest network
     */
    NEAT.prototype.evolve = function (pickGenome, adjustGenome) {
        return __awaiter(this, void 0, void 0, function () {
            var elitists, i, newPopulation, i, fittest;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // Check if evolve is possible
                        if (this.elitism + this.provenance > this.populationSize) {
                            throw new Error("Can`t evolve! Elitism + provenance exceeds population size!");
                        }
                        if (!(this.population[this.population.length - 1].score === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.evaluate()];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        if (pickGenome) {
                            this.population = this.filterGenome(pickGenome, adjustGenome);
                        }
                        // Sort in order of fitness (fittest first)
                        this.sort();
                        elitists = [];
                        for (i = 0; i < this.elitism; i++) {
                            elitists.push(this.population[i]);
                        }
                        newPopulation = Array(this.provenance).fill(this.template.copy());
                        // Breed the next individuals
                        for (i = 0; i < this.populationSize - this.elitism - this.provenance; i++) {
                            newPopulation.push(this.getOffspring());
                        }
                        // Replace the old population with the new population
                        this.population = newPopulation;
                        // Mutate the new population
                        this.mutate();
                        // Add the elitists
                        (_a = this.population).push.apply(_a, elitists);
                        // evaluate the population
                        return [4 /*yield*/, this.evaluate()];
                    case 3:
                        // evaluate the population
                        _b.sent();
                        // Check & adjust genomes as needed
                        if (pickGenome) {
                            this.population = this.filterGenome(pickGenome, adjustGenome);
                        }
                        // Sort in order of fitness (fittest first)
                        this.sort();
                        fittest = this.population[0].copy();
                        fittest.score = this.population[0].score;
                        // Reset the scores
                        this.population.forEach(function (genome) { return genome.score = undefined; });
                        this.generation++;
                        return [2 /*return*/, fittest];
                }
            });
        });
    };
    /**
     * Selects two genomes from the population with `getParent()`, and returns the offspring from those parents. NOTE: Population MUST be sorted
     *
     * @time O(n + time for crossover)
     * @returns {Network} Child network
     */
    NEAT.prototype.getOffspring = function () {
        this.sort();
        var parent1 = this.selection.select(this.population);
        var parent2 = this.selection.select(this.population);
        if (parent1 === null || parent2 === null) {
            throw new ReferenceError("Should not be null!");
        }
        return Network_1.Network.crossOver(parent1, parent2, this.equal);
    };
    /**
     * Mutates the given (or current) population
     *
     * @param {Mutation} [method] A mutation method to mutate the population with. When not specified will pick a random mutation from the set allowed mutations.
     * @time O(n&sup5;)
     */
    NEAT.prototype.mutate = function (method) {
        var _this = this;
        // Elitist genomes should not be included
        this.population
            .filter(function () { return Math.random() <= _this.mutationRate; })
            .forEach(function (genome) {
            for (var i = 0; i < _this.mutationAmount; i++) {
                if (method) {
                    genome.mutate(method);
                }
                else {
                    _this.mutateRandom(genome);
                }
            }
        });
    };
    /**
     * Evaluates the current population, basically sets their `.score` property
     *
     * @time O(n&sup3; + time for fitness function)
     * @return {Network} Fittest Network
     */
    NEAT.prototype.evaluate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.clear) {
                            this.population.forEach(function (genome) { return genome.clear(); });
                        }
                        return [4 /*yield*/, this.fitnessFunction(this.population, this.dataset)];
                    case 1:
                        _a.sent();
                        // Sort the population in order of fitness
                        this.sort();
                        return [2 /*return*/, this.population[0]];
                }
            });
        });
    };
    /**
     * Sorts the population by score (descending)
     * @time O(n)
     * @todo implement a quicksort algorithm in utils
     */
    NEAT.prototype.sort = function () {
        this.population.sort(function (a, b) {
            return a.score === undefined || b.score === undefined ? 0 : b.score - a.score;
        });
    };
    /**
     * Returns the fittest genome of the current population
     *
     * @time O(n + time for fitness function)
     * @returns {Network} Current population's fittest genome
     */
    NEAT.prototype.getFittest = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.population[this.population.length - 1].score === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.evaluate()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.sort();
                        return [2 /*return*/, this.population[0]];
                }
            });
        });
    };
    /**
     * Returns the average fitness of the current population
     *
     * @time O(n + time for fitness function)
     * @returns {number} Average fitness of the current population
     */
    NEAT.prototype.getAverage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var score;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.population[this.population.length - 1].score === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.evaluate()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        score = 0;
                        this.population
                            .map(function (genome) { return genome.score; })
                            .forEach(function (val) { return score += val !== null && val !== void 0 ? val : 0; });
                        return [2 /*return*/, score / this.population.length];
                }
            });
        });
    };
    /**
     * Replace the whole population with the new genomes
     * @param genomes the genomes which replace the population
     * @time O(1)
     */
    NEAT.prototype.replacePopulation = function (genomes) {
        this.population = genomes;
        this.populationSize = genomes.length;
    };
    return NEAT;
}());
exports.NEAT = NEAT;
