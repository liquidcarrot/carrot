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
}

module.exports = Network