"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Activation_1 = require("../../../src/methods/Activation");
var Utils_1 = require("../../../src/methods/Utils");
describe("Activation", function () {
    describe("LogisticActivation", function () {
        it("LogisticActivation(number, derivative=false) => {number}", function () {
            var x = Utils_1.randDouble(-50, 50);
            chai_1.expect(Activation_1.LogisticActivation(x, false)).to.equal(1 / (1 + Math.exp(-x)));
        });
        it("LogisticActivation(number, derivative=true) => {number}", function () {
            var x = Utils_1.randDouble(-50, 50);
            chai_1.expect(Activation_1.LogisticActivation(x, true)).to.equal(Activation_1.LogisticActivation(x, false) * (1 - Activation_1.LogisticActivation(x, false)));
        });
    });
    describe("TanhActivation()", function () {
        it("TanhActivation(number, derivative=false) => {number}", function () {
            var x = Utils_1.randDouble(-50, 50);
            chai_1.expect(Activation_1.TanhActivation(x, false)).to.equal(Math.tanh(x));
        });
        it("TanhActivation(number, derivative=true) => {number}", function () {
            var x = Utils_1.randDouble(-50, 50);
            chai_1.expect(Activation_1.TanhActivation(x, true)).to.equal(1 - Math.pow(Math.tanh(x), 2));
        });
    });
    describe("IdentityActivation", function () {
        it("IdentityActivation(number, derivative=false) => {number}", function () {
            var x = Utils_1.randDouble(-50, 50);
            chai_1.expect(Activation_1.IdentityActivation(x, false)).to.equal(x);
        });
        it("IdentityActivation(number, derivative=true) => {number}", function () {
            var x = Utils_1.randDouble(-50, 50);
            chai_1.expect(Activation_1.IdentityActivation(x, true)).to.equal(1);
        });
    });
    describe("StepActivation", function () {
        it("StepActivation(number) => {number}", function () {
            var x = Utils_1.randDouble(-50, 50);
            var z = x > 0 ? 1 : 0;
            chai_1.expect(Activation_1.StepActivation(x, false)).to.equal(z);
        });
        it("StepActivation(number, derivative=true) => {number}", function () {
            var x = Utils_1.randDouble(-50, 50);
            chai_1.expect(Activation_1.StepActivation(x, true)).to.equal(0);
        });
    });
    describe("RELUActivation", function () {
        it("RELUActivation(number) => {number, derivative=false}", function () {
            var x = Utils_1.randDouble(-50, 50);
            var z = x > 0 ? x : 0;
            chai_1.expect(Activation_1.RELUActivation(x, false)).to.equal(z);
        });
        it("RELUActivation(number, derivative=true) => {number}", function () {
            var x = Utils_1.randDouble(-50, 50);
            var z = x > 0 ? 1 : 0;
            chai_1.expect(Activation_1.RELUActivation(x, true)).to.equal(z);
        });
    });
    describe("SoftSignActivation", function () {
        it("SoftSignActivation(number, derivative=false) => {number}", function () {
            var x = Utils_1.randDouble(-50, 50);
            chai_1.expect(Activation_1.SoftSignActivation(x, false)).to.equal(x / (1 + Math.abs(x)));
        });
        it("SoftSignActivation(number, derivative=true) => {number}", function () {
            var x = Utils_1.randDouble(-50, 50);
            chai_1.expect(Activation_1.SoftSignActivation(x, true)).to.equal((x / Math.pow(1 + Math.abs(x), 2)));
        });
    });
    describe("SinusoidActivation", function () {
        it("SinusoidActivation(number, derivative=false) => {number}", function () {
            var x = Utils_1.randDouble(-50, 50);
            chai_1.expect(Activation_1.SinusoidActivation(x, false)).to.equal(Math.sin(x));
        });
        it("SinusoidActivation(number, derivative=true) => {number}", function () {
            var x = Utils_1.randDouble(-50, 50);
            chai_1.expect(Activation_1.SinusoidActivation(x, true)).to.equal(Math.cos(x));
        });
    });
    describe("GaussianActivation", function () {
        it("GaussianActivation(number) => {number, derivative=false}", function () {
            var x = Utils_1.randDouble(-50, 50);
            chai_1.expect(Activation_1.GaussianActivation(x, false)).to.equal(Math.exp(-Math.pow(x, 2)));
        });
        it("GaussianActivation(number, derivative=true) => {number}", function () {
            var x = Utils_1.randDouble(-50, 50);
            chai_1.expect(Activation_1.GaussianActivation(x, true)).to.equal(-2 * x * Math.exp(-Math.pow(x, 2)));
        });
    });
    describe("BentIdentityActivation", function () {
        it("BentIdentityActivation(number, derivative=false) => {number}", function () {
            var x = Utils_1.randDouble(-50, 50);
            chai_1.expect(Activation_1.BentIdentityActivation(x, false)).to.equal((Math.sqrt(Math.pow(x, 2) + 1) - 1) / 2 + x);
        });
        it("BentIdentityActivation(number, derivative=true) => {number}", function () {
            var x = Utils_1.randDouble(-50, 50);
            chai_1.expect(Activation_1.BentIdentityActivation(x, true)).to.equal(x / (2 * Math.sqrt(Math.pow(x, 2) + 1)) + 1);
        });
    });
    describe("BipolarActivation", function () {
        it("BipolarActivation(number, derivative=false) => {number}", function () {
            var x = Utils_1.randDouble(-50, 50);
            chai_1.expect(Activation_1.BipolarActivation(x, false)).to.equal(x > 0 ? 1 : -1);
        });
        it("BipolarActivation(number, derivative=true) => {number}", function () {
            var x = Utils_1.randDouble(-50, 50);
            chai_1.expect(Activation_1.BipolarActivation(x, true)).to.equal(0);
        });
    });
    describe("BipolarSigmoidActivation", function () {
        it("BipolarSigmoidActivation(number, derivative=false) => {number}", function () {
            var x = Utils_1.randDouble(-50, 50);
            chai_1.expect(Activation_1.BipolarSigmoidActivation(x, false)).to.equal(2 / (1 + Math.exp(-x)) - 1);
        });
        it("BipolarSigmoidActivation(number, derivative=true) => {number}", function () {
            var x = Utils_1.randDouble(-50, 50);
            chai_1.expect(Activation_1.BipolarSigmoidActivation(x, true)).to.equal((2 * Math.exp(-x)) / Math.pow(1 + Math.exp(-x), 2));
        });
    });
    describe("HardTanhActivation", function () {
        it("HardTanhActivation(number) => {number, derivative=false}", function () {
            var x = Utils_1.randDouble(-50, 50);
            chai_1.expect(Activation_1.HardTanhActivation(x, false)).to.equal(Math.max(-1, Math.min(1, x)));
        });
        it("HardTanhActivation(number, derivative=true) => {number}", function () {
            var x = Utils_1.randDouble(-50, 50);
            var z = x > -1 && x < 1 ? 1 : 0;
            chai_1.expect(Activation_1.HardTanhActivation(x, true)).to.equal(z);
        });
    });
    describe("AbsoluteActivation", function () {
        it("AbsoluteActivation(number, derivative=false) => {number}", function () {
            var x = Utils_1.randDouble(-50, 50);
            chai_1.expect(Activation_1.AbsoluteActivation(x, false)).to.equal(Math.abs(x));
        });
        it("AbsoluteActivation(number, derivative=true) => {number}", function () {
            var x = Utils_1.randDouble(-50, 50);
            var z = x < 0 ? -1 : 1;
            chai_1.expect(Activation_1.AbsoluteActivation(x, true)).to.equal(z);
        });
    });
    describe("InverseActivation", function () {
        it("InverseActivation(number, derivative=false) => {number}", function () {
            var x = Utils_1.randDouble(-50, 50);
            chai_1.expect(Activation_1.InverseActivation(x, false)).to.equal(1 - x);
        });
        it("InverseActivation(number, derivative=true) => {number}", function () {
            var x = Utils_1.randDouble(-50, 50);
            chai_1.expect(Activation_1.InverseActivation(x, true)).to.equal(-1);
        });
    });
    describe("SELUActivation", function () {
        var alpha = 1.6732632423543772848170429916717;
        var scale = 1.0507009873554804934193349852946;
        it("SELUActivation(number, derivative=false) => {number}", function () {
            var x = Utils_1.randDouble(-50, 50);
            var z = (x > 0 ? x : alpha * Math.exp(x) - alpha) * scale;
            chai_1.expect(Activation_1.SELUActivation(x, false)).to.be.closeTo(z, 0.01);
        });
        it("SELUActivation(number, derivative=true) => {number}", function () {
            var x = Utils_1.randDouble(-50, 50);
            var z = x > 0 ? scale : ((x > 0 ? x : alpha * Math.exp(x) - alpha) + alpha) * scale;
            chai_1.expect(Activation_1.SELUActivation(x, true)).to.be.closeTo(z, 0.01);
        });
    });
    describe("MISHActivation", function () {
        it("MISHActivation(number, derivative=false) => {number}", function () {
            var x = Utils_1.randDouble(-50, 50);
            var z = x * Math.tanh(Math.log(1 + Math.exp(x)));
            chai_1.expect(Activation_1.MISHActivation(x, false)).to.be.closeTo(z, 0.01);
        });
        it("MISHActivation(number, derivative=true) => {number}", function () {
            var x = Utils_1.randDouble(-50, 50);
            var ex = Math.exp(x);
            var w = ex * ex * ex + 4 * (ex * ex + x * ex + x + 1) + 6 * ex;
            var d = 2 * ex + ex * ex + 2;
            var z = ex * w / (d * d);
            chai_1.expect(Activation_1.MISHActivation(x, true)).to.be.closeTo(z, 0.01);
        });
    });
});
