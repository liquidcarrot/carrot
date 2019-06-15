const _ = require("lodash");
const { assert, expect } = require('chai');
const should = require('chai').should();
const {activation} = require('../../../src/carrot');
 
describe("activation", function(){
  describe("activation.LOGISTIC()", function() {
    it("activation.LOGISTIC() => {ReferenceError}")
    it("activation.LOGISTIC(number) => {number}")
    it("activation.LOGISTIC(number, derivative=true) => {number}")
    it("activation.LOGISTIC(undefined, derivative=true) => {ReferenceError}")
    it("activation.LOGISTIC(numbers) => {number[]}")
    it("activation.LOGISTIC(numbers, derivative=true) => {number[]}")
  })
  describe("activation.TANH()", function(){
    it("activation.TANH() => {ReferenceError}", function(){
      expect(() => activation.TANH()).to.throw(ReferenceError);
    })
    it("activation.TANH(number, derivative=false) => {number}", function(){
      const x = _.random(-50, 50, true);
      expect(activation.TANH(x, false)).to.equal(Math.tanh(x));
    })
    it("activation.TANH(number, derivative=true) => {number}", function(){
      const x = _.random(-50, 50, true);
      expect(activation.TANH(x, true)).to.equal(1 - Math.pow(Math.tanh(x), 2));
    })
    it("activation.TANH(undefined, derivative=true) => {ReferenceError}", function(){
      expect(() => activation.TANH(undefined,true)).to.throw(ReferenceError);
    })
    it("activation.TANH(numbers, derivative=false) => {number[]}", function(){
      const x = Array.from({ length: _.random(1, 5) }, () => _.random(-50, 50,  true));
      const z = _.map(x, x => Math.tanh(x));
      
      expect(activation.TANH(x, false)).to.eql(z);
    })
    it("activation.TANH(numbers, derivative=true) => {number[]}", function(){
      const x = Array.from({ length: _.random(1, 5) }, () => _.random(-50, 50,  true));
      const z = _.map(x, x => 1 - Math.pow(Math.tanh(x), 2));
      
      expect(activation.TANH(x, true)).to.eql(z);
    })
  })
  describe("activation.IDENTITY()", function() {
    it("activation.IDENTITY() => {ReferenceError}")
    it("activation.IDENTITY(number) => {number}")
    it("activation.IDENTITY(number, derivative=true) => {number}")
    it("activation.IDENTITY(undefined, derivative=true) => {ReferenceError}")
    it("activation.IDENTITY(numbers) => {number[]}")
    it("activation.IDENTITY(numbers, derivative=true) => {number[]}")
  })
  describe("activation.STEP()", function() {
    it("activation.STEP() => {ReferenceError}")
    it("activation.STEP(number) => {number}")
    it("activation.STEP(number, derivative=true) => {number}")
    it("activation.STEP(undefined, derivative=true) => {ReferenceError}")
    it("activation.STEP(numbers) => {number[]}")
    it("activation.STEP(numbers, derivative=true) => {number[]}")
  })
  describe("activation.RELU()", function() {
    it("activation.RELU() => {ReferenceError}")
    it("activation.RELU(number) => {number}")
    it("activation.RELU(number, derivative=true) => {number}")
    it("activation.RELU(undefined, derivative=true) => {ReferenceError}")
    it("activation.RELU(numbers) => {number[]}")
    it("activation.RELU(numbers, derivative=true) => {number[]}")
  })
  describe("activation.SOFTSIGN()", function() {
    it("activation.SOFTSIGN() => {ReferenceError}")
    it("activation.SOFTSIGN(number) => {number}")
    it("activation.SOFTSIGN(number, derivative=true) => {number}")
    it("activation.SOFTSIGN(undefined, derivative=true) => {ReferenceError}")
    it("activation.SOFTSIGN(numbers) => {number[]}")
    it("activation.SOFTSIGN(numbers, derivative=true) => {number[]}")
  })
  describe("activation.SINUSOID()", function() {
    it("activation.SINUSOID() => {ReferenceError}")
    it("activation.SINUSOID(number) => {number}")
    it("activation.SINUSOID(number, derivative=true) => {number}")
    it("activation.SINUSOID(undefined, derivative=true) => {ReferenceError}")
    it("activation.SINUSOID(numbers) => {number[]}")
    it("activation.SINUSOID(numbers, derivative=true) => {number[]}")
  })
  describe("activation.GAUSSIAN()", function() {
    it("activation.GAUSSIAN() => {ReferenceError}")
    it("activation.GAUSSIAN(number) => {number}")
    it("activation.GAUSSIAN(number, derivative=true) => {number}")
    it("activation.GAUSSIAN(undefined, derivative=true) => {ReferenceError}")
    it("activation.GAUSSIAN(numbers) => {number[]}")
    it("activation.GAUSSIAN(numbers, derivative=true) => {number[]}")
  })
  describe("activation.BENT_IDENTITY()", function() {
    it("activation.BENT_IDENTITY() => {ReferenceError}")
    it("activation.BENT_IDENTITY(number) => {number}")
    it("activation.BENT_IDENTITY(number, derivative=true) => {number}")
    it("activation.BENT_IDENTITY(undefined, derivative=true) => {ReferenceError}")
    it("activation.BENT_IDENTITY(numbers) => {number[]}")
    it("activation.BENT_IDENTITY(numbers, derivative=true) => {number[]}")
  })
  describe("activation.BIPOLAR()", function() {
    it("activation.BIPOLAR() => {ReferenceError}")
    it("activation.BIPOLAR(number) => {number}")
    it("activation.BIPOLAR(number, derivative=true) => {number}")
    it("activation.BIPOLAR(undefined, derivative=true) => {ReferenceError}")
    it("activation.BIPOLAR(numbers) => {number[]}")
    it("activation.BIPOLAR(numbers, derivative=true) => {number[]}")
  })
  describe("activation.BIPOLAR_SIGMOID()", function() {
    it("activation.BIPOLAR_SIGMOID() => {ReferenceError}")
    it("activation.BIPOLAR_SIGMOID(number) => {number}")
    it("activation.BIPOLAR_SIGMOID(number, derivative=true) => {number}")
    it("activation.BIPOLAR_SIGMOID(undefined, derivative=true) => {ReferenceError}")
    it("activation.BIPOLAR_SIGMOID(numbers) => {number[]}")
    it("activation.BIPOLAR_SIGMOID(numbers, derivative=true) => {number[]}")
  })
  describe("activation.HARD_TANH()", function() {
    it("activation.HARD_TANH() => {ReferenceError}")
    it("activation.HARD_TANH(number) => {number}")
    it("activation.HARD_TANH(number, derivative=true) => {number}")
    it("activation.HARD_TANH(undefined, derivative=true) => {ReferenceError}")
    it("activation.HARD_TANH(numbers) => {number[]}")
    it("activation.HARD_TANH(numbers, derivative=true) => {number[]}")
  })
  describe("activation.ABSOLUTE()", function() {
    it("activation.ABSOLUTE() => {ReferenceError}")
    it("activation.ABSOLUTE(number) => {number}")
    it("activation.ABSOLUTE(number, derivative=true) => {number}")
    it("activation.ABSOLUTE(undefined, derivative=true) => {ReferenceError}")
    it("activation.ABSOLUTE(numbers) => {number[]}")
    it("activation.ABSOLUTE(numbers, derivative=true) => {number[]}")
  })
  describe("activation.INVERSE()", function() {
    it("activation.INVERSE() => {ReferenceError}")
    it("activation.INVERSE(number) => {number}")
    it("activation.INVERSE(number, derivative=true) => {number}")
    it("activation.INVERSE(undefined, derivative=true) => {ReferenceError}")
    it("activation.INVERSE(numbers) => {number[]}")
    it("activation.INVERSE(numbers, derivative=true) => {number[]}")
  })
  describe("activation.SELU()", function() {
    it("activation.SELU() => {ReferenceError}")
    it("activation.SELU(number) => {number}")
    it("activation.SELU(number, derivative=true) => {number}")
    it("activation.SELU(undefined, derivative=true) => {ReferenceError}")
    it("activation.SELU(numbers) => {number[]}")
    it("activation.SELU(numbers, derivative=true) => {number[]}")
  })
})





