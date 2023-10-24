import { delay } from './delay'
import { rise } from './rise.js'

export const lazyRise = async (projectile: string | Error) => {
  await delay(100)
  return rise(projectile)
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it('Empty String', () => {
    expect(lazyRise('')).rejects.toThrowError()
  })

  it('Error', () => {
    expect(lazyRise(new Error())).rejects.toThrowError()
    expect(lazyRise(new Error('Test1'))).rejects.toThrowError('Test1')
  })

  it('String', () => {
    expect(() => lazyRise('Test2')).rejects.toThrow(/Test2/)
  })

  it('Promise', () => {
    expect(async () => lazyRise('Test3')).rejects.toThrow(/Test3/)
  })
}
