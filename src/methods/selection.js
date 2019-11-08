/**
 * Genetic Algorithm Selection Methods (Genetic Operator)
 *
 * @namespace
 *
 * @see [Genetic Algorithm - Selection]{@link https://en.wikipedia.org/wiki/Selection_(genetic_algorithm)}
 *
 * @example
 * let { architect, methods } = require("@liquid-carrot/carrot");
 *
 * let myNetwork = new architect.Perceptron(1,1,1);
 * let myTrainingSet = [{ input:[0], output:[1]}, { input:[1], output:[0]}];
 *
 * myNetwork.evolve(myTrainingSet, {
 *  generations: 10,
 *  selection: methods.selection.POWER // eg.
 * });
*/
const selection = {
  /**
   * @constant
   * @type {object}
   * @description [Fitness Proportionate / Roulette Wheel Selection on Wikipedia](https://en.wikipedia.org/wiki/Fitness_proportionate_selection)
   * @default
   *
   * @example
   * let { architect, methods } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new architect.Perceptron(1,1,1);
   * let myTrainingSet = [{ input:[0], output:[1]}, { input:[1], output:[0]}];
   *
   * myNetwork.evolve(myTrainingSet, {
   *  generations: 10,
   *  selection: methods.selection.FITNESS_PROPORTIONATE // eg.
   * });
   */
  FITNESS_PROPORTIONATE: {
    name: 'FITNESS_PROPORTIONATE',
  },
  /**
   * @constant
   * @type {object}
   * @description A random decimal value between 0 and 1 will be generated (e.g. 0.5) then this value will get an exponential value (power, default is 4). So 0.5**4 = 0.0625. This is converted into an index for the array of the current population, sorted from fittest to worst.
   * @default
   *
   * @example
   * let { architect, methods } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new architect.Perceptron(1,1,1);
   * let myTrainingSet = [{ input:[0], output:[1]}, { input:[1], output:[0]}];
   *
   * myNetwork.evolve(myTrainingSet, {
   *  generations: 10,
   *  selection: methods.selection.POWER // eg.
   * });
   */
  POWER: {
    name: 'POWER',
    power: 4,
  },
  /**
   * @constant
   * @type {object}
   * @description [Tournament Selection on Wikipedia](https://en.wikipedia.org/wiki/Tournament_selection)
   * @default
   *
   * @example
   * let { architect, methods } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new architect.Perceptron(1,1,1);
   * let myTrainingSet = [{ input:[0], output:[1]}, { input:[1], output:[0]}];
   *
   * myNetwork.evolve(myTrainingSet, {
   *  generations: 10,
   *  selection: methods.selection.TOURNAMENT // eg.
   * });
   */
  TOURNAMENT: {
    name: 'TOURNAMENT',
    size: 5,
    probability: 0.5,
  },
};

module.exports = selection;
