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
  appTest: resolvePath('./src/test.tsx'),
  appMain: resolvePath('./src/components/form.tsx'),
  appTypes: resolvePath('./src/types'),
  appBuild: resolvePath(process.env.BUILD_PATH || './build'),
  appPublic: resolvePath('./public'),
  appHtml: resolvePath('./public/index.html')
};
