/**
* @todo Create a namespace description
* @todo Add `@prop` tag types
* @todo Add `@prop` tag descriptions
* @todo Add `@prop` tag defaults
* 
* @see {@link // https://en.wikipedia.org/wiki/Selection_(genetic_algorithm)|Selection (genetic algorithm)}
* 
* @prop {object} FITNESS_PROPORTIONATE
* @prop {string} FITNESS_PROPORTIONATE.name="FITNESS_PROPORTIONATE"
* @prop {object} POWER
* @prop {string} POWER.name="POWER"
* @prop {object} TOURNAMENT
* @prop {string} TOURNAMENT.name="TOURNAMENT"
* @prop {object} TOURNAMENT.size=5
* @prop {object} TOURNAMENT.probability=0.5
*/
var selection = {
  FITNESS_PROPORTIONATE: {
    name: 'FITNESS_PROPORTIONATE'
  },
  POWER: {
    name: 'POWER',
    power: 4
  },
  TOURNAMENT: {
    name: 'TOURNAMENT',
    size: 5,
    probability: 0.5
  }
};

module.exports = selection;
