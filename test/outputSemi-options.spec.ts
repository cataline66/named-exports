import preProcessPattern from '../src/services/preProcessPattern'
import TemporaryStructure from './helpers/temporaryStructure'

describe('output.semi option', () => {
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

  it('should be false if not filled', () => {
    const pattern = preProcessPattern({
      ...options
    })

    const result =
      pattern.output && typeof pattern.output.semi !== 'undefined'
        ? pattern.output.semi
        : true

    expect(result).toBe(false)
  })

  it('should be false if filled with false', () => {
    const pattern = preProcessPattern({
      ...options,
      output: {
        semi: false
      }
    })

    const result =
      pattern.output && typeof pattern.output.semi !== 'undefined'
        ? pattern.output.semi
        : true

    expect(result).toBe(false)
  })

  it('should be true if filled with true', () => {
    const pattern = preProcessPattern({
      ...options,
      output: {
        semi: true
      }
    })

    const result =
      pattern.output && typeof pattern.output.semi !== 'undefined'
        ? pattern.output.semi
        : false

    expect(result).toBe(true)
  })
})
