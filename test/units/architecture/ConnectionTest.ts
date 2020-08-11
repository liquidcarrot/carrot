import {expect} from 'chai';
import {describe, it} from 'mocha';
import {Connection} from '../../../src/architecture/Connection';
import {Node} from '../../../src/architecture/Node';
import {ConnectionJSON} from '../../../src/interfaces/ConnectionJSON';
import {randDouble} from '../../../src/utils/Utils';

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

describe('Connection', () => {
  const from: Node = new Node();
  const to: Node = new Node();
  const weight: number = randDouble(-1, 1);
  const gateNode: Node = new Node();
  const gain: number = randDouble(-1, 1);

  describe('new Connection()', () => {
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
  describe('connection.toJSON()', () => {
    it('connection.toJSON() => {Object}', () => {
      const connection: Connection = new Connection(from, to);
      const json: ConnectionJSON = connection.toJSON();

      expect(json).to.be.an('object');
      expect(json.weight).to.be.a('number');
    });
  });
});
