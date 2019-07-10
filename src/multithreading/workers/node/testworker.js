module.exports = TestWorker;

const cp = require('child_process');
const path = require('path');

const standard_cost_functions = require('../../../methods/cost');

let fork_port = 9230;

/**
* Creates a fork for running tests
*
* @todo Create a `Fork` `@class`
* @todo Add `@prop` tags
* @todo Add `@param` tag types
* @todo Add `@param` tag descriptions
* @todo Add `@param` tag defaults
* @todo Document `@param` tag "optional" or "required"
* @todo Add link to network.prototype.evolve for param serialized_dataset
*
* @private
*
* @constructs TestWorker
* @param {Array} serialized_dataset a dataset of the form Array<{input:number[],output:number[]}> serialized by multi.serializeDataSet. Read network.prototype.evolve dataset parameter.
* @param {Function} cost
*/
function TestWorker (serialized_dataset, cost_function) {
  // find out if in inspect mode. if so then run children in inspect mode as well
  const argv = process.execArgv.join();
  const is_debug = argv.includes('inspect') || argv.includes('debug');
  if (is_debug) {
    this.worker = cp.fork(path.join(__dirname, '/worker'), [], {
      execArgv: ['--inspect=' + (fork_port++)],
      // using this option activates inspector only when inspector is running on parent
    });
  } else {
    this.worker = cp.fork(path.join(__dirname, '/worker'));
  }

  const cost_is_standard = cost_function.name in standard_cost_functions;

  // send the initialization (ie 'constructor') info
  this.worker.send({
      serialized_dataset: serialized_dataset,
      cost_function: cost_is_standard ? cost_function.name : cost_function.toString(),
      cost_is_standard,
    });
}

TestWorker.prototype = {
  /**
  * @todo Create a function description
  * @todo Add `@returns` tag
  * @todo Add `@param` tag types
  * @todo Add `@param` tag descriptions
  * @todo Add `@param` tag defaults
  * @todo Document `@param` tag "optional" or "required"
  *
  * @param network
  */
  evaluate: function (network) {
    return new Promise((resolve, reject) => {
      var serialized = network.serialize();

      var data = {
        activations: serialized[0],
        states: serialized[1],
        conns: serialized[2]
      };

      var _that = this.worker;
      this.worker.on('message', function callback (e) {
        _that.removeListener('message', callback);
        resolve(e);
      });

      this.worker.send(data);
    });
  },

  /**
  * @todo Create a function description
  */
  terminate: function () {
    this.worker.kill();
  }
};
