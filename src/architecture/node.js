const _ = require("lodash");
const methods = require('../methods/methods');
const Connection = require('./connection');
const config = require('../config');

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
* @param {string} [type=hidden] Can be: `input`, `hidden`, or `output`
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
* @prop {Array<Connection>} connections.in Incoming connections to this node
* @prop {Array<Connection>} connections.out Outgoing connections from this node
* @prop {Array<Connection>} connections.gated Connections this node gates
* @prop {Connection} connections.self A self-connection
* @prop {number} error.responsibility
* @prop {number} error.projected
* @prop {number} error.gated
*
* @example
* let { Node } = require("@liquid-carrot/carrot");
*
* let node = new Node();
*/
function Node(type) {
  let self = this;
  
  type = type || 'hidden';
  
  _.assignIn(self, _.defaults({ type }, {
    bias: self.type === 'input' ? 0 : Math.random() * 2 - 1,
    squash: methods.activation.LOGISTIC,
    activation: 0,
    state: 0,
    old: 0,
    
    // PURPOSE: Dropout
    mask: 1,
    
    // PURPOSE: Tracking Momentum
    previousDeltaBias: 0, // ALIAS: delta_bias
    
    // PURPOSE: Batch Training
    totalDeltaBias: 0, // ALIAS: delta_bias
    connections: {
      in: [],
      out: [],
      gated: [],
      self: new Connection(this, this, 0),
      
      // (BETA)
      incoming: [],
      outgoing: [],
      gates: []
    },
    
    // Backpropagation Data
    error: {
      responsibility: 0,
      projected: 0,
      gated: 0
    },
    
    // (BETA)
    delta_bias: {
      previous: 0,
      total: 0,
      all: []
    }
  }));

  /**
  * Actives the node.
  *
  * When a neuron activates, it computes its state from all its input connections and 'squashes' it using its activation function, and returns the output (activation).
  *
  * You can also provide the activation (a float between 0 and 1) as a parameter, which is useful for neurons in the input layer.
  *
  * @param {number} [input] _defaults to `0` when `node.type === "input"`._
  * @param {Object} [options]
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
    // If an input is given, forward it (i.e. act like an input neuron)
    if(!_.isNil(input)) {
      if(_.isFinite(input)) return self.activation = input;
      else throw new TypeError("Parameter \"input\": " + input + " is not a valid \"number\".");
    } else if(self.type === "input") return self.activation = 0;
    
    // Update traces
    const nodes = [];
    const influences = [];

    self.old = self.state;

    // Activate (from self)
    self.state = self.connections.self.gain * self.connections.self.weight * self.state + self.bias;
    
    // Activate (from incoming connections)
    _.each(self.connections.in, function(connection, index) {
      self.state += connection.from.activation * connection.weight * connection.gain;
    })

    // Squash Activation
    self.activation = self.squash(self.state) * self.mask;
    self.derivative = self.squash(self.state, true);

    // Adjusting `gain` (to gated connections)
    _.each(self.connections.gated, function(connection) {
      const index = nodes.indexOf(connection.to);
      
      if(index > -1) influences[index] += connection.weight * connection.from.activation;
      else {
        nodes.push(connection.to);
        influences.push(connection.weight * connection.from.activation + (connection.to.connections.self.gater === this ? connection.to.old : 0));
      }
      
      // Adjust gain
      connection.gain = self.activation;
    })

    // Forwarding `xtrace` (to incoming connections)
    _.each(self.connections.in, function(connection) {
      // Trace Elegibility
      connection.elegibility = self.connections.self.gain * self.connections.self.weight * connection.elegibility + connection.from.activation * connection.gain;
      
      _.times(nodes.length, function(i) {
        const [ node, influence ]  = [nodes[i], influences[i]];
        
        const index = connection.xtrace.nodes.indexOf(node);
        
        if(index > -1) connection.xtrace.values[index] = node.connections.self.gain * node.connections.self.weight * connection.xtrace.values[index] + self.derivative * connection.elegibility * influence;
        else {
          connection.xtrace.nodes.push(node);
          connection.xtrace.values.push(this.derivative * connection.elegibility * influence);
        }
      })
    })

    return self.activation;
  },

  /**
  * Activates the node without calculating elegibility traces and such.
  *
  * Calculates the state from all the input connections, adds the bias, and 'squashes' it. Does not calculate traces, so this can't be used to backpropagate afterwards. That's also why it's quite a bit faster than regular `activate`.
  *
  * @param {number} [input] Optional value to be used for an input (or forwarding) neuron
  *
  * @returns {number} A neuron's ['Squashed'](https://medium.com/the-theory-of-everything/understanding-activation-functions-in-neural-networks-9491262884e0) output value
  *
  * @example
  * let { Node } = require("@liquid-carrot/carrot");
  *
  * let node = new Node();
  *
  * node.no_trace_activate(); // 0.4923128591923
  */
  self.no_trace_activate = function(input) {
    // Check if an input is given
    if(!_.isNil(input)) {
      if(_.isFinite(input)) return self.activation = input;
      else throw new TypeError("Parameter \"input\": " + input + " is not a valid \"number\".");
    } else if(self.type === "input") return self.activation = 0;

    // Activate (from self)
    self.state = self.connections.self.gain * self.connections.self.weight * self.state + self.bias;
    
    // Activate (from incoming connections)
    _.each(self.connections.in, function(connection, index) {
      self.state += connection.from.activation * connection.weight * connection.gain;
    })

    // Squash the values received
    self.activation = self.squash(self.state);

    _.each(self.connections.gated, function(gate) {
      gate.gain = self.activation;
    })

    return self.activation;
  },

  /**
  * Backpropagate the error (a.k.a. learn).
  *
  * After an activation, you can teach the node what should have been the correct output (a.k.a. train). This is done by backpropagating. [Momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html) adds a fraction of the previous weight update to the current one. When the gradient keeps pointing in the same direction, this will increase the size of the steps taken towards the minimum.
  *
  * If you combine a high learning rate with a lot of momentum, you will rush past the minimum (of the error function) with huge steps. It is therefore often necessary to reduce the global learning rate µ when using a lot of momentum (m close to 1).
  *
  * @param {number} target The target value
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
    // node.propagate(options)
    if(!options && _.isPlainObject(target)) {
      options = target;
      target = undefined;
    }
    
    options = _.defaults(options, {
      momentum: 0,
      rate: 0.3,
      update: true
    })

    // Error Aggregator
    let error = 0;

    // Output Node Error (from environment)
    if(self.type === 'output') self.error.responsibility = self.error.projected = target - self.activation;
    // Hidden/Input Node Error (from backpropagation)
    else {
      var i;
      
      // Projected Error Responsibility (from outgoing connections)
      self.error.projected = self.derivative * self.connections.out.reduce(function(error, connection) {
        return error += connection.to.error.responsibility * connection.weight * connection.gain;
      }, 0);
      
      // Gated Error Responsibility (from gated connections)
      self.error.gated = self.derivative * self.connections.gated.reduce(function(error, connection) {
        const node = connection.to;
        const influence = (node.connections.self.gater === self ? node.old : 0) + connection.weight * connection.from.activation;
        
        return error += node.error.reponsibility * influence;
      }, 0);
      
      // Error Responsibility
      self.error.responsibility = self.error.projected + self.error.gated;
    }

    if(self.type === 'constant') return;

    // Adjust Incoming Connections
    self.connections.in.forEach(function(connection) {
      const gradient = connection.xtrace.nodes.reduce(function(gradient, node, index) {
        return gradient += node.error.responsibility * connection.xtrace.values[index];
      }, self.error.projected * connection.elegibility);
      
      // Adjust Weight ()
      connection.totalDeltaWeight += options.rate * gradient * self.mask; // (BETA): connection.delta_weights.total += delta_weight;
      if(options.update) {
        connection.totalDeltaWeight += options.momentum * connection.previousDeltaWeight; // (BETA): connection.delta_weights.total += options.momentum * connection.delta_weights.previous;
        connection.weight += connection.totalDeltaWeight; // (BETA): connection.weight += connection.delta_weights.total;
        connection.previousDeltaWeight = connection.totalDeltaWeight; // (BETA): connection.delta_weights.previous += connection.delta_weights.total;
        connection.totalDeltaWeight = 0; // (BETA): connection.delta_weights.total
      }
    })

    // Adjust Bias
    self.totalDeltaBias += options.rate * self.error.responsibility;
    if(options.update) {
      self.totalDeltaBias += options.momentum * self.previousDeltaBias;
      self.bias += self.totalDeltaBias;
      self.previousDeltaBias = self.totalDeltaBias;
      self.totalDeltaBias = 0;
    }
  },

  /**
  * Creates a connection from this node to the given node or group
  *
  * @param {Node|Group} target Node or Group to project connections to
  * @param {number} weight An initial [weight](https://en.wikipedia.org/wiki/Synaptic_weight) for the target Node(s)
  *
  * @returns {Connection[]}
  *
  * @example <caption>Connecting to other neurons and groups</caption>
  * let { Node } = require("@liquid-carrot/carrot");
  *
  * let A = new Node();
  * let B = new Node();
  * A.connect(B); // A now projects a connection to B
  *
  * // But you can also connect nodes to groups
  * let C = new Group(4);
  *
  * B.connect(C); // B now projects a connection to all nodes in C
  *
  * @example <caption>A neuron can also connect to itself, creating a selfconnection</caption>
  * let { Node } = require("@liquid-carrot/carrot");
  *
  * let A = new Node();
  * A.connect(A); // A now connects to itself
  */
  self.connect = function (target, weight) {
    var connections = [];
    if (typeof target.bias !== 'undefined') { // must be a node!
      if (this.isProjectingTo(target)) {
        throw new Error('Already projecting a connection to this node!');
      }
      if (target === this) { // self-connection that doesn't yet exist
        this.connections.self.weight = weight || 1;
        connections.push(this.connections.self);
      } else { // connection between nodes
        let connection = new Connection(this, target, weight);
        target.connections.in.push(connection);
        this.connections.out.push(connection);
        connections.push(connection);
      }
    } else { // should be a group
      for (var i = 0; i < target.nodes.length; i++) {
        let connection = new Connection(this, target.nodes[i], weight);
        target.nodes[i].connections.in.push(connection);
        this.connections.out.push(connection);
        target.connections.in.push(connection);

        connections.push(connection);
      }
    }
    return connections;
  },

  /**
  * Disconnects this node from the other node
  *
  * @param {Node} node
  * @param {boolean} [twosided] If the nodes project a connection to each other (two way connection), set this to true to disconnect both connections at once
  *
  * @example <caption>One sided connection</caption>
  * let { Node } = require("@liquid-carrot/carrot");
  *
  * let A = new Node();
  * let B = new Node();
  * A.connect(B); // A now projects a connection to B
  *
  * A.disconnect(B); // no connection between A and B anymore
  *
  * @example <caption>Two-sided connection</caption>
  * let { Node } = require("@liquid-carrot/carrot");
  *
  * let A = new Node();
  * let B = new Node();
  * A.connect(B); // A now projects a connection to B
  * B.connect(A); // B now projects a connection to A
  *
  * // A.disconnect(B)  only disconnects A to B, so use
  * A.disconnect(B, true); // or B.disconnect(A, true)
  */
  self.disconnect = function (node, twosided) {
    if (this === node) {
      this.connections.self.weight = 0;
      return;
    }

    for (var i = 0; i < this.connections.out.length; i++) {
      let conn = this.connections.out[i];
      if (conn.to === node) {
        this.connections.out.splice(i, 1);
        let j = conn.to.connections.in.indexOf(conn);
        conn.to.connections.in.splice(j, 1);
        if (conn.gater !== null) conn.gater.ungate(conn);
        break;
      }
    }

    if (twosided) {
      node.disconnect(this);
    }
  },

  /**
  * Neurons can gate connections. This means that the output (activation value) of a neuron influences the value sent through a connection.
  *
  * @param {Connection[]|Connection} connections Connections to be gated (influenced) by a neuron
  *
  * @example
  * let { Node } = require("@liquid-carrot/carrot");
  *
  * let A = new Node();
  * let B = new Node();
  * let C = new Node();
  *
  * connections = A.connect(B);
  *
  * // Now gate the connection(s)
  * C.gate(connections);
  *
  * // Now the weight of the connection from A to B will always be multiplied by the activation of node C.
  */
  self.gate = function (connections) {
    if (!Array.isArray(connections)) {
      connections = [connections];
    }

    for (var i = 0; i < connections.length; i++) {
      var connection = connections[i];

      this.connections.gated.push(connection);
      connection.gater = this;
    }
  },

  /**
  * Removes the gates from this node from the given connection(s)
  *
  * @param {Connection[]|Connection} connections Connections to be ungated
  *
  * @example
  * let { Node } = require("@liquid-carrot/carrot");
  *
  * let A = new Node();
  * let B = new Node();
  * let C = new Node();
  * let connections = A.connect(B);
  *
  * // Now gate the connection(s)
  * C.gate(connections);
  *
  * // Now ungate those connections
  * C.ungate(connections);
  */
  self.ungate = function (connections) {
    if (!Array.isArray(connections)) {
      connections = [connections];
    }

    for (var i = connections.length - 1; i >= 0; i--) {
      var connection = connections[i];

      var index = this.connections.gated.indexOf(connection);
      this.connections.gated.splice(index, 1);
      connection.gater = null;
      connection.gain = 1;
    }
  },

  /**
  * Clear the context of the node, basically reverting it to a 'new' neuron. Useful for predicting timeseries with LSTM's.
  */
  self.clear = function () {
    for (var i = 0; i < this.connections.in.length; i++) {
      var connection = this.connections.in[i];

      connection.elegibility = 0;
      connection.xtrace = {
        nodes: [],
        values: []
      };
    }

    for (i = 0; i < this.connections.gated.length; i++) {
      let conn = this.connections.gated[i];
      conn.gain = 0;
    }

    this.error.responsibility = this.error.projected = this.error.gated = 0;
    this.old = this.state = this.activation = 0;
  },

  /**
  * Mutates the node with the given method
  *
  * @param {mutation} method A [Mutation Method](mutation), either MOD_ACTIVATION or MOD_BIAS
  *
  * @example
  * let { Node } = require("@liquid-carrot/carrot");
  *
  * let A = new Node(); // a Node with the default LOGISTIC squash function
  *
  * let allowable_methods = [
  *   activation.TANH,
  *   activation.RELU,
  * ]
  *
  * A.mutate(methods.mutation.MOD_ACTIVATION, allowable_methods) // node's squash function is now TANH or RELU
  */
  self.mutate = function(method) {
    if (typeof method === 'undefined') {
      throw new Error('No mutate method given!');
    } else if (!(method.name in methods.mutation)) {
      throw new Error('This method does not exist!');
    }

    switch (method) {
      case methods.mutation.MOD_ACTIVATION:
        // Can't be the same squash
        var squash = method.allowed[(method.allowed.indexOf(this.squash) + Math.floor(Math.random() * (method.allowed.length - 1)) + 1) % method.allowed.length];
        this.squash = squash;
        break;
      case methods.mutation.MOD_BIAS:
        var modification = Math.random() * (method.max - method.min) + method.min;
        this.bias += modification;
        break;
    }
  },

  /**
  * Checks if this node is projecting to the given node
  *
  * @param {Node} node Node to check for a connection to
  * @returns {boolean} True if there is a connection from this node to a given node
  *
  * @example
  * let { Node } = require("@liquid-carrot/carrot");
  *
  * let A = new Node();
  * let B = new Node();
  * let C = new Node();
  * A.connect(B);
  * B.connect(C);
  *
  * A.isProjectingTo(B); // true
  * A.isProjectingTo(C); // false
  */
  self.isProjectingTo = function (node) {
    if (node === this && this.connections.self.weight !== 0) return true;

    for (var i = 0; i < this.connections.out.length; i++) {
      var conn = this.connections.out[i];
      if (conn.to === node) {
        return true;
      }
    }
    return false;
  },

  /**
  * Checks if the given node is projecting to this node
  *
  * @param {Node} node Node to check for a connection from
  * @returns {boolean} True if there is a connection from the given node to this node
  *
  * @example
  * let { Node } = require("@liquid-carrot/carrot");
  *
  * let A = new Node();
  * let B = new Node();
  * let C = new Node();
  * A.connect(B);
  * B.connect(C);
  *
  * A.isProjectedBy(C);// false
  * B.isProjectedBy(A); // true
  */
  self.isProjectedBy = function (node) {
    if (node === this && this.connections.self.weight !== 0) return true;

    for (var i = 0; i < this.connections.in.length; i++) {
      var conn = this.connections.in[i];
      if (conn.from === node) {
        return true;
      }
    }

    return false;
  },

  /**
  * Converts the node to a json object that can later be converted back
  *
  * @returns {object}
  *
  * @example
  * let { Node } = require("@liquid-carrot/carrot");
  *
  * let exported = myNode.to_JSON();
  * let imported = myNode.from_JSON(exported); // imported will be a new instance of Node that is an exact clone of myNode.
  */
  self.to_JSON = function () {
    var json = {
      bias: this.bias,
      type: this.type,
      squash: this.squash.name,
      mask: this.mask
    };

    return json;
  }
}

/**
* Convert a json object to a node
*
* @param {object} json A node represented as a JSON object
* @returns {Node} A reconstructed node
*
* @example
* let { Node } = require("@liquid-carrot/carrot");
*
* let exported = myNode.to_JSON();
* let imported = myNode.from_JSON(exported); // imported will be a new instance of Node that is an exact clone of myNode.
*/
Node.from_JSON = function (json) {
  var node = new Node();
  node.bias = json.bias;
  node.type = json.type;
  node.mask = json.mask;
  node.squash = methods.activation[json.squash];

  return node;
};

module.exports = Node;
