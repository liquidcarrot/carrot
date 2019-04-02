/**
* Built-in learning rate policies, which allow for a dynamic learning rate during neural network training.
*
* @see {@link https://stackoverflow.com/questions/30033096/what-is-lr-policy-in-caffe/30045244|Learning rate policy}
*
* @example
* network.train(trainingSet, {
*   rate: 0.3,
*   ratePolicy: methods.rate.METHOD(options), // replace METHOD with your choice
* });
*
* @namespace
*/
var rate = {
  /**
  * Default rate policy. Using this will make learning rate static (no change). Useful as a way to update a previous rate policy.
  *
  * @returns {function}
  */
  FIXED: function () {
    var func = function (baseRate, iteration) { return baseRate; };
    return func;
  },
  /**
  * The rate will 'step down' every `n` iterations.
  *
  * @todo Add `@param` tag descriptions
  *
  * @param {number} [gamma=0.9]
  * @param {number} [stepSize=100]
  *
  * @example
  * network.train(trainingSet, {
  *   rate: 0.3,
  *   ratePolicy: methods.rate.STEP(gamma, stepSize),
  * });
  *
  * @returns {function}
  */
  STEP: function (gamma, stepSize) {
    gamma = gamma || 0.9;
    stepSize = stepSize || 100;

    var func = function (baseRate, iteration) {
      return baseRate * Math.pow(gamma, Math.floor(iteration / stepSize));
    };

    return func;
  },
  /**
  * @todo Create a function description
  * @todo Add `@param` tag descriptions
  *
  * @param {number} [gamma=0.999]
  *
  * @example
  * network.train(trainingSet, {
  *   rate: 0.3,
  *   ratePolicy: methods.rate.EXP(gamma),
  * });
  *
  * @returns {function}
  */
  EXP: function (gamma) {
    gamma = gamma || 0.999;

    var func = function (baseRate, iteration) {
      return baseRate * Math.pow(gamma, iteration);
    };

    return func;
  },
  /**
  * @todo Create a function description
  * @todo Add `@param` tag descriptions
  *
  * @param {number} [gamma=0.001]
  * @param {number} [power=2]
  *
  * @example
  * network.train(trainingSet, {
  *   rate: 0.3,
  *   ratePolicy: methods.rate.INV(gamma, power),
  * });
  *
  * @returns {function}
  */
  INV: function (gamma, power) {
    gamma = gamma || 0.001;
    power = power || 2;

    var func = function (baseRate, iteration) {
      return baseRate * Math.pow(1 + gamma * iteration, -power);
    };

    return func;
  }
};

module.exports = rate;
