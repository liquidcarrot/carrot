import {expect} from 'chai';
import mnist from 'mnist';
import {describe, it} from 'mocha';
import {Network} from '../../src/architecture/Network';
import {EvolveOptions} from '../../src/interfaces/EvolveOptions';
import {FEEDFORWARD_MUTATIONS} from '../../src/methods/Mutation';

describe('MNIST', () => {
  it('evolve mnist', async function (): Promise<void> {
    this.timeout(0);

    const set: {
      /**
       * The training dataset
       */
      training: {
        /**
         * The input values
         */
        input: number[];
        /**
         * The target output values
         */
        output: number[];
      }[];
      /**
       * The test dataset
       */
      test: {
        /**
         * The input values
         */
        input: number[];
        /**
         * The target output values
         */
        output: number[];
      }[];
    } = mnist.set(2000, 0);

    const trainingSet: {
      /**
       * The input values
       */
      input: number[];
      /**
       * The target output values
       */
      output: number[];
    }[] = set.training;

    const net: Network = new Network(
      trainingSet[0].input.length,
      trainingSet[0].output.length
    );
    const errorBefore: number = net.test(trainingSet);

    const options: EvolveOptions = new EvolveOptions();
    options.dataset = trainingSet;
    options.populationSize = 50;
    options.mutations = FEEDFORWARD_MUTATIONS;
    options.mutationAmount = 2;
    options.mutationRate = 0.4;
    options.iterations = 10;
    await net.evolve(options);

    const errorAfter: number = net.test(trainingSet);

    expect(Number.isFinite(errorAfter)).to.be.true;
    expect(errorAfter).to.be.at.most(errorBefore);
  });
});
