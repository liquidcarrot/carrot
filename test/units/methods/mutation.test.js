const { expect } = require('chai');
const { methods } = require('../../../src/carrot');
const { mutation } = methods;

describe("gating", function() {
  Object.keys(mutation).forEach(function(type) {
    describe(`mutation.${type}`, function() {
      if(type === "ALL" || type === "FFW") {
        it(`mutation.${type} => {Array}`, function() {
          expect(mutation[type]).to.be.an("array");
          expect(mutation[type]).to.be.an.instanceof(Array);
        })
      }
      else {
        it(`mutation.${type} => {Object}`, function() {
          expect(mutation[type]).to.be.an("object");
        })
        it(`mutation.${type}.name => {string}`, function() {
          expect(mutation[type].name).to.be.a("string");
        })
      }
    })
  })
})