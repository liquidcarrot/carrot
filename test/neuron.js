'use strict'

let _ = require('lodash')
let faker = require("faker")
let chai = require('chai')

chai.use(require('chai-each'))

let expect = chai.expect

describe("Neuron", function() {
  let Neuron = require('../src/neuron')
  let Connection = require('../src/connection')
  let Layer = require('../src/layer')
  
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
        
        it("should create a neuron with connections to the given incoming neurons", function(done) {
          expect(neuron.connections).to.exist
          expect(neuron.connections.incoming).to.exist
          expect(neuron.connections.incoming).to.be.an("array")
          expect(neuron.connections.incoming).to.have.lengthOf(options.connections.incoming.length)
          expect(neuron.connections.incoming).to.each.satisfy(function(connection) {
            return connection instanceof Connection
          })

          done()
        })
        it("should add an outgoing connection to every incoming neuron", function(done) {
          expect(options.connections.incoming).to.exist
          expect(options.connections.incoming).to.be.an("array")
          expect(options.connections.incoming).to.each.be.an.instanceOf(Neuron)
          expect(options.connections.incoming).to.each.satisfy(function(incoming_neuron) {
            return _.every(incoming_neuron.connections.outgoing, function(connection) {
              return _.isEqual(connection.to, neuron)
            })
          })
          
          done()
        })
        it("should create a neuron with connections to the given outgoing neurons", function(done) {
          expect(neuron.connections).to.exist
          expect(neuron.connections.outgoing).to.exist
          expect(neuron.connections.outgoing).to.be.an("array")
          expect(neuron.connections.outgoing).to.have.lengthOf(options.connections.outgoing.length)
          expect(neuron.connections.outgoing).to.each.satisfy(function(connection) {
            return connection instanceof Connection
          })

          done()
        })
        it("should add an incoming connection to every outgoing neuron", function(done) {
          expect(options.connections.outgoing).to.exist
          expect(options.connections.outgoing).to.be.an("array")
          expect(options.connections.outgoing).to.each.be.an.instanceOf(Neuron)
          expect(options.connections.outgoing).to.each.satisfy(function(outgoing_neuron) {
            return _.every(outgoing_neuron.connections.incoming, function(connection) {
              return _.isEqual(connection.from, neuron)
            })
          })
          
          done()
        })
      })
      
      describe("new Neuron({ 'connections': { 'incoming': Layer, 'outgoing': Layer }})", function() {
        let options = {
          connections: {
            incoming: new Layer(Math.round(Math.random() * 10 + 1)),
            outgoing: new Layer(Math.round(Math.random() * 10 + 1))
          }
        }
        let neuron = new Neuron(options)
        
        it("should create a neuron with connections to every neuron in the given incoming layer", function(done) {
          expect(neuron.connections).to.exist
          expect(neuron.connections.incoming).to.exist
          expect(neuron.connections.incoming).to.be.an("array")
          expect(neuron.connections.incoming).to.have.lengthOf(options.connections.incoming.neurons.length)
          expect(neuron.connections.incoming).to.each.satisfy(function(connection) {
            return connection instanceof Connection
          })

          done()
        })
        it("should add an outgoing connection to every neuron in the given incoming layer", function(done) {
          expect(options.connections.incoming).to.exist
          expect(options.connections.incoming).to.be.an.instanceOf(Layer)
          expect(options.connections.incoming.neurons).to.exist
          expect(options.connections.incoming.neurons).to.be.an("array")
          expect(options.connections.incoming.neurons).to.each.be.an.instanceOf(Neuron)
          expect(options.connections.incoming.neurons).to.each.satisfy(function(incoming_neuron) {
            return _.every(incoming_neuron.connections.outgoing, function(connection) {
              return _.isEqual(connection.to, neuron)
            })
          })
          
          done()
        })
        it("should create a neuron with connections to every neuron in the given outgoing layer", function(done) {
          expect(neuron.connections).to.exist
          expect(neuron.connections.outgoing).to.exist
          expect(neuron.connections.outgoing).to.be.an("array")
          expect(neuron.connections.outgoing).to.have.lengthOf(options.connections.outgoing.neurons.length)
          expect(neuron.connections.outgoing).to.each.satisfy(function(connection) {
            return connection instanceof Connection
          })
          
          done()
        })
        it("should add an incoming connection to every neuron in the given outgoing layer", function(done) {
          expect(options.connections.outgoing).to.exist
          expect(options.connections.outgoing).to.be.an.instanceOf(Layer)
          expect(options.connections.outgoing.neurons).to.exist
          expect(options.connections.outgoing.neurons).to.be.an("array")
          expect(options.connections.outgoing.neurons).to.each.be.an.instanceOf(Neuron)
          expect(options.connections.outgoing.neurons).to.each.satisfy(function(outgoing_neuron) {
            return _.every(outgoing_neuron.connections.incoming, function(connection) {
              return _.isEqual(connection.from, neuron)
            })
          })
          
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
        }]),
        connections: {
          incoming: _.times(Math.round(Math.random() * 10 + 1), function(n) {
            return new Neuron()
          }),
          outgoing: _.times(Math.round(Math.random() * 10 + 1), function(n) {
            return new Neuron()
          })
        }
      }
      let other_neuron = new Neuron(options)
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
      it("should create a neuron with the same incoming connections as the given neuron", function(done) {
        expect(neuron.connections.incoming).to.exist
        expect(neuron.connections.incoming).to.be.an("array")
        expect(neuron.connections.incoming).to.have.lengthOf(other_neuron.connections.incoming.length)
        expect(neuron.connections.incoming).to.each.be.an.instanceOf(Connection)
        _.each(neuron.connections.incoming, function(connection, index) {
          // Incoming Connection Source Neurons Should Match Given Neuron
          expect(neuron.connections.incoming[index].from).to.eql(other_neuron.connections.incoming[index].from)
          // Incoming Connection Destination Neurons Should Not Match Given Neuron
          expect(neuron.connections.incoming[index].to).to.not.eql(other_neuron.connections.incoming[index].to)
          // Incoming Connection Destination Neurons Should Be The Created Neuron
          expect(neuron.connections.incoming[index].to).to.equal(neuron)
        })
        
        done()
      })
      it("should create a neuron with the same outgoing connections as the given neuron", function(done) {
        expect(neuron.connections.outgoing).to.exist
        expect(neuron.connections.outgoing).to.be.an("array")
        expect(neuron.connections.outgoing).to.have.lengthOf(other_neuron.connections.outgoing.length)
        expect(neuron.connections.outgoing).to.each.be.an.instanceOf(Connection)
        _.each(neuron.connections.outgoing, function(connection, index) {
          // Outgoing Connection Destination Neurons Should Match Given Neuron
          expect(neuron.connections.outgoing[index].to).to.eql(other_neuron.connections.outgoing[index].to)
          // Outgoing Connection Source Neurons Should Not Match Given Neuron
          expect(neuron.connections.outgoing[index].from).to.not.eql(other_neuron.connections.outgoing[index].from)
          // Outgoing Connection Source Neurons Should Be The Created Neuron
          expect(neuron.connections.outgoing[index].from).to.equal(neuron)
        })
        
        done()
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