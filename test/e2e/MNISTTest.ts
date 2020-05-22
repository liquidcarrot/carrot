// @ts-ignore
// tslint:disable-next-line:no-any
const mnist: any = require("mnist");
import {expect} from "chai";
import {Network} from "../../src/architecture/Network";
import {ActivationType} from "../../src/enums/ActivationType";
import {EvolveOptions} from "../../src/interfaces/EvolveOptions";
import {FEEDFORWARD_MUTATIONS} from "../../src/methods/Mutation";

describe('MNIST', () => {
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
        const errorBefore: number = net.test(trainingSet);

        const options: EvolveOptions = {
            dataset: trainingSet,
            populationSize: 20,
            elitism: 2,
            mutations: FEEDFORWARD_MUTATIONS,
            activations: [ActivationType.RELUActivation, ActivationType.MISHActivation, ActivationType.LogisticActivation],
            mutationAmount: 20,
            mutationRate: 0.6,
            iterations: 20,
            error: 0,
        };
        await net.evolve(options);

        const errorAfter: number = net.test(trainingSet);

        expect(Number.isFinite(errorAfter)).to.be.true;
        expect(errorAfter).to.be.at.most(errorBefore);
    });
});
