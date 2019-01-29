'use strict'

let _ = require('lodash')
let async = require('async')
let faker = require('faker')
let chai = require('chai')

chai.use(require('chai-each'))

let expect = chai.expect

describe.skip("Network", function() {
  let Layer = require('../src/layer')
  let Neuron = require('../src/neuron')
  let Network = require('../src/network')
  
  let random = {
    sizes: () => _.times(Math.round(Math.random() * 10 + 1), index => Math.round(Math.random() * 10 + 1)),
    layers: () => _.times(Math.round(Math.random() * 10 + 1), index => new Layer(Math.round(Math.random() * 10 + 1))),
    neurons: () => _.times(Math.round(Math.random() * 10 + 1), index => new Neuron()),
    inputs: (n) => _.times((n || Math.round(Math.random() * 10 + 1)), index => Math.round(Math.random() * 10 + 1))
  }
  
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
      it("should create a layer for every item in the given array and connect it with the next created layer", function(done) {
        // For every neuron in a created layer, but the last layer...
        _.each(_.slice(sizes, 0, sizes.length - 1), function(length, size_index) {
          _.times(length, function(layer_index) {
            // ...check that the outgoing connections of the neuron match the number of neurons in the next layer
            expect(network.neurons[_.sum(_.slice(sizes, 0, size_index)) + layer_index].connections.outgoing).to.have.lengthOf(sizes[size_index + 1])
          })
        })
        
        done()
      })
      
      describe("new Network([n], {...})", function() {
        let sizes = _.times(Math.round(Math.random() * 10 + 1), function() {
          return Math.round(Math.random() * 10 + 1)
        })
        let options = {
          bias: Math.random(),
          rate: Math.random(),
          activation: faker.random.arrayElement(["sigmoid", "sigmoidal", "logistic", "logistics", "relu", "tanh", "linear", "identity", function(x, derivative) {
            return !derivative ? Math.atan(x) : (1 / (Math.pow(x, 2) + 1))
          }])
        }
        let network = new Network(sizes, options)
        
        it("should create a network", function(done) {
          expect(network).to.exist
          expect(network).to.be.an.instanceOf(Network)
          
          done()
        })
        it("should create a network should with the same number of neurons as the sum of the given array", function(done) {
          expect(network.neurons).to.exist
          expect(network.neurons).to.be.an("array")
          expect(network.neurons).to.each.be.an.instanceOf(Neuron)
          expect(network.neurons).to.have.lengthOf(_.sum(sizes))
          
          done()
        })
        it("should overwrite the properties of every created neuron with `options`", function(done) {
          _.each(network.neurons, function(neuron, neuron_index) {
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
          })
          
          done()
        })
      })
    })
    describe("new Network([Layer])", function() {
      let layers = _.times(Math.round(Math.random() * 10 + 1), function() {
        return new Layer(Math.round(Math.random() * 10 + 1))
      })
      let network = new Network(layers)
      
      it("should create a network", function(done) {
        expect(network).to.exist
        expect(network).to.be.an.instanceOf(Network)
          
        done()
      })
      it("should create a network with the same number of neurons as the sum of the layers", function(done) {
        expect(network.neurons).to.be.an("array")
        expect(network.neurons).to.each.be.an.instanceOf(Neuron)
        expect(network.neurons).to.have.lengthOf(_.sum(_.map(layers, layer => layer.neurons.length)))
        
        done()
      })
      it("should create a new layer for every given layer and connect each created layer to the next created layer", function(done) {
        let sizes = _.map(layers, layer => layer.neurons.length)
        
        // For every neuron in a created layer, but the last layer...
        _.each(_.slice(sizes, 0, sizes.length - 1), function(length, size_index) {
          _.times(length, function(layer_index) {
            // ...check that the outgoing connections of the neuron match the number of neurons in the next layer
            expect(network.neurons[_.sum(_.slice(sizes, 0, size_index)) + layer_index].connections.outgoing).to.have.lengthOf(sizes[size_index + 1])
          })
        })
        
        done()
      })
      
      describe("new Network([Layer], {...})", function() {
        let layers = _.times(Math.round(Math.random() * 10 + 1), function() {
          return new Layer(Math.round(Math.random() * 10 + 1))
        })
        let options = {
          bias: Math.random(),
          rate: Math.random(),
          activation: faker.random.arrayElement(["sigmoid", "sigmoidal", "logistic", "logistics", "relu", "tanh", "linear", "identity", function(x, derivative) {
            return !derivative ? Math.atan(x) : (1 / (Math.pow(x, 2) + 1))
          }])
        }
        let network = new Network(layers, options)
      
        it("should create a network", function(done) {
          expect(network).to.exist
          expect(network).to.be.an.instanceOf(Network)

          done()
        })
        it("should create a network with the same number of neurons as the sum of the layers", function(done) {
          expect(network.neurons).to.be.an("array")
          expect(network.neurons).to.each.be.an.instanceOf(Neuron)
          expect(network.neurons).to.have.lengthOf(_.sum(_.map(layers, layer => layer.neurons.length)))
          
          done()
        })
        it("should overwrite the properties of every created neuron with `options`", function(done) {
          _.each(network.neurons, function(neuron, neuron_index) {
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
          })
          
          done()
        })
      })
    })
    describe("new Network([Neuron])", function() {
      let neurons = _.times(Math.round(Math.random * 10 + 1), function() {
        return new Neuron()
      })
      let network = new Network(neurons)
      
      it("should create a network", function(done) {
        expect(network).to.exist
        expect(network).to.be.an.instanceOf(Network)
        
        done()
      })
      it("should create a network whose size is the same as the given array", function(done) {
        expect(network.neurons).to.be.an("array")
        expect(network.neurons).to.each.be.an.instanceOf(Neuron)
        expect(network.neurons).to.have.lengthOf(neurons.length)
        
        done()
      })
      it("should create a network whose neurons have the same properties as the given neurons", function(done) {
        _.each(network.neurons, function(neuron, index) {
          expect(neuron.bias).to.equal(neurons[index].bias)
          expect(neuron.bias).to.eql(neurons[index].bias)
          expect(neuron.rate).to.equal(neurons[index].rate)
          expect(neuron.rate).to.eql(neurons[index].rate)
          expect(neuron.activation).to.equal(neurons[index].activation)
          expect(neuron.activation).to.eql(neurons[index].activation)
          _.each(neuron.connections.incoming, function(connection, connection_index) {
            expect(connection.from).to.equal(neurons[index].connections.incoming[connection_index])
            expect(connection.from).to.eql(neurons[index].connections.incoming[connection_index])
            expect(connection.to).to.equal(neuron)
          })
          _.each(neuron.connections.outgoing, function(connection, connection_index) {
            expect(connection.to).to.equal(neurons[index].connections.outgoing[connection_index])
            expect(connection.to).to.eql(neurons[index].connections.outgoing[connection_index])
            expect(connection.from).to.equal(neuron)
          })
        })
        
        done()
      })
      
      describe("new Network([Neuron], {...})", function() {
        let neurons = _.times(Math.round(Math.random * 10 + 1), function() {
          return new Neuron()
        })
        let options = {
          bias: Math.random(),
          rate: Math.random(),
          activation: faker.random.arrayElement(["sigmoid", "sigmoidal", "logistic", "logistics", "relu", "tanh", "linear", "identity", function(x, derivative) {
            return !derivative ? Math.atan(x) : (1 / (Math.pow(x, 2) + 1))
          }])
        }
        let network = new Network(neurons)
        
        it("should create a network", function(done) {
          expect(network).to.exist
          expect(network).to.be.an.instanceOf(Network)

          done()
        })
        it("should create a network whose size is the same as the given array", function(done) {
          expect(network.neurons).to.be.an("array")
          expect(network.neurons).to.each.be.an.instanceOf(Neuron)
          expect(network.neurons).to.have.lengthOf(neurons.length)
          
          done()
        })
        it("should overwrite the properties of every created neuron with `options`", function(done) {
          _.each(network.neurons, function(neuron, neuron_index) {
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
          })
          
          done()
        })
      })
    })
  })
  
  describe(".weights()", function() {
    let sizes = random.sizes()
    let network = new Network(sizes)
    
    it("should accept no parameters", function(done) {
      network.weights(function(error, weights) {
        expect(error).to.not.exist
        expect(error).to.be.null
        
        done()
      })
    })
    
    it("should return an array of numbers", function(done) {
      network.weights(function(error, weights) {
        expect(weights).to.exist
        expect(weights).to.be.an("array")
        _.each(weights, weight => {
          expect(weight).to.be.a("number")
        })
        
        done()
      })
    })
    
    it("shoud return the sum of `sizes[i] * sizes[i - 1]`, where `sizes > 1`; otherwise return `0`", function(done) {
      network.weights(function(error, weights) {
        expect(weights.length).to.equal(sizes.length > 1 ? _.sum(_.map(_.slice(sizes, 1), (size, index) => size * sizes[index])) : 0)
        
        done()
      })
    })
  })
  
  describe.skip(".inputs()", function() {
    
  })
  
  describe.skip(".outputs()", function() {
    
  })
  
  describe.skip(".activate()", function() {
    let sizes = random.sizes()
    let network = new Network(sizes)
    let inputs = random.inputs(_.first(sizes))
    
    it("should accept an array of numbers as a parameter", function(done) {
      network.activate(inputs, function(error, outputs) {
        expect(error).to.not.exist
        expect(error).to.be.null
        
        done()
      })
    })
    
    it("should return an array of numbers", function(done) {
      network.activate(inputs, function(error, outputs) {
        expect(outputs).to.exist
        expect(outputs).to.be.an("array")
        _.each(outputs, output => {
          expect(output).to.be.a("number")
        })
        
        done()
      })
    })
    
    it("should return an of " + _.last(sizes) + " numbers", function(done) {
      network.activate(inputs, function(error, outputs) {
        console.log("Sizes: ", sizes)
        console.log("# of Outputs: ", outputs.length)
        
        expect(outputs.length).to.equal(_.last(sizes))
        expect(outputs.length).to.eql(_.last(sizes))
        
        done()
      })
    })
  })
  
  describe.skip(".propagate()", function() {
    let sizes = random.sizes()
    let network = new Network(sizes)
    let inputs = random.inputs(_.first(sizes))
    let feedback = random.inputs(_.last(sizes))
    
    it.skip("should accept an array of numbers as a parameter", function(done) {
      async.auto({
        "activate": function(callback) {
          network.activate(inputs, callback)
        },
        "propagate": ["activate", function(results, callback) {
          network.propagate(feedback, function(error, results) {
            expect(error).to.not.exist
            expect(error).to.be.null

            callback()
          })
        }]
      }, function(error, results) {
        done()
      })
    })
    
    it.skip("should return an array of numbers", function(done) {
      async.auto({
        "activate": function(callback) {
          network.activate(inputs, callback)
        },
        "propagate": ["activate", function(results, callback) {
          network.propagate(feedback, function(error, results) {
            expect(results).to.exist
            expect(results).to.be.an("array")
            expect(results).to.each.be.a("number")

            callback()
          })
        }]
      }, function(error, results) {
        done()
      })
    })
    
    it.skip("should update weights", function(done) {
      async.auto({
        "weights": function(callback) {
          network.weights(callback)
        },
        "activate": function(callback) {
          network.activate(inputs, callback)
        },
        "propagate": ["activate", function(results, callback) {
          network.propagate(feedback, callback)
        }],
        "new_weights": ["weights", "propagate", function(results, callback) {
          network.weights(function(error, weights) {
            expect(_.sortedBy(weights)).to.not.equal(_.sortedBy(results.weights))
            expect(_.sortedBy(weights)).to.not.eql(_.sortedBy(results.weights))
            
            callback()
          })
        }]
      }, function(error, results) {
        done()
      })
    })
  })
})