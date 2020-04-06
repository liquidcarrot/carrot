import {Network} from "../../src/architecture/Network";
import {expect} from "chai";

describe('Logic Gates', () => {
    const data: {
        NOR: { output: number[]; input: number[] }[];
        XNOR: { output: number[]; input: number[] }[];
        NOT: { output: number[]; input: number[] } [];
        OR: { output: number[]; input: number[] }[];
        AND: { output: number[]; input: number[] }[];
        XOR: { output: number[]; input: number[] }[];
        NAND: { output: number[]; input: number[] }[]
    } = {
        NOT: [
            {input: [0], output: [1]},
            {input: [1], output: [0]},
        ],
        AND: [
            {input: [0, 0], output: [0]},
            {input: [0, 1], output: [0]},
            {input: [1, 0], output: [0]},
            {input: [1, 1], output: [1]},
        ],
        OR: [
            {input: [0, 0], output: [0]},
            {input: [0, 1], output: [1]},
            {input: [1, 0], output: [1]},
            {input: [1, 1], output: [1]},
        ],
        NAND: [
            {input: [0, 0], output: [1]},
            {input: [0, 1], output: [1]},
            {input: [1, 0], output: [1]},
            {input: [1, 1], output: [0]},
        ],
        NOR: [
            {input: [0, 0], output: [1]},
            {input: [0, 1], output: [0]},
            {input: [1, 0], output: [0]},
            {input: [1, 1], output: [0]},
        ],
        XOR: [
            {input: [0, 0], output: [0]},
            {input: [0, 1], output: [1]},
            {input: [1, 0], output: [1]},
            {input: [1, 1], output: [0]},
        ],
        XNOR: [
            {input: [0, 0], output: [1]},
            {input: [0, 1], output: [0]},
            {input: [1, 0], output: [0]},
            {input: [1, 1], output: [1]},
        ],
    };

    it('[NOT] Network.train()', () => {
        const network: Network = new Network(1, 1);

        const initial: number = network.test(data.NOT);
        network.train(data.NOT, {iterations: 100});
        const final: number = network.test(data.NOT);

        expect(final).to.be.at.most(initial);
    });
    it('[NOT] Network.evolve()', async function (): Promise<void> {
        this.timeout(40000);

        const network: Network = new Network(1, 1);

        const initial: number = network.test(data.NOT);
        await network.evolve(data.NOT, {iterations: 100});
        const final: number = network.test(data.NOT);

        expect(final).to.be.at.most(initial);
    });

    it('[AND] Network.train()', () => {
        const network: Network = new Network(2, 1);

        const initial: number = network.test(data.AND);
        network.train(data.AND, {iterations: 100});
        const final: number = network.test(data.AND);

        expect(final).to.be.at.most(initial);
    });
    it('[AND] Network.evolve()', async function (): Promise<void> {
        this.timeout(40000);

        const network: Network = new Network(2, 1);

        const initial: number = network.test(data.AND);
        await network.evolve(data.AND, {iterations: 100});
        const final: number = network.test(data.AND);

        expect(final).to.be.at.most(initial);
    });

    it('[OR] Network.train()', () => {
        const network: Network = new Network(2, 1);

        const initial: number = network.test(data.OR);
        network.train(data.OR, {iterations: 100});
        const final: number = network.test(data.OR);

        expect(final).to.be.at.most(initial);
    });
    it('[OR] Network.evolve()', async function (): Promise<void> {
        this.timeout(40000);

        const network: Network = new Network(2, 1);

        const initial: number = network.test(data.OR);
        await network.evolve(data.OR, {iterations: 100});
        const final: number = network.test(data.OR);

        expect(final).to.be.at.most(initial);
    });

    it('[NAND] Network.train()', () => {
        const network: Network = new Network(2, 1);

        const initial: number = network.test(data.NAND);
        network.train(data.NAND, {iterations: 100});
        const final: number = network.test(data.NAND);

        expect(final).to.be.at.most(initial);
    });
    it('[NAND] Network.evolve()', async function (): Promise<void> {
        this.timeout(40000);

        const network: Network = new Network(2, 1);

        const initial: number = network.test(data.NAND);
        await network.evolve(data.NAND, {iterations: 100});
        const final: number = network.test(data.NAND);

        expect(final).to.be.at.most(initial);
    });

    it('[NOR] Network.train()', () => {
        const network: Network = new Network(2, 1);

        const initial: number = network.test(data.NOR);
        network.train(data.NOR, {iterations: 100});
        const final: number = network.test(data.NOR);

        expect(final).to.be.at.most(initial);
    });
    it('[NOR] Network.evolve()', async function (): Promise<void> {
        this.timeout(40000);

        const network: Network = new Network(2, 1);

        const initial: number = network.test(data.NOR);
        await network.evolve(data.NOR), {iterations: 100};
        const final: number = network.test(data.NOR);

        expect(final).to.be.at.most(initial);
    });

    it('[XOR] Network.train()', () => {
        const network: Network = new Network(2, 1);

        const initial: number = network.test(data.XOR);
        network.train(data.XOR, {iterations: 100});
        const final: number = network.test(data.XOR);

        expect(final).to.be.at.most(initial);
    });
    it('[XOR] Network.evolve()', async function (): Promise<void> {
        this.timeout(60000);

        const network: Network = new Network(2, 1);

        const initial: number = network.test(data.XOR);
        await network.evolve(data.XOR, {iterations: 100});
        const final: number = network.test(data.XOR);

        expect(final).to.be.at.most(initial);
    });

    it('[XNOR] Network.train()', () => {
        const network: Network = new Network(2, 1);

        const initial: number = network.test(data.XNOR);
        network.train(data.XNOR, {iterations: 100});
        const final: number = network.test(data.XNOR);

        expect(final).to.be.at.most(initial);
    });
    it('[XNOR] Network.evolve()', async function (): Promise<void> {
        this.timeout(60000);

        const network: Network = new Network(2, 1);

        const initial: number = network.test(data.XNOR);
        await network.evolve(data.XNOR, {iterations: 100});
        const final: number = network.test(data.XNOR);

        expect(final).to.be.at.most(initial);
    });
});
