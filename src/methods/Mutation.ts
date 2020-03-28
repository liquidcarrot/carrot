export abstract class Mutation {

}

export class AddNodeMutation extends Mutation {
    public randomActivation: boolean;

    constructor(randomActivation: boolean = true) {
        super();
        this.randomActivation = randomActivation;
    }
}

export class SubNodeMutation extends Mutation {
    public keepGates: boolean;

    constructor(keepGates: boolean = true) {
        super();
        this.keepGates = keepGates;
    }
}

export class AddConnectionMutation extends Mutation {
}

export class SubConnectionMutation extends Mutation {
}

export class ModWeightMutation extends Mutation {
    public min: number;
    public max: number;

    constructor(min: number = -1, max: number = 1) {
        super();
        this.min = min;
        this.max = max;
    }
}

export class ModBiasMutation extends Mutation {
    public min: number;
    public max: number;

    constructor(min: number = -1, max: number = 1) {
        super();
        this.min = min;
        this.max = max;
    }
}

export class ModActivationMutation extends Mutation {
    public mutateOutput: boolean;

    constructor(mutateOutput: boolean = false) {
        super();
        this.mutateOutput = mutateOutput;
    }
}

export class AddSelfConnectionMutation extends Mutation {
}

export class SubSelfConnectionMutation extends Mutation {
}

export class AddGateMutation extends Mutation {
}

export class SubGateMutation extends Mutation {
}

export class AddBackConnectionMutation extends Mutation {
}

export class SubBackConnectionMutation extends Mutation {
}

export class SwapNodesMutation extends Mutation {
    public mutateOutput: boolean;

    constructor(mutateOutput: boolean = false) {
        super();
        this.mutateOutput = mutateOutput;
    }
}

export const ALL_MUTATIONS: Mutation[] = [
    new AddNodeMutation(),
    new SubNodeMutation(),
    new AddConnectionMutation(),
    new SubConnectionMutation(),
    new ModWeightMutation(),
    new ModBiasMutation(),
    new ModActivationMutation(),
    new AddGateMutation(),
    new SubGateMutation(),
    new AddSelfConnectionMutation(),
    new SubSelfConnectionMutation(),
    new AddBackConnectionMutation(),
    new SubBackConnectionMutation(),
    new SwapNodesMutation(),
];

export const FEEDFORWARD_MUTATIONS: Mutation[] = [
    new AddNodeMutation(),
    new SubNodeMutation(),
    new AddConnectionMutation(),
    new SubConnectionMutation(),
    new ModWeightMutation(),
    new ModBiasMutation(),
    new ModActivationMutation(),
    new SwapNodesMutation(),
];
