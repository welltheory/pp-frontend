module.exports = {
  root: true,
  rules: {
    'no-console': 0,
    'no-underscore-dangle': 0,
    'no-use-before-define': ['error', { variables: false }],
    'no-multi-str': 0,
    'no-unused-vars': 0,
    camelcase: 0,
    'max-len': 0,
    'prefer-arrow-callback': 0,
    'object-curly-newline': 0,
    'no-param-reassign': 0,
    'no-await-in-loop': 0,
    'arrow-parens': 0,
    'arrow-body-style': 0,
    'import/order': 0,
    'no-multiple-empty-lines': 0,
    'no-restricted-syntax': 0,
  },
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
  },
  extends: [
    'airbnb-base',
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['$root', '.'],
          ['$config', './config'],
          ['$utils', './utils'],
          ['$services', './services'],
          ['$errors', './errors'],
        ],
        extensions: ['.js'],
      },
    },
  },
};
