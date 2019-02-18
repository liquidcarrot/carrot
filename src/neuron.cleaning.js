/**
* Neuron should sum all incoming connections with a bias, first multiplying the input byu the weight of that connection. 

When propagating, a neuron should add the net errors of all incoming neurons and then spliut its ecevition into two phases, ffirst, calculating its error before propafating it back out into the network. seconf is to update the incoming wrights with their relative critiques/]]A Neuron should keep track of its lnet (synaptic weight function) it squash function, it outgoing connections and its incoming connections
*/

let Connection = require('./connection')


let Neuron = (props) => {
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
  //================================
  // END State Information =========
  //================================
  
  //================================
  // Stored Information ============
  //================================
  self.historic =  {
    activation: {
      outputs: [],
      sums: [],
    },
    propagation: {
      output_errors: [],
      sum_errors: [],
      errors: []
    },
    outputs: [],
    feedback: []
  }
  //================================
  // END Stored Information ========
  //================================
  
  
  //================================
  // Utility Functions =============
  //================================
  self.last = {
    activation: {
      output: _.last(self.data.historic.activation.outputs),
      sum: _.last(self.data.historic.activation.sums),
    },
    propagation: {
      output_error: _.last(self.historic.propagation.output_errors),
      sum_error: _.last(self.historic.propagation.sum_errors)
    },
    output: self.last.activation.output,
    error: self.last.propagation.output_error * self.last.propagation.sum_error
  }
  self.is = {
    
  }
  self.can = {
    
  }
  self.has = {
    
  }
  self.incoming = {
    inputs: (callback) => self.incoming.neurons((error, neurons) => {
      async.map(neurons, (neuron, callback) => {
        callback(null, neuron.last.output())
      }, callback)
    }),
    feedback: (callback) => self.outgoing.neurons((error, neurons) => {
      async.map(neurons, (neuron, callback) => {
        callback(null, neuron.last.error())
      }, callback)
    }),
    weights: (callback) => async.map(self.connections.incoming, (connection, callback) => {
      callback(null, connection.weight)
    }, callback),
    connections: (callback) => callback(null, self.connections.incoming),
    neurons: (callback) => async.map(self.connections.incoming, (connections, callback) => {
      callback(null, connections.from)
    }, callback)
  }
  self.outgoing = {
    inputs: (callback) => callback(null, self.historic.outputs),
    feedback: (callback) => callback(null, self.historic.feedback),
    weights: (callback) => async.map(self.connections.outgoing, (connection, callback) => {
      callback(null, connection.weight)
    }, callback),
    connections: (callback) => callback(null, self.connections.outgoing),
    neurons: (callback) => async.map(self.connections.outgoing, (connections, callback) => {
      callback(null, connections.to)
    }, callback)
  }
  self.all = {
    inputs: (callback) => async.concat([self.incoming, self.outgoing], (group, callback) => {
      group.inputs(callback)
    }, callback),
    feedback: (callback) => async.concat([self.incoming, self.outgoing], (group, callback) => {
      group.feedback(callback)
    }, callback),
    weights: (callback) => async.concat([self.incoming, self.outgoing], (group, callback) => {
      group.weights(callback)
    }, callback),
    connections: (callback) => async.concat([self.incoming, self.outgoing], (group, callback) => {
      group.connections(callback)
    }, callback),
    neurons: (callback) => async.concat([self.incoming, self.outgoing], (group, callback) => {
      group.neurons(callback)
    }, callback)
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
  self.project = (neuron, weight, callback) => {
    if(!callback) {
      callback = weight
      weight = null
    }
    
    async.auto({
      "connection": (callback) => callback(null, new Connection({ from: self, to: neuron, weight })),
      "store": (callback) => {
        
      }
    })
  }
  self.activate = (input, callback) => {
    
  }
  self.propagate = (target, callback) => {
    
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
  
  
  
  self.weights = {
    all: (callback) => async.concat([self.incoming, self.outgoing], (connections, callback) => {
      async.map(connections, (connection, callback) => callback(null, connection.weight), callback)
    }, callback),
    length: (callback) => {
      self.weights.all((error, weights) => {
        callback(null, weights.length)
      })
    },
    get: (index, callback) => {
      self.weights.all((error, weights) => {
        callback(null, weights[index])
      })
    },
    set: (index, value, callback) => {
      self.weights.incoming.length((error, length) => {
        if(index < length) {
          connections.incoming[index].weight = value
          self.weights.get(index, callback)
        } else {
          connections.outgoing[index - length].weight = value
          self.weights.get(index, callback)
        }
      })
    },
    incoming: {
      all: (callback) => async.map(self.incoming, (connection, callback) => callback(null, connection.weight), callback),
      length: (callback) => {
        self.weights.incoming.all((error, weights) => {
          callback(null, weights.length)
        })
      },
      get: (index, callback) => {
        self.weights.incoming.all((error, weights) => {
          callback(null, weights[index])
        })
      },
      set: (index, value, callback) => {
        connections.incoming[index].weight = value
        self.weights.get(index, callback)
      },
    },
    outgoing: {
      all: (callback) => async.map(self.outgoing, (connection, callback) => callback(null, connection.weight), callback),
      length: (callback) => {
        self.weights.outgoing.all((error, weights) => {
          callback(null, weights.length)
        })
      },
      get: (index, callback) => {
        self.weights.outgoing.all((error, weights) => {
          callback(null, weights[index])
        })
      },
      set: (index, value, callback) => {
        connections.outgoing[index].weight = value
        self.weights.get(index, callback)
      },
    },
  }
  self.inputs = (callback) => async.map(self.data.incoming.neurons, (neurons, callback) => callback(null, neuron.data.last.activation.output), callback)
  
  self.responsibilities = self.critiques = self.feedback = (callback) => async.map(self.data.outgoing.neurons, (neurons, callback) => callback(null, neuron.data.last.propagation.error), callback)
  
  
  
  self.activate = (input) => {
    // Input Neuron
      // Forward Input
    
      // Sum Inputs 
      // Squash Sum
      // Store Shit
  }
  
  self.propagate = (target) => {
    // Sum feedback
    // Calculate error
    // Trigger Weight Updates
    // Store Shit
  }
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
    return derivative ? 1 : x
  }
}

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