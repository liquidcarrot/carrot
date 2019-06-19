let { describe, Try } = require('riteway')
let { architect, Network, methods, Neat } = require('../src/carrot')

describe('filterGenome()', async assert => {
  // total nodes length = 200
  let neat = new Neat(100, 100, null, {
    pop_size: 20
  })
  
  
  // This replaces bad networks in a population
  const filterGenome = neat.util.filterGenome;
  
  let pickGenome = function(network) { // takes some input and returns a boolean (true / false)
    return (network.nodes.length > 100) // avoid overfit
  }
  
  let adjustGenome = function(network) { // a function that takes an object and returns a new form of the object
    return new Network(4, 4) // spit back a new network, 4 in 4 out 8 total
  }
  
  const should = "return a new Network with 8 nodes";
  
  // a case
  assert({
    given: "a genome with more than 100 nodes",
    should: should,
    actual: filterGenome(neat.population, (new Network(2, 2)), pickGenome, adjustGenome)[0].nodes.length,
    expected: 8
  });
  
  // another case
  assert({
    given: "a population with 20 members",
    should: "return an array of 20",
    actual: filterGenome(neat.population, (new Network(2, 2)), pickGenome, adjustGenome).length,
    expected: 20
  });
  
  // another case
  assert({
    given: "an pickGenome function that doesn't return a boolean",
    should: 'throw an error',
    actual: Try(filterGenome, neat.population, (new Network(2, 2)), () => { return "a string" }, adjustGenome),
    expected: new Error("pickGenome must always return a boolean!")
  });
  
  // another case
  assert({
    given: "an adjustGenome function that doesn't return a network",
    should: 'throw an error',
    actual: Try(filterGenome, neat.population, (new Network(2, 2)), pickGenome, () => { return "a string" }),
    expected: new Error('adjustGenome must always return a network!')
  });
});