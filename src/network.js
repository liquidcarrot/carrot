'use strict'

let _ = require('lodash')
let async = require('neo-async')
let Promise = require('bluebird')
let Neuron = require('./neuron')
let Connection = require('./connection')
let Layer = require('./layer')

/**
* >Network Factory Function
*
* @constructs Network
* @param {Network|[Layer]|[Neuron]|[number]} props - A `Network`, `[Layer]`, `[Neuron]`, or `[number]`
* @param {Object} props - Similar to neuron props
* @param {number} [props.bias=Math.random()] - Synaptic Weight Formula's Constant AKA Bias
* @param {ActivationFunction} [props.activation=Neuron.activations.SIGMOID] - Activation Function
* @param {number} [props.rate=0.3] - Learning rate
* @param {Object} [props.connections] - Connections
* @param {Layer|[Neuron]|[Connection]} [props.connections.incoming=[]] - Incoming Connections
* @param {Layer|[Neuron]|[Connection]} [props.connections.outgoing=[]] - Outgoing Connections
*/
let Network = function(props, options) {
  let self = this
  
  self.neurons = []
  
  if(props) {
    // Constructing with new Network([n, n, n])
    if(_.every(props, prop => _.isLength(prop))) {
      props = Array.from(props)
      
      self.neurons = _.flatten(_.map(props, function(length, index, layers) {
        if(index === 0) {
          props[index] = new Layer(length, options)
          return props[index].neurons
        } else {
          props[index] = new Layer(length, _.assign(options, {
            connections: {
              incoming: layers[index - 1]
            }
          }))
          return props[index].neurons
        }
      }))
    }
    // Constructing with new Network([Layer])
    else if(_.every(props, prop => prop instanceof Layer)) {
      props = Array.from(props)
      
      self.neurons = _.flatten(_.map(props, function(layer, index, layers) {
        if(index === 0) {
          props[index] = new Layer(layer, options)
          return props[index].neurons
        } else {
          props[index] = new Layer(layer, _.assign(options, {
            connections: {
              incoming: layers[index - 1]
            }
          }))
          return props[index].neurons
        }
      }))
    }
    // Constructing with new Network([Neuron])
    else if(_.every(props, prop => prop instanceof Neuron)) {
      props = Array.from(props)
      
      self.neurons = _.map(props, function(neuron) {
        return new Neuron(_.assign(neuron, options))
      })
    }
  }
  
  /**
  * @namespace Network#inputs
  * @memberof Network.prototype
  * @instance
  * @param {NeuronsCallback} callback - Invoked with _(error, neurons)_ 
  */
  self.inputs = function(callback) {
    return new Promise(function(resolve, reject) {
      async.filter(self.neurons, function(neuron, callback) {
        callback(null, neuron.is.input())
      }, callback)
    })
  }
  /**
  * @namespace Network#outputs
  * @memberof Network.prototype
  * @instance
  * @param {NeuronsCallback} callback - Invoked with _(error, neurons)_ 
  */
  self.outputs = function(callback) {
    return new Promise(function(resolve, reject) {
      async.filter(self.neurons, function(neuron, callback) {
        callback(null, neuron.is.output())
      }, callback)
    })
  }
  /**
  * @namespace Network#weights
  * @memberof Network.prototype
  * @instance
  * @param {NumbersCallback} callback - Invoked with _(error, weights)_ 
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
  * @namespace Network#activate
  * @memberof Network.prototype
  * @instance
  * @param {[number]} [inputs]
  * @param {NumbersCallback} callback - Invoked with _(error, outputs)_ 
  */
  self.activate = function(inputs, callback) {
    return new Promise(function(resolve, reject) {
      return async.auto({
        // Input Neurons
        "inputs": function(callback) {
          self.inputs(callback)
        },
        "outputs": function(callback) {
          self.outputs(callback)
        },
        /**
          // Output Neurons
          "outputs": function(callback) {
            self.outputs(callback)
          },
          // Next Layer Neurons
          "next": ["inputs", function(results, callback) {
            async.auto({
              "all": function(callback) {
                async.map(results.inputs, function(neuron, callback) {
                  callback(null, neuron.connections.outgoing)
                }, callback)
              },
              "filtered": ["all", function(results, callback) {
                callback(null, _.uniq(_.flatten(results.all)))
              }]
            }, function(error, results) {
              callback(error, results.filtered)
            })
          }],
        */
        "activate": ["inputs", "outputs", function(results, callback) {
          let layer = results.inputs
          async.until(function() {
            return layer.length === 0
          }, function(callback) {
            async.auto({
              "activate": function(callback) {
                if(_.isEqual(layer, results.inputs)) {
                  Layer.activate(layer, inputs, callback)
                } else {
                  Layer.activate(layer, callback)
                }
              },
              "next": ["activate", function(results, callback) {
                Layer.next(layer, function(error, neurons) {
                  layer = neurons
                  callback(error, neurons)
                })
              }]
            }, function(error, results) {
              callback(error, results.activate)
            })
          }, function(error, results) {
            callback(error, results)
          })
        }],
        /*
        "activate": ["inputs", function(results, callback) {
          
          let activate = function(layer, inputs, callback) {
            if(!callback && _.isFunction(inputs)) {
              callback = inputs
              inputs = null
            }
            
            async.auto({
              "activate": function(callback) {
                if(_.isEqual(layer, results.inputs)) {
                  Layer.activate(layer, inputs, function(error, results) {
                    console.log("Input Layer - Sent Partial Results: ", results)
                    callback(error, results)
                  })
                } else {
                  Layer.activate(layer, function(error, results) {
                    console.log("Hidden/Output Layer - Sent Partial Results: ", results)
                    callback(error, results)
                  })
                }
              },
              "next": ["activate", function(results, callback) {
                console.log("\tReceived Partial Results: ", results.activate)
                Layer.next(layer, callback)
              }]
            }, function(error, results) {
              if(results.next.length === 0) {
                callback(error, results.activate)
              } else {
                activate(results.next, callback)
              }
            })
          }
          
          activate(results.inputs, inputs, callback)
        }],
        */
        /**
          "activate_inputs": ["inputs", function(results, callback) {

            async.mapValues(results.inputs, function(neuron, index, callback) {
              neuron.activate(inputs[index], callback)
            }, callback)
          }],
          "activate_next": ["activate_inputs", "next", function(results, callback) {
            async.mapValues(results.next, function(neuron, index, callback) {
              neuron.activate(callback)
            }, callback)
          }],
          "activate_output": ["activate_next", "outputs", function(results, callback) {
            async.mapValue(results.outputs, function(neuron, index, callback) {
              neuron.activate(callback)
            }, callback)
          }]
        */
      }, function(error, results) {
        
        return callback ? callback(error, results.activate) : !error ? resolve(results.activate) : reject(error)
      })
    })
  }
  
  /**
  * @namespace Network#propagate
  * @memberof Network.prototype
  * @instance
  * @param {[number]} [feedback]
  * @param {NumbersCallback} callback - Invoked with _(error, outputs)_ 
  */
  self.propagate = function(feedback, callback) {
    return new Promise(function(resolve, reject) {
      return async.auto({
        // Input Neurons
        "inputs": function(callback) {
          self.inputs(callback)
        },
        // Output Neurons
        "outputs": function(callback) {
          self.outputs(callback)
        },
        "propagate": ["inputs", "outputs", function(results, callback) {
          let layer = results.outputs
          
          async.until(function() {
            return layer.length === 0
          }, function(callback) {
            async.auto({
              "propagate": function(callback) {
                if(_.isEqual(layer, results.outputs)) {
                  Layer.propagate(layer, feedback, callback)
                } else {
                  Layer.propagate(layer, callback)
                }
              },
              "previous": ["propagate", function(results, callback) {
                Layer.previous(layer, function(error, neurons) {
                  layer = neurons
                  
                  callback(error, layer)
                })
              }]
            }, function(error, results) {
              callback(error, results.propagate)
            })
          }, function(error, results) {
            callback(error, results)
          })
        }],
      }, function(error, results) {
        return callback ? callback(error, results.propagate) : !error ? resolve(results.propagate) : reject(error)
      })
      
      /*
      return async.auto({
        // Output Neurons
        "outputs": function(callback) {
          self.outputs(callback)
        },
        "propagate": ["outputs", function(results, callback) {
          let propagate = function(layer, feedback, callback) {
            if(!callback && _.isFunction(feedback)) {
              callback = feedback
              feedback = null
            }
            
            async.auto({
              "propagate": function(callback) {
                if(_.isEqual(layer, results.inputs)) {
                  Layer.propagate(layer, feedback, callback)
                } else {
                  Layer.propagate(layer, callback)
                }
              },
              "next": ["propagate", function(results, callback) {
                Layer.previous(layer, callback)
              }]
            }, function(error, results) {
              if(results.next.length === 0) {
                callback(error, results.activate)
              } else {
                propagate(results.next, callback)
              }
            })
          }
          
          propagate(results.outputs, feedback, callback)
        }],
      }, function(error, results) {
        return callback ? callback(error, results.propagate) : !error ? resolve(results.propagate) : reject(error)
      })
      */
    })
  }
}

module.exports = Network