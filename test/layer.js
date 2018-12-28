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
      let neurons = Math.round(Math.random() * 10)
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
        let neurons = Math.round(Math.random() * 10)
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
      let neurons = _.times(Math.round(Math.random() * 10), function() {
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
      let neurons = _.times(Math.round(Math.random() * 10), function() {
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
      let neurons = Math.round(Math.random() * 10)
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
      let layer = new Layer(Math.round(Math.random() * 10))
      let other_layer = new Layer(Math.round(Math.random() * 10))
      
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
  
  describe.skip(".is.input()", function() {
    
  })
  
  describe.skip(".is.output()", function() {
    
  })

  describe.skip(".activate()", function() {
    it("should take an array as a parameter", function(done) {
      let layer = new Layer(3)
      layer.activate([Math.random(), Math.random(), Math.random()], function(error, results) {
        expect(error).to.not.exist
        expect(error).to.be.null
        done()
      })
    })
    it("should return an invalid input error", function(done) {
      let layer = new Layer(3)
      layer.activate('cheese', function(error, results) {
        expect(error).to.exist
        expect(error).to.not.be.null
        expect(results).to.not.exist
        expect(results).to.be.undefined
        done()
      })
    })
  })
  
  describe.skip(".propagate()", function() {
    
  })
  
  describe.skip(".forward()", function() {
    it("should take an array of numbers as a parameter", function(done) {
      let l0 = new Layer(4)
      let l1 = new Layer(l0)
      
      l0.connect(l1)
      
      l0.forward([Math.random(), Math.random(), Math.random(), Math.random()], function(error, results) {
        expect(error).to.not.exist
        expect(error).to.be.null
      })
      
      done()
    })
  })
  
  describe.skip(".backward()", function() {
    it("should take an array of numbers as a parameter", function(done) {
      let l0 = new Layer(4)
      let l1 = new Layer(l0)
      
      l0.connect(l1)
      
      l1.backward([Math.random(), Math.random(), Math.random(), Math.random()], function(error, results) {
        expect(error).to.not.exist
        expect(error).to.be.null
      })
      
      done()
    })
  })

  describe.skip(".add_neurons()", function() {
    it("should take a number as a parameter", function(done) {
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
    it("should take an array of neurons as a parameter", function(done) {
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
  
  describe.skip(".get_neuron(name)", function() {
    it("should return an array of neurons", function(done) {
      let n0 = new Neuron()
      let l0 = new Layer(3)

      l0.connect(n0)
      expect(n0.connections).to.exist
      expect(n0.connections).to.be.an("array")
      expect(n0.connections).to.have.lengthOf(3)
      expect(n0.connections[1]).to.be.an("object")

      done()
    })
  })
  
  describe.skip(".get_best()", function() {
    it.skip("should return the neuron with the highest axon value in a layer", function(done) {

      done()
    })
  })
})