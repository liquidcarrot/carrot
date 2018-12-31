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
    // Contructing with new Layer(n)
    if(_.isLength(props)) {
      _.times(props, function() { 
        self.neurons.push(new Neuron(options))
      })
    }
    // Constructing with new Layer([Neuron])
    else if(_.isArray(props)) {
      self.neurons = _.map(props, function(neuron) {
        return new Neuron(neuron)
      })
    }
    // Constructing with new Layer(Layer)
    else if(props instanceof Layer) {
      self.neurons = _.map(props.neurons, function(neuron) {
        return new Neuron(neuron)
      })
    } else {
      throw new Error("Invalid parameter: " + prop + "\n'props' must be a 'number', '[Neuron]`, or `Layer`.")
    }
  }
  
  // Internal checks for layer characteristics
  self.is = {
    input: function(callback) {
      return _.every(self.neurons, function(neuron) {
        return neuron.is.input()
      })
    },
    output: function(callback) {
      return _.every(self.neurons, function(neuron) {
        return neuron.is.output()
      })
    }
  }
  // Projects neurons to `object`
  self.project = function(object, callback) {
    let self = this
    
    return new Promise(function(resolve, reject) {
      // Project to Neuron
      if(object instanceof Neuron) {
        return async.map(self.neurons, function(neuron, callback) {
          neuron.project(object, callback)
        }, function(error, connections) {
          return callback ? callback(error, connections) : !error ? resolve(connections) : reject(error)
        })
      }
      // Project to Layer
      else if(object instanceof Layer) {
        return async.map(self.neurons, function(neuron, callback) {
          async.map(object.neurons, function(other_neuron, callback) {
            neuron.project(other_neuron, callback)
          }, callback)
        }, function(error, connections) {
          return callback ? callback(error, _.flattenDeep(connections)) : !error ? resolve(_.flattenDeep(connections)) : reject(error)
        })
      }
      // Project to Group
      else if(object instanceof Group) {
        return callback ? callback(null, "Connections") : resolve("Connections")
      }
      // Can't Project to Unrecognized Object
      else {
        let error = new Error(object + " is not a valid object\nObject must be a 'Neuron', 'Layer', or 'Group'")
        return callback ? callback(error) : reject(error)
      }
    })
  }
  // Make all neurons in the Layer generate an output value
  self.activate = function(inputs, callback) {
    let self = this
    
    if(!callback && _.isFunction(inputs)) {
      callback = inputs
      inputs = null
    }
    return new Promise(function(resolve, reject) {
      
      if(inputs && inputs.length !== self.neurons.length) {
        let error = new Error("'inputs.length' !== 'layer.neurons'\nInput size must be equal to the number of neurons in the layer.")
        return callback ? callback(error) : reject(error)
      } else {
        return async.mapValues(self.neurons, function(neuron, index, callback) {
          // Activate Input Layer
          if(inputs) {
            neuron.activate(inputs[index], callback)
          }
          // Activate Hidden/Output Layer
          else {
            neuron.activate(callback)
          }
        }, function(error, results) {
          let output = Object.values(results)
          return callback ? callback(error, output) : !error ? resolve(output) : reject(error)
        })
      }
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
  // Gate
  self.gate = function(callback) {
    callback(null, "Gate!")
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
