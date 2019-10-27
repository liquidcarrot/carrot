/**
*
* @namespace
*
* @private
*
* @borrows ./node/testworker as workers.node.TestWorker
* @borrows ./browser/testworker as workers.browser.TestWorker
*/
const workers = {
  node: {
    TestWorker: require('./node/testworker'),
  },
  browser: {
    TestWorker: require('./browser/testworker'),
  },
};

module.exports = workers;
