const _ = require("lodash");
const { assert, expect, should } = require("chai");
const util = require("../../../src/util/utils");

describe("src/util/utils.js", function () {
  describe("util.getCantorNumber", function() {
    const a = Math.round(Math.random() * 100)
    const b = Math.round(Math.random() * 100)

    it("util.getCantorNumber() => {ReferenceError}", function() {
      expect(() => util.getCantorNumber()).to.throw(ReferenceError);
    })
    it(`util.getCantorNumber(a=${a}) => {ReferenceError}`, function() {
      expect(() => util.getCantorNumber(a)).to.throw(ReferenceError);
    })
    it(`util.getCantorNumber(a=${a}, b=${b}) => {number}`, function() {
      expect(util.getCantorNumber(a, b)).to.be.a("number");
    })
    // Critical, avoids silent errors
    it("(-number, -number) => -1", function() {
      expect(util.getCantorNumber(-1, -1)).equal(-1);
    })
  })

  describe('util.cantorLookup', function() {
    it("() => TypeError", function() {
      expect(() => util.cantorLookup()).to.throw(TypeError);
    })

    it("(number, number, referenceObject) => {ReferenceError} | errors when 'from' & 'to' are not objects with '.id' properties", function() {
      expect(() => util.cantorLookup(1,1, { last: 0 })).to.throw(ReferenceError);
    })

    it("({ id }, { id }, null) => {TypeError} | errors when neat id reference object is missing", function() {
      expect(() => util.cantorLookup({ id: 976 }, { id: 391 })).to.throw(TypeError)
    })

    it("({ id: 0 }, { id: 0 }, { 0: 22 }) => { key: 0, id: 22 } | response is an object with correct key and id value", function() {
      const response = util.cantorLookup({ id: 0 }, { id: 0 }, { 0: 22 }) // cantor pair for 0,0 is zero, use as key to retrieve value
      expect(response).a('object')
      expect(response.key).equal(0)
      expect(response.id).equal(22)
    })

    it("({ id }, { id }, { last: x }) => { key: x, id: undefined } | returns id: undefined when no entry present in object", function() {
      const response = util.cantorLookup({ id: 0 }, { id: 0 }, {})
      expect(response.id).equal(undefined)
    })
  })

  describe('util.getCantorId', function() {
    it("should return the correspoding id when it exists in the reference object", function() {
      const response = util.getCantorId({ id: 0 }, { id: 0 }, { 0: 22 }, 0) // cantor pair for 0,0 is zero, use as key to retrieve value
      expect(response).a('object')
      expect(response.key).equal(0)
      expect(response.id).equal(22) // entry already exists otherwise would be 1
    })

    it("should return one plus the last id when there's no entry in the reference object", function() {
      const response = util.getCantorId({ id: 0 }, { id: 0 }, { 34: 22 }, 0) // cantor pair for 0,0 is zero, use as key to retrieve value
      expect(response).a('object')
      expect(response.key).equal(0)
      expect(response.id).equal(1)
    })

    it("({ id }, { id }, { ..., last: x }) => { key: 0, id: 22 } | response is an object with a key and id value", function() {
      const response = util.getCantorId({ id: 0 }, { id: 0 }, { 0: 22, last: 0 }) // cantor pair for 0,0 is zero, use as key to retrieve value
      expect(response).a('object')
      expect(response.key).equal(0)
      expect(response.id).equal(22)
    })
  })

  describe('util.manageNeatId', function() {
    it("({ id: 0 }, { id: 0 }, { 0: 22, last: x }) => 22 | returns known id when same pair is given", function() {
      let response = util.manageNeatId({ id: 0 }, { id: 0 }, { 0: 22, last: 0 }) // cantor pair for 0,0 is zero, use as key to retrieve value
      expect(response).equal(22)
      // one more time for rigor
      response = util.manageNeatId({ id: 0 }, { id: 0 }, { 0: 22, last: 0 }) // cantor pair for 0,0 is zero, use as key to retrieve value
      expect(response).equal(22)
    })

    it("({ id: 0 }, { id: 0 }, { 0: 22, last: x }) => 22 | preserves reference object when same pair is given", function() {
      const connIds = { 0: 22, last: 22 } // 0 is the only key entry
      let response = util.manageNeatId({ id: 0 }, { id: 0 }, connIds) // cantor pair for 0,0 is zero, use as key to retrieve value
      expect(connIds).eql({ 0: 22, last: 22 })
      // one more time for rigor
      response = util.manageNeatId({ id: 0 }, { id: 0 }, connIds) // cantor pair for 0,0 is zero, use as key to retrieve value
      expect(connIds).eql({ 0: 22, last: 22 })
    })

    it('({ id: 0 }, { id: 1 }, { 0: 22, last: 22 }) => 23 | returns .last + 1 when new entry is received', function () {
      const connIds = { 0: 22, last: 22 } // 0 is the only key entry
      const response = util.manageNeatId({ id: 0 }, { id: 1 }, connIds) // (0,1) cantor pair is 2

      expect(response).equal(23); // should be one plus the last known, for clarity this matches the 0 key's value plus one
    });

    it('({ id: 0 }, { id: 1 }, { 0: 22, last: 22 }) | mutates reference object when (from, to) pair unknown to reference object is received', function () {
      const connIds = { 0: 22, last: 22 } // 0 is the only key entry
      const response = util.manageNeatId({ id: 0 }, { id: 1 }, connIds) // (0,1) cantor pair is 2

      expect(connIds).not.eql({ 0: 22, last: 22 }); // should not be deeply equal initial object i.e. values should have changed
    });

    it('({ id: 0 }, { id: 1 }, { 0: 22, last: 22 }) => 23 | updates .last when new entry is received', function () {
      const connIds = { 0: 22, last: 22 } // 0 is the only key entry
      const response = util.manageNeatId({ id: 0 }, { id: 1 }, connIds) // (0,1) cantor pair is 2

      expect(connIds.last).equal(23); // should be one plus the last known, for clarity this matches the 0 key's value plus one
    });
  })

  describe('util.sortDefault', function () {
    it('(unsorted) | returns a sorted array in ascending order', function() {
      const unsorted = [4,6,5,3,2,7,89,3,1,5,9,3,6,4,7,9,2,4,3,5,7,33,1,5,9,3,5,6,0,3,8,0]; // random-ish array

      const sorted = util.sortDefault(unsorted);
      
      for(let i = 1; i < sorted.length; i++) {
        expect(sorted[i]).at.least(sorted[i-1])
      }
    })

    it('(unsorted, false) | returns a sorted array in descending order', function() {
      const unsorted = [5,9,2,4,3,5,7,3,4,6,5,34,2,7,8,3,1,5,9,3,63,4,7,5,6,0,3,8,0,6,9,3,8,5,6,0,9,2,8,3]; // random-ish array

      const sorted = util.sortDefault(unsorted, false);

      for(let i = 1; i < sorted.length; i++) {
        expect(sorted[i]).at.most(sorted[i-1])
      }
    })
  })

  describe('util.sortObjects', function () {
    it('(unsorted, propertyString) | returns a sorted array in ascending order', function() {
      const unsorted = [{ id: 4 }, { id: 6 }, { id: 5 }, { id: 3 }, { id: 2 }, { id: 7 }]; // random-ish array

      const sorted = util.sortObjects(unsorted, "id");
      
      for(let i = 1; i < sorted.length; i++) {
        expect(sorted[i]["id"]).at.least(sorted[i-1]["id"])
      }
    })

    it('(unsorted, propertyString, false) | returns a sorted array in descending order', function() {
      const unsorted = [{ id: 4 }, { id: 6 }, { id: 5 }, { id: 3 }, { id: 2 }, { id: 7 }]; // random-ish array

      const sorted = util.sortObjects(unsorted, "id", false);
      
      for(let i = 1; i < sorted.length; i++) {
        expect(sorted[i]["id"]).at.most(sorted[i-1]["id"])
      }
    })
  })
})
