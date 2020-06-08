"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Utils_1 = require("../../../src/utils/Utils");
describe("Utils", function () {
    it("pick random", function () {
        var arr = [
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50)
        ];
        var elem = Utils_1.pickRandom(arr);
        chai_1.expect(arr.includes(elem)).to.be.true;
    });
    it("randInt", function () {
        for (var i = 0; i < 100; i++) {
            var int = Utils_1.randInt(-50, 50);
            chai_1.expect(int).to.be.below(50);
            chai_1.expect(int).to.be.above(-51);
        }
    });
    it("randDouble", function () {
        for (var i = 0; i < 100; i++) {
            var double = Utils_1.randDouble(-50, 50);
            chai_1.expect(double).to.be.below(50);
            chai_1.expect(double).to.be.above(-51);
        }
    });
    it("randBoolean", function () {
        var trues = 0;
        var falses = 0;
        for (var i = 0; i < 1000; i++) {
            var bool = Utils_1.randBoolean();
            if (bool) {
                trues++;
            }
            else {
                falses++;
            }
        }
        chai_1.expect(trues).to.be.closeTo(falses, 100);
    });
    it("remove from array", function () {
        var arr = [
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50)
        ];
        chai_1.expect(Utils_1.removeFromArray(arr, 200)).to.be.false;
        chai_1.expect(Utils_1.removeFromArray(arr, arr[0])).to.be.true;
        var len = arr.length;
        chai_1.expect(Utils_1.removeFromArray(arr, arr[2])).to.be.true;
        chai_1.expect(arr.length).equals(len - 1);
    });
    it("get or default", function () {
        chai_1.expect(Utils_1.getOrDefault(null, 50)).to.be.equals(50);
        chai_1.expect(Utils_1.getOrDefault(null, 12)).to.be.equals(12);
        chai_1.expect(Utils_1.getOrDefault(23, 50)).to.be.equals(23);
        chai_1.expect(Utils_1.getOrDefault(50, 50)).to.be.equals(50);
        chai_1.expect(Utils_1.getOrDefault(undefined, 50)).to.be.equals(50);
        chai_1.expect(Utils_1.getOrDefault(undefined, 6)).to.be.equals(6);
    });
    it("shuffle", function () {
        var arr = [
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50)
        ];
        var copy = arr.slice();
        Utils_1.shuffle(copy);
        chai_1.expect(copy.length).to.be.equals(arr.length);
        copy.forEach(function (element) { return chai_1.expect(arr).includes(element); });
    });
    it("max", function () {
        var arr = [
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50)
        ];
        var maxValue = Utils_1.max(arr);
        arr.forEach(function (elem) { return chai_1.expect(elem).to.be.at.most(maxValue); });
    });
    it("max index", function () {
        var arr = [
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50)
        ];
        var maxValue = Utils_1.max(arr);
        chai_1.expect(Utils_1.maxValueIndex(arr)).to.be.equals(arr.indexOf(maxValue));
    });
    it("min", function () {
        var arr = [
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50)
        ];
        var minValue = Utils_1.min(arr);
        arr.forEach(function (elem) { return chai_1.expect(elem).to.be.at.least(minValue); });
    });
    it("min index", function () {
        var arr = [
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50)
        ];
        var minValue = Utils_1.min(arr);
        chai_1.expect(Utils_1.minValueIndex(arr)).to.be.equals(arr.indexOf(minValue));
    });
    it("avg", function () {
        var arr = [
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50)
        ];
        var sum = 0;
        arr.forEach(function (elem) { return sum += elem; });
        chai_1.expect(Utils_1.avg(arr)).to.be.equals(sum / arr.length);
    });
    it("sum", function () {
        var arr = [
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50)
        ];
        var sumValue = 0;
        arr.forEach(function (elem) { return sumValue += elem; });
        chai_1.expect(Utils_1.sum(arr)).to.be.equals(sumValue);
    });
});
