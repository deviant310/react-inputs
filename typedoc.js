const paths = require('./paths');
const { name: appName } = require('./package.json');

module.exports = {
  customCss: './static/docs/styles.css',
  disableSources: true,
  entryPoints: [paths.appBuildEntry],
  hideGenerator: true,
  includeVersion: true,
  includes: ['./static/docs'],
  name: appName,
  navigationLinks: {
    'Example': 'http://example.com',
  },
  out: paths.appDocs,
  readme: 'none',
  sidebarLinks: {
    'Example': 'http://example.com',
  },
  sort: [
    'required-first',
    'source-order',
  ],
  titleLink: '/react-form/docs',
  treatWarningsAsErrors: true,
};
