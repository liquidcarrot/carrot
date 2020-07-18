"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Network = void 0;
const threads_1 = require("threads");
const dist_1 = require("threads/dist");
require("threads/register");
const TimSort = __importStar(require("timsort"));
const NodeType_1 = require("../enums/NodeType");
const EvolveOptions_1 = require("../interfaces/EvolveOptions");
const Loss_1 = require("../methods/Loss");
const Mutation_1 = require("../methods/Mutation");
const NEAT_1 = require("../NEAT");
const Utils_1 = require("../utils/Utils");
const Node_1 = require("./Node");
/**
 * Create a neural network
 *
 * Networks are easy to create, all you need to specify is an `input` and an `output` size.
 *
 * @constructs Network
 */
class Network {
    constructor(inputSize, outputSize) {
        this.inputSize = inputSize;
        this.outputSize = outputSize;
        this.nodes = [];
        this.connections = new Set();
        this.gates = new Set();
        this.score = undefined;
        this.species = null;
        // Create input and output nodes
        for (let i = 0; i < inputSize; i++) {
            this.nodes.push(new Node_1.Node(NodeType_1.NodeType.INPUT));
        }
        for (let i = 0; i < outputSize; i++) {
            this.nodes.push(new Node_1.Node(NodeType_1.NodeType.OUTPUT));
        }
        // Connect input and output nodes
        for (let i = 0; i < this.inputSize; i++) {
            for (let j = this.inputSize; j < this.outputSize + this.inputSize; j++) {
                // https://stats.stackexchange.com/a/248040/147931
                const weight = (Math.random() - 0.5) * this.inputSize * Math.sqrt(2 / this.inputSize);
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
    static fromJSON(json) {
        const network = new Network(json.inputSize, json.outputSize);
        network.nodes = [];
        network.connections.clear();
        json.nodes
            .map(nodeJSON => new Node_1.Node().fromJSON(nodeJSON))
            .forEach(node => network.nodes[node.index] = node);
        json.connections.forEach((jsonConnection) => {
            const connection = network.connect(network.nodes[jsonConnection.fromIndex], network.nodes[jsonConnection.toIndex], jsonConnection.weight);
            if (jsonConnection.gateNodeIndex != null) {
                network.addGate(network.nodes[jsonConnection.gateNodeIndex], connection);
            }
        });
        return network;
    }
    /**
     * Create an offspring from two parent networks.
     *
     * Networks are not required to have the same size, however input and output size should be the same!
     *
     * @todo Add custom [crossover](crossover) method customization
     *
     * @param {Network} network1 First parent network
     * @param {Network} network2 Second parent network
     *
     * @returns {Network} New network created from mixing parent networks
     */
    static crossOver(network1, network2) {
        var _a, _b;
        if (network1.inputSize !== network2.inputSize || network1.outputSize !== network2.outputSize) {
            throw new Error("Networks don`t have the same input/output size!");
        }
        // Initialise offspring
        const offspring = new Network(network1.inputSize, network1.outputSize);
        offspring.connections.clear(); // clear
        offspring.nodes = []; // clear
        // Save scores and create a copy
        const score1 = (_a = network1.score) !== null && _a !== void 0 ? _a : 0;
        const score2 = (_b = network2.score) !== null && _b !== void 0 ? _b : 0;
        // Determine offspring node size
        let offspringSize;
        if (score1 === score2) {
            const max = Math.max(network1.nodes.length, network2.nodes.length);
            const min = Math.min(network1.nodes.length, network2.nodes.length);
            offspringSize = Utils_1.randInt(min, max + 1); // [min,max]
        }
        else if (score1 > score2) {
            offspringSize = network1.nodes.length;
        }
        else {
            offspringSize = network2.nodes.length;
        }
        const inputSize = network1.inputSize;
        const outputSize = network1.outputSize;
        // set node indices
        for (let i = 0; i < network1.nodes.length; i++) {
            network1.nodes[i].index = i;
        }
        // set node indices
        for (let i = 0; i < network2.nodes.length; i++) {
            network2.nodes[i].index = i;
        }
        // Assign nodes from parents to offspring
        for (let i = 0; i < offspringSize; i++) {
            let chosenNode;
            let chosenNodeType = null;
            // decide what type of node is needed first check for input and output nodes and fill up with hidden nodes
            if (i < inputSize) { // pick input node
                chosenNodeType = NodeType_1.NodeType.INPUT;
                const sourceNetwork = Utils_1.randBoolean() ? network1 : network2;
                let inputNumber = -1;
                let j = -1;
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
                const sourceNetwork = Utils_1.randBoolean() ? network1 : network2;
                let outputNumber = -1;
                let j = -1;
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
                let sourceNetwork;
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
            const newNode = new Node_1.Node(chosenNodeType);
            newNode.bias = chosenNode.bias;
            newNode.squash = chosenNode.squash;
            offspring.nodes.push(newNode);
        }
        // Create arrays of connection genes
        const n1connections = [];
        const n2connections = [];
        // Add the connections of network 1
        network1.connections.forEach(connection => {
            n1connections[Utils_1.pairing(connection.from.index, connection.to.index)] = connection.toJSON();
        });
        // Add the connections of network 2
        network2.connections.forEach(connection => {
            n2connections[Utils_1.pairing(connection.from.index, connection.to.index)] = connection.toJSON();
        });
        // Split common conn genes from disjoint or excess conn genes
        const connections = [];
        const keys1 = Object.keys(n1connections);
        const keys2 = Object.keys(n2connections);
        for (let i = keys1.length - 1; i >= 0; i--) {
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
                .map(key => parseInt(key)) // convert to numbers
                .map(key => n2connections[key]) // get the connection
                .filter(conn => conn !== undefined) // filter out undefined connections
                .forEach(conn => connections.push(conn)); // add the filtered connections
        }
        // Add common conn genes uniformly
        connections.forEach(connectionJSON => {
            if (connectionJSON !== undefined && connectionJSON.toIndex < offspringSize && connectionJSON.fromIndex < offspringSize) {
                const from = offspring.nodes[connectionJSON.fromIndex];
                const to = offspring.nodes[connectionJSON.toIndex];
                const connection = offspring.connect(from, to, connectionJSON.weight);
                if (connectionJSON.gateNodeIndex !== null && connectionJSON.gateNodeIndex < offspringSize) {
                    offspring.addGate(offspring.nodes[connectionJSON.gateNodeIndex], connection);
                }
            }
        });
        return offspring;
    }
    /**
     * Returns a copy of Network.
     * @returns {Network} Returns an identical network
     */
    copy() {
        return Network.fromJSON(this.toJSON());
    }
    /**
     * Connects a Node to another Node or Group in the network
     *
     * @param {Node} from The source Node
     * @param {Node} to The destination Node or Group
     * @param {number} [weight=0] An initial weight for the connections to be formed
     *
     * @returns {Connection[]} An array of the formed connections
     */
    connect(from, to, weight = 0) {
        const connection = from.connect(to, weight); // run node-level connect
        this.connections.add(connection); // add it to the array
        return connection;
    }
    /**
     * Activates the network
     *
     * It will activate all the nodes in activation order and produce an output.
     *
     * @param {number[]} [input] Input values to activate nodes with
     * @param options
     * @returns {number[]} Squashed output values
     */
    activate(input, options = {}) {
        var _a, _b;
        if (input.length !== this.inputSize) {
            throw new RangeError("Input size of dataset is different to network input size!");
        }
        // get default value if no value is given
        options.dropoutRate = (_a = options.dropoutRate) !== null && _a !== void 0 ? _a : 0;
        options.trace = (_b = options.trace) !== null && _b !== void 0 ? _b : true;
        this.nodes
            .filter(node => node.isInputNode()) // only input nodes
            .forEach((node, index) => node.activate(input[index], options.trace)); // activate them with the input
        this.nodes
            .filter(node => node.isHiddenNode()) // only hidden nodes
            .forEach((node) => {
            if (options.dropoutRate) {
                node.mask = Math.random() >= options.dropoutRate ? 1 : 0;
            }
            node.activate(undefined, options.trace); // activate them
        });
        return this.nodes
            .filter(node => node.isOutputNode()) // only output nodes
            .map((node) => node.activate(undefined, options.trace)); // map them to there activation value will give the network's output
    }
    /**
     * Backpropagate the network
     *
     * This function allows you to teach the network. If you want to do more complex training, use the `network.train()` function.
     *
     * @param {number[]} target Ideal values of the previous activate. Will use the difference to improve the weights
     * @param options More option for propagation
     */
    propagate(target, options = {}) {
        var _a, _b, _c;
        // get default value if value isn't given
        options.rate = (_a = options.rate) !== null && _a !== void 0 ? _a : 0.3;
        options.momentum = (_b = options.momentum) !== null && _b !== void 0 ? _b : 0;
        options.update = (_c = options.update) !== null && _c !== void 0 ? _c : false;
        if (target.length !== this.outputSize) {
            throw new Error(`Output target length should match network output length`);
        }
        // Backpropagation: output -> hidden -> input
        // propagate through the output nodes
        this.nodes
            .filter(node => node.isOutputNode()) // only output nodes
            .forEach((node, index) => node.propagate(target[index], options)); // propagate
        // propagate backwards through the hidden nodes
        for (let i = this.nodes.length - 1; i >= 0; i--) {
            if (this.nodes[i].isHiddenNode()) { // only hidden nodes
                this.nodes[i].propagate(undefined, options);
            }
        }
        // propagate through the input nodes
        this.nodes
            .filter(node => node.isInputNode()) // only input nodes
            .forEach(node => node.propagate(undefined, options)); // propagate
    }
    /**
     * Clear the context of the network
     */
    clear() {
        this.nodes.forEach(node => node.clear());
    }
    /**
     * Removes the connection of the `from` node to the `to` node
     *
     * @param {Node} from Source node
     * @param {Node} to Destination node
     */
    disconnect(from, to) {
        // remove the connection network-level
        this.connections.forEach((conn) => {
            if (conn.from === from && conn.to === to) {
                if (conn.gateNode !== null) {
                    this.removeGate(conn); // remove possible gate
                }
                this.connections.delete(conn); // remove connection from array
            }
        });
        // disconnect node-level
        return from.disconnect(to);
    }
    /**
     * Makes a network node gate a connection
     *
     * @param {Node} node Gating node
     * @param {Connection} connection Connection to gate with node
     */
    addGate(node, connection) {
        if (this.nodes.indexOf(node) === -1) {
            throw new ReferenceError(`This node is not part of the network!`);
        }
        else if (connection.gateNode != null) {
            return;
        }
        node.addGate(connection);
        this.gates.add(connection);
    }
    /**
     * Remove the gate of a connection.
     *
     * @param {Connection} connection Connection to remove gate from
     */
    removeGate(connection) {
        if (!this.gates.has(connection)) {
            throw new Error(`This connection is not gated!`);
        }
        this.gates.delete(connection);
        if (connection.gateNode != null) {
            connection.gateNode.removeGate(connection);
        }
    }
    /**
     * Removes a node from a network, all its connections will be redirected. If it gates a connection, the gate will be removed.
     *
     * @param {Node} node Node to remove from the network
     * @param keepGates
     */
    removeNode(node, keepGates = new Mutation_1.SubNodeMutation().keepGates) {
        if (!this.nodes.includes(node)) {
            throw new ReferenceError(`This node does not exist in the network!`);
        }
        this.disconnect(node, node); // remove self connection
        const inputs = []; // keep track
        const gates = []; // keep track
        const outputs = []; // keep track
        const connections = []; // keep track
        // read all inputs from node and keep track of the nodes that gate the incoming connection
        node.incoming.forEach(connection => {
            if (keepGates && connection.gateNode !== null && connection.gateNode !== node) {
                gates.push(connection.gateNode);
            }
            inputs.push(connection.from);
            this.disconnect(connection.from, node);
        });
        // read all outputs from node and keep track of the nodes that gate the outgoing connection
        node.outgoing.forEach(connection => {
            if (keepGates && connection.gateNode !== null && connection.gateNode !== node) {
                gates.push(connection.gateNode);
            }
            outputs.push(connection.to);
            this.disconnect(node, connection.to);
        });
        // add all connections the node has
        inputs.forEach(input => {
            outputs.forEach(output => {
                if (!input.isProjectingTo(output)) {
                    connections.push(this.connect(input, output));
                }
            });
        });
        // as long as there are gates and connections
        while (gates.length > 0 && connections.length > 0) {
            const gate = gates.shift(); // take a gate node and remove it from the array
            if (gate === undefined) {
                continue;
            }
            const connection = Utils_1.pickRandom(connections); // take a random connection
            this.addGate(gate, connection); // gate the connection with the gate node
            Utils_1.removeFromArray(connections, connection); // remove the connection from the array
        }
        // remove every gate the node has
        node.gated.forEach(this.removeGate);
        Utils_1.removeFromArray(this.nodes, node); // remove the node from the nodes array
    }
    /**
     * Mutates the network with the given method.
     *
     * @param {Mutation} method [Mutation method](mutation)
     * @param {object} options
     * @param {number} [options.maxNodes]
     * @param {number} [options.maxConnections]
     * @param {number} [options.maxGates] Maximum amount of Gates a network can grow to
     */
    mutate(method, options) {
        method.mutate(this, options);
    }
    /**
     * Selects a random mutation method and returns a mutated copy of the network. Warning! Mutates network directly.
     *
     * @param {Mutation[]} [allowedMethods=methods.mutation.ALL] An array of [Mutation methods](mutation) to automatically pick from
     * @param {object} options
     * @param {number} [options.maxNodes] Maximum amount of [Nodes](node) a network can grow to
     * @param {number} [options.maxConnections] Maximum amount of [Connections](connection) a network can grow to
     * @param {number} [options.maxGates] Maximum amount of Gates a network can grow to
     */
    mutateRandom(allowedMethods = Mutation_1.ALL_MUTATIONS, options = {}) {
        if (allowedMethods.length === 0) {
            return;
        }
        // mutate the network with a random allowed mutation
        this.mutate(Utils_1.pickRandom(allowedMethods), options);
    }
    /**
     * Train the given data to this network
     *
     * @param {TrainOptions} options Options used to train network
     *
     * @returns {{error:{number},iterations:{number},time:{number}}} A summary object of the network's performance
     */
    train(options) {
        if (options.dataset[0].input.length !== this.inputSize || options.dataset[0].output.length !== this.outputSize) {
            throw new Error(`Dataset input/output size should be same as network input/output size!`);
        }
        const start = Date.now();
        if (options.iterations <= 0 && options.error <= 0) {
            throw new Error(`At least one of the following options must be specified: error, iterations`);
        }
        // Split into trainingSet and testSet if cross validation is enabled
        let trainingSetSize;
        let trainingSet;
        let testSet;
        if (options.crossValidateTestSize > 0) {
            trainingSetSize = Math.ceil((1 - options.crossValidateTestSize) * options.dataset.length);
            trainingSet = options.dataset.slice(0, trainingSetSize);
            testSet = options.dataset.slice(trainingSetSize);
        }
        else {
            trainingSet = options.dataset;
            testSet = [];
        }
        let currentTrainingRate;
        let iterationCount = 0;
        let error = 1;
        // train until the target error is reached or the target iterations are reached
        while (error > options.error && (options.iterations <= 0 || iterationCount < options.iterations)) {
            iterationCount++;
            // update the rate according to the rate policy
            currentTrainingRate = options.rate.calc(iterationCount);
            // train a single epoch
            error = this.trainEpoch({
                dataset: trainingSet,
                batchSize: options.batchSize,
                trainingRate: currentTrainingRate,
                momentum: options.momentum,
                loss: options.loss,
                dropoutRate: options.dropout
            });
            if (options.clear) {
                this.clear();
            }
            // Run test with the testSet, if cross validation is enabled
            if (options.crossValidateTestSize > 0) {
                error = this.test(testSet, options.loss);
                if (options.clear) {
                    this.clear();
                }
            }
            if (options.shuffle) {
                Utils_1.shuffle(options.dataset);
            }
            if (options.log > 0 && iterationCount % options.log === 0) {
                console.log(`iteration number`, iterationCount, `error`, error, `training rate`, currentTrainingRate);
            }
            if (options.schedule && iterationCount % options.schedule.iterations === 0) {
                options.schedule.function(error, iterationCount);
            }
        }
        if (options.clear) {
            this.clear();
        }
        return {
            error,
            iterations: iterationCount,
            time: Date.now() - start
        };
    }
    /**
     * Tests a set and returns the error and elapsed time
     *
     * @param {Array<{input:number[],output:number[]}>} dataset A set of input values and ideal output values to test the network against
     * @param {lossType} [loss=MSELoss] The [loss function](https://en.wikipedia.org/wiki/Loss_function) used to determine network error
     *
     * @returns {number} A summary object of the network's performance
     */
    test(dataset, loss = Loss_1.MSELoss) {
        let error = 0;
        for (const entry of dataset) {
            const input = entry.input;
            const target = entry.output;
            const output = this.activate(input, { trace: false });
            error += loss(target, output);
        }
        return error / dataset.length;
    }
    /**
     * Convert the network to a json object
     *
     * @returns {NetworkJSON} The network represented as a json object
     */
    toJSON() {
        const json = {
            nodes: [],
            connections: [],
            inputSize: this.inputSize,
            outputSize: this.outputSize,
        };
        // set node indices
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].index = i;
        }
        // convert all nodes to json and add the to the json object
        this.nodes.forEach(node => {
            json.nodes.push(node.toJSON());
            if (node.selfConnection.weight !== 0) {
                // if there is a self connection
                // add it to the json object
                json.connections.push(node.selfConnection.toJSON());
            }
        });
        this.connections.forEach(conn => {
            json.connections.push(conn.toJSON());
        });
        return json;
    }
    /**
     * Evolves the network to reach a lower error on a dataset using the [NEAT algorithm](http://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf)
     *
     * If both `iterations` and `error` options are unset, evolve will default to `iterations` as an end condition.
     *
     * @param {object} [options] Configuration options
     *
     * @returns {{error:{number},iterations:{number},time:{number}}} A summary object of the network's performance. <br /> Properties include: `error` - error of the best genome, `iterations` - generations used to evolve networks, `time` - clock time elapsed while evolving
     */
    evolve(options = new EvolveOptions_1.EvolveOptions()) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!options.fitnessFunction && options.dataset && (options.dataset[0].input.length !== this.inputSize || options.dataset[0].output.length !== this.outputSize)) {
                throw new Error(`Dataset input/output size should be same as network input/output size!`);
            }
            // set options to default if necessary
            options.input = this.inputSize;
            options.output = this.outputSize;
            const start = Date.now();
            // @ts-ignore
            let workerPool;
            if (!options.fitnessFunction) {
                // if no fitness function is given
                // create default one
                // Serialize the dataset using JSON
                const serializedDataSet = JSON.stringify(options.dataset);
                const lossIndex = Object.values(Loss_1.ALL_LOSSES).indexOf(options.loss);
                // init a pool of workers
                workerPool = dist_1.Pool(() => threads_1.spawn(new threads_1.Worker("../multithreading/TestWorker")), options.threads);
                options.fitnessFunction = function (population) {
                    return __awaiter(this, void 0, void 0, function* () {
                        for (const genome of population) {
                            // add a task to the workerPool's queue
                            workerPool.queue((test) => __awaiter(this, void 0, void 0, function* () {
                                if (genome === undefined) {
                                    throw new ReferenceError();
                                }
                                // test the genome
                                genome.score = -(yield test(serializedDataSet, JSON.stringify(genome.toJSON()), lossIndex));
                            }));
                        }
                        yield workerPool.completed(); // wait until every task is done
                    });
                };
            }
            options.template = this; // set this network as template for first generation
            const neat = new NEAT_1.NEAT(options);
            let error;
            let bestFitness = 0;
            let bestGenome = this;
            // run until error goal is reached or iteration goal is reached
            do {
                const fittest = yield neat.evolve(); // run one generation
                if (!fittest.score) {
                    throw new ReferenceError();
                }
                error = fittest.score;
                if (neat.options.generation === 1 || fittest.score > bestFitness) {
                    bestFitness = fittest.score;
                    bestGenome = fittest;
                }
                if (options.schedule && neat.options.generation % options.schedule.iterations === 0) {
                    options.schedule.function(fittest.score, -error, neat.options.generation);
                }
            } while (error < -options.error && (options.iterations === 0 || neat.options.generation < options.iterations));
            if (bestGenome !== undefined) {
                // set this network to the fittest from NEAT
                this.nodes = bestGenome.nodes;
                this.connections = bestGenome.connections;
                this.gates = bestGenome.gates;
                if (options.clear) {
                    this.clear();
                }
            }
            if (workerPool) {
                yield workerPool.terminate(); // stop all processes
            }
            return {
                error: -error,
                iterations: neat.options.generation,
                time: Date.now() - start,
            };
        });
    }
    /**
     * Distance function
     * @param g2 other network
     * @param c1
     * @param c2
     * @param c3
     */
    distance(g2, c1, c2, c3) {
        let g1 = this;
        // set node indices
        for (let i = 0; i < g1.nodes.length; i++) {
            g1.nodes[i].index = i;
        }
        // set node indices
        for (let i = 0; i < g2.nodes.length; i++) {
            g2.nodes[i].index = i;
        }
        let indexG1 = 0;
        let indexG2 = 0;
        const connections1 = Array.from(g1.connections).filter(conn => conn !== undefined);
        const connections2 = Array.from(g2.connections).filter(conn => conn !== undefined);
        TimSort.sort(connections1, (a, b) => {
            return a.getInnovationID() - b.getInnovationID();
        });
        TimSort.sort(connections2, (a, b) => {
            return a.getInnovationID() - b.getInnovationID();
        });
        const highestInnovationID1 = connections1[connections1.length - 1].getInnovationID();
        const highestInnovationID2 = connections2[connections2.length - 1].getInnovationID();
        if (highestInnovationID1 < highestInnovationID2) {
            const temp = g1;
            g1 = g2;
            g2 = temp;
        }
        let disjointGenes = 0;
        let totalWeightDiff = 0;
        let similarGenes = 0;
        while (indexG1 < connections1.length && indexG2 < connections2.length) {
            const gene1 = connections1[indexG1];
            const gene2 = connections2[indexG2];
            if (gene1 === undefined || gene2 === undefined) {
                throw Error("HERE");
            }
            const in1 = gene1.getInnovationID();
            const in2 = gene2.getInnovationID();
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
        const excessGenes = g1.connections.size - indexG1;
        let N = Math.max(g1.connections.size, g2.connections.size);
        if (N < 20) {
            N = 1;
        }
        return c1 * excessGenes / N + c2 * disjointGenes / N + c3 * totalWeightDiff;
    }
    /**
     * Performs one training epoch and returns the error - this is a private function used in `self.train`
     *
     * @private
     *
     * @returns {number}
     */
    trainEpoch(options) {
        let errorSum = 0;
        for (let i = 0; i < options.dataset.length; i++) {
            const input = options.dataset[i].input;
            const correctOutput = options.dataset[i].output;
            const update = (i + 1) % options.batchSize === 0 || i + 1 === options.dataset.length;
            const output = this.activate(input, { dropoutRate: options.dropoutRate });
            this.propagate(correctOutput, { rate: options.trainingRate, momentum: options.momentum, update });
            errorSum += options.loss(correctOutput, output);
        }
        return errorSum / options.dataset.length;
    }
}
exports.Network = Network;
