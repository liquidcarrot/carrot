'use strict'

let _ = require('lodash')
let async = require('neo-async')
let Promise = require('bluebird')
let Connection = require('./connection')

/**
* CHECK: https://robertbeisicht.wordpress.com/2014/07/04/feed-forward-neural-network-in-javascript/
* CHECK: https://medium.com/javascript-scene/javascript-factory-functions-with-es6-4d224591a8b1
*/
let Neuron = function(props, options) {
  let self = this
  
  self.connections = []
  self.activate = Neuron.activation.SIGMOID
  self.learn = Neuron.update.SIGMOID
  
  if(props) {
    self.activate = props.activate || self.activate
    self.learn = props.learn || self.learn
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
      }, function(error, inputs) {
        return callback ? callback(error, inputs) : !error ? resolve(inputs) : reject(error)
      })
    })
  }
  self.connect = function(neuron, callback) {
    return new Promise(function(resolve, reject) {
      return async.auto({
        "connection": function(callback) {
          callback(null, new Connection({
            from: self,
            to: neuron
          }))
        },
        "neurons": ["connection", function(results, callback) {
          async.each([self, neuron], function(neuron, callback) {
            neuron.connections = _.concat(neuron.connections, results.connection)
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
    
  /**
    let connections = []
    let states = []
    let activate = function(inputs, callback) {
      let self = this
      return new Promise(function(resolve, reject) {
        async.auto({
          "activate": function(callback) {
            callback(null, Math.random())
          }
        }, function(error, results) {
          return callback ? callback(error, results.activate) : !error ? resolve(results.activate) : reject(error)
        })
      })
    }
    let learn = function(feedback, callback) {
      let self = this
      return new Promise(function(resolve, reject) {
        async.auto({
          "learn": function(callback) {
            callback(null, Math.random())
          }
        }, function(error, results) {
          return callback ? callback(error, results.learn) : !error ? resolve(results.learn) : reject(error)
        })
      })
    }

    return {
      connections,
      states,
      activate,
      learn,
      is_input: function(callback) {
        let self = this
        return new Promise(function(resolve, reject) {
          return async.auto({
            "inputs": self.inputs,
            "is_input": ["inputs", function(results, callback) {
              callback(null, results.inputs.length === 0)
            }]
          }, function(error, results) {
            return callback ? callback(error, results.is_input) : !error ? resolve(results.is_input) : reject(error)
          })
        })
      },
      is_output: function(callback) {
        let self = this
        return new Promise(function(resolve, reject) {
          return async.auto({
            "outputs": self.outputs,
            "is_output": ["outputs", function(results, callback) {
              callback(null, results.outputs.length === 0)
            }]
          }, function(error, results) {
            return callback ? callback(error, results.is_output) : !error ? resolve(results.is_output) : reject(error)
          })
        })
      },
      inputs: function(callback) {
        let self = this
        return new Promise(function(resolve, reject) {
          return async.filter(self.connections, function(connection, callback) {
            callback(undefined, connection.to === self)
          }, function(error, inputs) {
            return callback ? callback(error, inputs) : !error ? resolve(inputs) : reject(error)
          })
        })
      },
      outputs: function(callback) {
        let self = this
        return new Promise(function(resolve, reject) {
          return async.filter(self.connections, function(connection, callback) {
            callback(undefined, connection.from === self)
          }, function(error, inputs) {
            return callback ? callback(error, inputs) : !error ? resolve(inputs) : reject(error)
          })
        })
      },
      connect: function(neuron, callback) {
        let self = this
        return new Promise(function(resolve, reject) {
          return async.auto({
            "connection": function(callback) {
              callback(null, Connection({
                from: self,
                to: neuron
              }))
            },
            "neurons": ["connection", function(results, callback) {
              async.each([self, neuron], function(neuron, callback) {
                neuron.connections = _.concat(neuron.connections, results.connection)
                callback()
              }, callback)
            }],
          }, function(error, results) {
            return callback ? callback(error, results.connection) : !error ? resolve(results.connection) : reject(error)
          })
        })
      },
      forward: function(value, callback) {
        let self = this
        return new Promise(function(resolve, reject) {
          async.auto({
            "outputs": function(callback) {
              self.outputs(callback)
            },
            "forward": ["outputs", function(results, callback) {
              async.each(results.outputs, function(output, callback) {
                output.forward.push(value)
                callback()
              }, callback)
            }]
          }, function(error, results) {
            return callback ? callback(error, results.outputs) : !error ? resolve(results.outputs) : reject(error)
          })
        })
      },
      backward: function(value, callback) {
        let self = this
        return new Promise(function(resolve, reject) {
          async.auto({
            "inputs": function(callback) {
              self.inputs(callback)
            },
            "backward": ["inputs", function(results, callback) {
              async.each(results.inputs, function(input, callback) {
                input.forward.push(value)
                callback()
              }, callback)
            }]
          }, function(error, results) {
            return callback ? callback(error, results.inputs) : !error ? resolve(results.inputs) : reject(error)
          })
        })
      }
    }
  */
}

Neuron.activation = {
  SIGMOID: function(input, callback) {
    let self = this
    return new Promise(function(resolve, reject) {
      async.auto({
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
              callback(null, input)
            } 
          } else if(results.can_activate) {
            async.auto({
              "inputs": function(callback) {
                self.inputs(callback)
              },
              "sum": ["inputs", function(results, callback) {
                async.map(results.inputs, function(input, callback) {
                  callback(null, input.forward.queue.shift() * input.weight)
                }, callback)
              }],
              "squash": ["sum", function(results, callback) {
                callback(null, 1 / (1 + Math.exp(-results.sum)))
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
    return new Promise(function(resolve, reject) {
      async.auto({
        "learn": function(callback) {
          callback(null, Math.random())
        }
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