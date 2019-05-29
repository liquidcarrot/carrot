const _ = require("lodash");
const chai = require("chai");

const expect = chai.expect;
const should = chai.should();

describe("Connection", function() {
  const Connection = require("../src/connection");
  
  it("new Connection(from, to)", function() {
    //===================================
    // CODE =============================
    //===================================
    const from = "CHESE";
    const to = "QUESO";
    
    const connection = new Connection(from, to);
    
    //===================================
    // TEST =============================
    //===================================
    expect(connection.from).to.equal(from);
    expect(connection.to).to.equal(to);
    expect(connection.weight).to.be.a("number");
  })
  
  it("new Connection(from, to, weight)", function() {
    //===================================
    // CODE =============================
    //===================================
    const from = "CHESE";
    const to = "QUESO";
    const weight = Math.random();
    
    const connection = new Connection(from, to, weight);
    
    //===================================
    // TEST =============================
    //===================================
    expect(connection.from).to.equal(from);
    expect(connection.to).to.equal(to);
    expect(connection.weight).to.equal(weight);
  })
})