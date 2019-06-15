const _ = require("lodash");
const { assert, expect } = require('chai');
const should = require('chai').should();
const { cost } = require('../../../src/carrot');

describe("cost", function() {
  describe("cost.CROSS_ENTROPY()", function() {
    it("cost.CROSS_ENTROPY() => {ReferenceError}")
    it("cost.CROSS_ENTROPY(number) => {TypeError}")
    it("cost.CROSS_ENTROPY(numbers) => {ReferenceError}")
    it("cost.CROSS_ENTROPY(numbers, number) => {TypeError}")
    it("cost.CROSS_ENTROPY(numbers, numbers) => {number}")
  })
  describe("cost.MSE()", function() {
    it("cost.MSE() => {ReferenceError}")
    it("cost.MSE(number) => {TypeError}")
    it("cost.MSE(numbers) => {ReferenceError}")
    it("cost.MSE(numbers, number) => {TypeError}")
    it("cost.MSE(numbers, numbers) => {number}")
  })
  describe("cost.BINARY()", function() {
    it("cost.BINARY() => {ReferenceError}")
    it("cost.BINARY(number) => {TypeError}")
    it("cost.BINARY(numbers) => {ReferenceError}")
    it("cost.BINARY(numbers, number) => {TypeError}")
    it("cost.BINARY(numbers, numbers) => {number}")
  })
  describe("cost.MAE()", function() {
    it("cost.MAE() => {ReferenceError}")
    it("cost.MAE(number) => {TypeError}")
    it("cost.MAE(numbers) => {ReferenceError}")
    it("cost.MAE(numbers, number) => {TypeError}")
    it("cost.MAE(numbers, numbers) => {number}")
  })
  describe("cost.MAPE()", function() {
    it("cost.MAPE() => {ReferenceError}")
    it("cost.MAPE(number) => {TypeError}")
    it("cost.MAPE(numbers) => {ReferenceError}")
    it("cost.MAPE(numbers, number) => {TypeError}")
    it("cost.MAPE(numbers, numbers) => {number}")
  })
  describe("cost.WAPE()", function() {
    it("cost.WAPE() => {ReferenceError}")
    it("cost.WAPE(number) => {TypeError}")
    it("cost.WAPE(numbers) => {ReferenceError}")
    it("cost.WAPE(numbers, number) => {TypeError}")
    it("cost.WAPE(numbers, numbers) => {number}")
  })
  describe("cost.MSLE()", function() {
    it("cost.MSLE() => {ReferenceError}")
    it("cost.MSLE(number) => {TypeError}")
    it("cost.MSLE(numbers) => {ReferenceError}")
    it("cost.MSLE(numbers, number) => {TypeError}")
    it("cost.MSLE(numbers, numbers) => {number}")
  })
  describe("cost.HINGE()", function() {
    it("cost.HINGE() => {ReferenceError}")
    it("cost.HINGE(number) => {TypeError}")
    it("cost.HINGE(numbers) => {ReferenceError}")
    it("cost.HINGE(numbers, number) => {TypeError}")
    it("cost.HINGE(numbers, numbers) => {number}")
  })
})
 
 