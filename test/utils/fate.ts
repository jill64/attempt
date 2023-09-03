export const fate = async <T>(x: T) => x

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it('Primitive', () => {
    expect(fate(123)).toEqual(new Promise((resolve) => resolve(123)))
    expect((async () => 'Test')()).toEqual(fate('Test'))
  })

  it('Object', () => {
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
}
