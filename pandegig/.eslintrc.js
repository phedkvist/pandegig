module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks'
  ],
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/prop-types": ["error", { "ignore": ["navigation"] }],
    "react-hooks/exhaustive-deps": "warn",
    "linebreak-style": 0,
    "react/jsx-no-bind": ["warn", {
      "ignoreDOMComponents": false,
      "ignoreRefs": false,
      "allowArrowFunctions": false,
      "allowFunctions": false,
      "allowBind": false,
    }]

  },
};
