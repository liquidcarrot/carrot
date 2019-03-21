let _ = require('lodash')

let Network = require('./network.y');
let Layer = require('./layer.y');

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
  Network.call(this)
  
    // create layers
    var inputLayer = new Layer(inputs);
    var hiddenLayer = new Layer(hidden);
    var outputLayer = new Layer(outputs);

    // make connections and gates randomly among the neurons
    var neurons = hiddenLayer.neurons();
    var connectionList = [];

    for (var i = 0; i < connections; i++) {
      // connect two random neurons
      var from = Math.random() * neurons.length | 0;
      var to = Math.random() * neurons.length | 0;
      var connection = neurons[from].project(neurons[to]);
      connectionList.push(connection);
    }

    for (var j = 0; j < gates; j++) {
      // pick a random gater neuron
      var gater = Math.random() * neurons.length | 0;
      // pick a random connection to gate
      var connection = Math.random() * connectionList.length | 0;
      // let the gater gate the connection
      neurons[gater].gate(connectionList[connection]);
    }

    // connect the layers
    inputLayer.project(hiddenLayer);
    hiddenLayer.project(outputLayer);

    // set the layers of the network
    this.set({
      input: inputLayer,
      hidden: [hiddenLayer],
      output: outputLayer
    });
}

let LSTM = function() {
  Network.call(this)
  
  var args = Array.prototype.slice.call(arguments); // convert arguments to array
  if (args.length < 3)
    throw new Error("not enough layers (minimum 3) !!");

  var last = args.pop();
  var option = {
    peepholes: Layer.connectionType.ALL_TO_ALL,
    hiddenToHidden: false,
    outputToHidden: false,
    outputToGates: false,
    inputToOutput: true,
  };
  if (typeof last != 'number') {
    var outputs = args.pop();
    if (last.hasOwnProperty('peepholes'))
      option.peepholes = last.peepholes;
    if (last.hasOwnProperty('hiddenToHidden'))
      option.hiddenToHidden = last.hiddenToHidden;
    if (last.hasOwnProperty('outputToHidden'))
      option.outputToHidden = last.outputToHidden;
    if (last.hasOwnProperty('outputToGates'))
      option.outputToGates = last.outputToGates;
    if (last.hasOwnProperty('inputToOutput'))
      option.inputToOutput = last.inputToOutput;
  } else {
    var outputs = last;
  }

  var inputs = args.shift();
  var layers = args;

  var inputLayer = new Layer(inputs);
  var hiddenLayers = [];
  var outputLayer = new Layer(outputs);

  var previous = null;

  // generate layers
  for (var i = 0; i < layers.length; i++) {
    // generate memory blocks (memory cell and respective gates)
    var size = layers[i];

    var inputGate = new Layer(size).set({
      bias: 1
    });
    var forgetGate = new Layer(size).set({
      bias: 1
    });
    var memoryCell = new Layer(size);
    var outputGate = new Layer(size).set({
      bias: 1
    });

    hiddenLayers.push(inputGate);
    hiddenLayers.push(forgetGate);
    hiddenLayers.push(memoryCell);
    hiddenLayers.push(outputGate);

    // connections from input layer
    var input = inputLayer.project(memoryCell);
    inputLayer.project(inputGate);
    inputLayer.project(forgetGate);
    inputLayer.project(outputGate);

    // connections from previous memory-block layer to this one
    if (previous != null) {
      var cell = previous.project(memoryCell);
      previous.project(inputGate);
      previous.project(forgetGate);
      previous.project(outputGate);
    }

    // connections from memory cell
    var output = memoryCell.project(outputLayer);

    // self-connection
    var self = memoryCell.project(memoryCell);

    // hidden to hidden recurrent connection
    if (option.hiddenToHidden)
      memoryCell.project(memoryCell, Layer.connectionType.ALL_TO_ELSE);

    // out to hidden recurrent connection
    if (option.outputToHidden)
      outputLayer.project(memoryCell);

    // out to gates recurrent connection
    if (option.outputToGates) {
      outputLayer.project(inputGate);
      outputLayer.project(outputGate);
      outputLayer.project(forgetGate);
    }

    // peepholes
    memoryCell.project(inputGate, option.peepholes);
    memoryCell.project(forgetGate, option.peepholes);
    memoryCell.project(outputGate, option.peepholes);

    // gates
    inputGate.gate(input, Layer.gateType.INPUT);
    forgetGate.gate(self, Layer.gateType.ONE_TO_ONE);
    outputGate.gate(output, Layer.gateType.OUTPUT);
    if (previous != null)
      inputGate.gate(cell, Layer.gateType.INPUT);

    previous = memoryCell;
  }

  // input to output direct connection
  if (option.inputToOutput)
    inputLayer.project(outputLayer);

  // set the layers of the neural network
  this.set({
    input: inputLayer,
    hidden: hiddenLayers,
    output: outputLayer
  });
}

let Hopfield = function(size) { 
//   constructor(size) {
//     super();
  Network.call(this)
  
    var inputLayer = new Layer(size);
    var outputLayer = new Layer(size);

    inputLayer.project(outputLayer, Layer.connectionType.ALL_TO_ALL);

    this.set({
      input: inputLayer,
      hidden: [],
      output: outputLayer
    });

    this.trainer = new Trainer(this);
//   }

  this.learn = function(patterns) {
    var set = [];
    for (var p in patterns)
      set.push({
        input: patterns[p],
        output: patterns[p]
      });

    return this.trainer.train(set, {
      iterations: 500000,
      error: .00005,
      rate: 1
    });
  }

  this.feed = function(pattern) {
    var output = this.activate(pattern);

    var pattern = [];
    for (var i in output)
      pattern[i] = output[i] > .5 ? 1 : 0;

    return pattern;
  }
}

module.exports = {
  Perceptron,
  LSTM,
  Liquid,
  Hopfield
}