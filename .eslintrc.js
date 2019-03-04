module.exports = {
    extends: 'airbnb',
    parser: 'babel-eslint',
    env: {
      es6: true,
      browser: true,
    },
    rules: {
        'brace-style': ['error', '1tbs'],
        curly: ['error', 'all'],
        semi: ['error', 'never'],
        'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
        'no-console': 'error'
      },
};