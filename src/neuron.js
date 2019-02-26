'use strict'

let _ = require('lodash')

let Connection = require('./connection')

/**
* @constructs Neuron
* @param {Object} [options]
* @param {Object} [connections]
* @param {Connection[]} [connections.incoming]
* @param {Connection[]} [connections.outgoing]
* @param {SquashFunction} [options.squash]
* @param {number} [options.rate=0.3]
* @param {number} [options.bias]
*/
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
  
  /**
  * @memberof Neuron.prototype
  * @function Neuron#activate
  * @param {number} [input]
  * @returns {number}
  */
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

  /**
  * @memberof Neuron.prototype
  * @function Neuron#propagate
  * @param {number} [target]
  */
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

  /**
  * @memberof Neuron.prototype
  * @function Neuron#activate
  * @param {Neuron} neuron
  * @param {number} [weight]
  * @returns {Connection}
  */
  self.project = function(neuron, weight) {
    let connection = new Connection({ from: this, to: neuron, weight })

    self.connections.outgoing.push(connection)
    neuron.connections.incoming.push(connection)

    return connection
  }
  
  
  /**
  * @memberof Neuron.prototype
  * @namespace Neuron#is
  */
  self.is = {}
  
  /**
  * @memberof Neuron.prototype
  * @function Neuron#is.connected
  * @param {Neuron} neuron
  * @returns {'self'|'outgoing'|'incoming'|boolean}
  */
  self.is.connected = function(neuron) {
    if(_.isEqual(self, neuron)) return "self";

    _.each(self.connections, function(type,) {
      _.each(type, function(connection) {
        if(_.isEqual(connection.to, neuron)) return type; 
        else if(_.isEqual(connection.from, neuron)) return type;
      })
    })
    
    return false;
  }
}
/**
* @memberof Neuron
* @namespace Neuron.squash
*/
Neuron.squash = {
  /**
  * @memberof Neuron
  * @function Neuron.squash.LOGISTIC
  * @param {number} x
  * @param {boolean} [derivative]
  * @returns {number}
  */
  LOGISTIC: function(x, derivate) {
    var fx = 1 / (1 + Math.exp(-x));
    if (!derivate)
      return fx;
    return fx * (1 - fx);
  },
  /**
  * @memberof Neuron
  * @function Neuron.squash.TANH
  * @param {number} x
  * @param {boolean} [derivative]
  * @returns {number}
  */
  TANH: function(x, derivate) {
    if (derivate)
      return 1 - Math.pow(Math.tanh(x), 2);
    return Math.tanh(x);
  },
  /**
  * @memberof Neuron
  * @function Neuron.squash.IDENTITY
  * @param {number} x
  * @param {boolean} [derivative]
  * @returns {number}
  */
  IDENTITY: function(x, derivate) {
    return derivate ? 1 : x;
  },
  /**
  * @memberof Neuron
  * @function Neuron.squash.HLIM
  * @param {number} x
  * @param {boolean} [derivative]
  * @returns {number}
  */
  HLIM: function(x, derivate) {
    return derivate ? 1 : x > 0 ? 1 : 0;
  },
  /**
  * @memberof Neuron
  * @function Neuron.squash.RELU
  * @param {number} x
  * @param {boolean} [derivative]
  * @returns {number}
  */
  RELU: function(x, derivate) {
    if (derivate)
      return x > 0 ? 1 : 0;
    return x > 0 ? x : 0;
  }
}

module.exports = Neuron