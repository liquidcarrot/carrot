module.exports = Connection;

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
* @param from
* @param to
* @param [weight]
* @prop from
* @prop to
* @prop gain
* @prop weight
* @prop gater
* @prop elegibility
* @prop previousDeltaWeight
* @prop totalDeltaWeight
* @prop xtrace
* @prop xtrace.nodes
* @prop xtrace.values
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
* @todo Add `@param` tag types
* @todo Add `@param` tag descriptions
* @todo Add `@param` tag defaults
* @todo Document `@param` tag "optional" or "required"
*
* @see {@link https://en.wikipedia.org/wiki/Pairing_function (Cantor pairing function)|Pairing function (Cantor pairing function)}
*
* @param a
* @param b
*
* @return {number}
*/
Connection.innovationID = function (a, b) {
  return 1 / 2 * (a + b) * (a + b + 1) + b;
};
