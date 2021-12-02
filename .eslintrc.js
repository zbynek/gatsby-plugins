const path = require('path');
module.exports = {
  parser: `@babel/eslint-parser`,
  extends: [
    `google`,
    `eslint:recommended`,
    `plugin:react/recommended`,
  ],
  plugins: [`react`, `filenames`, `@babel`],
  parserOptions: {
    ecmaVersion: 2016,
    sourceType: `module`,
    ecmaFeatures: {
      jsx: true,
    },
    babelOptions: {
      configFile: path.resolve(__dirname, `.babelrc.js`),
    },
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  globals: {
    before: true,
    after: true,
    spyOn: true,
  },
  rules: {
    'max-len': 0,
    "@babel/no-unused-expressions": [
      `error`,
      {
        allowTaggedTemplates: true,
      },
    ],
    "no-unused-expressions": `off`,
    "@babel/no-invalid-this": `error`,
    "no-invalid-this": `off`,
    "arrow-body-style": [
      `error`,
      `as-needed`,
      {requireReturnForObjectLiteral: true},
    ],
    "new-cap": `off`,
    "no-unused-vars": [
      `warn`,
      {
        varsIgnorePattern: `^_`,
        argsIgnorePattern: `^_`,
        ignoreRestSiblings: true,
      },
    ],
    "consistent-return": [`error`],
    "filenames/match-regex": [`error`, `^[a-z-\\d\\.]+$`, true],
    "no-console": `off`,
    "no-inner-declarations": `off`,
    quotes: [`error`, `backtick`],
    "react/display-name": `off`,
    "react/jsx-key": `warn`,
    "react/no-unescaped-entities": `off`,
    "react/prop-types": `off`,
    "require-jsdoc": `off`,
    "valid-jsdoc": `off`,
    "prefer-promise-reject-errors": `warn`,
    "no-prototype-builtins": `warn`,
    "guard-for-in": `warn`,
    "spaced-comment": [
      `error`,
      `always`,
      {markers: [`/`], exceptions: [`*`, `+`]},
    ],
    camelcase: [
      `error`,
      {
        properties: `never`,
        ignoreDestructuring: true,
        allow: [`^unstable_`],
      },
    ],
  },
  overrides: [
    {
      files: [
        `packages/**/gatsby-browser.js`,
        `packages/gatsby/cache-dir/**/*`,
      ],
      env: {
        browser: true,
      },
      globals: {
        ___loader: false,
        ___emitter: false,
      },
    },
    {
      files: [`**/__tests__/**/*`],
      rules: {
        'max-len': 0
      },
    },
  ],
  settings: {
    react: {
      version: `16.9.0`,
    },
  },
}
