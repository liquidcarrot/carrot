
/*
 *
 * @private
 *
 */

// be careful about circular dependencies here
const { multi, methods } = require('../../../carrot');
const F = multi.activations;
let dataset = [];
let cost_function;

process.on('message', function (e) {
  const env = process.env;
  // console.log('@worker, env.serialized_dataset:', env.serialized_dataset);
  // console.log('@worker, env.serialized_dataset_json:', env.serialized_dataset_json);
  // console.log('@worker, e.serialized_dataset:', e.serialized_dataset);
  if (e.serialized_dataset) {
    dataset = multi.deserializeDataSet(e.serialized_dataset);
    // console.log('@worker, dataset:', dataset);
  }
  if (e.cost_function) {
    // TODO: be careful with this eval. Must refactor and run in an IIFE to isolate cost_function
    // from the codebase.
    cost_function = e.cost_is_standard ? methods.cost[e.cost_function] : eval(e.cost_function);
    // console.log('@worker, cost_function:', cost_function);
  }
  // throw new Error('lolololol');

  if (e.conns) { // this means that activations, states, and conns were provided
    // throw new Error('lolololol');

    var A = e.activations;
    var S = e.states;
    var data = e.conns;

    // the dataset does not have to be serialized. I think that only the data param
    var result = multi.testSerializedSet(dataset, cost_function, A, S, data, F);

    process.send(result);
  }
});
