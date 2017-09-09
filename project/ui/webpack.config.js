const path = require('path');

const dev_config = {
  DIST_DIR: './build',
  SOURCE_DIR: path.resolve(__dirname + '/src'),
  PROJECT_DIR: __dirname
};

function buildConfig(env) {
  env = env || 'dev';
  var config = dev_config;
  return require('./config/' + env + '.js')(env, config);
}

module.exports = buildConfig;
