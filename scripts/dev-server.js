const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const configFactory = require('../config/webpack/webpack.config');

const config = configFactory('dev-server');
const compiler = webpack(config);
const devServerOptions = { ...config.devServer, open: true };
const server = new WebpackDevServer(devServerOptions, compiler);

console.log('Starting the development server...');

server.start();
