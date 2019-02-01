'use strict'

let _ = require('lodash')
let faker = require('faker')
let chai = require('chai')

chai.use(require('chai-each'))

let expect = chai.expect

describe("Layer", function() {
  let Layer = require('../src/layer')
  let Neuron = require('../src/neuron')
  let Connection = require('../src/connection')
  
  let random = {
    size: () => Math.round(Math.random() * 10 + 1),
    neurons: () => _.times(Math.round(Math.random() * 10 + 1), index => new Neuron()),
    inputs: (n) => _.times((n || Math.round(Math.random() * 10 + 1)), index => Math.round(Math.random() * 10 + 1)),
    feedback: (n) => _.times((n || Math.round(Math.random() * 10 + 1)), index => Math.round(Math.random() * 10 + 1))
  }
  
  describe("new Layer()", function() {
    let layer = new Layer()
    
    it("should create a layer", function(done) {
      expect(layer).to.not.be.null
      expect(layer).to.not.be.undefined
      expect(layer).to.not.be.NaN
      expect(layer).to.exist
      expect(layer).to.be.an.instanceof(Layer)

      done()
    })
    it("should create a layer no neurons", function(done) {
      expect(layer.neurons).to.exist
      expect(layer.neurons).to.be.an("array")
      expect(layer.neurons).to.have.lengthOf(0)

      done()
    })
    
    describe("new Layer(n)", function() {
      let neurons = Math.round(Math.random() * 10 + 1)
      let layer = new Layer(neurons)
      
      it("should create a layer", function(done) {
        expect(layer).to.not.be.null
        expect(layer).to.not.be.undefined
        expect(layer).to.not.be.NaN
        expect(layer).to.exist
        expect(layer).to.be.an.instanceof(Layer)

        done()
      })
      it("should create a layer with 'n' neurons", function(done) {
        expect(layer.neurons).to.exist
        expect(layer.neurons).to.be.an("array")
        expect(layer.neurons).to.have.lengthOf(neurons)

        done()
      })
      
      describe("new Layer(n, {...})", function() {
        let neurons = Math.round(Math.random() * 10 + 1)
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
        let layer = new Layer(neurons, options)
        
        it("should create a layer", function(done) {
          expect(layer).to.not.be.null
          expect(layer).to.not.be.undefined
          expect(layer).to.not.be.NaN
          expect(layer).to.exist
          expect(layer).to.be.an.instanceof(Layer)
          
          done()
        })
        it("should create a layer with 'n' neurons", function(done) {
          expect(layer.neurons).to.exist
          expect(layer.neurons).to.be.an("array")
          expect(layer.neurons).to.have.lengthOf(neurons)
          
          done()
        })
        it("every neurons gets constructed with 'options'", function(done) {
          _.each(layer.neurons, function(neuron, neuron_index) {
            expect(neuron.bias).to.equal(options.bias)
            expect(neuron.rate).to.equal(options.rate)
            expect(neuron.activation).to.satisfy(function(activation) {
              if(options.activation && typeof options.activation === "string") {
                if(options.activation.toLowerCase() === "sigmoid" || 
                   options.activation.toLowerCase() === "sigmoidal" ||
                   options.activation.toLowerCase() === "logistic" ||
                   options.activation.toLowerCase() === "logistics") {
                  return activation === Neuron.activations.SIGMOID
                } else if(options.activation.toLowerCase() === "relu") {
                  return activation === Neuron.activations.RELU
                } else if(options.activation.toLowerCase() === "tanh") {
                  return activation === Neuron.activations.TANH
                } else if(options.activation.toLowerCase() === "linear" ||
                          options.activation.toLowerCase() === "identity") {
                  return activation === Neuron.activations.LINEAR
                } else {
                  return false
                }
              } else if(options.activation && typeof options.activation === "function") {
                return activation === options.activation
              } else {
                return false
              }
            })
            _.each(neuron.connections.incoming, function(connection, connection_index) {
              expect(connection.from).to.eql(options.connections.incoming[connection_index])
              expect(connection.to).to.equal(neuron)
            })
            _.each(neuron.connections.outgoing, function(connection, connection_index) {
              expect(connection.to).to.eql(options.connections.outgoing[connection_index])
              expect(connection.from).to.equal(neuron)
            })
          })
          
          done()
        })
        
        describe("new Layer(n, { 'connections': { 'incoming': Layer, 'outgoing': Layer } })", function() {
          let options = {
            connections: {
              incoming: new Layer(Math.round(Math.random() * 10 + 1)),
              outgoing: new Layer(Math.round(Math.random() * 10 + 1))
            }
          }
          let layer = new Layer(Math.round(Math.random() * 10 + 1), options)
          
          it("should create a connection from every neuron in the incoming layer to every neuron in the created layer", function(done) {
            _.each(layer.neurons, function(neuron, index) {
              expect(neuron.connections).to.exist
              expect(neuron.connections.incoming).to.exist
              expect(neuron.connections.incoming).to.be.an("array")
              expect(neuron.connections.incoming).to.have.lengthOf(options.connections.incoming.neurons.length)
              expect(neuron.connections.incoming).to.each.satisfy(function(connection) {
                return connection instanceof Connection
              })
            })
            
            done()
          })
          it("should create a connection to every neuron in the outgoing layer from every neuron in the created layer", function(done) {
            _.each(layer.neurons, function(neuron, index) {
              expect(neuron.connections).to.exist
              expect(neuron.connections.outgoing).to.exist
              expect(neuron.connections.outgoing).to.be.an("array")
              expect(neuron.connections.outgoing).to.have.lengthOf(options.connections.outgoing.neurons.length)
              expect(neuron.connections.outgoing).to.each.satisfy(function(connection) {
                return connection instanceof Connection
              })
            })
            
            done()
          })
          it("should add an outgoing connection to every neuron in the incoming layer for every neuron in the created layer", function(done) {
            expect(options.connections.incoming).to.exist
            expect(options.connections.incoming).to.be.an.instanceOf(Layer)
            expect(options.connections.incoming.neurons).to.exist
            expect(options.connections.incoming.neurons).to.be.an("array")
            expect(options.connections.incoming.neurons).to.each.be.an.instanceOf(Neuron)
            // For every incoming neuron, its outgoing connections point to, at least, all the created layer neurons
            _.each(options.connections.incoming.neurons, function(neuron, index) {
              expect(_.map(neuron.connections.outgoing, function(connection) {
                return connection.to
              })).to.have.all.members(layer.neurons)
            })
            
            done()
          })
          it("should add an incoming connection to every neuron in the outgoing layer for every neuron in the created layer", function(done) {
            expect(options.connections.outgoing).to.exist
            expect(options.connections.outgoing).to.be.an.instanceOf(Layer)
            expect(options.connections.outgoing.neurons).to.exist
            expect(options.connections.outgoing.neurons).to.be.an("array")
            expect(options.connections.outgoing.neurons).to.each.be.an.instanceOf(Neuron)
            // For every outgoing neuron, its incoming connections point to, at least, all the created layer neurons
            _.each(options.connections.outgoing.neurons, function(neuron, index) {
              expect(_.map(neuron.connections.incoming, function(connection) {
                return connection.from
              })).to.have.all.members(layer.neurons)
            })
            
            done()
          })
        })
        
        describe("new Layer(n, { 'connections': { 'incoming': [Neuron], 'outgoing': [Neuron] } })", function() {
          let options = {
            connections: {
              incoming: _.times(Math.round(Math.random() * 10 + 1), function() {
                return new Neuron()
              }),
              outgoing: _.times(Math.round(Math.random() * 10 + 1), function() {
                return new Neuron()
              })
            }
          }
          let layer = new Layer(Math.round(Math.random() * 10 + 1), options)
          
          it("should create a connection from every given neuron to every neuron in the created layer", function(done) {
            _.each(layer.neurons, function(neuron, index) {
              expect(neuron.connections).to.exist
              expect(neuron.connections.incoming).to.exist
              expect(neuron.connections.incoming).to.be.an("array")
              expect(neuron.connections.incoming).to.have.lengthOf(options.connections.incoming.length)
              expect(neuron.connections.incoming).to.each.satisfy(function(connection) {
                return connection instanceof Connection
              })
            })
            
            done()
          })
          it("should create a connection to every given neuron from every neuron in the created layer", function(done) {
            _.each(layer.neurons, function(neuron, index) {
              expect(neuron.connections).to.exist
              expect(neuron.connections.outgoing).to.exist
              expect(neuron.connections.outgoing).to.be.an("array")
              expect(neuron.connections.outgoing).to.have.lengthOf(options.connections.outgoing.length)
              expect(neuron.connections.outgoing).to.each.satisfy(function(connection) {
                return connection instanceof Connection
              })
            })
            
            done()
          })
          it("should add an outgoing connection to every given neuron for every neuron in the created layer", function(done) {
            expect(options.connections.incoming).to.exist
            expect(options.connections.incoming).to.be.an("array")
            expect(options.connections.incoming).to.each.be.an.instanceOf(Neuron)
            // For every incoming neuron, its outgoing connections point to, at least, all the created layer neurons
            _.each(options.connections.incoming, function(neuron, index) {
              expect(_.map(neuron.connections.outgoing, function(connection) {
                return connection.to
              })).to.have.all.members(layer.neurons)
            })
            
            done()
          })
          it("should add an incoming connection to every given neuron for every neuron in the created layer", function(done) {
            expect(options.connections.outgoing).to.exist
            expect(options.connections.outgoing).to.be.an("array")
            expect(options.connections.outgoing).to.each.be.an.instanceOf(Neuron)
            // For every outgoing neuron, its incoming connections point to, at least, all the created layer neurons
            _.each(options.connections.outgoing, function(neuron, index) {
              expect(_.map(neuron.connections.incoming, function(connection) {
                return connection.from
              })).to.have.all.members(layer.neurons)
            })
            
            done()
          })
        })
      })
    })
    
    describe("new Layer([Neuron])", function() {
      let neurons = _.times(Math.round(Math.random() * 10 + 1), function() {
        return new Neuron({
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
        })
      })
      let layer = new Layer(neurons)

      it("should create a layer", function(done) {
        expect(layer).to.not.be.null
        expect(layer).to.not.be.undefined
        expect(layer).to.not.be.NaN
        expect(layer).to.exist
        expect(layer).to.be.an.instanceof(Layer)

        done()
      })
      it("should create a layer with the same number of neurons as the given array", function(done) {
        expect(layer.neurons).to.exist
        expect(layer.neurons).to.be.an("array")
        expect(layer.neurons).to.have.lengthOf(neurons.length)
        
        done()
      })
      it("should create a layer whose neuron's properties match the properties of the given neurons", function(done) {
        _.each(layer.neurons, function(neuron, neuron_index) {
          expect(neuron.bias).to.equal(neurons[neuron_index].bias)
          expect(neuron.rate).to.equal(neurons[neuron_index].rate)
          expect(neuron.activation).to.equal(neurons[neuron_index].activation)
          expect(neuron.activation).to.eql(neurons[neuron_index].activation)
          _.each(neuron.connections.incoming, function(connection, connection_index) {
            expect(neuron.connections.incoming[connection_index].from).to.eql(neurons[neuron_index].connections.incoming[connection_index].from)
            expect(neuron.connections.incoming[connection_index].to).to.not.eql(neurons[neuron_index].connections.incoming[connection_index].to)
            expect(neuron.connections.incoming[connection_index].to).to.equal(neuron)
          })
          _.each(neuron.connections.outgoing, function(connection, connection_index) {
            expect(neuron.connections.outgoing[connection_index].to).to.eql(neurons[neuron_index].connections.outgoing[connection_index].to)
            expect(neuron.connections.outgoing[connection_index].from).to.not.eql(neurons[neuron_index].connections.outgoing[connection_index].from)
            expect(neuron.connections.outgoing[connection_index].from).to.equal(neuron)
          })
        })

        done()
      })
      
      describe("new Layer([Neuron], {...})", function() {
        let neurons = _.times(Math.round(Math.random() * 10 + 1), function() {
          return new Neuron({
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
          })
        })
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
        let layer = new Layer(neurons, options)
        
        it("should create a layer", function(done) {
          expect(layer).to.not.be.null
          expect(layer).to.not.be.undefined
          expect(layer).to.not.be.NaN
          expect(layer).to.exist
          expect(layer).to.be.an.instanceof(Layer)
          
          done()
        })
        it("should create a layer with the same number of neurons as the given array", function(done) {
          expect(layer.neurons).to.exist
          expect(layer.neurons).to.be.an("array")
          expect(layer.neurons).to.have.lengthOf(neurons.length)
          
          done()
        })
        it("should overwrite given neuron properties with `options`", function(done) {
          _.each(layer.neurons, function(neuron, neuron_index) {
            expect(neuron.bias).to.equal(options.bias)
            expect(neuron.rate).to.equal(options.rate)
            expect(neuron.activation).to.satisfy(function(activation) {
              if(options.activation && typeof options.activation === "string") {
                if(options.activation.toLowerCase() === "sigmoid" || 
                   options.activation.toLowerCase() === "sigmoidal" ||
                   options.activation.toLowerCase() === "logistic" ||
                   options.activation.toLowerCase() === "logistics") {
                  return activation === Neuron.activations.SIGMOID
                } else if(options.activation.toLowerCase() === "relu") {
                  return activation === Neuron.activations.RELU
                } else if(options.activation.toLowerCase() === "tanh") {
                  return activation === Neuron.activations.TANH
                } else if(options.activation.toLowerCase() === "linear" ||
                          options.activation.toLowerCase() === "identity") {
                  return activation === Neuron.activations.LINEAR
                } else {
                  return false
                }
              } else if(options.activation && typeof options.activation === "function") {
                return activation === options.activation
              } else {
                return false
              }
            })
            _.each(neuron.connections.incoming, function(connection, connection_index) {
              expect(connection.from).to.eql(options.connections.incoming[connection_index])
              expect(connection.to).to.equal(neuron)
            })
            _.each(neuron.connections.outgoing, function(connection, connection_index) {
              expect(connection.to).to.eql(options.connections.outgoing[connection_index])
              expect(connection.from).to.equal(neuron)
            })
          })
          
          done()
        })
        
        /**
        * Connections passed through options should not overwrite connections of the given neurons.
        * New layer could have more connections than those passed through options.
        *
        * WARNING: We are not currently testing for this OR supporting this behavior
        */
        describe("new Layer([Neuron], { 'connections': { 'incoming': Layer, 'outgoing': Layer } })", function() {
          let neurons = _.times(Math.round(Math.random() * 10 + 1), function() {
            return new Neuron()
          })
          let options = {
            connections: {
              incoming: new Layer(Math.round(Math.random() * 10 + 1)),
              outgoing: new Layer(Math.round(Math.random() * 10 + 1))
            }
          }
          let layer = new Layer(neurons, options)
          
          it("should create a connection from every neuron in the incoming layer to every neuron in the created layer", function(done) {
            _.each(layer.neurons, function(neuron, index) {
              expect(neuron.connections).to.exist
              expect(neuron.connections.incoming).to.exist
              expect(neuron.connections.incoming).to.be.an("array")
              expect(neuron.connections.incoming).to.have.lengthOf(options.connections.incoming.neurons.length)
              expect(neuron.connections.incoming).to.each.satisfy(function(connection) {
                return connection instanceof Connection
              })
            })
            
            done()
          })
          it("should create a connection from every neuron in the outgoing layer to every neuron in the created layer", function(done) {
            _.each(layer.neurons, function(neuron, index) {
              expect(neuron.connections).to.exist
              expect(neuron.connections.outgoing).to.exist
              expect(neuron.connections.outgoing).to.be.an("array")
              expect(neuron.connections.outgoing).to.have.lengthOf(options.connections.outgoing.neurons.length)
              expect(neuron.connections.outgoing).to.each.satisfy(function(connection) {
                return connection instanceof Connection
              })
            })
            
            done()
          })
          it("should add an outgoing connection to every neuron in the incoming layer for every neuron in the created layer", function(done) {
            expect(options.connections.incoming).to.exist
            expect(options.connections.incoming).to.be.an.instanceOf(Layer)
            expect(options.connections.incoming.neurons).to.exist
            expect(options.connections.incoming.neurons).to.be.an("array")
            expect(options.connections.incoming.neurons).to.each.be.an.instanceOf(Neuron)
            // For every incoming neuron, its outgoing connections point to, at least, all the created layer neurons
            _.each(options.connections.incoming.neurons, function(neuron, index) {
              expect(_.map(neuron.connections.outgoing, function(connection) {
                return connection.to
              })).to.have.all.members(layer.neurons)
            })
            
            done()
          })
          it("should add an incoming connection to every neuron in the outgoing layer for every neuron in the created layer", function(done) {
            expect(options.connections.outgoing).to.exist
            expect(options.connections.outgoing).to.be.an.instanceOf(Layer)
            expect(options.connections.outgoing.neurons).to.exist
            expect(options.connections.outgoing.neurons).to.be.an("array")
            expect(options.connections.outgoing.neurons).to.each.be.an.instanceOf(Neuron)
            // For every outgoing neuron, its incoming connections point to, at least, all the created layer neurons
            _.each(options.connections.outgoing.neurons, function(neuron, index) {
              expect(_.map(neuron.connections.incoming, function(connection) {
                return connection.from
              })).to.have.all.members(layer.neurons)
            })
            
            done()
          })
        })
        
        describe("new Layer([Neuron], { 'connections': { 'incoming': [Neuron], 'outgoing': [Neuron] } })", function() {
          let neurons = _.times(Math.round(Math.random() * 10 + 1), function() {
            return new Neuron()
          })
          let options = {
            connections: {
              incoming: _.times(Math.round(Math.random() * 10 + 1), function() {
                return new Neuron()
              }),
              outgoing: _.times(Math.round(Math.random() * 10 + 1), function() {
                return new Neuron()
              })
            }
          }
          let layer = new Layer(neurons, options)
          
          it("should create a connection from every given neuron to every neuron in the created layer", function(done) {
            _.each(layer.neurons, function(neuron, index) {
              expect(neuron.connections).to.exist
              expect(neuron.connections.incoming).to.exist
              expect(neuron.connections.incoming).to.be.an("array")
              expect(neuron.connections.incoming).to.have.lengthOf(options.connections.incoming.length)
              expect(neuron.connections.incoming).to.each.satisfy(function(connection) {
                return connection instanceof Connection
              })
            })
            
            done()
          })
          it("should create a connection to every given neuron from every neuron in the created layer", function(done) {
            _.each(layer.neurons, function(neuron, index) {
              expect(neuron.connections).to.exist
              expect(neuron.connections.outgoing).to.exist
              expect(neuron.connections.outgoing).to.be.an("array")
              expect(neuron.connections.outgoing).to.have.lengthOf(options.connections.outgoing.length)
              expect(neuron.connections.outgoing).to.each.satisfy(function(connection) {
                return connection instanceof Connection
              })
            })
            
            done()
          })
          it("should add an outgoing connection to every given neuron for every neuron in the created layer", function(done) {
            expect(options.connections.incoming).to.exist
            expect(options.connections.incoming).to.be.an("array")
            expect(options.connections.incoming).to.each.be.an.instanceOf(Neuron)
            // For every incoming neuron, its outgoing connections point to, at least, all the created layer neurons
            _.each(options.connections.incoming, function(neuron, index) {
              expect(_.map(neuron.connections.outgoing, function(connection) {
                return connection.to
              })).to.have.all.members(layer.neurons)
            })
            
            done()
          })
          it("should add an incoming connection to every given neuron for every neuron in the created layer", function(done) {
            expect(options.connections.outgoing).to.exist
            expect(options.connections.outgoing).to.be.an("array")
            expect(options.connections.outgoing).to.each.be.an.instanceOf(Neuron)
            // For every outgoing neuron, its incoming connections point to, at least, all the created layer neurons
            _.each(options.connections.outgoing, function(neuron, index) {
              expect(_.map(neuron.connections.incoming, function(connection) {
                return connection.from
              })).to.have.all.members(layer.neurons)
            })
            
            done()
          })
        })
      })
    })
    
    describe("new Layer(layer)", function() {
      let neurons = _.times(Math.round(Math.random() * 10 + 1), function() {
        return new Neuron({
          bias: Math.random(),
          rate: Math.random(),
          activation: faker.random.arrayElement(["sigmoid", "sigmoidal", "logistic", "logistics", "relu", "tanh", "linear", "identity", function(x, derivative) {
            return !derivative ? Math.atan(x) : (1 / (Math.pow(x, 2) + 1))
          }])
        })
      })
      
      let other_layer = new Layer(neurons)
      let layer = new Layer(other_layer)
      
      it("should create a layer", function(done) {
        expect(layer).to.not.be.null
        expect(layer).to.not.be.undefined
        expect(layer).to.not.be.NaN
        expect(layer).to.exist
        expect(layer).to.be.an.instanceof(Layer)

        done()
      })
      it("should create a layer with the same number of neurons as the given layer", function(done) {
        expect(layer.neurons).to.exist
        expect(layer.neurons).to.be.an("array")
        expect(layer.neurons).to.have.lengthOf(other_layer.neurons.length)

        done()
      })
      it("should create a layer whose neuron's properties match the properties of the given layer's neurons", function(done) {
        _.each(layer.neurons, function(neuron, neuron_index) {
          expect(neuron.bias).to.equal(other_layer.neurons[neuron_index].bias)
          expect(neuron.rate).to.equal(other_layer.neurons[neuron_index].rate)
          expect(neuron.activation).to.equal(other_layer.neurons[neuron_index].activation)
          expect(neuron.activation).to.eql(other_layer.neurons[neuron_index].activation)
          _.each(neuron.connections.incoming, function(connection, connection_index) {
            expect(neuron.connections.incoming[connection_index].from).to.eql(other_layer.neurons[neuron_index].connections.incoming[connection_index].from)
            expect(neuron.connections.incoming[connection_index].to).to.not.eql(other_layer.neurons[neuron_index].connections.incoming[connection_index].to)
            expect(neuron.connections.incoming[connection_index].to).to.equal(neuron)
          })
          _.each(neuron.connections.outgoing, function(connection, connection_index) {
            expect(neuron.connections.outgoing[connection_index].to).to.eql(other_layer.neurons[neuron_index].connections.outgoing[connection_index].to)
            expect(neuron.connections.outgoing[connection_index].from).to.not.eql(other_layer.neurons[neuron_index].connections.outgoing[connection_index].from)
            expect(neuron.connections.outgoing[connection_index].from).to.equal(neuron)
          })
        })

        done()
      })
      
      describe("new Layer(layer, {...})", function() {
        let other_layer = new Layer(Math.round(Math.random() * 10 + 1))
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
        let layer = new Layer(other_layer, options)

        
        it("should create a layer", function(done) {
          expect(layer).to.not.be.null
          expect(layer).to.not.be.undefined
          expect(layer).to.not.be.NaN
          expect(layer).to.exist
          expect(layer).to.be.an.instanceof(Layer)
          
          done()
        })
        it("should create a layer with the same number of neurons as the given layer", function(done) {
          expect(layer.neurons).to.exist
          expect(layer.neurons).to.be.an("array")
          expect(layer.neurons).to.have.lengthOf(other_layer.neurons.length)
          
          done()
        })
        it("should overwrite the properties of the given layer's neurons with `options`", function(done) {
          _.each(layer.neurons, function(neuron, neuron_index) {
            expect(neuron.bias).to.equal(options.bias)
            expect(neuron.rate).to.equal(options.rate)
            expect(neuron.activation).to.satisfy(function(activation) {
              if(options.activation && typeof options.activation === "string") {
                if(options.activation.toLowerCase() === "sigmoid" || 
                   options.activation.toLowerCase() === "sigmoidal" ||
                   options.activation.toLowerCase() === "logistic" ||
                   options.activation.toLowerCase() === "logistics") {
                  return activation === Neuron.activations.SIGMOID
                } else if(options.activation.toLowerCase() === "relu") {
                  return activation === Neuron.activations.RELU
                } else if(options.activation.toLowerCase() === "tanh") {
                  return activation === Neuron.activations.TANH
                } else if(options.activation.toLowerCase() === "linear" ||
                          options.activation.toLowerCase() === "identity") {
                  return activation === Neuron.activations.LINEAR
                } else {
                  return false
                }
              } else if(options.activation && typeof options.activation === "function") {
                return activation === options.activation
              } else {
                return false
              }
            })
            _.each(neuron.connections.incoming, function(connection, connection_index) {
              expect(connection.from).to.eql(options.connections.incoming[connection_index])
              expect(connection.to).to.equal(neuron)
            })
            _.each(neuron.connections.outgoing, function(connection, connection_index) {
              expect(connection.to).to.eql(options.connections.outgoing[connection_index])
              expect(connection.from).to.equal(neuron)
            })
          })
          
          done()
        })
        
        /**
        * Connections passed through options should not overwrite connections of the given layer.
        * New layer could have more connections than those passed through options.
        *
        * WARNING: We are not currently testing for this OR supporting this behavior
        */
        describe("new Layer(layer, { 'connections': { 'incoming': Layer, 'outgoing': Layer } })", function() {
          let other_layer = new Layer(Math.round(Math.random() * 10 + 1)) 
          let options = {
            connections: {
              incoming: new Layer(Math.round(Math.random() * 10 + 1)),
              outgoing: new Layer(Math.round(Math.random() * 10 + 1))
            }
          }
          let layer = new Layer(other_layer, options)
          
          it("should create a connection from every neuron in the incoming layer to every neuron in the created layer", function(done) {
            _.each(layer.neurons, function(neuron, index) {
              expect(neuron.connections).to.exist
              expect(neuron.connections.incoming).to.exist
              expect(neuron.connections.incoming).to.be.an("array")
              expect(neuron.connections.incoming).to.have.lengthOf(options.connections.incoming.neurons.length)
              expect(neuron.connections.incoming).to.each.satisfy(function(connection) {
                return connection instanceof Connection
              })
            })
            
            done()
          })
          it("should create a connection from every neuron in the outgoing layer to every neuron in the created layer", function(done) {
            _.each(layer.neurons, function(neuron, index) {
              expect(neuron.connections).to.exist
              expect(neuron.connections.outgoing).to.exist
              expect(neuron.connections.outgoing).to.be.an("array")
              expect(neuron.connections.outgoing).to.have.lengthOf(options.connections.outgoing.neurons.length)
              expect(neuron.connections.outgoing).to.each.satisfy(function(connection) {
                return connection instanceof Connection
              })
            })
            
            done()
          })
          it("should add an outgoing connection to every neuron in the incoming layer for every neuron in the created layer", function(done) {
            expect(options.connections.incoming).to.exist
            expect(options.connections.incoming).to.be.an.instanceOf(Layer)
            expect(options.connections.incoming.neurons).to.exist
            expect(options.connections.incoming.neurons).to.be.an("array")
            expect(options.connections.incoming.neurons).to.each.be.an.instanceOf(Neuron)
            // For every incoming neuron, its outgoing connections point to, at least, all the created layer neurons
            _.each(options.connections.incoming.neurons, function(neuron, index) {
              expect(_.map(neuron.connections.outgoing, function(connection) {
                return connection.to
              })).to.have.all.members(layer.neurons)
            })
            
            done()
          })
          it("should add an incoming connection to every neuron in the outgoing layer for every neuron in the created layer", function(done) {
            expect(options.connections.outgoing).to.exist
            expect(options.connections.outgoing).to.be.an.instanceOf(Layer)
            expect(options.connections.outgoing.neurons).to.exist
            expect(options.connections.outgoing.neurons).to.be.an("array")
            expect(options.connections.outgoing.neurons).to.each.be.an.instanceOf(Neuron)
            // For every outgoing neuron, its incoming connections point to, at least, all the created layer neurons
            _.each(options.connections.outgoing.neurons, function(neuron, index) {
              expect(_.map(neuron.connections.incoming, function(connection) {
                return connection.from
              })).to.have.all.members(layer.neurons)
            })
            
            done()
          })
        })
        
        describe("new Layer(layer, { 'connections': { 'incoming': [Neuron], 'outgoing': [Neuron] } })", function() {
          let other_layer = new Layer(Math.round(Math.random() * 10 + 1)) 
          let options = {
            connections: {
              incoming: _.times(Math.round(Math.random() * 10 + 1), function() {
                return new Neuron()
              }),
              outgoing: _.times(Math.round(Math.random() * 10 + 1), function() {
                return new Neuron()
              })
            }
          }
          let layer = new Layer(other_layer, options)
          
          it("should create a connection from every given neuron to every neuron in the created layer", function(done) {
            _.each(layer.neurons, function(neuron, index) {
              expect(neuron.connections).to.exist
              expect(neuron.connections.incoming).to.exist
              expect(neuron.connections.incoming).to.be.an("array")
              expect(neuron.connections.incoming).to.have.lengthOf(options.connections.incoming.length)
              expect(neuron.connections.incoming).to.each.satisfy(function(connection) {
                return connection instanceof Connection
              })
            })
            
            done()
          })
          it("should create a connection to every given neuron from every neuron in the created layer", function(done) {
            _.each(layer.neurons, function(neuron, index) {
              expect(neuron.connections).to.exist
              expect(neuron.connections.outgoing).to.exist
              expect(neuron.connections.outgoing).to.be.an("array")
              expect(neuron.connections.outgoing).to.have.lengthOf(options.connections.outgoing.length)
              expect(neuron.connections.outgoing).to.each.satisfy(function(connection) {
                return connection instanceof Connection
              })
            })
            
            done()
          })
          it("should add an outgoing connection to every given neuron for every neuron in the created layer", function(done) {
            expect(options.connections.incoming).to.exist
            expect(options.connections.incoming).to.be.an("array")
            expect(options.connections.incoming).to.each.be.an.instanceOf(Neuron)
            // For every incoming neuron, its outgoing connections point to, at least, all the created layer neurons
            _.each(options.connections.incoming, function(neuron, index) {
              expect(_.map(neuron.connections.outgoing, function(connection) {
                return connection.to
              })).to.have.all.members(layer.neurons)
            })
            
            done()
          })
          it("should add an incoming connection to every given neuron for every neuron in the created layer", function(done) {
            expect(options.connections.outgoing).to.exist
            expect(options.connections.outgoing).to.be.an("array")
            expect(options.connections.outgoing).to.each.be.an.instanceOf(Neuron)
            // For every outgoing neuron, its incoming connections point to, at least, all the created layer neurons
            _.each(options.connections.outgoing, function(neuron, index) {
              expect(_.map(neuron.connections.incoming, function(connection) {
                return connection.from
              })).to.have.all.members(layer.neurons)
            })
            
            done()
          })
        })
      })
    })
  })
  
  describe(".project()", function() {
    describe(".project(neuron[, callback])", function() {
      let layer = new Layer(Math.round(Math.random() * 10 + 1))
      let neuron = new Neuron()
      
      layer.project(neuron, function(error, connections) {
        it("should create one connection for every neuron in layer", function(done) {
          expect(connections).to.exist
          expect(connections).to.be.an("array")
          expect(connections).to.have.lengthOf(layer.neurons.length)
          expect(_.every(connections, function(connection) {
            return connection instanceof Connection
          })).to.equal(true)
          
          done()
        })
        it("should add a connection from every neuron in the layer to destination neuron's incoming connections", function(done) {
          expect(neuron.connections.incoming).to.exist
          expect(neuron.connections.incoming).to.be.an("array")
          expect(neuron.connections.incoming).to.have.lengthOf(layer.neurons.length)
          expect(_.map(neuron.connections.incoming, function(connection) {
            return connection.from
          })).to.have.all.members(layer.neurons)
          
          done()
        })
        it("should add an outgoing connection, to the desitination neuron, to every neuron in the layer", function(done) {
          expect(layer.neurons).to.each.satisfy(function(layer_neuron) {
            return layer_neuron.connections.outgoing[0].to === neuron
          })
          
          done()
        })
      })
    })

    describe(".project(layer[, callback])", function() {
      let layer = new Layer(Math.round(Math.random() * 10 + 1))
      let other_layer = new Layer(Math.round(Math.random() * 10 + 1))
      
      layer.project(other_layer, function(error, connections) {
        it("should create a connection from every neuron in one layer towards every neuron in another layer", function(done) {
          expect(connections).to.exist
          expect(connections).to.be.an("array")
          expect(connections).to.each.be.an.instanceof(Connection)
          expect(connections).to.have.lengthOf(layer.neurons.length * other_layer.neurons.length)
          
          done()
        })
        it("should add an outgoing connection to every neuron in the source layer for every neuron in the destination layer", function(done) {
          expect(_.map(layer.neurons, function(neuron) {
            return _.map(neuron.connections.outgoing, function(connection) {
              return connection.to
            })
          })).to.each.have.all.members(other_layer.neurons)
          
          done()
        })
        it("should add an incoming connection to every neuron in the destination layer for every neuron in the source layer", function(done) {
          expect(_.map(other_layer.neurons, function(neuron) {
            return _.map(neuron.connections.incoming, function(connection) {
              return connection.from
            })
          })).to.each.have.all.members(layer.neurons)
          
          done()
        })
      })
    })

    describe.skip(".project(group[, callback])", function() {
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
  
  describe(".is.input()", function() {
    let layer = new Layer(Math.round(Math.random() * 10 + 1))
    
    it("should return a boolean value", function(done) {
      expect(layer.is.input()).to.be.a("boolean")
      
      done()
    })
    it("should return true if all neurons in layer have no incoming connections", function(done) {
      expect(layer.neurons).to.each.satisfy(function(neuron) {
        return neuron.is.input()
      })
      expect(layer.is.input()).to.equal(true)
      
      done()
    })
    it("should return false is at least one neuron has an incoming connection", function(done) {
      let neuron = new Neuron()
      
      neuron.project(layer.neurons[0], function(error, connection) {
        expect(layer.is.input()).to.equal(false)
        
        done()
      })
    })
  })
  
  describe(".is.output()", function() {
    let layer = new Layer(Math.round(Math.random() * 10 + 1))
    
    it("should return a boolean value", function(done) {
      expect(layer.is.output()).to.be.a("boolean")
      
      done()
    })
    it("should return true if all neurons in layer have no outgoing connections", function(done) {
      expect(layer.neurons).to.each.satisfy(function(neuron) {
        return neuron.is.output()
      })
      expect(layer.is.output()).to.equal(true)
      
      done()
    })
    it("should return false is at least one neuron has an incoming connection", function(done) {
      let neuron = new Neuron()
      
      layer.neurons[0].project(neuron, function(error, connection) {
        expect(layer.is.output()).to.equal(false)
        
        done()
      })
    })
  })

  describe(".activate()", function() {
    describe(".activate([inputs][, callback])", function() {
      let layer_size = Math.round(Math.random() * 10 + 1)
      let inputs = _.times(layer_size, function() {
        return Math.random()
      })
      let layer = new Layer(layer_size)
      
      it("should take an array of real numbers as a parameter", function(done) {
        layer.activate(inputs, function(error, outputs) {
          expect(error).to.not.exist
          expect(error).to.be.null
          
          done()
        })
      })
      it("should return an array of real numbers with a length equal to the number of neurons in the layer", function(done) {
        layer.activate(inputs, function(error, outputs) {
          expect(outputs).to.exist
          expect(outputs).to.be.an("array")
          expect(outputs.length).to.equal(layer.neurons.length)
          expect(outputs).to.each.satisfy(function(number) {
            return typeof number === "number"
          })
          
          done()
        })
      })
    })
    describe(".activate([,callback])", function() {
      let other_layer = new Layer(Math.round(Math.random() * 10 + 1))
      let layer = new Layer(Math.round(Math.random() * 10 + 1))
      
      let inputs = _.times(other_layer.neurons.length, function() {
        return Math.random()
      })
      
      it("should return an array of real numbers with a length equal to the number of neurons in the layer", function(done) {
        other_layer.project(layer, function(error, connections) {
          other_layer.activate(inputs, function(error, outputs) {
            layer.activate(function(error, outputs) {
              expect(error).to.not.exist
              expect(error).to.be.null
              expect(outputs).to.exist
              expect(outputs).to.be.an("array")
              expect(outputs.length).to.equal(layer.neurons.length)
              expect(outputs).to.each.satisfy(function(number) {
                return typeof number === "number"
              })
              
              done()
            })
          })
        })
      })
    })
  })
  
  describe(".propagate()", function() {
    describe(".propagate([feedback][, callback])", function() {
      let layer = new Layer(Math.round(Math.round() * 10 + 1))
      
      let inputs = _.times(layer.neurons.length, function() {
        return Math.random()
      })
      let expected = _.times(layer.neurons.length, function() {
        return Math.random()
      })
      
      it("should take an array of real numbers as a parameter", function(done) {
        layer.activate(inputs, function(error, outputs) {
          layer.propagate(expected, function(error, critiques) {
            expect(error).to.not.exist
            expect(error).to.be.null
            
            done()
          })
        })
      })
      it("should return an array of real numbers with a length equal to the number of neurons in the layer", function(done) {
        layer.activate(inputs, function(error, outputs) {
          layer.propagate(expected, function(error, critiques) {
            expect(critiques).to.exist
            expect(critiques).to.be.an("array")
            expect(critiques.length).to.equal(layer.neurons.length)
            expect(critiques).to.each.satisfy(function(number) {
              return typeof number === "number"
            })
            
            done()
          })
        })
      })
    })
    describe(".propagate([callback])", function() {
      it("should return an array of real numbers with a length equal to the number of neurons in the layer", function(done) {
        let layer = new Layer(Math.round(Math.random() * 10 + 1))
        let other_layer = new Layer(Math.round(Math.random() * 10 + 1))

        let inputs = _.times(layer.neurons.length, function() {
          return Math.random()
        })
        let expected = _.times(other_layer.neurons.length, function() {
          return Math.random()
        })
        
        layer.project(other_layer, function(error, connections) {
          layer.activate(inputs, function(error, ouputs) {
            other_layer.activate(function(error, outputs) {
              other_layer.propagate(expected, function(error, critiques) {
                layer.propagate(function(error, critiques) {
                  expect(error).to.not.exist
                  expect(error).to.be.null
                  expect(critiques).to.exist
                  expect(critiques).to.be.an("array")
                  expect(critiques.length).to.equal(layer.neurons.length)
                  expect(critiques).to.each.satisfy(function(number) {
                    return typeof number === "number"
                  })
                  
                  done()
                })
              })
            })
          })
        })
      })
      it("should update weights of outgoing connections", function(done) {
        let layer = new Layer(Math.round(Math.random() * 10 + 1))
        let other_layer = new Layer(Math.round(Math.random() * 10 + 1))

        let inputs = _.times(layer.neurons.length, function() {
          return Math.random()
        })
        let expected = _.times(other_layer.neurons.length, function() {
          return Math.random()
        })
        let initial_weights = []
        let final_weights = []
        
        layer.project(other_layer, function(error, connections) {
          initial_weights = _.map(connections, function(connection) {
            return connection.weight
          })
          
          layer.activate(inputs, function(error, ouputs) {
            other_layer.activate(function(error, outputs) {
              other_layer.propagate(expected, function(error, critiques) {
                layer.propagate(function(error, critiques) {
                  final_weights = _.map(connections, function(connection) {
                    return connection.weight
                  })
                  
                  expect(_.isEqual(final_weights, initial_weights)).to.equal(false)
                  
                  done()
                })
              })
            })
          })
        })
      })
    })
  })

  describe.skip(".add()", function() {
    describe(".add(neuron[, callback])", function() {
      it.skip("should accept a neuron as a parameter", function(done) {
        let size = Math.round(Math.random() * 10 + 1)
        let layer = new Layer(size)
        let neuron = new Neuron()
        
        layer.add(neuron, function(error, neurons) {
          expect()
        })
        
        done()
      })
    })
    it.skip("should accept a number as a parameter", function(done) {
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
    it.skip("should accept an array of neurons as a parameter", function(done) {
      let n0 = new Neuron()
      let l0 = new Layer(2)
      
      l0.add_neurons([n0], function(error, results) {
        expect(error).to.not.exist
        expect(error).to.be.null
        expect(results).to.exist
        expect(results).to.be.an("array")
        expect(results).to.have.lengthOf(3)
        expect(results.neurons[2]).to.eql(n0)
      })
      
      done()
    })
  })
  
  describe.skip(".best()", function() {
    it.skip("should return the neuron with the highest axon value in a layer", function(done) {

      done()
    })
  })
  
  describe("Layer.next()", function() {
    let other_layer = new Layer(random.size())
    let layer = new Layer(random.size(), {
      connections: {
        outgoing: other_layer
      }
    })
    
    
    it("should accept a layer as a parameter", function(done) {
      Layer.next(layer, function(error, neurons) {
        expect(error).to.not.exist
        expect(error).to.be.null
        
        done()
      })
    })
    
    it("should accept an array of neurons as a parameter", function(done) {
      Layer.next(layer.neurons, function(error, neurons) {
        expect(error).to.not.exist
        expect(error).to.be.null
        
        done()
      })
    })

    it("should return an array of neurons", function(done) {
      Layer.next(layer, function(error, neurons) {
        expect(neurons).to.exist
        expect(neurons).to.be.an("array")
        expect(neurons).to.each.be.an.instanceOf(Neuron)
        
        done()
      })
    })
    
    it("should return an array of " + other_layer.neurons.length + " neurons", function(done) {
      Layer.next(layer, function(error, neurons) {
        expect(neurons.length).to.equal(other_layer.neurons.length)
        expect(neurons.length).to.eql(other_layer.neurons.length)
        
        done()
      })
    })
  })
  
  describe("Layer.previous()", function() {
    let other_layer = new Layer(random.size())
    let layer = new Layer(random.size(), {
      connections: {
        incoming: other_layer
      }
    })
    
    
    it("should accept a layer as a parameter", function(done) {
      Layer.previous(layer, function(error, neurons) {
        expect(error).to.not.exist
        expect(error).to.be.null
        
        done()
      })
    })
    
    it("should accept a neuron-array as a parameter", function(done) {
      Layer.previous(layer.neurons, function(error, neurons) {
        expect(error).to.not.exist
        expect(error).to.be.null
        
        done()
      })
    })

    it("should return an array of neurons", function(done) {
      Layer.previous(layer, function(error, neurons) {
        expect(neurons).to.exist
        expect(neurons).to.be.an("array")
        expect(neurons).to.each.be.an.instanceOf(Neuron)
        
        done()
      })
    })
    
    it("should return an array of " + other_layer.neurons.length + " neurons", function(done) {
      Layer.previous(layer, function(error, neurons) {
        expect(neurons.length).to.equal(other_layer.neurons.length)
        expect(neurons.length).to.eql(other_layer.neurons.length)
        
        done()
      })
    })
  })
  
  describe("Layer.activate()", function() {
    let feeds = function(layer, inputs) {
      it("should require parameter #1", function(done) {
        try {
          Layer.activate()
        } catch(error) {
          expect(error).to.exist

          done()
        }
      })

      it("should accept a layer as parameter #1", function(done) {
        Layer.activate(layer, inputs, function(error, neurons) {
          expect(error).to.not.exist
          expect(error).to.be.null

          done()
        })
      })

      it("should accept an array of neurons as a parameter #1", function(done) {
        Layer.activate(layer.neurons, inputs, function(error, neurons) {
          expect(error).to.not.exist
          expect(error).to.be.null

          done()
        })
      })

      it("should accept an array of numbers as parameter #2", function(done) {
        Layer.activate(layer, inputs, function(error, results) {
          expect(error).to.not.exist
          expect(error).to.not.exist

          done()
        })
      })

      it("should return an array of numbers", function(done) {
        Layer.activate(layer, inputs, function(error, results) {
          expect(results).to.exist
          expect(results).to.be.an("array")
          _.each(results, result => {
            expect(result).to.be.a("number")
          })

          done()
        })
      })

      it("should return an array of " + layer.neurons.length + " numbers", function(done) {
        Layer.activate(layer, inputs, function(error, results) {
          expect(results.length).to.equal(layer.neurons.length)
          expect(results.length).to.eql(layer.neurons.length)

          done()
        })
      })
    }
    
    context("Lone Layer", function() {
      let layer = new Layer(random.size())
      
      feeds(layer, random.inputs(layer.neurons.length))
    })
    
    context("Input Layer", function() {
      let layer = new Layer(random.size(), {
        connections: {
          outgoing: new Layer(random.size())
        }
      })
      
      feeds(layer, random.inputs(layer.neurons.length))
    })
    
    context("Output Layer", function() {
      let incoming = new Layer(random.size())
      let layer = new Layer(random.size(), {
        connections: {
          incoming
        }
      })
      
      incoming.activate(random.inputs(incoming.neurons.length), function(error, outputs) {
        feeds(layer)
      })
    })
    
    context("Hidden Layer", function() {
      let incoming = new Layer(random.size())
      let outgoing = new Layer(random.size())
      let layer = new Layer(random.size(), {
        connections: {
          incoming,
          outgoing
        }
      })
      
      incoming.activate(random.inputs(incoming.neurons.length), function(error, outputs) {
        feeds(layer)
      })
    })
  })
  
  describe("Layer.propagate()", function() {
    /*
    let size = random.size()
    let layer = new Layer(size)
    let feedback = random.feedback(size)
    */
    
    context.skip("Lone Layer", function() {
      let layer = new Layer(random.size())
      
      
    })
    
    context.skip("Output Layer", function() {
      let incoming = new Layer(random.size())
      
      console.log(incoming)
      
      let layer = new Layer(null, {
        connections: {
          incoming
        }
      })
      
    })
    
    context.skip("Input Layer", function() {
      let outgoing = new Layer(random.size())
      let layer = new Layer(null, {
        connections: {
          outgoing
        }
      })
      
    })
    
    context.skip("Hidden Layer", function() {
      let incoming = new Layer(random.size())
      let outgoing = new Layer(random.size())
      let layer = new Layer(null, {
        connections: {
          incoming,
          outgoing
        }
      })
    })
    
    /*
    it("should require parameter #1", function(done) {
      try {
        Layer.activate()
      } catch(error) {
        expect(error).to.exist
        
        done()
      }
    })
    
    it("should accept a layer as parameter #1", function(done) {
      Layer.activate(layer, random.feedback(size), function(error, neurons) {
        expect(error).to.not.exist
        expect(error).to.be.null
        
        done()
      })
    })
    
    it("should accept an array of neurons as a parameter #1", function(done) {
      Layer.activate(layer.neurons, random.feedback(size), function(error, neurons) {
        expect(error).to.not.exist
        expect(error).to.be.null
        
        done()
      })
    })
    
    it("should accept an array of numbers as parameter #2", function(done) {
      Layer.activate(layer, feedback, function(error, results) {
        expect(error).to.not.exist
        expect(error).to.not.exist
      
        done()
      })
    })
    
    it("should return an array of numbers", function(done) {
      Layer.activate(layer, feedback, function(error, results) {
        expect(results).to.exist
        expect(results).to.be.an("array")
        _.each(results, result => {
          expect(result).to.be.a("number")
        })
      
        done()
      })
    })
    
    it("should return an array of " + layer.neurons.length + " numbers", function(done) {
      Layer.activate(layer, feedback, function(error, results) {
        expect(results.length).to.equal(layer.neurons.length)
        expect(results.length).to.eql(layer.neurons.length)
      
        done()
      })
    })
    */
  })
})

















