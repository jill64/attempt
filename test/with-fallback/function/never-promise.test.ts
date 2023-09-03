import { expect, test } from 'vitest'
import { attempt } from '../../../dist'
import { immediateRise } from '../../utils/immediateRise'
import { lazyRise } from '../../utils/lazyRise'

test('Lazy Error', () => {
  const err = attempt(
    () => lazyRise(new Error('Test')),
    (e, p) => [`${e?.message}-Exception`, p]
  )
  expect(err).resolves.toEqual(['Test-Exception', new Error('Test')])
})

test('Lazy String', () => {
  const call = attempt(
    () => lazyRise('Test'),
    async (e, p) => [e, p]
  )
  expect(call).resolves.toEqual([null, 'Test'])
})

test('Immediate Error', () => {
  const err = attempt(
    () => immediateRise(new Error('Test')),
    async (e) => e?.message
  )
  expect(err).resolves.toBe('Test')
})

test('Immediate String', () => {
  const call = attempt(
    () => immediateRise('Test'),
    (_, p) => p
  )
  expect(call).toEqual('Test')
})
