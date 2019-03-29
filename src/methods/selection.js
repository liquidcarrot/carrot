/**
 *
 * @module
 *
 * @namespace
 *
 * @todo Create a namespace description
 * @todo Add `@prop` tag descriptions
 *
 * @see {@link https://en.wikipedia.org/wiki/Selection_(genetic_algorithm)|Selection (genetic algorithm)}
 *
 * @prop {object} FITNESS_PROPORTIONATE
 * @prop {string} FITNESS_PROPORTIONATE.name="FITNESS_PROPORTIONATE"
 * @prop {object} POWER
 * @prop {string} POWER.name="POWER"
 * @prop {number} POWER.power=4
 * @prop {object} TOURNAMENT
 * @prop {string} TOURNAMENT.name="TOURNAMENT"
 * @prop {number} TOURNAMENT.size=5
 * @prop {number} TOURNAMENT.probability=0.5
*/
var selection = {
  // @see {@link https://en.wikipedia.org/wiki/Fitness_proportionate_selection|Fitness Proportionate Selection / Roulette Wheel Selection}
  FITNESS_PROPORTIONATE: {
    name: 'FITNESS_PROPORTIONATE'
  },
  POWER: {
    name: 'POWER',
    power: 4
  },
  // @see {@link https://en.wikipedia.org/wiki/Tournament_selection|Tournament Selection}
  TOURNAMENT: {
    name: 'TOURNAMENT',
    size: 5,
    probability: 0.5
  }
};

module.exports = selection;
