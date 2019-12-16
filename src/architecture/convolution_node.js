const methods = require('../methods/methods');
const config = require('../config');
const Node = require('./node');
const Group = require('./group');
const PoolNode = require('./pool_node');
const Connection = require('./connection');
const math = require('./../util/math');


function ConvolutionalNode(dimension) {
  if(dimension === undefined || !Array.isArray(dimension)){
    throw new TypeError("Dimensions is required and must be an array of numbers");
  }

  this.nodes = [];
  this.connectionsSelf = [];
  this.incomingDimension = [];
  this.incoming = [];
  this.outgoing = [];
  this.dimension = dimension;
  this.nodes = [];

  // creating nodes
  for (let i = 0; i < math.multiply(this.dimension); i++) {
    this.nodes.push(new Node({type: 'hidden'}));
  }

}

ConvolutionalNode.prototype = {
  /**
   *
   * @param {number[]|object} inputs
   * @returns {number[]} output
   */
  activate: function(inputs) {
    if (!Array.isArray(inputs) || !isNaN(inputs[0])) {
      inputs = undefined; //don't wont objects really
    }
    if (math.multiply(this.dimension) < this.outgoing.length) {
      console.log(math.multiply(this.dimension) + ' - ' + this.outgoing.length);
      //TODO this is thrown at npm test
      throw new RangeError('Can\'t have more outgoing connections than filter dimension!');
    }
    if (math.multiply(this.dimension) > this.incoming.length) {
      throw new RangeError('Filter dimension can\'t be greater than incoming connections!');
    }
    for (let i = 0; i < this.dimension.length; i++) {
      if (this.dimension[i] > this.incomingDimension[i]) {
        throw new RangeError('Filter dimension can\'t be greater than incoming connections!');
      }
    }
    if (inputs !== undefined && inputs.length !== math.multiply(this.incomingDimension)) {
      throw new RangeError('Array with values should be same as the inputDimension flattened!');
    }

    if (inputs === undefined) {
      let inputIndex = 0;
      for (let i = 0; i < this.incomingDimension.length; i++) {
        for (let j = 0; j < this.incomingDimension[i].length; j++) {
          let conn = this.incoming[inputIndex];
          inputs[inputIndex] = conn.from.activation * conn.weight * conn.gain;
        }
      }
    }


    // TODO: beautify
    let inputTensor = [[], []];
    let inputIndex = 0;
    for (let i = 0; i < this.incomingDimension.length; i++) {
      for (let j = 0; j < this.incomingDimension[i]; j++) {
        inputTensor[i].push(inputs[inputIndex]);
        inputIndex++;
      }
    }

    let outputTensor = [[], []];
    for (let x = 0; x <= this.incomingDimension[0] - this.dimension[0]; x++) {
      for (let y = 0; y <= this.incomingDimension[1] - this.dimension[1]; y++) {
        let activation = 0.0;
        let nodeIndex = 0;
        for (let dx = 0; dx < this.dimension[0]; dx++) {
          for (let dy = 0; dy < this.dimension[1]; dy++) {
            activation += this.nodes[nodeIndex].activate(inputTensor[x + dx][y + dy]);
            nodeIndex++;
          }
        }
        outputTensor[x][y] = activation;
      }
    }
    return outputTensor.flat(); //depth 1: Should be enough
  },

  /**
   *
   * @param {number[]} target
   * @param {Object} [options]
   * @returns {[]}
   */
  propagate: function(target, options) {
    if (!options && _.isPlainObject(target)) {
      options = target;
      target = undefined;
    }

    if (target !== undefined && target.length !== this.nodes.length || math.multiply(this.dimension) !== this.nodes.length) {
      throw new RangeError('Array with values should be same as the amount of nodes!');
    }

    const errors = [];
    for (let i = 0; i < this.nodes.length; i++) {
      if (target === undefined) {
        errors.push(this.nodes[i].propagate(options));
      } else {
        errors.push(this.nodes[i].propagate(target[i], options));
      }
    }

    return errors;
  },

  /**
   *
   *
   * @param {Group|Layer|Node} target Node(s) to form connections to
   * @param {methods.connections} method [Connection Method](connection), determines how the nodes in this group will connect to the target (e.g. one-to-one, all-to-all)
   * @param {number} weight Weight of the connection(s)
   *
   * @returns {Connection[]} The formed connections
   */
  connect: function(target, method, weight) {
    const isSelfTarget = target.nodes ? this.nodes === target.nodes : false;

    if (method === undefined) {
      if (isSelfTarget) {
        if (config.warnings) console.warn('No group connection specified, using ONE_TO_ONE');
        method = methods.connection.ONE_TO_ONE;
      } else {
        if (config.warnings) console.warn('No group connection specified, using ALL_TO_ALL');
        method = methods.connection.ALL_TO_ALL;
      }
    }

    let targetNodes = [];
    if (target.input_nodes) {
      targetNodes = target.input_nodes;
    } else if (target.nodes) {
      targetNodes = target.nodes;
    } else if (target instanceof PoolNode || target instanceof Node) {
      targetNodes = [target];
    } else {
      throw new TypeError('Type of target not supported');
    }

    if (method === methods.connection.ONE_TO_ONE && this.nodes.length !== targetNodes.length) {
      throw new RangeError('Method is one-to-one but there are unequal number of source and target nodes');
    }

    const newConnections = [];

    targetNodes:
      for (let i = 0; i < targetNodes.length; i++) {
        if (method === methods.connection.ALL_TO_ELSE) {
          for (let j = 0; j < this.nodes.length; j++) {
            if (targetNodes[i] === this.nodes[j]) {
              continue targetNodes;
            }
          }
        }
        if (method === methods.connection.ONE_TO_ONE) {
          newConnections.push(this.nodes[i].connect(targetNodes[i], weight));
        } else { //ALL_TO_ALL or ALL_TO_ELSE
          for (let j = 0; j < this.nodes.length; j++) {
            newConnections.push(this.nodes[j].connect(targetNodes[i], weight));
          }
        }
      }

    for (let i = 0; i < newConnections.length; i++) {
      const connection = newConnections[i];
      if (isSelfTarget) {
        this.connectionsSelf.push(connection);
      } else {
        this.outgoing.push(connection);
        target.incoming.push(connection);
      }
    }
    return newConnections;
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
  isProjectingTo: function(nodes) {
    if (nodes === undefined) throw new ReferenceError('Missing required parameter \'nodes\'');

    if (nodes === this) {
      return this.connections_self.weight !== 0;
    } else if (!Array.isArray(nodes)) {
      for (let i = 0; i < this.outgoing.length; i++) {
        if (this.outgoing[i].to === nodes) {
          return true;
        }
      }
      return false;
    } else {
      // START: nodes.every()
      let projecting_to = 0;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < this.outgoing.length; j++) {
          if (this.outgoing[j].to === nodes[i]) {
            projecting_to++;
            break;
          }
        }
      }
      // END: nodes.every()

      return nodes.length === projecting_to;
    }
  },

  /**
   *
   * @param {Connection[]|Connection} connections Connections to gate
   * @param {gating} method [Gating Method](gating)
   */
  gate: function(connections, method = methods.gating.INPUT /*todo delete this default value */) {
    if (method === undefined) throw new TypeError('Please specify Gating.INPUT, Gating.OUTPUT');

    if (!Array.isArray(connections)) connections = [connections];

    const nodesFrom = [];
    const nodesTo = [];

    for (let i = 0; i < connections.length; i++) {
      const connection = connections[i];
      if (!nodesFrom.includes(connection.from)) nodesFrom.push(connection.from);
      if (!nodesTo.includes(connection.to)) nodesTo.push(connection.to);
    }

    switch (method) {
      case methods.gating.INPUT:
        for (let i = 0; i < nodesTo.length; i++) {
          const node = nodesTo[i];
          const gater = this.nodes[i % this.nodes.length];

          for (let j = 0; j < node.incoming.length; j++) {
            const connection = node.incoming[j];
            if (connections.includes(connection)) {
              gater.gate(connection);
            }
          }
        }
        break;
      case methods.gating.OUTPUT:
        for (let i = 0; i < nodesFrom.length; i++) {
          const node = nodesFrom[i];
          const gater = this.nodes[i % this.nodes.length];

          for (let j = 0; j < node.outgoing.length; j++) {
            const connection = node.outgoing[j];
            if (connections.includes(connection)) {
              gater.gate(connection);
            }
          }
        }
        break;
      case methods.gating.SELF:
        for (let i = 0; i < nodesFrom.length; i++) {
          const node = nodesFrom[i];
          const gater = this.nodes[i % this.nodes.length];

          if (connections.includes(node.connections_self)) {
            gater.gate(node.connections_self);
          }
        }
    }
  }
  ,


  /**
   * Sets the value of a property for every node
   *
   * @param {Object} options A configuration object
   */
  set: function(options) {
    if (typeof options !== 'object') throw TypeError(`options has to be an object with the properties to set and the desired values`);
    for (let index = 0; index < this.nodes.length; index++) {
      Object.assign(this.nodes[index], options);
    }
  }
  ,


  /**
   *
   * @param {Group|Node} target Node(s) to remove connections to/from
   * @param {boolean} [twosided=false] Set to true, to disconnect both to and from connections simultaneously (applies to two-sided [Connections](Connection) only)
   */
  disconnect: function(target, twosided) {
    twosided = twosided || false;

    if (target instanceof Group) {
      for (let i = 0; i < this.nodes.length; i++) {
        for (let j = 0; j < target.nodes.length; j++) {
          this.nodes[i].disconnect(target.nodes[j], {twosided});

          if (twosided) {
            this.incoming = this.incoming.filter(connection => {
              return connection
                ? connection.from !== target.nodes[j] || connection.to !== this.nodes[i]
                : false;
            });
          }
          this.outgoing = this.outgoing.filter(connection => {
            return connection
              ? connection.from !== this.nodes[i] || connection.to !== target.nodes[j]
              : false;
          });
        }
      }
    } else if (target instanceof Node) {
      for (let i = 0; i < this.nodes.length; i++) {
        this.nodes[i].disconnect(target, {twosided});

        if (twosided) {
          this.incoming = this.incoming.filter(connection => connection.from !== target || connection.to !== this.nodes[i]);
        }
        this.outgoing = this.outgoing.filter(connection => connection.from !== this.nodes[i] || connection.to !== target);
      }
    }
  }
  ,


  /**
   * Clear the context of the nodes in this convolutional node
   */
  clear: function() {
    for (let i = 0; i < this.nodes.length; i++) {
      this.nodes[i].clear();
    }
  }
  ,


  /**
   * Add the nodes to the convolutional node
   * @param  {Node|Node[]|Group} nodesToAdd The nodes to add
   */
  addNodes: function(nodesToAdd) {
    if (nodesToAdd instanceof Node) {
      nodesToAdd = [nodesToAdd];
    } else if (nodesToAdd instanceof Group) {
      nodesToAdd = nodesToAdd.nodes;
    }

    if (math.multiply(this.dimension) >= this.nodes.length + nodesToAdd.length) {
      this.nodes.push(...nodesToAdd);
    }
  }
  ,
};

module.exports = ConvolutionalNode;
