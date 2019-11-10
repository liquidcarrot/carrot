const _ = require("lodash");
const { assert, expect, should } = require("chai");
const util = require("../../../src/util/utils");

describe("src/util/utils.js", function () {
  describe("util.getCantorNumber()", function() {
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
  })
})
