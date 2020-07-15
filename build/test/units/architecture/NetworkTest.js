"use strict";
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
const chai_1 = require("chai");
const Connection_1 = require("../../../src/architecture/Connection");
const Network_1 = require("../../../src/architecture/Network");
const Node_1 = require("../../../src/architecture/Node");
const EvolveOptions_1 = require("../../../src/interfaces/EvolveOptions");
const TrainOptions_1 = require("../../../src/interfaces/TrainOptions");
const Mutation_1 = require("../../../src/methods/Mutation");
const Utils_1 = require("../../../src/utils/Utils");
describe('Network', () => {
    function createTestNetwork() {
        const network = new Network_1.Network(10, 20);
        for (let i = 0; i < Utils_1.randInt(10, 20); i++) {
            network.mutate(new Mutation_1.AddNodeMutation(true));
            network.mutate(new Mutation_1.AddConnectionMutation());
            network.mutate(new Mutation_1.AddConnectionMutation());
        }
        const input = [];
        for (let i = 0; i < 10; i++) {
            input.push(Math.random());
        }
        network.activate(input, { dropoutRate: 0.5 });
        return network;
    }
    describe('new Network()', () => {
        it('new Network(inputSize, outputSize) => {Network}', () => {
            const network = new Network_1.Network(10, 20);
            chai_1.expect(network).to.be.an.instanceOf(Network_1.Network);
            chai_1.expect(network.nodes).to.be.of.length(30);
        });
    });
    describe('network.connect()', () => {
        it('network.connect() => {Connection[]}', () => {
            const network = new Network_1.Network(10, 20);
            const sourceNode = new Node_1.Node();
            const targetNode = network.nodes[25];
            const formedConnection = network.connect(sourceNode, targetNode, 7);
            chai_1.expect(formedConnection).to.be.an.instanceOf(Connection_1.Connection);
            chai_1.expect(formedConnection.from).eql(sourceNode);
            chai_1.expect(formedConnection.to).eql(targetNode);
        });
    });
    describe('network.clear()', () => {
        it('network.clear() => {undefined}', () => {
            const testNetwork = createTestNetwork();
            testNetwork.clear();
            testNetwork.nodes.forEach(node => {
                chai_1.expect(node.errorResponsibility).to.equal(0);
                chai_1.expect(node.errorProjected).to.equal(0);
                chai_1.expect(node.errorGated).to.equal(0);
                chai_1.expect(node.old).to.equal(0);
                chai_1.expect(node.state).to.equal(0);
                chai_1.expect(node.activation).to.equal(0);
            });
        });
    });
    describe('network.mutate()', () => {
        describe('Network.mutateRandom()', () => {
            it('originalNetwork !== newNetwork', () => {
                const network = new Network_1.Network(10, 10);
                const copy = network.copy();
                network.mutateRandom();
                chai_1.expect(copy.toJSON()).to.not.equal(network.toJSON()); // eql: check for content equality (instead of for the same point in memory)
            });
            it("Shouldn't add node when at max nodes", () => {
                const network = new Network_1.Network(3, 4);
                network.mutateRandom([new Mutation_1.AddNodeMutation()], { maxNodes: 7 });
                chai_1.expect(network.nodes.length).equal(7);
            });
            it("Shouldn't add connections when at max connections", () => {
                const network = new Network_1.Network(1, 6);
                network.mutateRandom([new Mutation_1.AddConnectionMutation()], { maxConnections: 6 });
                chai_1.expect(network.connections.size).equal(6);
            });
            it("Shouldn't change network when all methods impossible", () => {
                const network = new Network_1.Network(2, 2);
                const copy = network.copy();
                // impossible mutation method
                network.mutateRandom([new Mutation_1.SubGateMutation()]);
                chai_1.expect(copy).to.eql(network); // eql: check for content equality (instead of for the same point in memory)
            });
        });
    });
    describe('network.copy()', () => {
        it('network.copy() => {Network}', () => {
            const original = new Network_1.Network(10, 10);
            const copy = original.copy();
            chai_1.expect(copy).eql(original);
        });
        it("network.copy() | Shouldn't return a shallow copy", () => {
            const original = new Network_1.Network(10, 5);
            const copy = original.copy();
            chai_1.expect(copy).not.equal(original);
        });
    });
    describe('network.propagate()', () => {
        it('network.propagate(rate, momentum, update, target_output) => {undefined}', () => {
            const upperTestEpochLimit = 2000; // will attempt to propagate this many times
            const testNetwork = createTestNetwork();
            // train the network to output all 1s.
            const inputSize = testNetwork.inputSize;
            const outputSize = testNetwork.outputSize;
            const idealOutput = Array(outputSize).fill(1);
            for (let i = 0; i < upperTestEpochLimit; i++) {
                const randomInput = Array(inputSize).fill(0).map(() => Math.random());
                testNetwork.activate(randomInput);
                testNetwork.propagate(idealOutput, { rate: 0.25, momentum: 0.01, update: true });
            }
            const randomInput = Array(inputSize).fill(0).map(() => Math.random());
            const testOutput = testNetwork.activate(randomInput);
            const epsilon = 0.08;
            testOutput.forEach((value, index) => {
                chai_1.expect(value).to.be.closeTo(idealOutput[index], epsilon);
            });
        });
    });
    describe('network.gate()', () => {
        it('network.gate(node_not_in_network, Connection) => {ReferenceError}', () => {
            const testNetwork = createTestNetwork();
            const node = new Node_1.Node();
            const connection = node.connect(testNetwork.nodes[20]);
            chai_1.expect(() => {
                testNetwork.addGate(node, connection);
            }).to.throw(ReferenceError);
        });
        it('network.gate(Node, Connection) => {undefined}', () => {
            const testNetwork = createTestNetwork();
            const nodesBefore = testNetwork.nodes.slice();
            testNetwork.mutate(new Mutation_1.AddNodeMutation());
            const node = testNetwork.nodes.filter(node => !nodesBefore.includes(node))[0];
            const connection = node.connect(testNetwork.nodes[20]);
            const beforeNumberOfGates = testNetwork.gates.size;
            testNetwork.addGate(node, connection);
            chai_1.expect(testNetwork.gates).to.be.of.length(beforeNumberOfGates + 1);
            chai_1.expect(connection.gateNode).to.eql(node);
            chai_1.expect(node.gated).to.have.lengthOf(1);
        });
    });
    describe('network.removeGate()', () => {
        it('network.removeGate(connection_not_in_network) => {ReferenceError}', () => {
            const testNetwork = createTestNetwork();
            const node = new Node_1.Node();
            const connection = node.connect(testNetwork.nodes[20]);
            node.addGate(connection);
            chai_1.expect(() => {
                testNetwork.removeGate(connection);
            }).to.throw(Error);
        });
        it('network.removeGate(Connection) => {undefined}', () => {
            const testNetwork = createTestNetwork();
            for (let i = 0; i < 20; i++) {
                testNetwork.mutate(new Mutation_1.AddNodeMutation());
                testNetwork.mutate(new Mutation_1.AddConnectionMutation());
                testNetwork.mutate(new Mutation_1.AddGateMutation());
            }
            const gatesBefore = testNetwork.gates.size;
            testNetwork.mutate(new Mutation_1.SubGateMutation());
            chai_1.expect(testNetwork.gates.size).to.be.equal(gatesBefore - 1);
        });
    });
    describe('network.remove()', () => {
        it('network.remove(node_not_in_network) => {ReferenceError}', () => {
            const testNetwork = createTestNetwork();
            const node = new Node_1.Node();
            chai_1.expect(() => {
                testNetwork.removeNode(node);
            }).to.throw(ReferenceError);
        });
    });
    describe('network.train()', () => {
        it('network.train(dataset) => {{error:{number},iterations:{number},time:{number}}}', () => {
            const network = new Network_1.Network(4, 4);
            const dataset = [
                { input: [1, 0, 0, 0], output: [0, 0, 0, 1] },
                { input: [0, 1, 0, 0], output: [0, 0, 1, 0] },
                { input: [0, 0, 1, 0], output: [0, 1, 0, 0] },
                { input: [0, 0, 0, 1], output: [1, 0, 0, 0] },
            ];
            const initial = network.test(dataset);
            const options = new TrainOptions_1.TrainOptions(dataset);
            options.iterations = 50;
            const trainReturn = network.train(options);
            const final = network.test(dataset);
            chai_1.expect(trainReturn.error).to.be.a('number');
            chai_1.expect(trainReturn.iterations).to.be.a('number');
            chai_1.expect(trainReturn.time).to.be.a('number');
            chai_1.expect(final).to.be.at.most(initial / 3);
        });
    });
    describe('network.evolve()', () => {
        // similar to network.train, with the difference that this dataset requires
        // evolving the network to be solvable
        it('network.evolve(dataset) => {{error:{number},iterations:{number},time:{number}}}', function () {
            return __awaiter(this, void 0, void 0, function* () {
                this.timeout(30000);
                const network = new Network_1.Network(2, 1);
                for (let i = 0; i < 10; i++) {
                    network.mutate(new Mutation_1.AddNodeMutation());
                }
                // multiplies the two inputs
                const dataset = [
                    { input: [1, 0], output: [0] },
                    { input: [0, 1], output: [0] },
                    { input: [1, 1], output: [1] },
                    { input: [2, 1], output: [2] },
                    { input: [2, 2], output: [4] },
                    { input: [2, 3], output: [6] },
                    { input: [3, 3], output: [9] },
                    { input: [-3, 3], output: [-9] },
                ];
                const initial = network.test(dataset);
                const options = new EvolveOptions_1.EvolveOptions();
                options.iterations = 10;
                options.dataset = dataset;
                const evolveReturn = yield network.evolve(options);
                const final = network.test(dataset);
                chai_1.expect(evolveReturn.error).to.be.a('number');
                chai_1.expect(evolveReturn.iterations).to.be.a('number');
                chai_1.expect(evolveReturn.time).to.be.a('number');
                chai_1.expect(final).to.be.at.most(initial);
            });
        });
    });
});
