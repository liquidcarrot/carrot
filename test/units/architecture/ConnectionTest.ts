import { expect } from "chai";
import { describe, it } from "mocha";
import { Connection } from "../../../src/architecture/Connection";
import { Node } from "../../../src/architecture/Node";
import { ConnectionJSON } from "../../../src/interfaces/ConnectionJSON";
import { randBoolean, randDouble, removeFromArray } from "../../../src/utils/Utils";
import { NEATPopulation } from "../../../src/population/NEATPopulation";
import { AddConnectionMutation } from "../../../src/methods/NEATMutation";

const was: {
  connected: (connection: Connection, from: Node, to: Node) => void;
} = {
  connected: (connection: Connection, from: Node, to: Node) => {
    expect(connection.from).to.be.an.instanceOf(Node);
    expect(connection.from).to.equal(from);
    expect(connection.from).to.eql(from);
    expect(connection.to).to.be.an.instanceOf(Node);
    expect(connection.to).to.equal(to);
    expect(connection.to).to.eql(to);
  },
};

describe("Connection", () => {
  const from: Node = new Node();
  const to: Node = new Node();
  const weight: number = randDouble(-1, 1);
  const gateNode: Node = new Node();
  const gain: number = randDouble(-1, 1);

  describe("new Connection()", () => {
    it(`new Connection(from=${from}, to=${to}) => {Connection}`, () => {
      const connection: Connection = new Connection(from, to);

      expect(connection).to.be.an.instanceOf(Connection);
      was.connected(connection, from, to);
    });
    it(`new Connection(from=${from}, to=${to}, weight=${weight}) => {Connection}`, () => {
      const connection: Connection = new Connection(from, to, weight);

      expect(connection).to.be.an.instanceOf(Connection);
      expect(connection.weight).to.equal(weight);
      was.connected(connection, from, to);
    });
    it(`new Connection(from=${from}, to=${to}, gateNode=${gateNode}, gain=${gain}) => {Connection}`, () => {
      const connection: Connection = new Connection(from, to);
      connection.gateNode = gateNode;
      connection.gain = gain;

      expect(connection).to.be.an.instanceOf(Connection);
      expect(connection.gateNode).to.be.eql(gateNode);
      expect(connection.gain).to.be.equal(gain);
      was.connected(connection, from, to);
    });
    it(`new Connection(from=${from}, to=${to}, weight=${weight}, gateNode=${gateNode}, gain=${gain}) => {Connection}`, () => {
      const connection: Connection = new Connection(from, to, weight);
      connection.gateNode = gateNode;
      connection.gain = gain;

      expect(connection).to.be.an.instanceOf(Connection);
      expect(connection.weight).to.equal(weight);
      expect(connection.gateNode).to.be.eql(gateNode);
      expect(connection.gain).to.be.equal(gain);
      was.connected(connection, from, to);
    });
  });
  // describe("connection.clone()", () => {
  //   it("test cloning", () => {
  //     const population = new NEATPopulation(1, { inputSize: 1, outputSize: 1 });
  //     const network = population.networks[0];
  //     console.log(network.connections);
  //     network.mutate(new AddConnectionMutation());
  //     console.log(network.connections);
  //     const connection: Connection = Array.from(network.connections)[0];
  //     connection.eligibility = randDouble(-1, 1);
  //     connection.gain = randDouble(-1, 1);
  //     connection.weight = randDouble(-1, 1);
  //     connection.enabled = randBoolean();
  //
  //     let json = connection.toJSON(network.nodes);
  //
  //     // Comparing properties of json connection and connection object
  //     let connectionProperties = Object.getOwnPropertyNames(connection).sort();
  //     let jsonProperties = Object.getOwnPropertyNames(json).sort();
  //     removeFromArray(connectionProperties, ["from", "to", "gateNode"]);
  //     removeFromArray(jsonProperties, ["fromIndex", "toIndex", "gateNodeIndex"]);
  //     expect(connectionProperties).to.be.eql(jsonProperties);
  //
  //     // Comparing connection with it's clone
  //     const clone = connection.clone(network.nodes);
  //     expect(connection).to.be.eql(clone);
  //   });
  // });
});
