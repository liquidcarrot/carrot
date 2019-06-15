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
  * @param {...number} memory Number of memory block_size assemblies (input gate, memory cell, forget gate, and output gate) per layer
  * @param {number} output Number of output nodes
  * @param {object} [options] Configuration options
  * @param {boolean} [options.memory_to_memory=false] Form internal connections between memory blocks
  * @param {boolean} [options.output_to_memory=false] Form output to memory layer connections and gate them
  * @param {boolean} [options.output_to_gates=false] Form output to gate connections (connects to all gates)
  * @param {boolean} [options.input_to_output=true] Form direct input to output connections
  * @param {boolean} [options.input_to_deep=true] Form input to memory layer conections and gate them
  *
  * @example <caption>While training sequences or timeseries prediction, set the clear option to true in training</caption>
  * let { architect } = require("@liquid-carrot/carrot");
  *
  * // Input, memory block_size layer, output
  * let my_lSTM = new architect.LSTM(2,6,1);
  *
  * // with multiple memory block_size layer_sizes
  * let my_lSTM = new architect.LSTM(2, 4, 4, 4, 1);
  *
  * // with options
  * var options = {
  *   memory_to_memory: false,    // default
  *   output_to_memory: false,    // default
  *   output_to_gates: false,     // default
  *   input_to_output: true,      // default
  *   input_to_deep: true         // default
  * };
  *
  * let my_lSTM = new architect.LSTM(2, 4, 4, 4, 1, options);
  *
  * @returns {Network}
  */
  LSTM: function () {
    const layer_sizes_and_options = Array.from(arguments);

    const output_size_or_options = layer_sizes_and_options.slice(-1);

    // find out if options were passed
    if (typeof output_size_or_options === 'number') {
      const layer_sizes = layer_sizes_and_options;
      let options = {};
    } else {
      const layer_sizes = layer_sizes_and_options.slice(layer_sizes_and_options.length - 1);
      let options = output_size_or_options;
    }

    if (layer_sizes.length < 3) {
      throw new Error('You have to specify at least 3 layer_sizes');
    }

    options = _.defaults(options, {
      memory_to_memory: false,
      output_to_memory: false,
      output_to_gates: false,
      input_to_output: true,
      input_to_deep: true
    });


    const input_layer = new Group(layer_sizes.shift()); // first argument
    input_layer.set({
      type: 'input'
    });

    const output_layer = new Group(layer_sizes.pop());
    output_layer.set({
      type: 'output'
    });

    // check if input to output direct connection
    if (options.input_to_output) {
      input_layer.connect(output_layer, methods.connection.ALL_TO_ALL);
    }

    const block_sizes = layer_sizes; // all the remaining arguments
    const blocks = []; // stores all the nodes of the blocks, to add later to nodes
    const previous_output = input_layer;
    _.times(block_sizes.length, (index) => {
      const block_size = block_sizes[index];

      // Initialize required nodes (in activation order), altogether a memory block_size
      const input_gate = new Group(block_size);
      const forget_gate = new Group(block_size);
      const memory_cell = new Group(block_size);
      const output_gate = new Group(block_size);
      // if on last layer then output is the output layer
      const block_output = index === block_sizes.length - 1 ? output_layer : new Group(block_size);

      input_gate.set({
        bias: 1
      });
      forget_gate.set({
        bias: 1
      });
      output_gate.set({
        bias: 1
      });

      // Connect the input with all the nodes
      // input to memory cell connections for gating
      const memory_gate_connections = previous_output.connect(memory_cell, methods.connection.ALL_TO_ALL);
      previous_output.connect(input_gate, methods.connection.ALL_TO_ALL);
      previous_output.connect(output_gate, methods.connection.ALL_TO_ALL);
      previous_output.connect(forget_gate, methods.connection.ALL_TO_ALL);

      // Set up internal connections
      memory_cell.connect(input_gate, methods.connection.ALL_TO_ALL);
      memory_cell.connect(forget_gate, methods.connection.ALL_TO_ALL);
      memory_cell.connect(output_gate, methods.connection.ALL_TO_ALL);

      // memory cell connections for gating
      const forget_gate_connections = memory_cell.connect(memory_cell, methods.connection.ONE_TO_ONE);
      // memory cell connections for gating
      const output_gate_connections = memory_cell.connect(block_output, methods.connection.ALL_TO_ALL);

      // Set up gates
      input_gate.gate(memory_gate_connections, methods.gating.INPUT);
      forget_gate.gate(forget_gate_connections, methods.gating.SELF);
      output_gate.gate(output_gate_connections, methods.gating.OUTPUT);

      // add the connections specified in options
            
      // Input to all memory cells
      if (options.input_to_deep && index > 0) {
        const input_layer_memory_gate_connection =
          input_layer.connect(memory_cell, methods.connection.ALL_TO_ALL);
        input_gate.gate(input_layer_memory_gate_connection, methods.gating.INPUT);
      }

      // Optional connections
      if (options.memory_to_memory) {
        const recurrent_memory_gate_connection =
          memory_cell.connect(memory_cell, methods.connection.ALL_TO_ELSE);
        input_gate.gate(recurrent_memory_gate_connection, methods.gating.INPUT);
      }

      if (options.output_to_memory) {
        const output_to_memory_gate_connection =
          output_layer.connect(memory_cell, methods.connection.ALL_TO_ALL);
        input_gate.gate(output_to_memory_gate_connection, methods.gating.INPUT);
      }

      if (options.output_to_gates) {
        output_layer.connect(input_gate, methods.connection.ALL_TO_ALL);
        output_layer.connect(forget_gate, methods.connection.ALL_TO_ALL);
        output_layer.connect(output_gate, methods.connection.ALL_TO_ALL);
      }

      // Add to array
      blocks.push(input_gate);
      blocks.push(forget_gate);
      blocks.push(memory_cell);
      blocks.push(output_gate);
      if (index !== block_sizes.length - 1) blocks.push(block_output);

      previous_output = block_output;
    });

    const nodes = [];
    nodes.push(input_layer);
    _.forEach(blocks, (node_group) => nodes.push(node_group));
    nodes.push(output_layer);
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
      } else { // if last, connect to output
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
