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
}

// @param {number} size
// @param {number} threshold - The maximum genomic/topological distance between networks that is allowable to be part of the same species - i.e. the speciation threshold
Species.createRandom = function(options={}) {

}

function Population(options={}) {
  this.networks = [];
  this.species = [];
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
