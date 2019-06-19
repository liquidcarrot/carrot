const _ = require('lodash');
const parameter = require('./util/parameter');
const Network = require('./architecture/network');
const methods = require('./methods/methods');
const config = require('./config');

/**
* Runs the NEAT algorithm on group of neural networks.
*
* @constructs Neat
*
* @param {number} [inputs=1] Size of input layer of the networks in the population
* @param {number} [outputs=1] Size of input layer of the networks in the population
* @param {Array<{inputs:number[],outputs:number[]}>} [dataset] Dataset used to train networks in the population at first - _other sets of data can be passed to `neat.evolve()` after constuction_
* @param {Object} options **Configuration Options**
* @param {number} [options.popsize=50] Population size of each generation.
* @param {number} [options.elitism=1] Elitism of every evolution loop. [Elitism in genetic algortihtms.](https://www.researchgate.net/post/What_is_meant_by_the_term_Elitism_in_the_Genetic_Algorithm)
* @param {number} [options.provenance=0] Number of genomes inserted the original network template (Network(input,output)) per evolution.
* @param {number} [options.mutationRate=0.4] Sets the mutation rate. If set to 0.3, 30% of the new population will be mutated. Default is 0.4.
* @param {number} [options.mutationAmount=1] If mutation occurs (randomNumber < mutationRate), sets amount of times a mutation method will be applied to the network.
* @param {cost} [options.cost=cost.MSE]  Specify the cost function for the evolution, this tells a genome in the population how well it's performing. Default: methods.cost.MSE (recommended).
* @param {boolean} [options.equal=false] When true [crossover](Network.cross_over) parent genomes are assumed to be equally fit and offspring are built with a random amount of neurons within the range of parents' number of neurons. Set to false to select the "fittest" parent as the neuron amount template.
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
* let neat = new Neat({ popsize: 100 })
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
* ], { popsize: 100 })
*
* // new Neat(input, output, options)
* let neat = new Neat(64, 10, { popsize: 100 })
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
* ], { popsize: 100 })
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
  options = _.defaultsDeep(options, Neat.default.options);
  options.template = options.template || new Network(inputs, outputs);

  Object.assign(self, { inputs, outputs, dataset, ...options});

  /**
   * Create the initial pool of genomes
   *
   * @function createPool
   *
   * @memberof Neat
   *
   * @param {Network} network
   */
  self.createPool = function createInitialPopulation(network, popsize) {
    const population = [];

    for(let i = 0; i < popsize; i++) population.push(Network.from_JSON({ ...network.to_JSON(), score: undefined }))

    return population;
  };

  /**
   * Creates a new population
   *
   * @memberof Neat
   *
   * @param {Network} network - Template network used to create population - _other networks will be "identical twins"_
   * @param {number} size - Number of network in created population - _how many identical twins created in new population_
   *
   * @returns {Network[]} Returns an array of networks
   */
  self.createPopulation = function(network, size) {
    if(!size && Number.isInteger(network)) {
      size = network;
      network = undefined;
    }

    const population = [];

    network = network ? network.clone() : (self.template || new Network(self.inputs, self.outputs));
    size = size || self.popsize;

    for(let index = 0; index < size; index++) {
      population.push(network);
    }

    return population;
  };

  // Initialise the genomes
  self.population = self.population || self.createPopulation(self.template, self.popsize);



  /**
   * Replaces all networks that match the `select` function - _if `transform` is provided networks will be transformed before being filtered out_
   *
   * @param {network[]} population An array (population) of genomes (networks)
   * @param {network} [new_network] Replaces networks from
   * @param {function} [select]
   * @param {function} [transform] A function to change genomes with, takes a genome as a parameter
   */
  self.replace = function(population, template, select, transform) {
    const filtered = []

    for(let index = 0; index < population.length; index++) {
      if(select(population[index])) filtered.push(transform ? transform(population[index]) : population[index]);
    }

    return filtered;
  };

  /**
   * Selects a random mutation method for a genome and mutates it
   *
   * @param {Network} genome Network to test for possible mutations
   * @param {mutation[]} allowedMutations An array of allowed mutations to pick from
   *
   * @return {mutation} Selected mutation
  */
  self.mutateRandom = function selectMethodAndMutateNetwork(genome, allowedMutations) {
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
   * Evaluates, selects, breeds and mutates population
   *
   * @memberof Neat
   *
   * @alias evolve
   *
   * @param {Array<{input:number[],output:number[]}>} [evolveSet=dataset] A set to be used for evolving the population, if none is provided the dataset passed to Neat on creation will be used.
   * @param {function} [pickGenome] A custom selection function to pick out unwanted genomes. Accepts a network as a parameter and returns true for selection.
   * @param {function} [adjustGenome=this.template] Accepts a network, modifies it, and returns it. Used to modify unwanted genomes returned by `pickGenome` and reincorporate them into the population. If left unset, unwanted genomes will be replaced with the template Network. Will only run when pickGenome is defined.
   *
   * @returns {Network} Fittest network
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
   * let evolveSet = [
   *  { input: [0], output: [1] },
   *  { input: [1], output: [0] }
   * ]
   *
   * // evolves using evolveSet INSTEAD of originalSet
   * neat.evolve(evolveSet)
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
  self.evolve = async function(evolveSet, pickGenome, adjustGenome) {
    // Check if evolve is possible
    if(self.elitism + self.provenance > self.popsize) throw new Error("Can't evolve! Elitism + provenance exceeds population size!");

    evolveSet = evolveSet || self.dataset;

    // Check population for evaluation
    if(self.population[self.population.length - 1].score == undefined) await self.evaluate(evolveSet);
    // Check & adjust genomes as needed
    if(pickGenome) self.population = self.filterGenome(self.population, self.template, pickGenome, adjustGenome)

    // Sort in order of fitness (fittest first)
    self.sort();

    // Elitism, assumes population is sorted by fitness
    const elitists = [];
    for(let index = 0; index < self.elitism; index++) elitists.push(self.population[index]);

    // Provenance
    let newPopulation = Array(self.provenance).fill(Network.from_JSON(self.template.to_JSON()))

    // Breed the next individuals
    for (let i = 0; i < self.popsize - self.elitism - self.provenance; i++)
      newPopulation.push(self.getOffspring());

    // Replace the old population with the new population
    self.population = newPopulation;

    // Mutate the new population
    self.mutate();

    // Add the elitists
    self.population.push(...elitists);

    // evaluate the population
    await self.evaluate(evolveSet);
    // await self.evaluate(_.isArray(evolveSet) ? evolveSet : _.isArray(dataset) ? dataset : parameter.is.required("dataset"));

    // Check & adjust genomes as needed
    if(pickGenome) self.population = self.filterGenome(self.population, self.template, pickGenome, adjustGenome)

    // Sort in order of fitness (fittest first)
    self.sort()

    const fittest = Network.from_JSON(self.population[0].to_JSON());
    fittest.score = self.population[0].score;

    // Reset the scores
    for(let i = 0; i < self.population.length; i++) self.population[i].score = undefined;

    self.generation++;

    return fittest;
  };

  /**
   * Returns a genome for recombination (crossover) based on one of the [selection methods](selection) provided.
   *
   * Should be called after `evaluate()`
   *
   * @memberof Neat
   *
   * @return {Network} Selected genome for offspring generation
   */
  self.getParent = function () {
    switch (self.selection.name) {
      case 'POWER': {
        if (self.population[0].score < self.population[1].score) self.sort();

        let index = Math.floor(Math.pow(Math.random(), self.selection.power) * self.population.length);
        return self.population[index];
      }
      case 'FITNESS_PROPORTIONATE': {
        // As negative fitnesses are possible
        // https://stackoverflow.com/questions/16186686/genetic-algorithm-handling-negative-fitness-values
        // this is unnecessarily run for every individual, should be changed

        let totalFitness = 0;
        let minimalFitness = 0;
        for (let i = 0; i < self.population.length; i++) {
          let score = self.population[i].score;
          minimalFitness = score < minimalFitness ? score : minimalFitness;
          totalFitness += score;
        }

        minimalFitness = Math.abs(minimalFitness);
        totalFitness += minimalFitness * self.population.length;

        let random = Math.random() * totalFitness;
        let value = 0;

        for (let i = 0; i < self.population.length; i++) {
          let genome = self.population[i];
          value += genome.score + minimalFitness;
          if (random < value) return genome;
        }

        // if all scores equal, return random genome
        return self.population[Math.floor(Math.random() * self.population.length)];
      }
      case 'TOURNAMENT': {
        if (self.selection.size > self.popsize) {
          throw new Error('Your tournament size should be lower than the population size, please change methods.selection.TOURNAMENT.size');
        }

        // Create a tournament
        let individuals = [];
        for (let i = 0; i < self.selection.size; i++) {
          let random = self.population[Math.floor(Math.random() * self.population.length)];
          individuals.push(random);
        }

        // Sort the tournament individuals by score
        individuals.sort(function (a, b) {
          return b.score - a.score;
        });

        // Select an individual
        for (let i = 0; i < self.selection.size; i++)
          if (Math.random() < self.selection.probability || i === self.selection.size - 1) return individuals[i];
      }
    }
  };

  /**
   * Selects two genomes from the population with `getParent()`, and returns the offspring from those parents. NOTE: Population MUST be sorted
   *
   * @memberof Neat
   *
   * @returns {Network} Child network
   */
  self.getOffspring = function () {
    let parent1 = self.getParent();
    let parent2 = self.getParent();

    return Network.cross_over(parent1, parent2, self.equal);
  };

  /**
   * Mutates the given (or current) population
   *
   * @memberof Neat
   *
   * @param {mutation} [method] A mutation method to mutate the population with. When not specified will pick a random mutation from the set allowed mutations.
   */
  self.mutate = function (method) {
    if(method) {
      for(let i = 0; i < self.population.length; i++) { // Elitist genomes should not be included
        if (Math.random() <= self.mutationRate)
          for (let j = 0; j < self.mutationAmount; j++)
            self.population[i].mutate(method)
      }
    } else {
      for(let i = 0; i < self.population.length; i++) { // Elitist genomes should not be included
        if (Math.random() <= self.mutationRate)
          for (let j = 0; j < self.mutationAmount; j++)
            self.mutateRandom(self.population[i], self.mutation)
      }
    }
  };

  /**
   * Evaluates the current population, basically sets their `.score` property
   *
   * @memberof Neat
   *
   * @return {Network} Fittest Network
   */
  self.evaluate = async function (dataset) {
    dataset = dataset || self.dataset;

    if (self.fitnessPopulation) {
      if (self.clear) {
        for (let i = 0; i < self.population.length; i++)
          self.population[i].clear();
      }
      await self.fitness(dataset, self.population);
    } else {
      for (let i = 0; i < self.population.length; i++) {
        const genome = self.population[i];
        if (self.clear) genome.clear();
        genome.score = await self.fitness(dataset, genome);
        self.population[i] = genome;
      }
    }

    // Sort the population in order of fitness
    self.sort()

    return self.population[0]
  };

  /**
   * Sorts the population by score
  */
  self.sort = function () {
    self.population.sort(function (a, b) {
      return b.score - a.score;
    });
  };

  /**
   * Returns the fittest genome of the current population
   *
   * @memberof Neat
   *
   * @returns {Network} Current population's fittest genome
  */
  self.getFittest = function () {
    // Check if evaluated. self.evaluate is an async function
    if (typeof self.population[self.population.length - 1].score === 'undefined')
      self.evaluate();

    if (self.population[0].score < self.population[1].score) self.sort();

    return self.population[0];
  };

  /**
   * Returns the average fitness of the current population
   *
   * @memberof Neat
   *
   * @returns {number} Average fitness of the current population
   */
  self.getAverage = function () {
    if (typeof self.population[self.population.length - 1].score === 'undefined')
      self.evaluate(); // self.evaluate is an async function

    let score = 0;
    for (let i = 0; i < self.population.length; i++)
      score += self.population[i].score;

    return score / self.population.length;
  };

  /**
   * Export the current population to a JSON object
   *
   * Can be used later with `from_JSON(json)` to reload the population
   *
   * @memberof Neat
   *
   * @return {object[]} A set of genomes (a population) represented as JSON objects.
   */
  self.to_JSON = function exportPopulation() {
    let json = [];
    for (let i = 0; i < self.population.length; i++)
      json.push(self.population[i].to_JSON());

    return json;
  };

  /**
   * Imports population from a json. Must be an array of networks converted to JSON objects.
   *
   * @memberof Neat
   *
   * @param {object[]} json set of genomes (a population) represented as JSON objects.
  */
  self.from_JSON = function importPopulation(json) {
    let population = [];
    for (let i = 0; i < json.length; i++)
      population.push(Network.from_JSON(json[i]));
    self.population = population;
    self.popsize = population.length;
  };
}

Neat.default = {
  options: {
    generation: 0, // internal variable
    // input: 1,
    // output: 1,
    equal: true,
    clean: false,
    popsize: 50,
    growth: 0.0001,
    cost: methods.cost.MSE,
    amount: 1,
    elitism: 1,
    provenance: 0,
    mutationRate: 0.4,
    mutationAmount: 1,
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
