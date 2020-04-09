/**
 * Built-in learning rate policies, which allow for a dynamic learning rate during neural network training.
 *
 * @see [Learning rates and how-to improve performance](https://towardsdatascience.com/understanding-learning-rates-and-how-it-improves-performance-in-deep-learning-d0d4059c1c10)
 * @see [Learning rate policy](https://stackoverflow.com/questions/30033096/what-is-lr-policy-in-caffe/30045244)
 *
 * @example
 * let network = new Network(5, 5);
 *
 * // OPTION #1: FixedRate
 * network.train(dataset, { ratePolicy: new FixedRate() });
 *
 * // OPTION #2: StepRate
 * network.train(dataset, { ratePolicy: new StepRate() });
 *
 * // OPTION #3: ExponentialRate
 * network.train(dataset, { ratePolicy: new ExponentialRate() });
 *
 * // OPTION #4: InverseRate
 * network.train(dataset, { ratePolicy: new InverseRate() });
 */
abstract class Rate {
    protected baseRate: number;

    /**
     * Constructs a rate policy
     * @param baseRate the rate at first iteration
     */
    constructor(baseRate: number) {
        this.baseRate = baseRate;
    }

    /**
     * Calculates the current training rate.
     *
     * @param iteration count
     * @returns the current training rate
     */
    public abstract calc(iteration: number): number;
}

/**
 * Fixed Learning Rate
 *
 * Default rate policy. Using this will make learning rate static (no change). Useful as a way to update a previous rate policy.
 *
 * @example
 * let network = new Network(10, 1);
 *
 * network.train(dataset, { ratePolicy: new FixedRate(0.3) });
 */
class FixedRate extends Rate {

    /**
     * Calculates the current training rate.
     *
     * @param iteration count
     * @returns the current training rate
     */
    public calc(iteration: number): number {
        return this.baseRate;
    }
}

/**
 * Step Learning Rate
 *
 * The learning rate will decrease (i.e. 'step down') every `stepSize` iterations.
 *
 * @example
 * let network = new Network(10, 1);
 *
 * network.train(dataset, { ratePolicy: new StepRate(0.3) });
 */
class StepRate extends Rate {
    private readonly gamma: number;
    private readonly stepSize: number;

    /**
     * Constructs a step rate policy.
     *
     * @param baseRate the rate at first iteration
     * @param gamma=0.9 Learning rate retention per step; - _0 < `gamma` < 1_ - _large `gamma` CAN cause networks to never converge, low `gamma` CAN cause networks to converge too quickly_
     * @param stepSize=100 Learning rate is updated every `step_size` iterations
     */
    constructor(baseRate: number, gamma: number = 0.9, stepSize: number = 100) {
        super(baseRate);
        this.gamma = gamma;
        this.stepSize = stepSize;
    }

    /**
     * Calculates the current training rate.
     *
     * @param iteration count
     * @returns the current training rate
     */
    public calc(iteration: number): number {
        return this.baseRate * Math.pow(this.gamma, Math.floor(iteration / this.stepSize));
    }
}

/**
 * Exponential Learning Rate
 *
 * The learning rate will exponentially decrease.
 *
 * The rate at `iteration` is calculated as: `rate = base_rate * Math.pow(gamma, iteration)`
 *
 * @example
 * let network = new Network(10, 1);
 *
 * network.train(dataset, { ratePolicy: new ExponentialRate(0.3) });
 */
class ExponentialRate extends Rate {
    private readonly gamma: number;

    /**
     * Constructs a step rate policy.
     *
     * @param baseRate the rate at first iteration
     * @param gamma=0.9 Learning rate retention per step; - _0 < `gamma` < 1_ - _large `gamma` CAN cause networks to never converge, low `gamma` CAN cause networks to converge too quickly_
     */
    constructor(baseRate: number, gamma: number = 0.999) {
        super(baseRate);
        this.gamma = gamma;
    }

    /**
     * Calculates the current training rate.
     *
     * @param iteration count
     * @returns the current training rate
     */
    public calc(iteration: number): number {
        return this.baseRate * Math.pow(this.gamma, iteration);
    }
}

/**
 * Inverse Exponential Learning Rate
 *
 * The learning rate will exponentially decrease.
 *
 * The rate at `iteration` is calculated as: `rate = baseRate * Math.pow(1 + gamma * iteration, -power)`
 *
 * @example
 * let network = new Network(10, 1);
 *
 * network.train(dataset, { ratePolicy: new InverseRate(0.3) });
 */
class InverseRate extends Rate {
    private readonly gamma: number;
    private readonly power: number;

    /**
     * Constructs a step rate policy.
     *
     * @param baseRate the rate at first iteration
     * @param [gamma=0.001] Learning rate decay per iteration; - _0 < `gamma` < 1_ - _large `gamma` CAN cause networks to converge too quickly and stop learning, low `gamma` CAN cause networks to converge to learn VERY slowly_
     * @param power=2 Decay rate per iteration - _0 < `power`_ - _large `power` CAN cause networks to stop learning quickly, low `power` CAN cause networks to learn VERY slowly_
     */
    constructor(baseRate: number, gamma: number = 0.001, power: number = 2) {
        super(baseRate);
        this.gamma = gamma;
        this.power = power;
    }

    /**
     * Calculates the current training rate.
     *
     * @param iteration count
     * @returns the current training rate
     */
    public calc(iteration: number): number {
        return this.baseRate * Math.pow(1 + this.gamma * iteration, -this.power);
    }
}

export {
    Rate,
    FixedRate,
    StepRate,
    ExponentialRate,
    InverseRate
};
