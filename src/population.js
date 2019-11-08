/* eslint-disable */
const _ = require("lodash");
let Network = require('./architecture/network');
let methods = require('./methods/methods');
let config = require('./config');

// Easier variable naming
let selection = methods.selection;

function Population({
  template,
  size=50,
  data=[],
  population=[],
  fitness=(genome, data) => 1 - genome.test(data).error,
  _sorted=false,
  _selection=methods.selection.POWER
} = {}) {
  let self = this;

  _.assignIn(self, {template,size,data,population,fitness});

  if(self.template && !self.population.length) _.times(self.size, function() {
    self.population.push(Network.fromJSON({ ...self.template.toJSON(), score: undefined }));
  });
}

Population.prototype = {
  evaluate: async function() {
    let self = this;

    _.each(self.population, function(genome, index) {
      self.population[index].score = self.fitness(genome, self.data);
    })
  },

  // Mates 2 "good genomes"; returns child
  mate: function(genomes, options) {
    let self = this;
    return Network.crossOver(self.getParent(), self.getParent(), true);
  },

  // Selects a "good genome" by `this.selection`
  select: function (options) {
    let self = this;

    let i;
    switch (this.selection) {
      case selection.POWER:
        if(!self._sorted) self.population = _.sortBy(self.population, ["score"]);

        return this.population[Math.floor(Math.pow(Math.random(), self.selection.power) * self.population.length)];
      case selection.FITNESS_PROPORTIONATE:
        // As negative fitnesses are possible
        // https://stackoverflow.com/questions/16186686/genetic-algorithm-handling-negative-fitness-values
        // this is unnecessarily run for every individual, should be changed

        let totalFitness = 0;
        let minimalFitness = 0;
        for (i = 0; i < this.population.length; i++) {
          let score = this.population[i].score;
          minimalFitness = score < minimalFitness ? score : minimalFitness;
          totalFitness += score;
        }

        minimalFitness = Math.abs(minimalFitness);
        totalFitness += minimalFitness * this.population.length;

        let random = Math.random() * totalFitness;
        let value = 0;

        for (i = 0; i < this.population.length; i++) {
          let genome = this.population[i];
          value += genome.score + minimalFitness;
          if (random < value) return genome;
        }

        // if all scores equal, return random genome
        return this.population[Math.floor(Math.random() * this.population.length)];
      case selection.TOURNAMENT:
        if (this.selection.size > this.population_size) {
          throw new Error('Your tournament size should be lower than the population size, please change methods.selection.TOURNAMENT.size');
        }

        // Create a tournament
        let individuals = [];
        for (i = 0; i < this.selection.size; i++) {
          let random = this.population[Math.floor(Math.random() * this.population.length)];
          individuals.push(random);
        }

        // Sort the tournament individuals by score
        individuals.sort(function (a, b) {
          return b.score - a.score;
        });

        // Select an individual
        for (i = 0; i < this.selection.size; i++) {
          if (Math.random() < this.selection.probability || i === this.selection.size - 1) {
            return individuals[i];
          }
        }
    }
  },

  test: function(dataset, options) {},

  /**
   * @typedef {Object} state
   * @prop {number[]} state.information
   * @prop {number[]} state.action
   * @prop {number[]} state.reward
   */

  /**
   * @typedef {Object} data
   * @prop {number[]} data.input
   * @prop {number[]} data.output
   */

  /**
   * @typedef {data[]|state[]} Dataset
   */

  /**
   * @typedef {Object} EvolutionaryPeriod
   * @prop {number} generations
   * @prop {number} time
   * @prop {number} error
   * @prop {Object} networks
   * @prop {Network} networks.best
   * @prop {Network} networks.worst
   * @prop {Network[]} networks.all
   */

  /**
   * @param {number} [options.error=0.1] Target error for networks in population - _`evolve()` will stop running when ONE network reaches `options.error`, or `options.iterations` is reached_
   * @param {number} [options.iterations] Maximum number of generations over which population evolves - _`evolve()` will stop running if `options.error` is reached before `options.iterations`_
   * @param {number} [options.elitism=0.05] Percentage of networks copied into next generations (epoch) - _larger `elitism` leads to **faster learning**, but **lower accuracy**_
   * @param {number} [options.provenance=0] Percentage of "stem networks" (`this.template`) introduced into new generations (epoch) - _larger `provenance` leads to **slower learning**, but **higher accuracy**_
   * @param {number} [options.mutation.rate=0.05] Percentage of networks genomically mutated (changed) per generation (epoch)
   * @param {number} [options.mutation.amount=1] Number of genetic mutations (changes) introduced into mutated networks per generation (epoch)
   * @param {Array<methods.mutation>} [options.mutation.methods=methods.mutation.FFW] List of allowed genetic mutations (changes) to a network per generation (epoch)
   * @param {boolean} [options.networks.train=false] Trains every network in the populus, every generation - _VERY SLOW_
   * @param {boolean} [options.networks.evolve=false] Evolves every network in the populus, every generation - _VERY SLOW_
   * @param {number} [options.nodes.max=Infinity] Maximum number of nodes allowed in a network
   * @param {number} [options.nodes.min=0] Minimum number or nodes allowed in a network
   * @param {number} [options.connections.max=Infinity] Maximum number of connections allowed in a network
   * @param {number} [options.connections.min=0] Minimum number or connections allowed in a network
   * @param {number} [options.gates.max=Infinity] Maximum number of gates allowed in a network
   * @param {number} [options.gates.min=0] Minimum number or gates allowed in a network
   * @param {number} [options.log] Will log the populations performance every `options.log` generations as it evolves - _`options.log = true` will default to `options.log = 1`_
   * @param {number} [options.threads] Specifies the number of threads that can be used to train/evolve networks/populations - _defaults to the number of CPU cores
   * @param {number} [options.schedule.iterations] Frequency with which `options.schedule.function` is run
   * @param {Function} [options.schedule.function] A function that will run every `options.schedule.iterations`
   *
   * @returns {EvolutionaryPeriod}
   */
  evolve: async function(dataset, options) {
    let self = this;
    // OVERLOADS: Population.prototype.evolve(options)
    if(!options && _.isPlainObject(dataset)) {
      options = dataset;
      dataset = undefined;
    }

    // OVERLOADS: Population.prototype.evolve()
    // OVERLOADS: Population.prototype.evolve(options)
    // OVERLOADS: Population.prototype.evolve((undefined || null),options)
    if(!dataset && self.dataset.length) {
      dataset = self.dataset;
    }

    // CASE: No dataset; Can not train population.
    else {
      throw new ReferenceError(`Parameter "dataset" was not passed & "this.dataset" was not declared; can not train "Population" without parameter "dataset" or "this.dataset".`)
    }


  }
}

module.exports = Population;
