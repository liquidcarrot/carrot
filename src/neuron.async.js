let _ = require('lodash')
let faker = require('faker')
let chalk = require('chalk')
let async = require('neo-async')
let Promise = require('bluebird')

let connections = 0;

let Connection = function(from, to, weight) {
  if (!from || !to)
    throw new Error("Connection Error: Invalid neurons");

  this.ID = Connection.uid();
  this.from = from;
  this.to = to;
  this.weight = typeof weight == 'undefined' ? Math.random() * 0.2 - 0.1 : weight;
}
Connection.uid = function() {
  return connections++;
}

let neurons = 0;

let Neuron = function() {
  this.connections = {
    incoming: [],
    outgoing: []
  };
  this.error = {
    responsibility: 0,
    projected: 0
  };
  this.activation = 0;
  this.squash = Neuron.squash.LOGISTIC;
  this.bias = Math.random() * 2 - 1;
  

  // activate the neuron
  this._activate = function(input) {
    // activation from enviroment (for input neurons)
    if (typeof input != 'undefined') {
      this.activation = input;
      this.derivative = 0;
      this.bias = 0;
      return this.activation;
    }

    // eq. 15
    let sum = this.bias + _.sum(_.map(this.connections.incoming, function(input) {
      return input.from.activation * input.weight
    }))

    // eq. 16
    this.activation = this.squash(sum);

    // f'(s)
    this.derivative = this.squash(sum, true);

    return this.activation;
  }
  this.activate = function(input, callback) {
    if(!callback) {
      callback = input
      input = undefined
    }
    
    // activation from enviroment (for input neurons)
    if (typeof input != 'undefined') {
      this.activation = input;
      this.derivative = 0;
      this.bias = 0;
      callback(null, this.activation);
    } else {
      async.app
      
      // eq. 15
      let sum = this.bias + _.sum(_.map(this.connections.incoming, function(input) {
        return input.from.activation * input.weight
      }))

      // eq. 16
      this.activation = this.squash(sum);

      // f'(s)
      this.derivative = this.squash(sum, true);

      callback(null, this.activation);
    }
  }

  // back-propagate the error
  this._propagate = function(rate, target) {
    // whether or not this neuron is in the output layer
    if(typeof target != 'undefined') { // output neurons get their error from the enviroment
      this.error.responsibility = this.error.projected = target - this.activation; // Eq. 10
    }
    else { // the rest of the neuron compute their error responsibilities by backpropagation
      // error accumulator
      let error = _.sum(_.map(this.connections.outgoing, function(connection) { // error responsibilities from all the connections projected from this neuron
        let neuron = connection.to;
        // Eq. 21
        return neuron.error.responsibility * connection.weight;
      }))

      // projected error responsibility
      this.error.projected = this.derivative * error;
      
      // error responsibility - Eq. 23
      this.error.responsibility = this.error.projected
    }

    // learning rate
    rate = rate || .1;
    
    let self = this;
    _.each(this.connections.incoming, function(input) {
      // Eq. 24;
      let gradient = self.error.projected * input.from.activation;
      
      input.weight += rate * gradient; // adjust weights - aka learn
    })

    // adjust bias
    this.bias += rate * this.error.responsibility;
  }
  this.propagate = function(rate, target, callback) {
    if(!callback && !target) {
      callback = rate;
      target = undefined;
      rate = undefined;
    }
    
    // whether or not this neuron is in the output layer
    if(typeof target != 'undefined') { // output neurons get their error from the enviroment
      this.error.responsibility = this.error.projected = target - this.activation; // Eq. 10
    }
    else { // the rest of the neuron compute their error responsibilities by backpropagation
      // error accumulator
      let error = _.sum(_.map(this.connections.outgoing, function(connection) { // error responsibilities from all the connections projected from this neuron
        let neuron = connection.to;
        // Eq. 21
        return neuron.error.responsibility * connection.weight;
      }))

      // projected error responsibility
      this.error.projected = this.derivative * error;
      
      // error responsibility - Eq. 23
      this.error.responsibility = this.error.projected
    }

    // learning rate
    rate = rate || .1;
    
    let self = this;
    _.each(this.connections.incoming, function(input) {
      // Eq. 24;
      let gradient = self.error.projected * input.from.activation;
      
      input.weight += rate * gradient; // adjust weights - aka learn
    })

    // adjust bias
    this.bias += rate * this.error.responsibility;
    
    callback()
  }

  this._project = function(neuron, weight) {
    // create a new connection
    var connection = new Connection(this, neuron, weight);

    // reference all the connections and traces
    this.connections.outgoing.push(connection);
    neuron.connections.incoming.push(connection);

    return connection;
  }
  this.project = function(neuron, weight, callback) {
    if(!callback) {
      callback = weight;
      weight = null;
    }
    
    // create a new connection
    var connection = new Connection(this, neuron, weight);

    // reference all the connections and traces
    this.connections.outgoing.push(connection);
    neuron.connections.incoming.push(connection);

    callback(null, connection);
  }
}
Neuron.squash = {
  // eq. 5 & 5'
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

// train the network
var learningRate = .3;

async.seq(
  (callback) => i0.project(h0, callback),
  (results, callback) => i0.project(h1, callback),
  (results, callback) => i1.project(h0, callback),
  (results, callback) => i1.project(h1, callback),
  (results, callback) => h0.project(o0, callback),
  (results, callback) => h1.project(o0, callback), 
  (results, callback) => {
    async.times(20000, function(index, callback) {
      async.seq(
        // 0,0 => 0
        (callback) => i0.activate(0, callback),
        (results, callback) => i1.activate(0, callback),
        (results, callback) => h0.activate(callback),
        (results, callback) => h1.activate(callback),
        (results, callback) => o0.activate(callback),
        (results, callback) => o0.propagate(learningRate, 0, callback),
        (callback) => h1.propagate(callback),
        (callback) => h0.propagate(callback),
        (callback) => i1.propagate(callback),
        (callback) => i0.propagate(callback),

        // 0,1 => 1
        (callback) => i0.activate(0, callback),
        (results, callback) => i1.activate(1, callback),
        (results, callback) => h0.activate(callback),
        (results, callback) => h1.activate(callback),
        (results, callback) => o0.activate(callback),
        (results, callback) => o0.propagate(learningRate, 1, callback),
        (callback) => h1.propagate(callback),
        (callback) => h0.propagate(callback),
        (callback) => i1.propagate(callback),
        (callback) => i0.propagate(callback),

        // 1,0 => 1
        (callback) => i0.activate(1, callback),
        (results, callback) => i1.activate(0, callback),
        (results, callback) => h0.activate(callback),
        (results, callback) => h1.activate(callback),
        (results, callback) => o0.activate(callback),
        (results, callback) => o0.propagate(learningRate, 1, callback),
        (callback) => h1.propagate(callback),
        (callback) => h0.propagate(callback),
        (callback) => i1.propagate(callback),
        (callback) => i0.propagate(callback),

        // 1,1 => 0
        (callback) => i0.activate(1, callback),
        (results, callback) => i1.activate(1, callback),
        (results, callback) => h0.activate(callback),
        (results, callback) => h1.activate(callback),
        (results, callback) => o0.activate(callback),
        (results, callback) => o0.propagate(learningRate, 0, callback),
        (callback) => h1.propagate(callback),
        (callback) => h0.propagate(callback),
        (callback) => i1.propagate(callback),
        (callback) => i0.propagate(callback)
      )(callback)
    }, callback)
},
  (results, callback) => {
  // test the network
  async.seq(
    // 0,0 => 0
    (callback) => i0.activate(0, callback),
    (results, callback) => i1.activate(0, callback),
    (results, callback) => h0.activate(callback),
    (results, callback) => h1.activate(callback),
    (results, callback) => o0.activate((error, results) => { console.log(results); callback(error, results)}),  // [0.015020775950893527]

    // 0,1 => 1
    (results, callback) => i0.activate(0, callback),
    (results, callback) => i1.activate(1, callback),
    (results, callback) => h0.activate(callback),
    (results, callback) => h1.activate(callback),
    (results, callback) => o0.activate((error, results) => { console.log(results); callback(error, results)}), // [0.9815816381088985]

    // 1,0 => 1
    (results, callback) => i0.activate(1, callback),
    (results, callback) => i1.activate(0, callback),
    (results, callback) => h0.activate(callback),
    (results, callback) => h1.activate(callback),
    (results, callback) => o0.activate((error, results) => { console.log(results); callback(error, results)}),  // [0.9871822457132193]

    // 1,1 => 0
    (results, callback) => i0.activate(1, callback),
    (results, callback) => i1.activate(1, callback),
    (results, callback) => h0.activate(callback),
    (results, callback) => h1.activate(callback),
    (results, callback) => o0.activate((error, results) => { console.log(results); callback(error, results)}), // [0.012950087641929467]
  )(callback)
})( function(error, results) {
  console.log("Done!")
})



