<<<<<<< HEAD
const _ = require('lodash');
const Network = require('./architecture/network');
const methods = require('./methods/methods');
const config = require('./config');

/**
* Runs the NEAT algorithm on group of neural networks.
*
* @constructs Population
*
* @alpha
*
* @param {number} [inputs=1] Size of input layer of the networks in the population
* @param {number} [outputs=1] Size of output layer of the networks in the population
* @param {Array<{inputs:number[],outputs:number[]}>} [dataset] Dataset used to train networks in the population at first - _other sets of data can be passed to `neat.evolve()` after constuction_
* @param {Object} options **Configuration Options**
* @param {number} [options.population_size=50] Population size of each generation.
* @param {number} [options.elitism=1] Elitism of every evolution loop. [Elitism in genetic algortihtms.](https://www.researchgate.net/post/What_is_meant_by_the_term_Elitism_in_the_Genetic_Algorithm)
* @param {number} [options.provenance=0] Number of genomes inserted the original network template (Network(input,output)) per evolution.
* @param {number} [options.mutation_rate=0.4] Sets the mutation rate. If set to 0.3, 30% of the new population will be mutated. Default is 0.4.
* @param {number} [options.mutation_amount=1] If mutation occurs (randomNumber < mutation_rate), sets amount of times a mutation method will be applied to the network.
* @param {cost} [options.cost=cost.MSE]  Specify the cost function for the evolution, this tells a genome in the population how well it's performing. Default: methods.cost.MSE (recommended).
* @param {boolean} [options.equal=false] When true [crossover](Network.crossOver) parent genomes are assumed to be equally fit and offspring are built with a random amount of neurons within the range of parents' number of neurons. Set to false to select the "fittest" parent as the neuron amount template.
* @param {number} [options.clear=false] Clear the context of the population's nodes, basically reverting them to 'new' neurons. Useful for predicting timeseries with LSTM's.
* @param {number} [options.growth=0.0001] Set the penalty for large networks. Penalty calculation: penalty = (genome.nodes.length + genome.connectoins.length + genome.gates.length) * growth; This penalty will get added on top of the error. Your growth should be a very small number.
* @param {number} [options.amount=1] Set the amount of times to test the trainingset on a genome each generation. Useful for timeseries. Do not use for regular feedfoward problems.
* @param {boolean} [options.fitnessPopulation=false] Flag to return the fitness of a population of genomes. Set this to false to evaluate each genome inidividually.
* @param {Function} [options.fitness] - A fitness function to evaluate the networks. Takes a `dataset` and a `genome` i.e. a [network](Network) or a `population` i.e. an array of networks and sets the genome `.score` property
* @param {string} [options.selection=FITNESS_PROPORTIONATE] [Selection method](selection) for evolution (e.g. Selection.FITNESS_PROPORTIONATE).
* @param {Array} [options.crossover] Sets allowed crossover methods for evolution.
* @param {Network} [options.network=false] Network to start evolution from
* @param {number} [options.maxNodes=Infinity] Maximum nodes for a potential network
* @param {number} [options.maxConns=Infinity] Maximum connections for a potential network
* @param {number} [options.maxGates=Infinity] Maximum gates for a potential network
* @param {mutation[]} [options.mutation] A set of allowed [mutation methods](mutation) for evolution. If unset a random mutation method from all possible mutation methods will be chosen when mutation occurs.
*
* @prop {number} generation A count of the generations
* @prop {Network[]} population The current population for the neat instance. Accessible through `neat.population`
*
* @todo Remove very slow defaultsDeep
*
* @example
* const { Population } = require("@liquid-carrot/carrot");
*
* // new Population()
* let neat = new Population()
*
* // new Population(options)
* let neat = new Population({ population_size: 100 })
*/
const Population = function(options) {
  const self = this;

  inputs = inputs || 1;
  outputs = outputs || 1;
  dataset = dataset || [];
  options = _.defaultsDeep(options, Population.default.options)

  Object.assign(self, { inputs, outputs, dataset, ...options});

  /**
   * Creates a new population
   *
   * @function createPopulation
   *
   * @alpha
   *
   * @memberof Population
   *
   * @param {Network} [network=options.template] Template network used to create population - _other networks will be "identical twins"_ - _will use `options.template`, if `network` is not defined_
   * @param {number} [size=50] - Number of networks in created population - _how many identical twins created in new population_
   *
   * @return {Network[]} Returns an array of networks each a member of the population
   */
  self.createPopulation = function create_networks_for_evolution(network, size) {

    // createPopulation(size)
    if(!size && Number.isInteger(network)) {
      size = network
      network = undefined
    }

    size = size || self.population_size

    // Prioritize network, otherwise use template network, otherwise use "new network"
    copyNetwork = network
      ? () => network.clone()
      : self.template
      ? () => self.template.clone()
      : () => new Network(self.inputs, self.outputs)

    const population = []
    for(let i = 0; i < size; i++) population.push(copyNetwork())

    return population
  };

  // Initialise the genomes
  self.population = self.population || self.createPopulation(self.template, self.population_size);

  /**
  * Resizes the population and adjusts the `population_size`
  *
  * @function resize
  *
  * @alpha
  *
  * @memberof Population
  *
  * @param {Network[]|number} update An array of new networks to add to the existing population or a new size for the population.
  *
  * @example
  * let neat = new Population() // default population_size = 50
  *
  * neat.resize(51) // Adds 1 new network to make the 51 population members
  *
  * let neat2 = new Population()
  *
  * neat.resize(neat2.population) // Adds neat2 population to neat, neat now has 101 networks
  *
  * console.log(neat.population_size) // 101
  */
  self.resize = function(update) {
    if(typeof update == 'number' || typeof update == 'string' &&	+update === +update) {
      let offset = update - self.population.length;

      if(offset > 0) {
        if(self.population.length === 1) {
          self.population.push(self.population[0].clone())
          offset--
        }
        while(offset-- > 0) self.population.push(self.getOffspring())
      } else {
        while(offset++ < 0) self.population.pop() // if population sorted, removes least fit first
      }
    } else if (Array.isArray(update) && update.length) {
      for(let i = 0; i < update.length; i++) self.population.push(update[i])
    } else {
      throw new Error("Population.resize needs a number or an array of new population members!")
    }

    self.population_size = self.population.length

    return self.population
}

  /**
   * Mutates the current population
   *
   * @function mutate
   *
   * @alpha
   *
   * @memberof Population
   *
   * @param {mutation} [method] A mutation method to mutate the population with. When not specified will pick a random mutation from the set allowed mutations.
   * @return {Network[]} An array of mutated networks (a new population)
   */
  self.mutate = function mutate_population(method) {

    const options = {
      maxNodes: self.maxNodes,
      maxConns: self.maxConns,
      maxGates: self.maxGates
    }

    // Change execution based on arguments
    const mutateGenome = method
      ? (genome, method, options) => genome.mutate(method, options)
      : (genome, methods, options) => genome.mutateRandom(methods, options)

    // Default to Population allowed mutations if no method
    method = method ? method : self.mutation

    const population = []
    for(let i = 0; i < self.population.length; i++) {
      if(Math.random() <= self.mutation_rate) {
        for(let j = 0; j < self.mutation_amount; j++) {
          population.push(mutateGenome(self.population[i], method, options))
        }
      }
    }

    return population
  };

  /**
   * Evaluates, selects, breeds and mutates population
   *
   * @function evolve
   *
   * @alpha
   *
   * @memberof Population
   *
   * @param {Array<{input:number[],output:number[]}>} [evolve_dataset=dataset] A set to be used for evolving the population, if none is provided the dataset passed to Population on creation will be used.
   * @param {object} options
   * @return {network[]} An evolved population
   *
   * @example
   *
   * // original
   * let originalSet = [
   *  { input: [0,0], output: [0] },
   *  { input: [0,1], output: [1] },
   *  { input: [1,0], output: [1] },
   *  { input: [1,1], output: [0] },
   * ]
   *
   * let neat = new Population(originalSet, {
   *  input: 1,
   *  output: 2
   * });
   *
   * // special set to be used when evolving
   * let evolve_dataset = [
   *  { input: [0], output: [1] },
   *  { input: [1], output: [0] }
   * ]
   *
   * // evolves using evolve_dataset INSTEAD of originalSet
   * neat.evolve(evolve_dataset)
   *
   * // evolves using originalSet
   * neat.evolve()
   */
  self.evolve = async function(evolve_dataset, options) {
    if (self.elitism + self.provenance > self.population_size) throw new Error("Can't evolve! Elitism + provenance exceeds population size!")

    // =======================
    // Check arguments section. First we'll check if evolve_dataset exists
    // We prioritize evolve_dataset, fallback to the Population dataset, and otherwise expect .score properties to be set

    if (evolve_dataset && !Array.isArray(evolve_dataset)) {
      options = evolve_dataset
      evolve_dataset = undefined
    }

    const isArray = (x) => Array.isArray(x) && x.length
    let evolve_set = isArray(evolve_dataset) ? evolve_dataset : isArray(self.dataset) ? self.dataset : null

    let population = self.population // Shallow copy, consider changing later once full functional pattern reached

    const hasScores = _.every(population, network => {
      // (+a === +a) "equal to self" check is ~4000% faster than regex
      return typeof network.score == 'number' || typeof network.score == 'string' &&	+network.score === +network.score
    })

    if(evolve_set && !hasScores) {
      await self.evaluate(evolve_set)
    } else if (!hasScores) {
      throw new Error("If no dataset is passed, all networks in population must have numeric '.score' properties!")
    }

    // =======================

    // Sort in order of fitness (fittest first) | In-place mutation
    self.sort(population)

    // Elitism, assumes population is sorted by fitness
    const elitists = []
    for (let i = 0; i < self.elitism; i++) elitists.push(population[i].clone())

    // Provenance
    const new_population = []
    for(let i = 0; i < self.provenance; i++) new_population.push(self.template.clone())

    // Breed the next individuals
    for (let i = 0; i < self.population_size - self.elitism - self.provenance; i++) {
      new_population.push(self.getOffspring())
    }

    // Replace the old population with the new population
    population = self.population = new_population // not purely functional yet so resorting to this

    // Mutate the new population
    self.mutate()

    // Add the elitists
    for (let i = 0; i < elitists.length; i++) population.push(elitists[i])

    // evaluate the population, only if a set was provided
    if(evolve_set) await self.evaluate(evolve_set)

    // Sort by fitness (fittest first)
    self.sort(population)

    // Reset the scores if no dataset present
    if(!evolve_set) {
     for (let i = 0; i < population.length; i++) population[i].score = undefined
    }

    self.generation++

    return self.population
  };

  /**
   * Returns a genome for recombination (crossover) based on one of the [selection methods](selection) provided.
   *
   * Should be called after `evaluate()`
   *
   * @function getParent
   *
   * @alpha
   *
   * @memberof Population
   *
   * @return {Network} Selected genome for offspring generation
   */
  self.getParent = function get_genome_using_selection_method() {
    switch (self.selection.name) {
      case `POWER`: {
        if (self.population[0].score < self.population[1].score) self.sort();

        const index = Math.floor(Math.pow(Math.random(), self.selection.power) * self.population.length);
        return self.population[index];
      }
      case `FITNESS_PROPORTIONATE`: {
        // As negative fitnesses are possible
        // https://stackoverflow.com/questions/16186686/genetic-algorithm-handling-negative-fitness-values
        // this is unnecessarily run for every individual, should be changed

        let total_fitness = 0;
        let minimum_fitness = 0;
        for (let i = 0; i < self.population.length; i++) {
          const score = self.population[i].score;
          minimum_fitness = score < minimum_fitness ? score : minimum_fitness;
          total_fitness += score;
        }

        minimum_fitness = Math.abs(minimum_fitness);
        total_fitness += minimum_fitness * self.population.length;

        let random = Math.random() * total_fitness;
        let value = 0;

        for (let i = 0; i < self.population.length; i++) {
          const genome = self.population[i];
          value += genome.score + minimum_fitness;
          if (random < value) return genome;
        }

        // if all scores equal, return random genome
        return self.population[Math.floor(Math.random() * self.population.length)];
      }
      case `TOURNAMENT`: {
        if (self.selection.size > self.population_size) {
          throw new Error(`Your tournament size should be lower than the population size, please change methods.selection.TOURNAMENT.size`);
        }

        // Create a tournament
        const individuals = [];
        for (let i = 0; i < self.selection.size; i++) {
          let random_agent = self.population[Math.floor(Math.random() * self.population.length)];
          individuals.push(random_agent);
        }

        // Sort the tournament individuals by score
        individuals.sort(function (a, b) {
          return b.score - a.score;
        });

        // Select an individual
        for (let i = 0; i < self.selection.size; i++) {
          if (Math.random() < self.selection.probability || i === self.selection.size - 1) {
            return individuals[i];
          }
        }
      }
    }
  };

  /**
   * Selects two genomes from the population with `getParent()`, and returns the offspring from those parents. NOTE: Population MUST be sorted
   *
   * @function getOffspring
   *
   * @alpha
   *
   * @memberof Population
   *
   * @return {Network} Child network
   */
  self.getOffspring = function() {
    const parent1 = self.getParent();
    const parent2 = self.getParent();

    return Network.crossOver(parent1, parent2, self.equal);
  };

  /**
   * Evaluates the current population, basically sets their `.score` property
   *
   * @function evaluate
   *
   * @alpha
   *
   * @memberof Population
   *
   * @param {Object[]} [dataset]
   *
   * @return {Network[]} Return the population networks
   */
  self.evaluate = async function (dataset) {
    dataset = dataset || self.dataset

    if(!dataset.length) throw new Error("A dataset must be passed to the Population constructor or Population.evaluate()!")

    if (self.fitnessPopulation) {
      // Evaluate fitness at population level
      if (self.clear) for(let i = 0; i < self.population.length; i++) self.population[i].clear()

      // calculate the fitnesses
      self.fitness(dataset, self.population);
    } else {
      // Evaluate fitness at genome level
      for (let i = 0; i < self.population.length; i++) {

        const genome = self.population[i]

        // clear network state if flag set
        if (self.clear) genome.clear()

        genome.score = self.fitness(dataset, genome)

        self.population[i] = genome
      }
    }

    // Sort the population in order of fitness
    self.sort()

    // return the fitness of the best agent, which represents the fitness of the population
    return self.population[0]
  };

  /**
   * Sorts the population by score. Warning! Mutates the population directly
   *
   * @function sort
   *
   * @param {network[]} A population to sort
   *
   * @return {undefined}
   *
   */
  self.sort = function sort_population_by_fitness(population) {
    population = Array.isArray(population) && population.length ? population : self.population

    population.sort(function (a, b) {
      return b.score - a.score;
    });
  };

  /**
   * Returns the fittest genome of the current population
   *
   * @function getFittest
   *
   * @alpha
   *
   * @memberof Population
   *
   * @return {Network} Current population's fittest genome
  */
  self.getFittest = function get_fittest_population_genome() {
    // Check if evaluated. self.evaluate is an async function
    if (typeof self.population[self.population.length - 1].score === `undefined`) {
      self.evaluate();
    }

    if (self.population[0].score < self.population[1].score) self.sort();

    return self.population[0];
  };

  /**
   * Returns the average fitness of the current population
   *
   * @function getAverage
   *
   * @alpha
   *
   * @memberof Population
   *
   * @return {number} Average fitness of the current population
   */
  self.getAverage = function get_average_population_fitness() {
    if (typeof self.population[self.population.length - 1].score === `undefined`)
      self.evaluate(); // self.evaluate is an async function

    let score = 0;
    for (let i = 0; i < self.population.length; i++)
      score += self.population[i].score;

    return score / self.population.length;
  };

  /**
   * Export the current population to a JSON object
   *
   * Can be used later with `fromJSON(json)` to reload the population
   *
   * @function toJSON
   *
   * @alpha
   *
   * @memberof Population
   *
   * @return {object[]} A set of genomes (a population) represented as JSON objects.
   */
  self.toJSON = function export_to_json() {
    const json = [];
    for (let i = 0; i < self.population.length; i++) {
      json.push(self.population[i].toJSON());
    }
    return json;
  };

  /**
   * Imports population from a json. Must be an array of networks converted to JSON objects.
   *
   * @function fromJSON
   *
   * @alpha
   *
   * @memberof Population
   *
   * @param {object[]} json set of genomes (a population) represented as JSON objects.
  */
  self.fromJSON = function import_from_json(json) {
    const population = [];
    for (let i = 0; i < json.length; i++)
      population.push(Network.fromJSON(json[i]));
    self.population = population;
    self.population_size = population.length;
  };
}

Population.default = {
  options: {
    generation: 0, // internal variable
    equal: true,
    clean: false,
    population_size: 50,
    growth: 0.0001,
    cost: methods.cost.MSE,
    amount: 1,
    elitism: 1,
    provenance: 0,
    mutation_rate: 0.4,
    mutation_amount: 1,
    fitnessPopulation: false,
    fitness: function(set = dataset, genome, amount = 1, cost = methods.cost.MSE, growth = 0.0001) {
      let score = 0;
      for (let i = 0; i < amount; i++) score -= genome.test(set, cost).error;

      score -= (genome.nodes.length - genome.input - genome.output + genome.connections.length + genome.gates.length) * growth;
      score = isNaN(score) ? -Infinity : score; // this can cause problems with fitness proportionate selection

      return score / amount;
    },
    selection: methods.selection.POWER,
    crossover: [
      methods.crossover.SINGLE_POINT,
      methods.crossover.TWO_POINT,
      methods.crossover.UNIFORM,
      methods.crossover.AVERAGE
    ],
    mutation: methods.mutation.ALL,
    maxNodes: Infinity,
    maxConns: Infinity,
    maxGates: Infinity
  }
}

module.exports = Population;
=======
/* eslint-disable */

// const _ = require(`lodash`);
// // const parameter = require(`./util/parameter`);
// const Network = require(`./network`);
// const methods = require(`../methods/methods`);
// const config = require(`../config`);

// /**
// * Creates a population of networks
// *
// * @constructs Population
// *
// * @param {number} [inputs=1] Size of input layer of the networks in the population
// * @param {number} [outputs=1] Size of input layer of the networks in the population
// * @param {Array<{inputs:number[],outputs:number[]}>} [dataset] Dataset used to train networks in the population at first - _other sets of data can be passed to `neat.evolve()` after constuction_
// * @param {Object} options **Configuration Options**
// * @param {number} [options.population_size=50] Population size of each generation.
// * @param {number} [options.elitism=1] Elitism of every evolution loop. [Elitism in genetic algortihtms.](https://www.researchgate.net/post/What_is_meant_by_the_term_Elitism_in_the_Genetic_Algorithm)
// * @param {number} [options.provenance=0] Number of genomes inserted the original network template (Network(input,output)) per evolution.
// * @param {number} [options.mutation_rate=0.4] Sets the mutation rate. If set to 0.3, 30% of the new population will be mutated. Default is 0.4.
// * @param {number} [options.mutation_amount=1] If mutation occurs (randomNumber < mutation_rate), sets amount of times a mutation method will be applied to the network.
// * @param {cost} [options.cost=cost.MSE]  Specify the cost function for the evolution, this tells a genome in the population how well it's performing. Default: methods.cost.MSE (recommended).
// * @param {boolean} [options.equal=false] When true [crossover](Network.crossOver) parent genomes are assumed to be equally fit and offspring are built with a random amount of neurons within the range of parents' number of neurons. Set to false to select the "fittest" parent as the neuron amount template.
// * @param {number} [options.clear=false] Clear the context of the population's nodes, basically reverting them to 'new' neurons. Useful for predicting timeseries with LSTM's.
// * @param {number} [options.growth=0.0001] Set the penalty for large networks. Penalty calculation: penalty = (genome.nodes.length + genome.connectoins.length + genome.gates.length) * growth; This penalty will get added on top of the error. Your growth should be a very small number.
// * @param {number} [options.amount=1] Set the amount of times to test the trainingset on a genome each generation. Useful for timeseries. Do not use for regular feedfoward problems.
// * @param {boolean} [options.fitnessPopulation=false] Flag to return the fitness of a population of genomes. Set this to false to evaluate each genome inidividually.
// * @param {Function} [options.fitness] - A fitness function to evaluate the networks. Takes a `dataset` and a `genome` i.e. a [network](Network) or a `population` i.e. an array of networks and sets the genome `.score` property
// * @param {string} [options.selection=FITNESS_PROPORTIONATE] [Selection method](selection) for evolution (e.g. Selection.FITNESS_PROPORTIONATE).
// * @param {Array} [options.crossover] Sets allowed crossover methods for evolution.
// * @param {Network} [options.network=false] Network to start evolution from
// * @param {number} [options.maxNodes=Infinity] Maximum nodes for a potential network
// * @param {number} [options.maxConns=Infinity] Maximum connections for a potential network
// * @param {number} [options.maxGates=Infinity] Maximum gates for a potential network
// * @param {mutation[]} [options.mutation] Sets allowed [mutation methods](mutation) for evolution, a random mutation method will be chosen from the array when mutation occurs. Optional, but default methods are non-recurrent
// *
// * @prop {number} generation A count of the generations
// * @prop {Network[]} population The current population for the neat instance. Accessible through `neat.population`
// *
// * @example
// * const { Neat } = require("@liquid-carrot/carrot");
// *
// * // new Neat()
// * let neat = new Neat()
// *
// * // new Neat(options)
// * let neat = new Neat({ population_size: 100 })
// *
// * // new Neat(dataset)
// * let neat = new Neat([
// *   { input: [0, 0], output: [0] },
// *   { input: [0, 1], output: [1] },
// *   { input: [1, 0], output: [1] },
// *   { input: [1, 1], output: [0] }
// * ])
// *
// * // new Neat(input, output)
// * let neat = new Neat(64, 10)
// *
// * // new Neat(dataset, options)
// * let neat = new Neat([
// *   { input: [0, 0], output: [0] },
// *   { input: [0, 1], output: [1] },
// *   { input: [1, 0], output: [1] },
// *   { input: [1, 1], output: [0] }
// * ], { population_size: 100 })
// *
// * // new Neat(input, output, options)
// * let neat = new Neat(64, 10, { population_size: 100 })
// *
// * // new Neat(input, output, dataset)
// * let neat = new Neat(2, 1, [
// *   { input: [0, 0], output: [0] },
// *   { input: [0, 1], output: [1] },
// *   { input: [1, 0], output: [1] },
// *   { input: [1, 1], output: [0] }
// * ])
// *
// * // new Neat(input, output, dataset, options)
// * let neat = new Neat(2, 1, [
// *   { input: [0, 0], output: [0] },
// *   { input: [0, 1], output: [1] },
// *   { input: [1, 0], output: [1] },
// *   { input: [1, 1], output: [0] }
// * ], { population_size: 100 })
// *
// */
// const Population = function(inputs, outputs, dataset, options) {
//   const self = this;

//   // new Neat(dataset) || new Neat(options)
//   if(!(outputs || dataset || options)) {
//     if(_.isPlainObject(inputs)) options = inputs;
//     else if(Array.isArray(inputs)) dataset = inputs;

//     inputs = undefined;
//   }

//   // new Neat(dataset, options)
//   else if(!(dataset || options) && Array.isArray(inputs) && _.isPlainObject(outputs)) {
//     dataset = inputs;
//     options = outputs;
//     inputs = outputs = undefined;
//   }

//   // new Neat(input, output, options)
//   else if(!(options) && _.isInteger(inputs) && _.isInteger(outputs) && _.isPlainObject(dataset)) {
//     options = dataset;
//     dataset = undefined;
//   }

//   // new Neat()
//   // new Neat(population) - leave out for now
//   // new Neat(input, output)
//   // new Neat(population, options) - leave out for now
//   // new Neat(population, dataset) - leave out for now
//   // new Neat(input, output, dataset)
//   // new Neat(population, dataset, options) - leave out for now
//   // new Neat(input, output, dataset, options)
//   inputs = inputs || 1;
//   outputs = outputs || 1;
//   options = _.defaultsDeep(options, Neat.default.options);
//   options.template = options.template || new Network(inputs, outputs);

//   Object.assign(self, { inputs, outputs, dataset, ...options});

//   /**
//   * Create the initial pool of genomes
//   *
//   * @function createPool
//   *
//   * @deprecated
//   *
//   * @memberof Neat
//   *
//   * @param {Network} network
//   * @param {Number} population_size the number of types the genome of network will be copied to make the pool
//   */
//   self.createPool = function createPool(network, population_size) {
//     const population = [];

//     for (let i = 0; i < population_size; i++) {
//       population.push(Network.fromJSON({ ...network.toJSON(), score: undefined }));
//     }

//     return population;
//   };

//   /**
//   * Creates a new population
//   *
//   * @function createPopulation
//   *
//   * @alpha
//   *
//   * @memberof Neat
//   *
//   * @param {Network} network - Template network used to create population - _other networks will be "identical twins"_
//   * @param {number} size - Number of network in created population - _how many identical twins created in new population_
//   *
//   * @returns {Network[]} Returns an array of networks
//   */
//   self.createPopulation = function create_networks_for_evolution(network, size) {
//     if(!size && Number.isInteger(network)) {
//       size = network;
//       network = undefined;
//     }

//     const population = [];

//     network = network ? network.clone() : (self.template || new Network(self.inputs, self.outputs));
//     size = size || self.population_size;

//     for(let index = 0; index < size; index++) {
//       population.push(network);
//     }

//     return population;
//   };

//   // Initialise the genomes
//   self.population = self.population || self.createPopulation(self.template, self.population_size);

//   /**
//   * Replaces all networks that match the `select` function - _if `transform` is provided networks will be transformed before being filtered out_
//   *
//   * @function replace
//   *
//   * @memberof Neat
//   *
//   * @param {network[]} population An array (population) of genomes (networks)
//   * @param {network} [new_network] Replaces networks from
//   * @param {function} [select]
//   * @param {function} [transform] A function to change genomes with, takes a genome as a parameter
//   */
//   self.replace = function replace_selected_genomes(population, template, select, transform) {
//     const filtered = []

//     for(let index = 0; index < population.length; index++) {
//       if(select(population[index])) filtered.push(transform ? transform(population[index]) : population[index]);
//     }

//     return filtered;
//   };

//   /**
//   * Selects a random mutation method for a genome and mutates it
//   *
//   * @function mutateRandom
//   *
//   * @beta
//   *
//   * @memberof Neat
//   *
//   * @param {Network} genome Network to test for possible mutations
//   * @param {mutation[]} allowedMutations An array of allowed mutations to pick from
//   *
//   * @return {mutation} Selected mutation
//   */
//   self.mutateRandom = function apply_random_mutation_method_to_genome(genome, allowedMutations) {
//     let possible = allowedMutations ? [...allowedMutations] : [...self.mutation]

//     // remove any methods disallowed by user-limits: i.e. maxNodes, maxConns, ...
//     possible = possible.filter(function(method) {
//       return (
//         method !== methods.mutation.ADD_NODE || genome.nodes.length < self.maxNodes ||
//         method !== methods.mutation.ADD_CONN || genome.connections.length < self.maxConns ||
//         method !== methods.mutation.ADD_GATE || genome.gates.length < self.maxGates
//       )
//     })

//     do {
//       const current = possible[Math.floor(Math.random() * possible.length)]

//       // attempt mutation, success: return mutation method, failure: remove from possible methods
//       if (genome.mutate(current)) {
//         return current;
//       } else {
//         possible = possible.filter(function(method) { return method.name !== current.name });
//       }

//       // Return null when mutation is impossible
//       if (!possible || possible.length === 0) return null;

//     } while(true)
//   };

//   /**
//   * Evaluates, selects, breeds and mutates population
//   *
//   * @memberof Neat
//   *
//   * @alias evolve
//   *
//   * @param {Array<{input:number[],output:number[]}>} [evolve_dataset=dataset] A set to be used for evolving the population, if none is provided the dataset passed to Neat on creation will be used.
//   * @param {function} [pickGenome] A custom selection function to pick out unwanted genomes. Accepts a network as a parameter and returns true for selection.
//   * @param {function} [adjustGenome=this.template] Accepts a network, modifies it, and returns it. Used to modify unwanted genomes returned by `pickGenome` and reincorporate them into the population. If left unset, unwanted genomes will be replaced with the template Network. Will only run when pickGenome is defined.
//   *
//   * @returns {Network} Fittest network
//   *
//   * @example
//   *
//   * // original
//   * let originalSet = [
//   *  { input: [0,0], output: [0] },
//   *  { input: [0,1], output: [1] },
//   *  { input: [1,0], output: [1] },
//   *  { input: [1,1], output: [0] },
//   * ]
//   *
//   * let neat = new Neat(originalSet, {
//   *  input: 1,
//   *  output: 2
//   * });
//   *
//   * // special set to be used when evolving
//   * let evolve_dataset = [
//   *  { input: [0], output: [1] },
//   *  { input: [1], output: [0] }
//   * ]
//   *
//   * // evolves using evolve_dataset INSTEAD of originalSet
//   * neat.evolve(evolve_dataset)
//   *
//   * // evolves using originalSet
//   * neat.evolve()
//   *
//   * let pick = function pickGenome(genome) return genome.nodes.length > 100 ? true : false // Remove genomes with more than 100 nodes
//   *
//   * let adjust = function adjustGenome(genome) return genome.clear() // clear the nodes
//   *
//   * // evolves using originalSet
//   * neat.evolve(null, filter, adjust)
//   *
//   */
//   self.evolve = async function(evolve_dataset, pickGenome, adjustGenome) {
//     // Check if evolve is possible
//     if (self.elitism + self.provenance > self.population_size) {
//       throw new Error(`Can't evolve! Elitism + provenance exceeds population size!`);
//     }

//     // evolve dataset is optional, so deal with not having it
//     if (typeof evolve_dataset === `function`) {
//       adjustGenome = pickGenome;
//       pickGenome = evolve_dataset
//       evolve_dataset = undefined;
//     }

//     evolve_dataset = evolve_dataset || self.dataset;

//     // Check population for evaluation
//     if (self.population[self.population.length - 1].score == undefined) {
//       await self.evaluate(evolve_dataset);
//     }
//     // Check & adjust genomes as needed
//     if (pickGenome) {
//       self.population = self.filterGenome(self.population, self.template, pickGenome, adjustGenome);
//     }

//     // Sort in order of fitness (fittest first)
//     self.sort();

//     // Elitism, assumes population is sorted by fitness
//     const elitists = [];
//     for (let index = 0; index < self.elitism; index++) elitists.push(self.population[index]);

//     // Provenance
//     const new_population = Array(self.provenance).fill(Network.fromJSON(self.template.toJSON()))

//     // Breed the next individuals
//     for (let i = 0; i < self.population_size - self.elitism - self.provenance; i++) {
//       new_population.push(self.getOffspring());
//     }

//     // Replace the old population with the new population
//     self.population = new_population;

//     // Mutate the new population
//     self.mutate();

//     // Add the elitists
//     self.population.push(...elitists);

//     // evaluate the population
//     await self.evaluate(evolve_dataset);

//     // Check & adjust genomes as needed
//     if (pickGenome) self.population = self.filterGenome(self.population, self.template, pickGenome, adjustGenome)

//     // Sort in order of fitness (fittest first)
//     self.sort()

//     const fittest = Network.fromJSON(self.population[0].toJSON());
//     fittest.score = self.population[0].score;

//     // Reset the scores
//     for (let i = 0; i < self.population.length; i++) self.population[i].score = undefined;

//     self.generation++;

//     return fittest;
//   };

//   /**
//   * Returns a genome for recombination (crossover) based on one of the [selection methods](selection) provided.
//   *
//   * Should be called after `evaluate()`
//   *
//   * @function getParent
//   *
//   * @memberof Neat
//   *
//   * @return {Network} Selected genome for offspring generation
//   */
//   self.getParent = function get_genome_using_selection_method() {
//     switch (self.selection.name) {
//       case `POWER`: {
//         if (self.population[0].score < self.population[1].score) self.sort();

//         const index = Math.floor(Math.pow(Math.random(), self.selection.power) * self.population.length);
//         return self.population[index];
//       }
//       case `FITNESS_PROPORTIONATE`: {
//         // As negative fitnesses are possible
//         // https://stackoverflow.com/questions/16186686/genetic-algorithm-handling-negative-fitness-values
//         // this is unnecessarily run for every individual, should be changed

//         let total_fitness = 0;
//         let minimum_fitness = 0;
//         for (let i = 0; i < self.population.length; i++) {
//           const score = self.population[i].score;
//           minimum_fitness = score < minimum_fitness ? score : minimum_fitness;
//           total_fitness += score;
//         }

//         minimum_fitness = Math.abs(minimum_fitness);
//         total_fitness += minimum_fitness * self.population.length;

//         let random = Math.random() * total_fitness;
//         let value = 0;

//         for (let i = 0; i < self.population.length; i++) {
//           const genome = self.population[i];
//           value += genome.score + minimum_fitness;
//           if (random < value) return genome;
//         }

//         // if all scores equal, return random genome
//         return self.population[Math.floor(Math.random() * self.population.length)];
//       }
//       case `TOURNAMENT`: {
//         if (self.selection.size > self.population_size) {
//           throw new Error(`Your tournament size should be lower than the population size, please change methods.selection.TOURNAMENT.size`);
//         }

//         // Create a tournament
//         const individuals = [];
//         for (let i = 0; i < self.selection.size; i++) {
//           let random_agent = self.population[Math.floor(Math.random() * self.population.length)];
//           individuals.push(random_agent);
//         }

//         // Sort the tournament individuals by score
//         individuals.sort(function (a, b) {
//           return b.score - a.score;
//         });

//         // Select an individual
//         for (let i = 0; i < self.selection.size; i++) {
//           if (Math.random() < self.selection.probability || i === self.selection.size - 1) {
//             return individuals[i];
//           }
//         }
//       }
//     }
//   };

//   /**
//   * Selects two genomes from the population with `getParent()`, and returns the offspring from those parents. NOTE: Population MUST be sorted
//   *
//   * @function getOffspring
//   *
//   * @memberof Neat
//   *
//   * @returns {Network} Child network
//   */
//   self.getOffspring = function() {
//     const parent1 = self.getParent();
//     const parent2 = self.getParent();

//     return Network.crossOver(parent1, parent2, self.equal);
//   };

//   /**
//   * Mutates the given (or current) population
//   *
//   * @function mutate
//   *
//   * @memberof Neat
//   *
//   * @param {mutation} [method] A mutation method to mutate the population with. When not specified will pick a random mutation from the set allowed mutations.
//   */
//   self.mutate = function mutate_population(method) {
//     if (method) {
//       for (let i = 0; i < self.population.length; i++) { // Elitist genomes should not be included
//         if (Math.random() <= self.mutation_rate) {
//           for (let j = 0; j < self.mutation_amount; j++) {
//             self.population[i].mutate(method);
//           }
//         }
//       }
//     } else {
//       for (let i = 0; i < self.population.length; i++) { // Elitist genomes should not be included
//         if (Math.random() <= self.mutation_rate) {
//           for (let j = 0; j < self.mutation_amount; j++) {
//             self.mutateRandom(self.population[i], self.mutation);
//           }
//         }
//       }
//     }
//   };

//   /**
//   * Evaluates the current population, basically sets their `.score` property
//   *
//   * @function evalute
//   *
//   * @memberof Neat
//   *
//   * @return {Network} Fittest Network
//   */
//   self.evaluate = async function (dataset) {
//     dataset = dataset || self.dataset;

//     if (self.fitnessPopulation) {
//       // check the clear flag
//       if (self.clear) {
//         for (let i = 0; i < self.population.length; i++) {
//           self.population[i].clear();
//         }
//       }

//       // calculate the fitnesses
//       await self.fitness(dataset, self.population);
//     } else {
//       for (let i = 0; i < self.population.length; i++) {
//         const genome = self.population[i];
//         if (self.clear) genome.clear(); // clear flag
//         genome.score = await self.fitness(dataset, genome);
//         self.population[i] = genome;
//       }
//     }

//     // Sort the population in order of fitness
//     self.sort()

//     // return the fitness of the best agent, which represents the fitness of the population
//     return self.population[0]
//   };

//   /**
//   * Sorts the population by score
//   *
//   * @function sort
//   *
//   */
//   self.sort = function sort_population_by_fitness() {
//     self.population.sort(function (a, b) {
//       return b.score - a.score;
//     });
//   };

//   /**
//   * Returns the fittest genome of the current population
//   *
//   * @function getFittest
//   *
//   * @memberof Neat
//   *
//   * @returns {Network} Current population's fittest genome
//   */
//   self.getFittest = function get_fittest_population_genome() {
//     // Check if evaluated. self.evaluate is an async function
//     if (typeof self.population[self.population.length - 1].score === `undefined`) {
//       self.evaluate();
//     }

//     if (self.population[0].score < self.population[1].score) self.sort();

//     return self.population[0];
//   };

//   /**
//   * Returns the average fitness of the current population
//   *
//   * @function getAverage
//   *
//   * @memberof Neat
//   *
//   * @returns {number} Average fitness of the current population
//   */
//   self.getAverage = function get_average_population_fitness() {
//     if (typeof self.population[self.population.length - 1].score === `undefined`)
//       self.evaluate(); // self.evaluate is an async function

//     let score = 0;
//     for (let i = 0; i < self.population.length; i++)
//       score += self.population[i].score;

//     return score / self.population.length;
//   };

//   /**
//   * Export the current population to a JSON object
//   *
//   * Can be used later with `fromJSON(json)` to reload the population
//   *
//   * @function toJSON
//   *
//   * @memberof Neat
//   *
//   * @return {object[]} A set of genomes (a population) represented as JSON objects.
//   */
//   self.toJSON = function export_to_json() {
//     const json = [];
//     for (let i = 0; i < self.population.length; i++) {
//       json.push(self.population[i].toJSON());
//     }
//     return json;
//   };

//   /**
//   * Imports population from a json. Must be an array of networks converted to JSON objects.
//   *
//   * @function fromJSON
//   *
//   * @memberof Neat
//   *
//   * @param {object[]} json set of genomes (a population) represented as JSON objects.
//   */
//   self.fromJSON = function import_from_json(json) {
//     const population = [];
//     for (let i = 0; i < json.length; i++)
//       population.push(Network.fromJSON(json[i]));
//     self.population = population;
//     self.population_size = population.length;
//   };
// }

// Neat.default = {
//   options: {
//     generation: 0, // internal variable
//     // input: 1,
//     // output: 1,
//     equal: true,
//     clean: false,
//     population_size: 50,
//     growth: 0.0001,
//     cost: methods.cost.MSE,
//     amount: 1,
//     elitism: 1,
//     provenance: 0,
//     mutation_rate: 0.4,
//     mutation_amount: 1,
//     fitnessPopulation: false,
//     fitness: function(set = dataset, genome, amount = 1, cost = methods.cost.MSE, growth = 0.0001) {
//       let score = 0;
//       for (let i = 0; i < amount; i++) score -= genome.test(set, cost).error;

//       score -= (genome.nodes.length - genome.input - genome.output + genome.connections.length + genome.gates.length) * growth;
//       score = isNaN(score) ? -Infinity : score; // this can cause problems with fitness proportionate selection

//       return score / amount;
//     },
//     selection: methods.selection.POWER,
//     crossover: [
//       methods.crossover.SINGLE_POINT,
//       methods.crossover.TWO_POINT,
//       methods.crossover.UNIFORM,
//       methods.crossover.AVERAGE
//     ],
//     mutation: methods.mutation.FFW,
//     // template: new Network(this.input, this.output)
//     maxNodes: Infinity,
//     maxConns: Infinity,
//     maxGates: Infinity
//   }
// }

// module.exports = Neat;
>>>>>>> 87cdde509530ca64ba705ab88c4fc6b12a892b1b
