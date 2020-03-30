import {Connection, ConnectionJSON} from "./Connection";
import {Node, NodeJSON, NodeType} from "./Node";
import {anyMatch, getOrDefault, pickRandom, randBoolean, randInt, remove, shuffle} from "../methods/Utils";
import {ALL_MUTATIONS, Mutation, SubNodeMutation} from "../methods/Mutation";
import {Loss, MSELoss} from "../methods/Loss";
import {FixedRate, Rate} from "../methods/Rate";
import {NEAT} from "../NEAT";
import {Selection} from "../methods/Selection";

export class Network {
    public inputSize: number;
    public outputSize: number;
    public nodes: Node[];
    public connections: Connection[];
    public gates: Connection[];
    public score: number | undefined;

    constructor(inputSize: number, outputSize: number) {
        this.inputSize = inputSize;
        this.outputSize = outputSize;

        this.nodes = [];
        this.connections = [];
        this.gates = [];
        this.score = undefined;

        for (let i: number = 0; i < inputSize; i++) {
            this.nodes.push(new Node(NodeType.INPUT));
        }
        for (let i: number = 0; i < outputSize; i++) {
            this.nodes.push(new Node(NodeType.OUTPUT));
        }

        for (let i: number = 0; i < this.inputSize; i++) {
            for (let j: number = this.inputSize; j < this.outputSize + this.inputSize; j++) {
                const weight: number = (Math.random() - 0.5) * this.inputSize * Math.sqrt(2 / this.inputSize);
                this.connect(this.nodes[i], this.nodes[j], weight);
            }
        }
    }

    public static fromJSON(json: NetworkJSON): Network {
        const network: Network = new Network(json.inputSize, json.outputSize);

        network.nodes = [];
        network.connections = [];

        json.nodes.forEach(nodeJSON => {
            const node: Node = Node.fromJSON(nodeJSON);
            network.nodes[node.index] = node;
        });

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

    public static crossOver(network1: Network, network2: Network, equal: boolean): Network {
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
            const max: number = Math.max(network1.nodes.length, network2.nodes.length);
            const min: number = Math.min(network1.nodes.length, network2.nodes.length);
            offspringSize = randInt(min, max + 1);
        } else if (score1 > score2) {
            offspringSize = network1.nodes.length;
        } else {
            offspringSize = network2.nodes.length;
        }

        const inputSize: number = network1.inputSize;
        const outputSize: number = network1.outputSize;

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
                const sourceNetwork: Network = randBoolean() ? network1 : network2;
                let inputNumber: number = -1;
                let j: number = -1;
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
                const sourceNetwork: Network = randBoolean() ? network1 : network2;
                let outputNumber: number = -1;
                let j: number = -1;
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

    public copy(): Network {
        return Network.fromJSON(this.toJSON());
    }

    public connect(from: Node, to: Node, weight: number = 0): Connection {
        const connection: Connection = from.connect(to, weight);
        this.connections.push(connection);

        return connection;
    }

    public activate(input: number[], dropoutRate: number | undefined = 0, trace: boolean | undefined = true): number[] {
        let inputNodeIndex: number = 0;

        for (const node of this.nodes) {
            if (inputNodeIndex === this.inputSize) {
                break;
            }
            if (node.type !== NodeType.INPUT) {
                continue;
            }

            node.activate(input[inputNodeIndex++], trace);
        }
        if (inputNodeIndex !== input.length) {
            throw Error(`There are ${inputNodeIndex} input nodes, but ${input.length} inputs were passed`);
        }


        this.nodes
            .filter(node => node.type === NodeType.HIDDEN)
            .forEach(node => {
                if (dropoutRate) {
                    node.mask = Math.random() >= dropoutRate ? 1 : 0;
                }

                node.activate(undefined, trace);
            });

        const output: number[] = [];
        for (const node of this.nodes) {
            if (output.length === this.outputSize) {
                break;
            }
            if (node.type !== NodeType.OUTPUT) {
                continue;
            }

            output.push(node.activate(undefined, trace));
        }

        if (output.length !== this.outputSize) {
            throw Error(`There are ${this.outputSize} output nodes, but ${output.length} outputs were passed`);
        }

        return output;
    }

    public propagate(rate: number, momentum: number, update: boolean, target: number[]): void {
        if (target.length !== this.outputSize) {
            throw new Error(`Output target length should match network output length`);
        }

        let targetIndex: number = 0;

        for (let i: number = 0; targetIndex < this.outputSize; i++) {
            if (this.nodes[i].type === NodeType.OUTPUT) {
                this.nodes[i].propagate(target[targetIndex++], momentum, rate, update);
            }
        }

        for (let i: number = this.nodes.length - 1; i >= 0; i--) {
            if (this.nodes[i].type === NodeType.HIDDEN) {
                this.nodes[i].propagate(undefined, rate, momentum, update);
            }
        }

        this.nodes
            .filter(node => node.type === NodeType.INPUT)
            .forEach(node => {
                node.propagate(undefined, rate, momentum, update);
            });
    }

    public clear(): void {
        this.nodes.forEach(node => node.clear());
    }

    public disconnect(from: Node, to: Node): Connection {
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

    public addGate(node: Node, connection: Connection): void {
        if (this.nodes.indexOf(node) === -1) {
            throw new ReferenceError(`This node is not part of the network!`);
        } else if (connection.gateNode != null) {
            return;
        }
        node.addGate(connection);
        this.gates.push(connection);
    }

    public removeGate(connection: Connection): void {
        if (!anyMatch(this.gates, connection)) {
            throw new Error(`This connection is not gated!`);
        }
        remove(this.gates, connection);
        if (connection.gateNode != null) {
            connection.gateNode.removeGate(connection);
        }
    }

    public removeNode(node: Node, keepGates: boolean = new SubNodeMutation().keepGates): void {
        if (!anyMatch(this.nodes, node)) {
            throw new ReferenceError(`This node does not exist in the network!`);
        }

        this.disconnect(node, node);

        const inputs: Node[] = [];
        const gates: Node[] = [];
        const outputs: Node[] = [];

        for (let i: number = node.incoming.length - 1; i >= 0; i--) {
            const connection: Connection = node.incoming[i];
            if (keepGates && connection.gateNode !== null && connection.gateNode !== node) {
                gates.push(connection.gateNode);
            }
            inputs.push(connection.from);
            this.disconnect(connection.from, node);
        }

        for (let i: number = node.outgoing.length - 1; i >= 0; i--) {
            const connection: Connection = node.outgoing[i];
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
            remove(connections, connection);
        }

        for (let i: number = node.gated.length - 1; i >= 0; i--) {
            this.removeGate(node.gated[i]);
        }

        remove(this.nodes, node);
    }

    public mutate(method: Mutation, maxNodes: number | undefined = Infinity, maxConnections: number | undefined = Infinity, maxGates: number | undefined = Infinity): void {
        method.mutate(this, maxNodes ?? maxConnections ?? maxGates);
    }


    public mutateRandom(allowedMethods: Mutation[] = ALL_MUTATIONS, maxNodes: number | void = Infinity, maxConnections: number | void = Infinity, maxGates: number | void = Infinity): void {
        if (allowedMethods.length === 0) {
            return;
        }
        this.mutate(pickRandom(allowedMethods), maxNodes || Infinity, maxConnections || Infinity, maxGates || Infinity);
    }

    public train(dataset: { input: number[], output: number[] }[], options: TrainOptions = {}): { error: number, iterations: number, time: number } {
        if (dataset[0].input.length !== this.inputSize || dataset[0].output.length !== this.outputSize) {
            throw new Error(`Dataset input/output size should be same as network input/output size!`);
        }

        options.iterations = getOrDefault(options.iterations, 100);
        options.error = getOrDefault(options.error, 0.05);
        options.loss = getOrDefault(options.loss, new MSELoss());
        const baseRate: number = getOrDefault(options.rate, 0.3);
        options.dropout = getOrDefault(options.dropout, 0);
        options.momentum = getOrDefault(options.momentum, 0);
        options.batchSize = Math.min(dataset.length, getOrDefault(options.batchSize, 1));
        options.ratePolicy = getOrDefault(options.ratePolicy, new FixedRate(baseRate));
        options.log = getOrDefault(options.log, NaN);

        const targetError: number = options.error <= 0 ? -1 : options.error;
        const start: number = Date.now();

        // check for errors
        if (options.iterations <= 0 && options.error <= 0) {
            throw new Error(`At least one of the following options must be specified: error, iterations`);
        }

        let trainingSetSize: number;
        let trainingSet: { input: number[]; output: number[] }[];
        let testSet: { input: number[]; output: number[] }[];
        if (options.crossValidateTestSize && options.crossValidateTestSize > 0) {
            trainingSetSize = Math.ceil((1 - options.crossValidateTestSize) * dataset.length);

            trainingSet = dataset.slice(0, trainingSetSize);
            testSet = dataset.slice(trainingSetSize);
        } else {
            trainingSet = dataset;
            testSet = [];
        }

        let currentTrainingRate: number;
        let iterationCount: number = 0;
        let error: number = 1;

        while (error > targetError && (options.iterations <= 0 || iterationCount < options.iterations)) {
            iterationCount++;

            currentTrainingRate = options.ratePolicy.calc(iterationCount);

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
            // Checks if cross validation is enabled
            if (options.crossValidateTestSize) {
                error = this.test(testSet, options.loss);
                if (options.clear) {
                    this.clear();
                }
            } else {
                error = trainError;
            }

            if (options.shuffle ?? false) {
                shuffle(dataset);
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

    public trainEpoch(dataset: { input: number[], output: number[] }[], batchSize: number, trainingRate: number, momentum: number, loss: Loss, dropoutRate: number = 0.5): number {
        let errorSum: number = 0;
        for (let i: number = 0; i < dataset.length; i++) {
            const input: number[] = dataset[i].input;
            const correctOutput: number[] = dataset[i].output;

            const update: boolean = (i + 1) % batchSize === 0 || i + 1 === dataset.length;

            const output: number[] = this.activate(input, dropoutRate);
            this.propagate(trainingRate, momentum, update, correctOutput);

            errorSum += loss.calc(correctOutput, output);
        }
        return errorSum / dataset.length;
    }

    public test(dataset: { input: number[], output: number[] }[], loss: Loss = new MSELoss()): number {
        let error: number = 0;

        for (const entry of dataset) {
            const input: number[] = entry.input;
            const target: number[] = entry.output;
            const output: number[] = this.activate(input, undefined, false);
            error += loss.calc(target, output);
        }

        return error / dataset.length;
    }

    public toJSON(): NetworkJSON {
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

    public async evolve(dataset: { input: number[], output: number[] }[], options: EvolveOptions): Promise<{ error: number, iterations: number, time: number }> {
        if (dataset[0].input.length !== this.inputSize || dataset[0].output.length !== this.outputSize) {
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

        options.growth = getOrDefault<number>(options.growth, 0.0001);
        options.loss = getOrDefault(options.loss, new MSELoss());
        options.amount = getOrDefault(options.amount, 1);
        options.fitnessPopulation = getOrDefault(options.fitnessPopulation, false);
        options.maxNodes = getOrDefault(options.maxNodes, Infinity);
        options.maxConnections = getOrDefault(options.maxConnections, Infinity);
        options.maxGates = getOrDefault(options.maxGates, Infinity);

        const start: number = Date.now();

        options.fitnessFunction = async function (dataset: { input: number[], output: number[] }[], population: Network[] | Network): Promise<void> {
            if (!Array.isArray(population)) {
                population = [population];
            }
            await Promise.all(population.map(async genome => {
                let score: number = 0;
                for (let i: number = 0; i < (options.amount ?? 1); i++) {
                    score -= genome.test(dataset, options.loss);
                }

                score -= options.growth ?? 0.0001 * (
                    genome.nodes.length
                    - genome.inputSize
                    - genome.outputSize
                    + genome.connections.length
                    + genome.gates.length
                );

                genome.score = score / (options.amount ?? 1);
            }));
        };

        options.fitnessPopulation = true;

        options.template = this;
        options.input = this.inputSize;
        options.output = this.outputSize;
        const neat: NEAT = new NEAT(dataset, options);

        let error: number = -Infinity;
        let bestFitness: number = -Infinity;
        let bestGenome: Network | undefined;

        while (error < -targetError && (options.iterations === 0 || neat.generation < (options.iterations ?? 0))) {
            const fittest: Network = await neat.evolve(undefined, undefined);
            const fitness: number = fittest.score === undefined ? -Infinity : fittest.score;
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

export interface EvolveOptions {
    generation?: number;
    template?: Network;
    mutations?: Mutation[];
    selection?: Selection;
    mutationRate?: number;
    mutationAmount?: number;
    provenance?: number;
    elitism?: number;
    populationSize?: number;
    fitnessFunction?: (dataset: { input: number[], output: number[] }[], population: Network[] | Network) => Promise<void>;
    growth?: number;
    loss?: Loss;
    amount?: number;
    maxNodes?: number;
    maxConnections?: number;
    maxGates?: number;
    input?: number;
    output?: number;
    equal?: boolean;
    fitnessPopulation?: boolean;
    log?: number;
    schedule?: { iterations: number, function: (fitness: number, error: number, iteration: number) => void };
    clear?: boolean;
    error?: number;
    iterations?: number;
}

export interface NetworkJSON {
    nodes: NodeJSON[];
    connections: ConnectionJSON[];
    inputSize: number;
    outputSize: number;
}

export interface TrainOptions {
    ratePolicy?: Rate;
    rate?: number;
    loss?: Loss;
    iterations?: number;
    error?: number;
    shuffle?: boolean;
    momentum?: number;
    dropout?: number;
    clear?: boolean;
    schedule?: { iterations: number, function: (error: number, iteration: number) => undefined };
    crossValidateTestSize?: number;
    log?: number;
    batchSize?: number;
}
