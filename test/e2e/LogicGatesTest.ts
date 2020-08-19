import { expect } from "chai";
import { describe, it } from "mocha";
import { Network, TrainOptions } from "../../src";

describe("Logic Gates", () => {
  const data: {
    NOR: { output: number[]; input: number[] }[];
    XNOR: { output: number[]; input: number[] }[];
    NOT: { output: number[]; input: number[] }[];
    OR: { output: number[]; input: number[] }[];
    AND: { output: number[]; input: number[] }[];
    XOR: { output: number[]; input: number[] }[];
    NAND: { output: number[]; input: number[] }[];
  } = {
    NOT: [
      { input: [0], output: [1] },
      { input: [1], output: [0] },
    ],
    AND: [
      { input: [0, 0], output: [0] },
      { input: [0, 1], output: [0] },
      { input: [1, 0], output: [0] },
      { input: [1, 1], output: [1] },
    ],
    OR: [
      { input: [0, 0], output: [0] },
      { input: [0, 1], output: [1] },
      { input: [1, 0], output: [1] },
      { input: [1, 1], output: [1] },
    ],
    NAND: [
      { input: [0, 0], output: [1] },
      { input: [0, 1], output: [1] },
      { input: [1, 0], output: [1] },
      { input: [1, 1], output: [0] },
    ],
    NOR: [
      { input: [0, 0], output: [1] },
      { input: [0, 1], output: [0] },
      { input: [1, 0], output: [0] },
      { input: [1, 1], output: [0] },
    ],
    XOR: [
      { input: [0, 0], output: [0] },
      { input: [0, 1], output: [1] },
      { input: [1, 0], output: [1] },
      { input: [1, 1], output: [0] },
    ],
    XNOR: [
      { input: [0, 0], output: [1] },
      { input: [0, 1], output: [0] },
      { input: [1, 0], output: [0] },
      { input: [1, 1], output: [1] },
    ],
  };

  it("[NOT] Network.train()", () => {
    const network: Network = new Network(1, 1);

    const initial: number = network.test(data.NOT);
    const options: TrainOptions = new TrainOptions(data.NOT);
    options.iterations = 20;
    network.train(options);
    const final: number = network.test(data.NOT);

    expect(final).to.be.at.most(initial);
  });

  it("[NOT] Network.evolve()", function (): void {
    // this.timeout(30000);
    // this.retries(3);
    //
    // const network: Network = new Network(1, 1);
    //
    // const initial: number = network.test(data.NOT);
    // const options: EvolveOptions = new EvolveOptions();
    // options.iterations = 20;
    // options.dataset = data.NOT;
    // await network.evolve(options);
    // const final: number = network.test(data.NOT);
    //
    // expect(final).to.be.at.most(initial);
  });

  it("[AND] Network.train()", () => {
    const network: Network = new Network(2, 1);

    const initial: number = network.test(data.AND);
    const options: TrainOptions = new TrainOptions(data.AND);
    options.iterations = 20;
    network.train(options);
    const final: number = network.test(data.AND);

    expect(final).to.be.at.most(initial);
  });

  it("[AND] Network.evolve()", function (): void {
    // this.timeout(30000);
    // this.retries(3);
    //
    // const network: Network = new Network(2, 1);
    //
    // const initial: number = network.test(data.AND);
    // const options: EvolveOptions = new EvolveOptions();
    // options.iterations = 20;
    // options.dataset = data.AND;
    // await network.evolve(options);
    // const final: number = network.test(data.AND);
    //
    // expect(final).to.be.at.most(initial);
  });

  it("[OR] Network.train()", () => {
    const network: Network = new Network(2, 1);

    const initial: number = network.test(data.OR);
    const options: TrainOptions = new TrainOptions(data.OR);
    options.iterations = 20;
    network.train(options);
    const final: number = network.test(data.OR);

    expect(final).to.be.at.most(initial);
  });

  it("[OR] Network.evolve()", function (): void {
    // this.timeout(30000);
    // this.retries(3);
    //
    // const network: Network = new Network(2, 1);
    //
    // const initial: number = network.test(data.OR);
    // const options: EvolveOptions = new EvolveOptions();
    // options.iterations = 20;
    // options.dataset = data.OR;
    // await network.evolve(options);
    // const final: number = network.test(data.OR);
    //
    // expect(final).to.be.at.most(initial);
  });

  it("[NAND] Network.train()", () => {
    const network: Network = new Network(2, 1);

    const initial: number = network.test(data.NAND);
    const options: TrainOptions = new TrainOptions(data.NAND);
    options.iterations = 20;
    network.train(options);
    const final: number = network.test(data.NAND);

    expect(final).to.be.at.most(initial);
  });

  it("[NAND] Network.evolve()", function (): void {
    // this.timeout(30000);
    // this.retries(3);
    //
    // const network: Network = new Network(2, 1);
    //
    // const initial: number = network.test(data.NAND);
    // const options: EvolveOptions = new EvolveOptions();
    // options.iterations = 20;
    // options.dataset = data.NAND;
    // await network.evolve(options);
    // const final: number = network.test(data.NAND);
    //
    // expect(final).to.be.at.most(initial);
  });

  it("[NOR] Network.train()", () => {
    const network: Network = new Network(2, 1);

    const initial: number = network.test(data.NOR);
    const options: TrainOptions = new TrainOptions(data.NOR);
    options.iterations = 20;
    network.train(options);
    const final: number = network.test(data.NOR);

    expect(final).to.be.at.most(initial);
  });

  it("[NOR] Network.evolve()", function (): void {
    // this.timeout(30000);
    // this.retries(3);
    //
    // const network: Network = new Network(2, 1);
    //
    // const initial: number = network.test(data.NOR);
    // const options: EvolveOptions = new EvolveOptions();
    // options.iterations = 20;
    // options.dataset = data.NOR;
    // await network.evolve(options);
    // const final: number = network.test(data.NOR);
    //
    // expect(final).to.be.at.most(initial);
  });

  it("[XOR] Network.train()", () => {
    const network: Network = new Network(2, 1);

    const initial: number = network.test(data.XOR);
    const options: TrainOptions = new TrainOptions(data.XOR);
    options.iterations = 20;
    network.train(options);
    const final: number = network.test(data.XOR);

    expect(final).to.be.at.most(initial);
  });

  it("[XOR] Network.evolve()", function (): void {
    // this.timeout(30000);
    // this.retries(3);
    //
    // const network: Network = new Network(2, 1);
    //
    // const initial: number = network.test(data.XOR);
    // const options: EvolveOptions = new EvolveOptions();
    // options.iterations = 20;
    // options.dataset = data.XOR;
    // await network.evolve(options);
    // const final: number = network.test(data.XOR);
    //
    // expect(final).to.be.at.most(initial);
  });

  it("[XNOR] Network.train()", () => {
    const network: Network = new Network(2, 1);

    const initial: number = network.test(data.XNOR);
    const options: TrainOptions = new TrainOptions(data.XNOR);
    options.iterations = 20;
    network.train(options);
    const final: number = network.test(data.XNOR);

    expect(final).to.be.at.most(initial);
  });

  it("[XNOR] Network.evolve()", function (): void {
    // this.timeout(30000);
    // this.retries(3);
    //
    // const network: Network = new Network(2, 1);
    //
    // const initial: number = network.test(data.XNOR);
    // const options: EvolveOptions = new EvolveOptions();
    // options.iterations = 20;
    // options.dataset = data.XNOR;
    // await network.evolve(options);
    // const final: number = network.test(data.XNOR);
    //
    // expect(final).to.be.at.most(initial);
  });
});
