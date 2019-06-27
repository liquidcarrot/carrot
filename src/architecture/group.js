const _ = require("lodash");
const methods = require('../methods/methods');
const config = require('../config');
// const Layer = require('./layer');
const Node = require('./node');


/**
* A group instance denotes a group of nodes. Beware: once a group has been used to construct a network, the groups will fall apart into individual nodes. They are purely for the creation and development of networks.
*
* @constructs Group
*
* @param {number} size Amount of nodes to build group with
* @param {string} [type='hidden'] Type of neurons inside of a group
*
* @prop {Nodes[]} [nodes=[]] All nodes within the group
* @prop {Connection[]} [connections.in=[]] Incoming connections
* @prop {Connection[]} [connections.out=[]] Outgoing connections
* @prop {Connection[]} [connections.self=[]] Self connections
*
* @example
* let { Group } = require("@liquid-carrot/carrot");
*
* // A group with 5 nodes
* let A = new Group(5);
*/
function Group(size, type) {
  const self = this;

  self.nodes = [];
  self.connections = {
    in: [],
    out: [],
    self: [],

    // (BETA)
    incoming: [],
    outgoing: []
  };

  for (let index = 0; index < size; index++) {
    self.nodes.push(new Node(type));
  }

  /**
  * Activates all the nodes (neurons) in the group
  *
  * @function activate
  * @memberof Group
  *
  * @param {number[]} inputs Array of inputs (numbers) for the group - _order matters._
  *
  * @returns {number[]} Squashed output values
  *
  * @example
  * let { Group } = require("@liquid-carrot/carrot");
  *
  * let group = new Group(3);
  *
  * group.activate([1, 0, 1]);
  */
  self.activate = function(inputs) {
    if (inputs != undefined && inputs.length !== self.nodes.length) throw new Error('Array with values should be same as the amount of nodes!');

    const outputs = [];

    for (let index = 0; index < self.nodes.length; index++) {
      const activation = inputs == undefined ? self.nodes[index].activate() : self.nodes[index].activate(inputs[index]);

      outputs.push(activation);
    }

    return outputs;
  },

  /**
  * Will backpropagate all the node in the group -- make sure the group receives input from another group or node.
  *
  * [Momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html) adds a fraction of the previous weight update to the current one.
  * If you combine a high learning rate with a lot of momentum, you will rush past the minimum with huge steps. It is therefore often necessary to reduce the global learning rate µ when using a lot of momentum (m close to 1).
  *
  * @function propagate
  * @memberof Group
  *
  * @param {number|number[]} [target] Ideal value(s) - _required for output nodes_
  * @param {Object} [options]
  * @param {number} [options.rate] [Learning rate](https://towardsdatascience.com/understanding-learning-rates-and-how-it-improves-performance-in-deep-learning-d0d4059c1c10)
  * @param {number} [options.momentum] [Momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html) adds a fraction of the previous weight update to the current one. When the gradient keeps pointing in the same direction, this will increase the size of the steps taken towards the minimum.
  * @param {boolean} [options.update=true]
  *
  * @example
  * let { Group } = require("@liquid-carrot/carrot");
  *
  * let A = new Group(2);
  * let B = new Group(3);
  *
  * // Connects group A to group B - creating a "little network"
  * A.connect(B);
  *
  * // Activates the "little network"
  * A.activate([1,0]);
  * B.activate();
  *
  * // Teaches the network
  * B.propagate([0,1,0.2]);
  * A.propagate();
  */
  self.propagate = function(target, options) {
    if (!options && _.isPlainObject(target)) {
      options = target;
      target = undefined;
    }

    if (target != undefined && target.length !== self.nodes.length) throw new Error('Array with values should be same as the amount of nodes!');

    for (let index = self.nodes.length - 1; index >= 0; index--) {
      if (target == undefined) self.nodes[index].propagate(options);
      else self.nodes[index].propagate(target[index], options);
    }
  },

  /**
  * Connects the nodes in this group to nodes in another group or just a node
  *
  * @function connect
  * @memberof Group
  *
  * @param {Group|Layer|Node} target Node(s) to form connections to
  * @param {connection} method [Connection Method](connection), determines how the nodes in this group will connect to the target (e.g. one-to-one, all-to-all)
  * @param {number} weight Weight of the connection(s)
  *
  * @returns {Connection[]} The formed connections
  *
  * @example
  * let { Group } = require("@liquid-carrot/carrot");
  *
  * let A = new Group(4);
  * let B = new Group(5);
  *
  * A.connect(B, methods.connection.ALL_TO_ALL); // specifying a method is optional
  */
  self.connect = function(target, method, weight) {
    const self_targeted = (self === target);

    const connections = [];

    let i, j;
    if (target instanceof Group) {
      if (method == undefined) {
        if (self_targeted) {
          if (config.warnings) console.warn('No group connection specified, using ONE_TO_ONE');
          method = methods.connection.ONE_TO_ONE;
        } else {
          if (config.warnings) console.warn('No group connection specified, using ALL_TO_ALL');
          method = methods.connection.ALL_TO_ALL;
        }
      }
      if (method === methods.connection.ALL_TO_ALL || method === methods.connection.ALL_TO_ELSE) {
        for (let i = 0; i < self.nodes.length; i++) {
          for (let j = 0; j < target.nodes.length; j++) {
            if (method === methods.connection.ALL_TO_ELSE && self.nodes[i] === target.nodes[j]) continue;
            else {
              let connection = self.nodes[i].connect(target.nodes[j], weight);

              self.connections.out.push(connection[0]);
              target.connections.in.push(connection[0]);
              connections.push(connection[0]);
            }
          }
        }
      } else if (method === methods.connection.ONE_TO_ONE) {
        if(self_targeted){
          for (let i = 0; i < self.nodes.length; i++) {
            const connection = self.nodes[i].connect(target.nodes[i], weight);

            self.connections.self.push(connection[0]);
            connections.push(connection[0]);
          }
        } else {
          if (self.nodes.length !== target.nodes.length) throw new Error('From and To group must be the same size!');

          for (let i = 0; i < self.nodes.length; i++) {
            const connection = self.nodes[i].connect(target.nodes[i], weight);

            self.connections.out.push(connection[0]);
            target.connections.in.push(connection[0]);
            connections.push(connection[0]);
          }
        }
      }
    }
    else if (target instanceof Layer) connections = target.input(self, method, weight);
    else if (target instanceof Node) {
      for (let index = 0; index < self.nodes.length; index++) {
        const connection = self.nodes[index].connect(target, weight);

        self.connections.out.push(connection[0]);
        connections.push(connection[0]);
      }
    }

    return connections;
  },

  /**
  * Make nodes from this group gate the given connection(s) between two other groups. You have to specify a [Gating Method](gating)
  *
  * @function gate
  * @memberof Group
  *
  * @param {Connection[]|Connection} connections Connections to gate
  * @param {gating} method [Gating Method](gating)
  */
  self.gate = function(connections, method) {
    if (method == undefined) throw new Error('Please specify Gating.INPUT, Gating.OUTPUT');

    if (!Array.isArray(connections)) connections = [connections];

    const nodes_from = [];
    const nodes_to = [];

    let i, j;

    for (i = 0; i < connections.length; i++) {
      const connection = connections[i];
      if (!nodes_from.includes(connection.from)) nodes_from.push(connection.from);
      if (!nodes_to.includes(connection.to)) nodes_to.push(connection.to);
    }

    switch (method) {
      case methods.gating.INPUT:
        for (i = 0; i < nodes_to.length; i++) {
          const node = nodes_to[i];
          const gater = self.nodes[i % self.nodes.length];

          for (j = 0; j < node.connections.in.length; j++) {
            const connection = node.connections.in[j];
            if (connections.includes(connection)) {
              gater.gate(connection);
            }
          }
        }
        break;
      case methods.gating.OUTPUT:
        for (i = 0; i < nodes_from.length; i++) {
          const node = nodes_from[i];
          const gater = self.nodes[i % this.nodes.length];

          for (j = 0; j < node.connections.out.length; j++) {
            const connection = node.connections.out[j];
            if (connections.includes(connection)) {
              gater.gate(connection);
            }
          }
        }
        break;
      case methods.gating.SELF:
        for (i = 0; i < nodes_from.length; i++) {
          const node = nodes_from[i];
          const gater = self.nodes[i % self.nodes.length];

          if (connections.includes(node.connections.self)) {
            gater.gate(node.connections.self);
          }
        }
    }
  },

  /**
  * Sets the value of a property for every node
  *
  * @function set
  * @memberof Group
  *
  * @param {object} values A configuration object
  * @param {number} values.bias [Weight bias](https://deepai.org/machine-learning-glossary-and-terms/bias-vector)
  * @param {activation} values.squash [Activation function](https://medium.com/the-theory-of-everything/understanding-activation-functions-in-neural-networks-9491262884e0)
  * @param {string} values.type <code>input</code>, <code>hidden</code> or <code>output</code>, should not be used manually (setting to <code>constant</code> will disable bias/weight changes)
  *
  * @example
  * let { Group } = require("@liquid-carrot/carrot");
  *
  * var group = new Group(4);
  *
  * // All nodes in 'group' now have a bias of 1
  * group.set({bias: 1});
  */
  self.set = function(values) {
    for (let index = 0; index < self.nodes.length; index++) {
      if (values.bias != undefined) self.nodes[index].bias = values.bias;

      self.nodes[index].squash = values.squash || self.nodes[index].squash;
      self.nodes[index].type = values.type || self.nodes[index].type;
    }
  },

  /**
  * *INCOMPLETE* Disconnects all nodes from this group from another given group/node.
  *
  * @function disconnect
  * @memberof Group
  *
  * @param {Group|Node} target Node(s) to remove connections to/from
  * @param {boolean} [twosided=false] Set to true, to disconnect both to and from connections simultaneously (applies to two-sided [Connections](Connection) only)
  */
  self.disconnect = function(target, twosided) {
    twosided = twosided || false;

    if (target instanceof Group) {
      for (let i = 0; i < self.nodes.length; i++) {
        for (let j = 0; j < target.nodes.length; j++) {
          self.nodes[i].disconnect(target.nodes[j], twosided);

          if (twosided) self.connections.in = self.connections.in.filter(connection => !(connection.from === target.nodes[j] && connection.to === this.nodes[i]));
          self.connections.out = self.connections.out.filter(connection => !(connection.from === self.nodes[i] && connection.to === target.nodes[j]));
        }
      }
    }
    else if (target instanceof Node) {
      for (let index = 0; index < self.nodes.length; index++) {
        self.nodes[index].disconnect(target, twosided);

        if (twosided) self.connections.in = self.connections.in.filter(connection => !(connection.from === target && connection.to === self.nodes[index]));
        self.connections.out = self.connections.out.filter(connection => !(connection.from === self.nodes[index] && connection.to === target));
      }
    }
  },

  /**
  * Clear the context of the nodes in this group
  *
  * @function clear
  * @memberof Group
  */
  self.clear = function() {
    for (let index = 0; index < self.nodes.length; index++) {
      self.nodes[index].clear();
    }
  }
}

module.exports = Group;
