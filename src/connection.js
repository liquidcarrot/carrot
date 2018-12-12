'use strict'

module.exports = function(props, options) {
  let from = []
  let to = []
  let weight = Math.random()
  
  if(props) {
    from = props.from || from
    to = props.to || to
    weight = props.weight || weight
  }
  
  return {
    from,
    to,
    weight,
    forward: [],
    backward: [],
  }
}