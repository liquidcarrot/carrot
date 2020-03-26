import {Activation, ALL_ACTIVATIONS} from "./Activation";

export abstract class Mutation {

}

export class ADD_NODE extends Mutation {
    private randomActivation: Boolean;

    constructor(randomActivation: Boolean = true) {
        super();
        this.randomActivation = randomActivation;
    }
}

export class SUB_NODE extends Mutation {
    private keepGates: Boolean;

    constructor(keepGates: Boolean = true) {
        super();
        this.keepGates = keepGates;
    }
}

export class ADD_CONN extends Mutation {
}

export class SUB_CONN extends Mutation {
}

export class MOD_WEIGHT extends Mutation {
    private min: number;
    private max: number;

    constructor(min: number = -1, max: number = 1) {
        super();
        this.min = min;
        this.max = max;
    }
}

export class MOD_BIAS extends Mutation {
    private min: number;
    private max: number;

    constructor(min: number = -1, max: number = 1) {
        super();
        this.min = min;
        this.max = max;
    }
}

export class MOD_ACTIVATION extends Mutation {
    private allowed: Activation[];
    private mutateOutput: Boolean;

    constructor(allowed: Activation[] = ALL_ACTIVATIONS, mutateOutput: Boolean = false) {
        super();
        this.allowed = allowed;
        this.mutateOutput = mutateOutput;
    }
}

export class ADD_SELF_CONN extends Mutation {
}

export class SUB_SELF_CONN extends Mutation {
}

export class ADD_GATE extends Mutation {
}

export class SUB_GATE extends Mutation {
}

export class ADD_BACK_CONN extends Mutation {
}

export class SUB_BACK_CONN extends Mutation {
}

export class SWAP_NODES extends Mutation {
    private mutateOutput: Boolean;

    constructor(mutateOutput: Boolean = false) {
        super();
        this.mutateOutput = mutateOutput;
    }
}

export const ALL_MUTATIONS: Mutation[] = [
    new ADD_NODE(),
    new SUB_NODE(),
    new ADD_CONN(),
    new SUB_CONN(),
    new MOD_WEIGHT(),
    new MOD_BIAS(),
    new MOD_ACTIVATION(),
    new ADD_GATE(),
    new SUB_GATE(),
    new ADD_SELF_CONN(),
    new SUB_SELF_CONN(),
    new ADD_BACK_CONN(),
    new SUB_BACK_CONN(),
    new SWAP_NODES(),
];

export const FFW: Mutation[] = [
    new ADD_NODE(),
    new SUB_NODE(),
    new ADD_CONN(),
    new SUB_CONN(),
    new MOD_WEIGHT(),
    new MOD_BIAS(),
    new MOD_ACTIVATION(),
    new SWAP_NODES(),
];
