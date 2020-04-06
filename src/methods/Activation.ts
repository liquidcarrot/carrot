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
import {ActivationType} from "../enums/ActivationType";

export abstract class Activation {
    public readonly type: ActivationType = ActivationType.NO_ACTIVATION;

    public static getActivation(activationType: ActivationType): Activation {
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
        }
        throw new ReferenceError(activationType + " is not the name of any available activations! These are all available activations: " + ALL_ACTIVATIONS);
    }

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
export class LogisticActivation implements Activation {
    public readonly type: ActivationType = ActivationType.LogisticActivation;

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
export class TanhActivation implements Activation {
    public readonly type: ActivationType = ActivationType.TanhActivation;

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
export class IdentityActivation implements Activation {
    public readonly type: ActivationType = ActivationType.IdentityActivation;

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
export class StepActivation implements Activation {
    public readonly type: ActivationType = ActivationType.StepActivation;

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
export class RELUActivation implements Activation {
    public readonly type: ActivationType = ActivationType.RELUActivation;

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
export class SoftSignActivation implements Activation {
    public readonly type: ActivationType = ActivationType.SoftSignActivation;

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
export class SinusoidActivation implements Activation {
    public readonly type: ActivationType = ActivationType.SinusoidActivation;

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
export class GaussianActivation implements Activation {
    public readonly type: ActivationType = ActivationType.GaussianActivation;

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
export class BentIdentityActivation implements Activation {
    public readonly type: ActivationType = ActivationType.BentIdentityActivation;

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
export class BipolarActivation implements Activation {
    public readonly type: ActivationType = ActivationType.BipolarActivation;

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
export class BipolarSigmoidActivation implements Activation {
    public readonly type: ActivationType = ActivationType.BipolarSigmoidActivation;

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
export class HardTanhActivation implements Activation {
    public readonly type: ActivationType = ActivationType.HardTanhActivation;

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
export class AbsoluteActivation implements Activation {
    public readonly type: ActivationType = ActivationType.AbsoluteActivation;

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
export class InverseActivation implements Activation {
    public readonly type: ActivationType = ActivationType.InverseActivation;

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
export class SELUActivation implements Activation {
    public readonly type: ActivationType = ActivationType.SELUActivation;

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

export const ALL_ACTIVATIONS: ActivationType[] = [
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
    ActivationType.SELUActivation
];
