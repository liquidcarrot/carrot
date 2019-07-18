const _ = require(`lodash`);
// const parameter = require(`./util/parameter`);
const Network = require(`./architecture/network`);
const methods = require(`./methods/methods`);
const config = require(`./config`);

/**
* Runs the NEAT algorithm on group of neural networks.
*
* @constructs Neat
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
* @param {mutation[]} [options.mutation] Sets allowed [mutation methods](mutation) for evolution, a random mutation method will be chosen from the array when mutation occurs. Optional, but default methods are non-recurrent
*
* @prop {number} generation A count of the generations
* @prop {Network[]} population The current population for the neat instance. Accessible through `neat.population`
*
* @example
* const { Neat } = require("@liquid-carrot/carrot");
*
* // new Neat()
* let neat = new Neat()
*
* // new Neat(options)
* let neat = new Neat({ population_size: 100 })
*
* // new Neat(dataset)
* let neat = new Neat([
*   { input: [0, 0], output: [0] },
*   { input: [0, 1], output: [1] },
*   { input: [1, 0], output: [1] },
*   { input: [1, 1], output: [0] }
* ])
*
* // new Neat(input, output)
* let neat = new Neat(64, 10)
*
* // new Neat(dataset, options)
* let neat = new Neat([
*   { input: [0, 0], output: [0] },
*   { input: [0, 1], output: [1] },
*   { input: [1, 0], output: [1] },
*   { input: [1, 1], output: [0] }
* ], { population_size: 100 })
*
* // new Neat(input, output, options)
* let neat = new Neat(64, 10, { population_size: 100 })
*
* // new Neat(input, output, dataset)
* let neat = new Neat(2, 1, [
*   { input: [0, 0], output: [0] },
*   { input: [0, 1], output: [1] },
*   { input: [1, 0], output: [1] },
*   { input: [1, 1], output: [0] }
* ])
*
* // new Neat(input, output, dataset, options)
* let neat = new Neat(2, 1, [
*   { input: [0, 0], output: [0] },
*   { input: [0, 1], output: [1] },
*   { input: [1, 0], output: [1] },
*   { input: [1, 1], output: [0] }
* ], { population_size: 100 })
*
*/
const Neat = function(inputs, outputs, dataset, options) {
  const self = this;

  // new Neat(dataset) || new Neat(options)
  if(!(outputs || dataset || options)) {
    if(_.isPlainObject(inputs)) options = inputs;
    else if(Array.isArray(inputs)) dataset = inputs;

    inputs = undefined;
  }

  // new Neat(dataset, options)
  else if(!(dataset || options) && Array.isArray(inputs) && _.isPlainObject(outputs)) {
    dataset = inputs;
    options = outputs;
    inputs = outputs = undefined;
  }

  // new Neat(input, output, options)
  else if(!(options) && _.isInteger(inputs) && _.isInteger(outputs) && _.isPlainObject(dataset)) {
    options = dataset;
    dataset = undefined;
  }

  // new Neat()
  // new Neat(population) - leave out for now
  // new Neat(input, output)
  // new Neat(population, options) - leave out for now
  // new Neat(population, dataset) - leave out for now
  // new Neat(input, output, dataset)
  // new Neat(population, dataset, options) - leave out for now
  // new Neat(input, output, dataset, options)
  inputs = inputs || 1;
  outputs = outputs || 1;
  dataset = dataset || [];
  options = _.defaultsDeep(options, Neat.default.options);
  options.template = options.template || new Network(inputs, outputs);

  Object.assign(self, { inputs, outputs, dataset, ...options});

  /**
   * Create the initial pool of genomes
   *
   * @function createPool
   *
   * @deprecated
   *
   * @memberof Neat
   *
   * @param {Network} network
   * @param {Number} population_size the number of types the genome of network will be copied to make the pool
   */
  self.createPool = function createPool(network, population_size) {
    const population = [];

    for (let i = 0; i < population_size; i++) {
      population.push(Network.fromJSON({ ...network.toJSON(), score: undefined }));
    }

    return population;
  };

  /**
   * Creates a new population
   *
   * @function createPopulation
   *
   * @alpha
   *
   * @memberof Neat
   *
   * @param {Network} [network] - Template network used to create population - _other networks will be "identical twins"_ - _will use `this.template`, if `network` is not defined_
   * @param {number} [size=50] - Number of network in created population - _how many identical twins created in new population_
   *
   * @returns {Network[]} Returns an array of networks
   */
  self.createPopulation = function create_networks_for_evolution(network, size) {
    if(!size && Number.isInteger(network)) {
      size = network;
      network = undefined;
    }

    const population = [];

    network = network ? network.clone() : (self.template || new Network(self.inputs, self.outputs));
    size = size || self.population_size;

    for(let index = 0; index < size; index++) {
      population.push(network);
    }

    return population;
  };

  // Initialise the genomes
  self.population = self.population || self.createPopulation(self.template, self.population_size);

  /**
   * Replaces all networks that match the `select` function - _if `transform` is provided networks will be transformed before being filtered out_
   *
   * @function replace
   *
   * @memberof Neat
   *
   * @param {Network[]} [population] An array (population) of genomes (networks)
   * @param {number|Network|Function} [filter] An index, network, or function used to pick out replaceable genome(s) from the population - _invoked `filter(network, index, population)`_
   * @param {Network|Function} [transform] A network used to replace filtered genomes or a function used to mutate filtered genomes - _invoked `transform(network, index, population)`_
   *
   * @return {Network[]} Returns the new genome
   */
  self.replace = function(population, filter, transform) {
    if(population == undefined && filter == undefined && transform == undefined) throw new ReferenceError("Missing required parameter 'transform'")
    
    function _transform(t) {
      const transformer = t instanceof Network ? (() => t) : typeof t === "function" ? t : new TypeError(`Expected ${t} to be a {Network|Function}`);
      return transformer;
    }
    function _filter(f) {
      const filter = Number.isFinite(f) ? (network, index, population) => index === f
        : f instanceof Network ? (network, index, population) => network === f
        : typeof f === "function" ? f
        : f == undefined ? () => true
        : new TypeError(`Expected ${t} to be a {Number|Network|Function|undefined}`);
      return filter;
    }
    
    if (filter == undefined && transform == undefined) {
      transform = _transform(population);
      filter = _filter();
      population = self.population;
    }
    else if (transform == undefined) {
      transform = _transform(filter);
      filter = _filter(population);
      population = self.population;
    } else {
      transform = _transform(transform);
      filter = _filter(filter);
      population = population || self.population;
    }
    
    const filtered = [...self.population];

    for (let genome = 0; genome < population.length; genome++)
      if (filter(population[genome], genome, population))
        filtered[genome] = transform(population[genome], genome, population);

    return filtered;
  };

  /**
   * Selects a random mutation method for a genome and mutates it
   *
   * @function mutateRandom
   *
   * @beta
   *
   * @memberof Neat
   *
   * @param {Network} genome Network to test for possible mutations
   * @param {mutation[]} allowedMutations An array of allowed mutations to pick from
   *
   * @return {mutation} Selected mutation
  */
  self.mutateRandom = function apply_random_mutation_method_to_genome(genome, allowedMutations) {
    let possible = allowedMutations ? [...allowedMutations] : [...self.mutation]

    // remove any methods disallowed by user-limits: i.e. maxNodes, maxConns, ...
    possible = possible.filter(function(method) {
      return (
        method !== methods.mutation.ADD_NODE || genome.nodes.length < self.maxNodes ||
        method !== methods.mutation.ADD_CONN || genome.connections.length < self.maxConns ||
        method !== methods.mutation.ADD_GATE || genome.gates.length < self.maxGates
      )
    })

    do {
      const current = possible[Math.floor(Math.random() * possible.length)]

      // attempt mutation, success: return mutation method, failure: remove from possible methods
      if (genome.mutate(current)) {
        return current;
      } else {
        possible = possible.filter(function(method) { return method.name !== current.name });
      }

      // Return null when mutation is impossible
      if (!possible || possible.length === 0) return null;

    } while(true)
  };

  /**
   * Mutates the given (or current) population
   *
   * @function mutate
   *
   * @memberof Neat
   *
   * @param {mutation} [method] A mutation method to mutate the population with. When not specified will pick a random mutation from the set allowed mutations.
   */
  self.mutate = function mutate_population(method) {
    if (method) {
      for (let i = 0; i < self.population.length; i++) { // Elitist genomes should not be included
        if (Math.random() <= self.mutation_rate) {
          for (let j = 0; j < self.mutation_amount; j++) {
            self.population[i].mutate(method);
          }
        }
      }
    } else {
      for (let i = 0; i < self.population.length; i++) { // Elitist genomes should not be included
        if (Math.random() <= self.mutation_rate) {
          for (let j = 0; j < self.mutation_amount; j++) {
            self.mutateRandom(self.population[i], self.mutation);
          }
        }
      }
    }
  };
  
  /**
   * Evaluates, selects, breeds and mutates population
   *
   * @memberof Neat
   *
   * @alias evolve
   *
   * @param {Array<{input:number[],output:number[]}>} [evolve_dataset=dataset] A set to be used for evolving the population, if none is provided the dataset passed to Neat on creation will be used.
   * @param {Object} [options]
   * @param {boolean} [options.networks=false] Iff `options.networks === true` `neat.evolve()` will return networks, instead of their performance
   *
   * @returns {{ "best": {number}, "average": {number}, "worst": {number}}|{ "best": {Network}, "average": {Network}, "worst": {Network}} Returns
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
   * let neat = new Neat(originalSet, {
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
   *
   * let pick = function pickGenome(genome) return genome.nodes.length > 100 ? true : false // Remove genomes with more than 100 nodes
   *
   * let adjust = function adjustGenome(genome) return genome.clear() // clear the nodes
   *
   * // evolves using originalSet
   * neat.evolve(null, filter, adjust)
   *
   */
  self.evolve = async function(evolve_dataset, pickGenome, filterGenome) {
    /*
    // // Check if evolve is possible
    // if (self.elitism + self.provenance > self.population_size) throw new Error("Can`t evolve! Elitism + provenance exceeds population size!");

    // dataset = dataset || self.dataset;
    
    
    // // Reset the scores
    // for (let i = 0; i < self.population.length; i++) self.population[i].score = undefined;

    // // Check population for evaluation
    // // if (typeof self.population[self.population.length - 1].score === `undefined`)
    // await self.evaluate(dataset);
    
    // console.log(self.population[0].score);

    // // Sort in order of fitness (fittest first)
    // self.sort();

    // // Elitism, assumes population is sorted by fitness
    // const elitists = [];
    // for (let i = 0; i < self.elitism; i++) elitists.push(self.population[i]);

    // // Provenance
    // const new_population = Array(self.provenance).fill(Network.fromJSON(self.template.toJSON()))

    // // Breed the next individuals
    // for (let i = 0; i < self.population_size - self.elitism - self.provenance; i++)
    //   new_population.push(self.getOffspring());

    // // Replace the old population with the new population
    // self.population = new_population;

    // // Mutate the new population
    // self.mutate();

    // // Add the elitists
    // self.population.push(...elitists);

    // // evaluate the population
    // await self.evaluate(dataset);

    // // Sort in order of fitness (fittest first)
    // self.sort()

    // const fittest = Network.fromJSON(self.population[0].toJSON());
    // fittest.score = self.population[0].score;

    // const best = Network.fromJSON(self.population[0].toJSON());
    // best.score = self.population[0].score
    // const worst = Network.fromJSON(self.population[self.population.length - 1].toJSON());
    // worst.score = self.population[self.population.length - 1].score
    // const median = Network.fromJSON(self.population[Math.floor(self.population.length / 2)].toJSON());
    // median.score = self.population[Math.floor(self.population.length / 2)].score


    // self.generation++;

    // if (options && options.networks) {
    //   return { best, median, worst }
    // } else {
    //   return {
    //     best: best.score,
    //     median: median.score,
    //     worst: worst.score
    //   }
    // }
    
    //==========================================================
    
    // console.log(dataset);
    // console.log(options);
    
    // if (options == undefined && !Array.isArray(dataset) && typeof dataset === "object") {
    //   options = dataset;
    //   dataset = self.dataset;
    // }
    
    // options = options || {};
    // dataset = dataset || self.dataset || [];
    
    
    // console.log(dataset);
    // console.log(options);
    
    // console.log(dataset == undefined);
    // console.log(!dataset.length);
    
    // if (dataset == undefined || !dataset.length) throw new ReferenceError("'dataset' was not passed to 'neat.evolve()' or 'new Neat'");
    
    
    
    // for (let index = 0; index < self.population.length; index++) {
    //   await self.population[index].evolve(dataset);
    // }
    
    // const best = self.population[0];
    // const worst = self.population[self.population.length - 1];
    // const median = self.population[Math.floor(self.population.length / 2)];
    
    // if (options && options.networks) {
    //   return { best, median, worst }
    // } else {
    //   return {
    //     best: best.score,
    //     median: median.score,
    //     worst: worst.score
    //   }
    // }
    
    //==========================================================
    */
    
    // Check if evolve is possible
    if (self.elitism + self.provenance > self.population_size) {
      throw new Error(`Can't evolve! Elitism + provenance exceeds population size!`);
    }

    // evolve dataset is optional, so deal with not having it
    if (typeof evolve_dataset === `function`) {
      adjustGenome = pickGenome;
      pickGenome = evolve_dataset
      evolve_dataset = undefined;
    }

    evolve_dataset = evolve_dataset || self.dataset;

    // Check population for evaluation
    if (self.population[self.population.length - 1].score == undefined) {
      await self.evaluate(evolve_dataset);
    }
    // Check & adjust genomes as needed
    if (pickGenome) {
      self.population = self.filterGenome(self.population, self.template, pickGenome, adjustGenome);
    }

    // Sort in order of fitness (fittest first)
    self.sort();

    // Elitism, assumes population is sorted by fitness
    const elitists = [];
    for (let index = 0; index < self.elitism; index++) elitists.push(self.population[index]);

    // Provenance
    const new_population = Array(self.provenance).fill(Network.fromJSON(self.template.toJSON()))

    // Breed the next individuals
    for (let i = 0; i < self.population_size - self.elitism - self.provenance; i++) {
      new_population.push(self.getOffspring());
    }

    // Replace the old population with the new population
    self.population = new_population;

    // Mutate the new population
    self.mutate();

    // Add the elitists
    self.population.push(...elitists);

    // evaluate the population
    await self.evaluate(evolve_dataset);

    // Check & adjust genomes as needed
    if (pickGenome) self.population = self.filterGenome(self.population, self.template, pickGenome, adjustGenome)

    // Sort in order of fitness (fittest first)
    self.sort()

    const fittest = Network.fromJSON(self.population[0].toJSON());
    fittest.score = self.population[0].score;

    // Reset the scores
    for (let i = 0; i < self.population.length; i++) self.population[i].score = undefined;

    self.generation++;

    return fittest;
  };

  /**
   * Returns a genome for recombination (crossover) based on one of the [selection methods](selection) provided.
   *
   * Should be called after `evaluate()`
   *
   * @function getParent
   *
   * @memberof Neat
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
   * @memberof Neat
   *
   * @returns {Network} Child network
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
   * @memberof Neat
   *
   * @param {Object[]} [dataset]
   * @param {Object} [options]
   * @param {boolean} [options.clear=false]
   * @param {boolean} [options.networks=false]
   *
   * @return {{ "best": {number|Network}, "average": {number|Network}, "worst": {number|Network} }} Return the performance metrics/benchmarks of the networks - _returns networks iff `options.networks === true`_
   */
  self.evaluate = async function (dataset) {
    dataset = dataset || self.dataset;

    if (self.fitnessPopulation) {
      // check the clear flag
      if (self.clear) {
        for (let i = 0; i < self.population.length; i++) {
          self.population[i].clear();
        }
      }

      // calculate the fitnesses
      await self.fitness(dataset, self.population);
    } else {
      for (let i = 0; i < self.population.length; i++) {
        const genome = self.population[i];
        if (self.clear) genome.clear(); // clear flag
        genome.score = await self.fitness(dataset, genome);
        self.population[i] = genome;
      }
    }

    // Sort the population in order of fitness
    self.sort()

    // return the fitness of the best agent, which represents the fitness of the population
    return self.population[0]
  };

  /**
   * Sorts the population by score
   *
   * @function sort
   *
   */
  self.sort = function sort_population_by_fitness() {
    self.population.sort(function (a, b) {
      return b.score - a.score;
    });
  };

  /**
   * Returns the fittest genome of the current population
   *
   * @function getFittest
   *
   * @memberof Neat
   *
   * @returns {Network} Current population's fittest genome
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
   * @memberof Neat
   *
   * @returns {number} Average fitness of the current population
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
   * @memberof Neat
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
   * @memberof Neat
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

Neat.default = {
  options: {
    generation: 0, // internal variable
    // input: 1,
    // output: 1,
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
    mutation: methods.mutation.FFW,
    // template: new Network(this.input, this.output)
    maxNodes: Infinity,
    maxConns: Infinity,
    maxGates: Infinity
  }
}

module.exports = Neat;
