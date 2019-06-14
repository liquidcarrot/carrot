const _ = require("lodash");
const { assert, expect } = require('chai');
const should = require('chai').should();
const {activation} = require('../../../src/carrot');

/**
 *
 * There are 5 questions every unit test must answer.
 *
 * What is the unit under test (module, function, class, whatever)?
 * What should it do? (Prose description)
 * What was the actual output?
 * What was the expected output?
 * How do you reproduce the failure?
 *
 */
 
describe("activation", function(){


////*****TANH*****///   
describe("activation.TANH()", function(){    
it("activation.TANH() => {ReferenceError}", function(){
    expect(() => activation.TANH()).to.throw(ReferenceError);    
})
it("activation.TANH(number, derivative=false) => {number}", function(){
    let x=_.random(0,50,true);  
    expect( activation.TANH(x, false)).to.equal(Math.tanh(x));
})
it("activation.TANH(number, derivative=true) => {number}", function(){
    let x=_.random(0,50,true);
    expect(activation.TANH(x, true)).to.equal(1 - Math.pow(Math.tanh(x), 2));
})
it("activation.TANH(undefined,derivative=true) => {ReferenceError}", function(){
    expect(() => activation.TANH(undefined,true)).to.throw(ReferenceError);
})
//Array
it("activation.TANH(numbers, derivative=false) => {numbers}", function(){
    let z=[];
    let x=Array.from({length: _.random(1,4)}, () => _.random(2,50,true));  
    for(let i=0;i<x.length;i++) {z[i]=Math.tanh(x[i]); }
    expect(activation.TANH(x, false)).to.eql(z);
})
it("activation.TANH(numbers, derivative=true) => {numbers}", function(){
    let z=[];
    let x=Array.from({length: _.random(1,5)}, () => _.random(2,50,true));  
    for(let i=0;i<x.length;i++) {z[i]= 1 - Math.pow(Math.tanh(x[i]), 2); }
    expect(activation.TANH(x, true)).to.eql(z);
})
})


})





