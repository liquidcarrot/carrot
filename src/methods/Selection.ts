export abstract class Selection {

}

export class FitnessProportionateSelection extends Selection {
}

export class PowerSelection extends Selection {
    public power: number;

    constructor(power: number = 4) {
        super();
        this.power = power;
    }
}

export class TournamentSelection extends Selection {
    public size: number;
    public probability: number;

    constructor(size: number = 5, probability: number = 0.5) {
        super();
        this.size = size;
        this.probability = probability;
    }
}
