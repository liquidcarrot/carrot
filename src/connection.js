const _ = require("lodash");

const { parameter } = require("../util");

/**
 * Connections help neurons inter-connect and create networks.
 * Neural networks can be used to solve a large set of problems.
 *
 * @constructs Connection
 *
 * @param {Neuron} from Source neuron
 * @param {Neuron} to Destination neuron
 * @param {number} [weight] Connection weight (importance)
 */
function Connection(from=parameter.is.required("from"), to=parameter.is.required("to"), weight=_.random(-1,1,true)) {
  _.assignIn(this, { from, to, weight});
}

module.exports = Connection;