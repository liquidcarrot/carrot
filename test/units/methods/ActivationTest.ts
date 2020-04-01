import {
    AbsoluteActivation,
    BentIdentityActivation,
    BipolarActivation,
    BipolarSigmoidActivation,
    GaussianActivation,
    HardTanhActivation,
    IdentityActivation,
    InverseActivation,
    LogisticActivation,
    RELUActivation,
    SELUActivation,
    SinusoidActivation,
    SoftsignActivation,
    StepActivation,
    TanhActivation
} from "../../../src/methods/Activation";
import {randDouble} from "../../../src/methods/Utils";
import {expect} from "chai";

describe("Activation", () => {
    describe("activation.LOGISTIC()", () => {
        it("activation.LOGISTIC(number, derivate=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(new LogisticActivation().calc(x, false)).to.equal(1 / (1 + Math.exp(-x)));
        });
        it("activation.LOGISTIC(number, derivate=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(new LogisticActivation().calc(x, true)).to.equal(new LogisticActivation().calc(x, false) * (1 - new LogisticActivation().calc(x, false)));
        });
    });
    describe("activation.TANH()", () => {
        it("activation.TANH(number, derivate=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(new TanhActivation().calc(x, false)).to.equal(Math.tanh(x));
        });
        it("activation.TANH(number, derivate=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(new TanhActivation().calc(x, true)).to.equal(1 - Math.pow(Math.tanh(x), 2));
        });
    });
    describe("activation.IDENTITY()", () => {
        it("activation.IDENTITY(number, derivate=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(new IdentityActivation().calc(x, false)).to.equal(x);
        });
        it("activation.IDENTITY(number, derivate=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(new IdentityActivation().calc(x, true)).to.equal(1);
        });
    });
    describe("activation.STEP()", () => {
        it("activation.STEP(number) => {number}", () => {
            const x: number = randDouble(-50, 50);
            const z: number = x > 0 ? 1 : 0;
            expect(new StepActivation().calc(x, false)).to.equal(z);
        });
        it("activation.STEP(number, derivate=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(new StepActivation().calc(x, true)).to.equal(0);
        });
    });
    describe("activation.RELU()", () => {
        it("activation.RELU(number) => {number, derivate=false}", () => {
            const x: number = randDouble(-50, 50);
            const z: number = x > 0 ? x : 0;
            expect(new RELUActivation().calc(x, false)).to.equal(z);
        });
        it("activation.RELU(number, derivate=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            const z: number = x > 0 ? 1 : 0;
            expect(new RELUActivation().calc(x, true)).to.equal(z);
        });
    });
    describe("activation.SOFTSIGN()", () => {
        it("activation.SOFTSIGN(number, derivate=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(new SoftsignActivation().calc(x, false)).to.equal(x / (1 + Math.abs(x)));
        });
        it("activation.SOFTSIGN(number, derivate=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(new SoftsignActivation().calc(x, true)).to.equal((x / Math.pow(1 + Math.abs(x), 2)));
        });
    });
    describe("activation.SINUSOID()", () => {
        it("activation.SINUSOID(number, derivate=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(new SinusoidActivation().calc(x, false)).to.equal(Math.sin(x));
        });
        it("activation.SINUSOID(number, derivate=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(new SinusoidActivation().calc(x, true)).to.equal(Math.cos(x));
        });
    });
    describe("activation.GAUSSIAN()", () => {
        it("activation.GAUSSIAN(number) => {number, derivate=false}", () => {
            const x: number = randDouble(-50, 50);
            expect(new GaussianActivation().calc(x, false)).to.equal(Math.exp(-Math.pow(x, 2)));
        });
        it("activation.GAUSSIAN(number, derivate=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(new GaussianActivation().calc(x, true)).to.equal(-2 * x * Math.exp(-Math.pow(x, 2)));
        });
    });
    describe("activation.BENT_IDENTITY()", () => {
        it("activation.BENT_IDENTITY(number, derivate=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(new BentIdentityActivation().calc(x, false)).to.equal((Math.sqrt(Math.pow(x, 2) + 1) - 1) / 2 + x);
        });
        it("activation.BENT_IDENTITY(number, derivate=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(new BentIdentityActivation().calc(x, true)).to.equal(x / (2 * Math.sqrt(Math.pow(x, 2) + 1)) + 1);
        });
    });
    describe("activation.BIPOLAR()", () => {
        it("activation.BIPOLAR(number, derivate=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(new BipolarActivation().calc(x, false)).to.equal(x > 0 ? 1 : -1);
        });
        it("activation.BIPOLAR(number, derivate=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(new BipolarActivation().calc(x, true)).to.equal(0);
        });
    });
    describe("activation.BIPOLAR_SIGMOID()", () => {
        it("activation.BIPOLAR_SIGMOID(number, derivate=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(new BipolarSigmoidActivation().calc(x, false)).to.equal(2 / (1 + Math.exp(-x)) - 1);
        });
        it("activation.BIPOLAR_SIGMOID(number, derivate=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(new BipolarSigmoidActivation().calc(x, true)).to.equal((2 * Math.exp(-x)) / Math.pow(1 + Math.exp(-x), 2));
        });
    });
    describe("activation.HARD_TANH()", () => {
        it("activation.HARD_TANH(number) => {number, derivate=false}", () => {
            const x: number = randDouble(-50, 50);
            expect(new HardTanhActivation().calc(x, false)).to.equal(Math.max(-1, Math.min(1, x)));
        });
        it("activation.HARD_TANH(number, derivate=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            const z: number = x > -1 && x < 1 ? 1 : 0;
            expect(new HardTanhActivation().calc(x, true)).to.equal(z);
        });
    });
    describe("activation.ABSOLUTE()", () => {
        it("activation.ABSOLUTE(number, derivate=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(new AbsoluteActivation().calc(x, false)).to.equal(Math.abs(x));
        });
        it("activation.ABSOLUTE(number, derivate=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            const z: number = x < 0 ? -1 : 1;
            expect(new AbsoluteActivation().calc(x, true)).to.equal(z);
        });
    });
    describe("activation.INVERSE()", () => {
        it("activation.INVERSE(number, derivate=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(new InverseActivation().calc(x, false)).to.equal(1 - x);
        });
        it("activation.INVERSE(number, derivate=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(new InverseActivation().calc(x, true)).to.equal(-1);
        });
    });
    describe("activation.SELU()", () => {
        const alpha: number = 1.6732632423543772848170429916717;
        const scale: number = 1.0507009873554804934193349852946;

        it("activation.SELU(number, derivate=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            const z: number = (x > 0 ? x : alpha * Math.exp(x) - alpha) * scale;
            expect(new SELUActivation().calc(x, false)).to.be.closeTo(z, 0.001);
        });
        it("activation.SELU(number, derivate=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            const z: number = x > 0 ? scale : ((x > 0 ? x : alpha * Math.exp(x) - alpha) + alpha) * scale;
            expect(new SELUActivation().calc(x, true)).to.be.closeTo(z, 0.001);
        });
    });
});
