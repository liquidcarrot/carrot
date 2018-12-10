`use strict`

let _ = require('lodash')
let async = require('neo-async')
let Promise = require('bluebird')
let Neuron = require('./neuron')
let Connection = require('./connection')


const layer = ({ neurons = [], } = {}) => ({
   neurons,
   // create generic neurons, with an optional states parameter 
   createNeurons: (neuronCount, states) => { 
     async.times(neuronCount, ()=>{ neurons.push(Neuron({ states })) }) 
   },
    //make all neurons in the layer generate an output value
    run: function(inputs, callback) {
      let self = this
      async.each(neurons, (neuron)=>{ neuron.run(inputs, callback) })
    },
    //connects a neuron with all the neurons in this layer 
    connectNeuron: function(neuron, callback) {
      let self = this
      async.each(neurons, (n) => { 
        neuron.project(n, callback) 
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
      async.reduce(neurons, {states: [0]}, (memo, neuron, callback) => {
        _.last(neuron.states) > _.last(memo.states) ? callback(null, neuron) : callback(null, memo)
      }, (err, res) => {
        return callback(null, res)
      })
    },
})

module.exports = layer

// TESTS

const n0 = Neuron({ connections: ['input'], states: [0.01] })
const n1 = Neuron({ connections: ['input'], states: [0.01] })
const n2 = Neuron({ connections: ['input'], states: [0.01] })
const n3 = Neuron({ connections: [n0, n1, n2], states: [0.01] })

console.log('\n' + 'neuron (to be connected) connections:')
async.times(n3.connections.length, (i)=>{ console.log(n3.connections[i]) }) 

const l0 = layer({})

l0.createNeurons(3, [0.02,0.9,0.8])

console.log('\n' + 'layer neurons (to be connected) connections:')
async.times(l0.neurons.length, (i)=>{ console.log(l0.neurons[i].connections) }) 

l0.connectNeuron(n3)

console.log('\n' + 'neuron (post-connection) connections:') // neuron should have 3 connections from itself to neurons within layer
async.times(n3.connections.length, (i)=>{ console.log(n3.connections[i]) }) 

console.log('\n' + 'layer (post-connection) connections:') // each layer neurons should have 1 connection from n3 to itself
async.times(l0.neurons.length, (i)=>{ console.log(l0.neurons[i].connections) })

l0.run([0.2,0.2,0.2], (err, res)=>{console.log(err, res)})

l0.bestGuess((err, res)=>{ console.log(res) })
