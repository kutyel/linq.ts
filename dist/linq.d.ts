/**
 * LinQ to TypeScript
 *
 * Documentation from LinQ .NET specification (https://msdn.microsoft.com/en-us/library/system.linq.enumerable.aspx)
 *
 * Created by Flavio Corpa (@kutyel)
 * Copyright © 2016 Flavio Corpa. All rights reserved.
 *
 */
export declare class List<T> {
    protected _elements: T[];
    /**
     * Defaults the elements of the list
     */
    constructor(elements?: T[]);
    /**
     * Adds an object to the end of the List<T>.
     */
    Add(element: T): void;
    /**
     * Adds the elements of the specified collection to the end of the List<T>.
     */
    AddRange(elements: T[]): void;
    /**
     * Applies an accumulator function over a sequence.
     */
    Aggregate<U>(accumulator: (accum: U, value?: T, index?: number, list?: T[]) => any, initialValue?: U): any;
    /**
     * Determines whether all elements of a sequence satisfy a condition.
     */
    All(predicate: (value?: T, index?: number, list?: T[]) => boolean): boolean;
    /**
     * Determines whether a sequence contains any elements.
     */
    Any(predicate: (value?: T, index?: number, list?: T[]) => boolean): boolean;
    /**
     * Computes the average of a sequence of number values that are obtained by invoking
     * a transform function on each element of the input sequence.
     */
    Average(): number;
    Average(transform: (value?: T, index?: number, list?: T[]) => any): number;
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
    Count(predicate: (value?: T, index?: number, list?: T[]) => boolean): number;
    /**
     * Returns the elements of the specified sequence or the type parameter's default value
     * in a singleton collection if the sequence is empty.
     */
    DefaultIfEmpty(defaultValue?: T): List<T>;
    /**
     * Returns distinct elements from a sequence by using the default equality comparer to compare values.
     */
    Distinct(): List<T>;
    /**
     * Returns the element at a specified index in a sequence.
     */
    ElementAt(index: number): T;
    /**
     * Returns the element at a specified index in a sequence or a default value if the index is out of range.
     */
    ElementAtOrDefault(index: number): T;
    /**
     * Produces the set difference of two sequences by using the default equality comparer to compare values.
     */
    Except(source: List<T>): List<T>;
    /**
     * Returns the first element of a sequence.
     */
    First(): T | Error;
    First(predicate: (value?: T, index?: number, list?: T[]) => boolean): T | Error;
    /**
     * Returns the first element of a sequence, or a default value if the sequence contains no elements.
     */
    FirstOrDefault(): T | Error;
    FirstOrDefault(predicate: (value?: T, index?: number, list?: T[]) => boolean): T | Error;
    /**
     * Performs the specified action on each element of the List<T>.
     */
    ForEach(action: (value?: T, index?: number, list?: T[]) => any): void;
    /**
     * Groups the elements of a sequence according to a specified key selector function.
     */
    GroupBy(grouper: (key: T) => any, mapper: (element: T) => any): any;
    /**
     * Correlates the elements of two sequences based on equality of keys and groups the results.
     * The default equality comparer is used to compare keys.
     */
    GroupJoin<U>(list: List<U>, key1: (k: T) => any, key2: (k: U) => any, result: (first: T, second: List<U>) => any): List<any>;
    /**
     * Returns the index of the first occurence of an element in the List.
     */
    IndexOf(element: T): number;
    /**
     * Inserts an element into the List<T> at the specified index.
     */
    Insert(index: number, element: T): void | Error;
    /**
     * Produces the set intersection of two sequences by using the default equality comparer to compare values.
     */
    Intersect(source: List<T>): List<T>;
    /**
     * Correlates the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.
     */
    Join<U>(list: List<U>, key1: (key: T) => any, key2: (key: U) => any, result: (first: T, second: U) => any): List<any>;
    /**
     * Returns the last element of a sequence.
     */
    Last(): T | Error;
    Last(predicate: (value?: T, index?: number, list?: T[]) => boolean): T | Error;
    /**
     * Returns the last element of a sequence, or a default value if the sequence contains no elements.
     */
    LastOrDefault(): T | Error;
    LastOrDefault(predicate: (value?: T, index?: number, list?: T[]) => boolean): T | Error;
    /**
     * Returns the maximum value in a generic sequence.
     */
    Max(): T;
    /**
     * Returns the minimum value in a generic sequence.
     */
    Min(): T;
    /**
     * Sorts the elements of a sequence in ascending order according to a key.
     */
    OrderBy(keySelector: (key: T) => any): List<T>;
    /**
     * Sorts the elements of a sequence in descending order according to a key.
     */
    OrderByDescending(keySelector: (key: T) => any): List<T>;
    /**
     * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
     */
    ThenBy(keySelector: (key: T) => any): List<T>;
    /**
     * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
     */
    ThenByDescending(keySelector: (key: T) => any): List<T>;
    /**
     * Removes the first occurrence of a specific object from the List<T>.
     */
    Remove(element: T): boolean;
    /**
     * Removes all the elements that match the conditions defined by the specified predicate.
     */
    RemoveAll(predicate: (value?: T, index?: number, list?: T[]) => boolean): List<T>;
    /**
     * Removes the element at the specified index of the List<T>.
     */
    RemoveAt(index: number): void;
    /**
     * Reverses the order of the elements in the entire List<T>.
     */
    Reverse(): List<T>;
    /**
     * Projects each element of a sequence into a new form.
     */
    Select(mapper: (value?: T, index?: number, list?: T[]) => any): List<any>;
    /**
     * Projects each element of a sequence to a List<any> and flattens the resulting sequences into one sequence.
     */
    SelectMany(mapper: (value?: T, index?: number, list?: T[]) => any): List<any>;
    /**
     * Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.
     */
    SequenceEqual(list: List<T>): boolean;
    /**
     * Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
     */
    Single(): T | Error;
    /**
     * Returns the only element of a sequence, or a default value if the sequence is empty;
     * this method throws an exception if there is more than one element in the sequence.
     */
    SingleOrDefault(): T | Error;
    /**
     * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
     */
    Skip(amount: number): List<T>;
    /**
     * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
     */
    SkipWhile(predicate: (value?: T, index?: number, list?: T[]) => boolean): List<T>;
    /**
     * Computes the sum of the sequence of number values that are obtained by invoking
     * a transform function on each element of the input sequence.
     */
    Sum(): number;
    Sum(transform: (value?: T, index?: number, list?: T[]) => number): number;
    /**
     * Returns a specified number of contiguous elements from the start of a sequence.
     */
    Take(amount: number): List<T>;
    /**
     * Returns elements from a sequence as long as a specified condition is true.
     */
    TakeWhile(predicate: (value?: T, index?: number, list?: T[]) => boolean): List<T>;
    /**
     * Copies the elements of the List<T> to a new array.
     */
    ToArray(): T[];
    /**
     * Creates a Dictionary<TKey, TValue> from a List<T> according to a specified key selector function.
     */
    ToDictionary<TKey, TValue>(key: (key: any) => TKey, value?: (value: any) => TValue): any;
    /**
     * Creates a List<T> from an Enumerable.List<T>.
     */
    ToList(): List<T>;
    /**
     * Creates a Lookup<TKey, TElement> from an IEnumerable<T> according to specified key selector and element selector functions.
     */
    ToLookup(keySelector: (key: T) => any, elementSelector: (element: T) => any): any;
    /**
     * Produces the set union of two sequences by using the default equality comparer.
     */
    Union(list: List<T>): List<T>;
    /**
     * Filters a sequence of values based on a predicate.
     */
    Where(predicate: (value?: T, index?: number, list?: T[]) => boolean): List<T>;
    /**
     * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
     */
    Zip<U>(list: List<U>, result: (first: T, second: U) => any): List<any>;
    /**
     * Creates a function that negates the result of the predicate
     */
    private _negate(predicate);
}
export declare class Enumerable {
    /**
     * Generates a sequence of integral numbers within a specified range.
     */
    static Range(start: number, count: number): List<number>;
    /**
     * Generates a sequence that contains one repeated value.
     */
    static Repeat<T>(element: T, count: number): List<T>;
}
