'use strict'

let _ = require('lodash')

let Neuron = require('./neuron')

/**
* @param {Neuron} from
* @param {Neuron} to
* @param {string} type
* @param {number} weight
* @param {Object} options
* @param {number} options.ID
* @param {Object} options.connections
* @param {Neuron[]} options.list
* @param {number} options.size
* @param {Neuron[]} options.gatedfrom
*/
let LayerConnection = function(from, to, type = Layer.connectionType.ALL_TO_ALL, weights, {
  ID = LayerConnection.uid(),
  connections = {},
  list = [],
  size = 0,
  gatedfrom = [],
} = {}) {
  let self = this;
  
  _.assignIn(self, { ID, from, to, type, connections, list, size, gatedfrom });
  
  self.selfconnection = to == from;

  if(from == to) self.type = Layer.connectionType.ONE_TO_ONE;

  if(self.type == Layer.connectionType.ALL_TO_ALL || self.type == Layer.connectionType.ALL_TO_ELSE) {
    _.each(self.from.list, function(from) {
      _.each(self.to.list, function(to) {
        if(self.type == Layer.connectionType.ALL_TO_ELSE && from == to) return;

        let connection = from.project(to, weights);

        self.connections[connection.ID] = connection;
        self.size = self.list.push(connection);
      })
    })
  } else if(this.type == Layer.connectionType.ONE_TO_ONE) {
    _.each(self.from.list, function(from, index) {
      let connection = from.project(self.to.list[index], weights);
      
      this.connections[connection.ID] = connection;
      this.size = this.list.push(connection);
    })
  }

  from.connectedTo.push(this);
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
  
  /** 
  * Return true iff this layer is connected to given layer
  */
  this.connected = function(layer) {
    // Check if ALL to ALL connection
    let connections = 0;
    _.each(this.list, function(from) {
      _.each(layer.list, function(to) {
        let connected = from.connected(to);
        if(connected.type == 'projected') connections++;
      })
    })
    if(connections == this.size * layer.size) return Layer.connectionType.ALL_TO_ALL;

    // Check if ONE to ONE connection
    connections = 0;
    _.each(this.list, function(from, index) {
      let connected = from.connected(layer.list[index]);
      if(connected.type == 'projected') connections++;
    })
    if(connections == this.size) return Layer.connectionType.ONE_TO_ONE;
  }
}

module.exports = Layer