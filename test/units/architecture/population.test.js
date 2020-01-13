const chai = require('chai');
const { assert, expect } = chai;
const should = chai.should();
chai.use(require('chai-things')); // support for array-based assertions
const chalk = require('chalk');

const { Population, Species, Network, methods } = require('../../../src/carrot');

describe("Population", () => {
    describe("new Population()", function () {
        it("new Population() => {Network}", function () {
            const population = new Population();

            expect(population).instanceOf(Population);
        })
    })

    describe(".speciate()", function () {
        it("(pop.members, pop.species) => {Species[]}", function () {
            const population = new Population();
            
            // ".all" checks an assertion against all members of an array
            expect(population.speciate(population.members, population.species)).all.instanceOf(Species)
        })
    })
})
