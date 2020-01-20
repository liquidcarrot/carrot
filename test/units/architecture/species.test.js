const chai = require('chai');
const { assert, expect } = chai;
const should = chai.should();
chai.use(require('chai-things')); // support for array-based assertions
const chalk = require('chalk');

const { Population, Species, Network, methods } = require('../../../src/carrot');

describe("Species", () => {
    describe("new Species()", function () {
        it("new Species() => {TypeError}", function () {
            expect(() => new Species).throw(TypeError);
        })

        it("new Species(genome) => {Species}", function () {
            expect(new Species(new Network(1,1))).instanceOf(Species);
        })
    })

    describe(".sift()", function () {
        it("(number[], 0.5) | does not mutate original array", function () {
            const descending = [10,9,8,7,6,5,4,3,2,1];

            const species = new Species(new Network(2,2));

            const pruned = species.sift(descending, 0.3);

            expect(pruned).not.equal(descending);
        })
        it("(number[], 0.3) | returns first 1/3rd of array", function () {
            const descending = [10,9,8,7,6,5,4,3,2,1];

            const species = new Species(new Network(2,2));

            const pruned = species.sift(descending, 0.3);

            for(let i = 0; i < pruned.length; i++) {
                expect(pruned[i]).equal(descending[i]);
            }
        })
    })

    describe.skip(".getChild()", function () {
        
    })

    describe.skip(".getDistance()", function () {
        it.skip("Produces correct genetic distance when connection are in order")
        it.skip("Produces correct genetic distance even when connection ids are out of order")
        it.skip("Accurately adapts response to changes in config.weights")
    })
})