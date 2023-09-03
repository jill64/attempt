import { expect, test } from 'vitest'
import { lazyInvalidParse } from './lazyInvalidParse'

test('Empty String', () => {
  expect(lazyInvalidParse('')).rejects.toThrowError()
})

test('Error', () => {
  expect(lazyInvalidParse(new Error())).rejects.toThrowError()
  expect(lazyInvalidParse(new Error('Test1'))).rejects.toThrowError('Test1')
})

test('String', () => {
  expect(() => lazyInvalidParse('Test2')).rejects.toThrow(/Test2/)
})

test('Promise', () => {
  expect(async () => lazyInvalidParse('Test3')).rejects.toThrow(/Test3/)
})
