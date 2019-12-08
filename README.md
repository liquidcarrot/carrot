# Liquid Carrot
>Building the best JavaScript Deep Learning Framework

| [Documentation](DOCUMENTATION.md) | [Contributing](CONTRIBUTING.md) | [Community Guidelines](CODE_OF_CONDUCT.md) | [Sponsoring](SPONSORING.md) | [Bibliography](BIBLIOGRAPHY.md) |
| --- | --- | --- | --- | --- |

# TODO

* [ ] Create EventEmitter-augmented class generator utility (i.e. a script that create `.ts` files in `src/` with a class that extends `EventEmitter`)
* [ ] Create a standard life-cycle hook for clases
* [ ] Study Observables & the PubSub architecture
* [ ] Get a dashboard template off of ThemeForest and use it to create a benchmark and test reporter for benchmark.js and Mocha; checkout Mocha Awesome Reporter for inspiration on creating reporters
* [ ] Use [Chart.js](https://www.chartjs.org/samples/latest/charts/area/line-datasets.html) to show historical benchmarking performance:
* [ ] Add a "Why TypeScript?" & "How to TypeScript?" section
* [ ] Use `babel-online-macro` trans pilers to have semantic loops compiled into performant loops.
* [ ] Look into [threading `for` loops](https://www.npmjs.com/package/for-more).
* [ ] Look into threading in Node and Browser - _great tools/dependencies [hamster.js](https://www.npmjs.com/package/hamsters.js), [parallel.js](https://parallel.js.org/), [here](https://github.com/lukeschaefer/WorkerB/blob/master/WorkerB.js), [here](https://www.npmjs.com/package/threads), [here](https://github.com/josdejong/workerpool), [here](https://www.npmjs.com/package/worker-farm), [here](https://www.npmjs.com/package/worker), [here](https://www.npmjs.com/package/multithreading-toolkit), [here](https://www.npmjs.com/package/parallel-function)_
* [ ] Review [`awesome-deep-learning`](https://github.com/ChristosChristofidis/awesome-deep-learning)
* [ ] Review [`awesome-deep-learning-papers`](https://github.com/terryum/awesome-deep-learning-papers)
* [ ] Review [`awesome-deep-learning-resources`](https://github.com/guillaume-chevalier/awesome-deep-learning-resources)
* [ ] Review [`awesome-deep-rl`](https://github.com/tigerneil/awesome-deep-rl)
* [ ] Review [`awesome-deep-vision`](https://github.com/kjw0612/awesome-deep-vision)
* [ ] Review [XState.js](https://xstate.js.org/docs/) - _Recommended by Gavin Ray97_
* [x] Create a second local repo of carrot where I port these changes in this branch to the main/master branch.
* [x] Add live TypeScript JSDoc to Markdown build & development support
* [x] Use [`ts-mocha`](https://www.npmjs.com/package/ts-mocha) for running hot-reloading TypeScript tests - instead of the current pre-compiled JavaScript. - _solved (made obsolete) with `parcel-bundler`_
* [x] Add live markdown editor - _Atom & VScode have live preview plugins_
* [x] Change HTML Documentation hot-reloading to an event driven architecture and away from the hard coded time (5 second) delay in `npm run serve:docs` - _**SOLVED W/ PARCEL**_
* [x] Try `parcel` - _instead of `webpack`_ - _**SWITCHED TO `PARCEL`**_
* [x] Run test suite after `webpack` packages `src` code - _i.e. use a webpack compiler hook to trigger the tests_ - _**SOLVED W/ PARCEL**_

### TODO NPM Scripts

* [x] `build`
* [x] `build:docs`
* [x] `build:tests`
* [x] `build:src`
* [ ] `build:bench`
* [ ] `build:demos`
* [x] `dev`
* [x] `dev:docs`
* [x] `dev:tests`
* [x] `dev:src`
* [ ] `dev:bench`
* [ ] `dev:demos`

# FAQ

* **How can I help support Liquid Carrot?**
    * Star this repository
    * [Become a contributor](CONTRIBUTING.md)
    * [Sponsor us](SPONSORING.md)

# Bibliography

* [Live Reloading & Pre/Post Scripts w/ `nodemon`](https://medium.com/netscape/nodemon-events-run-tasks-at-server-start-restart-crash-exit-93a34c54dfd8)
