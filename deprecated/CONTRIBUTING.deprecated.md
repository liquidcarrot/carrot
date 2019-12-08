# Contributing to Liquid Carrot
>Help write great code with nerds, for nerds!

## File Structure

```
.__ assets/
|__ benchmarks/
|__ config/
|__ deprecated/
|__ dist/
|__ docs/
|__ sandbox/
|__ scripts/
|__ src/
|__ test/
```

**`assets/`:** holds common images (e.g. logo) and videos (e.g. demo) used throughout the repo.

**`benchmarks/`:** holds all benchmark scripts and benchmarks for source code.

**`config/`:** holds configuration files for different DevOps tools (e.g. JSDoc).

**`deprecated/`:** holds all unmaintained, unused, or outdated.

**`dist/`:** holds compiled distribution & production version of the code base.

**`docs/`:** holds all the generated HTML documentation for the in-line JSDoc in the source code.

**`sandbox`:** holds a blank `index.js` file for quick prototyping of ideas.

**`scripts/`:** holds DevOps scripts (e.g. build, test, etc.) used to create and maintain the repo.

**`src/`:** holds all the source code.

**`test/`:** holds all the unit & integration tests for the repo.

**`util/`:** holds all the ancillary non-vendor modules (i.e. not `node_modules`; custom built) and scripts used to create the repo.

## Building

Code is bundled using [`parcel`](parceljs.org); bundling scripts are stored in the `scripts/` directory as `(build|dev).js`, `src.(build|dev).js`, `tests.(build|dev).js`, and `docs.(build|dev).js`.

### File Sub-Structure `scripts/`

```
.__ (build|dev).js
|__ docs.(build|dev).js
|__ src.(build|dev).js
|__ tests.(build|dev).js
```

### Running Builds Scripts

**Bundle Source Code**

```
npm run build:src
```

Runs `scripts/src.build.js` and creates/updates four files in `dist/`:
* `dist/index.js`: _compiled for Node.js development_
* `dist/index.min.js`: _compiled for Node.js production_
* `dist/index.browser.js`: _compiled for Browser development_
* `dist/index.browser.min.js`: _compiled for Browser production_


**Build Test Suite**

```
npm run build:tests
```

Runs `scripts/tests.build.js` and bundles all Mocha & Chai unit/integration tests into `test/browser.js` for browser-side unit/integration testing with Mocha.


**Generating Documentation**

```
npm run build:docs
```

Runs `scripts/docs.build.js` and generates publicly available documentation as HTML files in the `docs/` and Markdown in `DOCUMENTATION.md` using [`jsdoc`](https://www.npmjs.com/package/jsdoc) and [`jsdoc2md`](https://www.npmjs.com/package/jsdoc-to-markdown), respectively.

### Running Dev Scripts

All dev scripts operate as "live" (i.e. hot-reloading) versions of build scripts

**Source Code**

```
npm run dev:src
```

**Test Suite**

```
npm run dev:tests
```

**Documentation**

```
npm run dev:docs
```

___


* We often use a lot of branches to implement new research and prototype new architecture ideas - feel free to fork and do the same. If you find anything you feel will contribute value to the library, feel free to pull request it and ask for review - or direct inclusion into the framework.

* Do not be afraid to contribute to "non-code" related things - like this document or others like it. We are trying to build a great tool we can all enjoy using in the community - that takes a team and a lot of organization, tooling, documents, and love.

___

## Table of Contents

* [Tools to Learn](#tools-to-learn)
* [Concepts](#concepts)
  * [Documenting](#documenting)
  * [Configuration Files](#configuration-files)
* [Developing](#developing)
    - [Full Development](#full-development--used-for-large-contributions----arrow-up-small----devolping----arrow-double-up----contributing-to-liquid-carrot-)
    - [Core Development](#core-development--used-for--only--source-code-contributions----arrow-up-small----devolping----arrow-double-up----contributing-to-liquid-carrot-)
    - [Documentation Development](#documentation-development--used-for-documentation-improvements---contributions----arrow-up-small----devolping----arrow-double-up----contributing-to-liquid-carrot-)
    - [Test Suite Development](#test-suite-development--used-for-test-suite---coverage--improvements---contributions----arrow-up-small----devolping----arrow-double-up----contributing-to-liquid-carrot-)
    - [Demo/Example Development](#demo-example-development--used-for-creating-or-improving-examples-demos----arrow-up-small----devolping----arrow-double-up----contributing-to-liquid-carrot-)

____

## Tools to Learn

* **TypeScript:** Superset language that compiles to JavaScript - _used for avoiding idiosyncratic headaches associated with JavaScript_
    * [TypeScript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
    * [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html)
    * [JavaScript --> TypeScript](https://github.com/Microsoft/TypeScript-React-Conversion-Guide#typescript-react-conversion-guide)
* **JSDoc:** Creating documentation from inline JavaScript comments
* **Parcel:** Zero-configuration code bundler - _i.e. Webpack, but better._
    * [Getting Started](https://parceljs.org/getting_started.html)
* **Shell.js:** Running shell scripts in Node
    * [Shell.js README](https://github.com/shelljs/shelljs)
* **Live Server:** Hot reloading HTTP server

## Concepts

### Documenting

We use "in-code" multi-line comments to automatically generate our documentation using vanilla JSDoc standards.

We use `jsdoc` CLI script and `jsdoc2md` CLI script to generate and export our code documentation to HTML and Markdown, respectively.

Our documentation helps us and other users & contributors move through the code base faster and build cooler things faster.

Our generated HTML code is exported to our `docs/` directory and hosted by GitHub Pages at https://liquidcarrot.io/neural.

Our Markdown documentation is hosted in our GitHub Repo on `DOCUMENTATION.md` - this is mostly used as a quick reference and backup - honestly most of the great documentation features can be found in the HTMl version.

Our HTML version has built-in examples that can be copied directly from the browser (Thank you to Clipboard.js); it's searchable; and a bunch of other goodies.

### Configuration Files
Most development configuration files should be stored in `config` - usually separated by tool or vendor (e.g. `typescript`, `webpack`, `nodemon`, etc.)

**File Sub-Structure**

```
...
.__ config/
|  |__ nodemon/
|  |  |__ documentation.json
|  |  |__ tests.json
|  |  |__ benchmark.js
|  |__ typescript/
|  |  |__ tfconf.json
|  |  |__ ...
|  |__ ...
|__ ...
...
```

### Developing [:arrow_double_up:](#contributing-to-liquid-carrot)

Contributing to Liquid Carrot should be as simple as running a few scripts.

Below are a few human friendly scripts to help anyone begin to contribute code to Liquid Carrot.

Each of these scripts launch a few developer friendly tools that can help augment the coding process (i.e. hot-reloaded test suites, hot-reloaded benchmarks, etc.); if you would like to see any additions to the suite, add it and document it below, or [open up an issue](https://github.com/liquidcarrot/carrot/issues/new/choose) and  let someone else in the community knock it out.


#### Full Development (Used for Large Contributions) [:arrow_up_small:](#devolping) [:arrow_double_up:](#contributing-to-liquid-carrot)

Safely write code with a bird's-eye view of what every new line of code contributes to the repository.

_P.S. The multiple running processes can slow down older computers or virtual machines (VM)_  

```bash
npm run dev
```

Effect:
* Opens a hot-reloading local browser tab of Liquid Carrot Documentation.
* Runs a hot-reloading local `DOCUMENTATION.md` generator `nodemon daemon`
* Opens a hot-reloading local browser tab running Liquid Carrot's Full Test Suite
* Runs a hot-reloading local `nodemon daemon` running Liquid Carrot's Full Test Suite in Node.js using `Mocha.js`
* It will open a browser tab where we can explore/navigate through all of the examples in our `examples/` directory

#### Core Development (Used for "ONLY" Source Code Contributions) [:arrow_up_small:](#devolping) [:arrow_double_up:](#contributing-to-liquid-carrot)

Useful for _fast_ "Wild-Wild-West" Coding.

_P.S. This is "fastest" mode: your computer or VM should not experience any significant slow-downs. There are no training wheels or guard rails in this mode, be sure of what you write before you commit or push - or try switching to **"Full Development"** mode before pushing upstream_

```bash
npm run dev:src
```

Effect:
* _No tests_
* _No documentation_
* _No examples_

#### Documentation Development (Used for Documentation Improvements & Contributions) [:arrow_up_small:](#devolping) [:arrow_double_up:](#contributing-to-liquid-carrot)

Easiest way to help improve Liquid Carrot's documentation: see live changes of HTML and Markdown rendered from in-line comments as you edit them.

Liquid Carrot uses JSDoc in-line comments to generate documentation.

_P.S. You are a beautiful creature for even reading this...`documentation = love`._

```bash
npm run dev:docs
```

Effect:
* Opens a hot-reloading local browser tab of Liquid Carrot Documentation.
* Runs a hot-reloading local `DOCUMENTATION.md` generator `nodemon daemon`
* _No tests_
* _No examples_

#### Test Suite Development (Used for Test Suite & Coverage, Improvements & Contributions) [:arrow_up_small:](#devolping) [:arrow_double_up:](#contributing-to-liquid-carrot)

This script helps ensure new code doesn't break existing functionality on any compile target (i.e. Node.js & Browser).

```bash
npm run dev:tests
```

Effect:
* Opens a hot-reloading local browser tab running Liquid Carrot's Full Test Suite
* Runs a hot-reloading local `nodemon daemon` running Liquid Carrot's Full Test Suite in Node.js using `Mocha.js`
* _No documentation_
* _No examples_

#### Demo/Example Development (Used for Creating or Improving Examples/Demos) [:arrow_up_small:](#devolping) [:arrow_double_up:](#contributing-to-liquid-carrot)

API Design and demo development are very complementary tasks; this script helps Liquid Carrot Contributors quickly change Liquid Carrot source code to help create or improve demos without the need to version, publish, import, and recompile.

_P.S. We LOVE demos! If you have any demo ideas, pull requests are totally welcome! If you would love to see it built and need a little help, [let us know](https://github.com/liquidcarrot/carrot/issues/new/choose)._

```bash
npm run dev:demos
```

Effect:
* It will open a browser tab where we can explore/navigate through all of the examples in our `examples/` directory
* _No documentation_
* _No tests_


## Building/Compiling

Most of these build scripts happen behind the scenes while running most of the `dev[:TARGET]` commands and should rarely have to be used individually.

### Generating Documentation

Documentation gets generated into two compile targets (HTML & Markdown) from in-line JSDoc.

**Generating HTML & Markdown**

Generates HTML files in `docs/` repository and Markdown in `DOCUMENTATION.md`.

```bash
npm run build:docs
```

**Generating HTML**

Generated files get placed in the `docs/` repository.

```bash
npm run build:docs:html
```

**Generating Markdown**

Generated Markdown gets placed in `DOCUMENTATION.md`.

_P.S. Script will replace (not append) content to `DOCUMENTATION.md`_

```bash
npm run build:docs:markdown
```
### Building Test Suite
