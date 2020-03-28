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
export enum CrossoverType {
  /**
   * @constant
   * @type {object}
   * @description [Singlepoint crossover]{@link https://en.wikipedia.org/wiki/Crossover_(genetic_algorithm)#Single-point_crossover}
   * @default
   *
   * @example
   * let example = "TODO"
   */
  SINGLE_POINT,
  /**
   * @constant
   * @type {object}
   * @description [Two point crossover]{@link https://en.wikipedia.org/wiki/Crossover_(genetic_algorithm)#Two-point_and_k-point_crossover}
   * @default
   *
   * @example
   * let example = "TODO"
   */
  TWO_POINT,
  /**
   * @constant
   * @type {object}
   * @description [Uniform crossover]{@link https://en.wikipedia.org/wiki/Crossover_(genetic_algorithm)#Uniform_crossover}
   * @default
   *
   * @example
   * let example = "TODO"
   */
  UNIFORM,
  /**
   * @constant
   * @type {object}
   * @description Average crossover
   * @default
   *
   * @example
   * let example = "TODO"
   */
  AVERAGE
}
