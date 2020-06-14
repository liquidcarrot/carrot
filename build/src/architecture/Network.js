"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Network = void 0;
var os_1 = __importDefault(require("os"));
var threads_1 = require("threads");
var dist_1 = require("threads/dist");
require("threads/register");
var TimSort = __importStar(require("timsort"));
var NodeType_1 = require("../enums/NodeType");
var Loss_1 = require("../methods/Loss");
var Mutation_1 = require("../methods/Mutation");
var Rate_1 = require("../methods/Rate");
var NEAT_1 = require("../NEAT");
var Utils_1 = require("../utils/Utils");
var Node_1 = require("./Node");
/**
 * Create a neural network
 *
 * Networks are easy to create, all you need to specify is an `input` and an `output` size.
 *
 * @constructs Network
 */
var Network = /** @class */ (function () {
    function Network(inputSize, outputSize) {
        this.inputSize = inputSize;
        this.outputSize = outputSize;
        this.nodes = [];
        this.connections = new Set();
        this.gates = new Set();
        this.score = undefined;
        this.species = null;
        // Create input and output nodes
        for (var i = 0; i < inputSize; i++) {
            this.nodes.push(new Node_1.Node(NodeType_1.NodeType.INPUT));
        }
        for (var i = 0; i < outputSize; i++) {
            this.nodes.push(new Node_1.Node(NodeType_1.NodeType.OUTPUT));
        }
        // Connect input and output nodes
        for (var i = 0; i < this.inputSize; i++) {
            for (var j = this.inputSize; j < this.outputSize + this.inputSize; j++) {
                // https://stats.stackexchange.com/a/248040/147931
                var weight = (Math.random() - 0.5) * this.inputSize * Math.sqrt(2 / this.inputSize);
                this.connect(this.nodes[i], this.nodes[j], weight);
            }
        }
    }
    /**
     * Convert a json object to a network
     *
     * @param {{input:{number},output:{number},dropout:{number},nodes:Array<object>,connections:Array<object>}} json A network represented as a json object
     *
     * @returns {Network} Network A reconstructed network
     */
    Network.fromJSON = function (json) {
        var network = new Network(json.inputSize, json.outputSize);
        network.nodes = [];
        network.connections.clear();
        json.nodes
            .map(function (nodeJSON) { return new Node_1.Node().fromJSON(nodeJSON); })
            .forEach(function (node) { return network.nodes[node.index] = node; });
        json.connections.forEach(function (jsonConnection) {
            var connection = network.connect(network.nodes[jsonConnection.fromIndex], network.nodes[jsonConnection.toIndex], jsonConnection.weight);
            if (jsonConnection.gateNodeIndex != null) {
                network.addGate(network.nodes[jsonConnection.gateNodeIndex], connection);
            }
        });
        return network;
    };
    /**
     * Create an offspring from two parent networks.
     *
     * Networks are not required to have the same size, however input and output size should be the same!
     *
     * @todo Add custom [crossover](crossover) method customization
     *
     * @param {Network} network1 First parent network
     * @param {Network} network2 Second parent network
     * @param {boolean} [equal] Flag to indicate equally fit Networks
     *
     * @returns {Network} New network created from mixing parent networks
     */
    Network.crossOver = function (network1, network2) {
        var _a, _b;
        if (network1.inputSize !== network2.inputSize || network1.outputSize !== network2.outputSize) {
            throw new Error("Networks don`t have the same input/output size!");
        }
        // Initialise offspring
        var offspring = new Network(network1.inputSize, network1.outputSize);
        offspring.connections.clear(); // clear
        offspring.nodes = []; // clear
        // Save scores and create a copy
        var score1 = (_a = network1.score) !== null && _a !== void 0 ? _a : 0;
        var score2 = (_b = network2.score) !== null && _b !== void 0 ? _b : 0;
        // Determine offspring node size
        var offspringSize;
        if (score1 === score2) {
            var max = Math.max(network1.nodes.length, network2.nodes.length);
            var min = Math.min(network1.nodes.length, network2.nodes.length);
            offspringSize = Utils_1.randInt(min, max + 1); // [min,max]
        }
        else if (score1 > score2) {
            offspringSize = network1.nodes.length;
        }
        else {
            offspringSize = network2.nodes.length;
        }
        var inputSize = network1.inputSize;
        var outputSize = network1.outputSize;
        // set node indices
        for (var i = 0; i < network1.nodes.length; i++) {
            network1.nodes[i].index = i;
        }
        // set node indices
        for (var i = 0; i < network2.nodes.length; i++) {
            network2.nodes[i].index = i;
        }
        // Assign nodes from parents to offspring
        for (var i = 0; i < offspringSize; i++) {
            var chosenNode = void 0;
            var chosenNodeType = null;
            // decide what type of node is needed first check for input and output nodes and fill up with hidden nodes
            if (i < inputSize) { // pick input node
                chosenNodeType = NodeType_1.NodeType.INPUT;
                var sourceNetwork = Utils_1.randBoolean() ? network1 : network2;
                var inputNumber = -1;
                var j = -1;
                while (inputNumber < i) {
                    if (j++ >= sourceNetwork.nodes.length) {
                        throw RangeError('something is wrong with the size of the input');
                    }
                    if (sourceNetwork.nodes[j].isInputNode()) {
                        inputNumber++;
                    }
                }
                chosenNode = sourceNetwork.nodes[j];
            }
            else if (i < inputSize + outputSize) { // pick output node
                chosenNodeType = NodeType_1.NodeType.OUTPUT;
                var sourceNetwork = Utils_1.randBoolean() ? network1 : network2;
                var outputNumber = -1;
                var j = -1;
                while (outputNumber < i - inputSize) {
                    j++;
                    if (j >= sourceNetwork.nodes.length) {
                        throw RangeError('something is wrong with the size of the output');
                    }
                    if (sourceNetwork.nodes[j].isOutputNode()) {
                        outputNumber++;
                    }
                }
                chosenNode = sourceNetwork.nodes[j];
            }
            else { // pick hidden node
                chosenNodeType = NodeType_1.NodeType.HIDDEN;
                var sourceNetwork = void 0;
                if (i >= network1.nodes.length) {
                    sourceNetwork = network2;
                }
                else if (i >= network2.nodes.length) {
                    sourceNetwork = network1;
                }
                else {
                    sourceNetwork = Utils_1.randBoolean() ? network1 : network2;
                }
                chosenNode = Utils_1.pickRandom(sourceNetwork.nodes);
            }
            var newNode = new Node_1.Node(chosenNodeType);
            newNode.bias = chosenNode.bias;
            newNode.squash = chosenNode.squash;
            offspring.nodes.push(newNode);
        }
        // Create arrays of connection genes
        var n1connections = [];
        var n2connections = [];
        // Add the connections of network 1
        network1.connections.forEach(function (connection) {
            n1connections[Utils_1.pairing(connection.from.index, connection.to.index)] = connection.toJSON();
        });
        // Add the connections of network 2
        network2.connections.forEach(function (connection) {
            n2connections[Utils_1.pairing(connection.from.index, connection.to.index)] = connection.toJSON();
        });
        // Split common conn genes from disjoint or excess conn genes
        var connections = [];
        var keys1 = Object.keys(n1connections);
        var keys2 = Object.keys(n2connections);
        for (var i = keys1.length - 1; i >= 0; i--) {
            if (n2connections[parseInt(keys1[i])] !== undefined) {
                connections.push(Utils_1.randBoolean() ? n1connections[parseInt(keys1[i])] : n2connections[parseInt(keys1[i])]);
                n2connections[parseInt(keys1[i])] = undefined;
            }
            else if (score1 >= score2) {
                connections.push(n1connections[parseInt(keys1[i])]);
            }
        }
        // Excess/disjoint gene
        if (score2 >= score1) {
            keys2
                .map(function (key) { return parseInt(key); }) // convert to numbers
                .map(function (key) { return n2connections[key]; }) // get the connection
                .filter(function (conn) { return conn !== undefined; }) // filter out undefined connections
                .forEach(function (conn) { return connections.push(conn); }); // add the filtered connections
        }
        // Add common conn genes uniformly
        connections.forEach(function (connectionJSON) {
            if (connectionJSON !== undefined && connectionJSON.toIndex < offspringSize && connectionJSON.fromIndex < offspringSize) {
                var from = offspring.nodes[connectionJSON.fromIndex];
                var to = offspring.nodes[connectionJSON.toIndex];
                var connection = offspring.connect(from, to, connectionJSON.weight);
                if (connectionJSON.gateNodeIndex !== null && connectionJSON.gateNodeIndex < offspringSize) {
                    offspring.addGate(offspring.nodes[connectionJSON.gateNodeIndex], connection);
                }
            }
        });
        return offspring;
    };
    /**
     * Returns a copy of Network.
     * @returns {Network} Returns an identical network
     */
    Network.prototype.copy = function () {
        return Network.fromJSON(this.toJSON());
    };
    /**
     * Connects a Node to another Node or Group in the network
     *
     * @param {Node} from The source Node
     * @param {Node} to The destination Node or Group
     * @param {number} [weight=0] An initial weight for the connections to be formed
     *
     * @returns {Connection[]} An array of the formed connections
     */
    Network.prototype.connect = function (from, to, weight) {
        if (weight === void 0) { weight = 0; }
        var connection = from.connect(to, weight); // run node-level connect
        this.connections.add(connection); // add it to the array
        return connection;
    };
    /**
     * Activates the network
     *
     * It will activate all the nodes in activation order and produce an output.
     *
     * @param {number[]} [input] Input values to activate nodes with
     * @param options
     * @returns {number[]} Squashed output values
     */
    Network.prototype.activate = function (input, options) {
        var _a, _b;
        if (options === void 0) { options = {}; }
        if (input.length !== this.inputSize) {
            throw new RangeError("Input size of dataset is different to network input size!");
        }
        // get default value if no value is given
        options.dropoutRate = (_a = options.dropoutRate) !== null && _a !== void 0 ? _a : 0;
        options.trace = (_b = options.trace) !== null && _b !== void 0 ? _b : true;
        this.nodes
            .filter(function (node) { return node.isInputNode(); }) // only input nodes
            .forEach(function (node, index) { return node.activate(input[index], options.trace); }); // activate them with the input
        this.nodes
            .filter(function (node) { return node.isHiddenNode(); }) // only hidden nodes
            .forEach(function (node) {
            if (options.dropoutRate) {
                node.mask = Math.random() >= options.dropoutRate ? 1 : 0;
            }
            node.activate(undefined, options.trace); // activate them
        });
        return this.nodes
            .filter(function (node) { return node.isOutputNode(); }) // only output nodes
            .map(function (node) { return node.activate(undefined, options.trace); }); // map them to there activation value will give the network's output
    };
    /**
     * Backpropagate the network
     *
     * This function allows you to teach the network. If you want to do more complex training, use the `network.train()` function.
     *
     * @param {number[]} target Ideal values of the previous activate. Will use the difference to improve the weights
     * @param options More option for propagation
     */
    Network.prototype.propagate = function (target, options) {
        var _a, _b, _c;
        if (options === void 0) { options = {}; }
        // get default value if value isn't given
        options.rate = (_a = options.rate) !== null && _a !== void 0 ? _a : 0.3;
        options.momentum = (_b = options.momentum) !== null && _b !== void 0 ? _b : 0;
        options.update = (_c = options.update) !== null && _c !== void 0 ? _c : false;
        if (target.length !== this.outputSize) {
            throw new Error("Output target length should match network output length");
        }
        // Backpropagation: output -> hidden -> input
        // propagate through the output nodes
        this.nodes
            .filter(function (node) { return node.isOutputNode(); }) // only output nodes
            .forEach(function (node, index) { return node.propagate(target[index], options); }); // propagate
        // propagate backwards through the hidden nodes
        for (var i = this.nodes.length - 1; i >= 0; i--) {
            if (this.nodes[i].isHiddenNode()) { // only hidden nodes
                this.nodes[i].propagate(undefined, options);
            }
        }
        // propagate through the input nodes
        this.nodes
            .filter(function (node) { return node.isInputNode(); }) // only input nodes
            .forEach(function (node) { return node.propagate(undefined, options); }); // propagate
    };
    /**
     * Clear the context of the network
     */
    Network.prototype.clear = function () {
        this.nodes.forEach(function (node) { return node.clear(); });
    };
    /**
     * Removes the connection of the `from` node to the `to` node
     *
     * @param {Node} from Source node
     * @param {Node} to Destination node
     */
    Network.prototype.disconnect = function (from, to) {
        var _this = this;
        // remove the connection network-level
        this.connections.forEach(function (conn) {
            if (conn.from === from && conn.to === to) {
                if (conn.gateNode !== null) {
                    _this.removeGate(conn); // remove possible gate
                }
                _this.connections.delete(conn); // remove connection from array
            }
        });
        // disconnect node-level
        return from.disconnect(to);
    };
    /**
     * Makes a network node gate a connection
     *
     * @param {Node} node Gating node
     * @param {Connection} connection Connection to gate with node
     */
    Network.prototype.addGate = function (node, connection) {
        if (this.nodes.indexOf(node) === -1) {
            throw new ReferenceError("This node is not part of the network!");
        }
        else if (connection.gateNode != null) {
            return;
        }
        node.addGate(connection);
        this.gates.add(connection);
    };
    /**
     * Remove the gate of a connection.
     *
     * @param {Connection} connection Connection to remove gate from
     */
    Network.prototype.removeGate = function (connection) {
        if (!this.gates.has(connection)) {
            throw new Error("This connection is not gated!");
        }
        this.gates.delete(connection);
        if (connection.gateNode != null) {
            connection.gateNode.removeGate(connection);
        }
    };
    /**
     * Removes a node from a network, all its connections will be redirected. If it gates a connection, the gate will be removed.
     *
     * @param {Node} node Node to remove from the network
     * @param keepGates
     */
    Network.prototype.removeNode = function (node, keepGates) {
        var _this = this;
        if (keepGates === void 0) { keepGates = new Mutation_1.SubNodeMutation().keepGates; }
        if (!this.nodes.includes(node)) {
            throw new ReferenceError("This node does not exist in the network!");
        }
        this.disconnect(node, node); // remove self connection
        var inputs = []; // keep track
        var gates = []; // keep track
        var outputs = []; // keep track
        var connections = []; // keep track
        // read all inputs from node and keep track of the nodes that gate the incoming connection
        node.incoming.forEach(function (connection) {
            if (keepGates && connection.gateNode !== null && connection.gateNode !== node) {
                gates.push(connection.gateNode);
            }
            inputs.push(connection.from);
            _this.disconnect(connection.from, node);
        });
        // read all outputs from node and keep track of the nodes that gate the outgoing connection
        node.outgoing.forEach(function (connection) {
            if (keepGates && connection.gateNode !== null && connection.gateNode !== node) {
                gates.push(connection.gateNode);
            }
            outputs.push(connection.to);
            _this.disconnect(node, connection.to);
        });
        // add all connections the node has
        inputs.forEach(function (input) {
            outputs.forEach(function (output) {
                if (!input.isProjectingTo(output)) {
                    connections.push(_this.connect(input, output));
                }
            });
        });
        // as long as there are gates and connections
        while (gates.length > 0 && connections.length > 0) {
            var gate = gates.shift(); // take a gate node and remove it from the array
            if (gate === undefined) {
                continue;
            }
            var connection = Utils_1.pickRandom(connections); // take a random connection
            this.addGate(gate, connection); // gate the connection with the gate node
            Utils_1.removeFromArray(connections, connection); // remove the connection from the array
        }
        // remove every gate the node has
        node.gated.forEach(this.removeGate);
        Utils_1.removeFromArray(this.nodes, node); // remove the node from the nodes array
    };
    /**
     * Mutates the network with the given method.
     *
     * @param {Mutation} method [Mutation method](mutation)
     * @param {object} options
     * @param {number} [options.maxNodes]
     * @param {number} [options.maxConnections]
     * @param {number} [options.maxGates] Maximum amount of Gates a network can grow to
     */
    Network.prototype.mutate = function (method, options) {
        method.mutate(this, options);
    };
    /**
     * Selects a random mutation method and returns a mutated copy of the network. Warning! Mutates network directly.
     *
     * @param {Mutation[]} [allowedMethods=methods.mutation.ALL] An array of [Mutation methods](mutation) to automatically pick from
     * @param {object} options
     * @param {number} [options.maxNodes] Maximum amount of [Nodes](node) a network can grow to
     * @param {number} [options.maxConnections] Maximum amount of [Connections](connection) a network can grow to
     * @param {number} [options.maxGates] Maximum amount of Gates a network can grow to
     */
    Network.prototype.mutateRandom = function (allowedMethods, options) {
        if (allowedMethods === void 0) { allowedMethods = Mutation_1.ALL_MUTATIONS; }
        if (options === void 0) { options = {}; }
        if (allowedMethods.length === 0) {
            return;
        }
        // mutate the network with a random allowed mutation
        this.mutate(Utils_1.pickRandom(allowedMethods), options);
    };
    /**
     * Train the given data to this network
     *
     * @param {TrainOptions} options Options used to train network
     *
     * @returns {{error:{number},iterations:{number},time:{number}}} A summary object of the network's performance
     */
    Network.prototype.train = function (options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        if (!options.dataset || options.dataset[0].input.length !== this.inputSize || options.dataset[0].output.length !== this.outputSize) {
            throw new Error("Dataset input/output size should be same as network input/output size!");
        }
        // Use the default values, if no value is given
        options.iterations = (_a = options.iterations) !== null && _a !== void 0 ? _a : -1;
        options.error = (_b = options.error) !== null && _b !== void 0 ? _b : -1;
        options.loss = (_c = options.loss) !== null && _c !== void 0 ? _c : Loss_1.MSELoss;
        options.dropout = (_d = options.dropout) !== null && _d !== void 0 ? _d : 0;
        options.momentum = (_e = options.momentum) !== null && _e !== void 0 ? _e : 0;
        options.batchSize = Math.min(options.dataset.length, (_f = options.batchSize) !== null && _f !== void 0 ? _f : options.dataset.length);
        var baseRate = (_g = options.rate) !== null && _g !== void 0 ? _g : 0.3;
        options.ratePolicy = (_h = options.ratePolicy) !== null && _h !== void 0 ? _h : new Rate_1.FixedRate(baseRate);
        options.log = (_j = options.log) !== null && _j !== void 0 ? _j : NaN;
        var start = Date.now();
        if (options.iterations <= 0 && options.error <= 0) {
            throw new Error("At least one of the following options must be specified: error, iterations");
        }
        // Split into trainingSet and testSet if cross validation is enabled
        var trainingSetSize;
        var trainingSet;
        var testSet;
        if (options.crossValidateTestSize && options.crossValidateTestSize > 0) {
            trainingSetSize = Math.ceil((1 - options.crossValidateTestSize) * options.dataset.length);
            trainingSet = options.dataset.slice(0, trainingSetSize);
            testSet = options.dataset.slice(trainingSetSize);
        }
        else {
            trainingSet = options.dataset;
            testSet = [];
        }
        var currentTrainingRate;
        var iterationCount = 0;
        var error = 1;
        // train until the target error is reached or the target iterations are reached
        while (error > options.error && (options.iterations <= 0 || iterationCount < options.iterations)) {
            iterationCount++;
            // update the rate according to the rate policy
            currentTrainingRate = options.ratePolicy.calc(iterationCount);
            // train a single epoch
            var trainError = this.trainEpoch(__assign(__assign({}, options), { dataset: trainingSet, trainingRate: currentTrainingRate }));
            if (!Number.isFinite(trainError)) {
                throw new RangeError();
            }
            if (options.clear) {
                this.clear();
            }
            // Run test with the testSet, if cross validation is enabled
            if (options.crossValidateTestSize) {
                error = this.test(testSet, options.loss);
                if (options.clear) {
                    this.clear();
                }
            }
            else {
                error = trainError;
            }
            if ((_k = options.shuffle) !== null && _k !== void 0 ? _k : false) {
                Utils_1.shuffle(options.dataset);
            }
            if (options.log > 0 && iterationCount % options.log === 0) {
                console.log("iteration number", iterationCount, "error", error, "training rate", currentTrainingRate);
            }
            if (options.schedule && iterationCount % options.schedule.iterations === 0) {
                options.schedule.function(error, iterationCount);
            }
        }
        if (options.clear) {
            this.clear();
        }
        return {
            error: error,
            iterations: iterationCount,
            time: Date.now() - start
        };
    };
    /**
     * Tests a set and returns the error and elapsed time
     *
     * @param {Array<{input:number[],output:number[]}>} dataset A set of input values and ideal output values to test the network against
     * @param {lossType} [loss=MSELoss] The [loss function](https://en.wikipedia.org/wiki/Loss_function) used to determine network error
     *
     * @returns {number} A summary object of the network's performance
     */
    Network.prototype.test = function (dataset, loss) {
        if (loss === void 0) { loss = Loss_1.MSELoss; }
        var error = 0;
        for (var _i = 0, dataset_1 = dataset; _i < dataset_1.length; _i++) {
            var entry = dataset_1[_i];
            var input = entry.input;
            var target = entry.output;
            var output = this.activate(input, { trace: false });
            error += loss(target, output);
        }
        return error / dataset.length;
    };
    /**
     * Convert the network to a json object
     *
     * @returns {NetworkJSON} The network represented as a json object
     */
    Network.prototype.toJSON = function () {
        var json = {
            nodes: [],
            connections: [],
            inputSize: this.inputSize,
            outputSize: this.outputSize,
        };
        // set node indices
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].index = i;
        }
        // convert all nodes to json and add the to the json object
        this.nodes.forEach(function (node) {
            json.nodes.push(node.toJSON());
            if (node.selfConnection.weight !== 0) {
                // if there is a self connection
                // add it to the json object
                json.connections.push(node.selfConnection.toJSON());
            }
        });
        this.connections.forEach(function (conn) {
            json.connections.push(conn.toJSON());
        });
        return json;
    };
    /**
     * Evolves the network to reach a lower error on a dataset using the [NEAT algorithm](http://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf)
     *
     * If both `iterations` and `error` options are unset, evolve will default to `iterations` as an end condition.
     *
     * @param {object} [options] Configuration options
     *
     * @returns {{error:{number},iterations:{number},time:{number}}} A summary object of the network's performance. <br /> Properties include: `error` - error of the best genome, `iterations` - generations used to evolve networks, `time` - clock time elapsed while evolving
     */
    Network.prototype.evolve = function (options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var targetError, start, workerPool, serializedDataSet_1, lossIndex_1, neat, error, bestFitness, bestGenome, fittest;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        if (!options.fitnessFunction && options.dataset && (options.dataset[0].input.length !== this.inputSize || options.dataset[0].output.length !== this.outputSize)) {
                            throw new Error("Dataset input/output size should be same as network input/output size!");
                        }
                        targetError = 0;
                        if (typeof options.iterations === "undefined" && typeof options.error === "undefined") {
                            options.iterations = 1000;
                            targetError = 0.05;
                        }
                        else if (options.iterations) {
                            targetError = -1; // run until iterations
                        }
                        else if (options.error) {
                            targetError = options.error;
                            options.iterations = 0; // run until error
                        }
                        // set options to default if necessary
                        options.loss = (_a = options.loss) !== null && _a !== void 0 ? _a : Loss_1.MSELoss;
                        options.maxNodes = (_b = options.maxNodes) !== null && _b !== void 0 ? _b : Infinity;
                        options.maxConnections = (_c = options.maxConnections) !== null && _c !== void 0 ? _c : Infinity;
                        options.maxGates = (_d = options.maxGates) !== null && _d !== void 0 ? _d : Infinity;
                        options.input = this.inputSize;
                        options.output = this.outputSize;
                        start = Date.now();
                        if (!options.fitnessFunction) {
                            serializedDataSet_1 = JSON.stringify(options.dataset);
                            lossIndex_1 = Object.values(Loss_1.ALL_LOSSES).indexOf((_e = options.loss) !== null && _e !== void 0 ? _e : Loss_1.MSELoss);
                            // init a pool of workers
                            workerPool = dist_1.Pool(function () { return threads_1.spawn(new threads_1.Worker("../multithreading/TestWorker")); }, (_f = options.threads) !== null && _f !== void 0 ? _f : os_1.default.cpus().length);
                            options.fitnessFunction = function (population) {
                                return __awaiter(this, void 0, void 0, function () {
                                    var _loop_1, _i, population_1, genome;
                                    var _this = this;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                _loop_1 = function (genome) {
                                                    // add a task to the workerPool's queue
                                                    workerPool.queue(function (test) { return __awaiter(_this, void 0, void 0, function () {
                                                        var _a;
                                                        return __generator(this, function (_b) {
                                                            switch (_b.label) {
                                                                case 0:
                                                                    if (genome === undefined) {
                                                                        throw new ReferenceError();
                                                                    }
                                                                    // test the genome
                                                                    _a = genome;
                                                                    return [4 /*yield*/, test(serializedDataSet_1, JSON.stringify(genome.toJSON()), lossIndex_1)];
                                                                case 1:
                                                                    // test the genome
                                                                    _a.score = -(_b.sent());
                                                                    if (!Number.isFinite(genome.score)) {
                                                                        throw new RangeError();
                                                                    }
                                                                    return [2 /*return*/];
                                                            }
                                                        });
                                                    }); });
                                                };
                                                for (_i = 0, population_1 = population; _i < population_1.length; _i++) {
                                                    genome = population_1[_i];
                                                    _loop_1(genome);
                                                }
                                                return [4 /*yield*/, workerPool.completed()];
                                            case 1:
                                                _a.sent(); // wait until every task is done
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            };
                        }
                        options.template = this; // set this network as template for first generation
                        neat = new NEAT_1.NEAT(options);
                        bestFitness = 0;
                        bestGenome = this;
                        _k.label = 1;
                    case 1: return [4 /*yield*/, neat.evolve()];
                    case 2:
                        fittest = _k.sent();
                        if (!fittest.score) {
                            throw new ReferenceError();
                        }
                        error = fittest.score;
                        if (neat.generation === 1 || fittest.score > bestFitness) {
                            bestFitness = fittest.score;
                            bestGenome = fittest;
                        }
                        if (((_g = options.log) !== null && _g !== void 0 ? _g : 0) > 0 && neat.generation % ((_h = options.log) !== null && _h !== void 0 ? _h : 0) === 0) {
                            console.log("iteration", neat.generation, "error", -error);
                        }
                        if (options.schedule && neat.generation % options.schedule.iterations === 0) {
                            options.schedule.function(fittest.score, -error, neat.generation);
                        }
                        _k.label = 3;
                    case 3:
                        if (error < -targetError && (options.iterations === 0 || neat.generation < ((_j = options.iterations) !== null && _j !== void 0 ? _j : 0))) return [3 /*break*/, 1];
                        _k.label = 4;
                    case 4:
                        if (bestGenome !== undefined) {
                            // set this network to the fittest from NEAT
                            this.nodes = bestGenome.nodes;
                            this.connections = bestGenome.connections;
                            this.gates = bestGenome.gates;
                            if (options.clear) {
                                this.clear();
                            }
                        }
                        if (!workerPool) return [3 /*break*/, 6];
                        return [4 /*yield*/, workerPool.terminate()];
                    case 5:
                        _k.sent(); // stop all processes
                        _k.label = 6;
                    case 6: return [2 /*return*/, {
                            error: -error,
                            iterations: neat.generation,
                            time: Date.now() - start,
                        }];
                }
            });
        });
    };
    /**
     * Distance function
     * @param g2 other network
     */
    Network.prototype.distance = function (g2) {
        var g1 = this;
        // set node indices
        for (var i = 0; i < g1.nodes.length; i++) {
            g1.nodes[i].index = i;
        }
        // set node indices
        for (var i = 0; i < g2.nodes.length; i++) {
            g2.nodes[i].index = i;
        }
        var indexG1 = 0;
        var indexG2 = 0;
        var connections1 = Array.from(g1.connections).filter(function (conn) { return conn !== undefined; });
        var connections2 = Array.from(g2.connections).filter(function (conn) { return conn !== undefined; });
        TimSort.sort(connections1, function (a, b) {
            return a.getInnovationID() - b.getInnovationID();
        });
        TimSort.sort(connections2, function (a, b) {
            return a.getInnovationID() - b.getInnovationID();
        });
        var highestInnovationID1 = connections1[connections1.length - 1].getInnovationID();
        var highestInnovationID2 = connections2[connections2.length - 1].getInnovationID();
        if (highestInnovationID1 < highestInnovationID2) {
            var temp = g1;
            g1 = g2;
            g2 = temp;
        }
        var disjointGenes = 0;
        var totalWeightDiff = 0;
        var similarGenes = 0;
        while (indexG1 < connections1.length && indexG2 < connections2.length) {
            var gene1 = connections1[indexG1];
            var gene2 = connections2[indexG2];
            if (gene1 === undefined || gene2 === undefined) {
                throw Error("HERE");
            }
            var in1 = gene1.getInnovationID();
            var in2 = gene2.getInnovationID();
            if (in1 === in2) {
                // similarGenes
                indexG1++;
                indexG2++;
                totalWeightDiff += Math.abs(gene1.weight - gene2.weight);
                similarGenes++;
            }
            else if (indexG1 > indexG2) {
                // disjoint of b
                indexG2++;
                disjointGenes++;
            }
            else {
                // disjoint of a
                indexG1++;
                disjointGenes++;
            }
        }
        totalWeightDiff /= similarGenes;
        var excessGenes = g1.connections.size - indexG1;
        var N = Math.max(g1.connections.size, g2.connections.size);
        if (N < 20) {
            N = 1;
        }
        return NEAT_1.NEAT.C1 * excessGenes / N + NEAT_1.NEAT.C2 * disjointGenes / N + NEAT_1.NEAT.C3 * totalWeightDiff;
    };
    /**
     * Performs one training epoch and returns the error - this is a private function used in `self.train`
     *
     * @private
     *
     * @returns {number}
     */
    Network.prototype.trainEpoch = function (options) {
        var _a, _b, _c;
        var errorSum = 0;
        for (var i = 0; i < options.dataset.length; i++) {
            var input = options.dataset[i].input;
            var correctOutput = options.dataset[i].output;
            var update = (i + 1) % ((_a = options.batchSize) !== null && _a !== void 0 ? _a : options.dataset.length) === 0 || i + 1 === options.dataset.length;
            var output = this.activate(input, { dropoutRate: (_b = options.dropoutRate) !== null && _b !== void 0 ? _b : 0.5 });
            this.propagate(correctOutput, { rate: options.trainingRate, momentum: options.momentum, update: update });
            errorSum += ((_c = options.loss) !== null && _c !== void 0 ? _c : Loss_1.MSELoss)(correctOutput, output);
        }
        return errorSum / options.dataset.length;
    };
    return Network;
}());
exports.Network = Network;
