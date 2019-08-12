const _ = require("lodash");
const { assert, expect } = require('chai');
const should = require('chai').should();

const { has, is, data, random } = require('../../util');
const { Network, Neat, methods, config, architect } = require('../../src/carrot');

describe("Neat", function() {
  describe("new Neat()", function() {
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
      const inputs = _.random(1,50);
      const outputs = _.random(1,50)
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
      const inputs = _.random(1,50);
      const outputs = _.random(1,50);
      const options = random.options.neat();
      
      const neat = new Neat(inputs, outputs, options);
      
      is.neat(neat);
      has.options(neat, options);
      has.dimensions(neat, inputs, outputs);
    })
    it("new Neat(input, output, dataset)", function() {
      const inputs = _.random(1,50);
      const outputs = _.random(1,50);
      const dataset = data.XNOR;
      
      const neat = new Neat(inputs, outputs, dataset);
      
      is.neat(neat);
      has.dataset(neat, dataset);
      has.dimensions(neat, inputs, outputs);
    })
    it("new Neat(input, output, dataset, options)", function() {
      const inputs = _.random(1, 50);
      const outputs = _.random(1, 50);
      const dataset = data.XNOR;
      const options = random.options.neat();
      
      const neat = new Neat(inputs, outputs, dataset, options);
      
      is.neat(neat);
      has.dataset(neat, dataset);
      has.options(neat, options);
      has.dimensions(neat, inputs, outputs);
    })
    
    // it.skip("new Neat(population)", function() {
    //   const neat = new Neat();
    //   is.neat(neat);
    // })
    // it.skip("new Neat(population, options)", function() {
    //   const neat = new Neat();
    //   is.neat(neat);
    // })
    // it.skip("new Neat(population, dataset)", function() {
    //   const neat = new Neat();
    //   is.neat(neat);
    // })
    // it.skip("new Neat(population, dataset, options)", function() {
    //   const neat = new Neat();
    //   is.neat(neat);
    // })
  })
  describe("neat.createPool()", function() {
    // Should ignore for `neat.createPopulation()`...
  })
  describe("neat.createPopulation()", function() {
    it("neat.createPopulation() => {Network[]}", function() {
      const neat = new Neat();
      const population = neat.createPopulation();
      
      expect(population).to.be.an.instanceof(Array);
      expect(population).to.have.lengthOf.above(0);
      
      for (let genome = 0; genome < population.length; genome++) {
        expect(population[genome]).to.be.an.instanceOf(Network);
      }
    })
    
    it("neat.createPopulation() | Shouldn't return shallow copies", function() {
      const neat = new Neat()
      const population = neat.createPopulation()
      
      expect(population[0]).not.equal(population[1])
    })
    
    it("neat.createPopulation(network) => {Network[]}", function() {
      const inputs = Math.ceil(Math.random() * 10);
      const outputs = Math.ceil(Math.random() * 10);
      const network = new Network(inputs, outputs);
      
      const neat = new Neat();
      
      const population = neat.createPopulation(network);
      
      expect(population).to.be.an.instanceof(Array);
      expect(population).to.have.lengthOf.above(0);
      
      for (let genome = 0; genome < population.length; genome++) {
        expect(population[genome]).to.be.an.instanceOf(Network);
        expect(population[genome].input_size).to.equal(inputs);
        expect(population[genome].output_size).to.equal(outputs);
      }
    })
    
    it("neat.createPopulation(network) | Shouldn't return shallow copies", function() {
      const inputs = Math.ceil(Math.random() * 10);
      const outputs = Math.ceil(Math.random() * 10);
      const network = new Network(inputs, outputs);
      
      const neat = new Neat();
      const population = neat.createPopulation(network);
      
      expect(population[0]).not.equal(population[1]);
    })
    
    it("neat.createPopulation(size) => {Network[]}", function() {
      const size = Math.ceil(Math.random() * 100);
      
      const neat = new Neat();
      const population = neat.createPopulation(size);
      
      expect(population).to.be.an.instanceof(Array);
      expect(population).to.have.lengthOf(size);
      
      for (let genome = 0; genome < population.length; genome++) {
        expect(population[genome]).to.be.an.instanceOf(Network);
      }
    })
    
    it("neat.createPopulation(size) | Shouldn't return shallow copies", function() {
      const size = Math.ceil(Math.random() * 100);
      
      const neat = new Neat();
      const population = neat.createPopulation(size);
      
      expect(population[0]).not.equal(population[1]);
    })
    
    it("neat.createPopulation(network, size) => {Network[]}", function() {
      const size = Math.ceil(Math.random() * 100);
      
      const inputs = Math.ceil(Math.random() * 10);
      const outputs = Math.ceil(Math.random() * 10);
      const network = new Network(inputs, outputs);
      
      const neat = new Neat();
      const population = neat.createPopulation(network, size);
      
      expect(population).to.be.an.instanceof(Array);
      expect(population).to.have.lengthOf(size);
      
      for (let genome = 0; genome < population.length; genome++) {
        expect(population[genome]).to.be.an.instanceOf(Network);
        expect(population[genome].input_size).to.equal(inputs);
        expect(population[genome].output_size).to.equal(outputs);
      }
    })
    
    it("neat.createPopulation(network, size) | Shouldn't return shallow copies", function() {
      const size = Math.ceil(Math.random() * 100);
      
      const inputs = Math.ceil(Math.random() * 10);
      const outputs = Math.ceil(Math.random() * 10);
      const network = new Network(inputs, outputs);
      
      const neat = new Neat();
      const population = neat.createPopulation(network, size);
      
      expect(population[0]).not.equal(population[1]);
    })
    
  })
  describe("neat.replace()", function() {
    it("neat.replace() => {ReferenceError}", function() {
      const neat = new Neat();
      
      expect(() => neat.replace()).to.throw(ReferenceError);
    })
    
    it("neat.replace(transform=Network) => {Network[]}", function() {
      const inputs = Math.ceil(Math.random() * 10);
      const outputs = Math.ceil(Math.random() * 10);
      const network = new Network(inputs, outputs);
      
      const neat = new Neat();
      const population = neat.replace(network);
      
      expect(population).to.be.an.instanceOf(Array);
      expect(population).to.have.lengthOf(neat.population.length);
      
      for (let genome = 0; genome < population; genome++) {
        expect(population[genome]).to.be.an.instanceOf(Network);
        expect(population[genome]).to.not.eql(neat.population[genome]);
      }
    })
    it("neat.replace(transform=Function) => {Network[]}", function() {
      const transform = function(network, index, population) {
        network["RANDOM_KEY"] = index;
      }
      
      const neat = new Neat();
      const population = neat.replace(transform);
      
      expect(population).to.be.an.instanceOf(Array);
      expect(population).to.be.an.lengthOf(neat.population.length);
      
      for (let genome = 0; genome < population; genome++) {
        expect(population[genome]).to.be.an.instanceOf(Network);
        expect(population[genome]["RANDOM_KEY"]).to.equal(genome);
      }
    })
    
    it("neat.replace(filter=number, transform=Network) => {Network[]}", function() {
      const index = Math.ceil(Math.random() * 50);
      const inputs = Math.ceil(Math.random() * 10);
      const outputs = Math.ceil(Math.random() * 10);
      const network = new Network(inputs, outputs);
      
      const neat = new Neat();
      const population = neat.replace(index, network);
      
      expect(population).to.be.an.instanceOf(Array);
      expect(population).to.have.lengthOf(neat.population.length);
      
      for (let genome = 0; genome < population; genome++) {
        expect(population[genome]).to.be.an.instanceOf(Network);
        
        if(genome === index) {
          expect(population[genome]).to.not.eql(neat.population[genome]);
          expect(population[genome]).to.eql(network);
        } else {
          expect(population[genome]).to.equal(neat.population[genome]);
        }
      }
    })
    it("neat.replace(filter=number, transform=Function) => {Network[]}", function() {
      const index = Math.ceil(Math.random() * 50);
      const transform = function(network, index, population) {
        network["RANDOM_KEY"] = index;
      }
      
      const neat = new Neat();
      const population = neat.replace(index, transform);
      
      expect(population).to.be.an.instanceOf(Array);
      expect(population).to.have.lengthOf(neat.population.length);
      
      for (let genome = 0; genome < population; genome++) {
        expect(population[genome]).to.be.an.instanceOf(Network);
        
        if(genome === index) {
          expect(population[genome]).to.not.eql(neat.population[genome]);
          expect(population[genome]["RANDOM_KEY"]).to.equal(genome);
        } else {
          expect(population[genome]).to.equal(neat.population[genome]);
        }
      }
    })
    
    it("neat.replace(filter=Network, transform=Network) => {Network[]}", function() {
      const neat = new Neat();
      
      const index = Math.floor(Math.random() * neat.population.length);
      const network = neat.population[index];
      
      const inputs = Math.ceil(Math.random() * 10);
      const outputs = Math.ceil(Math.random() * 10);
      const other_network = new Network(inputs, outputs);
      
      const population = neat.replace(network, other_network);
      
      expect(population).to.be.an.instanceOf(Array);
      expect(population).to.have.lengthOf(neat.population.length);
      
      for (let genome = 0; genome < population; genome++) {
        expect(population[genome]).to.be.an.instanceOf(Network);
        
        if(genome === index) {
          expect(population[genome]).to.not.eql(neat.population[genome]);
          expect(population[genome]).to.eql(network);
        } else {
          expect(population[genome]).to.equal(neat.population[genome]);
        }
      }
    })
    it("neat.replace(filter=Network, transform=Function) => {Network[]}", function() {
      const neat = new Neat();
      
      const index = Math.floor(Math.random() * neat.population.length);
      const network = neat.population[index];
      
      const other_index = Math.ceil(Math.random() * 50);
      const transform = function(network, index, population) {
        network["RANDOM_KEY"] = index;
      }
      
      const population = neat.replace(network, transform);
      
      expect(population).to.be.an.instanceOf(Array);
      expect(population).to.have.lengthOf(neat.population.length);
      
      for (let genome = 0; genome < population; genome++) {
        expect(population[genome]).to.be.an.instanceOf(Network);
        
        if(genome === index) {
          expect(population[genome]).to.eql(neat.population[genome]);
          expect(population[genome]).to.eql(network);
          expect(population[genome]["RANDOM_KEY"]).to.equal(genome);
        } else {
          expect(population[genome]).to.equal(neat.population[genome]);
        }
      }
    })
    
    it("neat.replace(filter=Function, transform=Network) => {Network[]}", function() {
      const indexes = [3, 6];
      const filter = function(network, index, population) {
        const indexes = [3, 6];
        return indexes.includes(index);
      }
      
      const inputs = Math.ceil(Math.random() * 10);
      const outputs = Math.ceil(Math.random() * 10);
      const network = new Network(inputs, outputs);
      
      const neat = new Neat();
      
      const population = neat.replace(filter, network);
      
      expect(population).to.be.an.instanceOf(Array);
      expect(population).to.have.lengthOf(neat.population.length);
      
      for (let genome = 0; genome < population; genome++) {
        expect(population[genome]).to.be.an.instanceOf(Network);
        
        if(indexes.includes(genome)) {
          expect(population[genome]).to.not.eql(neat.population[genome]);
          expect(population[genome]).to.eql(network);
        } else {
          expect(population[genome]).to.equal(neat.population[genome]);
        }
      }
    })
    it("neat.replace(filter=Function, transform=Function) => {Network[]}", function() {
      const indexes = [3, 6];
      const filter = function(network, index, population) {
        const indexes = [3, 6];
        return indexes.includes(index);
      }
      
      const index = Math.ceil(Math.random() * 50);
      const transform = function(network, index, population) {
        network["RANDOM_KEY"] = index;
      }
      
      const neat = new Neat();
      
      const population = neat.replace(filter, transform);
      
      expect(population).to.be.an.instanceOf(Array);
      expect(population).to.have.lengthOf(neat.population.length);
      
      for (let genome = 0; genome < population; genome++) {
        expect(population[genome]).to.be.an.instanceOf(Network);
        
        if(indexes.includes(genome)) {
          expect(population[genome]).to.eql(neat.population[genome]);
          expect(population[genome]).to.eql(network);
          expect(population[genome]["RANDOM_KEY"]).to.equal(genome);
        } else {
          expect(population[genome]).to.equal(neat.population[genome]);
        }
      }
    })
    
    // STATIC - Should be static functions
    it("neat.replace(population, transform=Network) => {Network[]}")
    it("neat.replace(population, transform=Function) => {Network[]}")
    it("neat.replace(population, filter=number, transform=Network) => {Network[]}")
    it("neat.replace(population, filter=number, transform=Function) => {Network[]}")
    it("neat.replace(population, filter=Network, transform=Network) => {Network[]}")
    it("neat.replace(population, filter=Network, transform=Function) => {Network[]}")
    it("neat.replace(population, filter=Function, transform=Network) => {Network[]}")
    it("neat.replace(population, filter=Function, transform=Function) => {Network[]}")
  })
  
  describe("neat.mutate()", function() {
    it.skip("neat.mutate() => {Network[]}", function() {
      const neat = new Neat()
      
      expect(neat.mutate()).to.be.an('array')
    })
    
    it("neat.mutate({ mutation_rate: 1 }) | original != new", function() {
      const neat = new Neat({ mutation_rate: 1 })
      
      const original = neat.population.map(function(network) {
        return _.cloneDeep(network)
      })
      
      // ensure deep copies
      expect(neat.population[0]).not.equal(original[0])
      expect(neat.population[0]).not.equal(neat.population[1])
      
      // create mutations
      neat.population = neat.mutate()
      
      // they should be different
      expect(neat.population[0]).not.eql(original[0])
    })
    
    it.skip("neat.mutate(mutation) => {Network[]}", function() {
      const neat = new Neat()
      
      expect(neat.mutate(methods.mutation.ADD_NODE)).to.be.an('array')
    })
    
    it("neat.mutate(mutation) | original != new", function() {
      const neat = new Neat()
      
      const original = neat.population.map(function(network) {
        return _.cloneDeep(network)
      })
      
      neat.population = neat.mutate(methods.mutation.ADD_NODE)
      
      expect(neat.population[0]).not.eql(original[0])
    })
    
    it("neat.mutate(mutation) & Neat({ mutation_amount: 10, mutation_rate: 1 }) | Should mutate 10 times", function() {
      const neat = new Neat({ population_size: 1, mutation_amount: 10, mutation_rate: 1 })
      
      neat.population = neat.mutate(methods.mutation.ADD_NODE)
      
      expect(neat.population[0].nodes.length).equal(12)
    })
    
    it("neat.mutate(mutation) & Neat({ mutation_amount: 10, mutation_rate: 1, maxNodes: 8 }) | Networks should have 8 nodes", function() {
      const neat = new Neat({ population_size: 1, mutation_amount: 10, mutation_rate: 1, maxNodes: 8 })
      
      neat.population = neat.mutate(methods.mutation.ADD_NODE)
      
      expect(neat.population[0].nodes.length).equal(8)
    })
    
    // To be implemented
    it.skip("neat.mutate(mutation[]) => {Network[]}", function() {
      
    })
    it.skip("neat.mutate(genomes=Network) => {Network}", function () {})
    it.skip("neat.mutate(genomes=Network[]) => {Network[]}", function () {})
    it.skip("neat.mutate(genomes=Network, methods=mutation) => {Network}", function () {})
    it.skip("neat.mutate(genomes=Network, methods=mutation[]) => {Network}", function () {})
    it.skip("neat.mutate(genomes=Network[], methods=mutation) => {Network[]}", function () {})
    it.skip("neat.mutate(genomes=Network[], methods=mutation[]) => {Network[]}", function () {})
  })
  
  // keep skipped
  describe.skip("neat.evolve()", function() {
    async function areSorted(genomes) {
      let previous = genomes[0];
      for (let genome = 1; genome < genomes.length; genome++) {
        expect(genomes[genome].score).be.at.most(previous.score);
      }
    }
    async function areScored(genomes) {
      for (let genome = 0; genome < genomes.length; genome++) {
        expect(genomes[genome]).to.exist;
        expect(genomes[genome].score).to.be.finite
      }
    }
    it("neat.evolve() => {Network}", async function() {
      this.timeout(40000);
      
      const neat = new Neat(2,1);
      
      const best = await neat.evolve(data.XNOR);
      
      await areScored(neat.population);
      await areSorted(neat.population);
    })
    it("neat.evolve(dataset) => {Network}")
    it("neat.evolve(options) => {Network}")
    it("neat.evolve(dataset, options) => {Network}")
    it("neat.evolve(genomes, dataset, options) => {Network}") // Should be static
  })

  describe("neat.getParent()", function() {
    it("neat.getParent() => {Network}")
    it("neat.getParent(method) => {Network}") // Hard to test the marginal functionallity over `neat.getParent()`
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

})