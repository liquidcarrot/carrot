import {expect} from "chai";
import {Connection} from "../../../src/architecture/Connection";
import {Node} from "../../../src/architecture/Node";
import {NodeType} from "../../../src/enums/NodeType";
import {NodeJSON} from "../../../src/interfaces/NodeJSON";
import {Activation} from "../../../src/methods/Activation";
import {ModBiasMutation} from "../../../src/methods/Mutation";
import {randDouble, randInt} from "../../../src/methods/Utils";

describe("Node", function (): void {
    describe("node.connect()", function (): void {
        it("node.connect(self) => {Connection}", function (): void {
            const node: Node = new Node();

            expect(node.connect(node)).to.be.an.instanceOf(Connection);
            expect(node.selfConnection.weight).to.equal(1);
        });
        it("node.connect(node) => {Connection}", function (): void {
            const node: Node = new Node();
            const other: Node = new Node();

            expect(node.connect(other)).to.be.an.instanceOf(Connection);
        });
        it("node.connect(node, options={ twosided: true }) => {Connection}", function (): void {
            const node: Node = new Node();
            const other: Node = new Node();
            expect(node.connect(other, 1, true)).to.be.an.instanceOf(Connection);
            expect(node.incoming).to.have.lengthOf(1);
            expect(node.outgoing).to.have.lengthOf(1);
        });
    });
    describe("node.disconnect()", function (): void {
        it("node.disconnect(self) => {Connection}", function (): void {
            const node: Node = new Node();
            node.connect(node);

            expect(node.disconnect(node)).to.be.an.instanceOf(Connection);
            expect(node.selfConnection.weight).to.equal(0);
        });
        it("node.disconnect(node) => {Connection}", function (): void {
            const node: Node = new Node();
            const other: Node = new Node();

            expect(node.connect(other)).to.be.an.instanceOf(Connection);
        });
        it("node.disconnect(node, options={ twosided: true }) => {Connection}", function (): void {
            const node: Node = new Node(NodeType.HIDDEN);
            const other: Node = new Node(NodeType.OUTPUT);

            node.connect(other, 1, true);
            const connection: Connection = node.disconnect(other, true);

            expect(connection).to.be.an.instanceOf(Connection);

            expect(node.incoming).to.have.lengthOf(0);
            expect(node.outgoing).to.have.lengthOf(0);
        });
    });
    describe("node.activate()", function (): void {
        it("node.activate() => {number}", function (): void {
            const node: Node = new Node();

            expect(node.activate()).to.not.be.NaN;
        });
        it("node.activate(number) => {number}", function (): void {
            const node: Node = new Node();
            const input: number = randDouble(0, 10);

            const output: number = node.activate(input);

            expect(output).to.not.be.NaN;
            expect(output).to.equal(input);
        });
        it("node.activate(options={ trace: false })", function (): void {
            const node: Node = new Node();

            const output: number = node.activate(undefined, false);

            expect(output).to.not.be.NaN;
            expect(node.derivativeState).to.be.equal(1);
        });
        it("node.activate(number, options={ trace: false })", function (): void {
            const node: Node = new Node();
            const input: number = randDouble(0, 10);

            const output: number = node.activate(input, false);

            expect(output).to.not.be.NaN;
            expect(output).to.equal(input);
            expect(node.derivativeState).to.be.equal(1);
        });
    });
    describe("node.propagate()", function (): void {
        it("node.propagate() => { responsibility: number, projected: number, gated: number }", function (): void {
            const node: Node = new Node();
            const input: number = randDouble(0, 10);

            node.activate(input);
            node.propagate(undefined, {
                momentum: 0,
                rate: 0,
                update: false
            });

            expect(node.errorResponsibility).to.not.be.NaN;
            expect(node.errorProjected).to.not.be.NaN;
            expect(node.errorGated).to.not.be.NaN;
        });
        it("node.propagate(number) => { responsibility: number, projected: number, gated: number }", function (): void {
            const node: Node = new Node();
            const input: number = randDouble(0, 10);
            const target: number = randDouble(0, 10);

            node.activate(input);
            node.propagate(target, {
                rate: 0,
                momentum: 0,
                update: false
            });

            expect(node.errorResponsibility).to.not.be.NaN;
            expect(node.errorProjected).to.not.be.NaN;
            expect(node.errorGated).to.not.be.NaN;
            expect(node.errorResponsibility).to.equal(target - input);
            expect(node.errorProjected).to.equal(target - input);
            expect(node.errorGated).to.equal(0);
        });
        it("node.propagate(options={ update: false }) => { responsibility: number, projected: number, gated: number }", function (): void {
            const node: Node = new Node();
            const input: number = randDouble(0, 10);
            node.activate(input);
            node.propagate(undefined, {
                rate: 0,
                momentum: 0,
                update: false
            });

            expect(node.errorResponsibility).to.not.be.NaN;
            expect(node.errorProjected).to.not.be.NaN;
            expect(node.errorGated).to.not.be.NaN;
            expect(node.deltaBiasTotal).to.equal(0);
            expect(node.deltaBiasPrevious).to.equal(0);
        });
        it("node.propagate(number, options={ update: false }) => { responsibility: number, projected: number, gated: number }", function (): void {
            const node: Node = new Node();
            const input: number = randDouble(0, 10);
            const target: number = randDouble(0, 10);

            node.activate(input);
            node.propagate(target, {
                rate: 0,
                momentum: 0,
                update: false
            });

            expect(node.errorResponsibility).to.not.be.NaN;
            expect(node.errorProjected).to.not.be.NaN;
            expect(node.errorGated).to.not.be.NaN;
            expect(node.deltaBiasPrevious).to.equal(0);
        });
    });
    describe("node.gate()", function (): void {
        it("node.gate(connection) => {Connection}", function (): void {
            const input: Node = new Node();
            const output: Node = new Node();
            const connection: Connection = input.connect(output);
            const node: Node = new Node();

            node.addGate(connection);

            expect(connection).to.be.an.instanceof(Connection);
            expect(connection.gateNode).to.eql(node);
            expect(node.gated).to.have.lengthOf(1);
        });
        it("node.gate(connections) => {Connection[]}", function (): void {
            const size: number = randInt(1, 10);
            const inputs: Node[] = [];
            const outputs: Node[] = [];
            const connections: Connection[] = [];
            const node: Node = new Node();

            for (let i: number = 0; i < size; i++) {
                inputs.push(new Node());
                outputs.push(new Node());
                connections.push(new Connection(inputs[i], outputs[i]));
            }
            connections.forEach((connection: Connection) => node.addGate(connection));

            expect(connections).to.be.an("array");
            expect(connections).to.have.lengthOf(size);

            for (const connection of connections) {
                expect(connection).to.be.an.instanceOf(Connection);
                expect(connection.gateNode).to.eql(node);
            }

            expect(node.gated).to.have.lengthOf(size);
        });
    });
    describe("node.removeGate()", function (): void {
        it("node.removeGate(connection) => {Connection}", function (): void {
            const input: Node = new Node();
            const output: Node = new Node();
            const node: Node = new Node();
            const connection: Connection = input.connect(output);

            node.addGate(connection);
            node.removeGate(connection);

            expect(connection).to.be.an.instanceof(Connection);
            expect(connection.gateNode).to.not.exist;
            expect(node.gated).to.have.lengthOf(0);
        });
        it("node.removeGate(connections) => {Connection[]}", function (): void {
            const size: number = randInt(1, 10);
            const inputs: Node[] = [];
            const outputs: Node[] = [];
            const connections: Connection[] = [];
            const node: Node = new Node();

            for (let i: number = 0; i < size; i++) {
                inputs.push(new Node());
                outputs.push(new Node());
                connections.push(new Connection(inputs[i], outputs[i]));
            }
            connections.forEach((conn: Connection) => node.addGate(conn));
            connections.forEach((conn: Connection) => node.removeGate(conn));

            expect(connections).to.be.an("array");
            expect(connections).to.have.lengthOf(size);

            for (const connection of connections) {
                expect(connection).to.be.an.instanceOf(Connection);
                expect(connection.gateNode).to.not.exist;
            }

            expect(node.gated).to.have.lengthOf(0);
        });
    });
    describe("node.clear()", function (): void {
        it("node.clear() => {undefined}", function (): void {
            const node: Node = new Node();
            const input: number = randDouble(0, 10);
            const input2: number = randDouble(0, 10);

            node.activate(input);
            node.propagate(input2, {rate: 0, momentum: 0, update: false});

            node.clear();

            expect(node.old).to.equal(0);
            expect(node.state).to.equal(0);
            expect(node.activation).to.equal(0);
            expect(node.errorResponsibility).to.equal(0);
            expect(node.errorProjected).to.equal(0);
            expect(node.errorGated).to.equal(0);

            for (const connection of node.incoming) {
                expect(connection.eligibility).to.equal(0);
                expect(connection.xTraceNodes).to.be.an("array");
                expect(connection.xTraceNodes).to.have.lengthOf(0);
                expect(connection.xTraceValues).to.be.an("array");
                expect(connection.xTraceValues).to.have.lengthOf(0);
            }
            node.gated.forEach((connection: Connection) => expect(connection.gain).to.equal(0));
        });
    });
    describe("node.mutate()", function (): void {
        it("node.mutate(options={ method: methods.mutation.MOD_ACTIVATION }) => {undefined}", function (): void {
            const node: Node = new Node();
            const squash: Activation = node.squash;
            const bias: number = node.bias;

            node.mutateActivation();

            expect(node.squash).to.not.equal(squash);
            expect(node.bias).to.equal(bias);
            expect(node.bias).to.eql(bias);
        });
        it("node.mutate(options={ method: methods.mutation.MOD_BIAS }) => {undefined}", function (): void {
            const node: Node = new Node();
            const squash: Activation = node.squash;
            const bias: number = node.bias;

            node.mutateBias(new ModBiasMutation(-1, 1));

            expect(node.squash).to.equal(squash);
            expect(node.bias).to.not.equal(bias);
            expect(node.bias).to.not.eql(bias);
        });
    });
    describe("node.isProjectingTo()", function (): void {
        it("node.isProjectingTo(self) => {boolean}", function (): void {
            const node: Node = new Node();

            expect(node.isProjectingTo(node)).to.be.false;

            node.connect(node);

            expect(node.isProjectingTo(node)).to.be.true;
        });
        it("node.isProjectingTo(node) => {boolean}", function (): void {
            const node: Node = new Node();
            const other: Node = new Node();

            expect(node.isProjectingTo(other)).to.be.false;

            node.connect(other);

            expect(node.isProjectingTo(other)).to.be.true;
        });
        it("node.isProjectingTo(nodes) => {boolean}", function (): void {
            const size: number = randInt(1, 10);
            const node: Node = new Node();
            const others: Node[] = [];

            for (let i: number = 0; i < size; i++) {
                others.push(new Node());
            }
            others.forEach((other: Node) => {
                expect(node.isProjectingTo(other)).to.be.false;

                node.connect(other);

                expect(node.isProjectingTo(other)).to.be.true;
            });
        });
    });
    describe("node.isProjectedBy()", function (): void {
        it("node.isProjectedBy(self) => {boolean}", function (): void {
            const node: Node = new Node();

            expect(node.isProjectedBy(node)).to.be.false;

            node.connect(node);

            expect(node.isProjectedBy(node)).to.be.true;
        });
        it("node.isProjectedBy(node) => {boolean}", function (): void {
            const node: Node = new Node();
            const other: Node = new Node();

            expect(node.isProjectedBy(other)).to.be.false;

            other.connect(node);

            expect(node.isProjectedBy(other)).to.be.true;
        });
        it("node.isProjectedBy(nodes) => {boolean}", function (): void {
            const size: number = randInt(1, 10);
            const node: Node = new Node();
            const others: Node[] = [];

            for (let i: number = 0; i < size; i++) {
                others.push(new Node());
            }
            others.forEach((other: Node) => {
                expect(node.isProjectedBy(other)).to.be.false;
                other.connect(node);
                expect(node.isProjectedBy(other)).to.be.true;
            });
        });
    });
    describe("node.toJSON()", function (): void {
        it("node.toJSON() => {Object}", function (): void {
            const node: Node = new Node();

            const json: NodeJSON = node.toJSON();

            expect(json).to.be.an("object");
            expect(json.bias).to.not.be.NaN;
            expect(json.squash).to.be.a("number"); // number representing the enum value
        });
    });
});
