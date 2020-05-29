import { composeComparers, negate, isObj, equal, keyComparer } from './helpers'

class List<T> {
  protected _elements: T[]

  /**
   * Defaults the elements of the list
   */
  constructor(elements: T[] = []) {
    this._elements = elements
  }

  /**
   * Adds an object to the end of the List<T>.
   */
  public Add(element: T): void {
    this._elements.push(element)
  }

  /**
   * Adds the elements of the specified collection to the end of the List<T>.
   */
  public AddRange(elements: T[]): void {
    this._elements.push(...elements)
  }

  /**
   * Applies an accumulator function over a sequence.
   */
  public Aggregate<U>(
    accumulator: (accum: U, value?: T, index?: number, list?: T[]) => any,
    initialValue?: U
  ): any {
    return this._elements.reduce(accumulator, initialValue)
  }

  /**
   * Determines whether all elements of a sequence satisfy a condition.
   */
  public All(
    predicate: (value?: T, index?: number, list?: T[]) => boolean
  ): boolean {
    return this._elements.every(predicate)
  }

  /**
   * Determines whether a sequence contains any elements.
   */
  public Any(): boolean
  public Any(
    predicate: (value?: T, index?: number, list?: T[]) => boolean
  ): boolean
  public Any(
    predicate?: (value?: T, index?: number, list?: T[]) => boolean
  ): boolean {
    return predicate
      ? this._elements.some(predicate)
      : this._elements.length > 0
  }

  /**
   * Computes the average of a sequence of number values that are obtained by invoking
   * a transform function on each element of the input sequence.
   */
  public Average(): number
  public Average(
    transform: (value?: T, index?: number, list?: T[]) => any
  ): number
  public Average(
    transform?: (value?: T, index?: number, list?: T[]) => any
  ): number {
    return this.Sum(transform) / this.Count(transform)
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
  public Concat(list: List<T>): List<T> {
    return new List<T>(this._elements.concat(list.ToArray()))
  }

  /**
   * Determines whether an element is in the List<T>.
   */
  public Contains(element: T): boolean {
    return this._elements.some(x => x === element)
  }

  /**
   * Returns the number of elements in a sequence.
   */
  public Count(): number
  public Count(
    predicate: (value?: T, index?: number, list?: T[]) => boolean
  ): number
  public Count(
    predicate?: (value?: T, index?: number, list?: T[]) => boolean
  ): number {
    return predicate ? this.Where(predicate).Count() : this._elements.length
  }

  /**
   * Returns the elements of the specified sequence or the type parameter's default value
   * in a singleton collection if the sequence is empty.
   */
  public DefaultIfEmpty(defaultValue?: T): List<T> {
    return this.Count() ? this : new List<T>([defaultValue])
  }

  /**
   * Returns distinct elements from a sequence by using the default equality comparer to compare values.
   */
  public Distinct(): List<T> {
    return this.Where(
      (value, index, iter) =>
        (isObj(value)
          ? iter.findIndex(obj => equal(obj, value))
          : iter.indexOf(value)) === index
    )
  }

  /**
   * Returns distinct elements from a sequence according to specified key selector.
   */
  public DistinctBy(keySelector: (key: T) => string | number): List<T> {
    const groups = this.GroupBy(keySelector)
    return Object.keys(groups).reduce((res, key) => {
      res.Add(groups[key][0])
      return res
    }, new List<T>())
  }

  /**
   * Returns the element at a specified index in a sequence.
   */
  public ElementAt(index: number): T {
    if (index < this.Count() && index >= 0) {
      return this._elements[index]
    } else {
      const MSG =
        'ArgumentOutOfRangeException: index is less than 0 or greater than or equal to the number of elements in source.'
      throw new Error(MSG)
    }
  }

  /**
   * Returns the element at a specified index in a sequence or a default value if the index is out of range.
   */
  public ElementAtOrDefault(index: number): T {
    return this.ElementAt(index) !== undefined && this.ElementAt(index)
  }

  /**
   * Produces the set difference of two sequences by using the default equality comparer to compare values.
   */
  public Except(source: List<T>): List<T> {
    return this.Where(x => !source.Contains(x))
  }

  /**
   * Returns the first element of a sequence.
   */
  public First(): T
  public First(predicate: (value?: T, index?: number, list?: T[]) => boolean): T
  public First(
    predicate?: (value?: T, index?: number, list?: T[]) => boolean
  ): T {
    if (this.Count()) {
      return predicate ? this.Where(predicate).First() : this._elements[0]
    } else {
      throw new Error(
        'InvalidOperationException: The source sequence is empty.'
      )
    }
  }

  /**
   * Returns the first element of a sequence, or a default value if the sequence contains no elements.
   */
  public FirstOrDefault(): T
  public FirstOrDefault(
    predicate: (value?: T, index?: number, list?: T[]) => boolean
  ): T
  public FirstOrDefault(
    predicate?: (value?: T, index?: number, list?: T[]) => boolean
  ): T {
    return this.Count(predicate) ? this.First(predicate) : undefined
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
    mapper?: (element: T) => TResult
  ): { [key: string]: TResult[] } {
    const initialValue: { [key: string]: TResult[] } = {}
    if (!mapper) {
      mapper = val => <TResult>(<any>val)
    }
    return this.Aggregate((ac, v) => {
      const key = grouper(v)
      const existingGroup = ac[key]
      const mappedValue = mapper(v)
      if (existingGroup) {
        existingGroup.push(mappedValue)
      } else {
        ac[key] = [mappedValue]
      }
      return ac
    }, initialValue)
  }

  /**
   * Correlates the elements of two sequences based on equality of keys and groups the results.
   * The default equality comparer is used to compare keys.
   */
  public GroupJoin<U>(
    list: List<U>,
    key1: (k: T) => any,
    key2: (k: U) => any,
    result: (first: T, second: List<U>) => any
  ): List<any> {
    return this.Select(x =>
      result(
        x,
        list.Where(z => key1(x) === key2(z))
      )
    )
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
  public Intersect(source: List<T>): List<T> {
    return this.Where(x => source.Contains(x))
  }

  /**
   * Correlates the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.
   */
  public Join<U>(
    list: List<U>,
    key1: (key: T) => any,
    key2: (key: U) => any,
    result: (first: T, second: U) => any
  ): List<any> {
    return this.SelectMany(x =>
      list.Where(y => key2(y) === key1(x)).Select(z => result(x, z))
    )
  }

  /**
   * Returns the last element of a sequence.
   */
  public Last(): T
  public Last(predicate: (value?: T, index?: number, list?: T[]) => boolean): T
  public Last(
    predicate?: (value?: T, index?: number, list?: T[]) => boolean
  ): T {
    if (this.Count()) {
      return predicate
        ? this.Where(predicate).Last()
        : this._elements[this.Count() - 1]
    } else {
      throw Error('InvalidOperationException: The source sequence is empty.')
    }
  }

  /**
   * Returns the last element of a sequence, or a default value if the sequence contains no elements.
   */
  public LastOrDefault(): T
  public LastOrDefault(
    predicate: (value?: T, index?: number, list?: T[]) => boolean
  ): T
  public LastOrDefault(
    predicate?: (value?: T, index?: number, list?: T[]) => boolean
  ): T {
    return this.Count(predicate) ? this.Last(predicate) : undefined
  }

  /**
   * Returns the maximum value in a generic sequence.
   */
  public Max(): number
  public Max(selector: (value: T, index: number, array: T[]) => number): number
  public Max(
    selector?: (value: T, index: number, array: T[]) => number
  ): number {
    const id = x => x
    return Math.max(...this._elements.map(selector || id))
  }

  /**
   * Returns the minimum value in a generic sequence.
   */
  public Min(): number
  public Min(selector: (value: T, index: number, array: T[]) => number): number
  public Min(
    selector?: (value: T, index: number, array: T[]) => number
  ): number {
    const id = x => x
    return Math.min(...this._elements.map(selector || id))
  }

  /**
   * Filters the elements of a sequence based on a specified type.
   */
  public OfType<U>(type: any): List<U> {
    let typeName
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
        typeName = typeof function() {} // tslint:disable-line no-empty
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
    return new OrderedList<T>(this._elements, comparer)
  }

  /**
   * Sorts the elements of a sequence in descending order according to a key.
   */
  public OrderByDescending(
    keySelector: (key: T) => any,
    comparer = keyComparer(keySelector, true)
  ): List<T> {
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
  public RemoveAll(
    predicate: (value?: T, index?: number, list?: T[]) => boolean
  ): List<T> {
    return this.Where(negate(predicate))
  }

  /**
   * Removes the element at the specified index of the List<T>.
   */
  public RemoveAt(index: number): void {
    this._elements.splice(index, 1)
  }

  /**
   * Reverses the order of the elements in the entire List<T>.
   */
  public Reverse(): List<T> {
    return new List<T>(this._elements.reverse())
  }

  /**
   * Projects each element of a sequence into a new form.
   */
  public Select<TOut>(
    selector: (element: T, index: number) => TOut
  ): List<TOut> {
    return new List<TOut>(this._elements.map(selector))
  }

  /**
   * Projects each element of a sequence to a List<any> and flattens the resulting sequences into one sequence.
   */
  public SelectMany<TOut extends List<any>>(
    selector: (element: T, index: number) => TOut
  ): TOut {
    return this.Aggregate(
      (ac, _, i) => (
        ac.AddRange(
          this.Select(selector)
            .ElementAt(i)
            .ToArray()
        ),
        ac
      ),
      new List<TOut>()
    )
  }

  /**
   * Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.
   */
  public SequenceEqual(list: List<T>): boolean {
    return !!this._elements.reduce((x, y, z) =>
      list._elements[z] === y ? x : undefined
    )
  }

  /**
   * Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
   */
  public Single(
    predicate?: (value?: T, index?: number, list?: T[]) => boolean
  ): T {
    if (this.Count(predicate) !== 1) {
      throw new Error('The collection does not contain exactly one element.')
    } else {
      return this.First(predicate)
    }
  }

  /**
   * Returns the only element of a sequence, or a default value if the sequence is empty;
   * this method throws an exception if there is more than one element in the sequence.
   */
  public SingleOrDefault(
    predicate?: (value?: T, index?: number, list?: T[]) => boolean
  ): T {
    return this.Count(predicate) ? this.Single(predicate) : undefined
  }

  /**
   * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
   */
  public Skip(amount: number): List<T> {
    return new List<T>(this._elements.slice(Math.max(0, amount)))
  }

  /**
   * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
   */
  public SkipWhile(
    predicate: (value?: T, index?: number, list?: T[]) => boolean
  ): List<T> {
    return this.Skip(
      this.Aggregate(ac => (predicate(this.ElementAt(ac)) ? ++ac : ac), 0)
    )
  }

  /**
   * Computes the sum of the sequence of number values that are obtained by invoking
   * a transform function on each element of the input sequence.
   */
  public Sum(): number
  public Sum(
    transform: (value?: T, index?: number, list?: T[]) => number
  ): number
  public Sum(
    transform?: (value?: T, index?: number, list?: T[]) => number
  ): number {
    return transform
      ? this.Select(transform).Sum()
      : this.Aggregate((ac, v) => (ac += +v), 0)
  }

  /**
   * Returns a specified number of contiguous elements from the start of a sequence.
   */
  public Take(amount: number): List<T> {
    return new List<T>(this._elements.slice(0, Math.max(0, amount)))
  }

  /**
   * Returns elements from a sequence as long as a specified condition is true.
   */
  public TakeWhile(
    predicate: (value?: T, index?: number, list?: T[]) => boolean
  ): List<T> {
    return this.Take(
      this.Aggregate(ac => (predicate(this.ElementAt(ac)) ? ++ac : ac), 0)
    )
  }

  /**
   * Copies the elements of the List<T> to a new array.
   */
  public ToArray(): T[] {
    return this._elements
  }

  /**
   * Creates a Dictionary<TKey, TValue> from a List<T> according to a specified key selector function.
   */
  public ToDictionary<TKey>(
    key: (key: T) => TKey
  ): List<{ Key: TKey; Value: T }>
  public ToDictionary<TKey, TValue>(
    key: (key: T) => TKey,
    value: (value: T) => TValue
  ): List<{ Key: TKey; Value: T | TValue }>
  public ToDictionary<TKey, TValue>(
    key: (key: T) => TKey,
    value?: (value: T) => TValue
  ): List<{ Key: TKey; Value: T | TValue }> {
    return this.Aggregate((dicc, v, i) => {
      dicc[
        this.Select(key)
          .ElementAt(i)
          .toString()
      ] = value ? this.Select(value).ElementAt(i) : v
      dicc.Add({
        Key: this.Select(key).ElementAt(i),
        Value: value ? this.Select(value).ElementAt(i) : v
      })
      return dicc
    }, new List<{ Key: TKey; Value: T | TValue }>())
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
  public Union(list: List<T>): List<T> {
    return this.Concat(list).Distinct()
  }

  /**
   * Filters a sequence of values based on a predicate.
   */
  public Where(
    predicate: (value?: T, index?: number, list?: T[]) => boolean
  ): List<T> {
    return new List<T>(this._elements.filter(predicate))
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
