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
  Carrot is a flexible neural network AI Library for Node.js with neuro-evolution capabilities</h2>
</p>

For Documentation, visit [https://liquidcarrot.github.io/carrot](https://liquidcarrot.github.io/carrot)

## Getting Started

Making neurons

```javascript
let Node = require('@liquid-carrot/carrot').Node

let A = new Node() // neuron
let B = new Node() // neuron

A.connect(B)
A.activate(0.5)
console.log(B.activate())
```

Making neural networks

```javascript
let Network = require('@liquid-carrot/carrot').Network

let network = new Network([2, 2, 1]) // Builds a neural network with 5 neurons: 2 + 2 + 1
```

## Install

```bash
$ npm i @liquid-carrot/carrot
```

Carrot files are hosted by GitHub Pages, just copy this link into the `<head>` tag:

```html
<script src="https://liquidcarrot.io/carrot/cdn/0.1.74/carrot.js"></script>
```

## Contributing
[![Carrot's GitHub Issues](https://img.shields.io/github/issues/liquidcarrot/carrot.svg)](https://github.com/liquidcarrot/carrot/issues)

Carrot™ is a open source  project. We invite your participation through issues
and pull requests!

If you're new to the project, and feel free to open up a pull request to address one of the open issues. It would be super appreciated! 🤗

When adding or changing a service please add tests.

<details><summary><strong>Planned Features</strong></summary>

* [X] Architecture Support
    * [x] Neurons
        * [x] Tests
        * [x] Documentation
    * [x] Layers
        * [x] Tests
        * [x] Documentation
    * [x] Groups
      * [X] Tests
      * [X] Documentation
    * [X] Networks
        * [X] Tests
        * [X] Documentation
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
