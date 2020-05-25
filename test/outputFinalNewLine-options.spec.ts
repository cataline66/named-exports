import preProcessPattern from '../src/services/preProcessPattern'
import TemporaryStructure from './helpers/temporaryStructure'

describe('output.finalNewLine option', () => {
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

  it('should be true if not filled', () => {
    const pattern = preProcessPattern({
      ...options
    })

    const result =
      pattern.output && typeof pattern.output.finalNewLine !== 'undefined'
        ? pattern.output.finalNewLine
        : undefined

    expect(result).toBe(true)
  })

  it('should be false if filled with false', () => {
    const pattern = preProcessPattern({
      ...options,
      output: {
        finalNewLine: false
      }
    })

    const result =
      pattern.output && typeof pattern.output.finalNewLine !== 'undefined'
        ? pattern.output.finalNewLine
        : true

    expect(result).toBe(false)
  })

  it('should be true if filled with true', () => {
    const pattern = preProcessPattern({
      ...options,
      output: {
        finalNewLine: true
      }
    })

    const result =
      pattern.output && typeof pattern.output.finalNewLine !== 'undefined'
        ? pattern.output.finalNewLine
        : false

    expect(result).toBe(true)
  })
})
