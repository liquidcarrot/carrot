const Bundler = require('parcel-bundler');
const path = require('path');

// Parcel.js - Entry Point (i.e. file, directory, pattern)
const entry = path.resolve(__dirname, '../build/src/index.js');

// Parcel.js - Browser Production Options
const options = {
  outDir: path.resolve(__dirname, '../dist/production'),
  outFile: path.resolve(__dirname, '../dist/production/index.browser.min.js'),
  minify: true,
  target: 'browser',
  bundleNodeModules: true,
  global: 'carrot',
};

// Parcel.js - Bundle Source Code for Node
const bundler = new Bundler(entry, options);
bundler.bundle();

// Closes process when build ends
bundler.on('buildEnd', () => process.exit());
