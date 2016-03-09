///<reference path='./node_modules/immutable/dist/immutable.d.ts'/>

import * as Immutable from "immutable";

/**
 * LinQ to TypeScript
 *
 * Documentation from LinQ .NET specification (https://msdn.microsoft.com/en-us/library/s6hkc2c4(v=vs.110).aspx)
 *
 * Created by Flavio Corpa (@kutyel)
 * Copyright © 2016 Flavio Corpa. All rights reserved.
 *
 */
export class List<T> {

    private _elements: Immutable.List<T>;

    /**
     * Defaults the elements of the list
     */
    constructor(elements?: T[]) {
        this._elements = Immutable.List<T>(elements);
    }

    /**
     * Adds an object to the end of the List<T>.
     */
    public Add(element: T): List<T> {
        return new List<T>(this._elements.push(element).toArray());
    }

    /**
     * Adds the elements of the specified collection to the end of the List<T>.
     */
    public AddRange(elements: T[]): List<T> {
        return new List<T>(this._elements.push(...elements).toArray());
    }

    /**
     * Applies an accumulator function over a sequence.
     */
    public Aggregate(accumulator: (accum: any, value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => any,
                     initialValue?: T): any {
        return this._elements.reduce(accumulator, initialValue);
    }

    /**
     * Determines whether all elements of a sequence satisfy a condition.
     */
    public All(predicate: (value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => boolean): boolean {
        return this._elements.every(predicate);
    }

    /**
     * Determines whether a sequence contains any elements.
     */
    public Any(predicate: (value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => boolean): boolean {
        return this._elements.some(predicate);
    }

    /**
     * Computes the average of a sequence of number values that are obtained by invoking
     * a transform function on each element of the input sequence.
     */
    public Average(transform?: (value?: T, index?: number, iter?: Immutable.Iterable<number, any>) => any): number {
        return this.Sum(transform) / this.Count(transform);
    }

    /**
     * Concatenates two sequences.
     */
    public Concat(list: List<T>): List<T>  {
        return this.AddRange(list.ToArray());
    }

    /**
     * Determines whether an element is in the List<T>.
     */
    public Contains(element: T): boolean {
        return this._elements.includes(element);
    }

    /**
     * Returns the number of elements in a sequence.
     */
    public Count(): number;
    public Count(predicate: (value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => boolean): number;
    public Count(predicate?: (value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => boolean): number {
        return this._elements.count(predicate);
    }

    /**
     * Returns the elements of the specified sequence or the type parameter's default value
     * in a singleton collection if the sequence is empty.
     */
    public DefaultIfEmpty(): T {
        return this._elements.first(); // TODO
    }

    /**
     * Returns distinct elements from a sequence by using the default equality comparer to compare values.
     */
    public Distinct(): List<T> {
        return this.Where((value, index, iter) => iter.toList().indexOf(value) === index);
    }

    /**
     * Returns the element at a specified index in a sequence.
     */
    public ElementAt(index: number): T {
        return this._elements.toArray()[index];
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
    public First(predicate: (value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => boolean);
    public First(predicate?: (value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => boolean) {
        return predicate ? this.Where(predicate).First() : this._elements.first();
    }

    /**
     * Returns the first element of a sequence, or a default value if the sequence contains no elements.
     */
    public FirstOrDefault(): T {
        return this._elements.count() ? this.First() : undefined;
    }

    /**
     * Performs the specified action on each element of the List<T>.
     */
    public ForEach(sideEffect: (value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => any): number {
        return this._elements.forEach(sideEffect);
    }

    /**
     * Groups the elements of a sequence according to a specified key selector function.
     */
    public GroupBy(grouper: (value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => any):
                                      Immutable.Seq.Keyed<any, Immutable.Iterable<number, T>> {
        return this._elements.groupBy(grouper);
    }

    /**
     * Correlates the elements of two sequences based on equality of keys and groups the results.
     * The default equality comparer is used to compare keys.
     */
    public GroupJoin() {
        return this._elements; // TODO
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
    public Join() {
        return this._elements; // TODO
    }

    /**
     * Returns the last element of a sequence.
     */
    public Last(): T;
    public Last(predicate: (value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => boolean);
    public Last(predicate?: (value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => boolean) {
        return predicate ? this.Where(predicate).Last() : this._elements.last();
    }

    /**
     * Returns the last element of a sequence, or a default value if the sequence contains no elements.
     */
    public LastOrDefault(): T {
        return this._elements.count() ? this.Last() : undefined;
    }

    /**
     * Returns the maximum value in a generic sequence.
     */
    public Max(comparator?: (a: T, b: T) => number): T {
        return this._elements.max(comparator);
    }

    /**
     * Returns the minimum value in a generic sequence.
     */
    public Min(comparator?: (a: T, b: T) => number): T {
        return this._elements.min(comparator);
    }

    /**
     * Sorts the elements of a sequence in ascending order according to a key.
     */
    public OrderBy(comparator?: (a: T, b: T) => number): List<T> {
        return new List<T>(this._elements.sort(comparator).toArray());
    }

    /**
     * Sorts the elements of a sequence in descending order according to a key.
     */
    public OrderByDescending(comparator?: (a: T, b: T) => number): List<T> {
        return new List<T>(this._elements.sort(comparator).reverse().toArray());
    }

    /**
     * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
     */
    public ThenBy() {
        return this._elements; // TODO
    }

    /**
     * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
     */
    public ThenByDescending() {
        return this._elements; // TODO
    }

    /**
     * Reverses the order of the elements in the entire List<T>.
     */
    public Reverse(): List<T> {
        return new List<T>(this._elements.reverse().toArray());
    }

    /**
     * Projects each element of a sequence into a new form.
     */
    public Select(mapper: (value?: T, index?: number, iter?: Immutable.Iterable<number, any>) => any): List<any> {
        return new List<any>(this._elements.map(mapper).toArray());
    }

    /**
     * Projects each element of a sequence to an IEnumerable<T> and flattens the resulting sequences into one sequence.
     */
    public SelectMany() {
        return this._elements; // TODO
    }

    /**
     * Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.
     */
    public SequenceEqual() {
        return this._elements; // TODO
    }

    /**
     * Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
     */
    public Single() {
        return this._elements; // TODO
    }

    /**
     * Returns the only element of a sequence, or a default value if the sequence is empty;
     * this method throws an exception if there is more than one element in the sequence.
     */
    public SingleOrDefault() {
        return this._elements; // TODO
    }

    /**
     * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
     */
    public Skip(amount: number): List<T> {
        return new List<T>(this._elements.skip(amount).toArray());
    }

    /**
     * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
     */
    public SkipWhile(predicate: (value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => boolean): List<T> {
        return new List<T>(this._elements.skipWhile(predicate).toArray());
    }

    /**
     * Computes the sum of the sequence of number values that are obtained by invoking
     * a transform function on each element of the input sequence.
     */
    public Sum(transform?: (value?: T, index?: number, iter?: Immutable.Iterable<number, any>) => number): number {
        return this._elements.map(transform).reduce((ac: number, v: number) => {ac += v; return ac; }, 0);
    }

    /**
     * Returns a specified number of contiguous elements from the start of a sequence.
     */
    public Take(amount: number): List<T> {
        return new List<T>(this._elements.take(amount).toArray());
    }

    /**
     * Returns elements from a sequence as long as a specified condition is true.
     */
    public TakeWhile(predicate: (value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => boolean): List<T> {
        return new List<T>(this._elements.takeWhile(predicate).toArray());
    }

    /**
     * Copies the elements of the List<T> to a new array.
     */
    public ToArray(): T[] {
        return this._elements.toArray();
    }

    /**
     * Creates a Dictionary<TKey, TValue> from a List<T> according to a specified key selector function.
     */
    public ToDictionary(key: (value?: T, index?: number, iter?: Immutable.Iterable<number, any>) => any,
                        value?: (value?: T, index?: number, iter?: Immutable.Iterable<number, any>) => any): any {
        return this._elements.reduce((o: Object, v: T, i: number) => {
            o[this.Select(key)[i]] = value ? this.Select(value)[i] : v; return o; });
    }

    /**
     * Creates an Immutable.List<T> from a List<T>.
     */
    public ToList(): Immutable.List<T> {
        return this._elements.toList();
    }

    /**
     * Produces the set union of two sequences by using the default equality comparer.
     */
    public Union() {
        return this._elements; // TODO
    }

    /**
     * Filters a sequence of values based on a predicate.
     */
    public Where(predicate: (value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => boolean): List<T> {
        return new List<T>(this._elements.filter(predicate).toArray());
    }

    /**
     * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
     */
    public Zip(iterables: Immutable.Iterable<T, T>[]): Immutable.Iterable.Indexed<T> {
        return this._elements.zip(...iterables);
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
    public static *Repeat(element: any, count: number): IterableIterator<number> {
        while (count--) { yield element; }
    }

}
