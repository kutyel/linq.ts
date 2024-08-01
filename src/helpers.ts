/**
 * Checks if the argument passed is an object
 */
export const isObj = <T>(x: T): boolean => !!x && typeof x === 'object'

/**
 * Determine if two objects are equal
 */
export const equal = <T extends object, U extends Record<string, unknown>>(
  a: T,
  b: U
): boolean =>
  Object.entries(a).every(([key, val]) =>
    isObj(val) ? equal(b[key] as T, val) : b[key] === val
  )

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
