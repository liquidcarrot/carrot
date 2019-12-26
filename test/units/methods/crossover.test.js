const { expect } = require('chai');
const { methods }  = require('../../../src/index');
const { crossover } = methods;

describe("crossover", function(){
  Object.keys(crossover).forEach(function(type) {
    describe(`crossover.${type}`, function(){
      it(`crossover.${type} => {Object}`, function() {
        expect(crossover[type]).to.be.an("object");
      })
      it(`crossover.${type}.name => {string}`, function() {
        expect(crossover[type].name).to.be.a("string");
      })
      if(crossover[type].config != undefined) {
        it(`crossover.${type}.config => {Array}`, function() {
          expect(crossover[type].config).to.be.an("Array");
        })
      }
    })
  })
})
