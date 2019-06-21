const _ = require("lodash");
const { assert, expect } = require('chai');
const should = require('chai').should();
const { methods } = require('../../../src/carrot');
const { cost } = methods;

const RANGE = [-50, 50];

describe("cost", function() {
  Object.keys(cost).forEach(function(type) {
    describe(`cost.${type}()`, function() {
      const target = _.random(...RANGE);
      const targets = [_.random(...RANGE), _.random(...RANGE), _.random(...RANGE)];
      const output = _.random(...RANGE);
      const outputs = [_.random(...RANGE), _.random(...RANGE), _.random(...RANGE)];
      
      // @throws {ReferenceError}
      it(`cost.${type}() => {ReferenceError}`, function() {
        expect(() => cost[type]()).to.throw(ReferenceError);
      })
      it(`cost.${type}(targets=${target}) => {ReferenceError}`, function() {
        expect(() => cost[type](target)).to.throw(ReferenceError);
      })
      it(`cost.${type}(targets=[${targets}]) => {ReferenceError}`, function() {
        expect(() => cost[type](targets)).to.throw(ReferenceError);
      })
      
      // @throws {RangeError}
      it(`cost.${type}(targets=[${targets}], outputs=${output}) => {RangeError}`, function() {
        expect(() => cost[type](targets, output)).to.throw(RangeError);
      })
      it(`cost.${type}(targets=${target}, outputs=[${outputs}]) => {RangeError}`, function() {
        expect(() => cost[type](target, outputs)).to.throw(RangeError);
      })
      
      // @returns {number}
      it(`cost.${type}(targets=${target}, outputs=${output}) => {number}`, function() {
        expect(cost[type](target, output)).to.be.a("number");
      })
      it(`cost.${type}(targets=${target}, outputs=[${output}]) => {number}`, function() {
        expect(cost[type](target, [output])).to.be.a("number");
      })
      it(`cost.${type}(targets=[${target}], outputs=${output}) => {number}`, function() {
        expect(cost[type]([target], output)).to.be.a("number");
      })
      it(`cost.${type}(targets=[${targets}], outputs=[${outputs}]) => {number}`, function() {
        expect(cost[type](targets, outputs)).to.be.a("number");
      })
    })
  })
})
 
 