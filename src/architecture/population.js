const _ = require('lodash');
const Network = require('./network');
const methods = require('../methods/methods');
const config = require('../config');

/**
* Runs the NEAT algorithm on group of neural networks.
*
* @constructs Population
*
* @alpha
*
* @param {Object} options **Configuration Options**
* @param {number} [options.inputs=1] Size of input layer of the networks in the population. Used only when network template is not passed
* @param {number} [options.outputs=1] Size of output layer of the networks in the population. Used only when network template is not passed
* @param {Network} [options.template] A template network used to create a population of identical copies from. Warning: may slow improvement due to starting from a single "search location".
* @param {Network[]} [options.members] An array of networks to start this population with.
* @param {Array<{inputs:number[],outputs:number[]}>} [options.dataset] Dataset used to train networks in the population at first - _other sets of data can be passed to `population.evolve()` after constuction_
* @param {number} [options.size=50] Population size of each generation.
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
* @prop {Network[]} population The current population for the population instance. Accessible through `population.members`
*
* @todo Remove very slow defaultsDeep
*
* @example
* const { Population } = require("@liquid-carrot/carrot");
*
* // new Population()
* let population = new Population()
*
* // new Population(options)
* let population = new Population({ size: 100 })
*/
const Population = function(options) {
  const self = this;

  options = _.defaultsDeep(options, Population.default.options)

  Object.assign(self, options);

  /**
   * Creates a new population and returns it.
   *
   * @function getPopulation
   *
   * @alpha
   *
   * @memberof Population
   *
   * @param {Network} [options.network=options.template] Template network used to create population - _other networks will be "identical twins"_ - _will use `options.template`, if `network` is not defined_
   * @param {number} [options.size=50] - Number of networks in created population - _how many identical twins created in new population_
   *
   * @return {Network[]} Returns an array of networks each a member of the population
   */
  self.getPopulation = function create_networks(options={}) {
    size = options.size || self.size

    // Prioritize options.network, otherwise use template network, otherwise use "new network"
    copyNetwork = options.network
      ? () => options.network.clone()
      : self.template
      ? () => self.template.clone()
      : () => new Network(self.inputs, self.outputs, { connIdMap: self.connIdMap, lastConnId: self.lastConnId })

    const population = []
    for (let i = 0; i < size; i++) {
      const network = copyNetwork();
      population.push(network);
      self.lastConnId = network.lastConnId; // Update population with last known network conenction ID
    }

    return population
  };

  // Initialise the genomes
  self.members = self.members || self.getPopulation();

  /**
  * Resizes the population and adjusts the `size`
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
  * let population = new Population() // default size = 50
  *
  * population.resize(51) // Adds 1 new network to make the 51 population members
  *
  * let population2 = new Population()
  *
  * population.resize(population2.members) // Adds population2 members to population, population now has 101 networks
  *
  * console.log(population.size) // 101
  */
  self.resize = function(update) {
    if(typeof update == 'number' || typeof update == 'string' &&	+update === +update) {
      let offset = update - self.members.length;

      if(offset > 0) {
        if(self.members.length === 1) {
          self.members.push(self.members[0].clone())
          offset--
        }
        while(offset-- > 0) self.members.push(self.getOffspring())
      } else {
        while(offset++ < 0) self.members.pop() // if population sorted, removes least fit first
      }
    } else if (Array.isArray(update) && update.length) {
      for(let i = 0; i < update.length; i++) self.members.push(update[i])
    } else {
      throw new Error("Population.resize needs a number or an array of new population members!")
    }

    self.size = self.members.length

    return self.members
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
    for(let i = 0; i < self.members.length; i++) {
      if(Math.random() <= self.mutation_rate) {
        for(let j = 0; j < self.mutation_amount; j++) {
          population.push(mutateGenome(self.members[i], method, options))
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
   * let population = new Population(originalSet, {
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
   * population.evolve(evolve_dataset)
   *
   * // evolves using originalSet
   * population.evolve()
   */
  self.evolve = async function(evolve_dataset, options) {
    if (self.elitism + self.provenance > self.size) throw new Error("Can't evolve! Elitism + provenance exceeds population size!")

    // =======================
    // Check arguments section. First we'll check if evolve_dataset exists
    // We prioritize evolve_dataset, fallback to the Population dataset, and otherwise expect .score properties to be set

    if (evolve_dataset && !Array.isArray(evolve_dataset)) {
      options = evolve_dataset
      evolve_dataset = undefined
    }

    const isArray = (x) => Array.isArray(x) && x.length
    let evolve_set = isArray(evolve_dataset) ? evolve_dataset : isArray(self.dataset) ? self.dataset : null

    let population = self.members // Shallow copy, consider changing later once full functional pattern reached

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
    for (let i = 0; i < self.size - self.elitism - self.provenance; i++) {
      new_population.push(self.getOffspring())
    }

    // Replace the old population with the new population
    population = self.members = new_population // not purely functional yet so resorting to this

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

    return self.members
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
        if (self.members[0].score < self.members[1].score) self.sort();

        const index = Math.floor(Math.pow(Math.random(), self.selection.power) * self.members.length);
        return self.members[index];
      }
      case `FITNESS_PROPORTIONATE`: {
        // As negative fitnesses are possible
        // https://stackoverflow.com/questions/16186686/genetic-algorithm-handling-negative-fitness-values
        // this is unnecessarily run for every individual, should be changed

        let total_fitness = 0;
        let minimum_fitness = 0;
        for (let i = 0; i < self.members.length; i++) {
          const score = self.members[i].score;
          minimum_fitness = score < minimum_fitness ? score : minimum_fitness;
          total_fitness += score;
        }

        minimum_fitness = Math.abs(minimum_fitness);
        total_fitness += minimum_fitness * self.members.length;

        let random = Math.random() * total_fitness;
        let value = 0;

        for (let i = 0; i < self.members.length; i++) {
          const genome = self.members[i];
          value += genome.score + minimum_fitness;
          if (random < value) return genome;
        }

        // if all scores equal, return random genome
        return self.members[Math.floor(Math.random() * self.members.length)];
      }
      case `TOURNAMENT`: {
        if (self.selection.size > self.size) {
          throw new Error(`Your tournament size should be lower than the population size, please change methods.selection.TOURNAMENT.size`);
        }

        // Create a tournament
        const individuals = [];
        for (let i = 0; i < self.selection.size; i++) {
          let random_agent = self.members[Math.floor(Math.random() * self.members.length)];
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
      if (self.clear) for(let i = 0; i < self.members.length; i++) self.members[i].clear()

      // calculate the fitnesses
      self.fitness(dataset, self.members);
    } else {
      // Evaluate fitness at genome level
      for (let i = 0; i < self.members.length; i++) {

        const genome = self.members[i]

        // clear network state if flag set
        if (self.clear) genome.clear()

        genome.score = self.fitness(dataset, genome)

        self.members[i] = genome
      }
    }

    // Sort the population in order of fitness
    self.sort()

    // return the fitness of the best agent, which represents the fitness of the population
    return self.members[0]
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
    population = Array.isArray(population) && population.length ? population : self.members

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
    if (typeof self.members[self.members.length - 1].score === `undefined`) {
      self.evaluate();
    }

    if (self.members[0].score < self.members[1].score) self.sort();

    return self.members[0];
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
    if (typeof self.members[self.members.length - 1].score === `undefined`)
      self.evaluate(); // self.evaluate is an async function

    let score = 0;
    for (let i = 0; i < self.members.length; i++)
      score += self.members[i].score;

    return score / self.members.length;
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
    for (let i = 0; i < self.members.length; i++) {
      json.push(self.members[i].toJSON());
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
    self.members = population;
    self.size = population.length;
  };
}

Population.default = {
  options: {
    generation: 0, // internal variable
    inputs: 1,
    outputs: 1,
    dataset: [],
    equal: true,
    clean: false,
    size: 50,
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
    lastConnId: 0,
    connIdMap: {},
    mutation: methods.mutation.ALL,
    maxNodes: Infinity,
    maxConns: Infinity,
    maxGates: Infinity
  }
}

module.exports = Population;
