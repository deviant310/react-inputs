import webpack from 'webpack';
import configFactory from '../config/webpack/webpack.config.js';

const config = configFactory('production-build');
const compiler = webpack(config);

compiler.run((err, stats) => {
  if (err) throw err;

  console.log(stats.toString(config.stats));
});
