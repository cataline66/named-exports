import preProcessPattern from '../src/services/preProcessPattern'
import TemporaryStructure from './helpers/temporaryStructure'

describe('includeFolders option', () => {
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

  it('should be false when is not filled', () => {
    const pattern = preProcessPattern({
      ...options
    })

    expect(pattern.includeFolders).toBe(false)
  })

  it('should be false when is filled with false', () => {
    const pattern = preProcessPattern({
      ...options,
      includeFolders: false
    })

    expect(pattern.includeFolders).toBe(false)
  })

  it('should be true is filled with true', () => {
    const pattern = preProcessPattern({
      ...options,
      includeFolders: true
    })

    expect(pattern.includeFolders).toBe(true)
  })
})
