//
//
// // No Endpoints - Synaptic Weight - No Delay - No ID
// if (false) {
//   Connection = _.extend(Connection, function(options={}) {
//     this.weight = options.weight || Math.random() * 2 - 1;
//   });
//
//   let noweight = new Connection();
//   let weighted = new Connection({
//     weight: 0.3
//   });
//
//   console.log(noweight);
//   console.log(weighted);
// }
//
// // ID Endpoints - Synaptic Weight - No Delay - No ID
// if (false) {
//   Connection = _.extend(Connection, function(options={}) {
//     this.from = options.from; // @prop {string|number} from
//     this.to = options.to; // @prop {string|number} to
//   });
//
//   let connected = new Connection({
//     from: 0,
//     to: 1
//   });
//
//   console.log(connected);
// }
//
// // ID Endpoints - Synaptic Weight - No Delay - Network Context Sequantially Based IDs
// if (false) {
//   _.mixin(Network, { CONNECTIONS: 0 }, { prototype: true });
//   _.mixin(Network, {
//     connection: function() {
//       return ++this.CONNECTIONS;
//     }
//   }, { prototype: true });
//
//   // Connection = _.extend(Connection, function(options={}) {
//   //   this.from = options.from; // @prop {string|number} from
//   //   this.to = options.to; // @prop {string|number} to
//   // });
//
//   Connection = _.extend(Connection, function(options={}) {
//     this.context = options.context;
//     this.id = this.context.connection();
//   });
//
//   let network = new Network();
//
//   console.log(network);
//   console.log(network.CONNECTIONS);
//
//   let connection = new Connection({
//     context: network,
//     from: 0,
//     to: 1
//   });
//
//   console.log(connection);
//
//   let otherConnection = new Connection({
//     context: network,
//     from: 1,
//     to: 2
//   });
//
//   console.log(otherConnection);
// }
//
// if (false) {
//   function something(options={}) {
//     this.meta = {};
//
//     // track `stream`
//     this.meta.prestream = function() {};
//     this.meta.stream = function() {};
//     this.meta.poststream = function() {};
//
//     // create `meta` & `state`
//     this.meta.precreate = function() {};
//     this.meta.created = function() {};
//     this.meta.postcreate = function() {};
//
//     // update `state`
//     this.meta.preupdate = function() {};
//     this.meta.update = function() {};
//     this.meta.postupdate = function() {};
//
//     this.state = {};
//
//     this.stream.forward = [];
//     this.stream.backward = [];
//
//     this.push = function() {};
//     this.pull = function() {};
//   }
// }
//
// if (false) {
//   function Class(options={}) {
//     this.data = {};
//     this.computed = {};
//     this.methods = {};
//     this.streams = {};
//   }
//
//   Connection = _.extend(Connection, Class);
//   Network = _.extend(Network, Class);
//
//   Connection = _.extend(Connection, function(options={}) {
//     this.data = Object.assign(this.data, options.data);
//   });
//
//   let network = new Network();
//   let connection = new Connection({
//     data: {
//       context: network
//     },
//   });
//
//   console.log(connection);
// }
//
//
// // Checks network construction speed/performance
// {
//   let connection = new Connection();
//
//
//   // let start = performance.now();
//   let start = Date.now();
//
//   let network = new Network({
//     inputs: 5,
//     outputs: 4
//   });
//
//   // let end  = performance.now();
//   let end  = Date.now();
//
//   console.log(end - start);
//   console.log(network);
//
//   // console.log(Connection);
//   // console.log(Network);
//
//   // console.log(connection);
//   // console.log(connection);
//   // console.log(network);
// }
//
//
// //
// // let _ = require("./_");
// // let EventEmitter = require('eventemitter3');
// //
// // function Connection(options={}) {};
// // function Network(options={}) {};
// //
// // // Connection.
// //
// // // No Endpoints - Synaptic Weight - No Delay - No ID
// // {
// //   Connection = _.extend(Connection, function(options={}) {
// //     this.weight = options.weight || Math.random() * 2 - 1;
// //   });
// //
// //   let noweight = new Connection();
// //   let weighted = new Connection({
// //     weight: 0.3
// //   });
// //
// //   console.log(noweight);
// //   console.log(weighted);
// // }
// //
// // // ID Endpoints - Synaptic Weight - No Delay - No ID
// // {
// //   Connection = _.extend(Connection, function(options={}) {
// //     this.from = options.from; // @prop {string|number} from
// //     this.to = options.to; // @prop {string|number} to
// //   });
// //
// //   let connected = new Connection({
// //     from: 0,
// //     to: 1
// //   });
// //
// //   console.log(connected);
// // }
// //
// // // ID Endpoints - Synaptic Weight - No Delay - Network Context Sequantially Based IDs
// // {
// //   _.mixin(Network, { CONNECTIONS: 0 }, { prototype: true });
// //   _.mixin(Network, { INTERFACES: {} });
// //   _.mixin(Network.INTERFACES, { CONNECTIONS: {} });
// //   _.mixin(Network.INTERFACES.CONNECTIONS, {
// //     id: function(options={}) {
// //       return ++this.CONNECTIONS;
// //     }
// //   });
// //
// //   Network = _.extend(Network, function(options={}) {
// //     this.CONNECTION = options.connections.interface
// //   }
// //
// //
// //   let interface = {
// //     id: function() {
// //       return ++CONNECTIONS;
// //     }
// //   }
// //
// //   console.log(Network);
// //
// //   Connection = _.extend(Connection, function(options={}) {
// //     this.from = options.from; // @prop {string|number} from
// //     this.to = options.to; // @prop {string|number} to
// //   });
// //
// //   let connected = new Connection({
// //     from: 0,
// //     to: 1
// //   });
// //
// //   console.log(connected);
// // }
// //
// // _.mixin(Connection, Object.create(EventEmitter.prototype), { prototype: true });
// //
// //
// // // Checks: Constructor extension
// // // Used: https://www.webdeveloper.com/d/243971-how-to-override-constructor-for-a-javascript-object/4
// // {
// //   // function clone(object) {
// //   //   let F = function() {};
// //   //   F.prototype = object;
// //   //   return new F;
// //   // }
// //   //
// //   // function extend(A, B){
// //   //   A.prototype = clone(B.prototype);
// //   //   A.prototype.constructor = A;
// //   //   return A;
// //   // };
// //
// //   function Connection(options={}) {
// //     EventEmitter.call(this);
// //   };
// //
// //   function WeightedConnection(options={}) {
// //     this.weight = options.weight || Math.random() * 2 - 1;
// //   }
// //
// //   let c0 = new Connection();
// //
// //   console.log(c0);
// //
// //   Connection = _.extend(Connection, WeightedConnection);
// //   // Connection = (function(Connection) {
// //   //  return extend(function() { Connection.apply(this, arguments); WeightedConnection.call(this, arguments); }, Connection);
// //   // }(Connection));
// //
// //   console.log(Connection.toString());
// //
// //   let c1 = new Connection();
// //
// //   console.log(c1);
// //
// //   let c2 = new Connection();
// //
// //
// //   console.log(c1);
// //   console.log(c2);
// // }
// //
// //
// //
// //
// //
// //
// // let _ = require("./_");
// // let EventEmitter = require('eventemitter3');
// //
// // function Connection(options={}) {
// //   EventEmitter.call(this);
// // };
// //
// // Connection.
// //
// // function Node(options={}) {
// //   EventEmitter.call(this);
// // }
// //
// // function Network(options={}) {
// //   EventEmitter.call(this);
// // };
// //
// // function Population(options={}) {
// //   EventEmitter.call(this);
// // };
// //
// // _.mixin([Connection, Network, Population], Object.create(EventEmitter.prototype), { prototype: true });
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// // // ID - Dynamic id setter - a person could want to plug in their DB's id creator
// // // A & B - Could be any objects
// // // Graphs could be directed or undirected
// // // There should exist a policy for the direction of the flow and the source of the action
// // // Connections can operate under two different contexts. On the one hand they desbribe the relationship between two objects...on tthe other hand they can describe or control the flow information between different nodes in a network.  We can make the assumption that in a directed relationship the connection controls the flow of information and will actually be updating some state informatiom - or at least has the capacity to. We can also assume that in an undirected graph the connection might pull information from the neighboring objects to update its state but it will not be actually sending informmation to any given node.In other owrds we can assume that undirected connections can be treated as a "datavase" where information about the objects it connects to.
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// // let person = {
// //    name: "Sam Random",
// //    phone: "(111) 222-3333",
// //    // updated: "2016-01-01T01:30:00.000Z",
// //       email: "sam.random@protonmail.com",
// //       updated: "2019-12-31T01:30:00.000Z"
// //  };
// //
// //  console.log(person);
// //
// //
// //
// // let people = [{
// //    name: "John Doe",
// //    email: "john.doe@protonmail.com"
// //  }, {
// //    name: "Jane Doe",
// //    email: "jane.doe@protonmail.com"
// //  }];
// //
// //  console.log(people);
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// // // Checks: Multi-Object mixins
// // if (false) {
// //   let F = function(name) { this.name = name || ""; };
// //   let O = { name: "" };
// //
// //   console.log();
// //   console.log(F);
// //   console.log(O);
// //   console.log();
// //
// //   _.mixin([F, O], {
// //     name: "john",
// //     status: "married",
// //     sex: "male",
// //     hello: function() {
// //       console.log(`Hello, my name ${this.name}. I'm a ${this.status} ${this.sex}.`);
// //     }
// //   }, {
// //     overwrite: true,
// //     prototype: true
// //   });
// //
// //   console.log();
// //   console.log(F);
// //   console.log(O);
// //   console.log();
// //
// //   let f = new F("f");
// //
// //   f.hello();
// // }
// //
// // let object = {};
// // let func = function() {}
// //
// // function objectMixinShallowObject(object, mixinObject, overwriteSourceObject=true) {
// //   let keys = Object.keys(mixinObject);
// //
// //   if(overwriteSourceObject)
// //     for (let key = 0; key < keys.length; key++)
// //       object[keys[key]] = mixinObject[keys[key]];
// //   else
// //     for (let key = 0; key < keys.length; key++)
// //       if (object[keys[key]] == undefined) object[keys[key]] = mixinObject[keys[key]];
// // }
// // function functionMixinShallowObject(func, mixinObject, overwriteSourceFunction=true, prototypeChain=true) {
// //   let keys = Object.keys(mixinObject);
// //
// //   if(overwriteSourceFunction)
// //     if(prototypeChain)
// //       for (let key = 0; key < keys.length; key++)
// //         func.prototype[keys[key]] = mixinObject[keys[key]];
// //     else
// //       for (let key = 0; key < keys.length; key++)
// //         func[keys[key]] = mixinObject[keys[key]];
// //   else
// //     if(prototypeChain)
// //       for (let key = 0; key < keys.length; key++)
// //         if (func[keys[key]] == undefined) func.prototype[keys[key]] = mixinObject[keys[key]];
// //     else
// //       for (let key = 0; key < keys.length; key++)
// //         if (func[keys[key]] == undefined) func[keys[key]] = mixinObject[keys[key]];
// // }
// //
// // // Checks: Shallow Object to Object Mixin
// // if (false) {
// //   console.log(object);
// //   objectMixinShallowObject(object, {
// //     a: 12,
// //     b: false,
// //     c: [],
// //     d: "nocode",
// //     e: function() {},
// //     f: {},
// //   });
// //   console.log(object);
// //   objectMixinShallowObject(object, {
// //     a: 35,
// //     g: 12345678
// //   }, false);
// //   console.log(object);
// // }
// //
// // // Checks: Shallow Object to Function Mixin
// // if (false) {
// //   console.log(func);
// //   functionMixinShallowObject(func, {
// //     name: "",
// //     hello: function() { console.log(`Hello, my name is ${this.name}`); }
// //   });
// //   console.log(func);
// //   let person = new func();
// //   person.name = "Mike";
// //   console.log(person);
// //   person.hello();
// // }
// //
// //
// // /**
// // *
// // */
// // // function mixin(objects, properties) {
// // //   if (!(objects instanceof Array)) objects = [objects];
// // //   if (!(properties instanceof Array)) properties = [properties];
// // //
// // //   for (let object = 0; object < objects.length; object++) {
// // //     for (let property = 0; property < properties.length; property++) {
// // //       if (typeof objects[object] === "function")
// // //         if (typeof properties[property] === "function") objects[object].prototype[]
// // //     }
// // //   }
// // // }
// //
// // // mixin(Population, "");
