const Bundler = require("parcel-bundler");
const shell = require("shelljs");
const chalk = require("chalk");
const path = require("path");

const BUILDS  = 3; // Total Parcel.js builds before closing thread/process
let build = 0; // Current Parcel.js build

// Shuts down thread/process when all build finish
function bundleHandler() { if(++build === BUILDS) process.exit(); };
async function bundle(entry, options, callback) {
  const bundler = new Bundler(entry, options);
  const bundle = bundler.bundle();

  bundler.on("buildEnd", callback);
};

const entries = {
  src: path.resolve(__dirname, "../src/index.ts"),
  tests: path.resolve(__dirname, "../test/node.js")
};

const options = {
  tests: {
    outDir: path.resolve(__dirname, "../test"),
    outFile: path.resolve(__dirname, "../test/browser.js"),
    scopeHoist: true
  },
  src: {
    outFile: path.resolve(__dirname, "../dist/index.js"),
    minify: false,
    scopeHoist: true,
    global: "neural"
  },
  dist: {
    outFile: path.resolve(__dirname, "../dist/index.min.js"),
    scopeHoist: true,
    global: "neural"
  }
};

// Builds Test Suite
bundle(entries.tests, options.tests, bundleHandler);
// Builds Production Code
bundle(entries.src, options.dist, bundleHandler);
// Build Development Code and Documentation
bundle(entries.src, options.src, function() {
  // Generate HTML
  let start = Date.now();
  shell.exec("jsdoc -c config/jsdoc/build.docs.json");
  let end = Date.now();
  console.log(chalk.bold.green(`\u2728  HTML JSDoc generated in ${((end - start) / 1000).toFixed(2)}s`));

  // Generate Markdown
  start = Date.now();
  shell.exec("jsdoc2md dist/index.js > DOCUMENTATION.md");
  end = Date.now();
  console.log(chalk.bold.green(`\u2728  Markdown JSDoc generated in ${((end - start) / 1000).toFixed(2)}s`));

  bundleHandler();
});
