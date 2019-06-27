const _ = require("lodash");

/**
* A connection instance describes the connection between two nodes. If you're looking for connections between [Groups](Group) please see [Connection Methods](connection)
*
* @constructs Connection
*
* @param {Node} from Connection origin node (neuron)
* @param {Node} to Connection destination node (neuron)
* @param {number} [weight=random] Weight of the connection
* @param {Object} [options]
* @param {number} [options.gain=1]
* @parma {Node} [options.gater]
*
* @prop {Node} from Connection origin node (neuron)
* @prop {Node} to Connection destination node (neuron)
* @prop {number} weight=random Weight of the connection
* @prop {number} gain=1 Used for gating, gets multiplied with weight
* @prop {Node} gater=null The node gating this connection
* @prop {number} elegibility=0
* @prop {Node[]} xtrace_nodes
* @prop {number[]} xtrace_values
* @prop {number[]} delta_weights
* @prop {number} delta_weights_previous=0 Tracks [momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html)
* @prop {number} delta_weights_total=0 Tracks [momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html) - _for [batch training](https://www.quora.com/What-is-the-difference-between-batch-online-and-mini-batch-training-in-neural-networks-Which-one-should-I-use-for-a-small-to-medium-sized-dataset-for-prediction-purposes)_
*
* @see {@link connection|Connection Methods}
* @see {@link Node|Node}
*/
function Connection (from, to, weight, options) {
  if(from == undefined || to == undefined) throw new ReferenceError("Missing required parameter 'from' or 'to'");
  
  let self = this;
  
  // CHECK: https://gist.github.com/Salakar/1d7137de9cb8b704e48a
  if(!options && _.isPlainObject(weight)) {
    options = weight;
    weight = undefined;
  }
  
  options = options || {};
  weight = weight || Math.random() * 2 - 1,
  
  Object.assign(self, {
    gain: 1,
    gater: null,
    elegibility: 0,
    delta_weights_previous: 0,
    delta_weights_total: 0,
    delta_weights: [],
    xtrace_nodes: [],
    xtrace_values: []
  }, options, { from, to, weight});
  
  if(options.gater) options.gater.gate(self);
  
  /**
  * Returns the connection as a JSON
  *
  * @function toJSON
  * @memberof Connection
  *
  * @returns {object} Returns connection as a JSON
  */
  self.toJSON = function () {
    return { weight } = self;
  }
}

/**
* Returns an innovation ID
*
* @see {@link https://en.wikipedia.org/wiki/Pairing_function (Cantor pairing function)|Pairing function (Cantor pairing function)}
*
* @param {number} a - A [natural number](https://en.wikipedia.org/wiki/Natural_number), which is an integer greater than or equal to zero
* @param {number} b - A [natural number](https://en.wikipedia.org/wiki/Natural_number), which is an integer greater than or equal to zero
*
* @returns {number} - An Integer that uniquely represents a pair of Integers
*/
Connection.innovationID = function (a, b) {
  if(a == undefined || b == undefined) throw new ReferenceError("Missing required parameter 'a' or 'b'");
  
  return 1 / 2 * (a + b) * (a + b + 1) + b;
};



module.exports = Connection;