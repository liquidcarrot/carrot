const _ = require("lodash");
const { expect } = require("chai");
const { Neat } = require("../src/carrot");

const has = {
  options: (object, options) => {
    _.each(_.omit(options, ["selectMutationMethod", "cost", "fitness"]), (option, key) => {
      expect(_.isEqual(options[key], object[key])).to.be.true;
      expect(object[key]).to.equal(options[key]);
      expect(object[key]).to.eql(options[key]);
    })
  },
  dataset: (object, dataset) => {
    expect(object.dataset).to.equal(dataset);
    expect(object.dataset).to.eql(dataset);
    
    _.each(object.dataset, (datum, index) => {
      expect(datum).to.equal(dataset[index]);
      expect(datum).to.eql(dataset[index]);
    })
  },
  dimensions: (object, inputs, outputs) => {
    expect(object.inputs).to.equal(inputs);
    expect(object.outputs).to.equal(outputs);
  }
}

module.exports = has;