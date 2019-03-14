let _ = require('lodash')
let Neuron = require('./neuron');
let Layer = require('./layer');
let Trainer = require('./trainer');

let Network = function({
  input = null,
  hidden = [],
  output = null
} = {}) {
  this.layers = { input, hidden, output };
  this.optimized = null;
  
  /** 
  * Feed-activate activate the network
  *
  * @param {number[]} input
  * @returns {number[]}
  */
  this.activate = function(input) {
    if(this.optimized === false) {
      this.layers.input.activate(input);
      _.each(this.layers.hidden, function(layer) { layer.activate() })
      return this.layers.output.activate();
    }
    else {
      if(this.optimized == null) this.optimize();
      return this.optimized.activate(input);
    }
  }
  
  /**
  * Returns all the neurons in the network
  *
  * @returns {Neuron[]}
  */
  this.neurons = function() {
    let neurons = [];

    _.each(this.layers.input.neurons(), function(neuron) {
      neurons.push({ neuron, layer: 'input' })
    })
    
    _.each(this.layers.hidden, function(layer, index) {
      _.each(layer.neurons(), function(neuron) {
        neurons.push({ neuron, layer: index });
      })
    })
    
    _.each(this.layers.output.neurons(), function(neuron) {
      neurons.push({ neuron, layer: 'output' })
    })

    return neurons;
  }

  /**
  * Returns number of inputs of the network
  *
  * @returns {number}
  */
  this.inputs = function() {
    return this.layers.input.size;
  }

  /**
  * Returns number of outputs of hte network
  *
  * @returns {number}
  */
  this.outputs = function() {
    return this.layers.output.size;
  }

  /**
  * Sets the layers of the network
  */
  this.set = function({
    input = null,
    hidden = [],
    output = null
  } = {}) {
    this.layers = { input, hidden, output };
    if(this.optimized) this.optimized.reset();
  }

  /**
  * Restores network values (de-optimizes) - done to edit network
  */
  this.restore = function() {
    if(!this.optimized) return;

    let optimized = this.optimized;

    let getValue = function () {
      let args = Array.prototype.slice.call(arguments);

      let unit = args.shift();
      let prop = args.pop();

      let id = prop + '_';
      for(let property in args) id += args[property] + '_';
      id += unit.ID;

      let memory = optimized.memory;
      let variables = optimized.data.variables;

      if(id in variables) return memory[variables[id].id];
      return 0;
    }

    let list = this.neurons();

    // link id's to positions in the array
    _.each(list, function(neuron) {
      while(neuron.neuron) neuron = neuron.neuron;

      neuron.state = getValue(neuron, 'state');
      neuron.old = getValue(neuron, 'old');
      neuron.activation = getValue(neuron, 'activation');
      neuron.bias = getValue(neuron, 'bias');

      for (let input in neuron.trace.elegibility)
        neuron.trace.elegibility[input] = getValue(neuron, 'trace', 'elegibility', input);

      for (let gated in neuron.trace.extended)
        for (let input in neuron.trace.extended[gated])
          neuron.trace.extended[gated][input] = getValue(neuron, 'trace', 'extended', gated, input);

      // get connections
      _.each(neuron.connections.projected, function(connection) {
        connection.weight = getValue(connection, 'weight');
        connection.gain = getValue(connection, 'gain');
      })
    })
  }
}

module.exports = Network