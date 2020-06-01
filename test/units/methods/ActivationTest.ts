import {expect} from "chai";
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
    MISHActivation,
    RELUActivation,
    SELUActivation,
    SinusoidActivation,
    SoftSignActivation,
    StepActivation,
    TanhActivation
} from "../../../src/methods/Activation";
import {randDouble} from "../../../src/methods/Utils";

describe("Activation", () => {
    describe("activation.LOGISTIC()", () => {
        const logisticActivation: LogisticActivation = new LogisticActivation();
        it("activation.LOGISTIC(number, derivate=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(logisticActivation.calc(x, false)).to.equal(1 / (1 + Math.exp(-x)));
        });
        it("activation.LOGISTIC(number, derivate=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(logisticActivation.calc(x, true)).to.equal(logisticActivation.calc(x, false) * (1 - logisticActivation.calc(x, false)));
        });
    });
    describe("activation.TANH()", () => {
        const tanhActivation: TanhActivation = new TanhActivation();
        it("activation.TANH(number, derivate=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(tanhActivation.calc(x, false)).to.equal(Math.tanh(x));
        });
        it("activation.TANH(number, derivate=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(tanhActivation.calc(x, true)).to.equal(1 - Math.pow(Math.tanh(x), 2));
        });
    });
    describe("activation.IDENTITY()", () => {
        const identityActivation: IdentityActivation = new IdentityActivation();
        it("activation.IDENTITY(number, derivate=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(identityActivation.calc(x, false)).to.equal(x);
        });
        it("activation.IDENTITY(number, derivate=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(identityActivation.calc(x, true)).to.equal(1);
        });
    });
    describe("activation.STEP()", () => {
        const stepActivation: StepActivation = new StepActivation();
        it("activation.STEP(number) => {number}", () => {
            const x: number = randDouble(-50, 50);
            const z: number = x > 0 ? 1 : 0;
            expect(stepActivation.calc(x, false)).to.equal(z);
        });
        it("activation.STEP(number, derivate=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(stepActivation.calc(x, true)).to.equal(0);
        });
    });
    describe("activation.RELU()", () => {
        const reluActivation: RELUActivation = new RELUActivation();
        it("activation.RELU(number) => {number, derivate=false}", () => {
            const x: number = randDouble(-50, 50);
            const z: number = x > 0 ? x : 0;
            expect(reluActivation.calc(x, false)).to.equal(z);
        });
        it("activation.RELU(number, derivate=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            const z: number = x > 0 ? 1 : 0;
            expect(reluActivation.calc(x, true)).to.equal(z);
        });
    });
    describe("activation.SOFTSIGN()", () => {
        const softSignActivation: SoftSignActivation = new SoftSignActivation();
        it("activation.SOFTSIGN(number, derivate=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(softSignActivation.calc(x, false)).to.equal(x / (1 + Math.abs(x)));
        });
        it("activation.SOFTSIGN(number, derivate=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(softSignActivation.calc(x, true)).to.equal((x / Math.pow(1 + Math.abs(x), 2)));
        });
    });
    describe("activation.SINUSOID()", () => {
        const sinusoidActivation: SinusoidActivation = new SinusoidActivation();
        it("activation.SINUSOID(number, derivate=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(sinusoidActivation.calc(x, false)).to.equal(Math.sin(x));
        });
        it("activation.SINUSOID(number, derivate=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(sinusoidActivation.calc(x, true)).to.equal(Math.cos(x));
        });
    });
    describe("activation.GAUSSIAN()", () => {
        const gaussianActivation: GaussianActivation = new GaussianActivation();
        it("activation.GAUSSIAN(number) => {number, derivate=false}", () => {
            const x: number = randDouble(-50, 50);
            expect(gaussianActivation.calc(x, false)).to.equal(Math.exp(-Math.pow(x, 2)));
        });
        it("activation.GAUSSIAN(number, derivate=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(gaussianActivation.calc(x, true)).to.equal(-2 * x * Math.exp(-Math.pow(x, 2)));
        });
    });
    describe("activation.BENT_IDENTITY()", () => {
        const bentIdentityActivation: BentIdentityActivation = new BentIdentityActivation();
        it("activation.BENT_IDENTITY(number, derivate=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(bentIdentityActivation.calc(x, false)).to.equal((Math.sqrt(Math.pow(x, 2) + 1) - 1) / 2 + x);
        });
        it("activation.BENT_IDENTITY(number, derivate=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(bentIdentityActivation.calc(x, true)).to.equal(x / (2 * Math.sqrt(Math.pow(x, 2) + 1)) + 1);
        });
    });
    describe("activation.BIPOLAR()", () => {
        const bipolarActivation: BipolarActivation = new BipolarActivation();
        it("activation.BIPOLAR(number, derivate=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(bipolarActivation.calc(x, false)).to.equal(x > 0 ? 1 : -1);
        });
        it("activation.BIPOLAR(number, derivate=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(bipolarActivation.calc(x, true)).to.equal(0);
        });
    });
    describe("activation.BIPOLAR_SIGMOID()", () => {
        const bipolarSigmoidActivation: BipolarSigmoidActivation = new BipolarSigmoidActivation();
        it("activation.BIPOLAR_SIGMOID(number, derivate=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(bipolarSigmoidActivation.calc(x, false)).to.equal(2 / (1 + Math.exp(-x)) - 1);
        });
        it("activation.BIPOLAR_SIGMOID(number, derivate=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(bipolarSigmoidActivation.calc(x, true)).to.equal((2 * Math.exp(-x)) / Math.pow(1 + Math.exp(-x), 2));
        });
    });
    describe("activation.HARD_TANH()", () => {
        const hardTanhActivation: HardTanhActivation = new HardTanhActivation();
        it("activation.HARD_TANH(number) => {number, derivate=false}", () => {
            const x: number = randDouble(-50, 50);
            expect(hardTanhActivation.calc(x, false)).to.equal(Math.max(-1, Math.min(1, x)));
        });
        it("activation.HARD_TANH(number, derivate=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            const z: number = x > -1 && x < 1 ? 1 : 0;
            expect(hardTanhActivation.calc(x, true)).to.equal(z);
        });
    });
    describe("activation.ABSOLUTE()", () => {
        const absoluteActivation: AbsoluteActivation = new AbsoluteActivation();
        it("activation.ABSOLUTE(number, derivate=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(absoluteActivation.calc(x, false)).to.equal(Math.abs(x));
        });
        it("activation.ABSOLUTE(number, derivate=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            const z: number = x < 0 ? -1 : 1;
            expect(absoluteActivation.calc(x, true)).to.equal(z);
        });
    });
    describe("activation.INVERSE()", () => {
        const inverseActivation: InverseActivation = new InverseActivation();
        it("activation.INVERSE(number, derivate=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(inverseActivation.calc(x, false)).to.equal(1 - x);
        });
        it("activation.INVERSE(number, derivate=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(inverseActivation.calc(x, true)).to.equal(-1);
        });
    });
    describe("activation.SELU()", () => {
        const alpha: number = 1.6732632423543772848170429916717;
        const scale: number = 1.0507009873554804934193349852946;

        const seluActivation: SELUActivation = new SELUActivation();
        it("activation.SELU(number, derivate=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            const z: number = (x > 0 ? x : alpha * Math.exp(x) - alpha) * scale;
            expect(seluActivation.calc(x, false)).to.be.closeTo(z, 0.01);
        });
        it("activation.SELU(number, derivate=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            const z: number = x > 0 ? scale : ((x > 0 ? x : alpha * Math.exp(x) - alpha) + alpha) * scale;
            expect(seluActivation.calc(x, true)).to.be.closeTo(z, 0.01);
        });
    });
    describe("activation.MISH()", () => {
        const mishActivation: MISHActivation = new MISHActivation();
        it("activation.MISH(number, derivate=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            const z: number = x * Math.tanh(Math.log(1 + Math.exp(x)));
            expect(mishActivation.calc(x, false)).to.be.closeTo(z, 0.01);
        });
        it("activation.MISH(number, derivate=true) => {number}", () => {
            const x: number = randDouble(-50, 50);

            const ex: number = Math.exp(x);
            const w: number = ex * ex * ex + 4 * (ex * ex + x * ex + x + 1) + 6 * ex;
            const d: number = 2 * ex + ex * ex + 2;
            const z: number = ex * w / (d * d);

            expect(mishActivation.calc(x, true)).to.be.closeTo(z, 0.01);
        });
    });
});
