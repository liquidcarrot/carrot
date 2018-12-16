'use strict'

let _ = require('lodash')
let async = require('neo-async')
let Promise = require('bluebird')
let Connection = require('./connection')

/**
* Represents a Neuron.
*
* CHECK: https://robertbeisicht.wordpress.com/2014/07/04/feed-forward-neural-network-in-javascript/
* CHECK: https://medium.com/javascript-scene/javascript-factory-functions-with-es6-4d224591a8b1
* CHECK: https://softwareengineering.stackexchange.com/questions/82593/javascript-ternary-operator-vs
*
* @constructor
* @param { object } props
* @param { array } options
*/
let Neuron = function(props, options) {
  let self = this
  
  // Intra-Neuron Structure
  self.bias = Math.random() 
  self.learning_rate = 0.3
  
  // Inter-Neuron Structure
  self.connections = []
  
  // Inter-Neuron Actions
  self.activate = Neuron.activation.SIGMOID
  self.learn = Neuron.update.SIGMOID
  
  // Intra-Neuron Memory
  self.actions = []
  
  if(props) {
    self.activate = props.activate || self.activate
    self.learn = props.learn || self.learn
    self.bias = props.bias || self.bias
    self.learning_rate = props.learning_rate || self.learning_rate
  }
  
  self.is = {
    input: function(callback) {
      return new Promise(function(resolve, reject) {
        return async.auto({
          "inputs": function(callback) {
            self.inputs(callback)
          },
          "is_input": ["inputs", function(results, callback) {
            callback(null, results.inputs.length === 0)
          }]
        }, function(error, results) {
          return callback ? callback(error, results.is_input) : !error ? resolve(results.is_input) : reject(error)
        })
      })
    },
    output: function(callback) {
      return new Promise(function(resolve, reject) {
        return async.auto({
          "outputs": function(callback) {
            self.outputs(callback)
          },
          "is_output": ["outputs", function(results, callback) {
            callback(null, results.outputs.length === 0)
          }]
        }, function(error, results) {
          return callback ? callback(error, results.is_output) : !error ? resolve(results.is_output) : reject(error)
        })
      })
    }
  }
  self.can = {
    activate: function(callback) {
      async.auto({
        "inputs": function(callback) {
          self.inputs(callback)
        },
        "can_activate": ["inputs", function(results, callback) {
          async.every(results.inputs, function(input, callback) {
            callback(null, input.forward.queue.length > 0)
          }, callback)
        }]
      }, function(error, results) {
        callback(error, results.can_activate)
      })
    },
    learn: function(callback) {
      async.auto({
        "outputs": function(callback) {
          self.outputs(callback)
        },
        "can_learn": ["outputs", function(results, callback) {
          async.every(results.outputs, function(output, callback) {
            callback(null, output.backward.queue.length > 0)
          }, callback)
        }]
      }, function(error, results) {
        callback(error, results.can_learn)
      })
    }
  }
  self.inputs = function(callback) {
    return new Promise(function(resolve, reject) {
      return async.filter(self.connections, function(connection, callback) {
        callback(undefined, connection.to === self)
      }, function(error, inputs) {
        return callback ? callback(error, inputs) : !error ? resolve(inputs) : reject(error)
      })
    })
  }
  self.outputs = function(callback) {
    return new Promise(function(resolve, reject) {
      return async.filter(self.connections, function(connection, callback) {
        callback(undefined, connection.from === self)
      }, function(error, outputs) {
        return callback ? callback(error, outputs) : !error ? resolve(outputs) : reject(error)
      })
    })
  }
  self.connect = function(neuron, weight, callback) {
    if(!callback && _.isFunction(weight)) {
      callback = weight
      weight = null
    }
    
    return new Promise(function(resolve, reject) {
      return async.auto({
        "connection": function(callback) {
          callback(null, new Connection({
            weight,
            from: self,
            to: neuron,
          }))
        },
        "neurons": ["connection", function(results, callback) {
          async.each([self, neuron], function(neuron, callback) {
            neuron.connections.push(results.connection)
            callback()
          }, callback)
        }],
      }, function(error, results) {
        return callback ? callback(error, results.connection) : !error ? resolve(results.connection) : reject(error)
      })
    })
  }
  self.forward = function(value, callback) {
    return new Promise(function(resolve, reject) {
      async.auto({
        "outputs": function(callback) {
          self.outputs(callback)
        },
        "forward": ["outputs", function(results, callback) {
          async.each(results.outputs, function(output, callback) {
            output.forward.queue.push(value)
            callback()
          }, callback)
        }]
      }, function(error, results) {
        return callback ? callback(error, results.outputs) : !error ? resolve(results.outputs) : reject(error)
      })
    })
  }
  self.backward = function(value, callback) {
    return new Promise(function(resolve, reject) {
      async.auto({
        "inputs": function(callback) {
          self.inputs(callback)
        },
        "backward": ["inputs", function(results, callback) {
          async.each(results.inputs, function(input, callback) {
            input.backward.queue.push(value)
            callback()
          }, callback)
        }]
      }, function(error, results) {
        return callback ? callback(error, results.inputs) : !error ? resolve(results.inputs) : reject(error)
      })
    })
  }
}

Neuron.activation = {
  SIGMOID: function(input, callback) {
    let self = this
    
    if(!callback && _.isFunction(input)) {
      callback = input
      input = null
    }
    
    return new Promise(function(resolve, reject) {
      return async.auto({
        "is_input": function(callback) {
          self.is.input(callback)
        },
        "is_output": function(callback) {
          self.is.output(callback)
        },
        "can_activate": function(callback) {
          self.can.activate(callback)
        },
        "activate": ["is_input", "is_output", "can_activate", function(results, callback) {
          if(results.is_input) {
            if(input === undefined || input === null || input === NaN) {
              callback(new Error("\"input\" is required for input neurons"))
            } else {
              async.auto({
                "encode": function(callback) {
                  self.actions.push(input)
                  callback()
                }
              }, function(error, results) {
                callback(error, input)
              })
            } 
          } else if(results.can_activate) {
            async.auto({
              "inputs": function(callback) {
                self.inputs(callback)
              },
              "sum": ["inputs", function(results, callback) {
                async.map(results.inputs, function(input, callback) {
                  let signal = input.forward.queue.shift()
                  input.forward.states.push(signal)
                  
                  callback(null, signal * input.weight)
                }, function(error, results) {
                  callback(null, _.sum(results) + self.bias)
                })
              }],
              "squash": ["sum", function(results, callback) {
                callback(null, 1 / (1 + Math.exp(-results.sum)))
              }],
              "encode": ["squash", function(results, callback) {
                self.actions.push(results.squash)
                callback()
              }]
            }, function(error, results) {
              callback(error, results.squash)
            })
          } else callback()
        }]
      }, function(error, results) {
        return callback ? callback(error, results.activate) : !error ? resolve(results.activate) : reject(error)
      })
    })
  },
  ReLU: function(inputs, callback) {
    
  },
  TANH: function(inputs, callback) {
    
  },
  IDENTITY: function(inputs, callback) {
    
  },
  PERCEPTRON: function(inputs, callback) {
    
  }
}
Neuron.update = {
  SIGMOID: function(feedback, callback) {
    let self = this
    
    if(!callback && _.isFunction(feedback)) {
      callback = feedback
      feedback = null
    }
    
    return new Promise(function(resolve, reject) {
      return async.auto({
        "is_output": function(callback) {
          self.is.output(callback)
        },
        "is_input": function(callback) {
          self.is.input(callback)
        },
        "can_learn": function(callback) {
          self.can.learn(callback)
        },
        "learn": ["is_output", "is_input", "can_learn", function(results, callback) {
          if(results.is_output) {
            if(feedback === undefined || feedback === null || feedback === NaN) {
              callback(new Error("\"input\" is required for input neurons"))
            } else {
              let last_action = _.last(self.actions)
              callback(null, feedback * (last_action * (1 - last_action)))
            }
          } else if(results.can_learn) {
            async.auto({
              "outputs": function(callbacks) {
                self.outputs(callbacks)
              },
              "feedback": ["outputs", function(results, callback) {
                async.map(results.outputs, function(output, callback) {
                  let critique = output.backward.queue.shift()
                  output.backward.states.push(critique)
                  callback(null, critique)
                }, callback)
              }],
              "critiques": ["outputs", "feedback", function(results, callback) {
                async.transform(results.feedback, function(errors, critique, index, callback) {
                  errors.push(critique * results.outputs[index].weight)
                  callback()
                }, callback)
              }],
              "error": ["critiques", function(results, callback) {
                callback(null, _.sum(results.critiques))
              }],
              "weights": ["outputs", "error", function(results, callback) {
                async.each(results.outputs, function(output, callback) {
                  output.weight = output.weight - self.learning_rate * _.last(output.backward.states) * _.last(self.actions)
                  callback()
                }, callback)
              }]
            }, function(error, results) {
              callback(error, results.error)
            })
          } else callback()
        }]
      }, function(error, results) {
        return callback ? callback(error, results.learn) : !error ? resolve(results.learn) : reject(error)
      })
    })
  },
  ReLU: function(feedback, callback) {
    
  },
  TANH: function(feedback, callback) {
    
  },
  IDENTITY: function(feedback, callback) {
    
  },
  PERCEPTRON: function(feedback, callback) {
    
  }
}


module.exports = Neuron

// Function Supprt Type = First Thing Checked
// Function Flow Depends on Function Type

// No support for synchronous code
// Will break application due to execution time
// User education via best practices - only

// Cannot support streams and promise/callback in the same function
// because streams are objects which would require a promise/callback
// to be exported/imported

// Need stream, async, and sync function for same actions seperately.