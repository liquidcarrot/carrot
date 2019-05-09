let { describe, Try } = require('riteway')
let { architect, Network, methods, Neat } = require('../src/carrot')

describe('filterGenome()', async assert => {
  const filterGenome = function(population, template, pickGenome, adjustGenome) {
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
  
  const should = "return a new Network with 8 nodes";
  
  assert({
    given: "a genome with more than 100 nodes",
    should: should,
    actual: filterGenome(neat.population, (new Network(2, 2)), pickGenome, adjustGenome)[0].nodes.length,
    expected: 8
  });
  
  assert({
    given: "a population with 20 members",
    should: "return an array of 20",
    actual: filterGenome(neat.population, (new Network(2, 2)), pickGenome, adjustGenome).length,
    expected: 20
  });
  
  assert({
    given: "an pickGenome function that doesn't return a boolean",
    should: 'throw an error',
    actual: Try(filterGenome, neat.population, (new Network(2, 2)), () => { return "a string" }, adjustGenome),
    expected: new Error("pickGenome must always return a boolean!")
  });
  
  assert({
    given: "an adjustGenome function that doesn't return a network",
    should: 'throw an error',
    actual: Try(filterGenome, neat.population, (new Network(2, 2)), pickGenome, () => { return "a string" }),
    expected: new Error('adjustGenome must always return a network!')
  });
});
