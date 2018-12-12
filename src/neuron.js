'use strict'

let _ = require('lodash')
let async = require('neo-async')
let Promise = require('bluebird')
let Connection = require('./connection')

/**
* CHECK: https://robertbeisicht.wordpress.com/2014/07/04/feed-forward-neural-network-in-javascript/
* CHECK: https://medium.com/javascript-scene/javascript-factory-functions-with-es6-4d224591a8b1
*/
const Neuron = function(props, options) {
  let connections = []
  let states = []
  let activate = function(inputs, callback) {
    let self = this
    return new Promise(function(resolve, reject) {
      async.auto({
        "activate": function(callback) {
          callback(null, Math.random())
        }
      }, function(error, results) {
        return callback ? callback(error, results.activate) : !error ? resolve(results.activate) : reject(error)
      })
    })
  }
  let learn = function(feedback, callback) {
    let self = this
    return new Promise(function(resolve, reject) {
      async.auto({
        "learn": function(callback) {
          callback(null, Math.random())
        }
      }, function(error, results) {
        return callback ? callback(error, results.learn) : !error ? resolve(results.learn) : reject(error)
      })
    })
  }

  if(props) {
    activate = props.activate || activate
    learn = props.learn || learn
  }
  
  return {
    connections,
    states,
    activate,
    learn,
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
      let self = this
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
    connect: function(neuron, callback) {
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
    forward: function(value, callback) {
      let self = this
      return new Promise(function(resolve, reject) {
        async.auto({
          "outputs": function(callback) {
            self.outputs(callback)
          },
          "forward": ["outputs", function(results, callback) {
            async.each(results.outputs, function(output, callback) {
              output.forward.push(value)
              callback()
            }, callback)
          }]
        }, function(error, results) {
          return callback ? callback(error, results.outputs) : !error ? resolve(results.outputs) : reject(error)
        })
      })
    },
    backward: function(value, callback) {
      let self = this
      return new Promise(function(resolve, reject) {
        async.auto({
          "inputs": function(callback) {
            self.inputs(callback)
          },
          "backward": ["inputs", function(results, callback) {
            async.each(results.inputs, function(input, callback) {
              input.forward.push(value)
              callback()
            }, callback)
          }]
        }, function(error, results) {
          return callback ? callback(error, results.inputs) : !error ? resolve(results.inputs) : reject(error)
        })
      })
    }
  }
}

module.exports = Neuron

// Function Supprt Type = First Thing Checked
// Function Flow Depends on Function Type

// No support for synchronous code
// Will break application due to execution time
// User education via best practices - only

// Cannot support streams and promise/callback in the same function
// because streams are objects which would require a promise/callback
// to be exported/imported

// Need stream, async, and sync function for same actions seperately.