let path = require('path');

module.exports = {
	entry: {
		carrot: './src/carrot.js'
		
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].dist.js' // Creates "carrot.dist.js"; Gets `name` from Object.keys(entry);
	},
  externals: [
    'child_process',
    'os'
  ],
}