import * as Immutable from 'immutable';

/**
 * LinQ.ts
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
    public Add(element: T): Immutable.List<T> {
        return this._elements.push(element);
    }

    /**
     * Adds the elements of the specified collection to the end of the List<T>.
     */
    public AddRange(elements: T[]): Immutable.List<T> {
        return this._elements.push(...elements);
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
     
    // TODO: Average Computes the average of a sequence of number values that are obtained by invoking a transform function on each element of the input sequence.
    
    /**
     * Concatenates two sequences.
     */
    public Concat(list: List<T>): Immutable.Iterable<number, T>  {
        return this._elements.concat(list);
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
     
    // TODO: DefaultIfEmpty Returns the elements of the specified sequence or the type parameter's default value in a singleton collection if the sequence is empty.
    
    // TODO: Distinct Returns distinct elements from a sequence by using the default equality comparer to compare values.
     
    /**
     * Returns the element at a specified index in a sequence.
     */
    public ElementAt(index: number): T {
        return this._elements[index];
    }
    
    /**
     * Returns the element at a specified index in a sequence or a default value if the index is out of range.
     */
    public ElementAtOrDefault(index: number): any {
        return this._elements.count() ?  this._elements[index] : 0;
    }
     
    // TODO: Except Produces the set difference of two sequences by using the default equality comparer to compare values.
    
    /**
     * Returns the first element of a sequence.
     */
    public First(): T {
        return this._elements.first();
    }
     
    /**
     * Returns the first element of a sequence, or a default value if the sequence contains no elements.
     */
    public FirstOrDefault(): any {
        return this._elements.count() ? this._elements.first() : 0;
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
    public GroupBy(grouper: (value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => any): Immutable.Seq.Keyed<any, Immutable.Iterable<number, T>> {
        return this._elements.groupBy(grouper);
    }
    
    // TODO: GroupJoin Correlates the elements of two sequences based on equality of keys and groups the results. The default equality comparer is used to compare keys.
    
    // TODO: Intersect Produces the set intersection of two sequences by using the default equality comparer to compare values.
    
    // TODO: Join Correlates the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.
    
    /**
     * Returns the last element of a sequence.
     */
    public Last(): T {
        return this._elements.last();
    }
    
    /**
     * Returns the last element of a sequence, or a default value if the sequence contains no elements.
     */
    public LastOrDefault(): any {
        return this._elements.count() ? this._elements.last() : 0;
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
    public OrderBy(comparator?: (a: T, b: T) => number): Immutable.Iterable<number, T> {
        return this._elements.sort(comparator);
    }
    
    /**
     * Sorts the elements of a sequence in descending order according to a key.
     */
    public OrderByDescending(comparator?: (a: T, b: T) => number): Immutable.Iterable<number, T> {
        return this._elements.sort(comparator).reverse();
    }
    
    // TODO: ThenBy
    
    // TODO: ThenByDescending
    
    // TODO: Range
    
    // TODO: Repeat
    
    /**
     * Reverses the order of the elements in the entire List<T>.
     */
    public Reverse(): Immutable.Iterable<number, T> {
        return this._elements.reverse();
    }
    
    /**
     * Projects each element of a sequence into a new form.
     */
    public Select(mapper: (value?: T, index?: number, iter?: Immutable.Iterable<number, any>) => any): Immutable.Iterable<number, any> {
        return this._elements.map(mapper);
    }
    
    // TODO: SelectMany Projects each element of a sequence to an IEnumerable<T> and flattens the resulting sequences into one sequence.
    
    // TODO: SequenceEqual Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.
    
    // TODO: Single Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
    
    // TODO: SingleOrDefault Returns the only element of a sequence, or a default value if the sequence is empty; this method throws an exception if there is more than one element in the sequence.
    
    // TODO: Skip Bypasses a specified number of elements in a sequence and then returns the remaining elements.
    
    // TODO: SkipWhile Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
    
    // TODO: Sum Computes the sum of the sequence of Decimal values that are obtained by invoking a transform function on each element of the input sequence.
    
    // TODO: Take Returns a specified number of contiguous elements from the start of a sequence.
    
    // TODO: TakeWhile Returns elements from a sequence as long as a specified condition is true.
    
    /**
     * Copies the elements of the List<T> to a new array.
     */
    public ToArray(): T[] {
        return this._elements.toArray();
    }
    
    // TODO: ToDictionary Creates a Dictionary<TKey, TValue> from an List<T> according to a specified key selector function.
    
    /**
     * Creates a List<T> from an Immutable.List<T>.
     */
    public ToList(): Immutable.List<T> {
        return this._elements.toList();
    }
    
    // TODO: Union Produces the set union of two sequences by using the default equality comparer.
    
    /**
     * Filters a sequence of values based on a predicate.
     */
    public Where(predicate: (value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => boolean): Immutable.Iterable<number, T> {
        return this._elements.filter(predicate);
    }
    
    /**
     * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
     */
    public Zip(iterables: Immutable.Iterable<T, T>[]): Immutable.Iterable.Indexed<T> {
        return this._elements.zip(...iterables);
    }
}
