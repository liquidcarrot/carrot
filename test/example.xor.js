'use strict'

let _ = require('lodash')
let async = require('async')
let chai = require('chai')
let chalk = require('chalk')

chai.use(require('chai-each'))

let expect = chai.expect

describe("XOR", function() {
  this.timeout(5000)
  
  context("Using Neurons", function() {
    let Neuron = require('../src/neuron')
    
    let i0 = new Neuron()
    let i1 = new Neuron()
    let h0 = new Neuron({
      connections: {
        incoming: [i0, i1]
      }
    })
    let h1 = new Neuron({
      connections: {
        incoming: [i0, i1]
      }
    })
    let o0 = new Neuron({
      connections: {
        incoming: [h0, h1]
      }
    })
    
    let neurons = [i0, i1, h0, h1, o0]
    
    let data = [{
      inputs: [0, 0],
      outputs: [0]
    }, {
      inputs: [0, 1],
      outputs: [1]
    }, {
      inputs: [1, 0],
      outputs: [1]
    }, {
      inputs: [1, 1],
      outputs: [0]
    }]
    
    let activate = (inputs, callback) => {
      async.mapValuesSeries(neurons, (neuron, index, callback) => {
        if(neuron.is.input()) {
          neuron.activate(inputs[index], callback)
        } else {
          neuron.activate(callback)
        }
      }, (error, results) => {
        callback(error, _.last(Object.values(results)))
      })
    }
    
    let propagate = (feedback, callback) => {
      async.timesSeries(neurons.length, (n, callback) => {
        let index = neurons.length - n - 1
        if(neurons[index].is.output()) {
          neurons[index].propagate(feedback[n], callback)
        } else {
          neurons[index].propagate(callback)
        }
      }, (error, results) => {
        callback(error, _.first(results))
      })
      
      /*
      async.mapValuesSeries(_.reverse(neurons), (neuron, index, callback) => {
        if(neuron.is.output()) {
          neuron.propagate(feedback[index], callback)
        } else {
          neuron.propagate(callback)
        }
      }, (error, results) => {
        callback(error, _.first(results))
      })
      */
    }
    
    
    it("should improve with training", function(done) {
      let start = new Date()
      
      async.auto({
        "default": callback => async.mapSeries(data, (datum, callback) => activate(datum.inputs, callback), callback),
        "train": ["default", (results, callback) => {
          async.timesSeries(100, (n, callback) => {
            async.mapSeries(data, (datum, callback) => {
              async.auto({
                "activate": callback => activate(datum.inputs, callback),
                "propagate": ["activate", (results, callback) => propagate(datum.outputs, callback)],
              }, (error, results) => {
                callback(error, results.activate)
              })
            }, callback)
          }, callback)
        }]
      }, (error, results) => {
        async.mapValuesSeries(data, (datum, index, callback) => activate(datum.inputs, (error, result) => {
          let default_error = 0.5 * Math.pow(datum.outputs[0] - results.default[index], 2)
          let trained_error = 0.5 * Math.pow(datum.outputs[0] - result, 2)
          let improvement = default_error > trained_error
          
          console.log("\t" + chalk.green("Case: ") + datum.inputs +
                     chalk.green("; Untrained: ") + results.default[index] +
                     chalk.green("; Trained: ") + result +
                     chalk.green("; Expected: ") + datum.outputs)
          console.log("\t" + chalk.green("Improvement: ") + (improvement ? chalk.green("Yes") : chalk.red("No")))
          console.log()
          
          callback(error, improvement)
        }), (error, results) => {
          let improvements = Object.values(results)
          
          _.each(improvements, improvement => {
            expect(improvement).to.equal(true)
          })
          
          done()
        })
      })
      
    })
  })
  
  context.skip("Using Layers", function() {
    
  })
  
  context.skip("Using Network", function() {
    
  })
})