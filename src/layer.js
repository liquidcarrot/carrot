'use strict'

let _ = require('lodash')

let Neuron = require('./neuron')

/**
* @constructs LayerConnection
* @param {Object} options
* @param {Neuron} options.from
* @param {Neuron} options.to
* @param {number} options.weight
*/
let LayerConnection = function({ from, to, weight = Math.random() * 2 - 1 } = {}) {
  let self = this
  
  _.assignIn(self, { from, to })
  
  self.connections = [];
  self.size = 0;
  
  _.each(self.from.neurons, function(source) {
    _.each(self.to.neurons, function(destination) {
      let connection = source.project(destination, weight)
      self.size = self.connections.push(connection)
    })
  })
  
  from.connections.outgoing.push(self)
  to.connections.incoming.push(self)
}

/**
* @constructs Layer
* @param {number} size
* @param {Object} [options]
* @param {number} [options.bias]
* @param {number} [options.rate=0.3]
* @param {number} [options.weight]
* @param {SquashFunction} [options.squash]
*/
let Layer = function(size = 0, {
  list = [],
  connectedTo = [],
} = {}) {
  _.assignIn(this, { list, connectedTo })
  this.size = size;

  while (size--) {
    let neuron = new Neuron();
    this.list.push(neuron);
  }

  /**
  * @param {number[]} [input]
  * @returns {number}
  */
  self.activate = function(input) {
    return _.map(self.neurons, function(neuron, index) {
      if(!_.isNil(input)) return neuron.activate(input[index]);
      else return neuron.activate();
    })
  }

  /**
  * @param {number[]} [target]
  */
  self.propagate = function(target) {
    _.each(self.neurons, function(neuron, index) {
      if(!_.isNil(target)) neuron.propagate(target[index]);
      else neuron.propagate();
    })
  }

  /**
  * @param {Layer} layer
  * @param {number} [weight]
  * @returns {LayerConnection}
  */
  self.project = function(layer, weight) {
    return new LayerConnection({ from: self, to: layer, weight});
  }
}

module.exports = Layer