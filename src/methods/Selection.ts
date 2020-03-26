export abstract class Selection {

}

export class FITNESS_PROPORTIONATE extends Selection {
}

export class POWER extends Selection {
    private power: number;

    constructor(power: number = 4) {
        super();
        this.power = power;
    }
}

export class TOURNAMENT extends Selection {
    private size: number;
    private probability: number;

    constructor(size: number = 5, probability: number = 0.5) {
        super();
        this.size = size;
        this.probability = probability;
    }
}
