'use strict'

let _ = require('lodash')
let faker = require('faker')
let chai = require('chai')

chai.use(require('chai-each'))

let expect = chai.expect

describe("Network", function() {
  let Neuron = require('../src/neuron')
  let Network = require('../src/network')
  
  describe("new Network()", function() {
    let network = new Network()
    
    it("should create a network", function(done) {
      expect(network).to.exist
      expect(network).to.be.an.instanceOf(Network)
      
      done()
    })
    it("should create an empty network AKA no neurons", function(done) {
      expect(network.neurons).to.exist
      expect(network.neurons).to.be.an("array")
      expect(network.neurons).to.have.lengthOf(0)
      
      done()
    })
    
    describe("new Network([n])", function() {
      let sizes = _.times(Math.round(Math.random() * 10 + 1), function() {
        return Math.round(Math.random() * 10 + 1)
      })
      let network = new Network(sizes)
      
      it("should create a network", function(done) {
        expect(network).to.exist
        expect(network).to.be.an.instanceOf(Network)
        
        done()
      })
      it("should create a network with the same number of neurons as the sum of the given array", function(done) {
        expect(network.neurons).to.exist
        expect(network.neurons).to.be.an("array")
        expect(network.neurons).to.each.be.an.instanceOf(Neuron)
        expect(network.neurons).to.have.lengthOf(_.sum(sizes))
        
        done()
      })
      it("should create a layer for every item in `sizes` and connect it with the next created layer", function(done) {
        // For every created layer, but the last...
        _.each(_.slice(sizes, 0, sizes.length - 1), function(length, size_index) {
          _.times(length, function(layer_index) {
            // ...check that the outgoing connections match the length of the next layer
            expect(network.neurons[_.sum(_.slice(sizes, 0, size_index)) + layer_index].connections.outgoing).to.have.lengthOf(sizes[size_index + 1])
          })
        })
        
        done()
      })
      
      describe.skip("new Network([n], {...})", function() {
        
      })
    })
    describe.skip("new Network([Layer])", function() {
      
      describe.skip("new Network([Layer], {...})", function() {
        
      })
    })
    describe.skip("new Network([Neuron])", function() {
      
      describe.skip("new Network([Neuron], {...})", function() {
        
      })
    })
    describe.skip("new Network([Connection])", function() {
      
      describe.skip("new Network([Connection], {...})", function() {
        
      })
    })
  })
})