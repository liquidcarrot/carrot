module.exports = TestWorker;

var multi = require('../../multi');

/**
* Creates a web worker process for running tests
*
* @todo Create a `Webworker` `@class`
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
  var blob = new Blob([this._createBlobString(cost)]);
  this.url = window.URL.createObjectURL(blob);
  this.worker = new Worker(this.url);

  var data = { set: new Float64Array(dataSet).buffer };
  this.worker.postMessage(data, [data.set]);
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
        activations: new Float64Array(serialized[0]).buffer,
        states: new Float64Array(serialized[1]).buffer,
        conns: new Float64Array(serialized[2]).buffer
      };

      this.worker.onmessage = function (e) {
        var error = new Float64Array(e.data.buffer)[0];
        resolve(error);
      };

      this.worker.postMessage(data, [data.activations, data.states, data.conns]);
    });
  },

  /**
  * @todo Create a function description
  */
  terminate: function () {
    this.worker.terminate();
    window.URL.revokeObjectURL(this.url);
  },

  /**
  * @todo Create a function description
  * @todo Add `@returns` tag
  * @todo Add `@param` tag types
  * @todo Add `@param` tag descriptions
  * @todo Add `@param` tag defaults
  * @todo Document `@param` tag "optional" or "required"
  *
  * @param cost
  */
  _createBlobString: function (cost) {
    var source = `
      var F = [${multi.activations.toString()}];
      var cost = ${cost.toString()};
      var multi = {
        deserializeDataSet: ${multi.deserializeDataSet.toString()},
        testSerializedSet: ${multi.testSerializedSet.toString()},
        activateSerializedNetwork: ${multi.activateSerializedNetwork.toString()}
      };

      this.onmessage = function (e) {
        if(typeof e.data.set === 'undefined'){
          var A = new Float64Array(e.data.activations);
          var S = new Float64Array(e.data.states);
          var data = new Float64Array(e.data.conns);

          var error = multi.testSerializedSet(set, cost, A, S, data, F);

          var answer = { buffer: new Float64Array([error ]).buffer };
          postMessage(answer, [answer.buffer]);
        } else {
          set = multi.deserializeDataSet(new Float64Array(e.data.set));
        }
      };`;

    return source;
  }
};
