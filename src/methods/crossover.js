/**
* @todo Create a namespace description
*
* @module
*
* @see {@link https://en.wikipedia.org/wiki/Crossover_(genetic_algorithm)|Crossover (genetic algorithm)}
*
* @namespace
* @prop {object} SINGLE_POINT
* @prop {string} SINGLE_POINT.name="SINGLE_POINT"
* @prop {number[]} SINGLE_POINT.config=[0.4]
* @prop {object} TWO_POINT
* @prop {string} TWO_POINT.name="TWO_POINT"
* @prop {number[]} TWO_POINT.config=[0.4, 0.9]
* @prop {object} UNIFORM
* @prop {string} UNIFORM.name="UNIFORM"
* @prop {object} AVERAGE
* @prop {string} AVERAGE.name="AVERAGE"
*/
var crossover = {
  SINGLE_POINT: {
    name: 'SINGLE_POINT',
    config: [0.4]
  },
  TWO_POINT: {
    name: 'TWO_POINT',
    config: [0.4, 0.9]
  },
  UNIFORM: {
    name: 'UNIFORM'
  },
  AVERAGE: {
    name: 'AVERAGE'
  }
};

module.exports = crossover;
