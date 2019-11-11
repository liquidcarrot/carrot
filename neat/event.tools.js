// Checks: https://github.com/jeromeetienne/microevent.js/blob/master/microevent.js
// Works on Browser and Node.js with a very simple API
{
  // let MicroEvent = require("microevent");

  // Creates a class
  function Connection() {
    let self = this;
    this.setWeight = function() {
      self.trigger("weight_set", new Date());
    }
  }

  // Gives the class the ability to create instances that emit events
  MicroEvent.mixin(Connection);

  // Creates a new instance of the class
  let connection = new Connection();

  // Adds an EventListener to the instance
  connection.bind("weight_set", function(date) {
    console.log(date);
  });

  // Triggers an Event from within the instance
  connection.setWeight(); // Should trigger a DateTime log to console
}

// Checks: https://github.com/primus/eventemitter3/blob/master/index.js
// Used: https://medium.com/beginners-guide-to-mobile-web-development/super-and-extends-in-javascript-es6-understanding-the-tough-parts-6120372d3420
// Used: https://nodejs.org/dist/latest-v12.x/docs/api/events.html
// Works on Node.js and Browser - is super fast and exhaustively documented
{
  // let EventEmitter = require("eventemitter3");

  // Creates a class that prototypically inherits `EventEmitter`
  function Connection() {
    EventEmitter.call(this);
  };
  Connection.prototype = Object.create(EventEmitter.prototype);
  Connection.prototype.constructor = Connection;

  // Creates an instance function emits an Event
  Connection.prototype.setWeight = function() {
    this.emit("weight_set", new Date());
  };

  // Creates a new instance of the class
  let connection = new Connection();

  // Adds an EventListener to the instance
  connection.on("weight_set", function(date) {
    console.log(date);
  });

  // Triggers an Event from within the instance
  connection.setWeight(); // Should trigger a DateTime log to console
}

// Checks: https://github.com/developit/mitt
