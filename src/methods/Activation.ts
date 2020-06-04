export type activationType = (x: number, derivative: boolean) => number;

export const LogisticActivation: activationType = (x: number, derivative: boolean): number => {
    if (!derivative) {
        return 1 / (1 + Math.exp(-x));
    } else {
        return LogisticActivation(x, false) * (1 - LogisticActivation(x, false));
    }
};
export const TanhActivation: activationType = (x: number, derivative: boolean): number => {
    if (!derivative) {
        return Math.tanh(x);
    } else {
        return 1 - TanhActivation(x, false) ** 2;
    }
};
export const IdentityActivation: activationType = (x: number, derivative: boolean): number => {
    if (!derivative) {
        return x;
    } else {
        return 1;
    }
};
export const StepActivation: activationType = (x: number, derivative: boolean): number => {
    if (!derivative) {
        return x < 0 ? 0 : 1;
    } else {
        return 0;
    }
};
export const RELUActivation: activationType = (x: number, derivative: boolean): number => {
    if (!derivative) {
        return x > 0 ? x : 0;
    } else {
        return x <= 0 ? 0 : 1;
    }
};
export const SoftSignActivation: activationType = (x: number, derivative: boolean): number => {
    if (!derivative) {
        return x / (1 + Math.abs(x));
    } else {
        return x / ((1 + Math.abs(x)) * (1 + Math.abs(x)));
    }
};
export const SinusoidActivation: activationType = (x: number, derivative: boolean): number => {
    if (!derivative) {
        return Math.sin(x);
    } else {
        return Math.cos(x);
    }
};
export const GaussianActivation: activationType = (x: number, derivative: boolean): number => {
    if (!derivative) {
        return Math.exp(-x * x);
    } else {
        return -2 * x * GaussianActivation(x, false);
    }
};
export const BentIdentityActivation: activationType = (x: number, derivative: boolean): number => {
    if (!derivative) {
        return (Math.sqrt(x * x + 1) - 1) / 2 + x;
    } else {
        return x / (2 * Math.sqrt(x * x + 1)) + 1;
    }
};
export const BipolarActivation: activationType = (x: number, derivative: boolean): number => {
    if (!derivative) {
        return x > 0 ? 1 : -1;
    } else {
        return 0;
    }
};
export const BipolarSigmoidActivation: activationType = (x: number, derivative: boolean): number => {
    if (!derivative) {
        return 2 / (1 + Math.exp(-x)) - 1;
    } else {
        return (2 * Math.exp(-x)) / ((1 + Math.exp(-x)) * (1 + Math.exp(-x)));
    }
};
export const HardTanhActivation: activationType = (x: number, derivative: boolean): number => {
    if (!derivative) {
        return Math.max(-1, Math.min(1, x));
    } else {
        return Math.abs(x) < 1 ? 1 : 0;
    }
};
export const AbsoluteActivation: activationType = (x: number, derivative: boolean): number => {
    if (!derivative) {
        return Math.abs(x);
    } else {
        return x < 0 ? -1 : 1;
    }
};
export const InverseActivation: activationType = (x: number, derivative: boolean): number => {
    if (!derivative) {
        return 1 - x;
    } else {
        return -1;
    }
};
export const SELUActivation: activationType = (x: number, derivative: boolean): number => {
    const alpha: number = 1.6732632423543772848170429916717; // this is bad
    const scale: number = 1.0507009873554804934193349852946; // this is bad

    if (!derivative) {
        if (x > 0) {
            return x * scale;
        } else {
            return (alpha * Math.exp(x) - alpha) * scale;
        }
    } else {
        if (x > 0) {
            return scale;
        } else {
            return alpha * Math.exp(x) * scale;
        }
    }
};
export const MISHActivation: activationType = (x: number, derivative: boolean): number => {
    const ex: number = Math.exp(x);

    if (derivative) {
        const w: number = ex * ex * ex + 4 * (ex * ex + x * ex + x + 1) + 6 * ex;
        const d: number = 2 * ex + ex * ex + 2;
        return ex * w / (d * d);
    } else {
        return x * Math.tanh(Math.log(1 + ex));
    }
};


export const ALL_ACTIVATIONS: {
    /**
     * [SoftSign function.](https://en.wikipedia.org/wiki/Activation_function#Comparison_of_activation_functions)
     *
     * @param x Input values to activation function
     * @param derivative Flag to select derivative function
     */
    SoftSignActivation: activationType;
    /**
     * [Logistic function.](https://en.wikipedia.org/wiki/Logistic_function)
     *
     * @param x Input value(s) to activation function
     * @param derivative Flag to select derivative function
     */
    LogisticActivation: activationType;
    /**
     * [Sinusoid function.](https://en.wikipedia.org/wiki/Sine_wave)
     *
     * @param x Input values to activation function
     * @param derivative Flag to select derivative function
     */
    SinusoidActivation: activationType;
    /**
     * [Step function.](https://en.wikipedia.org/wiki/Heaviside_step_function)
     *
     * @param x Input values to activation function
     * @param derivative Flag to select derivative function
     */
    StepActivation: activationType;
    /**
     * [Identity function.](https://en.wikipedia.org/wiki/Identity_function)
     *
     * Returns input as output, used for [memory neurons](Layer#.Memory).
     *
     * @param x Input values to activation function
     * @param derivative Flag to select derivative function
     */
    IdentityActivation: activationType;
    /**
     * [Absolute function.](https://wagenaartje.github.io/neataptic/docs/methods/activation/)
     *
     * Avoid using this activation function on a node with a self connection
     *
     * @param x Input values to activation function
     * @param derivative Flag to select derivative function
     */
    AbsoluteActivation: activationType;
    /**
     * [Gaussian function.](https://en.wikipedia.org/wiki/Gaussian_function)
     *
     * @param x Input values to activation function
     * @param derivative Flag to select derivative function
     */
    GaussianActivation: activationType;
    /**
     * [Scaled exponential linear unit.](https://towardsdatascience.com/selu-make-fnns-great-again-snn-8d61526802a9)
     *
     * Exponential linear units try to make the mean activations closer to zero which speeds up learning. It has been shown that ELUs can obtain higher classification accuracy than ReLUs. α is a hyper-parameter here and to be tuned and the constraint is α ≥ 0(zero).
     *
     * @see {@link https://arxiv.org/pdf/1706.02515.pdf|Self-Normalizing Neural Networks}
     *
     * @param x Input value to activation function
     * @param derivative Flag to select derivative function
     */
    SELUActivation: activationType;
    /**
     * [ReLU function.]{@link https://en.wikipedia.org/wiki/Rectifier_(neural_networks)}
     *
     * @param x Input values to activation function
     * @param derivative Flag to select derivative function
     */
    RELUActivation: activationType;
    /**
     * [Bipolar sigmoid function.](https://wagenaartje.github.io/neataptic/docs/methods/activation/)
     *
     * @param  x Input values to activation function
     * @param derivative Flag to select derivative function
     */
    BipolarSigmoidActivation: activationType;
    /**
     * [Bent identity function.](https://en.wikipedia.org/wiki/Activation_function#Comparison_of_activation_functions)
     *
     * @param x Input values to activation function
     * @param derivative Flag to select derivative function
     */
    BentIdentityActivation: activationType;
    /**
     * [TanH function.](https://en.wikipedia.org/wiki/Hyperbolic_function#Hyperbolic_tangent)
     *
     * @param x Input value to activation function
     * @param derivative Flag to select derivative function
     */
    TanhActivation: activationType;
    /**
     * [Inverse function.](https://wagenaartje.github.io/neataptic/docs/methods/activation/)
     *
     * @param x Input values to activation function
     * @param derivative Flag to select derivative function
     */
    InverseActivation: activationType;
    /**
     * [Hard tanh function.](https://wagenaartje.github.io/neataptic/docs/methods/activation/)
     *
     * @param x Input values to activation function
     * @param derivative Flag to select derivative function
     */
    HardTanhActivation: activationType;
    /**
     * MISH: Self Regularized Non-Monotonic Activation Function
     *
     * @see {@link https://github.com/digantamisra98/Mish Neural Networks}
     *
     * @param x Input value to activation function
     * @param derivative Flag to select derivative function
     */
    MISHActivation: activationType;
    /**
     * [Bipolar function](https://wagenaartje.github.io/neataptic/docs/methods/activation/), if x > 0 then returns 1, otherwise returns -1
     *
     * @param x Input value to activation function
     * @param derivative Flag to select derivative function
     */
    BipolarActivation: activationType;
} = {
    LogisticActivation,
    TanhActivation,
    IdentityActivation,
    StepActivation,
    RELUActivation,
    SoftSignActivation,
    SinusoidActivation,
    GaussianActivation,
    BentIdentityActivation,
    BipolarActivation,
    BipolarSigmoidActivation,
    HardTanhActivation,
    AbsoluteActivation,
    InverseActivation,
    SELUActivation,
    MISHActivation
};
