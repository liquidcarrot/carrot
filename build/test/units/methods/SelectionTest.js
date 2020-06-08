"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Network_1 = require("../../../src/architecture/Network");
var Selection_1 = require("../../../src/methods/Selection");
var Utils_1 = require("../../../src/utils/Utils");
describe("selection", function () {
    describe("TournamentSelection", function () {
        var size = Utils_1.randInt(2, 10);
        var probability = Math.random();
        var selection = new Selection_1.TournamentSelection(size, probability);
        var pseudoPopulation = [];
        for (var i = 0; i < 20; i++) {
            var network = new Network_1.Network(5, 5);
            network.score = Utils_1.randDouble(-50, 50);
            pseudoPopulation.push(network);
        }
        pseudoPopulation.sort(function (a, b) {
            return a.score === undefined || b.score === undefined ? 0 : b.score - a.score;
        });
        chai_1.expect(selection.select(pseudoPopulation)).to.be.instanceOf(Network_1.Network);
    });
    describe("PowerSelection", function () {
        var power = Utils_1.randInt(2, 10);
        var selection = new Selection_1.PowerSelection(power);
        var pseudoPopulation = [];
        for (var i = 0; i < Utils_1.randInt(50, 150); i++) {
            var network = new Network_1.Network(5, 5);
            network.score = Utils_1.randDouble(-50, 50);
            pseudoPopulation.push(network);
        }
        pseudoPopulation.sort(function (a, b) {
            return a.score === undefined || b.score === undefined ? 0 : b.score - a.score;
        });
        chai_1.expect(selection.select(pseudoPopulation)).to.be.instanceOf(Network_1.Network);
    });
    describe("FitnessProportionateSelection", function () {
        var selection = new Selection_1.FitnessProportionateSelection();
        var pseudoPopulation = [];
        for (var i = 0; i < Utils_1.randInt(50, 150); i++) {
            var network = new Network_1.Network(5, 5);
            network.score = Utils_1.randDouble(-50, 50);
            pseudoPopulation.push(network);
        }
        pseudoPopulation.sort(function (a, b) {
            return a.score === undefined || b.score === undefined ? 0 : b.score - a.score;
        });
        chai_1.expect(selection.select(pseudoPopulation)).to.be.instanceOf(Network_1.Network);
    });
});
