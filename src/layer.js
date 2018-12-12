`use strict`

let _ = require('lodash')
let os = require('os')
let async = require('neo-async')
let Promise = require('bluebird')
let Neuron = require('./neuron')
let Connection = require('./connection')

const layer = function(props) {
  // CHECK: https://softwareengineering.stackexchange.com/questions/82593/javascript-ternary-operator-vs
  let neurons = []
  
  if(_.isLength(props)) {
    _.times(props, function() {
      neurons.push(Neuron())
    })
  } else if(_.isArray(props)) {
    neurons = props
  } else if(_.isPlainObject(props)) {
    _times(props.neurons.length, function() {
      neurons.push(Neuron())
    })
  }
  
  return {
       neurons,
       // create generic neurons, with an optional states parameter 
       createNeurons: (neuronCount, states) => {
         async.times(neuronCount, () => {
           neurons.push(Neuron({
             states
           }))
         })
       },
       //make all neurons in the layer generate an output value
       run: function(inputs, callback) {
         let self = this
         async.each(neurons, (neuron) => {
           neuron.run(inputs, callback)
         })
       },
       //connects a neuron with all the neurons in this layer 
       connectNeuron: function(neuron, callback) {
         let self = this
         async.each(neurons, (n) => {
           neuron.project(n, callback)
         })
       },
       //conditionally connects neurons in this layer to a neuron
       project: function(neuron, callback) {
         let self = this
         async.each(neurons, (n) => {
           n.project(neuron, callback)
         })
       },
       //search for a neuron with the supplied name
       getNeuron: function(name, callback) {
         let self = this
         name = name.toUpperCase();

         async.filter(neurons, (neuron, callback) => {
           neuron.Name.toUpperCase() === name ? callback(null, neuron) : null
         }, (err, res) => callback(res))
       },
       //returns the neuron with the highest axon value in this layer
       bestGuess: function(callback) {
         let self = this
         //find index of the neuron with heighest axon value
         async.reduce(neurons, {
           states: [0]
         }, (memo, neuron, callback) => {
           _.last(neuron.states) > _.last(memo.states) ? callback(null, neuron) : callback(null, memo)
         }, (err, res) => {
           return callback(null, res)
         })
       },
     }  
}

module.exports = layer
