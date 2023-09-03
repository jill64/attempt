import { expect, test } from 'vitest'
import { attempt } from '../../dist'
import { rise } from '../utils/rise'

test('Rise Error', () => {
  const err = attempt(() => rise(new Error('Test')))
  expect(err).toEqual(new Error('Test'))
})

test('Rise String', () => {
  const call = () => attempt(() => rise('Test'))
  expect(call).toThrow(/Test/)
})
