require('dotenv').config();

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const configFactory = require('../config/webpack/webpack.config.js');

const config = configFactory('development');
const compiler = webpack(config);
const server = new WebpackDevServer(config.devServer, compiler);

console.log('Starting the development server...');

server.start();
