module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['standard-with-typescript', 'plugin:prettier/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {}
}
