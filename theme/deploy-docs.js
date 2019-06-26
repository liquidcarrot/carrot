const util = require('util');
const path = require('path');
const fs = require('fs')
const exec = util.promisify(require('child_process').exec);

const version = require('../package.json').version;

async function run(command, message) {
  console.log(message)
  
  const { stdout, stderr } = await exec(command)
  
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
  
  const versions = await fs.readdirSync(path.join(__dirname, '/static/versions/'))
  
  if(versions[Object.keys(versions).length-1] !== version) {
    console.log('Missing latest package version from stored doc versions')
    
    // Generate stored doc files version
    await run(`./node_modules/.bin/jsdoc -c jsdoc.json -d ./theme/static/versions/${version}/`, `Building doc files into: ./theme/static/versions/${version}/ directory...`)
    
    await run(`rm -rf theme/static/versions/${version}/cdn/`, "Cleaning up...")
    
    await run(`./node_modules/.bin/webpack`, "Generating latest CDN dist")
    
    await run(`git add . && git commit -am 'Update stored doc version ${version}'`, "Committing changes to git")
  }
  
  // Generate current docfiles
  await run(`./node_modules/.bin/jsdoc -c jsdoc.json -d .`, 'Building latest doc files')
  
  // Push files into gh-pages (i.e. deploy the docs)
  await exec("git add . && git stash && git branch -D gh-pages && git checkout -b gh-pages && git merge --squash --strategy-option=theirs stash && git stash drop && git commit -m 'Auto-build' && git push origin gh-pages -f && git checkout -", "Deploying docs")

  // Restore previous changes
  await run(`git stash pop && rm -f .temp && git add .temp`, "Restoring any of your changes")
}

start();
