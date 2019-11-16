let context = require("./context");
let _ = require("./_");
let EventEmitter = require('eventemitter3');
let vis, performance;

// Broswer-only imports
if(context === "browser") {
  vis = require("vis-network");
}
// Node.js-only imports
if(context === "node") {
  performance = require("perf_hooks").performance;
}

Math.cantor = function(a, b) {
  a = parseInt(a); b = parseInt(b); // cast to integer
  return ((a + b) * (a + b + 1)) / 2 + b;
}

function Connection(options={}) {};
function Node(options={}) {};
function Network(options={}) {};

Connection = _.extend(Connection, EventEmitter);
Connection = _.extend(Connection, function(options={}) {
  this.id = options.id || Math.cantor(options.from, options.to);
  this.from = options.from; // @prop {string|number} from
  this.to = options.to; // @prop {string|number} to
});
Node = _.extend(Node, EventEmitter);
Node = _.extend(Node, function(options={}) {
  this.id = options.id;
});
Network = _.extend(Network, EventEmitter);
Network = _.extend(Network, function(options={}) {
  // constructor defaults
  options.inputs = options.inputs || 1;
  options.outputs = options.outputs || 1;

  // genome
  this.inputs = {};
  this.outputs = {};
  this.nodes = {};
  this.connections = {};
  this.NODES = 0;

  // new Network({ inputs, outputs })
  // create input nodes
  for (let i = 0; i < options.inputs; i++) {
    this.inputs[this.NODES] = this.nodes[this.NODES] = new Node({ id: this.NODES });
    ++this.NODES;
  }
  // create output nodes
  for (let o = 0; o < options.outputs; o++) {
    this.outputs[this.NODES] = this.nodes[this.NODES] = new Node({ id: this.NODES });
    ++this.NODES;
  }
  // connect input nodes to output nodes
  for (input in this.inputs) {
    for (output in this.outputs) {
      // connect input node to output node
      let connection = new Connection({ from: input, to: output });
      this.connections[connection.id] = connection;
    }
  }
});

// Node JSON Export
_.mixin(Node, {
  /**
  * Returns a `Node` as a JSON Object
  *
  * @function Node#toJSON
  * @returns {Object}
  *
  * @example
  * let node = new Node({ id: 34 });
  *
  * console.log(node.toJSON());
  * // { id: 34 }
  */
  toJSON: function(options={}) {
    return { id: this.id }
  }
}, { prototype: true });

_.mixin(Connection, {
  /**
  * Returns a `Connection` as a JSON Object
  *
  * @function Connection#toJSON
  * @returns {Object}
  *
  * @example
  * let connection = new Connection({ id: 34 });
  *
  * console.log(connection.toJSON());
  * // { id: 34 }
  */
  toJSON: function(options={}) {
    return {
      id: this.id,
      from: this.from,
      to: this.to
    }
  }
}, { prototype: true })

// Network Visualization Vis.js
_.mixin(Network, {
  /**
  * Returns a JSON representation of the network
  *
  * @returns {Object}
  */
  toJSON: function toJSON() {
    const neurons = Object.values(this.nodes).flat(Infinity).map(function(neuron) {
      return neuron.toJSON();
    });
    const connections = Object.values(this.connections).flat(Infinity).map(function(connection) {
      return connection.toJSON();
    });
    return { neurons, connections }
  },

  /**
  * **BROWSER ONLY**
  *
  * Creates a graph of the network using [`vis-network`](https://www.npmjs.com/package/vis-network) on the given DOMElement
  * or DOMElement ID.
  *
  * @param {string|DOMElement} element - DOMElement, or ID, where graph will ported into
  * @param {Object} [options] - `vis-network` options - [learn more](https://visjs.github.io/vis-network/docs/network/#options)
  */
  toGraph: function toGraph(element, options) {
    const { neurons, connections } = this.toJSON();

    // Flattens neuron layers from `Network.toJSON` and converts it to `vie-network`
    // nodes
    const nodes = new vis.DataSet(neurons.map(function(neuron) {
      neuron.label = `${neuron.id}`;
      neuron.color = neuron.type === "input" ? "gray" : neuron.type === "output" ? "lime" : "orange"; // "input" || "output" || "hidden"
      return neuron;
    }));
    // Flattens connections from `Network.toJSON` and converts it into `vis-network`
    // edges
    const edges = new vis.DataSet(connections.map(function(connection) {
      connection.arrows = "to";
      return connection;
    }));

    // DOM id
    if(typeof element === "string") element = document.getElementById(element);

    // Vis.js Network Options
    // Will have a "left-to-right" graph with "smooth" lines representing
    // connections by default
    options = options || {
      edges: {
        smooth: {
          type: "cubicBezier",
          forceDirection: "horizontal"
        }
      },
      layout: {
        hierarchical: {
          direction: "LR",
          sortMethod: "directed"
        }
      },
      physics: false
    }

    return new vis.Network(element, { nodes, edges }, options);
  }
}, {
  prototype: true
})

// Possible "network-scope" mutations
_.mixin(Network, {
  mutations: {
    "ADD_NODE": function(network, options={}) {},
    "REMOVE_NODE": function(network, options={}) {},
    "ADD_CONNECTION": function(network, options={}) {},
    "REMOVE_CONNECTION": function(network, options={}) {}
  }
});

// NEAT Mutation Helpers
_.mixin(Network, {
  additions: {}, // tracks `Node` additions to the network - creating a key-value pair of the bisected connection's Cantor Pair ID and the bisecting Node's ID, respectively; NOTE: this is useful to ensure that IDs are structurally unique across networks training in a population or acrosss time; if a new node bisects a connection, is removed, and later added again - it should not be address as a new node, but rather as an existing node being "turned on" again.
  removals: {}, // tracks `Node` removals to the network - creating a key-value pair of the emerging connection's Cantor Pair ID and the IDs of the removed connections; NOTE: when a `node` is removed from the network, at least one pair of connections are also removed from the network
  mutate: function(options={}) {
    let mutations = Object.keys(Network.mutations);
    options.mutation = options.mutation || Network.mutations[mutations[Math.floor(Math.random() * mutations.length)]]; // use the given mutation or a random one
  }
}, { prototype: true });



module.exports._ = _;
module.exports.Connection = Connection;
module.exports.Node = Node;
module.exports.Network = Network;
