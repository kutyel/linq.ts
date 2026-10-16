/**
 * Checks if the argument passed is an object
 */
export const isObj = <T>(x: T): boolean => !!x && typeof x === 'object'

/**
 * Determine if two objects are equal.
 * Null and undefined nested values are comparable and do not throw.
 * Dates compare by time so distinct timestamps stay distinct.
 */
export const equal = <T extends object, U extends Record<string, unknown>>(
  a: T,
  b: U
): boolean => {
  // Null and undefined return false before any key walk. Dates compare
  // with getTime(); nested objects recurse through equal. Object.entries
  // of the first argument threw on null/undefined and treated every Date as equal.
  if ((a as unknown) === (b as unknown)) {
    return true
  }
  if (a == null || b == null) {
    return false
  }
  if (a instanceof Date || b instanceof Date) {
    return a instanceof Date && b instanceof Date && a.getTime() === b.getTime()
  }
  if (!isObj(a) || !isObj(b)) {
    return false
  }
  const left = (a as unknown) as Record<string, unknown>
  const right = (b as unknown) as Record<string, unknown>
  const keys = Object.keys(left)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]!
    const leftVal = left[key]
    const rightVal = right[key]
    if (isObj(leftVal) || isObj(rightVal)) {
      if (!equal(leftVal as T, rightVal as U)) {
        return false
      }
    } else if (leftVal !== rightVal) {
      return false
    }
  }
  return true
}

/**
 * Comparer helpers
 */

export const composeComparers = <T>(
  previousComparer: (a: T, b: T) => number,
  currentComparer: (a: T, b: T) => number
): ((a: T, b: T) => number) => (a: T, b: T) =>
  previousComparer(a, b) || currentComparer(a, b)

export const keyComparer = <T>(
  _keySelector: (key: T) => string,
  descending?: boolean
): ((a: T, b: T) => number) => (a: T, b: T) => {
  const sortKeyA = _keySelector(a)
  const sortKeyB = _keySelector(b)
  if (sortKeyA > sortKeyB) {
    return !descending ? 1 : -1
  } else if (sortKeyA < sortKeyB) {
    return !descending ? -1 : 1
  } else {
    return 0
  }
}
