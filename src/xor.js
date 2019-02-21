'use strict'

let async = require('neo-async')
let Network = require('./src/network')

let net = new Network([2, 2, 1])

let data = [{
  inputs: [-10, -10],
  outputs: [-10]
}, {
  inputs: [-10, 10],
  outputs: [10]
}, {
  inputs: [10, -10],
  outputs: [10]
}, {
  inputs: [10, 10],
  outputs: [-10]
}]

let train = function(times, callback) {
  async.timesSeries(times, function(n, callback) {
    async.eachSeries(data, function(d, callback) {
      async.series([
        function(callback) {
          net.activate(d.inputs, callback)
        },
        function(callback) {
          net.propagate(d.outputs, callback)
        },
        function(callback) {
          console.log("Trained"); 
          callback()
        }
      ], callback)
    }, callback)
  }, callback)
}

let test = function(callback) {
  console.log()
  async.map(data, function(d, callback) {
    net.activate(d.inputs, callback)
  }, callback)
}

async.auto({
  "default": function(callback) {
    test(callback)
  },
  "train": ["default", function(results, callback) {
    train(100, callback)
  }],
  "test": ["train", function(results, callback) {
    test(callback)
  }]
}, (error, results) => {
  console.log(error)
  console.log(results.default)
  console.log(results.test)
})