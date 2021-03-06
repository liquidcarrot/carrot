const util = require('util');
const path = require('path');
const fs = require('fs')
const exec = util.promisify(require('child_process').exec);
const version = require('../package.json').version;

async function run(command, message) {
  console.log(message)

  // increase default stdout capacity
  const { stdout, stderr } = await exec(command, {maxBuffer: 1024 * 5000})

  if (stderr) {
    console.log(`stdout: ${stdout}`)
    console.log(`stderr: ${stderr}`)
    return false;
  }

  console.log('Done!')
  return true;
}

async function start() {
  // Stash previous changes
  await run(`> .temp && git add . && git stash`, "Storing any changes to restore later")

  // Generate stored doc files version
  await run(`./node_modules/.bin/jsdoc -c jsdoc.json -d ./theme/static/versions/${version}/`, `Building doc files into: ./theme/static/versions/${version}/ directory...`)

  // Update CDN version displayed in README
  // let readme = fs.readFileSync('./README.md', 'utf-8').replace(
  //   /cdn\/(.*)\/carrot.js/, `cdn/${version}/carrot.js`
  // );
  // fs.writeFileSync('./README.md', readme);

  // Commit stored doc files version
  await run(`git add . && git commit -am 'Update stored doc version ${version}'`, "Committing version to git")

  // Generate current docfiles
  await run(`./node_modules/.bin/jsdoc -c jsdoc.json -d .`, 'Building live docs files')

  // Push files into gh-pages (i.e. deploy the docs)
  await run(`git add . && git stash && git branch -D gh-pages && git checkout -b gh-pages && git merge --squash --strategy-option=theirs stash && git stash drop && git commit -m 'Auto-build ${version}' && git push origin gh-pages -f && git checkout -`, "Deploying docs")

  // Restore previous changes
  await run(`git stash pop && rm -f .temp && git add .temp`, "Restoring any of your changes")
}

start();
