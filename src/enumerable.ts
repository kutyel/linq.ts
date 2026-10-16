import List, { own } from './list.js'

const assertCount = (count: number): void => {
  if (!Number.isInteger(count) || count < 0) {
    throw new Error(
      'ArgumentOutOfRangeException: count is less than 0 or not an integer.'
    )
  }
}

/* c8 ignore start */
export default class Enumerable {
  /**
   * Generates a sequence of integral numbers within a specified range.
   */
  public static Range(start: number, count: number): List<number> {
    /* c8 ignore end */
    // Throw when count is negative or not an integer, then fill one
    // pre-sized array. while (count--) never terminates for a negative
    // count (every non-zero number is truthy) and grew by Add one at a time.
    assertCount(count)
    const result = new Array<number>(count)
    for (let i = 0; i < count; i++) {
      result[i] = start + i
    }
    return new List<number>(own(result))
  }

  /* c8 ignore start */
  /**
   * Generates a sequence that contains one repeated value.
   */
  public static Repeat<T>(element: T, count: number): List<T> {
    /* c8 ignore end */
    // Throw when count is negative or not an integer, then fill one
    // pre-sized array. while (count--) never terminates for a negative
    // count (every non-zero number is truthy) and grew by Add one at a time.
    assertCount(count)
    const result = new Array<T>(count)
    for (let i = 0; i < count; i++) {
      result[i] = element
    }
    return new List<T>(own(result))
  }
  /* c8 ignore next */
}
