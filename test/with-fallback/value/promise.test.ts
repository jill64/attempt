import { expect, test } from 'vitest'
import { attempt } from '../../../src/index.js'
import { fate } from '../../utils/fate.js'
import { immediateInvalidParse } from '../../utils/immediateInvalidParse.js'
import { lazyInvalidParse } from '../../utils/lazyInvalidParse.js'

test('Primitive', async () => {
  const n = attempt(async () => 1, null)
  expect(n).resolves.toEqual(1)

  const s = attempt(() => fate('Test'), undefined)
  expect(s).resolves.toEqual('Test')
})

test('Object', () => {
  const dict = attempt(
    async () => ({
      key: 'value'
    }),
    {
      fallback: 'object'
    }
  )
  expect(dict).resolves.toEqual({
    key: 'value'
  })

  const array = attempt(() => fate([1, 2, 3]), 'Test')
  expect(array).resolves.toEqual([1, 2, 3])
})

test('Lazy Parse', () => {
  const err = attempt(() => lazyInvalidParse(new Error('Test')), null)
  expect(err).resolves.toBe(null)
})

test('Immediate Parse', () => {
  const call = attempt(() => immediateInvalidParse('Test'), [])
  expect(call).toEqual([])
})
