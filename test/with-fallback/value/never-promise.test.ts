import { expect, test } from 'vitest'
import { attempt } from '../../../src/index.js'
import { fate } from '../../utils/fate.js'
import { immediateRise } from '../../utils/immediateRise.js'
import { lazyRise } from '../../utils/lazyRise.js'

test('Lazy Error', () => {
  const err = attempt(() => lazyRise(new Error('Test')), null)
  expect(err).resolves.toBe(null)
})

test('Lazy String', () => {
  const call = attempt(() => lazyRise('Test'), undefined)
  expect(call).toEqual(fate(undefined))
})

test('Immediate Error', () => {
  const err = attempt(() => immediateRise(new Error('Test')), 'Test')
  expect(err).toBe('Test')
})

test('Immediate String', () => {
  const call = attempt(() => immediateRise('Test'), [1, 2, 3])
  expect(call).toEqual([1, 2, 3])
})
