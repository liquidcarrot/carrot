'use strict'

let _ = require('lodash')
let async = require('async')
let Promise = require('bluebird')
let Q = require('q')

let neuron = () => {
  let self = this
  
  self.connections = []
  self.states = []
  
  self.inputs = function(callback) {
    return new Promise(function(resolve, reject) {
      return async.filter(self.connections, function(connection, callback) {
        callback(undefined, connection.from === self)
      }, function(error, inputs) {
        return callback ? callback(error, inputs) : !error ? resolve(inputs) : reject(error)
      })
    })
  }
  
  self.outputs = function(callback) {
    return new Promise(function(resolve, reject) {
      return async.filter(self.connections, function(connection, callback) {
        callback(undefined, connection.to === self)
      }, function(error, inputs) {
        return callback ? callback(error, inputs) : !error ? resolve(inputs) : reject(error)
      })
    })
  }
  
  return self
} 

let n0 = neuron()
let n1 = neuron()

console.log(n0)
console.log(n1)

n0.connections.push({
  from: n0,
  to: n1
})

console.log(n0)
console.log(n1)



// module.exports = neuron

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