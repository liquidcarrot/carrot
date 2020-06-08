/**
 * Built-in learning rate policies, which allow for a dynamic learning rate during neural network training.
 *
 * @see [Learning rates and how-to improve performance](https://towardsdatascience.com/understanding-learning-rates-and-how-it-improves-performance-in-deep-learning-d0d4059c1c10)
 * @see [Learning rate policy](https://stackoverflow.com/questions/30033096/what-is-lr-policy-in-caffe/30045244)
 *
 */
abstract class Rate {
    /**
     * The rate at the first iteration.
     */
    protected readonly baseRate: number;

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
     * @time O(1)
     * @returns the current training rate
     */
    public abstract calc(iteration: number): number;
}

/**
 * Fixed Learning Rate
 *
 * Default rate policy. Using this will make learning rate static (no change). Useful as a way to update a previous rate policy.
 */
class FixedRate extends Rate {

    /**
     * Calculates the current training rate.
     *
     * @param iteration count
     * @time O(1)
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
 */
class StepRate extends Rate {
    /**
     * Learning rate retention per step; - _0 < `gamma` < 1_ - _large `gamma` CAN cause networks to never converge, low `gamma` CAN cause networks to converge too quickly_
     */
    private readonly gamma: number;
    /**
     * Learning rate is updated every `step_size` iterations
     */
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
     * @time O(1)
     * @returns the current training rate
     */
    public calc(iteration: number): number {
        return this.baseRate * this.gamma ** Math.floor(iteration / this.stepSize);
    }
}

/**
 * Exponential Learning Rate
 *
 * The learning rate will exponentially decrease.
 *
 * The rate at `iteration` is calculated as: `rate = base_rate * Math.pow(gamma, iteration)`
 */
class ExponentialRate extends Rate {
    /**
     * Learning rate retention per step; - _0 < `gamma` < 1_ - _large `gamma` CAN cause networks to never converge, low `gamma` CAN cause networks to converge too quickly_
     */
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
     * @time O(1)
     * @returns the current training rate
     */
    public calc(iteration: number): number {
        return this.baseRate * this.gamma ** iteration;
    }
}

/**
 * Inverse Exponential Learning Rate
 *
 * The learning rate will exponentially decrease.
 *
 * The rate at `iteration` is calculated as: `rate = baseRate * Math.pow(1 + gamma * iteration, -power)`
 */
class InverseRate extends Rate {
    /**
     * Learning rate decay per iteration; - _0 < `gamma` < 1_ - _large `gamma` CAN cause networks to converge too quickly and stop learning, low `gamma` CAN cause networks to converge to learn VERY slowly_
     */
    private readonly gamma: number;
    /**
     * Decay rate per iteration - _0 < `power`_ - _large `power` CAN cause networks to stop learning quickly, low `power` CAN cause networks to learn VERY slowly_
     */
    private readonly power: number;

    /**
     * Constructs a step rate policy.
     *
     * @param baseRate the rate at first iteration
     * @param gamma=0.001 Learning rate decay per iteration; - _0 < `gamma` < 1_ - _large `gamma` CAN cause networks to converge too quickly and stop learning, low `gamma` CAN cause networks to converge to learn VERY slowly_
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
     * @time O(1)
     * @returns the current training rate
     */
    public calc(iteration: number): number {
        return this.baseRate * (1 + this.gamma * iteration) ** -this.power;
    }
}

export {
    Rate,
    FixedRate,
    StepRate,
    ExponentialRate,
    InverseRate
};
