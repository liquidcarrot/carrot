module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/eventemitter3/index.js":
/*!**********************************************!*\
  !*** ../node_modules/eventemitter3/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar has = Object.prototype.hasOwnProperty\n  , prefix = '~';\n\n/**\n * Constructor to create a storage for our `EE` objects.\n * An `Events` instance is a plain object whose properties are event names.\n *\n * @constructor\n * @private\n */\nfunction Events() {}\n\n//\n// We try to not inherit from `Object.prototype`. In some engines creating an\n// instance in this way is faster than calling `Object.create(null)` directly.\n// If `Object.create(null)` is not supported we prefix the event names with a\n// character to make sure that the built-in object properties are not\n// overridden or used as an attack vector.\n//\nif (Object.create) {\n  Events.prototype = Object.create(null);\n\n  //\n  // This hack is needed because the `__proto__` property is still inherited in\n  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.\n  //\n  if (!new Events().__proto__) prefix = false;\n}\n\n/**\n * Representation of a single event listener.\n *\n * @param {Function} fn The listener function.\n * @param {*} context The context to invoke the listener with.\n * @param {Boolean} [once=false] Specify if the listener is a one-time listener.\n * @constructor\n * @private\n */\nfunction EE(fn, context, once) {\n  this.fn = fn;\n  this.context = context;\n  this.once = once || false;\n}\n\n/**\n * Add a listener for a given event.\n *\n * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn The listener function.\n * @param {*} context The context to invoke the listener with.\n * @param {Boolean} once Specify if the listener is a one-time listener.\n * @returns {EventEmitter}\n * @private\n */\nfunction addListener(emitter, event, fn, context, once) {\n  if (typeof fn !== 'function') {\n    throw new TypeError('The listener must be a function');\n  }\n\n  var listener = new EE(fn, context || emitter, once)\n    , evt = prefix ? prefix + event : event;\n\n  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;\n  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);\n  else emitter._events[evt] = [emitter._events[evt], listener];\n\n  return emitter;\n}\n\n/**\n * Clear event by name.\n *\n * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.\n * @param {(String|Symbol)} evt The Event name.\n * @private\n */\nfunction clearEvent(emitter, evt) {\n  if (--emitter._eventsCount === 0) emitter._events = new Events();\n  else delete emitter._events[evt];\n}\n\n/**\n * Minimal `EventEmitter` interface that is molded against the Node.js\n * `EventEmitter` interface.\n *\n * @constructor\n * @public\n */\nfunction EventEmitter() {\n  this._events = new Events();\n  this._eventsCount = 0;\n}\n\n/**\n * Return an array listing the events for which the emitter has registered\n * listeners.\n *\n * @returns {Array}\n * @public\n */\nEventEmitter.prototype.eventNames = function eventNames() {\n  var names = []\n    , events\n    , name;\n\n  if (this._eventsCount === 0) return names;\n\n  for (name in (events = this._events)) {\n    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);\n  }\n\n  if (Object.getOwnPropertySymbols) {\n    return names.concat(Object.getOwnPropertySymbols(events));\n  }\n\n  return names;\n};\n\n/**\n * Return the listeners registered for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @returns {Array} The registered listeners.\n * @public\n */\nEventEmitter.prototype.listeners = function listeners(event) {\n  var evt = prefix ? prefix + event : event\n    , handlers = this._events[evt];\n\n  if (!handlers) return [];\n  if (handlers.fn) return [handlers.fn];\n\n  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {\n    ee[i] = handlers[i].fn;\n  }\n\n  return ee;\n};\n\n/**\n * Return the number of listeners listening to a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @returns {Number} The number of listeners.\n * @public\n */\nEventEmitter.prototype.listenerCount = function listenerCount(event) {\n  var evt = prefix ? prefix + event : event\n    , listeners = this._events[evt];\n\n  if (!listeners) return 0;\n  if (listeners.fn) return 1;\n  return listeners.length;\n};\n\n/**\n * Calls each of the listeners registered for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @returns {Boolean} `true` if the event had listeners, else `false`.\n * @public\n */\nEventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {\n  var evt = prefix ? prefix + event : event;\n\n  if (!this._events[evt]) return false;\n\n  var listeners = this._events[evt]\n    , len = arguments.length\n    , args\n    , i;\n\n  if (listeners.fn) {\n    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);\n\n    switch (len) {\n      case 1: return listeners.fn.call(listeners.context), true;\n      case 2: return listeners.fn.call(listeners.context, a1), true;\n      case 3: return listeners.fn.call(listeners.context, a1, a2), true;\n      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;\n      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;\n      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;\n    }\n\n    for (i = 1, args = new Array(len -1); i < len; i++) {\n      args[i - 1] = arguments[i];\n    }\n\n    listeners.fn.apply(listeners.context, args);\n  } else {\n    var length = listeners.length\n      , j;\n\n    for (i = 0; i < length; i++) {\n      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);\n\n      switch (len) {\n        case 1: listeners[i].fn.call(listeners[i].context); break;\n        case 2: listeners[i].fn.call(listeners[i].context, a1); break;\n        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;\n        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;\n        default:\n          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {\n            args[j - 1] = arguments[j];\n          }\n\n          listeners[i].fn.apply(listeners[i].context, args);\n      }\n    }\n  }\n\n  return true;\n};\n\n/**\n * Add a listener for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn The listener function.\n * @param {*} [context=this] The context to invoke the listener with.\n * @returns {EventEmitter} `this`.\n * @public\n */\nEventEmitter.prototype.on = function on(event, fn, context) {\n  return addListener(this, event, fn, context, false);\n};\n\n/**\n * Add a one-time listener for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn The listener function.\n * @param {*} [context=this] The context to invoke the listener with.\n * @returns {EventEmitter} `this`.\n * @public\n */\nEventEmitter.prototype.once = function once(event, fn, context) {\n  return addListener(this, event, fn, context, true);\n};\n\n/**\n * Remove the listeners of a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn Only remove the listeners that match this function.\n * @param {*} context Only remove the listeners that have this context.\n * @param {Boolean} once Only remove one-time listeners.\n * @returns {EventEmitter} `this`.\n * @public\n */\nEventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {\n  var evt = prefix ? prefix + event : event;\n\n  if (!this._events[evt]) return this;\n  if (!fn) {\n    clearEvent(this, evt);\n    return this;\n  }\n\n  var listeners = this._events[evt];\n\n  if (listeners.fn) {\n    if (\n      listeners.fn === fn &&\n      (!once || listeners.once) &&\n      (!context || listeners.context === context)\n    ) {\n      clearEvent(this, evt);\n    }\n  } else {\n    for (var i = 0, events = [], length = listeners.length; i < length; i++) {\n      if (\n        listeners[i].fn !== fn ||\n        (once && !listeners[i].once) ||\n        (context && listeners[i].context !== context)\n      ) {\n        events.push(listeners[i]);\n      }\n    }\n\n    //\n    // Reset the array, or remove it completely if we have no more listeners.\n    //\n    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;\n    else clearEvent(this, evt);\n  }\n\n  return this;\n};\n\n/**\n * Remove all listeners, or those of the specified event.\n *\n * @param {(String|Symbol)} [event] The event name.\n * @returns {EventEmitter} `this`.\n * @public\n */\nEventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {\n  var evt;\n\n  if (event) {\n    evt = prefix ? prefix + event : event;\n    if (this._events[evt]) clearEvent(this, evt);\n  } else {\n    this._events = new Events();\n    this._eventsCount = 0;\n  }\n\n  return this;\n};\n\n//\n// Alias methods names because people roll like that.\n//\nEventEmitter.prototype.off = EventEmitter.prototype.removeListener;\nEventEmitter.prototype.addListener = EventEmitter.prototype.on;\n\n//\n// Expose the prefix.\n//\nEventEmitter.prefixed = prefix;\n\n//\n// Allow `EventEmitter` to be imported as module namespace.\n//\nEventEmitter.EventEmitter = EventEmitter;\n\n//\n// Expose the module.\n//\nif (true) {\n  module.exports = EventEmitter;\n}\n\n\n//# sourceURL=webpack://neural/../node_modules/eventemitter3/index.js?");

/***/ }),

/***/ "./src/_.js":
/*!******************!*\
  !*** ./src/_.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let _ = function() {};\n\n/**\n* Mixes a shallow object into a source object(s) or function(s)\n*\n* @param {Object[]|Object|Function[]|Function} objects\n* @param {Object} source\n* @param {Object} [options]\n* @param {boolean} [options.overwrite=false] - iff `options.overwrite ==== true`, overwrites values of existing keys in `objects` with values of keys in `source`\n* @param {boolean} [options.prototype=false] - iff `options.prototype === true` and `typeof objects[object] === \"function\"`, values in `source` will be added to `objects[object]`'s prototype chain (i.e. instance variable/function)\n*\n* @example\n* let Person = function(name) { this.name = name; }\n*\n* _.mixin(Person, {\n*   greet: function greet() {\n*     console.log(`Hello, my name is ${this.name}!`);\n*   }\n* }, { prototype: true });\n*\n* let john = new Person(\"John\");\n*\n* john.greet(); // >Hello, my name is John!\n*\n* @example\n* let people = [{\n*   name: \"John Doe\",\n*   email: \"john.doe@protonmail.com\"\n* }, {\n*   name: \"Jane Doe\",\n*   email: \"jane.doe@protonmail.com\"\n* }];\n*\n* _.mixin(people, { age: 25 });\n*\n* console.log(people);\n* // [\n* //   { name: 'John Doe', email: 'john.doe@protonmail.com', age: 25 },\n* //   { name: 'Jane Doe', email: 'jane.doe@protonmail.com', age: 25 }\n* // ]\n*\n* @example\n* let person = {\n*   name: \"Sam Random\",\n*   phone: \"(111) 222-3333\",\n*   updated: \"2016-01-01T01:30:00.000Z\"\n* };\n*\n* _.mixin(person, {\n*   email: \"sam.random@protonmail.com\",\n*   updated: \"2019-12-31T01:30:00.000Z\"\n* }, { overwrite: true });\n*\n* console.log(person);\n* // {\n* //   name: 'Sam Random',\n* //   phone: '(111) 222-3333',\n* //   email: 'sam.random@protonmail.com',\n* //   updated: '2019-12-31T01:30:00.000Z'\n* // }\n*/\n_.mixin = function mixin(objects={}, source={}, options={}) {\n  options = Object.assign({ overwrite: false, prototype: false }, options); // merge given options with default options\n\n  if (!(objects instanceof Array)) objects = [objects]; // makes `objects` iterable - i.e. put single object/functions into an array for stadard processing\n\n  let keys = Object.keys(source);\n\n  for (let object = 0; object < objects.length; object++) {\n    for (let key = 0; key < keys.length; key++) {\n      if (typeof objects[object] === \"function\" && options.prototype)\n        objects[object].prototype[keys[key]] = !options.overwrite && objects[object].prototype[keys[key]] != undefined ? objects[object].prototype[keys[key]] : source[keys[key]];\n      else\n        objects[object][keys[key]] = !options.overwrite && objects[object][keys[key]] != undefined ? objects[object][keys[key]] : source[keys[key]];\n    }\n  }\n}\n\n/**\n* Deep extension of any class, function, or object - i.e. extends static functions/values, instance functions/values, and constructor\n*\n* Used: https://www.webdeveloper.com/d/243971-how-to-override-constructor-for-a-javascript-object/4\n*\n* @param {Function} target\n* @param {Function} source\n*\n* @exaple\n* function Person(options={}) {\n*   this.name = options.name || \"\"\n* }\n*\n* let mike = new Person({ name: \"Mike\", age: 25 });\n*\n* console.log(mike);\n* // Person { name: \"Mike\" }\n*\n* // Extends the `Person` constructor\n* Person = _.extend(Person, function(options={}) {\n*   this.age = options.age;\n* });\n*\n* let john = new Person({ name: \"John\", age: 34 });\n*\n* console.log(john);\n* // Person { name: \"John\", age: 34 }\n*/\n_.extend = function extend(target={}, source={}) {\n  function clone(object) {\n    let F = function() {};\n    F.prototype = object;\n    return new F;\n  };\n  function extend(A, B){\n    A.prototype = clone(B.prototype);\n    A.prototype.constructor = A;\n    return A;\n  };\n\n  return (function(target) {\n    return extend(function() { target.apply(this, arguments); source.call(this, ...arguments); }, target);\n  }(target));\n}\n\nmodule.exports = _;\n\n\n//# sourceURL=webpack://neural/./src/_.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("let _ = __webpack_require__(/*! ./_ */ \"./src/_.js\");\nlet EventEmitter = __webpack_require__(/*! eventemitter3 */ \"../node_modules/eventemitter3/index.js\");\n// let { performance } = require(\"perf_hooks\");\n\nMath.cantor = function(a, b) {\n  a = parseInt(a); b = parseInt(b); // cast to integer\n  return ((a + b) * (a + b + 1)) / 2 + b;\n}\n\nfunction Connection(options={}) {};\nfunction Node(options={}) {};\nfunction Network(options={}) {};\n\nConnection = _.extend(Connection, EventEmitter);\nConnection = _.extend(Connection, function(options={}) {\n  this.id = options.id || Math.cantor(options.from, options.to);\n});\nNode = _.extend(Node, EventEmitter);\nNode = _.extend(Node, function(options={}) {\n  this.id = options.id;\n});\nNetwork = _.extend(Network, EventEmitter);\nNetwork = _.extend(Network, function(options={}) {\n  // constructor defaults\n  options.inputs = options.inputs || 1;\n  options.outputs = options.outputs || 1;\n\n  // genome\n  this.inputs = {};\n  this.outputs = {};\n  this.nodes = {};\n  this.connections = {};\n  this.NODES = 0;\n\n  // new Network({ inputs, outputs })\n  // create input nodes\n  for (let i = 0; i < options.inputs; i++) {\n    this.inputs[this.NODES] = this.nodes[this.NODES] = new Node({ id: this.NODES });\n    ++this.NODES;\n  }\n  // create output nodes\n  for (let o = 0; o < options.outputs; o++) {\n    this.outputs[this.NODES] = this.nodes[this.NODES] = new Node({ id: this.NODES });\n    ++this.NODES;\n  }\n  // connect input nodes to output nodes\n  for (input in this.inputs) {\n    for (output in this.outputs) {\n      // connect input node to output node\n      let connection = new Connection({ from: input, to: output });\n      this.connections[connection.id] = connection;\n    }\n  }\n});\n\n// Node JSON Export\n_.mixin(Node, {\n  toJSON: function(options={}) {\n    return { id: this.id }\n  }\n}, { prototype: true });\n\n// Network Visualization Vis.js\n_.mixin(Network, {\n  /**\n  * Returns a JSON representation of the network\n  *\n  * @returns {Object}\n  */\n  toJSON: function toJSON() {\n    const neurons = Object.values(this.nodes).flat(Infinity).map(function(neuron) {\n      return neuron.toJSON();\n    });\n    const connections = Object.values(this.connections).flat(Infinity).map(function(connection) {\n      return connection.toJSON();\n    });\n    return { neurons, connections }\n  },\n\n  /**\n  * **BROWSER ONLY**\n  *\n  * Creates a graph of the network using [`vis-network`](https://www.npmjs.com/package/vis-network) on the given DOMElement\n  * or DOMElement ID.\n  *\n  * @param {string|DOMElement} element - DOMElement, or ID, where graph will ported into\n  * @param {Object} [options] - `vis-network` options - [learn more](https://visjs.github.io/vis-network/docs/network/#options)\n  */\n  toGraph: function toGraph(element, options) {\n    const { neurons, connections } = this.toJSON();\n\n    // Flattens neuron layers from `Network.toJSON` and converts it to `vie-network`\n    // nodes\n    const nodes = new vis.DataSet(neurons.map(function(neuron) {\n      neuron.label = `${neuron.id}`;\n      neuron.color = neuron.type === \"input\" ? \"gray\" : neuron.type === \"output\" ? \"lime\" : \"orange\"; // \"input\" || \"output\" || \"hidden\"\n      return neuron;\n    }));\n    // Flattens connections from `Network.toJSON` and converts it into `vis-network`\n    // edges\n    const edges = new vis.DataSet(connections.map(function(connection) {\n      connection.arrows = \"to\";\n      return connection;\n    }));\n\n    // DOM id\n    if(typeof element === \"string\") element = document.getElementById(element);\n\n    // Vis.js Network Options\n    // Will have a \"left-to-right\" graph with \"smooth\" lines representing\n    // connections by default\n    options = options || {\n      edges: {\n        smooth: {\n          type: \"cubicBezier\",\n          forceDirection: \"horizontal\"\n        }\n      },\n      layout: {\n        hierarchical: {\n          direction: \"LR\",\n          sortMethod: \"directed\"\n        }\n      },\n      physics: false\n    }\n\n    return new vis.Network(element, { nodes, edges }, options);\n  }\n}, { prototype: true })\n\n// Possible \"network-scope\" mutations\n_.mixin(Network, {\n  mutations: {\n    \"ADD_NODE\": function(network, options={}) {},\n    \"REMOVE_NODE\": function(network, options={}) {},\n    \"ADD_CONNECTION\": function(network, options={}) {},\n    \"REMOVE_CONNECTION\": function(network, options={}) {}\n  }\n});\n\n// NEAT Mutation Helpers\n_.mixin(Network, {\n  additions: {}, // tracks `Node` additions to the network - creating a key-value pair of the bisected connection's Cantor Pair ID and the bisecting Node's ID, respectively; NOTE: this is useful to ensure that IDs are structurally unique across networks training in a population or acrosss time; if a new node bisects a connection, is removed, and later added again - it should not be address as a new node, but rather as an existing node being \"turned on\" again.\n  removals: {}, // tracks `Node` removals to the network - creating a key-value pair of the emerging connection's Cantor Pair ID and the IDs of the removed connections; NOTE: when a `node` is removed from the network, at least one pair of connections are also removed from the network\n  mutate: function(options={}) {\n    let mutations = Object.keys(Network.mutations);\n    options.mutation = options.mutation || Network.mutations[mutations[Math.floor(Math.random() * mutations.length)]]; // use the given mutation or a random one\n  }\n}, { prototype: true });\n\n// No Endpoints - Synaptic Weight - No Delay - No ID\nif (false) {}\n\n// ID Endpoints - Synaptic Weight - No Delay - No ID\nif (false) {}\n\n// ID Endpoints - Synaptic Weight - No Delay - Network Context Sequantially Based IDs\nif (false) {}\n\nif (false) { var something; }\n\nif (false) { var Class; }\n\n{\n  let connection = new Connection();\n\n\n  // let start = performance.now();\n  let start = Date.now();\n\n  let network = new Network({\n    inputs: 5,\n    outputs: 4\n  });\n\n  // let end  = performance.now();\n  let end  = Date.now();\n\n  console.log(end - start);\n\n  // console.log(Connection);\n  // console.log(Network);\n\n  // console.log(connection);\n  // console.log(connection);\n  // console.log(network);\n}\n\nmodule.exports._ = _;\nmodule.exports.Connection = Connection;\nmodule.exports.Node = Node;\nmodule.exports.Network = Network;\n\n\n//# sourceURL=webpack://neural/./src/index.js?");

/***/ })

/******/ });