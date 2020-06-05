import {expect} from "chai";
import {Connection} from "../../../src/architecture/Connection";
import {Network} from "../../../src/architecture/Network";
import {Node} from "../../../src/architecture/Node";
import {AddConnectionMutation, AddGateMutation, AddNodeMutation, SubGateMutation} from "../../../src/methods/Mutation";
import {randInt} from "../../../src/methods/Utils";

describe('Network', () => {
    function createTestNetwork(): Network {
        const network: Network = new Network(10, 20);

        for (let i: number = 0; i < randInt(10, 20); i++) {
            network.mutate(new AddNodeMutation(true));
            network.mutate(new AddConnectionMutation());
            network.mutate(new AddConnectionMutation());
        }

        const input: number[] = [];
        for (let i: number = 0; i < 10; i++) {
            input.push(Math.random());
        }

        network.activate(input, {dropoutRate: 0.5});
        return network;
    }

    describe('new Network()', () => {
        it('new Network(inputSize, outputSize) => {Network}', () => {
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

                network.mutateRandom([new AddNodeMutation()], {maxNodes: 7});

                expect(network.nodes.length).equal(7);
            });

            it("Shouldn't add connections when at max connections", () => {
                const network: Network = new Network(1, 6);

                network.mutateRandom([new AddConnectionMutation()], {maxConnections: 6});

                expect(network.connections.size).equal(6);
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
                testNetwork.propagate(idealOutput, {rate: 0.25, momentum: 0.01, update: true});
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
            const node: Node = testNetwork.nodes.filter(node => !nodesBefore.includes(node))[0];
            const connection: Connection = node.connect(testNetwork.nodes[20]);

            const beforeNumberOfGates: number = testNetwork.gates.size;
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

            const gatesBefore: number = testNetwork.gates.size;

            testNetwork.mutate(new SubGateMutation());

            expect(testNetwork.gates.size).to.be.equal(gatesBefore - 1);
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
            const trainReturn: { error: number; iterations: number; time: number } = network.train({
                iterations: 50,
                dataset
            });
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
            const evolveReturn: { error: number; iterations: number; time: number } = await network.evolve({
                iterations: 50,
                dataset
            });
            const final: number = network.test(dataset);

            expect(evolveReturn.error).to.be.a('number');
            expect(evolveReturn.iterations).to.be.a('number');
            expect(evolveReturn.time).to.be.a('number');
            expect(final).to.be.at.most(initial);
        });
    });
});
