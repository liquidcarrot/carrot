const _ = require("lodash");
const { assert, expect } = require('chai');
const should = require('chai').should();

const { is, data, random } = require('../../util');
const { Network, Neat, methods, config, architect } = require('../../src/carrot');

describe("Neat", function() {
  it("new Neat()", function() {
    const neat = new Neat();
    is.neat(neat);
  })
  it.skip("new Neat(options)", function() {
    const options = random.options.neat();
    const neat = new Neat(options);
    
    is.neat(neat);
  })
  it.skip("new Neat(dataset)", function() {
    const neat = new Neat();
    is.neat(neat);
  })
  it.skip("new Neat(population)", function() {
    const neat = new Neat();
    is.neat(neat);
  })
  it.skip("new Neat(input, output)", function() {
    const neat = new Neat();
    is.neat(neat);
  })
  it.skip("new Neat(dataset, options)", function() {
    const neat = new Neat();
    is.neat(neat);
  })
  it.skip("new Neat(population, options)", function() {
    const neat = new Neat();
    is.neat(neat);
  })
  it.skip("new Neat(input, output, options)", function() {
    const neat = new Neat();
    is.neat(neat);
  })
  it.skip("new Neat(population, dataset)", function() {
    const neat = new Neat();
    is.neat(neat);
  })
  it.skip("new Neat(input, output, dataset)", function() {
    const neat = new Neat();
    is.neat(neat);
  })
  it.skip("new Neat(population, dataset, options)", function() {
    const neat = new Neat();
    is.neat(neat);
  })
  it.skip("new Neat(input, output, dataset, options)", function() {
    const neat = new Neat();
    is.neat(neat);
  })
})