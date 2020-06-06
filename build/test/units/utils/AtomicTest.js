"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Atomic_1 = require("../../../src/utils/Atomic");
var Utils_1 = require("../../../src/utils/Utils");
describe("Atomic", function () {
    describe("number atomic", function () {
        it("get and add value", function () {
            var startValue = Utils_1.randInt(-50, 50);
            var atomicNumber = new Atomic_1.AtomicNumber(startValue);
            var sum = startValue;
            for (var i = 0; i < 100; i++) {
                var delta = Utils_1.randInt(-50, 50);
                chai_1.expect(atomicNumber.getAndAddValue(delta)).equals(sum);
                sum += delta;
            }
        });
        it("add value and get", function () {
            var startValue = Utils_1.randInt(-50, 50);
            var atomicNumber = new Atomic_1.AtomicNumber(startValue);
            var sum = startValue;
            for (var i = 0; i < 100; i++) {
                var delta = Utils_1.randInt(-50, 50);
                sum += delta;
                chai_1.expect(atomicNumber.addValueAndGet(delta)).equals(sum);
            }
        });
        it("get and increment", function () {
            var startValue = Utils_1.randInt(-50, 50);
            var atomicNumber = new Atomic_1.AtomicNumber(startValue);
            for (var i = 0; i < 100; i++) {
                chai_1.expect(atomicNumber.getAndIncrement()).equals(i + startValue);
            }
        });
        it("increment and get", function () {
            var startValue = Utils_1.randInt(-50, 50);
            var atomicNumber = new Atomic_1.AtomicNumber(startValue);
            for (var i = 0; i < 100; i++) {
                chai_1.expect(atomicNumber.incrementAndGet()).equals(i + startValue + 1);
            }
        });
        it("get and decrement", function () {
            var startValue = Utils_1.randInt(-50, 50);
            var atomicNumber = new Atomic_1.AtomicNumber(startValue);
            for (var i = 0; i < 100; i++) {
                chai_1.expect(atomicNumber.getAndDecrement()).equals(startValue - i);
            }
        });
        it("decrement and get", function () {
            var startValue = Utils_1.randInt(-50, 50);
            var atomicNumber = new Atomic_1.AtomicNumber(startValue);
            for (var i = 0; i < 100; i++) {
                chai_1.expect(atomicNumber.decrementAndGet()).equals(startValue - 1 - i);
            }
        });
    });
});
