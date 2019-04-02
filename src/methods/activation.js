/**
* Activation functions
* @see {@link https://en.wikipedia.org/wiki/Activation_function|Activation Function on Wikipedia}
* @see {@link https://medium.com/the-theory-of-everything/understanding-activation-functions-in-neural-networks-9491262884e0|Understanding activation functions in neural networks}
* @see {@link https://stats.stackexchange.com/questions/115258/comprehensive-list-of-activation-functions-in-neural-networks-with-pros-cons|Comprehensive list of activation functions in neural networks with pros/cons}
*
*
* @example
* // Changing a neuron's activation function
* var A = new Node();
* A.squash = methods.activation.<ACTIVATION_FUNCTION>;
*
* // eg.
* A.squash = methods.activation.SINUSOID;
*
* @namespace
*/
var activation = {
  /**
  * @todo Create a function description
  *
  * @member
  * @function
  * @param {number} x Input value to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  */
  LOGISTIC: function (x, derivate) {
    var fx = 1 / (1 + Math.exp(-x));
    if (!derivate) return fx;
    return fx * (1 - fx);
  },
  /**
  * @todo Create a function description
  *
  * @member
  * @function
  * @param {number} x Input value to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  */
  TANH: function (x, derivate) {
    if (derivate) return 1 - Math.pow(Math.tanh(x), 2);
    return Math.tanh(x);
  },
  /**
  * @todo Create a function description
  *
  * @member
  * @function
  * @param {number} x Input value to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  */
  IDENTITY: function (x, derivate) {
    return derivate ? 1 : x;
  },
  /**
  * @todo Create a function description
  *
  * @member
  * @function
  * @param {number} x Input value to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  */
  STEP: function (x, derivate) {
    return derivate ? 0 : x > 0 ? 1 : 0;
  },
  /**
  * @todo Create a function description
  *
  * @member
  * @function
  * @param {number} x Input value to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  */
  RELU: function (x, derivate) {
    if (derivate) return x > 0 ? 1 : 0;
    return x > 0 ? x : 0;
  },
  /**
  * @todo Create a function description
  *
  * @member
  * @function
  * @param {number} x Input value to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  */
  SOFTSIGN: function (x, derivate) {
    var d = 1 + Math.abs(x);
    if (derivate) return x / Math.pow(d, 2);
    return x / d;
  },
  /**
  * @todo Create a function description
  *
  * @member
  * @function
  * @param {number} x Input value to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  */
  SINUSOID: function (x, derivate) {
    if (derivate) return Math.cos(x);
    return Math.sin(x);
  },
  /**
  * @todo Create a function description
  *
  * @member
  * @function
  * @param {number} x Input value to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  */
  GAUSSIAN: function (x, derivate) {
    var d = Math.exp(-Math.pow(x, 2));
    if (derivate) return -2 * x * d;
    return d;
  },
  /**
  * @todo Create a function description
  *
  * @member
  * @function
  * @param {number} x Input value to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  */
  BENT_IDENTITY: function (x, derivate) {
    var d = Math.sqrt(Math.pow(x, 2) + 1);
    if (derivate) return x / (2 * d) + 1;
    return (d - 1) / 2 + x;
  },
  /**
  * @todo Create a function description
  *
  * @member
  * @function
  * @param {number} x Input value to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  */
  BIPOLAR: function (x, derivate) {
    return derivate ? 0 : x > 0 ? 1 : -1;
  },
  /**
  * @todo Create a function description
  *
  * @member
  * @function
  * @param {number} x Input value to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  */
  BIPOLAR_SIGMOID: function (x, derivate) {
    var d = 2 / (1 + Math.exp(-x)) - 1;
    if (derivate) return 1 / 2 * (1 + d) * (1 - d);
    return d;
  },
  /**
  * @todo Create a function description
  *
  * @member
  * @function
  * @param {number} x Input value to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  */
  HARD_TANH: function (x, derivate) {
    if (derivate) return x > -1 && x < 1 ? 1 : 0;
    return Math.max(-1, Math.min(1, x));
  },
  /**
  * @todo Create a function description
  *
  * @member
  * @function
  * @param {number} x Input value to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  */
  ABSOLUTE: function (x, derivate) {
    if (derivate) return x < 0 ? -1 : 1;
    return Math.abs(x);
  },
  /**
  * @todo Create a function description
  *
  * @member
  * @function
  * @param {number} x Input value to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  */
  INVERSE: function (x, derivate) {
    if (derivate) return -1;
    return 1 - x;
  },
  /**
  * @todo Create a function description
  *
  * @see {@link https://arxiv.org/pdf/1706.02515.pdf|Self-Normalizing Neural Networks}
  *
  * @member
  * @function
  * @param {number} x Input value to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  */
  SELU: function (x, derivate) {
    var alpha = 1.6732632423543772848170429916717;
    var scale = 1.0507009873554804934193349852946;
    var fx = x > 0 ? x : alpha * Math.exp(x) - alpha;
    if (derivate) { return x > 0 ? scale : (fx + alpha) * scale; }
    return fx * scale;
  }
};

module.exports = activation;
