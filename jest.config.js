/** @type {import('ts-jest').JestConfigWithTsJest} */
const { resolve } = require('path');
const paths = require('../paths');

module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    'jsx',
    'node',
    'ts',
    'tsx',
  ],
  moduleNameMapper: {
    'react-inputs': resolve(paths.appSrc, './app/inputs/index.ts'),
  },
  modulePathIgnorePatterns: [
    '<rootDir>/build',
  ],
  preset: 'ts-jest',
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup.ts',
  ],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: [
    '<rootDir>/tests/cases/**/index.ts?(x)',
  ],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true,
    }],
  },
  verbose: true,
};
