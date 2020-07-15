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
// @ts-ignore
// tslint:disable-next-line:no-any
const mnist = require("mnist");
const chai_1 = require("chai");
const Network_1 = require("../../src/architecture/Network");
const EvolveOptions_1 = require("../../src/interfaces/EvolveOptions");
const Mutation_1 = require("../../src/methods/Mutation");
describe('MNIST', () => {
    it("evolve mnist", function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.timeout(0);
            const set = mnist.set(2000, 0);
            const trainingSet = set.training;
            const net = new Network_1.Network(trainingSet[0].input.length, trainingSet[0].output.length);
            const errorBefore = net.test(trainingSet);
            const options = new EvolveOptions_1.EvolveOptions();
            options.dataset = trainingSet;
            options.populationSize = 50;
            options.mutations = Mutation_1.FEEDFORWARD_MUTATIONS;
            options.mutationAmount = 2;
            options.mutationRate = 0.4;
            options.iterations = 10;
            yield net.evolve(options);
            const errorAfter = net.test(trainingSet);
            chai_1.expect(Number.isFinite(errorAfter)).to.be.true;
            chai_1.expect(errorAfter).to.be.at.most(errorBefore);
        });
    });
});
