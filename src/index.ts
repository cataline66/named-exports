import validateOptions from 'schema-utils'
import chokidar from 'chokidar'
import schema from './options.json'

import preProcessPattern from './services/preProcessPattern'
import makeExports from './services/makeExports'

import { Pattern } from './types'
import { Compiler } from 'webpack'

class NamedExports {
  patterns: Pattern[]

  constructor(options: { patterns: Pattern[] }) {
    validateOptions(schema, options, {
      name: 'Named Exports',
      baseDataPath: 'options'
    })

    this.patterns = options.patterns || []
  }

  apply(compiler: Compiler) {
    compiler.hooks.entryOption.tap('MakeNamedExports', () => {
      this.patterns.forEach((pattern: Pattern) => {
        const preProcessed = preProcessPattern(pattern)

        makeExports(preProcessed)

        const watcher = chokidar.watch(preProcessed.pathsToWatch || [], {
          ignoreInitial: true
        })

        watcher.on('all', (event, path) => {
          const generatedFiles = preProcessed.pathsToWatch?.map((target) => {
            return `${target}/${preProcessed.output?.filename}`
          })

          if (event === 'add' && generatedFiles?.includes(path)) return
          if (!['add', 'unlink'].includes(event)) return

          const changes = preProcessPattern(pattern)
          makeExports(changes)
        })
      })
    })
  }
}

export default NamedExports
