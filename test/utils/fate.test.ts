import { expect, test } from 'vitest'
import { fate } from './fate.js'

test('Primitive', () => {
  expect(fate(123)).toEqual(new Promise((resolve) => resolve(123)))
  expect((async () => 'Test')()).toEqual(fate('Test'))
})

test('Object', () => {
  expect(
    fate({
      foo: 'bar'
    })
  ).toEqual(
    new Promise((resolve) =>
      resolve({
        foo: 'bar'
      })
    )
  )

  expect(new Promise((resolve) => resolve(new Set(['A', 'B', 'C'])))).toEqual(
    fate(new Set(['A', 'B', 'C']))
  )
})
