/**
* Activation functions
*
* @see {@link https://en.wikipedia.org/wiki/Activation_function|Activation Function}
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
  * @todo Add `@returns` tag
  * @todo Add `@param` tag types
  * @todo Add `@param` tag descriptions
  * @todo Add `@param` tag defaults
  * @todo Document `@param` tag "optional" or "required"
  *
  * @member
  * @function
  * @param x
  * @param derivate
  */
  LOGISTIC: function (x, derivate) {
    var fx = 1 / (1 + Math.exp(-x));
    if (!derivate) return fx;
    return fx * (1 - fx);
  },
  /**
  * @todo Create a function description
  * @todo Add `@returns` tag
  * @todo Add `@param` tag types
  * @todo Add `@param` tag descriptions
  * @todo Add `@param` tag defaults
  * @todo Document `@param` tag "optional" or "required"
  *
  * @member
  * @function
  * @param x
  * @param derivate
  */
  TANH: function (x, derivate) {
    if (derivate) return 1 - Math.pow(Math.tanh(x), 2);
    return Math.tanh(x);
  },
  /**
  * @todo Create a function description
  * @todo Add `@returns` tag
  * @todo Add `@param` tag types
  * @todo Add `@param` tag descriptions
  * @todo Add `@param` tag defaults
  * @todo Document `@param` tag "optional" or "required"
  *
  * @member
  * @function
  * @param x
  * @param derivate
  */
  IDENTITY: function (x, derivate) {
    return derivate ? 1 : x;
  },
  /**
  * @todo Create a function description
  * @todo Add `@returns` tag
  * @todo Add `@param` tag types
  * @todo Add `@param` tag descriptions
  * @todo Add `@param` tag defaults
  * @todo Document `@param` tag "optional" or "required"
  *
  * @member
  * @function
  * @param x
  * @param derivate
  */
  STEP: function (x, derivate) {
    return derivate ? 0 : x > 0 ? 1 : 0;
  },
  /**
  * @todo Create a function description
  * @todo Add `@returns` tag
  * @todo Add `@param` tag types
  * @todo Add `@param` tag descriptions
  * @todo Add `@param` tag defaults
  * @todo Document `@param` tag "optional" or "required"
  *
  * @member
  * @function
  * @param x
  * @param derivate
  */
  RELU: function (x, derivate) {
    if (derivate) return x > 0 ? 1 : 0;
    return x > 0 ? x : 0;
  },
  /**
  * @todo Create a function description
  * @todo Add `@returns` tag
  * @todo Add `@param` tag types
  * @todo Add `@param` tag descriptions
  * @todo Add `@param` tag defaults
  * @todo Document `@param` tag "optional" or "required"
  *
  * @member
  * @function
  * @param x
  * @param derivate
  */
  SOFTSIGN: function (x, derivate) {
    var d = 1 + Math.abs(x);
    if (derivate) return x / Math.pow(d, 2);
    return x / d;
  },
  /**
  * @todo Create a function description
  * @todo Add `@returns` tag
  * @todo Add `@param` tag types
  * @todo Add `@param` tag descriptions
  * @todo Add `@param` tag defaults
  * @todo Document `@param` tag "optional" or "required"
  *
  * @member
  * @function
  * @param x
  * @param derivate
  */
  SINUSOID: function (x, derivate) {
    if (derivate) return Math.cos(x);
    return Math.sin(x);
  },
  /**
  * @todo Create a function description
  * @todo Add `@returns` tag
  * @todo Add `@param` tag types
  * @todo Add `@param` tag descriptions
  * @todo Add `@param` tag defaults
  * @todo Document `@param` tag "optional" or "required"
  *
  * @member
  * @function
  * @param x
  * @param derivate
  */
  GAUSSIAN: function (x, derivate) {
    var d = Math.exp(-Math.pow(x, 2));
    if (derivate) return -2 * x * d;
    return d;
  },
  /**
  * @todo Create a function description
  * @todo Add `@returns` tag
  * @todo Add `@param` tag types
  * @todo Add `@param` tag descriptions
  * @todo Add `@param` tag defaults
  * @todo Document `@param` tag "optional" or "required"
  *
  * @member
  * @function
  * @param x
  * @param derivate
  */
  BENT_IDENTITY: function (x, derivate) {
    var d = Math.sqrt(Math.pow(x, 2) + 1);
    if (derivate) return x / (2 * d) + 1;
    return (d - 1) / 2 + x;
  },
  /**
  * @todo Create a function description
  * @todo Add `@returns` tag
  * @todo Add `@param` tag types
  * @todo Add `@param` tag descriptions
  * @todo Add `@param` tag defaults
  * @todo Document `@param` tag "optional" or "required"
  *
  * @member
  * @function
  * @param x
  * @param derivate
  */
  BIPOLAR: function (x, derivate) {
    return derivate ? 0 : x > 0 ? 1 : -1;
  },
  /**
  * @todo Create a function description
  * @todo Add `@returns` tag
  * @todo Add `@param` tag types
  * @todo Add `@param` tag descriptions
  * @todo Add `@param` tag defaults
  * @todo Document `@param` tag "optional" or "required"
  *
  * @member
  * @function
  * @param x
  * @param derivate
  */
  BIPOLAR_SIGMOID: function (x, derivate) {
    var d = 2 / (1 + Math.exp(-x)) - 1;
    if (derivate) return 1 / 2 * (1 + d) * (1 - d);
    return d;
  },
  /**
  * @todo Create a function description
  * @todo Add `@returns` tag
  * @todo Add `@param` tag types
  * @todo Add `@param` tag descriptions
  * @todo Add `@param` tag defaults
  * @todo Document `@param` tag "optional" or "required"
  *
  * @member
  * @function
  * @param x
  * @param derivate
  */
  HARD_TANH: function (x, derivate) {
    if (derivate) return x > -1 && x < 1 ? 1 : 0;
    return Math.max(-1, Math.min(1, x));
  },
  /**
  * @todo Create a function description
  * @todo Add `@returns` tag
  * @todo Add `@param` tag types
  * @todo Add `@param` tag descriptions
  * @todo Add `@param` tag defaults
  * @todo Document `@param` tag "optional" or "required"
  *
  * @member
  * @function
  * @param x
  * @param derivate
  */
  ABSOLUTE: function (x, derivate) {
    if (derivate) return x < 0 ? -1 : 1;
    return Math.abs(x);
  },
  /**
  * @todo Create a function description
  * @todo Add `@returns` tag
  * @todo Add `@param` tag types
  * @todo Add `@param` tag descriptions
  * @todo Add `@param` tag defaults
  * @todo Document `@param` tag "optional" or "required"
  *
  * @member
  * @function
  * @param x
  * @param derivate
  */
  INVERSE: function (x, derivate) {
    if (derivate) return -1;
    return 1 - x;
  },
  /**
  * @todo Create a function description
  * @todo Add `@returns` tag
  * @todo Add `@param` tag types
  * @todo Add `@param` tag descriptions
  * @todo Add `@param` tag defaults
  * @todo Document `@param` tag "optional" or "required"
  *
  * @see {@link https://arxiv.org/pdf/1706.02515.pdf|Self-Normalizing Neural Networks}
  *
  * @member
  * @function
  * @param x
  * @param derivate
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
