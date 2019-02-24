'use strict'

let _ = require('lodash')
let math = require('mathjs')
let async = require('neo-async')
let Promise = require('bluebird')

/**
* >Neuron Factory Function
*
* * CHECK: https://robertbeisicht.wordpress.com/2014/07/04/feed-forward-neural-network-in-javascript/
* * CHECK: https://medium.com/javascript-scene/javascript-factory-functions-with-es6-4d224591a8b1
* * CHECK: https://softwareengineering.stackexchange.com/questions/82593/javascript-ternary-operator-vs
*
* EXAMPLE EQUATIONS:
* 
* * Synaptic Weights/Sum: β = Σ (weights * inputs)
* * Squash Function (sigmoid): σ = 1 / (1 + e^-(β))
* * Cost Function (Mean Squared Error AKA MSE): Δ = (1 / n) * Σ (target - output)^2
*
* EXAMPLE EQUATIONS (derivatives):
*
* * Synaptic Weights/Sum (w.r.t weight, w_i): β'(w_i) = input_i
* * Synaptic Weights/Sum (w.r.t input, i_i): β'(i_i) = weight_i
* * Squash Function (sigmoid): σ'(β_i) = σ'(β_i) * (1 - σ'(β_i))
* * Cost Function (Mean Squared Error AKA MSE): Δ'(output_i) = output_i - target_i
* 
* @constructs Neuron
* @param {Object} [props] - Neuron's Properties
* @param {number} [props.bias=Math.random()] - Neuron's Synaptic Weight Constant AKA Bias
* @param {ActivationFunction} [props.activation=Neuron.activations.SIGMOID] - Neuron's Activation Function
* @param {number} [props.rate=0.3] - Neuron's Learning Rate AKA Gradient Descent Step Size
* @param {Object} [props.connections] - Neuron's Connections
* @param {Layer|[Neuron]|[Connection]} [props.connections.incoming=[]] - Neuron's Incoming Connections
* @param {Layer|[Neuron]|[Connection]} [props.connections.outgoing=[]] - Neuron's Outgoing Connections
*/
let Neuron = function(props) {
  let self = this
  
  let Layer = require('./layer')
  let Connection = require('./connection')
  
  //================================
  // Properties ====================
  //================================
  self.bias = props ? (props.bias || Math.random()) : Math.random()
  self.learning_rate = props ? (props.learning_rate || 0.3) : 0.3
  self.activation = Neuron.activations.SIGMOID // Neuron's Squash Function
  self.cost = Neuron.costs.MSE // Neuron's Cost Function
  self.connections = {
    incoming: [],
    outgoing: []
  }
  //================================
  // END Properties ================
  //================================
  
  //================================
  // Stored Information ============
  //================================
  self.historic =  {
    activation: {
      outputs: [],
      sums: [],
    },
    propagation: {
      // Σ (incoming_error * weights) || Cost Function, C, derivative, C', at output, o_i: C'(o_i)
      costs: [],
      // Activation Function, σ, derivative, σ', at output o_i, σ'(o_i)
      errors: [],
      // σ'(o_i) * C'(o_i)
      totals: []
    },
    inputs: [],
    feedback: []
  }
  //================================
  // END Stored Information ========
  //================================
  
  //================================
  // Construction ==================
  //================================
  if(props) {
//     self.bias = props.bias || self.bias
//     self.rate = props.rate || self.rate
    
    if(props.activation) {
      // Activation Functions Using Class Defaults
      if(typeof props.activation === "string") {
        // Sigmoid Activation Function
        if(props.activation.toLowerCase() === "sigmoid" || 
           props.activation.toLowerCase() === "sigmoidal" ||
           props.activation.toLowerCase() === "logistic" ||
           props.activation.toLowerCase() === "logistics") {
          self.activation = Neuron.activations.SIGMOID
        }
        // Rectified Linear Unit Activation Function
        else if(props.activation.toLowerCase() === "relu") {
          self.activation = Neuron.activations.RELU
        }
        // Hyperbolic Tangent Activation Function
        else if(props.activation.toLowerCase() === "tanh") {
          self.activation = Neuron.activations.TANH
        }
        // Linear Activation Function
        else if(props.activation.toLowerCase() === "linear" ||
                  props.activation.toLowerCase() === "identity") {
          self.activation = Neuron.activations.LINEAR
        }
        // Unsupported Activation Function
        else {
          throw new Error(props.activation + " is not a valid - or is an unsupported - activation function.\n\n" + 
                          "If you would like to create support for it, please open a up pull request on GitHub for it: https://github.com/liquidcarrot/carrot/pulls\n\n" +
                          "If you would like one of our core contributors to take a look into it, please open up an issue on GitHub describing this function in further detail: https://github.com/liquidcarrot/carrot/issues")
        }
      }
      // Activation Functions Using Custom Functions
      else if(typeof props.activation === "function") {
        self.activation = props.activation
      }
      // Unsupported Activation Function Construction
      else{
        throw new Error("Activation function must be a 'function' or a 'string'")
      }
    }
    
    if(props.connections) {
      if(props.connections.incoming) {
        let incoming;
        
        // new Neuron({ 'connections': [Neuron] }) || new Neuron(neuron)
        if(_.isArray(props.connections.incoming)) {
          // new Neuron({ 'connections': [Neuron] })
          if(_.every(props.connections.incoming, neuron => neuron instanceof Neuron)) {
            incoming = props.connections.incoming
          } 
          // new Neuron(neuron)
          else if(_.every(props.connections.incoming, connection => connection instanceof Connection)) {
            // new Neuron(neuron) -> new Neuron({ 'connections': [Neuron] })
            incoming = _.map(props.connections.incoming, connection => connection.from)
          }
          // Unsupported Construction
          else {
            throw new Error("Incoming Connections must be a 'layer', '[Neuron]', or '[Connection]'")
          }
        } 
        // new Neuron({ 'connections': Layer })
        else if(props.connections.incoming instanceof Layer) {
          // new Neuron({ 'connections': Layer }) -> new Neuron({ 'connections': [Neuron] })
          incoming = props.connections.incoming.neurons
        } 
        // Unsupported Construction
        else {
          throw new Error("'connections.incoming' must be a 'layer', '[Neuron]', or '[Connection]'")
        }

        _.each(incoming, function(neuron, index) {
          let connection = new Connection({
            from: neuron,
            to: self,
          })

          neuron.connections.outgoing.push(connection)
          self.connections.incoming.push(connection)
        })
      }
      if(props.connections.outgoing) {
        let outgoing;
        
        // new Neuron({ 'connections': [Neuron] }) || new Neuron(neuron)
        if(_.isArray(props.connections.outgoing)) {
          // new Neuron({ 'connections': [Neuron] })
          if(_.every(props.connections.outgoing, neuron => neuron instanceof Neuron)) {
            outgoing = props.connections.outgoing
          } 
          // new Neuron(neuron)
          else if(_.every(props.connections.outgoing, connection => connection instanceof Connection)) {
            // new Neuron(neuron) -> new Neuron({ 'connections': [Neuron] })
            outgoing = _.map(props.connections.outgoing, connection => connection.to)
          }
          // Unsupported Construction
          else {
            throw new Error("Incoming Connections must be a 'layer', '[Neuron]', or '[Connection]'")
          }
        } 
        // new Neuron({ 'connections': Layer })
        else if(props.connections.outgoing instanceof Layer) {
          // new Neuron({ 'connections': Layer }) -> new Neuron({ 'connections': [Neuron] })
          outgoing = props.connections.outgoing.neurons
        } 
        // Unsupported Construction
        else {
          throw new Error("Incoming Connections must be a 'layer', '[Neuron]', or '[Connection]'")
        }
        
        _.each(outgoing, function(neuron, index) {
          let connection = new Connection({
            from: self,
            to: neuron,
          })

          neuron.connections.incoming.push(connection)
          self.connections.outgoing.push(connection)
        })
      }
    }
  }
  //================================
  // END Construction ==============
  //================================
  
  
  //================================
  // Utility Functions =============
  //================================
  /**
  * @namespace Neuron#is
  * @memberof Neuron.prototype
  * @instance
  */
  self.is = {
    /**
    * @function Neuron#is.input
    * @memberof Neuron.prototype
    * @instance
    * @returns {boolean} Returns `true` if this neuron has no incoming connections
    */
    input: function(callback) {
      callback(null, self.connections.incoming.length === 0)
    },
    /**
    * @function Neuron#is.ouput
    * @memberof Neuron.prototype
    * @instance
    * @returns {boolean} Returns `true` if this neuron has no outgoing connections
    */
    output: function(callback) {
      callback(null, self.connections.outgoing.length === 0)
    },
  }
    //================================
    // (Beta) ========================
    //================================
    /**
    * __BETA__
    *
    * @function Neuron#is.equal
    * @memberof Neuron.prototype
    * @instance
    * @param {Neuron} neuron - Neuron to check equality against
    * @returns {boolean} Returns `true` if this neuron equals the given neuron
    */
    self.is.equal = function(neuron) {
      return Math.round(Math.random()) ? true : false
    }
    self.latest = {}
    self.latest.activation = {
      output: _.last(self.historic.activation.outputs),
      sum: _.last(self.historic.activation.sums),
    },
    self.latest.propagation = {
      output_error: _.last(self.historic.propagation.output_errors),
      sum_error: _.last(self.historic.propagation.sum_errors)
    },
    self.latest.output = self.latest.activation.output,
    self.latest.error = self.latest.propagation.output_error * self.latest.propagation.sum_error
    self.incoming = {
      inputs: (callback) => self.incoming.neurons((error, neurons) => {
        async.map(neurons, (neuron, callback) => {
          callback(null, neuron.last.output())
        }, callback)
      }),
      feedback: (callback) => self.outgoing.neurons((error, neurons) => {
        async.map(neurons, (neuron, callback) => {
          callback(null, neuron.last.error())
        }, callback)
      }),
      weights: (callback) => async.map(self.connections.incoming, (connection, callback) => {
        callback(null, connection.weight)
      }, callback),
      connections: (callback) => callback(null, self.connections.incoming),
      neurons: (callback) => async.map(self.connections.incoming, (connections, callback) => {
        callback(null, connections.from)
      }, callback)
    }
    self.outgoing = {
      inputs: (callback) => callback(null, self.historic.outputs),
      feedback: (callback) => callback(null, self.historic.feedback),
      weights: (callback) => async.map(self.connections.outgoing, (connection, callback) => {
        callback(null, connection.weight)
      }, callback),
      connections: (callback) => callback(null, self.connections.outgoing),
      neurons: (callback) => async.map(self.connections.outgoing, (connections, callback) => {
        callback(null, connections.to)
      }, callback)
    }
    self.all = {
      inputs: (callback) => async.concat([self.incoming, self.outgoing], (group, callback) => {
        group.inputs(callback)
      }, callback),
      feedback: (callback) => async.concat([self.incoming, self.outgoing], (group, callback) => {
        group.feedback(callback)
      }, callback),
      weights: (callback) => async.concat([self.incoming, self.outgoing], (group, callback) => {
        group.weights(callback)
      }, callback),
      connections: (callback) => async.concat([self.incoming, self.outgoing], (group, callback) => {
        group.connections(callback)
      }, callback),
      neurons: (callback) => async.concat([self.incoming, self.outgoing], (group, callback) => {
        group.neurons(callback)
      }, callback)
    }
    /**
    * __BETA__
    *
    * These functions are applicable and useful when implementing an asynchronous/non-blocking
    * feed-forward/-backward architecture that depends on something like queues in the connections
    * or something similar
    *
    * @todo Support callabacks
    * @namespace Neuron#can
    * @memberof Neuron.prototype
    * @instance
    */
    self.can = {
      /**
      * __BETA__
      *
      * These functions are applicable and useful when implementing an asynchronous/non-blocking
      * feed-forward/-backward architecture that depends on something like queues in the connections
      * or something similar
      *
      * @todo Support callbacks
      * @function Neuron#can.activate
      * @memberof Neuron.prototype
      * @instance
      * @returns {boolean} Returns `true` if this neuron can activate
      */
      activate: function() {
        if(self.is.input()) {
          return true
        } else {
          return _.every(self.connections.incoming, function(connection) {
            return !_.isNil(connection.from.last)
          })
        }
      },
      /**
      * __BETA__
      *
      * These functions are applicable and useful when implementing an asynchronous/non-blocking
      * feed-forward/-backward architecture that depends on something like queues in the connections
      * or something similar
      *
      * @todo Support callbacks
      * @function Neuron#can.propagate
      * @memberof Neuron.prototype
      * @instance
      * @returns {boolean} Returns `true` if this neuron can propagate
      */
      propagate: function() {
        if(self.is.output()) {
          return true
        } else {
          return _.every(self.connections.outgoing, function(connection) {
            return !_.isNil(connection.to.error)
          })
        }
      }
    }
    /**
    * __BETA__
    *
    * These functions are applicable and useful when implementing an asynchronous/non-blocking
    * feed-forward/-backward architecture that depends on something like queues in the connections
    * or something similar
    *
    * @todo Support callbacks
    * @namespace Neuron#has
    * @memberof Neuron.prototype
    * @instance
    */
    self.has = {
      /**
      * __BETA__
      *
      * These functions are applicable and useful when implementing an asynchronous/non-blocking
      * feed-forward/-backward architecture that depends on something like queues in the connections
      * or something similar
      *
      * @todo Support callbacks
      * @function Neuron#has.activated
      * @memberof Neuron.prototype
      * @instance
      * @returns {boolean} Returns `true` if this neuron has activated
      */
      activated: function(callback) {
        callback(null, !_.isEmpty(self.historic.activation.outputs))
        
        /*
        if(_.isNil(self.last)) {
          return false
        } else {
          return true
        }*/
      },
      /**
      * __BETA__
      *
      * These functions are applicable and useful when implementing an asynchronous/non-blocking
      * feed-forward/-backward architecture that depends on something like queues in the connections
      * or something similar
      *
      * @todo Support callbacks
      * @function Neuron#has.propagated
      * @memberof Neuron.prototype
      * @instance
      * @returns {boolean} Returns `true` if this neuron has propagated
      */
      propagated: function(callback) {
        callback(null, !_.isEmpty(self.historic.propagation.total_errors))
        
        /*
        if(_.isNil(self.error)) {
          return false
        } else {
          return true
        }
        */
      }
    }
    //================================
    // END (Beta) ====================
    //================================
  //================================
  // END Utility Functions =========
  //================================
  
  
  //================================
  // Core Methods ==================
  //================================
  /**
  * Projects this neuron to given neuron.
  *
  * @function Neuron#project
  * @memberof Neuron.prototype
  * @instance
  * @param {Neuron} neuron - Destination `neuron`
  * @param {number} [weight] - Connection `weight`
  * @param {ConnectionCallback} [callback] - Callback invoked with _(error, connection)_
  */
  self.project = function(neuron, weight, callback) {
    if(!callback && _.isFunction(weight)) {
      callback = weight
      weight = null
    }
    
    return new Promise(function(resolve, reject) {
      // Creates a Connection Between Neurons
      let connection = new Connection({
        from: self,
        to: neuron,
        weight: weight
      })

      // Adds Connection to both Neurons
      self.connections.outgoing.push(connection)
      neuron.connections.incoming.push(connection)
      
      return callback ? callback(null, connection) : resolve(connection)
    })
  }
  
  /**
  * Activates this neuron and returns squashed results
  *
  * @function Neuron#activate
  * @memberof Neuron.prototype
  * @instance
  * @param {number} [input] - Real number (-∞, ∞)
  * @param {NumberCallback} [callback] - Callback invoked with _(error, result)_
  */
  self.activate = function(input, callback) { 
    if(!callback && _.isFunction(input)) {
      callback = input
      input = null
    }
    
    async.auto({
      "is_input": function(callback) {
        self.is.input(callback)
      },
      "activate": ["is_input", function(results, callback) {

        // Input Neuron
        if(results.is_input) {

          async.auto({
            "validate": function(callback) {
              async.series([function(callback) {
                callback((_.isNil(input) ? new Error("'input' is not defined") : null))
              }, function(callback) {
                callback((!_.isNumber(input) ? new Error("'input' must be a 'number'") : null))
              }], callback)
            },
            "activate": ["validate", function(results, callback) {
              let output = input
              callback(null, output)
            }],
            "store": ["validate", "activate", function(results, callback) {
              self.historic.inputs.push(input)
              self.historic.activation.outputs.push(results.activate)
              callback()
            }]
          }, function(error, results) { callback(error, results.activate) })

        } 

        // Hidden + Output Nueron
        else {

          async.auto({
            "validate": function(callback) {
              async.series([function(callback) {
                callback((!_.isNil(input) ? new Error("Can't pass 'input' to a hidden/output neuron") : null))
              }], callback)
            },
            "inputs": ["validate", function(results, callback) {
              async.map(self.connections.incoming, function(connection, callback) {
                callback(null, connection.from.latest.output())
              }, callback)
            }],
            "weights": ["validate", function(results, callback) {
              async.map(self.connections.incoming, function(connection, callback) {
                callback(null, connection.weight)
              })
            }],
            "sum": ["validate", "inputs", "weights", function(results, callback) {
              callback(null, Neuron.functions.SUM(results.inputs, results.weights, self.bias))
            }],
            "squash": ["sum", function(results, callback) {
              callback(null, self.activation(results.sum))
            }],
            "store": ["sum", "squash", function(results, callback) {
              self.historic.inputs.push(input)
              self.historic.activation.sums.push(results.sum)
              self.historic.activation.outputs.push(results.squash)
              callback()
            }]
          }, function(error, results) { callback(error, results.squash) })

        }

      }]
    }, function(error, results) { callback(error, results.activate) })
    
    /*
    async.seq(function(callback) {
      // CONTEXT: Input neurons behave diffently than other neurons
      self.is.input(callback)
      
    }, function(is_input, callback) {
      // Input Neurons
      if(is_input) {
        async.series([function(callback) {
          // VALIDATION: Input neurons can't be activated without environment feedback
          callback((_.isNil(input) ? new Error("'input' is not defined") : null))
        }, function(callback) {
          callback((!_.isNumber(input) ? new Error("'input' must be a 'number'") : null))
        }, function(callback) {
          async.applyEach([function(input, callback) {
            self.historic.inputs.push(input)
            callback()
          }, function(input, callback) {
            
          }], input, callback)
        }], callback)
      }
    })(callback)
      
    async.applyEach([ function(input, callback) {
      self.historic.input.push(input)
    }], input, callback)
    */

      
      /*
      async.seq(function(callback) {
        // CONTEXT: Input neurons behave diffently than other neurons
        self.is.input(callback)
      }, function(is_input, callback) {
        if(is_input) {
          async.auto({
            "validate": function(callback) {
              async.series([function(callback) {
                
              }], callback)
            }
          })
          // Parameter Validation
          if(_.isNil(input)) {
            let error = new Error("'input' is not defined")
            return callback ? callback(error) : reject(error)
          } else if(!_.isNumber(input)) {
            let error = new Error("'input' must be a 'number'")
            return callback ? callback(error) : reject(error)
          }
          
          else {
            self.last = input
            return callback(null, self.last)
          }
          
        } else {
          
        }
      })(callback)
      */
    
    /*
      //================================
      // END Core Function =============
      //================================
      
      //================================
      // Input Neurons =================
      //================================
      if(self.is.input()) {
        //================================
        // Parameter Validation ==========
        //================================
        if(_.isNil(input)) {
          let error = new Error("'input' is not defined")
          return callback ? callback(error) : reject(error)
        } else if(!_.isNumber(input)) {
          let error = new Error("'input' must be a 'number'")
          return callback ? callback(error) : reject(error)
        } 
        //================================
        // END Parameter Validation ======
        //================================
        
        else {
          self.last = input
          return callback(null, self.last)
        }
      }
      //================================
      // END Input Neurons =============
      //================================
      
      //================================
      // Hidden + Output Neurons =======
      //================================
      else {
        if(input) {
          let error = new Error("Can't pass 'input' to a hidden/output neuron")
          return callback ? callback(error) : reject(error)
        } else if(!self.can.activate()) {
          let error = new Error("Incoming neurons have not been activated")
          return callback ? callback(error) : reject(error)
        } else {
          // Incoming Weights
          let weights = _.map(self.connections.incoming, function(connection) {
            return connection.weight
          })
          // Incoming Outputs (i.e. Inputs)
          let inputs = _.map(self.connections.incoming, function(connection) {
            return connection.from.last
          })
          // Synaptic Weight Function
          let sum = _.sum([math.parse("dot(w,i)").eval({
            w: weights,
            i: inputs
          }), self.bias])

          // Activation Function
          self.last = self.activation(sum)

          return callback ? callback(null, self.last) : resolve(self.last)
        }
      }
      //================================
      // END Hidden + Output Neurons ===
      //================================
      */
  }
  
  /**
  * Updates this neurons weight and returns error
  *
  * @function Neuron#propagate
  * @memberof Neuron.prototype
  * @instance
  * @param {number} [feedback] - Real number (-∞, ∞)
  * @param {NumberCallback} [callback] - Callback invoked with _(error, result)_
  */
  self.propagate = function(feedback, callback) {
    /*
    if(!callback && _.isFunction(feedback)) {
      callback = feedback
      feedback = null
    }
    
    async.auto({
      "has_activated": function(callback) {
        self.has.activated(callback)
      },
      "is_output": function(callback) {
        self.is.output(callback)
      },
      "validate": ["has_activated", function(results, callback) {
        callback((!results.has_activated ? new Error("Neuron has not been activated") : null))
      }],
      "propagate": ["validate", "is_output", function(results, callback) {
        
        // Output Neuron
        if(results.is_output) {
          async.auto({
            "validate": function(callback) {
              async.series([function(callback) {
                callback((_.isNil(feedback) ? new Error("'feedback' is not defined") : null))
              }, function(callback) {
                callback((!_.isNumber(feedback) ? new Error("'feedback' must be a 'number'") : null))
              }], callback)
            },
            "cost": ["validate", function(results, callback) {
              callback(null, self.cost(feedback, output))
            }]
            "propagate": ["validate", function(results, callback) {
              let output = input
              callback(null, output)
            }],
            "store": ["validate", "activate", function(results, callback) {
              self.historic.inputs.push(input)
              self.historic.activation.outputs.push(results.activate)
              callback()
            }]
          }, function(error, results) { callback(error, results.activate) })

        } 

        // Hidden + Output Nueron
        else {

          async.auto({
            "validate": function(callback) {
              async.series([function(callback) {
                callback((!_.isNil(input) ? new Error("Can't pass 'input' to a hidden/output neuron") : null))
              }], callback)
            },
            "inputs": ["validate", function(results, callback) {
              async.map(self.connections.incoming, function(connection, callback) {
                callback(null, connection.from.latest.output())
              }, callback)
            }],
            "weights": ["validate", function(results, callback) {
              async.map(self.connections.incoming, function(connection, callback) {
                callback(null, connection.weight)
              })
            }],
            "sum": ["validate", "inputs", "weights", function(results, callback) {
              callback(null, Neuron.functions.SUM(results.inputs, results.weights, self.bias))
            }],
            "squash": ["sum", function(results, callback) {
              callback(null, self.activation(results.sum))
            }],
            "store": ["sum", "squash", function(results, callback) {
              self.historic.inputs.push(input)
              self.historic.activation.sums.push(results.sum)
              self.historic.activation.outputs.push(results.squash)
              callback()
            }]
          }, function(error, results) { callback(error, results.squash) })

        }
      }]
    })
      
      // Output Neuron
      else if(self.is.output()) {
        if(_.isNil(feedback)) {
          let error = new Error("'feedback' is not defined")
          return callback ? callback(error) : reject(error)
        } else if(!_.isNumber(feedback)) {
          let error = new Error("'feedback' must be a 'number'")
          return callback ? callback(error) : reject(error)
        } else {
          // Mean Squared Error Cost Function
          self.error = (self.last - feedback) * self.activation(self.last, true)
          
          return callback(null, self.error)
        }
      }
      // Hidden/Input Neuron
      else {
        if(feedback) {
          let error = new Error("Can't pass 'feedback' to a hidden/input neuron")
          return callback ? callback(error) : reject(error)
        } else if(!self.can.propagate()) {
          let error = new Error("Outgoing neurons have not been updated")
          return callback ? callback(error) : reject(error)
        } else {
          // Outgoing Connection Weights
          let weights = _.map(self.connections.outgoing, function(connection) {
            return connection.weight
          })
          // All Incoming Critiques from Outgoing Connections
          let critiques = _.map(self.connections.outgoing, function(connection) {
            return connection.to.error
          })
          // Net Critique (Dot Product of All Incoming Critiques and their Importance)
          let sum = math.parse("dot(w,c)").eval({
            w: weights,
            c: critiques
          })
          // Net Neuron Error
          self.error = sum * self.activation(self.last, true)
          
          // Update Weights; Return Update Weights
          self.connections.outgoing = _.map(self.connections.outgoing, function(connection, index, connections) {
            connection.weight = connection.weight - self.rate * connection.to.error * self.last
            return connection
          })
          
          return callback ? callback(null, self.error) : resolve(self.error)
        }
      }
      */
    
    
    return new Promise(function(resolve, reject) {
      if(!callback && _.isFunction(feedback)) {
        callback = feedback
        feedback = null
      }
      
      if(!self.has.activated()) {
        let error = new Error("Neuron has not been activated")
        return callback ? callback(error) : reject(error)
      }
      // Output Neuron
      else if(self.is.output()) {
        if(_.isNil(feedback)) {
          let error = new Error("'feedback' is not defined")
          return callback ? callback(error) : reject(error)
        } else if(!_.isNumber(feedback)) {
          let error = new Error("'feedback' must be a 'number'")
          return callback ? callback(error) : reject(error)
        } else {
          // Mean Squared Error Cost Function
          self.error = (self.last - feedback) * self.activation(self.last, true)
          
          return callback(null, self.error)
        }
      }
      // Hidden/Input Neuron
      else {
        if(feedback) {
          let error = new Error("Can't pass 'feedback' to a hidden/input neuron")
          return callback ? callback(error) : reject(error)
        } else if(!self.can.propagate()) {
          let error = new Error("Outgoing neurons have not been updated")
          return callback ? callback(error) : reject(error)
        } else {
          // Outgoing Connection Weights
          let weights = _.map(self.connections.outgoing, function(connection) {
            return connection.weight
          })
          // All Incoming Critiques from Outgoing Connections
          let critiques = _.map(self.connections.outgoing, function(connection) {
            return connection.to.error
          })
          // Net Critique (Dot Product of All Incoming Critiques and their Importance)
          let sum = math.parse("dot(w,c)").eval({
            w: weights,
            c: critiques
          })
          // Net Neuron Error
          self.error = sum * self.activation(self.last, true)
          
          // Update Weights; Return Update Weights
          self.connections.outgoing = _.map(self.connections.outgoing, function(connection, index, connections) {
            connection.weight = connection.weight - self.rate * connection.to.error * self.last
            return connection
          })
          
          return callback ? callback(null, self.error) : resolve(self.error)
        }
      }
      
      
//       // Forward Environment Error through the Network
//       if(self.is.output()) {
//         self.error = feedback * self.activation(self.last, true)
//       }
//       // Calculate Error, Update Weights, Propagate Error Backward through the Network
//       else {
//         // Outgoing Connection Weights
//         let weights = _.map(self.connections.outgoing, function(connection) {
//           return connection.weight
//         })
//         // All Incoming Critiques from Outgoing Connections
//         let critiques = _.map(self.connections.outgoing, function(connection) {
//           return connection.to.error
//         })

//         // Net Critique (Dot Product of All Incoming Critiques and their Importance)
//         let sum = math.parse("dot(w,c)").eval({
//           w: weights,
//           c: critiques
//         })

//         // Net Neuron Error
//         self.error = sum * self.activation(self.last, true)

//         // Update Weights; Return Update Weights
//         let new_weights = _.map(self.connections.outgoing, function(connection, index, connections) {
//           connection.weight = connections[index].weight = connections[index].weight - self.rate * connections[index].to.error * self.last
//           return connection.weight
//         })
//       }
      
//       return callback ? callback(null, self.error) : resolve(self.error)
      
    })
  }
  //================================
  // END Core Methods ==============
  //================================
  
  /*
  self.weights = {
    all: (callback) => async.concat([self.connections.incoming, self.connections.outgoing], (connections, callback) => {
      async.map(connections, (connection, callback) => callback(null, connection.weight), callback)
    }, callback),
    length: (callback) => {
      self.weights.all((error, weights) => {
        callback(null, weights.length)
      })
    },
    get: (index, callback) => {
      self.weights.all((error, weights) => {
        callback(null, weights[index])
      })
    },
    set: (index, value, callback) => {
      self.weights.incoming.length((error, length) => {
        if(index < length) {
          self.connections.incoming[index].weight = value
          self.weights.get(index, callback)
        } else {
          self.connections.outgoing[index - length].weight = value
          self.weights.get(index, callback)
        }
      })
    },
    incoming: {
      all: (callback) => async.map(self.incoming, (connection, callback) => callback(null, connection.weight), callback),
      length: (callback) => {
        self.weights.incoming.all((error, weights) => {
          callback(null, weights.length)
        })
      },
      get: (index, callback) => {
        self.weights.incoming.all((error, weights) => {
          callback(null, weights[index])
        })
      },
      set: (index, value, callback) => {
        self.connections.incoming[index].weight = value
        self.weights.get(index, callback)
      },
    },
    outgoing: {
      all: (callback) => async.map(self.outgoing, (connection, callback) => callback(null, connection.weight), callback),
      length: (callback) => {
        self.weights.outgoing.all((error, weights) => {
          callback(null, weights.length)
        })
      },
      get: (index, callback) => {
        self.weights.outgoing.all((error, weights) => {
          callback(null, weights[index])
        })
      },
      set: (index, value, callback) => {
        self.connections.outgoing[index].weight = value
        self.weights.get(index, callback)
      },
    },
  }
  
//   self.activation = Neuron.activations.SIGMOID // Neuron's Squash Function
  
  // For Backpropagation
//   self.rate = 0.3 // Learning rate
//   self.last // Last Squashed Sum
//   self.error // Last Error of Synaptic Weighted Sums (Not with respect to individual weights)
  */
}

Neuron.functions = {
  /**
  * @params {[number]} x - Feedback (backprop error) or inputs (forward fed values)
  * @params {[number]} weights - Connection weights
  */
  SUM: function(x, weights, bias) {
    return _.sum(_.times(x.length, function(index) {
      return x[index] * weights[index]
    })) + (bias ? bias : 0)
//     console.log(_.times(inputs.length, function(index) {
//       return inputs[index] * weights[index]
//     }))
//     console.log(_.sum(_.times(inputs.length, function(index) {
//       return inputs[index] * weights[index]
//     })))
  }
}
/**
* @namespace Neuron.activations
* @memberof Neuron
* @static
*/
Neuron.activations = {
  /**
  * @name Neuron.activations.SIGMOID
  * @memberof Neuron
  * @static
  * @param {number} x - Real Number Input
  * @param {boolean} derivative - Return partial derivative
  */
  SIGMOID: function(x, derivative) {
    let sigmoid = 1 / (1 + Math.exp(-x))
    return derivative ? sigmoid * (1 - sigmoid) : sigmoid
  },
  /**
  * @name Neuron.activations.RELU
  * @memberof Neuron
  * @static
  * @param {number} x - Real Number Input
  * @param {boolean} derivative - Return partial derivative
  */
  RELU: function(x, derivative) {
    return derivative ? (x > 0 ? 1 : 0) : (x > 0 ? x : 0) 
  },
  /**
  * @name Neuron.activations.TANH
  * @memberof Neuron
  * @static
  * @param {number} x - Real Number Input
  * @param {boolean} derivative - Return partial derivative
  */
  TANH: function(x, derivative) {
    return derivative ? 1 - Math.pow(Math.tanh(x), 2) : Math.tanh(x)
  },
  /**
  * @name Neuron.activations.LINEAR
  * @memberof Neuron
  * @static
  * @param {number} x - Real Number Input
  * @param {boolean} derivative - Return partial derivative
  */
  LINEAR: function(x, derivative) {
    return derivative ? 1 : x
  }
}
Neuron.costs = {
  MSE: function(target, output) {
    return output - target
  }
}

/**
* @name Neuron.toActivation
* @memberof Neuron
* @static
* @param {Function|String} object - Activation function
*/
Neuron.toActivation = function(object) {
  if(typeof object === "string") {
    if(object.toLowerCase() === "sigmoid" || 
       object.toLowerCase() === "sigmoidal" ||
       object.toLowerCase() === "logistic" ||
       object.toLowerCase() === "logistics") {
      return Neuron.activations.SIGMOID
    }
    else if(object.toLowerCase() === "relu") {
      return Neuron.activations.RELU
    }
    else if(object.toLowerCase() === "tanh") {
      return Neuron.activations.TANH
    }
    else if(object.toLowerCase() === "linear" ||
              object.toLowerCase() === "identity") {
      return Neuron.activations.LINEAR
    }
    else {
      throw new Error(object + " is not a valid - or is an unsupported - activation function.\n\n" + 
                      "If you would like to create support for it, please open a up pull request on GitHub for it: https://github.com/liquidcarrot/carrot/pulls\n\n" +
                      "If you would like one of our core contributors to take a look into it, please open up an issue on GitHub describing this function in further detail: https://github.com/liquidcarrot/carrot/issues")
    }
  }
  else if(typeof object === "function") {
    return object
  }
  else{
    throw new Error("Activation function must be a 'function' or a 'string'")
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