import test from 'ava'

import Enumerable from '../src/enumerable.js'

test('Range', t => {
  t.deepEqual(
    Enumerable.Range(1, 10)
      .Select((x: number) => x * x)
      .ToArray(),
    [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
  )
})

test('Repeat', t => {
  const str = 'I like programming'
  const test = Enumerable.Repeat(str, 3)
  t.is(test.ElementAt(0), str)
  t.is(test.ElementAt(1), str)
  t.is(test.ElementAt(2), str)
})

test('Range_countValidation', t => {
  t.deepEqual(Enumerable.Range(5, 3).ToArray(), [5, 6, 7])
  t.deepEqual(Enumerable.Range(1, 0).ToArray(), [])
  t.throws(() => Enumerable.Range(1, -1), {
    message: /ArgumentOutOfRangeException: count is less than 0 or not an integer./
  })
  t.throws(() => Enumerable.Range(1, 1.5), {
    message: /ArgumentOutOfRangeException: count is less than 0 or not an integer./
  })
})

test('Repeat_countValidation', t => {
  t.deepEqual(Enumerable.Repeat('x', 0).ToArray(), [])
  t.is(Enumerable.Repeat('x', 2).Count(), 2)
  t.throws(() => Enumerable.Repeat('x', -1), {
    message: /ArgumentOutOfRangeException: count is less than 0 or not an integer./
  })
  t.throws(() => Enumerable.Repeat('x', 2.2), {
    message: /ArgumentOutOfRangeException: count is less than 0 or not an integer./
  })
})
