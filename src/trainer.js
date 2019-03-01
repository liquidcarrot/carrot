let _ = require('lodash')

let Trainer = function(network, {
  rate = 0.2,
  iterations = 100000,
  error = 0.005,
  cost = Trainer.cost.MSE,
  crossValidate,
  schedule
} = {}) {
  _.assignIn(this, { network, rate, iterations, error, cost, crossValidate, schedule });
  
  /**
  * Trains a network on the given set
  *
  * @param {Object[]} set
  * @param {Object} [options]
  * @param {Network} [options.network]
  * @param {number} [options.rate]
  * @param {number} [options.iterations]
  * @param {number} [options.error]
  */
  this.train = function(set, options) {
    _.assignIn(this, options)
    
    let error = 1;
    let iterations = -1;
    let start = new Date();

    while (++iterations < this.iterations && error > this.error) {
      error = this._trainSet(set, this.rate, cost) / set.length;
    }

    return { error, iterations, time: Date.now() - start };
  }

  /** 
  * Returns the error of one training epoch
  *
  * @param {Object[]} set
  * @param {number} currentRate
  * @param {CostFunction} costFunction
  */
  this._trainSet = function(set, currentRate, costFunction) {
    let self = this;
    let error = 0;
    
    _.each(set, function(target) {
      let output = self.network.activate(target.input);
      self.network.propagate(currentRate, target.output);
      
      error += costFunction(target.output, output);
    });
    
    return error;
  }
  
  /**
  * Trains an XOR network
  * 
  * @param {number} [iterations]
  * @param {boolean} [log]
  * @param {boolean} [shuffle]
  * @param {CostFunction} [cost]
  */
  this.XOR = function({
    iterations = 100000,
    log = false,
    shuffle = true,
    cost = Trainer.cost.MSE
  } = {}) {
    if(this.network.inputs() != 2 || this.network.outputs() != 1) throw new Error('Incompatible network (2 inputs, 1 output)');

    return this.train([{
      input: [0, 0],
      output: [0]
    }, {
      input: [1, 0],
      output: [1]
    }, {
      input: [0, 1],
      output: [1]
    }, {
      input: [1, 1],
      output: [0]
    }], { iterations, log, shuffle, cost });
  }
}