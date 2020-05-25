import preProcessPattern from '../src/services/preProcessPattern'
import TemporaryStructure from './helpers/temporaryStructure'

describe('ignore option', () => {
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

  it('should contain ".DS_Store" even if it has not been filled', () => {
    const pattern = preProcessPattern({
      ...options
    })

    expect(pattern.ignore).toEqual(['.DS_Store'])
  })

  it('should contain ".DS_Store" even if it has been filled', () => {
    const pattern = preProcessPattern({
      ...options,
      ignore: ['*.css']
    })

    expect(pattern.ignore).toEqual(['*.css', '.DS_Store'])
  })

  it('should remove ".DS_Store" if it has already been passed', () => {
    const pattern = preProcessPattern({
      ...options,
      ignore: ['.DS_Store']
    })

    expect(pattern.ignore).toEqual(['.DS_Store'])
  })
})
