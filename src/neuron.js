'use strict'

let _ = require('lodash')
let async = require('async')
let Promise = require('bluebird')
let Q = require('q')

/* let neuron = () => {
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
} */

/**
* Stateless factory-function
* Dendrites = Inputs
* Axons = Outputs
*
* CHECK: https://medium.com/javascript-scene/javascript-factory-functions-with-es6-4d224591a8b1
*/
const neuron = ({ connections = [], states = [] } = {}) => ({
  connections,
  states,
})

const getInputs = function(neuron, callback) {
   return new Promise(function(resolve, reject) {
    return async.filter(neuron.connections, function(connection, callback) {
      console.log(connection)
      callback(undefined, connection.to === neuron)
    }, function(error, inputs) {
      return callback ? callback(error, inputs) : !error ? resolve(inputs) : reject(error)
    })
  })
}

const getOutputs = function(neuron, callback) {
   return new Promise(function(resolve, reject) {
    return async.filter(neuron.connections, function(connection, callback) {
      callback(undefined, connection.from === neuron)
    }, function(error, inputs) {
      return callback ? callback(error, inputs) : !error ? resolve(inputs) : reject(error)
    })
  })
}

let n0 = neuron({})
let n1 = neuron({})

n0.connections.push({ // an output
  from: n0,
  to: n1
})

getInputs(n0, (err, res)=>{
  console.log('callback n0 inputs: ')
  console.log('err', err)
  console.log('res', res)
})
getOutputs(n0, (err, res)=>{
  console.log('callback n0 outputs: ')
  console.log('err', err)
  console.log('res', res) // returns pushed connection
})
getInputs(n1, (err, res)=>{
  console.log('callback n1 inputs: ')
  console.log('err', err)
  console.log('res', res) // empty array
})
getOutputs(n1, (err, res)=>{
  console.log('callback n1 outputs: ')
  console.log('err', err)
  console.log('res', res) // empty array
})
getInputs(n0).then((res)=>{
  console.log('promise n0 inputs: ')
  console.log('res', res)
})
getOutputs(n0).then((res)=>{
  console.log('promise n0 outputs: ')
  console.log('res', res) // returns pushed connection
})

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