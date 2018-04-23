var _ = require('lodash');

var templates = [
  {
    id: 1,
    name: "First"
  },{
    id: 2,
    name: "Second"
  },{
    id: 3,
    name: "Third"
  }
];

var templateById = function(q) {
  var items = _.filter(templates, {'id':parseInt(q)});
  return items[0];
};
module.exports.templates = templates;
module.exports.templateById = templateById;
