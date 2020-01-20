const Network = require('./network');
const methods = require('../methods/methods');
const config = require('../config');
const util = require('../util/utils')

/**
* Creates a new Species
*
* @constructs Species
*
* @param { Network } founder The first network to add to the species' members array
* @param {object} config
* @param {number[]} config.weights An array of weights for calculating compatability (distance) with the species. From NEAT paper.
*
* @prop { Network[] } members An array of species member networks / founders
* @prop { Network } bestfounder The best network, by fitness, in the species
* @prop { number } allTimeBest The best fitness ever in the species
* @prop { number } averageFitness The average fitness of the networks in the species
* @prop { number } stagnation The amount of generations since last improved, used to kill species
* @prop { Network } representative The network / founder that best represents the species
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
const Species = function(founder, config={}) {
  const self = this;

  // Avoid copying over original founder repeatedly
  self.founder = founder.clone()

  // NEAT designated props
  self.members = [];
  self.members.push(self.founder);
  self.champion = self.founder; // founder is the best genome. AKA "champion" in NEAT literature.
  self.stagnation = 0; // Generation count without improvement
  self.representative = self.founder; // founder is "representative" by default

  // Species metadata
  self.greatest = founder; // Greatest of all time, distinct from best / champion, used for species stagnation management
  self.generation = config.gen || -1; // Generation that this species was created
  self.bestFitness = founder.fitness;
  self.averageFitness = founder.fitness; // average fitness at first is just founder fitness

  // Adjustable props - compatibility
  self.weights = config.weights || [1,1,0.4];
  self.threshold = config.threshold || 3; // Threshold for determining whether or not a genome is compatible with the species


  /**
   * Calculates genomic distance.
   *
   * Used to calculate whether a genome is compatibile with the species. Sorts genome connection ids in ascending order.
   * @alpha
   * 
   * @expects Genomes connection ids to be in ascending order i.e. genome.connections = [{ ..., id: 1 }, { ..., id: 2 }, { ..., id: 3 }]
   * 
   * @function getDistance
   * @memberof Species
   *
   * @param {Network[]} genomes Array containing two genomes
   * @param {object} config
   * @param {number[]} config.weights An array of weights for excess, disjoint, and matching gene connection-weight distance sum
   * @param {number} config.normalizer The minimum node size required to use a normalization factor in genomic distance
   *
   * @return {number} A genomic disntance between genomes
   * 
   * @todo Consider simplifying by treating excess and disjoint genes equivalently
   * @todo Consider porting this to Rust + WASM
   */
  self.getDistance = function (genomes, config={}) {
    console.log("NEW GET DISTANCE")
    // Rename for increased legibility
    let conns = genomes[0].connections;
    let conns1 = genomes[1].connections;

    // Sort connection ids
    conns = util.sortObjects(conns, "id", true); // worst time-complexity O(n log n)
    conns1 = util.sortObjects(conns1, "id", true);

    const log = function (conns) {
      const seen = new Set();
      const references = new Set();
      for(let i = 0; i < conns.length; i++) {
        const conn = conns[i];
        
        // duplicate connection id
        if(seen.has(conn.id)) {
          console.log(`
            Previous from id: ${conns[i-1].from.id}
            Previous to id: ${conns[i-1].to.id}
            From node id: ${conn.from.id}
            To node id: ${conn.to.id}
            Connection enabled: ${conn.enabled}
            Connection reference already exists? ${references.has(conn)}
            From nodes same reference? ${conn.from === conns[i-1].from}
            From nodes same reference? ${conn.to === conns[i-1].to}
          `)
        }

        seen.add(conn.id)
        references.add(conn)
      }
    }

    log(conns);
    log(conns1);

    const weights = config.weights || [1,1,0.4];
    const normalizer = config.normalizer || 20;

    // Checks last innovation number in each genome to determine which is largest
    let small, big;
    if (conns[conns.length - 1].id > conns1[conns1.length - 1].id) {
      big = conns; small = conns1;
    } else {
      big = conns1; small = conns;
    }
    let smallIndex = small.length - 1;
    let bigIndex = big.length - 1;

    // Track distance formula variables
    let excess = disjoint = matching = deltaWeight = 0;

    // Normalizing factor for networks larger than the normalizer size, used to avoid crazy values
    const nodes = (big.length > normalizer) ? big.length : 1;

    let finishedExcess = false;

    // Walk genes backwards to determine excess & disjoint genes
    while (bigIndex > -1 && smallIndex > -1) {
      // Rename selected connection / gene for legitbility 
      const littleID = small[smallIndex].id;
      const bigID = big[bigIndex].id;

      // Matching genes
      if (littleID === bigID) {
        if(!finishedExcess) finishedExcess = true; // If we have matching genes, then we're done with excess

        // Calculate weight differences of matching genes | NEAT spec
        deltaWeight += Math.abs(big[bigIndex].weight - small[smallIndex].weight);
        matching++ // increase matching count

        smallIndex--; bigIndex--; continue;
      }

      // Excess or disjoint gene in bigger network
      if (bigID > littleID) {

        // if not done with excess, it's excess
        if(!finishedExcess) excess = ++excess;
        else disjoint = ++disjoint; // otherwise, disjoint

        bigIndex--; continue;
      }

      // Disjoint gene in smaller network
      else if (littleID > bigID) {
        if(!finishedExcess) finishedExcess = true; // Smaller can't be excess, hence we're done with excess

        disjoint = ++disjoint; // by default, later gene in smaller is disjoint

        smallIndex--; continue;
      }

      // We're done, although, maybe unreachable
      else break;
    }

    deltaWeight /= matching;

    // D(N1,N2) = (c1 * E / N) + (c2 * D / N) * (c3 * ΔW)
    return (weights[0] * excess / nodes) + (weights[1] * disjoint / nodes) + (weights[2] * deltaWeight);
  };

  /**
  * Returns whether a genome is compatible with the species or not
  *
  * @expects As per original NEAT expects first genome to be species representative
  *
  * @param {Network[]} An array of genomes to determine compatibility with (currently assumes two)
  * @return {boolean} Whether a genome is compatible with the species
  */
  self.isCompatible = function determine_compatability_with_species (genomes, config={}) {
    const threshold = config.threshold || self.threshold; // fallback to constructor args
     // Genomic distance < compatibility threshold
    return (self.getDistance([genomes[0], genomes[1]]) < threshold)
  }

  /**
  * Adds a genome to the species.
  *
  * @expects Genome to be compatibile with the species
  *
  * @param {Network} genome Network requesting to be added to the species
  * @return {null}
  */
  self.addMember = function (genome, config={}) {
    this.members.push(genome);
  }

  /**
  * Selects a parent for crossover
  *
  * @return {Network} Selected parent for crossover
  */
  self.getParent = function select_parent_for_crossover () {
    return util.sample(self.members)
  }

  /**
   * Selects two genomes from the population with `getParent()`, and returns the offspring from those parents.
   *
   * @function getChild
   * @memberof Species
   *
   * @return {Network} Child network
   */
  self.getChild = function () {
    const net1 = self.getParent();
    const net2 = self.getParent();

    // Note: in (unlikely) scenario parents are equally fit, net2 is "fitter" by default.
    return net1.fitness > net2.fitness ? net1.createOffspring(net2) : net2.createOffspring(net1)
  };

  /**
  * Returns members with lower fitness genomes removed. If there are less than 2 genomes, just returns the members as-is
  * 
  * @expects Members sorted in descending fitness
  *
  * @function sift
  * @memberof Species
  *
  * @param {Network[]} members An array of species members to remove lower half of 
  * @param {number} threshold Number between [0,1] that determines what percentage of members survive. Higher numbers mean more survive.
  * 
  * @return {Network[]} A members array without lower fitness genomes
  * 
  * @todo Add test for edge case with 1 member
  */
  self.sift = function remove_worst_members (members, threshold) {
    return (members.length > 2) ? members.slice(0, Math.ceil(members.length * threshold)) : members;
  }

  /**
   * Sets fittest genome of the current population and the species-level bestFitness property
   *
   * @function getBest
   * @memberof Species
   *
   * @param {Network} best Best species member of the current generation
   * 
   * @return {Network} Species' current fittest genome
  */
  self.setBest = function update_species_best (genome) {
    self.bestFitness = genome.fitness;
    return self.best = genome;
  }

  /**
   * Returns the fittest genome of the current population
   *
   * @function getBest
   * @memberof Species
   *
   * @return {Network} Species' current fittest genome
  */
  self.getBest = function get_fittest_species_genome  () {
    return self.best;
  };

  /**
   * Sets the best fitness of all time and stores the genome that got it in species.greatest
   * 
   * @expects Best fitness to be validated externally
   * 
   * @param {Network} genome Genome with best fitness of all time
   * 
   * @return {Network} Best genome of all time in species
   */
  self.setGOAT = function set_best_of_all_time (genome) {
    self.bestAllTimeFitness = genome.fitness;
    return self.greatest = genome;
  }

  /**
   * Increment species stagnation count
   *
   * @function incrementStagnation
   * @memberof Species
   *
   * @param {number} amount Amount to increment stagnation count by
   * 
   * @return {number} Species stagnation count
  */
  self.increaseStagnation = function(amount = 1) {
    return self.stagnation += amount;
  }

   /**
   * Reset species stagnation count
   *
   * @function increaseStagnation
   * @memberof Species
   *
   * @return {number} Reset species stagnation count
  */
  self.resetStagnation = function() {
    return self.stagnation = 0;
  }
};

module.exports = Species;
