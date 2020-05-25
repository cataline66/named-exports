import normalizePath from '../src/utils/normalizePath'

describe('Utility -> Normalize Path', () => {
  it('should remove slashes of beginning', () => {
    expect(normalizePath('/demo')).toBe('demo')
  })

  it('should remove slashes of end', () => {
    expect(normalizePath('demo/')).toBe('demo')
  })

  it('should remove simple slashes from the beginning and end', () => {
    expect(normalizePath('/demo/')).toBe('demo')
  })

  it('should remove double slashes from the beginning and end', () => {
    expect(normalizePath('//demo//')).toBe('demo')
  })

  it('should not remove internal slashes', () => {
    expect(normalizePath('/demo/components/')).toBe('demo/components')
  })
})
