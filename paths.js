const { realpathSync } = require('fs');
const { resolve } = require('path');
const appDirectory = realpathSync(process.cwd());
const resolvePath = relativePath => resolve(appDirectory, relativePath);

module.exports = {
  appBuild: resolvePath(process.env.BUILD_PATH || './build'),
  appDocs: resolvePath('./docs'),
  appHtml: resolvePath('./static/index.html'),
  appIndex: resolvePath('./src/index.tsx'),
  appMain: resolvePath('./src/main.ts'),
  appSrc: resolvePath('./src'),
  appStatic: resolvePath('./static'),
  dotenv: resolvePath('.env')
};
