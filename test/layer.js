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
      
      describe("new Layer(n, options)", function() {
        let neurons = Math.round(Math.random() * 10 + 1)
        let options = {
          bias: Math.random(),
          rate: Math.random(),
          activation: faker.random.arrayElement(["sigmoid", "sigmoidal", "logistic", "logistics", "relu", "tanh", "linear", "identity", function(x, derivative) {
            return !derivative ? Math.atan(x) : (1 / (Math.pow(x, 2) + 1))
          }])
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
          // Check `bias` Matches
          expect(_.every(layer.neurons, function(neuron) {
            return neuron.bias === options.bias
          })).to.equal(true)
          // Check `rate` Matches
          expect(_.every(layer.neurons, function(neuron) {
            return neuron.rate === options.rate
          })).to.equal(true)
          // Check `activation` Matches
          expect(_.every(layer.neurons, function(neuron) {
            if(options.activation && typeof options.activation === "string") {
              if(options.activation.toLowerCase() === "sigmoid" || 
                 options.activation.toLowerCase() === "sigmoidal" ||
                 options.activation.toLowerCase() === "logistic" ||
                 options.activation.toLowerCase() === "logistics") {
                return neuron.activation === Neuron.activations.SIGMOID
              } else if(options.activation.toLowerCase() === "relu") {
                return neuron.activation === Neuron.activations.RELU
              } else if(options.activation.toLowerCase() === "tanh") {
                return neuron.activation === Neuron.activations.TANH
              } else if(options.activation.toLowerCase() === "linear" ||
                        options.activation.toLowerCase() === "identity") {
                return neuron.activation === Neuron.activations.LINEAR
              } else {
                return false
              }
            } else if(options.activation && typeof options.activation === "function") {
              return neuron.activation === options.activation
            } else {
              return false
            }
          })).to.equal(true)
          
          done()
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
          }])
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
      it("should create a layer with an equal number of neurons", function(done) {
        expect(layer.neurons).to.exist
        expect(layer.neurons).to.be.an("array")
        expect(layer.neurons).to.have.lengthOf(neurons.length)
        
        done()
      })
      it("all neuron properties should match - except connections", function(done) {
        // Check `bias` Matches
        expect(_.every(layer.neurons, function(neuron, index) {
          return neuron.bias === neurons[index].bias
        })).to.equal(true)
        // Check `rate` Matches
        expect(_.every(layer.neurons, function(neuron, index) {
          return neuron.rate === neurons[index].rate
        })).to.equal(true)
        // Check `activation` Matches
        expect(_.every(layer.neurons, function(neuron, index) {
          if(neurons[index].activation && typeof neurons[index].activation === "string") {
            if(neurons[index].activation.toLowerCase() === "sigmoid" || 
               neurons[index].activation.toLowerCase() === "sigmoidal" ||
               neurons[index].activation.toLowerCase() === "logistic" ||
               neurons[index].activation.toLowerCase() === "logistics") {
              return neuron.activation === Neuron.activations.SIGMOID
            } else if(neurons[index].activation.toLowerCase() === "relu") {
              return neuron.activation === Neuron.activations.RELU
            } else if(neurons[index].activation.toLowerCase() === "tanh") {
              return neuron.activation === Neuron.activations.TANH
            } else if(neurons[index].activation.toLowerCase() === "linear" ||
                      neurons[index].activation.toLowerCase() === "identity") {
              return neuron.activation === Neuron.activations.LINEAR
            } else {
              return false
            }
          } else if(neurons[index].activation && typeof neurons[index].activation === "function") {
            return neuron.activation === neurons[index].activation
          } else {
            return false
          }
        })).to.equal(true)

        done()
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
      it("should create a layer with equal number of neurons", function(done) {
        expect(layer.neurons).to.exist
        expect(layer.neurons).to.be.an("array")
        expect(layer.neurons).to.have.lengthOf(other_layer.neurons.length)

        done()
      })
      it("all neurons should be identical - except connections", function(done) {
        // Check `bias` Matches
        expect(_.every(layer.neurons, function(neuron, index) {
          return neuron.bias === other_layer.neurons[index].bias
        })).to.equal(true)
        // Check `rate` Matches
        expect(_.every(layer.neurons, function(neuron, index) {
          return neuron.rate === other_layer.neurons[index].rate
        })).to.equal(true)
        // Check `activation` Matches
        expect(_.every(layer.neurons, function(neuron, index) {
          if(other_layer.neurons[index].activation && typeof other_layer.neurons[index].activation === "string") {
            if(other_layer.neurons[index].activation.toLowerCase() === "sigmoid" || 
               other_layer.neurons[index].activation.toLowerCase() === "sigmoidal" ||
               other_layer.neurons[index].activation.toLowerCase() === "logistic" ||
               other_layer.neurons[index].activation.toLowerCase() === "logistics") {
              return neuron.activation === Neuron.activations.SIGMOID
            } else if(other_layer.neurons[index].activation.toLowerCase() === "relu") {
              return neuron.activation === Neuron.activations.RELU
            } else if(other_layer.neurons[index].activation.toLowerCase() === "tanh") {
              return neuron.activation === Neuron.activations.TANH
            } else if(other_layer.neurons[index].activation.toLowerCase() === "linear" ||
                      other_layer.neurons[index].activation.toLowerCase() === "identity") {
              return neuron.activation === Neuron.activations.LINEAR
            } else {
              return false
            }
          } else if(other_layer.neurons[index].activation && typeof other_layer.neurons[index].activation === "function") {
            return neuron.activation === other_layer.neurons[index].activation
          } else {
            return false
          }
        })).to.equal(true)
        
        done()
      })
    })
  })
  
  describe(".project()", function() {
    describe(".project(neuron[, callback])", function() {
      let neurons = Math.round(Math.random() * 10 + 1)
      let layer = new Layer(neurons)
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
          })).to.have.all.deep.members(layer.neurons)
          
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
          })).to.each.have.all.deep.members(other_layer.neurons)
          
          done()
        })
        it("should add an incoming connection to every neuron in the destination layer for every neuron in the source layer", function(done) {
          expect(_.map(other_layer.neurons, function(neuron) {
            return _.map(neuron.connections.incoming, function(connection) {
              return connection.from
            })
          })).to.each.have.all.deep.members(layer.neurons)
          
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
        expect(results.neurons[2]).to.deep.equal(n0)
      })
      
      done()
    })
  })
  
  describe.skip(".best()", function() {
    it.skip("should return the neuron with the highest axon value in a layer", function(done) {

      done()
    })
  })
})