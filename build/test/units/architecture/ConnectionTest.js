"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Connection_1 = require("../../../src/architecture/Connection");
var Node_1 = require("../../../src/architecture/Node");
var Utils_1 = require("../../../src/utils/Utils");
var was = {
    connected: function (connection, from, to) {
        chai_1.expect(connection.from).to.be.an.instanceOf(Node_1.Node);
        chai_1.expect(connection.from).to.equal(from);
        chai_1.expect(connection.from).to.eql(from);
        chai_1.expect(connection.to).to.be.an.instanceOf(Node_1.Node);
        chai_1.expect(connection.to).to.equal(to);
        chai_1.expect(connection.to).to.eql(to);
    }
};
describe("Connection", function () {
    var from = new Node_1.Node();
    var to = new Node_1.Node();
    var weight = Utils_1.randDouble(-1, 1);
    var gateNode = new Node_1.Node();
    var gain = Utils_1.randDouble(-1, 1);
    describe("new Connection()", function () {
        it("new Connection(from=" + from + ", to=" + to + ") => {Connection}", function () {
            var connection = new Connection_1.Connection(from, to);
            chai_1.expect(connection).to.be.an.instanceOf(Connection_1.Connection);
            was.connected(connection, from, to);
        });
        it("new Connection(from=" + from + ", to=" + to + ", weight=" + weight + ") => {Connection}", function () {
            var connection = new Connection_1.Connection(from, to, weight);
            chai_1.expect(connection).to.be.an.instanceOf(Connection_1.Connection);
            chai_1.expect(connection.weight).to.equal(weight);
            was.connected(connection, from, to);
        });
        it("new Connection(from=" + from + ", to=" + to + ", gateNode=" + gateNode + ", gain=" + gain + ") => {Connection}", function () {
            var connection = new Connection_1.Connection(from, to);
            connection.gateNode = gateNode;
            connection.gain = gain;
            chai_1.expect(connection).to.be.an.instanceOf(Connection_1.Connection);
            chai_1.expect(connection.gateNode).to.be.eql(gateNode);
            chai_1.expect(connection.gain).to.be.equal(gain);
            was.connected(connection, from, to);
        });
        it("new Connection(from=" + from + ", to=" + to + ", weight=" + weight + ", gateNode=" + gateNode + ", gain=" + gain + ") => {Connection}", function () {
            var connection = new Connection_1.Connection(from, to, weight);
            connection.gateNode = gateNode;
            connection.gain = gain;
            chai_1.expect(connection).to.be.an.instanceOf(Connection_1.Connection);
            chai_1.expect(connection.weight).to.equal(weight);
            chai_1.expect(connection.gateNode).to.be.eql(gateNode);
            chai_1.expect(connection.gain).to.be.equal(gain);
            was.connected(connection, from, to);
        });
    });
    describe("connection.toJSON()", function () {
        it("connection.toJSON() => {Object}", function () {
            var connection = new Connection_1.Connection(from, to);
            var json = connection.toJSON();
            chai_1.expect(json).to.be.an("object");
            chai_1.expect(json.weight).to.be.a("number");
        });
    });
});
