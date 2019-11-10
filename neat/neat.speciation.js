// https://github.com/thi-ng/umbrella/tree/master/packages/iterators
// let size = 100000, array = [];
// for (let i = 0; i < size; i++) array.push(i);

let { performance } = require("perf_hooks");

let size = 5000;
let population = {};

let start = performance.now();
let fitness = Array.from({ length: size}, () => Math.random() * 10);
let distance = Array.from({ length: size * size }, () => Math.random() * 10);
let end = performance.now();

console.log(end - start);

start = performance.now();
// Creating a species/population in O(n^2)
// Creates a set of fake population distances
for (let a = 0; a < size; a++) {
  if(population[a] == undefined) population[a] = { fitness: fitness[a], distance: {} };

  for (let b = 0; b < size; b++) {
    if(population[b] == undefined) population[b] = { fitness: fitness[b], distance: {} };

    if(population[a].distance[b] == undefined) {
      population[a].distance[b] = population[b].distance[a] = distance[a * size + b];
    }
  }
}
end = performance.now();

console.log(Object.keys(population));
console.log(end - start);

start = performance.now();
function adjustedFitness(species) {
  let genomes = Object.keys(species);
  let fitnesses = [];

  for (let genome = 0; genome < genomes.length; genome++) {
    let sum = 0;
    let distances = Object.values(species[genome].distance);

    for (let distance = 0; distance < distances.length; distance++) { sum += distance; }

    fitnesses.push(species[genome].fitness / sum);
  }

  return fitnesses;
}
end = performance.now();

console.log(adjustedFitness(population));
console.log(end - start);
