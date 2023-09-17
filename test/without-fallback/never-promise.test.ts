import { expect, test } from 'vitest'
import { attempt } from '../../src'
import { immediateRise } from '../utils/immediateRise'
import { lazyRise } from '../utils/lazyRise'

test('Lazy Error', () => {
  const err = attempt(() => lazyRise(new Error('Test')))
  expect(err).resolves.toEqual(new Error('Test'))
})

test('Lazy String', () => {
  const call = attempt(() => lazyRise('Test'))
  expect(call).rejects.toThrow(/Test/)
})

test('Immediate Error', () => {
  const err = attempt(() => immediateRise(new Error('Test')))
  expect(err).toEqual(new Error('Test'))
})

test('Immediate String', () => {
  const call = () => attempt(() => immediateRise('Test'))
  expect(call).toThrow(/Test/)
})
