'use strict'

let _ = require('lodash')
let faker = require('faker')
let chalk = require('chalk')
let async = require('neo-async')
let Promise = require('bluebird')

let Connection = function({ from, to, weight = Math.random() * 2 - 1 } = {}) {
  _.assignIn(this, { from, to, weight })
}

module.exports = Connection