import {Connection, ConnectionJSON} from "./Connection";
import {Node, NodeJSON, NodeType} from "./Node";
import {anyMatch, getOrDefault, pickRandom, randBoolean, randDouble, randInt, remove} from "../methods/Utils";
import {ADD_NODE, ALL_MUTATIONS, MOD_ACTIVATION, MOD_WEIGHT, Mutation, SUB_NODE, SWAP_NODES} from "../methods/Mutation";
import {Activation} from "../methods/Activation";
import {Loss, MSE} from "../methods/Loss";
import {FIXED, Rate} from "../methods/Rate";

export class Network {
    inputSize: number;
    outputSize: number;
    nodes: Node[];
    connections: Connection[];
    gates: Connection[];
    private score: number;

    constructor(inputSize: number, outputSize: number) {
        this.inputSize = inputSize;
        this.outputSize = outputSize;

        this.nodes = [];
        this.connections = [];
        this.gates = [];
        this.score = NaN;

        for (let i = 0; i < inputSize; i++) {
            this.nodes.push(new Node(NodeType.INPUT));
        }
        for (let i = 0; i < outputSize; i++) {
            this.nodes.push(new Node(NodeType.OUTPUT));
        }

        for (let i = 0; i < this.inputSize; i++) {
            for (let j = this.inputSize; j < this.outputSize + this.inputSize; j++) {
                const weight: number = (Math.random() - 0.5) * this.inputSize * Math.sqrt(2 / this.inputSize);
                this.connect(this.nodes[i], this.nodes[j], weight);
            }
        }
    }

    static fromJSON(json: NetworkJSON) {
        const network: Network = new Network(json.inputSize, json.outputSize);

        network.nodes = [];
        network.connections = [];

        json.nodes.forEach(nodeJSON => network.nodes.push(Node.fromJSON(nodeJSON)));

        json.connections.forEach((jsonConnection) => {
            const connection = network.connect(
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

    static crossOver(network1: Network, network2: Network, equal: boolean) {
        if (network1.inputSize !== network2.inputSize || network1.outputSize !== network2.outputSize) {
            throw new Error("Networks don`t have the same input/output size!");
        }

        // Initialise offspring
        const offspring: Network = new Network(network1.inputSize, network1.outputSize);
        offspring.connections = [];
        offspring.nodes = [];

        // Save scores and create a copy
        const score1: number = network1.score || 0;
        const score2: number = network2.score || 0;

        // Determine offspring node size
        let offspringSize: number;
        if (equal || score1 === score2) {
            const max = Math.max(network1.nodes.length, network2.nodes.length);
            const min = Math.min(network1.nodes.length, network2.nodes.length);
            offspringSize = randInt(min, max + 1);
        } else if (score1 > score2) {
            offspringSize = network1.nodes.length;
        } else {
            offspringSize = network2.nodes.length;
        }

        const inputSize = network1.inputSize;
        const outputSize = network1.outputSize;

        for (let i: number = 0; i < network1.nodes.length; i++) {
            network1.nodes[i].index = i;
        }

        for (let i: number = 0; i < network2.nodes.length; i++) {
            network2.nodes[i].index = i;
        }

        // Assign nodes from parents to offspring
        for (let i: number = 0; i < offspringSize; i++) {
            let chosenNode: Node;
            let chosenNodeType: NodeType | null = null;

            if (i < inputSize) {
                chosenNodeType = NodeType.INPUT;
                const sourceNetwork = randBoolean() ? network1 : network2;
                let inputNumber = -1;
                let j = -1;
                while (inputNumber < i) {
                    j++;
                    if (j >= sourceNetwork.nodes.length) {
                        // something is wrong...
                        throw RangeError('something is wrong with the size of the input');
                    }
                    if (sourceNetwork.nodes[j].type === NodeType.INPUT) {
                        inputNumber++;
                    }
                }
                chosenNode = sourceNetwork.nodes[j];
            } else if (i < inputSize + outputSize) { // now select output nodes
                chosenNodeType = NodeType.OUTPUT;
                const sourceNetwork = randBoolean() ? network1 : network2;
                let outputNumber = -1;
                let j = -1;
                while (outputNumber < i - inputSize) {
                    j++;
                    if (j >= sourceNetwork.nodes.length) {
                        throw RangeError('something is wrong with the size of the output');
                    }
                    if (sourceNetwork.nodes[j].type === NodeType.OUTPUT) {
                        outputNumber++;
                    }
                }
                chosenNode = sourceNetwork.nodes[j];
            } else {
                chosenNodeType = NodeType.HIDDEN;
                let sourceNetwork;
                if (i >= network1.nodes.length) {
                    sourceNetwork = network2;
                } else if (i >= network2.nodes.length) {
                    sourceNetwork = network1;
                } else {
                    sourceNetwork = randBoolean() ? network1 : network2;
                }
                chosenNode = pickRandom(sourceNetwork.nodes);
            }

            const newNode = new Node(chosenNode.type);
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
        })
        // Add the connections of network 2
        network2.connections.forEach(connection => {
            n2connections[Connection.innovationID(connection.from.index, connection.to.index)] = connection.toJSON();
        })

        // Split common conn genes from disjoint or excess conn genes
        let connections: (ConnectionJSON | undefined)[] = [];
        let keys1: string[] = Object.keys(n1connections);
        let keys2: string[] = Object.keys(n2connections);
        for (let i: number = keys1.length - 1; i >= 0; i--) {
            if (n2connections[parseInt(keys1[i])] !== undefined) {
                const connection = randBoolean() ? n1connections[parseInt(keys1[i])] : n2connections[parseInt(keys1[i])];
                connections.push(connection);

                n2connections[parseInt(keys1[i])] = undefined;
            } else if (score1 >= score2 || equal) {
                connections.push(n1connections[parseInt(keys1[i])]);
            }
        }

        // Excess/disjoint gene
        if (score2 >= score1 || equal) {
            keys2
                .map(key => parseInt(key))
                .map(key => n2connections[key])
                .filter(conn => conn !== undefined)
                .forEach(conn => connections.push(conn));
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

    connect(from: Node, to: Node, weight: number = 0): Connection {
        let connection: Connection = from.connect(to, weight);
        this.connections.push(connection);

        return connection;
    }

    activate(input: number[], dropout_rate: number | undefined = 0, trace: boolean | undefined = true) {
        let inputNodeIndex: number = 0;
        for (let i = 0; i < this.nodes.length; i++) {
            if (inputNodeIndex === this.inputSize) {
                break;
            }
            const node: Node = this.nodes[i];
            if (node.type != NodeType.INPUT) {
                continue;
            }

            node.activate(input[inputNodeIndex++], trace);
        }
        if (inputNodeIndex !== input.length) {
            throw Error(`There are ${inputNodeIndex} input nodes, but ${input.length} inputs were passed`);
        }


        this.nodes
            .filter(node => node.type == NodeType.HIDDEN)
            .forEach(node => {
                if (dropout_rate) {
                    node.mask = Math.random() >= dropout_rate ? 1 : 0;
                }

                node.activate(undefined, trace);
            });

        const output: number[] = [];
        for (let i = 0; i < this.nodes.length; i++) {
            if (output.length === this.outputSize) {
                break;
            }
            const node = this.nodes[i];
            if (node.type != NodeType.OUTPUT) {
                continue;
            }

            output.push(node.activate(undefined, trace));
        }

        if (output.length !== this.outputSize) {
            throw Error(`There are ${this.outputSize} output nodes, but ${output.length} outputs were passed`);
        }

        return output;
    }

    propagate(rate: number, momentum: number, update: boolean, target: number[]): void {
        if (target.length !== this.outputSize) {
            throw new Error(`Output target length should match network output length`);
        }

        let targetIndex: number = 0;

        for (let i = 0; targetIndex < this.outputSize; i++) {
            if (this.nodes[i].type == NodeType.OUTPUT) {
                this.nodes[i].propagate(target[targetIndex++], momentum, rate, update);
            }
        }

        for (let i = this.nodes.length - 1; i >= 0; i--) {
            if (this.nodes[i].type == NodeType.HIDDEN) {
                this.nodes[i].propagate(undefined, rate, momentum, update);
            }
        }

        this.nodes
            .filter(node => node.type == NodeType.INPUT)
            .forEach(node => {
                node.propagate(undefined, rate, momentum, update);
            });
    }

    clear(): void {
        this.nodes.forEach(node => node.clear());
    }

    disconnect(from: Node, to: Node): Connection {
        this.connections
            .filter(conn => conn.from === from)
            .filter(conn => conn.to === to)
            .forEach(conn => {
                if (conn.gateNode !== null) {
                    this.removeGate(conn);
                }
                remove(this.connections, conn);
            });

        return from.disconnect(to);
    }

    addGate(node: Node, connection: Connection): void {
        if (this.nodes.indexOf(node) === -1) {
            throw new ReferenceError(`This node is not part of the network!`);
        } else if (connection.gateNode != null) {
            return;
        }
        node.addGate(connection);
        this.gates.push(connection);
    }

    removeGate(connection: Connection): void {
        if (!anyMatch(this.gates, connection)) {
            throw new Error(`This connection is not gated!`);
        }
        remove(this.gates, connection)
        if (connection.gateNode != null) {
            connection.gateNode.removeGate(connection);
        }
    }

    removeNode(node: Node, keepGates: boolean = new SUB_NODE().keepGates): void {
        if (!anyMatch(this.nodes, node)) {
            throw new ReferenceError(`This node does not exist in the network!`);
        }

        this.disconnect(node, node);

        const inputs: Node[] = [];
        const gates: Node[] = [];
        const outputs: Node[] = [];

        for (let i: number = node.incoming.length - 1; i >= 0; i--) {
            let connection: Connection = node.incoming[i];
            if (keepGates && connection.gateNode !== null && connection.gateNode !== node) {
                gates.push(connection.gateNode);
            }
            inputs.push(connection.from);
            this.disconnect(connection.from, node);
        }

        for (let i: number = node.outgoing.length - 1; i >= 0; i--) {
            let connection: Connection = node.incoming[i];
            if (keepGates && connection.gateNode !== null && connection.gateNode !== node) {
                gates.push(connection.gateNode);
            }
            outputs.push(connection.to);
            this.disconnect(node, connection.to);
        }

        const connections: Connection[] = [];
        inputs.forEach(input => {
            outputs.forEach(output => {
                if (!input.isProjectingTo(output)) {
                    connections.push(this.connect(input, output));
                }
            });
        });

        while (gates.length > 0 && connections.length > 0) {
            const gate: Node | undefined = gates.shift();
            if (gate === undefined) {
                continue;
            }

            const connection: Connection = pickRandom(connections);
            this.addGate(gate, connection);
            remove(connections, connection)
        }

        for (let i: number = node.gated.length - 1; i >= 0; i--) {
            this.removeGate(node.gated[i]);
        }

        remove(this.nodes, node);
    }

    possible(method: Mutation): any {
        let candidates: any = [];
        switch (method.constructor.name) {
            case "SUB_NODE":
                return this.nodes.filter(node => node.type == NodeType.HIDDEN);
            case "ADD_CONN":
                for (let i = 0; i < this.nodes.length - this.outputSize; i++) {
                    const from: Node = this.nodes[i]
                    for (let j = Math.max(i + 1, this.inputSize); j < this.nodes.length; j++) {
                        const to: Node = this.nodes[j]
                        if (!from.isProjectingTo(to)) {
                            candidates.push([from, to])
                        }
                    }
                }
                return candidates;
            case "SUB_CONN":
                return this.connections.filter(conn => conn.from.outgoing.length > 1 && conn.to.incoming.length > 1 && this.nodes.indexOf(conn.to) > this.nodes.indexOf(conn.from));
            case "MOD_ACTIVATION":
                if ((<MOD_ACTIVATION>method).mutateOutput) {
                    return this.nodes.filter(node => node.type != NodeType.INPUT);
                } else {
                    return this.nodes.filter(node => node.type == NodeType.HIDDEN);
                }
            case "ADD_this_CONN":
                return this.nodes
                    .filter(node => node.type != NodeType.INPUT)
                    .filter(node => node.selfConnection.weight == 0);
            case "SUB_this_CONN":
                return this.connections.filter(conn => conn.from == conn.to);
            case "ADD_GATE":
                return this.connections.filter(conn => conn.gateNode === null);
            case "SUB_GATE":
                return [];
            case "ADD_BACK_CONN":
                for (let i = this.inputSize; i < this.nodes.length; i++) {
                    const from = this.nodes[i]
                    for (let j = this.inputSize; j < i; j++) {
                        const to = this.nodes[j]
                        if (!from.isProjectingTo(to)) {
                            candidates.push([from, to])
                        }
                    }
                }
                return candidates;
            case "SUB_BACK_CONN":
                return this.connections.filter(conn => conn.from.outgoing.length > 1 && conn.to.incoming.length > 1 && this.nodes.indexOf(conn.from) > this.nodes.indexOf(conn.to));
            case "SWAP_NODES": {
                // break out early if there aren't enough nodes to swap
                if ((<SWAP_NODES>method).mutateOutput && this.nodes.length - this.inputSize < 3
                    || this.nodes.length - this.inputSize - this.outputSize < 3) {
                    return [];
                }

                if ((<SWAP_NODES>method).mutateOutput) {
                    return this.nodes.filter(node => node.type != NodeType.INPUT);
                } else {
                    return this.nodes.filter(node => node.type == NodeType.HIDDEN);
                }
            }
        }
    }

    mutate(method: Mutation, maxNodes: number | undefined = undefined, maxConnections: number | undefined = undefined, maxGates: number | undefined = undefined): void {
        switch (method.constructor.name) {
            case "ADD_NODE": {
                if (maxNodes !== undefined && this.nodes.length >= maxNodes) {
                    break;
                }

                const node: Node = new Node(NodeType.HIDDEN) // Unless we have connections across inputs / outputs this is always a hidden
                if ((<ADD_NODE>method).randomActivation) {
                    node.mutate(new MOD_ACTIVATION()) // this should be an option passed into the Node constructor
                }
                const connection: Connection = pickRandom(this.connections);
                const from: Node = connection.from;
                const to: Node = connection.to;
                this.disconnect(from, to);

                let minBound: number = Math.max(this.inputSize, 1 + this.nodes.indexOf(from));

                this.nodes.splice(minBound, 0, node);

                const newConnection1: Connection = this.connect(from, node, 1);
                const newConnection2: Connection = this.connect(node, to, connection.weight);

                if (connection.gateNode != null) {
                    if (randBoolean()) {
                        this.addGate(connection.gateNode, newConnection1)
                    } else {
                        this.addGate(connection.gateNode, newConnection2)
                    }
                }
                break;
            }
            case "SUB_NODE": {
                const possible: Node[] = <Node[]>this.possible(method)
                if (possible.length > 0) {
                    this.removeNode(pickRandom(possible));
                }
                break;
            }
            case "ADD_CONN": {
                if (maxConnections !== undefined && maxConnections <= this.connections.length) {
                    break;
                }

                const possible: Node[][] = <Node[][]>this.possible(method)
                if (possible.length > 0) {
                    const pair = pickRandom(possible);
                    this.connect(pair[0], pair[1]);
                }
                break;
            }
            case "SUB_CONN": {
                const possible = (<Connection[]>this.possible(method))
                if (possible) {
                    const randomConnection: Connection = pickRandom(possible);
                    this.disconnect(randomConnection.from, randomConnection.to)
                }

                break;
            }
            case "MOD_WEIGHT": {
                const randomConnection: Connection = pickRandom(this.connections);
                randomConnection.weight += randDouble((<MOD_WEIGHT>method).min, (<MOD_WEIGHT>method).max);
                break;
            }
            case "MOD_BIAS": {
                if (this.nodes.length <= this.inputSize) {
                    break;
                }
                const randomNode: Node = pickRandom(this.nodes.filter(node => node.type != NodeType.INPUT));
                randomNode.mutate(method)
                break;
            }
            case "MOD_ACTIVATION": {
                const possible: Node[] = <Node[]>this.possible(method)
                if (possible.length > 0) {
                    pickRandom(possible).mutate(method);
                }
                break;
            }
            case "ADD_SELF_CONN": {
                const possible: Node[] = <Node[]>this.possible(method)
                if (possible) {
                    const node: Node = pickRandom(possible);
                    this.connect(node, node);
                }
                break;
            }
            case "SUB_SELF_CONN": {
                const possible = <Connection[]>this.possible(method);
                if (possible.length > 0) {
                    const randomConnection: Connection = pickRandom(possible);
                    this.disconnect(randomConnection.from, randomConnection.to);
                }
                break;
            }
            case "ADD_GATE": {
                // Check user constraint
                if (maxGates !== undefined && maxGates <= this.gates.length) {
                    break;
                }

                const possible: Connection[] = <Connection[]>this.possible(method)
                if (possible.length > 0) {
                    const node: Node = pickRandom(this.nodes.filter(node => node.type !== NodeType.INPUT));
                    const connection: Connection = pickRandom(possible);

                    this.addGate(node, connection);
                }
                break;
            }
            case "SUB_GATE": {
                if (this.gates.length > 0) {
                    this.removeGate(pickRandom(this.gates));
                }
                break;
            }
            case "ADD_BACK_CONN": {
                const possible: Node[][] = <Node[][]>this.possible(method)
                if (possible.length > 0) {
                    const pair: Node[] = pickRandom(possible);
                    this.connect(pair[0], pair[1])
                }
                break;
            }
            case "SUB_BACK_CONN": {
                const possible: Connection[] = <Connection[]>this.possible(method)
                if (possible.length > 0) {
                    const randomConnection: Connection = pickRandom(possible);
                    this.disconnect(randomConnection.from, randomConnection.to)
                }
                break;
            }
            case "SWAP_NODES": {
                const possible: Node[] = <Node[]>this.possible(method)
                if (possible) {
                    const node1: Node = pickRandom(possible);
                    const node2: Node = pickRandom(possible.filter(node => node !== node1));

                    const biasTemp: number = node1.bias
                    const squashTemp: Activation = node1.squash

                    node1.bias = node2.bias
                    node1.squash = node2.squash
                    node2.bias = biasTemp
                    node2.squash = squashTemp
                }
                break;
            }
        }
    }

    mutateRandom(allowedMethods: Mutation[] = ALL_MUTATIONS, maxNodes: number | undefined = undefined, maxConnections: number | undefined = undefined, maxGates: number | undefined = undefined): void {
        if (allowedMethods.length == 0) {
            return;
        }
        this.mutate(pickRandom(allowedMethods), maxNodes, maxConnections, maxGates);
    }

    train(inputs: number[][], outputs: number[][], options: TrainOptions) {
        if (inputs[0].length !== this.inputSize || outputs[0].length !== this.outputSize) {
            throw new Error(`Dataset input/output size should be same as network input/output size!`);
        } else if (inputs.length !== outputs.length) {
            throw new RangeError("Num inputs should be equal to num outputs!");
        }

        options.iterations = getOrDefault(options.iterations, 100);
        options.error = getOrDefault(options.error, 0.05);
        options.loss = getOrDefault(options.loss, new MSE());
        let baseRate: number = getOrDefault(options.rate, 0.3);
        options.dropout = getOrDefault(options.dropout, 0);
        options.momentum = getOrDefault(options.momentum, 0);
        options.batchSize = Math.min(inputs.length, getOrDefault(options.batchSize, 1));
        options.ratePolicy = getOrDefault(options.ratePolicy, new FIXED(baseRate));
        options.log = getOrDefault(options.log, NaN);

        let targetError: number = options.error <= 0 ? -1 : options.error;
        const start: number = Date.now();

        // check for errors
        if (options.iterations <= 0 && options.error <= 0) {
            throw new Error(`At least one of the following options must be specified: error, iterations`);
        }

        let trainingSetSize: number;
        let trainingSetInputs: number[][];
        let trainingSetOutputs: number[][];
        let testSetInputs: number[][];
        let testSetOutputs: number[][];
        if (options.crossValidate) {
            trainingSetSize = Math.ceil((1 - options.crossValidate.testSize) * inputs.length);

            trainingSetInputs = inputs.slice(0, trainingSetSize);
            trainingSetOutputs = outputs.slice(0, trainingSetSize);
            testSetInputs = inputs.slice(trainingSetSize);
            testSetOutputs = outputs.slice(trainingSetSize);
        } else {
            trainingSetInputs = inputs;
            trainingSetOutputs = outputs;
            testSetInputs = [];
            testSetOutputs = [];
        }

        let currentTrainingRate: number;
        let iterationCount: number = 0;
        let error: number = 1;

        while (error > targetError && (options.iterations != 0 || iterationCount < options.iterations)) {
            iterationCount++;

            currentTrainingRate = (<Rate>options.ratePolicy).calc(iterationCount);

            const trainError: number = this.trainEpoch(
                trainingSetInputs,
                trainingSetOutputs,
                options.batchSize,
                currentTrainingRate,
                options.momentum,
                options.loss,
                options.dropout
            );

            if (options.clear) {
                this.clear();
            }
            // Checks if cross validation is enabled
            if (options.crossValidate) {
                error = this.test(testSetInputs, testSetOutputs, options.loss);
                if (options.clear) {
                    this.clear();
                }
            } else {
                error = trainError;
            }

            if (options.log > 0 && iterationCount % options.log === 0) {
                console.log(`iteration number`, iterationCount, `error`, error, `training rate`, currentTrainingRate);
            }

            if (options.schedule && iterationCount % options.schedule.iterations === 0) {
                options.schedule.function({error: error, iteration_number: iterationCount});
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
    }

    trainEpoch(inputs: number[][], outputs: number[][], batchSize: number, trainingRate: number, momentum: number, loss: Loss, dropoutRate: number = 0.5): number {
        let errorSum = 0;
        for (let i = 0; i < inputs.length; i++) {
            const input: number[] = inputs[i];
            const correctOutput: number[] = outputs[i];

            const update: boolean = (i + 1) % batchSize === 0 || i + 1 === inputs.length;

            const output = this.activate(input, dropoutRate);
            this.propagate(trainingRate, momentum, update, correctOutput);

            errorSum += loss.calc(correctOutput, output);
        }
        return errorSum / inputs.length;
    }

    test(inputs: number[][], outputs: number[][], loss: Loss = new MSE()): number {
        let error: number = 0;

        for (let i: number = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let target = outputs[i];
            let output = this.activate(input, undefined, false);
            error += loss.calc(target, output);
        }

        return error / inputs.length;
    }

    toJSON(): NetworkJSON {
        const json: NetworkJSON = {
            nodes: [],
            connections: [],
            inputSize: this.inputSize,
            outputSize: this.outputSize,
        };

        for (let i: number = 0; i < this.nodes.length; i++) {
            this.nodes[i].index = i;
        }

        this.nodes.forEach(node => {
            json.nodes.push(node.toJSON());

            if (node.selfConnection.weight !== 0) {
                json.connections.push(node.selfConnection.toJSON());
            }
        });

        this.connections.forEach(conn => json.connections.push(conn.toJSON()));

        return json;
    }

    async evolve(inputs: number[][], outputs: number[][], options: EvolveOptions) {
        if (inputs[0].length !== this.inputSize || outputs[0].length !== this.outputSize) {
            throw new Error(`Dataset input/output size should be same as network input/output size!`);
        }

        let targetError: number = 0;
        if (typeof options.iterations === `undefined` && typeof options.error === `undefined`) {
            options.iterations = 1000;
            targetError = 0.05;
        } else if (options.iterations) {
            targetError = -1;
        } else if (options.error) {
            targetError = options.error;
            options.iterations = 0;
        }

        options.growth = getOrDefault(options.growth, 0.0001);
        options.loss = getOrDefault(options.loss, new MSE());
        options.amount = getOrDefault(options.amount, 1);
        options.fitnessPopulation = getOrDefault(options.fitnessPopulation, false);
        options.maxNodes = getOrDefault(options.maxNodes, Infinity);
        options.maxConnections = getOrDefault(options.maxConnections, Infinity);
        options.maxGates = getOrDefault(options.maxGates, Infinity);

        const start: number = Date.now();

        options.fitnessFunction = async function (inputs: number[][], outputs: number[][], population: Network[]): Promise<void> {
            await Promise.all(population.map(async genome => {
                let score = 0;
                for (let i = 0; i < options.amount; i++) {
                    score -= genome.test(inputs, outputs, options.loss);
                }

                score -= options.growth * (
                    genome.nodes.length
                    - genome.inputSize
                    - genome.outputSize
                    + genome.connections.length
                    + genome.gates.length
                );

                genome.score = score / options.amount;
            }));
        };

        options.fitnessPopulation = true;

        options.network = this;
        options.input = this.inputSize;
        options.output = this.outputSize;
        const neat: NEAT = new NEAT(inputs, outputs, options);

        let error: number = -Infinity;
        let bestFitness: number = -Infinity;
        let bestGenome: Network | undefined = undefined;

        while (error < -targetError && (options.iterations === 0 || neat.generation < options.iterations)) {
            const fittest: Network = await neat.evolve();
            const fitness: number = fittest.score;
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

            if (options.log > 0 && neat.generation % options.log === 0) {
                console.log(`iteration`, neat.generation, `fitness`, fitness, `error`, -error);
            }

            if (options.schedule && neat.generation % options.schedule.iterations === 0) {
                options.schedule.function({fitness: fitness, error: -error, iteration: neat.generation});
            }
        }

        if (bestGenome !== undefined) {
            this.nodes = bestGenome.nodes;
            this.connections = bestGenome.connections;
            this.gates = bestGenome.gates;

            if (options.clear) {
                this.clear();
            }
        }

        return {
            error: -error,
            iterations: neat.generation,
            time: Date.now() - start,
        };
    }
}

interface EvolveOptions {
    fitnessFunction: (inputs: number[][], outputs: number[][], population: Network[]) => Promise<void>;
    growth: number;
    loss: Loss;
    amount: number;
    maxNodes: number;
    maxConnections: number;
    maxGates: number;
    threads: number;
    input: number;
    output: number;
    fitnessPopulation: boolean;
    fitness: (inputs: number[][], outputs: number[][], population: Network[]) => Promise<number>;
    network: Network;
    log: number;
    schedule: { iterations: number, function: Function };
    clear: boolean;
    error: number;
    iterations: number;
}

interface NetworkJSON {
    nodes: NodeJSON[];
    connections: ConnectionJSON[];
    inputSize: number;
    outputSize: number;
}

interface TrainOptions {
    ratePolicy: Rate;
    rate: number;
    loss: Loss;
    iterations: number;
    error: number;
    momentum: number;
    dropout: number;
    clear: boolean;
    schedule: { iterations: number, function: Function };
    crossValidate: { testSize: number };
    log: number;
    batchSize: number;
}
