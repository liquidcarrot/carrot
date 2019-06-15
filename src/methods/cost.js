const _ = require("lodash");

/**
 * Cost functions play an important role in neural networks. They give neural networks an indication of 'how wrong' they are; a.k.a. how far they are from the desired output. Also in fitness functions, cost functions play an important role.
 *
 * @namespace cost
 *
 * @see [Loss Function on Wikipedia](https://en.wikipedia.org/wiki/Loss_function)
 */
const cost = {
  
  /**
  * Cross entropy error
  *
  * @see {@link http://bit.ly/2p5W29A|Cross-entropy Error Function}
  * @param {number[]} target Ideal value
  * @param {number[]} output Actual values
  *
  * @returns {number} [Cross entropy error](https://ml-cheatsheet.readthedocs.io/en/latest/loss_functions.html)
  *
  * @example
  * let { methods, Network } = require("@liquid-carrot/carrot");
  *
  * let myNetwork = new Network(5, 10, 5);
  * myNetwork.train(trainingData, { cost: methods.cost.CROSS_ENTROPY });
  */
  CROSS_ENTROPY: function(target, output) {
    const error = _.reduce(output, (total, value, index) => total -= target[index] * Math.log(Math.max(output[index], 1e-15)) + (1 - target[index]) * Math.log(1 - Math.max(output[index], 1e-15)), 0)
    
    return error / output.length;
  },
  
  /**
  * Mean Squared Error
  *
  * @param {number} target Ideal value
  * @param {number[]} output Actual values
  *
  * @returns {number} [Mean squared error](https://medium.freecodecamp.org/machine-learning-mean-squared-error-regression-line-c7dde9a26b93)
  *
  * @example
  * let { methods, Network } = require("@liquid-carrot/carrot");
  *
  * let myNetwork = new Network(5, 10, 5);
  * myNetwork.train(trainingData, { cost: methods.cost.MSE });
  */
  MSE: function (target, output) {
    const error = _.reduce(output, (total, value, index) => total += Math.pow(target[index] - output[index], 2), 0)
    
    return error / output.length;
  },
  
  /**
  * Binary Error
  *
  * @param {number} target Ideal value
  * @param {number[]} output Actual values
  *
  * @returns {number} misses The amount of times target value was missed
  *
  * @see [Hinge loss on Wikipedia](https://en.wikipedia.org/wiki/Hinge_loss)
  *
  * @example
  * let { methods, Network } = require("@liquid-carrot/carrot");
  *
  * let myNetwork = new Network(5, 10, 5);
  * myNetwork.train(trainingData, {
  *   log: 1,
  *   iterations: 500,
  *   error: 0.03,
  *   rate: 0.05,
  *   cost: methods.cost.BINARY
  * });
  */
  BINARY: function (target, output) {
    const error = _.reduce(output, (total, value, index) => total += Math.round(target[index] * 2) !== Math.round(output[index] * 2), 0)
    
    return error;
  },
  
  /**
  * Mean Absolute Error
  *
  * @param {number} target Ideal value
  * @param {number[]} output Actual values
  *
  * @returns {number} [Mean absoulte error](https://en.wikipedia.org/wiki/Mean_absolute_error)
  *
  * @example
  * let { methods, Network } = require("@liquid-carrot/carrot");
  *
  * let myNetwork = new Network(5, 10, 5);
  * myNetwork.train(trainingData, {
  *   log: 1,
  *   iterations: 500,
  *   error: 0.03,
  *   rate: 0.05,
  *   cost: methods.cost.MAE
  * });
  */
  MAE: function (target, output) {
    const error = _.reduce(output, (total, value, index) => total += Math.abs(target[index] - output[index]), 0)
    
    return error / output.length;
  },
  
  /**
  * Mean Absolute Percentage Error
  *
  * @param {number} target Ideal value
  * @param {number[]} output Actual values
  *
  * @returns {number} [Mean absolute percentage error](https://en.wikipedia.org/wiki/Mean_absolute_percentage_error)
  *
  * @example
  * let { methods, Network } = require("@liquid-carrot/carrot");
  *
  * let myNetwork = new Network(5, 10, 5);
  * myNetwork.train(trainingData, {
  *   log: 1,
  *   iterations: 500,
  *   error: 0.03,
  *   rate: 0.05,
  *   cost: methods.cost.MAPE
  * });
  */
  MAPE: function (target, output) {
    const error = _.reduce(output, (total, value, index) => total += Math.abs((output[index] - target[index]) / Math.max(target[index], 1e-15)), 0)
    
    return error / output.length;
  },
  
  /**
  * Weighted Absolute Percentage Error (WAPE)
  *
  * @param {number} target Ideal value
  * @param {number} output Actual values
  *
  * @returns {number} - [Weighted absolute percentage error](https://help.sap.com/doc/saphelp_nw70/7.0.31/en-US/76/487053bbe77c1ee10000000a174cb4/content.htm?no_cache=true)
  *
  * @example
  * let { methods, Network } = require("@liquid-carrot/carrot");
  *
  * let myNetwork = new Network(5, 10, 5);
  * myNetwork.train(trainingData, {
  *   cost: methods.cost.WAPE
  * });
  */
  WAPE: function (target, output) {
    let error = 0;
    let sum = 0;
    
    _.times(output.length, (index) => {
      error += Math.abs(target[index] - output[index]);
      sum += target[index];
    })
    
     return error / sum;
  },
  
  /**
  * Mean Squared Logarithmic Error
  *
  * @param {number} target Ideal value
  * @param {number[]} output Actual values
  *
  * @returns {number} - [Mean squared logarithmic error](https://peltarion.com/knowledge-center/documentation/modeling-view/build-an-ai-model/loss-functions/mean-squared-logarithmic-error)
  *
  * @example
  * let { methods, Network } = require("@liquid-carrot/carrot");
  *
  * let myNetwork = new Network(5, 10, 5);
  * myNetwork.train(trainingData, {
  *   log: 1,
  *   iterations: 500,
  *   error: 0.03,
  *   rate: 0.05,
  *   cost: methods.cost.MSLE
  * });
  */
  MSLE: function (target, output) {
    const error = _.reduce(output, (total, value, index) => total += Math.log(Math.max(target[index], 1e-15)) - Math.log(Math.max(output[index], 1e-15)), 0)
    
    return error;
  },
  
  /**
  * Hinge loss, for classifiers
  *
  * @param {number} target Ideal value
  * @param {number[]} output Actual values
  *
  * @returns {number} - [Hinge loss](https://towardsdatascience.com/support-vector-machines-intuitive-understanding-part-1-3fb049df4ba1)
  *
  * @example
  * let { methods, Network } = require("@liquid-carrot/carrot");
  *
  * let myNetwork = new Network(5, 10, 5);
  * myNetwork.train(trainingData, {
  *   log: 1,
  *   iterations: 500,
  *   error: 0.03,
  *   rate: 0.05,
  *   cost: methods.cost.HINGE
  * });
  */
  HINGE: function (target, output) {
    const error = _.reduce(output, (total, value, index) => total += Math.max(0, 1 - target[index] * output[index]), 0)
    
    return error;
  }
};

module.exports = cost;