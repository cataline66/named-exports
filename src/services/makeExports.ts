import fs from 'fs'
import isDirectory from '../utils/isDirectory'
import { Pattern } from '../types'

export default (pattern: Pattern) => {
  pattern.pathsToExport?.forEach((path) => {
    const exportFile = `${path}/${pattern.output?.filename}`
    const exportLines = pattern.output?.comment ? [pattern.output?.comment] : []

    fs.readdirSync(path).forEach((target) => {
      const data = {
        target: target,
        type: isDirectory(`${path}/${target}`) ? 'folder' : 'file',
        basename: target.split('.')[0],
        extension: target.split('.').pop()
      }

      if (pattern.includeFolders === false && data.type === 'folder') return
      if (pattern.includeFolders && data.type === 'folder') {
        data.target = pattern.indexOfFolders
          ? `${target}/${pattern.indexOfFolders}`
          : data.target
      }
      if (exportFile === `${path}/${data.target}`) return
      if (pattern.ignore?.includes(data.target)) return
      if (pattern.ignore?.includes(data.basename)) return
      if (pattern.ignore?.includes(`.${data.extension}`)) return
      if (pattern.ignore && pattern.ignore.includes(`*.${data.extension}`))
        return

      let line = pattern.output?.singleQuote
        ? `export { default as ${data.basename} } from './${data.target}'`
        : `export { default as ${data.basename} } from "./${data.target}"`

      line = pattern.output?.semi ? `${line};` : line

      exportLines.push(line)
    })

    if (
      (pattern.output?.comment && exportLines.length > 1) ||
      (!pattern.output?.comment && exportLines.length > 0)
    ) {
      if (pattern.output?.finalNewLine) {
        exportLines.push('')
      }
      fs.writeFileSync(exportFile, exportLines.join('\n'), 'utf8')
    } else {
      if (fs.existsSync(exportFile)) {
        fs.unlinkSync(exportFile)
      }
    }
  })
}
