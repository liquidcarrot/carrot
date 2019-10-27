// CHECK: https://tech.trivago.com/2015/12/17/export-multiple-javascript-module-formats/
// CHECK: https://github.com/vuejs/vue/blob/dev/package.json

/* Import */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const variants = require('parallel-webpack').createVariants;
const CopyWebpackPlugin = require('copy-webpack-plugin');

/* Read license */
const license = fs.readFileSync('./LICENSE', 'utf-8');

// basically a copy of Webpack 4 production defaults, minus anything that interferes with an unminified build
function config(options) {
  return {
    'entry': './src/carrot.js',
    'performance': {
      'hints': 'warning',
    },
    'output': {
      'pathinfo': false,
      'path': path.resolve(__dirname, 'dist'),
      'filename': `carrot.${options.target}${options.mode === 'development' ? '' : '.min'}.js`,
      'library': 'Carrot',
      'libraryTarget': options.target,
    },
    'plugins': [
      new webpack.BannerPlugin(license),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new CopyWebpackPlugin([{from: 'src/multithreading/workers/node/worker.js', to: '.'}]),
    ],
    'optimization': {
      'namedModules': false,
      'namedChunks': false,
      'flagIncludedChunks': true,
      'occurrenceOrder': true,
      'sideEffects': true,
      'usedExports': true,
      'concatenateModules': true,
      'splitChunks': {
        'hidePathInfo': true,
        'minSize': 30000,
        'maxAsyncRequests': 5,
        'maxInitialRequests': 3,
      },
      'noEmitOnErrors': true,
      'checkWasmTypes': true,
      'minimize': (options.mode === 'development') ? false : true,
    },
    'mode': 'none', // avoid development / production defaults
  };
}

/* Export config */
module.exports = variants({
  target: ['window', 'commonjs2', 'amd', 'umd2'],
  mode: ['development', 'production'],
}, config);
