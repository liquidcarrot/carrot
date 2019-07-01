const _ = require("lodash");
const methods = require("../methods/methods");
const Node = require("./node");
const Group = require("./Group"); // will be imported later for circular dependency issues


/**
* Layers are pre-built architectures that allow you to combine different network architectures into óne network.
*
* Always start your network with a `Dense` layer and always end it with a `Dense` layer. You can connect layers with each other just like you can connect [Nodes](Node) and [Groups](Group) with each other.
*
* @constructs Layer
*
*
* @prop {Node[]} output Output nodes
* @prop {Node[]} nodes Nodes within the layer
* @prop {Group[]|Node[]} connections_incoming Incoming connections
* @prop {Group[]|Node[]} connections_outgoing Outgoing connections
* @prop {Group[]|Node[]} connections_self Self connections
*
* @example <caption>Custom architecture built with layers</caption>
* let { Layer } = require("@liquid-carrot/carrot");
*
* let input = new Layer.Dense(1);
* let hidden1 = new Layer.LSTM(5);
* let hidden2 = new Layer.GRU(1);
* let output = new Layer.Dense(1);
*
* // connect however you want
* input.connect(hidden1);
* hidden1.connect(hidden2);
* hidden2.connect(output);
*
* let network = architect.Construct([input, hidden1, hidden2, output]);
*/
class Layer extends Group {

  /**
   * Accepts the same arguments as Group, since it inherits from Group
   */
  constructor() {
    super(...arguments);

    // the difference between Layer and Group is that Layer
    // has special input and output nodes, used when connecting out or in
    this.input_nodes = [];
    this.output_nodes = [];
  }

  /**
  * Creates a regular (dense) layer.
  *
  * @param {number} size Amount of nodes to build the layer with
  *
  * @returns {Layer} Plain layer
  *
  * @example
  * let { Layer } = require("@liquid-carrot/carrot");
  *
  * let layer = new Layer.Dense(size);
  */
  static Dense(size) {
    // Create the layer
    const new_dense_layer = new Layer(size);

    new_dense_layer.input_nodes = new_dense_layer.nodes;
    new_dense_layer.output_nodes = new_dense_layer.nodes;

    return new_dense_layer;
  }
}


/**
* Creates an LSTM layer.
*
* LSTM layers are useful for detecting and predicting patterns over long time lags. This is a recurrent layer.
*
* Note: architect.LSTM currently performs better than an equivalent network built with LSTM Layers.
*
* @param {number} size Amount of nodes to build the layer with
*
* @returns {Layer} LSTM layer
*
* @example
* let { Layer } = require("@liquid-carrot/carrot");
*
* let layer = new Layer.LSTM(size);
*/
Layer.LSTM = function(size) {
  // Create the layer
  const layer = new Layer();

  // Init required nodes (in activation order)
  const input_gate = new Group(size);
  const forget_gate = new Group(size);
  const memory_cell = new Group(size);
  const output_gate = new Group(size);
  const output_block = new Group(size);

  input_gate.set({
    bias: 1
  });
  forget_gate.set({
    bias: 1
  });
  output_gate.set({
    bias: 1
  });

  // Set up internal connections
  memory_cell.connect(input_gate, methods.connection.ALL_TO_ALL);
  memory_cell.connect(forget_gate, methods.connection.ALL_TO_ALL);
  memory_cell.connect(output_gate, methods.connection.ALL_TO_ALL);
  const forget = memory_cell.connect(memory_cell, methods.connection.ONE_TO_ONE);
  const output = memory_cell.connect(output_block, methods.connection.ALL_TO_ALL);

  // Set up gates
  forget_gate.gate(forget, methods.gating.SELF);
  output_gate.gate(output, methods.gating.OUTPUT);

  // Add to nodes array
  layer.nodes = [input_gate, forget_gate, memory_cell, output_gate, output_block];

  // Define output
  layer.output = output_block;

  layer.input = function(from, method, weight) {
    if(from instanceof Layer) from = from.output;
    method = method || methods.connection.ALL_TO_ALL;

    const input = from.connect(memory_cell, method, weight);

    const connections = [
      input,
      from.connect(input_gate, method, weight),
      from.connect(output_gate, method, weight),
      from.connect(forget_gate, method, weight)
    ];

    input_gate.gate(input, methods.gating.INPUT);

    return connections;
  };

  return layer;
};

/**
* Creates a GRU layer.
*
* The GRU layer is similar to the LSTM layer, however it has no memory cell and only two gates. It is also a recurrent layer that is excellent for timeseries prediction.
*
* @param {number} size Amount of nodes to build the layer with
*
* @returns {Layer} GRU layer
*
* @example
* let { Layer } = require("@liquid-carrot/carrot");
*
* let layer = new Layer.GRU(size);
*/
Layer.GRU = function(size) {
  // Create the layer
  const layer = new Layer();

  const update_gate = new Group(size);
  const inverse_update_gate = new Group(size);
  const reset_gate = new Group(size);
  const memory_cell = new Group(size);
  const output = new Group(size);
  const previous_output = new Group(size);

  previous_output.set({
    bias: 0,
    squash: methods.activation.IDENTITY,
    type: 'constant'
  });
  memory_cell.set({
    squash: methods.activation.TANH
  });
  inverse_update_gate.set({
    bias: 0,
    squash: methods.activation.INVERSE,
    type: 'constant'
  });
  update_gate.set({
    bias: 1
  });
  reset_gate.set({
    bias: 0
  });

  // Update gate calculation
  previous_output.connect(update_gate, methods.connection.ALL_TO_ALL);

  // Inverse update gate calculation
  update_gate.connect(inverse_update_gate, methods.connection.ONE_TO_ONE, 1);

  // Reset gate calculation
  previous_output.connect(reset_gate, methods.connection.ALL_TO_ALL);

  // Memory calculation
  const reset = previous_output.connect(memory_cell, methods.connection.ALL_TO_ALL);

  reset_gate.gate(reset, methods.gating.OUTPUT); // gate

  // Output calculation
  const update1 = previous_output.connect(output, methods.connection.ALL_TO_ALL);
  const update2 = memory_cell.connect(output, methods.connection.ALL_TO_ALL);

  update_gate.gate(update1, methods.gating.OUTPUT);
  inverse_update_gate.gate(update2, methods.gating.OUTPUT);

  // Previous output calculation
  output.connect(previous_output, methods.connection.ONE_TO_ONE, 1);

  // Add to nodes array
  layer.nodes = [update_gate, inverse_update_gate, reset_gate, memory_cell, output, previous_output];

  layer.output = output;

  layer.input = function(from, method, weight) {
    if (from instanceof Layer) from = from.output;

    method = method || methods.connection.ALL_TO_ALL;

    const connections = [
      from.connect(updateGate, method, weight),
      from.connect(resetGate, method, weight),
      from.connect(memoryCell, method, weight)
    ];

    return connections;
  };

  return layer;
};

/**
* Creates a Memory layer.
*
* The Memory layer makes networks remember a number of previous inputs in an absolute way. For example, if you set the memory option to 3, it will remember the last 3 inputs in the same state as they were inputted.
*
* @param {number} size Amount of nodes to build the layer with
* @param {number} memory Number of previous inputs to remember
*
* @returns {Layer} Layer with nodes that store previous inputs
*
* @example
* let { Layer } = require("@liquid-carrot/carrot");
*
* let layer = new Layer.Memory(size, memory);
*/
Layer.Memory = function(size, memory) {
  // Create the layer
  const layer = new Layer();
  // Because the output can only be one group, we have to put the nodes all in óne group

  let previous;
  for (let index = 0; index < memory; index++) {
    const block = new Group(size);

    block.set({
      squash: methods.activation.IDENTITY,
      bias: 0,
      type: 'constant'
    });

    if (previous != undefined) previous.connect(block, methods.connection.ONE_TO_ONE, 1);

    layer.nodes.push(block);
    previous = block;
  }

  layer.nodes.reverse();

  // Because output can only be óne group, fit all memory nodes in óne group
  const output_group = new Group(0);
  for (let index = 0; index < layer.nodes.length; index++) {
    layer.nodes[index].nodes.reverse();
    output_group.nodes = output_group.nodes.concat(layer.nodes[index].nodes);
  }

  layer.output = output_group;

  layer.input = function(from, method, weight) {
    if (from instanceof Layer) from = from.output;
    method = method || methods.connection.ALL_TO_ALL;

    if (from.nodes.length !== layer.nodes[layer.nodes.length - 1].nodes.length) throw new Error('Previous layer size must be same as memory size');

    return from.connect(layer.nodes[layer.nodes.length - 1], methods.connection.ONE_TO_ONE, 1);
  };

  return layer;
};

module.exports = Layer;
