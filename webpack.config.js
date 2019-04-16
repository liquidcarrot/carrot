/* Import */
let fs = require('fs');
let path = require('path');
let webpack = require('webpack');
let CopyWebpackPlugin = require('copy-webpack-plugin');

/* Update readme and read license */
let version = require('./package.json').version;
let readme = fs.readFileSync('./README.md', 'utf-8').replace(
  /cdn\/(.*)\/carrot.js/, `cdn/${version}/carrot.js`
);
fs.writeFileSync('./README.md', readme);

let license = fs.readFileSync('./LICENSE', 'utf-8');

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