(function () {
var $parcel$global = this;
// ASSET: methods/activation.js
var r = {
  LOGISTIC: function (r, n) {
    var e = function (r) {
      var n = Number.MAX_VALUE;
      return r === 1 / 0 ? n : r === -1 / 0 ? -n : r;
    };

    if (null == r) throw new ReferenceError("Parameter 'x' is required, but it was not defined");
    var t = n ? function (r) {
      return Math.exp(-r) / Math.pow(1 + Math.exp(-r), 2);
    } : function (r) {
      return 1 / (1 + Math.exp(-r));
    };
    return Array.isArray(r) ? r.map(e(t)) : e(t(r));
  },
  TANH: function (r, n) {
    var e = function (r) {
      var n = Number.MAX_VALUE;
      return r === 1 / 0 ? n : r === -1 / 0 ? -n : r;
    };

    if (null == r) throw new ReferenceError("Parameter 'x' is required, but it was not defined");
    var t = n ? function (r) {
      return 1 - Math.tanh(r) * Math.tanh(r);
    } : function (r) {
      return Math.tanh(r);
    };
    return Array.isArray(r) ? r.map(e(t)) : e(t(r));
  },
  IDENTITY: function (r, n) {
    var e = function (r) {
      var n = Number.MAX_VALUE;
      return r === 1 / 0 ? n : r === -1 / 0 ? -n : r;
    };

    if (null == r) throw new ReferenceError("Parameter 'x' is required, but it was not defined");
    var t = n ? function (r) {
      return 1;
    } : function (r) {
      return r;
    };
    return Array.isArray(r) ? r.map(e(t)) : e(t(r));
  },
  STEP: function (r, n) {
    var e = function (r) {
      var n = Number.MAX_VALUE;
      return r === 1 / 0 ? n : r === -1 / 0 ? -n : r;
    };

    if (null == r) throw new ReferenceError("Parameter 'x' is required, but it was not defined");
    var t = n ? function (r) {
      return 0;
    } : function (r) {
      return r > 0 ? 1 : 0;
    };
    return Array.isArray(r) ? r.map(e(t)) : e(t(r));
  },
  RELU: function (r, n) {
    var e = function (r) {
      var n = Number.MAX_VALUE;
      return r === 1 / 0 ? n : r === -1 / 0 ? -n : r;
    };

    if (null == r) throw new ReferenceError("Parameter 'x' is required, but it was not defined");
    var t = n ? function (r) {
      return r > 0 ? 1 : 0;
    } : function (r) {
      return r > 0 ? r : 0;
    };
    return Array.isArray(r) ? r.map(e(t)) : e(t(r));
  },
  SOFTSIGN: function (r, n) {
    var e = function (r) {
      var n = Number.MAX_VALUE;
      return r === 1 / 0 ? n : r === -1 / 0 ? -n : r;
    };

    if (null == r) throw new ReferenceError("Parameter 'x' is required, but it was not defined");
    var t = n ? function (r) {
      return r / ((1 + Math.abs(r)) * (1 + Math.abs(r)));
    } : function (r) {
      return r / 1 + Math.abs(r);
    };
    return Array.isArray(r) ? r.map(e(t)) : e(t(r));
  },
  SINUSOID: function (r, n) {
    var e = function (r) {
      var n = Number.MAX_VALUE;
      return r === 1 / 0 ? n : r === -1 / 0 ? -n : r;
    };

    if (null == r) throw new ReferenceError("Parameter 'x' is required, but it was not defined");
    var t = n ? function (r) {
      return Math.cos(r);
    } : function (r) {
      return Math.sin(r);
    };
    return Array.isArray(r) ? r.map(e(t)) : e(t(r));
  },
  GAUSSIAN: function (r, n) {
    var e = function (r) {
      var n = Number.MAX_VALUE;
      return r === 1 / 0 ? n : r === -1 / 0 ? -n : r;
    };

    if (null == r) throw new ReferenceError("Parameter 'x' is required, but it was not defined");
    var t = n ? function (r) {
      return -2 * r * Math.exp(-r * r);
    } : function (r) {
      return Math.exp(-r * r);
    };
    return Array.isArray(r) ? r.map(e(t)) : e(t(r));
  },
  BENT_IDENTITY: function (r, n) {
    var e = function (r) {
      var n = Number.MAX_VALUE;
      return r === 1 / 0 ? n : r === -1 / 0 ? -n : r;
    };

    if (null == r) throw new ReferenceError("Parameter 'x' is required, but it was not defined");
    var t = n ? function (r) {
      return r / (2 * Math.sqrt(r * r + 1)) + 1;
    } : function (r) {
      return (Math.sqrt(r * r + 1) - 1) / 2 + r;
    };
    return Array.isArray(r) ? r.map(e(t)) : e(t(r));
  },
  BIPOLAR: function (r, n) {
    var e = function (r) {
      var n = Number.MAX_VALUE;
      return r === 1 / 0 ? n : r === -1 / 0 ? -n : r;
    };

    if (null == r) throw new ReferenceError("Parameter 'x' is required, but it was not defined");
    var t = n ? function (r) {
      return 0;
    } : function (r) {
      return r > 0 ? 1 : -1;
    };
    return Array.isArray(r) ? r.map(e(t)) : e(t(r));
  },
  BIPOLAR_SIGMOID: function (r, n) {
    var e = function (r) {
      var n = Number.MAX_VALUE;
      return r === 1 / 0 ? n : r === -1 / 0 ? -n : r;
    };

    if (null == r) throw new ReferenceError("Parameter 'x' is required, but it was not defined");
    var t = n ? function (r) {
      return 2 * Math.exp(-r) / Math.pow(1 + Math.exp(-r), 2);
    } : function (r) {
      return 2 / (1 + Math.exp(-r)) - 1;
    };
    return Array.isArray(r) ? r.map(e(t)) : e(t(r));
  },
  HARD_TANH: function (r, n) {
    var e = function (r) {
      var n = Number.MAX_VALUE;
      return r === 1 / 0 ? n : r === -1 / 0 ? -n : r;
    };

    if (null == r) throw new ReferenceError("Parameter 'x' is required, but it was not defined");
    var t = n ? function (r) {
      return r > -1 && r < 1 ? 1 : 0;
    } : function (r) {
      return Math.max(-1, Math.min(1, r));
    };
    return Array.isArray(r) ? r.map(e(t)) : e(t(r));
  },
  ABSOLUTE: function (r, n) {
    var e = function (r) {
      var n = Number.MAX_VALUE;
      return r === 1 / 0 ? n : r === -1 / 0 ? -n : r;
    };

    if (null == r) throw new ReferenceError("Parameter 'x' is required, but it was not defined");
    var t = n ? function (r) {
      return r < 0 ? -1 : 1;
    } : function (r) {
      return Math.abs(r);
    };
    return Array.isArray(r) ? r.map(e(t)) : e(t(r));
  },
  INVERSE: function (r, n) {
    var e = function (r) {
      var n = Number.MAX_VALUE;
      return r === 1 / 0 ? n : r === -1 / 0 ? -n : r;
    };

    if (null == r) throw new ReferenceError("Parameter 'x' is required, but it was not defined");
    var t = n ? function (r) {
      return -1;
    } : function (r) {
      return 1 - r;
    };
    return Array.isArray(r) ? r.map(e(t)) : e(t(r));
  },
  SELU: function (r, n) {
    var e = function (r) {
      var n = Number.MAX_VALUE;
      return r === 1 / 0 ? n : r === -1 / 0 ? -n : r;
    };

    if (null == r) throw new ReferenceError("Parameter 'x' is required, but it was not defined");
    var t = 1.6732632423543772,
        u = 1.0507009873554805,
        a = n ? function (r) {
      return r > 0 ? u : ((r > 0 ? r : t * Math.exp(r) - t) + t) * u;
    } : function (r) {
      return (r > 0 ? r : t * Math.exp(r) - t) * u;
    };
    return Array.isArray(r) ? r.map(e(a)) : e(a(r));
  }
};
module.exports = r;

// ASSET: methods/cost.js
function t(t, u) {
  return e(t) || n(t, u) || r();
}

function r() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function n(t, r) {
  if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) {
    var n = [],
        e = !0,
        u = !1,
        a = void 0;

    try {
      for (var o, i = t[Symbol.iterator](); !(e = (o = i.next()).done) && (n.push(o.value), !r || n.length !== r); e = !0);
    } catch (c) {
      u = !0, a = c;
    } finally {
      try {
        e || null == i.return || i.return();
      } finally {
        if (u) throw a;
      }
    }

    return n;
  }
}

function e(t) {
  if (Array.isArray(t)) return t;
}

function u(t, r) {
  if (null == t || null == r) throw new ReferenceError("Missing at least one required parameters: `targets`, `outputs`");
  if (t = Array.isArray(t) ? t : [t], r = Array.isArray(r) ? r : [r], t.length !== r.length) throw new RangeError('Required "targets.length === outputs.length"; Received "targets.length='.concat(t.length, '" & "outputs.length=').concat(r.length));
  return [t, r];
}

var a = {
  CROSS_ENTROPY: function (r, n) {
    var e = t(u(r, n), 2);
    return r = e[0], (n = e[1]).reduce(function (t, e, u) {
      return t - (r[u] * Math.log(Math.max(n[u], 1e-15)) + (1 - r[u]) * Math.log(1 - Math.max(n[u], 1e-15)));
    }, 0) / n.length;
  },
  MSE: function (r, n) {
    var e = t(u(r, n), 2);
    return r = e[0], (n = e[1]).reduce(function (t, e, u) {
      return t + Math.pow(r[u] - n[u], 2);
    }, 0) / n.length;
  },
  BINARY: function (r, n) {
    var e = t(u(r, n), 2);
    return r = e[0], (n = e[1]).reduce(function (t, e, u) {
      return t + (Math.round(2 * r[u]) !== Math.round(2 * n[u]));
    }, 0);
  },
  MAE: function (r, n) {
    var e = t(u(r, n), 2);
    return r = e[0], (n = e[1]).reduce(function (t, e, u) {
      return t + Math.abs(r[u] - n[u]);
    }, 0) / n.length;
  },
  MAPE: function (r, n) {
    var e = t(u(r, n), 2);
    return r = e[0], (n = e[1]).reduce(function (t, e, u) {
      return t + Math.abs((n[u] - r[u]) / Math.max(r[u], 1e-15));
    }, 0) / n.length;
  },
  WAPE: function (r, n) {
    var e = t(u(r, n), 2);
    r = e[0], n = e[1];

    for (var a = 0, o = 0, i = 0; i < n.length; i++) a += Math.abs(r[i] - n[i]), o += r[i];

    return a / o;
  },
  MSLE: function (r, n) {
    var e = t(u(r, n), 2);
    return r = e[0], (n = e[1]).reduce(function (t, e, u) {
      return t + (Math.log(Math.max(r[u], 1e-15)) - Math.log(Math.max(n[u], 1e-15)));
    }, 0);
  },
  HINGE: function (r, n) {
    var e = t(u(r, n), 2);
    return r = e[0], (n = e[1]).reduce(function (t, e, u) {
      return t + Math.max(0, 1 - r[u] * n[u]);
    }, 0);
  }
};
module.exports = a;
var $K6Ek$var$activation = {};
/**
 *
 * Genetic algorithm mutation methods. Creates variations (mutations) in neural networks which are then selected for better performance.
 *
 * @namespace mutation
 *
 * @see {@link https://en.wikipedia.org/wiki/mutation_(genetic_algorithm)|Mutation (genetic algorithms) on Wikipedia}
 * @see {@link https://en.wikipedia.org/wiki/Genetic_algorithm#Selection|Selection (genetic algorithms) on Wikipedia}
 *
 * @example <caption>Mutation methods with networks</caption>
 * let { methods, Network } = require("@liquid-carrot/carrot");
 *
 * let myNetwork = new Network(5, 10, 5);
 *
 * // Setting a mutation method for a network
 * myNetwork.mutate(methods.mutation.ADD_NODE);
 *
 * // specifying a list of network mutation methods to use during evolution
 * myNetwork.evolve(trainingset, {
 *  mutation: [methods.mutation.MOD_BIAS, methods.mutation.ADD_NODE]
 * }
 *
 * @example <caption>Using a mutation method with a neuron</caption>
 * let { methods, Network } = require("@liquid-carrot/carrot");
 *
 * let myNetwork = new Network(5, 10, 5);
 *
 * myNode.mutate(methods.mutation.MOD_BIAS);
 */

var $K6Ek$var$mutation = {
  /**
   * @constant
   * @type {object}
   * @description Adds a node
   * @default
   *
   * @prop {boolean} randomActivation=true If enabled, sets a random activation function on the newly created node
   *
   * @example
   * let { methods, Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(5, 10, 5);
   *
   * myNetwork.mutate(methods.mutation.ADD_NODE);
   */
  ADD_NODE: {
    name: 'ADD_NODE',
    randomActivation: true
  },

  /**
   * @constant
   * @type {object}
   * @description Removes a node
   * @default
   *
   * @prop {boolean} keep_gates=true Ensures replacement node has gated connections if the removed node did.
   *
   * @example
   * let { methods, Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(5, 10, 5);
   *
   * myNetwork.mutate(methods.mutation.SUB_NODE);
   */
  SUB_NODE: {
    name: 'SUB_NODE',
    keep_gates: true
  },

  /**
   * @constant
   * @type {object}
   * @description Adds a connection between two nodes
   * @default
   *
   * @example
   * let { methods, Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(5, 10, 5);
   *
   * myNetwork.mutate(methods.mutation.ADD_CONN);
   */
  ADD_CONN: {
    name: 'ADD_CONN'
  },

  /**
   * @constant
   * @type {object}
   * @description Removes a connection between two nodes
   * @default
   *
   * @example
   * let { methods, Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(5, 10, 5);
   *
   * myNetwork.mutate(methods.mutation.SUB_CONN);
   */
  SUB_CONN: {
    name: 'REMOVE_CONN'
  },

  /**
   * @constant
   * @type {object}
   * @description Modifies the weight of a connection
   * @default
   *
   * @prop {number} min=-1 lower bound for weight modification
   * @prop {number} max=1 higher bound for weight modification
   *
   * @example
   * let { methods, Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(5, 10, 5);
   *
   * myNetwork.mutate(methods.mutation.MOD_WEIGHT);
   */
  MOD_WEIGHT: {
    name: 'MOD_WEIGHT',
    min: -1,
    max: 1
  },

  /**
   * @constant
   * @type {object}
   * @description Modifies the bias of a node
   * @default
   *
   * @prop {number} min=-1 lower bound for modification of a neuron's bias
   * @prop {number} max=1 higher bound for modification of a neuron's bias
   *
   * @example
   * let { methods, Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(5, 10, 5);
   *
   * let myNode = new Node();
   *
   * myNode.mutate(methods.mutation.MOD_BIAS);
   */
  MOD_BIAS: {
    name: 'MOD_BIAS',
    min: -1,
    max: 1
  },

  /**
   * @constant
   * @type {object}
   * @description Modifies the activation function of a node by randomly picking from the allowed activation methods
   * @default
   *
   * @prop {boolean} mutateOutput=false Change activation function of network output neurons. Enable this to let the network experiment with its output.
   * @prop {activation[]} [allowed=[all built-in activation methods]] Mutation methods to randomly select from when mutating
   *
   * @example <caption>Mutating the activation function of a node</caption>
   * let { methods, Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(5, 10, 5);
   *
   * let myNode = new Node();
   *
   * myNode.mutate(methods.mutation.MOD_ACTIVATION);
   *
   * @example <caption>Mutating the activation function of a network's nodes</caption>
   * let { methods, Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(5, 10, 5);
   *
   * let myNode = new Node();
   *
   * myNode.mutate(methods.mutation.MOD_ACTIVATION);
   */
  MOD_ACTIVATION: {
    name: 'MOD_ACTIVATION',
    mutateOutput: false,
    allowed: [$K6Ek$var$activation.LOGISTIC, $K6Ek$var$activation.TANH, $K6Ek$var$activation.RELU, $K6Ek$var$activation.IDENTITY, $K6Ek$var$activation.STEP, $K6Ek$var$activation.SOFTSIGN, $K6Ek$var$activation.SINUSOID, $K6Ek$var$activation.GAUSSIAN, $K6Ek$var$activation.BENT_IDENTITY, $K6Ek$var$activation.BIPOLAR, $K6Ek$var$activation.BIPOLAR_SIGMOID, $K6Ek$var$activation.HARD_TANH, $K6Ek$var$activation.ABSOLUTE, $K6Ek$var$activation.INVERSE, $K6Ek$var$activation.SELU]
  },

  /**
   * @constant
   * @type {object}
   * @description Adds a self-connection to a node
   * @default
   *
   * @example
   * let { methods, Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(5, 10, 5);
   *
   * myNetwork.mutate(methods.mutation.ADD_SELF_CONN);
   */
  ADD_SELF_CONN: {
    name: 'ADD_SELF_CONN'
  },

  /**
   * @constant
   * @type {object}
   * @description Removes a self-connection from a node
   * @default
   *
   * @example
   * let { methods, Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(5, 10, 5);
   *
   * myNetwork.mutate(methods.mutation.SUB_SELF_CONN);
   */
  SUB_SELF_CONN: {
    name: 'SUB_SELF_CONN'
  },

  /**
   * @constant
   * @type {object}
   * @description Makes a node gate a connection
   * @default
   *
   * @example
   * let { methods, Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(5, 10, 5);
   *
   * myNetwork.mutate(methods.mutation.ADD_GATE);
   */
  ADD_GATE: {
    name: 'ADD_GATE'
  },

  /**
   * @constant
   * @type {object}
   * @description Removes a gate from a connection
   * @default
   *
   * @example
   * let { methods, Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(5, 10, 5);
   *
   * myNetwork.mutate(methods.mutation.SUB_GATE);
   */
  SUB_GATE: {
    name: 'SUB_GATE'
  },

  /**
   * @constant
   * @type {object}
   * @description Adds a recurrent connection
   * @default
   *
   * @example
   * let { methods, Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(5, 10, 5);
   *
   * myNetwork.mutate(methods.mutation.ADD_BACK_CONN);
   */
  ADD_BACK_CONN: {
    name: 'ADD_BACK_CONN'
  },

  /**
   * @constant
   * @type {object}
   * @description Removes a recurrent connection
   * @default
   *
   * @example
   * let { methods, Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(5, 10, 5);
   *
   * myNetwork.mutate(methods.mutation.SUB_BACK_CONN);
   */
  SUB_BACK_CONN: {
    name: 'SUB_BACK_CONN'
  },

  /**
   * @constant
   * @type {object}
   * @description Swaps the bias and squash function between two nodes
   * @default
   *
   * @prop {boolean} mutateOutput=false Swap bias and activation function of network output neurons too. Disable this to keep output of a neural network normalized.
   * @example
   * let { methods, Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(5, 10, 5);
   *
   * myNetwork.mutate(methods.mutation.SWAP_NODES);
   */
  SWAP_NODES: {
    name: 'SWAP_NODES',
    mutateOutput: false
  }
};
/**
 *
 * Array of all mutation methods
 *
 * @constant
 * @type {array}
 * @default
 *
 * @example <caption>A group of mutation methods for evolution</caption>
 * let { methods, Network } = require("@liquid-carrot/carrot");
 *
 * let myNetwork = new Network(5, 10, 5);
 *
 * network.evolve(trainingset, {
 *  mutation: methods.mutation.ALL // all mutation methods
 * }
 */

$K6Ek$var$mutation.ALL = [$K6Ek$var$mutation.ADD_NODE, $K6Ek$var$mutation.SUB_NODE, $K6Ek$var$mutation.ADD_CONN, $K6Ek$var$mutation.SUB_CONN, $K6Ek$var$mutation.MOD_WEIGHT, $K6Ek$var$mutation.MOD_BIAS, $K6Ek$var$mutation.MOD_ACTIVATION, $K6Ek$var$mutation.ADD_GATE, $K6Ek$var$mutation.SUB_GATE, $K6Ek$var$mutation.ADD_SELF_CONN, $K6Ek$var$mutation.SUB_SELF_CONN, $K6Ek$var$mutation.ADD_BACK_CONN, $K6Ek$var$mutation.SUB_BACK_CONN, $K6Ek$var$mutation.SWAP_NODES];
/**
 *
 * Array of all feedforwad mutation methods
 *
 * @constant
 * @type {array}
 * @default
 *
 * @example <caption>A group of mutation methods for evolution</caption>
 * let { methods, Network } = require("@liquid-carrot/carrot");
 *
 * let myNetwork = new Network(5, 10, 5);
 *
 * network.evolve(trainingset, {
 *  mutation: methods.mutation.FFW// all feedforward mutation methods
 * }
 */

$K6Ek$var$mutation.FFW = [$K6Ek$var$mutation.ADD_NODE, $K6Ek$var$mutation.SUB_NODE, $K6Ek$var$mutation.ADD_CONN, $K6Ek$var$mutation.SUB_CONN, $K6Ek$var$mutation.MOD_WEIGHT, $K6Ek$var$mutation.MOD_BIAS, $K6Ek$var$mutation.MOD_ACTIVATION, $K6Ek$var$mutation.SWAP_NODES];
// ASSET: methods/methods.js
var e = {
  activation: require("./activation"),
  mutation: require("./mutation"),
  selection: require("./selection"),
  crossover: require("./crossover"),
  cost: require("./cost"),
  gating: require("./gating"),
  connection: require("./connection"),
  rate: require("./rate")
};
module.exports = e;
var $yh9p$export$toByteArray = $yh9p$var$toByteArray;
var $yh9p$export$fromByteArray = $yh9p$var$fromByteArray;
var $yh9p$var$lookup = [];
var $yh9p$var$revLookup = [];
var $yh9p$var$Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var $yh9p$var$code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

for (var $yh9p$var$i = 0, $yh9p$var$len = $yh9p$var$code.length; $yh9p$var$i < $yh9p$var$len; ++$yh9p$var$i) {
  $yh9p$var$lookup[$yh9p$var$i] = $yh9p$var$code[$yh9p$var$i];
  $yh9p$var$revLookup[$yh9p$var$code.charCodeAt($yh9p$var$i)] = $yh9p$var$i;
} // Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications


$yh9p$var$revLookup['-'.charCodeAt(0)] = 62;
$yh9p$var$revLookup['_'.charCodeAt(0)] = 63;

function $yh9p$var$getLens(b64) {
  var len = b64.length;

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4');
  } // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42


  var validLen = b64.indexOf('=');
  if (validLen === -1) validLen = len;
  var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
  return [validLen, placeHoldersLen];
} // base64 is 4/3 + up to two characters of the original data


function $yh9p$var$_byteLength(b64, validLen, placeHoldersLen) {
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}

function $yh9p$var$toByteArray(b64) {
  var tmp;
  var lens = $yh9p$var$getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  var arr = new $yh9p$var$Arr($yh9p$var$_byteLength(b64, validLen, placeHoldersLen));
  var curByte = 0; // if there are placeholders, only get up to the last complete 4 chars

  var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
  var i;

  for (i = 0; i < len; i += 4) {
    tmp = $yh9p$var$revLookup[b64.charCodeAt(i)] << 18 | $yh9p$var$revLookup[b64.charCodeAt(i + 1)] << 12 | $yh9p$var$revLookup[b64.charCodeAt(i + 2)] << 6 | $yh9p$var$revLookup[b64.charCodeAt(i + 3)];
    arr[curByte++] = tmp >> 16 & 0xFF;
    arr[curByte++] = tmp >> 8 & 0xFF;
    arr[curByte++] = tmp & 0xFF;
  }

  if (placeHoldersLen === 2) {
    tmp = $yh9p$var$revLookup[b64.charCodeAt(i)] << 2 | $yh9p$var$revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[curByte++] = tmp & 0xFF;
  }

  if (placeHoldersLen === 1) {
    tmp = $yh9p$var$revLookup[b64.charCodeAt(i)] << 10 | $yh9p$var$revLookup[b64.charCodeAt(i + 1)] << 4 | $yh9p$var$revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[curByte++] = tmp >> 8 & 0xFF;
    arr[curByte++] = tmp & 0xFF;
  }

  return arr;
}

function $yh9p$var$tripletToBase64(num) {
  return $yh9p$var$lookup[num >> 18 & 0x3F] + $yh9p$var$lookup[num >> 12 & 0x3F] + $yh9p$var$lookup[num >> 6 & 0x3F] + $yh9p$var$lookup[num & 0x3F];
}

function $yh9p$var$encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];

  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
    output.push($yh9p$var$tripletToBase64(tmp));
  }

  return output.join('');
}

function $yh9p$var$fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes

  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3
  // go through the array every three bytes, we'll deal with trailing stuff later

  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push($yh9p$var$encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  } // pad the end with zeros, but make sure to not forget the extra bytes


  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    parts.push($yh9p$var$lookup[tmp >> 2] + $yh9p$var$lookup[tmp << 4 & 0x3F] + '==');
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    parts.push($yh9p$var$lookup[tmp >> 10] + $yh9p$var$lookup[tmp >> 4 & 0x3F] + $yh9p$var$lookup[tmp << 2 & 0x3F] + '=');
  }

  return parts.join('');
}

var $JgNJ$export$read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];
  i += d;
  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;

  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;

  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }

  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

var $JgNJ$export$write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);

    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }

    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }

    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = e << mLen | m;
  eLen += mLen;

  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
};

// ASSET: ../node_modules/isarray/index.js
var $REa7$exports = {};
var $REa7$var$toString = {}.toString;

$REa7$exports = Array.isArray || function (arr) {
  return $REa7$var$toString.call(arr) == '[object Array]';
};

var $dskh$export$INSPECT_MAX_BYTES = 50;

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
$dskh$var$Buffer.TYPED_ARRAY_SUPPORT = $parcel$global.TYPED_ARRAY_SUPPORT !== undefined ? $parcel$global.TYPED_ARRAY_SUPPORT : $dskh$var$typedArraySupport();
/*
 * Export kMaxLength after typed array support is determined.
 */

var $dskh$export$kMaxLength = $dskh$var$kMaxLength();

function $dskh$var$typedArraySupport() {
  try {
    var arr = new Uint8Array(1);
    arr.__proto__ = {
      __proto__: Uint8Array.prototype,
      foo: function () {
        return 42;
      }
    };
    return arr.foo() === 42 && // typed array instances can be augmented
    typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
    arr.subarray(1, 1).byteLength === 0; // ie10 has broken `subarray`
  } catch (e) {
    return false;
  }
}

function $dskh$var$kMaxLength() {
  return $dskh$var$Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
}

function $dskh$var$createBuffer(that, length) {
  if ($dskh$var$kMaxLength() < length) {
    throw new RangeError('Invalid typed array length');
  }

  if ($dskh$var$Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length);
    that.__proto__ = $dskh$var$Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new $dskh$var$Buffer(length);
    }

    that.length = length;
  }

  return that;
}
/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */


function $dskh$var$Buffer(arg, encodingOrOffset, length) {
  if (!$dskh$var$Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof $dskh$var$Buffer)) {
    return new $dskh$var$Buffer(arg, encodingOrOffset, length);
  } // Common case.


  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error('If encoding is specified then the first argument must be a string');
    }

    return $dskh$var$allocUnsafe(this, arg);
  }

  return $dskh$var$from(this, arg, encodingOrOffset, length);
}

$dskh$var$Buffer.poolSize = 8192; // not used by this implementation
// TODO: Legacy, not needed anymore. Remove in next major version.

$dskh$var$Buffer._augment = function (arr) {
  arr.__proto__ = $dskh$var$Buffer.prototype;
  return arr;
};

function $dskh$var$from(that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return $dskh$var$fromArrayBuffer(that, value, encodingOrOffset, length);
  }

  if (typeof value === 'string') {
    return $dskh$var$fromString(that, value, encodingOrOffset);
  }

  return $dskh$var$fromObject(that, value);
}
/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/


$dskh$var$Buffer.from = function (value, encodingOrOffset, length) {
  return $dskh$var$from(null, value, encodingOrOffset, length);
};

if ($dskh$var$Buffer.TYPED_ARRAY_SUPPORT) {
  $dskh$var$Buffer.prototype.__proto__ = Uint8Array.prototype;
  $dskh$var$Buffer.__proto__ = Uint8Array;

  if (typeof Symbol !== 'undefined' && Symbol.species && $dskh$var$Buffer[Symbol.species] === $dskh$var$Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty($dskh$var$Buffer, Symbol.species, {
      value: null,
      configurable: true
    });
  }
}

function $dskh$var$assertSize(size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number');
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative');
  }
}

function $dskh$var$alloc(that, size, fill, encoding) {
  $dskh$var$assertSize(size);

  if (size <= 0) {
    return $dskh$var$createBuffer(that, size);
  }

  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string' ? $dskh$var$createBuffer(that, size).fill(fill, encoding) : $dskh$var$createBuffer(that, size).fill(fill);
  }

  return $dskh$var$createBuffer(that, size);
}
/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/


$dskh$var$Buffer.alloc = function (size, fill, encoding) {
  return $dskh$var$alloc(null, size, fill, encoding);
};

function $dskh$var$allocUnsafe(that, size) {
  $dskh$var$assertSize(size);
  that = $dskh$var$createBuffer(that, size < 0 ? 0 : $dskh$var$checked(size) | 0);

  if (!$dskh$var$Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }

  return that;
}
/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */


$dskh$var$Buffer.allocUnsafe = function (size) {
  return $dskh$var$allocUnsafe(null, size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */


$dskh$var$Buffer.allocUnsafeSlow = function (size) {
  return $dskh$var$allocUnsafe(null, size);
};

function $dskh$var$fromString(that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!$dskh$var$Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding');
  }

  var length = $dskh$var$byteLength(string, encoding) | 0;
  that = $dskh$var$createBuffer(that, length);
  var actual = that.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual);
  }

  return that;
}

function $dskh$var$fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : $dskh$var$checked(array.length) | 0;
  that = $dskh$var$createBuffer(that, length);

  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }

  return that;
}

function $dskh$var$fromArrayBuffer(that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds');
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds');
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array);
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }

  if ($dskh$var$Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = $dskh$var$Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = $dskh$var$fromArrayLike(that, array);
  }

  return that;
}

function $dskh$var$fromObject(that, obj) {
  if ($dskh$var$Buffer.isBuffer(obj)) {
    var len = $dskh$var$checked(obj.length) | 0;
    that = $dskh$var$createBuffer(that, len);

    if (that.length === 0) {
      return that;
    }

    obj.copy(that, 0, 0, len);
    return that;
  }

  if (obj) {
    if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
      if (typeof obj.length !== 'number' || $dskh$var$isnan(obj.length)) {
        return $dskh$var$createBuffer(that, 0);
      }

      return $dskh$var$fromArrayLike(that, obj);
    }

    if (obj.type === 'Buffer' && $REa7$exports(obj.data)) {
      return $dskh$var$fromArrayLike(that, obj.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
}

function $dskh$var$checked(length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= $dskh$var$kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + $dskh$var$kMaxLength().toString(16) + ' bytes');
  }

  return length | 0;
}

$dskh$var$Buffer.isBuffer = function isBuffer(b) {
  return !!(b != null && b._isBuffer);
};

$dskh$var$Buffer.compare = function compare(a, b) {
  if (!$dskh$var$Buffer.isBuffer(a) || !$dskh$var$Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers');
  }

  if (a === b) return 0;
  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};

$dskh$var$Buffer.isEncoding = function isEncoding(encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true;

    default:
      return false;
  }
};

$dskh$var$Buffer.concat = function concat(list, length) {
  if (!$REa7$exports(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers');
  }

  if (list.length === 0) {
    return $dskh$var$Buffer.alloc(0);
  }

  var i;

  if (length === undefined) {
    length = 0;

    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = $dskh$var$Buffer.allocUnsafe(length);
  var pos = 0;

  for (i = 0; i < list.length; ++i) {
    var buf = list[i];

    if (!$dskh$var$Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }

    buf.copy(buffer, pos);
    pos += buf.length;
  }

  return buffer;
};

function $dskh$var$byteLength(string, encoding) {
  if ($dskh$var$Buffer.isBuffer(string)) {
    return string.length;
  }

  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength;
  }

  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0; // Use a for loop to avoid recursion

  var loweredCase = false;

  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len;

      case 'utf8':
      case 'utf-8':
      case undefined:
        return $dskh$var$utf8ToBytes(string).length;

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2;

      case 'hex':
        return len >>> 1;

      case 'base64':
        return $dskh$var$base64ToBytes(string).length;

      default:
        if (loweredCase) return $dskh$var$utf8ToBytes(string).length; // assume utf8

        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}

$dskh$var$Buffer.byteLength = $dskh$var$byteLength;

function $dskh$var$slowToString(encoding, start, end) {
  var loweredCase = false; // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.
  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.

  if (start === undefined || start < 0) {
    start = 0;
  } // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.


  if (start > this.length) {
    return '';
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return '';
  } // Force coersion to uint32. This will also coerce falsey/NaN values to 0.


  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return '';
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return $dskh$var$hexSlice(this, start, end);

      case 'utf8':
      case 'utf-8':
        return $dskh$var$utf8Slice(this, start, end);

      case 'ascii':
        return $dskh$var$asciiSlice(this, start, end);

      case 'latin1':
      case 'binary':
        return $dskh$var$latin1Slice(this, start, end);

      case 'base64':
        return $dskh$var$base64Slice(this, start, end);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return $dskh$var$utf16leSlice(this, start, end);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
} // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.


$dskh$var$Buffer.prototype._isBuffer = true;

function $dskh$var$swap(b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

$dskh$var$Buffer.prototype.swap16 = function swap16() {
  var len = this.length;

  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits');
  }

  for (var i = 0; i < len; i += 2) {
    $dskh$var$swap(this, i, i + 1);
  }

  return this;
};

$dskh$var$Buffer.prototype.swap32 = function swap32() {
  var len = this.length;

  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits');
  }

  for (var i = 0; i < len; i += 4) {
    $dskh$var$swap(this, i, i + 3);
    $dskh$var$swap(this, i + 1, i + 2);
  }

  return this;
};

$dskh$var$Buffer.prototype.swap64 = function swap64() {
  var len = this.length;

  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits');
  }

  for (var i = 0; i < len; i += 8) {
    $dskh$var$swap(this, i, i + 7);
    $dskh$var$swap(this, i + 1, i + 6);
    $dskh$var$swap(this, i + 2, i + 5);
    $dskh$var$swap(this, i + 3, i + 4);
  }

  return this;
};

$dskh$var$Buffer.prototype.toString = function toString() {
  var length = this.length | 0;
  if (length === 0) return '';
  if (arguments.length === 0) return $dskh$var$utf8Slice(this, 0, length);
  return $dskh$var$slowToString.apply(this, arguments);
};

$dskh$var$Buffer.prototype.equals = function equals(b) {
  if (!$dskh$var$Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
  if (this === b) return true;
  return $dskh$var$Buffer.compare(this, b) === 0;
};

$dskh$var$Buffer.prototype.inspect = function inspect() {
  var str = '';
  var max = $dskh$export$INSPECT_MAX_BYTES;

  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }

  return '<Buffer ' + str + '>';
};

$dskh$var$Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
  if (!$dskh$var$Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer');
  }

  if (start === undefined) {
    start = 0;
  }

  if (end === undefined) {
    end = target ? target.length : 0;
  }

  if (thisStart === undefined) {
    thisStart = 0;
  }

  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index');
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0;
  }

  if (thisStart >= thisEnd) {
    return -1;
  }

  if (start >= end) {
    return 1;
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;
  if (this === target) return 0;
  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);
  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
}; // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf


function $dskh$var$bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1; // Normalize byteOffset

  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }

  byteOffset = +byteOffset; // Coerce to Number.

  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : buffer.length - 1;
  } // Normalize byteOffset: negative offsets start from the end of the buffer


  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;

  if (byteOffset >= buffer.length) {
    if (dir) return -1;else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;else return -1;
  } // Normalize val


  if (typeof val === 'string') {
    val = $dskh$var$Buffer.from(val, encoding);
  } // Finally, search either indexOf (if dir is true) or lastIndexOf


  if ($dskh$var$Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1;
    }

    return $dskh$var$arrayIndexOf(buffer, val, byteOffset, encoding, dir);
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]

    if ($dskh$var$Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
      }
    }

    return $dskh$var$arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
  }

  throw new TypeError('val must be string, number or Buffer');
}

function $dskh$var$arrayIndexOf(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();

    if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1;
      }

      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read(buf, i) {
    if (indexSize === 1) {
      return buf[i];
    } else {
      return buf.readUInt16BE(i * indexSize);
    }
  }

  var i;

  if (dir) {
    var foundIndex = -1;

    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;

    for (i = byteOffset; i >= 0; i--) {
      var found = true;

      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break;
        }
      }

      if (found) return i;
    }
  }

  return -1;
}

$dskh$var$Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1;
};

$dskh$var$Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
  return $dskh$var$bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};

$dskh$var$Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
  return $dskh$var$bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};

function $dskh$var$hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;

  if (!length) {
    length = remaining;
  } else {
    length = Number(length);

    if (length > remaining) {
      length = remaining;
    }
  } // must be an even number of digits


  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string');

  if (length > strLen / 2) {
    length = strLen / 2;
  }

  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i;
    buf[offset + i] = parsed;
  }

  return i;
}

function $dskh$var$utf8Write(buf, string, offset, length) {
  return $dskh$var$blitBuffer($dskh$var$utf8ToBytes(string, buf.length - offset), buf, offset, length);
}

function $dskh$var$asciiWrite(buf, string, offset, length) {
  return $dskh$var$blitBuffer($dskh$var$asciiToBytes(string), buf, offset, length);
}

function $dskh$var$latin1Write(buf, string, offset, length) {
  return $dskh$var$asciiWrite(buf, string, offset, length);
}

function $dskh$var$base64Write(buf, string, offset, length) {
  return $dskh$var$blitBuffer($dskh$var$base64ToBytes(string), buf, offset, length);
}

function $dskh$var$ucs2Write(buf, string, offset, length) {
  return $dskh$var$blitBuffer($dskh$var$utf16leToBytes(string, buf.length - offset), buf, offset, length);
}

$dskh$var$Buffer.prototype.write = function write(string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0; // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0; // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;

    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    } // legacy write(string, encoding, offset, length) - remove in v0.13

  } else {
    throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds');
  }

  if (!encoding) encoding = 'utf8';
  var loweredCase = false;

  for (;;) {
    switch (encoding) {
      case 'hex':
        return $dskh$var$hexWrite(this, string, offset, length);

      case 'utf8':
      case 'utf-8':
        return $dskh$var$utf8Write(this, string, offset, length);

      case 'ascii':
        return $dskh$var$asciiWrite(this, string, offset, length);

      case 'latin1':
      case 'binary':
        return $dskh$var$latin1Write(this, string, offset, length);

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return $dskh$var$base64Write(this, string, offset, length);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return $dskh$var$ucs2Write(this, string, offset, length);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

$dskh$var$Buffer.prototype.toJSON = function toJSON() {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};

function $dskh$var$base64Slice(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return $yh9p$export$fromByteArray(buf);
  } else {
    return $yh9p$export$fromByteArray(buf.slice(start, end));
  }
}

function $dskh$var$utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];
  var i = start;

  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }

          break;

        case 2:
          secondByte = buf[i + 1];

          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;

            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }

          break;

        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];

          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;

            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }

          break;

        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];

          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;

            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }

      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return $dskh$var$decodeCodePointsArray(res);
} // Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety


var $dskh$var$MAX_ARGUMENTS_LENGTH = 0x1000;

function $dskh$var$decodeCodePointsArray(codePoints) {
  var len = codePoints.length;

  if (len <= $dskh$var$MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
  } // Decode in chunks to avoid "call stack size exceeded".


  var res = '';
  var i = 0;

  while (i < len) {
    res += String.fromCharCode.apply(String, codePoints.slice(i, i += $dskh$var$MAX_ARGUMENTS_LENGTH));
  }

  return res;
}

function $dskh$var$asciiSlice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }

  return ret;
}

function $dskh$var$latin1Slice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }

  return ret;
}

function $dskh$var$hexSlice(buf, start, end) {
  var len = buf.length;
  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;
  var out = '';

  for (var i = start; i < end; ++i) {
    out += $dskh$var$toHex(buf[i]);
  }

  return out;
}

function $dskh$var$utf16leSlice(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';

  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }

  return res;
}

$dskh$var$Buffer.prototype.slice = function slice(start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;
  var newBuf;

  if ($dskh$var$Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = $dskh$var$Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new $dskh$var$Buffer(sliceLen, undefined);

    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf;
};
/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */


function $dskh$var$checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
}

$dskh$var$Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) $dskh$var$checkOffset(offset, byteLength, this.length);
  var val = this[offset];
  var mul = 1;
  var i = 0;

  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val;
};

$dskh$var$Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;

  if (!noAssert) {
    $dskh$var$checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;

  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val;
};

$dskh$var$Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
  if (!noAssert) $dskh$var$checkOffset(offset, 1, this.length);
  return this[offset];
};

$dskh$var$Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
  if (!noAssert) $dskh$var$checkOffset(offset, 2, this.length);
  return this[offset] | this[offset + 1] << 8;
};

$dskh$var$Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
  if (!noAssert) $dskh$var$checkOffset(offset, 2, this.length);
  return this[offset] << 8 | this[offset + 1];
};

$dskh$var$Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
  if (!noAssert) $dskh$var$checkOffset(offset, 4, this.length);
  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};

$dskh$var$Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
  if (!noAssert) $dskh$var$checkOffset(offset, 4, this.length);
  return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};

$dskh$var$Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) $dskh$var$checkOffset(offset, byteLength, this.length);
  var val = this[offset];
  var mul = 1;
  var i = 0;

  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  mul *= 0x80;
  if (val >= mul) val -= Math.pow(2, 8 * byteLength);
  return val;
};

$dskh$var$Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) $dskh$var$checkOffset(offset, byteLength, this.length);
  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];

  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }

  mul *= 0x80;
  if (val >= mul) val -= Math.pow(2, 8 * byteLength);
  return val;
};

$dskh$var$Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
  if (!noAssert) $dskh$var$checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return this[offset];
  return (0xff - this[offset] + 1) * -1;
};

$dskh$var$Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
  if (!noAssert) $dskh$var$checkOffset(offset, 2, this.length);
  var val = this[offset] | this[offset + 1] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

$dskh$var$Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
  if (!noAssert) $dskh$var$checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | this[offset] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

$dskh$var$Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
  if (!noAssert) $dskh$var$checkOffset(offset, 4, this.length);
  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};

$dskh$var$Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
  if (!noAssert) $dskh$var$checkOffset(offset, 4, this.length);
  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};

$dskh$var$Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
  if (!noAssert) $dskh$var$checkOffset(offset, 4, this.length);
  return $JgNJ$export$read(this, offset, true, 23, 4);
};

$dskh$var$Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
  if (!noAssert) $dskh$var$checkOffset(offset, 4, this.length);
  return $JgNJ$export$read(this, offset, false, 23, 4);
};

$dskh$var$Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
  if (!noAssert) $dskh$var$checkOffset(offset, 8, this.length);
  return $JgNJ$export$read(this, offset, true, 52, 8);
};

$dskh$var$Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
  if (!noAssert) $dskh$var$checkOffset(offset, 8, this.length);
  return $JgNJ$export$read(this, offset, false, 52, 8);
};

function $dskh$var$checkInt(buf, value, offset, ext, max, min) {
  if (!$dskh$var$Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
}

$dskh$var$Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;

  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    $dskh$var$checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;

  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

$dskh$var$Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;

  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    $dskh$var$checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;

  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

$dskh$var$Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) $dskh$var$checkInt(this, value, offset, 1, 0xff, 0);
  if (!$dskh$var$Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = value & 0xff;
  return offset + 1;
};

function $dskh$var$objectWriteUInt16(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;

  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
  }
}

$dskh$var$Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) $dskh$var$checkInt(this, value, offset, 2, 0xffff, 0);

  if ($dskh$var$Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    $dskh$var$objectWriteUInt16(this, value, offset, true);
  }

  return offset + 2;
};

$dskh$var$Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) $dskh$var$checkInt(this, value, offset, 2, 0xffff, 0);

  if ($dskh$var$Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    $dskh$var$objectWriteUInt16(this, value, offset, false);
  }

  return offset + 2;
};

function $dskh$var$objectWriteUInt32(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;

  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
  }
}

$dskh$var$Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) $dskh$var$checkInt(this, value, offset, 4, 0xffffffff, 0);

  if ($dskh$var$Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 0xff;
  } else {
    $dskh$var$objectWriteUInt32(this, value, offset, true);
  }

  return offset + 4;
};

$dskh$var$Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) $dskh$var$checkInt(this, value, offset, 4, 0xffffffff, 0);

  if ($dskh$var$Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    $dskh$var$objectWriteUInt32(this, value, offset, false);
  }

  return offset + 4;
};

$dskh$var$Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;

  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);
    $dskh$var$checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;

  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }

    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

$dskh$var$Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;

  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);
    $dskh$var$checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;

  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }

    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

$dskh$var$Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) $dskh$var$checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!$dskh$var$Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = value & 0xff;
  return offset + 1;
};

$dskh$var$Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) $dskh$var$checkInt(this, value, offset, 2, 0x7fff, -0x8000);

  if ($dskh$var$Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    $dskh$var$objectWriteUInt16(this, value, offset, true);
  }

  return offset + 2;
};

$dskh$var$Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) $dskh$var$checkInt(this, value, offset, 2, 0x7fff, -0x8000);

  if ($dskh$var$Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    $dskh$var$objectWriteUInt16(this, value, offset, false);
  }

  return offset + 2;
};

$dskh$var$Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) $dskh$var$checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);

  if ($dskh$var$Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
  } else {
    $dskh$var$objectWriteUInt32(this, value, offset, true);
  }

  return offset + 4;
};

$dskh$var$Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) $dskh$var$checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;

  if ($dskh$var$Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    $dskh$var$objectWriteUInt32(this, value, offset, false);
  }

  return offset + 4;
};

function $dskh$var$checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
  if (offset < 0) throw new RangeError('Index out of range');
}

function $dskh$var$writeFloat(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    $dskh$var$checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }

  $JgNJ$export$write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}

$dskh$var$Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
  return $dskh$var$writeFloat(this, value, offset, true, noAssert);
};

$dskh$var$Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
  return $dskh$var$writeFloat(this, value, offset, false, noAssert);
};

function $dskh$var$writeDouble(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    $dskh$var$checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }

  $JgNJ$export$write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}

$dskh$var$Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
  return $dskh$var$writeDouble(this, value, offset, true, noAssert);
};

$dskh$var$Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
  return $dskh$var$writeDouble(this, value, offset, false, noAssert);
}; // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)


$dskh$var$Buffer.prototype.copy = function copy(target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start; // Copy 0 bytes; we're done

  if (end === start) return 0;
  if (target.length === 0 || this.length === 0) return 0; // Fatal error conditions

  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds');
  }

  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
  if (end < 0) throw new RangeError('sourceEnd out of bounds'); // Are we oob?

  if (end > this.length) end = this.length;

  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !$dskh$var$Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
  }

  return len;
}; // Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])


$dskh$var$Buffer.prototype.fill = function fill(val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }

    if (val.length === 1) {
      var code = val.charCodeAt(0);

      if (code < 256) {
        val = code;
      }
    }

    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string');
    }

    if (typeof encoding === 'string' && !$dskh$var$Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding);
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  } // Invalid ranges are not set to a default, so can range check early.


  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index');
  }

  if (end <= start) {
    return this;
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;
  if (!val) val = 0;
  var i;

  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = $dskh$var$Buffer.isBuffer(val) ? val : $dskh$var$utf8ToBytes(new $dskh$var$Buffer(val, encoding).toString());
    var len = bytes.length;

    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this;
}; // HELPER FUNCTIONS
// ================


var $dskh$var$INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function $dskh$var$base64clean(str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = $dskh$var$stringtrim(str).replace($dskh$var$INVALID_BASE64_RE, ''); // Node converts strings with length < 2 to ''

  if (str.length < 2) return ''; // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not

  while (str.length % 4 !== 0) {
    str = str + '=';
  }

  return str;
}

function $dskh$var$stringtrim(str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, '');
}

function $dskh$var$toHex(n) {
  if (n < 16) return '0' + n.toString(16);
  return n.toString(16);
}

function $dskh$var$utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i); // is surrogate component

    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } // valid lead


        leadSurrogate = codePoint;
        continue;
      } // 2 leads in a row


      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue;
      } // valid surrogate pair


      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null; // encode utf8

    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break;
      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break;
      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break;
      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else {
      throw new Error('Invalid code point');
    }
  }

  return bytes;
}

function $dskh$var$asciiToBytes(str) {
  var byteArray = [];

  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }

  return byteArray;
}

function $dskh$var$utf16leToBytes(str, units) {
  var c, hi, lo;
  var byteArray = [];

  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break;
    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray;
}

function $dskh$var$base64ToBytes(str) {
  return $yh9p$export$toByteArray($dskh$var$base64clean(str));
}

function $dskh$var$blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length) break;
    dst[i + offset] = src[i];
  }

  return i;
}

function $dskh$var$isnan(val) {
  return val !== val; // eslint-disable-line no-self-compare
}

// ASSET: ../node_modules/lodash/lodash.js
var $B1iE$exports = function () {
  var exports = this;
  var module = {
    exports: this
  };
  var define;

  var Buffer = require("buffer").Buffer;
  /**
   * @license
   * Lodash <https://lodash.com/>
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */


  ;
  (function () {
    /** Used as a safe reference for `undefined` in pre-ES5 environments. */
    var undefined;
    /** Used as the semantic version number. */

    var VERSION = '4.17.15';
    /** Used as the size to enable large array optimizations. */

    var LARGE_ARRAY_SIZE = 200;
    /** Error message constants. */

    var CORE_ERROR_TEXT = 'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.',
        FUNC_ERROR_TEXT = 'Expected a function';
    /** Used to stand-in for `undefined` hash values. */

    var HASH_UNDEFINED = '__lodash_hash_undefined__';
    /** Used as the maximum memoize cache size. */

    var MAX_MEMOIZE_SIZE = 500;
    /** Used as the internal argument placeholder. */

    var PLACEHOLDER = '__lodash_placeholder__';
    /** Used to compose bitmasks for cloning. */

    var CLONE_DEEP_FLAG = 1,
        CLONE_FLAT_FLAG = 2,
        CLONE_SYMBOLS_FLAG = 4;
    /** Used to compose bitmasks for value comparisons. */

    var COMPARE_PARTIAL_FLAG = 1,
        COMPARE_UNORDERED_FLAG = 2;
    /** Used to compose bitmasks for function metadata. */

    var WRAP_BIND_FLAG = 1,
        WRAP_BIND_KEY_FLAG = 2,
        WRAP_CURRY_BOUND_FLAG = 4,
        WRAP_CURRY_FLAG = 8,
        WRAP_CURRY_RIGHT_FLAG = 16,
        WRAP_PARTIAL_FLAG = 32,
        WRAP_PARTIAL_RIGHT_FLAG = 64,
        WRAP_ARY_FLAG = 128,
        WRAP_REARG_FLAG = 256,
        WRAP_FLIP_FLAG = 512;
    /** Used as default options for `_.truncate`. */

    var DEFAULT_TRUNC_LENGTH = 30,
        DEFAULT_TRUNC_OMISSION = '...';
    /** Used to detect hot functions by number of calls within a span of milliseconds. */

    var HOT_COUNT = 800,
        HOT_SPAN = 16;
    /** Used to indicate the type of lazy iteratees. */

    var LAZY_FILTER_FLAG = 1,
        LAZY_MAP_FLAG = 2,
        LAZY_WHILE_FLAG = 3;
    /** Used as references for various `Number` constants. */

    var INFINITY = 1 / 0,
        MAX_SAFE_INTEGER = 9007199254740991,
        MAX_INTEGER = 1.7976931348623157e+308,
        NAN = 0 / 0;
    /** Used as references for the maximum length and index of an array. */

    var MAX_ARRAY_LENGTH = 4294967295,
        MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
        HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
    /** Used to associate wrap methods with their bit flags. */

    var wrapFlags = [['ary', WRAP_ARY_FLAG], ['bind', WRAP_BIND_FLAG], ['bindKey', WRAP_BIND_KEY_FLAG], ['curry', WRAP_CURRY_FLAG], ['curryRight', WRAP_CURRY_RIGHT_FLAG], ['flip', WRAP_FLIP_FLAG], ['partial', WRAP_PARTIAL_FLAG], ['partialRight', WRAP_PARTIAL_RIGHT_FLAG], ['rearg', WRAP_REARG_FLAG]];
    /** `Object#toString` result references. */

    var argsTag = '[object Arguments]',
        arrayTag = '[object Array]',
        asyncTag = '[object AsyncFunction]',
        boolTag = '[object Boolean]',
        dateTag = '[object Date]',
        domExcTag = '[object DOMException]',
        errorTag = '[object Error]',
        funcTag = '[object Function]',
        genTag = '[object GeneratorFunction]',
        mapTag = '[object Map]',
        numberTag = '[object Number]',
        nullTag = '[object Null]',
        objectTag = '[object Object]',
        promiseTag = '[object Promise]',
        proxyTag = '[object Proxy]',
        regexpTag = '[object RegExp]',
        setTag = '[object Set]',
        stringTag = '[object String]',
        symbolTag = '[object Symbol]',
        undefinedTag = '[object Undefined]',
        weakMapTag = '[object WeakMap]',
        weakSetTag = '[object WeakSet]';
    var arrayBufferTag = '[object ArrayBuffer]',
        dataViewTag = '[object DataView]',
        float32Tag = '[object Float32Array]',
        float64Tag = '[object Float64Array]',
        int8Tag = '[object Int8Array]',
        int16Tag = '[object Int16Array]',
        int32Tag = '[object Int32Array]',
        uint8Tag = '[object Uint8Array]',
        uint8ClampedTag = '[object Uint8ClampedArray]',
        uint16Tag = '[object Uint16Array]',
        uint32Tag = '[object Uint32Array]';
    /** Used to match empty string literals in compiled template source. */

    var reEmptyStringLeading = /\b__p \+= '';/g,
        reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
        reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
    /** Used to match HTML entities and HTML characters. */

    var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
        reUnescapedHtml = /[&<>"']/g,
        reHasEscapedHtml = RegExp(reEscapedHtml.source),
        reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
    /** Used to match template delimiters. */

    var reEscape = /<%-([\s\S]+?)%>/g,
        reEvaluate = /<%([\s\S]+?)%>/g,
        reInterpolate = /<%=([\s\S]+?)%>/g;
    /** Used to match property names within property paths. */

    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
        reIsPlainProp = /^\w*$/,
        rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    /**
     * Used to match `RegExp`
     * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
     */

    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
        reHasRegExpChar = RegExp(reRegExpChar.source);
    /** Used to match leading and trailing whitespace. */

    var reTrim = /^\s+|\s+$/g,
        reTrimStart = /^\s+/,
        reTrimEnd = /\s+$/;
    /** Used to match wrap detail comments. */

    var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
        reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
        reSplitDetails = /,? & /;
    /** Used to match words composed of alphanumeric characters. */

    var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
    /** Used to match backslashes in property paths. */

    var reEscapeChar = /\\(\\)?/g;
    /**
     * Used to match
     * [ES template delimiters](http://ecma-international.org/ecma-262/7.0/#sec-template-literal-lexical-components).
     */

    var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
    /** Used to match `RegExp` flags from their coerced string values. */

    var reFlags = /\w*$/;
    /** Used to detect bad signed hexadecimal string values. */

    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    /** Used to detect binary string values. */

    var reIsBinary = /^0b[01]+$/i;
    /** Used to detect host constructors (Safari). */

    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    /** Used to detect octal string values. */

    var reIsOctal = /^0o[0-7]+$/i;
    /** Used to detect unsigned integer values. */

    var reIsUint = /^(?:0|[1-9]\d*)$/;
    /** Used to match Latin Unicode letters (excluding mathematical operators). */

    var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
    /** Used to ensure capturing order of template delimiters. */

    var reNoMatch = /($^)/;
    /** Used to match unescaped characters in compiled string literals. */

    var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
    /** Used to compose unicode character classes. */

    var rsAstralRange = '\\ud800-\\udfff',
        rsComboMarksRange = '\\u0300-\\u036f',
        reComboHalfMarksRange = '\\ufe20-\\ufe2f',
        rsComboSymbolsRange = '\\u20d0-\\u20ff',
        rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
        rsDingbatRange = '\\u2700-\\u27bf',
        rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
        rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
        rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
        rsPunctuationRange = '\\u2000-\\u206f',
        rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
        rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
        rsVarRange = '\\ufe0e\\ufe0f',
        rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
    /** Used to compose unicode capture groups. */

    var rsApos = "['\u2019]",
        rsAstral = '[' + rsAstralRange + ']',
        rsBreak = '[' + rsBreakRange + ']',
        rsCombo = '[' + rsComboRange + ']',
        rsDigits = '\\d+',
        rsDingbat = '[' + rsDingbatRange + ']',
        rsLower = '[' + rsLowerRange + ']',
        rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
        rsFitz = '\\ud83c[\\udffb-\\udfff]',
        rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
        rsNonAstral = '[^' + rsAstralRange + ']',
        rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
        rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
        rsUpper = '[' + rsUpperRange + ']',
        rsZWJ = '\\u200d';
    /** Used to compose unicode regexes. */

    var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
        rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
        rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
        rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
        reOptMod = rsModifier + '?',
        rsOptVar = '[' + rsVarRange + ']?',
        rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
        rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
        rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
        rsSeq = rsOptVar + reOptMod + rsOptJoin,
        rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq,
        rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
    /** Used to match apostrophes. */

    var reApos = RegExp(rsApos, 'g');
    /**
     * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
     * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
     */

    var reComboMark = RegExp(rsCombo, 'g');
    /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */

    var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');
    /** Used to match complex or compound words. */

    var reUnicodeWord = RegExp([rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')', rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')', rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower, rsUpper + '+' + rsOptContrUpper, rsOrdUpper, rsOrdLower, rsDigits, rsEmoji].join('|'), 'g');
    /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */

    var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + ']');
    /** Used to detect strings that need a more robust regexp to match words. */

    var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
    /** Used to assign default `context` object properties. */

    var contextProps = ['Array', 'Buffer', 'DataView', 'Date', 'Error', 'Float32Array', 'Float64Array', 'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Map', 'Math', 'Object', 'Promise', 'RegExp', 'Set', 'String', 'Symbol', 'TypeError', 'Uint8Array', 'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'WeakMap', '_', 'clearTimeout', 'isFinite', 'parseInt', 'setTimeout'];
    /** Used to make template sourceURLs easier to identify. */

    var templateCounter = -1;
    /** Used to identify `toStringTag` values of typed arrays. */

    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    /** Used to identify `toStringTag` values supported by `_.clone`. */

    var cloneableTags = {};
    cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
    cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
    /** Used to map Latin Unicode letters to basic Latin letters. */

    var deburredLetters = {
      // Latin-1 Supplement block.
      '\xc0': 'A',
      '\xc1': 'A',
      '\xc2': 'A',
      '\xc3': 'A',
      '\xc4': 'A',
      '\xc5': 'A',
      '\xe0': 'a',
      '\xe1': 'a',
      '\xe2': 'a',
      '\xe3': 'a',
      '\xe4': 'a',
      '\xe5': 'a',
      '\xc7': 'C',
      '\xe7': 'c',
      '\xd0': 'D',
      '\xf0': 'd',
      '\xc8': 'E',
      '\xc9': 'E',
      '\xca': 'E',
      '\xcb': 'E',
      '\xe8': 'e',
      '\xe9': 'e',
      '\xea': 'e',
      '\xeb': 'e',
      '\xcc': 'I',
      '\xcd': 'I',
      '\xce': 'I',
      '\xcf': 'I',
      '\xec': 'i',
      '\xed': 'i',
      '\xee': 'i',
      '\xef': 'i',
      '\xd1': 'N',
      '\xf1': 'n',
      '\xd2': 'O',
      '\xd3': 'O',
      '\xd4': 'O',
      '\xd5': 'O',
      '\xd6': 'O',
      '\xd8': 'O',
      '\xf2': 'o',
      '\xf3': 'o',
      '\xf4': 'o',
      '\xf5': 'o',
      '\xf6': 'o',
      '\xf8': 'o',
      '\xd9': 'U',
      '\xda': 'U',
      '\xdb': 'U',
      '\xdc': 'U',
      '\xf9': 'u',
      '\xfa': 'u',
      '\xfb': 'u',
      '\xfc': 'u',
      '\xdd': 'Y',
      '\xfd': 'y',
      '\xff': 'y',
      '\xc6': 'Ae',
      '\xe6': 'ae',
      '\xde': 'Th',
      '\xfe': 'th',
      '\xdf': 'ss',
      // Latin Extended-A block.
      '\u0100': 'A',
      '\u0102': 'A',
      '\u0104': 'A',
      '\u0101': 'a',
      '\u0103': 'a',
      '\u0105': 'a',
      '\u0106': 'C',
      '\u0108': 'C',
      '\u010a': 'C',
      '\u010c': 'C',
      '\u0107': 'c',
      '\u0109': 'c',
      '\u010b': 'c',
      '\u010d': 'c',
      '\u010e': 'D',
      '\u0110': 'D',
      '\u010f': 'd',
      '\u0111': 'd',
      '\u0112': 'E',
      '\u0114': 'E',
      '\u0116': 'E',
      '\u0118': 'E',
      '\u011a': 'E',
      '\u0113': 'e',
      '\u0115': 'e',
      '\u0117': 'e',
      '\u0119': 'e',
      '\u011b': 'e',
      '\u011c': 'G',
      '\u011e': 'G',
      '\u0120': 'G',
      '\u0122': 'G',
      '\u011d': 'g',
      '\u011f': 'g',
      '\u0121': 'g',
      '\u0123': 'g',
      '\u0124': 'H',
      '\u0126': 'H',
      '\u0125': 'h',
      '\u0127': 'h',
      '\u0128': 'I',
      '\u012a': 'I',
      '\u012c': 'I',
      '\u012e': 'I',
      '\u0130': 'I',
      '\u0129': 'i',
      '\u012b': 'i',
      '\u012d': 'i',
      '\u012f': 'i',
      '\u0131': 'i',
      '\u0134': 'J',
      '\u0135': 'j',
      '\u0136': 'K',
      '\u0137': 'k',
      '\u0138': 'k',
      '\u0139': 'L',
      '\u013b': 'L',
      '\u013d': 'L',
      '\u013f': 'L',
      '\u0141': 'L',
      '\u013a': 'l',
      '\u013c': 'l',
      '\u013e': 'l',
      '\u0140': 'l',
      '\u0142': 'l',
      '\u0143': 'N',
      '\u0145': 'N',
      '\u0147': 'N',
      '\u014a': 'N',
      '\u0144': 'n',
      '\u0146': 'n',
      '\u0148': 'n',
      '\u014b': 'n',
      '\u014c': 'O',
      '\u014e': 'O',
      '\u0150': 'O',
      '\u014d': 'o',
      '\u014f': 'o',
      '\u0151': 'o',
      '\u0154': 'R',
      '\u0156': 'R',
      '\u0158': 'R',
      '\u0155': 'r',
      '\u0157': 'r',
      '\u0159': 'r',
      '\u015a': 'S',
      '\u015c': 'S',
      '\u015e': 'S',
      '\u0160': 'S',
      '\u015b': 's',
      '\u015d': 's',
      '\u015f': 's',
      '\u0161': 's',
      '\u0162': 'T',
      '\u0164': 'T',
      '\u0166': 'T',
      '\u0163': 't',
      '\u0165': 't',
      '\u0167': 't',
      '\u0168': 'U',
      '\u016a': 'U',
      '\u016c': 'U',
      '\u016e': 'U',
      '\u0170': 'U',
      '\u0172': 'U',
      '\u0169': 'u',
      '\u016b': 'u',
      '\u016d': 'u',
      '\u016f': 'u',
      '\u0171': 'u',
      '\u0173': 'u',
      '\u0174': 'W',
      '\u0175': 'w',
      '\u0176': 'Y',
      '\u0177': 'y',
      '\u0178': 'Y',
      '\u0179': 'Z',
      '\u017b': 'Z',
      '\u017d': 'Z',
      '\u017a': 'z',
      '\u017c': 'z',
      '\u017e': 'z',
      '\u0132': 'IJ',
      '\u0133': 'ij',
      '\u0152': 'Oe',
      '\u0153': 'oe',
      '\u0149': "'n",
      '\u017f': 's'
    };
    /** Used to map characters to HTML entities. */

    var htmlEscapes = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    /** Used to map HTML entities to characters. */

    var htmlUnescapes = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'"
    };
    /** Used to escape characters for inclusion in compiled string literals. */

    var stringEscapes = {
      '\\': '\\',
      "'": "'",
      '\n': 'n',
      '\r': 'r',
      '\u2028': 'u2028',
      '\u2029': 'u2029'
    };
    /** Built-in method references without a dependency on `root`. */

    var freeParseFloat = parseFloat,
        freeParseInt = parseInt;
    /** Detect free variable `global` from Node.js. */

    var freeGlobal = typeof $parcel$global == 'object' && $parcel$global && $parcel$global.Object === Object && $parcel$global;
    /** Detect free variable `self`. */

    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
    /** Used as a reference to the global object. */

    var root = freeGlobal || freeSelf || Function('return this')();
    /** Detect free variable `exports`. */

    var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
    /** Detect free variable `module`. */

    var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
    /** Detect the popular CommonJS extension `module.exports`. */

    var moduleExports = freeModule && freeModule.exports === freeExports;
    /** Detect free variable `process` from Node.js. */

    var freeProcess = moduleExports && freeGlobal.process;
    /** Used to access faster Node.js helpers. */

    var nodeUtil = function () {
      try {
        // Use `util.types` for Node.js 10+.
        var types = freeModule && freeModule.require && freeModule.require('util').types;

        if (types) {
          return types;
        } // Legacy `process.binding('util')` for Node.js < 10.


        return freeProcess && freeProcess.binding && freeProcess.binding('util');
      } catch (e) {}
    }();
    /* Node.js helper references. */


    var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer,
        nodeIsDate = nodeUtil && nodeUtil.isDate,
        nodeIsMap = nodeUtil && nodeUtil.isMap,
        nodeIsRegExp = nodeUtil && nodeUtil.isRegExp,
        nodeIsSet = nodeUtil && nodeUtil.isSet,
        nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    /*--------------------------------------------------------------------------*/

    /**
     * A faster alternative to `Function#apply`, this function invokes `func`
     * with the `this` binding of `thisArg` and the arguments of `args`.
     *
     * @private
     * @param {Function} func The function to invoke.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {Array} args The arguments to invoke `func` with.
     * @returns {*} Returns the result of `func`.
     */

    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0:
          return func.call(thisArg);

        case 1:
          return func.call(thisArg, args[0]);

        case 2:
          return func.call(thisArg, args[0], args[1]);

        case 3:
          return func.call(thisArg, args[0], args[1], args[2]);
      }

      return func.apply(thisArg, args);
    }
    /**
     * A specialized version of `baseAggregator` for arrays.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} setter The function to set `accumulator` values.
     * @param {Function} iteratee The iteratee to transform keys.
     * @param {Object} accumulator The initial aggregated object.
     * @returns {Function} Returns `accumulator`.
     */


    function arrayAggregator(array, setter, iteratee, accumulator) {
      var index = -1,
          length = array == null ? 0 : array.length;

      while (++index < length) {
        var value = array[index];
        setter(accumulator, value, iteratee(value), array);
      }

      return accumulator;
    }
    /**
     * A specialized version of `_.forEach` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns `array`.
     */


    function arrayEach(array, iteratee) {
      var index = -1,
          length = array == null ? 0 : array.length;

      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }

      return array;
    }
    /**
     * A specialized version of `_.forEachRight` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns `array`.
     */


    function arrayEachRight(array, iteratee) {
      var length = array == null ? 0 : array.length;

      while (length--) {
        if (iteratee(array[length], length, array) === false) {
          break;
        }
      }

      return array;
    }
    /**
     * A specialized version of `_.every` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`.
     */


    function arrayEvery(array, predicate) {
      var index = -1,
          length = array == null ? 0 : array.length;

      while (++index < length) {
        if (!predicate(array[index], index, array)) {
          return false;
        }
      }

      return true;
    }
    /**
     * A specialized version of `_.filter` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     */


    function arrayFilter(array, predicate) {
      var index = -1,
          length = array == null ? 0 : array.length,
          resIndex = 0,
          result = [];

      while (++index < length) {
        var value = array[index];

        if (predicate(value, index, array)) {
          result[resIndex++] = value;
        }
      }

      return result;
    }
    /**
     * A specialized version of `_.includes` for arrays without support for
     * specifying an index to search from.
     *
     * @private
     * @param {Array} [array] The array to inspect.
     * @param {*} target The value to search for.
     * @returns {boolean} Returns `true` if `target` is found, else `false`.
     */


    function arrayIncludes(array, value) {
      var length = array == null ? 0 : array.length;
      return !!length && baseIndexOf(array, value, 0) > -1;
    }
    /**
     * This function is like `arrayIncludes` except that it accepts a comparator.
     *
     * @private
     * @param {Array} [array] The array to inspect.
     * @param {*} target The value to search for.
     * @param {Function} comparator The comparator invoked per element.
     * @returns {boolean} Returns `true` if `target` is found, else `false`.
     */


    function arrayIncludesWith(array, value, comparator) {
      var index = -1,
          length = array == null ? 0 : array.length;

      while (++index < length) {
        if (comparator(value, array[index])) {
          return true;
        }
      }

      return false;
    }
    /**
     * A specialized version of `_.map` for arrays without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */


    function arrayMap(array, iteratee) {
      var index = -1,
          length = array == null ? 0 : array.length,
          result = Array(length);

      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }

      return result;
    }
    /**
     * Appends the elements of `values` to `array`.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to append.
     * @returns {Array} Returns `array`.
     */


    function arrayPush(array, values) {
      var index = -1,
          length = values.length,
          offset = array.length;

      while (++index < length) {
        array[offset + index] = values[index];
      }

      return array;
    }
    /**
     * A specialized version of `_.reduce` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {boolean} [initAccum] Specify using the first element of `array` as
     *  the initial value.
     * @returns {*} Returns the accumulated value.
     */


    function arrayReduce(array, iteratee, accumulator, initAccum) {
      var index = -1,
          length = array == null ? 0 : array.length;

      if (initAccum && length) {
        accumulator = array[++index];
      }

      while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
      }

      return accumulator;
    }
    /**
     * A specialized version of `_.reduceRight` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {boolean} [initAccum] Specify using the last element of `array` as
     *  the initial value.
     * @returns {*} Returns the accumulated value.
     */


    function arrayReduceRight(array, iteratee, accumulator, initAccum) {
      var length = array == null ? 0 : array.length;

      if (initAccum && length) {
        accumulator = array[--length];
      }

      while (length--) {
        accumulator = iteratee(accumulator, array[length], length, array);
      }

      return accumulator;
    }
    /**
     * A specialized version of `_.some` for arrays without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     */


    function arraySome(array, predicate) {
      var index = -1,
          length = array == null ? 0 : array.length;

      while (++index < length) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }

      return false;
    }
    /**
     * Gets the size of an ASCII `string`.
     *
     * @private
     * @param {string} string The string inspect.
     * @returns {number} Returns the string size.
     */


    var asciiSize = baseProperty('length');
    /**
     * Converts an ASCII `string` to an array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the converted array.
     */

    function asciiToArray(string) {
      return string.split('');
    }
    /**
     * Splits an ASCII `string` into an array of its words.
     *
     * @private
     * @param {string} The string to inspect.
     * @returns {Array} Returns the words of `string`.
     */


    function asciiWords(string) {
      return string.match(reAsciiWord) || [];
    }
    /**
     * The base implementation of methods like `_.findKey` and `_.findLastKey`,
     * without support for iteratee shorthands, which iterates over `collection`
     * using `eachFunc`.
     *
     * @private
     * @param {Array|Object} collection The collection to inspect.
     * @param {Function} predicate The function invoked per iteration.
     * @param {Function} eachFunc The function to iterate over `collection`.
     * @returns {*} Returns the found element or its key, else `undefined`.
     */


    function baseFindKey(collection, predicate, eachFunc) {
      var result;
      eachFunc(collection, function (value, key, collection) {
        if (predicate(value, key, collection)) {
          result = key;
          return false;
        }
      });
      return result;
    }
    /**
     * The base implementation of `_.findIndex` and `_.findLastIndex` without
     * support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} predicate The function invoked per iteration.
     * @param {number} fromIndex The index to search from.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */


    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length,
          index = fromIndex + (fromRight ? 1 : -1);

      while (fromRight ? index-- : ++index < length) {
        if (predicate(array[index], index, array)) {
          return index;
        }
      }

      return -1;
    }
    /**
     * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} fromIndex The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */


    function baseIndexOf(array, value, fromIndex) {
      return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
    }
    /**
     * This function is like `baseIndexOf` except that it accepts a comparator.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} fromIndex The index to search from.
     * @param {Function} comparator The comparator invoked per element.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */


    function baseIndexOfWith(array, value, fromIndex, comparator) {
      var index = fromIndex - 1,
          length = array.length;

      while (++index < length) {
        if (comparator(array[index], value)) {
          return index;
        }
      }

      return -1;
    }
    /**
     * The base implementation of `_.isNaN` without support for number objects.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
     */


    function baseIsNaN(value) {
      return value !== value;
    }
    /**
     * The base implementation of `_.mean` and `_.meanBy` without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {number} Returns the mean.
     */


    function baseMean(array, iteratee) {
      var length = array == null ? 0 : array.length;
      return length ? baseSum(array, iteratee) / length : NAN;
    }
    /**
     * The base implementation of `_.property` without support for deep paths.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @returns {Function} Returns the new accessor function.
     */


    function baseProperty(key) {
      return function (object) {
        return object == null ? undefined : object[key];
      };
    }
    /**
     * The base implementation of `_.propertyOf` without support for deep paths.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Function} Returns the new accessor function.
     */


    function basePropertyOf(object) {
      return function (key) {
        return object == null ? undefined : object[key];
      };
    }
    /**
     * The base implementation of `_.reduce` and `_.reduceRight`, without support
     * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {*} accumulator The initial value.
     * @param {boolean} initAccum Specify using the first or last element of
     *  `collection` as the initial value.
     * @param {Function} eachFunc The function to iterate over `collection`.
     * @returns {*} Returns the accumulated value.
     */


    function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
      eachFunc(collection, function (value, index, collection) {
        accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection);
      });
      return accumulator;
    }
    /**
     * The base implementation of `_.sortBy` which uses `comparer` to define the
     * sort order of `array` and replaces criteria objects with their corresponding
     * values.
     *
     * @private
     * @param {Array} array The array to sort.
     * @param {Function} comparer The function to define sort order.
     * @returns {Array} Returns `array`.
     */


    function baseSortBy(array, comparer) {
      var length = array.length;
      array.sort(comparer);

      while (length--) {
        array[length] = array[length].value;
      }

      return array;
    }
    /**
     * The base implementation of `_.sum` and `_.sumBy` without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {number} Returns the sum.
     */


    function baseSum(array, iteratee) {
      var result,
          index = -1,
          length = array.length;

      while (++index < length) {
        var current = iteratee(array[index]);

        if (current !== undefined) {
          result = result === undefined ? current : result + current;
        }
      }

      return result;
    }
    /**
     * The base implementation of `_.times` without support for iteratee shorthands
     * or max array length checks.
     *
     * @private
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     */


    function baseTimes(n, iteratee) {
      var index = -1,
          result = Array(n);

      while (++index < n) {
        result[index] = iteratee(index);
      }

      return result;
    }
    /**
     * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
     * of key-value pairs for `object` corresponding to the property names of `props`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} props The property names to get values for.
     * @returns {Object} Returns the key-value pairs.
     */


    function baseToPairs(object, props) {
      return arrayMap(props, function (key) {
        return [key, object[key]];
      });
    }
    /**
     * The base implementation of `_.unary` without support for storing metadata.
     *
     * @private
     * @param {Function} func The function to cap arguments for.
     * @returns {Function} Returns the new capped function.
     */


    function baseUnary(func) {
      return function (value) {
        return func(value);
      };
    }
    /**
     * The base implementation of `_.values` and `_.valuesIn` which creates an
     * array of `object` property values corresponding to the property names
     * of `props`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} props The property names to get values for.
     * @returns {Object} Returns the array of property values.
     */


    function baseValues(object, props) {
      return arrayMap(props, function (key) {
        return object[key];
      });
    }
    /**
     * Checks if a `cache` value for `key` exists.
     *
     * @private
     * @param {Object} cache The cache to query.
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */


    function cacheHas(cache, key) {
      return cache.has(key);
    }
    /**
     * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
     * that is not found in the character symbols.
     *
     * @private
     * @param {Array} strSymbols The string symbols to inspect.
     * @param {Array} chrSymbols The character symbols to find.
     * @returns {number} Returns the index of the first unmatched string symbol.
     */


    function charsStartIndex(strSymbols, chrSymbols) {
      var index = -1,
          length = strSymbols.length;

      while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}

      return index;
    }
    /**
     * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
     * that is not found in the character symbols.
     *
     * @private
     * @param {Array} strSymbols The string symbols to inspect.
     * @param {Array} chrSymbols The character symbols to find.
     * @returns {number} Returns the index of the last unmatched string symbol.
     */


    function charsEndIndex(strSymbols, chrSymbols) {
      var index = strSymbols.length;

      while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}

      return index;
    }
    /**
     * Gets the number of `placeholder` occurrences in `array`.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} placeholder The placeholder to search for.
     * @returns {number} Returns the placeholder count.
     */


    function countHolders(array, placeholder) {
      var length = array.length,
          result = 0;

      while (length--) {
        if (array[length] === placeholder) {
          ++result;
        }
      }

      return result;
    }
    /**
     * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
     * letters to basic Latin letters.
     *
     * @private
     * @param {string} letter The matched letter to deburr.
     * @returns {string} Returns the deburred letter.
     */


    var deburrLetter = basePropertyOf(deburredLetters);
    /**
     * Used by `_.escape` to convert characters to HTML entities.
     *
     * @private
     * @param {string} chr The matched character to escape.
     * @returns {string} Returns the escaped character.
     */

    var escapeHtmlChar = basePropertyOf(htmlEscapes);
    /**
     * Used by `_.template` to escape characters for inclusion in compiled string literals.
     *
     * @private
     * @param {string} chr The matched character to escape.
     * @returns {string} Returns the escaped character.
     */

    function escapeStringChar(chr) {
      return '\\' + stringEscapes[chr];
    }
    /**
     * Gets the value at `key` of `object`.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */


    function getValue(object, key) {
      return object == null ? undefined : object[key];
    }
    /**
     * Checks if `string` contains Unicode symbols.
     *
     * @private
     * @param {string} string The string to inspect.
     * @returns {boolean} Returns `true` if a symbol is found, else `false`.
     */


    function hasUnicode(string) {
      return reHasUnicode.test(string);
    }
    /**
     * Checks if `string` contains a word composed of Unicode symbols.
     *
     * @private
     * @param {string} string The string to inspect.
     * @returns {boolean} Returns `true` if a word is found, else `false`.
     */


    function hasUnicodeWord(string) {
      return reHasUnicodeWord.test(string);
    }
    /**
     * Converts `iterator` to an array.
     *
     * @private
     * @param {Object} iterator The iterator to convert.
     * @returns {Array} Returns the converted array.
     */


    function iteratorToArray(iterator) {
      var data,
          result = [];

      while (!(data = iterator.next()).done) {
        result.push(data.value);
      }

      return result;
    }
    /**
     * Converts `map` to its key-value pairs.
     *
     * @private
     * @param {Object} map The map to convert.
     * @returns {Array} Returns the key-value pairs.
     */


    function mapToArray(map) {
      var index = -1,
          result = Array(map.size);
      map.forEach(function (value, key) {
        result[++index] = [key, value];
      });
      return result;
    }
    /**
     * Creates a unary function that invokes `func` with its argument transformed.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {Function} transform The argument transform.
     * @returns {Function} Returns the new function.
     */


    function overArg(func, transform) {
      return function (arg) {
        return func(transform(arg));
      };
    }
    /**
     * Replaces all `placeholder` elements in `array` with an internal placeholder
     * and returns an array of their indexes.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {*} placeholder The placeholder to replace.
     * @returns {Array} Returns the new array of placeholder indexes.
     */


    function replaceHolders(array, placeholder) {
      var index = -1,
          length = array.length,
          resIndex = 0,
          result = [];

      while (++index < length) {
        var value = array[index];

        if (value === placeholder || value === PLACEHOLDER) {
          array[index] = PLACEHOLDER;
          result[resIndex++] = index;
        }
      }

      return result;
    }
    /**
     * Converts `set` to an array of its values.
     *
     * @private
     * @param {Object} set The set to convert.
     * @returns {Array} Returns the values.
     */


    function setToArray(set) {
      var index = -1,
          result = Array(set.size);
      set.forEach(function (value) {
        result[++index] = value;
      });
      return result;
    }
    /**
     * Converts `set` to its value-value pairs.
     *
     * @private
     * @param {Object} set The set to convert.
     * @returns {Array} Returns the value-value pairs.
     */


    function setToPairs(set) {
      var index = -1,
          result = Array(set.size);
      set.forEach(function (value) {
        result[++index] = [value, value];
      });
      return result;
    }
    /**
     * A specialized version of `_.indexOf` which performs strict equality
     * comparisons of values, i.e. `===`.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} fromIndex The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */


    function strictIndexOf(array, value, fromIndex) {
      var index = fromIndex - 1,
          length = array.length;

      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }

      return -1;
    }
    /**
     * A specialized version of `_.lastIndexOf` which performs strict equality
     * comparisons of values, i.e. `===`.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} fromIndex The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */


    function strictLastIndexOf(array, value, fromIndex) {
      var index = fromIndex + 1;

      while (index--) {
        if (array[index] === value) {
          return index;
        }
      }

      return index;
    }
    /**
     * Gets the number of symbols in `string`.
     *
     * @private
     * @param {string} string The string to inspect.
     * @returns {number} Returns the string size.
     */


    function stringSize(string) {
      return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
    }
    /**
     * Converts `string` to an array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the converted array.
     */


    function stringToArray(string) {
      return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
    }
    /**
     * Used by `_.unescape` to convert HTML entities to characters.
     *
     * @private
     * @param {string} chr The matched character to unescape.
     * @returns {string} Returns the unescaped character.
     */


    var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
    /**
     * Gets the size of a Unicode `string`.
     *
     * @private
     * @param {string} string The string inspect.
     * @returns {number} Returns the string size.
     */

    function unicodeSize(string) {
      var result = reUnicode.lastIndex = 0;

      while (reUnicode.test(string)) {
        ++result;
      }

      return result;
    }
    /**
     * Converts a Unicode `string` to an array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the converted array.
     */


    function unicodeToArray(string) {
      return string.match(reUnicode) || [];
    }
    /**
     * Splits a Unicode `string` into an array of its words.
     *
     * @private
     * @param {string} The string to inspect.
     * @returns {Array} Returns the words of `string`.
     */


    function unicodeWords(string) {
      return string.match(reUnicodeWord) || [];
    }
    /*--------------------------------------------------------------------------*/

    /**
     * Create a new pristine `lodash` function using the `context` object.
     *
     * @static
     * @memberOf _
     * @since 1.1.0
     * @category Util
     * @param {Object} [context=root] The context object.
     * @returns {Function} Returns a new `lodash` function.
     * @example
     *
     * _.mixin({ 'foo': _.constant('foo') });
     *
     * var lodash = _.runInContext();
     * lodash.mixin({ 'bar': lodash.constant('bar') });
     *
     * _.isFunction(_.foo);
     * // => true
     * _.isFunction(_.bar);
     * // => false
     *
     * lodash.isFunction(lodash.foo);
     * // => false
     * lodash.isFunction(lodash.bar);
     * // => true
     *
     * // Create a suped-up `defer` in Node.js.
     * var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
     */


    var runInContext = function runInContext(context) {
      context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));
      /** Built-in constructor references. */

      var Array = context.Array,
          Date = context.Date,
          Error = context.Error,
          Function = context.Function,
          Math = context.Math,
          Object = context.Object,
          RegExp = context.RegExp,
          String = context.String,
          TypeError = context.TypeError;
      /** Used for built-in method references. */

      var arrayProto = Array.prototype,
          funcProto = Function.prototype,
          objectProto = Object.prototype;
      /** Used to detect overreaching core-js shims. */

      var coreJsData = context['__core-js_shared__'];
      /** Used to resolve the decompiled source of functions. */

      var funcToString = funcProto.toString;
      /** Used to check objects for own properties. */

      var hasOwnProperty = objectProto.hasOwnProperty;
      /** Used to generate unique IDs. */

      var idCounter = 0;
      /** Used to detect methods masquerading as native. */

      var maskSrcKey = function () {
        var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
        return uid ? 'Symbol(src)_1.' + uid : '';
      }();
      /**
       * Used to resolve the
       * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
       * of values.
       */


      var nativeObjectToString = objectProto.toString;
      /** Used to infer the `Object` constructor. */

      var objectCtorString = funcToString.call(Object);
      /** Used to restore the original `_` reference in `_.noConflict`. */

      var oldDash = root._;
      /** Used to detect if a method is native. */

      var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
      /** Built-in value references. */

      var Buffer = moduleExports ? context.Buffer : undefined,
          Symbol = context.Symbol,
          Uint8Array = context.Uint8Array,
          allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined,
          getPrototype = overArg(Object.getPrototypeOf, Object),
          objectCreate = Object.create,
          propertyIsEnumerable = objectProto.propertyIsEnumerable,
          splice = arrayProto.splice,
          spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined,
          symIterator = Symbol ? Symbol.iterator : undefined,
          symToStringTag = Symbol ? Symbol.toStringTag : undefined;

      var defineProperty = function () {
        try {
          var func = getNative(Object, 'defineProperty');
          func({}, '', {});
          return func;
        } catch (e) {}
      }();
      /** Mocked built-ins. */


      var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout,
          ctxNow = Date && Date.now !== root.Date.now && Date.now,
          ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
      /* Built-in method references for those with the same name as other `lodash` methods. */

      var nativeCeil = Math.ceil,
          nativeFloor = Math.floor,
          nativeGetSymbols = Object.getOwnPropertySymbols,
          nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
          nativeIsFinite = context.isFinite,
          nativeJoin = arrayProto.join,
          nativeKeys = overArg(Object.keys, Object),
          nativeMax = Math.max,
          nativeMin = Math.min,
          nativeNow = Date.now,
          nativeParseInt = context.parseInt,
          nativeRandom = Math.random,
          nativeReverse = arrayProto.reverse;
      /* Built-in method references that are verified to be native. */

      var DataView = getNative(context, 'DataView'),
          Map = getNative(context, 'Map'),
          Promise = getNative(context, 'Promise'),
          Set = getNative(context, 'Set'),
          WeakMap = getNative(context, 'WeakMap'),
          nativeCreate = getNative(Object, 'create');
      /** Used to store function metadata. */

      var metaMap = WeakMap && new WeakMap();
      /** Used to lookup unminified function names. */

      var realNames = {};
      /** Used to detect maps, sets, and weakmaps. */

      var dataViewCtorString = toSource(DataView),
          mapCtorString = toSource(Map),
          promiseCtorString = toSource(Promise),
          setCtorString = toSource(Set),
          weakMapCtorString = toSource(WeakMap);
      /** Used to convert symbols to primitives and strings. */

      var symbolProto = Symbol ? Symbol.prototype : undefined,
          symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
          symbolToString = symbolProto ? symbolProto.toString : undefined;
      /*------------------------------------------------------------------------*/

      /**
       * Creates a `lodash` object which wraps `value` to enable implicit method
       * chain sequences. Methods that operate on and return arrays, collections,
       * and functions can be chained together. Methods that retrieve a single value
       * or may return a primitive value will automatically end the chain sequence
       * and return the unwrapped value. Otherwise, the value must be unwrapped
       * with `_#value`.
       *
       * Explicit chain sequences, which must be unwrapped with `_#value`, may be
       * enabled using `_.chain`.
       *
       * The execution of chained methods is lazy, that is, it's deferred until
       * `_#value` is implicitly or explicitly called.
       *
       * Lazy evaluation allows several methods to support shortcut fusion.
       * Shortcut fusion is an optimization to merge iteratee calls; this avoids
       * the creation of intermediate arrays and can greatly reduce the number of
       * iteratee executions. Sections of a chain sequence qualify for shortcut
       * fusion if the section is applied to an array and iteratees accept only
       * one argument. The heuristic for whether a section qualifies for shortcut
       * fusion is subject to change.
       *
       * Chaining is supported in custom builds as long as the `_#value` method is
       * directly or indirectly included in the build.
       *
       * In addition to lodash methods, wrappers have `Array` and `String` methods.
       *
       * The wrapper `Array` methods are:
       * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
       *
       * The wrapper `String` methods are:
       * `replace` and `split`
       *
       * The wrapper methods that support shortcut fusion are:
       * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
       * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
       * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
       *
       * The chainable wrapper methods are:
       * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
       * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
       * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
       * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
       * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
       * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
       * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
       * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
       * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
       * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
       * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
       * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
       * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
       * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
       * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
       * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
       * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
       * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
       * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
       * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
       * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
       * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
       * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
       * `zipObject`, `zipObjectDeep`, and `zipWith`
       *
       * The wrapper methods that are **not** chainable by default are:
       * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
       * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
       * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
       * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
       * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
       * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
       * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
       * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
       * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
       * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
       * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
       * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
       * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
       * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
       * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
       * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
       * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
       * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
       * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
       * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
       * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
       * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
       * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
       * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
       * `upperFirst`, `value`, and `words`
       *
       * @name _
       * @constructor
       * @category Seq
       * @param {*} value The value to wrap in a `lodash` instance.
       * @returns {Object} Returns the new `lodash` wrapper instance.
       * @example
       *
       * function square(n) {
       *   return n * n;
       * }
       *
       * var wrapped = _([1, 2, 3]);
       *
       * // Returns an unwrapped value.
       * wrapped.reduce(_.add);
       * // => 6
       *
       * // Returns a wrapped value.
       * var squares = wrapped.map(square);
       *
       * _.isArray(squares);
       * // => false
       *
       * _.isArray(squares.value());
       * // => true
       */

      function lodash(value) {
        if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
          if (value instanceof LodashWrapper) {
            return value;
          }

          if (hasOwnProperty.call(value, '__wrapped__')) {
            return wrapperClone(value);
          }
        }

        return new LodashWrapper(value);
      }
      /**
       * The base implementation of `_.create` without support for assigning
       * properties to the created object.
       *
       * @private
       * @param {Object} proto The object to inherit from.
       * @returns {Object} Returns the new object.
       */


      var baseCreate = function () {
        function object() {}

        return function (proto) {
          if (!isObject(proto)) {
            return {};
          }

          if (objectCreate) {
            return objectCreate(proto);
          }

          object.prototype = proto;
          var result = new object();
          object.prototype = undefined;
          return result;
        };
      }();
      /**
       * The function whose prototype chain sequence wrappers inherit from.
       *
       * @private
       */


      function baseLodash() {} // No operation performed.

      /**
       * The base constructor for creating `lodash` wrapper objects.
       *
       * @private
       * @param {*} value The value to wrap.
       * @param {boolean} [chainAll] Enable explicit method chain sequences.
       */


      function LodashWrapper(value, chainAll) {
        this.__wrapped__ = value;
        this.__actions__ = [];
        this.__chain__ = !!chainAll;
        this.__index__ = 0;
        this.__values__ = undefined;
      }
      /**
       * By default, the template delimiters used by lodash are like those in
       * embedded Ruby (ERB) as well as ES2015 template strings. Change the
       * following template settings to use alternative delimiters.
       *
       * @static
       * @memberOf _
       * @type {Object}
       */


      lodash.templateSettings = {
        /**
         * Used to detect `data` property values to be HTML-escaped.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        'escape': reEscape,

        /**
         * Used to detect code to be evaluated.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        'evaluate': reEvaluate,

        /**
         * Used to detect `data` property values to inject.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        'interpolate': reInterpolate,

        /**
         * Used to reference the data object in the template text.
         *
         * @memberOf _.templateSettings
         * @type {string}
         */
        'variable': '',

        /**
         * Used to import variables into the compiled template.
         *
         * @memberOf _.templateSettings
         * @type {Object}
         */
        'imports': {
          /**
           * A reference to the `lodash` function.
           *
           * @memberOf _.templateSettings.imports
           * @type {Function}
           */
          '_': lodash
        }
      }; // Ensure wrappers are instances of `baseLodash`.

      lodash.prototype = baseLodash.prototype;
      lodash.prototype.constructor = lodash;
      LodashWrapper.prototype = baseCreate(baseLodash.prototype);
      LodashWrapper.prototype.constructor = LodashWrapper;
      /*------------------------------------------------------------------------*/

      /**
       * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
       *
       * @private
       * @constructor
       * @param {*} value The value to wrap.
       */

      function LazyWrapper(value) {
        this.__wrapped__ = value;
        this.__actions__ = [];
        this.__dir__ = 1;
        this.__filtered__ = false;
        this.__iteratees__ = [];
        this.__takeCount__ = MAX_ARRAY_LENGTH;
        this.__views__ = [];
      }
      /**
       * Creates a clone of the lazy wrapper object.
       *
       * @private
       * @name clone
       * @memberOf LazyWrapper
       * @returns {Object} Returns the cloned `LazyWrapper` object.
       */


      function lazyClone() {
        var result = new LazyWrapper(this.__wrapped__);
        result.__actions__ = copyArray(this.__actions__);
        result.__dir__ = this.__dir__;
        result.__filtered__ = this.__filtered__;
        result.__iteratees__ = copyArray(this.__iteratees__);
        result.__takeCount__ = this.__takeCount__;
        result.__views__ = copyArray(this.__views__);
        return result;
      }
      /**
       * Reverses the direction of lazy iteration.
       *
       * @private
       * @name reverse
       * @memberOf LazyWrapper
       * @returns {Object} Returns the new reversed `LazyWrapper` object.
       */


      function lazyReverse() {
        if (this.__filtered__) {
          var result = new LazyWrapper(this);
          result.__dir__ = -1;
          result.__filtered__ = true;
        } else {
          result = this.clone();
          result.__dir__ *= -1;
        }

        return result;
      }
      /**
       * Extracts the unwrapped value from its lazy wrapper.
       *
       * @private
       * @name value
       * @memberOf LazyWrapper
       * @returns {*} Returns the unwrapped value.
       */


      function lazyValue() {
        var array = this.__wrapped__.value(),
            dir = this.__dir__,
            isArr = isArray(array),
            isRight = dir < 0,
            arrLength = isArr ? array.length : 0,
            view = getView(0, arrLength, this.__views__),
            start = view.start,
            end = view.end,
            length = end - start,
            index = isRight ? end : start - 1,
            iteratees = this.__iteratees__,
            iterLength = iteratees.length,
            resIndex = 0,
            takeCount = nativeMin(length, this.__takeCount__);

        if (!isArr || !isRight && arrLength == length && takeCount == length) {
          return baseWrapperValue(array, this.__actions__);
        }

        var result = [];

        outer: while (length-- && resIndex < takeCount) {
          index += dir;
          var iterIndex = -1,
              value = array[index];

          while (++iterIndex < iterLength) {
            var data = iteratees[iterIndex],
                iteratee = data.iteratee,
                type = data.type,
                computed = iteratee(value);

            if (type == LAZY_MAP_FLAG) {
              value = computed;
            } else if (!computed) {
              if (type == LAZY_FILTER_FLAG) {
                continue outer;
              } else {
                break outer;
              }
            }
          }

          result[resIndex++] = value;
        }

        return result;
      } // Ensure `LazyWrapper` is an instance of `baseLodash`.


      LazyWrapper.prototype = baseCreate(baseLodash.prototype);
      LazyWrapper.prototype.constructor = LazyWrapper;
      /*------------------------------------------------------------------------*/

      /**
       * Creates a hash object.
       *
       * @private
       * @constructor
       * @param {Array} [entries] The key-value pairs to cache.
       */

      function Hash(entries) {
        var index = -1,
            length = entries == null ? 0 : entries.length;
        this.clear();

        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      /**
       * Removes all key-value entries from the hash.
       *
       * @private
       * @name clear
       * @memberOf Hash
       */


      function hashClear() {
        this.__data__ = nativeCreate ? nativeCreate(null) : {};
        this.size = 0;
      }
      /**
       * Removes `key` and its value from the hash.
       *
       * @private
       * @name delete
       * @memberOf Hash
       * @param {Object} hash The hash to modify.
       * @param {string} key The key of the value to remove.
       * @returns {boolean} Returns `true` if the entry was removed, else `false`.
       */


      function hashDelete(key) {
        var result = this.has(key) && delete this.__data__[key];
        this.size -= result ? 1 : 0;
        return result;
      }
      /**
       * Gets the hash value for `key`.
       *
       * @private
       * @name get
       * @memberOf Hash
       * @param {string} key The key of the value to get.
       * @returns {*} Returns the entry value.
       */


      function hashGet(key) {
        var data = this.__data__;

        if (nativeCreate) {
          var result = data[key];
          return result === HASH_UNDEFINED ? undefined : result;
        }

        return hasOwnProperty.call(data, key) ? data[key] : undefined;
      }
      /**
       * Checks if a hash value for `key` exists.
       *
       * @private
       * @name has
       * @memberOf Hash
       * @param {string} key The key of the entry to check.
       * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
       */


      function hashHas(key) {
        var data = this.__data__;
        return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
      }
      /**
       * Sets the hash `key` to `value`.
       *
       * @private
       * @name set
       * @memberOf Hash
       * @param {string} key The key of the value to set.
       * @param {*} value The value to set.
       * @returns {Object} Returns the hash instance.
       */


      function hashSet(key, value) {
        var data = this.__data__;
        this.size += this.has(key) ? 0 : 1;
        data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
        return this;
      } // Add methods to `Hash`.


      Hash.prototype.clear = hashClear;
      Hash.prototype['delete'] = hashDelete;
      Hash.prototype.get = hashGet;
      Hash.prototype.has = hashHas;
      Hash.prototype.set = hashSet;
      /*------------------------------------------------------------------------*/

      /**
       * Creates an list cache object.
       *
       * @private
       * @constructor
       * @param {Array} [entries] The key-value pairs to cache.
       */

      function ListCache(entries) {
        var index = -1,
            length = entries == null ? 0 : entries.length;
        this.clear();

        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      /**
       * Removes all key-value entries from the list cache.
       *
       * @private
       * @name clear
       * @memberOf ListCache
       */


      function listCacheClear() {
        this.__data__ = [];
        this.size = 0;
      }
      /**
       * Removes `key` and its value from the list cache.
       *
       * @private
       * @name delete
       * @memberOf ListCache
       * @param {string} key The key of the value to remove.
       * @returns {boolean} Returns `true` if the entry was removed, else `false`.
       */


      function listCacheDelete(key) {
        var data = this.__data__,
            index = assocIndexOf(data, key);

        if (index < 0) {
          return false;
        }

        var lastIndex = data.length - 1;

        if (index == lastIndex) {
          data.pop();
        } else {
          splice.call(data, index, 1);
        }

        --this.size;
        return true;
      }
      /**
       * Gets the list cache value for `key`.
       *
       * @private
       * @name get
       * @memberOf ListCache
       * @param {string} key The key of the value to get.
       * @returns {*} Returns the entry value.
       */


      function listCacheGet(key) {
        var data = this.__data__,
            index = assocIndexOf(data, key);
        return index < 0 ? undefined : data[index][1];
      }
      /**
       * Checks if a list cache value for `key` exists.
       *
       * @private
       * @name has
       * @memberOf ListCache
       * @param {string} key The key of the entry to check.
       * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
       */


      function listCacheHas(key) {
        return assocIndexOf(this.__data__, key) > -1;
      }
      /**
       * Sets the list cache `key` to `value`.
       *
       * @private
       * @name set
       * @memberOf ListCache
       * @param {string} key The key of the value to set.
       * @param {*} value The value to set.
       * @returns {Object} Returns the list cache instance.
       */


      function listCacheSet(key, value) {
        var data = this.__data__,
            index = assocIndexOf(data, key);

        if (index < 0) {
          ++this.size;
          data.push([key, value]);
        } else {
          data[index][1] = value;
        }

        return this;
      } // Add methods to `ListCache`.


      ListCache.prototype.clear = listCacheClear;
      ListCache.prototype['delete'] = listCacheDelete;
      ListCache.prototype.get = listCacheGet;
      ListCache.prototype.has = listCacheHas;
      ListCache.prototype.set = listCacheSet;
      /*------------------------------------------------------------------------*/

      /**
       * Creates a map cache object to store key-value pairs.
       *
       * @private
       * @constructor
       * @param {Array} [entries] The key-value pairs to cache.
       */

      function MapCache(entries) {
        var index = -1,
            length = entries == null ? 0 : entries.length;
        this.clear();

        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      /**
       * Removes all key-value entries from the map.
       *
       * @private
       * @name clear
       * @memberOf MapCache
       */


      function mapCacheClear() {
        this.size = 0;
        this.__data__ = {
          'hash': new Hash(),
          'map': new (Map || ListCache)(),
          'string': new Hash()
        };
      }
      /**
       * Removes `key` and its value from the map.
       *
       * @private
       * @name delete
       * @memberOf MapCache
       * @param {string} key The key of the value to remove.
       * @returns {boolean} Returns `true` if the entry was removed, else `false`.
       */


      function mapCacheDelete(key) {
        var result = getMapData(this, key)['delete'](key);
        this.size -= result ? 1 : 0;
        return result;
      }
      /**
       * Gets the map value for `key`.
       *
       * @private
       * @name get
       * @memberOf MapCache
       * @param {string} key The key of the value to get.
       * @returns {*} Returns the entry value.
       */


      function mapCacheGet(key) {
        return getMapData(this, key).get(key);
      }
      /**
       * Checks if a map value for `key` exists.
       *
       * @private
       * @name has
       * @memberOf MapCache
       * @param {string} key The key of the entry to check.
       * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
       */


      function mapCacheHas(key) {
        return getMapData(this, key).has(key);
      }
      /**
       * Sets the map `key` to `value`.
       *
       * @private
       * @name set
       * @memberOf MapCache
       * @param {string} key The key of the value to set.
       * @param {*} value The value to set.
       * @returns {Object} Returns the map cache instance.
       */


      function mapCacheSet(key, value) {
        var data = getMapData(this, key),
            size = data.size;
        data.set(key, value);
        this.size += data.size == size ? 0 : 1;
        return this;
      } // Add methods to `MapCache`.


      MapCache.prototype.clear = mapCacheClear;
      MapCache.prototype['delete'] = mapCacheDelete;
      MapCache.prototype.get = mapCacheGet;
      MapCache.prototype.has = mapCacheHas;
      MapCache.prototype.set = mapCacheSet;
      /*------------------------------------------------------------------------*/

      /**
       *
       * Creates an array cache object to store unique values.
       *
       * @private
       * @constructor
       * @param {Array} [values] The values to cache.
       */

      function SetCache(values) {
        var index = -1,
            length = values == null ? 0 : values.length;
        this.__data__ = new MapCache();

        while (++index < length) {
          this.add(values[index]);
        }
      }
      /**
       * Adds `value` to the array cache.
       *
       * @private
       * @name add
       * @memberOf SetCache
       * @alias push
       * @param {*} value The value to cache.
       * @returns {Object} Returns the cache instance.
       */


      function setCacheAdd(value) {
        this.__data__.set(value, HASH_UNDEFINED);

        return this;
      }
      /**
       * Checks if `value` is in the array cache.
       *
       * @private
       * @name has
       * @memberOf SetCache
       * @param {*} value The value to search for.
       * @returns {number} Returns `true` if `value` is found, else `false`.
       */


      function setCacheHas(value) {
        return this.__data__.has(value);
      } // Add methods to `SetCache`.


      SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
      SetCache.prototype.has = setCacheHas;
      /*------------------------------------------------------------------------*/

      /**
       * Creates a stack cache object to store key-value pairs.
       *
       * @private
       * @constructor
       * @param {Array} [entries] The key-value pairs to cache.
       */

      function Stack(entries) {
        var data = this.__data__ = new ListCache(entries);
        this.size = data.size;
      }
      /**
       * Removes all key-value entries from the stack.
       *
       * @private
       * @name clear
       * @memberOf Stack
       */


      function stackClear() {
        this.__data__ = new ListCache();
        this.size = 0;
      }
      /**
       * Removes `key` and its value from the stack.
       *
       * @private
       * @name delete
       * @memberOf Stack
       * @param {string} key The key of the value to remove.
       * @returns {boolean} Returns `true` if the entry was removed, else `false`.
       */


      function stackDelete(key) {
        var data = this.__data__,
            result = data['delete'](key);
        this.size = data.size;
        return result;
      }
      /**
       * Gets the stack value for `key`.
       *
       * @private
       * @name get
       * @memberOf Stack
       * @param {string} key The key of the value to get.
       * @returns {*} Returns the entry value.
       */


      function stackGet(key) {
        return this.__data__.get(key);
      }
      /**
       * Checks if a stack value for `key` exists.
       *
       * @private
       * @name has
       * @memberOf Stack
       * @param {string} key The key of the entry to check.
       * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
       */


      function stackHas(key) {
        return this.__data__.has(key);
      }
      /**
       * Sets the stack `key` to `value`.
       *
       * @private
       * @name set
       * @memberOf Stack
       * @param {string} key The key of the value to set.
       * @param {*} value The value to set.
       * @returns {Object} Returns the stack cache instance.
       */


      function stackSet(key, value) {
        var data = this.__data__;

        if (data instanceof ListCache) {
          var pairs = data.__data__;

          if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
            pairs.push([key, value]);
            this.size = ++data.size;
            return this;
          }

          data = this.__data__ = new MapCache(pairs);
        }

        data.set(key, value);
        this.size = data.size;
        return this;
      } // Add methods to `Stack`.


      Stack.prototype.clear = stackClear;
      Stack.prototype['delete'] = stackDelete;
      Stack.prototype.get = stackGet;
      Stack.prototype.has = stackHas;
      Stack.prototype.set = stackSet;
      /*------------------------------------------------------------------------*/

      /**
       * Creates an array of the enumerable property names of the array-like `value`.
       *
       * @private
       * @param {*} value The value to query.
       * @param {boolean} inherited Specify returning inherited property names.
       * @returns {Array} Returns the array of property names.
       */

      function arrayLikeKeys(value, inherited) {
        var isArr = isArray(value),
            isArg = !isArr && isArguments(value),
            isBuff = !isArr && !isArg && isBuffer(value),
            isType = !isArr && !isArg && !isBuff && isTypedArray(value),
            skipIndexes = isArr || isArg || isBuff || isType,
            result = skipIndexes ? baseTimes(value.length, String) : [],
            length = result.length;

        for (var key in value) {
          if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && ( // Safari 9 has enumerable `arguments.length` in strict mode.
          key == 'length' || // Node.js 0.10 has enumerable non-index properties on buffers.
          isBuff && (key == 'offset' || key == 'parent') || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') || // Skip index properties.
          isIndex(key, length)))) {
            result.push(key);
          }
        }

        return result;
      }
      /**
       * A specialized version of `_.sample` for arrays.
       *
       * @private
       * @param {Array} array The array to sample.
       * @returns {*} Returns the random element.
       */


      function arraySample(array) {
        var length = array.length;
        return length ? array[baseRandom(0, length - 1)] : undefined;
      }
      /**
       * A specialized version of `_.sampleSize` for arrays.
       *
       * @private
       * @param {Array} array The array to sample.
       * @param {number} n The number of elements to sample.
       * @returns {Array} Returns the random elements.
       */


      function arraySampleSize(array, n) {
        return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
      }
      /**
       * A specialized version of `_.shuffle` for arrays.
       *
       * @private
       * @param {Array} array The array to shuffle.
       * @returns {Array} Returns the new shuffled array.
       */


      function arrayShuffle(array) {
        return shuffleSelf(copyArray(array));
      }
      /**
       * This function is like `assignValue` except that it doesn't assign
       * `undefined` values.
       *
       * @private
       * @param {Object} object The object to modify.
       * @param {string} key The key of the property to assign.
       * @param {*} value The value to assign.
       */


      function assignMergeValue(object, key, value) {
        if (value !== undefined && !eq(object[key], value) || value === undefined && !(key in object)) {
          baseAssignValue(object, key, value);
        }
      }
      /**
       * Assigns `value` to `key` of `object` if the existing value is not equivalent
       * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
       * for equality comparisons.
       *
       * @private
       * @param {Object} object The object to modify.
       * @param {string} key The key of the property to assign.
       * @param {*} value The value to assign.
       */


      function assignValue(object, key, value) {
        var objValue = object[key];

        if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
          baseAssignValue(object, key, value);
        }
      }
      /**
       * Gets the index at which the `key` is found in `array` of key-value pairs.
       *
       * @private
       * @param {Array} array The array to inspect.
       * @param {*} key The key to search for.
       * @returns {number} Returns the index of the matched value, else `-1`.
       */


      function assocIndexOf(array, key) {
        var length = array.length;

        while (length--) {
          if (eq(array[length][0], key)) {
            return length;
          }
        }

        return -1;
      }
      /**
       * Aggregates elements of `collection` on `accumulator` with keys transformed
       * by `iteratee` and values set by `setter`.
       *
       * @private
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} setter The function to set `accumulator` values.
       * @param {Function} iteratee The iteratee to transform keys.
       * @param {Object} accumulator The initial aggregated object.
       * @returns {Function} Returns `accumulator`.
       */


      function baseAggregator(collection, setter, iteratee, accumulator) {
        baseEach(collection, function (value, key, collection) {
          setter(accumulator, value, iteratee(value), collection);
        });
        return accumulator;
      }
      /**
       * The base implementation of `_.assign` without support for multiple sources
       * or `customizer` functions.
       *
       * @private
       * @param {Object} object The destination object.
       * @param {Object} source The source object.
       * @returns {Object} Returns `object`.
       */


      function baseAssign(object, source) {
        return object && copyObject(source, keys(source), object);
      }
      /**
       * The base implementation of `_.assignIn` without support for multiple sources
       * or `customizer` functions.
       *
       * @private
       * @param {Object} object The destination object.
       * @param {Object} source The source object.
       * @returns {Object} Returns `object`.
       */


      function baseAssignIn(object, source) {
        return object && copyObject(source, keysIn(source), object);
      }
      /**
       * The base implementation of `assignValue` and `assignMergeValue` without
       * value checks.
       *
       * @private
       * @param {Object} object The object to modify.
       * @param {string} key The key of the property to assign.
       * @param {*} value The value to assign.
       */


      function baseAssignValue(object, key, value) {
        if (key == '__proto__' && defineProperty) {
          defineProperty(object, key, {
            'configurable': true,
            'enumerable': true,
            'value': value,
            'writable': true
          });
        } else {
          object[key] = value;
        }
      }
      /**
       * The base implementation of `_.at` without support for individual paths.
       *
       * @private
       * @param {Object} object The object to iterate over.
       * @param {string[]} paths The property paths to pick.
       * @returns {Array} Returns the picked elements.
       */


      function baseAt(object, paths) {
        var index = -1,
            length = paths.length,
            result = Array(length),
            skip = object == null;

        while (++index < length) {
          result[index] = skip ? undefined : get(object, paths[index]);
        }

        return result;
      }
      /**
       * The base implementation of `_.clamp` which doesn't coerce arguments.
       *
       * @private
       * @param {number} number The number to clamp.
       * @param {number} [lower] The lower bound.
       * @param {number} upper The upper bound.
       * @returns {number} Returns the clamped number.
       */


      function baseClamp(number, lower, upper) {
        if (number === number) {
          if (upper !== undefined) {
            number = number <= upper ? number : upper;
          }

          if (lower !== undefined) {
            number = number >= lower ? number : lower;
          }
        }

        return number;
      }
      /**
       * The base implementation of `_.clone` and `_.cloneDeep` which tracks
       * traversed objects.
       *
       * @private
       * @param {*} value The value to clone.
       * @param {boolean} bitmask The bitmask flags.
       *  1 - Deep clone
       *  2 - Flatten inherited properties
       *  4 - Clone symbols
       * @param {Function} [customizer] The function to customize cloning.
       * @param {string} [key] The key of `value`.
       * @param {Object} [object] The parent object of `value`.
       * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
       * @returns {*} Returns the cloned value.
       */


      function baseClone(value, bitmask, customizer, key, object, stack) {
        var result,
            isDeep = bitmask & CLONE_DEEP_FLAG,
            isFlat = bitmask & CLONE_FLAT_FLAG,
            isFull = bitmask & CLONE_SYMBOLS_FLAG;

        if (customizer) {
          result = object ? customizer(value, key, object, stack) : customizer(value);
        }

        if (result !== undefined) {
          return result;
        }

        if (!isObject(value)) {
          return value;
        }

        var isArr = isArray(value);

        if (isArr) {
          result = initCloneArray(value);

          if (!isDeep) {
            return copyArray(value, result);
          }
        } else {
          var tag = getTag(value),
              isFunc = tag == funcTag || tag == genTag;

          if (isBuffer(value)) {
            return cloneBuffer(value, isDeep);
          }

          if (tag == objectTag || tag == argsTag || isFunc && !object) {
            result = isFlat || isFunc ? {} : initCloneObject(value);

            if (!isDeep) {
              return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
            }
          } else {
            if (!cloneableTags[tag]) {
              return object ? value : {};
            }

            result = initCloneByTag(value, tag, isDeep);
          }
        } // Check for circular references and return its corresponding clone.


        stack || (stack = new Stack());
        var stacked = stack.get(value);

        if (stacked) {
          return stacked;
        }

        stack.set(value, result);

        if (isSet(value)) {
          value.forEach(function (subValue) {
            result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
          });
        } else if (isMap(value)) {
          value.forEach(function (subValue, key) {
            result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
          });
        }

        var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
        var props = isArr ? undefined : keysFunc(value);
        arrayEach(props || value, function (subValue, key) {
          if (props) {
            key = subValue;
            subValue = value[key];
          } // Recursively populate clone (susceptible to call stack limits).


          assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
        });
        return result;
      }
      /**
       * The base implementation of `_.conforms` which doesn't clone `source`.
       *
       * @private
       * @param {Object} source The object of property predicates to conform to.
       * @returns {Function} Returns the new spec function.
       */


      function baseConforms(source) {
        var props = keys(source);
        return function (object) {
          return baseConformsTo(object, source, props);
        };
      }
      /**
       * The base implementation of `_.conformsTo` which accepts `props` to check.
       *
       * @private
       * @param {Object} object The object to inspect.
       * @param {Object} source The object of property predicates to conform to.
       * @returns {boolean} Returns `true` if `object` conforms, else `false`.
       */


      function baseConformsTo(object, source, props) {
        var length = props.length;

        if (object == null) {
          return !length;
        }

        object = Object(object);

        while (length--) {
          var key = props[length],
              predicate = source[key],
              value = object[key];

          if (value === undefined && !(key in object) || !predicate(value)) {
            return false;
          }
        }

        return true;
      }
      /**
       * The base implementation of `_.delay` and `_.defer` which accepts `args`
       * to provide to `func`.
       *
       * @private
       * @param {Function} func The function to delay.
       * @param {number} wait The number of milliseconds to delay invocation.
       * @param {Array} args The arguments to provide to `func`.
       * @returns {number|Object} Returns the timer id or timeout object.
       */


      function baseDelay(func, wait, args) {
        if (typeof func != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }

        return setTimeout(function () {
          func.apply(undefined, args);
        }, wait);
      }
      /**
       * The base implementation of methods like `_.difference` without support
       * for excluding multiple arrays or iteratee shorthands.
       *
       * @private
       * @param {Array} array The array to inspect.
       * @param {Array} values The values to exclude.
       * @param {Function} [iteratee] The iteratee invoked per element.
       * @param {Function} [comparator] The comparator invoked per element.
       * @returns {Array} Returns the new array of filtered values.
       */


      function baseDifference(array, values, iteratee, comparator) {
        var index = -1,
            includes = arrayIncludes,
            isCommon = true,
            length = array.length,
            result = [],
            valuesLength = values.length;

        if (!length) {
          return result;
        }

        if (iteratee) {
          values = arrayMap(values, baseUnary(iteratee));
        }

        if (comparator) {
          includes = arrayIncludesWith;
          isCommon = false;
        } else if (values.length >= LARGE_ARRAY_SIZE) {
          includes = cacheHas;
          isCommon = false;
          values = new SetCache(values);
        }

        outer: while (++index < length) {
          var value = array[index],
              computed = iteratee == null ? value : iteratee(value);
          value = comparator || value !== 0 ? value : 0;

          if (isCommon && computed === computed) {
            var valuesIndex = valuesLength;

            while (valuesIndex--) {
              if (values[valuesIndex] === computed) {
                continue outer;
              }
            }

            result.push(value);
          } else if (!includes(values, computed, comparator)) {
            result.push(value);
          }
        }

        return result;
      }
      /**
       * The base implementation of `_.forEach` without support for iteratee shorthands.
       *
       * @private
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} iteratee The function invoked per iteration.
       * @returns {Array|Object} Returns `collection`.
       */


      var baseEach = createBaseEach(baseForOwn);
      /**
       * The base implementation of `_.forEachRight` without support for iteratee shorthands.
       *
       * @private
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} iteratee The function invoked per iteration.
       * @returns {Array|Object} Returns `collection`.
       */

      var baseEachRight = createBaseEach(baseForOwnRight, true);
      /**
       * The base implementation of `_.every` without support for iteratee shorthands.
       *
       * @private
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} predicate The function invoked per iteration.
       * @returns {boolean} Returns `true` if all elements pass the predicate check,
       *  else `false`
       */

      function baseEvery(collection, predicate) {
        var result = true;
        baseEach(collection, function (value, index, collection) {
          result = !!predicate(value, index, collection);
          return result;
        });
        return result;
      }
      /**
       * The base implementation of methods like `_.max` and `_.min` which accepts a
       * `comparator` to determine the extremum value.
       *
       * @private
       * @param {Array} array The array to iterate over.
       * @param {Function} iteratee The iteratee invoked per iteration.
       * @param {Function} comparator The comparator used to compare values.
       * @returns {*} Returns the extremum value.
       */


      function baseExtremum(array, iteratee, comparator) {
        var index = -1,
            length = array.length;

        while (++index < length) {
          var value = array[index],
              current = iteratee(value);

          if (current != null && (computed === undefined ? current === current && !isSymbol(current) : comparator(current, computed))) {
            var computed = current,
                result = value;
          }
        }

        return result;
      }
      /**
       * The base implementation of `_.fill` without an iteratee call guard.
       *
       * @private
       * @param {Array} array The array to fill.
       * @param {*} value The value to fill `array` with.
       * @param {number} [start=0] The start position.
       * @param {number} [end=array.length] The end position.
       * @returns {Array} Returns `array`.
       */


      function baseFill(array, value, start, end) {
        var length = array.length;
        start = toInteger(start);

        if (start < 0) {
          start = -start > length ? 0 : length + start;
        }

        end = end === undefined || end > length ? length : toInteger(end);

        if (end < 0) {
          end += length;
        }

        end = start > end ? 0 : toLength(end);

        while (start < end) {
          array[start++] = value;
        }

        return array;
      }
      /**
       * The base implementation of `_.filter` without support for iteratee shorthands.
       *
       * @private
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} predicate The function invoked per iteration.
       * @returns {Array} Returns the new filtered array.
       */


      function baseFilter(collection, predicate) {
        var result = [];
        baseEach(collection, function (value, index, collection) {
          if (predicate(value, index, collection)) {
            result.push(value);
          }
        });
        return result;
      }
      /**
       * The base implementation of `_.flatten` with support for restricting flattening.
       *
       * @private
       * @param {Array} array The array to flatten.
       * @param {number} depth The maximum recursion depth.
       * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
       * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
       * @param {Array} [result=[]] The initial result value.
       * @returns {Array} Returns the new flattened array.
       */


      function baseFlatten(array, depth, predicate, isStrict, result) {
        var index = -1,
            length = array.length;
        predicate || (predicate = isFlattenable);
        result || (result = []);

        while (++index < length) {
          var value = array[index];

          if (depth > 0 && predicate(value)) {
            if (depth > 1) {
              // Recursively flatten arrays (susceptible to call stack limits).
              baseFlatten(value, depth - 1, predicate, isStrict, result);
            } else {
              arrayPush(result, value);
            }
          } else if (!isStrict) {
            result[result.length] = value;
          }
        }

        return result;
      }
      /**
       * The base implementation of `baseForOwn` which iterates over `object`
       * properties returned by `keysFunc` and invokes `iteratee` for each property.
       * Iteratee functions may exit iteration early by explicitly returning `false`.
       *
       * @private
       * @param {Object} object The object to iterate over.
       * @param {Function} iteratee The function invoked per iteration.
       * @param {Function} keysFunc The function to get the keys of `object`.
       * @returns {Object} Returns `object`.
       */


      var baseFor = createBaseFor();
      /**
       * This function is like `baseFor` except that it iterates over properties
       * in the opposite order.
       *
       * @private
       * @param {Object} object The object to iterate over.
       * @param {Function} iteratee The function invoked per iteration.
       * @param {Function} keysFunc The function to get the keys of `object`.
       * @returns {Object} Returns `object`.
       */

      var baseForRight = createBaseFor(true);
      /**
       * The base implementation of `_.forOwn` without support for iteratee shorthands.
       *
       * @private
       * @param {Object} object The object to iterate over.
       * @param {Function} iteratee The function invoked per iteration.
       * @returns {Object} Returns `object`.
       */

      function baseForOwn(object, iteratee) {
        return object && baseFor(object, iteratee, keys);
      }
      /**
       * The base implementation of `_.forOwnRight` without support for iteratee shorthands.
       *
       * @private
       * @param {Object} object The object to iterate over.
       * @param {Function} iteratee The function invoked per iteration.
       * @returns {Object} Returns `object`.
       */


      function baseForOwnRight(object, iteratee) {
        return object && baseForRight(object, iteratee, keys);
      }
      /**
       * The base implementation of `_.functions` which creates an array of
       * `object` function property names filtered from `props`.
       *
       * @private
       * @param {Object} object The object to inspect.
       * @param {Array} props The property names to filter.
       * @returns {Array} Returns the function names.
       */


      function baseFunctions(object, props) {
        return arrayFilter(props, function (key) {
          return isFunction(object[key]);
        });
      }
      /**
       * The base implementation of `_.get` without support for default values.
       *
       * @private
       * @param {Object} object The object to query.
       * @param {Array|string} path The path of the property to get.
       * @returns {*} Returns the resolved value.
       */


      function baseGet(object, path) {
        path = castPath(path, object);
        var index = 0,
            length = path.length;

        while (object != null && index < length) {
          object = object[toKey(path[index++])];
        }

        return index && index == length ? object : undefined;
      }
      /**
       * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
       * `keysFunc` and `symbolsFunc` to get the enumerable property names and
       * symbols of `object`.
       *
       * @private
       * @param {Object} object The object to query.
       * @param {Function} keysFunc The function to get the keys of `object`.
       * @param {Function} symbolsFunc The function to get the symbols of `object`.
       * @returns {Array} Returns the array of property names and symbols.
       */


      function baseGetAllKeys(object, keysFunc, symbolsFunc) {
        var result = keysFunc(object);
        return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
      }
      /**
       * The base implementation of `getTag` without fallbacks for buggy environments.
       *
       * @private
       * @param {*} value The value to query.
       * @returns {string} Returns the `toStringTag`.
       */


      function baseGetTag(value) {
        if (value == null) {
          return value === undefined ? undefinedTag : nullTag;
        }

        return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
      }
      /**
       * The base implementation of `_.gt` which doesn't coerce arguments.
       *
       * @private
       * @param {*} value The value to compare.
       * @param {*} other The other value to compare.
       * @returns {boolean} Returns `true` if `value` is greater than `other`,
       *  else `false`.
       */


      function baseGt(value, other) {
        return value > other;
      }
      /**
       * The base implementation of `_.has` without support for deep paths.
       *
       * @private
       * @param {Object} [object] The object to query.
       * @param {Array|string} key The key to check.
       * @returns {boolean} Returns `true` if `key` exists, else `false`.
       */


      function baseHas(object, key) {
        return object != null && hasOwnProperty.call(object, key);
      }
      /**
       * The base implementation of `_.hasIn` without support for deep paths.
       *
       * @private
       * @param {Object} [object] The object to query.
       * @param {Array|string} key The key to check.
       * @returns {boolean} Returns `true` if `key` exists, else `false`.
       */


      function baseHasIn(object, key) {
        return object != null && key in Object(object);
      }
      /**
       * The base implementation of `_.inRange` which doesn't coerce arguments.
       *
       * @private
       * @param {number} number The number to check.
       * @param {number} start The start of the range.
       * @param {number} end The end of the range.
       * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
       */


      function baseInRange(number, start, end) {
        return number >= nativeMin(start, end) && number < nativeMax(start, end);
      }
      /**
       * The base implementation of methods like `_.intersection`, without support
       * for iteratee shorthands, that accepts an array of arrays to inspect.
       *
       * @private
       * @param {Array} arrays The arrays to inspect.
       * @param {Function} [iteratee] The iteratee invoked per element.
       * @param {Function} [comparator] The comparator invoked per element.
       * @returns {Array} Returns the new array of shared values.
       */


      function baseIntersection(arrays, iteratee, comparator) {
        var includes = comparator ? arrayIncludesWith : arrayIncludes,
            length = arrays[0].length,
            othLength = arrays.length,
            othIndex = othLength,
            caches = Array(othLength),
            maxLength = Infinity,
            result = [];

        while (othIndex--) {
          var array = arrays[othIndex];

          if (othIndex && iteratee) {
            array = arrayMap(array, baseUnary(iteratee));
          }

          maxLength = nativeMin(array.length, maxLength);
          caches[othIndex] = !comparator && (iteratee || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined;
        }

        array = arrays[0];
        var index = -1,
            seen = caches[0];

        outer: while (++index < length && result.length < maxLength) {
          var value = array[index],
              computed = iteratee ? iteratee(value) : value;
          value = comparator || value !== 0 ? value : 0;

          if (!(seen ? cacheHas(seen, computed) : includes(result, computed, comparator))) {
            othIndex = othLength;

            while (--othIndex) {
              var cache = caches[othIndex];

              if (!(cache ? cacheHas(cache, computed) : includes(arrays[othIndex], computed, comparator))) {
                continue outer;
              }
            }

            if (seen) {
              seen.push(computed);
            }

            result.push(value);
          }
        }

        return result;
      }
      /**
       * The base implementation of `_.invert` and `_.invertBy` which inverts
       * `object` with values transformed by `iteratee` and set by `setter`.
       *
       * @private
       * @param {Object} object The object to iterate over.
       * @param {Function} setter The function to set `accumulator` values.
       * @param {Function} iteratee The iteratee to transform values.
       * @param {Object} accumulator The initial inverted object.
       * @returns {Function} Returns `accumulator`.
       */


      function baseInverter(object, setter, iteratee, accumulator) {
        baseForOwn(object, function (value, key, object) {
          setter(accumulator, iteratee(value), key, object);
        });
        return accumulator;
      }
      /**
       * The base implementation of `_.invoke` without support for individual
       * method arguments.
       *
       * @private
       * @param {Object} object The object to query.
       * @param {Array|string} path The path of the method to invoke.
       * @param {Array} args The arguments to invoke the method with.
       * @returns {*} Returns the result of the invoked method.
       */


      function baseInvoke(object, path, args) {
        path = castPath(path, object);
        object = parent(object, path);
        var func = object == null ? object : object[toKey(last(path))];
        return func == null ? undefined : apply(func, object, args);
      }
      /**
       * The base implementation of `_.isArguments`.
       *
       * @private
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is an `arguments` object,
       */


      function baseIsArguments(value) {
        return isObjectLike(value) && baseGetTag(value) == argsTag;
      }
      /**
       * The base implementation of `_.isArrayBuffer` without Node.js optimizations.
       *
       * @private
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
       */


      function baseIsArrayBuffer(value) {
        return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
      }
      /**
       * The base implementation of `_.isDate` without Node.js optimizations.
       *
       * @private
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
       */


      function baseIsDate(value) {
        return isObjectLike(value) && baseGetTag(value) == dateTag;
      }
      /**
       * The base implementation of `_.isEqual` which supports partial comparisons
       * and tracks traversed objects.
       *
       * @private
       * @param {*} value The value to compare.
       * @param {*} other The other value to compare.
       * @param {boolean} bitmask The bitmask flags.
       *  1 - Unordered comparison
       *  2 - Partial comparison
       * @param {Function} [customizer] The function to customize comparisons.
       * @param {Object} [stack] Tracks traversed `value` and `other` objects.
       * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
       */


      function baseIsEqual(value, other, bitmask, customizer, stack) {
        if (value === other) {
          return true;
        }

        if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
          return value !== value && other !== other;
        }

        return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
      }
      /**
       * A specialized version of `baseIsEqual` for arrays and objects which performs
       * deep comparisons and tracks traversed objects enabling objects with circular
       * references to be compared.
       *
       * @private
       * @param {Object} object The object to compare.
       * @param {Object} other The other object to compare.
       * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
       * @param {Function} customizer The function to customize comparisons.
       * @param {Function} equalFunc The function to determine equivalents of values.
       * @param {Object} [stack] Tracks traversed `object` and `other` objects.
       * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
       */


      function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
        var objIsArr = isArray(object),
            othIsArr = isArray(other),
            objTag = objIsArr ? arrayTag : getTag(object),
            othTag = othIsArr ? arrayTag : getTag(other);
        objTag = objTag == argsTag ? objectTag : objTag;
        othTag = othTag == argsTag ? objectTag : othTag;
        var objIsObj = objTag == objectTag,
            othIsObj = othTag == objectTag,
            isSameTag = objTag == othTag;

        if (isSameTag && isBuffer(object)) {
          if (!isBuffer(other)) {
            return false;
          }

          objIsArr = true;
          objIsObj = false;
        }

        if (isSameTag && !objIsObj) {
          stack || (stack = new Stack());
          return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
        }

        if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
          var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
              othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

          if (objIsWrapped || othIsWrapped) {
            var objUnwrapped = objIsWrapped ? object.value() : object,
                othUnwrapped = othIsWrapped ? other.value() : other;
            stack || (stack = new Stack());
            return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
          }
        }

        if (!isSameTag) {
          return false;
        }

        stack || (stack = new Stack());
        return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
      }
      /**
       * The base implementation of `_.isMap` without Node.js optimizations.
       *
       * @private
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a map, else `false`.
       */


      function baseIsMap(value) {
        return isObjectLike(value) && getTag(value) == mapTag;
      }
      /**
       * The base implementation of `_.isMatch` without support for iteratee shorthands.
       *
       * @private
       * @param {Object} object The object to inspect.
       * @param {Object} source The object of property values to match.
       * @param {Array} matchData The property names, values, and compare flags to match.
       * @param {Function} [customizer] The function to customize comparisons.
       * @returns {boolean} Returns `true` if `object` is a match, else `false`.
       */


      function baseIsMatch(object, source, matchData, customizer) {
        var index = matchData.length,
            length = index,
            noCustomizer = !customizer;

        if (object == null) {
          return !length;
        }

        object = Object(object);

        while (index--) {
          var data = matchData[index];

          if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
            return false;
          }
        }

        while (++index < length) {
          data = matchData[index];
          var key = data[0],
              objValue = object[key],
              srcValue = data[1];

          if (noCustomizer && data[2]) {
            if (objValue === undefined && !(key in object)) {
              return false;
            }
          } else {
            var stack = new Stack();

            if (customizer) {
              var result = customizer(objValue, srcValue, key, object, source, stack);
            }

            if (!(result === undefined ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) {
              return false;
            }
          }
        }

        return true;
      }
      /**
       * The base implementation of `_.isNative` without bad shim checks.
       *
       * @private
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a native function,
       *  else `false`.
       */


      function baseIsNative(value) {
        if (!isObject(value) || isMasked(value)) {
          return false;
        }

        var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
        return pattern.test(toSource(value));
      }
      /**
       * The base implementation of `_.isRegExp` without Node.js optimizations.
       *
       * @private
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
       */


      function baseIsRegExp(value) {
        return isObjectLike(value) && baseGetTag(value) == regexpTag;
      }
      /**
       * The base implementation of `_.isSet` without Node.js optimizations.
       *
       * @private
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a set, else `false`.
       */


      function baseIsSet(value) {
        return isObjectLike(value) && getTag(value) == setTag;
      }
      /**
       * The base implementation of `_.isTypedArray` without Node.js optimizations.
       *
       * @private
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
       */


      function baseIsTypedArray(value) {
        return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
      }
      /**
       * The base implementation of `_.iteratee`.
       *
       * @private
       * @param {*} [value=_.identity] The value to convert to an iteratee.
       * @returns {Function} Returns the iteratee.
       */


      function baseIteratee(value) {
        // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
        // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
        if (typeof value == 'function') {
          return value;
        }

        if (value == null) {
          return identity;
        }

        if (typeof value == 'object') {
          return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
        }

        return property(value);
      }
      /**
       * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
       *
       * @private
       * @param {Object} object The object to query.
       * @returns {Array} Returns the array of property names.
       */


      function baseKeys(object) {
        if (!isPrototype(object)) {
          return nativeKeys(object);
        }

        var result = [];

        for (var key in Object(object)) {
          if (hasOwnProperty.call(object, key) && key != 'constructor') {
            result.push(key);
          }
        }

        return result;
      }
      /**
       * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
       *
       * @private
       * @param {Object} object The object to query.
       * @returns {Array} Returns the array of property names.
       */


      function baseKeysIn(object) {
        if (!isObject(object)) {
          return nativeKeysIn(object);
        }

        var isProto = isPrototype(object),
            result = [];

        for (var key in object) {
          if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
            result.push(key);
          }
        }

        return result;
      }
      /**
       * The base implementation of `_.lt` which doesn't coerce arguments.
       *
       * @private
       * @param {*} value The value to compare.
       * @param {*} other The other value to compare.
       * @returns {boolean} Returns `true` if `value` is less than `other`,
       *  else `false`.
       */


      function baseLt(value, other) {
        return value < other;
      }
      /**
       * The base implementation of `_.map` without support for iteratee shorthands.
       *
       * @private
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} iteratee The function invoked per iteration.
       * @returns {Array} Returns the new mapped array.
       */


      function baseMap(collection, iteratee) {
        var index = -1,
            result = isArrayLike(collection) ? Array(collection.length) : [];
        baseEach(collection, function (value, key, collection) {
          result[++index] = iteratee(value, key, collection);
        });
        return result;
      }
      /**
       * The base implementation of `_.matches` which doesn't clone `source`.
       *
       * @private
       * @param {Object} source The object of property values to match.
       * @returns {Function} Returns the new spec function.
       */


      function baseMatches(source) {
        var matchData = getMatchData(source);

        if (matchData.length == 1 && matchData[0][2]) {
          return matchesStrictComparable(matchData[0][0], matchData[0][1]);
        }

        return function (object) {
          return object === source || baseIsMatch(object, source, matchData);
        };
      }
      /**
       * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
       *
       * @private
       * @param {string} path The path of the property to get.
       * @param {*} srcValue The value to match.
       * @returns {Function} Returns the new spec function.
       */


      function baseMatchesProperty(path, srcValue) {
        if (isKey(path) && isStrictComparable(srcValue)) {
          return matchesStrictComparable(toKey(path), srcValue);
        }

        return function (object) {
          var objValue = get(object, path);
          return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
        };
      }
      /**
       * The base implementation of `_.merge` without support for multiple sources.
       *
       * @private
       * @param {Object} object The destination object.
       * @param {Object} source The source object.
       * @param {number} srcIndex The index of `source`.
       * @param {Function} [customizer] The function to customize merged values.
       * @param {Object} [stack] Tracks traversed source values and their merged
       *  counterparts.
       */


      function baseMerge(object, source, srcIndex, customizer, stack) {
        if (object === source) {
          return;
        }

        baseFor(source, function (srcValue, key) {
          stack || (stack = new Stack());

          if (isObject(srcValue)) {
            baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
          } else {
            var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + '', object, source, stack) : undefined;

            if (newValue === undefined) {
              newValue = srcValue;
            }

            assignMergeValue(object, key, newValue);
          }
        }, keysIn);
      }
      /**
       * A specialized version of `baseMerge` for arrays and objects which performs
       * deep merges and tracks traversed objects enabling objects with circular
       * references to be merged.
       *
       * @private
       * @param {Object} object The destination object.
       * @param {Object} source The source object.
       * @param {string} key The key of the value to merge.
       * @param {number} srcIndex The index of `source`.
       * @param {Function} mergeFunc The function to merge values.
       * @param {Function} [customizer] The function to customize assigned values.
       * @param {Object} [stack] Tracks traversed source values and their merged
       *  counterparts.
       */


      function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
        var objValue = safeGet(object, key),
            srcValue = safeGet(source, key),
            stacked = stack.get(srcValue);

        if (stacked) {
          assignMergeValue(object, key, stacked);
          return;
        }

        var newValue = customizer ? customizer(objValue, srcValue, key + '', object, source, stack) : undefined;
        var isCommon = newValue === undefined;

        if (isCommon) {
          var isArr = isArray(srcValue),
              isBuff = !isArr && isBuffer(srcValue),
              isTyped = !isArr && !isBuff && isTypedArray(srcValue);
          newValue = srcValue;

          if (isArr || isBuff || isTyped) {
            if (isArray(objValue)) {
              newValue = objValue;
            } else if (isArrayLikeObject(objValue)) {
              newValue = copyArray(objValue);
            } else if (isBuff) {
              isCommon = false;
              newValue = cloneBuffer(srcValue, true);
            } else if (isTyped) {
              isCommon = false;
              newValue = cloneTypedArray(srcValue, true);
            } else {
              newValue = [];
            }
          } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
            newValue = objValue;

            if (isArguments(objValue)) {
              newValue = toPlainObject(objValue);
            } else if (!isObject(objValue) || isFunction(objValue)) {
              newValue = initCloneObject(srcValue);
            }
          } else {
            isCommon = false;
          }
        }

        if (isCommon) {
          // Recursively merge objects and arrays (susceptible to call stack limits).
          stack.set(srcValue, newValue);
          mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
          stack['delete'](srcValue);
        }

        assignMergeValue(object, key, newValue);
      }
      /**
       * The base implementation of `_.nth` which doesn't coerce arguments.
       *
       * @private
       * @param {Array} array The array to query.
       * @param {number} n The index of the element to return.
       * @returns {*} Returns the nth element of `array`.
       */


      function baseNth(array, n) {
        var length = array.length;

        if (!length) {
          return;
        }

        n += n < 0 ? length : 0;
        return isIndex(n, length) ? array[n] : undefined;
      }
      /**
       * The base implementation of `_.orderBy` without param guards.
       *
       * @private
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
       * @param {string[]} orders The sort orders of `iteratees`.
       * @returns {Array} Returns the new sorted array.
       */


      function baseOrderBy(collection, iteratees, orders) {
        var index = -1;
        iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(getIteratee()));
        var result = baseMap(collection, function (value, key, collection) {
          var criteria = arrayMap(iteratees, function (iteratee) {
            return iteratee(value);
          });
          return {
            'criteria': criteria,
            'index': ++index,
            'value': value
          };
        });
        return baseSortBy(result, function (object, other) {
          return compareMultiple(object, other, orders);
        });
      }
      /**
       * The base implementation of `_.pick` without support for individual
       * property identifiers.
       *
       * @private
       * @param {Object} object The source object.
       * @param {string[]} paths The property paths to pick.
       * @returns {Object} Returns the new object.
       */


      function basePick(object, paths) {
        return basePickBy(object, paths, function (value, path) {
          return hasIn(object, path);
        });
      }
      /**
       * The base implementation of  `_.pickBy` without support for iteratee shorthands.
       *
       * @private
       * @param {Object} object The source object.
       * @param {string[]} paths The property paths to pick.
       * @param {Function} predicate The function invoked per property.
       * @returns {Object} Returns the new object.
       */


      function basePickBy(object, paths, predicate) {
        var index = -1,
            length = paths.length,
            result = {};

        while (++index < length) {
          var path = paths[index],
              value = baseGet(object, path);

          if (predicate(value, path)) {
            baseSet(result, castPath(path, object), value);
          }
        }

        return result;
      }
      /**
       * A specialized version of `baseProperty` which supports deep paths.
       *
       * @private
       * @param {Array|string} path The path of the property to get.
       * @returns {Function} Returns the new accessor function.
       */


      function basePropertyDeep(path) {
        return function (object) {
          return baseGet(object, path);
        };
      }
      /**
       * The base implementation of `_.pullAllBy` without support for iteratee
       * shorthands.
       *
       * @private
       * @param {Array} array The array to modify.
       * @param {Array} values The values to remove.
       * @param {Function} [iteratee] The iteratee invoked per element.
       * @param {Function} [comparator] The comparator invoked per element.
       * @returns {Array} Returns `array`.
       */


      function basePullAll(array, values, iteratee, comparator) {
        var indexOf = comparator ? baseIndexOfWith : baseIndexOf,
            index = -1,
            length = values.length,
            seen = array;

        if (array === values) {
          values = copyArray(values);
        }

        if (iteratee) {
          seen = arrayMap(array, baseUnary(iteratee));
        }

        while (++index < length) {
          var fromIndex = 0,
              value = values[index],
              computed = iteratee ? iteratee(value) : value;

          while ((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1) {
            if (seen !== array) {
              splice.call(seen, fromIndex, 1);
            }

            splice.call(array, fromIndex, 1);
          }
        }

        return array;
      }
      /**
       * The base implementation of `_.pullAt` without support for individual
       * indexes or capturing the removed elements.
       *
       * @private
       * @param {Array} array The array to modify.
       * @param {number[]} indexes The indexes of elements to remove.
       * @returns {Array} Returns `array`.
       */


      function basePullAt(array, indexes) {
        var length = array ? indexes.length : 0,
            lastIndex = length - 1;

        while (length--) {
          var index = indexes[length];

          if (length == lastIndex || index !== previous) {
            var previous = index;

            if (isIndex(index)) {
              splice.call(array, index, 1);
            } else {
              baseUnset(array, index);
            }
          }
        }

        return array;
      }
      /**
       * The base implementation of `_.random` without support for returning
       * floating-point numbers.
       *
       * @private
       * @param {number} lower The lower bound.
       * @param {number} upper The upper bound.
       * @returns {number} Returns the random number.
       */


      function baseRandom(lower, upper) {
        return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
      }
      /**
       * The base implementation of `_.range` and `_.rangeRight` which doesn't
       * coerce arguments.
       *
       * @private
       * @param {number} start The start of the range.
       * @param {number} end The end of the range.
       * @param {number} step The value to increment or decrement by.
       * @param {boolean} [fromRight] Specify iterating from right to left.
       * @returns {Array} Returns the range of numbers.
       */


      function baseRange(start, end, step, fromRight) {
        var index = -1,
            length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
            result = Array(length);

        while (length--) {
          result[fromRight ? length : ++index] = start;
          start += step;
        }

        return result;
      }
      /**
       * The base implementation of `_.repeat` which doesn't coerce arguments.
       *
       * @private
       * @param {string} string The string to repeat.
       * @param {number} n The number of times to repeat the string.
       * @returns {string} Returns the repeated string.
       */


      function baseRepeat(string, n) {
        var result = '';

        if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
          return result;
        } // Leverage the exponentiation by squaring algorithm for a faster repeat.
        // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.


        do {
          if (n % 2) {
            result += string;
          }

          n = nativeFloor(n / 2);

          if (n) {
            string += string;
          }
        } while (n);

        return result;
      }
      /**
       * The base implementation of `_.rest` which doesn't validate or coerce arguments.
       *
       * @private
       * @param {Function} func The function to apply a rest parameter to.
       * @param {number} [start=func.length-1] The start position of the rest parameter.
       * @returns {Function} Returns the new function.
       */


      function baseRest(func, start) {
        return setToString(overRest(func, start, identity), func + '');
      }
      /**
       * The base implementation of `_.sample`.
       *
       * @private
       * @param {Array|Object} collection The collection to sample.
       * @returns {*} Returns the random element.
       */


      function baseSample(collection) {
        return arraySample(values(collection));
      }
      /**
       * The base implementation of `_.sampleSize` without param guards.
       *
       * @private
       * @param {Array|Object} collection The collection to sample.
       * @param {number} n The number of elements to sample.
       * @returns {Array} Returns the random elements.
       */


      function baseSampleSize(collection, n) {
        var array = values(collection);
        return shuffleSelf(array, baseClamp(n, 0, array.length));
      }
      /**
       * The base implementation of `_.set`.
       *
       * @private
       * @param {Object} object The object to modify.
       * @param {Array|string} path The path of the property to set.
       * @param {*} value The value to set.
       * @param {Function} [customizer] The function to customize path creation.
       * @returns {Object} Returns `object`.
       */


      function baseSet(object, path, value, customizer) {
        if (!isObject(object)) {
          return object;
        }

        path = castPath(path, object);
        var index = -1,
            length = path.length,
            lastIndex = length - 1,
            nested = object;

        while (nested != null && ++index < length) {
          var key = toKey(path[index]),
              newValue = value;

          if (index != lastIndex) {
            var objValue = nested[key];
            newValue = customizer ? customizer(objValue, key, nested) : undefined;

            if (newValue === undefined) {
              newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
            }
          }

          assignValue(nested, key, newValue);
          nested = nested[key];
        }

        return object;
      }
      /**
       * The base implementation of `setData` without support for hot loop shorting.
       *
       * @private
       * @param {Function} func The function to associate metadata with.
       * @param {*} data The metadata.
       * @returns {Function} Returns `func`.
       */


      var baseSetData = !metaMap ? identity : function (func, data) {
        metaMap.set(func, data);
        return func;
      };
      /**
       * The base implementation of `setToString` without support for hot loop shorting.
       *
       * @private
       * @param {Function} func The function to modify.
       * @param {Function} string The `toString` result.
       * @returns {Function} Returns `func`.
       */

      var baseSetToString = !defineProperty ? identity : function (func, string) {
        return defineProperty(func, 'toString', {
          'configurable': true,
          'enumerable': false,
          'value': constant(string),
          'writable': true
        });
      };
      /**
       * The base implementation of `_.shuffle`.
       *
       * @private
       * @param {Array|Object} collection The collection to shuffle.
       * @returns {Array} Returns the new shuffled array.
       */

      function baseShuffle(collection) {
        return shuffleSelf(values(collection));
      }
      /**
       * The base implementation of `_.slice` without an iteratee call guard.
       *
       * @private
       * @param {Array} array The array to slice.
       * @param {number} [start=0] The start position.
       * @param {number} [end=array.length] The end position.
       * @returns {Array} Returns the slice of `array`.
       */


      function baseSlice(array, start, end) {
        var index = -1,
            length = array.length;

        if (start < 0) {
          start = -start > length ? 0 : length + start;
        }

        end = end > length ? length : end;

        if (end < 0) {
          end += length;
        }

        length = start > end ? 0 : end - start >>> 0;
        start >>>= 0;
        var result = Array(length);

        while (++index < length) {
          result[index] = array[index + start];
        }

        return result;
      }
      /**
       * The base implementation of `_.some` without support for iteratee shorthands.
       *
       * @private
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} predicate The function invoked per iteration.
       * @returns {boolean} Returns `true` if any element passes the predicate check,
       *  else `false`.
       */


      function baseSome(collection, predicate) {
        var result;
        baseEach(collection, function (value, index, collection) {
          result = predicate(value, index, collection);
          return !result;
        });
        return !!result;
      }
      /**
       * The base implementation of `_.sortedIndex` and `_.sortedLastIndex` which
       * performs a binary search of `array` to determine the index at which `value`
       * should be inserted into `array` in order to maintain its sort order.
       *
       * @private
       * @param {Array} array The sorted array to inspect.
       * @param {*} value The value to evaluate.
       * @param {boolean} [retHighest] Specify returning the highest qualified index.
       * @returns {number} Returns the index at which `value` should be inserted
       *  into `array`.
       */


      function baseSortedIndex(array, value, retHighest) {
        var low = 0,
            high = array == null ? low : array.length;

        if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
          while (low < high) {
            var mid = low + high >>> 1,
                computed = array[mid];

            if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }

          return high;
        }

        return baseSortedIndexBy(array, value, identity, retHighest);
      }
      /**
       * The base implementation of `_.sortedIndexBy` and `_.sortedLastIndexBy`
       * which invokes `iteratee` for `value` and each element of `array` to compute
       * their sort ranking. The iteratee is invoked with one argument; (value).
       *
       * @private
       * @param {Array} array The sorted array to inspect.
       * @param {*} value The value to evaluate.
       * @param {Function} iteratee The iteratee invoked per element.
       * @param {boolean} [retHighest] Specify returning the highest qualified index.
       * @returns {number} Returns the index at which `value` should be inserted
       *  into `array`.
       */


      function baseSortedIndexBy(array, value, iteratee, retHighest) {
        value = iteratee(value);
        var low = 0,
            high = array == null ? 0 : array.length,
            valIsNaN = value !== value,
            valIsNull = value === null,
            valIsSymbol = isSymbol(value),
            valIsUndefined = value === undefined;

        while (low < high) {
          var mid = nativeFloor((low + high) / 2),
              computed = iteratee(array[mid]),
              othIsDefined = computed !== undefined,
              othIsNull = computed === null,
              othIsReflexive = computed === computed,
              othIsSymbol = isSymbol(computed);

          if (valIsNaN) {
            var setLow = retHighest || othIsReflexive;
          } else if (valIsUndefined) {
            setLow = othIsReflexive && (retHighest || othIsDefined);
          } else if (valIsNull) {
            setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
          } else if (valIsSymbol) {
            setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
          } else if (othIsNull || othIsSymbol) {
            setLow = false;
          } else {
            setLow = retHighest ? computed <= value : computed < value;
          }

          if (setLow) {
            low = mid + 1;
          } else {
            high = mid;
          }
        }

        return nativeMin(high, MAX_ARRAY_INDEX);
      }
      /**
       * The base implementation of `_.sortedUniq` and `_.sortedUniqBy` without
       * support for iteratee shorthands.
       *
       * @private
       * @param {Array} array The array to inspect.
       * @param {Function} [iteratee] The iteratee invoked per element.
       * @returns {Array} Returns the new duplicate free array.
       */


      function baseSortedUniq(array, iteratee) {
        var index = -1,
            length = array.length,
            resIndex = 0,
            result = [];

        while (++index < length) {
          var value = array[index],
              computed = iteratee ? iteratee(value) : value;

          if (!index || !eq(computed, seen)) {
            var seen = computed;
            result[resIndex++] = value === 0 ? 0 : value;
          }
        }

        return result;
      }
      /**
       * The base implementation of `_.toNumber` which doesn't ensure correct
       * conversions of binary, hexadecimal, or octal string values.
       *
       * @private
       * @param {*} value The value to process.
       * @returns {number} Returns the number.
       */


      function baseToNumber(value) {
        if (typeof value == 'number') {
          return value;
        }

        if (isSymbol(value)) {
          return NAN;
        }

        return +value;
      }
      /**
       * The base implementation of `_.toString` which doesn't convert nullish
       * values to empty strings.
       *
       * @private
       * @param {*} value The value to process.
       * @returns {string} Returns the string.
       */


      function baseToString(value) {
        // Exit early for strings to avoid a performance hit in some environments.
        if (typeof value == 'string') {
          return value;
        }

        if (isArray(value)) {
          // Recursively convert values (susceptible to call stack limits).
          return arrayMap(value, baseToString) + '';
        }

        if (isSymbol(value)) {
          return symbolToString ? symbolToString.call(value) : '';
        }

        var result = value + '';
        return result == '0' && 1 / value == -INFINITY ? '-0' : result;
      }
      /**
       * The base implementation of `_.uniqBy` without support for iteratee shorthands.
       *
       * @private
       * @param {Array} array The array to inspect.
       * @param {Function} [iteratee] The iteratee invoked per element.
       * @param {Function} [comparator] The comparator invoked per element.
       * @returns {Array} Returns the new duplicate free array.
       */


      function baseUniq(array, iteratee, comparator) {
        var index = -1,
            includes = arrayIncludes,
            length = array.length,
            isCommon = true,
            result = [],
            seen = result;

        if (comparator) {
          isCommon = false;
          includes = arrayIncludesWith;
        } else if (length >= LARGE_ARRAY_SIZE) {
          var set = iteratee ? null : createSet(array);

          if (set) {
            return setToArray(set);
          }

          isCommon = false;
          includes = cacheHas;
          seen = new SetCache();
        } else {
          seen = iteratee ? [] : result;
        }

        outer: while (++index < length) {
          var value = array[index],
              computed = iteratee ? iteratee(value) : value;
          value = comparator || value !== 0 ? value : 0;

          if (isCommon && computed === computed) {
            var seenIndex = seen.length;

            while (seenIndex--) {
              if (seen[seenIndex] === computed) {
                continue outer;
              }
            }

            if (iteratee) {
              seen.push(computed);
            }

            result.push(value);
          } else if (!includes(seen, computed, comparator)) {
            if (seen !== result) {
              seen.push(computed);
            }

            result.push(value);
          }
        }

        return result;
      }
      /**
       * The base implementation of `_.unset`.
       *
       * @private
       * @param {Object} object The object to modify.
       * @param {Array|string} path The property path to unset.
       * @returns {boolean} Returns `true` if the property is deleted, else `false`.
       */


      function baseUnset(object, path) {
        path = castPath(path, object);
        object = parent(object, path);
        return object == null || delete object[toKey(last(path))];
      }
      /**
       * The base implementation of `_.update`.
       *
       * @private
       * @param {Object} object The object to modify.
       * @param {Array|string} path The path of the property to update.
       * @param {Function} updater The function to produce the updated value.
       * @param {Function} [customizer] The function to customize path creation.
       * @returns {Object} Returns `object`.
       */


      function baseUpdate(object, path, updater, customizer) {
        return baseSet(object, path, updater(baseGet(object, path)), customizer);
      }
      /**
       * The base implementation of methods like `_.dropWhile` and `_.takeWhile`
       * without support for iteratee shorthands.
       *
       * @private
       * @param {Array} array The array to query.
       * @param {Function} predicate The function invoked per iteration.
       * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
       * @param {boolean} [fromRight] Specify iterating from right to left.
       * @returns {Array} Returns the slice of `array`.
       */


      function baseWhile(array, predicate, isDrop, fromRight) {
        var length = array.length,
            index = fromRight ? length : -1;

        while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {}

        return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
      }
      /**
       * The base implementation of `wrapperValue` which returns the result of
       * performing a sequence of actions on the unwrapped `value`, where each
       * successive action is supplied the return value of the previous.
       *
       * @private
       * @param {*} value The unwrapped value.
       * @param {Array} actions Actions to perform to resolve the unwrapped value.
       * @returns {*} Returns the resolved value.
       */


      function baseWrapperValue(value, actions) {
        var result = value;

        if (result instanceof LazyWrapper) {
          result = result.value();
        }

        return arrayReduce(actions, function (result, action) {
          return action.func.apply(action.thisArg, arrayPush([result], action.args));
        }, result);
      }
      /**
       * The base implementation of methods like `_.xor`, without support for
       * iteratee shorthands, that accepts an array of arrays to inspect.
       *
       * @private
       * @param {Array} arrays The arrays to inspect.
       * @param {Function} [iteratee] The iteratee invoked per element.
       * @param {Function} [comparator] The comparator invoked per element.
       * @returns {Array} Returns the new array of values.
       */


      function baseXor(arrays, iteratee, comparator) {
        var length = arrays.length;

        if (length < 2) {
          return length ? baseUniq(arrays[0]) : [];
        }

        var index = -1,
            result = Array(length);

        while (++index < length) {
          var array = arrays[index],
              othIndex = -1;

          while (++othIndex < length) {
            if (othIndex != index) {
              result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator);
            }
          }
        }

        return baseUniq(baseFlatten(result, 1), iteratee, comparator);
      }
      /**
       * This base implementation of `_.zipObject` which assigns values using `assignFunc`.
       *
       * @private
       * @param {Array} props The property identifiers.
       * @param {Array} values The property values.
       * @param {Function} assignFunc The function to assign values.
       * @returns {Object} Returns the new object.
       */


      function baseZipObject(props, values, assignFunc) {
        var index = -1,
            length = props.length,
            valsLength = values.length,
            result = {};

        while (++index < length) {
          var value = index < valsLength ? values[index] : undefined;
          assignFunc(result, props[index], value);
        }

        return result;
      }
      /**
       * Casts `value` to an empty array if it's not an array like object.
       *
       * @private
       * @param {*} value The value to inspect.
       * @returns {Array|Object} Returns the cast array-like object.
       */


      function castArrayLikeObject(value) {
        return isArrayLikeObject(value) ? value : [];
      }
      /**
       * Casts `value` to `identity` if it's not a function.
       *
       * @private
       * @param {*} value The value to inspect.
       * @returns {Function} Returns cast function.
       */


      function castFunction(value) {
        return typeof value == 'function' ? value : identity;
      }
      /**
       * Casts `value` to a path array if it's not one.
       *
       * @private
       * @param {*} value The value to inspect.
       * @param {Object} [object] The object to query keys on.
       * @returns {Array} Returns the cast property path array.
       */


      function castPath(value, object) {
        if (isArray(value)) {
          return value;
        }

        return isKey(value, object) ? [value] : stringToPath(toString(value));
      }
      /**
       * A `baseRest` alias which can be replaced with `identity` by module
       * replacement plugins.
       *
       * @private
       * @type {Function}
       * @param {Function} func The function to apply a rest parameter to.
       * @returns {Function} Returns the new function.
       */


      var castRest = baseRest;
      /**
       * Casts `array` to a slice if it's needed.
       *
       * @private
       * @param {Array} array The array to inspect.
       * @param {number} start The start position.
       * @param {number} [end=array.length] The end position.
       * @returns {Array} Returns the cast slice.
       */

      function castSlice(array, start, end) {
        var length = array.length;
        end = end === undefined ? length : end;
        return !start && end >= length ? array : baseSlice(array, start, end);
      }
      /**
       * A simple wrapper around the global [`clearTimeout`](https://mdn.io/clearTimeout).
       *
       * @private
       * @param {number|Object} id The timer id or timeout object of the timer to clear.
       */


      var clearTimeout = ctxClearTimeout || function (id) {
        return root.clearTimeout(id);
      };
      /**
       * Creates a clone of  `buffer`.
       *
       * @private
       * @param {Buffer} buffer The buffer to clone.
       * @param {boolean} [isDeep] Specify a deep clone.
       * @returns {Buffer} Returns the cloned buffer.
       */


      function cloneBuffer(buffer, isDeep) {
        if (isDeep) {
          return buffer.slice();
        }

        var length = buffer.length,
            result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
        buffer.copy(result);
        return result;
      }
      /**
       * Creates a clone of `arrayBuffer`.
       *
       * @private
       * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
       * @returns {ArrayBuffer} Returns the cloned array buffer.
       */


      function cloneArrayBuffer(arrayBuffer) {
        var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
        new Uint8Array(result).set(new Uint8Array(arrayBuffer));
        return result;
      }
      /**
       * Creates a clone of `dataView`.
       *
       * @private
       * @param {Object} dataView The data view to clone.
       * @param {boolean} [isDeep] Specify a deep clone.
       * @returns {Object} Returns the cloned data view.
       */


      function cloneDataView(dataView, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
        return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
      }
      /**
       * Creates a clone of `regexp`.
       *
       * @private
       * @param {Object} regexp The regexp to clone.
       * @returns {Object} Returns the cloned regexp.
       */


      function cloneRegExp(regexp) {
        var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
        result.lastIndex = regexp.lastIndex;
        return result;
      }
      /**
       * Creates a clone of the `symbol` object.
       *
       * @private
       * @param {Object} symbol The symbol object to clone.
       * @returns {Object} Returns the cloned symbol object.
       */


      function cloneSymbol(symbol) {
        return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
      }
      /**
       * Creates a clone of `typedArray`.
       *
       * @private
       * @param {Object} typedArray The typed array to clone.
       * @param {boolean} [isDeep] Specify a deep clone.
       * @returns {Object} Returns the cloned typed array.
       */


      function cloneTypedArray(typedArray, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
        return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
      }
      /**
       * Compares values to sort them in ascending order.
       *
       * @private
       * @param {*} value The value to compare.
       * @param {*} other The other value to compare.
       * @returns {number} Returns the sort order indicator for `value`.
       */


      function compareAscending(value, other) {
        if (value !== other) {
          var valIsDefined = value !== undefined,
              valIsNull = value === null,
              valIsReflexive = value === value,
              valIsSymbol = isSymbol(value);
          var othIsDefined = other !== undefined,
              othIsNull = other === null,
              othIsReflexive = other === other,
              othIsSymbol = isSymbol(other);

          if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
            return 1;
          }

          if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
            return -1;
          }
        }

        return 0;
      }
      /**
       * Used by `_.orderBy` to compare multiple properties of a value to another
       * and stable sort them.
       *
       * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
       * specify an order of "desc" for descending or "asc" for ascending sort order
       * of corresponding values.
       *
       * @private
       * @param {Object} object The object to compare.
       * @param {Object} other The other object to compare.
       * @param {boolean[]|string[]} orders The order to sort by for each property.
       * @returns {number} Returns the sort order indicator for `object`.
       */


      function compareMultiple(object, other, orders) {
        var index = -1,
            objCriteria = object.criteria,
            othCriteria = other.criteria,
            length = objCriteria.length,
            ordersLength = orders.length;

        while (++index < length) {
          var result = compareAscending(objCriteria[index], othCriteria[index]);

          if (result) {
            if (index >= ordersLength) {
              return result;
            }

            var order = orders[index];
            return result * (order == 'desc' ? -1 : 1);
          }
        } // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
        // that causes it, under certain circumstances, to provide the same value for
        // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
        // for more details.
        //
        // This also ensures a stable sort in V8 and other engines.
        // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.


        return object.index - other.index;
      }
      /**
       * Creates an array that is the composition of partially applied arguments,
       * placeholders, and provided arguments into a single array of arguments.
       *
       * @private
       * @param {Array} args The provided arguments.
       * @param {Array} partials The arguments to prepend to those provided.
       * @param {Array} holders The `partials` placeholder indexes.
       * @params {boolean} [isCurried] Specify composing for a curried function.
       * @returns {Array} Returns the new array of composed arguments.
       */


      function composeArgs(args, partials, holders, isCurried) {
        var argsIndex = -1,
            argsLength = args.length,
            holdersLength = holders.length,
            leftIndex = -1,
            leftLength = partials.length,
            rangeLength = nativeMax(argsLength - holdersLength, 0),
            result = Array(leftLength + rangeLength),
            isUncurried = !isCurried;

        while (++leftIndex < leftLength) {
          result[leftIndex] = partials[leftIndex];
        }

        while (++argsIndex < holdersLength) {
          if (isUncurried || argsIndex < argsLength) {
            result[holders[argsIndex]] = args[argsIndex];
          }
        }

        while (rangeLength--) {
          result[leftIndex++] = args[argsIndex++];
        }

        return result;
      }
      /**
       * This function is like `composeArgs` except that the arguments composition
       * is tailored for `_.partialRight`.
       *
       * @private
       * @param {Array} args The provided arguments.
       * @param {Array} partials The arguments to append to those provided.
       * @param {Array} holders The `partials` placeholder indexes.
       * @params {boolean} [isCurried] Specify composing for a curried function.
       * @returns {Array} Returns the new array of composed arguments.
       */


      function composeArgsRight(args, partials, holders, isCurried) {
        var argsIndex = -1,
            argsLength = args.length,
            holdersIndex = -1,
            holdersLength = holders.length,
            rightIndex = -1,
            rightLength = partials.length,
            rangeLength = nativeMax(argsLength - holdersLength, 0),
            result = Array(rangeLength + rightLength),
            isUncurried = !isCurried;

        while (++argsIndex < rangeLength) {
          result[argsIndex] = args[argsIndex];
        }

        var offset = argsIndex;

        while (++rightIndex < rightLength) {
          result[offset + rightIndex] = partials[rightIndex];
        }

        while (++holdersIndex < holdersLength) {
          if (isUncurried || argsIndex < argsLength) {
            result[offset + holders[holdersIndex]] = args[argsIndex++];
          }
        }

        return result;
      }
      /**
       * Copies the values of `source` to `array`.
       *
       * @private
       * @param {Array} source The array to copy values from.
       * @param {Array} [array=[]] The array to copy values to.
       * @returns {Array} Returns `array`.
       */


      function copyArray(source, array) {
        var index = -1,
            length = source.length;
        array || (array = Array(length));

        while (++index < length) {
          array[index] = source[index];
        }

        return array;
      }
      /**
       * Copies properties of `source` to `object`.
       *
       * @private
       * @param {Object} source The object to copy properties from.
       * @param {Array} props The property identifiers to copy.
       * @param {Object} [object={}] The object to copy properties to.
       * @param {Function} [customizer] The function to customize copied values.
       * @returns {Object} Returns `object`.
       */


      function copyObject(source, props, object, customizer) {
        var isNew = !object;
        object || (object = {});
        var index = -1,
            length = props.length;

        while (++index < length) {
          var key = props[index];
          var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;

          if (newValue === undefined) {
            newValue = source[key];
          }

          if (isNew) {
            baseAssignValue(object, key, newValue);
          } else {
            assignValue(object, key, newValue);
          }
        }

        return object;
      }
      /**
       * Copies own symbols of `source` to `object`.
       *
       * @private
       * @param {Object} source The object to copy symbols from.
       * @param {Object} [object={}] The object to copy symbols to.
       * @returns {Object} Returns `object`.
       */


      function copySymbols(source, object) {
        return copyObject(source, getSymbols(source), object);
      }
      /**
       * Copies own and inherited symbols of `source` to `object`.
       *
       * @private
       * @param {Object} source The object to copy symbols from.
       * @param {Object} [object={}] The object to copy symbols to.
       * @returns {Object} Returns `object`.
       */


      function copySymbolsIn(source, object) {
        return copyObject(source, getSymbolsIn(source), object);
      }
      /**
       * Creates a function like `_.groupBy`.
       *
       * @private
       * @param {Function} setter The function to set accumulator values.
       * @param {Function} [initializer] The accumulator object initializer.
       * @returns {Function} Returns the new aggregator function.
       */


      function createAggregator(setter, initializer) {
        return function (collection, iteratee) {
          var func = isArray(collection) ? arrayAggregator : baseAggregator,
              accumulator = initializer ? initializer() : {};
          return func(collection, setter, getIteratee(iteratee, 2), accumulator);
        };
      }
      /**
       * Creates a function like `_.assign`.
       *
       * @private
       * @param {Function} assigner The function to assign values.
       * @returns {Function} Returns the new assigner function.
       */


      function createAssigner(assigner) {
        return baseRest(function (object, sources) {
          var index = -1,
              length = sources.length,
              customizer = length > 1 ? sources[length - 1] : undefined,
              guard = length > 2 ? sources[2] : undefined;
          customizer = assigner.length > 3 && typeof customizer == 'function' ? (length--, customizer) : undefined;

          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            customizer = length < 3 ? undefined : customizer;
            length = 1;
          }

          object = Object(object);

          while (++index < length) {
            var source = sources[index];

            if (source) {
              assigner(object, source, index, customizer);
            }
          }

          return object;
        });
      }
      /**
       * Creates a `baseEach` or `baseEachRight` function.
       *
       * @private
       * @param {Function} eachFunc The function to iterate over a collection.
       * @param {boolean} [fromRight] Specify iterating from right to left.
       * @returns {Function} Returns the new base function.
       */


      function createBaseEach(eachFunc, fromRight) {
        return function (collection, iteratee) {
          if (collection == null) {
            return collection;
          }

          if (!isArrayLike(collection)) {
            return eachFunc(collection, iteratee);
          }

          var length = collection.length,
              index = fromRight ? length : -1,
              iterable = Object(collection);

          while (fromRight ? index-- : ++index < length) {
            if (iteratee(iterable[index], index, iterable) === false) {
              break;
            }
          }

          return collection;
        };
      }
      /**
       * Creates a base function for methods like `_.forIn` and `_.forOwn`.
       *
       * @private
       * @param {boolean} [fromRight] Specify iterating from right to left.
       * @returns {Function} Returns the new base function.
       */


      function createBaseFor(fromRight) {
        return function (object, iteratee, keysFunc) {
          var index = -1,
              iterable = Object(object),
              props = keysFunc(object),
              length = props.length;

          while (length--) {
            var key = props[fromRight ? length : ++index];

            if (iteratee(iterable[key], key, iterable) === false) {
              break;
            }
          }

          return object;
        };
      }
      /**
       * Creates a function that wraps `func` to invoke it with the optional `this`
       * binding of `thisArg`.
       *
       * @private
       * @param {Function} func The function to wrap.
       * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
       * @param {*} [thisArg] The `this` binding of `func`.
       * @returns {Function} Returns the new wrapped function.
       */


      function createBind(func, bitmask, thisArg) {
        var isBind = bitmask & WRAP_BIND_FLAG,
            Ctor = createCtor(func);

        function wrapper() {
          var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
          return fn.apply(isBind ? thisArg : this, arguments);
        }

        return wrapper;
      }
      /**
       * Creates a function like `_.lowerFirst`.
       *
       * @private
       * @param {string} methodName The name of the `String` case method to use.
       * @returns {Function} Returns the new case function.
       */


      function createCaseFirst(methodName) {
        return function (string) {
          string = toString(string);
          var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined;
          var chr = strSymbols ? strSymbols[0] : string.charAt(0);
          var trailing = strSymbols ? castSlice(strSymbols, 1).join('') : string.slice(1);
          return chr[methodName]() + trailing;
        };
      }
      /**
       * Creates a function like `_.camelCase`.
       *
       * @private
       * @param {Function} callback The function to combine each word.
       * @returns {Function} Returns the new compounder function.
       */


      function createCompounder(callback) {
        return function (string) {
          return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
        };
      }
      /**
       * Creates a function that produces an instance of `Ctor` regardless of
       * whether it was invoked as part of a `new` expression or by `call` or `apply`.
       *
       * @private
       * @param {Function} Ctor The constructor to wrap.
       * @returns {Function} Returns the new wrapped function.
       */


      function createCtor(Ctor) {
        return function () {
          // Use a `switch` statement to work with class constructors. See
          // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
          // for more details.
          var args = arguments;

          switch (args.length) {
            case 0:
              return new Ctor();

            case 1:
              return new Ctor(args[0]);

            case 2:
              return new Ctor(args[0], args[1]);

            case 3:
              return new Ctor(args[0], args[1], args[2]);

            case 4:
              return new Ctor(args[0], args[1], args[2], args[3]);

            case 5:
              return new Ctor(args[0], args[1], args[2], args[3], args[4]);

            case 6:
              return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);

            case 7:
              return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
          }

          var thisBinding = baseCreate(Ctor.prototype),
              result = Ctor.apply(thisBinding, args); // Mimic the constructor's `return` behavior.
          // See https://es5.github.io/#x13.2.2 for more details.

          return isObject(result) ? result : thisBinding;
        };
      }
      /**
       * Creates a function that wraps `func` to enable currying.
       *
       * @private
       * @param {Function} func The function to wrap.
       * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
       * @param {number} arity The arity of `func`.
       * @returns {Function} Returns the new wrapped function.
       */


      function createCurry(func, bitmask, arity) {
        var Ctor = createCtor(func);

        function wrapper() {
          var length = arguments.length,
              args = Array(length),
              index = length,
              placeholder = getHolder(wrapper);

          while (index--) {
            args[index] = arguments[index];
          }

          var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
          length -= holders.length;

          if (length < arity) {
            return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, undefined, args, holders, undefined, undefined, arity - length);
          }

          var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
          return apply(fn, this, args);
        }

        return wrapper;
      }
      /**
       * Creates a `_.find` or `_.findLast` function.
       *
       * @private
       * @param {Function} findIndexFunc The function to find the collection index.
       * @returns {Function} Returns the new find function.
       */


      function createFind(findIndexFunc) {
        return function (collection, predicate, fromIndex) {
          var iterable = Object(collection);

          if (!isArrayLike(collection)) {
            var iteratee = getIteratee(predicate, 3);
            collection = keys(collection);

            predicate = function (key) {
              return iteratee(iterable[key], key, iterable);
            };
          }

          var index = findIndexFunc(collection, predicate, fromIndex);
          return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
        };
      }
      /**
       * Creates a `_.flow` or `_.flowRight` function.
       *
       * @private
       * @param {boolean} [fromRight] Specify iterating from right to left.
       * @returns {Function} Returns the new flow function.
       */


      function createFlow(fromRight) {
        return flatRest(function (funcs) {
          var length = funcs.length,
              index = length,
              prereq = LodashWrapper.prototype.thru;

          if (fromRight) {
            funcs.reverse();
          }

          while (index--) {
            var func = funcs[index];

            if (typeof func != 'function') {
              throw new TypeError(FUNC_ERROR_TEXT);
            }

            if (prereq && !wrapper && getFuncName(func) == 'wrapper') {
              var wrapper = new LodashWrapper([], true);
            }
          }

          index = wrapper ? index : length;

          while (++index < length) {
            func = funcs[index];
            var funcName = getFuncName(func),
                data = funcName == 'wrapper' ? getData(func) : undefined;

            if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
              wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
            } else {
              wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
            }
          }

          return function () {
            var args = arguments,
                value = args[0];

            if (wrapper && args.length == 1 && isArray(value)) {
              return wrapper.plant(value).value();
            }

            var index = 0,
                result = length ? funcs[index].apply(this, args) : value;

            while (++index < length) {
              result = funcs[index].call(this, result);
            }

            return result;
          };
        });
      }
      /**
       * Creates a function that wraps `func` to invoke it with optional `this`
       * binding of `thisArg`, partial application, and currying.
       *
       * @private
       * @param {Function|string} func The function or method name to wrap.
       * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
       * @param {*} [thisArg] The `this` binding of `func`.
       * @param {Array} [partials] The arguments to prepend to those provided to
       *  the new function.
       * @param {Array} [holders] The `partials` placeholder indexes.
       * @param {Array} [partialsRight] The arguments to append to those provided
       *  to the new function.
       * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
       * @param {Array} [argPos] The argument positions of the new function.
       * @param {number} [ary] The arity cap of `func`.
       * @param {number} [arity] The arity of `func`.
       * @returns {Function} Returns the new wrapped function.
       */


      function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
        var isAry = bitmask & WRAP_ARY_FLAG,
            isBind = bitmask & WRAP_BIND_FLAG,
            isBindKey = bitmask & WRAP_BIND_KEY_FLAG,
            isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG),
            isFlip = bitmask & WRAP_FLIP_FLAG,
            Ctor = isBindKey ? undefined : createCtor(func);

        function wrapper() {
          var length = arguments.length,
              args = Array(length),
              index = length;

          while (index--) {
            args[index] = arguments[index];
          }

          if (isCurried) {
            var placeholder = getHolder(wrapper),
                holdersCount = countHolders(args, placeholder);
          }

          if (partials) {
            args = composeArgs(args, partials, holders, isCurried);
          }

          if (partialsRight) {
            args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
          }

          length -= holdersCount;

          if (isCurried && length < arity) {
            var newHolders = replaceHolders(args, placeholder);
            return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, thisArg, args, newHolders, argPos, ary, arity - length);
          }

          var thisBinding = isBind ? thisArg : this,
              fn = isBindKey ? thisBinding[func] : func;
          length = args.length;

          if (argPos) {
            args = reorder(args, argPos);
          } else if (isFlip && length > 1) {
            args.reverse();
          }

          if (isAry && ary < length) {
            args.length = ary;
          }

          if (this && this !== root && this instanceof wrapper) {
            fn = Ctor || createCtor(fn);
          }

          return fn.apply(thisBinding, args);
        }

        return wrapper;
      }
      /**
       * Creates a function like `_.invertBy`.
       *
       * @private
       * @param {Function} setter The function to set accumulator values.
       * @param {Function} toIteratee The function to resolve iteratees.
       * @returns {Function} Returns the new inverter function.
       */


      function createInverter(setter, toIteratee) {
        return function (object, iteratee) {
          return baseInverter(object, setter, toIteratee(iteratee), {});
        };
      }
      /**
       * Creates a function that performs a mathematical operation on two values.
       *
       * @private
       * @param {Function} operator The function to perform the operation.
       * @param {number} [defaultValue] The value used for `undefined` arguments.
       * @returns {Function} Returns the new mathematical operation function.
       */


      function createMathOperation(operator, defaultValue) {
        return function (value, other) {
          var result;

          if (value === undefined && other === undefined) {
            return defaultValue;
          }

          if (value !== undefined) {
            result = value;
          }

          if (other !== undefined) {
            if (result === undefined) {
              return other;
            }

            if (typeof value == 'string' || typeof other == 'string') {
              value = baseToString(value);
              other = baseToString(other);
            } else {
              value = baseToNumber(value);
              other = baseToNumber(other);
            }

            result = operator(value, other);
          }

          return result;
        };
      }
      /**
       * Creates a function like `_.over`.
       *
       * @private
       * @param {Function} arrayFunc The function to iterate over iteratees.
       * @returns {Function} Returns the new over function.
       */


      function createOver(arrayFunc) {
        return flatRest(function (iteratees) {
          iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
          return baseRest(function (args) {
            var thisArg = this;
            return arrayFunc(iteratees, function (iteratee) {
              return apply(iteratee, thisArg, args);
            });
          });
        });
      }
      /**
       * Creates the padding for `string` based on `length`. The `chars` string
       * is truncated if the number of characters exceeds `length`.
       *
       * @private
       * @param {number} length The padding length.
       * @param {string} [chars=' '] The string used as padding.
       * @returns {string} Returns the padding for `string`.
       */


      function createPadding(length, chars) {
        chars = chars === undefined ? ' ' : baseToString(chars);
        var charsLength = chars.length;

        if (charsLength < 2) {
          return charsLength ? baseRepeat(chars, length) : chars;
        }

        var result = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
        return hasUnicode(chars) ? castSlice(stringToArray(result), 0, length).join('') : result.slice(0, length);
      }
      /**
       * Creates a function that wraps `func` to invoke it with the `this` binding
       * of `thisArg` and `partials` prepended to the arguments it receives.
       *
       * @private
       * @param {Function} func The function to wrap.
       * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
       * @param {*} thisArg The `this` binding of `func`.
       * @param {Array} partials The arguments to prepend to those provided to
       *  the new function.
       * @returns {Function} Returns the new wrapped function.
       */


      function createPartial(func, bitmask, thisArg, partials) {
        var isBind = bitmask & WRAP_BIND_FLAG,
            Ctor = createCtor(func);

        function wrapper() {
          var argsIndex = -1,
              argsLength = arguments.length,
              leftIndex = -1,
              leftLength = partials.length,
              args = Array(leftLength + argsLength),
              fn = this && this !== root && this instanceof wrapper ? Ctor : func;

          while (++leftIndex < leftLength) {
            args[leftIndex] = partials[leftIndex];
          }

          while (argsLength--) {
            args[leftIndex++] = arguments[++argsIndex];
          }

          return apply(fn, isBind ? thisArg : this, args);
        }

        return wrapper;
      }
      /**
       * Creates a `_.range` or `_.rangeRight` function.
       *
       * @private
       * @param {boolean} [fromRight] Specify iterating from right to left.
       * @returns {Function} Returns the new range function.
       */


      function createRange(fromRight) {
        return function (start, end, step) {
          if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
            end = step = undefined;
          } // Ensure the sign of `-0` is preserved.


          start = toFinite(start);

          if (end === undefined) {
            end = start;
            start = 0;
          } else {
            end = toFinite(end);
          }

          step = step === undefined ? start < end ? 1 : -1 : toFinite(step);
          return baseRange(start, end, step, fromRight);
        };
      }
      /**
       * Creates a function that performs a relational operation on two values.
       *
       * @private
       * @param {Function} operator The function to perform the operation.
       * @returns {Function} Returns the new relational operation function.
       */


      function createRelationalOperation(operator) {
        return function (value, other) {
          if (!(typeof value == 'string' && typeof other == 'string')) {
            value = toNumber(value);
            other = toNumber(other);
          }

          return operator(value, other);
        };
      }
      /**
       * Creates a function that wraps `func` to continue currying.
       *
       * @private
       * @param {Function} func The function to wrap.
       * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
       * @param {Function} wrapFunc The function to create the `func` wrapper.
       * @param {*} placeholder The placeholder value.
       * @param {*} [thisArg] The `this` binding of `func`.
       * @param {Array} [partials] The arguments to prepend to those provided to
       *  the new function.
       * @param {Array} [holders] The `partials` placeholder indexes.
       * @param {Array} [argPos] The argument positions of the new function.
       * @param {number} [ary] The arity cap of `func`.
       * @param {number} [arity] The arity of `func`.
       * @returns {Function} Returns the new wrapped function.
       */


      function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
        var isCurry = bitmask & WRAP_CURRY_FLAG,
            newHolders = isCurry ? holders : undefined,
            newHoldersRight = isCurry ? undefined : holders,
            newPartials = isCurry ? partials : undefined,
            newPartialsRight = isCurry ? undefined : partials;
        bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
        bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);

        if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
          bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
        }

        var newData = [func, bitmask, thisArg, newPartials, newHolders, newPartialsRight, newHoldersRight, argPos, ary, arity];
        var result = wrapFunc.apply(undefined, newData);

        if (isLaziable(func)) {
          setData(result, newData);
        }

        result.placeholder = placeholder;
        return setWrapToString(result, func, bitmask);
      }
      /**
       * Creates a function like `_.round`.
       *
       * @private
       * @param {string} methodName The name of the `Math` method to use when rounding.
       * @returns {Function} Returns the new round function.
       */


      function createRound(methodName) {
        var func = Math[methodName];
        return function (number, precision) {
          number = toNumber(number);
          precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);

          if (precision && nativeIsFinite(number)) {
            // Shift with exponential notation to avoid floating-point issues.
            // See [MDN](https://mdn.io/round#Examples) for more details.
            var pair = (toString(number) + 'e').split('e'),
                value = func(pair[0] + 'e' + (+pair[1] + precision));
            pair = (toString(value) + 'e').split('e');
            return +(pair[0] + 'e' + (+pair[1] - precision));
          }

          return func(number);
        };
      }
      /**
       * Creates a set object of `values`.
       *
       * @private
       * @param {Array} values The values to add to the set.
       * @returns {Object} Returns the new set.
       */


      var createSet = !(Set && 1 / setToArray(new Set([, -0]))[1] == INFINITY) ? noop : function (values) {
        return new Set(values);
      };
      /**
       * Creates a `_.toPairs` or `_.toPairsIn` function.
       *
       * @private
       * @param {Function} keysFunc The function to get the keys of a given object.
       * @returns {Function} Returns the new pairs function.
       */

      function createToPairs(keysFunc) {
        return function (object) {
          var tag = getTag(object);

          if (tag == mapTag) {
            return mapToArray(object);
          }

          if (tag == setTag) {
            return setToPairs(object);
          }

          return baseToPairs(object, keysFunc(object));
        };
      }
      /**
       * Creates a function that either curries or invokes `func` with optional
       * `this` binding and partially applied arguments.
       *
       * @private
       * @param {Function|string} func The function or method name to wrap.
       * @param {number} bitmask The bitmask flags.
       *    1 - `_.bind`
       *    2 - `_.bindKey`
       *    4 - `_.curry` or `_.curryRight` of a bound function
       *    8 - `_.curry`
       *   16 - `_.curryRight`
       *   32 - `_.partial`
       *   64 - `_.partialRight`
       *  128 - `_.rearg`
       *  256 - `_.ary`
       *  512 - `_.flip`
       * @param {*} [thisArg] The `this` binding of `func`.
       * @param {Array} [partials] The arguments to be partially applied.
       * @param {Array} [holders] The `partials` placeholder indexes.
       * @param {Array} [argPos] The argument positions of the new function.
       * @param {number} [ary] The arity cap of `func`.
       * @param {number} [arity] The arity of `func`.
       * @returns {Function} Returns the new wrapped function.
       */


      function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
        var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;

        if (!isBindKey && typeof func != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }

        var length = partials ? partials.length : 0;

        if (!length) {
          bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
          partials = holders = undefined;
        }

        ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
        arity = arity === undefined ? arity : toInteger(arity);
        length -= holders ? holders.length : 0;

        if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
          var partialsRight = partials,
              holdersRight = holders;
          partials = holders = undefined;
        }

        var data = isBindKey ? undefined : getData(func);
        var newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];

        if (data) {
          mergeData(newData, data);
        }

        func = newData[0];
        bitmask = newData[1];
        thisArg = newData[2];
        partials = newData[3];
        holders = newData[4];
        arity = newData[9] = newData[9] === undefined ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);

        if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
          bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
        }

        if (!bitmask || bitmask == WRAP_BIND_FLAG) {
          var result = createBind(func, bitmask, thisArg);
        } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
          result = createCurry(func, bitmask, arity);
        } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
          result = createPartial(func, bitmask, thisArg, partials);
        } else {
          result = createHybrid.apply(undefined, newData);
        }

        var setter = data ? baseSetData : setData;
        return setWrapToString(setter(result, newData), func, bitmask);
      }
      /**
       * Used by `_.defaults` to customize its `_.assignIn` use to assign properties
       * of source objects to the destination object for all destination properties
       * that resolve to `undefined`.
       *
       * @private
       * @param {*} objValue The destination value.
       * @param {*} srcValue The source value.
       * @param {string} key The key of the property to assign.
       * @param {Object} object The parent object of `objValue`.
       * @returns {*} Returns the value to assign.
       */


      function customDefaultsAssignIn(objValue, srcValue, key, object) {
        if (objValue === undefined || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
          return srcValue;
        }

        return objValue;
      }
      /**
       * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
       * objects into destination objects that are passed thru.
       *
       * @private
       * @param {*} objValue The destination value.
       * @param {*} srcValue The source value.
       * @param {string} key The key of the property to merge.
       * @param {Object} object The parent object of `objValue`.
       * @param {Object} source The parent object of `srcValue`.
       * @param {Object} [stack] Tracks traversed source values and their merged
       *  counterparts.
       * @returns {*} Returns the value to assign.
       */


      function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
        if (isObject(objValue) && isObject(srcValue)) {
          // Recursively merge objects and arrays (susceptible to call stack limits).
          stack.set(srcValue, objValue);
          baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
          stack['delete'](srcValue);
        }

        return objValue;
      }
      /**
       * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
       * objects.
       *
       * @private
       * @param {*} value The value to inspect.
       * @param {string} key The key of the property to inspect.
       * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
       */


      function customOmitClone(value) {
        return isPlainObject(value) ? undefined : value;
      }
      /**
       * A specialized version of `baseIsEqualDeep` for arrays with support for
       * partial deep comparisons.
       *
       * @private
       * @param {Array} array The array to compare.
       * @param {Array} other The other array to compare.
       * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
       * @param {Function} customizer The function to customize comparisons.
       * @param {Function} equalFunc The function to determine equivalents of values.
       * @param {Object} stack Tracks traversed `array` and `other` objects.
       * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
       */


      function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
            arrLength = array.length,
            othLength = other.length;

        if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
          return false;
        } // Assume cyclic values are equal.


        var stacked = stack.get(array);

        if (stacked && stack.get(other)) {
          return stacked == other;
        }

        var index = -1,
            result = true,
            seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined;
        stack.set(array, other);
        stack.set(other, array); // Ignore non-index properties.

        while (++index < arrLength) {
          var arrValue = array[index],
              othValue = other[index];

          if (customizer) {
            var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
          }

          if (compared !== undefined) {
            if (compared) {
              continue;
            }

            result = false;
            break;
          } // Recursively compare arrays (susceptible to call stack limits).


          if (seen) {
            if (!arraySome(other, function (othValue, othIndex) {
              if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                return seen.push(othIndex);
              }
            })) {
              result = false;
              break;
            }
          } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
            result = false;
            break;
          }
        }

        stack['delete'](array);
        stack['delete'](other);
        return result;
      }
      /**
       * A specialized version of `baseIsEqualDeep` for comparing objects of
       * the same `toStringTag`.
       *
       * **Note:** This function only supports comparing values with tags of
       * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
       *
       * @private
       * @param {Object} object The object to compare.
       * @param {Object} other The other object to compare.
       * @param {string} tag The `toStringTag` of the objects to compare.
       * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
       * @param {Function} customizer The function to customize comparisons.
       * @param {Function} equalFunc The function to determine equivalents of values.
       * @param {Object} stack Tracks traversed `object` and `other` objects.
       * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
       */


      function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
        switch (tag) {
          case dataViewTag:
            if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
              return false;
            }

            object = object.buffer;
            other = other.buffer;

          case arrayBufferTag:
            if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
              return false;
            }

            return true;

          case boolTag:
          case dateTag:
          case numberTag:
            // Coerce booleans to `1` or `0` and dates to milliseconds.
            // Invalid dates are coerced to `NaN`.
            return eq(+object, +other);

          case errorTag:
            return object.name == other.name && object.message == other.message;

          case regexpTag:
          case stringTag:
            // Coerce regexes to strings and treat strings, primitives and objects,
            // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
            // for more details.
            return object == other + '';

          case mapTag:
            var convert = mapToArray;

          case setTag:
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
            convert || (convert = setToArray);

            if (object.size != other.size && !isPartial) {
              return false;
            } // Assume cyclic values are equal.


            var stacked = stack.get(object);

            if (stacked) {
              return stacked == other;
            }

            bitmask |= COMPARE_UNORDERED_FLAG; // Recursively compare objects (susceptible to call stack limits).

            stack.set(object, other);
            var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
            stack['delete'](object);
            return result;

          case symbolTag:
            if (symbolValueOf) {
              return symbolValueOf.call(object) == symbolValueOf.call(other);
            }

        }

        return false;
      }
      /**
       * A specialized version of `baseIsEqualDeep` for objects with support for
       * partial deep comparisons.
       *
       * @private
       * @param {Object} object The object to compare.
       * @param {Object} other The other object to compare.
       * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
       * @param {Function} customizer The function to customize comparisons.
       * @param {Function} equalFunc The function to determine equivalents of values.
       * @param {Object} stack Tracks traversed `object` and `other` objects.
       * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
       */


      function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
            objProps = getAllKeys(object),
            objLength = objProps.length,
            othProps = getAllKeys(other),
            othLength = othProps.length;

        if (objLength != othLength && !isPartial) {
          return false;
        }

        var index = objLength;

        while (index--) {
          var key = objProps[index];

          if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
            return false;
          }
        } // Assume cyclic values are equal.


        var stacked = stack.get(object);

        if (stacked && stack.get(other)) {
          return stacked == other;
        }

        var result = true;
        stack.set(object, other);
        stack.set(other, object);
        var skipCtor = isPartial;

        while (++index < objLength) {
          key = objProps[index];
          var objValue = object[key],
              othValue = other[key];

          if (customizer) {
            var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
          } // Recursively compare objects (susceptible to call stack limits).


          if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
            result = false;
            break;
          }

          skipCtor || (skipCtor = key == 'constructor');
        }

        if (result && !skipCtor) {
          var objCtor = object.constructor,
              othCtor = other.constructor; // Non `Object` object instances with different constructors are not equal.

          if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
            result = false;
          }
        }

        stack['delete'](object);
        stack['delete'](other);
        return result;
      }
      /**
       * A specialized version of `baseRest` which flattens the rest array.
       *
       * @private
       * @param {Function} func The function to apply a rest parameter to.
       * @returns {Function} Returns the new function.
       */


      function flatRest(func) {
        return setToString(overRest(func, undefined, flatten), func + '');
      }
      /**
       * Creates an array of own enumerable property names and symbols of `object`.
       *
       * @private
       * @param {Object} object The object to query.
       * @returns {Array} Returns the array of property names and symbols.
       */


      function getAllKeys(object) {
        return baseGetAllKeys(object, keys, getSymbols);
      }
      /**
       * Creates an array of own and inherited enumerable property names and
       * symbols of `object`.
       *
       * @private
       * @param {Object} object The object to query.
       * @returns {Array} Returns the array of property names and symbols.
       */


      function getAllKeysIn(object) {
        return baseGetAllKeys(object, keysIn, getSymbolsIn);
      }
      /**
       * Gets metadata for `func`.
       *
       * @private
       * @param {Function} func The function to query.
       * @returns {*} Returns the metadata for `func`.
       */


      var getData = !metaMap ? noop : function (func) {
        return metaMap.get(func);
      };
      /**
       * Gets the name of `func`.
       *
       * @private
       * @param {Function} func The function to query.
       * @returns {string} Returns the function name.
       */

      function getFuncName(func) {
        var result = func.name + '',
            array = realNames[result],
            length = hasOwnProperty.call(realNames, result) ? array.length : 0;

        while (length--) {
          var data = array[length],
              otherFunc = data.func;

          if (otherFunc == null || otherFunc == func) {
            return data.name;
          }
        }

        return result;
      }
      /**
       * Gets the argument placeholder value for `func`.
       *
       * @private
       * @param {Function} func The function to inspect.
       * @returns {*} Returns the placeholder value.
       */


      function getHolder(func) {
        var object = hasOwnProperty.call(lodash, 'placeholder') ? lodash : func;
        return object.placeholder;
      }
      /**
       * Gets the appropriate "iteratee" function. If `_.iteratee` is customized,
       * this function returns the custom method, otherwise it returns `baseIteratee`.
       * If arguments are provided, the chosen function is invoked with them and
       * its result is returned.
       *
       * @private
       * @param {*} [value] The value to convert to an iteratee.
       * @param {number} [arity] The arity of the created iteratee.
       * @returns {Function} Returns the chosen function or its result.
       */


      function getIteratee() {
        var result = lodash.iteratee || iteratee;
        result = result === iteratee ? baseIteratee : result;
        return arguments.length ? result(arguments[0], arguments[1]) : result;
      }
      /**
       * Gets the data for `map`.
       *
       * @private
       * @param {Object} map The map to query.
       * @param {string} key The reference key.
       * @returns {*} Returns the map data.
       */


      function getMapData(map, key) {
        var data = map.__data__;
        return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
      }
      /**
       * Gets the property names, values, and compare flags of `object`.
       *
       * @private
       * @param {Object} object The object to query.
       * @returns {Array} Returns the match data of `object`.
       */


      function getMatchData(object) {
        var result = keys(object),
            length = result.length;

        while (length--) {
          var key = result[length],
              value = object[key];
          result[length] = [key, value, isStrictComparable(value)];
        }

        return result;
      }
      /**
       * Gets the native function at `key` of `object`.
       *
       * @private
       * @param {Object} object The object to query.
       * @param {string} key The key of the method to get.
       * @returns {*} Returns the function if it's native, else `undefined`.
       */


      function getNative(object, key) {
        var value = getValue(object, key);
        return baseIsNative(value) ? value : undefined;
      }
      /**
       * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
       *
       * @private
       * @param {*} value The value to query.
       * @returns {string} Returns the raw `toStringTag`.
       */


      function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag),
            tag = value[symToStringTag];

        try {
          value[symToStringTag] = undefined;
          var unmasked = true;
        } catch (e) {}

        var result = nativeObjectToString.call(value);

        if (unmasked) {
          if (isOwn) {
            value[symToStringTag] = tag;
          } else {
            delete value[symToStringTag];
          }
        }

        return result;
      }
      /**
       * Creates an array of the own enumerable symbols of `object`.
       *
       * @private
       * @param {Object} object The object to query.
       * @returns {Array} Returns the array of symbols.
       */


      var getSymbols = !nativeGetSymbols ? stubArray : function (object) {
        if (object == null) {
          return [];
        }

        object = Object(object);
        return arrayFilter(nativeGetSymbols(object), function (symbol) {
          return propertyIsEnumerable.call(object, symbol);
        });
      };
      /**
       * Creates an array of the own and inherited enumerable symbols of `object`.
       *
       * @private
       * @param {Object} object The object to query.
       * @returns {Array} Returns the array of symbols.
       */

      var getSymbolsIn = !nativeGetSymbols ? stubArray : function (object) {
        var result = [];

        while (object) {
          arrayPush(result, getSymbols(object));
          object = getPrototype(object);
        }

        return result;
      };
      /**
       * Gets the `toStringTag` of `value`.
       *
       * @private
       * @param {*} value The value to query.
       * @returns {string} Returns the `toStringTag`.
       */

      var getTag = baseGetTag; // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.

      if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
        getTag = function (value) {
          var result = baseGetTag(value),
              Ctor = result == objectTag ? value.constructor : undefined,
              ctorString = Ctor ? toSource(Ctor) : '';

          if (ctorString) {
            switch (ctorString) {
              case dataViewCtorString:
                return dataViewTag;

              case mapCtorString:
                return mapTag;

              case promiseCtorString:
                return promiseTag;

              case setCtorString:
                return setTag;

              case weakMapCtorString:
                return weakMapTag;
            }
          }

          return result;
        };
      }
      /**
       * Gets the view, applying any `transforms` to the `start` and `end` positions.
       *
       * @private
       * @param {number} start The start of the view.
       * @param {number} end The end of the view.
       * @param {Array} transforms The transformations to apply to the view.
       * @returns {Object} Returns an object containing the `start` and `end`
       *  positions of the view.
       */


      function getView(start, end, transforms) {
        var index = -1,
            length = transforms.length;

        while (++index < length) {
          var data = transforms[index],
              size = data.size;

          switch (data.type) {
            case 'drop':
              start += size;
              break;

            case 'dropRight':
              end -= size;
              break;

            case 'take':
              end = nativeMin(end, start + size);
              break;

            case 'takeRight':
              start = nativeMax(start, end - size);
              break;
          }
        }

        return {
          'start': start,
          'end': end
        };
      }
      /**
       * Extracts wrapper details from the `source` body comment.
       *
       * @private
       * @param {string} source The source to inspect.
       * @returns {Array} Returns the wrapper details.
       */


      function getWrapDetails(source) {
        var match = source.match(reWrapDetails);
        return match ? match[1].split(reSplitDetails) : [];
      }
      /**
       * Checks if `path` exists on `object`.
       *
       * @private
       * @param {Object} object The object to query.
       * @param {Array|string} path The path to check.
       * @param {Function} hasFunc The function to check properties.
       * @returns {boolean} Returns `true` if `path` exists, else `false`.
       */


      function hasPath(object, path, hasFunc) {
        path = castPath(path, object);
        var index = -1,
            length = path.length,
            result = false;

        while (++index < length) {
          var key = toKey(path[index]);

          if (!(result = object != null && hasFunc(object, key))) {
            break;
          }

          object = object[key];
        }

        if (result || ++index != length) {
          return result;
        }

        length = object == null ? 0 : object.length;
        return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
      }
      /**
       * Initializes an array clone.
       *
       * @private
       * @param {Array} array The array to clone.
       * @returns {Array} Returns the initialized clone.
       */


      function initCloneArray(array) {
        var length = array.length,
            result = new array.constructor(length); // Add properties assigned by `RegExp#exec`.

        if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
          result.index = array.index;
          result.input = array.input;
        }

        return result;
      }
      /**
       * Initializes an object clone.
       *
       * @private
       * @param {Object} object The object to clone.
       * @returns {Object} Returns the initialized clone.
       */


      function initCloneObject(object) {
        return typeof object.constructor == 'function' && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
      }
      /**
       * Initializes an object clone based on its `toStringTag`.
       *
       * **Note:** This function only supports cloning values with tags of
       * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
       *
       * @private
       * @param {Object} object The object to clone.
       * @param {string} tag The `toStringTag` of the object to clone.
       * @param {boolean} [isDeep] Specify a deep clone.
       * @returns {Object} Returns the initialized clone.
       */


      function initCloneByTag(object, tag, isDeep) {
        var Ctor = object.constructor;

        switch (tag) {
          case arrayBufferTag:
            return cloneArrayBuffer(object);

          case boolTag:
          case dateTag:
            return new Ctor(+object);

          case dataViewTag:
            return cloneDataView(object, isDeep);

          case float32Tag:
          case float64Tag:
          case int8Tag:
          case int16Tag:
          case int32Tag:
          case uint8Tag:
          case uint8ClampedTag:
          case uint16Tag:
          case uint32Tag:
            return cloneTypedArray(object, isDeep);

          case mapTag:
            return new Ctor();

          case numberTag:
          case stringTag:
            return new Ctor(object);

          case regexpTag:
            return cloneRegExp(object);

          case setTag:
            return new Ctor();

          case symbolTag:
            return cloneSymbol(object);
        }
      }
      /**
       * Inserts wrapper `details` in a comment at the top of the `source` body.
       *
       * @private
       * @param {string} source The source to modify.
       * @returns {Array} details The details to insert.
       * @returns {string} Returns the modified source.
       */


      function insertWrapDetails(source, details) {
        var length = details.length;

        if (!length) {
          return source;
        }

        var lastIndex = length - 1;
        details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
        details = details.join(length > 2 ? ', ' : ' ');
        return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
      }
      /**
       * Checks if `value` is a flattenable `arguments` object or array.
       *
       * @private
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
       */


      function isFlattenable(value) {
        return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
      }
      /**
       * Checks if `value` is a valid array-like index.
       *
       * @private
       * @param {*} value The value to check.
       * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
       * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
       */


      function isIndex(value, length) {
        var type = typeof value;
        length = length == null ? MAX_SAFE_INTEGER : length;
        return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
      }
      /**
       * Checks if the given arguments are from an iteratee call.
       *
       * @private
       * @param {*} value The potential iteratee value argument.
       * @param {*} index The potential iteratee index or key argument.
       * @param {*} object The potential iteratee object argument.
       * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
       *  else `false`.
       */


      function isIterateeCall(value, index, object) {
        if (!isObject(object)) {
          return false;
        }

        var type = typeof index;

        if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
          return eq(object[index], value);
        }

        return false;
      }
      /**
       * Checks if `value` is a property name and not a property path.
       *
       * @private
       * @param {*} value The value to check.
       * @param {Object} [object] The object to query keys on.
       * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
       */


      function isKey(value, object) {
        if (isArray(value)) {
          return false;
        }

        var type = typeof value;

        if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
          return true;
        }

        return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
      }
      /**
       * Checks if `value` is suitable for use as unique object key.
       *
       * @private
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
       */


      function isKeyable(value) {
        var type = typeof value;
        return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
      }
      /**
       * Checks if `func` has a lazy counterpart.
       *
       * @private
       * @param {Function} func The function to check.
       * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
       *  else `false`.
       */


      function isLaziable(func) {
        var funcName = getFuncName(func),
            other = lodash[funcName];

        if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
          return false;
        }

        if (func === other) {
          return true;
        }

        var data = getData(other);
        return !!data && func === data[0];
      }
      /**
       * Checks if `func` has its source masked.
       *
       * @private
       * @param {Function} func The function to check.
       * @returns {boolean} Returns `true` if `func` is masked, else `false`.
       */


      function isMasked(func) {
        return !!maskSrcKey && maskSrcKey in func;
      }
      /**
       * Checks if `func` is capable of being masked.
       *
       * @private
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `func` is maskable, else `false`.
       */


      var isMaskable = coreJsData ? isFunction : stubFalse;
      /**
       * Checks if `value` is likely a prototype object.
       *
       * @private
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
       */

      function isPrototype(value) {
        var Ctor = value && value.constructor,
            proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;
        return value === proto;
      }
      /**
       * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
       *
       * @private
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` if suitable for strict
       *  equality comparisons, else `false`.
       */


      function isStrictComparable(value) {
        return value === value && !isObject(value);
      }
      /**
       * A specialized version of `matchesProperty` for source values suitable
       * for strict equality comparisons, i.e. `===`.
       *
       * @private
       * @param {string} key The key of the property to get.
       * @param {*} srcValue The value to match.
       * @returns {Function} Returns the new spec function.
       */


      function matchesStrictComparable(key, srcValue) {
        return function (object) {
          if (object == null) {
            return false;
          }

          return object[key] === srcValue && (srcValue !== undefined || key in Object(object));
        };
      }
      /**
       * A specialized version of `_.memoize` which clears the memoized function's
       * cache when it exceeds `MAX_MEMOIZE_SIZE`.
       *
       * @private
       * @param {Function} func The function to have its output memoized.
       * @returns {Function} Returns the new memoized function.
       */


      function memoizeCapped(func) {
        var result = memoize(func, function (key) {
          if (cache.size === MAX_MEMOIZE_SIZE) {
            cache.clear();
          }

          return key;
        });
        var cache = result.cache;
        return result;
      }
      /**
       * Merges the function metadata of `source` into `data`.
       *
       * Merging metadata reduces the number of wrappers used to invoke a function.
       * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
       * may be applied regardless of execution order. Methods like `_.ary` and
       * `_.rearg` modify function arguments, making the order in which they are
       * executed important, preventing the merging of metadata. However, we make
       * an exception for a safe combined case where curried functions have `_.ary`
       * and or `_.rearg` applied.
       *
       * @private
       * @param {Array} data The destination metadata.
       * @param {Array} source The source metadata.
       * @returns {Array} Returns `data`.
       */


      function mergeData(data, source) {
        var bitmask = data[1],
            srcBitmask = source[1],
            newBitmask = bitmask | srcBitmask,
            isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
        var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG; // Exit early if metadata can't be merged.

        if (!(isCommon || isCombo)) {
          return data;
        } // Use source `thisArg` if available.


        if (srcBitmask & WRAP_BIND_FLAG) {
          data[2] = source[2]; // Set when currying a bound function.

          newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
        } // Compose partial arguments.


        var value = source[3];

        if (value) {
          var partials = data[3];
          data[3] = partials ? composeArgs(partials, value, source[4]) : value;
          data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
        } // Compose partial right arguments.


        value = source[5];

        if (value) {
          partials = data[5];
          data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
          data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
        } // Use source `argPos` if available.


        value = source[7];

        if (value) {
          data[7] = value;
        } // Use source `ary` if it's smaller.


        if (srcBitmask & WRAP_ARY_FLAG) {
          data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
        } // Use source `arity` if one is not provided.


        if (data[9] == null) {
          data[9] = source[9];
        } // Use source `func` and merge bitmasks.


        data[0] = source[0];
        data[1] = newBitmask;
        return data;
      }
      /**
       * This function is like
       * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
       * except that it includes inherited enumerable properties.
       *
       * @private
       * @param {Object} object The object to query.
       * @returns {Array} Returns the array of property names.
       */


      function nativeKeysIn(object) {
        var result = [];

        if (object != null) {
          for (var key in Object(object)) {
            result.push(key);
          }
        }

        return result;
      }
      /**
       * Converts `value` to a string using `Object.prototype.toString`.
       *
       * @private
       * @param {*} value The value to convert.
       * @returns {string} Returns the converted string.
       */


      function objectToString(value) {
        return nativeObjectToString.call(value);
      }
      /**
       * A specialized version of `baseRest` which transforms the rest array.
       *
       * @private
       * @param {Function} func The function to apply a rest parameter to.
       * @param {number} [start=func.length-1] The start position of the rest parameter.
       * @param {Function} transform The rest array transform.
       * @returns {Function} Returns the new function.
       */


      function overRest(func, start, transform) {
        start = nativeMax(start === undefined ? func.length - 1 : start, 0);
        return function () {
          var args = arguments,
              index = -1,
              length = nativeMax(args.length - start, 0),
              array = Array(length);

          while (++index < length) {
            array[index] = args[start + index];
          }

          index = -1;
          var otherArgs = Array(start + 1);

          while (++index < start) {
            otherArgs[index] = args[index];
          }

          otherArgs[start] = transform(array);
          return apply(func, this, otherArgs);
        };
      }
      /**
       * Gets the parent value at `path` of `object`.
       *
       * @private
       * @param {Object} object The object to query.
       * @param {Array} path The path to get the parent value of.
       * @returns {*} Returns the parent value.
       */


      function parent(object, path) {
        return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
      }
      /**
       * Reorder `array` according to the specified indexes where the element at
       * the first index is assigned as the first element, the element at
       * the second index is assigned as the second element, and so on.
       *
       * @private
       * @param {Array} array The array to reorder.
       * @param {Array} indexes The arranged array indexes.
       * @returns {Array} Returns `array`.
       */


      function reorder(array, indexes) {
        var arrLength = array.length,
            length = nativeMin(indexes.length, arrLength),
            oldArray = copyArray(array);

        while (length--) {
          var index = indexes[length];
          array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
        }

        return array;
      }
      /**
       * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
       *
       * @private
       * @param {Object} object The object to query.
       * @param {string} key The key of the property to get.
       * @returns {*} Returns the property value.
       */


      function safeGet(object, key) {
        if (key === 'constructor' && typeof object[key] === 'function') {
          return;
        }

        if (key == '__proto__') {
          return;
        }

        return object[key];
      }
      /**
       * Sets metadata for `func`.
       *
       * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
       * period of time, it will trip its breaker and transition to an identity
       * function to avoid garbage collection pauses in V8. See
       * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
       * for more details.
       *
       * @private
       * @param {Function} func The function to associate metadata with.
       * @param {*} data The metadata.
       * @returns {Function} Returns `func`.
       */


      var setData = shortOut(baseSetData);
      /**
       * A simple wrapper around the global [`setTimeout`](https://mdn.io/setTimeout).
       *
       * @private
       * @param {Function} func The function to delay.
       * @param {number} wait The number of milliseconds to delay invocation.
       * @returns {number|Object} Returns the timer id or timeout object.
       */

      var setTimeout = ctxSetTimeout || function (func, wait) {
        return root.setTimeout(func, wait);
      };
      /**
       * Sets the `toString` method of `func` to return `string`.
       *
       * @private
       * @param {Function} func The function to modify.
       * @param {Function} string The `toString` result.
       * @returns {Function} Returns `func`.
       */


      var setToString = shortOut(baseSetToString);
      /**
       * Sets the `toString` method of `wrapper` to mimic the source of `reference`
       * with wrapper details in a comment at the top of the source body.
       *
       * @private
       * @param {Function} wrapper The function to modify.
       * @param {Function} reference The reference function.
       * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
       * @returns {Function} Returns `wrapper`.
       */

      function setWrapToString(wrapper, reference, bitmask) {
        var source = reference + '';
        return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
      }
      /**
       * Creates a function that'll short out and invoke `identity` instead
       * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
       * milliseconds.
       *
       * @private
       * @param {Function} func The function to restrict.
       * @returns {Function} Returns the new shortable function.
       */


      function shortOut(func) {
        var count = 0,
            lastCalled = 0;
        return function () {
          var stamp = nativeNow(),
              remaining = HOT_SPAN - (stamp - lastCalled);
          lastCalled = stamp;

          if (remaining > 0) {
            if (++count >= HOT_COUNT) {
              return arguments[0];
            }
          } else {
            count = 0;
          }

          return func.apply(undefined, arguments);
        };
      }
      /**
       * A specialized version of `_.shuffle` which mutates and sets the size of `array`.
       *
       * @private
       * @param {Array} array The array to shuffle.
       * @param {number} [size=array.length] The size of `array`.
       * @returns {Array} Returns `array`.
       */


      function shuffleSelf(array, size) {
        var index = -1,
            length = array.length,
            lastIndex = length - 1;
        size = size === undefined ? length : size;

        while (++index < size) {
          var rand = baseRandom(index, lastIndex),
              value = array[rand];
          array[rand] = array[index];
          array[index] = value;
        }

        array.length = size;
        return array;
      }
      /**
       * Converts `string` to a property path array.
       *
       * @private
       * @param {string} string The string to convert.
       * @returns {Array} Returns the property path array.
       */


      var stringToPath = memoizeCapped(function (string) {
        var result = [];

        if (string.charCodeAt(0) === 46
        /* . */
        ) {
            result.push('');
          }

        string.replace(rePropName, function (match, number, quote, subString) {
          result.push(quote ? subString.replace(reEscapeChar, '$1') : number || match);
        });
        return result;
      });
      /**
       * Converts `value` to a string key if it's not a string or symbol.
       *
       * @private
       * @param {*} value The value to inspect.
       * @returns {string|symbol} Returns the key.
       */

      function toKey(value) {
        if (typeof value == 'string' || isSymbol(value)) {
          return value;
        }

        var result = value + '';
        return result == '0' && 1 / value == -INFINITY ? '-0' : result;
      }
      /**
       * Converts `func` to its source code.
       *
       * @private
       * @param {Function} func The function to convert.
       * @returns {string} Returns the source code.
       */


      function toSource(func) {
        if (func != null) {
          try {
            return funcToString.call(func);
          } catch (e) {}

          try {
            return func + '';
          } catch (e) {}
        }

        return '';
      }
      /**
       * Updates wrapper `details` based on `bitmask` flags.
       *
       * @private
       * @returns {Array} details The details to modify.
       * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
       * @returns {Array} Returns `details`.
       */


      function updateWrapDetails(details, bitmask) {
        arrayEach(wrapFlags, function (pair) {
          var value = '_.' + pair[0];

          if (bitmask & pair[1] && !arrayIncludes(details, value)) {
            details.push(value);
          }
        });
        return details.sort();
      }
      /**
       * Creates a clone of `wrapper`.
       *
       * @private
       * @param {Object} wrapper The wrapper to clone.
       * @returns {Object} Returns the cloned wrapper.
       */


      function wrapperClone(wrapper) {
        if (wrapper instanceof LazyWrapper) {
          return wrapper.clone();
        }

        var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
        result.__actions__ = copyArray(wrapper.__actions__);
        result.__index__ = wrapper.__index__;
        result.__values__ = wrapper.__values__;
        return result;
      }
      /*------------------------------------------------------------------------*/

      /**
       * Creates an array of elements split into groups the length of `size`.
       * If `array` can't be split evenly, the final chunk will be the remaining
       * elements.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Array
       * @param {Array} array The array to process.
       * @param {number} [size=1] The length of each chunk
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {Array} Returns the new array of chunks.
       * @example
       *
       * _.chunk(['a', 'b', 'c', 'd'], 2);
       * // => [['a', 'b'], ['c', 'd']]
       *
       * _.chunk(['a', 'b', 'c', 'd'], 3);
       * // => [['a', 'b', 'c'], ['d']]
       */


      function chunk(array, size, guard) {
        if (guard ? isIterateeCall(array, size, guard) : size === undefined) {
          size = 1;
        } else {
          size = nativeMax(toInteger(size), 0);
        }

        var length = array == null ? 0 : array.length;

        if (!length || size < 1) {
          return [];
        }

        var index = 0,
            resIndex = 0,
            result = Array(nativeCeil(length / size));

        while (index < length) {
          result[resIndex++] = baseSlice(array, index, index += size);
        }

        return result;
      }
      /**
       * Creates an array with all falsey values removed. The values `false`, `null`,
       * `0`, `""`, `undefined`, and `NaN` are falsey.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Array
       * @param {Array} array The array to compact.
       * @returns {Array} Returns the new array of filtered values.
       * @example
       *
       * _.compact([0, 1, false, 2, '', 3]);
       * // => [1, 2, 3]
       */


      function compact(array) {
        var index = -1,
            length = array == null ? 0 : array.length,
            resIndex = 0,
            result = [];

        while (++index < length) {
          var value = array[index];

          if (value) {
            result[resIndex++] = value;
          }
        }

        return result;
      }
      /**
       * Creates a new array concatenating `array` with any additional arrays
       * and/or values.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} array The array to concatenate.
       * @param {...*} [values] The values to concatenate.
       * @returns {Array} Returns the new concatenated array.
       * @example
       *
       * var array = [1];
       * var other = _.concat(array, 2, [3], [[4]]);
       *
       * console.log(other);
       * // => [1, 2, 3, [4]]
       *
       * console.log(array);
       * // => [1]
       */


      function concat() {
        var length = arguments.length;

        if (!length) {
          return [];
        }

        var args = Array(length - 1),
            array = arguments[0],
            index = length;

        while (index--) {
          args[index - 1] = arguments[index];
        }

        return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
      }
      /**
       * Creates an array of `array` values not included in the other given arrays
       * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
       * for equality comparisons. The order and references of result values are
       * determined by the first array.
       *
       * **Note:** Unlike `_.pullAll`, this method returns a new array.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Array
       * @param {Array} array The array to inspect.
       * @param {...Array} [values] The values to exclude.
       * @returns {Array} Returns the new array of filtered values.
       * @see _.without, _.xor
       * @example
       *
       * _.difference([2, 1], [2, 3]);
       * // => [1]
       */


      var difference = baseRest(function (array, values) {
        return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true)) : [];
      });
      /**
       * This method is like `_.difference` except that it accepts `iteratee` which
       * is invoked for each element of `array` and `values` to generate the criterion
       * by which they're compared. The order and references of result values are
       * determined by the first array. The iteratee is invoked with one argument:
       * (value).
       *
       * **Note:** Unlike `_.pullAllBy`, this method returns a new array.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} array The array to inspect.
       * @param {...Array} [values] The values to exclude.
       * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
       * @returns {Array} Returns the new array of filtered values.
       * @example
       *
       * _.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
       * // => [1.2]
       *
       * // The `_.property` iteratee shorthand.
       * _.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
       * // => [{ 'x': 2 }]
       */

      var differenceBy = baseRest(function (array, values) {
        var iteratee = last(values);

        if (isArrayLikeObject(iteratee)) {
          iteratee = undefined;
        }

        return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), getIteratee(iteratee, 2)) : [];
      });
      /**
       * This method is like `_.difference` except that it accepts `comparator`
       * which is invoked to compare elements of `array` to `values`. The order and
       * references of result values are determined by the first array. The comparator
       * is invoked with two arguments: (arrVal, othVal).
       *
       * **Note:** Unlike `_.pullAllWith`, this method returns a new array.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} array The array to inspect.
       * @param {...Array} [values] The values to exclude.
       * @param {Function} [comparator] The comparator invoked per element.
       * @returns {Array} Returns the new array of filtered values.
       * @example
       *
       * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
       *
       * _.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
       * // => [{ 'x': 2, 'y': 1 }]
       */

      var differenceWith = baseRest(function (array, values) {
        var comparator = last(values);

        if (isArrayLikeObject(comparator)) {
          comparator = undefined;
        }

        return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), undefined, comparator) : [];
      });
      /**
       * Creates a slice of `array` with `n` elements dropped from the beginning.
       *
       * @static
       * @memberOf _
       * @since 0.5.0
       * @category Array
       * @param {Array} array The array to query.
       * @param {number} [n=1] The number of elements to drop.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {Array} Returns the slice of `array`.
       * @example
       *
       * _.drop([1, 2, 3]);
       * // => [2, 3]
       *
       * _.drop([1, 2, 3], 2);
       * // => [3]
       *
       * _.drop([1, 2, 3], 5);
       * // => []
       *
       * _.drop([1, 2, 3], 0);
       * // => [1, 2, 3]
       */

      function drop(array, n, guard) {
        var length = array == null ? 0 : array.length;

        if (!length) {
          return [];
        }

        n = guard || n === undefined ? 1 : toInteger(n);
        return baseSlice(array, n < 0 ? 0 : n, length);
      }
      /**
       * Creates a slice of `array` with `n` elements dropped from the end.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Array
       * @param {Array} array The array to query.
       * @param {number} [n=1] The number of elements to drop.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {Array} Returns the slice of `array`.
       * @example
       *
       * _.dropRight([1, 2, 3]);
       * // => [1, 2]
       *
       * _.dropRight([1, 2, 3], 2);
       * // => [1]
       *
       * _.dropRight([1, 2, 3], 5);
       * // => []
       *
       * _.dropRight([1, 2, 3], 0);
       * // => [1, 2, 3]
       */


      function dropRight(array, n, guard) {
        var length = array == null ? 0 : array.length;

        if (!length) {
          return [];
        }

        n = guard || n === undefined ? 1 : toInteger(n);
        n = length - n;
        return baseSlice(array, 0, n < 0 ? 0 : n);
      }
      /**
       * Creates a slice of `array` excluding elements dropped from the end.
       * Elements are dropped until `predicate` returns falsey. The predicate is
       * invoked with three arguments: (value, index, array).
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Array
       * @param {Array} array The array to query.
       * @param {Function} [predicate=_.identity] The function invoked per iteration.
       * @returns {Array} Returns the slice of `array`.
       * @example
       *
       * var users = [
       *   { 'user': 'barney',  'active': true },
       *   { 'user': 'fred',    'active': false },
       *   { 'user': 'pebbles', 'active': false }
       * ];
       *
       * _.dropRightWhile(users, function(o) { return !o.active; });
       * // => objects for ['barney']
       *
       * // The `_.matches` iteratee shorthand.
       * _.dropRightWhile(users, { 'user': 'pebbles', 'active': false });
       * // => objects for ['barney', 'fred']
       *
       * // The `_.matchesProperty` iteratee shorthand.
       * _.dropRightWhile(users, ['active', false]);
       * // => objects for ['barney']
       *
       * // The `_.property` iteratee shorthand.
       * _.dropRightWhile(users, 'active');
       * // => objects for ['barney', 'fred', 'pebbles']
       */


      function dropRightWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
      }
      /**
       * Creates a slice of `array` excluding elements dropped from the beginning.
       * Elements are dropped until `predicate` returns falsey. The predicate is
       * invoked with three arguments: (value, index, array).
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Array
       * @param {Array} array The array to query.
       * @param {Function} [predicate=_.identity] The function invoked per iteration.
       * @returns {Array} Returns the slice of `array`.
       * @example
       *
       * var users = [
       *   { 'user': 'barney',  'active': false },
       *   { 'user': 'fred',    'active': false },
       *   { 'user': 'pebbles', 'active': true }
       * ];
       *
       * _.dropWhile(users, function(o) { return !o.active; });
       * // => objects for ['pebbles']
       *
       * // The `_.matches` iteratee shorthand.
       * _.dropWhile(users, { 'user': 'barney', 'active': false });
       * // => objects for ['fred', 'pebbles']
       *
       * // The `_.matchesProperty` iteratee shorthand.
       * _.dropWhile(users, ['active', false]);
       * // => objects for ['pebbles']
       *
       * // The `_.property` iteratee shorthand.
       * _.dropWhile(users, 'active');
       * // => objects for ['barney', 'fred', 'pebbles']
       */


      function dropWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
      }
      /**
       * Fills elements of `array` with `value` from `start` up to, but not
       * including, `end`.
       *
       * **Note:** This method mutates `array`.
       *
       * @static
       * @memberOf _
       * @since 3.2.0
       * @category Array
       * @param {Array} array The array to fill.
       * @param {*} value The value to fill `array` with.
       * @param {number} [start=0] The start position.
       * @param {number} [end=array.length] The end position.
       * @returns {Array} Returns `array`.
       * @example
       *
       * var array = [1, 2, 3];
       *
       * _.fill(array, 'a');
       * console.log(array);
       * // => ['a', 'a', 'a']
       *
       * _.fill(Array(3), 2);
       * // => [2, 2, 2]
       *
       * _.fill([4, 6, 8, 10], '*', 1, 3);
       * // => [4, '*', '*', 10]
       */


      function fill(array, value, start, end) {
        var length = array == null ? 0 : array.length;

        if (!length) {
          return [];
        }

        if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
          start = 0;
          end = length;
        }

        return baseFill(array, value, start, end);
      }
      /**
       * This method is like `_.find` except that it returns the index of the first
       * element `predicate` returns truthy for instead of the element itself.
       *
       * @static
       * @memberOf _
       * @since 1.1.0
       * @category Array
       * @param {Array} array The array to inspect.
       * @param {Function} [predicate=_.identity] The function invoked per iteration.
       * @param {number} [fromIndex=0] The index to search from.
       * @returns {number} Returns the index of the found element, else `-1`.
       * @example
       *
       * var users = [
       *   { 'user': 'barney',  'active': false },
       *   { 'user': 'fred',    'active': false },
       *   { 'user': 'pebbles', 'active': true }
       * ];
       *
       * _.findIndex(users, function(o) { return o.user == 'barney'; });
       * // => 0
       *
       * // The `_.matches` iteratee shorthand.
       * _.findIndex(users, { 'user': 'fred', 'active': false });
       * // => 1
       *
       * // The `_.matchesProperty` iteratee shorthand.
       * _.findIndex(users, ['active', false]);
       * // => 0
       *
       * // The `_.property` iteratee shorthand.
       * _.findIndex(users, 'active');
       * // => 2
       */


      function findIndex(array, predicate, fromIndex) {
        var length = array == null ? 0 : array.length;

        if (!length) {
          return -1;
        }

        var index = fromIndex == null ? 0 : toInteger(fromIndex);

        if (index < 0) {
          index = nativeMax(length + index, 0);
        }

        return baseFindIndex(array, getIteratee(predicate, 3), index);
      }
      /**
       * This method is like `_.findIndex` except that it iterates over elements
       * of `collection` from right to left.
       *
       * @static
       * @memberOf _
       * @since 2.0.0
       * @category Array
       * @param {Array} array The array to inspect.
       * @param {Function} [predicate=_.identity] The function invoked per iteration.
       * @param {number} [fromIndex=array.length-1] The index to search from.
       * @returns {number} Returns the index of the found element, else `-1`.
       * @example
       *
       * var users = [
       *   { 'user': 'barney',  'active': true },
       *   { 'user': 'fred',    'active': false },
       *   { 'user': 'pebbles', 'active': false }
       * ];
       *
       * _.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
       * // => 2
       *
       * // The `_.matches` iteratee shorthand.
       * _.findLastIndex(users, { 'user': 'barney', 'active': true });
       * // => 0
       *
       * // The `_.matchesProperty` iteratee shorthand.
       * _.findLastIndex(users, ['active', false]);
       * // => 2
       *
       * // The `_.property` iteratee shorthand.
       * _.findLastIndex(users, 'active');
       * // => 0
       */


      function findLastIndex(array, predicate, fromIndex) {
        var length = array == null ? 0 : array.length;

        if (!length) {
          return -1;
        }

        var index = length - 1;

        if (fromIndex !== undefined) {
          index = toInteger(fromIndex);
          index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
        }

        return baseFindIndex(array, getIteratee(predicate, 3), index, true);
      }
      /**
       * Flattens `array` a single level deep.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Array
       * @param {Array} array The array to flatten.
       * @returns {Array} Returns the new flattened array.
       * @example
       *
       * _.flatten([1, [2, [3, [4]], 5]]);
       * // => [1, 2, [3, [4]], 5]
       */


      function flatten(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseFlatten(array, 1) : [];
      }
      /**
       * Recursively flattens `array`.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Array
       * @param {Array} array The array to flatten.
       * @returns {Array} Returns the new flattened array.
       * @example
       *
       * _.flattenDeep([1, [2, [3, [4]], 5]]);
       * // => [1, 2, 3, 4, 5]
       */


      function flattenDeep(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseFlatten(array, INFINITY) : [];
      }
      /**
       * Recursively flatten `array` up to `depth` times.
       *
       * @static
       * @memberOf _
       * @since 4.4.0
       * @category Array
       * @param {Array} array The array to flatten.
       * @param {number} [depth=1] The maximum recursion depth.
       * @returns {Array} Returns the new flattened array.
       * @example
       *
       * var array = [1, [2, [3, [4]], 5]];
       *
       * _.flattenDepth(array, 1);
       * // => [1, 2, [3, [4]], 5]
       *
       * _.flattenDepth(array, 2);
       * // => [1, 2, 3, [4], 5]
       */


      function flattenDepth(array, depth) {
        var length = array == null ? 0 : array.length;

        if (!length) {
          return [];
        }

        depth = depth === undefined ? 1 : toInteger(depth);
        return baseFlatten(array, depth);
      }
      /**
       * The inverse of `_.toPairs`; this method returns an object composed
       * from key-value `pairs`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} pairs The key-value pairs.
       * @returns {Object} Returns the new object.
       * @example
       *
       * _.fromPairs([['a', 1], ['b', 2]]);
       * // => { 'a': 1, 'b': 2 }
       */


      function fromPairs(pairs) {
        var index = -1,
            length = pairs == null ? 0 : pairs.length,
            result = {};

        while (++index < length) {
          var pair = pairs[index];
          result[pair[0]] = pair[1];
        }

        return result;
      }
      /**
       * Gets the first element of `array`.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @alias first
       * @category Array
       * @param {Array} array The array to query.
       * @returns {*} Returns the first element of `array`.
       * @example
       *
       * _.head([1, 2, 3]);
       * // => 1
       *
       * _.head([]);
       * // => undefined
       */


      function head(array) {
        return array && array.length ? array[0] : undefined;
      }
      /**
       * Gets the index at which the first occurrence of `value` is found in `array`
       * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
       * for equality comparisons. If `fromIndex` is negative, it's used as the
       * offset from the end of `array`.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Array
       * @param {Array} array The array to inspect.
       * @param {*} value The value to search for.
       * @param {number} [fromIndex=0] The index to search from.
       * @returns {number} Returns the index of the matched value, else `-1`.
       * @example
       *
       * _.indexOf([1, 2, 1, 2], 2);
       * // => 1
       *
       * // Search from the `fromIndex`.
       * _.indexOf([1, 2, 1, 2], 2, 2);
       * // => 3
       */


      function indexOf(array, value, fromIndex) {
        var length = array == null ? 0 : array.length;

        if (!length) {
          return -1;
        }

        var index = fromIndex == null ? 0 : toInteger(fromIndex);

        if (index < 0) {
          index = nativeMax(length + index, 0);
        }

        return baseIndexOf(array, value, index);
      }
      /**
       * Gets all but the last element of `array`.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Array
       * @param {Array} array The array to query.
       * @returns {Array} Returns the slice of `array`.
       * @example
       *
       * _.initial([1, 2, 3]);
       * // => [1, 2]
       */


      function initial(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseSlice(array, 0, -1) : [];
      }
      /**
       * Creates an array of unique values that are included in all given arrays
       * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
       * for equality comparisons. The order and references of result values are
       * determined by the first array.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Array
       * @param {...Array} [arrays] The arrays to inspect.
       * @returns {Array} Returns the new array of intersecting values.
       * @example
       *
       * _.intersection([2, 1], [2, 3]);
       * // => [2]
       */


      var intersection = baseRest(function (arrays) {
        var mapped = arrayMap(arrays, castArrayLikeObject);
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
      });
      /**
       * This method is like `_.intersection` except that it accepts `iteratee`
       * which is invoked for each element of each `arrays` to generate the criterion
       * by which they're compared. The order and references of result values are
       * determined by the first array. The iteratee is invoked with one argument:
       * (value).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {...Array} [arrays] The arrays to inspect.
       * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
       * @returns {Array} Returns the new array of intersecting values.
       * @example
       *
       * _.intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);
       * // => [2.1]
       *
       * // The `_.property` iteratee shorthand.
       * _.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
       * // => [{ 'x': 1 }]
       */

      var intersectionBy = baseRest(function (arrays) {
        var iteratee = last(arrays),
            mapped = arrayMap(arrays, castArrayLikeObject);

        if (iteratee === last(mapped)) {
          iteratee = undefined;
        } else {
          mapped.pop();
        }

        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee, 2)) : [];
      });
      /**
       * This method is like `_.intersection` except that it accepts `comparator`
       * which is invoked to compare elements of `arrays`. The order and references
       * of result values are determined by the first array. The comparator is
       * invoked with two arguments: (arrVal, othVal).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {...Array} [arrays] The arrays to inspect.
       * @param {Function} [comparator] The comparator invoked per element.
       * @returns {Array} Returns the new array of intersecting values.
       * @example
       *
       * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
       * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
       *
       * _.intersectionWith(objects, others, _.isEqual);
       * // => [{ 'x': 1, 'y': 2 }]
       */

      var intersectionWith = baseRest(function (arrays) {
        var comparator = last(arrays),
            mapped = arrayMap(arrays, castArrayLikeObject);
        comparator = typeof comparator == 'function' ? comparator : undefined;

        if (comparator) {
          mapped.pop();
        }

        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined, comparator) : [];
      });
      /**
       * Converts all elements in `array` into a string separated by `separator`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} array The array to convert.
       * @param {string} [separator=','] The element separator.
       * @returns {string} Returns the joined string.
       * @example
       *
       * _.join(['a', 'b', 'c'], '~');
       * // => 'a~b~c'
       */

      function join(array, separator) {
        return array == null ? '' : nativeJoin.call(array, separator);
      }
      /**
       * Gets the last element of `array`.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Array
       * @param {Array} array The array to query.
       * @returns {*} Returns the last element of `array`.
       * @example
       *
       * _.last([1, 2, 3]);
       * // => 3
       */


      function last(array) {
        var length = array == null ? 0 : array.length;
        return length ? array[length - 1] : undefined;
      }
      /**
       * This method is like `_.indexOf` except that it iterates over elements of
       * `array` from right to left.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Array
       * @param {Array} array The array to inspect.
       * @param {*} value The value to search for.
       * @param {number} [fromIndex=array.length-1] The index to search from.
       * @returns {number} Returns the index of the matched value, else `-1`.
       * @example
       *
       * _.lastIndexOf([1, 2, 1, 2], 2);
       * // => 3
       *
       * // Search from the `fromIndex`.
       * _.lastIndexOf([1, 2, 1, 2], 2, 2);
       * // => 1
       */


      function lastIndexOf(array, value, fromIndex) {
        var length = array == null ? 0 : array.length;

        if (!length) {
          return -1;
        }

        var index = length;

        if (fromIndex !== undefined) {
          index = toInteger(fromIndex);
          index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
        }

        return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
      }
      /**
       * Gets the element at index `n` of `array`. If `n` is negative, the nth
       * element from the end is returned.
       *
       * @static
       * @memberOf _
       * @since 4.11.0
       * @category Array
       * @param {Array} array The array to query.
       * @param {number} [n=0] The index of the element to return.
       * @returns {*} Returns the nth element of `array`.
       * @example
       *
       * var array = ['a', 'b', 'c', 'd'];
       *
       * _.nth(array, 1);
       * // => 'b'
       *
       * _.nth(array, -2);
       * // => 'c';
       */


      function nth(array, n) {
        return array && array.length ? baseNth(array, toInteger(n)) : undefined;
      }
      /**
       * Removes all given values from `array` using
       * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
       * for equality comparisons.
       *
       * **Note:** Unlike `_.without`, this method mutates `array`. Use `_.remove`
       * to remove elements from an array by predicate.
       *
       * @static
       * @memberOf _
       * @since 2.0.0
       * @category Array
       * @param {Array} array The array to modify.
       * @param {...*} [values] The values to remove.
       * @returns {Array} Returns `array`.
       * @example
       *
       * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
       *
       * _.pull(array, 'a', 'c');
       * console.log(array);
       * // => ['b', 'b']
       */


      var pull = baseRest(pullAll);
      /**
       * This method is like `_.pull` except that it accepts an array of values to remove.
       *
       * **Note:** Unlike `_.difference`, this method mutates `array`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} array The array to modify.
       * @param {Array} values The values to remove.
       * @returns {Array} Returns `array`.
       * @example
       *
       * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
       *
       * _.pullAll(array, ['a', 'c']);
       * console.log(array);
       * // => ['b', 'b']
       */

      function pullAll(array, values) {
        return array && array.length && values && values.length ? basePullAll(array, values) : array;
      }
      /**
       * This method is like `_.pullAll` except that it accepts `iteratee` which is
       * invoked for each element of `array` and `values` to generate the criterion
       * by which they're compared. The iteratee is invoked with one argument: (value).
       *
       * **Note:** Unlike `_.differenceBy`, this method mutates `array`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} array The array to modify.
       * @param {Array} values The values to remove.
       * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
       * @returns {Array} Returns `array`.
       * @example
       *
       * var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
       *
       * _.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
       * console.log(array);
       * // => [{ 'x': 2 }]
       */


      function pullAllBy(array, values, iteratee) {
        return array && array.length && values && values.length ? basePullAll(array, values, getIteratee(iteratee, 2)) : array;
      }
      /**
       * This method is like `_.pullAll` except that it accepts `comparator` which
       * is invoked to compare elements of `array` to `values`. The comparator is
       * invoked with two arguments: (arrVal, othVal).
       *
       * **Note:** Unlike `_.differenceWith`, this method mutates `array`.
       *
       * @static
       * @memberOf _
       * @since 4.6.0
       * @category Array
       * @param {Array} array The array to modify.
       * @param {Array} values The values to remove.
       * @param {Function} [comparator] The comparator invoked per element.
       * @returns {Array} Returns `array`.
       * @example
       *
       * var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];
       *
       * _.pullAllWith(array, [{ 'x': 3, 'y': 4 }], _.isEqual);
       * console.log(array);
       * // => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
       */


      function pullAllWith(array, values, comparator) {
        return array && array.length && values && values.length ? basePullAll(array, values, undefined, comparator) : array;
      }
      /**
       * Removes elements from `array` corresponding to `indexes` and returns an
       * array of removed elements.
       *
       * **Note:** Unlike `_.at`, this method mutates `array`.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Array
       * @param {Array} array The array to modify.
       * @param {...(number|number[])} [indexes] The indexes of elements to remove.
       * @returns {Array} Returns the new array of removed elements.
       * @example
       *
       * var array = ['a', 'b', 'c', 'd'];
       * var pulled = _.pullAt(array, [1, 3]);
       *
       * console.log(array);
       * // => ['a', 'c']
       *
       * console.log(pulled);
       * // => ['b', 'd']
       */


      var pullAt = flatRest(function (array, indexes) {
        var length = array == null ? 0 : array.length,
            result = baseAt(array, indexes);
        basePullAt(array, arrayMap(indexes, function (index) {
          return isIndex(index, length) ? +index : index;
        }).sort(compareAscending));
        return result;
      });
      /**
       * Removes all elements from `array` that `predicate` returns truthy for
       * and returns an array of the removed elements. The predicate is invoked
       * with three arguments: (value, index, array).
       *
       * **Note:** Unlike `_.filter`, this method mutates `array`. Use `_.pull`
       * to pull elements from an array by value.
       *
       * @static
       * @memberOf _
       * @since 2.0.0
       * @category Array
       * @param {Array} array The array to modify.
       * @param {Function} [predicate=_.identity] The function invoked per iteration.
       * @returns {Array} Returns the new array of removed elements.
       * @example
       *
       * var array = [1, 2, 3, 4];
       * var evens = _.remove(array, function(n) {
       *   return n % 2 == 0;
       * });
       *
       * console.log(array);
       * // => [1, 3]
       *
       * console.log(evens);
       * // => [2, 4]
       */

      function remove(array, predicate) {
        var result = [];

        if (!(array && array.length)) {
          return result;
        }

        var index = -1,
            indexes = [],
            length = array.length;
        predicate = getIteratee(predicate, 3);

        while (++index < length) {
          var value = array[index];

          if (predicate(value, index, array)) {
            result.push(value);
            indexes.push(index);
          }
        }

        basePullAt(array, indexes);
        return result;
      }
      /**
       * Reverses `array` so that the first element becomes the last, the second
       * element becomes the second to last, and so on.
       *
       * **Note:** This method mutates `array` and is based on
       * [`Array#reverse`](https://mdn.io/Array/reverse).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} array The array to modify.
       * @returns {Array} Returns `array`.
       * @example
       *
       * var array = [1, 2, 3];
       *
       * _.reverse(array);
       * // => [3, 2, 1]
       *
       * console.log(array);
       * // => [3, 2, 1]
       */


      function reverse(array) {
        return array == null ? array : nativeReverse.call(array);
      }
      /**
       * Creates a slice of `array` from `start` up to, but not including, `end`.
       *
       * **Note:** This method is used instead of
       * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
       * returned.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Array
       * @param {Array} array The array to slice.
       * @param {number} [start=0] The start position.
       * @param {number} [end=array.length] The end position.
       * @returns {Array} Returns the slice of `array`.
       */


      function slice(array, start, end) {
        var length = array == null ? 0 : array.length;

        if (!length) {
          return [];
        }

        if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
          start = 0;
          end = length;
        } else {
          start = start == null ? 0 : toInteger(start);
          end = end === undefined ? length : toInteger(end);
        }

        return baseSlice(array, start, end);
      }
      /**
       * Uses a binary search to determine the lowest index at which `value`
       * should be inserted into `array` in order to maintain its sort order.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Array
       * @param {Array} array The sorted array to inspect.
       * @param {*} value The value to evaluate.
       * @returns {number} Returns the index at which `value` should be inserted
       *  into `array`.
       * @example
       *
       * _.sortedIndex([30, 50], 40);
       * // => 1
       */


      function sortedIndex(array, value) {
        return baseSortedIndex(array, value);
      }
      /**
       * This method is like `_.sortedIndex` except that it accepts `iteratee`
       * which is invoked for `value` and each element of `array` to compute their
       * sort ranking. The iteratee is invoked with one argument: (value).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} array The sorted array to inspect.
       * @param {*} value The value to evaluate.
       * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
       * @returns {number} Returns the index at which `value` should be inserted
       *  into `array`.
       * @example
       *
       * var objects = [{ 'x': 4 }, { 'x': 5 }];
       *
       * _.sortedIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
       * // => 0
       *
       * // The `_.property` iteratee shorthand.
       * _.sortedIndexBy(objects, { 'x': 4 }, 'x');
       * // => 0
       */


      function sortedIndexBy(array, value, iteratee) {
        return baseSortedIndexBy(array, value, getIteratee(iteratee, 2));
      }
      /**
       * This method is like `_.indexOf` except that it performs a binary
       * search on a sorted `array`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} array The array to inspect.
       * @param {*} value The value to search for.
       * @returns {number} Returns the index of the matched value, else `-1`.
       * @example
       *
       * _.sortedIndexOf([4, 5, 5, 5, 6], 5);
       * // => 1
       */


      function sortedIndexOf(array, value) {
        var length = array == null ? 0 : array.length;

        if (length) {
          var index = baseSortedIndex(array, value);

          if (index < length && eq(array[index], value)) {
            return index;
          }
        }

        return -1;
      }
      /**
       * This method is like `_.sortedIndex` except that it returns the highest
       * index at which `value` should be inserted into `array` in order to
       * maintain its sort order.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Array
       * @param {Array} array The sorted array to inspect.
       * @param {*} value The value to evaluate.
       * @returns {number} Returns the index at which `value` should be inserted
       *  into `array`.
       * @example
       *
       * _.sortedLastIndex([4, 5, 5, 5, 6], 5);
       * // => 4
       */


      function sortedLastIndex(array, value) {
        return baseSortedIndex(array, value, true);
      }
      /**
       * This method is like `_.sortedLastIndex` except that it accepts `iteratee`
       * which is invoked for `value` and each element of `array` to compute their
       * sort ranking. The iteratee is invoked with one argument: (value).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} array The sorted array to inspect.
       * @param {*} value The value to evaluate.
       * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
       * @returns {number} Returns the index at which `value` should be inserted
       *  into `array`.
       * @example
       *
       * var objects = [{ 'x': 4 }, { 'x': 5 }];
       *
       * _.sortedLastIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
       * // => 1
       *
       * // The `_.property` iteratee shorthand.
       * _.sortedLastIndexBy(objects, { 'x': 4 }, 'x');
       * // => 1
       */


      function sortedLastIndexBy(array, value, iteratee) {
        return baseSortedIndexBy(array, value, getIteratee(iteratee, 2), true);
      }
      /**
       * This method is like `_.lastIndexOf` except that it performs a binary
       * search on a sorted `array`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} array The array to inspect.
       * @param {*} value The value to search for.
       * @returns {number} Returns the index of the matched value, else `-1`.
       * @example
       *
       * _.sortedLastIndexOf([4, 5, 5, 5, 6], 5);
       * // => 3
       */


      function sortedLastIndexOf(array, value) {
        var length = array == null ? 0 : array.length;

        if (length) {
          var index = baseSortedIndex(array, value, true) - 1;

          if (eq(array[index], value)) {
            return index;
          }
        }

        return -1;
      }
      /**
       * This method is like `_.uniq` except that it's designed and optimized
       * for sorted arrays.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} array The array to inspect.
       * @returns {Array} Returns the new duplicate free array.
       * @example
       *
       * _.sortedUniq([1, 1, 2]);
       * // => [1, 2]
       */


      function sortedUniq(array) {
        return array && array.length ? baseSortedUniq(array) : [];
      }
      /**
       * This method is like `_.uniqBy` except that it's designed and optimized
       * for sorted arrays.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} array The array to inspect.
       * @param {Function} [iteratee] The iteratee invoked per element.
       * @returns {Array} Returns the new duplicate free array.
       * @example
       *
       * _.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
       * // => [1.1, 2.3]
       */


      function sortedUniqBy(array, iteratee) {
        return array && array.length ? baseSortedUniq(array, getIteratee(iteratee, 2)) : [];
      }
      /**
       * Gets all but the first element of `array`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} array The array to query.
       * @returns {Array} Returns the slice of `array`.
       * @example
       *
       * _.tail([1, 2, 3]);
       * // => [2, 3]
       */


      function tail(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseSlice(array, 1, length) : [];
      }
      /**
       * Creates a slice of `array` with `n` elements taken from the beginning.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Array
       * @param {Array} array The array to query.
       * @param {number} [n=1] The number of elements to take.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {Array} Returns the slice of `array`.
       * @example
       *
       * _.take([1, 2, 3]);
       * // => [1]
       *
       * _.take([1, 2, 3], 2);
       * // => [1, 2]
       *
       * _.take([1, 2, 3], 5);
       * // => [1, 2, 3]
       *
       * _.take([1, 2, 3], 0);
       * // => []
       */


      function take(array, n, guard) {
        if (!(array && array.length)) {
          return [];
        }

        n = guard || n === undefined ? 1 : toInteger(n);
        return baseSlice(array, 0, n < 0 ? 0 : n);
      }
      /**
       * Creates a slice of `array` with `n` elements taken from the end.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Array
       * @param {Array} array The array to query.
       * @param {number} [n=1] The number of elements to take.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {Array} Returns the slice of `array`.
       * @example
       *
       * _.takeRight([1, 2, 3]);
       * // => [3]
       *
       * _.takeRight([1, 2, 3], 2);
       * // => [2, 3]
       *
       * _.takeRight([1, 2, 3], 5);
       * // => [1, 2, 3]
       *
       * _.takeRight([1, 2, 3], 0);
       * // => []
       */


      function takeRight(array, n, guard) {
        var length = array == null ? 0 : array.length;

        if (!length) {
          return [];
        }

        n = guard || n === undefined ? 1 : toInteger(n);
        n = length - n;
        return baseSlice(array, n < 0 ? 0 : n, length);
      }
      /**
       * Creates a slice of `array` with elements taken from the end. Elements are
       * taken until `predicate` returns falsey. The predicate is invoked with
       * three arguments: (value, index, array).
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Array
       * @param {Array} array The array to query.
       * @param {Function} [predicate=_.identity] The function invoked per iteration.
       * @returns {Array} Returns the slice of `array`.
       * @example
       *
       * var users = [
       *   { 'user': 'barney',  'active': true },
       *   { 'user': 'fred',    'active': false },
       *   { 'user': 'pebbles', 'active': false }
       * ];
       *
       * _.takeRightWhile(users, function(o) { return !o.active; });
       * // => objects for ['fred', 'pebbles']
       *
       * // The `_.matches` iteratee shorthand.
       * _.takeRightWhile(users, { 'user': 'pebbles', 'active': false });
       * // => objects for ['pebbles']
       *
       * // The `_.matchesProperty` iteratee shorthand.
       * _.takeRightWhile(users, ['active', false]);
       * // => objects for ['fred', 'pebbles']
       *
       * // The `_.property` iteratee shorthand.
       * _.takeRightWhile(users, 'active');
       * // => []
       */


      function takeRightWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
      }
      /**
       * Creates a slice of `array` with elements taken from the beginning. Elements
       * are taken until `predicate` returns falsey. The predicate is invoked with
       * three arguments: (value, index, array).
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Array
       * @param {Array} array The array to query.
       * @param {Function} [predicate=_.identity] The function invoked per iteration.
       * @returns {Array} Returns the slice of `array`.
       * @example
       *
       * var users = [
       *   { 'user': 'barney',  'active': false },
       *   { 'user': 'fred',    'active': false },
       *   { 'user': 'pebbles', 'active': true }
       * ];
       *
       * _.takeWhile(users, function(o) { return !o.active; });
       * // => objects for ['barney', 'fred']
       *
       * // The `_.matches` iteratee shorthand.
       * _.takeWhile(users, { 'user': 'barney', 'active': false });
       * // => objects for ['barney']
       *
       * // The `_.matchesProperty` iteratee shorthand.
       * _.takeWhile(users, ['active', false]);
       * // => objects for ['barney', 'fred']
       *
       * // The `_.property` iteratee shorthand.
       * _.takeWhile(users, 'active');
       * // => []
       */


      function takeWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
      }
      /**
       * Creates an array of unique values, in order, from all given arrays using
       * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
       * for equality comparisons.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Array
       * @param {...Array} [arrays] The arrays to inspect.
       * @returns {Array} Returns the new array of combined values.
       * @example
       *
       * _.union([2], [1, 2]);
       * // => [2, 1]
       */


      var union = baseRest(function (arrays) {
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
      });
      /**
       * This method is like `_.union` except that it accepts `iteratee` which is
       * invoked for each element of each `arrays` to generate the criterion by
       * which uniqueness is computed. Result values are chosen from the first
       * array in which the value occurs. The iteratee is invoked with one argument:
       * (value).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {...Array} [arrays] The arrays to inspect.
       * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
       * @returns {Array} Returns the new array of combined values.
       * @example
       *
       * _.unionBy([2.1], [1.2, 2.3], Math.floor);
       * // => [2.1, 1.2]
       *
       * // The `_.property` iteratee shorthand.
       * _.unionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
       * // => [{ 'x': 1 }, { 'x': 2 }]
       */

      var unionBy = baseRest(function (arrays) {
        var iteratee = last(arrays);

        if (isArrayLikeObject(iteratee)) {
          iteratee = undefined;
        }

        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee, 2));
      });
      /**
       * This method is like `_.union` except that it accepts `comparator` which
       * is invoked to compare elements of `arrays`. Result values are chosen from
       * the first array in which the value occurs. The comparator is invoked
       * with two arguments: (arrVal, othVal).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {...Array} [arrays] The arrays to inspect.
       * @param {Function} [comparator] The comparator invoked per element.
       * @returns {Array} Returns the new array of combined values.
       * @example
       *
       * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
       * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
       *
       * _.unionWith(objects, others, _.isEqual);
       * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
       */

      var unionWith = baseRest(function (arrays) {
        var comparator = last(arrays);
        comparator = typeof comparator == 'function' ? comparator : undefined;
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined, comparator);
      });
      /**
       * Creates a duplicate-free version of an array, using
       * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
       * for equality comparisons, in which only the first occurrence of each element
       * is kept. The order of result values is determined by the order they occur
       * in the array.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Array
       * @param {Array} array The array to inspect.
       * @returns {Array} Returns the new duplicate free array.
       * @example
       *
       * _.uniq([2, 1, 2]);
       * // => [2, 1]
       */

      function uniq(array) {
        return array && array.length ? baseUniq(array) : [];
      }
      /**
       * This method is like `_.uniq` except that it accepts `iteratee` which is
       * invoked for each element in `array` to generate the criterion by which
       * uniqueness is computed. The order of result values is determined by the
       * order they occur in the array. The iteratee is invoked with one argument:
       * (value).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} array The array to inspect.
       * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
       * @returns {Array} Returns the new duplicate free array.
       * @example
       *
       * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
       * // => [2.1, 1.2]
       *
       * // The `_.property` iteratee shorthand.
       * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
       * // => [{ 'x': 1 }, { 'x': 2 }]
       */


      function uniqBy(array, iteratee) {
        return array && array.length ? baseUniq(array, getIteratee(iteratee, 2)) : [];
      }
      /**
       * This method is like `_.uniq` except that it accepts `comparator` which
       * is invoked to compare elements of `array`. The order of result values is
       * determined by the order they occur in the array.The comparator is invoked
       * with two arguments: (arrVal, othVal).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} array The array to inspect.
       * @param {Function} [comparator] The comparator invoked per element.
       * @returns {Array} Returns the new duplicate free array.
       * @example
       *
       * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
       *
       * _.uniqWith(objects, _.isEqual);
       * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
       */


      function uniqWith(array, comparator) {
        comparator = typeof comparator == 'function' ? comparator : undefined;
        return array && array.length ? baseUniq(array, undefined, comparator) : [];
      }
      /**
       * This method is like `_.zip` except that it accepts an array of grouped
       * elements and creates an array regrouping the elements to their pre-zip
       * configuration.
       *
       * @static
       * @memberOf _
       * @since 1.2.0
       * @category Array
       * @param {Array} array The array of grouped elements to process.
       * @returns {Array} Returns the new array of regrouped elements.
       * @example
       *
       * var zipped = _.zip(['a', 'b'], [1, 2], [true, false]);
       * // => [['a', 1, true], ['b', 2, false]]
       *
       * _.unzip(zipped);
       * // => [['a', 'b'], [1, 2], [true, false]]
       */


      function unzip(array) {
        if (!(array && array.length)) {
          return [];
        }

        var length = 0;
        array = arrayFilter(array, function (group) {
          if (isArrayLikeObject(group)) {
            length = nativeMax(group.length, length);
            return true;
          }
        });
        return baseTimes(length, function (index) {
          return arrayMap(array, baseProperty(index));
        });
      }
      /**
       * This method is like `_.unzip` except that it accepts `iteratee` to specify
       * how regrouped values should be combined. The iteratee is invoked with the
       * elements of each group: (...group).
       *
       * @static
       * @memberOf _
       * @since 3.8.0
       * @category Array
       * @param {Array} array The array of grouped elements to process.
       * @param {Function} [iteratee=_.identity] The function to combine
       *  regrouped values.
       * @returns {Array} Returns the new array of regrouped elements.
       * @example
       *
       * var zipped = _.zip([1, 2], [10, 20], [100, 200]);
       * // => [[1, 10, 100], [2, 20, 200]]
       *
       * _.unzipWith(zipped, _.add);
       * // => [3, 30, 300]
       */


      function unzipWith(array, iteratee) {
        if (!(array && array.length)) {
          return [];
        }

        var result = unzip(array);

        if (iteratee == null) {
          return result;
        }

        return arrayMap(result, function (group) {
          return apply(iteratee, undefined, group);
        });
      }
      /**
       * Creates an array excluding all given values using
       * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
       * for equality comparisons.
       *
       * **Note:** Unlike `_.pull`, this method returns a new array.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Array
       * @param {Array} array The array to inspect.
       * @param {...*} [values] The values to exclude.
       * @returns {Array} Returns the new array of filtered values.
       * @see _.difference, _.xor
       * @example
       *
       * _.without([2, 1, 2, 3], 1, 2);
       * // => [3]
       */


      var without = baseRest(function (array, values) {
        return isArrayLikeObject(array) ? baseDifference(array, values) : [];
      });
      /**
       * Creates an array of unique values that is the
       * [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
       * of the given arrays. The order of result values is determined by the order
       * they occur in the arrays.
       *
       * @static
       * @memberOf _
       * @since 2.4.0
       * @category Array
       * @param {...Array} [arrays] The arrays to inspect.
       * @returns {Array} Returns the new array of filtered values.
       * @see _.difference, _.without
       * @example
       *
       * _.xor([2, 1], [2, 3]);
       * // => [1, 3]
       */

      var xor = baseRest(function (arrays) {
        return baseXor(arrayFilter(arrays, isArrayLikeObject));
      });
      /**
       * This method is like `_.xor` except that it accepts `iteratee` which is
       * invoked for each element of each `arrays` to generate the criterion by
       * which by which they're compared. The order of result values is determined
       * by the order they occur in the arrays. The iteratee is invoked with one
       * argument: (value).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {...Array} [arrays] The arrays to inspect.
       * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
       * @returns {Array} Returns the new array of filtered values.
       * @example
       *
       * _.xorBy([2.1, 1.2], [2.3, 3.4], Math.floor);
       * // => [1.2, 3.4]
       *
       * // The `_.property` iteratee shorthand.
       * _.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
       * // => [{ 'x': 2 }]
       */

      var xorBy = baseRest(function (arrays) {
        var iteratee = last(arrays);

        if (isArrayLikeObject(iteratee)) {
          iteratee = undefined;
        }

        return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee, 2));
      });
      /**
       * This method is like `_.xor` except that it accepts `comparator` which is
       * invoked to compare elements of `arrays`. The order of result values is
       * determined by the order they occur in the arrays. The comparator is invoked
       * with two arguments: (arrVal, othVal).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {...Array} [arrays] The arrays to inspect.
       * @param {Function} [comparator] The comparator invoked per element.
       * @returns {Array} Returns the new array of filtered values.
       * @example
       *
       * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
       * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
       *
       * _.xorWith(objects, others, _.isEqual);
       * // => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
       */

      var xorWith = baseRest(function (arrays) {
        var comparator = last(arrays);
        comparator = typeof comparator == 'function' ? comparator : undefined;
        return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined, comparator);
      });
      /**
       * Creates an array of grouped elements, the first of which contains the
       * first elements of the given arrays, the second of which contains the
       * second elements of the given arrays, and so on.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Array
       * @param {...Array} [arrays] The arrays to process.
       * @returns {Array} Returns the new array of grouped elements.
       * @example
       *
       * _.zip(['a', 'b'], [1, 2], [true, false]);
       * // => [['a', 1, true], ['b', 2, false]]
       */

      var zip = baseRest(unzip);
      /**
       * This method is like `_.fromPairs` except that it accepts two arrays,
       * one of property identifiers and one of corresponding values.
       *
       * @static
       * @memberOf _
       * @since 0.4.0
       * @category Array
       * @param {Array} [props=[]] The property identifiers.
       * @param {Array} [values=[]] The property values.
       * @returns {Object} Returns the new object.
       * @example
       *
       * _.zipObject(['a', 'b'], [1, 2]);
       * // => { 'a': 1, 'b': 2 }
       */

      function zipObject(props, values) {
        return baseZipObject(props || [], values || [], assignValue);
      }
      /**
       * This method is like `_.zipObject` except that it supports property paths.
       *
       * @static
       * @memberOf _
       * @since 4.1.0
       * @category Array
       * @param {Array} [props=[]] The property identifiers.
       * @param {Array} [values=[]] The property values.
       * @returns {Object} Returns the new object.
       * @example
       *
       * _.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
       * // => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
       */


      function zipObjectDeep(props, values) {
        return baseZipObject(props || [], values || [], baseSet);
      }
      /**
       * This method is like `_.zip` except that it accepts `iteratee` to specify
       * how grouped values should be combined. The iteratee is invoked with the
       * elements of each group: (...group).
       *
       * @static
       * @memberOf _
       * @since 3.8.0
       * @category Array
       * @param {...Array} [arrays] The arrays to process.
       * @param {Function} [iteratee=_.identity] The function to combine
       *  grouped values.
       * @returns {Array} Returns the new array of grouped elements.
       * @example
       *
       * _.zipWith([1, 2], [10, 20], [100, 200], function(a, b, c) {
       *   return a + b + c;
       * });
       * // => [111, 222]
       */


      var zipWith = baseRest(function (arrays) {
        var length = arrays.length,
            iteratee = length > 1 ? arrays[length - 1] : undefined;
        iteratee = typeof iteratee == 'function' ? (arrays.pop(), iteratee) : undefined;
        return unzipWith(arrays, iteratee);
      });
      /*------------------------------------------------------------------------*/

      /**
       * Creates a `lodash` wrapper instance that wraps `value` with explicit method
       * chain sequences enabled. The result of such sequences must be unwrapped
       * with `_#value`.
       *
       * @static
       * @memberOf _
       * @since 1.3.0
       * @category Seq
       * @param {*} value The value to wrap.
       * @returns {Object} Returns the new `lodash` wrapper instance.
       * @example
       *
       * var users = [
       *   { 'user': 'barney',  'age': 36 },
       *   { 'user': 'fred',    'age': 40 },
       *   { 'user': 'pebbles', 'age': 1 }
       * ];
       *
       * var youngest = _
       *   .chain(users)
       *   .sortBy('age')
       *   .map(function(o) {
       *     return o.user + ' is ' + o.age;
       *   })
       *   .head()
       *   .value();
       * // => 'pebbles is 1'
       */

      function chain(value) {
        var result = lodash(value);
        result.__chain__ = true;
        return result;
      }
      /**
       * This method invokes `interceptor` and returns `value`. The interceptor
       * is invoked with one argument; (value). The purpose of this method is to
       * "tap into" a method chain sequence in order to modify intermediate results.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Seq
       * @param {*} value The value to provide to `interceptor`.
       * @param {Function} interceptor The function to invoke.
       * @returns {*} Returns `value`.
       * @example
       *
       * _([1, 2, 3])
       *  .tap(function(array) {
       *    // Mutate input array.
       *    array.pop();
       *  })
       *  .reverse()
       *  .value();
       * // => [2, 1]
       */


      function tap(value, interceptor) {
        interceptor(value);
        return value;
      }
      /**
       * This method is like `_.tap` except that it returns the result of `interceptor`.
       * The purpose of this method is to "pass thru" values replacing intermediate
       * results in a method chain sequence.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Seq
       * @param {*} value The value to provide to `interceptor`.
       * @param {Function} interceptor The function to invoke.
       * @returns {*} Returns the result of `interceptor`.
       * @example
       *
       * _('  abc  ')
       *  .chain()
       *  .trim()
       *  .thru(function(value) {
       *    return [value];
       *  })
       *  .value();
       * // => ['abc']
       */


      function thru(value, interceptor) {
        return interceptor(value);
      }
      /**
       * This method is the wrapper version of `_.at`.
       *
       * @name at
       * @memberOf _
       * @since 1.0.0
       * @category Seq
       * @param {...(string|string[])} [paths] The property paths to pick.
       * @returns {Object} Returns the new `lodash` wrapper instance.
       * @example
       *
       * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
       *
       * _(object).at(['a[0].b.c', 'a[1]']).value();
       * // => [3, 4]
       */


      var wrapperAt = flatRest(function (paths) {
        var length = paths.length,
            start = length ? paths[0] : 0,
            value = this.__wrapped__,
            interceptor = function (object) {
          return baseAt(object, paths);
        };

        if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
          return this.thru(interceptor);
        }

        value = value.slice(start, +start + (length ? 1 : 0));

        value.__actions__.push({
          'func': thru,
          'args': [interceptor],
          'thisArg': undefined
        });

        return new LodashWrapper(value, this.__chain__).thru(function (array) {
          if (length && !array.length) {
            array.push(undefined);
          }

          return array;
        });
      });
      /**
       * Creates a `lodash` wrapper instance with explicit method chain sequences enabled.
       *
       * @name chain
       * @memberOf _
       * @since 0.1.0
       * @category Seq
       * @returns {Object} Returns the new `lodash` wrapper instance.
       * @example
       *
       * var users = [
       *   { 'user': 'barney', 'age': 36 },
       *   { 'user': 'fred',   'age': 40 }
       * ];
       *
       * // A sequence without explicit chaining.
       * _(users).head();
       * // => { 'user': 'barney', 'age': 36 }
       *
       * // A sequence with explicit chaining.
       * _(users)
       *   .chain()
       *   .head()
       *   .pick('user')
       *   .value();
       * // => { 'user': 'barney' }
       */

      function wrapperChain() {
        return chain(this);
      }
      /**
       * Executes the chain sequence and returns the wrapped result.
       *
       * @name commit
       * @memberOf _
       * @since 3.2.0
       * @category Seq
       * @returns {Object} Returns the new `lodash` wrapper instance.
       * @example
       *
       * var array = [1, 2];
       * var wrapped = _(array).push(3);
       *
       * console.log(array);
       * // => [1, 2]
       *
       * wrapped = wrapped.commit();
       * console.log(array);
       * // => [1, 2, 3]
       *
       * wrapped.last();
       * // => 3
       *
       * console.log(array);
       * // => [1, 2, 3]
       */


      function wrapperCommit() {
        return new LodashWrapper(this.value(), this.__chain__);
      }
      /**
       * Gets the next value on a wrapped object following the
       * [iterator protocol](https://mdn.io/iteration_protocols#iterator).
       *
       * @name next
       * @memberOf _
       * @since 4.0.0
       * @category Seq
       * @returns {Object} Returns the next iterator value.
       * @example
       *
       * var wrapped = _([1, 2]);
       *
       * wrapped.next();
       * // => { 'done': false, 'value': 1 }
       *
       * wrapped.next();
       * // => { 'done': false, 'value': 2 }
       *
       * wrapped.next();
       * // => { 'done': true, 'value': undefined }
       */


      function wrapperNext() {
        if (this.__values__ === undefined) {
          this.__values__ = toArray(this.value());
        }

        var done = this.__index__ >= this.__values__.length,
            value = done ? undefined : this.__values__[this.__index__++];
        return {
          'done': done,
          'value': value
        };
      }
      /**
       * Enables the wrapper to be iterable.
       *
       * @name Symbol.iterator
       * @memberOf _
       * @since 4.0.0
       * @category Seq
       * @returns {Object} Returns the wrapper object.
       * @example
       *
       * var wrapped = _([1, 2]);
       *
       * wrapped[Symbol.iterator]() === wrapped;
       * // => true
       *
       * Array.from(wrapped);
       * // => [1, 2]
       */


      function wrapperToIterator() {
        return this;
      }
      /**
       * Creates a clone of the chain sequence planting `value` as the wrapped value.
       *
       * @name plant
       * @memberOf _
       * @since 3.2.0
       * @category Seq
       * @param {*} value The value to plant.
       * @returns {Object} Returns the new `lodash` wrapper instance.
       * @example
       *
       * function square(n) {
       *   return n * n;
       * }
       *
       * var wrapped = _([1, 2]).map(square);
       * var other = wrapped.plant([3, 4]);
       *
       * other.value();
       * // => [9, 16]
       *
       * wrapped.value();
       * // => [1, 4]
       */


      function wrapperPlant(value) {
        var result,
            parent = this;

        while (parent instanceof baseLodash) {
          var clone = wrapperClone(parent);
          clone.__index__ = 0;
          clone.__values__ = undefined;

          if (result) {
            previous.__wrapped__ = clone;
          } else {
            result = clone;
          }

          var previous = clone;
          parent = parent.__wrapped__;
        }

        previous.__wrapped__ = value;
        return result;
      }
      /**
       * This method is the wrapper version of `_.reverse`.
       *
       * **Note:** This method mutates the wrapped array.
       *
       * @name reverse
       * @memberOf _
       * @since 0.1.0
       * @category Seq
       * @returns {Object} Returns the new `lodash` wrapper instance.
       * @example
       *
       * var array = [1, 2, 3];
       *
       * _(array).reverse().value()
       * // => [3, 2, 1]
       *
       * console.log(array);
       * // => [3, 2, 1]
       */


      function wrapperReverse() {
        var value = this.__wrapped__;

        if (value instanceof LazyWrapper) {
          var wrapped = value;

          if (this.__actions__.length) {
            wrapped = new LazyWrapper(this);
          }

          wrapped = wrapped.reverse();

          wrapped.__actions__.push({
            'func': thru,
            'args': [reverse],
            'thisArg': undefined
          });

          return new LodashWrapper(wrapped, this.__chain__);
        }

        return this.thru(reverse);
      }
      /**
       * Executes the chain sequence to resolve the unwrapped value.
       *
       * @name value
       * @memberOf _
       * @since 0.1.0
       * @alias toJSON, valueOf
       * @category Seq
       * @returns {*} Returns the resolved unwrapped value.
       * @example
       *
       * _([1, 2, 3]).value();
       * // => [1, 2, 3]
       */


      function wrapperValue() {
        return baseWrapperValue(this.__wrapped__, this.__actions__);
      }
      /*------------------------------------------------------------------------*/

      /**
       * Creates an object composed of keys generated from the results of running
       * each element of `collection` thru `iteratee`. The corresponding value of
       * each key is the number of times the key was returned by `iteratee`. The
       * iteratee is invoked with one argument: (value).
       *
       * @static
       * @memberOf _
       * @since 0.5.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
       * @returns {Object} Returns the composed aggregate object.
       * @example
       *
       * _.countBy([6.1, 4.2, 6.3], Math.floor);
       * // => { '4': 1, '6': 2 }
       *
       * // The `_.property` iteratee shorthand.
       * _.countBy(['one', 'two', 'three'], 'length');
       * // => { '3': 2, '5': 1 }
       */


      var countBy = createAggregator(function (result, value, key) {
        if (hasOwnProperty.call(result, key)) {
          ++result[key];
        } else {
          baseAssignValue(result, key, 1);
        }
      });
      /**
       * Checks if `predicate` returns truthy for **all** elements of `collection`.
       * Iteration is stopped once `predicate` returns falsey. The predicate is
       * invoked with three arguments: (value, index|key, collection).
       *
       * **Note:** This method returns `true` for
       * [empty collections](https://en.wikipedia.org/wiki/Empty_set) because
       * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
       * elements of empty collections.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} [predicate=_.identity] The function invoked per iteration.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {boolean} Returns `true` if all elements pass the predicate check,
       *  else `false`.
       * @example
       *
       * _.every([true, 1, null, 'yes'], Boolean);
       * // => false
       *
       * var users = [
       *   { 'user': 'barney', 'age': 36, 'active': false },
       *   { 'user': 'fred',   'age': 40, 'active': false }
       * ];
       *
       * // The `_.matches` iteratee shorthand.
       * _.every(users, { 'user': 'barney', 'active': false });
       * // => false
       *
       * // The `_.matchesProperty` iteratee shorthand.
       * _.every(users, ['active', false]);
       * // => true
       *
       * // The `_.property` iteratee shorthand.
       * _.every(users, 'active');
       * // => false
       */

      function every(collection, predicate, guard) {
        var func = isArray(collection) ? arrayEvery : baseEvery;

        if (guard && isIterateeCall(collection, predicate, guard)) {
          predicate = undefined;
        }

        return func(collection, getIteratee(predicate, 3));
      }
      /**
       * Iterates over elements of `collection`, returning an array of all elements
       * `predicate` returns truthy for. The predicate is invoked with three
       * arguments: (value, index|key, collection).
       *
       * **Note:** Unlike `_.remove`, this method returns a new array.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} [predicate=_.identity] The function invoked per iteration.
       * @returns {Array} Returns the new filtered array.
       * @see _.reject
       * @example
       *
       * var users = [
       *   { 'user': 'barney', 'age': 36, 'active': true },
       *   { 'user': 'fred',   'age': 40, 'active': false }
       * ];
       *
       * _.filter(users, function(o) { return !o.active; });
       * // => objects for ['fred']
       *
       * // The `_.matches` iteratee shorthand.
       * _.filter(users, { 'age': 36, 'active': true });
       * // => objects for ['barney']
       *
       * // The `_.matchesProperty` iteratee shorthand.
       * _.filter(users, ['active', false]);
       * // => objects for ['fred']
       *
       * // The `_.property` iteratee shorthand.
       * _.filter(users, 'active');
       * // => objects for ['barney']
       */


      function filter(collection, predicate) {
        var func = isArray(collection) ? arrayFilter : baseFilter;
        return func(collection, getIteratee(predicate, 3));
      }
      /**
       * Iterates over elements of `collection`, returning the first element
       * `predicate` returns truthy for. The predicate is invoked with three
       * arguments: (value, index|key, collection).
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Collection
       * @param {Array|Object} collection The collection to inspect.
       * @param {Function} [predicate=_.identity] The function invoked per iteration.
       * @param {number} [fromIndex=0] The index to search from.
       * @returns {*} Returns the matched element, else `undefined`.
       * @example
       *
       * var users = [
       *   { 'user': 'barney',  'age': 36, 'active': true },
       *   { 'user': 'fred',    'age': 40, 'active': false },
       *   { 'user': 'pebbles', 'age': 1,  'active': true }
       * ];
       *
       * _.find(users, function(o) { return o.age < 40; });
       * // => object for 'barney'
       *
       * // The `_.matches` iteratee shorthand.
       * _.find(users, { 'age': 1, 'active': true });
       * // => object for 'pebbles'
       *
       * // The `_.matchesProperty` iteratee shorthand.
       * _.find(users, ['active', false]);
       * // => object for 'fred'
       *
       * // The `_.property` iteratee shorthand.
       * _.find(users, 'active');
       * // => object for 'barney'
       */


      var find = createFind(findIndex);
      /**
       * This method is like `_.find` except that it iterates over elements of
       * `collection` from right to left.
       *
       * @static
       * @memberOf _
       * @since 2.0.0
       * @category Collection
       * @param {Array|Object} collection The collection to inspect.
       * @param {Function} [predicate=_.identity] The function invoked per iteration.
       * @param {number} [fromIndex=collection.length-1] The index to search from.
       * @returns {*} Returns the matched element, else `undefined`.
       * @example
       *
       * _.findLast([1, 2, 3, 4], function(n) {
       *   return n % 2 == 1;
       * });
       * // => 3
       */

      var findLast = createFind(findLastIndex);
      /**
       * Creates a flattened array of values by running each element in `collection`
       * thru `iteratee` and flattening the mapped results. The iteratee is invoked
       * with three arguments: (value, index|key, collection).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} [iteratee=_.identity] The function invoked per iteration.
       * @returns {Array} Returns the new flattened array.
       * @example
       *
       * function duplicate(n) {
       *   return [n, n];
       * }
       *
       * _.flatMap([1, 2], duplicate);
       * // => [1, 1, 2, 2]
       */

      function flatMap(collection, iteratee) {
        return baseFlatten(map(collection, iteratee), 1);
      }
      /**
       * This method is like `_.flatMap` except that it recursively flattens the
       * mapped results.
       *
       * @static
       * @memberOf _
       * @since 4.7.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} [iteratee=_.identity] The function invoked per iteration.
       * @returns {Array} Returns the new flattened array.
       * @example
       *
       * function duplicate(n) {
       *   return [[[n, n]]];
       * }
       *
       * _.flatMapDeep([1, 2], duplicate);
       * // => [1, 1, 2, 2]
       */


      function flatMapDeep(collection, iteratee) {
        return baseFlatten(map(collection, iteratee), INFINITY);
      }
      /**
       * This method is like `_.flatMap` except that it recursively flattens the
       * mapped results up to `depth` times.
       *
       * @static
       * @memberOf _
       * @since 4.7.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} [iteratee=_.identity] The function invoked per iteration.
       * @param {number} [depth=1] The maximum recursion depth.
       * @returns {Array} Returns the new flattened array.
       * @example
       *
       * function duplicate(n) {
       *   return [[[n, n]]];
       * }
       *
       * _.flatMapDepth([1, 2], duplicate, 2);
       * // => [[1, 1], [2, 2]]
       */


      function flatMapDepth(collection, iteratee, depth) {
        depth = depth === undefined ? 1 : toInteger(depth);
        return baseFlatten(map(collection, iteratee), depth);
      }
      /**
       * Iterates over elements of `collection` and invokes `iteratee` for each element.
       * The iteratee is invoked with three arguments: (value, index|key, collection).
       * Iteratee functions may exit iteration early by explicitly returning `false`.
       *
       * **Note:** As with other "Collections" methods, objects with a "length"
       * property are iterated like arrays. To avoid this behavior use `_.forIn`
       * or `_.forOwn` for object iteration.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @alias each
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} [iteratee=_.identity] The function invoked per iteration.
       * @returns {Array|Object} Returns `collection`.
       * @see _.forEachRight
       * @example
       *
       * _.forEach([1, 2], function(value) {
       *   console.log(value);
       * });
       * // => Logs `1` then `2`.
       *
       * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
       *   console.log(key);
       * });
       * // => Logs 'a' then 'b' (iteration order is not guaranteed).
       */


      function forEach(collection, iteratee) {
        var func = isArray(collection) ? arrayEach : baseEach;
        return func(collection, getIteratee(iteratee, 3));
      }
      /**
       * This method is like `_.forEach` except that it iterates over elements of
       * `collection` from right to left.
       *
       * @static
       * @memberOf _
       * @since 2.0.0
       * @alias eachRight
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} [iteratee=_.identity] The function invoked per iteration.
       * @returns {Array|Object} Returns `collection`.
       * @see _.forEach
       * @example
       *
       * _.forEachRight([1, 2], function(value) {
       *   console.log(value);
       * });
       * // => Logs `2` then `1`.
       */


      function forEachRight(collection, iteratee) {
        var func = isArray(collection) ? arrayEachRight : baseEachRight;
        return func(collection, getIteratee(iteratee, 3));
      }
      /**
       * Creates an object composed of keys generated from the results of running
       * each element of `collection` thru `iteratee`. The order of grouped values
       * is determined by the order they occur in `collection`. The corresponding
       * value of each key is an array of elements responsible for generating the
       * key. The iteratee is invoked with one argument: (value).
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
       * @returns {Object} Returns the composed aggregate object.
       * @example
       *
       * _.groupBy([6.1, 4.2, 6.3], Math.floor);
       * // => { '4': [4.2], '6': [6.1, 6.3] }
       *
       * // The `_.property` iteratee shorthand.
       * _.groupBy(['one', 'two', 'three'], 'length');
       * // => { '3': ['one', 'two'], '5': ['three'] }
       */


      var groupBy = createAggregator(function (result, value, key) {
        if (hasOwnProperty.call(result, key)) {
          result[key].push(value);
        } else {
          baseAssignValue(result, key, [value]);
        }
      });
      /**
       * Checks if `value` is in `collection`. If `collection` is a string, it's
       * checked for a substring of `value`, otherwise
       * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
       * is used for equality comparisons. If `fromIndex` is negative, it's used as
       * the offset from the end of `collection`.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Collection
       * @param {Array|Object|string} collection The collection to inspect.
       * @param {*} value The value to search for.
       * @param {number} [fromIndex=0] The index to search from.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
       * @returns {boolean} Returns `true` if `value` is found, else `false`.
       * @example
       *
       * _.includes([1, 2, 3], 1);
       * // => true
       *
       * _.includes([1, 2, 3], 1, 2);
       * // => false
       *
       * _.includes({ 'a': 1, 'b': 2 }, 1);
       * // => true
       *
       * _.includes('abcd', 'bc');
       * // => true
       */

      function includes(collection, value, fromIndex, guard) {
        collection = isArrayLike(collection) ? collection : values(collection);
        fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
        var length = collection.length;

        if (fromIndex < 0) {
          fromIndex = nativeMax(length + fromIndex, 0);
        }

        return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
      }
      /**
       * Invokes the method at `path` of each element in `collection`, returning
       * an array of the results of each invoked method. Any additional arguments
       * are provided to each invoked method. If `path` is a function, it's invoked
       * for, and `this` bound to, each element in `collection`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Array|Function|string} path The path of the method to invoke or
       *  the function invoked per iteration.
       * @param {...*} [args] The arguments to invoke each method with.
       * @returns {Array} Returns the array of results.
       * @example
       *
       * _.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
       * // => [[1, 5, 7], [1, 2, 3]]
       *
       * _.invokeMap([123, 456], String.prototype.split, '');
       * // => [['1', '2', '3'], ['4', '5', '6']]
       */


      var invokeMap = baseRest(function (collection, path, args) {
        var index = -1,
            isFunc = typeof path == 'function',
            result = isArrayLike(collection) ? Array(collection.length) : [];
        baseEach(collection, function (value) {
          result[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
        });
        return result;
      });
      /**
       * Creates an object composed of keys generated from the results of running
       * each element of `collection` thru `iteratee`. The corresponding value of
       * each key is the last element responsible for generating the key. The
       * iteratee is invoked with one argument: (value).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
       * @returns {Object} Returns the composed aggregate object.
       * @example
       *
       * var array = [
       *   { 'dir': 'left', 'code': 97 },
       *   { 'dir': 'right', 'code': 100 }
       * ];
       *
       * _.keyBy(array, function(o) {
       *   return String.fromCharCode(o.code);
       * });
       * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
       *
       * _.keyBy(array, 'dir');
       * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
       */

      var keyBy = createAggregator(function (result, value, key) {
        baseAssignValue(result, key, value);
      });
      /**
       * Creates an array of values by running each element in `collection` thru
       * `iteratee`. The iteratee is invoked with three arguments:
       * (value, index|key, collection).
       *
       * Many lodash methods are guarded to work as iteratees for methods like
       * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
       *
       * The guarded methods are:
       * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
       * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
       * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
       * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} [iteratee=_.identity] The function invoked per iteration.
       * @returns {Array} Returns the new mapped array.
       * @example
       *
       * function square(n) {
       *   return n * n;
       * }
       *
       * _.map([4, 8], square);
       * // => [16, 64]
       *
       * _.map({ 'a': 4, 'b': 8 }, square);
       * // => [16, 64] (iteration order is not guaranteed)
       *
       * var users = [
       *   { 'user': 'barney' },
       *   { 'user': 'fred' }
       * ];
       *
       * // The `_.property` iteratee shorthand.
       * _.map(users, 'user');
       * // => ['barney', 'fred']
       */

      function map(collection, iteratee) {
        var func = isArray(collection) ? arrayMap : baseMap;
        return func(collection, getIteratee(iteratee, 3));
      }
      /**
       * This method is like `_.sortBy` except that it allows specifying the sort
       * orders of the iteratees to sort by. If `orders` is unspecified, all values
       * are sorted in ascending order. Otherwise, specify an order of "desc" for
       * descending or "asc" for ascending sort order of corresponding values.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[_.identity]]
       *  The iteratees to sort by.
       * @param {string[]} [orders] The sort orders of `iteratees`.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
       * @returns {Array} Returns the new sorted array.
       * @example
       *
       * var users = [
       *   { 'user': 'fred',   'age': 48 },
       *   { 'user': 'barney', 'age': 34 },
       *   { 'user': 'fred',   'age': 40 },
       *   { 'user': 'barney', 'age': 36 }
       * ];
       *
       * // Sort by `user` in ascending order and by `age` in descending order.
       * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
       * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
       */


      function orderBy(collection, iteratees, orders, guard) {
        if (collection == null) {
          return [];
        }

        if (!isArray(iteratees)) {
          iteratees = iteratees == null ? [] : [iteratees];
        }

        orders = guard ? undefined : orders;

        if (!isArray(orders)) {
          orders = orders == null ? [] : [orders];
        }

        return baseOrderBy(collection, iteratees, orders);
      }
      /**
       * Creates an array of elements split into two groups, the first of which
       * contains elements `predicate` returns truthy for, the second of which
       * contains elements `predicate` returns falsey for. The predicate is
       * invoked with one argument: (value).
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} [predicate=_.identity] The function invoked per iteration.
       * @returns {Array} Returns the array of grouped elements.
       * @example
       *
       * var users = [
       *   { 'user': 'barney',  'age': 36, 'active': false },
       *   { 'user': 'fred',    'age': 40, 'active': true },
       *   { 'user': 'pebbles', 'age': 1,  'active': false }
       * ];
       *
       * _.partition(users, function(o) { return o.active; });
       * // => objects for [['fred'], ['barney', 'pebbles']]
       *
       * // The `_.matches` iteratee shorthand.
       * _.partition(users, { 'age': 1, 'active': false });
       * // => objects for [['pebbles'], ['barney', 'fred']]
       *
       * // The `_.matchesProperty` iteratee shorthand.
       * _.partition(users, ['active', false]);
       * // => objects for [['barney', 'pebbles'], ['fred']]
       *
       * // The `_.property` iteratee shorthand.
       * _.partition(users, 'active');
       * // => objects for [['fred'], ['barney', 'pebbles']]
       */


      var partition = createAggregator(function (result, value, key) {
        result[key ? 0 : 1].push(value);
      }, function () {
        return [[], []];
      });
      /**
       * Reduces `collection` to a value which is the accumulated result of running
       * each element in `collection` thru `iteratee`, where each successive
       * invocation is supplied the return value of the previous. If `accumulator`
       * is not given, the first element of `collection` is used as the initial
       * value. The iteratee is invoked with four arguments:
       * (accumulator, value, index|key, collection).
       *
       * Many lodash methods are guarded to work as iteratees for methods like
       * `_.reduce`, `_.reduceRight`, and `_.transform`.
       *
       * The guarded methods are:
       * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
       * and `sortBy`
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} [iteratee=_.identity] The function invoked per iteration.
       * @param {*} [accumulator] The initial value.
       * @returns {*} Returns the accumulated value.
       * @see _.reduceRight
       * @example
       *
       * _.reduce([1, 2], function(sum, n) {
       *   return sum + n;
       * }, 0);
       * // => 3
       *
       * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
       *   (result[value] || (result[value] = [])).push(key);
       *   return result;
       * }, {});
       * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
       */

      function reduce(collection, iteratee, accumulator) {
        var func = isArray(collection) ? arrayReduce : baseReduce,
            initAccum = arguments.length < 3;
        return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEach);
      }
      /**
       * This method is like `_.reduce` except that it iterates over elements of
       * `collection` from right to left.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} [iteratee=_.identity] The function invoked per iteration.
       * @param {*} [accumulator] The initial value.
       * @returns {*} Returns the accumulated value.
       * @see _.reduce
       * @example
       *
       * var array = [[0, 1], [2, 3], [4, 5]];
       *
       * _.reduceRight(array, function(flattened, other) {
       *   return flattened.concat(other);
       * }, []);
       * // => [4, 5, 2, 3, 0, 1]
       */


      function reduceRight(collection, iteratee, accumulator) {
        var func = isArray(collection) ? arrayReduceRight : baseReduce,
            initAccum = arguments.length < 3;
        return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEachRight);
      }
      /**
       * The opposite of `_.filter`; this method returns the elements of `collection`
       * that `predicate` does **not** return truthy for.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} [predicate=_.identity] The function invoked per iteration.
       * @returns {Array} Returns the new filtered array.
       * @see _.filter
       * @example
       *
       * var users = [
       *   { 'user': 'barney', 'age': 36, 'active': false },
       *   { 'user': 'fred',   'age': 40, 'active': true }
       * ];
       *
       * _.reject(users, function(o) { return !o.active; });
       * // => objects for ['fred']
       *
       * // The `_.matches` iteratee shorthand.
       * _.reject(users, { 'age': 40, 'active': true });
       * // => objects for ['barney']
       *
       * // The `_.matchesProperty` iteratee shorthand.
       * _.reject(users, ['active', false]);
       * // => objects for ['fred']
       *
       * // The `_.property` iteratee shorthand.
       * _.reject(users, 'active');
       * // => objects for ['barney']
       */


      function reject(collection, predicate) {
        var func = isArray(collection) ? arrayFilter : baseFilter;
        return func(collection, negate(getIteratee(predicate, 3)));
      }
      /**
       * Gets a random element from `collection`.
       *
       * @static
       * @memberOf _
       * @since 2.0.0
       * @category Collection
       * @param {Array|Object} collection The collection to sample.
       * @returns {*} Returns the random element.
       * @example
       *
       * _.sample([1, 2, 3, 4]);
       * // => 2
       */


      function sample(collection) {
        var func = isArray(collection) ? arraySample : baseSample;
        return func(collection);
      }
      /**
       * Gets `n` random elements at unique keys from `collection` up to the
       * size of `collection`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Collection
       * @param {Array|Object} collection The collection to sample.
       * @param {number} [n=1] The number of elements to sample.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {Array} Returns the random elements.
       * @example
       *
       * _.sampleSize([1, 2, 3], 2);
       * // => [3, 1]
       *
       * _.sampleSize([1, 2, 3], 4);
       * // => [2, 3, 1]
       */


      function sampleSize(collection, n, guard) {
        if (guard ? isIterateeCall(collection, n, guard) : n === undefined) {
          n = 1;
        } else {
          n = toInteger(n);
        }

        var func = isArray(collection) ? arraySampleSize : baseSampleSize;
        return func(collection, n);
      }
      /**
       * Creates an array of shuffled values, using a version of the
       * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Collection
       * @param {Array|Object} collection The collection to shuffle.
       * @returns {Array} Returns the new shuffled array.
       * @example
       *
       * _.shuffle([1, 2, 3, 4]);
       * // => [4, 1, 3, 2]
       */


      function shuffle(collection) {
        var func = isArray(collection) ? arrayShuffle : baseShuffle;
        return func(collection);
      }
      /**
       * Gets the size of `collection` by returning its length for array-like
       * values or the number of own enumerable string keyed properties for objects.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Collection
       * @param {Array|Object|string} collection The collection to inspect.
       * @returns {number} Returns the collection size.
       * @example
       *
       * _.size([1, 2, 3]);
       * // => 3
       *
       * _.size({ 'a': 1, 'b': 2 });
       * // => 2
       *
       * _.size('pebbles');
       * // => 7
       */


      function size(collection) {
        if (collection == null) {
          return 0;
        }

        if (isArrayLike(collection)) {
          return isString(collection) ? stringSize(collection) : collection.length;
        }

        var tag = getTag(collection);

        if (tag == mapTag || tag == setTag) {
          return collection.size;
        }

        return baseKeys(collection).length;
      }
      /**
       * Checks if `predicate` returns truthy for **any** element of `collection`.
       * Iteration is stopped once `predicate` returns truthy. The predicate is
       * invoked with three arguments: (value, index|key, collection).
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} [predicate=_.identity] The function invoked per iteration.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {boolean} Returns `true` if any element passes the predicate check,
       *  else `false`.
       * @example
       *
       * _.some([null, 0, 'yes', false], Boolean);
       * // => true
       *
       * var users = [
       *   { 'user': 'barney', 'active': true },
       *   { 'user': 'fred',   'active': false }
       * ];
       *
       * // The `_.matches` iteratee shorthand.
       * _.some(users, { 'user': 'barney', 'active': false });
       * // => false
       *
       * // The `_.matchesProperty` iteratee shorthand.
       * _.some(users, ['active', false]);
       * // => true
       *
       * // The `_.property` iteratee shorthand.
       * _.some(users, 'active');
       * // => true
       */


      function some(collection, predicate, guard) {
        var func = isArray(collection) ? arraySome : baseSome;

        if (guard && isIterateeCall(collection, predicate, guard)) {
          predicate = undefined;
        }

        return func(collection, getIteratee(predicate, 3));
      }
      /**
       * Creates an array of elements, sorted in ascending order by the results of
       * running each element in a collection thru each iteratee. This method
       * performs a stable sort, that is, it preserves the original sort order of
       * equal elements. The iteratees are invoked with one argument: (value).
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {...(Function|Function[])} [iteratees=[_.identity]]
       *  The iteratees to sort by.
       * @returns {Array} Returns the new sorted array.
       * @example
       *
       * var users = [
       *   { 'user': 'fred',   'age': 48 },
       *   { 'user': 'barney', 'age': 36 },
       *   { 'user': 'fred',   'age': 40 },
       *   { 'user': 'barney', 'age': 34 }
       * ];
       *
       * _.sortBy(users, [function(o) { return o.user; }]);
       * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
       *
       * _.sortBy(users, ['user', 'age']);
       * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
       */


      var sortBy = baseRest(function (collection, iteratees) {
        if (collection == null) {
          return [];
        }

        var length = iteratees.length;

        if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
          iteratees = [];
        } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
          iteratees = [iteratees[0]];
        }

        return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
      });
      /*------------------------------------------------------------------------*/

      /**
       * Gets the timestamp of the number of milliseconds that have elapsed since
       * the Unix epoch (1 January 1970 00:00:00 UTC).
       *
       * @static
       * @memberOf _
       * @since 2.4.0
       * @category Date
       * @returns {number} Returns the timestamp.
       * @example
       *
       * _.defer(function(stamp) {
       *   console.log(_.now() - stamp);
       * }, _.now());
       * // => Logs the number of milliseconds it took for the deferred invocation.
       */

      var now = ctxNow || function () {
        return root.Date.now();
      };
      /*------------------------------------------------------------------------*/

      /**
       * The opposite of `_.before`; this method creates a function that invokes
       * `func` once it's called `n` or more times.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Function
       * @param {number} n The number of calls before `func` is invoked.
       * @param {Function} func The function to restrict.
       * @returns {Function} Returns the new restricted function.
       * @example
       *
       * var saves = ['profile', 'settings'];
       *
       * var done = _.after(saves.length, function() {
       *   console.log('done saving!');
       * });
       *
       * _.forEach(saves, function(type) {
       *   asyncSave({ 'type': type, 'complete': done });
       * });
       * // => Logs 'done saving!' after the two async saves have completed.
       */


      function after(n, func) {
        if (typeof func != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }

        n = toInteger(n);
        return function () {
          if (--n < 1) {
            return func.apply(this, arguments);
          }
        };
      }
      /**
       * Creates a function that invokes `func`, with up to `n` arguments,
       * ignoring any additional arguments.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Function
       * @param {Function} func The function to cap arguments for.
       * @param {number} [n=func.length] The arity cap.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {Function} Returns the new capped function.
       * @example
       *
       * _.map(['6', '8', '10'], _.ary(parseInt, 1));
       * // => [6, 8, 10]
       */


      function ary(func, n, guard) {
        n = guard ? undefined : n;
        n = func && n == null ? func.length : n;
        return createWrap(func, WRAP_ARY_FLAG, undefined, undefined, undefined, undefined, n);
      }
      /**
       * Creates a function that invokes `func`, with the `this` binding and arguments
       * of the created function, while it's called less than `n` times. Subsequent
       * calls to the created function return the result of the last `func` invocation.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Function
       * @param {number} n The number of calls at which `func` is no longer invoked.
       * @param {Function} func The function to restrict.
       * @returns {Function} Returns the new restricted function.
       * @example
       *
       * jQuery(element).on('click', _.before(5, addContactToList));
       * // => Allows adding up to 4 contacts to the list.
       */


      function before(n, func) {
        var result;

        if (typeof func != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }

        n = toInteger(n);
        return function () {
          if (--n > 0) {
            result = func.apply(this, arguments);
          }

          if (n <= 1) {
            func = undefined;
          }

          return result;
        };
      }
      /**
       * Creates a function that invokes `func` with the `this` binding of `thisArg`
       * and `partials` prepended to the arguments it receives.
       *
       * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
       * may be used as a placeholder for partially applied arguments.
       *
       * **Note:** Unlike native `Function#bind`, this method doesn't set the "length"
       * property of bound functions.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Function
       * @param {Function} func The function to bind.
       * @param {*} thisArg The `this` binding of `func`.
       * @param {...*} [partials] The arguments to be partially applied.
       * @returns {Function} Returns the new bound function.
       * @example
       *
       * function greet(greeting, punctuation) {
       *   return greeting + ' ' + this.user + punctuation;
       * }
       *
       * var object = { 'user': 'fred' };
       *
       * var bound = _.bind(greet, object, 'hi');
       * bound('!');
       * // => 'hi fred!'
       *
       * // Bound with placeholders.
       * var bound = _.bind(greet, object, _, '!');
       * bound('hi');
       * // => 'hi fred!'
       */


      var bind = baseRest(function (func, thisArg, partials) {
        var bitmask = WRAP_BIND_FLAG;

        if (partials.length) {
          var holders = replaceHolders(partials, getHolder(bind));
          bitmask |= WRAP_PARTIAL_FLAG;
        }

        return createWrap(func, bitmask, thisArg, partials, holders);
      });
      /**
       * Creates a function that invokes the method at `object[key]` with `partials`
       * prepended to the arguments it receives.
       *
       * This method differs from `_.bind` by allowing bound functions to reference
       * methods that may be redefined or don't yet exist. See
       * [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
       * for more details.
       *
       * The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
       * builds, may be used as a placeholder for partially applied arguments.
       *
       * @static
       * @memberOf _
       * @since 0.10.0
       * @category Function
       * @param {Object} object The object to invoke the method on.
       * @param {string} key The key of the method.
       * @param {...*} [partials] The arguments to be partially applied.
       * @returns {Function} Returns the new bound function.
       * @example
       *
       * var object = {
       *   'user': 'fred',
       *   'greet': function(greeting, punctuation) {
       *     return greeting + ' ' + this.user + punctuation;
       *   }
       * };
       *
       * var bound = _.bindKey(object, 'greet', 'hi');
       * bound('!');
       * // => 'hi fred!'
       *
       * object.greet = function(greeting, punctuation) {
       *   return greeting + 'ya ' + this.user + punctuation;
       * };
       *
       * bound('!');
       * // => 'hiya fred!'
       *
       * // Bound with placeholders.
       * var bound = _.bindKey(object, 'greet', _, '!');
       * bound('hi');
       * // => 'hiya fred!'
       */

      var bindKey = baseRest(function (object, key, partials) {
        var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;

        if (partials.length) {
          var holders = replaceHolders(partials, getHolder(bindKey));
          bitmask |= WRAP_PARTIAL_FLAG;
        }

        return createWrap(key, bitmask, object, partials, holders);
      });
      /**
       * Creates a function that accepts arguments of `func` and either invokes
       * `func` returning its result, if at least `arity` number of arguments have
       * been provided, or returns a function that accepts the remaining `func`
       * arguments, and so on. The arity of `func` may be specified if `func.length`
       * is not sufficient.
       *
       * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
       * may be used as a placeholder for provided arguments.
       *
       * **Note:** This method doesn't set the "length" property of curried functions.
       *
       * @static
       * @memberOf _
       * @since 2.0.0
       * @category Function
       * @param {Function} func The function to curry.
       * @param {number} [arity=func.length] The arity of `func`.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {Function} Returns the new curried function.
       * @example
       *
       * var abc = function(a, b, c) {
       *   return [a, b, c];
       * };
       *
       * var curried = _.curry(abc);
       *
       * curried(1)(2)(3);
       * // => [1, 2, 3]
       *
       * curried(1, 2)(3);
       * // => [1, 2, 3]
       *
       * curried(1, 2, 3);
       * // => [1, 2, 3]
       *
       * // Curried with placeholders.
       * curried(1)(_, 3)(2);
       * // => [1, 2, 3]
       */

      function curry(func, arity, guard) {
        arity = guard ? undefined : arity;
        var result = createWrap(func, WRAP_CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
        result.placeholder = curry.placeholder;
        return result;
      }
      /**
       * This method is like `_.curry` except that arguments are applied to `func`
       * in the manner of `_.partialRight` instead of `_.partial`.
       *
       * The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
       * builds, may be used as a placeholder for provided arguments.
       *
       * **Note:** This method doesn't set the "length" property of curried functions.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Function
       * @param {Function} func The function to curry.
       * @param {number} [arity=func.length] The arity of `func`.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {Function} Returns the new curried function.
       * @example
       *
       * var abc = function(a, b, c) {
       *   return [a, b, c];
       * };
       *
       * var curried = _.curryRight(abc);
       *
       * curried(3)(2)(1);
       * // => [1, 2, 3]
       *
       * curried(2, 3)(1);
       * // => [1, 2, 3]
       *
       * curried(1, 2, 3);
       * // => [1, 2, 3]
       *
       * // Curried with placeholders.
       * curried(3)(1, _)(2);
       * // => [1, 2, 3]
       */


      function curryRight(func, arity, guard) {
        arity = guard ? undefined : arity;
        var result = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
        result.placeholder = curryRight.placeholder;
        return result;
      }
      /**
       * Creates a debounced function that delays invoking `func` until after `wait`
       * milliseconds have elapsed since the last time the debounced function was
       * invoked. The debounced function comes with a `cancel` method to cancel
       * delayed `func` invocations and a `flush` method to immediately invoke them.
       * Provide `options` to indicate whether `func` should be invoked on the
       * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
       * with the last arguments provided to the debounced function. Subsequent
       * calls to the debounced function return the result of the last `func`
       * invocation.
       *
       * **Note:** If `leading` and `trailing` options are `true`, `func` is
       * invoked on the trailing edge of the timeout only if the debounced function
       * is invoked more than once during the `wait` timeout.
       *
       * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
       * until to the next tick, similar to `setTimeout` with a timeout of `0`.
       *
       * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
       * for details over the differences between `_.debounce` and `_.throttle`.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Function
       * @param {Function} func The function to debounce.
       * @param {number} [wait=0] The number of milliseconds to delay.
       * @param {Object} [options={}] The options object.
       * @param {boolean} [options.leading=false]
       *  Specify invoking on the leading edge of the timeout.
       * @param {number} [options.maxWait]
       *  The maximum time `func` is allowed to be delayed before it's invoked.
       * @param {boolean} [options.trailing=true]
       *  Specify invoking on the trailing edge of the timeout.
       * @returns {Function} Returns the new debounced function.
       * @example
       *
       * // Avoid costly calculations while the window size is in flux.
       * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
       *
       * // Invoke `sendMail` when clicked, debouncing subsequent calls.
       * jQuery(element).on('click', _.debounce(sendMail, 300, {
       *   'leading': true,
       *   'trailing': false
       * }));
       *
       * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
       * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
       * var source = new EventSource('/stream');
       * jQuery(source).on('message', debounced);
       *
       * // Cancel the trailing debounced invocation.
       * jQuery(window).on('popstate', debounced.cancel);
       */


      function debounce(func, wait, options) {
        var lastArgs,
            lastThis,
            maxWait,
            result,
            timerId,
            lastCallTime,
            lastInvokeTime = 0,
            leading = false,
            maxing = false,
            trailing = true;

        if (typeof func != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }

        wait = toNumber(wait) || 0;

        if (isObject(options)) {
          leading = !!options.leading;
          maxing = 'maxWait' in options;
          maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
          trailing = 'trailing' in options ? !!options.trailing : trailing;
        }

        function invokeFunc(time) {
          var args = lastArgs,
              thisArg = lastThis;
          lastArgs = lastThis = undefined;
          lastInvokeTime = time;
          result = func.apply(thisArg, args);
          return result;
        }

        function leadingEdge(time) {
          // Reset any `maxWait` timer.
          lastInvokeTime = time; // Start the timer for the trailing edge.

          timerId = setTimeout(timerExpired, wait); // Invoke the leading edge.

          return leading ? invokeFunc(time) : result;
        }

        function remainingWait(time) {
          var timeSinceLastCall = time - lastCallTime,
              timeSinceLastInvoke = time - lastInvokeTime,
              timeWaiting = wait - timeSinceLastCall;
          return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
        }

        function shouldInvoke(time) {
          var timeSinceLastCall = time - lastCallTime,
              timeSinceLastInvoke = time - lastInvokeTime; // Either this is the first call, activity has stopped and we're at the
          // trailing edge, the system time has gone backwards and we're treating
          // it as the trailing edge, or we've hit the `maxWait` limit.

          return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
        }

        function timerExpired() {
          var time = now();

          if (shouldInvoke(time)) {
            return trailingEdge(time);
          } // Restart the timer.


          timerId = setTimeout(timerExpired, remainingWait(time));
        }

        function trailingEdge(time) {
          timerId = undefined; // Only invoke if we have `lastArgs` which means `func` has been
          // debounced at least once.

          if (trailing && lastArgs) {
            return invokeFunc(time);
          }

          lastArgs = lastThis = undefined;
          return result;
        }

        function cancel() {
          if (timerId !== undefined) {
            clearTimeout(timerId);
          }

          lastInvokeTime = 0;
          lastArgs = lastCallTime = lastThis = timerId = undefined;
        }

        function flush() {
          return timerId === undefined ? result : trailingEdge(now());
        }

        function debounced() {
          var time = now(),
              isInvoking = shouldInvoke(time);
          lastArgs = arguments;
          lastThis = this;
          lastCallTime = time;

          if (isInvoking) {
            if (timerId === undefined) {
              return leadingEdge(lastCallTime);
            }

            if (maxing) {
              // Handle invocations in a tight loop.
              clearTimeout(timerId);
              timerId = setTimeout(timerExpired, wait);
              return invokeFunc(lastCallTime);
            }
          }

          if (timerId === undefined) {
            timerId = setTimeout(timerExpired, wait);
          }

          return result;
        }

        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
      }
      /**
       * Defers invoking the `func` until the current call stack has cleared. Any
       * additional arguments are provided to `func` when it's invoked.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Function
       * @param {Function} func The function to defer.
       * @param {...*} [args] The arguments to invoke `func` with.
       * @returns {number} Returns the timer id.
       * @example
       *
       * _.defer(function(text) {
       *   console.log(text);
       * }, 'deferred');
       * // => Logs 'deferred' after one millisecond.
       */


      var defer = baseRest(function (func, args) {
        return baseDelay(func, 1, args);
      });
      /**
       * Invokes `func` after `wait` milliseconds. Any additional arguments are
       * provided to `func` when it's invoked.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Function
       * @param {Function} func The function to delay.
       * @param {number} wait The number of milliseconds to delay invocation.
       * @param {...*} [args] The arguments to invoke `func` with.
       * @returns {number} Returns the timer id.
       * @example
       *
       * _.delay(function(text) {
       *   console.log(text);
       * }, 1000, 'later');
       * // => Logs 'later' after one second.
       */

      var delay = baseRest(function (func, wait, args) {
        return baseDelay(func, toNumber(wait) || 0, args);
      });
      /**
       * Creates a function that invokes `func` with arguments reversed.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Function
       * @param {Function} func The function to flip arguments for.
       * @returns {Function} Returns the new flipped function.
       * @example
       *
       * var flipped = _.flip(function() {
       *   return _.toArray(arguments);
       * });
       *
       * flipped('a', 'b', 'c', 'd');
       * // => ['d', 'c', 'b', 'a']
       */

      function flip(func) {
        return createWrap(func, WRAP_FLIP_FLAG);
      }
      /**
       * Creates a function that memoizes the result of `func`. If `resolver` is
       * provided, it determines the cache key for storing the result based on the
       * arguments provided to the memoized function. By default, the first argument
       * provided to the memoized function is used as the map cache key. The `func`
       * is invoked with the `this` binding of the memoized function.
       *
       * **Note:** The cache is exposed as the `cache` property on the memoized
       * function. Its creation may be customized by replacing the `_.memoize.Cache`
       * constructor with one whose instances implement the
       * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
       * method interface of `clear`, `delete`, `get`, `has`, and `set`.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Function
       * @param {Function} func The function to have its output memoized.
       * @param {Function} [resolver] The function to resolve the cache key.
       * @returns {Function} Returns the new memoized function.
       * @example
       *
       * var object = { 'a': 1, 'b': 2 };
       * var other = { 'c': 3, 'd': 4 };
       *
       * var values = _.memoize(_.values);
       * values(object);
       * // => [1, 2]
       *
       * values(other);
       * // => [3, 4]
       *
       * object.a = 2;
       * values(object);
       * // => [1, 2]
       *
       * // Modify the result cache.
       * values.cache.set(object, ['a', 'b']);
       * values(object);
       * // => ['a', 'b']
       *
       * // Replace `_.memoize.Cache`.
       * _.memoize.Cache = WeakMap;
       */


      function memoize(func, resolver) {
        if (typeof func != 'function' || resolver != null && typeof resolver != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }

        var memoized = function () {
          var args = arguments,
              key = resolver ? resolver.apply(this, args) : args[0],
              cache = memoized.cache;

          if (cache.has(key)) {
            return cache.get(key);
          }

          var result = func.apply(this, args);
          memoized.cache = cache.set(key, result) || cache;
          return result;
        };

        memoized.cache = new (memoize.Cache || MapCache)();
        return memoized;
      } // Expose `MapCache`.


      memoize.Cache = MapCache;
      /**
       * Creates a function that negates the result of the predicate `func`. The
       * `func` predicate is invoked with the `this` binding and arguments of the
       * created function.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Function
       * @param {Function} predicate The predicate to negate.
       * @returns {Function} Returns the new negated function.
       * @example
       *
       * function isEven(n) {
       *   return n % 2 == 0;
       * }
       *
       * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
       * // => [1, 3, 5]
       */

      function negate(predicate) {
        if (typeof predicate != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }

        return function () {
          var args = arguments;

          switch (args.length) {
            case 0:
              return !predicate.call(this);

            case 1:
              return !predicate.call(this, args[0]);

            case 2:
              return !predicate.call(this, args[0], args[1]);

            case 3:
              return !predicate.call(this, args[0], args[1], args[2]);
          }

          return !predicate.apply(this, args);
        };
      }
      /**
       * Creates a function that is restricted to invoking `func` once. Repeat calls
       * to the function return the value of the first invocation. The `func` is
       * invoked with the `this` binding and arguments of the created function.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Function
       * @param {Function} func The function to restrict.
       * @returns {Function} Returns the new restricted function.
       * @example
       *
       * var initialize = _.once(createApplication);
       * initialize();
       * initialize();
       * // => `createApplication` is invoked once
       */


      function once(func) {
        return before(2, func);
      }
      /**
       * Creates a function that invokes `func` with its arguments transformed.
       *
       * @static
       * @since 4.0.0
       * @memberOf _
       * @category Function
       * @param {Function} func The function to wrap.
       * @param {...(Function|Function[])} [transforms=[_.identity]]
       *  The argument transforms.
       * @returns {Function} Returns the new function.
       * @example
       *
       * function doubled(n) {
       *   return n * 2;
       * }
       *
       * function square(n) {
       *   return n * n;
       * }
       *
       * var func = _.overArgs(function(x, y) {
       *   return [x, y];
       * }, [square, doubled]);
       *
       * func(9, 3);
       * // => [81, 6]
       *
       * func(10, 5);
       * // => [100, 10]
       */


      var overArgs = castRest(function (func, transforms) {
        transforms = transforms.length == 1 && isArray(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
        var funcsLength = transforms.length;
        return baseRest(function (args) {
          var index = -1,
              length = nativeMin(args.length, funcsLength);

          while (++index < length) {
            args[index] = transforms[index].call(this, args[index]);
          }

          return apply(func, this, args);
        });
      });
      /**
       * Creates a function that invokes `func` with `partials` prepended to the
       * arguments it receives. This method is like `_.bind` except it does **not**
       * alter the `this` binding.
       *
       * The `_.partial.placeholder` value, which defaults to `_` in monolithic
       * builds, may be used as a placeholder for partially applied arguments.
       *
       * **Note:** This method doesn't set the "length" property of partially
       * applied functions.
       *
       * @static
       * @memberOf _
       * @since 0.2.0
       * @category Function
       * @param {Function} func The function to partially apply arguments to.
       * @param {...*} [partials] The arguments to be partially applied.
       * @returns {Function} Returns the new partially applied function.
       * @example
       *
       * function greet(greeting, name) {
       *   return greeting + ' ' + name;
       * }
       *
       * var sayHelloTo = _.partial(greet, 'hello');
       * sayHelloTo('fred');
       * // => 'hello fred'
       *
       * // Partially applied with placeholders.
       * var greetFred = _.partial(greet, _, 'fred');
       * greetFred('hi');
       * // => 'hi fred'
       */

      var partial = baseRest(function (func, partials) {
        var holders = replaceHolders(partials, getHolder(partial));
        return createWrap(func, WRAP_PARTIAL_FLAG, undefined, partials, holders);
      });
      /**
       * This method is like `_.partial` except that partially applied arguments
       * are appended to the arguments it receives.
       *
       * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
       * builds, may be used as a placeholder for partially applied arguments.
       *
       * **Note:** This method doesn't set the "length" property of partially
       * applied functions.
       *
       * @static
       * @memberOf _
       * @since 1.0.0
       * @category Function
       * @param {Function} func The function to partially apply arguments to.
       * @param {...*} [partials] The arguments to be partially applied.
       * @returns {Function} Returns the new partially applied function.
       * @example
       *
       * function greet(greeting, name) {
       *   return greeting + ' ' + name;
       * }
       *
       * var greetFred = _.partialRight(greet, 'fred');
       * greetFred('hi');
       * // => 'hi fred'
       *
       * // Partially applied with placeholders.
       * var sayHelloTo = _.partialRight(greet, 'hello', _);
       * sayHelloTo('fred');
       * // => 'hello fred'
       */

      var partialRight = baseRest(function (func, partials) {
        var holders = replaceHolders(partials, getHolder(partialRight));
        return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined, partials, holders);
      });
      /**
       * Creates a function that invokes `func` with arguments arranged according
       * to the specified `indexes` where the argument value at the first index is
       * provided as the first argument, the argument value at the second index is
       * provided as the second argument, and so on.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Function
       * @param {Function} func The function to rearrange arguments for.
       * @param {...(number|number[])} indexes The arranged argument indexes.
       * @returns {Function} Returns the new function.
       * @example
       *
       * var rearged = _.rearg(function(a, b, c) {
       *   return [a, b, c];
       * }, [2, 0, 1]);
       *
       * rearged('b', 'c', 'a')
       * // => ['a', 'b', 'c']
       */

      var rearg = flatRest(function (func, indexes) {
        return createWrap(func, WRAP_REARG_FLAG, undefined, undefined, undefined, indexes);
      });
      /**
       * Creates a function that invokes `func` with the `this` binding of the
       * created function and arguments from `start` and beyond provided as
       * an array.
       *
       * **Note:** This method is based on the
       * [rest parameter](https://mdn.io/rest_parameters).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Function
       * @param {Function} func The function to apply a rest parameter to.
       * @param {number} [start=func.length-1] The start position of the rest parameter.
       * @returns {Function} Returns the new function.
       * @example
       *
       * var say = _.rest(function(what, names) {
       *   return what + ' ' + _.initial(names).join(', ') +
       *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
       * });
       *
       * say('hello', 'fred', 'barney', 'pebbles');
       * // => 'hello fred, barney, & pebbles'
       */

      function rest(func, start) {
        if (typeof func != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }

        start = start === undefined ? start : toInteger(start);
        return baseRest(func, start);
      }
      /**
       * Creates a function that invokes `func` with the `this` binding of the
       * create function and an array of arguments much like
       * [`Function#apply`](http://www.ecma-international.org/ecma-262/7.0/#sec-function.prototype.apply).
       *
       * **Note:** This method is based on the
       * [spread operator](https://mdn.io/spread_operator).
       *
       * @static
       * @memberOf _
       * @since 3.2.0
       * @category Function
       * @param {Function} func The function to spread arguments over.
       * @param {number} [start=0] The start position of the spread.
       * @returns {Function} Returns the new function.
       * @example
       *
       * var say = _.spread(function(who, what) {
       *   return who + ' says ' + what;
       * });
       *
       * say(['fred', 'hello']);
       * // => 'fred says hello'
       *
       * var numbers = Promise.all([
       *   Promise.resolve(40),
       *   Promise.resolve(36)
       * ]);
       *
       * numbers.then(_.spread(function(x, y) {
       *   return x + y;
       * }));
       * // => a Promise of 76
       */


      function spread(func, start) {
        if (typeof func != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }

        start = start == null ? 0 : nativeMax(toInteger(start), 0);
        return baseRest(function (args) {
          var array = args[start],
              otherArgs = castSlice(args, 0, start);

          if (array) {
            arrayPush(otherArgs, array);
          }

          return apply(func, this, otherArgs);
        });
      }
      /**
       * Creates a throttled function that only invokes `func` at most once per
       * every `wait` milliseconds. The throttled function comes with a `cancel`
       * method to cancel delayed `func` invocations and a `flush` method to
       * immediately invoke them. Provide `options` to indicate whether `func`
       * should be invoked on the leading and/or trailing edge of the `wait`
       * timeout. The `func` is invoked with the last arguments provided to the
       * throttled function. Subsequent calls to the throttled function return the
       * result of the last `func` invocation.
       *
       * **Note:** If `leading` and `trailing` options are `true`, `func` is
       * invoked on the trailing edge of the timeout only if the throttled function
       * is invoked more than once during the `wait` timeout.
       *
       * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
       * until to the next tick, similar to `setTimeout` with a timeout of `0`.
       *
       * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
       * for details over the differences between `_.throttle` and `_.debounce`.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Function
       * @param {Function} func The function to throttle.
       * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
       * @param {Object} [options={}] The options object.
       * @param {boolean} [options.leading=true]
       *  Specify invoking on the leading edge of the timeout.
       * @param {boolean} [options.trailing=true]
       *  Specify invoking on the trailing edge of the timeout.
       * @returns {Function} Returns the new throttled function.
       * @example
       *
       * // Avoid excessively updating the position while scrolling.
       * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
       *
       * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
       * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
       * jQuery(element).on('click', throttled);
       *
       * // Cancel the trailing throttled invocation.
       * jQuery(window).on('popstate', throttled.cancel);
       */


      function throttle(func, wait, options) {
        var leading = true,
            trailing = true;

        if (typeof func != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }

        if (isObject(options)) {
          leading = 'leading' in options ? !!options.leading : leading;
          trailing = 'trailing' in options ? !!options.trailing : trailing;
        }

        return debounce(func, wait, {
          'leading': leading,
          'maxWait': wait,
          'trailing': trailing
        });
      }
      /**
       * Creates a function that accepts up to one argument, ignoring any
       * additional arguments.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Function
       * @param {Function} func The function to cap arguments for.
       * @returns {Function} Returns the new capped function.
       * @example
       *
       * _.map(['6', '8', '10'], _.unary(parseInt));
       * // => [6, 8, 10]
       */


      function unary(func) {
        return ary(func, 1);
      }
      /**
       * Creates a function that provides `value` to `wrapper` as its first
       * argument. Any additional arguments provided to the function are appended
       * to those provided to the `wrapper`. The wrapper is invoked with the `this`
       * binding of the created function.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Function
       * @param {*} value The value to wrap.
       * @param {Function} [wrapper=identity] The wrapper function.
       * @returns {Function} Returns the new function.
       * @example
       *
       * var p = _.wrap(_.escape, function(func, text) {
       *   return '<p>' + func(text) + '</p>';
       * });
       *
       * p('fred, barney, & pebbles');
       * // => '<p>fred, barney, &amp; pebbles</p>'
       */


      function wrap(value, wrapper) {
        return partial(castFunction(wrapper), value);
      }
      /*------------------------------------------------------------------------*/

      /**
       * Casts `value` as an array if it's not one.
       *
       * @static
       * @memberOf _
       * @since 4.4.0
       * @category Lang
       * @param {*} value The value to inspect.
       * @returns {Array} Returns the cast array.
       * @example
       *
       * _.castArray(1);
       * // => [1]
       *
       * _.castArray({ 'a': 1 });
       * // => [{ 'a': 1 }]
       *
       * _.castArray('abc');
       * // => ['abc']
       *
       * _.castArray(null);
       * // => [null]
       *
       * _.castArray(undefined);
       * // => [undefined]
       *
       * _.castArray();
       * // => []
       *
       * var array = [1, 2, 3];
       * console.log(_.castArray(array) === array);
       * // => true
       */


      function castArray() {
        if (!arguments.length) {
          return [];
        }

        var value = arguments[0];
        return isArray(value) ? value : [value];
      }
      /**
       * Creates a shallow clone of `value`.
       *
       * **Note:** This method is loosely based on the
       * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
       * and supports cloning arrays, array buffers, booleans, date objects, maps,
       * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
       * arrays. The own enumerable properties of `arguments` objects are cloned
       * as plain objects. An empty object is returned for uncloneable values such
       * as error objects, functions, DOM nodes, and WeakMaps.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Lang
       * @param {*} value The value to clone.
       * @returns {*} Returns the cloned value.
       * @see _.cloneDeep
       * @example
       *
       * var objects = [{ 'a': 1 }, { 'b': 2 }];
       *
       * var shallow = _.clone(objects);
       * console.log(shallow[0] === objects[0]);
       * // => true
       */


      function clone(value) {
        return baseClone(value, CLONE_SYMBOLS_FLAG);
      }
      /**
       * This method is like `_.clone` except that it accepts `customizer` which
       * is invoked to produce the cloned value. If `customizer` returns `undefined`,
       * cloning is handled by the method instead. The `customizer` is invoked with
       * up to four arguments; (value [, index|key, object, stack]).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to clone.
       * @param {Function} [customizer] The function to customize cloning.
       * @returns {*} Returns the cloned value.
       * @see _.cloneDeepWith
       * @example
       *
       * function customizer(value) {
       *   if (_.isElement(value)) {
       *     return value.cloneNode(false);
       *   }
       * }
       *
       * var el = _.cloneWith(document.body, customizer);
       *
       * console.log(el === document.body);
       * // => false
       * console.log(el.nodeName);
       * // => 'BODY'
       * console.log(el.childNodes.length);
       * // => 0
       */


      function cloneWith(value, customizer) {
        customizer = typeof customizer == 'function' ? customizer : undefined;
        return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
      }
      /**
       * This method is like `_.clone` except that it recursively clones `value`.
       *
       * @static
       * @memberOf _
       * @since 1.0.0
       * @category Lang
       * @param {*} value The value to recursively clone.
       * @returns {*} Returns the deep cloned value.
       * @see _.clone
       * @example
       *
       * var objects = [{ 'a': 1 }, { 'b': 2 }];
       *
       * var deep = _.cloneDeep(objects);
       * console.log(deep[0] === objects[0]);
       * // => false
       */


      function cloneDeep(value) {
        return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
      }
      /**
       * This method is like `_.cloneWith` except that it recursively clones `value`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to recursively clone.
       * @param {Function} [customizer] The function to customize cloning.
       * @returns {*} Returns the deep cloned value.
       * @see _.cloneWith
       * @example
       *
       * function customizer(value) {
       *   if (_.isElement(value)) {
       *     return value.cloneNode(true);
       *   }
       * }
       *
       * var el = _.cloneDeepWith(document.body, customizer);
       *
       * console.log(el === document.body);
       * // => false
       * console.log(el.nodeName);
       * // => 'BODY'
       * console.log(el.childNodes.length);
       * // => 20
       */


      function cloneDeepWith(value, customizer) {
        customizer = typeof customizer == 'function' ? customizer : undefined;
        return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
      }
      /**
       * Checks if `object` conforms to `source` by invoking the predicate
       * properties of `source` with the corresponding property values of `object`.
       *
       * **Note:** This method is equivalent to `_.conforms` when `source` is
       * partially applied.
       *
       * @static
       * @memberOf _
       * @since 4.14.0
       * @category Lang
       * @param {Object} object The object to inspect.
       * @param {Object} source The object of property predicates to conform to.
       * @returns {boolean} Returns `true` if `object` conforms, else `false`.
       * @example
       *
       * var object = { 'a': 1, 'b': 2 };
       *
       * _.conformsTo(object, { 'b': function(n) { return n > 1; } });
       * // => true
       *
       * _.conformsTo(object, { 'b': function(n) { return n > 2; } });
       * // => false
       */


      function conformsTo(object, source) {
        return source == null || baseConformsTo(object, source, keys(source));
      }
      /**
       * Performs a
       * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
       * comparison between two values to determine if they are equivalent.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to compare.
       * @param {*} other The other value to compare.
       * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
       * @example
       *
       * var object = { 'a': 1 };
       * var other = { 'a': 1 };
       *
       * _.eq(object, object);
       * // => true
       *
       * _.eq(object, other);
       * // => false
       *
       * _.eq('a', 'a');
       * // => true
       *
       * _.eq('a', Object('a'));
       * // => false
       *
       * _.eq(NaN, NaN);
       * // => true
       */


      function eq(value, other) {
        return value === other || value !== value && other !== other;
      }
      /**
       * Checks if `value` is greater than `other`.
       *
       * @static
       * @memberOf _
       * @since 3.9.0
       * @category Lang
       * @param {*} value The value to compare.
       * @param {*} other The other value to compare.
       * @returns {boolean} Returns `true` if `value` is greater than `other`,
       *  else `false`.
       * @see _.lt
       * @example
       *
       * _.gt(3, 1);
       * // => true
       *
       * _.gt(3, 3);
       * // => false
       *
       * _.gt(1, 3);
       * // => false
       */


      var gt = createRelationalOperation(baseGt);
      /**
       * Checks if `value` is greater than or equal to `other`.
       *
       * @static
       * @memberOf _
       * @since 3.9.0
       * @category Lang
       * @param {*} value The value to compare.
       * @param {*} other The other value to compare.
       * @returns {boolean} Returns `true` if `value` is greater than or equal to
       *  `other`, else `false`.
       * @see _.lte
       * @example
       *
       * _.gte(3, 1);
       * // => true
       *
       * _.gte(3, 3);
       * // => true
       *
       * _.gte(1, 3);
       * // => false
       */

      var gte = createRelationalOperation(function (value, other) {
        return value >= other;
      });
      /**
       * Checks if `value` is likely an `arguments` object.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is an `arguments` object,
       *  else `false`.
       * @example
       *
       * _.isArguments(function() { return arguments; }());
       * // => true
       *
       * _.isArguments([1, 2, 3]);
       * // => false
       */

      var isArguments = baseIsArguments(function () {
        return arguments;
      }()) ? baseIsArguments : function (value) {
        return isObjectLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
      };
      /**
       * Checks if `value` is classified as an `Array` object.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is an array, else `false`.
       * @example
       *
       * _.isArray([1, 2, 3]);
       * // => true
       *
       * _.isArray(document.body.children);
       * // => false
       *
       * _.isArray('abc');
       * // => false
       *
       * _.isArray(_.noop);
       * // => false
       */

      var isArray = Array.isArray;
      /**
       * Checks if `value` is classified as an `ArrayBuffer` object.
       *
       * @static
       * @memberOf _
       * @since 4.3.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
       * @example
       *
       * _.isArrayBuffer(new ArrayBuffer(2));
       * // => true
       *
       * _.isArrayBuffer(new Array(2));
       * // => false
       */

      var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
      /**
       * Checks if `value` is array-like. A value is considered array-like if it's
       * not a function and has a `value.length` that's an integer greater than or
       * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
       * @example
       *
       * _.isArrayLike([1, 2, 3]);
       * // => true
       *
       * _.isArrayLike(document.body.children);
       * // => true
       *
       * _.isArrayLike('abc');
       * // => true
       *
       * _.isArrayLike(_.noop);
       * // => false
       */

      function isArrayLike(value) {
        return value != null && isLength(value.length) && !isFunction(value);
      }
      /**
       * This method is like `_.isArrayLike` except that it also checks if `value`
       * is an object.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is an array-like object,
       *  else `false`.
       * @example
       *
       * _.isArrayLikeObject([1, 2, 3]);
       * // => true
       *
       * _.isArrayLikeObject(document.body.children);
       * // => true
       *
       * _.isArrayLikeObject('abc');
       * // => false
       *
       * _.isArrayLikeObject(_.noop);
       * // => false
       */


      function isArrayLikeObject(value) {
        return isObjectLike(value) && isArrayLike(value);
      }
      /**
       * Checks if `value` is classified as a boolean primitive or object.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
       * @example
       *
       * _.isBoolean(false);
       * // => true
       *
       * _.isBoolean(null);
       * // => false
       */


      function isBoolean(value) {
        return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
      }
      /**
       * Checks if `value` is a buffer.
       *
       * @static
       * @memberOf _
       * @since 4.3.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
       * @example
       *
       * _.isBuffer(new Buffer(2));
       * // => true
       *
       * _.isBuffer(new Uint8Array(2));
       * // => false
       */


      var isBuffer = nativeIsBuffer || stubFalse;
      /**
       * Checks if `value` is classified as a `Date` object.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
       * @example
       *
       * _.isDate(new Date);
       * // => true
       *
       * _.isDate('Mon April 23 2012');
       * // => false
       */

      var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
      /**
       * Checks if `value` is likely a DOM element.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
       * @example
       *
       * _.isElement(document.body);
       * // => true
       *
       * _.isElement('<body>');
       * // => false
       */

      function isElement(value) {
        return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
      }
      /**
       * Checks if `value` is an empty object, collection, map, or set.
       *
       * Objects are considered empty if they have no own enumerable string keyed
       * properties.
       *
       * Array-like values such as `arguments` objects, arrays, buffers, strings, or
       * jQuery-like collections are considered empty if they have a `length` of `0`.
       * Similarly, maps and sets are considered empty if they have a `size` of `0`.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is empty, else `false`.
       * @example
       *
       * _.isEmpty(null);
       * // => true
       *
       * _.isEmpty(true);
       * // => true
       *
       * _.isEmpty(1);
       * // => true
       *
       * _.isEmpty([1, 2, 3]);
       * // => false
       *
       * _.isEmpty({ 'a': 1 });
       * // => false
       */


      function isEmpty(value) {
        if (value == null) {
          return true;
        }

        if (isArrayLike(value) && (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
          return !value.length;
        }

        var tag = getTag(value);

        if (tag == mapTag || tag == setTag) {
          return !value.size;
        }

        if (isPrototype(value)) {
          return !baseKeys(value).length;
        }

        for (var key in value) {
          if (hasOwnProperty.call(value, key)) {
            return false;
          }
        }

        return true;
      }
      /**
       * Performs a deep comparison between two values to determine if they are
       * equivalent.
       *
       * **Note:** This method supports comparing arrays, array buffers, booleans,
       * date objects, error objects, maps, numbers, `Object` objects, regexes,
       * sets, strings, symbols, and typed arrays. `Object` objects are compared
       * by their own, not inherited, enumerable properties. Functions and DOM
       * nodes are compared by strict equality, i.e. `===`.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Lang
       * @param {*} value The value to compare.
       * @param {*} other The other value to compare.
       * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
       * @example
       *
       * var object = { 'a': 1 };
       * var other = { 'a': 1 };
       *
       * _.isEqual(object, other);
       * // => true
       *
       * object === other;
       * // => false
       */


      function isEqual(value, other) {
        return baseIsEqual(value, other);
      }
      /**
       * This method is like `_.isEqual` except that it accepts `customizer` which
       * is invoked to compare values. If `customizer` returns `undefined`, comparisons
       * are handled by the method instead. The `customizer` is invoked with up to
       * six arguments: (objValue, othValue [, index|key, object, other, stack]).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to compare.
       * @param {*} other The other value to compare.
       * @param {Function} [customizer] The function to customize comparisons.
       * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
       * @example
       *
       * function isGreeting(value) {
       *   return /^h(?:i|ello)$/.test(value);
       * }
       *
       * function customizer(objValue, othValue) {
       *   if (isGreeting(objValue) && isGreeting(othValue)) {
       *     return true;
       *   }
       * }
       *
       * var array = ['hello', 'goodbye'];
       * var other = ['hi', 'goodbye'];
       *
       * _.isEqualWith(array, other, customizer);
       * // => true
       */


      function isEqualWith(value, other, customizer) {
        customizer = typeof customizer == 'function' ? customizer : undefined;
        var result = customizer ? customizer(value, other) : undefined;
        return result === undefined ? baseIsEqual(value, other, undefined, customizer) : !!result;
      }
      /**
       * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
       * `SyntaxError`, `TypeError`, or `URIError` object.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
       * @example
       *
       * _.isError(new Error);
       * // => true
       *
       * _.isError(Error);
       * // => false
       */


      function isError(value) {
        if (!isObjectLike(value)) {
          return false;
        }

        var tag = baseGetTag(value);
        return tag == errorTag || tag == domExcTag || typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject(value);
      }
      /**
       * Checks if `value` is a finite primitive number.
       *
       * **Note:** This method is based on
       * [`Number.isFinite`](https://mdn.io/Number/isFinite).
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
       * @example
       *
       * _.isFinite(3);
       * // => true
       *
       * _.isFinite(Number.MIN_VALUE);
       * // => true
       *
       * _.isFinite(Infinity);
       * // => false
       *
       * _.isFinite('3');
       * // => false
       */


      function isFinite(value) {
        return typeof value == 'number' && nativeIsFinite(value);
      }
      /**
       * Checks if `value` is classified as a `Function` object.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a function, else `false`.
       * @example
       *
       * _.isFunction(_);
       * // => true
       *
       * _.isFunction(/abc/);
       * // => false
       */


      function isFunction(value) {
        if (!isObject(value)) {
          return false;
        } // The use of `Object#toString` avoids issues with the `typeof` operator
        // in Safari 9 which returns 'object' for typed arrays and other constructors.


        var tag = baseGetTag(value);
        return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
      }
      /**
       * Checks if `value` is an integer.
       *
       * **Note:** This method is based on
       * [`Number.isInteger`](https://mdn.io/Number/isInteger).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
       * @example
       *
       * _.isInteger(3);
       * // => true
       *
       * _.isInteger(Number.MIN_VALUE);
       * // => false
       *
       * _.isInteger(Infinity);
       * // => false
       *
       * _.isInteger('3');
       * // => false
       */


      function isInteger(value) {
        return typeof value == 'number' && value == toInteger(value);
      }
      /**
       * Checks if `value` is a valid array-like length.
       *
       * **Note:** This method is loosely based on
       * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
       * @example
       *
       * _.isLength(3);
       * // => true
       *
       * _.isLength(Number.MIN_VALUE);
       * // => false
       *
       * _.isLength(Infinity);
       * // => false
       *
       * _.isLength('3');
       * // => false
       */


      function isLength(value) {
        return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
      }
      /**
       * Checks if `value` is the
       * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
       * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is an object, else `false`.
       * @example
       *
       * _.isObject({});
       * // => true
       *
       * _.isObject([1, 2, 3]);
       * // => true
       *
       * _.isObject(_.noop);
       * // => true
       *
       * _.isObject(null);
       * // => false
       */


      function isObject(value) {
        var type = typeof value;
        return value != null && (type == 'object' || type == 'function');
      }
      /**
       * Checks if `value` is object-like. A value is object-like if it's not `null`
       * and has a `typeof` result of "object".
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
       * @example
       *
       * _.isObjectLike({});
       * // => true
       *
       * _.isObjectLike([1, 2, 3]);
       * // => true
       *
       * _.isObjectLike(_.noop);
       * // => false
       *
       * _.isObjectLike(null);
       * // => false
       */


      function isObjectLike(value) {
        return value != null && typeof value == 'object';
      }
      /**
       * Checks if `value` is classified as a `Map` object.
       *
       * @static
       * @memberOf _
       * @since 4.3.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a map, else `false`.
       * @example
       *
       * _.isMap(new Map);
       * // => true
       *
       * _.isMap(new WeakMap);
       * // => false
       */


      var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
      /**
       * Performs a partial deep comparison between `object` and `source` to
       * determine if `object` contains equivalent property values.
       *
       * **Note:** This method is equivalent to `_.matches` when `source` is
       * partially applied.
       *
       * Partial comparisons will match empty array and empty object `source`
       * values against any array or object value, respectively. See `_.isEqual`
       * for a list of supported value comparisons.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Lang
       * @param {Object} object The object to inspect.
       * @param {Object} source The object of property values to match.
       * @returns {boolean} Returns `true` if `object` is a match, else `false`.
       * @example
       *
       * var object = { 'a': 1, 'b': 2 };
       *
       * _.isMatch(object, { 'b': 2 });
       * // => true
       *
       * _.isMatch(object, { 'b': 1 });
       * // => false
       */

      function isMatch(object, source) {
        return object === source || baseIsMatch(object, source, getMatchData(source));
      }
      /**
       * This method is like `_.isMatch` except that it accepts `customizer` which
       * is invoked to compare values. If `customizer` returns `undefined`, comparisons
       * are handled by the method instead. The `customizer` is invoked with five
       * arguments: (objValue, srcValue, index|key, object, source).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {Object} object The object to inspect.
       * @param {Object} source The object of property values to match.
       * @param {Function} [customizer] The function to customize comparisons.
       * @returns {boolean} Returns `true` if `object` is a match, else `false`.
       * @example
       *
       * function isGreeting(value) {
       *   return /^h(?:i|ello)$/.test(value);
       * }
       *
       * function customizer(objValue, srcValue) {
       *   if (isGreeting(objValue) && isGreeting(srcValue)) {
       *     return true;
       *   }
       * }
       *
       * var object = { 'greeting': 'hello' };
       * var source = { 'greeting': 'hi' };
       *
       * _.isMatchWith(object, source, customizer);
       * // => true
       */


      function isMatchWith(object, source, customizer) {
        customizer = typeof customizer == 'function' ? customizer : undefined;
        return baseIsMatch(object, source, getMatchData(source), customizer);
      }
      /**
       * Checks if `value` is `NaN`.
       *
       * **Note:** This method is based on
       * [`Number.isNaN`](https://mdn.io/Number/isNaN) and is not the same as
       * global [`isNaN`](https://mdn.io/isNaN) which returns `true` for
       * `undefined` and other non-number values.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
       * @example
       *
       * _.isNaN(NaN);
       * // => true
       *
       * _.isNaN(new Number(NaN));
       * // => true
       *
       * isNaN(undefined);
       * // => true
       *
       * _.isNaN(undefined);
       * // => false
       */


      function isNaN(value) {
        // An `NaN` primitive is the only value that is not equal to itself.
        // Perform the `toStringTag` check first to avoid errors with some
        // ActiveX objects in IE.
        return isNumber(value) && value != +value;
      }
      /**
       * Checks if `value` is a pristine native function.
       *
       * **Note:** This method can't reliably detect native functions in the presence
       * of the core-js package because core-js circumvents this kind of detection.
       * Despite multiple requests, the core-js maintainer has made it clear: any
       * attempt to fix the detection will be obstructed. As a result, we're left
       * with little choice but to throw an error. Unfortunately, this also affects
       * packages, like [babel-polyfill](https://www.npmjs.com/package/babel-polyfill),
       * which rely on core-js.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a native function,
       *  else `false`.
       * @example
       *
       * _.isNative(Array.prototype.push);
       * // => true
       *
       * _.isNative(_);
       * // => false
       */


      function isNative(value) {
        if (isMaskable(value)) {
          throw new Error(CORE_ERROR_TEXT);
        }

        return baseIsNative(value);
      }
      /**
       * Checks if `value` is `null`.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
       * @example
       *
       * _.isNull(null);
       * // => true
       *
       * _.isNull(void 0);
       * // => false
       */


      function isNull(value) {
        return value === null;
      }
      /**
       * Checks if `value` is `null` or `undefined`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
       * @example
       *
       * _.isNil(null);
       * // => true
       *
       * _.isNil(void 0);
       * // => true
       *
       * _.isNil(NaN);
       * // => false
       */


      function isNil(value) {
        return value == null;
      }
      /**
       * Checks if `value` is classified as a `Number` primitive or object.
       *
       * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
       * classified as numbers, use the `_.isFinite` method.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a number, else `false`.
       * @example
       *
       * _.isNumber(3);
       * // => true
       *
       * _.isNumber(Number.MIN_VALUE);
       * // => true
       *
       * _.isNumber(Infinity);
       * // => true
       *
       * _.isNumber('3');
       * // => false
       */


      function isNumber(value) {
        return typeof value == 'number' || isObjectLike(value) && baseGetTag(value) == numberTag;
      }
      /**
       * Checks if `value` is a plain object, that is, an object created by the
       * `Object` constructor or one with a `[[Prototype]]` of `null`.
       *
       * @static
       * @memberOf _
       * @since 0.8.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
       * @example
       *
       * function Foo() {
       *   this.a = 1;
       * }
       *
       * _.isPlainObject(new Foo);
       * // => false
       *
       * _.isPlainObject([1, 2, 3]);
       * // => false
       *
       * _.isPlainObject({ 'x': 0, 'y': 0 });
       * // => true
       *
       * _.isPlainObject(Object.create(null));
       * // => true
       */


      function isPlainObject(value) {
        if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
          return false;
        }

        var proto = getPrototype(value);

        if (proto === null) {
          return true;
        }

        var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
        return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
      }
      /**
       * Checks if `value` is classified as a `RegExp` object.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
       * @example
       *
       * _.isRegExp(/abc/);
       * // => true
       *
       * _.isRegExp('/abc/');
       * // => false
       */


      var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
      /**
       * Checks if `value` is a safe integer. An integer is safe if it's an IEEE-754
       * double precision number which isn't the result of a rounded unsafe integer.
       *
       * **Note:** This method is based on
       * [`Number.isSafeInteger`](https://mdn.io/Number/isSafeInteger).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a safe integer, else `false`.
       * @example
       *
       * _.isSafeInteger(3);
       * // => true
       *
       * _.isSafeInteger(Number.MIN_VALUE);
       * // => false
       *
       * _.isSafeInteger(Infinity);
       * // => false
       *
       * _.isSafeInteger('3');
       * // => false
       */

      function isSafeInteger(value) {
        return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
      }
      /**
       * Checks if `value` is classified as a `Set` object.
       *
       * @static
       * @memberOf _
       * @since 4.3.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a set, else `false`.
       * @example
       *
       * _.isSet(new Set);
       * // => true
       *
       * _.isSet(new WeakSet);
       * // => false
       */


      var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
      /**
       * Checks if `value` is classified as a `String` primitive or object.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a string, else `false`.
       * @example
       *
       * _.isString('abc');
       * // => true
       *
       * _.isString(1);
       * // => false
       */

      function isString(value) {
        return typeof value == 'string' || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
      }
      /**
       * Checks if `value` is classified as a `Symbol` primitive or object.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
       * @example
       *
       * _.isSymbol(Symbol.iterator);
       * // => true
       *
       * _.isSymbol('abc');
       * // => false
       */


      function isSymbol(value) {
        return typeof value == 'symbol' || isObjectLike(value) && baseGetTag(value) == symbolTag;
      }
      /**
       * Checks if `value` is classified as a typed array.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
       * @example
       *
       * _.isTypedArray(new Uint8Array);
       * // => true
       *
       * _.isTypedArray([]);
       * // => false
       */


      var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
      /**
       * Checks if `value` is `undefined`.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
       * @example
       *
       * _.isUndefined(void 0);
       * // => true
       *
       * _.isUndefined(null);
       * // => false
       */

      function isUndefined(value) {
        return value === undefined;
      }
      /**
       * Checks if `value` is classified as a `WeakMap` object.
       *
       * @static
       * @memberOf _
       * @since 4.3.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a weak map, else `false`.
       * @example
       *
       * _.isWeakMap(new WeakMap);
       * // => true
       *
       * _.isWeakMap(new Map);
       * // => false
       */


      function isWeakMap(value) {
        return isObjectLike(value) && getTag(value) == weakMapTag;
      }
      /**
       * Checks if `value` is classified as a `WeakSet` object.
       *
       * @static
       * @memberOf _
       * @since 4.3.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a weak set, else `false`.
       * @example
       *
       * _.isWeakSet(new WeakSet);
       * // => true
       *
       * _.isWeakSet(new Set);
       * // => false
       */


      function isWeakSet(value) {
        return isObjectLike(value) && baseGetTag(value) == weakSetTag;
      }
      /**
       * Checks if `value` is less than `other`.
       *
       * @static
       * @memberOf _
       * @since 3.9.0
       * @category Lang
       * @param {*} value The value to compare.
       * @param {*} other The other value to compare.
       * @returns {boolean} Returns `true` if `value` is less than `other`,
       *  else `false`.
       * @see _.gt
       * @example
       *
       * _.lt(1, 3);
       * // => true
       *
       * _.lt(3, 3);
       * // => false
       *
       * _.lt(3, 1);
       * // => false
       */


      var lt = createRelationalOperation(baseLt);
      /**
       * Checks if `value` is less than or equal to `other`.
       *
       * @static
       * @memberOf _
       * @since 3.9.0
       * @category Lang
       * @param {*} value The value to compare.
       * @param {*} other The other value to compare.
       * @returns {boolean} Returns `true` if `value` is less than or equal to
       *  `other`, else `false`.
       * @see _.gte
       * @example
       *
       * _.lte(1, 3);
       * // => true
       *
       * _.lte(3, 3);
       * // => true
       *
       * _.lte(3, 1);
       * // => false
       */

      var lte = createRelationalOperation(function (value, other) {
        return value <= other;
      });
      /**
       * Converts `value` to an array.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Lang
       * @param {*} value The value to convert.
       * @returns {Array} Returns the converted array.
       * @example
       *
       * _.toArray({ 'a': 1, 'b': 2 });
       * // => [1, 2]
       *
       * _.toArray('abc');
       * // => ['a', 'b', 'c']
       *
       * _.toArray(1);
       * // => []
       *
       * _.toArray(null);
       * // => []
       */

      function toArray(value) {
        if (!value) {
          return [];
        }

        if (isArrayLike(value)) {
          return isString(value) ? stringToArray(value) : copyArray(value);
        }

        if (symIterator && value[symIterator]) {
          return iteratorToArray(value[symIterator]());
        }

        var tag = getTag(value),
            func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
        return func(value);
      }
      /**
       * Converts `value` to a finite number.
       *
       * @static
       * @memberOf _
       * @since 4.12.0
       * @category Lang
       * @param {*} value The value to convert.
       * @returns {number} Returns the converted number.
       * @example
       *
       * _.toFinite(3.2);
       * // => 3.2
       *
       * _.toFinite(Number.MIN_VALUE);
       * // => 5e-324
       *
       * _.toFinite(Infinity);
       * // => 1.7976931348623157e+308
       *
       * _.toFinite('3.2');
       * // => 3.2
       */


      function toFinite(value) {
        if (!value) {
          return value === 0 ? value : 0;
        }

        value = toNumber(value);

        if (value === INFINITY || value === -INFINITY) {
          var sign = value < 0 ? -1 : 1;
          return sign * MAX_INTEGER;
        }

        return value === value ? value : 0;
      }
      /**
       * Converts `value` to an integer.
       *
       * **Note:** This method is loosely based on
       * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to convert.
       * @returns {number} Returns the converted integer.
       * @example
       *
       * _.toInteger(3.2);
       * // => 3
       *
       * _.toInteger(Number.MIN_VALUE);
       * // => 0
       *
       * _.toInteger(Infinity);
       * // => 1.7976931348623157e+308
       *
       * _.toInteger('3.2');
       * // => 3
       */


      function toInteger(value) {
        var result = toFinite(value),
            remainder = result % 1;
        return result === result ? remainder ? result - remainder : result : 0;
      }
      /**
       * Converts `value` to an integer suitable for use as the length of an
       * array-like object.
       *
       * **Note:** This method is based on
       * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to convert.
       * @returns {number} Returns the converted integer.
       * @example
       *
       * _.toLength(3.2);
       * // => 3
       *
       * _.toLength(Number.MIN_VALUE);
       * // => 0
       *
       * _.toLength(Infinity);
       * // => 4294967295
       *
       * _.toLength('3.2');
       * // => 3
       */


      function toLength(value) {
        return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
      }
      /**
       * Converts `value` to a number.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to process.
       * @returns {number} Returns the number.
       * @example
       *
       * _.toNumber(3.2);
       * // => 3.2
       *
       * _.toNumber(Number.MIN_VALUE);
       * // => 5e-324
       *
       * _.toNumber(Infinity);
       * // => Infinity
       *
       * _.toNumber('3.2');
       * // => 3.2
       */


      function toNumber(value) {
        if (typeof value == 'number') {
          return value;
        }

        if (isSymbol(value)) {
          return NAN;
        }

        if (isObject(value)) {
          var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
          value = isObject(other) ? other + '' : other;
        }

        if (typeof value != 'string') {
          return value === 0 ? value : +value;
        }

        value = value.replace(reTrim, '');
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
      }
      /**
       * Converts `value` to a plain object flattening inherited enumerable string
       * keyed properties of `value` to own properties of the plain object.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Lang
       * @param {*} value The value to convert.
       * @returns {Object} Returns the converted plain object.
       * @example
       *
       * function Foo() {
       *   this.b = 2;
       * }
       *
       * Foo.prototype.c = 3;
       *
       * _.assign({ 'a': 1 }, new Foo);
       * // => { 'a': 1, 'b': 2 }
       *
       * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
       * // => { 'a': 1, 'b': 2, 'c': 3 }
       */


      function toPlainObject(value) {
        return copyObject(value, keysIn(value));
      }
      /**
       * Converts `value` to a safe integer. A safe integer can be compared and
       * represented correctly.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to convert.
       * @returns {number} Returns the converted integer.
       * @example
       *
       * _.toSafeInteger(3.2);
       * // => 3
       *
       * _.toSafeInteger(Number.MIN_VALUE);
       * // => 0
       *
       * _.toSafeInteger(Infinity);
       * // => 9007199254740991
       *
       * _.toSafeInteger('3.2');
       * // => 3
       */


      function toSafeInteger(value) {
        return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
      }
      /**
       * Converts `value` to a string. An empty string is returned for `null`
       * and `undefined` values. The sign of `-0` is preserved.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to convert.
       * @returns {string} Returns the converted string.
       * @example
       *
       * _.toString(null);
       * // => ''
       *
       * _.toString(-0);
       * // => '-0'
       *
       * _.toString([1, 2, 3]);
       * // => '1,2,3'
       */


      function toString(value) {
        return value == null ? '' : baseToString(value);
      }
      /*------------------------------------------------------------------------*/

      /**
       * Assigns own enumerable string keyed properties of source objects to the
       * destination object. Source objects are applied from left to right.
       * Subsequent sources overwrite property assignments of previous sources.
       *
       * **Note:** This method mutates `object` and is loosely based on
       * [`Object.assign`](https://mdn.io/Object/assign).
       *
       * @static
       * @memberOf _
       * @since 0.10.0
       * @category Object
       * @param {Object} object The destination object.
       * @param {...Object} [sources] The source objects.
       * @returns {Object} Returns `object`.
       * @see _.assignIn
       * @example
       *
       * function Foo() {
       *   this.a = 1;
       * }
       *
       * function Bar() {
       *   this.c = 3;
       * }
       *
       * Foo.prototype.b = 2;
       * Bar.prototype.d = 4;
       *
       * _.assign({ 'a': 0 }, new Foo, new Bar);
       * // => { 'a': 1, 'c': 3 }
       */


      var assign = createAssigner(function (object, source) {
        if (isPrototype(source) || isArrayLike(source)) {
          copyObject(source, keys(source), object);
          return;
        }

        for (var key in source) {
          if (hasOwnProperty.call(source, key)) {
            assignValue(object, key, source[key]);
          }
        }
      });
      /**
       * This method is like `_.assign` except that it iterates over own and
       * inherited source properties.
       *
       * **Note:** This method mutates `object`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @alias extend
       * @category Object
       * @param {Object} object The destination object.
       * @param {...Object} [sources] The source objects.
       * @returns {Object} Returns `object`.
       * @see _.assign
       * @example
       *
       * function Foo() {
       *   this.a = 1;
       * }
       *
       * function Bar() {
       *   this.c = 3;
       * }
       *
       * Foo.prototype.b = 2;
       * Bar.prototype.d = 4;
       *
       * _.assignIn({ 'a': 0 }, new Foo, new Bar);
       * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
       */

      var assignIn = createAssigner(function (object, source) {
        copyObject(source, keysIn(source), object);
      });
      /**
       * This method is like `_.assignIn` except that it accepts `customizer`
       * which is invoked to produce the assigned values. If `customizer` returns
       * `undefined`, assignment is handled by the method instead. The `customizer`
       * is invoked with five arguments: (objValue, srcValue, key, object, source).
       *
       * **Note:** This method mutates `object`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @alias extendWith
       * @category Object
       * @param {Object} object The destination object.
       * @param {...Object} sources The source objects.
       * @param {Function} [customizer] The function to customize assigned values.
       * @returns {Object} Returns `object`.
       * @see _.assignWith
       * @example
       *
       * function customizer(objValue, srcValue) {
       *   return _.isUndefined(objValue) ? srcValue : objValue;
       * }
       *
       * var defaults = _.partialRight(_.assignInWith, customizer);
       *
       * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
       * // => { 'a': 1, 'b': 2 }
       */

      var assignInWith = createAssigner(function (object, source, srcIndex, customizer) {
        copyObject(source, keysIn(source), object, customizer);
      });
      /**
       * This method is like `_.assign` except that it accepts `customizer`
       * which is invoked to produce the assigned values. If `customizer` returns
       * `undefined`, assignment is handled by the method instead. The `customizer`
       * is invoked with five arguments: (objValue, srcValue, key, object, source).
       *
       * **Note:** This method mutates `object`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Object
       * @param {Object} object The destination object.
       * @param {...Object} sources The source objects.
       * @param {Function} [customizer] The function to customize assigned values.
       * @returns {Object} Returns `object`.
       * @see _.assignInWith
       * @example
       *
       * function customizer(objValue, srcValue) {
       *   return _.isUndefined(objValue) ? srcValue : objValue;
       * }
       *
       * var defaults = _.partialRight(_.assignWith, customizer);
       *
       * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
       * // => { 'a': 1, 'b': 2 }
       */

      var assignWith = createAssigner(function (object, source, srcIndex, customizer) {
        copyObject(source, keys(source), object, customizer);
      });
      /**
       * Creates an array of values corresponding to `paths` of `object`.
       *
       * @static
       * @memberOf _
       * @since 1.0.0
       * @category Object
       * @param {Object} object The object to iterate over.
       * @param {...(string|string[])} [paths] The property paths to pick.
       * @returns {Array} Returns the picked values.
       * @example
       *
       * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
       *
       * _.at(object, ['a[0].b.c', 'a[1]']);
       * // => [3, 4]
       */

      var at = flatRest(baseAt);
      /**
       * Creates an object that inherits from the `prototype` object. If a
       * `properties` object is given, its own enumerable string keyed properties
       * are assigned to the created object.
       *
       * @static
       * @memberOf _
       * @since 2.3.0
       * @category Object
       * @param {Object} prototype The object to inherit from.
       * @param {Object} [properties] The properties to assign to the object.
       * @returns {Object} Returns the new object.
       * @example
       *
       * function Shape() {
       *   this.x = 0;
       *   this.y = 0;
       * }
       *
       * function Circle() {
       *   Shape.call(this);
       * }
       *
       * Circle.prototype = _.create(Shape.prototype, {
       *   'constructor': Circle
       * });
       *
       * var circle = new Circle;
       * circle instanceof Circle;
       * // => true
       *
       * circle instanceof Shape;
       * // => true
       */

      function create(prototype, properties) {
        var result = baseCreate(prototype);
        return properties == null ? result : baseAssign(result, properties);
      }
      /**
       * Assigns own and inherited enumerable string keyed properties of source
       * objects to the destination object for all destination properties that
       * resolve to `undefined`. Source objects are applied from left to right.
       * Once a property is set, additional values of the same property are ignored.
       *
       * **Note:** This method mutates `object`.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Object
       * @param {Object} object The destination object.
       * @param {...Object} [sources] The source objects.
       * @returns {Object} Returns `object`.
       * @see _.defaultsDeep
       * @example
       *
       * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
       * // => { 'a': 1, 'b': 2 }
       */


      var defaults = baseRest(function (object, sources) {
        object = Object(object);
        var index = -1;
        var length = sources.length;
        var guard = length > 2 ? sources[2] : undefined;

        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          length = 1;
        }

        while (++index < length) {
          var source = sources[index];
          var props = keysIn(source);
          var propsIndex = -1;
          var propsLength = props.length;

          while (++propsIndex < propsLength) {
            var key = props[propsIndex];
            var value = object[key];

            if (value === undefined || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
              object[key] = source[key];
            }
          }
        }

        return object;
      });
      /**
       * This method is like `_.defaults` except that it recursively assigns
       * default properties.
       *
       * **Note:** This method mutates `object`.
       *
       * @static
       * @memberOf _
       * @since 3.10.0
       * @category Object
       * @param {Object} object The destination object.
       * @param {...Object} [sources] The source objects.
       * @returns {Object} Returns `object`.
       * @see _.defaults
       * @example
       *
       * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
       * // => { 'a': { 'b': 2, 'c': 3 } }
       */

      var defaultsDeep = baseRest(function (args) {
        args.push(undefined, customDefaultsMerge);
        return apply(mergeWith, undefined, args);
      });
      /**
       * This method is like `_.find` except that it returns the key of the first
       * element `predicate` returns truthy for instead of the element itself.
       *
       * @static
       * @memberOf _
       * @since 1.1.0
       * @category Object
       * @param {Object} object The object to inspect.
       * @param {Function} [predicate=_.identity] The function invoked per iteration.
       * @returns {string|undefined} Returns the key of the matched element,
       *  else `undefined`.
       * @example
       *
       * var users = {
       *   'barney':  { 'age': 36, 'active': true },
       *   'fred':    { 'age': 40, 'active': false },
       *   'pebbles': { 'age': 1,  'active': true }
       * };
       *
       * _.findKey(users, function(o) { return o.age < 40; });
       * // => 'barney' (iteration order is not guaranteed)
       *
       * // The `_.matches` iteratee shorthand.
       * _.findKey(users, { 'age': 1, 'active': true });
       * // => 'pebbles'
       *
       * // The `_.matchesProperty` iteratee shorthand.
       * _.findKey(users, ['active', false]);
       * // => 'fred'
       *
       * // The `_.property` iteratee shorthand.
       * _.findKey(users, 'active');
       * // => 'barney'
       */

      function findKey(object, predicate) {
        return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
      }
      /**
       * This method is like `_.findKey` except that it iterates over elements of
       * a collection in the opposite order.
       *
       * @static
       * @memberOf _
       * @since 2.0.0
       * @category Object
       * @param {Object} object The object to inspect.
       * @param {Function} [predicate=_.identity] The function invoked per iteration.
       * @returns {string|undefined} Returns the key of the matched element,
       *  else `undefined`.
       * @example
       *
       * var users = {
       *   'barney':  { 'age': 36, 'active': true },
       *   'fred':    { 'age': 40, 'active': false },
       *   'pebbles': { 'age': 1,  'active': true }
       * };
       *
       * _.findLastKey(users, function(o) { return o.age < 40; });
       * // => returns 'pebbles' assuming `_.findKey` returns 'barney'
       *
       * // The `_.matches` iteratee shorthand.
       * _.findLastKey(users, { 'age': 36, 'active': true });
       * // => 'barney'
       *
       * // The `_.matchesProperty` iteratee shorthand.
       * _.findLastKey(users, ['active', false]);
       * // => 'fred'
       *
       * // The `_.property` iteratee shorthand.
       * _.findLastKey(users, 'active');
       * // => 'pebbles'
       */


      function findLastKey(object, predicate) {
        return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
      }
      /**
       * Iterates over own and inherited enumerable string keyed properties of an
       * object and invokes `iteratee` for each property. The iteratee is invoked
       * with three arguments: (value, key, object). Iteratee functions may exit
       * iteration early by explicitly returning `false`.
       *
       * @static
       * @memberOf _
       * @since 0.3.0
       * @category Object
       * @param {Object} object The object to iterate over.
       * @param {Function} [iteratee=_.identity] The function invoked per iteration.
       * @returns {Object} Returns `object`.
       * @see _.forInRight
       * @example
       *
       * function Foo() {
       *   this.a = 1;
       *   this.b = 2;
       * }
       *
       * Foo.prototype.c = 3;
       *
       * _.forIn(new Foo, function(value, key) {
       *   console.log(key);
       * });
       * // => Logs 'a', 'b', then 'c' (iteration order is not guaranteed).
       */


      function forIn(object, iteratee) {
        return object == null ? object : baseFor(object, getIteratee(iteratee, 3), keysIn);
      }
      /**
       * This method is like `_.forIn` except that it iterates over properties of
       * `object` in the opposite order.
       *
       * @static
       * @memberOf _
       * @since 2.0.0
       * @category Object
       * @param {Object} object The object to iterate over.
       * @param {Function} [iteratee=_.identity] The function invoked per iteration.
       * @returns {Object} Returns `object`.
       * @see _.forIn
       * @example
       *
       * function Foo() {
       *   this.a = 1;
       *   this.b = 2;
       * }
       *
       * Foo.prototype.c = 3;
       *
       * _.forInRight(new Foo, function(value, key) {
       *   console.log(key);
       * });
       * // => Logs 'c', 'b', then 'a' assuming `_.forIn` logs 'a', 'b', then 'c'.
       */


      function forInRight(object, iteratee) {
        return object == null ? object : baseForRight(object, getIteratee(iteratee, 3), keysIn);
      }
      /**
       * Iterates over own enumerable string keyed properties of an object and
       * invokes `iteratee` for each property. The iteratee is invoked with three
       * arguments: (value, key, object). Iteratee functions may exit iteration
       * early by explicitly returning `false`.
       *
       * @static
       * @memberOf _
       * @since 0.3.0
       * @category Object
       * @param {Object} object The object to iterate over.
       * @param {Function} [iteratee=_.identity] The function invoked per iteration.
       * @returns {Object} Returns `object`.
       * @see _.forOwnRight
       * @example
       *
       * function Foo() {
       *   this.a = 1;
       *   this.b = 2;
       * }
       *
       * Foo.prototype.c = 3;
       *
       * _.forOwn(new Foo, function(value, key) {
       *   console.log(key);
       * });
       * // => Logs 'a' then 'b' (iteration order is not guaranteed).
       */


      function forOwn(object, iteratee) {
        return object && baseForOwn(object, getIteratee(iteratee, 3));
      }
      /**
       * This method is like `_.forOwn` except that it iterates over properties of
       * `object` in the opposite order.
       *
       * @static
       * @memberOf _
       * @since 2.0.0
       * @category Object
       * @param {Object} object The object to iterate over.
       * @param {Function} [iteratee=_.identity] The function invoked per iteration.
       * @returns {Object} Returns `object`.
       * @see _.forOwn
       * @example
       *
       * function Foo() {
       *   this.a = 1;
       *   this.b = 2;
       * }
       *
       * Foo.prototype.c = 3;
       *
       * _.forOwnRight(new Foo, function(value, key) {
       *   console.log(key);
       * });
       * // => Logs 'b' then 'a' assuming `_.forOwn` logs 'a' then 'b'.
       */


      function forOwnRight(object, iteratee) {
        return object && baseForOwnRight(object, getIteratee(iteratee, 3));
      }
      /**
       * Creates an array of function property names from own enumerable properties
       * of `object`.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Object
       * @param {Object} object The object to inspect.
       * @returns {Array} Returns the function names.
       * @see _.functionsIn
       * @example
       *
       * function Foo() {
       *   this.a = _.constant('a');
       *   this.b = _.constant('b');
       * }
       *
       * Foo.prototype.c = _.constant('c');
       *
       * _.functions(new Foo);
       * // => ['a', 'b']
       */


      function functions(object) {
        return object == null ? [] : baseFunctions(object, keys(object));
      }
      /**
       * Creates an array of function property names from own and inherited
       * enumerable properties of `object`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Object
       * @param {Object} object The object to inspect.
       * @returns {Array} Returns the function names.
       * @see _.functions
       * @example
       *
       * function Foo() {
       *   this.a = _.constant('a');
       *   this.b = _.constant('b');
       * }
       *
       * Foo.prototype.c = _.constant('c');
       *
       * _.functionsIn(new Foo);
       * // => ['a', 'b', 'c']
       */


      function functionsIn(object) {
        return object == null ? [] : baseFunctions(object, keysIn(object));
      }
      /**
       * Gets the value at `path` of `object`. If the resolved value is
       * `undefined`, the `defaultValue` is returned in its place.
       *
       * @static
       * @memberOf _
       * @since 3.7.0
       * @category Object
       * @param {Object} object The object to query.
       * @param {Array|string} path The path of the property to get.
       * @param {*} [defaultValue] The value returned for `undefined` resolved values.
       * @returns {*} Returns the resolved value.
       * @example
       *
       * var object = { 'a': [{ 'b': { 'c': 3 } }] };
       *
       * _.get(object, 'a[0].b.c');
       * // => 3
       *
       * _.get(object, ['a', '0', 'b', 'c']);
       * // => 3
       *
       * _.get(object, 'a.b.c', 'default');
       * // => 'default'
       */


      function get(object, path, defaultValue) {
        var result = object == null ? undefined : baseGet(object, path);
        return result === undefined ? defaultValue : result;
      }
      /**
       * Checks if `path` is a direct property of `object`.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Object
       * @param {Object} object The object to query.
       * @param {Array|string} path The path to check.
       * @returns {boolean} Returns `true` if `path` exists, else `false`.
       * @example
       *
       * var object = { 'a': { 'b': 2 } };
       * var other = _.create({ 'a': _.create({ 'b': 2 }) });
       *
       * _.has(object, 'a');
       * // => true
       *
       * _.has(object, 'a.b');
       * // => true
       *
       * _.has(object, ['a', 'b']);
       * // => true
       *
       * _.has(other, 'a');
       * // => false
       */


      function has(object, path) {
        return object != null && hasPath(object, path, baseHas);
      }
      /**
       * Checks if `path` is a direct or inherited property of `object`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Object
       * @param {Object} object The object to query.
       * @param {Array|string} path The path to check.
       * @returns {boolean} Returns `true` if `path` exists, else `false`.
       * @example
       *
       * var object = _.create({ 'a': _.create({ 'b': 2 }) });
       *
       * _.hasIn(object, 'a');
       * // => true
       *
       * _.hasIn(object, 'a.b');
       * // => true
       *
       * _.hasIn(object, ['a', 'b']);
       * // => true
       *
       * _.hasIn(object, 'b');
       * // => false
       */


      function hasIn(object, path) {
        return object != null && hasPath(object, path, baseHasIn);
      }
      /**
       * Creates an object composed of the inverted keys and values of `object`.
       * If `object` contains duplicate values, subsequent values overwrite
       * property assignments of previous values.
       *
       * @static
       * @memberOf _
       * @since 0.7.0
       * @category Object
       * @param {Object} object The object to invert.
       * @returns {Object} Returns the new inverted object.
       * @example
       *
       * var object = { 'a': 1, 'b': 2, 'c': 1 };
       *
       * _.invert(object);
       * // => { '1': 'c', '2': 'b' }
       */


      var invert = createInverter(function (result, value, key) {
        if (value != null && typeof value.toString != 'function') {
          value = nativeObjectToString.call(value);
        }

        result[value] = key;
      }, constant(identity));
      /**
       * This method is like `_.invert` except that the inverted object is generated
       * from the results of running each element of `object` thru `iteratee`. The
       * corresponding inverted value of each inverted key is an array of keys
       * responsible for generating the inverted value. The iteratee is invoked
       * with one argument: (value).
       *
       * @static
       * @memberOf _
       * @since 4.1.0
       * @category Object
       * @param {Object} object The object to invert.
       * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
       * @returns {Object} Returns the new inverted object.
       * @example
       *
       * var object = { 'a': 1, 'b': 2, 'c': 1 };
       *
       * _.invertBy(object);
       * // => { '1': ['a', 'c'], '2': ['b'] }
       *
       * _.invertBy(object, function(value) {
       *   return 'group' + value;
       * });
       * // => { 'group1': ['a', 'c'], 'group2': ['b'] }
       */

      var invertBy = createInverter(function (result, value, key) {
        if (value != null && typeof value.toString != 'function') {
          value = nativeObjectToString.call(value);
        }

        if (hasOwnProperty.call(result, value)) {
          result[value].push(key);
        } else {
          result[value] = [key];
        }
      }, getIteratee);
      /**
       * Invokes the method at `path` of `object`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Object
       * @param {Object} object The object to query.
       * @param {Array|string} path The path of the method to invoke.
       * @param {...*} [args] The arguments to invoke the method with.
       * @returns {*} Returns the result of the invoked method.
       * @example
       *
       * var object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] };
       *
       * _.invoke(object, 'a[0].b.c.slice', 1, 3);
       * // => [2, 3]
       */

      var invoke = baseRest(baseInvoke);
      /**
       * Creates an array of the own enumerable property names of `object`.
       *
       * **Note:** Non-object values are coerced to objects. See the
       * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
       * for more details.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Object
       * @param {Object} object The object to query.
       * @returns {Array} Returns the array of property names.
       * @example
       *
       * function Foo() {
       *   this.a = 1;
       *   this.b = 2;
       * }
       *
       * Foo.prototype.c = 3;
       *
       * _.keys(new Foo);
       * // => ['a', 'b'] (iteration order is not guaranteed)
       *
       * _.keys('hi');
       * // => ['0', '1']
       */

      function keys(object) {
        return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
      }
      /**
       * Creates an array of the own and inherited enumerable property names of `object`.
       *
       * **Note:** Non-object values are coerced to objects.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Object
       * @param {Object} object The object to query.
       * @returns {Array} Returns the array of property names.
       * @example
       *
       * function Foo() {
       *   this.a = 1;
       *   this.b = 2;
       * }
       *
       * Foo.prototype.c = 3;
       *
       * _.keysIn(new Foo);
       * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
       */


      function keysIn(object) {
        return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
      }
      /**
       * The opposite of `_.mapValues`; this method creates an object with the
       * same values as `object` and keys generated by running each own enumerable
       * string keyed property of `object` thru `iteratee`. The iteratee is invoked
       * with three arguments: (value, key, object).
       *
       * @static
       * @memberOf _
       * @since 3.8.0
       * @category Object
       * @param {Object} object The object to iterate over.
       * @param {Function} [iteratee=_.identity] The function invoked per iteration.
       * @returns {Object} Returns the new mapped object.
       * @see _.mapValues
       * @example
       *
       * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
       *   return key + value;
       * });
       * // => { 'a1': 1, 'b2': 2 }
       */


      function mapKeys(object, iteratee) {
        var result = {};
        iteratee = getIteratee(iteratee, 3);
        baseForOwn(object, function (value, key, object) {
          baseAssignValue(result, iteratee(value, key, object), value);
        });
        return result;
      }
      /**
       * Creates an object with the same keys as `object` and values generated
       * by running each own enumerable string keyed property of `object` thru
       * `iteratee`. The iteratee is invoked with three arguments:
       * (value, key, object).
       *
       * @static
       * @memberOf _
       * @since 2.4.0
       * @category Object
       * @param {Object} object The object to iterate over.
       * @param {Function} [iteratee=_.identity] The function invoked per iteration.
       * @returns {Object} Returns the new mapped object.
       * @see _.mapKeys
       * @example
       *
       * var users = {
       *   'fred':    { 'user': 'fred',    'age': 40 },
       *   'pebbles': { 'user': 'pebbles', 'age': 1 }
       * };
       *
       * _.mapValues(users, function(o) { return o.age; });
       * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
       *
       * // The `_.property` iteratee shorthand.
       * _.mapValues(users, 'age');
       * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
       */


      function mapValues(object, iteratee) {
        var result = {};
        iteratee = getIteratee(iteratee, 3);
        baseForOwn(object, function (value, key, object) {
          baseAssignValue(result, key, iteratee(value, key, object));
        });
        return result;
      }
      /**
       * This method is like `_.assign` except that it recursively merges own and
       * inherited enumerable string keyed properties of source objects into the
       * destination object. Source properties that resolve to `undefined` are
       * skipped if a destination value exists. Array and plain object properties
       * are merged recursively. Other objects and value types are overridden by
       * assignment. Source objects are applied from left to right. Subsequent
       * sources overwrite property assignments of previous sources.
       *
       * **Note:** This method mutates `object`.
       *
       * @static
       * @memberOf _
       * @since 0.5.0
       * @category Object
       * @param {Object} object The destination object.
       * @param {...Object} [sources] The source objects.
       * @returns {Object} Returns `object`.
       * @example
       *
       * var object = {
       *   'a': [{ 'b': 2 }, { 'd': 4 }]
       * };
       *
       * var other = {
       *   'a': [{ 'c': 3 }, { 'e': 5 }]
       * };
       *
       * _.merge(object, other);
       * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
       */


      var merge = createAssigner(function (object, source, srcIndex) {
        baseMerge(object, source, srcIndex);
      });
      /**
       * This method is like `_.merge` except that it accepts `customizer` which
       * is invoked to produce the merged values of the destination and source
       * properties. If `customizer` returns `undefined`, merging is handled by the
       * method instead. The `customizer` is invoked with six arguments:
       * (objValue, srcValue, key, object, source, stack).
       *
       * **Note:** This method mutates `object`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Object
       * @param {Object} object The destination object.
       * @param {...Object} sources The source objects.
       * @param {Function} customizer The function to customize assigned values.
       * @returns {Object} Returns `object`.
       * @example
       *
       * function customizer(objValue, srcValue) {
       *   if (_.isArray(objValue)) {
       *     return objValue.concat(srcValue);
       *   }
       * }
       *
       * var object = { 'a': [1], 'b': [2] };
       * var other = { 'a': [3], 'b': [4] };
       *
       * _.mergeWith(object, other, customizer);
       * // => { 'a': [1, 3], 'b': [2, 4] }
       */

      var mergeWith = createAssigner(function (object, source, srcIndex, customizer) {
        baseMerge(object, source, srcIndex, customizer);
      });
      /**
       * The opposite of `_.pick`; this method creates an object composed of the
       * own and inherited enumerable property paths of `object` that are not omitted.
       *
       * **Note:** This method is considerably slower than `_.pick`.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Object
       * @param {Object} object The source object.
       * @param {...(string|string[])} [paths] The property paths to omit.
       * @returns {Object} Returns the new object.
       * @example
       *
       * var object = { 'a': 1, 'b': '2', 'c': 3 };
       *
       * _.omit(object, ['a', 'c']);
       * // => { 'b': '2' }
       */

      var omit = flatRest(function (object, paths) {
        var result = {};

        if (object == null) {
          return result;
        }

        var isDeep = false;
        paths = arrayMap(paths, function (path) {
          path = castPath(path, object);
          isDeep || (isDeep = path.length > 1);
          return path;
        });
        copyObject(object, getAllKeysIn(object), result);

        if (isDeep) {
          result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
        }

        var length = paths.length;

        while (length--) {
          baseUnset(result, paths[length]);
        }

        return result;
      });
      /**
       * The opposite of `_.pickBy`; this method creates an object composed of
       * the own and inherited enumerable string keyed properties of `object` that
       * `predicate` doesn't return truthy for. The predicate is invoked with two
       * arguments: (value, key).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Object
       * @param {Object} object The source object.
       * @param {Function} [predicate=_.identity] The function invoked per property.
       * @returns {Object} Returns the new object.
       * @example
       *
       * var object = { 'a': 1, 'b': '2', 'c': 3 };
       *
       * _.omitBy(object, _.isNumber);
       * // => { 'b': '2' }
       */

      function omitBy(object, predicate) {
        return pickBy(object, negate(getIteratee(predicate)));
      }
      /**
       * Creates an object composed of the picked `object` properties.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Object
       * @param {Object} object The source object.
       * @param {...(string|string[])} [paths] The property paths to pick.
       * @returns {Object} Returns the new object.
       * @example
       *
       * var object = { 'a': 1, 'b': '2', 'c': 3 };
       *
       * _.pick(object, ['a', 'c']);
       * // => { 'a': 1, 'c': 3 }
       */


      var pick = flatRest(function (object, paths) {
        return object == null ? {} : basePick(object, paths);
      });
      /**
       * Creates an object composed of the `object` properties `predicate` returns
       * truthy for. The predicate is invoked with two arguments: (value, key).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Object
       * @param {Object} object The source object.
       * @param {Function} [predicate=_.identity] The function invoked per property.
       * @returns {Object} Returns the new object.
       * @example
       *
       * var object = { 'a': 1, 'b': '2', 'c': 3 };
       *
       * _.pickBy(object, _.isNumber);
       * // => { 'a': 1, 'c': 3 }
       */

      function pickBy(object, predicate) {
        if (object == null) {
          return {};
        }

        var props = arrayMap(getAllKeysIn(object), function (prop) {
          return [prop];
        });
        predicate = getIteratee(predicate);
        return basePickBy(object, props, function (value, path) {
          return predicate(value, path[0]);
        });
      }
      /**
       * This method is like `_.get` except that if the resolved value is a
       * function it's invoked with the `this` binding of its parent object and
       * its result is returned.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Object
       * @param {Object} object The object to query.
       * @param {Array|string} path The path of the property to resolve.
       * @param {*} [defaultValue] The value returned for `undefined` resolved values.
       * @returns {*} Returns the resolved value.
       * @example
       *
       * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
       *
       * _.result(object, 'a[0].b.c1');
       * // => 3
       *
       * _.result(object, 'a[0].b.c2');
       * // => 4
       *
       * _.result(object, 'a[0].b.c3', 'default');
       * // => 'default'
       *
       * _.result(object, 'a[0].b.c3', _.constant('default'));
       * // => 'default'
       */


      function result(object, path, defaultValue) {
        path = castPath(path, object);
        var index = -1,
            length = path.length; // Ensure the loop is entered when path is empty.

        if (!length) {
          length = 1;
          object = undefined;
        }

        while (++index < length) {
          var value = object == null ? undefined : object[toKey(path[index])];

          if (value === undefined) {
            index = length;
            value = defaultValue;
          }

          object = isFunction(value) ? value.call(object) : value;
        }

        return object;
      }
      /**
       * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
       * it's created. Arrays are created for missing index properties while objects
       * are created for all other missing properties. Use `_.setWith` to customize
       * `path` creation.
       *
       * **Note:** This method mutates `object`.
       *
       * @static
       * @memberOf _
       * @since 3.7.0
       * @category Object
       * @param {Object} object The object to modify.
       * @param {Array|string} path The path of the property to set.
       * @param {*} value The value to set.
       * @returns {Object} Returns `object`.
       * @example
       *
       * var object = { 'a': [{ 'b': { 'c': 3 } }] };
       *
       * _.set(object, 'a[0].b.c', 4);
       * console.log(object.a[0].b.c);
       * // => 4
       *
       * _.set(object, ['x', '0', 'y', 'z'], 5);
       * console.log(object.x[0].y.z);
       * // => 5
       */


      function set(object, path, value) {
        return object == null ? object : baseSet(object, path, value);
      }
      /**
       * This method is like `_.set` except that it accepts `customizer` which is
       * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
       * path creation is handled by the method instead. The `customizer` is invoked
       * with three arguments: (nsValue, key, nsObject).
       *
       * **Note:** This method mutates `object`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Object
       * @param {Object} object The object to modify.
       * @param {Array|string} path The path of the property to set.
       * @param {*} value The value to set.
       * @param {Function} [customizer] The function to customize assigned values.
       * @returns {Object} Returns `object`.
       * @example
       *
       * var object = {};
       *
       * _.setWith(object, '[0][1]', 'a', Object);
       * // => { '0': { '1': 'a' } }
       */


      function setWith(object, path, value, customizer) {
        customizer = typeof customizer == 'function' ? customizer : undefined;
        return object == null ? object : baseSet(object, path, value, customizer);
      }
      /**
       * Creates an array of own enumerable string keyed-value pairs for `object`
       * which can be consumed by `_.fromPairs`. If `object` is a map or set, its
       * entries are returned.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @alias entries
       * @category Object
       * @param {Object} object The object to query.
       * @returns {Array} Returns the key-value pairs.
       * @example
       *
       * function Foo() {
       *   this.a = 1;
       *   this.b = 2;
       * }
       *
       * Foo.prototype.c = 3;
       *
       * _.toPairs(new Foo);
       * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
       */


      var toPairs = createToPairs(keys);
      /**
       * Creates an array of own and inherited enumerable string keyed-value pairs
       * for `object` which can be consumed by `_.fromPairs`. If `object` is a map
       * or set, its entries are returned.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @alias entriesIn
       * @category Object
       * @param {Object} object The object to query.
       * @returns {Array} Returns the key-value pairs.
       * @example
       *
       * function Foo() {
       *   this.a = 1;
       *   this.b = 2;
       * }
       *
       * Foo.prototype.c = 3;
       *
       * _.toPairsIn(new Foo);
       * // => [['a', 1], ['b', 2], ['c', 3]] (iteration order is not guaranteed)
       */

      var toPairsIn = createToPairs(keysIn);
      /**
       * An alternative to `_.reduce`; this method transforms `object` to a new
       * `accumulator` object which is the result of running each of its own
       * enumerable string keyed properties thru `iteratee`, with each invocation
       * potentially mutating the `accumulator` object. If `accumulator` is not
       * provided, a new object with the same `[[Prototype]]` will be used. The
       * iteratee is invoked with four arguments: (accumulator, value, key, object).
       * Iteratee functions may exit iteration early by explicitly returning `false`.
       *
       * @static
       * @memberOf _
       * @since 1.3.0
       * @category Object
       * @param {Object} object The object to iterate over.
       * @param {Function} [iteratee=_.identity] The function invoked per iteration.
       * @param {*} [accumulator] The custom accumulator value.
       * @returns {*} Returns the accumulated value.
       * @example
       *
       * _.transform([2, 3, 4], function(result, n) {
       *   result.push(n *= n);
       *   return n % 2 == 0;
       * }, []);
       * // => [4, 9]
       *
       * _.transform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
       *   (result[value] || (result[value] = [])).push(key);
       * }, {});
       * // => { '1': ['a', 'c'], '2': ['b'] }
       */

      function transform(object, iteratee, accumulator) {
        var isArr = isArray(object),
            isArrLike = isArr || isBuffer(object) || isTypedArray(object);
        iteratee = getIteratee(iteratee, 4);

        if (accumulator == null) {
          var Ctor = object && object.constructor;

          if (isArrLike) {
            accumulator = isArr ? new Ctor() : [];
          } else if (isObject(object)) {
            accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
          } else {
            accumulator = {};
          }
        }

        (isArrLike ? arrayEach : baseForOwn)(object, function (value, index, object) {
          return iteratee(accumulator, value, index, object);
        });
        return accumulator;
      }
      /**
       * Removes the property at `path` of `object`.
       *
       * **Note:** This method mutates `object`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Object
       * @param {Object} object The object to modify.
       * @param {Array|string} path The path of the property to unset.
       * @returns {boolean} Returns `true` if the property is deleted, else `false`.
       * @example
       *
       * var object = { 'a': [{ 'b': { 'c': 7 } }] };
       * _.unset(object, 'a[0].b.c');
       * // => true
       *
       * console.log(object);
       * // => { 'a': [{ 'b': {} }] };
       *
       * _.unset(object, ['a', '0', 'b', 'c']);
       * // => true
       *
       * console.log(object);
       * // => { 'a': [{ 'b': {} }] };
       */


      function unset(object, path) {
        return object == null ? true : baseUnset(object, path);
      }
      /**
       * This method is like `_.set` except that accepts `updater` to produce the
       * value to set. Use `_.updateWith` to customize `path` creation. The `updater`
       * is invoked with one argument: (value).
       *
       * **Note:** This method mutates `object`.
       *
       * @static
       * @memberOf _
       * @since 4.6.0
       * @category Object
       * @param {Object} object The object to modify.
       * @param {Array|string} path The path of the property to set.
       * @param {Function} updater The function to produce the updated value.
       * @returns {Object} Returns `object`.
       * @example
       *
       * var object = { 'a': [{ 'b': { 'c': 3 } }] };
       *
       * _.update(object, 'a[0].b.c', function(n) { return n * n; });
       * console.log(object.a[0].b.c);
       * // => 9
       *
       * _.update(object, 'x[0].y.z', function(n) { return n ? n + 1 : 0; });
       * console.log(object.x[0].y.z);
       * // => 0
       */


      function update(object, path, updater) {
        return object == null ? object : baseUpdate(object, path, castFunction(updater));
      }
      /**
       * This method is like `_.update` except that it accepts `customizer` which is
       * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
       * path creation is handled by the method instead. The `customizer` is invoked
       * with three arguments: (nsValue, key, nsObject).
       *
       * **Note:** This method mutates `object`.
       *
       * @static
       * @memberOf _
       * @since 4.6.0
       * @category Object
       * @param {Object} object The object to modify.
       * @param {Array|string} path The path of the property to set.
       * @param {Function} updater The function to produce the updated value.
       * @param {Function} [customizer] The function to customize assigned values.
       * @returns {Object} Returns `object`.
       * @example
       *
       * var object = {};
       *
       * _.updateWith(object, '[0][1]', _.constant('a'), Object);
       * // => { '0': { '1': 'a' } }
       */


      function updateWith(object, path, updater, customizer) {
        customizer = typeof customizer == 'function' ? customizer : undefined;
        return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
      }
      /**
       * Creates an array of the own enumerable string keyed property values of `object`.
       *
       * **Note:** Non-object values are coerced to objects.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Object
       * @param {Object} object The object to query.
       * @returns {Array} Returns the array of property values.
       * @example
       *
       * function Foo() {
       *   this.a = 1;
       *   this.b = 2;
       * }
       *
       * Foo.prototype.c = 3;
       *
       * _.values(new Foo);
       * // => [1, 2] (iteration order is not guaranteed)
       *
       * _.values('hi');
       * // => ['h', 'i']
       */


      function values(object) {
        return object == null ? [] : baseValues(object, keys(object));
      }
      /**
       * Creates an array of the own and inherited enumerable string keyed property
       * values of `object`.
       *
       * **Note:** Non-object values are coerced to objects.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Object
       * @param {Object} object The object to query.
       * @returns {Array} Returns the array of property values.
       * @example
       *
       * function Foo() {
       *   this.a = 1;
       *   this.b = 2;
       * }
       *
       * Foo.prototype.c = 3;
       *
       * _.valuesIn(new Foo);
       * // => [1, 2, 3] (iteration order is not guaranteed)
       */


      function valuesIn(object) {
        return object == null ? [] : baseValues(object, keysIn(object));
      }
      /*------------------------------------------------------------------------*/

      /**
       * Clamps `number` within the inclusive `lower` and `upper` bounds.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Number
       * @param {number} number The number to clamp.
       * @param {number} [lower] The lower bound.
       * @param {number} upper The upper bound.
       * @returns {number} Returns the clamped number.
       * @example
       *
       * _.clamp(-10, -5, 5);
       * // => -5
       *
       * _.clamp(10, -5, 5);
       * // => 5
       */


      function clamp(number, lower, upper) {
        if (upper === undefined) {
          upper = lower;
          lower = undefined;
        }

        if (upper !== undefined) {
          upper = toNumber(upper);
          upper = upper === upper ? upper : 0;
        }

        if (lower !== undefined) {
          lower = toNumber(lower);
          lower = lower === lower ? lower : 0;
        }

        return baseClamp(toNumber(number), lower, upper);
      }
      /**
       * Checks if `n` is between `start` and up to, but not including, `end`. If
       * `end` is not specified, it's set to `start` with `start` then set to `0`.
       * If `start` is greater than `end` the params are swapped to support
       * negative ranges.
       *
       * @static
       * @memberOf _
       * @since 3.3.0
       * @category Number
       * @param {number} number The number to check.
       * @param {number} [start=0] The start of the range.
       * @param {number} end The end of the range.
       * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
       * @see _.range, _.rangeRight
       * @example
       *
       * _.inRange(3, 2, 4);
       * // => true
       *
       * _.inRange(4, 8);
       * // => true
       *
       * _.inRange(4, 2);
       * // => false
       *
       * _.inRange(2, 2);
       * // => false
       *
       * _.inRange(1.2, 2);
       * // => true
       *
       * _.inRange(5.2, 4);
       * // => false
       *
       * _.inRange(-3, -2, -6);
       * // => true
       */


      function inRange(number, start, end) {
        start = toFinite(start);

        if (end === undefined) {
          end = start;
          start = 0;
        } else {
          end = toFinite(end);
        }

        number = toNumber(number);
        return baseInRange(number, start, end);
      }
      /**
       * Produces a random number between the inclusive `lower` and `upper` bounds.
       * If only one argument is provided a number between `0` and the given number
       * is returned. If `floating` is `true`, or either `lower` or `upper` are
       * floats, a floating-point number is returned instead of an integer.
       *
       * **Note:** JavaScript follows the IEEE-754 standard for resolving
       * floating-point values which can produce unexpected results.
       *
       * @static
       * @memberOf _
       * @since 0.7.0
       * @category Number
       * @param {number} [lower=0] The lower bound.
       * @param {number} [upper=1] The upper bound.
       * @param {boolean} [floating] Specify returning a floating-point number.
       * @returns {number} Returns the random number.
       * @example
       *
       * _.random(0, 5);
       * // => an integer between 0 and 5
       *
       * _.random(5);
       * // => also an integer between 0 and 5
       *
       * _.random(5, true);
       * // => a floating-point number between 0 and 5
       *
       * _.random(1.2, 5.2);
       * // => a floating-point number between 1.2 and 5.2
       */


      function random(lower, upper, floating) {
        if (floating && typeof floating != 'boolean' && isIterateeCall(lower, upper, floating)) {
          upper = floating = undefined;
        }

        if (floating === undefined) {
          if (typeof upper == 'boolean') {
            floating = upper;
            upper = undefined;
          } else if (typeof lower == 'boolean') {
            floating = lower;
            lower = undefined;
          }
        }

        if (lower === undefined && upper === undefined) {
          lower = 0;
          upper = 1;
        } else {
          lower = toFinite(lower);

          if (upper === undefined) {
            upper = lower;
            lower = 0;
          } else {
            upper = toFinite(upper);
          }
        }

        if (lower > upper) {
          var temp = lower;
          lower = upper;
          upper = temp;
        }

        if (floating || lower % 1 || upper % 1) {
          var rand = nativeRandom();
          return nativeMin(lower + rand * (upper - lower + freeParseFloat('1e-' + ((rand + '').length - 1))), upper);
        }

        return baseRandom(lower, upper);
      }
      /*------------------------------------------------------------------------*/

      /**
       * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category String
       * @param {string} [string=''] The string to convert.
       * @returns {string} Returns the camel cased string.
       * @example
       *
       * _.camelCase('Foo Bar');
       * // => 'fooBar'
       *
       * _.camelCase('--foo-bar--');
       * // => 'fooBar'
       *
       * _.camelCase('__FOO_BAR__');
       * // => 'fooBar'
       */


      var camelCase = createCompounder(function (result, word, index) {
        word = word.toLowerCase();
        return result + (index ? capitalize(word) : word);
      });
      /**
       * Converts the first character of `string` to upper case and the remaining
       * to lower case.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category String
       * @param {string} [string=''] The string to capitalize.
       * @returns {string} Returns the capitalized string.
       * @example
       *
       * _.capitalize('FRED');
       * // => 'Fred'
       */

      function capitalize(string) {
        return upperFirst(toString(string).toLowerCase());
      }
      /**
       * Deburrs `string` by converting
       * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
       * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
       * letters to basic Latin letters and removing
       * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category String
       * @param {string} [string=''] The string to deburr.
       * @returns {string} Returns the deburred string.
       * @example
       *
       * _.deburr('déjà vu');
       * // => 'deja vu'
       */


      function deburr(string) {
        string = toString(string);
        return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
      }
      /**
       * Checks if `string` ends with the given target string.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category String
       * @param {string} [string=''] The string to inspect.
       * @param {string} [target] The string to search for.
       * @param {number} [position=string.length] The position to search up to.
       * @returns {boolean} Returns `true` if `string` ends with `target`,
       *  else `false`.
       * @example
       *
       * _.endsWith('abc', 'c');
       * // => true
       *
       * _.endsWith('abc', 'b');
       * // => false
       *
       * _.endsWith('abc', 'b', 2);
       * // => true
       */


      function endsWith(string, target, position) {
        string = toString(string);
        target = baseToString(target);
        var length = string.length;
        position = position === undefined ? length : baseClamp(toInteger(position), 0, length);
        var end = position;
        position -= target.length;
        return position >= 0 && string.slice(position, end) == target;
      }
      /**
       * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
       * corresponding HTML entities.
       *
       * **Note:** No other characters are escaped. To escape additional
       * characters use a third-party library like [_he_](https://mths.be/he).
       *
       * Though the ">" character is escaped for symmetry, characters like
       * ">" and "/" don't need escaping in HTML and have no special meaning
       * unless they're part of a tag or unquoted attribute value. See
       * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
       * (under "semi-related fun fact") for more details.
       *
       * When working with HTML you should always
       * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
       * XSS vectors.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category String
       * @param {string} [string=''] The string to escape.
       * @returns {string} Returns the escaped string.
       * @example
       *
       * _.escape('fred, barney, & pebbles');
       * // => 'fred, barney, &amp; pebbles'
       */


      function escape(string) {
        string = toString(string);
        return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
      }
      /**
       * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
       * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category String
       * @param {string} [string=''] The string to escape.
       * @returns {string} Returns the escaped string.
       * @example
       *
       * _.escapeRegExp('[lodash](https://lodash.com/)');
       * // => '\[lodash\]\(https://lodash\.com/\)'
       */


      function escapeRegExp(string) {
        string = toString(string);
        return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, '\\$&') : string;
      }
      /**
       * Converts `string` to
       * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category String
       * @param {string} [string=''] The string to convert.
       * @returns {string} Returns the kebab cased string.
       * @example
       *
       * _.kebabCase('Foo Bar');
       * // => 'foo-bar'
       *
       * _.kebabCase('fooBar');
       * // => 'foo-bar'
       *
       * _.kebabCase('__FOO_BAR__');
       * // => 'foo-bar'
       */


      var kebabCase = createCompounder(function (result, word, index) {
        return result + (index ? '-' : '') + word.toLowerCase();
      });
      /**
       * Converts `string`, as space separated words, to lower case.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category String
       * @param {string} [string=''] The string to convert.
       * @returns {string} Returns the lower cased string.
       * @example
       *
       * _.lowerCase('--Foo-Bar--');
       * // => 'foo bar'
       *
       * _.lowerCase('fooBar');
       * // => 'foo bar'
       *
       * _.lowerCase('__FOO_BAR__');
       * // => 'foo bar'
       */

      var lowerCase = createCompounder(function (result, word, index) {
        return result + (index ? ' ' : '') + word.toLowerCase();
      });
      /**
       * Converts the first character of `string` to lower case.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category String
       * @param {string} [string=''] The string to convert.
       * @returns {string} Returns the converted string.
       * @example
       *
       * _.lowerFirst('Fred');
       * // => 'fred'
       *
       * _.lowerFirst('FRED');
       * // => 'fRED'
       */

      var lowerFirst = createCaseFirst('toLowerCase');
      /**
       * Pads `string` on the left and right sides if it's shorter than `length`.
       * Padding characters are truncated if they can't be evenly divided by `length`.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category String
       * @param {string} [string=''] The string to pad.
       * @param {number} [length=0] The padding length.
       * @param {string} [chars=' '] The string used as padding.
       * @returns {string} Returns the padded string.
       * @example
       *
       * _.pad('abc', 8);
       * // => '  abc   '
       *
       * _.pad('abc', 8, '_-');
       * // => '_-abc_-_'
       *
       * _.pad('abc', 3);
       * // => 'abc'
       */

      function pad(string, length, chars) {
        string = toString(string);
        length = toInteger(length);
        var strLength = length ? stringSize(string) : 0;

        if (!length || strLength >= length) {
          return string;
        }

        var mid = (length - strLength) / 2;
        return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
      }
      /**
       * Pads `string` on the right side if it's shorter than `length`. Padding
       * characters are truncated if they exceed `length`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category String
       * @param {string} [string=''] The string to pad.
       * @param {number} [length=0] The padding length.
       * @param {string} [chars=' '] The string used as padding.
       * @returns {string} Returns the padded string.
       * @example
       *
       * _.padEnd('abc', 6);
       * // => 'abc   '
       *
       * _.padEnd('abc', 6, '_-');
       * // => 'abc_-_'
       *
       * _.padEnd('abc', 3);
       * // => 'abc'
       */


      function padEnd(string, length, chars) {
        string = toString(string);
        length = toInteger(length);
        var strLength = length ? stringSize(string) : 0;
        return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
      }
      /**
       * Pads `string` on the left side if it's shorter than `length`. Padding
       * characters are truncated if they exceed `length`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category String
       * @param {string} [string=''] The string to pad.
       * @param {number} [length=0] The padding length.
       * @param {string} [chars=' '] The string used as padding.
       * @returns {string} Returns the padded string.
       * @example
       *
       * _.padStart('abc', 6);
       * // => '   abc'
       *
       * _.padStart('abc', 6, '_-');
       * // => '_-_abc'
       *
       * _.padStart('abc', 3);
       * // => 'abc'
       */


      function padStart(string, length, chars) {
        string = toString(string);
        length = toInteger(length);
        var strLength = length ? stringSize(string) : 0;
        return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
      }
      /**
       * Converts `string` to an integer of the specified radix. If `radix` is
       * `undefined` or `0`, a `radix` of `10` is used unless `value` is a
       * hexadecimal, in which case a `radix` of `16` is used.
       *
       * **Note:** This method aligns with the
       * [ES5 implementation](https://es5.github.io/#x15.1.2.2) of `parseInt`.
       *
       * @static
       * @memberOf _
       * @since 1.1.0
       * @category String
       * @param {string} string The string to convert.
       * @param {number} [radix=10] The radix to interpret `value` by.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {number} Returns the converted integer.
       * @example
       *
       * _.parseInt('08');
       * // => 8
       *
       * _.map(['6', '08', '10'], _.parseInt);
       * // => [6, 8, 10]
       */


      function parseInt(string, radix, guard) {
        if (guard || radix == null) {
          radix = 0;
        } else if (radix) {
          radix = +radix;
        }

        return nativeParseInt(toString(string).replace(reTrimStart, ''), radix || 0);
      }
      /**
       * Repeats the given string `n` times.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category String
       * @param {string} [string=''] The string to repeat.
       * @param {number} [n=1] The number of times to repeat the string.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {string} Returns the repeated string.
       * @example
       *
       * _.repeat('*', 3);
       * // => '***'
       *
       * _.repeat('abc', 2);
       * // => 'abcabc'
       *
       * _.repeat('abc', 0);
       * // => ''
       */


      function repeat(string, n, guard) {
        if (guard ? isIterateeCall(string, n, guard) : n === undefined) {
          n = 1;
        } else {
          n = toInteger(n);
        }

        return baseRepeat(toString(string), n);
      }
      /**
       * Replaces matches for `pattern` in `string` with `replacement`.
       *
       * **Note:** This method is based on
       * [`String#replace`](https://mdn.io/String/replace).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category String
       * @param {string} [string=''] The string to modify.
       * @param {RegExp|string} pattern The pattern to replace.
       * @param {Function|string} replacement The match replacement.
       * @returns {string} Returns the modified string.
       * @example
       *
       * _.replace('Hi Fred', 'Fred', 'Barney');
       * // => 'Hi Barney'
       */


      function replace() {
        var args = arguments,
            string = toString(args[0]);
        return args.length < 3 ? string : string.replace(args[1], args[2]);
      }
      /**
       * Converts `string` to
       * [snake case](https://en.wikipedia.org/wiki/Snake_case).
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category String
       * @param {string} [string=''] The string to convert.
       * @returns {string} Returns the snake cased string.
       * @example
       *
       * _.snakeCase('Foo Bar');
       * // => 'foo_bar'
       *
       * _.snakeCase('fooBar');
       * // => 'foo_bar'
       *
       * _.snakeCase('--FOO-BAR--');
       * // => 'foo_bar'
       */


      var snakeCase = createCompounder(function (result, word, index) {
        return result + (index ? '_' : '') + word.toLowerCase();
      });
      /**
       * Splits `string` by `separator`.
       *
       * **Note:** This method is based on
       * [`String#split`](https://mdn.io/String/split).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category String
       * @param {string} [string=''] The string to split.
       * @param {RegExp|string} separator The separator pattern to split by.
       * @param {number} [limit] The length to truncate results to.
       * @returns {Array} Returns the string segments.
       * @example
       *
       * _.split('a-b-c', '-', 2);
       * // => ['a', 'b']
       */

      function split(string, separator, limit) {
        if (limit && typeof limit != 'number' && isIterateeCall(string, separator, limit)) {
          separator = limit = undefined;
        }

        limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0;

        if (!limit) {
          return [];
        }

        string = toString(string);

        if (string && (typeof separator == 'string' || separator != null && !isRegExp(separator))) {
          separator = baseToString(separator);

          if (!separator && hasUnicode(string)) {
            return castSlice(stringToArray(string), 0, limit);
          }
        }

        return string.split(separator, limit);
      }
      /**
       * Converts `string` to
       * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
       *
       * @static
       * @memberOf _
       * @since 3.1.0
       * @category String
       * @param {string} [string=''] The string to convert.
       * @returns {string} Returns the start cased string.
       * @example
       *
       * _.startCase('--foo-bar--');
       * // => 'Foo Bar'
       *
       * _.startCase('fooBar');
       * // => 'Foo Bar'
       *
       * _.startCase('__FOO_BAR__');
       * // => 'FOO BAR'
       */


      var startCase = createCompounder(function (result, word, index) {
        return result + (index ? ' ' : '') + upperFirst(word);
      });
      /**
       * Checks if `string` starts with the given target string.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category String
       * @param {string} [string=''] The string to inspect.
       * @param {string} [target] The string to search for.
       * @param {number} [position=0] The position to search from.
       * @returns {boolean} Returns `true` if `string` starts with `target`,
       *  else `false`.
       * @example
       *
       * _.startsWith('abc', 'a');
       * // => true
       *
       * _.startsWith('abc', 'b');
       * // => false
       *
       * _.startsWith('abc', 'b', 1);
       * // => true
       */

      function startsWith(string, target, position) {
        string = toString(string);
        position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
        target = baseToString(target);
        return string.slice(position, position + target.length) == target;
      }
      /**
       * Creates a compiled template function that can interpolate data properties
       * in "interpolate" delimiters, HTML-escape interpolated data properties in
       * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
       * properties may be accessed as free variables in the template. If a setting
       * object is given, it takes precedence over `_.templateSettings` values.
       *
       * **Note:** In the development build `_.template` utilizes
       * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
       * for easier debugging.
       *
       * For more information on precompiling templates see
       * [lodash's custom builds documentation](https://lodash.com/custom-builds).
       *
       * For more information on Chrome extension sandboxes see
       * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category String
       * @param {string} [string=''] The template string.
       * @param {Object} [options={}] The options object.
       * @param {RegExp} [options.escape=_.templateSettings.escape]
       *  The HTML "escape" delimiter.
       * @param {RegExp} [options.evaluate=_.templateSettings.evaluate]
       *  The "evaluate" delimiter.
       * @param {Object} [options.imports=_.templateSettings.imports]
       *  An object to import into the template as free variables.
       * @param {RegExp} [options.interpolate=_.templateSettings.interpolate]
       *  The "interpolate" delimiter.
       * @param {string} [options.sourceURL='lodash.templateSources[n]']
       *  The sourceURL of the compiled template.
       * @param {string} [options.variable='obj']
       *  The data object variable name.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {Function} Returns the compiled template function.
       * @example
       *
       * // Use the "interpolate" delimiter to create a compiled template.
       * var compiled = _.template('hello <%= user %>!');
       * compiled({ 'user': 'fred' });
       * // => 'hello fred!'
       *
       * // Use the HTML "escape" delimiter to escape data property values.
       * var compiled = _.template('<b><%- value %></b>');
       * compiled({ 'value': '<script>' });
       * // => '<b>&lt;script&gt;</b>'
       *
       * // Use the "evaluate" delimiter to execute JavaScript and generate HTML.
       * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
       * compiled({ 'users': ['fred', 'barney'] });
       * // => '<li>fred</li><li>barney</li>'
       *
       * // Use the internal `print` function in "evaluate" delimiters.
       * var compiled = _.template('<% print("hello " + user); %>!');
       * compiled({ 'user': 'barney' });
       * // => 'hello barney!'
       *
       * // Use the ES template literal delimiter as an "interpolate" delimiter.
       * // Disable support by replacing the "interpolate" delimiter.
       * var compiled = _.template('hello ${ user }!');
       * compiled({ 'user': 'pebbles' });
       * // => 'hello pebbles!'
       *
       * // Use backslashes to treat delimiters as plain text.
       * var compiled = _.template('<%= "\\<%- value %\\>" %>');
       * compiled({ 'value': 'ignored' });
       * // => '<%- value %>'
       *
       * // Use the `imports` option to import `jQuery` as `jq`.
       * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
       * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
       * compiled({ 'users': ['fred', 'barney'] });
       * // => '<li>fred</li><li>barney</li>'
       *
       * // Use the `sourceURL` option to specify a custom sourceURL for the template.
       * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
       * compiled(data);
       * // => Find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector.
       *
       * // Use the `variable` option to ensure a with-statement isn't used in the compiled template.
       * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
       * compiled.source;
       * // => function(data) {
       * //   var __t, __p = '';
       * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
       * //   return __p;
       * // }
       *
       * // Use custom template delimiters.
       * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
       * var compiled = _.template('hello {{ user }}!');
       * compiled({ 'user': 'mustache' });
       * // => 'hello mustache!'
       *
       * // Use the `source` property to inline compiled templates for meaningful
       * // line numbers in error messages and stack traces.
       * fs.writeFileSync(path.join(process.cwd(), 'jst.js'), '\
       *   var JST = {\
       *     "main": ' + _.template(mainText).source + '\
       *   };\
       * ');
       */


      function template(string, options, guard) {
        // Based on John Resig's `tmpl` implementation
        // (http://ejohn.org/blog/javascript-micro-templating/)
        // and Laura Doktorova's doT.js (https://github.com/olado/doT).
        var settings = lodash.templateSettings;

        if (guard && isIterateeCall(string, options, guard)) {
          options = undefined;
        }

        string = toString(string);
        options = assignInWith({}, options, settings, customDefaultsAssignIn);
        var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn),
            importsKeys = keys(imports),
            importsValues = baseValues(imports, importsKeys);
        var isEscaping,
            isEvaluating,
            index = 0,
            interpolate = options.interpolate || reNoMatch,
            source = "__p += '"; // Compile the regexp to match each delimiter.

        var reDelimiters = RegExp((options.escape || reNoMatch).source + '|' + interpolate.source + '|' + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' + (options.evaluate || reNoMatch).source + '|$', 'g'); // Use a sourceURL for easier debugging.
        // The sourceURL gets injected into the source that's eval-ed, so be careful
        // with lookup (in case of e.g. prototype pollution), and strip newlines if any.
        // A newline wouldn't be a valid sourceURL anyway, and it'd enable code injection.

        var sourceURL = '//# sourceURL=' + (hasOwnProperty.call(options, 'sourceURL') ? (options.sourceURL + '').replace(/[\r\n]/g, ' ') : 'lodash.templateSources[' + ++templateCounter + ']') + '\n';
        string.replace(reDelimiters, function (match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
          interpolateValue || (interpolateValue = esTemplateValue); // Escape characters that can't be included in string literals.

          source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar); // Replace delimiters with snippets.

          if (escapeValue) {
            isEscaping = true;
            source += "' +\n__e(" + escapeValue + ") +\n'";
          }

          if (evaluateValue) {
            isEvaluating = true;
            source += "';\n" + evaluateValue + ";\n__p += '";
          }

          if (interpolateValue) {
            source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
          }

          index = offset + match.length; // The JS engine embedded in Adobe products needs `match` returned in
          // order to produce the correct `offset` value.

          return match;
        });
        source += "';\n"; // If `variable` is not specified wrap a with-statement around the generated
        // code to add the data object to the top of the scope chain.
        // Like with sourceURL, we take care to not check the option's prototype,
        // as this configuration is a code injection vector.

        var variable = hasOwnProperty.call(options, 'variable') && options.variable;

        if (!variable) {
          source = 'with (obj) {\n' + source + '\n}\n';
        } // Cleanup code by stripping empty strings.


        source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source).replace(reEmptyStringMiddle, '$1').replace(reEmptyStringTrailing, '$1;'); // Frame code as the function body.

        source = 'function(' + (variable || 'obj') + ') {\n' + (variable ? '' : 'obj || (obj = {});\n') + "var __t, __p = ''" + (isEscaping ? ', __e = _.escape' : '') + (isEvaluating ? ', __j = Array.prototype.join;\n' + "function print() { __p += __j.call(arguments, '') }\n" : ';\n') + source + 'return __p\n}';
        var result = attempt(function () {
          return Function(importsKeys, sourceURL + 'return ' + source).apply(undefined, importsValues);
        }); // Provide the compiled function's source by its `toString` method or
        // the `source` property as a convenience for inlining compiled templates.

        result.source = source;

        if (isError(result)) {
          throw result;
        }

        return result;
      }
      /**
       * Converts `string`, as a whole, to lower case just like
       * [String#toLowerCase](https://mdn.io/toLowerCase).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category String
       * @param {string} [string=''] The string to convert.
       * @returns {string} Returns the lower cased string.
       * @example
       *
       * _.toLower('--Foo-Bar--');
       * // => '--foo-bar--'
       *
       * _.toLower('fooBar');
       * // => 'foobar'
       *
       * _.toLower('__FOO_BAR__');
       * // => '__foo_bar__'
       */


      function toLower(value) {
        return toString(value).toLowerCase();
      }
      /**
       * Converts `string`, as a whole, to upper case just like
       * [String#toUpperCase](https://mdn.io/toUpperCase).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category String
       * @param {string} [string=''] The string to convert.
       * @returns {string} Returns the upper cased string.
       * @example
       *
       * _.toUpper('--foo-bar--');
       * // => '--FOO-BAR--'
       *
       * _.toUpper('fooBar');
       * // => 'FOOBAR'
       *
       * _.toUpper('__foo_bar__');
       * // => '__FOO_BAR__'
       */


      function toUpper(value) {
        return toString(value).toUpperCase();
      }
      /**
       * Removes leading and trailing whitespace or specified characters from `string`.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category String
       * @param {string} [string=''] The string to trim.
       * @param {string} [chars=whitespace] The characters to trim.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {string} Returns the trimmed string.
       * @example
       *
       * _.trim('  abc  ');
       * // => 'abc'
       *
       * _.trim('-_-abc-_-', '_-');
       * // => 'abc'
       *
       * _.map(['  foo  ', '  bar  '], _.trim);
       * // => ['foo', 'bar']
       */


      function trim(string, chars, guard) {
        string = toString(string);

        if (string && (guard || chars === undefined)) {
          return string.replace(reTrim, '');
        }

        if (!string || !(chars = baseToString(chars))) {
          return string;
        }

        var strSymbols = stringToArray(string),
            chrSymbols = stringToArray(chars),
            start = charsStartIndex(strSymbols, chrSymbols),
            end = charsEndIndex(strSymbols, chrSymbols) + 1;
        return castSlice(strSymbols, start, end).join('');
      }
      /**
       * Removes trailing whitespace or specified characters from `string`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category String
       * @param {string} [string=''] The string to trim.
       * @param {string} [chars=whitespace] The characters to trim.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {string} Returns the trimmed string.
       * @example
       *
       * _.trimEnd('  abc  ');
       * // => '  abc'
       *
       * _.trimEnd('-_-abc-_-', '_-');
       * // => '-_-abc'
       */


      function trimEnd(string, chars, guard) {
        string = toString(string);

        if (string && (guard || chars === undefined)) {
          return string.replace(reTrimEnd, '');
        }

        if (!string || !(chars = baseToString(chars))) {
          return string;
        }

        var strSymbols = stringToArray(string),
            end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
        return castSlice(strSymbols, 0, end).join('');
      }
      /**
       * Removes leading whitespace or specified characters from `string`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category String
       * @param {string} [string=''] The string to trim.
       * @param {string} [chars=whitespace] The characters to trim.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {string} Returns the trimmed string.
       * @example
       *
       * _.trimStart('  abc  ');
       * // => 'abc  '
       *
       * _.trimStart('-_-abc-_-', '_-');
       * // => 'abc-_-'
       */


      function trimStart(string, chars, guard) {
        string = toString(string);

        if (string && (guard || chars === undefined)) {
          return string.replace(reTrimStart, '');
        }

        if (!string || !(chars = baseToString(chars))) {
          return string;
        }

        var strSymbols = stringToArray(string),
            start = charsStartIndex(strSymbols, stringToArray(chars));
        return castSlice(strSymbols, start).join('');
      }
      /**
       * Truncates `string` if it's longer than the given maximum string length.
       * The last characters of the truncated string are replaced with the omission
       * string which defaults to "...".
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category String
       * @param {string} [string=''] The string to truncate.
       * @param {Object} [options={}] The options object.
       * @param {number} [options.length=30] The maximum string length.
       * @param {string} [options.omission='...'] The string to indicate text is omitted.
       * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
       * @returns {string} Returns the truncated string.
       * @example
       *
       * _.truncate('hi-diddly-ho there, neighborino');
       * // => 'hi-diddly-ho there, neighbo...'
       *
       * _.truncate('hi-diddly-ho there, neighborino', {
       *   'length': 24,
       *   'separator': ' '
       * });
       * // => 'hi-diddly-ho there,...'
       *
       * _.truncate('hi-diddly-ho there, neighborino', {
       *   'length': 24,
       *   'separator': /,? +/
       * });
       * // => 'hi-diddly-ho there...'
       *
       * _.truncate('hi-diddly-ho there, neighborino', {
       *   'omission': ' [...]'
       * });
       * // => 'hi-diddly-ho there, neig [...]'
       */


      function truncate(string, options) {
        var length = DEFAULT_TRUNC_LENGTH,
            omission = DEFAULT_TRUNC_OMISSION;

        if (isObject(options)) {
          var separator = 'separator' in options ? options.separator : separator;
          length = 'length' in options ? toInteger(options.length) : length;
          omission = 'omission' in options ? baseToString(options.omission) : omission;
        }

        string = toString(string);
        var strLength = string.length;

        if (hasUnicode(string)) {
          var strSymbols = stringToArray(string);
          strLength = strSymbols.length;
        }

        if (length >= strLength) {
          return string;
        }

        var end = length - stringSize(omission);

        if (end < 1) {
          return omission;
        }

        var result = strSymbols ? castSlice(strSymbols, 0, end).join('') : string.slice(0, end);

        if (separator === undefined) {
          return result + omission;
        }

        if (strSymbols) {
          end += result.length - end;
        }

        if (isRegExp(separator)) {
          if (string.slice(end).search(separator)) {
            var match,
                substring = result;

            if (!separator.global) {
              separator = RegExp(separator.source, toString(reFlags.exec(separator)) + 'g');
            }

            separator.lastIndex = 0;

            while (match = separator.exec(substring)) {
              var newEnd = match.index;
            }

            result = result.slice(0, newEnd === undefined ? end : newEnd);
          }
        } else if (string.indexOf(baseToString(separator), end) != end) {
          var index = result.lastIndexOf(separator);

          if (index > -1) {
            result = result.slice(0, index);
          }
        }

        return result + omission;
      }
      /**
       * The inverse of `_.escape`; this method converts the HTML entities
       * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to
       * their corresponding characters.
       *
       * **Note:** No other HTML entities are unescaped. To unescape additional
       * HTML entities use a third-party library like [_he_](https://mths.be/he).
       *
       * @static
       * @memberOf _
       * @since 0.6.0
       * @category String
       * @param {string} [string=''] The string to unescape.
       * @returns {string} Returns the unescaped string.
       * @example
       *
       * _.unescape('fred, barney, &amp; pebbles');
       * // => 'fred, barney, & pebbles'
       */


      function unescape(string) {
        string = toString(string);
        return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
      }
      /**
       * Converts `string`, as space separated words, to upper case.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category String
       * @param {string} [string=''] The string to convert.
       * @returns {string} Returns the upper cased string.
       * @example
       *
       * _.upperCase('--foo-bar');
       * // => 'FOO BAR'
       *
       * _.upperCase('fooBar');
       * // => 'FOO BAR'
       *
       * _.upperCase('__foo_bar__');
       * // => 'FOO BAR'
       */


      var upperCase = createCompounder(function (result, word, index) {
        return result + (index ? ' ' : '') + word.toUpperCase();
      });
      /**
       * Converts the first character of `string` to upper case.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category String
       * @param {string} [string=''] The string to convert.
       * @returns {string} Returns the converted string.
       * @example
       *
       * _.upperFirst('fred');
       * // => 'Fred'
       *
       * _.upperFirst('FRED');
       * // => 'FRED'
       */

      var upperFirst = createCaseFirst('toUpperCase');
      /**
       * Splits `string` into an array of its words.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category String
       * @param {string} [string=''] The string to inspect.
       * @param {RegExp|string} [pattern] The pattern to match words.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {Array} Returns the words of `string`.
       * @example
       *
       * _.words('fred, barney, & pebbles');
       * // => ['fred', 'barney', 'pebbles']
       *
       * _.words('fred, barney, & pebbles', /[^, ]+/g);
       * // => ['fred', 'barney', '&', 'pebbles']
       */

      function words(string, pattern, guard) {
        string = toString(string);
        pattern = guard ? undefined : pattern;

        if (pattern === undefined) {
          return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
        }

        return string.match(pattern) || [];
      }
      /*------------------------------------------------------------------------*/

      /**
       * Attempts to invoke `func`, returning either the result or the caught error
       * object. Any additional arguments are provided to `func` when it's invoked.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Util
       * @param {Function} func The function to attempt.
       * @param {...*} [args] The arguments to invoke `func` with.
       * @returns {*} Returns the `func` result or error object.
       * @example
       *
       * // Avoid throwing errors for invalid selectors.
       * var elements = _.attempt(function(selector) {
       *   return document.querySelectorAll(selector);
       * }, '>_>');
       *
       * if (_.isError(elements)) {
       *   elements = [];
       * }
       */


      var attempt = baseRest(function (func, args) {
        try {
          return apply(func, undefined, args);
        } catch (e) {
          return isError(e) ? e : new Error(e);
        }
      });
      /**
       * Binds methods of an object to the object itself, overwriting the existing
       * method.
       *
       * **Note:** This method doesn't set the "length" property of bound functions.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Util
       * @param {Object} object The object to bind and assign the bound methods to.
       * @param {...(string|string[])} methodNames The object method names to bind.
       * @returns {Object} Returns `object`.
       * @example
       *
       * var view = {
       *   'label': 'docs',
       *   'click': function() {
       *     console.log('clicked ' + this.label);
       *   }
       * };
       *
       * _.bindAll(view, ['click']);
       * jQuery(element).on('click', view.click);
       * // => Logs 'clicked docs' when clicked.
       */

      var bindAll = flatRest(function (object, methodNames) {
        arrayEach(methodNames, function (key) {
          key = toKey(key);
          baseAssignValue(object, key, bind(object[key], object));
        });
        return object;
      });
      /**
       * Creates a function that iterates over `pairs` and invokes the corresponding
       * function of the first predicate to return truthy. The predicate-function
       * pairs are invoked with the `this` binding and arguments of the created
       * function.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Util
       * @param {Array} pairs The predicate-function pairs.
       * @returns {Function} Returns the new composite function.
       * @example
       *
       * var func = _.cond([
       *   [_.matches({ 'a': 1 }),           _.constant('matches A')],
       *   [_.conforms({ 'b': _.isNumber }), _.constant('matches B')],
       *   [_.stubTrue,                      _.constant('no match')]
       * ]);
       *
       * func({ 'a': 1, 'b': 2 });
       * // => 'matches A'
       *
       * func({ 'a': 0, 'b': 1 });
       * // => 'matches B'
       *
       * func({ 'a': '1', 'b': '2' });
       * // => 'no match'
       */

      function cond(pairs) {
        var length = pairs == null ? 0 : pairs.length,
            toIteratee = getIteratee();
        pairs = !length ? [] : arrayMap(pairs, function (pair) {
          if (typeof pair[1] != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }

          return [toIteratee(pair[0]), pair[1]];
        });
        return baseRest(function (args) {
          var index = -1;

          while (++index < length) {
            var pair = pairs[index];

            if (apply(pair[0], this, args)) {
              return apply(pair[1], this, args);
            }
          }
        });
      }
      /**
       * Creates a function that invokes the predicate properties of `source` with
       * the corresponding property values of a given object, returning `true` if
       * all predicates return truthy, else `false`.
       *
       * **Note:** The created function is equivalent to `_.conformsTo` with
       * `source` partially applied.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Util
       * @param {Object} source The object of property predicates to conform to.
       * @returns {Function} Returns the new spec function.
       * @example
       *
       * var objects = [
       *   { 'a': 2, 'b': 1 },
       *   { 'a': 1, 'b': 2 }
       * ];
       *
       * _.filter(objects, _.conforms({ 'b': function(n) { return n > 1; } }));
       * // => [{ 'a': 1, 'b': 2 }]
       */


      function conforms(source) {
        return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
      }
      /**
       * Creates a function that returns `value`.
       *
       * @static
       * @memberOf _
       * @since 2.4.0
       * @category Util
       * @param {*} value The value to return from the new function.
       * @returns {Function} Returns the new constant function.
       * @example
       *
       * var objects = _.times(2, _.constant({ 'a': 1 }));
       *
       * console.log(objects);
       * // => [{ 'a': 1 }, { 'a': 1 }]
       *
       * console.log(objects[0] === objects[1]);
       * // => true
       */


      function constant(value) {
        return function () {
          return value;
        };
      }
      /**
       * Checks `value` to determine whether a default value should be returned in
       * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
       * or `undefined`.
       *
       * @static
       * @memberOf _
       * @since 4.14.0
       * @category Util
       * @param {*} value The value to check.
       * @param {*} defaultValue The default value.
       * @returns {*} Returns the resolved value.
       * @example
       *
       * _.defaultTo(1, 10);
       * // => 1
       *
       * _.defaultTo(undefined, 10);
       * // => 10
       */


      function defaultTo(value, defaultValue) {
        return value == null || value !== value ? defaultValue : value;
      }
      /**
       * Creates a function that returns the result of invoking the given functions
       * with the `this` binding of the created function, where each successive
       * invocation is supplied the return value of the previous.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Util
       * @param {...(Function|Function[])} [funcs] The functions to invoke.
       * @returns {Function} Returns the new composite function.
       * @see _.flowRight
       * @example
       *
       * function square(n) {
       *   return n * n;
       * }
       *
       * var addSquare = _.flow([_.add, square]);
       * addSquare(1, 2);
       * // => 9
       */


      var flow = createFlow();
      /**
       * This method is like `_.flow` except that it creates a function that
       * invokes the given functions from right to left.
       *
       * @static
       * @since 3.0.0
       * @memberOf _
       * @category Util
       * @param {...(Function|Function[])} [funcs] The functions to invoke.
       * @returns {Function} Returns the new composite function.
       * @see _.flow
       * @example
       *
       * function square(n) {
       *   return n * n;
       * }
       *
       * var addSquare = _.flowRight([square, _.add]);
       * addSquare(1, 2);
       * // => 9
       */

      var flowRight = createFlow(true);
      /**
       * This method returns the first argument it receives.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Util
       * @param {*} value Any value.
       * @returns {*} Returns `value`.
       * @example
       *
       * var object = { 'a': 1 };
       *
       * console.log(_.identity(object) === object);
       * // => true
       */

      function identity(value) {
        return value;
      }
      /**
       * Creates a function that invokes `func` with the arguments of the created
       * function. If `func` is a property name, the created function returns the
       * property value for a given element. If `func` is an array or object, the
       * created function returns `true` for elements that contain the equivalent
       * source properties, otherwise it returns `false`.
       *
       * @static
       * @since 4.0.0
       * @memberOf _
       * @category Util
       * @param {*} [func=_.identity] The value to convert to a callback.
       * @returns {Function} Returns the callback.
       * @example
       *
       * var users = [
       *   { 'user': 'barney', 'age': 36, 'active': true },
       *   { 'user': 'fred',   'age': 40, 'active': false }
       * ];
       *
       * // The `_.matches` iteratee shorthand.
       * _.filter(users, _.iteratee({ 'user': 'barney', 'active': true }));
       * // => [{ 'user': 'barney', 'age': 36, 'active': true }]
       *
       * // The `_.matchesProperty` iteratee shorthand.
       * _.filter(users, _.iteratee(['user', 'fred']));
       * // => [{ 'user': 'fred', 'age': 40 }]
       *
       * // The `_.property` iteratee shorthand.
       * _.map(users, _.iteratee('user'));
       * // => ['barney', 'fred']
       *
       * // Create custom iteratee shorthands.
       * _.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
       *   return !_.isRegExp(func) ? iteratee(func) : function(string) {
       *     return func.test(string);
       *   };
       * });
       *
       * _.filter(['abc', 'def'], /ef/);
       * // => ['def']
       */


      function iteratee(func) {
        return baseIteratee(typeof func == 'function' ? func : baseClone(func, CLONE_DEEP_FLAG));
      }
      /**
       * Creates a function that performs a partial deep comparison between a given
       * object and `source`, returning `true` if the given object has equivalent
       * property values, else `false`.
       *
       * **Note:** The created function is equivalent to `_.isMatch` with `source`
       * partially applied.
       *
       * Partial comparisons will match empty array and empty object `source`
       * values against any array or object value, respectively. See `_.isEqual`
       * for a list of supported value comparisons.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Util
       * @param {Object} source The object of property values to match.
       * @returns {Function} Returns the new spec function.
       * @example
       *
       * var objects = [
       *   { 'a': 1, 'b': 2, 'c': 3 },
       *   { 'a': 4, 'b': 5, 'c': 6 }
       * ];
       *
       * _.filter(objects, _.matches({ 'a': 4, 'c': 6 }));
       * // => [{ 'a': 4, 'b': 5, 'c': 6 }]
       */


      function matches(source) {
        return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
      }
      /**
       * Creates a function that performs a partial deep comparison between the
       * value at `path` of a given object to `srcValue`, returning `true` if the
       * object value is equivalent, else `false`.
       *
       * **Note:** Partial comparisons will match empty array and empty object
       * `srcValue` values against any array or object value, respectively. See
       * `_.isEqual` for a list of supported value comparisons.
       *
       * @static
       * @memberOf _
       * @since 3.2.0
       * @category Util
       * @param {Array|string} path The path of the property to get.
       * @param {*} srcValue The value to match.
       * @returns {Function} Returns the new spec function.
       * @example
       *
       * var objects = [
       *   { 'a': 1, 'b': 2, 'c': 3 },
       *   { 'a': 4, 'b': 5, 'c': 6 }
       * ];
       *
       * _.find(objects, _.matchesProperty('a', 4));
       * // => { 'a': 4, 'b': 5, 'c': 6 }
       */


      function matchesProperty(path, srcValue) {
        return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
      }
      /**
       * Creates a function that invokes the method at `path` of a given object.
       * Any additional arguments are provided to the invoked method.
       *
       * @static
       * @memberOf _
       * @since 3.7.0
       * @category Util
       * @param {Array|string} path The path of the method to invoke.
       * @param {...*} [args] The arguments to invoke the method with.
       * @returns {Function} Returns the new invoker function.
       * @example
       *
       * var objects = [
       *   { 'a': { 'b': _.constant(2) } },
       *   { 'a': { 'b': _.constant(1) } }
       * ];
       *
       * _.map(objects, _.method('a.b'));
       * // => [2, 1]
       *
       * _.map(objects, _.method(['a', 'b']));
       * // => [2, 1]
       */


      var method = baseRest(function (path, args) {
        return function (object) {
          return baseInvoke(object, path, args);
        };
      });
      /**
       * The opposite of `_.method`; this method creates a function that invokes
       * the method at a given path of `object`. Any additional arguments are
       * provided to the invoked method.
       *
       * @static
       * @memberOf _
       * @since 3.7.0
       * @category Util
       * @param {Object} object The object to query.
       * @param {...*} [args] The arguments to invoke the method with.
       * @returns {Function} Returns the new invoker function.
       * @example
       *
       * var array = _.times(3, _.constant),
       *     object = { 'a': array, 'b': array, 'c': array };
       *
       * _.map(['a[2]', 'c[0]'], _.methodOf(object));
       * // => [2, 0]
       *
       * _.map([['a', '2'], ['c', '0']], _.methodOf(object));
       * // => [2, 0]
       */

      var methodOf = baseRest(function (object, args) {
        return function (path) {
          return baseInvoke(object, path, args);
        };
      });
      /**
       * Adds all own enumerable string keyed function properties of a source
       * object to the destination object. If `object` is a function, then methods
       * are added to its prototype as well.
       *
       * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
       * avoid conflicts caused by modifying the original.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Util
       * @param {Function|Object} [object=lodash] The destination object.
       * @param {Object} source The object of functions to add.
       * @param {Object} [options={}] The options object.
       * @param {boolean} [options.chain=true] Specify whether mixins are chainable.
       * @returns {Function|Object} Returns `object`.
       * @example
       *
       * function vowels(string) {
       *   return _.filter(string, function(v) {
       *     return /[aeiou]/i.test(v);
       *   });
       * }
       *
       * _.mixin({ 'vowels': vowels });
       * _.vowels('fred');
       * // => ['e']
       *
       * _('fred').vowels().value();
       * // => ['e']
       *
       * _.mixin({ 'vowels': vowels }, { 'chain': false });
       * _('fred').vowels();
       * // => ['e']
       */

      function mixin(object, source, options) {
        var props = keys(source),
            methodNames = baseFunctions(source, props);

        if (options == null && !(isObject(source) && (methodNames.length || !props.length))) {
          options = source;
          source = object;
          object = this;
          methodNames = baseFunctions(source, keys(source));
        }

        var chain = !(isObject(options) && 'chain' in options) || !!options.chain,
            isFunc = isFunction(object);
        arrayEach(methodNames, function (methodName) {
          var func = source[methodName];
          object[methodName] = func;

          if (isFunc) {
            object.prototype[methodName] = function () {
              var chainAll = this.__chain__;

              if (chain || chainAll) {
                var result = object(this.__wrapped__),
                    actions = result.__actions__ = copyArray(this.__actions__);
                actions.push({
                  'func': func,
                  'args': arguments,
                  'thisArg': object
                });
                result.__chain__ = chainAll;
                return result;
              }

              return func.apply(object, arrayPush([this.value()], arguments));
            };
          }
        });
        return object;
      }
      /**
       * Reverts the `_` variable to its previous value and returns a reference to
       * the `lodash` function.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Util
       * @returns {Function} Returns the `lodash` function.
       * @example
       *
       * var lodash = _.noConflict();
       */


      function noConflict() {
        if (root._ === this) {
          root._ = oldDash;
        }

        return this;
      }
      /**
       * This method returns `undefined`.
       *
       * @static
       * @memberOf _
       * @since 2.3.0
       * @category Util
       * @example
       *
       * _.times(2, _.noop);
       * // => [undefined, undefined]
       */


      function noop() {} // No operation performed.

      /**
       * Creates a function that gets the argument at index `n`. If `n` is negative,
       * the nth argument from the end is returned.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Util
       * @param {number} [n=0] The index of the argument to return.
       * @returns {Function} Returns the new pass-thru function.
       * @example
       *
       * var func = _.nthArg(1);
       * func('a', 'b', 'c', 'd');
       * // => 'b'
       *
       * var func = _.nthArg(-2);
       * func('a', 'b', 'c', 'd');
       * // => 'c'
       */


      function nthArg(n) {
        n = toInteger(n);
        return baseRest(function (args) {
          return baseNth(args, n);
        });
      }
      /**
       * Creates a function that invokes `iteratees` with the arguments it receives
       * and returns their results.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Util
       * @param {...(Function|Function[])} [iteratees=[_.identity]]
       *  The iteratees to invoke.
       * @returns {Function} Returns the new function.
       * @example
       *
       * var func = _.over([Math.max, Math.min]);
       *
       * func(1, 2, 3, 4);
       * // => [4, 1]
       */


      var over = createOver(arrayMap);
      /**
       * Creates a function that checks if **all** of the `predicates` return
       * truthy when invoked with the arguments it receives.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Util
       * @param {...(Function|Function[])} [predicates=[_.identity]]
       *  The predicates to check.
       * @returns {Function} Returns the new function.
       * @example
       *
       * var func = _.overEvery([Boolean, isFinite]);
       *
       * func('1');
       * // => true
       *
       * func(null);
       * // => false
       *
       * func(NaN);
       * // => false
       */

      var overEvery = createOver(arrayEvery);
      /**
       * Creates a function that checks if **any** of the `predicates` return
       * truthy when invoked with the arguments it receives.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Util
       * @param {...(Function|Function[])} [predicates=[_.identity]]
       *  The predicates to check.
       * @returns {Function} Returns the new function.
       * @example
       *
       * var func = _.overSome([Boolean, isFinite]);
       *
       * func('1');
       * // => true
       *
       * func(null);
       * // => true
       *
       * func(NaN);
       * // => false
       */

      var overSome = createOver(arraySome);
      /**
       * Creates a function that returns the value at `path` of a given object.
       *
       * @static
       * @memberOf _
       * @since 2.4.0
       * @category Util
       * @param {Array|string} path The path of the property to get.
       * @returns {Function} Returns the new accessor function.
       * @example
       *
       * var objects = [
       *   { 'a': { 'b': 2 } },
       *   { 'a': { 'b': 1 } }
       * ];
       *
       * _.map(objects, _.property('a.b'));
       * // => [2, 1]
       *
       * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
       * // => [1, 2]
       */

      function property(path) {
        return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
      }
      /**
       * The opposite of `_.property`; this method creates a function that returns
       * the value at a given path of `object`.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Util
       * @param {Object} object The object to query.
       * @returns {Function} Returns the new accessor function.
       * @example
       *
       * var array = [0, 1, 2],
       *     object = { 'a': array, 'b': array, 'c': array };
       *
       * _.map(['a[2]', 'c[0]'], _.propertyOf(object));
       * // => [2, 0]
       *
       * _.map([['a', '2'], ['c', '0']], _.propertyOf(object));
       * // => [2, 0]
       */


      function propertyOf(object) {
        return function (path) {
          return object == null ? undefined : baseGet(object, path);
        };
      }
      /**
       * Creates an array of numbers (positive and/or negative) progressing from
       * `start` up to, but not including, `end`. A step of `-1` is used if a negative
       * `start` is specified without an `end` or `step`. If `end` is not specified,
       * it's set to `start` with `start` then set to `0`.
       *
       * **Note:** JavaScript follows the IEEE-754 standard for resolving
       * floating-point values which can produce unexpected results.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Util
       * @param {number} [start=0] The start of the range.
       * @param {number} end The end of the range.
       * @param {number} [step=1] The value to increment or decrement by.
       * @returns {Array} Returns the range of numbers.
       * @see _.inRange, _.rangeRight
       * @example
       *
       * _.range(4);
       * // => [0, 1, 2, 3]
       *
       * _.range(-4);
       * // => [0, -1, -2, -3]
       *
       * _.range(1, 5);
       * // => [1, 2, 3, 4]
       *
       * _.range(0, 20, 5);
       * // => [0, 5, 10, 15]
       *
       * _.range(0, -4, -1);
       * // => [0, -1, -2, -3]
       *
       * _.range(1, 4, 0);
       * // => [1, 1, 1]
       *
       * _.range(0);
       * // => []
       */


      var range = createRange();
      /**
       * This method is like `_.range` except that it populates values in
       * descending order.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Util
       * @param {number} [start=0] The start of the range.
       * @param {number} end The end of the range.
       * @param {number} [step=1] The value to increment or decrement by.
       * @returns {Array} Returns the range of numbers.
       * @see _.inRange, _.range
       * @example
       *
       * _.rangeRight(4);
       * // => [3, 2, 1, 0]
       *
       * _.rangeRight(-4);
       * // => [-3, -2, -1, 0]
       *
       * _.rangeRight(1, 5);
       * // => [4, 3, 2, 1]
       *
       * _.rangeRight(0, 20, 5);
       * // => [15, 10, 5, 0]
       *
       * _.rangeRight(0, -4, -1);
       * // => [-3, -2, -1, 0]
       *
       * _.rangeRight(1, 4, 0);
       * // => [1, 1, 1]
       *
       * _.rangeRight(0);
       * // => []
       */

      var rangeRight = createRange(true);
      /**
       * This method returns a new empty array.
       *
       * @static
       * @memberOf _
       * @since 4.13.0
       * @category Util
       * @returns {Array} Returns the new empty array.
       * @example
       *
       * var arrays = _.times(2, _.stubArray);
       *
       * console.log(arrays);
       * // => [[], []]
       *
       * console.log(arrays[0] === arrays[1]);
       * // => false
       */

      function stubArray() {
        return [];
      }
      /**
       * This method returns `false`.
       *
       * @static
       * @memberOf _
       * @since 4.13.0
       * @category Util
       * @returns {boolean} Returns `false`.
       * @example
       *
       * _.times(2, _.stubFalse);
       * // => [false, false]
       */


      function stubFalse() {
        return false;
      }
      /**
       * This method returns a new empty object.
       *
       * @static
       * @memberOf _
       * @since 4.13.0
       * @category Util
       * @returns {Object} Returns the new empty object.
       * @example
       *
       * var objects = _.times(2, _.stubObject);
       *
       * console.log(objects);
       * // => [{}, {}]
       *
       * console.log(objects[0] === objects[1]);
       * // => false
       */


      function stubObject() {
        return {};
      }
      /**
       * This method returns an empty string.
       *
       * @static
       * @memberOf _
       * @since 4.13.0
       * @category Util
       * @returns {string} Returns the empty string.
       * @example
       *
       * _.times(2, _.stubString);
       * // => ['', '']
       */


      function stubString() {
        return '';
      }
      /**
       * This method returns `true`.
       *
       * @static
       * @memberOf _
       * @since 4.13.0
       * @category Util
       * @returns {boolean} Returns `true`.
       * @example
       *
       * _.times(2, _.stubTrue);
       * // => [true, true]
       */


      function stubTrue() {
        return true;
      }
      /**
       * Invokes the iteratee `n` times, returning an array of the results of
       * each invocation. The iteratee is invoked with one argument; (index).
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Util
       * @param {number} n The number of times to invoke `iteratee`.
       * @param {Function} [iteratee=_.identity] The function invoked per iteration.
       * @returns {Array} Returns the array of results.
       * @example
       *
       * _.times(3, String);
       * // => ['0', '1', '2']
       *
       *  _.times(4, _.constant(0));
       * // => [0, 0, 0, 0]
       */


      function times(n, iteratee) {
        n = toInteger(n);

        if (n < 1 || n > MAX_SAFE_INTEGER) {
          return [];
        }

        var index = MAX_ARRAY_LENGTH,
            length = nativeMin(n, MAX_ARRAY_LENGTH);
        iteratee = getIteratee(iteratee);
        n -= MAX_ARRAY_LENGTH;
        var result = baseTimes(length, iteratee);

        while (++index < n) {
          iteratee(index);
        }

        return result;
      }
      /**
       * Converts `value` to a property path array.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Util
       * @param {*} value The value to convert.
       * @returns {Array} Returns the new property path array.
       * @example
       *
       * _.toPath('a.b.c');
       * // => ['a', 'b', 'c']
       *
       * _.toPath('a[0].b.c');
       * // => ['a', '0', 'b', 'c']
       */


      function toPath(value) {
        if (isArray(value)) {
          return arrayMap(value, toKey);
        }

        return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
      }
      /**
       * Generates a unique ID. If `prefix` is given, the ID is appended to it.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Util
       * @param {string} [prefix=''] The value to prefix the ID with.
       * @returns {string} Returns the unique ID.
       * @example
       *
       * _.uniqueId('contact_');
       * // => 'contact_104'
       *
       * _.uniqueId();
       * // => '105'
       */


      function uniqueId(prefix) {
        var id = ++idCounter;
        return toString(prefix) + id;
      }
      /*------------------------------------------------------------------------*/

      /**
       * Adds two numbers.
       *
       * @static
       * @memberOf _
       * @since 3.4.0
       * @category Math
       * @param {number} augend The first number in an addition.
       * @param {number} addend The second number in an addition.
       * @returns {number} Returns the total.
       * @example
       *
       * _.add(6, 4);
       * // => 10
       */


      var add = createMathOperation(function (augend, addend) {
        return augend + addend;
      }, 0);
      /**
       * Computes `number` rounded up to `precision`.
       *
       * @static
       * @memberOf _
       * @since 3.10.0
       * @category Math
       * @param {number} number The number to round up.
       * @param {number} [precision=0] The precision to round up to.
       * @returns {number} Returns the rounded up number.
       * @example
       *
       * _.ceil(4.006);
       * // => 5
       *
       * _.ceil(6.004, 2);
       * // => 6.01
       *
       * _.ceil(6040, -2);
       * // => 6100
       */

      var ceil = createRound('ceil');
      /**
       * Divide two numbers.
       *
       * @static
       * @memberOf _
       * @since 4.7.0
       * @category Math
       * @param {number} dividend The first number in a division.
       * @param {number} divisor The second number in a division.
       * @returns {number} Returns the quotient.
       * @example
       *
       * _.divide(6, 4);
       * // => 1.5
       */

      var divide = createMathOperation(function (dividend, divisor) {
        return dividend / divisor;
      }, 1);
      /**
       * Computes `number` rounded down to `precision`.
       *
       * @static
       * @memberOf _
       * @since 3.10.0
       * @category Math
       * @param {number} number The number to round down.
       * @param {number} [precision=0] The precision to round down to.
       * @returns {number} Returns the rounded down number.
       * @example
       *
       * _.floor(4.006);
       * // => 4
       *
       * _.floor(0.046, 2);
       * // => 0.04
       *
       * _.floor(4060, -2);
       * // => 4000
       */

      var floor = createRound('floor');
      /**
       * Computes the maximum value of `array`. If `array` is empty or falsey,
       * `undefined` is returned.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Math
       * @param {Array} array The array to iterate over.
       * @returns {*} Returns the maximum value.
       * @example
       *
       * _.max([4, 2, 8, 6]);
       * // => 8
       *
       * _.max([]);
       * // => undefined
       */

      function max(array) {
        return array && array.length ? baseExtremum(array, identity, baseGt) : undefined;
      }
      /**
       * This method is like `_.max` except that it accepts `iteratee` which is
       * invoked for each element in `array` to generate the criterion by which
       * the value is ranked. The iteratee is invoked with one argument: (value).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Math
       * @param {Array} array The array to iterate over.
       * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
       * @returns {*} Returns the maximum value.
       * @example
       *
       * var objects = [{ 'n': 1 }, { 'n': 2 }];
       *
       * _.maxBy(objects, function(o) { return o.n; });
       * // => { 'n': 2 }
       *
       * // The `_.property` iteratee shorthand.
       * _.maxBy(objects, 'n');
       * // => { 'n': 2 }
       */


      function maxBy(array, iteratee) {
        return array && array.length ? baseExtremum(array, getIteratee(iteratee, 2), baseGt) : undefined;
      }
      /**
       * Computes the mean of the values in `array`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Math
       * @param {Array} array The array to iterate over.
       * @returns {number} Returns the mean.
       * @example
       *
       * _.mean([4, 2, 8, 6]);
       * // => 5
       */


      function mean(array) {
        return baseMean(array, identity);
      }
      /**
       * This method is like `_.mean` except that it accepts `iteratee` which is
       * invoked for each element in `array` to generate the value to be averaged.
       * The iteratee is invoked with one argument: (value).
       *
       * @static
       * @memberOf _
       * @since 4.7.0
       * @category Math
       * @param {Array} array The array to iterate over.
       * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
       * @returns {number} Returns the mean.
       * @example
       *
       * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
       *
       * _.meanBy(objects, function(o) { return o.n; });
       * // => 5
       *
       * // The `_.property` iteratee shorthand.
       * _.meanBy(objects, 'n');
       * // => 5
       */


      function meanBy(array, iteratee) {
        return baseMean(array, getIteratee(iteratee, 2));
      }
      /**
       * Computes the minimum value of `array`. If `array` is empty or falsey,
       * `undefined` is returned.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Math
       * @param {Array} array The array to iterate over.
       * @returns {*} Returns the minimum value.
       * @example
       *
       * _.min([4, 2, 8, 6]);
       * // => 2
       *
       * _.min([]);
       * // => undefined
       */


      function min(array) {
        return array && array.length ? baseExtremum(array, identity, baseLt) : undefined;
      }
      /**
       * This method is like `_.min` except that it accepts `iteratee` which is
       * invoked for each element in `array` to generate the criterion by which
       * the value is ranked. The iteratee is invoked with one argument: (value).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Math
       * @param {Array} array The array to iterate over.
       * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
       * @returns {*} Returns the minimum value.
       * @example
       *
       * var objects = [{ 'n': 1 }, { 'n': 2 }];
       *
       * _.minBy(objects, function(o) { return o.n; });
       * // => { 'n': 1 }
       *
       * // The `_.property` iteratee shorthand.
       * _.minBy(objects, 'n');
       * // => { 'n': 1 }
       */


      function minBy(array, iteratee) {
        return array && array.length ? baseExtremum(array, getIteratee(iteratee, 2), baseLt) : undefined;
      }
      /**
       * Multiply two numbers.
       *
       * @static
       * @memberOf _
       * @since 4.7.0
       * @category Math
       * @param {number} multiplier The first number in a multiplication.
       * @param {number} multiplicand The second number in a multiplication.
       * @returns {number} Returns the product.
       * @example
       *
       * _.multiply(6, 4);
       * // => 24
       */


      var multiply = createMathOperation(function (multiplier, multiplicand) {
        return multiplier * multiplicand;
      }, 1);
      /**
       * Computes `number` rounded to `precision`.
       *
       * @static
       * @memberOf _
       * @since 3.10.0
       * @category Math
       * @param {number} number The number to round.
       * @param {number} [precision=0] The precision to round to.
       * @returns {number} Returns the rounded number.
       * @example
       *
       * _.round(4.006);
       * // => 4
       *
       * _.round(4.006, 2);
       * // => 4.01
       *
       * _.round(4060, -2);
       * // => 4100
       */

      var round = createRound('round');
      /**
       * Subtract two numbers.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Math
       * @param {number} minuend The first number in a subtraction.
       * @param {number} subtrahend The second number in a subtraction.
       * @returns {number} Returns the difference.
       * @example
       *
       * _.subtract(6, 4);
       * // => 2
       */

      var subtract = createMathOperation(function (minuend, subtrahend) {
        return minuend - subtrahend;
      }, 0);
      /**
       * Computes the sum of the values in `array`.
       *
       * @static
       * @memberOf _
       * @since 3.4.0
       * @category Math
       * @param {Array} array The array to iterate over.
       * @returns {number} Returns the sum.
       * @example
       *
       * _.sum([4, 2, 8, 6]);
       * // => 20
       */

      function sum(array) {
        return array && array.length ? baseSum(array, identity) : 0;
      }
      /**
       * This method is like `_.sum` except that it accepts `iteratee` which is
       * invoked for each element in `array` to generate the value to be summed.
       * The iteratee is invoked with one argument: (value).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Math
       * @param {Array} array The array to iterate over.
       * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
       * @returns {number} Returns the sum.
       * @example
       *
       * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
       *
       * _.sumBy(objects, function(o) { return o.n; });
       * // => 20
       *
       * // The `_.property` iteratee shorthand.
       * _.sumBy(objects, 'n');
       * // => 20
       */


      function sumBy(array, iteratee) {
        return array && array.length ? baseSum(array, getIteratee(iteratee, 2)) : 0;
      }
      /*------------------------------------------------------------------------*/
      // Add methods that return wrapped values in chain sequences.


      lodash.after = after;
      lodash.ary = ary;
      lodash.assign = assign;
      lodash.assignIn = assignIn;
      lodash.assignInWith = assignInWith;
      lodash.assignWith = assignWith;
      lodash.at = at;
      lodash.before = before;
      lodash.bind = bind;
      lodash.bindAll = bindAll;
      lodash.bindKey = bindKey;
      lodash.castArray = castArray;
      lodash.chain = chain;
      lodash.chunk = chunk;
      lodash.compact = compact;
      lodash.concat = concat;
      lodash.cond = cond;
      lodash.conforms = conforms;
      lodash.constant = constant;
      lodash.countBy = countBy;
      lodash.create = create;
      lodash.curry = curry;
      lodash.curryRight = curryRight;
      lodash.debounce = debounce;
      lodash.defaults = defaults;
      lodash.defaultsDeep = defaultsDeep;
      lodash.defer = defer;
      lodash.delay = delay;
      lodash.difference = difference;
      lodash.differenceBy = differenceBy;
      lodash.differenceWith = differenceWith;
      lodash.drop = drop;
      lodash.dropRight = dropRight;
      lodash.dropRightWhile = dropRightWhile;
      lodash.dropWhile = dropWhile;
      lodash.fill = fill;
      lodash.filter = filter;
      lodash.flatMap = flatMap;
      lodash.flatMapDeep = flatMapDeep;
      lodash.flatMapDepth = flatMapDepth;
      lodash.flatten = flatten;
      lodash.flattenDeep = flattenDeep;
      lodash.flattenDepth = flattenDepth;
      lodash.flip = flip;
      lodash.flow = flow;
      lodash.flowRight = flowRight;
      lodash.fromPairs = fromPairs;
      lodash.functions = functions;
      lodash.functionsIn = functionsIn;
      lodash.groupBy = groupBy;
      lodash.initial = initial;
      lodash.intersection = intersection;
      lodash.intersectionBy = intersectionBy;
      lodash.intersectionWith = intersectionWith;
      lodash.invert = invert;
      lodash.invertBy = invertBy;
      lodash.invokeMap = invokeMap;
      lodash.iteratee = iteratee;
      lodash.keyBy = keyBy;
      lodash.keys = keys;
      lodash.keysIn = keysIn;
      lodash.map = map;
      lodash.mapKeys = mapKeys;
      lodash.mapValues = mapValues;
      lodash.matches = matches;
      lodash.matchesProperty = matchesProperty;
      lodash.memoize = memoize;
      lodash.merge = merge;
      lodash.mergeWith = mergeWith;
      lodash.method = method;
      lodash.methodOf = methodOf;
      lodash.mixin = mixin;
      lodash.negate = negate;
      lodash.nthArg = nthArg;
      lodash.omit = omit;
      lodash.omitBy = omitBy;
      lodash.once = once;
      lodash.orderBy = orderBy;
      lodash.over = over;
      lodash.overArgs = overArgs;
      lodash.overEvery = overEvery;
      lodash.overSome = overSome;
      lodash.partial = partial;
      lodash.partialRight = partialRight;
      lodash.partition = partition;
      lodash.pick = pick;
      lodash.pickBy = pickBy;
      lodash.property = property;
      lodash.propertyOf = propertyOf;
      lodash.pull = pull;
      lodash.pullAll = pullAll;
      lodash.pullAllBy = pullAllBy;
      lodash.pullAllWith = pullAllWith;
      lodash.pullAt = pullAt;
      lodash.range = range;
      lodash.rangeRight = rangeRight;
      lodash.rearg = rearg;
      lodash.reject = reject;
      lodash.remove = remove;
      lodash.rest = rest;
      lodash.reverse = reverse;
      lodash.sampleSize = sampleSize;
      lodash.set = set;
      lodash.setWith = setWith;
      lodash.shuffle = shuffle;
      lodash.slice = slice;
      lodash.sortBy = sortBy;
      lodash.sortedUniq = sortedUniq;
      lodash.sortedUniqBy = sortedUniqBy;
      lodash.split = split;
      lodash.spread = spread;
      lodash.tail = tail;
      lodash.take = take;
      lodash.takeRight = takeRight;
      lodash.takeRightWhile = takeRightWhile;
      lodash.takeWhile = takeWhile;
      lodash.tap = tap;
      lodash.throttle = throttle;
      lodash.thru = thru;
      lodash.toArray = toArray;
      lodash.toPairs = toPairs;
      lodash.toPairsIn = toPairsIn;
      lodash.toPath = toPath;
      lodash.toPlainObject = toPlainObject;
      lodash.transform = transform;
      lodash.unary = unary;
      lodash.union = union;
      lodash.unionBy = unionBy;
      lodash.unionWith = unionWith;
      lodash.uniq = uniq;
      lodash.uniqBy = uniqBy;
      lodash.uniqWith = uniqWith;
      lodash.unset = unset;
      lodash.unzip = unzip;
      lodash.unzipWith = unzipWith;
      lodash.update = update;
      lodash.updateWith = updateWith;
      lodash.values = values;
      lodash.valuesIn = valuesIn;
      lodash.without = without;
      lodash.words = words;
      lodash.wrap = wrap;
      lodash.xor = xor;
      lodash.xorBy = xorBy;
      lodash.xorWith = xorWith;
      lodash.zip = zip;
      lodash.zipObject = zipObject;
      lodash.zipObjectDeep = zipObjectDeep;
      lodash.zipWith = zipWith; // Add aliases.

      lodash.entries = toPairs;
      lodash.entriesIn = toPairsIn;
      lodash.extend = assignIn;
      lodash.extendWith = assignInWith; // Add methods to `lodash.prototype`.

      mixin(lodash, lodash);
      /*------------------------------------------------------------------------*/
      // Add methods that return unwrapped values in chain sequences.

      lodash.add = add;
      lodash.attempt = attempt;
      lodash.camelCase = camelCase;
      lodash.capitalize = capitalize;
      lodash.ceil = ceil;
      lodash.clamp = clamp;
      lodash.clone = clone;
      lodash.cloneDeep = cloneDeep;
      lodash.cloneDeepWith = cloneDeepWith;
      lodash.cloneWith = cloneWith;
      lodash.conformsTo = conformsTo;
      lodash.deburr = deburr;
      lodash.defaultTo = defaultTo;
      lodash.divide = divide;
      lodash.endsWith = endsWith;
      lodash.eq = eq;
      lodash.escape = escape;
      lodash.escapeRegExp = escapeRegExp;
      lodash.every = every;
      lodash.find = find;
      lodash.findIndex = findIndex;
      lodash.findKey = findKey;
      lodash.findLast = findLast;
      lodash.findLastIndex = findLastIndex;
      lodash.findLastKey = findLastKey;
      lodash.floor = floor;
      lodash.forEach = forEach;
      lodash.forEachRight = forEachRight;
      lodash.forIn = forIn;
      lodash.forInRight = forInRight;
      lodash.forOwn = forOwn;
      lodash.forOwnRight = forOwnRight;
      lodash.get = get;
      lodash.gt = gt;
      lodash.gte = gte;
      lodash.has = has;
      lodash.hasIn = hasIn;
      lodash.head = head;
      lodash.identity = identity;
      lodash.includes = includes;
      lodash.indexOf = indexOf;
      lodash.inRange = inRange;
      lodash.invoke = invoke;
      lodash.isArguments = isArguments;
      lodash.isArray = isArray;
      lodash.isArrayBuffer = isArrayBuffer;
      lodash.isArrayLike = isArrayLike;
      lodash.isArrayLikeObject = isArrayLikeObject;
      lodash.isBoolean = isBoolean;
      lodash.isBuffer = isBuffer;
      lodash.isDate = isDate;
      lodash.isElement = isElement;
      lodash.isEmpty = isEmpty;
      lodash.isEqual = isEqual;
      lodash.isEqualWith = isEqualWith;
      lodash.isError = isError;
      lodash.isFinite = isFinite;
      lodash.isFunction = isFunction;
      lodash.isInteger = isInteger;
      lodash.isLength = isLength;
      lodash.isMap = isMap;
      lodash.isMatch = isMatch;
      lodash.isMatchWith = isMatchWith;
      lodash.isNaN = isNaN;
      lodash.isNative = isNative;
      lodash.isNil = isNil;
      lodash.isNull = isNull;
      lodash.isNumber = isNumber;
      lodash.isObject = isObject;
      lodash.isObjectLike = isObjectLike;
      lodash.isPlainObject = isPlainObject;
      lodash.isRegExp = isRegExp;
      lodash.isSafeInteger = isSafeInteger;
      lodash.isSet = isSet;
      lodash.isString = isString;
      lodash.isSymbol = isSymbol;
      lodash.isTypedArray = isTypedArray;
      lodash.isUndefined = isUndefined;
      lodash.isWeakMap = isWeakMap;
      lodash.isWeakSet = isWeakSet;
      lodash.join = join;
      lodash.kebabCase = kebabCase;
      lodash.last = last;
      lodash.lastIndexOf = lastIndexOf;
      lodash.lowerCase = lowerCase;
      lodash.lowerFirst = lowerFirst;
      lodash.lt = lt;
      lodash.lte = lte;
      lodash.max = max;
      lodash.maxBy = maxBy;
      lodash.mean = mean;
      lodash.meanBy = meanBy;
      lodash.min = min;
      lodash.minBy = minBy;
      lodash.stubArray = stubArray;
      lodash.stubFalse = stubFalse;
      lodash.stubObject = stubObject;
      lodash.stubString = stubString;
      lodash.stubTrue = stubTrue;
      lodash.multiply = multiply;
      lodash.nth = nth;
      lodash.noConflict = noConflict;
      lodash.noop = noop;
      lodash.now = now;
      lodash.pad = pad;
      lodash.padEnd = padEnd;
      lodash.padStart = padStart;
      lodash.parseInt = parseInt;
      lodash.random = random;
      lodash.reduce = reduce;
      lodash.reduceRight = reduceRight;
      lodash.repeat = repeat;
      lodash.replace = replace;
      lodash.result = result;
      lodash.round = round;
      lodash.runInContext = runInContext;
      lodash.sample = sample;
      lodash.size = size;
      lodash.snakeCase = snakeCase;
      lodash.some = some;
      lodash.sortedIndex = sortedIndex;
      lodash.sortedIndexBy = sortedIndexBy;
      lodash.sortedIndexOf = sortedIndexOf;
      lodash.sortedLastIndex = sortedLastIndex;
      lodash.sortedLastIndexBy = sortedLastIndexBy;
      lodash.sortedLastIndexOf = sortedLastIndexOf;
      lodash.startCase = startCase;
      lodash.startsWith = startsWith;
      lodash.subtract = subtract;
      lodash.sum = sum;
      lodash.sumBy = sumBy;
      lodash.template = template;
      lodash.times = times;
      lodash.toFinite = toFinite;
      lodash.toInteger = toInteger;
      lodash.toLength = toLength;
      lodash.toLower = toLower;
      lodash.toNumber = toNumber;
      lodash.toSafeInteger = toSafeInteger;
      lodash.toString = toString;
      lodash.toUpper = toUpper;
      lodash.trim = trim;
      lodash.trimEnd = trimEnd;
      lodash.trimStart = trimStart;
      lodash.truncate = truncate;
      lodash.unescape = unescape;
      lodash.uniqueId = uniqueId;
      lodash.upperCase = upperCase;
      lodash.upperFirst = upperFirst; // Add aliases.

      lodash.each = forEach;
      lodash.eachRight = forEachRight;
      lodash.first = head;
      mixin(lodash, function () {
        var source = {};
        baseForOwn(lodash, function (func, methodName) {
          if (!hasOwnProperty.call(lodash.prototype, methodName)) {
            source[methodName] = func;
          }
        });
        return source;
      }(), {
        'chain': false
      });
      /*------------------------------------------------------------------------*/

      /**
       * The semantic version number.
       *
       * @static
       * @memberOf _
       * @type {string}
       */

      lodash.VERSION = VERSION; // Assign default placeholders.

      arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function (methodName) {
        lodash[methodName].placeholder = lodash;
      }); // Add `LazyWrapper` methods for `_.drop` and `_.take` variants.

      arrayEach(['drop', 'take'], function (methodName, index) {
        LazyWrapper.prototype[methodName] = function (n) {
          n = n === undefined ? 1 : nativeMax(toInteger(n), 0);
          var result = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();

          if (result.__filtered__) {
            result.__takeCount__ = nativeMin(n, result.__takeCount__);
          } else {
            result.__views__.push({
              'size': nativeMin(n, MAX_ARRAY_LENGTH),
              'type': methodName + (result.__dir__ < 0 ? 'Right' : '')
            });
          }

          return result;
        };

        LazyWrapper.prototype[methodName + 'Right'] = function (n) {
          return this.reverse()[methodName](n).reverse();
        };
      }); // Add `LazyWrapper` methods that accept an `iteratee` value.

      arrayEach(['filter', 'map', 'takeWhile'], function (methodName, index) {
        var type = index + 1,
            isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;

        LazyWrapper.prototype[methodName] = function (iteratee) {
          var result = this.clone();

          result.__iteratees__.push({
            'iteratee': getIteratee(iteratee, 3),
            'type': type
          });

          result.__filtered__ = result.__filtered__ || isFilter;
          return result;
        };
      }); // Add `LazyWrapper` methods for `_.head` and `_.last`.

      arrayEach(['head', 'last'], function (methodName, index) {
        var takeName = 'take' + (index ? 'Right' : '');

        LazyWrapper.prototype[methodName] = function () {
          return this[takeName](1).value()[0];
        };
      }); // Add `LazyWrapper` methods for `_.initial` and `_.tail`.

      arrayEach(['initial', 'tail'], function (methodName, index) {
        var dropName = 'drop' + (index ? '' : 'Right');

        LazyWrapper.prototype[methodName] = function () {
          return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
        };
      });

      LazyWrapper.prototype.compact = function () {
        return this.filter(identity);
      };

      LazyWrapper.prototype.find = function (predicate) {
        return this.filter(predicate).head();
      };

      LazyWrapper.prototype.findLast = function (predicate) {
        return this.reverse().find(predicate);
      };

      LazyWrapper.prototype.invokeMap = baseRest(function (path, args) {
        if (typeof path == 'function') {
          return new LazyWrapper(this);
        }

        return this.map(function (value) {
          return baseInvoke(value, path, args);
        });
      });

      LazyWrapper.prototype.reject = function (predicate) {
        return this.filter(negate(getIteratee(predicate)));
      };

      LazyWrapper.prototype.slice = function (start, end) {
        start = toInteger(start);
        var result = this;

        if (result.__filtered__ && (start > 0 || end < 0)) {
          return new LazyWrapper(result);
        }

        if (start < 0) {
          result = result.takeRight(-start);
        } else if (start) {
          result = result.drop(start);
        }

        if (end !== undefined) {
          end = toInteger(end);
          result = end < 0 ? result.dropRight(-end) : result.take(end - start);
        }

        return result;
      };

      LazyWrapper.prototype.takeRightWhile = function (predicate) {
        return this.reverse().takeWhile(predicate).reverse();
      };

      LazyWrapper.prototype.toArray = function () {
        return this.take(MAX_ARRAY_LENGTH);
      }; // Add `LazyWrapper` methods to `lodash.prototype`.


      baseForOwn(LazyWrapper.prototype, function (func, methodName) {
        var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName),
            isTaker = /^(?:head|last)$/.test(methodName),
            lodashFunc = lodash[isTaker ? 'take' + (methodName == 'last' ? 'Right' : '') : methodName],
            retUnwrapped = isTaker || /^find/.test(methodName);

        if (!lodashFunc) {
          return;
        }

        lodash.prototype[methodName] = function () {
          var value = this.__wrapped__,
              args = isTaker ? [1] : arguments,
              isLazy = value instanceof LazyWrapper,
              iteratee = args[0],
              useLazy = isLazy || isArray(value);

          var interceptor = function (value) {
            var result = lodashFunc.apply(lodash, arrayPush([value], args));
            return isTaker && chainAll ? result[0] : result;
          };

          if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
            // Avoid lazy use if the iteratee has a "length" value other than `1`.
            isLazy = useLazy = false;
          }

          var chainAll = this.__chain__,
              isHybrid = !!this.__actions__.length,
              isUnwrapped = retUnwrapped && !chainAll,
              onlyLazy = isLazy && !isHybrid;

          if (!retUnwrapped && useLazy) {
            value = onlyLazy ? value : new LazyWrapper(this);
            var result = func.apply(value, args);

            result.__actions__.push({
              'func': thru,
              'args': [interceptor],
              'thisArg': undefined
            });

            return new LodashWrapper(result, chainAll);
          }

          if (isUnwrapped && onlyLazy) {
            return func.apply(this, args);
          }

          result = this.thru(interceptor);
          return isUnwrapped ? isTaker ? result.value()[0] : result.value() : result;
        };
      }); // Add `Array` methods to `lodash.prototype`.

      arrayEach(['pop', 'push', 'shift', 'sort', 'splice', 'unshift'], function (methodName) {
        var func = arrayProto[methodName],
            chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
            retUnwrapped = /^(?:pop|shift)$/.test(methodName);

        lodash.prototype[methodName] = function () {
          var args = arguments;

          if (retUnwrapped && !this.__chain__) {
            var value = this.value();
            return func.apply(isArray(value) ? value : [], args);
          }

          return this[chainName](function (value) {
            return func.apply(isArray(value) ? value : [], args);
          });
        };
      }); // Map minified method names to their real names.

      baseForOwn(LazyWrapper.prototype, function (func, methodName) {
        var lodashFunc = lodash[methodName];

        if (lodashFunc) {
          var key = lodashFunc.name + '';

          if (!hasOwnProperty.call(realNames, key)) {
            realNames[key] = [];
          }

          realNames[key].push({
            'name': methodName,
            'func': lodashFunc
          });
        }
      });
      realNames[createHybrid(undefined, WRAP_BIND_KEY_FLAG).name] = [{
        'name': 'wrapper',
        'func': undefined
      }]; // Add methods to `LazyWrapper`.

      LazyWrapper.prototype.clone = lazyClone;
      LazyWrapper.prototype.reverse = lazyReverse;
      LazyWrapper.prototype.value = lazyValue; // Add chain sequence methods to the `lodash` wrapper.

      lodash.prototype.at = wrapperAt;
      lodash.prototype.chain = wrapperChain;
      lodash.prototype.commit = wrapperCommit;
      lodash.prototype.next = wrapperNext;
      lodash.prototype.plant = wrapperPlant;
      lodash.prototype.reverse = wrapperReverse;
      lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue; // Add lazy aliases.

      lodash.prototype.first = lodash.prototype.head;

      if (symIterator) {
        lodash.prototype[symIterator] = wrapperToIterator;
      }

      return lodash;
    };
    /*--------------------------------------------------------------------------*/
    // Export lodash.


    var _ = runInContext(); // Some AMD build optimizers, like r.js, check for condition patterns like:


    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
      // Expose Lodash on the global object to prevent errors when Lodash is
      // loaded by a script tag in the presence of an AMD loader.
      // See http://requirejs.org/docs/errors.html#mismatch for more details.
      // Use `_.noConflict` to remove Lodash from the global object.
      root._ = _; // Define as an anonymous module so, through path mapping, it can be
      // referenced as the "underscore" module.

      define(function () {
        return _;
      });
    } // Check for `exports` after `define` in case a build optimizer adds it.
    else if (freeModule) {
        // Export for Node.js.
        (freeModule.exports = _)._ = _; // Export for CommonJS support.

        freeExports._ = _;
      } else {
        // Export to the global object.
        root._ = _;
      }
  }).call(this);
  return module.exports;
}.call({});

// ASSET: architecture/connection.js
var e = require("lodash");

function r(r, t, i, n) {
  if (null == r || null == t) throw new ReferenceError("Missing required parameter 'from' or 'to'");
  var a = this;
  !n && e.isPlainObject(i) && (n = i, i = void 0), n = n || {}, i = null == i ? 2 * Math.random() - 1 : i, Object.assign(a, {
    gain: 1,
    gater: null,
    elegibility: 0,
    delta_weights_previous: 0,
    delta_weights_total: 0,
    delta_weights: [],
    xtrace_nodes: [],
    xtrace_values: []
  }, n, {
    from: r,
    to: t,
    weight: i
  }), n.gater && n.gater.gate(a), a.toJSON = function () {
    return {
      weight: a.weight
    };
  };
}

r.innovationID = function (e, r) {
  if (null == e || null == r) throw new ReferenceError("Missing required parameter 'a' or 'b'");
  return .5 * (e + r) * (e + r + 1) + r;
}, module.exports = r;
// ASSET: config.js
var r = {
  warnings: !1
};
module.exports = r;
// ASSET: ../node_modules/process/browser.js
var $pBGv$exports = {}; // shim for using process in browser

var $pBGv$var$process = $pBGv$exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var $pBGv$var$cachedSetTimeout;
var $pBGv$var$cachedClearTimeout;

function $pBGv$var$defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function $pBGv$var$defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      $pBGv$var$cachedSetTimeout = setTimeout;
    } else {
      $pBGv$var$cachedSetTimeout = $pBGv$var$defaultSetTimout;
    }
  } catch (e) {
    $pBGv$var$cachedSetTimeout = $pBGv$var$defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      $pBGv$var$cachedClearTimeout = clearTimeout;
    } else {
      $pBGv$var$cachedClearTimeout = $pBGv$var$defaultClearTimeout;
    }
  } catch (e) {
    $pBGv$var$cachedClearTimeout = $pBGv$var$defaultClearTimeout;
  }
})();

function $pBGv$var$runTimeout(fun) {
  if ($pBGv$var$cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if (($pBGv$var$cachedSetTimeout === $pBGv$var$defaultSetTimout || !$pBGv$var$cachedSetTimeout) && setTimeout) {
    $pBGv$var$cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return $pBGv$var$cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return $pBGv$var$cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return $pBGv$var$cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function $pBGv$var$runClearTimeout(marker) {
  if ($pBGv$var$cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if (($pBGv$var$cachedClearTimeout === $pBGv$var$defaultClearTimeout || !$pBGv$var$cachedClearTimeout) && clearTimeout) {
    $pBGv$var$cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return $pBGv$var$cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return $pBGv$var$cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return $pBGv$var$cachedClearTimeout.call(this, marker);
    }
  }
}

var $pBGv$var$queue = [];
var $pBGv$var$draining = false;
var $pBGv$var$currentQueue;
var $pBGv$var$queueIndex = -1;

function $pBGv$var$cleanUpNextTick() {
  if (!$pBGv$var$draining || !$pBGv$var$currentQueue) {
    return;
  }

  $pBGv$var$draining = false;

  if ($pBGv$var$currentQueue.length) {
    $pBGv$var$queue = $pBGv$var$currentQueue.concat($pBGv$var$queue);
  } else {
    $pBGv$var$queueIndex = -1;
  }

  if ($pBGv$var$queue.length) {
    $pBGv$var$drainQueue();
  }
}

function $pBGv$var$drainQueue() {
  if ($pBGv$var$draining) {
    return;
  }

  var timeout = $pBGv$var$runTimeout($pBGv$var$cleanUpNextTick);
  $pBGv$var$draining = true;
  var len = $pBGv$var$queue.length;

  while (len) {
    $pBGv$var$currentQueue = $pBGv$var$queue;
    $pBGv$var$queue = [];

    while (++$pBGv$var$queueIndex < len) {
      if ($pBGv$var$currentQueue) {
        $pBGv$var$currentQueue[$pBGv$var$queueIndex].run();
      }
    }

    $pBGv$var$queueIndex = -1;
    len = $pBGv$var$queue.length;
  }

  $pBGv$var$currentQueue = null;
  $pBGv$var$draining = false;
  $pBGv$var$runClearTimeout(timeout);
}

$pBGv$var$process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  $pBGv$var$queue.push(new $pBGv$var$Item(fun, args));

  if ($pBGv$var$queue.length === 1 && !$pBGv$var$draining) {
    $pBGv$var$runTimeout($pBGv$var$drainQueue);
  }
}; // v8 likes predictible objects


function $pBGv$var$Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

$pBGv$var$Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

$pBGv$var$process.title = 'browser';
$pBGv$var$process.env = {};
$pBGv$var$process.argv = [];
$pBGv$var$process.version = ''; // empty string to avoid regexp issues

$pBGv$var$process.versions = {};

function $pBGv$var$noop() {}

$pBGv$var$process.on = $pBGv$var$noop;
$pBGv$var$process.addListener = $pBGv$var$noop;
$pBGv$var$process.once = $pBGv$var$noop;
$pBGv$var$process.off = $pBGv$var$noop;
$pBGv$var$process.removeListener = $pBGv$var$noop;
$pBGv$var$process.removeAllListeners = $pBGv$var$noop;
$pBGv$var$process.emit = $pBGv$var$noop;
$pBGv$var$process.prependListener = $pBGv$var$noop;
$pBGv$var$process.prependOnceListener = $pBGv$var$noop;

$pBGv$var$process.listeners = function (name) {
  return [];
};

$pBGv$var$process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

$pBGv$var$process.cwd = function () {
  return '/';
};

$pBGv$var$process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

$pBGv$var$process.umask = function () {
  return 0;
};

// String.prototype.substr - negative index don't work in IE8
var $UUq2$var$substr = 'ab'.substr(-1) === 'b' ? function (str, start, len) {
  return str.substr(start, len);
} : function (str, start, len) {
  if (start < 0) start = str.length + start;
  return str.substr(start, len);
};
// ASSET: multithreading/multi.js
var t = {
  workers: require("./workers/workers"),
  serializeDataSet: function (t) {
    for (var r = [t[0].input.length, t[0].output.length], n = 0; n < t.length; n++) {
      var e;

      for (e = 0; e < r[0]; e++) r.push(t[n].input[e]);

      for (e = 0; e < r[1]; e++) r.push(t[n].output[e]);
    }

    return r;
  },
  activateSerializedNetwork: function (t, r, n, e, u) {
    for (var a = 0; a < e[0]; a++) r[a] = t[a];

    for (a = 2; a < e.length; a++) {
      var o = e[a++],
          i = e[a++],
          f = e[a++],
          h = e[a++],
          c = e[a++];

      for (n[o] = (-1 === c ? 1 : r[c]) * h * n[o] + i; -2 !== e[a];) n[o] += r[e[a++]] * e[a++] * (-1 === e[a++] ? 1 : r[e[a - 1]]);

      r[o] = u[f](n[o]);
    }

    var s = [];

    for (a = r.length - e[1]; a < r.length; a++) s.push(r[a]);

    return s;
  },
  deserializeDataSet: function (t) {
    for (var r = [], n = t[0] + t[1], e = 0; e < (t.length - 2) / n; e++) {
      for (var u = [], a = 2 + e * n; a < 2 + e * n + t[0]; a++) u.push(t[a]);

      var o = [];

      for (a = 2 + e * n + t[0]; a < 2 + e * n + n; a++) o.push(t[a]);

      r.push(u), r.push(o);
    }

    return r;
  },
  testSerializedSet: function (t, r, n, e, u, a) {
    for (var o = 0, i = 0; i < t.length; i += 2) {
      var f = this.activateSerializedNetwork(t[i], n, e, u, a);
      o += r(t[i + 1], f);
    }

    return o / (t.length / 2);
  },
  activations: [function (t) {
    return 1 / (1 + Math.exp(-t));
  }, function (t) {
    return Math.tanh(t);
  }, function (t) {
    return t;
  }, function (t) {
    return t > 0 ? 1 : 0;
  }, function (t) {
    return t > 0 ? t : 0;
  }, function (t) {
    return t / (1 + Math.abs(t));
  }, function (t) {
    return Math.sin(t);
  }, function (t) {
    return Math.exp(-Math.pow(t, 2));
  }, function (t) {
    return (Math.sqrt(Math.pow(t, 2) + 1) - 1) / 2 + t;
  }, function (t) {
    return t > 0 ? 1 : -1;
  }, function (t) {
    return 2 / (1 + Math.exp(-t)) - 1;
  }, function (t) {
    return Math.max(-1, Math.min(1, t));
  }, function (t) {
    return Math.abs(t);
  }, function (t) {
    return 1 - t;
  }, function (t) {
    var r = 1.6732632423543772;
    return 1.0507009873554805 * (t > 0 ? t : r * Math.exp(t) - r);
  }]
};

for (var r in t) module.exports[r] = t[r];

// ASSET: architecture/node.js
function e(t) {
  return (e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  })(t);
}

function t(e, t) {
  var r = Object.keys(e);

  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), r.push.apply(r, n);
  }

  return r;
}

function r(e) {
  for (var r = 1; r < arguments.length; r++) {
    var i = null != arguments[r] ? arguments[r] : {};
    r % 2 ? t(Object(i), !0).forEach(function (t) {
      n(e, t, i[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : t(Object(i)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
    });
  }

  return e;
}

function n(e, t, r) {
  return t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}

var i = require("lodash"),
    o = require("../methods/methods"),
    a = require("./connection"),
    s = require("../config");

function c(t) {
  var n = this;
  Object.assign(n, r({
    bias: 2 * Math.random() - 1,
    squash: o.activation.LOGISTIC,
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
    connections_self: new a(n, n, 0),
    error_responsibility: 0,
    error_projected: 0,
    error_gated: 0
  }, t)), n.activate = function (t, i) {
    if (null == i && "object" === e(t) && (i = t, t = void 0), i = r({
      trace: !0
    }, i = i || {}), null != t && Number.isFinite(t)) return n.activation = t;

    var o = function () {
      n.state = n.connections_self.gain * n.connections_self.weight * n.state + n.bias;

      for (var e = 0; e < n.incoming.length; e++) {
        var t = n.incoming[e];
        n.state += t.from.activation * t.weight * t.gain;
      }

      return n.state;
    };

    if (i.trace) {
      n.old = n.state, n.state = o(), n.activation = n.squash(n.state) * n.mask, n.derivative = n.squash(n.state, !0);

      for (var a = [], s = [], c = 0; c < n.gated.length; c++) {
        var l = n.gated[c];
        l.gain = n.activation;
        var g = a.indexOf(l.to);
        g > -1 ? s[g] += l.weight * l.from.activation : (a.push(l.to), s.push(l.weight * l.from.activation + (l.to.connections_self.gater === n ? l.to.old : 0)));
      }

      for (var u = 0; u < n.incoming.length; u++) {
        var f = n.incoming[u];
        f.elegibility = n.connections_self.gain * n.connections_self.weight * f.elegibility + f.from.activation * f.gain;

        for (var d = 0; d < a.length; d++) {
          var h = [a[d], s[d]],
              v = h[0],
              p = h[1],
              _ = f.xtrace_nodes.indexOf(v);

          _ > -1 ? f.xtrace_values[_] = v.connections_self.gain * v.connections_self.weight * f.xtrace_values[_] + n.derivative * f.elegibility * p : (f.xtrace_nodes.push(v), f.xtrace_values.push(n.derivative * f.elegibility * p));
        }
      }

      return n.activation;
    }

    if ("input" === n.type) return n.activation = 0;
    n.state = o(), n.activation = n.squash(n.state);

    for (var m = 0; m < n.gated.length; m++) n.gated[m].gain = n.activation;

    return n.activation;
  }, n.noTraceActivate = function (e) {
    return n.activate(e, {
      trace: !1
    });
  }, n.propagate = function (t, i) {
    if (null == i && "object" === e(t) && (i = t, t = void 0), i = r({
      momentum: 0,
      rate: .3,
      update: !0
    }, i = i || {}), null != t && Number.isFinite(t)) n.error_responsibility = n.error_projected = t - n.activation;else {
      n.error_projected = 0;

      for (var o = 0; o < n.outgoing.length; o++) {
        var a = n.outgoing[o];
        n.error_projected += a.to.error_responsibility * a.weight * a.gain;
      }

      n.error_projected *= n.derivative || 1, n.error_gated = 0;

      for (var s = 0; s < n.gated.length; s++) {
        var c = n.gated[s],
            l = c.to,
            g = (l.connections_self.gater === n ? l.old : 0) + c.weight * c.from.activation;
        n.error_gated += l.error_reponsibility * g;
      }

      n.error_gated *= n.derivative || 1, n.error_responsibility = n.error_projected + n.error_gated;
    }

    for (var u = 0; u < n.incoming.length; u++) {
      for (var f = n.incoming[u], d = n.error_projected * f.elegibility, h = 0; h < f.xtrace_nodes.length; h++) {
        d += f.xtrace_nodes[h].error_responsibility * f.xtrace_values[h];
      }

      f.delta_weights_total += i.rate * d * n.mask, i.update && (f.delta_weights_total += i.momentum * f.delta_weights_previous, f.weight += f.delta_weights_total, f.delta_weights_previous = f.delta_weights_total, f.delta_weights_total = 0);
    }

    return n.delta_bias_total += i.rate * n.error_responsibility, i.update && (n.delta_bias_total += i.momentum * n.delta_bias_previous, n.bias += n.delta_bias_total, n.delta_bias_previous = n.delta_bias_total, n.delta_bias_total = 0), {
      responsibility: n.error_responsibility,
      projected: n.error_projected,
      gated: n.error_gated
    };
  }, n.connect = function (t, r, i) {
    if (null == t) throw new ReferenceError("Missing required parameter 'nodes'");

    if (null == i && "object" === e(r) && (i = r, r = void 0), i = i || {}, t instanceof c) {
      if (t === n) return n.connections_self.weight = r || 1, n.connections_self;
      if (n.isProjectingTo(t)) throw new ReferenceError("Node is already projecting to 'target'");
      var o = new a(n, t, r, i);
      return n.outgoing.push(o), t.incoming.push(o), i.twosided && t.connect(n), o;
    }

    if (Array.isArray(t)) {
      for (var s = [], l = 0; l < t.length; l++) {
        var g = new a(n, t[l], r, i);
        n.outgoing.push(g), t[l].incoming.push(g), s.push(g), i.twosided && t[l].connect(n);
      }

      return s;
    }

    throw new TypeError("Parameter 'target': Expected 'Node' or 'Node[]' - but recieved, ".concat(t));
  }, n.disconnect = function (e, t) {
    if (null == e) throw new ReferenceError("Missing required parameter 'target'");
    if (t = t || {}, e === n) return n.connections_self.weight = 0, n.connections_self;

    var r = function (e) {
      for (var r = 0; r < n.outgoing.length; r++) {
        var i = n.outgoing[r];
        if (i.to === e) return n.outgoing.splice(r, 1), i.to.incoming.splice(i.to.incoming.indexOf(i), 1), null != i.gater && i.gater.ungate(i), t.twosided && e.disconnect(n), i;
      }
    };

    if (e instanceof c) return r(e);

    if (Array.isArray(e)) {
      for (var i = [], o = 0; o < e.length; o++) i.push(r(e[o]));

      return i;
    }

    throw new TypeError("Parameter 'target': Expected 'Node' or 'Node[]' - but recieved, ".concat(e));
  }, n.gate = function (e) {
    if (null == e) throw new ReferenceError("Missing required parameter 'connections'");
    if (Array.isArray(e)) for (var t = 0; t < e.length; t++) {
      var r = e[t];
      n.gated.push(r), r.gater = n;
    } else n.gated.push(e), e.gater = n;
    return e;
  }, n.ungate = function (e) {
    if (null == e) throw new ReferenceError("Missing required parameter 'connections'");
    if (Array.isArray(e)) for (var t = 0; t < e.length; t++) {
      var r = e[t];
      n.gated.splice(n.gated.indexOf(r), 1), r.gater = null, r.gain = 1;
    } else n.gated.splice(n.gated.indexOf(e), 1), e.gater = null, e.gain = 1;
    return e;
  }, n.clear = function () {
    for (var e = 0; e < n.incoming.length; e++) {
      var t = n.incoming[e];
      t.elegibility = 0, t.xtrace_nodes = [], t.xtrace_values = [];
    }

    for (var r = 0; r < n.gated.length; r++) {
      n.gated[r].gain = 0;
    }

    n.error_responsibility = n.error_projected = n.error_gated = 0, n.old = n.state = n.activation = 0;
  }, n.mutate = function (e) {
    switch ((e = r({
      method: Math.random() < .5 ? o.mutation.MOD_ACTIVATION : o.mutation.MOD_BIAS
    }, e)).method) {
      case o.mutation.MOD_ACTIVATION:
        e.allowed ? n.squash = e.allowed[(t = e.allowed.length, i = e.allowed.indexOf(n.squash), (i + Math.floor(Math.random() * (t - 1)) + 1) % t)] : n.squash = o.activation[function (e, t) {
          return e[(e.indexOf(t) + Math.floor(Math.random() * (e.length - 1)) + 1) % e.length];
        }(Object.keys(o.activation), n.squash.name)];
        break;

      case o.mutation.MOD_BIAS:
        n.bias += Math.random() * (e.method.max - e.method.min) + e.method.min;
    }

    var t, i;
  }, n.isProjectingTo = function (e) {
    if (null == e) throw new ReferenceError("Missing required parameter 'nodes'");
    if (e === n) return 0 !== n.connections_self.weight;

    if (Array.isArray(e)) {
      for (var t = 0, r = 0; r < e.length; r++) for (var i = e[r], o = 0; o < n.outgoing.length; o++) if (n.outgoing[o].to === i) {
        t++;
        break;
      }

      return e.length === t;
    }

    for (var a = 0; a < n.outgoing.length; a++) if (n.outgoing[a].to === e) return !0;

    return !1;
  }, n.isProjectedBy = function (e) {
    if (null == e) throw new ReferenceError("Missing required parameter 'nodes'");
    if (e === n) return 0 !== n.connections_self.weight;

    if (Array.isArray(e)) {
      for (var t = 0, r = 0; r < e.length; r++) for (var i = e[r], o = 0; o < n.incoming.length; o++) if (n.incoming[o].from === i) {
        t++;
        break;
      }

      return e.length === t;
    }

    for (var a = 0; a < n.incoming.length; a++) if (n.incoming[a].from === e) return !0;

    return !1;
  }, n.toJSON = function () {
    return {
      bias: n.bias,
      type: n.type,
      squash: n.squash.name,
      mask: n.mask
    };
  };
}

c.fromJSON = function (e) {
  if (null == e) throw new ReferenceError("Missing required parameter 'json'");
  "string" == typeof e && (e = JSON.parse(e));
  var t = new c();
  return Object.assign(t, r({}, e), {
    squash: o.activation[e.squash]
  }), t;
}, module.exports = c;

// ASSET: architecture/group.js
function n(n) {
  return t(n) || e(n) || o();
}

function o() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function e(n) {
  if (Symbol.iterator in Object(n) || "[object Arguments]" === Object.prototype.toString.call(n)) return Array.from(n);
}

function t(n) {
  if (Array.isArray(n)) {
    for (var o = 0, e = new Array(n.length); o < n.length; o++) e[o] = n[o];

    return e;
  }
}

function r(n) {
  return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (n) {
    return typeof n;
  } : function (n) {
    return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
  })(n);
}

var i = require("lodash"),
    s = require("../methods/methods"),
    a = require("../config"),
    c = require("./node");

function u(o) {
  var e = this;
  e.nodes = [], e.connections_self = [], e.incoming = [], e.outgoing = [];

  for (var t = 0; t < o; t++) e.nodes.push(new c());

  e.activate = function (n) {
    if (null != n && n.length !== e.nodes.length) throw new RangeError("Array with values should be same as the amount of nodes!");

    for (var o = [], t = 0; t < e.nodes.length; t++) {
      var r = null == n ? e.nodes[t].activate() : e.nodes[t].activate(n[t]);
      o.push(r);
    }

    return o;
  }, e.propagate = function (n, o) {
    if (!o && i.isPlainObject(n) && (o = n, n = void 0), null != n && n.length !== e.nodes.length) throw new RangeError("Array with values should be same as the amount of nodes!");

    for (var t = [], r = e.nodes.length - 1; r >= 0; r--) null == n ? t.push(e.nodes[r].propagate(o)) : t.push(e.nodes[r].propagate(n[r], o));

    return t;
  }, e.connect = function (n, o, t) {
    var r = !!n.nodes && e.nodes == n.nodes;
    null == o && (r ? (a.warnings && console.warn("No group connection specified, using ONE_TO_ONE"), o = s.connection.ONE_TO_ONE) : (a.warnings && console.warn("No group connection specified, using ALL_TO_ALL"), o = s.connection.ALL_TO_ALL));
    var i = [],
        u = [];
    if (i = e.output_nodes ? e.output_nodes : e.nodes, n.input_nodes) u = n.input_nodes;else if (n.nodes) u = n.nodes;else {
      if (!(n instanceof c)) throw new TypeError("Type of target not supported");
      u = [n];
    }
    if (o === s.connection.ONE_TO_ONE && i.length !== u.length) throw new RangeError("Method is one-to-one but there are unequal number of source and target nodes");

    for (var f = [], l = 0; l < u.length; l++) {
      if (o === s.connection.ALL_TO_ELSE) {
        for (var g = !1, d = 0; d < i.length; d++) if (u[l] == i[d]) {
          g = !0;
          break;
        }

        if (g) continue;
      }

      if (o === s.connection.ONE_TO_ONE) {
        var h = i[l].connect(u[l], t);
        f.push(h);
      } else for (var p = 0; p < i.length; p++) {
        var v = i[p].connect(u[l], t);
        f.push(v);
      }
    }

    for (var m = 0; m < f.length; m++) {
      var y = f[m];
      r ? e.connections_self.push(y) : (e.outgoing.push(y), n.incoming.push(y));
    }

    return f;
  }, e.gate = function (n, o) {
    if (null == o) throw new TypeError("Please specify Gating.INPUT, Gating.OUTPUT");
    Array.isArray(n) || (n = [n]);
    var t,
        r,
        i = [],
        a = [];

    for (t = 0; t < n.length; t++) {
      var c = n[t];
      i.includes(c.from) || i.push(c.from), a.includes(c.to) || a.push(c.to);
    }

    switch (o) {
      case s.gating.INPUT:
        for (t = 0; t < a.length; t++) {
          var u = a[t],
              f = e.nodes[t % e.nodes.length];

          for (r = 0; r < u.incoming.length; r++) {
            var l = u.incoming[r];
            n.includes(l) && f.gate(l);
          }
        }

        break;

      case s.gating.OUTPUT:
        for (t = 0; t < i.length; t++) {
          var g = i[t],
              d = e.nodes[t % this.nodes.length];

          for (r = 0; r < g.outgoing.length; r++) {
            var h = g.outgoing[r];
            n.includes(h) && d.gate(h);
          }
        }

        break;

      case s.gating.SELF:
        for (t = 0; t < i.length; t++) {
          var p = i[t],
              v = e.nodes[t % e.nodes.length];
          n.includes(p.connections_self) && v.gate(p.connections_self);
        }

    }
  }, e.set = function (n) {
    if ("object" !== r(n)) throw TypeError("options_to_set has to be an object with the properties to set and the desired values");

    for (var o = 0; o < e.nodes.length; o++) Object.assign(e.nodes[o], n);
  }, e.disconnect = function (n, o) {
    var t = this;
    if (o = o || !1, n instanceof u) for (var r = function (r) {
      for (var i = function (i) {
        e.nodes[r].disconnect(n.nodes[i], {
          twosided: o
        }), o && (e.incoming = e.incoming.filter(function (o) {
          return !!o && !(o.from === n.nodes[i] && o.to === t.nodes[r]);
        })), e.outgoing = e.outgoing.filter(function (o) {
          return !!o && !(o.from === e.nodes[r] && o.to === n.nodes[i]);
        });
      }, s = 0; s < n.nodes.length; s++) i(s);
    }, i = 0; i < e.nodes.length; i++) r(i);else if (n instanceof c) for (var s = function (t) {
      e.nodes[t].disconnect(n, {
        twosided: o
      }), o && (e.incoming = e.incoming.filter(function (o) {
        return !(o.from === n && o.to === e.nodes[t]);
      })), e.outgoing = e.outgoing.filter(function (o) {
        return !(o.from === e.nodes[t] && o.to === n);
      });
    }, a = 0; a < e.nodes.length; a++) s(a);
  }, e.clear = function () {
    for (var n = 0; n < e.nodes.length; n++) e.nodes[n].clear();

    return e;
  }, e.addNodes = function (o) {
    var t;
    o instanceof c ? o = [o] : o instanceof u && (o = o.nodes), (t = e.nodes).push.apply(t, n(o));
  };
}

module.exports = u;

// ASSET: architecture/layer.js
function n(e) {
  return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (n) {
    return typeof n;
  } : function (n) {
    return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
  })(e);
}

function e(n) {
  return c(n) || o(n) || t();
}

function t() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function o(n) {
  if (Symbol.iterator in Object(n) || "[object Arguments]" === Object.prototype.toString.call(n)) return Array.from(n);
}

function c(n) {
  if (Array.isArray(n)) {
    for (var e = 0, t = new Array(n.length); e < n.length; e++) t[e] = n[e];

    return t;
  }
}

function r(n, e) {
  if (!(n instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function i(n, e) {
  for (var t = 0; t < e.length; t++) {
    var o = e[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(n, o.key, o);
  }
}

function a(n, e, t) {
  return e && i(n.prototype, e), t && i(n, t), n;
}

function u(e, t) {
  return !t || "object" !== n(t) && "function" != typeof t ? s(e) : t;
}

function s(n) {
  if (void 0 === n) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return n;
}

function d(n) {
  return (d = Object.setPrototypeOf ? Object.getPrototypeOf : function (n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  })(n);
}

function p(n, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  n.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: n,
      writable: !0,
      configurable: !0
    }
  }), e && L(n, e);
}

function L(n, e) {
  return (L = Object.setPrototypeOf || function (n, e) {
    return n.__proto__ = e, n;
  })(n, e);
}

var _ = require("lodash"),
    f = require("../methods/methods"),
    l = require("./node"),
    y = require("./group"),
    O = function (n) {
  function t() {
    var n;
    return r(this, t), (n = u(this, d(t).apply(this, arguments))).input_nodes = [], n.output_nodes = [], n;
  }

  return p(t, y), a(t, null, [{
    key: "Dense",
    value: function (n) {
      var e = new t(n);
      return e.input_nodes = e.nodes, e.output_nodes = e.nodes, e;
    }
  }, {
    key: "LSTM",
    value: function (n) {
      var o,
          c,
          r = new t(),
          i = new y(n),
          a = new y(n),
          u = new y(n),
          s = new y(n),
          d = new y(n),
          p = new y(n);
      a.set({
        bias: 1
      }), u.set({
        bias: 1
      }), d.set({
        bias: 1
      }), s.connect(a, f.connection.ALL_TO_ALL), s.connect(u, f.connection.ALL_TO_ALL), s.connect(d, f.connection.ALL_TO_ALL);

      var L = s.connect(s, f.connection.ONE_TO_ONE),
          _ = s.connect(p, f.connection.ALL_TO_ALL);

      i.connect(s, f.connection.ALL_TO_ALL), i.connect(d, f.connection.ALL_TO_ALL), i.connect(u, f.connection.ALL_TO_ALL);
      var l = i.connect(a, f.connection.ALL_TO_ALL);
      return u.gate(L, f.gating.SELF), d.gate(_, f.gating.OUTPUT), a.gate(l, f.gating.INPUT), r.addNodes(i), r.addNodes(a), r.addNodes(u), r.addNodes(s), r.addNodes(d), r.addNodes(p), (o = r.input_nodes).push.apply(o, e(i.nodes)), (c = r.output_nodes).push.apply(c, e(p.nodes)), r;
    }
  }, {
    key: "GRU",
    value: function (n) {
      var o,
          c,
          r = new t(),
          i = new y(n),
          a = new y(n),
          u = new y(n),
          s = new y(n),
          d = new y(n),
          p = new y(n),
          L = new y(n);
      L.set({
        bias: 0,
        squash: f.activation.IDENTITY,
        type: "constant"
      }), d.set({
        squash: f.activation.TANH
      }), u.set({
        bias: 0,
        squash: f.activation.INVERSE,
        type: "constant"
      }), a.set({
        bias: 1
      }), s.set({
        bias: 0
      }), i.connect(a, f.connection.ALL_TO_ALL), i.connect(s, f.connection.ALL_TO_ALL), i.connect(d, f.connection.ALL_TO_ALL), L.connect(a, f.connection.ALL_TO_ALL), a.connect(u, f.connection.ONE_TO_ONE, 1), L.connect(s, f.connection.ALL_TO_ALL);

      var _ = L.connect(d, f.connection.ALL_TO_ALL);

      s.gate(_, f.gating.OUTPUT);
      var l = L.connect(p, f.connection.ALL_TO_ALL),
          O = d.connect(p, f.connection.ALL_TO_ALL);
      return a.gate(l, f.gating.OUTPUT), u.gate(O, f.gating.OUTPUT), p.connect(L, f.connection.ONE_TO_ONE, 1), r.addNodes(i), r.addNodes(a), r.addNodes(u), r.addNodes(s), r.addNodes(d), r.addNodes(p), r.addNodes(L), (o = r.input_nodes).push.apply(o, e(i.nodes)), (c = r.output_nodes).push.apply(c, e(p.nodes)), r;
    }
  }, {
    key: "Memory",
    value: function (n, o) {
      for (var c, r, i = new t(), a = new y(n), u = a, s = [], d = 0; d < o; d++) {
        var p = new y(n);
        p.set({
          squash: f.activation.IDENTITY,
          bias: 0,
          type: "constant"
        }), u.connect(p, f.connection.ONE_TO_ONE, 1), s.push(p), u = p;
      }

      return (c = i.input_nodes).push.apply(c, e(a.nodes)), (r = i.output_nodes).push.apply(r, e(s.slice(-1)[0].nodes)), s.reverse().forEach(function (n) {
        return i.addNodes(n);
      }), i;
    }
  }]), t;
}();

module.exports = O;
// ASSET: ../node_modules/os-browserify/browser.js
var $zv8z$export$getNetworkInterfaces, $zv8z$export$tmpDir;
var $zv8z$export$networkInterfaces = ($zv8z$export$getNetworkInterfaces = function () {
  return {};
});
var $zv8z$export$tmpdir = ($zv8z$export$tmpDir = function () {
  return '/tmp';
});

// ASSET: architecture/network.js
function t(e) {
  return (t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
    return typeof t;
  } : function (t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  })(e);
}

function e(t, e) {
  var n = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    e && (o = o.filter(function (e) {
      return Object.getOwnPropertyDescriptor(t, e).enumerable;
    })), n.push.apply(n, o);
  }

  return n;
}

function n(t) {
  for (var n = 1; n < arguments.length; n++) {
    var r = null != arguments[n] ? arguments[n] : {};
    n % 2 ? e(Object(r), !0).forEach(function (e) {
      o(t, e, r[e]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : e(Object(r)).forEach(function (e) {
      Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e));
    });
  }

  return t;
}

function o(t, e, n) {
  return e in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}

function r(t) {
  return u(t) || s(t) || a();
}

function a() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function s(t) {
  if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) return Array.from(t);
}

function u(t) {
  if (Array.isArray(t)) {
    for (var e = 0, n = new Array(t.length); e < t.length; e++) n[e] = t[e];

    return n;
  }
}

var c = require("../config"),
    p = require("../multithreading/multi"),
    l = require("../methods/methods"),
    h = require("./group"),
    f = require("./layer"),
    d = require("./connection"),
    g = require("./node"),
    v = require("lodash"),
    _ = l.mutation;

function m(t, e) {
  if (void 0 === t || void 0 === e) throw new TypeError("No input or output size given");
  var n = this;
  n.input_size = t, n.output_size = e, n.input = t, n.output = e, n.input_nodes = new Set(), n.output_nodes = new Set(), n.nodes = [], n.connections = [], n.gates = [];

  for (var o = 0; o < t; o++) {
    var a = new g({
      type: "input"
    });
    n.nodes.push(a), n.input_nodes.add(a);
  }

  for (var s = 0; s < e; s++) {
    var u = new g({
      type: "output"
    });
    n.nodes.push(u), n.output_nodes.add(u);
  }

  n.connect = function (t, e, o) {
    var r = t.connect(e, o);
    r instanceof d && (r = [r]);

    for (var i = 0; i < r.length; i++) {
      var a = r[i];
      n.connections.push(a);
    }

    return r;
  };

  for (var f = 0; f < n.input_size; f++) for (var m = n.input_size; m < n.output_size + n.input_size; m++) {
    var O = (Math.random() - .5) * n.input_size * Math.sqrt(2 / n.input_size);
    n.connect(n.nodes[f], n.nodes[m], O);
  }

  n.activate = function (t) {
    for (var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, o = e.dropout_rate, r = void 0 === o ? 0 : o, i = e.trace, a = void 0 === i || i, s = 0, u = 0; u < n.nodes.length && s !== n.input_nodes.size; u++) {
      var c = n.nodes[u];
      n.input_nodes.has(c) && c.activate(t[s++], {
        trace: a
      });
    }

    if (s !== t.length) throw Error("There are ".concat(s, " input nodes, but ").concat(t.length, " inputs were passed"));
    n.nodes.forEach(function (t, e) {
      n.input_nodes.has(t) || n.output_nodes.has(t) || (r && (t.mask = Math.random() < r ? 0 : 1), t.activate({
        trace: a
      }));
    });

    for (var p = [], l = 0; l < n.nodes.length && p.length !== n.output_nodes.size; l++) {
      var h = n.nodes[l];
      n.output_nodes.has(h) && p.push(h.activate({
        trace: a
      }));
    }

    if (p.length !== n.output_nodes.size) throw Error("There are ".concat(n.output_nodes.size, " output nodes, but ").concat(p.length, " outputs were passed"));
    return p;
  }, n.noTraceActivate = function (t) {
    return n.activate(t, {
      trace: !1
    });
  }, n.propagate = function (t, e, o, r) {
    var i = n.output_size || n.output;
    n.input_size || n.input;
    if (void 0 === r || r.length !== i) throw new Error("Output target length should match network output length");

    for (var a = 0, s = 0; a < i; s++) n.output_nodes.has(n.nodes[s]) && (n.nodes[s].propagate(r[a], {
      rate: t,
      momentum: e,
      update: o
    }), a++);

    for (var u = n.nodes.length - 1; u >= 0; u--) {
      var c = n.nodes[u];
      n.input_nodes.has(c) || n.output_nodes.has(c) || c.propagate({
        rate: t,
        momentum: e,
        update: o
      });
    }

    n.input_nodes.forEach(function (n) {
      n.propagate({
        rate: t,
        momentum: e,
        update: o
      });
    });
  }, n.clear = function () {
    for (var t = 0; t < n.nodes.length; t++) n.nodes[t].clear();
  }, n.clone = function () {
    return v.cloneDeep(n);
  }, n.disconnect = function (t, e) {
    for (var o = n.connections, r = 0; r < o.length; r++) {
      var i = o[r];

      if (i.from === t && i.to === e) {
        null !== i.gater && n.ungate(i), o.splice(r, 1);
        break;
      }
    }

    return t.disconnect(e);
  }, n.gate = function (t, e) {
    if (-1 === n.nodes.indexOf(t)) throw new ReferenceError("This node is not part of the network!");
    null == e.gater ? (t.gate(e), n.gates.push(e)) : c.warnings && console.warn("This connection is already gated!");
  }, n.ungate = function (t) {
    var e = n.gates.indexOf(t);
    if (-1 === e) throw new Error("This connection is not gated!");
    n.gates.splice(e, 1), t.gater.ungate(t);
  }, n.remove = function (t) {
    var e = n.nodes.indexOf(t);
    if (-1 === e) throw new ReferenceError("This node does not exist in the network!");
    var o = [];
    n.disconnect(t, t);
    var r = [];
    v.forEachRight(t.incoming, function (e) {
      _.SUB_NODE.keep_gates && null !== e.gater && e.gater !== t && o.push(e.gater), r.push(e.from), n.disconnect(e.from, t);
    });
    var a = [];
    v.forEachRight(t.outgoing, function (e) {
      _.SUB_NODE.keep_gates && null !== e.gater && e.gater !== t && o.push(e.gater), a.push(e.to), n.disconnect(t, e.to);
    });
    var s = [];

    for (v.forEach(r, function (t) {
      v.forEach(a, function (e) {
        if (!t.isProjectingTo(e)) {
          var o = n.connect(t, e);
          s.push(o[0]);
        }
      });
    }); o.length > 0 && s.length > 0;) {
      var u = o.shift(),
          c = Math.floor(Math.random() * s.length);
      n.gate(u, s[c]), s.splice(c, 1);
    }

    for (i = t.gated.length - 1; i >= 0; i--) {
      var p = t.gated[i];
      n.ungate(p);
    }

    n.nodes.splice(e, 1);
  }, n.possible = function (t) {
    var e = this,
        n = [];

    switch (t.name) {
      case "SUB_NODE":
        return !!(n = v.filter(e.nodes, function (t) {
          return !e.input_nodes.has(t) && !e.output_nodes.has(t);
        })).length && n;

      case "ADD_CONN":
        for (var o = 0; o < e.nodes.length - e.output_size; o++) for (var r = e.nodes[o], i = Math.max(o + 1, e.input_size); i < e.nodes.length; i++) {
          var a = e.nodes[i];
          r.isProjectingTo(a) || n.push([r, a]);
        }

        return !!n.length && n;

      case "REMOVE_CONN":
      case "SUB_CONN":
        return v.each(e.connections, function (t) {
          t.from.outgoing.length > 1 && t.to.incoming.length > 1 && e.nodes.indexOf(t.to) > e.nodes.indexOf(t.from) && n.push(t);
        }), !!n.length && n;

      case "MOD_ACTIVATION":
        return !!(n = v.filter(e.nodes, t.mutateOutput ? function (t) {
          return "input" !== t.type;
        } : function (t) {
          return "input" !== t.type && "output" !== t.type;
        })).length && n;

      case "ADD_SELF_CONN":
        for (var s = e.input_size; s < e.nodes.length; s++) {
          var u = e.nodes[s];
          0 === u.connections_self.weight && n.push(u);
        }

        return !!n.length && n;

      case "SUB_SELF_CONN":
        for (var c = 0; c < e.connections.length; c++) {
          var p = e.connections[c];
          p.from == p.to && n.push(p);
        }

        return !!n.length && n;

      case "ADD_GATE":
        return e.connections.forEach(function (t) {
          null === t.gater && n.push(t);
        }), !!n.length && n;

      case "SUB_GATE":
        return e.gates.length > 0 && [];

      case "ADD_BACK_CONN":
        for (var l = e.input_size; l < e.nodes.length; l++) for (var h = e.nodes[l], f = e.input_size; f < l; f++) {
          var d = e.nodes[f];
          h.isProjectingTo(d) || n.push([h, d]);
        }

        return !!n.length && n;

      case "SUB_BACK_CONN":
        return v.each(e.connections, function (t) {
          t.from.outgoing.length > 1 && t.to.incoming.length > 1 && e.nodes.indexOf(t.from) > e.nodes.indexOf(t.to) && n.push(t);
        }), !!n.length && n;

      case "SWAP_NODES":
        if (e.nodes.length - 1 - e.input_size - (t.mutateOutput ? 0 : e.output_size) < 2) return !1;
        var g = t.mutateOutput ? function (t) {
          return "input" !== t.type;
        } : function (t) {
          return "input" !== t.type && "output" !== t.type;
        };
        return (n = v.filter(e.nodes, g)).length >= 2 && n;
    }
  }, n.mutate = function (t, e) {
    if (void 0 === t) throw new Error("Mutate method is undefined!");

    var o = e || {},
        r = o.maxNodes,
        i = o.maxConns,
        a = o.maxGates,
        s = function () {
      if (n.nodes.length <= n.input_nodes.size) throw new Error("Something went wrong. Total nodes is length is somehow less than size of inputs");
      return v.sample(n.connections);
    };

    switch (t.name) {
      case "ADD_NODE":
        if (n.nodes.length >= r) return null;
        var u = new g({
          type: "hidden"
        });
        _.ADD_NODE.randomActivation && u.mutate(_.MOD_ACTIVATION);
        var c = s(),
            p = c.from,
            l = c.to;
        n.disconnect(p, l);
        var h = n.nodes.indexOf(p);
        h = h >= n.input_nodes.size - 1 ? h : n.input_nodes.size - 1, n.nodes.splice(h + 1, 0, u);
        var f = n.connect(p, u, 1)[0],
            d = n.connect(u, l, c.weight)[0],
            m = c.gater;
        return null != m && n.gate(m, Math.random() >= .5 ? f : d), n;

      case "SUB_NODE":
        var w = n.possible(t);
        return w ? (n.remove(v.sample(w)), n) : null;

      case "ADD_CONN":
        if (n.connections.length >= i) return null;
        var O = n.possible(t);

        if (O) {
          var A = O[Math.floor(Math.random() * O.length)];
          return n.connect(A[0], A[1]), n;
        }

        return null;

      case "REMOVE_CONN":
      case "SUB_CONN":
        var N = n.possible(t);

        if (N) {
          var E = v.sample(N);
          return n.disconnect(E.from, E.to), n;
        }

        return null;

      case "MOD_WEIGHT":
        return s().weight += Math.random() * (t.max - t.min) + t.min, n;

      case "MOD_BIAS":
        return n.nodes.length <= n.input_size ? null : (n.nodes[Math.floor(Math.random() * (n.nodes.length - n.input_size) + n.input_size)].mutate(t), n);

      case "MOD_ACTIVATION":
        var z = n.possible(t);
        return z ? (v.sample(z).mutate(t), n) : null;

      case "ADD_SELF_CONN":
        var L = n.possible(t);

        if (L) {
          var y = L[Math.floor(Math.random() * L.length)];
          return n.connect(y, y), n;
        }

        return null;

      case "SUB_SELF_CONN":
        var b = n.possible(t);

        if (b) {
          var S = b[Math.floor(Math.random() * b.length)];
          return n.disconnect(S.from, S.to), n;
        }

        return null;

      case "ADD_GATE":
        if (n.gates.length >= a) return null;
        var T = n.possible(t);

        if (T) {
          var x = n.nodes[Math.floor(Math.random() * (n.nodes.length - n.input_size) + n.input_size)],
              D = T[Math.floor(Math.random() * T.length)];
          return n.gate(x, D), n;
        }

        return null;

      case "SUB_GATE":
        return n.possible(t) ? (n.ungate(n.gates[Math.floor(Math.random() * n.gates.length)]), n) : null;

      case "ADD_BACK_CONN":
        var M = n.possible(t);

        if (M) {
          var C = M[Math.floor(Math.random() * M.length)];
          return n.connect(C[0], C[1]), n;
        }

        return null;

      case "SUB_BACK_CONN":
        var P = n.possible(t);

        if (P) {
          var I = P[Math.floor(Math.random() * P.length)];
          return n.disconnect(I.from, I.to), n;
        }

        return null;

      case "SWAP_NODES":
        var R = n.possible(t);

        if (R) {
          var k = v.sample(R),
              U = v.filter(R, function (t, e) {
            return t !== k;
          }),
              q = v.sample(U),
              j = k.bias,
              G = k.squash;
          return k.bias = q.bias, k.squash = q.squash, q.bias = j, q.squash = G, n;
        }

        return null;
    }
  }, n.mutateRandom = function (t, e) {
    for (var o = Array.isArray(t) && t.length ? v.cloneDeep(t) : v.cloneDeep(l.mutation.ALL); o.length > 0;) {
      var r = Math.floor(Math.random() * o.length),
          i = o[r];
      if (n.mutate(i, e)) return n;
      o.splice(r, 1);
    }

    return null;
  }, n.train = function (t, e) {
    if (t[0].input.length !== (n.input_size || n.input) || t[0].output.length !== (n.output_size || n.output)) throw new Error("Dataset input/output size should be same as network input/output size!");
    var o;
    c.warnings && e && (void 0 === e.rate && console.warn("Using default learning rate, please define a rate!"), void 0 === e.iterations && console.warn("No target iterations given, running until error is reached!")), e && (e = v.defaults(e, {
      batch_size: e.batchSize,
      rate_policy: e.ratePolicy,
      cross_validate: e.crossValidate
    })), o = (e = v.defaults(e, {
      iterations: 1e3,
      error: .05,
      cost: l.cost.MSE,
      rate: .3,
      dropout: 0,
      momentum: 0,
      batch_size: 1,
      rate_policy: l.rate.FIXED
    })).cross_validate ? e.cross_validate.test_error : e.error ? e.error : -1;
    var r,
        i,
        a,
        s = e.rate,
        u = Date.now();
    if (e.batch_size > t.length) throw new Error("Batch size must be smaller or equal to dataset length!");
    if (void 0 === e.iterations && void 0 === e.error) throw new Error("At least one of the following options must be specified: error, iterations");
    void 0 === e.iterations && (e.iterations = 0), e.cross_validate ? (r = Math.ceil((1 - e.cross_validate.testSize) * t.length), i = t.slice(0, r), a = t.slice(r)) : i = t;

    for (var p, h, f, d = s, g = 0, _ = 1; _ > o && (0 === e.iterations || g < e.iterations);) {
      g++, d = e.rate_policy(s, g);

      var m = n._trainOneEpoch(i, e.batch_size, d, e.momentum, e.cost, {
        dropout_rate: e.dropout
      });

      if (e.clear && n.clear(), e.cross_validate ? (_ = n.test(a, e.cost).error, e.clear && n.clear()) : _ = m, e.shuffle) for (p = t.length; p; h = Math.floor(Math.random() * p), f = t[--p], t[p] = t[h], t[h] = f);
      e.log && g % e.log == 0 && console.log("iteration number", g, "error", _, "training rate", d), e.schedule && g % e.schedule.iterations == 0 && e.schedule.function({
        error: _,
        iteration_number: g
      });
    }

    return e.clear && n.clear(), {
      error: _,
      iterations: g,
      time: Date.now() - u
    };
  }, n._trainOneEpoch = function (t, e, o, r, i) {
    for (var a = (arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {}).dropout_rate, s = void 0 === a ? .5 : a, u = 0, c = 0; c < t.length; c++) {
      var p = t[c].input,
          l = t[c].output,
          h = !((c + 1) % e != 0 && c + 1 !== t.length),
          f = n.activate(p, {
        dropout_rate: s
      });
      n.propagate(o, r, h, l), u += i(l, f);
    }

    return u / t.length;
  }, n.test = function (t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : l.cost.MSE,
        o = 0,
        r = Date.now();
    return v.times(t.length, function (r) {
      var i = t[r].input,
          a = t[r].output,
          s = n.activate(i, {
        trace: !1
      });
      o += e(a, s);
    }), {
      error: o /= t.length,
      time: Date.now() - r
    };
  }, n.toJSON = function () {
    var t,
        e = {
      nodes: [],
      connections: [],
      input_nodes: [],
      output_nodes: [],
      input_size: n.input_size,
      output_size: n.output_size,
      dropout: n.dropout,
      input: n.input_size,
      output: n.output_size
    };

    for (t = 0; t < n.nodes.length; t++) n.nodes[t].index = t, n.input_nodes.has(n.nodes[t]) && e.input_nodes.push(t), n.output_nodes.has(n.nodes[t]) && e.output_nodes.push(t);

    for (t = 0; t < n.nodes.length; t++) {
      var o = n.nodes[t],
          r = o.toJSON();

      if (r.index = t, e.nodes.push(r), 0 !== o.connections_self.weight) {
        var i = o.connections_self.toJSON();
        i.from = t, i.to = t, i.gater = null != o.connections_self.gater ? o.connections_self.gater.index : null, e.connections.push(i);
      }
    }

    for (t = 0; t < n.connections.length; t++) {
      var a = n.connections[t],
          s = a.toJSON();
      s.from = a.from.index, s.to = a.to.index, s.gater = null != a.gater ? a.gater.index : null, e.connections.push(s);
    }

    return e;
  }, n.set = function (t) {
    n.nodes.forEach(function (e) {
      return Object.assign(e, {
        bias: t.bias,
        squash: t.squash
      });
    });
  }, n.evolve = function (t, e) {
    var o, r, i, a, s, u, c, h, f, d, g, _;

    return regeneratorRuntime.async(function (m) {
      for (;;) switch (m.prev = m.next) {
        case 0:
          if (t[0].input.length === (n.input_size || n.input) && t[0].output.length === (n.output_size || n.output)) {
            m.next = 2;
            break;
          }

          throw new Error("Dataset input/output size should be same as network input/output size!");

        case 2:
          if (void 0 === (e = e || {}).iterations && void 0 === e.error ? (e.iterations = 1e3, o = .05) : e.iterations ? o = -1 : e.error && (o = e.error, e.iterations = 0), e = v.defaults(e, {
            fitness_population: e.fitnessPopulation,
            max_nodes: e.maxNodes,
            max_connections: e.maxConns,
            max_gates: e.maxGates = 1 / 0,
            mutation_selection: e.mutationSelection,
            efficient_mutation: e.efficientMutation
          }), e = v.defaults(e, {
            threads: "undefined" == typeof window ? require("os").cpus().length : navigator.hardwareConcurrency,
            growth: void 0 !== e.growth ? e.growth : 1e-4,
            cost: l.cost.MSE,
            amount: 1,
            fitness_population: !1,
            max_nodes: 1 / 0,
            max_connections: 1 / 0,
            max_gates: 1 / 0,
            efficient_mutation: !1
          }), t, r = Date.now(), i = p.serializeDataSet(t), a = [], "undefined" == typeof window) for (s = 0; s < e.threads; s++) a.push(new p.workers.node.TestWorker(i, e.cost));else for (s = 0; s < e.threads; s++) a.push(new p.workers.browser.TestWorker(i, e.cost));
          e.fitness = function (t, n) {
            return new Promise(function (t, o) {
              for (var r = n.slice(), i = 0, s = function n(o) {
                if (r.length) {
                  var a = r.shift();
                  o.evaluate(a).then(function (t) {
                    a.score = -t, a.score -= (a.nodes.length - a.input_size - a.output_size + a.connections.length + a.gates.length) * e.growth, a.score = isNaN(parseFloat(t)) ? -1 / 0 : a.score, n(o);
                  });
                } else ++i === e.threads && t();
              }, u = 0; u < a.length; u++) s(a[u]);
            });
          }, e.fitness_population = !0, e.network = this, e.input = n.input_size, e.output = n.output_size, u = new w(t, e), c = -1 / 0, h = -1 / 0;

        case 19:
          if (!(c < -o && (0 === e.iterations || u.generation < e.iterations))) {
            m.next = 30;
            break;
          }

          return m.next = 22, regeneratorRuntime.awrap(u.evolve());

        case 22:
          d = m.sent, g = d.score, c = g + (d.nodes.length - d.input - d.output + d.connections.length + d.gates.length) * e.growth, g > h && (h = g, f = d), e.log && u.generation % e.log == 0 && console.log("iteration", u.generation, "fitness", g, "error", -c), e.schedule && u.generation % e.schedule.iterations == 0 && e.schedule.function({
            fitness: g,
            error: -c,
            iteration: u.generation
          }), m.next = 19;
          break;

        case 30:
          for (_ = 0; _ < a.length; _++) a[_].terminate();

          return void 0 !== f && (n.nodes = f.nodes, n.connections = f.connections, n.gates = f.gates, n.input_nodes = f.input_nodes, n.output_nodes = f.output_nodes, e.clear && n.clear()), m.abrupt("return", {
            error: -c,
            iterations: u.generation,
            time: Date.now() - r
          });

        case 33:
        case "end":
          return m.stop();
      }
    }, null, this);
  }, n.standalone = function () {
    for (var t = [], e = [], o = [], r = [], a = [], s = 0; s < n.input_size; s++) {
      var u = n.nodes[s];
      e.push(u.activation), o.push(u.state);
    }

    for (r.push("for(var i = 0; i < input.length; i++) A[i] = input[i];"), i = 0; i < n.nodes.length; i++) n.nodes[i].index = i;

    for (i = n.input_size; i < n.nodes.length; i++) {
      var c = n.nodes[i];
      e.push(c.activation), o.push(c.state);
      var p = t.indexOf(c.squash.name);
      -1 === p && (p = t.length, t.push(c.squash.name), a.push(c.squash.toString()));

      for (var l = [], h = 0; h < c.incoming.length; h++) {
        var f = c.incoming[h];
        f.from.index;
        var d = "A[".concat(f.from.index, "] * ").concat(f.weight);
        null != f.gater && (d += " * A[".concat(f.gater.index, "]")), l.push(d);
      }

      if (c.connections_self.weight) {
        var g = c.connections_self,
            v = "S[".concat(i, "] * ").concat(g.weight);
        null != g.gater && (v += " * A[".concat(g.gater.index, "]")), l.push(v);
      }

      var _ = "S[".concat(i, "] = ").concat(l.join(" + "), " + ").concat(c.bias, ";"),
          m = "A[".concat(i, "] = F[").concat(p, "](S[").concat(i, "])").concat(c.mask ? "" : " * " + c.mask, ";");

      r.push(_), r.push(m);
    }

    var w = [];

    for (i = n.nodes.length - n.output_size; i < n.nodes.length; i++) w.push("A[".concat(i, "]"));

    w = "return [".concat(w.join(","), "];"), r.push(w);
    var O = "";
    return O += "var F = [".concat(a.toString(), "];\r\n"), O += "var A = [".concat(e.toString(), "];\r\n"), O += "var S = [".concat(o.toString(), "];\r\n"), O += "function activate(input){\r\n".concat(r.join("\r\n"), "\r\n}");
  }, n.serialize = function () {
    var t = [],
        e = [],
        o = [],
        r = ["LOGISTIC", "TANH", "IDENTITY", "STEP", "RELU", "SOFTSIGN", "SINUSOID", "GAUSSIAN", "BENT_IDENTITY", "BIPOLAR", "BIPOLAR_SIGMOID", "HARD_TANH", "ABSOLUTE", "INVERSE", "SELU"];
    o.push(n.input_size), o.push(n.output_size);
    var i = 0;
    v.forEach(n.nodes, function (n) {
      n.index = i, i++, t.push(n.activation), e.push(n.state);
    });

    for (var a = function (t) {
      var e = n.nodes[t];
      o.push(e.index), o.push(e.bias), o.push(r.indexOf(e.squash.name)), o.push(e.connections_self.weight), o.push(null == e.connections_self.gater ? -1 : e.connections_self.gater.index), v.times(e.incoming.length, function (t) {
        var n = e.incoming[t];
        o.push(n.from.index), o.push(n.weight), o.push(null == n.gater ? -1 : n.gater.index);
      }), o.push(-2);
    }, s = n.input_size; s < n.nodes.length; s++) a(s);

    return [t, e, o];
  }, n.addNodes = function (t) {
    var e;
    t instanceof g ? t = [t] : t instanceof h && (t = t.nodes), (e = n.nodes).push.apply(e, r(t));

    for (var o = 0; o < t.length; o++) {
      var i, a;
      (i = n.connections).push.apply(i, r(t[o].outgoing)), (a = n.gates).push.apply(a, r(t[o].gated)), t[o].connections_self.weight && n.connections.push(t[o].connections_self);
    }
  };
}

m.fromJSON = function (t) {
  var e = new m(t.input_size, t.output_size);
  return e.dropout = t.dropout, e.nodes = [], e.connections = [], e.input_nodes = new Set(), e.output_nodes = new Set(), t.nodes.forEach(function (t, n) {
    var o = g.fromJSON(t);
    o.index = n, e.nodes.push(o);
  }), t.connections.forEach(function (t) {
    var n = e.connect(e.nodes[t.from], e.nodes[t.to])[0];
    n.weight = t.weight, null != t.gater && e.gate(e.nodes[t.gater], n);
  }), t.input_nodes.forEach(function (t) {
    return e.input_nodes.add(e.nodes[t]);
  }), t.output_nodes.forEach(function (t) {
    return e.output_nodes.add(e.nodes[t]);
  }), e;
}, m.merge = function (t, e) {
  if (t = m.fromJSON(t.toJSON()), e = m.fromJSON(e.toJSON()), t.output_size !== e.input_size) throw new Error("Output size of network1 should be the same as the input size of network2!");
  var n;

  for (n = 0; n < e.connections.length; n++) {
    var o = e.connections[n];

    if ("input" === o.from.type) {
      var r = e.nodes.indexOf(o.from);
      o.from = t.nodes[t.nodes.length - 1 - r];
    }
  }

  for (n = e.input - 1; n >= 0; n--) e.nodes.splice(n, 1);

  for (n = t.nodes.length - t.output; n < t.nodes.length; n++) t.nodes[n].type = "hidden";

  return t.connections = t.connections.concat(e.connections), t.nodes = t.nodes.concat(e.nodes), t;
}, m.crossOver = function (t, e, n) {
  if (t.input_size !== e.input_size || t.output_size !== e.output_size) throw new Error("Networks don`t have the same input/output size!");
  var o = new m(t.input_size, t.output_size);
  o.connections = [], o.nodes = [], o.input_nodes = new Set(), o.output_nodes = new Set();
  var r,
      i = t.score || 0,
      a = e.score || 0;

  if (n || i === a) {
    var s = Math.max(t.nodes.length, e.nodes.length),
        u = Math.min(t.nodes.length, e.nodes.length);
    r = Math.floor(Math.random() * (s - u + 1) + u);
  } else r = i > a ? t.nodes.length : e.nodes.length;

  var c,
      p = t.input_size,
      l = t.output_size;

  for (c = 0; c < t.nodes.length; c++) t.nodes[c].index = c;

  for (c = 0; c < e.nodes.length; c++) e.nodes[c].index = c;

  for (c = 0; c < r; c++) {
    var h = void 0,
        f = "";

    if (c < p) {
      f = "input";

      for (var v = Math.random() >= .5 ? t : e, _ = -1, w = -1; _ < c;) {
        if (++w >= v.nodes.length) throw RangeError("something is wrong with the size of the input");
        v.input_nodes.has(v.nodes[w]) && _++;
      }

      h = v.nodes[w];
    } else if (c < p + l) {
      f = "output";

      for (var O = Math.random() >= .5 ? t : e, A = -1, N = -1; A < c - p;) {
        if (++N >= O.nodes.length) throw RangeError("something is wrong with the size of the output");
        O.output_nodes.has(O.nodes[N]) && A++;
      }

      h = O.nodes[N];
    } else {
      f = "hidden";
      var E = void 0;
      E = c >= t.nodes.length ? e : c >= e.nodes.length ? t : Math.random() >= .5 ? t : e;
      var z = Math.floor(Math.random() * E.nodes.length);
      h = E.nodes[z];
    }

    var L = new g({
      bias: h.bias,
      squash: h.squash,
      type: h.type
    });
    "input" === f ? o.input_nodes.add(L) : "output" === f && o.output_nodes.add(L), o.nodes.push(L);
  }

  var y = {},
      b = {};

  for (c = 0; c < t.connections.length; c++) {
    var S = t.connections[c],
        T = {
      weight: S.weight,
      from: S.from.index,
      to: S.to.index,
      gater: null != S.gater ? S.gater.index : -1
    };
    y[d.innovationID(T.from, T.to)] = T;
  }

  for (c = 0; c < e.connections.length; c++) {
    var x = e.connections[c],
        D = {
      weight: x.weight,
      from: x.from.index,
      to: x.to.index,
      gater: null != x.gater ? x.gater.index : -1
    };
    b[d.innovationID(D.from, D.to)] = D;
  }

  var M = [],
      C = Object.keys(y),
      P = Object.keys(b);

  for (c = C.length - 1; c >= 0; c--) if (void 0 !== b[C[c]]) {
    var I = Math.random() >= .5 ? y[C[c]] : b[C[c]];
    M.push(I), b[C[c]] = void 0;
  } else (i >= a || n) && M.push(y[C[c]]);

  if (a >= i || n) for (c = 0; c < P.length; c++) void 0 !== b[P[c]] && M.push(b[P[c]]);

  for (c = 0; c < M.length; c++) {
    var R = M[c];

    if (R.to < r && R.from < r) {
      var k = o.nodes[R.from],
          U = o.nodes[R.to],
          q = o.connect(k, U)[0];
      q.weight = R.weight, -1 !== R.gater && R.gater < r && o.gate(o.nodes[R.gater], q);
    }
  }

  return o;
}, m.architecture = {
  Construct: function (t) {
    var e,
        n,
        o = new m(0, 0),
        r = [];

    for (e = 0; e < t.length; e++) if (t[e] instanceof h || t[e] instanceof f) for (n = 0; n < t[e].nodes.length; n++) r.push(t[e].nodes[n]), 0 === e ? o.input_nodes.add(t[e].nodes[n]) : e === t.length - 1 && o.output_nodes.add(t[e].nodes[n]);else t[e] instanceof g && r.push(t[e]);

    var i = v.reduce(r, function (t, e) {
      return t + ("output" === e.type);
    }, 0),
        a = v.reduce(r, function (t, e) {
      return t + ("input" === e.type);
    }, 0),
        s = [],
        u = [];

    for (e = r.length - 1; e >= 0; e--) "output" === r[e].type || !i && r[e].outgoing.length + r[e].gated.length === 0 ? (r[e].type = "output", o.output_size++, u.push(r[e]), r.splice(e, 1)) : "input" !== r[e].type && (a || r[e].incoming.length) || (r[e].type = "input", o.input_size++, s.push(r[e]), r.splice(e, 1));

    if (o.input = o.input_size, o.output = o.output_size, r = s.concat(r).concat(u), 0 === o.input_size || 0 === o.output_size) throw new Error("Given nodes have no clear input/output node!");
    return o.addNodes(r), o;
  },
  Perceptron: function () {
    var t = Array.from(arguments);
    if (t.length < 3) throw new Error("You have to specify at least 3 layers");
    var e = [new h(t[0])];
    return v.times(t.length - 1, function (n) {
      var o = new h(t[n + 1]);
      e.push(o), e[n].connect(e[n + 1], l.connection.ALL_TO_ALL);
    }), m.architecture.Construct(e);
  },
  Random: function (t, e, n, o) {
    o ? !o && v.isPlainObject(n) && (o = n, n = e, e = void 0) : (n = e, e = void 0), e = e || 0, o = v.defaults(o, {
      connections: 2 * e,
      backconnections: 0,
      selfconnections: 0,
      gates: 0
    });
    var r = new m(t, n);
    return v.times(e, function () {
      return r.mutate(l.mutation.ADD_NODE);
    }), v.times(o.connections - e, function () {
      return r.mutate(l.mutation.ADD_CONN);
    }), v.times(o.backconnections, function () {
      return r.mutate(l.mutation.ADD_BACK_CONN);
    }), v.times(o.selfconnections, function () {
      return r.mutate(l.mutation.ADD_SELF_CONN);
    }), v.times(o.gates, function () {
      return r.mutate(l.mutation.ADD_GATE);
    }), r;
  },
  LSTM: function () {
    var t,
        e,
        n = Array.from(arguments),
        o = n.slice(-1)[0];
    if ("number" == typeof o ? (t = n, e = {}) : (t = n.slice(n.length - 1), e = o), t.length < 3) throw new Error("You have to specify at least 3 layer sizes, one for each of 1.inputs, 2. hidden, 3. output");
    e = v.defaults(e, {
      memory_to_memory: !1,
      output_to_memory: !1,
      output_to_gates: !1,
      input_to_output: !0,
      input_to_deep: !0
    });
    var r = new h(t.shift());
    r.set({
      type: "input"
    });
    var i = new h(t.pop());
    i.set({
      type: "output"
    }), e.input_to_output && r.connect(i, l.connection.ALL_TO_ALL);
    var a = t,
        s = [],
        u = r;
    v.times(a.length, function (t) {
      var n = a[t],
          o = new h(n),
          c = new h(n),
          p = new h(n),
          f = new h(n),
          d = t === a.length - 1 ? i : new h(n);
      o.set({
        bias: 1
      }), c.set({
        bias: 1
      }), f.set({
        bias: 1
      });
      var g = u.connect(p, l.connection.ALL_TO_ALL);
      u.connect(o, l.connection.ALL_TO_ALL), u.connect(f, l.connection.ALL_TO_ALL), u.connect(c, l.connection.ALL_TO_ALL), p.connect(o, l.connection.ALL_TO_ALL), p.connect(c, l.connection.ALL_TO_ALL), p.connect(f, l.connection.ALL_TO_ALL);

      var v = p.connect(p, l.connection.ONE_TO_ONE),
          _ = p.connect(d, l.connection.ALL_TO_ALL);

      if (o.gate(g, l.gating.INPUT), c.gate(v, l.gating.SELF), f.gate(_, l.gating.OUTPUT), e.input_to_deep && t > 0) {
        var m = r.connect(p, l.connection.ALL_TO_ALL);
        o.gate(m, l.gating.INPUT);
      }

      if (e.memory_to_memory) {
        var w = p.connect(p, l.connection.ALL_TO_ELSE);
        o.gate(w, l.gating.INPUT);
      }

      if (e.output_to_memory) {
        var O = i.connect(p, l.connection.ALL_TO_ALL);
        o.gate(O, l.gating.INPUT);
      }

      e.output_to_gates && (i.connect(o, l.connection.ALL_TO_ALL), i.connect(c, l.connection.ALL_TO_ALL), i.connect(f, l.connection.ALL_TO_ALL)), s.push(o), s.push(c), s.push(p), s.push(f), t !== a.length - 1 && s.push(d), u = d;
    });
    var c = [];
    return c.push(r), v.forEach(s, function (t) {
      return c.push(t);
    }), c.push(i), m.architecture.Construct(c);
  },
  GRU: function () {
    var t = Array.from(arguments);
    if (t.length < 3) throw new Error("You have to specify at least 3 layer sizes");
    var e = new h(t.shift(), "input"),
        n = new h(t.pop(), "output"),
        o = t,
        r = [];
    r.push(e);

    for (var i = e, a = 0; a < o.length; a++) {
      var s = f.GRU(o[a]);
      i.connect(s), i = s, r.push(s);
    }

    return i.connect(n), r.push(n), m.architecture.Construct(r);
  },
  Hopfield: function (t) {
    var e = new h(t, "input"),
        n = new h(t, "output");
    return e.connect(n, l.connection.ALL_TO_ALL), n.set({
      squash: l.activation.STEP
    }), m.architecture.Construct([e, n]);
  },
  NARX: function (t, e, n, o, r) {
    Array.isArray(e) || (e = [e]);

    for (var i = [], a = f.Dense(t), s = f.Memory(t, o), u = [], c = 0; c < e.length; c++) u.push(f.Dense(e[c]));

    var p = f.Dense(n),
        h = f.Memory(n, r);
    a.connect(u[0], l.connection.ALL_TO_ALL), a.connect(s, l.connection.ONE_TO_ONE, 1), i.push(a), s.connect(u[0], l.connection.ALL_TO_ALL), h.connect(u[0], l.connection.ALL_TO_ALL), i.push(s), i.push(h);

    for (var d = 0; d < u.length; d++) d < u.length - 1 ? u[d].connect(u[d + 1], l.connection.ALL_TO_ALL) : u[d].connect(p, l.connection.ALL_TO_ALL), i.push(u[d]);

    return p.connect(h, l.connection.ONE_TO_ONE, 1), i.push(p), a.set({
      type: "input"
    }), p.set({
      type: "output"
    }), m.architecture.Construct(i);
  },
  Liquid: function () {}
}, module.exports = m;

var w = function (e) {
  var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      i = o.generation,
      a = void 0 === i ? 0 : i,
      s = o.input,
      u = void 0 === s ? 1 : s,
      c = o.output,
      p = void 0 === c ? 1 : c,
      h = o.equal,
      f = void 0 === h || h,
      d = o.clean,
      g = void 0 !== d && d,
      _ = o.population_size,
      w = void 0 === _ ? 50 : _,
      O = o.growth,
      A = void 0 === O ? 1e-4 : O,
      N = o.cost,
      E = void 0 === N ? l.cost.MSE : N,
      z = o.amount,
      L = void 0 === z ? 1 : z,
      y = o.elitism,
      b = void 0 === y ? 1 : y,
      S = o.provenance,
      T = void 0 === S ? 0 : S,
      x = o.mutation_rate,
      D = void 0 === x ? .4 : x,
      M = o.mutation_amount,
      C = void 0 === M ? 1 : M,
      P = o.fitness_population,
      I = void 0 !== P && P,
      R = o.fitness,
      k = void 0 === R ? function () {
    for (var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : e, n = arguments.length > 1 ? arguments[1] : void 0, o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1, r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : l.cost.MSE, i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1e-4, a = 0, s = 0; s < o; s++) a -= n.test(t, r).error;

    return a -= (n.nodes.length - n.input - n.output + n.connections.length + n.gates.length) * i, (a = isNaN(a) ? -1 / 0 : a) / o;
  } : R,
      U = o.selection,
      q = void 0 === U ? l.selection.POWER : U,
      j = o.crossover,
      G = void 0 === j ? [l.crossover.SINGLE_POINT, l.crossover.TWO_POINT, l.crossover.UNIFORM, l.crossover.AVERAGE] : j,
      B = o.mutation,
      J = void 0 === B ? l.mutation.FFW : B,
      F = o.efficientMutation,
      W = void 0 !== F && F,
      V = o.template,
      Y = void 0 === V ? new m(u, p) : V,
      H = o.max_nodes,
      K = void 0 === H ? 1 / 0 : H,
      X = o.maxConns,
      Q = void 0 === X ? 1 / 0 : X,
      Z = o.maxGates,
      $ = void 0 === Z ? 1 / 0 : Z,
      tt = this;
  v.assignIn(tt, {
    generation: a,
    input: u,
    output: p,
    equal: f,
    clean: g,
    population_size: w,
    growth: A,
    cost: E,
    amount: L,
    elitism: b,
    provenance: T,
    mutation_rate: D,
    mutation_amount: C,
    fitness_population: I,
    fitness: k,
    selection: q,
    crossover: G,
    mutation: J,
    efficientMutation: W,
    template: Y,
    max_nodes: K,
    maxConns: Q,
    maxGates: $
  }), tt.createPool = function (t, e) {
    return Array(e).fill(m.fromJSON(n({}, t.toJSON(), {
      score: void 0
    })));
  }, tt.population = tt.createPool(tt.template, tt.population_size), tt.filterGenome = function (t, e, n, o) {
    var i = r(t),
        a = function (t) {
      var e = n(t);
      if ("boolean" != typeof e) throw new Error("pickGenome must always return a boolean!");
      return e;
    };

    if (o) {
      for (var s = 0; s < t.length; s++) if (a(i[s])) {
        var u = o(i[s]);
        if (!(u instanceof m)) throw new Error("adjustGenome must always return a network!");
        i[s] = u;
      }
    } else for (var c = 0; c < t.length; c++) a(i[c]) && (i[c] = m.fromJSON(e.toJSON()));

    return i;
  }, tt.mutateRandom = function (e, n) {
    var o = r(n || tt.mutation);
    o = o.filter(function (t) {
      return t !== l.mutation.ADD_NODE || e.nodes.length < tt.maxNodes || t !== l.mutation.ADD_CONN || e.connections.length < tt.maxConns || t !== l.mutation.ADD_GATE || e.gates.length < tt.maxGates;
    });

    var i = function () {
      var t = o[Math.floor(Math.random() * o.length)];
      if (e.mutate(t)) return {
        v: t
      };
      o = o.filter(function (e) {
        return e.name !== t.name;
      });
    };

    do {
      var a = i();
      if ("object" === t(a)) return a.v;
    } while (o && o.length > 0);

    return null;
  }, tt.evolve = function (t, e, n) {
    var o, r, i, a, s, u, c;
    return regeneratorRuntime.async(function (p) {
      for (;;) switch (p.prev = p.next) {
        case 0:
          if (!(tt.elitism + tt.provenance > tt.population_size)) {
            p.next = 2;
            break;
          }

          throw new Error("Can`t evolve! Elitism + provenance exceeds population size!");

        case 2:
          if (t = t || tt.dataset, void 0 !== tt.population[tt.population.length - 1].score) {
            p.next = 6;
            break;
          }

          return p.next = 6, regeneratorRuntime.awrap(tt.evaluate(t));

        case 6:
          for (e && (tt.population = tt.filterGenome(tt.population, tt.template, e, n)), tt.sort(), r = [], i = 0; i < tt.elitism; i++) r.push(tt.population[i]);

          for (a = Array(tt.provenance).fill(m.fromJSON(tt.template.toJSON())), s = 0; s < tt.population_size - tt.elitism - tt.provenance; s++) a.push(tt.getOffspring());

          return tt.population = a, tt.mutate(), (o = tt.population).push.apply(o, r), p.next = 17, regeneratorRuntime.awrap(tt.evaluate(t));

        case 17:
          for (e && (tt.population = tt.filterGenome(tt.population, tt.template, e, n)), tt.sort(), (u = m.fromJSON(tt.population[0].toJSON())).score = tt.population[0].score, c = 0; c < tt.population.length; c++) tt.population[c].score = void 0;

          return tt.generation++, p.abrupt("return", u);

        case 24:
        case "end":
          return p.stop();
      }
    });
  }, tt.getParent = function () {
    switch (tt.selection.name) {
      case "POWER":
        tt.population[0].score < tt.population[1].score && tt.sort();
        var t = Math.floor(Math.pow(Math.random(), tt.selection.power) * tt.population.length);
        return tt.population[t];

      case "FITNESS_PROPORTIONATE":
        for (var e = 0, n = 0, o = 0; o < tt.population.length; o++) {
          var r = tt.population[o].score;
          n = r < n ? r : n, e += r;
        }

        e += (n = Math.abs(n)) * tt.population.length;

        for (var i = Math.random() * e, a = 0, s = 0; s < tt.population.length; s++) {
          var u = tt.population[s];
          if (i < (a += u.score + n)) return u;
        }

        return tt.population[Math.floor(Math.random() * tt.population.length)];

      case "TOURNAMENT":
        if (tt.selection.size > tt.population_size) throw new Error("Your tournament size should be lower than the population size, please change methods.selection.TOURNAMENT.size");

        for (var c = [], p = 0; p < tt.selection.size; p++) {
          var l = tt.population[Math.floor(Math.random() * tt.population.length)];
          c.push(l);
        }

        c.sort(function (t, e) {
          return e.score - t.score;
        });

        for (var h = 0; h < tt.selection.size; h++) if (Math.random() < tt.selection.probability || h === tt.selection.size - 1) return c[h];

    }
  }, tt.getOffspring = function () {
    var t = tt.getParent(),
        e = tt.getParent();
    return m.crossOver(t, e, tt.equal);
  }, tt.mutate = function (t) {
    if (t) {
      for (var e = 0; e < tt.population.length; e++) if (Math.random() <= tt.mutation_rate) for (var n = 0; n < tt.mutation_amount; n++) tt.population[e].mutate(t);
    } else for (var o = 0; o < tt.population.length; o++) if (Math.random() <= tt.mutation_rate) for (var r = 0; r < tt.mutation_amount; r++) tt.mutateRandom(tt.population[o], tt.mutation);
  }, tt.evaluate = function (t) {
    var e, n, o;
    return regeneratorRuntime.async(function (r) {
      for (;;) switch (r.prev = r.next) {
        case 0:
          if (t = t || tt.dataset, !tt.fitness_population) {
            r.next = 7;
            break;
          }

          if (tt.clear) for (e = 0; e < tt.population.length; e++) tt.population[e].clear();
          return r.next = 5, regeneratorRuntime.awrap(tt.fitness(t, tt.population));

        case 5:
          r.next = 18;
          break;

        case 7:
          n = 0;

        case 8:
          if (!(n < tt.population.length)) {
            r.next = 18;
            break;
          }

          return o = tt.population[n], tt.clear && o.clear(), r.next = 13, regeneratorRuntime.awrap(tt.fitness(t, o));

        case 13:
          o.score = r.sent, tt.population[n] = o;

        case 15:
          n++, r.next = 8;
          break;

        case 18:
          return tt.sort(), r.abrupt("return", tt.population[0]);

        case 20:
        case "end":
          return r.stop();
      }
    });
  }, tt.sort = function () {
    tt.population.sort(function (t, e) {
      return e.score - t.score;
    });
  }, tt.getFittest = function () {
    return void 0 === tt.population[tt.population.length - 1].score && tt.evaluate(), tt.population[0].score < tt.population[1].score && tt.sort(), tt.population[0];
  }, tt.getAverage = function () {
    void 0 === tt.population[tt.population.length - 1].score && tt.evaluate();

    for (var t = 0, e = 0; e < tt.population.length; e++) t += tt.population[e].score;

    return t / tt.population.length;
  }, tt.toJSON = function () {
    for (var t = [], e = 0; e < tt.population.length; e++) t.push(tt.population[e].toJSON());

    return t;
  }, tt.fromJSON = function (t) {
    for (var e = [], n = 0; n < t.length; n++) e.push(m.fromJSON(t[n]));

    tt.population = e, tt.population_size = e.length;
  };
};

// ASSET: ../node_modules/object-assign/index.js
var $J4Nk$exports = {};
var $J4Nk$var$getOwnPropertySymbols = Object.getOwnPropertySymbols;
var $J4Nk$var$hasOwnProperty = Object.prototype.hasOwnProperty;
var $J4Nk$var$propIsEnumerable = Object.prototype.propertyIsEnumerable;

function $J4Nk$var$toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function $J4Nk$var$shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

$J4Nk$exports = $J4Nk$var$shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = $J4Nk$var$toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if ($J4Nk$var$hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if ($J4Nk$var$getOwnPropertySymbols) {
      symbols = $J4Nk$var$getOwnPropertySymbols(from);

      for (var i = 0; i < symbols.length; i++) {
        if ($J4Nk$var$propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};
// ASSET: ../node_modules/assert/node_modules/util/support/isBufferBrowser.js
var $rd3l$exports = {};

$rd3l$exports = function isBuffer(arg) {
  return arg && typeof arg === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.readUInt8 === 'function';
};

// ASSET: ../node_modules/assert/node_modules/inherits/inherits_browser.js
var $fCKU$exports = {};

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  $fCKU$exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  $fCKU$exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;

    var TempCtor = function () {};

    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  };
}

// ASSET: ../node_modules/assert/node_modules/util/util.js
var $XOAc$exports = {};
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var $XOAc$var$formatRegExp = /%[sdj%]/g;

var $XOAc$export$format = function (f) {
  if (!$XOAc$var$isString(f)) {
    var objects = [];

    for (var i = 0; i < arguments.length; i++) {
      objects.push($XOAc$var$inspect(arguments[i]));
    }

    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace($XOAc$var$formatRegExp, function (x) {
    if (x === '%%') return '%';
    if (i >= len) return x;

    switch (x) {
      case '%s':
        return String(args[i++]);

      case '%d':
        return Number(args[i++]);

      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }

      default:
        return x;
    }
  });

  for (var x = args[i]; i < len; x = args[++i]) {
    if ($XOAc$var$isNull(x) || !$XOAc$var$isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + $XOAc$var$inspect(x);
    }
  }

  return str;
};

$XOAc$exports.format = $XOAc$export$format; // Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.

var $XOAc$export$deprecate = function (fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if ($XOAc$var$isUndefined($parcel$global.process)) {
    return function () {
      return $XOAc$export$deprecate(fn, msg).apply(this, arguments);
    };
  }

  if ($pBGv$exports.noDeprecation === true) {
    return fn;
  }

  var warned = false;

  function deprecated() {
    if (!warned) {
      if ($pBGv$exports.throwDeprecation) {
        throw new Error(msg);
      } else if ($pBGv$exports.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }

      warned = true;
    }

    return fn.apply(this, arguments);
  }

  return deprecated;
};

$XOAc$exports.deprecate = $XOAc$export$deprecate;
var $XOAc$var$debugs = {};
var $XOAc$var$debugEnviron;

var $XOAc$export$debuglog = function (set) {
  if ($XOAc$var$isUndefined($XOAc$var$debugEnviron)) $XOAc$var$debugEnviron = undefined || '';
  set = set.toUpperCase();

  if (!$XOAc$var$debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test($XOAc$var$debugEnviron)) {
      var pid = $pBGv$exports.pid;

      $XOAc$var$debugs[set] = function () {
        var msg = $XOAc$export$format.apply($XOAc$exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      $XOAc$var$debugs[set] = function () {};
    }
  }

  return $XOAc$var$debugs[set];
};

$XOAc$exports.debuglog = $XOAc$export$debuglog;
/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */

/* legacy: obj, showHidden, depth, colors*/

function $XOAc$var$inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: $XOAc$var$stylizeNoColor
  }; // legacy...

  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];

  if ($XOAc$var$isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    $XOAc$export$_extend(ctx, opts);
  } // set default options


  if ($XOAc$var$isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if ($XOAc$var$isUndefined(ctx.depth)) ctx.depth = 2;
  if ($XOAc$var$isUndefined(ctx.colors)) ctx.colors = false;
  if ($XOAc$var$isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = $XOAc$var$stylizeWithColor;
  return $XOAc$var$formatValue(ctx, obj, ctx.depth);
}

var $XOAc$export$inspect = $XOAc$var$inspect;
$XOAc$exports.inspect = $XOAc$export$inspect; // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics

$XOAc$var$inspect.colors = {
  'bold': [1, 22],
  'italic': [3, 23],
  'underline': [4, 24],
  'inverse': [7, 27],
  'white': [37, 39],
  'grey': [90, 39],
  'black': [30, 39],
  'blue': [34, 39],
  'cyan': [36, 39],
  'green': [32, 39],
  'magenta': [35, 39],
  'red': [31, 39],
  'yellow': [33, 39]
}; // Don't use 'blue' not visible on cmd.exe

$XOAc$var$inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};

function $XOAc$var$stylizeWithColor(str, styleType) {
  var style = $XOAc$var$inspect.styles[styleType];

  if (style) {
    return '\u001b[' + $XOAc$var$inspect.colors[style][0] + 'm' + str + '\u001b[' + $XOAc$var$inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}

function $XOAc$var$stylizeNoColor(str, styleType) {
  return str;
}

function $XOAc$var$arrayToHash(array) {
  var hash = {};
  array.forEach(function (val, idx) {
    hash[val] = true;
  });
  return hash;
}

function $XOAc$var$formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect && value && $XOAc$var$isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
  value.inspect !== $XOAc$export$inspect && // Also filter out any prototype objects using the circular check.
  !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);

    if (!$XOAc$var$isString(ret)) {
      ret = $XOAc$var$formatValue(ctx, ret, recurseTimes);
    }

    return ret;
  } // Primitive types cannot have properties


  var primitive = $XOAc$var$formatPrimitive(ctx, value);

  if (primitive) {
    return primitive;
  } // Look up the keys of the object.


  var keys = Object.keys(value);
  var visibleKeys = $XOAc$var$arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  } // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx


  if ($XOAc$var$isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return $XOAc$var$formatError(value);
  } // Some type of object without properties can be shortcutted.


  if (keys.length === 0) {
    if ($XOAc$var$isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }

    if ($XOAc$var$isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }

    if ($XOAc$var$isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }

    if ($XOAc$var$isError(value)) {
      return $XOAc$var$formatError(value);
    }
  }

  var base = '',
      array = false,
      braces = ['{', '}']; // Make Array say that they are Array

  if ($XOAc$var$isArray(value)) {
    array = true;
    braces = ['[', ']'];
  } // Make functions say that they are functions


  if ($XOAc$var$isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  } // Make RegExps say that they are RegExps


  if ($XOAc$var$isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  } // Make dates with properties first say the date


  if ($XOAc$var$isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  } // Make error with message first say the error


  if ($XOAc$var$isError(value)) {
    base = ' ' + $XOAc$var$formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if ($XOAc$var$isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);
  var output;

  if (array) {
    output = $XOAc$var$formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function (key) {
      return $XOAc$var$formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();
  return $XOAc$var$reduceToSingleString(output, base, braces);
}

function $XOAc$var$formatPrimitive(ctx, value) {
  if ($XOAc$var$isUndefined(value)) return ctx.stylize('undefined', 'undefined');

  if ($XOAc$var$isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }

  if ($XOAc$var$isNumber(value)) return ctx.stylize('' + value, 'number');
  if ($XOAc$var$isBoolean(value)) return ctx.stylize('' + value, 'boolean'); // For some reason typeof null is "object", so special case here.

  if ($XOAc$var$isNull(value)) return ctx.stylize('null', 'null');
}

function $XOAc$var$formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}

function $XOAc$var$formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];

  for (var i = 0, l = value.length; i < l; ++i) {
    if ($XOAc$var$hasOwnProperty(value, String(i))) {
      output.push($XOAc$var$formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
    } else {
      output.push('');
    }
  }

  keys.forEach(function (key) {
    if (!key.match(/^\d+$/)) {
      output.push($XOAc$var$formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
    }
  });
  return output;
}

function $XOAc$var$formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || {
    value: value[key]
  };

  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }

  if (!$XOAc$var$hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }

  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if ($XOAc$var$isNull(recurseTimes)) {
        str = $XOAc$var$formatValue(ctx, desc.value, null);
      } else {
        str = $XOAc$var$formatValue(ctx, desc.value, recurseTimes - 1);
      }

      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function (line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function (line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }

  if ($XOAc$var$isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }

    name = JSON.stringify('' + key);

    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}

function $XOAc$var$reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function (prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
} // NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.


function $XOAc$var$isArray(ar) {
  return Array.isArray(ar);
}

var $XOAc$export$isArray = $XOAc$var$isArray;
$XOAc$exports.isArray = $XOAc$export$isArray;

function $XOAc$var$isBoolean(arg) {
  return typeof arg === 'boolean';
}

var $XOAc$export$isBoolean = $XOAc$var$isBoolean;
$XOAc$exports.isBoolean = $XOAc$export$isBoolean;

function $XOAc$var$isNull(arg) {
  return arg === null;
}

var $XOAc$export$isNull = $XOAc$var$isNull;
$XOAc$exports.isNull = $XOAc$export$isNull;

function $XOAc$var$isNullOrUndefined(arg) {
  return arg == null;
}

var $XOAc$export$isNullOrUndefined = $XOAc$var$isNullOrUndefined;
$XOAc$exports.isNullOrUndefined = $XOAc$export$isNullOrUndefined;

function $XOAc$var$isNumber(arg) {
  return typeof arg === 'number';
}

var $XOAc$export$isNumber = $XOAc$var$isNumber;
$XOAc$exports.isNumber = $XOAc$export$isNumber;

function $XOAc$var$isString(arg) {
  return typeof arg === 'string';
}

var $XOAc$export$isString = $XOAc$var$isString;
$XOAc$exports.isString = $XOAc$export$isString;

function $XOAc$var$isSymbol(arg) {
  return typeof arg === 'symbol';
}

var $XOAc$export$isSymbol = $XOAc$var$isSymbol;
$XOAc$exports.isSymbol = $XOAc$export$isSymbol;

function $XOAc$var$isUndefined(arg) {
  return arg === void 0;
}

var $XOAc$export$isUndefined = $XOAc$var$isUndefined;
$XOAc$exports.isUndefined = $XOAc$export$isUndefined;

function $XOAc$var$isRegExp(re) {
  return $XOAc$var$isObject(re) && $XOAc$var$objectToString(re) === '[object RegExp]';
}

var $XOAc$export$isRegExp = $XOAc$var$isRegExp;
$XOAc$exports.isRegExp = $XOAc$export$isRegExp;

function $XOAc$var$isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

var $XOAc$export$isObject = $XOAc$var$isObject;
$XOAc$exports.isObject = $XOAc$export$isObject;

function $XOAc$var$isDate(d) {
  return $XOAc$var$isObject(d) && $XOAc$var$objectToString(d) === '[object Date]';
}

var $XOAc$export$isDate = $XOAc$var$isDate;
$XOAc$exports.isDate = $XOAc$export$isDate;

function $XOAc$var$isError(e) {
  return $XOAc$var$isObject(e) && ($XOAc$var$objectToString(e) === '[object Error]' || e instanceof Error);
}

var $XOAc$export$isError = $XOAc$var$isError;
$XOAc$exports.isError = $XOAc$export$isError;

function $XOAc$var$isFunction(arg) {
  return typeof arg === 'function';
}

var $XOAc$export$isFunction = $XOAc$var$isFunction;
$XOAc$exports.isFunction = $XOAc$export$isFunction;

function $XOAc$var$isPrimitive(arg) {
  return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || typeof arg === 'symbol' || // ES6 symbol
  typeof arg === 'undefined';
}

var $XOAc$export$isPrimitive = $XOAc$var$isPrimitive;
$XOAc$exports.isPrimitive = $XOAc$export$isPrimitive;
$XOAc$exports.isBuffer = $rd3l$exports;

function $XOAc$var$objectToString(o) {
  return Object.prototype.toString.call(o);
}

function $XOAc$var$pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}

var $XOAc$var$months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; // 26 Feb 16:19:34

function $XOAc$var$timestamp() {
  var d = new Date();
  var time = [$XOAc$var$pad(d.getHours()), $XOAc$var$pad(d.getMinutes()), $XOAc$var$pad(d.getSeconds())].join(':');
  return [d.getDate(), $XOAc$var$months[d.getMonth()], time].join(' ');
} // log is just a thin wrapper to console.log that prepends a timestamp


var $XOAc$export$log = function () {
  console.log('%s - %s', $XOAc$var$timestamp(), $XOAc$export$format.apply($XOAc$exports, arguments));
};

$XOAc$exports.log = $XOAc$export$log;
/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */

$XOAc$exports.inherits = $fCKU$exports;

var $XOAc$export$_extend = function (origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !$XOAc$var$isObject(add)) return origin;
  var keys = Object.keys(add);
  var i = keys.length;

  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }

  return origin;
};

$XOAc$exports._extend = $XOAc$export$_extend;

function $XOAc$var$hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function $DlZn$var$compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }

  if (y < x) {
    return 1;
  }

  return 0;
}

function $DlZn$var$isBuffer(b) {
  if ($parcel$global.Buffer && typeof $parcel$global.Buffer.isBuffer === 'function') {
    return $parcel$global.Buffer.isBuffer(b);
  }

  return !!(b != null && b._isBuffer);
} // based on node assert, original notice:
// NB: The URL to the CommonJS spec is kept just for tradition.
//     node-assert has evolved a lot since then, both in API and behavior.
// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


var $DlZn$var$hasOwn = Object.prototype.hasOwnProperty;
var $DlZn$var$pSlice = Array.prototype.slice;

var $DlZn$var$functionsHaveNames = function () {
  return function foo() {}.name === 'foo';
}();

function $DlZn$var$pToString(obj) {
  return Object.prototype.toString.call(obj);
}

function $DlZn$var$isView(arrbuf) {
  if ($DlZn$var$isBuffer(arrbuf)) {
    return false;
  }

  if (typeof $parcel$global.ArrayBuffer !== 'function') {
    return false;
  }

  if (typeof ArrayBuffer.isView === 'function') {
    return ArrayBuffer.isView(arrbuf);
  }

  if (!arrbuf) {
    return false;
  }

  if (arrbuf instanceof DataView) {
    return true;
  }

  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }

  return false;
} // 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.


var $DlZn$var$assert = $DlZn$var$ok; // 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

var $DlZn$var$regex = /\s*function\s+([^\(\s]*)\s*/; // based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js

function $DlZn$var$getName(func) {
  if (!$XOAc$export$isFunction(func)) {
    return;
  }

  if ($DlZn$var$functionsHaveNames) {
    return func.name;
  }

  var str = func.toString();
  var match = str.match($DlZn$var$regex);
  return match && match[1];
}

$DlZn$var$assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;

  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = $DlZn$var$getMessage(this);
    this.generatedMessage = true;
  }

  var stackStartFunction = options.stackStartFunction || $DlZn$var$fail;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();

    if (err.stack) {
      var out = err.stack; // try to strip useless frames

      var fn_name = $DlZn$var$getName(stackStartFunction);
      var idx = out.indexOf('\n' + fn_name);

      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
}; // assert.AssertionError instanceof Error


$fCKU$exports($DlZn$var$assert.AssertionError, Error);

function $DlZn$var$truncate(s, n) {
  if (typeof s === 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}

function $DlZn$var$inspect(something) {
  if ($DlZn$var$functionsHaveNames || !$XOAc$export$isFunction(something)) {
    return $XOAc$export$inspect(something);
  }

  var rawname = $DlZn$var$getName(something);
  var name = rawname ? ': ' + rawname : '';
  return '[Function' + name + ']';
}

function $DlZn$var$getMessage(self) {
  return $DlZn$var$truncate($DlZn$var$inspect(self.actual), 128) + ' ' + self.operator + ' ' + $DlZn$var$truncate($DlZn$var$inspect(self.expected), 128);
} // At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.
// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.


function $DlZn$var$fail(actual, expected, message, operator, stackStartFunction) {
  throw new $DlZn$var$assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
} // EXTENSION! allows for well behaved errors defined elsewhere.


$DlZn$var$assert.fail = $DlZn$var$fail; // 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function $DlZn$var$ok(value, message) {
  if (!value) $DlZn$var$fail(value, true, message, '==', $DlZn$var$assert.ok);
}

$DlZn$var$assert.ok = $DlZn$var$ok; // 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

$DlZn$var$assert.equal = function equal(actual, expected, message) {
  if (actual != expected) $DlZn$var$fail(actual, expected, message, '==', $DlZn$var$assert.equal);
}; // 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);


$DlZn$var$assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    $DlZn$var$fail(actual, expected, message, '!=', $DlZn$var$assert.notEqual);
  }
}; // 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);


$DlZn$var$assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!$DlZn$var$_deepEqual(actual, expected, false)) {
    $DlZn$var$fail(actual, expected, message, 'deepEqual', $DlZn$var$assert.deepEqual);
  }
};

$DlZn$var$assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (!$DlZn$var$_deepEqual(actual, expected, true)) {
    $DlZn$var$fail(actual, expected, message, 'deepStrictEqual', $DlZn$var$assert.deepStrictEqual);
  }
};

function $DlZn$var$_deepEqual(actual, expected, strict, memos) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if ($DlZn$var$isBuffer(actual) && $DlZn$var$isBuffer(expected)) {
    return $DlZn$var$compare(actual, expected) === 0; // 7.2. If the expected value is a Date object, the actual value is
    // equivalent if it is also a Date object that refers to the same time.
  } else if ($XOAc$export$isDate(actual) && $XOAc$export$isDate(expected)) {
    return actual.getTime() === expected.getTime(); // 7.3 If the expected value is a RegExp object, the actual value is
    // equivalent if it is also a RegExp object with the same source and
    // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if ($XOAc$export$isRegExp(actual) && $XOAc$export$isRegExp(expected)) {
    return actual.source === expected.source && actual.global === expected.global && actual.multiline === expected.multiline && actual.lastIndex === expected.lastIndex && actual.ignoreCase === expected.ignoreCase; // 7.4. Other pairs that do not both pass typeof value == 'object',
    // equivalence is determined by ==.
  } else if ((actual === null || typeof actual !== 'object') && (expected === null || typeof expected !== 'object')) {
    return strict ? actual === expected : actual == expected; // If both values are instances of typed arrays, wrap their underlying
    // ArrayBuffers in a Buffer each to increase performance
    // This optimization requires the arrays to have the same type as checked by
    // Object.prototype.toString (aka pToString). Never perform binary
    // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
    // bit patterns are not identical.
  } else if ($DlZn$var$isView(actual) && $DlZn$var$isView(expected) && $DlZn$var$pToString(actual) === $DlZn$var$pToString(expected) && !(actual instanceof Float32Array || actual instanceof Float64Array)) {
    return $DlZn$var$compare(new Uint8Array(actual.buffer), new Uint8Array(expected.buffer)) === 0; // 7.5 For all other Object pairs, including Array objects, equivalence is
    // determined by having the same number of owned properties (as verified
    // with Object.prototype.hasOwnProperty.call), the same set of keys
    // (although not necessarily the same order), equivalent values for every
    // corresponding key, and an identical 'prototype' property. Note: this
    // accounts for both named and indexed properties on Arrays.
  } else if ($DlZn$var$isBuffer(actual) !== $DlZn$var$isBuffer(expected)) {
    return false;
  } else {
    memos = memos || {
      actual: [],
      expected: []
    };
    var actualIndex = memos.actual.indexOf(actual);

    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }

    memos.actual.push(actual);
    memos.expected.push(expected);
    return $DlZn$var$objEquiv(actual, expected, strict, memos);
  }
}

function $DlZn$var$isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function $DlZn$var$objEquiv(a, b, strict, actualVisitedObjects) {
  if (a === null || a === undefined || b === null || b === undefined) return false; // if one is a primitive, the other must be same

  if ($XOAc$export$isPrimitive(a) || $XOAc$export$isPrimitive(b)) return a === b;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false;
  var aIsArgs = $DlZn$var$isArguments(a);
  var bIsArgs = $DlZn$var$isArguments(b);
  if (aIsArgs && !bIsArgs || !aIsArgs && bIsArgs) return false;

  if (aIsArgs) {
    a = $DlZn$var$pSlice.call(a);
    b = $DlZn$var$pSlice.call(b);
    return $DlZn$var$_deepEqual(a, b, strict);
  }

  var ka = $DlZn$var$objectKeys(a);
  var kb = $DlZn$var$objectKeys(b);
  var key, i; // having the same number of owned properties (keys incorporates
  // hasOwnProperty)

  if (ka.length !== kb.length) return false; //the same set of keys (although not necessarily the same order),

  ka.sort();
  kb.sort(); //~~~cheap key test

  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i]) return false;
  } //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test


  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!$DlZn$var$_deepEqual(a[key], b[key], strict, actualVisitedObjects)) return false;
  }

  return true;
} // 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);


$DlZn$var$assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if ($DlZn$var$_deepEqual(actual, expected, false)) {
    $DlZn$var$fail(actual, expected, message, 'notDeepEqual', $DlZn$var$assert.notDeepEqual);
  }
};

$DlZn$var$assert.notDeepStrictEqual = $DlZn$var$notDeepStrictEqual;

function $DlZn$var$notDeepStrictEqual(actual, expected, message) {
  if ($DlZn$var$_deepEqual(actual, expected, true)) {
    $DlZn$var$fail(actual, expected, message, 'notDeepStrictEqual', $DlZn$var$notDeepStrictEqual);
  }
} // 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);


$DlZn$var$assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    $DlZn$var$fail(actual, expected, message, '===', $DlZn$var$assert.strictEqual);
  }
}; // 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);


$DlZn$var$assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    $DlZn$var$fail(actual, expected, message, '!==', $DlZn$var$assert.notStrictEqual);
  }
};

function $DlZn$var$expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  }

  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {// Ignore.  The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function $DlZn$var$_tryBlock(block) {
  var error;

  try {
    block();
  } catch (e) {
    error = e;
  }

  return error;
}

function $DlZn$var$_throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof block !== 'function') {
    throw new TypeError('"block" argument must be a function');
  }

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  actual = $DlZn$var$_tryBlock(block);
  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') + (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    $DlZn$var$fail(actual, expected, 'Missing expected exception' + message);
  }

  var userProvidedMessage = typeof message === 'string';
  var isUnwantedException = !shouldThrow && $XOAc$export$isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;

  if (isUnwantedException && userProvidedMessage && $DlZn$var$expectedException(actual, expected) || isUnexpectedException) {
    $DlZn$var$fail(actual, expected, 'Got unwanted exception' + message);
  }

  if (shouldThrow && actual && expected && !$DlZn$var$expectedException(actual, expected) || !shouldThrow && actual) {
    throw actual;
  }
} // 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);


$DlZn$var$assert.throws = function (block,
/*optional*/
error,
/*optional*/
message) {
  $DlZn$var$_throws(true, block, error, message);
}; // EXTENSION! This is annoying to write outside this module.


$DlZn$var$assert.doesNotThrow = function (block,
/*optional*/
error,
/*optional*/
message) {
  $DlZn$var$_throws(false, block, error, message);
};

$DlZn$var$assert.ifError = function (err) {
  if (err) throw err;
}; // Expose a strict only variant of assert


function $DlZn$var$strict(value, message) {
  if (!value) $DlZn$var$fail(value, true, message, '==', $DlZn$var$strict);
}

$DlZn$var$assert.strict = $J4Nk$exports($DlZn$var$strict, $DlZn$var$assert, {
  equal: $DlZn$var$assert.strictEqual,
  deepEqual: $DlZn$var$assert.deepStrictEqual,
  notEqual: $DlZn$var$assert.notStrictEqual,
  notDeepEqual: $DlZn$var$assert.notDeepStrictEqual
});
$DlZn$var$assert.strict.strict = $DlZn$var$assert.strict;

var $DlZn$var$objectKeys = Object.keys || function (obj) {
  var keys = [];

  for (var key in obj) {
    if ($DlZn$var$hasOwn.call(obj, key)) keys.push(key);
  }

  return keys;
};

// ASSET: architecture/architect.js
var n = require("../methods/methods"),
    t = require("./network"),
    e = require("./group"),
    o = require("./layer"),
    c = require("./node"),
    u = require("lodash"),
    i = require("assert"),
    r = {
  Construct: function (n) {
    var i,
        r,
        s = new t(0, 0),
        a = [];

    for (i = 0; i < n.length; i++) if (n[i] instanceof e || n[i] instanceof o) for (r = 0; r < n[i].nodes.length; r++) a.push(n[i].nodes[r]), 0 === i ? s.input_nodes.add(n[i].nodes[r]) : i === n.length - 1 && s.output_nodes.add(n[i].nodes[r]);else n[i] instanceof c && a.push(n[i]);

    var L = u.reduce(a, function (n, t) {
      return n + ("output" === t.type);
    }, 0),
        p = u.reduce(a, function (n, t) {
      return n + ("input" === t.type);
    }, 0),
        _ = [],
        h = [];

    for (i = a.length - 1; i >= 0; i--) "output" === a[i].type || !L && a[i].outgoing.length + a[i].gated.length === 0 ? (a[i].type = "output", s.output_size++, h.push(a[i]), a.splice(i, 1)) : "input" !== a[i].type && (p || a[i].incoming.length) || (a[i].type = "input", s.input_size++, _.push(a[i]), a.splice(i, 1));

    if (s.input = s.input_size, s.output = s.output_size, a = _.concat(a).concat(h), 0 === s.input_size || 0 === s.output_size) throw new Error("Given nodes have no clear input/output node!");

    for (i = 0; i < a.length; i++) {
      for (r = 0; r < a[i].gated.length; r++) s.gates.push(a[i].gated[r]);

      0 !== a[i].connections_self.weight && s.connections.push(a[i].connections_self);
    }

    return s.addNodes(a), s;
  },
  Perceptron: function () {
    var t = Array.from(arguments);
    if (t.length < 3) throw new Error("You have to specify at least 3 layers");
    var o = [new e(t[0])];
    return u.times(t.length - 1, function (c) {
      var u = new e(t[c + 1]);
      o.push(u), o[c].connect(o[c + 1], n.connection.ALL_TO_ALL);
    }), r.Construct(o);
  },
  Random: function (e, o, c, i) {
    i ? !i && u.isPlainObject(c) && (i = c, c = o, o = void 0) : (c = o, o = void 0), o = o || 0, i = u.defaults(i, {
      connections: 2 * o,
      backconnections: 0,
      selfconnections: 0,
      gates: 0
    });
    var r = new t(e, c);
    return u.times(o, function () {
      return r.mutate(n.mutation.ADD_NODE);
    }), u.times(i.connections - o, function () {
      return r.mutate(n.mutation.ADD_CONN);
    }), u.times(i.backconnections, function () {
      return r.mutate(n.mutation.ADD_BACK_CONN);
    }), u.times(i.selfconnections, function () {
      return r.mutate(n.mutation.ADD_SELF_CONN);
    }), u.times(i.gates, function () {
      return r.mutate(n.mutation.ADD_GATE);
    }), r;
  },
  LSTM: function () {
    var t,
        o,
        c = Array.from(arguments),
        i = c.slice(-1)[0];
    if ("number" == typeof i ? (t = c, o = {}) : (t = c.slice(c.length - 1), o = i), t.length < 3) throw new Error("You have to specify at least 3 layer sizes, one for each of 1.inputs, 2. hidden, 3. output");
    o = u.defaults(o, {
      memory_to_memory: !1,
      output_to_memory: !1,
      output_to_gates: !1,
      input_to_output: !0,
      input_to_deep: !0
    });
    var s = new e(t.shift());
    s.set({
      type: "input"
    });
    var a = new e(t.pop());
    a.set({
      type: "output"
    }), o.input_to_output && s.connect(a, n.connection.ALL_TO_ALL);
    var L = t,
        p = [],
        _ = s;
    u.times(L.length, function (t) {
      var c = L[t],
          u = new e(c),
          i = new e(c),
          r = new e(c),
          h = new e(c),
          f = t === L.length - 1 ? a : new e(c);
      u.set({
        bias: 1
      }), i.set({
        bias: 1
      }), h.set({
        bias: 1
      });

      var A = _.connect(r, n.connection.ALL_TO_ALL);

      _.connect(u, n.connection.ALL_TO_ALL), _.connect(h, n.connection.ALL_TO_ALL), _.connect(i, n.connection.ALL_TO_ALL), r.connect(u, n.connection.ALL_TO_ALL), r.connect(i, n.connection.ALL_TO_ALL), r.connect(h, n.connection.ALL_TO_ALL);
      var g = r.connect(r, n.connection.ONE_TO_ONE),
          l = r.connect(f, n.connection.ALL_TO_ALL);

      if (u.gate(A, n.gating.INPUT), i.gate(g, n.gating.SELF), h.gate(l, n.gating.OUTPUT), o.input_to_deep && t > 0) {
        var m = s.connect(r, n.connection.ALL_TO_ALL);
        u.gate(m, n.gating.INPUT);
      }

      if (o.memory_to_memory) {
        var O = r.connect(r, n.connection.ALL_TO_ELSE);
        u.gate(O, n.gating.INPUT);
      }

      if (o.output_to_memory) {
        var d = a.connect(r, n.connection.ALL_TO_ALL);
        u.gate(d, n.gating.INPUT);
      }

      o.output_to_gates && (a.connect(u, n.connection.ALL_TO_ALL), a.connect(i, n.connection.ALL_TO_ALL), a.connect(h, n.connection.ALL_TO_ALL)), p.push(u), p.push(i), p.push(r), p.push(h), t !== L.length - 1 && p.push(f), _ = f;
    });
    var h = [];
    return h.push(s), u.forEach(p, function (n) {
      return h.push(n);
    }), h.push(a), r.Construct(h);
  },
  GRU: function () {
    var n = Array.from(arguments);
    if (n.length < 3) throw new Error("You have to specify at least 3 layer sizes");
    var t = new e(n.shift(), "input"),
        c = new e(n.pop(), "output"),
        u = n,
        i = [];
    i.push(t);

    for (var s = t, a = 0; a < u.length; a++) {
      var L = o.GRU(u[a]);
      s.connect(L), s = L, i.push(L);
    }

    return s.connect(c), i.push(c), r.Construct(i);
  },
  Hopfield: function (t) {
    var o = new e(t, "input"),
        c = new e(t, "output");
    return o.connect(c, n.connection.ALL_TO_ALL), c.set({
      squash: n.activation.STEP
    }), new r.Construct([o, c]);
  },
  NARX: function (t, e, c, u, i) {
    Array.isArray(e) || (e = [e]);

    for (var s = [], a = o.Dense(t), L = o.Memory(t, u), p = [], _ = 0; _ < e.length; _++) p.push(o.Dense(e[_]));

    var h = o.Dense(c),
        f = o.Memory(c, i);
    a.connect(p[0], n.connection.ALL_TO_ALL), a.connect(L, n.connection.ONE_TO_ONE, 1), s.push(a), L.connect(p[0], n.connection.ALL_TO_ALL), f.connect(p[0], n.connection.ALL_TO_ALL), s.push(L), s.push(f);

    for (var A = 0; A < p.length; A++) A < p.length - 1 ? p[A].connect(p[A + 1], n.connection.ALL_TO_ALL) : p[A].connect(h, n.connection.ALL_TO_ALL), s.push(p[A]);

    return h.connect(f, n.connection.ONE_TO_ONE, 1), s.push(h), a.set({
      type: "input"
    }), h.set({
      type: "output"
    }), r.Construct(s);
  },
  Liquid: function () {}
};

module.exports = r;

// ASSET: neat.js
function e(e, t) {
  var o = Object.keys(e);

  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), o.push.apply(o, n);
  }

  return o;
}

function o(t) {
  for (var o = 1; o < arguments.length; o++) {
    var r = null != arguments[o] ? arguments[o] : {};
    o % 2 ? e(Object(r), !0).forEach(function (e) {
      n(t, e, r[e]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : e(Object(r)).forEach(function (e) {
      Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e));
    });
  }

  return t;
}

function n(e, t, o) {
  return t in e ? Object.defineProperty(e, t, {
    value: o,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = o, e;
}

var r = require("lodash"),
    a = require("./architecture/network"),
    i = require("./methods/methods"),
    u = require("./config"),
    p = function e(n, i, u, p) {
  var s = this;
  i || u || p ? !u && !p && Array.isArray(n) && r.isPlainObject(i) ? (u = n, p = i, n = i = void 0) : !p && r.isInteger(n) && r.isInteger(i) && r.isPlainObject(u) && (p = u, u = void 0) : (r.isPlainObject(n) ? p = n : Array.isArray(n) && (u = n), n = void 0), n = n || 1, i = i || 1, u = u || [], p = r.defaultsDeep(p, e.default.options), Object.assign(s, o({
    inputs: n,
    outputs: i,
    dataset: u
  }, p)), s.createPool = function (e, t) {
    for (var n = [], r = 0; r < t; r++) n.push(a.fromJSON(o({}, e.toJSON(), {
      score: void 0
    })));

    return n;
  }, s.createPopulation = function (e, t) {
    !t && Number.isInteger(e) && (t = e, e = void 0), t = t || s.population_size, copyNetwork = e ? function () {
      return e.clone();
    } : s.template ? function () {
      return s.template.clone();
    } : function () {
      return new a(s.inputs, s.outputs);
    };

    for (var o = [], n = 0; n < t; n++) o.push(copyNetwork());

    return o;
  }, s.population = s.population || s.createPopulation(s.template, s.population_size), s.replace = function (e, o, n) {
    if (null == e && null == o && null == n) throw new ReferenceError("Missing required parameter 'transform'");

    function r(e) {
      return e instanceof a ? function () {
        return e;
      } : "function" == typeof e ? e : new TypeError("Expected ".concat(e, " to be a {Network|Function}"));
    }

    function i(e) {
      return Number.isFinite(e) ? function (t, o, n) {
        return o === e;
      } : e instanceof a ? function (t, o, n) {
        return t === e;
      } : "function" == typeof e ? e : null == e ? function () {
        return !0;
      } : new TypeError("Expected ".concat(t, " to be a {Number|Network|Function|undefined}"));
    }

    null == o && null == n ? (n = r(e), o = i(), e = s.population) : null == n ? (n = r(o), o = i(e), e = s.population) : (n = r(n), o = i(o), e = e || s.population);

    for (var u = [], p = 0; p < e.length; p++) o(e[p], p, e) ? u[p] = n(e[p], p, e) : u.push(e[p]);

    return u;
  }, s.resize = function (e) {
    if ("number" == typeof e || "string" == typeof e && +e == +e) {
      var t = e - s.population.length;
      if (t > 0) for (1 === s.population.length && (s.population.push(s.population[0].clone()), t--); t-- > 0;) s.population.push(s.getOffspring());else for (; t++ < 0;) s.population.pop();
    } else {
      if (!Array.isArray(e) || !e.length) throw new Error("Neat.resize needs a number or an array of new population members!");

      for (var o = 0; o < e.length; o++) s.population.push(e[o]);
    }

    return s.population_size = s.population.length, s.population;
  }, s.mutate = function (e) {
    var t = {
      maxNodes: s.maxNodes,
      maxConns: s.maxConns,
      maxGates: s.maxGates
    },
        o = e ? function (e, t, o) {
      return e.mutate(t, o);
    } : function (e, t, o) {
      return e.mutateRandom(t, o);
    };
    e = e || s.mutation;

    for (var n = [], r = 0; r < s.population.length; r++) if (Math.random() <= s.mutation_rate) for (var a = 0; a < s.mutation_amount; a++) n.push(o(s.population[r], e, t));

    return n;
  }, s.evolve = function (e, t, o) {
    var n, a, i, u, p, l, c, f, h, g, m;
    return regeneratorRuntime.async(function (v) {
      for (;;) switch (v.prev = v.next) {
        case 0:
          if (!(s.elitism + s.provenance > s.population_size)) {
            v.next = 2;
            break;
          }

          throw new Error("Can't evolve! Elitism + provenance exceeds population size!");

        case 2:
          if ("function" == typeof e && (adjustGenome = t, t = e, e = void 0), a = (n = function (e) {
            return Array.isArray(e) && e.length;
          })(e) ? e : n(s.dataset) ? s.dataset : null, i = s.population, u = r.every(i, function (e) {
            return "number" == typeof e.score || "string" == typeof e.score && +e.score == +e.score;
          }), !a || u) {
            v.next = 12;
            break;
          }

          return v.next = 10, regeneratorRuntime.awrap(s.evaluate(a));

        case 10:
          v.next = 14;
          break;

        case 12:
          if (u) {
            v.next = 14;
            break;
          }

          throw new Error("If no dataset is passed, all networks in population must have numeric '.score' properties!");

        case 14:
          for (t && (i = s.replace(i, t, o)), s.sort(i), p = [], l = 0; l < s.elitism; l++) p.push(i[l].clone());

          for (c = [], f = 0; f < s.provenance; f++) c.push(s.template.clone());

          for (h = 0; h < s.population_size - s.elitism - s.provenance; h++) c.push(s.getOffspring());

          for (i = s.population = c, s.mutate(), g = 0; g < p.length; g++) i.push(p[g]);

          if (!a) {
            v.next = 27;
            break;
          }

          return v.next = 27, regeneratorRuntime.awrap(s.evaluate(a));

        case 27:
          if (t && (s.population = s.replace(i, t, o)), s.sort(i), !a) for (m = 0; m < i.length; m++) i[m].score = void 0;
          return s.generation++, v.abrupt("return", s.population);

        case 32:
        case "end":
          return v.stop();
      }
    });
  }, s.getParent = function () {
    switch (s.selection.name) {
      case "POWER":
        s.population[0].score < s.population[1].score && s.sort();
        var e = Math.floor(Math.pow(Math.random(), s.selection.power) * s.population.length);
        return s.population[e];

      case "FITNESS_PROPORTIONATE":
        for (var t = 0, o = 0, n = 0; n < s.population.length; n++) {
          var r = s.population[n].score;
          o = r < o ? r : o, t += r;
        }

        t += (o = Math.abs(o)) * s.population.length;

        for (var a = Math.random() * t, i = 0, u = 0; u < s.population.length; u++) {
          var p = s.population[u];
          if (a < (i += p.score + o)) return p;
        }

        return s.population[Math.floor(Math.random() * s.population.length)];

      case "TOURNAMENT":
        if (s.selection.size > s.population_size) throw new Error("Your tournament size should be lower than the population size, please change methods.selection.TOURNAMENT.size");

        for (var l = [], c = 0; c < s.selection.size; c++) {
          var f = s.population[Math.floor(Math.random() * s.population.length)];
          l.push(f);
        }

        l.sort(function (e, t) {
          return t.score - e.score;
        });

        for (var h = 0; h < s.selection.size; h++) if (Math.random() < s.selection.probability || h === s.selection.size - 1) return l[h];

    }
  }, s.getOffspring = function () {
    var e = s.getParent(),
        t = s.getParent();
    return a.crossOver(e, t, s.equal);
  }, s.evaluate = function (e) {
    var t, o, n;
    return regeneratorRuntime.async(function (r) {
      for (;;) switch (r.prev = r.next) {
        case 0:
          if ((e = e || s.dataset).length) {
            r.next = 3;
            break;
          }

          throw new Error("A dataset must be passed to the Neat constructor or Neat.evaluate()!");

        case 3:
          if (s.fitnessPopulation) {
            if (s.clear) for (t = 0; t < s.population.length; t++) s.population[t].clear();
            s.fitness(e, s.population);
          } else for (o = 0; o < s.population.length; o++) n = s.population[o], s.clear && n.clear(), n.score = s.fitness(e, n), s.population[o] = n;

          return s.sort(), r.abrupt("return", s.population[0]);

        case 6:
        case "end":
          return r.stop();
      }
    });
  }, s.sort = function (e) {
    (e = Array.isArray(e) && e.length ? e : s.population).sort(function (e, t) {
      return t.score - e.score;
    });
  }, s.getFittest = function () {
    return void 0 === s.population[s.population.length - 1].score && s.evaluate(), s.population[0].score < s.population[1].score && s.sort(), s.population[0];
  }, s.getAverage = function () {
    void 0 === s.population[s.population.length - 1].score && s.evaluate();

    for (var e = 0, t = 0; t < s.population.length; t++) e += s.population[t].score;

    return e / s.population.length;
  }, s.toJSON = function () {
    for (var e = [], t = 0; t < s.population.length; t++) e.push(s.population[t].toJSON());

    return e;
  }, s.fromJSON = function (e) {
    for (var t = [], o = 0; o < e.length; o++) t.push(a.fromJSON(e[o]));

    s.population = t, s.population_size = t.length;
  };
};

p.default = {
  options: {
    generation: 0,
    equal: !0,
    clean: !1,
    population_size: 50,
    growth: 1e-4,
    cost: i.cost.MSE,
    amount: 1,
    elitism: 1,
    provenance: 0,
    mutation_rate: .4,
    mutation_amount: 1,
    fitnessPopulation: !1,
    fitness: function () {
      for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : dataset, t = arguments.length > 1 ? arguments[1] : void 0, o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1, n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : i.cost.MSE, r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1e-4, a = 0, u = 0; u < o; u++) a -= t.test(e, n).error;

      return a -= (t.nodes.length - t.input - t.output + t.connections.length + t.gates.length) * r, (a = isNaN(a) ? -1 / 0 : a) / o;
    },
    selection: i.selection.POWER,
    crossover: [i.crossover.SINGLE_POINT, i.crossover.TWO_POINT, i.crossover.UNIFORM, i.crossover.AVERAGE],
    mutation: i.mutation.ALL,
    maxNodes: 1 / 0,
    maxConns: 1 / 0,
    maxGates: 1 / 0
  }
}, module.exports = p;

// ASSET: gan.js
var t = require("./architecture/network.js"),
    r = function (t, r) {
  this.generator, this.discriminator, this.raw_data;
};

r.prototype = {
  train: function (t) {},
  data: function (t) {}
};
// ASSET: index.js
module.exports = {
  activation: require("./methods/activation"),
  cost: require("./methods/cost"),
  methods: require("./methods/methods"),
  Connection: require("./architecture/connection"),
  architect: require("./architecture/architect"),
  Network: require("./architecture/network"),
  config: require("./config"),
  Group: require("./architecture/group"),
  Layer: require("./architecture/layer"),
  Node: require("./architecture/node"),
  Neat: require("./neat"),
  Population: require("./architecture/population"),
  GAN: require("./gan"),
  multi: require("./multithreading/multi")
};
})();