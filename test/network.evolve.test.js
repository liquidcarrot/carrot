const chai = require('chai')
const assert = chai.assert
let carrot = require('../src/index')

/* Shorten const names */
const { Network, methods, config } = carrot;

/* Turn off warnings */
config.warnings = false;

describe('Network.evolve()', function () {

  it('AND', async function () {
    this.timeout(40000);

    // Train the AND gate
    const trainingSet = [
      { input: [0, 0], output: [0] },
      { input: [0, 1], output: [0] },
      { input: [1, 0], output: [0] },
      { input: [1, 1], output: [1] }
    ];

    const network = new Network(2, 1);
    const results = await network.evolve(trainingSet, {
      mutation: methods.mutation.FFW,
      equal: true,
      elitism: 10,
      mutation_rate: 0.5,
      error: 0.03,
      threads: 1
    });

    assert.isBelow(results.error, 0.03);
  })
  it('XOR', async function () {
    this.timeout(40000);
    // Train the XOR gate
    const trainingSet = [
      { input: [0, 0], output: [0] },
      { input: [0, 1], output: [1] },
      { input: [1, 0], output: [1] },
      { input: [1, 1], output: [0] }
    ];

    const network = new Network(2, 1);
    const results = await network.evolve(trainingSet, {
      mutation: methods.mutation.FFW,
      equal: true,
      elitism: 10,
      mutation_rate: 0.9,
      error: 0.03,
      threads: 1
    });
    assert.isBelow(results.error, 0.03);
  })
  it('XNOR', async function () {
    this.timeout(60000);

    // Train the XNOR gate
    const trainingSet = [
      { input: [0, 0], output: [1] },
      { input: [0, 1], output: [0] },
      { input: [1, 0], output: [0] },
      { input: [1, 1], output: [1] }
    ];

    const network = new Network(2, 1);
    const results = await network.evolve(trainingSet, {
      mutation: methods.mutation.FFW,
      equal: true,
      elitism: 10,
      mutation_rate: 0.5,
      error: 0.03,
      threads: 1
    });

    assert.isBelow(results.error, 0.03);
  })
})
