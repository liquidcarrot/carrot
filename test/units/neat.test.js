const _ = require("lodash");
const { assert, expect } = require('chai');
const should = require('chai').should();

const { has, is, data, random } = require('../../util');
const { Network, Neat, methods, config, architect } = require('../../src/carrot');

describe("Neat", function() {
  it("new Neat()", function() {
    const neat = new Neat();
    is.neat(neat);
  })
  it("new Neat(options)", function() {
    const options = random.options.neat();
    const neat = new Neat(options);
    
    is.neat(neat);
    has.options(neat, options);
  })
  it("new Neat(dataset)", function() {
    const dataset = data.XNOR;
    const neat = new Neat(dataset);
    
    is.neat(neat);
    has.dataset(neat, dataset);
  })
  it("new Neat(input, output)", function() {
    const inputs = _.random(50);
    const outputs = _.random(50)
    const neat = new Neat(inputs, outputs);
    
    is.neat(neat);
    has.dimensions(neat, inputs, outputs);
  })
  it("new Neat(dataset, options)", function() {
    const dataset = data.XNOR;
    const options = random.options.neat();
    
    const neat = new Neat(dataset, options);
    
    is.neat(neat);
    has.dataset(neat, dataset);
    has.options(neat, options);
    
  })
  it("new Neat(input, output, options)", function() {
    const inputs = _.random(50);
    const outputs = _.random(50);
    const options = random.options.neat();
    
    const neat = new Neat(inputs, outputs, options);
    
    is.neat(neat);
    has.options(neat, options);
    has.dimensions(neat, inputs, outputs);
  })
  it("new Neat(input, output, dataset)", function() {
    const inputs = _.random(50);
    const outputs = _.random(50);
    const dataset = data.XNOR;
    
    const neat = new Neat(inputs, outputs, dataset);
    
    is.neat(neat);
    has.dataset(neat, dataset);
    has.dimensions(neat, inputs, outputs);
  })
  it("new Neat(input, output, dataset, options)", function() {
    const inputs = _.random(50);
    const outputs = _.random(50);
    const dataset = data.XNOR;
    const options = random.options.neat();
    
    const neat = new Neat(inputs, outputs, dataset, options);
    
    is.neat(neat);
    has.dataset(neat, dataset);
    has.options(neat, options);
    has.dimensions(neat, inputs, outputs);
  })
  
  
  it.skip("new Neat(population)", function() {
    const neat = new Neat();
    is.neat(neat);
  })
  it.skip("new Neat(population, options)", function() {
    const neat = new Neat();
    is.neat(neat);
  })
  it.skip("new Neat(population, dataset)", function() {
    const neat = new Neat();
    is.neat(neat);
  })
  it.skip("new Neat(population, dataset, options)", function() {
    const neat = new Neat();
    is.neat(neat);
  })
})