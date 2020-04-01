import {EvolveOptions, Network} from "../../../src/architecture/Network";
import {Connection, Node} from "../../../src";
import {anyMatch, randDouble, randInt} from "../../../src/methods/Utils";
import {
    AddConnectionMutation,
    AddGateMutation,
    AddNodeMutation,
    ALL_MUTATIONS,
    SubGateMutation
} from "../../../src/methods/Mutation";
import {expect} from "chai";

describe('Network', () => {
    function createTestNetwork(): Network {
        const network: Network = new Network(10, 20);

        for (let i: number = 0; i < randInt(10, 20); i++) {
            network.mutate(new AddNodeMutation(true));
            network.mutate(new AddConnectionMutation());
            network.mutate(new AddConnectionMutation());
        }

        const input: number[] = Array(10).map(() => Math.random());

        network.activate(input, 0.5);
        return network;
    }

    describe('new Network()', () => {
        it('new Network(input_size, output_size) => {Network}', () => {
            const network: Network = new Network(10, 20);
            expect(network).to.be.an.instanceOf(Network);
            expect(network.nodes).to.be.of.length(30);
        });
    });

    describe('network.connect()', () => {
        it('network.connect() => {Connection[]}', () => {
            const network: Network = new Network(10, 20);
            const sourceNode: Node = new Node();
            const targetNode: Node = network.nodes[25];
            const formedConnection: Connection = network.connect(sourceNode, targetNode, 7);
            expect(formedConnection).to.be.an.instanceOf(Connection);
            expect(formedConnection.from).eql(sourceNode);
            expect(formedConnection.to).eql(targetNode);
        });
    });

    describe('network.clear()', () => {
        it('network.clear() => {undefined}', () => {
            const testNetwork: Network = createTestNetwork();

            testNetwork.clear();
            testNetwork.nodes.forEach(node => {
                expect(node.errorResponsibility).to.equal(0);
                expect(node.errorProjected).to.equal(0);
                expect(node.errorGated).to.equal(0);
                expect(node.old).to.equal(0);
                expect(node.state).to.equal(0);
                expect(node.activation).to.equal(0);
            });
        });
    });

    describe('network.mutate()', () => {
        describe('Network.mutateRandom()', () => {
            it('originalNetwork !== newNetwork', () => {
                const network: Network = new Network(10, 10);
                const copy: Network = network.copy();
                network.mutateRandom();
                expect(copy.toJSON()).to.not.equal(network.toJSON()); // eql: check for content equality (instead of for the same point in memory)
            });

            it("Shouldn't add node when at max nodes", () => {
                const network: Network = new Network(3, 4);

                network.mutateRandom([new AddNodeMutation()], 7);

                expect(network.nodes.length).equal(7);
            });

            it("Shouldn't add connections when at max connections", () => {
                const network: Network = new Network(1, 6);

                network.mutateRandom([new AddConnectionMutation()], Infinity, 6);

                expect(network.connections.length).equal(6);
            });

            it("Shouldn't change network when all methods impossible", () => {
                const network: Network = new Network(2, 2);
                const copy: Network = network.copy();

                // impossible mutation method
                network.mutateRandom([new SubGateMutation()]);

                expect(copy).to.eql(network); // eql: check for content equality (instead of for the same point in memory)
            });
        });
    });

    describe('network.copy()', () => {
        it('network.copy() => {Network}', () => {
            const original: Network = new Network(10, 10);

            const copy: Network = original.copy();

            expect(copy).eql(original);
        });

        it("network.copy() | Shouldn't return a shallow copy", () => {
            const original: Network = new Network(10, 5);

            const copy: Network = original.copy();

            expect(copy).not.equal(original);
        });
    });

    describe('network.propagate()', () => {
        it('network.propagate(rate, momentum, update, target_output) => {undefined}', () => {
            const upperTestEpochLimit: number = 2000; // will attempt to propagate this many times

            const testNetwork: Network = createTestNetwork();

            // train the network to output all 1s.
            const inputSize: number = testNetwork.inputSize;
            const outputSize: number = testNetwork.outputSize;
            const idealOutput: number[] = Array(outputSize).fill(1);

            for (let i: number = 0; i < upperTestEpochLimit; i++) {
                const randomInput: number[] = Array(inputSize).fill(0).map(() => Math.random());
                testNetwork.activate(randomInput);
                testNetwork.propagate(0.25, 0.01, true, idealOutput);
            }

            const randomInput: number[] = Array(inputSize).fill(0).map(() => Math.random());
            const testOutput: number[] = testNetwork.activate(randomInput);

            const epsilon: number = 0.08;
            testOutput.forEach((value, index) => {
                expect(value).to.be.closeTo(idealOutput[index], epsilon);
            });

        });
    });

    describe('network.gate()', () => {
        it('network.gate(node_not_in_network, Connection) => {ReferenceError}', () => {
            const testNetwork: Network = createTestNetwork();
            const node: Node = new Node();
            const connection: Connection = node.connect(testNetwork.nodes[20]);

            expect(() => {
                testNetwork.addGate(node, connection);
            }).to.throw(ReferenceError);
        });
        it('network.gate(Node, Connection) => {undefined}', () => {
            const testNetwork: Network = createTestNetwork();
            const nodesBefore: Node[] = testNetwork.nodes.slice();
            testNetwork.mutate(new AddNodeMutation());
            const node: Node = testNetwork.nodes.filter(node => !anyMatch(nodesBefore, node))[0];
            const connection: Connection = node.connect(testNetwork.nodes[20]);

            const beforeNumberOfGates: number = testNetwork.gates.length;
            testNetwork.addGate(node, connection);
            expect(testNetwork.gates).to.be.of.length(beforeNumberOfGates + 1);
            expect(connection.gateNode).to.eql(node);
            expect(node.gated).to.have.lengthOf(1);
        });
    });

    describe('network.ungate()', () => {
        it('network.ungate(connection_not_in_network) => {ReferenceError}', () => {
            const testNetwork: Network = createTestNetwork();
            const node: Node = new Node();
            const connection: Connection = node.connect(testNetwork.nodes[20]);
            node.addGate(connection);

            expect(() => {
                testNetwork.removeGate(connection);
            }).to.throw(Error);
        });
        it('network.ungate(Connection) => {undefined}', () => {
            const testNetwork: Network = createTestNetwork();

            for (let i: number = 0; i < 20; i++) {
                testNetwork.mutate(new AddNodeMutation());
                testNetwork.mutate(new AddConnectionMutation());
                testNetwork.mutate(new AddGateMutation());
            }

            const gatesBefore: number = testNetwork.gates.length;

            testNetwork.mutate(new SubGateMutation());

            expect(testNetwork.gates.length).to.be.equal(gatesBefore - 1);
        });
    });

    describe('network.remove()', () => {
        it('network.remove(node_not_in_network) => {ReferenceError}', () => {
            const testNetwork: Network = createTestNetwork();
            const node: Node = new Node();

            expect(() => {
                testNetwork.removeNode(node);
            }).to.throw(ReferenceError);
        });
    });

    describe('network.train()', () => {
        it('network.train(dataset) => {{error:{number},iterations:{number},time:{number}}}', () => {
            const network: Network = new Network(4, 4);

            const dataset: { output: number[]; input: number[] }[] = [
                {input: [1, 0, 0, 0], output: [0, 0, 0, 1]},
                {input: [0, 1, 0, 0], output: [0, 0, 1, 0]},
                {input: [0, 0, 1, 0], output: [0, 1, 0, 0]},
                {input: [0, 0, 0, 1], output: [1, 0, 0, 0]},
            ];

            const initial: number = network.test(dataset);
            const trainReturn: { error: number; iterations: number; time: number } = network.train(dataset);
            const final: number = network.test(dataset);

            expect(trainReturn.error).to.be.a('number');
            expect(trainReturn.iterations).to.be.a('number');
            expect(trainReturn.time).to.be.a('number');
            expect(final).to.be.at.most(initial / 3);
        });
    });

    describe('network.evolve()', () => {
        // similar to network.train, with the difference that this dataset requires
        // evolving the network to be solvable
        it('network.evolve(dataset) => {{error:{number},iterations:{number},time:{number}}}', async function (): Promise<void> {
            this.timeout(30000);
            const network: Network = new Network(2, 1);
            for (let i: number = 0; i < 10; i++) {
                network.mutate(new AddNodeMutation());
            }

            // multiplies the two inputs
            const dataset: { input: number[], output: number[] }[] = [
                {input: [1, 0], output: [0]},
                {input: [0, 1], output: [0]},
                {input: [1, 1], output: [1]},
                {input: [2, 1], output: [2]},
                {input: [2, 2], output: [4]},
                {input: [2, 3], output: [6]},
                {input: [3, 3], output: [9]},
                {input: [-3, 3], output: [-9]},
            ];

            const initial: number = network.test(dataset);
            const evolveReturn: { error: number; iterations: number; time: number } = await network.evolve(dataset, {iterations: 50});
            const final: number = network.test(dataset);

            expect(evolveReturn.error).to.be.a('number');
            expect(evolveReturn.iterations).to.be.a('number');
            expect(evolveReturn.time).to.be.a('number');
            expect(final).to.be.below(initial);
        });
    });

    describe("Evolving capabilities", () => {
        async function evolveSet(set: { input: number[], output: number[] }[], iterations: number, error: number): Promise<void> {
            const network: Network = new Network(set[0].input.length, set[0].output.length);

            const options: EvolveOptions = {
                error,
                mutations: ALL_MUTATIONS,
                populationSize: 100
            };

            const results: { error: number; iterations: number; time: number } = await network.evolve(set, options);

            expect(isNaN(results.error)).to.be.false;
            expect(results.error).to.be.below(error);
        }

        it('AND gate', function (): void {
            evolveSet([
                {input: [0, 0], output: [0]},
                {input: [0, 1], output: [0]},
                {input: [1, 0], output: [0]},
                {input: [1, 1], output: [1]}
            ], 1000, 0.002);
        });
        it('XOR gate', () => {
            evolveSet([
                {input: [0, 0], output: [0]},
                {input: [0, 1], output: [1]},
                {input: [1, 0], output: [1]},
                {input: [1, 1], output: [0]}
            ], 3000, 0.002);
        });
        it('NOT gate', () => {
            evolveSet([
                {input: [0], output: [1]},
                {input: [1], output: [0]}
            ], 1000, 0.002);
        });
        it('XNOR gate', () => {
            evolveSet([
                {input: [0, 0], output: [1]},
                {input: [0, 1], output: [0]},
                {input: [1, 0], output: [0]},
                {input: [1, 1], output: [1]}
            ], 3000, 0.002);
        });
        it('OR gate', () => {
            evolveSet([
                {input: [0, 0], output: [0]},
                {input: [0, 1], output: [1]},
                {input: [1, 0], output: [1]},
                {input: [1, 1], output: [1]}
            ], 1000, 0.002);
        });
        it('SIN function', function (): void {
            const set: { input: number[], output: number[] }[] = [];

            for (let i: number = 0; i < 100; i++) {
                const inputValue: number = randDouble(0, Math.PI * 2);
                set.push({
                    input: [inputValue / (Math.PI * 2)],
                    output: [(Math.sin(inputValue) + 1) / 2]
                });
            }

            evolveSet(set, 1000, 0.05);
        });
        it('Bigger than', () => {
            const set: { input: number[], output: number[] }[] = [];

            for (let i: number = 0; i < 100; i++) {
                const x: number = Math.random();
                const y: number = Math.random();
                const z: number = x > y ? 1 : 0;

                set.push({input: [x, y], output: [z]});
            }

            evolveSet(set, 500, 0.05);
        });
        it('SIN + COS', () => {
            const set: { input: number[], output: number[] }[] = [];

            for (let i: number = 0; i < 100; i++) {
                const inputValue: number = randDouble(0, Math.PI * 2);
                set.push({
                    input: [inputValue / (Math.PI * 2)],
                    output: [
                        (Math.sin(inputValue) + 1) / 2,
                        (Math.cos(inputValue) + 1) / 2
                    ]
                });
            }

            evolveSet(set, 1000, 0.05);
        });

        it('SHIFT', () => {
            const set: { input: number[], output: number[] }[] = [];

            for (let i: number = 0; i < 1000; i++) {
                const x: number = Math.random();
                const y: number = Math.random();
                const z: number = Math.random();

                set.push({input: [x, y, z], output: [z, x, y]});
            }

            evolveSet(set, 500, 0.03);
        });
    });
});
