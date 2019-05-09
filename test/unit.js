let { describe, Try } = require('riteway')
let { architect, Network, methods, Neat } = require('../src/carrot')

describe('filterGenome()', async assert => {
  let filterGenome = function(population, template, pickGenome, adjustGenome) {
    let filtered = [...population]; // avoid mutations
    
    let pickedIndexes = [];
    for (let i = 0; i < population.length; i++)
      if (pickGenome(filtered[i])) pickedIndexes.push(i);
  
    if(adjustGenome)
      for(const i in pickedIndexes) filtered[i] = adjustGenome(filtered[i])
    else
      for(const i in pickedIndexes) filtered[i] = template
  
    return filtered;
  }
  
  // total nodes length = 200
  let neat = new Neat(100, 100, null, {
    popsize: 20
  })
  
  let pickGenome = function(network) {
    return (network.nodes.length > 100)
  }
  
  let adjustGenome = function(network) {
    return new Network(4, 4)
  }
  
  const should = 'return a new Network with 8 nodes';
  
  assert({
    given: 'a genome with more than 100 nodes',
    should: should,
    actual: filterGenome(neat.population, (new Network(2, 2)), pickGenome, adjustGenome)[0].nodes.length,
    expected: 8
  });
  
  assert({
    given: 'a population with 20 members',
    should: 'return an array of 20',
    actual: filterGenome(neat.population, (new Network(2, 2)), pickGenome, adjustGenome).length,
    expected: 20
  });
});
