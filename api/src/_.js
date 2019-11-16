let _ = function() {};

/**
* Mixes a shallow object into a source object(s) or function(s)
*
* @param {Object[]|Object|Function[]|Function} objects
* @param {Object} source
* @param {Object} [options]
* @param {boolean} [options.overwrite=false] - iff `options.overwrite ==== true`, overwrites values of existing keys in `objects` with values of keys in `source`
* @param {boolean} [options.prototype=false] - iff `options.prototype === true` and `typeof objects[object] === "function"`, values in `source` will be added to `objects[object]`'s prototype chain (i.e. instance variable/function)
*
* @example
* let Person = function(name) { this.name = name; }
*
* _.mixin(Person, {
*   greet: function greet() {
*     console.log(`Hello, my name is ${this.name}!`);
*   }
* }, { prototype: true });
*
* let john = new Person("John");
*
* john.greet(); // >Hello, my name is John!
*
* @example
* let people = [{
*   name: "John Doe",
*   email: "john.doe@protonmail.com"
* }, {
*   name: "Jane Doe",
*   email: "jane.doe@protonmail.com"
* }];
*
* _.mixin(people, { age: 25 });
*
* console.log(people);
* // [
* //   { name: 'John Doe', email: 'john.doe@protonmail.com', age: 25 },
* //   { name: 'Jane Doe', email: 'jane.doe@protonmail.com', age: 25 }
* // ]
*
* @example
* let person = {
*   name: "Sam Random",
*   phone: "(111) 222-3333",
*   updated: "2016-01-01T01:30:00.000Z"
* };
*
* _.mixin(person, {
*   email: "sam.random@protonmail.com",
*   updated: "2019-12-31T01:30:00.000Z"
* }, { overwrite: true });
*
* console.log(person);
* // {
* //   name: 'Sam Random',
* //   phone: '(111) 222-3333',
* //   email: 'sam.random@protonmail.com',
* //   updated: '2019-12-31T01:30:00.000Z'
* // }
*/
_.mixin = function mixin(objects={}, source={}, options={}) {
  options = Object.assign({ overwrite: false, prototype: false }, options); // merge given options with default options

  if (!(objects instanceof Array)) objects = [objects]; // makes `objects` iterable - i.e. put single object/functions into an array for stadard processing

  let keys = Object.keys(source);

  for (let object = 0; object < objects.length; object++) {
    for (let key = 0; key < keys.length; key++) {
      if (typeof objects[object] === "function" && options.prototype)
        objects[object].prototype[keys[key]] = !options.overwrite && objects[object].prototype[keys[key]] != undefined ? objects[object].prototype[keys[key]] : source[keys[key]];
      else
        objects[object][keys[key]] = !options.overwrite && objects[object][keys[key]] != undefined ? objects[object][keys[key]] : source[keys[key]];
    }
  }
}

/**
* Deep extension of any class, function, or object - i.e. extends static functions/values, instance functions/values, and constructor
*
* Used: https://www.webdeveloper.com/d/243971-how-to-override-constructor-for-a-javascript-object/4
*
* @param {Function} target
* @param {Function} source
*
* @exaple
* function Person(options={}) {
*   this.name = options.name || ""
* }
*
* let mike = new Person({ name: "Mike", age: 25 });
*
* console.log(mike);
* // Person { name: "Mike" }
*
* // Extends the `Person` constructor
* Person = _.extend(Person, function(options={}) {
*   this.age = options.age;
* });
*
* let john = new Person({ name: "John", age: 34 });
*
* console.log(john);
* // Person { name: "John", age: 34 }
*/
_.extend = function extend(target={}, source={}) {
  function clone(object) {
    let F = function() {};
    F.prototype = object;
    return new F;
  };
  function extend(A, B){
    A.prototype = clone(B.prototype);
    A.prototype.constructor = A;
    return A;
  };

  return (function(target) {
    return extend(function() { target.apply(this, arguments); source.call(this, ...arguments); }, target);
  }(target));
}

module.exports = _;
