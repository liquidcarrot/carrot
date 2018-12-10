'use strict'

let _ = require('lodash')
let async = require('neo-async')
let Promise = require('bluebird')
let Connection = require('./connection')

/**
* CHECK: https://robertbeisicht.wordpress.com/2014/07/04/feed-forward-neural-network-in-javascript/
* CHECK: https://medium.com/javascript-scene/javascript-factory-functions-with-es6-4d224591a8b1
*/
const Neuron = (props) => {
  let connections, states
  
  if(!props) {
    connections = []
    states = []
  } else {
    // Check if neuron
    // Check if I/O Connections
  }
  
  return {
    connections,
    states,
    is_input: function(callback) {
      let self = this
      return new Promise(function(resolve, reject) {
        return async.auto({
          "inputs": self.inputs,
          "is_input": ["inputs", function(results, callback) {
            callback(null, results.inputs.length === 0)
          }]
        }, function(error, results) {
          return callback ? callback(error, results.is_input) : !error ? resolve(results.is_input) : reject(error)
        })
      })
    },
    is_output: function(callback) {
      let self = this
      return new Promise(function(resolve, reject) {
        return async.auto({
          "outputs": self.outputs,
          "is_output": ["outputs", function(results, callback) {
            callback(null, results.outputs.length === 0)
          }]
        }, function(error, results) {
          return callback ? callback(error, results.is_output) : !error ? resolve(results.is_output) : reject(error)
        })
      })
    },
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
    },
    propogate: function(feedback, callback) {
     let self = this
      return new Promise(function(resolve, reject) {
        return callback ? callback(null, Math.random()) : resolve(Math.random()) 
      })
    }
  }
}

module.exports = Neuron
