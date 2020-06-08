"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapNodesMutation = exports.SubBackConnectionMutation = exports.AddBackConnectionMutation = exports.SubSelfConnectionMutation = exports.AddSelfConnectionMutation = exports.SubGateMutation = exports.AddGateMutation = exports.ModActivationMutation = exports.ModBiasMutation = exports.ModWeightMutation = exports.SubConnectionMutation = exports.AddConnectionMutation = exports.SubNodeMutation = exports.AddNodeMutation = exports.Mutation = exports.ONLY_STRUCTURE = exports.NO_STRUCTURE_MUTATIONS = exports.FEEDFORWARD_MUTATIONS = exports.ALL_MUTATIONS = void 0;
var Node_1 = require("../architecture/Node");
var NodeType_1 = require("../enums/NodeType");
var Utils_1 = require("../utils/Utils");
/**
 *
 * Genetic algorithm mutation methods. Creates variations (mutations) in neural networks which are then selected for better performance.
 *
 * @see {@link https://en.wikipedia.org/wiki/mutation_(genetic_algorithm)|Mutation (genetic algorithms) on Wikipedia}
 * @see {@link https://en.wikipedia.org/wiki/Genetic_algorithm#Selection|Selection (genetic algorithms) on Wikipedia}
 *
 */
var Mutation = /** @class */ (function () {
    function Mutation() {
    }
    return Mutation;
}());
exports.Mutation = Mutation;
/**
 * Add node mutation.
 *
 * Adds a hidden node to the network.
 *
 * @prop {boolean} randomActivation=true If enabled, sets a random activation function on the newly created node
 */
var AddNodeMutation = /** @class */ (function (_super) {
    __extends(AddNodeMutation, _super);
    /**
     * Constructs a AddNodeMutation object
     * @param randomActivation Should choose a random activation for a new node?
     */
    function AddNodeMutation(randomActivation) {
        if (randomActivation === void 0) { randomActivation = true; }
        var _this = _super.call(this) || this;
        _this.randomActivation = randomActivation;
        return _this;
    }
    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     * @param options
     */
    AddNodeMutation.prototype.mutate = function (network, options) {
        if (options === void 0) { options = {}; }
        // check if max nodes is already reached
        if (options.maxNodes !== undefined && network.nodes.length >= options.maxNodes) {
            return;
        }
        // create a new hidden node
        var node = new Node_1.Node(NodeType_1.NodeType.HIDDEN);
        if (this.randomActivation) {
            node.mutateActivation(); // choose random activation
        }
        // take a random connection
        var connection = Utils_1.pickRandom(Array.from(network.connections));
        var from = connection.from;
        var to = connection.to;
        network.disconnect(from, to); // disconnect it
        // put the node in between the connection
        var minBound = Math.max(network.inputSize, 1 + network.nodes.indexOf(from));
        network.nodes.splice(minBound, 0, node);
        var newConnection1 = network.connect(from, node, 1);
        var newConnection2 = network.connect(node, to, connection.weight);
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
    };
    return AddNodeMutation;
}(Mutation));
exports.AddNodeMutation = AddNodeMutation;
/**
 * Sub node mutation.
 *
 * Removes a random node from the network.
 *
 * @prop keepGates=true Ensures replacement node has gated connections if the removed node did.
 */
var SubNodeMutation = /** @class */ (function (_super) {
    __extends(SubNodeMutation, _super);
    function SubNodeMutation(keepGates) {
        if (keepGates === void 0) { keepGates = true; }
        var _this = _super.call(this) || this;
        _this.keepGates = keepGates;
        return _this;
    }
    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     */
    SubNodeMutation.prototype.mutate = function (network) {
        var possible = network.nodes.filter(function (node) { return node !== undefined && node.isHiddenNode(); }); // hidden nodes
        if (possible.length > 0) {
            network.removeNode(Utils_1.pickRandom(possible), this.keepGates); // remove a random node from the filtered array
        }
    };
    return SubNodeMutation;
}(Mutation));
exports.SubNodeMutation = SubNodeMutation;
/**
 * Add connections mutation.
 *
 * Adds a connection to the network.
 */
var AddConnectionMutation = /** @class */ (function (_super) {
    __extends(AddConnectionMutation, _super);
    function AddConnectionMutation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     * @param options
     */
    AddConnectionMutation.prototype.mutate = function (network, options) {
        if (options === void 0) { options = {}; }
        // check if max connections is already reached
        if (options.maxConnections !== undefined && network.connections.size >= options.maxConnections) {
            return;
        }
        var possible = [];
        for (var i = 0; i < network.nodes.length - network.outputSize; i++) {
            var from = network.nodes[i];
            for (var j = Math.max(i + 1, network.inputSize); j < network.nodes.length; j++) {
                var to = network.nodes[j];
                if (!from.isProjectingTo(to)) {
                    possible.push([from, to]);
                }
            }
        }
        if (possible.length > 0) {
            var pair = Utils_1.pickRandom(possible);
            network.connect(pair[0], pair[1]);
        }
    };
    return AddConnectionMutation;
}(Mutation));
exports.AddConnectionMutation = AddConnectionMutation;
/**
 * Sub connection mutation.
 *
 * Removes a random connection from the network.
 */
var SubConnectionMutation = /** @class */ (function (_super) {
    __extends(SubConnectionMutation, _super);
    function SubConnectionMutation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     */
    SubConnectionMutation.prototype.mutate = function (network) {
        var possible = Array.from(network.connections)
            .filter(function (conn) { return conn.from.outgoing.size > 1; }) // do not deactivate a neuron
            .filter(function (conn) { return conn.to.incoming.size > 1; }) // do not deactivate a neuron
            .filter(function (conn) { return network.nodes.indexOf(conn.to) > network.nodes.indexOf(conn.from); }); // look for forward pointing connections
        if (possible.length > 0) {
            var randomConnection = Utils_1.pickRandom(possible); // pick a random connection from the filtered array
            network.disconnect(randomConnection.from, randomConnection.to); // remove the connection from the network
        }
    };
    return SubConnectionMutation;
}(Mutation));
exports.SubConnectionMutation = SubConnectionMutation;
/**
 * Mod weight mutation.
 *
 * Modifies the weight of a random connection.
 *
 * @prop {number} min=-1 lower bound for weight modification
 * @prop {number} max=1 higher bound for weight modification
 */
var ModWeightMutation = /** @class */ (function (_super) {
    __extends(ModWeightMutation, _super);
    /**
     * Constructs a ModWeightMutation object
     * @param min The minimum weight.
     * @param max The maximum weight.
     */
    function ModWeightMutation(min, max) {
        if (min === void 0) { min = -1; }
        if (max === void 0) { max = 1; }
        var _this = _super.call(this) || this;
        _this.min = min;
        _this.max = max;
        return _this;
    }
    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     */
    ModWeightMutation.prototype.mutate = function (network) {
        // pick random connection and mutate it's weight
        Utils_1.pickRandom(Array.from(network.connections)).weight += Utils_1.randDouble(this.min, this.max);
    };
    return ModWeightMutation;
}(Mutation));
exports.ModWeightMutation = ModWeightMutation;
/**
 * Mod bias mutation.
 *
 * Modifies the bias value of a random hidden or output node
 *
 * @prop {number} min=-1 lower bound for modification of a neuron's bias
 * @prop {number} max=1 higher bound for modification of a neuron's bias
 */
var ModBiasMutation = /** @class */ (function (_super) {
    __extends(ModBiasMutation, _super);
    /**
     * Constructs a ModBiasMutation object
     * @param min The minimum bias.
     * @param max The maximum bias.
     */
    function ModBiasMutation(min, max) {
        if (min === void 0) { min = -1; }
        if (max === void 0) { max = 1; }
        var _this = _super.call(this) || this;
        _this.min = min;
        _this.max = max;
        return _this;
    }
    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     */
    ModBiasMutation.prototype.mutate = function (network) {
        Utils_1.pickRandom(network.nodes.filter(function (node) { return !node.isInputNode(); })) // pick random hidden or output node
            .mutateBias(this); // mutate it's bias
    };
    return ModBiasMutation;
}(Mutation));
exports.ModBiasMutation = ModBiasMutation;
/**
 * Mod activation mutation.
 *
 * Modifies the activation function of a random node
 *
 * @prop {boolean} mutateOutput=false Change activation function of network output neurons. Enable this to let the network experiment with its output.
 */
var ModActivationMutation = /** @class */ (function (_super) {
    __extends(ModActivationMutation, _super);
    /**
     * Constructs a ModActivationMutation object
     * @param mutateOutput Can the output be mutated?
     */
    function ModActivationMutation(mutateOutput) {
        if (mutateOutput === void 0) { mutateOutput = false; }
        var _this = _super.call(this) || this;
        _this.mutateOutput = mutateOutput;
        return _this;
    }
    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     * @param options
     */
    ModActivationMutation.prototype.mutate = function (network, options) {
        if (options === void 0) { options = {}; }
        var possible = this.mutateOutput
            ? network.nodes.filter(function (node) { return !node.isInputNode(); }) // hidden and output nodes
            : network.nodes.filter(function (node) { return node.isHiddenNode(); }); // hidden nodes
        if (possible.length > 0) {
            Utils_1.pickRandom(possible).mutateActivation(options.allowedActivations); // mutate the activation of the node
        }
    };
    return ModActivationMutation;
}(Mutation));
exports.ModActivationMutation = ModActivationMutation;
/**
 * Add self connection.
 *
 * Adds a connection from a node to itself.
 */
var AddSelfConnectionMutation = /** @class */ (function (_super) {
    __extends(AddSelfConnectionMutation, _super);
    function AddSelfConnectionMutation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     */
    AddSelfConnectionMutation.prototype.mutate = function (network) {
        var possible = network.nodes
            .filter(function (node) { return !node.isInputNode(); }) // no input nodes
            .filter(function (node) { return node.selfConnection.weight === 0; }); // only nodes that doesn't have an self connection already
        if (possible.length > 0) {
            var node = Utils_1.pickRandom(possible); // pick a random node from the filtered array
            network.connect(node, node); // connection the node to itself
        }
    };
    return AddSelfConnectionMutation;
}(Mutation));
exports.AddSelfConnectionMutation = AddSelfConnectionMutation;
/**
 * Sub self connection.
 *
 * Removes a connection from a node to itself.
 */
var SubSelfConnectionMutation = /** @class */ (function (_super) {
    __extends(SubSelfConnectionMutation, _super);
    function SubSelfConnectionMutation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     */
    SubSelfConnectionMutation.prototype.mutate = function (network) {
        var possible = Array.from(network.connections).filter(function (conn) { return conn.from === conn.to; });
        if (possible.length > 0) {
            var randomConnection = Utils_1.pickRandom(possible);
            network.disconnect(randomConnection.from, randomConnection.to);
        }
    };
    return SubSelfConnectionMutation;
}(Mutation));
exports.SubSelfConnectionMutation = SubSelfConnectionMutation;
/**
 * Add gate mutation.
 *
 * Adds a gate to the network.
 */
var AddGateMutation = /** @class */ (function (_super) {
    __extends(AddGateMutation, _super);
    function AddGateMutation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     * @param options
     */
    AddGateMutation.prototype.mutate = function (network, options) {
        if (options === void 0) { options = {}; }
        // check if max gates isn't reached already
        if (options.maxGates !== undefined && network.gates.size >= options.maxGates) {
            return;
        }
        // use only connections that aren't already gated
        var possible = Array.from(network.connections).filter(function (conn) { return conn.gateNode === null; });
        if (possible.length > 0) {
            var node = Utils_1.pickRandom(network.nodes.filter(function (node) { return !node.isInputNode(); })); // hidden or output node
            var connection = Utils_1.pickRandom(possible); // random connection from filtered array
            network.addGate(node, connection); // use the node to gate the connection
        }
    };
    return AddGateMutation;
}(Mutation));
exports.AddGateMutation = AddGateMutation;
/**
 * Sub gate mutation.
 *
 * Removes a gate from the network.
 */
var SubGateMutation = /** @class */ (function (_super) {
    __extends(SubGateMutation, _super);
    function SubGateMutation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     */
    SubGateMutation.prototype.mutate = function (network) {
        if (network.gates.size > 0) {
            network.removeGate(Utils_1.pickRandom(Array.from(network.gates)));
        }
    };
    return SubGateMutation;
}(Mutation));
exports.SubGateMutation = SubGateMutation;
/**
 * Add back connection mutation.
 *
 * Adds a backward pointing connection to the network.
 */
var AddBackConnectionMutation = /** @class */ (function (_super) {
    __extends(AddBackConnectionMutation, _super);
    function AddBackConnectionMutation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     */
    AddBackConnectionMutation.prototype.mutate = function (network) {
        var possible = [];
        for (var i = network.inputSize; i < network.nodes.length; i++) {
            var from = network.nodes[i];
            for (var j = network.inputSize; j < i; j++) {
                var to = network.nodes[j];
                if (!from.isProjectingTo(to)) {
                    possible.push([from, to]);
                }
            }
        }
        if (possible.length > 0) {
            var pair = Utils_1.pickRandom(possible);
            network.connect(pair[0], pair[1]);
        }
    };
    return AddBackConnectionMutation;
}(Mutation));
exports.AddBackConnectionMutation = AddBackConnectionMutation;
/**
 * Sub back connection mutation.
 *
 * Removes a backward pointing connection to the network.
 */
var SubBackConnectionMutation = /** @class */ (function (_super) {
    __extends(SubBackConnectionMutation, _super);
    function SubBackConnectionMutation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     */
    SubBackConnectionMutation.prototype.mutate = function (network) {
        var possible = Array.from(network.connections)
            .filter(function (conn) { return conn.from.outgoing.size > 1; })
            .filter(function (conn) { return conn.to.incoming.size > 1; })
            .filter(function (conn) { return network.nodes.indexOf(conn.from) > network.nodes.indexOf(conn.to); });
        if (possible.length > 0) {
            var randomConnection = Utils_1.pickRandom(possible);
            network.disconnect(randomConnection.from, randomConnection.to);
        }
    };
    return SubBackConnectionMutation;
}(Mutation));
exports.SubBackConnectionMutation = SubBackConnectionMutation;
/**
 * Swap nodes mutation.
 *
 * Swaps the values of two randomly picked nodes.
 *
 * @prop {boolean} mutateOutput=false Swap bias and activation function of network output neurons too. Disable this to keep output of a neural network normalized.
 */
var SwapNodesMutation = /** @class */ (function (_super) {
    __extends(SwapNodesMutation, _super);
    /**
     * Constructs a SwapNodeMutation object
     * @param mutateOutput Can the output be mutated?
     */
    function SwapNodesMutation(mutateOutput) {
        if (mutateOutput === void 0) { mutateOutput = false; }
        var _this = _super.call(this) || this;
        _this.mutateOutput = mutateOutput;
        return _this;
    }
    /**
     * Mutates the network.
     *
     * @param network The network which gets mutated
     */
    SwapNodesMutation.prototype.mutate = function (network) {
        var possible = this.mutateOutput
            ? network.nodes.filter(function (node) { return node !== undefined && !node.isInputNode(); }) // hidden or output nodes
            : network.nodes.filter(function (node) { return node !== undefined && node.isHiddenNode(); }); // only hidden nodes
        if (possible.length >= 2) {
            // select two different nodes from the filtered array
            var node1_1 = Utils_1.pickRandom(possible);
            var node2 = Utils_1.pickRandom(possible.filter(function (node) { return node !== node1_1; }));
            // change there parameters
            var biasTemp = node1_1.bias;
            var squashTemp = node1_1.squash;
            node1_1.bias = node2.bias;
            node1_1.squash = node2.squash;
            node2.bias = biasTemp;
            node2.squash = squashTemp;
        }
    };
    return SwapNodesMutation;
}(Mutation));
exports.SwapNodesMutation = SwapNodesMutation;
/**
 * Array of all mutation methods
 */
var ALL_MUTATIONS = [
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
var FEEDFORWARD_MUTATIONS = [
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
var NO_STRUCTURE_MUTATIONS = [
    new ModWeightMutation(),
    new ModBiasMutation(),
    new ModActivationMutation(),
];
exports.NO_STRUCTURE_MUTATIONS = NO_STRUCTURE_MUTATIONS;
var ONLY_STRUCTURE = [
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
