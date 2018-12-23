'use strict'

let expect = require('chai').expect

describe("Group", function() {
  let Group = require('../src/group')
  let Neuron = require('../src/neuron')
  describe("new Group()", function() {
    it("should create a group with default properties", function(done) {
      let group = Group()

      expect(group).to.not.be.null
      expect(group).to.not.be.undefined
      expect(group).to.not.be.NaN
      expect(group).to.exist

      done()
    })
    it("should create a group with an empty neurons array", function(done) {
      let group = Group()

      expect(group.neurons).to.exist
      expect(group.neurons).to.be.an("array")
      expect(group.neurons).to.have.lengthOf(0)

      done()
    })
    
    describe("new Group(n)", function() {
    it("should create a group", function(done) {
      let group = Group(2)

      expect(group).to.not.be.null
      expect(group).to.not.be.undefined
      expect(group).to.not.be.NaN
      expect(group).to.exist

      done()
    })
    it("should create a group with 'n' blank neurons", function(done) {
      let group = Group(2)

      expect(group.neurons).to.exist
      expect(group.neurons).to.be.an("array")
      expect(group.neurons).to.have.lengthOf(2)

      done()
    })
  })
    
    describe("new Group([neuron, neuron])", function() {

      it("should create a group with neurons", function(done) {
        let n0 = new Neuron()
        let n1 = new Neuron()
        let group = Group([n0, n1])

        expect(group).to.not.be.null
        expect(group).to.not.be.undefined
        expect(group).to.not.be.NaN
        expect(group).to.exist

        done()
      })
      it("should create group with existing neurons in it", function(done) {
        let n0 = new Neuron({
          activate: 'cheese'
        })
        let n1 = new Neuron({
          activate: 'cheese'
        })
        let group = Group([n0, n1])

        expect(group.neurons).to.exist
        expect(group.neurons).to.be.an("array")
        expect(group.neurons).to.have.lengthOf(2)
        expect(group.neurons[0]).to.exist
        expect(group.neurons[0].activate).to.be.a("function")

        done()
      })
    })
    
    describe("new Group(group1)", function() {

      it("should create a new group using an existing group", function(done) {
        let group1 = Group(2)
        let group2 = Group(group1)

        expect(group2).to.not.be.null
        expect(group2).to.not.be.undefined
        expect(group2).to.not.be.NaN
        expect(group2).to.exist

        done()
      })
      it("should create group with same amount of neurons", function(done) {
        let group1 = Group(2)
        let group2 = Group(group1)

        expect(group2.neurons).to.exist
        expect(group2.neurons).to.be.an("array")
        expect(group2.neurons).to.have.lengthOf(2)
        expect(group2.neurons[1]).to.exist
        expect(group2.neurons[1]).to.be.an("object")

        done()
      })
    })
  })

  describe(".activate()", function() {
    it("should take an array as a parameter", function(done) {
      let group = Group(3)
      group.activate([Math.random(), Math.random(), Math.random()], function(error, results) {
        expect(error).to.not.exist
        expect(error).to.be.null
        done()
      })
    })
    it("should return an invalid input error", function(done) {
      let group = Group(3)
      group.activate('cheese', function(error, results) {
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
      it("should create a connection between group and neuron", function(done) {
        let n0 = new Neuron()
        let g0 = Group(3)

        g0.connect(n0, function(error, results) {
          expect(error).to.not.exist
          expect(error).to.be.null
          expect(results).to.exist
          expect(results).to.be.an("array")
          expect(results[0].connections).to.exist
          expect(results[0].connections).to.be.an("array")
          expect(results[1].connections).to.have.lengthOf(1)
          expect(results[2].connections[0].to).to.deep.equal(n0)
        })

        done()
      })  
      it("should add connections to destination neuron", function(done) {
        let n0 = new Neuron()
        let g0 = Group(3)

        g0.connect(n0)
        expect(n0.connections).to.exist
        expect(n0.connections).to.be.an("array")
        expect(n0.connections).to.have.lengthOf(3)
        expect(n0.connections[0]).to.be.an("object")

        done()
      })
      it("should add connections to group neurons", function(done) {
        let n0 = new Neuron()
        let g0 = Group(3)

        g0.connect(n0)

        expect(g0.neurons[0].connections).to.exist
        expect(g0.neurons[0].connections).to.be.an("array")
        expect(g0.neurons[0].connections).to.have.lengthOf(1)
        expect(g0.neurons[0].connections[0]).to.be.an("object")
        done()
    })
    })

    describe(".connect(group[, callback])", function() {
      it("should create a connection between groups", function(done) {
        let n0 = new Neuron()
        let n1 = new Neuron()
        let g0 = Group([n0, n1])
        let g1 = Group(g0)

        g0.connect(g1, function(error, results) {
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
      it("should add connections to source group neurons", function(done) {
        let g0 = Group(3)
        let g1 = Group(g0)

        g1.connect(g0)

        expect(g0.neurons[0].connections).to.exist
        expect(g0.neurons[0].connections).to.be.an("array")
        expect(g0.neurons[0].connections).to.have.lengthOf(3)
        expect(g0.neurons[0].connections[2]).to.be.an("object")

        done()
      })
      it("should add connections to destination group neurons", function(done) {
        let g0 = Group(3)
        let g1 = Group(g0)

        g1.connect(g0)

        expect(g1.neurons[0].connections).to.exist
        expect(g1.neurons[0].connections).to.be.an("array")
        expect(g1.neurons[0].connections).to.have.lengthOf(3)
        expect(g1.neurons[0].connections[2]).to.be.an("object")

        done()
      })
    })

    describe(".connect(layer[, callback])", function() {
      it.skip("should create a connection between group and layer", function(done) {

        done()
      })
      it.skip("should add connections to group neurons", function(done) {

      done()
    })
      it.skip("should add connections to layer neurons", function(done) {

        done()
      })
    })
  })
  
  describe(".forward()", function() {
    it("should take an array of numbers as a parameter", function(done) {
      let g0 = Group(4)
      let g1 = Group(g0)
      
      g0.connect(g1)
      
      g0.forward([Math.random(), Math.random(), Math.random(), Math.random()], function(error, results) {
        expect(error).to.not.exist
        expect(error).to.be.null
      })
      
      done()
    })
  })
  
  describe(".backward()", function() {
    it("should take an array of numbers as a parameter", function(done) {
      let g0 = Group(4)
      let g1 = Group(g0)
      
      g0.connect(g1)
      
      g1.backward([Math.random(), Math.random(), Math.random(), Math.random()], function(error, results) {
        expect(error).to.not.exist
        expect(error).to.be.null
      })
      
      done()
    })
  })

  describe(".add_neurons()", function() {
    it("should take a number as a parameter", function(done) {
      let g0 = Group(2)
      
      g0.add_neurons(1, function(error, results) {
        expect(error).to.not.exist
        expect(error).to.be.null
        expect(results).to.exist
        expect(results).to.be.an("array")
        expect(results).to.have.lengthOf(3)
      })
      done()
    })
    it("should take an array of neurons as a parameter", function(done) {
      let n0 = new Neuron()
      let g0 = Group(2)
      
      g0.add_neurons([n0], function(error, results) {
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
})