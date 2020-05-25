# named-exports

Generates named exports in real time from one or more directories.

## Getting Started

To begin, you'll need to install `named-exports`:

```console
$ npm install named-exports --save-dev
```
Se você quer exportar arquivos dentro da pasta de componentes

```
├── src
│   └── components
│       ├── ButtonStyled.vue
│       ├── InputStyled.vue
│       └── ...
...
```

Then add the plugin to your `webpack` config. For example:

**webpack.config.js**

```js
const NamedExports = require('named-exports')

module.exports = {
  plugins: [
    new NamedExports({
      patterns: [
        {
          paths: ['src/components']
        }
      ]
    })
  ]
}
```

Result:

```txt
src/components/index.js
```

```js
export { default as ButtonStyled } from './ButtonStyled.vue'
export { default as InputStyled } from './InputStyled.vue'
// ..
```


## Options

```js
const NamedExports = require('named-exports')

module.exports = {
  plugins: [
    new NamedExports({
      patterns: [
        {
          basePath: 'src',
          paths: ['components/**/', 'store/**', 'utils'],
          includeFolders: true,
          indexOfFolders: 'index.vue',
          ignore: ['*.css'],
          output: {
            filename: 'index.ts',
            comment: true,
            semi: true,
            singleQuote: true,
            finalNewLine: false
          }
        }
      ]
    })
  ]
}
```

### Pattern

|         Name          |        Type        |     Default     | Description                                                                                           |
| :-------------------: | :----------------: | :-------------: | :---------------------------------------------------------------------------------------------------- |
|      `basePath`       |     `{String}`     |   `undefined`   | Base for all paths, the goal is to avoid repetition.                                                  |
|        `paths`        |     `{Array}`      |   `undefined`   | All target paths that need an export file.                                                            |
|   `includeFolders`    |    `{Boolean}`     |     `false`     | Determines whether to include folders in exports.                                                     |
|   `indexOfFolders`    |     `{String}`     |   `undefined`   | sometimes index.js is not an index of a folder we want to export, so use this property to define.     |
|       `ignore`        |     `{Array}`      | `['.DS_Store']` | Files or folders to be ignored.                                                                       |
|   `output.filename`   |     `{String}`     |   `index.js`    | Name of the export file that will be generated in each defined path.                                  |
|   `output.comment`    |`{Boolean\|String}` |     `false`     | Comment to make it explicit that the file was automatically generated by a plugin.                    |
|     `output.semi`     |    `{Boolean}`     |     `false`     | Put semicolons at the end of each export.                                                             |
| `output.singleQuote`  |    `{Boolean}`     |     `true`      | Use single quotes in the export code                                                                  |
| `output.finalNewLine` |    `{Boolean}`     |     `true`      | Insert a blank line at the end of the export file, just to maintain the beauty standard of your app.  |

> ℹ️ If you need exports with different settings in another folder, you can add as many patterns as you want.


> ℹ️ `named-exports` is not designed to exports files generated from the build process; rather, it is to exports files that already exist in the source tree, as part of the build process.

## Documentation

Read the [documentation and demos.](https://named-exports.cataline.io)

## License

[MIT](./LICENSE)
