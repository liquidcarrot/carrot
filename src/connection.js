'use strict'

let _ = require('lodash')

/**
* @constructs Connection
* @param {Neuron} from
* @param {Neuron} to
* @param {number} [weight]
*/
let Connection = function({ from, to, weight = Math.random() * 2 - 1 } = {}) {
  _.assignIn(this, { from, to, weight })
}

module.exports = Connection