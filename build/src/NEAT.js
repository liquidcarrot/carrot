"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NEAT = void 0;
const TimSort = __importStar(require("timsort"));
const Species_1 = require("./architecture/Species");
const Mutation_1 = require("./methods/Mutation");
const Utils_1 = require("./utils/Utils");
/**
 * Runs the NEAT algorithm on group of neural networks.
 *
 * @constructs Neat
 */
class NEAT {
    /**
     * Constructs a NEAT object.
     *
     * @param options
     */
    constructor(options) {
        if (!options.fitnessFunction) {
            throw new ReferenceError("No fitness function given!");
        }
        this._options = options;
        this.population = [];
        this.species = new Set();
        for (let i = 0; i < this.options.populationSize; i++) {
            this.population.push(this.options.template.copy());
        }
    }
    /**
     * Getter
     */
    get options() {
        return this._options;
    }
    /**
     * Setter
     */
    set options(value) {
        this._options = value;
    }
    /**
     * Mutate a network with a random mutation from the allowed array.
     *
     * @param network The network which will be mutated.
     */
    mutateRandom(network) {
        const allowed = this.options.mutations.filter(method => {
            return (method.constructor.name !== Mutation_1.AddNodeMutation.constructor.name || network.nodes.length < this.options.maxNodes ||
                method.constructor.name !== Mutation_1.AddConnectionMutation.constructor.name || network.connections.size < this.options.maxConnections ||
                method.constructor.name !== Mutation_1.AddGateMutation.constructor.name || network.gates.size < this.options.maxGates);
        });
        network.mutate(Utils_1.pickRandom(allowed), { allowedActivations: this.options.activations });
    }
    /**
     * Evaluates, selects, breeds and mutates population
     *
     * @returns {Network} Fittest network
     */
    evolve() {
        return __awaiter(this, void 0, void 0, function* () {
            this.genSpecies();
            yield this.evaluate();
            this.sort();
            this.species.forEach(species => species.evaluateScore());
            this.kill(1 - this.options.survivors);
            this.removeExtinctSpecies();
            this.reproduce();
            const elitists = this.population.splice(0, this.options.elitism);
            this.mutate();
            this.population.splice(0, 0, ...elitists);
            if (this.options.training) {
                for (const genome of this.population) {
                    genome.train(this.options.training);
                }
            }
            // evaluate the population
            yield this.evaluate();
            // Sort in order of fitness (fittest first)
            this.sort();
            const fittest = this.population[0].copy();
            fittest.score = this.population[0].score;
            console.log("\n---------------------------");
            console.log("Generation: " + this.options.generation + "; Species: " + this.species.size + "; Score: " + this.population[0].score);
            for (const species of this.species) {
                species.print();
            }
            // Reset the scores
            this.population.forEach(genome => genome.score = undefined);
            this.options.generation++;
            return fittest;
        });
    }
    /**
     * Mutates the given (or current) population
     *
     * @param {Mutation} [method] A mutation method to mutate the population with. When not specified will pick a random mutation from the set allowed mutations.
     */
    mutate(method) {
        // Elitist genomes should not be included
        this.population
            .filter(() => Math.random() <= this.options.mutationRate)
            .forEach(genome => {
            for (let i = 0; i < this.options.mutationAmount; i++) {
                if (method) {
                    genome.mutate(method);
                }
                else {
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
    evaluate() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.options.clear) {
                this.population.forEach(genome => genome.clear());
            }
            yield ((_b = (_a = this.options).fitnessFunction) === null || _b === void 0 ? void 0 : _b.call(_a, this.population, this.options.dataset));
            // Sort the population in order of fitness
            this.sort();
            return this.population[0];
        });
    }
    /**
     * Sorts the population by score (descending)
     * @todo implement a quicksort algorithm in utils
     */
    sort() {
        TimSort.sort(this.population, (a, b) => {
            return a.score === undefined || b.score === undefined ? 0 : b.score - a.score;
        });
    }
    /**
     * Returns the fittest genome of the current population
     *
     * @returns {Network} Current population's fittest genome
     */
    getFittest() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.population[this.population.length - 1].score === undefined) {
                yield this.evaluate();
            }
            this.sort();
            return this.population[0];
        });
    }
    /**
     * Returns the average fitness of the current population
     *
     * @returns {number} Average fitness of the current population
     */
    getAverage() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.population[this.population.length - 1].score === undefined) {
                yield this.evaluate();
            }
            let score = 0;
            this.population
                .map(genome => genome.score)
                .forEach(val => score += val !== null && val !== void 0 ? val : 0);
            return score / this.population.length;
        });
    }
    /**
     * Replace the whole population with the new genomes
     * @param genomes the genomes which replace the population
     */
    replacePopulation(genomes) {
        this.population = genomes;
        this.options.populationSize = genomes.length;
    }
    /**
     * Reproduce the population, by replacing the killed networks
     * @private
     */
    reproduce() {
        const speciesArr = Array.from(this.species);
        for (let i = 0; i < this.population.length; i++) {
            if (this.population[i].species === null) {
                const selectedSpecies = this.options.selection.select(speciesArr);
                this.population[i] = selectedSpecies.breed();
                selectedSpecies.forcePut(this.population[i]);
            }
        }
    }
    /**
     * Remove empty species
     * @private
     */
    removeExtinctSpecies() {
        for (const species of Array.from(this.species)) {
            if (species.size() <= 1 || species.stagnation > this.options.maxStagnation) {
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
    kill(killRate) {
        this.species.forEach(species => species.kill(killRate));
    }
    /**
     * Generate species
     * @private
     */
    genSpecies() {
        this.species.forEach(species => species.reset());
        this.population.filter(genome => genome.species === null).forEach(genome => {
            let found = false;
            for (const species of Array.from(this.species)) {
                if (species.put(genome, this.options.c1, this.options.c2, this.options.c3, this.options.speciesDistanceThreshold)) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                this.species.add(new Species_1.Species(genome));
            }
        });
    }
}
exports.NEAT = NEAT;
