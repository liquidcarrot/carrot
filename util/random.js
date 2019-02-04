'use strict'

let _ = require('lodash')
let faker = require('faker')
let Neuron = require('../src/neuron')
let Layer = require('../src/layer')
let Network = require('../src/network')

let random = {
  number: () => Math.round(Math.random() * 10 + 1),
  size: () => random.number(),
  neurons: () => _.times(random.size(), index => new Neuron()),
  inputs: (n) => _.times((n || random.number()), index => random.number()),
  feedback: (n) => _.times((n || random.number()), index => random.number()),
  layer: () => new Layer(random.size()),
  bias: () => Math.random(),
  rate: () => Math.random(),
  activation: () => faker.random.arrayElement(["sigmoid", "sigmoidal", "logistic", "logistics", "relu", "tanh", "linear", "identity", function(x, derivative) {
    return !derivative ? Math.atan(x) : (1 / (Math.pow(x, 2) + 1))
  }]),
  /*
  * Returns a random connections object
  *
  * @param {"layers"|"neurons"|null} type - Will return a connections contructions object prototype of the `type` given
  */
  connections: (type) => type === "layers" || type === "neurons" ? ({
    incoming: ((type) => type === "layers" ? random.layer() : type === "neurons" ? random.neurons() : random.neurons())(type),
    outgoing: ((type) => type === "layers" ? random.layer() : type === "neurons" ? random.neurons() : random.neurons())(type)
  }) : ({
    incoming: [],
    outgoing: []
  }),
  options: (connections) => ({
    bias: random.bias(),
    rate: random.rate(),
    activation: random.activation(),
    connections: random.connections(connections)
  })
}

module.exports = random