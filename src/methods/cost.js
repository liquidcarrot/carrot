/*******************************************************************************
                                    COST FUNCTIONS
*******************************************************************************/

/**
 * @module
 *
 * @see {@link https://en.wikipedia.org/wiki/Loss_function|Loss Function on Wikipedia}
 * @namespace cost
 */
var cost = {
  /**
  * Cross entropy error
  *
  * @todo Add `@param` tag description
  * @todo Add `@returns` tag type
  * @todo Add `@returns` tag description
  *
  * @see {@link http://bit.ly/2p5W29A|Cross-entropy Error Function}
  * @param {number} target
  * @param {number[]} output
  *
  * @returns {number} - Mean squared error
  */
  CROSS_ENTROPY: function (target, output) {
    var error = 0;
    for (var i = 0; i < output.length; i++) {
      // Avoid negative and zero numbers, use 1e-15
      error -= target[i] * Math.log(Math.max(output[i], 1e-15)) + (1 - target[i]) * Math.log(1 - Math.max(output[i], 1e-15));
    }
    return error / output.length;
  },
  /**
  * Mean Squared Error
  *
  * @param {number} target - Ideal value
  * @param {number[]} output - Actual values
  *
  * @returns {number} - Mean squared error
  */
  MSE: function (target, output) {
    var error = 0;
    for (var i = 0; i < output.length; i++) {
      error += Math.pow(target[i] - output[i], 2);
    }

    return error / output.length;
  },
  /**
  * Binary Error
  *
  * @param {number} target - Ideal value
  * @param {number[]} output - Actual values
  *
  * @returns {number} misses - Times target value was missed
  */
  BINARY: function (target, output) {
    var misses = 0;
    for (var i = 0; i < output.length; i++) {
      misses += Math.round(target[i] * 2) !== Math.round(output[i] * 2);
    }

    return misses;
  },
  /**
  * Mean Absolute Error
  *
  * @param {number} target - Ideal value
  * @param {number[]} output - Actual values
  *
  * @returns {number} - Mean absoulte error
  */
  MAE: function (target, output) {
    var error = 0;
    for (var i = 0; i < output.length; i++) {
      error += Math.abs(target[i] - output[i]);
    }

    return error / output.length;
  },
  /**
  * Mean Absolute Percentage Error
  *
  * @param {number} target - Ideal value
  * @param {number[]} output - Actual values
  *
  * @returns {number} - Mean absolute percentage error
  */
  MAPE: function (target, output) {
    var error = 0;
    for (var i = 0; i < output.length; i++) {
      error += Math.abs((output[i] - target[i]) / Math.max(target[i], 1e-15));
    }

    return error / output.length;
  },
  /**
  * Mean Squared Logarithmic Error
  *
  * @param {number} target - Ideal value
  * @param {number[]} output - Actual values
  *
  * @returns {number} - Mean squared logarithmic error
  */
  MSLE: function (target, output) {
    var error = 0;
    for (var i = 0; i < output.length; i++) {
      error += Math.log(Math.max(target[i], 1e-15)) - Math.log(Math.max(output[i], 1e-15));
    }

    return error;
  },
  /**
  * Hinge loss, for classifiers
  *
  * @param {number} target - Ideal value
  * @param {number[]} output - Actual values
  *
  * @returns {number} - Hinge loss
  */
  HINGE: function (target, output) {
    var error = 0;
    for (var i = 0; i < output.length; i++) {
      error += Math.max(0, 1 - target[i] * output[i]);
    }

    return error;
  }
};

module.exports = cost;
