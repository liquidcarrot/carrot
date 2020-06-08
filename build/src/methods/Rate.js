"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.InverseRate = exports.ExponentialRate = exports.StepRate = exports.FixedRate = exports.Rate = void 0;
/**
 * Built-in learning rate policies, which allow for a dynamic learning rate during neural network training.
 *
 * @see [Learning rates and how-to improve performance](https://towardsdatascience.com/understanding-learning-rates-and-how-it-improves-performance-in-deep-learning-d0d4059c1c10)
 * @see [Learning rate policy](https://stackoverflow.com/questions/30033096/what-is-lr-policy-in-caffe/30045244)
 *
 */
var Rate = /** @class */ (function () {
    /**
     * Constructs a rate policy
     * @param baseRate the rate at first iteration
     */
    function Rate(baseRate) {
        this.baseRate = baseRate;
    }
    return Rate;
}());
exports.Rate = Rate;
/**
 * Fixed Learning Rate
 *
 * Default rate policy. Using this will make learning rate static (no change). Useful as a way to update a previous rate policy.
 */
var FixedRate = /** @class */ (function (_super) {
    __extends(FixedRate, _super);
    function FixedRate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Calculates the current training rate.
     *
     * @param iteration count
     * @time O(1)
     * @returns the current training rate
     */
    FixedRate.prototype.calc = function (iteration) {
        return this.baseRate;
    };
    return FixedRate;
}(Rate));
exports.FixedRate = FixedRate;
/**
 * Step Learning Rate
 *
 * The learning rate will decrease (i.e. 'step down') every `stepSize` iterations.
 */
var StepRate = /** @class */ (function (_super) {
    __extends(StepRate, _super);
    /**
     * Constructs a step rate policy.
     *
     * @param baseRate the rate at first iteration
     * @param gamma=0.9 Learning rate retention per step; - _0 < `gamma` < 1_ - _large `gamma` CAN cause networks to never converge, low `gamma` CAN cause networks to converge too quickly_
     * @param stepSize=100 Learning rate is updated every `step_size` iterations
     */
    function StepRate(baseRate, gamma, stepSize) {
        if (gamma === void 0) { gamma = 0.9; }
        if (stepSize === void 0) { stepSize = 100; }
        var _this = _super.call(this, baseRate) || this;
        _this.gamma = gamma;
        _this.stepSize = stepSize;
        return _this;
    }
    /**
     * Calculates the current training rate.
     *
     * @param iteration count
     * @time O(1)
     * @returns the current training rate
     */
    StepRate.prototype.calc = function (iteration) {
        return this.baseRate * Math.pow(this.gamma, Math.floor(iteration / this.stepSize));
    };
    return StepRate;
}(Rate));
exports.StepRate = StepRate;
/**
 * Exponential Learning Rate
 *
 * The learning rate will exponentially decrease.
 *
 * The rate at `iteration` is calculated as: `rate = base_rate * Math.pow(gamma, iteration)`
 */
var ExponentialRate = /** @class */ (function (_super) {
    __extends(ExponentialRate, _super);
    /**
     * Constructs a step rate policy.
     *
     * @param baseRate the rate at first iteration
     * @param gamma=0.9 Learning rate retention per step; - _0 < `gamma` < 1_ - _large `gamma` CAN cause networks to never converge, low `gamma` CAN cause networks to converge too quickly_
     */
    function ExponentialRate(baseRate, gamma) {
        if (gamma === void 0) { gamma = 0.999; }
        var _this = _super.call(this, baseRate) || this;
        _this.gamma = gamma;
        return _this;
    }
    /**
     * Calculates the current training rate.
     *
     * @param iteration count
     * @time O(1)
     * @returns the current training rate
     */
    ExponentialRate.prototype.calc = function (iteration) {
        return this.baseRate * Math.pow(this.gamma, iteration);
    };
    return ExponentialRate;
}(Rate));
exports.ExponentialRate = ExponentialRate;
/**
 * Inverse Exponential Learning Rate
 *
 * The learning rate will exponentially decrease.
 *
 * The rate at `iteration` is calculated as: `rate = baseRate * Math.pow(1 + gamma * iteration, -power)`
 */
var InverseRate = /** @class */ (function (_super) {
    __extends(InverseRate, _super);
    /**
     * Constructs a step rate policy.
     *
     * @param baseRate the rate at first iteration
     * @param gamma=0.001 Learning rate decay per iteration; - _0 < `gamma` < 1_ - _large `gamma` CAN cause networks to converge too quickly and stop learning, low `gamma` CAN cause networks to converge to learn VERY slowly_
     * @param power=2 Decay rate per iteration - _0 < `power`_ - _large `power` CAN cause networks to stop learning quickly, low `power` CAN cause networks to learn VERY slowly_
     */
    function InverseRate(baseRate, gamma, power) {
        if (gamma === void 0) { gamma = 0.001; }
        if (power === void 0) { power = 2; }
        var _this = _super.call(this, baseRate) || this;
        _this.gamma = gamma;
        _this.power = power;
        return _this;
    }
    /**
     * Calculates the current training rate.
     *
     * @param iteration count
     * @time O(1)
     * @returns the current training rate
     */
    InverseRate.prototype.calc = function (iteration) {
        return this.baseRate * Math.pow((1 + this.gamma * iteration), -this.power);
    };
    return InverseRate;
}(Rate));
exports.InverseRate = InverseRate;
