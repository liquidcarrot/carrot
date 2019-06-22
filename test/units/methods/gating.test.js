const { expect } = require('chai');
const { methods } = require('../../../src/carrot');
const { gating } = methods;

describe("gating", function() {
  Object.keys(gating).forEach(function(type) {
    describe(`gating.${type}`, function() {
      it(`gating.${type} => {Object}`, function() {
        expect(gating[type]).to.be.an("object");
      })
      it(`gating.${type}.name => {string}`, function() {
        expect(gating[type].name).to.be.a("string");
      })
    })
  })
})