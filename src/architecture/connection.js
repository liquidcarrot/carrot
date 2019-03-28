/*******************************************************************************
                                      CONNECTION
*******************************************************************************/

/**
* @todo Create a class description
* @todo Add `@prop` tag types
* @todo Add `@prop` tag descriptions
* @todo Add `@prop` tag defaults
* @todo Add `@param` tag types
* @todo Add `@param` tag descriptions
* @todo Add `@param` tag defaults
*
* @class Connection
*
* @param {Node} from
* @param {Node} to
* @param {number} [weight=]
* @prop {Node} from
* @prop {Node} to
* @prop {number} gain
* @prop {number} weight
* @prop {null} gater
* @prop {number} elegibility
* @prop {number} previousDeltaWeight
* @prop {number} totalDeltaWeight
*
* @typedef xtrace
* @type {object}
* @property {Node[]} nodes
* @property {number[]} values
*
* @prop {xtrace} xtrace
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
   * @returns {object}
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
* @param {number} a - An Integer >= 0 (Natural number)
* @param {number} b - An Integer >= 0 (Natural number)
*
* @returns {number} - An Integer that uniquely represents a pair of Integers
*/
Connection.innovationID = function (a, b) {
  return 1 / 2 * (a + b) * (a + b + 1) + b;
};

module.exports = Connection;
