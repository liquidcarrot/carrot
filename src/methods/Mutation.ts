import {Connection} from "../architecture/Connection";
import {Network} from "../architecture/Network";
import {Node} from "../architecture/Node";
import {NodeType} from "../enums/NodeType";
import {pickRandom, randBoolean, randDouble} from "./Utils";

/**
 *
 * Genetic algorithm mutation methods. Creates variations (mutations) in neural networks which are then selected for better performance.
 *
 * @see {@link https://en.wikipedia.org/wiki/mutation_(genetic_algorithm)|Mutation (genetic algorithms) on Wikipedia}
 * @see {@link https://en.wikipedia.org/wiki/Genetic_algorithm#Selection|Selection (genetic algorithms) on Wikipedia}
 *
 */
abstract class Mutation {
    /**
     * Mutates a given network.
     *
     * @param network the network to mutate
     * @param options you can set the max amount of nodes, connections and gates
     */
    public abstract mutate(network: Network, options?: {
        /**
         * Maximum allowed nodes.
         */
        maxNodes?: number;
        /**
         * Maximum allowed connections.
         */
        maxConnections?: number;
        /**
         * Maximum allowed gates.
         */
        maxGates?: number,
        /**
         * All allowed activations.
         */
        allowedActivations?: ((x: number, derivative: boolean) => number)[]
    }): void;
}

/**
 * Add node mutation.
 *
 * Adds a hidden node to the network.
 *
 * @prop {boolean} randomActivation=true If enabled, sets a random activation function on the newly created node
 */
class AddNodeMutation extends Mutation {
    /**
     * Should choose a random activation for a new node?
     */
    public randomActivation: boolean;

    /**
     * Constructs a AddNodeMutation object
     * @param randomActivation Should choose a random activation for a new node?
     */
    constructor(randomActivation: boolean = true) {
        super();
        this.randomActivation = randomActivation;
    }

    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     * @param options
     */
    public mutate(network: Network, options?: {
        /**
         * Maximum amount of nodes.
         */
        maxNodes?: number
    }): void {
        // check if max nodes is already reached
        if (options !== undefined && options.maxNodes !== undefined && network.nodes.length >= options.maxNodes) {
            return;
        }
        // create a new hidden node
        const node: Node = new Node(NodeType.HIDDEN);
        if (this.randomActivation) {
            node.mutateActivation(); // choose random activation
        }
        // take a random connection
        const connection: Connection = pickRandom(network.connections);
        const from: Node = connection.from;
        const to: Node = connection.to;
        network.disconnect(from, to); // disconnect it

        // put the node in between the connection
        const minBound: number = Math.max(network.inputSize, 1 + network.nodes.indexOf(from));
        network.nodes.splice(minBound, 0, node);
        const newConnection1: Connection = network.connect(from, node, 1);
        const newConnection2: Connection = network.connect(node, to, connection.weight);

        if (connection.gateNode != null) {
            // if connection had a gate node
            // choose randomly which new connection should get this gate node
            if (randBoolean()) {
                network.addGate(connection.gateNode, newConnection1);
            } else {
                network.addGate(connection.gateNode, newConnection2);
            }
        }
    }
}

/**
 * Sub node mutation.
 *
 * Removes a random node from the network.
 *
 * @prop keepGates=true Ensures replacement node has gated connections if the removed node did.
 */
class SubNodeMutation extends Mutation {
    /**
     * Keep gates or remove them too ?
     */
    public keepGates: boolean;

    constructor(keepGates: boolean = true) {
        super();
        this.keepGates = keepGates;
    }

    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     */
    public mutate(network: Network): void {
        const possible: Node[] = network.nodes.filter(node => node !== undefined && node.isHiddenNode()); // hidden nodes
        if (possible.length > 0) {
            network.removeNode(pickRandom(possible), this.keepGates); // remove a random node from the filtered array
        }
    }
}

/**
 * Add connections mutation.
 *
 * Adds a connection to the network.
 */
class AddConnectionMutation extends Mutation {
    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     * @param options
     */
    public mutate(network: Network, options?: {
        /**
         * Maximum allowed connections.
         */
        maxConnections?: number;
    }): void {
        // check if max connections is already reached
        if (options !== undefined && options.maxConnections !== undefined && network.connections.length >= options.maxConnections) {
            return;
        }
        const possible: Node[][] = [];

        for (let i: number = 0; i < network.nodes.length - network.outputSize; i++) {
            const from: Node = network.nodes[i];
            for (let j: number = Math.max(i + 1, network.inputSize); j < network.nodes.length; j++) {
                const to: Node = network.nodes[j];
                if (!from.isProjectingTo(to)) {
                    possible.push([from, to]);
                }
            }
        }

        if (possible.length > 0) {
            const pair: Node[] = pickRandom(possible);
            network.connect(pair[0], pair[1]);
        }
    }
}

/**
 * Sub connection mutation.
 *
 * Removes a random connection from the network.
 */
class SubConnectionMutation extends Mutation {
    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     */
    public mutate(network: Network): void {
        const possible: Connection[] = network.connections
            .filter(conn => conn.from.outgoing.length > 1) // do not deactivate a neuron
            .filter(conn => conn.to.incoming.length > 1) // do not deactivate a neuron
            .filter(conn => network.nodes.indexOf(conn.to) > network.nodes.indexOf(conn.from)); // look for forward pointing connections
        if (possible.length > 0) {
            const randomConnection: Connection = pickRandom(possible); // pick a random connection from the filtered array
            network.disconnect(randomConnection.from, randomConnection.to); // remove the connection from the network
        }
    }
}

/**
 * Mod weight mutation.
 *
 * Modifies the weight of a random connection.
 *
 * @prop {number} min=-1 lower bound for weight modification
 * @prop {number} max=1 higher bound for weight modification
 */
class ModWeightMutation extends Mutation {
    /**
     * The minimum weight.
     */
    public min: number;
    /**
     * The maximum weight.
     */
    public max: number;

    /**
     * Constructs a ModWeightMutation object
     * @param min The minimum weight.
     * @param max The maximum weight.
     */
    constructor(min: number = -1, max: number = 1) {
        super();
        this.min = min;
        this.max = max;
    }

    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     */
    public mutate(network: Network): void {
        // pick random connection and mutate it's weight
        pickRandom(network.connections).weight += randDouble(this.min, this.max);
    }
}

/**
 * Mod bias mutation.
 *
 * Modifies the bias value of a random hidden or output node
 *
 * @prop {number} min=-1 lower bound for modification of a neuron's bias
 * @prop {number} max=1 higher bound for modification of a neuron's bias
 */
class ModBiasMutation extends Mutation {
    /**
     * The minimum bias.
     */
    public min: number;
    /**
     * The maximum bias.
     */
    public max: number;

    /**
     * Constructs a ModBiasMutation object
     * @param min The minimum bias.
     * @param max The maximum bias.
     */
    constructor(min: number = -1, max: number = 1) {
        super();
        this.min = min;
        this.max = max;
    }

    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     */
    public mutate(network: Network): void {
        pickRandom(network.nodes.filter(node => !node.isInputNode())) // pick random hidden or output node
            .mutateBias(this); // mutate it's bias
    }
}

/**
 * Mod activation mutation.
 *
 * Modifies the activation function of a random node
 *
 * @prop {boolean} mutateOutput=false Change activation function of network output neurons. Enable this to let the network experiment with its output.
 */
class ModActivationMutation extends Mutation {
    /**
     * Can the output be mutated?
     */
    public mutateOutput: boolean;

    /**
     * Constructs a ModActivationMutation object
     * @param mutateOutput Can the output be mutated?
     */
    constructor(mutateOutput: boolean = false) {
        super();
        this.mutateOutput = mutateOutput;
    }

    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     * @param options
     */
    public mutate(network: Network, options?: {
        /**
         * All allowed activations.
         */
        allowedActivations?: ((x: number, derivative: boolean) => number)[]
    }): void {
        const possible: Node[] = this.mutateOutput
            ? network.nodes.filter(node => !node.isInputNode()) // hidden and output nodes
            : network.nodes.filter(node => node.isHiddenNode()); // hidden nodes
        if (possible.length > 0) {
            pickRandom(possible).mutateActivation(options?.allowedActivations); // mutate the activation of the node
        }
    }
}

/**
 * Add self connection.
 *
 * Adds a connection from a node to itself.
 */
class AddSelfConnectionMutation extends Mutation {
    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     */
    public mutate(network: Network): void {
        const possible: Node[] = network.nodes
            .filter(node => !node.isInputNode()) // no input nodes
            .filter(node => node.selfConnection.weight === 0); // only nodes that doesn't have an self connection already
        if (possible.length > 0) {
            const node: Node = pickRandom(possible); // pick a random node from the filtered array
            network.connect(node, node); // connection the node to itself
        }
    }
}

/**
 * Sub self connection.
 *
 * Removes a connection from a node to itself.
 */
class SubSelfConnectionMutation extends Mutation {
    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     */
    public mutate(network: Network): void {
        const possible: Connection[] = network.connections.filter(conn => conn.from === conn.to);
        if (possible.length > 0) {
            const randomConnection: Connection = pickRandom(possible);
            network.disconnect(randomConnection.from, randomConnection.to);
        }
    }
}

/**
 * Add gate mutation.
 *
 * Adds a gate to the network.
 */
class AddGateMutation extends Mutation {
    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     * @param options
     */
    public mutate(network: Network, options?: {
        /**
         * Maximum allowed gates.
         */
        maxGates?: number
    }): void {
        // check if max gates isn't reached already
        if (options !== undefined && options.maxGates !== undefined && network.gates.length >= options.maxGates) {
            return;
        }

        // use only connections that aren't already gated
        const possible: Connection[] = network.connections.filter(conn => conn.gateNode === null);
        if (possible.length > 0) {
            const node: Node = pickRandom(network.nodes.filter(node => !node.isInputNode())); // hidden or output node
            const connection: Connection = pickRandom(possible); // random connection from filtered array

            network.addGate(node, connection); // use the node to gate the connection
        }
    }
}

/**
 * Sub gate mutation.
 *
 * Removes a gate from the network.
 */
class SubGateMutation extends Mutation {
    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     */
    public mutate(network: Network): void {
        if (network.gates.length > 0) {
            network.removeGate(pickRandom(network.gates));
        }
    }
}

/**
 * Add back connection mutation.
 *
 * Adds a backward pointing connection to the network.
 */
class AddBackConnectionMutation extends Mutation {
    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     */
    public mutate(network: Network): void {
        const possible: Node[][] = [];
        for (let i: number = network.inputSize; i < network.nodes.length; i++) {
            const from: Node = network.nodes[i];
            for (let j: number = network.inputSize; j < i; j++) {
                const to: Node = network.nodes[j];
                if (!from.isProjectingTo(to)) {
                    possible.push([from, to]);
                }
            }
        }
        if (possible.length > 0) {
            const pair: Node[] = pickRandom(possible);
            network.connect(pair[0], pair[1]);
        }
    }
}

/**
 * Sub back connection mutation.
 *
 * Removes a backward pointing connection to the network.
 */
class SubBackConnectionMutation extends Mutation {
    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     */
    public mutate(network: Network): void {
        const possible: Connection[] = network.connections
            .filter(conn => conn.from.outgoing.length > 1)
            .filter(conn => conn.to.incoming.length > 1)
            .filter(conn => network.nodes.indexOf(conn.from) > network.nodes.indexOf(conn.to));
        if (possible.length > 0) {
            const randomConnection: Connection = pickRandom(possible);
            network.disconnect(randomConnection.from, randomConnection.to);
        }
    }
}

/**
 * Swap nodes mutation.
 *
 * Swaps the values of two randomly picked nodes.
 *
 * @prop {boolean} mutateOutput=false Swap bias and activation function of network output neurons too. Disable this to keep output of a neural network normalized.
 */
class SwapNodesMutation extends Mutation {
    /**
     * Can the output be mutated?
     */
    public mutateOutput: boolean;

    /**
     * Constructs a SwapNodeMutation object
     * @param mutateOutput Can the output be mutated?
     */
    constructor(mutateOutput: boolean = false) {
        super();
        this.mutateOutput = mutateOutput;
    }

    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     */
    public mutate(network: Network): void {
        const possible: Node[] = this.mutateOutput
            ? network.nodes.filter(node => node !== undefined && !node.isInputNode()) // hidden or output nodes
            : network.nodes.filter(node => node !== undefined && node.isHiddenNode()); // only hidden nodes

        if (possible.length >= 2) {
            // select two different nodes from the filtered array
            const node1: Node = pickRandom(possible);
            const node2: Node = pickRandom(possible.filter(node => node !== node1));

            // change there parameters
            const biasTemp: number = node1.bias;
            const squashTemp: ((x: number, derivative: boolean) => number) = node1.squash;

            node1.bias = node2.bias;
            node1.squash = node2.squash;
            node2.bias = biasTemp;
            node2.squash = squashTemp;
        }
    }
}

/**
 * Array of all mutation methods
 */
const ALL_MUTATIONS: Mutation[] = [
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
/**
 * Array of all feed forward mutation methods
 */
const FEEDFORWARD_MUTATIONS: Mutation[] = [
    new AddNodeMutation(),
    new SubNodeMutation(),
    new AddConnectionMutation(),
    new SubConnectionMutation(),
    new ModWeightMutation(),
    new ModBiasMutation(),
    new ModActivationMutation(),
    new SwapNodesMutation(),
];

const NO_STRUCTURE_MUTATIONS: Mutation[] = [
    new ModWeightMutation(),
    new ModBiasMutation(),
    new ModActivationMutation(),
];
const ONLY_STRUCTURE: Mutation[] = [
    new AddNodeMutation(),
    new SubNodeMutation(),
    new AddConnectionMutation(),
    new SubConnectionMutation(),
    new AddGateMutation(),
    new SubGateMutation(),
    new AddSelfConnectionMutation(),
    new SubSelfConnectionMutation(),
    new AddBackConnectionMutation(),
    new SubBackConnectionMutation(),
    new SwapNodesMutation(),
];

export {
    ALL_MUTATIONS,
    FEEDFORWARD_MUTATIONS,
    NO_STRUCTURE_MUTATIONS,
    ONLY_STRUCTURE,
    Mutation,
    AddNodeMutation,
    SubNodeMutation,
    AddConnectionMutation,
    SubConnectionMutation,
    ModWeightMutation,
    ModBiasMutation,
    ModActivationMutation,
    AddGateMutation,
    SubGateMutation,
    AddSelfConnectionMutation,
    SubSelfConnectionMutation,
    AddBackConnectionMutation,
    SubBackConnectionMutation,
    SwapNodesMutation,
};
