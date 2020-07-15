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
"use strict";function r(n){if(Array.isArray(n)){if(0===n.length)throw new RangeError("Cannot pick from an empty array");return n[e(0,n.length)]}return r(Array.from(n))}function e(r,e){return Math.floor(Math.random()*(e-r)+r)}function n(r,e){return Math.random()*(e-r)+r}function t(){return Math.random()>=.5}function o(r,e){var n=r.indexOf(e);return-1!==n&&(r.splice(n,1),!0)}function a(r){for(var n=r.length-1;n>0;n--){var t=e(0,n),o=r[n];r[n]=r[t],r[t]=o}}function u(r){if(0===r.length)throw new RangeError;for(var e=r[0],n=1;n<r.length;n++)r[n]>e&&(e=r[n]);return e}function i(r){if(0===r.length)throw new RangeError;for(var e=r[0],n=0,t=1;t<r.length;t++)r[t]>e&&(e=r[t],n=t);return n}function s(r){if(0===r.length)throw new RangeError;for(var e=r[0],n=0,t=1;t<r.length;t++)r[t]<e&&(e=r[t],n=t);return n}function x(r){if(0===r.length)throw new RangeError;for(var e=r[0],n=1;n<r.length;n++)r[n]<e&&(e=r[n]);return e}function f(r){return p(r)/r.length}function p(r){if(0===r.length)throw new RangeError;for(var e=0,n=0,t=r;n<t.length;n++){e+=t[n]}return e}function l(r,e){void 0===r&&(r=0),void 0===e&&(e=2);for(var n=0,t=0;t<10;t++)n+=Math.random();return e*n/10+r-.5*e}function h(r,e){return.5*(r+e)*(r+e+1)+e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.pairing=exports.generateGaussian=exports.avg=exports.sum=exports.min=exports.minValueIndex=exports.maxValueIndex=exports.max=exports.shuffle=exports.removeFromArray=exports.randBoolean=exports.randDouble=exports.randInt=exports.pickRandom=void 0,exports.pickRandom=r,exports.randInt=e,exports.randDouble=n,exports.randBoolean=t,exports.removeFromArray=o,exports.shuffle=a,exports.max=u,exports.maxValueIndex=i,exports.minValueIndex=s,exports.min=x,exports.avg=f,exports.sum=p,exports.generateGaussian=l,exports.pairing=h;
},{}],"../src/methods/Mutation.js":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(n,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var o in n)n.hasOwnProperty(o)&&(t[o]=n[o])})(n,o)};return function(n,o){function e(){this.constructor=n}t(n,o),n.prototype=null===o?Object.create(o):(e.prototype=o.prototype,new e)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.SwapNodesMutation=exports.SubBackConnectionMutation=exports.AddBackConnectionMutation=exports.SubSelfConnectionMutation=exports.AddSelfConnectionMutation=exports.SubGateMutation=exports.AddGateMutation=exports.ModActivationMutation=exports.ModBiasMutation=exports.ModWeightMutation=exports.SubConnectionMutation=exports.AddConnectionMutation=exports.SubNodeMutation=exports.AddNodeMutation=exports.Mutation=exports.ONLY_STRUCTURE=exports.NO_STRUCTURE_MUTATIONS=exports.FEEDFORWARD_MUTATIONS=exports.ALL_MUTATIONS=void 0;var n=require("../architecture/Node"),o=require("../enums/NodeType"),e=require("../utils/Utils"),i=function(){return function(){}}();exports.Mutation=i;var r=function(i){function r(t){void 0===t&&(t=!0);var n=i.call(this)||this;return n.randomActivation=t,n}return t(r,i),r.prototype.mutate=function(t,i){if(void 0===i&&(i={}),!(void 0!==i.maxNodes&&t.nodes.length>=i.maxNodes)){var r=new n.Node(o.NodeType.HIDDEN);this.randomActivation&&r.mutateActivation();var u=e.pickRandom(Array.from(t.connections)),a=u.from,s=u.to;t.disconnect(a,s);var c=Math.max(t.inputSize,1+t.nodes.indexOf(a));t.nodes.splice(c,0,r);var d=t.connect(a,r,1),p=t.connect(r,s,u.weight);null!=u.gateNode&&(e.randBoolean()?t.addGate(u.gateNode,d):t.addGate(u.gateNode,p))}},r}(i);exports.AddNodeMutation=r;var u=function(n){function o(t){void 0===t&&(t=!0);var o=n.call(this)||this;return o.keepGates=t,o}return t(o,n),o.prototype.mutate=function(t){var n=t.nodes.filter(function(t){return void 0!==t&&t.isHiddenNode()});n.length>0&&t.removeNode(e.pickRandom(n),this.keepGates)},o}(i);exports.SubNodeMutation=u;var a=function(n){function o(){return null!==n&&n.apply(this,arguments)||this}return t(o,n),o.prototype.mutate=function(t,n){if(void 0===n&&(n={}),!(void 0!==n.maxConnections&&t.connections.size>=n.maxConnections)){for(var o=[],i=0;i<t.nodes.length-t.outputSize;i++)for(var r=t.nodes[i],u=Math.max(i+1,t.inputSize);u<t.nodes.length;u++){var a=t.nodes[u];r.isProjectingTo(a)||o.push([r,a])}if(o.length>0){var s=e.pickRandom(o);t.connect(s[0],s[1])}}},o}(i);exports.AddConnectionMutation=a;var s=function(n){function o(){return null!==n&&n.apply(this,arguments)||this}return t(o,n),o.prototype.mutate=function(t){var n=Array.from(t.connections).filter(function(t){return t.from.outgoing.size>1}).filter(function(t){return t.to.incoming.size>1}).filter(function(n){return t.nodes.indexOf(n.to)>t.nodes.indexOf(n.from)});if(n.length>0){var o=e.pickRandom(n);t.disconnect(o.from,o.to)}},o}(i);exports.SubConnectionMutation=s;var c=function(n){function o(t,o){void 0===t&&(t=-1),void 0===o&&(o=1);var e=n.call(this)||this;return e.min=t,e.max=o,e}return t(o,n),o.prototype.mutate=function(t){e.pickRandom(Array.from(t.connections)).weight+=e.randDouble(this.min,this.max)},o}(i);exports.ModWeightMutation=c;var d=function(n){function o(t,o){void 0===t&&(t=-1),void 0===o&&(o=1);var e=n.call(this)||this;return e.min=t,e.max=o,e}return t(o,n),o.prototype.mutate=function(t){e.pickRandom(t.nodes.filter(function(t){return!t.isInputNode()})).mutateBias(this)},o}(i);exports.ModBiasMutation=d;var p=function(n){function o(t){void 0===t&&(t=!1);var o=n.call(this)||this;return o.mutateOutput=t,o}return t(o,n),o.prototype.mutate=function(t,n){void 0===n&&(n={});var o=this.mutateOutput?t.nodes.filter(function(t){return!t.isInputNode()}):t.nodes.filter(function(t){return t.isHiddenNode()});o.length>0&&e.pickRandom(o).mutateActivation(n.allowedActivations)},o}(i);exports.ModActivationMutation=p;var f=function(n){function o(){return null!==n&&n.apply(this,arguments)||this}return t(o,n),o.prototype.mutate=function(t){var n=t.nodes.filter(function(t){return!t.isInputNode()}).filter(function(t){return 0===t.selfConnection.weight});if(n.length>0){var o=e.pickRandom(n);t.connect(o,o)}},o}(i);exports.AddSelfConnectionMutation=f;var l=function(n){function o(){return null!==n&&n.apply(this,arguments)||this}return t(o,n),o.prototype.mutate=function(t){var n=Array.from(t.connections).filter(function(t){return t.from===t.to});if(n.length>0){var o=e.pickRandom(n);t.disconnect(o.from,o.to)}},o}(i);exports.SubSelfConnectionMutation=l;var v=function(n){function o(){return null!==n&&n.apply(this,arguments)||this}return t(o,n),o.prototype.mutate=function(t,n){if(void 0===n&&(n={}),!(void 0!==n.maxGates&&t.gates.size>=n.maxGates)){var o=Array.from(t.connections).filter(function(t){return null===t.gateNode});if(o.length>0){var i=e.pickRandom(t.nodes.filter(function(t){return!t.isInputNode()})),r=e.pickRandom(o);t.addGate(i,r)}}},o}(i);exports.AddGateMutation=v;var m=function(n){function o(){return null!==n&&n.apply(this,arguments)||this}return t(o,n),o.prototype.mutate=function(t){t.gates.size>0&&t.removeGate(e.pickRandom(Array.from(t.gates)))},o}(i);exports.SubGateMutation=m;var h=function(n){function o(){return null!==n&&n.apply(this,arguments)||this}return t(o,n),o.prototype.mutate=function(t){for(var n=[],o=t.inputSize;o<t.nodes.length;o++)for(var i=t.nodes[o],r=t.inputSize;r<o;r++){var u=t.nodes[r];i.isProjectingTo(u)||n.push([i,u])}if(n.length>0){var a=e.pickRandom(n);t.connect(a[0],a[1])}},o}(i);exports.AddBackConnectionMutation=h;var x=function(n){function o(){return null!==n&&n.apply(this,arguments)||this}return t(o,n),o.prototype.mutate=function(t){var n=Array.from(t.connections).filter(function(t){return t.from.outgoing.size>1}).filter(function(t){return t.to.incoming.size>1}).filter(function(n){return t.nodes.indexOf(n.from)>t.nodes.indexOf(n.to)});if(n.length>0){var o=e.pickRandom(n);t.disconnect(o.from,o.to)}},o}(i);exports.SubBackConnectionMutation=x;var w=function(n){function o(t){void 0===t&&(t=!1);var o=n.call(this)||this;return o.mutateOutput=t,o}return t(o,n),o.prototype.mutate=function(t){var n=this.mutateOutput?t.nodes.filter(function(t){return void 0!==t&&!t.isInputNode()}):t.nodes.filter(function(t){return void 0!==t&&t.isHiddenNode()});if(n.length>=2){var o=e.pickRandom(n),i=e.pickRandom(n.filter(function(t){return t!==o})),r=o.bias,u=o.squash;o.bias=i.bias,o.squash=i.squash,i.bias=r,i.squash=u}},o}(i);exports.SwapNodesMutation=w;var M=[new r,new u,new a,new s,new c,new d,new p,new v,new m,new f,new l,new h,new x,new w];exports.ALL_MUTATIONS=M;var y=[new r,new u,new a,new s,new c,new d,new p,new w];exports.FEEDFORWARD_MUTATIONS=y;var N=[new c,new d,new p];exports.NO_STRUCTURE_MUTATIONS=N;var A=[new r,new u,new a,new s,new v,new m,new f,new l,new h,new x,new w];exports.ONLY_STRUCTURE=A;
},{"../architecture/Node":"../src/architecture/Node.js","../enums/NodeType":"../src/enums/NodeType.js","../utils/Utils":"../src/utils/Utils.js"}],"../src/architecture/Connection.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Connection=void 0;var t=require("../utils/Utils"),e=function(){function e(t,e,i,n){this.from=t,this.to=e,this.weight=null!=i?i:0,this.gain=1,this.eligibility=0,this.deltaWeightsPrevious=0,this.deltaWeightsTotal=0,this.xTrace=new Map,n?(this.gateNode=n,n.addGate(this)):this.gateNode=null}return e.prototype.toJSON=function(){return{fromIndex:this.from.index,toIndex:this.to.index,gateNodeIndex:null===this.gateNode?null:this.gateNode.index,weight:this.weight}},e.prototype.getInnovationID=function(){return t.pairing(this.from.index,this.to.index)},e}();exports.Connection=e;
},{"../utils/Utils":"../src/utils/Utils.js"}],"../src/architecture/Node.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Node=void 0;var t=require("activations/build/src"),i=require("../enums/NodeType"),e=require("../methods/Mutation"),o=require("../utils/Utils"),n=require("./Connection"),s=function(){function s(e){void 0===e&&(e=i.NodeType.HIDDEN),this.type=e,this.bias=o.randDouble(-1,1),this.squash=t.Logistic,this.activation=0,this.derivativeState=1,this.state=0,this.old=0,this.mask=1,this.deltaBiasPrevious=0,this.deltaBiasTotal=0,this.incoming=new Set,this.outgoing=new Set,this.gated=new Set,this.selfConnection=new n.Connection(this,this,0),this.errorResponsibility=0,this.errorProjected=0,this.errorGated=0,this.index=NaN}return s.prototype.fromJSON=function(i){var e,n,s,r;return this.bias=null!==(e=i.bias)&&void 0!==e?e:o.randDouble(-1,1),this.type=i.type,this.squash=null!==(n=i.squash)&&void 0!==n?n:t.Logistic,this.mask=null!==(s=i.mask)&&void 0!==s?s:1,this.index=null!==(r=i.index)&&void 0!==r?r:NaN,this},s.prototype.clear=function(){this.incoming.forEach(function(t){t.eligibility=0,t.xTrace.clear()}),this.gated.forEach(function(t){return t.gain=0}),this.errorResponsibility=this.errorProjected=this.errorGated=0,this.old=this.state=this.activation=0},s.prototype.mutateBias=function(t){void 0===t&&(t=new e.ModBiasMutation),this.bias+=o.randDouble(t.min,t.max)},s.prototype.mutateActivation=function(i){var e=this;void 0===i&&(i=Object.values(t.ALL_ACTIVATIONS));var n=i.filter(function(t){return t!==e.squash});n.length>0&&(this.squash=o.pickRandom(n))},s.prototype.isProjectedBy=function(t){return t===this?0!==this.selfConnection.weight:Array.from(this.incoming).map(function(t){return t.from}).includes(t)},s.prototype.isProjectingTo=function(t){return t===this?0!==this.selfConnection.weight:Array.from(this.outgoing).map(function(t){return t.to}).includes(t)},s.prototype.addGate=function(t){this.gated.add(t),t.gateNode=this},s.prototype.removeGate=function(t){this.gated.delete(t),t.gateNode=null,t.gain=1},s.prototype.connect=function(t,i,e){if(void 0===i&&(i=1),void 0===e&&(e=!1),t===this)return this.selfConnection.weight=i,this.selfConnection;if(this.isProjectingTo(t))throw new ReferenceError("Their is already a connection!");var o=new n.Connection(this,t,i);return this.outgoing.add(o),t.incoming.add(o),e&&t.connect(this),o},s.prototype.disconnect=function(t,i){if(void 0===i&&(i=!1),t===this)return this.selfConnection.weight=0,this.selfConnection;var e=Array.from(this.outgoing).filter(function(i){return i.to===t});if(0===e.length)throw new Error("No Connection found");var o=e[0];return this.outgoing.delete(o),o.to.incoming.delete(o),void 0!==o.gateNode&&null!=o.gateNode&&o.gateNode.removeGate(o),i&&t.disconnect(this),o},s.prototype.propagate=function(t,i){var e,o,n,s=this;void 0===i&&(i={}),i.momentum=null!==(e=i.momentum)&&void 0!==e?e:0,i.rate=null!==(o=i.rate)&&void 0!==o?o:.3,i.update=null===(n=i.update)||void 0===n||n,void 0!==t&&Number.isFinite(t)?this.errorResponsibility=this.errorProjected=t-this.activation:(this.errorProjected=0,this.outgoing.forEach(function(t){s.errorProjected+=t.to.errorResponsibility*t.weight*t.gain}),this.errorProjected*=this.derivativeState,this.errorGated=0,this.gated.forEach(function(t){var i;i=t.to.selfConnection.gateNode===s?t.to.old+t.weight*t.from.activation:t.weight*t.from.activation,s.errorGated+=t.to.errorResponsibility*i}),this.errorGated*=this.derivativeState,this.errorResponsibility=this.errorProjected+this.errorGated),this.incoming.forEach(function(t){var e,o,n=s.errorProjected*t.eligibility;t.xTrace.forEach(function(t,i){return n+=i.errorResponsibility*t}),t.deltaWeightsTotal+=(null!==(e=i.rate)&&void 0!==e?e:.3)*n*s.mask,i.update&&(t.deltaWeightsTotal+=(null!==(o=i.momentum)&&void 0!==o?o:0)*t.deltaWeightsPrevious,t.weight+=t.deltaWeightsTotal,t.deltaWeightsPrevious=t.deltaWeightsTotal,t.deltaWeightsTotal=0)}),this.deltaBiasTotal+=i.rate*this.errorResponsibility,i.update&&(this.deltaBiasTotal+=i.momentum*this.deltaBiasPrevious,this.bias+=this.deltaBiasTotal,this.deltaBiasPrevious=this.deltaBiasTotal,this.deltaBiasTotal=0)},s.prototype.activate=function(t,i){var e=this;if(void 0===i&&(i=!0),void 0!==t)return this.activation=t;if(this.isInputNode())throw new ReferenceError("There is no input given to an input node!");if(i){this.old=this.state,this.state=this.selfConnection.gain*this.selfConnection.weight*this.state+this.bias,this.incoming.forEach(function(t){e.state+=t.from.activation*t.weight*t.gain}),this.activation=this.squash(this.state,!1)*this.mask,this.derivativeState=this.squash(this.state,!0);var o=[],n=[];return this.gated.forEach(function(t){t.gain=e.activation;var i=o.indexOf(t.to);i>-1?n[i]+=t.weight*t.from.activation:(o.push(t.to),t.to.selfConnection.gateNode===e?n.push(t.weight*t.from.activation+t.to.old):n.push(t.weight*t.from.activation))}),this.incoming.forEach(function(t){var i;t.eligibility=e.selfConnection.gain*e.selfConnection.weight*t.eligibility+t.from.activation*t.gain;for(var s=0;s<o.length;s++){var r=o[s],a=n[s];t.xTrace.has(r)?t.xTrace.set(r,r.selfConnection.gain*r.selfConnection.weight*(null!==(i=t.xTrace.get(r))&&void 0!==i?i:0)+e.derivativeState*t.eligibility*a):t.xTrace.set(r,e.derivativeState*t.eligibility*a)}}),this.activation}return this.isInputNode()?this.activation=0:(this.state=this.selfConnection.gain*this.selfConnection.weight*this.state+this.bias,this.incoming.forEach(function(t){return e.state+=t.from.activation*t.weight*t.gain}),this.activation=this.squash(this.state,!1),this.gated.forEach(function(t){return t.gain=e.activation}),this.activation)},s.prototype.toJSON=function(){return{bias:this.bias,type:this.type,squash:this.squash,mask:this.mask,index:this.index}},s.prototype.isInputNode=function(){return this.type===i.NodeType.INPUT},s.prototype.isHiddenNode=function(){return this.type===i.NodeType.HIDDEN},s.prototype.isOutputNode=function(){return this.type===i.NodeType.OUTPUT},s.prototype.setBias=function(t){return this.bias=t,this},s.prototype.setActivationType=function(t){return this.squash=t,this},s}();exports.Node=s;
},{"../enums/NodeType":"../src/enums/NodeType.js","../methods/Mutation":"../src/methods/Mutation.js","../utils/Utils":"../src/utils/Utils.js","./Connection":"../src/architecture/Connection.js"}],"../src/enums/GatingType.js":[function(require,module,exports) {
"use strict";var e;Object.defineProperty(exports,"__esModule",{value:!0}),exports.GatingType=void 0,function(e){e[e.INPUT=0]="INPUT",e[e.SELF=1]="SELF",e[e.OUTPUT=2]="OUTPUT"}(e=exports.GatingType||(exports.GatingType={}));
},{}],"../src/architecture/Layers/Layer.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Layer=void 0;var n=require("../../enums/ConnectionType"),e=require("../../enums/GatingType"),o=function(){function o(n){this.outputSize=n,this.nodes=[],this.inputNodes=new Set,this.outputNodes=new Set,this.connections=[],this.gates=[]}return o.connect=function(e,t,r,i){if(void 0===r&&(r=n.ConnectionType.ALL_TO_ALL),void 0===i&&(i=1),r===n.ConnectionType.NO_CONNECTION)throw new ReferenceError("Cannot connect with 'NO_CONNECTION' connection type");var c=Array.from(e instanceof o?e.outputNodes:e),a=Array.from(t instanceof o?t.inputNodes:t);if(0===a.length)throw new ReferenceError("Target from has no input nodes!");if(0===c.length)throw new ReferenceError("This from has no output nodes!");var u=[];if(r===n.ConnectionType.ALL_TO_ALL)c.forEach(function(n){a.forEach(function(e){u.push(n.connect(e,i))})});else if(r===n.ConnectionType.ONE_TO_ONE){if(c.length!==a.length)throw new RangeError("Can't connect one to one! Number of output nodes from are unequal number of incoming nodes from next layer!");for(var f=0;f<c.length;f++)u.push(c[f].connect(a[f],i))}else if(r===n.ConnectionType.POOLING){var s=a.length/c.length;u.push.apply(u,c.map(function(n,e){return n.connect(a[Math.floor(e*s)],i)}))}return u},o.gate=function(n,o,t){var r=[];switch(t){case e.GatingType.INPUT:for(var i=Array.from(new Set(o.map(function(n){return n.to}))),c=function(e){var t=i[e],c=n[e%n.length];t.incoming.forEach(function(n){o.includes(n)&&(c.addGate(n),r.push(n))})},a=0;a<i.length;a++)c(a);break;case e.GatingType.SELF:var u=Array.from(new Set(o.map(function(n){return n.from})));for(a=0;a<u.length;a++)o.includes(u[a].selfConnection)&&(n[a%n.length].addGate(u[a].selfConnection),r.push(u[a].selfConnection));break;case e.GatingType.OUTPUT:u=Array.from(new Set(o.map(function(n){return n.from})));var f=function(e){var t=u[e],i=n[e%n.length];t.outgoing.forEach(function(n){o.includes(n)&&(i.addGate(n),r.push(n))})};for(a=0;a<u.length;a++)f(a)}return r},o}();exports.Layer=o;
},{"../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../enums/GatingType":"../src/enums/GatingType.js"}],"../src/architecture/Nodes/ConstantNode.js":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(e,o)};return function(e,o){function n(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.ConstantNode=void 0;var e=require("activations/build/src"),o=require("../../enums/NodeType"),n=require("../Node"),r=function(n){function r(){var t=n.call(this,o.NodeType.HIDDEN)||this;return t.bias=1,t}return t(r,n),r.prototype.fromJSON=function(t){var o,n;return this.index=null!==(o=t.index)&&void 0!==o?o:-1,this.squash=null!==(n=t.squash)&&void 0!==n?n:e.Identitiy,this},r.prototype.toJSON=function(){return{index:this.index,squash:this.squash}},r.prototype.mutateBias=function(){throw new ReferenceError("Cannot mutate a pool node!")},r.prototype.mutateActivation=function(){throw new ReferenceError("Cannot mutate a pool node!")},r.prototype.addGate=function(){throw new ReferenceError("A pool node can't gate a connection!")},r.prototype.removeGate=function(){throw new ReferenceError("A pool node can't gate a connection!")},r.prototype.setBias=function(){throw new ReferenceError("Cannot set the bias of a pool node!")},r}(n.Node);exports.ConstantNode=r;
},{"../../enums/NodeType":"../src/enums/NodeType.js","../Node":"../src/architecture/Node.js"}],"../src/architecture/Nodes/NoiseNode.js":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(e,i)};return function(e,i){function o(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(o.prototype=i.prototype,new o)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.NoiseNode=void 0;var e=require("../../enums/NodeType"),i=require("../../utils/Utils"),o=require("./ConstantNode"),r=function(o){function r(t){var i;void 0===t&&(t={});var r=o.call(this)||this;return r.noiseType=null!==(i=t.noiseType)&&void 0!==i?i:e.NoiseNodeType.GAUSSIAN_NOISE,r.options=t,r}return t(r,o),r.prototype.activate=function(){var t,o,r,n;this.old=this.state;var s=Array.from(this.incoming).map(function(t){return t.from.activation*t.weight*t.gain});switch(this.noiseType){case e.NoiseNodeType.GAUSSIAN_NOISE:this.state=i.avg(s)+i.generateGaussian(null!==(o=null===(t=this.options.gaussian)||void 0===t?void 0:t.mean)&&void 0!==o?o:0,null!==(n=null===(r=this.options.gaussian)||void 0===r?void 0:r.deviation)&&void 0!==n?n:2);break;default:throw new ReferenceError("Cannot activate this noise type!")}return this.activation=this.squash(this.state,!1)*this.mask,this.derivativeState=this.squash(this.state,!0),this.activation},r.prototype.propagate=function(t,e){var o,r,n,s=this;void 0===e&&(e={}),e.momentum=null!==(o=e.momentum)&&void 0!==o?o:0,e.rate=null!==(r=e.rate)&&void 0!==r?r:.3,e.update=null===(n=e.update)||void 0===n||n;var a=Array.from(this.outgoing).map(function(t){return t.to.errorResponsibility*t.weight*t.gain});this.errorResponsibility=this.errorProjected=i.sum(a)*this.derivativeState,this.incoming.forEach(function(t){var i,o,r=s.errorProjected*t.eligibility;t.xTrace.forEach(function(t,e){r+=e.errorResponsibility*t}),t.deltaWeightsTotal+=(null!==(i=e.rate)&&void 0!==i?i:.3)*r*s.mask,e.update&&(t.deltaWeightsTotal+=(null!==(o=e.momentum)&&void 0!==o?o:0)*t.deltaWeightsPrevious,t.weight+=t.deltaWeightsTotal,t.deltaWeightsPrevious=t.deltaWeightsTotal,t.deltaWeightsTotal=0)})},r}(o.ConstantNode);exports.NoiseNode=r;
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
},{}],"../../node_modules/activations/build/src/index.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALL_ACTIVATIONS = exports.GAUSSIAN = exports.Sinc = exports.Sinusiod = exports.SiLU = exports.BentIdentity = exports.SoftPlus = exports.LeakyRELU = exports.RELU = exports.SoftSign = exports.ArSinH = exports.ArcTan = exports.SQNL = exports.TANH = exports.Logistic = exports.BinaryStep = exports.Identitiy = void 0;
/**
 * The Identity activation function.
 * @see Identity function {@link https://en.wikipedia.org/wiki/Identity_function}
 * @param x the input value
 * @param derivative calculate the derivative
 */
const Identitiy = (x, derivative = false) => !derivative ? x : 1;
exports.Identitiy = Identitiy;
/**
 * The Binary-Step activation function.
 * @see Binary Step function {@link https://en.wikipedia.org/wiki/Heaviside_step_function}
 * @param x the input value
 * @param derivative calculate the derivative
 */
const BinaryStep = (x, derivative = false) => {
    if (!derivative) {
        return x < 0 ? 0 : 1;
    }
    else {
        return 0;
    }
};
exports.BinaryStep = BinaryStep;
/**
 * The Logistic activation function.
 * @see Logistic function {@link https://en.wikipedia.org/wiki/Logistic_function}
 * @param x the input value
 * @param derivative calculate the derivative
 */
const Logistic = (x, derivative = false) => {
    const negativeEX = Math.exp(-x);
    if (!derivative) {
        return 1 / (1 + negativeEX);
    }
    else {
        return 1 / (1 + negativeEX) * (1 - 1 / (1 + negativeEX));
    }
};
exports.Logistic = Logistic;
/**
 * The TANH activation function.
 * @see TanH function {@link https://en.wikipedia.org/wiki/Hyperbolic_function#Hyperbolic_tangent}
 * @param x the input value
 * @param derivative calculate the derivative
 */
const TANH = (x, derivative = false) => {
    if (!derivative) {
        return Math.tanh(x);
    }
    else {
        return 1 - Math.pow(Math.tanh(x), 2);
    }
};
exports.TANH = TANH;
/**
 * The SQNL activation function.
 * @see SQNL function {@link https://ieeexplore.ieee.org/document/8489043}
 * @param x the input value
 * @param derivative calculate the derivative
 */
const SQNL = (x, derivative = false) => {
    if (!derivative) {
        if (x > 2) {
            return 1;
        }
        else if (x >= 0) {
            return x - Math.pow((x / 2), 2);
        }
        else if (x >= -2) {
            return x + Math.pow((x / 2), 2);
        }
        else {
            return -1;
        }
    }
    else {
        if (x > 2) {
            return 0;
        }
        else if (x >= 0) {
            return 1 - x / 2;
        }
        else if (x >= -2) {
            return 1 + x / 2;
        }
        else {
            return 0;
        }
    }
};
exports.SQNL = SQNL;
/**
 * The ArcTAN activation function.
 * @see ArcTAN function {@link https://en.wikipedia.org/wiki/Inverse_trigonometric_functions}
 * @param x the input value
 * @param derivative calculate the derivative
 */
const ArcTan = (x, derivative = false) => {
    if (!derivative) {
        return Math.atan(x);
    }
    else {
        return 1 / (Math.pow(x, 2) + 1);
    }
};
exports.ArcTan = ArcTan;
/**
 * The ArSinH activation function.
 * @see ArSinH function {@link https://en.wikipedia.org/wiki/Inverse_hyperbolic_functions#Inverse_hyperbolic_sine}
 * @param x the input value
 * @param derivative calculate the derivative
 */
const ArSinH = (x, derivative = false) => {
    if (!derivative) {
        return Math.asinh(x);
    }
    else {
        return 1 / Math.pow((Math.pow(x, 2) + 1), (1 / 2));
    }
};
exports.ArSinH = ArSinH;
/**
 * The SoftSign activation function.
 * @see SoftSign function {@link https://sefiks.com/2017/11/10/softsign-as-a-neural-networks-activation-function/}
 * @param x the input value
 * @param derivative calculate the derivative
 */
const SoftSign = (x, derivative = false) => {
    if (!derivative) {
        return x / (1 + Math.abs(x));
    }
    else {
        return 1 / Math.pow((1 + Math.abs(x)), 2);
    }
};
exports.SoftSign = SoftSign;
/**
 * The RELU activation function.
 * @see RELU function {@link https://en.wikipedia.org/wiki/Rectifier_(neural_networks)}
 * @param x the input value
 * @param derivative calculate the derivative
 */
const RELU = (x, derivative = false) => {
    if (!derivative) {
        return x > 0 ? x : 0;
    }
    else {
        return x > 0 ? 1 : 0;
    }
};
exports.RELU = RELU;
/**
 * The Leaky RELU activation function.
 * @see Leaky RELU function {@link https://medium.com/@himanshuxd/activation-functions-sigmoid-relu-leaky-relu-and-softmax-basics-for-neural-networks-and-deep-8d9c70eed91e}
 * @param x the input value
 * @param derivative calculate the derivative
 */
const LeakyRELU = (x, derivative = false) => {
    if (!derivative) {
        return x > 0 ? x : 0.01 * x;
    }
    else {
        return x > 0 ? 1 : 0.01;
    }
};
exports.LeakyRELU = LeakyRELU;
/**
 * The SoftPlus activation function.
 * @see SoftPlus function {@link https://sefiks.com/2017/08/11/softplus-as-a-neural-networks-activation-function/}
 * @param x the input value
 * @param derivative calculate the derivative
 */
const SoftPlus = (x, derivative = false) => {
    if (!derivative) {
        return Math.log(1 + Math.exp(x));
    }
    else {
        return 1 / (1 + Math.exp(-x));
    }
};
exports.SoftPlus = SoftPlus;
/**
 * The Bent-Identity activation function.
 * @see Bent-Identity function {@link https://en.wikipedia.org/wiki/Activation_function}
 * @param x the input value
 * @param derivative calculate the derivative
 */
const BentIdentity = (x, derivative = false) => {
    if (!derivative) {
        return (Math.pow((Math.pow(x, 2) + 1), (1 / 2)) - 1) / 2 + x;
    }
    else {
        return x / (2 * Math.pow((Math.pow(x, 2) + 1), (1 / 2))) + 1;
    }
};
exports.BentIdentity = BentIdentity;
/**
 * The SiLU activation function.
 * @see SiLU function {@link https://arxiv.org/pdf/1702.03118.pdf}
 * @param x the input value
 * @param derivative calculate the derivative
 */
const SiLU = (x, derivative = false) => {
    const negativeEX = Math.exp(-x);
    if (!derivative) {
        return x / (1 + negativeEX);
    }
    else {
        return (1 + negativeEX + x * negativeEX) / Math.pow((1 + negativeEX), 2);
    }
};
exports.SiLU = SiLU;
/**
 * The Sinusoid activation function.
 * @see Sinusoid function {@link https://en.wikipedia.org/wiki/Sine_wave}
 * @param x the input value
 * @param derivative calculate the derivative
 */
const Sinusiod = (x, derivative = false) => {
    if (!derivative) {
        return Math.sin(x);
    }
    else {
        return Math.cos(x);
    }
};
exports.Sinusiod = Sinusiod;
/**
 * The Sinc activation function.
 * @see Sinc function {@link https://en.wikipedia.org/wiki/Sinc_function}
 * @param x the input value
 * @param derivative calculate the derivative
 */
const Sinc = (x, derivative = false) => {
    if (!derivative) {
        return x === 0 ? 1 : Math.sin(x) / x;
    }
    else {
        return x === 0 ? 0 : Math.cos(x) / x - Math.sin(x) / Math.pow(x, 2);
    }
};
exports.Sinc = Sinc;
/**
 * The Gaussian activation function.
 * @see Gaussian function {@link https://en.wikipedia.org/wiki/Gaussian_function}
 * @param x the input value
 * @param derivative calculate the derivative
 */
const GAUSSIAN = (x, derivative = false) => {
    if (!derivative) {
        return 1 / Math.exp(Math.pow(x, 2));
    }
    else {
        return -2 * x * Math.exp(-(Math.pow(x, 2)));
    }
};
exports.GAUSSIAN = GAUSSIAN;
exports.ALL_ACTIVATIONS = [
    Identitiy,
    BinaryStep,
    Logistic,
    TANH,
    SQNL,
    ArcTan,
    ArSinH,
    SoftSign,
    RELU,
    LeakyRELU,
    SoftPlus,
    BentIdentity,
    SiLU,
    Sinusiod,
    Sinc,
    GAUSSIAN
];

},{}],"../../node_modules/timsort/build/timsort.js":[function(require,module,exports) {
var define;
var global = arguments[3];
/****
 * The MIT License
 *
 * Copyright (c) 2015 Marco Ziccardi
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 ****/
(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define('timsort', ['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.timsort = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  exports.__esModule = true;
  exports.sort = sort;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }

  var DEFAULT_MIN_MERGE = 32;

  var DEFAULT_MIN_GALLOPING = 7;

  var DEFAULT_TMP_STORAGE_LENGTH = 256;

  var POWERS_OF_TEN = [1e0, 1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9];

  function log10(x) {
    if (x < 1e5) {
      if (x < 1e2) {
        return x < 1e1 ? 0 : 1;
      }

      if (x < 1e4) {
        return x < 1e3 ? 2 : 3;
      }

      return 4;
    }

    if (x < 1e7) {
      return x < 1e6 ? 5 : 6;
    }

    if (x < 1e9) {
      return x < 1e8 ? 7 : 8;
    }

    return 9;
  }

  function alphabeticalCompare(a, b) {
    if (a === b) {
      return 0;
    }

    if (~ ~a === a && ~ ~b === b) {
      if (a === 0 || b === 0) {
        return a < b ? -1 : 1;
      }

      if (a < 0 || b < 0) {
        if (b >= 0) {
          return -1;
        }

        if (a >= 0) {
          return 1;
        }

        a = -a;
        b = -b;
      }

      var al = log10(a);
      var bl = log10(b);

      var t = 0;

      if (al < bl) {
        a *= POWERS_OF_TEN[bl - al - 1];
        b /= 10;
        t = -1;
      } else if (al > bl) {
        b *= POWERS_OF_TEN[al - bl - 1];
        a /= 10;
        t = 1;
      }

      if (a === b) {
        return t;
      }

      return a < b ? -1 : 1;
    }

    var aStr = String(a);
    var bStr = String(b);

    if (aStr === bStr) {
      return 0;
    }

    return aStr < bStr ? -1 : 1;
  }

  function minRunLength(n) {
    var r = 0;

    while (n >= DEFAULT_MIN_MERGE) {
      r |= n & 1;
      n >>= 1;
    }

    return n + r;
  }

  function makeAscendingRun(array, lo, hi, compare) {
    var runHi = lo + 1;

    if (runHi === hi) {
      return 1;
    }

    if (compare(array[runHi++], array[lo]) < 0) {
      while (runHi < hi && compare(array[runHi], array[runHi - 1]) < 0) {
        runHi++;
      }

      reverseRun(array, lo, runHi);
    } else {
      while (runHi < hi && compare(array[runHi], array[runHi - 1]) >= 0) {
        runHi++;
      }
    }

    return runHi - lo;
  }

  function reverseRun(array, lo, hi) {
    hi--;

    while (lo < hi) {
      var t = array[lo];
      array[lo++] = array[hi];
      array[hi--] = t;
    }
  }

  function binaryInsertionSort(array, lo, hi, start, compare) {
    if (start === lo) {
      start++;
    }

    for (; start < hi; start++) {
      var pivot = array[start];

      var left = lo;
      var right = start;

      while (left < right) {
        var mid = left + right >>> 1;

        if (compare(pivot, array[mid]) < 0) {
          right = mid;
        } else {
          left = mid + 1;
        }
      }

      var n = start - left;

      switch (n) {
        case 3:
          array[left + 3] = array[left + 2];

        case 2:
          array[left + 2] = array[left + 1];

        case 1:
          array[left + 1] = array[left];
          break;
        default:
          while (n > 0) {
            array[left + n] = array[left + n - 1];
            n--;
          }
      }

      array[left] = pivot;
    }
  }

  function gallopLeft(value, array, start, length, hint, compare) {
    var lastOffset = 0;
    var maxOffset = 0;
    var offset = 1;

    if (compare(value, array[start + hint]) > 0) {
      maxOffset = length - hint;

      while (offset < maxOffset && compare(value, array[start + hint + offset]) > 0) {
        lastOffset = offset;
        offset = (offset << 1) + 1;

        if (offset <= 0) {
          offset = maxOffset;
        }
      }

      if (offset > maxOffset) {
        offset = maxOffset;
      }

      lastOffset += hint;
      offset += hint;
    } else {
      maxOffset = hint + 1;
      while (offset < maxOffset && compare(value, array[start + hint - offset]) <= 0) {
        lastOffset = offset;
        offset = (offset << 1) + 1;

        if (offset <= 0) {
          offset = maxOffset;
        }
      }
      if (offset > maxOffset) {
        offset = maxOffset;
      }

      var tmp = lastOffset;
      lastOffset = hint - offset;
      offset = hint - tmp;
    }

    lastOffset++;
    while (lastOffset < offset) {
      var m = lastOffset + (offset - lastOffset >>> 1);

      if (compare(value, array[start + m]) > 0) {
        lastOffset = m + 1;
      } else {
        offset = m;
      }
    }
    return offset;
  }

  function gallopRight(value, array, start, length, hint, compare) {
    var lastOffset = 0;
    var maxOffset = 0;
    var offset = 1;

    if (compare(value, array[start + hint]) < 0) {
      maxOffset = hint + 1;

      while (offset < maxOffset && compare(value, array[start + hint - offset]) < 0) {
        lastOffset = offset;
        offset = (offset << 1) + 1;

        if (offset <= 0) {
          offset = maxOffset;
        }
      }

      if (offset > maxOffset) {
        offset = maxOffset;
      }

      var tmp = lastOffset;
      lastOffset = hint - offset;
      offset = hint - tmp;
    } else {
      maxOffset = length - hint;

      while (offset < maxOffset && compare(value, array[start + hint + offset]) >= 0) {
        lastOffset = offset;
        offset = (offset << 1) + 1;

        if (offset <= 0) {
          offset = maxOffset;
        }
      }

      if (offset > maxOffset) {
        offset = maxOffset;
      }

      lastOffset += hint;
      offset += hint;
    }

    lastOffset++;

    while (lastOffset < offset) {
      var m = lastOffset + (offset - lastOffset >>> 1);

      if (compare(value, array[start + m]) < 0) {
        offset = m;
      } else {
        lastOffset = m + 1;
      }
    }

    return offset;
  }

  var TimSort = (function () {
    function TimSort(array, compare) {
      _classCallCheck(this, TimSort);

      this.array = null;
      this.compare = null;
      this.minGallop = DEFAULT_MIN_GALLOPING;
      this.length = 0;
      this.tmpStorageLength = DEFAULT_TMP_STORAGE_LENGTH;
      this.stackLength = 0;
      this.runStart = null;
      this.runLength = null;
      this.stackSize = 0;

      this.array = array;
      this.compare = compare;

      this.length = array.length;

      if (this.length < 2 * DEFAULT_TMP_STORAGE_LENGTH) {
        this.tmpStorageLength = this.length >>> 1;
      }

      this.tmp = new Array(this.tmpStorageLength);

      this.stackLength = this.length < 120 ? 5 : this.length < 1542 ? 10 : this.length < 119151 ? 19 : 40;

      this.runStart = new Array(this.stackLength);
      this.runLength = new Array(this.stackLength);
    }

    TimSort.prototype.pushRun = function pushRun(runStart, runLength) {
      this.runStart[this.stackSize] = runStart;
      this.runLength[this.stackSize] = runLength;
      this.stackSize += 1;
    };

    TimSort.prototype.mergeRuns = function mergeRuns() {
      while (this.stackSize > 1) {
        var n = this.stackSize - 2;

        if (n >= 1 && this.runLength[n - 1] <= this.runLength[n] + this.runLength[n + 1] || n >= 2 && this.runLength[n - 2] <= this.runLength[n] + this.runLength[n - 1]) {

          if (this.runLength[n - 1] < this.runLength[n + 1]) {
            n--;
          }
        } else if (this.runLength[n] > this.runLength[n + 1]) {
          break;
        }
        this.mergeAt(n);
      }
    };

    TimSort.prototype.forceMergeRuns = function forceMergeRuns() {
      while (this.stackSize > 1) {
        var n = this.stackSize - 2;

        if (n > 0 && this.runLength[n - 1] < this.runLength[n + 1]) {
          n--;
        }

        this.mergeAt(n);
      }
    };

    TimSort.prototype.mergeAt = function mergeAt(i) {
      var compare = this.compare;
      var array = this.array;

      var start1 = this.runStart[i];
      var length1 = this.runLength[i];
      var start2 = this.runStart[i + 1];
      var length2 = this.runLength[i + 1];

      this.runLength[i] = length1 + length2;

      if (i === this.stackSize - 3) {
        this.runStart[i + 1] = this.runStart[i + 2];
        this.runLength[i + 1] = this.runLength[i + 2];
      }

      this.stackSize--;

      var k = gallopRight(array[start2], array, start1, length1, 0, compare);
      start1 += k;
      length1 -= k;

      if (length1 === 0) {
        return;
      }

      length2 = gallopLeft(array[start1 + length1 - 1], array, start2, length2, length2 - 1, compare);

      if (length2 === 0) {
        return;
      }

      if (length1 <= length2) {
        this.mergeLow(start1, length1, start2, length2);
      } else {
        this.mergeHigh(start1, length1, start2, length2);
      }
    };

    TimSort.prototype.mergeLow = function mergeLow(start1, length1, start2, length2) {

      var compare = this.compare;
      var array = this.array;
      var tmp = this.tmp;
      var i = 0;

      for (i = 0; i < length1; i++) {
        tmp[i] = array[start1 + i];
      }

      var cursor1 = 0;
      var cursor2 = start2;
      var dest = start1;

      array[dest++] = array[cursor2++];

      if (--length2 === 0) {
        for (i = 0; i < length1; i++) {
          array[dest + i] = tmp[cursor1 + i];
        }
        return;
      }

      if (length1 === 1) {
        for (i = 0; i < length2; i++) {
          array[dest + i] = array[cursor2 + i];
        }
        array[dest + length2] = tmp[cursor1];
        return;
      }

      var minGallop = this.minGallop;

      while (true) {
        var count1 = 0;
        var count2 = 0;
        var exit = false;

        do {
          if (compare(array[cursor2], tmp[cursor1]) < 0) {
            array[dest++] = array[cursor2++];
            count2++;
            count1 = 0;

            if (--length2 === 0) {
              exit = true;
              break;
            }
          } else {
            array[dest++] = tmp[cursor1++];
            count1++;
            count2 = 0;
            if (--length1 === 1) {
              exit = true;
              break;
            }
          }
        } while ((count1 | count2) < minGallop);

        if (exit) {
          break;
        }

        do {
          count1 = gallopRight(array[cursor2], tmp, cursor1, length1, 0, compare);

          if (count1 !== 0) {
            for (i = 0; i < count1; i++) {
              array[dest + i] = tmp[cursor1 + i];
            }

            dest += count1;
            cursor1 += count1;
            length1 -= count1;
            if (length1 <= 1) {
              exit = true;
              break;
            }
          }

          array[dest++] = array[cursor2++];

          if (--length2 === 0) {
            exit = true;
            break;
          }

          count2 = gallopLeft(tmp[cursor1], array, cursor2, length2, 0, compare);

          if (count2 !== 0) {
            for (i = 0; i < count2; i++) {
              array[dest + i] = array[cursor2 + i];
            }

            dest += count2;
            cursor2 += count2;
            length2 -= count2;

            if (length2 === 0) {
              exit = true;
              break;
            }
          }
          array[dest++] = tmp[cursor1++];

          if (--length1 === 1) {
            exit = true;
            break;
          }

          minGallop--;
        } while (count1 >= DEFAULT_MIN_GALLOPING || count2 >= DEFAULT_MIN_GALLOPING);

        if (exit) {
          break;
        }

        if (minGallop < 0) {
          minGallop = 0;
        }

        minGallop += 2;
      }

      this.minGallop = minGallop;

      if (minGallop < 1) {
        this.minGallop = 1;
      }

      if (length1 === 1) {
        for (i = 0; i < length2; i++) {
          array[dest + i] = array[cursor2 + i];
        }
        array[dest + length2] = tmp[cursor1];
      } else if (length1 === 0) {
        throw new Error('mergeLow preconditions were not respected');
      } else {
        for (i = 0; i < length1; i++) {
          array[dest + i] = tmp[cursor1 + i];
        }
      }
    };

    TimSort.prototype.mergeHigh = function mergeHigh(start1, length1, start2, length2) {
      var compare = this.compare;
      var array = this.array;
      var tmp = this.tmp;
      var i = 0;

      for (i = 0; i < length2; i++) {
        tmp[i] = array[start2 + i];
      }

      var cursor1 = start1 + length1 - 1;
      var cursor2 = length2 - 1;
      var dest = start2 + length2 - 1;
      var customCursor = 0;
      var customDest = 0;

      array[dest--] = array[cursor1--];

      if (--length1 === 0) {
        customCursor = dest - (length2 - 1);

        for (i = 0; i < length2; i++) {
          array[customCursor + i] = tmp[i];
        }

        return;
      }

      if (length2 === 1) {
        dest -= length1;
        cursor1 -= length1;
        customDest = dest + 1;
        customCursor = cursor1 + 1;

        for (i = length1 - 1; i >= 0; i--) {
          array[customDest + i] = array[customCursor + i];
        }

        array[dest] = tmp[cursor2];
        return;
      }

      var minGallop = this.minGallop;

      while (true) {
        var count1 = 0;
        var count2 = 0;
        var exit = false;

        do {
          if (compare(tmp[cursor2], array[cursor1]) < 0) {
            array[dest--] = array[cursor1--];
            count1++;
            count2 = 0;
            if (--length1 === 0) {
              exit = true;
              break;
            }
          } else {
            array[dest--] = tmp[cursor2--];
            count2++;
            count1 = 0;
            if (--length2 === 1) {
              exit = true;
              break;
            }
          }
        } while ((count1 | count2) < minGallop);

        if (exit) {
          break;
        }

        do {
          count1 = length1 - gallopRight(tmp[cursor2], array, start1, length1, length1 - 1, compare);

          if (count1 !== 0) {
            dest -= count1;
            cursor1 -= count1;
            length1 -= count1;
            customDest = dest + 1;
            customCursor = cursor1 + 1;

            for (i = count1 - 1; i >= 0; i--) {
              array[customDest + i] = array[customCursor + i];
            }

            if (length1 === 0) {
              exit = true;
              break;
            }
          }

          array[dest--] = tmp[cursor2--];

          if (--length2 === 1) {
            exit = true;
            break;
          }

          count2 = length2 - gallopLeft(array[cursor1], tmp, 0, length2, length2 - 1, compare);

          if (count2 !== 0) {
            dest -= count2;
            cursor2 -= count2;
            length2 -= count2;
            customDest = dest + 1;
            customCursor = cursor2 + 1;

            for (i = 0; i < count2; i++) {
              array[customDest + i] = tmp[customCursor + i];
            }

            if (length2 <= 1) {
              exit = true;
              break;
            }
          }

          array[dest--] = array[cursor1--];

          if (--length1 === 0) {
            exit = true;
            break;
          }

          minGallop--;
        } while (count1 >= DEFAULT_MIN_GALLOPING || count2 >= DEFAULT_MIN_GALLOPING);

        if (exit) {
          break;
        }

        if (minGallop < 0) {
          minGallop = 0;
        }

        minGallop += 2;
      }

      this.minGallop = minGallop;

      if (minGallop < 1) {
        this.minGallop = 1;
      }

      if (length2 === 1) {
        dest -= length1;
        cursor1 -= length1;
        customDest = dest + 1;
        customCursor = cursor1 + 1;

        for (i = length1 - 1; i >= 0; i--) {
          array[customDest + i] = array[customCursor + i];
        }

        array[dest] = tmp[cursor2];
      } else if (length2 === 0) {
        throw new Error('mergeHigh preconditions were not respected');
      } else {
        customCursor = dest - (length2 - 1);
        for (i = 0; i < length2; i++) {
          array[customCursor + i] = tmp[i];
        }
      }
    };

    return TimSort;
  })();

  function sort(array, compare, lo, hi) {
    if (!Array.isArray(array)) {
      throw new TypeError('Can only sort arrays');
    }

    if (!compare) {
      compare = alphabeticalCompare;
    } else if (typeof compare !== 'function') {
      hi = lo;
      lo = compare;
      compare = alphabeticalCompare;
    }

    if (!lo) {
      lo = 0;
    }
    if (!hi) {
      hi = array.length;
    }

    var remaining = hi - lo;

    if (remaining < 2) {
      return;
    }

    var runLength = 0;

    if (remaining < DEFAULT_MIN_MERGE) {
      runLength = makeAscendingRun(array, lo, hi, compare);
      binaryInsertionSort(array, lo, hi, lo + runLength, compare);
      return;
    }

    var ts = new TimSort(array, compare);

    var minRun = minRunLength(remaining);

    do {
      runLength = makeAscendingRun(array, lo, hi, compare);
      if (runLength < minRun) {
        var force = remaining;
        if (force > minRun) {
          force = minRun;
        }

        binaryInsertionSort(array, lo, lo + force, lo + runLength, compare);
        runLength = force;
      }

      ts.pushRun(lo, runLength);
      ts.mergeRuns();

      remaining -= runLength;
      lo += runLength;
    } while (remaining !== 0);

    ts.forceMergeRuns();
  }
});

},{}],"../../node_modules/timsort/index.js":[function(require,module,exports) {
module.exports = require('./build/timsort.js');
},{"./build/timsort.js":"../../node_modules/timsort/build/timsort.js"}],"../src/architecture/Species.js":[function(require,module,exports) {
"use strict";var e=this&&this.__createBinding||(Object.create?function(e,t,r,i){void 0===i&&(i=r),Object.defineProperty(e,i,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,i){void 0===i&&(i=r),e[i]=t[r]}),t=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(r){if(r&&r.__esModule)return r;var i={};if(null!=r)for(var s in r)"default"!==s&&Object.hasOwnProperty.call(r,s)&&e(i,r,s);return t(i,r),i};Object.defineProperty(exports,"__esModule",{value:!0}),exports.Species=void 0;var i=r(require("timsort")),s=require("../NEAT"),o=require("../utils/Utils"),n=require("./Network"),u=function(){function e(e){this.representative=e,this.representative.species=this,this.members=new Set,this.members.add(e),this.score=0}return e.prototype.put=function(e){return e.distance(this.representative)<s.NEAT.SPECIES_DISTANCE_THRESHOLD&&(this.forcePut(e),!0)},e.prototype.forcePut=function(e){void 0!==e&&(this.members.add(e),e.species=this)},e.prototype.evaluateScore=function(){var e=0;this.members.forEach(function(t){var r;return e+=null!==(r=t.score)&&void 0!==r?r:0}),this.score=e/this.members.size},e.prototype.reset=function(){this.representative=o.pickRandom(this.members),this.members.forEach(function(e){return e.species=null}),this.members.clear(),this.members.add(this.representative),this.representative.species=this,this.score=0},e.prototype.kill=function(e){var t=Array.from(this.members);i.sort(t,function(e,t){return void 0===e.score||void 0===t.score?0:e.score-t.score});for(var r=Math.floor(e*this.members.size),s=0;s<r;s++)this.members.delete(t[s]),t[s].species=null},e.prototype.breed=function(){return n.Network.crossOver(o.pickRandom(this.members),o.pickRandom(this.members))},e.prototype.size=function(){return this.members.size},e.prototype.getBest=function(){var e=Array.from(this.members);return e[o.maxValueIndex(e.map(function(e){var t;return null!==(t=e.score)&&void 0!==t?t:-1/0}))]},e}();exports.Species=u;
},{"../NEAT":"../src/NEAT.js","../utils/Utils":"../src/utils/Utils.js","./Network":"../src/architecture/Network.js"}],"../src/methods/Selection.js":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function o(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}}(),e=this&&this.__createBinding||(Object.create?function(t,e,r,o){void 0===o&&(o=r),Object.defineProperty(t,o,{enumerable:!0,get:function(){return e[r]}})}:function(t,e,r,o){void 0===o&&(o=r),t[o]=e[r]}),r=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),o=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var o={};if(null!=t)for(var n in t)"default"!==n&&Object.hasOwnProperty.call(t,n)&&e(o,t,n);return r(o,t),o};Object.defineProperty(exports,"__esModule",{value:!0}),exports.TournamentSelection=exports.PowerSelection=exports.FitnessProportionateSelection=exports.Selection=void 0;var n=o(require("timsort")),i=require("../utils/Utils"),s=function(){return function(){}}();exports.Selection=s;var u=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return t(r,e),r.prototype.select=function(t){for(var e,r,o,n=0,s=0,u=0,c=t;u<c.length;u++){var a=c[u];s=Math.min(null!==(e=a.score)&&void 0!==e?e:s,s),n+=null!==(r=a.score)&&void 0!==r?r:0}n+=(s=Math.abs(s))*t.length;for(var l=i.randDouble(0,n),p=0,f=0,h=t;f<h.length;f++){if(l<(p+=(null!==(o=(a=h[f]).score)&&void 0!==o?o:0)+s))return a}return i.pickRandom(t)},r}(s);exports.FitnessProportionateSelection=u;var c=function(e){function r(t){void 0===t&&(t=4);var r=e.call(this)||this;return r.power=t,r}return t(r,e),r.prototype.select=function(t){return t[Math.floor(Math.pow(Math.random(),this.power)*t.length)]},r}(s);exports.PowerSelection=c;var a=function(e){function r(t,r){void 0===t&&(t=5),void 0===r&&(r=.5);var o=e.call(this)||this;return o.size=t,o.probability=r,o}return t(r,e),r.prototype.select=function(t){if(this.size>t.length)throw new Error("Your tournament size should be lower than the population size, please change methods.selection.TOURNAMENT.size");for(var e=[],r=0;r<this.size;r++)e.push(i.pickRandom(t));n.sort(e,function(t,e){return void 0===e.score||void 0===t.score?0:e.score-t.score});for(r=0;r<this.size;r++)if(Math.random()<this.probability||r===this.size-1)return e[r];return i.pickRandom(t)},r}(s);exports.TournamentSelection=a;
},{"../utils/Utils":"../src/utils/Utils.js"}],"../src/NEAT.js":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

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
    sent: function sent() {
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

    while (_) {
      try {
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
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NEAT = void 0;

var src_1 = require("activations/build/src");

var TimSort = __importStar(require("timsort"));

var Network_1 = require("./architecture/Network");

var Species_1 = require("./architecture/Species");

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
   */
  function NEAT(options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;

    if (!options.fitnessFunction) {
      throw new ReferenceError("No fitness function given!");
    }

    this.dataset = options.dataset;

    if (options.dataset && options.dataset.length > 0) {
      this.input = options.dataset[0].input.length;
      this.output = options.dataset[0].output.length;
      this.trainOptions = (_a = options.training) !== null && _a !== void 0 ? _a : null;
    } else {
      this.trainOptions = null;
      this.input = (_b = options.input) !== null && _b !== void 0 ? _b : 0;
      this.output = (_c = options.output) !== null && _c !== void 0 ? _c : 0;
    }

    this.generation = (_d = options.generation) !== null && _d !== void 0 ? _d : 0;
    this.elitism = (_e = options.elitism) !== null && _e !== void 0 ? _e : 1;
    this.equal = (_f = options.equal) !== null && _f !== void 0 ? _f : true;
    this.clear = (_g = options.clear) !== null && _g !== void 0 ? _g : false;
    this.populationSize = (_h = options.populationSize) !== null && _h !== void 0 ? _h : 50;
    this.mutationRate = (_j = options.mutationRate) !== null && _j !== void 0 ? _j : 0.6;
    this.mutationAmount = (_k = options.mutationAmount) !== null && _k !== void 0 ? _k : 5;
    this.fitnessFunction = options.fitnessFunction;
    this.selection = (_l = options.selection) !== null && _l !== void 0 ? _l : new Selection_1.FitnessProportionateSelection();
    this.mutations = (_m = options.mutations) !== null && _m !== void 0 ? _m : Mutation_1.FEEDFORWARD_MUTATIONS;
    this.activations = (_o = options.activations) !== null && _o !== void 0 ? _o : Object.values(src_1.ALL_ACTIVATIONS);
    this.template = (_p = options.template) !== null && _p !== void 0 ? _p : new Network_1.Network(this.input, this.output);
    this.maxNodes = (_q = options.maxNodes) !== null && _q !== void 0 ? _q : Infinity;
    this.maxConnections = (_r = options.maxConnections) !== null && _r !== void 0 ? _r : Infinity;
    this.maxGates = (_s = options.maxGates) !== null && _s !== void 0 ? _s : Infinity;
    this.population = [];
    this.species = new Set();

    for (var i = 0; i < this.populationSize; i++) {
      this.population.push(this.template.copy());
    }
  }
  /**
   * Mutate a network with a random mutation from the allowed array.
   *
   * @param network The network which will be mutated.
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
   * @returns {Network} Fittest network
   */


  NEAT.prototype.evolve = function () {
    return __awaiter(this, void 0, void 0, function () {
      var elitists, _i, _a, genome, fittest;

      var _b;

      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            this.genSpecies();
            if (!(this.population[this.population.length - 1].score === undefined)) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , this.evaluate()];

          case 1:
            _c.sent();

            this.sort();
            _c.label = 2;

          case 2:
            this.species.forEach(function (species) {
              return species.evaluateScore();
            });
            this.kill(1 - NEAT.SURVIVORS);
            this.removeExtinctSpecies();
            this.reproduce();
            elitists = this.population.splice(0, this.elitism);
            this.mutate();

            (_b = this.population).splice.apply(_b, __spreadArrays([0, 0], elitists));

            if (this.trainOptions !== null) {
              for (_i = 0, _a = this.population; _i < _a.length; _i++) {
                genome = _a[_i];
                genome.train(this.trainOptions);
              }
            } // evaluate the population


            return [4
            /*yield*/
            , this.evaluate()];

          case 3:
            // evaluate the population
            _c.sent(); // Sort in order of fitness (fittest first)


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
   * Mutates the given (or current) population
   *
   * @param {Mutation} [method] A mutation method to mutate the population with. When not specified will pick a random mutation from the set allowed mutations.
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
   * @todo implement a quicksort algorithm in utils
   */


  NEAT.prototype.sort = function () {
    TimSort.sort(this.population, function (a, b) {
      return a.score === undefined || b.score === undefined ? 0 : b.score - a.score;
    });
  };
  /**
   * Returns the fittest genome of the current population
   *
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
   */


  NEAT.prototype.replacePopulation = function (genomes) {
    this.population = genomes;
    this.populationSize = genomes.length;
  };
  /**
   * Reproduce the population, by replacing the killed networks
   * @private
   */


  NEAT.prototype.reproduce = function () {
    var speciesArr = Array.from(this.species);

    for (var i = 0; i < this.population.length; i++) {
      if (this.population[i].species === null) {
        var selectedSpecies = this.selection.select(speciesArr);
        this.population[i] = selectedSpecies.breed();
        selectedSpecies.forcePut(this.population[i]);
      }
    }
  };
  /**
   * Remove empty species
   * @private
   */


  NEAT.prototype.removeExtinctSpecies = function () {
    for (var _i = 0, _a = Array.from(this.species); _i < _a.length; _i++) {
      var species = _a[_i];

      if (species.size() <= 1) {
        species.members.forEach(function (member) {
          return member.species = null;
        });
        this.species.delete(species);
      }
    }
  };
  /**
   * Kill bad networks
   * @param killRate
   * @private
   */


  NEAT.prototype.kill = function (killRate) {
    this.species.forEach(function (species) {
      return species.kill(killRate);
    });
  };
  /**
   * Generate species
   * @private
   */


  NEAT.prototype.genSpecies = function () {
    var _this = this;

    this.species.forEach(function (species) {
      return species.reset();
    });
    this.population.filter(function (genome) {
      return genome.species === null;
    }).forEach(function (genome) {
      var found = false;

      for (var _i = 0, _a = Array.from(_this.species); _i < _a.length; _i++) {
        var species = _a[_i];

        if (species.put(genome)) {
          found = true;
          break;
        }
      }

      if (!found) {
        _this.species.add(new Species_1.Species(genome));
      }
    });
  };
  /**
   * How big could the distance be between two networks in a species
   */


  NEAT.SPECIES_DISTANCE_THRESHOLD = 3;
  NEAT.C1 = 1;
  NEAT.C2 = 1;
  NEAT.C3 = 1;
  NEAT.SURVIVORS = 0.8;
  return NEAT;
}();

exports.NEAT = NEAT;
},{"activations/build/src":"../../node_modules/activations/build/src/index.js","timsort":"../../node_modules/timsort/index.js","./architecture/Network":"../src/architecture/Network.js","./architecture/Species":"../src/architecture/Species.js","./methods/Mutation":"../src/methods/Mutation.js","./methods/Selection":"../src/methods/Selection.js","./utils/Utils":"../src/utils/Utils.js"}],"../src/architecture/Network.js":[function(require,module,exports) {
"use strict";var t=this&&this.__assign||function(){return(t=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t}).apply(this,arguments)},e=this&&this.__createBinding||(Object.create?function(t,e,n,o){void 0===o&&(o=n),Object.defineProperty(t,o,{enumerable:!0,get:function(){return e[n]}})}:function(t,e,n,o){void 0===o&&(o=n),t[o]=e[n]}),n=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),o=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var o={};if(null!=t)for(var i in t)"default"!==i&&Object.hasOwnProperty.call(t,i)&&e(o,t,i);return n(o,t),o},i=this&&this.__awaiter||function(t,e,n,o){return new(n||(n=Promise))(function(i,r){function s(t){try{u(o.next(t))}catch(e){r(e)}}function a(t){try{u(o.throw(t))}catch(e){r(e)}}function u(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n(function(t){t(e)})).then(s,a)}u((o=o.apply(t,e||[])).next())})},r=this&&this.__generator||function(t,e){var n,o,i,r,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return r={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function a(r){return function(a){return function(r){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,o&&(i=2&r[0]?o.return:r[0]?o.throw||((i=o.return)&&i.call(o),0):o.next)&&!(i=i.call(o,r[1])).done)return i;switch(o=0,i&&(r=[2&r[0],i.value]),r[0]){case 0:case 1:i=r;break;case 4:return s.label++,{value:r[1],done:!1};case 5:s.label++,o=r[1],r=[0];continue;case 7:r=s.ops.pop(),s.trys.pop();continue;default:if(!(i=(i=s.trys).length>0&&i[i.length-1])&&(6===r[0]||2===r[0])){s=0;continue}if(3===r[0]&&(!i||r[1]>i[0]&&r[1]<i[3])){s.label=r[1];break}if(6===r[0]&&s.label<i[1]){s.label=i[1],i=r;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(r);break}i[2]&&s.ops.pop(),s.trys.pop();continue}r=e.call(t,s)}catch(a){r=[6,a],o=0}finally{n=i=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}([r,a])}}},s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.Network=void 0;var a=s(require("os")),u=require("threads"),d=require("threads/dist");require("threads/register");var c=o(require("timsort")),l=require("../enums/NodeType"),h=require("../methods/Loss"),f=require("../methods/Mutation"),p=require("../methods/Rate"),v=require("../NEAT"),g=require("../utils/Utils"),m=require("./Node"),w=function(){function e(t,e){this.inputSize=t,this.outputSize=e,this.nodes=[],this.connections=new Set,this.gates=new Set,this.score=void 0,this.species=null;for(var n=0;n<t;n++)this.nodes.push(new m.Node(l.NodeType.INPUT));for(n=0;n<e;n++)this.nodes.push(new m.Node(l.NodeType.OUTPUT));for(n=0;n<this.inputSize;n++)for(var o=this.inputSize;o<this.outputSize+this.inputSize;o++){var i=(Math.random()-.5)*this.inputSize*Math.sqrt(2/this.inputSize);this.connect(this.nodes[n],this.nodes[o],i)}}return e.fromJSON=function(t){var n=new e(t.inputSize,t.outputSize);return n.nodes=[],n.connections.clear(),t.nodes.map(function(t){return(new m.Node).fromJSON(t)}).forEach(function(t){return n.nodes[t.index]=t}),t.connections.forEach(function(t){var e=n.connect(n.nodes[t.fromIndex],n.nodes[t.toIndex],t.weight);null!=t.gateNodeIndex&&n.addGate(n.nodes[t.gateNodeIndex],e)}),n},e.crossOver=function(t,n){var o,i;if(t.inputSize!==n.inputSize||t.outputSize!==n.outputSize)throw new Error("Networks don`t have the same input/output size!");var r=new e(t.inputSize,t.outputSize);r.connections.clear(),r.nodes=[];var s,a=null!==(o=t.score)&&void 0!==o?o:0,u=null!==(i=n.score)&&void 0!==i?i:0;if(a===u){var d=Math.max(t.nodes.length,n.nodes.length),c=Math.min(t.nodes.length,n.nodes.length);s=g.randInt(c,d+1)}else s=a>u?t.nodes.length:n.nodes.length;for(var h=t.inputSize,f=t.outputSize,p=0;p<t.nodes.length;p++)t.nodes[p].index=p;for(p=0;p<n.nodes.length;p++)n.nodes[p].index=p;for(p=0;p<s;p++){var v=void 0,w=null;if(p<h){w=l.NodeType.INPUT;for(var N=g.randBoolean()?t:n,S=-1,y=-1;S<p;){if(y++>=N.nodes.length)throw RangeError("something is wrong with the size of the input");N.nodes[y].isInputNode()&&S++}v=N.nodes[y]}else if(p<h+f){w=l.NodeType.OUTPUT;N=g.randBoolean()?t:n;var E=-1;for(y=-1;E<p-h;){if(++y>=N.nodes.length)throw RangeError("something is wrong with the size of the output");N.nodes[y].isOutputNode()&&E++}v=N.nodes[y]}else{w=l.NodeType.HIDDEN;N=void 0;N=p>=t.nodes.length?n:p>=n.nodes.length?t:g.randBoolean()?t:n,v=g.pickRandom(N.nodes)}var z=new m.Node(w);z.bias=v.bias,z.squash=v.squash,r.nodes.push(z)}var b=[],I=[];t.connections.forEach(function(t){b[g.pairing(t.from.index,t.to.index)]=t.toJSON()}),n.connections.forEach(function(t){I[g.pairing(t.from.index,t.to.index)]=t.toJSON()});var x=[],O=Object.keys(b),T=Object.keys(I);for(p=O.length-1;p>=0;p--)void 0!==I[parseInt(O[p])]?(x.push(g.randBoolean()?b[parseInt(O[p])]:I[parseInt(O[p])]),I[parseInt(O[p])]=void 0):a>=u&&x.push(b[parseInt(O[p])]);return u>=a&&T.map(function(t){return parseInt(t)}).map(function(t){return I[t]}).filter(function(t){return void 0!==t}).forEach(function(t){return x.push(t)}),x.forEach(function(t){if(void 0!==t&&t.toIndex<s&&t.fromIndex<s){var e=r.nodes[t.fromIndex],n=r.nodes[t.toIndex],o=r.connect(e,n,t.weight);null!==t.gateNodeIndex&&t.gateNodeIndex<s&&r.addGate(r.nodes[t.gateNodeIndex],o)}}),r},e.prototype.copy=function(){return e.fromJSON(this.toJSON())},e.prototype.connect=function(t,e,n){void 0===n&&(n=0);var o=t.connect(e,n);return this.connections.add(o),o},e.prototype.activate=function(t,e){var n,o;if(void 0===e&&(e={}),t.length!==this.inputSize)throw new RangeError("Input size of dataset is different to network input size!");return e.dropoutRate=null!==(n=e.dropoutRate)&&void 0!==n?n:0,e.trace=null===(o=e.trace)||void 0===o||o,this.nodes.filter(function(t){return t.isInputNode()}).forEach(function(n,o){return n.activate(t[o],e.trace)}),this.nodes.filter(function(t){return t.isHiddenNode()}).forEach(function(t){e.dropoutRate&&(t.mask=Math.random()>=e.dropoutRate?1:0),t.activate(void 0,e.trace)}),this.nodes.filter(function(t){return t.isOutputNode()}).map(function(t){return t.activate(void 0,e.trace)})},e.prototype.propagate=function(t,e){var n,o,i;if(void 0===e&&(e={}),e.rate=null!==(n=e.rate)&&void 0!==n?n:.3,e.momentum=null!==(o=e.momentum)&&void 0!==o?o:0,e.update=null!==(i=e.update)&&void 0!==i&&i,t.length!==this.outputSize)throw new Error("Output target length should match network output length");this.nodes.filter(function(t){return t.isOutputNode()}).forEach(function(n,o){return n.propagate(t[o],e)});for(var r=this.nodes.length-1;r>=0;r--)this.nodes[r].isHiddenNode()&&this.nodes[r].propagate(void 0,e);this.nodes.filter(function(t){return t.isInputNode()}).forEach(function(t){return t.propagate(void 0,e)})},e.prototype.clear=function(){this.nodes.forEach(function(t){return t.clear()})},e.prototype.disconnect=function(t,e){var n=this;return this.connections.forEach(function(o){o.from===t&&o.to===e&&(null!==o.gateNode&&n.removeGate(o),n.connections.delete(o))}),t.disconnect(e)},e.prototype.addGate=function(t,e){if(-1===this.nodes.indexOf(t))throw new ReferenceError("This node is not part of the network!");null==e.gateNode&&(t.addGate(e),this.gates.add(e))},e.prototype.removeGate=function(t){if(!this.gates.has(t))throw new Error("This connection is not gated!");this.gates.delete(t),null!=t.gateNode&&t.gateNode.removeGate(t)},e.prototype.removeNode=function(t,e){var n=this;if(void 0===e&&(e=(new f.SubNodeMutation).keepGates),!this.nodes.includes(t))throw new ReferenceError("This node does not exist in the network!");this.disconnect(t,t);var o=[],i=[],r=[],s=[];for(t.incoming.forEach(function(r){e&&null!==r.gateNode&&r.gateNode!==t&&i.push(r.gateNode),o.push(r.from),n.disconnect(r.from,t)}),t.outgoing.forEach(function(o){e&&null!==o.gateNode&&o.gateNode!==t&&i.push(o.gateNode),r.push(o.to),n.disconnect(t,o.to)}),o.forEach(function(t){r.forEach(function(e){t.isProjectingTo(e)||s.push(n.connect(t,e))})});i.length>0&&s.length>0;){var a=i.shift();if(void 0!==a){var u=g.pickRandom(s);this.addGate(a,u),g.removeFromArray(s,u)}}t.gated.forEach(this.removeGate),g.removeFromArray(this.nodes,t)},e.prototype.mutate=function(t,e){t.mutate(this,e)},e.prototype.mutateRandom=function(t,e){void 0===t&&(t=f.ALL_MUTATIONS),void 0===e&&(e={}),0!==t.length&&this.mutate(g.pickRandom(t),e)},e.prototype.train=function(e){var n,o,i,r,s,a,u,d,c,l;if(!e.dataset||e.dataset[0].input.length!==this.inputSize||e.dataset[0].output.length!==this.outputSize)throw new Error("Dataset input/output size should be same as network input/output size!");e.iterations=null!==(n=e.iterations)&&void 0!==n?n:-1,e.error=null!==(o=e.error)&&void 0!==o?o:-1,e.loss=null!==(i=e.loss)&&void 0!==i?i:h.MSELoss,e.dropout=null!==(r=e.dropout)&&void 0!==r?r:0,e.momentum=null!==(s=e.momentum)&&void 0!==s?s:0,e.batchSize=Math.min(e.dataset.length,null!==(a=e.batchSize)&&void 0!==a?a:e.dataset.length);var f=null!==(u=e.rate)&&void 0!==u?u:.3;e.ratePolicy=null!==(d=e.ratePolicy)&&void 0!==d?d:new p.FixedRate(f),e.log=null!==(c=e.log)&&void 0!==c?c:NaN;var v,m,w,N,S=Date.now();if(e.iterations<=0&&e.error<=0)throw new Error("At least one of the following options must be specified: error, iterations");e.crossValidateTestSize&&e.crossValidateTestSize>0?(v=Math.ceil((1-e.crossValidateTestSize)*e.dataset.length),m=e.dataset.slice(0,v),w=e.dataset.slice(v)):(m=e.dataset,w=[]);for(var y=0,E=1;E>e.error&&(e.iterations<=0||y<e.iterations);){y++,N=e.ratePolicy.calc(y);var z=this.trainEpoch(t(t({},e),{dataset:m,trainingRate:N}));if(!Number.isFinite(z))throw new RangeError;e.clear&&this.clear(),e.crossValidateTestSize?(E=this.test(w,e.loss),e.clear&&this.clear()):E=z,null!==(l=e.shuffle)&&void 0!==l&&l&&g.shuffle(e.dataset),e.log>0&&y%e.log==0&&console.log("iteration number",y,"error",E,"training rate",N),e.schedule&&y%e.schedule.iterations==0&&e.schedule.function(E,y)}return e.clear&&this.clear(),{error:E,iterations:y,time:Date.now()-S}},e.prototype.test=function(t,e){void 0===e&&(e=h.MSELoss);for(var n=0,o=0,i=t;o<i.length;o++){var r=i[o],s=r.input;n+=e(r.output,this.activate(s,{trace:!1}))}return n/t.length},e.prototype.toJSON=function(){for(var t={nodes:[],connections:[],inputSize:this.inputSize,outputSize:this.outputSize},e=0;e<this.nodes.length;e++)this.nodes[e].index=e;return this.nodes.forEach(function(e){t.nodes.push(e.toJSON()),0!==e.selfConnection.weight&&t.connections.push(e.selfConnection.toJSON())}),this.connections.forEach(function(e){t.connections.push(e.toJSON())}),t},e.prototype.evolve=function(t){var e,n,o,s,c,l,f,p,g;return void 0===t&&(t={}),i(this,void 0,void 0,function(){var m,w,N,S,y,E,z,b,I,x;return r(this,function(O){switch(O.label){case 0:if(!t.fitnessFunction&&t.dataset&&(t.dataset[0].input.length!==this.inputSize||t.dataset[0].output.length!==this.outputSize))throw new Error("Dataset input/output size should be same as network input/output size!");m=0,void 0===t.iterations&&void 0===t.error?(t.iterations=1e3,m=.05):t.iterations?m=-1:t.error&&(m=t.error,t.iterations=0),t.loss=null!==(e=t.loss)&&void 0!==e?e:h.MSELoss,t.maxNodes=null!==(n=t.maxNodes)&&void 0!==n?n:1/0,t.maxConnections=null!==(o=t.maxConnections)&&void 0!==o?o:1/0,t.maxGates=null!==(s=t.maxGates)&&void 0!==s?s:1/0,t.input=this.inputSize,t.output=this.outputSize,w=Date.now(),t.fitnessFunction||(S=JSON.stringify(t.dataset),y=Object.values(h.ALL_LOSSES).indexOf(null!==(c=t.loss)&&void 0!==c?c:h.MSELoss),N=d.Pool(function(){return u.spawn(new u.Worker("../multithreading/TestWorker"))},null!==(l=t.threads)&&void 0!==l?l:a.default.cpus().length),t.fitnessFunction=function(t){return i(this,void 0,void 0,function(){var e,n,o,s,a=this;return r(this,function(u){switch(u.label){case 0:for(e=function(t){N.queue(function(e){return i(a,void 0,void 0,function(){var n;return r(this,function(o){switch(o.label){case 0:if(void 0===t)throw new ReferenceError;return n=t,[4,e(S,JSON.stringify(t.toJSON()),y)];case 1:return n.score=-o.sent(),[2]}})})})},n=0,o=t;n<o.length;n++)s=o[n],e(s);return[4,N.completed()];case 1:return u.sent(),[2]}})})}),t.template=this,E=new v.NEAT(t),b=0,I=this,O.label=1;case 1:return[4,E.evolve()];case 2:if(!(x=O.sent()).score)throw new ReferenceError;z=x.score,(1===E.generation||x.score>b)&&(b=x.score,I=x),(null!==(f=t.log)&&void 0!==f?f:0)>0&&E.generation%(null!==(p=t.log)&&void 0!==p?p:0)==0&&console.log("iteration",E.generation,"error",-z),t.schedule&&E.generation%t.schedule.iterations==0&&t.schedule.function(x.score,-z,E.generation),O.label=3;case 3:if(z<-m&&(0===t.iterations||E.generation<(null!==(g=t.iterations)&&void 0!==g?g:0)))return[3,1];O.label=4;case 4:return void 0!==I&&(this.nodes=I.nodes,this.connections=I.connections,this.gates=I.gates,t.clear&&this.clear()),N?[4,N.terminate()]:[3,6];case 5:O.sent(),O.label=6;case 6:return[2,{error:-z,iterations:E.generation,time:Date.now()-w}]}})})},e.prototype.distance=function(t){for(var e=this,n=0;n<e.nodes.length;n++)e.nodes[n].index=n;for(n=0;n<t.nodes.length;n++)t.nodes[n].index=n;var o=0,i=0,r=Array.from(e.connections).filter(function(t){return void 0!==t}),s=Array.from(t.connections).filter(function(t){return void 0!==t});if(c.sort(r,function(t,e){return t.getInnovationID()-e.getInnovationID()}),c.sort(s,function(t,e){return t.getInnovationID()-e.getInnovationID()}),r[r.length-1].getInnovationID()<s[s.length-1].getInnovationID()){var a=e;e=t,t=a}for(var u=0,d=0,l=0;o<r.length&&i<s.length;){var h=r[o],f=s[i];if(void 0===h||void 0===f)throw Error("HERE");h.getInnovationID()===f.getInnovationID()?(o++,i++,d+=Math.abs(h.weight-f.weight),l++):o>i?(i++,u++):(o++,u++)}d/=l;var p=e.connections.size-o,g=Math.max(e.connections.size,t.connections.size);return g<20&&(g=1),v.NEAT.C1*p/g+v.NEAT.C2*u/g+v.NEAT.C3*d},e.prototype.trainEpoch=function(t){for(var e,n,o,i=0,r=0;r<t.dataset.length;r++){var s=t.dataset[r].input,a=t.dataset[r].output,u=(r+1)%(null!==(e=t.batchSize)&&void 0!==e?e:t.dataset.length)==0||r+1===t.dataset.length,d=this.activate(s,{dropoutRate:null!==(n=t.dropoutRate)&&void 0!==n?n:.5});this.propagate(a,{rate:t.trainingRate,momentum:t.momentum,update:u}),i+=(null!==(o=t.loss)&&void 0!==o?o:h.MSELoss)(a,d)}return i/t.dataset.length},e}();exports.Network=w;
},{"../enums/NodeType":"../src/enums/NodeType.js","../methods/Loss":"../src/methods/Loss.js","../methods/Mutation":"../src/methods/Mutation.js","../methods/Rate":"../src/methods/Rate.js","../NEAT":"../src/NEAT.js","../utils/Utils":"../src/utils/Utils.js","./Node":"../src/architecture/Node.js"}],"../src/architecture/Architect.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Architect=void 0;var e=require("./Layers/CoreLayers/InputLayer"),r=require("./Layers/CoreLayers/OutputLayer"),t=require("./Layers/Layer"),n=require("./Network"),a=function(){function a(){this.layers=[]}return a.prototype.addLayer=function(e,r){var t=null!=r?r:e.getDefaultIncomingConnectionType();if(!e.connectionTypeisAllowed(t))throw new ReferenceError("Connection type "+t+" is not allowed at layer "+e.constructor.name);return this.layers.push({layer:e,incomingConnectionType:t}),this},a.prototype.buildModel=function(){var a,s;if(!(this.layers[0].layer instanceof e.InputLayer))throw new ReferenceError("First layer has to be a InputLayer! Currently is: "+this.layers[0].layer.constructor.name);if(!(this.layers[this.layers.length-1].layer instanceof r.OutputLayer))throw new ReferenceError("Last layer has to be a OutputLayer! Currently is: "+this.layers[this.layers.length-1].layer.constructor.name);var o=this.layers[0].layer.nodes.length,i=this.layers[this.layers.length-1].layer.nodes.length,y=new n.Network(o,i);y.nodes=[],y.connections.clear();for(var l=0;l<this.layers.length-1;l++)t.Layer.connect(this.layers[l].layer,this.layers[l+1].layer,this.layers[l+1].incomingConnectionType).forEach(function(e){return y.connections.add(e)}),(a=y.nodes).push.apply(a,this.layers[l].layer.nodes),this.layers[l].layer.connections.forEach(function(e){return y.connections.add(e)}),this.layers[l].layer.gates.forEach(function(e){return y.gates.add(e)});return(s=y.nodes).push.apply(s,this.layers[this.layers.length-1].layer.nodes),y},a}();exports.Architect=a;
},{"./Layers/CoreLayers/InputLayer":"../src/architecture/Layers/CoreLayers/InputLayer.js","./Layers/CoreLayers/OutputLayer":"../src/architecture/Layers/CoreLayers/OutputLayer.js","./Layers/Layer":"../src/architecture/Layers/Layer.js","./Network":"../src/architecture/Network.js"}],"../src/architecture/Nodes/ActivationNode.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

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

    var _a, _b, _c;

    options.momentum = (_a = options.momentum) !== null && _a !== void 0 ? _a : 0;
    options.rate = (_b = options.rate) !== null && _b !== void 0 ? _b : 0.3;
    options.update = (_c = options.update) !== null && _c !== void 0 ? _c : true;
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
"use strict";var t=this&&this.__extends||function(){var t=function(o,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var i in o)o.hasOwnProperty(i)&&(t[i]=o[i])})(o,i)};return function(o,i){function r(){this.constructor=o}t(o,i),o.prototype=null===i?Object.create(i):(r.prototype=i.prototype,new r)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.DropoutNode=void 0;var o=require("../../utils/Utils"),i=require("./ConstantNode"),r=function(i){function r(t){var o=i.call(this)||this;return o.probability=t,o.droppedOut=!1,o}return t(r,i),r.prototype.activate=function(){var t=this;if(1!==this.incoming.size)throw new RangeError("Dropout node should have exactly one incoming connection!");var i=Array.from(this.incoming)[0];return o.randDouble(0,1)<this.probability?(this.droppedOut=!0,this.state=0):(this.droppedOut=!1,this.state=i.from.activation*i.weight*i.gain,this.state*=1/(1-this.probability)),this.activation=this.squash(this.state,!1)*this.mask,this.gated.forEach(function(o){return o.gain=t.activation}),this.activation},r.prototype.propagate=function(t,i){var r,e,n;void 0===i&&(i={}),i.momentum=null!==(r=i.momentum)&&void 0!==r?r:0,i.rate=null!==(e=i.rate)&&void 0!==e?e:.3,i.update=null===(n=i.update)||void 0===n||n;var a=Array.from(this.outgoing).map(function(t){return t.to.errorResponsibility*t.weight*t.gain});if(this.errorResponsibility=this.errorProjected=o.sum(a)/(1-this.probability),1!==this.incoming.size)throw new RangeError("Dropout node should have exactly one incoming connection!");var s=Array.from(this.incoming)[0];if(!this.droppedOut){var u=this.errorProjected*s.eligibility;s.xTrace.forEach(function(t,o){u+=o.errorResponsibility*t}),i.update&&(s.deltaWeightsTotal+=i.rate*u*this.mask+i.momentum*s.deltaWeightsPrevious,s.weight+=s.deltaWeightsTotal,s.deltaWeightsPrevious=s.deltaWeightsTotal,s.deltaWeightsTotal=0)}},r.prototype.fromJSON=function(t){return i.prototype.fromJSON.call(this,t),this.probability=t.probability,this},r.prototype.toJSON=function(){return Object.assign(i.prototype.toJSON.call(this),{probability:this.probability})},r}(i.ConstantNode);exports.DropoutNode=r;
},{"../../utils/Utils":"../src/utils/Utils.js","./ConstantNode":"../src/architecture/Nodes/ConstantNode.js"}],"../src/architecture/Layers/CoreLayers/DropoutLayer.js":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(o,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var e in o)o.hasOwnProperty(e)&&(t[e]=o[e])})(o,e)};return function(o,e){function n(){this.constructor=o}t(o,e),o.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.DropoutLayer=void 0;var o=require("activations/build/src"),e=require("../../../enums/ConnectionType"),n=require("../../Nodes/DropoutNode"),r=require("../Layer"),i=function(r){function i(t,e){var i,u,p;void 0===e&&(e={});for(var c=r.call(this,t)||this,s=null!==(u=e.activation)&&void 0!==u?u:o.Identitiy,a=null!==(p=e.probability)&&void 0!==p?p:.1,y=0;y<t;y++)c.inputNodes.add(new n.DropoutNode(a).setActivationType(s));return c.outputNodes=c.inputNodes,(i=c.nodes).push.apply(i,Array.from(c.inputNodes)),c}return t(i,r),i.prototype.getDefaultIncomingConnectionType=function(){return e.ConnectionType.ONE_TO_ONE},i.prototype.connectionTypeisAllowed=function(t){return t===e.ConnectionType.ONE_TO_ONE},i}(r.Layer);exports.DropoutLayer=i;
},{"../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../Nodes/DropoutNode":"../src/architecture/Nodes/DropoutNode.js","../Layer":"../src/architecture/Layers/Layer.js"}],"../src/architecture/Nodes/PoolNode.js":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(o,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var e in o)o.hasOwnProperty(e)&&(t[e]=o[e])})(o,e)};return function(o,e){function i(){this.constructor=o}t(o,e),o.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.PoolNode=void 0;var o=require("../../enums/NodeType"),e=require("../../utils/Utils"),i=require("./ConstantNode"),r=function(i){function r(t){void 0===t&&(t=o.PoolNodeType.MAX_POOLING);var e=i.call(this)||this;return e.poolingType=t,e.receivingNode=null,e}return t(r,i),r.prototype.fromJSON=function(t){return i.prototype.fromJSON.call(this,t),this.poolingType=t.poolType,this},r.prototype.activate=function(){var t=this,i=Array.from(this.incoming),r=i.map(function(t){return t.from.activation*t.weight*t.gain});if(this.poolingType===o.PoolNodeType.MAX_POOLING){var n=e.maxValueIndex(r);this.receivingNode=i[n].from,this.state=r[n]}else if(this.poolingType===o.PoolNodeType.AVG_POOLING)this.state=e.avg(r);else{if(this.poolingType!==o.PoolNodeType.MIN_POOLING)throw new ReferenceError("No valid pooling type! Type: "+this.poolingType);n=e.minValueIndex(r);this.receivingNode=i[n].from,this.state=r[n]}return this.activation=this.squash(this.state,!1)*this.mask,this.poolingType===o.PoolNodeType.AVG_POOLING&&(this.derivativeState=this.squash(this.state,!0)),this.gated.forEach(function(o){return o.gain=t.activation}),this.activation},r.prototype.propagate=function(t,i){var r,n,s,a=this;void 0===i&&(i={}),i.momentum=null!==(r=i.momentum)&&void 0!==r?r:0,i.rate=null!==(n=i.rate)&&void 0!==n?n:.3,i.update=null===(s=i.update)||void 0===s||s;var p=Array.from(this.outgoing).map(function(t){return t.to.errorResponsibility*t.weight*t.gain});this.errorResponsibility=this.errorProjected=e.sum(p)*this.derivativeState,this.poolingType===o.PoolNodeType.AVG_POOLING?this.incoming.forEach(function(t){var o,e,r=a.errorProjected*t.eligibility;t.xTrace.forEach(function(t,o){r+=o.errorResponsibility*t}),t.deltaWeightsTotal+=(null!==(o=i.rate)&&void 0!==o?o:.3)*r*a.mask,i.update&&(t.deltaWeightsTotal+=(null!==(e=i.momentum)&&void 0!==e?e:0)*t.deltaWeightsPrevious,t.weight+=t.deltaWeightsTotal,t.deltaWeightsPrevious=t.deltaWeightsTotal,t.deltaWeightsTotal=0)}):this.incoming.forEach(function(t){t.weight=a.receivingNode===t.from?1:0,t.gain=a.receivingNode===t.from?1:0})},r.prototype.toJSON=function(){return Object.assign(i.prototype.toJSON.call(this),{poolType:this.poolingType})},r}(i.ConstantNode);exports.PoolNode=r;
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
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.generateGaussian=exports.avg=exports.sum=exports.min=exports.minValueIndex=exports.maxValueIndex=exports.max=exports.shuffle=exports.removeFromArray=exports.randBoolean=exports.randDouble=exports.randInt=exports.pickRandom=exports.TournamentSelection=exports.PowerSelection=exports.FitnessProportionateSelection=exports.Selection=exports.InverseRate=exports.ExponentialRate=exports.StepRate=exports.FixedRate=exports.Rate=exports.SwapNodesMutation=exports.SubBackConnectionMutation=exports.AddBackConnectionMutation=exports.SubSelfConnectionMutation=exports.AddSelfConnectionMutation=exports.SubGateMutation=exports.AddGateMutation=exports.ModActivationMutation=exports.ModBiasMutation=exports.ModWeightMutation=exports.SubConnectionMutation=exports.AddConnectionMutation=exports.SubNodeMutation=exports.AddNodeMutation=exports.Mutation=exports.ONLY_STRUCTURE=exports.NO_STRUCTURE_MUTATIONS=exports.FEEDFORWARD_MUTATIONS=exports.ALL_MUTATIONS=exports.HINGELoss=exports.MSLELoss=exports.WAPELoss=exports.MAPELoss=exports.MAELoss=exports.BinaryLoss=exports.MBELoss=exports.MSELoss=exports.ALL_LOSSES=exports.NoiseNodeType=exports.PoolNodeType=exports.NodeType=exports.GatingType=exports.ConnectionType=exports.Node=exports.Species=exports.Network=exports.Connection=exports.Architect=exports.PoolNode=exports.NoiseNode=exports.DropoutNode=exports.ConstantNode=exports.Layer=exports.MemoryLayer=exports.LSTMLayer=exports.GRULayer=exports.RNNLayer=exports.HopfieldLayer=exports.ActivationLayer=exports.PoolingLayer=exports.GlobalMaxPooling1DLayer=exports.GlobalMinPooling1DLayer=exports.GlobalAvgPooling1DLayer=exports.MaxPooling1DLayer=exports.MinPooling1DLayer=exports.AvgPooling1DLayer=exports.NoiseLayer=exports.OutputLayer=exports.InputLayer=exports.DropoutLayer=exports.DenseLayer=void 0;var e=require("../src/architecture/Architect");Object.defineProperty(exports,"Architect",{enumerable:!0,get:function(){return e.Architect}});var r=require("../src/architecture/Connection");Object.defineProperty(exports,"Connection",{enumerable:!0,get:function(){return r.Connection}});var t=require("../src/architecture/Layers/CoreLayers/ActivationLayer");Object.defineProperty(exports,"ActivationLayer",{enumerable:!0,get:function(){return t.ActivationLayer}});var o=require("../src/architecture/Layers/CoreLayers/DenseLayer");Object.defineProperty(exports,"DenseLayer",{enumerable:!0,get:function(){return o.DenseLayer}});var n=require("../src/architecture/Layers/CoreLayers/DropoutLayer");Object.defineProperty(exports,"DropoutLayer",{enumerable:!0,get:function(){return n.DropoutLayer}});var i=require("../src/architecture/Layers/CoreLayers/InputLayer");Object.defineProperty(exports,"InputLayer",{enumerable:!0,get:function(){return i.InputLayer}});var a=require("../src/architecture/Layers/CoreLayers/OutputLayer");Object.defineProperty(exports,"OutputLayer",{enumerable:!0,get:function(){return a.OutputLayer}});var u=require("../src/architecture/Layers/Layer");Object.defineProperty(exports,"Layer",{enumerable:!0,get:function(){return u.Layer}});var s=require("../src/architecture/Layers/NoiseLayers/NoiseLayer");Object.defineProperty(exports,"NoiseLayer",{enumerable:!0,get:function(){return s.NoiseLayer}});var c=require("../src/architecture/Layers/PoolingLayers/AvgPooling1DLayer");Object.defineProperty(exports,"AvgPooling1DLayer",{enumerable:!0,get:function(){return c.AvgPooling1DLayer}});var p=require("../src/architecture/Layers/PoolingLayers/GlobalAvgPooling1DLayer");Object.defineProperty(exports,"GlobalAvgPooling1DLayer",{enumerable:!0,get:function(){return p.GlobalAvgPooling1DLayer}});var y=require("../src/architecture/Layers/PoolingLayers/GlobalMaxPooling1DLayer");Object.defineProperty(exports,"GlobalMaxPooling1DLayer",{enumerable:!0,get:function(){return y.GlobalMaxPooling1DLayer}});var b=require("../src/architecture/Layers/PoolingLayers/GlobalMinPooling1DLayer");Object.defineProperty(exports,"GlobalMinPooling1DLayer",{enumerable:!0,get:function(){return b.GlobalMinPooling1DLayer}});var d=require("../src/architecture/Layers/PoolingLayers/MaxPooling1DLayer");Object.defineProperty(exports,"MaxPooling1DLayer",{enumerable:!0,get:function(){return d.MaxPooling1DLayer}});var l=require("../src/architecture/Layers/PoolingLayers/MinPooling1DLayer");Object.defineProperty(exports,"MinPooling1DLayer",{enumerable:!0,get:function(){return l.MinPooling1DLayer}});var x=require("../src/architecture/Layers/PoolingLayers/PoolingLayer");Object.defineProperty(exports,"PoolingLayer",{enumerable:!0,get:function(){return x.PoolingLayer}});var f=require("../src/architecture/Layers/RecurrentLayers/GRULayer");Object.defineProperty(exports,"GRULayer",{enumerable:!0,get:function(){return f.GRULayer}});var L=require("../src/architecture/Layers/RecurrentLayers/HopfieldLayer");Object.defineProperty(exports,"HopfieldLayer",{enumerable:!0,get:function(){return L.HopfieldLayer}});var g=require("../src/architecture/Layers/RecurrentLayers/LSTMLayer");Object.defineProperty(exports,"LSTMLayer",{enumerable:!0,get:function(){return g.LSTMLayer}});var P=require("../src/architecture/Layers/RecurrentLayers/MemoryLayer");Object.defineProperty(exports,"MemoryLayer",{enumerable:!0,get:function(){return P.MemoryLayer}});var m=require("../src/architecture/Layers/RecurrentLayers/RNNLayer");Object.defineProperty(exports,"RNNLayer",{enumerable:!0,get:function(){return m.RNNLayer}});var O=require("../src/architecture/Network");Object.defineProperty(exports,"Network",{enumerable:!0,get:function(){return O.Network}});var M=require("../src/architecture/Node");Object.defineProperty(exports,"Node",{enumerable:!0,get:function(){return M.Node}});var N=require("../src/architecture/Nodes/ConstantNode");Object.defineProperty(exports,"ConstantNode",{enumerable:!0,get:function(){return N.ConstantNode}});var j=require("../src/architecture/Nodes/DropoutNode");Object.defineProperty(exports,"DropoutNode",{enumerable:!0,get:function(){return j.DropoutNode}});var S=require("../src/architecture/Nodes/NoiseNode");Object.defineProperty(exports,"NoiseNode",{enumerable:!0,get:function(){return S.NoiseNode}});var A=require("../src/architecture/Nodes/PoolNode");Object.defineProperty(exports,"PoolNode",{enumerable:!0,get:function(){return A.PoolNode}});var v=require("../src/architecture/Species");Object.defineProperty(exports,"Species",{enumerable:!0,get:function(){return v.Species}});var T=require("../src/enums/ConnectionType");Object.defineProperty(exports,"ConnectionType",{enumerable:!0,get:function(){return T.ConnectionType}});var R=require("../src/enums/GatingType");Object.defineProperty(exports,"GatingType",{enumerable:!0,get:function(){return R.GatingType}});var D=require("../src/enums/NodeType");Object.defineProperty(exports,"NodeType",{enumerable:!0,get:function(){return D.NodeType}}),Object.defineProperty(exports,"NoiseNodeType",{enumerable:!0,get:function(){return D.NoiseNodeType}}),Object.defineProperty(exports,"PoolNodeType",{enumerable:!0,get:function(){return D.PoolNodeType}});var h=require("../src/methods/Loss");Object.defineProperty(exports,"ALL_LOSSES",{enumerable:!0,get:function(){return h.ALL_LOSSES}}),Object.defineProperty(exports,"BinaryLoss",{enumerable:!0,get:function(){return h.BinaryLoss}}),Object.defineProperty(exports,"HINGELoss",{enumerable:!0,get:function(){return h.HINGELoss}}),Object.defineProperty(exports,"MAELoss",{enumerable:!0,get:function(){return h.MAELoss}}),Object.defineProperty(exports,"MAPELoss",{enumerable:!0,get:function(){return h.MAPELoss}}),Object.defineProperty(exports,"MBELoss",{enumerable:!0,get:function(){return h.MBELoss}}),Object.defineProperty(exports,"MSELoss",{enumerable:!0,get:function(){return h.MSELoss}}),Object.defineProperty(exports,"MSLELoss",{enumerable:!0,get:function(){return h.MSLELoss}}),Object.defineProperty(exports,"WAPELoss",{enumerable:!0,get:function(){return h.WAPELoss}});var C=require("../src/methods/Mutation");Object.defineProperty(exports,"AddBackConnectionMutation",{enumerable:!0,get:function(){return C.AddBackConnectionMutation}}),Object.defineProperty(exports,"AddConnectionMutation",{enumerable:!0,get:function(){return C.AddConnectionMutation}}),Object.defineProperty(exports,"AddGateMutation",{enumerable:!0,get:function(){return C.AddGateMutation}}),Object.defineProperty(exports,"AddNodeMutation",{enumerable:!0,get:function(){return C.AddNodeMutation}}),Object.defineProperty(exports,"AddSelfConnectionMutation",{enumerable:!0,get:function(){return C.AddSelfConnectionMutation}}),Object.defineProperty(exports,"ALL_MUTATIONS",{enumerable:!0,get:function(){return C.ALL_MUTATIONS}}),Object.defineProperty(exports,"FEEDFORWARD_MUTATIONS",{enumerable:!0,get:function(){return C.FEEDFORWARD_MUTATIONS}}),Object.defineProperty(exports,"ModActivationMutation",{enumerable:!0,get:function(){return C.ModActivationMutation}}),Object.defineProperty(exports,"ModBiasMutation",{enumerable:!0,get:function(){return C.ModBiasMutation}}),Object.defineProperty(exports,"ModWeightMutation",{enumerable:!0,get:function(){return C.ModWeightMutation}}),Object.defineProperty(exports,"Mutation",{enumerable:!0,get:function(){return C.Mutation}}),Object.defineProperty(exports,"NO_STRUCTURE_MUTATIONS",{enumerable:!0,get:function(){return C.NO_STRUCTURE_MUTATIONS}}),Object.defineProperty(exports,"ONLY_STRUCTURE",{enumerable:!0,get:function(){return C.ONLY_STRUCTURE}}),Object.defineProperty(exports,"SubBackConnectionMutation",{enumerable:!0,get:function(){return C.SubBackConnectionMutation}}),Object.defineProperty(exports,"SubConnectionMutation",{enumerable:!0,get:function(){return C.SubConnectionMutation}}),Object.defineProperty(exports,"SubGateMutation",{enumerable:!0,get:function(){return C.SubGateMutation}}),Object.defineProperty(exports,"SubNodeMutation",{enumerable:!0,get:function(){return C.SubNodeMutation}}),Object.defineProperty(exports,"SubSelfConnectionMutation",{enumerable:!0,get:function(){return C.SubSelfConnectionMutation}}),Object.defineProperty(exports,"SwapNodesMutation",{enumerable:!0,get:function(){return C.SwapNodesMutation}});var E=require("../src/methods/Rate");Object.defineProperty(exports,"ExponentialRate",{enumerable:!0,get:function(){return E.ExponentialRate}}),Object.defineProperty(exports,"FixedRate",{enumerable:!0,get:function(){return E.FixedRate}}),Object.defineProperty(exports,"InverseRate",{enumerable:!0,get:function(){return E.InverseRate}}),Object.defineProperty(exports,"Rate",{enumerable:!0,get:function(){return E.Rate}}),Object.defineProperty(exports,"StepRate",{enumerable:!0,get:function(){return E.StepRate}});var q=require("../src/methods/Selection");Object.defineProperty(exports,"FitnessProportionateSelection",{enumerable:!0,get:function(){return q.FitnessProportionateSelection}}),Object.defineProperty(exports,"PowerSelection",{enumerable:!0,get:function(){return q.PowerSelection}}),Object.defineProperty(exports,"Selection",{enumerable:!0,get:function(){return q.Selection}}),Object.defineProperty(exports,"TournamentSelection",{enumerable:!0,get:function(){return q.TournamentSelection}});var G=require("../src/utils/Utils");Object.defineProperty(exports,"avg",{enumerable:!0,get:function(){return G.avg}}),Object.defineProperty(exports,"generateGaussian",{enumerable:!0,get:function(){return G.generateGaussian}}),Object.defineProperty(exports,"max",{enumerable:!0,get:function(){return G.max}}),Object.defineProperty(exports,"maxValueIndex",{enumerable:!0,get:function(){return G.maxValueIndex}}),Object.defineProperty(exports,"min",{enumerable:!0,get:function(){return G.min}}),Object.defineProperty(exports,"minValueIndex",{enumerable:!0,get:function(){return G.minValueIndex}}),Object.defineProperty(exports,"pickRandom",{enumerable:!0,get:function(){return G.pickRandom}}),Object.defineProperty(exports,"randBoolean",{enumerable:!0,get:function(){return G.randBoolean}}),Object.defineProperty(exports,"randDouble",{enumerable:!0,get:function(){return G.randDouble}}),Object.defineProperty(exports,"randInt",{enumerable:!0,get:function(){return G.randInt}}),Object.defineProperty(exports,"removeFromArray",{enumerable:!0,get:function(){return G.removeFromArray}}),Object.defineProperty(exports,"shuffle",{enumerable:!0,get:function(){return G.shuffle}}),Object.defineProperty(exports,"sum",{enumerable:!0,get:function(){return G.sum}});
},{"../src/architecture/Architect":"../src/architecture/Architect.js","../src/architecture/Connection":"../src/architecture/Connection.js","../src/architecture/Layers/CoreLayers/ActivationLayer":"../src/architecture/Layers/CoreLayers/ActivationLayer.js","../src/architecture/Layers/CoreLayers/DenseLayer":"../src/architecture/Layers/CoreLayers/DenseLayer.js","../src/architecture/Layers/CoreLayers/DropoutLayer":"../src/architecture/Layers/CoreLayers/DropoutLayer.js","../src/architecture/Layers/CoreLayers/InputLayer":"../src/architecture/Layers/CoreLayers/InputLayer.js","../src/architecture/Layers/CoreLayers/OutputLayer":"../src/architecture/Layers/CoreLayers/OutputLayer.js","../src/architecture/Layers/Layer":"../src/architecture/Layers/Layer.js","../src/architecture/Layers/NoiseLayers/NoiseLayer":"../src/architecture/Layers/NoiseLayers/NoiseLayer.js","../src/architecture/Layers/PoolingLayers/AvgPooling1DLayer":"../src/architecture/Layers/PoolingLayers/AvgPooling1DLayer.js","../src/architecture/Layers/PoolingLayers/GlobalAvgPooling1DLayer":"../src/architecture/Layers/PoolingLayers/GlobalAvgPooling1DLayer.js","../src/architecture/Layers/PoolingLayers/GlobalMaxPooling1DLayer":"../src/architecture/Layers/PoolingLayers/GlobalMaxPooling1DLayer.js","../src/architecture/Layers/PoolingLayers/GlobalMinPooling1DLayer":"../src/architecture/Layers/PoolingLayers/GlobalMinPooling1DLayer.js","../src/architecture/Layers/PoolingLayers/MaxPooling1DLayer":"../src/architecture/Layers/PoolingLayers/MaxPooling1DLayer.js","../src/architecture/Layers/PoolingLayers/MinPooling1DLayer":"../src/architecture/Layers/PoolingLayers/MinPooling1DLayer.js","../src/architecture/Layers/PoolingLayers/PoolingLayer":"../src/architecture/Layers/PoolingLayers/PoolingLayer.js","../src/architecture/Layers/RecurrentLayers/GRULayer":"../src/architecture/Layers/RecurrentLayers/GRULayer.js","../src/architecture/Layers/RecurrentLayers/HopfieldLayer":"../src/architecture/Layers/RecurrentLayers/HopfieldLayer.js","../src/architecture/Layers/RecurrentLayers/LSTMLayer":"../src/architecture/Layers/RecurrentLayers/LSTMLayer.js","../src/architecture/Layers/RecurrentLayers/MemoryLayer":"../src/architecture/Layers/RecurrentLayers/MemoryLayer.js","../src/architecture/Layers/RecurrentLayers/RNNLayer":"../src/architecture/Layers/RecurrentLayers/RNNLayer.js","../src/architecture/Network":"../src/architecture/Network.js","../src/architecture/Node":"../src/architecture/Node.js","../src/architecture/Nodes/ConstantNode":"../src/architecture/Nodes/ConstantNode.js","../src/architecture/Nodes/DropoutNode":"../src/architecture/Nodes/DropoutNode.js","../src/architecture/Nodes/NoiseNode":"../src/architecture/Nodes/NoiseNode.js","../src/architecture/Nodes/PoolNode":"../src/architecture/Nodes/PoolNode.js","../src/architecture/Species":"../src/architecture/Species.js","../src/enums/ConnectionType":"../src/enums/ConnectionType.js","../src/enums/GatingType":"../src/enums/GatingType.js","../src/enums/NodeType":"../src/enums/NodeType.js","../src/methods/Loss":"../src/methods/Loss.js","../src/methods/Mutation":"../src/methods/Mutation.js","../src/methods/Rate":"../src/methods/Rate.js","../src/methods/Selection":"../src/methods/Selection.js","../src/utils/Utils":"../src/utils/Utils.js"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
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
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "32919" + '/');

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