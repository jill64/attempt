import { rise } from './rise'

export const invalidParse = (projectile: string | Error) => {
  try {
    return JSON.parse('invalid json') as {
      key: 'value'
    }
  } catch {
    throw rise(projectile)
  }
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it('Empty String', () => {
    expect(() => invalidParse('')).toThrowError()
  })

  it('Error', () => {
    expect(() => invalidParse(new Error())).toThrowError()
    expect(() => invalidParse(new Error('Test1'))).toThrowError('Test1')
  })

  it('String', () => {
    expect(() => invalidParse('Test2')).toThrow(/Test2/)
  })

  it('Promise', () => {
    expect(async () => invalidParse('Test3')).rejects.toThrow(/Test3/)
  })
}
