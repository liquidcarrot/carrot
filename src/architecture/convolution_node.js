const _ = require('lodash');
const methods = require('../methods/methods');
const Connection = require('./connection');

function Node(options) {
  let self = this;
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
    connections_self: new Connection(self, self, 0),
    error_responsibility: 0,
    error_projected: 0,
    error_gated: 0,
    ...options,
  });


  self.activate = function(input, options) {
    if (options === undefined && typeof input === 'object') {
      options = input;
      input = undefined;
    }

    options = options || {};
    options = {
      trace: true,
      ...options,
    };

    if (input !== undefined && Number.isFinite(input)) {
      return self.activation = input;
    }


    const activate = function() {
      self.state = self.connections_self.gain * self.connections_self.weight * self.state + self.bias;

      for (let i = 0; i < self.incoming.length; i++) {
        const conn = self.incoming[i];
        self.state += conn.from.activation * conn.weight * conn.gain;
      }

      return self.state;
    };

    if (options.trace) {
      self.old = self.state;

      self.state = activate();
      self.activation = self.squash(self.state) * self.mask;
      self.derivative = self.squash(self.state, true);

      const nodes = [];
      const influences = [];

      for (let i = 0; i < self.gated.length; i++) {
        const connection = self.gated[i];
        connection.gain = self.activation;

        const index = nodes.indexOf(connection.to);
        if (index > -1) {
          influences[index] += connection.weight * connection.from.activation;
        } else {
          nodes.push(connection.to);
          influences.push(connection.weight * connection.from.activation + (connection.to.connections_self.gater === self ? connection.to.old : 0));
        }
      }

      for (let i = 0; i < self.incoming.length; i++) {
        const connection = self.incoming[i];

        connection.elegibility = self.connections_self.gain * self.connections_self.weight * connection.elegibility + connection.from.activation * connection.gain;

        for (let j = 0; j < nodes.length; j++) {
          const [node, influence] = [nodes[j], influences[j]];

          const index = connection.xtrace_nodes.indexOf(node);

          if (index > -1) {
            connection.xtrace_values[index] = node.connections_self.gain * node.connections_self.weight * connection.xtrace_values[index] + self.derivative * connection.elegibility * influence;
          } else {
            connection.xtrace_nodes.push(node);
            connection.xtrace_values.push(self.derivative * connection.elegibility * influence);
          }
        }
      }

      return self.activation;
    } else {
      if (self.type === 'input') return self.activation = 0;

      self.state = activate();
      self.activation = self.squash(self.state);

      for (let i = 0; i < self.gated.length; i++) {
        self.gated[i].gain = self.activation;
      }

      return self.activation;
    }
  },


    self.noTraceActivate = function(input) {
      return self.activate(input, {trace: false});
    },


    self.propagate = function(target, options) {
      if (options === undefined && typeof target === 'object') {
        options = target;
        target = undefined;
      }

      options = options || {};
      options = {
        momentum: 0,
        rate: 0.3,
        update: true,
        ...options,
      };

      if (target !== undefined && Number.isFinite(target)) {
        self.error_responsibility = self.error_projected = target - self.activation;
      } else {
        self.error_projected = 0;
        for (let i = 0; i < self.outgoing.length; i++) {
          const connection = self.outgoing[i];

          self.error_projected += connection.to.error_responsibility * connection.weight * connection.gain;
        }
        self.error_projected *= self.derivative || 1;

        self.error_gated = 0;
        for (let i = 0; i < self.gated.length; i++) {
          const connection = self.gated[i];
          const node = connection.to;
          const influence = (node.connections_self.gater === self ? node.old : 0) + connection.weight * connection.from.activation;

          self.error_gated += node.error_responsibility * influence;
        }
        self.error_gated *= self.derivative || 1;

        self.error_responsibility = self.error_projected + self.error_gated;
      }

      for (let i = 0; i < self.incoming.length; i++) {
        const connection = self.incoming[i];
        let gradient = self.error_projected * connection.elegibility;
        for (let j = 0; j < connection.xtrace_nodes.length; j++) {
          const node = connection.xtrace_nodes[j];
          gradient += node.error_responsibility * connection.xtrace_values[j];
        }

        connection.delta_weights_total += options.rate * gradient * self.mask;
        if (options.update) {
          connection.delta_weights_total += options.momentum * connection.delta_weights_previous;
          connection.weight += connection.delta_weights_total;
          connection.delta_weights_previous = connection.delta_weights_total;
          connection.delta_weights_total = 0;
        }
      }

      self.delta_bias_total += options.rate * self.error_responsibility;
      if (options.update) {
        self.delta_bias_total += options.momentum * self.delta_bias_previous;
        self.bias += self.delta_bias_total;
        self.delta_bias_previous = self.delta_bias_total;
        self.delta_bias_total = 0;
      }

      return {
        responsibility: self.error_responsibility,
        projected: self.error_projected,
        gated: self.error_gated,
      };
    },


    self.connect = function(nodes, weight, options) {
      if (nodes === undefined) throw new ReferenceError('Missing required parameter \'nodes\'');

      if (options === undefined && typeof weight === 'object') {
        options = weight;
        weight = undefined;
      }

      options = options || {};

      if (nodes instanceof Node) {
        if (nodes === self) {
          self.connections_self.weight = weight || 1;
          return self.connections_self;
        } else if (self.isProjectingTo(nodes)) {
          throw new ReferenceError('Node is already projecting to \'target\'');
        } else {
          const connection = new Connection(self, nodes, weight, options);

          self.outgoing.push(connection);
          nodes.incoming.push(connection);

          if (options.twosided) nodes.connect(self);

          return connection;
        }
      } else if (Array.isArray(nodes)) {
        const connections = [];

        for (let index = 0; index < nodes.length; index++) {
          const connection = new Connection(self, nodes[index], weight, options);

          self.outgoing.push(connection);
          nodes[index].incoming.push(connection);
          connections.push(connection);

          if (options.twosided) nodes[index].connect(self);
        }

        return connections;
      } else {
        throw new TypeError(`Parameter 'target': Expected 'Node' or 'Node[]' - but recieved, ${nodes}`);
      }
    },


    self.disconnect = function(nodes, options) {
      if (nodes === undefined) throw new ReferenceError('Missing required parameter \'target\'');

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

              if (connection.gater !== undefined) connection.gater.ungate(connection);
              if (options.twosided) nodes.disconnect(self);

              return connection;
            }
          }
        }
      } else if (Array.isArray(nodes)) {
        const connections = [];

        for (let i = 0; i < nodes.length; i++) {
          for (let j = 0; j < self.outgoing.length; j++) {
            const connection = self.outgoing[j];

            if (connection.to === nodes[i]) {
              self.outgoing.splice(j, 1);
              connection.to.incoming.splice(connection.to.incoming.indexOf(connection), 1);

              if (connection.gater !== undefined) connection.gater.ungate(connection);
              if (options.twosided) nodes[i].disconnect(self);

              connections.push(connection);

              break;
            }
          }
        }

        return connections;
      } else {
        throw new TypeError(`Parameter 'target': Expected 'Node' or 'Node[]' - but recieved, ${nodes}`);
      }
    },


    self.gate = function(connections) {
      if (connections === undefined) throw new ReferenceError('Missing required parameter \'connections\'');


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


    self.ungate = function(connections) {
      if (connections === undefined) throw new ReferenceError('Missing required parameter \'connections\'');

      if (!Array.isArray(connections)) {
        self.gated.splice(self.gated.indexOf(connections), 1);
        connections.gater = null;
        connections.gain = 1;
      } else {
        for (let i = 0; i < connections.length; i++) {
          const connection = connections[i];

          self.gated.splice(self.gated.indexOf(connection), 1);
          connection.gater = null;
          connection.gain = 1;
        }
      }

      return connections;
    },


    self.clear = function() {
      for (let index = 0; index < self.incoming.length; index++) {
        const connection = self.incoming[index];

        connection.elegibility = 0;
        connection.xtrace_nodes = [];
        connection.xtrace_values = [];
      }

      for (let index = 0; index < self.gated.length; index++) {
        const connection = self.gated[index];
        connection.gain = 0;
      }

      self.error_responsibility = self.error_projected = self.error_gated = 0;
      self.old = self.state = self.activation = 0;
    },


    self.mutate = function(options) {
      options = {
        method: Math.random() < 0.5 ? methods.mutation.MOD_ACTIVATION : methods.mutation.MOD_BIAS,
        ...options,
      };

      function random_index(max, exclude) {
        return (exclude + Math.floor(Math.random() * (max - 1)) + 1) % max;
      }

      function random_key(keys, exclude) {
        return keys[(keys.indexOf(exclude) + Math.floor(Math.random() * (keys.length - 1)) + 1) % keys.length];
      }

      switch (options.method) {
        case methods.mutation.MOD_ACTIVATION:
          if (options.allowed) {
            self.squash = options.allowed[random_index(options.allowed.length, options.allowed.indexOf(self.squash))];
          } else {
            self.squash = methods.activation[random_key(Object.keys(methods.activation), self.squash.name)];
          }
          break;
        case methods.mutation.MOD_BIAS:
          self.bias += Math.random() * (options.method.max - options.method.min) + options.method.min;
          break;
      }
    },


    self.isProjectingTo = function(nodes) {
      if (nodes === undefined) throw new ReferenceError('Missing required parameter \'nodes\'');

      if (nodes === self) {
        return self.connections_self.weight !== 0;
      } else if (!Array.isArray(nodes)) {
        for (let i = 0; i < self.outgoing.length; i++) {
          if (self.outgoing[i].to === nodes) return true;
        }
        return false;
      } else {
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
        return nodes.length === projecting_to;
      }
    },


    self.isProjectedBy = function(nodes) {
      if (nodes === undefined) throw new ReferenceError('Missing required parameter \'nodes\'');

      if (nodes === self) {
        return self.connections_self.weight !== 0;
      } else if (!Array.isArray(nodes)) {
        for (let i = 0; i < self.incoming.length; i++) {
          if (self.incoming[i].from === nodes) return true;
        }
        return false;
      } else {
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
        return nodes.length === projected_by;
      }

    },


    self.toJSON = function() {
      return {
        bias: self.bias,
        type: self.type,
        squash: self.squash.name,
        mask: self.mask,
      };
    };
}


Node.fromJSON = function(json) {
  if (json === undefined) throw new ReferenceError('Missing required parameter \'json\'');

  if (typeof json === 'string') json = JSON.parse(json);

  const node = new Node();

  Object.assign(node, {...json}, {
    squash: methods.activation[json.squash],
  });

  return node;
};

module.exports = Node;
