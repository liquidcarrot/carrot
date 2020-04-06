import {ActivationType} from "../../../src/enums/ActivationType";
import {Architect} from "../../../src/architecture/Architect";
import {OutputLayer} from "../../../src/architecture/Layers/OutputLayer";
import {InputLayer} from "../../../src/architecture/Layers/InputLayer";
import {DenseLayer} from "../../../src/architecture/Layers/DenseLayer";
import {Network} from "../../../src/architecture/Network";
import {expect} from "chai";
import {BinaryLoss} from "../../../src/methods/Loss";
import {LSTMLayer} from "../../../src/architecture/Layers/LSTMLayer";
import {MemoryLayer} from "../../../src/architecture/Layers/MemoryLayer";
import {randInt} from "../../../src/methods/Utils";
import {GRULayer} from "../../../src/architecture/Layers/GRULayer";

describe("ArchitectTest", () => {
    it("Build Multilayer-Perceptron", () => {
        const layerSizes: number[] = [randInt(5, 10), randInt(10, 20), randInt(5, 10)];

        const architect: Architect = new Architect();

        architect.addLayer(new InputLayer(10));
        architect.addLayer(new DenseLayer(layerSizes[0], {activationType: ActivationType.RELUActivation}));
        architect.addLayer(new DenseLayer(layerSizes[1], {activationType: ActivationType.RELUActivation}));
        architect.addLayer(new DenseLayer(layerSizes[2], {activationType: ActivationType.RELUActivation}));
        architect.addLayer(new OutputLayer(2));

        const network: Network = architect.buildModel();

        expect(network.nodes.length).to.be.equal(10 + layerSizes[0] + layerSizes[1] + layerSizes[2] + 2);
        expect(network.connections.length).to.be.equal(10 * layerSizes[0] + layerSizes[0] * layerSizes[1] + layerSizes[1] * layerSizes[2] + layerSizes[2] * 2);
        expect(network.gates.length).to.be.equal(0);

        const numNodesWithRELU: number = network.nodes.filter(node => node.squash.type === ActivationType.RELUActivation).length;
        expect(numNodesWithRELU).to.be.equal(layerSizes[0] + layerSizes[1] + layerSizes[2]);
    });

    it("Build Multilayer-Perceptron with memory layer", () => {
        const memorySize: number = randInt(5, 15);
        const outputSize: number = randInt(20, 30);

        const architect: Architect = new Architect();

        architect.addLayer(new InputLayer(10));
        architect.addLayer(new DenseLayer(10, {activationType: ActivationType.RELUActivation}));
        architect.addLayer(new MemoryLayer(outputSize, {memorySize, activationType: ActivationType.RELUActivation}));
        architect.addLayer(new DenseLayer(20, {activationType: ActivationType.RELUActivation}));
        architect.addLayer(new DenseLayer(10, {activationType: ActivationType.RELUActivation}));
        architect.addLayer(new OutputLayer(2));

        const network: Network = architect.buildModel();

        expect(network.nodes.length).to.be.equal(10 + 10 + outputSize * (memorySize + 1) + 20 + 10 + 2);
        expect(network.connections.length).to.be.equal(10 * 10 + 10 * outputSize + memorySize * outputSize + outputSize * 20 + 20 * 10 + 10 * 2);
        expect(network.gates.length).to.be.equal(0);

        const numNodesWithRELU: number = network.nodes.filter(node => node.squash.type === ActivationType.RELUActivation).length;
        expect(numNodesWithRELU).to.be.equal(10 + outputSize + 20 + 10);
    });

    it("Build GRU network", () => {
        const GRUSize: number = randInt(10, 20);

        const architect: Architect = new Architect();

        architect.addLayer(new InputLayer(10));

        architect.addLayer(new GRULayer(GRUSize, {activationType: ActivationType.RELUActivation}));

        architect.addLayer(new OutputLayer(2));

        const network: Network = architect.buildModel();

        expect(network.nodes.length).to.be.equal(10 + GRUSize * 7 + 2);

        // 10 * GRUSize (input -> LSTM)
        // GRUSize * GRUSize * 8 + GRUSize (LSTM intern connection)
        // GRUSize * 2 (LSTM -> output)
        expect(network.connections.length).to.be.equal(10 * GRUSize + GRUSize * GRUSize * 8 + 2 * GRUSize + GRUSize * 2);

        expect(network.gates.length).to.be.equal(3 * GRUSize * GRUSize);

        const numNodesWithRELU: number = network.nodes.filter(node => node.squash.type === ActivationType.RELUActivation).length;
        expect(numNodesWithRELU).to.be.equal(GRUSize);
    });

    it("Build LSTM network", () => {
        const LSTMSize: number = randInt(10, 20);

        const architect: Architect = new Architect();

        architect.addLayer(new InputLayer(10));

        architect.addLayer(new LSTMLayer(LSTMSize, {activationType: ActivationType.RELUActivation}));

        architect.addLayer(new OutputLayer(2));

        const network: Network = architect.buildModel();

        expect(network.nodes.length).to.be.equal(10 + LSTMSize * 6 + 2);

        // 10 * LSTMSize (input -> LSTM)
        // LSTMSize * LSTMSize * 8 + LSTMSize (LSTM intern connection)
        // LSTMSize * 2 (LSTM -> output)
        expect(network.connections.length).to.be.equal(10 * LSTMSize + LSTMSize * LSTMSize * 8 + LSTMSize + LSTMSize * 2);

        expect(network.gates.length).to.be.equal(2 * LSTMSize * LSTMSize + LSTMSize);

        const numNodesWithRELU: number = network.nodes.filter(node => node.squash.type === ActivationType.RELUActivation).length;
        expect(numNodesWithRELU).to.be.equal(LSTMSize);
    });

    it("Train Multilayer-Perceptron", () => {
        const architect: Architect = new Architect();

        architect.addLayer(new InputLayer(2));
        architect.addLayer(new DenseLayer(5, {activationType: ActivationType.RELUActivation}));
        architect.addLayer(new DenseLayer(5, {activationType: ActivationType.RELUActivation}));
        architect.addLayer(new DenseLayer(5, {activationType: ActivationType.RELUActivation}));
        architect.addLayer(new OutputLayer(1));

        const network: Network = architect.buildModel();

        const AND_GATE: { input: number[], output: number[] }[] = [
            {input: [0, 0], output: [0]},
            {input: [0, 1], output: [0]},
            {input: [1, 0], output: [0]},
            {input: [1, 1], output: [1]}
        ];

        const errorBefore: number = network.test(AND_GATE, new BinaryLoss());

        const error: number = network.train(AND_GATE, {
            iterations: 10000,
            rate: 0.01,
            shuffle: true,
        }).error;

        expect(Number.isFinite(error)).to.be.true;
        expect(Number.isFinite(errorBefore)).to.be.true;
        expect(error).to.be.at.most(errorBefore);
    });

    it("Train LSTM network", () => {
        const architect: Architect = new Architect();

        architect.addLayer(new InputLayer(1));
        architect.addLayer(new LSTMLayer(2, {activationType: ActivationType.RELUActivation}));
        architect.addLayer(new LSTMLayer(2, {activationType: ActivationType.RELUActivation}));
        architect.addLayer(new OutputLayer(1));

        const network: Network = architect.buildModel();

        const data: { input: number[], output: number[] }[] = [
            {input: [0], output: [0]},
            {input: [1], output: [1]},
            {input: [1], output: [0]},
            {input: [0], output: [1]},
            {input: [0], output: [0]}
        ];

        const errorBefore: number = network.test(data);

        const error: number = network.train(data, {
            iterations: 10000,
            rate: 0.01,
            clear: true,
        }).error;

        expect(Number.isFinite(error)).to.be.true;
        expect(Number.isFinite(errorBefore)).to.be.true;
        expect(error).to.be.at.most(errorBefore);
    });

    it('Train GRU network', () => {
        const architect: Architect = new Architect();

        architect.addLayer(new InputLayer(1));
        architect.addLayer(new GRULayer(2, {activationType: ActivationType.RELUActivation}));
        architect.addLayer(new OutputLayer(1));

        const network: Network = architect.buildModel();

        const data: { output: number[]; input: number[] }[] = [
            {input: [0], output: [0]},
            {input: [1], output: [1]},
            {input: [1], output: [0]},
            {input: [0], output: [1]},
            {input: [0], output: [0]}
        ];

        const errorBefore: number = network.test(data);

        const error: number = network.train(data, {
            iterations: 10000,
            rate: 0.01,
            clear: true,
        }).error;

        expect(Number.isFinite(error)).to.be.true;
        expect(Number.isFinite(errorBefore)).to.be.true;
        expect(error).to.be.at.most(errorBefore);
    });
});
