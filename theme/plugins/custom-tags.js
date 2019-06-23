exports.defineTags = function(dictionary) {
  dictionary.defineTag('alpha', {
      mustHaveValue: false,
      mustNotHaveDescription: false,
      canHaveType: true,
      canHaveName: true,
      onTagged: function(doclet, tag) {
        doclet.alpha = true;
      }
  });
  
  dictionary.defineTag('beta', {
      mustHaveValue: false,
      mustNotHaveDescription: false,
      canHaveType: true,
      canHaveName: true,
      onTagged: function(doclet, tag) {
        doclet.beta = true;
      }
  });
};
