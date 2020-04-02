// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"architecture/layer/Layer.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){return function(t,e){this.inputSize=t,this.outputSize=e,this.nodes=[],this.connections=[]}}();exports.Layer=t;
},{}],"architecture/layer/ConvolutionLayer.js":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(r,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var e in r)r.hasOwnProperty(e)&&(t[e]=r[e])})(r,e)};return function(r,e){function o(){this.constructor=r}t(r,e),r.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}}();Object.defineProperty(exports,"__esModule",{value:!0});var r=require("./Layer"),e=function(r){function e(t,e){return r.call(this,t,e)||this}return t(e,r),e}(r.Layer);exports.ConvolutionLayer=e;
},{"./Layer":"architecture/layer/Layer.js"}],"methods/Activation.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){function t(){this.type=d.NO_ACTIVATION}return t.getActivation=function(t){switch(t){case d.LogisticActivation:return new i;case d.TanhActivation:return new n;case d.IdentityActivation:return new o;case d.StepActivation:return new a;case d.RELUActivation:return new c;case d.SoftsignActivation:return new e;case d.SinusoidActivation:return new i;case d.GaussianActivation:return new v;case d.BentIdentityActivation:return new s;case d.BipolarActivation:return new u;case d.BipolarSigmoidActivation:return new A;case d.HardTanhActivation:return new p;case d.AbsoluteActivation:return new f;case d.InverseActivation:return new h;case d.SELUActivation:return new y}throw new ReferenceError(t+" is not the name of any available activations! These are all available activations: "+exports.ALL_ACTIVATIONS)},t}();exports.Activation=t;var i=function(){function t(){this.type=d.LogisticActivation}return t.prototype.calc=function(t,i){return void 0===i&&(i=!1),i?this.calc(t,!1)*(1-this.calc(t,!1)):1/(1+Math.exp(-t))},t}();exports.LogisticActivation=i;var n=function(){function t(){this.type=d.TanhActivation}return t.prototype.calc=function(t,i){return void 0===i&&(i=!1),i?1-this.calc(t,!1)*this.calc(t,!1):Math.tanh(t)},t}();exports.TanhActivation=n;var o=function(){function t(){this.type=d.IdentityActivation}return t.prototype.calc=function(t,i){return void 0===i&&(i=!1),i?1:t},t}();exports.IdentityActivation=o;var a=function(){function t(){this.type=d.StepActivation}return t.prototype.calc=function(t,i){return void 0===i&&(i=!1),i?0:t<0?0:1},t}();exports.StepActivation=a;var c=function(){function t(){this.type=d.RELUActivation}return t.prototype.calc=function(t,i){return void 0===i&&(i=!1),i?t<=0?0:1:t<=0?0:t},t}();exports.RELUActivation=c;var e=function(){function t(){this.type=d.SoftsignActivation}return t.prototype.calc=function(t,i){return void 0===i&&(i=!1),i?t/((1+Math.abs(t))*(1+Math.abs(t))):t/(1+Math.abs(t))},t}();exports.SoftsignActivation=e;var r=function(){function t(){this.type=d.SinusoidActivation}return t.prototype.calc=function(t,i){return void 0===i&&(i=!1),i?Math.cos(t):Math.sin(t)},t}();exports.SinusoidActivation=r;var v=function(){function t(){this.type=d.GaussianActivation}return t.prototype.calc=function(t,i){return void 0===i&&(i=!1),i?-2*t*this.calc(t,!1):Math.exp(-t*t)},t}();exports.GaussianActivation=v;var s=function(){function t(){this.type=d.BentIdentityActivation}return t.prototype.calc=function(t,i){return void 0===i&&(i=!1),i?t/(2*Math.sqrt(t*t+1))+1:(Math.sqrt(t*t+1)-1)/2+t},t}();exports.BentIdentityActivation=s;var u=function(){function t(){this.type=d.BipolarActivation}return t.prototype.calc=function(t,i){return void 0===i&&(i=!1),i?0:t>0?1:-1},t}();exports.BipolarActivation=u;var A=function(){function t(){this.type=d.BipolarSigmoidActivation}return t.prototype.calc=function(t,i){return void 0===i&&(i=!1),i?2*Math.exp(-t)/((1+Math.exp(-t))*(1+Math.exp(-t))):2/(1+Math.exp(-t))-1},t}();exports.BipolarSigmoidActivation=A;var p=function(){function t(){this.type=d.HardTanhActivation}return t.prototype.calc=function(t,i){return void 0===i&&(i=!1),i?Math.abs(t)<1?1:0:Math.max(-1,Math.min(1,t))},t}();exports.HardTanhActivation=p;var f=function(){function t(){this.type=d.AbsoluteActivation}return t.prototype.calc=function(t,i){return void 0===i&&(i=!1),i?t<0?-1:1:Math.abs(t)},t}();exports.AbsoluteActivation=f;var h=function(){function t(){this.type=d.InverseActivation}return t.prototype.calc=function(t,i){return void 0===i&&(i=!1),i?-1:1-t},t}();exports.InverseActivation=h;var d,y=function(){function t(){this.type=d.SELUActivation}return t.prototype.calc=function(t,i){void 0===i&&(i=!1);var n=1.6732632423543772,o=1.0507009873554805;return i?t>0?o:n*Math.exp(t)*o:t>0?t*o:n*Math.exp(t)-n*o},t}();exports.SELUActivation=y,function(t){t[t.NO_ACTIVATION=0]="NO_ACTIVATION",t[t.LogisticActivation=1]="LogisticActivation",t[t.TanhActivation=2]="TanhActivation",t[t.IdentityActivation=3]="IdentityActivation",t[t.StepActivation=4]="StepActivation",t[t.RELUActivation=5]="RELUActivation",t[t.SoftsignActivation=6]="SoftsignActivation",t[t.SinusoidActivation=7]="SinusoidActivation",t[t.GaussianActivation=8]="GaussianActivation",t[t.BentIdentityActivation=9]="BentIdentityActivation",t[t.BipolarActivation=10]="BipolarActivation",t[t.BipolarSigmoidActivation=11]="BipolarSigmoidActivation",t[t.HardTanhActivation=12]="HardTanhActivation",t[t.AbsoluteActivation=13]="AbsoluteActivation",t[t.InverseActivation=14]="InverseActivation",t[t.SELUActivation=15]="SELUActivation"}(d=exports.ActivationType||(exports.ActivationType={})),exports.ALL_ACTIVATIONS=[d.LogisticActivation,d.TanhActivation,d.IdentityActivation,d.StepActivation,d.RELUActivation,d.SoftsignActivation,d.SinusoidActivation,d.GaussianActivation,d.BentIdentityActivation,d.BipolarActivation,d.BipolarSigmoidActivation,d.HardTanhActivation,d.AbsoluteActivation,d.InverseActivation,d.SELUActivation];
},{}],"architecture/Connection.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){function t(t,e,i,o){this.from=t,this.to=e,this.weight=i||0,this.gain=1,this.eligibility=0,this.deltaWeightsPrevious=0,this.deltaWeightsTotal=0,this.xTraceNodes=[],this.xTraceValues=[],o?(this.gateNode=o,o.addGate(this)):this.gateNode=null}return t.innovationID=function(t,e){return.5*(t+e)*(t+e+1)+e},t.prototype.toJSON=function(){return{fromIndex:this.from.index,toIndex:this.to.index,gateNodeIndex:null===this.gateNode?null:this.gateNode.index,weight:this.weight}},t}();exports.Connection=t;
},{}],"methods/Utils.js":[function(require,module,exports) {
"use strict";function r(r){return r[n(0,r.length)]}function n(r,n){return Math.floor(Math.random()*(n-r)+r)}function t(r,n){return Math.random()*(n-r)+r}function e(){return Math.random()>=.5}function o(r,n){for(var t=0,e=r;t<e.length;t++){if(e[t]===n)return!0}return!1}function u(r,n){var t=r.indexOf(n);return-1!==t&&(r.splice(t,1),!0)}function a(r,n){return null!=r?r:n}function f(r){for(var t=r.length;t>0;){var e=n(0,t),o=r[--t];r[t]=r[e],r[e]=o}return r}Object.defineProperty(exports,"__esModule",{value:!0}),exports.pickRandom=r,exports.randInt=n,exports.randDouble=t,exports.randBoolean=e,exports.anyMatch=o,exports.remove=u,exports.getOrDefault=a,exports.shuffle=f;
},{}],"architecture/Node.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t,i=require("../methods/Activation"),e=require("./Connection"),o=require("../methods/Utils"),s=function(){function s(s){void 0===s&&(s=t.HIDDEN),this.type=s,this.bias=o.randDouble(-1,1),this.squash=new i.LogisticActivation,this.activation=0,this.state=0,this.old=0,this.mask=1,this.deltaBiasPrevious=0,this.deltaBiasTotal=0,this.incoming=[],this.outgoing=[],this.gated=[],this.selfConnection=new e.Connection(this,this,0),this.errorResponsibility=0,this.errorProjected=0,this.errorGated=0,this.index=NaN}return s.fromJSON=function(t){var e=new s;return e.bias=t.bias,e.type=t.type,e.squash=i.Activation.getActivation(t.squash),e.mask=t.mask,e.index=t.index,e},s.prototype.clear=function(){for(var t=0,i=this.incoming;t<i.length;t++){(s=i[t]).eligibility=0,s.xTraceNodes=[],s.xTraceValues=[]}for(var e=0,o=this.gated;e<o.length;e++){var s;(s=o[e]).gain=0}this.errorResponsibility=this.errorProjected=this.errorGated=0,this.old=this.state=this.activation=0},s.prototype.mutateBias=function(t){this.bias+=o.randDouble(t.min,t.max)},s.prototype.mutateActivation=function(){var t;do{t=o.pickRandom(i.ALL_ACTIVATIONS)}while(t===this.squash.type);this.squash=i.Activation.getActivation(t)},s.prototype.isProjectedBy=function(t){return t===this?0!==this.selfConnection.weight:o.anyMatch(this.incoming.map(function(t){return t.from}),t)},s.prototype.isProjectingTo=function(t){return t===this?0!==this.selfConnection.weight:o.anyMatch(this.outgoing.map(function(t){return t.to}),t)},s.prototype.addGate=function(t){this.gated.push(t),t.gateNode=this},s.prototype.removeGate=function(t){o.remove(this.gated,t),t.gateNode=null,t.gain=1},s.prototype.connect=function(t,i,o){if(void 0===i&&(i=0),void 0===o&&(o=!1),t===this)return this.selfConnection.weight=i||1,this.selfConnection;if(this.isProjectingTo(t))throw new ReferenceError;var s=new e.Connection(this,t,i);return this.outgoing.push(s),t.incoming.push(s),o&&t.connect(this),s},s.prototype.disconnect=function(t,i){if(void 0===i&&(i=!1),t===this)return this.selfConnection.weight=0,this.selfConnection;for(var e=0,s=this.outgoing;e<s.length;e++){var n=s[e];if(n.to===t)return o.remove(this.outgoing,n),o.remove(n.to.incoming,n),void 0!==n.gateNode&&null!=n.gateNode&&n.gateNode.removeGate(n),i&&t.disconnect(this),n}throw new Error("No connection found!")},s.prototype.propagate=function(t,i,e,o){if(void 0!==t&&Number.isFinite(t))this.errorResponsibility=this.errorProjected=t-this.activation;else{this.errorProjected=0;for(var s=0,n=this.outgoing;s<n.length;s++){var r=n[s];this.errorProjected+=r.to.errorResponsibility*r.weight*r.gain}this.errorProjected*=this.derivative||1,this.errorGated=0;for(var a=0,h=this.gated;a<h.length;a++){var c=void 0;c=(v=(r=h[a]).to).selfConnection.gateNode===this?v.old+r.weight*r.from.activation:r.weight*r.from.activation,this.errorGated+=v.errorResponsibility*c}this.errorGated*=this.derivative||1,this.errorResponsibility=this.errorProjected+this.errorGated}for(var l=0,d=this.incoming;l<d.length;l++){r=d[l];for(var u=this.errorProjected*r.eligibility,g=0;g<r.xTraceNodes.length;g++){var v;u+=(v=r.xTraceNodes[g]).errorResponsibility*r.xTraceValues[g]}r.deltaWeightsTotal+=e*u*this.mask,o&&(r.deltaWeightsTotal+=i*r.deltaWeightsPrevious,r.weight+=r.deltaWeightsTotal,r.deltaWeightsPrevious=r.deltaWeightsTotal,r.deltaWeightsTotal=0)}return this.deltaBiasTotal+=e*this.errorResponsibility,o&&(this.deltaBiasTotal+=i*this.deltaBiasPrevious,this.bias+=this.deltaBiasTotal,this.deltaBiasPrevious=this.deltaBiasTotal,this.deltaBiasTotal=0),{responsibility:this.errorResponsibility,projected:this.errorProjected,gated:this.errorGated}},s.prototype.activate=function(t,i){var e=this;if(void 0===t&&(t=null),void 0===i&&(i=!0),null!==t&&Number.isFinite(t))return this.activation=t;if(i){this.old=this.state,this.state=this.selfConnection.gain*this.selfConnection.weight*this.state+this.bias,this.incoming.forEach(function(t){e.state+=t.from.activation*t.weight*t.gain}),this.activation=this.squash.calc(this.state,!1)*this.mask,this.derivative=this.squash.calc(this.state,!0);var o=[],s=[];this.gated.forEach(function(t){t.gain=e.activation;var i=o.indexOf(t.to);i>-1?s[i]+=t.weight*t.from.activation:(o.push(t.to),t.to.selfConnection.gateNode===e?s.push(t.weight*t.from.activation+t.to.old):s.push(t.weight*t.from.activation))});for(var n=0,r=this.incoming;n<r.length;n++){(g=r[n]).eligibility=this.selfConnection.gain*this.selfConnection.weight*g.eligibility+g.from.activation*g.gain;for(var a=0;a<o.length;a++){var h=o[a],c=s[a],l=g.xTraceNodes.indexOf(h);l>-1?g.xTraceValues[l]=h.selfConnection.gain*h.selfConnection.weight*g.xTraceValues[l]+this.derivative*g.eligibility*c:(g.xTraceNodes.push(h),g.xTraceValues.push(this.derivative*g.eligibility*c))}}return this.activation}if(this.isInputNode())return this.activation=0;this.state=this.selfConnection.gain*this.selfConnection.weight*this.state+this.bias;for(var d=0,u=this.incoming;d<u.length;d++){var g=u[d];this.state+=g.from.activation*g.weight*g.gain}this.activation=this.squash.calc(this.state,!1);for(var v=0,f=this.gated;v<f.length;v++){(g=f[v]).gain=this.activation}return this.activation},s.prototype.toJSON=function(){return{bias:this.bias,type:this.type,squash:this.squash.type,mask:this.mask,index:this.index}},s.prototype.isInputNode=function(){return this.type===t.INPUT},s.prototype.isHiddenNode=function(){return this.type===t.HIDDEN},s.prototype.isOutputNode=function(){return this.type===t.OUTPUT},s}();exports.Node=s,function(t){t[t.INPUT=0]="INPUT",t[t.HIDDEN=1]="HIDDEN",t[t.OUTPUT=2]="OUTPUT"}(t=exports.NodeType||(exports.NodeType={}));
},{"../methods/Activation":"methods/Activation.js","./Connection":"architecture/Connection.js","../methods/Utils":"methods/Utils.js"}],"architecture/layer/DenseLayer.js":[function(require,module,exports) {
"use strict";var e=this&&this.__extends||function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./Layer"),n=require("../Node"),o=function(t){function o(e,o){for(var r=t.call(this,e,o)||this,u=0;u<e;u++)r.nodes.push(new n.Node(n.NodeType.INPUT));for(u=0;u<o;u++)r.nodes.push(new n.Node(n.NodeType.INPUT));return r.nodes.filter(function(e){return e.isInputNode()}).forEach(function(e){r.nodes.filter(function(e){return e.isOutputNode()}).forEach(function(t){r.connections.push(e.connect(t,1))})}),r}return e(o,t),o}(t.Layer);exports.DenseLayer=o;
},{"./Layer":"architecture/layer/Layer.js","../Node":"architecture/Node.js"}],"architecture/layer/GaussianNoiseLayer.js":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(r,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var e in r)r.hasOwnProperty(e)&&(t[e]=r[e])})(r,e)};return function(r,e){function n(){this.constructor=r}t(r,e),r.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();Object.defineProperty(exports,"__esModule",{value:!0});var r=require("./Layer"),e=function(r){function e(t,e){return r.call(this,t,e)||this}return t(e,r),e}(r.Layer);exports.GaussianNoiseLayer=e;
},{"./Layer":"architecture/layer/Layer.js"}],"architecture/layer/InputLayer.js":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(r,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var e in r)r.hasOwnProperty(e)&&(t[e]=r[e])})(r,e)};return function(r,e){function n(){this.constructor=r}t(r,e),r.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();Object.defineProperty(exports,"__esModule",{value:!0});var r=require("./Layer"),e=function(r){function e(t,e){return r.call(this,t,e)||this}return t(e,r),e}(r.Layer);exports.InputLayer=e;
},{"./Layer":"architecture/layer/Layer.js"}],"architecture/layer/LSTMLayer.js":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(r,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var e in r)r.hasOwnProperty(e)&&(t[e]=r[e])})(r,e)};return function(r,e){function n(){this.constructor=r}t(r,e),r.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();Object.defineProperty(exports,"__esModule",{value:!0});var r=require("./Layer"),e=function(r){function e(t,e){return r.call(this,t,e)||this}return t(e,r),e}(r.Layer);exports.LSTMLayer=e;
},{"./Layer":"architecture/layer/Layer.js"}],"architecture/layer/PoolLayer.js":[function(require,module,exports) {
"use strict";var o=this&&this.__extends||function(){var o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(o,t){o.__proto__=t}||function(o,t){for(var e in t)t.hasOwnProperty(e)&&(o[e]=t[e])})(t,e)};return function(t,e){function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}}();Object.defineProperty(exports,"__esModule",{value:!0});var t,e=require("./Layer"),r=function(t){function e(o,e,r){return t.call(this,o,e)||this}return o(e,t),e}(e.Layer);exports.PoolLayer=r,function(o){o[o.MaxPooling=0]="MaxPooling",o[o.AveragePooling=1]="AveragePooling",o[o.GlobalPooling=2]="GlobalPooling"}(t=exports.PoolingType||(exports.PoolingType={}));
},{"./Layer":"architecture/layer/Layer.js"}],"architecture/layer/RNNLayer.js":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(r,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var e in r)r.hasOwnProperty(e)&&(t[e]=r[e])})(r,e)};return function(r,e){function n(){this.constructor=r}t(r,e),r.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();Object.defineProperty(exports,"__esModule",{value:!0});var r=require("./Layer"),e=function(r){function e(t,e){return r.call(this,t,e)||this}return t(e,r),e}(r.Layer);exports.RNNLayer=e;
},{"./Layer":"architecture/layer/Layer.js"}],"architecture/Architect.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){function t(){this.layers=[]}return t.prototype.addLayer=function(t){if(this.layers[this.layers.length-1].outputSize!==t.inputSize)throw new RangeError("Output size of last layer is unequal input size of this layer! "+this.layers[this.layers.length-1].outputSize+" -> "+t.inputSize);return this.layers.push(t),this},t}();exports.Architect=t;
},{}],"methods/Mutation.js":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(n,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var o in n)n.hasOwnProperty(o)&&(t[o]=n[o])})(n,o)};return function(n,o){function e(){this.constructor=n}t(n,o),n.prototype=null===o?Object.create(o):(e.prototype=o.prototype,new e)}}();Object.defineProperty(exports,"__esModule",{value:!0});var n=require("../architecture/Node"),o=require("./Utils"),e=function(){return function(){}}();exports.Mutation=e;var i=function(e){function i(t){void 0===t&&(t=!0);var n=e.call(this)||this;return n.randomActivation=t,n}return t(i,e),i.prototype.mutate=function(t,e){if(!(void 0!==e&&t.nodes.length>=e)){var i=new n.Node(n.NodeType.HIDDEN);this.randomActivation&&i.mutateActivation();var r=o.pickRandom(t.connections),u=r.from,a=r.to;t.disconnect(u,a);var c=Math.max(t.inputSize,1+t.nodes.indexOf(u));t.nodes.splice(c,0,i);var s=t.connect(u,i,1),f=t.connect(i,a,r.weight);null!=r.gateNode&&(o.randBoolean()?t.addGate(r.gateNode,s):t.addGate(r.gateNode,f))}},i}(e);exports.AddNodeMutation=i;var r=function(n){function e(t){void 0===t&&(t=!0);var o=n.call(this)||this;return o.keepGates=t,o}return t(e,n),e.prototype.mutate=function(t){var n=t.nodes.filter(function(t){return void 0!==t&&t.isHiddenNode()});if(n.length>0){var e=o.pickRandom(n);t.removeNode(e)}},e}(e);exports.SubNodeMutation=r;var u=function(n){function e(){return null!==n&&n.apply(this,arguments)||this}return t(e,n),e.prototype.mutate=function(t,n){if(!(void 0!==n&&n<=t.connections.length)){for(var e=[],i=0;i<t.nodes.length-t.outputSize;i++)for(var r=t.nodes[i],u=Math.max(i+1,t.inputSize);u<t.nodes.length;u++){var a=t.nodes[u];r.isProjectingTo(a)||e.push([r,a])}if(e.length>0){var c=o.pickRandom(e);t.connect(c[0],c[1])}}},e}(e);exports.AddConnectionMutation=u;var a=function(n){function e(){return null!==n&&n.apply(this,arguments)||this}return t(e,n),e.prototype.mutate=function(t){var n=t.connections.filter(function(n){return n.from.outgoing.length>1&&n.to.incoming.length>1&&t.nodes.indexOf(n.to)>t.nodes.indexOf(n.from)});if(n.length>0){var e=o.pickRandom(n);t.disconnect(e.from,e.to)}},e}(e);exports.SubConnectionMutation=a;var c=function(n){function e(t,o){void 0===t&&(t=-1),void 0===o&&(o=1);var e=n.call(this)||this;return e.min=t,e.max=o,e}return t(e,n),e.prototype.mutate=function(t){o.pickRandom(t.connections).weight+=o.randDouble(this.min,this.max)},e}(e);exports.ModWeightMutation=c;var s=function(n){function e(t,o){void 0===t&&(t=-1),void 0===o&&(o=1);var e=n.call(this)||this;return e.min=t,e.max=o,e}return t(e,n),e.prototype.mutate=function(t){o.pickRandom(t.nodes.filter(function(t){return!t.isInputNode()})).mutateBias(this)},e}(e);exports.ModBiasMutation=s;var f=function(n){function e(t){void 0===t&&(t=!1);var o=n.call(this)||this;return o.mutateOutput=t,o}return t(e,n),e.prototype.mutate=function(t,n){var e=this.mutateOutput?t.nodes.filter(function(t){return!t.isInputNode()}):t.nodes.filter(function(t){return t.isHiddenNode()});e.length>0&&o.pickRandom(e).mutateActivation()},e}(e);exports.ModActivationMutation=f;var d=function(n){function e(){return null!==n&&n.apply(this,arguments)||this}return t(e,n),e.prototype.mutate=function(t){var n=t.nodes.filter(function(t){return!t.isInputNode()}).filter(function(t){return 0===t.selfConnection.weight});if(n.length>0){var e=o.pickRandom(n);t.connect(e,e)}},e}(e);exports.AddSelfConnectionMutation=d;var p=function(n){function e(){return null!==n&&n.apply(this,arguments)||this}return t(e,n),e.prototype.mutate=function(t){var n=t.connections.filter(function(t){return t.from===t.to});if(n.length>0){var e=o.pickRandom(n);t.disconnect(e.from,e.to)}},e}(e);exports.SubSelfConnectionMutation=p;var l=function(n){function e(){return null!==n&&n.apply(this,arguments)||this}return t(e,n),e.prototype.mutate=function(t,n){if(!(void 0!==n&&n<=t.gates.length)){var e=t.connections.filter(function(t){return null===t.gateNode});if(e.length>0){var i=o.pickRandom(t.nodes.filter(function(t){return!t.isInputNode()})),r=o.pickRandom(e);t.addGate(i,r)}}},e}(e);exports.AddGateMutation=l;var v=function(n){function e(){return null!==n&&n.apply(this,arguments)||this}return t(e,n),e.prototype.mutate=function(t){t.gates.length>0&&t.removeGate(o.pickRandom(t.gates))},e}(e);exports.SubGateMutation=v;var h=function(n){function e(){return null!==n&&n.apply(this,arguments)||this}return t(e,n),e.prototype.mutate=function(t){for(var n=[],e=t.inputSize;e<t.nodes.length;e++)for(var i=t.nodes[e],r=t.inputSize;r<e;r++){var u=t.nodes[r];i.isProjectingTo(u)||n.push([i,u])}if(n.length>0){var a=o.pickRandom(n);t.connect(a[0],a[1])}},e}(e);exports.AddBackConnectionMutation=h;var m=function(n){function e(){return null!==n&&n.apply(this,arguments)||this}return t(e,n),e.prototype.mutate=function(t){var n=t.connections.filter(function(t){return t.from.outgoing.length>1}).filter(function(t){return t.to.incoming.length>1}).filter(function(n){return t.nodes.indexOf(n.from)>t.nodes.indexOf(n.to)});if(n.length>0){var e=o.pickRandom(n);t.disconnect(e.from,e.to)}},e}(e);exports.SubBackConnectionMutation=m;var g=function(n){function e(t){void 0===t&&(t=!1);var o=n.call(this)||this;return o.mutateOutput=t,o}return t(e,n),e.prototype.mutate=function(t){var n=this.mutateOutput?t.nodes.filter(function(t){return void 0!==t&&!t.isInputNode()}):t.nodes.filter(function(t){return void 0!==t&&t.isHiddenNode()});if(n.length>=2){var e=o.pickRandom(n),i=o.pickRandom(n.filter(function(t){return t!==e})),r=e.bias,u=e.squash;e.bias=i.bias,e.squash=i.squash,i.bias=r,i.squash=u}},e}(e);exports.SwapNodesMutation=g,exports.ALL_MUTATIONS=[new i,new r,new u,new a,new c,new s,new f,new l,new v,new d,new p,new h,new m,new g],exports.FEEDFORWARD_MUTATIONS=[new i,new r,new u,new a,new c,new s,new f,new g];
},{"../architecture/Node":"architecture/Node.js","./Utils":"methods/Utils.js"}],"methods/Loss.js":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(n,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)n.hasOwnProperty(r)&&(t[r]=n[r])})(n,r)};return function(n,r){function o(){this.constructor=n}t(n,r),n.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}}();Object.defineProperty(exports,"__esModule",{value:!0});var n=function(){return function(){}}();exports.Loss=n;var r=function(n){function r(){return null!==n&&n.apply(this,arguments)||this}return t(r,n),r.prototype.calc=function(t,n){var r=0;return n.forEach(function(n,o){r-=t[o]*Math.log(Math.max(n,1e-15))+(1-t[o])*Math.log(1-Math.max(n,1e-15))}),r/n.length},r}(n);exports.CrossEntropyLoss=r;var o=function(n){function r(){return null!==n&&n.apply(this,arguments)||this}return t(r,n),r.prototype.calc=function(t,n){var r=0;return n.forEach(function(n,o){r+=Math.pow(t[o]-n,2)}),r/n.length},r}(n);exports.MSELoss=o;var e=function(n){function r(){return null!==n&&n.apply(this,arguments)||this}return t(r,n),r.prototype.calc=function(t,n){var r=0;return n.forEach(function(n,o){r+=Math.round(2*t[o])!==Math.round(2*n)?1:0}),r/n.length},r}(n);exports.BinaryLoss=e;var u=function(n){function r(){return null!==n&&n.apply(this,arguments)||this}return t(r,n),r.prototype.calc=function(t,n){var r=0;return n.forEach(function(n,o){r+=Math.abs(t[o]-n)}),r/n.length},r}(n);exports.MAELoss=u;var a=function(n){function r(){return null!==n&&n.apply(this,arguments)||this}return t(r,n),r.prototype.calc=function(t,n){var r=0;return n.forEach(function(n,o){r+=Math.abs((n-t[o])/Math.max(t[o],1e-15))}),r/n.length},r}(n);exports.MAPELoss=a;var c=function(n){function r(){return null!==n&&n.apply(this,arguments)||this}return t(r,n),r.prototype.calc=function(t,n){for(var r=0,o=0,e=0;e<n.length;e++)r+=Math.abs(t[e]-n[e]),o+=t[e];return r/o},r}(n);exports.WAPELoss=c;var i=function(n){function r(){return null!==n&&n.apply(this,arguments)||this}return t(r,n),r.prototype.calc=function(t,n){var r=0;return n.forEach(function(n,o){r+=Math.log(Math.max(t[o],1e-15))-Math.log(Math.max(n,1e-15))}),r/n.length},r}(n);exports.MSLELoss=i;var s=function(n){function r(){return null!==n&&n.apply(this,arguments)||this}return t(r,n),r.prototype.calc=function(t,n){var r=0;return n.forEach(function(n,o){r+=Math.max(0,1-n*t[o])}),r/n.length},r}(n);exports.HINGELoss=s,exports.ALL_LOSSES=[new r,new o,new e,new u,new a,new c,new i,new s];
},{}],"methods/Rate.js":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){return function(t){this.baseRate=t}}();exports.Rate=e;var r=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return t(r,e),r.prototype.calc=function(t){return this.baseRate},r}(e);exports.FixedRate=r;var n=function(e){function r(t,r,n){void 0===r&&(r=.9),void 0===n&&(n=100);var o=e.call(this,t)||this;return o.gamma=r,o.stepSize=n,o}return t(r,e),r.prototype.calc=function(t){return this.baseRate*Math.pow(this.gamma,Math.floor(t/this.stepSize))},r}(e);exports.StepRate=n;var o=function(e){function r(t,r){void 0===r&&(r=.999);var n=e.call(this,t)||this;return n.gamma=r,n}return t(r,e),r.prototype.calc=function(t){return this.baseRate*Math.pow(this.gamma,t)},r}(e);exports.ExponentialRate=o;var a=function(e){function r(t,r,n){void 0===r&&(r=.001),void 0===n&&(n=2);var o=e.call(this,t)||this;return o.gamma=r,o.power=n,o}return t(r,e),r.prototype.calc=function(t){return this.baseRate*Math.pow(1+this.gamma*t,-this.power)},r}(e);exports.InverseRate=a;
},{}],"methods/Selection.js":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(r,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var e in r)r.hasOwnProperty(e)&&(t[e]=r[e])})(r,e)};return function(r,e){function o(){this.constructor=r}t(r,e),r.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}}();Object.defineProperty(exports,"__esModule",{value:!0});var r=require("./Utils"),e=function(){return function(){}}();exports.Selection=e;var o=function(e){function o(){return null!==e&&e.apply(this,arguments)||this}return t(o,e),o.prototype.select=function(t){for(var e,o=0,n=0,i=0,s=t;i<s.length;i++){var u=(h=s[i]).score;n=void 0!==u&&u<n?u:n,o+=null!=u?u:0}o+=(n=Math.abs(n))*t.length;for(var c=r.randDouble(0,o),a=0,l=0,p=t;l<p.length;l++){var h;if(c<(a+=(null!==(e=(h=p[l]).score)&&void 0!==e?e:0)+n))return h}return r.pickRandom(t)},o}(e);exports.FitnessProportionateSelection=o;var n=function(r){function e(t){void 0===t&&(t=4);var e=r.call(this)||this;return e.power=t,e}return t(e,r),e.prototype.select=function(t){return t[Math.floor(Math.pow(Math.random(),this.power)*t.length)]},e}(e);exports.PowerSelection=n;var i=function(e){function o(t,r){void 0===t&&(t=5),void 0===r&&(r=.5);var o=e.call(this)||this;return o.size=t,o.probability=r,o}return t(o,e),o.prototype.select=function(t){if(this.size>t.length)throw new Error("Your tournament size should be lower than the population size, please change methods.selection.TOURNAMENT.size");for(var e=[],o=0;o<this.size;o++)e.push(r.pickRandom(t));e.sort(function(t,r){return void 0===r.score||void 0===t.score?0:r.score-t.score});for(o=0;o<this.size;o++)if(Math.random()<this.probability||o===this.size-1)return e[o];return r.pickRandom(t)},o}(e);exports.TournamentSelection=i;
},{"./Utils":"methods/Utils.js"}],"NEAT.js":[function(require,module,exports) {
"use strict";var t=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))(function(o,r){function a(t){try{u(i.next(t))}catch(e){r(e)}}function s(t){try{u(i.throw(t))}catch(e){r(e)}}function u(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n(function(t){t(e)})).then(a,s)}u((i=i.apply(t,e||[])).next())})},e=this&&this.__generator||function(t,e){var n,i,o,r,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return r={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function s(r){return function(s){return function(r){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,i&&(o=2&r[0]?i.return:r[0]?i.throw||((o=i.return)&&o.call(i),0):i.next)&&!(o=o.call(i,r[1])).done)return o;switch(i=0,o&&(r=[2&r[0],o.value]),r[0]){case 0:case 1:o=r;break;case 4:return a.label++,{value:r[1],done:!1};case 5:a.label++,i=r[1],r=[0];continue;case 7:r=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===r[0]||2===r[0])){a=0;continue}if(3===r[0]&&(!o||r[1]>o[0]&&r[1]<o[3])){a.label=r[1];break}if(6===r[0]&&a.label<o[1]){a.label=o[1],o=r;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(r);break}o[2]&&a.ops.pop(),a.trys.pop();continue}r=e.call(t,a)}catch(s){r=[6,s],i=0}finally{n=o=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}([r,s])}}},n=this&&this.__spreadArrays||function(){for(var t=0,e=0,n=arguments.length;e<n;e++)t+=arguments[e].length;var i=Array(t),o=0;for(e=0;e<n;e++)for(var r=arguments[e],a=0,s=r.length;a<s;a++,o++)i[o]=r[a];return i};Object.defineProperty(exports,"__esModule",{value:!0});var i=require("./architecture/Network"),o=require("./methods/Utils"),r=require("./methods/Selection"),a=require("./methods/Mutation"),s=function(){function s(t,e){void 0===e&&(e={}),this.dataset=t,this.generation=o.getOrDefault(e.generation,0),this.input=o.getOrDefault(e.input,1),this.output=o.getOrDefault(e.output,1),this.equal=o.getOrDefault(e.equal,!0),this.clear=o.getOrDefault(e.clear,!1),this.populationSize=o.getOrDefault(e.populationSize,50),this.elitism=o.getOrDefault(e.elitism,1),this.provenance=o.getOrDefault(e.provenance,0),this.mutationRate=o.getOrDefault(e.mutationRate,.4),this.mutationAmount=o.getOrDefault(e.mutationAmount,1),this.fitnessPopulation=o.getOrDefault(e.fitnessPopulation,!1),this.fitnessFunction=e.fitnessFunction,this.selection=o.getOrDefault(e.selection,new r.PowerSelection),this.mutations=o.getOrDefault(e.mutations,a.FEEDFORWARD_MUTATIONS),this.template=o.getOrDefault(e.template,new i.Network(this.input,this.output)),this.maxNodes=o.getOrDefault(e.maxNodes,1/0),this.maxConnections=o.getOrDefault(e.maxConnections,1/0),this.maxGates=o.getOrDefault(e.maxGates,1/0),this.population=[],this.createInitialPopulation()}return s.prototype.filterGenome=function(t,e,i,o){var r=n(t);return o?r.filter(function(t){return i(t)}).forEach(function(t,e){return r[e]=o(r[e])}):r.filter(function(t){return i(t)}).forEach(function(t,n){return r[n]=e.copy()}),r},s.prototype.mutateRandom=function(t,e){void 0===e&&(e=this.mutations);var n=this.maxNodes,i=this.maxConnections,r=this.maxGates;e=e.filter(function(e){return e.constructor.name!==a.AddNodeMutation.constructor.name||t.nodes.length<n||e.constructor.name!==a.AddConnectionMutation.constructor.name||t.connections.length<i||e.constructor.name!==a.AddGateMutation.constructor.name||t.gates.length<r}),t.mutate(o.pickRandom(e))},s.prototype.evolve=function(n,i){return t(this,void 0,void 0,function(){var t,o,r,a,s;return e(this,function(e){switch(e.label){case 0:if(this.elitism+this.provenance>this.populationSize)throw new Error("Can`t evolve! Elitism + provenance exceeds population size!");return void 0!==this.population[this.population.length-1].score?[3,2]:[4,this.evaluate(this.dataset)];case 1:e.sent(),e.label=2;case 2:for(n&&(this.population=this.filterGenome(this.population,this.template,n,i)),this.sort(),t=[],r=0;r<this.elitism;r++)t.push(this.population[r]);for(o=Array(this.provenance).fill(this.template.copy()),r=0;r<this.populationSize-this.elitism-this.provenance;r++)o.push(this.getOffspring());return this.population=o,this.mutate(void 0),(s=this.population).push.apply(s,t),[4,this.evaluate(this.dataset)];case 3:return e.sent(),n&&(this.population=this.filterGenome(this.population,this.template,n,i)),this.sort(),(a=this.population[0].copy()).score=this.population[0].score,this.population.forEach(function(t){return t.score=void 0}),this.generation++,[2,a]}})})},s.prototype.getOffspring=function(){this.sort();var t=this.selection.select(this.population),e=this.selection.select(this.population);if(null===t||null===e)throw new ReferenceError("Should not be null!");return i.Network.crossOver(t,e,this.equal)},s.prototype.mutate=function(t){var e=this;t?this.population.filter(function(){return Math.random()<=e.mutationRate}).forEach(function(n){for(var i=0;i<e.mutationAmount;i++)n.mutate(t)}):this.population.filter(function(){return Math.random()<=e.mutationRate}).forEach(function(t){for(var n=0;n<e.mutationAmount;n++)e.mutateRandom(t,e.mutations)})},s.prototype.evaluate=function(n){return t(this,void 0,void 0,function(){var t,i,o;return e(this,function(e){switch(e.label){case 0:return this.fitnessPopulation?(this.clear&&this.population.forEach(function(t){return t.clear()}),this.fitnessFunction?[4,this.fitnessFunction(n,this.population)]:[3,2]):[3,3];case 1:e.sent(),e.label=2;case 2:return[3,7];case 3:t=0,i=this.population,e.label=4;case 4:return t<i.length?(o=i[t],this.clear&&o.clear(),this.fitnessFunction?[4,this.fitnessFunction(n,o)]:[3,6]):[3,7];case 5:e.sent(),e.label=6;case 6:return t++,[3,4];case 7:return this.sort(),[2,this.population[0]]}})})},s.prototype.sort=function(){this.population.sort(function(t,e){return void 0===t.score||void 0===e.score?0:e.score-t.score})},s.prototype.getFittest=function(){return t(this,void 0,void 0,function(){return e(this,function(t){switch(t.label){case 0:return void 0!==this.population[this.population.length-1].score?[3,2]:[4,this.evaluate(this.dataset)];case 1:t.sent(),t.label=2;case 2:return this.sort(),[2,this.population[0]]}})})},s.prototype.getAverage=function(){return t(this,void 0,void 0,function(){var t;return e(this,function(e){switch(e.label){case 0:return void 0!==this.population[this.population.length-1].score?[3,2]:[4,this.evaluate(this.dataset)];case 1:e.sent(),e.label=2;case 2:return t=0,this.population.map(function(t){return t.score}).forEach(function(e){return t+=null!=e?e:0}),[2,t/this.population.length]}})})},s.prototype.createInitialPopulation=function(){for(var t=0;t<this.populationSize;t++)this.population.push(this.template.copy())},s}();exports.NEAT=s;
},{"./architecture/Network":"architecture/Network.js","./methods/Utils":"methods/Utils.js","./methods/Selection":"methods/Selection.js","./methods/Mutation":"methods/Mutation.js"}],"architecture/Network.js":[function(require,module,exports) {
"use strict";var t=this&&this.__awaiter||function(t,e,o,n){return new(o||(o=Promise))(function(i,r){function s(t){try{u(n.next(t))}catch(e){r(e)}}function a(t){try{u(n.throw(t))}catch(e){r(e)}}function u(t){var e;t.done?i(t.value):(e=t.value,e instanceof o?e:new o(function(t){t(e)})).then(s,a)}u((n=n.apply(t,e||[])).next())})},e=this&&this.__generator||function(t,e){var o,n,i,r,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return r={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function a(r){return function(a){return function(r){if(o)throw new TypeError("Generator is already executing.");for(;s;)try{if(o=1,n&&(i=2&r[0]?n.return:r[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,r[1])).done)return i;switch(n=0,i&&(r=[2&r[0],i.value]),r[0]){case 0:case 1:i=r;break;case 4:return s.label++,{value:r[1],done:!1};case 5:s.label++,n=r[1],r=[0];continue;case 7:r=s.ops.pop(),s.trys.pop();continue;default:if(!(i=(i=s.trys).length>0&&i[i.length-1])&&(6===r[0]||2===r[0])){s=0;continue}if(3===r[0]&&(!i||r[1]>i[0]&&r[1]<i[3])){s.label=r[1];break}if(6===r[0]&&s.label<i[1]){s.label=i[1],i=r;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(r);break}i[2]&&s.ops.pop(),s.trys.pop();continue}r=e.call(t,s)}catch(a){r=[6,a],n=0}finally{o=i=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}([r,a])}}};Object.defineProperty(exports,"__esModule",{value:!0});var o=require("./Connection"),n=require("./Node"),i=require("../methods/Utils"),r=require("../methods/Mutation"),s=require("../methods/Loss"),a=require("../methods/Rate"),u=require("../NEAT"),h=function(){function h(t,e){this.inputSize=t,this.outputSize=e,this.nodes=[],this.connections=[],this.gates=[],this.score=void 0;for(var o=0;o<t;o++)this.nodes.push(new n.Node(n.NodeType.INPUT));for(o=0;o<e;o++)this.nodes.push(new n.Node(n.NodeType.OUTPUT));for(o=0;o<this.inputSize;o++)for(var i=this.inputSize;i<this.outputSize+this.inputSize;i++){var r=(Math.random()-.5)*this.inputSize*Math.sqrt(2/this.inputSize);this.connect(this.nodes[o],this.nodes[i],r)}}return h.fromJSON=function(t){var e=new h(t.inputSize,t.outputSize);return e.nodes=[],e.connections=[],t.nodes.map(function(t){return n.Node.fromJSON(t)}).forEach(function(t){return e.nodes[t.index]=t}),t.connections.forEach(function(t){var o=e.connect(e.nodes[t.fromIndex],e.nodes[t.toIndex],t.weight);null!=t.gateNodeIndex&&e.addGate(e.nodes[t.gateNodeIndex],o)}),e},h.crossOver=function(t,e,r){if(t.inputSize!==e.inputSize||t.outputSize!==e.outputSize)throw new Error("Networks don`t have the same input/output size!");var s=new h(t.inputSize,t.outputSize);s.connections=[],s.nodes=[];var a,u=t.score||0,c=e.score||0;if(r||u===c){var d=Math.max(t.nodes.length,e.nodes.length),l=Math.min(t.nodes.length,e.nodes.length);a=i.randInt(l,d+1)}else a=u>c?t.nodes.length:e.nodes.length;for(var f=t.inputSize,p=t.outputSize,g=0;g<t.nodes.length;g++)t.nodes[g].index=g;for(g=0;g<e.nodes.length;g++)e.nodes[g].index=g;for(g=0;g<a;g++){var v=void 0,m=null;if(g<f){m=n.NodeType.INPUT;for(var w=i.randBoolean()?t:e,S=-1,N=-1;S<g;){if(++N>=w.nodes.length)throw RangeError("something is wrong with the size of the input");w.nodes[N].isInputNode()&&S++}v=w.nodes[N]}else if(g<f+p){m=n.NodeType.OUTPUT;w=i.randBoolean()?t:e;var z=-1;for(N=-1;z<g-f;){if(++N>=w.nodes.length)throw RangeError("something is wrong with the size of the output");w.nodes[N].isOutputNode()&&z++}v=w.nodes[N]}else{m=n.NodeType.HIDDEN;w=void 0;w=g>=t.nodes.length?e:g>=e.nodes.length?t:i.randBoolean()?t:e,v=i.pickRandom(w.nodes)}var y=new n.Node(m);y.bias=v.bias,y.squash=v.squash,s.nodes.push(y)}var O=[],x=[];t.connections.forEach(function(t){O[o.Connection.innovationID(t.from.index,t.to.index)]=t.toJSON()}),e.connections.forEach(function(t){x[o.Connection.innovationID(t.from.index,t.to.index)]=t.toJSON()});var E=[],b=Object.keys(O),I=Object.keys(x);for(g=b.length-1;g>=0;g--)void 0!==x[parseInt(b[g])]?(E.push(i.randBoolean()?O[parseInt(b[g])]:x[parseInt(b[g])]),x[parseInt(b[g])]=void 0):(u>=c||r)&&E.push(O[parseInt(b[g])]);return(c>=u||r)&&I.map(function(t){return parseInt(t)}).map(function(t){return x[t]}).filter(function(t){return void 0!==t}).forEach(function(t){return E.push(t)}),E.forEach(function(t){if(void 0!==t&&t.toIndex<a&&t.fromIndex<a){var e=s.nodes[t.fromIndex],o=s.nodes[t.toIndex],n=s.connect(e,o,t.weight);null!==t.gateNodeIndex&&t.gateNodeIndex<a&&s.addGate(s.nodes[t.gateNodeIndex],n)}}),s},h.prototype.copy=function(){return h.fromJSON(this.toJSON())},h.prototype.connect=function(t,e,o){void 0===o&&(o=0);var n=t.connect(e,o);return this.connections.push(n),n},h.prototype.activate=function(t,e,o){void 0===e&&(e=0),void 0===o&&(o=!0);for(var n=0,i=0,r=this.nodes;i<r.length;i++){var s=r[i];if(n===this.inputSize)break;s.isInputNode()&&s.activate(t[n++],o)}if(n!==t.length)throw Error("There are "+n+" input nodes, but "+t.length+" inputs were passed");this.nodes.filter(function(t){return t.isHiddenNode()}).forEach(function(t){e&&(t.mask=Math.random()>=e?1:0),t.activate(void 0,o)});for(var a=[],u=0,h=this.nodes;u<h.length;u++){s=h[u];if(a.length===this.outputSize)break;s.isOutputNode()&&a.push(s.activate(void 0,o))}if(a.length!==this.outputSize)throw Error("There are "+this.outputSize+" output nodes, but "+a.length+" outputs were passed");return a},h.prototype.propagate=function(t,e,o,n){if(n.length!==this.outputSize)throw new Error("Output target length should match network output length");for(var i=0,r=0;i<this.outputSize;r++)this.nodes[r].isOutputNode()&&this.nodes[r].propagate(n[i++],e,t,o);for(r=this.nodes.length-1;r>=0;r--)this.nodes[r].isHiddenNode()&&this.nodes[r].propagate(void 0,t,e,o);this.nodes.filter(function(t){return t.isInputNode()}).forEach(function(n){n.propagate(void 0,t,e,o)})},h.prototype.clear=function(){this.nodes.forEach(function(t){return t.clear()})},h.prototype.disconnect=function(t,e){var o=this;return this.connections.filter(function(e){return e.from===t}).filter(function(t){return t.to===e}).forEach(function(t){null!==t.gateNode&&o.removeGate(t),i.remove(o.connections,t)}),t.disconnect(e)},h.prototype.addGate=function(t,e){if(-1===this.nodes.indexOf(t))throw new ReferenceError("This node is not part of the network!");null==e.gateNode&&(t.addGate(e),this.gates.push(e))},h.prototype.removeGate=function(t){if(!i.anyMatch(this.gates,t))throw new Error("This connection is not gated!");i.remove(this.gates,t),null!=t.gateNode&&t.gateNode.removeGate(t)},h.prototype.removeNode=function(t,e){var o=this;if(void 0===e&&(e=(new r.SubNodeMutation).keepGates),!i.anyMatch(this.nodes,t))throw new ReferenceError("This node does not exist in the network!");this.disconnect(t,t);for(var n=[],s=[],a=[],u=t.incoming.length-1;u>=0;u--){var h=t.incoming[u];e&&null!==h.gateNode&&h.gateNode!==t&&s.push(h.gateNode),n.push(h.from),this.disconnect(h.from,t)}for(u=t.outgoing.length-1;u>=0;u--){h=t.outgoing[u];e&&null!==h.gateNode&&h.gateNode!==t&&s.push(h.gateNode),a.push(h.to),this.disconnect(t,h.to)}var c=[];for(n.forEach(function(t){a.forEach(function(e){t.isProjectingTo(e)||c.push(o.connect(t,e))})});s.length>0&&c.length>0;){var d=s.shift();if(void 0!==d){h=i.pickRandom(c);this.addGate(d,h),i.remove(c,h)}}for(u=t.gated.length-1;u>=0;u--)this.removeGate(t.gated[u]);i.remove(this.nodes,t)},h.prototype.mutate=function(t,e,o,n){var i;void 0===e&&(e=1/0),void 0===o&&(o=1/0),void 0===n&&(n=1/0),t.mutate(this,null!==(i=null!=e?e:o)&&void 0!==i?i:n)},h.prototype.mutateRandom=function(t,e,o,n){void 0===t&&(t=r.ALL_MUTATIONS),void 0===e&&(e=1/0),void 0===o&&(o=1/0),void 0===n&&(n=1/0),0!==t.length&&this.mutate(i.pickRandom(t),e||1/0,o||1/0,n||1/0)},h.prototype.train=function(t,e){var o;if(void 0===e&&(e={}),t[0].input.length!==this.inputSize||t[0].output.length!==this.outputSize)throw new Error("Dataset input/output size should be same as network input/output size!");e.iterations=i.getOrDefault(e.iterations,100),e.error=i.getOrDefault(e.error,.05),e.loss=i.getOrDefault(e.loss,new s.MSELoss);var n=i.getOrDefault(e.rate,.3);e.dropout=i.getOrDefault(e.dropout,0),e.momentum=i.getOrDefault(e.momentum,0),e.batchSize=Math.min(t.length,i.getOrDefault(e.batchSize,1)),e.ratePolicy=i.getOrDefault(e.ratePolicy,new a.FixedRate(n)),e.log=i.getOrDefault(e.log,NaN);var r,u,h,c,d=e.error<=0?-1:e.error,l=Date.now();if(e.iterations<=0&&e.error<=0)throw new Error("At least one of the following options must be specified: error, iterations");e.crossValidateTestSize&&e.crossValidateTestSize>0?(r=Math.ceil((1-e.crossValidateTestSize)*t.length),u=t.slice(0,r),h=t.slice(r)):(u=t,h=[]);for(var f=0,p=1;p>d&&(e.iterations<=0||f<e.iterations);){f++,c=e.ratePolicy.calc(f);var g=this.trainEpoch(u,e.batchSize,c,e.momentum,e.loss,e.dropout);e.clear&&this.clear(),e.crossValidateTestSize?(p=this.test(h,e.loss),e.clear&&this.clear()):p=g,null!==(o=e.shuffle)&&void 0!==o&&o&&i.shuffle(t),e.log>0&&f%e.log==0&&console.log("iteration number",f,"error",p,"training rate",c),e.schedule&&f%e.schedule.iterations==0&&e.schedule.function(p,f)}return e.clear&&this.clear(),{error:p,iterations:f,time:Date.now()-l}},h.prototype.trainEpoch=function(t,e,o,n,i,r){void 0===r&&(r=.5);for(var s=0,a=0;a<t.length;a++){var u=t[a].input,h=t[a].output,c=(a+1)%e==0||a+1===t.length,d=this.activate(u,r);this.propagate(o,n,c,h),s+=i.calc(h,d)}return s/t.length},h.prototype.test=function(t,e){void 0===e&&(e=new s.MSELoss);for(var o=0,n=0,i=t;n<i.length;n++){var r=i[n],a=r.input,u=r.output,h=this.activate(a,void 0,!1);o+=e.calc(u,h)}return o/t.length},h.prototype.toJSON=function(){for(var t={nodes:[],connections:[],inputSize:this.inputSize,outputSize:this.outputSize},e=0;e<this.nodes.length;e++)this.nodes[e].index=e;return this.nodes.forEach(function(e){t.nodes.push(e.toJSON()),0!==e.selfConnection.weight&&t.connections.push(e.selfConnection.toJSON())}),this.connections.forEach(function(e){return t.connections.push(e.toJSON())}),t},h.prototype.evolve=function(o,n){var r,a,h;return void 0===n&&(n={}),t(this,void 0,void 0,function(){var c,d,l,f,p,g,v,m;return e(this,function(w){switch(w.label){case 0:if(o[0].input.length!==this.inputSize||o[0].output.length!==this.outputSize)throw new Error("Dataset input/output size should be same as network input/output size!");c=0,void 0===n.iterations&&void 0===n.error?(n.iterations=1e3,c=.05):n.iterations?c=-1:n.error&&(c=n.error,n.iterations=0),n.growth=i.getOrDefault(n.growth,1e-4),n.loss=i.getOrDefault(n.loss,new s.MSELoss),n.amount=i.getOrDefault(n.amount,1),n.fitnessPopulation=i.getOrDefault(n.fitnessPopulation,!1),n.maxNodes=i.getOrDefault(n.maxNodes,1/0),n.maxConnections=i.getOrDefault(n.maxConnections,1/0),n.maxGates=i.getOrDefault(n.maxGates,1/0),d=Date.now(),n.fitnessFunction=function(o,i){return t(this,void 0,void 0,function(){var r=this;return e(this,function(s){switch(s.label){case 0:return Array.isArray(i)||(i=[i]),[4,Promise.all(i.map(function(i){return t(r,void 0,void 0,function(){var t,r,s,a,u;return e(this,function(e){for(t=0,r=0;r<(null!==(s=n.amount)&&void 0!==s?s:1);r++)t-=i.test(o,n.loss);return t-=null!==(a=n.growth)&&void 0!==a?a:1e-4*(i.nodes.length-i.inputSize-i.outputSize+i.connections.length+i.gates.length),i.score=t/(null!==(u=n.amount)&&void 0!==u?u:1),[2]})})}))];case 1:return s.sent(),[2]}})})},n.fitnessPopulation=!0,n.template=this,n.input=this.inputSize,n.output=this.outputSize,l=new u.NEAT(o,n),f=-1/0,p=-1/0,w.label=1;case 1:return f<-c&&(0===n.iterations||l.generation<(null!==(r=n.iterations)&&void 0!==r?r:0))?[4,l.evolve(void 0,void 0)]:[3,3];case 2:return v=w.sent(),m=void 0===v.score?-1/0:v.score,f=m+n.growth*(v.nodes.length-v.inputSize-v.outputSize+v.connections.length+v.gates.length),m>p&&(p=m,g=v),(null!==(a=n.log)&&void 0!==a?a:0)>0&&l.generation%(null!==(h=n.log)&&void 0!==h?h:0)==0&&console.log("iteration",l.generation,"fitness",m,"error",-f),n.schedule&&l.generation%n.schedule.iterations==0&&n.schedule.function(m,-f,l.generation),[3,1];case 3:return void 0!==g&&(this.nodes=g.nodes,this.connections=g.connections,this.gates=g.gates,n.clear&&this.clear()),[2,{error:-f,iterations:l.generation,time:Date.now()-d}]}})})},h}();exports.Network=h;
},{"./Connection":"architecture/Connection.js","./Node":"architecture/Node.js","../methods/Utils":"methods/Utils.js","../methods/Mutation":"methods/Mutation.js","../methods/Loss":"methods/Loss.js","../methods/Rate":"methods/Rate.js","../NEAT":"NEAT.js"}],"architecture/node.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t,i=require("../methods/Activation"),e=require("./Connection"),o=require("../methods/Utils"),s=function(){function s(s){void 0===s&&(s=t.HIDDEN),this.type=s,this.bias=o.randDouble(-1,1),this.squash=new i.LogisticActivation,this.activation=0,this.state=0,this.old=0,this.mask=1,this.deltaBiasPrevious=0,this.deltaBiasTotal=0,this.incoming=[],this.outgoing=[],this.gated=[],this.selfConnection=new e.Connection(this,this,0),this.errorResponsibility=0,this.errorProjected=0,this.errorGated=0,this.index=NaN}return s.fromJSON=function(t){var e=new s;return e.bias=t.bias,e.type=t.type,e.squash=i.Activation.getActivation(t.squash),e.mask=t.mask,e.index=t.index,e},s.prototype.clear=function(){for(var t=0,i=this.incoming;t<i.length;t++){(s=i[t]).eligibility=0,s.xTraceNodes=[],s.xTraceValues=[]}for(var e=0,o=this.gated;e<o.length;e++){var s;(s=o[e]).gain=0}this.errorResponsibility=this.errorProjected=this.errorGated=0,this.old=this.state=this.activation=0},s.prototype.mutateBias=function(t){this.bias+=o.randDouble(t.min,t.max)},s.prototype.mutateActivation=function(){var t;do{t=o.pickRandom(i.ALL_ACTIVATIONS)}while(t===this.squash.type);this.squash=i.Activation.getActivation(t)},s.prototype.isProjectedBy=function(t){return t===this?0!==this.selfConnection.weight:o.anyMatch(this.incoming.map(function(t){return t.from}),t)},s.prototype.isProjectingTo=function(t){return t===this?0!==this.selfConnection.weight:o.anyMatch(this.outgoing.map(function(t){return t.to}),t)},s.prototype.addGate=function(t){this.gated.push(t),t.gateNode=this},s.prototype.removeGate=function(t){o.remove(this.gated,t),t.gateNode=null,t.gain=1},s.prototype.connect=function(t,i,o){if(void 0===i&&(i=0),void 0===o&&(o=!1),t===this)return this.selfConnection.weight=i||1,this.selfConnection;if(this.isProjectingTo(t))throw new ReferenceError;var s=new e.Connection(this,t,i);return this.outgoing.push(s),t.incoming.push(s),o&&t.connect(this),s},s.prototype.disconnect=function(t,i){if(void 0===i&&(i=!1),t===this)return this.selfConnection.weight=0,this.selfConnection;for(var e=0,s=this.outgoing;e<s.length;e++){var n=s[e];if(n.to===t)return o.remove(this.outgoing,n),o.remove(n.to.incoming,n),void 0!==n.gateNode&&null!=n.gateNode&&n.gateNode.removeGate(n),i&&t.disconnect(this),n}throw new Error("No connection found!")},s.prototype.propagate=function(t,i,e,o){if(void 0!==t&&Number.isFinite(t))this.errorResponsibility=this.errorProjected=t-this.activation;else{this.errorProjected=0;for(var s=0,n=this.outgoing;s<n.length;s++){var r=n[s];this.errorProjected+=r.to.errorResponsibility*r.weight*r.gain}this.errorProjected*=this.derivative||1,this.errorGated=0;for(var a=0,h=this.gated;a<h.length;a++){var c=void 0;c=(v=(r=h[a]).to).selfConnection.gateNode===this?v.old+r.weight*r.from.activation:r.weight*r.from.activation,this.errorGated+=v.errorResponsibility*c}this.errorGated*=this.derivative||1,this.errorResponsibility=this.errorProjected+this.errorGated}for(var l=0,d=this.incoming;l<d.length;l++){r=d[l];for(var u=this.errorProjected*r.eligibility,g=0;g<r.xTraceNodes.length;g++){var v;u+=(v=r.xTraceNodes[g]).errorResponsibility*r.xTraceValues[g]}r.deltaWeightsTotal+=e*u*this.mask,o&&(r.deltaWeightsTotal+=i*r.deltaWeightsPrevious,r.weight+=r.deltaWeightsTotal,r.deltaWeightsPrevious=r.deltaWeightsTotal,r.deltaWeightsTotal=0)}return this.deltaBiasTotal+=e*this.errorResponsibility,o&&(this.deltaBiasTotal+=i*this.deltaBiasPrevious,this.bias+=this.deltaBiasTotal,this.deltaBiasPrevious=this.deltaBiasTotal,this.deltaBiasTotal=0),{responsibility:this.errorResponsibility,projected:this.errorProjected,gated:this.errorGated}},s.prototype.activate=function(t,i){var e=this;if(void 0===t&&(t=null),void 0===i&&(i=!0),null!==t&&Number.isFinite(t))return this.activation=t;if(i){this.old=this.state,this.state=this.selfConnection.gain*this.selfConnection.weight*this.state+this.bias,this.incoming.forEach(function(t){e.state+=t.from.activation*t.weight*t.gain}),this.activation=this.squash.calc(this.state,!1)*this.mask,this.derivative=this.squash.calc(this.state,!0);var o=[],s=[];this.gated.forEach(function(t){t.gain=e.activation;var i=o.indexOf(t.to);i>-1?s[i]+=t.weight*t.from.activation:(o.push(t.to),t.to.selfConnection.gateNode===e?s.push(t.weight*t.from.activation+t.to.old):s.push(t.weight*t.from.activation))});for(var n=0,r=this.incoming;n<r.length;n++){(g=r[n]).eligibility=this.selfConnection.gain*this.selfConnection.weight*g.eligibility+g.from.activation*g.gain;for(var a=0;a<o.length;a++){var h=o[a],c=s[a],l=g.xTraceNodes.indexOf(h);l>-1?g.xTraceValues[l]=h.selfConnection.gain*h.selfConnection.weight*g.xTraceValues[l]+this.derivative*g.eligibility*c:(g.xTraceNodes.push(h),g.xTraceValues.push(this.derivative*g.eligibility*c))}}return this.activation}if(this.isInputNode())return this.activation=0;this.state=this.selfConnection.gain*this.selfConnection.weight*this.state+this.bias;for(var d=0,u=this.incoming;d<u.length;d++){var g=u[d];this.state+=g.from.activation*g.weight*g.gain}this.activation=this.squash.calc(this.state,!1);for(var v=0,f=this.gated;v<f.length;v++){(g=f[v]).gain=this.activation}return this.activation},s.prototype.toJSON=function(){return{bias:this.bias,type:this.type,squash:this.squash.type,mask:this.mask,index:this.index}},s.prototype.isInputNode=function(){return this.type===t.INPUT},s.prototype.isHiddenNode=function(){return this.type===t.HIDDEN},s.prototype.isOutputNode=function(){return this.type===t.OUTPUT},s}();exports.Node=s,function(t){t[t.INPUT=0]="INPUT",t[t.HIDDEN=1]="HIDDEN",t[t.OUTPUT=2]="OUTPUT"}(t=exports.NodeType||(exports.NodeType={}));
},{"../methods/Activation":"methods/Activation.js","./Connection":"architecture/Connection.js","../methods/Utils":"methods/Utils.js"}],"index.js":[function(require,module,exports) {
"use strict";

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result["default"] = mod;
  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Layer_1 = require("./architecture/layer/Layer");

exports.Layer = Layer_1.Layer;

var ConvolutionLayer_1 = require("./architecture/layer/ConvolutionLayer");

exports.ConvolutionLayer = ConvolutionLayer_1.ConvolutionLayer;

var DenseLayer_1 = require("./architecture/layer/DenseLayer");

exports.DenseLayer = DenseLayer_1.DenseLayer;

var GaussianNoiseLayer_1 = require("./architecture/layer/GaussianNoiseLayer");

exports.GaussianNoiseLayer = GaussianNoiseLayer_1.GaussianNoiseLayer;

var InputLayer_1 = require("./architecture/layer/InputLayer");

exports.InputLayer = InputLayer_1.InputLayer;

var LSTMLayer_1 = require("./architecture/layer/LSTMLayer");

exports.LSTMLayer = LSTMLayer_1.LSTMLayer;

var PoolLayer_1 = require("./architecture/layer/PoolLayer");

exports.PoolLayer = PoolLayer_1.PoolLayer;

var RNNLayer_1 = require("./architecture/layer/RNNLayer");

exports.RNNLayer = RNNLayer_1.RNNLayer;

var Architect_1 = require("./architecture/Architect");

exports.Architect = Architect_1.Architect;

var Connection_1 = require("./architecture/Connection");

exports.Connection = Connection_1.Connection;

var Network_1 = require("./architecture/Network");

exports.Network = Network_1.Network;

var node_1 = require("./architecture/node");

exports.Node = node_1.Node;

var Activation = __importStar(require("./methods/Activation"));

exports.Activation = Activation;

var Loss = __importStar(require("./methods/Loss"));

exports.Loss = Loss;

var Mutation = __importStar(require("./methods/Mutation"));

exports.Mutation = Mutation;

var Rate = __importStar(require("./methods/Rate"));

exports.Rate = Rate;

var Selection = __importStar(require("./methods/Selection"));

exports.Selection = Selection;

var NEAT_1 = require("./NEAT");

exports.NEAT = NEAT_1.NEAT;
},{"./architecture/layer/Layer":"architecture/layer/Layer.js","./architecture/layer/ConvolutionLayer":"architecture/layer/ConvolutionLayer.js","./architecture/layer/DenseLayer":"architecture/layer/DenseLayer.js","./architecture/layer/GaussianNoiseLayer":"architecture/layer/GaussianNoiseLayer.js","./architecture/layer/InputLayer":"architecture/layer/InputLayer.js","./architecture/layer/LSTMLayer":"architecture/layer/LSTMLayer.js","./architecture/layer/PoolLayer":"architecture/layer/PoolLayer.js","./architecture/layer/RNNLayer":"architecture/layer/RNNLayer.js","./architecture/Architect":"architecture/Architect.js","./architecture/Connection":"architecture/Connection.js","./architecture/Network":"architecture/Network.js","./architecture/node":"architecture/node.js","./methods/Activation":"methods/Activation.js","./methods/Loss":"methods/Loss.js","./methods/Mutation":"methods/Mutation.js","./methods/Rate":"methods/Rate.js","./methods/Selection":"methods/Selection.js","./NEAT":"NEAT.js"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = process.env.HMR_HOSTNAME || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + process.env.HMR_PORT + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], "carrot")
//# sourceMappingURL=/index.browser.js.map