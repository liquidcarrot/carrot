const { expect } = require('chai');
const { methods } = require('../../../src/carrot');
const { rate } = methods;

describe("rate", function() {
  Object.keys(rate).forEach(function(type) {
    describe(`rate.${type}()`, function() {
      const base_rate = Math.random();
      const iteration = Math.round(Math.random() * 100);
      const options = {
        gamma: Math.random(),
        power: Math.ceil(Math.random() * 5),
        step_size: Math.ceil(Math.random() * 100)
      }
      
      // @returns {ReferenceError}
      it(`rate.${type}() => {ReferenceError}`, function() {
        expect(() => rate[type]()).to.throw(ReferenceError);
      })
      
      // @returns {number}
      it(`rate.${type}(base_rate=${base_rate}, iteration=${iteration}) => {number}`, function() {
        expect(rate[type](base_rate, iteration)).to.be.a("number");
      })
      it(`rate.${type}(base_rate=${base_rate}, iteration=${iteration}, options=${options}) => {number}`, function() {
        expect(rate[type](base_rate, iteration, options)).to.be.a("number");
      })
    })
  })
})