const { realpathSync } = require('fs');
const { resolve } = require('path');
const appRoot = realpathSync(process.cwd());
const resolvePath = relativePath => resolve(appRoot, relativePath);

module.exports = {
  appDocs: resolvePath('./docs'),
  appHome: resolvePath('./src/home.tsx'),
  appHtmlTemplate: resolvePath('./static/build/templates/index.html'),
  appMain: resolvePath('./src/index.ts'),
  appOutput: resolvePath('./build'),
  appSrc: resolvePath('./src'),
  appStatic: resolvePath('./static'),
  dotenv: resolvePath('.env')
};
