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
  * @todo Support vector/tensor/array activation
  *
  * @param {number} [input] _defaults to `0` when `node.type === "input"`._
  * @param {Object} [options]
  * @param {boolean} [options.trace]
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
    } else if(options.trace) {
      // Update traces
      const nodes = [];
      const influences = [];
  
      self.old = self.state;
  
      // Activate (from self)
      self.state = self.connections_self.gain * self.connections_self.weight * self.state + self.bias;
      
      // Activate (from incoming connections)
      for (let i = 0; i < self.connections_incoming.length; i++) {
        const connection = self.connections_incoming[i];
        
        self.state += connection.from.activation * connection.weight * connection.gain;
      }
  
      // Squash Activation
      self.activation = self.squash(self.state) * self.mask;
      self.derivative = self.squash(self.state, true);
  
      // Adjusting `gain` (to gated connections)
      for (let i = 0; i < self.connections_gated.length; i++) {
        const connection = self.connections_gated[i];
        const index = nodes.indexOf(connection.to);
        
        if(index > -1) influences[index] += connection.weight * connection.from.activation;
        else {
          nodes.push(connection.to);
          influences.push(connection.weight * connection.from.activation + (connection.to.connections_self.gater === self ? connection.to.old : 0));
        }
        
        // Adjust `gain`
        connection.gain = self.activation;
      }
  
      // Forwarding `xtrace` (to incoming connections)
      for (let i = 0; i < self.connections_incoming.length; i++) {
        const connection = self.connections_incoming[i];
        
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
      // Activate (from self)
      self.state = self.connections_self.gain * self.connections_self.weight * self.state + self.bias;
      
      // Activate (from incoming connections)
      for (let i = 0; i < self.connections_incoming.length; i++) {
        const connection = self.connections[i];
        
        self.state += connection.from.activation * connection.weight * connection.gain;
      }
      // self.connections_incoming.forEach(function(connection, index) {
      //   self.state += connection.from.activation * connection.weight * connection.gain;
      // })
  
      // Squash Activation
      self.activation = self.squash(self.state);
  
      // Adjusting `gain` (to gated connections)
      self.connections_gated.forEach(function(gate) {
        gate.gain = self.activation;
      })
      
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
      for (let i = 0; i < self.connections_outgoing.length; i++) {
        const connection = self.connections_outgoing[i];
        
        self.error_projected += connection.to.error_responsibility * connection.weight * connection.gain;
      }
      self.error_projected *= self.derivative || 1;
      
      // Gated Error Responsibility (from gated connections)
      self.error_gated = 0;
      for (let i = 0; i < self.connections_gated.length; i++) {
        const connection = self.connections_gated[i];
        const node = connection.to;
        const influence = (node.connections_self.gater === self ? node.old : 0) + connection.weight * connection.from.activation;
        
        self.error_gated += node.error_reponsibility * influence;
      }
      self.error_gated *= self.derivative || 1;
      
      // Error Responsibility
      self.error_responsibility = self.error_projected + self.error_gated;
    }
    
    // Adjust Incoming Connections
    for (let i = 0; i < self.connections_incoming.length; i++) {
      const connection = self.connections_incoming[i];
      let gradient = self.error_projected * connection.elegibility;
      for (let j = 0; j < connection.xtrace_nodes.length; j++) {
        const node = connection.xtrace_nodes[i];
        
        gradient += node.error_responsibility * connection.xtrace_values[i];
      }
      
      // Adjust Weight ()
      connection.delta_weights_total += options.rate * gradient * self.mask;
      if (options.update) {
        connection.delta_weights_total += options.momentum * connection.delta_weights_previous;
        connection.weight += connection.delta_weights_total;
        connection.delta_weights_previous = connection.delta_weights_total;
        connection.delta_weights_total = 0;
      }
    }
    
    // Adjust Bias
    self.delta_bias_total += options.rate * self.error_responsibility;
    if (options.update) {
      self.delta_bais_total += options.momentum * self.delta_bais_previous;
      self.bias += self.delta_bais_total;
      self.delta_bais_previous = self.delta_bais_total;
      self.delta_bais_total = 0;
    }

    return {
      responsibility: self.error_responsibility,
      projected: self.error_projected,
      gated: self.error_gated,
    }
  },

  /**
  * Creates a connection from this node to the given node or group
  *
  * @param {Node|Node[]} nodes Node(s) to project connection(s) to
  * @param {number} weight Initial connection(s) [weight](https://en.wikipedia.org/wiki/Synaptic_weight)
  *
  * @function connect
  * @memberof Node
  *
  * @returns {Connection[]}
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
        
        self.connections_outgoing.push(connection);
        nodes.connections_incoming.push(connection);
        
        if(options.twosided) nodes.connect(self);
        
        return connection;
      }
    }
    else if (Array.isArray(nodes)) {
      const connections = [];
      
      for (let index = 0; index < nodes.length; index++) {
        const connection = new Connection(self, nodes[index], weight, options);
        
        self.connections_outgoing.push(connection);
        nodes[index].connections_incoming.push(connection);
        connections.push(connection);
        
        if(options.twosided) nodes[index].connect(self);
      }
      
      return connections;
    }
    else throw new TypeError(`Parameter 'target': Expected 'Node' or 'Node[]' - but recieved, ${nodes}`);
  },

  /**
  * Disconnects this node from the other node
  *
  * @function disconnect
  * @memberof Node
  *
  * @param {Node} node
  * @param {Object} options
  * @param {boolean} [options.twosided] If the nodes project a connection to each other (two way connection), set this to true to disconnect both connections at once
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
  self.disconnect = function(nodes, options) {
    if (nodes == undefined) throw new ReferenceError("Missing required parameter 'target'");
    
    options = options || {};
    
    if (nodes instanceof Node) {
      if (nodes === self) {
        self.connections_self.weight = 0;
        return self.connections_self;
      } else {
        for (let index = 0; index < self.connections_outgoing.length; index++) {
          const connection = self.connections_outgoing[index];
          
          if (connection.to === nodes) {
            self.connections_outgoing.splice(index, 1);
            
            connection.to.connections_incoming.splice(connection.to.connections_incoming.indexOf(connection), 1);
            
            if(connection.gater != undefined) connection.gater.ungate(connection);
            if(options.twosided) nodes.disconnect(self);
            
            return connection;
          }
        }
      }
    } else if (Array.isArray(nodes)) {
      const connections = [];
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < self.connections_outgoing.length; j++) {
          const connection = self.connections_outgoing[j];
          
          if(connection.to === nodes[i]) {
            self.connections_outgoing.splice(j, 1);
            connection.to.connections_incoming.splice(connection.to.connections_incoming.indexOf(connection), 1);
            
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
    if (connections == undefined) throw new ReferenceError("Missing required parameter 'connections'");
    
    
    if (!Array.isArray(connections)) {
      self.connections_gated.push(connections);
      connections.gater = self;
    } else {
      for (let index = 0; index < connections.length; index++) {
        const connection = connections[index];
  
        self.connections_gated.push(connection);
        connection.gater = self;
      }
    }
    
    return connections;
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
    if (connections == undefined) throw new ReferenceError("Missing required parameter 'connections'");
    
    if (!Array.isArray(connections)) {
      self.connections_gated.splice(self.connections_gated.indexOf(connections), 1);
      connections.gater = null;
      connections.gain = 1;
    } else {
      for (let i = 0; i < connections.length; i++) {
      // for (let index = connections.length - 1; index >= 0; index--) {
        const connection = connections[i];
  
        self.connections_gated.splice(self.connections_gated.indexOf(connection), 1);
        connection.gater = null;
        connection.gain = 1;
      }
    }
    
    return connections;
  },

  /**
  * Clear the context of the node, basically reverting it to a 'new' neuron. Useful for predicting timeseries with LSTM's.
  *
  * @function clear
  * @memberof Node
  */
  self.clear = function() {
    for (let index = 0; index < self.connections_incoming.length; index++) {
      const connection = self.connections_incoming[index];

      connection.elegibility = 0;
      connection.xtrace_nodes = []
      connection.xtrace_values = [];
    }

    for (let index = 0; index < self.connections_gated.length; index++) {
      const connection = self.connections_gated[index];
      connection.gain = 0;
    }

    self.error_responsibility = self.error_projected = self.error_gated = 0;
    self.old = self.state = self.activation = 0;
  },

  /**
  * Mutates the node
  *
  * @function mutate
  * @memberof Node
  *
  * @param {Object} [options]
  * @param {string} [options.method] A [mutation method](mutation) - _a random method will chosen if none is passed_
  * @param {activation[]} [options.allowed] Allowed/possible squash (activation) functions for node (neuron)
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
        if(options.allowed) self.squash = options.allowed[random_index(options.allowed.length, options.allowed.indexOf(self.squash))];
        else self.squash = methods.activation[random_key(Object.keys(methods.activation), self.squash.name)]
        break;
      case methods.mutation.MOD_BIAS:
        self.bias += Math.random() * (options.method.max - options.method.min) + options.method.min;
        break;
    }
  },

  /**
  * Checks if this node is projecting to the given node
  *
  * @function isProjectingTo
  * @memberof Node
  *
  * @param {Node|Node[]} [nodes] Node to check for a connection to
  *
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
  self.isProjectingTo = function(nodes) {
    if (nodes == undefined) throw new ReferenceError("Missing required parameter 'nodes'");
    
    if (nodes === self) return self.connections_self.weight !== 0;
    else if (!Array.isArray(nodes)) {
      for (let i = 0; i < self.connections_outgoing.length; i++) {
        if (self.connections_outgoing[i].to === nodes) return true;
      }
      return false;
    } else {
      // START: nodes.every()
      let projecting_to = 0;
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        for (let j = 0; j < self.connections_outgoing.length; j++) {
          
          if (self.connections_outgoing[j].to === node) {
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
  self.isProjectedBy = function(nodes) {
    if (nodes == undefined) throw new ReferenceError("Missing required parameter 'nodes'");
    
    if (nodes === self) return self.connections_self.weight !== 0;
    else if (!Array.isArray(nodes)) {
      for (let i = 0; i < self.connections_incoming.length; i++) {
        if (self.connections_incoming[i].from === nodes) return true;
      }
      return false;
    } else {
      // START: nodes.every()
      let projected_by = 0;
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        for (let j = 0; j < self.connections_incoming.length; j++) {
          
          if (self.connections_incoming[j].from === node) {
            projected_by++;
            break;
          }
        }
      }
      // END: nodes.every()
      
      return nodes.length === projected_by ? true : false;
    }

    // for(let i = 0; i < self.connections_incoming.length; i++) {
    //   if(self.connections_incoming[i].from === node) return true;
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
  if (json == undefined) throw new ReferenceError("Missing required parameter 'json'");
  
  if(typeof json === "string") json = JSON.parse(json);
  
  const node = new Node();
  
  Object.assign(node, { ...json }, {
    squash: methods.activation[json.squash]
  });

  return node;
};

module.exports = Node;