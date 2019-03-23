/**
* @todo Create a namespace description
*
* @namespace
* @todo Add `@borrows` tags.
*/
var methods = {
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
