const paths = require('./paths');

module.exports = {
  moduleNameMapper: {
    'react-form': paths.appMain
  },
  modulePathIgnorePatterns: [
    '<rootDir>/build'
  ],
  setupFiles: [
    'dotenv/config'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup/fail-on-console.ts'
  ],
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/tests/cases/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],
  verbose: true
};
