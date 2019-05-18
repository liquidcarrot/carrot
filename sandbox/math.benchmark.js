//=================================
// IMPORT =========================
//=================================

let mathjs = require("mathjs")
const bigInteger = require("big-integer")
// const biginteger = require("biginteger") // Broken implementation
// const bigintegerJS = require("biginteger.js") // Broken implementation
// const bigNumber = require("big-number") // Broken implementation
const bigi = require("bigi")
// const bignumber = require("bignumber") // Unsupported; badly documented
const bignumberJS = require("bignumber.js")
const bigJS = require("big.js")
// const bnJS = require("bn.js") // Broken implementation
const bignum = require("bignum")
// const bigint = require("bigint") // Breaks `npm i`
const { BigInteger } = require("js-big-integer")
// const nodeBiginteger = require("node-biginteger") // Broken implementation
// const numberCrunch = require("number-crunch") Broken & Complicated (but awesome)
// const javascriptBiginteger = require("javascript-biginteger") // Unsupported; badly documented

const { Suite } = require("benchmark");
const chalk = require("chalk");


//=================================
// CONFIG =========================
//=================================

// CONSTANTS
const MAX_NUM = Number.MAX_VALUE;
const MIN_NUM = -Number.MAX_VALUE;
const MAX_HEX = MAX_NUM.toString(16);
const MIX_HEX = MIN_NUM.toString(16);

// mathjs
mathjs.config({
  number: "BigNumber"
});
const mathjs_MAX_NUM = mathjs.bignumber(Number.MAX_VALUE);
const mathjs_MIN_NUM = mathjs.bignumber(-Number.MAX_VALUE);

// bigi
let bigi_MAX_NUM = bigi.fromHex(MAX_HEX);

// jsBigInteger
const jsBigInteger_MAX_NUM = BigInteger.BigInt(MAX_NUM);

//=================================
// BENCHMARK ======================
//=================================

let mult = new Suite();




mult
.add("mathjs.v0", function() {
  return mathjs.multiply(mathjs_MAX_NUM, mathjs_MAX_NUM, mathjs_MAX_NUM)
})
.add("mathjs.v1", function() {
  return mathjs.prod(mathjs_MAX_NUM, mathjs_MAX_NUM, mathjs_MAX_NUM)
})
.add("mathjs.v2", function() {
  return mathjs.prod([mathjs_MAX_NUM, mathjs_MAX_NUM, mathjs_MAX_NUM])
})
.add("bigInteger.v0", function() {
  return bigInteger(Number.MAX_VALUE).multiply(Number.MAX_VALUE).multiply(Number.MAX_VALUE)
})
.add("bigInteger.v1", function() {
  return bigInteger(Number.MAX_VALUE).times(Number.MAX_VALUE).times(Number.MAX_VALUE)
})
// Broken
/**.add("biginteger.v0", function() {
  return biginteger(Number.MAX_VALUE).multiply(Number.MAX_VALUE, Number.MAX_VALUE)
})*/
// Broken
/**.add("bigintegerJS.v0", function() {
  return (new bigintegerJS(Number.MAX_VALUE)).multiply(Number.MAX_VALUE, Number.MAX_VALUE)
})*/
// Broken
/**.add("bigNumber.v0", function() {
  return bigNumber(Number.MAX_VALUE).multiply(Number.MAX_VALUE).mulitply(Number.MAX_VALUE);
})*/
.add("bigi.v0", function() {
  return bigi_MAX_NUM.multiply(bigi_MAX_NUM).multiply(bigi_MAX_NUM);
})
.add("bignumberJS.v0", function() {
  return (new bignumberJS(MAX_NUM)).times(MAX_NUM).times(MAX_NUM);
})
.add("bignumberJS.v1", function() {
  return (new bignumberJS(MAX_NUM)).multipliedBy(MAX_NUM).multipliedBy(MAX_NUM);
})
.add("bigJS.v0", function() {
  return (new bigJS(MAX_NUM)).times(MAX_NUM).times(MAX_NUM);
})
// Broken
/**.add("bnJS.v0", function() {
  return (new bnJS(MAX_NUM)).mul(MAX_NUM).mul(MAX_NUM);
})*/
.add("bignum.v0", function() {
  return bignum(MAX_NUM).mul(MAX_NUM).mul(MAX_NUM);
})
.add("jsBigInteger.v0", function() {
  return BigInteger.multiply(BigInteger.multiply(jsBigInteger_MAX_NUM, jsBigInteger_MAX_NUM), jsBigInteger_MAX_NUM)
})
// Broken
/*.add("nodeBigInteger.v0", function() {
  return nodeBigInteger.fromLong(MAX_NUM).multiply(MAX_NUM).multiply(MAX_NUM);
})*/
// Broken & Complicated (but awesome)
/**.add("numberCrunch", function() {
  return numberCrunch.mul(numberCrunch.mul([Number.MAX_VALUE], [Number.MAX_VALUE]), [Number.MAX_VALUE])
})*/
.on("start", function() {
  console.log(chalk.bold("Multiplication"));
})
.on("cycle", function(event) {
  console.log("\t* " + String(event.target));
})
.on("complete", function() {
  console.log("Fastest is " + this.filter("fastest").map("name"))
})
.run({
  "async": true,
  "queue": true
})
