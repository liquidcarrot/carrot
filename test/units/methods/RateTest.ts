import {expect} from "chai";
import {ExponentialRate, FixedRate, InverseRate, StepRate} from "../../../src/methods/Rate";
import {randInt} from "../../../src/utils/Utils";

describe("Rate", () => {
    it('FixedRate', () => {
        const baseRate: number = Math.random();
        const iteration: number = randInt(1, 100);

        const fixedRate: FixedRate = new FixedRate(baseRate);
        expect(fixedRate.calc(iteration)).to.be.a("number");
        expect(fixedRate.calc(iteration + 10)).to.be.equal(fixedRate.calc(iteration));
    });

    it('StepRate', () => {
        const baseRate: number = Math.random();
        const iteration: number = randInt(1, 100);
        const gamma: number = Math.random();
        const stepSize: number = randInt(1, 100);

        const stepRate: StepRate = new StepRate(baseRate, gamma, stepSize);
        expect(stepRate.calc(iteration)).to.be.a("number");
        expect(stepRate.calc(iteration + 10)).to.be.at.most(stepRate.calc(iteration));
    });

    it('ExponentialRate', () => {
        const baseRate: number = Math.random();
        const iteration: number = randInt(1, 100);
        const gamma: number = Math.random();

        const exponentialRate: ExponentialRate = new ExponentialRate(baseRate, gamma);
        expect(exponentialRate.calc(iteration)).to.be.a("number");
        expect(exponentialRate.calc(iteration + 10)).to.be.below(exponentialRate.calc(iteration));
    });

    it('InverseRate', () => {
        const baseRate: number = Math.random();
        const iteration: number = randInt(1, 100);
        const gamma: number = Math.random();
        const power: number = randInt(1, 100);

        const inverseRate: InverseRate = new InverseRate(baseRate, gamma, power);
        expect(inverseRate.calc(iteration)).to.be.a("number");
        expect(inverseRate.calc(iteration + 10)).to.be.below(inverseRate.calc(iteration));
    });
});
