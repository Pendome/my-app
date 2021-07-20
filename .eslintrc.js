module.exports = {
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:vue/essential', 'airbnb-base', 'plugin:prettier/recommended'],
  // extends: ['plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['vue'],
  rules: {
    'no-console': 'off',
    'consistent-return': 'off',
    'no-restricted-syntax': 'off',
    'vue/comment-directive': 'off',
    'import/no-unresolved': [
      2,
      {
        ignore: ['^@'] // @ 是设置的路径别名
      }
    ],
    'no-param-reassign': ['error', { props: false }],
    'import/extensions': [2, 'never', { 'web.js': 'never', json: 'never' }],
    'import/no-extraneous-dependencies': [2, { devDependencies: true }]
  },
  settings: {
    'import/resolver': {
      typescript: {}
    }
  }
}
