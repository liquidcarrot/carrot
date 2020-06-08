"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Rate_1 = require("../../../src/methods/Rate");
var Utils_1 = require("../../../src/utils/Utils");
describe("Rate", function () {
    it('FixedRate', function () {
        var baseRate = Math.random();
        var iteration = Utils_1.randInt(1, 100);
        var fixedRate = new Rate_1.FixedRate(baseRate);
        chai_1.expect(fixedRate.calc(iteration)).to.be.a("number");
        chai_1.expect(fixedRate.calc(iteration + 10)).to.be.equal(fixedRate.calc(iteration));
    });
    it('StepRate', function () {
        var baseRate = Math.random();
        var iteration = Utils_1.randInt(1, 100);
        var gamma = Math.random();
        var stepSize = Utils_1.randInt(1, 100);
        var stepRate = new Rate_1.StepRate(baseRate, gamma, stepSize);
        chai_1.expect(stepRate.calc(iteration)).to.be.a("number");
        chai_1.expect(stepRate.calc(iteration + 10)).to.be.at.most(stepRate.calc(iteration));
    });
    it('ExponentialRate', function () {
        var baseRate = Math.random();
        var iteration = Utils_1.randInt(1, 100);
        var gamma = Math.random();
        var exponentialRate = new Rate_1.ExponentialRate(baseRate, gamma);
        chai_1.expect(exponentialRate.calc(iteration)).to.be.a("number");
        chai_1.expect(exponentialRate.calc(iteration + 10)).to.be.below(exponentialRate.calc(iteration));
    });
    it('InverseRate', function () {
        var baseRate = Math.random();
        var iteration = Utils_1.randInt(1, 100);
        var gamma = Math.random();
        var power = Utils_1.randInt(1, 100);
        var inverseRate = new Rate_1.InverseRate(baseRate, gamma, power);
        chai_1.expect(inverseRate.calc(iteration)).to.be.a("number");
        chai_1.expect(inverseRate.calc(iteration + 10)).to.be.below(inverseRate.calc(iteration));
    });
});
