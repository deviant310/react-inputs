const {resolve} = require('path');
const paths = require('../paths');

/**
 * @property out can be omitted when using as docusaurus plugin
 * @property treatWarningsAsErrors doesn't work when using as docusaurus plugin
 * */
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
  out: paths.documentationTypeDocOutput,
  readme: 'none',
  sort: [
    'required-first',
  ],
  treatWarningsAsErrors: true,
  plugin: [
    require.resolve('typedoc-plugin-markdown')
  ],
  hideInPageTOC: true,
  hideParameterTypesInTitle: true,
  tsconfig: paths.packageTSConfigDocs,

};
