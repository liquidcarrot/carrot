// CHECK: https://tech.trivago.com/2015/12/17/export-multiple-javascript-module-formats/
// CHECK: https://github.com/vuejs/vue/blob/dev/package.json

/* Import */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const variants = require("parallel-webpack").createVariants;

/* Read license */
const license = fs.readFileSync('./LICENSE', 'utf-8');

function config(options) {
  return {
    "entry": "./src/carrot.js",
    "output": {
      "path": path.resolve(__dirname, "dist"),
      "filename": `carrot.${options.target}${options.mode === "development" ? "" : ".min"}.js`,
      "library": "Carrot",
      "libraryTarget": options.target,
			"plugins": [new webpack.BannerPlugin(license)],
    },
  }
}

/* Export config */
module.exports = variants({
  target: ["window", "commonjs2", "amd", "umd2"],
	mode: ["development", "production"]
}, config);
