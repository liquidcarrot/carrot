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
            case ActivationType.SoftsignActivation:
                return new SoftsignActivation();
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

export class SoftsignActivation implements Activation {
    public readonly type: ActivationType = ActivationType.SoftsignActivation;

    public calc(x: number, derivative: boolean = false): number {
        if (!derivative) {
            return x / (1 + Math.abs(x));
        } else {
            return x / ((1 + Math.abs(x)) * (1 + Math.abs(x)));
        }
    }
}

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

export class SELUActivation implements Activation {
    public readonly type: ActivationType = ActivationType.SELUActivation;

    public calc(x: number, derivative: boolean = false): number {
        const alpha = 1.6732632423543772848170429916717;
        const scale = 1.0507009873554804934193349852946;

        if (!derivative) {
            if (x > 0) {
                return x * scale;
            } else {
                return alpha * Math.exp(x) - alpha * scale;
            }
        } else if (x > 0) {
            return scale;
        } else {
            return alpha * Math.exp(x) * scale;
        }
    }
}

export enum ActivationType {
    NO_ACTIVATION,
    LogisticActivation,
    TanhActivation,
    IdentityActivation,
    StepActivation,
    RELUActivation,
    SoftsignActivation,
    SinusoidActivation,
    GaussianActivation,
    BentIdentityActivation,
    BipolarActivation,
    BipolarSigmoidActivation,
    HardTanhActivation,
    AbsoluteActivation,
    InverseActivation,
    SELUActivation
}

export const ALL_ACTIVATIONS: ActivationType[] = [
    ActivationType.LogisticActivation,
    ActivationType.TanhActivation,
    ActivationType.IdentityActivation,
    ActivationType.StepActivation,
    ActivationType.RELUActivation,
    ActivationType.SoftsignActivation,
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
