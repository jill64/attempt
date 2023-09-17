import { expect, test } from 'vitest'
import { attempt } from '../../src'
import { fate } from '../utils/fate'
import { immediateInvalidParse } from '../utils/immediateInvalidParse'
import { lazyInvalidParse } from '../utils/lazyInvalidParse'

test('Primitive', async () => {
  const n = attempt(async () => 1)
  expect(n).resolves.toEqual(1)

  const s = attempt(() => fate('Test'))
  expect(s).resolves.toEqual('Test')
})

test('Object', () => {
  const dict = attempt(async () => ({
    key: 'value'
  }))
  expect(dict).resolves.toEqual({
    key: 'value'
  })

  const array = attempt(() => fate([1, 2, 3]))
  expect(array).resolves.toEqual([1, 2, 3])
})

test('Lazy Parse', () => {
  const err = attempt(() => lazyInvalidParse(new Error('Test')))
  expect(err).resolves.toEqual(new Error('Test'))
})

test('Immediate Parse', () => {
  const call = () => attempt(() => immediateInvalidParse('Test'))
  expect(call).toThrow(/Test/)
})
