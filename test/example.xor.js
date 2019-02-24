'use strict'

let _ = require('lodash')
let async = require('async')
let chai = require('chai')
let math = require('mathjs')
let chalk = require('chalk')

chai.use(require('chai-each'))

let expect = chai.expect


/**
* REQUIREMENTS:
* - Should work with 'mathjs.bignumber''s
* - Should have a weight initialization range of (-∞, ∞)
* - Should have an output neuron for every possible "class" in a classifier (e.g. XOR -> 1: true, 2: false)
*/

describe("XOR", function() {
  this.timeout(50000)
  
  context("Cleaning", function() {
    let Neuron = require('../src/neuron')
    
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
    
    let i0;
    let i1;
    let h0;
    let h1;
    let o0;
    
    let w1 = math.bignumber(Math.random())
    let w2 = math.bignumber(Math.random())
    let w3 = math.bignumber(Math.random())
    let w4 = math.bignumber(Math.random())
    let w5 = math.bignumber(Math.random())
    let w6 = math.bignumber(Math.random())
    
    
    i0 = new Neuron({
//       connections: {
//         outgoing: [{
//           neuron: h0,
//           weight: w1
//         }, {
//           neuron: h1,
//           weight: w2
//         }]
//       }
    })
    i1 = new Neuron({
//       connections: {
//         outgoing: [{
//           neuron: h0,
//           weight: w3
//         }, {
//           neuron: h1,
//           weight: w4
//         }]
//       }
    })
    h0 = new Neuron({
      connections: {
        incoming: [{
          neuron: i0,
          weight: w1
        }, {
          neuron: i1,
          weight: w3
        }],
//         outgoing: [{
//           neuron: o0,
//           weight: w5
//         }]
      }
    })
    h1 = new Neuron({
      connections: {
        incoming: [{
          neuron: i0,
          weight: w2
        }, {
          neuron: i1,
          weight: w4
        }],
//         outgoing: [{
//           neuron: o0,
//           weight: w6
//         }]
      }
    })
    o0 = new Neuron({
      connections: {
        incoming: [{
          neuron: h0,
          weight: w5
        }, {
          neuron: h1,
          weight: w6
        }]
      }
    })
    
    i0.connections.outgoing = [{
      neuron: h0,
      weight: w1
    }, {
      neuron: h1,
      weight: w2
    }]
    i1.connections.outgoing = [{
      neuron: h0,
      weight: w3
    }, {
      neuron: h1,
      weight: w4
    }]
    h0.connections.outgoing = [{
      neuron: o0,
      weight: w5
    }]
    h1.connections.outgoing = [{
      neuron: o0,
      weight: w6
    }]
    
    console.log(i0.connections.outgoing)
    console.log()
    console.log(i1.connections.outgoing)
    console.log()
    console.log(h0.connections.outgoing)
    console.log()
    console.log(h1.connections.outgoing)
    console.log()
    console.log(o0.connections.outgoing)
    console.log()
    
    
    let i = [i0, i1]
    let h = [h0, h1]
    let o = [o0]
    
    let activate = (data, callback) => {
      async.seq((callback) => {
        async.times(i.length, (index, callback) => {
          i[index].activate(data[index], callback)
        }, callback)
      }, (a, callback) => {
        async.times(h.length, (index, callback) => {
          h[index].activate(callback)
        }, callback)
      }, (a, callback) => {
        async.times(o.length, (index, callback) => {
          o[index].activate(callback)
        }, callback)
      })(callback)
    }
    
    let propagate = (feedback, callback) => {
      async.seq((callback) => {
        async.times(o.length, (index, callback) => {
          o[index].propagate(feedback[index], callback)
        }, callback)
      }, (a, callback) => {
        async.times(h.length, (index, callback) => {
          h[index].propagate(callback)
        }, callback)
      }, (a, callback) => {
        async.times(i.length, (index, callback) => {
          i[index].propagate(callback)
        }, callback)
      })(callback)
    }
    
    let train = (times, callback) => {
      async.timesSeries(times, (n, callback) => {
        async.eachSeries(data, (d, callback) => {
          async.series([
            (callback) => activate(d.inputs, callback),
            (callback) => propagate(d.outputs, callback),
            (callback) => {console.log("Trained"); callback()}
          ], callback)
        }, callback)
      }, callback)
    }
    
    let test = (callback) => {
      console.log()
      async.map(data, (d, callback) => {
        activate(d.inputs, callback)
      }, callback)
    }
    
    it("should improve with training", function(done) {
      async.auto({
        "default": (callback) => test(callback),
        "train": ["default", (results, callback) => train(100, callback)],
        "test": ["train", (results, callback) => test(callback)]
      }, (error, results) => {
        console.log(error)
        console.log(results.default)
        console.log(results.test)
        done()
      })
    })
  })
  
  context.skip("Using Neurons (Original)", function() {
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
  
  context.skip("Using Neurons (New)", function() {
//     let Neuron = require('../src/neuron.new')
    
    /*
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
      
      
//       async.mapValuesSeries(_.reverse(neurons), (neuron, index, callback) => {
//         if(neuron.is.output()) {
//           neuron.propagate(feedback[index], callback)
//         } else {
//           neuron.propagate(callback)
//         }
//       }, (error, results) => {
//         callback(error, _.first(results))
//       })
      
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
    */
  })
  
  context.skip("Using Layers", function() {
    
  })
  
  context.skip("Using Network", function() {
    
  })
})

describe.skip("AND", function() {
//   let Neuron = require('../src/neuron.comment.js')
  
    let data = [{
      inputs: [0, 0],
      outputs: [0]
    }, {
      inputs: [0, 1],
      outputs: [0]
    }, {
      inputs: [1, 0],
      outputs: [0]
    }, {
      inputs: [1, 1],
      outputs: [1]
    }]
    
    
})

describe.skip("OR", function() {
  
})

describe.skip("NAND", function() {
  
})

describe.skip("NOR", function() {
  
})