"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Utils_1 = require("../../../src/utils/Utils");
describe("Utils", () => {
    it("pick random", () => {
        const arr = [
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50)
        ];
        const elem = Utils_1.pickRandom(arr);
        chai_1.expect(arr.includes(elem)).to.be.true;
    });
    it("randInt", () => {
        for (let i = 0; i < 100; i++) {
            const int = Utils_1.randInt(-50, 50);
            chai_1.expect(int).to.be.below(50);
            chai_1.expect(int).to.be.above(-51);
        }
    });
    it("randDouble", () => {
        for (let i = 0; i < 100; i++) {
            const double = Utils_1.randDouble(-50, 50);
            chai_1.expect(double).to.be.below(50);
            chai_1.expect(double).to.be.above(-51);
        }
    });
    it("randBoolean", () => {
        let trues = 0;
        let falses = 0;
        for (let i = 0; i < 1000; i++) {
            const bool = Utils_1.randBoolean();
            if (bool) {
                trues++;
            }
            else {
                falses++;
            }
        }
        chai_1.expect(trues).to.be.closeTo(falses, 100);
    });
    it("remove from array", () => {
        const arr = [
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50)
        ];
        chai_1.expect(Utils_1.removeFromArray(arr, 200)).to.be.false;
        chai_1.expect(Utils_1.removeFromArray(arr, arr[0])).to.be.true;
        const len = arr.length;
        chai_1.expect(Utils_1.removeFromArray(arr, arr[2])).to.be.true;
        chai_1.expect(arr.length).equals(len - 1);
    });
    it("shuffle", () => {
        const arr = [
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50)
        ];
        const copy = arr.slice();
        Utils_1.shuffle(copy);
        chai_1.expect(copy.length).to.be.equals(arr.length);
        copy.forEach(element => chai_1.expect(arr).includes(element));
    });
    it("max", () => {
        const arr = [
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50)
        ];
        const maxValue = Utils_1.max(arr);
        arr.forEach(elem => chai_1.expect(elem).to.be.at.most(maxValue));
    });
    it("max index", () => {
        const arr = [
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50)
        ];
        const maxValue = Utils_1.max(arr);
        chai_1.expect(Utils_1.maxValueIndex(arr)).to.be.equals(arr.indexOf(maxValue));
    });
    it("min", () => {
        const arr = [
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50)
        ];
        const minValue = Utils_1.min(arr);
        arr.forEach(elem => chai_1.expect(elem).to.be.at.least(minValue));
    });
    it("min index", () => {
        const arr = [
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50)
        ];
        const minValue = Utils_1.min(arr);
        chai_1.expect(Utils_1.minValueIndex(arr)).to.be.equals(arr.indexOf(minValue));
    });
    it("avg", () => {
        const arr = [
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50)
        ];
        let sum = 0;
        arr.forEach(elem => sum += elem);
        chai_1.expect(Utils_1.avg(arr)).to.be.equals(sum / arr.length);
    });
    it("sum", () => {
        const arr = [
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50),
            Utils_1.randDouble(-50, 50)
        ];
        let sumValue = 0;
        arr.forEach(elem => sumValue += elem);
        chai_1.expect(Utils_1.sum(arr)).to.be.equals(sumValue);
    });
    describe("Utils pairing", () => {
        const a = Utils_1.randInt(0, 100);
        const b = Utils_1.randInt(0, 100);
        it(`pairing(a=${a}, b=${b}) => {number}`, () => {
            const pair = Utils_1.pairing(a, b);
            chai_1.expect(pair).to.be.a("number");
            const w = Math.floor((Math.sqrt(8 * pair + 1) - 1) / 2);
            const t = (w * w + w) / 2;
            const y = pair - t;
            const x = w - y;
            chai_1.expect(a).to.be.equal(x);
            chai_1.expect(b).to.be.equal(y);
        });
    });
});
