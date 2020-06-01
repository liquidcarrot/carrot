import {expect} from "chai";
import {ALL_LOSSES} from "../../../src/methods/Loss";
import {randDouble} from "../../../src/methods/Utils";

describe("Loss", () => {
    Object.values(ALL_LOSSES).forEach(loss => {
        describe(`Loss.${loss.constructor.name}()`, () => {
            const targets: number[] = [randDouble(-50, 50), randDouble(-50, 50), randDouble(-50, 50)];
            const outputs: number[] = [randDouble(-50, 50), randDouble(-50, 50), randDouble(-50, 50)];

            it(`Loss.${loss.constructor.name}(targets=[${targets}], outputs=[${outputs}]) => {number}`, () => {
                expect(loss(targets, outputs)).to.be.a("number");
                expect(Number.isFinite(loss(targets, outputs))).to.be.true;
            });
        });
    });
});