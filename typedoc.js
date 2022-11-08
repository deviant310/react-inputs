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
  out: '../d',
  readme: 'none',
  sort: [
    'required-first',
    'source-order'
  ],
  titleLink: '/react-form/docs'
};
