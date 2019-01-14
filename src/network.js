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
      let layers = _.map(props, prop => new Layer(prop))
      
      _.times(layers.length - 1,  index => {
        _.every(layers[index].neurons, (source_neuron, i, source_neurons) => {
          _.every(layers[index + 1].neurons, (destination_neuron, j, destination_neurons) => {
            let connection = new Connection({
              from: source_neuron,
              to: destination_neuron,
            })
            
            source_neuron.connections
          })
        })
      })
    }
    // Constructing with new Network([Layer])
    else if(_.every(props, prop => prop instanceof Layer)) {
      _.each(_.slice(props, 1), function(layer, index) {
        let other_layer = new Layer(layer, {
          connections: {
            incoming: props[index]
          }
        })
        
        self.neurons = _.concat(self.neurons, other_layer.neurons)
      })
//       _.reduce(_.slice(props, 1), function(_.first(props), layer, index) {
        
//       })
    }
    // Constructing with new Network([Neuron])
    else if(_.every(props, prop => prop instanceof Neuron)) {
      
    }
  }
  
  self.activate = function(results, callback) {
    
  }
  
  self.propogate = function(feedback, callback) {
    
  }
}

module.exports = Network