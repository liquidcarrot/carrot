'use strict'

let _ = require('lodash')
let chalk = require('chalk')
let async = require('neo-async')

let data = [{
  inputs: [0.1, 0.1],
  outputs: [0.1]
}, {
  inputs: [0.1, 1],
  outputs: [1]
}, {
  inputs: [1, 0.1],
  outputs: [1]
}, {
  inputs: [1, 1],
  outputs: [0.1]
}]


let w0 = [Math.random(), Math.random(), Math.random(), Math.random()]
let b0 = Math.random()
let w1 = [Math.random(), Math.random()]
let b1 = Math.random()

let sigmoid = (n, d) => {
  let func = (n) => 1 / (1 + Math.exp(n))
  return d ? (func(n) * (1 - func(n))) : func(n)
}

let sum = (i, w, b) => {
  return _.sum(_.concat(_.times(i.length, n => i[n] * w[n]), b))
}

let weights = (w) => {
  console.log(_.map(w0, (w, i) => {
    return chalk.yellow("W" + i + ": ") + w + "; "
  }).join(""))
  console.log(_.map(w1, (w, i) => {
    return chalk.yellow("W" + i + ": ") + w + "; "
  }).join(""))
}

weights()

let h0 = sigmoid(sum(data[0].inputs, _.slice(w0, 0, 2), b0))
let h1 = sigmoid(sum(data[0].inputs, _.slice(w0, 2, 4), b0))
let o = sigmoid(sum([h0, h1], w1, b1))

console.log(chalk.blue("H0: ") + h0 + chalk.blue("; H1: ") + h1 + chalk.blue("; O: ") + o)

let eo = o - data[1].outputs[0]
let no = o * (1 - o)
let eo0 = eo * no * h0
let eo1 = eo * no * h1

console.log(eo)
console.log(no)
console.log(eo0)
console.log(eo1)

