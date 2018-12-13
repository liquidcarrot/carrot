'use strict'

let expect = require('chai').expect

describe("Layer", function() {
  let Layer = require('../src/layer')
  let Neuron = require('../src/neuron')
  describe("new Layer()", function() {
    it("should create a layer with default properties", function(done) {
      let layer = Layer()

      expect(layer).to.not.be.null
      expect(layer).to.not.be.undefined
      expect(layer).to.not.be.NaN
      expect(layer).to.exist

      done()
    })
    it("should create a layer with an empty neurons array", function(done) {
      let layer = Layer()

      expect(layer.neurons).to.exist
      expect(layer.neurons).to.be.an("array")
      expect(layer.neurons).to.have.lengthOf(0)

      done()
    })
  })

  describe("new Layer(n)", function() {
    it("should create a layer", function(done) {
      let layer = Layer(2)

      expect(layer).to.not.be.null
      expect(layer).to.not.be.undefined
      expect(layer).to.not.be.NaN
      expect(layer).to.exist

      done()
    })
    it("should create a layer with 'n' blank neurons", function(done) {
      let layer = Layer(2)

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
      let layer = Layer([n0, n1])

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
      let layer = Layer([n0, n1])

      expect(layer.neurons).to.exist
      expect(layer.neurons).to.be.an("array")
      expect(layer.neurons).to.have.lengthOf(2)
      expect(layer.neurons[0]).to.exist
      expect(layer.neurons[0].activate).to.be.a("string")

      done()
    })
  })

  describe("new Layer(layer1)", function() {

    it("should create a new layer using an existing layer", function(done) {
      let layer1 = Layer(2)
      let layer2 = Layer(layer1)

      expect(layer2).to.not.be.null
      expect(layer2).to.not.be.undefined
      expect(layer2).to.not.be.NaN
      expect(layer2).to.exist

      done()
    })
    it("should create layer with same amount of neurons", function(done) {
      let layer1 = Layer(2)
      let layer2 = Layer(layer1)

      expect(layer2.neurons).to.exist
      expect(layer2.neurons).to.be.an("array")
      expect(layer2.neurons).to.have.lengthOf(2)
      expect(layer2.neurons[1]).to.exist
      expect(layer2.neurons[1]).to.be.an("object")

      done()
    })
  })

  describe.skip(".activate()", function() {
    it("should create a connection", function(done) {

      done()
    })
    it("should add a connection to source layer", function(done) {

      done()
    })
    it("should add a connection to destination layer", function(done) {
      done()
    })
  })

  describe(".activate([0.7, 0.3, 0.9, ...])", function() {
    it("should run all neurons", function(done) {
      let layer = Layer(3)
      layer.activate([0.7, 0.3, 0.9])
      
      done()
    })
  })

  describe.skip(".connect()", function() {
    it("should return an empty params error", function(done) {
      let l1 = Layer()

      l1.connect()

      done()
    })
  })

  describe(".connect(object)", function() {
    it("should create connections from layer to a neuron", function(done) {
      let n0 = new Neuron()
      let l0 = Layer(3)

      l0.connect(n0)
      expect(n0.connections).to.exist
      expect(n0.connections).to.be.an("array")
      expect(n0.connections).to.have.lengthOf(3)
      expect(n0.connections[1]).to.be.an("object")

      done()
    })
    it("should create connections from layer to another layer", function(done) {
      let l0 = Layer(3)
      let l1 = Layer(l0)

      l1.connect(l0)

      expect(l0.neurons[0].connections).to.exist
      expect(l0.neurons[0].connections).to.be.an("array")
      expect(l0.neurons[0].connections).to.have.lengthOf(3)
      expect(l0.neurons[0].connections[2]).to.be.an("object")

      expect(l1.neurons[0].connections).to.exist
      expect(l1.neurons[0].connections).to.be.an("array")
      expect(l1.neurons[0].connections).to.have.lengthOf(3)
      expect(l1.neurons[0].connections[2]).to.be.an("object")

      done()
    })
    it.skip("should create connections from layer to a group", function(done) {
      let l1 = Layer()

      l1.connect()
      done()
    })
  })

  describe.skip(".add_neurons()", function() {
    it("should take a number as a parameter", function(done) {

      done()
    })
    it("should take an array of numbers as a parameter", function(done) {

      done()
    })
    it("should return a number", function(done) {

      done()
    })
  })
  
  describe.skip(".get_new Neuron(object)", function() {
      it("should create connections from layer to a neuron", function(done) {
        let n0 = new Neuron()
        let l0 = Layer(3)

        l0.connect(n0)
        expect(n0.connections).to.exist
        expect(n0.connections).to.be.an("array")
        expect(n0.connections).to.have.lengthOf(3)
        expect(n0.connections[1]).to.be.an("object")
        
        done()
        })
      it("should create connections from layer to another layer", function(done) {
        let l0 = Layer(3)
        let l1 = Layer(l0)

        l1.connect(l0)
        
        expect(l0.neurons[0].connections).to.exist
        expect(l0.neurons[0].connections).to.be.an("array")
        expect(l0.neurons[0].connections).to.have.lengthOf(3)
        expect(l0.neurons[0].connections[2]).to.be.an("object")
        
        expect(l1.neurons[0].connections).to.exist
        expect(l1.neurons[0].connections).to.be.an("array")
        expect(l1.neurons[0].connections).to.have.lengthOf(3)
        expect(l1.neurons[0].connections[2]).to.be.an("object")
        
        done()
      })
      it.skip("should create connections from layer to a group", function(done) {
        let l1 = Layer()

        l1.connect()
        done()
      })
    })
  
  describe.skip(".get_best()", function() {
    it("should return the neuron with the highest axon value in a layer", function(done) {
      let l0 = Layer(3)

      let best = l0.get_best()
      expect(best).to.exist
      expect(best).to.be.an("object")

      done()
    })
  })
  
})