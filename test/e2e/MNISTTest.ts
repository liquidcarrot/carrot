// @ts-ignore
// tslint:disable-next-line:no-any
const mnist: any = require("mnist");
import {Identitiy, RELU} from "activations/build/src";
import {expect} from "chai";
import {Network} from "../../src/architecture/Network";
import {EvolveOptions} from "../../src/interfaces/EvolveOptions";
import {BinaryLoss} from "../../src/methods/Loss";
import {FEEDFORWARD_MUTATIONS} from "../../src/methods/Mutation";

describe.skip('MNIST', () => {
    it("evolve mnist", async function (): Promise<void> {
        this.timeout(0);

        const set: {
            /**
             * The training dataset
             */
            training: {
                /**
                 * The input values
                 */
                input: number[],
                /**
                 * The target output values
                 */
                output: number[]
            }[],
            /**
             * The test dataset
             */
            test: {
                /**
                 * The input values
                 */
                input: number[],
                /**
                 * The target output values
                 */
                output: number[]
            }[]
        } = mnist.set(2000, 0);

        const trainingSet: {
            /**
             * The input values
             */
            input: number[],
            /**
             * The target output values
             */
            output: number[]
        }[] = set.training;

        const net: Network = new Network(trainingSet[0].input.length, trainingSet[0].output.length);
        const errorBefore: number = net.test(trainingSet, BinaryLoss);

        const options: EvolveOptions = {
            dataset: trainingSet,
            populationSize: 20,
            elitism: 1,
            mutations: FEEDFORWARD_MUTATIONS,
            activations: [RELU, Identitiy],
            mutationAmount: 10,
            mutationRate: 0.4,
            iterations: 30,
            loss: BinaryLoss
        };
        await net.evolve(options);

        const errorAfter: number = net.test(trainingSet, BinaryLoss);

        expect(Number.isFinite(errorAfter)).to.be.true;
        expect(errorAfter).to.be.at.most(errorBefore);
    });
});
