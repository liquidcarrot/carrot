export abstract class Activation {
    static getActivation(name: string): Activation {
        switch (name) {
            case "LOGISTIC":
                return new LOGISTIC();
            case "TANH":
                return new TANH();
            case "IDENTITY":
                return new IDENTITY();
            case "STEP":
                return new STEP();
            case "RELU":
                return new RELU();
            case "SOFTSIGN":
                return new SOFTSIGN();
            case "SINUSOID":
                return new LOGISTIC();
            case "GAUSSIAN":
                return new GAUSSIAN();
            case "BENT_IDENTITY":
                return new BENT_IDENTITY();
            case "BIPOLAR":
                return new BIPOLAR();
            case "BIPOLAR_SIGMOID":
                return new BIPOLAR_SIGMOID();
            case "HARD_TANH":
                return new HARD_TANH();
            case "ABSOLUTE":
                return new ABSOLUTE();
            case "INVERSE":
                return new INVERSE();
            case "SELU":
                return new SELU();
        }
        throw new ReferenceError(name + " is not the name of any available activations! These are all available activations: " + ALL_ACTIVATIONS);
    }

    abstract calc(x: number, derivate: boolean): number;
}

export class LOGISTIC implements Activation {
    calc(x: number, derivate: boolean = false): number {
        if (!derivate) {
            return 1 / (1 + Math.exp(-x));
        } else {
            return this.calc(x, false) * (1 - this.calc(x, false));
        }
    }
}

export class TANH implements Activation {
    calc(x: number, derivate: boolean = false): number {
        if (!derivate) {
            return Math.tanh(x);
        } else {
            return 1 - this.calc(x, false) * this.calc(x, false);
        }
    }
}

export class IDENTITY implements Activation {
    calc(x: number, derivate: boolean = false): number {
        if (!derivate) {
            return x;
        } else {
            return 1;
        }
    }
}

export class STEP implements Activation {
    calc(x: number, derivate: boolean = false): number {
        if (!derivate) {
            return x < 0 ? 0 : 1;
        } else {
            return 0;
        }
    }
}

export class RELU implements Activation {
    calc(x: number, derivate: boolean = false): number {
        if (!derivate) {
            return x <= 0 ? 0 : x;
        } else {
            return x <= 0 ? 0 : 1;
        }
    }
}

export class SOFTSIGN implements Activation {
    calc(x: number, derivate: boolean = false): number {
        if (!derivate) {
            return x / (1 + Math.abs(x));
        } else {
            return x / ((1 + Math.abs(x)) * (1 + Math.abs(x)));
        }
    }
}

export class SINUSOID implements Activation {
    calc(x: number, derivate: boolean = false): number {
        if (!derivate) {
            return Math.sin(x);
        } else {
            return Math.cos(x);
        }
    }
}

export class GAUSSIAN implements Activation {
    calc(x: number, derivate: boolean = false): number {
        if (!derivate) {
            return Math.exp(-x * x);
        } else {
            return -2 * x * this.calc(x, false);
        }
    }
}

export class BENT_IDENTITY implements Activation {
    calc(x: number, derivate: boolean = false): number {
        if (!derivate) {
            return (Math.sqrt(x * x + 1) - 1) / 2 + x;
        } else {
            return x / (2 * Math.sqrt(x * x + 1)) + 1;
        }
    }
}

export class BIPOLAR implements Activation {
    calc(x: number, derivate: boolean = false): number {
        if (!derivate) {
            return x > 0 ? 1 : -1;
        } else {
            return 0;
        }
    }
}

export class BIPOLAR_SIGMOID implements Activation {
    calc(x: number, derivate: boolean = false): number {
        if (!derivate) {
            return 2 / (1 + Math.exp(-x)) - 1;
        } else {
            return (2 * Math.exp(-x)) / ((1 + Math.exp(-x)) * (1 + Math.exp(-x)));
        }
    }
}

export class HARD_TANH implements Activation {
    calc(x: number, derivate: boolean = false): number {
        if (!derivate) {
            return Math.max(-1, Math.min(1, x));
        } else {
            return Math.abs(x) < 1 ? 1 : 0;
        }
    }
}

export class ABSOLUTE implements Activation {
    calc(x: number, derivate: boolean = false): number {
        if (!derivate) {
            return Math.abs(x);
        } else {
            return x < 0 ? -1 : 1;
        }
    }
}

export class INVERSE implements Activation {
    calc(x: number, derivate: boolean = false): number {
        if (!derivate) {
            return 1 - x;
        } else {
            return -1;
        }
    }
}

export class SELU implements Activation {
    calc(x: number, derivate: boolean = false): number {
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
    new LOGISTIC(),
    new TANH(),
    new IDENTITY(),
    new STEP(),
    new RELU(),
    new SOFTSIGN(),
    new SINUSOID(),
    new GAUSSIAN(),
    new BENT_IDENTITY(),
    new BIPOLAR(),
    new BIPOLAR_SIGMOID(),
    new HARD_TANH(),
    new ABSOLUTE(),
    new INVERSE(),
    new SELU()
];
