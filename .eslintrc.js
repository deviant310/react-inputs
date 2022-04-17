module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'rules': {
    'no-debugger':
      process.env.NODE_ENV === 'development'
        ? 'off'
        : 'error',
    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        'allowTemplateLiterals': true
      }
    ],
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
    'semi': [2, 'always', { 'omitLastInOneLineBlock': true }],
    'no-undef': 'off',
    'no-use-before-define': 'off',
    'spaced-comment': 'off',
    'curly': ['error', 'multi', 'consistent'],
    'object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/semi': [2, 'always', {
      'omitLastInOneLineBlock': true
    }],
    'max-len': 'off',
    '@typescript-eslint/member-delimiter-style': ['error', {
      'multiline': {
        'delimiter': 'semi',
        'requireLast': true
      },
      'singleline': {
        'delimiter': 'semi',
        'requireLast': false
      }
    }],
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/type-annotation-spacing': ['error', {
      'before': false,
      'after': true,
      'overrides': {
        'arrow': {
          'before': true,
          'after': true
        }
      }
    }],
    '@typescript-eslint/space-before-function-paren': ['error', 'always']
  }
};
