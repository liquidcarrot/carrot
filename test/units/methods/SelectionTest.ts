import {expect} from "chai";
import {Network} from "../../../src/architecture/Network";
import {FitnessProportionateSelection, PowerSelection, TournamentSelection} from "../../../src/methods/Selection";
import {randDouble, randInt} from "../../../src/utils/Utils";

describe("selection", () => {
    describe("TournamentSelection", () => {
        const size: number = randInt(2, 10);
        const probability: number = Math.random();

        const selection: TournamentSelection = new TournamentSelection(size, probability);

        const pseudoPopulation: Network[] = [];

        for (let i: number = 0; i < 20; i++) {
            const network: Network = new Network(5, 5);
            network.score = randDouble(-50, 50);
            pseudoPopulation.push(network);
        }
        pseudoPopulation.sort((a: Network, b: Network) => {
            return a.score === undefined || b.score === undefined ? 0 : b.score - a.score;
        });
        expect(selection.select(pseudoPopulation)).to.be.instanceOf(Network);
    });
    describe("PowerSelection", () => {
        const power: number = randInt(2, 10);

        const selection: PowerSelection = new PowerSelection(power);

        const pseudoPopulation: Network[] = [];

        for (let i: number = 0; i < randInt(50, 150); i++) {
            const network: Network = new Network(5, 5);
            network.score = randDouble(-50, 50);
            pseudoPopulation.push(network);
        }

        pseudoPopulation.sort((a: Network, b: Network) => {
            return a.score === undefined || b.score === undefined ? 0 : b.score - a.score;
        });
        expect(selection.select(pseudoPopulation)).to.be.instanceOf(Network);
    });
    describe("FitnessProportionateSelection", () => {
        const selection: FitnessProportionateSelection = new FitnessProportionateSelection();

        const pseudoPopulation: Network[] = [];

        for (let i: number = 0; i < randInt(50, 150); i++) {
            const network: Network = new Network(5, 5);
            network.score = randDouble(-50, 50);
            pseudoPopulation.push(network);
        }

        pseudoPopulation.sort((a: Network, b: Network) => {
            return a.score === undefined || b.score === undefined ? 0 : b.score - a.score;
        });
        expect(selection.select(pseudoPopulation)).to.be.instanceOf(Network);
    });
});
