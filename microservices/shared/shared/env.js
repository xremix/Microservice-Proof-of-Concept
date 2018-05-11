/** returns a property from the environment variables */
module.exports.get = function(v){
  return process.env[v];
};
