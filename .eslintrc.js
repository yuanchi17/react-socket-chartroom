module.exports = {
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        'plugin:react-hooks/recommended'
    ],
    parser: "@babel/eslint-parser",
    parserOptions: {
      "ecmaVersion": "latest",
      "sourceType": "module",
      "requireConfigFile": false,
      "babelOptions": {
        "presets": ["@babel/preset-react"]
      },
    },
    settings: {
      react: {
        version: 'detect', // React version. "detect" automatically picks the version you have installed.
      },
    },
    plugins: [
        "react", 'react-refresh', 'react-hooks'
    ],
    rules: {
      'react-refresh/only-export-components': 'warn',
      'react-hooks/rules-of-hooks': 'warn', // 檢查 Hook 的規則
      'react-hooks/exhaustive-deps': 'off', // 檢查 effect 的相依性
      'no-unused-vars': 'off',
      // note you must disable the base rule as it can report incorrect errors
      'no-use-before-define': 'off',
      // '@typescript-eslint/no-use-before-define': 'off',
      'react/self-closing-comp': ['error', { component: true, html: true }],
      'react/display-name': 'off',
    },

}
