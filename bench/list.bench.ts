// Heap numbers are meaningful when run with `node --expose-gc`.

import { Bench } from 'tinybench'
import { List } from '../src/index.js'

const SIZES = [1_000, 10_000, 100_000] as const
const HEAP_SIZE = 10_000
// tinybench treats `iterations` as a minimum, so a low floor lets `time` cap slow cases.
const TIME_MS = 300
const MIN_ITERATIONS = 5
const WARMUP_TIME_MS = 50
const WARMUP_ITERATIONS = 1

interface Shape {
  id: number
  name: string
  active: boolean
}

interface OuterRow {
  key: number
  value: number
}

interface InnerRow {
  key: number
  label: number
}

interface Fixture {
  numbers: List<number>
  withNan: List<number>
  shapes: List<Shape>
  other: List<number>
  nested: List<List<number>>
  outer: List<OuterRow>
  inner: List<InnerRow>
  extra: number[]
  target: List<number>
}

interface Prepared {
  run: () => unknown
  beforeEach?: () => void
}

interface BenchCase {
  name: string
  prepare: (n: number) => Prepared
}

const fixtures = new Map<number, Fixture>()

const fixture = (n: number): Fixture => {
  const existing = fixtures.get(n)
  if (existing) {
    return existing
  }

  const numbers = new Array<number>(n)
  const withNan = new Array<number>(n)
  const other = new Array<number>(n)
  const extra = new Array<number>(n)
  for (let i = 0; i < n; i++) {
    // Zeros stay in the sequence so Average divides by the real length.
    numbers[i] = i % 10 === 0 ? 0 : i
    withNan[i] = i % 8 === 0 ? Number.NaN : i % 40
    other[i] = i * 2
    extra[i] = i
  }

  // Repeat 10 shapes to length n so Distinct's deep-equal path stays small.
  const prototypes: Shape[] = []
  for (let i = 0; i < 10; i++) {
    prototypes.push({
      id: i,
      name: `shape-${i}`,
      active: i % 2 === 0
    })
  }
  const shapes = new Array<Shape>(n)
  for (let i = 0; i < n; i++) {
    const shape = prototypes[i % 10]!
    shapes[i] = { id: shape.id, name: shape.name, active: shape.active }
  }

  const nested = new Array<List<number>>(n)
  for (let i = 0; i < n; i++) {
    const length = 2 + (i % 3)
    const innerValues = new Array<number>(length)
    for (let j = 0; j < length; j++) {
      innerValues[j] = i + j
    }
    nested[i] = new List<number>(innerValues)
  }

  const innerLength = Math.min(n, 100)
  const outerRows = new Array<OuterRow>(n)
  const innerRows = new Array<InnerRow>(innerLength)
  for (let i = 0; i < n; i++) {
    outerRows[i] = { key: i % innerLength, value: i }
  }
  for (let i = 0; i < innerLength; i++) {
    innerRows[i] = { key: i, label: i }
  }

  const created: Fixture = {
    numbers: new List<number>(numbers),
    withNan: new List<number>(withNan),
    shapes: new List<Shape>(shapes),
    other: new List<number>(other),
    nested: new List<List<number>>(nested),
    outer: new List<OuterRow>(outerRows),
    inner: new List<InnerRow>(innerRows),
    extra,
    target: new List<number>()
  }
  fixtures.set(n, created)
  return created
}

const cases: BenchCase[] = [
  {
    name: 'Where-Select-ToArray',
    prepare: n => {
      const list = fixture(n).numbers
      return {
        run: () =>
          list
            .Where(value => value % 2 === 0)
            .Select(value => value * 2)
            .ToArray()
      }
    }
  },
  {
    name: 'Count',
    prepare: n => {
      const list = fixture(n).numbers
      return { run: () => list.Count(value => value > 0) }
    }
  },
  {
    name: 'Sum',
    prepare: n => {
      const list = fixture(n).numbers
      return { run: () => list.Sum(value => value ?? 0) }
    }
  },
  {
    name: 'Average',
    prepare: n => {
      const list = fixture(n).numbers
      return { run: () => list.Average() }
    }
  },
  {
    name: 'First',
    prepare: n => {
      const list = fixture(n).numbers
      return { run: () => list.First(value => value === 0) }
    }
  },
  {
    name: 'SelectMany',
    prepare: n => {
      const list = fixture(n).nested
      return { run: () => list.SelectMany(inner => inner) }
    }
  },
  {
    name: 'Join',
    prepare: n => {
      const { outer, inner } = fixture(n)
      return {
        run: () =>
          outer.Join(
            inner,
            row => row.key,
            row => row.key,
            (left, right) => left.value + right.label
          )
      }
    }
  },
  {
    name: 'Distinct',
    prepare: n => {
      const list = fixture(n).withNan
      return { run: () => list.Distinct() }
    }
  },
  {
    name: 'Distinct-objects',
    prepare: n => {
      const list = fixture(n).shapes
      return { run: () => list.Distinct() }
    }
  },
  {
    name: 'DistinctBy',
    prepare: n => {
      const list = fixture(n).shapes
      return { run: () => list.DistinctBy(item => item.id) }
    }
  },
  {
    name: 'Except',
    prepare: n => {
      const { numbers, other } = fixture(n)
      return { run: () => numbers.Except(other) }
    }
  },
  {
    name: 'Intersect',
    prepare: n => {
      const { numbers, other } = fixture(n)
      return { run: () => numbers.Intersect(other) }
    }
  },
  {
    name: 'ToDictionary',
    prepare: n => {
      const list = fixture(n).numbers
      return {
        run: () =>
          list.ToDictionary(
            value => value,
            value => value * 2
          )
      }
    }
  },
  {
    name: 'AddRange',
    prepare: n => {
      const { extra, target } = fixture(n)
      return {
        run: () => {
          target.AddRange(extra)
        },
        beforeEach: () => {
          target.Clear()
        }
      }
    }
  },
  {
    name: 'SkipWhile',
    prepare: n => {
      const list = fixture(n).numbers
      return { run: () => list.SkipWhile(value => value < 0) }
    }
  },
  {
    name: 'TakeWhile',
    prepare: n => {
      const list = fixture(n).numbers
      return { run: () => list.TakeWhile(value => value < 0) }
    }
  },
  {
    name: 'ToArray',
    prepare: n => {
      const list = fixture(n).numbers
      return { run: () => list.ToArray() }
    }
  }
]

const bench = new Bench({
  time: TIME_MS,
  iterations: MIN_ITERATIONS,
  warmupTime: WARMUP_TIME_MS,
  warmupIterations: WARMUP_ITERATIONS,
  throws: true
})

for (const item of cases) {
  for (const n of SIZES) {
    const prepared = item.prepare(n)
    bench.add(`${item.name} n=${n}`, prepared.run, {
      async: false,
      beforeEach: prepared.beforeEach
    })
  }
}

await bench.run()
console.table(bench.table())

const gc = (globalThis as { gc?: () => void }).gc
if (typeof gc !== 'function') {
  console.log('heap deltas were skipped')
} else {
  const rows: { Case: string; 'Heap delta (KB)': number }[] = []
  let held: unknown
  for (const item of cases) {
    const prepared = item.prepare(HEAP_SIZE)
    prepared.beforeEach?.()
    held = undefined
    gc()
    const before = process.memoryUsage().heapUsed
    held = prepared.run()
    gc()
    const after = process.memoryUsage().heapUsed
    rows.push({
      Case: `${item.name} n=${HEAP_SIZE}`,
      'Heap delta (KB)': Math.round(((after - before) / 1024) * 10) / 10
    })
  }
  void held
  console.log(`Heap deltas (n=${HEAP_SIZE})`)
  console.table(rows)
}
