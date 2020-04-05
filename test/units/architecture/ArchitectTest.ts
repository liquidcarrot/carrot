import {ActivationType} from "../../../src/methods/Activation";
import {Architect} from "../../../src/architecture/Architect";
import {OutputLayer} from "../../../src/architecture/layer/OutputLayer";
import {InputLayer} from "../../../src/architecture/layer/InputLayer";
import {DenseLayer} from "../../../src/architecture/layer/DenseLayer";
import {Network} from "../../../src/architecture/Network";
import {expect} from "chai";

describe("ArchitectTest", () => {
    it("Build Multilayer-Perceptron", () => {
        const architect: Architect = new Architect();

        architect.addLayer(new InputLayer(10));
        architect.addLayer(new DenseLayer(10, {activationType: ActivationType.RELUActivation}));
        architect.addLayer(new DenseLayer(50, {activationType: ActivationType.RELUActivation}));
        architect.addLayer(new DenseLayer(20, {activationType: ActivationType.RELUActivation}));
        architect.addLayer(new DenseLayer(10, {activationType: ActivationType.RELUActivation}));
        architect.addLayer(new OutputLayer(2));

        const network: Network = architect.buildModel();

        expect(network.nodes.length).to.be.equal(10 + 10 + 50 + 20 + 10 + 2);
        expect(network.connections.length).to.be.equal(10 * 10 + 10 * 50 + 50 * 20 + 20 * 10 + 10 * 2);
        expect(network.gates.length).to.be.equal(0);
    });
});
