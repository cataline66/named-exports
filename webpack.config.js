const { resolve } = require('path')
const NamedExports = require('./dist/index.js').default

module.exports = {
  entry: resolve(__dirname, 'temp/index.js'),
  output: {
    path: resolve(__dirname, 'temp'),
    filename: 'bundle.js'
  },
  plugins: [
    new NamedExports({
      patterns: [
        {
          basePath: 'demo',
          paths: ['components/**/', 'utils'],
          includeFolders: true,
          ignore: ['*.css'],
          output: {
            comment: false,
            semi: false,
            singleQuote: true,
            finalNewLine: true
          }
        }
      ]
    })
  ]
}
