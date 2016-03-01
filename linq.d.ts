import * as Immutable from 'immutable';
/**
 * LinQ.ts
 *
 * Documentation from LinQ .NET specification (https://msdn.microsoft.com/en-us/library/s6hkc2c4(v=vs.110).aspx)
 *
 * TODO: Unit tests with AVA
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
    constructor(elements?: Immutable.List<T>);
    /**
     * Adds an object to the end of the List<T>.
     */
    Add(element: T): Immutable.List<T>;
    /**
     * Adds the elements of the specified collection to the end of the List<T>.
     */
    AddRange(elements: T[]): Immutable.List<T>;
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
     * Concatenates two sequences.
     */
    Concat(list: List<T>): Immutable.Iterable<number, T>;
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
     * Returns the element at a specified index in a sequence.
     */
    ElementAt(index: number): T;
    /**
     * Returns the element at a specified index in a sequence or a default value if the index is out of range.
     */
    ElementAtOrDefault(index: number): any;
    /**
     * Returns the first element of a sequence.
     */
    First(): T;
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
     * Returns the last element of a sequence.
     */
    Last(): T;
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
    OrderBy(comparator?: (a: T, b: T) => number): Immutable.Iterable<number, T>;
    /**
     * Sorts the elements of a sequence in descending order according to a key.
     */
    OrderByDescending(comparator?: (a: T, b: T) => number): Immutable.Iterable<number, T>;
    /**
     * Reverses the order of the elements in the entire List<T>.
     */
    Reverse(): Immutable.Iterable<number, T>;
    /**
     * Projects each element of a sequence into a new form.
     */
    Select(mapper: (value?: T, index?: number, iter?: Immutable.Iterable<number, any>) => any): Immutable.Iterable<number, any>;
    /**
     * Copies the elements of the List<T> to a new array.
     */
    ToArray(): T[];
    /**
     * Creates a List<T> from an Immutable.List<T>.
     */
    ToList(): Immutable.List<T>;
    /**
     * Filters a sequence of values based on a predicate.
     */
    Where(predicate: (value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => boolean): Immutable.Iterable<number, T>;
    /**
     * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
     */
    Zip(iterables: Immutable.Iterable<T, T>[]): Immutable.Iterable.Indexed<T>;
}
