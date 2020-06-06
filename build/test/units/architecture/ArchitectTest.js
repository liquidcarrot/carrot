"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Architect_1 = require("../../../src/architecture/Architect");
var DenseLayer_1 = require("../../../src/architecture/Layers/CoreLayers/DenseLayer");
var InputLayer_1 = require("../../../src/architecture/Layers/CoreLayers/InputLayer");
var OutputLayer_1 = require("../../../src/architecture/Layers/CoreLayers/OutputLayer");
var MaxPooling1DLayer_1 = require("../../../src/architecture/Layers/PoolingLayers/MaxPooling1DLayer");
var GRULayer_1 = require("../../../src/architecture/Layers/RecurrentLayers/GRULayer");
var HopfieldLayer_1 = require("../../../src/architecture/Layers/RecurrentLayers/HopfieldLayer");
var LSTMLayer_1 = require("../../../src/architecture/Layers/RecurrentLayers/LSTMLayer");
var MemoryLayer_1 = require("../../../src/architecture/Layers/RecurrentLayers/MemoryLayer");
var RNNLayer_1 = require("../../../src/architecture/Layers/RecurrentLayers/RNNLayer");
var PoolNode_1 = require("../../../src/architecture/Nodes/PoolNode");
var Activation_1 = require("../../../src/methods/Activation");
var Utils_1 = require("../../../src/utils/Utils");
describe("ArchitectTest", function () {
    it("Build Multilayer-Perceptron", function () {
        var layerSizes = [Utils_1.randInt(5, 10), Utils_1.randInt(10, 20), Utils_1.randInt(5, 10)];
        var architect = new Architect_1.Architect();
        architect.addLayer(new InputLayer_1.InputLayer(10));
        architect.addLayer(new DenseLayer_1.DenseLayer(layerSizes[0], { activationType: Activation_1.RELUActivation }));
        architect.addLayer(new DenseLayer_1.DenseLayer(layerSizes[1], { activationType: Activation_1.RELUActivation }));
        architect.addLayer(new DenseLayer_1.DenseLayer(layerSizes[2], { activationType: Activation_1.RELUActivation }));
        architect.addLayer(new OutputLayer_1.OutputLayer(2));
        var network = architect.buildModel();
        chai_1.expect(network.nodes.length).to.be.equal(10 + layerSizes[0] + layerSizes[1] + layerSizes[2] + 2);
        chai_1.expect(network.connections.size).to.be.equal(10 * layerSizes[0] + layerSizes[0] * layerSizes[1] + layerSizes[1] * layerSizes[2] + layerSizes[2] * 2);
        chai_1.expect(network.gates.size).to.be.equal(0);
        var numNodesWithRELU = network.nodes.filter(function (node) { return node.squash === Activation_1.RELUActivation; }).length;
        chai_1.expect(numNodesWithRELU).to.be.equal(layerSizes[0] + layerSizes[1] + layerSizes[2]);
    });
    it("Build Perceptron with pooling layer", function () {
        var layerSize = Utils_1.randInt(2, 4);
        var architect = new Architect_1.Architect();
        architect.addLayer(new InputLayer_1.InputLayer(10));
        architect.addLayer(new DenseLayer_1.DenseLayer(10, { activationType: Activation_1.RELUActivation }));
        architect.addLayer(new MaxPooling1DLayer_1.MaxPooling1DLayer(layerSize, { activation: Activation_1.IdentityActivation }));
        architect.addLayer(new OutputLayer_1.OutputLayer(2, { activation: Activation_1.RELUActivation }));
        var network = architect.buildModel();
        chai_1.expect(network.nodes.length).to.be.equal(10 + 10 + layerSize + 2);
        chai_1.expect(network.connections.size).to.be.equal(10 * 10 + 10 + layerSize * 2);
        chai_1.expect(network.gates.size).to.be.equal(0);
        var numNodesWithRELU = network.nodes.filter(function (node) { return node.squash === Activation_1.RELUActivation; }).length;
        chai_1.expect(numNodesWithRELU).to.be.equal(10 + 2);
        var poolNodes = network.nodes.filter(function (node) { return node instanceof PoolNode_1.PoolNode; });
        chai_1.expect(poolNodes.length).to.be.equal(layerSize);
        poolNodes.forEach(function (node) { return chai_1.expect(node.bias).to.be.equal(1); });
        var numNodesWithIdentity = network.nodes.filter(function (node) { return node.squash === Activation_1.IdentityActivation; }).length;
        chai_1.expect(numNodesWithIdentity).to.be.equal(layerSize);
    });
    it("Build Multilayer-Perceptron with memory layer", function () {
        var memorySize = Utils_1.randInt(5, 15);
        var outputSize = Utils_1.randInt(20, 30);
        var architect = new Architect_1.Architect();
        architect.addLayer(new InputLayer_1.InputLayer(10));
        architect.addLayer(new DenseLayer_1.DenseLayer(10, { activationType: Activation_1.RELUActivation }));
        architect.addLayer(new MemoryLayer_1.MemoryLayer(outputSize, { memorySize: memorySize, activation: Activation_1.RELUActivation }));
        architect.addLayer(new DenseLayer_1.DenseLayer(20, { activationType: Activation_1.RELUActivation }));
        architect.addLayer(new DenseLayer_1.DenseLayer(10, { activationType: Activation_1.RELUActivation }));
        architect.addLayer(new OutputLayer_1.OutputLayer(2));
        var network = architect.buildModel();
        chai_1.expect(network.nodes.length).to.be.equal(10 + 10 + outputSize * (memorySize + 1) + 20 + 10 + 2);
        chai_1.expect(network.connections.size).to.be.equal(10 * 10 + 10 * outputSize + memorySize * outputSize + outputSize * 20 + 20 * 10 + 10 * 2);
        chai_1.expect(network.gates.size).to.be.equal(0);
        var numNodesWithRELU = network.nodes.filter(function (node) { return node.squash === Activation_1.RELUActivation; }).length;
        chai_1.expect(numNodesWithRELU).to.be.equal(10 + outputSize + 20 + 10);
    });
    it("Build RNN layer", function () {
        var outputSize = Utils_1.randInt(20, 30);
        var architect = new Architect_1.Architect();
        architect.addLayer(new InputLayer_1.InputLayer(10));
        architect.addLayer(new DenseLayer_1.DenseLayer(10, { activationType: Activation_1.LogisticActivation }));
        architect.addLayer(new RNNLayer_1.RNNLayer(outputSize, { activation: Activation_1.RELUActivation }));
        architect.addLayer(new DenseLayer_1.DenseLayer(2, { activationType: Activation_1.LogisticActivation }));
        architect.addLayer(new OutputLayer_1.OutputLayer(2));
        var network = architect.buildModel();
        chai_1.expect(network.nodes.length).to.be.equal(10 + 10 + outputSize + 2 + 2);
        chai_1.expect(network.connections.size).to.be.equal(10 * 10 + 10 * outputSize + outputSize + outputSize * 2 + 2 * 2);
        chai_1.expect(network.gates.size).to.be.equal(0);
        var numNodesWithRELU = network.nodes.filter(function (node) { return node.squash === Activation_1.RELUActivation; }).length;
        chai_1.expect(numNodesWithRELU).to.be.equal(outputSize);
    });
    it("Build GRU network", function () {
        var GRUSize = Utils_1.randInt(10, 20);
        var architect = new Architect_1.Architect();
        architect.addLayer(new InputLayer_1.InputLayer(10));
        architect.addLayer(new GRULayer_1.GRULayer(GRUSize, { activation: Activation_1.RELUActivation }));
        architect.addLayer(new OutputLayer_1.OutputLayer(2));
        var network = architect.buildModel();
        chai_1.expect(network.nodes.length).to.be.equal(10 + GRUSize * 7 + 2);
        // 10 * GRUSize (input -> LSTM)
        // GRUSize * GRUSize * 8 + GRUSize (LSTM intern connection)
        // GRUSize * 2 (LSTM -> output)
        chai_1.expect(network.connections.size).to.be.equal(10 * GRUSize + GRUSize * GRUSize * 8 + 2 * GRUSize + GRUSize * 2);
        chai_1.expect(network.gates.size).to.be.equal(3 * GRUSize * GRUSize);
        var numNodesWithRELU = network.nodes.filter(function (node) { return node.squash === Activation_1.RELUActivation; }).length;
        chai_1.expect(numNodesWithRELU).to.be.equal(GRUSize);
    });
    it("Build LSTM network", function () {
        var LSTMSize = Utils_1.randInt(10, 20);
        var architect = new Architect_1.Architect();
        architect.addLayer(new InputLayer_1.InputLayer(10));
        architect.addLayer(new LSTMLayer_1.LSTMLayer(LSTMSize, { activation: Activation_1.RELUActivation }));
        architect.addLayer(new OutputLayer_1.OutputLayer(2));
        var network = architect.buildModel();
        chai_1.expect(network.nodes.length).to.be.equal(10 + LSTMSize * 6 + 2);
        // 10 * LSTMSize (input -> LSTM)
        // LSTMSize * LSTMSize * 8 + LSTMSize (LSTM intern connection)
        // LSTMSize * 2 (LSTM -> output)
        chai_1.expect(network.connections.size).to.be.equal(10 * LSTMSize + LSTMSize * LSTMSize * 8 + LSTMSize + LSTMSize * 2);
        chai_1.expect(network.gates.size).to.be.equal(2 * LSTMSize * LSTMSize + LSTMSize);
        var numNodesWithRELU = network.nodes.filter(function (node) { return node.squash === Activation_1.RELUActivation; }).length;
        chai_1.expect(numNodesWithRELU).to.be.equal(LSTMSize);
    });
    it("Build Hopfield network", function () {
        var HopfieldSize = Utils_1.randInt(10, 20);
        var architect = new Architect_1.Architect();
        architect.addLayer(new InputLayer_1.InputLayer(10));
        architect.addLayer(new HopfieldLayer_1.HopfieldLayer(HopfieldSize));
        architect.addLayer(new OutputLayer_1.OutputLayer(2));
        var network = architect.buildModel();
        chai_1.expect(network.nodes.length).to.be.equal(10 + HopfieldSize * 2 + 2);
        // Check backward pointing connections
        var backConnections = 0;
        var _loop_1 = function (i) {
            network.nodes[i].outgoing.forEach(function (conn) {
                if (network.nodes.indexOf(conn.to) < i) {
                    backConnections++;
                }
            });
        };
        for (var i = 0; i < network.nodes.length; i++) {
            _loop_1(i);
        }
        chai_1.expect(backConnections).to.be.equal(HopfieldSize * HopfieldSize);
        // 10 * HopfieldSize (input -> LSTM)
        // HopfieldSize * HopfieldSize * 8 + HopfieldSize (LSTM intern connection)
        // HopfieldSize * 2 (LSTM -> output)
        chai_1.expect(network.connections.size).to.be.equal(10 * HopfieldSize + HopfieldSize * HopfieldSize * 2 + HopfieldSize * 2);
        chai_1.expect(network.gates.size).to.be.equal(0);
        var numNodesWithSTEP = network.nodes.filter(function (node) { return node.squash === Activation_1.StepActivation; }).length;
        chai_1.expect(numNodesWithSTEP).to.be.equal(HopfieldSize);
    });
    it("Train Perceptron", function () {
        var architect = new Architect_1.Architect();
        architect.addLayer(new InputLayer_1.InputLayer(2));
        architect.addLayer(new DenseLayer_1.DenseLayer(5, { activationType: Activation_1.RELUActivation }));
        architect.addLayer(new OutputLayer_1.OutputLayer(1));
        var network = architect.buildModel();
        var AND_GATE = [
            { input: [0, 0], output: [0] },
            { input: [0, 1], output: [0] },
            { input: [1, 0], output: [0] },
            { input: [1, 1], output: [1] }
        ];
        var errorBefore = network.test(AND_GATE);
        var error = network.train({
            dataset: AND_GATE,
            iterations: 10000,
            rate: 0.01,
            shuffle: true,
        }).error;
        chai_1.expect(Number.isFinite(error)).to.be.true;
        chai_1.expect(Number.isFinite(errorBefore)).to.be.true;
        chai_1.expect(error).to.be.at.most(errorBefore);
    });
    it("Train RNN network", function () {
        var architect = new Architect_1.Architect();
        architect.addLayer(new InputLayer_1.InputLayer(1));
        architect.addLayer(new RNNLayer_1.RNNLayer(2, { activation: Activation_1.RELUActivation }));
        architect.addLayer(new OutputLayer_1.OutputLayer(1));
        var network = architect.buildModel();
        var data = [
            { input: [0], output: [0] },
            { input: [1], output: [1] },
            { input: [1], output: [0] },
            { input: [0], output: [1] },
            { input: [0], output: [0] }
        ];
        var errorBefore = network.test(data);
        var error = network.train({
            dataset: data,
            iterations: 10000,
            rate: 0.01,
            clear: true,
        }).error;
        chai_1.expect(Number.isFinite(error)).to.be.true;
        chai_1.expect(Number.isFinite(errorBefore)).to.be.true;
        chai_1.expect(error).to.be.at.most(errorBefore);
    });
    it("Train LSTM network", function () {
        var architect = new Architect_1.Architect();
        architect.addLayer(new InputLayer_1.InputLayer(1));
        architect.addLayer(new LSTMLayer_1.LSTMLayer(2, { activation: Activation_1.RELUActivation }));
        architect.addLayer(new LSTMLayer_1.LSTMLayer(2, { activation: Activation_1.RELUActivation }));
        architect.addLayer(new OutputLayer_1.OutputLayer(1));
        var network = architect.buildModel();
        var data = [
            { input: [0], output: [0] },
            { input: [1], output: [1] },
            { input: [1], output: [0] },
            { input: [0], output: [1] },
            { input: [0], output: [0] }
        ];
        var errorBefore = network.test(data);
        var error = network.train({
            dataset: data,
            iterations: 10000,
            rate: 0.01,
            clear: true,
        }).error;
        chai_1.expect(Number.isFinite(error)).to.be.true;
        chai_1.expect(Number.isFinite(errorBefore)).to.be.true;
        chai_1.expect(error).to.be.at.most(errorBefore);
    });
    it('Train GRU network', function () {
        var architect = new Architect_1.Architect();
        architect.addLayer(new InputLayer_1.InputLayer(1));
        architect.addLayer(new GRULayer_1.GRULayer(2, { activation: Activation_1.RELUActivation }));
        architect.addLayer(new OutputLayer_1.OutputLayer(1));
        var network = architect.buildModel();
        var data = [
            { input: [0], output: [0] },
            { input: [1], output: [1] },
            { input: [1], output: [0] },
            { input: [0], output: [1] },
            { input: [0], output: [0] }
        ];
        var errorBefore = network.test(data);
        var error = network.train({
            dataset: data,
            iterations: 10000,
            rate: 0.01,
            clear: true,
        }).error;
        chai_1.expect(Number.isFinite(error)).to.be.true;
        chai_1.expect(Number.isFinite(errorBefore)).to.be.true;
        chai_1.expect(error).to.be.at.most(errorBefore);
    });
});
