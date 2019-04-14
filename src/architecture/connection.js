/**
* A connection instance describes the connection between two nodes. If you're looking for connections between [Groups](Group) please see [Connection Methods](connection)
*
* @todo Add `@prop` tag descriptions
* @todo Add `@param` tag descriptions
*
* @constructs Connection
*
* @param {Node} from Connection origin node (neuron)
* @param {Node} to Connection destination node (neuron)
* @param {number} [weight] Weight of the connection
*
* @prop {Node} from
* @prop {Node} to
* @prop {number} weight=
* @prop {Node} gater=null The node gating this connection
* @prop {number} gain=1 Used for gating, gets multiplied with weight
* @prop {number} elegibility=0
* @prop {number} previousDeltaWeight=0
* @prop {number} totalDeltaWeight=0
* @prop {object} xtrace
* @prop {Node[]} xtrace.nodes
* @prop {number[]} xtrace.values
*
* @see {@link connection|Connection Methods}
* @see {@link Node|Node}
*/
function Connection (from, to, weight) {
  this.from = from;
  this.to = to;
  this.gain = 1;

  this.weight = (typeof weight === 'undefined') ? Math.random() * 0.2 - 0.1 : weight;

  this.gater = null;
  this.elegibility = 0;

  // For tracking momentum
  this.previousDeltaWeight = 0;

  // Batch training
  this.totalDeltaWeight = 0;

  this.xtrace = {
    nodes: [],
    values: []
  };
}

Connection.prototype = {
  /**
   * Converts the connection to a json object
   *
   * @memberof Connection
   *
   * @returns {object} A connection represented as a JSON object
   */
  toJSON: function () {
    var json = {
      weight: this.weight
    };

    return json;
  }
};

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
  return 1 / 2 * (a + b) * (a + b + 1) + b;
};

module.exports = Connection;
