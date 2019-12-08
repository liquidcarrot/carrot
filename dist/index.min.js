(function () {
// ASSET: index.ts
var $QCba$exports = {};

/**
* Creates a connection object
*
* @constructs Connection
*
* @prop {string|number} id
* @prop {string|number} from
* @prop {string|number} to
*
* @param {Object} [options] options
* @param {Function|string|number} [options.id]
* @param {string|number} [options.from]
* @param {string|number} [options.to]
*
* @fires created
*
* @returns {Connection} Returns `Connection`
*
* @example
* let connection = new Connection();
*
* @example
* let connection = new Connection({
*  from: 0,
*  to: 1
* });
*/
function $gkQH$export$Connection(options) {
  this.id = "";
}

$QCba$exports.Connection = $gkQH$export$Connection;

if (typeof exports === "object" && typeof module !== "undefined") {
  // CommonJS
  module.exports = $QCba$exports;
} else if (typeof define === "function" && define.amd) {
  // RequireJS
  define(function () {
    return $QCba$exports;
  });
} else {
  // <script>
  this["neural"] = $QCba$exports;
}
})();