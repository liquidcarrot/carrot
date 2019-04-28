/**
 * NOT YET IMPLEMENTED
 *
 * Genetic algorithm crossover methods.
 *
 * Traditional genetic algorithms store genetic information in a chromosome represented by a bit array. Crossover methods for bit arrays are popular and an illustrative example of genetic recombination.
 *
 * @see [Crossover (genetic algorithm)]{@link https://en.wikipedia.org/wiki/Crossover_(genetic_algorithm)}
 *
 * @namespace
 */
var crossover = {
  /**
   * @constant
   * @type {object}
   * @description [Singlepoint crossover]{@link https://en.wikipedia.org/wiki/Crossover_(genetic_algorithm)#Single-point_crossover}
   * @default
   *
   * @example
   * let example = "TODO"
   */
  SINGLE_POINT: {
    name: 'SINGLE_POINT',
    config: [0.4]
  },
  /**
   * @constant
   * @type {object}
   * @description [Two point crossover]{@link https://en.wikipedia.org/wiki/Crossover_(genetic_algorithm)#Two-point_and_k-point_crossover}
   * @default
   *
   * @example
   * let example = "TODO"
   */
  TWO_POINT: {
    name: 'TWO_POINT',
    config: [0.4, 0.9]
  },
  /**
   * @constant
   * @type {object}
   * @description [Uniform crossover]{@link https://en.wikipedia.org/wiki/Crossover_(genetic_algorithm)#Uniform_crossover}
   * @default
   *
   * @example
   * let example = "TODO"
   */
  UNIFORM: {
    name: 'UNIFORM'
  },
  /**
   * @constant
   * @type {object}
   * @description Average crossover
   * @default
   *
   * @example
   * let example = "TODO"
   */
  AVERAGE: {
    name: 'AVERAGE'
  }
};

module.exports = crossover;
