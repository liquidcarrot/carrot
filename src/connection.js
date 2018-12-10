'use strict'

module.exports = ({ from, to, weight = Math.random() } = {}) => ({
  from,
  to,
  weight
})