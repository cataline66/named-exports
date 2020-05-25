import preProcessPattern from '../src/services/preProcessPattern'
import TemporaryStructure from './helpers/temporaryStructure'

describe('basePath option', () => {
  const temporaryStructure = new TemporaryStructure({ rootDir: '/test' })

  beforeAll(() => {
    temporaryStructure.create()
  })

  afterAll(() => {
    temporaryStructure.destroy()
  })

  it('should throw an error if it is invalid', () => {
    const result = () => {
      preProcessPattern({
        basePath: 'anything',
        paths: []
      })
    }
    expect(result).toThrow(/base path/)
  })

  it('should happen correctly if it is valid', () => {
    const result = () => {
      preProcessPattern({
        basePath: temporaryStructure.basePath,
        paths: []
      })
    }
    expect(result).toBeTruthy()
  })
})
