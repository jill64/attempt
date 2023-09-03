import { fate } from './fate'
import { invalidParse } from './invalidParse'

export const immediateInvalidParse = (projectile: string | Error) => {
  return fate(invalidParse(projectile))
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it('Empty String', () => {
    expect(() => immediateInvalidParse('')).toThrowError()
  })

  it('Error', () => {
    expect(() => immediateInvalidParse(new Error())).toThrowError()
    expect(() => immediateInvalidParse(new Error('Test1'))).toThrowError(
      'Test1'
    )
  })

  it('String', () => {
    expect(() => immediateInvalidParse('Test2')).toThrow(/Test2/)
  })

  it('Promise', () => {
    expect(async () => immediateInvalidParse('Test3')).rejects.toThrow(/Test3/)
  })
}
