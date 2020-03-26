export abstract class Rate {
    protected baseRate: number;

    protected constructor(baseRate: number) {
        this.baseRate = baseRate;
    }


    abstract calc(iteration: number): number;
}

export class FIXED extends Rate {
    calc(iteration: number): number {
        return this.baseRate;
    }
}

export class STEP extends Rate {
    private gamma: number;
    private stepSize: number;

    constructor(baseRate: number, gamma: number = 0.9, stepSize: number = 100) {
        super(baseRate);
        this.gamma = gamma;
        this.stepSize = stepSize;
    }

    calc(iteration: number): number {
        return this.baseRate * Math.pow(this.gamma, Math.floor(iteration / this.stepSize));
    }
}

export class EXP extends Rate {
    private gamma: number;

    constructor(baseRate: number, gamma: number = 0.999) {
        super(baseRate);
        this.gamma = gamma;
    }

    calc(iteration: number): number {
        return this.baseRate * Math.pow(this.gamma, iteration);
    }
}

export class INV extends Rate {
    private gamma: number;
    private power: number;

    constructor(baseRate: number, gamma: number = 0.001, power: number = 2) {
        super(baseRate);
        this.gamma = gamma;
        this.power = power;
    }

    calc(iteration: number): number {
        return this.baseRate * Math.pow(1 + this.gamma * iteration, -this.power);
    }
}
