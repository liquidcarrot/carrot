import {Pool, spawn, Worker} from "threads";
import "threads/register";
import {ActivationType} from "../enums/ActivationType";
import {NodeType} from "../enums/NodeType";
import {ConnectionJSON} from "../interfaces/ConnectionJSON";
import {EvolveOptions} from "../interfaces/EvolveOptions";
import {NetworkJSON} from "../interfaces/NetworkJSON";
import {TrainOptions} from "../interfaces/TrainOptions";
import {ALL_LOSSES, Loss, MSELoss} from "../methods/Loss";
import {ALL_MUTATIONS, Mutation, SubNodeMutation} from "../methods/Mutation";
import {FixedRate} from "../methods/Rate";
import {getOrDefault, pickRandom, randBoolean, randInt, removeFromArray, shuffle} from "../methods/Utils";
import {NEAT} from "../NEAT";
import {Connection} from "./Connection";
import {Node} from "./Node";

/**
 * Create a neural network
 *
 * Networks are easy to create, all you need to specify is an `input` and an `output` size.
 *
 * @constructs Network
 *
 * @param {number} inputSize Size of input layer AKA neurons in input layer
 * @param {number} outputSize Size of output layer AKA neurons in output layer
 *
 * @prop {number} inputSize Size of input layer AKA neurons in input layer
 * @prop {number} outputSize Size of output layer AKA neurons in output layer
 * @prop {Array<Node>} nodes Nodes currently within the network
 * @prop {Array<Node>} gates Gates within the network
 * @prop {Array<Connection>} connections Connections within the network
 */
export class Network {
    /**
     * The input size of this network.
     */
    public inputSize: number;
    /**
     * The output size of this network.
     */
    public outputSize: number;
    /**
     * The nodes inside this network. Stored in activation order.
     */
    public nodes: Node[];
    /**
     * The connections inside this network.
     */
    public connections: Connection[];
    /**
     * The gates inside this network.
     */
    public gates: Connection[];
    /**
     * The score of this network for evolution.
     */
    public score: number | undefined;

    constructor(inputSize: number, outputSize: number) {
        this.inputSize = inputSize;
        this.outputSize = outputSize;

        this.nodes = [];
        this.connections = [];
        this.gates = [];
        this.score = undefined;

        // Create input and output nodes
        for (let i: number = 0; i < inputSize; i++) {
            this.nodes.push(new Node(NodeType.INPUT));
        }
        for (let i: number = 0; i < outputSize; i++) {
            this.nodes.push(new Node(NodeType.OUTPUT));
        }

        // Connect input and output nodes
        for (let i: number = 0; i < this.inputSize; i++) {
            for (let j: number = this.inputSize; j < this.outputSize + this.inputSize; j++) {
                // https://stats.stackexchange.com/a/248040/147931
                const weight: number = (Math.random() - 0.5) * this.inputSize * Math.sqrt(2 / this.inputSize);
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
     *
     */
    public static fromJSON(json: NetworkJSON): Network {
        const network: Network = new Network(json.inputSize, json.outputSize);

        network.nodes = [];
        network.connections = [];

        json.nodes.map(nodeJSON => new Node().fromJSON(nodeJSON)).forEach(node => network.nodes[node.index] = node);

        json.connections.forEach((jsonConnection) => {
            const connection: Connection = network.connect(
                network.nodes[jsonConnection.fromIndex],
                network.nodes[jsonConnection.toIndex],
                jsonConnection.weight
            );

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
     * @param {boolean} [equal] Flag to indicate equally fit Networks
     *
     * @returns {Network} New network created from mixing parent networks
     */
    public static crossOver(network1: Network, network2: Network, equal: boolean): Network {
        if (network1.inputSize !== network2.inputSize || network1.outputSize !== network2.outputSize) {
            throw new Error("Networks don`t have the same input/output size!");
        }

        // Initialise offspring
        const offspring: Network = new Network(network1.inputSize, network1.outputSize);
        offspring.connections = []; // clear
        offspring.nodes = []; // clear

        // Save scores and create a copy
        const score1: number = network1.score ?? 0;
        const score2: number = network2.score ?? 0;

        // Determine offspring node size
        let offspringSize: number;
        if (equal || score1 === score2) {
            const max: number = Math.max(network1.nodes.length, network2.nodes.length);
            const min: number = Math.min(network1.nodes.length, network2.nodes.length);
            offspringSize = randInt(min, max + 1); // [min,max]
        } else if (score1 > score2) {
            offspringSize = network1.nodes.length;
        } else {
            offspringSize = network2.nodes.length;
        }

        const inputSize: number = network1.inputSize;
        const outputSize: number = network1.outputSize;

        // set node indices
        for (let i: number = 0; i < network1.nodes.length; i++) {
            network1.nodes[i].index = i;
        }

        // set node indices
        for (let i: number = 0; i < network2.nodes.length; i++) {
            network2.nodes[i].index = i;
        }

        // Assign nodes from parents to offspring
        for (let i: number = 0; i < offspringSize; i++) {
            let chosenNode: Node;
            let chosenNodeType: NodeType | null = null;

            // decide what type of node is needed first check for input and output nodes and fill up with hidden nodes
            if (i < inputSize) { // pick input node
                chosenNodeType = NodeType.INPUT;
                const sourceNetwork: Network = randBoolean() ? network1 : network2;
                let inputNumber: number = -1;
                let j: number = -1;
                while (inputNumber < i) {
                    if (j++ >= sourceNetwork.nodes.length) {
                        throw RangeError('something is wrong with the size of the input');
                    }
                    if (sourceNetwork.nodes[j].isInputNode()) {
                        inputNumber++;
                    }
                }
                chosenNode = sourceNetwork.nodes[j];
            } else if (i < inputSize + outputSize) { // pick output node
                chosenNodeType = NodeType.OUTPUT;
                const sourceNetwork: Network = randBoolean() ? network1 : network2;
                let outputNumber: number = -1;
                let j: number = -1;
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
            } else { // pick hidden node
                chosenNodeType = NodeType.HIDDEN;
                let sourceNetwork: Network;
                if (i >= network1.nodes.length) {
                    sourceNetwork = network2;
                } else if (i >= network2.nodes.length) {
                    sourceNetwork = network1;
                } else {
                    sourceNetwork = randBoolean() ? network1 : network2;
                }
                chosenNode = pickRandom(sourceNetwork.nodes);
            }

            const newNode: Node = new Node(chosenNodeType);
            newNode.bias = chosenNode.bias;
            newNode.squash = chosenNode.squash;
            offspring.nodes.push(newNode);
        }

        // Create arrays of connection genes
        const n1connections: (ConnectionJSON | undefined)[] = [];
        const n2connections: (ConnectionJSON | undefined)[] = [];

        // Add the connections of network 1
        network1.connections.forEach(connection => {
            n1connections[Connection.innovationID(connection.from.index, connection.to.index)] = connection.toJSON();
        });
        // Add the connections of network 2
        network2.connections.forEach(connection => {
            n2connections[Connection.innovationID(connection.from.index, connection.to.index)] = connection.toJSON();
        });

        // Split common conn genes from disjoint or excess conn genes
        const connections: (ConnectionJSON | undefined)[] = [];
        const keys1: string[] = Object.keys(n1connections);
        const keys2: string[] = Object.keys(n2connections);
        for (let i: number = keys1.length - 1; i >= 0; i--) {
            if (n2connections[parseInt(keys1[i])] !== undefined) {
                connections.push(randBoolean() ? n1connections[parseInt(keys1[i])] : n2connections[parseInt(keys1[i])]);

                n2connections[parseInt(keys1[i])] = undefined;
            } else if (score1 >= score2 || equal) {
                connections.push(n1connections[parseInt(keys1[i])]);
            }
        }

        // Excess/disjoint gene
        if (score2 >= score1 || equal) {
            keys2
                .map(key => parseInt(key))// convert to numbers
                .map(key => n2connections[key]) // get the connection
                .filter(conn => conn !== undefined) // filter out undefined connections
                .forEach(conn => connections.push(conn)); // add the filtered connections
        }

        // Add common conn genes uniformly
        connections.forEach(connectionJSON => {
            if (connectionJSON !== undefined && connectionJSON.toIndex < offspringSize && connectionJSON.fromIndex < offspringSize) {
                const from: Node = offspring.nodes[connectionJSON.fromIndex];
                const to: Node = offspring.nodes[connectionJSON.toIndex];
                const connection: Connection = offspring.connect(from, to, connectionJSON.weight);

                if (connectionJSON.gateNodeIndex !== null && connectionJSON.gateNodeIndex < offspringSize) {
                    offspring.addGate(offspring.nodes[connectionJSON.gateNodeIndex], connection);
                }
            }
        });

        return offspring;
    }

    /**
     * Returns a copy of Network.
     *
     * @returns {Network} Returns an identical network
     */
    public copy(): Network {
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
    public connect(from: Node, to: Node, weight: number = 0): Connection {
        const connection: Connection = from.connect(to, weight); // run node-level connect
        this.connections.push(connection); // add it to the array
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
    public activate(input: number[], options: {
        /**
         * The dropout rate. [dropout](https://medium.com/@amarbudhiraja/https-medium-com-amarbudhiraja-learning-less-to-learn-better-dropout-in-deep-machine-learning-74334da4bfc5)
         */
        dropoutRate?: number;
        /**
         * Controls whether traces are created when activation happens (a trace is meta information left behind for different uses, e.g. backpropagation).
         */
        trace?: boolean
    } = {}): number[] {
        if (input.length !== this.inputSize) {
            throw new RangeError("Input size of dataset is different to network input size!");
        }
        // get default value if no value is given
        options.dropoutRate = getOrDefault(options.dropoutRate, 0);
        options.trace = getOrDefault(options.trace, true);

        this.nodes
            .filter(node => node.isInputNode()) // only input nodes
            .forEach((node: Node, index: number) => node.activate(input[index], options.trace)); // activate them with the input


        this.nodes
            .filter(node => node.isHiddenNode()) // only hidden nodes
            .forEach((node: Node) => {
                if (options.dropoutRate) {
                    node.mask = Math.random() >= options.dropoutRate ? 1 : 0;
                }

                node.activate(undefined, options.trace); // activate them
            });

        return this.nodes
            .filter(node => node.isOutputNode()) // only output nodes
            .map((node: Node) => node.activate(undefined, options.trace)); // map them to there activation value will give the network's output
    }

    /**
     * Backpropagate the network
     *
     * This function allows you to teach the network. If you want to do more complex training, use the `network.train()` function.
     *
     * @param {number[]} target Ideal values of the previous activate. Will use the difference to improve the weights
     * @param options More option for propagation
     */
    public propagate(target: number[], options: {
        /**
         * Sets the [learning rate](https://towardsdatascience.com/understanding-learning-rates-and-how-it-improves-performance-in-deep-learning-d0d4059c1c10) of the backpropagation process.
         */
        rate?: number,
        /**
         * [Momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html). Adds a fraction of the previous weight update to the current one.
         */
        momentum?: number,
        /**
         * When set to false weights won't update, but when set to true after being false the last propagation will include the delta weights of the first "update:false" propagation too.
         */
        update?: boolean
    } = {}): void {
        // get default value if value isn't given
        options.rate = getOrDefault(options.rate, 0.3);
        options.momentum = getOrDefault(options.momentum, 0);
        options.update = getOrDefault(options.update, false);


        if (target.length !== this.outputSize) {
            throw new Error(`Output target length should match network output length`);
        }

        // Backpropagation: output -> hidden -> input

        // propagate through the output nodes
        this.nodes
            .filter(node => node.isOutputNode()) // only output nodes
            .forEach((node, index) => node.propagate(target[index], options)); // propagate

        // propagate backwards through the hidden nodes
        for (let i: number = this.nodes.length - 1; i >= 0; i--) {
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
    public clear(): void {
        this.nodes.forEach(node => node.clear());
    }

    /**
     * Removes the connection of the `from` node to the `to` node
     *
     * @param {Node} from Source node
     * @param {Node} to Destination node
     */
    public disconnect(from: Node, to: Node): Connection {
        // remove the connection network-level
        this.connections
            .filter(conn => conn.from === from) // check for incoming node
            .filter(conn => conn.to === to) // check for outgoing node
            .forEach(conn => {
                if (conn.gateNode !== null) {
                    this.removeGate(conn); // remove possible gate
                }
                removeFromArray(this.connections, conn); // remove connection from array
            });
        // disconnect node-level
        return from.disconnect(to);
    }

    /**
     * Makes a network node gate a connection
     *
     * @todo Add ability to gate several network connections at once
     *
     * @param {Node} node Gating node
     * @param {Connection} connection Connection to gate with node
     */
    public addGate(node: Node, connection: Connection): void {
        if (this.nodes.indexOf(node) === -1) {
            throw new ReferenceError(`This node is not part of the network!`);
        } else if (connection.gateNode != null) {
            return;
        }
        node.addGate(connection);
        this.gates.push(connection);
    }

    /**
     * Remove the gate of a connection.
     *
     * @param {Connection} connection Connection to remove gate from
     */
    public removeGate(connection: Connection): void {
        if (!this.gates.includes(connection)) {
            throw new Error(`This connection is not gated!`);
        }
        removeFromArray(this.gates, connection);
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
    public removeNode(node: Node, keepGates: boolean = new SubNodeMutation().keepGates): void {
        if (!this.nodes.includes(node)) {
            throw new ReferenceError(`This node does not exist in the network!`);
        }

        this.disconnect(node, node); // remove self connection

        const inputs: Node[] = []; // keep track
        const gates: Node[] = []; // keep track
        const outputs: Node[] = []; // keep track
        const connections: Connection[] = []; // keep track

        // read all inputs from node and keep track of the nodes that gate the incoming connection
        for (let i: number = node.incoming.length - 1; i >= 0; i--) {
            const connection: Connection = node.incoming[i];
            if (keepGates && connection.gateNode !== null && connection.gateNode !== node) {
                gates.push(connection.gateNode);
            }
            inputs.push(connection.from);
            this.disconnect(connection.from, node);
        }

        // read all outputs from node and keep track of the nodes that gate the outgoing connection
        for (let i: number = node.outgoing.length - 1; i >= 0; i--) {
            const connection: Connection = node.outgoing[i];
            if (keepGates && connection.gateNode !== null && connection.gateNode !== node) {
                gates.push(connection.gateNode);
            }
            outputs.push(connection.to);
            this.disconnect(node, connection.to);
        }

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
            const gate: Node | undefined = gates.shift(); // take a gate node and remove it from the array
            if (gate === undefined) {
                continue;
            }

            const connection: Connection = pickRandom(connections); // take a random connection
            this.addGate(gate, connection); // gate the connection with the gate node
            removeFromArray(connections, connection); // remove the connection from the array
        }

        // remove every gate the node has
        for (let i: number = node.gated.length - 1; i >= 0; i--) {
            this.removeGate(node.gated[i]);
        }

        removeFromArray(this.nodes, node); // remove the node from the nodes array
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
    public mutate(method: Mutation, options?: {
        /**
         * Maximum amount of [Nodes](node) a network can grow to
         */
        maxNodes?: number,
        /**
         * Maximum amount of [Connections](connection) a network can grow to
         */
        maxConnections?: number,
        /**
         * Maximum amount of Gates a network can grow to
         */
        maxGates?: number,
        /**
         * All allowed activations
         */
        allowedActivations?: ActivationType[]
    }): void {
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
    public mutateRandom(allowedMethods: Mutation[] = ALL_MUTATIONS, options: {
        /**
         * Maximum amount of [Nodes](node) a network can grow to
         */
        maxNodes?: number,
        /**
         * Maximum amount of [Connections](connection) a network can grow to
         */
        maxConnections?: number,
        /**
         * Maximum amount of Gates a network can grow to
         */
        maxGates?: number,
        /**
         * All allowed activations
         */
        allowedActivations?: ActivationType[]
    } = {}): void {
        if (allowedMethods.length === 0) {
            return;
        }
        // mutate the network with a random allowed mutation
        this.mutate(pickRandom(allowedMethods), options);
    }

    /**
     * Train the given data to this network
     *
     * @param {TrainOptions} options Options used to train network
     * @param {Array<{input:number[],output:number[]}>} options.data A data of input values and ideal output values to train the network with
     * @param {options.loss} [options.loss=new MSELoss()] The [options.loss function](https://en.wikipedia.org/wiki/Loss_function) used to determine network error
     * @param {rate} [options.ratePolicy=new FixedRate(options.rate)] A [learning rate policy](https://towardsdatascience.com/understanding-learning-rates-and-how-it-improves-performance-in-deep-learning-d0d4059c1c10), i.e. how to change the learning rate during training to get better network performance
     * @param {number} [options.rate=0.3] Sets the [learning rate](https://towardsdatascience.com/understanding-learning-rates-and-how-it-improves-performance-in-deep-learning-d0d4059c1c10) of the backpropagation process
     * @param {number} [options.iterations=1000] Sets amount of training cycles the process will maximally run, even when the target error has not been reached.
     * @param {number} [options.error] The target error to train for, once the network falls below this error, the process is stopped. Lower error rates require more training cycles.
     * @param {number} [options.dropout=0] [Dropout rate](https://medium.com/@amarbudhiraja/https-medium-com-amarbudhiraja-learning-less-to-learn-better-options.dropout-in-deep-machine-learning-74334da4bfc5) likelihood for any given neuron to be ignored during network training. Must be between zero and one, numbers closer to one will result in more neurons ignored.
     * @param {number} [options.momentum=0] [Momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html). Adds a fraction of the previous weight update to the current one.
     * @param {number} [options.batchSize=1] Sets the (mini-) batch size of your training. Default: 1 [(online training)](https://www.quora.com/What-is-the-difference-between-batch-online-and-mini-batch-training-in-neural-networks-Which-one-should-I-use-for-a-small-to-medium-sized-dataset-for-prediction-purposes)
     * @param {number} [options.crossValidate.testSize] Sets the amount of test cases that should be assigned to cross validation. If data to 0.4, 40% of the given data will be used for cross validation.
     * @param {number} [options.crossValidate.testError] Sets the target error of the validation data.
     * @param {boolean} [options.clear=false] If set to true, will clear the network after every activation. This is useful for training LSTM's, more importantly for time series prediction.
     * @param {boolean} [options.shuffle=false] When set to true, will shuffle the training data every iterationNumber. Good option to use if the network is performing worse in [cross validation](https://artint.info/html/ArtInt_189.html) than in the real training data.
     * @param {number|boolean} [options.log=false] If set to n, outputs training status every n iterations. Setting `log` to 1 will log the status every iteration_number
     * @param {number} [options.schedule.iterations] You can schedule tasks to happen every n iterations. Paired with `options.schedule.function`
     * @param {schedule} [options.schedule.function] A function to run every n iterations as data by `options.schedule.iterations`. Passed as an object with a "function" property that contains the function to run.
     *
     * @returns {{error:{number},iterations:{number},time:{number}}} A summary object of the network's performance
     */
    public train(options: TrainOptions): {
        /**
         * The loss of the network after training.
         */
        error: number,
        /**
         * The iterations took for training the network.
         */
        iterations: number,
        /**
         * The time from begin to end in milliseconds
         */
        time: number
    } {
        if (!options.dataset || options.dataset[0].input.length !== this.inputSize || options.dataset[0].output.length !== this.outputSize) {
            throw new Error(`Dataset input/output size should be same as network input/output size!`);
        }

        // Use the default values, if no value is given
        options.iterations = getOrDefault(options.iterations, -1);
        options.error = getOrDefault(options.error, -1);
        options.loss = getOrDefault(options.loss, new MSELoss());
        options.dropout = getOrDefault(options.dropout, 0);
        options.momentum = getOrDefault(options.momentum, 0);
        options.batchSize = Math.min(options.dataset.length, getOrDefault(options.batchSize, options.dataset.length));
        const baseRate: number = getOrDefault(options.rate, 0.3);
        options.ratePolicy = getOrDefault(options.ratePolicy, new FixedRate(baseRate));
        options.log = getOrDefault(options.log, NaN);

        const start: number = Date.now();

        if (options.iterations <= 0 && options.error <= 0) {
            throw new Error(`At least one of the following options must be specified: error, iterations`);
        }

        // Split into trainingSet and testSet if cross validation is enabled
        let trainingSetSize: number;
        let trainingSet: {
            /**
             * The input values of the dataset.
             */
            input: number[];
            /**
             * The output values of the dataset.
             */
            output: number[]
        }[];
        let testSet: {
            /**
             * The input values of the dataset.
             */
            input: number[];
            /**
             * The output values of the dataset.
             */
            output: number[]
        }[];
        if (options.crossValidateTestSize && options.crossValidateTestSize > 0) {
            trainingSetSize = Math.ceil((1 - options.crossValidateTestSize) * options.dataset.length);
            trainingSet = options.dataset.slice(0, trainingSetSize);
            testSet = options.dataset.slice(trainingSetSize);
        } else {
            trainingSet = options.dataset;
            testSet = [];
        }

        let currentTrainingRate: number;
        let iterationCount: number = 0;
        let error: number = 1;

        // train until the target error is reached or the target iterations are reached
        while (error > options.error && (options.iterations <= 0 || iterationCount < options.iterations)) {
            iterationCount++;

            // update the rate according to the rate policy
            currentTrainingRate = options.ratePolicy.calc(iterationCount);

            // train a single epoch
            const trainError: number = this.trainEpoch(
                trainingSet,
                options.batchSize,
                currentTrainingRate,
                options.momentum,
                options.loss,
                options.dropout
            );

            if (options.clear) {
                this.clear();
            }

            // Run test with the testSet, if cross validation is enabled
            if (options.crossValidateTestSize) {
                error = this.test(testSet, options.loss);
                if (options.clear) {
                    this.clear();
                }
            } else {
                error = trainError;
            }

            if (options.shuffle ?? false) {
                shuffle(options.dataset);
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
     * Performs one training epoch and returns the error - this is a private function used in `self.train`
     *
     * @todo Add `@param` tag descriptions
     * @todo Add `@returns` tag description
     *
     * @private
     *
     * @param {Array<{input:number[], output: number[]}>} dataset
     * @param {number} batchSize
     * @param {number} trainingRate
     * @param {number} momentum
     * @param {loss} loss
     * @param {number} dropoutRate=0.5 The dropout rate to use when training
     *
     * @returns {number}
     */
    public trainEpoch(dataset: {
        /**
         * The input values of the dataset.
         */
        input: number[];
        /**
         * The output values of the dataset.
         */
        output: number[]
    }[], batchSize: number, trainingRate: number, momentum: number, loss: Loss, dropoutRate: number = 0.5): number {
        let errorSum: number = 0;
        for (let i: number = 0; i < dataset.length; i++) {
            const input: number[] = dataset[i].input;
            const correctOutput: number[] = dataset[i].output;

            const update: boolean = (i + 1) % batchSize === 0 || i + 1 === dataset.length;

            const output: number[] = this.activate(input, {dropoutRate});
            this.propagate(correctOutput, {rate: trainingRate, momentum, update});

            errorSum += loss.calc(correctOutput, output);
        }
        return errorSum / dataset.length;
    }

    /**
     * Tests a set and returns the error and elapsed time
     *
     * @param {Array<{input:number[],output:number[]}>} dataset A set of input values and ideal output values to test the network against
     * @param {Loss} [loss=new MSELoss()] The [loss function](https://en.wikipedia.org/wiki/Loss_function) used to determine network error
     *
     * @returns {number} A summary object of the network's performance
     */
    public test(dataset: {
        /**
         * The input values of the dataset.
         */
        input: number[];
        /**
         * The output values of the dataset.
         */
        output: number[]
    }[], loss: Loss = new MSELoss()): number {
        let error: number = 0;

        for (const entry of dataset) {
            const input: number[] = entry.input;
            const target: number[] = entry.output;
            const output: number[] = this.activate(input, {trace: false});
            error += loss.calc(target, output);
        }

        return error / dataset.length;
    }

    /**
     * Convert the network to a json object
     *
     * @returns {NetworkJSON} The network represented as a json object
     */
    public toJSON(): NetworkJSON {
        const json: NetworkJSON = {
            nodes: [],
            connections: [],
            inputSize: this.inputSize,
            outputSize: this.outputSize,
        };

        // set node indices
        for (let i: number = 0; i < this.nodes.length; i++) {
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

        this.connections
            .map(conn => conn.toJSON()) // convert all connections to json
            .forEach(connJSON => json.connections.push(connJSON)); // and add them to the json object

        return json;
    }

    /**
     * Evolves the network to reach a lower error on a dataset using the [NEAT algorithm](http://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf)
     *
     * If both `iterations` and `error` options are unset, evolve will default to `iterations` as an end condition.
     * @param {object} [options] Configuration options
     * @param {number} [options.iterations=1000] Set the maximum amount of iterations/generations for the algorithm to run.
     * @param {number} [options.error=0.05] Set the target error. The algorithm will stop once this target error has been reached.
     * @param {number} [options.growth=0.0001] Set the penalty for large networks. Penalty calculation: penalty = (genome.nodes.length + genome.connections.length + genome.gates.length) * growth; This penalty will get added on top of the error. Your growth should be a very small number.
     * @param {loss} [options.loss=loss.MSE]  Specify the loss function for the evolution, this tells a genome in the population how well it's performing. Default: methods.loss.MSE (recommended).
     * @param {number} [options.amount=1] Set the amount of times to test the trainingSet on a genome each generation. Useful for time series. Do not use for regular feed forward problems.
     * @param {number} [options.threads] Specify the amount of threads to use. Default value is the amount of cores in your CPU.
     * @param {Network} [options.network]
     * @param {number|boolean} [options.log=false] If set to n, outputs training status every n iterations. Setting `log` to 1 will log the status every iteration
     * @param {number} [options.schedule.iterations] You can schedule tasks to happen every n iterations. Paired with `options.schedule.function`
     * @param {schedule} [options.schedule.function] A function to run every n iterations as set by `options.schedule.iterations`. Passed as an object with a "function" property that contains the function to run.
     * @param {boolean} [options.clear=false] If set to true, will clear the network after every activation. This is useful for evolving recurrent networks, more importantly for time series prediction.
     * @param {boolean} [options.equal=true] If set to true when [Network.crossOver](Network.crossOver) runs it will assume both genomes are equally fit.
     * @param {number} [options.populationSize=50] Population size of each generation.
     * @param {number} [options.elitism=1] Elitism of every evolution loop. [Elitism in genetic algorithms.](https://www.researchgate.net/post/What_is_meant_by_the_term_Elitism_in_the_Genetic_Algorithm)
     * @param {number} [options.provenance=0] Number of genomes inserted into the original network template (Network(input,output)) per evolution.
     * @param {number} [options.mutationRate=0.4] Sets the mutation rate. If set to 0.3, 30% of the new population will be mutated.
     * @param {number} [options.mutationAmount=1] If mutation occurs (randomNumber < mutationRate), sets amount of times a mutation method will be applied to the network.
     * @param {boolean} [options.fitnessPopulation=true] Flag to return the fitness of a population of genomes. false => evaluate each genome individually. true => evaluate entire population. Adjust fitness function accordingly
     * @param {Function} [options.fitness] - A fitness function to evaluate the networks. Takes a `genome`, i.e. a [network](Network), and a `dataset` and sets the genome's score property
     * @param {string} [options.selection=new FitnessProportionateSelection()] [Selection method](selection) for evolution (e.g. methods.Selection.FITNESS_PROPORTIONATE).
     * @param {Array} [options.crossover] Sets allowed crossover methods for evolution.
     * @param {Array} [options.mutation] Sets allowed [mutation methods](mutation) for evolution, a random mutation method will be chosen from the array when mutation occurs. Optional, but default methods are non-recurrent.
     * @param {number} [options.maxNodes=Infinity] Maximum nodes for a potential network
     * @param {number} [options.maxConnections=Infinity] Maximum connections for a potential network
     * @param {number} [options.maxGates=Infinity] Maximum gates for a potential network
     * @param {function} [options.mutationSelection=random] Custom mutation selection function if given
     * @param {boolean} [options.efficientMutation=false] Test & reduce [mutation methods](mutation) to avoid failed mutation attempts
     *
     * @returns {{error:{number},iterations:{number},time:{number}}} A summary object of the network's performance. <br /> Properties include: `error` - error of the best genome, `iterations` - generations used to evolve networks, `time` - clock time elapsed while evolving
     */
    public async evolve(options: EvolveOptions = {}): Promise<{
        /**
         * The loss of the network after training.
         */
        error: number,
        /**
         * The iterations took for training the network.
         */
        iterations: number,
        /**
         * The time from begin to end in milliseconds
         */
        time: number
    }> {
        if (!options.fitnessFunction && options.dataset && (options.dataset[0].input.length !== this.inputSize || options.dataset[0].output.length !== this.outputSize)) {
            throw new Error(`Dataset input/output size should be same as network input/output size!`);
        }

        let targetError: number = 0;
        if (typeof options.iterations === `undefined` && typeof options.error === `undefined`) {
            options.iterations = 1000;
            targetError = 0.05;
        } else if (options.iterations) {
            targetError = -1; // run until iterations
        } else if (options.error) {
            targetError = options.error;
            options.iterations = 0; // run until error
        }

        // set options to default if necessary
        options.growth = getOrDefault<number>(options.growth, 0.0001);
        options.loss = getOrDefault(options.loss, new MSELoss());
        options.amount = getOrDefault(options.amount, 1);
        options.maxNodes = getOrDefault(options.maxNodes, Infinity);
        options.maxConnections = getOrDefault(options.maxConnections, Infinity);
        options.maxGates = getOrDefault(options.maxGates, Infinity);
        options.threads = getOrDefault(options.threads, 4);

        const start: number = Date.now();

        // TODO: should not ignore this
        // @ts-ignore
        let workerPool: Pool;

        if (!options.fitnessFunction) {
            // if no fitness function is given
            // create default one

            // Serialize the dataset using JSON
            const serializedDataSet: string = JSON.stringify(options.dataset);

            // init a pool of workers
            workerPool = Pool(() => spawn(new Worker("../multithreading/Worker")), options.threads);

            options.fitnessFunction = async function (population: Network[]): Promise<void> {
                for (const genome of population) {
                    // add a task to the workerPool's queue

                    // TODO: should not ignore this
                    // @ts-ignore
                    workerPool.queue(async test => {
                        if (genome === undefined) {
                            return;
                        }
                        // test the genome
                        genome.score = -await test(serializedDataSet, JSON.stringify(genome.toJSON()), ALL_LOSSES.indexOf(options.loss ?? new MSELoss()));
                        if (genome.score === undefined) {
                            genome.score = -Infinity;
                            return;
                        }

                        // subtract growth value
                        genome.score -= (options.growth ?? 0.0001) * (
                            genome.nodes.length
                            - genome.inputSize
                            - genome.outputSize
                            + genome.connections.length
                            + genome.gates.length
                        );
                    });
                }

                await workerPool.settled(); // wait until every task is done
            };
        }
        options.template = this; // set this network as template for first generation

        const neat: NEAT = new NEAT(options);

        let error: number = -Infinity;
        let bestFitness: number = -Infinity;
        let bestGenome: Network | undefined;

        // run until error goal is reached or iteration goal is reached
        while (error < -targetError && (options.iterations === 0 || neat.generation < (options.iterations ?? 0))) {
            const fittest: Network = await neat.evolve(); // run one generation
            const fitness: number = fittest.score ?? -Infinity;
            // add the growth value back to get the real error
            error = fitness + options.growth * (
                fittest.nodes.length
                - fittest.inputSize
                - fittest.outputSize
                + fittest.connections.length
                + fittest.gates.length
            );

            if (fitness > bestFitness) {
                bestFitness = fitness;
                bestGenome = fittest;
            }

            if ((options.log ?? 0) > 0 && neat.generation % (options.log ?? 0) === 0) {
                console.log(`iteration`, neat.generation, `fitness`, fitness, `error`, -error);
            }

            if (options.schedule && neat.generation % options.schedule.iterations === 0) {
                options.schedule.function(fitness, -error, neat.generation);
            }
        }

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
            workerPool.terminate(); // stop all processes
        }

        return {
            error: -error,
            iterations: neat.generation,
            time: Date.now() - start,
        };
    }
}
