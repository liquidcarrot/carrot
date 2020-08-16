import {lossType, MSELoss} from '../methods/Loss';
import {FixedRate, Rate} from '../methods/Rate';

/**
 * Options used to train network
 */
export class TrainOptions {
  constructor(
    dataset: {
      /**
       * The input values
       */
      input: number[];
      /**
       * The target output values
       */
      output: number[];
    }[]
  ) {
    this._dataset = dataset;
    this._iterations = -1;
    this._error = -1;
    this._loss = MSELoss;
    this._dropout = 0;
    this._momentum = 0;
    this._batchSize = this.dataset.length;
    this._rate = new FixedRate(0.3);
    this._log = -1;
    this._crossValidateTestSize = -1;
    this._shuffle = false;
    this._clear = false;
  }

  /**
   * A data of input values and ideal output values to train the network with
   */
  private _dataset: {
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
   * Getter
   */
  public get dataset(): {
    /**
     * The input values
     */
    input: number[];
    /**
     * The target output values
     */
    output: number[];
  }[] {
    return this._dataset;
  }

  /**
   * Setter
   */
  public set dataset(
    value: {
      /**
       * The input values
       */
      input: number[];
      /**
       * The target output values
       */
      output: number[];
    }[]
  ) {
    this._dataset = value;
  }

  /**
   * If set to true, will shuffle the training data every iterationNumber. Good option to use if the network is performing worse in [cross validation](https://artint.info/html/ArtInt_189.html) than in the real training data.
   */
  private _shuffle: boolean;

  /**
   * Getter
   */
  public get shuffle(): boolean {
    return this._shuffle;
  }

  /**
   * Setter
   */
  public set shuffle(value: boolean) {
    this._shuffle = value;
  }

  /**
   * If set to true, will clear the network after every activation. This is useful for training LSTM's, more importantly for time series prediction.
   */
  private _clear: boolean;

  /**
   * Getter
   */
  public get clear(): boolean {
    return this._clear;
  }

  /**
   * Setter
   */
  public set clear(value: boolean) {
    this._clear = value;
  }

  /**
   * You can schedule tasks to happen every n iterations. Paired with `options.schedule.function`
   */
  private _schedule?: {
    /**
     * You can schedule tasks to happen every n iterations. Paired with `options.schedule.function`
     */
    iterations: number;
    /**
     * A function to run every n iterations as data by `options.schedule.iterations`. Passed as an object with a "function" property that contains the function to run.
     *
     * @param error the current network error
     * @param iteration the current iteration count
     */
    function: (error: number, iteration: number) => undefined;
  };

  /**
   * Getter
   */
  public get schedule():
    | {
        /**
         * You can schedule tasks to happen every n iterations. Paired with `options.schedule.function`
         */
        iterations: number;
        /**
         * A function to run every n iterations as data by `options.schedule.iterations`. Passed as an object with a "function" property that contains the function to run.
         *
         * @param error the current network error
         * @param iteration the current iteration count
         */
        function: (error: number, iteration: number) => undefined;
      }
    | undefined {
    return this._schedule;
  }

  /**
   * Setter
   */
  public set schedule(
    value:
      | {
          /**
           * You can schedule tasks to happen every n iterations. Paired with `options.schedule.function`
           */
          iterations: number;
          /**
           * A function to run every n iterations as data by `options.schedule.iterations`. Passed as an object with a "function" property that contains the function to run.
           *
           * @param error the current network error
           * @param iteration the current iteration count
           */
          function: (error: number, iteration: number) => undefined;
        }
      | undefined
  ) {
    this._schedule = value;
  }

  /**
   * Sets the amount of test cases that should be assigned to cross validation. If data to 0.4, 40% of the given data will be used for cross validation.
   */
  private _crossValidateTestSize: number;

  /**
   * Getter
   */
  public get crossValidateTestSize(): number {
    return this._crossValidateTestSize;
  }

  /**
   * Setter
   */
  public set crossValidateTestSize(value: number) {
    this._crossValidateTestSize = value;
  }

  /**
   * A [learning rate policy](https://towardsdatascience.com/understanding-learning-rates-and-how-it-improves-performance-in-deep-learning-d0d4059c1c10), i.e. how to change the learning rate during training to better network performance
   */
  private _rate: Rate;

  /**
   * Getter
   */
  public get rate(): Rate {
    return this._rate;
  }

  /**
   * Setter
   */
  public set rate(value: Rate) {
    this._rate = value;
  }

  /**
   * The [options.loss function](https://en.wikipedia.org/wiki/Loss_function) used to determine network error
   */
  private _loss: lossType;

  /**
   * Getter
   */
  public get loss(): lossType {
    return this._loss;
  }

  /**
   * Setter
   */
  public set loss(value: lossType) {
    this._loss = value;
  }

  /**
   * Sets amount of training cycles the process will maximally run, even when the target error has not been reached.
   */
  private _iterations: number;

  /**
   * Getter
   */
  public get iterations(): number {
    return this._iterations;
  }

  /**
   * Setter
   */
  public set iterations(value: number) {
    this._iterations = value;
  }

  /**
   * The target error to train for, once the network falls below this error, the process is stopped. Lower error rates require more training cycles.
   */
  private _error: number;

  /**
   * Getter
   */
  public get error(): number {
    return this._error;
  }

  /**
   * Setter
   */
  public set error(value: number) {
    this._error = value;
  }

  /**
   * [Momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html). Adds a fraction of the previous weight update to the current one.
   */
  private _momentum: number;

  /**
   * Getter
   */
  public get momentum(): number {
    return this._momentum;
  }

  /**
   * Setter
   */
  public set momentum(value: number) {
    this._momentum = value;
  }

  /**
   * [Dropout rate](https://medium.com/@amarbudhiraja/https-medium-com-amarbudhiraja-learning-less-to-learn-better-options.dropout-in-deep-machine-learning-74334da4bfc5) likelihood for any given neuron to be ignored during network training. Must be between zero and one, numbers closer to one will result in more neurons ignored.
   */
  private _dropout: number;

  /**
   * Getter
   */
  public get dropout(): number {
    return this._dropout;
  }

  /**
   * Setter
   */
  public set dropout(value: number) {
    this._dropout = value;
  }

  /**
   * If set to n, outputs training status every n iterations. Setting `log` to 1 will log the status every iteration_number
   */
  private _log: number;

  /**
   * Getter
   */
  public get log(): number {
    return this._log;
  }

  /**
   * Setter
   */
  public set log(value: number) {
    this._log = value;
  }

  /**
   * Sets the (mini-) batch size of your training. Default: 1 [(online training)](https://www.quora.com/What-is-the-difference-between-batch-online-and-mini-batch-training-in-neural-networks-Which-one-should-I-use-for-a-small-to-medium-sized-dataset-for-prediction-purposes)
   */
  private _batchSize: number;

  /**
   * Getter
   */
  public get batchSize(): number {
    return this._batchSize;
  }

  /**
   * Setter
   */
  public set batchSize(value: number) {
    this._batchSize = value;
  }
}
