const { realpathSync } = require('fs');
const { resolve } = require('path');
const appRoot = realpathSync(process.cwd());

const resolvePath = relativePath => (
  resolve(appRoot, relativePath)
);

module.exports = {
  appBootEntry: resolvePath('./src/app'),
  appBuildEntry: resolvePath('./src/app/inputs'),
  appDocs: resolvePath('./docs'),
  appOutput: resolvePath('./build'),
  appStatic: resolvePath('./static'),
  dotenv: resolvePath('.env'),
};
