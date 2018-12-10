'use strict'

let _ = require('lodash')
let async = require('neo-async')
// let math = require('mathjs')
let Promise = require('bluebird')
let Q = require('q')

// let parser = new math.parser()

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
const neuron = ({ connections = [], states = [] } = {}) => ({
  connections,
  states,
  inputs: function(callback) {
    return new Promise(function(resolve, reject) {
      return async.filter(self.connections, function(connection, callback) {
        callback(undefined, connection.to === self)
      }, function(error, inputs) {
        return callback ? callback(error, inputs) : !error ? resolve(inputs) : reject(error)
      })
    })
  },
  outputs: function(callback) {
    let self = this
    return new Promise(function(resolve, reject) {
      return async.filter(self.connections, function(connection, callback) {
        callback(undefined, connection.from === self)
      }, function(error, inputs) {
        return callback ? callback(error, inputs) : !error ? resolve(inputs) : reject(error)
      })
    })
  },
  project: function(neuron, callback) {
    let self = this
    return new Promise(function(resolve, reject) {
      return async.auto({
        "connection": function(callback) {
          callback(null, Connection({
            from: self,
            to: neuron
          }))
        },
        "neurons": ["connection", function(results, callback) {
          async.each([self, neuron], function(neuron, callback) {
            neuron.connections = _.concat(neuron.connections, results.connection)
            callback()
          }, callback)
        }],
      }, function(error, results) {
        return callback ? callback(error, results.connection) : !error ? resolve(results.connection) : reject(error)
      })
    })
  },
  run: function(inputs, callback) {
    let self = this
    return new Promise(function(resolve, reject) {
      return callback ? callback(null, Math.random()) : resolve(Math.random()) 
    })
//     let self = this
//     let sum = 0
//     let inputs = self.inputs.length
//     if(inputs.length > 0) {
//       let i = inputs.length;
//       while(i--){
//         sum += inputs[i].neuron.states[inputs[i].neuron.states.length-1] * inputs[i].weight;
//       }
//       states.push(squash(sum))
//     }
  },
  propagate: function(feedback, callback) {
   let self = this
    return new Promise(function(resolve, reject) {
      return callback ? callback(null, Math.random()) : resolve(Math.random()) 
    })
  }
})

module.exports = neuron
