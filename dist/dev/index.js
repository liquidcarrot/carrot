// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../src/enums/ConnectionType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ConnectionType;

(function (ConnectionType) {
  ConnectionType[ConnectionType["NO_CONNECTION"] = 0] = "NO_CONNECTION";
  ConnectionType[ConnectionType["ALL_TO_ALL"] = 1] = "ALL_TO_ALL";
  ConnectionType[ConnectionType["ONE_TO_ONE"] = 2] = "ONE_TO_ONE";
  ConnectionType[ConnectionType["POOLING"] = 3] = "POOLING";
})(ConnectionType = exports.ConnectionType || (exports.ConnectionType = {}));
},{}],"../src/enums/GatingType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var GatingType;

(function (GatingType) {
  GatingType[GatingType["INPUT"] = 0] = "INPUT";
  GatingType[GatingType["SELF"] = 1] = "SELF";
  GatingType[GatingType["OUTPUT"] = 2] = "OUTPUT";
})(GatingType = exports.GatingType || (exports.GatingType = {}));
},{}],"../src/architecture/Layers/Layer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ConnectionType_1 = require("../../enums/ConnectionType");

var GatingType_1 = require("../../enums/GatingType");

var Layer =
/** @class */
function () {
  function Layer(outputSize) {
    this.outputSize = outputSize;
    this.nodes = [];
    this.inputNodes = new Set();
    this.outputNodes = new Set();
    this.connections = [];
    this.gates = [];
  }

  Layer.connect = function (from, to, connectionType, weight) {
    if (connectionType === void 0) {
      connectionType = ConnectionType_1.ConnectionType.ALL_TO_ALL;
    }

    if (weight === void 0) {
      weight = 1;
    }

    if (connectionType === ConnectionType_1.ConnectionType.NO_CONNECTION) {
      throw new ReferenceError("Cannot connect with 'NO_CONNECTION' connection type");
    }

    var fromNodes = Array.from(from instanceof Layer ? from.outputNodes : from);
    var toNodes = Array.from(to instanceof Layer ? to.inputNodes : to);

    if (toNodes.length === 0) {
      throw new ReferenceError("Target from has no input nodes!");
    }

    if (fromNodes.length === 0) {
      throw new ReferenceError("This from has no output nodes!");
    }

    var connections = [];

    if (connectionType === ConnectionType_1.ConnectionType.ALL_TO_ALL) {
      fromNodes.forEach(function (fromNode) {
        toNodes.forEach(function (toNode) {
          connections.push(fromNode.connect(toNode, weight)); // connect every "from node" to every "to node"
        });
      });
    } else if (connectionType === ConnectionType_1.ConnectionType.ONE_TO_ONE) {
      if (fromNodes.length !== toNodes.length) {
        throw new RangeError("Can't connect one to one! Number of output nodes from are unequal number of incoming nodes from next layer!");
      }

      for (var i = 0; i < fromNodes.length; i++) {
        connections.push(fromNodes[i].connect(toNodes[i], weight)); // connect every nodes with same indices
      }
    } else if (connectionType === ConnectionType_1.ConnectionType.POOLING) {
      // connect the same amount of input nodes to every output node
      // every input node has only one connection available
      var ratio_1 = toNodes.length / fromNodes.length;
      connections.push.apply(connections, fromNodes.map(function (node, index) {
        return node.connect(toNodes[Math.floor(index * ratio_1)], weight);
      }));
    }

    return connections;
  };

  Layer.gate = function (nodes, connections, gateType) {
    var gatedConnections = [];

    switch (gateType) {
      case GatingType_1.GatingType.INPUT:
        {
          // gate incoming connections
          var toNodes = Array.from(new Set(connections.map(function (conn) {
            return conn.to;
          })));

          var _loop_1 = function (i) {
            var node = toNodes[i];
            var gateNode = nodes[i % nodes.length];
            node.incoming.filter(function (conn) {
              return connections.includes(conn);
            }).forEach(function (conn) {
              gateNode.addGate(conn);
              gatedConnections.push(conn);
            });
          };

          for (var i = 0; i < toNodes.length; i++) {
            _loop_1(i);
          }

          break;
        }

      case GatingType_1.GatingType.SELF:
        {
          // gate self connections
          var fromNodes = Array.from(new Set(connections.map(function (conn) {
            return conn.from;
          })));

          for (var i = 0; i < fromNodes.length; i++) {
            if (connections.includes(fromNodes[i].selfConnection)) {
              nodes[i % nodes.length].addGate(fromNodes[i].selfConnection);
              gatedConnections.push(fromNodes[i].selfConnection);
            }
          }

          break;
        }

      case GatingType_1.GatingType.OUTPUT:
        {
          // gate outgoing connections
          var fromNodes = Array.from(new Set(connections.map(function (conn) {
            return conn.from;
          })));

          var _loop_2 = function (i) {
            var node = fromNodes[i];
            var gateNode = nodes[i % nodes.length];
            node.outgoing.filter(function (conn) {
              return connections.includes(conn);
            }).forEach(function (conn) {
              gateNode.addGate(conn);
              gatedConnections.push(conn);
            });
          };

          for (var i = 0; i < fromNodes.length; i++) {
            _loop_2(i);
          }

          break;
        }
    }

    return gatedConnections;
  };

  return Layer;
}();

exports.Layer = Layer;
},{"../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../enums/GatingType":"../src/enums/GatingType.js"}],"../src/methods/Utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Returns an random element from the given array.
 *
 * @param arr the array to pick from
 * @returns the random picked element
 */

function pickRandom(arr) {
  if (arr.length === 0) {
    throw new RangeError("Cannot pick from an empty array");
  }

  return arr[randInt(0, arr.length)];
}

exports.pickRandom = pickRandom;
/**
 * Returns a random integer in the range [min,max)
 *
 * @param min bound
 * @param max bound
 * @returns random integer in [min,max)
 */

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

exports.randInt = randInt;
/**
 * Returns a random double in the range [min,max)
 *
 * @param min bound
 * @param max bound
 * @returns random double in [min,max)
 */

function randDouble(min, max) {
  return Math.random() * (max - min) + min;
}

exports.randDouble = randDouble;
/**
 * Returns a random boolean
 *
 * @returns random boolean
 */

function randBoolean() {
  return Math.random() >= 0.5;
}

exports.randBoolean = randBoolean;
/**
 * Removes an element from an array.
 *
 * @param arr the array
 * @param elem the element which will be removed
 * @returns false -> element does not exists on array; true -> element removed from array
 */

function removeFromArray(arr, elem) {
  var index = arr.indexOf(elem);

  if (index === -1) {
    return false;
  } else {
    arr.splice(index, 1);
    return true;
  }
}

exports.removeFromArray = removeFromArray;
/**
 * Checks a given value. If value is undefined return the default value.
 *
 * @param value to check
 * @param defaultValue to return if value is undefined
 * @returns value if defined otherwise defaultValue
 */

function getOrDefault(value, defaultValue) {
  return value !== null && value !== void 0 ? value : defaultValue;
}

exports.getOrDefault = getOrDefault;
/**
 * Shuffles an aray
 * @param array the array
 * @returns the shuffled array
 */

function shuffle(array) {
  var counter = array.length; // While there are elements in the array

  while (counter > 0) {
    // Pick a random index
    var index = randInt(0, counter); // Decrease counter by 1

    counter--; // And swap the last element with it

    var temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

exports.shuffle = shuffle;

function max(array) {
  var maxValue = -Infinity;

  for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
    var value = array_1[_i];

    if (value > maxValue) {
      maxValue = value;
    }
  }

  return maxValue;
}

exports.max = max;

function maxValueIndex(array) {
  var maxValue = array[0];
  var maxValueIndex = 0;

  for (var i = 0; i < array.length; i++) {
    if (array[i] > maxValue) {
      maxValue = array[i];
      maxValueIndex = i;
    }
  }

  return maxValueIndex;
}

exports.maxValueIndex = maxValueIndex;

function minValueIndex(array) {
  var minValue = array[0];
  var minValueIndex = 0;

  for (var i = 0; i < array.length; i++) {
    if (array[i] < minValue) {
      minValue = array[i];
      minValueIndex = i;
    }
  }

  return minValueIndex;
}

exports.minValueIndex = minValueIndex;

function min(array) {
  var minValue = Infinity;

  for (var _i = 0, array_2 = array; _i < array_2.length; _i++) {
    var value = array_2[_i];

    if (value < minValue) {
      minValue = value;
    }
  }

  return minValue;
}

exports.min = min;

function avg(array) {
  return sum(array) / array.length;
}

exports.avg = avg;

function sum(array) {
  var sum = 0;

  for (var _i = 0, array_3 = array; _i < array_3.length; _i++) {
    var value = array_3[_i];
    sum += value;
  }

  return sum;
}

exports.sum = sum;

function generateGaussian(mean, deviation) {
  if (mean === void 0) {
    mean = 0;
  }

  if (deviation === void 0) {
    deviation = 2;
  }

  var sum = 0;
  var numSamples = 10;

  for (var i = 0; i < numSamples; i++) {
    sum += Math.random();
  }

  return deviation * sum / numSamples + mean - 0.5 * deviation;
}

exports.generateGaussian = generateGaussian;
},{}],"../src/enums/NodeType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var NodeType;

(function (NodeType) {
  NodeType[NodeType["INPUT"] = 0] = "INPUT";
  NodeType[NodeType["HIDDEN"] = 1] = "HIDDEN";
  NodeType[NodeType["OUTPUT"] = 2] = "OUTPUT";
  NodeType[NodeType["POOL_NODE"] = 3] = "POOL_NODE";
})(NodeType = exports.NodeType || (exports.NodeType = {}));

var PoolNodeType;

(function (PoolNodeType) {
  PoolNodeType[PoolNodeType["MAX_POOLING"] = 0] = "MAX_POOLING";
  PoolNodeType[PoolNodeType["AVG_POOLING"] = 1] = "AVG_POOLING";
  PoolNodeType[PoolNodeType["MIN_POOLING"] = 2] = "MIN_POOLING";
})(PoolNodeType = exports.PoolNodeType || (exports.PoolNodeType = {}));

var NoiseNodeType;

(function (NoiseNodeType) {
  NoiseNodeType[NoiseNodeType["GAUSSIAN_NOISE"] = 0] = "GAUSSIAN_NOISE";
})(NoiseNodeType = exports.NoiseNodeType || (exports.NoiseNodeType = {}));
},{}],"../src/methods/Mutation.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Node_1 = require("../architecture/Node");

var Utils_1 = require("./Utils");

var NodeType_1 = require("../enums/NodeType");
/**
 *
 * Genetic algorithm mutation methods. Creates variations (mutations) in neural networks which are then selected for better performance.
 *
 * @see {@link https://en.wikipedia.org/wiki/mutation_(genetic_algorithm)|Mutation (genetic algorithms) on Wikipedia}
 * @see {@link https://en.wikipedia.org/wiki/Genetic_algorithm#Selection|Selection (genetic algorithms) on Wikipedia}
 *
 * @example <caption>Mutation methods with networks</caption>
 *
 * let myNetwork = new Network(5, 5);
 *
 * // Setting a mutation method for a network
 * myNetwork.mutate(new AddNodeMutation());
 *
 * // specifying a list of network mutation methods to use during evolution
 * myNetwork.evolve(trainingset, {
 *  mutation: [new AddNodeMutation(),new ModBiasMutation()]
 * }
 *
 * @example <caption>Using a mutation method with a neuron</caption>
 *
 * let myNode = new Node(NodeType.HIDDEN);
 *
 * myNode.mutateBias(new ModBiasMutation(-0.5,0.3));
 */


var Mutation =
/** @class */
function () {
  function Mutation() {}

  return Mutation;
}();

exports.Mutation = Mutation;
/**
 * Add node mutation.
 *
 * Adds a hidden node to the network.
 *
 * @prop {boolean} randomActivation=true If enabled, sets a random activation function on the newly created node
 *
 * @example
 *
 * let myNetwork = new Network(5, 5);
 *
 * myNetwork.mutate(new AddNodeMutation());
 */

var AddNodeMutation =
/** @class */
function (_super) {
  __extends(AddNodeMutation, _super);

  function AddNodeMutation(randomActivation) {
    if (randomActivation === void 0) {
      randomActivation = true;
    }

    var _this = _super.call(this) || this;

    _this.randomActivation = randomActivation;
    return _this;
  }

  AddNodeMutation.prototype.mutate = function (network, options) {
    // check if max nodes is already reached
    if (options !== undefined && options.maxNodes !== undefined && network.nodes.length >= options.maxNodes) {
      return;
    } // create a new hidden node


    var node = new Node_1.Node(NodeType_1.NodeType.HIDDEN);

    if (this.randomActivation) {
      node.mutateActivation(); // choose random activation
    } // take a random connection


    var connection = Utils_1.pickRandom(network.connections);
    var from = connection.from;
    var to = connection.to;
    network.disconnect(from, to); // disconnect it
    // put the node in between the connection

    var minBound = Math.max(network.inputSize, 1 + network.nodes.indexOf(from));
    network.nodes.splice(minBound, 0, node);
    var newConnection1 = network.connect(from, node, 1);
    var newConnection2 = network.connect(node, to, connection.weight);

    if (connection.gateNode != null) {
      // if connection had a gate node
      // choose randomly which new connection should get this gate node
      if (Utils_1.randBoolean()) {
        network.addGate(connection.gateNode, newConnection1);
      } else {
        network.addGate(connection.gateNode, newConnection2);
      }
    }
  };

  return AddNodeMutation;
}(Mutation);

exports.AddNodeMutation = AddNodeMutation;
/**
 * Sub node mutation.
 *
 * Removes a random node from the network.
 *
 * @prop keepGates=true Ensures replacement node has gated connections if the removed node did.
 *
 * @example
 * let myNetwork = new Network(5, 5);
 *
 * myNetwork.mutate(new AddNodeMutation()); // Network will have one hidden node
 * myNetwork.mutate(new SubNodeMutation()); // Network will have no hidden node
 */

var SubNodeMutation =
/** @class */
function (_super) {
  __extends(SubNodeMutation, _super);

  function SubNodeMutation(keepGates) {
    if (keepGates === void 0) {
      keepGates = true;
    }

    var _this = _super.call(this) || this;

    _this.keepGates = keepGates;
    return _this;
  }

  SubNodeMutation.prototype.mutate = function (network) {
    var possible = network.nodes.filter(function (node) {
      return node !== undefined && node.isHiddenNode();
    }); // hidden nodes

    if (possible.length > 0) {
      network.removeNode(Utils_1.pickRandom(possible)); // remove a random node from the filtered array
    }
  };

  return SubNodeMutation;
}(Mutation);

exports.SubNodeMutation = SubNodeMutation;
/**
 * Add connections mutation.
 *
 * Adds a connection to the network.
 *
 * @example
 *
 * let myNetwork = new Network(5, 5);
 *
 * myNetwork.mutate(new AddNodeMutation()); // adds a hidden node
 * myNetwork.mutate(new AddConnectionMutation()); // creates a random forward pointing connection
 */

var AddConnectionMutation =
/** @class */
function (_super) {
  __extends(AddConnectionMutation, _super);

  function AddConnectionMutation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  AddConnectionMutation.prototype.mutate = function (network, options) {
    // check if max connections is already reached
    if (options !== undefined && options.maxConnections !== undefined && network.connections.length >= options.maxConnections) {
      return;
    }

    var possible = [];

    for (var i = 0; i < network.nodes.length - network.outputSize; i++) {
      var from = network.nodes[i];

      for (var j = Math.max(i + 1, network.inputSize); j < network.nodes.length; j++) {
        var to = network.nodes[j];

        if (!from.isProjectingTo(to)) {
          possible.push([from, to]);
        }
      }
    }

    if (possible.length > 0) {
      var pair = Utils_1.pickRandom(possible);
      network.connect(pair[0], pair[1]);
    }
  };

  return AddConnectionMutation;
}(Mutation);

exports.AddConnectionMutation = AddConnectionMutation;
/**
 * Sub connection mutation.
 *
 * Removes a random connection from the network.
 *
 * @example
 *
 * let myNetwork = new Network(5, 5);
 *
 * myNetwork.mutate(new SubConnectionMutation());
 */

var SubConnectionMutation =
/** @class */
function (_super) {
  __extends(SubConnectionMutation, _super);

  function SubConnectionMutation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  SubConnectionMutation.prototype.mutate = function (network) {
    var possible = network.connections.filter(function (conn) {
      return conn.from.outgoing.length > 1;
    }) // do not deactivate a neuron
    .filter(function (conn) {
      return conn.to.incoming.length > 1;
    }) // do not deactivate a neuron
    .filter(function (conn) {
      return network.nodes.indexOf(conn.to) > network.nodes.indexOf(conn.from);
    }); // look for forward pointing connections

    if (possible.length > 0) {
      var randomConnection = Utils_1.pickRandom(possible); // pick a random connection from the filtered array

      network.disconnect(randomConnection.from, randomConnection.to); // remove the connection from the network
    }
  };

  return SubConnectionMutation;
}(Mutation);

exports.SubConnectionMutation = SubConnectionMutation;
/**
 * Mod weight mutation.
 *
 * Modifies the weight of a random connection.
 *
 * @prop {number} min=-1 lower bound for weight modification
 * @prop {number} max=1 higher bound for weight modification
 *
 * @example
 *
 * let myNetwork = new Network(5, 5);
 *
 * myNetwork.mutate(new ModWeightMutation()); // modifies the weight of a random connection
 */

var ModWeightMutation =
/** @class */
function (_super) {
  __extends(ModWeightMutation, _super);

  function ModWeightMutation(min, max) {
    if (min === void 0) {
      min = -1;
    }

    if (max === void 0) {
      max = 1;
    }

    var _this = _super.call(this) || this;

    _this.min = min;
    _this.max = max;
    return _this;
  }

  ModWeightMutation.prototype.mutate = function (network) {
    // pick random connection and mutate it's weight
    Utils_1.pickRandom(network.connections).weight += Utils_1.randDouble(this.min, this.max);
  };

  return ModWeightMutation;
}(Mutation);

exports.ModWeightMutation = ModWeightMutation;
/**
 * Mod bias mutation.
 *
 * Modifies the bias value of a random hidden or output node
 *
 * @prop {number} min=-1 lower bound for modification of a neuron's bias
 * @prop {number} max=1 higher bound for modification of a neuron's bias
 *
 * @example
 *
 * let myNetwork = new Network(5, 5);
 *
 * let myNode = new Node();
 *
 * myNode.mutate(new ModBiasMutation());
 */

var ModBiasMutation =
/** @class */
function (_super) {
  __extends(ModBiasMutation, _super);

  function ModBiasMutation(min, max) {
    if (min === void 0) {
      min = -1;
    }

    if (max === void 0) {
      max = 1;
    }

    var _this = _super.call(this) || this;

    _this.min = min;
    _this.max = max;
    return _this;
  }

  ModBiasMutation.prototype.mutate = function (network) {
    Utils_1.pickRandom(network.nodes.filter(function (node) {
      return !node.isInputNode();
    })) // pick random hidden or output node
    .mutateBias(this); // mutate it's bias
  };

  return ModBiasMutation;
}(Mutation);

exports.ModBiasMutation = ModBiasMutation;
/**
 * Mod activation mutation.
 *
 * Modifies the activation function of a random node
 *
 * @prop {boolean} mutateOutput=false Change activation function of network output neurons. Enable this to let the network experiment with its output.
 *
 * @example <caption>Mutating the activation function of a node</caption>
 * let myNode = new Node();
 *
 * myNode.mutate(new ModActivationMutation());
 */

var ModActivationMutation =
/** @class */
function (_super) {
  __extends(ModActivationMutation, _super);

  function ModActivationMutation(mutateOutput) {
    if (mutateOutput === void 0) {
      mutateOutput = false;
    }

    var _this = _super.call(this) || this;

    _this.mutateOutput = mutateOutput;
    return _this;
  }

  ModActivationMutation.prototype.mutate = function (network, options) {
    var possible = this.mutateOutput ? network.nodes.filter(function (node) {
      return !node.isInputNode();
    }) // hidden and output nodes
    : network.nodes.filter(function (node) {
      return node.isHiddenNode();
    }); // hidden nodes

    if (possible.length > 0) {
      Utils_1.pickRandom(possible).mutateActivation(options === null || options === void 0 ? void 0 : options.allowedActivations); // mutate the activation of the node
    }
  };

  return ModActivationMutation;
}(Mutation);

exports.ModActivationMutation = ModActivationMutation;
/**
 * Add self connection.
 *
 * Adds a connection from a node to itself.
 *
 * @example
 * let myNetwork = new Network(5, 5);
 *
 * myNetwork.mutate(new AddSelfConnectionMutation());
 */

var AddSelfConnectionMutation =
/** @class */
function (_super) {
  __extends(AddSelfConnectionMutation, _super);

  function AddSelfConnectionMutation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  AddSelfConnectionMutation.prototype.mutate = function (network) {
    var possible = network.nodes.filter(function (node) {
      return !node.isInputNode();
    }) // no input nodes
    .filter(function (node) {
      return node.selfConnection.weight === 0;
    }); // only nodes that doesn't have an self connection already

    if (possible.length > 0) {
      var node = Utils_1.pickRandom(possible); // pick a random node from the filtered array

      network.connect(node, node); // connection the node to itself
    }
  };

  return AddSelfConnectionMutation;
}(Mutation);

exports.AddSelfConnectionMutation = AddSelfConnectionMutation;
/**
 * Sub self connection.
 *
 * Removes a connection from a node to itself.
 *
 * @example
 * let myNetwork = new Network(5, 5);
 *
 * myNetwork.mutate(new AddSelfConnectionMutation()); // add a self connection
 * myNetwork.mutate(new SubSelfConnectionMutation()); // remove a self connection
 */

var SubSelfConnectionMutation =
/** @class */
function (_super) {
  __extends(SubSelfConnectionMutation, _super);

  function SubSelfConnectionMutation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  SubSelfConnectionMutation.prototype.mutate = function (network) {
    var possible = network.connections.filter(function (conn) {
      return conn.from === conn.to;
    });

    if (possible.length > 0) {
      var randomConnection = Utils_1.pickRandom(possible);
      network.disconnect(randomConnection.from, randomConnection.to);
    }
  };

  return SubSelfConnectionMutation;
}(Mutation);

exports.SubSelfConnectionMutation = SubSelfConnectionMutation;
/**
 * Add gate mutation.
 *
 * Adds a gate to the network.
 *
 * @example
 * let myNetwork = new Network(5, 5);
 *
 * myNetwork.mutate(new AddGateMutation());
 */

var AddGateMutation =
/** @class */
function (_super) {
  __extends(AddGateMutation, _super);

  function AddGateMutation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  AddGateMutation.prototype.mutate = function (network, options) {
    // check if max gates isn't reached already
    if (options !== undefined && options.maxGates !== undefined && network.gates.length >= options.maxGates) {
      return;
    } // use only connections that aren't already gated


    var possible = network.connections.filter(function (conn) {
      return conn.gateNode === null;
    });

    if (possible.length > 0) {
      var node = Utils_1.pickRandom(network.nodes.filter(function (node) {
        return !node.isInputNode();
      })); // hidden or output node

      var connection = Utils_1.pickRandom(possible); // random connection from filtered array

      network.addGate(node, connection); // use the node to gate the connection
    }
  };

  return AddGateMutation;
}(Mutation);

exports.AddGateMutation = AddGateMutation;
/**
 * Sub gate mutation.
 *
 * Removes a gate from the network.
 *
 * @example
 * let myNetwork = new Network(5, 5);
 *
 * myNetwork.mutate(new AddGateMutation()); // add a gate to the network
 * myNetwork.mutate(new SubGateMutation()); // remove the gate from the network
 */

var SubGateMutation =
/** @class */
function (_super) {
  __extends(SubGateMutation, _super);

  function SubGateMutation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  SubGateMutation.prototype.mutate = function (network) {
    if (network.gates.length > 0) {
      network.removeGate(Utils_1.pickRandom(network.gates));
    }
  };

  return SubGateMutation;
}(Mutation);

exports.SubGateMutation = SubGateMutation;
/**
 * Add back connection mutation.
 *
 * Adds a backward pointing connection to the network.
 *
 * @example
 * let myNetwork = new Network(5, 5);
 *
 * myNetwork.mutate(new AddBackConnectionMutation);
 */

var AddBackConnectionMutation =
/** @class */
function (_super) {
  __extends(AddBackConnectionMutation, _super);

  function AddBackConnectionMutation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  AddBackConnectionMutation.prototype.mutate = function (network) {
    var possible = [];

    for (var i = network.inputSize; i < network.nodes.length; i++) {
      var from = network.nodes[i];

      for (var j = network.inputSize; j < i; j++) {
        var to = network.nodes[j];

        if (!from.isProjectingTo(to)) {
          possible.push([from, to]);
        }
      }
    }

    if (possible.length > 0) {
      var pair = Utils_1.pickRandom(possible);
      network.connect(pair[0], pair[1]);
    }
  };

  return AddBackConnectionMutation;
}(Mutation);

exports.AddBackConnectionMutation = AddBackConnectionMutation;
/**
 * Sub back connection mutation.
 *
 * Removes a backward pointing connection to the network.
 *
 * @example
 * let myNetwork = new Network(5, 5);
 *
 * myNetwork.mutate(new AddBackConnectionMutation); // add a back connection
 * myNetwork.mutate(new SubBackConnectionMutation); // remove the back connection
 */

var SubBackConnectionMutation =
/** @class */
function (_super) {
  __extends(SubBackConnectionMutation, _super);

  function SubBackConnectionMutation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  SubBackConnectionMutation.prototype.mutate = function (network) {
    var possible = network.connections.filter(function (conn) {
      return conn.from.outgoing.length > 1;
    }).filter(function (conn) {
      return conn.to.incoming.length > 1;
    }).filter(function (conn) {
      return network.nodes.indexOf(conn.from) > network.nodes.indexOf(conn.to);
    });

    if (possible.length > 0) {
      var randomConnection = Utils_1.pickRandom(possible);
      network.disconnect(randomConnection.from, randomConnection.to);
    }
  };

  return SubBackConnectionMutation;
}(Mutation);

exports.SubBackConnectionMutation = SubBackConnectionMutation;
/**
 * Swap nodes mutation.
 *
 * Swaps the values of two randomly picked nodes.
 *
 * @prop {boolean} mutateOutput=false Swap bias and activation function of network output neurons too. Disable this to keep output of a neural network normalized.
 * @example
 * let myNetwork = new Network(5, 5);
 *
 * myNetwork.mutate(new SwapNodesMutation());
 */

var SwapNodesMutation =
/** @class */
function (_super) {
  __extends(SwapNodesMutation, _super);

  function SwapNodesMutation(mutateOutput) {
    if (mutateOutput === void 0) {
      mutateOutput = false;
    }

    var _this = _super.call(this) || this;

    _this.mutateOutput = mutateOutput;
    return _this;
  }

  SwapNodesMutation.prototype.mutate = function (network) {
    var possible = this.mutateOutput ? network.nodes.filter(function (node) {
      return node !== undefined && !node.isInputNode();
    }) // hidden or output nodes
    : network.nodes.filter(function (node) {
      return node !== undefined && node.isHiddenNode();
    }); // only hidden nodes

    if (possible.length >= 2) {
      // select two different nodes from the filtered array
      var node1_1 = Utils_1.pickRandom(possible);
      var node2 = Utils_1.pickRandom(possible.filter(function (node) {
        return node !== node1_1;
      })); // change there parameters

      var biasTemp = node1_1.bias;
      var squashTemp = node1_1.squash;
      node1_1.bias = node2.bias;
      node1_1.squash = node2.squash;
      node2.bias = biasTemp;
      node2.squash = squashTemp;
    }
  };

  return SwapNodesMutation;
}(Mutation);

exports.SwapNodesMutation = SwapNodesMutation;
/**
 * Array of all mutation methods
 *
 * @example <caption>A group of mutation methods for evolution</caption>
 * let myNetwork = new Network(5, 5);
 *
 * network.evolve(trainingset, {
 *  mutation: methods.mutation.ALL // all mutation methods
 * }
 */

var ALL_MUTATIONS = [new AddNodeMutation(), new SubNodeMutation(), new AddConnectionMutation(), new SubConnectionMutation(), new ModWeightMutation(), new ModBiasMutation(), new ModActivationMutation(), new AddGateMutation(), new SubGateMutation(), new AddSelfConnectionMutation(), new SubSelfConnectionMutation(), new AddBackConnectionMutation(), new SubBackConnectionMutation(), new SwapNodesMutation()];
exports.ALL_MUTATIONS = ALL_MUTATIONS;
/**
 * Array of all feedforwad mutation methods
 *
 * @example <caption>A group of mutation methods for evolution</caption>
 * let myNetwork = new Network(5, 5);
 *
 * network.evolve(trainingset, {
 *  mutation: methods.mutation.FEEDFORWARD_MUTATIONS // all feedforward mutation methods
 * }
 */

var FEEDFORWARD_MUTATIONS = [new AddNodeMutation(), new SubNodeMutation(), new AddConnectionMutation(), new SubConnectionMutation(), new ModWeightMutation(), new ModBiasMutation(), new ModActivationMutation(), new SwapNodesMutation()];
exports.FEEDFORWARD_MUTATIONS = FEEDFORWARD_MUTATIONS;
var NO_STRUCTURE_MUTATIONS = [new ModWeightMutation(), new ModBiasMutation(), new ModActivationMutation()];
exports.NO_STRUCTURE_MUTATIONS = NO_STRUCTURE_MUTATIONS;
var ONLY_STRUCTURE = [new AddNodeMutation(), new SubNodeMutation(), new AddConnectionMutation(), new SubConnectionMutation(), new AddGateMutation(), new SubGateMutation(), new AddSelfConnectionMutation(), new SubSelfConnectionMutation(), new AddBackConnectionMutation(), new SubBackConnectionMutation(), new SwapNodesMutation()];
exports.ONLY_STRUCTURE = ONLY_STRUCTURE;
},{"../architecture/Node":"../src/architecture/Node.js","./Utils":"../src/methods/Utils.js","../enums/NodeType":"../src/enums/NodeType.js"}],"../src/enums/ActivationType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ActivationType;

(function (ActivationType) {
  ActivationType[ActivationType["NO_ACTIVATION"] = 0] = "NO_ACTIVATION";
  ActivationType[ActivationType["LogisticActivation"] = 1] = "LogisticActivation";
  ActivationType[ActivationType["TanhActivation"] = 2] = "TanhActivation";
  ActivationType[ActivationType["IdentityActivation"] = 3] = "IdentityActivation";
  ActivationType[ActivationType["StepActivation"] = 4] = "StepActivation";
  ActivationType[ActivationType["RELUActivation"] = 5] = "RELUActivation";
  ActivationType[ActivationType["SoftSignActivation"] = 6] = "SoftSignActivation";
  ActivationType[ActivationType["SinusoidActivation"] = 7] = "SinusoidActivation";
  ActivationType[ActivationType["GaussianActivation"] = 8] = "GaussianActivation";
  ActivationType[ActivationType["BentIdentityActivation"] = 9] = "BentIdentityActivation";
  ActivationType[ActivationType["BipolarActivation"] = 10] = "BipolarActivation";
  ActivationType[ActivationType["BipolarSigmoidActivation"] = 11] = "BipolarSigmoidActivation";
  ActivationType[ActivationType["HardTanhActivation"] = 12] = "HardTanhActivation";
  ActivationType[ActivationType["AbsoluteActivation"] = 13] = "AbsoluteActivation";
  ActivationType[ActivationType["InverseActivation"] = 14] = "InverseActivation";
  ActivationType[ActivationType["SELUActivation"] = 15] = "SELUActivation";
})(ActivationType = exports.ActivationType || (exports.ActivationType = {}));
},{}],"../src/methods/Activation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Activation functions
 *
 * Activation functions determine what activation value neurons should get. Depending on your network's environment, choosing a suitable activation function can have a positive impact on the learning ability of the network.
 *
 * @see [Activation Function on Wikipedia](https://en.wikipedia.org/wiki/Activation_function)
 * @see [Beginners Guide to Activation Functions](https://towardsdatascience.com/secret-sauce-behind-the-beauty-of-deep-learning-beginners-guide-to-activation-functions-a8e23a57d046)
 * @see [Understanding activation functions in neural networks](https://medium.com/the-theory-of-everything/understanding-activation-functions-in-neural-networks-9491262884e0)
 * @see [List of activation functions in neural networks with pros/cons](https://stats.stackexchange.com/questions/115258/comprehensive-list-of-activation-functions-in-neural-networks-with-pros-cons)
 *
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new LogisticActivation();
 */

var ActivationType_1 = require("../enums/ActivationType");

var Activation =
/** @class */
function () {
  function Activation() {
    this.type = ActivationType_1.ActivationType.NO_ACTIVATION;
  }

  Activation.getActivation = function (activationType) {
    switch (activationType) {
      case ActivationType_1.ActivationType.LogisticActivation:
        return new LogisticActivation();

      case ActivationType_1.ActivationType.TanhActivation:
        return new TanhActivation();

      case ActivationType_1.ActivationType.IdentityActivation:
        return new IdentityActivation();

      case ActivationType_1.ActivationType.StepActivation:
        return new StepActivation();

      case ActivationType_1.ActivationType.RELUActivation:
        return new RELUActivation();

      case ActivationType_1.ActivationType.SoftSignActivation:
        return new SoftSignActivation();

      case ActivationType_1.ActivationType.SinusoidActivation:
        return new LogisticActivation();

      case ActivationType_1.ActivationType.GaussianActivation:
        return new GaussianActivation();

      case ActivationType_1.ActivationType.BentIdentityActivation:
        return new BentIdentityActivation();

      case ActivationType_1.ActivationType.BipolarActivation:
        return new BipolarActivation();

      case ActivationType_1.ActivationType.BipolarSigmoidActivation:
        return new BipolarSigmoidActivation();

      case ActivationType_1.ActivationType.HardTanhActivation:
        return new HardTanhActivation();

      case ActivationType_1.ActivationType.AbsoluteActivation:
        return new AbsoluteActivation();

      case ActivationType_1.ActivationType.InverseActivation:
        return new InverseActivation();

      case ActivationType_1.ActivationType.SELUActivation:
        return new SELUActivation();
    }

    throw new ReferenceError(activationType + " is not the name of any available activations! These are all available activations: " + ALL_ACTIVATIONS);
  };

  return Activation;
}();

exports.Activation = Activation;
/**
 * [Logistic function.](https://en.wikipedia.org/wiki/Logistic_function)
 *
 * @param x Input value(s) to activation function
 * @param derivative Flag to select derivative function
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new LogisticActivation();
 */

var LogisticActivation =
/** @class */
function () {
  function LogisticActivation() {
    this.type = ActivationType_1.ActivationType.LogisticActivation;
  }

  LogisticActivation.prototype.calc = function (x, derivative) {
    if (derivative === void 0) {
      derivative = false;
    }

    if (!derivative) {
      return 1 / (1 + Math.exp(-x));
    } else {
      return this.calc(x, false) * (1 - this.calc(x, false));
    }
  };

  return LogisticActivation;
}();

exports.LogisticActivation = LogisticActivation;
/**
 * [TanH function.](https://en.wikipedia.org/wiki/Hyperbolic_function#Hyperbolic_tangent)
 *
 * @param x Input value to activation function
 * @param derivative Flag to select derivative function
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new TanhActivation();
 */

var TanhActivation =
/** @class */
function () {
  function TanhActivation() {
    this.type = ActivationType_1.ActivationType.TanhActivation;
  }

  TanhActivation.prototype.calc = function (x, derivative) {
    if (derivative === void 0) {
      derivative = false;
    }

    if (!derivative) {
      return Math.tanh(x);
    } else {
      return 1 - this.calc(x, false) * this.calc(x, false);
    }
  };

  return TanhActivation;
}();

exports.TanhActivation = TanhActivation;
/**
 * [Identity function.](https://en.wikipedia.org/wiki/Identity_function)
 *
 * Returns input as output, used for [memory neurons](Layer#.Memory).
 *
 * @param x Input values to activation function
 * @param derivative Flag to select derivative function
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new IdentityActivation();
 */

var IdentityActivation =
/** @class */
function () {
  function IdentityActivation() {
    this.type = ActivationType_1.ActivationType.IdentityActivation;
  }

  IdentityActivation.prototype.calc = function (x, derivative) {
    if (derivative === void 0) {
      derivative = false;
    }

    if (!derivative) {
      return x;
    } else {
      return 1;
    }
  };

  return IdentityActivation;
}();

exports.IdentityActivation = IdentityActivation;
/**
 * [Step function.](https://en.wikipedia.org/wiki/Heaviside_step_function)
 *
 * @param x Input values to activation function
 * @param derivative Flag to select derivative function
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new StepActivation();
 */

var StepActivation =
/** @class */
function () {
  function StepActivation() {
    this.type = ActivationType_1.ActivationType.StepActivation;
  }

  StepActivation.prototype.calc = function (x, derivative) {
    if (derivative === void 0) {
      derivative = false;
    }

    if (!derivative) {
      return x < 0 ? 0 : 1;
    } else {
      return 0;
    }
  };

  return StepActivation;
}();

exports.StepActivation = StepActivation;
/**
 * [ReLU function.]{@link https://en.wikipedia.org/wiki/Rectifier_(neural_networks)}
 *
 * @param x Input values to activation function
 * @param derivative Flag to select derivative function
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new RELUActivation();
 */

var RELUActivation =
/** @class */
function () {
  function RELUActivation() {
    this.type = ActivationType_1.ActivationType.RELUActivation;
  }

  RELUActivation.prototype.calc = function (x, derivative) {
    if (derivative === void 0) {
      derivative = false;
    }

    if (!derivative) {
      return x <= 0 ? 0 : x;
    } else {
      return x <= 0 ? 0 : 1;
    }
  };

  return RELUActivation;
}();

exports.RELUActivation = RELUActivation;
/**
 * [SoftSign function.](https://en.wikipedia.org/wiki/Activation_function#Comparison_of_activation_functions)
 *
 * @param x Input values to activation function
 * @param derivative Flag to select derivative function
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new SoftSignActivation;
 */

var SoftSignActivation =
/** @class */
function () {
  function SoftSignActivation() {
    this.type = ActivationType_1.ActivationType.SoftSignActivation;
  }

  SoftSignActivation.prototype.calc = function (x, derivative) {
    if (derivative === void 0) {
      derivative = false;
    }

    if (!derivative) {
      return x / (1 + Math.abs(x));
    } else {
      return x / ((1 + Math.abs(x)) * (1 + Math.abs(x)));
    }
  };

  return SoftSignActivation;
}();

exports.SoftSignActivation = SoftSignActivation;
/**
 * [Sinusoid function.](https://en.wikipedia.org/wiki/Sine_wave)
 *
 * @param x Input values to activation function
 * @param derivative Flag to select derivative function
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new SinusoidActivation();
 */

var SinusoidActivation =
/** @class */
function () {
  function SinusoidActivation() {
    this.type = ActivationType_1.ActivationType.SinusoidActivation;
  }

  SinusoidActivation.prototype.calc = function (x, derivative) {
    if (derivative === void 0) {
      derivative = false;
    }

    if (!derivative) {
      return Math.sin(x);
    } else {
      return Math.cos(x);
    }
  };

  return SinusoidActivation;
}();

exports.SinusoidActivation = SinusoidActivation;
/**
 * [Guassian function.](https://en.wikipedia.org/wiki/Gaussian_function)
 *
 * @param x Input values to activation function
 * @param derivative Flag to select derivative function
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new GaussianActivation();
 */

var GaussianActivation =
/** @class */
function () {
  function GaussianActivation() {
    this.type = ActivationType_1.ActivationType.GaussianActivation;
  }

  GaussianActivation.prototype.calc = function (x, derivative) {
    if (derivative === void 0) {
      derivative = false;
    }

    if (!derivative) {
      return Math.exp(-x * x);
    } else {
      return -2 * x * this.calc(x, false);
    }
  };

  return GaussianActivation;
}();

exports.GaussianActivation = GaussianActivation;
/**
 * [Bent identity function.](https://en.wikipedia.org/wiki/Activation_function#Comparison_of_activation_functions)
 *
 * @param x Input values to activation function
 * @param derivative Flag to select derivative function
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new BentIdentityActivation();
 */

var BentIdentityActivation =
/** @class */
function () {
  function BentIdentityActivation() {
    this.type = ActivationType_1.ActivationType.BentIdentityActivation;
  }

  BentIdentityActivation.prototype.calc = function (x, derivative) {
    if (derivative === void 0) {
      derivative = false;
    }

    if (!derivative) {
      return (Math.sqrt(x * x + 1) - 1) / 2 + x;
    } else {
      return x / (2 * Math.sqrt(x * x + 1)) + 1;
    }
  };

  return BentIdentityActivation;
}();

exports.BentIdentityActivation = BentIdentityActivation;
/**
 * [Bipolar function](https://wagenaartje.github.io/neataptic/docs/methods/activation/), if x > 0 then returns 1, otherwise returns -1
 *
 * @param x Input value to activation function
 * @param derivative Flag to select derivative function
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new BipolarActivation();
 */

var BipolarActivation =
/** @class */
function () {
  function BipolarActivation() {
    this.type = ActivationType_1.ActivationType.BipolarActivation;
  }

  BipolarActivation.prototype.calc = function (x, derivative) {
    if (derivative === void 0) {
      derivative = false;
    }

    if (!derivative) {
      return x > 0 ? 1 : -1;
    } else {
      return 0;
    }
  };

  return BipolarActivation;
}();

exports.BipolarActivation = BipolarActivation;
/**
 * [Bipolar sigmoid function.](https://wagenaartje.github.io/neataptic/docs/methods/activation/)
 *
 * @param  x Input values to activation function
 * @param derivative Flag to select derivative function
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new BipolarSigmoidActivation();
 */

var BipolarSigmoidActivation =
/** @class */
function () {
  function BipolarSigmoidActivation() {
    this.type = ActivationType_1.ActivationType.BipolarSigmoidActivation;
  }

  BipolarSigmoidActivation.prototype.calc = function (x, derivative) {
    if (derivative === void 0) {
      derivative = false;
    }

    if (!derivative) {
      return 2 / (1 + Math.exp(-x)) - 1;
    } else {
      return 2 * Math.exp(-x) / ((1 + Math.exp(-x)) * (1 + Math.exp(-x)));
    }
  };

  return BipolarSigmoidActivation;
}();

exports.BipolarSigmoidActivation = BipolarSigmoidActivation;
/**
 * [Hard tanh function.](https://wagenaartje.github.io/neataptic/docs/methods/activation/)
 *
 * @param x Input values to activation function
 * @param derivative Flag to select derivative function
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new HardTanhActivation();
 */

var HardTanhActivation =
/** @class */
function () {
  function HardTanhActivation() {
    this.type = ActivationType_1.ActivationType.HardTanhActivation;
  }

  HardTanhActivation.prototype.calc = function (x, derivative) {
    if (derivative === void 0) {
      derivative = false;
    }

    if (!derivative) {
      return Math.max(-1, Math.min(1, x));
    } else {
      return Math.abs(x) < 1 ? 1 : 0;
    }
  };

  return HardTanhActivation;
}();

exports.HardTanhActivation = HardTanhActivation;
/**
 * [Absolute function.](https://wagenaartje.github.io/neataptic/docs/methods/activation/)
 *
 * Avoid using this activation function on a node with a selfconnection
 *
 * @param x Input values to activation function
 * @param derivative Flag to select derivative function
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new AbsoluteActivation();
 */

var AbsoluteActivation =
/** @class */
function () {
  function AbsoluteActivation() {
    this.type = ActivationType_1.ActivationType.AbsoluteActivation;
  }

  AbsoluteActivation.prototype.calc = function (x, derivative) {
    if (derivative === void 0) {
      derivative = false;
    }

    if (!derivative) {
      return Math.abs(x);
    } else {
      return x < 0 ? -1 : 1;
    }
  };

  return AbsoluteActivation;
}();

exports.AbsoluteActivation = AbsoluteActivation;
/**
 * [Inverse function.](https://wagenaartje.github.io/neataptic/docs/methods/activation/)
 *
 * @param x Input values to activation function
 * @param derivative Flag to select derivative function
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new InverseActivation();
 */

var InverseActivation =
/** @class */
function () {
  function InverseActivation() {
    this.type = ActivationType_1.ActivationType.InverseActivation;
  }

  InverseActivation.prototype.calc = function (x, derivative) {
    if (derivative === void 0) {
      derivative = false;
    }

    if (!derivative) {
      return 1 - x;
    } else {
      return -1;
    }
  };

  return InverseActivation;
}();

exports.InverseActivation = InverseActivation;
/**
 * [Scaled exponential linear unit.](https://towardsdatascience.com/selu-make-fnns-great-again-snn-8d61526802a9)
 *
 * Exponential linear units try to make the mean activations closer to zero which speeds up learning. It has been shown that ELUs can obtain higher classification accuracy than ReLUs. α is a hyper-parameter here and to be tuned and the constraint is α ≥ 0(zero).
 *
 * @see {@link https://arxiv.org/pdf/1706.02515.pdf|Self-Normalizing Neural Networks}
 *
 * @param x Input value to activation function
 * @param derivative Flag to select derivative function
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new SELUActivation();
 */

var SELUActivation =
/** @class */
function () {
  function SELUActivation() {
    this.type = ActivationType_1.ActivationType.SELUActivation;
  }

  SELUActivation.prototype.calc = function (x, derivative) {
    if (derivative === void 0) {
      derivative = false;
    }

    var alpha = 1.6732632423543772848170429916717; // this is bad

    var scale = 1.0507009873554804934193349852946; // this is bad

    if (!derivative) {
      if (x > 0) {
        return x * scale;
      } else {
        return alpha * Math.exp(x) - alpha * scale;
      }
    } else {
      if (x > 0) {
        return scale;
      } else {
        return alpha * Math.exp(x) * scale;
      }
    }
  };

  return SELUActivation;
}();

exports.SELUActivation = SELUActivation;
var ALL_ACTIVATIONS = [ActivationType_1.ActivationType.LogisticActivation, ActivationType_1.ActivationType.TanhActivation, ActivationType_1.ActivationType.IdentityActivation, ActivationType_1.ActivationType.StepActivation, ActivationType_1.ActivationType.RELUActivation, ActivationType_1.ActivationType.SoftSignActivation, ActivationType_1.ActivationType.SinusoidActivation, ActivationType_1.ActivationType.GaussianActivation, ActivationType_1.ActivationType.BentIdentityActivation, ActivationType_1.ActivationType.BipolarActivation, ActivationType_1.ActivationType.BipolarSigmoidActivation, ActivationType_1.ActivationType.HardTanhActivation, ActivationType_1.ActivationType.AbsoluteActivation, ActivationType_1.ActivationType.InverseActivation, ActivationType_1.ActivationType.SELUActivation];
exports.ALL_ACTIVATIONS = ALL_ACTIVATIONS;
},{"../enums/ActivationType":"../src/enums/ActivationType.js"}],"../src/architecture/Connection.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * A connection instance describes the connection between two nodes. If you're looking for connections between [Groups](Group) please see [Connection Methods](connection)
 *
 * @param from Connection origin node (neuron)
 * @param to Connection destination node (neuron)
 * @param weight=random Weight of the connection
 * @param gateNode Node which gates this connection
 *
 * @prop {Node} from Connection origin node (neuron)
 * @prop {Node} to Connection destination node (neuron)
 * @prop {number} weight=random Weight of the connection
 * @prop {number} gain=1 Used for gating, gets multiplied with weight
 * @prop {Node} gateNode=null The node gating this connection
 * @prop {number} eligibility=0
 * @prop {Node[]} xTraceNodes
 * @prop {number[]} xTraceValues
 * @prop {number[]} delta_weights
 * @prop {number} deltaWeightsPrevious=0 Tracks [momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html)
 * @prop {number} deltaWeightsTotal=0 Tracks [momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html) - _for [batch training](https://www.quora.com/What-is-the-difference-between-batch-online-and-mini-batch-training-in-neural-networks-Which-one-should-I-use-for-a-small-to-medium-sized-dataset-for-prediction-purposes)_
 *
 * @see {@link connection|Connection Methods}
 * @see {@link Node|Node}
 */

var Connection =
/** @class */
function () {
  function Connection(from, to, weight, gateNode) {
    this.from = from;
    this.to = to;
    this.weight = weight !== null && weight !== void 0 ? weight : 0;
    this.gain = 1;
    this.eligibility = 0;
    this.deltaWeightsPrevious = 0;
    this.deltaWeightsTotal = 0;
    this.xTraceNodes = [];
    this.xTraceValues = [];

    if (gateNode) {
      this.gateNode = gateNode;
      gateNode.addGate(this);
    } else {
      this.gateNode = null;
    }
  }
  /**
   * Returns an innovation ID
   *
   * @see {@link https://en.wikipedia.org/wiki/Pairing_function (Cantor pairing function)|Pairing function (Cantor pairing function)}
   *
   * @param a - A [natural number](https://en.wikipedia.org/wiki/Natural_number), which is an integer greater than or equal to zero
   * @param b - A [natural number](https://en.wikipedia.org/wiki/Natural_number), which is an integer greater than or equal to zero
   *
   * @return An Integer that uniquely represents a pair of Integers
   */


  Connection.innovationID = function (a, b) {
    return 1 / 2 * (a + b) * (a + b + 1) + b;
  };
  /**
   * Returns the connection as a JSON
   *
   * @return Connection as a JSON
   */


  Connection.prototype.toJSON = function () {
    return {
      fromIndex: this.from.index,
      toIndex: this.to.index,
      gateNodeIndex: this.gateNode === null ? null : this.gateNode.index,
      weight: this.weight
    };
  };

  return Connection;
}();

exports.Connection = Connection;
},{}],"../src/architecture/Node.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Mutation_1 = require("../methods/Mutation");

var Activation_1 = require("../methods/Activation");

var Connection_1 = require("./Connection");

var Utils_1 = require("../methods/Utils");

var NodeType_1 = require("../enums/NodeType");

var ActivationType_1 = require("../enums/ActivationType");
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
 * @param type defines the type of node
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
 * @prop {Array<Connection>} incoming Incoming connections to this node
 * @prop {Array<Connection>} outgoing Outgoing connections from this node
 * @prop {Array<Connection>} gated Connections this node gates
 * @prop {Connection} connections_self A self-connection
 * @prop {number} error.responsibility
 * @prop {number} error.projected
 * @prop {number} error.gated
 *
 * @example
 * let { Node } = require("@liquid-carrot/carrot");
 *
 * let node = new Node();
 */


var Node =
/** @class */
function () {
  function Node(type) {
    if (type === void 0) {
      type = NodeType_1.NodeType.HIDDEN;
    }

    this.type = type;
    this.bias = Utils_1.randDouble(-1, 1);
    this.squash = new Activation_1.LogisticActivation();
    this.activation = 0;
    this.derivative = 1;
    this.state = 0;
    this.old = 0;
    this.mask = 1;
    this.deltaBiasPrevious = 0;
    this.deltaBiasTotal = 0;
    this.incoming = [];
    this.outgoing = [];
    this.gated = [];
    this.selfConnection = new Connection_1.Connection(this, this, 0);
    this.errorResponsibility = 0;
    this.errorProjected = 0;
    this.errorGated = 0;
    this.index = NaN;
  }
  /**
   * Convert a json object to a node
   *
   * @param json A node represented as a JSON object
   *
   * @returns itself
   *
   * @example <caption>From Node.toJSON()</caption>
   * const { Node } = require("@liquid-carrot/carrot");
   *
   * let otherNode = new Node();
   * let json = otherNode.toJSON();
   * let node = Node.fromJSON(json);
   *
   * console.log(node);
   */


  Node.prototype.fromJSON = function (json) {
    var _a, _b, _c, _d;

    this.bias = (_a = json.bias) !== null && _a !== void 0 ? _a : Utils_1.randDouble(-1, 1);
    this.type = json.type;
    this.squash = Activation_1.Activation.getActivation((_b = json.squash) !== null && _b !== void 0 ? _b : ActivationType_1.ActivationType.LogisticActivation);
    this.mask = (_c = json.mask) !== null && _c !== void 0 ? _c : 1;
    this.index = (_d = json.index) !== null && _d !== void 0 ? _d : NaN;
    return this;
  };
  /**
   * Clears this node's state information - _i.e. resets node and its connections to "factory settings"_
   *
   * `node.clear()` is useful for predicting time series.
   *
   * @example
   * const { Node } = require("@liquid-carrot/carrot");
   *
   * let node = new Node();
   *
   * node.activate([1, 0]);
   * node.propagate([1]);
   *
   * console.log(node); // Node has state information (e.g. `node.derivative`)
   *
   * node.clear(); // Factory resets node
   *
   * console.log(node); // Node has no state information
   */


  Node.prototype.clear = function () {
    for (var _i = 0, _a = this.incoming; _i < _a.length; _i++) {
      var connection = _a[_i];
      connection.eligibility = 0;
      connection.xTraceNodes = [];
      connection.xTraceValues = [];
    }

    for (var _b = 0, _c = this.gated; _b < _c.length; _b++) {
      var connection = _c[_b];
      connection.gain = 0;
    }

    this.errorResponsibility = this.errorProjected = this.errorGated = 0;
    this.old = this.state = this.activation = 0;
  };
  /**
   * Mutates the node's bias
   *
   * @param method The method is needed for the min and max value of the node's bias otherwise a range of [-1,1] is chosen
   *
   * @example
   * const { Node } = require("@liquid-carrot/carrot");
   *
   * let node = new Node();
   *
   * console.log(node);
   *
   * node.mutateBias(); // Changes node's bias
   */


  Node.prototype.mutateBias = function (method) {
    if (method === void 0) {
      method = new Mutation_1.ModBiasMutation();
    }

    this.bias += Utils_1.randDouble(method.min, method.max); // add a random value in range [min,max)
  };
  /**
   * Mutates the node's activation function
   *
   * @example
   * const { Node } = require("@liquid-carrot/carrot");
   *
   * let node = new Node();
   *
   * console.log(node);
   *
   * node.mutateBias(); // Changes node's activation function
   */


  Node.prototype.mutateActivation = function (allowedActivations) {
    var _this = this;

    if (allowedActivations === void 0) {
      allowedActivations = Activation_1.ALL_ACTIVATIONS;
    } // pick a random activation from allowed activations except the current activation


    var possible = allowedActivations.filter(function (activation) {
      return activation !== _this.squash.type;
    });

    if (possible.length > 0) {
      var newActivationType = Utils_1.pickRandom(possible);
      this.squash = Activation_1.Activation.getActivation(newActivationType);
    }
  };
  /**
   * Checks if the given node(s) are have outgoing connections to this node
   *
   * @param node Checks if `node(s)` have outgoing connections into this node
   *
   * @return Returns true, if every node(s) has an outgoing connection into this node
   *
   * @example <caption>Check one <code>node</code></caption>
   * const { Node } = require("@liquid-carrot/carrot");
   *
   * let otherNode = new Node();
   * let node = new Node();
   * otherNode.connect(node);
   *
   * console.log(node.isProjectedBy(otherNode)); // true
   *
   * @example <caption>Check many <code>nodes</code></caption>
   * const { Node } = require("@liquid-carrot/carrot");
   *
   * let otherNodes = Array.from({ length: 5 }, () => new Node());
   * let node = new Node();
   *
   * otherNodes.forEach(otherNode => otherNode.connect(node));
   *
   * console.log(node.isProjectedBy(otherNodes)); // true
   */


  Node.prototype.isProjectedBy = function (node) {
    if (node === this) {
      // self connection
      return this.selfConnection.weight !== 0; // is projected, if weight of self connection is unequal 0
    } else {
      return this.incoming.map(function (conn) {
        return conn.from;
      }).includes(node); // check every incoming connection for node
    }
  };
  /**
   * Checks if this node has an outgoing connection(s) into the given node(s)
   *
   * @param node Checks if this node has outgoing connection(s) into `node(s)`
   *
   * @returns Returns true, if this node has an outgoing connection into every node(s)
   *
   * @example <caption>Check one <code>node</code></caption>
   * const { Node } = require("@liquid-carrot/carrot");
   *
   * let otherNode = new Node();
   * let node = new Node();
   * node.connect(otherNode);
   *
   * console.log(node.isProjectingTo(otherNode)); // true
   *
   * @example <caption>Check many <code>nodes</code></caption>
   * const { Node } = require("@liquid-carrot/carrot");
   *
   * let otherNodes = Array.from({ length: 5 }, () => new Node());
   * let node = new Node();
   *
   * otherNodes.forEach(otherNode => node.connect(otherNode));
   *
   * console.log(node.isProjectingTo(otherNodes)); // true
   */


  Node.prototype.isProjectingTo = function (node) {
    if (node === this) {
      // self connection
      return this.selfConnection.weight !== 0; // is projected, if weight of self connection is unequal 0
    } else {
      return this.outgoing.map(function (conn) {
        return conn.to;
      }).includes(node); // check every outgoing connection for node
    }
  };
  /**
   * This node gates (influences) the given connection
   *
   * @param connection Connection to be gated (influenced) by a neuron
   *
   * @example <caption>Gate one <code>connection</code></caption>
   * const { Node } = require("@liquid-carrot/carrot");
   *
   * let input = new Node();
   * let output = new Node();
   * let connection = input.connect(output);
   *
   * let node = new Node();
   *
   * console.log(connection.gateNode === node); // false
   *
   * node.gate(connection); // Node now gates (manipulates) `connection`
   *
   * console.log(connection.gateNode === node); // true
   */


  Node.prototype.addGate = function (connection) {
    this.gated.push(connection);
    connection.gateNode = this;
  };
  /**
   * Stops this node from gating (manipulating) the given connection(s)
   *
   * @param  connection Connections to ungate - _i.e. remove this node from_
   *
   * @example <caption>Ungate one <code>connection</code></caption>
   * const { Node } = require("@liquid-carrot/carrot");
   *
   * let input = new Node();
   * let output = new Node();
   * let connection = input.connect(output);
   *
   * let node = new Node();
   *
   * console.log(connection.gateNode === node); // false
   *
   * node.addGate(connection); // Node now gates (manipulates) `connection`
   *
   * console.log(connection.gateNode === node); // true
   *
   * node.removeGate(connection); // Node is removed from `connection`
   *
   * console.log(connection.gateNode === node); // false
   */


  Node.prototype.removeGate = function (connection) {
    Utils_1.removeFromArray(this.gated, connection);
    connection.gateNode = null;
    connection.gain = 1;
  };
  /**
   * Connects this node to the given node(s)
   *
   * @param target Node(s) to project connection(s) to
   * @param weight Initial connection(s) [weight](https://en.wikipedia.org/wiki/Synaptic_weight)
   * @param twoSided If `true` connect nodes to each other
   *
   * @example <caption>Connecting node (neuron) to another node (neuron)</caption>
   * const { Node } = require("@liquid-carrot/carrot");
   *
   * let node = new Node();
   * let otherNode = new Node();
   *
   * let connection = node.connect(otherNode); // Both nodes now share a connection
   *
   * console.log(connection); // Connection { from: [Object object], to: [Object object], ...}
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


  Node.prototype.connect = function (target, weight, twoSided) {
    if (weight === void 0) {
      weight = 1;
    }

    if (twoSided === void 0) {
      twoSided = false;
    }

    if (target === this) {
      // self connection
      this.selfConnection.weight = weight;
      return this.selfConnection;
    } else if (this.isProjectingTo(target)) {
      throw new ReferenceError(); // already connected
    } else {
      var connection = new Connection_1.Connection(this, target, weight); // create new connection
      // add it to the arrays

      this.outgoing.push(connection);
      target.incoming.push(connection);

      if (twoSided) {
        target.connect(this); // connect in the other direction
      }

      return connection;
    }
  };
  /**
   * Disconnects this node from the given node(s)
   *
   * @param node Node(s) to remove connection(s) to
   * @param twoSided=false If `true` disconnects nodes from each other (i.e. both sides)
   *
   * @example <caption>Disconnect from one <code>node</code></caption>
   * const { Node } = require("@liquid-carrot/carrot");
   *
   * let node = new Node();
   * let other = new Node();
   *
   * node.connect(other); // `node` now connected to `other`
   *
   * console.log(node.incoming.length); // 0
   * console.log(node.outgoing.length); // 1
   *
   * node.disconnect(other); // `node` is now disconnected from `other`
   *
   * console.log(node.incoming.length); // 0
   * console.log(node.outgoing.length); // 0
   *
   * @example <caption>Connect to one <code>node</code> - <em>two-sided</em></caption>
   * const { Node } = require("@liquid-carrot/carrot");
   *
   * let node = new Node();
   * let other = new Node();
   *
   * // `node` & `other` are now connected to each other
   * node.connect(other, true);
   *
   * console.log(node.incoming.length); // 1
   * console.log(node.outgoing.length); // 1
   *
   * // `node` & `other` are now disconnected from each other
   * node.disconnect(other, true);
   *
   * console.log(node.incoming.length); // 0
   * console.log(node.outgoing.length); // 0
   */


  Node.prototype.disconnect = function (node, twoSided) {
    if (twoSided === void 0) {
      twoSided = false;
    }

    if (node === this) {
      // self connection
      this.selfConnection.weight = 0; // set weight to 0

      return this.selfConnection;
    }

    var connections = this.outgoing.filter(function (conn) {
      return conn.to === node;
    });

    if (connections.length === 0) {
      throw new Error("No Connection found");
    }

    var connection = connections[0]; // remove it from the arrays

    Utils_1.removeFromArray(this.outgoing, connection);
    Utils_1.removeFromArray(connection.to.incoming, connection);

    if (connection.gateNode !== undefined && connection.gateNode != null) {
      connection.gateNode.removeGate(connection); // if connection is gated -> remove gate
    }

    if (twoSided) {
      node.disconnect(this); // disconnect the other direction
    }

    return connection;
  };
  /**
   * Backpropagate the error (a.k.a. learn).
   *
   * After an activation, you can teach the node what should have been the correct output (a.k.a. train). This is done by backpropagating. [Momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html) adds a fraction of the previous weight update to the current one. When the gradient keeps pointing in the same direction, this will increase the size of the steps taken towards the minimum.
   *
   * If you combine a high learning rate with a lot of momentum, you will rush past the minimum (of the error function) with huge steps. It is therefore often necessary to reduce the global learning rate µ when using a lot of momentum (m close to 1).
   *
   * @param target The target value (i.e. "the value the network SHOULD have given")
   * @param options More options for propagation
   * @param [options.rate=0.3] [Learning rate](https://towardsdatascience.com/understanding-learning-rates-and-how-it-improves-performance-in-deep-learning-d0d4059c1c10)
   * @param [options.momentum=0] [Momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html) adds a fraction of the previous weight update to the current one.
   * @param [options.update=true] When set to false weights won't update, but when set to true after being false the last propagation will include the deltaweights of the first "update:false" propagations too.
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


  Node.prototype.propagate = function (target, options) {
    if (options === void 0) {
      options = {};
    }

    options.momentum = Utils_1.getOrDefault(options.momentum, 0);
    options.rate = Utils_1.getOrDefault(options.rate, 0.3);
    options.update = Utils_1.getOrDefault(options.update, true);

    if (target !== undefined && Number.isFinite(target)) {
      this.errorResponsibility = this.errorProjected = target - this.activation;
    } else {
      this.errorProjected = 0;

      for (var _i = 0, _a = this.outgoing; _i < _a.length; _i++) {
        var connection = _a[_i];
        this.errorProjected += connection.to.errorResponsibility * connection.weight * connection.gain;
      }

      this.errorProjected *= this.derivative;
      this.errorGated = 0;

      for (var _b = 0, _c = this.gated; _b < _c.length; _b++) {
        // for all connections gated by this node
        var connection = _c[_b];
        var influence = void 0;

        if (connection.to.selfConnection.gateNode === this) {
          // self connection is gated with this node
          influence = connection.to.old + connection.weight * connection.from.activation;
        } else {
          influence = connection.weight * connection.from.activation;
        }

        this.errorGated += connection.to.errorResponsibility * influence;
      }

      this.errorGated *= this.derivative;
      this.errorResponsibility = this.errorProjected + this.errorGated;
    }

    for (var _d = 0, _e = this.incoming; _d < _e.length; _d++) {
      var connection = _e[_d]; // calculate gradient

      var gradient = this.errorProjected * connection.eligibility;

      for (var j = 0; j < connection.xTraceNodes.length; j++) {
        var node = connection.xTraceNodes[j];
        gradient += node.errorResponsibility * connection.xTraceValues[j];
      }

      connection.deltaWeightsTotal += options.rate * gradient * this.mask;

      if (options.update) {
        connection.deltaWeightsTotal += options.momentum * connection.deltaWeightsPrevious;
        connection.weight += connection.deltaWeightsTotal;
        connection.deltaWeightsPrevious = connection.deltaWeightsTotal;
        connection.deltaWeightsTotal = 0;
      }
    }

    this.deltaBiasTotal += options.rate * this.errorResponsibility;

    if (options.update) {
      this.deltaBiasTotal += options.momentum * this.deltaBiasPrevious;
      this.bias += this.deltaBiasTotal;
      this.deltaBiasPrevious = this.deltaBiasTotal;
      this.deltaBiasTotal = 0;
    }
  };
  /**
   * Actives the node.
   *
   * When a neuron activates, it computes its state from all its input connections and 'squashes' it using its activation function, and returns the output (activation).
   *
   * You can also provide the activation (a float between 0 and 1) as a parameter, which is useful for neurons in the input layer.
   *
   * @param [input] Environment signal (i.e. optional numerical value passed to the network as input)  - _should only be passed in input neurons_
   * @param [trace] Controls whether traces are created when activation happens (a trace is meta information left behind for different uses, e.g. backpropagation).
   *
   * @returns A neuron's ['Squashed'](https://medium.com/the-theory-of-everything/understanding-activation-functions-in-neural-networks-9491262884e0) output value
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


  Node.prototype.activate = function (input, trace) {
    var _this = this;

    if (trace === void 0) {
      trace = true;
    }

    if (input !== undefined) {
      return this.activation = input;
    } else if (this.isInputNode()) {
      throw new ReferenceError("There is no input given to an input node!");
    }

    if (trace) {
      this.old = this.state;
      this.state = this.selfConnection.gain * this.selfConnection.weight * this.state + this.bias;
      this.incoming.forEach(function (conn) {
        _this.state += conn.from.activation * conn.weight * conn.gain;
      });
      this.activation = this.squash.calc(this.state, false) * this.mask;
      this.derivative = this.squash.calc(this.state, true); // store traces

      var nodes_1 = [];
      var influences_1 = []; // Adjust 'gain' (to gated connections) & Build traces

      this.gated.forEach(function (connection) {
        connection.gain = _this.activation; // Build traces

        var index = nodes_1.indexOf(connection.to);

        if (index > -1) {
          // Node & influence exist
          influences_1[index] += connection.weight * connection.from.activation;
        } else {
          // Add node & corresponding influence
          nodes_1.push(connection.to);

          if (connection.to.selfConnection.gateNode === _this) {
            influences_1.push(connection.weight * connection.from.activation + connection.to.old);
          } else {
            influences_1.push(connection.weight * connection.from.activation);
          }
        }
      }); // Forwarding 'xTrace' (to incoming connections)

      for (var _i = 0, _a = this.incoming; _i < _a.length; _i++) {
        var connection = _a[_i];
        connection.eligibility = this.selfConnection.gain * this.selfConnection.weight * connection.eligibility + connection.from.activation * connection.gain;

        for (var i = 0; i < nodes_1.length; i++) {
          var node = nodes_1[i];
          var influence = influences_1[i];
          var index = connection.xTraceNodes.indexOf(node);

          if (index > -1) {
            connection.xTraceValues[index] = node.selfConnection.gain * node.selfConnection.weight * connection.xTraceValues[index] + this.derivative * connection.eligibility * influence;
          } else {
            connection.xTraceNodes.push(node);
            connection.xTraceValues.push(this.derivative * connection.eligibility * influence);
          }
        }
      }

      return this.activation;
    } else {
      if (this.isInputNode()) return this.activation = 0;
      this.state = this.selfConnection.gain * this.selfConnection.weight * this.state + this.bias;

      for (var _b = 0, _c = this.incoming; _b < _c.length; _b++) {
        var connection = _c[_b];
        this.state += connection.from.activation * connection.weight * connection.gain;
      }

      this.activation = this.squash.calc(this.state, false); // Adjust gain

      for (var _d = 0, _e = this.gated; _d < _e.length; _d++) {
        var connection = _e[_d];
        connection.gain = this.activation;
      }

      return this.activation;
    }
  };
  /**
   * Converts the node to a json object that can later be converted back
   *
   * @returns A node representing json object
   *
   * @example
   * const { Node } = require("@liquid-carrot/carrot");
   *
   * let node = new Node();
   *
   * console.log(node.toJSON());
   */


  Node.prototype.toJSON = function () {
    return {
      bias: this.bias,
      type: this.type,
      squash: this.squash.type,
      mask: this.mask,
      index: this.index
    };
  };

  Node.prototype.isInputNode = function () {
    return this.type === NodeType_1.NodeType.INPUT;
  };

  Node.prototype.isHiddenNode = function () {
    return this.type === NodeType_1.NodeType.HIDDEN;
  };

  Node.prototype.isOutputNode = function () {
    return this.type === NodeType_1.NodeType.OUTPUT;
  };

  Node.prototype.setBias = function (bias) {
    this.bias = bias;
    return this;
  };

  Node.prototype.setSquash = function (activationType) {
    this.squash = Activation_1.Activation.getActivation(activationType);
    return this;
  };

  return Node;
}();

exports.Node = Node;
},{"../methods/Mutation":"../src/methods/Mutation.js","../methods/Activation":"../src/methods/Activation.js","./Connection":"../src/architecture/Connection.js","../methods/Utils":"../src/methods/Utils.js","../enums/NodeType":"../src/enums/NodeType.js","../enums/ActivationType":"../src/enums/ActivationType.js"}],"../src/architecture/Layers/CoreLayers/DenseLayer.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Layer_1 = require("../Layer");

var Node_1 = require("../../Node");

var ActivationType_1 = require("../../../enums/ActivationType");

var NodeType_1 = require("../../../enums/NodeType");

var ConnectionType_1 = require("../../../enums/ConnectionType");

var DenseLayer =
/** @class */
function (_super) {
  __extends(DenseLayer, _super);

  function DenseLayer(outputSize, options) {
    var _a;

    if (options === void 0) {
      options = {};
    }

    var _b;

    var _this = _super.call(this, outputSize) || this;

    var activation = (_b = options.activationType) !== null && _b !== void 0 ? _b : ActivationType_1.ActivationType.LogisticActivation;

    for (var i = 0; i < outputSize; i++) {
      _this.inputNodes.add(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setSquash(activation));
    }

    _this.outputNodes = _this.inputNodes;

    (_a = _this.nodes).push.apply(_a, Array.from(_this.inputNodes));

    return _this;
  }

  DenseLayer.prototype.connectionTypeisAllowed = function (type) {
    return true;
  };

  DenseLayer.prototype.getDefaultIncomingConnectionType = function () {
    return ConnectionType_1.ConnectionType.ALL_TO_ALL;
  };

  return DenseLayer;
}(Layer_1.Layer);

exports.DenseLayer = DenseLayer;
},{"../Layer":"../src/architecture/Layers/Layer.js","../../Node":"../src/architecture/Node.js","../../../enums/ActivationType":"../src/enums/ActivationType.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../../enums/ConnectionType":"../src/enums/ConnectionType.js"}],"../src/architecture/Nodes/ConstantNode.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Node_1 = require("../Node");

var NodeType_1 = require("../../enums/NodeType");

var Activation_1 = require("../../methods/Activation");

var ActivationType_1 = require("../../enums/ActivationType");

var ConstantNode =
/** @class */
function (_super) {
  __extends(ConstantNode, _super);

  function ConstantNode() {
    var _this = _super.call(this, NodeType_1.NodeType.HIDDEN) || this;

    _this.bias = 1;
    return _this;
  }

  ConstantNode.prototype.fromJSON = function (json) {
    var _a, _b;

    this.index = (_a = json.index) !== null && _a !== void 0 ? _a : -1;
    this.squash = Activation_1.Activation.getActivation((_b = json.squash) !== null && _b !== void 0 ? _b : ActivationType_1.ActivationType.IdentityActivation);
    return this;
  };

  ConstantNode.prototype.toJSON = function () {
    return {
      index: this.index,
      squash: this.squash.type
    };
  };

  ConstantNode.prototype.mutateBias = function () {
    throw new ReferenceError("Cannot mutate a pool node!");
  };

  ConstantNode.prototype.mutateActivation = function () {
    throw new ReferenceError("Cannot mutate a pool node!");
  };

  ConstantNode.prototype.addGate = function () {
    throw new ReferenceError("A pool node can't gate a connection!");
  };

  ConstantNode.prototype.removeGate = function () {
    throw new ReferenceError("A pool node can't gate a connection!");
  };

  ConstantNode.prototype.setBias = function () {
    throw new ReferenceError("Cannot set the bias of a pool node!");
  };

  return ConstantNode;
}(Node_1.Node);

exports.ConstantNode = ConstantNode;
},{"../Node":"../src/architecture/Node.js","../../enums/NodeType":"../src/enums/NodeType.js","../../methods/Activation":"../src/methods/Activation.js","../../enums/ActivationType":"../src/enums/ActivationType.js"}],"../src/architecture/Nodes/DropoutNode.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ConstantNode_1 = require("./ConstantNode");

var Utils_1 = require("../../methods/Utils");

var DropoutNode =
/** @class */
function (_super) {
  __extends(DropoutNode, _super);

  function DropoutNode(probability) {
    var _this = _super.call(this) || this;

    _this.probability = probability;
    _this.droppedOut = false;
    return _this;
  }

  DropoutNode.prototype.activate = function () {
    var _this = this;

    if (this.incoming.length !== 1) {
      throw new RangeError("Dropout node should have exactly one incoming connection!");
    }

    var incomingConnection = this.incoming[0]; // https://stats.stackexchange.com/a/219240

    if (Utils_1.randDouble(0, 1) < this.probability) {
      // DROPOUT
      this.droppedOut = true;
      this.state = 0;
    } else {
      this.droppedOut = false;
      this.state = incomingConnection.from.activation * incomingConnection.weight * incomingConnection.gain;
      this.state *= 1 / (1 - this.probability);
    }

    this.activation = this.squash.calc(this.state, false) * this.mask; // Adjust gain

    this.gated.forEach(function (conn) {
      return conn.gain = _this.activation;
    });
    return this.activation;
  };

  DropoutNode.prototype.propagate = function (target, options) {
    if (options === void 0) {
      options = {};
    }

    options.momentum = Utils_1.getOrDefault(options.momentum, 0);
    options.rate = Utils_1.getOrDefault(options.rate, 0.3);
    options.update = Utils_1.getOrDefault(options.update, true);
    var connectionsStates = this.outgoing.map(function (conn) {
      return conn.to.errorResponsibility * conn.weight * conn.gain;
    });
    this.errorResponsibility = this.errorProjected = Utils_1.sum(connectionsStates) / (1 - this.probability);

    if (this.incoming.length !== 1) {
      throw new RangeError("Dropout node should have exactly one incoming connection!");
    }

    var incomingConnection = this.incoming[0]; // calculate gradient

    if (!this.droppedOut) {
      var gradient = this.errorProjected * incomingConnection.eligibility;

      for (var i = 0; i < incomingConnection.xTraceNodes.length; i++) {
        gradient += incomingConnection.xTraceNodes[i].errorResponsibility * incomingConnection.xTraceValues[i];
      }

      if (options.update) {
        incomingConnection.deltaWeightsTotal += options.rate * gradient * this.mask + options.momentum * incomingConnection.deltaWeightsPrevious;
        incomingConnection.weight += incomingConnection.deltaWeightsTotal;
        incomingConnection.deltaWeightsPrevious = incomingConnection.deltaWeightsTotal;
        incomingConnection.deltaWeightsTotal = 0;
      }
    }
  };

  DropoutNode.prototype.fromJSON = function (json) {
    _super.prototype.fromJSON.call(this, json);

    this.probability = json.probability;
    return this;
  };

  DropoutNode.prototype.toJSON = function () {
    return Object.assign(_super.prototype.toJSON.call(this), {
      probability: this.probability
    });
  };

  return DropoutNode;
}(ConstantNode_1.ConstantNode);

exports.DropoutNode = DropoutNode;
},{"./ConstantNode":"../src/architecture/Nodes/ConstantNode.js","../../methods/Utils":"../src/methods/Utils.js"}],"../src/architecture/Layers/CoreLayers/DropoutLayer.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Layer_1 = require("../Layer");

var ActivationType_1 = require("../../../enums/ActivationType");

var DropoutNode_1 = require("../../Nodes/DropoutNode");

var ConnectionType_1 = require("../../../enums/ConnectionType");

var DropoutLayer =
/** @class */
function (_super) {
  __extends(DropoutLayer, _super);

  function DropoutLayer(outputSize, options) {
    var _a;

    if (options === void 0) {
      options = {};
    }

    var _b, _c;

    var _this = _super.call(this, outputSize) || this;

    var activation = (_b = options.activationType) !== null && _b !== void 0 ? _b : ActivationType_1.ActivationType.IdentityActivation;
    var probability = (_c = options.probability) !== null && _c !== void 0 ? _c : 0.1;

    for (var i = 0; i < outputSize; i++) {
      _this.inputNodes.add(new DropoutNode_1.DropoutNode(probability).setSquash(activation));
    }

    _this.outputNodes = _this.inputNodes;

    (_a = _this.nodes).push.apply(_a, Array.from(_this.inputNodes));

    return _this;
  }

  DropoutLayer.prototype.getDefaultIncomingConnectionType = function () {
    return ConnectionType_1.ConnectionType.ONE_TO_ONE;
  };

  DropoutLayer.prototype.connectionTypeisAllowed = function (type) {
    return type === ConnectionType_1.ConnectionType.ONE_TO_ONE;
  };

  return DropoutLayer;
}(Layer_1.Layer);

exports.DropoutLayer = DropoutLayer;
},{"../Layer":"../src/architecture/Layers/Layer.js","../../../enums/ActivationType":"../src/enums/ActivationType.js","../../Nodes/DropoutNode":"../src/architecture/Nodes/DropoutNode.js","../../../enums/ConnectionType":"../src/enums/ConnectionType.js"}],"../src/architecture/Nodes/NoiseNode.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var NodeType_1 = require("../../enums/NodeType");

var Utils_1 = require("../../methods/Utils");

var ConstantNode_1 = require("./ConstantNode");

var NoiseNode =
/** @class */
function (_super) {
  __extends(NoiseNode, _super);

  function NoiseNode(options) {
    if (options === void 0) {
      options = {};
    }

    var _this = _super.call(this) || this;

    _this.noiseType = Utils_1.getOrDefault(options.noiseType, NodeType_1.NoiseNodeType.GAUSSIAN_NOISE);
    _this.options = options;
    return _this;
  }

  NoiseNode.prototype.activate = function () {
    var _a, _b, _c, _d;

    this.old = this.state;
    var incomingStates = this.incoming.map(function (conn) {
      return conn.from.activation * conn.weight * conn.gain;
    });

    switch (this.noiseType) {}

    switch (this.noiseType) {
      case NodeType_1.NoiseNodeType.GAUSSIAN_NOISE:
        this.state = Utils_1.avg(incomingStates) + Utils_1.generateGaussian((_b = (_a = this.options.gaussian) === null || _a === void 0 ? void 0 : _a.mean) !== null && _b !== void 0 ? _b : 0, (_d = (_c = this.options.gaussian) === null || _c === void 0 ? void 0 : _c.deviation) !== null && _d !== void 0 ? _d : 2);
        break;

      default:
        throw new ReferenceError("Cannot activate this noise type!");
    }

    this.activation = this.squash.calc(this.state, false) * this.mask;
    this.derivative = this.squash.calc(this.state, true);
    return this.activation;
  };

  NoiseNode.prototype.propagate = function (target, options) {
    if (options === void 0) {
      options = {};
    }

    options.momentum = Utils_1.getOrDefault(options.momentum, 0);
    options.rate = Utils_1.getOrDefault(options.rate, 0.3);
    options.update = Utils_1.getOrDefault(options.update, true);
    var connectionsStates = this.outgoing.map(function (conn) {
      return conn.to.errorResponsibility * conn.weight * conn.gain;
    });
    this.errorResponsibility = this.errorProjected = Utils_1.sum(connectionsStates) * this.derivative;

    for (var _i = 0, _a = this.incoming; _i < _a.length; _i++) {
      var connection = _a[_i]; // calculate gradient

      var gradient = this.errorProjected * connection.eligibility;

      for (var i = 0; i < connection.xTraceNodes.length; i++) {
        gradient += connection.xTraceNodes[i].errorResponsibility * connection.xTraceValues[i];
      }

      connection.deltaWeightsTotal += options.rate * gradient * this.mask;

      if (options.update) {
        connection.deltaWeightsTotal += options.momentum * connection.deltaWeightsPrevious;
        connection.weight += connection.deltaWeightsTotal;
        connection.deltaWeightsPrevious = connection.deltaWeightsTotal;
        connection.deltaWeightsTotal = 0;
      }
    }
  };

  return NoiseNode;
}(ConstantNode_1.ConstantNode);

exports.NoiseNode = NoiseNode;
},{"../../enums/NodeType":"../src/enums/NodeType.js","../../methods/Utils":"../src/methods/Utils.js","./ConstantNode":"../src/architecture/Nodes/ConstantNode.js"}],"../src/architecture/Layers/NoiseLayers/NoiseLayer.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Layer_1 = require("../Layer");

var ActivationType_1 = require("../../../enums/ActivationType");

var ConnectionType_1 = require("../../../enums/ConnectionType");

var NoiseNode_1 = require("../../Nodes/NoiseNode");

var NodeType_1 = require("../../../enums/NodeType");

var NoiseLayer =
/** @class */
function (_super) {
  __extends(NoiseLayer, _super);

  function NoiseLayer(outputSize, options) {
    var _a;

    if (options === void 0) {
      options = {};
    }

    var _b;

    var _this = _super.call(this, outputSize) || this;

    var activation = (_b = options.activationType) !== null && _b !== void 0 ? _b : ActivationType_1.ActivationType.IdentityActivation;

    for (var i = 0; i < outputSize; i++) {
      _this.inputNodes.add(new NoiseNode_1.NoiseNode({
        noiseType: NodeType_1.NoiseNodeType.GAUSSIAN_NOISE,
        gaussian: options
      }).setSquash(activation));
    }

    _this.outputNodes = _this.inputNodes;

    (_a = _this.nodes).push.apply(_a, Array.from(_this.inputNodes));

    return _this;
  }

  NoiseLayer.prototype.getDefaultIncomingConnectionType = function () {
    return ConnectionType_1.ConnectionType.ONE_TO_ONE;
  };

  NoiseLayer.prototype.connectionTypeisAllowed = function (type) {
    return type === ConnectionType_1.ConnectionType.ONE_TO_ONE;
  };

  return NoiseLayer;
}(Layer_1.Layer);

exports.NoiseLayer = NoiseLayer;
},{"../Layer":"../src/architecture/Layers/Layer.js","../../../enums/ActivationType":"../src/enums/ActivationType.js","../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../Nodes/NoiseNode":"../src/architecture/Nodes/NoiseNode.js","../../../enums/NodeType":"../src/enums/NodeType.js"}],"../src/architecture/Layers/CoreLayers/OutputLayer.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Layer_1 = require("../Layer");

var Node_1 = require("../../Node");

var NodeType_1 = require("../../../enums/NodeType");

var ActivationType_1 = require("../../../enums/ActivationType");

var ConnectionType_1 = require("../../../enums/ConnectionType");

var OutputLayer =
/** @class */
function (_super) {
  __extends(OutputLayer, _super);

  function OutputLayer(outputSize, options) {
    var _a;

    if (options === void 0) {
      options = {};
    }

    var _b;

    var _this = _super.call(this, outputSize) || this;

    var activation = (_b = options.activationType) !== null && _b !== void 0 ? _b : ActivationType_1.ActivationType.IdentityActivation;

    for (var i = 0; i < outputSize; i++) {
      _this.inputNodes.add(new Node_1.Node(NodeType_1.NodeType.OUTPUT).setSquash(activation));
    }

    (_a = _this.nodes).push.apply(_a, Array.from(_this.inputNodes));

    return _this;
  }

  OutputLayer.prototype.connect = function () {
    throw new ReferenceError("Could not connect an OutputLayer!");
  };

  OutputLayer.prototype.connectionTypeisAllowed = function (type) {
    return true;
  };

  OutputLayer.prototype.getDefaultIncomingConnectionType = function () {
    return ConnectionType_1.ConnectionType.ALL_TO_ALL;
  };

  return OutputLayer;
}(Layer_1.Layer);

exports.OutputLayer = OutputLayer;
},{"../Layer":"../src/architecture/Layers/Layer.js","../../Node":"../src/architecture/Node.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../../enums/ActivationType":"../src/enums/ActivationType.js","../../../enums/ConnectionType":"../src/enums/ConnectionType.js"}],"../src/architecture/Layers/CoreLayers/InputLayer.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Layer_1 = require("../Layer");

var Node_1 = require("../../Node");

var NodeType_1 = require("../../../enums/NodeType");

var ConnectionType_1 = require("../../../enums/ConnectionType");

var NoiseLayer_1 = require("../NoiseLayers/NoiseLayer");

var InputLayer =
/** @class */
function (_super) {
  __extends(InputLayer, _super);

  function InputLayer(outputSize, options) {
    var _a;

    if (options === void 0) {
      options = {};
    }

    var _b;

    var _this = _super.call(this, outputSize) || this;

    for (var i = 0; i < outputSize; i++) {
      var node = new Node_1.Node(NodeType_1.NodeType.INPUT);

      _this.nodes.push(node);
    }

    if (options.noise) {
      var noiseLayer = new NoiseLayer_1.NoiseLayer((_b = options.noise) !== null && _b !== void 0 ? _b : NodeType_1.NoiseNodeType.GAUSSIAN_NOISE);
      noiseLayer.outputNodes.forEach(function (node) {
        return _this.outputNodes.add(node);
      });

      (_a = _this.connections).push.apply(_a, Layer_1.Layer.connect(_this.nodes, noiseLayer, noiseLayer.getDefaultIncomingConnectionType()));
    } else {
      _this.nodes.forEach(function (node) {
        return _this.outputNodes.add(node);
      });
    }

    return _this;
  }

  InputLayer.prototype.getDefaultIncomingConnectionType = function () {
    return ConnectionType_1.ConnectionType.NO_CONNECTION;
  };

  InputLayer.prototype.connectionTypeisAllowed = function (type) {
    return type === ConnectionType_1.ConnectionType.NO_CONNECTION;
  };

  return InputLayer;
}(Layer_1.Layer);

exports.InputLayer = InputLayer;
},{"../Layer":"../src/architecture/Layers/Layer.js","../../Node":"../src/architecture/Node.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../NoiseLayers/NoiseLayer":"../src/architecture/Layers/NoiseLayers/NoiseLayer.js"}],"../src/architecture/Nodes/PoolNode.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var NodeType_1 = require("../../enums/NodeType");

var Utils_1 = require("../../methods/Utils");

var ConstantNode_1 = require("./ConstantNode");

var PoolNode =
/** @class */
function (_super) {
  __extends(PoolNode, _super);

  function PoolNode(poolingType) {
    if (poolingType === void 0) {
      poolingType = NodeType_1.PoolNodeType.MAX_POOLING;
    }

    var _this = _super.call(this) || this;

    _this.poolingType = poolingType;
    _this.receivingIndex = -1;
    return _this;
  }

  PoolNode.prototype.fromJSON = function (json) {
    _super.prototype.fromJSON.call(this, json);

    this.poolingType = json.poolType;
    return this;
  };

  PoolNode.prototype.activate = function () {
    var _this = this;

    var incomingStates = this.incoming.map(function (conn) {
      return conn.from.activation * conn.weight * conn.gain;
    });

    if (this.poolingType === NodeType_1.PoolNodeType.MAX_POOLING) {
      this.receivingIndex = Utils_1.maxValueIndex(incomingStates);
      this.state = incomingStates[this.receivingIndex];
    } else if (this.poolingType === NodeType_1.PoolNodeType.AVG_POOLING) {
      this.state = Utils_1.avg(incomingStates);
    } else if (this.poolingType === NodeType_1.PoolNodeType.MIN_POOLING) {
      this.receivingIndex = Utils_1.minValueIndex(incomingStates);
      this.state = incomingStates[this.receivingIndex];
    } else {
      throw new ReferenceError("No valid pooling type! Type: " + this.poolingType);
    }

    this.activation = this.squash.calc(this.state, false) * this.mask;

    if (this.poolingType === NodeType_1.PoolNodeType.AVG_POOLING) {
      this.derivative = this.squash.calc(this.state, true);
    } // Adjust gain


    this.gated.forEach(function (conn) {
      return conn.gain = _this.activation;
    });
    return this.activation;
  };

  PoolNode.prototype.propagate = function (target, options) {
    if (options === void 0) {
      options = {};
    }

    options.momentum = Utils_1.getOrDefault(options.momentum, 0);
    options.rate = Utils_1.getOrDefault(options.rate, 0.3);
    options.update = Utils_1.getOrDefault(options.update, true);
    var connectionsStates = this.outgoing.map(function (conn) {
      return conn.to.errorResponsibility * conn.weight * conn.gain;
    });
    this.errorResponsibility = this.errorProjected = Utils_1.sum(connectionsStates) * this.derivative;

    if (this.poolingType === NodeType_1.PoolNodeType.AVG_POOLING) {
      for (var _i = 0, _a = this.incoming; _i < _a.length; _i++) {
        var connection = _a[_i]; // calculate gradient

        var gradient = this.errorProjected * connection.eligibility;

        for (var i = 0; i < connection.xTraceNodes.length; i++) {
          gradient += connection.xTraceNodes[i].errorResponsibility * connection.xTraceValues[i];
        }

        connection.deltaWeightsTotal += options.rate * gradient * this.mask;

        if (options.update) {
          connection.deltaWeightsTotal += options.momentum * connection.deltaWeightsPrevious;
          connection.weight += connection.deltaWeightsTotal;
          connection.deltaWeightsPrevious = connection.deltaWeightsTotal;
          connection.deltaWeightsTotal = 0;
        }
      }
    } else {
      // TODO: don't think that this is correct
      // Passing only the connections that were used for getting the min or max
      for (var i = 0; i < this.incoming.length; i++) {
        this.incoming[i].weight = this.receivingIndex === i ? 1 : 0;
        this.incoming[i].gain = this.receivingIndex === i ? 1 : 0;
      }
    }
  };

  PoolNode.prototype.toJSON = function () {
    return Object.assign(_super.prototype.toJSON.call(this), {
      poolType: this.poolingType
    });
  };

  return PoolNode;
}(ConstantNode_1.ConstantNode);

exports.PoolNode = PoolNode;
},{"../../enums/NodeType":"../src/enums/NodeType.js","../../methods/Utils":"../src/methods/Utils.js","./ConstantNode":"../src/architecture/Nodes/ConstantNode.js"}],"../src/architecture/Layers/PoolingLayers/PoolingLayer.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Layer_1 = require("../Layer");

var ConnectionType_1 = require("../../../enums/ConnectionType");

var PoolingLayer =
/** @class */
function (_super) {
  __extends(PoolingLayer, _super);

  function PoolingLayer(outputSize) {
    return _super.call(this, outputSize) || this;
  }

  PoolingLayer.prototype.getDefaultIncomingConnectionType = function () {
    return ConnectionType_1.ConnectionType.POOLING;
  };

  PoolingLayer.prototype.connectionTypeisAllowed = function (type) {
    return true;
  };

  return PoolingLayer;
}(Layer_1.Layer);

exports.PoolingLayer = PoolingLayer;
},{"../Layer":"../src/architecture/Layers/Layer.js","../../../enums/ConnectionType":"../src/enums/ConnectionType.js"}],"../src/architecture/Layers/PoolingLayers/AvgPooling1DLayer.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var PoolNode_1 = require("../../Nodes/PoolNode");

var NodeType_1 = require("../../../enums/NodeType");

var PoolingLayer_1 = require("./PoolingLayer");

var ActivationType_1 = require("../../../enums/ActivationType");

var AvgPooling1DLayer =
/** @class */
function (_super) {
  __extends(AvgPooling1DLayer, _super);

  function AvgPooling1DLayer(outputSize, options) {
    var _a;

    if (options === void 0) {
      options = {};
    }

    var _b;

    var _this = _super.call(this, outputSize) || this;

    var activationType = (_b = options.activationType) !== null && _b !== void 0 ? _b : ActivationType_1.ActivationType.IdentityActivation;

    for (var i = 0; i < outputSize; i++) {
      _this.inputNodes.add(new PoolNode_1.PoolNode(NodeType_1.PoolNodeType.AVG_POOLING).setSquash(activationType));
    }

    _this.outputNodes = _this.inputNodes;

    (_a = _this.nodes).push.apply(_a, Array.from(_this.inputNodes));

    return _this;
  }

  return AvgPooling1DLayer;
}(PoolingLayer_1.PoolingLayer);

exports.AvgPooling1DLayer = AvgPooling1DLayer;
},{"../../Nodes/PoolNode":"../src/architecture/Nodes/PoolNode.js","../../../enums/NodeType":"../src/enums/NodeType.js","./PoolingLayer":"../src/architecture/Layers/PoolingLayers/PoolingLayer.js","../../../enums/ActivationType":"../src/enums/ActivationType.js"}],"../src/architecture/Layers/PoolingLayers/MinPooling1DLayer.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var PoolNode_1 = require("../../Nodes/PoolNode");

var NodeType_1 = require("../../../enums/NodeType");

var PoolingLayer_1 = require("./PoolingLayer");

var ActivationType_1 = require("../../../enums/ActivationType");

var MinPooling1DLayer =
/** @class */
function (_super) {
  __extends(MinPooling1DLayer, _super);

  function MinPooling1DLayer(outputSize, options) {
    var _a;

    if (options === void 0) {
      options = {};
    }

    var _b;

    var _this = _super.call(this, outputSize) || this;

    var activationType = (_b = options.activationType) !== null && _b !== void 0 ? _b : ActivationType_1.ActivationType.IdentityActivation;

    for (var i = 0; i < outputSize; i++) {
      _this.inputNodes.add(new PoolNode_1.PoolNode(NodeType_1.PoolNodeType.MIN_POOLING).setSquash(activationType));
    }

    _this.outputNodes = _this.inputNodes;

    (_a = _this.nodes).push.apply(_a, Array.from(_this.inputNodes));

    return _this;
  }

  return MinPooling1DLayer;
}(PoolingLayer_1.PoolingLayer);

exports.MinPooling1DLayer = MinPooling1DLayer;
},{"../../Nodes/PoolNode":"../src/architecture/Nodes/PoolNode.js","../../../enums/NodeType":"../src/enums/NodeType.js","./PoolingLayer":"../src/architecture/Layers/PoolingLayers/PoolingLayer.js","../../../enums/ActivationType":"../src/enums/ActivationType.js"}],"../src/architecture/Layers/PoolingLayers/MaxPooling1DLayer.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var PoolNode_1 = require("../../Nodes/PoolNode");

var NodeType_1 = require("../../../enums/NodeType");

var PoolingLayer_1 = require("./PoolingLayer");

var ActivationType_1 = require("../../../enums/ActivationType");

var MaxPooling1DLayer =
/** @class */
function (_super) {
  __extends(MaxPooling1DLayer, _super);

  function MaxPooling1DLayer(outputSize, options) {
    var _a;

    if (options === void 0) {
      options = {};
    }

    var _b;

    var _this = _super.call(this, outputSize) || this;

    var activationType = (_b = options.activationType) !== null && _b !== void 0 ? _b : ActivationType_1.ActivationType.IdentityActivation;

    for (var i = 0; i < outputSize; i++) {
      _this.inputNodes.add(new PoolNode_1.PoolNode(NodeType_1.PoolNodeType.MAX_POOLING).setSquash(activationType));
    }

    _this.outputNodes = _this.inputNodes;

    (_a = _this.nodes).push.apply(_a, Array.from(_this.inputNodes));

    return _this;
  }

  return MaxPooling1DLayer;
}(PoolingLayer_1.PoolingLayer);

exports.MaxPooling1DLayer = MaxPooling1DLayer;
},{"../../Nodes/PoolNode":"../src/architecture/Nodes/PoolNode.js","../../../enums/NodeType":"../src/enums/NodeType.js","./PoolingLayer":"../src/architecture/Layers/PoolingLayers/PoolingLayer.js","../../../enums/ActivationType":"../src/enums/ActivationType.js"}],"../src/architecture/Layers/PoolingLayers/GlobalAvgPooling1DLayer.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var AvgPooling1DLayer_1 = require("./AvgPooling1DLayer");

var GlobalAvgPooling1DLayer =
/** @class */
function (_super) {
  __extends(GlobalAvgPooling1DLayer, _super);

  function GlobalAvgPooling1DLayer(outputSize, options) {
    if (options === void 0) {
      options = {};
    }

    return _super.call(this, 1, options) || this;
  }

  return GlobalAvgPooling1DLayer;
}(AvgPooling1DLayer_1.AvgPooling1DLayer);

exports.GlobalAvgPooling1DLayer = GlobalAvgPooling1DLayer;
},{"./AvgPooling1DLayer":"../src/architecture/Layers/PoolingLayers/AvgPooling1DLayer.js"}],"../src/architecture/Layers/PoolingLayers/GlobalMaxPooling1DLayer.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var MaxPooling1DLayer_1 = require("./MaxPooling1DLayer");

var GlobalMaxPooling1DLayer =
/** @class */
function (_super) {
  __extends(GlobalMaxPooling1DLayer, _super);

  function GlobalMaxPooling1DLayer(outputSize, options) {
    if (options === void 0) {
      options = {};
    }

    return _super.call(this, 1, options) || this;
  }

  return GlobalMaxPooling1DLayer;
}(MaxPooling1DLayer_1.MaxPooling1DLayer);

exports.GlobalMaxPooling1DLayer = GlobalMaxPooling1DLayer;
},{"./MaxPooling1DLayer":"../src/architecture/Layers/PoolingLayers/MaxPooling1DLayer.js"}],"../src/architecture/Layers/PoolingLayers/GlobalMinPooling1DLayer.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var MinPooling1DLayer_1 = require("./MinPooling1DLayer");

var GlobalMinPooling1DLayer =
/** @class */
function (_super) {
  __extends(GlobalMinPooling1DLayer, _super);

  function GlobalMinPooling1DLayer(outputSize, options) {
    if (options === void 0) {
      options = {};
    }

    return _super.call(this, 1, options) || this;
  }

  return GlobalMinPooling1DLayer;
}(MinPooling1DLayer_1.MinPooling1DLayer);

exports.GlobalMinPooling1DLayer = GlobalMinPooling1DLayer;
},{"./MinPooling1DLayer":"../src/architecture/Layers/PoolingLayers/MinPooling1DLayer.js"}],"../src/architecture/Layers/RecurrentLayers/GRULayer.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Layer_1 = require("../Layer");

var Activation_1 = require("../../../methods/Activation");

var Node_1 = require("../../Node");

var ActivationType_1 = require("../../../enums/ActivationType");

var NodeType_1 = require("../../../enums/NodeType");

var ConnectionType_1 = require("../../../enums/ConnectionType");

var GatingType_1 = require("../../../enums/GatingType");

var GRULayer =
/** @class */
function (_super) {
  __extends(GRULayer, _super);

  function GRULayer(outputSize, options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;

    if (options === void 0) {
      options = {};
    }

    var _w;

    var _this = _super.call(this, outputSize) || this;

    var updateGate = [];
    var inverseUpdateGate = [];
    var resetGate = [];
    var memoryCell = [];
    var previousOutput = [];

    for (var i = 0; i < outputSize; i++) {
      _this.inputNodes.add(new Node_1.Node(NodeType_1.NodeType.HIDDEN));

      updateGate.push(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setBias(1));
      inverseUpdateGate.push(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setBias(0).setSquash(ActivationType_1.ActivationType.LogisticActivation));
      resetGate.push(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setBias(0));
      memoryCell.push(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setSquash(ActivationType_1.ActivationType.TanhActivation));
      previousOutput.push(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setBias(0).setSquash(ActivationType_1.ActivationType.LogisticActivation));

      _this.outputNodes.add(new Node_1.Node(NodeType_1.NodeType.HIDDEN));
    }

    (_a = _this.connections).push.apply(_a, Layer_1.Layer.connect(_this.inputNodes, updateGate, ConnectionType_1.ConnectionType.ALL_TO_ALL));

    (_b = _this.connections).push.apply(_b, Layer_1.Layer.connect(_this.inputNodes, resetGate, ConnectionType_1.ConnectionType.ALL_TO_ALL));

    (_c = _this.connections).push.apply(_c, Layer_1.Layer.connect(_this.inputNodes, memoryCell, ConnectionType_1.ConnectionType.ALL_TO_ALL));

    (_d = _this.connections).push.apply(_d, Layer_1.Layer.connect(previousOutput, updateGate, ConnectionType_1.ConnectionType.ALL_TO_ALL));

    (_e = _this.connections).push.apply(_e, Layer_1.Layer.connect(updateGate, inverseUpdateGate, ConnectionType_1.ConnectionType.ONE_TO_ONE, 1));

    (_f = _this.connections).push.apply(_f, Layer_1.Layer.connect(previousOutput, resetGate, ConnectionType_1.ConnectionType.ALL_TO_ALL));

    var reset = Layer_1.Layer.connect(previousOutput, memoryCell, ConnectionType_1.ConnectionType.ALL_TO_ALL);

    (_g = _this.connections).push.apply(_g, reset);

    (_h = _this.gates).push.apply(_h, Layer_1.Layer.gate(resetGate, reset, GatingType_1.GatingType.OUTPUT));

    var update = Layer_1.Layer.connect(previousOutput, _this.outputNodes, ConnectionType_1.ConnectionType.ALL_TO_ALL);
    var inverseUpdate = Layer_1.Layer.connect(memoryCell, _this.outputNodes, ConnectionType_1.ConnectionType.ALL_TO_ALL);

    (_j = _this.connections).push.apply(_j, update);

    (_k = _this.connections).push.apply(_k, inverseUpdate);

    (_l = _this.gates).push.apply(_l, Layer_1.Layer.gate(updateGate, update, GatingType_1.GatingType.OUTPUT));

    (_m = _this.gates).push.apply(_m, Layer_1.Layer.gate(inverseUpdateGate, inverseUpdate, GatingType_1.GatingType.OUTPUT));

    (_o = _this.connections).push.apply(_o, Layer_1.Layer.connect(_this.outputNodes, previousOutput, ConnectionType_1.ConnectionType.ONE_TO_ONE, 1));

    (_p = _this.nodes).push.apply(_p, Array.from(_this.inputNodes));

    (_q = _this.nodes).push.apply(_q, updateGate);

    (_r = _this.nodes).push.apply(_r, inverseUpdateGate);

    (_s = _this.nodes).push.apply(_s, resetGate);

    (_t = _this.nodes).push.apply(_t, memoryCell);

    (_u = _this.nodes).push.apply(_u, Array.from(_this.outputNodes));

    (_v = _this.nodes).push.apply(_v, previousOutput);

    var activation = Activation_1.Activation.getActivation((_w = options.activationType) !== null && _w !== void 0 ? _w : ActivationType_1.ActivationType.LogisticActivation);

    _this.outputNodes.forEach(function (node) {
      return node.squash = activation;
    });

    return _this;
  }

  GRULayer.prototype.connectionTypeisAllowed = function (type) {
    return true;
  };

  GRULayer.prototype.getDefaultIncomingConnectionType = function () {
    return ConnectionType_1.ConnectionType.ALL_TO_ALL;
  };

  return GRULayer;
}(Layer_1.Layer);

exports.GRULayer = GRULayer;
},{"../Layer":"../src/architecture/Layers/Layer.js","../../../methods/Activation":"../src/methods/Activation.js","../../Node":"../src/architecture/Node.js","../../../enums/ActivationType":"../src/enums/ActivationType.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../../enums/GatingType":"../src/enums/GatingType.js"}],"../src/architecture/Layers/RecurrentLayers/LSTMLayer.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Layer_1 = require("../Layer");

var ActivationType_1 = require("../../../enums/ActivationType");

var Node_1 = require("../../Node");

var NodeType_1 = require("../../../enums/NodeType");

var ConnectionType_1 = require("../../../enums/ConnectionType");

var GatingType_1 = require("../../../enums/GatingType");

var Activation_1 = require("../../../methods/Activation");

var LSTMLayer =
/** @class */
function (_super) {
  __extends(LSTMLayer, _super);

  function LSTMLayer(outputSize, options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;

    if (options === void 0) {
      options = {};
    }

    var _u;

    var _this = _super.call(this, outputSize) || this;

    var inputGate = [];
    var forgetGate = [];
    var memoryCell = [];
    var outputGate = [];

    for (var i = 0; i < outputSize; i++) {
      _this.inputNodes.add(new Node_1.Node(NodeType_1.NodeType.HIDDEN));

      inputGate.push(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setBias(1));
      forgetGate.push(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setBias(1).setSquash(ActivationType_1.ActivationType.LogisticActivation));
      memoryCell.push(new Node_1.Node(NodeType_1.NodeType.HIDDEN));
      outputGate.push(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setBias(1));

      _this.outputNodes.add(new Node_1.Node(NodeType_1.NodeType.HIDDEN));
    }

    (_a = _this.connections).push.apply(_a, Layer_1.Layer.connect(memoryCell, inputGate, ConnectionType_1.ConnectionType.ALL_TO_ALL));

    (_b = _this.connections).push.apply(_b, Layer_1.Layer.connect(memoryCell, forgetGate, ConnectionType_1.ConnectionType.ALL_TO_ALL));

    (_c = _this.connections).push.apply(_c, Layer_1.Layer.connect(memoryCell, outputGate, ConnectionType_1.ConnectionType.ALL_TO_ALL));

    var forgetGateConnections = Layer_1.Layer.connect(memoryCell, memoryCell, ConnectionType_1.ConnectionType.ONE_TO_ONE);
    var outputGateConnections = Layer_1.Layer.connect(memoryCell, _this.outputNodes, ConnectionType_1.ConnectionType.ALL_TO_ALL);

    (_d = _this.connections).push.apply(_d, forgetGateConnections);

    (_e = _this.connections).push.apply(_e, outputGateConnections);

    (_f = _this.connections).push.apply(_f, Layer_1.Layer.connect(_this.inputNodes, memoryCell, ConnectionType_1.ConnectionType.ALL_TO_ALL));

    (_g = _this.connections).push.apply(_g, Layer_1.Layer.connect(_this.inputNodes, outputGate, ConnectionType_1.ConnectionType.ALL_TO_ALL));

    (_h = _this.connections).push.apply(_h, Layer_1.Layer.connect(_this.inputNodes, forgetGate, ConnectionType_1.ConnectionType.ALL_TO_ALL));

    var inputGateConnections = Layer_1.Layer.connect(_this.inputNodes, inputGate, ConnectionType_1.ConnectionType.ALL_TO_ALL);

    (_j = _this.connections).push.apply(_j, inputGateConnections);

    (_k = _this.gates).push.apply(_k, Layer_1.Layer.gate(forgetGate, forgetGateConnections, GatingType_1.GatingType.SELF));

    (_l = _this.gates).push.apply(_l, Layer_1.Layer.gate(outputGate, outputGateConnections, GatingType_1.GatingType.OUTPUT));

    (_m = _this.gates).push.apply(_m, Layer_1.Layer.gate(inputGate, inputGateConnections, GatingType_1.GatingType.INPUT));

    (_o = _this.nodes).push.apply(_o, Array.from(_this.inputNodes));

    (_p = _this.nodes).push.apply(_p, inputGate);

    (_q = _this.nodes).push.apply(_q, forgetGate);

    (_r = _this.nodes).push.apply(_r, memoryCell);

    (_s = _this.nodes).push.apply(_s, outputGate);

    (_t = _this.nodes).push.apply(_t, Array.from(_this.outputNodes));

    var activation = Activation_1.Activation.getActivation((_u = options.activationType) !== null && _u !== void 0 ? _u : ActivationType_1.ActivationType.TanhActivation);

    _this.outputNodes.forEach(function (node) {
      return node.squash = activation;
    });

    return _this;
  }

  LSTMLayer.prototype.connectionTypeisAllowed = function (type) {
    return true;
  };

  LSTMLayer.prototype.getDefaultIncomingConnectionType = function () {
    return ConnectionType_1.ConnectionType.ALL_TO_ALL;
  };

  return LSTMLayer;
}(Layer_1.Layer);

exports.LSTMLayer = LSTMLayer;
},{"../Layer":"../src/architecture/Layers/Layer.js","../../../enums/ActivationType":"../src/enums/ActivationType.js","../../Node":"../src/architecture/Node.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../../enums/GatingType":"../src/enums/GatingType.js","../../../methods/Activation":"../src/methods/Activation.js"}],"../src/architecture/Layers/RecurrentLayers/MemoryLayer.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Layer_1 = require("../Layer");

var Activation_1 = require("../../../methods/Activation");

var Node_1 = require("../../Node");

var ActivationType_1 = require("../../../enums/ActivationType");

var NodeType_1 = require("../../../enums/NodeType");

var ConnectionType_1 = require("../../../enums/ConnectionType");

var MemoryLayer =
/** @class */
function (_super) {
  __extends(MemoryLayer, _super);

  function MemoryLayer(outputSize, options) {
    var _a, _b, _c;

    if (options === void 0) {
      options = {};
    }

    var _d, _e;

    var _this = _super.call(this, outputSize) || this;

    for (var i = 0; i < outputSize; i++) {
      _this.inputNodes.add(new Node_1.Node(NodeType_1.NodeType.HIDDEN));
    }

    var prevNodes = Array.from(_this.inputNodes);
    var nodes = [];

    for (var i = 0; i < ((_d = options.memorySize) !== null && _d !== void 0 ? _d : 1); i++) {
      var block = [];

      for (var j = 0; j < outputSize; j++) {
        var node = new Node_1.Node(NodeType_1.NodeType.HIDDEN);
        node.squash = new Activation_1.IdentityActivation();
        node.bias = 0;
        block.push(node);
      }

      (_a = _this.connections).push.apply(_a, Layer_1.Layer.connect(prevNodes, block, ConnectionType_1.ConnectionType.ONE_TO_ONE));

      nodes.push.apply(nodes, block);
      prevNodes = block;
    }

    (_b = _this.nodes).push.apply(_b, Array.from(_this.inputNodes));

    (_c = _this.nodes).push.apply(_c, nodes.reverse());

    prevNodes.forEach(function (node) {
      return _this.outputNodes.add(node);
    });
    var activation = Activation_1.Activation.getActivation((_e = options.activationType) !== null && _e !== void 0 ? _e : ActivationType_1.ActivationType.LogisticActivation);

    _this.outputNodes.forEach(function (node) {
      return node.squash = activation;
    });

    return _this;
  }

  MemoryLayer.prototype.connectionTypeisAllowed = function (type) {
    return true;
  };

  MemoryLayer.prototype.getDefaultIncomingConnectionType = function () {
    return ConnectionType_1.ConnectionType.ALL_TO_ALL;
  };

  return MemoryLayer;
}(Layer_1.Layer);

exports.MemoryLayer = MemoryLayer;
},{"../Layer":"../src/architecture/Layers/Layer.js","../../../methods/Activation":"../src/methods/Activation.js","../../Node":"../src/architecture/Node.js","../../../enums/ActivationType":"../src/enums/ActivationType.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../../enums/ConnectionType":"../src/enums/ConnectionType.js"}],"../src/methods/Loss.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Loss functions play an important role in neural networks. They give neural networks an indication of 'how wrong' they are; a.k.a. how far they are from the desired outputs. Also in fitness functions, loss functions play an important role.
 *
 * @see [Loss Function on Wikipedia](https://en.wikipedia.org/wiki/Loss_function)
 */

var Loss =
/** @class */
function () {
  function Loss() {}

  return Loss;
}();

exports.Loss = Loss;
/**
 * Cross entropy error
 *
 * @see {@link http://bit.ly/2p5W29A | Cross-entropy Error Function}
 * @param targets Ideal value
 * @param outputs Actual values
 *
 * @return [Cross entropy error](https://ml-cheatsheet.readthedocs.io/en/latest/loss_functions.html)
 *
 * @example
 * let myNetwork = new Network(5, 5);
 * myNetwork.train(trainingData, { loss: new CrossEntropyLoss() });
 */

var CrossEntropyLoss =
/** @class */
function (_super) {
  __extends(CrossEntropyLoss, _super);

  function CrossEntropyLoss() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  CrossEntropyLoss.prototype.calc = function (targets, outputs) {
    var error = 0;
    outputs.forEach(function (value, index) {
      error -= targets[index] * Math.log(Math.max(value, 1e-15)) + (1 - targets[index]) * Math.log(1 - Math.max(value, 1e-15));
    });
    return error / outputs.length;
  };

  return CrossEntropyLoss;
}(Loss);

exports.CrossEntropyLoss = CrossEntropyLoss;
/**
 * Mean Squared Error
 *
 * @param targets Ideal value
 * @param outputs Actual values
 *
 * @return [Mean squared error](https://medium.freecodecamp.org/machine-learning-mean-squared-error-regression-line-c7dde9a26b93)
 *
 * @example
 * let myNetwork = new Network(5, 5);
 * myNetwork.train(trainingData, { loss: new MSELoss() });
 */

var MSELoss =
/** @class */
function (_super) {
  __extends(MSELoss, _super);

  function MSELoss() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MSELoss.prototype.calc = function (targets, outputs) {
    var error = 0;
    outputs.forEach(function (value, index) {
      error += Math.pow(targets[index] - value, 2);
    });
    return error / outputs.length;
  };

  return MSELoss;
}(Loss);

exports.MSELoss = MSELoss;
/**
 * Binary Error
 *
 * @param targets Ideal value
 * @param outputs Actual values
 *
 * @return misses The amount of times targets value was missed
 *
 * @example
 * let myNetwork = new Network(5, 5);
 * myNetwork.train(trainingData, {
 *   log: 1,
 *   iterations: 500,
 *   error: 0.03,
 *   rate: 0.05,
 *   loss: new BinaryLoss()
 * });
 */

var BinaryLoss =
/** @class */
function (_super) {
  __extends(BinaryLoss, _super);

  function BinaryLoss() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  BinaryLoss.prototype.calc = function (targets, outputs) {
    var error = 0;
    outputs.forEach(function (value, index) {
      error += Math.round(targets[index] * 2) !== Math.round(value * 2) ? 1 : 0;
    });
    return error / outputs.length;
  };

  return BinaryLoss;
}(Loss);

exports.BinaryLoss = BinaryLoss;
/**
 * Mean Absolute Error
 *
 * @param targets Ideal value
 * @param outputs Actual values
 *
 * @return [Mean absolute error](https://en.wikipedia.org/wiki/Mean_absolute_error)
 *
 * @example
 * let myNetwork = new Network(5, 5);
 * myNetwork.train(trainingData, {
 *   log: 1,
 *   iterations: 500,
 *   error: 0.03,
 *   rate: 0.05,
 *   loss: new MAELoss()
 * });
 */

var MAELoss =
/** @class */
function (_super) {
  __extends(MAELoss, _super);

  function MAELoss() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MAELoss.prototype.calc = function (targets, outputs) {
    var error = 0;
    outputs.forEach(function (value, index) {
      error += Math.abs(targets[index] - value);
    });
    return error / outputs.length;
  };

  return MAELoss;
}(Loss);

exports.MAELoss = MAELoss;
/**
 * Mean Absolute Percentage Error
 *
 * @param targets Ideal value
 * @param outputs Actual values
 *
 * @return [Mean absolute percentage error](https://en.wikipedia.org/wiki/Mean_absolute_percentage_error)
 *
 * @example
 * let myNetwork = new Network(5, 5);
 * myNetwork.train(trainingData, {
 *   log: 1,
 *   iterations: 500,
 *   error: 0.03,
 *   rate: 0.05,
 *   loss: new MAPELoss()
 * });
 */

var MAPELoss =
/** @class */
function (_super) {
  __extends(MAPELoss, _super);

  function MAPELoss() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MAPELoss.prototype.calc = function (targets, outputs) {
    var error = 0;
    outputs.forEach(function (value, index) {
      error += Math.abs((value - targets[index]) / Math.max(targets[index], 1e-15));
    });
    return error / outputs.length;
  };

  return MAPELoss;
}(Loss);

exports.MAPELoss = MAPELoss;
/**
 * Weighted Absolute Percentage Error (WAPE)
 *
 * @param targets Ideal value
 * @param outputs Actual values
 *
 * @return - [Weighted absolute percentage error](https://help.sap.com/doc/saphelp_nw70/7.0.31/en-US/76/487053bbe77c1ee10000000a174cb4/content.htm?no_cache=true)
 *
 * @example
 * let myNetwork = new Network(5, 5);
 * myNetwork.train(trainingData, {
 *   loss: new WAPELoss()
 * });
 */

var WAPELoss =
/** @class */
function (_super) {
  __extends(WAPELoss, _super);

  function WAPELoss() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  WAPELoss.prototype.calc = function (targets, outputs) {
    var error = 0;
    var sum = 0;

    for (var i = 0; i < outputs.length; i++) {
      error += Math.abs(targets[i] - outputs[i]);
      sum += targets[i];
    }

    return error / sum;
  };

  return WAPELoss;
}(Loss);

exports.WAPELoss = WAPELoss;
/**
 * Mean Squared Logarithmic Error
 *
 * @param targets Ideal value
 * @param outputs Actual values
 *
 * @return - [Mean squared logarithmic error](https://peltarion.com/knowledge-center/documentation/modeling-view/build-an-ai-model/loss-functions/mean-squared-logarithmic-error)
 *
 * @example
 * let myNetwork = new Network(5, 5);
 * myNetwork.train(trainingData, {
 *   log: 1,
 *   iterations: 500,
 *   error: 0.03,
 *   rate: 0.05,
 *   loss: new MSLELoss()
 * });
 */

var MSLELoss =
/** @class */
function (_super) {
  __extends(MSLELoss, _super);

  function MSLELoss() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MSLELoss.prototype.calc = function (targets, outputs) {
    var error = 0;
    outputs.forEach(function (value, index) {
      error += Math.log(Math.max(targets[index], 1e-15)) - Math.log(Math.max(value, 1e-15));
    });
    return error / outputs.length;
  };

  return MSLELoss;
}(Loss);

exports.MSLELoss = MSLELoss;
/**
 * Hinge loss, for classifiers
 *
 * @param targets Ideal value
 * @param outputs Actual values
 *
 * @return - [Hinge loss](https://towardsdatascience.com/support-vector-machines-intuitive-understanding-part-1-3fb049df4ba1)
 *
 * @example
 * let myNetwork = new Network(5, 5);
 * myNetwork.train(trainingData, {
 *   log: 1,
 *   iterations: 500,
 *   error: 0.03,
 *   rate: 0.05,
 *   loss: new HINGELoss()
 * });
 */

var HINGELoss =
/** @class */
function (_super) {
  __extends(HINGELoss, _super);

  function HINGELoss() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  HINGELoss.prototype.calc = function (targets, outputs) {
    var error = 0;
    outputs.forEach(function (value, index) {
      error += Math.max(0, 1 - value * targets[index]);
    });
    return error / outputs.length;
  };

  return HINGELoss;
}(Loss);

exports.HINGELoss = HINGELoss;
var ALL_LOSSES = [new CrossEntropyLoss(), new MSELoss(), new BinaryLoss(), new MAELoss(), new MAPELoss(), new WAPELoss(), new MSLELoss(), new HINGELoss()];
exports.ALL_LOSSES = ALL_LOSSES;
},{}],"../src/methods/Rate.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Built-in learning rate policies, which allow for a dynamic learning rate during neural network training.
 *
 * @see [Learning rates and how-to improve performance](https://towardsdatascience.com/understanding-learning-rates-and-how-it-improves-performance-in-deep-learning-d0d4059c1c10)
 * @see [Learning rate policy](https://stackoverflow.com/questions/30033096/what-is-lr-policy-in-caffe/30045244)
 *
 * @example
 * let network = new Network(5, 5);
 *
 * // OPTION #1: FixedRate
 * network.train(dataset, { ratePolicy: new FixedRate() });
 *
 * // OPTION #2: StepRate
 * network.train(dataset, { ratePolicy: new StepRate() });
 *
 * // OPTION #3: ExponentialRate
 * network.train(dataset, { ratePolicy: new ExponentialRate() });
 *
 * // OPTION #4: InverseRate
 * network.train(dataset, { ratePolicy: new InverseRate() });
 */

var Rate =
/** @class */
function () {
  /**
   * Constructs a rate policy
   * @param baseRate the rate at first iteration
   */
  function Rate(baseRate) {
    this.baseRate = baseRate;
  }

  return Rate;
}();

exports.Rate = Rate;
/**
 * Fixed Learning Rate
 *
 * Default rate policy. Using this will make learning rate static (no change). Useful as a way to update a previous rate policy.
 *
 * @example
 * let network = new Network(10, 1);
 *
 * network.train(dataset, { ratePolicy: new FixedRate(0.3) });
 */

var FixedRate =
/** @class */
function (_super) {
  __extends(FixedRate, _super);

  function FixedRate() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * Calculates the current training rate.
   *
   * @param iteration count
   * @returns the current training rate
   */


  FixedRate.prototype.calc = function (iteration) {
    return this.baseRate;
  };

  return FixedRate;
}(Rate);

exports.FixedRate = FixedRate;
/**
 * Step Learning Rate
 *
 * The learning rate will decrease (i.e. 'step down') every `stepSize` iterations.
 *
 * @example
 * let network = new Network(10, 1);
 *
 * network.train(dataset, { ratePolicy: new StepRate(0.3) });
 */

var StepRate =
/** @class */
function (_super) {
  __extends(StepRate, _super);
  /**
   * Constructs a step rate policy.
   *
   * @param baseRate the rate at first iteration
   * @param gamma=0.9 Learning rate retention per step; - _0 < `gamma` < 1_ - _large `gamma` CAN cause networks to never converge, low `gamma` CAN cause networks to converge too quickly_
   * @param stepSize=100 Learning rate is updated every `step_size` iterations
   */


  function StepRate(baseRate, gamma, stepSize) {
    if (gamma === void 0) {
      gamma = 0.9;
    }

    if (stepSize === void 0) {
      stepSize = 100;
    }

    var _this = _super.call(this, baseRate) || this;

    _this.gamma = gamma;
    _this.stepSize = stepSize;
    return _this;
  }
  /**
   * Calculates the current training rate.
   *
   * @param iteration count
   * @returns the current training rate
   */


  StepRate.prototype.calc = function (iteration) {
    return this.baseRate * Math.pow(this.gamma, Math.floor(iteration / this.stepSize));
  };

  return StepRate;
}(Rate);

exports.StepRate = StepRate;
/**
 * Exponential Learning Rate
 *
 * The learning rate will exponentially decrease.
 *
 * The rate at `iteration` is calculated as: `rate = base_rate * Math.pow(gamma, iteration)`
 *
 * @example
 * let network = new Network(10, 1);
 *
 * network.train(dataset, { ratePolicy: new ExponentialRate(0.3) });
 */

var ExponentialRate =
/** @class */
function (_super) {
  __extends(ExponentialRate, _super);
  /**
   * Constructs a step rate policy.
   *
   * @param baseRate the rate at first iteration
   * @param gamma=0.9 Learning rate retention per step; - _0 < `gamma` < 1_ - _large `gamma` CAN cause networks to never converge, low `gamma` CAN cause networks to converge too quickly_
   */


  function ExponentialRate(baseRate, gamma) {
    if (gamma === void 0) {
      gamma = 0.999;
    }

    var _this = _super.call(this, baseRate) || this;

    _this.gamma = gamma;
    return _this;
  }
  /**
   * Calculates the current training rate.
   *
   * @param iteration count
   * @returns the current training rate
   */


  ExponentialRate.prototype.calc = function (iteration) {
    return this.baseRate * Math.pow(this.gamma, iteration);
  };

  return ExponentialRate;
}(Rate);

exports.ExponentialRate = ExponentialRate;
/**
 * Inverse Exponential Learning Rate
 *
 * The learning rate will exponentially decrease.
 *
 * The rate at `iteration` is calculated as: `rate = baseRate * Math.pow(1 + gamma * iteration, -power)`
 *
 * @example
 * let network = new Network(10, 1);
 *
 * network.train(dataset, { ratePolicy: new InverseRate(0.3) });
 */

var InverseRate =
/** @class */
function (_super) {
  __extends(InverseRate, _super);
  /**
   * Constructs a step rate policy.
   *
   * @param baseRate the rate at first iteration
   * @param [gamma=0.001] Learning rate decay per iteration; - _0 < `gamma` < 1_ - _large `gamma` CAN cause networks to converge too quickly and stop learning, low `gamma` CAN cause networks to converge to learn VERY slowly_
   * @param power=2 Decay rate per iteration - _0 < `power`_ - _large `power` CAN cause networks to stop learning quickly, low `power` CAN cause networks to learn VERY slowly_
   */


  function InverseRate(baseRate, gamma, power) {
    if (gamma === void 0) {
      gamma = 0.001;
    }

    if (power === void 0) {
      power = 2;
    }

    var _this = _super.call(this, baseRate) || this;

    _this.gamma = gamma;
    _this.power = power;
    return _this;
  }
  /**
   * Calculates the current training rate.
   *
   * @param iteration count
   * @returns the current training rate
   */


  InverseRate.prototype.calc = function (iteration) {
    return this.baseRate * Math.pow(1 + this.gamma * iteration, -this.power);
  };

  return InverseRate;
}(Rate);

exports.InverseRate = InverseRate;
},{}],"../src/methods/Selection.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Utils_1 = require("./Utils");
/**
 * Genetic Algorithm Selection Methods (Genetic Operator)
 *
 * @see [Genetic Algorithm - Selection]{@link https://en.wikipedia.org/wiki/Selection_(genetic_algorithm)}
 *
 * @example
 * let myNetwork = new Network(1,1);
 * let myTrainingSet = [{ input:[0], output:[1]}, { input:[1], output:[0]}];
 *
 * myNetwork.evolve(myTrainingSet, {
 *  generations: 10,
 *  selection: new PowerSelection() // eg.
 * });
 */


var Selection =
/** @class */
function () {
  function Selection() {}

  return Selection;
}();

exports.Selection = Selection;
/**
 * Fitness proportionate selection
 *
 * [Fitness Proportionate / Roulette Wheel Selection on Wikipedia](https://en.wikipedia.org/wiki/Fitness_proportionate_selection)
 *
 * @example
 * let myNetwork = new Network(1,1);
 * let myTrainingSet = [{ input:[0], output:[1]}, { input:[1], output:[0]}];
 *
 * myNetwork.evolve(myTrainingSet, {
 *  iterations: 10,
 *  selection: new FitnessProportionateSelection() // eg.
 * });
 */

var FitnessProportionateSelection =
/** @class */
function (_super) {
  __extends(FitnessProportionateSelection, _super);

  function FitnessProportionateSelection() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  FitnessProportionateSelection.prototype.select = function (population) {
    var _a, _b, _c;

    var totalFitness = 0;
    var minimalFitness = 0;

    for (var _i = 0, population_1 = population; _i < population_1.length; _i++) {
      var genome = population_1[_i];
      minimalFitness = Math.min((_a = genome.score) !== null && _a !== void 0 ? _a : minimalFitness, minimalFitness);
      totalFitness += (_b = genome.score) !== null && _b !== void 0 ? _b : 0;
    }

    minimalFitness = Math.abs(minimalFitness);
    totalFitness += minimalFitness * population.length;
    var random = Utils_1.randDouble(0, totalFitness);
    var value = 0;

    for (var _d = 0, population_2 = population; _d < population_2.length; _d++) {
      var genome = population_2[_d];
      value += ((_c = genome.score) !== null && _c !== void 0 ? _c : 0) + minimalFitness;

      if (random < value) {
        return genome;
      }
    }

    return Utils_1.pickRandom(population);
  };

  return FitnessProportionateSelection;
}(Selection);

exports.FitnessProportionateSelection = FitnessProportionateSelection;
/**
 * Power selection
 *
 * A random decimal value between 0 and 1 will be generated (e.g. 0.5) then this value will get an exponential value (power, default is 4). So 0.5**4 = 0.0625. This is converted into an index for the array of the current population, sorted from fittest to worst.
 *
 * @example
 * let myNetwork = new Network(1,1);
 * let myTrainingSet = [{ input:[0], output:[1]}, { input:[1], output:[0]}];
 *
 * myNetwork.evolve(myTrainingSet, {
 *  iterations: 10,
 *  selection: new PowerSelection() // eg.
 * });
 */

var PowerSelection =
/** @class */
function (_super) {
  __extends(PowerSelection, _super);

  function PowerSelection(power) {
    if (power === void 0) {
      power = 4;
    }

    var _this = _super.call(this) || this;

    _this.power = power;
    return _this;
  }

  PowerSelection.prototype.select = function (population) {
    return population[Math.floor(Math.pow(Math.random(), this.power) * population.length)];
  };

  return PowerSelection;
}(Selection);

exports.PowerSelection = PowerSelection;
/**
 * Tournament selection
 *
 * [Tournament Selection on Wikipedia](https://en.wikipedia.org/wiki/Tournament_selection)
 *
 * @example
 * let myNetwork = new Network(1,1);
 * let myTrainingSet = [{ input:[0], output:[1]}, { input:[1], output:[0]}];
 *
 * myNetwork.evolve(myTrainingSet, {
 *  iterations: 10,
 *  selection: new TournamentSelection() // eg.
 * });
 */

var TournamentSelection =
/** @class */
function (_super) {
  __extends(TournamentSelection, _super);
  /**
   * Constructs a tournament selection.
   * @param size the size of a tournament
   * @param probability Selects the best individual (when probability = 1).
   */


  function TournamentSelection(size, probability) {
    if (size === void 0) {
      size = 5;
    }

    if (probability === void 0) {
      probability = 0.5;
    }

    var _this = _super.call(this) || this;

    _this.size = size;
    _this.probability = probability;
    return _this;
  }

  TournamentSelection.prototype.select = function (population) {
    if (this.size > population.length) {
      throw new Error("Your tournament size should be lower than the population size, please change methods.selection.TOURNAMENT.size");
    } // Create a tournament


    var individuals = [];

    for (var i = 0; i < this.size; i++) {
      individuals.push(Utils_1.pickRandom(population));
    } // Sort the tournament individuals by score


    individuals.sort(function (a, b) {
      return b.score === undefined || a.score === undefined ? 0 : b.score - a.score;
    }); // Select an individual

    for (var i = 0; i < this.size; i++) {
      if (Math.random() < this.probability || i === this.size - 1) {
        return individuals[i];
      }
    }

    return Utils_1.pickRandom(population);
  };

  return TournamentSelection;
}(Selection);

exports.TournamentSelection = TournamentSelection;
},{"./Utils":"../src/methods/Utils.js"}],"../src/NEAT.js":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Network_1 = require("./architecture/Network");

var Activation_1 = require("./methods/Activation");

var Mutation_1 = require("./methods/Mutation");

var Selection_1 = require("./methods/Selection");

var Utils_1 = require("./methods/Utils");
/**
 * Runs the NEAT algorithm on group of neural networks.
 *
 * @constructs Neat
 *
 * @private
 *
 * @param {Array<{input:number[],output:number[]}>} [dataset] A set of input values and ideal output values to evaluate a genome's fitness with. Must be included to use `NEAT.evaluate` without passing a dataset
 * @param {EvolveOptions} options - Configuration options
 * @param {number} input - The input size of `template` networks.
 * @param {number} output - The output size of `template` networks.
 * @param {boolean} [options.equal=false] When true [crossover](Network.crossOver) parent genomes are assumed to be equally fit and offspring are built with a random amount of neurons within the range of parents' number of neurons. Set to false to select the "fittest" parent as the neuron amount template.
 * @param {number} [options.clear=false] Clear the context of the population's nodes, basically reverting them to 'new' neurons. Useful for predicting timeseries with LSTM's.
 * @param {number} [options.populationSize=50] Population size of each generation.
 * @param {number} [options.growth=0.0001] Set the penalty for large networks. Penalty calculation: penalty = (genome.nodes.length + genome.connectoins.length + genome.gates.length) * growth; This penalty will get added on top of the error. Your growth should be a very small number.
 * @param {Loss} [options.loss=new MSELoss()]  Specify the cost function for the evolution, this tells a genome in the population how well it's performing. Default: methods.new MSELoss() (recommended).
 * @param {number} [options.amount=1] Set the amount of times to test the trainingset on a genome each generation. Useful for timeseries. Do not use for regular feedfoward problems.
 * @param {number} [options.elitism=1] Elitism of every evolution loop. [Elitism in genetic algortihtms.](https://www.researchgate.net/post/What_is_meant_by_the_term_Elitism_in_the_Genetic_Algorithm)
 * @param {number} [options.provenance=0] Number of genomes inserted the original network template (Network(input,output)) per evolution.
 * @param {number} [options.mutationRate=0.4] Sets the mutation rate. If set to 0.3, 30% of the new population will be mutated. Default is 0.4.
 * @param {number} [options.mutationAmount=1] If mutation occurs (randomNumber < mutationRate), sets amount of times a mutation method will be applied to the network.
 * @param {boolean} [options.fitnessPopulation=false] Flag to return the fitness of a population of genomes. Set this to false to evaluate each genome inidividually.
 * @param {((dataset: { input: number[]; output: number[] }[], population: Network[]) => Promise<void>)} [options.fitness] - A fitness function to evaluate the networks. Takes a `dataset` and a `genome` i.e. a [network](Network) or a `population` i.e. an array of networks and sets the genome `.score` property
 * @param {string} [options.selection=FITNESS_PROPORTIONATE] [Selection method](selection) for evolution (e.g. Selection.FITNESS_PROPORTIONATE).
 * @param {Array} [options.crossover] Sets allowed crossover methods for evolution.
 * @param {Network} [options.network=false] Network to start evolution from
 * @param {number} [options.maxNodes=Infinity] Maximum nodes for a potential network
 * @param {number} [options.maxConnections=Infinity] Maximum connections for a potential network
 * @param {number} [options.maxGates=Infinity] Maximum gates for a potential network
 * @param {Mutation[]} [options.mutation] Sets allowed [mutation methods](mutation) for evolution, a random mutation method will be chosen from the array when mutation occurs. Optional, but default methods are non-recurrent
 *
 * @prop {number} generation A count of the generations
 * @prop {Network[]} population The current population for the neat instance. Accessible through `neat.population`
 *
 * @example
 * let { Neat } = require("@liquid-carrot/carrot");
 *
 * let neat = new Neat(dataset, {
 *   elitism: 10,
 *   clear: true,
 *   populationSize: 1000
 * });
 */


var NEAT =
/** @class */
function () {
  function NEAT(options) {
    if (options === void 0) {
      options = {};
    }

    if (!options.fitnessFunction) {
      throw new ReferenceError("No fitness function given!");
    }

    this.dataset = options.dataset;
    this.input = options.dataset && options.dataset.length > 0 ? options.dataset[0].input.length : 0;
    this.output = options.dataset && options.dataset.length > 0 ? options.dataset[0].output.length : 0;
    this.generation = Utils_1.getOrDefault(options.generation, 0);
    this.equal = Utils_1.getOrDefault(options.equal, true);
    this.clear = Utils_1.getOrDefault(options.clear, false);
    this.populationSize = Utils_1.getOrDefault(options.populationSize, 50);
    this.elitism = Utils_1.getOrDefault(options.elitism, 2);
    this.provenance = Utils_1.getOrDefault(options.provenance, 0);
    this.mutationRate = Utils_1.getOrDefault(options.mutationRate, 0.6);
    this.mutationAmount = Utils_1.getOrDefault(options.mutationAmount, 5);
    this.fitnessFunction = options.fitnessFunction;
    this.selection = Utils_1.getOrDefault(options.selection, new Selection_1.FitnessProportionateSelection());
    this.mutations = Utils_1.getOrDefault(options.mutations, Mutation_1.FEEDFORWARD_MUTATIONS);
    this.activations = Utils_1.getOrDefault(options.activations, Activation_1.ALL_ACTIVATIONS);
    this.template = Utils_1.getOrDefault(options.template, new Network_1.Network(this.input, this.output));
    this.maxNodes = Utils_1.getOrDefault(options.maxNodes, Infinity);
    this.maxConnections = Utils_1.getOrDefault(options.maxConnections, Infinity);
    this.maxGates = Utils_1.getOrDefault(options.maxGates, Infinity);
    this.population = [];
    this.createInitialPopulation();
  }

  NEAT.prototype.filterGenome = function (population, template, pickGenome, adjustGenome) {
    var filtered = __spreadArrays(population); // avoid mutations


    if (adjustGenome) {
      filtered.filter(function (genome) {
        return pickGenome(genome);
      }).forEach(function (genome, index) {
        return filtered[index] = adjustGenome(filtered[index]);
      });
    } else {
      filtered.filter(function (genome) {
        return pickGenome(genome);
      }).forEach(function (genome, index) {
        return filtered[index] = template.copy();
      });
    }

    return filtered;
  };

  NEAT.prototype.mutateRandom = function (genome, possible) {
    if (possible === void 0) {
      possible = Mutation_1.ALL_MUTATIONS;
    }

    var maxNodes = this.maxNodes;
    var maxConnections = this.maxConnections;
    var maxGates = this.maxGates;
    possible = possible.filter(function (method) {
      return method.constructor.name !== Mutation_1.AddNodeMutation.constructor.name || genome.nodes.length < maxNodes || method.constructor.name !== Mutation_1.AddConnectionMutation.constructor.name || genome.connections.length < maxConnections || method.constructor.name !== Mutation_1.AddGateMutation.constructor.name || genome.gates.length < maxGates;
    });
    genome.mutate(Utils_1.pickRandom(possible), {
      allowedActivations: this.activations
    });
  };
  /**
   * Evaluates, selects, breeds and mutates population
   *
   * @param {function} [pickGenome] A custom selection function to pick out unwanted genomes. Accepts a network as a parameter and returns true for selection.
   * @param {function} [adjustGenome=self.template] Accepts a network, modifies it, and returns it. Used to modify unwanted genomes returned by `pickGenome` and reincorporate them into the population. If left unset, unwanted genomes will be replaced with the template Network. Will only run when pickGenome is defined.
   *
   * @returns {Network} Fittest network
   *
   * @example
   * let neat = new Neat(dataset, {
   *  elitism: 10,
   *  clear: true,
   *  populationSize: 1000
   * });
   *
   * let filter = function(genome) {
   *  // Remove genomes with more than 100 nodes
   *  return genome.nodes.length > 100 ? true : false
   * }
   *
   * let adjust = function(genome) {
   *  // clear the nodes
   *  return genome.clear()
   * }
   *
   * neat.evolve(evolveSet, filter, adjust).then(function(fittest) {
   *  console.log(fittest)
   * })
   */


  NEAT.prototype.evolve = function (pickGenome, adjustGenome) {
    return __awaiter(this, void 0, void 0, function () {
      var elitists, i, newPopulation, i, fittest;

      var _a;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            // Check if evolve is possible
            if (this.elitism + this.provenance > this.populationSize) {
              throw new Error("Can`t evolve! Elitism + provenance exceeds population size!");
            }

            if (!(this.population[this.population.length - 1].score === undefined)) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , this.evaluate()];

          case 1:
            _b.sent();

            _b.label = 2;

          case 2:
            if (pickGenome) {
              this.population = this.filterGenome(this.population, this.template, pickGenome, adjustGenome);
            } // Sort in order of fitness (fittest first)


            this.sort();
            elitists = [];

            for (i = 0; i < this.elitism; i++) {
              elitists.push(this.population[i]);
            }

            newPopulation = Array(this.provenance).fill(this.template.copy()); // Breed the next individuals

            for (i = 0; i < this.populationSize - this.elitism - this.provenance; i++) {
              newPopulation.push(this.getOffspring());
            } // Replace the old population with the new population


            this.population = newPopulation; // Mutate the new population

            this.mutate(); // Add the elitists

            (_a = this.population).push.apply(_a, elitists); // evaluate the population


            return [4
            /*yield*/
            , this.evaluate()];

          case 3:
            // evaluate the population
            _b.sent(); // Check & adjust genomes as needed


            if (pickGenome) {
              this.population = this.filterGenome(this.population, this.template, pickGenome, adjustGenome);
            } // Sort in order of fitness (fittest first)


            this.sort();
            fittest = this.population[0].copy();
            fittest.score = this.population[0].score; // Reset the scores

            this.population.forEach(function (genome) {
              return genome.score = undefined;
            });
            this.generation++;
            return [2
            /*return*/
            , fittest];
        }
      });
    });
  };
  /**
   * Selects two genomes from the population with `getParent()`, and returns the offspring from those parents. NOTE: Population MUST be sorted
   *
   * @returns {Network} Child network
   */


  NEAT.prototype.getOffspring = function () {
    this.sort();
    var parent1 = this.selection.select(this.population);
    var parent2 = this.selection.select(this.population);

    if (parent1 === null || parent2 === null) {
      throw new ReferenceError("Should not be null!");
    }

    return Network_1.Network.crossOver(parent1, parent2, this.equal);
  };
  /**
   * Mutates the given (or current) population
   *
   * @param {Mutation} [method] A mutation method to mutate the population with. When not specified will pick a random mutation from the set allowed mutations.
   */


  NEAT.prototype.mutate = function (method) {
    var _this = this;

    if (method) {
      // Elitist genomes should not be included
      this.population.filter(function () {
        return Math.random() <= _this.mutationRate;
      }).forEach(function (genome) {
        for (var i = 0; i < _this.mutationAmount; i++) {
          genome.mutate(method);
        }
      });
    } else {
      // Elitist genomes should not be included
      this.population.filter(function () {
        return Math.random() <= _this.mutationRate;
      }).forEach(function (genome) {
        for (var i = 0; i < _this.mutationAmount; i++) {
          _this.mutateRandom(genome, _this.mutations);
        }
      });
    }
  };
  /**
   * Evaluates the current population, basically sets their `.score` property
   *
   * @return {Network} Fittest Network
   */


  NEAT.prototype.evaluate = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (this.clear) {
              this.population.forEach(function (genome) {
                return genome.clear();
              });
            }

            return [4
            /*yield*/
            , this.fitnessFunction(this.population, this.dataset)];

          case 1:
            _a.sent(); // Sort the population in order of fitness


            this.sort();
            return [2
            /*return*/
            , this.population[0]];
        }
      });
    });
  };
  /**
   * Sorts the population by score
   */


  NEAT.prototype.sort = function () {
    this.population.sort(function (a, b) {
      return a.score === undefined || b.score === undefined ? 0 : b.score - a.score;
    });
  };
  /**
   * Returns the fittest genome of the current population
   *
   * @returns {Network} Current population's fittest genome
   */


  NEAT.prototype.getFittest = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!(this.population[this.population.length - 1].score === undefined)) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , this.evaluate()];

          case 1:
            _a.sent();

            _a.label = 2;

          case 2:
            this.sort();
            return [2
            /*return*/
            , this.population[0]];
        }
      });
    });
  };
  /**
   * Returns the average fitness of the current population
   *
   * @returns {number} Average fitness of the current population
   */


  NEAT.prototype.getAverage = function () {
    return __awaiter(this, void 0, void 0, function () {
      var score;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!(this.population[this.population.length - 1].score === undefined)) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , this.evaluate()];

          case 1:
            _a.sent();

            _a.label = 2;

          case 2:
            score = 0;
            this.population.map(function (genome) {
              return genome.score;
            }).forEach(function (val) {
              return score += val !== null && val !== void 0 ? val : 0;
            });
            return [2
            /*return*/
            , score / this.population.length];
        }
      });
    });
  };
  /**
   * Create the initial pool of genomes
   */


  NEAT.prototype.createInitialPopulation = function () {
    for (var i = 0; i < this.populationSize; i++) {
      this.population.push(this.template.copy());
    }
  };

  return NEAT;
}();

exports.NEAT = NEAT;
},{"./architecture/Network":"../src/architecture/Network.js","./methods/Activation":"../src/methods/Activation.js","./methods/Mutation":"../src/methods/Mutation.js","./methods/Selection":"../src/methods/Selection.js","./methods/Utils":"../src/methods/Utils.js"}],"../src/architecture/Network.js":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var NodeType_1 = require("../enums/NodeType");

var Loss_1 = require("../methods/Loss");

var Mutation_1 = require("../methods/Mutation");

var Rate_1 = require("../methods/Rate");

var Utils_1 = require("../methods/Utils");

var NEAT_1 = require("../NEAT");

var Connection_1 = require("./Connection");

var Node_1 = require("./Node");
/**
 * Create a neural network
 *
 * Networks are easy to create, all you need to specify is an `input` and an `output` size.
 *
 * @constructs Network
 *
 * @param {number} inputSize Size of input layer AKA neurons in input layer
 * @param {number} outputSize Size of output layer AKA neurons in output layer
 *
 * @prop {number} inputSize Size of input layer AKA neurons in input layer
 * @prop {number} outputSize Size of output layer AKA neurons in output layer
 * @prop {Array<Node>} nodes Nodes currently within the network
 * @prop {Array<Node>} gates Gates within the network
 * @prop {Array<Connection>} connections Connections within the network
 *
 * @example
 * let { Network } = require("@liquid-carrot/carrot");
 *
 * // Network with 2 input neurons and 1 output neuron
 * let myNetwork = new Network(2, 1);
 */


var Network =
/** @class */
function () {
  function Network(inputSize, outputSize) {
    this.inputSize = inputSize;
    this.outputSize = outputSize;
    this.nodes = [];
    this.connections = [];
    this.gates = [];
    this.score = undefined; // Create input and output nodes

    for (var i = 0; i < inputSize; i++) {
      this.nodes.push(new Node_1.Node(NodeType_1.NodeType.INPUT));
    }

    for (var i = 0; i < outputSize; i++) {
      this.nodes.push(new Node_1.Node(NodeType_1.NodeType.OUTPUT));
    } // Connect input and output nodes


    for (var i = 0; i < this.inputSize; i++) {
      for (var j = this.inputSize; j < this.outputSize + this.inputSize; j++) {
        // https://stats.stackexchange.com/a/248040/147931
        var weight = (Math.random() - 0.5) * this.inputSize * Math.sqrt(2 / this.inputSize);
        this.connect(this.nodes[i], this.nodes[j], weight);
      }
    }
  }
  /**
   * Convert a json object to a network
   *
   * @param {{input:{number},output:{number},dropout:{number},nodes:Array<object>,connections:Array<object>}} json A network represented as a json object
   *
   * @returns {Network} Network A reconstructed network
   *
   * @example
   * let { Network } = require("@liquid-carrot/carrot");
   *
   * let exported = myNetwork.toJSON();
   * let imported = Network.fromJSON(exported) // imported will be a new instance of Network that is an exact clone of myNetwork
   */


  Network.fromJSON = function (json) {
    var network = new Network(json.inputSize, json.outputSize);
    network.nodes = [];
    network.connections = [];
    json.nodes.map(function (nodeJSON) {
      return new Node_1.Node().fromJSON(nodeJSON);
    }).forEach(function (node) {
      return network.nodes[node.index] = node;
    });
    json.connections.forEach(function (jsonConnection) {
      var connection = network.connect(network.nodes[jsonConnection.fromIndex], network.nodes[jsonConnection.toIndex], jsonConnection.weight);

      if (jsonConnection.gateNodeIndex != null) {
        network.addGate(network.nodes[jsonConnection.gateNodeIndex], connection);
      }
    });
    return network;
  };
  /**
   * Create an offspring from two parent networks.
   *
   * Networks are not required to have the same size, however input and output size should be the same!
   *
   * @todo Add custom [crossover](crossover) method customization
   *
   * @param {Network} network1 First parent network
   * @param {Network} network2 Second parent network
   * @param {boolean} [equal] Flag to indicate equally fit Networks
   *
   * @returns {Network} New network created from mixing parent networks
   */


  Network.crossOver = function (network1, network2, equal) {
    var _a, _b;

    if (network1.inputSize !== network2.inputSize || network1.outputSize !== network2.outputSize) {
      throw new Error("Networks don`t have the same input/output size!");
    } // Initialise offspring


    var offspring = new Network(network1.inputSize, network1.outputSize);
    offspring.connections = []; // clear

    offspring.nodes = []; // clear
    // Save scores and create a copy

    var score1 = (_a = network1.score) !== null && _a !== void 0 ? _a : 0;
    var score2 = (_b = network2.score) !== null && _b !== void 0 ? _b : 0; // Determine offspring node size

    var offspringSize;

    if (equal || score1 === score2) {
      var max = Math.max(network1.nodes.length, network2.nodes.length);
      var min = Math.min(network1.nodes.length, network2.nodes.length);
      offspringSize = Utils_1.randInt(min, max + 1); // [min,max]
    } else if (score1 > score2) {
      offspringSize = network1.nodes.length;
    } else {
      offspringSize = network2.nodes.length;
    }

    var inputSize = network1.inputSize;
    var outputSize = network1.outputSize; // set node indices

    for (var i = 0; i < network1.nodes.length; i++) {
      network1.nodes[i].index = i;
    } // set node indices


    for (var i = 0; i < network2.nodes.length; i++) {
      network2.nodes[i].index = i;
    } // Assign nodes from parents to offspring


    for (var i = 0; i < offspringSize; i++) {
      var chosenNode = void 0;
      var chosenNodeType = null; // decide what type of node is needed first check for input and output nodes and fill up with hidden nodes

      if (i < inputSize) {
        // pick input node
        chosenNodeType = NodeType_1.NodeType.INPUT;
        var sourceNetwork = Utils_1.randBoolean() ? network1 : network2;
        var inputNumber = -1;
        var j = -1;

        while (inputNumber < i) {
          if (j++ >= sourceNetwork.nodes.length) {
            throw RangeError('something is wrong with the size of the input');
          }

          if (sourceNetwork.nodes[j].isInputNode()) {
            inputNumber++;
          }
        }

        chosenNode = sourceNetwork.nodes[j];
      } else if (i < inputSize + outputSize) {
        // pick output node
        chosenNodeType = NodeType_1.NodeType.OUTPUT;
        var sourceNetwork = Utils_1.randBoolean() ? network1 : network2;
        var outputNumber = -1;
        var j = -1;

        while (outputNumber < i - inputSize) {
          j++;

          if (j >= sourceNetwork.nodes.length) {
            throw RangeError('something is wrong with the size of the output');
          }

          if (sourceNetwork.nodes[j].isOutputNode()) {
            outputNumber++;
          }
        }

        chosenNode = sourceNetwork.nodes[j];
      } else {
        // pick hidden node
        chosenNodeType = NodeType_1.NodeType.HIDDEN;
        var sourceNetwork = void 0;

        if (i >= network1.nodes.length) {
          sourceNetwork = network2;
        } else if (i >= network2.nodes.length) {
          sourceNetwork = network1;
        } else {
          sourceNetwork = Utils_1.randBoolean() ? network1 : network2;
        }

        chosenNode = Utils_1.pickRandom(sourceNetwork.nodes);
      }

      var newNode = new Node_1.Node(chosenNodeType);
      newNode.bias = chosenNode.bias;
      newNode.squash = chosenNode.squash;
      offspring.nodes.push(newNode);
    } // Create arrays of connection genes


    var n1connections = [];
    var n2connections = []; // Add the connections of network 1

    network1.connections.forEach(function (connection) {
      n1connections[Connection_1.Connection.innovationID(connection.from.index, connection.to.index)] = connection.toJSON();
    }); // Add the connections of network 2

    network2.connections.forEach(function (connection) {
      n2connections[Connection_1.Connection.innovationID(connection.from.index, connection.to.index)] = connection.toJSON();
    }); // Split common conn genes from disjoint or excess conn genes

    var connections = [];
    var keys1 = Object.keys(n1connections);
    var keys2 = Object.keys(n2connections);

    for (var i = keys1.length - 1; i >= 0; i--) {
      if (n2connections[parseInt(keys1[i])] !== undefined) {
        connections.push(Utils_1.randBoolean() ? n1connections[parseInt(keys1[i])] : n2connections[parseInt(keys1[i])]);
        n2connections[parseInt(keys1[i])] = undefined;
      } else if (score1 >= score2 || equal) {
        connections.push(n1connections[parseInt(keys1[i])]);
      }
    } // Excess/disjoint gene


    if (score2 >= score1 || equal) {
      keys2.map(function (key) {
        return parseInt(key);
      }) // convert to numbers
      .map(function (key) {
        return n2connections[key];
      }) // get the connection
      .filter(function (conn) {
        return conn !== undefined;
      }) // filter out undefined connections
      .forEach(function (conn) {
        return connections.push(conn);
      }); // add the filtered connections
    } // Add common conn genes uniformly


    connections.forEach(function (connectionJSON) {
      if (connectionJSON !== undefined && connectionJSON.toIndex < offspringSize && connectionJSON.fromIndex < offspringSize) {
        var from = offspring.nodes[connectionJSON.fromIndex];
        var to = offspring.nodes[connectionJSON.toIndex];
        var connection = offspring.connect(from, to, connectionJSON.weight);

        if (connectionJSON.gateNodeIndex !== null && connectionJSON.gateNodeIndex < offspringSize) {
          offspring.addGate(offspring.nodes[connectionJSON.gateNodeIndex], connection);
        }
      }
    });
    return offspring;
  };
  /**
   * Returns a copy of Network.
   *
   * @returns {Network} Returns an identical network
   */


  Network.prototype.copy = function () {
    return Network.fromJSON(this.toJSON());
  };
  /**
   * Connects a Node to another Node or Group in the network
   *
   * @param {Node} from The source Node
   * @param {Node} to The destination Node or Group
   * @param {number} [weight=0] An initial weight for the connections to be formed
   *
   * @returns {Connection[]} An array of the formed connections
   *
   * @example
   * myNetwork.connect(myNetwork.nodes[4], myNetwork.nodes[5]); // connects network node 4 to network node 5
   */


  Network.prototype.connect = function (from, to, weight) {
    if (weight === void 0) {
      weight = 0;
    }

    var connection = from.connect(to, weight); // run node-level connect

    this.connections.push(connection); // add it to the array

    return connection;
  };
  /**
   * Activates the network
   *
   * It will activate all the nodes in activation order and produce an output.
   *
   * @function activate
   * @memberof Network
   *
   * @param {number[]} [input] Input values to activate nodes with
   * @param options
   * @param {number} [options.dropoutRate=0] The dropout rate. [dropout](https://medium.com/@amarbudhiraja/https-medium-com-amarbudhiraja-learning-less-to-learn-better-dropout-in-deep-machine-learning-74334da4bfc5)
   * @param {boolean} [options.trace=true] Controls whether traces are created when activation happens (a trace is meta information left behind for different uses, e.g. backpropagation).
   * @returns {number[]} Squashed output values
   *
   * @example
   * let { Network } = require("@liquid-carrot/carrot");
   *
   * // Create a network
   * let myNetwork = new Network(3, 2);
   *
   * myNetwork.activate([0.8, 1, 0.21]); // gives: [0.49, 0.51]
   */


  Network.prototype.activate = function (input, options) {
    if (options === void 0) {
      options = {};
    }

    if (input.length !== this.inputSize) {
      throw new RangeError("Input size of dataset is different to network input size!");
    } // get default value if no value is given


    options.dropoutRate = Utils_1.getOrDefault(options.dropoutRate, 0);
    options.trace = Utils_1.getOrDefault(options.trace, true);
    this.nodes.filter(function (node) {
      return node.isInputNode();
    }) // only input nodes
    .forEach(function (node, index) {
      return node.activate(input[index], options.trace);
    }); // activate them with the input

    this.nodes.filter(function (node) {
      return node.isHiddenNode();
    }) // only hidden nodes
    .forEach(function (node) {
      if (options.dropoutRate) {
        node.mask = Math.random() >= options.dropoutRate ? 1 : 0;
      }

      node.activate(undefined, options.trace); // activate them
    });
    return this.nodes.filter(function (node) {
      return node.isOutputNode();
    }) // only output nodes
    .map(function (node) {
      return node.activate(undefined, options.trace);
    }); // map them to there activation value will give the network's output
  };
  /**
   * Backpropagate the network
   *
   * This function allows you to teach the network. If you want to do more complex training, use the `network.train()` function.
   *
   * @function propagate
   * @memberof Network
   *
   * @param {number[]} target Ideal values of the previous activate. Will use the difference to improve the weights
   * @param options More option for propagation
   * @param {number} options.momentum=0 [Momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html). Adds a fraction of the previous weight update to the current one.
   * @param {boolean} options.update=false When set to false weights won't update, but when set to true after being false the last propagation will include the deltaweights of the first "update:false" propagations too.
   * @param {number} options.rate=0.3 Sets the [learning rate](https://towardsdatascience.com/understanding-learning-rates-and-how-it-improves-performance-in-deep-learning-d0d4059c1c10) of the backpropagation process
   *
   * @example
   * let { Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(1,1);
   *
   * // This trains the network to function as a NOT gate
   * for(let nodeIndex: number= 0; i < 1000; i++){
   *  network.activate([0]);
   *  network.propagate(0.2, 0, true, [1]);
   *  network.activate([1]);
   *  network.propagate(0.3, 0, true, [0]);
   * }
   */


  Network.prototype.propagate = function (target, options) {
    if (options === void 0) {
      options = {};
    } // get default value if value isn't given


    options.rate = Utils_1.getOrDefault(options.rate, 0.3);
    options.momentum = Utils_1.getOrDefault(options.momentum, 0);
    options.update = Utils_1.getOrDefault(options.update, false);

    if (target.length !== this.outputSize) {
      throw new Error("Output target length should match network output length");
    } // Backpropagation: output -> hidden -> input
    // propagate through the output nodes


    this.nodes.filter(function (node) {
      return node.isOutputNode();
    }) // only output nodes
    .forEach(function (node, index) {
      return node.propagate(target[index], options);
    }); // propagate
    // propagate backwards through the hidden nodes

    for (var i = this.nodes.length - 1; i >= 0; i--) {
      if (this.nodes[i].isHiddenNode()) {
        // only hidden nodes
        this.nodes[i].propagate(undefined, options);
      }
    } // propagate through the input nodes


    this.nodes.filter(function (node) {
      return node.isInputNode();
    }) // only input nodes
    .forEach(function (node) {
      return node.propagate(undefined, options);
    }); // propagate
  };
  /**
   * Clear the context of the network
   *
   * @function clear
   * @memberof Network
   */


  Network.prototype.clear = function () {
    this.nodes.forEach(function (node) {
      return node.clear();
    });
  };
  /**
   * Removes the connection of the `from` node to the `to` node
   *
   * @function disconnect
   * @memberof Network
   *
   * @param {Node} from Source node
   * @param {Node} to Destination node
   *
   * @example
   * myNetwork.disconnect(myNetwork.nodes[4], myNetwork.nodes[5]);
   * // now node 4 does not have an effect on the output of node 5 anymore
   */


  Network.prototype.disconnect = function (from, to) {
    var _this = this; // remove the connection network-level


    this.connections.filter(function (conn) {
      return conn.from === from;
    }) // check for incoming node
    .filter(function (conn) {
      return conn.to === to;
    }) // check for outgoing node
    .forEach(function (conn) {
      if (conn.gateNode !== null) {
        _this.removeGate(conn); // remove possible gate

      }

      Utils_1.removeFromArray(_this.connections, conn); // remove connection from array
    }); // disconnect node-level

    return from.disconnect(to);
  };
  /**
   * Makes a network node gate a connection
   *
   * @function gate
   * @memberof Network
   *
   * @todo Add ability to gate several network connections at once
   *
   * @param {Node} node Gating node
   * @param {Connection} connection Connection to gate with node
   *
   * @example
   * let { Network } = require("@liquid-carrot/carrot");
   *
   * myNetwork.gate(myNetwork.nodes[1], myNetwork.connections[5])
   * // now: connection 5's weight is multiplied with node 1's activaton
   */


  Network.prototype.addGate = function (node, connection) {
    if (this.nodes.indexOf(node) === -1) {
      throw new ReferenceError("This node is not part of the network!");
    } else if (connection.gateNode != null) {
      return;
    }

    node.addGate(connection);
    this.gates.push(connection);
  };
  /**
   * Remove the gate of a connection.
   *
   * @function ungate
   * @memberof Network
   *
   * @param {Connection} connection Connection to remove gate from
   */


  Network.prototype.removeGate = function (connection) {
    if (!this.gates.includes(connection)) {
      throw new Error("This connection is not gated!");
    }

    Utils_1.removeFromArray(this.gates, connection);

    if (connection.gateNode != null) {
      connection.gateNode.removeGate(connection);
    }
  };
  /**
   * Removes a node from a network, all its connections will be redirected. If it gates a connection, the gate will be removed.
   *
   * @function remove
   * @memberof Network
   *
   * @param {Node} node Node to remove from the network
   * @param keepGates
   */


  Network.prototype.removeNode = function (node, keepGates) {
    var _this = this;

    if (keepGates === void 0) {
      keepGates = new Mutation_1.SubNodeMutation().keepGates;
    }

    if (!this.nodes.includes(node)) {
      throw new ReferenceError("This node does not exist in the network!");
    }

    this.disconnect(node, node); // remove self connection

    var inputs = []; // keep track

    var gates = []; // keep track

    var outputs = []; // keep track

    var connections = []; // keep track
    // read all inputs from node and keep track of the nodes that gate the incoming connection

    for (var i = node.incoming.length - 1; i >= 0; i--) {
      var connection = node.incoming[i];

      if (keepGates && connection.gateNode !== null && connection.gateNode !== node) {
        gates.push(connection.gateNode);
      }

      inputs.push(connection.from);
      this.disconnect(connection.from, node);
    } // read all outputs from node and keep track of the nodes that gate the outgoing connection


    for (var i = node.outgoing.length - 1; i >= 0; i--) {
      var connection = node.outgoing[i];

      if (keepGates && connection.gateNode !== null && connection.gateNode !== node) {
        gates.push(connection.gateNode);
      }

      outputs.push(connection.to);
      this.disconnect(node, connection.to);
    } // add all connections the node has


    inputs.forEach(function (input) {
      outputs.forEach(function (output) {
        if (!input.isProjectingTo(output)) {
          connections.push(_this.connect(input, output));
        }
      });
    }); // as long as there are gates and connections

    while (gates.length > 0 && connections.length > 0) {
      var gate = gates.shift(); // take a gate node and remove it from the array

      if (gate === undefined) {
        continue;
      }

      var connection = Utils_1.pickRandom(connections); // take a random connection

      this.addGate(gate, connection); // gate the connection with the gate node

      Utils_1.removeFromArray(connections, connection); // remove the connection from the array
    } // remove every gate the node has


    for (var i = node.gated.length - 1; i >= 0; i--) {
      this.removeGate(node.gated[i]);
    }

    Utils_1.removeFromArray(this.nodes, node); // remove the node from the nodes array
  };
  /**
   * Mutates the network with the given method.
   *
   * @function mutate
   * @memberof Network
   *
   * @param {Mutation} method [Mutation method](mutation)
   * @param {object} options
   * @param {number} [options.maxNodes] Maximum amount of [Nodes](node) a network can grow to
   * @param {number} [options.maxConnections] Maximum amount of [Connections](connection) a network can grow to
   * @param {number} [options.maxGates] Maximum amount of Gates a network can grow to
   *
   * @example
   * let { Network } = require("@liquid-carrot/carrot");
   *
   * myNetwork = myNetwork.mutate(new AddNodeMutation()) // returns a mutated network with an added gate
   */


  Network.prototype.mutate = function (method, options) {
    method.mutate(this, options);
  };
  /**
   * Selects a random mutation method and returns a mutated copy of the network. Warning! Mutates network directly.
   *
   * @function mutateRandom
   *
   * @memberof Network
   *
   * @param {Mutation[]} [allowedMethods=methods.mutation.ALL] An array of [Mutation methods](mutation) to automatically pick from
   * @param {object} options
   * @param {number} [options.maxNodes] Maximum amount of [Nodes](node) a network can grow to
   * @param {number} [options.maxConnections] Maximum amount of [Connections](connection) a network can grow to
   * @param {number} [options.maxGates] Maximum amount of Gates a network can grow to
   */


  Network.prototype.mutateRandom = function (allowedMethods, options) {
    if (allowedMethods === void 0) {
      allowedMethods = Mutation_1.ALL_MUTATIONS;
    }

    if (options === void 0) {
      options = {};
    }

    if (allowedMethods.length === 0) {
      return;
    } // mutate the network with a random allowed mutation


    this.mutate(Utils_1.pickRandom(allowedMethods), options);
  };
  /**
   * Train the given data to this network
   *
   * @function train
   * @memberof Network
   *
   * @param {Array<{input:number[],output:number[]}>} dataset A data of input values and ideal output values to train the network with
   * @param {TrainOptions} options Options used to train network
   * @param {options.loss} [options.loss=new MSELoss()] The [options.loss function](https://en.wikipedia.org/wiki/Loss_function) used to determine network error
   * @param {rate} [options.ratePolicy=new FixedRate(options.rate)] A [learning rate policy](https://towardsdatascience.com/understanding-learning-rates-and-how-it-improves-performance-in-deep-learning-d0d4059c1c10), i.e. how to change the learning rate during training to get better network performance
   * @param {number} [options.rate=0.3] Sets the [learning rate](https://towardsdatascience.com/understanding-learning-rates-and-how-it-improves-performance-in-deep-learning-d0d4059c1c10) of the backpropagation process
   * @param {number} [options.iterations=1000] Sets amount of training cycles the process will maximally run, even when the target error has not been reached.
   * @param {number} [options.error] The target error to train for, once the network falls below this error, the process is stopped. Lower error rates require more training cycles.
   * @param {number} [options.dropout=0] [Dropout rate](https://medium.com/@amarbudhiraja/https-medium-com-amarbudhiraja-learning-less-to-learn-better-options.dropout-in-deep-machine-learning-74334da4bfc5) likelihood for any given neuron to be ignored during network training. Must be between zero and one, numbers closer to one will result in more neurons ignored.
   * @param {number} [options.momentum=0] [Momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html). Adds a fraction of the previous weight update to the current one.
   * @param {number} [options.batchSize=1] Sets the (mini-) batch size of your training. Default: 1 [(online training)](https://www.quora.com/What-is-the-difference-between-batch-online-and-mini-batch-training-in-neural-networks-Which-one-should-I-use-for-a-small-to-medium-sized-dataset-for-prediction-purposes)
   * @param {number} [options.crossValidate.testSize] Sets the amount of test cases that should be assigned to cross validation. If data to 0.4, 40% of the given data will be used for cross validation.
   * @param {number} [options.crossValidate.testError] Sets the target error of the validation data.
   * @param {boolean} [options.clear=false] If set to true, will clear the network after every activation. This is useful for training LSTM's, more importantly for timeseries prediction.
   * @param {boolean} [options.shuffle=false] When set to true, will shuffle the training data every iterationNumber. Good option to use if the network is performing worse in [cross validation](https://artint.info/html/ArtInt_189.html) than in the real training data.
   * @param {number|boolean} [options.log=false] If set to n, outputs training status every n iterations. Setting `log` to 1 will log the status every iteration_number
   * @param {number} [options.schedule.iterations] You can schedule tasks to happen every n iterations. Paired with `options.schedule.function`
   * @param {schedule} [options.schedule.function] A function to run every n iterations as data by `options.schedule.iterations`. Passed as an object with a "function" property that contains the function to run.
   *
   * @returns {{error:{number},iterations:{number},time:{number}}} A summary object of the network's performance
   *
   * @example <caption>Training with Defaults</caption>
   * let { Network } = require("@liquid-carrot/carrot");
   *
   * let network = new Network(2, 1);
   *
   * // Train the XOR gate
   * network.train([{ input: [0,0], output: [0] },
   *                { input: [0,1], output: [1] },
   *                { input: [1,0], output: [1] },
   *                { input: [1,1], output: [0] }]);
   *
   * network.activate([0,1]); // 0.9824...
   *
   * @example <caption>Training with Options</caption>
   * let { Network } = require("@liquid-carrot/carrot");
   *
   * let network = new Network(2, 1);
   *
   * let trainingSet = [
   *    { input: [0,0], output: [0] },
   *    { input: [0,1], output: [1] },
   *    { input: [1,0], output: [1] },
   *    { input: [1,1], output: [0] }
   * ];
   *
   * // Train the XNOR gate
   * network.train(trainingSet, {
   *    log: 1,
   *    iterations: 1000,
   *    error: 0.0001,
   *    rate: 0.2
   * });
   *
   * @example <caption>Cross Validation Example</caption>
   * let { Network } = require("@liquid-carrot/carrot");
   *
   * let network = new Network(2,1);
   *
   * let trainingSet = [ // PS: don't use cross validation for small sets, this is just an example
   *  { input: [0,0], output: [1] },
   *  { input: [0,1], output: [0] },
   *  { input: [1,0], output: [0] },
   *  { input: [1,1], output: [1] }
   * ];
   *
   * // Train the XNOR gate
   * network.train(trainingSet, {
   *  crossValidate:
   *    {
   *      testSize: 0.4,
   *      testError: 0.02
   *    }
   * });
   *
   */


  Network.prototype.train = function (options) {
    var _a;

    if (!options.dataset || options.dataset[0].input.length !== this.inputSize || options.dataset[0].output.length !== this.outputSize) {
      throw new Error("Dataset input/output size should be same as network input/output size!");
    } // Use the default values, if no value is given


    options.iterations = Utils_1.getOrDefault(options.iterations, -1);
    options.error = Utils_1.getOrDefault(options.error, -1);
    options.loss = Utils_1.getOrDefault(options.loss, new Loss_1.MSELoss());
    options.dropout = Utils_1.getOrDefault(options.dropout, 0);
    options.momentum = Utils_1.getOrDefault(options.momentum, 0);
    options.batchSize = Math.min(options.dataset.length, Utils_1.getOrDefault(options.batchSize, options.dataset.length));
    var baseRate = Utils_1.getOrDefault(options.rate, 0.3);
    options.ratePolicy = Utils_1.getOrDefault(options.ratePolicy, new Rate_1.FixedRate(baseRate));
    options.log = Utils_1.getOrDefault(options.log, NaN);
    var start = Date.now();

    if (options.iterations <= 0 && options.error <= 0) {
      throw new Error("At least one of the following options must be specified: error, iterations");
    } // Split into trainingSet and testSet if cross validation is enabled


    var trainingSetSize;
    var trainingSet;
    var testSet;

    if (options.crossValidateTestSize && options.crossValidateTestSize > 0) {
      trainingSetSize = Math.ceil((1 - options.crossValidateTestSize) * options.dataset.length);
      trainingSet = options.dataset.slice(0, trainingSetSize);
      testSet = options.dataset.slice(trainingSetSize);
    } else {
      trainingSet = options.dataset;
      testSet = [];
    }

    var currentTrainingRate;
    var iterationCount = 0;
    var error = 1; // train until the target error is reached or the target iterations are reached

    while (error > options.error && (options.iterations <= 0 || iterationCount < options.iterations)) {
      iterationCount++; // update the rate according to the rate policy

      currentTrainingRate = options.ratePolicy.calc(iterationCount); // train a single epoch

      var trainError = this.trainEpoch(trainingSet, options.batchSize, currentTrainingRate, options.momentum, options.loss, options.dropout);

      if (options.clear) {
        this.clear();
      } // Run test with the testSet, if cross validation is enabled


      if (options.crossValidateTestSize) {
        error = this.test(testSet, options.loss);

        if (options.clear) {
          this.clear();
        }
      } else {
        error = trainError;
      }

      if ((_a = options.shuffle) !== null && _a !== void 0 ? _a : false) {
        Utils_1.shuffle(options.dataset);
      }

      if (options.log > 0 && iterationCount % options.log === 0) {
        console.log("iteration number", iterationCount, "error", error, "training rate", currentTrainingRate);
      }

      if (options.schedule && iterationCount % options.schedule.iterations === 0) {
        options.schedule.function(error, iterationCount);
      }
    }

    if (options.clear) {
      this.clear();
    }

    return {
      error: error,
      iterations: iterationCount,
      time: Date.now() - start
    };
  };
  /**
   * Performs one training epoch and returns the error - this is a private function used in `self.train`
   *
   * @todo Add `@param` tag descriptions
   * @todo Add `@returns` tag description
   *
   * @private
   *
   * @param {Array<{input:number[], output: number[]}>} dataset
   * @param {number} batchSize
   * @param {number} trainingRate
   * @param {number} momentum
   * @param {loss} loss
   * @param {number} dropoutRate=0.5 The dropout rate to use when training
   *
   * @returns {number}
   */


  Network.prototype.trainEpoch = function (dataset, batchSize, trainingRate, momentum, loss, dropoutRate) {
    if (dropoutRate === void 0) {
      dropoutRate = 0.5;
    }

    var errorSum = 0;

    for (var i = 0; i < dataset.length; i++) {
      var input = dataset[i].input;
      var correctOutput = dataset[i].output;
      var update = (i + 1) % batchSize === 0 || i + 1 === dataset.length;
      var output = this.activate(input, {
        dropoutRate: dropoutRate
      });
      this.propagate(correctOutput, {
        rate: trainingRate,
        momentum: momentum,
        update: update
      });
      errorSum += loss.calc(correctOutput, output);
    }

    return errorSum / dataset.length;
  };
  /**
   * Tests a set and returns the error and elapsed time
   *
   * @function test
   * @memberof Network
   *
   * @param {Array<{input:number[],output:number[]}>} dataset A set of input values and ideal output values to test the network against
   * @param {Loss} [loss=new MSELoss()] The [loss function](https://en.wikipedia.org/wiki/Loss_function) used to determine network error
   *
   * @returns {number} A summary object of the network's performance
   *
   */


  Network.prototype.test = function (dataset, loss) {
    if (loss === void 0) {
      loss = new Loss_1.MSELoss();
    }

    var error = 0;

    for (var _i = 0, dataset_1 = dataset; _i < dataset_1.length; _i++) {
      var entry = dataset_1[_i];
      var input = entry.input;
      var target = entry.output;
      var output = this.activate(input, {
        trace: false
      });
      error += loss.calc(target, output);
    }

    return error / dataset.length;
  };
  /**
   * Convert the network to a json object
   *
   * @function toJSON
   * @memberof Network
   *
   * @returns {NetworkJSON} The network represented as a json object
   *
   * @example
   * let { Network } = require("@liquid-carrot/carrot");
   *
   * let exported = myNetwork.toJSON();
   * let imported = Network.fromJSON(exported) // imported will be a new instance of Network that is an exact clone of myNetwork
   */


  Network.prototype.toJSON = function () {
    var json = {
      nodes: [],
      connections: [],
      inputSize: this.inputSize,
      outputSize: this.outputSize
    }; // set node indices

    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].index = i;
    } // convert all nodes to json and add the to the json object


    this.nodes.forEach(function (node) {
      json.nodes.push(node.toJSON());

      if (node.selfConnection.weight !== 0) {
        // if there is a self connection
        // add it to the json object
        json.connections.push(node.selfConnection.toJSON());
      }
    });
    this.connections.map(function (conn) {
      return conn.toJSON();
    }) // convert all connections to json
    .forEach(function (connJSON) {
      return json.connections.push(connJSON);
    }); // and add them to the json object

    return json;
  };
  /**
   * Evolves the network to reach a lower error on a dataset using the [NEAT algorithm](http://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf)
   *
   * If both `iterations` and `error` options are unset, evolve will default to `iterations` as an end condition.
   *
   * @function evolve
   * @memberof Network
   * @param {object} [options] Configuration options
   * @param {Array<{input:number[],output:number[]}>} [options.dataset] A set of input values and ideal output values to train the network with
   * @param {number} [options.iterations=1000] Set the maximum amount of iterations/generations for the algorithm to run.
   * @param {number} [options.error=0.05] Set the target error. The algorithm will stop once this target error has been reached.
   * @param {number} [options.growth=0.0001] Set the penalty for large networks. Penalty calculation: penalty = (genome.nodes.length + genome.connectoins.length + genome.gates.length) * growth; This penalty will get added on top of the error. Your growth should be a very small number.
   * @param {loss} [options.loss=loss.MSE]  Specify the loss function for the evolution, this tells a genome in the population how well it's performing. Default: methods.loss.MSE (recommended).
   * @param {number} [options.amount=1] Set the amount of times to test the trainingset on a genome each generation. Useful for timeseries. Do not use for regular feedfoward problems.
   * @param {number} [options.threads] Specify the amount of threads to use. Default value is the amount of cores in your CPU.
   * @param {Network} [options.network]
   * @param {number|boolean} [options.log=false] If set to n, outputs training status every n iterations. Setting `log` to 1 will log the status every iteration
   * @param {number} [options.schedule.iterations] You can schedule tasks to happen every n iterations. Paired with `options.schedule.function`
   * @param {schedule} [options.schedule.function] A function to run every n iterations as set by `options.schedule.iterations`. Passed as an object with a "function" property that contains the function to run.
   * @param {boolean} [options.clear=false] If set to true, will clear the network after every activation. This is useful for evolving recurrent networks, more importantly for timeseries prediction.
   * @param {boolean} [options.equal=true] If set to true when [Network.crossOver](Network.crossOver) runs it will assume both genomes are equally fit.
   * @param {number} [options.populationSize=50] Population size of each generation.
   * @param {number} [options.elitism=1] Elitism of every evolution loop. [Elitism in genetic algorithms.](https://www.researchgate.net/post/What_is_meant_by_the_term_Elitism_in_the_Genetic_Algorithm)
   * @param {number} [options.provenance=0] Number of genomes inserted into the original network template (Network(input,output)) per evolution.
   * @param {number} [options.mutationRate=0.4] Sets the mutation rate. If set to 0.3, 30% of the new population will be mutated.
   * @param {number} [options.mutationAmount=1] If mutation occurs (randomNumber < mutationRate), sets amount of times a mutation method will be applied to the network.
   * @param {boolean} [options.fitnessPopulation=true] Flag to return the fitness of a population of genomes. false => evaluate each genome individually. true => evaluate entire population. Adjust fitness function accordingly
   * @param {Function} [options.fitness] - A fitness function to evaluate the networks. Takes a `genome`, i.e. a [network](Network), and a `dataset` and sets the genome's score property
   * @param {string} [options.selection=new FitnessProportionateSelection()] [Selection method](selection) for evolution (e.g. methods.Selection.FITNESS_PROPORTIONATE).
   * @param {Array} [options.crossover] Sets allowed crossover methods for evolution.
   * @param {Array} [options.mutation] Sets allowed [mutation methods](mutation) for evolution, a random mutation method will be chosen from the array when mutation occurs. Optional, but default methods are non-recurrent.
   * @param {number} [options.maxNodes=Infinity] Maximum nodes for a potential network
   * @param {number} [options.maxConnections=Infinity] Maximum connections for a potential network
   * @param {number} [options.maxGates=Infinity] Maximum gates for a potential network
   * @param {function} [options.mutationSelection=random] Custom mutation selection function if given
   * @param {boolean} [options.efficientMutation=false] Test & reduce [mutation methods](mutation) to avoid failed mutation attempts
   *
   * @returns {{error:{number},iterations:{number},time:{number}}} A summary object of the network's performance. <br /> Properties include: `error` - error of the best genome, `iterations` - generations used to evolve networks, `time` - clock time elapsed while evolving
   *
   * @example
   * let { Network, methods } = require("@liquid-carrot/carrot");
   *
   * async function execute () {
   *    var network = new Network(2,1);
   *
   *    // XOR dataset
   *    var trainingSet = [
   *        { input: [0,0], output: [0] },
   *        { input: [0,1], output: [1] },
   *        { input: [1,0], output: [1] },
   *        { input: [1,1], output: [0] }
   *    ];
   *
   *    await network.evolve(trainingSet, {
   *        mutation: methods.mutation.FFW,
   *        equal: true,
   *        error: 0.05,
   *        elitism: 5,
   *        mutationRate: 0.5
   *    });
   *
   *    // another option
   *    // await network.evolve(trainingSet, {
   *    //     mutation: methods.mutation.FFW,
   *    //     equal: true,
   *    //     error: 0.05,
   *    //     elitism: 5,
   *    //     mutationRate: 0.5,
   *    //     loss: (targets, outputs) => {
   *    //       const error = outputs.reduce(function(total, value, index) {
   *    //         return total += Math.pow(targets[index] - outputs[index], 2);
   *    //       }, 0);
   *    //
   *    //       return error / outputs.length;
   *    //     }
   *    // });
   *
   *
   *    network.activate([0,0]); // 0.2413
   *    network.activate([0,1]); // 1.0000
   *    network.activate([1,0]); // 0.7663
   *    network.activate([1,1]); // -0.008
   * }
   *
   * execute();
   */


  Network.prototype.evolve = function (options) {
    if (options === void 0) {
      options = {};
    }

    var _a, _b, _c, _d;

    return __awaiter(this, void 0, void 0, function () {
      var targetError, start, neat, error, bestFitness, bestGenome, fittest, fitness;
      return __generator(this, function (_e) {
        switch (_e.label) {
          case 0:
            if (!options.fitnessFunction && options.dataset && (options.dataset[0].input.length !== this.inputSize || options.dataset[0].output.length !== this.outputSize)) {
              throw new Error("Dataset input/output size should be same as network input/output size!");
            }

            targetError = 0;

            if (typeof options.iterations === "undefined" && typeof options.error === "undefined") {
              options.iterations = 1000;
              targetError = 0.05;
            } else if (options.iterations) {
              targetError = -1; // run until iterations
            } else if (options.error) {
              targetError = options.error;
              options.iterations = 0; // run until error
            } // set options to default if necessary


            options.growth = Utils_1.getOrDefault(options.growth, 0.0001);
            options.loss = Utils_1.getOrDefault(options.loss, new Loss_1.MSELoss());
            options.amount = Utils_1.getOrDefault(options.amount, 1);
            options.maxNodes = Utils_1.getOrDefault(options.maxNodes, Infinity);
            options.maxConnections = Utils_1.getOrDefault(options.maxConnections, Infinity);
            options.maxGates = Utils_1.getOrDefault(options.maxGates, Infinity);
            options.threads = Utils_1.getOrDefault(options.threads, 4);
            start = Date.now();

            if (!options.fitnessFunction) {
              // if no fitness function is given
              // create default one
              options.fitnessFunction = function (population) {
                return __awaiter(this, void 0, void 0, function () {
                  var promises, _loop_1, _i, population_1, genome;

                  return __generator(this, function (_a) {
                    switch (_a.label) {
                      case 0:
                        promises = [];

                        _loop_1 = function (genome) {
                          promises.push(new Promise(function (resolve, reject) {
                            var _a, _b;

                            if (!genome || !options.dataset) {
                              reject();
                              return;
                            } // test the genome


                            genome.score = -genome.test(options.dataset, (_a = options.loss) !== null && _a !== void 0 ? _a : new Loss_1.MSELoss());

                            if (genome.score === undefined) {
                              genome.score = -Infinity;
                              return;
                            } // subtract growth value


                            genome.score -= ((_b = options.growth) !== null && _b !== void 0 ? _b : 0.0001) * (genome.nodes.length - genome.inputSize - genome.outputSize + genome.connections.length + genome.gates.length);
                            resolve();
                          }));
                        };

                        for (_i = 0, population_1 = population; _i < population_1.length; _i++) {
                          genome = population_1[_i];

                          _loop_1(genome);
                        }

                        return [4
                        /*yield*/
                        , Promise.all(promises)];

                      case 1:
                        _a.sent();

                        return [2
                        /*return*/
                        ];
                    }
                  });
                });
              };
            }

            options.template = this; // set this network as template for first generation

            neat = new NEAT_1.NEAT(options);
            error = -Infinity;
            bestFitness = -Infinity;
            _e.label = 1;

          case 1:
            if (!(error < -targetError && (options.iterations === 0 || neat.generation < ((_a = options.iterations) !== null && _a !== void 0 ? _a : 0)))) return [3
            /*break*/
            , 3];
            return [4
            /*yield*/
            , neat.evolve()];

          case 2:
            fittest = _e.sent();
            fitness = (_b = fittest.score) !== null && _b !== void 0 ? _b : -Infinity; // add the growth value back to get the real error

            error = fitness + options.growth * (fittest.nodes.length - fittest.inputSize - fittest.outputSize + fittest.connections.length + fittest.gates.length);

            if (fitness > bestFitness) {
              bestFitness = fitness;
              bestGenome = fittest;
            }

            if (((_c = options.log) !== null && _c !== void 0 ? _c : 0) > 0 && neat.generation % ((_d = options.log) !== null && _d !== void 0 ? _d : 0) === 0) {
              console.log("iteration", neat.generation, "fitness", fitness, "error", -error);
            }

            if (options.schedule && neat.generation % options.schedule.iterations === 0) {
              options.schedule.function(fitness, -error, neat.generation);
            }

            return [3
            /*break*/
            , 1];

          case 3:
            if (bestGenome !== undefined) {
              // set this network to the fittest from NEAT
              this.nodes = bestGenome.nodes;
              this.connections = bestGenome.connections;
              this.gates = bestGenome.gates;

              if (options.clear) {
                this.clear();
              }
            }

            return [2
            /*return*/
            , {
              error: -error,
              iterations: neat.generation,
              time: Date.now() - start
            }];
        }
      });
    });
  };

  return Network;
}();

exports.Network = Network;
},{"../enums/NodeType":"../src/enums/NodeType.js","../methods/Loss":"../src/methods/Loss.js","../methods/Mutation":"../src/methods/Mutation.js","../methods/Rate":"../src/methods/Rate.js","../methods/Utils":"../src/methods/Utils.js","../NEAT":"../src/NEAT.js","./Connection":"../src/architecture/Connection.js","./Node":"../src/architecture/Node.js"}],"../src/architecture/Architect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Layer_1 = require("./Layers/Layer");

var InputLayer_1 = require("./Layers/CoreLayers/InputLayer");

var Network_1 = require("./Network");

var OutputLayer_1 = require("./Layers/CoreLayers/OutputLayer");

var Architect =
/** @class */
function () {
  function Architect() {
    this.layers = [];
  }

  Architect.prototype.addLayer = function (layer, incomingConnectionType) {
    var connectionType = incomingConnectionType !== null && incomingConnectionType !== void 0 ? incomingConnectionType : layer.getDefaultIncomingConnectionType();

    if (!layer.connectionTypeisAllowed(connectionType)) {
      throw new ReferenceError("Connection type " + connectionType + " is not allowed at layer " + layer.constructor.name);
    }

    this.layers.push({
      layer: layer,
      incomingConnectionType: connectionType
    });
    return this; // function as builder class
  };

  Architect.prototype.buildModel = function () {
    var _a, _b, _c, _d, _e;

    if (!(this.layers[0].layer instanceof InputLayer_1.InputLayer)) {
      throw new ReferenceError("First layer has to be a InputLayer! Currently is: " + this.layers[0].layer.constructor.name);
    }

    if (!(this.layers[this.layers.length - 1].layer instanceof OutputLayer_1.OutputLayer)) {
      throw new ReferenceError("Last layer has to be a OutputLayer! Currently is: " + this.layers[this.layers.length - 1].layer.constructor.name);
    }

    var inputSize = this.layers[0].layer.nodes.length;
    var outputSize = this.layers[this.layers.length - 1].layer.nodes.length;
    var network = new Network_1.Network(inputSize, outputSize);
    network.nodes = [];
    network.connections = [];

    for (var i = 0; i < this.layers.length - 1; i++) {
      (_a = network.connections).push.apply(_a, Layer_1.Layer.connect(this.layers[i].layer, this.layers[i + 1].layer, this.layers[i + 1].incomingConnectionType));

      (_b = network.nodes).push.apply(_b, this.layers[i].layer.nodes);

      (_c = network.connections).push.apply(_c, this.layers[i].layer.connections);

      (_d = network.gates).push.apply(_d, this.layers[i].layer.gates);
    }

    (_e = network.nodes).push.apply(_e, this.layers[this.layers.length - 1].layer.nodes);

    return network;
  };

  return Architect;
}();

exports.Architect = Architect;
},{"./Layers/Layer":"../src/architecture/Layers/Layer.js","./Layers/CoreLayers/InputLayer":"../src/architecture/Layers/CoreLayers/InputLayer.js","./Network":"../src/architecture/Network.js","./Layers/CoreLayers/OutputLayer":"../src/architecture/Layers/CoreLayers/OutputLayer.js"}],"index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var DenseLayer_1 = require("../src/architecture/Layers/CoreLayers/DenseLayer");

exports.DenseLayer = DenseLayer_1.DenseLayer;

var Node_1 = require("../src/architecture/Node");

exports.Node = Node_1.Node;

var DropoutLayer_1 = require("../src/architecture/Layers/CoreLayers/DropoutLayer");

exports.DropoutLayer = DropoutLayer_1.DropoutLayer;

var NoiseLayer_1 = require("../src/architecture/Layers/NoiseLayers/NoiseLayer");

exports.NoiseLayer = NoiseLayer_1.NoiseLayer;

var OutputLayer_1 = require("../src/architecture/Layers/CoreLayers/OutputLayer");

exports.OutputLayer = OutputLayer_1.OutputLayer;

var InputLayer_1 = require("../src/architecture/Layers/CoreLayers/InputLayer");

exports.InputLayer = InputLayer_1.InputLayer;

var AvgPooling1DLayer_1 = require("../src/architecture/Layers/PoolingLayers/AvgPooling1DLayer");

exports.AvgPooling1DLayer = AvgPooling1DLayer_1.AvgPooling1DLayer;

var MinPooling1DLayer_1 = require("../src/architecture/Layers/PoolingLayers/MinPooling1DLayer");

exports.MinPooling1DLayer = MinPooling1DLayer_1.MinPooling1DLayer;

var MaxPooling1DLayer_1 = require("../src/architecture/Layers/PoolingLayers/MaxPooling1DLayer");

exports.MaxPooling1DLayer = MaxPooling1DLayer_1.MaxPooling1DLayer;

var GlobalAvgPooling1DLayer_1 = require("../src/architecture/Layers/PoolingLayers/GlobalAvgPooling1DLayer");

exports.GlobalAvgPooling1DLayer = GlobalAvgPooling1DLayer_1.GlobalAvgPooling1DLayer;

var GlobalMaxPooling1DLayer_1 = require("../src/architecture/Layers/PoolingLayers/GlobalMaxPooling1DLayer");

exports.GlobalMaxPooling1DLayer = GlobalMaxPooling1DLayer_1.GlobalMaxPooling1DLayer;

var GlobalMinPooling1DLayer_1 = require("../src/architecture/Layers/PoolingLayers/GlobalMinPooling1DLayer");

exports.GlobalMinPooling1DLayer = GlobalMinPooling1DLayer_1.GlobalMinPooling1DLayer;

var PoolingLayer_1 = require("../src/architecture/Layers/PoolingLayers/PoolingLayer");

exports.PoolingLayer = PoolingLayer_1.PoolingLayer;

var GRULayer_1 = require("../src/architecture/Layers/RecurrentLayers/GRULayer");

exports.GRULayer = GRULayer_1.GRULayer;

var LSTMLayer_1 = require("../src/architecture/Layers/RecurrentLayers/LSTMLayer");

exports.LSTMLayer = LSTMLayer_1.LSTMLayer;

var MemoryLayer_1 = require("../src/architecture/Layers/RecurrentLayers/MemoryLayer");

exports.MemoryLayer = MemoryLayer_1.MemoryLayer;

var Layer_1 = require("../src/architecture/Layers/Layer");

exports.Layer = Layer_1.Layer;

var ConstantNode_1 = require("../src/architecture/Nodes/ConstantNode");

exports.ConstantNode = ConstantNode_1.ConstantNode;

var DropoutNode_1 = require("../src/architecture/Nodes/DropoutNode");

exports.DropoutNode = DropoutNode_1.DropoutNode;

var NoiseNode_1 = require("../src/architecture/Nodes/NoiseNode");

exports.NoiseNode = NoiseNode_1.NoiseNode;

var PoolNode_1 = require("../src/architecture/Nodes/PoolNode");

exports.PoolNode = PoolNode_1.PoolNode;

var Architect_1 = require("../src/architecture/Architect");

exports.Architect = Architect_1.Architect;

var Connection_1 = require("../src/architecture/Connection");

exports.Connection = Connection_1.Connection;

var Network_1 = require("../src/architecture/Network");

exports.Network = Network_1.Network;

var ActivationType_1 = require("../src/enums/ActivationType");

exports.ActivationType = ActivationType_1.ActivationType;

var ConnectionType_1 = require("../src/enums/ConnectionType");

exports.ConnectionType = ConnectionType_1.ConnectionType;

var GatingType_1 = require("../src/enums/GatingType");

exports.GatingType = GatingType_1.GatingType;

var NodeType_1 = require("../src/enums/NodeType");

exports.NodeType = NodeType_1.NodeType;
exports.NoiseNodeType = NodeType_1.NoiseNodeType;
exports.PoolNodeType = NodeType_1.PoolNodeType;

var Activation_1 = require("../src/methods/Activation");

exports.AbsoluteActivation = Activation_1.AbsoluteActivation;
exports.Activation = Activation_1.Activation;
exports.ALL_ACTIVATIONS = Activation_1.ALL_ACTIVATIONS;
exports.BentIdentityActivation = Activation_1.BentIdentityActivation;
exports.BipolarActivation = Activation_1.BipolarActivation;
exports.BipolarSigmoidActivation = Activation_1.BipolarSigmoidActivation;
exports.GaussianActivation = Activation_1.GaussianActivation;
exports.HardTanhActivation = Activation_1.HardTanhActivation;
exports.IdentityActivation = Activation_1.IdentityActivation;
exports.InverseActivation = Activation_1.InverseActivation;
exports.LogisticActivation = Activation_1.LogisticActivation;
exports.RELUActivation = Activation_1.RELUActivation;
exports.SELUActivation = Activation_1.SELUActivation;
exports.SinusoidActivation = Activation_1.SinusoidActivation;
exports.SoftSignActivation = Activation_1.SoftSignActivation;
exports.StepActivation = Activation_1.StepActivation;
exports.TanhActivation = Activation_1.TanhActivation;

var Loss_1 = require("../src/methods/Loss");

exports.ALL_LOSSES = Loss_1.ALL_LOSSES;
exports.BinaryLoss = Loss_1.BinaryLoss;
exports.CrossEntropyLoss = Loss_1.CrossEntropyLoss;
exports.HINGELoss = Loss_1.HINGELoss;
exports.Loss = Loss_1.Loss;
exports.MAELoss = Loss_1.MAELoss;
exports.MAPELoss = Loss_1.MAPELoss;
exports.MSELoss = Loss_1.MSELoss;
exports.MSLELoss = Loss_1.MSLELoss;
exports.WAPELoss = Loss_1.WAPELoss;

var Mutation_1 = require("../src/methods/Mutation");

exports.AddBackConnectionMutation = Mutation_1.AddBackConnectionMutation;
exports.AddConnectionMutation = Mutation_1.AddConnectionMutation;
exports.AddGateMutation = Mutation_1.AddGateMutation;
exports.AddNodeMutation = Mutation_1.AddNodeMutation;
exports.AddSelfConnectionMutation = Mutation_1.AddSelfConnectionMutation;
exports.ALL_MUTATIONS = Mutation_1.ALL_MUTATIONS;
exports.FEEDFORWARD_MUTATIONS = Mutation_1.FEEDFORWARD_MUTATIONS;
exports.ModActivationMutation = Mutation_1.ModActivationMutation;
exports.ModBiasMutation = Mutation_1.ModBiasMutation;
exports.ModWeightMutation = Mutation_1.ModWeightMutation;
exports.Mutation = Mutation_1.Mutation;
exports.NO_STRUCTURE_MUTATIONS = Mutation_1.NO_STRUCTURE_MUTATIONS;
exports.ONLY_STRUCTURE = Mutation_1.ONLY_STRUCTURE;
exports.SubBackConnectionMutation = Mutation_1.SubBackConnectionMutation;
exports.SubConnectionMutation = Mutation_1.SubConnectionMutation;
exports.SubGateMutation = Mutation_1.SubGateMutation;
exports.SubNodeMutation = Mutation_1.SubNodeMutation;
exports.SubSelfConnectionMutation = Mutation_1.SubSelfConnectionMutation;
exports.SwapNodesMutation = Mutation_1.SwapNodesMutation;

var Rate_1 = require("../src/methods/Rate");

exports.ExponentialRate = Rate_1.ExponentialRate;
exports.FixedRate = Rate_1.FixedRate;
exports.InverseRate = Rate_1.InverseRate;
exports.Rate = Rate_1.Rate;
exports.StepRate = Rate_1.StepRate;

var Selection_1 = require("../src/methods/Selection");

exports.FitnessProportionateSelection = Selection_1.FitnessProportionateSelection;
exports.PowerSelection = Selection_1.PowerSelection;
exports.Selection = Selection_1.Selection;
exports.TournamentSelection = Selection_1.TournamentSelection;

var Utils_1 = require("../src/methods/Utils");

exports.avg = Utils_1.avg;
exports.generateGaussian = Utils_1.generateGaussian;
exports.getOrDefault = Utils_1.getOrDefault;
exports.max = Utils_1.max;
exports.maxValueIndex = Utils_1.maxValueIndex;
exports.min = Utils_1.min;
exports.minValueIndex = Utils_1.minValueIndex;
exports.pickRandom = Utils_1.pickRandom;
exports.randBoolean = Utils_1.randBoolean;
exports.randDouble = Utils_1.randDouble;
exports.randInt = Utils_1.randInt;
exports.removeFromArray = Utils_1.removeFromArray;
exports.shuffle = Utils_1.shuffle;
exports.sum = Utils_1.sum;
},{"../src/architecture/Layers/CoreLayers/DenseLayer":"../src/architecture/Layers/CoreLayers/DenseLayer.js","../src/architecture/Node":"../src/architecture/Node.js","../src/architecture/Layers/CoreLayers/DropoutLayer":"../src/architecture/Layers/CoreLayers/DropoutLayer.js","../src/architecture/Layers/NoiseLayers/NoiseLayer":"../src/architecture/Layers/NoiseLayers/NoiseLayer.js","../src/architecture/Layers/CoreLayers/OutputLayer":"../src/architecture/Layers/CoreLayers/OutputLayer.js","../src/architecture/Layers/CoreLayers/InputLayer":"../src/architecture/Layers/CoreLayers/InputLayer.js","../src/architecture/Layers/PoolingLayers/AvgPooling1DLayer":"../src/architecture/Layers/PoolingLayers/AvgPooling1DLayer.js","../src/architecture/Layers/PoolingLayers/MinPooling1DLayer":"../src/architecture/Layers/PoolingLayers/MinPooling1DLayer.js","../src/architecture/Layers/PoolingLayers/MaxPooling1DLayer":"../src/architecture/Layers/PoolingLayers/MaxPooling1DLayer.js","../src/architecture/Layers/PoolingLayers/GlobalAvgPooling1DLayer":"../src/architecture/Layers/PoolingLayers/GlobalAvgPooling1DLayer.js","../src/architecture/Layers/PoolingLayers/GlobalMaxPooling1DLayer":"../src/architecture/Layers/PoolingLayers/GlobalMaxPooling1DLayer.js","../src/architecture/Layers/PoolingLayers/GlobalMinPooling1DLayer":"../src/architecture/Layers/PoolingLayers/GlobalMinPooling1DLayer.js","../src/architecture/Layers/PoolingLayers/PoolingLayer":"../src/architecture/Layers/PoolingLayers/PoolingLayer.js","../src/architecture/Layers/RecurrentLayers/GRULayer":"../src/architecture/Layers/RecurrentLayers/GRULayer.js","../src/architecture/Layers/RecurrentLayers/LSTMLayer":"../src/architecture/Layers/RecurrentLayers/LSTMLayer.js","../src/architecture/Layers/RecurrentLayers/MemoryLayer":"../src/architecture/Layers/RecurrentLayers/MemoryLayer.js","../src/architecture/Layers/Layer":"../src/architecture/Layers/Layer.js","../src/architecture/Nodes/ConstantNode":"../src/architecture/Nodes/ConstantNode.js","../src/architecture/Nodes/DropoutNode":"../src/architecture/Nodes/DropoutNode.js","../src/architecture/Nodes/NoiseNode":"../src/architecture/Nodes/NoiseNode.js","../src/architecture/Nodes/PoolNode":"../src/architecture/Nodes/PoolNode.js","../src/architecture/Architect":"../src/architecture/Architect.js","../src/architecture/Connection":"../src/architecture/Connection.js","../src/architecture/Network":"../src/architecture/Network.js","../src/enums/ActivationType":"../src/enums/ActivationType.js","../src/enums/ConnectionType":"../src/enums/ConnectionType.js","../src/enums/GatingType":"../src/enums/GatingType.js","../src/enums/NodeType":"../src/enums/NodeType.js","../src/methods/Activation":"../src/methods/Activation.js","../src/methods/Loss":"../src/methods/Loss.js","../src/methods/Mutation":"../src/methods/Mutation.js","../src/methods/Rate":"../src/methods/Rate.js","../src/methods/Selection":"../src/methods/Selection.js","../src/methods/Utils":"../src/methods/Utils.js"}]},{},["index.js"], "carrot")
//# sourceMappingURL=/index.js.map