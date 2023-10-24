import { expect, test } from 'vitest'
import { lazyRise } from './lazyRise.js'

test('Empty String', () => {
  expect(lazyRise('')).rejects.toThrowError()
})

test('Error', () => {
  expect(lazyRise(new Error())).rejects.toThrowError()
  expect(lazyRise(new Error('Test1'))).rejects.toThrowError('Test1')
})

test('String', () => {
  expect(() => lazyRise('Test2')).rejects.toThrow(/Test2/)
})

test('Promise', () => {
  expect(async () => lazyRise('Test3')).rejects.toThrow(/Test3/)
})
