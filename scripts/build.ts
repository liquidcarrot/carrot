import * as path from 'path';
import ParcelBundler = require('parcel-bundler');

// tslint:disable-next-line:completed-docs
async function runBuild(options: ParcelBundler.ParcelOptions): Promise<void> {
  const entry: string = path.resolve(__dirname, '../build/scripts/index.js');
  await new ParcelBundler(entry, options).bundle();
}

const browserProduction: ParcelBundler.ParcelOptions = {
  outDir: path.resolve(__dirname, '../dist'),
  outFile: path.resolve(__dirname, '../dist/index.browser.min.js'),
  minify: true,
  watch: false,
  target: 'browser',
  bundleNodeModules: true,
  global: 'carrot',
};
const nodeProduction: ParcelBundler.ParcelOptions = {
  outDir: path.resolve(__dirname, '../dist'),
  outFile: path.resolve(__dirname, '../dist/index.min.js'),
  minify: true,
  watch: false,
  target: 'node',
  global: 'carrot',
};
const build: () => Promise<void> = async function () {
  await Promise.all([runBuild(browserProduction), runBuild(nodeProduction)]);
};
build();
