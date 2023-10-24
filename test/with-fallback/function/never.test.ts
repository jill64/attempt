import { expect, test } from 'vitest'
import { attempt } from '../../../src/index.js'
import { rise } from '../../utils/rise'

test('Rise Error', () => {
  const err = attempt(
    () => rise(new Error('Test')),
    (e) => [e?.message]
  )
  expect(err).toEqual(['Test'])
})

test('Rise String', () => {
  const call = attempt(
    () => rise('Test'),
    async (e, p) => new Map([[e, p]])
  )
  expect(call).resolves.toEqual(new Map([[null, 'Test']]))
})
