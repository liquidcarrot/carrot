'use strict'

let Connection = function(props, options) {
  let self = this
  
  self.from = props ? (props.from || undefined) : undefined
  self.to = props ? (props.to || undefined) : undefined
  self.weight = props ? (props.weight || Math.random()) : Math.random()
  
  self.forward = {
    queue: [],
    states: []
  }
  self.backward = {
    queue: [],
    states: []
  }
  
  if(props) {
    self.forward = props.forward || self.forward
    self.backward = props.backward || self.backward
  }
}

module.exports = Connection