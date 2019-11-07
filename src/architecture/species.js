const Network = require('./architecture/network');
const methods = require('./methods/methods');
const config = require('./config');
const _ = require('../util/util')

/**
* Creates a new Species
*
* @constructs Species
*
* @param { Network } genome The first network to add to the species' members array
* @param {object} options
* @param {number} options.excessCoeff
* @param {number} options.disjointCoeff
* @param {number} options.weightsCoeff
*
* @prop { Network[] } members An array of species member networks / genomes
* @prop { Network } bestGenome The best network, by fitness, in the species
* @prop { number } bestFitness The fitness of the best network in the species
* @prop { number } averageFitness The average fitness of the networks in the species
* @prop { number } staleCount The amount of generations since last improved, used to kill species
* @prop { Network } representative The network / genome that best represents the species
*
* @todo Add staleness management
*
* @example
* const {
*   Network,
*   Species
* } = require("@liquid-carrot/carrot");
*
* const myNetwork = new Network(1,1)
* const mySpecies = new Species(myNetwork)
*
* console.log(mySpecies.members) // [ myNetwork ]
*/
const Species = function(genome, options) {
  const self = this;

  // NEAT designated props
  self.members = [];
  self.members.push(genome.clone()); // Genome required at creation
  self.representative = genome.clone(); // Genome is representative by default
  self.stagnation = 0; // Generation count without improvement

  // Adjustable props - compatibility
  self.coefficient = options.coefficient || [1,1,0.4];
  self.threshold = 3;

  // Species metadata
  self.fittest = genome.clone();
  self.bestFitness = 0;
  self.averageFitness = 0;

  /**
   * Calculates genomic distance.
   *
   * Used to calculate whether a genome is compatibile with the species.
   *
   * @function getDistance
   * @memberof Species
   *
   * @param {Network[]} genomes Array containing two genomes
   * @param {object} options
   * @param {number[]} options.coefficient An array of coefficients for excess, disjoint, and matching gene weight distance sum
   * @param {number} options.threshold The minimum node size required to use a normalization factor in genomic distance
   *
   * @return {number} A genomic disntance between genomes
   */
  self.getDistance = function (genomes, options) {
    // Distance formula coefficients | original NEAT Paper species distance expression
    // Weights for: excess, disjoint, and average matching gene weight distance | original NEAT paper
    const coefficient = options.coefficient || [1,1,0.4];
    const threshold = options.threshold || 20;

    // Checks latest innovation number in each genome to determine which is the larger genome
    // Assumes genes / connection innovation numbers are sequential | as specified in original NEAT paper
    let small, big;
    const genome = genomes[0].connections;
    const genome1 = genomes[1].connections;
    if (genome[genome.length - 1].id > genome1[genome1.length - 1].id) {
      big = genome;
      small = genome1;
    } else {
      big = genome1;
      small = genome;
    }

    let smallIndex = small.length - 1;
    let bigIndex = big.length - 1;

    // Track genomic/network/graph/topology distance formula variables
    let excess = disjointed = matching = deltaWeight = 0;
    let finishedExcess = false;
    const nodes = (big.length > threshold) ? big.length : 1;

    // Walk genes backwards to determine excess & disjoint genes
    while (bigIndex > -1 && smallIndex > -1) {
      // Matching genes
      if (small[smallIndex].id === big[bigIndex].id) {
        if(!finishedExcess) finishedExcess = true; // If we have matching genes, then we're done with excess

        deltaWeight += Math.abs(big[bigIndex].weight - small[smallIndex].weight); // Only calculates deltaWeights on mathching genes | original NEAT paper

        matching++ // increase matching count

        smallIndex--; bigIndex--; continue;
      }
      // Larger's latest gene is older than smaller's
      if (big[bigIndex].id > small[smallIndex].id) {
        if(!finishedExcess) excess = ++excess; // if we haven't finished the excess genes, it's an excess gene
        else disjointed = ++disjointed; // otherwise it's a disjoint gene

        bigIndex--; continue;
      }
      // Smaller's latest gene is older than larger
      else if (small[smallIndex].id > big[bigIndex].id) {
        if(!finishedExcess) finishedExcess = true; // Smaller can't be excess, hence we're done with excess

        disjointed = ++disjointed; // by default, later gene in smaller is disjoint

        smallIndex--; continue;
      }
      // We're done, although, maybe unreachable
      else break;
    }

    deltaWeight /= matching;

    // D(N1,N2) = (c1 * E / N) + (c2 * D / N) * (c3 * ΔW)
    // Genomic distance < compatibility threshold
    return (coefficient[0] * excess / nodes) + (coefficient[1] * disjointed / nodes) + (coefficient[2] * deltaWeight);
  };

  /**
  * Returns whether a genome is compatible with the species or not
  *
  * @expects As per original NEAT expects first genome to be species representative
  *
  * @param {Network[]} An array of genomes to determine compatibility with (currently assumes two)
  * @return {boolean} Whether a genome is compatible with the species
  */
  self.isCompatible = function determine_compatability_with_species (genomes, options) {
    const threshold = options.threshold || self.threshold; // fallback to constructor args
    return (self.getDistance(genomes[0], genomes[1]) < threshold)
  }

  /**
  * Adds a genome to the species.
  *
  * @expects Genome to be compatibile with the species
  *
  * @param {Network} genome Network requesting to be added to the species
  * @return {null}
  */
  self.addMember = function (genome, options) {
    this.members.push(genome);
  }

  /**
  * Creates child from a pair of parent/source networks
  *
  * @expects Genomes ordered in ascending order from earliest to latest connections - i.e. `genome[0]` (earliest); `genome[genome.length - 1]` (latest)
  *
  * @param {Network[]} genomes An array of genomes to create a child from (currently limited to 2)
  * @return {Connection[]} An array of child genes to create a child from
  *
  * @feature Amorphous network crossover - i.e. can crossover/merge/stitch networks with wierd/awkward shapes
  * @feature Non-matching networking crossover - i.e. can create a child network from source networks with different shapes
  *
  * @todo Consider making crossover a Network concern
  * @todo Consider crossover for more than 2 parents
  * @todo Construct a new network using the created connection array
  */
  self.crossover = function crossover(genomes) {
    // Tracks the parent/source network with the latest genomic changes (i.e. connections)
    let small, big, child = [];
    const genome = genomes[0].connections;
    const genome1 = genomes[1].connections;

    // Checks latest innovation number in each genome to determine which is the larger genome
    // Assumes genes / connection innovation numbers are sequential | as specified in original NEAT paper
    if (genome[genome.length - 1].id > genome1[genome1.length - 1].id) {
      big = genome;
      small = genome1;
    } else {
      big = genome1;
      small = genome;
    }

    let smallIndex = small.length - 1;
    let bigIndex = big.length - 1;

    // Walk genes backwards to determine excess & disjoint genes
    while (bigIndex > -1 && smallIndex > -1) {
      // Matching, sample a gene
      if (small[smallIndex].id === big[bigIndex].id) {
        child.unshift(_.sample([small[smallIndex], big[bigIndex]])); // Add winning gene to child

        smallIndex--; bigIndex--; continue;
      }
      // Disjoint, Big Parent's gene selected
      if (big[bigIndex].id > small[smallIndex].id) {
        child.unshift(big[bigIndex]);

        bigIndex--; continue;
      }
      // Disjoint, Small Parent's gene selected
      else if (small[smallIndex].id > big[bigIndex].id) {
        child.unshift(small[smallIndex]);

        smallIndex--; continue;
      }
      else break;
    }

    return child;
  }

  /**
  * Selects a parent for crossover
  *
  * @return {Network} Selected parent for crossover
  */
  self.getParent = function select_parent_for_crossover () {
    return _.sample(self.members)
  }

  /**
   * Selects two genomes from the population with `getParent()`, and returns the offspring from those parents. NOTE: Population MUST be sorted
   *
   * @function getChild
   * @memberof Species
   *
   * @return {Network} Child network
   *
   * @todo Consider making this a Network concern again
   */
  self.getChild = function () {
    const parent1 = self.getParent();
    const parent2 = self.getParent();

    // return Network.crossOver(parent1, parent2, self.equal); // Network concern crossOver
    return self.crossover([parent1, parent2])
  };

  /**
   * Sorts the population by score. Warning! Mutates the population directly
   *
   * @function sort
   * @memberof Species
   *
   * @param {network[]} A population to sort
   * @return {undefined}
   */
  self.sort = function sort_species_by_fitness (population) {
    population = Array.isArray(population) && population.length ? population : self.population

    population.sort(function (a, b) {
      return b.score - a.score;
    });
  };

  /**
  * Returns members with lower fitness genomes removed
  * Note: Assumes members are sorted by fitness
  *
  * @function sift
  * @memberof Species
  *
  * @param {number} threshold Integer between [0,1] that determines what percentage of members are removed
  * @return {Network[]} A members array without lower fitness genomes
  */
  self.sift = function remove_worst_members (threshold) {
    return self.members.slice(0, Math.ceil(self.members.length * threshold))
  }

  /**
  * Async function. Updates the shared fitness for individuals in the species.
  *
  * Note: Takes the following comment in the Neat paper literally --
  * "Thus, (the divisor in shared fitness) reduces to the
  * number of organisms in the same species as organism i.
  * This reduction is natural since species are already clustered
  * by compatibility using the threshold δt"
  *
  * @expects Species members to have a .fitness property
  *
  * @return {null}
  */
  self.updateSharedFitness = async function () {};

  /**
  * Sync function. Updates the shared fitness for individuals in the species.
  *
  * Note: Takes the following comment in the Neat paper literally --
  * "Thus, (the divisor in shared fitness) reduces to the
  * number of organisms in the same species as organism i.
  * This reduction is natural since species are already clustered
  * by compatibility using the threshold δt"
  *
  * @expects Species members to have a .fitness property
  *
  * @return {null}
  */
  self.updateSharedFitnessSync = function () {
    for (let i = 0; i < this.members.length; i++) {
      this.members[i].adjustedFitness = this.members[i].fitness / this.members.length;
    }
  };

  /**
   * Returns the fittest genome of the current population
   *
   * @function getFittest
   * @memberof Species
   *
   * @return {Network} Species' current fittest genome
  */
  self.getFittest = function get_fittest_species_genome  () {
    return self.fittest
  };

  /**
   * Returns the average fitness of the current population
   *
   * @function getAverage
   * @memberof Species
   *
   * @return {number} Average fitness of the current population
   */
  self.getAverage = function get_average_population_fitness () {};

  /**
   * Export the current population to a JSON object
   *
   * Can be used later with `fromJSON(json)` to reload the population
   *
   * @function toJSON
   * @memberof Species
   *
   * @return {object[]} A set of genomes (a population) represented as JSON objects.
   */
  self.toJSON = function export_to_json () {};

  /**
   * Imports population from a json. Must be an array of networks converted to JSON objects.
   *
   * @function fromJSON
   * @memberof Species
   *
   * @param {object[]} json set of genomes (a population) represented as JSON objects.
  */
  self.fromJSON = function import_from_json (json) {};
};

module.exports = Species;
