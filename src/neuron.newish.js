'use strict'

let _ = require('lodash')
let chalk = require('chalk')
let math = require('mathjs')
let async = require('neo-async')


let Neuron = function(props) {
  let self = this
  
  let Layer = require('./layer')
  let Connection = require('./connection')
  
  self.bias = Math.random()
  self.activation = Neuron.activations.SIGMOID
  self.connections = {
    incoming: [],
    outgoing: []
  }
  
  self.rate = 0.3
  self.last
  self.error
  
  if(props) {
    self.bias = props.bias || self.bias
    self.rate = props.rate || self.rate
    
    if(props.activation) {
      if(typeof props.activation === "string") {
        if(props.activation.toLowerCase() === "sigmoid" || 
           props.activation.toLowerCase() === "sigmoidal" ||
           props.activation.toLowerCase() === "logistic" ||
           props.activation.toLowerCase() === "logistics") {
          self.activation = Neuron.activations.SIGMOID
        }
        else if(props.activation.toLowerCase() === "relu") {
          self.activation = Neuron.activations.RELU
        }
        else if(props.activation.toLowerCase() === "tanh") {
          self.activation = Neuron.activations.TANH
        }
        else if(props.activation.toLowerCase() === "linear" ||
                  props.activation.toLowerCase() === "identity") {
          self.activation = Neuron.activations.LINEAR
        }
        else {
          throw new Error(props.activation + " is not a valid - or is an unsupported - activation function.\n\n" + 
                          "If you would like to create support for it, please open a up pull request on GitHub for it: https://github.com/liquidcarrot/carrot/pulls\n\n" +
                          "If you would like one of our core contributors to take a look into it, please open up an issue on GitHub describing this function in further detail: https://github.com/liquidcarrot/carrot/issues")
        }
      }
      else if(typeof props.activation === "function") {
        self.activation = props.activation
      }
      else{
        throw new Error("Activation function must be a 'function' or a 'string'")
      }
    }
    
    if(props.connections) {
      if(props.connections.incoming) {
        let incoming;
        
        // new Neuron({ 'connections': [Neuron] }) || new Neuron(neuron)
        if(_.isArray(props.connections.incoming)) {
          // new Neuron({ 'connections': [Neuron] })
          if(_.every(props.connections.incoming, neuron => neuron instanceof Neuron)) {
            incoming = props.connections.incoming
          } 
          // new Neuron(neuron)
          else if(_.every(props.connections.incoming, connection => connection instanceof Connection)) {
            // new Neuron(neuron) -> new Neuron({ 'connections': [Neuron] })
            incoming = _.map(props.connections.incoming, connection => connection.from)
          }
          // Unsupported Construction
          else {
            throw new Error("Incoming Connections must be a 'layer', '[Neuron]', or '[Connection]'")
          }
        } 
        // new Neuron({ 'connections': Layer })
        else if(props.connections.incoming instanceof Layer) {
          // new Neuron({ 'connections': Layer }) -> new Neuron({ 'connections': [Neuron] })
          incoming = props.connections.incoming.neurons
        } 
        // Unsupported Construction
        else {
          throw new Error("'connections.incoming' must be a 'layer', '[Neuron]', or '[Connection]'")
        }

        _.each(incoming, function(neuron, index) {
          let connection = new Connection({
            from: neuron,
            to: self,
          })

          neuron.connections.outgoing.push(connection)
          self.connections.incoming.push(connection)
        })
      }
      if(props.connections.outgoing) {
        let outgoing;
        
        // new Neuron({ 'connections': [Neuron] }) || new Neuron(neuron)
        if(_.isArray(props.connections.outgoing)) {
          // new Neuron({ 'connections': [Neuron] })
          if(_.every(props.connections.outgoing, neuron => neuron instanceof Neuron)) {
            outgoing = props.connections.outgoing
          } 
          // new Neuron(neuron)
          else if(_.every(props.connections.outgoing, connection => connection instanceof Connection)) {
            // new Neuron(neuron) -> new Neuron({ 'connections': [Neuron] })
            outgoing = _.map(props.connections.outgoing, connection => connection.to)
          }
          // Unsupported Construction
          else {
            throw new Error("Incoming Connections must be a 'layer', '[Neuron]', or '[Connection]'")
          }
        } 
        // new Neuron({ 'connections': Layer })
        else if(props.connections.outgoing instanceof Layer) {
          // new Neuron({ 'connections': Layer }) -> new Neuron({ 'connections': [Neuron] })
          outgoing = props.connections.outgoing.neurons
        } 
        // Unsupported Construction
        else {
          throw new Error("Incoming Connections must be a 'layer', '[Neuron]', or '[Connection]'")
        }
        
        _.each(outgoing, function(neuron, index) {
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
  
  self.is = {
    input: function() {
      return self.connections.incoming.length === 0
    },
    output: function() {
      return self.connections.outgoing.length === 0
    },
    equal: function(neuron) {
      return Math.round(Math.random()) ? true : false
    }
  }
  
  self.can = {
    activate: function() {
      if(self.is.input()) {
        return true
      } else {
        return _.every(self.connections.incoming, function(connection) {
          return !_.isNil(connection.from.last)
        })
      }
    },
    propagate: function() {
      if(self.is.output()) {
        return true
      } else {
        return _.every(self.connections.outgoing, function(connection) {
          return !_.isNil(connection.to.error)
        })
      }
    }
  }
  
  self.has = {
    activated: function() {
      if(_.isNil(self.last)) {
        return false
      } else {
        return true
      }
    },
    propagated: function() {
      if(_.isNil(self.error)) {
        return false
      } else {
        return true
      }
    }
  }
  
  self.project = function(neuron, weight, callback) {
    if(!callback && _.isFunction(weight)) {
      callback = weight
      weight = null
    }
    
    return new Promise(function(resolve, reject) {
      // Creates a Connection Between Neurons
      let connection = new Connection({
        from: self,
        to: neuron,
        weight: weight
      })

      // Adds Connection to both Neurons
      self.connections.outgoing.push(connection)
      neuron.connections.incoming.push(connection)
      
      return callback ? callback(null, connection) : resolve(connection)
    })
  }
  
  self.activate = function(input, callback) { 
    return new Promise(function(resolve, reject) {
      if(!callback && _.isFunction(input)) {
        callback = input
        input = null
      }
      
      // Input Neuron
      if(self.is.input()) {
        if(_.isNil(input)) {
          let error = new Error("'input' is not defined")
          return callback ? callback(error) : reject(error)
        } else if(!_.isNumber(input)) {
          let error = new Error("'input' must be a 'number'")
          return callback ? callback(error) : reject(error)
        } else {
          self.last = input
          return callback(null, self.last)
        }
      }
      // Hidden/Output Neuron
      else {
        if(input) {
          let error = new Error("Can't pass 'input' to a hidden/output neuron")
          return callback ? callback(error) : reject(error)
        } else if(!self.can.activate()) {
          let error = new Error("Incoming neurons have not been activated")
          return callback ? callback(error) : reject(error)
        } else {
          // Incoming Weights
          let weights = _.map(self.connections.incoming, function(connection) {
            return connection.weight
          })
          // Incoming Outputs (i.e. Inputs)
          let inputs = _.map(self.connections.incoming, function(connection) {
            return connection.from.last
          })
          // Synaptic Weight Function
          let sum = _.sum([math.parse("dot(w,i)").eval({
            w: weights,
            i: inputs
          }), self.bias])

          // Activation Function
          self.last = self.activation(sum)

          return callback ? callback(null, self.last) : resolve(self.last)
        }
      }
    })
  }
  self.propagate = function(feedback, callback) {
    return new Promise(function(resolve, reject) {
      if(!callback && _.isFunction(feedback)) {
        callback = feedback
        feedback = null
      }
      
      if(!self.has.activated()) {
        let error = new Error("Neuron has not been activated")
        return callback ? callback(error) : reject(error)
      }
      // Output Neuron
      else if(self.is.output()) {
        if(_.isNil(feedback)) {
          let error = new Error("'feedback' is not defined")
          return callback ? callback(error) : reject(error)
        } else if(!_.isNumber(feedback)) {
          let error = new Error("'feedback' must be a 'number'")
          return callback ? callback(error) : reject(error)
        } else {
          // Mean Squared Error Cost Function
          self.error = (self.last - feedback) * self.activation(self.last, true)
          
          return callback(null, self.error)
        }
      }
      // Hidden/Input Neuron
      else {
        if(feedback) {
          let error = new Error("Can't pass 'feedback' to a hidden/input neuron")
          return callback ? callback(error) : reject(error)
        } else if(!self.can.propagate()) {
          let error = new Error("Outgoing neurons have not been updated")
          return callback ? callback(error) : reject(error)
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
          self.connections.outgoing = _.map(self.connections.outgoing, function(connection, index, connections) {
            connection.weight = connection.weight - self.rate * connection.to.error * self.last
            return connection
          })
          
          return callback ? callback(null, self.error) : resolve(self.error)
        }
      }
    })
  }
}


let Connection = function(props) {
  let self = this
  
  self.from = props ? (props.from || undefined) : undefined
  self.to = props ? (props.to || undefined) : undefined
  self.weight = props ? (props.weight || Math.random()) : Math.random()
}

/**
let Neuron = function(props) {
  let self = this
  
  self.bias = props ? (props.bias || Math.random()) : Math.random()
  self.last = {
    net: undefined,
    out: undefined,
    error: {
      out: undefined,
      net: undefined
    }
  }
  self.is = {
    input: props ? (props.input ? true : false) : false,
    output: props ? (props.output ? true : false) : false,
  }
  
  // @param {[number]|number} i - Input(s)
  // @param {[number]|null} [w] - Weights
  self.activate = (i, w, callback) => {
    // Input Layer Forwarding
    if(self.is.input) {
      self.net = i
      self.out = self.net
    } else {
      self.net = _.sum(_.map(i, (i, index) => {
        return i * w[index]
      })) + (self.is.input ? 0 : self.bias)
      
      console.log("\tNet: " + self.net)
      
      self.out = Neuron.activations.SIGMOID(self.net)
      console.log("\tOut: " + self.out)
    }
    callback(null, self.out)
  }
  
  // @param {[number]|number} c - Critiques or Target Output
  // @param {[number]|null} [w] - Weights
  // @param {[number]|null} [t] - Target Output
  self.propagate = (c, w, callback) => {
    if(self.is.output) {
      self.net = Neuron.activations.SIGMOID(self.out, true)
      
      self.out = self.out - c
    } else {
      self.net = Neuron.activations.SIGMOID(self.out, true)
        
      self.out = _.sum(_.map(c, (c, index) => {
        return c * w[index]
      }))
    }
    callback(null, self.net * self.out)
  }
}
*/
Neuron.activations = {
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
Neuron.toActivation = function(object) {
  if(typeof object === "string") {
    if(object.toLowerCase() === "sigmoid" || 
       object.toLowerCase() === "sigmoidal" ||
       object.toLowerCase() === "logistic" ||
       object.toLowerCase() === "logistics") {
      return Neuron.activations.SIGMOID
    }
    else if(object.toLowerCase() === "relu") {
      return Neuron.activations.RELU
    }
    else if(object.toLowerCase() === "tanh") {
      return Neuron.activations.TANH
    }
    else if(object.toLowerCase() === "linear" ||
              object.toLowerCase() === "identity") {
      return Neuron.activations.LINEAR
    }
    else {
      throw new Error(object + " is not a valid - or is an unsupported - activation function.\n\n" + 
                      "If you would like to create support for it, please open a up pull request on GitHub for it: https://github.com/liquidcarrot/carrot/pulls\n\n" +
                      "If you would like one of our core contributors to take a look into it, please open up an issue on GitHub describing this function in further detail: https://github.com/liquidcarrot/carrot/issues")
    }
  }
  else if(typeof object === "function") {
    return object
  }
  else{
    throw new Error("Activation function must be a 'function' or a 'string'")
  }
}

// module.exports = Neuron

let i = [new Neuron({
  input: true
}), new Neuron({
  input: true
})]
let h = [new Neuron({
  bias: 0.35
}), new Neuron({
  bias: 0.35
})]
let o = [new Neuron({
  bias: 0.6,
  output: true
})]

// Input to Hidden Layer Weights
let i_h = [new Connection({
  from: i[0],
  to: h[0],
  weight: 0.2
}), new Connection({
  from: i[1],
  to: h[0],
  weight: 0.25
}), new Connection({
  from: i[0],
  to: h[1],
  weight: 0.3
}), new Connection({
  from: i[1],
  to: h[1],
  weight: 0.35
})]
let h_o = [new Connection({
  from: h[0],
  to: o[0],
  weight: 0.4
}),new Connection({
  from: h[1],
  to: o[0],
  weight: 0.45
})]


let activate = (callback) => {
  async.auto({
    "activate_inputs": (callback) => {
      async.map(i, (n, callback) => {
        n.activate(0.35, null, callback)
      }, callback)
    },
    "get_h0_weights": (callback) => {
      callback(null, _.map(_.chunk(i_h, 2)[0], c => c.weight))
    },
    "get_h1_weights": (callback) => {
      callback(null, _.map(_.chunk(i_h, 2)[1], c => c.weight))
    },
    "activate_h0": ["activate_inputs", "get_h0_weights", (r, callback) => {
      console.log(h[0].bias)
      h[0].activate(r.activate_inputs, r.get_h0_weights, callback)
    }],
    "activate_h1": ["activate_inputs", "get_h1_weights", (r, callback) => {
      console.log(h[1].bias)
      h[1].activate(r.activate_inputs, r.get_h1_weights, callback)
    }],
    "get_o0_weights": ["activate_h0", "activate_h1", (r, callback) => {
      callback(null, _.map(_.chunk(h_o, 2)[0], c => c.weight))
    }],
    "activate_o0": ["activate_h0", "activate_h1", "get_o0_weights", (r, callback) => {
      console.log(o[0].bias)
      o[0].activate([r.activate_h0, r.activate_h1], r.get_o0_weights, callback)
    }],
  }, callback)
}

let propagate = (callback) => {
  console.log()
  async.auto({
    "propagate_outputs": (callback) => {
      async.map(o, (n, callback) => {
        n.propagate(0, null, callback)
      }, callback)
    },
    "get_h0_weights": ["propagate_outputs", (r, callback) => {
      console.log("Error: " + (r.propagate_outputs * h[0].out))
      console.log("Learning: " + (0.5 * r.propagate_outputs * h[0].out))
      console.log("Weight: " + h_o[0].weight)
      callback(null, [h_o[0].weight - 0.5 * r.propagate_outputs * h[0].out])
    }],
    "get_h1_weights": ["propagate_outputs", (r, callback) => {
      callback(null, [h_o[1].weight - 0.5 * r.propagate_outputs * h[1].out])
    }],
    "propagate_h0": ["propagate_outputs", "get_h0_weights", (r, callback) => {
      console.log(h[0].bias)
      h[0].propagate(r.propagate_inputs, r.get_h0_weights, callback)
    }],
    "propagate_h1": ["propagate_outputs", "get_h1_weights", (r, callback) => {
      console.log(h[1].bias)
      h[1].propagate(r.propagate_inputs, r.get_h1_weights, callback)
    }],
    "get_o0_weights": ["propagate_h0", "propagate_h1", (r, callback) => {
      callback(null, _.map(_.chunk(h_o, 2)[0], c => c.weight))
    }],
    "propagate_o0": ["propagate_h0", "propagate_h1", "get_o0_weights", (r, callback) => {
      console.log(o[0].bias)
      o[0].propagate([r.propagate_h0, r.propagate_h1], r.get_o0_weights, callback)
    }],
  }, callback)
}

async.auto({
  "activate": (callback) => {
    activate(callback)
  },
  "propagate": (callback) => {
    propagate(callback)
  }
}, (e, r) => {
  console.log(r)
})


/**
let regular = (callback) => {
  let i = [0.05, 0.1]
  let h = [0.593269992, 0.596884378]
  let o = [0.75136507, 0.772928465]
  let b = [0.35, 0.6]
  let w = [0.15, 0.20, 0.25, 0.3, 0.4, 0.45, 0.5, 0.55]
  let nw = [0.15, 0.20, 0.25, 0.3, 0.4, 0.45, 0.5, 0.55]
  let e = [0.01, 0.99]
  let r = 0.5

  let log = {
    inputs: () => {
      return _.map(i, (input, index) => {
        return chalk.cyan("I" + (index + 1) + ": ") + input + "; "
      }).join("")
    },
    biases: () => {
      return _.map(b, (bias, index) => {
        return chalk.yellow("B" + (index + 1) + ": ") + bias + "; "
      }).join("")
    },
    weights: color => {
      return _.map(w, (weight, index) => {
        return chalk.green("W" + (index + 1) + ": ") + weight + "; "
      }).join("")
    },
    new_weights: () => {
      return _.map(nw, (weight, index) => {
        return chalk.yellow("W" + (index + 1) + ": ") + weight + "; "
      }).join("")
    },
    net_error: () => {
      let net_error = 0.5 * _.sum(_.map(e, (e, i) => {
        return Math.pow((e - o[i]), 2)
      }))

      return chalk.red("Net Error: ") + net_error
    },
    all: step => {
      console.log(log.inputs() + log.biases())
      console.log(log.weights())
      console.log(log.new_weights())
      console.log(log.net_error())
    }
  }

  log.all()

  // Output Neuron 1
  let o_o_1_e = o[0] - e[0]
    console.log("\tON1 OE: " + o_o_1_e)
  let o_n_1_e = o[0] * (1 - o[0])
    console.log("\tON1 NE: " + o_n_1_e)
  // Output Neuron 2
  let o_o_2_e = o[1] - e[1]
  let o_n_2_e = o[0] * (1 - o[0])
  // Hidden Neuron 1
  let h_o_1_e = (o_o_1_e * o_n_1_e * w[4]) +  (o_o_2_e * o_n_2_e * w[6]) // Can update w[4], w[6]
    console.log("\tHN1 OE: " + h_o_1_e)
  let h_n_1_e = h[0] * (1 - h[0])
    console.log("\tHN1 NE: " + h_n_1_e)
  // Hidden Neuron 2
  let h_o_2_e = (o_o_1_e * o_n_1_e * w[5]) +  (o_o_2_e * o_n_2_e * w[7]) // Can update w[5], w[7]
    console.log("\tHN2 OE: " + h_o_2_e)
  let h_n_2_e = h[0] * (1 - h[0])
    console.log("\tHN2 NE: " + h_n_2_e)

    // Update Weights 8
    nw[7] = w[7] - r * o_o_2_e * o_n_2_e * w[7]
      console.log("\t\tW8: " + nw[7])
    // Update Weights 7
    nw[6] = w[6] - r * o_o_2_e * o_n_2_e * w[6]
      console.log("\t\tW7: " + nw[6])
    // Update Weights 6
    nw[5] = w[5] - r * o_o_1_e * o_n_1_e * w[5]
      console.log("\t\tW6: " + nw[5])
    // Update Weights 5
    nw[4] = w[4] - r * o_o_1_e * o_n_1_e * w[4]
      console.log("\t\tW5: " + nw[4])

  // Input Neuron 1
  let i_o_1_e = (h_o_1_e * h_n_1_e * w[0]) +  (h_o_2_e * h_n_2_e * w[2]) // Can update w[0], w[2]
    console.log("\tIN1 OE: " + i_o_1_e)
  let i_n_1_e = i[0] * (1 - i[0])
    console.log("\tIN1 NE: " + i_n_1_e)
  // Input Neuron 2
  let i_o_2_e = (h_o_1_e * h_n_1_e * w[1]) +  (h_o_2_e * h_n_2_e * w[3]) // Can update w[1], w[3]
    console.log("\tIN2 OE: " + i_o_2_e)
  let i_n_2_e = i[1] * (1 - i[1])
    console.log("\tIN2 NE: " + i_n_2_e)

    // Update Weights 4
    nw[3] = w[3] - r * h_o_2_e * h_n_2_e * w[3]
      console.log("\t\tW4: " + nw[3])
    // Update Weights 3
    nw[2] = w[2] - r * h_o_2_e * h_n_2_e * w[2]
      console.log("\t\tW3: " + nw[2])
    // Update Weights 2
    nw[1] = w[1] - r * h_o_1_e * h_n_1_e * w[1]
      console.log("\t\tW2: " + nw[1])
    // Update Weights 1
    nw[0] = w[0] - r * h_o_1_e * h_n_1_e * w[0]
      console.log("\t\tW1: " + nw[0])
  
  return callback()
}

let XOR = (callback) => {
  let i = [0.99, 0.01]
  let h = [0, 0]
  let o = [0]
  let b = [0.35, 0.6]
  let w = [0.15, 0.20, 0.25, 0.3, 0.4, 0.45]
  let nw = [0.15, 0.20, 0.25, 0.3, 0.4, 0.45]
  let e = [1]
  let r = 0.5
  
  h[0] = Neuron.activations.SIGMOID(w[0] * i[0] + w[2] * i[1])
  h[1] = Neuron.activations.SIGMOID(w[1] * i[0] + w[3] * i[1])
  
  o[0] = Neuron.activations.SIGMOID(w[4] * h[0] + w[5] * h[1])
  
//   console.log(chalk.green("H1: ") + h[0] + )

  let log = {
    inputs: () => {
      return _.map(i, (input, index) => {
        return chalk.cyan("I" + (index + 1) + ": ") + input + "; "
      }).join("")
    },
    biases: () => {
      return _.map(b, (bias, index) => {
        return chalk.yellow("B" + (index + 1) + ": ") + bias + "; "
      }).join("")
    },
    hidden: () => {
      return _.map(h, (hidden, index) => {
        return chalk.cyan("H" + (index + 1) + ": ") + hidden + "; "
      }).join("")
    },
    outputs: () => {
      return _.map(o, (output, index) => {
        return chalk.yellow("O" + (index + 1) + ": ") + output + "; "
      }).join("")
    },
    expected: () => {
      return _.map(e, (expected, index) => {
        return chalk.green("E" + (index + 1) + ": ") + expected + "; "
      }).join("")
    },
    weights: color => {
      return _.map(w, (weight, index) => {
        return chalk.green("W" + (index + 1) + ": ") + weight + "; "
      }).join("")
    },
    new_weights: () => {
      return _.map(nw, (weight, index) => {
        return chalk.yellow("W" + (index + 1) + ": ") + weight + "; "
      }).join("")
    },
    net_error: () => {
      let net_error = 0.5 * _.sum(_.map(e, (e, i) => {
        return Math.pow((e - o[i]), 2)
      }))

      return chalk.red("Net Error: ") + net_error
    },
    all: step => {
      console.log(log.inputs() + log.biases())
      console.log(log.hidden() + log.outputs() + log.expected())
      console.log(log.weights())
      console.log(log.new_weights())
      console.log(log.net_error())
    }
  }

  log.all()
  
  //====================================
  // BACKPROP ==========================
  //====================================
  
  // Intellimedia -> Photo
  // Trip Group -> Matching + Funds + Scheduling
  

  // Output Neuron 1
  let o_o_1_e = o[0] - e[0]
    console.log("\tON1 OE: " + o_o_1_e)
  let o_n_1_e = o[0] * (1 - o[0])
    console.log("\tON1 NE: " + o_n_1_e)
  // Hidden Neuron 1
  let h_o_1_e = (o_o_1_e * o_n_1_e * w[4]) // Can update w[4]
    console.log("\tHN1 OE: " + h_o_1_e)
  let h_n_1_e = h[0] * (1 - h[0])
    console.log("\tHN1 NE: " + h_n_1_e)
  // Hidden Neuron 2
  let h_o_2_e = (o_o_1_e * o_n_1_e * w[5]) // Can update w[5]
    console.log("\tHN2 OE: " + h_o_2_e)
  let h_n_2_e = h[0] * (1 - h[0])
    console.log("\tHN2 NE: " + h_n_2_e)

    // Update Weights 6
    nw[5] = w[5] - r * o_o_1_e * o_n_1_e * w[5]
      console.log("\t\tW6: " + nw[5])
    // Update Weights 5
    nw[4] = w[4] - r * o_o_1_e * o_n_1_e * w[4]
      console.log("\t\tW5: " + nw[4])

  // Input Neuron 1
  let i_o_1_e = (h_o_1_e * h_n_1_e * w[0]) +  (h_o_2_e * h_n_2_e * w[2]) // Can update w[0], w[2]
    console.log("\tIN1 OE: " + i_o_1_e)
  let i_n_1_e = i[0] * (1 - i[0])
    console.log("\tIN1 NE: " + i_n_1_e)
  // Input Neuron 2
  let i_o_2_e = (h_o_1_e * h_n_1_e * w[1]) +  (h_o_2_e * h_n_2_e * w[3]) // Can update w[1], w[3]
    console.log("\tIN2 OE: " + i_o_2_e)
  let i_n_2_e = i[1] * (1 - i[1])
    console.log("\tIN2 NE: " + i_n_2_e)

    // Update Weights 4
    nw[3] = w[3] - r * h_o_2_e * h_n_2_e * w[3]
      console.log("\t\tW4: " + nw[3])
    // Update Weights 3
    nw[2] = w[2] - r * h_o_2_e * h_n_2_e * w[2]
      console.log("\t\tW3: " + nw[2])
    // Update Weights 2
    nw[1] = w[1] - r * h_o_1_e * h_n_1_e * w[1]
      console.log("\t\tW2: " + nw[1])
    // Update Weights 1
    nw[0] = w[0] - r * h_o_1_e * h_n_1_e * w[0]
      console.log("\t\tW1: " + nw[0])
  
  
  
  h[0] = Neuron.activations.SIGMOID(nw[0] * i[0] + nw[2] * i[1])
  h[1] = Neuron.activations.SIGMOID(nw[1] * i[0] + nw[3] * i[1])
  
  o[0] = Neuron.activations.SIGMOID(nw[4] * h[0] + nw[5] * h[1])
  
  log.all()
  
  return callback()
}


async.series([
  (callback) => {
    regular(callback)
  },
  (callback) => {
    console.log()
    callback()
  },
  (callback) => {
    XOR(callback)
  }
], (error, results) => {
  console.log("Done!")
})
*/