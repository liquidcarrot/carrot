const { performance } = require("perf_hooks");

Math.cantor = function(a, b) {
  return (a + b) * (a + b + 1) / 2 + b;
}

let _ = function() {};

// `value` is `null` or `undefined`?
_.isNil = function(value) {
  return value == undefined;
}

// `value` is not `null` or `undefined`?
_.nisNil = function(value) {
  return value != undefined;
}

// Connection/Gene/Axon/Dendrite/Edge Class
function Connection(options={}) {
  this.id = _.nisNil(options.id) ? options.id : Math.cantor(options.from, options.to);
  this.from = options.from;
  this.to = options.to;
  this.weight = options.weight || Connection.randomWeight();
}

// Random connection
Connection.createRandom = function(options) {}

// Random weight
Connection.randomWeight = function() {
  return Math.random() * 2 - 1; // -1 < x < 1
}

// Node/Gene/Neuron/Vertix Class
function Nodes(options={}) {
  this.id = options.id;
}

// Network/Genome/Brain/Graph Class
// @param {string|number} id
// @param {Connection[]|Object[]|number} connections
// @param {Node[]|Object[]|number} nodes
function Network(options={}) {
  // options.id
  this.id = options.id;

  // options.connections
  this.connections = [];
  // creates a set of `options.connections` connections
  if(options.connections && typeof options.connections === "number") {
    for (let connection = 0; connection < options.connections; connection++) {
      this.connections.push(new Connection({
        id: connection,
        // add other connection hyperparameters here...
      }));
    }
  }
  // creates a copy of `otions.connections`
  else if(options.connections && options.connections instanceof Array) this.connections = options.connections.concat();
}

Network.NODES = 0;
Network.CONNECTIONS = 0;

// @param {Object} [network={}] - Options passed to the created network before being "randomized"
// @param {number} [connections=10] - Number of connections/genes in the network
// @param {number} [density=1] - Given any data which can be used to construct a network (e.g. inputs/outputs, layers, etc.), this value represents the percentage of total possible connections that will actually be added to the final network; e.g. if a network is created with 100 connections and a 0.8 density only ~80 connections will actually be created
Network.createRandom = function(options={
  connections: 10,
  density: 1,
  network: {}
}) {
  let network =  new Network(options.network);

  // Creates the connections in the network
  for (let c = 0; c < options.connections; c++) {
    let connection = new Connection({ id: c });

    // Pseudo-randomly omits certain connections to - on average - keep the network density at `density`
    if(Math.random() < options.density) network.connections.push(connection);
  }

  return network;
}

// Selects a one of a given group of genes
function select(genes, options={}) {
  return genes[Math.floor(Math.random() * genes.length)];
}

// Creates a child network from a pair of parent/source networks
// @feature Amorphous network crossover - i.e. can crossover/merge/stitch networks with wierd/awkward shapes
// @feature Non-matching networking crossover - i.e. can create a child network from source networks with different shapes
// @assumption Genomes are ordered in ascending order from the oldest to latest connections - i.e. `genome[0]` (oldest); `genome[genome.length - 1]` (latest)
// @todo Crossover more than 2 parents
function crossover(genomes, options={}) {
  // Tracks the parent/source network with the latest genomic changes (i.e. connections)
  let small, big, child = [];

  // mother[latest_gene] > father[latest_gene]
  if (genomes[0][genomes[0].length - 1].id > genomes[1][genomes[1].length - 1].id) {
    small = genomes[1].concat();
    big = genomes[0].concat();
  } else {
    small = genomes[0].concat();
    big = genomes[1].concat();
  }

  let smallIndex = small.length - 1;
  let bigIndex = big.length - 1;

  while (bigIndex > -1 && smallIndex > -1) {
    // Crossover
    if (small[smallIndex].id === big[bigIndex].id) {
      // Crossover shared genes and add winner to child
      child.unshift(select([small[smallIndex], big[bigIndex]]));

      smallIndex--; bigIndex--; continue;
    }
    // Excess (Big Parent)
    // Disjoint (Big Parent)
    if (big[bigIndex].id > small[smallIndex].id) {
      child.unshift(big[bigIndex]);

      bigIndex--; continue;
    }
    // Disjoint (Small Parent)
    else if (small[smallIndex].id > big[bigIndex].id) {
      child.unshift(small[smallIndex]);

      smallIndex--; continue;
    }
    else break;
  }

  return child;
}

// Measures genomic distance/differentiation - i.e. graph topology distance
function distance(genomes, options={}) {
  // Formula coefficents - NEAT Paper Species Distance Expression
  let coefficents = options.coefficents || [1,1,0.4]; // weight/importance of excess/disjointed genes/connections and the average distance between connection weights (as defined by the original NEAT paper)
  // let excessWeight = _.nisNil(options.excess) ? options.excess : 1; // weight/importance of excess genes/connections (as defined by the original NEAT paper)
  // let disjointWeight = _.nisNil(options.disjoint) ? options.disjoint : 1; // weight/importance of disjointed genes/connections (as defined by the original NEAT paper)
  // let weightWeight = _.nisNil(options.weights) ? options.weights : 0.4; // weight/importance of average distance between connection weights (as defined by the original NEAT paper)

  // Tracks the parent/source network with the latest genomic changes (i.e. connections)
  let small, big, child = [];

  // mother[latest_gene] > father[latest_gene]
  if (genomes[0][genomes[0].length - 1].id > genomes[1][genomes[1].length - 1].id) {
    small = genomes[1].concat();
    big = genomes[0].concat();
  } else {
    small = genomes[0].concat();
    big = genomes[1].concat();
  }

  let smallIndex = small.length - 1;
  let bigIndex = big.length - 1;

  // Track genomic/network/graph/topology distance formula variables
  let excess = disjointed = matching = deltaWeight = 0;
  let nodes = big.length;
  let finishedExcess = false;

  while (bigIndex > -1 && smallIndex > -1) {
    // Crossover
    if (small[smallIndex].id === big[bigIndex].id) {
      if(!finishedExcess) finishedExcess = true;

      deltaWeight += Math.abs(big[bigIndex].weight - small[smallIndex].weight);

      mathching = ++matching;

      smallIndex--; bigIndex--; continue;
    }
    // Excess (Big Parent)
    // Disjoint (Big Parent)
    if (big[bigIndex].id > small[smallIndex].id) {
      if(!finishedExcess) excess = ++excess;
      else disjointed = ++disjointed;

      bigIndex--; continue;
    }
    // Disjoint (Small Parent)
    else if (small[smallIndex].id > big[bigIndex].id) {
      if(!finishedExcess) finishedExcess = true;

      disjointed = ++disjointed;

      smallIndex--; continue;
    }
    else break;
  }

  deltaWeight /= matching;

  // D(N1,N2) = (c1 * E / N) + (c2 * D / N) * (c3 * ΔW)
  return (coefficents[0] * excess / nodes) + (coefficents[1] * disjointed / nodes) + (coefficents[2] * deltaWeight);
}

function Species(options={}) {
  this.networks = [];

  this.getRandomNetwork = function() {
    return this.networks[Math.floor(Math.random() * this.networks.length)];
  }

  // @param {Network} network - Network requesting to be added to the species
  // @param {number} [threshold=1] - The maximum genomic/topological distance between networks that is allowable to be part of the same species - i.e. the speciation threshold
  // @param {Network} [representative] - Useful when creating new generations in `Population`
  // @returns {boolean} Returns `true`, iff the network was added to the species
  this.addNetwork = function(network, options={ threshold: 0.4 }) {
    // If there are no networks in the species, the network is similar to the species, or a representative network is given from a previous generation...
    if((options.representative && distance([options.representative.connections, network.connections]) < options.threshold) || this.networks.length === 0 || distance([this.getRandomNetwork().connections, network.connections]) < options.threshold) {
      // ...add the network to the species...
      this.networks.push(network); return true;
    }
    // ...otherwise, don't add the network
    else return false;
  }
}

// @param {number} [size=10] - Number of network in the species - i.e. population size
// @param {number} [threshold=1] - The maximum genomic/topological distance between networks that is allowable to be part of the same species - i.e. the speciation threshold
// @param {Object} [network={}] - Options passed to `Network.createRandom` for each randomly created network before being "speciated"
Species.createRandom = function(options={
  size: 10,
  threshold: 1,
  network: { density: 0.4 }
}) {
  let species = new Species();
  let networks = 0; // Networks in the species

  // Species representative - i.e. the network that is reference to determine what species should "look like"; the network to which every other network will measure their genomic distance
  let representative = Network.createRandom({
    ...options.network,
    network: { id: networks }
  });
  species.networks.push(representative); ++networks;

  while(species.networks.length < options.size) {
    // Create a random network
    let network = Network.createRandom({
      ...options.network,
      network: { id: networks }
    });

    // Add it to the species, if they're "similar enough"
    if(distance([representative.connections, network.connections]) < options.threshold) {
      species.networks.push(network); ++networks;
    }
  }

  return species;
}

function Population(options={}) {
  // this.networks = [];
  this.species = [];

  // @param {Network} network - Network will added to the population
  this.addNetwork = function(network, options={ threshold: 0.4 }) {
    if(this.species.length === 0) this.species.push(new Species); // Each population will have at least "one species" even if it's a mono-species population

    let speciated = false; // Tracks if `network` was successfully added to an existing species in `population`

    // Add the network to an existing species
    for (let s = 0; s < this.species.length; s++) {
      // If the network is succesfully added to a species, return `true` - specifying that the network was successfully added to the population
      if (this.species[s].addNetwork(network, options)) {
        speciated = true;
        return true;
      }
    }

    // Otherwise, create a new species
    if (!speciated) {
      let species = new Species();
      species.networks.push(network);
      this.species.push(species);
      return true
    }
  }

  // Returns random species representatives
  this.getRepresentatives = function() {
    let representatives = [];

    for (let s = 0; s < this.species.length; s++) {
      representatives.push(this.species[s].getRandomNetwork());
    }

    return representatives;
  }

  this.newGeneration = function(options={
    size: 1000,
    threshold: 0.4,
    network: {
      connections: 10,
      density: 0.4
    }
  }) {
    let population = new Population();
    let representatives = this.getRepresentatives();

    // Adds `size` networks to a new population that is speciated using the previous population
    for (let n = 0; n < options.size; n++) {
      let speciated = false;

      // Add connections to an existing species from a previous generation
      for (let r = 0; r < representatives.length; r++) {
        if(population.addNetwork(new Network(options.network), {
          threshold: options.threshold,
          representative: representatives[r]
        })) {
          speciated = true;
          break;
        }
      }

      // Otherwise, create a new species
      if(!speciated) {
        let species = new Species();
        species.addNetwork(new Network(options.network), {
          threshold: options.threshold,
          representative: representatives[r]
        });
        population.species.push(species);
      }
    }

    return population;
  }
}

// @param {number} [size=10] - Number of networks in the species - i.e. population size
// @param {Object|boolean} [speciated=true] - Options passed to `Species.createRandom` for each random created species; NOTE: if `species` isn't specified the population will not be speciated
// @param {number} [threshold=1] - The maximum genomic/topological distance between networks that is allowable to be part of the same species - i.e. the speciation threshold
Population.createRandom = function(options={
  size: 1000,
  speciated: true,
  threshold: 1,
  network: {
    connections: 10,
    density: 0.4
  }
}) {
  let population = new Population();

  for (let n = 0; n < options.size; n++) {
    let network = new Network(options.network);

    population.addNetwork(network, {
      threshold: options.threshold
    });
  }

  return population;
}

// Checks: Cross-generational speciation
{
  // let population = Population.createRandom({
  //   size: 1000,
  //   speciated: true,
  //   threshold: 0.3,
  //   network: {
  //     connections: 10,
  //     density: 0.4
  //   }
  // });
  //
  // // console.log(population);
  // console.log(population.species.length);
  //
  // let newPopulation = population.newGeneration({
  //   size: 1000,
  //   threshold: 0.3,
  //   network: {
  //     connections: 10,
  //     density: 0.4
  //   }
  // });
  //
  // // console.log(newPopulation);
  // console.log(newPopulation.species.length);
}
// Checks: (Un)Speciated Population creation
{
  // let population = Population.createRandom();
  //
  // console.log(population);
  // console.log(population.species);
}
// Checks: Species creation
{
  // let start = performance.now();
  // let species = Species.createRandom({
  //   size: 100,
  //   threshold: 1,
  //   network: {
  //     connections: 1000,
  //     density: 0.6
  //   }
  // });
  // let end = performance.now();
  //
  // console.log(species);
  // console.log(species.getRandomNetwork());
  // console.log(end - start);
}
// Checks: Sparse Network creation
{
  // let network = Network.createRandom({
  //   connections: 10,
  //   density: 0.6
  // });
  //
  // console.log(network);
}
// Checks: Crossing over & Genomic/Network/Topological Distance
{
  // let mother = new Network({ connections: 5 });
  // let father = new Network({ connections: 100 });
  // console.log(mother.connections.lenth);
  // console.log(father.connections.length);
  //
  // console.log(crossover([mother.connections, father.connections]));
  // console.log(distance([mother.connections, father.connections]));
}
