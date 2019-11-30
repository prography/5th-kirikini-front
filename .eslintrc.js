module.exports = {
  root: true,
  extends: ['airbnb'],
  plugins: ['prettier', 'react'],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    es6: true,
    browser: true,
    node: true
  },
  rules: {
    'prettier/prettier': [
      'error',
      { singleQuote: true },
      {
        usePrettierrc: false
      }
    ],
    'react/prefer-stateless-function': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-one-expression-per-line': 0,
    quotes: ['single'],
    semi: ['always']
  }
};
