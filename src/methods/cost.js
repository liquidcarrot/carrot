const _ = require("lodash");

function validate(targets, outputs) {
  if(targets == undefined || outputs == undefined) throw new ReferenceError("Missing at least one required parameters: `targets`, `outputs`");
  
  targets = Array.isArray(targets) ? targets : [targets];
  outputs = Array.isArray(outputs) ? outputs : [outputs];
  
  if(targets.length !== outputs.length) throw new RangeError(`Required "targets.length === outputs.length"; Received "targets.length=${targets.length}" & "outputs.length=${outputs.length}`);
  
  return [targets, outputs];
}

/**
 * Cost functions play an important role in neural networks. They give neural networks an indication of 'how wrong' they are; a.k.a. how far they are from the desired outputs. Also in fitness functions, cost functions play an important role.
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
  * @param {number[]|number} targets Ideal value
  * @param {number[]|number} outputs Actual values
  *
  * @returns {number} [Cross entropy error](https://ml-cheatsheet.readthedocs.io/en/latest/loss_functions.html)
  *
  * @example
  * let { methods, Network } = require("@liquid-carrot/carrot");
  *
  * let myNetwork = new Network(5, 10, 5);
  * myNetwork.train(trainingData, { cost: methods.cost.CROSS_ENTROPY });
  */
  CROSS_ENTROPY: function(targets, outputs) {
    [targets, outputs] = validate(targets, outputs);
    
    const error = outputs.reduce(function(total, value, index) {
      return total -= targets[index] * Math.log(Math.max(outputs[index], 1e-15)) + (1 - targets[index]) * Math.log(1 - Math.max(outputs[index], 1e-15))
    }, 0)
    
    // const error = _.reduce(outputs, (total, value, index) => total -= targets[index] * Math.log(Math.max(outputs[index], 1e-15)) + (1 - targets[index]) * Math.log(1 - Math.max(outputs[index], 1e-15)), 0)
    
    return error / outputs.length;
  },
  
  /**
  * Mean Squared Error
  *
  * @param {number[]|number} targets Ideal value
  * @param {number[]|number} outputs Actual values
  *
  * @returns {number} [Mean squared error](https://medium.freecodecamp.org/machine-learning-mean-squared-error-regression-line-c7dde9a26b93)
  *
  * @example
  * let { methods, Network } = require("@liquid-carrot/carrot");
  *
  * let myNetwork = new Network(5, 10, 5);
  * myNetwork.train(trainingData, { cost: methods.cost.MSE });
  */
  MSE: function(targets, outputs) {
    [targets, outputs] = validate(targets, outputs);
    
    const error = _.reduce(outputs, (total, value, index) => total += Math.pow(targets[index] - outputs[index], 2), 0)
    
    return error / outputs.length;
  },
  
  /**
  * Binary Error
  *
  * @param {number[]|number} targets Ideal value
  * @param {number[]|number} outputs Actual values
  *
  * @returns {number} misses The amount of times targets value was missed
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
  BINARY: function(targets, outputs) {
    [targets, outputs] = validate(targets, outputs);
    
    const error = _.reduce(outputs, (total, value, index) => total += Math.round(targets[index] * 2) !== Math.round(outputs[index] * 2), 0)
    
    return error;
  },
  
  /**
  * Mean Absolute Error
  *
  * @param {number[]|number} targets Ideal value
  * @param {number[]|number} outputs Actual values
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
  MAE: function(targets, outputs) {
    [targets, outputs] = validate(targets, outputs);
    
    const error = _.reduce(outputs, (total, value, index) => total += Math.abs(targets[index] - outputs[index]), 0)
    
    return error / outputs.length;
  },
  
  /**
  * Mean Absolute Percentage Error
  *
  * @param {number[]|number} targets Ideal value
  * @param {number[]|number} outputs Actual values
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
  MAPE: function(targets, outputs) {
    [targets, outputs] = validate(targets, outputs);
    
    const error = _.reduce(outputs, (total, value, index) => total += Math.abs((outputs[index] - targets[index]) / Math.max(targets[index], 1e-15)), 0)
    
    return error / outputs.length;
  },
  
  /**
  * Weighted Absolute Percentage Error (WAPE)
  *
  * @param {number[]|number} targets Ideal value
  * @param {number[]|number} outputs Actual values
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
  WAPE: function(targets, outputs) {
    [targets, outputs] = validate(targets, outputs);
    
    let error = 0;
    let sum = 0;
    
    _.times(outputs.length, (index) => {
      error += Math.abs(targets[index] - outputs[index]);
      sum += targets[index];
    })
    
     return error / sum;
  },
  
  /**
  * Mean Squared Logarithmic Error
  *
  * @param {number[]|number} targets Ideal value
  * @param {number[]|number} outputs Actual values
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
  MSLE: function(targets, outputs) {
    [targets, outputs] = validate(targets, outputs);
    
    const error = _.reduce(outputs, (total, value, index) => total += Math.log(Math.max(targets[index], 1e-15)) - Math.log(Math.max(outputs[index], 1e-15)), 0)
    
    return error;
  },
  
  /**
  * Hinge loss, for classifiers
  *
  * @param {number[]|number} targets Ideal value
  * @param {number[]|number} outputs Actual values
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
  HINGE: function(targets, outputs) {
    [targets, outputs] = validate(targets, outputs);
    
    const error = _.reduce(outputs, (total, value, index) => total += Math.max(0, 1 - targets[index] * outputs[index]), 0)
    
    return error;
  }
};

module.exports = cost;