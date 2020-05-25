import preProcessPattern from '../src/services/preProcessPattern'
import makeExports from '../src/services/makeExports'
import TemporaryStructure from './helpers/temporaryStructure'
import fs from 'fs'

describe('makeExports', () => {
  const temporaryStructure = new TemporaryStructure({ rootDir: '/test' })

  beforeAll(() => {
    temporaryStructure.create()
  })

  afterAll(() => {
    temporaryStructure.destroy()
  })

  it('should be export simple', () => {
    const pattern = preProcessPattern({
      basePath: temporaryStructure.basePath, // basePath -> app
      paths: [temporaryStructure.path] // path -> components
    })

    // expect file as /app/components/index.js
    makeExports(pattern)

    let result = null

    fs.readdirSync(
      `${temporaryStructure.basePath}/${temporaryStructure.path}`
    ).forEach(target => {
      if (target === 'index.js') {
        result = true
      }
    })

    expect(result).toBe(true)
  })
})
