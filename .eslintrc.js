module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  env: {
    browser: true,
    node: true,
  },
  rules: {
    indent: ['error', 2],
    semi: ['error', 'never'],
    'comma-dangle': ['off'],
    'arrow-parens': ['off'],
    'import/no-extraneous-dependencies': ['off'],
    'import/no-unresolved': ['off'],
    'import/prefer-default-export': ['off'],
    'global-require': ['off'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'jsx-quotes': ['error', 'prefer-single'],
    'jsx-a11y/click-events-have-key-events': ['off'],
    'jsx-a11y/no-noninteractive-element-interactions': ['off'],
  },
}
