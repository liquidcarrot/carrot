// @ts-ignore
// tslint:disable-next-line:no-any
const mnist: any = require("mnist");
import {Network} from "../../src/architecture/Network";
import {ActivationType} from "../../src/enums/ActivationType";
import {EvolveOptions} from "../../src/interfaces/EvolveOptions";
import {FEEDFORWARD_MUTATIONS} from "../../src/methods/Mutation";

describe('MNIST', () => {
    it("evolve mnist", () => {
        const set: {
            training: { input: number[], output: number[] }[],
            test: { input: number[], output: number[] }[]
        } = mnist.set(8000, 2000);

        const trainingSet: { input: number[], output: number[] }[] = set.training;
        const testSet: { input: number[], output: number[] }[] = set.test;

        const net: Network = new Network(trainingSet[0].input.length, trainingSet[0].output.length);

        const options: EvolveOptions = {
            dataset: trainingSet,
            log: 1,
            populationSize: 100,
            elitism: 5,
            mutations: FEEDFORWARD_MUTATIONS,
            activations: [ActivationType.RELUActivation, ActivationType.MISHActivation, ActivationType.LogisticActivation],
            mutationAmount: 5,
            mutationRate: 0.6

        };
        console.log("START EVOLUTION");
        net.evolve(options)
            .then(() => {
                console.log(net.test(testSet));
            });
    });
});
