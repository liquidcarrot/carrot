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
* A.squash = methods.activation.<ACTIVATION_FUNCTION>;
*
* // eg.
* A.squash = methods.activation.LOGISTIC;
*
* @namespace
*/
const activation = {
  /**
  * [Logistic function.](https://en.wikipedia.org/wiki/Logistic_function)
  *
  * @member
  * @function
  * @param {number | number[]} x Input value(s) to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  *
  * @example
  * let { methods, Node } = require("@liquid-carrot/carrot");
  *
  * // Changing a neuron's activation function
  * let A = new Node();
  * A.squash = methods.activation.LOGISTIC;
  */
  LOGISTIC: function(x, derivate) {
    // Dirty but neccessary to support Network.standalone as currently written
    const clamp = function(x) {
      const max = Number.MAX_VALUE;

      return x === Infinity
        ? max
        : x === -Infinity
        ? -max
        : x;
    };

    if (x == undefined) throw new ReferenceError('Parameter \'x\' is required, but it was not defined');

    const f = derivate ? (x) => Math.exp(-x) / (Math.pow((1 + Math.exp(-x)), 2)) : (x) => 1 / (1 + Math.exp(-x));

    // return Array.isArray(x) ? x.map(f) : f(x); unsafe mode
    return Array.isArray(x) ? x.map(clamp(f)) : clamp(f(x));
  },
  /**
  * [TanH function.](https://en.wikipedia.org/wiki/Hyperbolic_function#Hyperbolic_tangent)
  *
  * @member
  * @function
  * @param {number | number[]} x Input value(s) to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  *
  * @example
  * let { methods, Node } = require("@liquid-carrot/carrot");
  *
  * // Changing a neuron's activation function
  * let A = new Node();
  * A.squash = methods.activation.TANH;
  */
  TANH: function(x, derivate) {
    // Dirty but neccessary to support Network.standalone as currently written
    const clamp = function(x) {
      const max = Number.MAX_VALUE;

      return x === Infinity
        ? max
        : x === -Infinity
        ? -max
        : x;
    };

    if (x == undefined) throw new ReferenceError('Parameter \'x\' is required, but it was not defined');

    const f = derivate ? (x) => 1 - (Math.tanh(x) * Math.tanh(x)) : (x) => Math.tanh(x);

    // return Array.isArray(x) ? x.map(f) : f(x); unsafe mode
    return Array.isArray(x) ? x.map(clamp(f)) : clamp(f(x));
  },
  /**
  * [Identity function.](https://en.wikipedia.org/wiki/Identity_function)
  *
  * Returns input as output, used for [memory neurons](Layer#.Memory).
  *
  * @member
  * @function
  * @param {number | number[]} x Input value(s) to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  *
  * @example
  * let { methods, Node } = require("@liquid-carrot/carrot");
  *
  * // Changing a neuron's activation function
  * let A = new Node();
  * A.squash = methods.activation.IDENTITY;
  */
  IDENTITY: function(x, derivate) {
    // Dirty but neccessary to support Network.standalone as currently written
    const clamp = function(x) {
      const max = Number.MAX_VALUE;

      return x === Infinity
        ? max
        : x === -Infinity
        ? -max
        : x;
    };

    if (x == undefined) throw new ReferenceError('Parameter \'x\' is required, but it was not defined');

    const f = derivate ? (x) => 1 : (x) => x;

    // return Array.isArray(x) ? x.map(f) : f(x); unsafe mode
    return Array.isArray(x) ? x.map(clamp(f)) : clamp(f(x));
  },
  /**
  * [Step function.](https://en.wikipedia.org/wiki/Heaviside_step_function)
  *
  * @member
  * @function
  * @param {number | number[]} x Input value(s) to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  *
  * @example
  * let { methods, Node } = require("@liquid-carrot/carrot");
  *
  * // Changing a neuron's activation function
  * let A = new Node();
  * A.squash = methods.activation.STEP;
  */
  STEP: function(x, derivate) {
    // Dirty but neccessary to support Network.standalone as currently written
    const clamp = function(x) {
      const max = Number.MAX_VALUE;

      return x === Infinity
        ? max
        : x === -Infinity
        ? -max
        : x;
    };

    if (x == undefined) throw new ReferenceError('Parameter \'x\' is required, but it was not defined');

    const f = derivate ? (x) => 0 : (x) => x > 0 ? 1 : 0;

    // return Array.isArray(x) ? x.map(f) : f(x); unsafe mode
    return Array.isArray(x) ? x.map(clamp(f)) : clamp(f(x));
  },
  /**
  * [ReLU function.]{@link https://en.wikipedia.org/wiki/Rectifier_(neural_networks)}
  *
  * @member
  * @function
  * @param {number | number[]} x Input value(s) to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  *
  * @example
  * let { methods, Node } = require("@liquid-carrot/carrot");
  *
  * // Changing a neuron's activation function
  * let A = new Node();
  * A.squash = methods.activation.RELU;
  */
  RELU: function(x, derivate) {
    // Dirty but neccessary to support Network.standalone as currently written
    const clamp = function(x) {
      const max = Number.MAX_VALUE;

      return x === Infinity
        ? max
        : x === -Infinity
        ? -max
        : x;
    };

    if (x == undefined) throw new ReferenceError('Parameter \'x\' is required, but it was not defined');

    const f = derivate ? (x) => x > 0 ? 1 : 0 : (x) => x > 0 ? x : 0;

    // return Array.isArray(x) ? x.map(f) : f(x); unsafe mode
    return Array.isArray(x) ? x.map(clamp(f)) : clamp(f(x));
  },
  /**
  * [Softsign function.](https://en.wikipedia.org/wiki/Activation_function#Comparison_of_activation_functions)
  *
  * @member
  * @function
  * @param {number | number[]} x Input value(s) to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  *
  * @example
  * let { methods, Node } = require("@liquid-carrot/carrot");
  *
  * // Changing a neuron's activation function
  * let A = new Node();
  * A.squash = methods.activation.SOFTSIGN;
  */
  SOFTSIGN: function(x, derivate) {
    // Dirty but neccessary to support Network.standalone as currently written
    const clamp = function(x) {
      const max = Number.MAX_VALUE;

      return x === Infinity
        ? max
        : x === -Infinity
        ? -max
        : x;
    };

    if (x == undefined) throw new ReferenceError('Parameter \'x\' is required, but it was not defined');

    const f = derivate ? (x) => x / ((1 + Math.abs(x)) * (1 + Math.abs(x))) : (x) => x / (1 + Math.abs(x));

    // return Array.isArray(x) ? x.map(f) : f(x); unsafe mode
    return Array.isArray(x) ? x.map(clamp(f)) : clamp(f(x));
  },
  // SOFTCLIP: function(x, derivate) {
  // if(x == undefined) throw new ReferenceError("Parameter 'x' is required, but it was not defined");
  //
  //   const f = derivate ? (x) => (Math.exp(1) - 1) * Math.exp(x) / (Math.exp(x) +  Math.exp(1)) * (1 +  Math.exp(1)) : (x) => Math.log((1 + Math.exp(x)) / (1 + Math.exp(x-1)))
  //
  //   return Array.isArray(x) ? x.map(f) : f(x)
  // },
  /**
  * [Sinusoid function.](https://en.wikipedia.org/wiki/Sine_wave)
  *
  * @member
  * @function
  * @param {number | number[]} x Input value(s) to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  *
  * @example
  * let { methods, Node } = require("@liquid-carrot/carrot");
  *
  * // Changing a neuron's activation function
  * let A = new Node();
  * A.squash = methods.activation.SINUSOID;
  */
  SINUSOID: function(x, derivate) {
    // Dirty but neccessary to support Network.standalone as currently written
    const clamp = function(x) {
      const max = Number.MAX_VALUE;

      return x === Infinity
        ? max
        : x === -Infinity
        ? -max
        : x;
    };

    if (x == undefined) throw new ReferenceError('Parameter \'x\' is required, but it was not defined');

    const f = derivate ? (x) => Math.cos(x) : (x) => Math.sin(x);

    // return Array.isArray(x) ? x.map(f) : f(x); unsafe mode
    return Array.isArray(x) ? x.map(clamp(f)) : clamp(f(x));
  },
  /**
  * [Guassian function.](https://en.wikipedia.org/wiki/Gaussian_function)
  *
  * @member
  * @function
  * @param {number | number[]} x Input value(s) to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  *
  * @example
  * let { methods, Node } = require("@liquid-carrot/carrot");
  *
  * // Changing a neuron's activation function
  * let A = new Node();
  * A.squash = methods.activation.GAUSSIAN;
  */
  GAUSSIAN: function(x, derivate) {
    // Dirty but neccessary to support Network.standalone as currently written
    const clamp = function(x) {
      const max = Number.MAX_VALUE;

      return x === Infinity
        ? max
        : x === -Infinity
        ? -max
        : x;
    };

    if (x == undefined) throw new ReferenceError('Parameter \'x\' is required, but it was not defined');

    const f = derivate ? (x) => -2 * x * Math.exp(-(x * x)) : (x) => Math.exp(-(x * x));

    // return Array.isArray(x) ? x.map(f) : f(x); unsafe mode
    return Array.isArray(x) ? x.map(clamp(f)) : clamp(f(x));
  },
  /**
  * [Bent identity function.](https://en.wikipedia.org/wiki/Activation_function#Comparison_of_activation_functions)
  *
  * @member
  * @function
  * @param {number | number[]} x Input value(s) to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  *
  * @example
  * let { methods, Node } = require("@liquid-carrot/carrot");
  *
  * // Changing a neuron's activation function
  * let A = new Node();
  * A.squash = methods.activation.BENT_IDENTITY;
  */
  BENT_IDENTITY: function(x, derivate) {
    // Dirty but neccessary to support Network.standalone as currently written
    const clamp = function(x) {
      const max = Number.MAX_VALUE;

      return x === Infinity
        ? max
        : x === -Infinity
        ? -max
        : x;
    };

    if (x == undefined) throw new ReferenceError('Parameter \'x\' is required, but it was not defined');

    const f = derivate ? (x) => x / (2 * Math.sqrt((x * x) + 1)) + 1 : (x) => (Math.sqrt((x * x) + 1) - 1) / 2 + x;

    // return Array.isArray(x) ? x.map(f) : f(x); unsafe mode
    return Array.isArray(x) ? x.map(clamp(f)) : clamp(f(x));
  },
  /**
  * [Bipolar function](https://wagenaartje.github.io/neataptic/docs/methods/activation/), if x > 0 then returns 1, otherwise returns -1
  *
  * @member
  * @function
  * @param {number | number[]} x Input value to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  *
  * @example
  * let { methods, Node } = require("@liquid-carrot/carrot");
  *
  * // Changing a neuron's activation function
  * let A = new Node();
  * A.squash = methods.activation.BIPOLAR;
  */
  BIPOLAR: function(x, derivate) {
    // Dirty but neccessary to support Network.standalone as currently written
    const clamp = function(x) {
      const max = Number.MAX_VALUE;

      return x === Infinity
        ? max
        : x === -Infinity
        ? -max
        : x;
    };

    if (x == undefined) throw new ReferenceError('Parameter \'x\' is required, but it was not defined');

    const f = derivate ? (x) => 0 : (x) => x > 0 ? 1 : -1;

    return Array.isArray(x) ? x.map(clamp(f)) : clamp(f(x));
  },
  /**
  * [Bipolar sigmoid function.](https://wagenaartje.github.io/neataptic/docs/methods/activation/)
  *
  * @member
  * @function
  * @param {number | number[]}  x Input value(s) to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  *
  * @example
  * let { methods, Node } = require("@liquid-carrot/carrot");
  *
  * // Changing a neuron's activation function
  * let A = new Node();
  * A.squash = methods.activation.BIPOLAR_SIGMOID;
  */
  BIPOLAR_SIGMOID: function(x, derivate) {
    // Dirty but neccessary to support Network.standalone as currently written
    const clamp = function(x) {
      const max = Number.MAX_VALUE;

      return x === Infinity
        ? max
        : x === -Infinity
        ? -max
        : x;
    };

    if (x == undefined) throw new ReferenceError('Parameter \'x\' is required, but it was not defined');

    const f = derivate ? (x) => (2 * Math.exp(-x)) / (Math.pow((1 + Math.exp(-x)), 2)) : (x) => 2 / (1 + Math.exp(-x)) - 1;

    // return Array.isArray(x) ? x.map(f) : f(x); unsafe mode
    return Array.isArray(x) ? x.map(clamp(f)) : clamp(f(x));
  },
  /**
  * [Hard tanh function.](https://wagenaartje.github.io/neataptic/docs/methods/activation/)
  *
  * @member
  * @function
  * @param {number | number[]} x Input value(s) to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  *
  * @example
  * let { methods, Node } = require("@liquid-carrot/carrot");
  *
  * // Changing a neuron's activation function
  * let A = new Node();
  * A.squash = methods.activation.HARD_TANH;
  */
  HARD_TANH: function(x, derivate) {
    // Dirty but neccessary to support Network.standalone as currently written
    const clamp = function(x) {
      const max = Number.MAX_VALUE;

      return x === Infinity
        ? max
        : x === -Infinity
        ? -max
        : x;
    };

    if (x == undefined) throw new ReferenceError('Parameter \'x\' is required, but it was not defined');

    const f = derivate ? (x) => x > -1 && x < 1 ? 1 : 0 : (x) => Math.max(-1, Math.min(1, x));

    // return Array.isArray(x) ? x.map(f) : f(x); unsafe mode
    return Array.isArray(x) ? x.map(clamp(f)) : clamp(f(x));
  },
  /**
  * [Absolute function.](https://wagenaartje.github.io/neataptic/docs/methods/activation/)
  *
  * Avoid using this activation function on a node with a selfconnection
  *
  * @member
  * @function
  * @param {number | number[]} x Input value(s) to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  *
  * @example
  * let { methods, Node } = require("@liquid-carrot/carrot");
  *
  * // Changing a neuron's activation function
  * let A = new Node();
  * A.squash = methods.activation.ABSOLUTE;
  */
  ABSOLUTE: function(x, derivate) {
    // Dirty but neccessary to support Network.standalone as currently written
    const clamp = function(x) {
      const max = Number.MAX_VALUE;

      return x === Infinity
        ? max
        : x === -Infinity
        ? -max
        : x;
    };

    if (x == undefined) throw new ReferenceError('Parameter \'x\' is required, but it was not defined');

    const f = derivate ? (x) => x < 0 ? -1 : 1 : (x) => Math.abs(x);

    // return Array.isArray(x) ? x.map(f) : f(x); unsafe mode
    return Array.isArray(x) ? x.map(clamp(f)) : clamp(f(x));
  },
  /**
  * [Inverse function.](https://wagenaartje.github.io/neataptic/docs/methods/activation/)
  *
  * @member
  * @function
  * @param {number | number[]} x Input value(s) to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  *
  * @example
  * let { methods, Node } = require("@liquid-carrot/carrot");
  *
  * // Changing a neuron's activation function
  * let A = new Node();
  * A.squash = methods.activation.INVERSE;
  */
  INVERSE: function(x, derivate) {
    // Dirty but neccessary to support Network.standalone as currently written
    const clamp = function(x) {
      const max = Number.MAX_VALUE;

      return x === Infinity
        ? max
        : x === -Infinity
        ? -max
        : x;
    };

    if (x == undefined) throw new ReferenceError('Parameter \'x\' is required, but it was not defined');

    const f = derivate ? (x) => -1 : (x) => 1 - x;

    // return Array.isArray(x) ? x.map(f) : f(x); unsafe mode
    return Array.isArray(x) ? x.map(clamp(f)) : clamp(f(x));
  },
  /**
   * [Scaled exponential linear unit.](https://towardsdatascience.com/selu-make-fnns-great-again-snn-8d61526802a9)
   *
   * Exponential linear units try to make the mean activations closer to zero which speeds up learning. It has been shown that ELUs can obtain higher classification accuracy than ReLUs. α is a hyper-parameter here and to be tuned and the constraint is α ≥ 0(zero).
   *
   * @see {@link https://arxiv.org/pdf/1706.02515.pdf|Self-Normalizing Neural Networks}
   *
   * @member
   * @function
   * @param {number | number[]} x Input value to activation function
   * @param {boolean} [derivate] Flag to select derivative function
   *
   * @example
   * let { methods, Node } = require("@liquid-carrot/carrot");
   *
   * // Changing a neuron's activation function
   * let A = new Node();
   * A.squash = methods.activation.SELU;
   */
  SELU: function(x, derivate) {
    // Dirty but neccessary to support Network.standalone as currently written
    const clamp = function(x) {
      const max = Number.MAX_VALUE;

      return x === Infinity
        ? max
        : x === -Infinity
        ? -max
        : x;
    };

    if (x == undefined) throw new ReferenceError('Parameter \'x\' is required, but it was not defined');

    const alpha = 1.6732632423543772848170429916717;
    const scale = 1.0507009873554804934193349852946;

    const f = derivate ? (x) => x > 0 ? scale : ((x > 0 ? x : alpha * Math.exp(x) - alpha) + alpha) * scale : (x) => (x > 0 ? x : alpha * Math.exp(x) - alpha) * scale;

    // return Array.isArray(x) ? x.map(f) : f(x); unsafe mode
    return Array.isArray(x) ? x.map(clamp(f)) : clamp(f(x));
  },
};

module.exports = activation;
