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
"use strict";function r(t){if(Array.isArray(t)){if(0===t.length)throw new RangeError("Cannot pick from an empty array");return t[e(0,t.length)]}return r(Array.from(t))}function e(r,e){return Math.floor(Math.random()*(e-r)+r)}function t(r,e){return Math.random()*(e-r)+r}function n(){return Math.random()>=.5}function o(r,e){const t=r.indexOf(e);return-1!==t&&(r.splice(t,1),!0)}function a(r){for(let t=r.length-1;t>0;t--){const n=e(0,t),o=r[t];r[t]=r[n],r[n]=o}}function s(r){if(0===r.length)throw new RangeError;let e=r[0];for(let t=1;t<r.length;t++)r[t]>e&&(e=r[t]);return e}function u(r){if(0===r.length)throw new RangeError;let e=r[0],t=0;for(let n=1;n<r.length;n++)r[n]>e&&(e=r[n],t=n);return t}function i(r){if(0===r.length)throw new RangeError;let e=r[0],t=0;for(let n=1;n<r.length;n++)r[n]<e&&(e=r[n],t=n);return t}function l(r){if(0===r.length)throw new RangeError;let e=r[0];for(let t=1;t<r.length;t++)r[t]<e&&(e=r[t]);return e}function f(r){return x(r)/r.length}function x(r){if(0===r.length)throw new RangeError;let e=0;for(const t of r)e+=t;return e}function p(r=0,e=2){let t=0;for(let n=0;n<10;n++)t+=Math.random();return e*t/10+r-.5*e}function h(r,e){return.5*(r+e)*(r+e+1)+e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.pairing=exports.generateGaussian=exports.avg=exports.sum=exports.min=exports.minValueIndex=exports.maxValueIndex=exports.max=exports.shuffle=exports.removeFromArray=exports.randBoolean=exports.randDouble=exports.randInt=exports.pickRandom=void 0,exports.pickRandom=r,exports.randInt=e,exports.randDouble=t,exports.randBoolean=n,exports.removeFromArray=o,exports.shuffle=a,exports.max=s,exports.maxValueIndex=u,exports.minValueIndex=i,exports.min=l,exports.avg=f,exports.sum=x,exports.generateGaussian=p,exports.pairing=h;
},{}],"../src/methods/Mutation.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.SwapNodesMutation=exports.SubBackConnectionMutation=exports.AddBackConnectionMutation=exports.SubSelfConnectionMutation=exports.AddSelfConnectionMutation=exports.SubGateMutation=exports.AddGateMutation=exports.ModActivationMutation=exports.ModBiasMutation=exports.ModWeightMutation=exports.SubConnectionMutation=exports.AddConnectionMutation=exports.SubNodeMutation=exports.AddNodeMutation=exports.Mutation=exports.ONLY_STRUCTURE=exports.NO_STRUCTURE_MUTATIONS=exports.FEEDFORWARD_MUTATIONS=exports.ALL_MUTATIONS=void 0;const t=require("../architecture/Node"),e=require("../enums/NodeType"),n=require("../utils/Utils");class o{}exports.Mutation=o;class s extends o{constructor(t=!0){super(),this.randomActivation=t}mutate(o,s={}){if(void 0!==s.maxNodes&&o.nodes.length>=s.maxNodes)return;const i=new t.Node(e.NodeType.HIDDEN);this.randomActivation&&i.mutateActivation();const a=n.pickRandom(Array.from(o.connections)),c=a.from,d=a.to;o.disconnect(c,d);const r=Math.max(o.inputSize,1+o.nodes.indexOf(c));o.nodes.splice(r,0,i);const u=o.connect(c,i,1),p=o.connect(i,d,a.weight);null!=a.gateNode&&(n.randBoolean()?o.addGate(a.gateNode,u):o.addGate(a.gateNode,p))}}exports.AddNodeMutation=s;class i extends o{constructor(t=!0){super(),this.keepGates=t}mutate(t){const e=t.nodes.filter(t=>void 0!==t&&t.isHiddenNode());e.length>0&&t.removeNode(n.pickRandom(e),this.keepGates)}}exports.SubNodeMutation=i;class a extends o{mutate(t,e={}){if(void 0!==e.maxConnections&&t.connections.size>=e.maxConnections)return;const o=[];for(let n=0;n<t.nodes.length-t.outputSize;n++){const e=t.nodes[n];for(let s=Math.max(n+1,t.inputSize);s<t.nodes.length;s++){const n=t.nodes[s];e.isProjectingTo(n)||o.push([e,n])}}if(o.length>0){const e=n.pickRandom(o);t.connect(e[0],e[1])}}}exports.AddConnectionMutation=a;class c extends o{mutate(t){const e=Array.from(t.connections).filter(t=>t.from.outgoing.size>1).filter(t=>t.to.incoming.size>1).filter(e=>t.nodes.indexOf(e.to)>t.nodes.indexOf(e.from));if(e.length>0){const o=n.pickRandom(e);t.disconnect(o.from,o.to)}}}exports.SubConnectionMutation=c;class d extends o{constructor(t=-1,e=1){super(),this.min=t,this.max=e}mutate(t){n.pickRandom(Array.from(t.connections)).weight+=n.randDouble(this.min,this.max)}}exports.ModWeightMutation=d;class r extends o{constructor(t=-1,e=1){super(),this.min=t,this.max=e}mutate(t){n.pickRandom(t.nodes.filter(t=>!t.isInputNode())).mutateBias(this)}}exports.ModBiasMutation=r;class u extends o{constructor(t=!1){super(),this.mutateOutput=t}mutate(t,e={}){const o=this.mutateOutput?t.nodes.filter(t=>!t.isInputNode()):t.nodes.filter(t=>t.isHiddenNode());o.length>0&&n.pickRandom(o).mutateActivation(e.allowedActivations)}}exports.ModActivationMutation=u;class p extends o{mutate(t){const e=t.nodes.filter(t=>!t.isInputNode()).filter(t=>0===t.selfConnection.weight);if(e.length>0){const o=n.pickRandom(e);t.connect(o,o)}}}exports.AddSelfConnectionMutation=p;class m extends o{mutate(t){const e=Array.from(t.connections).filter(t=>t.from===t.to);if(e.length>0){const o=n.pickRandom(e);t.disconnect(o.from,o.to)}}}exports.SubSelfConnectionMutation=m;class l extends o{mutate(t,e={}){if(void 0!==e.maxGates&&t.gates.size>=e.maxGates)return;const o=Array.from(t.connections).filter(t=>null===t.gateNode);if(o.length>0){const e=n.pickRandom(t.nodes.filter(t=>!t.isInputNode())),s=n.pickRandom(o);t.addGate(e,s)}}}exports.AddGateMutation=l;class x extends o{mutate(t){t.gates.size>0&&t.removeGate(n.pickRandom(Array.from(t.gates)))}}exports.SubGateMutation=x;class f extends o{mutate(t){const e=[];for(let n=t.inputSize;n<t.nodes.length;n++){const o=t.nodes[n];for(let s=t.inputSize;s<n;s++){const n=t.nodes[s];o.isProjectingTo(n)||e.push([o,n])}}if(e.length>0){const o=n.pickRandom(e);t.connect(o[0],o[1])}}}exports.AddBackConnectionMutation=f;class M extends o{mutate(t){const e=Array.from(t.connections).filter(t=>t.from.outgoing.size>1).filter(t=>t.to.incoming.size>1).filter(e=>t.nodes.indexOf(e.from)>t.nodes.indexOf(e.to));if(e.length>0){const o=n.pickRandom(e);t.disconnect(o.from,o.to)}}}exports.SubBackConnectionMutation=M;class h extends o{constructor(t=!1){super(),this.mutateOutput=t}mutate(t){const e=this.mutateOutput?t.nodes.filter(t=>void 0!==t&&!t.isInputNode()):t.nodes.filter(t=>void 0!==t&&t.isHiddenNode());if(e.length>=2){const t=n.pickRandom(e),o=n.pickRandom(e.filter(e=>e!==t)),s=t.bias,i=t.squash;t.bias=o.bias,t.squash=o.squash,o.bias=s,o.squash=i}}}exports.SwapNodesMutation=h;const w=[new s,new i,new a,new c,new d,new r,new u,new l,new x,new p,new m,new f,new M,new h];exports.ALL_MUTATIONS=w;const N=[new s,new i,new a,new c,new d,new r,new u,new h];exports.FEEDFORWARD_MUTATIONS=N;const g=[new d,new r,new u];exports.NO_STRUCTURE_MUTATIONS=g;const A=[new s,new i,new a,new c,new l,new x,new p,new m,new f,new M,new h];exports.ONLY_STRUCTURE=A;
},{"../architecture/Node":"../src/architecture/Node.js","../enums/NodeType":"../src/enums/NodeType.js","../utils/Utils":"../src/utils/Utils.js"}],"../src/architecture/Connection.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Connection=void 0;const t=require("../utils/Utils");class e{constructor(t,e,i,s){this.from=t,this.to=e,this.weight=null!=i?i:0,this.gain=1,this.eligibility=0,this.deltaWeightsPrevious=0,this.deltaWeightsTotal=0,this.xTrace=new Map,s?(this.gateNode=s,s.addGate(this)):this.gateNode=null}toJSON(){return{fromIndex:this.from.index,toIndex:this.to.index,gateNodeIndex:null===this.gateNode?null:this.gateNode.index,weight:this.weight}}getInnovationID(){return t.pairing(this.from.index,this.to.index)}}exports.Connection=e;
},{"../utils/Utils":"../src/utils/Utils.js"}],"../src/architecture/Node.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Node=void 0;const t=require("activations/build/src"),i=require("../enums/NodeType"),e=require("../methods/Mutation"),s=require("../utils/Utils"),o=require("./Connection");class a{constructor(e=i.NodeType.HIDDEN){this.type=e,this.bias=s.randDouble(-1,1),this.squash=t.Logistic,this.activation=0,this.derivativeState=1,this.state=0,this.old=0,this.mask=1,this.deltaBiasPrevious=0,this.deltaBiasTotal=0,this.incoming=new Set,this.outgoing=new Set,this.gated=new Set,this.selfConnection=new o.Connection(this,this,0),this.errorResponsibility=0,this.errorProjected=0,this.errorGated=0,this.index=NaN}fromJSON(i){var e,o,a,n;return this.bias=null!==(e=i.bias)&&void 0!==e?e:s.randDouble(-1,1),this.type=i.type,this.squash=null!==(o=i.squash)&&void 0!==o?o:t.Logistic,this.mask=null!==(a=i.mask)&&void 0!==a?a:1,this.index=null!==(n=i.index)&&void 0!==n?n:NaN,this}clear(){this.incoming.forEach(t=>{t.eligibility=0,t.xTrace.clear()}),this.gated.forEach(t=>t.gain=0),this.errorResponsibility=this.errorProjected=this.errorGated=0,this.old=this.state=this.activation=0}mutateBias(t=new e.ModBiasMutation){this.bias+=s.randDouble(t.min,t.max)}mutateActivation(i=Object.values(t.ALL_ACTIVATIONS)){const e=i.filter(t=>t!==this.squash);e.length>0&&(this.squash=s.pickRandom(e))}isProjectedBy(t){return t===this?0!==this.selfConnection.weight:Array.from(this.incoming).map(t=>t.from).includes(t)}isProjectingTo(t){return t===this?0!==this.selfConnection.weight:Array.from(this.outgoing).map(t=>t.to).includes(t)}addGate(t){this.gated.add(t),t.gateNode=this}removeGate(t){this.gated.delete(t),t.gateNode=null,t.gain=1}connect(t,i=1,e=!1){if(t===this)return this.selfConnection.weight=i,this.selfConnection;if(this.isProjectingTo(t))throw new ReferenceError("Their is already a connection!");{const s=new o.Connection(this,t,i);return this.outgoing.add(s),t.incoming.add(s),e&&t.connect(this),s}}disconnect(t,i=!1){if(t===this)return this.selfConnection.weight=0,this.selfConnection;const e=Array.from(this.outgoing).filter(i=>i.to===t);if(0===e.length)throw new Error("No Connection found");const s=e[0];return this.outgoing.delete(s),s.to.incoming.delete(s),void 0!==s.gateNode&&null!=s.gateNode&&s.gateNode.removeGate(s),i&&t.disconnect(this),s}propagate(t,i={}){var e,s,o;i.momentum=null!==(e=i.momentum)&&void 0!==e?e:0,i.rate=null!==(s=i.rate)&&void 0!==s?s:.3,i.update=null===(o=i.update)||void 0===o||o,void 0!==t&&Number.isFinite(t)?this.errorResponsibility=this.errorProjected=t-this.activation:(this.errorProjected=0,this.outgoing.forEach(t=>{this.errorProjected+=t.to.errorResponsibility*t.weight*t.gain}),this.errorProjected*=this.derivativeState,this.errorGated=0,this.gated.forEach(t=>{let i;i=t.to.selfConnection.gateNode===this?t.to.old+t.weight*t.from.activation:t.weight*t.from.activation,this.errorGated+=t.to.errorResponsibility*i}),this.errorGated*=this.derivativeState,this.errorResponsibility=this.errorProjected+this.errorGated),this.incoming.forEach(t=>{var e,s;let o=this.errorProjected*t.eligibility;t.xTrace.forEach((t,i)=>o+=i.errorResponsibility*t),t.deltaWeightsTotal+=(null!==(e=i.rate)&&void 0!==e?e:.3)*o*this.mask,i.update&&(t.deltaWeightsTotal+=(null!==(s=i.momentum)&&void 0!==s?s:0)*t.deltaWeightsPrevious,t.weight+=t.deltaWeightsTotal,t.deltaWeightsPrevious=t.deltaWeightsTotal,t.deltaWeightsTotal=0)}),this.deltaBiasTotal+=i.rate*this.errorResponsibility,i.update&&(this.deltaBiasTotal+=i.momentum*this.deltaBiasPrevious,this.bias+=this.deltaBiasTotal,this.deltaBiasPrevious=this.deltaBiasTotal,this.deltaBiasTotal=0)}activate(t,i=!0){if(void 0!==t)return this.activation=t;if(this.isInputNode())throw new ReferenceError("There is no input given to an input node!");if(i){this.old=this.state,this.state=this.selfConnection.gain*this.selfConnection.weight*this.state+this.bias,this.incoming.forEach(t=>{this.state+=t.from.activation*t.weight*t.gain}),this.activation=this.squash(this.state,!1)*this.mask,this.derivativeState=this.squash(this.state,!0);const t=[],i=[];return this.gated.forEach(e=>{e.gain=this.activation;const s=t.indexOf(e.to);s>-1?i[s]+=e.weight*e.from.activation:(t.push(e.to),e.to.selfConnection.gateNode===this?i.push(e.weight*e.from.activation+e.to.old):i.push(e.weight*e.from.activation))}),this.incoming.forEach(e=>{var s;e.eligibility=this.selfConnection.gain*this.selfConnection.weight*e.eligibility+e.from.activation*e.gain;for(let o=0;o<t.length;o++){const a=t[o],n=i[o];e.xTrace.has(a)?e.xTrace.set(a,a.selfConnection.gain*a.selfConnection.weight*(null!==(s=e.xTrace.get(a))&&void 0!==s?s:0)+this.derivativeState*e.eligibility*n):e.xTrace.set(a,this.derivativeState*e.eligibility*n)}}),this.activation}return this.isInputNode()?this.activation=0:(this.state=this.selfConnection.gain*this.selfConnection.weight*this.state+this.bias,this.incoming.forEach(t=>this.state+=t.from.activation*t.weight*t.gain),this.activation=this.squash(this.state,!1),this.gated.forEach(t=>t.gain=this.activation),this.activation)}toJSON(){return{bias:this.bias,type:this.type,squash:this.squash,mask:this.mask,index:this.index}}isInputNode(){return this.type===i.NodeType.INPUT}isHiddenNode(){return this.type===i.NodeType.HIDDEN}isOutputNode(){return this.type===i.NodeType.OUTPUT}setBias(t){return this.bias=t,this}setActivationType(t){return this.squash=t,this}}exports.Node=a;
},{"../enums/NodeType":"../src/enums/NodeType.js","../methods/Mutation":"../src/methods/Mutation.js","../utils/Utils":"../src/utils/Utils.js","./Connection":"../src/architecture/Connection.js"}],"../src/enums/GatingType.js":[function(require,module,exports) {
"use strict";var e;Object.defineProperty(exports,"__esModule",{value:!0}),exports.GatingType=void 0,function(e){e[e.INPUT=0]="INPUT",e[e.SELF=1]="SELF",e[e.OUTPUT=2]="OUTPUT"}(e=exports.GatingType||(exports.GatingType={}));
},{}],"../src/architecture/Layers/Layer.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Layer=void 0;const e=require("../../enums/ConnectionType"),n=require("../../enums/GatingType");class t{constructor(e){this.outputSize=e,this.nodes=[],this.inputNodes=new Set,this.outputNodes=new Set,this.connections=[],this.gates=[]}static connect(n,o,r=e.ConnectionType.ALL_TO_ALL,s=1){if(r===e.ConnectionType.NO_CONNECTION)throw new ReferenceError("Cannot connect with 'NO_CONNECTION' connection type");const c=Array.from(n instanceof t?n.outputNodes:n),i=Array.from(o instanceof t?o.inputNodes:o);if(0===i.length)throw new ReferenceError("Target from has no input nodes!");if(0===c.length)throw new ReferenceError("This from has no output nodes!");const a=[];if(r===e.ConnectionType.ALL_TO_ALL)c.forEach(e=>{i.forEach(n=>{a.push(e.connect(n,s))})});else if(r===e.ConnectionType.ONE_TO_ONE){if(c.length!==i.length)throw new RangeError("Can't connect one to one! Number of output nodes from are unequal number of incoming nodes from next layer!");for(let e=0;e<c.length;e++)a.push(c[e].connect(i[e],s))}else if(r===e.ConnectionType.POOLING){const e=i.length/c.length;a.push(...c.map((n,t)=>n.connect(i[Math.floor(t*e)],s)))}return a}static gate(e,t,o){const r=[];switch(o){case n.GatingType.INPUT:{const n=Array.from(new Set(t.map(e=>e.to)));for(let o=0;o<n.length;o++){const s=n[o],c=e[o%e.length];s.incoming.forEach(e=>{t.includes(e)&&(c.addGate(e),r.push(e))})}break}case n.GatingType.SELF:{const n=Array.from(new Set(t.map(e=>e.from)));for(let o=0;o<n.length;o++)t.includes(n[o].selfConnection)&&(e[o%e.length].addGate(n[o].selfConnection),r.push(n[o].selfConnection));break}case n.GatingType.OUTPUT:{const n=Array.from(new Set(t.map(e=>e.from)));for(let o=0;o<n.length;o++){const s=n[o],c=e[o%e.length];s.outgoing.forEach(e=>{t.includes(e)&&(c.addGate(e),r.push(e))})}break}}return r}}exports.Layer=t;
},{"../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../enums/GatingType":"../src/enums/GatingType.js"}],"../src/architecture/Nodes/ConstantNode.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ConstantNode=void 0;const e=require("activations/build/src"),o=require("../../enums/NodeType"),t=require("../Node");class n extends t.Node{constructor(){super(o.NodeType.HIDDEN),this.bias=1}fromJSON(o){var t,n;return this.index=null!==(t=o.index)&&void 0!==t?t:-1,this.squash=null!==(n=o.squash)&&void 0!==n?n:e.Identitiy,this}toJSON(){return{index:this.index,squash:this.squash}}mutateBias(){throw new ReferenceError("Cannot mutate a pool node!")}mutateActivation(){throw new ReferenceError("Cannot mutate a pool node!")}addGate(){throw new ReferenceError("A pool node can't gate a connection!")}removeGate(){throw new ReferenceError("A pool node can't gate a connection!")}setBias(){throw new ReferenceError("Cannot set the bias of a pool node!")}}exports.ConstantNode=n;
},{"../../enums/NodeType":"../src/enums/NodeType.js","../Node":"../src/architecture/Node.js"}],"../src/architecture/Nodes/NoiseNode.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.NoiseNode=void 0;const t=require("../../enums/NodeType"),e=require("../../utils/Utils"),i=require("./ConstantNode");class s extends i.ConstantNode{constructor(e={}){var i;super(),this.noiseType=null!==(i=e.noiseType)&&void 0!==i?i:t.NoiseNodeType.GAUSSIAN_NOISE,this.options=e}activate(){var i,s,o,a;this.old=this.state;const r=Array.from(this.incoming).map(t=>t.from.activation*t.weight*t.gain);switch(this.noiseType){case t.NoiseNodeType.GAUSSIAN_NOISE:this.state=e.avg(r)+e.generateGaussian(null!==(s=null===(i=this.options.gaussian)||void 0===i?void 0:i.mean)&&void 0!==s?s:0,null!==(a=null===(o=this.options.gaussian)||void 0===o?void 0:o.deviation)&&void 0!==a?a:2);break;default:throw new ReferenceError("Cannot activate this noise type!")}return this.activation=this.squash(this.state,!1)*this.mask,this.derivativeState=this.squash(this.state,!0),this.activation}propagate(t,i={}){var s,o,a;i.momentum=null!==(s=i.momentum)&&void 0!==s?s:0,i.rate=null!==(o=i.rate)&&void 0!==o?o:.3,i.update=null===(a=i.update)||void 0===a||a;const r=Array.from(this.outgoing).map(t=>t.to.errorResponsibility*t.weight*t.gain);this.errorResponsibility=this.errorProjected=e.sum(r)*this.derivativeState,this.incoming.forEach(t=>{var e,s;let o=this.errorProjected*t.eligibility;t.xTrace.forEach((t,e)=>{o+=e.errorResponsibility*t}),t.deltaWeightsTotal+=(null!==(e=i.rate)&&void 0!==e?e:.3)*o*this.mask,i.update&&(t.deltaWeightsTotal+=(null!==(s=i.momentum)&&void 0!==s?s:0)*t.deltaWeightsPrevious,t.weight+=t.deltaWeightsTotal,t.deltaWeightsPrevious=t.deltaWeightsTotal,t.deltaWeightsTotal=0)})}}exports.NoiseNode=s;
},{"../../enums/NodeType":"../src/enums/NodeType.js","../../utils/Utils":"../src/utils/Utils.js","./ConstantNode":"../src/architecture/Nodes/ConstantNode.js"}],"../src/architecture/Layers/NoiseLayers/NoiseLayer.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.NoiseLayer=void 0;const e=require("activations/build/src"),o=require("../../../enums/ConnectionType"),t=require("../../../enums/NodeType"),i=require("../../Nodes/NoiseNode"),s=require("../Layer");class n extends s.Layer{constructor(o,s={}){var n;super(o);const r=null!==(n=s.activation)&&void 0!==n?n:e.Identitiy;for(let e=0;e<o;e++)this.inputNodes.add(new i.NoiseNode({noiseType:t.NoiseNodeType.GAUSSIAN_NOISE,gaussian:s}).setActivationType(r));this.outputNodes=this.inputNodes,this.nodes.push(...Array.from(this.inputNodes))}getDefaultIncomingConnectionType(){return o.ConnectionType.ONE_TO_ONE}connectionTypeisAllowed(e){return e===o.ConnectionType.ONE_TO_ONE}}exports.NoiseLayer=n;
},{"../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../Nodes/NoiseNode":"../src/architecture/Nodes/NoiseNode.js","../Layer":"../src/architecture/Layers/Layer.js"}],"../src/architecture/Layers/CoreLayers/InputLayer.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.InputLayer=void 0;const e=require("../../../enums/ConnectionType"),o=require("../../../enums/NodeType"),n=require("../../Node"),t=require("../Layer"),s=require("../NoiseLayers/NoiseLayer");class r extends t.Layer{constructor(e,r={}){super(e);for(let t=0;t<e;t++){const e=new n.Node(o.NodeType.INPUT);this.nodes.push(e)}if(r.noise){const e=new s.NoiseLayer(r.noise);e.outputNodes.forEach(e=>this.outputNodes.add(e)),this.connections.push(...t.Layer.connect(this.nodes,e,e.getDefaultIncomingConnectionType()))}else this.nodes.forEach(e=>this.outputNodes.add(e))}getDefaultIncomingConnectionType(){return e.ConnectionType.NO_CONNECTION}connectionTypeisAllowed(o){return o===e.ConnectionType.NO_CONNECTION}}exports.InputLayer=r;
},{"../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../Node":"../src/architecture/Node.js","../Layer":"../src/architecture/Layers/Layer.js","../NoiseLayers/NoiseLayer":"../src/architecture/Layers/NoiseLayers/NoiseLayer.js"}],"../src/architecture/Layers/CoreLayers/OutputLayer.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.OutputLayer=void 0;const e=require("activations/build/src"),t=require("../../../enums/ConnectionType"),n=require("../../../enums/NodeType"),o=require("../../Node"),r=require("../Layer");class i extends r.Layer{constructor(t,r={}){var i;super(t);const u=null!==(i=r.activation)&&void 0!==i?i:e.Identitiy;for(let e=0;e<t;e++)this.inputNodes.add(new o.Node(n.NodeType.OUTPUT).setActivationType(u));this.nodes.push(...Array.from(this.inputNodes))}connect(){throw new ReferenceError("Could not connect an OutputLayer!")}connectionTypeisAllowed(e){return!0}getDefaultIncomingConnectionType(){return t.ConnectionType.ALL_TO_ALL}}exports.OutputLayer=i;
},{"../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../Node":"../src/architecture/Node.js","../Layer":"../src/architecture/Layers/Layer.js"}],"../src/methods/Loss.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ALL_LOSSES=exports.HINGELoss=exports.MSLELoss=exports.WAPELoss=exports.MAPELoss=exports.MAELoss=exports.BinaryLoss=exports.MBELoss=exports.MSELoss=void 0;const s=require("../utils/Utils");exports.MSELoss=function(s,o){let t=0;return o.forEach((o,e)=>{t+=Math.pow(s[e]-o,2)}),t/o.length},exports.MBELoss=function(s,o){let t=0;return o.forEach((o,e)=>{t+=s[e]-o}),t/o.length},exports.BinaryLoss=function(s,o){let t=0;return o.forEach((o,e)=>{t+=Math.round(2*s[e])!==Math.round(2*o)?1:0}),t/o.length},exports.MAELoss=function(s,o){let t=0;return o.forEach((o,e)=>{t+=Math.abs(s[e]-o)}),t/o.length},exports.MAPELoss=function(s,o){let t=0;return o.forEach((o,e)=>{t+=Math.abs((o-s[e])/Math.max(s[e],1e-15))}),t/o.length},exports.WAPELoss=function(o,t){let e=0;return t.forEach((s,t)=>{e+=Math.abs(o[t]-s)}),e/s.sum(o)},exports.MSLELoss=function(s,o){let t=0;return o.forEach((o,e)=>{t+=Math.log(Math.max(s[e],1e-15))-Math.log(Math.max(o,1e-15))}),t/o.length},exports.HINGELoss=function(s,o){let t=0;return o.forEach((o,e)=>{t+=Math.max(0,1-o*s[e])}),t/o.length},exports.ALL_LOSSES={MSELoss:exports.MSELoss,MBELoss:exports.MBELoss,BinaryLoss:exports.BinaryLoss,MAELoss:exports.MAELoss,MAPELoss:exports.MAPELoss,WAPELoss:exports.WAPELoss,MSLELoss:exports.MSLELoss,HINGELoss:exports.HINGELoss};
},{"../utils/Utils":"../src/utils/Utils.js"}],"../src/methods/Selection.js":[function(require,module,exports) {
"use strict";var e=this&&this.__createBinding||(Object.create?function(e,t,o,r){void 0===r&&(r=o),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[o]}})}:function(e,t,o,r){void 0===r&&(r=o),e[r]=t[o]}),t=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(o){if(o&&o.__esModule)return o;var r={};if(null!=o)for(var s in o)"default"!==s&&Object.hasOwnProperty.call(o,s)&&e(r,o,s);return t(r,o),r};Object.defineProperty(exports,"__esModule",{value:!0}),exports.TournamentSelection=exports.PowerSelection=exports.FitnessProportionateSelection=exports.Selection=void 0;const r=o(require("timsort")),s=require("../utils/Utils");class i{}exports.Selection=i;class n extends i{select(e){var t,o,r;let i=0,n=0;for(const s of e)n=Math.min(null!==(t=s.score)&&void 0!==t?t:n,n),i+=null!==(o=s.score)&&void 0!==o?o:0;i+=(n=Math.abs(n))*e.length;const l=s.randDouble(0,i);let c=0;for(const s of e)if(l<(c+=(null!==(r=s.score)&&void 0!==r?r:0)+n))return s;return s.pickRandom(e)}}exports.FitnessProportionateSelection=n;class l extends i{constructor(e=4){super(),this.power=e}select(e){return e[Math.floor(Math.pow(Math.random(),this.power)*e.length)]}}exports.PowerSelection=l;class c extends i{constructor(e=5,t=.5){super(),this.size=e,this.probability=t}select(e){if(this.size>e.length)throw new Error("Your tournament size should be lower than the population size, please change methods.selection.TOURNAMENT.size");const t=[];for(let o=0;o<this.size;o++)t.push(s.pickRandom(e));r.sort(t,(e,t)=>void 0===t.score||void 0===e.score?0:t.score-e.score);for(let o=0;o<this.size;o++)if(Math.random()<this.probability||o===this.size-1)return t[o];return s.pickRandom(e)}}exports.TournamentSelection=c;
},{"../utils/Utils":"../src/utils/Utils.js"}],"../src/interfaces/EvolveOptions.js":[function(require,module,exports) {
"use strict";var t=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.EvolveOptions=void 0;const e=require("activations/build/src"),s=t(require("os")),i=require("../architecture/Network"),r=require("../methods/Loss"),n=require("../methods/Mutation"),o=require("../methods/Selection");class a{constructor(){this._speciesDistanceThreshold=4,this._c1=1,this._c2=1,this._c3=1,this._survivors=.8,this._input=1,this._output=1,this._generation=0,this._elitism=1,this._equal=!0,this._clear=!1,this._populationSize=50,this._mutationRate=.6,this._mutationAmount=5,this._selection=new o.FitnessProportionateSelection,this._loss=r.MSELoss,this._mutations=n.FEEDFORWARD_MUTATIONS,this._activations=Object.values(e.ALL_ACTIVATIONS),this._template=new i.Network(this._input,this._output),this._maxNodes=1/0,this._maxConnections=1/0,this._maxGates=1/0,this._threads=s.default.cpus().length,this._log=-1,this._iterations=1e3,this._error=.05}get speciesDistanceThreshold(){return this._speciesDistanceThreshold}set speciesDistanceThreshold(t){this._speciesDistanceThreshold=t}get c1(){return this._c1}set c1(t){this._c1=t}get c2(){return this._c2}set c2(t){this._c2=t}get c3(){return this._c3}set c3(t){this._c3=t}get survivors(){return this._survivors}set survivors(t){this._survivors=t}get threads(){return this._threads}set threads(t){this._threads=t}get input(){return this._input}set input(t){this._input=t}get output(){return this._output}set output(t){this._output=t}get dataset(){return this._dataset}set dataset(t){this._dataset=t}get generation(){return this._generation}set generation(t){this._generation=t}get training(){return this._training}set training(t){this._training=t}get template(){return this._template}set template(t){this._template=t}get mutations(){return this._mutations}set mutations(t){this._mutations=t}get activations(){return this._activations}set activations(t){this._activations=t}get selection(){return this._selection}set selection(t){this._selection=t}get mutationRate(){return this._mutationRate}set mutationRate(t){this._mutationRate=t}get mutationAmount(){return this._mutationAmount}set mutationAmount(t){this._mutationAmount=t}get elitism(){return this._elitism}set elitism(t){this._elitism=t}get populationSize(){return this._populationSize}set populationSize(t){this._populationSize=t}get fitnessFunction(){return this._fitnessFunction}set fitnessFunction(t){this._fitnessFunction=t}get loss(){return this._loss}set loss(t){this._loss=t}get maxNodes(){return this._maxNodes}set maxNodes(t){this._maxNodes=t}get maxConnections(){return this._maxConnections}set maxConnections(t){this._maxConnections=t}get maxGates(){return this._maxGates}set maxGates(t){this._maxGates=t}get equal(){return this._equal}set equal(t){this._equal=t}get log(){return this._log}set log(t){this._log=t}get schedule(){return this._schedule}set schedule(t){this._schedule=t}get clear(){return this._clear}set clear(t){this._clear=t}get iterations(){return this._iterations}set iterations(t){this._iterations=t}get error(){return this._error}set error(t){this._error=t}}exports.EvolveOptions=a;
},{"../architecture/Network":"../src/architecture/Network.js","../methods/Loss":"../src/methods/Loss.js","../methods/Mutation":"../src/methods/Mutation.js","../methods/Selection":"../src/methods/Selection.js"}],"../src/architecture/Species.js":[function(require,module,exports) {
"use strict";var e=this&&this.__createBinding||(Object.create?function(e,t,r,s){void 0===s&&(s=r),Object.defineProperty(e,s,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,s){void 0===s&&(s=r),e[s]=t[r]}),t=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(r){if(r&&r.__esModule)return r;var s={};if(null!=r)for(var i in r)"default"!==i&&Object.hasOwnProperty.call(r,i)&&e(s,r,i);return t(s,r),s};Object.defineProperty(exports,"__esModule",{value:!0}),exports.Species=void 0;const s=r(require("timsort")),i=require("../utils/Utils"),o=require("./Network");class n{constructor(e){this.representative=e,this.representative.species=this,this.members=new Set,this.members.add(e),this.score=0}put(e,t,r,s,i){return e.distance(this.representative,t,r,s)<i&&(this.forcePut(e),!0)}forcePut(e){void 0!==e&&(this.members.add(e),e.species=this)}evaluateScore(){let e=0;this.members.forEach(t=>{var r;return e+=null!==(r=t.score)&&void 0!==r?r:0}),this.score=e/this.members.size}reset(){this.representative=i.pickRandom(this.members),this.members.forEach(e=>e.species=null),this.members.clear(),this.members.add(this.representative),this.representative.species=this,this.score=0}kill(e){const t=Array.from(this.members);s.sort(t,(e,t)=>void 0===e.score||void 0===t.score?0:e.score-t.score);const r=Math.floor(e*this.members.size);for(let s=0;s<r;s++)this.members.delete(t[s]),t[s].species=null}breed(){return o.Network.crossOver(i.pickRandom(this.members),i.pickRandom(this.members))}size(){return this.members.size}getBest(){const e=Array.from(this.members);return e[i.maxValueIndex(e.map(e=>{var t;return null!==(t=e.score)&&void 0!==t?t:-1/0}))]}}exports.Species=n;
},{"../utils/Utils":"../src/utils/Utils.js","./Network":"../src/architecture/Network.js"}],"../src/NEAT.js":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
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
  if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NEAT = void 0;

const TimSort = __importStar(require("timsort"));

const Species_1 = require("./architecture/Species");

const Mutation_1 = require("./methods/Mutation");

const Utils_1 = require("./utils/Utils");
/**
 * Runs the NEAT algorithm on group of neural networks.
 *
 * @constructs Neat
 */


class NEAT {
  /**
   * Constructs a NEAT object.
   *
   * @param options
   */
  constructor(options) {
    if (!options.fitnessFunction) {
      throw new ReferenceError("No fitness function given!");
    }

    this._options = options;
    this.population = [];
    this.species = new Set();

    for (let i = 0; i < this.options.populationSize; i++) {
      this.population.push(this.options.template.copy());
    }
  }
  /**
   * Getter
   */


  get options() {
    return this._options;
  }
  /**
   * Setter
   */


  set options(value) {
    this._options = value;
  }
  /**
   * Mutate a network with a random mutation from the allowed array.
   *
   * @param network The network which will be mutated.
   */


  mutateRandom(network) {
    const allowed = this.options.mutations.filter(method => {
      return method.constructor.name !== Mutation_1.AddNodeMutation.constructor.name || network.nodes.length < this.options.maxNodes || method.constructor.name !== Mutation_1.AddConnectionMutation.constructor.name || network.connections.size < this.options.maxConnections || method.constructor.name !== Mutation_1.AddGateMutation.constructor.name || network.gates.size < this.options.maxGates;
    });
    network.mutate(Utils_1.pickRandom(allowed), {
      allowedActivations: this.options.activations
    });
  }
  /**
   * Evaluates, selects, breeds and mutates population
   *
   * @returns {Network} Fittest network
   */


  evolve() {
    return __awaiter(this, void 0, void 0, function* () {
      this.genSpecies();

      if (this.population[this.population.length - 1].score === undefined) {
        yield this.evaluate();
        this.sort();
      }

      this.species.forEach(species => species.evaluateScore());
      this.kill(1 - this.options.survivors);
      this.removeExtinctSpecies();
      this.reproduce();
      const elitists = this.population.splice(0, this.options.elitism);
      this.mutate();
      this.population.splice(0, 0, ...elitists);
      /*if (this.options.training) {
          for (const genome of this.population) {
              genome.train(this.options.training);
          }
      }*/
      // evaluate the population

      yield this.evaluate(); // Sort in order of fitness (fittest first)

      this.sort();
      const fittest = this.population[0].copy();
      fittest.score = this.population[0].score; // Reset the scores

      this.population.forEach(genome => genome.score = undefined);
      this.options.generation++;
      return fittest;
    });
  }
  /**
   * Mutates the given (or current) population
   *
   * @param {Mutation} [method] A mutation method to mutate the population with. When not specified will pick a random mutation from the set allowed mutations.
   */


  mutate(method) {
    // Elitist genomes should not be included
    this.population.filter(() => Math.random() <= this.options.mutationRate).forEach(genome => {
      for (let i = 0; i < this.options.mutationAmount; i++) {
        if (method) {
          genome.mutate(method);
        } else {
          this.mutateRandom(genome);
        }
      }
    });
  }
  /**
   * Evaluates the current population, basically sets their `.score` property
   *
   * @return {Network} Fittest Network
   */


  evaluate() {
    var _a, _b;

    return __awaiter(this, void 0, void 0, function* () {
      if (this.options.clear) {
        this.population.forEach(genome => genome.clear());
      }

      yield (_b = (_a = this.options).fitnessFunction) === null || _b === void 0 ? void 0 : _b.call(_a, this.population, this.options.dataset); // Sort the population in order of fitness

      this.sort();
      return this.population[0];
    });
  }
  /**
   * Sorts the population by score (descending)
   * @todo implement a quicksort algorithm in utils
   */


  sort() {
    TimSort.sort(this.population, (a, b) => {
      return a.score === undefined || b.score === undefined ? 0 : b.score - a.score;
    });
  }
  /**
   * Returns the fittest genome of the current population
   *
   * @returns {Network} Current population's fittest genome
   */


  getFittest() {
    return __awaiter(this, void 0, void 0, function* () {
      if (this.population[this.population.length - 1].score === undefined) {
        yield this.evaluate();
      }

      this.sort();
      return this.population[0];
    });
  }
  /**
   * Returns the average fitness of the current population
   *
   * @returns {number} Average fitness of the current population
   */


  getAverage() {
    return __awaiter(this, void 0, void 0, function* () {
      if (this.population[this.population.length - 1].score === undefined) {
        yield this.evaluate();
      }

      let score = 0;
      this.population.map(genome => genome.score).forEach(val => score += val !== null && val !== void 0 ? val : 0);
      return score / this.population.length;
    });
  }
  /**
   * Replace the whole population with the new genomes
   * @param genomes the genomes which replace the population
   */


  replacePopulation(genomes) {
    this.population = genomes;
    this.options.populationSize = genomes.length;
  }
  /**
   * Reproduce the population, by replacing the killed networks
   * @private
   */


  reproduce() {
    const speciesArr = Array.from(this.species);

    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].species === null) {
        const selectedSpecies = this.options.selection.select(speciesArr);
        this.population[i] = selectedSpecies.breed();
        selectedSpecies.forcePut(this.population[i]);
      }
    }
  }
  /**
   * Remove empty species
   * @private
   */


  removeExtinctSpecies() {
    for (const species of Array.from(this.species)) {
      if (species.size() <= 1) {
        species.members.forEach(member => member.species = null);
        this.species.delete(species);
      }
    }
  }
  /**
   * Kill bad networks
   * @param killRate
   * @private
   */


  kill(killRate) {
    this.species.forEach(species => species.kill(killRate));
  }
  /**
   * Generate species
   * @private
   */


  genSpecies() {
    this.species.forEach(species => species.reset());
    this.population.filter(genome => genome.species === null).forEach(genome => {
      let found = false;

      for (const species of Array.from(this.species)) {
        if (species.put(genome, this.options.c1, this.options.c2, this.options.c3, this.options.speciesDistanceThreshold)) {
          found = true;
          break;
        }
      }

      if (!found) {
        this.species.add(new Species_1.Species(genome));
      }
    });
  }

}

exports.NEAT = NEAT;
},{"./architecture/Species":"../src/architecture/Species.js","./methods/Mutation":"../src/methods/Mutation.js","./utils/Utils":"../src/utils/Utils.js"}],"../src/architecture/Network.js":[function(require,module,exports) {
"use strict";var e=this&&this.__createBinding||(Object.create?function(e,t,o,n){void 0===n&&(n=o),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[o]}})}:function(e,t,o,n){void 0===n&&(n=o),e[n]=t[o]}),t=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(o){if(o&&o.__esModule)return o;var n={};if(null!=o)for(var i in o)"default"!==i&&Object.hasOwnProperty.call(o,i)&&e(n,o,i);return t(n,o),n},n=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))(function(i,s){function r(e){try{d(n.next(e))}catch(t){s(t)}}function a(e){try{d(n.throw(e))}catch(t){s(t)}}function d(e){var t;e.done?i(e.value):(t=e.value,t instanceof o?t:new o(function(e){e(t)})).then(r,a)}d((n=n.apply(e,t||[])).next())})};Object.defineProperty(exports,"__esModule",{value:!0}),exports.Network=void 0;const i=require("threads"),s=require("threads/dist");require("threads/register");const r=o(require("timsort")),a=require("../enums/NodeType"),d=require("../interfaces/EvolveOptions"),c=require("../methods/Loss"),u=require("../methods/Mutation"),h=require("../NEAT"),l=require("../utils/Utils"),p=require("./Node");class f{constructor(e,t){this.inputSize=e,this.outputSize=t,this.nodes=[],this.connections=new Set,this.gates=new Set,this.score=void 0,this.species=null;for(let o=0;o<e;o++)this.nodes.push(new p.Node(a.NodeType.INPUT));for(let o=0;o<t;o++)this.nodes.push(new p.Node(a.NodeType.OUTPUT));for(let o=0;o<this.inputSize;o++)for(let e=this.inputSize;e<this.outputSize+this.inputSize;e++){const t=(Math.random()-.5)*this.inputSize*Math.sqrt(2/this.inputSize);this.connect(this.nodes[o],this.nodes[e],t)}}static fromJSON(e){const t=new f(e.inputSize,e.outputSize);return t.nodes=[],t.connections.clear(),e.nodes.map(e=>(new p.Node).fromJSON(e)).forEach(e=>t.nodes[e.index]=e),e.connections.forEach(e=>{const o=t.connect(t.nodes[e.fromIndex],t.nodes[e.toIndex],e.weight);null!=e.gateNodeIndex&&t.addGate(t.nodes[e.gateNodeIndex],o)}),t}static crossOver(e,t){var o,n;if(e.inputSize!==t.inputSize||e.outputSize!==t.outputSize)throw new Error("Networks don`t have the same input/output size!");const i=new f(e.inputSize,e.outputSize);i.connections.clear(),i.nodes=[];const s=null!==(o=e.score)&&void 0!==o?o:0,r=null!==(n=t.score)&&void 0!==n?n:0;let d;if(s===r){const o=Math.max(e.nodes.length,t.nodes.length),n=Math.min(e.nodes.length,t.nodes.length);d=l.randInt(n,o+1)}else d=s>r?e.nodes.length:t.nodes.length;const c=e.inputSize,u=e.outputSize;for(let a=0;a<e.nodes.length;a++)e.nodes[a].index=a;for(let a=0;a<t.nodes.length;a++)t.nodes[a].index=a;for(let f=0;f<d;f++){let o,n=null;if(f<c){n=a.NodeType.INPUT;const i=l.randBoolean()?e:t;let s=-1,r=-1;for(;s<f;){if(r++>=i.nodes.length)throw RangeError("something is wrong with the size of the input");i.nodes[r].isInputNode()&&s++}o=i.nodes[r]}else if(f<c+u){n=a.NodeType.OUTPUT;const i=l.randBoolean()?e:t;let s=-1,r=-1;for(;s<f-c;){if(++r>=i.nodes.length)throw RangeError("something is wrong with the size of the output");i.nodes[r].isOutputNode()&&s++}o=i.nodes[r]}else{let i;n=a.NodeType.HIDDEN,i=f>=e.nodes.length?t:f>=t.nodes.length?e:l.randBoolean()?e:t,o=l.pickRandom(i.nodes)}const s=new p.Node(n);s.bias=o.bias,s.squash=o.squash,i.nodes.push(s)}const h=[],g=[];e.connections.forEach(e=>{h[l.pairing(e.from.index,e.to.index)]=e.toJSON()}),t.connections.forEach(e=>{g[l.pairing(e.from.index,e.to.index)]=e.toJSON()});const m=[],v=Object.keys(h),w=Object.keys(g);for(let a=v.length-1;a>=0;a--)void 0!==g[parseInt(v[a])]?(m.push(l.randBoolean()?h[parseInt(v[a])]:g[parseInt(v[a])]),g[parseInt(v[a])]=void 0):s>=r&&m.push(h[parseInt(v[a])]);return r>=s&&w.map(e=>parseInt(e)).map(e=>g[e]).filter(e=>void 0!==e).forEach(e=>m.push(e)),m.forEach(e=>{if(void 0!==e&&e.toIndex<d&&e.fromIndex<d){const t=i.nodes[e.fromIndex],o=i.nodes[e.toIndex],n=i.connect(t,o,e.weight);null!==e.gateNodeIndex&&e.gateNodeIndex<d&&i.addGate(i.nodes[e.gateNodeIndex],n)}}),i}copy(){return f.fromJSON(this.toJSON())}connect(e,t,o=0){const n=e.connect(t,o);return this.connections.add(n),n}activate(e,t={}){var o,n;if(e.length!==this.inputSize)throw new RangeError("Input size of dataset is different to network input size!");return t.dropoutRate=null!==(o=t.dropoutRate)&&void 0!==o?o:0,t.trace=null===(n=t.trace)||void 0===n||n,this.nodes.filter(e=>e.isInputNode()).forEach((o,n)=>o.activate(e[n],t.trace)),this.nodes.filter(e=>e.isHiddenNode()).forEach(e=>{t.dropoutRate&&(e.mask=Math.random()>=t.dropoutRate?1:0),e.activate(void 0,t.trace)}),this.nodes.filter(e=>e.isOutputNode()).map(e=>e.activate(void 0,t.trace))}propagate(e,t={}){var o,n,i;if(t.rate=null!==(o=t.rate)&&void 0!==o?o:.3,t.momentum=null!==(n=t.momentum)&&void 0!==n?n:0,t.update=null!==(i=t.update)&&void 0!==i&&i,e.length!==this.outputSize)throw new Error("Output target length should match network output length");this.nodes.filter(e=>e.isOutputNode()).forEach((o,n)=>o.propagate(e[n],t));for(let s=this.nodes.length-1;s>=0;s--)this.nodes[s].isHiddenNode()&&this.nodes[s].propagate(void 0,t);this.nodes.filter(e=>e.isInputNode()).forEach(e=>e.propagate(void 0,t))}clear(){this.nodes.forEach(e=>e.clear())}disconnect(e,t){return this.connections.forEach(o=>{o.from===e&&o.to===t&&(null!==o.gateNode&&this.removeGate(o),this.connections.delete(o))}),e.disconnect(t)}addGate(e,t){if(-1===this.nodes.indexOf(e))throw new ReferenceError("This node is not part of the network!");null==t.gateNode&&(e.addGate(t),this.gates.add(t))}removeGate(e){if(!this.gates.has(e))throw new Error("This connection is not gated!");this.gates.delete(e),null!=e.gateNode&&e.gateNode.removeGate(e)}removeNode(e,t=(new u.SubNodeMutation).keepGates){if(!this.nodes.includes(e))throw new ReferenceError("This node does not exist in the network!");this.disconnect(e,e);const o=[],n=[],i=[],s=[];for(e.incoming.forEach(i=>{t&&null!==i.gateNode&&i.gateNode!==e&&n.push(i.gateNode),o.push(i.from),this.disconnect(i.from,e)}),e.outgoing.forEach(o=>{t&&null!==o.gateNode&&o.gateNode!==e&&n.push(o.gateNode),i.push(o.to),this.disconnect(e,o.to)}),o.forEach(e=>{i.forEach(t=>{e.isProjectingTo(t)||s.push(this.connect(e,t))})});n.length>0&&s.length>0;){const e=n.shift();if(void 0===e)continue;const t=l.pickRandom(s);this.addGate(e,t),l.removeFromArray(s,t)}e.gated.forEach(this.removeGate),l.removeFromArray(this.nodes,e)}mutate(e,t){e.mutate(this,t)}mutateRandom(e=u.ALL_MUTATIONS,t={}){0!==e.length&&this.mutate(l.pickRandom(e),t)}train(e){if(e.dataset[0].input.length!==this.inputSize||e.dataset[0].output.length!==this.outputSize)throw new Error("Dataset input/output size should be same as network input/output size!");const t=Date.now();if(e.iterations<=0&&e.error<=0)throw new Error("At least one of the following options must be specified: error, iterations");let o,n,i,s;e.crossValidateTestSize>0?(o=Math.ceil((1-e.crossValidateTestSize)*e.dataset.length),n=e.dataset.slice(0,o),i=e.dataset.slice(o)):(n=e.dataset,i=[]);let r=0,a=1;for(;a>e.error&&(e.iterations<=0||r<e.iterations);)r++,s=e.rate.calc(r),a=this.trainEpoch({dataset:n,batchSize:e.batchSize,trainingRate:s,momentum:e.momentum,loss:e.loss,dropoutRate:e.dropout}),e.clear&&this.clear(),e.crossValidateTestSize>0&&(a=this.test(i,e.loss),e.clear&&this.clear()),e.shuffle&&l.shuffle(e.dataset),e.log>0&&r%e.log==0&&console.log("iteration number",r,"error",a,"training rate",s),e.schedule&&r%e.schedule.iterations==0&&e.schedule.function(a,r);return e.clear&&this.clear(),{error:a,iterations:r,time:Date.now()-t}}test(e,t=c.MSELoss){let o=0;for(const n of e){const e=n.input;o+=t(n.output,this.activate(e,{trace:!1}))}return o/e.length}toJSON(){const e={nodes:[],connections:[],inputSize:this.inputSize,outputSize:this.outputSize};for(let t=0;t<this.nodes.length;t++)this.nodes[t].index=t;return this.nodes.forEach(t=>{e.nodes.push(t.toJSON()),0!==t.selfConnection.weight&&e.connections.push(t.selfConnection.toJSON())}),this.connections.forEach(t=>{e.connections.push(t.toJSON())}),e}evolve(e=new d.EvolveOptions){return n(this,void 0,void 0,function*(){if(!e.fitnessFunction&&e.dataset&&(e.dataset[0].input.length!==this.inputSize||e.dataset[0].output.length!==this.outputSize))throw new Error("Dataset input/output size should be same as network input/output size!");e.input=this.inputSize,e.output=this.outputSize;const t=Date.now();let o;if(!e.fitnessFunction){const t=JSON.stringify(e.dataset),r=Object.values(c.ALL_LOSSES).indexOf(e.loss);o=s.Pool(()=>i.spawn(new i.Worker("../multithreading/TestWorker")),e.threads),e.fitnessFunction=function(e){return n(this,void 0,void 0,function*(){for(const i of e)o.queue(e=>n(this,void 0,void 0,function*(){if(void 0===i)throw new ReferenceError;i.score=-(yield e(t,JSON.stringify(i.toJSON()),r))}));yield o.completed()})}}e.template=this;const r=new h.NEAT(e);let a,d=0,u=this;do{const t=yield r.evolve();if(!t.score)throw new ReferenceError;a=t.score,(1===r.options.generation||t.score>d)&&(d=t.score,u=t),e.log>0&&r.options.generation%e.log==0&&console.log("iteration",r.options.generation,"error",-a),e.schedule&&r.options.generation%e.schedule.iterations==0&&e.schedule.function(t.score,-a,r.options.generation)}while(a<-e.error&&(0===e.iterations||r.options.generation<e.iterations));return void 0!==u&&(this.nodes=u.nodes,this.connections=u.connections,this.gates=u.gates,e.clear&&this.clear()),o&&(yield o.terminate()),{error:-a,iterations:r.options.generation,time:Date.now()-t}})}distance(e,t,o,n){let i=this;for(let r=0;r<i.nodes.length;r++)i.nodes[r].index=r;for(let r=0;r<e.nodes.length;r++)e.nodes[r].index=r;let s=0,a=0;const d=Array.from(i.connections).filter(e=>void 0!==e),c=Array.from(e.connections).filter(e=>void 0!==e);if(r.sort(d,(e,t)=>e.getInnovationID()-t.getInnovationID()),r.sort(c,(e,t)=>e.getInnovationID()-t.getInnovationID()),d[d.length-1].getInnovationID()<c[c.length-1].getInnovationID()){const t=i;i=e,e=t}let u=0,h=0,l=0;for(;s<d.length&&a<c.length;){const e=d[s],t=c[a];if(void 0===e||void 0===t)throw Error("HERE");e.getInnovationID()===t.getInnovationID()?(s++,a++,h+=Math.abs(e.weight-t.weight),l++):s>a?(a++,u++):(s++,u++)}h/=l;const p=i.connections.size-s;let f=Math.max(i.connections.size,e.connections.size);return f<20&&(f=1),t*p/f+o*u/f+n*h}trainEpoch(e){let t=0;for(let o=0;o<e.dataset.length;o++){const n=e.dataset[o].input,i=e.dataset[o].output,s=(o+1)%e.batchSize==0||o+1===e.dataset.length,r=this.activate(n,{dropoutRate:e.dropoutRate});this.propagate(i,{rate:e.trainingRate,momentum:e.momentum,update:s}),t+=e.loss(i,r)}return t/e.dataset.length}}exports.Network=f;
},{"../enums/NodeType":"../src/enums/NodeType.js","../interfaces/EvolveOptions":"../src/interfaces/EvolveOptions.js","../methods/Loss":"../src/methods/Loss.js","../methods/Mutation":"../src/methods/Mutation.js","../NEAT":"../src/NEAT.js","../utils/Utils":"../src/utils/Utils.js","./Node":"../src/architecture/Node.js"}],"../src/architecture/Architect.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Architect=void 0;const e=require("./Layers/CoreLayers/InputLayer"),r=require("./Layers/CoreLayers/OutputLayer"),t=require("./Layers/Layer"),s=require("./Network");class n{constructor(){this.layers=[]}addLayer(e,r){const t=null!=r?r:e.getDefaultIncomingConnectionType();if(!e.connectionTypeisAllowed(t))throw new ReferenceError("Connection type "+t+" is not allowed at layer "+e.constructor.name);return this.layers.push({layer:e,incomingConnectionType:t}),this}buildModel(){if(!(this.layers[0].layer instanceof e.InputLayer))throw new ReferenceError("First layer has to be a InputLayer! Currently is: "+this.layers[0].layer.constructor.name);if(!(this.layers[this.layers.length-1].layer instanceof r.OutputLayer))throw new ReferenceError("Last layer has to be a OutputLayer! Currently is: "+this.layers[this.layers.length-1].layer.constructor.name);const n=this.layers[0].layer.nodes.length,a=this.layers[this.layers.length-1].layer.nodes.length,o=new s.Network(n,a);o.nodes=[],o.connections.clear();for(let e=0;e<this.layers.length-1;e++)t.Layer.connect(this.layers[e].layer,this.layers[e+1].layer,this.layers[e+1].incomingConnectionType).forEach(e=>o.connections.add(e)),o.nodes.push(...this.layers[e].layer.nodes),this.layers[e].layer.connections.forEach(e=>o.connections.add(e)),this.layers[e].layer.gates.forEach(e=>o.gates.add(e));return o.nodes.push(...this.layers[this.layers.length-1].layer.nodes),o}}exports.Architect=n;
},{"./Layers/CoreLayers/InputLayer":"../src/architecture/Layers/CoreLayers/InputLayer.js","./Layers/CoreLayers/OutputLayer":"../src/architecture/Layers/CoreLayers/OutputLayer.js","./Layers/Layer":"../src/architecture/Layers/Layer.js","./Network":"../src/architecture/Network.js"}],"../src/architecture/Nodes/ActivationNode.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivationNode = void 0;

const Utils_1 = require("../../utils/Utils");

const ConstantNode_1 = require("./ConstantNode");
/**
 * Activation node
 */


class ActivationNode extends ConstantNode_1.ConstantNode {
  constructor() {
    super();
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


  activate() {
    this.old = this.state;
    const incomingStates = Array.from(this.incoming).map(conn => conn.from.activation * conn.weight * conn.gain);

    if (incomingStates.length !== 1) {
      throw new ReferenceError("Only 1 incoming connections is allowed!");
    }

    this.state = incomingStates[0];
    this.activation = this.squash(this.state, false) * this.mask;
    this.derivativeState = this.squash(this.state, true);
    return this.activation;
  }
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


  propagate(target, options) {
    var _a, _b, _c;

    options.momentum = (_a = options.momentum) !== null && _a !== void 0 ? _a : 0;
    options.rate = (_b = options.rate) !== null && _b !== void 0 ? _b : 0.3;
    options.update = (_c = options.update) !== null && _c !== void 0 ? _c : true;
    const connectionsStates = Array.from(this.outgoing).map(conn => conn.to.errorResponsibility * conn.weight * conn.gain);
    this.errorResponsibility = this.errorProjected = Utils_1.sum(connectionsStates) * this.derivativeState;
    this.incoming.forEach(connection => {
      var _a, _b; // calculate gradient


      let gradient = this.errorProjected * connection.eligibility;
      connection.xTrace.forEach((value, key) => {
        gradient += key.errorResponsibility * value;
      });
      connection.deltaWeightsTotal += ((_a = options.rate) !== null && _a !== void 0 ? _a : 0.3) * gradient * this.mask;

      if (options.update) {
        connection.deltaWeightsTotal += ((_b = options.momentum) !== null && _b !== void 0 ? _b : 0) * connection.deltaWeightsPrevious;
        connection.weight += connection.deltaWeightsTotal;
        connection.deltaWeightsPrevious = connection.deltaWeightsTotal;
        connection.deltaWeightsTotal = 0;
      }
    });
  }

}

exports.ActivationNode = ActivationNode;
},{"../../utils/Utils":"../src/utils/Utils.js","./ConstantNode":"../src/architecture/Nodes/ConstantNode.js"}],"../src/architecture/Layers/CoreLayers/ActivationLayer.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ActivationLayer=void 0;const e=require("activations/build/src"),t=require("../../../enums/ConnectionType"),o=require("../../Nodes/ActivationNode"),i=require("../Layer");class n extends i.Layer{constructor(t,i={}){var n;super(t);const r=null!==(n=i.activation)&&void 0!==n?n:e.Logistic;for(let e=0;e<t;e++)this.inputNodes.add((new o.ActivationNode).setActivationType(r));this.outputNodes=this.inputNodes,this.nodes.push(...Array.from(this.inputNodes))}connectionTypeisAllowed(e){return e===t.ConnectionType.ONE_TO_ONE}getDefaultIncomingConnectionType(){return t.ConnectionType.ONE_TO_ONE}}exports.ActivationLayer=n;
},{"../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../Nodes/ActivationNode":"../src/architecture/Nodes/ActivationNode.js","../Layer":"../src/architecture/Layers/Layer.js"}],"../src/architecture/Layers/CoreLayers/DenseLayer.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.DenseLayer=void 0;const e=require("activations/build/src"),t=require("../../../enums/ConnectionType"),o=require("../../../enums/NodeType"),n=require("../../Node"),r=require("../Layer");class s extends r.Layer{constructor(t,r={}){var s;super(t);const i=null!==(s=r.activationType)&&void 0!==s?s:e.Logistic;for(let e=0;e<t;e++)this.inputNodes.add(new n.Node(o.NodeType.HIDDEN).setActivationType(i));this.outputNodes=this.inputNodes,this.nodes.push(...Array.from(this.inputNodes))}connectionTypeisAllowed(e){return!0}getDefaultIncomingConnectionType(){return t.ConnectionType.ALL_TO_ALL}}exports.DenseLayer=s;
},{"../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../Node":"../src/architecture/Node.js","../Layer":"../src/architecture/Layers/Layer.js"}],"../src/architecture/Nodes/DropoutNode.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.DropoutNode=void 0;const t=require("../../utils/Utils"),i=require("./ConstantNode");class o extends i.ConstantNode{constructor(t){super(),this.probability=t,this.droppedOut=!1}activate(){if(1!==this.incoming.size)throw new RangeError("Dropout node should have exactly one incoming connection!");const i=Array.from(this.incoming)[0];return t.randDouble(0,1)<this.probability?(this.droppedOut=!0,this.state=0):(this.droppedOut=!1,this.state=i.from.activation*i.weight*i.gain,this.state*=1/(1-this.probability)),this.activation=this.squash(this.state,!1)*this.mask,this.gated.forEach(t=>t.gain=this.activation),this.activation}propagate(i,o={}){var e,r,s;o.momentum=null!==(e=o.momentum)&&void 0!==e?e:0,o.rate=null!==(r=o.rate)&&void 0!==r?r:.3,o.update=null===(s=o.update)||void 0===s||s;const a=Array.from(this.outgoing).map(t=>t.to.errorResponsibility*t.weight*t.gain);if(this.errorResponsibility=this.errorProjected=t.sum(a)/(1-this.probability),1!==this.incoming.size)throw new RangeError("Dropout node should have exactly one incoming connection!");const n=Array.from(this.incoming)[0];if(!this.droppedOut){let t=this.errorProjected*n.eligibility;n.xTrace.forEach((i,o)=>{t+=o.errorResponsibility*i}),o.update&&(n.deltaWeightsTotal+=o.rate*t*this.mask+o.momentum*n.deltaWeightsPrevious,n.weight+=n.deltaWeightsTotal,n.deltaWeightsPrevious=n.deltaWeightsTotal,n.deltaWeightsTotal=0)}}fromJSON(t){return super.fromJSON(t),this.probability=t.probability,this}toJSON(){return Object.assign(super.toJSON(),{probability:this.probability})}}exports.DropoutNode=o;
},{"../../utils/Utils":"../src/utils/Utils.js","./ConstantNode":"../src/architecture/Nodes/ConstantNode.js"}],"../src/architecture/Layers/CoreLayers/DropoutLayer.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.DropoutLayer=void 0;const e=require("activations/build/src"),o=require("../../../enums/ConnectionType"),t=require("../../Nodes/DropoutNode"),n=require("../Layer");class r extends n.Layer{constructor(o,n={}){var r,i;super(o);const s=null!==(r=n.activation)&&void 0!==r?r:e.Identitiy,u=null!==(i=n.probability)&&void 0!==i?i:.1;for(let e=0;e<o;e++)this.inputNodes.add(new t.DropoutNode(u).setActivationType(s));this.outputNodes=this.inputNodes,this.nodes.push(...Array.from(this.inputNodes))}getDefaultIncomingConnectionType(){return o.ConnectionType.ONE_TO_ONE}connectionTypeisAllowed(e){return e===o.ConnectionType.ONE_TO_ONE}}exports.DropoutLayer=r;
},{"../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../Nodes/DropoutNode":"../src/architecture/Nodes/DropoutNode.js","../Layer":"../src/architecture/Layers/Layer.js"}],"../src/architecture/Nodes/PoolNode.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.PoolNode=void 0;const e=require("../../enums/NodeType"),t=require("../../utils/Utils"),i=require("./ConstantNode");class o extends i.ConstantNode{constructor(t=e.PoolNodeType.MAX_POOLING){super(),this.poolingType=t,this.receivingNode=null}fromJSON(e){return super.fromJSON(e),this.poolingType=e.poolType,this}activate(){const i=Array.from(this.incoming),o=i.map(e=>e.from.activation*e.weight*e.gain);if(this.poolingType===e.PoolNodeType.MAX_POOLING){const e=t.maxValueIndex(o);this.receivingNode=i[e].from,this.state=o[e]}else if(this.poolingType===e.PoolNodeType.AVG_POOLING)this.state=t.avg(o);else{if(this.poolingType!==e.PoolNodeType.MIN_POOLING)throw new ReferenceError("No valid pooling type! Type: "+this.poolingType);{const e=t.minValueIndex(o);this.receivingNode=i[e].from,this.state=o[e]}}return this.activation=this.squash(this.state,!1)*this.mask,this.poolingType===e.PoolNodeType.AVG_POOLING&&(this.derivativeState=this.squash(this.state,!0)),this.gated.forEach(e=>e.gain=this.activation),this.activation}propagate(i,o={}){var s,r,a;o.momentum=null!==(s=o.momentum)&&void 0!==s?s:0,o.rate=null!==(r=o.rate)&&void 0!==r?r:.3,o.update=null===(a=o.update)||void 0===a||a;const n=Array.from(this.outgoing).map(e=>e.to.errorResponsibility*e.weight*e.gain);this.errorResponsibility=this.errorProjected=t.sum(n)*this.derivativeState,this.poolingType===e.PoolNodeType.AVG_POOLING?this.incoming.forEach(e=>{var t,i;let s=this.errorProjected*e.eligibility;e.xTrace.forEach((e,t)=>{s+=t.errorResponsibility*e}),e.deltaWeightsTotal+=(null!==(t=o.rate)&&void 0!==t?t:.3)*s*this.mask,o.update&&(e.deltaWeightsTotal+=(null!==(i=o.momentum)&&void 0!==i?i:0)*e.deltaWeightsPrevious,e.weight+=e.deltaWeightsTotal,e.deltaWeightsPrevious=e.deltaWeightsTotal,e.deltaWeightsTotal=0)}):this.incoming.forEach(e=>{e.weight=this.receivingNode===e.from?1:0,e.gain=this.receivingNode===e.from?1:0})}toJSON(){return Object.assign(super.toJSON(),{poolType:this.poolingType})}}exports.PoolNode=o;
},{"../../enums/NodeType":"../src/enums/NodeType.js","../../utils/Utils":"../src/utils/Utils.js","./ConstantNode":"../src/architecture/Nodes/ConstantNode.js"}],"../src/architecture/Layers/PoolingLayers/PoolingLayer.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.PoolingLayer=void 0;const e=require("../../../enums/ConnectionType"),n=require("../Layer");class o extends n.Layer{constructor(e){super(e)}getDefaultIncomingConnectionType(){return e.ConnectionType.POOLING}connectionTypeisAllowed(e){return!0}}exports.PoolingLayer=o;
},{"../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../Layer":"../src/architecture/Layers/Layer.js"}],"../src/architecture/Layers/PoolingLayers/AvgPooling1DLayer.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.AvgPooling1DLayer=void 0;const e=require("activations/build/src"),o=require("../../../enums/NodeType"),t=require("../../Nodes/PoolNode"),i=require("./PoolingLayer");class s extends i.PoolingLayer{constructor(i,s={}){var r;super(i);const n=null!==(r=s.activation)&&void 0!==r?r:e.Identitiy;for(let e=0;e<i;e++)this.inputNodes.add(new t.PoolNode(o.PoolNodeType.AVG_POOLING).setActivationType(n));this.outputNodes=this.inputNodes,this.nodes.push(...Array.from(this.inputNodes))}}exports.AvgPooling1DLayer=s;
},{"../../../enums/NodeType":"../src/enums/NodeType.js","../../Nodes/PoolNode":"../src/architecture/Nodes/PoolNode.js","./PoolingLayer":"../src/architecture/Layers/PoolingLayers/PoolingLayer.js"}],"../src/architecture/Layers/PoolingLayers/GlobalAvgPooling1DLayer.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.GlobalAvgPooling1DLayer=void 0;const e=require("./AvgPooling1DLayer");class o extends e.AvgPooling1DLayer{constructor(e,o={}){super(1,o)}}exports.GlobalAvgPooling1DLayer=o;
},{"./AvgPooling1DLayer":"../src/architecture/Layers/PoolingLayers/AvgPooling1DLayer.js"}],"../src/architecture/Layers/PoolingLayers/MaxPooling1DLayer.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.MaxPooling1DLayer=void 0;const e=require("activations/build/src"),o=require("../../../enums/NodeType"),t=require("../../Nodes/PoolNode"),i=require("./PoolingLayer");class s extends i.PoolingLayer{constructor(i,s={}){var r;super(i);const n=null!==(r=s.activation)&&void 0!==r?r:e.Identitiy;for(let e=0;e<i;e++)this.inputNodes.add(new t.PoolNode(o.PoolNodeType.MAX_POOLING).setActivationType(n));this.outputNodes=this.inputNodes,this.nodes.push(...Array.from(this.inputNodes))}}exports.MaxPooling1DLayer=s;
},{"../../../enums/NodeType":"../src/enums/NodeType.js","../../Nodes/PoolNode":"../src/architecture/Nodes/PoolNode.js","./PoolingLayer":"../src/architecture/Layers/PoolingLayers/PoolingLayer.js"}],"../src/architecture/Layers/PoolingLayers/GlobalMaxPooling1DLayer.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.GlobalMaxPooling1DLayer=void 0;const e=require("./MaxPooling1DLayer");class o extends e.MaxPooling1DLayer{constructor(e,o={}){super(1,o)}}exports.GlobalMaxPooling1DLayer=o;
},{"./MaxPooling1DLayer":"../src/architecture/Layers/PoolingLayers/MaxPooling1DLayer.js"}],"../src/architecture/Layers/PoolingLayers/MinPooling1DLayer.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.MinPooling1DLayer=void 0;const e=require("activations/build/src"),o=require("../../../enums/NodeType"),t=require("../../Nodes/PoolNode"),i=require("./PoolingLayer");class s extends i.PoolingLayer{constructor(i,s={}){var r;super(i);const n=null!==(r=s.activation)&&void 0!==r?r:e.Identitiy;for(let e=0;e<i;e++)this.inputNodes.add(new t.PoolNode(o.PoolNodeType.MIN_POOLING).setActivationType(n));this.outputNodes=this.inputNodes,this.nodes.push(...Array.from(this.inputNodes))}}exports.MinPooling1DLayer=s;
},{"../../../enums/NodeType":"../src/enums/NodeType.js","../../Nodes/PoolNode":"../src/architecture/Nodes/PoolNode.js","./PoolingLayer":"../src/architecture/Layers/PoolingLayers/PoolingLayer.js"}],"../src/architecture/Layers/PoolingLayers/GlobalMinPooling1DLayer.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.GlobalMinPooling1DLayer=void 0;const e=require("./MinPooling1DLayer");class o extends e.MinPooling1DLayer{constructor(e,o={}){super(1,o)}}exports.GlobalMinPooling1DLayer=o;
},{"./MinPooling1DLayer":"../src/architecture/Layers/PoolingLayers/MinPooling1DLayer.js"}],"../src/architecture/Layers/RecurrentLayers/GRULayer.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.GRULayer=void 0;const e=require("activations/build/src"),n=require("../../../enums/ConnectionType"),t=require("../../../enums/GatingType"),o=require("../../../enums/NodeType"),s=require("../../Node"),i=require("../Layer");class c extends i.Layer{constructor(c,p={}){super(c);const u=[],h=[],L=[],r=[],y=[];for(let n=0;n<c;n++)this.inputNodes.add(new s.Node(o.NodeType.HIDDEN)),u.push(new s.Node(o.NodeType.HIDDEN).setBias(1)),h.push(new s.Node(o.NodeType.HIDDEN).setBias(0).setActivationType(e.Logistic)),L.push(new s.Node(o.NodeType.HIDDEN).setBias(0)),r.push(new s.Node(o.NodeType.HIDDEN).setActivationType(e.TANH)),y.push(new s.Node(o.NodeType.HIDDEN).setBias(0).setActivationType(e.Logistic)),this.outputNodes.add(new s.Node(o.NodeType.HIDDEN));this.connections.push(...i.Layer.connect(this.inputNodes,u,n.ConnectionType.ALL_TO_ALL)),this.connections.push(...i.Layer.connect(this.inputNodes,L,n.ConnectionType.ALL_TO_ALL)),this.connections.push(...i.Layer.connect(this.inputNodes,r,n.ConnectionType.ALL_TO_ALL)),this.connections.push(...i.Layer.connect(y,u,n.ConnectionType.ALL_TO_ALL)),this.connections.push(...i.Layer.connect(u,h,n.ConnectionType.ONE_TO_ONE,1)),this.connections.push(...i.Layer.connect(y,L,n.ConnectionType.ALL_TO_ALL));const a=i.Layer.connect(y,r,n.ConnectionType.ALL_TO_ALL);this.connections.push(...a),this.gates.push(...i.Layer.gate(L,a,t.GatingType.OUTPUT));const T=i.Layer.connect(y,this.outputNodes,n.ConnectionType.ALL_TO_ALL),d=i.Layer.connect(r,this.outputNodes,n.ConnectionType.ALL_TO_ALL);this.connections.push(...T),this.connections.push(...d),this.gates.push(...i.Layer.gate(u,T,t.GatingType.OUTPUT)),this.gates.push(...i.Layer.gate(h,d,t.GatingType.OUTPUT)),this.connections.push(...i.Layer.connect(this.outputNodes,y,n.ConnectionType.ONE_TO_ONE,1)),this.nodes.push(...Array.from(this.inputNodes)),this.nodes.push(...u),this.nodes.push(...h),this.nodes.push(...L),this.nodes.push(...r),this.nodes.push(...Array.from(this.outputNodes)),this.nodes.push(...y),this.outputNodes.forEach(n=>{var t;return n.squash=null!==(t=p.activation)&&void 0!==t?t:e.Logistic})}connectionTypeisAllowed(e){return!0}getDefaultIncomingConnectionType(){return n.ConnectionType.ALL_TO_ALL}}exports.GRULayer=c;
},{"../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../../enums/GatingType":"../src/enums/GatingType.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../Node":"../src/architecture/Node.js","../Layer":"../src/architecture/Layers/Layer.js"}],"../src/architecture/Layers/RecurrentLayers/HopfieldLayer.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.HopfieldLayer=void 0;const e=require("activations/build/src"),o=require("../../../enums/ConnectionType"),t=require("../../../enums/NodeType"),n=require("../../Node"),s=require("../Layer");class i extends s.Layer{constructor(i){super(i);for(let o=0;o<i;o++)this.inputNodes.add(new n.Node(t.NodeType.HIDDEN)),this.outputNodes.add(new n.Node(t.NodeType.HIDDEN).setActivationType(e.BinaryStep));this.connections.push(...s.Layer.connect(this.inputNodes,this.outputNodes,o.ConnectionType.ALL_TO_ALL)),this.connections.push(...s.Layer.connect(this.outputNodes,this.inputNodes,o.ConnectionType.ALL_TO_ALL)),this.nodes.push(...Array.from(this.inputNodes)),this.nodes.push(...Array.from(this.outputNodes))}connectionTypeisAllowed(e){return!0}getDefaultIncomingConnectionType(){return o.ConnectionType.ALL_TO_ALL}}exports.HopfieldLayer=i;
},{"../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../Node":"../src/architecture/Node.js","../Layer":"../src/architecture/Layers/Layer.js"}],"../src/architecture/Layers/RecurrentLayers/LSTMLayer.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.LSTMLayer=void 0;const e=require("activations/build/src"),n=require("../../../enums/ConnectionType"),t=require("../../../enums/GatingType"),o=require("../../../enums/NodeType"),s=require("../../Node"),i=require("../Layer");class c extends i.Layer{constructor(c,p={}){super(c);const u=[],L=[],r=[],h=[];for(let n=0;n<c;n++)this.inputNodes.add(new s.Node(o.NodeType.HIDDEN)),u.push(new s.Node(o.NodeType.HIDDEN).setBias(1)),L.push(new s.Node(o.NodeType.HIDDEN).setBias(1).setActivationType(e.Logistic)),r.push(new s.Node(o.NodeType.HIDDEN)),h.push(new s.Node(o.NodeType.HIDDEN).setBias(1)),this.outputNodes.add(new s.Node(o.NodeType.HIDDEN));this.connections.push(...i.Layer.connect(r,u,n.ConnectionType.ALL_TO_ALL)),this.connections.push(...i.Layer.connect(r,L,n.ConnectionType.ALL_TO_ALL)),this.connections.push(...i.Layer.connect(r,h,n.ConnectionType.ALL_TO_ALL));const a=i.Layer.connect(r,r,n.ConnectionType.ONE_TO_ONE),y=i.Layer.connect(r,this.outputNodes,n.ConnectionType.ALL_TO_ALL);this.connections.push(...a),this.connections.push(...y),this.connections.push(...i.Layer.connect(this.inputNodes,r,n.ConnectionType.ALL_TO_ALL)),this.connections.push(...i.Layer.connect(this.inputNodes,h,n.ConnectionType.ALL_TO_ALL)),this.connections.push(...i.Layer.connect(this.inputNodes,L,n.ConnectionType.ALL_TO_ALL));const d=i.Layer.connect(this.inputNodes,u,n.ConnectionType.ALL_TO_ALL);this.connections.push(...d),this.gates.push(...i.Layer.gate(L,a,t.GatingType.SELF)),this.gates.push(...i.Layer.gate(h,y,t.GatingType.OUTPUT)),this.gates.push(...i.Layer.gate(u,d,t.GatingType.INPUT)),this.nodes.push(...Array.from(this.inputNodes)),this.nodes.push(...u),this.nodes.push(...L),this.nodes.push(...r),this.nodes.push(...h),this.nodes.push(...Array.from(this.outputNodes)),this.outputNodes.forEach(n=>{var t;return n.squash=null!==(t=p.activation)&&void 0!==t?t:e.TANH})}connectionTypeisAllowed(e){return!0}getDefaultIncomingConnectionType(){return n.ConnectionType.ALL_TO_ALL}}exports.LSTMLayer=c;
},{"../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../../enums/GatingType":"../src/enums/GatingType.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../Node":"../src/architecture/Node.js","../Layer":"../src/architecture/Layers/Layer.js"}],"../src/architecture/Layers/RecurrentLayers/MemoryLayer.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.MemoryLayer=void 0;const e=require("activations/build/src"),o=require("../../../enums/ConnectionType"),t=require("../../../enums/NodeType"),r=require("../../Node"),s=require("../Layer");class n extends s.Layer{constructor(n,i={}){var u;super(n);for(let e=0;e<n;e++)this.inputNodes.add(new r.Node(t.NodeType.HIDDEN));let c=Array.from(this.inputNodes);const d=[];for(let a=0;a<(null!==(u=i.memorySize)&&void 0!==u?u:1);a++){const i=[];for(let o=0;o<n;o++){const o=new r.Node(t.NodeType.HIDDEN);o.squash=e.Identitiy,o.bias=0,i.push(o)}this.connections.push(...s.Layer.connect(c,i,o.ConnectionType.ONE_TO_ONE)),d.push(...i),c=i}this.nodes.push(...Array.from(this.inputNodes)),this.nodes.push(...d.reverse()),c.forEach(e=>this.outputNodes.add(e)),this.outputNodes.forEach(o=>{var t;return o.squash=null!==(t=i.activation)&&void 0!==t?t:e.Logistic})}connectionTypeisAllowed(e){return!0}getDefaultIncomingConnectionType(){return o.ConnectionType.ALL_TO_ALL}}exports.MemoryLayer=n;
},{"../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../Node":"../src/architecture/Node.js","../Layer":"../src/architecture/Layers/Layer.js"}],"../src/architecture/Layers/RecurrentLayers/RNNLayer.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.RNNLayer=void 0;const e=require("activations/build/src"),t=require("../../../enums/ConnectionType"),o=require("../../../enums/NodeType"),n=require("../../Node"),i=require("../Layer");class s extends i.Layer{constructor(s,r={}){var u;super(s);for(let t=0;t<s;t++)this.inputNodes.add(new n.Node(o.NodeType.HIDDEN).setActivationType(null!==(u=r.activation)&&void 0!==u?u:e.Logistic));this.outputNodes=this.inputNodes,this.nodes.push(...Array.from(this.inputNodes)),this.connections.push(...i.Layer.connect(this.nodes,this.nodes,t.ConnectionType.ONE_TO_ONE))}connectionTypeisAllowed(e){return!0}getDefaultIncomingConnectionType(){return t.ConnectionType.ALL_TO_ALL}}exports.RNNLayer=s;
},{"../../../enums/ConnectionType":"../src/enums/ConnectionType.js","../../../enums/NodeType":"../src/enums/NodeType.js","../../Node":"../src/architecture/Node.js","../Layer":"../src/architecture/Layers/Layer.js"}],"../src/methods/Rate.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.InverseRate=exports.ExponentialRate=exports.StepRate=exports.FixedRate=exports.Rate=void 0;class t{constructor(t){this.baseRate=t}}exports.Rate=t;class e extends t{calc(t){return this.baseRate}}exports.FixedRate=e;class s extends t{constructor(t,e=.9,s=100){super(t),this.gamma=e,this.stepSize=s}calc(t){return this.baseRate*Math.pow(this.gamma,Math.floor(t/this.stepSize))}}exports.StepRate=s;class a extends t{constructor(t,e=.999){super(t),this.gamma=e}calc(t){return this.baseRate*Math.pow(this.gamma,t)}}exports.ExponentialRate=a;class r extends t{constructor(t,e=.001,s=2){super(t),this.gamma=e,this.power=s}calc(t){return this.baseRate*Math.pow(1+this.gamma*t,-this.power)}}exports.InverseRate=r;
},{}],"../src/interfaces/TrainOptions.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.TrainOptions=void 0;const t=require("../methods/Loss"),e=require("../methods/Rate");class s{constructor(s){this._dataset=s,this._iterations=-1,this._error=-1,this._loss=t.MSELoss,this._dropout=0,this._momentum=0,this._batchSize=this.dataset.length,this._rate=new e.FixedRate(.3),this._log=-1,this._crossValidateTestSize=-1,this._shuffle=!1,this._clear=!1}get dataset(){return this._dataset}set dataset(t){this._dataset=t}get shuffle(){return this._shuffle}set shuffle(t){this._shuffle=t}get clear(){return this._clear}set clear(t){this._clear=t}get schedule(){return this._schedule}set schedule(t){this._schedule=t}get crossValidateTestSize(){return this._crossValidateTestSize}set crossValidateTestSize(t){this._crossValidateTestSize=t}get rate(){return this._rate}set rate(t){this._rate=t}get loss(){return this._loss}set loss(t){this._loss=t}get iterations(){return this._iterations}set iterations(t){this._iterations=t}get error(){return this._error}set error(t){this._error=t}get momentum(){return this._momentum}set momentum(t){this._momentum=t}get dropout(){return this._dropout}set dropout(t){this._dropout=t}get log(){return this._log}set log(t){this._log=t}get batchSize(){return this._batchSize}set batchSize(t){this._batchSize=t}}exports.TrainOptions=s;
},{"../methods/Loss":"../src/methods/Loss.js","../methods/Rate":"../src/methods/Rate.js"}],"index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateGaussian = exports.avg = exports.sum = exports.min = exports.minValueIndex = exports.maxValueIndex = exports.max = exports.shuffle = exports.removeFromArray = exports.randBoolean = exports.randDouble = exports.randInt = exports.pickRandom = exports.TournamentSelection = exports.PowerSelection = exports.FitnessProportionateSelection = exports.Selection = exports.InverseRate = exports.ExponentialRate = exports.StepRate = exports.FixedRate = exports.Rate = exports.SwapNodesMutation = exports.SubBackConnectionMutation = exports.AddBackConnectionMutation = exports.SubSelfConnectionMutation = exports.AddSelfConnectionMutation = exports.SubGateMutation = exports.AddGateMutation = exports.ModActivationMutation = exports.ModBiasMutation = exports.ModWeightMutation = exports.SubConnectionMutation = exports.AddConnectionMutation = exports.SubNodeMutation = exports.AddNodeMutation = exports.Mutation = exports.ONLY_STRUCTURE = exports.NO_STRUCTURE_MUTATIONS = exports.FEEDFORWARD_MUTATIONS = exports.ALL_MUTATIONS = exports.HINGELoss = exports.MSLELoss = exports.WAPELoss = exports.MAPELoss = exports.MAELoss = exports.BinaryLoss = exports.MBELoss = exports.MSELoss = exports.ALL_LOSSES = exports.TrainOptions = exports.EvolveOptions = exports.NoiseNodeType = exports.PoolNodeType = exports.NodeType = exports.GatingType = exports.ConnectionType = exports.Node = exports.Species = exports.Network = exports.Connection = exports.Architect = exports.PoolNode = exports.NoiseNode = exports.DropoutNode = exports.ConstantNode = exports.Layer = exports.MemoryLayer = exports.LSTMLayer = exports.GRULayer = exports.RNNLayer = exports.HopfieldLayer = exports.ActivationLayer = exports.PoolingLayer = exports.GlobalMaxPooling1DLayer = exports.GlobalMinPooling1DLayer = exports.GlobalAvgPooling1DLayer = exports.MaxPooling1DLayer = exports.MinPooling1DLayer = exports.AvgPooling1DLayer = exports.NoiseLayer = exports.OutputLayer = exports.InputLayer = exports.DropoutLayer = exports.DenseLayer = void 0;

const Architect_1 = require("../src/architecture/Architect");

Object.defineProperty(exports, "Architect", {
  enumerable: true,
  get: function () {
    return Architect_1.Architect;
  }
});

const Connection_1 = require("../src/architecture/Connection");

Object.defineProperty(exports, "Connection", {
  enumerable: true,
  get: function () {
    return Connection_1.Connection;
  }
});

const ActivationLayer_1 = require("../src/architecture/Layers/CoreLayers/ActivationLayer");

Object.defineProperty(exports, "ActivationLayer", {
  enumerable: true,
  get: function () {
    return ActivationLayer_1.ActivationLayer;
  }
});

const DenseLayer_1 = require("../src/architecture/Layers/CoreLayers/DenseLayer");

Object.defineProperty(exports, "DenseLayer", {
  enumerable: true,
  get: function () {
    return DenseLayer_1.DenseLayer;
  }
});

const DropoutLayer_1 = require("../src/architecture/Layers/CoreLayers/DropoutLayer");

Object.defineProperty(exports, "DropoutLayer", {
  enumerable: true,
  get: function () {
    return DropoutLayer_1.DropoutLayer;
  }
});

const InputLayer_1 = require("../src/architecture/Layers/CoreLayers/InputLayer");

Object.defineProperty(exports, "InputLayer", {
  enumerable: true,
  get: function () {
    return InputLayer_1.InputLayer;
  }
});

const OutputLayer_1 = require("../src/architecture/Layers/CoreLayers/OutputLayer");

Object.defineProperty(exports, "OutputLayer", {
  enumerable: true,
  get: function () {
    return OutputLayer_1.OutputLayer;
  }
});

const Layer_1 = require("../src/architecture/Layers/Layer");

Object.defineProperty(exports, "Layer", {
  enumerable: true,
  get: function () {
    return Layer_1.Layer;
  }
});

const NoiseLayer_1 = require("../src/architecture/Layers/NoiseLayers/NoiseLayer");

Object.defineProperty(exports, "NoiseLayer", {
  enumerable: true,
  get: function () {
    return NoiseLayer_1.NoiseLayer;
  }
});

const AvgPooling1DLayer_1 = require("../src/architecture/Layers/PoolingLayers/AvgPooling1DLayer");

Object.defineProperty(exports, "AvgPooling1DLayer", {
  enumerable: true,
  get: function () {
    return AvgPooling1DLayer_1.AvgPooling1DLayer;
  }
});

const GlobalAvgPooling1DLayer_1 = require("../src/architecture/Layers/PoolingLayers/GlobalAvgPooling1DLayer");

Object.defineProperty(exports, "GlobalAvgPooling1DLayer", {
  enumerable: true,
  get: function () {
    return GlobalAvgPooling1DLayer_1.GlobalAvgPooling1DLayer;
  }
});

const GlobalMaxPooling1DLayer_1 = require("../src/architecture/Layers/PoolingLayers/GlobalMaxPooling1DLayer");

Object.defineProperty(exports, "GlobalMaxPooling1DLayer", {
  enumerable: true,
  get: function () {
    return GlobalMaxPooling1DLayer_1.GlobalMaxPooling1DLayer;
  }
});

const GlobalMinPooling1DLayer_1 = require("../src/architecture/Layers/PoolingLayers/GlobalMinPooling1DLayer");

Object.defineProperty(exports, "GlobalMinPooling1DLayer", {
  enumerable: true,
  get: function () {
    return GlobalMinPooling1DLayer_1.GlobalMinPooling1DLayer;
  }
});

const MaxPooling1DLayer_1 = require("../src/architecture/Layers/PoolingLayers/MaxPooling1DLayer");

Object.defineProperty(exports, "MaxPooling1DLayer", {
  enumerable: true,
  get: function () {
    return MaxPooling1DLayer_1.MaxPooling1DLayer;
  }
});

const MinPooling1DLayer_1 = require("../src/architecture/Layers/PoolingLayers/MinPooling1DLayer");

Object.defineProperty(exports, "MinPooling1DLayer", {
  enumerable: true,
  get: function () {
    return MinPooling1DLayer_1.MinPooling1DLayer;
  }
});

const PoolingLayer_1 = require("../src/architecture/Layers/PoolingLayers/PoolingLayer");

Object.defineProperty(exports, "PoolingLayer", {
  enumerable: true,
  get: function () {
    return PoolingLayer_1.PoolingLayer;
  }
});

const GRULayer_1 = require("../src/architecture/Layers/RecurrentLayers/GRULayer");

Object.defineProperty(exports, "GRULayer", {
  enumerable: true,
  get: function () {
    return GRULayer_1.GRULayer;
  }
});

const HopfieldLayer_1 = require("../src/architecture/Layers/RecurrentLayers/HopfieldLayer");

Object.defineProperty(exports, "HopfieldLayer", {
  enumerable: true,
  get: function () {
    return HopfieldLayer_1.HopfieldLayer;
  }
});

const LSTMLayer_1 = require("../src/architecture/Layers/RecurrentLayers/LSTMLayer");

Object.defineProperty(exports, "LSTMLayer", {
  enumerable: true,
  get: function () {
    return LSTMLayer_1.LSTMLayer;
  }
});

const MemoryLayer_1 = require("../src/architecture/Layers/RecurrentLayers/MemoryLayer");

Object.defineProperty(exports, "MemoryLayer", {
  enumerable: true,
  get: function () {
    return MemoryLayer_1.MemoryLayer;
  }
});

const RNNLayer_1 = require("../src/architecture/Layers/RecurrentLayers/RNNLayer");

Object.defineProperty(exports, "RNNLayer", {
  enumerable: true,
  get: function () {
    return RNNLayer_1.RNNLayer;
  }
});

const Network_1 = require("../src/architecture/Network");

Object.defineProperty(exports, "Network", {
  enumerable: true,
  get: function () {
    return Network_1.Network;
  }
});

const Node_1 = require("../src/architecture/Node");

Object.defineProperty(exports, "Node", {
  enumerable: true,
  get: function () {
    return Node_1.Node;
  }
});

const ConstantNode_1 = require("../src/architecture/Nodes/ConstantNode");

Object.defineProperty(exports, "ConstantNode", {
  enumerable: true,
  get: function () {
    return ConstantNode_1.ConstantNode;
  }
});

const DropoutNode_1 = require("../src/architecture/Nodes/DropoutNode");

Object.defineProperty(exports, "DropoutNode", {
  enumerable: true,
  get: function () {
    return DropoutNode_1.DropoutNode;
  }
});

const NoiseNode_1 = require("../src/architecture/Nodes/NoiseNode");

Object.defineProperty(exports, "NoiseNode", {
  enumerable: true,
  get: function () {
    return NoiseNode_1.NoiseNode;
  }
});

const PoolNode_1 = require("../src/architecture/Nodes/PoolNode");

Object.defineProperty(exports, "PoolNode", {
  enumerable: true,
  get: function () {
    return PoolNode_1.PoolNode;
  }
});

const Species_1 = require("../src/architecture/Species");

Object.defineProperty(exports, "Species", {
  enumerable: true,
  get: function () {
    return Species_1.Species;
  }
});

const ConnectionType_1 = require("../src/enums/ConnectionType");

Object.defineProperty(exports, "ConnectionType", {
  enumerable: true,
  get: function () {
    return ConnectionType_1.ConnectionType;
  }
});

const GatingType_1 = require("../src/enums/GatingType");

Object.defineProperty(exports, "GatingType", {
  enumerable: true,
  get: function () {
    return GatingType_1.GatingType;
  }
});

const NodeType_1 = require("../src/enums/NodeType");

Object.defineProperty(exports, "NodeType", {
  enumerable: true,
  get: function () {
    return NodeType_1.NodeType;
  }
});
Object.defineProperty(exports, "NoiseNodeType", {
  enumerable: true,
  get: function () {
    return NodeType_1.NoiseNodeType;
  }
});
Object.defineProperty(exports, "PoolNodeType", {
  enumerable: true,
  get: function () {
    return NodeType_1.PoolNodeType;
  }
});

const EvolveOptions_1 = require("../src/interfaces/EvolveOptions");

Object.defineProperty(exports, "EvolveOptions", {
  enumerable: true,
  get: function () {
    return EvolveOptions_1.EvolveOptions;
  }
});

const TrainOptions_1 = require("../src/interfaces/TrainOptions");

Object.defineProperty(exports, "TrainOptions", {
  enumerable: true,
  get: function () {
    return TrainOptions_1.TrainOptions;
  }
});

const Loss_1 = require("../src/methods/Loss");

Object.defineProperty(exports, "ALL_LOSSES", {
  enumerable: true,
  get: function () {
    return Loss_1.ALL_LOSSES;
  }
});
Object.defineProperty(exports, "BinaryLoss", {
  enumerable: true,
  get: function () {
    return Loss_1.BinaryLoss;
  }
});
Object.defineProperty(exports, "HINGELoss", {
  enumerable: true,
  get: function () {
    return Loss_1.HINGELoss;
  }
});
Object.defineProperty(exports, "MAELoss", {
  enumerable: true,
  get: function () {
    return Loss_1.MAELoss;
  }
});
Object.defineProperty(exports, "MAPELoss", {
  enumerable: true,
  get: function () {
    return Loss_1.MAPELoss;
  }
});
Object.defineProperty(exports, "MBELoss", {
  enumerable: true,
  get: function () {
    return Loss_1.MBELoss;
  }
});
Object.defineProperty(exports, "MSELoss", {
  enumerable: true,
  get: function () {
    return Loss_1.MSELoss;
  }
});
Object.defineProperty(exports, "MSLELoss", {
  enumerable: true,
  get: function () {
    return Loss_1.MSLELoss;
  }
});
Object.defineProperty(exports, "WAPELoss", {
  enumerable: true,
  get: function () {
    return Loss_1.WAPELoss;
  }
});

const Mutation_1 = require("../src/methods/Mutation");

Object.defineProperty(exports, "AddBackConnectionMutation", {
  enumerable: true,
  get: function () {
    return Mutation_1.AddBackConnectionMutation;
  }
});
Object.defineProperty(exports, "AddConnectionMutation", {
  enumerable: true,
  get: function () {
    return Mutation_1.AddConnectionMutation;
  }
});
Object.defineProperty(exports, "AddGateMutation", {
  enumerable: true,
  get: function () {
    return Mutation_1.AddGateMutation;
  }
});
Object.defineProperty(exports, "AddNodeMutation", {
  enumerable: true,
  get: function () {
    return Mutation_1.AddNodeMutation;
  }
});
Object.defineProperty(exports, "AddSelfConnectionMutation", {
  enumerable: true,
  get: function () {
    return Mutation_1.AddSelfConnectionMutation;
  }
});
Object.defineProperty(exports, "ALL_MUTATIONS", {
  enumerable: true,
  get: function () {
    return Mutation_1.ALL_MUTATIONS;
  }
});
Object.defineProperty(exports, "FEEDFORWARD_MUTATIONS", {
  enumerable: true,
  get: function () {
    return Mutation_1.FEEDFORWARD_MUTATIONS;
  }
});
Object.defineProperty(exports, "ModActivationMutation", {
  enumerable: true,
  get: function () {
    return Mutation_1.ModActivationMutation;
  }
});
Object.defineProperty(exports, "ModBiasMutation", {
  enumerable: true,
  get: function () {
    return Mutation_1.ModBiasMutation;
  }
});
Object.defineProperty(exports, "ModWeightMutation", {
  enumerable: true,
  get: function () {
    return Mutation_1.ModWeightMutation;
  }
});
Object.defineProperty(exports, "Mutation", {
  enumerable: true,
  get: function () {
    return Mutation_1.Mutation;
  }
});
Object.defineProperty(exports, "NO_STRUCTURE_MUTATIONS", {
  enumerable: true,
  get: function () {
    return Mutation_1.NO_STRUCTURE_MUTATIONS;
  }
});
Object.defineProperty(exports, "ONLY_STRUCTURE", {
  enumerable: true,
  get: function () {
    return Mutation_1.ONLY_STRUCTURE;
  }
});
Object.defineProperty(exports, "SubBackConnectionMutation", {
  enumerable: true,
  get: function () {
    return Mutation_1.SubBackConnectionMutation;
  }
});
Object.defineProperty(exports, "SubConnectionMutation", {
  enumerable: true,
  get: function () {
    return Mutation_1.SubConnectionMutation;
  }
});
Object.defineProperty(exports, "SubGateMutation", {
  enumerable: true,
  get: function () {
    return Mutation_1.SubGateMutation;
  }
});
Object.defineProperty(exports, "SubNodeMutation", {
  enumerable: true,
  get: function () {
    return Mutation_1.SubNodeMutation;
  }
});
Object.defineProperty(exports, "SubSelfConnectionMutation", {
  enumerable: true,
  get: function () {
    return Mutation_1.SubSelfConnectionMutation;
  }
});
Object.defineProperty(exports, "SwapNodesMutation", {
  enumerable: true,
  get: function () {
    return Mutation_1.SwapNodesMutation;
  }
});

const Rate_1 = require("../src/methods/Rate");

Object.defineProperty(exports, "ExponentialRate", {
  enumerable: true,
  get: function () {
    return Rate_1.ExponentialRate;
  }
});
Object.defineProperty(exports, "FixedRate", {
  enumerable: true,
  get: function () {
    return Rate_1.FixedRate;
  }
});
Object.defineProperty(exports, "InverseRate", {
  enumerable: true,
  get: function () {
    return Rate_1.InverseRate;
  }
});
Object.defineProperty(exports, "Rate", {
  enumerable: true,
  get: function () {
    return Rate_1.Rate;
  }
});
Object.defineProperty(exports, "StepRate", {
  enumerable: true,
  get: function () {
    return Rate_1.StepRate;
  }
});

const Selection_1 = require("../src/methods/Selection");

Object.defineProperty(exports, "FitnessProportionateSelection", {
  enumerable: true,
  get: function () {
    return Selection_1.FitnessProportionateSelection;
  }
});
Object.defineProperty(exports, "PowerSelection", {
  enumerable: true,
  get: function () {
    return Selection_1.PowerSelection;
  }
});
Object.defineProperty(exports, "Selection", {
  enumerable: true,
  get: function () {
    return Selection_1.Selection;
  }
});
Object.defineProperty(exports, "TournamentSelection", {
  enumerable: true,
  get: function () {
    return Selection_1.TournamentSelection;
  }
});

const Utils_1 = require("../src/utils/Utils");

Object.defineProperty(exports, "avg", {
  enumerable: true,
  get: function () {
    return Utils_1.avg;
  }
});
Object.defineProperty(exports, "generateGaussian", {
  enumerable: true,
  get: function () {
    return Utils_1.generateGaussian;
  }
});
Object.defineProperty(exports, "max", {
  enumerable: true,
  get: function () {
    return Utils_1.max;
  }
});
Object.defineProperty(exports, "maxValueIndex", {
  enumerable: true,
  get: function () {
    return Utils_1.maxValueIndex;
  }
});
Object.defineProperty(exports, "min", {
  enumerable: true,
  get: function () {
    return Utils_1.min;
  }
});
Object.defineProperty(exports, "minValueIndex", {
  enumerable: true,
  get: function () {
    return Utils_1.minValueIndex;
  }
});
Object.defineProperty(exports, "pickRandom", {
  enumerable: true,
  get: function () {
    return Utils_1.pickRandom;
  }
});
Object.defineProperty(exports, "randBoolean", {
  enumerable: true,
  get: function () {
    return Utils_1.randBoolean;
  }
});
Object.defineProperty(exports, "randDouble", {
  enumerable: true,
  get: function () {
    return Utils_1.randDouble;
  }
});
Object.defineProperty(exports, "randInt", {
  enumerable: true,
  get: function () {
    return Utils_1.randInt;
  }
});
Object.defineProperty(exports, "removeFromArray", {
  enumerable: true,
  get: function () {
    return Utils_1.removeFromArray;
  }
});
Object.defineProperty(exports, "shuffle", {
  enumerable: true,
  get: function () {
    return Utils_1.shuffle;
  }
});
Object.defineProperty(exports, "sum", {
  enumerable: true,
  get: function () {
    return Utils_1.sum;
  }
});
},{"../src/architecture/Architect":"../src/architecture/Architect.js","../src/architecture/Connection":"../src/architecture/Connection.js","../src/architecture/Layers/CoreLayers/ActivationLayer":"../src/architecture/Layers/CoreLayers/ActivationLayer.js","../src/architecture/Layers/CoreLayers/DenseLayer":"../src/architecture/Layers/CoreLayers/DenseLayer.js","../src/architecture/Layers/CoreLayers/DropoutLayer":"../src/architecture/Layers/CoreLayers/DropoutLayer.js","../src/architecture/Layers/CoreLayers/InputLayer":"../src/architecture/Layers/CoreLayers/InputLayer.js","../src/architecture/Layers/CoreLayers/OutputLayer":"../src/architecture/Layers/CoreLayers/OutputLayer.js","../src/architecture/Layers/Layer":"../src/architecture/Layers/Layer.js","../src/architecture/Layers/NoiseLayers/NoiseLayer":"../src/architecture/Layers/NoiseLayers/NoiseLayer.js","../src/architecture/Layers/PoolingLayers/AvgPooling1DLayer":"../src/architecture/Layers/PoolingLayers/AvgPooling1DLayer.js","../src/architecture/Layers/PoolingLayers/GlobalAvgPooling1DLayer":"../src/architecture/Layers/PoolingLayers/GlobalAvgPooling1DLayer.js","../src/architecture/Layers/PoolingLayers/GlobalMaxPooling1DLayer":"../src/architecture/Layers/PoolingLayers/GlobalMaxPooling1DLayer.js","../src/architecture/Layers/PoolingLayers/GlobalMinPooling1DLayer":"../src/architecture/Layers/PoolingLayers/GlobalMinPooling1DLayer.js","../src/architecture/Layers/PoolingLayers/MaxPooling1DLayer":"../src/architecture/Layers/PoolingLayers/MaxPooling1DLayer.js","../src/architecture/Layers/PoolingLayers/MinPooling1DLayer":"../src/architecture/Layers/PoolingLayers/MinPooling1DLayer.js","../src/architecture/Layers/PoolingLayers/PoolingLayer":"../src/architecture/Layers/PoolingLayers/PoolingLayer.js","../src/architecture/Layers/RecurrentLayers/GRULayer":"../src/architecture/Layers/RecurrentLayers/GRULayer.js","../src/architecture/Layers/RecurrentLayers/HopfieldLayer":"../src/architecture/Layers/RecurrentLayers/HopfieldLayer.js","../src/architecture/Layers/RecurrentLayers/LSTMLayer":"../src/architecture/Layers/RecurrentLayers/LSTMLayer.js","../src/architecture/Layers/RecurrentLayers/MemoryLayer":"../src/architecture/Layers/RecurrentLayers/MemoryLayer.js","../src/architecture/Layers/RecurrentLayers/RNNLayer":"../src/architecture/Layers/RecurrentLayers/RNNLayer.js","../src/architecture/Network":"../src/architecture/Network.js","../src/architecture/Node":"../src/architecture/Node.js","../src/architecture/Nodes/ConstantNode":"../src/architecture/Nodes/ConstantNode.js","../src/architecture/Nodes/DropoutNode":"../src/architecture/Nodes/DropoutNode.js","../src/architecture/Nodes/NoiseNode":"../src/architecture/Nodes/NoiseNode.js","../src/architecture/Nodes/PoolNode":"../src/architecture/Nodes/PoolNode.js","../src/architecture/Species":"../src/architecture/Species.js","../src/enums/ConnectionType":"../src/enums/ConnectionType.js","../src/enums/GatingType":"../src/enums/GatingType.js","../src/enums/NodeType":"../src/enums/NodeType.js","../src/interfaces/EvolveOptions":"../src/interfaces/EvolveOptions.js","../src/interfaces/TrainOptions":"../src/interfaces/TrainOptions.js","../src/methods/Loss":"../src/methods/Loss.js","../src/methods/Mutation":"../src/methods/Mutation.js","../src/methods/Rate":"../src/methods/Rate.js","../src/methods/Selection":"../src/methods/Selection.js","../src/utils/Utils":"../src/utils/Utils.js"}]},{},["index.js"], "carrot")
//# sourceMappingURL=/index.js.map