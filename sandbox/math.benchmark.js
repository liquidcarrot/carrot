//=================================
// IMPORT =========================
//=================================

let mathjs = require("mathjs")
const bigInteger = require("big-integer")
const biginteger = require("biginteger")
const bigintegerJS = require("biginteger.js")
const bigNumber = require("big-number")
const bigi = require("bigi")
const bignumber = require("bignumber")
const bignumberJS = require("bignumber.js")
const bigJS = require("big.js")
const bnJS = require("bn.js")
const bignum = require("bignum")
// const bigint = require("bigint") // Breaks `npm i`
const jsBigInteger = require("js-big-integer")
const nodeBiginteger = require("node-biginteger")
const numberCrunch = require("number-crunch")
const javascriptBiginteger = require("javascript-biginteger")
const { Suite } = require("benchmark")


//=================================
// CONFIG =========================
//=================================

// mathjs
mathjs.config({
  number: "BigNumber"
})

//=================================
// BENCHMARK ======================
//=================================

let mult = new Suite();



mult
.add("mathjs.v0", function() {
  return mathjs.prod([Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE])
})
.add("", function() {
  
})
.add("", function() {
  
})
.add("", function() {
  
})
.add("", function() {
  
})
.add("", function() {
  
})
.add("", function() {
  
})
.add("", function() {
  
})
.add("", function() {
  
})
.add("", function() {
  
})
.add("", function() {
  
})
.add("", function() {
  
})
.add("", function() {
  
})
.add("", function() {
  
})
.add("", function() {
  
})
.add("", function() {
  
})
.add("", function() {
  
})
.add("", function() {
  
})
.on("cycle", function(event) {
  console.log(String(event.target));
})
.on("complete", function() {
  console.log("Fastest is " + this.filter("fastest").map("name"))
})
.run({
  "async": true,
  "queue": true
})
