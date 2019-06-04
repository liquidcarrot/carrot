const _ = require("lodash");
const { expect } = require("chai");
const { Neat } = require("../src/carrot");

const is = {
  neat: (neat) => {
    expect(neat).to.be.an.instanceof(Neat);
    expect(neat.generation).to.be.a("number").and.equal(0);
    expect(neat.population).to.be.an("array");
    
      
  },
  neat_with_options: (neat, options) => {
    _.each(options, (value, key) => {
      expect(neat[key]).to.equal(options[key])
      expect(neat[key]).to.eql(options[key])
    })
  }
}

module.exports = is;