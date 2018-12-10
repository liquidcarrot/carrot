'use strict'

let expect  = require('chai').expect

describe("Neuron", function() {
  let Neuron = require('../src/neuron')
  
  describe("new Neuron()", function() {
    it("should create a neuron with default properties", function(done) {    
      let neuron = Neuron()
      
      expect(neuron).to.not.be.null
      expect(neuron).to.not.be.undefined
      expect(neuron).to.not.be.NaN
      expect(neuron).to.exist
      
      done()
    })
    it("should create neuron with an empty connections array", function(done) {
      let neuron = Neuron()
      
      expect(neuron.connections).to.exist
      expect(neuron.connections).to.be.an("array")
      expect(neuron.connections).to.have.lengthOf(0)
      
      done()
    })
    it("should create neuron with an empty states array", function(done) {
      let neuron = Neuron()
      
      expect(neuron.states).to.exist
      expect(neuron.states).to.be.an("array")
      expect(neuron.connections).to.have.lengthOf(0)
      
      done()
    })
  })
  
  describe.skip("new Neuron({ inputs: [...], outputs: [...] })", function() {
    it("should create a neuron with given properties", function(done) {
      
      done()
    })
  })
  
  describe.skip("new Neuron(neuron)", function() {
    it("should create a similar neuron", function(done) {
      done()
    })
  })
  
  describe(".project(neuron[, callback])", function() {
    it("should create a connection between neurons", function(done) {
      let n0 = Neuron()
      let n1 = Neuron()
      
      n0.project(n1, function(error, connection) {
        expect(error).to.not.exist
        expect(error).to.be.null
        expect(connection).to.exist
        expect(connection).to.be.an("object")
        expect(connection.from).to.exist
        expect(connection.to).to.exist
        expect(connection.weight).to.exist
        done()
      })
    })
    it("should add a connection to source neuron", function(done) {
      let n0 = Neuron()
      let n1 = Neuron()
      
      expect(n0.connections).to.have.lengthOf(0)
      
      n0.project(n1, function(error, connection) {
        expect(n0.connections).to.have.lengthOf(1)
        expect(n0.connections[0].from).equal(n0)
        expect(n0.connections[0].to).equal(n1)
        done()
      })
    })
    it("should add a connection to destination neuron", function(done) {
      let n0 = Neuron()
      let n1 = Neuron()
      
      expect(n1.connections).to.have.lengthOf(0)
      
      n0.project(n1, function(error, connection) {
        expect(n1.connections).to.have.lengthOf(1)
        expect(n1.connections[0].to).equal(n1)
        expect(n1.connections[0].from).equal(n0)
        done()
      })
    })
  })
  
  describe.skip(".project(layer[, callback])", function() {
    it.skip("should create a connection between source neuron and layer", function(done) {
      
      done()
    })
  })
  
  describe.skip(".project(group[, callback])", function() {
    it.skip("should create a connection between source neuron and group", function(done) {
      
      done()
    })
  })
  
  describe.skip(".is_input()", function() {
    it.skip("should return a boolean value", function(done) {
      
      done()
    })
    it.skip("should return true if neuron has no incoming connections", function(done) {
      
      done()
    })
    it.skip("should return false if neuron has at least one incoming connection", function(done) {
      
      done()
    })
  })
  
  describe.skip(".is_output()", function() {
    it.skip("should return a boolean value", function(done) {
      
      done()
    })
    it.skip("should return true if neuron has no outgoing connections", function(done) {
      
      done()
    })
    it.skip("should return false if neuron has at least one outgoing connection", function(done) {
      
      done()
    })
  })
  
  describe.skip(".run()", function() {
    it("should take an array of numbers as parameter", function(done) {
      
      done()
    })
    it("should return a number", function(done) {
      
      done()
    })
  })
  
  describe.skip(".propogate()", function() {
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
})