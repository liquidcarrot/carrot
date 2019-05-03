module.exports = Group;

var methods = require('../methods/methods');
var config = require('../config');
var Layer = require('./layer');
var Node = require('./node');

/**
* A group instance denotes a group of nodes. Beware: once a group has been used to construct a network, the groups will fall apart into individual nodes. They are purely for the creation and development of networks.
*
* @constructs Group
*
* @param {number} size Amount of nodes to build group with
*
* @prop {Nodes[]} [nodes=[]] All nodes within the group
* @prop {Connection[]} [connections.in=[]] Incoming connections
* @prop {Connection[]} [connections.out=[]] Outgoing connections
* @prop {Connection[]} [connections.self=[]] Self connections
*
* @example
* let { Layer } = require("@liquid-carrot/carrot");
*
* // A group with 5 nodes
* let A = new Group(5);
*/
function Group (size) {
  this.nodes = [];
  this.connections = {
    in: [],
    out: [],
    self: []
  };

  for (var i = 0; i < size; i++) {
    this.nodes.push(new Node());
  }
}

Group.prototype = {
  /**
  * Activates all the nodes in the group
  *
  * @param {number[]} value Array of values of equal length to number of nodes, nodes are activated with corresponding value (order matters)
  *
  * @returns {number[]} Squashed output values
  *
  * @example
  * let { Layer } = require("@liquid-carrot/carrot");
  *
  * myGroup.activate();
  *
  * // or (array length must be same length as nodes in group)
  * myGroup.activate([1, 0, 1]);
  */
  activate: function (value) {
    var values = [];

    if (typeof value !== 'undefined' && value.length !== this.nodes.length) {
      throw new Error('Array with values should be same as the amount of nodes!');
    }

    for (var i = 0; i < this.nodes.length; i++) {
      var activation;
      if (typeof value === 'undefined') {
        activation = this.nodes[i].activate();
      } else {
        activation = this.nodes[i].activate(value[i]);
      }

      values.push(activation);
    }

    return values;
  },

  /**
  * Will backpropagate all the node in the group -- make sure the group receives input from another group or node.
  *
  * [Momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html) adds a fraction of the previous weight update to the current one.
  * If you combine a high learning rate with a lot of momentum, you will rush past the minimum with huge steps. It is therefore often necessary to reduce the global learning rate µ when using a lot of momentum (m close to 1).
  *
  * @param {number} rate [Learning rate](https://towardsdatascience.com/understanding-learning-rates-and-how-it-improves-performance-in-deep-learning-d0d4059c1c10)
  * @param {number} momentum [Momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html) adds a fraction of the previous weight update to the current one. When the gradient keeps pointing in the same direction, this will increase the size of the steps taken towards the minimum.
  * @param {number|number[]} target Ideal value(s)
  *
  * @example
  * let { Layer } = require("@liquid-carrot/carrot");
  *
  * var A = new Group(2);
  * var B = new Group(3);
  *
  * A.connect(B);
  *
  * A.activate([1,0]); // set the input
  * B.activate(); // get the output
  *
  * // Then teach the network with learning rate and wanted output
  * B.propagate(0.3, 0.9, [0,1]);
  */
  propagate: function(rate, momentum, target) {
    if (typeof target !== 'undefined' && target.length !== this.nodes.length) {
      throw new Error('Array with values should be same as the amount of nodes!');
    }

    for (var i = this.nodes.length - 1; i >= 0; i--) {
      if (typeof target === 'undefined') {
        this.nodes[i].propagate(rate, momentum, true);
      } else {
        this.nodes[i].propagate(rate, momentum, true, target[i]);
      }
    }
  },

  /**
  * Connects the nodes in this group to nodes in another group or just a node
  *
  * @param {Group|Layer|Node} target Node(s) to form connections to
  * @param {connection} method [Connection Method](connection), determines how the nodes in this group will connect to the target (e.g. one-to-one, all-to-all)
  * @param {number} weight Weight of the connection(s)
  *
  * @returns {Connection[]} The formed connections
  *
  * @example
  * let { Layer } = require("@liquid-carrot/carrot");
  *
  * let A = new Group(4);
  * let B = new Group(5);
  *
  * A.connect(B, methods.connection.ALL_TO_ALL); // specifying a method is optional
  */
  connect: function(target, method, weight) {
    var connections = [];
    var i, j;
    if (target instanceof Group) {
      if (typeof method === 'undefined') {
        if (this !== target) {
          if (config.warnings) console.warn('No group connection specified, using ALL_TO_ALL');
          method = methods.connection.ALL_TO_ALL;
        } else {
          if (config.warnings) console.warn('No group connection specified, using ONE_TO_ONE');
          method = methods.connection.ONE_TO_ONE;
        }
      }
      if (method === methods.connection.ALL_TO_ALL || method === methods.connection.ALL_TO_ELSE) {
        for (i = 0; i < this.nodes.length; i++) {
          for (j = 0; j < target.nodes.length; j++) {
            if (method === methods.connection.ALL_TO_ELSE && this.nodes[i] === target.nodes[j]) continue;
            let connection = this.nodes[i].connect(target.nodes[j], weight); // weird API quirk, should be fixed
            this.connections.out.push(connection[0]); // weird API quirk, should be fixed
            target.connections.in.push(connection[0]); // weird API quirk, should be fixed
            connections.push(connection[0]); // weird API quirk, should be fixed
          }
        }
      } else if (method === methods.connection.ONE_TO_ONE) {

        if(this == target){
          for (i = 0; i < this.nodes.length; i++) {
            let connection = this.nodes[i].connect(target.nodes[i], weight);
            this.connections.self.push(connection[0]);
            connections.push(connection[0]);
          }
        } else {
          if (this.nodes.length !== target.nodes.length) {
            throw new Error('From and To group must be the same size!');
          } else {
            for (i = 0; i < this.nodes.length; i++) {
              let connection = this.nodes[i].connect(target.nodes[i], weight);
              this.connections.out.push(connection[0]);
              target.connections.in.push(connection[0]);
              connections.push(connection[0]);
            }
          }
        }
      }
    } else if (target instanceof Layer) {
      connections = target.input(this, method, weight);
    } else if (target instanceof Node) {
      for (i = 0; i < this.nodes.length; i++) {
        let connection = this.nodes[i].connect(target, weight);
        this.connections.out.push(connection[0]);
        connections.push(connection[0]);
      }
    }

    return connections;
  },

  /**
  * Make nodes from this group gate the given connection(s) between two other groups. You have to specify a [Gating Method](gating)
  *
  * @param {Connection[]|Connection} connections Connections to gate
  * @param {gating} method [Gating Method](gating)
  */
  gate: function(connections, method) {
    if (typeof method === 'undefined') {
      throw new Error('Please specify Gating.INPUT, Gating.OUTPUT');
    }

    if (!Array.isArray(connections)) {
      connections = [connections];
    }

    var nodes1 = [];
    var nodes2 = [];

    var i, j;
    for (i = 0; i < connections.length; i++) {
      var connection = connections[i];
      if (!nodes1.includes(connection.from)) nodes1.push(connection.from);
      if (!nodes2.includes(connection.to)) nodes2.push(connection.to);
    }

    switch (method) {
      case methods.gating.INPUT:
        for (i = 0; i < nodes2.length; i++) {
          let node = nodes2[i];
          let gater = this.nodes[i % this.nodes.length];

          for (j = 0; j < node.connections.in.length; j++) {
            let conn = node.connections.in[j];
            if (connections.includes(conn)) {
              gater.gate(conn);
            }
          }
        }
        break;
      case methods.gating.OUTPUT:
        for (i = 0; i < nodes1.length; i++) {
          let node = nodes1[i];
          let gater = this.nodes[i % this.nodes.length];

          for (j = 0; j < node.connections.out.length; j++) {
            let conn = node.connections.out[j];
            if (connections.includes(conn)) {
              gater.gate(conn);
            }
          }
        }
        break;
      case methods.gating.SELF:
        for (i = 0; i < nodes1.length; i++) {
          let node = nodes1[i];
          let gater = this.nodes[i % this.nodes.length];

          if (connections.includes(node.connections.self)) {
            gater.gate(node.connections.self);
          }
        }
    }
  },

  /**
  * Sets the value of a property for every node
  *
  * @param {object} values A configuration object
  * @param {number} values.bias [Weight bias](https://deepai.org/machine-learning-glossary-and-terms/bias-vector)
  * @param {activation} values.squash [Activation function](https://medium.com/the-theory-of-everything/understanding-activation-functions-in-neural-networks-9491262884e0)
  * @param {string} values.type <code>input</code>, <code>hidden</code> or <code>output</code>, should not be used manually (setting to <code>constant</code> will disable bias/weight changes)
  *
  * @example
  * let { Layer } = require("@liquid-carrot/carrot");
  *
  * var group = new Group(4);
  *
  * // All nodes in 'group' now have a bias of 1
  * group.set({bias: 1});
  */
  set: function(values) {
    for(var i = 0; i < this.nodes.length; i++) {
      if(typeof values.bias !== 'undefined') {
        this.nodes[i].bias = values.bias;
      }

      this.nodes[i].squash = values.squash || this.nodes[i].squash;
      this.nodes[i].type = values.type || this.nodes[i].type;
    }
  },

  /**
  * *INCOMPLETE* Disconnects all nodes from this group from another given group/node.
  *
  * @param {Group|Node} target Node(s) to remove connections to/from
  * @param {boolean} [twosided=false] Set to true, to disconnect both to and from connections simultaneously (applies to two-sided [Connections](Connection) only)
  */
  disconnect: function(target, twosided) {
    twosided = twosided || false;

    // In the future, disconnect will return a connection so indexOf can be used
    var i, j, k;
    if (target instanceof Group) {
      for (i = 0; i < this.nodes.length; i++) {
        for (j = 0; j < target.nodes.length; j++) {
          this.nodes[i].disconnect(target.nodes[j], twosided);

          for (k = this.connections.out.length - 1; k >= 0; k--) {
            let conn = this.connections.out[k];

            if (conn.from === this.nodes[i] && conn.to === target.nodes[j]) {
              this.connections.out.splice(k, 1);
              break;
            }
          }

          if (twosided) {
            for (k = this.connections.in.length - 1; k >= 0; k--) {
              let conn = this.connections.in[k];

              if (conn.from === target.nodes[j] && conn.to === this.nodes[i]) {
                this.connections.in.splice(k, 1);
                break;
              }
            }
          }
        }
      }
    } else if (target instanceof Node) {
      for (i = 0; i < this.nodes.length; i++) {
        this.nodes[i].disconnect(target, twosided);

        for (j = this.connections.out.length - 1; j >= 0; j--) {
          let conn = this.connections.out[j];

          if (conn.from === this.nodes[i] && conn.to === target) {
            this.connections.out.splice(j, 1);
            break;
          }
        }

        if (twosided) {
          for (j = this.connections.in.length - 1; j >= 0; j--) {
            var conn = this.connections.in[j];

            if (conn.from === target && conn.to === this.nodes[i]) {
              this.connections.in.splice(j, 1);
              break;
            }
          }
        }
      }
    }
  },

  /**
  * Clear the context of the nodes in this group
  */
  clear: function () {
    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].clear();
    }
  }
};