# Contributing to Liquid Carrot
>Help write great code with nerds, for nerds!

## Table of Contents

* [Required Tools & Packages](#required-tools---packages)
* [File Structure](#file-structure)
* [Installing](#installing)
* [Bundling & Development](#building)
  + [File Sub-Structure `scripts/`](#file-sub-structure--scripts--)
  + [Running Builds Scripts](#running-builds-scripts)
  + [Running Dev Scripts](#running-dev-scripts)

## Required Tools & Packages

* **TypeScript:** Superset language that compiles to JavaScript - _used for avoiding idiosyncratic headaches associated with JavaScript_
    * [TypeScript in 5 minutes](https://www.typescriptlang.org/docs/handbook/
    * typescript-in-5-minutes.html)
    * [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html)
    * [JavaScript --> TypeScript](https://github.com/Microsoft/TypeScript-React-Conversion-Guide#typescript-react-conversion-guide)
* **JSDoc:** Creating documentation from inline JavaScript comments
* **Parcel:** Zero-configuration code bundler - _i.e. Webpack, but better._
    * [Getting Started](https://parceljs.org/getting_started.html)
* **Shell.js:** Running shell scripts in Node
    * [Shell.js README](https://github.com/shelljs/shelljs)
* **Live Server:** Hot reloading HTTP server

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

## Installing

```
git clone git@github.com:liquidcarrot/carrot.git
cd carrot
npm i
```

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
