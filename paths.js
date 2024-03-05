const { resolve } = require('path');

const resolvePath = relativePath => (
  resolve(__dirname, relativePath)
);

module.exports = {
  package: resolvePath('./package'),
  packageSource: resolvePath('./package/src'),
  packageDemoEntrypoint: resolvePath('./package/src/app'),
  packageEntrypoint: resolvePath('./package/src/app/inputs'),
  packageTSConfigDocs: resolvePath('./package/tsconfig.build.json'),
  packageOutput: resolvePath('./package/dist'),
  packageStatic: resolvePath('./package/static'),
  documentationOutput: resolvePath('./documentation/docs'),
  documentationExamples: resolvePath('./documentation/examples'),
};
