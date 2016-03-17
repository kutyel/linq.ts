/**
 * LinQ to TypeScript
 *
 * Documentation from LinQ .NET specification (https://msdn.microsoft.com/en-us/library/system.linq.enumerable.aspx)
 *
 * Created by Flavio Corpa (@kutyel)
 * Copyright © 2016 Flavio Corpa. All rights reserved.
 *
 */
export class List<T> {

    private _elements: T[];

    /**
     * Defaults the elements of the list
     */
    constructor(elements?: T[]) {
        this._elements = elements || [];
    }

    /**
     * Adds an object to the end of the List<T>.
     */
    public Add(element: T): void {
        this._elements.push(element);
    }

    /**
     * Adds the elements of the specified collection to the end of the List<T>.
     */
    public AddRange(elements: T[]): void {
        this._elements.push(...elements);
    }

    /**
     * Applies an accumulator function over a sequence.
     */
    public Aggregate(accumulator: (accum: any, value?: T, index?: number, list?: T[]) => any, initialValue?: any): any {
        return this._elements.reduce(accumulator, initialValue);
    }

    /**
     * Determines whether all elements of a sequence satisfy a condition.
     */
    public All(predicate: (value?: T, index?: number, list?: T[]) => boolean): boolean {
        return this._elements.every(predicate);
    }

    /**
     * Determines whether a sequence contains any elements.
     */
    public Any(predicate: (value?: T, index?: number, list?: T[]) => boolean): boolean {
        return this._elements.some(predicate);
    }

    /**
     * Computes the average of a sequence of number values that are obtained by invoking
     * a transform function on each element of the input sequence.
     */
    public Average(transform?: (value?: T, index?: number, list?: T[]) => any): number {
        return this.Sum(transform) / this.Count(transform);
    }

    /**
     * Concatenates two sequences.
     */
    public Concat(list: List<T>): List<T>  {
        return new List<T>(this._elements.concat(list.ToArray()));
    }

    /**
     * Determines whether an element is in the List<T>.
     */
    public Contains(element: T): boolean {
        return this._elements.some(x => x === element);
    }

    /**
     * Returns the number of elements in a sequence.
     */
    public Count(): number;
    public Count(predicate: (value?: T, index?: number, list?: T[]) => boolean): number;
    public Count(predicate?: (value?: T, index?: number, list?: T[]) => boolean): number {
        return predicate ? this.Where(predicate).Count() : this._elements.length;
    }

    /**
     * Returns the elements of the specified sequence or the type parameter's default value
     * in a singleton collection if the sequence is empty.
     */
    public DefaultIfEmpty(): T {
        return this._elements[0]; // TODO
    }

    /**
     * Returns distinct elements from a sequence by using the default equality comparer to compare values.
     */
    public Distinct(): List<T> {
        return this.Where((value, index, iter) => iter.indexOf(value) === index);
    }

    /**
     * Returns the element at a specified index in a sequence.
     */
    public ElementAt(index: number): T {
        return this._elements[index];
    }

    /**
     * Returns the element at a specified index in a sequence or a default value if the index is out of range.
     */
    public ElementAtOrDefault(index: number): T {
        return this.ElementAt(index) || undefined;
    }

    /**
     * Produces the set difference of two sequences by using the default equality comparer to compare values.
     */
    public Except(source: List<T>): List<T> {
        return this.Where(x => !source.Contains(x));
    }

    /**
     * Returns the first element of a sequence.
     */
    public First(): T;
    public First(predicate: (value?: T, index?: number, list?: T[]) => boolean): T;
    public First(predicate?: (value?: T, index?: number, list?: T[]) => boolean): T {
        return predicate ? this.Where(predicate).First() : this._elements[0];
    }

    /**
     * Returns the first element of a sequence, or a default value if the sequence contains no elements.
     */
    public FirstOrDefault(): T;
    public FirstOrDefault(predicate: (value?: T, index?: number, list?: T[]) => boolean): T;
    public FirstOrDefault(predicate?: (value?: T, index?: number, list?: T[]) => boolean): T {
        return this.Count() ? this.First() : undefined;
    }

    /**
     * Performs the specified action on each element of the List<T>.
     */
    public ForEach(action: (value?: T, index?: number, list?: T[]) => any): void {
        return this._elements.forEach(action);
    }

    /**
     * Groups the elements of a sequence according to a specified key selector function.
     */
    public GroupBy(grouper: (value?: T, index?: number, list?: T[]) => any): List<T> {
        return this; // TODO
    }

    /**
     * Correlates the elements of two sequences based on equality of keys and groups the results.
     * The default equality comparer is used to compare keys.
     */
    public GroupJoin(): List<any> {
        return this; // TODO
    }

    /**
     * Produces the set intersection of two sequences by using the default equality comparer to compare values.
     */
    public Intersect(source: List<T>): List<T> {
        return this.Where(x => source.Contains(x));
    }

    /**
     * Correlates the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.
     */
    public Join(): List<any> {
        return this; // TODO
    }

    /**
     * Returns the last element of a sequence.
     */
    public Last(): T;
    public Last(predicate: (value?: T, index?: number, list?: T[]) => boolean): T;
    public Last(predicate?: (value?: T, index?: number, list?: T[]) => boolean): T {
        return predicate ? this.Where(predicate).Last() : this._elements[this.Count() - 1];
    }

    /**
     * Returns the last element of a sequence, or a default value if the sequence contains no elements.
     */
    public LastOrDefault(): T;
    public LastOrDefault(predicate: (value?: T, index?: number, list?: T[]) => boolean): T;
    public LastOrDefault(predicate?: (value?: T, index?: number, list?: T[]) => boolean): T {
        return this.Count() ? this.Last() : undefined;
    }

    /**
     * Returns the maximum value in a generic sequence.
     */
    public Max(): T {
        return this.Aggregate((x, y) => x > y ? x : y);
    }

    /**
     * Returns the minimum value in a generic sequence.
     */
    public Min(): T {
        return this.Aggregate((x, y) => x < y ? x : y);
    }

    /**
     * Sorts the elements of a sequence in ascending order according to a key.
     */
    public OrderBy(comparator?: (a: T, b: T) => number): List<T> {
        return new List<T>(this._elements.sort(comparator));
    }

    /**
     * Sorts the elements of a sequence in descending order according to a key.
     */
    public OrderByDescending(comparator?: (a: T, b: T) => number): List<T> {
        return new List<T>(this._elements.sort(comparator).reverse());
    }

    /**
     * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
     */
    public ThenBy(): List<T> {
        return this; // TODO
    }

    /**
     * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
     */
    public ThenByDescending(): List<T> {
        return this; // TODO
    }

    /**
     * Reverses the order of the elements in the entire List<T>.
     */
    public Reverse(): List<T> {
        return new List<T>(this._elements.reverse());
    }

    /**
     * Projects each element of a sequence into a new form.
     */
    public Select(mapper: (value?: T, index?: number, list?: T[]) => any): List<any> {
        return new List<any>(this._elements.map(mapper));
    }

    /**
     * Projects each element of a sequence to an IEnumerable<T> and flattens the resulting sequences into one sequence.
     */
    public SelectMany(): List<any> {
        return this; // TODO
    }

    /**
     * Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.
     */
    public SequenceEqual(list: List<T>): boolean {
        return !!this._elements.reduce((x, y, z) => list._elements[z] === y ? x : undefined);
    }

    /**
     * Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
     */
    public Single(): T | TypeError {
        if (this.Count() !== 1) {
            throw new TypeError("The collection does not contain exactly one element.");
        } else {
            return this.First();
        }
    }

    /**
     * Returns the only element of a sequence, or a default value if the sequence is empty;
     * this method throws an exception if there is more than one element in the sequence.
     */
    public SingleOrDefault(): T | TypeError {
        return this.Count() ? this.Single() : undefined;
    }

    /**
     * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
     */
    public Skip(amount: number): List<T> {
        return new List<T>(this._elements.slice(Math.max(0, amount)));
    }

    /**
     * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
     */
    public SkipWhile(predicate: (value?: T, index?: number, list?: T[]) => boolean): List<T> {
        return this.Skip(this.Aggregate((ac, val) => predicate(this.ElementAt(ac)) ? ++ac : ac, 0));
    }

    /**
     * Computes the sum of the sequence of number values that are obtained by invoking
     * a transform function on each element of the input sequence.
     */
    public Sum(transform?: (value?: T, index?: number, list?: T[]) => number): number {
        return this.Select(transform).Aggregate((ac, v) => { ac += v; return ac; }, 0);
    }

    /**
     * Returns a specified number of contiguous elements from the start of a sequence.
     */
    public Take(amount: number): List<T> {
        return new List<T>(this._elements.slice(0, Math.max(0, amount)));
    }

    /**
     * Returns elements from a sequence as long as a specified condition is true.
     */
    public TakeWhile(predicate: (value?: T, index?: number, list?: T[]) => boolean): List<T> {
        return this.Take(this.Aggregate((ac, val) => predicate(this.ElementAt(ac)) ? ++ac : ac, 0));
    }

    /**
     * Copies the elements of the List<T> to a new array.
     */
    public ToArray(): T[] {
        return this._elements;
    }

    /**
     * Creates a Dictionary<TKey, TValue> from a List<T> according to a specified key selector function.
     */
    public ToDictionary(key: (value?: T, index?: number, list?: T[]) => any, value?: (value?: T, index?: number, list?: T[]) => any): any {
        return this._elements.reduce((o, v, i) => { o[this._elements.map(key)[i]] = value ? this._elements.map(value)[i] : v; return o; });
    }

    /**
     * Creates a List<T> from an Enumerable.List<T>.
     */
    public ToList(): List<T> {
        return this;
    }

    /**
     * Produces the set union of two sequences by using the default equality comparer.
     */
    public Union(list: List<T>): List<T> {
        return this.Concat(list).Distinct();
    }

    /**
     * Filters a sequence of values based on a predicate.
     */
    public Where(predicate: (value?: T, index?: number, list?: T[]) => boolean): List<T> {
        return new List<T>(this._elements.filter(predicate));
    }

    /**
     * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
     */
    public Zip(list: List<any>, result: (first: T, second: any) => any): List<any> {
        return list.Count() < this.Count() ? list.Select((x, y) => result(this.ElementAt(y), x)) :
            this.Select((x, y) => result(x, list.ElementAt(y)));
    }
}

export class Enumerable {

    /**
     * Generates a sequence of integral numbers within a specified range.
     */
    public static *Range(start: number, count: number): IterableIterator<number> {
        while (count--) { yield start++; }
    }

    /**
     * Generates a sequence that contains one repeated value.
     */
    public static *Repeat(element: any, count: number): IterableIterator<any> {
        while (count--) { yield element; }
    }

}
