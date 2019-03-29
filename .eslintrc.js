module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'comma-dangle': ['error', 'never'],
    'arrow-parens': ['error', 'as-needed']
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
