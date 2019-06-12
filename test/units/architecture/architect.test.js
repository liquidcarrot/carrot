const { assert, expect } = require('chai');
const should = require('chai').should();
const {architect, Network, Node } = require('../../../src/carrot');

describe('architect', function(){
  describe('achitect.Perceptron()', function() {
    it('architect.Perceptron(input=0, hidden=0, output=0) => {RangeError}', function(){
      expect(new architect.Perceptron(0, 0, 0)).to.throw(RangeError);
    });

    it('architect.Perceptron(input=3, hidden=0, output=1) => {Network}', function(){
      expect(new architect.Perceptron(3, 0, 1)).to.be.an.instanceOf(Network);
    });
  });
});
