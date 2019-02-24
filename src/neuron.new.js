'use strict'

let _ = require('lodash')
let faker = require('faker')
let chalk = require('chalk')
let async = require('neo-async')
let Promise = require('bluebird')

let math = require('mathjs')

math.config({
  precision: 128
})

let random = {
  scale: () => Math.random() * 2 - 1,
  sign: () => Math.random() < 0.5 ? -1 : 1,
  number: () => random.sign() * faker.random.number()
}

let Connection = require('./connection')

let Neuron = function(options) {
  let self = this

  self.bias = math.bignumber(options ? (options.bias || Neuron.random.bias()) : Neuron.random.bias())
  self.learning_rate = math.bignumber(options ? (options.learning_rate || Neuron.default.learning_rate) : Neuron.default.learning_rate)
  
  self.activation = options ? (options.activation || Neuron.default.activation) : Neuron.default.activation
  self.cost = options ? (options.cost || Neuron.default.cost) : Neuron.default.cost
  
  self.connections = {
    incoming: [],
    outgoing: []
  }
  
  self.outputs = []
  self.errors = []
  
  if(options) {
    if(options.connections) {
      if(options.connections.incoming) {
        _.each(options.connections.incoming, function(neuron, index) {
          let connection = new Connection({
            from: neuron,
            to: self,
          })

          neuron.connections.outgoing.push(connection)
          self.connections.incoming.push(connection)
        })
      }
      if(options.connections.outgoing) {
        _.each(options.connections.incoming, function(neuron, index) {
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
  
  self.activate = function(input, callback) {
    if(!callback) {
      callback = input
      input = null
    }
    
    let output;
    
    if(!_.isNil(input)) {
      output = math.bignumber(input)
    } else {
      let weights = _.map(self.connections.incoming, function(connection) {
        return math.bignumber(connection.weight)
      })
      let inputs = _.map(self.connections.incoming, function(connection) {
        return math.bignumber(_.last(connection.from.outputs))
      })
      
      output = math.bignumber(self.activation(Neuron.functions.SUM(inputs, weights, self.bias)))
    }
    
    self.outputs = _.concat(self.outputs, output)
    callback(null, output)
  }
  
  self.propagate = function(target, callback) {
    if(!callback) {
      callback = target
      target = null
    }
    
    let error;
    
    if(!_.isNil(target)) {
      error = self.cost(_.last(self.outputs), math.bignumber(target)) * self.activation(_.last(self.outputs), true)
    } else {
      let weights = _.map(self.connections.outgoing, function(connection) {
        return math.bignumber(connection.weight)
      })
      let feedback = _.map(self.connections.outgoing, function(connection) {
        return math.bignumber(_.last(connection.to.errors))
      })
      
      error = math.bignumber(Neuron.functions.SUM(feedback, weights) * self.activation(_.last(self.outputs), true))
      
      // Update weights here
      
      let new_weights = _.times(self.connections.outgoing.length, function(index) {
        self.connections.outgoing[index].weight = self.connections.outgoing[index].weight - self.learning_rate * _.last(self.outputs) * Neuron.functions.SUM(feedback, weights)
        return self.connections.outgoing[index].weight
      })
      
    }
    
    self.errors = _.concat(self.errors, error)
    callback(null, error)
  }
}

Neuron.functions = {
  SUM: function(x, w, b) {
    b = math.bignumber(b ? b : 0)
    
    return math.bignumber(math.eval("dot(x, w) + b", { x, w, b }))
  }
}
Neuron.activations = {
  SIGMOID: function(x, dx) {
    let func = "1 / (1 + bignumber(e)^(-x))"
    
    return math.bignumber(dx ? math.derivative(func, "x").eval({ x: math.bignumber(x) }) : math.eval(func, { x: math.bignumber(x) }))
  }
}
Neuron.costs = {
  MSE: function(x, t) {
    return math.bignumber(math.eval("x - t", { x, t }))
  }
}
Neuron.default = {
  learning_rate: math.bignumber(0.3),
  activation: Neuron.activations.SIGMOID,
  cost: Neuron.costs.MSE
}
Neuron.random = {
  bias: function() {
    return math.bignumber(Math.random() * 2 - 1)
  },
  weight: function() {
    return math.bignumber((Math.random() < 0.5 ? -1 : 1) * faker.random.number())
  }
}

let data = [{
  inputs: [0, 0],
  outputs: [1, 0] // ["should be false", "should be true"]
}, {
  inputs: [0, 1],
  outputs: [0, 1]
}, {
  inputs: [1, 0],
  outputs: [0, 1]
}, {
  inputs: [1, 1],
  outputs: [1, 0]
}]

let i = [new Neuron(), new Neuron()]
let h = [new Neuron({
  connections: {
    incoming: i
  }
}), new Neuron({
  connections: {
    incoming: i
  }
})]
let o = [new Neuron({
  connections: {
    incoming: h
  }
}), new Neuron({
  connections: {
    incoming: h
  }
})]

let activate = async.seq((data, callback) => {
  async.times(i.length, (index, callback) => {
    i[index].activate(data[index], callback)
  }, callback)
}, (a, callback) => {
  async.times(h.length, (index, callback) => {
    h[index].activate(callback)
  }, callback)
}, (a, callback) => {
  async.times(o.length, (index, callback) => {
    o[index].activate(callback)
  }, callback)
})

let propagate = async.seq((feedback, callback) => {
  async.times(o.length, (index, callback) => {
    o[index].propagate(feedback[index], callback)
  }, callback)
}, (a, callback) => {
  async.times(h.length, (index, callback) => {
    h[index].propagate(callback)
  }, callback)
}, (a, callback) => {
  async.times(i.length, (index, callback) => {
    i[index].propagate(callback)
  }, callback)
})

let train = (times, callback) => {
  async.timesSeries(times, (n, callback) => {
    async.eachSeries(data, (d, callback) => {
      async.series([
        (callback) => activate(d.inputs, callback),
        (callback) => propagate(d.outputs, callback),
        (callback) => {
          console.log("Trained"); 
          callback()
        },
        (callback) => {
          console.log(h[0].connections.incoming[0].weight + " " + h[0].connections.incoming[1].weight + " " 
                      + h[1].connections.incoming[0].weight + " " + h[1].connections.incoming[1].weight)
//           console.log(_.last(o[0].outputs).s + " " + _.last(o[0].outputs).e + " " + _.last(o[0].outputs).d)
//           console.log(_.last(o[1].outputs).s + " " + _.last(o[1].outputs).e + " " + _.last(o[1].outputs).d)
          console.log()
          callback()
        },
      ], callback)
    }, callback)
  }, callback)
}

let test = (callback) => {
  console.log()
  async.map(data, (d, callback) => {
    activate(d.inputs, (e, r) => callback(e, r.toString()))
  }, callback)
}

async.auto({
  "default": (callback) => test(callback),
  "train": ["default", (results, callback) => train(10, callback)],
  "test": ["train", (results, callback) => test(callback)]
}, (error, results) => {
  console.log(error)
  console.log(results.default)
  console.log(results.test)
})

















