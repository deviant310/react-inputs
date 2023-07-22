const { resolve } = require('path');
const paths = require('./paths');

module.exports = {
  moduleNameMapper: {
    'react-fields': resolve(paths.appSrc, './modules/index.ts')
  },
  modulePathIgnorePatterns: [
    '<rootDir>/build'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup.ts'
  ],
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/tests/cases/**/index.ts?(x)',
  ],
  verbose: true
};
