const Bundler = require("parcel-bundler");
const server = require("live-server");
const shell = require("shelljs");
const chalk = require("chalk");
const path = require("path");

// Parcel
{
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
      watch: true,
      scopeHoist: true
    },
    src: {
      outFile: path.resolve(__dirname, "../dist/index.js"),
      watch: true,
      minify: false,
      scopeHoist: true,
      global: "neural"
    },
    dist: {
      outFile: path.resolve(__dirname, "../dist/index.min.js"),
      watch: true,
      scopeHoist: true,
      global: "neural"
    }
  };

  // Builds Test Suite
  bundle(entries.tests, options.tests, function() {
    shell.exec(`mocha ${path.resolve(__dirname, "../test/node.js")}`)
  });
  // Builds Production Code
  bundle(entries.src, options.dist, () => {});
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
  });
}

// Live Server
{
  const options = {
    // Browser-Side Tests
    tests: {
      root: path.resolve(__dirname, "../test"),
      watch: path.resolve(__dirname, "../test/browser.js")
    },
    // HTML Documention
    docs: {
      root: path.resolve(__dirname, "../docs"),
      watch: path.resolve(__dirname, "../docs")
    }
  }

  // Runs live HTTP server
  server.start(options.tests, {
    logLevel: 2
  });
  server.start(options.docs, {
    logLevel: 2
  });
}
