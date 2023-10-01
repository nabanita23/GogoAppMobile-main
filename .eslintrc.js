module.exports = {
  root: true,
  extends: '@react-native-community',
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  rules: {
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'warn',
  },
};
