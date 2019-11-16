// CHECK: https://tech.trivago.com/2015/12/17/export-multiple-javascript-module-formats/
// CHECK: https://github.com/vuejs/vue/blob/dev/package.json
const path = require("path");
const variants = require("parallel-webpack").createVariants;

function config(options) {
  return {
    "entry": "./src/index.js",
    "output": {
      "path": path.resolve(__dirname, "dist"),
      "filename": `neural.${options.target}${options.mode === "development" ? "" : ".min" }.js`,
      "library": "neural",
      "libraryTarget": options.target
    },
    "mode": options.mode
  }
}

module.exports = variants({
  // target: ["var", "assign", "this", "window", "self", "global", "commonjs", "commonjs2", "commonjs-module", "amd", "umd", "umd2", "jsonp"]
  target: ["window", "commonjs2", "amd", "umd2"],
  mode: ["development", "production"]
}, config);
