'use strict'

/**
* This tests/shows that:
* - Neurons can reference shared connections
* - Neurons can store many shared/referenceable connections
* - Neurons can independently update shared connections
* - Neurons can store unique (per call and neuron) historic data
*/

let _ = require('lodash')
let faker = require('faker')
let chalk = require('chalk')
let async = require('neo-async')
let Promise = require('bluebird')

let random = {
  scale: () => Math.random() * 2 - 1,
  sign: () => Math.random() < 0.5 ? -1 : 1
}

let Connection = function(props) {
  let self = this
  
  self.from = props ? (props.from || undefined) : undefined
  self.to = props ? (props.to || undefined) : undefined
  self.weight = props ? (props.weight || Math.random()) : Math.random()
}




/**
* IMPORTANT EQUATIONS:
* Synaptic Weights/Sum: Σ (weights * inputs) = Σ
* Squash Functions (sigmoid): 1 / (1 + e^(-synaptic_sum)) = σ
* Cost Function (Mean Squared Error): (1 / n) * Σ (target - output)^2 = Δ
* 
* IMPORTANT EQUATIONS (derivatives):
* Synaptic Weights/Sum (w.r.t weights): weight 
* Synaptic Weights/Sum (w.r.t inputs): input
* Squash Functions (sigmoid): σ * (1 - σ)
* Cost Function (Mean Squared Error): output - target
*/
let Neuron = function(props) {
  let self = this
  
  self.connections = {
    incoming: [],
    outgoing: []
  }
  
  self.outputs = []
  self.errors = []
  
  if(props) {
    if(props.connections) {
      if(props.connections.incoming) {
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
        _.each(props.connections.incoming, function(neuron, index) {
          let connection = new Connection({
            from: self,
            to: neuron,
          })

          self.connections.outgoing.push(connection)
          neuron.connections.incoming.push(connection)
        })
      }
    }
  }
  
  self.weights = function(callback) {
    async.auto({
      "incoming": function(callback) {
        callback(null, _.map(self.connections.incoming, function(connection) {
          return connection.weight
        }))
      },
      "outgoing": function(callback) {
        callback(null, _.map(self.connections.outgoing, function(connection) {
          return connection.weight
        }))
      },
    }, callback)
  }
  
  self.activate = function(callback) {
    // Store Information
    let output = Math.random()
    self.outputs = _.concat(self.outputs, output)
    callback(null, output)
  }
  
  self.propagate = function(callback) {
    async.auto({
      "error": function(callback) {
        let error = Math.random()
        self.errors = _.concat(self.errors, error)
        callback(null, error)
      },
      "weights": function(callback) {
        
        async.each(self.connections.incoming, function(connection, callback) {
          connection.weight = connection.weight - random.scale() * random.scale() * random.scale()
          callback()
        }, callback)
        
        // Passes reference to iteratee
        /*
        async.each(self.connections.incoming, function(connection, callback) {
          connection.weight = connection.weight - random.scale() * random.scale() * random.scale()
          callback()
        }, callback)
        */
        
        // Passes reference to iteratee (another option)
        /*
        async.times(self.connections.incoming.length, function(index, callback) {
          self.connections.incoming[index].weight = self.connections.incoming[index].weight - random.scale() * random.scale() * random.scale()
          callback()
        }, callback)
        */

        // Passes values to iteratee
        /**
        async.map(self.connections.incoming, function(connection, callback) {
          callback(null, Math.random())
        }, callback)
        */
      }
    }, callback)
  }
}

Neuron.activations = {
  SIGMOID: function(sum, derivative) {
    let sig = 1 / (1 + Math.exp(-sum))
    return derivative ? (sig * (1 - sig)) : sig
  }
}
Neuron.costs = {
  MSE: function(target, output) {
    return output - target
  }
}

let i = [new Neuron(), new Neuron()]
let n = new Neuron({
  connections: {
    incoming: i
  }
})

let weights = function(callback) {
  let weights = function(neuron, callback) {
    neuron.weights(function(error, weights) {
      callback(error, "I: " + weights.incoming + "; O: " + weights.outgoing)
    })
  }
  
  async.auto({
    "inputs": function(callback) {
      async.map(i, weights, callback)
    },
    "neuron": function(callback) {
      weights(n, callback)
    }
  }, callback)
}
let outputs = function(callback) {
  async.auto({
    "inputs": function(callback) {
      async.map(i, function(neuron, callback) {
        callback(null, "O: " + neuron.outputs)
      }, callback)
    },
    "neuron": function(callback) {
      callback(null,  "O: " + n.outputs)
    }
  }, callback)
}
let errors = function(callback) {
  async.auto({
    "neuron": function(callback) {
      callback(null,  "E: " + n.errors)
    },
    "inputs": function(callback) {
      async.map(i, function(neuron, callback) {
        callback(null, "E: " + neuron.errors)
      }, callback)
    }
  }, callback)
}

async.auto({
  "first": weights,
  "update": ["first", function(results, callback) {
    async.seq(function(callback) {
      n.propagate(callback)
    }, function(results, callback) {
      async.each(i, function(neuron, callback) {
        neuron.propagate(callback)
      }, callback)
    })(callback)
  }],
  "second": ["update", function(results, callback) {
    weights(callback)
  }]
}, function(error, results) {
  console.log()
  console.log(chalk.yellow("Updating Weights"))
  console.log(chalk.cyan("\tShould have different 'first' & 'second'"))
  console.log(chalk.green("Weights: ") + JSON.stringify(results, null, 1))
  console.log()
})

async.auto({
  "first": outputs,
  "activate": ["first", function(results, callback) {
    async.seq(function(callback) {
      async.each(i, function(neuron, callback) {
        neuron.activate(callback)
      }, callback)
    }, function(results, callback) {
      n.activate(callback)
    })(callback)
  }],
  "second": ["activate", function(results, callback) {
    outputs(callback)
  }]
}, function(error, results) {
  console.log()
  console.log(chalk.yellow("Generating/Storing Outputs"))
  console.log(chalk.cyan("\tShould have empty 'first', not empty 'second'"))
  console.log(chalk.green("Outputs: ") + JSON.stringify(results, null, 1))
  console.log()
})

async.auto({
  "first": errors,
  "propagate": ["first", function(results, callback) {
    async.seq(function(callback) {
      n.propagate(callback)
    }, function(results, callback) {
      async.each(i, function(neuron, callback) {
        neuron.propagate(callback)
      }, callback)
    })(callback)
  }],
  "second": ["propagate", function(results, callback) {
    errors(callback)
  }]
}, function(error, results) {
  console.log()
  console.log(chalk.yellow("Generating/Storing Errors"))
  console.log(chalk.cyan("\tShould have bigger 'second'"))
  console.log(chalk.green("Errors: ") + JSON.stringify(results, null, 1))
  console.log()
})















