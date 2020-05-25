import preProcessPattern from '../src/services/preProcessPattern'
import TemporaryStructure from './helpers/temporaryStructure'

describe('paths option', () => {
  const temporaryStructure = new TemporaryStructure({ rootDir: '/test' })

  beforeAll(() => {
    temporaryStructure.create()
  })

  afterAll(() => {
    temporaryStructure.destroy()
  })

  it('should throw an error if is empty', () => {
    const preProcessing = () => {
      preProcessPattern({
        paths: []
      })
    }
    expect(preProcessing).toThrow(/paths/)
  })

  it('should throw an error if some is invalid', () => {
    const result = () => {
      preProcessPattern({
        paths: [
          `${temporaryStructure.basePath}/${temporaryStructure.path}`,
          'anything'
        ]
      })
    }
    expect(result).toThrow(/paths/)
  })

  it('should happen perfectly if all are correct', () => {
    const result = () => {
      preProcessPattern({
        paths: [`${temporaryStructure.basePath}/${temporaryStructure.path}`]
      })
    }
    expect(result).toBeTruthy()
  })
})
