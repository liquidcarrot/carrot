const { expect } = require('chai');
const { Connection, Node } = require('../../../src/carrot');

const was = {
  connected: function(connection, from, to) {
    expect(connection.from).to.be.an.instanceOf(Node);
    expect(connection.from).to.equal(from);
    expect(connection.from).to.eql(from);
    expect(connection.to).to.be.an.instanceOf(Node);
    expect(connection.to).to.equal(to);
    expect(connection.to).to.eql(to);
  }
}

const got = {
  options: function(connection, options) {
    Object.keys(options).forEach(function(option) {
      expect(connection[option]).to.equal(options[option]);
      expect(connection[option]).to.eql(options[option]);
    });
  }
}

describe("Connection", function() {
  const from = new Node();
  const to = new Node();
  const weight = Math.random() * 2 - 1;
  const options = {
    gater: new Node(),
    gain: Math.random() * 2 - 1
  }

  describe("new Connection()", function() {
    it("new Connection() => {ReferenceError}", function() {
      expect(() => new Connection()).to.throw(ReferenceError);
    })
    it(`new Connection(from=${from}, to=${to}) => {Connection}`, function() {
      const connection = new Connection(from, to);

      expect(connection).to.be.an.instanceOf(Connection);
      was.connected(connection, from, to);
    })
    it("new Connection({ id: x }), Connection.id equals x", function () {
      const connection = new Connection(from, to, undefined, { id: 786 });

      expect(connection.id).equals(786);
    })
    it(`new Connection(from=${from}, to=${to}, weight=${weight}) => {Connection}`, function() {
      const connection = new Connection(from, to, weight);

      expect(connection).to.be.an.instanceOf(Connection);
      expect(connection.weight).to.equal(weight);
      was.connected(connection, from, to);
    })
    it(`new Connection(from=${from}, to=${to}, options=${options}) => {Connection}`, function() {
      const connection = new Connection(from, to, options);

      expect(connection).to.be.an.instanceOf(Connection);
      was.connected(connection, from, to);
      got.options(connection, options);
    })
    it(`new Connection(from=${from}, to=${to}, weight=${weight}, options=${options}) => {Connection}`, function() {
      const connection = new Connection(from, to, weight, options);

      expect(connection).to.be.an.instanceOf(Connection);
      expect(connection.weight).to.equal(weight);
      was.connected(connection, from, to);
      got.options(connection, options);
    })
  })
  describe("connection.toJSON()", function() {
    it("connection.toJSON() => {Object}", function() {
      const connection = new Connection(from, to);
      const json = connection.toJSON();

      expect(json).to.be.an("object");
      expect(json.weight).to.be.a("number");
    })
  })
  describe("Connection.fromJSON()", function() {
    it("Connection.fromJSON() => {Connection}")
  })
})
