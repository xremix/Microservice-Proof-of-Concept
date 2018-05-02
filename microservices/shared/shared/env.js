
const logger = require('./logger');

module.exports.get = function(v){
  logger.log("Loading env variable " + v);
  return process.env[v];
};
