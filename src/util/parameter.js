module.exports = {
  is: {
    required: (parameter) => {
      throw new ReferenceError(`Parameter "${parameter}" is required; parameter "${parameter}" is missing.`);
    },
  },
};
