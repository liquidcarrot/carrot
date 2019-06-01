const { assert, expect } = require('chai');
const should = require('chai').should();
const chalk = require('chalk');

const { Neat, Network, architect, methods } = require('../../src/carrot');

describe("Logic Gates", function() {
  const data = {
    NOT: [
      { input: [0], output: [1] },
      { input: [1], output: [0] }
    ],
    AND: [
      { input: [0, 0], output: [0] },
      { input: [0, 1], output: [0] },
      { input: [1, 0], output: [0] },
      { input: [1, 1], output: [1] }
    ],
    OR: [
      { input: [0, 0], output: [0] },
      { input: [0, 1], output: [1] },
      { input: [1, 0], output: [1] },
      { input: [1, 1], output: [1] }
    ],
    NAND: [
      { input: [0, 0], output: [1] },
      { input: [0, 1], output: [1] },
      { input: [1, 0], output: [1] },
      { input: [1, 1], output: [0] }
    ],
    NOR: [
      { input: [0, 0], output: [1] },
      { input: [0, 1], output: [0] },
      { input: [1, 0], output: [0] },
      { input: [1, 1], output: [0] }
    ],
    XOR: [
      { input: [0, 0], output: [0] },
      { input: [0, 1], output: [1] },
      { input: [1, 0], output: [1] },
      { input: [1, 1], output: [0] }
    ],
    XNOR: [
      { input: [0, 0], output: [1] },
      { input: [0, 1], output: [0] },
      { input: [1, 0], output: [0] },
      { input: [1, 1], output: [1] }
    ]
  }
  
  it("[NOT] Network.train()", function() {
    const network = new Network(1,1);
    
    const initial = network.test(data.NOT);
    network.train(data.NOT);
    const final = network.test(data.NOT);
    
    expect(final.error).to.be.at.most(initial.error);
  });
  it("[NOT] Network.evolve()", function() {
    const neat = new Neat(data.NOT, { input: 1, output: 1 });
    
    let execute = async function() {
      
      const initial = await neat.evaluate(data.NOT); // returns initial "fittest" network
      const intermediate = await neat.evolve(data.NOT); // evolves
      const final = await neat.evaluate(data.NOT); // returns fittest network
      
      expect(final.score).to.be.at.least(initial.score);
      console.log("Initial score: " + initial.score + " Final score: " + final.score)
    };
    
    execute();
  });
  
  it("[NOT] Neat.evolve()");
  
  it("[AND] Network.train()", function() {
    const network = new Network(2,1);
    
    const initial = network.test(data.AND);
    network.train(data.AND);
    const final = network.test(data.AND);
    
    expect(final.error).to.be.at.most(initial.error);
  });
  it("[AND] Network.evolve()");
  it("[AND] Neat.evolve()");
  
  it("[OR] Network.train()", function() {
    const network = new Network(2,1);
    
    const initial = network.test(data.OR);
    network.train(data.OR);
    const final = network.test(data.OR);
    
    expect(final.error).to.be.at.most(initial.error);
  });
  it("[OR] Network.evolve()");
  it("[OR] Neat.evolve()");
  
  it("[NAND] Network.train()", function() {
    const network = new Network(2,1);
    
    const initial = network.test(data.NAND);
    network.train(data.NAND);
    const final = network.test(data.NAND);
    
    expect(final.error).to.be.at.most(initial.error);
  });
  it("[NAND] Network.evolve()");
  it("[NAND] Neat.evolve()");
  
  it("[NOR] Network.train()", function() {
    const network = new Network(2,1);
    
    const initial = network.test(data.NOR);
    network.train(data.NOR);
    const final = network.test(data.NOR);
    
    expect(final.error).to.be.at.most(initial.error);
  });
  it("[NOR] Network.evolve()");
  it("[NOR] Neat.evolve()");
  
  it("[XOR] Network.train()", function() {
    const network = new Network(2,1);
    
    const initial = network.test(data.XOR);
    network.train(data.XOR);
    const final = network.test(data.XOR);
    
    expect(final.error).to.be.at.most(initial.error);
  });
  it("[XOR] Network.evolve()");
  it("[XOR] Neat.evolve()");
  
  it("[XNOR] Network.train()", function() {
    const network = new Network(2,1);
    
    const initial = network.test(data.XNOR);
    network.train(data.XNOR);
    const final = network.test(data.XNOR);
    
    expect(final.error).to.be.at.most(initial.error);
  });
  it("[XNOR] Network.evolve()");
  it("[XNOR] Neat.evolve()");
});
