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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentSelection = exports.PowerSelection = exports.FitnessProportionateSelection = exports.Selection = void 0;
const TimSort = __importStar(require("timsort"));
const Utils_1 = require("../utils/Utils");
/**
 * Genetic Algorithm Selection Methods (Genetic Operator)
 *
 * @see [Genetic Algorithm - Selection]{@link https://en.wikipedia.org/wiki/Selection_(genetic_algorithm)}
 */
class Selection {
}
exports.Selection = Selection;
/**
 * Fitness proportionate selection
 *
 * [Fitness Proportionate / Roulette Wheel Selection on Wikipedia](https://en.wikipedia.org/wiki/Fitness_proportionate_selection)
 */
class FitnessProportionateSelection extends Selection {
    /**
     * Selects a genome from the population according to the Selection method.
     *
     * @param population the pool of networks
     * @returns the selected genome
     */
    select(population) {
        var _a, _b, _c;
        let totalFitness = 0;
        let minimalFitness = 0;
        for (const genome of population) {
            minimalFitness = Math.min((_a = genome.score) !== null && _a !== void 0 ? _a : minimalFitness, minimalFitness);
            totalFitness += (_b = genome.score) !== null && _b !== void 0 ? _b : 0;
        }
        minimalFitness = Math.abs(minimalFitness);
        totalFitness += minimalFitness * population.length;
        const random = Utils_1.randDouble(0, totalFitness);
        let value = 0;
        for (const genome of population) {
            value += ((_c = genome.score) !== null && _c !== void 0 ? _c : 0) + minimalFitness;
            if (random < value) {
                return genome;
            }
        }
        return Utils_1.pickRandom(population);
    }
}
exports.FitnessProportionateSelection = FitnessProportionateSelection;
/**
 * Power selection
 *
 * A random decimal value between 0 and 1 will be generated (e.g. 0.5) then this value will get an exponential value (power, default is 4). So 0.5**4 = 0.0625. This is converted into an index for the array of the current population, sorted from fittest to worst.
 */
class PowerSelection extends Selection {
    /**
     * Constructs a power selection.
     * @param power Probability of picking better networks.
     */
    constructor(power = 4) {
        super();
        this.power = power;
    }
    /**
     * Selects a genome from the population according to the Selection method.
     *
     * @param population the pool of networks
     * @returns the selected genome
     */
    select(population) {
        return population[Math.floor(Math.pow(Math.random(), this.power) * population.length)];
    }
}
exports.PowerSelection = PowerSelection;
/**
 * Tournament selection
 *
 * [Tournament Selection on Wikipedia](https://en.wikipedia.org/wiki/Tournament_selection)
 */
class TournamentSelection extends Selection {
    /**
     * Constructs a tournament selection.
     * @param size the size of a tournament
     * @param probability Selects the best individual (when probability = 1).
     */
    constructor(size = 5, probability = 0.5) {
        super();
        this.size = size;
        this.probability = probability;
    }
    /**
     * Selects a genome from the population according to the Selection method.
     *
     * @param population the pool of networks
     * @returns the selected genome
     */
    select(population) {
        if (this.size > population.length) {
            throw new Error(`Your tournament size should be lower than the population size, please change methods.selection.TOURNAMENT.size`);
        }
        // Create a tournament
        const individuals = [];
        for (let i = 0; i < this.size; i++) {
            individuals.push(Utils_1.pickRandom(population));
        }
        // Sort the tournament individuals by score
        TimSort.sort(individuals, (a, b) => {
            return b.score === undefined || a.score === undefined ? 0 : b.score - a.score;
        });
        // Select an individual
        for (let i = 0; i < this.size; i++) {
            if (Math.random() < this.probability || i === this.size - 1) {
                return individuals[i];
            }
        }
        return Utils_1.pickRandom(population);
    }
}
exports.TournamentSelection = TournamentSelection;
