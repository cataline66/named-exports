import preProcessPattern from '../src/services/preProcessPattern'
import TemporaryStructure from './helpers/temporaryStructure'

describe('pathsJoined option', () => {
  const temporaryStructure = new TemporaryStructure({ rootDir: '/test' })

  beforeAll(() => {
    temporaryStructure.create()
  })

  afterAll(() => {
    temporaryStructure.destroy()
  })

  it('should join base path and other paths', () => {
    const pattern = preProcessPattern({
      basePath: `/${temporaryStructure.basePath}/`,
      paths: [`/${temporaryStructure.path}`]
    })

    const expected = [
      `${temporaryStructure.basePath}/${temporaryStructure.path}`
    ]

    const result = pattern.pathsJoined ? pattern.pathsJoined : undefined

    expect(result).toEqual(expected)
  })

  it('should join base path and other paths with depth', () => {
    const pattern = preProcessPattern({
      basePath: `/${temporaryStructure.basePath}/`,
      paths: [`/${temporaryStructure.path}/**`]
    })

    const expected = [
      `${temporaryStructure.basePath}/${temporaryStructure.path}/**`
    ]

    const result = pattern.pathsJoined ? pattern.pathsJoined : undefined

    expect(result).toEqual(expected)
  })

  it(' join even in the absence of the base path', () => {
    const pattern = preProcessPattern({
      paths: [`${temporaryStructure.basePath}/${temporaryStructure.path}/`]
    })

    const expected = [
      `${temporaryStructure.basePath}/${temporaryStructure.path}`
    ]

    const result = pattern.pathsJoined ? pattern.pathsJoined : undefined

    expect(result).toEqual(expected)
  })
})
