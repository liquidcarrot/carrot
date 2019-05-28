let _ = require("lodash");
let methods = require('../methods/methods');
let Connection = require('./connection');
let config = require('../config');

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
  this.bias = (type === 'input') ? 0 : Math.random() * 0.2 - 0.1;
  this.squash = methods.activation.LOGISTIC;
  this.type = type || 'hidden';

  this.activation = 0;
  this.state = 0;
  this.old = 0;

  // For dropout
  this.mask = 1;

  // For tracking momentum
  this.previousDeltaBias = 0;

  // Batch training
  this.totalDeltaBias = 0;
  
  // Aliases
  this.deltabias = {
    previous: 0,
    total: 0
  }

  this.connections = {
    in: [],
    out: [],
    gated: [],
    self: new Connection(this, this, 0)
  };

  // Data for backpropagation
  this.error = {
    responsibility: 0,
    projected: 0,
    gated: 0
  };
}

Node.prototype = {
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
  activate: function(input, options) {
    let self = this;
    
    // If an input is given, forward it (i.e. act like an input neuron)
    if(!_.isNil(input)) {
      if(_.isNumber(input)) {
        if(_.isFinite(input)) {
          this.activation = input;
          return this.activation;
        } else {
          throw new TypeError("Parameter \"input\": " + input + " is not a valid \"number\".");
        }
      } else {
        throw new TypeError("Parameter \"input\": Expected a \"number\", got a " + typeof input);
      }
    } else if(self.type === "input") {
      this.activation = 0;
      return this.activation;
    }

    this.old = this.state;

    // All activation sources coming from the node itself
    this.state = this.connections.self.gain * this.connections.self.weight * this.state + this.bias;

    // Activation sources coming from connections
    var i;
    for (i = 0; i < this.connections.in.length; i++) {
      const connection = this.connections.in[i];
      this.state += connection.from.activation * connection.weight * connection.gain;
    }

    // Squash the values received
    this.activation = this.squash(this.state) * this.mask;
    this.derivative = this.squash(this.state, true);

    // Update traces
    var nodes = [];
    var influences = [];

    for (i = 0; i < this.connections.gated.length; i++) {
      let conn = this.connections.gated[i];
      let node = conn.to;

      let index = nodes.indexOf(node);
      if (index > -1) {
        influences[index] += conn.weight * conn.from.activation;
      } else {
        nodes.push(node);
        influences.push(conn.weight * conn.from.activation +
          (node.connections.self.gater === this ? node.old : 0));
      }

      // Adjust the gain to this nodes' activation
      conn.gain = this.activation;
    }

    for (i = 0; i < this.connections.in.length; i++) {
      let connection = this.connections.in[i];

      // Elegibility trace
      connection.elegibility = this.connections.self.gain * this.connections.self.weight * connection.elegibility + connection.from.activation * connection.gain;

      // Extended trace
      for (var j = 0; j < nodes.length; j++) {
        let node = nodes[j];
        let influence = influences[j];

        let index = connection.xtrace.nodes.indexOf(node);

        if (index > -1) {
          connection.xtrace.values[index] = node.connections.self.gain * node.connections.self.weight *
          connection.xtrace.values[index] + this.derivative * connection.elegibility * influence;
        } else {
          // Does not exist there yet, might be through mutation
          connection.xtrace.nodes.push(node);
          connection.xtrace.values.push(this.derivative * connection.elegibility * influence);
        }
      }
    }

    return this.activation;
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
  * node.noTraceActivate(); // 0.4923128591923
  */
  noTraceActivate: function(input) {
    // Check if an input is given
    if(!_.isNil(input)) {
      if(_.isNumber(input)) {
        if(_.isFinite(input)) {
          this.activation = input;
          return this.activation;
        } else {
          throw new TypeError("Parameter \"input\": " + input + " is not a valid \"number\".");
        }
      } else {
        throw new TypeError("Parameter \"input\": Expected a \"number\", got a " + typeof input);
      }
    }

    // All activation sources coming from the node itself
    this.state = this.connections.self.gain * this.connections.self.weight * this.state + this.bias;

    // Activation sources coming from connections
    var i;
    for (i = 0; i < this.connections.in.length; i++) {
      var connection = this.connections.in[i];
      this.state += connection.from.activation * connection.weight * connection.gain;
    }

    // Squash the values received
    this.activation = this.squash(this.state);

    for (i = 0; i < this.connections.gated.length; i++) {
      this.connections.gated[i].gain = this.activation;
    }

    return this.activation;
  },

  /**
  * Backpropagate the error (a.k.a. learn).
  *
  * After an activation, you can teach the node what should have been the correct output (a.k.a. train). This is done by backpropagating. [Momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html) adds a fraction of the previous weight update to the current one. When the gradient keeps pointing in the same direction, this will increase the size of the steps taken towards the minimum.
  *
  * If you combine a high learning rate with a lot of momentum, you will rush past the minimum (of the error function) with huge steps. It is therefore often necessary to reduce the global learning rate µ when using a lot of momentum (m close to 1).
  *
  * @param {number} rate=0.3 [Learning rate](https://towardsdatascience.com/understanding-learning-rates-and-how-it-improves-performance-in-deep-learning-d0d4059c1c10)
  * @param {number} momentum=0 [Momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html) adds a fraction of the previous weight update to the current one.
  * @param {boolean} update=true When set to false weights won't update, but when set to true after being false the last propagation will include the deltaweights of the first "update:false" propagations too.
  * @param {number} target The target value
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
  propagate: function(rate, momentum, update, target) {
    // TYPE CHECK: rate
    if(!_.isNil(rate)) {
      if(_.isNumber(rate)) {
        if(!_.isFinite(rate)) {
          throw new TypeError("Parameter \"rate\": " + rate + " is not a valid \"number\".");
        }
      } else {
        throw new TypeError("Parameter \"rate\": Expected a \"number\", got a " + typeof rate);
      }
      
    }
    // TYPE CHECK: momentum
    if(!_.isNil(momentum)) {
      if(_.isNumber(momentum)) {
        if(!_.isFinite(momentum)) {
          throw new TypeError("Parameter \"momentum\": " + momentum + " is not a valid \"number\".");
        }
      } else {
        throw new TypeError("Parameter \"momentum\": Expected a \"number\", got a " + typeof momentum);
      }
    }
    // TYPE CHECK: update
    if(!_.isNil(update)) {
      if(!_.isBoolean(update)) {
        throw new TypeError("Parameter \"update\": Expected a \"boolean\", got a " + typeof update);
      }
    }
    // TYPE CHECK: target
    if(!_.isNil(target)) {
      if(_.isNumber(target)) {
        if(!_.isFinite(target)) {
          throw new TypeError("Parameter \"target\": " + target + " is not a valid \"number\".");
        }
      } else {
        throw new TypeError("Parameter \"target\": Expected a \"number\", got a " + typeof target);
      }
    }
    
    
    momentum = momentum || 0;
    rate = rate || 0.3;

    // Error accumulator
    var error = 0;

    // Output nodes get their error from the enviroment
    if (this.type === 'output') {
      this.error.responsibility = this.error.projected = target - this.activation;
    } else { // the rest of the nodes compute their error responsibilities by backpropagation
      // error responsibilities from all the connections projected from this node
      var i;
      for (i = 0; i < this.connections.out.length; i++) {
        let connection = this.connections.out[i];
        let node = connection.to;
        // Eq. 21
        error += node.error.responsibility * connection.weight * connection.gain;
      }

      // Projected error responsibility
      this.error.projected = this.derivative * error;

      // Error responsibilities from all connections gated by this neuron
      error = 0;

      for (i = 0; i < this.connections.gated.length; i++) {
        let conn = this.connections.gated[i];
        let node = conn.to;
        let influence = node.connections.self.gater === this ? node.old : 0;

        influence += conn.weight * conn.from.activation;
        error += node.error.responsibility * influence;
      }

      // Gated error responsibility
      this.error.gated = this.derivative * error;

      // Error responsibility
      this.error.responsibility = this.error.projected + this.error.gated;
    }

    if (this.type === 'constant') return;

    // Adjust all the node's incoming connections
    for (i = 0; i < this.connections.in.length; i++) {
      let connection = this.connections.in[i];

      let gradient = this.error.projected * connection.elegibility;

      for (var j = 0; j < connection.xtrace.nodes.length; j++) {
        let node = connection.xtrace.nodes[j];
        let value = connection.xtrace.values[j];
        gradient += node.error.responsibility * value;
      }

      // Adjust weight
      let deltaWeight = rate * gradient * this.mask;
      connection.totalDeltaWeight += deltaWeight;
      if (update) {
        connection.totalDeltaWeight += momentum * connection.previousDeltaWeight;
        connection.weight += connection.totalDeltaWeight;
        connection.previousDeltaWeight = connection.totalDeltaWeight;
        connection.totalDeltaWeight = 0;
      }
    }

    // Adjust bias
    var deltaBias = rate * this.error.responsibility;
    this.totalDeltaBias += deltaBias;
    if (update) {
      this.totalDeltaBias += momentum * this.previousDeltaBias;
      this.bias += this.totalDeltaBias;
      this.previousDeltaBias = this.totalDeltaBias;
      this.totalDeltaBias = 0;
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
  connect: function (target, weight) {
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
  disconnect: function (node, twosided) {
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
  gate: function (connections) {
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
  ungate: function (connections) {
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
  clear: function () {
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
  mutate: function(method) {
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
  isProjectingTo: function (node) {
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
  isProjectedBy: function (node) {
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
  * let exported = myNode.toJSON();
  * let imported = myNode.fromJSON(exported); // imported will be a new instance of Node that is an exact clone of myNode.
  */
  toJSON: function () {
    var json = {
      bias: this.bias,
      type: this.type,
      squash: this.squash.name,
      mask: this.mask
    };

    return json;
  }
};

/**
* Convert a json object to a node
*
* @param {object} json A node represented as a JSON object
* @returns {Node} A reconstructed node
*
* @example
* let { Node } = require("@liquid-carrot/carrot");
*
* let exported = myNode.toJSON();
* let imported = myNode.fromJSON(exported); // imported will be a new instance of Node that is an exact clone of myNode.
*/
Node.fromJSON = function (json) {
  var node = new Node();
  node.bias = json.bias;
  node.type = json.type;
  node.mask = json.mask;
  node.squash = methods.activation[json.squash];

  return node;
};

module.exports = Node;
