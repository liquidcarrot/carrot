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

describe("activation.TANH()", function(){
it("activation.TANH(), => {ReferenceError}", function(){
    expect(() => activation.TANH()).to.throw(ReferenceError);    
})

 })   
}) 