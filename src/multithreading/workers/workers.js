/**
* @module Carrot
*
* @todo Add `@borrows` tags.
* @todo Add `@prop` tags.
*/
var workers = {
  node: {
    TestWorker: require('./node/testworker')
  },
  browser: {
    TestWorker: require('./browser/testworker')
  }
};

module.exports = workers;
