const methods = require('../methods/methods');
const Network = require('./network');
const Group = require('./group');
const Layer = require('./layer');
const Node = require('./node');
const _ = require("lodash");
const assert = require("assert")

/**
 *
 * Preconfigured neural networks!
 *
 * Ready to be built with simple one line functions.
 *
 * @namespace
*/
const architect = {
  /**
  * Constructs a network from a given array of connected nodes
  *
  * @param {Group[]|Layer[]|Node[]} list A list of Groups, Layers, and Nodes to combine into a Network
  *
  * @example <caption>A Network built with Nodes</caption>
  * let { architect } = require("@liquid-carrot/carrot");
  *
  * var A = new Node();
  * var B = new Node();
  * var C = new Node();
  * var D = new Node();
  *
  * // Create connections
  * A.connect(B);
  * A.connect(C);
  * B.connect(D);
  * C.connect(D);
  *
  * // Construct a network
  * var network = architect.Construct([A, B, C, D]);
  *
  * @example <caption>A Network built with Groups</caption>
  * let { architect } = require("@liquid-carrot/carrot");
  *
  * var A = new Group(4);
  * var B = new Group(2);
  * var C = new Group(6);
  *
  * // Create connections between the groups
  * A.connect(B);
  * A.connect(C);
  * B.connect(C);
  *
  * // Construct a square-looking network
  * var network = architect.Construct([A, B, C, D]);
  *
  * @returns {Network}
  */
  Construct: function (list) {
    // Create a network
    var network = new Network(0, 0);

    // Transform all groups into nodes
    var nodes = [];

    var i;
    for (i = 0; i < list.length; i++) {
      let j;
      if (list[i] instanceof Group) {
        for (j = 0; j < list[i].nodes.length; j++) {
          nodes.push(list[i].nodes[j]);
        }
      } else if (list[i] instanceof Layer) {
        for (j = 0; j < list[i].nodes.length; j++) {
          for (var k = 0; k < list[i].nodes[j].nodes.length; k++) {
            nodes.push(list[i].nodes[j].nodes[k]);
          }
        }
      } else if (list[i] instanceof Node) {
        nodes.push(list[i]);
      }
    }

    // check if there are input or output nodes, bc otherwise must guess based on number of outputs
    let found_output_nodes = _.reduce(nodes, (total_found, node) =>
      total_found + (node.type === `output`), 0);
    let found_input_nodes = _.reduce(nodes, (total_found, node) =>
      total_found + (node.type === `input`), 0);

    // Determine input and output nodes
    var inputs = [];
    var outputs = [];
    for (i = nodes.length - 1; i >= 0; i--) {
      if (nodes[i].type === 'output' || (!found_output_nodes && nodes[i].connections.out.length + nodes[i].connections.gated.length === 0)) {
        nodes[i].type = 'output';
        network.output++;
        outputs.push(nodes[i]);
        nodes.splice(i, 1);
      } else if (nodes[i].type === 'input' || (!found_input_nodes && !nodes[i].connections.in.length)) {
        nodes[i].type = 'input';
        network.input++;
        inputs.push(nodes[i]);
        nodes.splice(i, 1);
      }
    }

    // Input nodes are always first, output nodes are always last
    nodes = inputs.concat(nodes).concat(outputs);

    if (network.input === 0 || network.output === 0) {
      throw new Error('Given nodes have no clear input/output node!');
    }

    for (i = 0; i < nodes.length; i++) {
      let j;
      for (j = 0; j < nodes[i].connections.out.length; j++) {
        network.connections.push(nodes[i].connections.out[j]);
      }
      for (j = 0; j < nodes[i].connections.gated.length; j++) {
        network.gates.push(nodes[i].connections.gated[j]);
      }
      if (nodes[i].connections.self.weight !== 0) {
        network.selfconns.push(nodes[i].connections.self);
      }
    }

    network.nodes = nodes;

    return network;
  },

  /**
  * Creates a multilayer perceptron (MLP)
  *
  * @param {...number} layer_neurons Number of neurons in input layer, hidden layer(s), and output layer as a series of numbers (min 3 arguments)
  *
  * @example
  * let { architect } = require("@liquid-carrot/carrot");
  *
  * // Input 2 neurons, Hidden layer: 3 neurons, Output: 1 neuron
  * let my_perceptron = new architect.Perceptron(2,3,1);
  *
  * // Input: 2 neurons, 4 Hidden layers: 10 neurons, Output: 1 neuron
  * let my_perceptron = new architect.Perceptron(2, 10, 10, 10, 10, 1);
  *
  * @returns {Network} Feed forward neural network
  */
  Perceptron: function () {
    // Convert arguments to Array
    const layers = Array.from(arguments);

    if (layers.length < 3) throw new Error(`You have to specify at least 3 layers`);

    // Create a list of nodes/groups and add input nodes
    const nodes = [new Group(layers[0])];

    // add the following nodes and connect them
    _.times(layers.length - 1, (index) => {
      const layer = new Group(layers[index + 1]);
      nodes.push(layer);
      nodes[index].connect(nodes[index + 1], methods.connection.ALL_TO_ALL);
    });

    // Construct the network
    return architect.Construct(nodes);
  },

  /**
  * Creates a randomly connected network
  *
  * @param {number} input Number of input nodes
  * @param {number} [hidden] Number of nodes inbetween input and output
  * @param {number} output Number of output nodes
  * @param {object} [options] Configuration options
  * @param {number} [options.connections=hidden*2] Number of connections (Larger than hidden)
  * @param {number} [options.backconnections=0] Number of recurrent connections
  * @param {number} [options.selfconnections=0] Number of self connections
  * @param {number} [options.gates=0] Number of gates
  *
  * @example
  * let { architect } = require("@liquid-carrot/carrot");
  *
  * let network = architect.Random(1, 20, 2, {
  *   connections: 40,
  *   gates: 4,
  *   selfconnections: 4
  * });
  *
  * @returns {Network}
  */
  Random: function (input, hidden, output, options) {
    // Random(input, output)
    if(!(output, options)) {
      output = hidden;
      hidden = undefined;
    }
    // Random(input, output, options)
    else if(!options && _.isPlainObject(output)) {
        options = output;
        output = hidden;
        hidden = undefined;
    }

    hidden = hidden || 0;
    options = _.defaults(options, {
      connections: hidden * 2,
      backconnections: 0,
      selfconnections: 0,
      gates: 0
    });

    const network = new Network(input, output);

    _.times(hidden, () => network.mutate(methods.mutation.ADD_NODE));
    _.times(options.connections - hidden, () => network.mutate(methods.mutation.ADD_CONN));
    _.times(options.backconnections, () => network.mutate(methods.mutation.ADD_BACK_CONN));
    _.times(options.selfconnections, () => network.mutate(methods.mutation.ADD_SELF_CONN));
    _.times(options.gates, () => network.mutate(methods.mutation.ADD_GATE));

    return network;
  },

  /**
  * Creates a long short-term memory network
  *
  * @see {@link https://en.wikipedia.org/wiki/Long_short-term_memory|LSTM on Wikipedia}
  *
  * @param {number} input Number of input nodes
  * @param {...number} memory Number of memory block assemblies (input gate, memory cell, forget gate, and output gate) per layer
  * @param {number} output Number of output nodes
  * @param {object} [options] Configuration options
  * @param {boolean} [options.memoryToMemory=false] Form internal connections between memory blocks
  * @param {boolean} [options.outputToMemory=false] Form output to memory layer connections and gate them
  * @param {boolean} [options.outputToGates=false] Form output to gate connections (connects to all gates)
  * @param {boolean} [options.inputToOutput=true] Form direct input to output connections
  * @param {boolean} [options.inputToDeep=true] Form input to memory layer conections and gate them
  *
  * @example <caption>While training sequences or timeseries prediction, set the clear option to true in training</caption>
  * let { architect } = require("@liquid-carrot/carrot");
  *
  * // Input, memory block layer, output
  * let myLSTM = new architect.LSTM(2,6,1);
  *
  * // with multiple memory block layers
  * let myLSTM = new architect.LSTM(2, 4, 4, 4, 1);
  *
  * // with options
  * var options = {
  *   memoryToMemory: false,    // default
  *   outputToMemory: false,    // default
  *   outputToGates: false,     // default
  *   inputToOutput: true,      // default
  *   inputToDeep: true         // default
  * };
  *
  * let myLSTM = new architect.LSTM(2, 4, 4, 4, 1, options);
  *
  * @returns {Network}
  */
  LSTM: function () {
    var args = Array.prototype.slice.call(arguments);
    if (args.length < 3) {
      throw new Error('You have to specify at least 3 layers');
    }

    var last = args.pop();

    var outputLayer;
    if (typeof last === 'number') {
      outputLayer = new Group(last);
      last = {};
    } else {
      outputLayer = new Group(args.pop()); // last argument
    }

    outputLayer.set({
      type: 'output'
    });

    var options = {};
    options.memoryToMemory = last.memoryToMemory || false;
    options.outputToMemory = last.outputToMemory || false;
    options.outputToGates = last.outputToGates || false;
    options.inputToOutput = last.inputToOutput === undefined ? true : last.inputToOutput;
    options.inputToDeep = last.inputToDeep === undefined ? true : last.inputToDeep;

    var inputLayer = new Group(args.shift()); // first argument
    inputLayer.set({
      type: 'input'
    });

    var blocks = args; // all the arguments in the middle

    var nodes = [];
    nodes.push(inputLayer);

    var previous = inputLayer;
    for (var i = 0; i < blocks.length; i++) {
      var block = blocks[i];

      // Initialize required nodes (in activation order), altogether a memory block
      var inputGate = new Group(block);
      var forgetGate = new Group(block);
      var memoryCell = new Group(block);
      var outputGate = new Group(block);
      var outputBlock = i === blocks.length - 1 ? outputLayer : new Group(block);

      inputGate.set({
        bias: 1
      });
      forgetGate.set({
        bias: 1
      });
      outputGate.set({
        bias: 1
      });

      // Connect the input with all the nodes
      var input = previous.connect(memoryCell, methods.connection.ALL_TO_ALL); // input to memory cell connections for gating
      previous.connect(inputGate, methods.connection.ALL_TO_ALL);
      previous.connect(outputGate, methods.connection.ALL_TO_ALL);
      previous.connect(forgetGate, methods.connection.ALL_TO_ALL);

      // Set up internal connections
      memoryCell.connect(inputGate, methods.connection.ALL_TO_ALL);
      memoryCell.connect(forgetGate, methods.connection.ALL_TO_ALL);
      memoryCell.connect(outputGate, methods.connection.ALL_TO_ALL);
      var forget = memoryCell.connect(memoryCell, methods.connection.ONE_TO_ONE); // memory cell connections for gating
      var output = memoryCell.connect(outputBlock, methods.connection.ALL_TO_ALL); // memory cell connections for gating

      // Set up gates
      inputGate.gate(input, methods.gating.INPUT);
      forgetGate.gate(forget, methods.gating.SELF);
      outputGate.gate(output, methods.gating.OUTPUT);

      // Input to all memory cells
      if (options.inputToDeep && i > 0) {
        let input = inputLayer.connect(memoryCell, methods.connection.ALL_TO_ALL);
        inputGate.gate(input, methods.gating.INPUT);
      }

      // Optional connections
      if (options.memoryToMemory) {
        let input = memoryCell.connect(memoryCell, methods.connection.ALL_TO_ELSE);
        inputGate.gate(input, methods.gating.INPUT);
      }

      if (options.outputToMemory) {
        let input = outputLayer.connect(memoryCell, methods.connection.ALL_TO_ALL);
        inputGate.gate(input, methods.gating.INPUT);
      }

      if (options.outputToGates) {
        outputLayer.connect(inputGate, methods.connection.ALL_TO_ALL);
        outputLayer.connect(forgetGate, methods.connection.ALL_TO_ALL);
        outputLayer.connect(outputGate, methods.connection.ALL_TO_ALL);
      }

      // Add to array
      nodes.push(inputGate);
      nodes.push(forgetGate);
      nodes.push(memoryCell);
      nodes.push(outputGate);
      if (i !== blocks.length - 1) nodes.push(outputBlock);

      previous = outputBlock;
    }

    // input to output direct connection
    if (options.inputToOutput) {
      inputLayer.connect(outputLayer, methods.connection.ALL_TO_ALL);
    }

    nodes.push(outputLayer);
    return architect.Construct(nodes);
  },

  /**
  * Creates a gated recurrent unit network
  *
  * @param {number} input Number of input nodes
  * @param {...number} units Number of gated recurrent units per layer
  * @param {number} output Number of output nodes
  *
  * @example <caption>GRU is being tested, and may not always work for your dataset.</caption>
  * let { architect } = require("@liquid-carrot/carrot");
  *
  * // Input, gated recurrent unit layer, output
  * let myLSTM = new architect.GRU(2,6,1);
  *
  * // with multiple layers of gated recurrent units
  * let myLSTM = new architect.GRU(2, 4, 4, 4, 1);
  *
  * @example <caption>Training XOR gate</caption>
  * let { architect } = require("@liquid-carrot/carrot");
  *
  * var trainingSet = [
  *   { input: [0], output: [0]},
  *   { input: [1], output: [1]},
  *   { input: [1], output: [0]},
  *   { input: [0], output: [1]},
  *   { input: [0], output: [0]}
  * ];
  *
  * var network = new architect.GRU(1,1,1);
  *
  * // Train a sequence: 00100100..
  * network.train(trainingSet, {
  *   log: 1,
  *   rate: 0.1, // lower rates work best
  *   error: 0.005,
  *   iterations: 3000,
  *   clear: true // set to true while training
  * });
  *
  * @returns {Network}
  */
  GRU: function () {
    var args = Array.prototype.slice.call(arguments);
    if (args.length < 3) {
      throw new Error('not enough layers (minimum 3) !!');
    }

    var inputLayer = new Group(args.shift()); // first argument
    var outputLayer = new Group(args.pop()); // last argument
    var blocks = args; // all the arguments in the middle

    var nodes = [];
    nodes.push(inputLayer);

    var previous = inputLayer;
    for (var i = 0; i < blocks.length; i++) {
      var layer = new Layer.GRU(blocks[i]);
      previous.connect(layer);
      previous = layer;

      nodes.push(layer);
    }

    previous.connect(outputLayer);
    nodes.push(outputLayer);

    return architect.Construct(nodes);
  },

  /**
  * Creates a hopfield network of the given size
  *
  * @param {number} size Number of inputs and outputs (which is the same number)
  *
  * @example <caption>Output will always be binary due to `Activation.STEP` function.</caption>
  * let { architect } = require("@liquid-carrot/carrot");
  *
  * var network = architect.Hopfield(10);
  * var trainingSet = [
  *   { input: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1], output: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1] },
  *   { input: [1, 1, 1, 1, 1, 0, 0, 0, 0, 0], output: [1, 1, 1, 1, 1, 0, 0, 0, 0, 0] }
  * ];
  *
  * network.train(trainingSet);
  *
  * network.activate([0,1,0,1,0,1,0,1,1,1]); // [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
  * network.activate([1,1,1,1,1,0,0,1,0,0]); // [1, 1, 1, 1, 1, 0, 0, 0, 0, 0]
  *
  * @returns {Network}
  */
  Hopfield: function (size) {
    var input = new Group(size);
    var output = new Group(size);

    input.connect(output, methods.connection.ALL_TO_ALL);

    input.set({
      type: 'input'
    });
    output.set({
      squash: methods.activation.STEP,
      type: 'output'
    });

    var network = new architect.Construct([input, output]);

    return network;
  },

  /**
  * Creates a NARX network (remember previous inputs/outputs)
  *
  * @param {number} input Number of input nodes
  * @param {number[]|number} hidden Array of hidden layer sizes, e.g. [10,20,10] If only one hidden layer, can be a number (of nodes)
  * @param {number} output Number of output nodes
  * @param {number} input_memory Number of previous inputs to remember
  * @param {number} output_memory Number of previous outputs to remember
  *
  * @example
  * let { architect } = require("@liquid-carrot/carrot");
  *
  * let narx = new architect.NARX(1, 5, 1, 3, 3);
  *
  * // Training a sequence
  * let trainingData = [
  *   { input: [0], output: [0] },
  *   { input: [0], output: [0] },
  *   { input: [0], output: [1] },
  *   { input: [1], output: [0] },
  *   { input: [0], output: [0] },
  *   { input: [0], output: [0] },
  *   { input: [0], output: [1] },
  * ];
  * narx.train(trainingData, {
  *   log: 1,
  *   iterations: 3000,
  *   error: 0.03,
  *   rate: 0.05
  * });
  *
  * @returns {Network}
  */
  NARX: function (input_size, hidden_sizes, output_size, input_memory_size, output_memory_size) {
    if (!Array.isArray(hidden_sizes)) {
      hidden_sizes = [hidden_sizes];
    }

    const nodes = [];

    const input_layer = new Layer.Dense(input_size);
    const input_memory = new Layer.Memory(input_size, input_memory_size);

    const hidden_layers = [];
    // create the hidden layers
    _.times(hidden_sizes.length, (index) => {
      hidden_layers.push(new Layer.Dense(hidden_sizes[index]));
    });

    const output_layer = new Layer.Dense(output_size);
    const output_memory = new Layer.Memory(output_size, output_memory_size);

    // add the input connections and add to the list of nodes
    input_layer.connect(hidden_layers[0], methods.connection.ALL_TO_ALL);
    input_layer.connect(input_memory, methods.connection.ONE_TO_ONE, 1);
    nodes.push(input_layer);

    // connect the memories to the first hidden layer
    input_memory.connect(hidden_layers[0], methods.connection.ALL_TO_ALL);
    output_memory.connect(hidden_layers[0], methods.connection.ALL_TO_ALL);
    nodes.push(input_memory);
    nodes.push(output_memory);

    // feed forward the hidden layers
    _.times(hidden_layers.length, (index) => {
      if (index < hidden_layers.length - 1) { // do not connect to next if last
        hidden_layers[index].connect(hidden_layers[index + 1], methods.connection.ALL_TO_ALL);
      }
      else { // if last, connect to output
        hidden_layers[index].connect(output_layer, methods.connection.ALL_TO_ALL);
      }

      nodes.push(hidden_layers[index]);
    });

    // finally, connect output to memory
    output_layer.connect(output_memory, methods.connection.ONE_TO_ONE, 1);
    nodes.push(output_layer);


    input_layer.set({
      type: 'input'
    });
    output_layer.set({
      type: 'output'
    });

    return architect.Construct(nodes);
  },

  /**
   * @todo Build Liquid network constructor
   */
  Liquid: function() {
    // Code here....
  }
};

module.exports = architect;
