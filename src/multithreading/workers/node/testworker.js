module.exports = TestWorker;

var cp = require('child_process');
var path = require('path');

/**
* Creates a fork for running tests
*
* @todo Create a `Fork` `@class`
* @todo Add `@prop` tags
* @todo Add `@param` tag types
* @todo Add `@param` tag descriptions
* @todo Add `@param` tag defaults
* @todo Document `@param` tag "optional" or "required"
*
* @private
*
* @constructs TestWorker
* @param dataSet
* @param cost
*/
function TestWorker (dataSet, cost) {
  this.worker = cp.fork(path.join(__dirname, '/worker'));

  this.worker.send({ set: dataSet, cost: cost.name });
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
