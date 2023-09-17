import { expect, test } from 'vitest'
import { attempt } from '../../src'
import { invalidParse } from '../utils/invalidParse'

test('Primitive', () => {
  const n = attempt(() => 1)
  expect(n).toBe(1)

  const s = attempt(() => 'Test')
  expect(s).toBe('Test')
})

test('Object', () => {
  const dict = attempt(() => ({
    key: 'value'
  }))
  expect(dict).toEqual({
    key: 'value'
  })

  const array = attempt(() => [1, 2, 3])
  expect(array).toEqual([1, 2, 3])
})

test('Rise Parse', () => {
  const err = attempt(() => invalidParse(new Error('Test')))
  expect(err).toEqual(new Error('Test'))
})
