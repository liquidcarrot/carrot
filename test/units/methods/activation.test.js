const _ = require("lodash");
const { assert, expect } = require('chai');
const should = require('chai').should();
const {activation} = require('../../../src/carrot');
 
describe("activation", function(){  
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
    it("activation.TANH(undefined,derivative=true) => {ReferenceError}", function(){
      expect(() => activation.TANH(undefined,true)).to.throw(ReferenceError);
    })
    it("activation.TANH(numbers, derivative=false) => {numbers}", function(){
      const x = Array.from({ length: _.random(1, 5) }, () => _.random(-50, 50,  true));
      const z = _.map(x, x => Math.tanh(x));
      
      expect(activation.TANH(x, false)).to.eql(z);
    })
    it("activation.TANH(numbers, derivative=true) => {numbers}", function(){
      const x = Array.from({ length: _.random(1, 5) }, () => _.random(-50, 50,  true));
      const z = _.map(x, x => 1 - Math.pow(Math.tanh(x), 2));
      
      expect(activation.TANH(x, true)).to.eql(z);
    })
  })
})





