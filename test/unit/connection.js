let { expect }  = require("chai");
let { Connection } = require("../../dist/index");

describe("Connection", function() {
  describe("new Connection()", function() {
    it("should create a new connection", function() {
      let connection = new Connection();

      // Is Connection
      expect(connection).to.be.an.instanceOf(Connection);

      // Has Properties
      expect(connection).to.have.property("id");
      expect(connection).to.have.property("from");
      expect(connection).to.have.property("to");
    });
  });
});
