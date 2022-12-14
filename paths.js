const { realpathSync } = require('fs');
const { resolve } = require('path');
const appRoot = realpathSync(process.cwd());
const resolvePath = relativePath => resolve(appRoot, relativePath);

module.exports = {
  appDocs: resolvePath('./docs'),
  appHtmlTemplate: resolvePath('./static/build/templates/index.html'),
  appIndex: resolvePath('./src/index.tsx'),
  appMain: resolvePath('./src/main.ts'),
  appOutput: resolvePath('./build'),
  appSrc: resolvePath('./src'),
  appStatic: resolvePath('./static'),
  dotenv: resolvePath('.env')
};
