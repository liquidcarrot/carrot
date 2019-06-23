/**
* Built-in learning rate policies, which allow for a dynamic learning rate during neural network training.
*
* @namespace
*
* @see [Learning rates and how-to improve performance](https://towardsdatascience.com/understanding-learning-rates-and-how-it-improves-performance-in-deep-learning-d0d4059c1c10)
* @see [Learning rate policy](https://stackoverflow.com/questions/30033096/what-is-lr-policy-in-caffe/30045244)
*
* @example
* let { methods, Network } = require("@liquid-carrot/carrot");
*
* let network = new Network(5, 10, 5);
*
* // OPTION #1: methods.rate.FIXED
* network.train(dataset, { rate_policy: methods.rate.FIXED });
*
* // OPTION #2: methods.rate.STEP
* network.train(dataset, { rate_policy: methods.rate.STEP });
*
* // OPTION #3: methods.rate.EXP
* network.train(dataset, { rate_policy: methods.rate.EXP });
*
* // OPTION #4: methods.rate.INV
* network.train(dataset, { rate_policy: methods.rate.INV });
*
* // more coming soon...
*/
const rate = {
  
  /**
  * Fixed Learning Rate
  *
  * Default rate policy. Using this will make learning rate static (no change). Useful as a way to update a previous rate policy.
  *
  * @param {number} base_rate A base learning rate - _0 < `base_rate` < 1_
  *
  * @returns {function}
  *
  * @example
  * let { Network, methods } = require("@liquid-carrot/carrot");
  *
  * let network = new Network(10, 1);
  *
  * network.train(dataset, { rate_policy: methods.rate.FIXED });
  */
  FIXED: function(base_rate) {
    if(base_rate == undefined) throw new ReferenceError("Missing required parameter 'base_rate'")
    
    return base_rate;
  },
  
  /**
  * Step Learning Rate
  *
  * The learning rate will decrease (i.e. 'step down') every `options.step_size` iterations.
  *
  * @param {number} base_rate A base learning rate - _0 < `base_rate` < 1_
  * @param {number} iteration A number - _`iteration` > 0_
  * @param {Object} [options]
  * @param {number} [options.gamma=0.9] Learning rate retention per step; - _0 < `options.gamma` < 1_ - _large `options.gamma` CAN cause networks to never converge, low `options.gamma` CAN cause networks to converge too quickly_
  * @param {number} [options.step_size=100] Learning rate is updated every `options.step_size` iterations
  *
  * @returns {function}
  *
  * @example
  * let { Network, methods } = require("@liquid-carrot/carrot");
  *
  * let network = new Network(10, 1);
  *
  * network.train(dataset, { rate_policy: methods.rate.STEP });
  */
  STEP: function(base_rate, iteration, options) {
    if(base_rate == undefined || iteration == undefined) throw new ReferenceError("Missing required parameter 'base_rate' or 'iteration'");
    
    options = Object.assign({
      gamma: 0.9,
      step_size: 100
    }, options);
    
    return base_rate * Math.pow(options.gamma, Math.floor(iteration / options.step_size));
  },
  
  /**
  * Exponential Learning Rate
  *
  * The learning rate will exponentially decrease.
  *
  * The rate at `iteration` is calculated as: `rate = base_rate * Math.pow(options.gamma, iteration)`
  *
  * @param {number} base_rate A base learning rate - _0 < `base_rate` < 1_
  * @param {number} iteration A number - _`iteration` > 0_
  * @param {Object} [options]
  * @param {number} [options.gamma=0.999] Learning rate retention per iteration; - _0 < `options.gamma` < 1_ - _large `options.gamma` CAN cause networks to never converge, low `options.gamma` CAN cause networks to converge too quickly_
  *
  * @returns {function}
  *
  * @example
  * let { Network, methods } = require("@liquid-carrot/carrot");
  *
  * let network = new Network(10, 1);
  *
  * network.train(dataset, { rate_policy: methods.rate.EXP });
  */
  EXP: function(base_rate, iteration, options) {
    if(base_rate == undefined || iteration == undefined) throw new ReferenceError("Missing required parameter 'base_rate' or 'iteration'");
    
    options = Object.assign({
      gamma: 0.999
    }, options);
    
    return base_rate * Math.pow(options.gamma, iteration);
  },
  
  /**
  * Inverse Exponential Learning Rate
  *
  * The learning rate will exponentially decrease.
  *
  * The rate at `iteration` is calculated as: `rate = baseRate * Math.pow(1 + options.gamma * iteration, -options.power)`
  *
  * @param {number} base_rate A base learning rate - _0 < `base_rate` < 1_
  * @param {number} iteration A number - _`iteration` > 0_
  * @param {Object} [options]
  * @param {number} [options.gamma=0.001] Learning rate decay per iteration; - _0 < `options.gamma` < 1_ - _large `options.gamma` CAN cause networks to converge too quickly and stop learning, low `options.gamma` CAN cause networks to converge to learn VERY slowly_
  * @param {number} [options.power=2] Decay rate per iteration - _0 < `options.power`_ - _large `options.power` CAN cause networks to stop learning quickly, low `options.power` CAN cause networks to learn VERY slowly_
  *
  * @returns {function}
  *
  * @example
  * let { Network, methods } = require("@liquid-carrot/carrot");
  *
  * let network = new Network(10, 1);
  *
  * network.train(dataset, { rate_policy: methods.rate.INV });
  */
  INV: function(base_rate, iteration, options) {
    if(base_rate == undefined || iteration == undefined) throw new ReferenceError("Missing required parameter 'base_rate' or 'iteration'");
    
    options = Object.assign({
      gamma: 0.001,
      power: 2
    }, options);
    
    return base_rate * Math.pow(1 + options.gamma * iteration, -options.power);
  },
};

module.exports = rate;
