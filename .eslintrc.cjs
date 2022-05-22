module.exports = {
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  env: {
    node: true,
  },
  settings: {
    'import/resolver': {
      node: {},
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
  ignorePatterns: ['!.build', '!.eslintrc.json', '!.prettierrc'],
  parser: '@typescript-eslint/parser',
  extends: [
    'standard',
    'prettier',
    'plugin:json/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        'no-undef': 'off',
        'no-redeclare': 'off',
        'no-unused-expressions': 'off',
      },
    },
  ],
  plugins: ['@typescript-eslint', 'prettier', 'unused-imports'],
  rules: {
    semi: 0,
    '@typescript-eslint/no-redeclare': ['error'],
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        args: 'none',
        ignoreRestSiblings: true,
        vars: 'all',
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^ignored',
      },
    ],
    quotes: [2, 'single', { avoidEscape: true }],
    'max-len': ['error', { code: 240 }],
    camelcase: 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'none',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^excluded|^_',
      },
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
      },
    ],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        warnOnUnassignedImports: true,
      },
    ],
    'import/no-named-as-default': 'error',
  },
};
