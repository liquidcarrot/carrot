import { expect } from "chai";
import { describe, it } from "mocha";
import { Network } from "../../../src/architecture/Network";
import { AddNodeMutation } from "../../../src/methods/InstinctMutation";
import { NetworkJSON } from "../../../src/interfaces/NetworkJSON";

describe("Mutation", () => {
  describe("network.mutate()", () => {
    describe("ADD_NODE", () => {
      it("originalNetwork != newNetwork | when mutation possible", () => {
        const network: Network = new Network(1, 1);
        const originalNetwork: Network = network.deepCopy();
        network.mutate(new AddNodeMutation());

        expect(network).not.eql(originalNetwork);
      });

      it("Network.nodes.length is greater by 1 after mutation", () => {
        const network: Network = new Network(1, 1);
        const originalNodesLength: number = network.nodes.length;
        network.mutate(new AddNodeMutation());

        expect(network.nodes.length).equal(originalNodesLength + 1);
      });

      it("network.connections.size is greater by 1 after mutation", () => {
        const network: Network = new Network(1, 1);
        const originalConnectionsLength: number = network.connections.size;
        network.mutate(new AddNodeMutation());

        expect(network.connections.size).equal(originalConnectionsLength + 1);
      });

      it("First neuron should have no incoming connections | new Network(1,1)", () => {
        const network: Network = new Network(1, 1);
        network.mutate(new AddNodeMutation());

        expect(network.nodes[0].incoming.size).equal(0);
      });

      it("Middle (hidden) neuron should have directionally correct incoming & outgoing connections | new Network(1,1)", () => {
        const network: Network = new Network(1, 1);
        network.mutate(new AddNodeMutation());
        const json: NetworkJSON = network.toJSON();

        expect(json.connections[0].fromIndex).equal(0);
        expect(json.connections[0].toIndex).equal(1);
        expect(json.connections[1].fromIndex).equal(1);
        expect(json.connections[1].toIndex).equal(2);

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

      it("New neuron's out connection matches replaced connection's weight", () => {
        const network: Network = new Network(1, 1);
        const original: number = Array.from(network.connections)[0].weight;
        network.mutate(new AddNodeMutation());
        // Assumption about removing original connection, not what should happen according to NEAT spec.
        network.connections.forEach((conn) => {
          if (conn.to.isOutputNode()) {
            expect(conn.weight).equal(original);
          } else {
            expect(conn.weight).equal(1);
          }
        });
      });

      it("Last neuron should have no outgoing connections | new Network(1,1)", () => {
        const network: Network = new Network(1, 1);
        network.mutate(new AddNodeMutation());

        expect(network.nodes[2].outgoing.size).equal(0);
      });
    });
  });
});
