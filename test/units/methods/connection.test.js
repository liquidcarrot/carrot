const { expect } = require('chai');
const { methods } = require('../../../src/carrot');
const { connection } = methods;

describe("connection", function() {
  Object.keys(connection).forEach(function(type) {
    describe(`connection.${type}`, function() {
      it(`connection.${type} => {Object}`, function() {
        expect(connection[type]).to.be.an("object");
      })
      it(`connection.${type}.name => {string}`, function() {
        expect(connection[type].name).to.be.a("string");
      })
    })
  })
})