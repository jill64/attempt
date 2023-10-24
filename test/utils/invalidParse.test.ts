import { expect, test } from 'vitest'
import { invalidParse } from './invalidParse.js'

test('Empty String', () => {
  expect(() => invalidParse('')).toThrowError()
})

test('Error', () => {
  expect(() => invalidParse(new Error())).toThrowError()
  expect(() => invalidParse(new Error('Test1'))).toThrowError('Test1')
})

test('String', () => {
  expect(() => invalidParse('Test2')).toThrow(/Test2/)
})

test('Promise', () => {
  expect(async () => invalidParse('Test3')).rejects.toThrow(/Test3/)
})
