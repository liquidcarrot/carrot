/**
* A string containing the runtime environment context e.g. "browser", "node", "common", _undefined_.
*
* @typedef {string} RuntimeContext
*
* @example
* const context = require("context");
*
* // Import Node.js exclusive modules
* if(context === "node") {
*   let os = require("os");
* }
*
* // Import Browser exclusive modules
* if(context === "browser") {
*   let Vue = require("vue")
* }
*
*/
const environment = typeof window === 'object' ? "browser" : (typeof module !== 'undefined' && module.exports) ? "node" : (typeof define !== 'undefined' && define.amd) ? "common" : undefined;

// CommonJS & AMD
if (typeof define !== 'undefined' && define.amd) define([], function () { return environment; });

// Node.js
if (typeof module !== 'undefined' && module.exports) module.exports = environment;

// Browser
if (typeof window === 'object') window['environment'] = environment;
