"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Loss_1 = require("../../../src/methods/Loss");
const Utils_1 = require("../../../src/utils/Utils");
describe("Loss", () => {
    Object.values(Loss_1.ALL_LOSSES).forEach(loss => {
        describe(`Loss.${loss.constructor.name}()`, () => {
            const targets = [Utils_1.randDouble(-50, 50), Utils_1.randDouble(-50, 50), Utils_1.randDouble(-50, 50)];
            const outputs = [Utils_1.randDouble(-50, 50), Utils_1.randDouble(-50, 50), Utils_1.randDouble(-50, 50)];
            it(`Loss.${loss.constructor.name}(targets=[${targets}], outputs=[${outputs}]) => {number}`, () => {
                chai_1.expect(loss(targets, outputs)).to.be.a("number");
                chai_1.expect(Number.isFinite(loss(targets, outputs))).to.be.true;
            });
        });
    });
});
