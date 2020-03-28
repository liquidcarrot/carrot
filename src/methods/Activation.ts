export abstract class Activation {
    public static getActivation(name: string): Activation {
        switch (name) {
            case "LOGISTIC":
                return new LogisticActivation();
            case "TANH":
                return new TanhActivation();
            case "IDENTITY":
                return new IdentityActivation();
            case "STEP":
                return new STEPActivation();
            case "RELU":
                return new RELUActivation();
            case "SOFTSIGN":
                return new SoftsignActivation();
            case "SINUSOID":
                return new LogisticActivation();
            case "GAUSSIAN":
                return new GaussianActivation();
            case "BENT_IDENTITY":
                return new BentIdentityActivation();
            case "BIPOLAR":
                return new BipolarActivation();
            case "BIPOLAR_SIGMOID":
                return new BipolarSigmoidActivation();
            case "HARD_TANH":
                return new HardTanhActivation();
            case "ABSOLUTE":
                return new AbsoluteActivation();
            case "INVERSE":
                return new InverseActivation();
            case "SELU":
                return new SELUActivation();
        }
        throw new ReferenceError(name + " is not the name of any available activations! These are all available activations: " + ALL_ACTIVATIONS);
    }

    public abstract calc(x: number, derivate: boolean): number;
}

export class LogisticActivation implements Activation {
    public calc(x: number, derivate: boolean = false): number {
        if (!derivate) {
            return 1 / (1 + Math.exp(-x));
        } else {
            return this.calc(x, false) * (1 - this.calc(x, false));
        }
    }
}

export class TanhActivation implements Activation {
    public calc(x: number, derivate: boolean = false): number {
        if (!derivate) {
            return Math.tanh(x);
        } else {
            return 1 - this.calc(x, false) * this.calc(x, false);
        }
    }
}

export class IdentityActivation implements Activation {
    public calc(x: number, derivate: boolean = false): number {
        if (!derivate) {
            return x;
        } else {
            return 1;
        }
    }
}

export class STEPActivation implements Activation {
    public calc(x: number, derivate: boolean = false): number {
        if (!derivate) {
            return x < 0 ? 0 : 1;
        } else {
            return 0;
        }
    }
}

export class RELUActivation implements Activation {
    public calc(x: number, derivate: boolean = false): number {
        if (!derivate) {
            return x <= 0 ? 0 : x;
        } else {
            return x <= 0 ? 0 : 1;
        }
    }
}

export class SoftsignActivation implements Activation {
    public calc(x: number, derivate: boolean = false): number {
        if (!derivate) {
            return x / (1 + Math.abs(x));
        } else {
            return x / ((1 + Math.abs(x)) * (1 + Math.abs(x)));
        }
    }
}

export class SinusoidActivation implements Activation {
    public calc(x: number, derivate: boolean = false): number {
        if (!derivate) {
            return Math.sin(x);
        } else {
            return Math.cos(x);
        }
    }
}

export class GaussianActivation implements Activation {
    public calc(x: number, derivate: boolean = false): number {
        if (!derivate) {
            return Math.exp(-x * x);
        } else {
            return -2 * x * this.calc(x, false);
        }
    }
}

export class BentIdentityActivation implements Activation {
    public calc(x: number, derivate: boolean = false): number {
        if (!derivate) {
            return (Math.sqrt(x * x + 1) - 1) / 2 + x;
        } else {
            return x / (2 * Math.sqrt(x * x + 1)) + 1;
        }
    }
}

export class BipolarActivation implements Activation {
    public calc(x: number, derivate: boolean = false): number {
        if (!derivate) {
            return x > 0 ? 1 : -1;
        } else {
            return 0;
        }
    }
}

export class BipolarSigmoidActivation implements Activation {
    public calc(x: number, derivate: boolean = false): number {
        if (!derivate) {
            return 2 / (1 + Math.exp(-x)) - 1;
        } else {
            return (2 * Math.exp(-x)) / ((1 + Math.exp(-x)) * (1 + Math.exp(-x)));
        }
    }
}

export class HardTanhActivation implements Activation {
    public calc(x: number, derivate: boolean = false): number {
        if (!derivate) {
            return Math.max(-1, Math.min(1, x));
        } else {
            return Math.abs(x) < 1 ? 1 : 0;
        }
    }
}

export class AbsoluteActivation implements Activation {
    public calc(x: number, derivate: boolean = false): number {
        if (!derivate) {
            return Math.abs(x);
        } else {
            return x < 0 ? -1 : 1;
        }
    }
}

export class InverseActivation implements Activation {
    public calc(x: number, derivate: boolean = false): number {
        if (!derivate) {
            return 1 - x;
        } else {
            return -1;
        }
    }
}

export class SELUActivation implements Activation {
    public calc(x: number, derivate: boolean = false): number {
        const alpha = 1.6732632423543772848170429916717;
        const scale = 1.0507009873554804934193349852946;

        if (!derivate) {
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

export const ALL_ACTIVATIONS: Activation[] = [
    new LogisticActivation(),
    new TanhActivation(),
    new IdentityActivation(),
    new STEPActivation(),
    new RELUActivation(),
    new SoftsignActivation(),
    new SinusoidActivation(),
    new GaussianActivation(),
    new BentIdentityActivation(),
    new BipolarActivation(),
    new BipolarSigmoidActivation(),
    new HardTanhActivation(),
    new AbsoluteActivation(),
    new InverseActivation(),
    new SELUActivation()
];
