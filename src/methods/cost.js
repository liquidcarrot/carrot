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
  * @param {number} target Ideal value
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
    let error = 0;
    for(let i = 0; i < output.length; i++) {
      // Avoid negative and zero numbers, use 1e-15
      error -= target[i] * Math.log(Math.max(output[i], 1e-15)) + (1 - target[i]) * Math.log(1 - Math.max(output[i], 1e-15));
    }
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
    let error = 0;
    for(let i = 0; i < output.length; i++) {
      error += Math.pow(target[i] - output[i], 2);
    }

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
    var misses = 0;
    for (var i = 0; i < output.length; i++) {
      misses += Math.round(target[i] * 2) !== Math.round(output[i] * 2);
    }

    return misses;
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
    var error = 0;
    for (var i = 0; i < output.length; i++) {
      error += Math.abs(target[i] - output[i]);
    }

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
    var error = 0;
    for (var i = 0; i < output.length; i++) {
      error += Math.abs((output[i] - target[i]) / Math.max(target[i], 1e-15));
    }

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
    var error = 0;
    var sumTarget = 0;
    for (var i = 0; i < output.length; i++) {
      error += Math.abs(target[i] - output[i]);
      sumTarget += target[i];
    }

     return error / sumTarget;
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
    var error = 0;
    for (var i = 0; i < output.length; i++) {
      error += Math.log(Math.max(target[i], 1e-15)) - Math.log(Math.max(output[i], 1e-15));
    }

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
    var error = 0;
    for (var i = 0; i < output.length; i++) {
      error += Math.max(0, 1 - target[i] * output[i]);
    }

    return error;
  }
};

module.exports = cost;
