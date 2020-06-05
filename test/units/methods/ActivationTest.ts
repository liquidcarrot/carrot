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
import {randDouble} from "../../../src/utils/Utils";

describe("Activation", () => {
    describe("LogisticActivation", () => {
        it("LogisticActivation(number, derivative=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(LogisticActivation(x, false)).to.equal(1 / (1 + Math.exp(-x)));
        });
        it("LogisticActivation(number, derivative=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(LogisticActivation(x, true)).to.equal(LogisticActivation(x, false) * (1 - LogisticActivation(x, false)));
        });
    });
    describe("TanhActivation()", () => {
        it("TanhActivation(number, derivative=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(TanhActivation(x, false)).to.equal(Math.tanh(x));
        });
        it("TanhActivation(number, derivative=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(TanhActivation(x, true)).to.equal(1 - Math.pow(Math.tanh(x), 2));
        });
    });
    describe("IdentityActivation", () => {
        it("IdentityActivation(number, derivative=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(IdentityActivation(x, false)).to.equal(x);
        });
        it("IdentityActivation(number, derivative=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(IdentityActivation(x, true)).to.equal(1);
        });
    });
    describe("StepActivation", () => {
        it("StepActivation(number) => {number}", () => {
            const x: number = randDouble(-50, 50);
            const z: number = x > 0 ? 1 : 0;
            expect(StepActivation(x, false)).to.equal(z);
        });
        it("StepActivation(number, derivative=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(StepActivation(x, true)).to.equal(0);
        });
    });
    describe("RELUActivation", () => {
        it("RELUActivation(number) => {number, derivative=false}", () => {
            const x: number = randDouble(-50, 50);
            const z: number = x > 0 ? x : 0;
            expect(RELUActivation(x, false)).to.equal(z);
        });
        it("RELUActivation(number, derivative=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            const z: number = x > 0 ? 1 : 0;
            expect(RELUActivation(x, true)).to.equal(z);
        });
    });
    describe("SoftSignActivation", () => {
        it("SoftSignActivation(number, derivative=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(SoftSignActivation(x, false)).to.equal(x / (1 + Math.abs(x)));
        });
        it("SoftSignActivation(number, derivative=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(SoftSignActivation(x, true)).to.equal((x / Math.pow(1 + Math.abs(x), 2)));
        });
    });
    describe("SinusoidActivation", () => {
        it("SinusoidActivation(number, derivative=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(SinusoidActivation(x, false)).to.equal(Math.sin(x));
        });
        it("SinusoidActivation(number, derivative=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(SinusoidActivation(x, true)).to.equal(Math.cos(x));
        });
    });
    describe("GaussianActivation", () => {
        it("GaussianActivation(number) => {number, derivative=false}", () => {
            const x: number = randDouble(-50, 50);
            expect(GaussianActivation(x, false)).to.equal(Math.exp(-Math.pow(x, 2)));
        });
        it("GaussianActivation(number, derivative=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(GaussianActivation(x, true)).to.equal(-2 * x * Math.exp(-Math.pow(x, 2)));
        });
    });
    describe("BentIdentityActivation", () => {
        it("BentIdentityActivation(number, derivative=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(BentIdentityActivation(x, false)).to.equal((Math.sqrt(Math.pow(x, 2) + 1) - 1) / 2 + x);
        });
        it("BentIdentityActivation(number, derivative=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(BentIdentityActivation(x, true)).to.equal(x / (2 * Math.sqrt(Math.pow(x, 2) + 1)) + 1);
        });
    });
    describe("BipolarActivation", () => {
        it("BipolarActivation(number, derivative=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(BipolarActivation(x, false)).to.equal(x > 0 ? 1 : -1);
        });
        it("BipolarActivation(number, derivative=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(BipolarActivation(x, true)).to.equal(0);
        });
    });
    describe("BipolarSigmoidActivation", () => {
        it("BipolarSigmoidActivation(number, derivative=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(BipolarSigmoidActivation(x, false)).to.equal(2 / (1 + Math.exp(-x)) - 1);
        });
        it("BipolarSigmoidActivation(number, derivative=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(BipolarSigmoidActivation(x, true)).to.equal((2 * Math.exp(-x)) / Math.pow(1 + Math.exp(-x), 2));
        });
    });
    describe("HardTanhActivation", () => {
        it("HardTanhActivation(number) => {number, derivative=false}", () => {
            const x: number = randDouble(-50, 50);
            expect(HardTanhActivation(x, false)).to.equal(Math.max(-1, Math.min(1, x)));
        });
        it("HardTanhActivation(number, derivative=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            const z: number = x > -1 && x < 1 ? 1 : 0;
            expect(HardTanhActivation(x, true)).to.equal(z);
        });
    });
    describe("AbsoluteActivation", () => {
        it("AbsoluteActivation(number, derivative=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(AbsoluteActivation(x, false)).to.equal(Math.abs(x));
        });
        it("AbsoluteActivation(number, derivative=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            const z: number = x < 0 ? -1 : 1;
            expect(AbsoluteActivation(x, true)).to.equal(z);
        });
    });
    describe("InverseActivation", () => {
        it("InverseActivation(number, derivative=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(InverseActivation(x, false)).to.equal(1 - x);
        });
        it("InverseActivation(number, derivative=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            expect(InverseActivation(x, true)).to.equal(-1);
        });
    });
    describe("SELUActivation", () => {
        const alpha: number = 1.6732632423543772848170429916717;
        const scale: number = 1.0507009873554804934193349852946;

        it("SELUActivation(number, derivative=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            const z: number = (x > 0 ? x : alpha * Math.exp(x) - alpha) * scale;
            expect(SELUActivation(x, false)).to.be.closeTo(z, 0.01);
        });
        it("SELUActivation(number, derivative=true) => {number}", () => {
            const x: number = randDouble(-50, 50);
            const z: number = x > 0 ? scale : ((x > 0 ? x : alpha * Math.exp(x) - alpha) + alpha) * scale;
            expect(SELUActivation(x, true)).to.be.closeTo(z, 0.01);
        });
    });
    describe("MISHActivation", () => {
        it("MISHActivation(number, derivative=false) => {number}", () => {
            const x: number = randDouble(-50, 50);
            const z: number = x * Math.tanh(Math.log(1 + Math.exp(x)));
            expect(MISHActivation(x, false)).to.be.closeTo(z, 0.01);
        });
        it("MISHActivation(number, derivative=true) => {number}", () => {
            const x: number = randDouble(-50, 50);

            const ex: number = Math.exp(x);
            const w: number = ex * ex * ex + 4 * (ex * ex + x * ex + x + 1) + 6 * ex;
            const d: number = 2 * ex + ex * ex + 2;
            const z: number = ex * w / (d * d);

            expect(MISHActivation(x, true)).to.be.closeTo(z, 0.01);
        });
    });
});
