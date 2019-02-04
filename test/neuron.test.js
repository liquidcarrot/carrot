 'use strict'

let _ = require('lodash')
let chai = require('chai')
let async = require('async')

chai.use(require('chai-each'))

let expect = chai.expect


describe("Neuron", function() {
  let Neuron = require('../src/neuron')
  let Connection = require('../src/connection')
  let Layer = require('../src/layer')
  
  let random = require('../util/random')
  
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
    feed: {
      /**
      * Runs the following forward propagation tests on the `target` neural object for forward-feeding
      *
      * @param {[Neuron|Layer]} objects - An array of sequentially connected neural objects (i.e. `neurons`, `layers`, `groups`, `networks`)
      * @param {Neuron|Layer} target - Target object on which to run tests
      * @param {[number]|number} inputs - Input(s) for the first neural object in `objects` 
      */
      forward: (objects, target, inputs) => {
        // Hidden/Output Neurons
        if(!target.is.input()) {
          it("should require incoming neurons to activate", function(done) {
            target.activate(function(error, result) {
              expect(error).to.exist
              expect(error).to.be.an.instanceof(Error)

              done()
            })
          })
        }
        
        context("[State]: Can Activate", function() {
          // Activate Neurons
          beforeEach(function(done) {
            let object = _.first(objects)
            let index = 0

            async.until(() => object === target || index < 0, callback => {
              let iterate = (error, results) => {
                ++index
                object = objects[index]
                callback(error, results)
              }

              if(index === 0) {
                object.activate(inputs, iterate)
              } else {
                object.activate(iterate)
              }
            }, (error, results) => done())
          })
          
          // Lone/Input Neurons
          if(target.is.input()) {
            it("should require parameter #1", function(done) {
              target.activate(function(error, result) {
                expect(error).to.exist
                expect(error).to.be.an.instanceof(Error)

                done()
              })
            })
            it("should accept a number as parameter #1", function(done) {
              target.activate(inputs, function(error, result) {
                expect(error).to.not.exist
                expect(error).to.be.null

                done()
              })
            })
          }
          // Hidden/Output Neurons
          else {
            it("should not accept a number as parameter #1", function(done) {
              target.activate(inputs, function(error, result) {
                expect(error).to.exist
                expect(error).to.be.an.instanceof(Error)

                done()
              })
            })
          }
          
          context("[State]: Activated", function() {
            it("should return a number", function(done) {
              let test = (error, result) => {
                expect(result).to.exist
                expect(result).to.be.a("number")

                done()
              }

              if(target.is.input()) {
                target.activate(inputs, test)
              } else {
                target.activate(test)
              }
            })

            it("should save the number returned as `.last`", function(done) {
              let test = (error, result) => {
                expect(target.last).to.exist
                expect(target.last).to.be.a("number")
                expect(target.last).to.equal(result)
                expect(target.last).to.eql(result)

                done()
              }

              if(target.is.input()) {
                target.activate(inputs, test)
              } else {
                target.activate(test)
              }
            })
          })
        })
      },
      /**
      * Activates the following neural objects.
      * Runs the following backward propagation tests on the `target` neural object for backward-feeding
      *
      * @param {[Neuron|Layer]} objects - An array of sequentially connected neural objects (i.e. `neurons`, `layers`, `groups`, `networks`)
      * @param {Neuron|Layer} target - Target object on which to run tests
      * @param {[number]|number} inputs - Input(s) for the first neural object in `objects`
      * @param {[number]|number} feedback - Feedback for the first neural object in `objects` 
      */
      backward: (objects, target, inputs, feedback) => {
        // All Neurons
        it("should require neuron to have activated", done => {
          let test = (error, result) => {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)

            done()
          }
          
          if(target.is.output()) {
            target.propagate(feedback, test)
          } else {
            target.propagate(test)
          }
        })
        
        context("[State]: Activated", function() {
          // Activate Neurons
          beforeEach(function(done) {
            async.eachOfSeries(objects, (object, index, callback) => {
              if(index === 0) {
                object.activate(inputs, callback)
              } else {
                object.activate(callback)
              }
            }, (error, results) => done())
          })

          // Hidden/Input Neurons
          if(!target.is.output()) {
            it("should require outgoing neurons to propagate", function(done) {
              target.propagate(function(error, result) {
                expect(error).to.exist
                expect(error).to.be.an.instanceof(Error)

                done()
              })
            })
          }

          context("[State]: Can Propagate", function() {
            let weights;

            let getWeights = callback => async.map(target.connections.outgoing, (connection, callback) => {
              callback(null, connection.weight)
            }, callback)

            // Propagate Neurons
            beforeEach(function(done) {
              let object = _.last(objects)
              let index = _.size(objects)

              async.until(() => object === target || index < 0, callback => {
                let iterate = (error, results) => {
                  --index
                  object = objects[index]
                  callback(error, results)
                }

                if(index === _.size(objects)) {
                  object.propagate(feedback, iterate)
                } else {
                  object.propagate(iterate)
                }
              }, (error, results) => done())
            })

            // Get Outgoing Weights
            beforeEach(done => getWeights((error, results) => {
              weights = results
              done()
            }))

            // Lone/Output Neurons
            if(target.is.output()) {
              it("should require parameter #1", function(done) {
                target.propagate(function(error, result) {
                  expect(error).to.exist
                  expect(error).to.be.an.instanceof(Error)

                  done()
                })
              })
              it("should accept a number as parameter #1", function(done) {
                target.propagate(random.number(), function(error, result) {
                  expect(error).to.not.exist
                  expect(error).to.be.null

                  done()
                })
              })
            } 
            // Hidden/Input Neurons
            else {
              it("should not accept a number as parameter #1", function(done) {
                target.propagate(random.number(), function(error, result) {
                  expect(error).to.exist
                  expect(error).to.be.an.instanceof(Error)

                  done()
                })
              })
              it("should update weights", function(done) {
                async.auto({
                  "propagate": callback => target.propagate(callback),
                  "weights": ["propagate", (results, callback) => getWeights(callback)] 
                }, function(error, results) {
                  expect(weights).to.not.have.all.members(results.weights)
                  expect(weights).to.not.have.all.deep.members(results.weights)

                  done()
                })
              })
            }
            
            context("[State]: Propagated", function() {
              // All Neurons
              it("should return a number", function(done) {
                let test = (error, result) => {
                  expect(result).to.exist
                  expect(result).to.be.a("number")

                  done()
                }

                if(target.is.output()) {
                  target.propagate(feedback, test)
                } else {
                  target.propagate(test)
                }
              })
              it("should save the number returned as `.error`", function(done) {
                let test = (error, result) => {
                  expect(target.error).to.exist
                  expect(target.error).to.be.a("number")
                  expect(target.error).to.equal(result)
                  expect(target.error).to.eql(result)

                  done()
                }

                if(target.is.output()) {
                  target.propagate(feedback, test)
                } else {
                  target.propagate(test)
                }
              })
            })
          })
        })
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
    context("Lone Neuron", function() {
      let neuron = new Neuron()
      
      should.feed.forward([neuron], neuron, random.number())
    })
    
    context("Input Neuron", function() {
      let neuron = new Neuron({
        connections: {
          outgoing: random.layer()
        }
      })
      
      should.feed.forward([neuron], neuron, random.number())
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
      
      should.feed.forward([incoming, neuron], neuron, random.inputs(incoming.neurons.length))
    })
    
    context("Output Neuron", function() {
      let incoming = random.layer()
      let neuron = new Neuron({
        connections: {
          incoming
        }
      })
      
      should.feed.forward([incoming, neuron], neuron, random.inputs(incoming.neurons.length))
    })
  })
  
  describe(".propagate()", function() {
    context("Lone Neuron", function() {
      let neuron = new Neuron()
      
      should.feed.backward([neuron], neuron, random.number(), random.number())
    })
    
    context("Output Neuron", function() {
      let incoming = random.layer()
      let neuron = new Neuron({
        connections: {
          incoming
        }
      })
      
      should.feed.backward([incoming, neuron], neuron, random.inputs(incoming.neurons.length), random.number())
    })
    
    context("Input Neuron", function() {
      let outgoing = random.layer()
      let neuron = new Neuron({
        connections: {
          outgoing
        }
      })
      
      should.feed.backward([neuron, outgoing], neuron, random.number(), random.feedback(outgoing.neurons.length))
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
      
      should.feed.backward([incoming, neuron, outgoing], neuron, random.inputs(incoming.neurons.length), random.feedback(outgoing.neurons.length))
    })
  })
})