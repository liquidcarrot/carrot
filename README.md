<p align="center">
 <img src="https://raw.githubusercontent.com/liquidcarrot/carrot/master/logo/carrot-logo_readme.png" alt="Carrot Logo" width="600px"/>
</p>

<p align="center">
    <a href="https://travis-ci.org/liquidcarrot/carrot">
        <img src="https://travis-ci.org/liquidcarrot/carrot.svg?branch=master"
             alt="Build Status via Travis CI">
    </a>
    <a href="https://www.npmjs.com/package/@liquid-carrot/carrot">
        <img src="https://img.shields.io/npm/dm/@liquid-carrot/carrot.svg"
             alt="Carrot's Monthly Downloads">
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

For Documentation, visit [https://liquidcarrot.github.io/carrot](https://liquidcarrot.github.io/carrot)

## Key Features
- Multi-threaded
- Fully Documented with [async-style](https://liquidcarrot.github.io/carrot) Docs
- Preconfigured GRU, LSTM, NARX Networks
- Mutable Neurons, Layers, Groups, and Networks
- Neuro-evolution with genetic algorithms
- SVG Network Visualizations using D3.js

## Install

```bash
$ npm i @liquid-carrot/carrot
```

Carrot files are hosted by GitHub Pages, just copy this link into the `<head>` tag:

```html
<script src="https://liquidcarrot.io/carrot/cdn/0.1.100/carrot.js"></script>
```

## Getting Started

Shaping a network with neuro-evolution

```javascript
let { Network, methods } = require('@liquid-carrot/carrot');

// this network learns the XOR gate (through neuro-evolution)
async function execute () {
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
       mutationRate: 0.5
   });

   network.activate([0,0]); // 0.2413
   network.activate([0,1]); // 1.0000
   network.activate([1,0]); // 0.7663
   network.activate([1,1]); // -0.008
}

execute();
```

Building neural networks

```javascript
let Network = require('@liquid-carrot/carrot').Network

let network = new Network([2, 2, 1]) // Builds a neural network with 5 neurons: 2 + 2 + 1
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

Building neurons

```javascript
let Node = require('@liquid-carrot/carrot').Node

let A = new Node() // neuron
let B = new Node() // neuron

A.connect(B)
A.activate(0.5)
console.log(B.activate())
```

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

## Backers
[![Carrot's Backers](https://img.shields.io/endpoint.svg?color=blue&label=patrons&logo=patrons&url=https%3A%2F%2Fshieldsio-patreon.herokuapp.com%2Fliquidcarrot)](https://www.patreon.com/liquidcarrot)

[![Become a Patron](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://www.patreon.com/liquidcarrot)

## Contributors
This project exists thanks to all the people who contribute. We can't do it without you! 🙇

* [Luis Carbonell](https://twitter.com/luis_carbnell)
* [Christian Echevarria](https://twitter.com/chrisgereina)

## Acknowledgements

A special thanks to [Neataptic](https://github.com/wagenaartje/neataptic/), [Synaptic](https://github.com/cazala/synaptic/), and [Brain.js](https://github.com/BrainJS/brain.js)!

Carrot™ was largely brought about by inspiration from these great libraries.
