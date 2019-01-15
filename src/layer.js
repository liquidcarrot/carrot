`use strict`

let _ = require('lodash')
let async = require('neo-async')
let Promise = require('bluebird')

/**
* >Neural Layer Factory Function
*
* CHECK: https://www.youtube.com/watch?v=FK77zZxaBoI
*
* @constructs Layer
* @param {number|Layer|[Neuron]} props - A `Layer`, `Number`, or array of `Neuron`
* @param {Object} options - Similar to neuron options
* @param {number} [options.bias=Math.random()] - Synaptic Weight Formula's Constant AKA Bias
* @param {ActivationFunction} [options.activation=Neuron.activations.SIGMOID] - Activation Function
* @param {number} [props.rate=0.3] - Learning rate
* @param {Object} [connections] - Connections
* @param {Layer|[Neuron]|[Connection]} [props.connections.incoming=[]] - Incoming Connections
* @param {Layer|[Neuron]|[Connection]} [props.connections.outgoing=[]] - Outgoing Connections
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
      throw new Error("Invalid parameter: " + prop + "\n'props' must be a 'number', '[Neuron]`, or `Layer`.")
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
  * Projects all the neurons in this layer to all the neurons in the given layer - or neuron.
  *
  * @function Layer#project
  * @memberof Layer.prototype
  * @instance
  * @param {Neuron|Layer|Group} object - Destination `neuron`, `layer`, or `group`
  * @param {ConnectionsCallback} [callback] - Callback invoked with _(error, connections)_
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
  * @param {[number]} [inputs] - Array of real numbers (-∞, ∞)
  * @param {NumbersCallback} [callback] - Callback invoked with _(error, results)_
  */
  self.activate = function(inputs, callback) {
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
  /**
  * Updates the weights of every neuron in this layer and returns their mathematical errors
  *
  * @function Layer#propagate
  * @memberof Layer.prototype
  * @instance
  * @param {[number]} [feedback] - Array of real numbers (-∞, ∞)
  * @param {NumbersCallback} [callback] - Callback invoked with _(error, results)_
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
  // Adds a neuron to this layer
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
  // Returns the neuron with the highest axon value in this layer
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

module.exports = Layer
