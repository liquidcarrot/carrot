/* Import */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/* Read license */
const license = fs.readFileSync('./LICENSE', 'utf-8');

/* Export config */
module.exports = {
	mode: "production",
  context: __dirname,
  entry: {
    'dist/carrot': './src/carrot.js',
    [`./theme/static/cdn/${version}/carrot`]: './src/carrot.js'
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules')
    ]
  },
	output: {
		path: __dirname,
		filename: '[name].js',
		library: 'carrot',
		libraryTarget: 'umd'
	},
	plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.BannerPlugin(license),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CopyWebpackPlugin([
      { from: 'src/multithreading/workers/node/worker.js', to: 'dist' }
    ])
  ],
  externals: [
    'child_process',
    'os'
  ],
  node: {
    __dirname: false
  }
}
