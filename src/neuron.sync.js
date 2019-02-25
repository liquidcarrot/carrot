let _ = require('lodash')
let faker = require('faker')
let chalk = require('chalk')
let async = require('neo-async')
let Promise = require('bluebird')

let connections = 0;

let Connection = function({ from, to, weight = Math.random() * 2 - 1 } = {}) {
  _.assignIn(this, { from, to, weight })
}

let Neuron = function({
  connections = {
    incoming: [],
    outgoing: []
  },
  error = 0,
  activation = 0,
  derivative = 0,
  rate = 0.3,
  bias = Math.random() * 2 - 1,
  squash = Neuron.squash.LOGISTIC
} = {}) {
  _.assignIn(this, { connections, error, activation, derivative, rate, bias, squash });
  
  let self = this;
  
  self.activate = function(input) {
    if(!_.isNil(input)) {
      self.activation = input;
      self.bias = 0;
    } else {
      let sum = self.bias + _.sum(_.map(self.connections.incoming, function(input) {
        return input.from.activation * input.weight
      }));
      [self.activation, self.derivative] = [self.squash(sum), self.squash(sum, true)];
    }
    return self.activation;
  }

  self.propagate = function(target) {
    if(!_.isNil(target)) self.error = target - self.activation;
    else self.error = self.derivative * _.sum(_.map(self.connections.outgoing, function(connection) {
      return connection.to.error * connection.weight;
    }));
    
    _.each(self.connections.incoming, function(input) {
      input.weight += self.rate * self.error * input.from.activation; 
    })

    self.bias += self.rate * self.error
  }

  self.project = function(neuron, weight) {
    let connection = new Connection({ from: this, to: neuron, weight })

    self.connections.outgoing.push(connection)
    neuron.connections.incoming.push(connection)

    return connection
  }
}

// let Neuron = function() {
//   this.connections = {
//     incoming: [],
//     outgoing: []
//   };
//   this.error = {
//     responsibility: 0,
//     projected: 0
//   };
//   this.activation = 0;
//   this.squash = Neuron.squash.LOGISTIC;
//   this.bias = Math.random() * 2 - 1;
  

//   // activate the neuron
//   this.activate = function(input) {
//     // activation from enviroment (for input neurons)
//     if (typeof input != 'undefined') {
//       this.activation = input;
//       this.derivative = 0;
//       this.bias = 0;
//       return this.activation;
//     }

//     // eq. 15
//     let sum = this.bias + _.sum(_.map(this.connections.incoming, function(input) {
//       return input.from.activation * input.weight
//     }))

//     // eq. 16
//     this.activation = this.squash(sum);

//     // f'(s)
//     this.derivative = this.squash(sum, true);

//     return this.activation;
//   }

//   // back-propagate the error
//   this.propagate = function(rate, target) {
//     // whether or not this neuron is in the output layer
//     if(typeof target != 'undefined') { // output neurons get their error from the enviroment
//       this.error.responsibility = this.error.projected = target - this.activation; // Eq. 10
//     }
//     else { // the rest of the neuron compute their error responsibilities by backpropagation
//       // error accumulator
//       let error = _.sum(_.map(this.connections.outgoing, function(connection) { // error responsibilities from all the connections projected from this neuron
//         let neuron = connection.to;
//         // Eq. 21
//         return neuron.error.responsibility * connection.weight;
//       }))

//       // projected error responsibility
//       this.error.projected = this.derivative * error;
      
//       // error responsibility - Eq. 23
//       this.error.responsibility = this.error.projected
//     }

//     // learning rate
//     rate = rate || .1;
    
//     let self = this;
//     _.each(this.connections.incoming, function(input) {
//       // Eq. 24;
//       let gradient = self.error.projected * input.from.activation;
      
//       input.weight += rate * gradient; // adjust weights - aka learn
//     })

//     // adjust bias
//     this.bias += rate * this.error.responsibility;
//   }

//   this.project = function(neuron, weight) {
//     // create a new connection
//     var connection = new Connection({
//       from: this,
//       to: neuron,
//       weight
//     });

//     // reference all the connections and traces
//     this.connections.outgoing.push(connection);
//     neuron.connections.incoming.push(connection);

//     return connection;
//   }
// }
Neuron.squash = {
  LOGISTIC: function(x, derivate) {
    var fx = 1 / (1 + Math.exp(-x));
    if (!derivate)
      return fx;
    return fx * (1 - fx);
  },
  TANH: function(x, derivate) {
    if (derivate)
      return 1 - Math.pow(Math.tanh(x), 2);
    return Math.tanh(x);
  },
  IDENTITY: function(x, derivate) {
    return derivate ? 1 : x;
  },
  HLIM: function(x, derivate) {
    return derivate ? 1 : x > 0 ? 1 : 0;
  },
  RELU: function(x, derivate) {
    if (derivate)
      return x > 0 ? 1 : 0;
    return x > 0 ? x : 0;
  }
}

let i0 = new Neuron()
let i1 = new Neuron()
let h0 = new Neuron()
let h1 = new Neuron()
let o0 = new Neuron()

i0.project(h0)
i0.project(h1)
i1.project(h0)
i1.project(h1)
h0.project(o0)
h1.project(o0)

// train the network
var learningRate = .3;

for (var index = 0; index < 20000; index++) {
  // 0,0 => 0
  i0.activate(0)
  i1.activate(0)
  h0.activate()
  h1.activate()
  o0.activate()
  o0.propagate(0)
  h1.propagate()
  h0.propagate()
  i1.propagate()
  i0.propagate()

  // 0,1 => 1
  i0.activate(0)
  i1.activate(1)
  h0.activate()
  h1.activate()
  o0.activate()
  o0.propagate(1)
  h1.propagate()
  h0.propagate()
  i1.propagate()
  i0.propagate()

  // 1,0 => 1
  i0.activate(1)
  i1.activate(0)
  h0.activate()
  h1.activate()
  o0.activate()
  o0.propagate(1)
  h1.propagate()
  h0.propagate()
  i1.propagate()
  i0.propagate()

  // 1,1 => 0
  i0.activate(1)
  i1.activate(1)
  h0.activate()
  h1.activate()
  o0.activate()
  o0.propagate(0)
  h1.propagate()
  h0.propagate()
  i1.propagate()
  i0.propagate()
}


// test the network
i0.activate(0)
i1.activate(0)
h0.activate()
h1.activate()
console.log(o0.activate()); // [0.015020775950893527]

i0.activate(0)
i1.activate(1)
h0.activate()
h1.activate()
console.log(o0.activate()); // [0.9815816381088985]

i0.activate(1)
i1.activate(0)
h0.activate()
h1.activate()
console.log(o0.activate()); // [0.9871822457132193]

i0.activate(1)
i1.activate(1)
h0.activate()
h1.activate()
console.log(o0.activate()); // [0.012950087641929467]