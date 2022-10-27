const { realpathSync } = require('fs');
const { resolve } = require('path');

const appDirectory = realpathSync(process.cwd());
const resolvePath = relativePath => resolve(appDirectory, relativePath);

module.exports = {
  appPath: resolvePath('.'),
  appPackageJson: resolvePath('package.json'),
  dotenv: resolvePath('.env'),
  appSrc: resolvePath('./src'),
  appIndex: resolvePath('./src/index.tsx'),
  appMain: resolvePath('./src/main.ts'),
  appTypes: resolvePath('./src/types'),
  appBuild: resolvePath(process.env.BUILD_PATH || './build'),
  appStatic: resolvePath('./static'),
  appHtml: resolvePath('./static/index.html'),
  appDocs: resolvePath('./docs')
};
