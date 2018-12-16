`use strict`

let _ = require('lodash')
let async = require('neo-async')
let Promise = require('bluebird')
let Neuron = require('./neuron')
let Connection = require('./connection')

/**
* Represents a Layer of Neurons.
* @constructor
* @param {  } props
* @param { array } options
*/
let Layer = function(props, options) {
  let neurons = []

  if(_.isLength(props)) {
    _.times(props, function() {
      neurons.push(new Neuron())
    })
  } else if(_.isArray(props)) {
    neurons = props
  } else if(_.isPlainObject(props)) {
    _.times(props.neurons.length, function() {
      neurons.push(new Neuron())
    })
  }

  return {
    neurons,
    // Make all neurons in the Layer generate an output value
    activate: function(inputs, callback) {
      let self = this
      return new Promise(function(resolve, reject) {
        return async.auto({
          "valid_array": function(callback) {
            _.isArray(inputs) && inputs.length === neurons.length ? callback(null, inputs) : inputs ? callback('Error at Layer.activate(): Invalid Parameter Received', null) : callback(null, false)
          },
          "activate_neurons": ["valid_array", function(results, callback) {
            if (results.valid_array) {
              async.eachOf(neurons, function(neuron, i, callback) {
                neuron.activate(inputs[i], callback)
              }, callback)
            } else {
              async.each(neurons, function(neuron, callback) {
                neuron.activate(null, callback)
              }, callback)
            }
          }]
        }, function(error, results) {
          return callback ? callback(error, results.activate_neurons) : !error ? resolve(results.activate_neurons) : reject(error)
        })
      })
    },
    // Sends output of previous layer to neurons of next layer
    forward: function(values, callback) {
      let self = this
      return new Promise(function(resolve, reject){
        return async.auto({
          "valid_array": function(callback) {
            _.isArray(values) && values.length === neurons.length ? callback(null, values) : values ? callback('Error at Layer.forward(): Invalid Parameter Received', null) : callback(null, false)
          },
          "values_forward": ["valid_array", function(results, callback) {
            if (results.valid_array) {
              async.eachOf(neurons, function(neuron, i, callback) {
                neuron.forward(values[i], callback)
              }, callback)
            } else {
              // send last input state values to next layer neurons
              async.each(neurons, function(neuron, callback) {
                neuron.inputs(function(error, input_connections) {
                  async.each(input_connections, function(input_connection, callback) {
                    neuron.forward(_.last(input_connection.forward.states), callback)
                  }, callback)
                })
              }, callback)
            }
          }]
        }, function(error, results) {
          return callback ? callback(error, results.values_forward) : !error ? resolve(results.values_forward) : reject(error)
        })
      })
    },
    // Sends output values in next layer to neurons of previous layer
    backward: function(values, callback) {
      let self = this
      return new Promise(function(resolve, reject){
        return async.auto({
          "valid_array": function(callback) {
            _.isArray(values) && values.length === neurons.length ? callback(null, values) : values ? callback('Error at Layer.backward(): Invalid Parameter Received', null) : callback(null, false)
          },
          "values_backward": ["valid_array", function(results, callback) {
            if (results.valid_array) {
              async.eachOf(neurons, function(neuron, i, callback) {
                neuron.backward(values[i], callback)
              }, callback)
            } else {
              // send last output state value to previous layer neurons
              async.each(neurons, function(neuron, callback) {
                neuron.outputs(function(error, output_connections) {
                  async.each(output_connections, function(output_connection, callback) {
                    neuron.backward(_.last(output_connection.backward.states), callback)
                  }, callback)
                })
              }, callback)
            }
          }]
        }, function(error, results) {
          return callback ? callback(error, results.values_backward) : !error ? resolve(results.values_backward) : reject(error)
        })
      })
    },
    // Connects neurons in this Layer to an object's neuron(s)
    connect: function(object, callback) {
      let self = this
      return new Promise(function(resolve, reject) {
        return async.auto({
          "neuron": function(callback) {
            _.isArray(object.connections) ? callback(null, object) : callback(null, false)
          },
          "layer": function(callback) {
            _.isArray(object.neurons) ? callback(null, object.neurons) : callback(null, false)
          },
          "group": function(callback) {
            _.isPlainObject(object.neurons) ? callback(null, object.neurons) : callback(null, false)
          },
          "connect_neurons": ["neuron", "layer", "group", function(results, callback) {
            if (results.neuron) {
              async.each(self.neurons, function(self_neuron, callback) {
                self_neuron.connect(results.neuron, callback)
              }, callback)
            } else if (results.layer) {
              async.each(results.layer, function(target_neuron, callback) {
                async.each(self.neurons, function(self_neuron, callback) {
                  self_neuron.connect(target_neuron, callback)
                }, callback)
              }, callback)
            } else if (results.group) {
              async.each(results.group, function(target_neuron, callback) {
                async.each(self.neurons, function(self_neuron, callback) {
                  self_neuron.connect(target_neuron, callback)
                }, callback)
              }, callback)
            } else {
              callback('Error at Layer.connect(): Unsupported Parameter Received', null)
            }
          }],
        }, function(error, results) {
          return callback ? callback(error, self.neurons) : !error ? resolve(self.neurons) : reject(error)
        })
      })
    },
    // Gate
    gate: function(callback) {
      
    },
    // Add neurons to this layer
    add_neurons: function(new_neurons, callback) {
      let self = this
      return new Promise(function(resolve, reject) {
        return async.auto({
          "is_array": function(callback) {
            _.isArray(new_neurons) ? callback(null, new_neurons) : callback(null, false)
          },
          "is_number": function(callback) {
            _.isLength(new_neurons) ? callback(null, new_neurons) : callback(null, false)
          },
          "add_neurons": ["is_array", "is_number", function(results, callback) {
            if (results.is_array) {
              async.each(results.is_array, function(new_neuron, callback) {
                self.neurons.push(new_neuron, callback)
              }, callback)
            } else if(results.is_number) {
              async.times(results.is_number, function(n, next) {
                next(null, self.neurons.push(new Neuron()))
              }, callback)
            } else {
              callback("Error at Layer.add_neurons(): Invalid Parameter Received", null)
            }
          }]
        }, function(error, results) {
          return callback ? callback(error, self.neurons) : !error ? resolve(self.neurons) : reject(error)
        })
      })
    },
    // Search for neurons with the supplied name
    get_neuron: function(name, callback) {
      let self = this
      return new Promise(function(resolve, reject) {
        return async.filter(neurons, function(neuron, callback) {
          callback(null, neuron.Name.toUpperCase() === name.toUpperCase())
        }, function(error, neurons) {
          return callback ? callback(error, neurons) : !error ? resolve(neurons) : reject(error)
        })
      })
    },
    // Returns the neuron with the highest axon value in this layer
    get_best: function(callback) {
      let self = this
      return new Promise(function(resolve, reject) {
        // Find neuron with heighest axon value
        return async.reduce(neurons, {
          "connections": [{
            "forward": {
              "states": [0]
            }
          }]
        }, function(best, neuron, callback) {
          _.last(neuron.connections.forward.states) > _.last(best.connections.forward.states) ? callback(null, neuron) : callback(null, best)
        }, function(error, neuron) {
          return callback ? callback(error, neuron) : !error ? resolve(neuron) : reject(error)
        })
      })
    },
  }
}

module.exports = Layer
