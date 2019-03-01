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