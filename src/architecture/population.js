const _ = require('lodash');
const Network = require('./network');
const methods = require('../methods/methods');
const config = require('../config');

/**
* Runs an evolutionary algorithm (currently NEAT) on a group of neural networks.
*
* @constructs Population
*
* @alpha
*
* @param {Object} options **Configuration Options**
* @param {number} [options.inputs=1] Input layer size of population networks.
* @param {number} [options.outputs=1] Output layer size of population networks.
* @param {number} [options.size=50] Amount of networks to initialize population with.
* ------ EVO-SUPERVISED LEARNING SETTINGS ----
* @param {Array<{inputs:number[],outputs:number[]}>} [options.dataset] Population dataset, used to do "supervised learning" when not setting fitnesses manually - _datasets passed to `population.evolve()` after constuction will take precedence_
* @param {cost} [options.cost=cost.MSE]  Only if dataset present. Used in conjuction with a dataset to calculate error and set fitnesses for networks automatically.
* @param {number} [options.clear=false] Only if dataset present. Clear context of networks' nodes, reverting them to 'new' neurons each generation. Useful for predicting timeseries with LSTM's.
* @param {number} [options.amount=1] Only if dataset present. Set amount of times to test trainingset on a genome each generation. Useful for timeseries. Do not use for regular feedfoward problems.
* @param {Function} [options.fitnessFn] Only if dataset present. Fitness function to evaluate networks. Takes (`dataset`, `genomes`) as arguments, genomes: a [network](Network) array. fitnessFn needs to set each network's `.fitness` property with a number.
* @param {boolean} [options.fitnessPopulation=false] Only if dataset present. A flag to indicate that fitnessFn is a population-level score. Set this to false to evaluate each genome inidividually.
* ------ EVOLUTIONARY MUTATION SETTINGS ----
* @param {mutation[]} [options.mutation] A set of allowed [mutation methods](mutation) for evolution. If unset a random mutation method from all possible mutation methods will be chosen when mutation occurs.
* @param {string} [options.selection=POWER] [Selection method](selection) for evolution (e.g. Selection.FITNESS_PROPORTIONATE).
* @param {number} [options.maxNodes=Infinity] Maximum nodes for a mutated network
* @param {number} [options.maxConns=Infinity] Maximum connections for a mutated network
* @param {number} [options.maxGates=Infinity] Maximum gates for a mutated network
* ------ POPULATION MANAGEMENT SETTINGS ----
* @param {number} [options.stagnationLimit=20] Maximum amount of generations population can go without improving before it is replaced entirely with children from top two species.
* @param {number} [options.speciesStagnationLimit=15] Maximum amount of generations species can go without improving before its members are not allowed to reproduce.
*
* @prop {number} generation A count of the generations, can be overwritten if desired
* @prop {Network[]} members The current population for the population instance. Accessible through `population.members`
* @protected {[Species[]]} species An array of population [Species](Species). Each Species has its own `.members` where the networks in the species are stored.
*
* @todo Remove very slow defaultsDeep
* @todo Add method to import networks that were evolved without id management, should work by initially setting ids of input & output nodes then traversing nodes array assigning node ids and corresponding connection ids sequentially while updating connIds and nodeIds.
*
* @example
* const { Population } = require("@liquid-carrot/carrot");
*
* // Creates a new population, generating networks automatically and handling ID management automatically
* let population = new Population({ inputs: 1, outputs: 1 }) // each network has one input and one output
*/
const Population = function(options) {
  const self = this;

  options = _.defaultsDeep(options, Population.default.options)

  // Internal prototype chain properties
  Object.assign(self, { 
    ...options, // options goes first so that any duplicate properties are overwritten by internal defaults
    species: [],
    stagnation: 0,
  });

  /**
   * Creates an array of networks, each network with a different set of weights, then returns it.
   *
   * @function getPopulation
   *
   * @alpha
   * 
   * @private
   *
   * @memberof Population
   *
   * @return {Network[]} Returns an array of networks. Must be assigned to Population.members if replacing current population.
   */
  self.getPopulation = function create_networks(options={}) {
    const population = []
    for (let i = 0; i < size; i++) {
      population.push(new Network(self.inputs, self.outputs, { connIds: self.connIds, nodeIds: self.nodeIds }));
    }

    return population
  };

  // Fill the members array on population construction
  self.members = self.getPopulation(self.size);

  /**
   * Applies the mutation-scheme dictated by Neat to the provided network.
   * 
   * Warning! Mutates argument directly.
   * 
   * @alpha
   * 
   * @function mutate
   * @memberof Population
   * 
   * @param {Network} network A network to add a node to (1% chance), add a new connection to (5% chance), and change have its weights changed (80% chance | 90% small change, 10% completely random) 
   * 
   * @return {Network} A network mutated by the Neat mutation spec.
   * 
   * @todo Remove hard-coded chance thresholds
   * @todo Consider making this a specialized mutate function: `neatMutate`
   */
  self.mutate = function (network, options={ neat: true }) {
    // Just do 1 random, if Math.random() is truly random then it should be equivalent to doing individual "Math.random()"s
    const random = Math.random()

    // 1% chance of new node
    if (random < 0.01) network = network.mutate(methods.mutation.ADD_NODE);

    // 5% chance of new connection (ADD_CONNECTION instead of: ADD_CONN)
    if (random < 0.05) network = network.mutate(methods.mutation.ADD_CONNECTION);

    // Helper function, mutates connection weights
    const mutateConn = function(conn) {
      // 90% chance slight change | 10% chance new random value
      conn.weight = (random < .9) ? conn.weight + Math.random() : Math.random()

      return conn
    }

    // 80% chance of mutating all the weights
    if (random < 0.8) network.connections = network.connections.map(conn => mutateConn(conn))

    return network;
  }

  /**
   * Evaluates, selects, breeds and mutates population.
   * 
   * Warning! Replaces `.members` directly and increases `.generation` by 1.
   *
   * @alpha
   * 
   * @function evolve
   * @memberof Population
   *
   * @param {object} options
   * 
   * @return {network[]} An evolved population
   * 
   * @todo Reintroduce mutation flexibility
   * @todo Add speciation code
   * @todo Add compatabilityDistance method, part of speciation section
   * @todo Add createOffspring code
   */
  self.evolve = async function(options={}) {

    /**
     * ToDo Section
     * // Break population members into their respective species
     * self.species = self.speciate(self.species);
     */ 
    
    // Mutates ".members" directly. Expected behavior
    self.members = self.members.map(network => self.mutate(network))

    // Increase the generation count, again expected behavior
    self.generation++

    return self.members
  };

  /**
   * Gets a genome for crossover.
   *
   * @alpha
   * 
   * @function getParent
   * @memberof Population
   *
   * @return {Network} Selected genome for offspring generation
   */
  self.getParent = function get_genome_using_selection_method() {
    // Return a random genome
    return self.members[Math.random() * self.members.length];
  };

  /**
   * Places population members into their corresponding species.
   * 
   * @alpha
   * 
   * @function speciate
   * @memberof Population
   * 
   * @return {void}
   */
  self.speciate = function (speciesArray) {}

  /**
   * Selects two genomes from the population with `getParent()`, and returns the offspring from those parents.
   *
   * @alpha
   * 
   * @function getOffspring
   * @memberof Population
   *
   * @return {Network} Child network
   * 
   * @todo Ensure parent1 & parent2 aren't exactly the same parent
   * @todo Consider decoupling parent selection from getOffspring
   */
  self.getOffspring = function() {
    const parent1 = self.getParent();
    const parent2 = self.getParent();

    // Note: in (unlikely) scenario parents are equally fit, parent2 is "fitter" by default.
    return parent1.score > parent2.score ? parent1.createOffspring(parent2) : parent2.createOffspring(parent1)
  };


  /**
   * Sorts the population by score.
   * 
   * Warning! Mutates argument directly.
   *
   * @alpha
   * 
   * @function sort
   * @memberof Population
   * 
   * @param {network[]} A population to sort
   *
   * @return {void}
   */
  self.sort = function sort_population_by_fitness(networks) {
    return networks.sort(function (a, b) { return b.score - a.score; });
  };

  /**
   * Returns the fittest genome of the provided population.
   * 
   * Warning! Mutates argument directly.
   *
   * @alpha
   * 
   * @expects Members to be an array of networks.
   * @expects Networks in members array to have `.fitness` numbers set.
   * 
   * @function getFittest
   * @memberof Population
   *
   * @return {Network} Current population's fittest genome
   * 
   * @example
   * // Returns fittest member
   * population.getFittest(population.members);
  */
  self.getFittest = function get_fittest_population_genome(members) {
    if (members[0].fitness < members[1].fitness) { 
      members = self.sort(members); // in-place mutation, not ideal
    }

    return members[0];
  };


  /**
   * Returns the average fitness of the current population.
   *
   * @alpha
   * 
   * @expects Networks in population.members to have `.fitness` numbers set.
   * 
   * @function getAverage
   * @memberof Population
   * 
   * @return {number} Average fitness of the current population
   */
  self.getAverage = function get_average_population_fitness() {
    let average = 0;
    for (let i = 0; i < self.members.length; i++) {
      average += self.members[i].fitness;
    }

    return average / self.members.length;
  };
}

Population.default = {
  options: {
    inputs: 1,
    outputs: 1,
    size: 50,
    dataset: [],
    cost: methods.cost.MSE,
    clear: false,
    amount: 1,
    fitnessFn: function(set = dataset, genome, amount = 1, cost = methods.cost.MSE, growth = 0.0001) {
      let score = 0;
      for (let i = 0; i < amount; i++) score -= genome.test(set, cost).error;

      score -= (genome.nodes.length - genome.input - genome.output + genome.connections.length + genome.gates.length) * growth;
      score = isNaN(score) ? -Infinity : score; // this can cause problems with fitness proportionate selection

      return score / amount;
    },
    fitnessPopulation: false,
    mutation: methods.mutation.NEATSTANDARD,
    selection: methods.selection.POWER,
    maxNodes: Infinity,
    maxConns: Infinity,
    maxGates: Infinity,
    generation: 0,
    // internal id management variables
    nodeIds: { last: 0 },
    connIds: { last: 0 },
  }
}

module.exports = Population;
