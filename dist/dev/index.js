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
})({"../src/enums/ConnectionType.js":[function(require,module,exports) {
"use strict";var O;Object.defineProperty(exports,"__esModule",{value:!0}),exports.ConnectionType=void 0,function(O){O[O.NO_CONNECTION=0]="NO_CONNECTION",O[O.ALL_TO_ALL=1]="ALL_TO_ALL",O[O.ONE_TO_ONE=2]="ONE_TO_ONE",O[O.POOLING=3]="POOLING"}(O=exports.ConnectionType||(exports.ConnectionType={}));
},{}],"../src/enums/NodeType.js":[function(require,module,exports) {
"use strict";var e,o,N;Object.defineProperty(exports,"__esModule",{value:!0}),exports.NoiseNodeType=exports.PoolNodeType=exports.NodeType=void 0,function(e){e[e.INPUT=0]="INPUT",e[e.HIDDEN=1]="HIDDEN",e[e.OUTPUT=2]="OUTPUT"}(e=exports.NodeType||(exports.NodeType={})),function(e){e[e.MAX_POOLING=0]="MAX_POOLING",e[e.AVG_POOLING=1]="AVG_POOLING",e[e.MIN_POOLING=2]="MIN_POOLING"}(o=exports.PoolNodeType||(exports.PoolNodeType={})),function(e){e[e.GAUSSIAN_NOISE=0]="GAUSSIAN_NOISE"}(N=exports.NoiseNodeType||(exports.NoiseNodeType={}));
},{}],"../src/utils/Utils.js":[function(require,module,exports) {
"use strict";function r(r){if(0===r.length)throw new RangeError("Cannot pick from an empty array");return r[e(0,r.length)]}function e(r,e){return Math.floor(Math.random()*(e-r)+r)}function n(r,e){return Math.random()*(e-r)+r}function t(){return Math.random()>=.5}function o(r,e){var n=r.indexOf(e);return-1!==n&&(r.splice(n,1),!0)}function a(r,e){return null!=r?r:e}function u(r){for(var n=r.length-1;n>0;n--){var t=e(0,n),o=r[n];r[n]=r[t],r[t]=o}}function s(r){if(0===r.length)throw new RangeError;for(var e=r[0],n=1;n<r.length;n++)r[n]>e&&(e=r[n]);return e}function x(r){if(0===r.length)throw new RangeError;for(var e=r[0],n=0,t=1;t<r.length;t++)r[t]>e&&(e=r[t],n=t);return n}function f(r){if(0===r.length)throw new RangeError;for(var e=r[0],n=0,t=1;t<r.length;t++)r[t]<e&&(e=r[t],n=t);return n}function i(r){if(0===r.length)throw new RangeError;for(var e=r[0],n=1;n<r.length;n++)r[n]<e&&(e=r[n]);return e}function p(r){return l(r)/r.length}function l(r){if(0===r.length)throw new RangeError;for(var e=0,n=0,t=r;n<t.length;n++){e+=t[n]}return e}function h(r,e){void 0===r&&(r=0),void 0===e&&(e=2);for(var n=0,t=0;t<10;t++)n+=Math.random();return e*n/10+r-.5*e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.generateGaussian=exports.avg=exports.sum=exports.min=exports.minValueIndex=exports.maxValueIndex=exports.max=exports.shuffle=exports.getOrDefault=exports.removeFromArray=exports.randBoolean=exports.randDouble=exports.randInt=exports.pickRandom=void 0,exports.pickRandom=r,exports.randInt=e,exports.randDouble=n,exports.randBoolean=t,exports.removeFromArray=o,exports.getOrDefault=a,exports.shuffle=u,exports.max=s,exports.maxValueIndex=x,exports.minValueIndex=f,exports.min=i,exports.avg=p,exports.sum=l,exports.generateGaussian=h;
},{}],"../src/methods/Mutation.js":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(n,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var o in n)n.hasOwnProperty(o)&&(t[o]=n[o])})(n,o)};return function(n,o){function e(){this.constructor=n}t(n,o),n.prototype=null===o?Object.create(o):(e.prototype=o.prototype,new e)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.SwapNodesMutation=exports.SubBackConnectionMutation=exports.AddBackConnectionMutation=exports.SubSelfConnectionMutation=exports.AddSelfConnectionMutation=exports.SubGateMutation=exports.AddGateMutation=exports.ModActivationMutation=exports.ModBiasMutation=exports.ModWeightMutation=exports.SubConnectionMutation=exports.AddConnectionMutation=exports.SubNodeMutation=exports.AddNodeMutation=exports.Mutation=exports.ONLY_STRUCTURE=exports.NO_STRUCTURE_MUTATIONS=exports.FEEDFORWARD_MUTATIONS=exports.ALL_MUTATIONS=void 0;var n=require("../architecture/Node"),o=require("../enums/NodeType"),e=require("../utils/Utils"),i=function(){return function(){}}();exports.Mutation=i;var r=function(i){function r(t){void 0===t&&(t=!0);var n=i.call(this)||this;return n.randomActivation=t,n}return t(r,i),r.prototype.mutate=function(t,i){if(void 0===i&&(i={}),!(void 0!==i.maxNodes&&t.nodes.length>=i.maxNodes)){var r=new n.Node(o.NodeType.HIDDEN);this.randomActivation&&r.mutateActivation();var u=e.pickRandom(Array.from(t.connections)),a=u.from,s=u.to;t.disconnect(a,s);var c=Math.max(t.inputSize,1+t.nodes.indexOf(a));t.nodes.splice(c,0,r);var d=t.connect(a,r,1),p=t.connect(r,s,u.weight);null!=u.gateNode&&(e.randBoolean()?t.addGate(u.gateNode,d):t.addGate(u.gateNode,p))}},r}(i);exports.AddNodeMutation=r;var u=function(n){function o(t){void 0===t&&(t=!0);var o=n.call(this)||this;return o.keepGates=t,o}return t(o,n),o.prototype.mutate=function(t){var n=t.nodes.filter(function(t){return void 0!==t&&t.isHiddenNode()});n.length>0&&t.removeNode(e.pickRandom(n),this.keepGates)},o}(i);exports.SubNodeMutation=u;var a=function(n){function o(){return null!==n&&n.apply(this,arguments)||this}return t(o,n),o.prototype.mutate=function(t,n){if(void 0===n&&(n={}),!(void 0!==n.maxConnections&&t.connections.size>=n.maxConnections)){for(var o=[],i=0;i<t.nodes.length-t.outputSize;i++)for(var r=t.nodes[i],u=Math.max(i+1,t.inputSize);u<t.nodes.length;u++){var a=t.nodes[u];r.isProjectingTo(a)||o.push([r,a])}if(o.length>0){var s=e.pickRandom(o);t.connect(s[0],s[1])}}},o}(i);exports.AddConnectionMutation=a;var s=function(n){function o(){return null!==n&&n.apply(this,arguments)||this}return t(o,n),o.prototype.mutate=function(t){var n=Array.from(t.connections).filter(function(t){return t.from.outgoing.size>1}).filter(function(t){return t.to.incoming.size>1}).filter(function(n){return t.nodes.indexOf(n.to)>t.nodes.indexOf(n.from)});if(n.length>0){var o=e.pickRandom(n);t.disconnect(o.from,o.to)}},o}(i);exports.SubConnectionMutation=s;var c=function(n){function o(t,o){void 0===t&&(t=-1),void 0===o&&(o=1);var e=n.call(this)||this;return e.min=t,e.max=o,e}return t(o,n),o.prototype.mutate=function(t){e.pickRandom(Array.from(t.connections)).weight+=e.randDouble(this.min,this.max)},o}(i);exports.ModWeightMutation=c;var d=function(n){function o(t,o){void 0===t&&(t=-1),void 0===o&&(o=1);var e=n.call(this)||this;return e.min=t,e.max=o,e}return t(o,n),o.prototype.mutate=function(t){e.pickRandom(t.nodes.filter(function(t){return!t.isInputNode()})).mutateBias(this)},o}(i);exports.ModBiasMutation=d;var p=function(n){function o(t){void 0===t&&(t=!1);var o=n.call(this)||this;return o.mutateOutput=t,o}return t(o,n),o.prototype.mutate=function(t,n){void 0===n&&(n={});var o=this.mutateOutput?t.nodes.filter(function(t){return!t.isInputNode()}):t.nodes.filter(function(t){return t.isHiddenNode()});o.length>0&&e.pickRandom(o).mutateActivation(n.allowedActivations)},o}(i);exports.ModActivationMutation=p;var f=function(n){function o(){return null!==n&&n.apply(this,arguments)||this}return t(o,n),o.prototype.mutate=function(t){var n=t.nodes.filter(function(t){return!t.isInputNode()}).filter(function(t){return 0===t.selfConnection.weight});if(n.length>0){var o=e.pickRandom(n);t.connect(o,o)}},o}(i);exports.AddSelfConnectionMutation=f;var l=function(n){function o(){return null!==n&&n.apply(this,arguments)||this}return t(o,n),o.prototype.mutate=function(t){var n=Array.from(t.connections).filter(function(t){return t.from===t.to});if(n.length>0){var o=e.pickRandom(n);t.disconnect(o.from,o.to)}},o}(i);exports.SubSelfConnectionMutation=l;var v=function(n){function o(){return null!==n&&n.apply(this,arguments)||this}return t(o,n),o.prototype.mutate=function(t,n){if(void 0===n&&(n={}),!(void 0!==n.maxGates&&t.gates.size>=n.maxGates)){var o=Array.from(t.connections).filter(function(t){return null===t.gateNode});if(o.length>0){var i=e.pickRandom(t.nodes.filter(function(t){return!t.isInputNode()})),r=e.pickRandom(o);t.addGate(i,r)}}},o}(i);exports.AddGateMutation=v;var m=function(n){function o(){return null!==n&&n.apply(this,arguments)||this}return t(o,n),o.prototype.mutate=function(t){t.gates.size>0&&t.removeGate(e.pickRandom(Array.from(t.gates)))},o}(i);exports.SubGateMutation=m;var h=function(n){function o(){return null!==n&&n.apply(this,arguments)||this}return t(o,n),o.prototype.mutate=function(t){for(var n=[],o=t.inputSize;o<t.nodes.length;o++)for(var i=t.nodes[o],r=t.inputSize;r<o;r++){var u=t.nodes[r];i.isProjectingTo(u)||n.push([i,u])}if(n.length>0){var a=e.pickRandom(n);t.connect(a[0],a[1])}},o}(i);exports.AddBackConnectionMutation=h;var x=function(n){function o(){return null!==n&&n.apply(this,arguments)||this}return t(o,n),o.prototype.mutate=function(t){var n=Array.from(t.connections).filter(function(t){return t.from.outgoing.size>1}).filter(function(t){return t.to.incoming.size>1}).filter(function(n){return t.nodes.indexOf(n.from)>t.nodes.indexOf(n.to)});if(n.length>0){var o=e.pickRandom(n);t.disconnect(o.from,o.to)}},o}(i);exports.SubBackConnectionMutation=x;var w=function(n){function o(t){void 0===t&&(t=!1);var o=n.call(this)||this;return o.mutateOutput=t,o}return t(o,n),o.prototype.mutate=function(t){var n=this.mutateOutput?t.nodes.filter(function(t){return void 0!==t&&!t.isInputNode()}):t.nodes.filter(function(t){return void 0!==t&&t.isHiddenNode()});if(n.length>=2){var o=e.pickRandom(n),i=e.pickRandom(n.filter(function(t){return t!==o})),r=o.bias,u=o.squash;o.bias=i.bias,o.squash=i.squash,i.bias=r,i.squash=u}},o}(i);exports.SwapNodesMutation=w;var M=[new r,new u,new a,new s,new c,new d,new p,new v,new m,new f,new l,new h,new x,new w];exports.ALL_MUTATIONS=M;var y=[new r,new u,new a,new s,new c,new d,new p,new w];exports.FEEDFORWARD_MUTATIONS=y;var N=[new c,new d,new p];exports.NO_STRUCTURE_MUTATIONS=N;var A=[new r,new u,new a,new s,new v,new m,new f,new l,new h,new x,new w];exports.ONLY_STRUCTURE=A;
},{"../architecture/Node":"../src/architecture/Node.js","../enums/NodeType":"../src/enums/NodeType.js","../utils/Utils":"../src/utils/Utils.js"}],"../src/architecture/Connection.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Connection=void 0;var t=function(){function t(t,e,i,n){this.from=t,this.to=e,this.weight=null!=i?i:0,this.gain=1,this.eligibility=0,this.deltaWeightsPrevious=0,this.deltaWeightsTotal=0,this.xTrace=new Map,n?(this.gateNode=n,n.addGate(this)):this.gateNode=null}return t.innovationID=function(t,e){return.5*(t+e)*(t+e+1)+e},t.prototype.toJSON=function(){return{fromIndex:this.from.index,toIndex:this.to.index,gateNodeIndex:null===this.gateNode?null:this.gateNode.index,weight:this.weight}},t}();exports.Connection=t;
},{}],"../src/architecture/Node.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Node=void 0;var t=require("activations/build/src"),i=require("../enums/NodeType"),e=require("../methods/Mutation"),o=require("../utils/Utils"),n=require("./Connection"),s=function(){function s(e){void 0===e&&(e=i.NodeType.HIDDEN),this.type=e,this.bias=o.randDouble(-1,1),this.squash=t.Logistic,this.activation=0,this.derivativeState=1,this.state=0,this.old=0,this.mask=1,this.deltaBiasPrevious=0,this.deltaBiasTotal=0,this.incoming=new Set,this.outgoing=new Set,this.gated=new Set,this.selfConnection=new n.Connection(this,this,0),this.errorResponsibility=0,this.errorProjected=0,this.errorGated=0,this.index=NaN}return s.prototype.fromJSON=function(i){var e,n,s,r;return this.bias=null!==(e=i.bias)&&void 0!==e?e:o.randDouble(-1,1),this.type=i.type,this.squash=null!==(n=i.squash)&&void 0!==n?n:t.Logistic,this.mask=null!==(s=i.mask)&&void 0!==s?s:1,this.index=null!==(r=i.index)&&void 0!==r?r:NaN,this},s.prototype.clear=function(){this.incoming.forEach(function(t){t.eligibility=0,t.xTrace.clear()}),this.gated.forEach(function(t){return t.gain=0}),this.errorResponsibility=this.errorProjected=this.errorGated=0,this.old=this.state=this.activation=0},s.prototype.mutateBias=function(t){void 0===t&&(t=new e.ModBiasMutation),this.bias+=o.randDouble(t.min,t.max)},s.prototype.mutateActivation=function(i){var e=this;void 0===i&&(i=Object.values(t.ALL_ACTIVATIONS));var n=i.filter(function(t){return t!==e.squash});n.length>0&&(this.squash=o.pickRandom(n))},s.prototype.isProjectedBy=function(t){return t===this?0!==this.selfConnection.weight:Array.from(this.incoming).map(function(t){return t.from}).includes(t)},s.prototype.isProjectingTo=function(t){return t===this?0!==this.selfConnection.weight:Array.from(this.outgoing).map(function(t){return t.to}).includes(t)},s.prototype.addGate=function(t){this.gated.add(t),t.gateNode=this},s.prototype.removeGate=function(t){this.gated.delete(t),t.gateNode=null,t.gain=1},s.prototype.connect=function(t,i,e){if(void 0===i&&(i=1),void 0===e&&(e=!1),t===this)return this.selfConnection.weight=i,this.selfConnection;if(this.isProjectingTo(t))throw new ReferenceError("Their is already a connection!");var o=new n.Connection(this,t,i);return this.outgoing.add(o),t.incoming.add(o),e&&t.connect(this),o},s.prototype.disconnect=function(t,i){if(void 0===i&&(i=!1),t===this)return this.selfConnection.weight=0,this.selfConnection;var e=Array.from(this.outgoing).filter(function(i){return i.to===t});if(0===e.length)throw new Error("No Connection found");var o=e[0];return this.outgoing.delete(o),o.to.incoming.delete(o),void 0!==o.gateNode&&null!=o.gateNode&&o.gateNode.removeGate(o),i&&t.disconnect(this),o},s.prototype.propagate=function(t,i){var e=this;void 0===i&&(i={}),i.momentum=o.getOrDefault(i.momentum,0),i.rate=o.getOrDefault(i.rate,.3),i.update=o.getOrDefault(i.update,!0),void 0!==t&&Number.isFinite(t)?this.errorResponsibility=this.errorProjected=t-this.activation:(this.errorProjected=0,this.outgoing.forEach(function(t){e.errorProjected+=t.to.errorResponsibility*t.weight*t.gain}),this.errorProjected*=this.derivativeState,this.errorGated=0,this.gated.forEach(function(t){var i;i=t.to.selfConnection.gateNode===e?t.to.old+t.weight*t.from.activation:t.weight*t.from.activation,e.errorGated+=t.to.errorResponsibility*i}),this.errorGated*=this.derivativeState,this.errorResponsibility=this.errorProjected+this.errorGated),this.incoming.forEach(function(t){var o,n,s=e.errorProjected*t.eligibility;t.xTrace.forEach(function(t,i){return s+=i.errorResponsibility*t}),t.deltaWeightsTotal+=(null!==(o=i.rate)&&void 0!==o?o:.3)*s*e.mask,i.update&&(t.deltaWeightsTotal+=(null!==(n=i.momentum)&&void 0!==n?n:0)*t.deltaWeightsPrevious,t.weight+=t.deltaWeightsTotal,t.deltaWeightsPrevious=t.deltaWeightsTotal,t.deltaWeightsTotal=0)}),this.deltaBiasTotal+=i.rate*this.errorResponsibility,i.update&&(this.deltaBiasTotal+=i.momentum*this.deltaBiasPrevious,this.bias+=this.deltaBiasTotal,this.deltaBiasPrevious=this.deltaBiasTotal,this.deltaBiasTotal=0)},s.prototype.activate=function(t,i){var e=this;if(void 0===i&&(i=!0),void 0!==t)return this.activation=t;if(this.isInputNode())throw new ReferenceError("There is no input given to an input node!");if(i){this.old=this.state,this.state=this.selfConnection.gain*this.selfConnection.weight*this.state+this.bias,this.incoming.forEach(function(t){e.state+=t.from.activation*t.weight*t.gain}),this.activation=this.squash(this.state,!1)*this.mask,this.derivativeState=this.squash(this.state,!0);var o=[],n=[];return this.gated.forEach(function(t){t.gain=e.activation;var i=o.indexOf(t.to);i>-1?n[i]+=t.weight*t.from.activation:(o.push(t.to),t.to.selfConnection.gateNode===e?n.push(t.weight*t.from.activation+t.to.old):n.push(t.weight*t.from.activation))}),this.incoming.forEach(function(t){var i;t.eligibility=e.selfConnection.gain*e.selfConnection.weight*t.eligibility+t.from.activation*t.gain;for(var s=0;s<o.length;s++){var r=o[s],a=n[s];t.xTrace.has(r)?t.xTrace.set(r,r.selfConnection.gain*r.selfConnection.weight*(null!==(i=t.xTrace.get(r))&&void 0!==i?i:0)+e.derivativeState*t.eligibility*a):t.xTrace.set(r,e.derivativeState*t.eligibility*a)}}),this.activation}return this.isInputNode()?this.activation=0:(this.state=this.selfConnection.gain*this.selfConnection.weight*this.state+this.bias,this.incoming.forEach(function(t){return e.state+=t.from.activation*t.weight*t.gain}),this.activation=this.squash(this.state,!1),this.gated.forEach(function(t){return t.gain=e.activation}),this.activation)},s.prototype.toJSON=function(){return{bias:this.bias,type:this.type,squash:this.squash,mask:this.mask,index:this.index}},s.prototype.isInputNode=function(){return this.type===i.NodeType.INPUT},s.prototype.isHiddenNode=function(){return this.type===i.NodeType.HIDDEN},s.prototype.isOutputNode=function(){return this.type===i.NodeType.OUTPUT},s.prototype.setBias=function(t){return this.bias=t,this},s.prototype.setActivationType=function(t){return this.squash=t,this},s}();exports.Node=s;
},{"../enums/NodeType":"../src/enums/NodeType.js","../methods/Mutation":"../src/methods/Mutation.js","../utils/Utils":"../src/utils/Utils.js","./Connection":"../src/architecture/Connection.js"}],"../src/enums/GatingType.js":[function(require,module,exports) {
"use strict";var e;Object.defineProperty(exports,"__esModule",{value:!0}),exports.GatingType=void 0,function(e){e[e.INPUT=0]="INPUT",e[e.SELF=1]="SELF",e[e.OUTPUT=2]="OUTPUT"}(e=exports.GatingType||(exports.GatingType={}));
},{}],"../src/architecture/Layers/Layer.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Layer=void 0;var n=require("../../enums/ConnectionType"),e=require("../../enums/GatingType"),o=function(){function o(n){this.outputSize=n,this.nodes=[],this.inputNodes=new Set,this.outputNodes=new Set,this.connections=[],this.gates=[]}return o.connect=function(e,t,r,i){if(void 0===r&&(r=n.ConnectionType.ALL_TO_ALL),void 0===i&&(i=1),r===n.ConnectionType.NO_CONNECTION)throw new ReferenceError("Cannot connect with 'NO_CONNECTION' connection type");var c=Array.from(e instanceof o?e.outputNodes:e),a=Array.from(t instanceof o?t.inputNodes:t);if(0===a.length)throw new ReferenceError("Target from has no input nodes!");if(0===c.length)throw new ReferenceError("This from has no output nodes!");var u=[];if(r===n.ConnectionType.ALL_TO_ALL)c.forEach(function(n){a.forEach(function(e){u.push(n.connect(e,i))})});else if(r===n.ConnectionType.ONE_TO_ONE){if(c.length!==a.length)throw new RangeError("Can't connect one to one! Number of output nodes from are unequal number of incoming nodes from next layer!");for(var f=0;f<c.length;f++)u.push(c[f].connect(a[f],i))}else if(r===n.ConnectionType.POOLING){var s=a.length/c.length;u.push.apply(u,c.map(function(n,e){return n.connect(a[Math.floor(e*s)],i)}))}return u},o.gate=function(n,o,t){var r=[];switch(t){case e.GatingType.INPUT:for(var i=Array.from(new Set(o.map(function(n){return n.to}))),c=function(e){var t=i[e],c=n[e%n.length];t.incoming.forEach(function(n){o.includes(n)&&(c.addGate(n),r.push(n))})},a=0;a<i.length;a++)c(a);break;case e.GatingType.SELF:var u=Array.from(new Set(o.map(function(n){return n.from})));for(a=0;a<u.length;a++)o.includes(u[a].selfConnection)&&(n[a%n.length].addGate(u[a].selfConnection),r.push(u[a].selfConnection));break;case e.GatingType.OUTPUT:u=Array.from(new Set(o.map(function(n){return n.from})));var f=function(e){var t=u[e],i=n[e%n.length];t.outgoing.forEach(function(n){o.includes(n)&&(i.addGate(n),r.push(n))})};for(a=0;a<u.length;a++)f(a)}return r},o}();exports.Layer=o;
},{"../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../enums/GatingType":"../src/enums/GatingType.js"}],"../src/architecture/Nodes/ConstantNode.js":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(e,o)};return function(e,o){function n(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.ConstantNode=void 0;var e=require("activations/build/src"),o=require("../../enums/NodeType"),n=require("../Node"),r=function(n){function r(){var t=n.call(this,o.NodeType.HIDDEN)||this;return t.bias=1,t}return t(r,n),r.prototype.fromJSON=function(t){var o,n;return this.index=null!==(o=t.index)&&void 0!==o?o:-1,this.squash=null!==(n=t.squash)&&void 0!==n?n:e.Identitiy,this},r.prototype.toJSON=function(){return{index:this.index,squash:this.squash}},r.prototype.mutateBias=function(){throw new ReferenceError("Cannot mutate a pool node!")},r.prototype.mutateActivation=function(){throw new ReferenceError("Cannot mutate a pool node!")},r.prototype.addGate=function(){throw new ReferenceError("A pool node can't gate a connection!")},r.prototype.removeGate=function(){throw new ReferenceError("A pool node can't gate a connection!")},r.prototype.setBias=function(){throw new ReferenceError("Cannot set the bias of a pool node!")},r}(n.Node);exports.ConstantNode=r;
},{"../../enums/NodeType":"../src/enums/NodeType.js","../Node":"../src/architecture/Node.js"}],"../src/architecture/Nodes/NoiseNode.js":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(e,i)};return function(e,i){function o(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(o.prototype=i.prototype,new o)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.NoiseNode=void 0;var e=require("../../enums/NodeType"),i=require("../../utils/Utils"),o=require("./ConstantNode"),r=function(o){function r(t){void 0===t&&(t={});var r=o.call(this)||this;return r.noiseType=i.getOrDefault(t.noiseType,e.NoiseNodeType.GAUSSIAN_NOISE),r.options=t,r}return t(r,o),r.prototype.activate=function(){var t,o,r,n;this.old=this.state;var s=Array.from(this.incoming).map(function(t){return t.from.activation*t.weight*t.gain});switch(this.noiseType){case e.NoiseNodeType.GAUSSIAN_NOISE:this.state=i.avg(s)+i.generateGaussian(null!==(o=null===(t=this.options.gaussian)||void 0===t?void 0:t.mean)&&void 0!==o?o:0,null!==(n=null===(r=this.options.gaussian)||void 0===r?void 0:r.deviation)&&void 0!==n?n:2);break;default:throw new ReferenceError("Cannot activate this noise type!")}return this.activation=this.squash(this.state,!1)*this.mask,this.derivativeState=this.squash(this.state,!0),this.activation},r.prototype.propagate=function(t,e){var o=this;void 0===e&&(e={}),e.momentum=i.getOrDefault(e.momentum,0),e.rate=i.getOrDefault(e.rate,.3),e.update=i.getOrDefault(e.update,!0);var r=Array.from(this.outgoing).map(function(t){return t.to.errorResponsibility*t.weight*t.gain});this.errorResponsibility=this.errorProjected=i.sum(r)*this.derivativeState,this.incoming.forEach(function(t){var i,r,n=o.errorProjected*t.eligibility;t.xTrace.forEach(function(t,e){n+=e.errorResponsibility*t}),t.deltaWeightsTotal+=(null!==(i=e.rate)&&void 0!==i?i:.3)*n*o.mask,e.update&&(t.deltaWeightsTotal+=(null!==(r=e.momentum)&&void 0!==r?r:0)*t.deltaWeightsPrevious,t.weight+=t.deltaWeightsTotal,t.deltaWeightsPrevious=t.deltaWeightsTotal,t.deltaWeightsTotal=0)})},r}(o.ConstantNode);exports.NoiseNode=r;
},{"../../enums/NodeType":"../src/enums/NodeType.js","../../utils/Utils":"../src/utils/Utils.js","./ConstantNode":"../src/architecture/Nodes/ConstantNode.js"}],"../src/architecture/Layers/NoiseLayers/NoiseLayer.js":[function(require,module,exports) {
"use strict";var e=this&&this.__extends||function(){var e=function(o,t){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,o){e.__proto__=o}||function(e,o){for(var t in o)o.hasOwnProperty(t)&&(e[t]=o[t])})(o,t)};return function(o,t){function n(){this.constructor=o}e(o,t),o.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.NoiseLayer=void 0;var o=require("activations/build/src"),t=require("../../../enums/ConnectionType"),n=require("../../../enums/NodeType"),r=require("../../Nodes/NoiseNode"),i=require("../Layer"),u=function(i){function u(e,t){var u,s;void 0===t&&(t={});for(var p=i.call(this,e)||this,c=null!==(s=t.activation)&&void 0!==s?s:o.Identitiy,a=0;a<e;a++)p.inputNodes.add(new r.NoiseNode({noiseType:n.NoiseNodeType.GAUSSIAN_NOISE,gaussian:t}).setActivationType(c));return p.outputNodes=p.inputNodes,(u=p.nodes).push.apply(u,Array.from(p.inputNodes)),p}return e(u,i),u.prototype.getDefaultIncomingConnectionType=function(){return t.ConnectionType.ONE_TO_ONE},u.prototype.connectionTypeisAllowed=function(e){return e===t.ConnectionType.ONE_TO_ONE},u}(i.Layer);exports.NoiseLayer=u;
},{"../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../Nodes/NoiseNode":"../src/architecture/Nodes/NoiseNode.js","../Layer":"../src/architecture/Layers/Layer.js"}],"../src/architecture/Layers/CoreLayers/InputLayer.js":[function(require,module,exports) {
"use strict";var e=this&&this.__extends||function(){var e=function(n,o){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var o in n)n.hasOwnProperty(o)&&(e[o]=n[o])})(n,o)};return function(n,o){function t(){this.constructor=n}e(n,o),n.prototype=null===o?Object.create(o):(t.prototype=o.prototype,new t)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.InputLayer=void 0;var n=require("../../../enums/ConnectionType"),o=require("../../../enums/NodeType"),t=require("../../Node"),r=require("../Layer"),i=require("../NoiseLayers/NoiseLayer"),u=function(u){function c(e,n){var c;void 0===n&&(n={});for(var p=u.call(this,e)||this,s=0;s<e;s++){var a=new t.Node(o.NodeType.INPUT);p.nodes.push(a)}if(n.noise){var y=new i.NoiseLayer(n.noise);y.outputNodes.forEach(function(e){return p.outputNodes.add(e)}),(c=p.connections).push.apply(c,r.Layer.connect(p.nodes,y,y.getDefaultIncomingConnectionType()))}else p.nodes.forEach(function(e){return p.outputNodes.add(e)});return p}return e(c,u),c.prototype.getDefaultIncomingConnectionType=function(){return n.ConnectionType.NO_CONNECTION},c.prototype.connectionTypeisAllowed=function(e){return e===n.ConnectionType.NO_CONNECTION},c}(r.Layer);exports.InputLayer=u;
},{"../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../Node":"../src/architecture/Node.js","../Layer":"../src/architecture/Layers/Layer.js","../NoiseLayers/NoiseLayer":"../src/architecture/Layers/NoiseLayers/NoiseLayer.js"}],"../src/architecture/Layers/CoreLayers/OutputLayer.js":[function(require,module,exports) {
"use strict";var e=this&&this.__extends||function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.OutputLayer=void 0;var t=require("activations/build/src"),n=require("../../../enums/ConnectionType"),o=require("../../../enums/NodeType"),r=require("../../Node"),i=require("../Layer"),u=function(i){function u(e,n){var u,c;void 0===n&&(n={});for(var p=i.call(this,e)||this,a=null!==(c=n.activation)&&void 0!==c?c:t.Identitiy,s=0;s<e;s++)p.inputNodes.add(new r.Node(o.NodeType.OUTPUT).setActivationType(a));return(u=p.nodes).push.apply(u,Array.from(p.inputNodes)),p}return e(u,i),u.prototype.connect=function(){throw new ReferenceError("Could not connect an OutputLayer!")},u.prototype.connectionTypeisAllowed=function(e){return!0},u.prototype.getDefaultIncomingConnectionType=function(){return n.ConnectionType.ALL_TO_ALL},u}(i.Layer);exports.OutputLayer=u;
},{"../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../Node":"../src/architecture/Node.js","../Layer":"../src/architecture/Layers/Layer.js"}],"../src/methods/Loss.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ALL_LOSSES=exports.HINGELoss=exports.MSLELoss=exports.WAPELoss=exports.MAPELoss=exports.MAELoss=exports.BinaryLoss=exports.MBELoss=exports.MSELoss=void 0;var s=require("../utils/Utils");exports.MSELoss=function(s,o){var t=0;return o.forEach(function(o,r){t+=Math.pow(s[r]-o,2)}),t/o.length},exports.MBELoss=function(s,o){var t=0;return o.forEach(function(o,r){t+=s[r]-o}),t/o.length},exports.BinaryLoss=function(s,o){var t=0;return o.forEach(function(o,r){t+=Math.round(2*s[r])!==Math.round(2*o)?1:0}),t/o.length},exports.MAELoss=function(s,o){var t=0;return o.forEach(function(o,r){t+=Math.abs(s[r]-o)}),t/o.length},exports.MAPELoss=function(s,o){var t=0;return o.forEach(function(o,r){t+=Math.abs((o-s[r])/Math.max(s[r],1e-15))}),t/o.length},exports.WAPELoss=function(o,t){var r=0;return t.forEach(function(s,t){r+=Math.abs(o[t]-s)}),r/s.sum(o)},exports.MSLELoss=function(s,o){var t=0;return o.forEach(function(o,r){t+=Math.log(Math.max(s[r],1e-15))-Math.log(Math.max(o,1e-15))}),t/o.length},exports.HINGELoss=function(s,o){var t=0;return o.forEach(function(o,r){t+=Math.max(0,1-o*s[r])}),t/o.length},exports.ALL_LOSSES={MSELoss:exports.MSELoss,MBELoss:exports.MBELoss,BinaryLoss:exports.BinaryLoss,MAELoss:exports.MAELoss,MAPELoss:exports.MAPELoss,WAPELoss:exports.WAPELoss,MSLELoss:exports.MSLELoss,HINGELoss:exports.HINGELoss};
},{"../utils/Utils":"../src/utils/Utils.js"}],"../src/methods/Rate.js":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function o(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.InverseRate=exports.ExponentialRate=exports.StepRate=exports.FixedRate=exports.Rate=void 0;var e=function(){return function(t){this.baseRate=t}}();exports.Rate=e;var r=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return t(r,e),r.prototype.calc=function(t){return this.baseRate},r}(e);exports.FixedRate=r;var o=function(e){function r(t,r,o){void 0===r&&(r=.9),void 0===o&&(o=100);var n=e.call(this,t)||this;return n.gamma=r,n.stepSize=o,n}return t(r,e),r.prototype.calc=function(t){return this.baseRate*Math.pow(this.gamma,Math.floor(t/this.stepSize))},r}(e);exports.StepRate=o;var n=function(e){function r(t,r){void 0===r&&(r=.999);var o=e.call(this,t)||this;return o.gamma=r,o}return t(r,e),r.prototype.calc=function(t){return this.baseRate*Math.pow(this.gamma,t)},r}(e);exports.ExponentialRate=n;var a=function(e){function r(t,r,o){void 0===r&&(r=.001),void 0===o&&(o=2);var n=e.call(this,t)||this;return n.gamma=r,n.power=o,n}return t(r,e),r.prototype.calc=function(t){return this.baseRate*Math.pow(1+this.gamma*t,-this.power)},r}(e);exports.InverseRate=a;
},{}],"../src/methods/Selection.js":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(e,o)};return function(e,o){function r(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.TournamentSelection=exports.PowerSelection=exports.FitnessProportionateSelection=exports.Selection=void 0;var e=require("../utils/Utils"),o=function(){return function(){}}();exports.Selection=o;var r=function(o){function r(){return null!==o&&o.apply(this,arguments)||this}return t(r,o),r.prototype.select=function(t){for(var o,r,n,i=0,s=0,u=0,c=t;u<c.length;u++){var a=c[u];s=Math.min(null!==(o=a.score)&&void 0!==o?o:s,s),i+=null!==(r=a.score)&&void 0!==r?r:0}i+=(s=Math.abs(s))*t.length;for(var l=e.randDouble(0,i),p=0,h=0,f=t;h<f.length;h++){if(l<(p+=(null!==(n=(a=f[h]).score)&&void 0!==n?n:0)+s))return a}return e.pickRandom(t)},r}(o);exports.FitnessProportionateSelection=r;var n=function(e){function o(t){void 0===t&&(t=4);var o=e.call(this)||this;return o.power=t,o}return t(o,e),o.prototype.select=function(t){return t[Math.floor(Math.pow(Math.random(),this.power)*t.length)]},o}(o);exports.PowerSelection=n;var i=function(o){function r(t,e){void 0===t&&(t=5),void 0===e&&(e=.5);var r=o.call(this)||this;return r.size=t,r.probability=e,r}return t(r,o),r.prototype.select=function(t){if(this.size>t.length)throw new Error("Your tournament size should be lower than the population size, please change methods.selection.TOURNAMENT.size");for(var o=[],r=0;r<this.size;r++)o.push(e.pickRandom(t));o.sort(function(t,e){return void 0===e.score||void 0===t.score?0:e.score-t.score});for(r=0;r<this.size;r++)if(Math.random()<this.probability||r===this.size-1)return o[r];return e.pickRandom(t)},r}(o);exports.TournamentSelection=i;
},{"../utils/Utils":"../src/utils/Utils.js"}],"../src/NEAT.js":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NEAT = void 0;

var src_1 = require("activations/build/src");

var Network_1 = require("./architecture/Network");

var Mutation_1 = require("./methods/Mutation");

var Selection_1 = require("./methods/Selection");

var Utils_1 = require("./utils/Utils");
/**
 * Runs the NEAT algorithm on group of neural networks.
 *
 * @constructs Neat
 */


var NEAT =
/** @class */
function () {
  /**
   * Constructs a NEAT object.
   *
   * @param options
   * @time O(n)
   */
  function NEAT(options) {
    if (!options.fitnessFunction) {
      throw new ReferenceError("No fitness function given!");
    }

    this.dataset = options.dataset;

    if (options.dataset && options.dataset.length > 0) {
      this.input = options.dataset[0].input.length;
      this.output = options.dataset[0].output.length;
    } else {
      this.input = Utils_1.getOrDefault(options.input, 0);
      this.output = Utils_1.getOrDefault(options.output, 0);
    }

    this.generation = Utils_1.getOrDefault(options.generation, 0);
    this.equal = Utils_1.getOrDefault(options.equal, true);
    this.clear = Utils_1.getOrDefault(options.clear, false);
    this.populationSize = Utils_1.getOrDefault(options.populationSize, 50);
    this.elitism = Utils_1.getOrDefault(options.elitism, 2);
    this.provenance = Utils_1.getOrDefault(options.provenance, 0);
    this.mutationRate = Utils_1.getOrDefault(options.mutationRate, 0.6);
    this.mutationAmount = Utils_1.getOrDefault(options.mutationAmount, 5);
    this.fitnessFunction = options.fitnessFunction;
    this.selection = Utils_1.getOrDefault(options.selection, new Selection_1.FitnessProportionateSelection());
    this.mutations = Utils_1.getOrDefault(options.mutations, Mutation_1.FEEDFORWARD_MUTATIONS);
    this.activations = Utils_1.getOrDefault(options.activations, Object.values(src_1.ALL_ACTIVATIONS));
    this.template = Utils_1.getOrDefault(options.template, new Network_1.Network(this.input, this.output));
    this.maxNodes = Utils_1.getOrDefault(options.maxNodes, Infinity);
    this.maxConnections = Utils_1.getOrDefault(options.maxConnections, Infinity);
    this.maxGates = Utils_1.getOrDefault(options.maxGates, Infinity);
    this.population = [];

    for (var i = 0; i < this.populationSize; i++) {
      this.population.push(this.template.copy());
    }
  }
  /**
   * Filter genomes from population
   *
   * @param pickGenome Pick a network from the population which gets adjusted or removed
   * @param adjustGenome Adjust the picked network
   * @time O(n * time for adjust genome)
   */


  NEAT.prototype.filterGenome = function (pickGenome, adjustGenome) {
    var _this = this;

    return this.population.filter(function (genome) {
      return pickGenome(genome);
    }).map(function (genome) {
      return adjustGenome ? adjustGenome(genome) : _this.template.copy();
    });
  };
  /**
   * Mutate a network with a random mutation from the allowed array.
   *
   * @param network The network which will be mutated.
   * @time O(n&sup3;)
   */


  NEAT.prototype.mutateRandom = function (network) {
    var _this = this;

    var allowed = this.mutations.filter(function (method) {
      return method.constructor.name !== Mutation_1.AddNodeMutation.constructor.name || network.nodes.length < _this.maxNodes || method.constructor.name !== Mutation_1.AddConnectionMutation.constructor.name || network.connections.size < _this.maxConnections || method.constructor.name !== Mutation_1.AddGateMutation.constructor.name || network.gates.size < _this.maxGates;
    });
    network.mutate(Utils_1.pickRandom(allowed), {
      allowedActivations: this.activations
    });
  };
  /**
   * Evaluates, selects, breeds and mutates population
   *
   * @param {function} [pickGenome] A custom selection function to pick out unwanted genomes. Accepts a network as a parameter and returns true for selection.
   * @param {function} [adjustGenome=self.template] Accepts a network, modifies it, and returns it. Used to modify unwanted genomes returned by `pickGenome` and reincorporate them into the population. If left unset, unwanted genomes will be replaced with the template Network. Will only run when pickGenome is defined.
   *
   * @time O(time for fitness function + n * time for adjust genome + n&sup5;)
   * @returns {Network} Fittest network
   */


  NEAT.prototype.evolve = function (pickGenome, adjustGenome) {
    return __awaiter(this, void 0, void 0, function () {
      var elitists, i, newPopulation, i, fittest;

      var _a;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            // Check if evolve is possible
            if (this.elitism + this.provenance > this.populationSize) {
              throw new Error("Can`t evolve! Elitism + provenance exceeds population size!");
            }

            if (!(this.population[this.population.length - 1].score === undefined)) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , this.evaluate()];

          case 1:
            _b.sent();

            _b.label = 2;

          case 2:
            if (pickGenome) {
              this.population = this.filterGenome(pickGenome, adjustGenome);
            } // Sort in order of fitness (fittest first)


            this.sort();
            elitists = [];

            for (i = 0; i < this.elitism; i++) {
              elitists.push(this.population[i]);
            }

            newPopulation = Array(this.provenance).fill(this.template.copy()); // Breed the next individuals

            for (i = 0; i < this.populationSize - this.elitism - this.provenance; i++) {
              newPopulation.push(this.getOffspring());
            } // Replace the old population with the new population


            this.population = newPopulation; // Mutate the new population

            this.mutate(); // Add the elitists

            (_a = this.population).push.apply(_a, elitists); // evaluate the population


            return [4
            /*yield*/
            , this.evaluate()];

          case 3:
            // evaluate the population
            _b.sent(); // Check & adjust genomes as needed


            if (pickGenome) {
              this.population = this.filterGenome(pickGenome, adjustGenome);
            } // Sort in order of fitness (fittest first)


            this.sort();
            fittest = this.population[0].copy();
            fittest.score = this.population[0].score; // Reset the scores

            this.population.forEach(function (genome) {
              return genome.score = undefined;
            });
            this.generation++;
            return [2
            /*return*/
            , fittest];
        }
      });
    });
  };
  /**
   * Selects two genomes from the population with `getParent()`, and returns the offspring from those parents. NOTE: Population MUST be sorted
   *
   * @time O(n + time for crossover)
   * @returns {Network} Child network
   */


  NEAT.prototype.getOffspring = function () {
    this.sort();
    var parent1 = this.selection.select(this.population);
    var parent2 = this.selection.select(this.population);

    if (parent1 === null || parent2 === null) {
      throw new ReferenceError("Should not be null!");
    }

    return Network_1.Network.crossOver(parent1, parent2, this.equal);
  };
  /**
   * Mutates the given (or current) population
   *
   * @param {Mutation} [method] A mutation method to mutate the population with. When not specified will pick a random mutation from the set allowed mutations.
   * @time O(n&sup5;)
   */


  NEAT.prototype.mutate = function (method) {
    var _this = this; // Elitist genomes should not be included


    this.population.filter(function () {
      return Math.random() <= _this.mutationRate;
    }).forEach(function (genome) {
      for (var i = 0; i < _this.mutationAmount; i++) {
        if (method) {
          genome.mutate(method);
        } else {
          _this.mutateRandom(genome);
        }
      }
    });
  };
  /**
   * Evaluates the current population, basically sets their `.score` property
   *
   * @time O(n&sup3; + time for fitness function)
   * @return {Network} Fittest Network
   */


  NEAT.prototype.evaluate = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (this.clear) {
              this.population.forEach(function (genome) {
                return genome.clear();
              });
            }

            return [4
            /*yield*/
            , this.fitnessFunction(this.population, this.dataset)];

          case 1:
            _a.sent(); // Sort the population in order of fitness


            this.sort();
            return [2
            /*return*/
            , this.population[0]];
        }
      });
    });
  };
  /**
   * Sorts the population by score (descending)
   * @time O(n)
   * @todo implement a quicksort algorithm in utils
   */


  NEAT.prototype.sort = function () {
    this.population.sort(function (a, b) {
      return a.score === undefined || b.score === undefined ? 0 : b.score - a.score;
    });
  };
  /**
   * Returns the fittest genome of the current population
   *
   * @time O(n + time for fitness function)
   * @returns {Network} Current population's fittest genome
   */


  NEAT.prototype.getFittest = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!(this.population[this.population.length - 1].score === undefined)) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , this.evaluate()];

          case 1:
            _a.sent();

            _a.label = 2;

          case 2:
            this.sort();
            return [2
            /*return*/
            , this.population[0]];
        }
      });
    });
  };
  /**
   * Returns the average fitness of the current population
   *
   * @time O(n + time for fitness function)
   * @returns {number} Average fitness of the current population
   */


  NEAT.prototype.getAverage = function () {
    return __awaiter(this, void 0, void 0, function () {
      var score;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!(this.population[this.population.length - 1].score === undefined)) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , this.evaluate()];

          case 1:
            _a.sent();

            _a.label = 2;

          case 2:
            score = 0;
            this.population.map(function (genome) {
              return genome.score;
            }).forEach(function (val) {
              return score += val !== null && val !== void 0 ? val : 0;
            });
            return [2
            /*return*/
            , score / this.population.length];
        }
      });
    });
  };
  /**
   * Replace the whole population with the new genomes
   * @param genomes the genomes which replace the population
   * @time O(1)
   */


  NEAT.prototype.replacePopulation = function (genomes) {
    this.population = genomes;
    this.populationSize = genomes.length;
  };

  return NEAT;
}();

exports.NEAT = NEAT;
},{"./architecture/Network":"../src/architecture/Network.js","./methods/Mutation":"../src/methods/Mutation.js","./methods/Selection":"../src/methods/Selection.js","./utils/Utils":"../src/utils/Utils.js"}],"../src/architecture/Network.js":[function(require,module,exports) {
"use strict";var t=this&&this.__assign||function(){return(t=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)},e=this&&this.__awaiter||function(t,e,n,o){return new(n||(n=Promise))(function(r,i){function s(t){try{u(o.next(t))}catch(e){i(e)}}function a(t){try{u(o.throw(t))}catch(e){i(e)}}function u(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n(function(t){t(e)})).then(s,a)}u((o=o.apply(t,e||[])).next())})},n=this&&this.__generator||function(t,e){var n,o,r,i,s={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,o&&(r=2&i[0]?o.return:i[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,i[1])).done)return r;switch(o=0,r&&(i=[2&i[0],r.value]),i[0]){case 0:case 1:r=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,o=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!(r=(r=s.trys).length>0&&r[r.length-1])&&(6===i[0]||2===i[0])){s=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){s.label=i[1];break}if(6===i[0]&&s.label<r[1]){s.label=r[1],r=i;break}if(r&&s.label<r[2]){s.label=r[2],s.ops.push(i);break}r[2]&&s.ops.pop(),s.trys.pop();continue}i=e.call(t,s)}catch(a){i=[6,a],o=0}finally{n=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.Network=void 0;var r=o(require("os")),i=require("threads"),s=require("threads/dist");require("threads/register");var a=require("../enums/NodeType"),u=require("../methods/Loss"),c=require("../methods/Mutation"),d=require("../methods/Rate"),h=require("../NEAT"),l=require("../utils/Utils"),f=require("./Connection"),p=require("./Node"),g=function(){function o(t,e){this.inputSize=t,this.outputSize=e,this.nodes=[],this.connections=new Set,this.gates=new Set,this.score=void 0;for(var n=0;n<t;n++)this.nodes.push(new p.Node(a.NodeType.INPUT));for(n=0;n<e;n++)this.nodes.push(new p.Node(a.NodeType.OUTPUT));for(n=0;n<this.inputSize;n++)for(var o=this.inputSize;o<this.outputSize+this.inputSize;o++){var r=(Math.random()-.5)*this.inputSize*Math.sqrt(2/this.inputSize);this.connect(this.nodes[n],this.nodes[o],r)}}return o.fromJSON=function(t){var e=new o(t.inputSize,t.outputSize);return e.nodes=[],e.connections.clear(),t.nodes.map(function(t){return(new p.Node).fromJSON(t)}).forEach(function(t){return e.nodes[t.index]=t}),t.connections.forEach(function(t){var n=e.connect(e.nodes[t.fromIndex],e.nodes[t.toIndex],t.weight);null!=t.gateNodeIndex&&e.addGate(e.nodes[t.gateNodeIndex],n)}),e},o.crossOver=function(t,e,n){var r,i;if(t.inputSize!==e.inputSize||t.outputSize!==e.outputSize)throw new Error("Networks don`t have the same input/output size!");var s=new o(t.inputSize,t.outputSize);s.connections.clear(),s.nodes=[];var u,c=null!==(r=t.score)&&void 0!==r?r:0,d=null!==(i=e.score)&&void 0!==i?i:0;if(n||c===d){var h=Math.max(t.nodes.length,e.nodes.length),g=Math.min(t.nodes.length,e.nodes.length);u=l.randInt(g,h+1)}else u=c>d?t.nodes.length:e.nodes.length;for(var v=t.inputSize,m=t.outputSize,w=0;w<t.nodes.length;w++)t.nodes[w].index=w;for(w=0;w<e.nodes.length;w++)e.nodes[w].index=w;for(w=0;w<u;w++){var S=void 0,N=null;if(w<v){N=a.NodeType.INPUT;for(var z=l.randBoolean()?t:e,y=-1,O=-1;y<w;){if(O++>=z.nodes.length)throw RangeError("something is wrong with the size of the input");z.nodes[O].isInputNode()&&y++}S=z.nodes[O]}else if(w<v+m){N=a.NodeType.OUTPUT;z=l.randBoolean()?t:e;var E=-1;for(O=-1;E<w-v;){if(++O>=z.nodes.length)throw RangeError("something is wrong with the size of the output");z.nodes[O].isOutputNode()&&E++}S=z.nodes[O]}else{N=a.NodeType.HIDDEN;z=void 0;z=w>=t.nodes.length?e:w>=e.nodes.length?t:l.randBoolean()?t:e,S=l.pickRandom(z.nodes)}var b=new p.Node(N);b.bias=S.bias,b.squash=S.squash,s.nodes.push(b)}var x=[],D=[];t.connections.forEach(function(t){x[f.Connection.innovationID(t.from.index,t.to.index)]=t.toJSON()}),e.connections.forEach(function(t){D[f.Connection.innovationID(t.from.index,t.to.index)]=t.toJSON()});var I=[],T=Object.keys(x),R=Object.keys(D);for(w=T.length-1;w>=0;w--)void 0!==D[parseInt(T[w])]?(I.push(l.randBoolean()?x[parseInt(T[w])]:D[parseInt(T[w])]),D[parseInt(T[w])]=void 0):(c>=d||n)&&I.push(x[parseInt(T[w])]);return(d>=c||n)&&R.map(function(t){return parseInt(t)}).map(function(t){return D[t]}).filter(function(t){return void 0!==t}).forEach(function(t){return I.push(t)}),I.forEach(function(t){if(void 0!==t&&t.toIndex<u&&t.fromIndex<u){var e=s.nodes[t.fromIndex],n=s.nodes[t.toIndex],o=s.connect(e,n,t.weight);null!==t.gateNodeIndex&&t.gateNodeIndex<u&&s.addGate(s.nodes[t.gateNodeIndex],o)}}),s},o.prototype.copy=function(){return o.fromJSON(this.toJSON())},o.prototype.connect=function(t,e,n){void 0===n&&(n=0);var o=t.connect(e,n);return this.connections.add(o),o},o.prototype.activate=function(t,e){if(void 0===e&&(e={}),t.length!==this.inputSize)throw new RangeError("Input size of dataset is different to network input size!");return e.dropoutRate=l.getOrDefault(e.dropoutRate,0),e.trace=l.getOrDefault(e.trace,!0),this.nodes.filter(function(t){return t.isInputNode()}).forEach(function(n,o){return n.activate(t[o],e.trace)}),this.nodes.filter(function(t){return t.isHiddenNode()}).forEach(function(t){e.dropoutRate&&(t.mask=Math.random()>=e.dropoutRate?1:0),t.activate(void 0,e.trace)}),this.nodes.filter(function(t){return t.isOutputNode()}).map(function(t){return t.activate(void 0,e.trace)})},o.prototype.propagate=function(t,e){if(void 0===e&&(e={}),e.rate=l.getOrDefault(e.rate,.3),e.momentum=l.getOrDefault(e.momentum,0),e.update=l.getOrDefault(e.update,!1),t.length!==this.outputSize)throw new Error("Output target length should match network output length");this.nodes.filter(function(t){return t.isOutputNode()}).forEach(function(n,o){return n.propagate(t[o],e)});for(var n=this.nodes.length-1;n>=0;n--)this.nodes[n].isHiddenNode()&&this.nodes[n].propagate(void 0,e);this.nodes.filter(function(t){return t.isInputNode()}).forEach(function(t){return t.propagate(void 0,e)})},o.prototype.clear=function(){this.nodes.forEach(function(t){return t.clear()})},o.prototype.disconnect=function(t,e){var n=this;return this.connections.forEach(function(o){o.from===t&&o.to===e&&(null!==o.gateNode&&n.removeGate(o),n.connections.delete(o))}),t.disconnect(e)},o.prototype.addGate=function(t,e){if(-1===this.nodes.indexOf(t))throw new ReferenceError("This node is not part of the network!");null==e.gateNode&&(t.addGate(e),this.gates.add(e))},o.prototype.removeGate=function(t){if(!this.gates.has(t))throw new Error("This connection is not gated!");this.gates.delete(t),null!=t.gateNode&&t.gateNode.removeGate(t)},o.prototype.removeNode=function(t,e){var n=this;if(void 0===e&&(e=(new c.SubNodeMutation).keepGates),!this.nodes.includes(t))throw new ReferenceError("This node does not exist in the network!");this.disconnect(t,t);var o=[],r=[],i=[],s=[];for(t.incoming.forEach(function(i){e&&null!==i.gateNode&&i.gateNode!==t&&r.push(i.gateNode),o.push(i.from),n.disconnect(i.from,t)}),t.outgoing.forEach(function(o){e&&null!==o.gateNode&&o.gateNode!==t&&r.push(o.gateNode),i.push(o.to),n.disconnect(t,o.to)}),o.forEach(function(t){i.forEach(function(e){t.isProjectingTo(e)||s.push(n.connect(t,e))})});r.length>0&&s.length>0;){var a=r.shift();if(void 0!==a){var u=l.pickRandom(s);this.addGate(a,u),l.removeFromArray(s,u)}}t.gated.forEach(this.removeGate),l.removeFromArray(this.nodes,t)},o.prototype.mutate=function(t,e){t.mutate(this,e)},o.prototype.mutateRandom=function(t,e){void 0===t&&(t=c.ALL_MUTATIONS),void 0===e&&(e={}),0!==t.length&&this.mutate(l.pickRandom(t),e)},o.prototype.train=function(e){var n;if(!e.dataset||e.dataset[0].input.length!==this.inputSize||e.dataset[0].output.length!==this.outputSize)throw new Error("Dataset input/output size should be same as network input/output size!");e.iterations=l.getOrDefault(e.iterations,-1),e.error=l.getOrDefault(e.error,-1),e.loss=l.getOrDefault(e.loss,u.MSELoss),e.dropout=l.getOrDefault(e.dropout,0),e.momentum=l.getOrDefault(e.momentum,0),e.batchSize=Math.min(e.dataset.length,l.getOrDefault(e.batchSize,e.dataset.length));var o=l.getOrDefault(e.rate,.3);e.ratePolicy=l.getOrDefault(e.ratePolicy,new d.FixedRate(o)),e.log=l.getOrDefault(e.log,NaN);var r,i,s,a,c=Date.now();if(e.iterations<=0&&e.error<=0)throw new Error("At least one of the following options must be specified: error, iterations");e.crossValidateTestSize&&e.crossValidateTestSize>0?(r=Math.ceil((1-e.crossValidateTestSize)*e.dataset.length),i=e.dataset.slice(0,r),s=e.dataset.slice(r)):(i=e.dataset,s=[]);for(var h=0,f=1;f>e.error&&(e.iterations<=0||h<e.iterations);){h++,a=e.ratePolicy.calc(h);var p=this.trainEpoch(t(t({},e),{dataset:i,trainingRate:a}));if(!Number.isFinite(p))throw new RangeError;e.clear&&this.clear(),e.crossValidateTestSize?(f=this.test(s,e.loss),e.clear&&this.clear()):f=p,null!==(n=e.shuffle)&&void 0!==n&&n&&l.shuffle(e.dataset),e.log>0&&h%e.log==0&&console.log("iteration number",h,"error",f,"training rate",a),e.schedule&&h%e.schedule.iterations==0&&e.schedule.function(f,h)}return e.clear&&this.clear(),{error:f,iterations:h,time:Date.now()-c}},o.prototype.test=function(t,e){void 0===e&&(e=u.MSELoss);for(var n=0,o=0,r=t;o<r.length;o++){var i=r[o],s=i.input;n+=e(i.output,this.activate(s,{trace:!1}))}return n/t.length},o.prototype.toJSON=function(){for(var t={nodes:[],connections:[],inputSize:this.inputSize,outputSize:this.outputSize},e=0;e<this.nodes.length;e++)this.nodes[e].index=e;return this.nodes.forEach(function(e){t.nodes.push(e.toJSON()),0!==e.selfConnection.weight&&t.connections.push(e.selfConnection.toJSON())}),this.connections.forEach(function(e){t.connections.push(e.toJSON())}),t},o.prototype.evolve=function(t){var o,a,c,d,f;return void 0===t&&(t={}),e(this,void 0,void 0,function(){var p,g,v,m,w,S,N,z,y,O;return n(this,function(E){switch(E.label){case 0:if(!t.fitnessFunction&&t.dataset&&(t.dataset[0].input.length!==this.inputSize||t.dataset[0].output.length!==this.outputSize))throw new Error("Dataset input/output size should be same as network input/output size!");p=0,void 0===t.iterations&&void 0===t.error?(t.iterations=1e3,p=.05):t.iterations?p=-1:t.error&&(p=t.error,t.iterations=0),t.growth=l.getOrDefault(t.growth,1e-4),t.loss=l.getOrDefault(t.loss,u.MSELoss),t.maxNodes=l.getOrDefault(t.maxNodes,1/0),t.maxConnections=l.getOrDefault(t.maxConnections,1/0),t.maxGates=l.getOrDefault(t.maxGates,1/0),t.input=this.inputSize,t.output=this.outputSize,g=Date.now(),t.fitnessFunction||(m=JSON.stringify(t.dataset),w=Object.values(u.ALL_LOSSES).indexOf(null!==(o=t.loss)&&void 0!==o?o:u.MSELoss),v=s.Pool(function(){return i.spawn(new i.Worker("../multithreading/TestWorker"))},null!==(a=t.threads)&&void 0!==a?a:r.default.cpus().length),t.fitnessFunction=function(o){return e(this,void 0,void 0,function(){var r,i,s,a,u=this;return n(this,function(c){switch(c.label){case 0:for(r=function(o){v.queue(function(r){return e(u,void 0,void 0,function(){var e,i;return n(this,function(n){switch(n.label){case 0:if(void 0===o)throw new ReferenceError;return e=o,[4,r(m,JSON.stringify(o.toJSON()),w)];case 1:if(e.score=-n.sent(),!Number.isFinite(o.score))throw new RangeError;return o.score-=(null!==(i=t.growth)&&void 0!==i?i:1e-4)*(o.nodes.length-o.inputSize-o.outputSize+o.connections.size+o.gates.size),[2]}})})})},i=0,s=o;i<s.length;i++)a=s[i],r(a);return[4,v.completed()];case 1:return c.sent(),[2]}})})}),t.template=this,S=new h.NEAT(t),z=0,y=this,E.label=1;case 1:return[4,S.evolve()];case 2:if(!(O=E.sent()).score)throw new ReferenceError;N=O.score+t.growth*(O.nodes.length+O.connections.size+O.gates.size-O.inputSize-O.outputSize),(1===S.generation||O.score>z)&&(z=O.score,y=O),(null!==(c=t.log)&&void 0!==c?c:0)>0&&S.generation%(null!==(d=t.log)&&void 0!==d?d:0)==0&&console.log("iteration",S.generation,"fitness",O.score,"error",-N),t.schedule&&S.generation%t.schedule.iterations==0&&t.schedule.function(O.score,-N,S.generation),E.label=3;case 3:if(N<-p&&(0===t.iterations||S.generation<(null!==(f=t.iterations)&&void 0!==f?f:0)))return[3,1];E.label=4;case 4:return void 0!==y&&(this.nodes=y.nodes,this.connections=y.connections,this.gates=y.gates,t.clear&&this.clear()),v?[4,v.terminate()]:[3,6];case 5:E.sent(),E.label=6;case 6:return[2,{error:-N,iterations:S.generation,time:Date.now()-g}]}})})},o.prototype.trainEpoch=function(t){for(var e,n,o,r=0,i=0;i<t.dataset.length;i++){var s=t.dataset[i].input,a=t.dataset[i].output,c=(i+1)%(null!==(e=t.batchSize)&&void 0!==e?e:t.dataset.length)==0||i+1===t.dataset.length,d=this.activate(s,{dropoutRate:null!==(n=t.dropoutRate)&&void 0!==n?n:.5});this.propagate(a,{rate:t.trainingRate,momentum:t.momentum,update:c}),r+=(null!==(o=t.loss)&&void 0!==o?o:u.MSELoss)(a,d)}return r/t.dataset.length},o}();exports.Network=g;
},{"../enums/NodeType":"../src/enums/NodeType.js","../methods/Loss":"../src/methods/Loss.js","../methods/Mutation":"../src/methods/Mutation.js","../methods/Rate":"../src/methods/Rate.js","../NEAT":"../src/NEAT.js","../utils/Utils":"../src/utils/Utils.js","./Connection":"../src/architecture/Connection.js","./Node":"../src/architecture/Node.js"}],"../src/architecture/Architect.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Architect=void 0;var e=require("./Layers/CoreLayers/InputLayer"),r=require("./Layers/CoreLayers/OutputLayer"),t=require("./Layers/Layer"),n=require("./Network"),a=function(){function a(){this.layers=[]}return a.prototype.addLayer=function(e,r){var t=null!=r?r:e.getDefaultIncomingConnectionType();if(!e.connectionTypeisAllowed(t))throw new ReferenceError("Connection type "+t+" is not allowed at layer "+e.constructor.name);return this.layers.push({layer:e,incomingConnectionType:t}),this},a.prototype.buildModel=function(){var a,s;if(!(this.layers[0].layer instanceof e.InputLayer))throw new ReferenceError("First layer has to be a InputLayer! Currently is: "+this.layers[0].layer.constructor.name);if(!(this.layers[this.layers.length-1].layer instanceof r.OutputLayer))throw new ReferenceError("Last layer has to be a OutputLayer! Currently is: "+this.layers[this.layers.length-1].layer.constructor.name);var o=this.layers[0].layer.nodes.length,i=this.layers[this.layers.length-1].layer.nodes.length,y=new n.Network(o,i);y.nodes=[],y.connections.clear();for(var l=0;l<this.layers.length-1;l++)t.Layer.connect(this.layers[l].layer,this.layers[l+1].layer,this.layers[l+1].incomingConnectionType).forEach(function(e){return y.connections.add(e)}),(a=y.nodes).push.apply(a,this.layers[l].layer.nodes),this.layers[l].layer.connections.forEach(function(e){return y.connections.add(e)}),this.layers[l].layer.gates.forEach(function(e){return y.gates.add(e)});return(s=y.nodes).push.apply(s,this.layers[this.layers.length-1].layer.nodes),y},a}();exports.Architect=a;
},{"./Layers/CoreLayers/InputLayer":"../src/architecture/Layers/CoreLayers/InputLayer.js","./Layers/CoreLayers/OutputLayer":"../src/architecture/Layers/CoreLayers/OutputLayer.js","./Layers/Layer":"../src/architecture/Layers/Layer.js","./Network":"../src/architecture/Network.js"}],"../src/architecture/Nodes/ActivationNode.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivationNode = void 0;

var Utils_1 = require("../../utils/Utils");

var ConstantNode_1 = require("./ConstantNode");
/**
 * Activation node
 */


var ActivationNode =
/** @class */
function (_super) {
  __extends(ActivationNode, _super);

  function ActivationNode() {
    return _super.call(this) || this;
  }
  /**
   * Actives the node.
   *
   * When a neuron activates, it computes its state from all its input connections and 'squashes' it using its activation function, and returns the output (activation).
   *
   * You can also provide the activation (a float between 0 and 1) as a parameter, which is useful for neurons in the input layer.
   *
   * @returns A neuron's output value
   */


  ActivationNode.prototype.activate = function () {
    this.old = this.state;
    var incomingStates = Array.from(this.incoming).map(function (conn) {
      return conn.from.activation * conn.weight * conn.gain;
    });

    if (incomingStates.length !== 1) {
      throw new ReferenceError("Only 1 incoming connections is allowed!");
    }

    this.state = incomingStates[0];
    this.activation = this.squash(this.state, false) * this.mask;
    this.derivativeState = this.squash(this.state, true);
    return this.activation;
  };
  /**
   * Backpropagate the error (a.k.a. learn).
   *
   * After an activation, you can teach the node what should have been the correct output (a.k.a. train). This is done by backpropagating. [Momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html) adds a fraction of the previous weight update to the current one. When the gradient keeps pointing in the same direction, this will increase the size of the steps taken towards the minimum.
   *
   * If you combine a high learning rate with a lot of momentum, you will rush past the minimum (of the error function) with huge steps. It is therefore often necessary to reduce the global learning rate µ when using a lot of momentum (m close to 1).
   *
   * @param target The target value (i.e. "the value the network SHOULD have given")
   * @param options More options for propagation
   */


  ActivationNode.prototype.propagate = function (target, options) {
    var _this = this;

    options.momentum = Utils_1.getOrDefault(options.momentum, 0);
    options.rate = Utils_1.getOrDefault(options.rate, 0.3);
    options.update = Utils_1.getOrDefault(options.update, true);
    var connectionsStates = Array.from(this.outgoing).map(function (conn) {
      return conn.to.errorResponsibility * conn.weight * conn.gain;
    });
    this.errorResponsibility = this.errorProjected = Utils_1.sum(connectionsStates) * this.derivativeState;
    this.incoming.forEach(function (connection) {
      var _a, _b; // calculate gradient


      var gradient = _this.errorProjected * connection.eligibility;
      connection.xTrace.forEach(function (value, key) {
        gradient += key.errorResponsibility * value;
      });
      connection.deltaWeightsTotal += ((_a = options.rate) !== null && _a !== void 0 ? _a : 0.3) * gradient * _this.mask;

      if (options.update) {
        connection.deltaWeightsTotal += ((_b = options.momentum) !== null && _b !== void 0 ? _b : 0) * connection.deltaWeightsPrevious;
        connection.weight += connection.deltaWeightsTotal;
        connection.deltaWeightsPrevious = connection.deltaWeightsTotal;
        connection.deltaWeightsTotal = 0;
      }
    });
  };

  return ActivationNode;
}(ConstantNode_1.ConstantNode);

exports.ActivationNode = ActivationNode;
},{"../../utils/Utils":"../src/utils/Utils.js","./ConstantNode":"../src/architecture/Nodes/ConstantNode.js"}],"../src/architecture/Layers/CoreLayers/ActivationLayer.js":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(e,o)};return function(e,o){function n(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.ActivationLayer=void 0;var e=require("activations/build/src"),o=require("../../../enums/ConnectionType"),n=require("../../Nodes/ActivationNode"),r=require("../Layer"),i=function(r){function i(t,o){var i,c;void 0===o&&(o={});for(var u=r.call(this,t)||this,p=null!==(c=o.activation)&&void 0!==c?c:e.Logistic,a=0;a<t;a++)u.inputNodes.add((new n.ActivationNode).setActivationType(p));return u.outputNodes=u.inputNodes,(i=u.nodes).push.apply(i,Array.from(u.inputNodes)),u}return t(i,r),i.prototype.connectionTypeisAllowed=function(t){return t===o.ConnectionType.ONE_TO_ONE},i.prototype.getDefaultIncomingConnectionType=function(){return o.ConnectionType.ONE_TO_ONE},i}(r.Layer);exports.ActivationLayer=i;
},{"../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../Nodes/ActivationNode":"../src/architecture/Nodes/ActivationNode.js","../Layer":"../src/architecture/Layers/Layer.js"}],"../src/architecture/Layers/CoreLayers/DenseLayer.js":[function(require,module,exports) {
"use strict";var e=this&&this.__extends||function(){var e=function(t,o){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])})(t,o)};return function(t,o){function n(){this.constructor=t}e(t,o),t.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.DenseLayer=void 0;var t=require("activations/build/src"),o=require("../../../enums/ConnectionType"),n=require("../../../enums/NodeType"),r=require("../../Node"),i=require("../Layer"),u=function(i){function u(e,o){var u,p;void 0===o&&(o={});for(var s=i.call(this,e)||this,c=null!==(p=o.activationType)&&void 0!==p?p:t.Logistic,a=0;a<e;a++)s.inputNodes.add(new r.Node(n.NodeType.HIDDEN).setActivationType(c));return s.outputNodes=s.inputNodes,(u=s.nodes).push.apply(u,Array.from(s.inputNodes)),s}return e(u,i),u.prototype.connectionTypeisAllowed=function(e){return!0},u.prototype.getDefaultIncomingConnectionType=function(){return o.ConnectionType.ALL_TO_ALL},u}(i.Layer);exports.DenseLayer=u;
},{"../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../Node":"../src/architecture/Node.js","../Layer":"../src/architecture/Layers/Layer.js"}],"../src/architecture/Nodes/DropoutNode.js":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(o,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var i in o)o.hasOwnProperty(i)&&(t[i]=o[i])})(o,i)};return function(o,i){function r(){this.constructor=o}t(o,i),o.prototype=null===i?Object.create(i):(r.prototype=i.prototype,new r)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.DropoutNode=void 0;var o=require("../../utils/Utils"),i=require("./ConstantNode"),r=function(i){function r(t){var o=i.call(this)||this;return o.probability=t,o.droppedOut=!1,o}return t(r,i),r.prototype.activate=function(){var t=this;if(1!==this.incoming.size)throw new RangeError("Dropout node should have exactly one incoming connection!");var i=Array.from(this.incoming)[0];return o.randDouble(0,1)<this.probability?(this.droppedOut=!0,this.state=0):(this.droppedOut=!1,this.state=i.from.activation*i.weight*i.gain,this.state*=1/(1-this.probability)),this.activation=this.squash(this.state,!1)*this.mask,this.gated.forEach(function(o){return o.gain=t.activation}),this.activation},r.prototype.propagate=function(t,i){void 0===i&&(i={}),i.momentum=o.getOrDefault(i.momentum,0),i.rate=o.getOrDefault(i.rate,.3),i.update=o.getOrDefault(i.update,!0);var r=Array.from(this.outgoing).map(function(t){return t.to.errorResponsibility*t.weight*t.gain});if(this.errorResponsibility=this.errorProjected=o.sum(r)/(1-this.probability),1!==this.incoming.size)throw new RangeError("Dropout node should have exactly one incoming connection!");var e=Array.from(this.incoming)[0];if(!this.droppedOut){var n=this.errorProjected*e.eligibility;e.xTrace.forEach(function(t,o){n+=o.errorResponsibility*t}),i.update&&(e.deltaWeightsTotal+=i.rate*n*this.mask+i.momentum*e.deltaWeightsPrevious,e.weight+=e.deltaWeightsTotal,e.deltaWeightsPrevious=e.deltaWeightsTotal,e.deltaWeightsTotal=0)}},r.prototype.fromJSON=function(t){return i.prototype.fromJSON.call(this,t),this.probability=t.probability,this},r.prototype.toJSON=function(){return Object.assign(i.prototype.toJSON.call(this),{probability:this.probability})},r}(i.ConstantNode);exports.DropoutNode=r;
},{"../../utils/Utils":"../src/utils/Utils.js","./ConstantNode":"../src/architecture/Nodes/ConstantNode.js"}],"../src/architecture/Layers/CoreLayers/DropoutLayer.js":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(o,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var e in o)o.hasOwnProperty(e)&&(t[e]=o[e])})(o,e)};return function(o,e){function n(){this.constructor=o}t(o,e),o.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.DropoutLayer=void 0;var o=require("activations/build/src"),e=require("../../../enums/ConnectionType"),n=require("../../Nodes/DropoutNode"),r=require("../Layer"),i=function(r){function i(t,e){var i,u,p;void 0===e&&(e={});for(var c=r.call(this,t)||this,s=null!==(u=e.activation)&&void 0!==u?u:o.Identitiy,a=null!==(p=e.probability)&&void 0!==p?p:.1,y=0;y<t;y++)c.inputNodes.add(new n.DropoutNode(a).setActivationType(s));return c.outputNodes=c.inputNodes,(i=c.nodes).push.apply(i,Array.from(c.inputNodes)),c}return t(i,r),i.prototype.getDefaultIncomingConnectionType=function(){return e.ConnectionType.ONE_TO_ONE},i.prototype.connectionTypeisAllowed=function(t){return t===e.ConnectionType.ONE_TO_ONE},i}(r.Layer);exports.DropoutLayer=i;
},{"../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../Nodes/DropoutNode":"../src/architecture/Nodes/DropoutNode.js","../Layer":"../src/architecture/Layers/Layer.js"}],"../src/architecture/Nodes/PoolNode.js":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(e,o)};return function(e,o){function i(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(i.prototype=o.prototype,new i)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.PoolNode=void 0;var e=require("../../enums/NodeType"),o=require("../../utils/Utils"),i=require("./ConstantNode"),r=function(i){function r(t){void 0===t&&(t=e.PoolNodeType.MAX_POOLING);var o=i.call(this)||this;return o.poolingType=t,o.receivingNode=null,o}return t(r,i),r.prototype.fromJSON=function(t){return i.prototype.fromJSON.call(this,t),this.poolingType=t.poolType,this},r.prototype.activate=function(){var t=this,i=Array.from(this.incoming),r=i.map(function(t){return t.from.activation*t.weight*t.gain});if(this.poolingType===e.PoolNodeType.MAX_POOLING){var n=o.maxValueIndex(r);this.receivingNode=i[n].from,this.state=r[n]}else if(this.poolingType===e.PoolNodeType.AVG_POOLING)this.state=o.avg(r);else{if(this.poolingType!==e.PoolNodeType.MIN_POOLING)throw new ReferenceError("No valid pooling type! Type: "+this.poolingType);n=o.minValueIndex(r);this.receivingNode=i[n].from,this.state=r[n]}return this.activation=this.squash(this.state,!1)*this.mask,this.poolingType===e.PoolNodeType.AVG_POOLING&&(this.derivativeState=this.squash(this.state,!0)),this.gated.forEach(function(e){return e.gain=t.activation}),this.activation},r.prototype.propagate=function(t,i){var r=this;void 0===i&&(i={}),i.momentum=o.getOrDefault(i.momentum,0),i.rate=o.getOrDefault(i.rate,.3),i.update=o.getOrDefault(i.update,!0);var n=Array.from(this.outgoing).map(function(t){return t.to.errorResponsibility*t.weight*t.gain});this.errorResponsibility=this.errorProjected=o.sum(n)*this.derivativeState,this.poolingType===e.PoolNodeType.AVG_POOLING?this.incoming.forEach(function(t){var e,o,n=r.errorProjected*t.eligibility;t.xTrace.forEach(function(t,e){n+=e.errorResponsibility*t}),t.deltaWeightsTotal+=(null!==(e=i.rate)&&void 0!==e?e:.3)*n*r.mask,i.update&&(t.deltaWeightsTotal+=(null!==(o=i.momentum)&&void 0!==o?o:0)*t.deltaWeightsPrevious,t.weight+=t.deltaWeightsTotal,t.deltaWeightsPrevious=t.deltaWeightsTotal,t.deltaWeightsTotal=0)}):this.incoming.forEach(function(t){t.weight=r.receivingNode===t.from?1:0,t.gain=r.receivingNode===t.from?1:0})},r.prototype.toJSON=function(){return Object.assign(i.prototype.toJSON.call(this),{poolType:this.poolingType})},r}(i.ConstantNode);exports.PoolNode=r;
},{"../../enums/NodeType":"../src/enums/NodeType.js","../../utils/Utils":"../src/utils/Utils.js","./ConstantNode":"../src/architecture/Nodes/ConstantNode.js"}],"../src/architecture/Layers/PoolingLayers/PoolingLayer.js":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.PoolingLayer=void 0;var e=require("../../../enums/ConnectionType"),n=require("../Layer"),o=function(n){function o(t){return n.call(this,t)||this}return t(o,n),o.prototype.getDefaultIncomingConnectionType=function(){return e.ConnectionType.POOLING},o.prototype.connectionTypeisAllowed=function(t){return!0},o}(n.Layer);exports.PoolingLayer=o;
},{"../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../Layer":"../src/architecture/Layers/Layer.js"}],"../src/architecture/Layers/PoolingLayers/AvgPooling1DLayer.js":[function(require,module,exports) {
"use strict";var o=this&&this.__extends||function(){var o=function(e,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(o,e){o.__proto__=e}||function(o,e){for(var t in e)e.hasOwnProperty(t)&&(o[t]=e[t])})(e,t)};return function(e,t){function r(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.AvgPooling1DLayer=void 0;var e=require("activations/build/src"),t=require("../../../enums/NodeType"),r=require("../../Nodes/PoolNode"),n=require("./PoolingLayer"),i=function(n){function i(o,i){var u,s;void 0===i&&(i={});for(var a=n.call(this,o)||this,p=null!==(s=i.activation)&&void 0!==s?s:e.Identitiy,c=0;c<o;c++)a.inputNodes.add(new r.PoolNode(t.PoolNodeType.AVG_POOLING).setActivationType(p));return a.outputNodes=a.inputNodes,(u=a.nodes).push.apply(u,Array.from(a.inputNodes)),a}return o(i,n),i}(n.PoolingLayer);exports.AvgPooling1DLayer=i;
},{"../../../enums/NodeType":"../src/enums/NodeType.js","../../Nodes/PoolNode":"../src/architecture/Nodes/PoolNode.js","./PoolingLayer":"../src/architecture/Layers/PoolingLayers/PoolingLayer.js"}],"../src/architecture/Layers/PoolingLayers/GlobalAvgPooling1DLayer.js":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(o,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var r in o)o.hasOwnProperty(r)&&(t[r]=o[r])})(o,r)};return function(o,r){function e(){this.constructor=o}t(o,r),o.prototype=null===r?Object.create(r):(e.prototype=r.prototype,new e)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.GlobalAvgPooling1DLayer=void 0;var o=require("./AvgPooling1DLayer"),r=function(o){function r(t,r){return void 0===r&&(r={}),o.call(this,1,r)||this}return t(r,o),r}(o.AvgPooling1DLayer);exports.GlobalAvgPooling1DLayer=r;
},{"./AvgPooling1DLayer":"../src/architecture/Layers/PoolingLayers/AvgPooling1DLayer.js"}],"../src/architecture/Layers/PoolingLayers/MaxPooling1DLayer.js":[function(require,module,exports) {
"use strict";var o=this&&this.__extends||function(){var o=function(e,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(o,e){o.__proto__=e}||function(o,e){for(var t in e)e.hasOwnProperty(t)&&(o[t]=e[t])})(e,t)};return function(e,t){function r(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.MaxPooling1DLayer=void 0;var e=require("activations/build/src"),t=require("../../../enums/NodeType"),r=require("../../Nodes/PoolNode"),n=require("./PoolingLayer"),i=function(n){function i(o,i){var u,s;void 0===i&&(i={});for(var a=n.call(this,o)||this,p=null!==(s=i.activation)&&void 0!==s?s:e.Identitiy,c=0;c<o;c++)a.inputNodes.add(new r.PoolNode(t.PoolNodeType.MAX_POOLING).setActivationType(p));return a.outputNodes=a.inputNodes,(u=a.nodes).push.apply(u,Array.from(a.inputNodes)),a}return o(i,n),i}(n.PoolingLayer);exports.MaxPooling1DLayer=i;
},{"../../../enums/NodeType":"../src/enums/NodeType.js","../../Nodes/PoolNode":"../src/architecture/Nodes/PoolNode.js","./PoolingLayer":"../src/architecture/Layers/PoolingLayers/PoolingLayer.js"}],"../src/architecture/Layers/PoolingLayers/GlobalMaxPooling1DLayer.js":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(o,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var r in o)o.hasOwnProperty(r)&&(t[r]=o[r])})(o,r)};return function(o,r){function e(){this.constructor=o}t(o,r),o.prototype=null===r?Object.create(r):(e.prototype=r.prototype,new e)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.GlobalMaxPooling1DLayer=void 0;var o=require("./MaxPooling1DLayer"),r=function(o){function r(t,r){return void 0===r&&(r={}),o.call(this,1,r)||this}return t(r,o),r}(o.MaxPooling1DLayer);exports.GlobalMaxPooling1DLayer=r;
},{"./MaxPooling1DLayer":"../src/architecture/Layers/PoolingLayers/MaxPooling1DLayer.js"}],"../src/architecture/Layers/PoolingLayers/MinPooling1DLayer.js":[function(require,module,exports) {
"use strict";var o=this&&this.__extends||function(){var o=function(e,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(o,e){o.__proto__=e}||function(o,e){for(var t in e)e.hasOwnProperty(t)&&(o[t]=e[t])})(e,t)};return function(e,t){function r(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.MinPooling1DLayer=void 0;var e=require("activations/build/src"),t=require("../../../enums/NodeType"),r=require("../../Nodes/PoolNode"),n=require("./PoolingLayer"),i=function(n){function i(o,i){var u,s;void 0===i&&(i={});for(var a=n.call(this,o)||this,p=null!==(s=i.activation)&&void 0!==s?s:e.Identitiy,c=0;c<o;c++)a.inputNodes.add(new r.PoolNode(t.PoolNodeType.MIN_POOLING).setActivationType(p));return a.outputNodes=a.inputNodes,(u=a.nodes).push.apply(u,Array.from(a.inputNodes)),a}return o(i,n),i}(n.PoolingLayer);exports.MinPooling1DLayer=i;
},{"../../../enums/NodeType":"../src/enums/NodeType.js","../../Nodes/PoolNode":"../src/architecture/Nodes/PoolNode.js","./PoolingLayer":"../src/architecture/Layers/PoolingLayers/PoolingLayer.js"}],"../src/architecture/Layers/PoolingLayers/GlobalMinPooling1DLayer.js":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(o,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var r in o)o.hasOwnProperty(r)&&(t[r]=o[r])})(o,r)};return function(o,r){function n(){this.constructor=o}t(o,r),o.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.GlobalMinPooling1DLayer=void 0;var o=require("./MinPooling1DLayer"),r=function(o){function r(t,r){return void 0===r&&(r={}),o.call(this,1,r)||this}return t(r,o),r}(o.MinPooling1DLayer);exports.GlobalMinPooling1DLayer=r;
},{"./MinPooling1DLayer":"../src/architecture/Layers/PoolingLayers/MinPooling1DLayer.js"}],"../src/architecture/Layers/RecurrentLayers/GRULayer.js":[function(require,module,exports) {
"use strict";var e=this&&this.__extends||function(){var e=function(n,o){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var o in n)n.hasOwnProperty(o)&&(e[o]=n[o])})(n,o)};return function(n,o){function t(){this.constructor=n}e(n,o),n.prototype=null===o?Object.create(o):(t.prototype=o.prototype,new t)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.GRULayer=void 0;var n=require("activations/build/src"),o=require("../../../enums/ConnectionType"),t=require("../../../enums/GatingType"),p=require("../../../enums/NodeType"),s=require("../../Node"),c=require("../Layer"),i=function(i){function r(e,r){var a,u,y,L,T,d,N,_,h,l,A,O,f,v,g,D,C,E,w,H;void 0===r&&(r={});for(var I=i.call(this,e)||this,U=[],q=[],m=[],G=[],P=[],b=0;b<e;b++)I.inputNodes.add(new s.Node(p.NodeType.HIDDEN)),U.push(new s.Node(p.NodeType.HIDDEN).setBias(1)),q.push(new s.Node(p.NodeType.HIDDEN).setBias(0).setActivationType(n.Logistic)),m.push(new s.Node(p.NodeType.HIDDEN).setBias(0)),G.push(new s.Node(p.NodeType.HIDDEN).setActivationType(n.TANH)),P.push(new s.Node(p.NodeType.HIDDEN).setBias(0).setActivationType(n.Logistic)),I.outputNodes.add(new s.Node(p.NodeType.HIDDEN));(a=I.connections).push.apply(a,c.Layer.connect(I.inputNodes,U,o.ConnectionType.ALL_TO_ALL)),(u=I.connections).push.apply(u,c.Layer.connect(I.inputNodes,m,o.ConnectionType.ALL_TO_ALL)),(y=I.connections).push.apply(y,c.Layer.connect(I.inputNodes,G,o.ConnectionType.ALL_TO_ALL)),(L=I.connections).push.apply(L,c.Layer.connect(P,U,o.ConnectionType.ALL_TO_ALL)),(T=I.connections).push.apply(T,c.Layer.connect(U,q,o.ConnectionType.ONE_TO_ONE,1)),(d=I.connections).push.apply(d,c.Layer.connect(P,m,o.ConnectionType.ALL_TO_ALL));var x=c.Layer.connect(P,G,o.ConnectionType.ALL_TO_ALL);(N=I.connections).push.apply(N,x),(_=I.gates).push.apply(_,c.Layer.gate(m,x,t.GatingType.OUTPUT));var B=c.Layer.connect(P,I.outputNodes,o.ConnectionType.ALL_TO_ALL),j=c.Layer.connect(G,I.outputNodes,o.ConnectionType.ALL_TO_ALL);return(h=I.connections).push.apply(h,B),(l=I.connections).push.apply(l,j),(A=I.gates).push.apply(A,c.Layer.gate(U,B,t.GatingType.OUTPUT)),(O=I.gates).push.apply(O,c.Layer.gate(q,j,t.GatingType.OUTPUT)),(f=I.connections).push.apply(f,c.Layer.connect(I.outputNodes,P,o.ConnectionType.ONE_TO_ONE,1)),(v=I.nodes).push.apply(v,Array.from(I.inputNodes)),(g=I.nodes).push.apply(g,U),(D=I.nodes).push.apply(D,q),(C=I.nodes).push.apply(C,m),(E=I.nodes).push.apply(E,G),(w=I.nodes).push.apply(w,Array.from(I.outputNodes)),(H=I.nodes).push.apply(H,P),I.outputNodes.forEach(function(e){var o;return e.squash=null!==(o=r.activation)&&void 0!==o?o:n.Logistic}),I}return e(r,i),r.prototype.connectionTypeisAllowed=function(e){return!0},r.prototype.getDefaultIncomingConnectionType=function(){return o.ConnectionType.ALL_TO_ALL},r}(c.Layer);exports.GRULayer=i;
},{"../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../../enums/GatingType":"../src/enums/GatingType.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../Node":"../src/architecture/Node.js","../Layer":"../src/architecture/Layers/Layer.js"}],"../src/architecture/Layers/RecurrentLayers/HopfieldLayer.js":[function(require,module,exports) {
"use strict";var e=this&&this.__extends||function(){var e=function(o,t){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,o){e.__proto__=o}||function(e,o){for(var t in o)o.hasOwnProperty(t)&&(e[t]=o[t])})(o,t)};return function(o,t){function n(){this.constructor=o}e(o,t),o.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.HopfieldLayer=void 0;var o=require("activations/build/src"),t=require("../../../enums/ConnectionType"),n=require("../../../enums/NodeType"),r=require("../../Node"),p=require("../Layer"),i=function(i){function u(e){for(var u,c,s,y,a=i.call(this,e)||this,d=0;d<e;d++)a.inputNodes.add(new r.Node(n.NodeType.HIDDEN)),a.outputNodes.add(new r.Node(n.NodeType.HIDDEN).setActivationType(o.BinaryStep));return(u=a.connections).push.apply(u,p.Layer.connect(a.inputNodes,a.outputNodes,t.ConnectionType.ALL_TO_ALL)),(c=a.connections).push.apply(c,p.Layer.connect(a.outputNodes,a.inputNodes,t.ConnectionType.ALL_TO_ALL)),(s=a.nodes).push.apply(s,Array.from(a.inputNodes)),(y=a.nodes).push.apply(y,Array.from(a.outputNodes)),a}return e(u,i),u.prototype.connectionTypeisAllowed=function(e){return!0},u.prototype.getDefaultIncomingConnectionType=function(){return t.ConnectionType.ALL_TO_ALL},u}(p.Layer);exports.HopfieldLayer=i;
},{"../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../Node":"../src/architecture/Node.js","../Layer":"../src/architecture/Layers/Layer.js"}],"../src/architecture/Layers/RecurrentLayers/LSTMLayer.js":[function(require,module,exports) {
"use strict";var e=this&&this.__extends||function(){var e=function(n,o){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var o in n)n.hasOwnProperty(o)&&(e[o]=n[o])})(n,o)};return function(n,o){function t(){this.constructor=n}e(n,o),n.prototype=null===o?Object.create(o):(t.prototype=o.prototype,new t)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.LSTMLayer=void 0;var n=require("activations/build/src"),o=require("../../../enums/ConnectionType"),t=require("../../../enums/GatingType"),p=require("../../../enums/NodeType"),r=require("../../Node"),s=require("../Layer"),c=function(c){function i(e,i){var a,u,y,L,d,T,N,_,h,l,A,f,O,v,g,D,C,E;void 0===i&&(i={});for(var w=c.call(this,e)||this,I=[],q=[],H=[],m=[],P=0;P<e;P++)w.inputNodes.add(new r.Node(p.NodeType.HIDDEN)),I.push(new r.Node(p.NodeType.HIDDEN).setBias(1)),q.push(new r.Node(p.NodeType.HIDDEN).setBias(1).setActivationType(n.Logistic)),H.push(new r.Node(p.NodeType.HIDDEN)),m.push(new r.Node(p.NodeType.HIDDEN).setBias(1)),w.outputNodes.add(new r.Node(p.NodeType.HIDDEN));(a=w.connections).push.apply(a,s.Layer.connect(H,I,o.ConnectionType.ALL_TO_ALL)),(u=w.connections).push.apply(u,s.Layer.connect(H,q,o.ConnectionType.ALL_TO_ALL)),(y=w.connections).push.apply(y,s.Layer.connect(H,m,o.ConnectionType.ALL_TO_ALL));var b=s.Layer.connect(H,H,o.ConnectionType.ONE_TO_ONE),x=s.Layer.connect(H,w.outputNodes,o.ConnectionType.ALL_TO_ALL);(L=w.connections).push.apply(L,b),(d=w.connections).push.apply(d,x),(T=w.connections).push.apply(T,s.Layer.connect(w.inputNodes,H,o.ConnectionType.ALL_TO_ALL)),(N=w.connections).push.apply(N,s.Layer.connect(w.inputNodes,m,o.ConnectionType.ALL_TO_ALL)),(_=w.connections).push.apply(_,s.Layer.connect(w.inputNodes,q,o.ConnectionType.ALL_TO_ALL));var G=s.Layer.connect(w.inputNodes,I,o.ConnectionType.ALL_TO_ALL);return(h=w.connections).push.apply(h,G),(l=w.gates).push.apply(l,s.Layer.gate(q,b,t.GatingType.SELF)),(A=w.gates).push.apply(A,s.Layer.gate(m,x,t.GatingType.OUTPUT)),(f=w.gates).push.apply(f,s.Layer.gate(I,G,t.GatingType.INPUT)),(O=w.nodes).push.apply(O,Array.from(w.inputNodes)),(v=w.nodes).push.apply(v,I),(g=w.nodes).push.apply(g,q),(D=w.nodes).push.apply(D,H),(C=w.nodes).push.apply(C,m),(E=w.nodes).push.apply(E,Array.from(w.outputNodes)),w.outputNodes.forEach(function(e){var o;return e.squash=null!==(o=i.activation)&&void 0!==o?o:n.TANH}),w}return e(i,c),i.prototype.connectionTypeisAllowed=function(e){return!0},i.prototype.getDefaultIncomingConnectionType=function(){return o.ConnectionType.ALL_TO_ALL},i}(s.Layer);exports.LSTMLayer=c;
},{"../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../../enums/GatingType":"../src/enums/GatingType.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../Node":"../src/architecture/Node.js","../Layer":"../src/architecture/Layers/Layer.js"}],"../src/architecture/Layers/RecurrentLayers/MemoryLayer.js":[function(require,module,exports) {
"use strict";var e=this&&this.__extends||function(){var e=function(o,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,o){e.__proto__=o}||function(e,o){for(var r in o)o.hasOwnProperty(r)&&(e[r]=o[r])})(o,r)};return function(o,r){function t(){this.constructor=o}e(o,r),o.prototype=null===r?Object.create(r):(t.prototype=r.prototype,new t)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.MemoryLayer=void 0;var o=require("activations/build/src"),r=require("../../../enums/ConnectionType"),t=require("../../../enums/NodeType"),n=require("../../Node"),i=require("../Layer"),u=function(u){function p(e,p){var s,a,c,y;void 0===p&&(p={});for(var d=u.call(this,e)||this,f=0;f<e;f++)d.inputNodes.add(new n.Node(t.NodeType.HIDDEN));var l=Array.from(d.inputNodes),v=[];for(f=0;f<(null!==(y=p.memorySize)&&void 0!==y?y:1);f++){for(var _=[],h=0;h<e;h++){var N=new n.Node(t.NodeType.HIDDEN);N.squash=o.Identitiy,N.bias=0,_.push(N)}(s=d.connections).push.apply(s,i.Layer.connect(l,_,r.ConnectionType.ONE_TO_ONE)),v.push.apply(v,_),l=_}return(a=d.nodes).push.apply(a,Array.from(d.inputNodes)),(c=d.nodes).push.apply(c,v.reverse()),l.forEach(function(e){return d.outputNodes.add(e)}),d.outputNodes.forEach(function(e){var r;return e.squash=null!==(r=p.activation)&&void 0!==r?r:o.Logistic}),d}return e(p,u),p.prototype.connectionTypeisAllowed=function(e){return!0},p.prototype.getDefaultIncomingConnectionType=function(){return r.ConnectionType.ALL_TO_ALL},p}(i.Layer);exports.MemoryLayer=u;
},{"../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../Node":"../src/architecture/Node.js","../Layer":"../src/architecture/Layers/Layer.js"}],"../src/architecture/Layers/RecurrentLayers/RNNLayer.js":[function(require,module,exports) {
"use strict";var e=this&&this.__extends||function(){var e=function(t,o){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])})(t,o)};return function(t,o){function n(){this.constructor=t}e(t,o),t.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.RNNLayer=void 0;var t=require("activations/build/src"),o=require("../../../enums/ConnectionType"),n=require("../../../enums/NodeType"),r=require("../../Node"),i=require("../Layer"),u=function(u){function p(e,p){var c,s,a;void 0===p&&(p={});for(var y=u.call(this,e)||this,d=0;d<e;d++)y.inputNodes.add(new r.Node(n.NodeType.HIDDEN).setActivationType(null!==(a=p.activation)&&void 0!==a?a:t.Logistic));return y.outputNodes=y.inputNodes,(c=y.nodes).push.apply(c,Array.from(y.inputNodes)),(s=y.connections).push.apply(s,i.Layer.connect(y.nodes,y.nodes,o.ConnectionType.ONE_TO_ONE)),y}return e(p,u),p.prototype.connectionTypeisAllowed=function(e){return!0},p.prototype.getDefaultIncomingConnectionType=function(){return o.ConnectionType.ALL_TO_ALL},p}(i.Layer);exports.RNNLayer=u;
},{"../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../Node":"../src/architecture/Node.js","../Layer":"../src/architecture/Layers/Layer.js"}],"index.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.generateGaussian=exports.avg=exports.sum=exports.min=exports.minValueIndex=exports.maxValueIndex=exports.max=exports.shuffle=exports.getOrDefault=exports.removeFromArray=exports.randBoolean=exports.randDouble=exports.randInt=exports.pickRandom=exports.TournamentSelection=exports.PowerSelection=exports.FitnessProportionateSelection=exports.Selection=exports.InverseRate=exports.ExponentialRate=exports.StepRate=exports.FixedRate=exports.Rate=exports.SwapNodesMutation=exports.SubBackConnectionMutation=exports.AddBackConnectionMutation=exports.SubSelfConnectionMutation=exports.AddSelfConnectionMutation=exports.SubGateMutation=exports.AddGateMutation=exports.ModActivationMutation=exports.ModBiasMutation=exports.ModWeightMutation=exports.SubConnectionMutation=exports.AddConnectionMutation=exports.SubNodeMutation=exports.AddNodeMutation=exports.Mutation=exports.ONLY_STRUCTURE=exports.NO_STRUCTURE_MUTATIONS=exports.FEEDFORWARD_MUTATIONS=exports.ALL_MUTATIONS=exports.HINGELoss=exports.MSLELoss=exports.WAPELoss=exports.MAPELoss=exports.MAELoss=exports.BinaryLoss=exports.MBELoss=exports.MSELoss=exports.ALL_LOSSES=exports.NoiseNodeType=exports.PoolNodeType=exports.NodeType=exports.GatingType=exports.ConnectionType=exports.Node=exports.Network=exports.Connection=exports.Architect=exports.PoolNode=exports.NoiseNode=exports.DropoutNode=exports.ConstantNode=exports.Layer=exports.MemoryLayer=exports.LSTMLayer=exports.GRULayer=exports.RNNLayer=exports.HopfieldLayer=exports.ActivationLayer=exports.PoolingLayer=exports.GlobalMaxPooling1DLayer=exports.GlobalMinPooling1DLayer=exports.GlobalAvgPooling1DLayer=exports.MaxPooling1DLayer=exports.MinPooling1DLayer=exports.AvgPooling1DLayer=exports.NoiseLayer=exports.OutputLayer=exports.InputLayer=exports.DropoutLayer=exports.DenseLayer=void 0;var e=require("../src/architecture/Architect");Object.defineProperty(exports,"Architect",{enumerable:!0,get:function(){return e.Architect}});var r=require("../src/architecture/Connection");Object.defineProperty(exports,"Connection",{enumerable:!0,get:function(){return r.Connection}});var t=require("../src/architecture/Layers/CoreLayers/ActivationLayer");Object.defineProperty(exports,"ActivationLayer",{enumerable:!0,get:function(){return t.ActivationLayer}});var o=require("../src/architecture/Layers/CoreLayers/DenseLayer");Object.defineProperty(exports,"DenseLayer",{enumerable:!0,get:function(){return o.DenseLayer}});var n=require("../src/architecture/Layers/CoreLayers/DropoutLayer");Object.defineProperty(exports,"DropoutLayer",{enumerable:!0,get:function(){return n.DropoutLayer}});var i=require("../src/architecture/Layers/CoreLayers/InputLayer");Object.defineProperty(exports,"InputLayer",{enumerable:!0,get:function(){return i.InputLayer}});var a=require("../src/architecture/Layers/CoreLayers/OutputLayer");Object.defineProperty(exports,"OutputLayer",{enumerable:!0,get:function(){return a.OutputLayer}});var u=require("../src/architecture/Layers/Layer");Object.defineProperty(exports,"Layer",{enumerable:!0,get:function(){return u.Layer}});var s=require("../src/architecture/Layers/NoiseLayers/NoiseLayer");Object.defineProperty(exports,"NoiseLayer",{enumerable:!0,get:function(){return s.NoiseLayer}});var c=require("../src/architecture/Layers/PoolingLayers/AvgPooling1DLayer");Object.defineProperty(exports,"AvgPooling1DLayer",{enumerable:!0,get:function(){return c.AvgPooling1DLayer}});var p=require("../src/architecture/Layers/PoolingLayers/GlobalAvgPooling1DLayer");Object.defineProperty(exports,"GlobalAvgPooling1DLayer",{enumerable:!0,get:function(){return p.GlobalAvgPooling1DLayer}});var y=require("../src/architecture/Layers/PoolingLayers/GlobalMaxPooling1DLayer");Object.defineProperty(exports,"GlobalMaxPooling1DLayer",{enumerable:!0,get:function(){return y.GlobalMaxPooling1DLayer}});var b=require("../src/architecture/Layers/PoolingLayers/GlobalMinPooling1DLayer");Object.defineProperty(exports,"GlobalMinPooling1DLayer",{enumerable:!0,get:function(){return b.GlobalMinPooling1DLayer}});var d=require("../src/architecture/Layers/PoolingLayers/MaxPooling1DLayer");Object.defineProperty(exports,"MaxPooling1DLayer",{enumerable:!0,get:function(){return d.MaxPooling1DLayer}});var l=require("../src/architecture/Layers/PoolingLayers/MinPooling1DLayer");Object.defineProperty(exports,"MinPooling1DLayer",{enumerable:!0,get:function(){return l.MinPooling1DLayer}});var x=require("../src/architecture/Layers/PoolingLayers/PoolingLayer");Object.defineProperty(exports,"PoolingLayer",{enumerable:!0,get:function(){return x.PoolingLayer}});var f=require("../src/architecture/Layers/RecurrentLayers/GRULayer");Object.defineProperty(exports,"GRULayer",{enumerable:!0,get:function(){return f.GRULayer}});var L=require("../src/architecture/Layers/RecurrentLayers/HopfieldLayer");Object.defineProperty(exports,"HopfieldLayer",{enumerable:!0,get:function(){return L.HopfieldLayer}});var g=require("../src/architecture/Layers/RecurrentLayers/LSTMLayer");Object.defineProperty(exports,"LSTMLayer",{enumerable:!0,get:function(){return g.LSTMLayer}});var P=require("../src/architecture/Layers/RecurrentLayers/MemoryLayer");Object.defineProperty(exports,"MemoryLayer",{enumerable:!0,get:function(){return P.MemoryLayer}});var m=require("../src/architecture/Layers/RecurrentLayers/RNNLayer");Object.defineProperty(exports,"RNNLayer",{enumerable:!0,get:function(){return m.RNNLayer}});var O=require("../src/architecture/Network");Object.defineProperty(exports,"Network",{enumerable:!0,get:function(){return O.Network}});var M=require("../src/architecture/Node");Object.defineProperty(exports,"Node",{enumerable:!0,get:function(){return M.Node}});var N=require("../src/architecture/Nodes/ConstantNode");Object.defineProperty(exports,"ConstantNode",{enumerable:!0,get:function(){return N.ConstantNode}});var j=require("../src/architecture/Nodes/DropoutNode");Object.defineProperty(exports,"DropoutNode",{enumerable:!0,get:function(){return j.DropoutNode}});var S=require("../src/architecture/Nodes/NoiseNode");Object.defineProperty(exports,"NoiseNode",{enumerable:!0,get:function(){return S.NoiseNode}});var A=require("../src/architecture/Nodes/PoolNode");Object.defineProperty(exports,"PoolNode",{enumerable:!0,get:function(){return A.PoolNode}});var v=require("../src/enums/ConnectionType");Object.defineProperty(exports,"ConnectionType",{enumerable:!0,get:function(){return v.ConnectionType}});var T=require("../src/enums/GatingType");Object.defineProperty(exports,"GatingType",{enumerable:!0,get:function(){return T.GatingType}});var R=require("../src/enums/NodeType");Object.defineProperty(exports,"NodeType",{enumerable:!0,get:function(){return R.NodeType}}),Object.defineProperty(exports,"NoiseNodeType",{enumerable:!0,get:function(){return R.NoiseNodeType}}),Object.defineProperty(exports,"PoolNodeType",{enumerable:!0,get:function(){return R.PoolNodeType}});var D=require("../src/methods/Loss");Object.defineProperty(exports,"ALL_LOSSES",{enumerable:!0,get:function(){return D.ALL_LOSSES}}),Object.defineProperty(exports,"BinaryLoss",{enumerable:!0,get:function(){return D.BinaryLoss}}),Object.defineProperty(exports,"HINGELoss",{enumerable:!0,get:function(){return D.HINGELoss}}),Object.defineProperty(exports,"MAELoss",{enumerable:!0,get:function(){return D.MAELoss}}),Object.defineProperty(exports,"MAPELoss",{enumerable:!0,get:function(){return D.MAPELoss}}),Object.defineProperty(exports,"MBELoss",{enumerable:!0,get:function(){return D.MBELoss}}),Object.defineProperty(exports,"MSELoss",{enumerable:!0,get:function(){return D.MSELoss}}),Object.defineProperty(exports,"MSLELoss",{enumerable:!0,get:function(){return D.MSLELoss}}),Object.defineProperty(exports,"WAPELoss",{enumerable:!0,get:function(){return D.WAPELoss}});var h=require("../src/methods/Mutation");Object.defineProperty(exports,"AddBackConnectionMutation",{enumerable:!0,get:function(){return h.AddBackConnectionMutation}}),Object.defineProperty(exports,"AddConnectionMutation",{enumerable:!0,get:function(){return h.AddConnectionMutation}}),Object.defineProperty(exports,"AddGateMutation",{enumerable:!0,get:function(){return h.AddGateMutation}}),Object.defineProperty(exports,"AddNodeMutation",{enumerable:!0,get:function(){return h.AddNodeMutation}}),Object.defineProperty(exports,"AddSelfConnectionMutation",{enumerable:!0,get:function(){return h.AddSelfConnectionMutation}}),Object.defineProperty(exports,"ALL_MUTATIONS",{enumerable:!0,get:function(){return h.ALL_MUTATIONS}}),Object.defineProperty(exports,"FEEDFORWARD_MUTATIONS",{enumerable:!0,get:function(){return h.FEEDFORWARD_MUTATIONS}}),Object.defineProperty(exports,"ModActivationMutation",{enumerable:!0,get:function(){return h.ModActivationMutation}}),Object.defineProperty(exports,"ModBiasMutation",{enumerable:!0,get:function(){return h.ModBiasMutation}}),Object.defineProperty(exports,"ModWeightMutation",{enumerable:!0,get:function(){return h.ModWeightMutation}}),Object.defineProperty(exports,"Mutation",{enumerable:!0,get:function(){return h.Mutation}}),Object.defineProperty(exports,"NO_STRUCTURE_MUTATIONS",{enumerable:!0,get:function(){return h.NO_STRUCTURE_MUTATIONS}}),Object.defineProperty(exports,"ONLY_STRUCTURE",{enumerable:!0,get:function(){return h.ONLY_STRUCTURE}}),Object.defineProperty(exports,"SubBackConnectionMutation",{enumerable:!0,get:function(){return h.SubBackConnectionMutation}}),Object.defineProperty(exports,"SubConnectionMutation",{enumerable:!0,get:function(){return h.SubConnectionMutation}}),Object.defineProperty(exports,"SubGateMutation",{enumerable:!0,get:function(){return h.SubGateMutation}}),Object.defineProperty(exports,"SubNodeMutation",{enumerable:!0,get:function(){return h.SubNodeMutation}}),Object.defineProperty(exports,"SubSelfConnectionMutation",{enumerable:!0,get:function(){return h.SubSelfConnectionMutation}}),Object.defineProperty(exports,"SwapNodesMutation",{enumerable:!0,get:function(){return h.SwapNodesMutation}});var C=require("../src/methods/Rate");Object.defineProperty(exports,"ExponentialRate",{enumerable:!0,get:function(){return C.ExponentialRate}}),Object.defineProperty(exports,"FixedRate",{enumerable:!0,get:function(){return C.FixedRate}}),Object.defineProperty(exports,"InverseRate",{enumerable:!0,get:function(){return C.InverseRate}}),Object.defineProperty(exports,"Rate",{enumerable:!0,get:function(){return C.Rate}}),Object.defineProperty(exports,"StepRate",{enumerable:!0,get:function(){return C.StepRate}});var E=require("../src/methods/Selection");Object.defineProperty(exports,"FitnessProportionateSelection",{enumerable:!0,get:function(){return E.FitnessProportionateSelection}}),Object.defineProperty(exports,"PowerSelection",{enumerable:!0,get:function(){return E.PowerSelection}}),Object.defineProperty(exports,"Selection",{enumerable:!0,get:function(){return E.Selection}}),Object.defineProperty(exports,"TournamentSelection",{enumerable:!0,get:function(){return E.TournamentSelection}});var q=require("../src/utils/Utils");Object.defineProperty(exports,"avg",{enumerable:!0,get:function(){return q.avg}}),Object.defineProperty(exports,"generateGaussian",{enumerable:!0,get:function(){return q.generateGaussian}}),Object.defineProperty(exports,"getOrDefault",{enumerable:!0,get:function(){return q.getOrDefault}}),Object.defineProperty(exports,"max",{enumerable:!0,get:function(){return q.max}}),Object.defineProperty(exports,"maxValueIndex",{enumerable:!0,get:function(){return q.maxValueIndex}}),Object.defineProperty(exports,"min",{enumerable:!0,get:function(){return q.min}}),Object.defineProperty(exports,"minValueIndex",{enumerable:!0,get:function(){return q.minValueIndex}}),Object.defineProperty(exports,"pickRandom",{enumerable:!0,get:function(){return q.pickRandom}}),Object.defineProperty(exports,"randBoolean",{enumerable:!0,get:function(){return q.randBoolean}}),Object.defineProperty(exports,"randDouble",{enumerable:!0,get:function(){return q.randDouble}}),Object.defineProperty(exports,"randInt",{enumerable:!0,get:function(){return q.randInt}}),Object.defineProperty(exports,"removeFromArray",{enumerable:!0,get:function(){return q.removeFromArray}}),Object.defineProperty(exports,"shuffle",{enumerable:!0,get:function(){return q.shuffle}}),Object.defineProperty(exports,"sum",{enumerable:!0,get:function(){return q.sum}});
},{"../src/architecture/Architect":"../src/architecture/Architect.js","../src/architecture/Connection":"../src/architecture/Connection.js","../src/architecture/Layers/CoreLayers/ActivationLayer":"../src/architecture/Layers/CoreLayers/ActivationLayer.js","../src/architecture/Layers/CoreLayers/DenseLayer":"../src/architecture/Layers/CoreLayers/DenseLayer.js","../src/architecture/Layers/CoreLayers/DropoutLayer":"../src/architecture/Layers/CoreLayers/DropoutLayer.js","../src/architecture/Layers/CoreLayers/InputLayer":"../src/architecture/Layers/CoreLayers/InputLayer.js","../src/architecture/Layers/CoreLayers/OutputLayer":"../src/architecture/Layers/CoreLayers/OutputLayer.js","../src/architecture/Layers/Layer":"../src/architecture/Layers/Layer.js","../src/architecture/Layers/NoiseLayers/NoiseLayer":"../src/architecture/Layers/NoiseLayers/NoiseLayer.js","../src/architecture/Layers/PoolingLayers/AvgPooling1DLayer":"../src/architecture/Layers/PoolingLayers/AvgPooling1DLayer.js","../src/architecture/Layers/PoolingLayers/GlobalAvgPooling1DLayer":"../src/architecture/Layers/PoolingLayers/GlobalAvgPooling1DLayer.js","../src/architecture/Layers/PoolingLayers/GlobalMaxPooling1DLayer":"../src/architecture/Layers/PoolingLayers/GlobalMaxPooling1DLayer.js","../src/architecture/Layers/PoolingLayers/GlobalMinPooling1DLayer":"../src/architecture/Layers/PoolingLayers/GlobalMinPooling1DLayer.js","../src/architecture/Layers/PoolingLayers/MaxPooling1DLayer":"../src/architecture/Layers/PoolingLayers/MaxPooling1DLayer.js","../src/architecture/Layers/PoolingLayers/MinPooling1DLayer":"../src/architecture/Layers/PoolingLayers/MinPooling1DLayer.js","../src/architecture/Layers/PoolingLayers/PoolingLayer":"../src/architecture/Layers/PoolingLayers/PoolingLayer.js","../src/architecture/Layers/RecurrentLayers/GRULayer":"../src/architecture/Layers/RecurrentLayers/GRULayer.js","../src/architecture/Layers/RecurrentLayers/HopfieldLayer":"../src/architecture/Layers/RecurrentLayers/HopfieldLayer.js","../src/architecture/Layers/RecurrentLayers/LSTMLayer":"../src/architecture/Layers/RecurrentLayers/LSTMLayer.js","../src/architecture/Layers/RecurrentLayers/MemoryLayer":"../src/architecture/Layers/RecurrentLayers/MemoryLayer.js","../src/architecture/Layers/RecurrentLayers/RNNLayer":"../src/architecture/Layers/RecurrentLayers/RNNLayer.js","../src/architecture/Network":"../src/architecture/Network.js","../src/architecture/Node":"../src/architecture/Node.js","../src/architecture/Nodes/ConstantNode":"../src/architecture/Nodes/ConstantNode.js","../src/architecture/Nodes/DropoutNode":"../src/architecture/Nodes/DropoutNode.js","../src/architecture/Nodes/NoiseNode":"../src/architecture/Nodes/NoiseNode.js","../src/architecture/Nodes/PoolNode":"../src/architecture/Nodes/PoolNode.js","../src/enums/ConnectionType":"../src/enums/ConnectionType.js","../src/enums/GatingType":"../src/enums/GatingType.js","../src/enums/NodeType":"../src/enums/NodeType.js","../src/methods/Loss":"../src/methods/Loss.js","../src/methods/Mutation":"../src/methods/Mutation.js","../src/methods/Rate":"../src/methods/Rate.js","../src/methods/Selection":"../src/methods/Selection.js","../src/utils/Utils":"../src/utils/Utils.js"}]},{},["index.js"], "carrot")
//# sourceMappingURL=/index.js.map