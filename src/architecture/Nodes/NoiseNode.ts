import {NoiseNodeType} from '../../enums/NodeType';
import {avg, generateGaussian, sum} from '../../utils/Utils';
import {ConstantNode} from './ConstantNode';

/**
 * Noise node
 */
export class NoiseNode extends ConstantNode {
  /**
   * The type of noise
   */
  private readonly noiseType: NoiseNodeType;
  /**
   * More options for applying noise
   */
  private readonly options: {
    /**
     * Options for gaussian noise
     */
    gaussian?: {
      /**
       * Mean value
       */
      mean?: number;
      /**
       * Standard deviation
       */
      deviation?: number;
    };
  };

  constructor(
    options: {
      /**
       * The type of noise
       */
      noiseType?: NoiseNodeType;
      /**
       * Options for gaussian noise
       */
      gaussian?: {
        /**
         * Mean value
         */
        mean?: number;
        /**
         * Standard deviation
         */
        deviation?: number;
      };
    } = {}
  ) {
    super();
    this.noiseType = options.noiseType ?? NoiseNodeType.GAUSSIAN_NOISE;
    this.options = options;
  }

  /**
   * Actives the node.
   *
   * When a neuron activates, it computes its state from all its input connections and 'squashes' it using its activation function, and returns the output (activation).
   *
   * You can also provide the activation (a float between 0 and 1) as a parameter, which is useful for neurons in the input layer.
   *
   * @returns A neuron's output value
   */
  public activate(): number {
    this.prevState = this.state;

    const incomingStates: number[] = Array.from(this.incoming).map(
      conn => conn.from.activation * conn.weight * conn.gain
    );

    switch (this.noiseType) {
      case NoiseNodeType.GAUSSIAN_NOISE:
        this.state =
          avg(incomingStates) +
          generateGaussian(
            this.options.gaussian?.mean ?? 0,
            this.options.gaussian?.deviation ?? 2
          );
        break;
      default:
        throw new ReferenceError('Cannot activate this noise type!');
    }

    this.activation = this.squash(this.state, false) * this.mask;
    this.derivativeState = this.squash(this.state, true);

    return this.activation;
  }

  /**
   * Backpropagate the error (a.k.a. learn).
   *
   * After an activation, you can teach the node what should have been the correct output (a.k.a. train). This is done by backpropagating. [Momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html) adds a fraction of the previous weight update to the current one. When the gradient keeps pointing in the same direction, this will increase the size of the steps taken towards the minimum.
   *
   * If you combine a high learning rate with a lot of momentum, you will rush past the minimum (of the error function) with huge steps. It is therefore often necessary to reduce the global learning rate µ when using a lot of momentum (m close to 1).
   *
   * @param target The target value (i.e. "the value the network SHOULD have given")
   * @param options More options for propagation
   */
  public propagate(
    target?: number,
    options: {
      /**
       * [Momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html) adds a fraction of the previous weight update to the current one.
       */
      momentum?: number;
      /**
       * [Learning rate](https://towardsdatascience.com/understanding-learning-rates-and-how-it-improves-performance-in-deep-learning-d0d4059c1c10)
       */
      rate?: number;
      /**
       * When set to false weights won't update, but when set to true after being false the last propagation will include the delta weights of the first "update:false" propagations too.
       */
      update?: boolean;
    } = {}
  ): void {
    options.momentum = options.momentum ?? 0;
    options.rate = options.rate ?? 0.3;
    options.update = options.update ?? true;

    const connectionsStates: number[] = Array.from(this.outgoing).map(
      conn => conn.to.errorResponsibility * conn.weight * conn.gain
    );
    this.errorResponsibility = this.errorProjected =
      sum(connectionsStates) * this.derivativeState;

    this.incoming.forEach(connection => {
      // calculate gradient
      let gradient: number = this.errorProjected * connection.eligibility;
      connection.xTrace.forEach((value, key) => {
        gradient += key.errorResponsibility * value;
      });

      connection.deltaWeightsTotal +=
        (options.rate ?? 0.3) * gradient * this.mask;
      if (options.update) {
        connection.deltaWeightsTotal +=
          (options.momentum ?? 0) * connection.deltaWeightsPrevious;
        connection.weight += connection.deltaWeightsTotal;
        connection.deltaWeightsPrevious = connection.deltaWeightsTotal;
        connection.deltaWeightsTotal = 0;
      }
    });
  }
}
