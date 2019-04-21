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
  // You can get rid of the no-undef errors for types and interfaces by using the
  // following overrides. tsc still fails at non-standard syntax but we can at least
  // hide all the false positives in ESLint for types and interfaces:
  // overrides: [
  //   {
  //     files: ['*.ts', '*.tsx'],
  //     rules: {
  //       'no-undef': 0,
  //     },
  //   },
  // ],
};
