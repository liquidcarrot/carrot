const _ = require("lodash");
const { assert, expect } = require('chai');
const should = require('chai').should();

const { has, is, data, random } = require('../../util');
const { Network, Neat, methods, config, architect } = require('../../src/carrot');

describe("Neat", function() {
  describe("new Neat()", function() {
    
  })
  describe("neat.createPool()", function() {
    it("neat.createPool() => {Network[]}")
    it("neat.createPool(network) => {Network[]}")
    it("neat.createPool(size) => {Network[]}")
    it("neat.createPool(network, size) => {Network[]}")
  })
  describe("neat.createPopulation()", function() {
    it("neat.createPopulation() => {Network[]}")
    it("neat.createPopulation(network) => {Network[]}")
    it("neat.createPopulation(size) => {Network[]}")
    it("neat.createPopulation(network, size) => {Network[]}")
  })
  describe("neat.replace()", function() {
    it("neat.replace() => {ReferenceError}")
    it("neat.replace(transform=Network) => {Network[]}")
    it("neat.replace(transform=Function) => {Network[]}")
    it("neat.replace(population, transform=Network) => {Network[]}")
    it("neat.replace(population, transform=Function) => {Network[]}")
    it("neat.replace(filter=Network, transform=Network) => {Network[]}")
    it("neat.replace(filter=Network, transform=Function) => {Network[]}")
    it("neat.replace(filter=Function, transform=Network) => {Network[]}")
    it("neat.replace(filter=Function, transform=Function) => {Network[]}")
    it("neat.replace(population, filter=Network, transform=Network) => {Network[]}")
    it("neat.replace(population, filter=Network, transform=Function) => {Network[]}")
    it("neat.replace(population, filter=Function, transform=Network) => {Network[]}")
    it("neat.replace(population, filter=Function, transform=Function) => {Network[]}")
  })
  describe("neat.mutate()", function() {
    it("neat.mutate() => {Network[]}")
    
    it("neat.mutate(genomes=Network) => {Network}") // Should be static
    it("neat.mutate(genomes=Network[]) => {Network[]}") // Should be static
     
    it("neat.mutate(methods=mutation) => {Network[]}")
    it("neat.mutate(methods=mutation[]) => {Network[]}")
    
    it("neat.mutate(genomes=Network, methods=mutation) => {Network}") // Should be static
    it("neat.mutate(genomes=Network, methods=mutation[]) => {Network}") // Should be static
    
    it("neat.mutate(genomes=Network[], methods=mutation) => {Network[]}") // Should be static
    it("neat.mutate(genomes=Network[], methods=mutation[]) => {Network[]}") // Should be static
  })
  describe("neat.mutateRandom()", function() {
    // Could ignore this if `neat.mutate()` is done effectively
  })
  describe("neat.evolve()", function() {
    it("neat.evolve() => {Network}")
    it("neat.evolve(dataset) => {Network}")
    it("neat.evolve(options) => {Network}")
    it("neat.evolve(dataset, options) => {Network}")
    it("neat.evolve(genomes, dataset, options) => {Network}") // Should be static
  })
  describe("neat.getParent()", function() {
    it("neat.getParent() => {Network}")
    it("neat.getParent(method) => {Network}")
  })
  describe("neat.getOffspring()", function() {
    it("neat.getOffspring() => {Network}")
  })
  describe("neat.evaluate()", function() {
    it("neat.evaluate() => {Network[]}")
    it("neat.evaluate(dataset) => {Object}")
    it("neat.evaluate(options={ 'clear': true, networks': true }) => {{ 'best': Network, 'average': Network, 'worst': Network }}")
    it("neat.evaluate(dataset, { 'clear': true, networks': true }) => {{ 'best': Network, 'average': Network, 'worst': Network }}")
  })
  describe("neat.sort()", function() {
    it("neat.sort() => {Network[]}")
  })
  describe("neat.getFittest()", function() {
    it("neat.getFittest() => {Network}")
  })
  describe("neat.getAverage()", function() {
    it("neat.getAverage() => {Network}")
  })
  describe("neat.toJSON()", function() {
    it("neat.toJSON() => {Object}")
  })
  describe("Neat.fromJSON()", function() {
    it("neat.fromJSON() => {ReferenceError}")
    it("neat.fromJSON(json) => {Neat}")
  })
  
  
  
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