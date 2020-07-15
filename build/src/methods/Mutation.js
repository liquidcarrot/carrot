"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapNodesMutation = exports.SubBackConnectionMutation = exports.AddBackConnectionMutation = exports.SubSelfConnectionMutation = exports.AddSelfConnectionMutation = exports.SubGateMutation = exports.AddGateMutation = exports.ModActivationMutation = exports.ModBiasMutation = exports.ModWeightMutation = exports.SubConnectionMutation = exports.AddConnectionMutation = exports.SubNodeMutation = exports.AddNodeMutation = exports.Mutation = exports.ONLY_STRUCTURE = exports.NO_STRUCTURE_MUTATIONS = exports.FEEDFORWARD_MUTATIONS = exports.ALL_MUTATIONS = void 0;
const Node_1 = require("../architecture/Node");
const NodeType_1 = require("../enums/NodeType");
const Utils_1 = require("../utils/Utils");
/**
 *
 * Genetic algorithm mutation methods. Creates variations (mutations) in neural networks which are then selected for better performance.
 *
 * @see {@link https://en.wikipedia.org/wiki/mutation_(genetic_algorithm)|Mutation (genetic algorithms) on Wikipedia}
 * @see {@link https://en.wikipedia.org/wiki/Genetic_algorithm#Selection|Selection (genetic algorithms) on Wikipedia}
 */
class Mutation {
}
exports.Mutation = Mutation;
/**
 * Add node mutation.
 *
 * Adds a hidden node to the network.
 */
class AddNodeMutation extends Mutation {
    /**
     * Constructs a AddNodeMutation object
     * @param randomActivation Should choose a random activation for a new node?
     */
    constructor(randomActivation = true) {
        super();
        this.randomActivation = randomActivation;
    }
    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     * @param options
     */
    mutate(network, options = {}) {
        // check if max nodes is already reached
        if (options.maxNodes !== undefined && network.nodes.length >= options.maxNodes) {
            return;
        }
        // create a new hidden node
        const node = new Node_1.Node(NodeType_1.NodeType.HIDDEN);
        if (this.randomActivation) {
            node.mutateActivation(); // choose random activation
        }
        // take a random connection
        const connection = Utils_1.pickRandom(Array.from(network.connections));
        const from = connection.from;
        const to = connection.to;
        network.disconnect(from, to); // disconnect it
        // put the node in between the connection
        const minBound = Math.max(network.inputSize, 1 + network.nodes.indexOf(from));
        network.nodes.splice(minBound, 0, node);
        const newConnection1 = network.connect(from, node, 1);
        const newConnection2 = network.connect(node, to, connection.weight);
        if (connection.gateNode != null) {
            // if connection had a gate node
            // choose randomly which new connection should get this gate node
            if (Utils_1.randBoolean()) {
                network.addGate(connection.gateNode, newConnection1);
            }
            else {
                network.addGate(connection.gateNode, newConnection2);
            }
        }
    }
}
exports.AddNodeMutation = AddNodeMutation;
/**
 * Sub node mutation.
 *
 * Removes a random node from the network.
 */
class SubNodeMutation extends Mutation {
    constructor(keepGates = true) {
        super();
        this.keepGates = keepGates;
    }
    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     */
    mutate(network) {
        const possible = network.nodes.filter(node => node !== undefined && node.isHiddenNode()); // hidden nodes
        if (possible.length > 0) {
            network.removeNode(Utils_1.pickRandom(possible), this.keepGates); // remove a random node from the filtered array
        }
    }
}
exports.SubNodeMutation = SubNodeMutation;
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
    mutate(network, options = {}) {
        // check if max connections is already reached
        if (options.maxConnections !== undefined && network.connections.size >= options.maxConnections) {
            return;
        }
        const possible = [];
        for (let i = 0; i < network.nodes.length - network.outputSize; i++) {
            const from = network.nodes[i];
            for (let j = Math.max(i + 1, network.inputSize); j < network.nodes.length; j++) {
                const to = network.nodes[j];
                if (!from.isProjectingTo(to)) {
                    possible.push([from, to]);
                }
            }
        }
        if (possible.length > 0) {
            const pair = Utils_1.pickRandom(possible);
            network.connect(pair[0], pair[1]);
        }
    }
}
exports.AddConnectionMutation = AddConnectionMutation;
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
    mutate(network) {
        const possible = Array.from(network.connections)
            .filter(conn => conn.from.outgoing.size > 1) // do not deactivate a neuron
            .filter(conn => conn.to.incoming.size > 1) // do not deactivate a neuron
            .filter(conn => network.nodes.indexOf(conn.to) > network.nodes.indexOf(conn.from)); // look for forward pointing connections
        if (possible.length > 0) {
            const randomConnection = Utils_1.pickRandom(possible); // pick a random connection from the filtered array
            network.disconnect(randomConnection.from, randomConnection.to); // remove the connection from the network
        }
    }
}
exports.SubConnectionMutation = SubConnectionMutation;
/**
 * Mod weight mutation.
 *
 * Modifies the weight of a random connection.
 */
class ModWeightMutation extends Mutation {
    /**
     * Constructs a ModWeightMutation object
     * @param min The minimum weight.
     * @param max The maximum weight.
     */
    constructor(min = -1, max = 1) {
        super();
        this.min = min;
        this.max = max;
    }
    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     */
    mutate(network) {
        // pick random connection and mutate it's weight
        Utils_1.pickRandom(Array.from(network.connections)).weight += Utils_1.randDouble(this.min, this.max);
    }
}
exports.ModWeightMutation = ModWeightMutation;
/**
 * Mod bias mutation.
 *
 * Modifies the bias value of a random hidden or output node
 */
class ModBiasMutation extends Mutation {
    /**
     * Constructs a ModBiasMutation object
     * @param min The minimum bias.
     * @param max The maximum bias.
     */
    constructor(min = -1, max = 1) {
        super();
        this.min = min;
        this.max = max;
    }
    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     */
    mutate(network) {
        Utils_1.pickRandom(network.nodes.filter(node => !node.isInputNode())) // pick random hidden or output node
            .mutateBias(this); // mutate it's bias
    }
}
exports.ModBiasMutation = ModBiasMutation;
/**
 * Mod activation mutation.
 *
 * Modifies the activation function of a random node
 */
class ModActivationMutation extends Mutation {
    /**
     * Constructs a ModActivationMutation object
     * @param mutateOutput Can the output be mutated?
     */
    constructor(mutateOutput = false) {
        super();
        this.mutateOutput = mutateOutput;
    }
    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     * @param options
     */
    mutate(network, options = {}) {
        const possible = this.mutateOutput
            ? network.nodes.filter(node => !node.isInputNode()) // hidden and output nodes
            : network.nodes.filter(node => node.isHiddenNode()); // hidden nodes
        if (possible.length > 0) {
            Utils_1.pickRandom(possible).mutateActivation(options.allowedActivations); // mutate the activation of the node
        }
    }
}
exports.ModActivationMutation = ModActivationMutation;
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
    mutate(network) {
        const possible = network.nodes
            .filter(node => !node.isInputNode()) // no input nodes
            .filter(node => node.selfConnection.weight === 0); // only nodes that doesn't have an self connection already
        if (possible.length > 0) {
            const node = Utils_1.pickRandom(possible); // pick a random node from the filtered array
            network.connect(node, node); // connection the node to itself
        }
    }
}
exports.AddSelfConnectionMutation = AddSelfConnectionMutation;
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
    mutate(network) {
        const possible = Array.from(network.connections).filter(conn => conn.from === conn.to);
        if (possible.length > 0) {
            const randomConnection = Utils_1.pickRandom(possible);
            network.disconnect(randomConnection.from, randomConnection.to);
        }
    }
}
exports.SubSelfConnectionMutation = SubSelfConnectionMutation;
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
    mutate(network, options = {}) {
        // check if max gates isn't reached already
        if (options.maxGates !== undefined && network.gates.size >= options.maxGates) {
            return;
        }
        // use only connections that aren't already gated
        const possible = Array.from(network.connections).filter(conn => conn.gateNode === null);
        if (possible.length > 0) {
            const node = Utils_1.pickRandom(network.nodes.filter(node => !node.isInputNode())); // hidden or output node
            const connection = Utils_1.pickRandom(possible); // random connection from filtered array
            network.addGate(node, connection); // use the node to gate the connection
        }
    }
}
exports.AddGateMutation = AddGateMutation;
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
    mutate(network) {
        if (network.gates.size > 0) {
            network.removeGate(Utils_1.pickRandom(Array.from(network.gates)));
        }
    }
}
exports.SubGateMutation = SubGateMutation;
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
    mutate(network) {
        const possible = [];
        for (let i = network.inputSize; i < network.nodes.length; i++) {
            const from = network.nodes[i];
            for (let j = network.inputSize; j < i; j++) {
                const to = network.nodes[j];
                if (!from.isProjectingTo(to)) {
                    possible.push([from, to]);
                }
            }
        }
        if (possible.length > 0) {
            const pair = Utils_1.pickRandom(possible);
            network.connect(pair[0], pair[1]);
        }
    }
}
exports.AddBackConnectionMutation = AddBackConnectionMutation;
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
    mutate(network) {
        const possible = Array.from(network.connections)
            .filter(conn => conn.from.outgoing.size > 1)
            .filter(conn => conn.to.incoming.size > 1)
            .filter(conn => network.nodes.indexOf(conn.from) > network.nodes.indexOf(conn.to));
        if (possible.length > 0) {
            const randomConnection = Utils_1.pickRandom(possible);
            network.disconnect(randomConnection.from, randomConnection.to);
        }
    }
}
exports.SubBackConnectionMutation = SubBackConnectionMutation;
/**
 * Swap nodes mutation.
 *
 * Swaps the values of two randomly picked nodes.
 */
class SwapNodesMutation extends Mutation {
    /**
     * Constructs a SwapNodeMutation object
     * @param mutateOutput Can the output be mutated?
     */
    constructor(mutateOutput = false) {
        super();
        this.mutateOutput = mutateOutput;
    }
    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     */
    mutate(network) {
        const possible = this.mutateOutput
            ? network.nodes.filter(node => node !== undefined && !node.isInputNode()) // hidden or output nodes
            : network.nodes.filter(node => node !== undefined && node.isHiddenNode()); // only hidden nodes
        if (possible.length >= 2) {
            // select two different nodes from the filtered array
            const node1 = Utils_1.pickRandom(possible);
            const node2 = Utils_1.pickRandom(possible.filter(node => node !== node1));
            // change there parameters
            const biasTemp = node1.bias;
            const squashTemp = node1.squash;
            node1.bias = node2.bias;
            node1.squash = node2.squash;
            node2.bias = biasTemp;
            node2.squash = squashTemp;
        }
    }
}
exports.SwapNodesMutation = SwapNodesMutation;
/**
 * Array of all mutation methods
 */
const ALL_MUTATIONS = [
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
exports.ALL_MUTATIONS = ALL_MUTATIONS;
/**
 * Array of all feed forward mutation methods
 */
const FEEDFORWARD_MUTATIONS = [
    new AddNodeMutation(),
    new SubNodeMutation(),
    new AddConnectionMutation(),
    new SubConnectionMutation(),
    new ModWeightMutation(),
    new ModBiasMutation(),
    new ModActivationMutation(),
    new SwapNodesMutation(),
];
exports.FEEDFORWARD_MUTATIONS = FEEDFORWARD_MUTATIONS;
const NO_STRUCTURE_MUTATIONS = [
    new ModWeightMutation(),
    new ModBiasMutation(),
    new ModActivationMutation(),
];
exports.NO_STRUCTURE_MUTATIONS = NO_STRUCTURE_MUTATIONS;
const ONLY_STRUCTURE = [
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
exports.ONLY_STRUCTURE = ONLY_STRUCTURE;
