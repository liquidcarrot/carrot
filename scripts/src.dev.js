const Bundler = require("parcel-bundler");
const Path = require("path");

// paths that are relative to the project's root directory
const entry = "./src/index.ts";

// parcel bundler options
// for more details, check Parcel Bundler's API Reference: https://parceljs.org/api.html
const options = {
  dev: {
    outFile: "./dist/index.js",
    minify: false,
    watch: true,
    scopeHoist: true,
    global: "neural"
  },
  dist: {
    outFile: "./dist/index.min.js",
    watch: true,
    scopeHoist: true,
    global: "neural"
  }
}

// Initializes a bundler using the entry and options provided
function bundle(entry, options) {
  const bundler = new Bundler(entry, options);
  const bundle = bundler.bundle();

  return bundler;
}

(async function() {
  // Bundle `dist/index.js`
  bundle(entry, options.dev);
  // Bundle `dist/index.min.js`
  bundle(entry, options.dist);
})();
