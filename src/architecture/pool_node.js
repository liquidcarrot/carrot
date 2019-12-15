const methods = require('../methods/methods');
const config = require('../config');
const Connection = require('./connection');
const Node = require('./node');
const math = require('./../util/math');


function PoolNode(dimension) {
  this.connectionsSelf = new Connection(this, this, 0);
  this.incomingDimension = [];
  this.incoming = [];
  this.outgoing = [];
  this.dimension = dimension;
  this.isMaxPooling = false;
}

PoolNode.prototype = {
  /**
   *
   * @param {number[]} inputs
   * @returns {number[]} output
   */
  activate: function(inputs) {
    if (math.multiply(this.dimension) > this.incoming.length) {
      throw new Error('Filter dimension can\'t be greater than incoming connections!');
    }
    for (let i = 0; i < this.dimension.length; i++) {
      if (this.dimension[i] > this.incomingDimension[i]) {
        throw new Error('Filter dimension can\'t be greater than incoming connections!');
      }
      if (this.incomingDimension[i] % this.dimension[i] !== 0) {
        throw new RangeError('Pool node dimension doesn\'t match input dimension');
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
    for (let x = 0; x <= this.incomingDimension[0] - this.dimension[0]; x += this.dimension[0]) {
      for (let y = 0; y <= this.incomingDimension[1] - this.dimension[1]; y += this.dimension[1]) {
        let sum = 0;
        let max = -Infinity;
        for (let dx = 0; dx < this.dimension[0]; dx++) {
          for (let dy = 0; dy < this.dimension[1]; dy++) {
            sum += inputTensor[x + dx][y + dy];
            if (inputTensor[x + dx][y + dy] > max) {
              max = inputTensor[x + dx][y + dy];
            }
          }
        }
        outputTensor[x][y] = this.isMaxPooling
          ? max // Max
          : sum / math.multiply(this.dimension); // Mean
      }
    }
    return outputTensor.flat(); //depth 1: Should be enough
  },

  noTraceActivate: function(input) {
    return self.activate(input);
  },

  propagate: function() {
    //Keep smiling :-)
  },

  /**
   *
   * @param {Node|Node[]} nodes Node(s) to project connection(s) to
   * @param {number} [weight] Initial connection(s) [weight](https://en.wikipedia.org/wiki/Synaptic_weight)
   * @param {Object} [options={}]
   *
   * @returns {Connection[]|Connection}
   */
  connect: function(nodes, weight, options) {
    if (nodes === undefined) throw new ReferenceError('Missing required parameter \'nodes\'');

    if (options === undefined && typeof weight === 'object') {
      options = weight;
      weight = undefined;
    }

    options = options || {};

    if (nodes instanceof Node) {
      if (this.isProjectingTo(nodes)) {
        throw new ReferenceError('Node is already projecting to \'target\'');
      } else {
        const connection = new Connection(this, nodes, weight, options);

        this.outgoing.push(connection);
        nodes.incoming.push(connection);

        if (options.twosided) {
          nodes.connect(this);
        }
        return connection;
      }
    } else if (Array.isArray(nodes)) {
      const connections = [];

      for (let i = 0; i < nodes.length; i++) {
        const connection = new Connection(this, nodes[i], weight, options);

        this.outgoing.push(connection);
        nodes[i].incoming.push(connection);
        connections.push(connection);

        if (options.twosided) {
          nodes[i].connect(this);
        }
      }

      return connections;
    } else {
      throw new TypeError(`Parameter 'target': Expected 'Node' or 'Node[]' - but recieved, ${nodes}`);
    }
  },

  gate: function() {
    //Pool Node Can't gate
  },

  ungate: function() {
    //Pool Node Can't gate
  },


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
  },


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
  },

  isProjectingTo: function(nodes) {
    if (nodes === undefined) throw new ReferenceError('Missing required parameter \'nodes\'');

    if (nodes === this) {
      return this.connectionsSelf.weight !== 0;
    } else if (!Array.isArray(nodes)) {
      for (let i = 0; i < this.outgoing.length; i++) {
        if (this.outgoing[i].to === nodes) {
          return true;
        }
      }
      return false;
    } else {
      let projectingTo = 0;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < this.outgoing.length; j++) {
          if (this.outgoing[j].to === nodes[i]) {
            projectingTo++;
            break;
          }
        }
      }
      return nodes.length === projectingTo;
    }
  },

  isProjectedBy: function(nodes) {
    if (nodes === undefined) throw new ReferenceError('Missing required parameter \'nodes\'');

    if (nodes === this) {
      return this.connections_self.weight !== 0;
    } else if (!Array.isArray(nodes)) {
      for (let i = 0; i < this.incoming.length; i++) {
        if (this.incoming[i].from === nodes) {
          return true;
        }
      }
      return false;
    } else {
      let projectedBy = 0;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < this.incoming.length; j++) {
          if (this.incoming[j].from === nodes[i]) {
            projectedBy++;
            break;
          }
        }
      }

      return nodes.length === projectedBy;
    }
  },

  mutate: function(method) {
    if (method === methods.mutation.MOD_POOL_NODE) {
      this.isMaxPooling = !this.isMaxPooling; //Just mutate between Mean\Max Pooling
    }
  },

  /**
   * Clears this node's state information - _i.e. resets node and its connections to "factory settings"_
   */
  clear: function() {
    for (let index = 0; index < this.incoming.length; index++) {
      const connection = this.incoming[index];

      connection.elegibility = 0;
      connection.xtrace_nodes = [];
      connection.xtrace_values = [];
    }
  },
};

module.exports = ConvolutionalNode;
