`use strict`

let _ = require('lodash')
let async = require('neo-async')
let Promise = require('bluebird')
let Neuron = require('./neuron')
let Connection = require('./connection')

/**
* Represents a Layer of Neurons.
* @constructor
* @param { object } props
* @param { array } options
*/
let Layer = function(props, options) {
  let neurons = []
  
  if(_.isLength(props)) {
    _.times(props, function() {
      neurons.push(new Neuron())
    })
  } else if(_.isArray(props)) {
    neurons = props
  } else if(_.isPlainObject(props)) {
    _.times(props.neurons.length, function() {
      neurons.push(new Neuron())
    })
  }
  
  return {
       neurons,
       // Make all neurons in the Layer generate an output value
       activate: function(inputs, callback) {
         let self = this
         return new Promise(function(resolve, reject) {
           return async.auto({
             "valid_array": function(callback) {
               _.isArray(inputs) && inputs.length === neurons.length ? callback(null, inputs) : inputs ? callback('Error at Layer.activate(): Invalid Parameter Received', null) : callback(null, false) 
             },
             "activate_neurons": ["valid_array", function(results, callback) {
               if(results.valid_array) {
                 async.eachOf(neurons, function(neuron, i, callback) {
                   neuron.activate(inputs[i])
                   callback()
                 }, callback)
               } else {
                 async.each(neurons, function(neuron, callback) {
                   neuron.activate()
                   callback()
                 }, callback)
               }
             }]
           }, function(error, results) {
             return callback ? callback(error, results.activate_neurons) : !error ? resolve(results.activate_neurons) : reject(error)
           })
         })
       },
       // Connects neurons in this Layer to an object's neuron(s)
       connect: function(object, callback) {
         let self = this
         return new Promise(function(resolve, reject) {
           return async.auto({
             "neuron": function(callback) {
               _.isArray(object.connections) ? callback(null, object) : callback(null, false)
             },
             "layer": function(callback) {
               _.isArray(object.neurons) ? callback(null, object.neurons) : callback(null, false)
             },
             "group": function(callback) {
               _.isPlainObject(object.neurons) ? callback(null, object.neurons) : callback(null, false)
             },
             "connect_neurons": ["neuron", "layer", "group", function(results, callback){    
              if(results.neuron) {
                async.each(self.neurons, function(self_neuron, callback) {
                 self_neuron.connect(results.neuron)
                 callback()
               }, callback)
              } else if(results.layer) {
                async.each(results.layer, function(target_neuron, callback) {
                  async.each(self.neurons, function(self_neuron, callback) {
                    self_neuron.connect(target_neuron)
                    callback()
                  }, callback)
                }, callback)
              } else if(results.group) {
                async.each(results.group, function(target_neuron, callback) {
                  async.each(self.neurons, function(self_neuron, callback) {
                    self_neuron.connect(target_neuron)
                    callback()
                  }, callback)
                }, callback)
              } else {
                callback('Error at Layer.connect(): Unsupported Parameter Received', null)
              }
             }],
           }, function(error, results) {
             return callback ? callback(error, self.neurons) : !error ? resolve(self.neurons) : reject(error)
           })
         })
       },
       // Add neurons to the layer
       add_neurons: function(neuronCount, callback) {
         let self = this
         return new Promise(function(resolve, reject) {
           return async.times(neuronCount, function(n, next) {
             next(null, neurons.push(new Neuron()))
           }, function(error, neurons){
             return callback ? callback(error, neurons) : !error ? resolve(neurons) : reject(neurons)
           })
         })
       },
       // Search for neurons with the supplied name
       get_neuron: function(name, callback) {
         let self = this
         return new Promise(function(resolve, reject) {
           return async.filter(neurons, function(neuron, callback) {
              callback(null, neuron.Name.toUpperCase() === name.toUpperCase())
           }, function(error, neurons) {
             return callback ? callback(error, neurons) : !error ? resolve(neurons) : reject(error)
           })
         })
       },
       // Returns the neuron with the highest axon value in this layer
       get_best: function(callback) {
         let self = this
         return new Promise(function(resolve, reject) {
           // Find neuron with heighest axon value
           return async.reduce(neurons, { "connections": [{ "forward": { "states": [0] } }] }, function(best, neuron, callback) {
             _.last(neuron.connections.forward.states) > _.last(best.connections.forward.states) ? callback(null, neuron) : callback(null, best)
           }, function(error, neuron) {
             return callback ? callback(error, neuron) : !error ? resolve(neuron) : reject(error)
           })
         })
       },
     }  
}

module.exports = Layer
