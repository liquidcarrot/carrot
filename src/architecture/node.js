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
    connections_incoming: [],
    connections_outgoing: [],
    connections_gated: [],
    connections_self: new Connection(self, self, 0),
    error_responsibility: 0,
    error_projected: 0,
    error_gated: 0,
    ...options
  })
  
  // Object.assign(self, { type }, {
  //   bias: self.type === 'input' ? 0 : Math.random() * 2 - 1,
  //   squash: methods.activation.LOGISTIC,
  //   activation: 0,
  //   state: 0,
  //   old: 0,
    
  //   // PURPOSE: Dropout
  //   mask: 1,
    
  //   // PURPOSE: Tracking Momentum
  //   previousDeltaBias: 0, // ALIAS: delta_bias
    
  //   // PURPOSE: Batch Training
  //   totalDeltaBias: 0, // ALIAS: delta_bias
  //   connections: {
  //     in: [],
  //     out: [],
  //     gated: [],
  //     self: new Connection(this, this, 0),
      
  //     // (BETA)
  //     incoming: [],
  //     outgoing: [],
  //     gates: []
  //   },
    
  //   // Backpropagation Data
  //   error: {
  //     responsibility: 0,
  //     projected: 0,
  //     gated: 0
  //   },
    
  //   // (BETA)
  //   delta_bias: {
  //     previous: 0,
  //     total: 0,
  //     all: []
  //   }
  // });

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
    if(!(input == undefined)) {
      if(Number.isFinite(input)) return self.activation = input;
      else throw new TypeError("Parameter \"input\": " + input + " is not a valid \"number\".");
    } else if(self.type === "input") return self.activation = 0;
    
    // Update traces
    const nodes = [];
    const influences = [];

    self.old = self.state;

    // Activate (from self)
    self.state = self.connections_self.gain * self.connections_self.weight * self.state + self.bias;
    
    // Activate (from incoming connections)
    self.connections_incoming.forEach(function(connection, index) {
      self.state += connection.from.activation * connection.weight * connection.gain;
    })

    // Squash Activation
    self.activation = self.squash(self.state) * self.mask;
    self.derivative = self.squash(self.state, true);

    // Adjusting `gain` (to gated connections)
    self.connections_gated.forEach(function(connection) {
      const index = nodes.indexOf(connection.to);
      
      if(index > -1) influences[index] += connection.weight * connection.from.activation;
      else {
        nodes.push(connection.to);
        influences.push(connection.weight * connection.from.activation + (connection.to.connections_self.gater === this ? connection.to.old : 0));
      }
      
      // Adjust gain
      connection.gain = self.activation;
    })

    // Forwarding `xtrace` (to incoming connections)
    self.connections_incoming.forEach(function(connection) {
      // Trace Elegibility
      connection.elegibility = self.connections_self.gain * self.connections_self.weight * connection.elegibility + connection.from.activation * connection.gain;
      
      for(let i = 0; i < nodes.length; i++) {
        const [ node, influence ]  = [nodes[i], influences[i]];
        
        const index = connection.xtrace_nodes.indexOf(node);
        
        if(index > -1) connection.xtrace_values[index] = node.connections_self.gain * node.connections_self.weight * connection.xtrace_values[index] + self.derivative * connection.elegibility * influence;
        else {
          connection.xtrace_nodes.push(node);
          connection.xtrace_values.push(self.derivative * connection.elegibility * influence);
        }
      }
    })

    return self.activation;
  },

  /**
  * Activates the node without calculating elegibility traces and such.
  *
  * Calculates the state from all the input connections, adds the bias, and 'squashes' it. Does not calculate traces, so this can't be used to backpropagate afterwards. That's also why it's quite a bit faster than regular `activate`.
  *
  * @function noTraceActivate
  * @memberof Node
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
  self.noTraceActivate = function(input) {
    // Check if an input is given
    if(!(input == undefined)) {
      if(Number.isFinite(input)) return self.activation = input;
      else throw new TypeError("Parameter \"input\": " + input + " is not a valid \"number\".");
    } else if(self.type === "input") return self.activation = 0;

    // Activate (from self)
    self.state = self.connections_self.gain * self.connections_self.weight * self.state + self.bias;
    
    // Activate (from incoming connections)
    self.connections_incoming.forEach(function(connection, index) {
      self.state += connection.from.activation * connection.weight * connection.gain;
    })

    // Squash the values received
    self.activation = self.squash(self.state);

    self.connections_gated.forEach(function(gate) {
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
  * @function propagate
  * @memberof Node
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
    
    options = {
      momentum: 0,
      rate: 0.3,
      update: true,
      ...options
    }

    // Output Node Error (from environment)
    if(self.type === 'output') self.error_responsibility = self.error_projected = target - self.activation;
    // Hidden/Input Node Error (from backpropagation)
    else {
      let i;
      
      // Projected Error Responsibility (from outgoing connections)
      self.error_projected = self.derivative * self.connections_outgoing.reduce(function(error, connection) {
        return error += connection.to.error_responsibility * connection.weight * connection.gain;
      }, 0);
      
      // Gated Error Responsibility (from gated connections)
      self.error_gated = self.derivative * self.connections_gated.reduce(function(error, connection) {
        const node = connection.to;
        const influence = (node.connections_self.gater === self ? node.old : 0) + connection.weight * connection.from.activation;
        
        return error += node.error_reponsibility * influence;
      }, 0);
      
      // Error Responsibility
      self.error_responsibility = self.error_projected + self.error_gated;
    }

    if(self.type === 'constant') return;

    // Adjust Incoming Connections
    self.connections_incoming.forEach(function(connection) {
      const gradient = connection.xtrace_nodes.reduce(function(gradient, node, index) {
        return gradient += node.error_responsibility * connection.xtrace_values[index];
      }, self.error_projected * connection.elegibility);
      
      // Adjust Weight ()
      connection.delta_weights_total += options.rate * gradient * self.mask;
      if (options.update) {
        connection.delta_weights_total += options.momentum * connection.delta_weights_previous;
        connection.weight += connection.delta_weights_total;
        connection.delta_weights_previous = connection.delta_weights_total;
        connection.delta_weights_total = 0;
      }
    })

    // Adjust Bias
    // self.totalDeltaBias += options.rate * self.error.responsibility;
    self.delta_bias_total += options.rate * self.error_responsibility;
    if(options.update) {
      self.delta_bais_total += options.momentum * self.delta_bais_previous;
      self.bias += self.delta_bais_total;
      self.delta_bais_previous = self.delta_bais_total;
      self.delta_bais_total = 0;
      // self.totalDeltaBias += options.momentum * self.previousDeltaBias;
      // self.bias += self.totalDeltaBias;
      // self.previousDeltaBias = self.totalDeltaBias;
      // self.totalDeltaBias = 0;
    }
  },

  /**
  * Creates a connection from this node to the given node or group
  *
  * @param {Node|Node[]} node Node(s) to project connection(s) to
  * @param {number} weight Initial connection(s) [weight](https://en.wikipedia.org/wiki/Synaptic_weight)
  *
  * @function connect
  * @memberof Node
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
  self.connect = function(target, weight, options) {
    if(target == undefined) throw new ReferenceError("Missing required parameter 'target'");
    
    if (target instanceof Node) {
      if (self.isProjectingTo(target)) throw new ReferenceError("Node is already projecting to 'target'");
      else if (target === self) {
        self.connections_self.weight = weight || 1;
        return self.connections_self;
      } else {
        const connection = new Connection(self, target, weight, options);
        
        self.connections_outgoing.push(connection);
        target.connections_incoming.push(connection);
        
        return connection;
      }
    }
    else if (Array.isArray(target)) {
      const connections = [];
      
      for (let index = 0; index < target.length; index++) {
        const connection = new Connection(self, target[index], weight, options);
        
        self.connections_outgoing.push(connection);
        target[index].connections_incoming.push(connection);
        connections.push(connection);
      }
      
      return connections;
    }
    else throw new TypeError(`Parameter 'target': Expected 'Node' or 'Node[]' - but recieved, ${target}`);
    
    // const connections = [];
    
    // if(target instanceof Node) {
    //   if(self.isProjectingTo(target)) throw new Error('Already projecting a connection to this node!'); // Should this throw an error or just a "warning" and update `wieght`, `options`?
    //   if(target === self) {
    //     self.connections_self.weight = weight || 1;
    //     return self.connections_self;
    //   } else {
    //     const connection = new Connection(self, target, weight, options);
        
    //     target.connections_incoming.push(connection);
    //     self.connections_outgoing.push(connection);
    //     return connection;
    //   }
    // } else if(target instanceof Group) {
    //   target.nodes.forEach(function(node) {
    //     const connection = new Connection(self, node, weight, options);
        
    //     node.connections_incoming.push(connection);
    //     self.connections_outgoing.push(connection);
    //     target.connections_incoming.push(connection);
    //     connections.push(connection);
    //   })
    // } else if(target instanceof Layer) {
    //   target.nodes.forEach(node => {
    //     connections.push(node);
    //   })
    // }
    
    // return connections;
  },

  /**
  * Disconnects this node from the other node
  *
  * @function disconnect
  * @memberof Node
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
  self.disconnect = function(node, twosided) {
    if(self === node) self.connections_self.weight = 0;
    else {
      for(let index = 0; index < self.connections_outgoing.length; index++) {
        const connection = self.connections_outgoing[index];
        
        if(connection.to === node) {
          self.connections_outgoing.splice(index, 1);
          
          connection.to.connections_incoming.splice(connection.to.connections_incoming.indexOf(connection), 1);
          
          if(connection.gater !== null) connection.gater.ungate(connection);
          
          break;
        }
      }

      if(twosided) node.disconnect(self);
    }
  },

  /**
  * Neurons can gate connections. This means that the output (activation value) of a neuron influences the value sent through a connection.
  *
  * @function gate
  * @memberof Node
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
  self.gate = function(connections) {
    if(!Array.isArray(connections)) connections = [connections];

    for(let index = 0; index < connections.length; index++) {
      const connection = connections[index];

      self.connections_gated.push(connection);
      connection.gater = self;
    }
  },

  /**
  * Removes the gates from this node from the given connection(s)
  *
  * @function ungate
  * @memberof Node
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
  self.ungate = function(connections) {
    if(!Array.isArray(connections)) connections = [connections];

    for(let index = connections.length - 1; index >= 0; index--) {
      const connection = connections[index];

      const gate = self.connections_gated.indexOf(connection);
      self.connections_gated.splice(gate, 1);
      connection.gater = null;
      connection.gain = 1;
    }
  },

  /**
  * Clear the context of the node, basically reverting it to a 'new' neuron. Useful for predicting timeseries with LSTM's.
  *
  * @function clear
  * @memberof Node
  */
  self.clear = function() {
    for(let index = 0; index < self.connections_incoming.length; index++) {
      const connection = self.connections_incoming[index];

      connection.elegibility = 0;
      connection.xtrace_nodes = []
      connection.xtrace_values = [];
    }

    for(let index = 0; index < self.connections_gated.length; index++) {
      const connection = self.connections_gated[index];
      connection.gain = 0;
    }

    self.error_responsibility = self.error_projected = self.error_gated = 0;
    self.old = self.state = self.activation = 0;
  },

  /**
  * Mutates the node with the given method
  *
  * @function mutate
  * @memberof Node
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
    if(method == undefined) throw new Error('No mutate method given!');
    // CHECK: https://scotch.io/bar-talk/5-tips-to-write-better-conditionals-in-javascript
    else if(!(method.name in methods.mutation)) throw new Error('This method does not exist!');

    switch(method) {
      case methods.mutation.MOD_ACTIVATION:
        // Pick Different Squash
        // const squash = method.allowed[("exclude current" + "other random index" + "overflow...") % "...control"]
        self.squash = method.allowed[(method.allowed.indexOf(self.squash) + Math.floor(Math.random() * (method.allowed.length - 1)) + 1) % method.allowed.length];
        break;
      case methods.mutation.MOD_BIAS:
        self.bias += Math.random() * (method.max - method.min) + method.min;
        break;
    }
  },

  /**
  * Checks if this node is projecting to the given node
  *
  * @function isProjectingTo
  * @memberof Node
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
  self.isProjectingTo = function(node) {
    if(node === self && self.connections_self.weight !== 0) return true;

    for(let i = 0; i < self.connections_outgoing.length; i++) {
      if(self.connections_outgoing[i].to === node) return true;
    }
    
    return false;
  },

  /**
  * Checks if the given node is projecting to this node
  *
  * @function isProjectedBy
  * @memberof Node
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
  self.isProjectedBy = function(node) {
    if(node === self && self.connections_self.weight !== 0) return true;

    for(let i = 0; i < self.connections_incoming.length; i++) {
      if(self.connections_incoming[i].from === node) return true;
    }

    return false;
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
  * let { Node } = require("@liquid-carrot/carrot");
  *
  * let exported = myNode.toJSON();
  * let imported = myNode.fromJSON(exported); // imported will be a new instance of Node that is an exact clone of myNode.
  */
  self.toJSON = function () {
    return {
      bias: self.bias,
      type: self.type,
      squash: self.squash.name,
      mask: self.mask
    };
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
* let exported = myNode.toJSON();
* let imported = myNode.fromJSON(exported); // imported will be a new instance of Node that is an exact clone of myNode.
*/
Node.fromJSON = function (json) {
  const node = new Node();
  
  Object.assign(node, { ...json }, {
    squash: methods.activation[json.squash]
  });

  return node;
};

module.exports = Node;