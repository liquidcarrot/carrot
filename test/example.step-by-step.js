'use strict'

let _ = require('lodash')
let expect = require('chai').expect
let async = require('neo-async')

let Neuron = require('../src/neuron')
let Connection = require('../src/connection')
let Layer = require('../src/layer')
let Network = require('../src/network')

describe("Step by Step Example", function() {
  console.log("Step by Step Example: https://mattmazur.com/2015/03/17/a-step-by-step-backpropagation-example/")
  
  describe("Building Networks with Neurons", function() {
    this.timeout(50000)
    
    let data = [{
      inputs: [0.05, 0.1],
      outputs: [0.01, 0.99]
    }]

    it("should work", function(done) {
      let i1 = new Neuron({
        learning_rate: 0.5
      })
      expect(i1).to.an.instanceOf(Neuron)
      
      let i2 = new Neuron({
        learning_rate: 0.5
      })
      expect(i2).to.an.instanceOf(Neuron)
      
      let h1 = new Neuron({ 
        learning_rate: 0.5,
        bias: 0.35,
      })
      expect(h1).to.an.instanceOf(Neuron)
      expect(h1.bias).to.equal(0.35)
      
      let h2 = new Neuron({ 
        learning_rate: 0.5,
        bias: 0.35,
      })
      expect(h2).to.an.instanceOf(Neuron)
      expect(h2.bias).to.equal(0.35)
      
      let o1 = new Neuron({ 
        learning_rate: 0.5,
        bias: 0.6,
      })
      expect(o1).to.an.instanceOf(Neuron)
      expect(o1.bias).to.equal(0.6)
      
      let o2 = new Neuron({ 
        learning_rate: 0.5,
        bias: 0.6,
      })
      expect(o2).to.an.instanceOf(Neuron)
      expect(o2.bias).to.equal(0.6)
      
      async.auto({
        "connections": function(callback) {
          async.parallel([
            function(callback) { 
              i1.connect(h1, 0.15, function(error, connection) {
                expect(error).to.be.null
                expect(connection).to.be.an.instanceOf(Connection)
                expect(connection.from).to.eql(i1)
                expect(connection.to).to.eql(h1)
                expect(connection.weight).to.equal(0.15)
                expect(connection.forward.queue).to.be.empty
                expect(connection.forward.states).to.be.empty
                expect(connection.backward.queue).to.be.empty
                expect(connection.backward.states).to.be.empty
                callback(error, connection)
              }) 
            },
            function(callback) { 
              i2.connect(h1, 0.2, function(error, connection) {
                expect(error).to.be.null
                expect(connection).to.be.an.instanceOf(Connection)
                expect(connection.from).to.eql(i2)
                expect(connection.to).to.eql(h1)
                expect(connection.weight).to.equal(0.2)
                expect(connection.forward.queue).to.be.empty
                expect(connection.forward.states).to.be.empty
                expect(connection.backward.queue).to.be.empty
                expect(connection.backward.states).to.be.empty
                callback(error, connection)
              })
            },
            function(callback) { 
              i1.connect(h2, 0.25, function(error, connection) {
                expect(error).to.be.null
                expect(connection).to.be.an.instanceOf(Connection)
                expect(connection.from).to.eql(i1)
                expect(connection.to).to.eql(h2)
                expect(connection.weight).to.equal(0.25)
                expect(connection.forward.queue).to.be.empty
                expect(connection.forward.states).to.be.empty
                expect(connection.backward.queue).to.be.empty
                expect(connection.backward.states).to.be.empty
                callback(error, connection)
              })
            },
            function(callback) { 
              i2.connect(h2, 0.3, function(error, connection) {
                expect(error).to.be.null
                expect(connection).to.be.an.instanceOf(Connection)
                expect(connection.from).to.eql(i2)
                expect(connection.to).to.eql(h2)
                expect(connection.weight).to.equal(0.3)
                expect(connection.forward.queue).to.be.empty
                expect(connection.forward.states).to.be.empty
                expect(connection.backward.queue).to.be.empty
                expect(connection.backward.states).to.be.empty
                callback(error, connection)
              })
            },
            function(callback) { 
              h1.connect(o1, 0.4, function(error, connection) {
                expect(error).to.be.null
                expect(connection).to.be.an.instanceOf(Connection)
                expect(connection.from).to.eql(h1)
                expect(connection.to).to.eql(o1)
                expect(connection.weight).to.equal(0.4)
                expect(connection.forward.queue).to.be.empty
                expect(connection.forward.states).to.be.empty
                expect(connection.backward.queue).to.be.empty
                expect(connection.backward.states).to.be.empty
                callback(error, connection)
              })
            },
            function(callback) { 
              h2.connect(o1, 0.45, function(error, connection) {
                expect(error).to.be.null
                expect(connection).to.be.an.instanceOf(Connection)
                expect(connection.from).to.eql(h2)
                expect(connection.to).to.eql(o1)
                expect(connection.weight).to.equal(0.45)
                expect(connection.forward.queue).to.be.empty
                expect(connection.forward.states).to.be.empty
                expect(connection.backward.queue).to.be.empty
                expect(connection.backward.states).to.be.empty
                callback(error, connection)
              })
            },
            function(callback) { 
              h1.connect(o2, 0.5, function(error, connection) {
                expect(error).to.be.null
                expect(connection).to.be.an.instanceOf(Connection)
                expect(connection.from).to.eql(h1)
                expect(connection.to).to.eql(o2)
                expect(connection.weight).to.equal(0.5)
                expect(connection.forward.queue).to.be.empty
                expect(connection.forward.states).to.be.empty
                expect(connection.backward.queue).to.be.empty
                expect(connection.backward.states).to.be.empty
                callback(error, connection)
              })
            },
            function(callback) { 
              h2.connect(o2, 0.55, function(error, connection) {
                expect(error).to.be.null
                expect(connection).to.be.an.instanceOf(Connection)
                expect(connection.from).to.eql(h2)
                expect(connection.to).to.eql(o2)
                expect(connection.weight).to.equal(0.55)
                expect(connection.forward.queue).to.be.empty
                expect(connection.forward.states).to.be.empty
                expect(connection.backward.queue).to.be.empty
                expect(connection.backward.states).to.be.empty
                callback(error, connection)
              })
            }
          ], callback)
        },
        
        "forward": ["connections", function(results, callback) {
          async.auto({
            "input_layer": function(callback) {
              async.parallel([
                function(callback) {
                  async.auto({
                    "activate": function(callback) {
                      i1.activate(data[0].inputs[0], function(error, signal) {
                        expect(error).to.be.null
                        expect(signal).to.be.a("number")
                        expect(signal).to.be.equal(data[0].inputs[0])
                        callback(error, signal)
                      })
                    },
                    "forward": ["activate", function(results, callback) {
                      i1.forward(results.activate, callback)
                    }]
                  }, callback)
                },
                function(callback) {
                  async.auto({
                    "activate": function(callback) {
                      i2.activate(data[0].inputs[1], function(error, signal) {
                        expect(error).to.be.null
                        expect(signal).to.be.a("number")
                        expect(signal).to.be.equal(data[0].inputs[1])
                        callback(error, signal)
                      })
                    },
                    "forward": ["activate", function(results, callback) {
                      i2.forward(results.activate, callback)
                    }]
                  }, callback)
                },
              ], callback)
            },
            "hidden_layer_0": ["input_layer", function(results, callback) {
              async.parallel([
                function(callback) {
                  async.auto({
                    "activate": function(callback) {
                      h1.activate(function(error, signal) {
                        expect(error).to.be.null
                        expect(signal).to.be.a("number")
                        expect(signal).to.be.below(0.594)
                        expect(signal).to.be.above(0.592)
                        callback(error, signal)
                      })
                    },
                    "forward": ["activate", function(results, callback) {
                      h1.forward(results.activate, callback)
                    }]
                  }, callback)
                },
                function(callback) {
                  async.auto({
                    "activate": function(callback) {
                      h2.activate(function(error, signal) {
                        expect(error).to.be.null
                        expect(signal).to.be.a("number")
                        expect(signal).to.be.below(0.597)
                        expect(signal).to.be.above(0.595)
                        callback(error, signal)
                      })
                    },
                    "forward": ["activate", function(results, callback) {
                      h2.forward(results.activate, callback)
                    }]
                  }, callback)
                },
              ], callback)
            }],
            "output_layer": ["hidden_layer_0", function(results, callback) {
              async.parallel([
                function(callback) {
                  o1.activate(function(error, signal) {
                    expect(error).to.be.null
                    expect(signal).to.be.a("number")
                    expect(signal).to.be.below(0.752)
                    expect(signal).to.be.above(0.750)
                    callback(error, signal)
                  })
                },
                function(callback) {
                  o2.activate(function(error, signal) {
                    expect(error).to.be.null
                    expect(signal).to.be.a("number")
                    expect(signal).to.be.below(0.773)
                    expect(signal).to.be.above(0.771)
                    callback(error, signal)
                  })
                },
              ], callback)
            }],
          }, function(error, results) {
            callback(error, results.output_layer)
          })
        }],
        
        "error": ["forward", function(results, callback) {
          async.auto({
            "total": function(callback) {
              callback(null, _.reduce(results.forward, function(sum, output, index) {
                return sum + 0.5 * Math.pow((data[0].outputs[index] - output), 2)
              }, 0))
            },
            "each": function(callback) {
              async.transform(results.forward, function(errors, output, index, callback) {
                errors.push(output - data[0].outputs[index])
                callback()
              }, callback)
            }
          }, callback)
        }],
        
        "backward": ["error", function(results, callback) {
          async.auto({
            "output_layer": function(callback) {
              async.parallel([
                function(callback) {
                  async.auto({
                    "learn": function(callback) {
                      o1.learn(results.error.each[0], callback)
                    },
                    "backward": ["learn", function(results, callback) {
                      o1.backward(results.learn, callback)
                    }],
                  }, callback)
                },
                function(callback) {
                  async.auto({
                    "learn": function(callback) {
                      o2.learn(results.error.each[1], callback)
                    },
                    "backward": ["learn", function(results, callback) {
                      o2.backward(results.learn, callback)
                    }],
                  }, callback)
                },
              ], callback)
            },
            "hidden_layer_0": ["output_layer", function(results, callback) {
              async.parallel([
                function(callback) {
                  async.auto({
                    "learn": function(callback) {
                      h1.learn(callback)
                    },
                    "backward": ["learn", function(results, callback) {
                      h1.backward(results.learn, callback)
                    }],
                  }, callback)
                },
                function(callback) {
                  async.auto({
                    "learn": function(callback) {
                      h2.learn(callback)
                    },
                    "backward": ["learn", function(results, callback) {
                      h2.backward(results.learn, callback)
                    }],
                  }, callback)
                },
              ], callback)
            }],
            "input_layer": ["hidden_layer_0", function(results, callback) {
              async.parallel([
                function(callback) {
                  i1.learn(callback)
                },
                function(callback) {
                  i2.learn(callback)
                },
              ], callback)
            }]
          }, callback)
        }],
      }, function(error, results) {
        expect(error).to.be.null
        
        expect(results.connections[0].weight).to.be.a("number")
        expect(results.connections[0].weight).to.be.below(0.151)
        expect(results.connections[0].weight).to.be.above(0.147)
        
        expect(results.connections[1].weight).to.be.a("number")
        expect(results.connections[1].weight).to.be.below(0.201)
        expect(results.connections[1].weight).to.be.above(0.197)
        
        expect(results.connections[2].weight).to.be.a("number")
        expect(results.connections[2].weight).to.be.below(0.251)
        expect(results.connections[2].weight).to.be.above(0.247)
        
        expect(results.connections[3].weight).to.be.a("number")
        expect(results.connections[3].weight).to.be.below(0.301)
        expect(results.connections[3].weight).to.be.above(0.297)
        
        expect(results.connections[4].weight).to.be.a("number")
        expect(results.connections[4].weight).to.be.below(0.36)
        expect(results.connections[4].weight).to.be.above(0.356)
        
        expect(results.connections[5].weight).to.be.a("number")
        expect(results.connections[5].weight).to.be.below(0.41)
        expect(results.connections[5].weight).to.be.above(0.406)
        
        expect(results.connections[6].weight).to.be.a("number")
        expect(results.connections[6].weight).to.be.below(0.513)
        expect(results.connections[6].weight).to.be.above(0.509)
        
        expect(results.connections[7].weight).to.be.a("number")
        expect(results.connections[7].weight).to.be.below(0.563)
        expect(results.connections[7].weight).to.be.above(0.559)
        
        done()
      })
    })
  })
  
  describe("Building Networks with Layers", function() {
    this.timeout(50000)
    
    let data = [{
      inputs: [0.05, 0.1],
      outputs: [0.01, 0.99]
    }]
    
    it("should work", function(done) {
      
      let input_layer = new Layer({
        learning_rate: 0.5
      }, 2)
      
      expect(input_layer).to.an.instanceOf(Layer)
      expect(input_layer.neurons).to.lengthOf(2)
      expect(input_layer.neurons[0].learning_rate).to.equal(0.5)
      
      let hidden_layer = new Layer({
        learning_rate: 0.5,
        bias: 0.35
      }, 2)
      
      expect(hidden_layer).to.an.instanceOf(Layer)
      expect(hidden_layer.neurons).to.lengthOf(2)
      expect(hidden_layer.neurons[0].learning_rate).to.equal(0.5)
      
      let output_layer = new Layer({
        learning_rate: 0.5,
        bias: 0.6
      }, 2)
      
      expect(output_layer).to.an.instanceOf(Layer)
      expect(output_layer.neurons).to.lengthOf(2)
      expect(output_layer.neurons[0].learning_rate).to.equal(0.5)
      
      async.auto({
        "connections": function(callback) {
          async.parallel([
            function(callback) {
              let weights = [[0.15, 0.2], [0.25, 0.3]]
              let flat_weights = [0.15, 0.2, 0.25, 0.3]
              input_layer.connect(hidden_layer, weights, function(error, results) {
                expect(error).to.be.null
                _.forEach(results, function(result, key) {
                  expect(result).to.be.an.instanceOf(Connection)
                  expect(result.forward.queue).to.be.empty
                  expect(result.forward.states).to.be.empty
                  expect(result.backward.queue).to.be.empty
                  expect(result.backward.states).to.be.empty  
                  expect(result.weight).to.equal(flat_weights[key])
                })
                callback(error, results)
              }) 
            },
            function(callback) {
              let weights = [[0.4, 0.45], [0.5, 0.55]]
              let flat_weights = [0.4, 0.45, 0.5, 0.55]
              hidden_layer.connect(output_layer, weights, function(error, results) {
                expect(error).to.be.null
                _.forEach(results, function(result, key) {
                  expect(result).to.be.an.instanceOf(Connection)
                  expect(result.forward.queue).to.be.empty
                  expect(result.forward.states).to.be.empty
                  expect(result.backward.queue).to.be.empty
                  expect(result.backward.states).to.be.empty 
                  expect(result.weight).to.equal(flat_weights[key])
                })
                callback(error, results)
              })
            },
          ], callback)
        },
        
        "forward": ["connections", function(results, callback) {
          async.auto({
            "input_layer":  function(callback) {
              async.auto({
                "activate": function(callback) {
                  input_layer.activate(data[0].inputs, function(error, signals) {
                    expect(error).to.be.null
                    _.forEach(signals, function(signal, key) {
                      expect(signal).to.be.a("number")
                      expect(signal).to.be.equal(data[0].inputs[key])
                    })
                    callback(error, signals)
                  }, callback)
                },
                "forward": ["activate", function(results, callback) {
                  input_layer.forward(results.activate, callback)
                }]
              }, callback)
            },
            "hidden_layer": ["input_layer", function(results, callback) {
              let expected = [[0.594, 0.592], [0.597, 0.595]]
              async.auto({
                "activate": function(callback) {
                  hidden_layer.activate(function(error, signals) {
                    expect(error).to.be.null
                    _.forEach(signals, function(signal, key) {
                      expect(signal).to.be.a("number")
//                       // h1
//                       expect(signal).to.be.below(0.594)
//                       expect(signal).to.be.above(0.592)
//                       // h2
//                       expect(signal).to.be.below(0.597)
//                       expect(signal).to.be.above(0.595)
                    })
                    callback(error, signals)
                  })
                },
                "forward": ["activate", function(results, callback) {
                  hidden_layer.forward(results.activate, callback)
                }]
              }, callback)
            }],
            "output_layer": ["hidden_layer", function(results, callback) {
              let expected = [[0.752, 0.750], [0.773, 0.771]]
              output_layer.activate(function(error, signals) {
                expect(error).to.be.null
                _.forEach(signals, function(signal, key) {
                  expect(signal).to.be.a("number")
//                   // o1
//                   expect(signal).to.be.below(0.752)
//                   expect(signal).to.be.above(0.750)
//                   // o2
//                   expect(signal).to.be.below(0.773)
//                   expect(signal).to.be.above(0.771)
                })
                callback(error, signals)
              })
            }]
          }, function(error, results) {
            callback(error, results.output_layer)
          })
        }],
        
//         "error": ["forward", function(results, callback) {
//           async.auto({
//             "total": function(callback) {
//               callback(null, _.reduce(results.forward, function(sum, output, index) {
//                 return sum + 0.5 * Math.pow((data[0].outputs[index] - output), 2)
//               }, 0))
//             },
//             "each": function(callback) {
//               async.transform(results.forward, function(errors, output, index, callback) {
//                 errors.push(output - data[0].outputs[index])
//                 callback()
//               }, callback)
//             }
//           }, callback)
//         }],
        
//         "backward": ["error", function(results, callback) {
//           async.auto({
//             "output_layer": function(callback) {
//               async.parallel([
//                 function(callback) {
//                   async.auto({
//                     "learn": function(callback) {
//                       o1.learn(results.error.each[0], callback)
//                     },
//                     "backward": ["learn", function(results, callback) {
//                       o1.backward(results.learn, callback)
//                     }],
//                   }, callback)
//                 },
//                 function(callback) {
//                   async.auto({
//                     "learn": function(callback) {
//                       o2.learn(results.error.each[1], callback)
//                     },
//                     "backward": ["learn", function(results, callback) {
//                       o2.backward(results.learn, callback)
//                     }],
//                   }, callback)
//                 },
//               ], callback)
//             },
//             "hidden_layer_0": ["output_layer", function(results, callback) {
//               async.parallel([
//                 function(callback) {
//                   async.auto({
//                     "learn": function(callback) {
//                       h1.learn(callback)
//                     },
//                     "backward": ["learn", function(results, callback) {
//                       h1.backward(results.learn, callback)
//                     }],
//                   }, callback)
//                 },
//                 function(callback) {
//                   async.auto({
//                     "learn": function(callback) {
//                       h2.learn(callback)
//                     },
//                     "backward": ["learn", function(results, callback) {
//                       h2.backward(results.learn, callback)
//                     }],
//                   }, callback)
//                 },
//               ], callback)
//             }],
//             "input_layer": ["hidden_layer_0", function(results, callback) {
//               async.parallel([
//                 function(callback) {
//                   i1.learn(callback)
//                 },
//                 function(callback) {
//                   i2.learn(callback)
//                 },
//               ], callback)
//             }]
//           }, callback)
//         }],
      }, function(error, results) {
        expect(error).to.be.null
        
//         expect(results.connections[0].weight).to.be.a("number")
//         expect(results.connections[0].weight).to.be.below(0.151)
//         expect(results.connections[0].weight).to.be.above(0.147)
        
//         expect(results.connections[1].weight).to.be.a("number")
//         expect(results.connections[1].weight).to.be.below(0.201)
//         expect(results.connections[1].weight).to.be.above(0.197)
        
//         expect(results.connections[2].weight).to.be.a("number")
//         expect(results.connections[2].weight).to.be.below(0.251)
//         expect(results.connections[2].weight).to.be.above(0.247)
        
//         expect(results.connections[3].weight).to.be.a("number")
//         expect(results.connections[3].weight).to.be.below(0.301)
//         expect(results.connections[3].weight).to.be.above(0.297)
        
//         expect(results.connections[4].weight).to.be.a("number")
//         expect(results.connections[4].weight).to.be.below(0.36)
//         expect(results.connections[4].weight).to.be.above(0.356)
        
//         expect(results.connections[5].weight).to.be.a("number")
//         expect(results.connections[5].weight).to.be.below(0.41)
//         expect(results.connections[5].weight).to.be.above(0.406)
        
//         expect(results.connections[6].weight).to.be.a("number")
//         expect(results.connections[6].weight).to.be.below(0.513)
//         expect(results.connections[6].weight).to.be.above(0.509)
        
//         expect(results.connections[7].weight).to.be.a("number")
//         expect(results.connections[7].weight).to.be.below(0.563)
//         expect(results.connections[7].weight).to.be.above(0.559)
        
        done()
      })
    })
  })
})