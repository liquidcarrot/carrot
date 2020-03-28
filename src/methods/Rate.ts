export abstract class Rate {
    protected baseRate: number;

    constructor(baseRate: number) {
        this.baseRate = baseRate;
    }

    public abstract calc(iteration: number): number;
}

export class FixedRate extends Rate {
    public calc(iteration: number): number {
        return this.baseRate;
    }
}

export class StepRate extends Rate {
    private readonly gamma: number;
    private readonly stepSize: number;

    constructor(baseRate: number, gamma: number = 0.9, stepSize: number = 100) {
        super(baseRate);
        this.gamma = gamma;
        this.stepSize = stepSize;
    }

    public calc(iteration: number): number {
        return this.baseRate * Math.pow(this.gamma, Math.floor(iteration / this.stepSize));
    }
}

export class ExponentialRate extends Rate {
    private readonly gamma: number;

    constructor(baseRate: number, gamma: number = 0.999) {
        super(baseRate);
        this.gamma = gamma;
    }

    public calc(iteration: number): number {
        return this.baseRate * Math.pow(this.gamma, iteration);
    }
}

export class InverseRate extends Rate {
    private readonly gamma: number;
    private readonly power: number;

    constructor(baseRate: number, gamma: number = 0.001, power: number = 2) {
        super(baseRate);
        this.gamma = gamma;
        this.power = power;
    }

    public calc(iteration: number): number {
        return this.baseRate * Math.pow(1 + this.gamma * iteration, -this.power);
    }
}
