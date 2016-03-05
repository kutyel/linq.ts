///<reference path='./node_modules/immutable/dist/immutable.d.ts'/>

import * as Immutable from 'immutable';

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
    constructor(elements: T[] = []) {
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
    public Aggregate(accumulator: (accum: any, value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => any, initialValue?: T) {
        this._elements.reduce(accumulator, initialValue);    
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
     * Computes the average of a sequence of number values that are obtained by invoking a transform function on each element of the input sequence.
     */
    public Average(TSource: (value?: T, index?: number, iter?: Immutable.Iterable<number, any>) => any = f => f): number {
        return this._elements.map(TSource).reduce((ac, v) => {ac += v; return ac;}, 0) / this._elements.map(TSource).count();
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
     * Returns the elements of the specified sequence or the type parameter's default value in a singleton collection if the sequence is empty.
     */
    public DefaultIfEmpty(fn) {
        return this._elements;
    }
    
    /**
     * Returns distinct elements from a sequence by using the default equality comparer to compare values.
     */
    public Distinct(fn) {
        return this._elements;
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
    public ElementAtOrDefault(index: number): any {
        return this.ElementAt(index) || 0;
    }
     
    /**
     * Produces the set difference of two sequences by using the default equality comparer to compare values.
     */
    public Except(fn) {
        return this._elements;
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
    public FirstOrDefault(): any {
        return this._elements.count() ? this.First() : 0;
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
    public GroupBy(grouper: (value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => any)
                                    : Immutable.Seq.Keyed<any, Immutable.Iterable<number, T>> {
        return this._elements.groupBy(grouper);
    }
    
    /**
     * Correlates the elements of two sequences based on equality of keys and groups the results.
     * The default equality comparer is used to compare keys.
     */
    public GroupJoin(fn) {
        return this._elements;
    }
    
    /**
     * Produces the set intersection of two sequences by using the default equality comparer to compare values.
     */
    public Intersect(fn) {
        return this._elements;
    }
    
    /**
     * Correlates the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.
     */
    public Join(fn) {
        return this._elements;
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
    public LastOrDefault(): any {
        return this._elements.count() ? this.Last() : 0;
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
    public ThenBy(fn) {
        return this._elements;
    }
    
    /**
     * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
     */
    public ThenByDescending(fn) {
        return this._elements;
    }
    
    /**
     * Generates a sequence of integral numbers within a specified range.
     */
    public Range(fn) {
        return this._elements; // TODO: Use an ES6 Generator!
    }
    
    /**
     * Generates a sequence that contains one repeated value.
     */
    public Repeat(fn) {
        return this._elements; // TODO: Use an ES6 Generator!
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
    public SelectMany(fn) {
        return this._elements;
    }
    
    /**
     * Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.
     */
    public SequenceEqual(fn) {
        return this._elements;
    }
    
    /**
     * Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
     */
    public Single(fn) {
        return this._elements;
    }
    
    /**
     * Returns the only element of a sequence, or a default value if the sequence is empty;
     * this method throws an exception if there is more than one element in the sequence.
     */
    public SingleOrDefault(fn) {
        return this._elements;
    }
    
    /**
     * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
     */
    public Skip(fn) {
        return this._elements;
    }
    
    /**
     * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
     */
    public SkipWhile(fn) {
        return this._elements;
    }
    
    /**
     * Computes the sum of the sequence of number values that are obtained by invoking a transform function on each element of the input sequence.
     */
    public Sum(TSource: (value?: T, index?: number, iter?: Immutable.Iterable<number, any>) => any = f => f): number {
        return this._elements.map(TSource).reduce((ac, v) => {ac += v; return ac;}, 0);
    }
    
    /**
     * Returns a specified number of contiguous elements from the start of a sequence.
     */
    public Take(fn) {
        return this._elements;
    }
    
    /**
     * Returns elements from a sequence as long as a specified condition is true.
     */
    public TakeWhile(fn) {
        return this._elements;
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
    public ToDictionary(TKey: (value?: T, index?: number, iter?: Immutable.Iterable<number, any>) => any,
                        TValue?: (value?: T, index?: number, iter?: Immutable.Iterable<number, any>) => any): any {
        return this._elements.reduce((o, v, i) => { o[this._elements.map(TKey)[i]] = TValue ? this._elements.map(TValue)[i] : v; return o; }, {});
    }
    
    /**
     * Creates a List<T> from an Immutable.List<T>.
     */
    public ToList(): Immutable.List<T> {
        return this._elements.toList();
    }
    
    /**
     * Produces the set union of two sequences by using the default equality comparer.
     */
    public Union(fn) {
        return this._elements;
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
