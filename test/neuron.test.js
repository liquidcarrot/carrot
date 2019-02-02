 'use strict'

let _ = require('lodash')
let async = require('async')
let faker = require("faker")
let chai = require('chai')

chai.use(require('chai-each'))

let expect = chai.expect


describe("Neuron", function() {
  let Neuron = require('../src/neuron')
  let Connection = require('../src/connection')
  let Layer = require('../src/layer')
  
  let random = {
    number: () => Math.round(Math.random() * 10 + 1),
    size: () => random.number(),
    neurons: () => _.times(random.size(), index => new Neuron()),
    inputs: (n) => _.times((n || Math.round(Math.random() * 10 + 1)), index => Math.round(Math.random() * 10 + 1)),
    feedback: (n) => _.times((n || Math.round(Math.random() * 10 + 1)), index => Math.round(Math.random() * 10 + 1)),
    layer: () => new Layer(random.size()),
    bias: () => Math.random(),
    rate: () => Math.random(),
    activation: () => faker.random.arrayElement(["sigmoid", "sigmoidal", "logistic", "logistics", "relu", "tanh", "linear", "identity", function(x, derivative) {
      return !derivative ? Math.atan(x) : (1 / (Math.pow(x, 2) + 1))
    }]),
    connections: (type) => type === "layers" || type === "neurons" ? ({
      incoming: ((type) => type === "layers" ? random.layer() : type === "neurons" ? random.neurons() : random.neurons())(type),
      outgoing: ((type) => type === "layers" ? random.layer() : type === "neurons" ? random.neurons() : random.neurons())(type)
    }) : ({
      incoming: [],
      outgoing: []
    }),
    options: (connections) => ({
      bias: random.bias(),
      rate: random.rate(),
      activation: random.activation(),
      connections: random.connections(connections)
    })
  }
  
  let is = {
    // Object is `boolean`
    boolean: function(boolean) {
      it("should return a boolean value", function(done) {  
        expect(boolean).to.exist
        expect(boolean).to.be.a("boolean")

        done()
      })
    },
    // Object is a Neuron
    neuron: function(neuron) {
      it("should create a neuron", function(done) {
        expect(neuron).to.exist
        expect(neuron).to.be.an.instanceof(Neuron)

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
      
      it("should create a neuron with connections", function(done) {
        expect(neuron.connections).to.exist
        expect(neuron.connections.incoming).to.exist
        expect(neuron.connections.incoming).to.be.an("array")
        expect(neuron.connections.incoming).to.each.be.an.instanceof(Connection)
        expect(neuron.connections.outgoing).to.exist
        expect(neuron.connections.outgoing).to.be.an("array")
        expect(neuron.connections.outgoing).to.each.be.an.instanceof(Connection)

        done()
      })
    },
    // Neuron Construction with `options`
    overwritten: function(neuron, options) {
      
      it("should create a neuron with the same learning rate", function(done) {
        expect(neuron.rate).to.equal(options.rate)
        expect(neuron.rate).to.eql(options.rate)

        done()
      })
      
      it("should create a neuron with the same bias", function(done) {
        expect(neuron.bias).to.equal(options.bias)
        expect(neuron.bias).to.eql(options.bias)

        done()
      })
      
      it("should create a neuron with the same activation function", function(done) {
        if(options instanceof Neuron) {
          expect(neuron.activation).to.equal(options.activation)
          expect(neuron.activation).to.eql(options.activation)
        } else {
          expect(neuron.activation).to.equal(Neuron.toActivation(options.activation))
          expect(neuron.activation).to.eql(Neuron.toActivation(options.activation))
        }

        done()
      })
    },
    // Neuron Construction with Connection in `options`
    connected: function(neuron, options) {
      // new Neuron({ 'connections': Layer }) -> new Neuron({ 'connections': [Neuron] })
      let incoming = options.connections.incoming instanceof Layer ? options.connections.incoming.neurons : options.connections.incoming
      let outgoing = options.connections.outgoing instanceof Layer ? options.connections.outgoing.neurons : options.connections.outgoing
      
      // new Neuron(neuron) -> new Neuron({ 'connections': [Neuron] })
      incoming = _.every(incoming, connection => connection instanceof Connection) ? _.map(incoming, connection => connection.from) : incoming
      outgoing = _.every(outgoing, connection => connection instanceof Connection) ? _.map(outgoing, connection => connection.to) : outgoing
      
      it("should create a neuron with the same incoming connections", function(done) {
        expect(incoming).to.exist
        expect(incoming).to.be.an("array")
        expect(incoming).to.each.be.an.instanceof(Neuron)
        
        expect(neuron.connections.incoming).to.have.lengthOf(incoming.length)
        expect(neuron.connections.incoming).to.each.be.an.instanceof(Connection)
        
        done()
      })
      
      it("should create a neuron with the same outgoing connections", function(done) {
        expect(outgoing).to.exist
        expect(outgoing).to.be.an("array")
        expect(incoming).to.each.be.an.instanceof(Neuron)
        
        expect(neuron.connections.outgoing).to.have.lengthOf(outgoing.length)
        expect(neuron.connections.outgoing).to.each.be.an.instanceof(Connection)
        
        done()
      })
      
      it("should connect created neuron to every incoming connection", function(done) {
        _.each(incoming, incoming_neuron => {
          expect(incoming_neuron.connections.outgoing).to.have.lengthOf.at.least(1)
          // at least one of the incoming neuron's outgoing connections is the created neuron
          expect(_.map(incoming_neuron.connections.outgoing, connection => connection.to)).to.satisfy(function(neurons) {
            return !_.isEmpty(_.filter(neurons, n => _.isEqual(n, neuron)))
          })
        })
        expect(neuron.connections.incoming).to.have.lengthOf(incoming.length)
        expect(_.map(neuron.connections.incoming, connection => connection.from)).to.have.all.deep.members(incoming)
        expect(_.map(neuron.connections.incoming, connection => connection.to)).to.each.equal(neuron)
        expect(_.map(neuron.connections.incoming, connection => connection.to)).to.each.eql(neuron)
        
        done()
      })
      
      it("should connect created neuron to every outgoing connection", function(done) {
        _.each(outgoing, outgoing_neuron => {
          expect(outgoing_neuron.connections.incoming).to.have.lengthOf.at.least(1)
          // at least one of the outgoing neuron's incoming connections is the created neuron
          expect(_.map(outgoing_neuron.connections.incoming, connection => connection.from)).to.satisfy(function(neurons) {
            return !_.isEmpty(_.filter(neurons, n => _.isEqual(n, neuron)))
          })
        })
        expect(neuron.connections.outgoing).to.have.lengthOf(outgoing.length)
        expect(_.map(neuron.connections.outgoing, connection => connection.to)).to.have.all.deep.members(outgoing)
        expect(_.map(neuron.connections.outgoing, connection => connection.from)).to.each.equal(neuron)
        expect(_.map(neuron.connections.outgoing, connection => connection.from)).to.each.eql(neuron)
        
        done()
      })
      
    }
  }
  
  let should = {
    activate: {
      solo: function(neuron) {
        it("should require parameter #1", function(done) {
          neuron.activate(function(error, result) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)

            done()
          })
        })

        it("should accept a number as parameter #1", function(done) {
          neuron.activate(random.number(), function(error, result) {
            expect(error).to.not.exist
            expect(error).to.be.null

            done()
          })
        })

        it("should return a number", function(done) {
          neuron.activate(random.number(), function(error, result) {
            expect(result).to.exist
            expect(result).to.be.a("number")

            done()
          })
        })

        it("should save the number returned as `.last`", function(done) {
          neuron.activate(random.number(), function(error, result) {
            expect(neuron.last).to.exist
            expect(neuron.last).to.be.a("number")
            expect(neuron.last).to.equal(result)
            expect(neuron.last).to.eql(result)

            done()
          })
        })
      },
      afterIncoming: function(incoming, neuron) {
        it("should not accept a number as parameter #1", function(done) {
          neuron.activate(random.number(), function(error, result) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)

            done()
          })
        })

        it("should require incoming neurons to activate", function(done) {
          neuron.activate(function(error, result) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)

            done()
          })
        })

        it("should return a number", function(done) {
          incoming.activate(random.inputs(incoming.neurons.length), function(error, result) {
            neuron.activate(function(error, result) {
              expect(result).to.exist
              expect(result).to.be.a("number")

              done()
            })
          })
        })

        it("should save the number returned as `.last`", function(done) {
          incoming.activate(random.inputs(incoming.neurons.length), function(error, result) {
            neuron.activate(function(error, result) {
              expect(neuron.last).to.exist
              expect(neuron.last).to.be.a("number")
              expect(neuron.last).to.equal(result)
              expect(neuron.last).to.eql(result)

              done()
            })
          })
        })
      }
    },
    propagate: {
      solo: function(neuron) {
  
      },
      afterOutgoing: function(outgoing, neuron) {
        
      }
    },
    feed: {
      /**
      * Runs the following forward propagation tests on the `target` neural object for forward-feeding
      *
      * @param {[Neuron|Layer]} objects - An array of sequentially connected neural objects (i.e. `neurons`, `layers`, `groups`, `networks`)
      * @param {Neuron|Layer} target - Target object on which to run tests
      * @param {[number]} inputs - Input(s) for the first neural object in `objects` 
      */
      forward: (objects, target, inputs) => {
        // Lone Neuron
        if(objects.length === 1) {
          
        }
        // Input Neuron
        else if(_.isEqual(_.first(objects), target)) {
          
        }
        // Output Neuron
        else if(_.isEqual(_.last(objects), target)) {
          
        }
        // Hidden Neuron
        else if(!_.isEmpty(_.filter(objects, object => _.isEqual(object, target)))) {
          
        }
      },
      /**
      * Activates the following neural objects.
      * Runs the following backward propagation tests on the `target` neural object for backward-feeding
      *
      * @param {[Neuron|Layer]} objects - An array of sequentially connected neural objects (i.e. `neurons`, `layers`, `groups`, `networks`)
      * @param {Neuron|Layer} target - Target object on which to run tests
      * @param {[number]} inputs - Input(s) for the first neural object in `objects` 
      */
      backward: (objects, target, inputs, feedback) => {
        // Lone Neuron
        if(objects.length === 1) {
          
        }
        // Input Neuron
        else if(_.isEqual(_.first(objects), target)) {
          
        }
        // Output Neuron
        else if(_.isEqual(_.last(objects), target)) {
          
        }
        // Hidden Neuron
        else if(!_.isEmpty(_.filter(objects, object => _.isEqual(object, target)))) {
          
        }
      }
    }
  }
  
  describe("new Neuron()", function() {
    let neuron = new Neuron()
    
    is.neuron(neuron)
    
    context("new Neuron({...})", function() {
      let options = random.options()
      let neuron = new Neuron(options)
      
      is.neuron(neuron)
      is.overwritten(neuron, options)
      
      context("new Neuron({ 'connections': [Neuron] })", function() {
        let options = random.options("neurons")
        let neuron = new Neuron(options)
        
        is.neuron(neuron)
        is.overwritten(neuron, options)
        is.connected(neuron, options)
      })
      
      context("new Neuron({ 'connections': Layer })", function() {
        let options = random.options("layers")
        let neuron = new Neuron(options)
        
        is.neuron(neuron)
        is.overwritten(neuron, options)
        is.connected(neuron, options)
      })
      
    })
    context("new Neuron(neuron)", function() {
      let options = new Neuron(random.options("neurons"))
      let neuron = new Neuron(options)
      
      is.neuron(neuron)
      is.overwritten(neuron, options)
      is.connected(neuron, options)
      
      it("should not overwrite source neuron's incoming connections", function(done) {
        _.each(neuron.connections.incoming, function(connection, index) {
          expect(neuron.connections.incoming[index].to).to.not.equal(options.connections.incoming[index].to)
          expect(neuron.connections.incoming[index].to).to.not.eql(options.connections.incoming[index].to)
        })
        
        done()
      })
      
      it("should not overwrite source neuron's outgoing connections", function(done) {
        _.each(neuron.connections.outgoing, function(connection, index) {
          expect(neuron.connections.outgoing[index].from).to.not.equal(options.connections.outgoing[index].from)
          expect(neuron.connections.outgoing[index].from).to.not.eql(options.connections.outgoing[index].from)
        })
        
        done()
      })
      
    })
  })

  describe(".project()", function() {
    context(".project(neuron[, callback])", function() {
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
    
    context.skip(".project(layer[, callback])", function() {
      it.skip("should create a connection between source neuron and layer", function(done) {

        done()
      })
    })
    
    context.skip(".project(group[, callback])", function() {
      it.skip("should create a connection between source neuron and group", function(done) {

        done()
      })
    })
  })
  
  describe(".is.input()", function() {
    let neuron = new Neuron()
    
    is.boolean(neuron.is.input())
    
    context("Input Neuron", function() {
      let neuron = new Neuron()
    
      is.boolean(neuron.is.input())
    
      it("should return true", function(done) {
        expect(neuron.is.input()).to.equal(true)

        done()
      })
    })
    
    context("Not Input Neuron", function() {
      let neuron = new Neuron(random.options("neurons"))
    
      is.boolean(neuron.is.input())
      
      it("should return false", function(done) {
        expect(neuron.is.input()).to.equal(false)

        done()
      })
    })
  })
  
  describe(".is.output()", function() {
    let neuron = new Neuron()
    
    is.boolean(neuron.is.output())
    
    context("Output Neuron", function() {
      let neuron = new Neuron()
    
      is.boolean(neuron.is.output())
    
      it("should return true", function(done) {
        expect(neuron.is.output()).to.equal(true)

        done()
      })
    })
    
    context("Not Output Neuron", function() {
      let neuron = new Neuron(random.options("neurons"))
    
      is.boolean(neuron.is.output())
      
      it("should return false", function(done) {
        expect(neuron.is.output()).to.equal(false)

        done()
      })
    })
  })
  
  describe(".activate()", function() {
    context.skip("⬤", function() {
      it.skip("should work", function(done) {
        
        done()
      })
    })
    
    context.skip("⬤ -> ◯", function() {
      it.skip("should work", function(done) {
        
        done()
      })
    })
    
    context.skip("◯ -> ⬤", function() {
      it.skip("should work", function(done) {
        
        done()
      })
    })
    
    context.skip("◯ -> ⬤ -> ◯", function() {
      it.skip("should work", function(done) {
        
        done()
      })
    })
    
    context("Lone Neuron", function() {
      let neuron = new Neuron()
      
      should.activate.solo(neuron)
    })
    
    context("Input Neuron", function() {
      let neuron = new Neuron({
        connections: {
          outgoing: random.layer()
        }
      })
      
      should.activate.solo(neuron)
    })
    
    context("Hidden Neuron", function() {
      let incoming = random.layer()
      let outgoing = random.layer()
      let neuron = new Neuron({
        connections: {
          incoming,
          outgoing
        }
      })
      
      should.activate.afterIncoming(incoming, neuron)
    })
    
    context("Output Neuron", function() {
      let incoming = random.layer()
      let neuron = new Neuron({
        connections: {
          incoming
        }
      })
      
      should.activate.afterIncoming(incoming, neuron)
    })
  })
  
  describe(".propagate()", function() {
    let neuron = new Neuron()

    it("should require parameter #1", function(done) {
      neuron.propagate(function(error, result) {
        expect(error).to.exist
        expect(error).to.be.an.instanceof(Error)
        
        done()
      })
    })
    
    it("should require neuron to have activated", function(done) {
      neuron.propagate(random.number(), function(error, result) {
        expect(error).to.exist
        expect(error).to.be.an.instanceof(Error)
        
        done()
      })
    })
    
    
    context("Lone Neuron", function() {
      beforeEach(function(done) {
        neuron.activate(Math.random(), function(error, result) {
          done()
        })
      })
      
      it("should accept a number as parameter #1", function(done) {
        neuron.propagate(random.number(), function(error, result) {
          expect(error).to.not.exist
          expect(error).to.be.null

          done()
        })
      })

      it("should return a number", function(done) {
        neuron.propagate(random.number(), function(error, result) {
          expect(result).to.exist
          expect(result).to.be.a("number")

          done()
        })
      })

      it("should save the number returned as `.error`", function(done) {
        neuron.propagate(random.number(), function(error, result) {
          expect(neuron.error).to.exist
          expect(neuron.error).to.equal(result)

          done()
        })
      })
      
      /*
      should.propagate.solo(neuron)
      */
    })
    
    context("Output Neuron", function() {
      let incoming = random.layer()
      let neuron = new Neuron({
        connections: {
          incoming
        }
      })
      
      beforeEach(function(done) {
        Layer.activate(incoming, random.inputs(incoming.neurons.length), function(error, result) {
          neuron.activate(function(error, results) { 
            done()
          })
        })
      })
      
      it("should accept a number as parameter #1", function(done) {
        neuron.propagate(random.number(), function(error, result) {
          expect(error).to.not.exist
          expect(error).to.be.null

          done()
        })
      })
      
      it("should return a number", function(done) {
        neuron.propagate(random.number(), function(error, result) {
          expect(result).to.exist
          expect(result).to.be.a("number")

          done()
        })
      })
      
      it("should save the number returned as `.error`", function(done) {
        neuron.propagate(random.number(), function(error, result) {
          expect(neuron.error).to.exist
          expect(neuron.error).to.equal(result)

          done()
        })
      })
      
      /*
      should.propagate.afterOutgoing(neuron)
      */
    })
    
    context("Input Neuron", function() {
      let outgoing = random.layer()
      let neuron = new Neuron({
        connections: {
          outgoing
        }
      })
      
      beforeEach(function(done) {
        neuron.activate(Math.random(), function(error, result) {
          Layer.activate(outgoing, function(error, results) { 
            done()
          })
        })
      })
      
      it("should not accept a number as parameter #1", function(done) {
        Layer.propagate(outgoing, random.feedback(outgoing.neurons.length), function(error, results) {
          neuron.propagate(random.number(), function(error, result) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)

            done()
          })
        })
      })
      
      it("should require outgoing neurons to propagate", function(done) {
//         Layer.propagate(outgoing, random.feedback(outgoing.neurons.length), function(error, results) {
          neuron.propagate(random.number(), function(error, result) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)

            done()
          })
//         })
      })
      
      it("should return a number", function(done) {
        outgoing.propagate(random.feedback(outgoing.neurons.length), function(error, results) {
          neuron.propagate(function(error, result) {
            expect(result).to.exist
            expect(result).to.be.a("number")

            done()
          })
        })
      })
      
      it("should save the number returned as `.error`", function(done) {
        outgoing.propagate(random.feedback(outgoing.neurons.length), function(error, results) {
          neuron.propagate(function(error, result) {
            expect(neuron.error).to.exist
            expect(neuron.error).to.equal(result)

            done()
          })
        })
      })
      
      it("should update weights", function(done) {
        async.auto({
          "weights": function(callback) {
            async.map(neuron.connections.outgoing, function(connection, callback) {
              callback(null, connection.weight)
            }, callback)
          },
          "propagate": ["weights", function(result, callback) {
            outgoing.propagate(random.feedback(outgoing.neurons.length), function(error, results) {
              neuron.propagate(function(error, result) {
                expect(neuron.error).to.exist
                expect(neuron.error).to.equal(result)

                callback()
              })
            })
          }],
          "new_weights": ["propagate", function(results, callback) {
            async.map(neuron.connections.outgoing, function(connection, callback) {
              callback(null, connection.weight)
            }, callback)
          }] 
        }, function(error, results) {
          expect(_.sortBy(results.weights)).to.not.have.all.members(_.sortBy(results.new_weights))
          expect(_.sortBy(results.weights)).to.not.have.all.deep.members(_.sortBy(results.new_weights))
          
          done()
        })
      })
      
      /*
      should.propagate.solo(neuron)
      */
    })
    
    context("Hidden Neuron", function() {
      let incoming = random.layer()
      let outgoing = random.layer()
      let neuron = new Neuron({
        connections: {
          incoming,
          outgoing
        }
      })
      
      beforeEach(function(done) {
        Layer.activate(incoming, random.inputs(incoming.neurons.length), function(error, results) {
          neuron.activate(function(error, result) {
            Layer.activate(outgoing, function(error, results) { 
              done()
            })
          })
        })
      })
      
      it("should not accept a number as parameter #1", function(done) {
        Layer.propagate(outgoing, random.feedback(outgoing.neurons.length), function(error, results) {
          neuron.propagate(random.number(), function(error, result) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)

            done()
          })
        })
      })
      
      it("should require outgoing neurons to propagate", function(done) {
//         Layer.propagate(outgoing, random.feedback(outgoing.neurons.length), function(error, results) {
          neuron.propagate(random.number(), function(error, result) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)

            done()
          })
//         })
      })
      
      it("should return a number", function(done) {
        outgoing.propagate(random.feedback(outgoing.neurons.length), function(error, results) {
          neuron.propagate(function(error, result) {
            expect(result).to.exist
            expect(result).to.be.a("number")

            done()
          })
        })
      })
      
      it("should save the number returned as `.error`", function(done) {
        outgoing.propagate(random.feedback(outgoing.neurons.length), function(error, results) {
          neuron.propagate(function(error, result) {
            expect(neuron.error).to.exist
            expect(neuron.error).to.equal(result)

            done()
          })
        })
      })
      
      it("should update weights", function(done) {
        async.auto({
          "weights": function(callback) {
            async.map(neuron.connections.outgoing, function(connection, callback) {
              callback(null, connection.weight)
            }, callback)
          },
          "propagate": ["weights", function(result, callback) {
            outgoing.propagate(random.feedback(outgoing.neurons.length), function(error, results) {
              neuron.propagate(function(error, result) {
                expect(neuron.error).to.exist
                expect(neuron.error).to.equal(result)

                callback()
              })
            })
          }],
          "new_weights": ["propagate", function(results, callback) {
            async.map(neuron.connections.outgoing, function(connection, callback) {
              callback(null, connection.weight)
            }, callback)
          }] 
        }, function(error, results) {
          expect(_.sortBy(results.weights)).to.not.have.all.members(_.sortBy(results.new_weights))
          expect(_.sortBy(results.weights)).to.not.have.all.deep.members(_.sortBy(results.new_weights))
          
          done()
        })
      })
      
      /*
      should.propagate.afterOutgoing(neuron)
      */
    })
    
    /*
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
    */
  })
})