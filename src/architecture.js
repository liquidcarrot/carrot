let _ = require('lodash')

let Network = require('./network');
let Layer = require('./layer');

/**
* Create a perceptron network
*
* @todo Could probably use something like an array's reduce function to be able to accelerate the process of projecting layers to each other.
*/
let Perceptron = function() {
  Network.call(this)
  
  let args = Array.from(arguments) // convert arguments to Array
  
  if(args.length < 3) throw new Error('not enough layers (minimum 3) !!');

  let input = new Layer(args.shift());
  let output = new Layer(args.pop());
  
  let hidden = [];

  let previous = input;
  
  // generate hidden layers
  _.each(args, function(size) {
    let layer = new Layer(size);
    hidden.push(layer);
    previous.project(layer);
    previous = layer;
  })
  previous.project(output);

  // set layers of the neural network
  this.set({ input, hidden, output });
}

let Liquid = function(inputs, hidden, outputs, connections, gates) {
  
}

let LSTM = function() {
  
}

let Hopfield = function(size) {
  
}

module.exports = {
  Perceptron,
  LSTM,
  Liquid,
  Hopfield
}