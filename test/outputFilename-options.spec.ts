import preProcessPattern from '../src/services/preProcessPattern'
import TemporaryStructure from './helpers/temporaryStructure'

describe('output.filename option', () => {
  const temporaryStructure = new TemporaryStructure({ rootDir: '/test' })

  beforeAll(() => {
    temporaryStructure.create()
  })

  afterAll(() => {
    temporaryStructure.destroy()
  })

  const options = {
    paths: [`${temporaryStructure.basePath}/${temporaryStructure.path}`]
  }

  it('should throw an error if it has no extension', () => {
    const result = () => {
      preProcessPattern({
        ...options,
        output: {
          filename: 'anything'
        }
      })
    }
    expect(result).toThrow(/filename/)
  })

  it('should throw an error if it doesnt have a .js or .ts extension', () => {
    const result = () => {
      preProcessPattern({
        ...options,
        output: {
          filename: 'anything.css'
        }
      })
    }
    expect(result).toThrow(/filename/)
  })

  it('should happen correctly if has a .js extension', () => {
    const result = () => {
      preProcessPattern({
        ...options,
        output: {
          filename: 'anything.js'
        }
      })
    }
    expect(result).toBeTruthy()
  })

  it('should happen correctly if has a .js extension', () => {
    const result = () => {
      preProcessPattern({
        ...options,
        output: {
          filename: 'anything.ts'
        }
      })
    }
    expect(result).toBeTruthy()
  })
})
