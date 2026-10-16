import { composeComparers, isObj, equal, keyComparer } from './helpers.js'

type PredicateType<T> = (value: T, index?: number, list?: T[]) => boolean

const ownedArrays = new WeakSet<object>()

/**
 * Marks a freshly allocated array so the List constructor adopts it
 * instead of copying. Callers must not reuse the array afterwards.
 * @internal
 */
export const own = <T>(elements: T[]): T[] => {
  // Where, Select, Take, Skip, and Concat already allocated this buffer.
  // Mark it so the constructor adopts it instead of copying again. Public
  // new List(arr) still copies caller input.
  ownedArrays.add(elements)
  return elements
}

const elementsOf = <T>(list: List<T>): T[] =>
  ((list as unknown) as { _elements: T[] })._elements

const indexBy = <U>(
  elements: readonly U[],
  keySelector: (item: U) => any
): Map<any, U[]> => {
  const groups = new Map<any, U[]>()
  for (let i = 0; i < elements.length; i++) {
    const item = elements[i]!
    const key = keySelector(item)
    const existing = groups.get(key)
    if (existing) {
      existing.push(item)
    } else {
      groups.set(key, [item])
    }
  }
  return groups
}

const countOutOfRange = (): Error =>
  new Error('ArgumentOutOfRangeException: count is less than 0.')

class List<T> {
  protected _elements: T[];

  /**
   * Make the List iterable and Spreadable
   */
  *[Symbol.iterator]() {
    for (let element of this._elements) {
      yield element
    }
  }

  /**
   * property represents the Object name
   */
  get [Symbol.toStringTag]() {
    return 'List' // Expected output: "[object List]"
  }

  /**
   * Defaults the elements of the list
   */
  constructor(elements: T[] = []) {
    if (ownedArrays.has(elements)) {
      ownedArrays.delete(elements)
      this._elements = elements
    } else {
      this._elements = elements.slice()
    }
  }

  /**
   * Creates a new list of the same type as the receiver, so that
   * type-preserving operators (Where, Take, Skip, ...) return instances
   * of the derived class instead of the base List<T>.
   *
   * Subclasses whose constructor signature differs from `(elements: T[])`
   * MUST override this method, otherwise the receiver's constructor is
   * called with an array as its single argument.
   */
  protected cloneWith(elements: T[]): this {
    const Ctor = this.constructor as new (elements: T[]) => this
    return new Ctor(own(elements))
  }

  /**
   * Adds an object to the end of the List<T>.
   */
  public Add(element: T): void {
    this._elements.push(element)
  }

  /**
   * Appends an object to the end of the List<T>.
   */
  public Append(element: T): void {
    this.Add(element)
  }

  /**
   * Add an object to the start of the List<T>.
   */
  public Prepend(element: T): void {
    this._elements.unshift(element)
  }

  /**
   * Adds the elements of the specified collection to the end of the List<T>.
   */
  public AddRange(elements: T[]): void {
    // Append one element at a time. push(...elements) spreads every element
    // into one call; engines cap arguments (often ~100,000) and throw
    // RangeError, appending nothing, past that limit.
    for (let i = 0; i < elements.length; i++) {
      this._elements.push(elements[i]!)
    }
  }

  /**
   * Applies an accumulator function over a sequence.
   */
  public Aggregate<U>(
    accumulator: (accum: U, value: T, index: number, list?: T[]) => any,
    initialValue: U
  ): any {
    return this._elements.reduce(accumulator, initialValue)
  }

  /**
   * Determines whether all elements of a sequence satisfy a condition.
   */
  public All(predicate: PredicateType<T>): boolean {
    return this._elements.every(predicate)
  }

  /**
   * Determines whether a sequence contains any elements.
   */
  public Any(predicate?: PredicateType<T>): boolean {
    return predicate
      ? this._elements.some(predicate)
      : this._elements.length > 0
  }

  /**
   * Computes the average of a sequence of number values that are obtained by invoking
   * a transform function on each element of the input sequence.
   */
  public Average(
    transform?: (value?: T, index?: number, list?: T[]) => any
  ): number {
    // One pass: divide Sum by the element count. Sum(transform) /
    // Count(transform) treated the selector as a predicate, so 0 was
    // dropped. Empty throws; zeros stay in the count.
    if (this._elements.length === 0) {
      throw new Error(
        'InvalidOperationException: The source sequence is empty.'
      )
    }
    return (
      this.Sum(transform as (value?: T, index?: number, list?: T[]) => number) /
      this._elements.length
    )
  }

  /**
   * Casts the elements of a sequence to the specified type.
   */
  public Cast<U>(): List<U> {
    return new List<U>(this._elements as any)
  }

  /**
   * Removes all elements from the List<T>.
   */
  public Clear(): void {
    this._elements.length = 0
  }

  /**
   * Concatenates two sequences.
   */
  public Concat(list: List<T>): this {
    return this.cloneWith(this._elements.concat(elementsOf(list)))
  }

  /**
   * Determines whether an element is in the List<T>.
   */
  public Contains(element: T): boolean {
    return this.Any(x => x === element)
  }

  /**
   * Returns the number of elements in a sequence.
   */
  public Count(predicate?: PredicateType<T>): number {
    if (!predicate) {
      return this._elements.length
    }
    let count = 0
    const elements = this._elements
    // Count matches in one pass. Where(predicate).Count() builds a filtered
    // list just to read .length; this keeps O(1) extra memory and skips
    // that allocation.
    for (let i = 0; i < elements.length; i++) {
      if (predicate(elements[i]!, i, elements)) {
        count++
      }
    }
    return count
  }

  /**
   * Returns the elements of the specified sequence or the type parameter's default value
   * in a singleton collection if the sequence is empty.
   */
  public DefaultIfEmpty(defaultValue?: T): this {
    return this.Count() ? this : this.cloneWith([defaultValue as T])
  }

  /**
   * Returns distinct elements from a sequence by using the default equality comparer to compare values.
   */
  public Distinct(): this {
    const elements = this._elements
    const result: T[] = []
    // Primitives go through a Set in one pass.
    // Where + indexOf/findIndex rescanned each prefix (O(n²)).
    const seenPrimitives = new Set<T>()
    for (let i = 0; i < elements.length; i++) {
      const value = elements[i]!
      if (isObj(value)) {
        let duplicate = false
        for (let j = 0; j < result.length; j++) {
          if (
            equal(result[j] as object, value as Record<string, unknown>)
          ) {
            duplicate = true
            break
          }
        }
        if (!duplicate) {
          result.push(value)
        }
      } else if (!seenPrimitives.has(value)) {
        seenPrimitives.add(value)
        result.push(value)
      }
    }
    return this.cloneWith(result)
  }

  /**
   * Returns distinct elements from a sequence according to specified key selector.
   */
  public DistinctBy(keySelector: (key: T) => string | number): this {
    // Distinct keys in one pass. GroupBy stored every element in per-key
    // arrays, then copied the first of each group; memory tracked the full
    // input, not the distinct keys. First occurrences stay in order.
    const seen = new Set<string | number>()
    const result: T[] = []
    const elements = this._elements
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i]!
      const key = keySelector(element)
      if (!seen.has(key)) {
        seen.add(key)
        result.push(element)
      }
    }
    return this.cloneWith(result)
  }

  /**
   * Returns the element at a specified index in a sequence.
   */
  public ElementAt(index: number): T {
    if (index < this.Count() && index >= 0) {
      return this._elements[index]!
    }
    throw new Error(
      'ArgumentOutOfRangeException: index is less than 0 or greater than or equal to the number of elements in source.'
    )
  }

  /**
   * Returns the element at a specified index in a sequence or a default value if the index is out of range.
   */
  public ElementAtOrDefault(index: number): T | null {
    return index < this.Count() && index >= 0
      ? this._elements[index] ?? null /* c8 ignore next */
      : null
  }

  /**
   * Produces the set difference of two sequences by using the default equality comparer to compare values.
   */
  public Except(source: List<T>): this {
    const excluded = new Set<T>(elementsOf(source))
    const result: T[] = []
    const elements = this._elements
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i]!
      if (!excluded.has(element)) {
        result.push(element)
      }
    }
    return this.cloneWith(result)
  }

  /**
   * Returns the first element of a sequence.
   */
  public First(predicate?: PredicateType<T>): T {
    const elements = this._elements
    if (!predicate) {
      if (elements.length === 0) {
        throw new Error(
          'InvalidOperationException: The source sequence is empty.'
        )
      }
      return elements[0]!
    }
    // Stop at the first match. The old code filtered the whole list, then
    // read one element.
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i]!
      if (predicate(element, i, elements)) {
        return element
      }
    }
    throw new Error('InvalidOperationException: The source sequence is empty.')
  }

  /**
   * Returns the first element of a sequence, or a default value if the sequence contains no elements.
   */
  public FirstOrDefault(defaultValue: T): T {
    return this.Count() ? this.First() : defaultValue
  }

  /**
   * Performs the specified action on each element of the List<T>.
   */
  public ForEach(action: (value?: T, index?: number, list?: T[]) => any): void {
    return this._elements.forEach(action)
  }

  /**
   * Groups the elements of a sequence according to a specified key selector function.
   */
  public GroupBy<TResult = T>(
    grouper: (key: T) => string | number,
    mapper: (element: T) => TResult = val => (val as unknown) as TResult
  ): { [key: string]: TResult[] } {
    const initialValue: { [key: string]: TResult[] } = {}
    return this.Aggregate((ac, v) => {
      const key = grouper(v)
      const existingGroup =
        isObj(ac) && (ac as { [key: string]: TResult[] })[key]
      const mappedValue = mapper(v)
      if (!!existingGroup) {
        existingGroup.push(mappedValue)
      } else {
        ;(ac as { [key: string]: TResult[] })[key] = [mappedValue]
      }
      return ac
    }, initialValue)
  }

  /**
   * Correlates the elements of two sequences based on equality of keys and groups the results.
   * The default equality comparer is used to compare keys.
   */
  public GroupJoin<U, R>(
    list: List<U>,
    key1: (k: T) => any,
    key2: (k: U) => any,
    result: (first: T, second: List<U>) => R
  ): List<R> {
    // Index the inner sequence by key once, then scan the outer sequence
    // once. Nested Where/SelectMany was about n²·m comparisons. Result
    // order is unchanged.
    const groups = indexBy(elementsOf(list), key2)
    const results: R[] = []
    const elements = this._elements
    for (let i = 0; i < elements.length; i++) {
      const item = elements[i]!
      const matches = groups.get(key1(item))
      const group = matches ? matches.slice() : []
      results.push(result(item, new List<U>(own(group))))
    }
    return new List<R>(own(results))
  }

  /**
   * Returns the index of the first occurence of an element in the List.
   */
  public IndexOf(element: T): number {
    return this._elements.indexOf(element)
  }

  /**
   * Inserts an element into the List<T> at the specified index.
   */
  public Insert(index: number, element: T): void | Error {
    if (index < 0 || index > this._elements.length) {
      throw new Error('Index is out of range.')
    }

    this._elements.splice(index, 0, element)
  }

  /**
   * Produces the set intersection of two sequences by using the default equality comparer to compare values.
   */
  public Intersect(source: List<T>): this {
    // One Set of the other side; receiver order is kept. Contains on each
    // element was O(n·m).
    const included = new Set<T>(elementsOf(source))
    const result: T[] = []
    const elements = this._elements
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i]!
      if (included.has(element)) {
        result.push(element)
      }
    }
    return this.cloneWith(result)
  }

  /**
   * Correlates the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.
   */
  public Join<U, R>(
    list: List<U>,
    key1: (key: T) => any,
    key2: (key: U) => any,
    result: (first: T, second: U) => R
  ): List<R> {
    // Index the inner sequence by key once, then scan the outer sequence once.
    const groups = indexBy(elementsOf(list), key2)
    const results: R[] = []
    const elements = this._elements
    for (let i = 0; i < elements.length; i++) {
      const item = elements[i]!
      const matches = groups.get(key1(item))
      if (!matches) {
        continue
      }
      for (let j = 0; j < matches.length; j++) {
        results.push(result(item, matches[j]!))
      }
    }
    return new List<R>(own(results))
  }

  /**
   * Returns the last element of a sequence.
   */
  public Last(predicate?: PredicateType<T>): T {
    const elements = this._elements
    if (!predicate) {
      if (elements.length === 0) {
        throw Error('InvalidOperationException: The source sequence is empty.')
      }
      return elements[elements.length - 1]!
    }
    // Walk from the end and stop at the first match.
    for (let i = elements.length - 1; i >= 0; i--) {
      const element = elements[i]!
      if (predicate(element, i, elements)) {
        return element
      }
    }
    throw Error('InvalidOperationException: The source sequence is empty.')
  }

  /**
   * Returns the last element of a sequence, or a default value if the sequence contains no elements.
   */
  public LastOrDefault(defaultValue: T): T {
    return this.Count() ? this.Last() : defaultValue
  }

  // A map of built-in primitive type names to their default comparison functions.
  // This supports number, string, and boolean only
  private static readonly comparers = new Map<string, Function>([
    ['number', (a: number, b: number) => a - b],
    ['string', (a: string, b: string) => a.localeCompare(b)],
    ['boolean', (a: boolean, b: boolean) => Number(a) - Number(b)]
  ])

  /**
   * Retrieves a default comparer function based on the type of the provided sample value.
   * Only supports primitive types: number, string, and boolean.
   *
   * @param sample - A sample value used to determine its type.
   * @returns A comparison function suitable for the type of the sample, or undefined if unsupported.
   */
  private static getComparer<T>(
    sample: T
  ): ((a: T, b: T) => number) | undefined {
    const type = typeof sample
    return List.comparers.get(type) as (a: T, b: T) => number
  }

  /**
   * Gets the maximum value in a generic sequence.
   * @returns The maximum value in the sequence, or undefined if the sequence is empty.
   */
  public Max(): T | undefined

  /**
   * Gets the maximum value in a generic sequence.
   * @returns The maximum value in the sequence, or undefined if the sequence is empty.
   * @param selector - A function to select a value from each element for comparison.
   */
  public Max<R>(selector: (e: T) => R): R | undefined

  /**
   * Gets the maximum value in a generic sequence.
   * @returns The maximum value in the sequence, or undefined if the sequence is empty.
   * @param comparer - A custom comparison function
   */
  public Max(comparer: (a: T, b: T) => number): T | undefined

  /**
   * Gets the maximum value in a generic sequence.
   * @returns The maximum value in the sequence, or undefined if the sequence is empty.
   * @param comparerOrSelector - An optional custom comparison function or a selector function to select a value from each element for comparison.
   */
  public Max<R>(
    comparerOrSelector?: ((a: T, b: T) => number) | ((e: T) => R)
  ): T | R | undefined {
    if (this._elements.length === 0) return undefined

    if (!comparerOrSelector) {
      // Max(): T | undefined;
      return this.getMaxElement<T>(this._elements)
    }

    const fn = comparerOrSelector as Function

    if (!fn || fn.length > 2 || fn.length === 0) {
      throw new Error(
        'InvalidOperationException: Invalid comparer or selector function provided.'
      )
    }

    if (fn.length === 1) {
      // Max<R>(selector: (e: T) => R): R | undefined;
      // One pass over the selector, no parallel mapped array. The old code
      // projected every element into a second list, then walked that list.
      return this.pickExtreme(fn as (e: T) => R, true)
    }

    //fn.length === 2
    // Max(comparer: (a: T, b: T) => number): T | undefined;
    return this.getMaxElement<T>(this._elements, fn as (a: T, b: T) => number)
  }

  /**
   * One pass over the source, projecting each element with selector.
   * chooseMax picks the greater projected value; otherwise the lesser.
   */
  private pickExtreme<R>(selector: (element: T) => R, chooseMax: boolean): R {
    const elements = this._elements
    let best = selector(elements[0]!)
    const comparerToUse = List.getComparer<R>(best)
    if (!comparerToUse) {
      throw new Error('InvalidOperationException: No comparer available.')
    }
    for (let i = 1; i < elements.length; i++) {
      const candidate = selector(elements[i]!)
      const comparison = comparerToUse(candidate, best)
      if (chooseMax ? comparison > 0 : comparison < 0) {
        best = candidate
      }
    }
    return best
  }

  /**
   * Returns the maximum value in a generic sequence.
   * @param elements - The array of elements to find the maximum from.
   * @param customComparer - An optional custom comparison function.
   */
  private getMaxElement<R>(
    elements: R[],
    customComparer?: (a: R, b: R) => number
  ) {
    const comparerToUse = customComparer ?? List.getComparer<R>(elements[0]!)

    if (!comparerToUse) {
      throw new Error('InvalidOperationException: No comparer available.')
    }

    return elements.reduce(
      (currentMax, elem) =>
        comparerToUse(elem, currentMax) > 0 ? elem : currentMax,
      elements[0]!
    )
  }

  /**
   * Gets the minimum value in a generic sequence.
   * @returns The minimum value in the sequence, or undefined if the sequence is empty.
   */
  public Min(): T | undefined

  /**
   * Gets the minimum value in a generic sequence.
   * @returns The minimum value in the sequence, or undefined if the sequence is empty.
   * @param selector - A function to select a value from each element for comparison.
   */
  public Min<R>(selector: (e: T) => R): R | undefined

  /**
   * Gets the minimum value in a generic sequence.
   * @returns The minimum value in the sequence, or undefined if the sequence is empty.
   * @param comparer - A custom comparison function
   */
  public Min(comparer: (a: T, b: T) => number): T | undefined

  /**
   * Gets the minimum value in a generic sequence.
   * @returns The minimum value in the sequence, or undefined if the sequence is empty.
   * @param comparerOrSelector - An optional custom comparison function or a selector function to select a value from each element for comparison.
   */
  public Min<R>(
    comparerOrSelector?: ((a: T, b: T) => number) | ((e: T) => R)
  ): T | R | undefined {
    if (this._elements.length === 0) return undefined

    if (!comparerOrSelector) {
      // Min(): T | undefined;
      return this.getMinElement<T>(this._elements)
    }

    const fn = comparerOrSelector as Function

    if (!fn || fn.length > 2 || fn.length === 0) {
      throw new Error(
        'InvalidOperationException: Invalid comparer or selector function provided.'
      )
    }

    if (fn.length === 1) {
      // Min<R>(selector: (e: T) => R): R | undefined;
      // One pass over the selector, no parallel mapped array. The old code
      // projected every element into a second list, then walked that list.
      return this.pickExtreme(fn as (e: T) => R, false)
    }

    //fn.length === 2
    // Min(comparer: (a: T, b: T) => number): T | undefined;
    return this.getMinElement<T>(this._elements, fn as (a: T, b: T) => number)
  }

  /**
   * Returns the minimum value in a generic sequence.
   * @param elements - The array of elements to find the minimum from.
   * @param customComparer - An optional custom comparison function.
   */
  private getMinElement<R>(
    elements: R[],
    customComparer?: (a: R, b: R) => number
  ) {
    /* c8 ignore next 5 */
    if (elements.length === 0) {
      throw new Error(
        'InvalidOperationException: Sequence contains no elements.'
      )
    }

    const comparerToUse = customComparer ?? List.getComparer<R>(elements[0]!)

    if (!comparerToUse) {
      throw new Error('InvalidOperationException: No comparer available.')
    }

    return elements.reduce(
      (currentMin, elem) =>
        comparerToUse(elem, currentMin) < 0 ? elem : currentMin,
      elements[0]!
    )
  }

  /**
   * Filters the elements of a sequence based on a specified type.
   */
  public OfType<U>(type: any): List<U> {
    let typeName: string | null
    switch (type) {
      case Number:
        typeName = typeof 0
        break
      case String:
        typeName = typeof ''
        break
      case Boolean:
        typeName = typeof true
        break
      case Function:
        typeName = 'function'
        break
      default:
        typeName = null
        break
    }
    return typeName === null
      ? this.Where(x => x instanceof type).Cast<U>()
      : this.Where(x => typeof x === typeName).Cast<U>()
  }

  /**
   * Sorts the elements of a sequence in ascending order according to a key.
   */
  public OrderBy(
    keySelector: (key: T) => any,
    comparer = keyComparer(keySelector, false)
  ): List<T> {
    // tslint:disable-next-line: no-use-before-declare
    return new OrderedList<T>(this._elements, comparer)
  }

  /**
   * Sorts the elements of a sequence in descending order according to a key.
   */
  public OrderByDescending(
    keySelector: (key: T) => any,
    comparer = keyComparer(keySelector, true)
  ): List<T> {
    // tslint:disable-next-line: no-use-before-declare
    return new OrderedList<T>(this._elements, comparer)
  }

  /**
   * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
   */
  public ThenBy(keySelector: (key: T) => any): List<T> {
    return this.OrderBy(keySelector)
  }

  /**
   * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
   */
  public ThenByDescending(keySelector: (key: T) => any): List<T> {
    return this.OrderByDescending(keySelector)
  }

  /**
   * Removes the first occurrence of a specific object from the List<T>.
   */
  public Remove(element: T): boolean {
    return this.IndexOf(element) !== -1
      ? (this.RemoveAt(this.IndexOf(element)), true)
      : false
  }

  /**
   * Removes all the elements that match the conditions defined by the specified predicate.
   */
  public RemoveAll(predicate: PredicateType<T>): this {
    return this.Where((value, index, list) => !predicate(value, index, list))
  }

  /**
   * Removes the element at the specified index of the List<T>.
   */
  public RemoveAt(index: number): void {
    if (index < 0 || index >= this._elements.length) {
      throw new Error('Index is out of range.')
    }
    this._elements.splice(index, 1)
  }

  /**
   * Reverses the order of the elements in the entire List<T>.
   */
  public Reverse(): this {
    // Copy, then reverse the copy. this._elements.reverse() mutated the source.
    const copy = this._elements.slice()
    copy.reverse()
    return this.cloneWith(copy)
  }

  /**
   * Projects each element of a sequence into a new form.
   */
  public Select<TOut>(
    selector: (element: T, index: number) => TOut
  ): List<TOut> {
    return new List<TOut>(own(this._elements.map(selector)))
  }

  /**
   * Projects each element of a sequence to a List<any> and flattens the resulting sequences into one sequence.
   */
  public SelectMany<TOut extends List<any>>(
    selector: (element: T, index: number) => TOut
  ): TOut {
    // Run the selector once per element into one buffer.
    const result: any[] = []
    const elements = this._elements
    for (let i = 0; i < elements.length; i++) {
      const nested = elementsOf(selector(elements[i]!, i))
      for (let j = 0; j < nested.length; j++) {
        result.push(nested[j])
      }
    }
    return (new List<any>(own(result)) as unknown) as TOut
  }

  /**
   * Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.
   */
  public SequenceEqual(list: List<T>): boolean {
    // Compare length, then index i with ===.
    const left = this._elements
    const right = elementsOf(list)
    if (left.length !== right.length) {
      return false
    }
    for (let i = 0; i < left.length; i++) {
      if (left[i] !== right[i]) {
        return false
      }
    }
    return true
  }

  /**
   * Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
   */
  public Single(predicate?: PredicateType<T>): T {
    const elements = this._elements
    if (!predicate) {
      if (elements.length !== 1) {
        throw new Error('The collection does not contain exactly one element.')
      }
      return elements[0]!
    }
    let match: T | undefined
    let found = false
    // One pass that counts matches.
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i]!
      if (predicate(element, i, elements)) {
        if (found) {
          throw new Error(
            'The collection does not contain exactly one element.'
          )
        }
        found = true
        match = element
      }
    }
    if (!found) {
      throw new Error('The collection does not contain exactly one element.')
    }
    return match!
  }

  /**
   * Returns the only element of a sequence, or a default value if the sequence is empty;
   * this method throws an exception if there is more than one element in the sequence.
   */
  public SingleOrDefault(defaultValue: T): T {
    return this.Count() ? this.Single() : defaultValue
  }
  /**
   * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
   */
  public Skip(amount: number): this {
    return this.cloneWith(this._elements.slice(Math.max(0, amount)))
  }

  /**
   * Omit the last specified number of elements in a sequence and then returns the remaining elements.
   */
  public SkipLast(amount: number): this {
    // amount 0 returns every element; a negative amount throws.
    if (amount < 0) {
      throw countOutOfRange()
    }
    const end = this.Count() - amount
    return this.cloneWith(this._elements.slice(0, end > 0 ? end : 0))
  }

  /**
   * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
   */
  public SkipWhile(predicate: PredicateType<T>): this {
    // Stop calling the predicate after the first failure, then slice once.
    const elements = this._elements
    let i = 0
    while (i < elements.length && predicate(elements[i]!, i, elements)) {
      i++
    }
    return this.cloneWith(elements.slice(i))
  }

  /**
   * Computes the sum of the sequence of number values that are obtained by invoking
   * a transform function on each element of the input sequence.
   */
  public Sum(
    transform?: (value?: T, index?: number, list?: T[]) => number
  ): number {
    let sum = 0
    const elements = this._elements
    if (transform) {
      // One pass over the transform.
      for (let i = 0; i < elements.length; i++) {
        sum += +transform(elements[i], i, elements)
      }
    } else {
      for (let i = 0; i < elements.length; i++) {
        sum += +(elements[i] as any)
      }
    }
    return sum
  }

  /**
   * Returns a specified number of contiguous elements from the start of a sequence.
   */
  public Take(amount: number): this {
    return this.cloneWith(this._elements.slice(0, Math.max(0, amount)))
  }

  /**
   * Returns a specified number of contiguous elements from the end of a sequence.
   */
  public TakeLast(amount: number): this {
    if (amount < 0) {
      throw countOutOfRange()
    }
    if (amount === 0) {
      return this.cloneWith([])
    }
    const start = this.Count() - amount
    return this.cloneWith(this._elements.slice(start > 0 ? start : 0))
  }

  /**
   * Returns elements from a sequence as long as a specified condition is true.
   */
  public TakeWhile(predicate: PredicateType<T>): this {
    // Stop calling the predicate after the first failure, then slice once.
    const elements = this._elements
    let i = 0
    while (i < elements.length && predicate(elements[i]!, i, elements)) {
      i++
    }
    return this.cloneWith(elements.slice(0, i))
  }

  /**
   * Copies the elements of the List<T> to a new array.
   */
  public ToArray(): T[] {
    // Shallow copy of the internal buffer.
    return this._elements.slice()
  }

  /**
   * Creates a Dictionary<TKey, TValue> from a List<T> according to a specified key selector function.
   */
  public ToDictionary<TKey, TValue>(
    key: (key: T) => TKey,
    value?: (value: T) => TValue
  ): List<{ Key: TKey; Value: T | TValue }> {
    // One pass into a List of {Key, Value} pairs.
    const elements = this._elements
    const result = new Array<{ Key: TKey; Value: T | TValue }>(elements.length)
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i]!
      result[i] = {
        Key: key(element),
        Value: value ? value(element) : element
      }
    }
    return new List<{ Key: TKey; Value: T | TValue }>(own(result))
  }

  /**
   * Creates a List<T> from an Enumerable.List<T>.
   */
  public ToList(): List<T> {
    return this
  }

  /**
   * Creates a Lookup<TKey, TElement> from an IEnumerable<T> according to specified key selector and element selector functions.
   */
  public ToLookup<TResult>(
    keySelector: (key: T) => string | number,
    elementSelector: (element: T) => TResult
  ): { [key: string]: TResult[] } {
    return this.GroupBy(keySelector, elementSelector)
  }

  /**
   * Produces the set union of two sequences by using the default equality comparer.
   */
  public Union(list: List<T>): this {
    return this.Concat(list).Distinct()
  }

  /**
   * Filters a sequence of values based on a predicate.
   */
  public Where(predicate: PredicateType<T>): this {
    return this.cloneWith(this._elements.filter(predicate))
  }

  /**
   * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
   */
  public Zip<U, TOut>(
    list: List<U>,
    result: (first: T, second: U) => TOut
  ): List<TOut> {
    return list.Count() < this.Count()
      ? list.Select((x, y) => result(this.ElementAt(y), x))
      : this.Select((x, y) => result(x, list.ElementAt(y)))
  }
}

/**
 * Represents a sorted sequence. The methods of this class are implemented by using deferred execution.
 * The immediate return value is an object that stores all the information that is required to perform the action.
 * The query represented by this method is not executed until the object is enumerated either by
 * calling its ToDictionary, ToLookup, ToList or ToArray methods
 */
class OrderedList<T> extends List<T> {
  constructor(elements: T[], private _comparer: (a: T, b: T) => number) {
    super(elements)
    this._elements.sort(this._comparer)
  }

  /**
   * Keeps the resulting list ordered with the receiver's comparer.
   * Overridden because the OrderedList constructor signature differs
   * from the `(elements: T[])` one assumed by the base implementation.
   * @override
   */
  protected cloneWith(elements: T[]): this {
    return new OrderedList<T>(own(elements), this._comparer) as this
  }

  /**
   * Allows you to get the parent List out of the OrderedList
   * @override
   * @returns and ordered list turned into a regular List<T>
   */
  public ToList(): List<T> {
    return new List<T>(this._elements)
  }

  /**
   * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
   * @override
   */
  public ThenBy(keySelector: (key: T) => any): List<T> {
    return new OrderedList(
      this._elements,
      composeComparers(this._comparer, keyComparer(keySelector, false))
    )
  }

  /**
   * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
   * @override
   */
  public ThenByDescending(keySelector: (key: T) => any): List<T> {
    return new OrderedList(
      this._elements,
      composeComparers(this._comparer, keyComparer(keySelector, true))
    )
  }
}

export default List
