import { describe } from "mocha";
import { NEATPopulation } from "../../../src/population/NEATPopulation";
import { expect } from "chai";

describe("NEATPopulation", () => {
  it("new population shouldn't have any connection", () => {
    const population = new NEATPopulation(10, { inputSize: 2, outputSize: 2 });
    population.networks.forEach((network) => {
      const nodes = network.nodes;
      for (let j = 0; j < nodes.length; j++) {
        expect(nodes[j].id).to.be.equals(j);
      }
    });

    expect(NEATPopulation.connIDs.size).to.be.equals(0);
  });
});
