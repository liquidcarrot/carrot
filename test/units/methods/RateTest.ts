import {expect} from "chai";
import {randInt} from "../../../src/methods/Utils";
import {ExponentialRate, FixedRate, InverseRate, StepRate} from "../../../src/methods/Rate";

describe("Rate", () => {
    describe('FixedRate', () => {
        const baseRate: number = Math.random();
        const iteration: number = randInt(1, 100);
        expect(new FixedRate(baseRate).calc(iteration)).to.be.a("number");
    });

    describe('StepRate', () => {
        const baseRate: number = Math.random();
        const iteration: number = randInt(1, 100);
        const gamma: number = Math.random();
        const stepSize: number = randInt(1, 100);
        expect(new StepRate(baseRate, gamma, stepSize).calc(iteration)).to.be.a("number");
    });

    describe('ExponentialRate', () => {
        const baseRate: number = Math.random();
        const iteration: number = randInt(1, 100);
        const gamma: number = Math.random();
        expect(new ExponentialRate(baseRate, gamma).calc(iteration)).to.be.a("number");
    });

    describe('InverseRate', () => {
        const baseRate: number = Math.random();
        const iteration: number = randInt(1, 100);
        const gamma: number = Math.random();
        const power: number = randInt(1, 100);
        expect(new InverseRate(baseRate, gamma, power).calc(iteration)).to.be.a("number");
    });
});
