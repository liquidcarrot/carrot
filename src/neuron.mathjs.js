'use strict'

let _ = require('lodash')
let math = require('mathjs')
let async = require('neo-async')

let Connection = function(props) {
  let self = this
  
  self.from
  self.to
  self.weight = Math.random()
  
  if(props) {
    self.from = props.from || self.from
    self.to = props.to || self.to
    self.weight = props.weight || self.weight
  }
}

let Neuron = function(props) {
  let self = this
  
  self.bias // Neuron bias
  self.rate // Learning rate
  self.last // Last Squashed Sum
  self.error // Error of Synaptic Weighted Sums (Not with respect to individual weights)
  self.connections = {
    // Incoming Connections
    incoming: [],
    // Outgoing Connections
    outgoing: []
  }
  self.activation = Neuron.activations.SIGMOID
  self.is = {
    // No Incoming Connections
    input: function() {
      return self.connections.incoming.length === 0 
    },
    // No Outgoing Connections
    output: function() {
      return self.connections.outgoing.length === 0
     }
  }
  
  /**
  * [x] Case "Input Neuron": Forward Input; Return Input
  * [x] Case "Hiddent/Output Neuron": Sum Inputs; Squash Sum; Store Squashed Sum; Return Squashed Sum
  */
  self.activate = function(input, callback) {
    if(!callback) {
      callback = input
      input = null
    }
    
    if(self.is.input()) {
      console.log("Input: " + input)
      
      // Forward Environment Input through the Network
      self.last = input
      callback(null, self.last)
    } else {
      // Incoming Connection Weights
      let weights = _.map(self.connections.incoming, function(connection) {
        return connection.weight
      })
      // Incoming Connection Inputs
      let inputs = _.map(self.connections.incoming, function(connection) {
        return connection.from.last
      })
      
      console.log("Incoming Weights: " + weights)
      console.log("Incoming Inputs: " + inputs)
      
      // Synaptic Weight Function
      let sum = math.parse("dot(w,i)").eval({
        w: weights,
        i: inputs
      })
      
      // Activation Function
      self.last = self.activation(sum)
      
      callback(null, self.last)
    }
  }
  
  /**
  * Assumes `feedback` is the Net Error with respect to this neuron
  *
  * [ ] Learn How to Cleanly Set This Up
  * [ ] Case "Output Neuron": Multiply `feedback` by Activation Derivative; Return Chained Expression
  * [ ] Case "Hidden/Input": Sum Net Errrors; Multiply Net Error by Activation Derivative; Update Weights; Return Chained Expression
  */
  self.propagate = function(feedback, callback) {
    if(!callback) {
      callback = feedback
      feedback = null
    }
    
    if(self.is.output()) {
      console.log("Feedback: " + feedback)
      // Forward Environment Error through the Network
      self.error = feedback * self.activation(self.last, true)
      callback(null, self.error)
    } else {
      // Outgoing Connection Weights
      let weights = _.map(self.connections.outgoing, function(connection) {
        return connection.weight
      })
      // All Incoming Critiques from Outgoing Connections
      let critiques = _.map(self.connections.outgoing, function(connection) {
        return connection.to.error
      })
      
      // Net Critique (Dot Product of All Incoming Critiques and their Importance)
      let sum = math.parse("dot(w,c)").eval({
        w: weights,
        c: critiques
      })
      
      // Net Neuron Error
      self.error = sum * self.activation(self.last, true)
      
      // Update Weights; Return Update Weights
      let new_weights = _.map(self.connections.outgoing, function(connection, index, connections) {
        connection.weight = connections[index].weight = connections[index].weight - self.rate * connections[index].to.error * self.last
        return connection.weight
      })
      
      callback(null, self.error)
    }
  }
  
  /**
  * [x] Create a new Connection
  * [x] Add Connection to both Neurons
  * [x] Return Connection
  */
  self.project = function(neuron, weight, callback) {
    if(!callback) {
      callback = weight
      weight = null
    }
    
    // Creates a Connection Between Neurons
    let connection = new Connection({
      from: self,
      to: neuron,
      weight: weight
    })
    
    // Adds Connection to both Neurons
    self.connections.outgoing.push(connection)
    neuron.connections.incoming.push(connection)
    
    callback(null, connection)
  }
}

Neuron.activations = {
  SIGMOID: function(x, derivative) {
    let sigmoid = 1 / (1 + Math.exp(-x))
    return derivative ? sigmoid * (1 - sigmoid) : sigmoid
  }
}

// Neuron.activations = {
//   SIGMOID: math.parse("1 / (1 + e^(-x))")
// }

console.log("Test 1")
console.log()

let n0 = new Neuron()

// n0.activate(Math.random(), function(error, result) {
n0.activate(0.75136507, function(error, result) {
  console.log("Error: " + error)
  console.log("Response: " + result)
//   n0.propagate(Math.random(), function(error, response) {
  n0.propagate(0.74136507, function(error, response) {
    console.log("\tPropagation Error: " + error)
    console.log("\tPropagation Response: " + response)
  })
})

console.log()

setTimeout(function() {
  console.log("Test 2")
  console.log()
  
  let n0 = new Neuron()
  let n1 = new Neuron()
  
  n0.project(n1, function(error, connection) {
    n0.activate(Math.random(), function(error, response) {
      n1.activate(function(error, response) {
        console.log("Response: " + response)
        n1.propagate(Math.random(), function(error, result) {
          console.log("\tPropagation Error: " + error)
          console.log("\tPropagation Response: " + result)
          n0.propagate(function(error, results) {
            console.log("\tPropagation Error: " + error)
            console.log("\tPropagation Response: " + result)
          })
        })
      })
    })
  })
}, 2000)


setTimeout(function() {
  console.log()
  console.log("Test 3")
  console.log()

  let i0 = new Neuron({
    rate: 0.5
  })
  let i1 = new Neuron({
    rate: 0.5
  })
  let h0 = new Neuron({ 
    rate: 0.5,
    bias: 0.35,
  })
  let h1 = new Neuron({ 
    rate: 0.5,
    bias: 0.35,
  })
  let o0 = new Neuron({ 
    rate: 0.5,
    bias: 0.6,
  })
  let o1 = new Neuron({ 
    rate: 0.5,
    bias: 0.6,
  })
  
  async.auto({
    "connections": function(callback) {
      async.parallel([
        function(callback) { 
          i0.project(h0, 0.15, callback) 
        },
        function(callback) { 
          i1.project(h0, 0.2, callback)
        },
        function(callback) { 
          i0.project(h1, 0.25, callback)
        },
        function(callback) { 
          i1.project(h1, 0.3, callback)
        },
        function(callback) { 
          h0.project(o0, 0.4, callback)
        },
        function(callback) { 
          h1.project(o0, 0.45, callback)
        },
        function(callback) { 
          h0.project(o1, 0.5, callback)
        },
        function(callback) { 
          h1.project(o1, 0.55, callback)
        }
      ], callback)
    },
    "forward": ["connections", function(results, callback) {
      async.auto({
        "input_layer": function(callback) {
          async.parallel([
            function(callback) {
              i0.activate(0.05, callback)
            },
            function(callback) {
              i1.activate(0.1, callback)
            },
          ], callback)
        },
        "hidden_layer_0": ["input_layer", function(results, callback) {
          async.parallel([
            function(callback) {
              h0.activate(callback)
            },
            function(callback) {
              h1.activate(callback)
            },
          ], callback)
        }],
        "output_layer": ["hidden_layer_0", function(results, callback) {
          async.parallel([
            function(callback) {
              o0.activate(callback)
            },
            function(callback) {
              o1.activate(callback)
            },
          ], callback)
        }],
      }, function(error, results) {
        callback(error, results.output_layer)
      })
    }],
    "error": ["forward", function(results, callback) {
      async.auto({
        "total": function(callback) {
          let total_error = 0.5 * (Math.pow(0.01 - results.forward[0], 2) + Math.pow(0.99 - results.forward[1], 2))
          callback(null, total_error)
        },
        "each": function(callback) {
          let output_errors = [results.forward[0] - 0.01, results.forward[1] - 0.99]
          callback(null, output_errors)
        }
      }, callback)
    }],
    "backward": ["error", function(results, callback) {
      async.auto({
        "output_layer": function(callback) {
          async.parallel([
            function(callback) {
              o0.propagate(results.error.each[0], callback)
            },
            function(callback) {
              o1.propagate(results.error.each[1], callback)
            },
          ], callback)
        },
        "hidden_layer_0": ["output_layer", function(results, callback) {
          async.parallel([
            function(callback) {
              h0.propagate(callback)
            },
            function(callback) {
              h1.propagate(callback)
            },
          ], callback)
        }],
        "input_layer": ["hidden_layer_0", function(results, callback) {
          async.parallel([
            function(callback) {
              i0.propagate(callback)
            },
            function(callback) {
              i1.propagate(callback)
            },
          ], callback)
        }]
      }, callback)
    }],
  }, function(error, results) {
    console.log("Error: " + error)
    console.log("Results: " + results.forward)
    console.log("Total Error: " + results.error.total)
    console.log("Done!")
  })
}, 4000)