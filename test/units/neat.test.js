const _ = require("lodash");
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const { expect, assert } = chai;
const should = require('chai').should();

const { has, is, data, random } = require('../../util');
const { Network, Neat, methods, config, architect } = require('../../src/carrot');

describe("Neat", function() {
  describe("new Neat()", function() {
    it("new Neat()", function() {
      this.timeout(10000)
      const neat = new Neat();
      is.neat(neat);
    })
    it("new Neat(options)", function() {
      this.timeout(10000)
      const options = random.options.neat();
      const neat = new Neat(options);

      is.neat(neat);
      has.options(neat, options);
    })
    it("new Neat(dataset)", function() {
      this.timeout(10000)
      const dataset = data.XNOR;
      const neat = new Neat(dataset);

      is.neat(neat);
      has.dataset(neat, dataset);
    })
    it("new Neat(input, output)", function() {
      this.timeout(10000)
      const inputs = _.random(1,50);
      const outputs = _.random(1,50)
      const neat = new Neat(inputs, outputs);

      is.neat(neat);
      has.dimensions(neat, inputs, outputs);
    })
    it("new Neat(dataset, options)", function() {
      this.timeout(10000)
      const dataset = data.XNOR;
      const options = random.options.neat();

      const neat = new Neat(dataset, options);

      is.neat(neat);
      has.dataset(neat, dataset);
      has.options(neat, options);

    })
    it("new Neat(input, output, options)", function() {
      this.timeout(10000)
      const inputs = _.random(1,50);
      const outputs = _.random(1,50);
      const options = random.options.neat();

      const neat = new Neat(inputs, outputs, options);

      is.neat(neat);
      has.options(neat, options);
      has.dimensions(neat, inputs, outputs);
    })
    it("new Neat(input, output, dataset)", function() {
      this.timeout(10000)
      const inputs = _.random(1,50);
      const outputs = _.random(1,50);
      const dataset = data.XNOR;

      const neat = new Neat(inputs, outputs, dataset);

      is.neat(neat);
      has.dataset(neat, dataset);
      has.dimensions(neat, inputs, outputs);
    })
    it("new Neat(input, output, dataset, options)", function() {
      this.timeout(10000)
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

    // it("new Neat(population)", function() {
    //   const neat = new Neat();
    //   is.neat(neat);
    // })
    // it("new Neat(population, options)", function() {
    //   const neat = new Neat();
    //   is.neat(neat);
    // })
    // it("new Neat(population, dataset)", function() {
    //   const neat = new Neat();
    //   is.neat(neat);
    // })
    // it("new Neat(population, dataset, options)", function() {
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
  describe("neat.resize()", function() {
    it("neat.resize() | throws an Error", function() {
      let neat = new Neat()

      assert.throws(neat.resize, Error)
    })
    it("neat.resize(*) => {Network[]}", function() {
      let neat = new Neat()
      let neat2 = new Neat()

      expect(neat.resize(3)).an("array")
      expect(neat.resize(neat2.population)).an("array")
      expect(neat.resize(2)).an("array")
    })
    it("neat.resize(*) | population_size equals population.length", function() {
      let neat = new Neat({ population_size: 3 })

      neat.resize(5)

      expect(neat.population_size).equals(neat.population.length)
    })
    it("neat.resize(network[]) => {Network[]} | population_size increased by network[] length", function() {
      let neat = new Neat({ population_size: 1 })
      let neat2 = new Neat({ population_size: 1 })

      neat.resize(neat2.population)

      expect(neat.population_size).equals(2)
    })
    it("new Neat({ population_size: 1 }), neat.resize(number) => {Network[]} | number > population, size increased to number", function() {
      let neat = new Neat({ population_size: 1 })

      neat.resize(2)

      expect(neat.population.length).equals(2)
    })
    it("neat.resize(number) => {Network[]} | number > population, size increased to number", function() {
      let neat = new Neat({ population_size: 2 })

      neat.resize(5)

      expect(neat.population.length).equals(5)
    })
    it("neat.resize(number) => {Network[]} | number < population, size decreased to number", function() {
      let neat = new Neat({ population_size: 2 })

      neat.resize(1)

      expect(neat.population.length).equals(1)
    })
  })
  describe("neat.mutate()", function() {
    it("neat.mutate() => {Network[]}", function() {
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

    it("neat.mutate(ADD_NODE) => {Network[]}", function() {
      const neat = new Neat()

      expect(neat.mutate(methods.mutation.ADD_NODE)).to.be.an('array')
    })

    it("neat.mutate(ADD_NODE) | original != new", function() {
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
    it("neat.mutate(mutation[]) => {Network[]}", function() {

    })
    it("neat.mutate(genomes=Network) => {Network}", function () {})
    it("neat.mutate(genomes=Network[]) => {Network[]}", function () {})
    it("neat.mutate(genomes=Network, methods=mutation) => {Network}", function () {})
    it("neat.mutate(genomes=Network, methods=mutation[]) => {Network}", function () {})
    it("neat.mutate(genomes=Network[], methods=mutation) => {Network[]}", function () {})
    it("neat.mutate(genomes=Network[], methods=mutation[]) => {Network[]}", function () {})
  })
  describe("neat.evolve()", function() {
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

    it("neat.evolve() => {Network[]}", async function() {

      const neat = new Neat(2,1);

      const newPopulation = await neat.evolve(data.XNOR);

      expect(newPopulation).to.be.an('array')
    })

    it("neat.evolve() | NewPopulation is sorted", async function() {
      this.timeout(40000)

      const neat = new Neat(2,1);

      const best = await neat.evolve(data.XNOR);

      await areSorted(neat.population)
    })
// --------------------------------------------------------------
    it("new Neat(), neat.evolve() | Runs, .score set", async function () {
      const neat = new Neat(2,1, { population_size: 2 }) // reduced population to shorten test times

      let { population } = neat

      // set dummy scores
      population = population.map((network, index) => {
        network.score = index

        return network
      })

      // deep copy original population
      const originalPopulation = population.map(network => network.clone())

      population = neat.population = await neat.evolve()

      expect(population).not.eql(originalPopulation)
    })

    it("new Neat(), neat.evolve() | Throws error, missing .score", async function () {
      const neat = new Neat(2,1, { population_size: 2 }) // reduced population to shorten test times

      neat.evolve().should.be.rejected
    })

    it("new Neat(), neat.evolve(null), .score set | Runs", async function () {
      const neat = new Neat(2,1, { population_size: 2 }) // reduced population to shorten test times

      let { population } = neat

      // set dummy scores
      population = population.map((network, index) => {
        network.score = index

        return network
      })

      // deep copy original population
      const originalPopulation = population.map(network => network.clone())

      population = neat.population = await neat.evolve(null)

      expect(population).not.eql(originalPopulation)
    })

    it("new Neat(), neat.evolve(null), x100 | Doesn't fail", async function () {
      // XOR dataset
      const originalSet = [
       { input: [0,0], output: [0] },
       { input: [0,1], output: [1] },
       { input: [1,0], output: [1] },
       { input: [1,1], output: [0] },
      ]

      let neat = new Neat(2, 1, originalSet);

      let times = 50;
      while(times) {
        neat.evolve();
        times--; // reduce times by one, when times = zero breaks while loop
      }
    })

    it("new Neat(), neat.evolve(null, filter, adjust) | Runs, .score set", async function () {
      const neat = new Neat(2,1, { population_size: 2 }) // reduced population to shorten test times

      let { population } = neat

      // set dummy scores
      population = population.map((network, index) => {
        network.score = index

        return network
      })

      // deep copy original population
      const originalPopulation = population.map(network => network.clone())

      population = neat.population = await neat.evolve(null, (network) => network, (network) => network)

      expect(population).not.eql(originalPopulation)
    })

    it("new Neat(), neat.evolve(null, filter) | Throws error, missing adjust", async function () {
      const neat = new Neat(2,1, { population_size: 2 }) // reduced population to shorten test times

      let { population } = neat

      // set dummy scores
      population = population.map((network, index) => {
        network.score = index

        return network
      })

      neat.evolve(null, (network) => network).should.be.rejected
    })

    it("new Neat(), neat.evolve() | Generation count = number", async function () {
      const neat = new Neat(2,1, { population_size: 2 }) // reduced population to shorten test times

      expect(neat.generation).a("number")
    })

    it("new Neat(), neat.evolve() | Generation count increases", async function () {
      const neat = new Neat(2,1, { population_size: 2 }) // reduced population to shorten test times

      let { population } = neat

      // set dummy scores
      population = population.map((network, index) => {
        network.score = index

        return network
      })

      population = neat.population = await neat.evolve()

      expect(neat.generation).equal(1)
    })
// --------------------------------------------------------------
    it("new Neat(dataset), Neat.evolve()", async function () {
      const neat = new Neat(2, 1, data.OR, { population_size: 1 })

      let { population } = neat

      // set initial scores
      population = population.map(network => {
        network.score = -Infinity
        return network
      })

      population = neat.population = await neat.evolve()

      expect(population[0].score).above(-Infinity)
    })

    it("new Neat(dataset), Neat.evolve(null)", async function () {
      const neat = new Neat(2, 1, data.OR, { population_size: 1 })

      let { population } = neat

      // set initial scores
      population = population.map(network => {
        network.score = -Infinity
        return network
      })

      population = neat.population = await neat.evolve(null)

      expect(population[0].score).above(-Infinity)
    })

    it("new Neat(dataset), Neat.evolve(null, filter, adjust)", async function () {
      const neat = new Neat(2, 1, data.OR, { population_size: 1 })

      let { population } = neat

      // set initial scores
      population = population.map(network => {
        network.score = -Infinity
        return network
      })

      neat.evolve(null, (network) => network, (network) => network).should.be.rejected
    })

    it("new Neat(dataset), Neat.evolve(null, filter) | Throws error, missing adjust", async function () {
      const neat = new Neat(2, 1, data.OR, { population_size: 1 })

      let { population } = neat

      // set initial scores
      population = population.map(network => {
        network.score = -Infinity
        return network
      })

      neat.evolve(null, (network) => network).should.be.rejected
    })

    it("new Neat(dataset), Neat.evolve() | Generation count = number", async function () {
      const neat = new Neat(2, 1, data.OR, { population_size: 1 })

      let { population } = neat

      // set initial scores
      population = population.map(network => {
        network.score = -Infinity
        return network
      })

      population = neat.population = await neat.evolve()

      expect(neat.generation).a("number")
    })

    it("new Neat(dataset), Neat.evolve() | Generation count increases", async function () {
      const neat = new Neat(2, 1, data.OR, { population_size: 1 })

      let { population } = neat

      // set initial scores
      population = population.map(network => {
        network.score = -Infinity
        return network
      })

      population = neat.population = await neat.evolve()

      expect(neat.generation).equal(1)
    })
// --------------------------------------------------------------
    it("new Neat(), neat.evolve(otherSet)", async function () {
      const neat = new Neat(2,1, { population_size: 2 })

      const originalPopulation = neat.population.map(network => network.clone())

      neat.population = await neat.evolve(data.XOR)

      expect(neat.population).not.eql(originalPopulation)
    })

    it("new Neat(), neat.evolve(otherSet, filter, adjust)", async function () {
      const neat = new Neat(2,1, { population_size: 2 })

      const originalPopulation = neat.population.map(network => network.clone())

      neat.population = await neat.evolve(data.XOR, (network) => network, (network) => network)

      expect(neat.population).not.eql(originalPopulation)
    })

    it("new Neat(), neat.evolve(otherSet, filter) | Throws error, missing adjust", async function () {
      const neat = new Neat(2,1, { population_size: 2 })

      const originalPopulation = neat.population.map(network => network.clone())

      neat.evolve(data.XOR, (network) => network).should.be.rejected
    })

    it("new Neat(), neat.evolve(otherSet) | Generation count = number", async function () {
      const neat = new Neat(2,1, { population_size: 2 })

      const originalPopulation = neat.population.map(network => network.clone())

      neat.population = await neat.evolve(data.XOR)

      expect(neat.generation).a("number")
    })

    it("new Neat(), neat.evolve(otherSet) | Generation count increases", async function () {
      const neat = new Neat(2,1, { population_size: 2 })

      const originalPopulation = neat.population.map(network => network.clone())

      neat.population = await neat.evolve(data.XOR)

      expect(neat.generation).equal(1)
    })
// --------------------------------------------------------------
    it("new Neat(dataset), Neat.evolve(otherSet) | Should prioritize otherSet for training", async function () {
      this.timeout(10000)

      const neat = new Neat(2, 1, data.XOR, { population_size: 5 }) // reduced population size to speed up test

      // .evolve should prioritize AND set
      const evolvePop = async function(n, neat) {
        if(n === 0) return neat

        neat.population = await neat.evolve(data.AND)

        return evolvePop(n-1, neat)
      }

      const { population } = await evolvePop(200, neat)

      const getError = function(dataset, genome) {

        let error = 0;
        for(let i = 0; i < dataset.length; i++) {
          const entry = dataset[i]
          const output = entry.output[0]

          error += Math.pow(output - genome.activate(entry.input), 2)
        }

        return error / dataset.length
      }

      const AND_Set_Error = getError(data.AND, population[0])
      const XOR_Set_Error = getError(data.XOR, population[0])

      // error for AND should be lower
      expect(AND_Set_Error).below(XOR_Set_Error)

    })

    it("new Neat(dataset), Neat.evolve(otherSet, filter, adjust)", async function () {
      this.timeout(10000)

      const neat = new Neat(2, 1, data.XOR, { population_size: 5 }) // reduced population size to speed up test

      // .evolve should prioritize AND set
      const evolvePop = async function(n, neat) {
        if(n === 0) return neat

        neat.population = await neat.evolve(data.AND, (network) => network, (network) => network)

        return evolvePop(n-1, neat)
      }

      const { population } = await evolvePop(200, neat)

      const getError = function(dataset, genome) {

        let error = 0;
        for(let i = 0; i < dataset.length; i++) {
          const entry = dataset[i]
          const output = entry.output[0]

          error += Math.pow(output - genome.activate(entry.input), 2)
        }

        return error / dataset.length
      }

      const AND_Set_Error = getError(data.AND, population[0])
      const XOR_Set_Error = getError(data.XOR, population[0])

      // error for AND should be lower
      expect(AND_Set_Error).below(XOR_Set_Error)

    })

    it("new Neat(dataset), Neat.evolve(otherSet) | Generation count = number", async function () {
      const neat = new Neat(2, 1, data.XOR, { population_size: 5 }) // reduced population size to speed up test

      await neat.evolve(data.AND)

      expect(neat.generation).a("number")
    })

    it("new Neat(dataset), Neat.evolve(otherSet) | Generation count increases", async function () {
      const neat = new Neat(2, 1, data.XOR, { population_size: 5 }) // reduced population size to speed up test

      await neat.evolve(data.AND)

      expect(neat.generation).equal(1)
    })
// --------------------------------------------------------------
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
    it("new Neat(), neat.evaluate() | Throws error", async function() {
      const neat = new Neat(2,1, { population_size: 2 }) // reduced population to shorten test times

      neat.evaluate().should.be.rejected
    })

    it("new Neat(), neat.evaluate(dataset) | Should resolve and set .score", async function() {
      const neat = new Neat(2,1, { population_size: 2 }) // reduced population to shorten test times

      await neat.evaluate(data.AND)

      expect(neat.population[0].score).a("number")
    })

    it("new Neat(dataset), neat.evaluate() | Should resolve and set .score", async function() {
      const neat = new Neat(2,1, data.AND, { population_size: 2 }) // reduced population to shorten test times

      await neat.evaluate()

      expect(neat.population[0].score).a("number")
    })

    it.skip("new Neat(dataset), neat.evaluate(otherSet) | should prioritize otherSet", async function() {
      const neat = new Neat(2,1, data.AND, { population_size: 2 }) // reduced population to shorten test times

      await neat.evaluate()

      expect(neat.population[0].score).a("number")
    })

    it("neat.evaluate() => {Network[]}")
    it("neat.evaluate(dataset) => {Object}")
    it("neat.evaluate(options={ 'clear': true, networks': true }) => {{ 'best': Network, 'average': Network, 'worst': Network }}")
    it("neat.evaluate(dataset, { 'clear': true, networks': true }) => {{ 'best': Network, 'average': Network, 'worst': Network }}")
  })
  describe("neat.fitness()", function() {
    it("fitness(dataset) | default sets .score property", function() {
      const neat = new Neat(2,1, { population_size: 2 }) // reduced population to shorten test times

      neat.population[0].score = neat.fitness(data.AND, neat.population[0])

      expect(neat.population[0].score).a("number")
    })
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
