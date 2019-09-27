<p align="center">
 <img src="https://raw.githubusercontent.com/liquidcarrot/carrot/master/images/carrot-logo_readme.png" alt="Carrot Logo" width="600px"/>
</p>

<p align="center">
    <a href="https://travis-ci.org/liquidcarrot/carrot">
        <img src="https://travis-ci.org/liquidcarrot/carrot.svg?branch=master"
             alt="Build Status via Travis CI">
    </a>
    <a href="https://www.codacy.com/app/christianechevarria/carrot?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=liquidcarrot/carrot&amp;utm_campaign=Badge_Grade">
        <img src="https://api.codacy.com/project/badge/Grade/3ee723b170f14b4990c8a0a6fc1feb27"
             alt="Codacy Badge">
    </a>
    <a href="https://coveralls.io/github/liquidcarrot/carrot?branch=master">
        <img src="https://coveralls.io/repos/github/liquidcarrot/carrot/badge.svg?branch=master"
             alt="Coverage Status">
    </a>
    <a href="https://gitter.im/carrot-ai/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badgee&utm_content=badge">
        <img src="https://badges.gitter.im/Join%20Chat.svg"
             alt="Join the chat at https://gitter.im/carrot-ai/community">
    </a>
    <a href="/LICENSE">
        <img src="https://img.shields.io/badge/License-MIT-blue.svg"
             alt="Carrot's License">
    </a>
    <a href="https://github.com/liquidcarrot/carrot/issues">
        <img src="https://img.shields.io/badge/Made%20with%20%E2%99%A5%20by-Liquid%20Carrot-ff1414.svg"
             alt="Made with love">
    </a>
</p>

<p>
  Carrot is a flexible multi-threaded neural network AI Library for Node.js with neuro-evolution capabilities.
</p>

For Documentation, visit [here](https://liquidcarrot.github.io/carrot)

## Key Features
- [Simple docs](https://liquidcarrot.github.io/carrot) & [interactive examples](https://liquidcarrot.io/example.flappy-bird/)
- **Neuro-evolution** & population based training
- Multi-threading & GPU (coming soon)
- Preconfigured GRU, LSTM, NARX Networks
- Mutable Neurons, Layers, Groups, and Networks
- SVG Network Visualizations using D3.js

## Demos
![flappy bird neuro-evolution demo](https://raw.githubusercontent.com/liquidcarrot/carrot/master/images/flappy-bird-demo.gif)
<br>
[Flappy bird neuro-evolution](https://liquidcarrot.io/example.flappy-bird/ "flappy bird playground")


## Install

```bash
$ npm i @liquid-carrot/carrot
```
 
Carrot files are hosted by JSDelivr

For prototyping or learning, use the latest version here:

```html
<script src="https://cdn.jsdelivr.net/npm/@liquid-carrot/carrot/dist/carrot.umd2.min.js"></script>
```

For production, link to a specific version number to avoid unexpected breakage from newer versions:

```html
<script src="https://cdn.jsdelivr.net/npm/@liquid-carrot/carrot@0.3.12/dist/carrot.umd2.min.js"></script>
```

## Getting Started

This is a simple **perceptron**:

![perceptron](http://www.codeproject.com/KB/dotnet/predictor/network.jpg).

How to build it with Carrot:

```javascript
let { architect } = require('@liquid-carrot/carrot');

// The example Perceptron you see above with 4 inputs, 5 hidden, and 1 output neuron
let simplePerceptron = new architect.Perceptron(4, 5, 1);
```

Building networks is easy with **6** built-in networks

```javascript
let { architect } = require('@liquid-carrot/carrot');

let LSTM = new architect.LSTM(4, 5, 1);

// Add as many hidden layers as needed
let Perceptron = new architect.Perceptron(4, 5, 20, 5, 10, 1);
```

Building custom network architectures

```javascript
let architect = require('@liquid-carrot/carrot').architect
let Layer = require('@liquid-carrot/carrot').Layer

let input = new Layer.Dense(1);
let hidden1 = new Layer.LSTM(5);
let hidden2 = new Layer.GRU(1);
let output = new Layer.Dense(1);

// connect however you want
input.connect(hidden1);
hidden1.connect(hidden2);
hidden2.connect(output);

let network = architect.Construct([input, hidden1, hidden2, output]);
```

Networks also shape **themselves** with neuro-evolution

```javascript
let { Network, methods } = require('@liquid-carrot/carrot');

// this network learns the XOR gate (through neuro-evolution)
async function execute () {
  // no hidden layers...
   var network = new Network(2,1);

   // XOR dataset
   var trainingSet = [
       { input: [0,0], output: [0] },
       { input: [0,1], output: [1] },
       { input: [1,0], output: [1] },
       { input: [1,1], output: [0] }
   ];

   await network.evolve(trainingSet, {
       mutation: methods.mutation.FFW,
       equal: true,
       error: 0.05,
       elitism: 5,
       mutation_rate: 0.5
   });

   // and it works!
   network.activate([0,0]); // 0.2413
   network.activate([0,1]); // 1.0000
   network.activate([1,0]); // 0.7663
   network.activate([1,1]); // 0.008
}

execute();
```

Build vanilla neural networks

```javascript
let Network = require('@liquid-carrot/carrot').Network

let network = new Network([2, 2, 1]) // Builds a neural network with 5 neurons: 2 + 2 + 1
```

Or implement custom algorithms with neuron-level control

```javascript
let Node = require('@liquid-carrot/carrot').Node

let A = new Node() // neuron
let B = new Node() // neuron

A.connect(B)
A.activate(0.5)
console.log(B.activate())
```

## Try with

#### Data Sets
 - [ ] [MNIST](https://www.npmjs.com/package/mnist)


## Contributors ✨

This project exists thanks to all the people who contribute. We can't do it without you! 🙇

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://liquidcarrot.io/"><img src="https://avatars3.githubusercontent.com/u/21148993?v=4" width="100px;" alt="Luis Carbonell"/><br /><sub><b>Luis Carbonell</b></sub></a><br /><a href="https://github.com/liquidcarrot/carrot/commits?author=luiscarbonell" title="Code">💻</a> <a href="#ideas-luiscarbonell" title="Ideas, Planning, & Feedback">🤔</a> <a href="#review-luiscarbonell" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/liquidcarrot/carrot/commits?author=luiscarbonell" title="Documentation">📖</a></td>
    <td align="center"><a href="http://liquidcarrot.io"><img src="https://avatars2.githubusercontent.com/u/23618650?v=4" width="100px;" alt="Christian Echevarria"/><br /><sub><b>Christian Echevarria</b></sub></a><br /><a href="https://github.com/liquidcarrot/carrot/commits?author=christianechevarria" title="Code">💻</a> <a href="https://github.com/liquidcarrot/carrot/commits?author=christianechevarria" title="Documentation">📖</a> <a href="#infra-christianechevarria" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/dan-ryan"><img src="https://avatars1.githubusercontent.com/u/775672?v=4" width="100px;" alt="Daniel Ryan"/><br /><sub><b>Daniel Ryan</b></sub></a><br /><a href="https://github.com/liquidcarrot/carrot/issues?q=author%3Adan-ryan" title="Bug reports">🐛</a> <a href="#review-dan-ryan" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/IviieMtz"><img src="https://avatars0.githubusercontent.com/u/50965172?v=4" width="100px;" alt="IviieMtz"/><br /><sub><b>IviieMtz</b></sub></a><br /><a href="https://github.com/liquidcarrot/carrot/commits?author=IviieMtz" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/nicszerman"><img src="https://avatars3.githubusercontent.com/u/14032356?v=4" width="100px;" alt="Nicholas Szerman"/><br /><sub><b>Nicholas Szerman</b></sub></a><br /><a href="https://github.com/liquidcarrot/carrot/commits?author=nicszerman" title="Code">💻</a></td>
    <td align="center"><a href="http://www.threeceemedia.com"><img src="https://avatars3.githubusercontent.com/u/1046501?v=4" width="100px;" alt="tracy collins"/><br /><sub><b>tracy collins</b></sub></a><br /><a href="https://github.com/liquidcarrot/carrot/commits?author=tracycollins" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!


## 💬 Contributing

[![Carrot's GitHub Issues](https://img.shields.io/github/issues/liquidcarrot/carrot.svg)](https://github.com/liquidcarrot/carrot/issues)

Your contributions are always welcome! Please have a look at the [contribution guidelines](https://github.com/liquidcarrot/carrot/blob/master/CONTRIBUTING.md) first. 🎉

To build a community welcome to all, Carrot follows the [Contributor Covenant](https://github.com/liquidcarrot/carrot/blob/master/CODE_OF_CONDUCT.md) Code of Conduct.

And finally, a big thank you to all of you for supporting! 🤗

<details><summary><strong>Planned Features</strong></summary>
* [ ] Performance Enhancements
    * [ ] GPU Acceleration
        * [ ] Tests
        * [ ] Benchmarks
    * [ ] Matrix Multiplications
        * [ ] Tests
        * [ ] Benchmarks
    * [ ] Clustering | Multi-Threading
        * [ ] Tests
        * [ ] Benchmarks
* [ ] Syntax Support
    * [ ] Callbacks
    * [ ] Promises
    * [ ] Streaming
    * [ ] Async/Await
* [ ] Math Support
    * [ ] Big Numbers
    * [ ] Small Numbers
</details>

## Patrons
[![Carrot's Patrons](https://img.shields.io/endpoint.svg?color=blue&label=patrons&logo=patrons&url=https%3A%2F%2Fshieldsio-patreon.herokuapp.com%2Fliquidcarrot)](https://www.patreon.com/liquidcarrot)

<table>
 <thead>
  <tr>
   <th>Silver Patrons</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td align="center">
    <a href="https://github.com/D-Nice" alt="D-Nice on Github"><img src="https://avatars0.githubusercontent.com/u/2888248?s=460&v=4" alt="D-Nice Profile Pitcure" width="150px" /></a>
    <br>
    <strong>D-Nice</strong>
   </td>
  </tr>
 </tbody>
</table>

<table>
 <thead>
  <tr>
   <th>Bronze Patrons</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td align="center">
    <a href="https://github.com/kappaxbeta" alt="Kappaxbeta on Github"><img src="https://avatars2.githubusercontent.com/u/7612464?s=460&v=4" alt="Kappaxbeta's Profile Pitcure" width="125px" /></a>
    <br>
    <strong>Kappaxbeta</strong>
   </td>
  </tr>
 </tbody>
</table>

<table>
 <thead>
  <tr>
   <th>Patrons</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td>
    <a href="http://dollarbizclub.com/" alt="DollarBizClub"><img src="http://dollarbizclub.com/css/img/red400.png" alt="DollarBizClub Logo" width="100px" /></a>
    <br>
    <strong>DollarBizClub</strong>
   </td>
  </tr>
 </tbody>
</table>

[![Become a Patron](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://www.patreon.com/liquidcarrot)

## Acknowledgements

A special thanks to [Neataptic](https://github.com/wagenaartje/neataptic/), [Synaptic](https://github.com/cazala/synaptic/), and [Brain.js](https://github.com/BrainJS/brain.js)!

Carrot™ was largely brought about by inspiration from these great libraries.
