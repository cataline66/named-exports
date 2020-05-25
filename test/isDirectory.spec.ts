import isDirectory from '../src/utils/isDirectory'
import fs from 'fs'
import { uuid } from 'uuidv4'

describe('Utility -> Is Directory', () => {
  it('should be truthy when is folder', async () => {
    const path = `test/${uuid()}`.toString()

    fs.mkdirSync(path)

    expect(isDirectory(path)).toBeTruthy()

    fs.rmdirSync(path)
  })

  it('should be falsy when is file', async () => {
    const path = `test/${uuid()}.txt`.toString()

    fs.writeFileSync(path, 'Hello Wolrd')

    expect(isDirectory(path)).toBeFalsy()

    fs.unlinkSync(path)
  })
})
