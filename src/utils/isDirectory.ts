import fs from 'fs'

export default (path: string) =>
  fs.existsSync(path) && fs.lstatSync(path).isDirectory()
