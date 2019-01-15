'use strict'

let _ = require('lodash')
let async = require('neo-async')
let Promise = require('bluebird')
let Neuron = require('./neuron')
let Connection = require('./connection')
let Layer = require('./layer')

let Network = function(props, options) {
  let self = this
  
  self.neurons = []
  
  if(props) {
    // Constructing with new Network([n, n, n])
    if(_.every(props, prop => _.isLength(prop))) {
      props = Array.from(props)
      
      self.neurons = _.flatten(_.map(props, function(length, index, layers) {
        if(index === 0) {
          props[index] = new Layer(length)
          return props[index].neurons
        } else {
          props[index] = new Layer(length, {
            connections: {
              incoming: layers[index - 1]
            }
          })
          return props[index].neurons
        }
      }))
    }
    // Constructing with new Network([Layer])
    else if(_.every(props, prop => prop instanceof Layer)) {
      props = Array.from(props)
      
      self.neurons = _.flatten(_.map(props, function(layer, index, layers) {
        if(index === 0) {
          props[index] = new Layer(layer)
          return props[index].neurons
        } else {
          props[index] = new Layer(layer, {
            connections: {
              incoming: layers[index - 1]
            }
          })
          return props[index].neurons
        }
      }))
    }
    // Constructing with new Network([Neuron])
    else if(_.every(props, prop => prop instanceof Neuron)) {
      props = Array.from(props)
      
      self.neurons = _.map(props, function(neuron) {
        return new Neuron(neuron)
      })
    }
  }
  
  self.activate = function(results, callback) {
    
  }
  
  self.propogate = function(feedback, callback) {
    
  }
}

module.exports = Network