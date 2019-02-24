'use strict'

/**
* This tests/shows that:
* - Neurons can behave differently depending on position in network
* - Neurons can pull historic data from previous neurons
* - Can run the synaptic weight function on weights and inputs pulled from historic data
*/

let _ = require('lodash')
let faker = require('faker')
let chalk = require('chalk')
let async = require('neo-async')
let Promise = require('bluebird')

let random = {
  scale: () => Math.random() * 2 - 1,
  sign: () => Math.random() < 0.5 ? -1 : 1,
  number: () => random.sign() * faker.random.number()
}

let Connection = function(props) {
  let self = this
  
  self.from = props ? (props.from || undefined) : undefined
  self.to = props ? (props.to || undefined) : undefined
  self.weight = props ? (props.weight || random.number()) : random.number()
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
  
  self.bias = Math.random()
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
  
  /**
  * @tree
  * @branch is_input - Forward value
  * @branch is_other - Creates value
  */
  self.activate = function(input, callback) {
    if(!callback) {
      callback = input
      input = null
    }
    
    let output;
    
    if(input) {
      // Forward Information
      output = input
    } else {
      // Gather Information
      let incoming_neurons = _.map(self.connections.incoming, function(connection) {
        return connection.from
      })
      let weights = _.map(self.connections.incoming, function(connection) {
        return connection.weight
      })
      let inputs = _.map(incoming_neurons, function(neuron) {
        return _.last(neuron.outputs)
      })
      
      // Store Information
      output = [inputs, weights, self.bias, Neuron.functions.SUM(inputs, weights, self.bias), Neuron.activations.SIGMOID(Neuron.functions.SUM(inputs, weights, self.bias))]
    }
    
    self.outputs = _.concat(self.outputs, output)
    callback(null, output)
  }
  
  /**
  * @tree
  * @branch is_output - Forward value
  * @branch is_other - Creates value
  */
  self.propagate = function(target, callback) {
    if(!callback) {
      callback = target
      target = null
    }
    
    let error;
    
    if(target) {
      error = target
      self.errors = _.concat(self.errors, error)
      callback(null, self.errors)
    } else {
      let outgoing_neurons = _.map(self.connections.outgoing, function(connection) {
        return connection.to
      })
      let weights = _.map(self.connections.outgoing, function(connection) {
        return connection.weight
      })
      let feedback = _.map(outgoing_neurons, function(neuron) {
        return _.last(neuron.errors)
      })

      let error = _.flatten([feedback, weights, Neuron.functions.SUM(feedback, weights), Neuron.activations.SIGMOID(_.last(self.outputs), true)])
      self.errors = _.concat(self.errors, error)
      callback(null, error)
      
//       async.auto({
//         "error": function(callback) {
//           let outgoing_neurons = _.map(self.connections.outgoing, function(connection) {
//             return connection.to
//           })
//           let weights = _.map(self.connections.outgoing, function(connection) {
//             return connection.weight
//           })
//           let feedback = _.map(outgoing_neurons, function(neuron) {
//             return _.last(neuron.outputs)
//           })
          
//           let error = [feedback, weights]
//           self.errors = _.concat(self.errors, error)
//           callback(null, error)
//         },
//         "weights": ["error", function(results, callback) {
//           async.times(self.connections.outgoing.length, function(index, callback) {
//             self.connections.outgoing[index].weight = self.connections.outgoing[index].weight - random.scale() * random.scale() * random.scale()
//             callback(null, self.connections.outgoing[index].weight)
//           }, callback)

//           // Updates weights; does not pass new weights to callback.
//           /*
//           async.each(self.connections.outgoing, function(connection, callback) {
//             connection.weight = connection.weight - random.scale() * random.scale() * random.scale()
//             callback()
//           }, callback)
//           */
//         }]
//       }, callback)
      
//       let outgoing_neurons = _.map(self.connections.outgoing, function(connection) {
//         return connection.to
//       })
//       let feedback = _.map(outgoing_neurons, function(neuron) {
//         return _.last(neuron.outputs)
//       })
      
      
//       async.auto({
//         "error": function(callback) {
//           let error = Math.random()
//           self.errors = _.concat(self.errors, error)
//           callback(null, error)
//         },
//         "weights": ["error", function(results, callback) {
//           async.times(self.connections.outgoing.length, function(index, callback) {
//             self.connections.outgoing[index].weight = self.connections.outgoing[index].weight - random.scale() * random.scale() * random.scale()
//             callback(null, self.connections.outgoing[index].weight)
//           }, callback)

//           // Updates weights; does not pass new weights to callback.
//           /*
//           async.each(self.connections.outgoing, function(connection, callback) {
//             connection.weight = connection.weight - random.scale() * random.scale() * random.scale()
//             callback()
//           }, callback)
//           */
//         }]
//       }, callback)
    }
  }
}

Neuron.functions = {
  /**
  * @params {[number]} x - Feedback (backprop error) or inputs (forward fed values)
  * @params {[number]} weights - Connection weights
  */
  SUM: function(x, weights, bias) {
    return _.sum(_.times(x.length, function(index) {
      return x[index] * weights[index]
    })) + (bias ? bias : 0)
//     console.log(_.times(inputs.length, function(index) {
//       return inputs[index] * weights[index]
//     }))
//     console.log(_.sum(_.times(inputs.length, function(index) {
//       return inputs[index] * weights[index]
//     })))
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

// Forward Prop
async.auto({
  "inputs": function(callback) {
    async.times(i.length, function(n, callback) {
      i[n].activate(0.5 + (n / 10), callback)
    }, callback)
    /*
    async.each(i, function(neuron, callback) {
      neuron.activate(0.5, callback)
    }, callback)
    */
  },
  "neuron": ["inputs", function(results, callback) {
    n.activate(callback)
  }]
}, function(error, results) {
  console.log(results)
})

// Backprop
async.auto({
  "neuron": function(callback) {
    n.propagate(0.5, callback)
  },
  "inputs": ["neuron", function(results, callback) {
    async.times(i.length, function(n, callback) {
      i[n].propagate(callback)
    }, callback)
  }]
}, function(error, results) {
  console.log(results)
})









