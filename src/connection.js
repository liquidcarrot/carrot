'use strict'

let Connection = function(props, options) {
  this.from
  this.to
  this.weight = Math.random()
  this.forward = {
    queue: [],
    states: []
  }
  this.backward = {
    queue: [],
    states: []
  }
  
  if(props) {
    this.from = props.from || this.from
    this.to = props.to || this.to
    this.weight = props.weight || this.weight
    this.forward = props.forward || this.forward
    this.backward = props.backward || this.backward
  }
}

module.exports = Connection