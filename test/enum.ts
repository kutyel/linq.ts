import test from 'ava'
import { Enumerable } from '../linq'

test('Range', t => {
  t.is(
    Enumerable.Range(1, 10).Select(x => x * x).ToArray().toString(),
    '1,4,9,16,25,36,49,64,81,100'
  )
})

test('Repeat', t => {
  const test = Enumerable.Repeat('I like programming.', 3)
  t.is(test.ElementAt(0), 'I like programming.')
  t.is(test.ElementAt(1), 'I like programming.')
  t.is(test.ElementAt(2), 'I like programming.')
})
