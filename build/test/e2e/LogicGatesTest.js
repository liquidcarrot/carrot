"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Network_1 = require("../../src/architecture/Network");
const EvolveOptions_1 = require("../../src/interfaces/EvolveOptions");
const TrainOptions_1 = require("../../src/interfaces/TrainOptions");
describe('Logic Gates', () => {
    const data = {
        NOT: [
            { input: [0], output: [1] },
            { input: [1], output: [0] },
        ],
        AND: [
            { input: [0, 0], output: [0] },
            { input: [0, 1], output: [0] },
            { input: [1, 0], output: [0] },
            { input: [1, 1], output: [1] },
        ],
        OR: [
            { input: [0, 0], output: [0] },
            { input: [0, 1], output: [1] },
            { input: [1, 0], output: [1] },
            { input: [1, 1], output: [1] },
        ],
        NAND: [
            { input: [0, 0], output: [1] },
            { input: [0, 1], output: [1] },
            { input: [1, 0], output: [1] },
            { input: [1, 1], output: [0] },
        ],
        NOR: [
            { input: [0, 0], output: [1] },
            { input: [0, 1], output: [0] },
            { input: [1, 0], output: [0] },
            { input: [1, 1], output: [0] },
        ],
        XOR: [
            { input: [0, 0], output: [0] },
            { input: [0, 1], output: [1] },
            { input: [1, 0], output: [1] },
            { input: [1, 1], output: [0] },
        ],
        XNOR: [
            { input: [0, 0], output: [1] },
            { input: [0, 1], output: [0] },
            { input: [1, 0], output: [0] },
            { input: [1, 1], output: [1] },
        ],
    };
    it('[NOT] Network.train()', () => {
        const network = new Network_1.Network(1, 1);
        const initial = network.test(data.NOT);
        const options = new TrainOptions_1.TrainOptions(data.NOT);
        options.iterations = 20;
        network.train(options);
        const final = network.test(data.NOT);
        chai_1.expect(final).to.be.at.most(initial);
    });
    it('[NOT] Network.evolve()', function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.timeout(20000);
            const network = new Network_1.Network(1, 1);
            const initial = network.test(data.NOT);
            const options = new EvolveOptions_1.EvolveOptions();
            options.iterations = 20;
            options.dataset = data.NOT;
            yield network.evolve(options);
            const final = network.test(data.NOT);
            chai_1.expect(final).to.be.at.most(initial);
        });
    });
    it('[AND] Network.train()', () => {
        const network = new Network_1.Network(2, 1);
        const initial = network.test(data.AND);
        const options = new TrainOptions_1.TrainOptions(data.AND);
        options.iterations = 20;
        network.train(options);
        const final = network.test(data.AND);
        chai_1.expect(final).to.be.at.most(initial);
    });
    it('[AND] Network.evolve()', function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.timeout(20000);
            const network = new Network_1.Network(2, 1);
            const initial = network.test(data.AND);
            const options = new EvolveOptions_1.EvolveOptions();
            options.iterations = 20;
            options.dataset = data.AND;
            yield network.evolve(options);
            const final = network.test(data.AND);
            chai_1.expect(final).to.be.at.most(initial);
        });
    });
    it('[OR] Network.train()', () => {
        const network = new Network_1.Network(2, 1);
        const initial = network.test(data.OR);
        const options = new TrainOptions_1.TrainOptions(data.OR);
        options.iterations = 20;
        network.train(options);
        const final = network.test(data.OR);
        chai_1.expect(final).to.be.at.most(initial);
    });
    it('[OR] Network.evolve()', function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.timeout(20000);
            const network = new Network_1.Network(2, 1);
            const initial = network.test(data.OR);
            const options = new EvolveOptions_1.EvolveOptions();
            options.iterations = 20;
            options.dataset = data.OR;
            yield network.evolve(options);
            const final = network.test(data.OR);
            chai_1.expect(final).to.be.at.most(initial);
        });
    });
    it('[NAND] Network.train()', () => {
        const network = new Network_1.Network(2, 1);
        const initial = network.test(data.NAND);
        const options = new TrainOptions_1.TrainOptions(data.NAND);
        options.iterations = 20;
        network.train(options);
        const final = network.test(data.NAND);
        chai_1.expect(final).to.be.at.most(initial);
    });
    it('[NAND] Network.evolve()', function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.timeout(20000);
            const network = new Network_1.Network(2, 1);
            const initial = network.test(data.NAND);
            const options = new EvolveOptions_1.EvolveOptions();
            options.iterations = 20;
            options.dataset = data.NAND;
            yield network.evolve(options);
            const final = network.test(data.NAND);
            chai_1.expect(final).to.be.at.most(initial);
        });
    });
    it('[NOR] Network.train()', () => {
        const network = new Network_1.Network(2, 1);
        const initial = network.test(data.NOR);
        const options = new TrainOptions_1.TrainOptions(data.NOR);
        options.iterations = 20;
        network.train(options);
        const final = network.test(data.NOR);
        chai_1.expect(final).to.be.at.most(initial);
    });
    it('[NOR] Network.evolve()', function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.timeout(20000);
            const network = new Network_1.Network(2, 1);
            const initial = network.test(data.NOR);
            const options = new EvolveOptions_1.EvolveOptions();
            options.iterations = 20;
            options.dataset = data.NOR;
            yield network.evolve(options);
            const final = network.test(data.NOR);
            chai_1.expect(final).to.be.at.most(initial);
        });
    });
    it('[XOR] Network.train()', () => {
        const network = new Network_1.Network(2, 1);
        const initial = network.test(data.XOR);
        const options = new TrainOptions_1.TrainOptions(data.XOR);
        options.iterations = 20;
        network.train(options);
        const final = network.test(data.XOR);
        chai_1.expect(final).to.be.at.most(initial);
    });
    it('[XOR] Network.evolve()', function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.timeout(20000);
            const network = new Network_1.Network(2, 1);
            const initial = network.test(data.XOR);
            const options = new EvolveOptions_1.EvolveOptions();
            options.iterations = 20;
            options.dataset = data.XOR;
            yield network.evolve(options);
            const final = network.test(data.XOR);
            chai_1.expect(final).to.be.at.most(initial);
        });
    });
    it('[XNOR] Network.train()', () => {
        const network = new Network_1.Network(2, 1);
        const initial = network.test(data.XNOR);
        const options = new TrainOptions_1.TrainOptions(data.XNOR);
        options.iterations = 20;
        network.train(options);
        const final = network.test(data.XNOR);
        chai_1.expect(final).to.be.at.most(initial);
    });
    it('[XNOR] Network.evolve()', function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.timeout(20000);
            const network = new Network_1.Network(2, 1);
            const initial = network.test(data.XNOR);
            const options = new EvolveOptions_1.EvolveOptions();
            options.iterations = 20;
            options.dataset = data.XNOR;
            yield network.evolve(options);
            const final = network.test(data.XNOR);
            chai_1.expect(final).to.be.at.most(initial);
        });
    });
});
