import {ActivationType} from "../enums/ActivationType";

/**
 * Activation functions
 *
 * Activation functions determine what activation value neurons should get. Depending on your network's environment, choosing a suitable activation function can have a positive impact on the learning ability of the network.
 *
 * @see [Activation Function on Wikipedia](https://en.wikipedia.org/wiki/Activation_function)
 * @see [Beginners Guide to Activation Functions](https://towardsdatascience.com/secret-sauce-behind-the-beauty-of-deep-learning-beginners-guide-to-activation-functions-a8e23a57d046)
 * @see [Understanding activation functions in neural networks](https://medium.com/the-theory-of-everything/understanding-activation-functions-in-neural-networks-9491262884e0)
 * @see [List of activation functions in neural networks with pros/cons](https://stats.stackexchange.com/questions/115258/comprehensive-list-of-activation-functions-in-neural-networks-with-pros-cons)
 *
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new LogisticActivation();
 */
abstract class Activation {
    /**
     * The type of activation.
     */
    public readonly type: ActivationType = ActivationType.NO_ACTIVATION;

    /**
     * Converts a ActivationType to Activation, by creating a new object.
     * @param activationType the activation type to create a new object for
     */
    public static getActivation(activationType: ActivationType): Activation {
        /**
         * The type of activation.
         */
        switch (activationType) {
            case ActivationType.LogisticActivation:
                return new LogisticActivation();
            case ActivationType.TanhActivation:
                return new TanhActivation();
            case ActivationType.IdentityActivation:
                return new IdentityActivation();
            case ActivationType.StepActivation:
                return new StepActivation();
            case ActivationType.RELUActivation:
                return new RELUActivation();
            case ActivationType.SoftSignActivation:
                return new SoftSignActivation();
            case ActivationType.SinusoidActivation:
                return new LogisticActivation();
            case ActivationType.GaussianActivation:
                return new GaussianActivation();
            case ActivationType.BentIdentityActivation:
                return new BentIdentityActivation();
            case ActivationType.BipolarActivation:
                return new BipolarActivation();
            case ActivationType.BipolarSigmoidActivation:
                return new BipolarSigmoidActivation();
            case ActivationType.HardTanhActivation:
                return new HardTanhActivation();
            case ActivationType.AbsoluteActivation:
                return new AbsoluteActivation();
            case ActivationType.InverseActivation:
                return new InverseActivation();
            case ActivationType.SELUActivation:
                return new SELUActivation();
            case ActivationType.MISHActivation:
                return new MISHActivation();
        }
        throw new ReferenceError(activationType + " is not the name of any available activations! These are all available activations: " + ALL_ACTIVATIONS);
    }

    /**
     * Calculates the activation value.
     *
     * @param x the input value
     * @param derivative Use derivative function?
     *
     * @returns the squashed input value
     */
    public abstract calc(x: number, derivative: boolean): number;
}

/**
 * [Logistic function.](https://en.wikipedia.org/wiki/Logistic_function)
 *
 * @param x Input value(s) to activation function
 * @param derivative Flag to select derivative function
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new LogisticActivation();
 */
class LogisticActivation implements Activation {
    /**
     * The type of activation.
     */
    public readonly type: ActivationType = ActivationType.LogisticActivation;

    /**
     * Calculates the activation value.
     *
     * @param x the input value
     * @param derivative Use derivative function?
     *
     * @returns the squashed input value
     */
    public calc(x: number, derivative: boolean = false): number {
        if (!derivative) {
            return 1 / (1 + Math.exp(-x));
        } else {
            return this.calc(x, false) * (1 - this.calc(x, false));
        }
    }
}

/**
 * [TanH function.](https://en.wikipedia.org/wiki/Hyperbolic_function#Hyperbolic_tangent)
 *
 * @param x Input value to activation function
 * @param derivative Flag to select derivative function
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new TanhActivation();
 */
class TanhActivation implements Activation {
    /**
     * The type of activation.
     */
    public readonly type: ActivationType = ActivationType.TanhActivation;

    /**
     * Calculates the activation value.
     *
     * @param x the input value
     * @param derivative Use derivative function?
     *
     * @returns the squashed input value
     */
    public calc(x: number, derivative: boolean = false): number {
        if (!derivative) {
            return Math.tanh(x);
        } else {
            return 1 - this.calc(x, false) * this.calc(x, false);
        }
    }
}

/**
 * [Identity function.](https://en.wikipedia.org/wiki/Identity_function)
 *
 * Returns input as output, used for [memory neurons](Layer#.Memory).
 *
 * @param x Input values to activation function
 * @param derivative Flag to select derivative function
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new IdentityActivation();
 */
class IdentityActivation implements Activation {
    /**
     * The type of activation.
     */
    public readonly type: ActivationType = ActivationType.IdentityActivation;

    /**
     * Calculates the activation value.
     *
     * @param x the input value
     * @param derivative Use derivative function?
     *
     * @returns the squashed input value
     */
    public calc(x: number, derivative: boolean = false): number {
        if (!derivative) {
            return x;
        } else {
            return 1;
        }
    }
}

/**
 * [Step function.](https://en.wikipedia.org/wiki/Heaviside_step_function)
 *
 * @param x Input values to activation function
 * @param derivative Flag to select derivative function
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new StepActivation();
 */
class StepActivation implements Activation {
    /**
     * The type of activation.
     */
    public readonly type: ActivationType = ActivationType.StepActivation;

    /**
     * Calculates the activation value.
     *
     * @param x the input value
     * @param derivative Use derivative function?
     *
     * @returns the squashed input value
     */
    public calc(x: number, derivative: boolean = false): number {
        if (!derivative) {
            return x < 0 ? 0 : 1;
        } else {
            return 0;
        }
    }
}

/**
 * [ReLU function.]{@link https://en.wikipedia.org/wiki/Rectifier_(neural_networks)}
 *
 * @param x Input values to activation function
 * @param derivative Flag to select derivative function
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new RELUActivation();
 */
class RELUActivation implements Activation {
    /**
     * The type of activation.
     */
    public readonly type: ActivationType = ActivationType.RELUActivation;

    /**
     * Calculates the activation value.
     *
     * @param x the input value
     * @param derivative Use derivative function?
     *
     * @returns the squashed input value
     */
    public calc(x: number, derivative: boolean = false): number {
        if (!derivative) {
            return x <= 0 ? 0 : x;
        } else {
            return x <= 0 ? 0 : 1;
        }
    }
}

/**
 * [SoftSign function.](https://en.wikipedia.org/wiki/Activation_function#Comparison_of_activation_functions)
 *
 * @param x Input values to activation function
 * @param derivative Flag to select derivative function
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new SoftSignActivation;
 */
class SoftSignActivation implements Activation {
    /**
     * The type of activation.
     */
    public readonly type: ActivationType = ActivationType.SoftSignActivation;

    /**
     * Calculates the activation value.
     *
     * @param x the input value
     * @param derivative Use derivative function?
     *
     * @returns the squashed input value
     */
    public calc(x: number, derivative: boolean = false): number {
        if (!derivative) {
            return x / (1 + Math.abs(x));
        } else {
            return x / ((1 + Math.abs(x)) * (1 + Math.abs(x)));
        }
    }
}

/**
 * [Sinusoid function.](https://en.wikipedia.org/wiki/Sine_wave)
 *
 * @param x Input values to activation function
 * @param derivative Flag to select derivative function
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new SinusoidActivation();
 */
class SinusoidActivation implements Activation {
    /**
     * The type of activation.
     */
    public readonly type: ActivationType = ActivationType.SinusoidActivation;

    /**
     * Calculates the activation value.
     *
     * @param x the input value
     * @param derivative Use derivative function?
     *
     * @returns the squashed input value
     */
    public calc(x: number, derivative: boolean = false): number {
        if (!derivative) {
            return Math.sin(x);
        } else {
            return Math.cos(x);
        }
    }
}

/**
 * [Guassian function.](https://en.wikipedia.org/wiki/Gaussian_function)
 *
 * @param x Input values to activation function
 * @param derivative Flag to select derivative function
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new GaussianActivation();
 */
class GaussianActivation implements Activation {
    /**
     * The type of activation.
     */
    public readonly type: ActivationType = ActivationType.GaussianActivation;

    /**
     * Calculates the activation value.
     *
     * @param x the input value
     * @param derivative Use derivative function?
     *
     * @returns the squashed input value
     */
    public calc(x: number, derivative: boolean = false): number {
        if (!derivative) {
            return Math.exp(-x * x);
        } else {
            return -2 * x * this.calc(x, false);
        }
    }
}

/**
 * [Bent identity function.](https://en.wikipedia.org/wiki/Activation_function#Comparison_of_activation_functions)
 *
 * @param x Input values to activation function
 * @param derivative Flag to select derivative function
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new BentIdentityActivation();
 */
class BentIdentityActivation implements Activation {
    /**
     * The type of activation.
     */
    public readonly type: ActivationType = ActivationType.BentIdentityActivation;

    /**
     * Calculates the activation value.
     *
     * @param x the input value
     * @param derivative Use derivative function?
     *
     * @returns the squashed input value
     */
    public calc(x: number, derivative: boolean = false): number {
        if (!derivative) {
            return (Math.sqrt(x * x + 1) - 1) / 2 + x;
        } else {
            return x / (2 * Math.sqrt(x * x + 1)) + 1;
        }
    }
}

/**
 * [Bipolar function](https://wagenaartje.github.io/neataptic/docs/methods/activation/), if x > 0 then returns 1, otherwise returns -1
 *
 * @param x Input value to activation function
 * @param derivative Flag to select derivative function
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new BipolarActivation();
 */
class BipolarActivation implements Activation {
    /**
     * The type of activation.
     */
    public readonly type: ActivationType = ActivationType.BipolarActivation;

    /**
     * Calculates the activation value.
     *
     * @param x the input value
     * @param derivative Use derivative function?
     *
     * @returns the squashed input value
     */
    public calc(x: number, derivative: boolean = false): number {
        if (!derivative) {
            return x > 0 ? 1 : -1;
        } else {
            return 0;
        }
    }
}

/**
 * [Bipolar sigmoid function.](https://wagenaartje.github.io/neataptic/docs/methods/activation/)
 *
 * @param  x Input values to activation function
 * @param derivative Flag to select derivative function
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new BipolarSigmoidActivation();
 */
class BipolarSigmoidActivation implements Activation {
    /**
     * The type of activation.
     */
    public readonly type: ActivationType = ActivationType.BipolarSigmoidActivation;

    /**
     * Calculates the activation value.
     *
     * @param x the input value
     * @param derivative Use derivative function?
     *
     * @returns the squashed input value
     */
    public calc(x: number, derivative: boolean = false): number {
        if (!derivative) {
            return 2 / (1 + Math.exp(-x)) - 1;
        } else {
            return (2 * Math.exp(-x)) / ((1 + Math.exp(-x)) * (1 + Math.exp(-x)));
        }
    }
}

/**
 * [Hard tanh function.](https://wagenaartje.github.io/neataptic/docs/methods/activation/)
 *
 * @param x Input values to activation function
 * @param derivative Flag to select derivative function
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new HardTanhActivation();
 */
class HardTanhActivation implements Activation {
    /**
     * The type of activation.
     */
    public readonly type: ActivationType = ActivationType.HardTanhActivation;

    /**
     * Calculates the activation value.
     *
     * @param x the input value
     * @param derivative Use derivative function?
     *
     * @returns the squashed input value
     */
    public calc(x: number, derivative: boolean = false): number {
        if (!derivative) {
            return Math.max(-1, Math.min(1, x));
        } else {
            return Math.abs(x) < 1 ? 1 : 0;
        }
    }
}

/**
 * [Absolute function.](https://wagenaartje.github.io/neataptic/docs/methods/activation/)
 *
 * Avoid using this activation function on a node with a selfconnection
 *
 * @param x Input values to activation function
 * @param derivative Flag to select derivative function
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new AbsoluteActivation();
 */
class AbsoluteActivation implements Activation {
    /**
     * The type of activation.
     */
    public readonly type: ActivationType = ActivationType.AbsoluteActivation;

    /**
     * Calculates the activation value.
     *
     * @param x the input value
     * @param derivative Use derivative function?
     *
     * @returns the squashed input value
     */
    public calc(x: number, derivative: boolean = false): number {
        if (!derivative) {
            return Math.abs(x);
        } else {
            return x < 0 ? -1 : 1;
        }
    }
}

/**
 * [Inverse function.](https://wagenaartje.github.io/neataptic/docs/methods/activation/)
 *
 * @param x Input values to activation function
 * @param derivative Flag to select derivative function
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new InverseActivation();
 */
class InverseActivation implements Activation {
    /**
     * The type of activation.
     */
    public readonly type: ActivationType = ActivationType.InverseActivation;

    /**
     * Calculates the activation value.
     *
     * @param x the input value
     * @param derivative Use derivative function?
     *
     * @returns the squashed input value
     */
    public calc(x: number, derivative: boolean = false): number {
        if (!derivative) {
            return 1 - x;
        } else {
            return -1;
        }
    }
}

/**
 * [Scaled exponential linear unit.](https://towardsdatascience.com/selu-make-fnns-great-again-snn-8d61526802a9)
 *
 * Exponential linear units try to make the mean activations closer to zero which speeds up learning. It has been shown that ELUs can obtain higher classification accuracy than ReLUs. α is a hyper-parameter here and to be tuned and the constraint is α ≥ 0(zero).
 *
 * @see {@link https://arxiv.org/pdf/1706.02515.pdf|Self-Normalizing Neural Networks}
 *
 * @param x Input value to activation function
 * @param derivative Flag to select derivative function
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new SELUActivation();
 */
class SELUActivation implements Activation {
    /**
     * The type of activation.
     */
    public readonly type: ActivationType = ActivationType.SELUActivation;

    /**
     * Calculates the activation value.
     *
     * @param x the input value
     * @param derivative Use derivative function?
     *
     * @returns the squashed input value
     */
    public calc(x: number, derivative: boolean = false): number {
        const alpha: number = 1.6732632423543772848170429916717; // this is bad
        const scale: number = 1.0507009873554804934193349852946; // this is bad

        if (!derivative) {
            if (x > 0) {
                return x * scale;
            } else {
                return alpha * Math.exp(x) - alpha * scale;
            }
        } else {
            if (x > 0) {
                return scale;
            } else {
                return alpha * Math.exp(x) * scale;
            }
        }
    }
}

/**
 * MISH: Self Regularized Non-Monotonic Activation Function
 *
 * @see {@link https://github.com/digantamisra98/Mish Neural Networks}
 *
 * @param x Input value to activation function
 * @param derivative Flag to select derivative function
 *
 * @example
 * let { methods, Node } = require("@liquid-carrot/carrot");
 *
 * // Changing a neuron's activation function
 * let A = new Node();
 * A.squash = new MISHActivation();
 */
class MISHActivation implements Activation {
    /**
     * The type of activation.
     */
    public readonly type: ActivationType = ActivationType.MISHActivation;

    /**
     * Calculates the activation value.
     *
     * @param x the input value
     * @param derivative Use derivative function?
     *
     * @returns the squashed input value
     */
    public calc(x: number, derivative: boolean = false): number {
        const ex: number = Math.exp(x);

        if (derivative) {
            const w: number = ex * ex * ex + 4 * (ex * ex + x * ex + x + 1) + 6 * ex;
            const d: number = 2 * ex + ex * ex + 2;
            return ex * w / (d * d);
        } else {
            return x * Math.tanh(Math.log(1 + ex));
        }
    }
}

const ALL_ACTIVATIONS: ActivationType[] = [
    ActivationType.LogisticActivation,
    ActivationType.TanhActivation,
    ActivationType.IdentityActivation,
    ActivationType.StepActivation,
    ActivationType.RELUActivation,
    ActivationType.SoftSignActivation,
    ActivationType.SinusoidActivation,
    ActivationType.GaussianActivation,
    ActivationType.BentIdentityActivation,
    ActivationType.BipolarActivation,
    ActivationType.BipolarSigmoidActivation,
    ActivationType.HardTanhActivation,
    ActivationType.AbsoluteActivation,
    ActivationType.InverseActivation,
    ActivationType.SELUActivation,
    ActivationType.MISHActivation
];

export {
    ALL_ACTIVATIONS,
    Activation,
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
