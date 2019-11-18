/**
*
* @namespace Methods
*
* @private
*
* @prop activation
* @prop mutation
* @prop selection
* @prop crossover
* @prop cost
* @prop gating
* @prop connection
* @prop rate
*/
const methods = {
  activation: require('./activation'),
  mutation: require('./mutation'),
  selection: require('./selection'),
  crossover: require('./crossover'),
  cost: require('./cost'),
  gating: require('./gating'),
  connection: require('./connection'),
  rate: require('./rate')
};

module.exports = methods;
