"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Connection_1 = require("../../../src/architecture/Connection");
const Node_1 = require("../../../src/architecture/Node");
const NodeType_1 = require("../../../src/enums/NodeType");
const Mutation_1 = require("../../../src/methods/Mutation");
const Utils_1 = require("../../../src/utils/Utils");
describe("Node", function () {
    describe("node.connect()", function () {
        it("node.connect(self) => {Connection}", function () {
            const node = new Node_1.Node();
            chai_1.expect(node.connect(node)).to.be.an.instanceOf(Connection_1.Connection);
            chai_1.expect(node.selfConnection.weight).to.equal(1);
        });
        it("node.connect(node) => {Connection}", function () {
            const node = new Node_1.Node();
            const other = new Node_1.Node();
            chai_1.expect(node.connect(other)).to.be.an.instanceOf(Connection_1.Connection);
        });
        it("node.connect(node, options={ twosided: true }) => {Connection}", function () {
            const node = new Node_1.Node();
            const other = new Node_1.Node();
            chai_1.expect(node.connect(other, 1, true)).to.be.an.instanceOf(Connection_1.Connection);
            chai_1.expect(node.incoming).to.have.lengthOf(1);
            chai_1.expect(node.outgoing).to.have.lengthOf(1);
        });
    });
    describe("node.disconnect()", function () {
        it("node.disconnect(self) => {Connection}", function () {
            const node = new Node_1.Node();
            node.connect(node);
            chai_1.expect(node.disconnect(node)).to.be.an.instanceOf(Connection_1.Connection);
            chai_1.expect(node.selfConnection.weight).to.equal(0);
        });
        it("node.disconnect(node) => {Connection}", function () {
            const node = new Node_1.Node();
            const other = new Node_1.Node();
            chai_1.expect(node.connect(other)).to.be.an.instanceOf(Connection_1.Connection);
        });
        it("node.disconnect(node, options={ twosided: true }) => {Connection}", function () {
            const node = new Node_1.Node(NodeType_1.NodeType.HIDDEN);
            const other = new Node_1.Node(NodeType_1.NodeType.OUTPUT);
            node.connect(other, 1, true);
            const connection = node.disconnect(other, true);
            chai_1.expect(connection).to.be.an.instanceOf(Connection_1.Connection);
            chai_1.expect(node.incoming).to.have.lengthOf(0);
            chai_1.expect(node.outgoing).to.have.lengthOf(0);
        });
    });
    describe("node.activate()", function () {
        it("node.activate() => {number}", function () {
            const node = new Node_1.Node();
            chai_1.expect(node.activate()).to.not.be.NaN;
        });
        it("node.activate(number) => {number}", function () {
            const node = new Node_1.Node();
            const input = Utils_1.randDouble(0, 10);
            const output = node.activate(input);
            chai_1.expect(output).to.not.be.NaN;
            chai_1.expect(output).to.equal(input);
        });
        it("node.activate(options={ trace: false })", function () {
            const node = new Node_1.Node();
            const output = node.activate(undefined, false);
            chai_1.expect(output).to.not.be.NaN;
            chai_1.expect(node.derivativeState).to.be.equal(1);
        });
        it("node.activate(number, options={ trace: false })", function () {
            const node = new Node_1.Node();
            const input = Utils_1.randDouble(0, 10);
            const output = node.activate(input, false);
            chai_1.expect(output).to.not.be.NaN;
            chai_1.expect(output).to.equal(input);
            chai_1.expect(node.derivativeState).to.be.equal(1);
        });
    });
    describe("node.propagate()", function () {
        it("node.propagate() => { responsibility: number, projected: number, gated: number }", function () {
            const node = new Node_1.Node();
            const input = Utils_1.randDouble(0, 10);
            node.activate(input);
            node.propagate(undefined, {
                momentum: 0,
                rate: 0,
                update: false
            });
            chai_1.expect(node.errorResponsibility).to.not.be.NaN;
            chai_1.expect(node.errorProjected).to.not.be.NaN;
            chai_1.expect(node.errorGated).to.not.be.NaN;
        });
        it("node.propagate(number) => { responsibility: number, projected: number, gated: number }", function () {
            const node = new Node_1.Node();
            const input = Utils_1.randDouble(0, 10);
            const target = Utils_1.randDouble(0, 10);
            node.activate(input);
            node.propagate(target, {
                rate: 0,
                momentum: 0,
                update: false
            });
            chai_1.expect(node.errorResponsibility).to.not.be.NaN;
            chai_1.expect(node.errorProjected).to.not.be.NaN;
            chai_1.expect(node.errorGated).to.not.be.NaN;
            chai_1.expect(node.errorResponsibility).to.equal(target - input);
            chai_1.expect(node.errorProjected).to.equal(target - input);
            chai_1.expect(node.errorGated).to.equal(0);
        });
        it("node.propagate(options={ update: false }) => { responsibility: number, projected: number, gated: number }", function () {
            const node = new Node_1.Node();
            const input = Utils_1.randDouble(0, 10);
            node.activate(input);
            node.propagate(undefined, {
                rate: 0,
                momentum: 0,
                update: false
            });
            chai_1.expect(node.errorResponsibility).to.not.be.NaN;
            chai_1.expect(node.errorProjected).to.not.be.NaN;
            chai_1.expect(node.errorGated).to.not.be.NaN;
            chai_1.expect(node.deltaBiasTotal).to.equal(0);
            chai_1.expect(node.deltaBiasPrevious).to.equal(0);
        });
        it("node.propagate(number, options={ update: false }) => { responsibility: number, projected: number, gated: number }", function () {
            const node = new Node_1.Node();
            const input = Utils_1.randDouble(0, 10);
            const target = Utils_1.randDouble(0, 10);
            node.activate(input);
            node.propagate(target, {
                rate: 0,
                momentum: 0,
                update: false
            });
            chai_1.expect(node.errorResponsibility).to.not.be.NaN;
            chai_1.expect(node.errorProjected).to.not.be.NaN;
            chai_1.expect(node.errorGated).to.not.be.NaN;
            chai_1.expect(node.deltaBiasPrevious).to.equal(0);
        });
    });
    describe("node.gate()", function () {
        it("node.gate(connection) => {Connection}", function () {
            const input = new Node_1.Node();
            const output = new Node_1.Node();
            const connection = input.connect(output);
            const node = new Node_1.Node();
            node.addGate(connection);
            chai_1.expect(connection).to.be.an.instanceof(Connection_1.Connection);
            chai_1.expect(connection.gateNode).to.eql(node);
            chai_1.expect(node.gated).to.have.lengthOf(1);
        });
        it("node.gate(connections) => {Connection[]}", function () {
            const size = Utils_1.randInt(1, 10);
            const inputs = [];
            const outputs = [];
            const connections = [];
            const node = new Node_1.Node();
            for (let i = 0; i < size; i++) {
                inputs.push(new Node_1.Node());
                outputs.push(new Node_1.Node());
                connections.push(new Connection_1.Connection(inputs[i], outputs[i]));
            }
            connections.forEach((connection) => node.addGate(connection));
            chai_1.expect(connections).to.be.an("array");
            chai_1.expect(connections).to.have.lengthOf(size);
            for (const connection of connections) {
                chai_1.expect(connection).to.be.an.instanceOf(Connection_1.Connection);
                chai_1.expect(connection.gateNode).to.eql(node);
            }
            chai_1.expect(node.gated).to.have.lengthOf(size);
        });
    });
    describe("node.removeGate()", function () {
        it("node.removeGate(connection) => {Connection}", function () {
            const input = new Node_1.Node();
            const output = new Node_1.Node();
            const node = new Node_1.Node();
            const connection = input.connect(output);
            node.addGate(connection);
            node.removeGate(connection);
            chai_1.expect(connection).to.be.an.instanceof(Connection_1.Connection);
            chai_1.expect(connection.gateNode).to.not.exist;
            chai_1.expect(node.gated).to.have.lengthOf(0);
        });
        it("node.removeGate(connections) => {Connection[]}", function () {
            const size = Utils_1.randInt(1, 10);
            const inputs = [];
            const outputs = [];
            const connections = [];
            const node = new Node_1.Node();
            for (let i = 0; i < size; i++) {
                inputs.push(new Node_1.Node());
                outputs.push(new Node_1.Node());
                connections.push(new Connection_1.Connection(inputs[i], outputs[i]));
            }
            connections.forEach((conn) => node.addGate(conn));
            connections.forEach((conn) => node.removeGate(conn));
            chai_1.expect(connections).to.be.an("array");
            chai_1.expect(connections).to.have.lengthOf(size);
            for (const connection of connections) {
                chai_1.expect(connection).to.be.an.instanceOf(Connection_1.Connection);
                chai_1.expect(connection.gateNode).to.not.exist;
            }
            chai_1.expect(node.gated).to.have.lengthOf(0);
        });
    });
    describe("node.clear()", function () {
        it("node.clear() => {undefined}", function () {
            const node = new Node_1.Node();
            const input = Utils_1.randDouble(0, 10);
            const input2 = Utils_1.randDouble(0, 10);
            node.activate(input);
            node.propagate(input2, { rate: 0, momentum: 0, update: false });
            node.clear();
            chai_1.expect(node.old).to.equal(0);
            chai_1.expect(node.state).to.equal(0);
            chai_1.expect(node.activation).to.equal(0);
            chai_1.expect(node.errorResponsibility).to.equal(0);
            chai_1.expect(node.errorProjected).to.equal(0);
            chai_1.expect(node.errorGated).to.equal(0);
            node.incoming.forEach(connection => {
                chai_1.expect(connection.eligibility).to.equal(0);
                chai_1.expect(connection.xTrace.size).to.equal(0);
            });
            node.gated.forEach((connection) => chai_1.expect(connection.gain).to.equal(0));
        });
    });
    describe("node.mutate()", function () {
        it("node.mutate(options={ method: methods.mutation.MOD_ACTIVATION }) => {undefined}", function () {
            const node = new Node_1.Node();
            const squash = node.squash;
            const bias = node.bias;
            node.mutateActivation();
            chai_1.expect(node.squash).to.not.equal(squash);
            chai_1.expect(node.bias).to.equal(bias);
            chai_1.expect(node.bias).to.eql(bias);
        });
        it("node.mutate(options={ method: methods.mutation.MOD_BIAS }) => {undefined}", function () {
            const node = new Node_1.Node();
            const squash = node.squash;
            const bias = node.bias;
            node.mutateBias(new Mutation_1.ModBiasMutation(-1, 1));
            chai_1.expect(node.squash).to.equal(squash);
            chai_1.expect(node.bias).to.not.equal(bias);
            chai_1.expect(node.bias).to.not.eql(bias);
        });
    });
    describe("node.isProjectingTo()", function () {
        it("node.isProjectingTo(self) => {boolean}", function () {
            const node = new Node_1.Node();
            chai_1.expect(node.isProjectingTo(node)).to.be.false;
            node.connect(node);
            chai_1.expect(node.isProjectingTo(node)).to.be.true;
        });
        it("node.isProjectingTo(node) => {boolean}", function () {
            const node = new Node_1.Node();
            const other = new Node_1.Node();
            chai_1.expect(node.isProjectingTo(other)).to.be.false;
            node.connect(other);
            chai_1.expect(node.isProjectingTo(other)).to.be.true;
        });
        it("node.isProjectingTo(nodes) => {boolean}", function () {
            const size = Utils_1.randInt(1, 10);
            const node = new Node_1.Node();
            const others = [];
            for (let i = 0; i < size; i++) {
                others.push(new Node_1.Node());
            }
            others.forEach((other) => {
                chai_1.expect(node.isProjectingTo(other)).to.be.false;
                node.connect(other);
                chai_1.expect(node.isProjectingTo(other)).to.be.true;
            });
        });
    });
    describe("node.isProjectedBy()", function () {
        it("node.isProjectedBy(self) => {boolean}", function () {
            const node = new Node_1.Node();
            chai_1.expect(node.isProjectedBy(node)).to.be.false;
            node.connect(node);
            chai_1.expect(node.isProjectedBy(node)).to.be.true;
        });
        it("node.isProjectedBy(node) => {boolean}", function () {
            const node = new Node_1.Node();
            const other = new Node_1.Node();
            chai_1.expect(node.isProjectedBy(other)).to.be.false;
            other.connect(node);
            chai_1.expect(node.isProjectedBy(other)).to.be.true;
        });
        it("node.isProjectedBy(nodes) => {boolean}", function () {
            const size = Utils_1.randInt(1, 10);
            const node = new Node_1.Node();
            const others = [];
            for (let i = 0; i < size; i++) {
                others.push(new Node_1.Node());
            }
            others.forEach((other) => {
                chai_1.expect(node.isProjectedBy(other)).to.be.false;
                other.connect(node);
                chai_1.expect(node.isProjectedBy(other)).to.be.true;
            });
        });
    });
    describe("node.toJSON()", function () {
        it("node.toJSON() => {Object}", function () {
            const node = new Node_1.Node();
            const json = node.toJSON();
            chai_1.expect(json).to.be.an("object");
            chai_1.expect(json.bias).to.not.be.NaN;
            chai_1.expect(json.squash).to.be.a("function");
        });
    });
});
