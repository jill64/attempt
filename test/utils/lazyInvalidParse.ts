import { delay } from './delay'
import { invalidParse } from './invalidParse.js'

export const lazyInvalidParse = async (projectile: string | Error) => {
  await delay(100)
  return invalidParse(projectile)
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it('Empty String', () => {
    expect(lazyInvalidParse('')).rejects.toThrowError()
  })

  it('Error', () => {
    expect(lazyInvalidParse(new Error())).rejects.toThrowError()
    expect(lazyInvalidParse(new Error('Test1'))).rejects.toThrowError('Test1')
  })

  it('String', () => {
    expect(() => lazyInvalidParse('Test2')).rejects.toThrow(/Test2/)
  })

  it('Promise', () => {
    expect(async () => lazyInvalidParse('Test3')).rejects.toThrow(/Test3/)
  })
}
