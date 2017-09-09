const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = function (env, config) {
  const common = require('./common')(config);
  console.log('\x1b[36m%s\x1b[0m', 'Building for development ...');
  return {
    entry: common.entry,
    output: common.output,
    module: {
      loaders: common.loaders
    },
    resolve: common.resolve,
    devtool: 'source-map',
    devServer: {
      inline: false,
      contentBase: config.PROJECT_DIR + '/src',
      port: 4200,
      quiet: false,
      noInfo: false,
      stats: { colors: true }
    },
    watchOptions: {
      poll: true
    },
    plugins: [
      new LiveReloadPlugin()
    ]
  }
}
