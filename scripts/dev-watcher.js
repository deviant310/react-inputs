const webpack = require('webpack');
const configFactory = require('../config/webpack/webpack.config');

const config = configFactory('dev-watcher');
const compiler = webpack(config);

compiler.watch({}, (err, stats) => {
  if (err) return;

  console.log(stats.toString(config.stats));
});
