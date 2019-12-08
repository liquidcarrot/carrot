const Bundler = require("parcel-bundler");
const server = require("live-server");
const shell = require("shelljs");
const chalk = require("chalk");
const path = require("path");

// Parcel
{
  // Parcel bundler parameters
  const entry = path.resolve(__dirname, "../src/index.ts");
  const options = {
    outFile: path.resolve(__dirname, "../dist/index.js"),
    minify: false,
    watch: true,
    scopeHoist: true,
    global: "carrot"
  };
  // Bundles code into `dist/`
  const bundler = new Bundler(entry, options);
  const bundle = bundler.bundle();

  // Generates JSDoc from `dist/` into `docs/` & `DOCUMENTATION.md` using `config/jsdoc/build.docs.json`
  bundler.on("buildEnd", function() {
    // Generate HTML
    let start = Date.now();
    shell.exec("jsdoc -c config/jsdoc/build.docs.json");
    let end = Date.now();
    console.log(chalk.bold.green(`   HTML JSDoc generated in ${((end - start) / 1000).toFixed(2)}s`));

    // Generate Markdown
    start = Date.now();
    shell.exec("jsdoc2md dist/index.js > DOCUMENTATION.md");
    end = Date.now();
    console.log(chalk.bold.green(`   Markdown JSDoc generated in ${((end - start) / 1000).toFixed(2)}s`));
  });
}

// Live Server
{
  const options = {
    root: path.resolve(__dirname, "../docs"),
    watch: path.resolve(__dirname, "../docs")
  }

  // Runs live HTTP server
  server.start(options);
}
