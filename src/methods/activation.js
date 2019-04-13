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
* // Changing a neuron's activation function
* var A = new Node();
* A.squash = methods.activation.<ACTIVATION_FUNCTION>;
*
* // eg.
* A.squash = methods.activation.LOGISTIC;
*
* @namespace
*/
var activation = {
  /**
  * [Logistic function.](https://en.wikipedia.org/wiki/Logistic_function)
  *
  * @member
  * @function
  * @param {number} x Input value to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  *
  * @example
  * // Changing a neuron's activation function
  * var A = new Node();
  * A.squash = methods.activation.LOGISTIC;
  */
  LOGISTIC: function (x, derivate) {
    var fx = 1 / (1 + Math.exp(-x));
    if (!derivate) return fx;
    return fx * (1 - fx);
  },
  /**
  * [TanH function.](https://en.wikipedia.org/wiki/Hyperbolic_function#Hyperbolic_tangent)
  *
  * @member
  * @function
  * @param {number} x Input value to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  *
  * @example
  * // Changing a neuron's activation function
  * var A = new Node();
  * A.squash = methods.activation.TANH;
  */
  TANH: function (x, derivate) {
    if (derivate) return 1 - Math.pow(Math.tanh(x), 2);
    return Math.tanh(x);
  },
  /**
  * [Identity function.](https://en.wikipedia.org/wiki/Identity_function)
  *
  * Returns input as output, used for [memory neurons](Layer#.Memory).
  *
  * @member
  * @function
  * @param {number} x Input value to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  *
  * @example
  * // Changing a neuron's activation function
  * var A = new Node();
  * A.squash = methods.activation.IDENTITY;
  */
  IDENTITY: function (x, derivate) {
    return derivate ? 1 : x;
  },
  /**
  * [Step function.](https://en.wikipedia.org/wiki/Heaviside_step_function)
  *
  * @member
  * @function
  * @param {number} x Input value to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  *
  * @example
  * // Changing a neuron's activation function
  * var A = new Node();
  * A.squash = methods.activation.STEP;
  */
  STEP: function (x, derivate) {
    return derivate ? 0 : x > 0 ? 1 : 0;
  },
  /**
  * [ReLU function.]{@link https://en.wikipedia.org/wiki/Rectifier_(neural_networks)}
  *
  * @member
  * @function
  * @param {number} x Input value to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  *
  * @example
  * // Changing a neuron's activation function
  * var A = new Node();
  * A.squash = methods.activation.RELU;
  */
  RELU: function (x, derivate) {
    if (derivate) return x > 0 ? 1 : 0;
    return x > 0 ? x : 0;
  },
  /**
  * [Softsign function.](https://en.wikipedia.org/wiki/Activation_function#Comparison_of_activation_functions)
  *
  * @member
  * @function
  * @param {number} x Input value to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  *
  * @example
  * // Changing a neuron's activation function
  * var A = new Node();
  * A.squash = methods.activation.SOFTSIGN;
  */
  SOFTSIGN: function (x, derivate) {
    var d = 1 + Math.abs(x);
    if (derivate) return x / Math.pow(d, 2);
    return x / d;
  },
  /**
  * [Sinusoid function.](https://en.wikipedia.org/wiki/Sine_wave)
  *
  * @member
  * @function
  * @param {number} x Input value to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  *
  * @example
  * // Changing a neuron's activation function
  * var A = new Node();
  * A.squash = methods.activation.SINUSOID;
  */
  SINUSOID: function (x, derivate) {
    if (derivate) return Math.cos(x);
    return Math.sin(x);
  },
  /**
  * [Guassian function.](https://en.wikipedia.org/wiki/Gaussian_function)
  *
  * @member
  * @function
  * @param {number} x Input value to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  *
  * @example
  * // Changing a neuron's activation function
  * var A = new Node();
  * A.squash = methods.activation.GAUSSIAN;
  */
  GAUSSIAN: function (x, derivate) {
    var d = Math.exp(-Math.pow(x, 2));
    if (derivate) return -2 * x * d;
    return d;
  },
  /**
  * [Bent identity function.](https://en.wikipedia.org/wiki/Activation_function#Comparison_of_activation_functions)
  *
  * @member
  * @function
  * @param {number} x Input value to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  *
  * @example
  * // Changing a neuron's activation function
  * var A = new Node();
  * A.squash = methods.activation.BENT_IDENTITY;
  */
  BENT_IDENTITY: function (x, derivate) {
    var d = Math.sqrt(Math.pow(x, 2) + 1);
    if (derivate) return x / (2 * d) + 1;
    return (d - 1) / 2 + x;
  },
  /**
  * [Bipolar function](https://wagenaartje.github.io/neataptic/docs/methods/activation/), if x > 0 then returns 1, otherwise returns -1
  *
  * @member
  * @function
  * @param {number} x Input value to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  *
    * @example
  * // Changing a neuron's activation function
  * var A = new Node();
  * A.squash = methods.activation.BIPOLAR;
  */
  BIPOLAR: function (x, derivate) {
    return derivate ? 0 : x > 0 ? 1 : -1;
  },
  /**
  * [Bipolar sigmoid function.](https://wagenaartje.github.io/neataptic/docs/methods/activation/)
  *
  * @member
  * @function
  * @param {number} x Input value to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  *
  * @example
  * // Changing a neuron's activation function
  * var A = new Node();
  * A.squash = methods.activation.BIPOLAR_SIGMOID;
  */
  BIPOLAR_SIGMOID: function (x, derivate) {
    var d = 2 / (1 + Math.exp(-x)) - 1;
    if (derivate) return 1 / 2 * (1 + d) * (1 - d);
    return d;
  },
  /**
  * [Hard tanh function.](https://wagenaartje.github.io/neataptic/docs/methods/activation/)
  *
  * @member
  * @function
  * @param {number} x Input value to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  *
  * @example
  * // Changing a neuron's activation function
  * var A = new Node();
  * A.squash = methods.activation.HARD_TANH;
  */
  HARD_TANH: function (x, derivate) {
    if (derivate) return x > -1 && x < 1 ? 1 : 0;
    return Math.max(-1, Math.min(1, x));
  },
  /**
  * [Absolute function.](https://wagenaartje.github.io/neataptic/docs/methods/activation/)
  *
  * Avoid using this activation function on a node with a selfconnection
  *
  * @member
  * @function
  * @param {number} x Input value to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  *
  * @example
  * // Changing a neuron's activation function
  * var A = new Node();
  * A.squash = methods.activation.ABSOLUTE;
  */
  ABSOLUTE: function (x, derivate) {
    if (derivate) return x < 0 ? -1 : 1;
    return Math.abs(x);
  },
  /**
  * [Inverse function.](https://wagenaartje.github.io/neataptic/docs/methods/activation/)
  *
  * @member
  * @function
  * @param {number} x Input value to activation function
  * @param {boolean} [derivate] Flag to select derivative function
  *
  * @example
  * // Changing a neuron's activation function
  * var A = new Node();
  * A.squash = methods.activation.INVERSE;
  */
  INVERSE: function (x, derivate) {
    if (derivate) return -1;
    return 1 - x;
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
   * @param {number} x Input value to activation function
   * @param {boolean} [derivate] Flag to select derivative function
   *
   * @example
   * // Changing a neuron's activation function
   * var A = new Node();
   * A.squash = methods.activation.SELU;
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
