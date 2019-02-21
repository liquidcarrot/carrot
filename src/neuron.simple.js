'use strict'

let math = require('mathjs')
let _ = require('lodash')
let async = require('neo-async')

math.config({
  number: "BigNumber",
})

let Neuron = function(props) {
  let self = this
  
  self.bias = math.bignumber(Math.random() * 2 - 1) // Interval (-1 , 1)
  self.rate = math.bignumber(0.3)
  self.last;
  self.error;
  self.connections = {
    incoming: [],
    outgoing: []
  }
  
  if(props) {
    self.bias = props.bias ? math.bignumber(props.bias) : self.bias
    self.rate = props.rate ? math.bignumber(props.rate) : self.rate
    
    if(props.connections) {
      console.log("\tCO: " + JSON.stringify(self.connections.outgoing))
      
      self.connections.incoming = props.connections.incoming ? props.connections.incoming : self.connections.incoming;
      self.connections.outgoing = props.connections.outgoing ? props.connections.outgoing : self.connections.outgoing;
      
      console.log("\tCO: " + JSON.stringify(self.connections.outgoing))
    }
  }
  
  self.activate = function(input, callback) {
    if(!callback) {
      callback = input
      input = null
    }
    
//       console.log("\tCO: " + JSON.stringify(self.connections.outgoing))
//     console.log("CO: " + JSON.stringify(self.connections.outgoing))
    
    if(_.isEmpty(self.connections.incoming)) {
      self.last = Neuron.functions.SIGMOID(math.bignumber(input))
//       console.log("I -> O: ", Neuron.functions.SIGMOID(math.bignumber(input)).toPrecision())
//       console.log("\tCO: " + JSON.stringify(self.connections.outgoing))
      callback(null, self.last)
    } else {
//       console.log("\tCO: " + JSON.stringify(self.connections.outgoing))
      async.auto({
        "i": function(cb) {
          async.map(self.connections.incoming, function(c, cb) {
            cb(null, math.bignumber(c.neuron.last))
          }, cb)
        },
        "w": function(cb) {
          async.map(self.connections.incoming, function(c, cb) {
            cb(null, math.bignumber(c.weight))
          }, cb)
        },
        "activate": ["i", "w", function(r, cb) {
          cb(null, Neuron.functions.SIGMOID(math.dot(r.i, r.w).add(self.bias)))
        }]
      }, function(e, r) {
        self.last = r.activate
        callback(e, self.last.toPrecision())
      })
//       let inputs = _.map(self.connections.incoming, function(c, i) {
//         return math.bignumber(c.neuron.last)
//       })
//       let weights = _.map(self.connections.incoming, function(c, i) {
//         return math.bignumber(c.weight)
//       })
      
//       self.last = Neuron.functions.SIGMOID(math.dot(inputs, weights).add(self.bias))
//       callback(null, self.last.toPrecision())
    }
  }
  
  self.propagate = function(target, callback) {
    if(!callback) {
      callback = target
      target = null
    }
    
    if(_.isEmpty(self.connections.outgoing)) {
      let error = "(o - t) * (o * (1 - o))"
      self.error = math.eval(error,  {
        o: self.last,
        t: math.bignumber(target)
      })
//       console.log("O -> E: ", self.error.toPrecision())
      callback(null, self.error)
    } else {
      async.auto({
        "f": function(cb) {
          async.map(self.connections.outgoing, function(c, cb) {
            cb(null, math.bignumber(c.neuron.error))
          }, cb)
        },
        "w": function(cb) {
          async.map(self.connections.outgoing, function(c, cb) {
            cb(null, math.bignumber(c.weight))
          }, cb)
        },
        "error": ["f", "w", function(r, cb) {
          self.error = math.eval("dot(f,w) * (o * (1 - o))",  {
            o: self.last,
            f: r.f,
            w: r.w
          })
          cb(null, self.error)
        }],
        "weights": function(cb) {
          async.map(self.connections.outgoing, function(c, cb) {
            c.weight = math.eval("w - u * r * o", {
              w: math.bignumber(c.weight),
              u: math.bignumber(self.rate),
              r: math.bignumber(c.neuron.error),
              o: math.bignumber(self.last)
            })

            c.neuron.connections.incoming[_.findIndex(c.neuron.connections.incoming, function(c) {
              return _.isEqual(c.neuron, self)
            })].weight = c.weight

            cb(null, c)
          }, cb)
        }
      }, function(e, r) {
        callback(e, r.error)
      })
      
      /*
      let feedback = _.map(self.connections.outgoing, function(c, i) {
        return math.bignumber(c.neuron.error)
      })
      let weights = _.map(self.connections.outgoing, function(c, i) {
        return math.bignumber(c.weight)
      })
      
      let error = "dot(f,w) * (o * (1 - o))"
      self.error = math.eval(error,  {
        o: self.last,
        f: feedback,
        w: weights
      })
      
      self.connections.outgoing = _.map(self.connections.outgoing, function(c, i) {
        c.weight = math.eval("w - u * r * o", {
          w: math.bignumber(c.weight),
          u: math.bignumber(self.rate),
          r: math.bignumber(c.neuron.error),
          o: math.bignumber(self.last)
        })
        
        c.neuron.connections.incoming[_.findIndex(c.neuron.connections.incoming, function(c) {
          return _.isEqual(c.neuron, self)
        })].weight = c.weight
        
        return c
      })
      
      callback(null, self.error)
      */
      
      /*
//       console.log("H -> E")
//       console.log("\tC: " + self.connections.outgoing)
      
//       console.log("C: " + JSON.stringify(self.connections.outgoing[0]))
//       console.log("\tF: " + feedback)
//       console.log("\tW: " + weights)

//       self.error = _.sum(_.map(self.connections.outgoing, function(c, i) {
//         return c.neuron.error * c.weight
//       })) * (self.last * (1 - self.last))
//       console.log("\tW: " + weights)
      
//       console.log("tWs: " + _.map(self.connections.outgoing, function(c, i) {
//         return math.bignumber(c.weight)
//       }))
*/
    }
  }
}
Neuron.functions = {
  SIGMOID: function(x, derivative) {
    let func = "1 / (1 + e^(-x))"
    return derivative ? math.derivative(func).eval({ x }) : math.eval(func, { x })
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

let data = [{
  inputs: [-10, -10],
  outputs: [-10]
}, {
  inputs: [-10, 10],
  outputs: [10]
}, {
  inputs: [10, -10],
  outputs: [10]
}, {
  inputs: [10, 10],
  outputs: [-10]
}]

let w1 = math.bignumber(Math.random())
let w2 = math.bignumber(Math.random())
let w3 = math.bignumber(Math.random())
let w4 = math.bignumber(Math.random())
let w5 = math.bignumber(Math.random())
let w6 = math.bignumber(Math.random())

let i0 = new Neuron()
let i1 = new Neuron()
let h0 = new Neuron({
  connections: {
    incoming: [{
      neuron: i0,
      weight: w1
    }, {
      neuron: i1,
      weight: w3
    }]
  }
})
let h1 = new Neuron({
  connections: {
    incoming: [{
      neuron: i0,
      weight: w2
    }, {
      neuron: i1,
      weight: w4
    }]
  }
})
let o0 = new Neuron({
  connections: {
    incoming: [{
      neuron: h0,
      weight: w5
    }, {
      neuron: h1,
      weight: w6
    }]
  }
})

i0.connections.outgoing = [{
  neuron: h0,
  weight: w1
}, {
  neuron: h1,
  weight: w2
}]
i1.connections.outgoing = [{
  neuron: h0,
  weight: w3
}, {
  neuron: h1,
  weight: w4
}]
h0.connections.outgoing = [{
  neuron: o0,
  weight: w5
}]
h1.connections.outgoing = [{
  neuron: o0,
  weight: w6
}]

let i = [i0, i1]
let h = [h0, h1]
let o = [o0]

let activate = (data, callback) => {
  async.seq((callback) => {
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
  })(callback)
}

let propagate = (feedback, callback) => {
  async.seq((callback) => {
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
  })(callback)
}

let train = (times, callback) => {
  async.timesSeries(times, (n, callback) => {
    async.eachSeries(data, (d, callback) => {
      async.series([
        (callback) => activate(d.inputs, callback),
        (callback) => propagate(d.outputs, callback),
        (callback) => {console.log("Trained"); callback()}
      ], callback)
    }, callback)
  }, callback)
}

let test = (callback) => {
  console.log()
  async.map(data, (d, callback) => {
    activate(d.inputs, callback)
  }, callback)
}

async.auto({
  "default": (callback) => test(callback),
  "train": ["default", (results, callback) => train(100, callback)],
  "test": ["train", (results, callback) => test(callback)]
}, (error, results) => {
  console.log(error)
  console.log(results.default)
  console.log(results.test)
})


/**
i0 = new Neuron()
i1 = new Neuron()
h0 = new Neuron({
  connections: {
    incoming: [{
      neuron: i0,
      weight: w1
    }, {
      neuron: i1,
      weight: w3
    }]
  }
})
h1 = new Neuron({
  connections: {
    incoming: [{
      neuron: i0,
      weight: w2
    }, {
      neuron: i1,
      weight: w4
    }]
  }
})
o0 = new Neuron({
  connections: {
    incoming: [{
      neuron: h0,
      weight: w5
    }, {
      neuron: h1,
      weight: w6
    }]
  }
})
*/

// module.exports = Neuron