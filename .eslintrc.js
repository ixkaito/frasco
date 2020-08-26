module.exports = {
  'parser': '@typescript-eslint/parser',
  'plugins': [
    '@typescript-eslint',
  ],
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'google',
  ],
  'env': {
    // For more environments, see here: http://eslint.org/docs/user-guide/configuring.html#specifying-environments
    'browser': true,
    'es6': true,
  },
  'rules': {
    // Insert custom rules here
    // For more rules, see here: http://eslint.org/docs/rules/
    'no-var': 'warn',
    'require-jsdoc': 'off',
  },
  'parserOptions': {
    'sourceType': 'module',
  }
}
