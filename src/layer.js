`use strict`

let _ = require('lodash')
let async = require('neo-async')
let Promise = require('bluebird')
let Neuron = require('./neuron')
let Connection = require('./connection')

/**
* Represents a Layer of Neurons.
* @constructor
* @param { object } props
* @param { array } options
*/
let Layer = function(props, options) {
  let self = this
  
  self.neurons = []
  
  if(props) {
    if(_.isLength(props)) {
      _.times(props, function() { self.neurons.push(new Neuron()) })
    } else if(_.isPlainObject(props)) {
      _.times(options || 1, function() {
        self.neurons.push(new Neuron(props))
      })
    } else if(_.isArray(props)) {
      self.neurons = props
    } else if(_.isArray(props.neurons)) {
      _.times(props.neurons.length, function() {
        self.neurons.push(new Neuron())
      })
    }
  }
  
  // Internal checks for layer characteristics
  self.is = {
    input: function(callback) {
      return new Promise(function(resolve, reject) {
        return async.every(self.neurons, function(neuron, callback) {
          neuron.is.input(callback)
        }, function(error, result) {
          return callback ? callback(error, result) : !error ? resolve(result) : reject(error)
        })
      })
    },
    output: function(callback) {
      return new Promise(function(resolve, reject) {
        return async.every(self.neurons, function(neuron, callback) {
          neuron.is.output(callback)
        }, function(error, result) {
          return callback ? callback(error, result) : !error ? resolve(result) : reject(error)
        })
      })
    }
  }
  // Make all neurons in the Layer generate an output value
  self.activate = function(inputs, callback) {
    let self = this
    return new Promise(function(resolve, reject) {
      return async.auto({
        "valid_array": function(callback) {
          _.isArray(inputs) && inputs.length === self.neurons.length ? callback(null, inputs) : inputs ? callback('Error at Layer.activate(): Invalid Parameter Received', null) : callback(null, false)
        },
        "is_input": function(callback) {
          self.is.input(callback)
        },
        "activate_neurons": ["valid_array", "is_input", function(results, callback) {
          if (results.is_input && results.valid_array) {
            async.map(Object.keys(self.neurons), function(index, callback) {
              self.neurons[index].activate(inputs[index], callback)
            }, callback)
          } else {
            async.map(self.neurons, function(neuron, callback) {
              neuron.activate(callback)
            }, callback)
          }
        }]
      }, function(error, results) {
        return callback ? callback(error, results.activate_neurons) : !error ? resolve(results.activate_neurons) : reject(error)
      })
    })
  }
  // Adjust neuron weights
  self.learn = function(feedbacks, callback) {
    return new Promise(function(resolve, reject) {
      return async.auto({
        "valid_array": function(callback) {
          _.isArray(feedbacks) && feedbacks.length === self.neurons.length ? callback(null, feedbacks) : feedbacks ? callback('Error at Layer.activate(): Invalid Parameter Received', null) : callback(null, false)
        },
        "is_input": function(callback) {
          self.is.input(callback)
        },
        "learn": ["valid_array", "is_input", function(results, callback) {
          
        }]
      }, function(error, results) {
        return callback ? callback(error, results) : !error ? resolve(results) : reject(error)
      })
    })
  }
  // Sends output of layer neurons to next layer
  self.forward = function(values, callback) {
    let self = this
    return new Promise(function(resolve, reject){
      return async.auto({
        "valid_array": function(callback) {
          _.isArray(values) && values.length === self.neurons.length ? callback(null, values) : callback('Error at Layer.forward(): Invalid Parameter Received', null)
        },
        "is_output": function(callback) {
          self.is.output(callback)
        },
        "values_forward": ["valid_array", "is_output", function(results, callback) {
          if(results.is_output) {
            callback(null, values)
          } else if(results.valid_array) {
            async.map(Object.keys(self.neurons), function(index, callback) {
              self.neurons[index].forward(values[index], callback)
            }, callback)
          } else {
            callback("Error at Layer.foward(): Invalid Parameter Received2", null)
          }
        }]
      }, function(error, results) {
        return callback ? callback(error, results.values_forward) : !error ? resolve(results.values_forward) : reject(error)
      })
    })
  }
  // Sends output of layer neurons to previous layer, if input layer returns values
  self.backward = function(values, callback) {
    let self = this
    return new Promise(function(resolve, reject){
      return async.auto({
        "valid_array": function(callback) {
          _.isArray(values) && values.length === self.neurons.length ? callback(null, values) : callback('Error at Layer.backward(): Invalid Parameter Received', null)
        },
        "is_input": function(callback) {
          self.is.input(callback)
        },
        "values_backward": ["valid_array", "is_input", function(results, callback) {
          if(results.is_input) {
            callback(null, values)
          } else if(results.valid_array) {
            async.map(Object.keys(self.neurons), function(index, callback) {
              self.neurons[index].backward(values[index], callback)
            }, callback)
          } 
        }]
      }, function(error, results) {
        return callback ? callback(error, results.values_backward) : !error ? resolve(results.values_backward) : reject(error)
      })
    })
  }
  // Connects neurons in this Layer to an object's neuron(s)
  self.connect = function(object, weights, callback) {
    let self = this
    
    if(!callback && _.isFunction(weights)) {
      callback = weights
      weights = null
    }
    
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
            async.map(Object.keys(self.neurons), function(index, callback) {
              self.neurons[index].connect(results.neuron, callback)
            }, callback)
          } else if (results.layer) {
            if(_.isArray(weights) && weights.length === self.neurons.length) {
              async.map(Object.keys(self.neurons), function(index1, callback) {
                async.map(Object.keys(results.layer), function(index2, callback) {
                  self.neurons[index1].connect(results.layer[index2], weights[index1][index2], callback)
                }, callback)
              }, callback)
            } else {
              async.map(Object.keys(self.neurons), function(index1, callback) {
                async.map(Object.keys(results.layer), function(index2, callback) {
                  self.neurons[index1].connect(results.layer[index2], callback)
                }, callback)
              }, callback)
            }
          } else if (results.group) {
            if(_.isArray(weights) && weights.length === self.neurons.length) {
              async.map(Object.keys(self.neurons), function(index1, callback) {
                async.map(Object.keys(results.group), function(index2, callback) {
                  self.neurons[index1].connect(results.group[index2], weights[index1][index2], callback)
                }, callback)
              }, callback)
            } else {
              async.map(Object.keys(self.neurons), function(index1, callback) {
                async.map(Object.keys(results.group), function(index2, callback) {
                  self.neurons[index1].connect(results.group[index2], callback)
                }, callback)
              }, callback)
            }
          }
        }],
      }, function(error, results) {
        return callback ? callback(error, _.flattenDeep(results.connect_neurons)) : !error ? resolve(_.flattenDeep(results.connect_neurons)) : reject(error)
      })
    })
  }
  // Gate
  self.gate = function(callback) {

  }
  // Add neurons to this layer
  self.add_neurons = function(new_neurons, callback) {
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
            async.map(results.is_array, function(new_neuron, callback) {
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
        return callback ? callback(error, results.add_neurons) : !error ? resolve(results.add_neurons) : reject(error)
      })
    })
  }
  // Search for neurons with the supplied name
  self.get_neuron = function(name, callback) {
    let self = this
    return new Promise(function(resolve, reject) {
      return async.filter(self.neurons, function(neuron, callback) {
        callback(null, neuron.Name.toUpperCase() === name.toUpperCase())
      }, function(error, neurons) {
        return callback ? callback(error, neurons) : !error ? resolve(neurons) : reject(error)
      })
    })
  }
  // Returns the neuron with the highest axon value in this layer
  self.get_best = function(callback) {
    let self = this
    return new Promise(function(resolve, reject) {
      // Find neuron with heighest axon value
      return async.reduce(self.neurons, {
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
  }
}

module.exports = Layer
