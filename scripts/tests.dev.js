const Bundler = require("parcel-bundler");
const server = require("live-server");
const shell = require("shelljs");
const path = require("path");

// Parcel
{
  // Parcel bundler parameters
  const entry = path.resolve(__dirname, "../test/node.js");
  const options = {
    outDir: path.resolve(__dirname, "../test"),
    outFile: path.resolve(__dirname, "../test/browser.js"),
    minify: true,
    watch: true,
    scopeHoist: true
  };

  // Bundles tests and generates broser-side tests in `test/browser.js`
  const bundler = new Bundler(entry, options);
  const bundle = bundler.bundle();

  // Runs Node.js Mocha Tests
  bundler.on("buildEnd", function() {
    shell.exec(`mocha ${path.resolve(__dirname, "../test/node.js")}`)
  });
}

// Live Server
{
  const options = {
    root: path.resolve(__dirname, "../test"),
    watch: path.resolve(__dirname, "../test/browser.js")
  }

  // Runs live HTTP server & Browser-side tests
  server.start(options);
}
