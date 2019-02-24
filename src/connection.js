'use strict'

let faker = require('faker')
let math = require('mathjs')

let random = {
  sign: () => Math.random() < 0.5 ? -1 : 1,
  number: () => math.bignumber(random.sign() * faker.random.number())
}

let Connection = function(props, options) {
  let self = this
  
  self.from = props ? (props.from || undefined) : undefined
  self.to = props ? (props.to || undefined) : undefined
  self.weight = math.bignumber(props ? (props.weight || random.number()) : random.number())
  
  // For aynchronous/non-blocking networks
  /*
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
  }*/
}

module.exports = Connection