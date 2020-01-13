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

        it("new Population() | .members array contains networks", function () {
            const population = new Population();
            expect(population.members).all.instanceOf(Network);
        })

        it("new Population() | .species contains one Species", function () {
            const population = new Population();
            expect(population.species).lengthOf(1);
            expect(population.species[0]).instanceOf(Species);
        })

        it("new Population() | each .members network has an ascending id starting from 1", function () {
            const population = new Population();
            let lastId = 0;
            for(let i = 0; i < population.members.length; i++) {
                const network = population.members[i];
                expect(network.id).equal(lastId + 1);
                lastId++;
            }
        })
    })

    describe(".speciate()", function () {
        it("(members, species) => {Species[]}", function () {
            const population = new Population();
            
            // ".all" checks an assertion against all members of an array
            expect(population.speciate(population.members, population.species)).all.instanceOf(Species)
        })

        it("new Population(), speciate(members, species), mutation to population member | Returns two species", function () {
            const population = new Population(); // Every population starts with one species
            
            // Mutate a population member enough to make another species
            population.members[12] = population.members[12].mutate(methods.mutation.ADD_NODE)
            population.members[12] = population.members[12].mutate(methods.mutation.ADD_NODE)

            // Expect two species now
            expect(population.speciate(population.members, population.species)).lengthOf(2)
        })
    })
})
