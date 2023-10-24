import { expect, test } from 'vitest'
import { attempt } from '../../../src/index.js'
import { invalidParse } from '../../utils/invalidParse'

test('Primitive', () => {
  const n = attempt(() => 1, 'Test')
  expect(n).toBe(1)

  const s = attempt(() => 'Test', 123)
  expect(s).toBe('Test')
})

test('Object', () => {
  const dict = attempt(
    () => ({
      key: 'value'
    }),
    null
  )
  expect(dict).toEqual({
    key: 'value'
  })

  const array = attempt(() => [1, 2, 3], {})
  expect(array).toEqual([1, 2, 3])
})

test('Rise Parse', () => {
  const err = attempt(() => invalidParse(new Error('Test')), new Set())
  expect(err).toEqual(new Set())
})
