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

    describe(".evaluate()", function () {
        it("(population.members({ inputs: 2, outputs: 1 }), XORSet, methods.cost.MSE) => {Network[] | each .fitness set}", function () {
            const XORSet = [
                { input: [0, 0], output: [0] },
                { input: [0, 1], output: [1] },
                { input: [1, 0], output: [1] },
                { input: [1, 1], output: [0] }
              ];
          
            const population = new Population({ inputs: 2, outputs: 1 });
            
            const evaluated = population.evaluate(population.members, XORSet, methods.cost.MSE);
            for(let i = 0; i < evaluated.length; i++) {
                expect(evaluated[i].fitness).a("number");
            }
        })
    })

    describe(".sort()", function () {
        it("(population.members, 'fitness', true) => {Network[]} | networks sorted in ascending fitness", function () {
            const XORSet = [
                { input: [0, 0], output: [0] },
                { input: [0, 1], output: [1] },
                { input: [1, 0], output: [1] },
                { input: [1, 1], output: [0] }
              ];
            const population = new Population({ inputs: 2, outputs: 1 });

            // Set fitnesses with .evaluate (tested above)
            population.members = population.evaluate(population.members, XORSet, methods.cost.MSE);

            const sorted = population.sort(population.members, "fitness", true);
            
            for(let i = 1; i < sorted.length; i++) {
              expect(sorted[i]["fitness"]).at.least(sorted[i-1]["fitness"])
            }
        })

        it("(population.members, 'fitness', false) => {Network[]} | networks sorted in descending fitness", function () {
            const XORSet = [
                { input: [0, 0], output: [0] },
                { input: [0, 1], output: [1] },
                { input: [1, 0], output: [1] },
                { input: [1, 1], output: [0] }
              ];
            const population = new Population({ inputs: 2, outputs: 1 });

            // Set fitnesses with .evaluate (tested above)
            population.members = population.evaluate(population.members, XORSet, methods.cost.MSE);

            const sorted = population.sort(population.members, "fitness", false);
            
            for(let i = 1; i < sorted.length; i++) {
              expect(sorted[i]["fitness"]).at.most(sorted[i-1]["fitness"])
            }
        })
    })

    describe(".speciate()", function () {
        it("(members, species) => {Species[]}", function () {
            const population = new Population();
            
            // ".all" checks an assertion against all members of an array
            expect(population.speciate(population.members, population.species)).all.instanceOf(Species)
        })

        it("new Population(), speciate(members, species), after a mutation to a population member | Returns two species", function () {
            const population = new Population(); // Every population starts with one species
            
            // Mutate a population member enough to make another species
            population.members[12] = population.members[12].mutate(methods.mutation.ADD_NODE)
            population.members[12] = population.members[12].mutate(methods.mutation.ADD_NODE)

            // Expect two species now
            expect(population.speciate(population.members, population.species)).lengthOf(2)
        })

        it("new Population(), speciate(members, species), species.greatest == species.members[0]", function () {
            // Test that: When a new population is .speciate'd method sets top member as greatest species network

            const XORSet = [
                { input: [0, 0], output: [0] },
                { input: [0, 1], output: [1] },
                { input: [1, 0], output: [1] },
                { input: [1, 1], output: [0] }
              ];

            const population = new Population({ inputs: 2, outputs: 1 });

            // Set fitnesses with .evaluate (tested above)
            population.members = population.evaluate(population.members, XORSet, methods.cost.MSE);

            // Sort by fitness in descending order (tested above)
            population.members = population.sort(population.members, "fitness", false);
            
            const species = population.speciate(population.members, population.species);

            for(let i = 0; i < species.length; i++) {
                const s = species[i];

                // expect that the first of current (sorted) members array will also be the greatest (highest fitness) of all time 
                expect(s.members[0]).equal(s.greatest);
            }
        })

        it("new Population(), population.evaluate(), speciate(members, species), species.stagnation == 0", function () {
            // Test that: When a new population is .speciate'd method sets top member as greatest species network

            const XORSet = [
                { input: [0, 0], output: [0] },
                { input: [0, 1], output: [1] },
                { input: [1, 0], output: [1] },
                { input: [1, 1], output: [0] }
              ];

            const population = new Population({ inputs: 2, outputs: 1 });

            // Set fitnesses with .evaluate (tested above), these fitness will be higher than default: 0
            population.members = population.evaluate(population.members, XORSet, methods.cost.MSE);

            // Sort by fitness in descending order (tested above)
            population.members = population.sort(population.members, "fitness", false);
            
            const species = population.speciate(population.members, population.species);

            for(let i = 0; i < species.length; i++) {
                const s = species[i];

                // expect that the species stagnation count was reset due to improvement in best fitness
                expect(s.stagnation).equal(0);
            }
        })

        it("new Population(), speciate(members, species), species.stagnation == 1 | species stagnation increased when no increase in best fitness", function () {

            const XORSet = [
                { input: [0, 0], output: [0] },
                { input: [0, 1], output: [1] },
                { input: [1, 0], output: [1] },
                { input: [1, 1], output: [0] }
              ];

            const population = new Population({ inputs: 2, outputs: 1 });

            // Set all member fitnesses to 0
            population.members = population.members.map(member => {
                member.fitness = 0;
                return member;
            })
            
            const species = population.speciate(population.members, population.species);

            for(let i = 0; i < species.length; i++) {
                const s = species[i];

                // expect that the species stagnation count was increased due to non-improvement
                expect(s.stagnation).equal(1);
            }
        })
    })

    describe(".evolve()", function () {
        it.skip("({ inputs: 2, dataset: XORSet }) => {Network[]}", function () {
            const XORSet = [
                { input: [0, 0], output: [0] },
                { input: [0, 1], output: [1] },
                { input: [1, 0], output: [1] },
                { input: [1, 1], output: [0] }
              ];
          
            const population = new Population({ inputs: 2, outputs: 1, dataset: XORSet });

            const generation = population.evolve();

            expect(generation).a("array");
          
            expect(generation).all.instanceOf(Network);
        })

        it.skip("new Population, evolve({ inputs: 2, dataset: XORSet }) | population.stagnation is reset to 0", function () {
            const XORSet = [
                { input: [0, 0], output: [0] },
                { input: [0, 1], output: [1] },
                { input: [1, 0], output: [1] },
                { input: [1, 1], output: [0] }
              ];
          
            const population = new Population({ inputs: 2, outputs: 1, dataset: XORSet });

            const newGen = population.evolve();
            
            expect(population).property("stagnation", 0);
        })

        it("new Population, evolve({ inputs: 2, output: 1, dataset: XORSet }) | Reaches 90% accuracy", function () {
            const XORSet = [
                { input: [0, 0], output: [0] },
                { input: [0, 1], output: [1] },
                { input: [1, 0], output: [1] },
                { input: [1, 1], output: [0] }
              ];
            const population = new Population({ inputs: 2, outputs: 1, dataset: XORSet });

            let count = 0;

            while(count < 100 && population.best.fitness < 0.9) {
                population.members = population.evolve();
                count++
            }

            expect(population.best.fitness).greaterThan(0.9);
        })
    })

    describe.skip(".removeMembers()", function() {
        it("(population.members, { cutoff: 0.5 }) => {Species[]}", function () {
            const population = new Population();
            
            // ".all" checks an assertion against all members of an array
            expect(population.removeMembers(population.species , { cutoff: 0.5 })).all.instanceOf(Species)
        })

        it("(population.species, { cutoff: 0.5 }), Returns a species with half of its members removed", function () {
            // Assumes population creates a default species (tested above)
            const population = new Population({ size: 150 });

            // Speciate so that all population members are within the species
            population.species = population.speciate(population.members, population.species);

            // Removes 50% of population
            const prunedSpecies = population.removeMembers(population.species, { cutoff: 0.5 });

            for(let i = 0; i < prunedSpecies.length; i++) {
                species = prunedSpecies[i];
                expect(species.members).lengthOf(75);
            }
        })

        it("(population.species, { cutoff: 0.5 }), Sets each species.members .sharedFitness properties", function () {
            // Assumes population creates a default species (tested above)
            const population = new Population({ size: 150 });

            // Set some bogus fitness scores
            population.members.map((member, index) => {
                member.fitness = 150; // 150 is population size
                return member;
            })

            // Speciate so that all population members are within the species
            population.species = population.speciate(population.members, population.species);

            // Removes 50% of population
            const prunedSpecies = population.removeMembers(population.species, { cutoff: 0.5 });

            for(let i = 0; i < prunedSpecies.length; i++) {
                species = prunedSpecies[i];
                for(let j = 0; j < species.members.length; j++) {
                    expect(species.members[j].sharedFitness).equal(2) // shared fitness is 2 because 150 / 75 (remaining members) is 2
                }
            }
        })

        it("(population.species, { cutoff: 0.5 }), Sets each species .averageFitness property", function () {
            // Assumes population creates a default species (tested above)
            const population = new Population({ size: 150 });

            // Set 1 as all fitness score
            population.members.map((member, index) => {
                member.fitness = 75; // 75 is half of 150 (population size)
                return member;
            })

            // Speciate so that all population members are within the species
            population.species = population.speciate(population.members, population.species);
            
            // We remove 50% of population members, leaving 75, so their shared Fitness will be 1
            const prunedSpecies = population.removeMembers(population.species, { cutoff: 0.5 });

            for(let i = 0; i < prunedSpecies.length; i++) {
                species = prunedSpecies[i];
                for(let j = 0; j < species.members.length; j++) {
                    expect(species.averageFitness).equal(1); // average fitness is 75 * 1 / 75 so 1
                }
            }
        })

        it("(population.species, { cutoff: 0.5 }), Sets population .averageSpeciesFitness property", function () {
            // Assumes population creates a default species (tested above)
            const population = new Population({ size: 150 });

            // Set 1 as all fitness score
            population.members.map((member, index) => {
                member.fitness = 75; // 75 is half of 150 (population size)
                return member;
            })

            // Speciate so that all population members are within the species
            population.species = population.speciate(population.members, population.species);
            
            const prunedSpecies = population.removeMembers(population.species, { cutoff: 0.5 });

            // the one species has a species fitness of 1, so this should also be 1
            expect(population.averageSpeciesFitness).equal(1);
        })
    })

    describe.skip(".replaceMembers()", function () {
        it("(population.species, species.members) => {Network[]}", function () {
            const population = new Population();

            expect(population.replaceMembers(population.species, population.members.length)).all.instanceOf(Network)
        })
    })

    describe.skip(".refreshMembers()", function () {
        it("() => {Network[]}", function () {
            const population = new Population();
            expect(population.refreshMembers(population.species, population.members)).a("array");
        })
    })
})
