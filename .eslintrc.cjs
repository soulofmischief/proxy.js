module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:promise/recommended'
  ],

  env: {
    es6: true,
    node: true,
  },

  parserOptions: {
    ecmaVersion: 2022,
    requireConfigFile: false,
    sourceType: 'module'
  },

  plugins: [ 'promise' ],

  rules: {
    'func-names': 0,

    indent: [
      2,
      2,
      {
        SwitchCase: 1,
        ignoredNodes: [ 'ConditionalExpression', 'TemplateLiteral' ]
      }
    ],

    'linebreak-style': [ 2, 'unix' ],

    'max-len': [
      1,
      {
        code: 79,
        comments: 79,
        ignoreUrls: true
      }
    ],

    'max-statements': [ 1, 40 ],
    'no-console': [ 1, { allow: [ 'error' ]}],
    'no-sequences': 2,
    'no-trailing-spaces': 0,
    'no-use-before-define': [ 0, { functions: false, classes: false }],

    quotes: [
      2,
      'single',
      { avoidEscape: true, allowTemplateLiterals: true }
    ],

    semi: [ 2, 'never' ],

    'space-in-parens': [
      1,
      'always',
      { exceptions: [ '{}', '()', '[]', 'empty' ]}
    ],
  },

  settings: {
    'import/ignore': [
      'node_modules'
    ]
  }
}
