const { expect } = require('chai');
const { Connection, Node } = require('../../../src/carrot');

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
    })
    it(`new Connection(from=${from}, to=${to}, weight=${weight}) => {Connection}`, function() {
      const connection = new Connection(from, to, weight);
      
      expect(connection).to.be.an.instanceOf(Connection);
      expect(connection.weight).to.equal(weight);
    })
    it(`new Connection(from=${from}, to=${to}, options=${options}) => {Connection}`, function() {
      const connection = new Connection(from, to, options);
      
      expect(connection).to.be.an.instanceOf(Connection);
      
      Object.keys(options).forEach(function(option) {
        expect(connection[option]).to.equal(options[option]);
        expect(connection[option]).to.eql(options[option]);
      });
    })
    it(`new Connection(from=${from}, to=${to}, weight=${weight}, options=${options}) => {Connection}`, function() {
      const connection = new Connection(from, to, weight, options);
      
      expect(connection).to.be.an.instanceOf(Connection);
      expect(connection.weight).to.equal(weight);
      
      Object.keys(options).forEach(function(option) {
        expect(connection[option]).to.equal(options[option]);
        expect(connection[option]).to.eql(options[option]);
      });
    })
  })
  describe("connection.toJSON()", function() {
    it("connection.toJSON() => {Object}", function() {
      const connection = new Connection(from, to);
      const json = connection.toJSON();
      
      expect(json).to.be.an("object");
      expect(json.weight).to.be.a("number");
      expect(json.gain).to.be.a("number");
      expect(json.elegibility).to.be.a("number");
      expect(json.delta_weights).to.be.an("object");
      expect(json.delta_weights.previous).to.be.an("number");
      expect(json.delta_weights.total).to.be.an("number");
      expect(json.delta_weights.all).to.be.an.instanceOf(Array);
    })
  })
  describe("Connection.fromJSON()", function() {
    it("Connection.fromJSON() => {Connection}")
  })
  describe("Connection.innovationID()", function() {
    const a = Math.round(Math.random() * 100)
    const b = Math.round(Math.random() * 100)
    
    it("Connection.innovationID() => {ReferenceError}", function() {
      expect(() => Connection.innovationID()).to.throw(ReferenceError);
    })
    it(`Connection.innovationID(a=${a}) => {ReferenceError}`, function() {
      expect(() => Connection.innovationID(a)).to.throw(ReferenceError);
    })
    it(`Connection.innovationID(a=${a}, b=${b}) => {number}`, function() {
      expect(Connection.innovationID(a, b)).to.be.a("number");
    })
  })
})