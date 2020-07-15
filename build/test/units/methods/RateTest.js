"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Rate_1 = require("../../../src/methods/Rate");
const Utils_1 = require("../../../src/utils/Utils");
describe("Rate", () => {
    it('FixedRate', () => {
        const baseRate = Math.random();
        const iteration = Utils_1.randInt(1, 100);
        const fixedRate = new Rate_1.FixedRate(baseRate);
        chai_1.expect(fixedRate.calc(iteration)).to.be.a("number");
        chai_1.expect(fixedRate.calc(iteration + 10)).to.be.equal(fixedRate.calc(iteration));
    });
    it('StepRate', () => {
        const baseRate = Math.random();
        const iteration = Utils_1.randInt(1, 100);
        const gamma = Math.random();
        const stepSize = Utils_1.randInt(1, 100);
        const stepRate = new Rate_1.StepRate(baseRate, gamma, stepSize);
        chai_1.expect(stepRate.calc(iteration)).to.be.a("number");
        chai_1.expect(stepRate.calc(iteration + 10)).to.be.at.most(stepRate.calc(iteration));
    });
    it('ExponentialRate', () => {
        const baseRate = Math.random();
        const iteration = Utils_1.randInt(1, 100);
        const gamma = Math.random();
        const exponentialRate = new Rate_1.ExponentialRate(baseRate, gamma);
        chai_1.expect(exponentialRate.calc(iteration)).to.be.a("number");
        chai_1.expect(exponentialRate.calc(iteration + 10)).to.be.below(exponentialRate.calc(iteration));
    });
    it('InverseRate', () => {
        const baseRate = Math.random();
        const iteration = Utils_1.randInt(1, 100);
        const gamma = Math.random();
        const power = Utils_1.randInt(1, 100);
        const inverseRate = new Rate_1.InverseRate(baseRate, gamma, power);
        chai_1.expect(inverseRate.calc(iteration)).to.be.a("number");
        chai_1.expect(inverseRate.calc(iteration + 10)).to.be.below(inverseRate.calc(iteration));
    });
});
