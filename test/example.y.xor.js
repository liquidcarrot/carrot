'use strict'

let _ = require('lodash')
let async = require('async')
let chai = require('chai')
let math = require('mathjs')
let chalk = require('chalk')

chai.use(require('chai-each'))

let expect = chai.expect


describe("XOR", function() {
  
  describe("w/ Neurons", function() {
    let Neuron = require('../src/neuron.y')

    it("should work with neurons", function() {
      let i0 = new Neuron()
      let i1 = new Neuron()
      let h0 = new Neuron()
      let h1 = new Neuron()
      let o0 = new Neuron()

      i0.project(h0)
      i0.project(h1)
      i1.project(h0)
      i1.project(h1)
      h0.project(o0)
      h1.project(o0)
      
      let learningRate = 0.3;

      // train the network
      for (var index = 0; index < 20000; index++) {
        // 0,0 => 0
        i0.activate(0)
        i1.activate(0)
        h0.activate()
        h1.activate()
        o0.activate()
        o0.propagate(learningRate, 0)
        h1.propagate()
        h0.propagate()
        i1.propagate()
        i0.propagate()

        // 0,1 => 1
        i0.activate(0)
        i1.activate(1)
        h0.activate()
        h1.activate()
        o0.activate()
        o0.propagate(learningRate, 1)
        h1.propagate()
        h0.propagate()
        i1.propagate()
        i0.propagate()

        // 1,0 => 1
        i0.activate(1)
        i1.activate(0)
        h0.activate()
        h1.activate()
        o0.activate()
        o0.propagate(learningRate, 1)
        h1.propagate()
        h0.propagate()
        i1.propagate()
        i0.propagate()

        // 1,1 => 0
        i0.activate(1)
        i1.activate(1)
        h0.activate()
        h1.activate()
        o0.activate()
        o0.propagate(learningRate, 0)
        h1.propagate()
        h0.propagate()
        i1.propagate()
        i0.propagate()
      }

      // test the network
      i0.activate(0)
      i1.activate(0)
      h0.activate()
      h1.activate()
      console.log(o0.activate()); // [0.015020775950893527]

      i0.activate(0)
      i1.activate(1)
      h0.activate()
      h1.activate()
      console.log(o0.activate()); // [0.9815816381088985]

      i0.activate(1)
      i1.activate(0)
      h0.activate()
      h1.activate()
      console.log(o0.activate()); // [0.9871822457132193]

      i0.activate(1)
      i1.activate(1)
      h0.activate()
      h1.activate()
      console.log(o0.activate()); // [0.012950087641929467]
    })
  })
  
  describe("w/ Layers", function() {
    let Layer = require('../src/layer.y')
    
    it("should work with layers", function() {
      let i = new Layer(2)
      let h = new Layer(2)
      let o = new Layer(1)
      
      i.project(h)
      h.project(o)
      
      let learningRate = 0.3;
      
      // train the network
      for (var index = 0; index < 20000; index++) {
        // 0,0 => 0
        i.activate([0,0])
        h.activate()
        o.activate()
        o.propagate(learningRate, [0])
        h.propagate()
        i.propagate()

        // 0,1 => 1
        i.activate([0,1])
        h.activate()
        o.activate()
        o.propagate(learningRate, [1])
        h.propagate()
        i.propagate()

        // 1,0 => 1
        i.activate([1,0])
        h.activate()
        o.activate()
        o.propagate(learningRate, [1])
        h.propagate()
        i.propagate()

        // 1,1 => 0
        i.activate([1,1])
        h.activate()
        o.activate()
        o.propagate(learningRate, [0])
        h.propagate()
        i.propagate()
      }

      // test the network
      i.activate([0, 0])
      h.activate()
      console.log(o.activate()); // [0.015020775950893527]

      i.activate([0, 1])
      h.activate()
      console.log(o.activate()); // [0.9815816381088985]

      i.activate([1, 0])
      h.activate()
      console.log(o.activate()); // [0.9871822457132193]

      i.activate([1, 1])
      h.activate()
      console.log(o.activate()); // [0.012950087641929467]
    })
  })
  
  describe("w/ Network", function() {
    let Layer = require('../src/layer.y')
    let Network = require('../src/network.y')
    
    it("should work with networks", function() {
      let i = new Layer(2)
      let h = new Layer(2)
      let o = new Layer(1)
      
      i.project(h)
      h.project(o)
      
      let net = new Network({
        input: i,
        hidden: [h],
        output: o
      })
      
      let learningRate = 0.3
      
      // train the network
      for (var index = 0; index < 20000; index++) {
        // 0,0 => 0
        net.activate([0,0])
        net.propagate(learningRate, [0])

        // 0,1 => 1
        net.activate([0,1])
        net.propagate(learningRate, [1])

        // 1,0 => 1
        net.activate([1,0])
        net.propagate(learningRate, [1])

        // 1,1 => 0
        net.activate([1,1])
        net.propagate(learningRate, [0])
      }

      // test the network
      console.log(net.activate([0,0])); // [0.015020775950893527]
      console.log(net.activate([0,1])); // [0.9815816381088985]
      console.log(net.activate([1,0])); // [0.9871822457132193]
      console.log(net.activate([1,1])); // [0.012950087641929467]
    })
  })
  
  describe("w/ Architecture", function() {
    let Architecture = require('../src/architecture.y')
    
    it("should work with pre-built architectures", function() {
      let net = new Architecture.Perceptron(2,2,1)
    
      let learningRate = 0.3
      
      // train the network
      for (var index = 0; index < 20000; index++) {
        // 0,0 => 0
        net.activate([0,0])
        net.propagate(learningRate, [0])

        // 0,1 => 1
        net.activate([0,1])
        net.propagate(learningRate, [1])

        // 1,0 => 1
        net.activate([1,0])
        net.propagate(learningRate, [1])

        // 1,1 => 0
        net.activate([1,1])
        net.propagate(learningRate, [0])
      }

      // test the network
      console.log(net.activate([0,0])); // [0.015020775950893527]
      console.log(net.activate([0,1])); // [0.9815816381088985]
      console.log(net.activate([1,0])); // [0.9871822457132193]
      console.log(net.activate([1,1])); // [0.012950087641929467]
      
    })
  })
  
  describe("w/ Trainer", function() {
    let Architecture = require('../src/architecture.y')
    let Trainer = require('../src/trainer.y')
    
    it("should work with a trainer", function() {
      let net = new Architecture.Perceptron(2,2,1)
      let trainer = new Trainer(net)
      
      let data = [{
        input: [0,0],
        output: [0]
      }, {
        input: [0,1],
        output: [1]
      }, {
        input: [1,0],
        output: [1]
      }, {
        input: [1,1],
        output: [0]
      }]
      
      // train the network
      trainer.train(data)
      
      // test the network
      console.log(net.activate([0,0])); // [0.015020775950893527]
      console.log(net.activate([0,1])); // [0.9815816381088985]
      console.log(net.activate([1,0])); // [0.9871822457132193]
      console.log(net.activate([1,1])); // [0.012950087641929467]
    })
  })
  
  describe("w/ Pre-Built Trainer", function() {
    let Architecture = require('../src/architecture.y')
    let Trainer = require('../src/trainer.y')
    
    it("should work with a pre-built trainer", function() {
      let net = new Architecture.Perceptron(2,2,1)
      let trainer = new Trainer(net)
      
      // train the network
      trainer.XOR()
      
      // test the network
      console.log(net.activate([0,0])); // [0.015020775950893527]
      console.log(net.activate([0,1])); // [0.9815816381088985]
      console.log(net.activate([1,0])); // [0.9871822457132193]
      console.log(net.activate([1,1])); // [0.012950087641929467]
    })
  })
})