import {Network} from "../architecture/Network";
import {Node, NodeType} from "../architecture/Node";
import {pickRandom, randBoolean, randDouble} from "./Utils";
import {Connection} from "../architecture/Connection";
import {Activation} from "./Activation";

export abstract class Mutation {
    public abstract mutate(genome: Network, max: number | undefined): void;
}

export class AddNodeMutation extends Mutation {
    public randomActivation: boolean;

    constructor(randomActivation: boolean = true) {
        super();
        this.randomActivation = randomActivation;
    }

    public mutate(genome: Network, maxNodes: number | undefined): void {
        if (maxNodes !== undefined && genome.nodes.length >= maxNodes) {
            return;
        }
        const node: Node = new Node(NodeType.HIDDEN);
        if (this.randomActivation) {
            node.mutateActivation();
        }
        const connection: Connection = pickRandom(genome.connections);
        const from: Node = connection.from;
        const to: Node = connection.to;
        genome.disconnect(from, to);

        const minBound: number = Math.max(genome.inputSize, 1 + genome.nodes.indexOf(from));

        genome.nodes.splice(minBound, 0, node);

        const newConnection1: Connection = genome.connect(from, node, 1);
        const newConnection2: Connection = genome.connect(node, to, connection.weight);

        if (connection.gateNode != null) {
            if (randBoolean()) {
                genome.addGate(connection.gateNode, newConnection1);
            } else {
                genome.addGate(connection.gateNode, newConnection2);
            }
        }
    }
}

export class SubNodeMutation extends Mutation {
    public keepGates: boolean;

    constructor(keepGates: boolean = true) {
        super();
        this.keepGates = keepGates;
    }

    public mutate(genome: Network): void {
        const possible: Node[] = genome.nodes.filter(node => node !== undefined && node.type === NodeType.HIDDEN);
        if (possible.length > 0) {
            const node: Node = pickRandom(possible);
            genome.removeNode(node);
        }
    }
}

export class AddConnectionMutation extends Mutation {
    public mutate(genome: Network, maxConnections: number | undefined): void {
        if (maxConnections !== undefined && maxConnections <= genome.connections.length) {
            return;
        }
        const possible: Node[][] = [];

        for (let i: number = 0; i < genome.nodes.length - genome.outputSize; i++) {
            const from: Node = genome.nodes[i];
            for (let j: number = Math.max(i + 1, genome.inputSize); j < genome.nodes.length; j++) {
                const to: Node = genome.nodes[j];
                if (!from.isProjectingTo(to)) {
                    possible.push([from, to]);
                }
            }
        }

        if (possible.length > 0) {
            const pair: Node[] = pickRandom(possible);
            genome.connect(pair[0], pair[1]);
        }
    }
}

export class SubConnectionMutation extends Mutation {
    public mutate(genome: Network): void {
        const possible: Connection[] = genome.connections.filter(conn => conn.from.outgoing.length > 1 && conn.to.incoming.length > 1 && genome.nodes.indexOf(conn.to) > genome.nodes.indexOf(conn.from));
        if (possible.length > 0) {
            const randomConnection: Connection = pickRandom(possible);
            genome.disconnect(randomConnection.from, randomConnection.to);
        }
    }
}

export class ModWeightMutation extends Mutation {
    public min: number;
    public max: number;

    constructor(min: number = -1, max: number = 1) {
        super();
        this.min = min;
        this.max = max;
    }

    public mutate(genome: Network): void {
        pickRandom(genome.connections).weight += randDouble(this.min, this.max);
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

    public mutate(genome: Network): void {
        pickRandom(genome.nodes.filter(node => node.type !== NodeType.INPUT))
            .mutateBias(this);
    }
}

export class ModActivationMutation extends Mutation {
    public mutateOutput: boolean;

    constructor(mutateOutput: boolean = false) {
        super();
        this.mutateOutput = mutateOutput;
    }

    public mutate(genome: Network, max: number | undefined): void {
        const possible: Node[] = this.mutateOutput
            ? genome.nodes.filter(node => node.type !== NodeType.INPUT)
            : genome.nodes.filter(node => node.type === NodeType.HIDDEN);
        if (possible.length > 0) {
            pickRandom(possible).mutateActivation();
        }
    }
}

export class AddSelfConnectionMutation extends Mutation {
    public mutate(genome: Network): void {
        const possible: Node[] = genome.nodes
            .filter(node => node.type !== NodeType.INPUT)
            .filter(node => node.selfConnection.weight === 0);
        if (possible) {
            const node: Node = pickRandom(possible);
            genome.connect(node, node);
        }
    }
}

export class SubSelfConnectionMutation extends Mutation {
    public mutate(genome: Network): void {
        const possible: Connection[] = genome.connections.filter(conn => conn.from === conn.to);
        if (possible.length > 0) {
            const randomConnection: Connection = pickRandom(possible);
            genome.disconnect(randomConnection.from, randomConnection.to);
        }
    }
}

export class AddGateMutation extends Mutation {
    public mutate(genome: Network, maxGates: number | undefined): void {
        if (maxGates !== undefined && maxGates <= genome.gates.length) {
            return;
        }

        const possible: Connection[] = genome.connections.filter(conn => conn.gateNode === null);
        if (possible.length > 0) {
            const node: Node = pickRandom(genome.nodes.filter(node => node.type !== NodeType.INPUT));
            const connection: Connection = pickRandom(possible);

            genome.addGate(node, connection);
        }
    }
}

export class SubGateMutation extends Mutation {
    public mutate(genome: Network): void {
        if (genome.gates.length > 0) {
            genome.removeGate(pickRandom(genome.gates));
        }
    }
}

export class AddBackConnectionMutation extends Mutation {
    public mutate(genome: Network): void {
        const possible: Node[][] = [];
        for (let i: number = genome.inputSize; i < genome.nodes.length; i++) {
            const from: Node = genome.nodes[i];
            for (let j: number = genome.inputSize; j < i; j++) {
                const to: Node = genome.nodes[j];
                if (!from.isProjectingTo(to)) {
                    possible.push([from, to]);
                }
            }
        }
        if (possible.length > 0) {
            const pair: Node[] = pickRandom(possible);
            genome.connect(pair[0], pair[1]);
        }
    }
}

export class SubBackConnectionMutation extends Mutation {
    public mutate(genome: Network): void {
        const possible: Connection[] = genome.connections
            .filter(conn => conn.from.outgoing.length > 1)
            .filter(conn => conn.to.incoming.length > 1)
            .filter(conn => genome.nodes.indexOf(conn.from) > genome.nodes.indexOf(conn.to));
        if (possible.length > 0) {
            const randomConnection: Connection = pickRandom(possible);
            genome.disconnect(randomConnection.from, randomConnection.to);
        }
    }
}

export class SwapNodesMutation extends Mutation {
    public mutateOutput: boolean;

    constructor(mutateOutput: boolean = false) {
        super();
        this.mutateOutput = mutateOutput;
    }

    public mutate(genome: Network): void {
        if (this.mutateOutput && genome.nodes.length - genome.inputSize < 3
            || genome.nodes.length - genome.inputSize - genome.outputSize < 3) {
            return;
        }

        const possible: Node[] = this.mutateOutput
            ? genome.nodes.filter(node => node.type !== NodeType.INPUT)
            : genome.nodes.filter(node => node.type === NodeType.HIDDEN);
        if (possible.length > 0) {
            const node1: Node = pickRandom(possible);
            const node2: Node = pickRandom(possible.filter(node => node !== node1));

            const biasTemp: number = node1.bias;
            const squashTemp: Activation = node1.squash;

            node1.bias = node2.bias;
            node1.squash = node2.squash;
            node2.bias = biasTemp;
            node2.squash = squashTemp;
        }
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
