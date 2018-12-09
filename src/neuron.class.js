'use strict'

/**
* Dendrites = Inputs
* Axons = Outputs
*
* CHECK: https://robertbeisicht.wordpress.com/2014/07/04/feed-forward-neural-network-in-javascript/
*/

let _ = require('lodash')
let async = require('async')
let math = require('mathjs')

let Connection = require('./connection')

let parser = new math.parser()

class Neuron {
  contructor(props) {
    super(props)
    
    this.connections = []
    this.signals = []
    this.decisions = []
    this.squash = parser.eval(props.squash) || parser.eval(Neuron.activation.SIGMOID)
  }
  
  project(neuron, callback) {
    let self = this
    
    let connection = new Connection({
      from: self,
      to: neuron
    })
    
    self.connections.push(connection)
    neuron.connections.push(connection)
    
    callback(null, connection)
  }
  
  inputs(callback) {
    let self = this
    
    async.filter(self.connections, function(connection, callback) {
      callback(null, connection.to === self)
    }, callback)
  }
  
  outputs(callback) {
    let self = this
    
    async.filter(self.connections, function(connection, callback) {
      callback(null, connection.from === self)
    }, callback)
  }
  
  activate(inputs, callback) {
    if(!callback) {
      callback = inputs
      inputs = null
    }
    
    
  }
}

// CHECK: https://forums.meteor.com/t/es6-static-class-constants/13208/6
Neuron.activation.SIGMOID = "function f(x) = 1 / (1 + e^(-x))"
Neuron.activation.STEP = "function f(x) = 1; x > 0"
Neuron.activation.LINEAR = "function f(x) = x"

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


// TESTING
// Returning value using `async` library and `bluebird`

// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// let o0 = function(callback) {
//   return new Promise(function(resolve, reject) {
//     return async.filter(arr, function(num, callback) {
//       callback(null, num % 2 === 0)
//     }, function(error, results) {
//       return callback ? callback(error, results) : !error ? resolve(results) : reject(error)
//     })
//   })
// }

// o0(function(error, numbers) {
//   console.log(error)
//   console.log(numbers)
// })
// o0().then(function(numbers) {
//   console.log(numbers)
// }).catch(function(error) {
//   console.log(error)
// })