const { assert, expect } = require('chai');
const should = require('chai').should();
const chalk = require('chalk');

const { Node, methods } = require('../../../src/carrot');

describe("Node", function() {
  it("new Node()", function() {
    let node = new Node();
    
    //======================================
    // v0.1.x ==============================
    //======================================
    
    // Properties
    node.should.be.an.instanceof(Node);
    node.should.have.property("bias"); node.bias.should.be.a("number");
    node.should.have.property("squash"); node.squash.should.be.a("function");
    node.should.have.property("type"); node.type.should.be.a("string");
    node.should.have.property("activation"); node.activation.should.be.a("number");
    node.should.have.property("state"); node.state.should.be.a("number");
    node.should.have.property("old"); node.old.should.be.a("number");
    node.should.have.property("mask"); node.mask.should.be.a("number");
    node.should.have.property("previousDeltaBias"); node.previousDeltaBias.should.be.a("number"); // Could change to `bias.previous`
    node.should.have.property("totalDeltaBias"); node.totalDeltaBias.should.be.a("number");  // Could change to `bias.total`
    node.should.have.property("error").be.an("object");
    node.error.responsibility.should.be.a("number");
    node.error.projected.should.be.a("number");
    node.error.gated.should.be.a("number");
    
    // Instance Functions
    node.should.have.property("activate"); node.activate.should.be.a("function");
    node.should.have.property("propagate");  node.propagate.should.be.a("function");
    // node.should.have.property("evolve");  node.evolve.should.be.a("function"); // Not implemented
    node.should.have.property("connect");  node.connect.should.be.a("function");
    node.should.have.property("disconnect");  node.disconnect.should.be.a("function");
    node.should.have.property("gate");  node.gate.should.be.a("function");
    node.should.have.property("ungate");  node.ungate.should.be.a("function");
    node.should.have.property("to_JSON");  node.to_JSON.should.be.a("function");
    node.should.have.property("clear");  node.clear.should.be.a("function");
    // node.should.have.property("reset");  node.reset.should.be.a("function"); // Not implemented
    
    //======================================
    // v0.2.x ==============================
    //======================================
    /*
    // Properties
    node.should.have.property("deltabias").be.an("object").with.property("previous").be.a("number");
    node.should.have.property("deltabias").be.an("object").with.property("total").be.a("number");
    node.should.have.property("type").equal("input")
    
    // Instance Functions
    node.should.have.property("is").be.an("object");
    node.is.input.should.be.a("function");
    node.is.output.should.be.a("function");
    node.is.hidden.should.be.a("function");
    node.is.connectedto.should.be.a("function");
    node.is.selfconnectedto.should.be.a("function");
    node.is.selfconnected.should.be.a("function");
    node.is.projectingto.should.be.a("function");
    node.is.projectedtoby.should.be.a("function");
    */
  })
  
  it("[type='input'] Node.prototype.activate()" + chalk.italic(" - 1 neuron"), function() {
    let node = new Node("input");
    
    node.activate().should.equal(0);
  })
  it("[type='input'] Node.prototype.activate(number)"  + chalk.italic(" - 1 neuron"), function() {
    let node = new Node("input");
    
    const number = Math.random();
    
    node.activate(number).should.equal(number);
  })
  it("[type='hidden'] Node.prototype.activate()" + chalk.italic(" - 3 neurons"), function() {
    const number = Math.random();
    
    let input = new Node("input");
    let node = new Node();
    let output = new Node("output");
    
    input.connect(node);
    node.connect(output);
    
    input.activate(number);
    
    //======================================
    // v0.1.x ==============================
    //======================================
    node.activate().should.be.a("number").and.be.at.least(-1).and.be.at.most(1).and.not.equal(number);
  })
  it("[type='hidden'] Node.prototype.activate(number)" + chalk.italic(" - 3 neurons"), function() {
    const number = Math.random();
    
    let input = new Node("input");
    let node = new Node();
    let output = new Node("output");
    
    input.connect(node);
    node.connect(output);
    
    input.activate(number);
    
    //======================================
    // v0.1.x ==============================
    //======================================
    node.activate(Math.random()).should.be.a("number").and.be.at.least(-1).and.be.at.most(1).and.not.equal(number);
  })
  it("[type='output'] Node.prototype.activate()" + chalk.italic(" - 3 neurons"), function() {
    const number = Math.random();
    
    let input = new Node("input");
    let hidden = new Node();
    let node = new Node("output");
    
    input.connect(hidden);
    hidden.connect(node);
    
    input.activate(number);
    hidden.activate();
    
    //======================================
    // v0.1.x ==============================
    //======================================
    node.activate().should.be.a("number").and.be.at.least(-1).and.be.at.most(1).and.not.equal(number);
  })
  it("[type='output'] Node.prototype.activate(number)" + chalk.italic(" - 3 neurons"), function() {
    const number = Math.random();
    
    let input = new Node("input");
    let hidden = new Node();
    let node = new Node("output");
    
    input.connect(hidden);
    hidden.connect(node);
    
    input.activate(number);
    hidden.activate();
    
    //======================================
    // v0.1.x ==============================
    //======================================
    node.activate(Math.random()).should.be.a("number").and.be.at.least(-1).and.be.at.most(1).and.not.equal(number);
  })
  
  it("[type='output'] Node.prototype.propagate()"  + chalk.italic(" - 1 neuron"))
  it("[type='output'] Node.prototype.propagate(number)"  + chalk.italic(" - 1 neuron"))
  it("[type='hidden'] Node.prototype.propagate()"  + chalk.italic(" - 3 neuron"))
  it("[type='hidden'] Node.prototype.propagate(number)"  + chalk.italic(" - 3 neuron"))
  it("[type='input'] Node.prototype.propagate()"  + chalk.italic(" - 3 neuron"))
  it("[type='input'] Node.prototype.propagate(number)"  + chalk.italic(" - 3 neuron"))
  
  
})


/**

/**
 *
 * There are 5 questions every unit test must answer.
 *
 * What is the unit under test (module, function, class, whatever)?
 * What should it do? (Prose description)
 * What was the actual output?
 * What was the expected output?
 * How do you reproduce the failure?
 *
 */
 