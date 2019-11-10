const config = require("../config")
const multi = require("../multithreading/multi")
const methods = require("../methods/methods")
const Group = require("./group")
const Layer = require("./layer")
const Connection = require("./connection")
const Node = require("./node")
const _ = require("lodash")

// Easier variable naming
const mutation = methods.mutation

/**
* Create a neural network
*
* Networks are easy to create, all you need to specify is an `input` and an `output` size.
*
* @constructs Network
*
* @param {number} input_size Size of input layer AKA neurons in input layer
* @param {number} output_size Size of output layer AKA neurons in output layer
*
* @prop {number} input_size Size of input layer AKA neurons in input layer
* @prop {number} output_size Size of output layer AKA neurons in output layer
* @prop {Array<Node>} nodes Nodes currently within the network
* @prop {Array<Node>} gates Gates within the network
* @prop {Array<Connection>} connections Connections within the network
*
* @example
* let { Network, architect } = require("@liquid-carrot/carrot");
*
* // Network with 2 input neurons and 1 output neuron
* let myNetwork = new Network(2, 1);
*
* // and a multi-layered network
* let myNetwork = new architect.Perceptron(5, 20, 10, 5, 1)
*/
function Network(input_size, output_size) {
  if (typeof input_size === `undefined` || typeof output_size === `undefined`) throw new TypeError(`No input or output size given`);

  const self = this;

  // *IDEA*: Store input & output nodes in arrays accessible by self.input and self.output instead of just storing the number
  self.input_size = input_size
  self.output_size = output_size
  // backwards compatibility
  self.input = input_size
  self.output = output_size

  // keep track of the input and output nodes
  self.input_nodes = new Set()
  self.output_nodes = new Set()

  // Store all the nodes and connection genes
  self.nodes = [] // Stored in activation order
  self.connections = []
  self.gates = []

  // Create input and output nodes
  for (let i = 0; i < input_size; i++) {
    const new_node = new Node({ type: 'input' })
    self.nodes.push(new_node)
    self.input_nodes.add(new_node)
  }
  for (let i = 0; i < output_size; i++) {
    const new_node = new Node({ type: 'output' })
    self.nodes.push(new_node)
    self.output_nodes.add(new_node)
  }

  /**
   * Connects a Node to another Node or Group in the network
   *
   * @function connect
   * @memberof Network
   *
   * @param {Node} from The source Node
   * @param {Node|Group} to The destination Node or Group
   * @param {number} [weight] An initial weight for the connections to be formed
   *
   * @returns {Connection[]} An array of the formed connections
   *
   * @example
   * let { Network } = require("@liquid-carrot/carrot");
   *
   * myNetwork.connect(myNetwork.nodes[4], myNetwork.nodes[5]); // connects network node 4 to network node 5
   */
  self.connect = function(from, to, weight) {
    // many elements if dealing with groups for example
    let connections = from.connect(to, weight);
    if (connections instanceof Connection) connections = [connections];

    for (let i = 0; i < connections.length; i++) {
      let connection = connections[i];
      self.connections.push(connection);
    }

    return connections;
  }

  // Connect input nodes with output nodes directly
  for (let i = 0; i < self.input_size; i++) {
    for (var j = self.input_size; j < self.output_size + self.input_size; j++) {
      // https://stats.stackexchange.com/a/248040/147931
      const weight = (Math.random() - 0.5) * self.input_size * Math.sqrt(2 / self.input_size);
      self.connect(self.nodes[i], self.nodes[j], weight);
    }
  }

  /**
   * Activates the network
   *
   * It will activate all the nodes in activation order and produce an output.
   *
   * @function activate
   * @memberof Network
   *
   * @param {number[]} [input] Input values to activate nodes with
   * @param {Number} [options.dropout_rate=0] The dropout rate. [dropout](https://medium.com/@amarbudhiraja/https-medium-com-amarbudhiraja-learning-less-to-learn-better-dropout-in-deep-machine-learning-74334da4bfc5)
   * @param {bool} [options.trace=true] Controls whether traces are created when activation happens (a trace is meta information left behind for different uses, e.g. backpropagation).
   * @returns {number[]} Squashed output values
   *
   * @example
   * let { Network } = require("@liquid-carrot/carrot");
   *
   * // Create a network
   * let myNetwork = new Network(3, 2);
   *
   * myNetwork.activate([0.8, 1, 0.21]); // gives: [0.49, 0.51]
   */
  self.activate = function(input, { dropout_rate = 0, trace = true } = {}) {
    // Activate nodes chronologically - first input, then hidden, then output
    // activate input nodes
    // TODO: fix, this should be activated according to nodes order

    let input_node_index = 0;
    for (let i = 0; i < self.nodes.length; i++) {
      if (input_node_index === self.input_nodes.size) {
        break; // all the input nodes have been activated
      }
      const node = self.nodes[i];
      if (!self.input_nodes.has(node)) continue;

      node.activate(input[input_node_index++], { trace })
    }
    if (input_node_index !== input.length) {
      throw Error(`There are ${input_node_index} input nodes, but ${input.length} inputs were passed`);
    }

    // activate hidden nodes
    self.nodes.forEach((node, node_index) => {
      // check that is not input nor output
      if (self.input_nodes.has(node) || self.output_nodes.has(node)) return;

      if (dropout_rate) node.mask = Math.random() < dropout_rate ? 0 : 1;

      node.activate({ trace })
    });

    const output = [];
    for (let i = 0; i < self.nodes.length; i++) {
      if (output.length === self.output_nodes.size) {
        break; // all the output nodes have been activated
      }
      const node = self.nodes[i];
      if (!self.output_nodes.has(node)) continue;

      // only activate output nodes this run
      output.push(node.activate({ trace }))
    }

    if (output.length !== self.output_nodes.size) {
      throw Error(`There are ${self.output_nodes.size} output nodes, but ${output.length} outputs were passed`);
    }

    return output;
  }

  /**
   * Deprecated, here for backwards compatibility only! Simply calls `.activate()` with option `trace: false`
   *
   * Activates network without creating traces
   *
   * Activates the network without calculating elegibility traces for the nodes within it.
   *
   * Since this doesn't calculate traces it won't factor in backpropagation afterwards. That's also why it's quite a bit faster than regular `activate`.
   *
   * @function noTraceActivate
   *
   * @deprecated
   *
   * @memberof Network
   *
   * @param {number[]} input An array of input values equal in size to the input layer
   *
   * @returns {number[]} output An array of output values equal in size to the output layer
   *
   * @example
   * let { Network } = require("@liquid-carrot/carrot");
   *
   * // Create a network
   * let myNetwork = new Network(3, 2);
   *
   * myNetwork.noTraceActivate([0.8, 1, 0.21]); // gives: [0.49, 0.51]
   */
  self.noTraceActivate = function(input) {
    return self.activate(input, { trace: false });
  }

  /**
   * Backpropagate the network
   *
   * This function allows you to teach the network. If you want to do more complex training, use the `network.train()` function.
   *
   * @function propagate
   * @memberof Network
   *
   * @param {number} rate=0.3 Sets the [learning rate](https://towardsdatascience.com/understanding-learning-rates-and-how-it-improves-performance-in-deep-learning-d0d4059c1c10) of the backpropagation process
   * @param {number} momentum=0 [Momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html). Adds a fraction of the previous weight update to the current one.
   * @param {boolean} update=false When set to false weights won't update, but when set to true after being false the last propagation will include the deltaweights of the first "update:false" propagations too.
   * @param {number[]} target Ideal values of the previous activate. Will use the difference to improve the weights
   *
   * @example
   * let { Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(1,1);
   *
   * // This trains the network to function as a NOT gate
   * for(var node_index = 0; i < 1000; i++){
   *  network.activate([0]);
   *  network.propagate(0.2, 0, true, [1]);
   *  network.activate([1]);
   *  network.propagate(0.3, 0, true, [0]);
   * }
   */
  self.propagate = function(rate, momentum, update, target) {
    // "OR" added for backward compatibility
    const output_size = (self.output_size || self.output)
    const input_size = (self.input_size || self.input)
    if (typeof target === `undefined` || target.length !== output_size) {
      throw new Error(`Output target length should match network output length`);
    }

    // index used to iterate through the target array when updating
    let target_index = 0;

    // Propagate output nodes
    for (let i = 0; target_index < output_size; i++) {
      if (self.output_nodes.has(self.nodes[i])) {
        self.nodes[i].propagate(target[target_index], { rate, momentum, update });
        target_index++;
      }
    }

    // Propagate hidden nodes
    for (let i = self.nodes.length - 1; i >= 0 ; i--) {
      const current_node = self.nodes[i];
      if (self.input_nodes.has(current_node) || self.output_nodes.has(current_node)) {
        continue;
      }
      current_node.propagate({ rate, momentum, update });
    }

    // Propagate input nodes
    self.input_nodes.forEach(node => {
      // update order should not matter because they are the last ones and do(/should) not interact
      node.propagate({ rate, momentum, update });
    })
  }

  /**
   * Clear the context of the network
   *
   * @function clear
   * @memberof Network
   */
  self.clear = function() {
    for (let i = 0; i < self.nodes.length; i++) {
      self.nodes[i].clear();
    }
  }

  /**
   * Returns a deep copy of Network.
   * @beta
   *
   * @function clone
   * @memberof Network
   *
   * @returns {Network} Returns an identical network
   */
  self.clone = function() {
    return _.cloneDeep(self)
  }

  /**
   * Removes the connection of the `from` node to the `to` node
   *
   * @function disconnect
   * @memberof Network
   *
   * @param {Node} from Source node
   * @param {Node} to Destination node
   *
   * @example
   * myNetwork.disconnect(myNetwork.nodes[4], myNetwork.nodes[5]);
   * // now node 4 does not have an effect on the output of node 5 anymore
   */
  self.disconnect = function(from, to) {
    // Delete the connection in the network's connection array
    const connections = self.connections;
    for (let i = 0; i < connections.length; i++) {
      const conn = connections[i];
      if (conn.from === from && conn.to === to) {
        if (conn.gater !== null) self.ungate(conn);
        connections.splice(i, 1);
        break;
      }
    }

    // Delete & return the connection at the sending and receiving neuron
    return from.disconnect(to)
  }

  /**
   * Makes a network node gate a connection
   *
   * @function gate
   * @memberof Network
   *
   * @todo Add ability to gate several network connections at once
   *
   * @param {Node} node Gating node
   * @param {Connection} connection Connection to gate with node
   *
   * @example
   * let { Network } = require("@liquid-carrot/carrot");
   *
   * myNetwork.gate(myNetwork.nodes[1], myNetwork.connections[5])
   * // now: connection 5's weight is multiplied with node 1's activaton
   */
  self.gate = function(node, connection) {
    if (self.nodes.indexOf(node) === -1) {
      throw new ReferenceError(`This node is not part of the network!`);
    } else if (connection.gater != null) {
      if (config.warnings) console.warn(`This connection is already gated!`);
      return;
    }
    node.gate(connection);
    self.gates.push(connection);
  }

  /**
   * Remove the gate of a connection.
   *
   * @function ungate
   * @memberof Network
   *
   * @param {Connection} connection Connection to remove gate from
   *
   * @example
   * let { Network, architect } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new architect.Perceptron(1, 4, 2);
   *
   * // Gate a connection
   * myNetwork.gate(myNetwork.nodes[2], myNetwork.connections[5]);
   *
   * // Remove the gate from the connection
   * myNetwork.ungate(myNetwork.connections[5]);
   */
  self.ungate = function(connection) {
    const index = self.gates.indexOf(connection);
    if (index === -1) {
      throw new Error(`This connection is not gated!`);
    }

    self.gates.splice(index, 1);
    connection.gater.ungate(connection);
  }

  /**
   * Removes a node from a network, all its connections will be redirected. If it gates a connection, the gate will be removed.
   *
   * @function remove
   * @memberof Network
   *
   * @param {Node} node Node to remove from the network
   *
   * @example
   * let { Network, architect } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new architect.Perceptron(1,4,1);
   *
   * // Remove a node
   * myNetwork.remove(myNetwork.nodes[2]);
   */
  self.remove = function(node) {
    const index = self.nodes.indexOf(node);

    if (index === -1) {
      throw new ReferenceError(`This node does not exist in the network!`);
    }

    // Keep track of gates
    const gates = [];

    // Remove self recursive connections - these would not be able
    // to connect/disconnect to/from other nodes
    self.disconnect(node, node);

    // Get all its inputting nodes
    const inputs = [];
    // unsure why not regular forEach
    _.forEachRight(node.incoming, (connection) => {
      if (mutation.SUB_NODE.keep_gates && connection.gater !== null && connection.gater !== node) {
        // the condition mutation.SUB_NODE.keep_gates seems
        // useless - probably it should be an option
        gates.push(connection.gater);
      }
      inputs.push(connection.from);
      self.disconnect(connection.from, node);
    });


    // Get all its outputing nodes
    const outputs = [];
    // unsure why not regular forEach
    _.forEachRight(node.outgoing, (connection) => {
      if (mutation.SUB_NODE.keep_gates && connection.gater !== null && connection.gater !== node) {
        gates.push(connection.gater);
      }
      outputs.push(connection.to);
      self.disconnect(node, connection.to);
    });

    // Connect the input nodes to the output nodes (if not already connected)
    const connections = [];
    _.forEach(inputs, (input) => {
      _.forEach(outputs, (output) => {
        if (!input.isProjectingTo(output)) {
          const connection = self.connect(input, output);
          connections.push(connection[0]);
        }
      });
    });

    // Gate random connections with gates
    // finish after all gates have been placed again or all connections are gated
    while (gates.length > 0 && connections.length > 0) {
      const gate = gates.shift();
      const connection_to_gate_index = Math.floor(Math.random() * connections.length);

      self.gate(gate, connections[connection_to_gate_index]);
      connections.splice(connection_to_gate_index, 1);
    }

    // Remove gated connections gated by this node
    for (i = node.gated.length - 1; i >= 0; i--) {
      const connection = node.gated[i];
      self.ungate(connection);
    }

    // Remove the node from self.nodes
    self.nodes.splice(index, 1);
  }

  /**
   * Checks whether a given mutation is possible, returns an array of candidates to use for a mutation when it is.
   *
   * @function possible
   * @memberof Network
   *
   * @param {mutation} method [Mutation method](mutation)
   *
   * @returns {false | object[]} Candidates to use for a mutation. Entries may be arrays containing pairs / tuples when appropriate.
   *
   * @example
   *
   * const network = new architect.Perceptron(2,3,1)
   *
   * network.possible(mutation.SUB_NODE) // returns an array of nodes that can be removed
   */
  self.possible = function(method) {
    const self = this
    let candidates = []
    switch (method.name) {
      case "SUB_NODE": {
        candidates = _.filter(self.nodes, function(node) { return (!self.input_nodes.has(node) && !self.output_nodes.has(node)) }) // assumes input & output node 'type' has been set
        return candidates.length ? candidates : false
      }
      case "ADD_CONN": {
        for (let i = 0; i < self.nodes.length - self.output_size; i++) {
          const node1 = self.nodes[i]
          for (let j = Math.max(i + 1, self.input_size); j < self.nodes.length; j++) {
            const node2 = self.nodes[j]
            if (!node1.isProjectingTo(node2)) candidates.push([node1, node2])
          }
        }

        return candidates.length ? candidates : false
      }
      case "REMOVE_CONN": // alias for sub_conn
      case "SUB_CONN": {
        _.each(self.connections, (conn) => {
          // Check if it is not disabling a node
          if (conn.from.outgoing.length > 1 && conn.to.incoming.length > 1 && self.nodes.indexOf(conn.to) > self.nodes.indexOf(conn.from))
            candidates.push(conn)
        })

        return candidates.length ? candidates : false
      }
      case "MOD_ACTIVATION": {
        candidates = _.filter(self.nodes, method.mutateOutput ? (node) => node.type !== 'input' : (node) => node.type !== 'input' && node.type !== 'output')
        return candidates.length ? candidates : false
      }
      case "ADD_SELF_CONN": {
        for (let i = self.input_size; i < self.nodes.length; i++) {
          const node = self.nodes[i]
          if (node.connections_self.weight === 0) candidates.push(node)
        }

        return candidates.length ? candidates : false
      }
      case "SUB_SELF_CONN": {
        // Very slow implementation.
        // TODO: Huge speed up by storing a Set is_self_connection<id -> node>
        for (let i = 0; i < self.connections.length; i++) {
          const conn = self.connections[i]
          if (conn.from == conn.to) candidates.push(conn)
        }

        return candidates.length ? candidates : false
      }
      case "ADD_GATE": {
        self.connections.forEach((conn) => {
          if (conn.gater === null) {
            candidates.push(conn);
          }
        });
        return candidates.length ? candidates : false
      }
      case "SUB_GATE": {
        return (self.gates.length > 0) ? [] : false
      }
      case "ADD_BACK_CONN": {
        for (let i = self.input_size; i < self.nodes.length; i++) {
          const node1 = self.nodes[i]
          for (let j = self.input_size; j < i; j++) {
            const node2 = self.nodes[j]
            if (!node1.isProjectingTo(node2)) candidates.push([node1, node2])
          }
        }

        return candidates.length ? candidates : false
      }
      case "SUB_BACK_CONN": {
        _.each(self.connections, (conn) => {
          if (conn.from.outgoing.length > 1 && conn.to.incoming.length > 1 && self.nodes.indexOf(conn.from) > self.nodes.indexOf(conn.to))
            candidates.push(conn)
        })

        return candidates.length ? candidates : false
      }
      case "SWAP_NODES": {
        // break out early if there aren't enough nodes to swap
        if((self.nodes.length - 1) - self.input_size - (method.mutateOutput ? 0 : self.output_size) < 2) return false;

        const filterFn = (method.mutateOutput) ? (node) => (node.type !== `input`) : (node) => (node.type !== `input` && node.type !== `output`)

        candidates = _.filter(self.nodes, filterFn)

        // Check there are at least two possible nodes
        return (candidates.length >= 2) ? candidates : false
      }
    }
  }

  /**
   * Mutates the network with the given method.
   *
   * @function mutate
   * @memberof Network
   *
   * @param {mutation} method [Mutation method](mutation)
   * @param {object} options
   * @param {number} [options.maxNodes=Infinity] Maximum amount of [Nodes](node) a network can grow to
   * @param {number} [options.maxConns=Infinity] Maximum amount of [Connections](connection) a network can grow to
   * @param {number} [options.maxGates=Infinity] Maximum amount of Gates a network can grow to
   *
   * @returns {network} A mutated version of this network
   *
   * @example
   * let { Network, architect } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new architect.Perceptron(2,2)
   *
   * myNetwork = myNetwork.mutate(mutation.ADD_GATE) // returns a mutated network with an added gate
   *
   * @todo Per the NEAT spec, deactivate disconnected connections but store them at network-level connections array
   * @todo Make node management order agnostic by tracking input / outputs better
   * @todo Set node ids dictated by to & from node ids
   */
  self.mutate = function(method, options) {
    if (typeof method === 'undefined') throw new Error('Mutate method is undefined!')

    const { maxNodes, maxConns, maxGates } = options || {}

    // Helper function
    const getRandomConnection = () => {
      if(self.nodes.length <= self.input_nodes.size) // use dynamic self.input_nodes.size instead
        throw new Error("Something went wrong. Total nodes is length is somehow less than size of inputs")

      return _.sample(self.connections)
    }

    switch (method.name) {
      // Looks for an existing connection and places a node in between
      case "ADD_NODE": {
        if(self.nodes.length >= maxNodes) return null // Check user constraint

        // Only places nodes where existing connections are
        const connection = getRandomConnection()
        const from = connection.from
        const to = connection.to
        self.disconnect(from, to) // break the existing connection, TODO: this should be stored in the future as a gene (somehwere), per the NEAT spec

        /**
        * In this section we'll check the node id reference object for the key produced
        * by the cantor pairing function of the "from" & "to" node ids. If a key doesn't exist,
        * a new key, value pair is added with the value being the latest sequential id for nodes.
        * Note: this requires a sequential count to be maintained at the population level for
        * nodes & connections and it must be passed in
        */

        const node = new Node({ type: 'hidden' }) // TODO: Set an id referenced using to & from node id cantor pair as key
        if (mutation.ADD_NODE.randomActivation) node.mutate(mutation.MOD_ACTIVATION) // Should be an option passed into the Node constructor

        // Make sure new node placed between from & to nodes
        // Assumption: nodes array ordered as ["inputs", "hidden", "outputs"]
        let min_bound = self.nodes.indexOf(from) // Shouldn't use expensive ".indexOf", we should track neuron index numbers in the "to" & "from" of connections instead and access nodes later if needed
        min_bound = (min_bound >= self.input_nodes.size - 1) ? min_bound : self.input_nodes.size - 1 // make sure after to insert after all input neurons
        self.nodes.splice(min_bound + 1, 0, node) // assumes there is at least one output neuron

        // Now create two new connections
        const new_connection1 = self.connect(from, node, 1)[0] // Incoming connection weight set to 1, matches NEAT spec
        const new_connection2 = self.connect(node, to, connection.weight)[0] // Outgoing connection has previous connection weight, matches NEAT spec

        const gater = connection.gater
        if (gater != null) self.gate(gater, Math.random() >= 0.5 ? new_connection1 : new_connection2) // Check if the original connection was gated

        return self
      }
      case "SUB_NODE": {
        const possible = self.possible(method)
        if (possible) {
          self.remove(_.sample(possible))
          return self
        }
        return null
      }
      case "ADD_CONN": {
        if(self.connections.length >= maxConns) return null // Check user constraint

        const possible = self.possible(method)
        if (possible) {
          const pair = possible[Math.floor(Math.random() * possible.length)]
          self.connect(pair[0], pair[1])
          return self
        }

        return null
      }
      case "REMOVE_CONN": // alias for sub_conn
      case "SUB_CONN": {
        const possible = self.possible(method)
        if (possible) {
          const chosen = _.sample(possible)
          self.disconnect(chosen.from, chosen.to)
          return self
        }

        return null
      }
      case "MOD_WEIGHT": {
        const chosen_connection = getRandomConnection() // get a random connection to modify weight
        chosen_connection.weight += Math.random() * (method.max - method.min) + method.min

        return self
      }
      case "MOD_BIAS": {
        if (self.nodes.length <= self.input_size) return null;
        // Has no effect on input nodes, so they (should be) excluded, TODO -- remove this ordered array of: input, output, hidden nodes assumption...
        const node_to_mutate = self.nodes[Math.floor(Math.random() * (self.nodes.length - self.input_size) + self.input_size)]
        node_to_mutate.mutate(method)

        return self
      }
      case "MOD_ACTIVATION": {
        const possible = self.possible(method)
        if (possible) {
          _.sample(possible).mutate(method) // Mutate a random node out of filtered collection, MOD_ACTIVATION is a neuron-level concern
          return self
        }
        return null
      }
      case "ADD_SELF_CONN": {
        const possible = self.possible(method)
        if (possible) {
          const node = possible[Math.floor(Math.random() * possible.length)]
          self.connect(node, node) // Create the self-connection
          return self
        }
        return null
      }
      case "SUB_SELF_CONN": {
        const possible = self.possible(method)
        if (possible) {
          const chosen_connection = possible[Math.floor(Math.random() * possible.length)];
          self.disconnect(chosen_connection.from, chosen_connection.to);
          return self
        }
        return null;
      }
      case "ADD_GATE": {
        // Check user constraint
        if(self.gates.length >= maxGates) return null

        const possible = self.possible(method)
        if (possible) {
          // Select a random gater node and connection, can't be gated by input | makes ["input", "hidden", "output"] assumption
          const node = self.nodes[Math.floor(Math.random() * (self.nodes.length - self.input_size) + self.input_size)]
          const conn = possible[Math.floor(Math.random() * possible.length)]

          self.gate(node, conn) // Gate the connection with the node
          return self
        }
        return null
      }
      case "SUB_GATE": {
        if (self.possible(method)) {
          self.ungate(self.gates[Math.floor(Math.random() * self.gates.length)])
          return self
        }
        return null
      }
      case "ADD_BACK_CONN": {
        const possible = self.possible(method)
        if (possible) {
          const pair = possible[Math.floor(Math.random() * possible.length)]
          self.connect(pair[0], pair[1])
          return self
        }
        return null
      }
      case "SUB_BACK_CONN": {
        const possible = self.possible(method)
        if (possible) {
          const random_connection = possible[Math.floor(Math.random() * possible.length)]
          self.disconnect(random_connection.from, random_connection.to)
          return self
        }
        return null
      }
      case "SWAP_NODES": {
        const possible = self.possible(method)
        if (possible) {
          // Return a random node out of the filtered collection
          const node1 = _.sample(possible)

          // Filter node1 from collection
          const possible2 = _.filter(possible, (node, index) => node !== node1)

          // Get random node from filtered collection (excludes node1)
          const node2 = _.sample(possible2)

          const bias_temp = node1.bias
          const squash_temp = node1.squash

          node1.bias = node2.bias
          node1.squash = node2.squash
          node2.bias = bias_temp
          node2.squash = squash_temp
          return self
        }

        return null
      }
    }
  }

  /**
   * Selects a random mutation method and returns a mutated copy of the network. Warning! Mutates network directly.
   *
   * @function mutateRandom
   *
   * @alpha
   *
   * @memberof Network
   *
   * @param {mutation[]} [allowedMethods=methods.mutation.ALL] An array of [Mutation methods](mutation) to automatically pick from
   * @param {object} options
   * @param {number} [options.maxNodes=Infinity] Maximum amount of [Nodes](node) a network can grow to
   * @param {number} [options.maxConns=Infinity] Maximum amount of [Connections](connection) a network can grow to
   * @param {number} [options.maxGates=Infinity] Maximum amount of Gates a network can grow to
   *
   * @returns {network} A mutated version of this network
   */
  self.mutateRandom = function(allowedMethods, options) {
    const possible = (Array.isArray(allowedMethods) && allowedMethods.length) ? _.cloneDeep(allowedMethods) : _.cloneDeep(methods.mutation.ALL)

    while(possible.length > 0) {
      const x = Math.floor(Math.random() * possible.length)
      const current = possible[x]

      if(self.mutate(current, options)) return self

      possible.splice(x,1)
    }

    // Return null when mutation is impossible
    return null
  }

  /**
   * Train the given data to this network
   *
   * @function train
   * @memberof Network
   *
   * @param {Array<{input:number[],output:number[]}>} data A data of input values and ideal output values to train the network with
   * @param {Object} options Options used to train network
   * @param {options.cost} [options.cost=options.cost.MSE] The [options.cost function](https://en.wikipedia.org/wiki/Loss_function) used to determine network error
   * @param {rate} [options.rate_policy=rate.FIXED] A [learning rate policy](https://towardsdatascience.com/understanding-learning-rates-and-how-it-improves-performance-in-deep-learning-d0d4059c1c10), i.e. how to change the learning rate during training to get better network performance
   * @param {number} [options.rate=0.3] Sets the [learning rate](https://towardsdatascience.com/understanding-learning-rates-and-how-it-improves-performance-in-deep-learning-d0d4059c1c10) of the backpropagation process
   * @param {number} [options.iterations=1000] Sets amount of training cycles the process will maximally run, even when the target error has not been reached.
   * @param {number} [options.error] The target error to train for, once the network falls below this error, the process is stopped. Lower error rates require more training cycles.
   * @param {number} [options.dropout=0] [Dropout rate](https://medium.com/@amarbudhiraja/https-medium-com-amarbudhiraja-learning-less-to-learn-better-options.dropout-in-deep-machine-learning-74334da4bfc5) likelihood for any given neuron to be ignored during network training. Must be between zero and one, numbers closer to one will result in more neurons ignored.
   * @param {number} [options.momentum=0] [Momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html). Adds a fraction of the previous weight update to the current one.
   * @param {number} [options.batch_size=1] Sets the (mini-) batch size of your training. Default: 1 [(online training)](https://www.quora.com/What-is-the-difference-between-batch-online-and-mini-batch-training-in-neural-networks-Which-one-should-I-use-for-a-small-to-medium-sized-dataset-for-prediction-purposes)
   * @param {number} [options.cross_validate.testSize] Sets the amount of test cases that should be assigned to cross validation. If data to 0.4, 40% of the given data will be used for cross validation.
   * @param {number} [options.cross_validate.test_error] Sets the target error of the validation data.
   * @param {boolean} [options.clear=false] If set to true, will clear the network after every activation. This is useful for training LSTM's, more importantly for timeseries prediction.
   * @param {boolean} [options.shuffle=false] When set to true, will shuffle the training data every iteration_number. Good option to use if the network is performing worse in [cross validation](https://artint.info/html/ArtInt_189.html) than in the real training data.
   * @param {number|boolean} [options.log=false] If set to n, outputs training status every n iterations. Setting `log` to 1 will log the status every iteration_number
   * @param {number} [options.schedule.iterations] You can schedule tasks to happen every n iterations. Paired with `options.schedule.function`
   * @param {schedule} [options.schedule.function] A function to run every n iterations as data by `options.schedule.iterations`. Passed as an object with a "function" property that contains the function to run.
   *
   * @returns {{error:{number},iterations:{number},time:{number}}} A summary object of the network's performance
   *
   * @example <caption>Training with Defaults</caption>
   * let { Network, architect } = require("@liquid-carrot/carrot");
   *
   * let network = new architect.Perceptron(2,4,1);
   *
   * // Train the XOR gate
   * network.train([{ input: [0,0], output: [0] },
   *                { input: [0,1], output: [1] },
   *                { input: [1,0], output: [1] },
   *                { input: [1,1], output: [0] }]);
   *
   * network.activate([0,1]); // 0.9824...
   *
   * @example <caption>Training with Options</caption>
   * let { Network, architect } = require("@liquid-carrot/carrot");
   *
   * let network = new architect.Perceptron(2,4,1);
   *
   * let trainingSet = [
   *    { input: [0,0], output: [0] },
   *    { input: [0,1], output: [1] },
   *    { input: [1,0], output: [1] },
   *    { input: [1,1], output: [0] }
   * ];
   *
   * // Train the XNOR gate
   * network.train(trainingSet, {
   *    log: 1,
   *    iterations: 1000,
   *    error: 0.0001,
   *    rate: 0.2
   * });
   *
   * @example <caption>Cross Validation Example</caption>
   * let { Network, architect } = require("@liquid-carrot/carrot");
   *
   * let network = new architect.Perceptron(2,4,1);
   *
   * let trainingSet = [ // PS: don't use cross validation for small sets, this is just an example
   *  { input: [0,0], output: [1] },
   *  { input: [0,1], output: [0] },
   *  { input: [1,0], output: [0] },
   *  { input: [1,1], output: [1] }
   * ];
   *
   * // Train the XNOR gate
   * network.train(trainingSet, {
   *  crossValidate:
   *    {
   *      testSize: 0.4,
   *      test_error: 0.02
   *    }
   * });
   *
   */
  self.train = function(data, options) {
    // the or in the size is for backward compatibility
    if (data[0].input.length !== (self.input_size || self.input) || data[0].output.length !== (self.output_size || self.output)) {
      throw new Error(`Dataset input/output size should be same as network input/output size!`);
    }

    // Warning messages
    if (config.warnings && options) {
      if (typeof options.rate === `undefined`) {
        console.warn(`Using default learning rate, please define a rate!`);
      }
      if (typeof options.iterations === `undefined`) {
        console.warn(`No target iterations given, running until error is reached!`);
      }
    }

    // backwards compatibility
    if (options) {
      options = _.defaults(options, {
        batch_size: options.batchSize,
        rate_policy: options.ratePolicy,
        cross_validate: options.crossValidate
      });
    }

    // data defaults and read the options
    options = _.defaults(options, {
      iterations: 1000,
      error: 0.05,
      cost: methods.cost.MSE,
      rate: 0.3,
      dropout: 0,
      momentum: 0,
      batch_size: 1, // online learning
      rate_policy: methods.rate.FIXED
    });

    // if cross validation is data, target error might be higher than crossValidate.test_error,
    // so if CV is data then also data target error to crossvalidate error
    let target_error;
    if (options.cross_validate) {
      target_error = options.cross_validate.test_error;
    } else if (options.error) {
      target_error = options.error;
    } else {
      target_error = -1; // run until iterations
    }
    const base_training_rate = options.rate;

    const start = Date.now();

    // check for errors
    if (options.batch_size > data.length) {
      throw new Error(`Batch size must be smaller or equal to dataset length!`);
    } else if (typeof options.iterations === `undefined` && typeof options.error === `undefined`) {
      throw new Error(`At least one of the following options must be specified: error, iterations`);
    } else if (typeof options.iterations === `undefined`) {
      options.iterations = 0; // run until target error
    }

    // get cross validation error (if on)
    let training_set_size, train_set, test_set;
    if (options.cross_validate) {
      training_set_size = Math.ceil((1 - options.cross_validate.testSize) * data.length);
      train_set = data.slice(0, training_set_size);
      test_set = data.slice(training_set_size);
    } else {
      train_set = data;
    }

    // Loops the training process
    let current_training_rate = base_training_rate;
    let iteration_number = 0;
    let error = 1;

    var i, j, x;
    while (error > target_error && (options.iterations === 0 ||
      iteration_number < options.iterations)) {
      iteration_number++;

      // Update the rate
      current_training_rate = options.rate_policy(base_training_rate, iteration_number);

      // run on training epoch
      const train_error = self._trainOneEpoch(
        train_set, options.batch_size, current_training_rate, options.momentum, options.cost, {dropout_rate: options.dropout});
      if (options.clear) self.clear();
      // Checks if cross validation is enabled
      if (options.cross_validate) {
        error = self.test(test_set, options.cost).error;
        if (options.clear) self.clear();
      } else {
        error = train_error;
      }

      // Checks for options such as scheduled logs and shuffling
      if (options.shuffle) {
        // just a horrible shuffle - black magic ahead (not that bad but looks like witchery)
        for (j, x, i = data.length; i;
          j = Math.floor(Math.random() * i), x = data[--i], data[i] = data[j], data[j] = x);
      }

      if (options.log && iteration_number % options.log === 0) {
        console.log(`iteration number`, iteration_number,
          `error`, error, `training rate`, current_training_rate);
      }

      if (options.schedule && iteration_number % options.schedule.iterations === 0) {
        options.schedule.function({ error: error, iteration_number: iteration_number });
      }
    }

    if (options.clear) self.clear();

    return {
      error: error,
      iterations: iteration_number,
      time: Date.now() - start
    };
  }

  /**
   * Performs one training epoch and returns the error - this is a private function used in `self.train`
   *
   * @todo Add `@param` tag descriptions
   * @todo Add `@returns` tag description
   *
   * @private
   *
   * @param {Array<{input:number[], output: number[]}>} set
   * @param {number} batch_size
   * @param {number} current_training_rate
   * @param {number} momentum
   * @param {cost} cost_function
   * @param {number} [options.dropout_rate=0.5] The dropout rate to use when training
   *
   * @returns {number}
   *
   * @example
   * let { Network } = require("@liquid-carrot/carrot");
   *
   * let example = ""
   */
  self._trainOneEpoch = function(set, batch_size, training_rate, momentum, cost_function, { dropout_rate = 0.5 } = {}) {
    let error_sum = 0;
    for (var i = 0; i < set.length; i++) {
      const input = set[i].input;
      const correct_output = set[i].output;

      // the !! turns to boolean
      const update = !!((i + 1) % batch_size === 0 || (i + 1) === set.length);

      const output = self.activate(input, { dropout_rate: dropout_rate });
      self.propagate(training_rate, momentum, update, correct_output);

      error_sum += cost_function(correct_output, output);
    }
    return error_sum / set.length;
  }

  /**
   * Tests a set and returns the error and elapsed time
   *
   * @function test
   * @memberof Network
   *
   * @param {Array<{input:number[],output:number[]}>} set A set of input values and ideal output values to test the network against
   * @param {cost} [cost=methods.cost.MSE] The [cost function](https://en.wikipedia.org/wiki/Loss_function) used to determine network error
   *
   * @returns {{error:{number},time:{number}}} A summary object of the network's performance
   *
   */
  self.test = function(set, cost = methods.cost.MSE) {
    let error = 0;
    let start = Date.now();

    _.times(set.length, (index) => {
      let input = set[index].input;
      let target = set[index].output;
      let output = self.activate(input, { trace: false });
      error += cost(target, output);
    });

    error /= set.length;

    const results = {
      error: error,
      time: Date.now() - start
    };

    return results;
  }

  /**
   * Convert the network to a json object
   *
   * @function toJSON
   * @memberof Network
   *
   * @returns {{node:{object},connections:{object},input_size:{number},output_size:{number},dropout:{number}}} The network represented as a json object
   *
   * @example
   * let { Network } = require("@liquid-carrot/carrot");
   *
   * let exported = myNetwork.toJSON();
   * let imported = Network.fromJSON(exported) // imported will be a new instance of Network that is an exact clone of myNetwork
   */
  self.toJSON = function() {
    // 0, 1, 2, 3, 16, 17, 18, 19, 20, 24, 28, 32. all of these leave from node 0, but
    // node 0 only has 4 outgoing connections..

    const json = {
      nodes: [],
      connections: [],
      input_nodes: [],
      output_nodes: [],
      input_size: self.input_size,
      output_size: self.output_size,
      dropout: self.dropout,
      // backward compatibility
      input: self.input_size,
      output: self.output_size,
    };

    let i;
    for (i = 0; i < self.nodes.length; i++) {
      // So we don't have to use expensive .indexOf()
      self.nodes[i].index = i;
      if (self.input_nodes.has(self.nodes[i])) {
        json.input_nodes.push(i);
      }
      if (self.output_nodes.has(self.nodes[i])) {
        json.output_nodes.push(i);
      }
    }

    for (i = 0; i < self.nodes.length; i++) {
      const node = self.nodes[i];
      const node_json = node.toJSON();
      node_json.index = i;
      json.nodes.push(node_json);

      if (node.connections_self.weight !== 0) {
        const connection_json = node.connections_self.toJSON();
        connection_json.from = i;
        connection_json.to = i;

        connection_json.gater = node.connections_self.gater != null ? node.connections_self.gater.index : null;
        json.connections.push(connection_json);
      }
    }

    for (i = 0; i < self.connections.length; i++) {
      const connection = self.connections[i];
      const connection_json = connection.toJSON();
      connection_json.from = connection.from.index;
      connection_json.to = connection.to.index;

      connection_json.gater = connection.gater != null ? connection.gater.index : null;

      json.connections.push(connection_json);
    }

    return json;
  }

  /**
   * Sets the value of a property for every node in this network
   *
   * @function set
   * @memberof Network
   *
   * @param {number} values.bias Bias to set for all network nodes
   * @param {activation} values.squash [Activation function](https://medium.com/the-theory-of-everything/understanding-activation-functions-in-neural-networks-9491262884e0) to set for all network nodes
   *
   * @example
   * let { Network, architect } = require("@liquid-carrot/carrot");
   *
   * var network = new architect.Random(4, 4, 1);
   *
   * // All nodes in 'network' now have a bias of 1
   * network.set({bias: 1});
   */
  self.set = function(values) {
    self.nodes.forEach(node => Object.assign(node, {
      bias: values.bias,
      squash: values.squash
    }));
  }

  /**
   * Evolves the network to reach a lower error on a dataset using the [NEAT algorithm](http://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf)
   *
   * If both `iterations` and `error` options are unset, evolve will default to `iterations` as an end condition.
   *
   * @function evolve
   * @memberof Network
   *
   * @param {Array<{input:number[],output:number[]}>} dataset A set of input values and ideal output values to train the network with
   * @param {object} [options] Configuration options
   * @param {number} [options.iterations=1000] Set the maximum amount of iterations/generations for the algorithm to run.
   * @param {number} [options.error=0.05] Set the target error. The algorithm will stop once this target error has been reached.
   * @param {number} [options.growth=0.0001] Set the penalty for large networks. Penalty calculation: penalty = (genome.nodes.length + genome.connectoins.length + genome.gates.length) * growth; This penalty will get added on top of the error. Your growth should be a very small number.
   * @param {cost} [options.cost=cost.MSE]  Specify the cost function for the evolution, this tells a genome in the population how well it's performing. Default: methods.cost.MSE (recommended).
   * @param {number} [options.amount=1] Set the amount of times to test the trainingset on a genome each generation. Useful for timeseries. Do not use for regular feedfoward problems.
   * @param {number} [options.threads] Specify the amount of threads to use. Default value is the amount of cores in your CPU.
   * @param {Network} [options.network]
   * @param {number|boolean} [options.log=false] If set to n, outputs training status every n iterations. Setting `log` to 1 will log the status every iteration
   * @param {number} [options.schedule.iterations] You can schedule tasks to happen every n iterations. Paired with `options.schedule.function`
   * @param {schedule} [options.schedule.function] A function to run every n iterations as set by `options.schedule.iterations`. Passed as an object with a "function" property that contains the function to run.
   * @param {boolean} [options.clear=false] If set to true, will clear the network after every activation. This is useful for evolving recurrent networks, more importantly for timeseries prediction.
   * @param {boolean} [options.equal=true] If set to true when [Network.crossOver](Network.crossOver) runs it will assume both genomes are equally fit.
   * @param {number} [options.population_size=50] Population size of each generation.
   * @param {number} [options.elitism=1] Elitism of every evolution loop. [Elitism in genetic algorithms.](https://www.researchgate.net/post/What_is_meant_by_the_term_Elitism_in_the_Genetic_Algorithm)
   * @param {number} [options.provenance=0] Number of genomes inserted into the original network template (Network(input,output)) per evolution.
   * @param {number} [options.mutation_rate=0.4] Sets the mutation rate. If set to 0.3, 30% of the new population will be mutated.
   * @param {number} [options.mutation_amount=1] If mutation occurs (randomNumber < mutation_rate), sets amount of times a mutation method will be applied to the network.
   * @param {boolean} [options.fitness_population=true] Flag to return the fitness of a population of genomes. false => evaluate each genome individually. true => evaluate entire population. Adjust fitness function accordingly
   * @param {Function} [options.fitness] - A fitness function to evaluate the networks. Takes a `genome`, i.e. a [network](Network), and a `dataset` and sets the genome's score property
   * @param {string} [options.selection=FITNESS_PROPORTIONATE] [Selection method](selection) for evolution (e.g. methods.Selection.FITNESS_PROPORTIONATE).
   * @param {Array} [options.crossover] Sets allowed crossover methods for evolution.
   * @param {Array} [options.mutation] Sets allowed [mutation methods](mutation) for evolution, a random mutation method will be chosen from the array when mutation occurs. Optional, but default methods are non-recurrent.
   * @param {number} [options.max_nodes=Infinity] Maximum nodes for a potential network
   * @param {number} [options.maxConns=Infinity] Maximum connections for a potential network
   * @param {number} [options.maxGates=Infinity] Maximum gates for a potential network
   * @param {function} [options.mutationSelection=random] Custom mutation selection function if given
   * @param {boolean} [options.efficientMutation=false] Test & reduce [mutation methods](mutation) to avoid failed mutation attempts
   *
   * @returns {{error:{number},iterations:{number},time:{number}}} A summary object of the network's performance. <br /> Properties include: `error` - error of the best genome, `iterations` - generations used to evolve networks, `time` - clock time elapsed while evolving
   *
   * @example
   * let { Network, methods } = require("@liquid-carrot/carrot");
   *
   * async function execute () {
   *    var network = new Network(2,1);
   *
   *    // XOR dataset
   *    var trainingSet = [
   *        { input: [0,0], output: [0] },
   *        { input: [0,1], output: [1] },
   *        { input: [1,0], output: [1] },
   *        { input: [1,1], output: [0] }
   *    ];
   *
   *    await network.evolve(trainingSet, {
   *        mutation: methods.mutation.FFW,
   *        equal: true,
   *        error: 0.05,
   *        elitism: 5,
   *        mutation_rate: 0.5
   *    });
   *
   *    // another option
   *    // await network.evolve(trainingSet, {
   *    //     mutation: methods.mutation.FFW,
   *    //     equal: true,
   *    //     error: 0.05,
   *    //     elitism: 5,
   *    //     mutation_rate: 0.5,
   *    //     cost: (targets, outputs) => {
   *    //       const error = outputs.reduce(function(total, value, index) {
   *    //         return total += Math.pow(targets[index] - outputs[index], 2);
   *    //       }, 0);
   *    //
   *    //       return error / outputs.length;
   *    //     }
   *    // });
   *
   *
   *    network.activate([0,0]); // 0.2413
   *    network.activate([0,1]); // 1.0000
   *    network.activate([1,0]); // 0.7663
   *    network.activate([1,1]); // -0.008
   * }
   *
   * execute();
   */
  self.evolve = async function(dataset, options) {
    if (dataset[0].input.length !== (self.input_size || self.input) || dataset[0].output.length !== (self.output_size || self.output)) {
      throw new Error(`Dataset input/output size should be same as network input/output size!`);
    }

    // Read the options
    options = options || {};

    // Deal with complex default values first (cases where default depends on conditions)
    let target_error;
    if (typeof options.iterations === `undefined` && typeof options.error === `undefined`) {
      options.iterations = 1000; // limit in case network is not converging
      target_error = 0.05
    } else if (options.iterations) {
      target_error = -1; // run until iterations
    } else if (options.error) {
      target_error = options.error;
      options.iterations = 0; // run until target error
    }

    // backward compatibility
    options = _.defaults(options, {
      fitness_population: options.fitnessPopulation,
      max_nodes: options.maxNodes,
      max_connections: options.maxConns,
      max_gates: options.maxGates=Infinity,
      mutation_selection: options.mutationSelection,
      efficient_mutation: options.efficientMutation,
    });

    // set default values
    options = _.defaults(options, {
      threads: (typeof window === `undefined`) ? require(`os`).cpus().length : navigator.hardwareConcurrency,
      growth: (typeof options.growth !== `undefined`) ? options.growth : 0.0001,
      cost: methods.cost.MSE,
      amount: 1,
      fitness_population: false,
      max_nodes: Infinity,
      max_connections: Infinity,
      max_gates: Infinity,
      efficient_mutation: false,
      // mutation_selection: random // TODO: actually use it
    });

    const default_dataset = dataset;

    const start = Date.now();

    // Serialize the dataset
    const serialized_dataset = multi.serializeDataSet(dataset);

    // Create workers, send datasets
    const workers = [];
    if (typeof window === `undefined`) {
      for (var i = 0; i < options.threads; i++) workers.push(new multi.workers.node.TestWorker(serialized_dataset, options.cost));
    } else {
      for (var i = 0; i < options.threads; i++) workers.push(new multi.workers.browser.TestWorker(serialized_dataset, options.cost));
    }

    options.fitness = function (dataset, population) {
      return new Promise((resolve, reject) => {
        // Create a queue
        const queue = population.slice();
        let done = 0;
        // Start worker function
        const start_worker = function (worker) {
          if (!queue.length) {
            if (++done === options.threads) resolve();
            return;
          }

          const genome = queue.shift();

          worker.evaluate(genome).then(function (result) {
            genome.score = -result;
            genome.score -= (genome.nodes.length - genome.input_size - genome.output_size + genome.connections.length + genome.gates.length) * options.growth;
            genome.score = isNaN(parseFloat(result)) ? -Infinity : genome.score;
            start_worker(worker);
          });
        };

        for (let i = 0; i < workers.length; i++) {
          start_worker(workers[i]);
        }
      });
    };

    options.fitness_population = true;


    // Intialise the NEAT instance
    options.network = this;
    options.input = self.input_size;
    options.output = self.output_size;
    const neat = new Neat(dataset, options);

    let error = -Infinity;
    let best_fitness = -Infinity;
    let best_genome;

    while (error < -target_error && (options.iterations === 0 || neat.generation < options.iterations)) {
      // neat.evolve returns a network
      const fittest = await neat.evolve();
      const fitness = fittest.score;
      error = fitness + (fittest.nodes.length - fittest.input - fittest.output + fittest.connections.length + fittest.gates.length) * options.growth;

      if (fitness > best_fitness) {
        best_fitness = fitness;
        best_genome = fittest;
      }

      if (options.log && neat.generation % options.log === 0) {
        console.log(`iteration`, neat.generation, `fitness`, fitness, `error`, -error);
      }

      if (options.schedule && neat.generation % options.schedule.iterations === 0) {
        options.schedule.function({ fitness: fitness, error: -error, iteration: neat.generation });
      }
    }

    for (let i = 0; i < workers.length; i++) workers[i].terminate();

    if (typeof best_genome !== `undefined`) {
      // copy the best network into this one
      self.nodes = best_genome.nodes;
      self.connections = best_genome.connections;
      self.gates = best_genome.gates;
      self.input_nodes = best_genome.input_nodes;
      self.output_nodes = best_genome.output_nodes;

      if(options.clear) self.clear();
    }

    return {
      error: -error,
      iterations: neat.generation,
      time: Date.now() - start,
    };
  }

  /**
   * Creates a standalone function of the network which can be run without the need of a library
   *
   * @function standalone
   * @memberof Network
   *
   * @returns {string} Function as a string that can be eval'ed
   *
   * @example
   * let { Network, architect } = require("@liquid-carrot/carrot");
   *
   * var myNetwork = new architect.Perceptron(2,4,1);
   * myNetwork.activate([0,1]); // [0.24775789809]
   *
   * // a string
   * var standalone = myNetwork.standalone();
   *
   * // turns your network into an 'activate' function
   * eval(standalone);
   *
   * // calls the standalone function
   * activate([0,1]);// [0.24775789809]
   */
  self.standalone = function() {
    const present = [];
    const activations = [];
    const states = [];
    const lines = [];
    const functions = [];

    // get input nodes
    for (let i = 0; i < self.input_size; i++) {
      var node = self.nodes[i];
      activations.push(node.activation);
      states.push(node.state);
    }

    lines.push(`for(var i = 0; i < input.length; i++) A[i] = input[i];`);

    // So we don't have to use expensive .indexOf()
    for (i = 0; i < self.nodes.length; i++) {
      self.nodes[i].index = i;
    }

    for (i = self.input_size; i < self.nodes.length; i++) {
      let node = self.nodes[i];
      activations.push(node.activation);
      states.push(node.state);

      let function_index = present.indexOf(node.squash.name);

      if (function_index === -1) {
        function_index = present.length;
        present.push(node.squash.name);
        functions.push(node.squash.toString());
      }

      const incoming = [];
      for (var j = 0; j < node.incoming.length; j++) {
        const connection = node.incoming[j];
        if (connection.from.index === undefined) debugger;
        let computation = `A[${connection.from.index}] * ${connection.weight}`;

        if (connection.gater != null) {
          computation += ` * A[${connection.gater.index}]`;
        }

        incoming.push(computation);
      }

      if (node.connections_self.weight) {
        const connection = node.connections_self;
        let computation = `S[${i}] * ${connection.weight}`;

        if (connection.gater != null) {
          computation += ` * A[${connection.gater.index}]`;
        }

        incoming.push(computation);
      }

      // the number indicates the order of execution
      const line1 = `S[${i}] = ${incoming.join(` + `)} + ${node.bias};`;
      const line2 = `A[${i}] = F[${function_index}](S[${i}])${!node.mask ? ` * ` + node.mask : ``};`;
      lines.push(line1);
      lines.push(line2);
    }

    let output = [];
    for (i = self.nodes.length - self.output_size; i < self.nodes.length; i++) {
      output.push(`A[${i}]`);
    }

    output = `return [${output.join(`,`)}];`;
    lines.push(output);

    let total = ``;
    total += `var F = [${functions.toString()}];\r\n`;
    total += `var A = [${activations.toString()}];\r\n`;
    total += `var S = [${states.toString()}];\r\n`;
    total += `function activate(input){\r\n${lines.join(`\r\n`)}\r\n}`;

    return total;
  }

  /**
   * Serialize to send to workers efficiently
   *
   * @returns {Array<number[]>} 3 `Float64Arrays`. Used for transferring networks to other threads fast.
   */
  self.serialize = function () {
    const activations = [];
    const states = [];
    const connections = [];
    const squashes = [
      `LOGISTIC`, `TANH`, `IDENTITY`, `STEP`, `RELU`, `SOFTSIGN`, `SINUSOID`,
      `GAUSSIAN`, `BENT_IDENTITY`, `BIPOLAR`, `BIPOLAR_SIGMOID`, `HARD_TANH`,
      `ABSOLUTE`, `INVERSE`, `SELU`
    ];

    connections.push(self.input_size);
    connections.push(self.output_size);

    let node_index_counter = 0;
    _.forEach(self.nodes, (node) => {
      node.index = node_index_counter;
      node_index_counter++;
      activations.push(node.activation);
      states.push(node.state);
    });

    for (let node_index = self.input_size; node_index < self.nodes.length; node_index++) {
      const node = self.nodes[node_index];
      connections.push(node.index);
      connections.push(node.bias);
      connections.push(squashes.indexOf(node.squash.name));

      connections.push(node.connections_self.weight);
      connections.push(node.connections_self.gater == null ? -1 : node.connections_self.gater.index);

      _.times(node.incoming.length, (incoming_connections_index) => {
        const connection = node.incoming[incoming_connections_index];

        connections.push(connection.from.index);
        connections.push(connection.weight);
        connections.push(connection.gater == null ? -1 : connection.gater.index);
      });

      connections.push(-2); // stop token -> next node
    }

    return [activations, states, connections];
  }

  /**
   * Add the nodes to the network
   * @param  {Node|Node[]|Group} nodes The nodes to add
   * @return {Network} A self reference for chaining
   */
  self.addNodes = function (nodes) {
    if (nodes instanceof Node) nodes = [nodes];
    else if (nodes instanceof Group) nodes = nodes.nodes;
    self.nodes.push(...nodes);
    for (let i = 0; i < nodes.length; i++) {
      // not required to push connections incoming. by pushing every outgoing connection,
      // every incoming connection will be pushed as well. pushing both causes duplicates
      self.connections.push(...nodes[i].outgoing)
      self.gates.push(...nodes[i].gated)
      if(nodes[i].connections_self.weight) self.connections.push(nodes[i].connections_self)
    }
  }
}

/**
 * Convert a json object to a network
 *
 * @param {{input:{number},output:{number},dropout:{number},nodes:Array<object>,connections:Array<object>}} json A network represented as a json object
 *
 * @returns {Network} Network A reconstructed network
 *
 * @example
 * let { Network } = require("@liquid-carrot/carrot");
 *
 * let exported = myNetwork.toJSON();
 * let imported = Network.fromJSON(exported) // imported will be a new instance of Network that is an exact clone of myNetwork
 */
Network.fromJSON = function(json) {
  // TODO: Match new network input/output nodes with json.input nodes and json.output nodes

  const network = new Network(json.input_size, json.output_size);

  network.dropout = json.dropout;
  network.nodes = [];
  network.connections = [];
  network.input_nodes = new Set();
  network.output_nodes = new Set();

  json.nodes.forEach((node_json, index) => {
    const node = Node.fromJSON(node_json);
    node.index = index;
    network.nodes.push(node);
  });

  json.connections.forEach((json_connection) => {
    const connection =
    network.connect(network.nodes[json_connection.from], network.nodes[json_connection.to])[0];
    connection.weight = json_connection.weight;

    if (json_connection.gater != null) network.gate(network.nodes[json_connection.gater], connection);
  });

  json.input_nodes.forEach(node_index => network.input_nodes.add(network.nodes[node_index]))
  json.output_nodes.forEach(node_index => network.output_nodes.add(network.nodes[node_index]))

  return network;
}

/**
 * Merge two networks into one.
 *
 * The merge functions takes two networks, the output size of `network1` should be the same size as the input of `network2`. Merging will always be one to one to conserve the purpose of the networks.
 *
 * @param {Network} network1 Network to merge
 * @param {Network} network2 Network to merge
 * @returns {Network} Network Merged Network
 *
 * @example
 * let { Network, architect } = require("@liquid-carrot/carrot");
 *
 * let XOR = architect.Perceptron(2,4,1); // assume this is a trained XOR
 * let NOT = architect.Perceptron(1,2,1); // assume this is a trained NOT
 *
 * // combining these will create an XNOR
 * let XNOR = Network.merge(XOR, NOT);
 */
Network.merge = function(network1, network2) {
  // Create a copy of the networks
  network1 = Network.fromJSON(network1.toJSON());
  network2 = Network.fromJSON(network2.toJSON());

  // Check if output and input size are the same
  if (network1.output_size !== network2.input_size) {
    throw new Error(`Output size of network1 should be the same as the input size of network2!`);
  }

  // Redirect all connections from network2 input from network1 output
  let i;
  for (i = 0; i < network2.connections.length; i++) {
    const connection = network2.connections[i];
    if (connection.from.type === `input`) {
      let index = network2.nodes.indexOf(connection.from);

      // redirect
      connection.from = network1.nodes[network1.nodes.length - 1 - index];
    }
  }

  // Delete input nodes of network2
  for (i = network2.input - 1; i >= 0; i--) {
    network2.nodes.splice(i, 1);
  }

  // Change the node type of network1's output nodes (now hidden)
  for (i = network1.nodes.length - network1.output; i < network1.nodes.length; i++) {
    network1.nodes[i].type = `hidden`;
  }

  // Create one network from both networks
  network1.connections = network1.connections.concat(network2.connections);
  network1.nodes = network1.nodes.concat(network2.nodes);

  return network1;
}

/**
 * Create an offspring from two parent networks.
 *
 * Networks are not required to have the same size, however input and output size should be the same!
 *
 * @todo Add custom [crossover](crossover) method customization
 *
 * @param {Network} network1 First parent network
 * @param {Network} network2 Second parent network
 * @param {boolean} [equal] Flag to indicate equally fit Networks
 *
 * @returns {Network} New network created from mixing parent networks
 *
 * @example
 * let { Network, architect } = require("@liquid-carrot/carrot");
 *
 * // Initialise two parent networks
 * let network1 = new architect.Perceptron(2, 4, 3);
 * let network2 = new architect.Perceptron(2, 4, 5, 3);
 *
 * // Produce an offspring
 * let network3 = Network.crossOver(network1, network2);
 */
Network.crossOver = function(network1, network2, equal) {
  // crossover works really really bad - although it works (I guess)
  // TODO: refactor
  if (network1.input_size !== network2.input_size || network1.output_size !== network2.output_size) {
    throw new Error("Networks don`t have the same input/output size!");
  }

  // Initialise offspring
  const offspring = new Network(network1.input_size, network1.output_size);
  offspring.connections = [];
  offspring.nodes = [];
  offspring.input_nodes = new Set();
  offspring.output_nodes = new Set();

  // Save scores and create a copy
  const score1 = network1.score || 0;
  const score2 = network2.score || 0;

  // Determine offspring node size
  let offspring_size;
  if (equal || score1 === score2) {
    const max = Math.max(network1.nodes.length, network2.nodes.length);
    const min = Math.min(network1.nodes.length, network2.nodes.length);
    offspring_size = Math.floor(Math.random() * (max - min + 1) + min);
  } else if (score1 > score2) {
    offspring_size = network1.nodes.length;
  } else {
    offspring_size = network2.nodes.length;
  }

  // Rename some variables for easier reading
  // both networks (should) have equal input/output size
  const input_size = network1.input_size;
  const output_size = network1.output_size;

  // Set indexes so we don't need indexOf
  let i;
  for (i = 0; i < network1.nodes.length; i++) {
    network1.nodes[i].index = i;
  }

  for (i = 0; i < network2.nodes.length; i++) {
    network2.nodes[i].index = i;
  }

  // Assign nodes from parents to offspring
  for (i = 0; i < offspring_size; i++) {
    // TODO: First assign input and output nodes, then get hidden nodes
    // SUPER WIP
    let chosen_node;
    let chosen_node_type = ''; // will be one of 'input', 'output', 'hidden'

    // first select input nodes
    if (i < input_size) {
      chosen_node_type = 'input';
      // choose if the chosen input node will come from network 1 or 2
      // then go to the i-th input node of the selected network and choose the node
      const source_network = Math.random() >= 0.5 ? network1 : network2;
      // get the i-th input node
      let input_number = -1;
      let j = -1; // index to scroll through the source network's nodes
      while (input_number < i) { // basically move forward until desired input number is found
        j++;
        if (j >= source_network.nodes.length) {
          // something is wrong...
          throw RangeError('something is wrong with the size of the input');
        }
        if (source_network.input_nodes.has(source_network.nodes[j])) {
          input_number++;
        }
      }
      // now j is the index of the i-th input in the source network
      chosen_node = source_network.nodes[j];
    } else if (i < input_size + output_size) { // now select output nodes
      chosen_node_type = 'output';
      // choose if the chosen output node will come from network 1 or 2
      // then go to the i-th output node of the selected network and choose the node
      const source_network = Math.random() >= 0.5 ? network1 : network2;
      // get the i-th output node
      let output_number = -1;
      let j = -1; // index to scroll through the source network's nodes
      while (output_number < i - input_size) { // basically move forward until desired output number is found
        j++;
        if (j >= source_network.nodes.length) {
          // something is wrong...
          throw RangeError('something is wrong with the size of the output');
        }
        if (source_network.output_nodes.has(source_network.nodes[j])) {
          output_number++;
        }
      }
      // now j is the index of the i-th output in the source network
      chosen_node = source_network.nodes[j];
    } else {
      chosen_node_type = 'hidden';
      // now select hidden nodes
      let source_network;
      if (i >= network1.nodes.length) {
        source_network = network2;
      } else if (i >= network2.nodes.length) {
        source_network = network1;
      } else {
        source_network = Math.random() >= 0.5 ? network1 : network2;
      }
      // consider adding a hidden nodes array
      const chosen_node_index = Math.floor(Math.random() * source_network.nodes.length);
      chosen_node = source_network.nodes[chosen_node_index];
    }

    const new_node = new Node({
      bias: chosen_node.bias,
      squash: chosen_node.squash,
      type: chosen_node.type,
    });

    // add to the corresponding set if input or output
    if (chosen_node_type === 'input') {
      offspring.input_nodes.add(new_node);
    } else if (chosen_node_type === 'output') {
      offspring.output_nodes.add(new_node);
    }

    offspring.nodes.push(new_node);
  }

  // Create arrays of connection genes
  const n1connections = {};
  const n2connections = {};

  // Add the connections of network 1
  for (i = 0; i < network1.connections.length; i++) {
    const connection = network1.connections[i];
    const data = {
      weight: connection.weight,
      from: connection.from.index,
      to: connection.to.index,
      gater: connection.gater != null ? connection.gater.index : -1
    };
    n1connections[Connection.innovationID(data.from, data.to)] = data;
  }

  // Add the connections of network 2
  for (i = 0; i < network2.connections.length; i++) {
    const connection = network2.connections[i];
    const data = {
      weight: connection.weight,
      from: connection.from.index,
      to: connection.to.index,
      gater: connection.gater != null ? connection.gater.index : -1
    };
    n2connections[Connection.innovationID(data.from, data.to)] = data;
  }

  // Split common conn genes from disjoint or excess conn genes
  var connections = [];
  var keys1 = Object.keys(n1connections);
  var keys2 = Object.keys(n2connections);
  for (i = keys1.length - 1; i >= 0; i--) {
    // Common gene
    if (typeof n2connections[keys1[i]] !== `undefined`) {
      const connection = Math.random() >= 0.5 ? n1connections[keys1[i]] : n2connections[keys1[i]];
      connections.push(connection);

      // Because deleting is expensive, just set it to some value
      n2connections[keys1[i]] = undefined;
    } else if (score1 >= score2 || equal) {
      connections.push(n1connections[keys1[i]]);
    }
  }

  // Excess/disjoint gene
  if (score2 >= score1 || equal) {
    for (i = 0; i < keys2.length; i++) {
      if (typeof n2connections[keys2[i]] !== `undefined`) {
        connections.push(n2connections[keys2[i]]);
      }
    }
  }

  // Add common conn genes uniformly
  for (i = 0; i < connections.length; i++) {
    let connection_data = connections[i];
    if (connection_data.to < offspring_size && connection_data.from < offspring_size) {
      const from = offspring.nodes[connection_data.from];
      const to = offspring.nodes[connection_data.to];
      const connection = offspring.connect(from, to)[0];

      connection.weight = connection_data.weight;

      if (connection_data.gater !== -1 && connection_data.gater < offspring_size) {
        offspring.gate(offspring.nodes[connection_data.gater], connection);
      }
    }
  }

  return offspring;
}

/**
 *
 * Preconfigured neural networks!
 *
 * Ready to be built with simple one line functions.
 *
 * @namespace
*/
Network.architecture = {
  /**
  * Constructs a network from a given array of connected nodes
  *
  * Behind the scenes, Construct expects nodes to have connections and gates already made which it uses to infer the structure of the network and assemble it.
  *
  * It's useful because it's a generic function to produce a network from custom architectures
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
    const network = new Network(0, 0);

    // Transform all groups into nodes, set input and output nodes to the network
    // TODO: improve how it is communicated which nodes are input and output
    let nodes = [];

    let i, j;
    for (i = 0; i < list.length; i++) {
      if (list[i] instanceof Group || list[i] instanceof Layer) {
        for (j = 0; j < list[i].nodes.length; j++) {
          nodes.push(list[i].nodes[j]);
          if (i === 0) { // assume input nodes. TODO: improve.
            network.input_nodes.add(list[i].nodes[j]);
          } else if (i === list.length - 1) {
            network.output_nodes.add(list[i].nodes[j]);
          }
        }
      } else if (list[i] instanceof Node) {
        nodes.push(list[i]);
      }
    }

    // check if there are input or output nodes, bc otherwise must guess based on number of outputs
    const found_output_nodes = _.reduce(nodes, (total_found, node) =>
      total_found + (node.type === `output`), 0);
    const found_input_nodes = _.reduce(nodes, (total_found, node) =>
      total_found + (node.type === `input`), 0);

    // Determine input and output nodes
    const inputs = [];
    const outputs = [];
    for (i = nodes.length - 1; i >= 0; i--) {
      if (nodes[i].type === 'output' || (!found_output_nodes && nodes[i].outgoing.length + nodes[i].gated.length === 0)) {
        nodes[i].type = 'output';
        network.output_size++;
        outputs.push(nodes[i]);
        nodes.splice(i, 1);
      } else if (nodes[i].type === 'input' || (!found_input_nodes && !nodes[i].incoming.length)) {
        nodes[i].type = 'input';
        network.input_size++;
        inputs.push(nodes[i]);
        nodes.splice(i, 1);
      }
    }
    // backward compatibility
    network.input = network.input_size
    network.output = network.output_size

    // Input nodes are always first, output nodes are always last
    nodes = inputs.concat(nodes).concat(outputs);

    if (network.input_size === 0 || network.output_size === 0) throw new Error('Given nodes have no clear input/output node!')

    // Adds nodes, connections, and gates
    network.addNodes(nodes)

    return network
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
    return Network.architecture.Construct(nodes);
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
  * let my_LSTM = new architect.LSTM(2,6,1);
  *
  * // with multiple memory block_size layer_sizes
  * let my_LSTM = new architect.LSTM(2, 4, 4, 4, 1);
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
  * let my_LSTM = new architect.LSTM(2, 4, 4, 4, 1, options);
  *
  * @returns {Network}
  */
  LSTM: function () {
    const layer_sizes_and_options = Array.from(arguments);

    const output_size_or_options = layer_sizes_and_options.slice(-1)[0];

    let layer_sizes, options

    // find out if options were passed
    if (typeof output_size_or_options === 'number') {
      layer_sizes = layer_sizes_and_options;
      options = {};
    } else {
      layer_sizes = layer_sizes_and_options.slice(layer_sizes_and_options.length - 1);
      options = output_size_or_options;
    }

    if (layer_sizes.length < 3) {
      throw new Error('You have to specify at least 3 layer sizes, one for each of 1.inputs, 2. hidden, 3. output');
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
    let previous_output = input_layer;
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
    return Network.architecture.Construct(nodes);
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
  * let my_LSTM = new architect.GRU(2,6,1);
  *
  * // with multiple layers of gated recurrent units
  * let my_LSTM = new architect.GRU(2, 4, 4, 4, 1);
  *
  * @example <caption>Training XOR gate</caption>
  * let { architect } = require("@liquid-carrot/carrot");
  *
  * var training_set = [
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
  * network.train(training_set, {
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
    const layer_sizes = Array.from(arguments);
    if (layer_sizes.length < 3) throw new Error('You have to specify at least 3 layer sizes');

    const input_layer = new Group(layer_sizes.shift(), 'input'); // first argument
    const output_layer = new Group(layer_sizes.pop(), 'output'); // last argument
    const block_sizes = layer_sizes; // all the arguments in the middle

    const nodes = [];
    nodes.push(input_layer);

    let previous = input_layer;
    for (var i = 0; i < block_sizes.length; i++) {
      const layer = Layer.GRU(block_sizes[i])
      previous.connect(layer);
      previous = layer;

      nodes.push(layer);
    }

    previous.connect(output_layer);
    nodes.push(output_layer);

    return Network.architecture.Construct(nodes);
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
  * var training_set = [
  *   { input: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1], output: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1] },
  *   { input: [1, 1, 1, 1, 1, 0, 0, 0, 0, 0], output: [1, 1, 1, 1, 1, 0, 0, 0, 0, 0] }
  * ];
  *
  * network.train(training_set);
  *
  * network.activate([0,1,0,1,0,1,0,1,1,1]); // [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
  * network.activate([1,1,1,1,1,0,0,1,0,0]); // [1, 1, 1, 1, 1, 0, 0, 0, 0, 0]
  *
  * @returns {Network}
  */
  Hopfield: function (size) {
    const input = new Group(size, "input")
    const output = new Group(size, "output")

    input.connect(output, methods.connection.ALL_TO_ALL)

    output.set({
      squash: methods.activation.STEP
    })

    return Network.architecture.Construct([input, output])
  },

  /**
  * Creates a NARX network (remember previous inputs/outputs)
  * @alpha cannot make standalone network. TODO: be able to make standalone network
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
  * let training_data = [
  *   { input: [0], output: [0] },
  *   { input: [0], output: [0] },
  *   { input: [0], output: [1] },
  *   { input: [1], output: [0] },
  *   { input: [0], output: [0] },
  *   { input: [0], output: [0] },
  *   { input: [0], output: [1] },
  * ];
  * narx.train(training_data, {
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

    const input_layer = Layer.Dense(input_size);
    const input_memory = Layer.Memory(input_size, input_memory_size);

    const hidden_layers = [];
    // create the hidden layers
    for (let index = 0; index < hidden_sizes.length; index++) {
      hidden_layers.push(Layer.Dense(hidden_sizes[index]));
    }

    const output_layer = Layer.Dense(output_size);
    const output_memory = Layer.Memory(output_size, output_memory_size);

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
    for (let index = 0; index < hidden_layers.length; index++) {
      if (index < hidden_layers.length - 1) { // do not connect to next if last
        hidden_layers[index].connect(hidden_layers[index + 1], methods.connection.ALL_TO_ALL);
      } else { // if last, connect to output
        hidden_layers[index].connect(output_layer, methods.connection.ALL_TO_ALL);
      }

      nodes.push(hidden_layers[index]);
    }

    // finally, connect output to memory
    output_layer.connect(output_memory, methods.connection.ONE_TO_ONE, 1);
    nodes.push(output_layer);


    input_layer.set({
      type: 'input'
    });
    output_layer.set({
      type: 'output'
    });

    return Network.architecture.Construct(nodes);
  },

  /**
   * @todo Build Liquid network constructor
   */
  Liquid: function() {
    // Code here....
  }
}

module.exports = Network;

/**
* Runs the NEAT algorithm on group of neural networks.
*
* @constructs Neat
*
* @private
*
* @param {Array<{input:number[],output:number[]}>} [dataset] A set of input values and ideal output values to evaluate a genome's fitness with. Must be included to use `NEAT.evaluate` without passing a dataset
* @param {Object} options - Configuration options
* @param {number} input - The input size of `template` networks.
* @param {number} output - The output size of `template` networks.
* @param {boolean} [options.equal=false] When true [crossover](Network.crossOver) parent genomes are assumed to be equally fit and offspring are built with a random amount of neurons within the range of parents' number of neurons. Set to false to select the "fittest" parent as the neuron amount template.
* @param {number} [options.clear=false] Clear the context of the population's nodes, basically reverting them to 'new' neurons. Useful for predicting timeseries with LSTM's.
* @param {number} [options.population_size=50] Population size of each generation.
* @param {number} [options.growth=0.0001] Set the penalty for large networks. Penalty calculation: penalty = (genome.nodes.length + genome.connectoins.length + genome.gates.length) * growth; This penalty will get added on top of the error. Your growth should be a very small number.
* @param {cost} [options.cost=cost.MSE]  Specify the cost function for the evolution, this tells a genome in the population how well it's performing. Default: methods.cost.MSE (recommended).
* @param {number} [options.amount=1] Set the amount of times to test the trainingset on a genome each generation. Useful for timeseries. Do not use for regular feedfoward problems.
* @param {number} [options.elitism=1] Elitism of every evolution loop. [Elitism in genetic algortihtms.](https://www.researchgate.net/post/What_is_meant_by_the_term_Elitism_in_the_Genetic_Algorithm)
* @param {number} [options.provenance=0] Number of genomes inserted the original network template (Network(input,output)) per evolution.
* @param {number} [options.mutation_rate=0.4] Sets the mutation rate. If set to 0.3, 30% of the new population will be mutated. Default is 0.4.
* @param {number} [options.mutation_amount=1] If mutation occurs (randomNumber < mutation_rate), sets amount of times a mutation method will be applied to the network.
* @param {boolean} [options.fitness_population=false] Flag to return the fitness of a population of genomes. Set this to false to evaluate each genome inidividually.
* @param {Function} [options.fitness] - A fitness function to evaluate the networks. Takes a `dataset` and a `genome` i.e. a [network](Network) or a `population` i.e. an array of networks and sets the genome `.score` property
* @param {string} [options.selection=FITNESS_PROPORTIONATE] [Selection method](selection) for evolution (e.g. Selection.FITNESS_PROPORTIONATE).
* @param {Array} [options.crossover] Sets allowed crossover methods for evolution.
* @param {Network} [options.network=false] Network to start evolution from
* @param {number} [options.max_nodes=Infinity] Maximum nodes for a potential network
* @param {number} [options.maxConns=Infinity] Maximum connections for a potential network
* @param {number} [options.maxGates=Infinity] Maximum gates for a potential network
* @param {mutation[]} [options.mutation] Sets allowed [mutation methods](mutation) for evolution, a random mutation method will be chosen from the array when mutation occurs. Optional, but default methods are non-recurrent
*
* @prop {number} generation A count of the generations
* @prop {Network[]} population The current population for the neat instance. Accessible through `neat.population`
*
* @example
* let { Neat } = require("@liquid-carrot/carrot");
*
* let neat = new Neat(4, 1, dataset, {
*   elitism: 10,
*   clear: true,
*   population_size: 1000
* });
*/
const Neat = function(dataset, {
  generation = 0, // internal variable
  input = 1,
  output = 1,
  equal = true,
  clean = false,
  population_size = 50,
  growth = 0.0001,
  cost = methods.cost.MSE,
  amount = 1,
  elitism = 1,
  provenance = 0,
  mutation_rate = 0.4,
  mutation_amount = 1,
  fitness_population = false,
  fitness = function(set = dataset, genome, amount = 1, cost = methods.cost.MSE, growth = 0.0001) {
    let score = 0;
    for (let i = 0; i < amount; i++) score -= genome.test(set, cost).error;

    score -= (genome.nodes.length - genome.input - genome.output + genome.connections.length + genome.gates.length) * growth;
    score = isNaN(score) ? -Infinity : score; // this can cause problems with fitness proportionate selection

    return score / amount;
  },
  selection = methods.selection.POWER,
  crossover = [
    methods.crossover.SINGLE_POINT,
    methods.crossover.TWO_POINT,
    methods.crossover.UNIFORM,
    methods.crossover.AVERAGE
  ],
  mutation = methods.mutation.FFW,
  efficientMutation = false,
  template = (new Network(input, output)),
  max_nodes = Infinity,
  maxConns = Infinity,
  maxGates = Infinity
} = {}) {
  let self = this;

  _.assignIn(self, {
    generation,
    input,
    output,
    equal,
    clean,
    population_size,
    growth,
    cost,
    amount,
    elitism,
    provenance,
    mutation_rate,
    mutation_amount,
    fitness_population,
    fitness,
    selection,
    crossover,
    mutation,
    efficientMutation,
    template,
    max_nodes,
    maxConns,
    maxGates
  });

  /**
   * Create the initial pool of genomes
   *
   * @param {Network} network
   */
  self.createPool = function createPool(network, population_size) {
    const pool = Array(population_size).fill(Network.fromJSON({ ...network.toJSON(), score: undefined }));
    return pool;
  };

  // Initialise the genomes
  self.population = self.createPool(self.template, self.population_size);

  self.filterGenome = function (population, template, pickGenome, adjustGenome) {
    let filtered = [...population]; // avoid mutations

    // Check for correct return type from pickGenome
    const check = function checkPick(genome) {
      const pick = pickGenome(genome)
      if (typeof pick !== "boolean") throw new Error("pickGenome must always return a boolean!")
      return pick
    }

    if(adjustGenome){
      for (let i = 0; i < population.length; i++) {
        if(check(filtered[i])) {
          const result = adjustGenome(filtered[i])
          if (!(result instanceof Network)) throw new Error("adjustGenome must always return a network!")
          filtered[i] = result
        }
      }
    } else {
      for (let i = 0; i < population.length; i++){
        if(check(filtered[i])) filtered[i] = Network.fromJSON(template.toJSON())
      }
    }

    return filtered;
  };

  /**
   * Selects a random mutation method for a genome and mutates it
   *
   * @param {Network} genome Network to test for possible mutations
   * @param {mutation[]} allowedMutations An array of allowed mutations to pick from
   *
   * @return {mutation} Selected mutation
  */
  self.mutateRandom = function (genome, allowedMutations) {
      let possible = allowedMutations ? [...allowedMutations] : [...self.mutation]

      // remove any methods disallowed by user-limits: i.e. maxNodes, maxConns, ...
      possible = possible.filter(function(method) {
        return (
          method !== methods.mutation.ADD_NODE || genome.nodes.length < self.maxNodes ||
          method !== methods.mutation.ADD_CONN || genome.connections.length < self.maxConns ||
          method !== methods.mutation.ADD_GATE || genome.gates.length < self.maxGates
        )
      })

      do {
        const current = possible[Math.floor(Math.random() * possible.length)]

        // attempt mutation, success: return mutation method, failure: remove from possible methods
        if (genome.mutate(current)) return current
        else possible = possible.filter(function(method) { return method.name !== current.name })
      } while((possible && possible.length > 0))
      // Return null when all the mutations have been attempted
      return null;
  };

  /**
   * Evaluates, selects, breeds and mutates population
   *
   * @param {Array<{input:number[],output:number[]}>} [evolve_set=dataset] A set to be used for evolving the population, if none is provided the dataset passed to Neat on creation will be used.
   * @param {function} [pickGenome] A custom selection function to pick out unwanted genomes. Accepts a network as a parameter and returns true for selection.
   * @param {function} [adjustGenome=self.template] Accepts a network, modifies it, and returns it. Used to modify unwanted genomes returned by `pickGenome` and reincorporate them into the population. If left unset, unwanted genomes will be replaced with the template Network. Will only run when pickGenome is defined.
   *
   * @returns {Network} Fittest network
   *
   * @example
   * let neat = new Neat(dataset, {
   *  elitism: 10,
   *  clear: true,
   *  population_size: 1000
   * });
   *
   * let filter = function(genome) {
   *  // Remove genomes with more than 100 nodes
   *  return genome.nodes.length > 100 ? true : false
   * }
   *
   * let adjust = function(genome) {
   *  // clear the nodes
   *  return genome.clear()
   * }
   *
   * neat.evolve(evolve_set, filter, adjust).then(function(fittest) {
   *  console.log(fittest)
   * })
  */
  self.evolve = async function (evolve_set, pickGenome, adjustGenome) {
    // Check if evolve is possible
    if (self.elitism + self.provenance > self.population_size) throw new Error("Can`t evolve! Elitism + provenance exceeds population size!");

    evolve_set = evolve_set || self.dataset;

    // Check population for evaluation
    if (typeof self.population[self.population.length - 1].score === `undefined`)
      await self.evaluate(evolve_set);
      // await self.evaluate(_.isArray(evolve_set) ? evolve_set : _.isArray(self.dataset) ? self.dataset : parameter.is.required("dataset"));
    // Check & adjust genomes as needed
    if (pickGenome) self.population = self.filterGenome(self.population, self.template, pickGenome, adjustGenome)

    // Sort in order of fitness (fittest first)
    self.sort();

    // Elitism, assumes population is sorted by fitness
    const elitists = [];
    for (let i = 0; i < self.elitism; i++) elitists.push(self.population[i]);

    // Provenance
    const new_population = Array(self.provenance).fill(Network.fromJSON(self.template.toJSON()))

    // Breed the next individuals
    for (let i = 0; i < self.population_size - self.elitism - self.provenance; i++)
      new_population.push(self.getOffspring());

    // Replace the old population with the new population
    self.population = new_population;

    // Mutate the new population
    self.mutate();

    // Add the elitists
    self.population.push(...elitists);

    // evaluate the population
    await self.evaluate(evolve_set);
    // await self.evaluate(_.isArray(evolve_set) ? evolve_set : _.isArray(self.dataset) ? self.dataset : parameter.is.required("dataset"));

    // Check & adjust genomes as needed
    if (pickGenome) self.population = self.filterGenome(self.population, self.template, pickGenome, adjustGenome)

    // Sort in order of fitness (fittest first)
    self.sort()

    const fittest = Network.fromJSON(self.population[0].toJSON());
    fittest.score = self.population[0].score;

    // Reset the scores
    for (let i = 0; i < self.population.length; i++) self.population[i].score = undefined;

    self.generation++;

    return fittest;
  };

  /**
   * Returns a genome for recombination (crossover) based on one of the [selection methods](selection) provided.
   *
   * Should be called after `evaluate()`
   *
   * @return {Network} Selected genome for offspring generation
   */
  self.getParent = function () {
    switch (self.selection.name) {
      case `POWER`: {
        if (self.population[0].score < self.population[1].score) self.sort();

        var index = Math.floor(Math.pow(Math.random(), self.selection.power) * self.population.length);
        return self.population[index];
      }
      case `FITNESS_PROPORTIONATE`: {
        // As negative fitnesses are possible
        // https://stackoverflow.com/questions/16186686/genetic-algorithm-handling-negative-fitness-values
        // this is unnecessarily run for every individual, should be changed

        var totalFitness = 0;
        var minimalFitness = 0;
        for (let i = 0; i < self.population.length; i++) {
          var score = self.population[i].score;
          minimalFitness = score < minimalFitness ? score : minimalFitness;
          totalFitness += score;
        }

        minimalFitness = Math.abs(minimalFitness);
        totalFitness += minimalFitness * self.population.length;

        var random = Math.random() * totalFitness;
        var value = 0;

        for (let i = 0; i < self.population.length; i++) {
          let genome = self.population[i];
          value += genome.score + minimalFitness;
          if (random < value) return genome;
        }

        // if all scores equal, return random genome
        return self.population[Math.floor(Math.random() * self.population.length)];
      }
      case `TOURNAMENT`: {
        if (self.selection.size > self.population_size) {
          throw new Error(`Your tournament size should be lower than the population size, please change methods.selection.TOURNAMENT.size`);
        }

        // Create a tournament
        var individuals = [];
        for (let i = 0; i < self.selection.size; i++) {
          let random = self.population[Math.floor(Math.random() * self.population.length)];
          individuals.push(random);
        }

        // Sort the tournament individuals by score
        individuals.sort(function (a, b) {
          return b.score - a.score;
        });

        // Select an individual
        for (let i = 0; i < self.selection.size; i++)
          if (Math.random() < self.selection.probability || i === self.selection.size - 1) return individuals[i];
      }
    }
  };

  /**
   * Selects two genomes from the population with `getParent()`, and returns the offspring from those parents. NOTE: Population MUST be sorted
   *
   * @returns {Network} Child network
   */
  self.getOffspring = function () {
    var parent1 = self.getParent();
    var parent2 = self.getParent();

    return Network.crossOver(parent1, parent2, self.equal);
  };

  /**
   * Mutates the given (or current) population
   *
   * @param {mutation} [method] A mutation method to mutate the population with. When not specified will pick a random mutation from the set allowed mutations.
   */
  self.mutate = function (method) {
    if(method) {
      // Elitist genomes should not be included
      for(let i = 0; i < self.population.length; i++) {
        if (Math.random() <= self.mutation_rate)
          for (let j = 0; j < self.mutation_amount; j++)
            self.population[i].mutate(method)
      }
    } else {
      // Elitist genomes should not be included
      for(let i = 0; i < self.population.length; i++) {
        if (Math.random() <= self.mutation_rate)
          for (let j = 0; j < self.mutation_amount; j++)
            self.mutateRandom(self.population[i], self.mutation)
      }
    }
  };

  /**
   * Evaluates the current population, basically sets their `.score` property
   *
   * @return {Network} Fittest Network
   */
  self.evaluate = async function(dataset) {
    dataset = dataset || self.dataset;

    if (self.fitness_population) {
      if (self.clear) {
        for (let i = 0; i < self.population.length; i++)
          self.population[i].clear();
      }
      await self.fitness(dataset, self.population);
    } else {
      for (let i = 0; i < self.population.length; i++) {
        const genome = self.population[i];
        if (self.clear) genome.clear();
        genome.score = await self.fitness(dataset, genome);
        self.population[i] = genome;
      }
    }

    // Sort the population in order of fitness
    self.sort()

    return self.population[0]
  };

  /**
   * Sorts the population by score
  */
  self.sort = function () {
    self.population.sort(function (a, b) {
      return b.score - a.score;
    });
  };

  /**
   * Returns the fittest genome of the current population
   *
   * @returns {Network} Current population's fittest genome
  */
  self.getFittest = function () {
    // Check if evaluated. self.evaluate is an async function
    if (typeof self.population[self.population.length - 1].score === `undefined`)
      self.evaluate();

    if (self.population[0].score < self.population[1].score) self.sort();

    return self.population[0];
  };

  /**
   * Returns the average fitness of the current population
   *
   * @returns {number} Average fitness of the current population
   */
  self.getAverage = function () {
    if (typeof self.population[self.population.length - 1].score === `undefined`)
      self.evaluate(); // self.evaluate is an async function

    let score = 0;
    for (let i = 0; i < self.population.length; i++)
      score += self.population[i].score;

    return score / self.population.length;
  };

  /**
   * Export the current population to a JSON object
   *
   * Can be used later with `fromJSON(json)` to reload the population
   *
   * @return {object[]} A set of genomes (a population) represented as JSON objects.
   */
  self.toJSON = function toJSON() {
    const json = [];
    for (let i = 0; i < self.population.length; i++)
      json.push(self.population[i].toJSON());

    return json;
  };

  /**
   * Imports population from a json. Must be an array of networks converted to JSON objects.
   *
   * @param {object[]} json set of genomes (a population) represented as JSON objects.
  */
  self.fromJSON = function fromJSON(json) {
    const population = [];
    for (let i = 0; i < json.length; i++)
      population.push(Network.fromJSON(json[i]));
    self.population = population;
    self.population_size = population.length;
  };
}
