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
function Connection(options) {
  this.id = "";
  this.from;
  this.to;
}

export { Connection as Connection };
