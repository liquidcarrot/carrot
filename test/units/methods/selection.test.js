const { expect } = require('chai');
const { methods } = require('../../../src/carrot');
const { selection } = methods;

describe("selection", function() {
  Object.keys(selection).forEach(function(type) {
    describe(`selection.${type}`, function() {
      it(`selection.${type} => {Object}`, function() {
        expect(selection[type]).to.be.an("object");
      });
      it(`selection.${type}.name => {string}`, function() {
        expect(selection[type].name).to.be.a("string");
      });
    });
  });
});