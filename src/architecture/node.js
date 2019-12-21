const _ = require("lodash");
const methods = require('../methods/methods');
const Connection = require('./connection');
const config = require('../config');
// const Group = require("./group");
// const Layer = require("./layer");

/**
* Creates a new neuron/node
*
* Neurons are the basic unit of the neural network. They can be connected together, or used to gate connections between other neurons. A Neuron can perform basically 4 operations: form connections, gate connections, activate and [propagate](https://www.youtube.com/watch?v=Ilg3gGewQ5U).
*
* For more information check:
* - [here](https://becominghuman.ai/what-is-an-artificial-neuron-8b2e421ce42e)
* - [here](https://en.wikipedia.org/wiki/Artificial_neuron)
* - [here](https://wagenaartje.github.io/neataptic/docs/architecture/node/)
* - [here](https://github.com/cazala/synaptic/wiki/Neural-Networks-101)
* - [here](https://keras.io/backend/#bias_add)
*
* @constructs Node
*
* @param {Object|Node} [options] Options Object or template `Node`
* @param {number} [options.bias] Neuron's bias [here](https://becominghuman.ai/what-is-an-artificial-neuron-8b2e421ce42e)
*
* @prop {number} bias Neuron's bias [here](https://becominghuman.ai/what-is-an-artificial-neuron-8b2e421ce42e)
* @prop {activation} squash [Activation function](https://medium.com/the-theory-of-everything/understanding-activation-functions-in-neural-networks-9491262884e0)
* @prop {string} type
* @prop {number} activation Output value
* @prop {number} state
* @prop {number} old
* @prop {number} mask=1 Used for dropout. This is either 0 (ignored) or 1 (included) during training and is used to avoid [overfit](https://www.kdnuggets.com/2015/04/preventing-overfitting-neural-networks.html).
* @prop {number} previousDeltaBias
* @prop {number} totalDeltaBias
* @prop {Array<Connection>} incoming Incoming connections to this node
* @prop {Array<Connection>} outgoing Outgoing connections from this node
* @prop {Array<Connection>} gated Connections this node gates
* @prop {Connection} connections_self A self-connection
* @prop {number} error.responsibility
* @prop {number} error.projected
* @prop {number} error.gated
*
* @example
* let { Node } = require("@liquid-carrot/carrot");
*
* let node = new Node();
*/
function Node(options) {
  let self = this;

  // type = type || 'hidden';

  Object.assign(self, {
    bias: Math.random() * 2 - 1,
    squash: methods.activation.LOGISTIC,
    activation: 0,
    state: 0,
    old: 0,
    mask: 1,
    delta_bias_previous: 0,
    delta_bias_total: 0,
    delta_bias: [],
    incoming: [],
    outgoing: [],
    gated: [],
    sharedIncoming: null,
    connections_self: new Connection(self, self, 0),
    error_responsibility: 0,
    error_projected: 0,
    error_gated: 0,
    ...options,
  })

  /**
  * Actives the node.
  *
  * When a neuron activates, it computes its state from all its input connections and 'squashes' it using its activation function, and returns the output (activation).
  *
  * You can also provide the activation (a float between 0 and 1) as a parameter, which is useful for neurons in the input layer.
  *
  * @function activate
  * @memberof Node
  *
  * @todo Support vector/tensor/array activation
  *
  * @param {number} [input] Environment signal (i.e. optional numerical value passed to the network as input)  - _should only be passed in input neurons_
  * @param {Object} [options]
  * @param {boolean} [options.trace] Controls whether traces are created when activation happens (a trace is meta information left behind for different uses, e.g. backpropagation).
  *
  * @returns {number} A neuron's ['Squashed'](https://medium.com/the-theory-of-everything/understanding-activation-functions-in-neural-networks-9491262884e0) output value
  *
  * @example
  * let { Node } = require("@liquid-carrot/carrot");
  *
  * let A = new Node();
  * let B = new Node();
  *
  * A.connect(B);
  * A.activate(0.5); // 0.5
  * B.activate(); // 0.3244554645
  */
  self.activate = function(input, options) {
    if(options == undefined && typeof input === "object") {
      options = input;
      input = undefined;
    }

    options = options || {}
    options = {
      trace: true,
      ...options
    }

    if(input != undefined && Number.isFinite(input)) {
      return self.activation = input;
    }

    // DRY abstraction
    const activate = function() {
      // Activate (from self)
      if (self.sharedIncoming !== null) {
        self.bias = self.sharedIncoming.bias;
      }
      self.state = self.connections_self.gain * self.connections_self.weight * self.state + self.bias;

      // Activate (from incoming connections)
      for (let i = 0; i < self.incoming.length; i++) {
        const conn = self.incoming[i];
        self.state += conn.from.activation * conn.weight * conn.gain;
      }

      return self.state;
    }

    if(options.trace) {
      self.old = self.state;

      self.state = activate()
      self.activation = self.squash(self.state) * self.mask // Squash Activation
      self.derivative = self.squash(self.state, true)

      // Stores traces
      const nodes = [];
      const influences = [];

      // Adjust 'gain' (to gated connections) & Build traces
      for (let i = 0; i < self.gated.length; i++) {
        const connection = self.gated[i];
        connection.gain = self.activation

        // Build traces
        const index = nodes.indexOf(connection.to);
        if(index > -1) { // Node & influence exist
          influences[index] += connection.weight * connection.from.activation;
        } else { // Add node & corresponding influence
          nodes.push(connection.to);
          influences.push(connection.weight * connection.from.activation + (connection.to.connections_self.gater === self ? connection.to.old : 0));
        }
      }

      // Forwarding 'xtrace' (to incoming connections)
      for (let i = 0; i < self.incoming.length; i++) {
        const connection = self.incoming[i];

        // Trace Elegibility
        connection.elegibility = self.connections_self.gain * self.connections_self.weight * connection.elegibility + connection.from.activation * connection.gain;

        for(let j = 0; j < nodes.length; j++) {
          const [ node, influence ]  = [nodes[j], influences[j]];

          const index = connection.xtrace_nodes.indexOf(node);

          if(index > -1) connection.xtrace_values[index] = node.connections_self.gain * node.connections_self.weight * connection.xtrace_values[index] + self.derivative * connection.elegibility * influence;
          else {
            connection.xtrace_nodes.push(node);
            connection.xtrace_values.push(self.derivative * connection.elegibility * influence);
          }
        }
      }

      return self.activation;
    } else {
      if(self.type === "input") return self.activation = 0

      self.state = activate()
      self.activation = self.squash(self.state) // Squash Activation

      // Adjust 'gain' (to gated connections)
      for (let i = 0; i < self.gated.length; i++) {
        self.gated[i].gain = self.activation
      }

      return self.activation;
    }
  },

  /**
  * Activates the node without calculating elegibility traces and such.
  *
  * Calculates the state from all the input connections, adds the bias, and 'squashes' it. Does not calculate traces, so this can't be used to backpropagate afterwards. That's also why it's quite a bit faster than regular `activate`.
  *
  * @function noTraceActivate
  * @memberof Node
  *
  * @deprecated
  *
  * @param {number} [input] Optional value to be used for an input (or forwarding) neuron - _should only be passed in input neurons_
  *
  * @returns {number} A neuron's ['Squashed'](https://medium.com/the-theory-of-everything/understanding-activation-functions-in-neural-networks-9491262884e0) output value
  *
  * @example
  * let { Node } = require("@liquid-carrot/carrot");
  *
  * let node = new Node();
  *
  * node.noTraceActivate(); // 0.4923128591923
  */
  self.noTraceActivate = function(input) {
    return self.activate(input, { trace: false })
  },

  /**
  * Backpropagate the error (a.k.a. learn).
  *
  * After an activation, you can teach the node what should have been the correct output (a.k.a. train). This is done by backpropagating. [Momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html) adds a fraction of the previous weight update to the current one. When the gradient keeps pointing in the same direction, this will increase the size of the steps taken towards the minimum.
  *
  * If you combine a high learning rate with a lot of momentum, you will rush past the minimum (of the error function) with huge steps. It is therefore often necessary to reduce the global learning rate µ when using a lot of momentum (m close to 1).
  *
  * @function propagate
  * @memberof Node
  *
  * @param {number} target The target value (i.e. "the value the network SHOULD have given")
  * @param {Object} options
  * @param {number} [options.rate=0.3] [Learning rate](https://towardsdatascience.com/understanding-learning-rates-and-how-it-improves-performance-in-deep-learning-d0d4059c1c10)
  * @param {number} [options.momentum=0] [Momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html) adds a fraction of the previous weight update to the current one.
  * @param {boolean} [options.update=true] When set to false weights won't update, but when set to true after being false the last propagation will include the deltaweights of the first "update:false" propagations too.
  *
  * @example
  * let { Node } = require("@liquid-carrot/carrot");
  *
  * let A = new Node();
  * let B = new Node('output');
  * A.connect(B);
  *
  * let learningRate = .3;
  * let momentum = 0;
  *
  * for(let i = 0; i < 20000; i++)
  * {
  *   // when A activates 1
  *   A.activate(1);
  *
  *   // train B to activate 0
  *   B.activate();
  *   B.propagate(learningRate, momentum, true, 0);
  * }
  *
  * // test it
  * A.activate(1);
  * B.activate(); // 0.006540565760853365
  *
  * @see [Regularization Neataptic](https://wagenaartje.github.io/neataptic/docs/methods/regularization/)
  * @see [What is backpropagation | YouTube](https://www.youtube.com/watch?v=Ilg3gGewQ5U)
  */
  self.propagate = function(target, options) {
    if (options == undefined && typeof target === "object") {
      options = target;
      target = undefined;
    }

    options = options || {}
    options = {
      momentum: 0,
      rate: 0.3,
      update: true,
      ...options
    }

    // Output Node Error (from environment)
    if (target != undefined && Number.isFinite(target)) {
      self.error_responsibility = self.error_projected = target - self.activation;
    }
    // Hidden/Input Node Error (from backpropagation)
    else {
      // Projected Error Responsibility (from outgoing connections)
      self.error_projected = 0;
      for (let i = 0; i < self.outgoing.length; i++) {
        const connection = self.outgoing[i];
        self.error_projected += connection.to.error_responsibility * connection.weight * connection.gain;
      }
      self.error_projected *= self.derivative || 1;

      // Gated Error Responsibility (from gated connections)
      self.error_gated = 0;
      for (let i = 0; i < self.gated.length; i++) {
        const connection = self.gated[i];
        const node = connection.to;
        const influence = (node.connections_self.gater === self ? node.old : 0) + connection.weight * connection.from.activation;

        self.error_gated += node.error_responsibility * influence;
      }
      self.error_gated *= self.derivative || 1;

      // Error Responsibility
      self.error_responsibility = self.error_projected + self.error_gated;
    }

    // Adjust Incoming Connections
    for (let i = 0; i < self.incoming.length; i++) {
      const connection = self.incoming[i];
      let gradient = self.error_projected * connection.elegibility;
      for (let j = 0; j < connection.xtrace_nodes.length; j++) {
        const node = connection.xtrace_nodes[j];
        gradient += node.error_responsibility * connection.xtrace_values[j];
      }

      // Adjust Weight ()
      connection.delta_weights_total += options.rate * gradient * self.mask;
      if (options.update) {
        connection.delta_weights_total += options.momentum * connection.delta_weights_previous;
        if (connection.sharedIncoming === null) {
          connection.weight += connection.delta_weights_total;
        }
        connection.delta_weights_previous = connection.delta_weights_total;
        connection.delta_weights_total = 0;
      }
    }

    // Adjust Bias
    self.delta_bias_total += options.rate * self.error_responsibility;
    if (options.update) {
      self.delta_bias_total += options.momentum * self.delta_bias_previous;
      if (self.sharedIncoming === null) {
        self.bias += self.delta_bias_total;
      }
      self.delta_bias_previous = self.delta_bias_total;
      self.delta_bias_total = 0;
    }

    return {
      responsibility: self.error_responsibility,
      projected: self.error_projected,
      gated: self.error_gated,
    }
  },

  /**
  * Connects this node to the given node(s)
  *
  * @param {Node|Node[]} nodes Node(s) to project connection(s) to
  * @param {number} [weight] Initial connection(s) [weight](https://en.wikipedia.org/wiki/Synaptic_weight)
  * @param {Object} [options={}]
  * @param {boolean} [twosided] If `true` connect nodes to each other
  *
  * @function connect
  * @memberof Node
  *
  * @returns {Connection[]|Connection}
  *
  * @example <caption>Connecting node (neuron) to another node (neuron)</caption>
  * const { Node } = require("@liquid-carrot/carrot");
  *
  * let node = new Node();
  * let other_node = new Node();
  *
  * let connection = node.connect(other_node); // Both nodes now share a connection
  *
  * console.log(connection); // Connection { from: [Object object], to: [Object object], ...}
  *
  * @example <caption>Connecting node (neuron) to many nodes (neurons)</caption>
  * const { Node } = require("@liquid-carrot/carrot");
  *
  * let node = new Node();
  * let other_nodes = [new Node(), new Node(), new Node()];
  *
  * let connections = node.connect(other_nodes); // Node is connected to all other nodes
  *
  * console.log(connections); // [{ from: [Object object], to: [Object object], ...}, ...]
  *
  *
  * @example <caption>Connecting a node (neuron) to itself</caption>
  * const { Node } = require("@liquid-carrot/carrot");
  *
  * let node = new Node();
  *
  * let connection = node.connect(node); // Node is connected to itself.
  *
  * console.log(connection); // Connection { from: [Object object], to: [Object object], ...}
  */
  self.connect = function(nodes, weight, options) {
    if (nodes == undefined) throw new ReferenceError("Missing required parameter 'nodes'");

    if(options == undefined && typeof weight === "object") {
      options = weight;
      weight = undefined;
    }

    options = options || {};

    if (nodes instanceof Node) {
      if (nodes === self) {
        self.connections_self.weight = weight || 1;
        return self.connections_self;
      } else if (self.isProjectingTo(nodes)) throw new ReferenceError("Node is already projecting to 'target'");
      else {
        const connection = new Connection(self, nodes, weight, options);

        self.outgoing.push(connection);
        nodes.incoming.push(connection);

        if(options.twosided) nodes.connect(self);

        return connection;
      }
    }
    else if (Array.isArray(nodes)) {
      const connections = [];

      for (let index = 0; index < nodes.length; index++) {
        const connection = new Connection(self, nodes[index], weight, options);

        self.outgoing.push(connection);
        nodes[index].incoming.push(connection);
        connections.push(connection);

        if(options.twosided) nodes[index].connect(self);
      }

      return connections;
    }
    else throw new TypeError(`Parameter 'target': Expected 'Node' or 'Node[]' - but recieved, ${nodes}`);
  },

  /**
  * Disconnects this node from the given node(s)
  *
  * @function disconnect
  * @memberof Node
  *
  * @param {Node|Node[]} node Node(s) to remove connection(s) to
  * @param {Object} options
  * @param {boolean} [options.twosided=false] If `true` disconnects nodes from each other (i.e. both sides)
  *
  * @example <caption>Disconnect from one <code>node</code></caption>
  * const { Node } = require("@liquid-carrot/carrot");
  *
  * let node = new Node();
  * let other = new Node();
  *
  * node.connect(other); // `node` now connected to `other`
  *
  * console.log(node.incoming.length); // 0
  * console.log(node.outgoing.length); // 1
  *
  * node.disconnect(other); // `node` is now disconnected from `other`
  *
  * console.log(node.incoming.length); // 0
  * console.log(node.outgoing.length); // 0
  *
  * @example <caption>Connect to one <code>node</code> - <em>two-sided</em></caption>
  * const { Node } = require("@liquid-carrot/carrot");
  *
  * let node = new Node();
  * let other = new Node();
  *
  * // `node` & `other` are now connected to each other
  * node.connect(other, {
  *   twosided: true
  * });
  *
  * console.log(node.incoming.length); // 1
  * console.log(node.outgoing.length); // 1
  *
  * // `node` & `other` are now disconnected from each other
  * node.disconnect(other, {
  *   twosided: true
  * });
  *
  * console.log(node.incoming.length); // 0
  * console.log(node.outgoing.length); // 0
  */
  self.disconnect = function(nodes, options) {
    if (nodes == undefined) throw new ReferenceError("Missing required parameter 'target'");

    options = options || {};

    if (nodes instanceof Node) {
      if (nodes === self) {
        self.connections_self.weight = 0;
        return self.connections_self;
      } else {
        for (let index = 0; index < self.outgoing.length; index++) {
          const connection = self.outgoing[index];

          if (connection.to === nodes) {
            self.outgoing.splice(index, 1);

            connection.to.incoming.splice(connection.to.incoming.indexOf(connection), 1);

            if(connection.gater != undefined) connection.gater.ungate(connection);
            if(options.twosided) nodes.disconnect(self);

            return connection;
          }
        }
      }
    } else if (Array.isArray(nodes)) {
      const connections = [];

      for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < self.outgoing.length; j++) {
          const connection = self.outgoing[j];

          if(connection.to === nodes[i]) {
            self.outgoing.splice(j, 1);
            connection.to.incoming.splice(connection.to.incoming.indexOf(connection), 1);

            if(connection.gater != undefined) connection.gater.ungate(connection);
            if(options.twosided) nodes[i].disconnect(self);

            connections.push(connection);

            break;
          }
        }
      }

      return connections;
    }
    else throw new TypeError(`Parameter 'target': Expected 'Node' or 'Node[]' - but recieved, ${nodes}`);
  },

  /**
  * This node gates (influences) the given connection(s)
  *
  * @function gate
  * @memberof Node
  *
  * @param {Connection|Connection[]} connections Connections to be gated (influenced) by a neuron
  *
  * @example <caption>Gate one <code>connection</code></caption>
  * const { Node } = require("@liquid-carrot/carrot");
  *
  * let input = new Node();
  * let output = new Node();
  * let connection = input.connect(output);
  *
  * let node = new Node();
  *
  * console.log(connection.gater === node); // false
  *
  * node.gate(connection); // Node now gates (manipulates) `connection`
  *
  * console.log(connection.gater === node); // true
  */
  self.gate = function(connections) {
    if (connections == undefined) throw new ReferenceError("Missing required parameter 'connections'");


    if (!Array.isArray(connections)) {
      self.gated.push(connections);
      connections.gater = self;
    } else {
      for (let index = 0; index < connections.length; index++) {
        const connection = connections[index];

        self.gated.push(connection);
        connection.gater = self;
      }
    }

    return connections;
  },

  /**
  * Stops this node from gating (manipulating) the given connection(s)
  *
  * @function ungate
  * @memberof Node
  *
  * @param {Connection|Connection[]} connections Connections to ungate - _i.e. remove this node from_
  *
  * @returns {Connection|Connection[]} Returns connection(s) that were ungated
  *
  * @example <caption>Ungate one <code>connection</code></caption>
  * const { Node } = require("@liquid-carrot/carrot");
  *
  * let input = new Node();
  * let output = new Node();
  * let connection = input.connect(output);
  *
  * let node = new Node();
  *
  * console.log(connection.gater === node); // false
  *
  * node.gate(connection); // Node now gates (manipulates) `connection`
  *
  * console.log(connection.gater === node); // true
  *
  * node.ungate(connection); // Node is removed from `connection`
  *
  * console.log(connection.gater === node); // false
  */
  self.ungate = function(connections) {
    if (connections == undefined) throw new ReferenceError("Missing required parameter 'connections'");

    if (!Array.isArray(connections)) {
      self.gated.splice(self.gated.indexOf(connections), 1);
      connections.gater = null;
      connections.gain = 1;
    } else {
      for (let i = 0; i < connections.length; i++) {
      // for (let index = connections.length - 1; index >= 0; index--) {
        const connection = connections[i];

        self.gated.splice(self.gated.indexOf(connection), 1);
        connection.gater = null;
        connection.gain = 1;
      }
    }

    return connections;
  },

  /**
  * Clears this node's state information - _i.e. resets node and its connections to "factory settings"_
  *
  * `node.clear()` is useful for predicting timeseries with LSTMs.
  *
  * @function clear
  * @memberof Node
  *
  * @example
  * const { Node } = require("@liquid-carrot/carrot");
  *
  * let node = new Node();
  *
  * node.activate([1, 0]);
  * node.propagate([1]);
  *
  * console.log(node); // Node has state information (e.g. `node.derivative`)
  *
  * node.clear(); // Factory resets node
  *
  * console.log(node); // Node has no state information
  */
  self.clear = function() {
    for (let index = 0; index < self.incoming.length; index++) {
      const connection = self.incoming[index];

      connection.elegibility = 0;
      connection.xtrace_nodes = []
      connection.xtrace_values = [];
    }

    for (let index = 0; index < self.gated.length; index++) {
      const connection = self.gated[index];
      connection.gain = 0;
    }

    self.error_responsibility = self.error_projected = self.error_gated = 0;
    self.old = self.state = self.activation = 0;
  },

  /**
  * Mutates the node - _i.e. changes node's squash function or bias_
  *
  * @function mutate
  * @memberof Node
  *
  * @param {Object} [options]
  * @param {string} [options.method] A [mutation method](mutation) - _a random method will chosen if none is passed_
  * @param {activation[]} [options.allowed] Allowed/possible squash (activation) functions for node (neuron)
  *
  * @example
  * const { Node } = require("@liquid-carrot/carrot");
  *
  * let node = new Node();
  *
  * console.log(node);
  *
  * node.mutate(); // Changes node's squash function or bias
  */
  self.mutate = function(options) {
    options = {
      method: Math.random() < 0.5 ? methods.mutation.MOD_ACTIVATION : methods.mutation.MOD_BIAS,
      ...options
    }

    // options = options || {};
    // options.method = options.method != undefined ? options.method : Math.random() < 0.5 ? methods.mutation.MOD_ACTIVATION : methods.mutation.MOD_BIAS;

    // if(method == undefined) throw new Error('No mutate method given!');

    // // CHECK: https://scotch.io/bar-talk/5-tips-to-write-better-conditionals-in-javascript
    // else if(!(method.name in methods.mutation)) throw new Error('This method does not exist!');

    // Return a random index - not including `exclude`;
    function random_index(max, exclude) {
      return (exclude + Math.floor(Math.random() * (max - 1)) + 1) % max;
    }

    // Return a random key - not including `exclude`;
    function random_key(keys, exclude) {
      return keys[(keys.indexOf(exclude) + Math.floor(Math.random() * (keys.length - 1)) + 1) % keys.length];
    }

    switch(options.method) {
      case methods.mutation.MOD_ACTIVATION:
        if (options.allowed) {
          self.squash = options.allowed[random_index(options.allowed.length, options.allowed.indexOf(self.squash))];
        } else {
          self.squash = methods.activation[random_key(Object.keys(methods.activation), self.squash.name)];
        }
        break;
      case methods.mutation.MOD_BIAS:
        if (self.sharedIncoming === null) {
          self.bias += Math.random() * (options.method.max - options.method.min) + options.method.min;
        }
        break;
    }
  },

  /**
  * Checks if this node has an outgoing connection(s) into the given node(s)
  *
  * @function isProjectingTo
  * @memberof Node
  *
  * @param {Node|Node[]} nodes Checks if this node has outgoing connection(s) into `node(s)`
  *
  * @returns {boolean} Returns true, iff this node has an outgoing connection into every node(s)
  *
  * @example <caption>Check one <code>node</code></caption>
  * const { Node } = require("@liquid-carrot/carrot");
  *
  * let other_node = new Node();
  * let node = new Node();
  * node.connect(other_node);
  *
  * console.log(node.isProjectingTo(other_node)); // true
  *
  * @example <caption>Check many <code>nodes</code></caption>
  * const { Node } = require("@liquid-carrot/carrot");
  *
  * let other_nodes = Array.from({ length: 5 }, () => new Node());
  * let node = new Node();
  *
  * other_nodes.forEach(other_node => node.connect(other_node));
  *
  * console.log(node.isProjectingTo(other_nodes)); // true
  */
  self.isProjectingTo = function(nodes) {
    if (nodes == undefined) throw new ReferenceError("Missing required parameter 'nodes'");

    if (nodes === self) return self.connections_self.weight !== 0;
    else if (!Array.isArray(nodes)) {
      for (let i = 0; i < self.outgoing.length; i++) {
        if (self.outgoing[i].to === nodes) return true;
      }
      return false;
    } else {
      // START: nodes.every()
      let projecting_to = 0;
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        for (let j = 0; j < self.outgoing.length; j++) {

          if (self.outgoing[j].to === node) {
            projecting_to++;
            break;
          }
        }
      }
      // END: nodes.every()

      return nodes.length === projecting_to ? true : false;
    }
  },

  /**
  * Checks if the given node(s) are have outgoing connections to this node
  *
  * @function isProjectedBy
  * @memberof Node
  *
  * @param {Node|Node[]} nodes Checks if `node(s)` have outgoing connections into this node
  *
  * @returns {boolean} Returns true, iff every node(s) has an outgoing connection into this node
  *
  * @example <caption>Check one <code>node</code></caption>
  * const { Node } = require("@liquid-carrot/carrot");
  *
  * let other_node = new Node();
  * let node = new Node();
  * other_node.connect(node);
  *
  * console.log(node.isProjectedBy(other_node)); // true
  *
  * @example <caption>Check many <code>nodes</code></caption>
  * const { Node } = require("@liquid-carrot/carrot");
  *
  * let other_nodes = Array.from({ length: 5 }, () => new Node());
  * let node = new Node();
  *
  * other_nodes.forEach(other_node => other_node.connect(node));
  *
  * console.log(node.isProjectedBy(other_nodes)); // true
  */
  self.isProjectedBy = function(nodes) {
    if (nodes == undefined) throw new ReferenceError("Missing required parameter 'nodes'");

    if (nodes === self) return self.connections_self.weight !== 0;
    else if (!Array.isArray(nodes)) {
      for (let i = 0; i < self.incoming.length; i++) {
        if (self.incoming[i].from === nodes) return true;
      }
      return false;
    } else {
      // START: nodes.every()
      let projected_by = 0;
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        for (let j = 0; j < self.incoming.length; j++) {

          if (self.incoming[j].from === node) {
            projected_by++;
            break;
          }
        }
      }
      // END: nodes.every()

      return nodes.length === projected_by ? true : false;
    }

    // for(let i = 0; i < self.incoming.length; i++) {
    //   if(self.incoming[i].from === node) return true;
    // }

    // return false;
  },

  /**
  * Converts the node to a json object that can later be converted back
  *
  * @function toJSON
  * @memberof Node
  *
  * @returns {object}
  *
  * @example
  * const { Node } = require("@liquid-carrot/carrot");
  *
  * let node = new Node();
  *
  * console.log(node.toJSON());
  */
  self.toJSON = function () {
    return {
      bias: self.bias,
      type: self.type,
      squash: self.squash.name,
      mask: self.mask,
      shared: self.shared,
    };
  }
}

/**
* Convert a json object to a node
*
* @param {object} json A node represented as a JSON object
*
* @returns {Node} A reconstructed node
*
* @example <caption>From Object</caption>
* const { Node } = require("@liquid-carrot/carrot");
*
* let json = { bias: 0.35 };
* let node = Node.fromJSON(json);
*
* console.log(node);
*
* @example <caption>From Node.toJSON()</caption>
* const { Node } = require("@liquid-carrot/carrot");
*
* let other_node = new Node();
* let json = other_node.toJSON();
* let node = Node.fromJSON(json);
*
* console.log(node);
*
* @example <caption>From JSON string</caption>
* const { Node } = require("@liquid-carrot/carrot");
*
* let other = new Node();
* let json = other_node.toJSON();
* let string = JSON.stringify(json);
* let node = Node.fromJSON(string);
*
* console.log(node);
*/
Node.fromJSON = function (json) {
  if (json == undefined) throw new ReferenceError("Missing required parameter 'json'");

  if(typeof json === "string") json = JSON.parse(json);

  const node = new Node();

  Object.assign(node, { ...json }, {
    squash: methods.activation[json.squash]
  });

  return node;
};

module.exports = Node;
