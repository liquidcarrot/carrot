let _ = require('lodash')

let Neuron = require('./neuron.y');
let Network = require('./network.y');

// represents a connection from one layer to another, and keeps track of its weight and gain
let connections = 0;

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
LayerConnection.uid = function() {
  return connections++;
}

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

  // activates all the neurons in the layer
  this.activate = function(input) {

    var activations = [];

    if (typeof input != 'undefined') {
      if (input.length != this.size)
        throw new Error('INPUT size and LAYER size must be the same to activate!');

      for (var id in this.list) {
        var neuron = this.list[id];
        var activation = neuron.activate(input[id]);
        activations.push(activation);
      }
    } else {
      for (var id in this.list) {
        var neuron = this.list[id];
        var activation = neuron.activate();
        activations.push(activation);
      }
    }
    return activations;
  }

  // propagates the error on all the neurons of the layer
  this.propagate = function(rate, target) {

    if (typeof target != 'undefined') {
      if (target.length != this.size)
        throw new Error('TARGET size and LAYER size must be the same to propagate!');

      for (var id = this.list.length - 1; id >= 0; id--) {
        var neuron = this.list[id];
        neuron.propagate(rate, target[id]);
      }
    } else {
      for (var id = this.list.length - 1; id >= 0; id--) {
        var neuron = this.list[id];
        neuron.propagate(rate);
      }
    }
  }

  /** 
  * Projects this layer to given layer
  *
  * @param {Layer|Network} layer
  * @param {String} [type]
  * @param {number[]} [weights]
  */
  this.project = function(layer, type, weights) {
    if(layer instanceof Network) layer = layer.layers.input;

    if(layer instanceof Layer) {
      if(!this.connected(layer)) return new LayerConnection(this, layer, type, weights);
    } else throw new Error('Invalid argument, you can only project connections to LAYERS and NETWORKS!');
  }

  // gates a connection betwenn two layers
  this.gate = function(connection, type) {

    if (type == Layer.gateType.INPUT) {
      if (connection.to.size != this.size)
        throw new Error('GATER layer and CONNECTION.TO layer must be the same size in order to gate!');

      for (var id in connection.to.list) {
        var neuron = connection.to.list[id];
        var gater = this.list[id];
        for (var input in neuron.connections.inputs) {
          var gated = neuron.connections.inputs[input];
          if (gated.ID in connection.connections)
            gater.gate(gated);
        }
      }
    } else if (type == Layer.gateType.OUTPUT) {
      if (connection.from.size != this.size)
        throw new Error('GATER layer and CONNECTION.FROM layer must be the same size in order to gate!');

      for (var id in connection.from.list) {
        var neuron = connection.from.list[id];
        var gater = this.list[id];
        for (var projected in neuron.connections.projected) {
          var gated = neuron.connections.projected[projected];
          if (gated.ID in connection.connections)
            gater.gate(gated);
        }
      }
    } else if (type == Layer.gateType.ONE_TO_ONE) {
      if (connection.size != this.size)
        throw new Error('The number of GATER UNITS must be the same as the number of CONNECTIONS to gate!');

      for (var id in connection.list) {
        var gater = this.list[id];
        var gated = connection.list[id];
        gater.gate(gated);
      }
    }
    connection.gatedfrom.push({layer: this, type: type});
  }

  // true or false whether the whole layer is self-connected or not
  this.selfconnected = function() {

    for (var id in this.list) {
      var neuron = this.list[id];
      if (!neuron.selfconnected())
        return false;
    }
    return true;
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

  // clears all the neuorns in the layer
  this.clear = function() {
    for (var id in this.list) {
      var neuron = this.list[id];
      neuron.clear();
    }
  }

  /** 
  * Resets all connection weights to/from the layer
  */
  this.reset = function() {
    _.each(this.list, function(neuron) { neuron.reset() })
  }

  /**
  * Returns all layer neurons
  *
  * @returns {Neuron[]}
  */
  this.neurons = function() {
    return this.list;
  }

  // adds a neuron to the layer
  this.add = function(neuron) {
    neuron = neuron || new Neuron();
    this.list.push(neuron);
    this.size++;
  }

  this.set = function(options) {
    options = options || {};

    for (var i in this.list) {
      var neuron = this.list[i];
      if (options.label)
        neuron.label = options.label + '_' + neuron.ID;
      if (options.squash)
        neuron.squash = options.squash;
      if (options.bias)
        neuron.bias = options.bias;
    }
    return this;
  }
}
// types of connections
Layer.connectionType = {
  ALL_TO_ALL: "ALL TO ALL",
  ONE_TO_ONE: "ONE TO ONE",
  ALL_TO_ELSE: "ALL TO ELSE"
}
// types of gates
Layer.gateType = {
  INPUT: "INPUT",
  OUTPUT: "OUTPUT",
  ONE_TO_ONE: "ONE TO ONE"
}

module.exports = Layer