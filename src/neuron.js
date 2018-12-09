'use strict'

let _ = require('lodash')
let async = require('async')
let math = require('mathjs')
let Promise = require('bluebird')
let Q = require('q')

let parser = new math.parser()

let Connection = require('./connection')

/**
* 
* Stateless factory-function with defaults
*
* Dendrites = Inputs
* Axons = Outputs
*
* CHECK: https://robertbeisicht.wordpress.com/2014/07/04/feed-forward-neural-network-in-javascript/
* CHECK: https://medium.com/javascript-scene/javascript-factory-functions-with-es6-4d224591a8b1
*/
const neuron = ({ inputs = [], outputs = [], states = [0.1], squash = (sum) => (1 / (1 + Math.exp(-sum))) } = {}) => ({
  inputs,
  states,
  squash,
  activate: () => {
    let sum = 0
    if(inputs.length > 0){
      let i = inputs.length;
      while(i--){
        sum += inputs[i].neuron.states[inputs[i].neuron.states.length-1] * inputs[i].weight;
      }
      states.push(squash(sum))
    }
  },
})
// inputs
let n0 = neuron({})
let n1 = neuron({})
let n2 = neuron({})
// layer 1
let n3 = neuron({})
let n4 = neuron({})
let n5 = neuron({})
// outputs
let n6 = neuron({})
let n7 = neuron({})
let n8 = neuron({})


let c0 = Connection(n0, 0.3)
let c1 = Connection(n1, 0.4)
let c2 = Connection(n2, 0.44)
let c3 = Connection(n3, 0.99)
let c4 = Connection(n4, 0.76)
let c5 = Connection(n5, 0.23)
let c32 = Connection(n3, 0.2)
let c42 = Connection(n4, 0.5)
let c52 = Connection(n5, 0.7)

n3.inputs.push(c0, c1, c2, c52)
console.log(n0, n1, n2, n3)
n4.inputs.push(c0, c1, c2, c32)
console.log(n1, n2, n3, n4)
n5.inputs.push(c0, c1, c2, c42)

n6.inputs.push(c32, c4, c52)
n7.inputs.push(c3, c4, c5)
n8.inputs.push(c3, c42, c2)

let layer1 = [n3, n4, n5]
let outputs = [n6, n7, n8]

let iterate = (a, fn) => {
  let i = a.length
  while(i--){
    fn(a[i])
  }
}

iterate(layer1, (neuron)=>{neuron.activate()})
iterate(layer1, (neuron)=>{console.log(neuron.states)})

iterate(outputs, (neuron)=>{neuron.activate()})
iterate(outputs, (neuron)=>{console.log(neuron.states)})

iterate(layer1, (neuron)=>{neuron.activate()})
iterate(layer1, (neuron)=>{console.log(neuron.states)})

iterate(outputs, (neuron)=>{neuron.activate()})
iterate(outputs, (neuron)=>{console.log(neuron.states)})

let activation = {
  SIGMOID: "function f(x) = 1; x > 0",
  STEP: "function f(x) = 1; x > 0",
  LINEAR: "function f(x) = x"
}
