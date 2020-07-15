"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("activations/build/src");
const chai_1 = require("chai");
const Architect_1 = require("../../../src/architecture/Architect");
const DenseLayer_1 = require("../../../src/architecture/Layers/CoreLayers/DenseLayer");
const InputLayer_1 = require("../../../src/architecture/Layers/CoreLayers/InputLayer");
const OutputLayer_1 = require("../../../src/architecture/Layers/CoreLayers/OutputLayer");
const MaxPooling1DLayer_1 = require("../../../src/architecture/Layers/PoolingLayers/MaxPooling1DLayer");
const GRULayer_1 = require("../../../src/architecture/Layers/RecurrentLayers/GRULayer");
const HopfieldLayer_1 = require("../../../src/architecture/Layers/RecurrentLayers/HopfieldLayer");
const LSTMLayer_1 = require("../../../src/architecture/Layers/RecurrentLayers/LSTMLayer");
const MemoryLayer_1 = require("../../../src/architecture/Layers/RecurrentLayers/MemoryLayer");
const RNNLayer_1 = require("../../../src/architecture/Layers/RecurrentLayers/RNNLayer");
const PoolNode_1 = require("../../../src/architecture/Nodes/PoolNode");
const TrainOptions_1 = require("../../../src/interfaces/TrainOptions");
const Rate_1 = require("../../../src/methods/Rate");
const Utils_1 = require("../../../src/utils/Utils");
describe("ArchitectTest", () => {
    it("Build Multilayer-Perceptron", () => {
        const layerSizes = [Utils_1.randInt(5, 10), Utils_1.randInt(10, 20), Utils_1.randInt(5, 10)];
        const architect = new Architect_1.Architect();
        architect.addLayer(new InputLayer_1.InputLayer(10));
        architect.addLayer(new DenseLayer_1.DenseLayer(layerSizes[0], { activationType: src_1.RELU }));
        architect.addLayer(new DenseLayer_1.DenseLayer(layerSizes[1], { activationType: src_1.RELU }));
        architect.addLayer(new DenseLayer_1.DenseLayer(layerSizes[2], { activationType: src_1.RELU }));
        architect.addLayer(new OutputLayer_1.OutputLayer(2));
        const network = architect.buildModel();
        chai_1.expect(network.nodes.length).to.be.equal(10 + layerSizes[0] + layerSizes[1] + layerSizes[2] + 2);
        chai_1.expect(network.connections.size).to.be.equal(10 * layerSizes[0] + layerSizes[0] * layerSizes[1] + layerSizes[1] * layerSizes[2] + layerSizes[2] * 2);
        chai_1.expect(network.gates.size).to.be.equal(0);
        const numNodesWithRELU = network.nodes.filter(node => node.squash === src_1.RELU).length;
        chai_1.expect(numNodesWithRELU).to.be.equal(layerSizes[0] + layerSizes[1] + layerSizes[2]);
    });
    it("Build Perceptron with pooling layer", () => {
        const layerSize = Utils_1.randInt(2, 4);
        const architect = new Architect_1.Architect();
        architect.addLayer(new InputLayer_1.InputLayer(10));
        architect.addLayer(new DenseLayer_1.DenseLayer(10, { activationType: src_1.RELU }));
        architect.addLayer(new MaxPooling1DLayer_1.MaxPooling1DLayer(layerSize, { activation: src_1.Identitiy }));
        architect.addLayer(new OutputLayer_1.OutputLayer(2, { activation: src_1.RELU }));
        const network = architect.buildModel();
        chai_1.expect(network.nodes.length).to.be.equal(10 + 10 + layerSize + 2);
        chai_1.expect(network.connections.size).to.be.equal(10 * 10 + 10 + layerSize * 2);
        chai_1.expect(network.gates.size).to.be.equal(0);
        const numNodesWithRELU = network.nodes.filter(node => node.squash === src_1.RELU).length;
        chai_1.expect(numNodesWithRELU).to.be.equal(10 + 2);
        const poolNodes = network.nodes.filter(node => node instanceof PoolNode_1.PoolNode);
        chai_1.expect(poolNodes.length).to.be.equal(layerSize);
        poolNodes.forEach(node => chai_1.expect(node.bias).to.be.equal(1));
        const numNodesWithIdentity = network.nodes.filter(node => node.squash === src_1.Identitiy).length;
        chai_1.expect(numNodesWithIdentity).to.be.equal(layerSize);
    });
    it("Build Multilayer-Perceptron with memory layer", () => {
        const memorySize = Utils_1.randInt(5, 15);
        const outputSize = Utils_1.randInt(20, 30);
        const architect = new Architect_1.Architect();
        architect.addLayer(new InputLayer_1.InputLayer(10));
        architect.addLayer(new DenseLayer_1.DenseLayer(10, { activationType: src_1.RELU }));
        architect.addLayer(new MemoryLayer_1.MemoryLayer(outputSize, { memorySize, activation: src_1.RELU }));
        architect.addLayer(new DenseLayer_1.DenseLayer(20, { activationType: src_1.RELU }));
        architect.addLayer(new DenseLayer_1.DenseLayer(10, { activationType: src_1.RELU }));
        architect.addLayer(new OutputLayer_1.OutputLayer(2));
        const network = architect.buildModel();
        chai_1.expect(network.nodes.length).to.be.equal(10 + 10 + outputSize * (memorySize + 1) + 20 + 10 + 2);
        chai_1.expect(network.connections.size).to.be.equal(10 * 10 + 10 * outputSize + memorySize * outputSize + outputSize * 20 + 20 * 10 + 10 * 2);
        chai_1.expect(network.gates.size).to.be.equal(0);
        const numNodesWithRELU = network.nodes.filter(node => node.squash === src_1.RELU).length;
        chai_1.expect(numNodesWithRELU).to.be.equal(10 + outputSize + 20 + 10);
    });
    it("Build RNN layer", () => {
        const outputSize = Utils_1.randInt(20, 30);
        const architect = new Architect_1.Architect();
        architect.addLayer(new InputLayer_1.InputLayer(10));
        architect.addLayer(new DenseLayer_1.DenseLayer(10, { activationType: src_1.Logistic }));
        architect.addLayer(new RNNLayer_1.RNNLayer(outputSize, { activation: src_1.RELU }));
        architect.addLayer(new DenseLayer_1.DenseLayer(2, { activationType: src_1.Logistic }));
        architect.addLayer(new OutputLayer_1.OutputLayer(2));
        const network = architect.buildModel();
        chai_1.expect(network.nodes.length).to.be.equal(10 + 10 + outputSize + 2 + 2);
        chai_1.expect(network.connections.size).to.be.equal(10 * 10 + 10 * outputSize + outputSize + outputSize * 2 + 2 * 2);
        chai_1.expect(network.gates.size).to.be.equal(0);
        const numNodesWithRELU = network.nodes.filter(node => node.squash === src_1.RELU).length;
        chai_1.expect(numNodesWithRELU).to.be.equal(outputSize);
    });
    it("Build GRU network", () => {
        const GRUSize = Utils_1.randInt(10, 20);
        const architect = new Architect_1.Architect();
        architect.addLayer(new InputLayer_1.InputLayer(10));
        architect.addLayer(new GRULayer_1.GRULayer(GRUSize, { activation: src_1.RELU }));
        architect.addLayer(new OutputLayer_1.OutputLayer(2));
        const network = architect.buildModel();
        chai_1.expect(network.nodes.length).to.be.equal(10 + GRUSize * 7 + 2);
        // 10 * GRUSize (input -> LSTM)
        // GRUSize * GRUSize * 8 + GRUSize (LSTM intern connection)
        // GRUSize * 2 (LSTM -> output)
        chai_1.expect(network.connections.size).to.be.equal(10 * GRUSize + GRUSize * GRUSize * 8 + 2 * GRUSize + GRUSize * 2);
        chai_1.expect(network.gates.size).to.be.equal(3 * GRUSize * GRUSize);
        const numNodesWithRELU = network.nodes.filter(node => node.squash === src_1.RELU).length;
        chai_1.expect(numNodesWithRELU).to.be.equal(GRUSize);
    });
    it("Build LSTM network", () => {
        const LSTMSize = Utils_1.randInt(10, 20);
        const architect = new Architect_1.Architect();
        architect.addLayer(new InputLayer_1.InputLayer(10));
        architect.addLayer(new LSTMLayer_1.LSTMLayer(LSTMSize, { activation: src_1.RELU }));
        architect.addLayer(new OutputLayer_1.OutputLayer(2));
        const network = architect.buildModel();
        chai_1.expect(network.nodes.length).to.be.equal(10 + LSTMSize * 6 + 2);
        // 10 * LSTMSize (input -> LSTM)
        // LSTMSize * LSTMSize * 8 + LSTMSize (LSTM intern connection)
        // LSTMSize * 2 (LSTM -> output)
        chai_1.expect(network.connections.size).to.be.equal(10 * LSTMSize + LSTMSize * LSTMSize * 8 + LSTMSize + LSTMSize * 2);
        chai_1.expect(network.gates.size).to.be.equal(2 * LSTMSize * LSTMSize + LSTMSize);
        const numNodesWithRELU = network.nodes.filter(node => node.squash === src_1.RELU).length;
        chai_1.expect(numNodesWithRELU).to.be.equal(LSTMSize);
    });
    it("Build Hopfield network", () => {
        const HopfieldSize = Utils_1.randInt(10, 20);
        const architect = new Architect_1.Architect();
        architect.addLayer(new InputLayer_1.InputLayer(10));
        architect.addLayer(new HopfieldLayer_1.HopfieldLayer(HopfieldSize));
        architect.addLayer(new OutputLayer_1.OutputLayer(2));
        const network = architect.buildModel();
        chai_1.expect(network.nodes.length).to.be.equal(10 + HopfieldSize * 2 + 2);
        // Check backward pointing connections
        let backConnections = 0;
        for (let i = 0; i < network.nodes.length; i++) {
            network.nodes[i].outgoing.forEach(conn => {
                if (network.nodes.indexOf(conn.to) < i) {
                    backConnections++;
                }
            });
        }
        chai_1.expect(backConnections).to.be.equal(HopfieldSize * HopfieldSize);
        // 10 * HopfieldSize (input -> LSTM)
        // HopfieldSize * HopfieldSize * 8 + HopfieldSize (LSTM intern connection)
        // HopfieldSize * 2 (LSTM -> output)
        chai_1.expect(network.connections.size).to.be.equal(10 * HopfieldSize + HopfieldSize * HopfieldSize * 2 + HopfieldSize * 2);
        chai_1.expect(network.gates.size).to.be.equal(0);
        const numNodesWithSTEP = network.nodes.filter(node => node.squash === src_1.BinaryStep).length;
        chai_1.expect(numNodesWithSTEP).to.be.equal(HopfieldSize);
    });
    it("Train Perceptron", function () {
        this.timeout(5000);
        const architect = new Architect_1.Architect();
        architect.addLayer(new InputLayer_1.InputLayer(2));
        architect.addLayer(new DenseLayer_1.DenseLayer(5, { activationType: src_1.RELU }));
        architect.addLayer(new OutputLayer_1.OutputLayer(1));
        const network = architect.buildModel();
        const AND_GATE = [
            { input: [0, 0], output: [0] },
            { input: [0, 1], output: [0] },
            { input: [1, 0], output: [0] },
            { input: [1, 1], output: [1] }
        ];
        const errorBefore = network.test(AND_GATE);
        const options = new TrainOptions_1.TrainOptions(AND_GATE);
        options.iterations = 10000;
        options.rate = new Rate_1.FixedRate(0.01);
        options.shuffle = true;
        network.train(options);
        const error = network.train(options).error;
        chai_1.expect(Number.isFinite(error)).to.be.true;
        chai_1.expect(Number.isFinite(errorBefore)).to.be.true;
        chai_1.expect(error).to.be.at.most(errorBefore);
    });
    it("Train RNN network", function () {
        this.timeout(5000);
        const architect = new Architect_1.Architect();
        architect.addLayer(new InputLayer_1.InputLayer(1));
        architect.addLayer(new RNNLayer_1.RNNLayer(2, { activation: src_1.RELU }));
        architect.addLayer(new OutputLayer_1.OutputLayer(1));
        const network = architect.buildModel();
        const data = [
            { input: [0], output: [0] },
            { input: [1], output: [1] },
            { input: [1], output: [0] },
            { input: [0], output: [1] },
            { input: [0], output: [0] }
        ];
        const errorBefore = network.test(data);
        const options = new TrainOptions_1.TrainOptions(data);
        options.iterations = 10000;
        options.clear = true;
        options.rate = new Rate_1.FixedRate(0.01);
        network.train(options);
        const error = network.train(options).error;
        chai_1.expect(Number.isFinite(error)).to.be.true;
        chai_1.expect(Number.isFinite(errorBefore)).to.be.true;
        chai_1.expect(error).to.be.at.most(errorBefore);
    });
    it("Train LSTM network", function () {
        this.timeout(5000);
        const architect = new Architect_1.Architect();
        architect.addLayer(new InputLayer_1.InputLayer(1));
        architect.addLayer(new LSTMLayer_1.LSTMLayer(2, { activation: src_1.RELU }));
        architect.addLayer(new LSTMLayer_1.LSTMLayer(2, { activation: src_1.RELU }));
        architect.addLayer(new OutputLayer_1.OutputLayer(1));
        const network = architect.buildModel();
        const data = [
            { input: [0], output: [0] },
            { input: [1], output: [1] },
            { input: [1], output: [0] },
            { input: [0], output: [1] },
            { input: [0], output: [0] }
        ];
        const errorBefore = network.test(data);
        const options = new TrainOptions_1.TrainOptions(data);
        options.iterations = 10000;
        options.rate = new Rate_1.FixedRate(0.01);
        options.clear = true;
        network.train(options);
        const error = network.train(options).error;
        chai_1.expect(Number.isFinite(error)).to.be.true;
        chai_1.expect(Number.isFinite(errorBefore)).to.be.true;
        chai_1.expect(error).to.be.at.most(errorBefore);
    });
    it('Train GRU network', function () {
        this.timeout(5000);
        const architect = new Architect_1.Architect();
        architect.addLayer(new InputLayer_1.InputLayer(1));
        architect.addLayer(new GRULayer_1.GRULayer(2, { activation: src_1.RELU }));
        architect.addLayer(new OutputLayer_1.OutputLayer(1));
        const network = architect.buildModel();
        const data = [
            { input: [0], output: [0] },
            { input: [1], output: [1] },
            { input: [1], output: [0] },
            { input: [0], output: [1] },
            { input: [0], output: [0] }
        ];
        const errorBefore = network.test(data);
        const options = new TrainOptions_1.TrainOptions(data);
        options.iterations = 10000;
        options.rate = new Rate_1.FixedRate(0.01);
        options.clear = true;
        network.train(options);
        const error = network.train(options).error;
        chai_1.expect(Number.isFinite(error)).to.be.true;
        chai_1.expect(Number.isFinite(errorBefore)).to.be.true;
        chai_1.expect(error).to.be.at.most(errorBefore);
    });
});
