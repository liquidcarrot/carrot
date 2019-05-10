/**
* Built-in learning rate policies, which allow for a dynamic learning rate during neural network training.
*
* @see [Learning rates and how-to improve performance](https://towardsdatascience.com/understanding-learning-rates-and-how-it-improves-performance-in-deep-learning-d0d4059c1c10)
* @see [Learning rate policy](https://stackoverflow.com/questions/30033096/what-is-lr-policy-in-caffe/30045244)
*
* @example
* let { methods, Network } = require("@liquid-carrot/carrot");
*
* let network = new Network(5, 10, 5);
*
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
  *
  * @example
  * let { Network, methods } = require("@liquid-carrot/carrot");
  *
  * let network = new Network(10, 1);
  *
  * network.train(trainingData, { ratePolicy: methods.rate.FIXED() });
  */
  FIXED: function() {
    return function (baseRate, iteration) { return baseRate; };
  },
  
  /**
  * The rate will 'step down' every `n` iterations.
  *
  * @param {number} [gamma=0.9] Percentage to decrease learning rate per 'step'
  * @param {number} [stepSize=100] Amount of iterations before learning rate is updated (a step)
  *
  * @example
  * let { Network, methods } = require("@liquid-carrot/carrot");
  *
  * let network = new Network(10, 1);
  *
  * network.train(trainingData, { ratePolicy: methods.rate.STEP(0.7, 500) });
  *
  * @returns {function}
  */
  STEP: function (gamma=0.9, stepSize=100) {
    return function(baseRate, iteration) { return baseRate * Math.pow(gamma, Math.floor(iteration / stepSize)); }
  },
  
  /**
  * The learning rate will exponentially decrease. The rate at a certain iteration is calculated as: <code>rate = baseRate * Math.pow(gamma, iteration)</code>
  *
  * @param {number} [gamma=0.999] Amount to decrease learning rate by, higher numbers mean lower decreases in learning rate. The default gamma of <code>0.999</code> will decrease the current rate by 0.1% every iteration.
  *
  * @example
  * let { Network, methods } = require("@liquid-carrot/carrot");
  *
  * let network = new Network(10, 1);
  *
  * network.train(trainingData, { ratePolicy: methods.rate.EXP(0.98) });
  *
  * @returns {function}
  */
  EXP: function(gamma=0.999) {
    return function(baseRate, iteration) { return baseRate * Math.pow(gamma, iteration); }
  },
  /**
  * An inverse exponential, the rate at certain iteration is calculated at <code>rate = baseRate * Math.pow(1 + gamma * iteration, -power)</code>
  *
  * @param {number} [gamma=0.001] Amount to increase base by, lower numbers mean lower decreases in learning rate
  * @param {number} [power=2] A power that is set to negative, higher numbers mean higher decreases in learning rate
  *
  * @example
  * let { Network, methods } = require("@liquid-carrot/carrot");
  *
  * let network = new Network(10, 1);
  *
  * network.train(trainingData, { ratePolicy: methods.rate.INV(0.002, 3) });
  *
  * @returns {function}
  */
  INV: function (gamma=0.001, power=2) {
    return function(baseRate, iteration) { return baseRate * Math.pow(1 + gamma * iteration, -power); }
  }
};

module.exports = rate;
