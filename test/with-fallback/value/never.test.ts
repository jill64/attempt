import { expect, test } from 'vitest'
import { attempt } from '../../../dist'
import { rise } from '../../utils/rise'

test('Rise Error', () => {
  const err = attempt(() => rise(new Error('Test')), 123)
  expect(err).toBe(123)
})

test('Rise String', () => {
  const call = attempt(() => rise('Test'), new Map([['key', 'value']]))
  expect(call).toEqual(new Map([['key', 'value']]))
})
