import { expect, test } from 'vitest'
import { rise } from './rise'

test('Empty String', () => {
  expect(() => rise('')).toThrowError()
})

test('Error', () => {
  expect(() => rise(new Error())).toThrowError()
  expect(() => rise(new Error('Test1'))).toThrowError('Test1')
})

test('String', () => {
  expect(() => rise('Test2')).toThrow(/Test2/)
})

test('Promise', () => {
  expect(async () => rise('Test3')).rejects.toThrow(/Test3/)
})
