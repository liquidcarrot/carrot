import {Loss} from "../methods/Loss";
import {Rate} from "../methods/Rate";

/**
 * Options for training a network
 */
export interface TrainOptions {
    /**
     * The dataset to train on.
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
     * A rate policy to shrink the learning rate
     */
    ratePolicy?: Rate;
    /**
     * The base learning rate (only necessary if no rate policy is given)
     */
    rate?: number;
    /**
     * The loss method used for training
     */
    loss?: Loss;
    /**
     * The number of iterations to train.
     */
    iterations?: number;
    /**
     * The target error value
     */
    error?: number;
    /**
     * Shuffle the dataset at the end of each iteration
     */
    shuffle?: boolean;
    /**
     * The momentum value
     */
    momentum?: number;
    /**
     * The dropout probability
     */
    dropout?: number;
    /**
     * Clear all node states at the end of each iteration
     */
    clear?: boolean;
    /**
     * A function which runs after every schedule.iterations
     */
    schedule?: {
        /**
         * After every amount of "iterations" the function runs.
         */
        iterations: number,
        /**
         * The function to run.
         *
         * @param error the current network error
         * @param iteration the current iteration count
         */
        function: (error: number, iteration: number) => undefined
    };
    /**
     * The size of the dataset for cross validation
     */
    crossValidateTestSize?: number;
    /**
     * log = 10 -> logging every 10th iteration
     * log = 0 -> logging never
     */
    log?: number;
    /**
     * The batch size
     */
    batchSize?: number;
}
