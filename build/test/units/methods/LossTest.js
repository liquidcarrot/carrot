"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Loss_1 = require("../../../src/methods/Loss");
var Utils_1 = require("../../../src/utils/Utils");
describe("Loss", function () {
    Object.values(Loss_1.ALL_LOSSES).forEach(function (loss) {
        describe("Loss." + loss.constructor.name + "()", function () {
            var targets = [Utils_1.randDouble(-50, 50), Utils_1.randDouble(-50, 50), Utils_1.randDouble(-50, 50)];
            var outputs = [Utils_1.randDouble(-50, 50), Utils_1.randDouble(-50, 50), Utils_1.randDouble(-50, 50)];
            it("Loss." + loss.constructor.name + "(targets=[" + targets + "], outputs=[" + outputs + "]) => {number}", function () {
                chai_1.expect(loss(targets, outputs)).to.be.a("number");
                chai_1.expect(Number.isFinite(loss(targets, outputs))).to.be.true;
            });
        });
    });
});
