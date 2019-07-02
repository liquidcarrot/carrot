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
  static LSTM(size) {
    // Create the layer
    const new_lstm_layer = new Layer();

    // Init required nodes (in activation order)
    const input_group = new Group(size);
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
    const forget_connections = memory_cell.connect(memory_cell, methods.connection.ONE_TO_ONE);
    const output_connections = memory_cell.connect(output_block, methods.connection.ALL_TO_ALL);

    input_group.connect(memory_cell, methods.connection.ALL_TO_ALL);
    input_group.connect(output_gate, methods.connection.ALL_TO_ALL),
    input_group.connect(forget_gate, methods.connection.ALL_TO_ALL);
    const input_gate_connections = input_group.connect(input_gate, methods.connection.ALL_TO_ALL);


    // Set up gates
    forget_gate.gate(forget_connections, methods.gating.SELF);
    output_gate.gate(output_connections, methods.gating.OUTPUT);
    input_gate.gate(input_gate_connections, methods.gating.INPUT);

    // Add the nodes to the layer
    new_lstm_layer.addNodes(input_group);
    new_lstm_layer.addNodes(input_gate);
    new_lstm_layer.addNodes(forget_gate);
    new_lstm_layer.addNodes(memory_cell);
    new_lstm_layer.addNodes(output_gate);
    new_lstm_layer.addNodes(output_block);

    // Define input and output nodes
    new_lstm_layer.input_nodes.push(...input_group.nodes);
    new_lstm_layer.output_nodes.push(...output_block.nodes);

    return new_lstm_layer;
  }

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
  static GRU(size) {
    // Create the layer
    const new_gru_layer = new Layer();

    const input_group = new Group(size);
    const update_gate = new Group(size);
    const inverse_update_gate = new Group(size);
    const reset_gate = new Group(size);
    const memory_cell = new Group(size);
    const output_group = new Group(size);
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

    // Initial input forwarding
    input_group.connect(update_gate, methods.connection.ALL_TO_ALL),
    input_group.connect(reset_gate, methods.connection.ALL_TO_ALL),
    input_group.connect(memory_cell, methods.connection.ALL_TO_ALL)

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
    const update1 = previous_output.connect(output_group, methods.connection.ALL_TO_ALL);
    const update2 = memory_cell.connect(output_group, methods.connection.ALL_TO_ALL);

    update_gate.gate(update1, methods.gating.OUTPUT);
    inverse_update_gate.gate(update2, methods.gating.OUTPUT);

    // Previous output_group calculation
    output_group.connect(previous_output, methods.connection.ONE_TO_ONE, 1);

    // Add to nodes array in the correct order
    new_gru_layer.addNodes(input_group);
    new_gru_layer.addNodes(update_gate);
    new_gru_layer.addNodes(inverse_update_gate);
    new_gru_layer.addNodes(reset_gate);
    new_gru_layer.addNodes(memory_cell);
    new_gru_layer.addNodes(output_group);
    new_gru_layer.addNodes(previous_output);

    // set the input and output nodes
    new_gru_layer.input_nodes.push(...input_group.nodes);
    new_gru_layer.output_nodes.push(...output_group.nodes);


    return new_gru_layer;
  }

  /**
  * Creates a Memory layer.
  *
  * The Memory layer makes networks remember a number of previous inputs in an absolute way. For example, if you set the memory option to 3, it will remember the last 3 inputs in the same state as they were inputted.
  *
  * @param {number} size Amount of nodes to build the layer with
  * @param {number} memory_size Number of previous inputs to remember
  *
  * @returns {Layer} Layer with nodes that store previous inputs
  *
  * @example
  * let { Layer } = require("@liquid-carrot/carrot");
  *
  * let layer = new Layer.Memory(size, memory);
  */
  static Memory(size, memory_size) {
    // Create the layer
    const new_memory_layer = new Layer();
    // Because the output can only be one group, we have to put the nodes all in one group

    const input_group = new Group(size);

    let previous = input_group;
    const added_groups = [];
    // this array is created to add the nodes to the layer later
    // to be able to have the memory effect the nodes have to be added in reverse order
    for (let index = 0; index < memory_size; index++) {
      const block = new Group(size);

      block.set({
        squash: methods.activation.IDENTITY,
        bias: 0,
        type: 'constant'
      });

      previous.connect(block, methods.connection.ONE_TO_ONE, 1);

      added_groups.nodes.push(block);
      previous = block;
    }

    // set up input and output nodes
    new_memory_layer.input_nodes.push(...input_group.nodes)
    new_memory_layer.output_nodes.push(...added_groups.slice(-1)[0].nodes)

    // the order of activation has to be the reverse of the connection order to have a memory effect
    added_groups.reverse().forEach(group => new_memory_layer.addNodes(group));;

    return new_memory_layer;
  }
}

module.exports = Layer;
