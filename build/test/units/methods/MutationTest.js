"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Network_1 = require("../../../src/architecture/Network");
var Mutation_1 = require("../../../src/methods/Mutation");
describe("Mutation", function () {
    describe('network.mutate()', function () {
        describe('ADD_NODE', function () {
            it('originalNetwork != newNetwork | when mutation possible', function () {
                var network = new Network_1.Network(1, 1);
                var originalNetwork = network.copy();
                network.mutate(new Mutation_1.AddNodeMutation());
                chai_1.expect(network).not.eql(originalNetwork);
            });
            it("Network.nodes.length is greater by 1 after mutation", function () {
                var network = new Network_1.Network(1, 1);
                var originalNodesLength = network.nodes.length;
                network.mutate(new Mutation_1.AddNodeMutation());
                chai_1.expect(network.nodes.length).equal(originalNodesLength + 1);
            });
            it("network.connections.size is greater by 1 after mutation", function () {
                var network = new Network_1.Network(1, 1);
                var originalConnectionsLength = network.connections.size;
                network.mutate(new Mutation_1.AddNodeMutation());
                chai_1.expect(network.connections.size).equal(originalConnectionsLength + 1);
            });
            it("First neuron should have no incoming connections | new Network(1,1)", function () {
                var network = new Network_1.Network(1, 1);
                network.mutate(new Mutation_1.AddNodeMutation());
                chai_1.expect(network.nodes[0].incoming.size).equal(0);
            });
            it('Middle (hidden) neuron should have directionally correct incoming & outgoing connections | new Network(1,1)', function () {
                var network = new Network_1.Network(1, 1);
                network.mutate(new Mutation_1.AddNodeMutation());
                var json = network.toJSON();
                chai_1.expect(json.connections[0].fromIndex).equal(0);
                chai_1.expect(json.connections[0].toIndex).equal(1);
                chai_1.expect(json.connections[1].fromIndex).equal(1);
                chai_1.expect(json.connections[1].toIndex).equal(2);
                // Additional notes: this test makes an assumption that
                // neurons should only be between inputs & outputs but it's
                // conceivable that some problems would benefit from "peripheral"
                // neurons that connect from the output (or a series of outputs) back into another neuron
                // including other inputs and outputs. We can't be sure that this behavior wouldn't be useful
                // in some cases and it would be best if we let the evolutionary algorithms handle sorting
                // if these structures are useful should they arise.
                // In short: we shouldn't stop networks with peripheral neurons to form in the future,
                // but right now we're making a compromise
            });
            it("New neuron's out connection matches replaced connection's weight", function () {
                var network = new Network_1.Network(1, 1);
                var original = Array.from(network.connections)[0].weight;
                network.mutate(new Mutation_1.AddNodeMutation());
                // Assumption about removing original connection, not what should happen according to NEAT spec.
                network.connections.forEach(function (conn) {
                    if (conn.to.isOutputNode()) {
                        chai_1.expect(conn.weight).equal(original);
                    }
                    else {
                        chai_1.expect(conn.weight).equal(1);
                    }
                });
            });
            it("Last neuron should have no outgoing connections | new Network(1,1)", function () {
                var network = new Network_1.Network(1, 1);
                network.mutate(new Mutation_1.AddNodeMutation());
                chai_1.expect(network.nodes[2].outgoing.size).equal(0);
            });
        });
    });
});
