import List from './list.js'

/* c8 ignore start */
export default class Enumerable {
  /**
   * Generates a sequence of integral numbers within a specified range.
   */
  public static Range(start: number, count: number): List<number> {
    /* c8 ignore end */
    let result = new List<number>()
    while (count--) {
      result.Add(start++)
    }
    return result
  }

  /* c8 ignore start */
  /**
   * Generates a sequence that contains one repeated value.
   */
  public static Repeat<T>(element: T, count: number): List<T> {
    /* c8 ignore end */
    let result = new List<T>()
    while (count--) {
      result.Add(element)
    }
    return result
  }
  /* c8 ignore next */
}
