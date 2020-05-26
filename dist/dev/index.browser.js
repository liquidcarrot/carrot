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
})({"../src/enums/ActivationType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivationType = void 0;
/**
 * The activation type.
 */

var ActivationType;

(function (ActivationType) {
  /**
   * No activation used for exceptions.
   */
  ActivationType[ActivationType["NO_ACTIVATION"] = 0] = "NO_ACTIVATION";
  /**
   * Logistic activation.
   */

  ActivationType[ActivationType["LogisticActivation"] = 1] = "LogisticActivation";
  /**
   * Tanh activation.
   */

  ActivationType[ActivationType["TanhActivation"] = 2] = "TanhActivation";
  /**
   * Identity activation.
   */

  ActivationType[ActivationType["IdentityActivation"] = 3] = "IdentityActivation";
  /**
   * Step activation.
   */

  ActivationType[ActivationType["StepActivation"] = 4] = "StepActivation";
  /**
   * RELU activation.
   */

  ActivationType[ActivationType["RELUActivation"] = 5] = "RELUActivation";
  /**
   * SoftSign activation.
   */

  ActivationType[ActivationType["SoftSignActivation"] = 6] = "SoftSignActivation";
  /**
   * Sinusoid activation.
   */

  ActivationType[ActivationType["SinusoidActivation"] = 7] = "SinusoidActivation";
  /**
   * Gaussian activation.
   */

  ActivationType[ActivationType["GaussianActivation"] = 8] = "GaussianActivation";
  /**
   * BentIdentity activation.
   */

  ActivationType[ActivationType["BentIdentityActivation"] = 9] = "BentIdentityActivation";
  /**
   * Bipolar activation.
   */

  ActivationType[ActivationType["BipolarActivation"] = 10] = "BipolarActivation";
  /**
   * BipolarSigmoid activation.
   */

  ActivationType[ActivationType["BipolarSigmoidActivation"] = 11] = "BipolarSigmoidActivation";
  /**
   * HardTanh activation.
   */

  ActivationType[ActivationType["HardTanhActivation"] = 12] = "HardTanhActivation";
  /**
   * Absolute activation.
   */

  ActivationType[ActivationType["AbsoluteActivation"] = 13] = "AbsoluteActivation";
  /**
   * Inverse activation.
   */

  ActivationType[ActivationType["InverseActivation"] = 14] = "InverseActivation";
  /**
   * SELU activation.
   */

  ActivationType[ActivationType["SELUActivation"] = 15] = "SELUActivation";
  /**
   * MISH activation.
   */

  ActivationType[ActivationType["MISHActivation"] = 16] = "MISHActivation";
})(ActivationType = exports.ActivationType || (exports.ActivationType = {}));
},{}],"../src/enums/ConnectionType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectionType = void 0;
/**
 * The type of a connection.
 */

var ConnectionType;

(function (ConnectionType) {
  /**
   * No connection used for exceptions.
   */
  ConnectionType[ConnectionType["NO_CONNECTION"] = 0] = "NO_CONNECTION";
  /**
   * Connect all input to all output nodes
   */

  ConnectionType[ConnectionType["ALL_TO_ALL"] = 1] = "ALL_TO_ALL";
  /**
   * Connect one input to one output node
   */

  ConnectionType[ConnectionType["ONE_TO_ONE"] = 2] = "ONE_TO_ONE";
  /**
   * Connect with pooling
   */

  ConnectionType[ConnectionType["POOLING"] = 3] = "POOLING";
})(ConnectionType = exports.ConnectionType || (exports.ConnectionType = {}));
},{}],"../src/enums/NodeType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoiseNodeType = exports.PoolNodeType = exports.NodeType = void 0;
/**
 * The type of node.
 */

var NodeType;

(function (NodeType) {
  /**
   * Node is an input node.
   */
  NodeType[NodeType["INPUT"] = 0] = "INPUT";
  /**
   * Node is a hidden node.
   */

  NodeType[NodeType["HIDDEN"] = 1] = "HIDDEN";
  /**
   * Node is a output node.
   */

  NodeType[NodeType["OUTPUT"] = 2] = "OUTPUT";
})(NodeType = exports.NodeType || (exports.NodeType = {}));
/**
 * The type of pool node.
 */


var PoolNodeType;

(function (PoolNodeType) {
  /**
   * Maximum pooling node.
   */
  PoolNodeType[PoolNodeType["MAX_POOLING"] = 0] = "MAX_POOLING";
  /**
   * Average pooling node.
   */

  PoolNodeType[PoolNodeType["AVG_POOLING"] = 1] = "AVG_POOLING";
  /**
   * Minimum pooling node.
   */

  PoolNodeType[PoolNodeType["MIN_POOLING"] = 2] = "MIN_POOLING";
})(PoolNodeType = exports.PoolNodeType || (exports.PoolNodeType = {}));
/**
 * The type of noise node.
 */


var NoiseNodeType;

(function (NoiseNodeType) {
  /**
   * Gaussian noise node
   */
  NoiseNodeType[NoiseNodeType["GAUSSIAN_NOISE"] = 0] = "GAUSSIAN_NOISE";
})(NoiseNodeType = exports.NoiseNodeType || (exports.NoiseNodeType = {}));
},{}],"../src/methods/Activation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MISHActivation = exports.SELUActivation = exports.InverseActivation = exports.AbsoluteActivation = exports.HardTanhActivation = exports.BipolarSigmoidActivation = exports.BipolarActivation = exports.BentIdentityActivation = exports.GaussianActivation = exports.SinusoidActivation = exports.SoftSignActivation = exports.RELUActivation = exports.StepActivation = exports.IdentityActivation = exports.TanhActivation = exports.LogisticActivation = exports.Activation = exports.ALL_ACTIVATIONS = void 0;

var ActivationType_1 = require("../enums/ActivationType");
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
 */


var Activation =
/** @class */
function () {
  function Activation() {
    /**
     * The type of activation.
     */
    this.type = ActivationType_1.ActivationType.NO_ACTIVATION;
  }
  /**
   * Converts a ActivationType to Activation, by creating a new object.
   * @param activationType the activation type to create a new object for
   */


  Activation.getActivation = function (activationType) {
    /**
     * The type of activation.
     */
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

      case ActivationType_1.ActivationType.MISHActivation:
        return new MISHActivation();
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
 */

var LogisticActivation =
/** @class */
function () {
  function LogisticActivation() {
    /**
     * The type of activation.
     */
    this.type = ActivationType_1.ActivationType.LogisticActivation;
  }
  /**
   * Calculates the activation value.
   *
   * @param x the input value
   * @param derivative Use derivative function?
   *
   * @returns the squashed input value
   */


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
 */

var TanhActivation =
/** @class */
function () {
  function TanhActivation() {
    /**
     * The type of activation.
     */
    this.type = ActivationType_1.ActivationType.TanhActivation;
  }
  /**
   * Calculates the activation value.
   *
   * @param x the input value
   * @param derivative Use derivative function?
   *
   * @returns the squashed input value
   */


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
 */

var IdentityActivation =
/** @class */
function () {
  function IdentityActivation() {
    /**
     * The type of activation.
     */
    this.type = ActivationType_1.ActivationType.IdentityActivation;
  }
  /**
   * Calculates the activation value.
   *
   * @param x the input value
   * @param derivative Use derivative function?
   *
   * @returns the squashed input value
   */


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
 */

var StepActivation =
/** @class */
function () {
  function StepActivation() {
    /**
     * The type of activation.
     */
    this.type = ActivationType_1.ActivationType.StepActivation;
  }
  /**
   * Calculates the activation value.
   *
   * @param x the input value
   * @param derivative Use derivative function?
   *
   * @returns the squashed input value
   */


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
 */

var RELUActivation =
/** @class */
function () {
  function RELUActivation() {
    /**
     * The type of activation.
     */
    this.type = ActivationType_1.ActivationType.RELUActivation;
  }
  /**
   * Calculates the activation value.
   *
   * @param x the input value
   * @param derivative Use derivative function?
   *
   * @returns the squashed input value
   */


  RELUActivation.prototype.calc = function (x, derivative) {
    if (derivative === void 0) {
      derivative = false;
    }

    if (!derivative) {
      return x > 0 ? x : 0;
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
 */

var SoftSignActivation =
/** @class */
function () {
  function SoftSignActivation() {
    /**
     * The type of activation.
     */
    this.type = ActivationType_1.ActivationType.SoftSignActivation;
  }
  /**
   * Calculates the activation value.
   *
   * @param x the input value
   * @param derivative Use derivative function?
   *
   * @returns the squashed input value
   */


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
 */

var SinusoidActivation =
/** @class */
function () {
  function SinusoidActivation() {
    /**
     * The type of activation.
     */
    this.type = ActivationType_1.ActivationType.SinusoidActivation;
  }
  /**
   * Calculates the activation value.
   *
   * @param x the input value
   * @param derivative Use derivative function?
   *
   * @returns the squashed input value
   */


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
 * [Gaussian function.](https://en.wikipedia.org/wiki/Gaussian_function)
 *
 * @param x Input values to activation function
 * @param derivative Flag to select derivative function
 */

var GaussianActivation =
/** @class */
function () {
  function GaussianActivation() {
    /**
     * The type of activation.
     */
    this.type = ActivationType_1.ActivationType.GaussianActivation;
  }
  /**
   * Calculates the activation value.
   *
   * @param x the input value
   * @param derivative Use derivative function?
   *
   * @returns the squashed input value
   */


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
 */

var BentIdentityActivation =
/** @class */
function () {
  function BentIdentityActivation() {
    /**
     * The type of activation.
     */
    this.type = ActivationType_1.ActivationType.BentIdentityActivation;
  }
  /**
   * Calculates the activation value.
   *
   * @param x the input value
   * @param derivative Use derivative function?
   *
   * @returns the squashed input value
   */


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
 */

var BipolarActivation =
/** @class */
function () {
  function BipolarActivation() {
    /**
     * The type of activation.
     */
    this.type = ActivationType_1.ActivationType.BipolarActivation;
  }
  /**
   * Calculates the activation value.
   *
   * @param x the input value
   * @param derivative Use derivative function?
   *
   * @returns the squashed input value
   */


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
 */

var BipolarSigmoidActivation =
/** @class */
function () {
  function BipolarSigmoidActivation() {
    /**
     * The type of activation.
     */
    this.type = ActivationType_1.ActivationType.BipolarSigmoidActivation;
  }
  /**
   * Calculates the activation value.
   *
   * @param x the input value
   * @param derivative Use derivative function?
   *
   * @returns the squashed input value
   */


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
 */

var HardTanhActivation =
/** @class */
function () {
  function HardTanhActivation() {
    /**
     * The type of activation.
     */
    this.type = ActivationType_1.ActivationType.HardTanhActivation;
  }
  /**
   * Calculates the activation value.
   *
   * @param x the input value
   * @param derivative Use derivative function?
   *
   * @returns the squashed input value
   */


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
 * Avoid using this activation function on a node with a self connection
 *
 * @param x Input values to activation function
 * @param derivative Flag to select derivative function
 */

var AbsoluteActivation =
/** @class */
function () {
  function AbsoluteActivation() {
    /**
     * The type of activation.
     */
    this.type = ActivationType_1.ActivationType.AbsoluteActivation;
  }
  /**
   * Calculates the activation value.
   *
   * @param x the input value
   * @param derivative Use derivative function?
   *
   * @returns the squashed input value
   */


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
 */

var InverseActivation =
/** @class */
function () {
  function InverseActivation() {
    /**
     * The type of activation.
     */
    this.type = ActivationType_1.ActivationType.InverseActivation;
  }
  /**
   * Calculates the activation value.
   *
   * @param x the input value
   * @param derivative Use derivative function?
   *
   * @returns the squashed input value
   */


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
 */

var SELUActivation =
/** @class */
function () {
  function SELUActivation() {
    /**
     * The type of activation.
     */
    this.type = ActivationType_1.ActivationType.SELUActivation;
  }
  /**
   * Calculates the activation value.
   *
   * @param x the input value
   * @param derivative Use derivative function?
   *
   * @returns the squashed input value
   */


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
        return (alpha * Math.exp(x) - alpha) * scale;
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
/**
 * MISH: Self Regularized Non-Monotonic Activation Function
 *
 * @see {@link https://github.com/digantamisra98/Mish Neural Networks}
 *
 * @param x Input value to activation function
 * @param derivative Flag to select derivative function
 */

var MISHActivation =
/** @class */
function () {
  function MISHActivation() {
    /**
     * The type of activation.
     */
    this.type = ActivationType_1.ActivationType.MISHActivation;
  }
  /**
   * Calculates the activation value.
   *
   * @param x the input value
   * @param derivative Use derivative function?
   *
   * @returns the squashed input value
   */


  MISHActivation.prototype.calc = function (x, derivative) {
    if (derivative === void 0) {
      derivative = false;
    }

    var ex = Math.exp(x);

    if (derivative) {
      var w = ex * ex * ex + 4 * (ex * ex + x * ex + x + 1) + 6 * ex;
      var d = 2 * ex + ex * ex + 2;
      return ex * w / (d * d);
    } else {
      return x * Math.tanh(Math.log(1 + ex));
    }
  };

  return MISHActivation;
}();

exports.MISHActivation = MISHActivation;
var ALL_ACTIVATIONS = [ActivationType_1.ActivationType.LogisticActivation, ActivationType_1.ActivationType.TanhActivation, ActivationType_1.ActivationType.IdentityActivation, ActivationType_1.ActivationType.StepActivation, ActivationType_1.ActivationType.RELUActivation, ActivationType_1.ActivationType.SoftSignActivation, ActivationType_1.ActivationType.SinusoidActivation, ActivationType_1.ActivationType.GaussianActivation, ActivationType_1.ActivationType.BentIdentityActivation, ActivationType_1.ActivationType.BipolarActivation, ActivationType_1.ActivationType.BipolarSigmoidActivation, ActivationType_1.ActivationType.HardTanhActivation, ActivationType_1.ActivationType.AbsoluteActivation, ActivationType_1.ActivationType.InverseActivation, ActivationType_1.ActivationType.SELUActivation, ActivationType_1.ActivationType.MISHActivation];
exports.ALL_ACTIVATIONS = ALL_ACTIVATIONS;
},{"../enums/ActivationType":"../src/enums/ActivationType.js"}],"../src/methods/Utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateGaussian = exports.avg = exports.sum = exports.min = exports.minValueIndex = exports.maxValueIndex = exports.max = exports.shuffle = exports.getOrDefault = exports.removeFromArray = exports.randBoolean = exports.randDouble = exports.randInt = exports.pickRandom = void 0;
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
 * Shuffles an array
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
/**
 * Finds the maximum value of an number array
 *
 * @param array
 */

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
/**
 * Finds the maximum value index of an number array
 *
 * @param array
 */

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
/**
 * Finds the minimum value index of an number array
 *
 * @param array
 */

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
/**
 * Finds the minimum value of an number array
 *
 * @param array
 */

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
/**
 * Calculates the average value of an array
 *
 * @param array
 */

function avg(array) {
  return sum(array) / array.length;
}

exports.avg = avg;
/**
 * Calculates the sum of all values of an array
 *
 * @param array
 */

function sum(array) {
  var sum = 0;

  for (var _i = 0, array_3 = array; _i < array_3.length; _i++) {
    var value = array_3[_i];
    sum += value;
  }

  return sum;
}

exports.sum = sum;
/**
 * Generates a random number with the gaussian distribution.
 *
 * @see https://en.wikipedia.org/wiki/Normal_distribution
 *
 * @param mean the mean value
 * @param deviation the standard deviation
 */

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
exports.SwapNodesMutation = exports.SubBackConnectionMutation = exports.AddBackConnectionMutation = exports.SubSelfConnectionMutation = exports.AddSelfConnectionMutation = exports.SubGateMutation = exports.AddGateMutation = exports.ModActivationMutation = exports.ModBiasMutation = exports.ModWeightMutation = exports.SubConnectionMutation = exports.AddConnectionMutation = exports.SubNodeMutation = exports.AddNodeMutation = exports.Mutation = exports.ONLY_STRUCTURE = exports.NO_STRUCTURE_MUTATIONS = exports.FEEDFORWARD_MUTATIONS = exports.ALL_MUTATIONS = void 0;

var Node_1 = require("../architecture/Node");

var NodeType_1 = require("../enums/NodeType");

var Utils_1 = require("./Utils");
/**
 *
 * Genetic algorithm mutation methods. Creates variations (mutations) in neural networks which are then selected for better performance.
 *
 * @see {@link https://en.wikipedia.org/wiki/mutation_(genetic_algorithm)|Mutation (genetic algorithms) on Wikipedia}
 * @see {@link https://en.wikipedia.org/wiki/Genetic_algorithm#Selection|Selection (genetic algorithms) on Wikipedia}
 *
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
 */

var AddNodeMutation =
/** @class */
function (_super) {
  __extends(AddNodeMutation, _super);
  /**
   * Constructs a AddNodeMutation object
   * @param randomActivation Should choose a random activation for a new node?
   */


  function AddNodeMutation(randomActivation) {
    if (randomActivation === void 0) {
      randomActivation = true;
    }

    var _this = _super.call(this) || this;

    _this.randomActivation = randomActivation;
    return _this;
  }
  /**
   * Mutates the network.
   *
   * @param network The network which gets mutated
   * @param options
   */


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
  /**
   * Mutates the network.
   *
   * @param network The network which gets mutated
   */


  SubNodeMutation.prototype.mutate = function (network) {
    var possible = network.nodes.filter(function (node) {
      return node !== undefined && node.isHiddenNode();
    }); // hidden nodes

    if (possible.length > 0) {
      network.removeNode(Utils_1.pickRandom(possible), this.keepGates); // remove a random node from the filtered array
    }
  };

  return SubNodeMutation;
}(Mutation);

exports.SubNodeMutation = SubNodeMutation;
/**
 * Add connections mutation.
 *
 * Adds a connection to the network.
 */

var AddConnectionMutation =
/** @class */
function (_super) {
  __extends(AddConnectionMutation, _super);

  function AddConnectionMutation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * Mutates the network.
   *
   * @param network The network which gets mutated
   * @param options
   */


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
 */

var SubConnectionMutation =
/** @class */
function (_super) {
  __extends(SubConnectionMutation, _super);

  function SubConnectionMutation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * Mutates the network.
   *
   * @param network The network which gets mutated
   */


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
 */

var ModWeightMutation =
/** @class */
function (_super) {
  __extends(ModWeightMutation, _super);
  /**
   * Constructs a ModWeightMutation object
   * @param min The minimum weight.
   * @param max The maximum weight.
   */


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
  /**
   * Mutates the network.
   *
   * @param network The network which gets mutated
   */


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
 */

var ModBiasMutation =
/** @class */
function (_super) {
  __extends(ModBiasMutation, _super);
  /**
   * Constructs a ModBiasMutation object
   * @param min The minimum bias.
   * @param max The maximum bias.
   */


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
  /**
   * Mutates the network.
   *
   * @param network The network which gets mutated
   */


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
 */

var ModActivationMutation =
/** @class */
function (_super) {
  __extends(ModActivationMutation, _super);
  /**
   * Constructs a ModActivationMutation object
   * @param mutateOutput Can the output be mutated?
   */


  function ModActivationMutation(mutateOutput) {
    if (mutateOutput === void 0) {
      mutateOutput = false;
    }

    var _this = _super.call(this) || this;

    _this.mutateOutput = mutateOutput;
    return _this;
  }
  /**
   * Mutates the network.
   *
   * @param network The network which gets mutated
   * @param options
   */


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
 */

var AddSelfConnectionMutation =
/** @class */
function (_super) {
  __extends(AddSelfConnectionMutation, _super);

  function AddSelfConnectionMutation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * Mutates the network.
   *
   * @param network The network which gets mutated
   */


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
 */

var SubSelfConnectionMutation =
/** @class */
function (_super) {
  __extends(SubSelfConnectionMutation, _super);

  function SubSelfConnectionMutation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * Mutates the network.
   *
   * @param network The network which gets mutated
   */


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
 */

var AddGateMutation =
/** @class */
function (_super) {
  __extends(AddGateMutation, _super);

  function AddGateMutation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * Mutates the network.
   *
   * @param network The network which gets mutated
   * @param options
   */


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
 */

var SubGateMutation =
/** @class */
function (_super) {
  __extends(SubGateMutation, _super);

  function SubGateMutation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * Mutates the network.
   *
   * @param network The network which gets mutated
   */


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
 */

var AddBackConnectionMutation =
/** @class */
function (_super) {
  __extends(AddBackConnectionMutation, _super);

  function AddBackConnectionMutation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * Mutates the network.
   *
   * @param network The network which gets mutated
   */


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
 */

var SubBackConnectionMutation =
/** @class */
function (_super) {
  __extends(SubBackConnectionMutation, _super);

  function SubBackConnectionMutation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * Mutates the network.
   *
   * @param network The network which gets mutated
   */


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
 */

var SwapNodesMutation =
/** @class */
function (_super) {
  __extends(SwapNodesMutation, _super);
  /**
   * Constructs a SwapNodeMutation object
   * @param mutateOutput Can the output be mutated?
   */


  function SwapNodesMutation(mutateOutput) {
    if (mutateOutput === void 0) {
      mutateOutput = false;
    }

    var _this = _super.call(this) || this;

    _this.mutateOutput = mutateOutput;
    return _this;
  }
  /**
   * Mutates the network.
   *
   * @param network The network which gets mutated
   */


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
 */

var ALL_MUTATIONS = [new AddNodeMutation(), new SubNodeMutation(), new AddConnectionMutation(), new SubConnectionMutation(), new ModWeightMutation(), new ModBiasMutation(), new ModActivationMutation(), new AddGateMutation(), new SubGateMutation(), new AddSelfConnectionMutation(), new SubSelfConnectionMutation(), new AddBackConnectionMutation(), new SubBackConnectionMutation(), new SwapNodesMutation()];
exports.ALL_MUTATIONS = ALL_MUTATIONS;
/**
 * Array of all feed forward mutation methods
 */

var FEEDFORWARD_MUTATIONS = [new AddNodeMutation(), new SubNodeMutation(), new AddConnectionMutation(), new SubConnectionMutation(), new ModWeightMutation(), new ModBiasMutation(), new ModActivationMutation(), new SwapNodesMutation()];
exports.FEEDFORWARD_MUTATIONS = FEEDFORWARD_MUTATIONS;
var NO_STRUCTURE_MUTATIONS = [new ModWeightMutation(), new ModBiasMutation(), new ModActivationMutation()];
exports.NO_STRUCTURE_MUTATIONS = NO_STRUCTURE_MUTATIONS;
var ONLY_STRUCTURE = [new AddNodeMutation(), new SubNodeMutation(), new AddConnectionMutation(), new SubConnectionMutation(), new AddGateMutation(), new SubGateMutation(), new AddSelfConnectionMutation(), new SubSelfConnectionMutation(), new AddBackConnectionMutation(), new SubBackConnectionMutation(), new SwapNodesMutation()];
exports.ONLY_STRUCTURE = ONLY_STRUCTURE;
},{"../architecture/Node":"../src/architecture/Node.js","../enums/NodeType":"../src/enums/NodeType.js","./Utils":"../src/methods/Utils.js"}],"../src/architecture/Connection.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Connection = void 0;
/**
 * A connection instance describes the connection between two nodes.
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
exports.Node = void 0;

var ActivationType_1 = require("../enums/ActivationType");

var NodeType_1 = require("../enums/NodeType");

var Activation_1 = require("../methods/Activation");

var Mutation_1 = require("../methods/Mutation");

var Utils_1 = require("../methods/Utils");

var Connection_1 = require("./Connection");
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
 * @prop {number} previousDeltaBias
 * @prop {number} totalDeltaBias
 * @prop {number} error.responsibility
 * @prop {number} error.projected
 * @prop {number} error.gated
 *
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
    this.derivativeState = 1;
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
   */


  Node.prototype.mutateBias = function (method) {
    if (method === void 0) {
      method = new Mutation_1.ModBiasMutation();
    }

    this.bias += Utils_1.randDouble(method.min, method.max); // add a random value in range [min,max)
  };
  /**
   * Mutates the node's activation function
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
   */


  Node.prototype.addGate = function (connection) {
    this.gated.push(connection);
    connection.gateNode = this;
  };
  /**
   * Stops this node from gating (manipulating) the given connection(s)
   *
   * @param connection Connections to remove gate - _i.e. remove this node from_
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

      this.errorProjected *= this.derivativeState;
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

      this.errorGated *= this.derivativeState;
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
      this.derivativeState = this.squash.calc(this.state, true); // store traces

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
            connection.xTraceValues[index] = node.selfConnection.gain * node.selfConnection.weight * connection.xTraceValues[index] + this.derivativeState * connection.eligibility * influence;
          } else {
            connection.xTraceNodes.push(node);
            connection.xTraceValues.push(this.derivativeState * connection.eligibility * influence);
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
  /**
   * Is this a input Node?
   */


  Node.prototype.isInputNode = function () {
    return this.type === NodeType_1.NodeType.INPUT;
  };
  /**
   * Is this a hidden Node?
   */


  Node.prototype.isHiddenNode = function () {
    return this.type === NodeType_1.NodeType.HIDDEN;
  };
  /**
   * Is this a output Node?
   */


  Node.prototype.isOutputNode = function () {
    return this.type === NodeType_1.NodeType.OUTPUT;
  };
  /**
   * Set bias.
   *
   * @param bias the new bias value
   */


  Node.prototype.setBias = function (bias) {
    this.bias = bias;
    return this;
  };
  /**
   * Set activation type
   *
   * @param activationType the new activation type
   */


  Node.prototype.setActivationType = function (activationType) {
    this.squash = Activation_1.Activation.getActivation(activationType);
    return this;
  };

  return Node;
}();

exports.Node = Node;
},{"../enums/ActivationType":"../src/enums/ActivationType.js","../enums/NodeType":"../src/enums/NodeType.js","../methods/Activation":"../src/methods/Activation.js","../methods/Mutation":"../src/methods/Mutation.js","../methods/Utils":"../src/methods/Utils.js","./Connection":"../src/architecture/Connection.js"}],"../src/enums/GatingType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GatingType = void 0;
/**
 * The type of gating.
 */

var GatingType;

(function (GatingType) {
  /**
   * Gate incoming connections.
   */
  GatingType[GatingType["INPUT"] = 0] = "INPUT";
  /**
   * Gate self connections.
   */

  GatingType[GatingType["SELF"] = 1] = "SELF";
  /**
   * Gate outgoing connections.
   */

  GatingType[GatingType["OUTPUT"] = 2] = "OUTPUT";
})(GatingType = exports.GatingType || (exports.GatingType = {}));
},{}],"../src/architecture/Layers/Layer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layer = void 0;

var ConnectionType_1 = require("../../enums/ConnectionType");

var GatingType_1 = require("../../enums/GatingType");
/**
 * Parent class for layers.
 */


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
  /**
   * Connect two Layers or sets of Nodes.
   *
   * @param from origin Nodes / Layer
   * @param to destination Nodes / Layer
   * @param connectionType The type of connection
   * @param weight the initial weights for all new connections
   *
   * @returns all created connections
   */


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
  /**
   * Gate nodes and connections.
   *
   * @param nodes the nodes which function as gateNodes
   * @param connections the connections which will be gated
   * @param gateType The type of gating
   *
   * @returns all gated connections
   */


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
},{"../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../enums/GatingType":"../src/enums/GatingType.js"}],"../src/architecture/Layers/CoreLayers/DenseLayer.js":[function(require,module,exports) {
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
exports.DenseLayer = void 0;

var ActivationType_1 = require("../../../enums/ActivationType");

var ConnectionType_1 = require("../../../enums/ConnectionType");

var NodeType_1 = require("../../../enums/NodeType");

var Node_1 = require("../../Node");

var Layer_1 = require("../Layer");
/**
 * Dense layer
 */


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
      _this.inputNodes.add(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setActivationType(activation));
    }

    _this.outputNodes = _this.inputNodes;

    (_a = _this.nodes).push.apply(_a, Array.from(_this.inputNodes));

    return _this;
  }
  /**
   * Checks if a given connection type is allowed on this layer.
   *
   * @param type the type to check
   *
   * @return Is this connection type allowed?
   */


  DenseLayer.prototype.connectionTypeisAllowed = function (type) {
    return true;
  };
  /**
   * Gets the default connection type for a incoming connection to this layer.
   *
   * @returns the default incoming connection
   */


  DenseLayer.prototype.getDefaultIncomingConnectionType = function () {
    return ConnectionType_1.ConnectionType.ALL_TO_ALL;
  };

  return DenseLayer;
}(Layer_1.Layer);

exports.DenseLayer = DenseLayer;
},{"../../../enums/ActivationType":"../src/enums/ActivationType.js","../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../Node":"../src/architecture/Node.js","../Layer":"../src/architecture/Layers/Layer.js"}],"../src/architecture/Nodes/ConstantNode.js":[function(require,module,exports) {
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
exports.ConstantNode = void 0;

var ActivationType_1 = require("../../enums/ActivationType");

var NodeType_1 = require("../../enums/NodeType");

var Activation_1 = require("../../methods/Activation");

var Node_1 = require("../Node");
/**
 * Constant node
 */


var ConstantNode =
/** @class */
function (_super) {
  __extends(ConstantNode, _super);

  function ConstantNode() {
    var _this = _super.call(this, NodeType_1.NodeType.HIDDEN) || this;

    _this.bias = 1;
    return _this;
  }
  /**
   * Create a constant node from json object.
   *
   * @param json the json object representing the node
   *
   * @returns the created node
   */


  ConstantNode.prototype.fromJSON = function (json) {
    var _a, _b;

    this.index = (_a = json.index) !== null && _a !== void 0 ? _a : -1;
    this.squash = Activation_1.Activation.getActivation((_b = json.squash) !== null && _b !== void 0 ? _b : ActivationType_1.ActivationType.IdentityActivation);
    return this;
  };
  /**
   * Convert this node into a json object.
   *
   * @returns the json object representing this node
   */


  ConstantNode.prototype.toJSON = function () {
    return {
      index: this.index,
      squash: this.squash.type
    };
  };
  /**
   * Bias mutations aren't allowed for a constant node.
   */


  ConstantNode.prototype.mutateBias = function () {
    throw new ReferenceError("Cannot mutate a pool node!");
  };
  /**
   * Activation mutations aren't allowed for a constant node.
   */


  ConstantNode.prototype.mutateActivation = function () {
    throw new ReferenceError("Cannot mutate a pool node!");
  };
  /**
   * Constant nodes can't gate a connection.
   */


  ConstantNode.prototype.addGate = function () {
    throw new ReferenceError("A pool node can't gate a connection!");
  };
  /**
   * Constant nodes can't gate a connection.
   */


  ConstantNode.prototype.removeGate = function () {
    throw new ReferenceError("A pool node can't gate a connection!");
  };
  /**
   * Can't set the bias of a constant node.
   */


  ConstantNode.prototype.setBias = function () {
    throw new ReferenceError("Cannot set the bias of a pool node!");
  };

  return ConstantNode;
}(Node_1.Node);

exports.ConstantNode = ConstantNode;
},{"../../enums/ActivationType":"../src/enums/ActivationType.js","../../enums/NodeType":"../src/enums/NodeType.js","../../methods/Activation":"../src/methods/Activation.js","../Node":"../src/architecture/Node.js"}],"../src/architecture/Nodes/DropoutNode.js":[function(require,module,exports) {
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
exports.DropoutNode = void 0;

var Utils_1 = require("../../methods/Utils");

var ConstantNode_1 = require("./ConstantNode");
/**
 * Dropout node
 */


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
  /**
   * Actives the node.
   *
   * When a neuron activates, it computes its state from all its input connections and 'squashes' it using its activation function, and returns the output (activation).
   *
   * You can also provide the activation (a float between 0 and 1) as a parameter, which is useful for neurons in the input layer.
   *
   * @returns A neuron's output value
   */


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
  /**
   * Backpropagate the error (a.k.a. learn).
   *
   * After an activation, you can teach the node what should have been the correct output (a.k.a. train). This is done by backpropagating. [Momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html) adds a fraction of the previous weight update to the current one. When the gradient keeps pointing in the same direction, this will increase the size of the steps taken towards the minimum.
   *
   * If you combine a high learning rate with a lot of momentum, you will rush past the minimum (of the error function) with huge steps. It is therefore often necessary to reduce the global learning rate µ when using a lot of momentum (m close to 1).
   *
   * @param target The target value (i.e. "the value the network SHOULD have given")
   * @param options More options for propagation
   */


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
  /**
   * Create a constant node from json object.
   *
   * @param json the json object representing the node
   *
   * @returns the created node
   */


  DropoutNode.prototype.fromJSON = function (json) {
    _super.prototype.fromJSON.call(this, json);

    this.probability = json.probability;
    return this;
  };
  /**
   * Convert this node into a json object.
   *
   * @returns the json object representing this node
   */


  DropoutNode.prototype.toJSON = function () {
    return Object.assign(_super.prototype.toJSON.call(this), {
      probability: this.probability
    });
  };

  return DropoutNode;
}(ConstantNode_1.ConstantNode);

exports.DropoutNode = DropoutNode;
},{"../../methods/Utils":"../src/methods/Utils.js","./ConstantNode":"../src/architecture/Nodes/ConstantNode.js"}],"../src/architecture/Layers/CoreLayers/DropoutLayer.js":[function(require,module,exports) {
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
exports.DropoutLayer = void 0;

var ActivationType_1 = require("../../../enums/ActivationType");

var ConnectionType_1 = require("../../../enums/ConnectionType");

var DropoutNode_1 = require("../../Nodes/DropoutNode");

var Layer_1 = require("../Layer");
/**
 * Dropout layer
 */


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
      _this.inputNodes.add(new DropoutNode_1.DropoutNode(probability).setActivationType(activation));
    }

    _this.outputNodes = _this.inputNodes;

    (_a = _this.nodes).push.apply(_a, Array.from(_this.inputNodes));

    return _this;
  }
  /**
   * Gets the default connection type for a incoming connection to this layer.
   *
   * @returns the default incoming connection
   */


  DropoutLayer.prototype.getDefaultIncomingConnectionType = function () {
    return ConnectionType_1.ConnectionType.ONE_TO_ONE;
  };
  /**
   * Checks if a given connection type is allowed on this layer.
   *
   * @param type the type to check
   *
   * @return Is this connection type allowed?
   */


  DropoutLayer.prototype.connectionTypeisAllowed = function (type) {
    return type === ConnectionType_1.ConnectionType.ONE_TO_ONE;
  };

  return DropoutLayer;
}(Layer_1.Layer);

exports.DropoutLayer = DropoutLayer;
},{"../../../enums/ActivationType":"../src/enums/ActivationType.js","../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../Nodes/DropoutNode":"../src/architecture/Nodes/DropoutNode.js","../Layer":"../src/architecture/Layers/Layer.js"}],"../src/architecture/Nodes/NoiseNode.js":[function(require,module,exports) {
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
exports.NoiseNode = void 0;

var NodeType_1 = require("../../enums/NodeType");

var Utils_1 = require("../../methods/Utils");

var ConstantNode_1 = require("./ConstantNode");
/**
 * Noise node
 */


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
  /**
   * Actives the node.
   *
   * When a neuron activates, it computes its state from all its input connections and 'squashes' it using its activation function, and returns the output (activation).
   *
   * You can also provide the activation (a float between 0 and 1) as a parameter, which is useful for neurons in the input layer.
   *
   * @returns A neuron's output value
   */


  NoiseNode.prototype.activate = function () {
    var _a, _b, _c, _d;

    this.old = this.state;
    var incomingStates = this.incoming.map(function (conn) {
      return conn.from.activation * conn.weight * conn.gain;
    });

    switch (this.noiseType) {
      case NodeType_1.NoiseNodeType.GAUSSIAN_NOISE:
        this.state = Utils_1.avg(incomingStates) + Utils_1.generateGaussian((_b = (_a = this.options.gaussian) === null || _a === void 0 ? void 0 : _a.mean) !== null && _b !== void 0 ? _b : 0, (_d = (_c = this.options.gaussian) === null || _c === void 0 ? void 0 : _c.deviation) !== null && _d !== void 0 ? _d : 2);
        break;

      default:
        throw new ReferenceError("Cannot activate this noise type!");
    }

    this.activation = this.squash.calc(this.state, false) * this.mask;
    this.derivativeState = this.squash.calc(this.state, true);
    return this.activation;
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
   */


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
    this.errorResponsibility = this.errorProjected = Utils_1.sum(connectionsStates) * this.derivativeState;

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
exports.NoiseLayer = void 0;

var ActivationType_1 = require("../../../enums/ActivationType");

var ConnectionType_1 = require("../../../enums/ConnectionType");

var NodeType_1 = require("../../../enums/NodeType");

var NoiseNode_1 = require("../../Nodes/NoiseNode");

var Layer_1 = require("../Layer");
/**
 * Noise layer
 */


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
      }).setActivationType(activation));
    }

    _this.outputNodes = _this.inputNodes;

    (_a = _this.nodes).push.apply(_a, Array.from(_this.inputNodes));

    return _this;
  }
  /**
   * Gets the default connection type for a incoming connection to this layer.
   *
   * @returns the default incoming connection
   */


  NoiseLayer.prototype.getDefaultIncomingConnectionType = function () {
    return ConnectionType_1.ConnectionType.ONE_TO_ONE;
  };
  /**
   * Checks if a given connection type is allowed on this layer.
   *
   * @param type the type to check
   *
   * @return Is this connection type allowed?
   */


  NoiseLayer.prototype.connectionTypeisAllowed = function (type) {
    return type === ConnectionType_1.ConnectionType.ONE_TO_ONE;
  };

  return NoiseLayer;
}(Layer_1.Layer);

exports.NoiseLayer = NoiseLayer;
},{"../../../enums/ActivationType":"../src/enums/ActivationType.js","../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../Nodes/NoiseNode":"../src/architecture/Nodes/NoiseNode.js","../Layer":"../src/architecture/Layers/Layer.js"}],"../src/architecture/Layers/CoreLayers/OutputLayer.js":[function(require,module,exports) {
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
exports.OutputLayer = void 0;

var ActivationType_1 = require("../../../enums/ActivationType");

var ConnectionType_1 = require("../../../enums/ConnectionType");

var NodeType_1 = require("../../../enums/NodeType");

var Node_1 = require("../../Node");

var Layer_1 = require("../Layer");
/**
 * Output layer
 */


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
      _this.inputNodes.add(new Node_1.Node(NodeType_1.NodeType.OUTPUT).setActivationType(activation));
    }

    (_a = _this.nodes).push.apply(_a, Array.from(_this.inputNodes));

    return _this;
  }
  /**
   * A outgoing connection is not allowed for an output layer!
   */


  OutputLayer.prototype.connect = function () {
    throw new ReferenceError("Could not connect an OutputLayer!");
  };
  /**
   * Checks if a given connection type is allowed on this layer.
   *
   * @param type the type to check
   *
   * @return Is this connection type allowed?
   */


  OutputLayer.prototype.connectionTypeisAllowed = function (type) {
    return true;
  };
  /**
   * Gets the default connection type for a incoming connection to this layer.
   *
   * @returns the default incoming connection
   */


  OutputLayer.prototype.getDefaultIncomingConnectionType = function () {
    return ConnectionType_1.ConnectionType.ALL_TO_ALL;
  };

  return OutputLayer;
}(Layer_1.Layer);

exports.OutputLayer = OutputLayer;
},{"../../../enums/ActivationType":"../src/enums/ActivationType.js","../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../Node":"../src/architecture/Node.js","../Layer":"../src/architecture/Layers/Layer.js"}],"../src/architecture/Layers/CoreLayers/InputLayer.js":[function(require,module,exports) {
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
exports.InputLayer = void 0;

var ConnectionType_1 = require("../../../enums/ConnectionType");

var NodeType_1 = require("../../../enums/NodeType");

var Node_1 = require("../../Node");

var Layer_1 = require("../Layer");

var NoiseLayer_1 = require("../NoiseLayers/NoiseLayer");
/**
 * Input layer
 */


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
  /**
   * Gets the default connection type for a incoming connection to this layer.
   *
   * @returns the default incoming connection
   */


  InputLayer.prototype.getDefaultIncomingConnectionType = function () {
    return ConnectionType_1.ConnectionType.NO_CONNECTION;
  };
  /**
   * Checks if a given connection type is allowed on this layer.
   *
   * @param type the type to check
   *
   * @return Is this connection type allowed?
   */


  InputLayer.prototype.connectionTypeisAllowed = function (type) {
    return type === ConnectionType_1.ConnectionType.NO_CONNECTION;
  };

  return InputLayer;
}(Layer_1.Layer);

exports.InputLayer = InputLayer;
},{"../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../Node":"../src/architecture/Node.js","../Layer":"../src/architecture/Layers/Layer.js","../NoiseLayers/NoiseLayer":"../src/architecture/Layers/NoiseLayers/NoiseLayer.js"}],"../src/architecture/Nodes/PoolNode.js":[function(require,module,exports) {
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
exports.PoolNode = void 0;

var NodeType_1 = require("../../enums/NodeType");

var Utils_1 = require("../../methods/Utils");

var ConstantNode_1 = require("./ConstantNode");
/**
 * Pool node
 */


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
  /**
   * Create a constant node from json object.
   *
   * @param json the json object representing the node
   *
   * @returns the created node
   */


  PoolNode.prototype.fromJSON = function (json) {
    _super.prototype.fromJSON.call(this, json);

    this.poolingType = json.poolType;
    return this;
  };
  /**
   * Actives the node.
   *
   * When a neuron activates, it computes its state from all its input connections and 'squashes' it using its activation function, and returns the output (activation).
   *
   * You can also provide the activation (a float between 0 and 1) as a parameter, which is useful for neurons in the input layer.
   *
   * @returns A neuron's output value
   */


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
      this.derivativeState = this.squash.calc(this.state, true);
    } // Adjust gain


    this.gated.forEach(function (conn) {
      return conn.gain = _this.activation;
    });
    return this.activation;
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
   */


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
    this.errorResponsibility = this.errorProjected = Utils_1.sum(connectionsStates) * this.derivativeState;

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
  /**
   * Convert this node into a json object.
   *
   * @returns the json object representing this node
   */


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
exports.PoolingLayer = void 0;

var ConnectionType_1 = require("../../../enums/ConnectionType");

var Layer_1 = require("../Layer");
/**
 * Parent class for all pooling layers
 */


var PoolingLayer =
/** @class */
function (_super) {
  __extends(PoolingLayer, _super);

  function PoolingLayer(outputSize) {
    return _super.call(this, outputSize) || this;
  }
  /**
   * Gets the default connection type for a incoming connection to this layer.
   *
   * @returns the default incoming connection
   */


  PoolingLayer.prototype.getDefaultIncomingConnectionType = function () {
    return ConnectionType_1.ConnectionType.POOLING;
  };
  /**
   * Checks if a given connection type is allowed on this layer.
   *
   * @param type the type to check
   *
   * @return Is this connection type allowed?
   */


  PoolingLayer.prototype.connectionTypeisAllowed = function (type) {
    return true;
  };

  return PoolingLayer;
}(Layer_1.Layer);

exports.PoolingLayer = PoolingLayer;
},{"../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../Layer":"../src/architecture/Layers/Layer.js"}],"../src/architecture/Layers/PoolingLayers/AvgPooling1DLayer.js":[function(require,module,exports) {
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
exports.AvgPooling1DLayer = void 0;

var ActivationType_1 = require("../../../enums/ActivationType");

var NodeType_1 = require("../../../enums/NodeType");

var PoolNode_1 = require("../../Nodes/PoolNode");

var PoolingLayer_1 = require("./PoolingLayer");
/**
 * Average pooling layer 1D
 */


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
      _this.inputNodes.add(new PoolNode_1.PoolNode(NodeType_1.PoolNodeType.AVG_POOLING).setActivationType(activationType));
    }

    _this.outputNodes = _this.inputNodes;

    (_a = _this.nodes).push.apply(_a, Array.from(_this.inputNodes));

    return _this;
  }

  return AvgPooling1DLayer;
}(PoolingLayer_1.PoolingLayer);

exports.AvgPooling1DLayer = AvgPooling1DLayer;
},{"../../../enums/ActivationType":"../src/enums/ActivationType.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../Nodes/PoolNode":"../src/architecture/Nodes/PoolNode.js","./PoolingLayer":"../src/architecture/Layers/PoolingLayers/PoolingLayer.js"}],"../src/architecture/Layers/PoolingLayers/MinPooling1DLayer.js":[function(require,module,exports) {
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
exports.MinPooling1DLayer = void 0;

var ActivationType_1 = require("../../../enums/ActivationType");

var NodeType_1 = require("../../../enums/NodeType");

var PoolNode_1 = require("../../Nodes/PoolNode");

var PoolingLayer_1 = require("./PoolingLayer");
/**
 * Minimum pooling layer 1D
 */


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
      _this.inputNodes.add(new PoolNode_1.PoolNode(NodeType_1.PoolNodeType.MIN_POOLING).setActivationType(activationType));
    }

    _this.outputNodes = _this.inputNodes;

    (_a = _this.nodes).push.apply(_a, Array.from(_this.inputNodes));

    return _this;
  }

  return MinPooling1DLayer;
}(PoolingLayer_1.PoolingLayer);

exports.MinPooling1DLayer = MinPooling1DLayer;
},{"../../../enums/ActivationType":"../src/enums/ActivationType.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../Nodes/PoolNode":"../src/architecture/Nodes/PoolNode.js","./PoolingLayer":"../src/architecture/Layers/PoolingLayers/PoolingLayer.js"}],"../src/architecture/Layers/PoolingLayers/MaxPooling1DLayer.js":[function(require,module,exports) {
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
exports.MaxPooling1DLayer = void 0;

var ActivationType_1 = require("../../../enums/ActivationType");

var NodeType_1 = require("../../../enums/NodeType");

var PoolNode_1 = require("../../Nodes/PoolNode");

var PoolingLayer_1 = require("./PoolingLayer");
/**
 * Maximum pooling layer 1D
 */


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
      _this.inputNodes.add(new PoolNode_1.PoolNode(NodeType_1.PoolNodeType.MAX_POOLING).setActivationType(activationType));
    }

    _this.outputNodes = _this.inputNodes;

    (_a = _this.nodes).push.apply(_a, Array.from(_this.inputNodes));

    return _this;
  }

  return MaxPooling1DLayer;
}(PoolingLayer_1.PoolingLayer);

exports.MaxPooling1DLayer = MaxPooling1DLayer;
},{"../../../enums/ActivationType":"../src/enums/ActivationType.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../Nodes/PoolNode":"../src/architecture/Nodes/PoolNode.js","./PoolingLayer":"../src/architecture/Layers/PoolingLayers/PoolingLayer.js"}],"../src/architecture/Layers/PoolingLayers/GlobalAvgPooling1DLayer.js":[function(require,module,exports) {
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
exports.GlobalAvgPooling1DLayer = void 0;

var AvgPooling1DLayer_1 = require("./AvgPooling1DLayer");
/**
 * Global average pooling layer 1D
 */


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
exports.GlobalMaxPooling1DLayer = void 0;

var MaxPooling1DLayer_1 = require("./MaxPooling1DLayer");
/**
 * Global maximum pooling layer 1D
 */


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
exports.GlobalMinPooling1DLayer = void 0;

var MinPooling1DLayer_1 = require("./MinPooling1DLayer");
/**
 * Global minimum pooling layer 1D
 */


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
exports.GRULayer = void 0;

var ActivationType_1 = require("../../../enums/ActivationType");

var ConnectionType_1 = require("../../../enums/ConnectionType");

var GatingType_1 = require("../../../enums/GatingType");

var NodeType_1 = require("../../../enums/NodeType");

var Activation_1 = require("../../../methods/Activation");

var Node_1 = require("../../Node");

var Layer_1 = require("../Layer");
/**
 * GRU layer
 */


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
      inverseUpdateGate.push(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setBias(0).setActivationType(ActivationType_1.ActivationType.LogisticActivation));
      resetGate.push(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setBias(0));
      memoryCell.push(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setActivationType(ActivationType_1.ActivationType.TanhActivation));
      previousOutput.push(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setBias(0).setActivationType(ActivationType_1.ActivationType.LogisticActivation));

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
  /**
   * Checks if a given connection type is allowed on this layer.
   *
   * @param type the type to check
   *
   * @return Is this connection type allowed?
   */


  GRULayer.prototype.connectionTypeisAllowed = function (type) {
    return true;
  };
  /**
   * Gets the default connection type for a incoming connection to this layer.
   *
   * @returns the default incoming connection
   */


  GRULayer.prototype.getDefaultIncomingConnectionType = function () {
    return ConnectionType_1.ConnectionType.ALL_TO_ALL;
  };

  return GRULayer;
}(Layer_1.Layer);

exports.GRULayer = GRULayer;
},{"../../../enums/ActivationType":"../src/enums/ActivationType.js","../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../../enums/GatingType":"../src/enums/GatingType.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../../methods/Activation":"../src/methods/Activation.js","../../Node":"../src/architecture/Node.js","../Layer":"../src/architecture/Layers/Layer.js"}],"../src/architecture/Layers/RecurrentLayers/LSTMLayer.js":[function(require,module,exports) {
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
exports.LSTMLayer = void 0;

var ActivationType_1 = require("../../../enums/ActivationType");

var ConnectionType_1 = require("../../../enums/ConnectionType");

var GatingType_1 = require("../../../enums/GatingType");

var NodeType_1 = require("../../../enums/NodeType");

var Activation_1 = require("../../../methods/Activation");

var Node_1 = require("../../Node");

var Layer_1 = require("../Layer");
/**
 * LSTM layer
 */


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
      forgetGate.push(new Node_1.Node(NodeType_1.NodeType.HIDDEN).setBias(1).setActivationType(ActivationType_1.ActivationType.LogisticActivation));
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
  /**
   * Checks if a given connection type is allowed on this layer.
   *
   * @param type the type to check
   *
   * @return Is this connection type allowed?
   */


  LSTMLayer.prototype.connectionTypeisAllowed = function (type) {
    return true;
  };
  /**
   * Gets the default connection type for a incoming connection to this layer.
   *
   * @returns the default incoming connection
   */


  LSTMLayer.prototype.getDefaultIncomingConnectionType = function () {
    return ConnectionType_1.ConnectionType.ALL_TO_ALL;
  };

  return LSTMLayer;
}(Layer_1.Layer);

exports.LSTMLayer = LSTMLayer;
},{"../../../enums/ActivationType":"../src/enums/ActivationType.js","../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../../enums/GatingType":"../src/enums/GatingType.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../../methods/Activation":"../src/methods/Activation.js","../../Node":"../src/architecture/Node.js","../Layer":"../src/architecture/Layers/Layer.js"}],"../src/architecture/Layers/RecurrentLayers/MemoryLayer.js":[function(require,module,exports) {
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
exports.MemoryLayer = void 0;

var ActivationType_1 = require("../../../enums/ActivationType");

var ConnectionType_1 = require("../../../enums/ConnectionType");

var NodeType_1 = require("../../../enums/NodeType");

var Activation_1 = require("../../../methods/Activation");

var Node_1 = require("../../Node");

var Layer_1 = require("../Layer");
/**
 * Memory layer
 */


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
  /**
   * Checks if a given connection type is allowed on this layer.
   *
   * @param type the type to check
   *
   * @return Is this connection type allowed?
   */


  MemoryLayer.prototype.connectionTypeisAllowed = function (type) {
    return true;
  };
  /**
   * Gets the default connection type for a incoming connection to this layer.
   *
   * @returns the default incoming connection
   */


  MemoryLayer.prototype.getDefaultIncomingConnectionType = function () {
    return ConnectionType_1.ConnectionType.ALL_TO_ALL;
  };

  return MemoryLayer;
}(Layer_1.Layer);

exports.MemoryLayer = MemoryLayer;
},{"../../../enums/ActivationType":"../src/enums/ActivationType.js","../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../../methods/Activation":"../src/methods/Activation.js","../../Node":"../src/architecture/Node.js","../Layer":"../src/architecture/Layers/Layer.js"}],"../src/methods/Loss.js":[function(require,module,exports) {
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
exports.HINGELoss = exports.MSLELoss = exports.WAPELoss = exports.MAPELoss = exports.MAELoss = exports.BinaryLoss = exports.MBELoss = exports.MSELoss = exports.CrossEntropyLoss = exports.Loss = exports.ALL_LOSSES = void 0;
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
 */

var CrossEntropyLoss =
/** @class */
function (_super) {
  __extends(CrossEntropyLoss, _super);

  function CrossEntropyLoss() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * Calculates the loss value from output to target.
   *
   * @param targets the target values
   * @param outputs the real output values
   * @returns the loss between output and target
   */


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
 */

var MSELoss =
/** @class */
function (_super) {
  __extends(MSELoss, _super);

  function MSELoss() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * Calculates the loss value from output to target.
   *
   * @param targets the target values
   * @param outputs the real output values
   * @returns the loss between output and target
   */


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
 * Mean Bias Error
 *
 * @param targets Ideal value
 * @param outputs Actual values
 *
 * @return [Mean bias error](https://towardsdatascience.com/common-loss-functions-in-machine-learning-46af0ffc4d23)
 *
 * @example
 * let myNetwork = new Network(5, 5);
 * myNetwork.train(trainingData, { loss: new MSELoss() });
 */

var MBELoss =
/** @class */
function (_super) {
  __extends(MBELoss, _super);

  function MBELoss() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * Calculates the loss value from output to target.
   *
   * @param targets the target values
   * @param outputs the real output values
   * @returns the loss between output and target
   */


  MBELoss.prototype.calc = function (targets, outputs) {
    var error = 0;
    outputs.forEach(function (value, index) {
      error += targets[index] - value;
    });
    return error / outputs.length;
  };

  return MBELoss;
}(Loss);

exports.MBELoss = MBELoss;
/**
 * Binary Error
 *
 * @param targets Ideal value
 * @param outputs Actual values
 *
 * @return misses The amount of times targets value was missed
 */

var BinaryLoss =
/** @class */
function (_super) {
  __extends(BinaryLoss, _super);

  function BinaryLoss() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * Calculates the loss value from output to target.
   *
   * @param targets the target values
   * @param outputs the real output values
   * @returns the loss between output and target
   */


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
 */

var MAELoss =
/** @class */
function (_super) {
  __extends(MAELoss, _super);

  function MAELoss() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * Calculates the loss value from output to target.
   *
   * @param targets the target values
   * @param outputs the real output values
   * @returns the loss between output and target
   */


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
 */

var MAPELoss =
/** @class */
function (_super) {
  __extends(MAPELoss, _super);

  function MAPELoss() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * Calculates the loss value from output to target.
   *
   * @param targets the target values
   * @param outputs the real output values
   * @returns the loss between output and target
   */


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
 */

var WAPELoss =
/** @class */
function (_super) {
  __extends(WAPELoss, _super);

  function WAPELoss() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * Calculates the loss value from output to target.
   *
   * @param targets the target values
   * @param outputs the real output values
   * @returns the loss between output and target
   */


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
 */

var MSLELoss =
/** @class */
function (_super) {
  __extends(MSLELoss, _super);

  function MSLELoss() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * Calculates the loss value from output to target.
   *
   * @param targets the target values
   * @param outputs the real output values
   * @returns the loss between output and target
   */


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
 */

var HINGELoss =
/** @class */
function (_super) {
  __extends(HINGELoss, _super);

  function HINGELoss() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * Calculates the loss value from output to target.
   *
   * @param targets the target values
   * @param outputs the real output values
   * @returns the loss between output and target
   */


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
var ALL_LOSSES = [new CrossEntropyLoss(), new MSELoss(), new MBELoss(), new BinaryLoss(), new MAELoss(), new MAPELoss(), new WAPELoss(), new MSLELoss(), new HINGELoss()];
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
exports.InverseRate = exports.ExponentialRate = exports.StepRate = exports.FixedRate = exports.Rate = void 0;
/**
 * Built-in learning rate policies, which allow for a dynamic learning rate during neural network training.
 *
 * @see [Learning rates and how-to improve performance](https://towardsdatascience.com/understanding-learning-rates-and-how-it-improves-performance-in-deep-learning-d0d4059c1c10)
 * @see [Learning rate policy](https://stackoverflow.com/questions/30033096/what-is-lr-policy-in-caffe/30045244)
 *
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
 */

var InverseRate =
/** @class */
function (_super) {
  __extends(InverseRate, _super);
  /**
   * Constructs a step rate policy.
   *
   * @param baseRate the rate at first iteration
   * @param gamma=0.001 Learning rate decay per iteration; - _0 < `gamma` < 1_ - _large `gamma` CAN cause networks to converge too quickly and stop learning, low `gamma` CAN cause networks to converge to learn VERY slowly_
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
exports.TournamentSelection = exports.PowerSelection = exports.FitnessProportionateSelection = exports.Selection = void 0;

var Utils_1 = require("./Utils");
/**
 * Genetic Algorithm Selection Methods (Genetic Operator)
 *
 * @see [Genetic Algorithm - Selection]{@link https://en.wikipedia.org/wiki/Selection_(genetic_algorithm)}
 *
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
 */

var FitnessProportionateSelection =
/** @class */
function (_super) {
  __extends(FitnessProportionateSelection, _super);

  function FitnessProportionateSelection() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * Selects a genome from the population according to the Selection method.
   *
   * @param population the pool of networks
   * @returns the selected genome
   */


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
 */

var PowerSelection =
/** @class */
function (_super) {
  __extends(PowerSelection, _super);
  /**
   * Constructs a power selection.
   * @param power Probability of picking better networks.
   */


  function PowerSelection(power) {
    if (power === void 0) {
      power = 4;
    }

    var _this = _super.call(this) || this;

    _this.power = power;
    return _this;
  }
  /**
   * Selects a genome from the population according to the Selection method.
   *
   * @param population the pool of networks
   * @returns the selected genome
   */


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
  /**
   * Selects a genome from the population according to the Selection method.
   *
   * @param population the pool of networks
   * @returns the selected genome
   */


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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NEAT = void 0;

var Network_1 = require("./architecture/Network");

var Activation_1 = require("./methods/Activation");

var Mutation_1 = require("./methods/Mutation");

var Selection_1 = require("./methods/Selection");

var Utils_1 = require("./methods/Utils");
/**
 * Runs the NEAT algorithm on group of neural networks.
 *
 * @constructs Neat
 */


var NEAT =
/** @class */
function () {
  /**
   * Constructs a NEAT object.
   *
   * @param options
   */
  function NEAT(options) {
    if (!options.fitnessFunction) {
      throw new ReferenceError("No fitness function given!");
    }

    this.dataset = options.dataset;

    if (options.dataset && options.dataset.length > 0) {
      this.input = options.dataset[0].input.length;
      this.output = options.dataset[0].output.length;
    } else {
      this.input = Utils_1.getOrDefault(options.input, 0);
      this.output = Utils_1.getOrDefault(options.output, 0);
    }

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

    for (var i = 0; i < this.populationSize; i++) {
      this.population.push(this.template.copy());
    }
  }
  /**
   * Filter genomes from population
   *
   * @param pickGenome Pick a network from the population which gets adjusted or removed
   * @param adjustGenome Adjust the picked network
   */


  NEAT.prototype.filterGenome = function (pickGenome, adjustGenome) {
    var _this = this;

    return this.population.filter(function (genome) {
      return pickGenome(genome);
    }).map(function (genome) {
      return adjustGenome ? adjustGenome(genome) : _this.template.copy();
    });
  };
  /**
   * Mutate a network with a random mutation from the allowed array.
   *
   * @param network The network which will be mutated.
   */


  NEAT.prototype.mutateRandom = function (network) {
    var _this = this;

    var allowed = this.mutations.filter(function (method) {
      return method.constructor.name !== Mutation_1.AddNodeMutation.constructor.name || network.nodes.length < _this.maxNodes || method.constructor.name !== Mutation_1.AddConnectionMutation.constructor.name || network.connections.length < _this.maxConnections || method.constructor.name !== Mutation_1.AddGateMutation.constructor.name || network.gates.length < _this.maxGates;
    });
    network.mutate(Utils_1.pickRandom(allowed), {
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
              this.population = this.filterGenome(pickGenome, adjustGenome);
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
              this.population = this.filterGenome(pickGenome, adjustGenome);
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
    var _this = this; // Elitist genomes should not be included


    this.population.filter(function () {
      return Math.random() <= _this.mutationRate;
    }).forEach(function (genome) {
      for (var i = 0; i < _this.mutationAmount; i++) {
        if (method) {
          genome.mutate(method);
        } else {
          _this.mutateRandom(genome);
        }
      }
    });
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
   * Sorts the population by score (descending)
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

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Network = void 0;

var os_1 = __importDefault(require("os"));

var threads_1 = require("threads");

var dist_1 = require("threads/dist");

require("threads/register");

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
   * @param {number[]} [input] Input values to activate nodes with
   * @param options
   * @returns {number[]} Squashed output values
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
   * @param {number[]} target Ideal values of the previous activate. Will use the difference to improve the weights
   * @param options More option for propagation
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
   */


  Network.prototype.clear = function () {
    this.nodes.forEach(function (node) {
      return node.clear();
    });
  };
  /**
   * Removes the connection of the `from` node to the `to` node
   *
   * @param {Node} from Source node
   * @param {Node} to Destination node
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
   * @todo Add ability to gate several network connections at once
   *
   * @param {Node} node Gating node
   * @param {Connection} connection Connection to gate with node
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
   * @param {Mutation} method [Mutation method](mutation)
   * @param {object} options
   * @param {number} [options.maxNodes]
   * @param {number} [options.maxConnections]
   * @param {number} [options.maxGates] Maximum amount of Gates a network can grow to
   */


  Network.prototype.mutate = function (method, options) {
    method.mutate(this, options);
  };
  /**
   * Selects a random mutation method and returns a mutated copy of the network. Warning! Mutates network directly.
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
   * @param {TrainOptions} options Options used to train network
   * @param {Array<{input:number[],output:number[]}>} options.data A data of input values and ideal output values to train the network with
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
   * @param {boolean} [options.clear=false] If set to true, will clear the network after every activation. This is useful for training LSTM's, more importantly for time series prediction.
   * @param {boolean} [options.shuffle=false] When set to true, will shuffle the training data every iterationNumber. Good option to use if the network is performing worse in [cross validation](https://artint.info/html/ArtInt_189.html) than in the real training data.
   * @param {number|boolean} [options.log=false] If set to n, outputs training status every n iterations. Setting `log` to 1 will log the status every iteration_number
   * @param {number} [options.schedule.iterations] You can schedule tasks to happen every n iterations. Paired with `options.schedule.function`
   * @param {schedule} [options.schedule.function] A function to run every n iterations as data by `options.schedule.iterations`. Passed as an object with a "function" property that contains the function to run.
   *
   * @returns {{error:{number},iterations:{number},time:{number}}} A summary object of the network's performance
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
   * @param {Array<{input:number[],output:number[]}>} dataset A set of input values and ideal output values to test the network against
   * @param {Loss} [loss=new MSELoss()] The [loss function](https://en.wikipedia.org/wiki/Loss_function) used to determine network error
   *
   * @returns {number} A summary object of the network's performance
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
   * @returns {NetworkJSON} The network represented as a json object
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
   * @param {object} [options] Configuration options
   * @param {number} [options.iterations=1000] Set the maximum amount of iterations/generations for the algorithm to run.
   * @param {number} [options.error=0.05] Set the target error. The algorithm will stop once this target error has been reached.
   * @param {number} [options.growth=0.0001] Set the penalty for large networks. Penalty calculation: penalty = (genome.nodes.length + genome.connections.length + genome.gates.length) * growth; This penalty will get added on top of the error. Your growth should be a very small number.
   * @param {loss} [options.loss=loss.MSE]  Specify the loss function for the evolution, this tells a genome in the population how well it's performing. Default: methods.loss.MSE (recommended).
   * @param {number} [options.amount=1] Set the amount of times to test the trainingSet on a genome each generation. Useful for time series. Do not use for regular feed forward problems.
   * @param {number} [options.threads] Specify the amount of threads to use. Default value is the amount of cores in your CPU.
   * @param {Network} [options.network]
   * @param {number|boolean} [options.log=false] If set to n, outputs training status every n iterations. Setting `log` to 1 will log the status every iteration
   * @param {number} [options.schedule.iterations] You can schedule tasks to happen every n iterations. Paired with `options.schedule.function`
   * @param {schedule} [options.schedule.function] A function to run every n iterations as set by `options.schedule.iterations`. Passed as an object with a "function" property that contains the function to run.
   * @param {boolean} [options.clear=false] If set to true, will clear the network after every activation. This is useful for evolving recurrent networks, more importantly for time series prediction.
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
   */


  Network.prototype.evolve = function (options) {
    var _a, _b, _c, _d, _e;

    if (options === void 0) {
      options = {};
    }

    return __awaiter(this, void 0, void 0, function () {
      var targetError, start, workerPool, serializedDataSet_1, neat, error, bestFitness, bestGenome, fittest, fitness;
      return __generator(this, function (_f) {
        switch (_f.label) {
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
            options.maxNodes = Utils_1.getOrDefault(options.maxNodes, Infinity);
            options.maxConnections = Utils_1.getOrDefault(options.maxConnections, Infinity);
            options.maxGates = Utils_1.getOrDefault(options.maxGates, Infinity);
            start = Date.now();

            if (!options.fitnessFunction) {
              serializedDataSet_1 = JSON.stringify(options.dataset); // init a pool of workers

              workerPool = dist_1.Pool(function () {
                return threads_1.spawn(new threads_1.Worker("../multithreading/Worker"));
              }, (_a = options.threads) !== null && _a !== void 0 ? _a : os_1.default.cpus().length);

              options.fitnessFunction = function (population) {
                return __awaiter(this, void 0, void 0, function () {
                  var _loop_1, _i, population_1, genome;

                  var _this = this;

                  return __generator(this, function (_a) {
                    switch (_a.label) {
                      case 0:
                        _loop_1 = function (genome) {
                          // add a task to the workerPool's queue
                          workerPool.queue(function (test) {
                            return __awaiter(_this, void 0, void 0, function () {
                              var _a;

                              var _b, _c;

                              return __generator(this, function (_d) {
                                switch (_d.label) {
                                  case 0:
                                    if (genome === undefined) {
                                      return [2
                                      /*return*/
                                      ];
                                    } // test the genome


                                    _a = genome;
                                    return [4
                                    /*yield*/
                                    , test(serializedDataSet_1, JSON.stringify(genome.toJSON()), Loss_1.ALL_LOSSES.indexOf((_b = options.loss) !== null && _b !== void 0 ? _b : new Loss_1.MSELoss()))];

                                  case 1:
                                    // test the genome
                                    _a.score = -_d.sent();

                                    if (genome.score === undefined) {
                                      genome.score = -Infinity;
                                      return [2
                                      /*return*/
                                      ];
                                    } // subtract growth value


                                    genome.score -= ((_c = options.growth) !== null && _c !== void 0 ? _c : 0.0001) * (genome.nodes.length - genome.inputSize - genome.outputSize + genome.connections.length + genome.gates.length);
                                    return [2
                                    /*return*/
                                    ];
                                }
                              });
                            });
                          });
                        };

                        for (_i = 0, population_1 = population; _i < population_1.length; _i++) {
                          genome = population_1[_i];

                          _loop_1(genome);
                        }

                        return [4
                        /*yield*/
                        , workerPool.settled()];

                      case 1:
                        _a.sent(); // wait until every task is done


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
            _f.label = 1;

          case 1:
            if (!(error < -targetError && (options.iterations === 0 || neat.generation < ((_b = options.iterations) !== null && _b !== void 0 ? _b : 0)))) return [3
            /*break*/
            , 3];
            return [4
            /*yield*/
            , neat.evolve()];

          case 2:
            fittest = _f.sent();
            fitness = (_c = fittest.score) !== null && _c !== void 0 ? _c : -Infinity; // add the growth value back to get the real error

            error = fitness + options.growth * (fittest.nodes.length - fittest.inputSize - fittest.outputSize + fittest.connections.length + fittest.gates.length);

            if (fitness > bestFitness) {
              bestFitness = fitness;
              bestGenome = fittest;
            }

            if (((_d = options.log) !== null && _d !== void 0 ? _d : 0) > 0 && neat.generation % ((_e = options.log) !== null && _e !== void 0 ? _e : 0) === 0) {
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

            if (!workerPool) return [3
            /*break*/
            , 5];
            return [4
            /*yield*/
            , workerPool.terminate()];

          case 4:
            _f.sent(); // stop all processes


            _f.label = 5;

          case 5:
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
exports.Architect = void 0;

var InputLayer_1 = require("./Layers/CoreLayers/InputLayer");

var OutputLayer_1 = require("./Layers/CoreLayers/OutputLayer");

var Layer_1 = require("./Layers/Layer");

var Network_1 = require("./Network");
/**
 * Architect constructs multilayer networks with various types of layers.
 */


var Architect =
/** @class */
function () {
  function Architect() {
    this.layers = [];
  }
  /**
   * Adds a layer to the architect.
   *
   * @param layer The layer
   * @param incomingConnectionType The incoming connection to this layer
   * @returns this object to function as builder class
   */


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
  /**
   * Build the network from the layers added to the architect.
   *
   * @returns the constructed network
   */


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
},{"./Layers/CoreLayers/InputLayer":"../src/architecture/Layers/CoreLayers/InputLayer.js","./Layers/CoreLayers/OutputLayer":"../src/architecture/Layers/CoreLayers/OutputLayer.js","./Layers/Layer":"../src/architecture/Layers/Layer.js","./Network":"../src/architecture/Network.js"}],"index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateGaussian = exports.avg = exports.sum = exports.min = exports.minValueIndex = exports.maxValueIndex = exports.max = exports.shuffle = exports.getOrDefault = exports.removeFromArray = exports.randBoolean = exports.randDouble = exports.randInt = exports.pickRandom = exports.TournamentSelection = exports.PowerSelection = exports.FitnessProportionateSelection = exports.Selection = exports.InverseRate = exports.ExponentialRate = exports.StepRate = exports.FixedRate = exports.Rate = exports.SwapNodesMutation = exports.SubBackConnectionMutation = exports.AddBackConnectionMutation = exports.SubSelfConnectionMutation = exports.AddSelfConnectionMutation = exports.SubGateMutation = exports.AddGateMutation = exports.ModActivationMutation = exports.ModBiasMutation = exports.ModWeightMutation = exports.SubConnectionMutation = exports.AddConnectionMutation = exports.SubNodeMutation = exports.AddNodeMutation = exports.Mutation = exports.ONLY_STRUCTURE = exports.NO_STRUCTURE_MUTATIONS = exports.FEEDFORWARD_MUTATIONS = exports.ALL_MUTATIONS = exports.HINGELoss = exports.MSLELoss = exports.WAPELoss = exports.MAPELoss = exports.MAELoss = exports.BinaryLoss = exports.MSELoss = exports.CrossEntropyLoss = exports.Loss = exports.ALL_LOSSES = exports.SELUActivation = exports.InverseActivation = exports.AbsoluteActivation = exports.HardTanhActivation = exports.BipolarSigmoidActivation = exports.BipolarActivation = exports.BentIdentityActivation = exports.GaussianActivation = exports.SinusoidActivation = exports.SoftSignActivation = exports.RELUActivation = exports.StepActivation = exports.IdentityActivation = exports.TanhActivation = exports.LogisticActivation = exports.Activation = exports.ALL_ACTIVATIONS = exports.NoiseNodeType = exports.PoolNodeType = exports.NodeType = exports.GatingType = exports.ConnectionType = exports.ActivationType = exports.Node = exports.Network = exports.Connection = exports.Architect = exports.PoolNode = exports.NoiseNode = exports.DropoutNode = exports.ConstantNode = exports.Layer = exports.MemoryLayer = exports.LSTMLayer = exports.GRULayer = exports.PoolingLayer = exports.GlobalMaxPooling1DLayer = exports.GlobalMinPooling1DLayer = exports.GlobalAvgPooling1DLayer = exports.MaxPooling1DLayer = exports.MinPooling1DLayer = exports.AvgPooling1DLayer = exports.NoiseLayer = exports.OutputLayer = exports.InputLayer = exports.DropoutLayer = exports.DenseLayer = void 0;

var DenseLayer_1 = require("../src/architecture/Layers/CoreLayers/DenseLayer");

Object.defineProperty(exports, "DenseLayer", {
  enumerable: true,
  get: function () {
    return DenseLayer_1.DenseLayer;
  }
});

var Node_1 = require("../src/architecture/Node");

Object.defineProperty(exports, "Node", {
  enumerable: true,
  get: function () {
    return Node_1.Node;
  }
});

var DropoutLayer_1 = require("../src/architecture/Layers/CoreLayers/DropoutLayer");

Object.defineProperty(exports, "DropoutLayer", {
  enumerable: true,
  get: function () {
    return DropoutLayer_1.DropoutLayer;
  }
});

var NoiseLayer_1 = require("../src/architecture/Layers/NoiseLayers/NoiseLayer");

Object.defineProperty(exports, "NoiseLayer", {
  enumerable: true,
  get: function () {
    return NoiseLayer_1.NoiseLayer;
  }
});

var OutputLayer_1 = require("../src/architecture/Layers/CoreLayers/OutputLayer");

Object.defineProperty(exports, "OutputLayer", {
  enumerable: true,
  get: function () {
    return OutputLayer_1.OutputLayer;
  }
});

var InputLayer_1 = require("../src/architecture/Layers/CoreLayers/InputLayer");

Object.defineProperty(exports, "InputLayer", {
  enumerable: true,
  get: function () {
    return InputLayer_1.InputLayer;
  }
});

var AvgPooling1DLayer_1 = require("../src/architecture/Layers/PoolingLayers/AvgPooling1DLayer");

Object.defineProperty(exports, "AvgPooling1DLayer", {
  enumerable: true,
  get: function () {
    return AvgPooling1DLayer_1.AvgPooling1DLayer;
  }
});

var MinPooling1DLayer_1 = require("../src/architecture/Layers/PoolingLayers/MinPooling1DLayer");

Object.defineProperty(exports, "MinPooling1DLayer", {
  enumerable: true,
  get: function () {
    return MinPooling1DLayer_1.MinPooling1DLayer;
  }
});

var MaxPooling1DLayer_1 = require("../src/architecture/Layers/PoolingLayers/MaxPooling1DLayer");

Object.defineProperty(exports, "MaxPooling1DLayer", {
  enumerable: true,
  get: function () {
    return MaxPooling1DLayer_1.MaxPooling1DLayer;
  }
});

var GlobalAvgPooling1DLayer_1 = require("../src/architecture/Layers/PoolingLayers/GlobalAvgPooling1DLayer");

Object.defineProperty(exports, "GlobalAvgPooling1DLayer", {
  enumerable: true,
  get: function () {
    return GlobalAvgPooling1DLayer_1.GlobalAvgPooling1DLayer;
  }
});

var GlobalMaxPooling1DLayer_1 = require("../src/architecture/Layers/PoolingLayers/GlobalMaxPooling1DLayer");

Object.defineProperty(exports, "GlobalMaxPooling1DLayer", {
  enumerable: true,
  get: function () {
    return GlobalMaxPooling1DLayer_1.GlobalMaxPooling1DLayer;
  }
});

var GlobalMinPooling1DLayer_1 = require("../src/architecture/Layers/PoolingLayers/GlobalMinPooling1DLayer");

Object.defineProperty(exports, "GlobalMinPooling1DLayer", {
  enumerable: true,
  get: function () {
    return GlobalMinPooling1DLayer_1.GlobalMinPooling1DLayer;
  }
});

var PoolingLayer_1 = require("../src/architecture/Layers/PoolingLayers/PoolingLayer");

Object.defineProperty(exports, "PoolingLayer", {
  enumerable: true,
  get: function () {
    return PoolingLayer_1.PoolingLayer;
  }
});

var GRULayer_1 = require("../src/architecture/Layers/RecurrentLayers/GRULayer");

Object.defineProperty(exports, "GRULayer", {
  enumerable: true,
  get: function () {
    return GRULayer_1.GRULayer;
  }
});

var LSTMLayer_1 = require("../src/architecture/Layers/RecurrentLayers/LSTMLayer");

Object.defineProperty(exports, "LSTMLayer", {
  enumerable: true,
  get: function () {
    return LSTMLayer_1.LSTMLayer;
  }
});

var MemoryLayer_1 = require("../src/architecture/Layers/RecurrentLayers/MemoryLayer");

Object.defineProperty(exports, "MemoryLayer", {
  enumerable: true,
  get: function () {
    return MemoryLayer_1.MemoryLayer;
  }
});

var Layer_1 = require("../src/architecture/Layers/Layer");

Object.defineProperty(exports, "Layer", {
  enumerable: true,
  get: function () {
    return Layer_1.Layer;
  }
});

var ConstantNode_1 = require("../src/architecture/Nodes/ConstantNode");

Object.defineProperty(exports, "ConstantNode", {
  enumerable: true,
  get: function () {
    return ConstantNode_1.ConstantNode;
  }
});

var DropoutNode_1 = require("../src/architecture/Nodes/DropoutNode");

Object.defineProperty(exports, "DropoutNode", {
  enumerable: true,
  get: function () {
    return DropoutNode_1.DropoutNode;
  }
});

var NoiseNode_1 = require("../src/architecture/Nodes/NoiseNode");

Object.defineProperty(exports, "NoiseNode", {
  enumerable: true,
  get: function () {
    return NoiseNode_1.NoiseNode;
  }
});

var PoolNode_1 = require("../src/architecture/Nodes/PoolNode");

Object.defineProperty(exports, "PoolNode", {
  enumerable: true,
  get: function () {
    return PoolNode_1.PoolNode;
  }
});

var Architect_1 = require("../src/architecture/Architect");

Object.defineProperty(exports, "Architect", {
  enumerable: true,
  get: function () {
    return Architect_1.Architect;
  }
});

var Connection_1 = require("../src/architecture/Connection");

Object.defineProperty(exports, "Connection", {
  enumerable: true,
  get: function () {
    return Connection_1.Connection;
  }
});

var Network_1 = require("../src/architecture/Network");

Object.defineProperty(exports, "Network", {
  enumerable: true,
  get: function () {
    return Network_1.Network;
  }
});

var ActivationType_1 = require("../src/enums/ActivationType");

Object.defineProperty(exports, "ActivationType", {
  enumerable: true,
  get: function () {
    return ActivationType_1.ActivationType;
  }
});

var ConnectionType_1 = require("../src/enums/ConnectionType");

Object.defineProperty(exports, "ConnectionType", {
  enumerable: true,
  get: function () {
    return ConnectionType_1.ConnectionType;
  }
});

var GatingType_1 = require("../src/enums/GatingType");

Object.defineProperty(exports, "GatingType", {
  enumerable: true,
  get: function () {
    return GatingType_1.GatingType;
  }
});

var NodeType_1 = require("../src/enums/NodeType");

Object.defineProperty(exports, "NodeType", {
  enumerable: true,
  get: function () {
    return NodeType_1.NodeType;
  }
});
Object.defineProperty(exports, "NoiseNodeType", {
  enumerable: true,
  get: function () {
    return NodeType_1.NoiseNodeType;
  }
});
Object.defineProperty(exports, "PoolNodeType", {
  enumerable: true,
  get: function () {
    return NodeType_1.PoolNodeType;
  }
});

var Activation_1 = require("../src/methods/Activation");

Object.defineProperty(exports, "AbsoluteActivation", {
  enumerable: true,
  get: function () {
    return Activation_1.AbsoluteActivation;
  }
});
Object.defineProperty(exports, "Activation", {
  enumerable: true,
  get: function () {
    return Activation_1.Activation;
  }
});
Object.defineProperty(exports, "ALL_ACTIVATIONS", {
  enumerable: true,
  get: function () {
    return Activation_1.ALL_ACTIVATIONS;
  }
});
Object.defineProperty(exports, "BentIdentityActivation", {
  enumerable: true,
  get: function () {
    return Activation_1.BentIdentityActivation;
  }
});
Object.defineProperty(exports, "BipolarActivation", {
  enumerable: true,
  get: function () {
    return Activation_1.BipolarActivation;
  }
});
Object.defineProperty(exports, "BipolarSigmoidActivation", {
  enumerable: true,
  get: function () {
    return Activation_1.BipolarSigmoidActivation;
  }
});
Object.defineProperty(exports, "GaussianActivation", {
  enumerable: true,
  get: function () {
    return Activation_1.GaussianActivation;
  }
});
Object.defineProperty(exports, "HardTanhActivation", {
  enumerable: true,
  get: function () {
    return Activation_1.HardTanhActivation;
  }
});
Object.defineProperty(exports, "IdentityActivation", {
  enumerable: true,
  get: function () {
    return Activation_1.IdentityActivation;
  }
});
Object.defineProperty(exports, "InverseActivation", {
  enumerable: true,
  get: function () {
    return Activation_1.InverseActivation;
  }
});
Object.defineProperty(exports, "LogisticActivation", {
  enumerable: true,
  get: function () {
    return Activation_1.LogisticActivation;
  }
});
Object.defineProperty(exports, "RELUActivation", {
  enumerable: true,
  get: function () {
    return Activation_1.RELUActivation;
  }
});
Object.defineProperty(exports, "SELUActivation", {
  enumerable: true,
  get: function () {
    return Activation_1.SELUActivation;
  }
});
Object.defineProperty(exports, "SinusoidActivation", {
  enumerable: true,
  get: function () {
    return Activation_1.SinusoidActivation;
  }
});
Object.defineProperty(exports, "SoftSignActivation", {
  enumerable: true,
  get: function () {
    return Activation_1.SoftSignActivation;
  }
});
Object.defineProperty(exports, "StepActivation", {
  enumerable: true,
  get: function () {
    return Activation_1.StepActivation;
  }
});
Object.defineProperty(exports, "TanhActivation", {
  enumerable: true,
  get: function () {
    return Activation_1.TanhActivation;
  }
});

var Loss_1 = require("../src/methods/Loss");

Object.defineProperty(exports, "ALL_LOSSES", {
  enumerable: true,
  get: function () {
    return Loss_1.ALL_LOSSES;
  }
});
Object.defineProperty(exports, "BinaryLoss", {
  enumerable: true,
  get: function () {
    return Loss_1.BinaryLoss;
  }
});
Object.defineProperty(exports, "CrossEntropyLoss", {
  enumerable: true,
  get: function () {
    return Loss_1.CrossEntropyLoss;
  }
});
Object.defineProperty(exports, "HINGELoss", {
  enumerable: true,
  get: function () {
    return Loss_1.HINGELoss;
  }
});
Object.defineProperty(exports, "Loss", {
  enumerable: true,
  get: function () {
    return Loss_1.Loss;
  }
});
Object.defineProperty(exports, "MAELoss", {
  enumerable: true,
  get: function () {
    return Loss_1.MAELoss;
  }
});
Object.defineProperty(exports, "MAPELoss", {
  enumerable: true,
  get: function () {
    return Loss_1.MAPELoss;
  }
});
Object.defineProperty(exports, "MSELoss", {
  enumerable: true,
  get: function () {
    return Loss_1.MSELoss;
  }
});
Object.defineProperty(exports, "MSLELoss", {
  enumerable: true,
  get: function () {
    return Loss_1.MSLELoss;
  }
});
Object.defineProperty(exports, "WAPELoss", {
  enumerable: true,
  get: function () {
    return Loss_1.WAPELoss;
  }
});

var Mutation_1 = require("../src/methods/Mutation");

Object.defineProperty(exports, "AddBackConnectionMutation", {
  enumerable: true,
  get: function () {
    return Mutation_1.AddBackConnectionMutation;
  }
});
Object.defineProperty(exports, "AddConnectionMutation", {
  enumerable: true,
  get: function () {
    return Mutation_1.AddConnectionMutation;
  }
});
Object.defineProperty(exports, "AddGateMutation", {
  enumerable: true,
  get: function () {
    return Mutation_1.AddGateMutation;
  }
});
Object.defineProperty(exports, "AddNodeMutation", {
  enumerable: true,
  get: function () {
    return Mutation_1.AddNodeMutation;
  }
});
Object.defineProperty(exports, "AddSelfConnectionMutation", {
  enumerable: true,
  get: function () {
    return Mutation_1.AddSelfConnectionMutation;
  }
});
Object.defineProperty(exports, "ALL_MUTATIONS", {
  enumerable: true,
  get: function () {
    return Mutation_1.ALL_MUTATIONS;
  }
});
Object.defineProperty(exports, "FEEDFORWARD_MUTATIONS", {
  enumerable: true,
  get: function () {
    return Mutation_1.FEEDFORWARD_MUTATIONS;
  }
});
Object.defineProperty(exports, "ModActivationMutation", {
  enumerable: true,
  get: function () {
    return Mutation_1.ModActivationMutation;
  }
});
Object.defineProperty(exports, "ModBiasMutation", {
  enumerable: true,
  get: function () {
    return Mutation_1.ModBiasMutation;
  }
});
Object.defineProperty(exports, "ModWeightMutation", {
  enumerable: true,
  get: function () {
    return Mutation_1.ModWeightMutation;
  }
});
Object.defineProperty(exports, "Mutation", {
  enumerable: true,
  get: function () {
    return Mutation_1.Mutation;
  }
});
Object.defineProperty(exports, "NO_STRUCTURE_MUTATIONS", {
  enumerable: true,
  get: function () {
    return Mutation_1.NO_STRUCTURE_MUTATIONS;
  }
});
Object.defineProperty(exports, "ONLY_STRUCTURE", {
  enumerable: true,
  get: function () {
    return Mutation_1.ONLY_STRUCTURE;
  }
});
Object.defineProperty(exports, "SubBackConnectionMutation", {
  enumerable: true,
  get: function () {
    return Mutation_1.SubBackConnectionMutation;
  }
});
Object.defineProperty(exports, "SubConnectionMutation", {
  enumerable: true,
  get: function () {
    return Mutation_1.SubConnectionMutation;
  }
});
Object.defineProperty(exports, "SubGateMutation", {
  enumerable: true,
  get: function () {
    return Mutation_1.SubGateMutation;
  }
});
Object.defineProperty(exports, "SubNodeMutation", {
  enumerable: true,
  get: function () {
    return Mutation_1.SubNodeMutation;
  }
});
Object.defineProperty(exports, "SubSelfConnectionMutation", {
  enumerable: true,
  get: function () {
    return Mutation_1.SubSelfConnectionMutation;
  }
});
Object.defineProperty(exports, "SwapNodesMutation", {
  enumerable: true,
  get: function () {
    return Mutation_1.SwapNodesMutation;
  }
});

var Rate_1 = require("../src/methods/Rate");

Object.defineProperty(exports, "ExponentialRate", {
  enumerable: true,
  get: function () {
    return Rate_1.ExponentialRate;
  }
});
Object.defineProperty(exports, "FixedRate", {
  enumerable: true,
  get: function () {
    return Rate_1.FixedRate;
  }
});
Object.defineProperty(exports, "InverseRate", {
  enumerable: true,
  get: function () {
    return Rate_1.InverseRate;
  }
});
Object.defineProperty(exports, "Rate", {
  enumerable: true,
  get: function () {
    return Rate_1.Rate;
  }
});
Object.defineProperty(exports, "StepRate", {
  enumerable: true,
  get: function () {
    return Rate_1.StepRate;
  }
});

var Selection_1 = require("../src/methods/Selection");

Object.defineProperty(exports, "FitnessProportionateSelection", {
  enumerable: true,
  get: function () {
    return Selection_1.FitnessProportionateSelection;
  }
});
Object.defineProperty(exports, "PowerSelection", {
  enumerable: true,
  get: function () {
    return Selection_1.PowerSelection;
  }
});
Object.defineProperty(exports, "Selection", {
  enumerable: true,
  get: function () {
    return Selection_1.Selection;
  }
});
Object.defineProperty(exports, "TournamentSelection", {
  enumerable: true,
  get: function () {
    return Selection_1.TournamentSelection;
  }
});

var Utils_1 = require("../src/methods/Utils");

Object.defineProperty(exports, "avg", {
  enumerable: true,
  get: function () {
    return Utils_1.avg;
  }
});
Object.defineProperty(exports, "generateGaussian", {
  enumerable: true,
  get: function () {
    return Utils_1.generateGaussian;
  }
});
Object.defineProperty(exports, "getOrDefault", {
  enumerable: true,
  get: function () {
    return Utils_1.getOrDefault;
  }
});
Object.defineProperty(exports, "max", {
  enumerable: true,
  get: function () {
    return Utils_1.max;
  }
});
Object.defineProperty(exports, "maxValueIndex", {
  enumerable: true,
  get: function () {
    return Utils_1.maxValueIndex;
  }
});
Object.defineProperty(exports, "min", {
  enumerable: true,
  get: function () {
    return Utils_1.min;
  }
});
Object.defineProperty(exports, "minValueIndex", {
  enumerable: true,
  get: function () {
    return Utils_1.minValueIndex;
  }
});
Object.defineProperty(exports, "pickRandom", {
  enumerable: true,
  get: function () {
    return Utils_1.pickRandom;
  }
});
Object.defineProperty(exports, "randBoolean", {
  enumerable: true,
  get: function () {
    return Utils_1.randBoolean;
  }
});
Object.defineProperty(exports, "randDouble", {
  enumerable: true,
  get: function () {
    return Utils_1.randDouble;
  }
});
Object.defineProperty(exports, "randInt", {
  enumerable: true,
  get: function () {
    return Utils_1.randInt;
  }
});
Object.defineProperty(exports, "removeFromArray", {
  enumerable: true,
  get: function () {
    return Utils_1.removeFromArray;
  }
});
Object.defineProperty(exports, "shuffle", {
  enumerable: true,
  get: function () {
    return Utils_1.shuffle;
  }
});
Object.defineProperty(exports, "sum", {
  enumerable: true,
  get: function () {
    return Utils_1.sum;
  }
});
},{"../src/architecture/Layers/CoreLayers/DenseLayer":"../src/architecture/Layers/CoreLayers/DenseLayer.js","../src/architecture/Node":"../src/architecture/Node.js","../src/architecture/Layers/CoreLayers/DropoutLayer":"../src/architecture/Layers/CoreLayers/DropoutLayer.js","../src/architecture/Layers/NoiseLayers/NoiseLayer":"../src/architecture/Layers/NoiseLayers/NoiseLayer.js","../src/architecture/Layers/CoreLayers/OutputLayer":"../src/architecture/Layers/CoreLayers/OutputLayer.js","../src/architecture/Layers/CoreLayers/InputLayer":"../src/architecture/Layers/CoreLayers/InputLayer.js","../src/architecture/Layers/PoolingLayers/AvgPooling1DLayer":"../src/architecture/Layers/PoolingLayers/AvgPooling1DLayer.js","../src/architecture/Layers/PoolingLayers/MinPooling1DLayer":"../src/architecture/Layers/PoolingLayers/MinPooling1DLayer.js","../src/architecture/Layers/PoolingLayers/MaxPooling1DLayer":"../src/architecture/Layers/PoolingLayers/MaxPooling1DLayer.js","../src/architecture/Layers/PoolingLayers/GlobalAvgPooling1DLayer":"../src/architecture/Layers/PoolingLayers/GlobalAvgPooling1DLayer.js","../src/architecture/Layers/PoolingLayers/GlobalMaxPooling1DLayer":"../src/architecture/Layers/PoolingLayers/GlobalMaxPooling1DLayer.js","../src/architecture/Layers/PoolingLayers/GlobalMinPooling1DLayer":"../src/architecture/Layers/PoolingLayers/GlobalMinPooling1DLayer.js","../src/architecture/Layers/PoolingLayers/PoolingLayer":"../src/architecture/Layers/PoolingLayers/PoolingLayer.js","../src/architecture/Layers/RecurrentLayers/GRULayer":"../src/architecture/Layers/RecurrentLayers/GRULayer.js","../src/architecture/Layers/RecurrentLayers/LSTMLayer":"../src/architecture/Layers/RecurrentLayers/LSTMLayer.js","../src/architecture/Layers/RecurrentLayers/MemoryLayer":"../src/architecture/Layers/RecurrentLayers/MemoryLayer.js","../src/architecture/Layers/Layer":"../src/architecture/Layers/Layer.js","../src/architecture/Nodes/ConstantNode":"../src/architecture/Nodes/ConstantNode.js","../src/architecture/Nodes/DropoutNode":"../src/architecture/Nodes/DropoutNode.js","../src/architecture/Nodes/NoiseNode":"../src/architecture/Nodes/NoiseNode.js","../src/architecture/Nodes/PoolNode":"../src/architecture/Nodes/PoolNode.js","../src/architecture/Architect":"../src/architecture/Architect.js","../src/architecture/Connection":"../src/architecture/Connection.js","../src/architecture/Network":"../src/architecture/Network.js","../src/enums/ActivationType":"../src/enums/ActivationType.js","../src/enums/ConnectionType":"../src/enums/ConnectionType.js","../src/enums/GatingType":"../src/enums/GatingType.js","../src/enums/NodeType":"../src/enums/NodeType.js","../src/methods/Activation":"../src/methods/Activation.js","../src/methods/Loss":"../src/methods/Loss.js","../src/methods/Mutation":"../src/methods/Mutation.js","../src/methods/Rate":"../src/methods/Rate.js","../src/methods/Selection":"../src/methods/Selection.js","../src/methods/Utils":"../src/methods/Utils.js"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = process.env.HMR_HOSTNAME || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + process.env.HMR_PORT + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], "carrot")
//# sourceMappingURL=/index.browser.js.map