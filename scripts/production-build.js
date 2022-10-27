require('dotenv').config();

const webpack = require('webpack');
const configFactory = require('../webpack.config.js');

const config = configFactory('production');
const compiler = webpack(config);

compiler.run((err, stats) => {
  if (err) throw err;

  console.log(stats.toString(config.stats));
});
