import {Loss} from "../methods/Loss";
import {Rate} from "../methods/Rate";

/**
 * Options used to train network
 */
export interface TrainOptions {
    /**
     * A data of input values and ideal output values to train the network with
     */
    dataset: {
        /**
         * The input values
         */
        input: number[],
        /**
         * The target output values
         */
        output: number[]
    }[];
    /**
     * A [learning rate policy](https://towardsdatascience.com/understanding-learning-rates-and-how-it-improves-performance-in-deep-learning-d0d4059c1c10), i.e. how to change the learning rate during training to get better network performance
     */
    ratePolicy?: Rate;
    /**
     * Sets the [learning rate](https://towardsdatascience.com/understanding-learning-rates-and-how-it-improves-performance-in-deep-learning-d0d4059c1c10) of the backpropagation process
     */
    rate?: number;
    /**
     * The [options.loss function](https://en.wikipedia.org/wiki/Loss_function) used to determine network error
     */
    loss?: Loss;
    /**
     * Sets amount of training cycles the process will maximally run, even when the target error has not been reached.
     */
    iterations?: number;
    /**
     * The target error to train for, once the network falls below this error, the process is stopped. Lower error rates require more training cycles.
     */
    error?: number;
    /**
     * When set to true, will shuffle the training data every iterationNumber. Good option to use if the network is performing worse in [cross validation](https://artint.info/html/ArtInt_189.html) than in the real training data.
     */
    shuffle?: boolean;
    /**
     * [Momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html). Adds a fraction of the previous weight update to the current one.
     */
    momentum?: number;
    /**
     * [Dropout rate](https://medium.com/@amarbudhiraja/https-medium-com-amarbudhiraja-learning-less-to-learn-better-options.dropout-in-deep-machine-learning-74334da4bfc5) likelihood for any given neuron to be ignored during network training. Must be between zero and one, numbers closer to one will result in more neurons ignored.
     */
    dropout?: number;
    /**
     * If set to true, will clear the network after every activation. This is useful for training LSTM's, more importantly for time series prediction.
     */
    clear?: boolean;
    /**
     * You can schedule tasks to happen every n iterations. Paired with `options.schedule.function`
     */
    schedule?: {
        /**
         * You can schedule tasks to happen every n iterations. Paired with `options.schedule.function`
         */
        iterations: number,
        /**
         * A function to run every n iterations as data by `options.schedule.iterations`. Passed as an object with a "function" property that contains the function to run.
         *
         * @param error the current network error
         * @param iteration the current iteration count
         */
        function: (error: number, iteration: number) => undefined
    };
    /**
     * Sets the amount of test cases that should be assigned to cross validation. If data to 0.4, 40% of the given data will be used for cross validation.
     */
    crossValidateTestSize?: number;
    /**
     * If set to n, outputs training status every n iterations. Setting `log` to 1 will log the status every iteration_number
     */
    log?: number;
    /**
     * Sets the (mini-) batch size of your training. Default: 1 [(online training)](https://www.quora.com/What-is-the-difference-between-batch-online-and-mini-batch-training-in-neural-networks-Which-one-should-I-use-for-a-small-to-medium-sized-dataset-for-prediction-purposes)
     */
    batchSize?: number;
}
