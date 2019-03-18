'use strict'

let _ = require('lodash')
let async = require('neo-async')
let Promise = require('bluebird')

let Neuron = require('./neuron')

/**
* >Neural Layer Factory Function
*
* CHECK: https://www.youtube.com/watch?v=FK77zZxaBoI
*
* @constructs Layer
*/
let Layer = function(props, options) {
  let self = this
  
  let Neuron = require('./neuron')
  let Connection = require('./connection')
  
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
        return new Neuron(_.assign(neuron, options))
      })
    }
    // Constructing with new Layer(Layer)
    else if(props instanceof Layer) {
      self.neurons = _.map(props.neurons, function(neuron) {
        return new Neuron(_.assign({}, neuron, options))
      })
    } else {
      throw new Error("Invalid parameter: " + props + "\n'props' must be a 'number', '[Neuron]`, or `Layer`.")
    }
  }
  
  /**
  * @namespace Layer#is
  * @memberof Layer.prototype
  * @instance
  */
  self.is = {
    /**
    * @function Layer#is.input
    * @memberof Layer.prototype
    * @instance
    * @returns {boolean} Returns `true` if all neurons in this layer have no incoming connections 
    */
    input: function(callback) {
      return _.every(self.neurons, function(neuron) {
        return neuron.is.input()
      })
    },
    /**
    * @function Layer#is.output
    * @memberof Layer.prototype
    * @instance
    * @return {boolean} Return `true` if all neurons in this layer have no outgoing connections
    */
    output: function(callback) {
      return _.every(self.neurons, function(neuron) {
        return neuron.is.output()
      })
    }
  } 
  /**
  * @namespace Layer#can
  * @memberof Layer.prototype
  * @instance
  */
  self.can = {
    /**
    * @function Layer#can.activate
    * @memberof Layer.prototype
    * @instance
    * @returns {boolean} Returns `true` if all neurons can activate
    */
    activate: function() {
      if(self.is.input()) {
        return true
      } else {
        return _.every(self.neurons, function(neuron) {
          return _.every(neuron.connections.incoming, function(connection) {
            return !_.isNil(connection.from.last)
          })
        })
      }
    },
    /**
    * @function Layer#can.propagate
    * @memberof Layer.prototype
    * @instance
    * @return {boolean} Return `true` if all neurons can propagate
    */
    propagate: function() {
      if(self.is.output()) {
        return true
      } else {
        return _.every(self.neurons, function(neuron) {
          return _.every(neuron.connections.outgoing, function(connection) {
            return !_.isNil(connection.to.error)
          })
        })
      }
    }
  }
  /**
  * @namespace Layer#has
  * @memberof Layer.prototype
  * @instance
  */
  self.has = {
    /**
    * @function Layer#has.activated
    * @memberof Layer.prototype
    * @instance
    * @returns {boolean} Returns `true` if all neurons have activated
    */
    activated: function() {
      if(_.isNil(self.last)) {
        return false
      } else {
        return true
      }
    },
    /**
    * @function Layer#has.propagated
    * @memberof Layer.prototype
    * @instance
    * @return {boolean} Return `true` if all neurons have propagated
    */
    propagated: function() {
      if(_.isNil(self.error)) {
        return false
      } else {
        return true
      }
    }
  }
  /**
  * @function Layer#weights
  * @memberof Layer.prototype
  * @instance
  */
  self.weights = function(callback) {
    return new Promise(function(resolve, reject) {
      return async.auto({
        "incoming": function(callback) {
          async.map(self.neurons, function(neuron, callback) {
            callback(null, neuron.connections.incoming)
          }, callback)
        },
        "outgoing": function(callback) {
          async.map(self.neurons, function(neuron, callback) {
            callback(null, neuron.connections.outgoing)
          }, callback)
        },
        "all": ["incoming", "outgoing", function(results, callback) {
          callback(null, _.uniq(_.concat(_.flatten(results.incoming), _.flatten(results.outgoing))))
        }],
        "weights": ["all", function(results, callback) {
          async.map(results.all, function(connection, callback) {
            callback(null, connection.weight)
          }, callback)
        }]
      }, function(error, results) {
        return callback ? callback(error, results.weights) : !error ? resolve(results.weights) : reject(error)
      })
    })
  }
  /**
  * Projects all the neurons in this layer to all the neurons in the given layer - or neuron.
  *
  * @function Layer#project
  * @memberof Layer.prototype
  * @instance
  */
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
  /**
  * Activates every neuron in this layer and returns squashed results
  *
  * @function Layer#activate
  * @memberof Layer.prototype
  * @instance
  */
  self.activate = function(inputs, callback) {
    return new Promise(function(resolve, reject) {
      if(!callback && _.isFunction(inputs)) {
        callback = inputs
        inputs = null
      }
      
      let activate = function() {
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
      
      if(self.is.input()) {
        if(!inputs) {
          let error = new Error("'inputs' is not defined")
          return callback ? callback(error) : reject(error)
        } else if(inputs.length !== self.neurons.length) {
          let error = new Error("'inputs.length' !== 'layer.neurons'\nInput size must be equal to the number of neurons in the layer.")
          return callback ? callback(error) : reject(error)
        } else if(!_.every(inputs, input => _.isNumber(input))) {
          let error = new Error("All 'inputs' must be a 'number'")
          return callback ? callback(error) : reject(error)
        } else {
          activate()
        }
      } else {
        if(inputs) {
          let error = new Error("Can't pass 'inputs' to a hidden/output layer")
          return callback ? callback(error) : reject(error)
        } else if(!self.can.activate()) {
          let error = new Error("Incoming neurons have not been activated")
          return callback ? callback(error) : reject(error)
        } else {
          activate()
        }
      }
      
      /*
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
      */
    })
  }
  /**
  * Updates the weights of every neuron in this layer and returns their mathematical errors
  *
  * @function Layer#propagate
  * @memberof Layer.prototype
  * @instance
  */
  self.propagate = function(feedback, callback) {
    if(!callback && _.isFunction(feedback)) {
      callback = feedback
      feedback = null
    }
    
    return new Promise(function(resolve, reject) {
      if(feedback && feedback.length !== self.neurons.length) {
        let error = new Error("'feedback.length' !== 'layer.neurons'\nFeedback size must be equal to the number of neurons in the layer.")
        return callback ? callback(error) : reject(error)
      } else {
        return async.mapValues(self.neurons, function(neuron, index, callback) {
          // Propagate Output Layer
          if(feedback) {
            neuron.propagate(feedback[index], callback)
          }
          // Propagate Hidden/Input Layer
          else {
            neuron.propagate(callback)
          }
        }, function(error, results) {
          let critiques = Object.values(results)
          return callback ? callback(error, critiques) : !error ? resolve(critiques) : reject(error)
        })
      }
    })
  }
  /**
  * @function Layer#add
  * @memberof Layer.prototype
  * @instance
  */
  self.add = function(neuron, callback) {
    let self = this
    
    return new Promise(function(resolve, reject) {
      self.neurons.push(neuron)
      
      return callback ? callback(null, self.neurons) : resolve(self.neurons)
      
//       return async.auto({
//         "is_array": function(callback) {
//           _.isArray(new_neurons) ? callback(null, new_neurons) : callback(null, false)
//         },
//         "is_number": function(callback) {
//           _.isLength(new_neurons) ? callback(null, new_neurons) : callback(null, false)
//         },
//         "add_neurons": ["is_array", "is_number", function(results, callback) {
//           if (results.is_array) {
//             async.map(results.is_array, function(new_neuron, callback) {
//               self.neurons.push(new_neuron, callback)
//             }, callback)
//           } else if(results.is_number) {
//             async.times(results.is_number, function(n, next) {
//               next(null, self.neurons.push(new Neuron()))
//             }, callback)
//           } else {
//             callback("Error at Layer.add_neurons(): Invalid Parameter Received", null)
//           }
//         }]
//       }, function(error, results) {
//         return callback ? callback(error, results.add_neurons) : !error ? resolve(results.add_neurons) : reject(error)
//       })
    })
  }
  /**
  * @function Layer#best
  * @memberof Layer.prototype
  * @instance
  */
  self.best = function(callback) {
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

/**
* @name Layer.weights
* @memberof Layer
* @static
*/
Layer.weights = function(layer, callback) {
  return new Promise(function(resolve, reject) {
    if(_.isNil(layer)) {
      throw new Error("No `layer` was provided")
    } else if(!(layer instanceof Layer || (_.isArray(layer) && _.every(layer, neuron => neuron instanceof Neuron)))) {
      throw new Error("`layer` must be a 'Layer' or an '[Neurons]'")
    } else if(layer instanceof Layer) {
      layer = layer.neurons
    }
    
    return async.auto({
      "incoming": function(callback) {
        async.map(layer, function(neuron, callback) {
          callback(null, neuron.connections.incoming)
        }, callback)
      },
      "outgoing": function(callback) {
        async.map(layer, function(neuron, callback) {
          callback(null, neuron.connections.outgoing)
        }, callback)
      },
      "all": ["incoming", "outgoing", function(results, callback) {
        callback(null, _.uniq(_.concat(_.flatten(results.incoming), _.flatten(results.outgoing))))
      }],
      "weights": ["all", function(results, callback) {
        async.map(results.all, function(connection, callback) {
          callback(null, connection.weight)
        }, callback)
      }]
    }, function(error, results) {
      return callback ? callback(error, results.weights) : !error ? resolve(results.weights) : reject(error)
    })
  })
}

/**
* @name Layer.activate
* @memberof Layer
* @static
*/
Layer.activate = function(layer, inputs, callback) {
  if(!callback && _.isFunction(inputs)) {
    callback = inputs
    inputs = null
  }
  
  /*
  if(layer instanceof Layer) {
    layer = layer.neurons
  }
  */
  
  if(!layer) {
    throw new Error("No `layer` was provided")
  } else if(!(layer instanceof Layer || (_.isArray(layer) && _.every(layer, neuron => neuron instanceof Neuron)))) {
    throw new Error("`layer` must be a 'Layer' or an '[Neurons]'")
  } else if(layer instanceof Layer) {
    layer = layer.neurons
  }
  
  if(inputs && inputs.length !== layer.length) {
//     console.log(inputs)
    throw new Error("'inputs.length' !== 'layer.neurons'\nInput size must be equal to the number of neurons in the layer.")
  }
  
  return new Promise(function(resolve, reject) {
    return async.mapValues(layer, function(neuron, index, callback) {
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
  })
}

/**
* @name Layer.propagate
* @memberof Layer
* @static
*/
Layer.propagate = function(layer, feedback, callback) {
  if(!callback && _.isFunction(feedback)) {
    callback = feedback
    feedback = null
  }
  
  if(!layer) {
    throw new Error("No `layer` was provided")
  } else if(!(layer instanceof Layer || (_.isArray(layer) && _.every(layer, neuron => neuron instanceof Neuron)))) {
    throw new Error("`layer` must be a 'Layer' or an '[Neurons]'")
  } else if(layer instanceof Layer) {
    layer = layer.neurons
  }
  
  if(feedback && feedback.length !== layer.length) {
    throw new Error("'inputs.length' !== 'layer.neurons'\nInput size must be equal to the number of neurons in the layer.")
  }
    
  return new Promise(function(resolve, reject) {
    return async.mapValues(layer, function(neuron, index, callback) {
      // Propagate Output Layer
      if(feedback) {
        neuron.propagate(feedback[index], callback)
      }
      // Propagate Hidden/Input Layer
      else {
        neuron.propagate(callback)
      }
    }, function(error, results) {
      let output = Object.values(results)
      return callback ? callback(error, output) : !error ? resolve(output) : reject(error)
    })
  })
}

/**
* Given a layer or array of neurons, returns a unique array of outgoing connections
* 
* @name Layer.next
* @memberof Layer
* @static
*/
Layer.next = function(neurons, callback) {
  if(neurons instanceof Layer) {
    neurons = neurons.neurons
  }
  
  return new Promise(function(resolve, reject) {
    return async.auto({
      "all_connections": function(callback) {
        async.map(neurons, function(neuron, callback) {
          callback(null, neuron.connections.outgoing)
        }, callback)
      },
      "connections": ["all_connections", function(results, callback) {
        callback(null, _.uniq(_.flatten(results.all_connections)))
      }],
      "all_neurons": ["connections", function(results, callback) {
        async.map(results.connections, function(connection, callback) {
          callback(null, connection.to)
        }, callback)
      }],
      "neurons": ["all_neurons", function(results, callback) {
        callback(null, _.uniq(_.flatten(results.all_neurons)))
      }]
    }, function(error, results) {
      return callback ? callback(error, results.neurons) : !error ? resolve(results.neurons) : reject(error)
    })
  })
}

/**
* Given a layer or array of neurons, returns a unique array of incoming connections
* 
* @name Layer.previous
* @memberof Layer
* @static
*/
Layer.previous = function(neurons, callback) {
  if(neurons instanceof Layer) {
    neurons = neurons.neurons
  }
  
  return new Promise(function(resolve, reject) {
    return async.auto({
      "all_connections": function(callback) {
        async.map(neurons, function(neuron, callback) {
          callback(null, neuron.connections.incoming)
        }, callback)
      },
      "connections": ["all_connections", function(results, callback) {
        callback(null, _.uniq(_.flatten(results.all_connections)))
      }],
      "all_neurons": ["connections", function(results, callback) {
        async.map(results.connections, function(connection, callback) {
          callback(null, connection.from)
        }, callback)
      }],
      "neurons": ["all_neurons", function(results, callback) {
        callback(null, _.uniq(_.flatten(results.all_neurons)))
      }]
    }, function(error, results) {
      return callback ? callback(error, results.neurons) : !error ? resolve(results.neurons) : reject(error)
    })
  })
}

module.exports = Layer
