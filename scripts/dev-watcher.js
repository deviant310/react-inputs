require('dotenv').config();

const webpack = require('webpack');
const configFactory = require('../config/webpack/webpack.config.js');

const config = configFactory('development');
const compiler = webpack(config);

compiler.watch(config.watchOptions, (err, stats) => {
  if (err) throw err;

  console.log(stats.toString(config.stats));
});
