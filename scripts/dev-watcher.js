const webpack = require('webpack');
const configFactory = require('../config/webpack/webpack.config.js');

const config = configFactory('dev-watcher');
const compiler = webpack(config);

compiler.watch(config.watchOptions, (err, stats) => {
  console.log(stats.toString(config.stats));
});
