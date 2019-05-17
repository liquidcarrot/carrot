const _ = require("lodash");
const { assert, expect, should } = require("chai");
const { multiply, sum } = require("../../../src/util/math");

const MAX = Number.MAX_VALUE;
const MIN = -Number.MAX_VALUE;

describe.skip("src/util/math.js", function() {
  describe("multiply()", function() {
    it(`multiply([${MIN}, ${-1}]) === ${MAX}`, function() {
      expect(multiply([MIN, -1])).to.equal(MAX);
    })
    it(`multiply([${MAX}, ${-1}]) === ${MIN}`, function() {
      expect(multiply([MAX, -1])).to.equal(MIN);
    })
    it(`multiply([${MAX}, ${MAX}]) === ${MAX}`, function() {
      expect(multiply([MAX, MAX])).to.equal(MAX);
    })
    it(`multiply([${MAX}, ${MIN}]) === ${MIN}`, function() {
      expect(multiply([MAX, MIN])).to.equal(MIN);
    })
    it(`multiply([${MIN}, ${MAX}]) === ${MIN}`, function() {
      expect(multiply([MIN, MAX])).to.equal(MIN);
    })
    it(`multiply([${MIN}, ${MIN}]) === ${MAX}`, function() {
      expect(multiply([MIN, MIN])).to.equal(MAX);
    })
  })
  
  describe("sum()", function() {
    it(`sum([${MIN}, ${-1}]) === ${MIN}`, function() {
      expect(sum([MIN, -1])).to.equal(MIN);
    })
    it(`sum([${MAX}, ${1}]) === ${MAX}`, function() {
      expect(sum([MAX, 1])).to.equal(MAX);
    })
    
    it(`sum([${MAX}, ${MAX}]) === ${MAX}`, function() {
      expect(sum([MAX, MAX])).to.equal(MAX);
    })
    it(`sum([${MAX}, ${MIN}]) === ${0}`, function() {
      expect(sum([MAX, MIN])).to.equal(0);
    })
    it(`sum([${MIN}, ${MAX}]) === ${0}`, function() {
      expect(sum([MIN, MAX])).to.equal(0);
    })
    it(`sum([${MIN}, ${MIN}]) === ${MIN}`, function() {
      expect(sum([MIN, MIN])).to.equal(MIN);
    })
    
    it(`sum([${MIN}, ${MIN}, ${MAX}]) === ${MIN}`, function() {
      expect(sum([MIN, MIN, MAX])).to.equal(MIN);
    })
    it(`sum([${MIN}, ${MIN}, ${MAX}, ${MAX}]) === ${0}`, function() {
      expect(sum([MIN, MIN, MAX, MAX])).to.equal(0);
    })
    it(`sum([${MIN}, ${MIN}, ${MAX}, ${MAX}, ${MAX}]) === ${MAX}`, function() {
      expect(sum([MIN, MIN, MAX, MAX, MAX])).to.equal(MAX);
    })
    
    it(`sum([${MAX}, ${MAX}, ${MIN}]) === ${MAX}`, function() {
      expect(sum([MAX, MAX, MIN])).to.equal(MAX);
    })
    it(`sum([${MAX}, ${MAX}, ${MIN}, ${MIN}]) === ${0}`, function() {
      expect(sum([MAX, MAX, MIN, MIN])).to.equal(0);
    })
    it(`sum([${MAX}, ${MAX}, ${MIN}, ${MIN}, ${MIN}]) === ${MIN}`, function() {
      expect(sum([MAX, MAX, MIN, MIN, MIN])).to.equal(MIN);
    })
  })
})