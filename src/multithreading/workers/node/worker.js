
/*
 *
 * @private
 *
 */

// be careful about circular dependencies here
const {multi, methods} = require('../../../carrot');
const F = multi.activations;
let dataset = [];
let cost_function;

process.on('message', function(e) {
  if (e.serialized_dataset) {
    dataset = multi.deserializeDataSet(e.serialized_dataset);
  }
  if (e.cost_function) {
    // TODO: be careful with this eval. Must refactor and run in an IIFE to isolate cost_function
    // from the codebase.
    cost_function = e.cost_is_standard ? methods.cost[e.cost_function] : eval(e.cost_function);
  }

  if (e.conns) { // this means that activations, states, and conns were provided
    const A = e.activations;
    const S = e.states;
    const connections = e.conns;

    // the dataset does not have to be serialized. I think that only the data param
    const result = multi.testSerializedSet(dataset, cost_function, A, S, connections, F);

    process.send(result);
  }
});
