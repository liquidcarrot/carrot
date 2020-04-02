const _ = require("lodash");
const { assert, expect } = require('chai');
const should = require('chai').should();
const { activation } = require('../../../src/index');

describe("activation", function() {
  describe("activation.LOGISTIC()", function() {
    it("activation.LOGISTIC() => {ReferenceError}", function(){
      const x = _.random(-50, 50, true);
      expect(() => activation.LOGISTIC()).to.throw(ReferenceError);
    })
    it("activation.LOGISTIC(number, derivate=false) => {number}", function(){
      const x = _.random(-50, 50, true);
      expect(activation.LOGISTIC(x, false)).to.equal(1 / (1 + Math.exp(-x)));
    })
    it("activation.LOGISTIC(number, derivate=true) => {number}", function(){
      const x = _.random(-50, 50, true);
      expect(activation.LOGISTIC(x, true)).to.equal((Math.exp(-x) / Math.pow(1 + Math.exp(-x), 2)));
    })
    it("activation.LOGISTIC(undefined, derivate=true) => {ReferenceError}", function(){
      expect(() => activation.LOGISTIC(undefined,true)).to.throw(ReferenceError);
    })
    it("activation.LOGISTIC(numbers, derivate=false) => {number[]}", function() {
      const x = Array.from({ length: _.random(1, 5) }, () => _.random(-50, 50,  true));
      const z = _.map(x, x => 1 / (1 + Math.exp(-x)));
      expect(activation.LOGISTIC(x, false)).to.eql(z);
    })
    it("activation.LOGISTIC(numbers, derivate=true) => {number[]}", function(){
      const x = Array.from({ length: _.random(1, 5) }, () => _.random(-50, 50,  true));
      const z = _.map(x, x => Math.exp(-x) / Math.pow(1 + Math.exp(-x), 2));
      expect(activation.LOGISTIC(x, true)).to.eql(z);
    })
  })
  describe("activation.TANH()", function(){
    it("activation.TANH() => {ReferenceError}", function(){
      expect(() => activation.TANH()).to.throw(ReferenceError);
    })
    it("activation.TANH(number, derivate=false) => {number}", function(){
      const x = _.random(-50, 50, true);
      expect(activation.TANH(x, false)).to.equal(Math.tanh(x));
    })
    it("activation.TANH(number, derivate=true) => {number}", function(){
      const x = _.random(-50, 50, true);
      expect(activation.TANH(x, true)).to.equal(1 - Math.pow(Math.tanh(x), 2));
    })
    it("activation.TANH(undefined, derivate=true) => {ReferenceError}", function(){
      expect(() => activation.TANH(undefined,true)).to.throw(ReferenceError);
    })
    it("activation.TANH(numbers, derivate=false) => {number[]}", function(){
      const x = Array.from({ length: _.random(1, 5) }, () => _.random(-50, 50,  true));
      const z = _.map(x, x => Math.tanh(x));

      expect(activation.TANH(x, false)).to.eql(z);
    })
    it("activation.TANH(numbers, derivate=true) => {number[]}", function(){
      const x = Array.from({ length: _.random(1, 5) }, () => _.random(-50, 50,  true));
      const z = _.map(x, x => 1 - Math.pow(Math.tanh(x), 2));

      expect(activation.TANH(x, true)).to.eql(z);
    })
  })
  describe("activation.IDENTITY()", function() {
    it("activation.IDENTITY() => {ReferenceError}",function(){
      expect(() => activation.IDENTITY()).to.throw(ReferenceError);
      })
    it("activation.IDENTITY(number, derivate=false) => {number}", function(){
      const x = _.random(-50, 50, true);
      expect(activation.IDENTITY(x, false)).to.equal(x);
  })
    it("activation.IDENTITY(number, derivate=true) => {number}", function(){
      const x = _.random(-50, 50, true);
      expect(activation.IDENTITY(x, true)).to.equal(1);
    })
    it("activation.IDENTITY(undefined, derivate=true) => {ReferenceError}",function(){
      expect(() => activation.IDENTITY(undefined, true)).to.throw(ReferenceError);
    })
    it("activation.IDENTITY(numbers, derivate=false) => {number[]}", function(){
      const x = Array.from({ length: _.random(1, 5) }, () => _.random(-50, 50,  true));
      expect(activation.IDENTITY(x, false)).to.eql(x);
    })
    it("activation.IDENTITY(numbers, derivate=true) => {number[]}", function(){
      const x = Array.from({ length: _.random(1, 5) }, () => _.random(-50, 50,  true));
      const z = _.map(x, x => 1);
      expect(activation.IDENTITY(x, true)).to.eql(z);
    })
  })
  describe("activation.STEP()", function() {
    it("activation.STEP() => {ReferenceError}",function(){
      expect(() => activation.STEP()).to.throw(ReferenceError);
      })
    it("activation.STEP(number) => {number}", function(){
      const x = _.random(-50, 50, true);
      const z = x > 0 ? 1 : 0;
      expect(activation.STEP(x, false)).to.equal(z);
  })
    it("activation.STEP(number, derivate=true) => {number}", function(){
      const x = _.random(-50, 50, true);
      expect(activation.STEP(x, true)).to.equal(0);
    })
    it("activation.STEP(undefined, derivate=true) => {ReferenceError}",function(){
      expect(() => activation.STEP(undefined, true)).to.throw(ReferenceError);
      })
    it("activation.STEP(numbers, derivate=false) => {number[]}", function(){
      const x = Array.from({ length: _.random(1, 5) }, () => _.random(-50, 50,  true));
      const z = _.map(x, x => x > 0 ? 1 : 0);
      expect(activation.STEP(x, false)).to.eql(z);
    })
    it("activation.STEP(numbers, derivate=true) => {number[]}", function(){
      const x = Array.from({ length: _.random(1, 5) }, () => _.random(-50, 50,  true));
      const z = _.map(x, x => 0);
      expect(activation.STEP(x, true)).to.eql(z);
    })
  })
  describe("activation.RELU()", function() {
    it("activation.RELU() => {ReferenceError}",function(){
      expect(() => activation.RELU()).to.throw(ReferenceError);
      })
    it("activation.RELU(number) => {number, derivate=false}", function(){
      const x = _.random(-50, 50, true);
      const z = x > 0 ? x : 0;
      expect(activation.RELU(x, false)).to.equal(z);
    })
    it("activation.RELU(number, derivate=true) => {number}", function(){
      const x = _.random(-50, 50, true);
      const z = x > 0 ? 1 : 0;
      expect(activation.RELU(x, true)).to.equal(z);
    })
    it("activation.RELU(undefined, derivate=true) => {ReferenceError}",function(){
      expect(() => activation.RELU(undefined, true)).to.throw(ReferenceError);
      })
    it("activation.RELU(numbers, derivate=false) => {number[]}", function(){
      const x = Array.from({ length: _.random(1, 5) }, () => _.random(-50, 50,  true));
      const z = _.map(x, x => x > 0 ? x : 0);
      expect(activation.RELU(x, false)).to.eql(z);
    })
    it("activation.RELU(numbers, derivate=true) => {number[]}", function(){
      const x = Array.from({ length: _.random(1, 5) }, () => _.random(-50, 50,  true));
      const z = _.map(x, x => x > 0 ? 1 : 0);
      expect(activation.RELU(x, true)).to.eql(z);
    })
  })
  describe("activation.SOFTSIGN()", function() {
    it("activation.SOFTSIGN() => {ReferenceError}",function(){
      expect(() => activation.SOFTSIGN()).to.throw(ReferenceError);
      })
    it("activation.SOFTSIGN(number, derivate=false) => {number}", function(){
      const x = _.random(-50, 50, true);
      expect(activation.SOFTSIGN(x, false)).to.equal(x / (1 + Math.abs(x)));
    })
    it("activation.SOFTSIGN(number, derivate=true) => {number}", function(){
      const x = _.random(-50, 50, true)
      expect(activation.SOFTSIGN(x, true)).to.equal((x / Math.pow(1 + Math.abs(x), 2)));
    })
    it("activation.SOFTSIGN(undefined, derivate=true) => {ReferenceError}",function(){
      expect(() => activation.SOFTSIGN(undefined, true)).to.throw(ReferenceError);
      })
    it("activation.SOFTSIGN(numbers, derivate=false) => {number[]}", function(){
      const x = Array.from({ length: _.random(1, 5) }, () => _.random(-50, 50,  true));
      const z = _.map(x, x => x / (1 + Math.abs(x)));
      expect(activation.SOFTSIGN(x, false)).to.eql(z);
    })
    it("activation.SOFTSIGN(numbers, derivate=true) => {number[]}", function(){
      const x = Array.from({ length: _.random(1, 5) }, () => _.random(-50, 50,  true));
      const z = _.map(x, x => x / Math.pow(1 + Math.abs(x), 2));
      expect(activation.SOFTSIGN(x, true)).to.eql(z);
    })
  })
  describe("activation.SINUSOID()", function() {
    it("activation.SINUSOID() => {ReferenceError}",function(){
      expect(() => activation.SINUSOID()).to.throw(ReferenceError);
      })
    it("activation.SINUSOID(number, derivate=false) => {number}", function(){
      const x = _.random(-50, 50, true)
      expect(activation.SINUSOID(x, false)).to.equal(Math.sin(x));
    })
    it("activation.SINUSOID(number, derivate=true) => {number}", function(){
      const x = _.random(-50, 50, true)
      expect(activation.SINUSOID(x, true)).to.equal(Math.cos(x));
    })
    it("activation.SINUSOID(undefined, derivate=true) => {ReferenceError}",function(){
      expect(() => activation.SINUSOID(undefined, true)).to.throw(ReferenceError);
      })
    it("activation.SINUSOID(numbers, derivate=false) => {number[]}", function(){
      const x = Array.from({ length: _.random(1, 5) }, () => _.random(-50, 50,  true));
      const z = _.map(x, x => Math.sin(x));
      expect(activation.SINUSOID(x, false)).to.eql(z);
    })
    it("activation.SINUSOID(numbers, derivate=true) => {number[]}", function(){
      const x = Array.from({ length: _.random(1, 5) }, () => _.random(-50, 50,  true));
      const z = _.map(x, x => Math.cos(x));
      expect(activation.SINUSOID(x, true)).to.eql(z);
    })
  })
  describe("activation.GAUSSIAN()", function() {
    it("activation.GAUSSIAN() => {ReferenceError}",function(){
      expect(() => activation.GAUSSIAN()).to.throw(ReferenceError);
      })
    it("activation.GAUSSIAN(number) => {number, derivate=false}", function(){
      const x = _.random(-50, 50, true)
      expect(activation.GAUSSIAN(x, false)).to.equal(Math.exp(-Math.pow(x, 2)));
    })
    it("activation.GAUSSIAN(number, derivate=true) => {number}", function(){
      const x = _.random(-50, 50, true)
      expect(activation.GAUSSIAN(x, true)).to.equal(-2 * x * Math.exp(-Math.pow(x, 2)));
    })
    it("activation.GAUSSIAN(undefined, derivate=true) => {ReferenceError}",function(){
      expect(() => activation.GAUSSIAN(undefined, true)).to.throw(ReferenceError);
      })
    it("activation.GAUSSIAN(numbers, derivate=false) => {number[]}", function(){
      const x = Array.from({ length: _.random(1, 5) }, () => _.random(-50, 50,  true));
      const z = _.map(x, x => Math.exp(-Math.pow(x, 2)));
      expect(activation.GAUSSIAN(x, false)).to.eql(z);
    })
    it("activation.GAUSSIAN(numbers, derivate=true) => {number[]}", function(){
      const x = Array.from({ length: _.random(1, 5) }, () => _.random(-50, 50,  true));
      const z = _.map(x, x =>  -2 * x * Math.exp(-Math.pow(x, 2)));
      expect(activation.GAUSSIAN(x, true)).to.eql(z);
    })
  })
  describe("activation.BENT_IDENTITY()", function() {
    it("activation.BENT_IDENTITY() => {ReferenceError}",function(){
      expect(() => activation.BENT_IDENTITY()).to.throw(ReferenceError);
      })
    it("activation.BENT_IDENTITY(number, derivate=false) => {number}", function(){
      const x = _.random(-50, 50, true)
      expect(activation.BENT_IDENTITY(x, false)).to.equal((Math.sqrt(Math.pow(x, 2) + 1) - 1) / 2 + x);
    })
    it("activation.BENT_IDENTITY(number, derivate=true) => {number}", function(){
      const x = _.random(-50, 50, true)
      expect(activation.BENT_IDENTITY(x, true)).to.equal(x / (2 * Math.sqrt(Math.pow(x, 2) + 1)) + 1 );
    })
    it("activation.BENT_IDENTITY(undefined, derivate=true) => {ReferenceError}",function(){
      expect(() => activation.BENT_IDENTITY(undefined, true)).to.throw(ReferenceError);
      })
    it("activation.BENT_IDENTITY(numbers, derivate=false) => {number[]}", function(){
      const x = Array.from({ length: _.random(1,5)}, () => _.random(-50, 50,  true));
      const z = _.map(x, x =>  (Math.sqrt(Math.pow(x,2) + 1) - 1) / 2 + x);
      expect(activation.BENT_IDENTITY(x, false)).to.eql(z);
    })
    it("activation.BENT_IDENTITY(numbers, derivate=true) => {number[]}", function(){
      const x = Array.from({ length: _.random(1,5)}, () => _.random(-50, 50,  true));
      const z = _.map(x, x =>  x / (2 * Math.sqrt(Math.pow(x,2) + 1)) + 1);
      expect(activation.BENT_IDENTITY(x, true)).to.eql(z);
    })
  })
  describe("activation.BIPOLAR()", function() {
    it("activation.BIPOLAR() => {ReferenceError}",function(){
      expect(() => activation.BIPOLAR()).to.throw(ReferenceError);
      })
    it("activation.BIPOLAR(number, derivate=false) => {number}", function(){
      const x = _.random(-50, 50, true)
      expect(activation.BIPOLAR(x, false)).to.equal(x > 0 ? 1 : -1 );
    })
    it("activation.BIPOLAR(number, derivate=true) => {number}", function(){
      const x = _.random(-50, 50, true)
      expect(activation.BIPOLAR(x, true)).to.equal(0);
    })
    it("activation.BIPOLAR(undefined, derivate=true) => {ReferenceError}",function(){
      expect(() => activation.BIPOLAR(undefined, true)).to.throw(ReferenceError);
      })
    it("activation.BIPOLAR(numbers, derivate=false) => {number[]}", function(){
      const x = Array.from({ length: _.random(1,5)}, () => _.random(-50, 50,  true));
      expect(activation.BIPOLAR(x, false)).to.eql(_.map(x, x => x > 0 ? 1 : -1));
    })
    it("activation.BIPOLAR(numbers, derivate=true) => {number[]}", function(){
      const x = Array.from({ length: _.random(1,5) }, () => _.random(-50, 50,  true));
      expect(activation.BIPOLAR(x, true)).to.eql(_.map(x, x => 0));
    })
  })
  describe("activation.BIPOLAR_SIGMOID()", function() {
    it("activation.BIPOLAR_SIGMOID() => {ReferenceError}",function(){
      expect(() => activation.BIPOLAR_SIGMOID()).to.throw(ReferenceError);
      })
    it("activation.BIPOLAR_SIGMOID(number, derivate=false) => {number}", function(){
      const x = _.random(-50, 50, true)
      expect(activation.BIPOLAR_SIGMOID(x, false)).to.equal(2 / (1 + Math.exp(-x)) - 1);
    })
    it("activation.BIPOLAR_SIGMOID(number, derivate=true) => {number}", function(){
      const x = _.random(-50, 50, true)
      expect(activation.BIPOLAR_SIGMOID(x, true)).to.equal((2 * Math.exp(-x)) / Math.pow(1 + Math.exp(-x), 2));
    })
    it("activation.BIPOLAR_SIGMOID(undefined, derivate=true) => {ReferenceError}",function(){
      expect(() => activation.BIPOLAR_SIGMOID(undefined, true)).to.throw(ReferenceError);
      })
    it("activation.BIPOLAR_SIGMOID(numbers, derivate=false) => {number[]}", function(){
      const x = Array.from({ length: _.random(1,5) }, () => _.random(-50, 50,  true));
      expect(activation.BIPOLAR_SIGMOID(x, false)).to.eql(_.map(x, x => 2 / (1 + Math.exp(-x)) - 1));
    })
    it("activation.BIPOLAR_SIGMOID(numbers, derivate=true) => {number[]}", function(){
      const x = Array.from({ length: _.random(1,5) }, () => _.random(-50, 50,  true));
      expect(activation.BIPOLAR_SIGMOID(x, true)).to.eql(_.map(x, x => (2 * Math.exp(-x)) / Math.pow(1 + Math.exp(-x), 2)));
    })
  })
  describe("activation.HARD_TANH()", function() {
    it("activation.HARD_TANH() => {ReferenceError}",function(){
      expect(() => activation.HARD_TANH()).to.throw(ReferenceError);
      })
    it("activation.HARD_TANH(number) => {number, derivate=false}", function(){
      const x = _.random(-50, 50, true)
      expect(activation.HARD_TANH(x, false)).to.equal(Math.max(-1, Math.min(1, x)));
    })
    it("activation.HARD_TANH(number, derivate=true) => {number}", function(){
      const x = _.random(-50, 50, true);
      const z = x > -1 && x < 1 ? 1 : 0
      expect(activation.HARD_TANH(x, true)).to.equal(z) ;
    })
    it("activation.HARD_TANH(undefined, derivate=true) => {ReferenceError}",function(){
      expect(() => activation.HARD_TANH(undefined, true)).to.throw(ReferenceError);
      })
    it("activation.HARD_TANH(numbers, derivate=false) => {number[]}", function(){
      const x = Array.from({ length: _.random(1,5) }, () => _.random(-50, 50,  true));
      expect(activation.HARD_TANH(x, false)).to.eql(_.map(x, x => Math.max(-1, Math.min(1, x))));
    })
    it("activation.HARD_TANH(numbers, derivate=true) => {number[]}", function(){
      const x = Array.from({ length: _.random(1,5) }, () => _.random(-50, 50,  true));
      expect(activation.HARD_TANH(x, true)).to.eql(_.map(x, x => x > -1 && x < 1 ? 1 : 0 ));
    })
  })
  describe("activation.ABSOLUTE()", function() {
    it("activation.ABSOLUTE() => {ReferenceError}",function(){
      expect(() => activation.ABSOLUTE()).to.throw(ReferenceError);
      })
    it("activation.ABSOLUTE(number, derivate=false) => {number}", function(){
      const x = _.random(-50, 50, true)
      expect(activation.ABSOLUTE(x, false)).to.equal(Math.abs(x));
    })
    it("activation.ABSOLUTE(number, derivate=true) => {number}", function(){
      const x = _.random(-50, 50, true)
      const z = x < 0 ? -1 : 1;
      expect(activation.ABSOLUTE(x, true)).to.equal(z);
    })
    it("activation.ABSOLUTE(undefined, derivate=true) => {ReferenceError}",function(){
      expect(() => activation.ABSOLUTE(undefined, true)).to.throw(ReferenceError);
      })
    it("activation.ABSOLUTE(numbers, false) => {number[]}", function(){
      const x = Array.from({ length: _.random(1,5) }, () => _.random(-50, 50,  true));
      expect(activation.ABSOLUTE(x, false)).to.eql(_.map(x, x => Math.abs(x) ));
    })
    it("activation.ABSOLUTE(numbers, derivate=true) => {number[]}", function(){
      const x = Array.from({ length: _.random(1,5) }, () => _.random(-50, 50,  true));
      expect(activation.ABSOLUTE(x, true)).to.eql(_.map(x, x => x < 0 ? -1 : 1));
    })
  })
  describe("activation.INVERSE()", function() {
    it("activation.INVERSE() => {ReferenceError}",function(){
      expect(() => activation.INVERSE()).to.throw(ReferenceError);
      })
    it("activation.INVERSE(number, derivate=false) => {number}", function(){
      const x = _.random(-50, 50, true)
      expect(activation.INVERSE(x, false)).to.equal(1-x);
    })
    it("activation.INVERSE(number, derivate=true) => {number}", function(){
      const x = _.random(-50, 50, true)
      expect(activation.INVERSE(x, true)).to.equal(-1);
    })
    it("activation.INVERSE(undefined, derivate=true) => {ReferenceError}",function(){
      expect(() => activation.INVERSE(undefined, true)).to.throw(ReferenceError);
      })
    it("activation.INVERSE(numbers, derivate=false) => {number[]}", function(){
      const x = Array.from({ length: _.random(1,5) }, () => _.random(-50, 50,  true));
      expect(activation.INVERSE(x, false)).to.eql(_.map(x, x => 1-x));
    })
    it("activation.INVERSE(numbers, derivate=true) => {number[]}", function(){
      const x = Array.from({ length: _.random(1,5) }, () => _.random(-50, 50,  true));
      expect(activation.INVERSE(x, true)).to.eql(_.map(x, x => -1));
    })
  })
  describe("activation.SELU()", function() {
    const alpha = 1.6732632423543772848170429916717;
    const scale = 1.0507009873554804934193349852946;

    it("activation.SELU() => {ReferenceError}",function(){
      expect(() => activation.SELU()).to.throw(ReferenceError);
      })
    it("activation.SELU(number, derivate=false) => {number}", function(){
      const x = _.random(-50, 50, true)
      const z = (x > 0 ? x : alpha * Math.exp(x) - alpha) * scale;
      expect(activation.SELU(x, false)).to.equal(z);
    })
    it("activation.SELU(number, derivate=true) => {number}", function(){
      const x = _.random(-50, 50, true)
      const z = x > 0 ? scale : ((x > 0 ? x : alpha * Math.exp(x) - alpha) + alpha) * scale;
      expect(activation.SELU(x, true)).to.equal(z);
    })
    it("activation.SELU(undefined, derivate=true) => {ReferenceError}",function(){
      expect(() => activation.SELU(undefined, true)).to.throw(ReferenceError);
      })
    it("activation.SELU(numbers, derivate=false) => {number[]}", function(){
      const x = Array.from({ length: _.random(1,5) }, () => _.random(-50, 50,  true));
      const z = _.map(x, x => (x > 0 ? x : alpha * Math.exp(x) - alpha) * scale);
      expect(activation.SELU(x, false)).to.eql(z);
    })
    it("activation.SELU(numbers, derivate=true) => {number[]}", function(){
      const x = Array.from({ length: _.random(1,5) }, () => _.random(-50, 50,  true));
      const z = _.map(x, x => x > 0 ? scale : ((x > 0 ? x : alpha * Math.exp(x) - alpha) + alpha) * scale)
      expect(activation.SELU(x, true)).to.eql(z);
    })
  })
})
