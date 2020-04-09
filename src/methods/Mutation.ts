import {Node} from "../architecture/Node";
import {pickRandom, randBoolean, randDouble} from "./Utils";
import {Activation} from "./Activation";
import {Network} from "../architecture/Network";
import {Connection} from "../architecture/Connection";
import {NodeType} from "../enums/NodeType";
import {ActivationType} from "../enums/ActivationType";

/**
 *
 * Genetic algorithm mutation methods. Creates variations (mutations) in neural networks which are then selected for better performance.
 *
 * @see {@link https://en.wikipedia.org/wiki/mutation_(genetic_algorithm)|Mutation (genetic algorithms) on Wikipedia}
 * @see {@link https://en.wikipedia.org/wiki/Genetic_algorithm#Selection|Selection (genetic algorithms) on Wikipedia}
 *
 * @example <caption>Mutation methods with networks</caption>
 *
 * let myNetwork = new Network(5, 5);
 *
 * // Setting a mutation method for a network
 * myNetwork.mutate(new AddNodeMutation());
 *
 * // specifying a list of network mutation methods to use during evolution
 * myNetwork.evolve(trainingset, {
 *  mutation: [new AddNodeMutation(),new ModBiasMutation()]
 * }
 *
 * @example <caption>Using a mutation method with a neuron</caption>
 *
 * let myNode = new Node(NodeType.HIDDEN);
 *
 * myNode.mutateBias(new ModBiasMutation(-0.5,0.3));
 */
abstract class Mutation {
    /**
     * Mutates a given network.
     *
     * @param network the network to mutate
     * @param options you can set the max amount of nodes, connections and gates
     */
    public abstract mutate(network: Network, options?: { maxNodes?: number; maxConnections?: number; maxGates?: number, allowedActivations?: ActivationType[] }): void;
}

/**
 * Add node mutation.
 *
 * Adds a hidden node to the network.
 *
 * @prop {boolean} randomActivation=true If enabled, sets a random activation function on the newly created node
 *
 * @example
 *
 * let myNetwork = new Network(5, 5);
 *
 * myNetwork.mutate(new AddNodeMutation());
 */
class AddNodeMutation extends Mutation {
    public randomActivation: boolean;

    constructor(randomActivation: boolean = true) {
        super();
        this.randomActivation = randomActivation;
    }

    public mutate(network: Network, options?: { maxNodes?: number; maxConnections?: number; maxGates?: number, allowedActivations?: ActivationType[] }): void {
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
 *
 * @example
 * let myNetwork = new Network(5, 5);
 *
 * myNetwork.mutate(new AddNodeMutation()); // Network will have one hidden node
 * myNetwork.mutate(new SubNodeMutation()); // Network will have no hidden node
 */
class SubNodeMutation extends Mutation {
    public keepGates: boolean;

    constructor(keepGates: boolean = true) {
        super();
        this.keepGates = keepGates;
    }

    public mutate(network: Network): void {
        const possible: Node[] = network.nodes.filter(node => node !== undefined && node.isHiddenNode()); // hidden nodes
        if (possible.length > 0) {
            network.removeNode(pickRandom(possible)); // remove a random node from the filtered array
        }
    }
}

/**
 * Add connections mutation.
 *
 * Adds a connection to the network.
 *
 * @example
 *
 * let myNetwork = new Network(5, 5);
 *
 * myNetwork.mutate(new AddNodeMutation()); // adds a hidden node
 * myNetwork.mutate(new AddConnectionMutation()); // creates a random forward pointing connection
 */
class AddConnectionMutation extends Mutation {
    public mutate(network: Network, options?: { maxNodes?: number; maxConnections?: number; maxGates?: number, allowedActivations?: ActivationType[] }): void {
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
 *
 * @example
 *
 * let myNetwork = new Network(5, 5);
 *
 * myNetwork.mutate(new SubConnectionMutation());
 */
class SubConnectionMutation extends Mutation {
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
 *
 * @example
 *
 * let myNetwork = new Network(5, 5);
 *
 * myNetwork.mutate(new ModWeightMutation()); // modifies the weight of a random connection
 */
class ModWeightMutation extends Mutation {
    public min: number;
    public max: number;

    constructor(min: number = -1, max: number = 1) {
        super();
        this.min = min;
        this.max = max;
    }

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
 *
 * @example
 *
 * let myNetwork = new Network(5, 5);
 *
 * let myNode = new Node();
 *
 * myNode.mutate(new ModBiasMutation());
 */
class ModBiasMutation extends Mutation {
    public min: number;
    public max: number;

    constructor(min: number = -1, max: number = 1) {
        super();
        this.min = min;
        this.max = max;
    }

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
 *
 * @example <caption>Mutating the activation function of a node</caption>
 * let myNode = new Node();
 *
 * myNode.mutate(new ModActivationMutation());
 */
class ModActivationMutation extends Mutation {
    public mutateOutput: boolean;

    constructor(mutateOutput: boolean = false) {
        super();
        this.mutateOutput = mutateOutput;
    }

    public mutate(network: Network, options?: { maxNodes?: number; maxConnections?: number; maxGates?: number, allowedActivations?: ActivationType[] }): void {
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
 *
 * @example
 * let myNetwork = new Network(5, 5);
 *
 * myNetwork.mutate(new AddSelfConnectionMutation());
 */
class AddSelfConnectionMutation extends Mutation {
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
 *
 * @example
 * let myNetwork = new Network(5, 5);
 *
 * myNetwork.mutate(new AddSelfConnectionMutation()); // add a self connection
 * myNetwork.mutate(new SubSelfConnectionMutation()); // remove a self connection
 */
class SubSelfConnectionMutation extends Mutation {
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
 *
 * @example
 * let myNetwork = new Network(5, 5);
 *
 * myNetwork.mutate(new AddGateMutation());
 */
class AddGateMutation extends Mutation {
    public mutate(network: Network, options?: { maxNodes?: number; maxConnections?: number; maxGates?: number, allowedActivations?: ActivationType[] }): void {
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
 *
 * @example
 * let myNetwork = new Network(5, 5);
 *
 * myNetwork.mutate(new AddGateMutation()); // add a gate to the network
 * myNetwork.mutate(new SubGateMutation()); // remove the gate from the network
 */
class SubGateMutation extends Mutation {
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
 *
 * @example
 * let myNetwork = new Network(5, 5);
 *
 * myNetwork.mutate(new AddBackConnectionMutation);
 */
class AddBackConnectionMutation extends Mutation {
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
 *
 * @example
 * let myNetwork = new Network(5, 5);
 *
 * myNetwork.mutate(new AddBackConnectionMutation); // add a back connection
 * myNetwork.mutate(new SubBackConnectionMutation); // remove the back connection
 */
class SubBackConnectionMutation extends Mutation {
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
 * @example
 * let myNetwork = new Network(5, 5);
 *
 * myNetwork.mutate(new SwapNodesMutation());
 */
class SwapNodesMutation extends Mutation {
    public mutateOutput: boolean;

    constructor(mutateOutput: boolean = false) {
        super();
        this.mutateOutput = mutateOutput;
    }

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
            const squashTemp: Activation = node1.squash;

            node1.bias = node2.bias;
            node1.squash = node2.squash;
            node2.bias = biasTemp;
            node2.squash = squashTemp;
        }
    }
}

/**
 * Array of all mutation methods
 *
 * @example <caption>A group of mutation methods for evolution</caption>
 * let myNetwork = new Network(5, 5);
 *
 * network.evolve(trainingset, {
 *  mutation: methods.mutation.ALL // all mutation methods
 * }
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
 * Array of all feedforwad mutation methods
 *
 * @example <caption>A group of mutation methods for evolution</caption>
 * let myNetwork = new Network(5, 5);
 *
 * network.evolve(trainingset, {
 *  mutation: methods.mutation.FEEDFORWARD_MUTATIONS // all feedforward mutation methods
 * }
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
