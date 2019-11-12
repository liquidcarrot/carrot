

let person = {
   name: "Sam Random",
   phone: "(111) 222-3333",
   // updated: "2016-01-01T01:30:00.000Z",
      email: "sam.random@protonmail.com",
      updated: "2019-12-31T01:30:00.000Z"
 };

 console.log(person);



let people = [{
   name: "John Doe",
   email: "john.doe@protonmail.com"
 }, {
   name: "Jane Doe",
   email: "jane.doe@protonmail.com"
 }];

 console.log(people);



























// Checks: Multi-Object mixins
if (false) {
  let F = function(name) { this.name = name || ""; };
  let O = { name: "" };

  console.log();
  console.log(F);
  console.log(O);
  console.log();

  _.mixin([F, O], {
    name: "john",
    status: "married",
    sex: "male",
    hello: function() {
      console.log(`Hello, my name ${this.name}. I'm a ${this.status} ${this.sex}.`);
    }
  }, {
    overwrite: true,
    prototype: true
  });

  console.log();
  console.log(F);
  console.log(O);
  console.log();

  let f = new F("f");

  f.hello();
}

let object = {};
let func = function() {}

function objectMixinShallowObject(object, mixinObject, overwriteSourceObject=true) {
  let keys = Object.keys(mixinObject);

  if(overwriteSourceObject)
    for (let key = 0; key < keys.length; key++)
      object[keys[key]] = mixinObject[keys[key]];
  else
    for (let key = 0; key < keys.length; key++)
      if (object[keys[key]] == undefined) object[keys[key]] = mixinObject[keys[key]];
}
function functionMixinShallowObject(func, mixinObject, overwriteSourceFunction=true, prototypeChain=true) {
  let keys = Object.keys(mixinObject);

  if(overwriteSourceFunction)
    if(prototypeChain)
      for (let key = 0; key < keys.length; key++)
        func.prototype[keys[key]] = mixinObject[keys[key]];
    else
      for (let key = 0; key < keys.length; key++)
        func[keys[key]] = mixinObject[keys[key]];
  else
    if(prototypeChain)
      for (let key = 0; key < keys.length; key++)
        if (func[keys[key]] == undefined) func.prototype[keys[key]] = mixinObject[keys[key]];
    else
      for (let key = 0; key < keys.length; key++)
        if (func[keys[key]] == undefined) func[keys[key]] = mixinObject[keys[key]];
}

// Checks: Shallow Object to Object Mixin
if (false) {
  console.log(object);
  objectMixinShallowObject(object, {
    a: 12,
    b: false,
    c: [],
    d: "nocode",
    e: function() {},
    f: {},
  });
  console.log(object);
  objectMixinShallowObject(object, {
    a: 35,
    g: 12345678
  }, false);
  console.log(object);
}

// Checks: Shallow Object to Function Mixin
if (false) {
  console.log(func);
  functionMixinShallowObject(func, {
    name: "",
    hello: function() { console.log(`Hello, my name is ${this.name}`); }
  });
  console.log(func);
  let person = new func();
  person.name = "Mike";
  console.log(person);
  person.hello();
}


/**
*
*/
// function mixin(objects, properties) {
//   if (!(objects instanceof Array)) objects = [objects];
//   if (!(properties instanceof Array)) properties = [properties];
//
//   for (let object = 0; object < objects.length; object++) {
//     for (let property = 0; property < properties.length; property++) {
//       if (typeof objects[object] === "function")
//         if (typeof properties[property] === "function") objects[object].prototype[]
//     }
//   }
// }

// mixin(Population, "");
