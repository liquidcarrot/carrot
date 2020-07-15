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
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Connection_1 = require("../../../src/architecture/Connection");
var Network_1 = require("../../../src/architecture/Network");
var Node_1 = require("../../../src/architecture/Node");
var EvolveOptions_1 = require("../../../src/interfaces/EvolveOptions");
var TrainOptions_1 = require("../../../src/interfaces/TrainOptions");
var Mutation_1 = require("../../../src/methods/Mutation");
var Utils_1 = require("../../../src/utils/Utils");
describe('Network', function () {
    function createTestNetwork() {
        var network = new Network_1.Network(10, 20);
        for (var i = 0; i < Utils_1.randInt(10, 20); i++) {
            network.mutate(new Mutation_1.AddNodeMutation(true));
            network.mutate(new Mutation_1.AddConnectionMutation());
            network.mutate(new Mutation_1.AddConnectionMutation());
        }
        var input = [];
        for (var i = 0; i < 10; i++) {
            input.push(Math.random());
        }
        network.activate(input, { dropoutRate: 0.5 });
        return network;
    }
    describe('new Network()', function () {
        it('new Network(inputSize, outputSize) => {Network}', function () {
            var network = new Network_1.Network(10, 20);
            chai_1.expect(network).to.be.an.instanceOf(Network_1.Network);
            chai_1.expect(network.nodes).to.be.of.length(30);
        });
    });
    describe('network.connect()', function () {
        it('network.connect() => {Connection[]}', function () {
            var network = new Network_1.Network(10, 20);
            var sourceNode = new Node_1.Node();
            var targetNode = network.nodes[25];
            var formedConnection = network.connect(sourceNode, targetNode, 7);
            chai_1.expect(formedConnection).to.be.an.instanceOf(Connection_1.Connection);
            chai_1.expect(formedConnection.from).eql(sourceNode);
            chai_1.expect(formedConnection.to).eql(targetNode);
        });
    });
    describe('network.clear()', function () {
        it('network.clear() => {undefined}', function () {
            var testNetwork = createTestNetwork();
            testNetwork.clear();
            testNetwork.nodes.forEach(function (node) {
                chai_1.expect(node.errorResponsibility).to.equal(0);
                chai_1.expect(node.errorProjected).to.equal(0);
                chai_1.expect(node.errorGated).to.equal(0);
                chai_1.expect(node.old).to.equal(0);
                chai_1.expect(node.state).to.equal(0);
                chai_1.expect(node.activation).to.equal(0);
            });
        });
    });
    describe('network.mutate()', function () {
        describe('Network.mutateRandom()', function () {
            it('originalNetwork !== newNetwork', function () {
                var network = new Network_1.Network(10, 10);
                var copy = network.copy();
                network.mutateRandom();
                chai_1.expect(copy.toJSON()).to.not.equal(network.toJSON()); // eql: check for content equality (instead of for the same point in memory)
            });
            it("Shouldn't add node when at max nodes", function () {
                var network = new Network_1.Network(3, 4);
                network.mutateRandom([new Mutation_1.AddNodeMutation()], { maxNodes: 7 });
                chai_1.expect(network.nodes.length).equal(7);
            });
            it("Shouldn't add connections when at max connections", function () {
                var network = new Network_1.Network(1, 6);
                network.mutateRandom([new Mutation_1.AddConnectionMutation()], { maxConnections: 6 });
                chai_1.expect(network.connections.size).equal(6);
            });
            it("Shouldn't change network when all methods impossible", function () {
                var network = new Network_1.Network(2, 2);
                var copy = network.copy();
                // impossible mutation method
                network.mutateRandom([new Mutation_1.SubGateMutation()]);
                chai_1.expect(copy).to.eql(network); // eql: check for content equality (instead of for the same point in memory)
            });
        });
    });
    describe('network.copy()', function () {
        it('network.copy() => {Network}', function () {
            var original = new Network_1.Network(10, 10);
            var copy = original.copy();
            chai_1.expect(copy).eql(original);
        });
        it("network.copy() | Shouldn't return a shallow copy", function () {
            var original = new Network_1.Network(10, 5);
            var copy = original.copy();
            chai_1.expect(copy).not.equal(original);
        });
    });
    describe('network.propagate()', function () {
        it('network.propagate(rate, momentum, update, target_output) => {undefined}', function () {
            var upperTestEpochLimit = 2000; // will attempt to propagate this many times
            var testNetwork = createTestNetwork();
            // train the network to output all 1s.
            var inputSize = testNetwork.inputSize;
            var outputSize = testNetwork.outputSize;
            var idealOutput = Array(outputSize).fill(1);
            for (var i = 0; i < upperTestEpochLimit; i++) {
                var randomInput_1 = Array(inputSize).fill(0).map(function () { return Math.random(); });
                testNetwork.activate(randomInput_1);
                testNetwork.propagate(idealOutput, { rate: 0.25, momentum: 0.01, update: true });
            }
            var randomInput = Array(inputSize).fill(0).map(function () { return Math.random(); });
            var testOutput = testNetwork.activate(randomInput);
            var epsilon = 0.08;
            testOutput.forEach(function (value, index) {
                chai_1.expect(value).to.be.closeTo(idealOutput[index], epsilon);
            });
        });
    });
    describe('network.gate()', function () {
        it('network.gate(node_not_in_network, Connection) => {ReferenceError}', function () {
            var testNetwork = createTestNetwork();
            var node = new Node_1.Node();
            var connection = node.connect(testNetwork.nodes[20]);
            chai_1.expect(function () {
                testNetwork.addGate(node, connection);
            }).to.throw(ReferenceError);
        });
        it('network.gate(Node, Connection) => {undefined}', function () {
            var testNetwork = createTestNetwork();
            var nodesBefore = testNetwork.nodes.slice();
            testNetwork.mutate(new Mutation_1.AddNodeMutation());
            var node = testNetwork.nodes.filter(function (node) { return !nodesBefore.includes(node); })[0];
            var connection = node.connect(testNetwork.nodes[20]);
            var beforeNumberOfGates = testNetwork.gates.size;
            testNetwork.addGate(node, connection);
            chai_1.expect(testNetwork.gates).to.be.of.length(beforeNumberOfGates + 1);
            chai_1.expect(connection.gateNode).to.eql(node);
            chai_1.expect(node.gated).to.have.lengthOf(1);
        });
    });
    describe('network.removeGate()', function () {
        it('network.removeGate(connection_not_in_network) => {ReferenceError}', function () {
            var testNetwork = createTestNetwork();
            var node = new Node_1.Node();
            var connection = node.connect(testNetwork.nodes[20]);
            node.addGate(connection);
            chai_1.expect(function () {
                testNetwork.removeGate(connection);
            }).to.throw(Error);
        });
        it('network.removeGate(Connection) => {undefined}', function () {
            var testNetwork = createTestNetwork();
            for (var i = 0; i < 20; i++) {
                testNetwork.mutate(new Mutation_1.AddNodeMutation());
                testNetwork.mutate(new Mutation_1.AddConnectionMutation());
                testNetwork.mutate(new Mutation_1.AddGateMutation());
            }
            var gatesBefore = testNetwork.gates.size;
            testNetwork.mutate(new Mutation_1.SubGateMutation());
            chai_1.expect(testNetwork.gates.size).to.be.equal(gatesBefore - 1);
        });
    });
    describe('network.remove()', function () {
        it('network.remove(node_not_in_network) => {ReferenceError}', function () {
            var testNetwork = createTestNetwork();
            var node = new Node_1.Node();
            chai_1.expect(function () {
                testNetwork.removeNode(node);
            }).to.throw(ReferenceError);
        });
    });
    describe('network.train()', function () {
        it('network.train(dataset) => {{error:{number},iterations:{number},time:{number}}}', function () {
            var network = new Network_1.Network(4, 4);
            var dataset = [
                { input: [1, 0, 0, 0], output: [0, 0, 0, 1] },
                { input: [0, 1, 0, 0], output: [0, 0, 1, 0] },
                { input: [0, 0, 1, 0], output: [0, 1, 0, 0] },
                { input: [0, 0, 0, 1], output: [1, 0, 0, 0] },
            ];
            var initial = network.test(dataset);
            var options = new TrainOptions_1.TrainOptions(dataset);
            options.iterations = 50;
            var trainReturn = network.train(options);
            var final = network.test(dataset);
            chai_1.expect(trainReturn.error).to.be.a('number');
            chai_1.expect(trainReturn.iterations).to.be.a('number');
            chai_1.expect(trainReturn.time).to.be.a('number');
            chai_1.expect(final).to.be.at.most(initial / 3);
        });
    });
    describe('network.evolve()', function () {
        // similar to network.train, with the difference that this dataset requires
        // evolving the network to be solvable
        it('network.evolve(dataset) => {{error:{number},iterations:{number},time:{number}}}', function () {
            return __awaiter(this, void 0, void 0, function () {
                var network, i, dataset, initial, options, evolveReturn, final;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.timeout(30000);
                            network = new Network_1.Network(2, 1);
                            for (i = 0; i < 10; i++) {
                                network.mutate(new Mutation_1.AddNodeMutation());
                            }
                            dataset = [
                                { input: [1, 0], output: [0] },
                                { input: [0, 1], output: [0] },
                                { input: [1, 1], output: [1] },
                                { input: [2, 1], output: [2] },
                                { input: [2, 2], output: [4] },
                                { input: [2, 3], output: [6] },
                                { input: [3, 3], output: [9] },
                                { input: [-3, 3], output: [-9] },
                            ];
                            initial = network.test(dataset);
                            options = new EvolveOptions_1.EvolveOptions();
                            options.iterations = 10;
                            options.dataset = dataset;
                            return [4 /*yield*/, network.evolve(options)];
                        case 1:
                            evolveReturn = _a.sent();
                            final = network.test(dataset);
                            chai_1.expect(evolveReturn.error).to.be.a('number');
                            chai_1.expect(evolveReturn.iterations).to.be.a('number');
                            chai_1.expect(evolveReturn.time).to.be.a('number');
                            chai_1.expect(final).to.be.at.most(initial);
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
});
