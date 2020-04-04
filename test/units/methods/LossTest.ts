import {randDouble} from "../../../src/methods/Utils";
import {expect} from "chai";
import {ALL_LOSSES} from "../../../src/methods/Loss";

describe("Loss", () => {
    ALL_LOSSES.forEach(loss => {
        describe(`Loss.${loss}()`, () => {
            const targets: number[] = [randDouble(-50, 50), randDouble(-50, 50), randDouble(-50, 50)];
            const outputs: number[] = [randDouble(-50, 50), randDouble(-50, 50), randDouble(-50, 50)];

            it(`Loss.${loss}(targets=[${targets}], outputs=[${outputs}]) => {number}`, () => {
                expect(loss.calc(targets, outputs)).to.be.a("number");
            });
        });
    });
});
