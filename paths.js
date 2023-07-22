const { realpathSync } = require('fs');
const { resolve } = require('path');
const appRoot = realpathSync(process.cwd());
const resolvePath = relativePath => resolve(appRoot, relativePath);

module.exports = {
  appBootEntry: resolvePath('./src/bootstrap/app.tsx'),
  appDocs: resolvePath('./docs'),
  appOutput: resolvePath('./build'),
  appSrc: resolvePath('./src'),
  appStatic: resolvePath('./static'),
  dotenv: resolvePath('.env'),
};
