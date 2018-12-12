'use strict'

let expect  = require('chai').expect

describe.skip("Layer", function() {

  describe("Layer", function() {
    let Layer = require('../src/layer')

    describe("new Layer()", function() {
      it("should create a layer", function(done) {    
        let layer = Layer()

        expect(layer).to.not.be.null
        expect(layer).to.not.be.undefined
        expect(layer).to.not.be.NaN
        expect(layer).to.exist

        done()
      })
      it("should create layer with an empty neurons array", function(done) {
        let layer = Layer()

        expect(layer.neurons).to.exist
        expect(layer.neurons).to.be.an("array")
        expect(layer.neurons).to.have.lengthOf(0)

        done()
      })
    })

    describe.skip("new Layer(n)", function() {
      it("should create a layer", function(done) {    
        let layer = Layer()

        expect(layer).to.not.be.null
        expect(layer).to.not.be.undefined
        expect(layer).to.not.be.NaN
        expect(layer).to.exist

        done()
      })
      it("should create layer with an empty connections array", function(done) {
        let layer = Layer()

        expect(layer.connections).to.exist
        expect(layer.connections).to.be.an("array")
        expect(layer.connections).to.have.lengthOf(0)

        done()
      })
      it("should create layer with an empty states array", function(done) {
        let layer = Layer()

        expect(layer.states).to.exist
        expect(layer.states).to.be.an("array")
        expect(layer.connections).to.have.lengthOf(0)

        done()
      })
    })

    describe.skip(".project()", function() {
      it("should create a connection", function(done) {
        let n0 = Layer()
        let n1 = Layer()

        n0.project(n1, function(error, connection) {
          expect(error).to.not.exist
          expect(error).to.be.null
          expect(connection).to.exist
          expect(connection).to.be.an("object")
          expect(connection.from).to.exist
          expect(connection.to).to.exist
          expect(connection.weight).to.exist
          done()
        })
      })
      it("should add a connection to source layer", function(done) {
        let l0 = Layer()
        let l1 = Layer()

        expect(l0.connections).to.have.lengthOf(0)

        l0.project(l1, function(error, connection) {
          expect(l0.connections).to.have.lengthOf(1)
          expect(l0.connections[0].from).equal(l0)
          expect(l0.connections[0].to).equal(l1)
          done()
        })
      })
      it("should add a connection to destination layer", function(done) {
        let l0 = Layer()
        let l1 = Layer()

        expect(l1.connections).to.have.lengthOf(0)

        l0.project(l1, function(error, connection) {
          expect(l1.connections).to.have.lengthOf(1)
          expect(l1.connections[0].to).equal(l1)
          expect(l1.connections[0].from).equal(l0)
          done()
        })
      })
    })

    describe.skip(".run()", function() {
      it("should take an array of numbers as parameter", function(done) {

        done()
      })
      it("should return a number", function(done) {

        done()
      })
    })

    describe.skip(".propogate()", function() {
      it("should take a number as a parameter", function(done) {

        done()
      })
      it("should take an array of numbers as a parameter", function(done) {

        done()
      })
      it("should return a number", function(done) {

        done()
      })
    })
  })
})

/*
// TESTS

const n0 = Neuron({ connections: ['input'], states: [0.01] })
const n1 = Neuron({ connections: ['input'], states: [0.01] })
const n2 = Neuron({ connections: ['input'], states: [0.01] })
const n3 = Neuron({ connections: [n0, n1, n2], states: [0.01] })

console.log('\n' + 'neuron (to be connected) connections:')
async.times(n3.connections.length, (i)=>{ console.log(n3.connections[i]) }) 

const l0 = layer({})

l0.createNeurons(3, [0.02,0.9,0.8])

console.log('\n' + 'layer neurons (to be connected) connections:')
async.times(l0.neurons.length, (i)=>{ console.log(l0.neurons[i].connections) }) 

l0.connectNeuron(n3)

console.log('\n' + 'neuron (post-connection) connections:') // neuron should have 3 connections from itself to neurons within layer
async.times(n3.connections.length, (i)=>{ console.log(n3.connections[i]) }) 

console.log('\n' + 'layer (post-connection) connections:') // each layer neurons should have 1 connection from n3 to itself
async.times(l0.neurons.length, (i)=>{ console.log(l0.neurons[i].connections) })

l0.run([0.2,0.2,0.2], (err, res)=>{console.log(err, res)})

l0.bestGuess((err, res)=>{ console.log(res) })

*/
