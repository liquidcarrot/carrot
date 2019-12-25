const { assert, expect } = require('chai');
const should = require('chai').should();
const chalk = require('chalk');

const { Population, Network, methods } = require('../../../src/carrot');

describe("Population", () => {
  describe("new Population()", function() {
    it.skip("new Population()", function() {
      this.timeout(10000)
      const population = new Population();
      is.population(population);
    })
    it("new Population({ inputs: 2, outputs: 2 }) | Population members have shared connIds reference", function() {
      const population = new Population({ inputs: 4, outputs: 4, size: 3 });
      for(let i = 0; i < population.members.length; i++) {
        expect(population.members[i].connIds).to.exist // avoids name changes giving false positives
        expect(population.members[i].connIds).equal(population.connIds)
      }
    })
    it("new Population({ inputs: 2, outputs: 2 }) | Adding a node to one population member updates all", function() {
      const population = new Population({ inputs: 2, outputs: 2 });
      population.members[0].mutate(methods.mutation.ADD_NODE); // Adds an entry to the internal population-level connIds object

      for(let i = 0; i < population.members.length; i++) {
        expect(population.members[i].connIds).to.exist; // avoids name changes giving false positives
        // 4 initial entries (2x2) plus the 2 new ones from ADD_NODE and the .last entry
        expect(Object.keys(population.members[i].connIds).length).equal(7);
      }
    })
    it.skip("new Population({...})", function() {
      this.timeout(10000)
      const options = random.options.population();
      const population = new Population(options);

      is.population(population);
      has.options(population, options);
    })
    it.skip("new Population({ dataset })", function() {
      this.timeout(10000)
      const dataset = data.XNOR;
      const population = new Population(dataset);

      is.population(population);
      has.dataset(population, dataset);
    })
    it.skip("new Population({ input, output })", function() {
      this.timeout(10000)
      const inputs = _.random(1,50);
      const outputs = _.random(1,50)
      const population = new Population(inputs, outputs);

      is.population(population);
      has.dimensions(population, inputs, outputs);
    })
    it.skip("new Population({ dataset, ... })", function() {
      this.timeout(10000)
      const dataset = data.XNOR;
      const options = random.options.population();

      const population = new Population(dataset, options);

      is.population(population);
      has.dataset(population, dataset);
      has.options(population, options);

    })
    it.skip("new Population({ input, output, ... })", function() {
      this.timeout(10000)
      const inputs = _.random(1,50);
      const outputs = _.random(1,50);
      const options = random.options.population();

      const population = new Population(inputs, outputs, options);

      is.population(population);
      has.options(population, options);
      has.dimensions(population, inputs, outputs);
    })
    it.skip("new Population({ input, output, dataset })", function() {
      this.timeout(10000)
      const inputs = _.random(1,50);
      const outputs = _.random(1,50);
      const dataset = data.XNOR;

      const population = new Population(inputs, outputs, dataset);

      is.population(population);
      has.dataset(population, dataset);
      has.dimensions(population, inputs, outputs);
    })
    it.skip("new Population({ input, output, dataset, ... })", function() {
      this.timeout(10000)
      const inputs = _.random(1, 50);
      const outputs = _.random(1, 50);
      const dataset = data.XNOR;
      const options = random.options.population();

      const population = new Population(inputs, outputs, dataset, options);

      is.population(population);
      has.dataset(population, dataset);
      has.options(population, options);
      has.dimensions(population, inputs, outputs);
    })
  })
  describe("population.getPopulation()", function() {
    it("population.getPopulation() => {Network[]}", function() {
      const population = new Population();
      const members = population.getPopulation();

      expect(members).to.be.an.instanceof(Array);
      expect(members).to.have.lengthOf.above(0);

      for (let genome = 0; genome < members.length; genome++) {
        expect(members[genome]).to.be.an.instanceOf(Network);
      }
    })

    it("population.getPopulation() | Shouldn't return shallow copies", function() {
      const population = new Population()
      const members = population.getPopulation()

      expect(members[0]).not.equal(members[1])
    })

    it.skip("population.getPopulation(network) => {Network[]}", function() {
      const inputs = Math.ceil(Math.random() * 10);
      const outputs = Math.ceil(Math.random() * 10);
      const network = new Network(inputs, outputs);

      const population = new Population();

      const members = population.getPopulation(network);

      expect(members).to.be.an.instanceof(Array);
      expect(members).to.have.lengthOf.above(0);

      for (let genome = 0; genome < members.length; genome++) {
        expect(members[genome]).to.be.an.instanceOf(Network);
        expect(members[genome].input_size).to.equal(inputs);
        expect(members[genome].output_size).to.equal(outputs);
      }
    })

    it.skip("population.getPopulation(network) | Shouldn't return shallow copies", function() {
      const inputs = Math.ceil(Math.random() * 10);
      const outputs = Math.ceil(Math.random() * 10);
      const network = new Network(inputs, outputs);

      const population = new Population();
      const members = population.getPopulation(network);

      expect(members[0]).not.equal(members[1]);
    })

    it.skip("population.getPopulation(size) => {Network[]}", function() {
      const size = Math.ceil(Math.random() * 100);

      const population = new Population();
      const pop_size = population.getPopulation(size);

      expect(population).to.be.an.instanceof(Array);
      expect(population).to.have.lengthOf(size);

      for (let genome = 0; genome < population.length; genome++) {
        expect(population[genome]).to.be.an.instanceOf(Network);
      }
    })

    it.skip("population.getPopulation(size) | Shouldn't return shallow copies", function() {
      const size = Math.ceil(Math.random() * 100);

      const population = new Population();
      const pop_size = population.getPopulation(size);

      expect(population[0]).not.equal(population[1]);
    })

    it.skip("population.getPopulation(network, size) => {Network[]}", function() {
      const size = Math.ceil(Math.random() * 100);

      const inputs = Math.ceil(Math.random() * 10);
      const outputs = Math.ceil(Math.random() * 10);
      const network = new Network(inputs, outputs);

      const population = new Population();
      const population = population.getPopulation(network, size);

      expect(population).to.be.an.instanceof(Array);
      expect(population).to.have.lengthOf(size);

      for (let genome = 0; genome < population.length; genome++) {
        expect(population[genome]).to.be.an.instanceOf(Network);
        expect(population[genome].input_size).to.equal(inputs);
        expect(population[genome].output_size).to.equal(outputs);
      }
    })

    it.skip("population.getPopulation(network, size) | Shouldn't return shallow copies", function() {
      const size = Math.ceil(Math.random() * 100);

      const inputs = Math.ceil(Math.random() * 10);
      const outputs = Math.ceil(Math.random() * 10);
      const network = new Network(inputs, outputs);

      const population = new Population();
      const population = population.getPopulation(network, size);

      expect(population[0]).not.equal(population[1]);
    })

  })
  describe.skip("population.activate()", () => {})
  describe.skip("population.propagate()", () => {})
  describe.skip("population.replace()", function() {
    it("population.replace() => {ReferenceError}", function() {
      const population = new Population();

      expect(() => population.replace()).to.throw(ReferenceError);
    })

    it("population.replace(transform=Network) => {Network[]}", function() {
      const inputs = Math.ceil(Math.random() * 10);
      const outputs = Math.ceil(Math.random() * 10);
      const network = new Network(inputs, outputs);

      const population = new Population();
      const population = population.replace(network);

      expect(population).to.be.an.instanceOf(Array);
      expect(population).to.have.lengthOf(population.population.length);

      for (let genome = 0; genome < population; genome++) {
        expect(population[genome]).to.be.an.instanceOf(Network);
        expect(population[genome]).to.not.eql(population.population[genome]);
      }
    })
    it("population.replace(transform=Function) => {Network[]}", function() {
      const transform = function(network, index, population) {
        network["RANDOM_KEY"] = index;
      }

      const population = new Population();
      const population = population.replace(transform);

      expect(population).to.be.an.instanceOf(Array);
      expect(population).to.be.an.lengthOf(population.population.length);

      for (let genome = 0; genome < population; genome++) {
        expect(population[genome]).to.be.an.instanceOf(Network);
        expect(population[genome]["RANDOM_KEY"]).to.equal(genome);
      }
    })

    it("population.replace(filter=number, transform=Network) => {Network[]}", function() {
      const index = Math.ceil(Math.random() * 50);
      const inputs = Math.ceil(Math.random() * 10);
      const outputs = Math.ceil(Math.random() * 10);
      const network = new Network(inputs, outputs);

      const population = new Population();
      const population = population.replace(index, network);

      expect(population).to.be.an.instanceOf(Array);
      expect(population).to.have.lengthOf(population.population.length);

      for (let genome = 0; genome < population; genome++) {
        expect(population[genome]).to.be.an.instanceOf(Network);

        if(genome === index) {
          expect(population[genome]).to.not.eql(population.population[genome]);
          expect(population[genome]).to.eql(network);
        } else {
          expect(population[genome]).to.equal(population.population[genome]);
        }
      }
    })
    it("population.replace(filter=number, transform=Function) => {Network[]}", function() {
      const index = Math.ceil(Math.random() * 50);
      const transform = function(network, index, population) {
        network["RANDOM_KEY"] = index;
      }

      const population = new Population();
      const population = population.replace(index, transform);

      expect(population).to.be.an.instanceOf(Array);
      expect(population).to.have.lengthOf(population.population.length);

      for (let genome = 0; genome < population; genome++) {
        expect(population[genome]).to.be.an.instanceOf(Network);

        if(genome === index) {
          expect(population[genome]).to.not.eql(population.population[genome]);
          expect(population[genome]["RANDOM_KEY"]).to.equal(genome);
        } else {
          expect(population[genome]).to.equal(population.population[genome]);
        }
      }
    })

    it("population.replace(filter=Network, transform=Network) => {Network[]}", function() {
      const population = new Population();

      const index = Math.floor(Math.random() * population.population.length);
      const network = population.population[index];

      const inputs = Math.ceil(Math.random() * 10);
      const outputs = Math.ceil(Math.random() * 10);
      const other_network = new Network(inputs, outputs);

      const population = population.replace(network, other_network);

      expect(population).to.be.an.instanceOf(Array);
      expect(population).to.have.lengthOf(population.population.length);

      for (let genome = 0; genome < population; genome++) {
        expect(population[genome]).to.be.an.instanceOf(Network);

        if(genome === index) {
          expect(population[genome]).to.not.eql(population.population[genome]);
          expect(population[genome]).to.eql(network);
        } else {
          expect(population[genome]).to.equal(population.population[genome]);
        }
      }
    })
    it("population.replace(filter=Network, transform=Function) => {Network[]}", function() {
      const population = new Population();

      const index = Math.floor(Math.random() * population.population.length);
      const network = population.population[index];

      const other_index = Math.ceil(Math.random() * 50);
      const transform = function(network, index, population) {
        network["RANDOM_KEY"] = index;
      }

      const population = population.replace(network, transform);

      expect(population).to.be.an.instanceOf(Array);
      expect(population).to.have.lengthOf(population.population.length);

      for (let genome = 0; genome < population; genome++) {
        expect(population[genome]).to.be.an.instanceOf(Network);

        if(genome === index) {
          expect(population[genome]).to.eql(population.population[genome]);
          expect(population[genome]).to.eql(network);
          expect(population[genome]["RANDOM_KEY"]).to.equal(genome);
        } else {
          expect(population[genome]).to.equal(population.population[genome]);
        }
      }
    })

    it("population.replace(filter=Function, transform=Network) => {Network[]}", function() {
      const indexes = [3, 6];
      const filter = function(network, index, population) {
        const indexes = [3, 6];
        return indexes.includes(index);
      }

      const inputs = Math.ceil(Math.random() * 10);
      const outputs = Math.ceil(Math.random() * 10);
      const network = new Network(inputs, outputs);

      const population = new Population();

      const population = population.replace(filter, network);

      expect(population).to.be.an.instanceOf(Array);
      expect(population).to.have.lengthOf(population.population.length);

      for (let genome = 0; genome < population; genome++) {
        expect(population[genome]).to.be.an.instanceOf(Network);

        if(indexes.includes(genome)) {
          expect(population[genome]).to.not.eql(population.population[genome]);
          expect(population[genome]).to.eql(network);
        } else {
          expect(population[genome]).to.equal(population.population[genome]);
        }
      }
    })
    it("population.replace(filter=Function, transform=Function) => {Network[]}", function() {
      const indexes = [3, 6];
      const filter = function(network, index, population) {
        const indexes = [3, 6];
        return indexes.includes(index);
      }

      const index = Math.ceil(Math.random() * 50);
      const transform = function(network, index, population) {
        network["RANDOM_KEY"] = index;
      }

      const population = new Population();

      const population = population.replace(filter, transform);

      expect(population).to.be.an.instanceOf(Array);
      expect(population).to.have.lengthOf(population.population.length);

      for (let genome = 0; genome < population; genome++) {
        expect(population[genome]).to.be.an.instanceOf(Network);

        if(indexes.includes(genome)) {
          expect(population[genome]).to.eql(population.population[genome]);
          expect(population[genome]).to.eql(network);
          expect(population[genome]["RANDOM_KEY"]).to.equal(genome);
        } else {
          expect(population[genome]).to.equal(population.population[genome]);
        }
      }
    })

    // STATIC - Should be static functions
    it("population.replace(population, transform=Network) => {Network[]}")
    it("population.replace(population, transform=Function) => {Network[]}")
    it("population.replace(population, filter=number, transform=Network) => {Network[]}")
    it("population.replace(population, filter=number, transform=Function) => {Network[]}")
    it("population.replace(population, filter=Network, transform=Network) => {Network[]}")
    it("population.replace(population, filter=Network, transform=Function) => {Network[]}")
    it("population.replace(population, filter=Function, transform=Network) => {Network[]}")
    it("population.replace(population, filter=Function, transform=Function) => {Network[]}")
  })
  describe.skip("population.resize()", function() {
    it("population.resize() | throws an Error", function() {
      let population = new Population()

      assert.throws(population.resize, Error)
    })
    it("population.resize(*) => {Network[]}", function() {
      let population = new Population()
      let population2 = new Population()

      expect(population.resize(3)).an("array")
      expect(population.resize(population2.population)).an("array")
      expect(population.resize(2)).an("array")
    })
    it("population.resize(*) | population_size equals population.length", function() {
      let population = new Population({ population_size: 3 })

      population.resize(5)

      expect(population.population_size).equals(population.population.length)
    })
    it("population.resize(network[]) => {Network[]} | population_size increased by network[] length", function() {
      let population = new Population({ population_size: 1 })
      let population2 = new Population({ population_size: 1 })

      population.resize(population2.population)

      expect(population.population_size).equals(2)
    })
    it("new Population({ population_size: 1 }), population.resize(number) => {Network[]} | number > population, size increased to number", function() {
      let population = new Population({ population_size: 1 })

      population.resize(2)

      expect(population.population.length).equals(2)
    })
    it("population.resize(number) => {Network[]} | number > population, size increased to number", function() {
      let population = new Population({ population_size: 2 })

      population.resize(5)

      expect(population.population.length).equals(5)
    })
    it("population.resize(number) => {Network[]} | number < population, size decreased to number", function() {
      let population = new Population({ population_size: 2 })

      population.resize(1)

      expect(population.population.length).equals(1)
    })
  })
  describe.skip("population.mutate()", function() {
    it("population.mutate() => {Network[]}", function() {
      const population = new Population()

      expect(population.mutate()).to.be.an('array')
    })

    it("population.mutate({ mutation_rate: 1 }) | original != new", function() {
      const population = new Population({ mutation_rate: 1 })

      const original = population.population.map(function(network) {
        return _.cloneDeep(network)
      })

      // ensure deep copies
      expect(population.population[0]).not.equal(original[0])
      expect(population.population[0]).not.equal(population.population[1])

      // create mutations
      population.population = population.mutate()

      // they should be different
      expect(population.population[0]).not.eql(original[0])
    })

    it("population.mutate(ADD_NODE) => {Network[]}", function() {
      const population = new Population()

      expect(population.mutate(methods.mutation.ADD_NODE)).to.be.an('array')
    })

    it("population.mutate(ADD_NODE) | original != new", function() {
      const population = new Population()

      const original = population.population.map(function(network) {
        return _.cloneDeep(network)
      })

      population.population = population.mutate(methods.mutation.ADD_NODE)

      expect(population.population[0]).not.eql(original[0])
    })

    it("population.mutate(mutation) & Population({ mutation_amount: 10, mutation_rate: 1 }) | Should mutate 10 times", function() {
      const population = new Population({ population_size: 1, mutation_amount: 10, mutation_rate: 1 })

      population.population = population.mutate(methods.mutation.ADD_NODE)

      expect(population.population[0].nodes.length).equal(12)
    })

    it("population.mutate(mutation) & Population({ mutation_amount: 10, mutation_rate: 1, maxNodes: 8 }) | Networks should have 8 nodes", function() {
      const population = new Population({ population_size: 1, mutation_amount: 10, mutation_rate: 1, maxNodes: 8 })

      population.population = population.mutate(methods.mutation.ADD_NODE)

      expect(population.population[0].nodes.length).equal(8)
    })

    // To be implemented
    it("population.mutate(mutation[]) => {Network[]}", function() {

    })
    it("population.mutate(genomes=Network) => {Network}", function () {})
    it("population.mutate(genomes=Network[]) => {Network[]}", function () {})
    it("population.mutate(genomes=Network, methods=mutation) => {Network}", function () {})
    it("population.mutate(genomes=Network, methods=mutation[]) => {Network}", function () {})
    it("population.mutate(genomes=Network[], methods=mutation) => {Network[]}", function () {})
    it("population.mutate(genomes=Network[], methods=mutation[]) => {Network[]}", function () {})
  })
  describe.skip("population.evolve()", function() {
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

    it("population.evolve() => {Network[]}", async function() {

      const population = new Population(2,1);

      const newPopulation = await population.evolve(data.XNOR);

      expect(newPopulation).to.be.an('array')
    })

    it("population.evolve() | NewPopulation is sorted", async function() {
      this.timeout(40000)

      const population = new Population(2,1);

      const best = await population.evolve(data.XNOR);

      await areSorted(population.population)
    })
// --------------------------------------------------------------
    it("new Population(), population.evolve() | Runs, .score set", async function () {
      const population = new Population(2,1, { population_size: 2 }) // reduced population to shorten test times

      let { population } = population

      // set dummy scores
      population = population.map((network, index) => {
        network.score = index

        return network
      })

      // deep copy original population
      const originalPopulation = population.map(network => network.clone())

      population = population.population = await population.evolve()

      expect(population).not.eql(originalPopulation)
    })

    it("new Population(), population.evolve() | Throws error, missing .score", async function () {
      const population = new Population(2,1, { population_size: 2 }) // reduced population to shorten test times

      population.evolve().should.be.rejected
    })

    it("new Population(), population.evolve(null) | Runs, .score set", async function () {
      const population = new Population(2,1, { population_size: 2 }) // reduced population to shorten test times

      let { population } = population

      // set dummy scores
      population = population.map((network, index) => {
        network.score = index

        return network
      })

      // deep copy original population
      const originalPopulation = population.map(network => network.clone())

      population = population.population = await population.evolve(null)

      expect(population).not.eql(originalPopulation)
    })

    it("new Population(), population.evolve(null, filter, adjust) | Runs, .score set", async function () {
      const population = new Population(2,1, { population_size: 2 }) // reduced population to shorten test times

      let { population } = population

      // set dummy scores
      population = population.map((network, index) => {
        network.score = index

        return network
      })

      // deep copy original population
      const originalPopulation = population.map(network => network.clone())

      population = population.population = await population.evolve(null, (network) => network, (network) => network)

      expect(population).not.eql(originalPopulation)
    })

    it("new Population(), population.evolve(null, filter) | Throws error, missing adjust", async function () {
      const population = new Population(2,1, { population_size: 2 }) // reduced population to shorten test times

      let { population } = population

      // set dummy scores
      population = population.map((network, index) => {
        network.score = index

        return network
      })

      population.evolve(null, (network) => network).should.be.rejected
    })

    it("new Population(), population.evolve() | Generation count = number", async function () {
      const population = new Population(2,1, { population_size: 2 }) // reduced population to shorten test times

      expect(population.generation).a("number")
    })

    it("new Population(), population.evolve() | Generation count increases", async function () {
      const population = new Population(2,1, { population_size: 2 }) // reduced population to shorten test times

      let { population } = population

      // set dummy scores
      population = population.map((network, index) => {
        network.score = index

        return network
      })

      population = population.population = await population.evolve()

      expect(population.generation).equal(1)
    })
// --------------------------------------------------------------
    it("new Population(dataset), Population.evolve()", async function () {
      const population = new Population(2, 1, data.OR, { population_size: 1 })

      let { population } = population

      // set initial scores
      population = population.map(network => {
        network.score = -Infinity
        return network
      })

      population = population.population = await population.evolve()

      expect(population[0].score).above(-Infinity)
    })

    it("new Population(dataset), Population.evolve(null)", async function () {
      const population = new Population(2, 1, data.OR, { population_size: 1 })

      let { population } = population

      // set initial scores
      population = population.map(network => {
        network.score = -Infinity
        return network
      })

      population = population.population = await population.evolve(null)

      expect(population[0].score).above(-Infinity)
    })

    it("new Population(dataset), Population.evolve(null, filter, adjust)", async function () {
      const population = new Population(2, 1, data.OR, { population_size: 1 })

      let { population } = population

      // set initial scores
      population = population.map(network => {
        network.score = -Infinity
        return network
      })

      population.evolve(null, (network) => network, (network) => network).should.be.rejected
    })

    it("new Population(dataset), Population.evolve(null, filter) | Throws error, missing adjust", async function () {
      const population = new Population(2, 1, data.OR, { population_size: 1 })

      let { population } = population

      // set initial scores
      population = population.map(network => {
        network.score = -Infinity
        return network
      })

      population.evolve(null, (network) => network).should.be.rejected
    })

    it("new Population(dataset), Population.evolve() | Generation count = number", async function () {
      const population = new Population(2, 1, data.OR, { population_size: 1 })

      let { population } = population

      // set initial scores
      population = population.map(network => {
        network.score = -Infinity
        return network
      })

      population = population.population = await population.evolve()

      expect(population.generation).a("number")
    })

    it("new Population(dataset), Population.evolve() | Generation count increases", async function () {
      const population = new Population(2, 1, data.OR, { population_size: 1 })

      let { population } = population

      // set initial scores
      population = population.map(network => {
        network.score = -Infinity
        return network
      })

      population = population.population = await population.evolve()

      expect(population.generation).equal(1)
    })
// --------------------------------------------------------------
    it("new Population(), population.evolve(otherSet)", async function () {
      const population = new Population(2,1, { population_size: 2 })

      const originalPopulation = population.population.map(network => network.clone())

      population.population = await population.evolve(data.XOR)

      expect(population.population).not.eql(originalPopulation)
    })

    it("new Population(), population.evolve(otherSet, filter, adjust)", async function () {
      const population = new Population(2,1, { population_size: 2 })

      const originalPopulation = population.population.map(network => network.clone())

      population.population = await population.evolve(data.XOR, (network) => network, (network) => network)

      expect(population.population).not.eql(originalPopulation)
    })

    it("new Population(), population.evolve(otherSet, filter) | Throws error, missing adjust", async function () {
      const population = new Population(2,1, { population_size: 2 })

      const originalPopulation = population.population.map(network => network.clone())

      population.evolve(data.XOR, (network) => network).should.be.rejected
    })

    it("new Population(), population.evolve(otherSet) | Generation count = number", async function () {
      const population = new Population(2,1, { population_size: 2 })

      const originalPopulation = population.population.map(network => network.clone())

      population.population = await population.evolve(data.XOR)

      expect(population.generation).a("number")
    })

    it("new Population(), population.evolve(otherSet) | Generation count increases", async function () {
      const population = new Population(2,1, { population_size: 2 })

      const originalPopulation = population.population.map(network => network.clone())

      population.population = await population.evolve(data.XOR)

      expect(population.generation).equal(1)
    })
// --------------------------------------------------------------
    it("new Population(dataset), Population.evolve(otherSet) | Should prioritize otherSet for training", async function () {
      this.timeout(10000)

      const population = new Population(2, 1, data.XOR, { population_size: 5 }) // reduced population size to speed up test

      // .evolve should prioritize AND set
      const evolvePop = async function(n, population) {
        if(n === 0) return population

        population.population = await population.evolve(data.AND)

        return evolvePop(n-1, population)
      }

      const { population } = await evolvePop(200, population)

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

    it("new Population(dataset), Population.evolve(otherSet, filter, adjust)", async function () {
      this.timeout(10000)

      const population = new Population(2, 1, data.XOR, { population_size: 5 }) // reduced population size to speed up test

      // .evolve should prioritize AND set
      const evolvePop = async function(n, population) {
        if(n === 0) return population

        population.population = await population.evolve(data.AND, (network) => network, (network) => network)

        return evolvePop(n-1, population)
      }

      const { population } = await evolvePop(200, population)

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

    it("new Population(dataset), Population.evolve(otherSet) | Generation count = number", async function () {
      const population = new Population(2, 1, data.XOR, { population_size: 5 }) // reduced population size to speed up test

      await population.evolve(data.AND)

      expect(population.generation).a("number")
    })

    it("new Population(dataset), Population.evolve(otherSet) | Generation count increases", async function () {
      const population = new Population(2, 1, data.XOR, { population_size: 5 }) // reduced population size to speed up test

      await population.evolve(data.AND)

      expect(population.generation).equal(1)
    })
// --------------------------------------------------------------
    it("population.evolve(options) => {Network}")
    it("population.evolve(dataset, options) => {Network}")
    it("population.evolve(genomes, dataset, options) => {Network}") // Should be static
  })
  describe.skip("population.getParent()", function() {
    it("population.getParent() => {Network}")
    it("population.getParent(method) => {Network}") // Hard to test the marginal functionallity over `population.getParent()`
  })
  describe.skip("population.getOffspring()", function() {
    it("population.getOffspring() => {Network}")
  })
  describe.skip("population.evaluate()", function() {
    it("new Population(), population.evaluate() | Throws error", async function() {
      const population = new Population(2,1, { population_size: 2 }) // reduced population to shorten test times

      population.evaluate().should.be.rejected
    })

    it("new Population(), population.evaluate(dataset) | Should resolve and set .score", async function() {
      const population = new Population(2,1, { population_size: 2 }) // reduced population to shorten test times

      await population.evaluate(data.AND)

      expect(population.population[0].score).a("number")
    })

    it("new Population(dataset), population.evaluate() | Should resolve and set .score", async function() {
      const population = new Population(2,1, data.AND, { population_size: 2 }) // reduced population to shorten test times

      await population.evaluate()

      expect(population.population[0].score).a("number")
    })

    it.skip("new Population(dataset), population.evaluate(otherSet) | should prioritize otherSet", async function() {
      const population = new Population(2,1, data.AND, { population_size: 2 }) // reduced population to shorten test times

      await population.evaluate()

      expect(population.population[0].score).a("number")
    })

    it("population.evaluate() => {Network[]}")
    it("population.evaluate(dataset) => {Object}")
    it("population.evaluate(options={ 'clear': true, networks': true }) => {{ 'best': Network, 'average': Network, 'worst': Network }}")
    it("population.evaluate(dataset, { 'clear': true, networks': true }) => {{ 'best': Network, 'average': Network, 'worst': Network }}")
  })
  describe.skip("population.fitness()", function() {
    it("fitness(dataset) | default sets .score property", function() {
      const population = new Population(2,1, { population_size: 2 }) // reduced population to shorten test times

      population.population[0].score = population.fitness(data.AND, population.population[0])

      expect(population.population[0].score).a("number")
    })
  })
  describe.skip("population.sort()", function() {
    it("population.sort() => {Network[]}")
  })
  describe.skip("population.getBest()", function() {
    it("population.getFittest() => {Network}")
  })
  describe.skip("population.getAverage()", function() {
    it("population.getAverage() => {Network}")
  })
  describe.skip("population.toJSON()", function() {
    it("population.toJSON() => {Object}")
  })
  describe.skip("Population.fromJSON()", function() {
    it("population.fromJSON() => {ReferenceError}")
    it("population.fromJSON(json) => {Population}")
  })
})
