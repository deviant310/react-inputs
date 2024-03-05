const {resolve} = require('path');
const paths = require('../paths');

module.exports = {
  disableSources: true,
  entryPoints: [
    resolve(paths.packageEntrypoint, 'select-input'),
    resolve(paths.packageEntrypoint, 'masked-input')
  ],
  categoryOrder: ["Main component", "Hooks", "*"],
  hideGenerator: true,
  includeVersion: true,
  excludeExternals: true,
  name: 'React inputs',
  out: paths.documentationOutput,
  readme: 'none',
  sort: [
    'required-first',
  ],
  treatWarningsAsErrors: true,
  plugin: [
    require.resolve('typedoc-plugin-markdown')
  ],
  tsconfig: paths.packageTSConfigDocs,
};
