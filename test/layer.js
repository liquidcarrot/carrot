'use strict'

let expect = require('chai').expect

describe("Layer", function() {
  let Layer = require('../src/layer')
  let Neuron = require('../src/neuron')
  let Connection = require('../src/connection')
  describe("new Layer()", function() {
    it("should create a layer with default properties", function(done) {
      let layer = new Layer()

      expect(layer).to.not.be.null
      expect(layer).to.not.be.undefined
      expect(layer).to.not.be.NaN
      expect(layer).to.exist

      done()
    })
    it("should create a layer with an empty neurons array", function(done) {
      let layer = new Layer()

      expect(layer.neurons).to.exist
      expect(layer.neurons).to.be.an("array")
      expect(layer.neurons).to.have.lengthOf(0)

      done()
    })
    
    describe("new Layer(n)", function() {
    it("should create a layer", function(done) {
      let layer = new Layer(2)

      expect(layer).to.not.be.null
      expect(layer).to.not.be.undefined
      expect(layer).to.not.be.NaN
      expect(layer).to.exist

      done()
    })
    it("should create a layer with 'n' blank neurons", function(done) {
      let layer = new Layer(2)

      expect(layer.neurons).to.exist
      expect(layer.neurons).to.be.an("array")
      expect(layer.neurons).to.have.lengthOf(2)

      done()
    })
  })
    
    describe("new Layer([neuron, neuron])", function() {

      it("should create a layer with neurons", function(done) {
        let n0 = new Neuron()
        let n1 = new Neuron()
        let layer = new Layer([n0, n1])

        expect(layer).to.not.be.null
        expect(layer).to.not.be.undefined
        expect(layer).to.not.be.NaN
        expect(layer).to.exist

        done()
      })
      it("should create layer with existing neurons in it", function(done) {
        let n0 = new Neuron({
          activate: 'cheese'
        })
        let n1 = new Neuron({
          activate: 'cheese'
        })
        let layer = new Layer([n0, n1])

        expect(layer.neurons).to.exist
        expect(layer.neurons).to.be.an("array")
        expect(layer.neurons).to.have.lengthOf(2)
        expect(layer.neurons[0]).to.exist
        expect(layer.neurons[0].activate).to.be.a("function")

        done()
      })
    })
    
    describe("new Layer(layer1)", function() {

      it("should create a new layer using an existing layer", function(done) {
        let layer1 = new Layer(2)
        let layer2 = new Layer(layer1)

        expect(layer2).to.not.be.null
        expect(layer2).to.not.be.undefined
        expect(layer2).to.not.be.NaN
        expect(layer2).to.exist

        done()
      })
      it("should create layer with same amount of neurons", function(done) {
        let layer1 = new Layer(2)
        let layer2 = new Layer(layer1)

        expect(layer2.neurons).to.exist
        expect(layer2.neurons).to.be.an("array")
        expect(layer2.neurons).to.have.lengthOf(2)
        expect(layer2.neurons[1]).to.exist
        expect(layer2.neurons[1]).to.be.an("object")

        done()
      })
    })
  })

  describe(".activate()", function() {
    it("should take an array as a parameter", function(done) {
      let layer = new Layer(3)
      layer.activate([Math.random(), Math.random(), Math.random()], function(error, results) {
        expect(error).to.not.exist
        expect(error).to.be.null
        done()
      })
    })
    it("should return an invalid input error", function(done) {
      let layer = new Layer(3)
      layer.activate('cheese', function(error, results) {
        expect(error).to.exist
        expect(error).to.not.be.null
        expect(results).to.not.exist
        expect(results).to.be.undefined
        done()
      })
    })
  })
  
  describe(".connect()", function() {
    
    describe(".connect(neuron[, callback])", function() {
      it("should create a connection between layer and neuron", function(done) {
        let n0 = new Neuron()
        let l0 = new Layer(3)

        l0.connect(n0, function(error, results) {
          expect(error).to.not.exist
          expect(error).to.be.null
          expect(results).to.exist
          expect(results).to.be.an("array")
          expect(results[0]).to.exist
          expect(results[0]).to.be.an.instanceOf(Connection)
          expect(results[2].to).to.deep.equal(n0)
        })

        done()
      })  
      it("should add connections to destination neuron", function(done) {
        let n0 = new Neuron()
        let l0 = new Layer(3)

        l0.connect(n0)
        expect(n0.connections).to.exist
        expect(n0.connections).to.be.an("array")
        expect(n0.connections).to.have.lengthOf(3)
        expect(n0.connections[0]).to.be.an("object")

        done()
      })
      it("should add connections to layer neurons", function(done) {
        let n0 = new Neuron()
        let l0 = new Layer(3)

        l0.connect(n0)

        expect(l0.neurons[0].connections).to.exist
        expect(l0.neurons[0].connections).to.be.an("array")
        expect(l0.neurons[0].connections).to.have.lengthOf(1)
        expect(l0.neurons[0].connections[0]).to.be.an("object")
        done()
    })
    })

    describe(".connect(layer[, callback])", function() {
      it("should create a connection between layers", function(done) {
        let n0 = new Neuron()
        let n1 = new Neuron()
        let l0 = new Layer([n0, n1])
        let l1 = new Layer(l0)

        l0.connect(l1, function(error, results) {
          expect(error).to.not.exist
          expect(error).to.be.null
          expect(results).to.exist
          expect(results).to.not.be.null
          expect(results).to.be.an("array")
          expect(n0.connections).to.exist
          expect(n0.connections).to.be.an("array")
          expect(n0.connections).to.have.lengthOf(2)
          expect(n0.connections[1]).to.be.an("object")
        })

        done()
      })
      it("should add connections to source layer neurons", function(done) {
        let l0 = new Layer(3)
        let l1 = new Layer(l0)

        l1.connect(l0)

        expect(l0.neurons[0].connections).to.exist
        expect(l0.neurons[0].connections).to.be.an("array")
        expect(l0.neurons[0].connections).to.have.lengthOf(3)
        expect(l0.neurons[0].connections[2]).to.be.an("object")

        done()
      })
      it("should add connections to destination layer neurons", function(done) {
        let l0 = new Layer(3)
        let l1 = new Layer(l0)

        l1.connect(l0)

        expect(l1.neurons[0].connections).to.exist
        expect(l1.neurons[0].connections).to.be.an("array")
        expect(l1.neurons[0].connections).to.have.lengthOf(3)
        expect(l1.neurons[0].connections[2]).to.be.an("object")

        done()
      })
    })

    describe.skip(".connect(group[, callback])", function() {
      it.skip("should create a connection between layer and group", function(done) {

        done()
      })
      it.skip("should add connections to layer neurons", function(done) {

      done()
    })
      it.skip("should add connections to group neurons", function(done) {

        done()
      })
    })
  })
  
  describe(".forward()", function() {
    it("should take an array of numbers as a parameter", function(done) {
      let l0 = new Layer(4)
      let l1 = new Layer(l0)
      
      l0.connect(l1)
      
      l0.forward([Math.random(), Math.random(), Math.random(), Math.random()], function(error, results) {
        expect(error).to.not.exist
        expect(error).to.be.null
      })
      
      done()
    })
  })
  
  describe(".backward()", function() {
    it("should take an array of numbers as a parameter", function(done) {
      let l0 = new Layer(4)
      let l1 = new Layer(l0)
      
      l0.connect(l1)
      
      l1.backward([Math.random(), Math.random(), Math.random(), Math.random()], function(error, results) {
        expect(error).to.not.exist
        expect(error).to.be.null
      })
      
      done()
    })
  })

  describe(".add_neurons()", function() {
    it("should take a number as a parameter", function(done) {
      let l0 = new Layer(2)
      
      l0.add_neurons(1, function(error, results) {
        expect(error).to.not.exist
        expect(error).to.be.null
        expect(results).to.exist
        expect(results).to.be.an("array")
        expect(results[0]).to.equal(3)
      })
      done()
    })
    it("should take an array of neurons as a parameter", function(done) {
      let n0 = new Neuron()
      let l0 = new Layer(2)
      
      l0.add_neurons([n0], function(error, results) {
        expect(error).to.not.exist
        expect(error).to.be.null
        expect(results).to.exist
        expect(results).to.be.an("array")
        expect(results).to.have.lengthOf(3)
        expect(results.neurons[2]).to.deep.equal(n0)
      })
      
      done()
    })
  })
  
  describe.skip(".get_neuron(name)", function() {
    it("should return an array of neurons", function(done) {
      let n0 = new Neuron()
      let l0 = new Layer(3)

      l0.connect(n0)
      expect(n0.connections).to.exist
      expect(n0.connections).to.be.an("array")
      expect(n0.connections).to.have.lengthOf(3)
      expect(n0.connections[1]).to.be.an("object")

      done()
    })
  })
  
  describe.skip(".get_best()", function() {
    it.skip("should return the neuron with the highest axon value in a layer", function(done) {

      done()
    })
  })
})