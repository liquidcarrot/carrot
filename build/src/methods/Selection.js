"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var TimSort = __importStar(require("timsort"));
var Utils_1 = require("../utils/Utils");
/**
 * Genetic Algorithm Selection Methods (Genetic Operator)
 *
 * @see [Genetic Algorithm - Selection]{@link https://en.wikipedia.org/wiki/Selection_(genetic_algorithm)}
 */
var Selection = /** @class */ (function () {
    function Selection() {
    }
    return Selection;
}());
exports.Selection = Selection;
/**
 * Fitness proportionate selection
 *
 * [Fitness Proportionate / Roulette Wheel Selection on Wikipedia](https://en.wikipedia.org/wiki/Fitness_proportionate_selection)
 */
var FitnessProportionateSelection = /** @class */ (function (_super) {
    __extends(FitnessProportionateSelection, _super);
    function FitnessProportionateSelection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Selects a genome from the population according to the Selection method.
     *
     * @param population the pool of networks
     * @returns the selected genome
     */
    FitnessProportionateSelection.prototype.select = function (population) {
        var _a, _b, _c;
        var totalFitness = 0;
        var minimalFitness = 0;
        for (var _i = 0, population_1 = population; _i < population_1.length; _i++) {
            var genome = population_1[_i];
            minimalFitness = Math.min((_a = genome.score) !== null && _a !== void 0 ? _a : minimalFitness, minimalFitness);
            totalFitness += (_b = genome.score) !== null && _b !== void 0 ? _b : 0;
        }
        minimalFitness = Math.abs(minimalFitness);
        totalFitness += minimalFitness * population.length;
        var random = Utils_1.randDouble(0, totalFitness);
        var value = 0;
        for (var _d = 0, population_2 = population; _d < population_2.length; _d++) {
            var genome = population_2[_d];
            value += ((_c = genome.score) !== null && _c !== void 0 ? _c : 0) + minimalFitness;
            if (random < value) {
                return genome;
            }
        }
        return Utils_1.pickRandom(population);
    };
    return FitnessProportionateSelection;
}(Selection));
exports.FitnessProportionateSelection = FitnessProportionateSelection;
/**
 * Power selection
 *
 * A random decimal value between 0 and 1 will be generated (e.g. 0.5) then this value will get an exponential value (power, default is 4). So 0.5**4 = 0.0625. This is converted into an index for the array of the current population, sorted from fittest to worst.
 */
var PowerSelection = /** @class */ (function (_super) {
    __extends(PowerSelection, _super);
    /**
     * Constructs a power selection.
     * @param power Probability of picking better networks.
     */
    function PowerSelection(power) {
        if (power === void 0) { power = 4; }
        var _this = _super.call(this) || this;
        _this.power = power;
        return _this;
    }
    /**
     * Selects a genome from the population according to the Selection method.
     *
     * @param population the pool of networks
     * @returns the selected genome
     */
    PowerSelection.prototype.select = function (population) {
        return population[Math.floor(Math.pow(Math.random(), this.power) * population.length)];
    };
    return PowerSelection;
}(Selection));
exports.PowerSelection = PowerSelection;
/**
 * Tournament selection
 *
 * [Tournament Selection on Wikipedia](https://en.wikipedia.org/wiki/Tournament_selection)
 */
var TournamentSelection = /** @class */ (function (_super) {
    __extends(TournamentSelection, _super);
    /**
     * Constructs a tournament selection.
     * @param size the size of a tournament
     * @param probability Selects the best individual (when probability = 1).
     */
    function TournamentSelection(size, probability) {
        if (size === void 0) { size = 5; }
        if (probability === void 0) { probability = 0.5; }
        var _this = _super.call(this) || this;
        _this.size = size;
        _this.probability = probability;
        return _this;
    }
    /**
     * Selects a genome from the population according to the Selection method.
     *
     * @param population the pool of networks
     * @returns the selected genome
     */
    TournamentSelection.prototype.select = function (population) {
        if (this.size > population.length) {
            throw new Error("Your tournament size should be lower than the population size, please change methods.selection.TOURNAMENT.size");
        }
        // Create a tournament
        var individuals = [];
        for (var i = 0; i < this.size; i++) {
            individuals.push(Utils_1.pickRandom(population));
        }
        // Sort the tournament individuals by score
        TimSort.sort(individuals, function (a, b) {
            return b.score === undefined || a.score === undefined ? 0 : b.score - a.score;
        });
        // Select an individual
        for (var i = 0; i < this.size; i++) {
            if (Math.random() < this.probability || i === this.size - 1) {
                return individuals[i];
            }
        }
        return Utils_1.pickRandom(population);
    };
    return TournamentSelection;
}(Selection));
exports.TournamentSelection = TournamentSelection;
