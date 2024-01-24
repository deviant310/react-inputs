const paths = require('./paths');
const { name: appName } = require('./package.json');

module.exports = {
  customCss: './static/docs/styles.css',
  disableSources: true,
  entryPoints: [paths.appMain],
  hideGenerator: true,
  includeVersion: true,
  includes: ['./static/docs'],
  name: appName,
  readme: 'none',
  sort: [
    'required-first',
    'source-order',
  ],
  theme: 'gitlab-wiki',
  titleLink: '/react-form/docs',
  treatWarningsAsErrors: true,
};
