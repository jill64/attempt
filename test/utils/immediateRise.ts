import { fate } from './fate.js'
import { rise } from './rise.js'

export const immediateRise = (projectile: string | Error) => {
  return fate(rise(projectile))
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it('Empty String', () => {
    expect(() => immediateRise('')).toThrowError()
  })

  it('Error', () => {
    expect(() => immediateRise(new Error())).toThrowError()
    expect(() => immediateRise(new Error('Test1'))).toThrowError('Test1')
  })

  it('String', () => {
    expect(() => immediateRise('Test2')).toThrow(/Test2/)
  })

  it('Promise', () => {
    expect(async () => immediateRise('Test3')).rejects.toThrow(/Test3/)
  })
}
