export const rise = (projectile: string | Error) => {
  throw projectile ? projectile : new Error()
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it('Empty String', () => {
    expect(() => rise('')).toThrowError()
  })

  it('Error', () => {
    expect(() => rise(new Error())).toThrowError()
    expect(() => rise(new Error('Test1'))).toThrowError('Test1')
  })

  it('String', () => {
    expect(() => rise('Test2')).toThrow(/Test2/)
  })

  it('Promise', () => {
    expect(async () => rise('Test3')).rejects.toThrow(/Test3/)
  })
}
