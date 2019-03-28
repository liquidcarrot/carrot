/**
*
* @module
*
* @namespace Methods
*
* @borrows @module activation as activation
* @borrows @module mutation as mutation
* @borrows @module selection as selection
* @borrows @module crossover as crossover
* @borrows @module cost as cost
* @borrows @module gating as gating
* @borrows @module connection as connection
* @borrows @module rate as rate
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
