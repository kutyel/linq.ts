/// <reference path="node_modules/immutable/dist/immutable.d.ts" />
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
export declare class List<T> {
    private _elements;
    /**
     * Defaults the elements of the list
     */
    constructor(elements?: T[]);
    /**
     * Adds an object to the end of the List<T>.
     */
    Add(element: T): List<T>;
    /**
     * Adds the elements of the specified collection to the end of the List<T>.
     */
    AddRange(elements: T[]): List<T>;
    /**
     * Applies an accumulator function over a sequence.
     */
    Aggregate(accumulator: (accum: any, value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => any, initialValue?: T): void;
    /**
     * Determines whether all elements of a sequence satisfy a condition.
     */
    All(predicate: (value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => boolean): boolean;
    /**
     * Determines whether a sequence contains any elements.
     */
    Any(predicate: (value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => boolean): boolean;
    /**
     * Computes the average of a sequence of number values that are obtained by invoking a transform function on each element of the input sequence.
     */
    Average(TSource?: (value?: T, index?: number, iter?: Immutable.Iterable<number, any>) => number): number;
    /**
     * Concatenates two sequences.
     */
    Concat(list: List<T>): List<T>;
    /**
     * Determines whether an element is in the List<T>.
     */
    Contains(element: T): boolean;
    /**
     * Returns the number of elements in a sequence.
     */
    Count(): number;
    Count(predicate: (value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => boolean): number;
    /**
     * Returns the elements of the specified sequence or the type parameter's default value in a singleton collection if the sequence is empty.
     */
    DefaultIfEmpty(fn: any): Immutable.List<T>;
    /**
     * Returns distinct elements from a sequence by using the default equality comparer to compare values.
     */
    Distinct(fn: any): Immutable.List<T>;
    /**
     * Returns the element at a specified index in a sequence.
     */
    ElementAt(index: number): T;
    /**
     * Returns the element at a specified index in a sequence or a default value if the index is out of range.
     */
    ElementAtOrDefault(index: number): any;
    /**
     * Produces the set difference of two sequences by using the default equality comparer to compare values.
     */
    Except(fn: any): Immutable.List<T>;
    /**
     * Returns the first element of a sequence.
     */
    First(): T;
    First(predicate: (value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => boolean): any;
    /**
     * Returns the first element of a sequence, or a default value if the sequence contains no elements.
     */
    FirstOrDefault(): any;
    /**
     * Performs the specified action on each element of the List<T>.
     */
    ForEach(sideEffect: (value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => any): number;
    /**
     * Groups the elements of a sequence according to a specified key selector function.
     */
    GroupBy(grouper: (value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => any): Immutable.Seq.Keyed<any, Immutable.Iterable<number, T>>;
    /**
     * Correlates the elements of two sequences based on equality of keys and groups the results.
     * The default equality comparer is used to compare keys.
     */
    GroupJoin(fn: any): Immutable.List<T>;
    /**
     * Produces the set intersection of two sequences by using the default equality comparer to compare values.
     */
    Intersect(fn: any): Immutable.List<T>;
    /**
     * Correlates the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.
     */
    Join(fn: any): Immutable.List<T>;
    /**
     * Returns the last element of a sequence.
     */
    Last(): T;
    Last(predicate: (value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => boolean): any;
    /**
     * Returns the last element of a sequence, or a default value if the sequence contains no elements.
     */
    LastOrDefault(): any;
    /**
     * Returns the maximum value in a generic sequence.
     */
    Max(comparator?: (a: T, b: T) => number): T;
    /**
     * Returns the minimum value in a generic sequence.
     */
    Min(comparator?: (a: T, b: T) => number): T;
    /**
     * Sorts the elements of a sequence in ascending order according to a key.
     */
    OrderBy(comparator?: (a: T, b: T) => number): List<T>;
    /**
     * Sorts the elements of a sequence in descending order according to a key.
     */
    OrderByDescending(comparator?: (a: T, b: T) => number): List<T>;
    /**
     * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
     */
    ThenBy(fn: any): Immutable.List<T>;
    /**
     * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
     */
    ThenByDescending(fn: any): Immutable.List<T>;
    /**
     * Generates a sequence of integral numbers within a specified range.
     */
    Range(fn: any): Immutable.List<T>;
    /**
     * Generates a sequence that contains one repeated value.
     */
    Repeat(fn: any): Immutable.List<T>;
    /**
     * Reverses the order of the elements in the entire List<T>.
     */
    Reverse(): List<T>;
    /**
     * Projects each element of a sequence into a new form.
     */
    Select(mapper: (value?: T, index?: number, iter?: Immutable.Iterable<number, any>) => any): List<any>;
    /**
     * Projects each element of a sequence to an IEnumerable<T> and flattens the resulting sequences into one sequence.
     */
    SelectMany(fn: any): Immutable.List<T>;
    /**
     * Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.
     */
    SequenceEqual(fn: any): Immutable.List<T>;
    /**
     * Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
     */
    Single(fn: any): Immutable.List<T>;
    /**
     * Returns the only element of a sequence, or a default value if the sequence is empty;
     * this method throws an exception if there is more than one element in the sequence.
     */
    SingleOrDefault(fn: any): Immutable.List<T>;
    /**
     * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
     */
    Skip(amount: number): List<T>;
    /**
     * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
     */
    SkipWhile(predicate: (value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => boolean): List<T>;
    /**
     * Computes the sum of the sequence of number values that are obtained by invoking a transform function on each element of the input sequence.
     */
    Sum(TSource?: (value?: T, index?: number, iter?: Immutable.Iterable<number, any>) => number): number;
    /**
     * Returns a specified number of contiguous elements from the start of a sequence.
     */
    Take(amount: number): List<T>;
    /**
     * Returns elements from a sequence as long as a specified condition is true.
     */
    TakeWhile(predicate: (value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => boolean): List<T>;
    /**
     * Copies the elements of the List<T> to a new array.
     */
    ToArray(): T[];
    /**
     * Creates a Dictionary<TKey, TValue> from a List<T> according to a specified key selector function.
     */
    ToDictionary(TKey: (value?: T, index?: number, iter?: Immutable.Iterable<number, any>) => any, TValue?: (value?: T, index?: number, iter?: Immutable.Iterable<number, any>) => any): any;
    /**
     * Creates an Immutable.List<T> from a List<T>.
     */
    ToList(): Immutable.List<T>;
    /**
     * Produces the set union of two sequences by using the default equality comparer.
     */
    Union(fn: any): Immutable.List<T>;
    /**
     * Filters a sequence of values based on a predicate.
     */
    Where(predicate: (value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => boolean): List<T>;
    /**
     * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
     */
    Zip(iterables: Immutable.Iterable<T, T>[]): Immutable.Iterable.Indexed<T>;
}
