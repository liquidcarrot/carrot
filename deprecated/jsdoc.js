const path = require("path");
const nodemon = require("nodemon");

nodemon({
  script: path.resolve(__dirname, "../src", "sandbox", "index.js"),
  ignore: ["*.test.js", "*.benchmark.js"]
  // ext: "js"
});

nodemon.on("start", function() {
  console.log("Started script");
}).on('quit', function() {
  console.log('Done');
  process.exit();
}).on('restart' , function(files) {
  console.log(`Restarted script - ${files} changed`);
})
