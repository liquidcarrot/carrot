'use strict'

let _ = require('lodash')
let faker = require("faker")
let expect  = require('chai').expect

describe("Neuron", function() {
  let Neuron = require('../src/neuron')
  let Connection = require('../src/connection')
  
  describe("new Neuron()", function() {
    let neuron = new Neuron()
    
    it("should create a neuron", function(done) {    
      expect(neuron).to.not.be.null
      expect(neuron).to.not.be.undefined
      expect(neuron).to.not.be.NaN
      expect(neuron).to.exist
      
      done()
    })
    it("should create a neuron with a learning rate", function(done) {
      expect(neuron.rate).to.exist
      expect(neuron.rate).to.be.a("number")
      
      done()
    })
    it("should create a neuron with a bias", function(done) {
      expect(neuron.bias).to.exist
      expect(neuron.bias).to.be.a("number")
      
      done()
    })
    it("should create a neuron with an activation function", function(done) {
      expect(neuron.activation).to.exist
      expect(neuron.activation).to.be.a("function")
      
      done()
    })
    it("should create neuron with empty connections", function(done) {
      expect(neuron.connections).to.exist
      expect(neuron.connections.incoming).to.exist
      expect(neuron.connections.incoming).to.be.an("array")
      expect(neuron.connections.incoming).to.have.lengthOf(0)
      expect(neuron.connections.outgoing).to.exist
      expect(neuron.connections.outgoing).to.be.an("array")
      expect(neuron.connections.outgoing).to.have.lengthOf(0)
      
      done()
    })
    
    describe("new Neuron({...})", function() {
      let options = {
        bias: Math.random(),
        rate: Math.random(),
        activation: faker.random.arrayElement(["sigmoid", "sigmoidal", "logistic", "logistics", "relu", "tanh", "linear", "identity", function(x, derivative) {
          return !derivative ? Math.atan(x) : (1 / (Math.pow(x, 2) + 1))
        }])
      }
      let neuron = new Neuron(options)
      
      it("should create a neuron", function(done) {    
        expect(neuron).to.not.be.null
        expect(neuron).to.not.be.undefined
        expect(neuron).to.not.be.NaN
        expect(neuron).to.exist

        done()
      })
      it("should create a neuron with the same learning rate", function(done) {
        expect(neuron.rate).to.exist
        expect(neuron.rate).to.equal(options.rate)

        done()
      })
      it("should create a neuron with the same bias", function(done) {
        expect(neuron.bias).to.exist
        expect(neuron.bias).to.equal(options.bias)

        done()
      })
      it("should create a neuron with an activation function", function(done) {
        expect(neuron.activation).to.exist
        expect(neuron.activation).to.be.a("function")

        done()
      })
      it("should create a neuron with an empty connections object", function(done) {
        expect(neuron.connections).to.exist
        expect(neuron.connections.incoming).to.exist
        expect(neuron.connections.incoming).to.be.an("array")
        expect(neuron.connections.incoming).to.have.lengthOf(0)
        expect(neuron.connections.outgoing).to.exist
        expect(neuron.connections.outgoing).to.be.an("array")
        expect(neuron.connections.outgoing).to.have.lengthOf(0)
        
        done()
      })
      
      describe("new Neuron({ 'connections': { 'incoming': [Neuron], 'outgoing': [Neuron] }})", function() {
        let options = {
          connections: {
            incoming: _.times(Math.round(Math.random() * 10 + 1), function(n) {
              return new Neuron()
            }),
            outgoing: _.times(Math.round(Math.random() * 10 + 1), function(n) {
              return new Neuron()
            })
          }
        }
        let neuron = new Neuron(options)
        
        it("should create neuron with the given incoming neurons", function(done) {
          expect(neuron.connections).to.exist
          expect(neuron.connections.incoming).to.exist
          expect(neuron.connections.incoming).to.be.an("array")
          expect(neuron.connections.incoming).to.have.lengthOf(options.connections.incoming.length)
          expect(neuron.connections.incoming).to.each.satisfy(function(connection) {
            return connection instanceof Connection
          })

          done()
        })
        it.skip("should add connections to incoming neurons", function(done) {
          
          done()
        })
        it("should create a neuron witht the given outgoing neurons", function(done) {
          expect(neuron.connections).to.exist
          expect(neuron.connections.outgoing).to.exist
          expect(neuron.connections.outgoing).to.be.an("array")
          expect(neuron.connections.outgoing).to.have.lengthOf(options.connections.outgoing.length)
          expect(neuron.connections.outgoing).to.each.satisfy(function(connection) {
            return connection instanceof Connection
          })

          done()
        })
        it.skip("should add connections to outgoing neurons", function(done) {
          
          done()
        })
      })
      
    })
    describe("new Neuron(neuron)", function() {
      let options = {
        bias: Math.random(),
        rate: Math.random(),
        activation: faker.random.arrayElement(["sigmoid", "sigmoidal", "logistic", "logistics", "relu", "tanh", "linear", "identity", function(x, derivative) {
          return !derivative ? Math.atan(x) : (1 / (Math.pow(x, 2) + 1))
        }])
      }
      let another_neuron = new Neuron()
      let other_neuron = new Neuron(options)

      another_neuron.project(other_neuron, function(error, connection) {
        let neuron = new Neuron(other_neuron)
        
        it("should create a neuron", function(done) {    
          expect(neuron).to.not.be.null
          expect(neuron).to.not.be.undefined
          expect(neuron).to.not.be.NaN
          expect(neuron).to.exist

          done()
        })
        it("should create a neuron with the same learning rate", function(done) {
          expect(neuron.rate).to.exist
          expect(neuron.rate).to.equal(other_neuron.rate)

          done()
        })
        it("should create a neuron with the same bias", function(done) {
          expect(neuron.bias).to.exist
          expect(neuron.bias).to.equal(other_neuron.bias)

          done()
        })
        it("should create a neuron with an activation function", function(done) {
          expect(neuron.activation).to.exist
          expect(neuron.activation).to.be.a("function")
          expect(neuron.activation).to.equal(other_neuron.activation)
          expect(neuron.activation).to.eql(other_neuron.activation)

          done()
        })
        it.skip("should create neuron with the same connections as the given neuron", function(done) {
          expect(neuron.connections).to.exist
          expect(neuron.connections.incoming).to.exist
          expect(neuron.connections.incoming).to.be.an("array")
          expect(neuron.connections.outgoing).to.exist
          expect(neuron.connections.outgoing).to.be.an("array")

          done()
        })
      })
    })
  })

  describe(".project()", function() {
    describe(".project(neuron[, callback])", function() {
      let n0 = new Neuron()
      let n1 = new Neuron()

      n0.project(n1, function(error, connection) {
        it("should create a connection between neurons", function(done) {
          expect(error).to.not.exist
          expect(error).to.be.null
          expect(connection).to.exist
          expect(connection).to.be.an("object")
          expect(connection.from).to.exist
          expect(connection.to).to.exist
          expect(connection.weight).to.exist

          done()
        })
        it("should add a connection to source neuron", function(done) {
            expect(n0.connections.outgoing).to.exist
            expect(n0.connections.outgoing).to.have.lengthOf(1)
            expect(n0.connections.outgoing[0].from).equal(n0)
            expect(n0.connections.outgoing[0].to).equal(n1)
          
            done()
        })
        it("should add a connection to destination neuron", function(done) {
            expect(n1.connections.incoming).to.exist
            expect(n1.connections.incoming).to.have.lengthOf(1)
            expect(n1.connections.incoming[0].to).equal(n1)
            expect(n1.connections.incoming[0].from).equal(n0)
          
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
  })
  
  describe(".is.input()", function() {
    it("should return a boolean value", function(done) {
      let neuron = new Neuron()
      
      expect(neuron.is.input()).to.be.a("boolean")
      
      done()
    })
    it("should return true if neuron has no incoming connections", function(done) {
      let neuron = new Neuron()
      
      expect(neuron.is.input()).to.equal(true)
      
      done()
    })
    it("should return false if neuron has at least one incoming connection", function(done) {
      let other_neuron = new Neuron()
      let neuron = new Neuron()
      
      other_neuron.project(neuron, function(error, connection) {
        expect(neuron.is.input()).to.equal(false)
        
        done()
      })
    })
  })
  
  describe(".is.output()", function() {
    it("should return a boolean value", function(done) {
      let neuron = new Neuron()
      
      expect(neuron.is.output()).to.be.a("boolean")
      
      done()
    })
    it("should return true if neuron has no outgoing connections", function(done) {
      let neuron = new Neuron()
      
      expect(neuron.is.output()).to.equal(true)
      
      done()
    })
    it("should return false if neuron has at least one outgoing connection", function(done) {
      let other_neuron = new Neuron()
      let neuron = new Neuron()
      
      neuron.project(other_neuron, function(error, connection) {
        expect(neuron.is.output()).to.equal(false)
        
        done()
      })
    })
  })
  
  describe(".activate()", function() {
    let neuron = new Neuron()
    
    it("should accept a number as a parameter", function(done) {
      neuron.activate(Math.random(), function(error, result) {
        expect(result).to.exist
        expect(result).to.be.a("number")
        
        done()
      })
    })
    it("should return a number", function(done) {
      neuron.activate(Math.random(), function(error, result) {
        expect(result).to.exist
        expect(result).to.be.a("number")
        
        done()
      })
    })
  })
  
  describe(".propagate()", function() {
    let neuron = new Neuron()
    
    beforeEach(function(done) {
      neuron.activate(Math.random(), function(error, result) {
        done()
      })
    })
    
    it("should accept a number as a parameter", function(done) {
      neuron.propagate(Math.random(), function(error, result) {
        expect(result).to.exist
        expect(result).to.be.a("number")
        
        done()
      })
    })
    it("should return a number", function(done) {
      neuron.propagate(Math.random(), function(error, result) {
        expect(result).to.exist
        expect(result).to.be.a("number")
        
        done()
      })
    })
  })
})