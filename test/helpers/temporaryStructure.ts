import fs from 'fs'
import { uuid } from 'uuidv4'
import normalizePath from '../../src/utils/normalizePath'

interface options {
  rootDir: string
}

interface structure {
  basePath: string
  path: {
    name: string
    innerFolder: string
    innerFile: string
  }
}

const removeDirectory = (path: string) => {
  if (fs.existsSync(path)) {
    const files = fs.readdirSync(path)

    if (files.length > 0) {
      files.forEach(filename => {
        if (fs.statSync(path + '/' + filename).isDirectory()) {
          removeDirectory(path + '/' + filename)
        } else {
          fs.unlinkSync(path + '/' + filename)
        }
      })
      fs.rmdirSync(path)
    } else {
      fs.rmdirSync(path)
    }
  }
}

class TemporaryStructure {
  structure: structure

  constructor({ rootDir }: options) {
    this.structure = {
      basePath: `${normalizePath(rootDir)}/${normalizePath(uuid().toString())}`,
      path: {
        name: 'components',
        innerFolder: 'ButtonStyled',
        innerFile: 'TextField.vue'
      }
    }
  }

  get basePath() {
    return this.structure.basePath
  }

  get path() {
    return this.structure.path.name
  }

  create() {
    fs.mkdirSync(this.structure.basePath)
    fs.mkdirSync(`${this.structure.basePath}/${this.structure.path.name}`)
    fs.mkdirSync(
      `${this.structure.basePath}/${this.structure.path.name}/${this.structure.path.innerFolder}`
    )
    fs.writeFileSync(
      `${this.structure.basePath}/${this.structure.path.name}/${this.structure.path.innerFile}`,
      ''
    )
  }

  destroy() {
    removeDirectory(this.structure.basePath)
  }
}

export default TemporaryStructure
