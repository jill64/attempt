import { expect, test } from 'vitest'
import { attempt } from '../../../src'
import { fate } from '../../utils/fate'
import { immediateInvalidParse } from '../../utils/immediateInvalidParse'
import { lazyInvalidParse } from '../../utils/lazyInvalidParse'

test('Primitive', async () => {
  const n = attempt(
    async () => 1,
    () => null
  )
  expect(n).resolves.toEqual(1)

  const s = attempt(
    () => fate('Test'),
    (e) => [e]
  )
  expect(s).resolves.toEqual('Test')
})

test('Object', () => {
  const dict = attempt(
    async () => ({
      key: 'value'
    }),
    async () => ({
      fallback: 'object'
    })
  )
  expect(dict).resolves.toEqual({
    key: 'value'
  })

  const array = attempt(
    () => fate([1, 2, 3]),
    (_, p) => `Test-${p}`
  )
  expect(array).resolves.toEqual([1, 2, 3])
})

test('Lazy Parse', () => {
  const err = attempt(
    () => lazyInvalidParse(new Error('Test')),
    (e) => new Set(e?.message)
  )
  expect(err).resolves.toEqual(new Set('Test'))
})

test('Immediate Parse', () => {
  const call = attempt(
    () => immediateInvalidParse('Test'),
    async (e, p) => [e, `${p}-Exception`]
  )
  expect(call).resolves.toEqual([null, 'Test-Exception'])
})
