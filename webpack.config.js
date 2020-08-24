"use strict";
const { CheckerPlugin } = require("awesome-typescript-loader");
let nodeEnv = {
  entry: "./index.ts",
  mode: "production",
  output: {
    filename: "carrot.node.js", // <-- Important
    library: "carrot",
    libraryTarget: "var",
  },
  target: "node", // <-- Important
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
};

let browserEnv = {
  entry: "./index.ts",
  mode: "production",
  output: {
    filename: "carrot.web.js", // <-- Important
    library: "carrot",
    libraryTarget: "var",
  },
  target: "web", // <-- Important
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
};

module.exports = [nodeEnv, browserEnv];
