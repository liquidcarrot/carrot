const Bundler = require("parcel-bundler");
const path = require("path");

// Parcel bundler parameters
const entry = path.resolve(__dirname, "../test/node.js");
const options = {
  outDir: path.resolve(__dirname, "../test"),
  outFile: path.resolve(__dirname, "../test/browser.js"),
  scopeHoist: true
};

// Bundles tests and generates broser-side tests in `test/browser.js`
const bundler = new Bundler(entry, options);
const bundle = bundler.bundle();

bundler.on("buildEnd", function() {
  // Shut down threads
  process.exit();
});
