let { assert, expect } = require('chai');
let should = require('chai').should();
let {architect, Network, Node } = require('../../../src/carrot');

/**
 *
 * There are 5 questions every unit test must answer.
 *
 * What is the unit under test (module,fu nction, class, whatever)?
 * What should it do? (Prose description)
 * What was the actual output?
 * What was the expected output?
 * How do you reproduce the failure?
 *
 */
describe('architect', function(){
  describe('Perceptron', function() {
    it('given input: 0, hidden: 0, output: 0, should throw Error', function(){
           assert.throws(function() {  return new architect.Perceptron(0, 0, 0)  }, RangeError);
       });
  
       it('should return false if invalid user id', function(){
           //Input: 5 neurons, 2 Hidden Layers: 7 neurons, Output: 2 neurons
           let example = new architect.Perceptron(5, 7, 7, 2);
       });

       it('given three argument should return network', function(){
           //Input: three neurons, 0 Hidden Layers. Output: one neuron
           expect(new architect.Perceptron(3, 0, 1)).to.be.an.instanceOf(Network);
       });

    
  });
});