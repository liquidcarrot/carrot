/**
* Neuron should sum all incoming connections with a bias, first multiplying the input byu the weight of that connection. 

When propagating, a neuron should add the net errors of all incoming neurons and then spliut its ecevition into two phases, ffirst, calculating its error before propafating it back out into the network. seconf is to update the incoming wrights with their relative critiques/]]A Neuron should keep track of its lnet (synaptic weight function) it squash function, it outgoing connections and its incoming connections
*/

let _ = require('lodash')
let chalk = require('chalk')
let async = require('neo-async')
let Connection = require('./connection')


let Neuron = function(props) {
  let self = this
  
  //================================
  // State Information =============
  //================================
  self.bias = props ? (props.bias || Math.random()) : Math.random()
  self.alpha = props ? (props.alpha || Math.random()) : Math.random()
  self.beta = props ? (props.beta || Math.random()) : Math.random()
  self.delta = props ? (props.delta || Math.random()) : Math.random()
  self.learning_rate = props ? (props.learning_rate || 0.3) : 0.3
  self.connections = {
    incoming: [],
    outgoing: []
  }
  self.activation = Neuron.functions.SIGMOID
  //================================
  // END State Information =========
  //================================
  
  //================================
  // Stored Information ============
  //================================
  self.historic = {}
  self.historic.activation = {
    outputs: [],
    sums: [],
  }
  self.historic.propagation = {
    output_errors: [],
    sum_errors: [],
    errors: []
  }
  self.historic.input = []
  self.historic.feedback = []
  //================================
  // END Stored Information ========
  //================================
  
  //================================
  // Construction ==================
  //================================
  if(props) {
    if(props.activation) {
      if(typeof props.activation === "string") {
        if(props.activation.toLowerCase() === "sigmoid" || props.activation.toLowerCase() === "sigmoidal" || props.activation.toLowerCase() === "logistic" || props.activation.toLowerCase() === "logistics") {
          self.activation = Neuron.functions.SIGMOID
        } else if(props.activation.toLowerCase() === "relu") {
          self.activation = Neuron.functions.RELU
        } else if(props.activation.toLowerCase() === "tanh") {
          self.activation = Neuron.functions.TANH
        } else if(props.activation.toLowerCase() === "linear" || props.activation.toLowerCase() === "identity") {
          self.activation = Neuron.functions.LINEAR
        } else {
          throw new Error(props.activation + " is not a valid - or is an unsupported - activation function.\n\n" + "If you would like to create support for it, please open a up pull request on GitHub for it: https://github.com/liquidcarrot/carrot/pulls\n\n" + "If you would like one of our core contributors to take a look into it, please open up an issue on GitHub describing this function in further detail: https://github.com/liquidcarrot/carrot/issues")
        }
      } else if(typeof props.activation === "function") {
        self.activation = props.activation
      } else {
        throw new Error("Activation function must be a 'function' or a 'string'")
      }
    }
    
    if(props.connections) {
      if(props.connections.incoming) {
        if(_.isArray(props.connections.incoming)) {
          if(_.every(props.connections.incoming, neuron => neuron instanceof Neuron)) {
            props.connections.incoming = props.connections.incoming
          } else if(_.every(props.connections.incoming, connection => connection instanceof Connection)) {
            props.connections.incoming = _.map(props.connections.incoming, connection => connection.from)
          } else {
            throw new Error("Incoming Connections must be a 'layer', '[Neuron]', or '[Connection]'")
          }
        } else if(props.connections.incoming instanceof Layer) {
          props.connections.incoming = props.connections.incoming.neurons
        } else {
          throw new Error("'connections.incoming' must be a 'layer', '[Neuron]', or '[Connection]'")
        }

        _.each(props.connections.incoming, function(neuron, index) {
          let connection = new Connection({
            from: neuron,
            to: self,
          })

          neuron.connections.outgoing.push(connection)
          self.connections.incoming.push(connection)
        })
      }
      if(props.connections.outgoing) {
        if(_.isArray(props.connections.outgoing)) {
          if(_.every(props.connections.outgoing, neuron => neuron instanceof Neuron)) {
            props.connections.outgoing = props.connections.outgoing
          } else if(_.every(props.connections.outgoing, connection => connection instanceof Connection)) {
            props.connections.outgoing = _.map(props.connections.outgoing, connection => connection.to)
          } else {
            throw new Error("Incoming Connections must be a 'layer', '[Neuron]', or '[Connection]'")
          }
        } else if(props.connections.outgoing instanceof Layer) {
          props.connections.outgoing = props.connections.outgoing.neurons
        } else {
          throw new Error("Incoming Connections must be a 'layer', '[Neuron]', or '[Connection]'")
        }
        
        _.each(props.connections.outgoing, function(neuron, index) {
          let connection = new Connection({
            from: self,
            to: neuron,
          })

          neuron.connections.incoming.push(connection)
          self.connections.outgoing.push(connection)
        })
      }
    }
  }
  //================================
  // END Construction ==============
  //================================
  
  //================================
  // Utility Functions =============
  //================================
  self.is = {
    input: function(callback) {
      callback(null, self.connections.incoming.length === 0)
    },
    output: function(callback) {
      callback(null, self.connections.outgoing.length === 0)
    }
  }
  self.can = {
    activate: function(callback) {
      // ...
      callback
    },
    propagate: function(callback) {
      // ...
      callback()
    }
  }
  self.has = {
    activated: function(callback) {
      // ...
      callback
    },
    propagated: function(callback) {
      // ...
      callback()
    }
  }
  self.latest = {}
  self.latest.activation = {
    output: function() {
     return _.last(self.historic.activation.outputs)
    },
    sum: function() {
     return _.last(self.historic.activation.sums)
    }
  },
  self.latest.propagation = {
    output_error:function() {
      return _.last(self.historic.propagation.output_errors)
    },
    sum_error: function() {
      return _.last(self.historic.propagation.sum_errors)
    },
    error: function() {
      return _.last(self.historic.propagation.errors)
    }
  },
  self.latest.input = function() {
   return _.last(self.historic.input)
  },
  self.latest.feedback = function() {
   return _.last(self.historic.feedback)
  },
  self.latest.output = function() {
   return self.latest.activation.output()
  },
  self.latest.error = function() {
   return self.latest.propagation.error()
  }
  self.incoming = {
    inputs: function(callback) {
      self.incoming.neurons(function(error, neurons) {
        async.map(neurons, function(neuron, callback) {
          callback(null, neuron.latest.output())
        }, callback)
      })
    },
    feedback: function(callback)  {
      self.outgoing.neurons(function(error, neurons) {
        async.map(neurons, function(neuron, callback) {
          callback(null, neuron.latest.error())
        }, callback)
      })
    },
    weights: function(callback)  {
      async.map(self.connections.incoming, function(connection, callback) {
        callback(null, connection.weight)
      }, callback)
    },
    connections: function(callback)  {
      callback(null, self.connections.incoming)
    },
    neurons: function(callback)  {
      async.map(self.connections.incoming, function(connections, callback) {
        callback(null, connections.from)
      }, callback)
    }
  }
  self.outgoing = {
    inputs: function(callback)  {
      callback(null, self.historic.outputs)
    },
    feedback: function(callback)  {
      callback(null, self.historic.feedback)
    },
    weights: function(callback)  {
      async.map(self.connections.outgoing, function(connection, callback) {
        callback(null, connection.weight)
      }, callback)
    },
    connections: function(callback)  {
      callback(null, self.connections.outgoing)
    },
    neurons: function(callback)  {
      async.map(self.connections.outgoing, function(connections, callback) {
        callback(null, connections.to)
      }, callback)
    }
  }
  self.all = {
    inputs: function(callback)  {
      async.concat([self.incoming, self.outgoing], function(group, callback) {
        group.inputs(callback)
      }, callback)
    },
    feedback: function(callback)  {
      async.concat([self.incoming, self.outgoing], function(group, callback) {
        group.feedback(callback)
      }, callback)
    },
    weights: function(callback)  {
      async.concat([self.incoming, self.outgoing], function(group, callback) {
        group.weights(callback)
      }, callback)
    },
    connections: function(callback)  {
      async.concat([self.incoming, self.outgoing], function(group, callback) {
        group.connections(callback)
      }, callback)
    },
    neurons: function(callback)  {
      async.concat([self.incoming, self.outgoing], function(group, callback) {
        group.neurons(callback)
      }, callback)
    }
  }
  //================================
  // END Utility Functions =========
  //================================
  
  //================================
  // Core Methods ==================
  //================================
  /**
  * @returns {Connection}
  */
  self.project = function(neuron, weight, callback) {
    if(!callback) {
      callback = weight
      weight = null
    }
    
    async.auto({
      "connection": function(callback) {
        callback(null, new Connection({ from: self, to: neuron, weight }))
      },
      "store": ["connection", function(results, callback) {
        async.applyEach([
          function(connection, callback) {
            self.connections.outgoing.push(connection)
            callback()
          },
          function(connection, callback) {
            neuron.connections.incoming.push(connection)
            callback()
          }
        ], results.connection, callback)
      }]
    }, function(error, results) {
      callback(error, results.connection)
    })
    
    // Another Style
    /**
    let connection = new Connection({ from: self, to: neuron, weight })
    async.seq((connection, callback) => {
      async.applyEach([
        (connection, callback) => {
          self.connections.outgoing.push(connection)
          callback()
        },
        (connection, callback) => {
          neuron.connections.incoming.push(connection)
          callback()
        }
      ], connection, callback)
    })(connection, (error, results) => {
      callback(error, connection)
    })
    */
  }
  /**
  * @param {number} [input]
  * @param {Function} [callback] - Invoked _(error, output)_
  * @return {number}
  */
  self.activate = function(input, callback) {
    if(!callback) {
      callback = input
      input = null
    }
    
    async.seq(function(callback) { 
      self.is.input(callback)
    }, function(is_input, callback) {
      if(is_input) {
        self.historic.input.push(input)
        self.historic.activation.outputs.push(self.activation(input))
        callback(null, self.latest.output())
      } else {
        async.auto({
          "inputs": function(callback) {
            async.seq(function(callback) {
              self.incoming.inputs(callback)
            }, function(inputs, callback) {
              self.historic.input.push(inputs)
              callback(null, self.latest.input())
            })(callback)
          },
          "weights": function(callback) {
            self.incoming.weights(callback)
          },
          "terms": ["inputs", "weights", function(results, callback) {
            async.times(results.inputs.length, function(index, callback) {
              callback(null, results.inputs[index] * results.weights[index])
            }, callback)
          }],
          "sum": ["terms", function(results, callback) {
            self.historic.activation.sums.push(_.sum(_.concat(results.terms, self.bias)))
            callback(null, self.latest.activation.sum())
          }],
          "squash": ["sum", function(results, callback) {
            self.historic.activation.outputs.push(self.activation(results.sum))
            callback(null, self.latest.activation.output())
          }]
        }, function(error, results) {
          callback(error, results.squash)
        })
      }
    })(callback)
    
    // (Commented)
    /**
    async.seq(function(callback) { 
      self.is.input(callback)
    }, function(is_input, callback) {
      if(is_input) {
        console.log("\tInput: " + input)
        self.historic.input.push(input)
        console.log("\tHistoric Inputs: " + self.historic.input)
        self.historic.activation.outputs.push(input)
        console.log("\tHistoric Outputs: " + self.historic.activation.outputs)
        console.log("\tLatest Output: " + self.latest.output())
        callback(null, self.latest.output())
      } else {
        async.auto({
          "inputs": function(callback) {
            async.seq(function(callback) {
              self.incoming.inputs(callback)
            }, function(inputs, callback) {
              self.historic.input.push(inputs)
              console.log("\tHistoric Inputs: " + self.historic.input)
              console.log("\tLatest Input: " + self.latest.input())
              callback(null, self.latest.input())
            })(callback)
          },
          "weights": function(callback) {
            self.incoming.weights(callback)
          },
          "terms": ["inputs", "weights", function(results, callback) {
            async.times(results.inputs.length, function(index, callback) {
              console.log("\t\tI: " + results.inputs[index] + " * W: " + results.weights[index])
              callback(null, results.inputs[index] * results.weights[index])
            }, callback)
          }],
          "sum": ["terms", function(results, callback) {
            console.log("\tSum: " + _.sum(_.concat(results.terms, self.bias)))
            self.historic.activation.sums.push(_.sum(_.concat(results.terms, self.bias)))
            console.log("\tHistoric Sums: " + self.historic.activation.sums)
            console.log("\tLatest Sum: " + self.latest.activation.sum())
            callback(null, self.latest.activation.sum())
          }],
          "squash": ["sum", function(results, callback) {
            self.historic.activation.outputs.push(self.activation(results.sum))
            console.log("\tHistoric Squashes: " + self.historic.activation.outputs)
            console.log("\tLatest Squash: " + self.latest.activation.output())
            callback(null, self.latest.activation.output())
          }]
        }, function(error, results) {
          callback(error, results.squash)
        })
      }
    })(callback)
    */
        
    // Another Style (Partially Finished)
    /**
    async.seq((callback) => self.incoming.inputs(callback), (inputs, callback) => { // Get Neuron's Incoming Inputs
      self.historic.input.push(inputs)
      callback(null, self.latest.input)
    }, (inputs, callback) => { // Synaptic Weight Inputs

      async.seq((callback) => {
        async.mapValues(inputs, (input, index, callback) => {

        })
      })(callback)
    })(callback)
    */
  }
  self.propagate = function(target, callback) {
    if(!callback) {
      callback = target
      target = null
    }
    
    console.log()
    
    async.seq(function(callback) {
      self.is.output(callback)
    }, function(is_output, callback) {
      if(is_output) {
        self.historic.feedback.push(target)
//         self.historic.propagation.output_errors.push(target - self.latest.output())
        self.historic.propagation.output_errors.push(self.latest.output() - target)
        self.historic.propagation.sum_errors.push(self.latest.output() * (1 - self.latest.output()))
        self.historic.propagation.errors.push(self.latest.propagation.output_error() * self.latest.propagation.sum_error())
        callback(null, self.latest.error())
      } else {
        async.auto({
          "feedback": function(callback) {
            async.seq(function(callback) {
              self.incoming.feedback(callback)
            }, function(feedback, callback) {
              console.log("F: " + feedback)
              console.log("\tF: " + typeof feedback)
              self.historic.feedback.push(feedback)
              callback(null, self.latest.feedback())
            })(callback)
          },
          "weights": function(callback) {
            self.outgoing.weights(callback)
          },
          "output_error": ["feedback", function(results, callback) {
            console.log("O: " + _.sum(results.feedback))
            self.historic.propagation.output_errors.push(_.sum(results.feedback))
            callback(null, self.latest.propagation.output_error())
          }],
          "sum_error": function(callback) {
            console.log("S: " + self.latest.output() * (1 - self.latest.output()))
            self.historic.propagation.sum_errors.push(self.latest.output() * (1 - self.latest.output()))
            callback(null, self.latest.propagation.sum_error())
          },
          "error": ["output_error", "sum_error", function(results, callback) {
            self.historic.propagation.errors.push(results.output_error * results.sum_error)
            callback(null, self.latest.error())
          }],
          "learn": ["feedback", "weights", function(results, callback) {
            async.eachOf(results.feedback, function(critique, index, callback) {
              self.connections.outgoing[index].weight = results.weights[index] - self.learning_rate * critique * self.latest.output()
              callback()
            }, callback)
          }]
        }, function(error, results) {
          callback(error, results.error)
        })
      }
    })(callback)
  }
  //================================
  // END Core Methods ==============
  //================================
  
  
  
  /**
  self.data = {
    last: {
      activation: {
        output: _.last(self.data.historic.activation.outputs),
        sum: _.last(self.data.historic.activation.sums),
      },
      propagation: {
        error: _.last(self.data.historic.propagation.errors) 
      }
    },
    historic: {
      activation: {
        outputs: [],
        sums: [],
      },
      propagation: {
        output: {
          errors: []
        },
        sum: {
          errors: []
        },
        errors: []
      },
      feedback: []
    },
    connections: {
      incoming: [],
      outgoing: []
    },
    neurons: {
      incoming: [],
      outgoing: []
    },
    outgoing: {
      neurons: [],
      connections: []
    },
    incoming: {
      neurons: [],
      connections: []
    }
  }
  */
  
  
  
//   self.weights = {
//     all: (callback) => async.concat([self.incoming, self.outgoing], (connections, callback) => {
//       async.map(connections, (connection, callback) => callback(null, connection.weight), callback)
//     }, callback),
//     length: (callback) => {
//       self.weights.all((error, weights) => {
//         callback(null, weights.length)
//       })
//     },
//     get: (index, callback) => {
//       self.weights.all((error, weights) => {
//         callback(null, weights[index])
//       })
//     },
//     set: (index, value, callback) => {
//       self.weights.incoming.length((error, length) => {
//         if(index < length) {
//           connections.incoming[index].weight = value
//           self.weights.get(index, callback)
//         } else {
//           connections.outgoing[index - length].weight = value
//           self.weights.get(index, callback)
//         }
//       })
//     },
//     incoming: {
//       all: (callback) => async.map(self.incoming, (connection, callback) => callback(null, connection.weight), callback),
//       length: (callback) => {
//         self.weights.incoming.all((error, weights) => {
//           callback(null, weights.length)
//         })
//       },
//       get: (index, callback) => {
//         self.weights.incoming.all((error, weights) => {
//           callback(null, weights[index])
//         })
//       },
//       set: (index, value, callback) => {
//         connections.incoming[index].weight = value
//         self.weights.get(index, callback)
//       },
//     },
//     outgoing: {
//       all: (callback) => async.map(self.outgoing, (connection, callback) => callback(null, connection.weight), callback),
//       length: (callback) => {
//         self.weights.outgoing.all((error, weights) => {
//           callback(null, weights.length)
//         })
//       },
//       get: (index, callback) => {
//         self.weights.outgoing.all((error, weights) => {
//           callback(null, weights[index])
//         })
//       },
//       set: (index, value, callback) => {
//         connections.outgoing[index].weight = value
//         self.weights.get(index, callback)
//       },
//     },
//   }
  
//   self.inputs = (callback) => async.map(self.data.incoming.neurons, (neurons, callback) => callback(null, neuron.data.last.activation.output), callback)
  
//   self.responsibilities = self.critiques = self.feedback = (callback) => async.map(self.data.outgoing.neurons, (neurons, callback) => callback(null, neuron.data.last.propagation.error), callback)
  
  
  
//   self.activate = (input) => {
//     // Input Neuron
//       // Forward Input
    
//       // Sum Inputs 
//       // Squash Sum
//       // Store Shit
//   }
  
//   self.propagate = (target) => {
//     // Sum feedback
//     // Calculate error
//     // Trigger Weight Updates
//     // Store Shit
//   }
}

Neuron.functions = {
  SIGMOID: function(x, derivative) {
    let sigmoid = 1 / (1 + Math.exp(-x))
    return derivative ? sigmoid * (1 - sigmoid) : sigmoid
  },
  RELU: function(x, derivative) {
    return derivative ? (x > 0 ? 1 : 0) : (x > 0 ? x : 0) 
  },
  TANH: function(x, derivative) {
    return derivative ? 1 - Math.pow(Math.tanh(x), 2) : Math.tanh(x)
  },
  LINEAR: function(x, derivative) {
    return derivative ? (1) : (x)
  }
}

module.exports = Neuron


// // //================================
// // // Example 1 =====================
// // //================================
// // let i = new Neuron()

// // i.activate(0.5, (e, r) => {
// //   console.log(chalk.red(e))
// //   console.log(chalk.green("Output: ") + r)
// //   i.propagate(1, (e, r) => {
// //     console.log(chalk.red(e))
// //     console.log(chalk.yellow("Error: ") + r)
// //   })
// // })
// // //================================
// // // END Example 1 =================
// // //================================

// // console.log()
// // console.log()

// // //================================
// // // Example 2 =====================
// // //================================
// let i = [new Neuron(), new Neuron()]
// let n = new Neuron({
//   connections: {
//     incoming: i
//   }
// })

// let data = [{
//   inputs: [-10, -10],
//   outputs: [-10]
// }, {
//   inputs: [-10, 10],
//   outputs: [10]
// }, {
//   inputs: [10, -10],
//   outputs: [10]
// }, {
//   inputs: [10, 10],
//   outputs: [-10]
// }]

// let activate = (data, callback) => {
//   async.seq((callback) => {
//     async.times(i.length, (index, callback) => {
//       i[index].activate(data[index], callback)
//     }, callback)
//   }, (a, callback) => {
//     n.activate(callback)
//   })(callback)
// }

// let propagate = (feedback, callback) => {
//   async.seq((callback) => {
//     n.propagate(feedback, callback)
//   }, (a, callback) => {
//     n.propagate(callback)
//   })(callback)
// }

// let weights = (callback) => {
//   callback(null, _.map(n.connections.incoming, (c) => {
//     return c.weight
//   }))
// }

// let train = (times, callback) => {
//   async.timesSeries(times, (n, callback) => {
//     async.eachSeries(data, (d, callback) => {
//       async.series([
//         (callback) => activate(d.inputs, callback),
//         (callback) => propagate(d.outputs[0], callback)
//       ], callback)
//     }, callback)
//   }, callback)
// }

// let test = (callback) => {
//   async.map(data, (d, callback) => {
//     activate(d.inputs, callback)
//   }, callback)
// }

// async.auto({
//   "weights": weights,
//   "default": test,
//   "train": ["default", (r, c) => {
//     train(1000, c)
//   }],
//   "test": ["train", (r, c) => {
//     test(c)
//   }],
//   "new_weights": ["test", (r, c) => {
//     weights(c)
//   }]
// }, (e,r) => {
//   console.log(chalk.red(e))
//   console.log(chalk.cyan("W: ") + r.weights)
//   console.log(chalk.yellow("D: ") + r.default)
//   console.log(chalk.cyan("W: ") + r.new_weights)
//   console.log(chalk.green("T: ") + r.test)
// })

/**
i.activate(0.5, (e,r) => {
  console.log(chalk.green("Output: ") + r)
  n.activate((e, r) => {
    console.log(chalk.red(e))
    console.log(chalk.magenta("Bias: ") + n.bias)
    console.log(chalk.green("Output: ") + r)
    n.propagate(1, (e,r) => {
      console.log(chalk.red(e))
      console.log(chalk.yellow("Error: ") + r)
      console.log(chalk.cyan("Weight: ") + i.connections.outgoing[0].weight)
      i.propagate((e,r) => {
        console.log(chalk.red(e))
        console.log(chalk.yellow("Error: ") + r)
        console.log(chalk.blue("New Weight: ") + i.connections.outgoing[0].weight)
      })
    })
  })
})
*/

// /*
// i.project(n, (e, c) => {
//   console.log(chalk.red(e))
//   console.log(chalk.cyan("Weight: ") + c.weight)
//   i.activate(0.5, (e,r) => {
//     console.log(chalk.green("Output: ") + r)
//     n.activate((e, r) => {
//       console.log(chalk.red(e))
//       console.log(chalk.magenta("Bias: ") + n.bias)
//       console.log(chalk.green("Output: ") + r)
//       n.propagate(1, (e,r) => {
//         console.log(chalk.red(e))
//         console.log(chalk.yellow("Error: ") + r)
//         console.log(chalk.cyan("Weight: ") + c.weight)
//         i.propagate((e,r) => {
//           console.log(chalk.red(e))
//           console.log(chalk.yellow("Error: ") + r)
//           console.log(chalk.blue("New Weight: ") + c.weight)
//         })
//       })
//     })
//   })
// })
// */
// //================================
// // END Example 2 =================
// //================================

// console.log()
// console.log()

// //================================
// // Example 3 =====================
// //================================
// i = new Neuron()
// let io = new Neuron()
// n = new Neuron()

// async.seq(function(callback) {
//   i.project(n, callback)
// }, function(c, callback) {
//   io.project(n, callback)
// }, function(c, callback) {
//   i.activate(0.35, callback)
// }, function(c, callback) {
//   io.activate(0.35, callback)
// }, function(o, callback) {
//   n.activate((e, r) => {
//     console.log(e)
//     console.log("Bias: " + n.bias)
//     console.log(r)
//     callback(e, r)
//   })
// })(function(e,r) {
//   console.log(r)
// })
// //================================
// // END Example 3 =================
// //================================

/**
// let chalk = require('chalk')

// // let Neuron = require('./neuron')

// let i = [new Neuron(), new Neuron()]
// let h = [new Neuron({
//   connections: {
//     incoming: i
//   }
// }), new Neuron({
//   connections: {
//     incoming: i
//   }
// })]
// let o = [new Neuron({
//   connections: {
//     incoming: h
//   }
// })]

// // ↓
// // ↑

// console.log("W1: " + Math.random() + chalk.yellow(" ↓ "  + Math.random()) + "; W2: " + Math.random() + chalk.green(" ↑ "  + Math.random()))
*/




















