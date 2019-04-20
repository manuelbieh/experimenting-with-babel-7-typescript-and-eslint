module.exports = {
  parser: 'babel-eslint',
  // parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  // globals: {
  //   Pick: true,
  //   ReturnType: true,
  //   Record: true,
  //   // ...,
  // },
  env: {
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'prettier/react',
    'plugin:react/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['babel', 'react', 'prettier'],
  // plugins: ['babel', 'react', 'prettier', '@typescript-eslint/eslint-plugin'],
  rules: {
    eqeqeq: 2,
    indent: [2, 2],
    'no-console': 0,
    'react/jsx-indent': [2, 2],
    'react/no-unused-prop-types': 2,
  },
};
