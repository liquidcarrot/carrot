# Carrot™
>A Simple Node.js AI Library for Neural Network

[![Build Status via Travis CI](https://travis-ci.org/liquidcarrot/carrot.svg?branch=master)](https://travis-ci.org/liquidcarrot/carrot)
[![Carrot's Weekly Download](https://img.shields.io/npm/dm/@liquid-carrot/carrot.svg)](https://www.npmjs.com/package/@liquid-carrot/carrot)
[![Coverage Status](https://coveralls.io/repos/github/liquidcarrot/carrot/badge.svg?branch=master)](https://coveralls.io/github/liquidcarrot/carrot?branch=master)
[![Join the chat at https://gitter.im/carrot-ai/community](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/carrot-ai/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badgee&utm_content=badge)
[![Carrot's License](https://img.shields.io/badge/License-MIT-blue.svg)](/LICENSE)
[![Carrot's Love](https://img.shields.io/badge/Made%20with%20%E2%99%A5%20by-Liquid%20Carrot-ff1414.svg)](https://github.com/liquidcarrot/carrot/issues)


<details>
  <summary><strong>Table of Contents</strong></summary>
  
  * [Contributing](#contributing)
  * [Support](#support)
  * [Contributors](#contributors)
  * [Documentation](/DOCUMENTATION.md)
</details>

## Getting Started

### Installing

```bash
$ npm i @liquid-carrot/carrot
```

### Introduction

Making your first neuron.

```javascript
let Neuron = require('@liquid-carrot/carrot').Neuron

let neuron = new Neuron()
```

Making your first neural network.

```javascript
let Network = require('@liquid-carrot/carrot').Network

let network = new Network([2, 2, 1]) // Builds a neural network with 5 neurons: 2 + 2 + 1
```

## Built With

* [Lodash](https://lodash.com/) - A JavaScript utility library

## Contributing
[![Carrot's GitHub Issues](https://img.shields.io/github/issues/liquidcarrot/carrot.svg)](https://github.com/liquidcarrot/carrot/issues)

Carrot™ is a open source  project. We invite your participation through issues
and pull requests!

If you're new to the project, and feel free to open up a pull request to address one of the open issues. It would be super appreciated! 🤗

When adding or changing a service please add tests.

<details>
  <summary><strong>TODO</strong></summary>
  
  * [ ] Architecture Support
      * [x] Neurons
          * [x] Tests
          * [x] Documentation
      * [x] Layers
          * [x] Tests
          * [x] Documentation
      * [ ] Networks
          * [ ] Tests
          * [ ] Documentation
  * [ ] Performance Echancements
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

## Support
[![Carrot's Patrons](https://img.shields.io/badge/Patrons-0-yellow.svg)](https://github.com/liquidcarrot/carrot/issues)

[![Become a Patron](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://www.patreon.com/liquidcarrot)

## Contributors
This project exists thanks to all the people who contribute. We can't do it without you! 🙇

* [Luis Carbonell](https://twitter.com/luis_carbnell)
* [Christian Echevarria](https://twitter.com/chrisgereina)

## Acknowledgements

A special thanks to [Neataptic](https://github.com/wagenaartje/neataptic/), [Synaptic](https://github.com/cazala/synaptic/), and [Brain.js](https://github.com/BrainJS/brain.js)! 

Carrot™ was largely brought about by inspiration from these great libraries.
