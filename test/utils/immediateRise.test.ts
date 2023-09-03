import { expect, test } from 'vitest'
import { immediateRise } from './immediateRise'

test('Empty String', () => {
  expect(() => immediateRise('')).toThrowError()
})

test('Error', () => {
  expect(() => immediateRise(new Error())).toThrowError()
  expect(() => immediateRise(new Error('Test1'))).toThrowError('Test1')
})

test('String', () => {
  expect(() => immediateRise('Test2')).toThrow(/Test2/)
})

test('Promise', () => {
  expect(async () => immediateRise('Test3')).rejects.toThrow(/Test3/)
})
