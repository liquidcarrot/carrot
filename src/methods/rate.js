/**
* @todo Create a namespace description
*
* @module
*
* @see {@link https://stackoverflow.com/questions/30033096/what-is-lr-policy-in-caffe/30045244|Learning rate policy}
*
* @namespace
*/
var rate = {
  /**
  * @todo Create a function description
  * @todo Add `@returns` tag
  */
  FIXED: function () {
    var func = function (baseRate, iteration) { return baseRate; };
    return func;
  },
  /**
  * @todo Create a function description
  * @todo Add `@returns` tag
  * @todo Add `@param` tag types
  * @todo Add `@param` tag descriptions
  * @todo Add `@param` tag defaults
  * @todo Document `@param` tag "optional" or "required"
  *
  * @param gamma
  * @param stepSize
  */
  STEP: function (gamma, stepSize) {
    gamma = gamma || 0.9;
    stepSize = stepSize || 100;

    var func = function (baseRate, iteration) {
      return baseRate * Math.pow(gamma, Math.floor(iteration / stepSize));
    };

    return func;
  },
  /**
  * @todo Create a function description
  * @todo Add `@returns` tag
  * @todo Add `@param` tag types
  * @todo Add `@param` tag descriptions
  * @todo Add `@param` tag defaults
  * @todo Document `@param` tag "optional" or "required"
  *
  * @param gamma
  */
  EXP: function (gamma) {
    gamma = gamma || 0.999;

    var func = function (baseRate, iteration) {
      return baseRate * Math.pow(gamma, iteration);
    };

    return func;
  },
  /**
  * @todo Create a function description
  * @todo Add `@returns` tag
  * @todo Add `@param` tag types
  * @todo Add `@param` tag descriptions
  * @todo Add `@param` tag defaults
  * @todo Document `@param` tag "optional" or "required"
  *
  * @param gamma
  * @param power
  */
  INV: function (gamma, power) {
    gamma = gamma || 0.001;
    power = power || 2;

    var func = function (baseRate, iteration) {
      return baseRate * Math.pow(1 + gamma * iteration, -power);
    };

    return func;
  }
};

module.exports = rate;
