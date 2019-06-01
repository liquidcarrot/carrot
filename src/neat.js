let _ = require('lodash');
let parameter = require('./util/parameter');
var Network = require('./architecture/network');
var methods = require('./methods/methods');
var config = require('./config');

/**
* Runs the NEAT algorithm on group of neural networks.
*
* @constructs Neat
*
* @param {Array<{input:number[],output:number[]}>} [dataset] A set of input values and ideal output values to evaluate a genome's fitness with. Must be included to use `NEAT.evaluate` without passing a dataset
* @param {Object} options - Configuration options
* @param {number} input - The input size of `template` networks.
* @param {number} output - The output size of `template` networks.
* @param {boolean} [options.equal=false] When true [crossover](Network.crossOver) parent genomes are assumed to be equally fit and offspring are built with a random amount of neurons within the range of parents' number of neurons. Set to false to select the "fittest" parent as the neuron amount template.
* @param {number} [options.clear=false] Clear the context of the population's nodes, basically reverting them to 'new' neurons. Useful for predicting timeseries with LSTM's.
* @param {number} [options.popsize=50] Population size of each generation.
* @param {number} [options.growth=0.0001] Set the penalty for large networks. Penalty calculation: penalty = (genome.nodes.length + genome.connectoins.length + genome.gates.length) * growth; This penalty will get added on top of the error. Your growth should be a very small number.
* @param {cost} [options.cost=cost.MSE]  Specify the cost function for the evolution, this tells a genome in the population how well it's performing. Default: methods.cost.MSE (recommended).
* @param {number} [options.amount=1] Set the amount of times to test the trainingset on a genome each generation. Useful for timeseries. Do not use for regular feedfoward problems.
* @param {number} [options.elitism=1] Elitism of every evolution loop. [Elitism in genetic algortihtms.](https://www.researchgate.net/post/What_is_meant_by_the_term_Elitism_in_the_Genetic_Algorithm)
* @param {number} [options.provenance=0] Number of genomes inserted the original network template (Network(input,output)) per evolution.
* @param {number} [options.mutationRate=0.4] Sets the mutation rate. If set to 0.3, 30% of the new population will be mutated. Default is 0.4.
* @param {number} [options.mutationAmount=1] If mutation occurs (randomNumber < mutationRate), sets amount of times a mutation method will be applied to the network.
* @param {boolean} [options.fitnessPopulation=false] Flag to return the fitness of a population of genomes. Set this to false to evaluate each genome inidividually.
* @param {Function} [options.fitness] - A fitness function to evaluate the networks. Takes a `dataset` and a `genome` i.e. a [network](Network) or a `population` i.e. an array of networks and sets the genome `.score` property
* @param {string} [options.selection=FITNESS_PROPORTIONATE] [Selection method](selection) for evolution (e.g. Selection.FITNESS_PROPORTIONATE).
* @param {Array} [options.crossover] Sets allowed crossover methods for evolution.
* @param {Network} [options.network=false] Network to start evolution from
* @param {number} [options.maxNodes=Infinity] Maximum nodes for a potential network
* @param {number} [options.maxConns=Infinity] Maximum connections for a potential network
* @param {number} [options.maxGates=Infinity] Maximum gates for a potential network
* @param {function} [options.mutationSelection=ALL] Custom mutation selection function if given
* @param {mutation[]} [options.mutation] Sets allowed [mutation methods](mutation) for evolution, a random mutation method will be chosen from the array when mutation occurs. Optional, but default methods are non-recurrent
*
* @prop {number} generation A count of the generations
* @prop {Network[]} population The current population for the neat instance. Accessible through `neat.population`
*
* @example
* let { Neat } = require("@liquid-carrot/carrot");
*
* let neat = new Neat(4, 1, dataset, {
*   elitism: 10,
*   clear: true,
*   popsize: 1000
* });
*/
let Neat = function (dataset, {
  generation = 0, // internal variable
  input = 1,
  output = 1,
  equal = true,
  clean = false,
  popsize = 50,
  growth = 0.0001,
  cost = methods.cost.MSE,
  amount = 1,
  elitism = 1,
  provenance = 0,
  mutationRate = 0.4,
  mutationAmount = 1,
  fitnessPopulation = false,
  fitness = function(set = dataset, genome, amount = 1, cost = methods.cost.MSE, growth = 0.0001) {
    let score = 0;
    for (let i = 0; i < amount; i++) score -= genome.test(set, cost).error;

    score -= (genome.nodes.length - genome.input - genome.output + genome.connections.length + genome.gates.length) * growth;
    score = isNaN(score) ? -Infinity : score; // this can cause problems with fitness proportionate selection

    return score / amount;
  },
  selection = methods.selection.POWER,
  crossover = [
    methods.crossover.SINGLE_POINT,
    methods.crossover.TWO_POINT,
    methods.crossover.UNIFORM,
    methods.crossover.AVERAGE
  ],
  mutation = methods.mutation.FFW,
  efficientMutation = false,
  template = (new Network(input, output)),
  maxNodes = Infinity,
  maxConns = Infinity,
  maxGates = Infinity,
  selectMutationMethod = this.selectMutationMethod
} = {}) {
  let self = this;
  
  _.assignIn(self, {
    generation,
    input,
    output,
    equal,
    clean,
    popsize,
    growth,
    cost,
    amount,
    elitism,
    provenance,
    mutationRate,
    mutationAmount,
    fitnessPopulation,
    fitness,
    selection,
    crossover,
    mutation,
    efficientMutation,
    template,
    maxNodes,
    maxConns,
    maxGates,
    selectMutationMethod
  });
  
  /**
   * Create the initial pool of genomes
   *
   * @param {Network} network
   */
  self.createPool = function createInitialPopulation (network, popsize) {
    return Array(popsize).fill(Network.fromJSON({ ...network.toJSON(), score: undefined }))
  };
  
  // Initialise the genomes
  self.population = self.createPool(self.template, self.popsize);
  
  self.filterGenome = function(population, template, pickGenome, adjustGenome) {
      let filtered = [...population]; // avoid mutations
      
      // Check for correct return type from pickGenome
      const check = function checkPick(genome) {
        const pick = pickGenome(genome)
        if (typeof pick !== "boolean") throw new Error("pickGenome must always return a boolean!")
        return pick
      }
      
      if(adjustGenome){
        for (let i = 0; i < population.length; i++) {
          if(check(filtered[i])) {
            const result = adjustGenome(filtered[i])
            if (!(result instanceof Network)) throw new Error("adjustGenome must always return a network!")
            filtered[i] = result
          }
        }
      } else
          for (let i = 0; i < population.length; i++)
            if(check(filtered[i])) filtered[i] = Network.fromJSON(template.toJSON)
    
      return filtered;
    };
  
  /**
   * Selects a random mutation method for a genome according to the parameters
   *
   * @param genome
  */
  self.selectMutationMethod = function (genome, allowedMutations, efficientMutation) {
    
    if(efficientMutation) {
      let filtered = allowedMutations ? [...allowedMutations] : [...self.mutation]
      let success = false
      while(!success) {
        const currentMethod = filtered[Math.floor(Math.random() * filtered.length)]
        
        if(currentMethod === methods.mutation.ADD_NODE && genome.nodes.length >= self.maxNodes || currentMethod === methods.mutation.ADD_CONN && genome.connections.length >= self.maxConns || currentMethod === methods.mutation.ADD_GATE && genome.gates.length >= self.maxGates) {
          success = false
        } else {
          success = genome.mutate(currentMethod)
        }
        
        // we're done
        if(success || !filtered || filtered.length === 0) return
        
        // if not, remove the impossible method
        filtered = filtered.filter(function(value, index, array) {
          return value.name !== currentMethod.name
        })
      }
    } else {
      let allowed = allowedMutations ? allowedMutations : self.mutation
      let current = allowed[Math.floor(Math.random() * allowed.length)]

      if (current === methods.mutation.ADD_NODE && genome.nodes.length >= self.maxNodes) {
        if (config.warnings) console.warn('maxNodes exceeded!')
        return null;
      }
  
      if (current === methods.mutation.ADD_CONN && genome.connections.length >= self.maxConns) {
        if (config.warnings) console.warn('maxConns exceeded!');
        return null;
      }
  
      if (current === methods.mutation.ADD_GATE && genome.gates.length >= self.maxGates) {
        if (config.warnings) console.warn('maxGates exceeded!');
        return null;
      }
  
      return current
    }
  };
  
  /**
   * Evaluates, selects, breeds and mutates population
   *
   * @param {Array<{input:number[],output:number[]}>} [evolveSet=dataset] A set to be used for evolving the population, if none is provided the dataset passed to Neat on creation will be used.
   * @param {function} [pickGenome] A custom selection function to pick out unwanted genomes. Accepts a network as a parameter and returns true for selection.
   * @param {function} [adjustGenome=this.template] Accepts a network, modifies it, and returns it. Used to modify unwanted genomes returned by `pickGenome` and reincorporate them into the population. If left unset, unwanted genomes will be replaced with the template Network. Will only run when pickGenome is defined.
   *
   * @returns {Network} Fittest network
   *
   * @example
   * let neat = new Neat(dataset, {
   *  elitism: 10,
   *  clear: true,
   *  popsize: 1000
   * });
   *
   * let filter = function(genome) {
   *  // Remove genomes with more than 100 nodes
   *  return genome.nodes.length > 100 ? true : false
   * }
   *
   * let adjust = function(genome) {
   *  // clear the nodes
   *  return genome.clear()
   * }
   *
   * neat.evolve(evolveSet, filter, adjust).then(function(fittest) {
   *  console.log(fittest)
   * })
  */
  self.evolve = async function (evolveSet, pickGenome, adjustGenome) {
    // Check if evolve is possible
    if(self.elitism + self.provenance > self.popsize) throw new Error("Can't evolve! Elitism + provenance exceeds population size!");
    
    // Check population for evaluation
    if (typeof self.population[self.population.length - 1].score === 'undefined')
      await self.evaluate(_.isArray(evolveSet) ? evolveSet : _.isArray(dataset) ? dataset : parameter.is.required("dataset"));
    // Check & adjust genomes as needed
    if(pickGenome) self.population = self.filterGenome(self.population, self.template, pickGenome, adjustGenome)
    
    // Sort in order of fitness (fittest first)
    self.sort();

    // Elitism, assumes population is sorted by fitness
    var elitists = [];
    for (let i = 0; i < self.elitism; i++) elitists.push(self.population[i]);

    // Provenance
    let newPopulation = Array(self.provenance).fill(Network.fromJSON(self.template.toJSON()))
    
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
    await self.evaluate(_.isArray(evolveSet) ? evolveSet : _.isArray(dataset) ? dataset : parameter.is.required("dataset"));
    
    // Check & adjust genomes as needed
    if(pickGenome) self.population = self.filterGenome(self.population, self.template, pickGenome, adjustGenome)
    
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
   * @return {Network} Selected genome for offspring generation
   */
  self.getParent = function () {
    switch (self.selection.name) {
      case 'POWER': {
        if (self.population[0].score < self.population[1].score) self.sort();

        var index = Math.floor(Math.pow(Math.random(), self.selection.power) * self.population.length);
        return self.population[index];
      }
      case 'FITNESS_PROPORTIONATE': {
        // As negative fitnesses are possible
        // https://stackoverflow.com/questions/16186686/genetic-algorithm-handling-negative-fitness-values
        // this is unnecessarily run for every individual, should be changed

        var totalFitness = 0;
        var minimalFitness = 0;
        for (let i = 0; i < self.population.length; i++) {
          var score = self.population[i].score;
          minimalFitness = score < minimalFitness ? score : minimalFitness;
          totalFitness += score;
        }

        minimalFitness = Math.abs(minimalFitness);
        totalFitness += minimalFitness * self.population.length;

        var random = Math.random() * totalFitness;
        var value = 0;

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
        var individuals = [];
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
   * @returns {Network} Child network
   */
  self.getOffspring = function () {
    var parent1 = self.getParent();
    var parent2 = self.getParent();

    return Network.crossOver(parent1, parent2, self.equal);
  };

  /**
   * Mutates the given (or current) population
   */
  self.mutate = function () {
    // Elitist genomes should not be included
    for (let i = 0; i < self.population.length; i++) {
      if (Math.random() <= self.mutationRate) {
        for (let j = 0; j < self.mutationAmount; j++) {
          const mutationMethod = self.selectMutationMethod(self.population[i], self.mutation, self.efficientMutation);
          self.efficientMutation ? null : self.population[i].mutate(mutationMethod);
        }
      }
    }
  };

  /**
   * Evaluates the current population, basically sets their `.score` property
   *
   * @return {Network} Fittest Network
   */
  self.evaluate = async function (dataset) {
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
   * @returns {number} Average fitness of the current population
   */
  self.getAverage = function () {
    if (typeof self.population[self.population.length - 1].score === 'undefined')
      self.evaluate(); // self.evaluate is an async function

    var score = 0;
    for (let i = 0; i < self.population.length; i++)
      score += self.population[i].score;

    return score / self.population.length;
  };

  /**
   * Export the current population to a JSON object
   *
   * Can be used later with `fromJSON(json)` to reload the population
   *
   * @return {object[]} A set of genomes (a population) represented as JSON objects.
   */
  self.toJSON = function exportPopulation() {
    var json = [];
    for (let i = 0; i < self.population.length; i++)
      json.push(self.population[i].toJSON());

    return json;
  };

  /**
   * Imports population from a json. Must be an array of networks converted to JSON objects.
   *
   * @param {object[]} json set of genomes (a population) represented as JSON objects.
  */
  self.fromJSON = function importPopulation(json) {
    var population = [];
    for (let i = 0; i < json.length; i++)
      population.push(Network.fromJSON(json[i]));
    self.population = population;
    self.popsize = population.length;
  };
}

module.exports = Neat;
