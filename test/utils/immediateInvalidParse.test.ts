import { expect, test } from 'vitest'
import { immediateInvalidParse } from './immediateInvalidParse'

test('Empty String', () => {
  expect(() => immediateInvalidParse('')).toThrowError()
})

test('Error', () => {
  expect(() => immediateInvalidParse(new Error())).toThrowError()
  expect(() => immediateInvalidParse(new Error('Test1'))).toThrowError('Test1')
})

test('String', () => {
  expect(() => immediateInvalidParse('Test2')).toThrow(/Test2/)
})

test('Promise', () => {
  expect(async () => immediateInvalidParse('Test3')).rejects.toThrow(/Test3/)
})
