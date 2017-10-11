import test from 'ava'
import { Enumerable } from '../linq'

test('Range', t => {
  t.deepEqual(
    Enumerable.Range(1, 10)
      .Select(x => x * x)
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
