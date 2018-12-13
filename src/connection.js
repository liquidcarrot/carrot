'use strict'

let Connection = function(props, options) {
  this.from
  this.to
  this.weight = Math.random()
  this.forward = {
    queue: [],
    done: []
  }
  this.backward = {
    queue: [],
    done: []
  }
  
  if(props) {
    this.from = props.from || this.from
    this.to = props.to || this.to
    this.weight = props.weight || this.weight
  }
}

module.exports = Connection