var Network = require('./architecture/network');
var methods = require('./methods/methods');
var config = require('./config');

// Easier variable naming
var selection = methods.selection;

/**
* Runs the NEAT algorithm on group of neural networks.
*
* @constructs NEAT
*
* @param {number} input - The input size of the networks.
* @param {number} output - The output size of the networks
* @param {Array<{input:number[],output:number[]}>} [dataset] A set of input values and ideal output values to evaluate a genome's fitness with. Must be included to use `NEAT.evaluate`
* @param {Object} options - Configuration options
* @param {boolean} [options.equal=false] When true [crossover](Network.crossOver) parent genomes are assumed to be equally fit and offspring are built with a random amount of neurons within the range of parents' number of neurons. Set to false to select the "fittest" parent as the neuron amount template.
* @param {number} [options.clear=false] Clear the context of the population's nodes, basically reverting them to 'new' neurons. Useful for predicting timeseries with LSTM's.
* @param {number} [options.popsize=50] Population size of each generation.
* @param {number} [options.elitism=1] Elitism of every evolution loop. [Elitism in genetic algortihtms.](https://www.researchgate.net/post/What_is_meant_by_the_term_Elitism_in_the_Genetic_Algorithm)
* @param {number} [options.provenance=0] Number of genomes inserted the original network template (Network(input,output)) per evolution.
* @param {number} [options.mutationRate=0] Sets the mutation rate. If set to 0.3, 30% of the new population will be mutated. Default is 0.3.
* @param {number} [options.mutationAmount=1] If mutation occurs (randomNumber < mutationRate), sets amount of times a mutation method will be applied to the network.
* @param {boolean} [options.fitnessPopulation=false] Flag to return the fitness of a population of genomes. Set this to false to evaluate each genome inidividually.
* @param {Function} [options.fitness] - A fitness function to evaluate the networks. Takes a `genome`, i.e. a [network](Network), and a `dataset` and sets the genome's score property
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
*   popsize: 1000,
*   efficientMutation: true
* });
*/
function Neat (input, output, dataset, options) {
  this.input = input; // The input size of the networks
  this.output = output; // The output size of the networks

  // Configure options
  options = options || {};
  this.equal = options.equal || true;
  this.clear = options.clear || false;
  this.popsize = options.popsize || 50;
  this.elitism = options.elitism || 1;
  this.provenance = options.provenance || 0;
  this.mutationRate = options.mutationRate || 0.4;
  this.mutationAmount = options.mutationAmount || 1;

  this.fitnessPopulation = options.fitnessPopulation || false;

  this.selection = options.selection || methods.selection.POWER;
  this.crossover = options.crossover || [
    methods.crossover.SINGLE_POINT,
    methods.crossover.TWO_POINT,
    methods.crossover.UNIFORM,
    methods.crossover.AVERAGE
  ];
  this.mutation = options.mutation || methods.mutation.FFW;
  this.efficientMutation = options.efficientMutation || false;

  this.template = options.network || (new Network(this.input, this.output));

  this.maxNodes = options.maxNodes || Infinity;
  this.maxConns = options.maxConns || Infinity;
  this.maxGates = options.maxGates || Infinity;

  // Custom mutation selection function if given
  this.selectMutationMethod = typeof options.mutationSelection === 'function' ? options.mutationSelection.bind(this) : this.selectMutationMethod;

  // Generation counter
  this.generation = 0;
  
  // Fitness function options
  fitnessFunction = function (genome, dataset) {
    let score = 0;
    
    for (var i = 0; i < dataset.length; i++) {
      score -= genome[i].test(dataset).error;
    }
  
    score -= (genome.nodes.length - genome.input - genome.output + genome.connections.length + genome.gates.length) * 0.0001;
    score = isNaN(score) ? -Infinity : score; // this can cause problems with fitness proportionate selection
  
    return score / amount;
  };
  this.fitness = options.fitness || fitnessFunction; // The fitness function to evaluate the networks

  // Initialise the genomes
  this.createPool(this.template);
}

/*
* @namespace NEAT
*/
Neat.prototype = {
  // A collection of utility functions to be used with Neat.
  util: {
    /*
     * Used to select and modify genomes as determined by the `pickGenome` function.
     *
     * @param {Network[]} population A population to filter
     * @param {Network} template A network template to replace picked genomes if `adjustGenome` is left unset.
     * @param {function} pickGenome A predicate function to mark genomes for adjustment. Accepts a network as a parameter and returns true for selection.
     * @param {function} adjustGenome Accepts a network, modifies it, and returns it. Used to modify unwanted genomes returned by `pickGenome` and reincorporate them into the population. If left unset, picked genomes will be replaced with the template Network.
     *
     * @returns {Network[]} A new filtered population
     */
    filterGenome: function(population, template, pickGenome, adjustGenome) {
      let filtered = [...population]; // avoid mutations
      const pick = function(genome) {
        const pick = pickGenome(genome)
        if (typeof pick !== "boolean") throw new Error("pickGenome must always return a boolean!")
        return pick
      }
      
      if(adjustGenome){
        for (let i = 0; i < population.length; i++) {
          if(pick(filtered[i])) {
            const result = adjustGenome(filtered[i])
            if (!(result instanceof Network)) throw new Error("adjustGenome must always return a network!")
            filtered[i] = result
          }
        }
      } else
          for (let i = 0; i < population.length; i++)
            if(pick(filtered[i])) filtered[i] = Network.fromJSON(template.toJSON)
    
      return filtered;
    },
  },
  /**
   * Create a pool of identical genomes.
   *
   * @param {Network} network An initial network to evolve from
   */
  createPool: function (network) {
    this.population = [];

    for (var i = 0; i < this.popsize; i++) {
      var copy = Network.fromJSON(network.toJSON());
      copy.score = undefined;
      this.population.push(copy);
    }
  },

  /**
   * Evaluates, selects, breeds and mutates population.
   *
   * @param {function} [pickGenome] A custom selection function to pick out unwanted genomes. Accepts a network as a parameter and returns true for selection.
   * @param {function} [adjustGenome=this.template] Accepts a network, modifies it, and returns it. Used to modify unwanted genomes returned by `pickGenome` and reincorporate them into the population. If left unset, unwanted genomes will be replaced with the template Network. Will only run when pickGenome is defined.
   * @returns {Network} Fittest network
   *
   * @example
   * let neat = new Neat(4, 1, dataset, {
   *  elitism: 10,
   *  clear: true,
   *  popsize: 1000,
   *  efficientMutation: true
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
   * neat.evolve(filter, adjust).then(function(fittest) {
   *  console.log(fittest)
   * })
  */
  evolve: async function (pickGenome, adjustGenome) {
    if(this.elitism + this.provenance > this.popsize) throw new Error("Can't evolve! Elitism + provenance exceeds population size!");
    
    // Assign fitness score(s) to the population if needed
    if (typeof this.population[this.population.length - 1].score === 'undefined') await this.evaluate()
    
    // Check & adjust genomes as needed
    if(pickGenome) this.population = filterGenome(this.population, this.template, pickGenome, adjustGenome)
    
    // Sort in order of fitness (fittest first)
    this.sort();
    var fittest = Network.fromJSON(this.population[0].toJSON());
    fittest.score = this.population[0].score;

    var newPopulation = [];

    // Elitism
    var elitists = [];
    for (var i = 0; i < this.elitism; i++) {
      elitists.push(this.population[i]);
    }

    // Provenance
    for (i = 0; i < this.provenance; i++) {
      newPopulation.push(Network.fromJSON(this.template.toJSON()));
    }
    
    // Breed the next individuals
    for (i = 0; i < this.popsize - this.elitism - this.provenance; i++) {
      newPopulation.push(this.getOffspring());
    }

    // Replace the old population with the new population
    this.population = newPopulation;
    this.mutate();

    this.population.push(...elitists);
    
    if(pickGenome) this.population = filterGenome(this.population, this.template, pickGenome, adjustGenome)

    // Reset the scores
    for (i = 0; i < this.population.length; i++) {
      this.population[i].score = undefined;
    }

    this.generation++;

    return fittest;
  },

  /**
   * Selects two genomes from the population with `getParent()`, and returns the offspring from those parents. NOTE: Population MUST be sorted
   *
   * @returns {Network} Child network
   */
  getOffspring: function () {
    var parent1 = this.getParent();
    var parent2 = this.getParent();

    return Network.crossOver(parent1, parent2, this.equal);
  },

  /**
   * Selects a random mutation method for a genome according to the parameters
   * @param {Network} genome
  */
  selectMutationMethod: function (genome) {
    var mutation = this.efficientMutation ? genome.getPossibleMutations(this.mutation) : this.mutation;

    var mutationMethod = mutation[Math.floor(Math.random() * mutation.length)];

    if (mutationMethod === methods.mutation.ADD_NODE && genome.nodes.length >= this.maxNodes) {
      if (config.warnings) console.warn('maxNodes exceeded!');
      return null;
    }

    if (mutationMethod === methods.mutation.ADD_CONN && genome.connections.length >= this.maxConns) {
      if (config.warnings) console.warn('maxConns exceeded!');
      return null;
    }

    if (mutationMethod === methods.mutation.ADD_GATE && genome.gates.length >= this.maxGates) {
      if (config.warnings) console.warn('maxGates exceeded!');
      return null;
    }

    return mutationMethod;
  },

  /**
   * Mutates the given (or current) population
   */
  mutate: function () {
    // Elitist genomes should not be included
    for (var i = 0; i < this.population.length; i++) {
      if (Math.random() <= this.mutationRate) {
        for (var j = 0; j < this.mutationAmount; j++) {
          var mutationMethod = this.selectMutationMethod(this.population[i]);
          this.population[i].mutate(mutationMethod);
        }
      }
    }
  },

  /**
   * Sets fitness scores for the current population members.
   */
  evaluate: async function () {
    if(!this.dataset) {
      throw new Error("You must include a dataset to use NEAT.evaluate()")
    }
    var i;
    if (this.fitnessPopulation) {
      if (this.clear) {
        for (i = 0; i < this.population.length; i++) {
          this.population[i].clear();
        }
      }
      await this.fitness(this.population, this.dataset);
    } else {
      for (i = 0; i < this.population.length; i++) {
        var genome = this.population[i];
        if (this.clear) genome.clear();
        genome.score = await this.fitness(genome, this.dataset);
      }
    }
  },

  /**
   * Sorts the population by fitness
   */
  sort: function () {
    this.population.sort(function (a, b) {
      return b.score - a.score;
    });
  },

  /**
   * Returns the fittest genome of the current population
   *
   * @returns {Network} Current population's fittest genome
  */
  getFittest: function () {
    // Check if evaluated
    if (typeof this.population[this.population.length - 1].score === 'undefined') {
      this.evaluate();
    }
    if (this.population[0].score < this.population[1].score) {
      this.sort();
    }

    return this.population[0];
  },

  /**
   * Returns the average fitness of the current population
   *
   * @returns {number} Average fitness of the current population
   */
  getAverage: function () {
    if (typeof this.population[this.population.length - 1].score === 'undefined') {
      this.evaluate();
    }

    var score = 0;
    for (var i = 0; i < this.population.length; i++) {
      score += this.population[i].score;
    }

    return score / this.population.length;
  },

  /**
   * Returns a genome for recombination (crossover) based on one of the [selection methods](selection) provided.
   *
   * Should be called after `evaluate()`
   *
   * @return {Network} Selected genome for offspring generation
   */
  getParent: function () {
    var i;
    switch (this.selection) {
      case selection.POWER:
        if (this.population[0].score < this.population[1].score) this.sort(); // SHOULD FIX: Not guaranteed to detect an unsorted population

        var index = Math.floor(Math.pow(Math.random(), this.selection.power) * this.population.length);
        return this.population[index];
      case selection.FITNESS_PROPORTIONATE:
        // As negative fitnesses are possible
        // https://stackoverflow.com/questions/16186686/genetic-algorithm-handling-negative-fitness-values
        // this is unnecessarily run for every individual, should be changed

        var totalFitness = 0;
        var minimalFitness = 0;
        for (i = 0; i < this.population.length; i++) {
          var score = this.population[i].score;
          minimalFitness = score < minimalFitness ? score : minimalFitness;
          totalFitness += score;
        }

        minimalFitness = Math.abs(minimalFitness);
        totalFitness += minimalFitness * this.population.length;

        var random = Math.random() * totalFitness;
        var value = 0;

        for (i = 0; i < this.population.length; i++) {
          let genome = this.population[i];
          value += genome.score + minimalFitness;
          if (random < value) return genome;
        }

        // if all scores equal, return random genome
        return this.population[Math.floor(Math.random() * this.population.length)];
      case selection.TOURNAMENT:
        if (this.selection.size > this.popsize) {
          throw new Error('Your tournament size should be lower than the population size, please change methods.selection.TOURNAMENT.size');
        }

        // Create a tournament
        var individuals = [];
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

  /**
   * Export the current population to a JSON object
   *
   * Can be used later with `import(json)` to reload the population
   *
   * @return {object[]} A set of genomes (a population) represented as JSON objects.
   */
  export: function () {
    var json = [];
    for (var i = 0; i < this.population.length; i++) {
      var genome = this.population[i];
      json.push(genome.toJSON());
    }

    return json;
  },

  /**
   * Imports population from a json. Must be an array of networks converted to JSON objects.
   *
   * @param {object[]} json set of genomes (a population) represented as JSON objects.
  */
  import: function (json) {
    var population = [];
    for (var i = 0; i < json.length; i++) {
      var genome = json[i];
      population.push(Network.fromJSON(genome));
    }
    this.population = population;
    this.popsize = population.length;
  }
};

module.exports = Neat;
