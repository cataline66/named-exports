import preProcessPattern from '../src/services/preProcessPattern'
import TemporaryStructure from './helpers/temporaryStructure'

describe('output.comment option', () => {
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
      pattern.output && typeof pattern.output.comment !== 'undefined'
        ? pattern.output.comment
        : true

    expect(result).toBe(false)
  })

  it('should be false if filled with false', () => {
    const pattern = preProcessPattern({
      ...options,
      output: {
        comment: false
      }
    })

    const result =
      pattern.output && typeof pattern.output.comment !== 'undefined'
        ? pattern.output.comment
        : true

    expect(result).toBe(false)
  })

  it('should generate a default comment if filled in with true', () => {
    const pattern = preProcessPattern({
      ...options,
      output: {
        comment: true
      }
    })

    const result =
      pattern.output && typeof pattern.output.comment !== 'undefined'
        ? pattern.output.comment
        : null

    expect(result).toMatch(/generated/)
  })

  it('should transform into a comment if filled with string', () => {
    const pattern = preProcessPattern({
      ...options,
      output: {
        comment: 'anything'
      }
    })

    const result =
      pattern.output && typeof pattern.output.comment !== 'undefined'
        ? pattern.output.comment
        : null

    expect(result).toBe('// anything')
  })
})
