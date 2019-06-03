let _ = require('lodash')
let { assert, expect } = require('chai')
let should = require('chai').should()
let {
  Network,
  Neat,
  methods,
  config,
  architect
} = require('../../src/carrot')


let mutation = methods.mutation;

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