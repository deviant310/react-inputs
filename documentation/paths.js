const { realpathSync } = require('fs');
const { resolve } = require('path');
const appRoot = realpathSync(process.cwd());

const resolvePath = relativePath => (
  resolve(appRoot, relativePath)
);

module.exports = {
  appDocs: resolvePath('./docs'),
};
